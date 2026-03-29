import * as React from "react";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

import { RequireAdmin } from "@/components/auth/RequireAdmin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { signOut } from "@/lib/auth-api";
import { fetchCards, replaceCardActions, upsertCard } from "@/lib/cards-api";
import {
  getDefaultPlacementKey,
  getPlacementsForPersona,
  PERSONAS,
  type CardPlacementKey,
  type ContentCard,
  type Persona,
} from "@/lib/cards-schema";
import { createCardFromLegacyTemplate, getLegacyTemplatesForPersona } from "@/lib/legacy-card-library";
import { supabase } from "@/lib/supabase";

type EditorState = ContentCard;

const emptyCard = (persona: Persona, placementKey: CardPlacementKey): EditorState => ({
  persona,
  placement_key: placementKey,
  source_template_key: null,
  title: "",
  description: "",
  sort_order: 10,
  image_path: null,
  actions: [],
});

async function uploadCardImage(file: File) {
  const ext = file.name.split(".").pop() || "jpg";
  const path = `cards/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from("card-images").upload(path, file, {
    upsert: false,
    contentType: file.type,
  });

  if (error) throw error;

  const { data } = supabase.storage.from("card-images").getPublicUrl(path);
  return { path, publicUrl: data.publicUrl };
}

export default function AdminCardsPage() {
  const qc = useQueryClient();

  const [persona, setPersona] = React.useState<Persona>("recruiter");
  const [placementKey, setPlacementKey] = React.useState<CardPlacementKey>(getDefaultPlacementKey("recruiter"));
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [templateQuery, setTemplateQuery] = React.useState("");
  const [draft, setDraft] = React.useState<EditorState>(emptyCard("recruiter", getDefaultPlacementKey("recruiter")));

  const placements = React.useMemo(() => getPlacementsForPersona(persona), [persona]);
  const legacyTemplates = React.useMemo(() => {
    const q = templateQuery.trim().toLowerCase();
    return getLegacyTemplatesForPersona(persona).filter((template) => {
      if (!q) return true;
      return `${template.title} ${template.summary} ${template.key}`.toLowerCase().includes(q);
    });
  }, [persona, templateQuery]);

  const { data: cards, isLoading, error } = useQuery({
    queryKey: ["cards", persona, placementKey],
    queryFn: () => fetchCards({ persona, placementKey }),
  });

  const selected = React.useMemo(() => {
    return (cards ?? []).find((card) => card.id === selectedId) ?? null;
  }, [cards, selectedId]);

  const nextSortOrder = React.useMemo(() => {
    const current = cards ?? [];
    if (!current.length) return 10;
    return Math.max(...current.map((card) => card.sort_order)) + 10;
  }, [cards]);

  React.useEffect(() => {
    const nextPlacement = getDefaultPlacementKey(persona);
    setPlacementKey(nextPlacement);
    setSelectedId(null);
    setDraft(emptyCard(persona, nextPlacement));
  }, [persona]);

  React.useEffect(() => {
    setSelectedId(null);
    setDraft(emptyCard(persona, placementKey));
  }, [placementKey, persona]);

  React.useEffect(() => {
    if (selected) {
      setDraft(selected);
    }
  }, [selected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    multiple: false,
    onDrop: async (files) => {
      if (!files?.[0]) return;
      try {
        const { publicUrl } = await uploadCardImage(files[0]);
        setDraft((current) => ({ ...current, image_path: publicUrl }));
        toast.success("Image uploaded.");
      } catch (uploadError) {
        console.error(uploadError);
        toast.error(`Image upload failed: ${uploadError instanceof Error ? uploadError.message : String(uploadError)}`);
      }
    },
  });

  function resetDraft() {
    setSelectedId(null);
    setDraft(emptyCard(persona, placementKey));
  }

  function loadTemplate(templateKey: string) {
    const template = legacyTemplates.find((item) => item.key === templateKey);
    if (!template) return;

    setSelectedId(null);
    setDraft(
      createCardFromLegacyTemplate({
        template,
        persona,
        placementKey,
        sortOrder: nextSortOrder,
      }),
    );
    toast.success(`Loaded template: ${template.title}`);
  }

  async function onSave() {
    try {
      const savedId = await upsertCard(draft);
      await replaceCardActions(savedId, draft.actions ?? []);
      setPlacementKey(draft.placement_key);
      setSelectedId(savedId);
      await qc.invalidateQueries({ queryKey: ["cards"] });
      toast.success("Card saved.");
    } catch (saveError) {
      console.error(saveError);
      toast.error(`Save failed: ${saveError instanceof Error ? saveError.message : String(saveError)}`);
    }
  }

  async function onDelete() {
    if (!selected?.id) return;
    if (!confirm("Delete this card?")) return;

    try {
      const { error: deleteError } = await supabase.from("content_cards").delete().eq("id", selected.id);
      if (deleteError) throw deleteError;
      resetDraft();
      await qc.invalidateQueries({ queryKey: ["cards"] });
      toast.success("Card deleted.");
    } catch (deleteErr) {
      console.error(deleteErr);
      toast.error(`Delete failed: ${deleteErr instanceof Error ? deleteErr.message : String(deleteErr)}`);
    }
  }

  return (
    <RequireAdmin>
      <main className="min-h-screen bg-background">
        <div className="container py-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold">Admin | Cards</h1>
              <p className="mt-1 text-sm text-muted-foreground">Manage live placements and load legacy oldsite cards as templates.</p>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => window.location.assign("/")}>
                Home
              </Button>
              <Button variant="outline" onClick={() => signOut().then(() => window.location.assign("/"))}>
                Sign out
              </Button>
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[360px_1fr]">
            <section className="rounded-2xl border bg-card/30 p-4 shadow-glass backdrop-blur">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium">Cards</p>
                <Button size="sm" onClick={resetDraft}>
                  New
                </Button>
              </div>

              <div className="mt-3 space-y-3">
                <div>
                  <label className="text-xs text-muted-foreground">Persona</label>
                  <select
                    className="mt-1 h-9 w-full rounded-md border bg-background px-3 text-sm"
                    value={persona}
                    onChange={(event) => setPersona(event.target.value as Persona)}
                  >
                    {PERSONAS.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs text-muted-foreground">Placement</label>
                  <select
                    className="mt-1 h-9 w-full rounded-md border bg-background px-3 text-sm"
                    value={placementKey}
                    onChange={(event) => setPlacementKey(event.target.value as CardPlacementKey)}
                  >
                    {placements.map((placement) => (
                      <option key={placement.key} value={placement.key}>
                        {placement.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Live cards in selected placement</p>
                {isLoading ? <p className="text-sm text-muted-foreground">Loading...</p> : null}
                {error ? <p className="text-sm text-destructive">Failed to load cards.</p> : null}

                {(cards ?? []).map((card) => (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() => setSelectedId(card.id ?? null)}
                    className={`w-full rounded-xl border px-3 py-2 text-left transition-colors hover:bg-muted/30 ${
                      card.id === selectedId ? "bg-muted/30" : "bg-transparent"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-medium">{card.title}</p>
                      <span className="text-xs text-muted-foreground">#{card.sort_order}</span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{card.description}</p>
                    {card.source_template_key ? (
                      <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-foreground/45">{card.source_template_key}</p>
                    ) : null}
                  </button>
                ))}

                {!isLoading && !error && !(cards ?? []).length ? (
                  <p className="text-sm text-muted-foreground">No cards placed here yet.</p>
                ) : null}
              </div>

              <div className="mt-6 border-t pt-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Legacy library</p>
                    <p className="mt-1 text-sm text-muted-foreground">Hidden oldsite cards you can load into the editor.</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => window.location.assign("/cards")}>
                    Preview page
                  </Button>
                </div>

                <Input
                  className="mt-3"
                  value={templateQuery}
                  onChange={(event) => setTemplateQuery(event.target.value)}
                  placeholder="Search oldsite templates..."
                />

                <div className="mt-3 max-h-[420px] space-y-2 overflow-auto pr-1">
                  {legacyTemplates.map((template) => (
                    <div key={template.key} className="rounded-xl border bg-background/20 p-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">{template.title}</p>
                          <p className="mt-1 text-xs text-muted-foreground">{template.summary}</p>
                          <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-foreground/45">{template.key}</p>
                        </div>
                        <Button size="sm" variant="secondary" onClick={() => loadTemplate(template.key)}>
                          Use
                        </Button>
                      </div>
                    </div>
                  ))}

                  {!legacyTemplates.length ? <p className="text-sm text-muted-foreground">No legacy templates matched.</p> : null}
                </div>
              </div>
            </section>

            <section className="rounded-2xl border bg-card/30 p-5 shadow-glass backdrop-blur">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium">Editor</p>
                  <p className="mt-1 text-sm text-muted-foreground">Save to the selected placement or move the card somewhere else.</p>
                </div>
                <div className="flex gap-2">
                  {selected?.id ? (
                    <Button variant="destructive" onClick={onDelete}>
                      Delete
                    </Button>
                  ) : null}
                  <Button onClick={onSave}>Save</Button>
                </div>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-sm">Title</label>
                  <Input value={draft.title} onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))} />
                </div>
                <div className="space-y-1">
                  <label className="text-sm">Sort order</label>
                  <Input
                    type="number"
                    value={draft.sort_order}
                    onChange={(event) => setDraft((current) => ({ ...current, sort_order: Number(event.target.value) }))}
                  />
                </div>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-sm">Persona</label>
                  <Input value={draft.persona} readOnly />
                </div>
                <div className="space-y-1">
                  <label className="text-sm">Placement</label>
                  <select
                    className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                    value={draft.placement_key}
                    onChange={(event) =>
                      setDraft((current) => ({ ...current, placement_key: event.target.value as CardPlacementKey }))
                    }
                  >
                    {placements.map((placement) => (
                      <option key={placement.key} value={placement.key}>
                        {placement.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 space-y-1">
                <label className="text-sm">Template source</label>
                <Input value={draft.source_template_key ?? ""} readOnly placeholder="Manual card" />
              </div>

              <div className="mt-4 space-y-1">
                <label className="text-sm">Description</label>
                <Textarea
                  value={draft.description}
                  onChange={(event) => setDraft((current) => ({ ...current, description: event.target.value }))}
                  rows={6}
                />
              </div>

              <div className="mt-4">
                <label className="text-sm">Image</label>
                <div
                  {...getRootProps()}
                  className={`mt-2 rounded-2xl border bg-background/40 p-4 text-sm text-muted-foreground ${
                    isDragActive ? "ring-2 ring-ring" : ""
                  }`}
                >
                  <input {...getInputProps()} />
                  <p>{draft.image_path ? "Drop to replace image" : "Drop an image here to upload"}</p>
                  {draft.image_path ? (
                    <img
                      src={draft.image_path}
                      alt="Card image preview"
                      className="mt-3 h-40 w-full rounded-xl object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : null}
                </div>
                <div className="mt-2 space-y-1">
                  <label className="text-xs text-muted-foreground">Or paste URL</label>
                  <Input
                    value={draft.image_path ?? ""}
                    onChange={(event) => setDraft((current) => ({ ...current, image_path: event.target.value || null }))}
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="mt-6">
                <Tabs defaultValue="actions">
                  <TabsList>
                    <TabsTrigger value="actions">Actions</TabsTrigger>
                  </TabsList>
                  <TabsContent value="actions">
                    <div className="space-y-2">
                      {(draft.actions ?? []).map((action, index) => (
                        <div
                          key={index}
                          className="grid gap-2 rounded-xl border bg-background/20 p-3 md:grid-cols-[1fr_1.3fr_90px_36px]"
                        >
                          <Input
                            value={action.label}
                            onChange={(event) =>
                              setDraft((current) => {
                                const next = [...(current.actions ?? [])];
                                next[index] = { ...next[index], label: event.target.value };
                                return { ...current, actions: next };
                              })
                            }
                            placeholder="Label"
                          />
                          <Input
                            value={action.href}
                            onChange={(event) =>
                              setDraft((current) => {
                                const next = [...(current.actions ?? [])];
                                next[index] = { ...next[index], href: event.target.value };
                                return { ...current, actions: next };
                              })
                            }
                            placeholder="/path or https://..."
                          />
                          <Input
                            type="number"
                            value={action.sort_order ?? index}
                            onChange={(event) =>
                              setDraft((current) => {
                                const next = [...(current.actions ?? [])];
                                next[index] = { ...next[index], sort_order: Number(event.target.value) };
                                return { ...current, actions: next };
                              })
                            }
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                              setDraft((current) => {
                                const next = [...(current.actions ?? [])];
                                next.splice(index, 1);
                                return { ...current, actions: next };
                              })
                            }
                          >
                            x
                          </Button>
                        </div>
                      ))}

                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() =>
                          setDraft((current) => ({
                            ...current,
                            actions: [...(current.actions ?? []), { label: "", href: "", sort_order: (current.actions ?? []).length }],
                          }))
                        }
                      >
                        Add action
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </section>
          </div>
        </div>
      </main>
    </RequireAdmin>
  );
}
