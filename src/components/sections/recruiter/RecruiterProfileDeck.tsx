import * as React from "react";

import {
  Download,
  ExternalLink,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

import avatarImage from "@/assets/hero-ubterzioglu-user-ohbe.png";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { recruiterContent, type RecruiterBullet, type RecruiterContactItem } from "./recruiter-content";

type DeckVariant = "cyan" | "orange" | "green" | "purple" | "yellow";

function DeckCard({
  title,
  variant,
  className,
  children,
}: {
  title: string;
  variant: DeckVariant;
  className?: string;
  children: React.ReactNode;
}) {
  const variants: Record<DeckVariant, string> = {
    cyan:
      "bg-[radial-gradient(120%_120%_at_0%_0%,hsl(var(--primary)/.55),transparent_56%),linear-gradient(135deg,hsl(var(--secondary))_0%,hsl(var(--background))_100%)]",
    orange:
      "bg-[radial-gradient(120%_120%_at_0%_0%,hsl(var(--accent)/.35),transparent_55%),linear-gradient(135deg,hsl(var(--secondary))_0%,hsl(var(--background))_100%)]",
    green:
      "bg-[radial-gradient(120%_120%_at_0%_0%,hsl(var(--ring)/.3),transparent_55%),linear-gradient(135deg,hsl(var(--secondary))_0%,hsl(var(--background))_100%)]",
    purple:
      "bg-[radial-gradient(120%_120%_at_0%_0%,hsl(var(--primary)/.3),transparent_55%),linear-gradient(135deg,hsl(var(--secondary))_0%,hsl(var(--background))_100%)]",
    yellow:
      "bg-[radial-gradient(120%_120%_at_0%_0%,hsl(var(--muted-foreground)/.18),transparent_55%),linear-gradient(135deg,hsl(var(--secondary))_0%,hsl(var(--background))_100%)]",
  };

  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-[28px] border shadow-glass backdrop-blur",
        variants[variant],
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3 p-5">
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-foreground/55">Recruiter view</p>
          <h2 className="mt-2 text-lg font-semibold tracking-tight">{title}</h2>
        </div>
      </div>
      <div className="px-5 pb-6">{children}</div>
    </section>
  );
}

function BulletLine({ bullet }: { bullet: RecruiterBullet }) {
  return (
    <li className="grid gap-1">
      <p className="text-sm leading-relaxed text-foreground/95">{bullet.text}</p>
      {bullet.tags?.length ? <p className="text-xs text-muted-foreground">{bullet.tags.join(" | ")}</p> : null}
    </li>
  );
}

function CvRow({
  label,
  subtitle,
  href,
}: {
  label: string;
  subtitle: string;
  href: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border bg-card/25 p-4 shadow-sm transition hover:bg-card/35">
      <div className="min-w-0">
        <p className="text-sm font-semibold">{label}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Button asChild size="sm" variant="secondary" className="rounded-xl">
          <a href={href} target="_blank" rel="noreferrer" aria-label={`${label} PDF open link`}>
            <ExternalLink className="mr-2 h-4 w-4" />
            Open
          </a>
        </Button>
        <Button asChild size="sm" variant="outline" className="rounded-xl">
          <a href={href} target="_blank" rel="noreferrer" aria-label={`${label} PDF download link`}>
            <Download className="mr-2 h-4 w-4" />
            PDF
          </a>
        </Button>
      </div>
    </div>
  );
}

function ContactPill({ contact }: { contact: RecruiterContactItem }) {
  const iconMap = {
    whatsapp: MessageCircle,
    linkedin: Linkedin,
    instagram: Instagram,
    location: MapPin,
    phone: Phone,
    email: Mail,
  } as const;

  const Icon = iconMap[contact.kind];
  const external = contact.href.startsWith("http");

  return (
    <a
      href={contact.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={cn(
        "group flex items-center gap-3 rounded-2xl border bg-card/25 px-4 py-3 shadow-sm transition",
        "hover:-translate-y-0.5 hover:bg-card/40",
      )}
    >
      <span className="grid h-11 w-11 place-items-center rounded-full bg-background/50 text-foreground/85">
        <Icon className="h-5 w-5" />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold">{contact.label}</span>
        <span className="block text-xs text-muted-foreground group-hover:text-foreground/70">
          {contact.href.replace(/^mailto:|^tel:/, "")}
        </span>
      </span>
    </a>
  );
}

function ProjectList({
  items,
  prefix,
}: {
  items: ReadonlyArray<{ title: string; description: string }>;
  prefix: string;
}) {
  return (
    <div className="space-y-3">
      {items.map((project) => (
        <div key={project.title} className="rounded-2xl border bg-card/20 p-4">
          <p className="text-sm font-semibold">
            {prefix} {project.title}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
        </div>
      ))}
    </div>
  );
}

export function RecruiterProfileDeck({ className }: { className?: string }) {
  return (
    <div className={cn("grid gap-6 lg:grid-cols-2", className)}>
      <DeckCard title="My CV" variant="cyan">
        <div className="space-y-3">
          <div className="rounded-2xl border bg-card/20 p-4">
            <p className="text-xs font-medium tracking-wide text-muted-foreground">PDF | ATS-friendly | Updated regularly</p>
            <p className="mt-1 text-sm">Choose a language and open the PDF.</p>
          </div>

          <CvRow label="English CV" subtitle="View / Download (PDF)" href={recruiterContent.cvLinks.en} />
          <CvRow label="German CV" subtitle="View / Download (PDF)" href={recruiterContent.cvLinks.de} />
        </div>
      </DeckCard>

      <DeckCard title="About Me" variant="orange">
        <div className="grid gap-4 md:grid-cols-[120px_1fr] md:items-start">
          <div className="mx-auto">
            <img
              src={avatarImage}
              alt="Profile avatar"
              className="h-28 w-28 rounded-full border object-cover shadow-glass"
              loading="lazy"
              decoding="async"
            />
          </div>
          <p className="text-sm leading-relaxed text-foreground/95">{recruiterContent.aboutMe}</p>
        </div>
      </DeckCard>

      <DeckCard title="Key Achievements" variant="green">
        <ul className="space-y-3">
          {recruiterContent.achievements.map((bullet) => (
            <BulletLine key={bullet.text} bullet={bullet} />
          ))}
        </ul>
      </DeckCard>

      <DeckCard title="Tech Stack" variant="orange">
        <div className="space-y-4">
          {recruiterContent.techStack.map((group) => (
            <div key={group.title} className="rounded-2xl border bg-card/20 p-4">
              <p className="text-sm font-semibold">{group.title}</p>
              <p className="mt-2 text-sm text-muted-foreground">{group.items.join(" | ")}</p>
            </div>
          ))}
        </div>
      </DeckCard>

      <section className="lg:col-span-2">
        <DeckCard title="Experience" variant="purple">
          <div className="space-y-6">
            {recruiterContent.experience.map((item) => (
              <div key={`${item.role}-${item.company}-${item.period}`} className="rounded-3xl border bg-card/20 p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <p className="text-base font-semibold">{item.role}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.company}
                      {item.location ? ` | ${item.location}` : ""}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">{item.period}</p>
                </div>
                <ul className="mt-4 space-y-3">
                  {item.bullets.map((bullet) => (
                    <BulletLine key={`${item.role}-${bullet.text}`} bullet={bullet} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </DeckCard>
      </section>

      <DeckCard title="Corporate Projects" variant="yellow">
        <ProjectList items={recruiterContent.corporateProjects} prefix="Launch" />
      </DeckCard>

      <DeckCard title="Private Projects" variant="cyan">
        <ProjectList items={recruiterContent.privateProjects} prefix="Build" />
      </DeckCard>

      <DeckCard title="Contact" variant="green" className="lg:col-span-2">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {recruiterContent.contacts.map((contact) => (
            <ContactPill key={contact.label} contact={contact} />
          ))}
        </div>
      </DeckCard>
    </div>
  );
}
