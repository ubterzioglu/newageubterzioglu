import * as React from "react";

import { cn } from "@/lib/utils";

type RecruiterCard = {
  title: string;
  description: string;
  actions?: Array<{ label: string; href: string }>;
};

const CARDS: RecruiterCard[] = [
  { title: "Welcome", description: "(Placeholder) — içerikleri sen vereceksin." },
  { title: "Tools Developed by UBT (me)", description: "(Placeholder) — içerikleri sen vereceksin." },
  { title: "My CV", description: "(Placeholder) — içerikleri sen vereceksin." },
  { title: "Support", description: "(Placeholder) — içerikleri sen vereceksin." },
  { title: "About me", description: "(Placeholder) — içerikleri sen vereceksin." },
  { title: "Key Achievements", description: "(Placeholder) — içerikleri sen vereceksin." },
  { title: "Tech Stack", description: "(Placeholder) — içerikleri sen vereceksin." },
  { title: "Experience", description: "(Placeholder) — içerikleri sen vereceksin." },
  { title: "Corporate Projects", description: "(Placeholder) — içerikleri sen vereceksin." },
  { title: "Private Projects", description: "(Placeholder) — içerikleri sen vereceksin." },
  { title: "Contact", description: "(Placeholder) — içerikleri sen vereceksin." },
];

const CARD_TONES = [
  { bg: "bg-primary", text: "text-primary-foreground" },
  { bg: "bg-success", text: "text-success-foreground" },
  { bg: "bg-glow", text: "text-foreground" },
  { bg: "bg-energy", text: "text-energy-foreground" },
  { bg: "bg-cta", text: "text-cta-foreground" },
  { bg: "bg-depth", text: "text-foreground" },
] as const;

function RecruiterCardView({ card, index }: { card: RecruiterCard; index: number }) {
  const tone = CARD_TONES[index % CARD_TONES.length];

  return (
    	<article
      className={cn("rounded-3xl border shadow-glass", "p-5 md:p-6", tone.bg, tone.text)}
    >
      <h3 className={cn("text-lg font-semibold tracking-tight md:text-xl", tone.text)}>{card.title}</h3>
      <p className={cn("mt-2 text-sm leading-relaxed opacity-90", tone.text)}>{card.description}</p>

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
        {CARDS.map((c, idx) => (
          <RecruiterCardView key={c.title} card={c} index={idx} />
        ))}
      </div>
    </section>
  );
}
