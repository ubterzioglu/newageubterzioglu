import { z } from "zod";

export const PERSONAS = ["recruiter", "colleague", "qa", "curious"] as const;
export type Persona = (typeof PERSONAS)[number];

export const CardActionSchema = z.object({
  id: z.string().uuid().optional(),
  label: z.string().min(1),
  href: z.string().min(1),
  sort_order: z.number().int().default(0),
});

export const ContentCardSchema = z.object({
  id: z.string().uuid().optional(),
  persona: z.enum(PERSONAS),
  title: z.string().min(1),
  description: z.string().min(1),
  sort_order: z.number().int().default(0),
  image_path: z.string().min(1).optional().nullable(),
  actions: z.array(CardActionSchema).default([]),
});

export type ContentCard = z.infer<typeof ContentCardSchema>;
export type ContentCardAction = z.infer<typeof CardActionSchema>;
