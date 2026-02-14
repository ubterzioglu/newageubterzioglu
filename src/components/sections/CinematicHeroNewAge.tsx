import * as React from "react";

import heroImage from "@/assets/hero-ubterzioglu-cinematic.jpg";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SnowfallOverlay } from "@/components/visual/SnowfallOverlay";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  // Keep IA stable: add existing links here without changing routes.
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Community", href: "/community" },
  { label: "Contact", href: "/contact" },
];

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
      <SnowfallOverlay className="opacity-90" layers={2} />

      {/* Navigation */}
      <div className="relative z-10">
        <div className="container">
          <div className="pt-8">
            <nav className="nav-glass">
              <a href="/" className="brand-mark" aria-label="ubterzioglu.de home">
                <span className="brand-dot" aria-hidden="true" />
                <span className="brand-text">ubterzioglu.de</span>
              </a>

              <div className="hidden items-center gap-6 md:flex">
                {navItems.map((item) => (
                  <a key={item.href} href={item.href} className="nav-link">
                    {item.label}
                  </a>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="hidden md:inline-flex">
                  Newsletter
                </Button>
                <Button variant="cta" size="sm">
                  Let’s build
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </div>

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
                  <Button variant="hero" size="lg">
                    Explore work
                  </Button>
                  <Button variant="outline" size="lg">
                    Read the manifesto
                  </Button>
                </div>

                <div className="mt-10 grid gap-4 md:grid-cols-3">
                  <Card className="card-glass">
                    <div className="p-5">
                      <p className="card-label">Focus</p>
                      <p className="card-value">Software & Testing</p>
                    </div>
                  </Card>
                  <Card className="card-glass card-glass--violet">
                    <div className="p-5">
                      <p className="card-label">Mode</p>
                      <p className="card-value">Independent Builder</p>
                    </div>
                  </Card>
                  <Card className="card-glass card-glass--amber">
                    <div className="p-5">
                      <p className="card-label">Signal</p>
                      <p className="card-value">Community Energy</p>
                    </div>
                  </Card>
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
