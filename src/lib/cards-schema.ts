import { z } from "zod";

export const PERSONAS = ["recruiter", "colleague", "qa", "curious"] as const;
export type Persona = (typeof PERSONAS)[number];

export const CARD_PLACEMENT_KEYS = [
  "recruiter:panel",
  "cards:page",
  "colleague:panel",
  "qa:panel",
  "curious:panel",
] as const;

export type CardPlacementKey = (typeof CARD_PLACEMENT_KEYS)[number];

export const CARD_PLACEMENTS: ReadonlyArray<{
  key: CardPlacementKey;
  label: string;
  persona: Persona;
}> = [
  { key: "recruiter:panel", label: "Homepage / Recruiter panel", persona: "recruiter" },
  { key: "cards:page", label: "Hidden cards page", persona: "recruiter" },
  { key: "colleague:panel", label: "Homepage / Colleague panel", persona: "colleague" },
  { key: "qa:panel", label: "Homepage / QA panel", persona: "qa" },
  { key: "curious:panel", label: "Homepage / Curious panel", persona: "curious" },
] as const;

export function getPlacementsForPersona(persona: Persona) {
  return CARD_PLACEMENTS.filter((placement) => placement.persona === persona);
}

export function getDefaultPlacementKey(persona: Persona): CardPlacementKey {
  return getPlacementsForPersona(persona)[0]?.key ?? "recruiter:panel";
}

export const CardActionSchema = z.object({
  id: z.string().uuid().optional(),
  label: z.string().min(1),
  href: z.string().min(1),
  sort_order: z.number().int().default(0),
});

export const ContentCardSchema = z.object({
  id: z.string().uuid().optional(),
  persona: z.enum(PERSONAS),
  placement_key: z.enum(CARD_PLACEMENT_KEYS),
  source_template_key: z.string().optional().nullable(),
  title: z.string().min(1),
  description: z.string().min(1),
  sort_order: z.number().int().default(0),
  image_path: z.string().min(1).optional().nullable(),
  actions: z.array(CardActionSchema).default([]),
});

export type ContentCard = z.infer<typeof ContentCardSchema>;
export type ContentCardAction = z.infer<typeof CardActionSchema>;
