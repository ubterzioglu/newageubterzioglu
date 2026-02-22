import * as React from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import avatarImage from "@/assets/hero-ubterzioglu-user-ohbe.png";

type Bullet = {
  text: string;
  tags?: string[];
};

type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  location?: string;
  bullets: Bullet[];
};

type ProjectItem = {
  title: string;
  subtitle?: string;
  description: string;
};

const experience: ExperienceItem[] = [
  {
    role: "Test Lead",
    company: "Swisslog",
    period: "2021 – 2025",
    location: "Dortmund",
    bullets: [
      { text: "Designed & executed 1,000+ test cases", tags: ["Polarion", "Selenium", "Java"] },
      {
        text: "Test Lead for one of Swisslog’s largest projects with 500 users & 10 modules",
        tags: ["Polarion", "WMS", "WES"],
      },
      { text: "Executed 20+ FAT & SAT sessions with customers", tags: ["WMS", "WES", "SynQ", "Polarion"] },
      { text: "Delivered 50+ detailed test & defect reports to Project Management", tags: ["Polarion", "Excel", "SCRUM"] },
      { text: "Prepared 5 complete project-level test plans", tags: ["Risk-Based Testing", "SCRUM", "Polarion"] },
      { text: "Reviewed automation of 1,000+ test cases", tags: ["Selenium", "Java", "CI Pipelines"] },
      { text: "Provided on-site customer support for 5 go-lives / rollouts", tags: ["WMS", "WES", "SynQ", "Polarion"] },
      { text: "Mentored & onboarded 15+ colleagues", tags: ["SCRUM", "Knowledge Transfer", "Agile Coaching"] },
    ],
  },
  {
    role: "Senior Process Manager",
    company: "Daimler – Mercedes-Benz",
    period: "2020 – 2021",
    location: "Istanbul",
    bullets: [
      {
        text: "Built the complete test structure for Daimler’s Part Management System (SRM)",
        tags: ["JIRA", "Xray", "HP ALM", "Ranorex", "C#"],
      },
      {
        text: "Designed the full test structure for Daimler’s internal communication system (DARRS)",
        tags: ["JIRA", "HP ALM", "Engineering Client", "Smaragd"],
      },
      { text: "Selected & evaluated test tools via scoring model", tags: ["JIRA", "Xray", "Ranorex", "HP ALM"] },
      {
        text: "Global responsibility for Daimler AG’s Part Management System (SRM)",
        tags: ["~40,000 users", "Engineering Client", "Smaragd", "DARRS"],
      },
      { text: "Provided 1st & 2nd level support with 1,000+ resolved tickets", tags: ["JIRA Service Desk", "Defect & Incident Management"] },
      { text: "Process & test automation with 250+ automated/reviewed test cases", tags: ["Ranorex", "C#", "CI Pipelines"] },
      { text: "Planned & coordinated 10+ enterprise-level releases for SRM", tags: ["JIRA", "Confluence", "SCRUM"] },
      { text: "Prepared 50+ test & management reports for stakeholders", tags: ["JIRA Dashboards", "Excel", "Confluence"] },
      { text: "Onboarded & mentored 5+ colleagues", tags: ["Agile", "Knowledge Transfer", "Mentorship"] },
    ],
  },
  {
    role: "Senior Test Manager",
    company: "Daimler – Mercedes-Benz",
    period: "2017 – 2020",
    location: "Istanbul",
    bullets: [
      { text: "Created the software test strategy for Daimler PDM systems", tags: ["JIRA", "Xray", "HP ALM", "SCRUM"] },
      { text: "Quality & release management for PDM system “Smaragd” (10+ releases)", tags: ["JIRA", "Confluence", "SCRUM"] },
      { text: "Executed E2E test activities for core PDM modules", tags: ["JIRA", "HP ALM", "E2E Testing"] },
      { text: "Managed HP ALM → XRAY migration for Smaragd", tags: ["HP ALM", "XRAY", "JIRA"] },
      { text: "Applied SCRUM methodology across test processes", tags: ["SCRUM", "JIRA", "Confluence"] },
      { text: "Selected test tools via scoring model & technical evaluation", tags: ["Ranorex", "JIRA", "XRAY", "HP ALM", "C#"] },
      { text: "Built JIRA projects from scratch for Daimler test activities", tags: ["JIRA Administration", "Workflow Design", "Defect Management"] },
      { text: "Automated 1,000+ test cases for PDM System “Smaragd”", tags: ["Ranorex", "C#"] },
      { text: "Mentored & onboarded 20+ colleagues", tags: ["SCRUM", "Knowledge Transfer", "Agile Coaching"] },
    ],
  },
  {
    role: "Development Engineer",
    company: "Daimler – Mercedes-Benz",
    period: "2007 – 2017",
    bullets: [
      { text: "Interior design & vehicle components development", tags: ["Catia V4/V5", "Siemens NX", "SAP", "DOORS", "SWAN"] },
      { text: "Integration team – Project Next Generation Conecto", tags: ["Catia V5", "Siemens NX", "SAP", "DOORS"] },
      { text: "Factory support for customer special order vehicles (Mannheim)", tags: ["Catia V5", "SAP", "DOORS"] },
      { text: "Prototype assembly support for NCI E6 vehicles", tags: ["Catia V5", "Siemens NX", "SAP", "DOORS"] },
      { text: "Integration support for Setra vehicle assembly projects", tags: ["Catia V5", "Siemens NX", "SAP", "DOORS"] },
    ],
  },
];

const corporateProjects: ProjectItem[] = [
  {
    title: "Smaragd – Daimler / Mercedes-Benz",
    description:
      "A global Product Data Management system used by thousands of engineers across Mercedes-Benz. Test strategy, quality processes, and release management were established and executed throughout the project lifecycle. The system supported highly complex engineering workflows and integrations.",
  },
  {
    title: "SRM – Daimler / Mercedes-Benz",
    description:
      "A critical Supply & Parts Management platform serving tens of thousands of internal users. End-to-end testing, test automation processes, and global rollout support were delivered. The project played a key role in ensuring stability across global supply chain operations.",
  },
  {
    title: "DARRS – Daimler / Mercedes-Benz",
    description:
      "An internal communication and reporting system used for operational and management-level decision processes. Functional, integration, and user acceptance testing activities were carried out. The system directly supported data-driven corporate operations.",
  },
  {
    title: "TKL – Swisslog",
    description:
      "A warehouse automation and robotics integration project for logistics operations. Software and hardware synchronization tests were executed across robotic and conveyor systems. The project required high reliability under real-time operational conditions.",
  },
  {
    title: "Kruitbosch – Swisslog",
    description:
      "A warehouse management system supporting retail distribution operations. Order picking, stock management, and shipment processes were tested across automated workflows. Close interaction between physical automation and software systems was a key success factor.",
  },
  {
    title: "Albert Heijn – Swisslog",
    description:
      "A high-volume warehouse automation project for one of Europe’s largest retail chains. System validation, go-live support, and data integrity testing were delivered under heavy operational load. The project operated in a high-availability production environment.",
  },
  {
    title: "EDEKA – Swisslog",
    description:
      "A large-scale automation project for Germany’s leading supermarket group. Pre-go-live validation, integration testing, and operational stability checks were conducted. The system ensured uninterrupted warehouse operations during transition phases.",
  },
];

const privateProjects: ProjectItem[] = [
  {
    title: "UBT – Testing",
    description:
      "A personal quality assurance brand focused on sharing real-world testing experience and best practices. The platform covers test strategies, tools, and career-related insights, serving as a professional personal knowledge hub.",
  },
  {
    title: "All in 2 Minutes!",
    description:
      "A short-form content series designed to explain complex topics in under two minutes. The concept focuses on speed, clarity, and entertainment—combining educational value with engaging presentation.",
  },
  {
    title: "Press Enter to Code",
    description:
      "A personal tech and coding content channel focused on development, testing, and productivity. Content includes programming concepts, automation topics, and learning strategies targeting both developers and QA professionals.",
  },
  {
    title: "Software Tester Network",
    description:
      "A professional QA community created to connect software testers globally. Knowledge sharing, technical discussions, and career-focused content are actively supported, promoting collaboration across different QA expertise levels.",
  },
  {
    title: "CAL Community",
    description:
      "A digital alumni and social community platform built to strengthen long-term connections. The project focuses on engagement, event sharing, and collective interaction, achieving strong organic growth in a short time.",
  },
  {
    title: "Picked Scenes!",
    description:
      "A curated digital project highlighting powerful moments from films and series. Each post focuses on storytelling, emotion, and cinematic impact, combining visual culture with short-form editorial content.",
  },
  {
    title: "Loved Your T-Shirt",
    description:
      "A social content concept built around street culture, identity, and visual expression through clothing. The project connects fashion, humor, and spontaneous interaction, emphasizing creativity in everyday moments.",
  },
  {
    title: "Factovium",
    description:
      "An educational micro-content platform built around daily “Did you know?” facts. The project focuses on curiosity, learning, and knowledge sharing, designed to be short, informative, and engaging.",
  },
  {
    title: "Don’t Follow Just Like",
    description:
      "An entertainment-focused digital brand built on irony, humor, and experimental social content. The concept plays with reversed social-media dynamics and is designed purely for engagement and creative expression.",
  },
];

const achievements: Bullet[] = [
  { text: "Created 5000+ test cases using HP ALM, Jira, and Polarion over 10+ years of hands-on testing experience." },
  { text: "Increased test coverage from 50% to 90% for Daimler projects through systematic test design techniques." },
  { text: "Achieved 95% test coverage for Swisslog projects using modular test design." },
  { text: "Implemented Ranorex automation for three major Daimler systems, integrating CI/CD pipelines (Jenkins)." },
  { text: "Automated 1000+ test cases with Ranorex & C#, reducing execution time by 40% through optimization." },
  { text: "Reviewed automation of 1000+ Selenium–Java test cases, improving execution efficiency by 30%." },
  { text: "Defined and implemented a new test strategy for the Daimler PDM System, boosting efficiency by 25%." },
  { text: "Planned & coordinated 50+ releases for 40,000+ users in the Daimler PDM ecosystem." },
  { text: "Managed HP ALM → Jira migration, reducing manual effort by 25% and project costs by 22%." },
  { text: "Resolved 1000+ support tickets, ensuring quick turnaround and high stakeholder satisfaction." },
  { text: "Onboarded, mentored, and led 30+ QA colleagues at Daimler & Swisslog." },
  { text: "Created KPI-based reports in Excel & Polarion, improving visibility and saving 500 man-hours monthly." },
  { text: "Conducted 50+ customer sessions (UAT, FAT, SAT) across enterprise-level projects." },
];

const techStack = {
  "Automation & Frameworks": ["Selenium", "Ranorex", "Maven", "TestNG", "JUnit", "Cucumber", "Gherkin"],
  "Programming Languages": ["Java", "C#", "Python"],
  "API & Integration Testing": ["REST", "SOAP", "Postman", "SoapUI", "API Mocking"],
  "CI/CD & DevOps Pipeline": ["Jenkins", "Docker", "Git", "GitHub"],
  "Test Management & Tracking": ["JIRA", "Xray", "HP ALM", "Polarion"],
  "Development & IDE Tools": ["IntelliJ IDEA", "Visual Studio", "VS Code", "Eclipse"],
  "Methodologies & QA Approach": ["Agile", "SCRUM", "Waterfall", "CI/CD"],
} as const;

const CardShell = ({
  title,
  variant,
  children,
}: {
  title: string;
  variant: "cyan" | "orange" | "green" | "purple" | "yellow";
  children: React.ReactNode;
}) => {
  const variants: Record<typeof variant, string> = {
    cyan:
      "bg-[radial-gradient(120%_120%_at_0%_0%,hsl(var(--primary)/.35),transparent_55%),linear-gradient(135deg,hsl(var(--secondary))_0%,hsl(var(--background))_100%)]",
    orange:
      "bg-[radial-gradient(120%_120%_at_0%_0%,hsl(var(--accent)/.35),transparent_55%),linear-gradient(135deg,hsl(var(--secondary))_0%,hsl(var(--background))_100%)]",
    green:
      "bg-[radial-gradient(120%_120%_at_0%_0%,hsl(var(--ring)/.30),transparent_55%),linear-gradient(135deg,hsl(var(--secondary))_0%,hsl(var(--background))_100%)]",
    purple:
      "bg-[radial-gradient(120%_120%_at_0%_0%,hsl(var(--primary)/.30),transparent_55%),linear-gradient(135deg,hsl(var(--secondary))_0%,hsl(var(--background))_100%)]",
    yellow:
      "bg-[radial-gradient(120%_120%_at_0%_0%,hsl(var(--muted-foreground)/.18),transparent_55%),linear-gradient(135deg,hsl(var(--secondary))_0%,hsl(var(--background))_100%)]",
  };

  return (
    <section className={`relative overflow-hidden rounded-[28px] border shadow-glass backdrop-blur ${variants[variant]}`}>
      <div className="flex items-start justify-between gap-3 p-5">
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        <div className="flex gap-2">
          <Button asChild size="sm" variant="outline" className="rounded-xl">
            <Link to="/">Home</Link>
          </Button>
          <Button asChild size="sm" variant="outline" className="rounded-xl">
            <a href="#top">Top</a>
          </Button>
        </div>
      </div>
      <div className="px-5 pb-6">{children}</div>
    </section>
  );
};

const BulletLine = ({ b }: { b: Bullet }) => (
  <li className="grid gap-1">
    <p className="text-sm leading-relaxed">✅ {b.text}</p>
    {b.tags?.length ? <p className="text-xs text-muted-foreground">🤖 {b.tags.join(", ")}</p> : null}
  </li>
);

export default function CardsPage() {
  return (
    <main id="top" className="min-h-screen bg-background">
      <div className="container py-10">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Cards</h1>
            <p className="mt-1 text-sm text-muted-foreground">Komplike kartların hepsi tek sayfada.</p>
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

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <CardShell title="My CV" variant="cyan">
            <div className="space-y-3">
              <div className="rounded-2xl border bg-card/30 p-4">
                <p className="text-sm font-medium">🇬🇧 English CV</p>
                <p className="text-xs text-muted-foreground">View / Download (PDF)</p>
              </div>
              <div className="rounded-2xl border bg-card/30 p-4">
                <p className="text-sm font-medium">🇩🇪 German CV</p>
                <p className="text-xs text-muted-foreground">View / Download (PDF)</p>
              </div>
              <p className="text-xs text-muted-foreground">PDF · ATS-friendly · Updated regularly</p>
            </div>
          </CardShell>

          <CardShell title="About Me" variant="orange">
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
              <p className="text-sm leading-relaxed">
                Senior Software Quality Assurance Engineer with 15+ years of experience in test management, test automation,
                and process optimization. Proven expertise in leading global testing initiatives, implementing automation
                frameworks, and managing cross-functional teams. Specialized in Agile/SCRUM methodologies, CI/CD
                pipelines, and quality assurance for enterprise systems.
              </p>
            </div>
          </CardShell>

          <CardShell title="Key Achievements" variant="green">
            <ul className="space-y-3">{achievements.map((b, i) => <BulletLine key={i} b={b} />)}</ul>
          </CardShell>

          <CardShell title="Tech Stack" variant="orange">
            <div className="space-y-4">
              {Object.entries(techStack).map(([k, arr]) => (
                <div key={k} className="rounded-2xl border bg-card/20 p-4">
                  <p className="text-sm font-semibold">{k}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{arr.join(" · ")}</p>
                </div>
              ))}
            </div>
          </CardShell>

          <section className="lg:col-span-2">
            <CardShell title="Experience" variant="purple">
              <div className="space-y-6">
                {experience.map((it) => (
                  <div key={`${it.role}-${it.company}-${it.period}`} className="rounded-3xl border bg-card/20 p-5">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div>
                        <p className="text-base font-semibold">{it.role}</p>
                        <p className="text-sm text-muted-foreground">
                          {it.company}
                          {it.location ? ` · ${it.location}` : ""}
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground">{it.period}</p>
                    </div>
                    <ul className="mt-4 space-y-3">
                      {it.bullets.map((b, i) => (
                        <BulletLine key={i} b={b} />
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardShell>
          </section>

          <CardShell title="Corporate Projects" variant="yellow">
            <div className="space-y-3">
              {corporateProjects.map((p) => (
                <div key={p.title} className="rounded-2xl border bg-card/20 p-4">
                  <p className="text-sm font-semibold">🚀 {p.title}</p>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.description}</p>
                </div>
              ))}
            </div>
          </CardShell>

          <CardShell title="Private Projects" variant="cyan">
            <div className="space-y-3">
              {privateProjects.map((p) => (
                <div key={p.title} className="rounded-2xl border bg-card/20 p-4">
                  <p className="text-sm font-semibold">🌟 {p.title}</p>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.description}</p>
                </div>
              ))}
            </div>
          </CardShell>

          <CardShell title="Contact" variant="green">
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
              {[
                { label: "WhatsApp", href: "#" },
                { label: "LinkedIn", href: "#" },
                { label: "Instagram", href: "#" },
                { label: "Maps", href: "#" },
                { label: "Phone", href: "#" },
                { label: "Email", href: "#" },
              ].map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  className="grid h-14 place-items-center rounded-2xl border bg-card/25 text-sm font-medium shadow-sm transition hover:bg-card/40"
                >
                  {c.label}
                </a>
              ))}
            </div>
          </CardShell>

          <CardShell title="Articles" variant="orange">
            <div className="rounded-3xl border bg-card/20 p-4">
              <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl border bg-muted" />
              <div className="mt-4">
                <p className="text-base font-semibold">A Guide for Gen Z to Understand Gen Y</p>
                <p className="mt-1 text-xs text-muted-foreground">12-12-2025</p>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  This article was written from a Gen Y perspective to help Gen Z better understand how Gen Y thinks,
                  works, and communicates.
                </p>
                <div className="mt-4">
                  <Button variant="secondary">Open</Button>
                </div>
              </div>
            </div>
          </CardShell>

          <CardShell title="Useful Apps" variant="purple">
            <div className="rounded-3xl border bg-card/20 p-4">
              <p className="text-sm font-semibold">Ghost Mouse</p>
              <p className="mt-1 text-sm text-muted-foreground">Ghost Mouse automatically moves mouse to keep your system active.</p>
            </div>
          </CardShell>
        </div>

        <footer className="mt-10 text-center text-xs text-muted-foreground">© ubterzioglu · 2025</footer>
      </div>
    </main>
  );
}
