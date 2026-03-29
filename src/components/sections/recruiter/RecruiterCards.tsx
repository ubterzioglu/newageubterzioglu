import { useQuery } from "@tanstack/react-query";

import { fetchCards } from "@/lib/cards-api";
import { cn } from "@/lib/utils";

import { CustomCardsGrid } from "./CustomCardsGrid";

export function RecruiterCards({ className }: { className?: string }) {
  const { data, error } = useQuery({
    queryKey: ["cards", "recruiter", "recruiter:panel"],
    queryFn: () => fetchCards({ persona: "recruiter", placementKey: "recruiter:panel" }),
  });

  return (
    <section className={cn("mt-8", className)} aria-label="Recruiter cards">
      {error ? <p className="text-sm text-destructive">Recruiter cards could not be loaded.</p> : null}
      <CustomCardsGrid
        title="Recruiter cards"
        eyebrow="Configured in admin"
        cards={data ?? []}
        emptyMessage="No recruiter cards have been placed yet. Add cards from the admin library."
      />
    </section>
  );
}
