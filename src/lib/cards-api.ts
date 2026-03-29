import { supabase } from "@/lib/supabase";
import type { CardPlacementKey, ContentCard, ContentCardAction, Persona } from "@/lib/cards-schema";

export type DbCard = {
  id: string;
  persona: string;
  placement_key: string;
  source_template_key: string | null;
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

export async function fetchCards({
  persona,
  placementKey,
}: {
  persona: Persona;
  placementKey?: CardPlacementKey;
}): Promise<ContentCard[]> {
  let query = supabase
    .from("content_cards")
    .select("id, persona, placement_key, source_template_key, title, description, sort_order, image_path")
    .eq("persona", persona);

  if (placementKey) {
    query = query.eq("placement_key", placementKey);
  }

  const { data: cards, error } = await query.order("sort_order", { ascending: true }).order("created_at", { ascending: true });

  if (error) throw error;

  const cardIds = (cards ?? []).map((card) => card.id);

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
  for (const action of actions ?? []) {
    const items = byCard.get(action.card_id) ?? [];
    items.push({ id: action.id, label: action.label, href: action.href, sort_order: action.sort_order });
    byCard.set(action.card_id, items);
  }

  return (cards ?? []).map((card) => ({
    id: card.id,
    persona: card.persona as Persona,
    placement_key: card.placement_key as CardPlacementKey,
    source_template_key: card.source_template_key,
    title: card.title,
    description: card.description,
    sort_order: card.sort_order,
    image_path: card.image_path,
    actions: byCard.get(card.id) ?? [],
  }));
}

export async function upsertCard(card: ContentCard): Promise<string> {
  const { data, error } = await supabase
    .from("content_cards")
    .upsert(
      {
        id: card.id,
        persona: card.persona,
        placement_key: card.placement_key,
        source_template_key: card.source_template_key ?? null,
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
  const { error: deleteError } = await supabase.from("content_card_actions").delete().eq("card_id", cardId);
  if (deleteError) throw deleteError;

  if (!actions.length) return;

  const { error: insertError } = await supabase.from("content_card_actions").insert(
    actions.map((action, index) => ({
      card_id: cardId,
      label: action.label,
      href: action.href,
      sort_order: action.sort_order ?? index,
    })),
  );

  if (insertError) throw insertError;
}
