import * as React from "react";

import { cn } from "@/lib/utils";

type RecruiterCard = {
  title: string;
  description: string;
  /** Tailwind class, uses theme tokens (e.g. bg-cta, bg-primary) */
  toneClassName: string;
  /** Tailwind class for text on this background */
  textClassName: string;
  actions?: Array<{ label: string; href: string }>;
};

const CARDS: RecruiterCard[] = [
  {
    title: "My CV",
    description: "A detailed overview of my professional background, skills, and experience.",
    toneClassName: "bg-primary",
    textClassName: "text-primary-foreground",
    actions: [
      { label: "View LinkedIn", href: "https://www.linkedin.com/in/umutbaristerzioglu" },
      { label: "Request CV by Email", href: "mailto:contact@ubterzioglu.de" },
    ],
  },
  {
    title: "About Me",
    description:
      "I'm Umut Barış Terzioğlu, a Senior Software Quality Assurance Engineer passionate about building reliable software systems.",
    toneClassName: "bg-glow",
    textClassName: "text-foreground",
    actions: [
      { label: "Experience", href: "https://ubterzioglu.de/zrecruiter.html#experience" },
      { label: "Tech Stack", href: "https://ubterzioglu.de/zrecruiter.html#tech" },
    ],
  },
  {
    title: "Key Achievements",
    description:
      "Senior QA engineer with a proven track record; automation wins; strong focus on code quality; continuous learner.",
    toneClassName: "bg-energy",
    textClassName: "text-energy-foreground",
  },
  {
    title: "Tech Stack",
    description:
      "Testing: Selenium, Playwright, Cypress · Languages: JavaScript, Python, TypeScript · Tools: Git, Docker, CI/CD",
    toneClassName: "bg-cta",
    textClassName: "text-cta-foreground",
  },
  {
    title: "Experience",
    description:
      "Leading QA initiatives, implementing automated testing frameworks, ensuring reliability across multiple projects.",
    toneClassName: "bg-success",
    textClassName: "text-success-foreground",
    actions: [{ label: "View Full Profile", href: "https://www.linkedin.com/in/umutbaristerzioglu" }],
  },
  {
    title: "Corporate Projects",
    description: "Professional projects focused on quality assurance, automation, and testing infrastructure.",
    toneClassName: "bg-depth",
    textClassName: "text-foreground",
    actions: [{ label: "Contact Me", href: "mailto:contact@ubterzioglu.de" }],
  },
  {
    title: "Private Projects",
    description: "Personal projects exploring various technologies and ideas.",
    toneClassName: "bg-secondary",
    textClassName: "text-secondary-foreground",
    actions: [
      { label: "Explore Tools", href: "https://ubterzioglu.de/ztools.html" },
      { label: "View Apps", href: "https://ubterzioglu.de/zapps.html" },
    ],
  },
  {
    title: "Contact",
    description: "contact@ubterzioglu.de · LinkedIn · ubterzioglu.de",
    toneClassName: "bg-card",
    textClassName: "text-card-foreground",
    actions: [
      { label: "Email", href: "mailto:contact@ubterzioglu.de" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/umutbaristerzioglu" },
      { label: "Website", href: "https://ubterzioglu.de/" },
    ],
  },
];

function RecruiterCardView({ card }: { card: RecruiterCard }) {
  return (
    <article
      className={cn(
        "rounded-3xl border shadow-glass",
        "p-5 md:p-6",
        card.toneClassName,
        card.textClassName,
      )}
    >
      <h3 className={cn("text-lg font-semibold tracking-tight md:text-xl", card.textClassName)}>{card.title}</h3>
      <p className={cn("mt-2 text-sm leading-relaxed opacity-90", card.textClassName)}>{card.description}</p>

      {card.actions?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {card.actions.map((a) => (
            <a
              key={a.href}
              href={a.href}
              target={a.href.startsWith("http") ? "_blank" : undefined}
              rel={a.href.startsWith("http") ? "noreferrer" : undefined}
              className={cn(
                "inline-flex items-center rounded-full border px-3 py-1 text-sm",
                "bg-background/10 backdrop-blur",
                "transition-colors hover:bg-background/15",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              )}
            >
              {a.label}
            </a>
          ))}
        </div>
      ) : null}
    </article>
  );
}

export function RecruiterCards({ className }: { className?: string }) {
  return (
    <section className={cn("mt-8", className)} aria-label="Recruiter cards">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {CARDS.map((c) => (
          <RecruiterCardView key={c.title} card={c} />
        ))}
      </div>
    </section>
  );
}
