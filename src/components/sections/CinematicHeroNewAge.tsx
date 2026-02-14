import * as React from "react";

import heroImage from "@/assets/hero-ubterzioglu-night-city.jpg";

import { Card } from "@/components/ui/card";
import { SnowfallOverlay } from "@/components/visual/SnowfallOverlay";
import { cn } from "@/lib/utils";


export function CinematicHeroNewAge({ className }: { className?: string }) {
  return (
    <header className={cn("relative h-[100svh] overflow-hidden", className)}>
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="A cinematic night scene with a trench coat silhouette looking at a futuristic city in the distance"
          className="h-full w-full object-cover object-[68%_92%] origin-bottom scale-[1.18]"
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
          <div className="grid h-[100svh] items-end pb-10 md:items-center md:pb-12">
            <div className="max-w-2xl">
              <div className="animate-fade-in">
                <div className="h-5" aria-hidden="true" />
                <h1 className="hero-title text-3xl leading-[1.05] md:text-5xl">
                  ubterzioglu.de
                  <br />
                  <span className="hero-title-accent">testing software,</span>
                  <br />
                  building apps
                  <br />
                  <span className="hero-title-accent">connecting communities.</span>
                </h1>
                <p className="hero-subtitle">
                  <span className="block">Welcome to my page stranger! I&apos;m Umut Barış Terzioğlu.</span>
                  <span className="block">Choose your path to proceed! Who are you?</span>
                </p>

                <div className="mt-4 max-w-lg sm:max-w-xl">
                  <div className="grid gap-2 sm:grid-cols-2">
                    {[
                      {
                        title: "Curious visitor",
                        desc: "Quick tour and context.",
                      },
                      {
                        title: "I don't know!",
                        desc: "Let me show you around.",
                      },
                      {
                        title: "Recruiter",
                        desc: "Hiring view: CV, highlights, and quick fit.",
                      },
                      {
                        title: "Colleague",
                        desc: "How I work, collaborate, and support.",
                      },
                      {
                        title: "QA Engineer",
                        desc: "My QA mindset, tools, and test approach.",
                      },
                      {
                        title: "Alien",
                        desc: "Fun mode: welcome, Earth visitor.",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.title}
                        type="button"
                        className={cn(
                          "group text-left",
                          "h-[72px] overflow-hidden",
                          "rounded-2xl border bg-card/55 backdrop-blur-xl shadow-glass",
                          "p-0",
                          "transition-colors",
                          "hover:bg-card/70",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        )}
                        aria-label={opt.title}
                      >
                        <div className="flex h-full items-stretch">
                          {/* Schematic visual block (flush, full height, part of the button) */}
                          <div className="h-full w-[76px] shrink-0 rounded-l-2xl bg-background/10 grid place-items-center">
                            <span className="text-sm font-semibold tracking-tight text-foreground/90">Görsel</span>
                          </div>

                          <div className="flex min-w-0 flex-1 items-center gap-3 px-3">
                            <div className="min-w-0">
                              <p className="text-sm font-semibold tracking-tight text-foreground">{opt.title}</p>
                              <p className="mt-0.5 text-xs leading-snug text-foreground/80 line-clamp-2">{opt.desc}</p>
                            </div>

                            <span
                              className="ml-auto text-foreground/50 transition-colors group-hover:text-foreground/80"
                              aria-hidden="true"
                            >
                              ›
                            </span>
                          </div>
                        </div>
                      </button>
                    ))}
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
