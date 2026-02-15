import { supabase } from "@/lib/supabase";
import type { ContentCard, ContentCardAction, Persona } from "@/lib/cards-schema";

export type DbCard = {
  id: string;
  persona: string;
  title: string;
  description: string;
  sort_order: number;
  image_path: string | null;
  created_at: string;
  updated_at: string;
};

export type DbAction = {
  id: string;
  card_id: string;
  label: string;
  href: string;
  sort_order: number;
  created_at: string;
};

export async function fetchCards(persona: Persona): Promise<ContentCard[]> {
  const { data: cards, error } = await supabase
    .from("content_cards")
    .select("id, persona, title, description, sort_order, image_path")
    .eq("persona", persona)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) throw error;

  const cardIds = (cards ?? []).map((c) => c.id);

  const { data: actions, error: actionsError } = cardIds.length
    ? await supabase
        .from("content_card_actions")
        .select("id, card_id, label, href, sort_order")
        .in("card_id", cardIds)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true })
    : { data: [], error: null };

  if (actionsError) throw actionsError;

  const byCard = new Map<string, ContentCardAction[]>();
  for (const a of actions ?? []) {
    const arr = byCard.get(a.card_id) ?? [];
    arr.push({ id: a.id, label: a.label, href: a.href, sort_order: a.sort_order });
    byCard.set(a.card_id, arr);
  }

  return (cards ?? []).map((c) => ({
    id: c.id,
    persona: c.persona as Persona,
    title: c.title,
    description: c.description,
    sort_order: c.sort_order,
    image_path: c.image_path,
    actions: byCard.get(c.id) ?? [],
  }));
}

export async function upsertCard(card: ContentCard): Promise<string> {
  const { data, error } = await supabase
    .from("content_cards")
    .upsert(
      {
        id: card.id,
        persona: card.persona,
        title: card.title,
        description: card.description,
        sort_order: card.sort_order,
        image_path: card.image_path ?? null,
      },
      { onConflict: "id" },
    )
    .select("id")
    .single();

  if (error) throw error;
  return data.id as string;
}

export async function replaceCardActions(cardId: string, actions: ContentCardAction[]) {
  // naive but simple: delete then insert
  const { error: delError } = await supabase.from("content_card_actions").delete().eq("card_id", cardId);
  if (delError) throw delError;

  if (!actions.length) return;

  const { error: insError } = await supabase.from("content_card_actions").insert(
    actions.map((a, idx) => ({
      card_id: cardId,
      label: a.label,
      href: a.href,
      sort_order: a.sort_order ?? idx,
    })),
  );

  if (insError) throw insError;
}
