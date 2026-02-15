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
    title: "Welcome",
    description: "(Placeholder) — içerikleri sen vereceksin.",
    toneClassName: "bg-card",
    textClassName: "text-card-foreground",
  },
  {
    title: "Tools Developed by UBT (me)",
    description: "(Placeholder) — içerikleri sen vereceksin.",
    toneClassName: "bg-secondary",
    textClassName: "text-secondary-foreground",
  },
  {
    title: "My CV",
    description: "(Placeholder) — içerikleri sen vereceksin.",
    toneClassName: "bg-primary",
    textClassName: "text-primary-foreground",
  },
  {
    title: "Support",
    description: "(Placeholder) — içerikleri sen vereceksin.",
    toneClassName: "bg-success",
    textClassName: "text-success-foreground",
  },
  {
    title: "About me",
    description: "(Placeholder) — içerikleri sen vereceksin.",
    toneClassName: "bg-glow",
    textClassName: "text-foreground",
  },
  {
    title: "Key Achievements",
    description: "(Placeholder) — içerikleri sen vereceksin.",
    toneClassName: "bg-energy",
    textClassName: "text-energy-foreground",
  },
  {
    title: "Tech Stack",
    description: "(Placeholder) — içerikleri sen vereceksin.",
    toneClassName: "bg-cta",
    textClassName: "text-cta-foreground",
  },
  {
    title: "Experience",
    description: "(Placeholder) — içerikleri sen vereceksin.",
    toneClassName: "bg-depth",
    textClassName: "text-foreground",
  },
  {
    title: "Corporate Projects",
    description: "(Placeholder) — içerikleri sen vereceksin.",
    toneClassName: "bg-muted",
    textClassName: "text-foreground",
  },
  {
    title: "Private Projects",
    description: "(Placeholder) — içerikleri sen vereceksin.",
    toneClassName: "bg-accent",
    textClassName: "text-accent-foreground",
  },
  {
    title: "Contact",
    description: "(Placeholder) — içerikleri sen vereceksin.",
    toneClassName: "bg-primary",
    textClassName: "text-primary-foreground",
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
        {CARDS.map((c) => (
          <RecruiterCardView key={c.title} card={c} />
        ))}
      </div>
    </section>
  );
}
