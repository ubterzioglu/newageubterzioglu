import * as React from "react";

import { RequireAdmin } from "@/components/auth/RequireAdmin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/lib/supabase";
import { PERSONAS, type ContentCard, type Persona } from "@/lib/cards-schema";
import { fetchCards, replaceCardActions, upsertCard } from "@/lib/cards-api";
import { signOut } from "@/lib/auth-api";
import { SYSTEM_CARDS, isSystemCardId } from "@/lib/system-cards";
import { toast } from "sonner";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useDropzone } from "react-dropzone";

type EditorState = ContentCard;

const emptyCard = (persona: Persona): EditorState => ({
  persona,
  title: "",
  description: "",
  sort_order: 0,
  image_path: null,
  actions: [],
});

async function uploadCardImage(file: File) {
  const ext = file.name.split(".").pop() || "jpg";
  const path = `cards/${crypto.randomUUID()}.${ext}`;

  const { error: upErr } = await supabase.storage.from("card-images").upload(path, file, {
    upsert: false,
    contentType: file.type,
  });
  if (upErr) throw upErr;

  const { data } = supabase.storage.from("card-images").getPublicUrl(path);
  return { path, publicUrl: data.publicUrl };
}

export default function AdminCardsPage() {
  const qc = useQueryClient();
  const [persona, setPersona] = React.useState<Persona>("recruiter");
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  const { data: cards, isLoading, error } = useQuery({
    queryKey: ["cards", persona],
    queryFn: () => fetchCards(persona),
  });

  const combinedCards = React.useMemo(() => {
    const system = SYSTEM_CARDS.filter((c) => c.persona === persona);
    return [...system, ...(cards ?? [])];
  }, [cards, persona]);

  const selected = React.useMemo(() => {
    const found = combinedCards?.find((c) => c.id === selectedId);
    return found ?? null;
  }, [combinedCards, selectedId]);

  const [draft, setDraft] = React.useState<EditorState>(emptyCard(persona));

  React.useEffect(() => {
    setDraft(selected ? selected : emptyCard(persona));
  }, [selected, persona]);

  React.useEffect(() => {
    setSelectedId(null);
  }, [persona]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    multiple: false,
    onDrop: async (files) => {
      if (!files?.[0]) return;
      const f = files[0];
      const { publicUrl } = await uploadCardImage(f);
      setDraft((d) => ({ ...d, image_path: publicUrl }));
    },
  });

  async function onSave() {
    if (isSystemCardId(selectedId)) return;
    try {
      const id = await upsertCard({ ...draft, persona });
      await replaceCardActions(id, draft.actions ?? []);
      setSelectedId(id);
      await qc.invalidateQueries({ queryKey: ["cards", persona] });
      toast.success("Card saved.");
    } catch (err) {
      console.error(err);
      toast.error(`Save failed: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  async function onDelete() {
    if (isSystemCardId(selectedId)) return;
    if (!selected?.id) return;
    if (!confirm("Delete this card?")) return;

    try {
      const { error: delErr } = await supabase.from("content_cards").delete().eq("id", selected.id);
      if (delErr) throw delErr;
      setSelectedId(null);
      await qc.invalidateQueries({ queryKey: ["cards", persona] });
      toast.success("Card deleted.");
    } catch (err) {
      console.error(err);
      toast.error(`Delete failed: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  return (
    <RequireAdmin>
      <main className="min-h-screen bg-background">
        <div className="container py-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold">Admin · Cards</h1>
              <p className="mt-1 text-sm text-muted-foreground">Add/edit cards once, render everywhere.</p>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => window.location.assign("/")}>Home</Button>
              <Button variant="outline" onClick={() => signOut().then(() => window.location.assign("/"))}>Sign out</Button>
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[320px_1fr]">
            {/* Left: list */}
            <section className="rounded-2xl border bg-card/30 p-4 shadow-glass backdrop-blur">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium">Cards</p>
                <Button size="sm" onClick={() => setSelectedId(null)}>New</Button>
              </div>

              <div className="mt-3">
                <label className="text-xs text-muted-foreground">Persona</label>
                <select
                  className="mt-1 h-9 w-full rounded-md border bg-background px-3 text-sm"
                  value={persona}
                  onChange={(e) => setPersona(e.target.value as Persona)}
                >
                  {PERSONAS.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div className="mt-4 space-y-2">
                {isLoading ? <p className="text-sm text-muted-foreground">Loading…</p> : null}
                {error ? <p className="text-sm text-destructive">Failed to load cards</p> : null}

                {(combinedCards ?? []).map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedId(c.id!)}
                    className={`w-full rounded-xl border px-3 py-2 text-left transition-colors hover:bg-muted/30 ${
                      c.id === selectedId ? "bg-muted/30" : "bg-transparent"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-medium">
                        {c.title}
                        {isSystemCardId(c.id) ? <span className="ml-2 text-xs text-muted-foreground">(system)</span> : null}
                      </p>
                      <span className="text-xs text-muted-foreground">#{c.sort_order}</span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{c.description}</p>
                  </button>
                ))}
              </div>
            </section>

            {/* Right: editor */}
            <section className="rounded-2xl border bg-card/30 p-5 shadow-glass backdrop-blur">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-medium">Editor</p>
                <div className="flex gap-2">
                  {selected?.id && !isSystemCardId(selected.id) ? (
                    <Button variant="destructive" onClick={onDelete}>
                      Delete
                    </Button>
                  ) : null}
                  <Button onClick={onSave} disabled={isSystemCardId(selectedId)}>
                    Save
                  </Button>
                </div>
              </div>

              {isSystemCardId(selectedId) ? (
                <div className="mt-4 rounded-2xl border bg-background/30 p-4">
                  <p className="text-sm font-medium">System card</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Bu kart admin panelinden eklenemez/düzenlenemez. /cards sayfasında özel tasarımla render edilir.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button variant="secondary" onClick={() => window.location.assign("/cards")}>/cards aç</Button>
                    <Button variant="outline" onClick={() => setSelectedId(null)}>Yeni normal kart</Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    <div className="space-y-1">
                      <label className="text-sm">Title</label>
                      <Input value={draft.title} onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm">Sort order</label>
                      <Input
                        type="number"
                        value={draft.sort_order}
                        onChange={(e) => setDraft((d) => ({ ...d, sort_order: Number(e.target.value) }))}
                      />
                    </div>
                  </div>

                  <div className="mt-4 space-y-1">
                    <label className="text-sm">Description</label>
                    <Textarea
                      value={draft.description}
                      onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
                      rows={5}
                    />
                  </div>
                </>
              )}

              {!isSystemCardId(selectedId) ? (
                <>
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
                        onChange={(e) => setDraft((d) => ({ ...d, image_path: e.target.value || null }))}
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
                          {(draft.actions ?? []).map((a, idx) => (
                            <div
                              key={idx}
                              className="grid gap-2 rounded-xl border bg-background/20 p-3 md:grid-cols-[1fr_1.3fr_90px_36px]"
                            >
                              <Input
                                value={a.label}
                                onChange={(e) =>
                                  setDraft((d) => {
                                    const next = [...(d.actions ?? [])];
                                    next[idx] = { ...next[idx], label: e.target.value };
                                    return { ...d, actions: next };
                                  })
                                }
                                placeholder="Label"
                              />
                              <Input
                                value={a.href}
                                onChange={(e) =>
                                  setDraft((d) => {
                                    const next = [...(d.actions ?? [])];
                                    next[idx] = { ...next[idx], href: e.target.value };
                                    return { ...d, actions: next };
                                  })
                                }
                                placeholder="/path or https://..."
                              />
                              <Input
                                type="number"
                                value={a.sort_order ?? idx}
                                onChange={(e) =>
                                  setDraft((d) => {
                                    const next = [...(d.actions ?? [])];
                                    next[idx] = { ...next[idx], sort_order: Number(e.target.value) };
                                    return { ...d, actions: next };
                                  })
                                }
                              />
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() =>
                                  setDraft((d) => {
                                    const next = [...(d.actions ?? [])];
                                    next.splice(idx, 1);
                                    return { ...d, actions: next };
                                  })
                                }
                              >
                                ×
                              </Button>
                            </div>
                          ))}

                          <Button
                            type="button"
                            variant="secondary"
                            onClick={() =>
                              setDraft((d) => ({
                                ...d,
                                actions: [...(d.actions ?? []), { label: "", href: "", sort_order: (d.actions ?? []).length }],
                              }))
                            }
                          >
                            Add action
                          </Button>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </>
              ) : null}
            </section>
          </div>
        </div>
      </main>
    </RequireAdmin>
  );
}
