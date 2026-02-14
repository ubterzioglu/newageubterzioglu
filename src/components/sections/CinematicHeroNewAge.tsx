import * as React from "react";

import heroImage from "@/assets/hero-ubterzioglu-night-city.jpg";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SnowfallOverlay } from "@/components/visual/SnowfallOverlay";
import { cn } from "@/lib/utils";


export function CinematicHeroNewAge({ className }: { className?: string }) {
  return (
    <header className={cn("relative min-h-[92vh] overflow-hidden", className)}>
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="A cinematic night scene with a trench coat silhouette looking at a futuristic city in the distance"
          className="h-full w-full object-cover"
          loading="eager"
          decoding="async"
        />
        {/* Tone mapping + gradient to preserve left content area */}
        <div className="absolute inset-0 bg-hero" />
      </div>

      {/* Ambient overlays */}
      <div className="absolute inset-0 bg-aurora" aria-hidden="true" />
      <div className="absolute inset-0 city-flicker" aria-hidden="true" />
      <SnowfallOverlay className="opacity-100" layers={3} />


      {/* Left content */}
      <div className="relative z-10">
        <div className="container">
          <div className="grid min-h-[70vh] items-end pb-14 md:items-center md:pb-16">
            <div className="max-w-2xl">
              <div className="animate-fade-in">
                <p className="kicker">Observer of the future</p>
                <h1 className="hero-title">
                  Building software,
                  <span className="hero-title-accent"> testing realities</span>,
                  connecting communities.
                </h1>
                <p className="hero-subtitle">
                  A personal space for software craftsmanship, quality mindset, community building, and the
                  Germany–Turkey bridge—calm, technical, and future-focused.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Button
                    variant="hero"
                    size="lg"
                    className="h-12 min-w-[220px] rounded-full text-base md:text-lg"
                  >
                    Explore work
                  </Button>
                  <Button
                    variant="hero"
                    size="lg"
                    className="h-12 min-w-[220px] rounded-full text-base md:text-lg"
                  >
                    Read the manifesto
                  </Button>
                </div>

                <div className="mt-10 max-w-xl">
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <Card className="card-glass aspect-square w-full border-primary/20 bg-card/25">
                      <div className="flex h-full flex-col justify-center p-4">
                        <p className="card-label">Focus</p>
                        <p className="card-value">Software</p>
                      </div>
                    </Card>

                    <Card className="card-glass aspect-square w-full border-success/20 bg-card/25">
                      <div className="flex h-full flex-col justify-center p-4">
                        <p className="card-label">Quality</p>
                        <p className="card-value">Testing</p>
                      </div>
                    </Card>

                    <Card className="card-glass aspect-square w-full border-energy/20 bg-card/25">
                      <div className="flex h-full flex-col justify-center p-4">
                        <p className="card-label">Mode</p>
                        <p className="card-value">Builder</p>
                      </div>
                    </Card>

                    <Card className="card-glass aspect-square w-full border-cta/20 bg-card/25">
                      <div className="flex h-full flex-col justify-center p-4">
                        <p className="card-label">Bridge</p>
                        <p className="card-value">DE–TR</p>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-bottom-fade" aria-hidden="true" />
    </header>
  );
}
