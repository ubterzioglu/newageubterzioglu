import type { ContentCard } from "@/lib/cards-schema";
import { cn } from "@/lib/utils";

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
          {card.actions.map((action) => (
            <a
              key={action.id ?? action.href}
              href={action.href}
              target={action.href.startsWith("http") ? "_blank" : undefined}
              rel={action.href.startsWith("http") ? "noreferrer" : undefined}
              className={cn(
                "inline-flex items-center rounded-full border px-3 py-1 text-sm",
                "bg-background/10 backdrop-blur",
                "transition-colors hover:bg-background/15",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              )}
            >
              {action.label}
            </a>
          ))}
        </div>
      ) : null}
    </article>
  );
}

export function CustomCardsGrid({
  title,
  eyebrow,
  cards,
  emptyMessage,
  className,
}: {
  title?: string;
  eyebrow?: string;
  cards: ContentCard[];
  emptyMessage?: string;
  className?: string;
}) {
  if (!cards.length) {
    return emptyMessage ? <p className={cn("text-sm text-muted-foreground", className)}>{emptyMessage}</p> : null;
  }

  return (
    <div className={className}>
      {title ? (
        <div className="mb-4">
          {eyebrow ? <p className="text-[11px] uppercase tracking-[0.28em] text-foreground/55">{eyebrow}</p> : null}
          <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground">{title}</h3>
        </div>
      ) : null}

      <div className="flex flex-wrap gap-4">
        {cards.map((card, index) => (
          <CardView key={card.id ?? `${card.title}-${index}`} card={card} index={index} />
        ))}
      </div>
    </div>
  );
}
