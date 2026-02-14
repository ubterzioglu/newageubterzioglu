import * as React from "react";

import heroImage from "@/assets/hero-ubterzioglu-night-city.jpg";

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

                <div className="mt-8 max-w-sm sm:max-w-md">
                  <p className="mb-3 text-sm font-medium tracking-wide text-foreground/90">Pages</p>
                  <div className="grid gap-3">
                    {[
                      {
                        icon: "🦉",
                        title: "I don't know!",
                        desc: "Let me show you around.",
                      },
                      {
                        icon: "🧑‍💼",
                        title: "Recruiter",
                        desc: "Hiring view: CV, highlights, and quick fit.",
                      },
                      {
                        icon: "🧭",
                        title: "Explorer",
                        desc: "Knowledge corner: links, articles, reviews, and notes.",
                      },
                      {
                        icon: "🤝",
                        title: "Colleague",
                        desc: "How I work, collaborate, and support.",
                      },
                      {
                        icon: "🧪",
                        title: "QA Engineer",
                        desc: "My QA mindset, tools, and test approach.",
                      },
                      {
                        icon: "👀",
                        title: "Curious Visitor",
                        desc: "Quick tour: what I do, in plain language.",
                      },
                      {
                        icon: "👽",
                        title: "Alien",
                        desc: "Fun mode: welcome, Earth visitor.",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.title}
                        type="button"
                        className={cn(
                          "group text-left",
                          "rounded-2xl border bg-card/55 backdrop-blur-xl shadow-glass",
                          "px-4 py-4",
                          "transition-colors",
                          "hover:bg-card/70",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        )}
                        aria-label={opt.title}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5 grid h-9 w-9 place-items-center rounded-xl border bg-background/20 text-base">
                              <span aria-hidden="true">{opt.icon}</span>
                            </div>
                            <div>
                              <p className="text-base font-semibold tracking-tight text-foreground">{opt.title}</p>
                              <p className="mt-1 text-sm leading-snug text-foreground/80">{opt.desc}</p>
                            </div>
                          </div>
                          <span className="text-foreground/50 transition-colors group-hover:text-foreground/80" aria-hidden="true">
                            ›
                          </span>
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
