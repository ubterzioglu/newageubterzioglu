import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { CustomCardsGrid } from "@/components/sections/recruiter/CustomCardsGrid";
import { RecruiterProfileDeck } from "@/components/sections/recruiter/RecruiterProfileDeck";
import { Button } from "@/components/ui/button";
import { fetchCards } from "@/lib/cards-api";

export default function CardsPage() {
  const { data, error } = useQuery({
    queryKey: ["cards", "recruiter", "cards:page"],
    queryFn: () => fetchCards({ persona: "recruiter", placementKey: "cards:page" }),
  });

  return (
    <main id="top" className="min-h-screen bg-background">
      <div className="container py-10">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Cards</h1>
            <p className="mt-1 text-sm text-muted-foreground">Hidden legacy preview plus admin-placed cards.</p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="secondary">
              <Link to="/admin">Admin</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/">Ana sayfa</Link>
            </Button>
          </div>
        </header>

        <section className="mt-6">
          <div className="mb-4">
            <p className="text-[11px] uppercase tracking-[0.28em] text-foreground/55">Legacy preview</p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight">Oldsite recruiter deck</h2>
          </div>
          <RecruiterProfileDeck />
        </section>

        <section className="mt-8">
          {error ? <p className="mb-4 text-sm text-destructive">Cards page items could not be loaded.</p> : null}
          <CustomCardsGrid
            title="Cards page placements"
            eyebrow="Configured in admin"
            cards={data ?? []}
            emptyMessage="No cards have been placed onto the hidden cards page yet."
          />
        </section>

        <footer className="mt-10 text-center text-xs text-muted-foreground">(c) ubterzioglu | 2025</footer>
      </div>
    </main>
  );
}
