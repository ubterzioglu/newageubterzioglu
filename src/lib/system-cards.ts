import type { ContentCard, Persona } from "@/lib/cards-schema";

export type SystemCard = ContentCard & {
  system: true;
  system_key:
    | "my-cv"
    | "about-me"
    | "key-achievements"
    | "tech-stack"
    | "experience"
    | "corporate-projects"
    | "private-projects"
    | "contact"
    | "articles"
    | "useful-apps";
};

export const SYSTEM_CARDS: SystemCard[] = [
  {
    id: "system:my-cv",
    system: true,
    system_key: "my-cv",
    persona: "recruiter" as Persona,
    title: "My CV",
    description: "English/German CV download cards (PDF).",
    sort_order: -100,
    image_path: null,
    actions: [],
  },
  {
    id: "system:about-me",
    system: true,
    system_key: "about-me",
    persona: "recruiter" as Persona,
    title: "About Me",
    description: "15+ years QA experience summary card.",
    sort_order: -99,
    image_path: null,
    actions: [],
  },
  {
    id: "system:key-achievements",
    system: true,
    system_key: "key-achievements",
    persona: "recruiter" as Persona,
    title: "Key Achievements",
    description: "Highlights list (coverage, automation, mentoring).",
    sort_order: -98,
    image_path: null,
    actions: [],
  },
  {
    id: "system:tech-stack",
    system: true,
    system_key: "tech-stack",
    persona: "recruiter" as Persona,
    title: "Tech Stack",
    description: "Tools, languages, CI/CD, methodologies.",
    sort_order: -97,
    image_path: null,
    actions: [],
  },
  {
    id: "system:experience",
    system: true,
    system_key: "experience",
    persona: "recruiter" as Persona,
    title: "Experience",
    description: "Swisslog & Daimler roles with detailed bullets.",
    sort_order: -96,
    image_path: null,
    actions: [],
  },
  {
    id: "system:corporate-projects",
    system: true,
    system_key: "corporate-projects",
    persona: "recruiter" as Persona,
    title: "Corporate Projects",
    description: "Enterprise programs: Smaragd, SRM, DARRS, Swisslog projects.",
    sort_order: -95,
    image_path: null,
    actions: [],
  },
  {
    id: "system:private-projects",
    system: true,
    system_key: "private-projects",
    persona: "recruiter" as Persona,
    title: "Private Projects",
    description: "Personal brands & content projects list.",
    sort_order: -94,
    image_path: null,
    actions: [],
  },
  {
    id: "system:contact",
    system: true,
    system_key: "contact",
    persona: "recruiter" as Persona,
    title: "Contact",
    description: "Social/contact icon grid card.",
    sort_order: -93,
    image_path: null,
    actions: [],
  },
  {
    id: "system:articles",
    system: true,
    system_key: "articles",
    persona: "recruiter" as Persona,
    title: "Articles",
    description: "One image, one link, clean text article card.",
    sort_order: -92,
    image_path: null,
    actions: [],
  },
  {
    id: "system:useful-apps",
    system: true,
    system_key: "useful-apps",
    persona: "recruiter" as Persona,
    title: "Useful Apps",
    description: "Utility apps card (e.g., Ghost Mouse).",
    sort_order: -91,
    image_path: null,
    actions: [],
  },
];

export function isSystemCardId(id: string | null | undefined) {
  return Boolean(id && id.startsWith("system:"));
}
