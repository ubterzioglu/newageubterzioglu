import type { CardPlacementKey, ContentCard, Persona } from "@/lib/cards-schema";

type LegacyTemplateAction = {
  label: string;
  href: string;
  sort_order: number;
};

export type LegacyCardTemplate = {
  key: string;
  title: string;
  summary: string;
  suggestedPersonas: Persona[];
  defaultPlacementKey: CardPlacementKey;
  image_path?: string | null;
  actions?: LegacyTemplateAction[];
};

export const LEGACY_CARD_LIBRARY: LegacyCardTemplate[] = [
  {
    key: "legacy:recruiter:cv",
    title: "My CV",
    summary: "Legacy recruiter card with English and German CV actions.",
    suggestedPersonas: ["recruiter"],
    defaultPlacementKey: "recruiter:panel",
    actions: [
      { label: "English CV", href: "https://drive.google.com/file/d/1T5yUafZI9nRv1aVWeEKBHcU6apZOojP2/view", sort_order: 0 },
      { label: "German CV", href: "https://drive.google.com/file/d/15_4pguyDYAYtoqYs_7rwCCzdHknfvZ6D/view", sort_order: 1 },
    ],
  },
  {
    key: "legacy:recruiter:about",
    title: "About Me",
    summary: "Legacy recruiter introduction card from zrecruiter/aboutme.",
    suggestedPersonas: ["recruiter"],
    defaultPlacementKey: "recruiter:panel",
  },
  {
    key: "legacy:recruiter:achievements",
    title: "Key Achievements",
    summary: "Legacy recruiter highlights card for coverage, releases, mentoring, and automation impact.",
    suggestedPersonas: ["recruiter"],
    defaultPlacementKey: "recruiter:panel",
  },
  {
    key: "legacy:recruiter:tech-stack",
    title: "Tech Stack",
    summary: "Legacy recruiter tech stack card for tooling, languages, and QA process areas.",
    suggestedPersonas: ["recruiter", "qa"],
    defaultPlacementKey: "recruiter:panel",
  },
  {
    key: "legacy:recruiter:experience",
    title: "Experience",
    summary: "Legacy recruiter experience card spanning Swisslog and Daimler roles.",
    suggestedPersonas: ["recruiter"],
    defaultPlacementKey: "recruiter:panel",
  },
  {
    key: "legacy:recruiter:corporate-projects",
    title: "Corporate Projects",
    summary: "Legacy recruiter enterprise project overview for Smaragd, SRM, DARRS, and Swisslog programs.",
    suggestedPersonas: ["recruiter", "qa"],
    defaultPlacementKey: "recruiter:panel",
  },
  {
    key: "legacy:recruiter:private-projects",
    title: "Private Projects",
    summary: "Legacy recruiter side-projects and community brands card.",
    suggestedPersonas: ["recruiter", "curious"],
    defaultPlacementKey: "recruiter:panel",
  },
  {
    key: "legacy:recruiter:contact",
    title: "Contact",
    summary: "Legacy contact hub with WhatsApp, LinkedIn, Instagram, location, phone, and email.",
    suggestedPersonas: ["recruiter", "colleague", "curious"],
    defaultPlacementKey: "recruiter:panel",
    actions: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/ubterzioglu/", sort_order: 0 },
      { label: "Email", href: "mailto:ubterzioglu@gmail.com", sort_order: 1 },
      { label: "WhatsApp", href: "https://wa.me/491739569429", sort_order: 2 },
    ],
  },
  {
    key: "legacy:explorer:articles",
    title: "Articles",
    summary: "Legacy explorer article list card.",
    suggestedPersonas: ["curious", "qa", "colleague"],
    defaultPlacementKey: "cards:page",
  },
  {
    key: "legacy:explorer:bookmarks",
    title: "Bookmarks",
    summary: "Legacy explorer bookmarks card for curated links and references.",
    suggestedPersonas: ["curious", "qa", "colleague"],
    defaultPlacementKey: "cards:page",
  },
  {
    key: "legacy:explorer:updates",
    title: "Updates / News",
    summary: "Legacy explorer updates stream card.",
    suggestedPersonas: ["curious", "qa", "colleague"],
    defaultPlacementKey: "cards:page",
  },
  {
    key: "legacy:explorer:tools",
    title: "Tools",
    summary: "Legacy tools card for hobby tools and utilities.",
    suggestedPersonas: ["curious", "qa"],
    defaultPlacementKey: "cards:page",
  },
  {
    key: "legacy:explorer:apps",
    title: "Useful Apps",
    summary: "Legacy apps card for daily utility recommendations.",
    suggestedPersonas: ["curious", "colleague", "qa"],
    defaultPlacementKey: "cards:page",
  },
  {
    key: "legacy:explorer:insights",
    title: "Traffic Insights",
    summary: "Legacy private traffic insights card powered by GoatCounter.",
    suggestedPersonas: ["curious"],
    defaultPlacementKey: "cards:page",
  },
  {
    key: "legacy:misc:support",
    title: "Support",
    summary: "Legacy support card encouraging direct contact.",
    suggestedPersonas: ["colleague", "curious"],
    defaultPlacementKey: "cards:page",
  },
  {
    key: "legacy:misc:globalwarming",
    title: "Global Warming",
    summary: "Legacy awareness card carried over from the old site.",
    suggestedPersonas: ["curious"],
    defaultPlacementKey: "cards:page",
  },
];

export function getLegacyTemplatesForPersona(persona: Persona) {
  return LEGACY_CARD_LIBRARY.filter((template) => template.suggestedPersonas.includes(persona));
}

export function createCardFromLegacyTemplate({
  template,
  persona,
  placementKey,
  sortOrder,
}: {
  template: LegacyCardTemplate;
  persona: Persona;
  placementKey: CardPlacementKey;
  sortOrder: number;
}): ContentCard {
  return {
    persona,
    placement_key: placementKey,
    source_template_key: template.key,
    title: template.title,
    description: template.summary,
    sort_order: sortOrder,
    image_path: template.image_path ?? null,
    actions: (template.actions ?? []).map((action) => ({
      label: action.label,
      href: action.href,
      sort_order: action.sort_order,
    })),
  };
}
