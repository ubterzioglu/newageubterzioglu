import * as React from "react";

import { useQuery } from "@tanstack/react-query";

import { cn } from "@/lib/utils";
import type { ContentCard, Persona } from "@/lib/cards-schema";
import { fetchCards } from "@/lib/cards-api";

type RecruiterCardTone = { bg: string; text: string };

const CARD_TONES: RecruiterCardTone[] = [
  { bg: "bg-primary", text: "text-primary-foreground" },
  { bg: "bg-success", text: "text-success-foreground" },
  { bg: "bg-glow", text: "text-foreground" },
  { bg: "bg-energy", text: "text-energy-foreground" },
  { bg: "bg-cta", text: "text-cta-foreground" },
  { bg: "bg-depth", text: "text-foreground" },
] as const;

function CardView({ card, index }: { card: ContentCard; index: number }) {
  const tone = CARD_TONES[index % CARD_TONES.length];

  return (
    <article className={cn("w-full max-w-[350px] overflow-hidden rounded-3xl border shadow-glass", "p-5 md:p-6", tone.bg, tone.text)}>
      {card.image_path ? (
        <div className="-mx-5 -mt-5 mb-4 h-32 overflow-hidden md:-mx-6 md:-mt-6">
          <img
            src={card.image_path}
            alt={`${card.title} image`}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
      ) : null}

      <h3 className={cn("text-lg font-semibold tracking-tight md:text-xl", tone.text)}>{card.title}</h3>
      <p className={cn("mt-2 text-sm leading-relaxed opacity-90", tone.text)}>{card.description}</p>

      {card.actions?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {card.actions.map((a) => (
            <a
              key={a.id ?? a.href}
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

export function RecruiterCards({ className, persona = "recruiter" }: { className?: string; persona?: Persona }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["cards", persona],
    queryFn: () => fetchCards(persona),
  });

  if (isLoading) {
    return (
      <section className={cn("mt-8", className)} aria-label="Recruiter cards">
        <p className="text-sm text-muted-foreground">Loading cards…</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={cn("mt-8", className)} aria-label="Recruiter cards">
        <p className="text-sm text-destructive">Failed to load cards.</p>
      </section>
    );
  }

  return (
    <section className={cn("mt-8", className)} aria-label="Recruiter cards">
      <div className="flex flex-wrap justify-center gap-4">
        {(data ?? []).map((c, idx) => (
          <CardView key={c.id} card={c} index={idx} />
        ))}
      </div>
    </section>
  );
}


