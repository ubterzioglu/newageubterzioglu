import * as React from "react";

import heroImage from "@/assets/hero-ubterzioglu-workstation-cyan.jpg";

import thumbCuriousVisitor from "@/assets/thumb-curious-visitor-v2.jpg";
import thumbIDontKnow from "@/assets/thumb-i-dont-know-v2.jpg";
import thumbRecruiter from "@/assets/thumb-recruiter-v2.jpg";
import thumbColleague from "@/assets/thumb-colleague-v2.jpg";
import thumbQa from "@/assets/thumb-qa-v2.jpg";
import thumbAlien from "@/assets/thumb-alien-v2.jpg";

import { CodeRainOverlay } from "@/components/visual/CodeRainOverlay";
import { cn } from "@/lib/utils";


export const CinematicHeroNewAge = React.forwardRef<HTMLElement, { className?: string }>(
  ({ className }, ref) => {
  const PANELS = [
    "home",
    "curious",
    "idk",
    "recruiter",
    "colleague",
    "qa",
    "alien",
  ] as const;

  type Panel = (typeof PANELS)[number];

  const [panel, setPanel] = React.useState<Panel>("home");
  const activeIndex = Math.max(0, PANELS.indexOf(panel));

  const contentPanelsCount = PANELS.length;

  const personaPanels: Array<{ key: Exclude<Panel, "home">; title: string; blurb: string }> = [
    {
      key: "curious",
      title: "Curious visitor",
      blurb: "Explore who I am, what I build, and what I’m currently learning.",
    },
    {
      key: "idk",
      title: "I don't know!",
      blurb: "No pressure—let’s start with the highlights and a guided tour.",
    },
    {
      key: "recruiter",
      title: "Recruiter",
      blurb: "A concise overview: roles, strengths, and where I can deliver impact.",
    },
    {
      key: "colleague",
      title: "Colleague",
      blurb: "How I collaborate: values, communication style, and working agreements.",
    },
    {
      key: "qa",
      title: "QA Engineer",
      blurb: "My testing mindset: strategy, tooling, and quality practices I care about.",
    },
    {
      key: "alien",
      title: "Alien",
      blurb: "Welcome, traveler. Let’s communicate via patterns and signals.",
    },
  ];

  return (
    <header ref={ref} className={cn("relative h-[100svh] overflow-hidden", className)}>
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="A cinematic night office scene with a software tester and developer sitting at a desk, back turned, illuminated by cyan monitor glow"
          className="h-full w-full object-cover object-[64%_55%]"
          loading="eager"
          decoding="async"
        />
        {/* Tone mapping + gradient to preserve left content area */}
        <div className="absolute inset-0 bg-hero" />
      </div>

      {/* Ambient overlays */}
      <div className="absolute inset-0 bg-aurora" aria-hidden="true" />
      <CodeRainOverlay className="opacity-100" layers={3} />

      {/* Left content */}
      <div className="relative z-10">
        {/* Sliding stage */}
        <div
          className={cn("flex h-[100svh] transition-transform duration-300 ease-out")}
          style={{
            width: `${contentPanelsCount * 100}%`,
            transform: `translateX(-${activeIndex * (100 / contentPanelsCount)}%)`,
          }}
        >
          {/* Panel: Home */}
          <section style={{ width: `${100 / contentPanelsCount}%` }}>
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
                      <span className="block">Welcome to my page stranger!</span>
                      <span className="block">I&apos;m Umut Barış Terzioğlu.</span>
                      <span className="block">Choose your path to proceed! Who are you?</span>
                    </p>

                    <div className="mt-4 max-w-lg sm:max-w-xl">
                      <div className="grid gap-2 sm:grid-cols-2">
                        {[
                          {
                            title: "Curious visitor",
                            image: thumbCuriousVisitor,
                            onClick: () => setPanel("curious" as const),
                          },
                          {
                            title: "I don't know!",
                            image: thumbIDontKnow,
                            onClick: () => setPanel("idk" as const),
                          },
                          {
                            title: "Recruiter",
                            image: thumbRecruiter,
                            onClick: () => setPanel("recruiter" as const),
                          },
                          {
                            title: "Colleague",
                            image: thumbColleague,
                            onClick: () => setPanel("colleague" as const),
                          },
                          {
                            title: "QA Engineer",
                            image: thumbQa,
                            onClick: () => setPanel("qa" as const),
                          },
                          {
                            title: "Alien",
                            image: thumbAlien,
                            onClick: () => setPanel("alien" as const),
                          },
                        ].map((opt) => (
                          <button
                            key={opt.title}
                            type="button"
                            onClick={opt.onClick}
                            className={cn(
                              "group text-left",
                              "h-[60px] overflow-hidden",
                              "rounded-2xl border bg-card/55 backdrop-blur-xl shadow-glass",
                              "p-0",
                              "transition-colors",
                              "hover:bg-card/70",
                              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                            )}
                            aria-label={opt.title}
                          >
                            <div className="flex h-full items-stretch">
                              <div className="h-full w-[64px] shrink-0 rounded-l-2xl bg-background/10">
                                <img
                                  src={opt.image}
                                  alt={`${opt.title} thumbnail`}
                                  className="h-full w-full object-cover"
                                  loading="lazy"
                                  decoding="async"
                                />
                              </div>

                              <div className="flex min-w-0 flex-1 items-center gap-3 px-3">
                                <div className="min-w-0">
                                  <p className="text-[15px] font-semibold leading-tight tracking-tight text-foreground sm:text-base">
                                    {opt.title}
                                  </p>
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
          </section>

          {/* Persona panels */}
          {personaPanels.map((p) => (
            <section key={p.key} style={{ width: `${100 / contentPanelsCount}%` }}>
              <div className="h-[100svh] bg-background">
                <div className="container">
                  <div className="grid h-[100svh] content-center">
                    <div className="max-w-2xl">
                      <button
                        type="button"
                        onClick={() => setPanel("home")}
                        className={cn(
                          "mb-6 inline-flex items-center gap-2 rounded-full border bg-card/40 px-3 py-1 text-sm",
                          "transition-colors hover:bg-card/55",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        )}
                      >
                        <span aria-hidden="true">‹</span>
                        Back
                      </button>

                      <h2 className="hero-title text-2xl leading-tight md:text-4xl">{p.title}</h2>
                      <p className="mt-3 max-w-prose text-sm leading-relaxed text-foreground/85">{p.blurb}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-bottom-fade" aria-hidden="true" />
    </header>
  );
},
);
CinematicHeroNewAge.displayName = "CinematicHeroNewAge";

export default CinematicHeroNewAge;

