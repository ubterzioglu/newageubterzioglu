export type RecruiterBullet = {
  text: string;
  tags?: string[];
};

export type RecruiterExperienceItem = {
  role: string;
  company: string;
  period: string;
  location?: string;
  bullets: RecruiterBullet[];
};

export type RecruiterProjectItem = {
  title: string;
  description: string;
};

export type RecruiterContactItem = {
  kind: "whatsapp" | "linkedin" | "instagram" | "location" | "phone" | "email";
  label: string;
  href: string;
};

// Derived from oldsite/zrecruiter.html and the related recruiter cards in oldsite/card-loader.js.
export const recruiterContent = {
  cvLinks: {
    en: "https://drive.google.com/file/d/1T5yUafZI9nRv1aVWeEKBHcU6apZOojP2/view",
    de: "https://drive.google.com/file/d/15_4pguyDYAYtoqYs_7rwCCzdHknfvZ6D/view",
  },
  aboutMe:
    "Senior Software Quality Assurance Engineer with 15+ years of experience in test management, test automation, and process optimization. Proven expertise in leading global testing initiatives, implementing automation frameworks, and managing cross-functional teams. Specialized in Agile/SCRUM methodologies, CI/CD pipelines, and quality assurance for enterprise systems. Strong background in coordinating FAT and SAT activities, mentoring teams, and delivering high-quality software solutions.",
  achievements: [
    { text: "Created 5000+ test cases using HP ALM, Jira, and Polarion over 10+ years of hands-on testing experience." },
    { text: "Increased test coverage from 50% to 90% for Daimler projects through systematic test design techniques." },
    { text: "Achieved 95% test coverage for Swisslog projects using modular test design." },
    { text: "Implemented Ranorex automation for three major Daimler systems, integrating CI/CD pipelines (Jenkins)." },
    { text: "Automated 1000+ test cases with Ranorex and C#, reducing execution time by 40% through optimization." },
    { text: "Reviewed automation of 1000+ Selenium-Java test cases, improving execution efficiency by 30%." },
    { text: "Defined and implemented a new test strategy for the Daimler PDM System, boosting efficiency by 25%." },
    { text: "Planned and coordinated 50+ releases for 40,000+ users in the Daimler PDM ecosystem." },
    { text: "Managed HP ALM to Jira migration, reducing manual effort by 25% and project costs by 22%." },
    { text: "Resolved 1000+ support tickets, ensuring quick turnaround and high stakeholder satisfaction." },
    { text: "Onboarded, mentored, and led 30+ QA colleagues at Daimler and Swisslog." },
    { text: "Created KPI-based reports in Excel and Polarion, improving visibility and saving 500 man-hours monthly." },
    { text: "Conducted 50+ customer sessions (UAT, FAT, SAT) across enterprise-level projects." },
  ] satisfies RecruiterBullet[],
  techStack: [
    {
      title: "Automation and Frameworks",
      items: ["Selenium", "Ranorex", "Maven", "TestNG", "JUnit", "Cucumber", "Gherkin"],
    },
    {
      title: "Programming Languages",
      items: ["Java", "C#", "Python"],
    },
    {
      title: "API and Integration Testing",
      items: ["REST", "SOAP", "Postman", "SoapUI", "API Mocking"],
    },
    {
      title: "CI/CD and DevOps Pipeline",
      items: ["Jenkins", "Docker", "Git", "GitHub"],
    },
    {
      title: "Test Management and Tracking",
      items: ["JIRA", "Xray", "HP ALM", "Polarion"],
    },
    {
      title: "Development and IDE Tools",
      items: ["IntelliJ IDEA", "Visual Studio", "VS Code", "Eclipse"],
    },
    {
      title: "Methodologies and QA Approach",
      items: ["Agile", "SCRUM", "Waterfall", "CI/CD"],
    },
  ] as const,
  experience: [
    {
      role: "Test Lead",
      company: "Swisslog",
      period: "2021 - 2025",
      location: "Dortmund",
      bullets: [
        { text: "Designed and executed 1,000+ test cases", tags: ["Polarion", "Selenium", "Java"] },
        {
          text: "Test Lead for one of Swisslog's largest projects with 500 users and 10 modules",
          tags: ["Polarion", "WMS", "WES"],
        },
        { text: "Executed 20+ FAT and SAT sessions with customers", tags: ["WMS", "WES", "SynQ", "Polarion"] },
        { text: "Delivered 50+ detailed test and defect reports to project management", tags: ["Polarion", "Excel", "SCRUM"] },
        { text: "Prepared 5 complete project-level test plans", tags: ["Risk-Based Testing", "SCRUM", "Polarion"] },
        { text: "Reviewed automation of 1,000+ test cases", tags: ["Selenium", "Java", "CI Pipelines"] },
        { text: "Provided on-site customer support for 5 go-lives and rollouts", tags: ["WMS", "WES", "SynQ", "Polarion"] },
        { text: "Mentored and onboarded 15+ colleagues", tags: ["SCRUM", "Knowledge Transfer", "Agile Coaching"] },
      ],
    },
    {
      role: "Senior Process Manager",
      company: "Daimler - Mercedes-Benz",
      period: "2020 - 2021",
      location: "Istanbul",
      bullets: [
        {
          text: "Built the complete test structure for Daimler's Part Management System (SRM)",
          tags: ["JIRA", "Xray", "HP ALM", "Ranorex", "C#"],
        },
        {
          text: "Designed the full test structure for Daimler's internal communication system (DARRS)",
          tags: ["JIRA", "HP ALM", "Engineering Client", "Smaragd"],
        },
        { text: "Selected and evaluated test tools via scoring model", tags: ["JIRA", "Xray", "Ranorex", "HP ALM"] },
        {
          text: "Global responsibility for Daimler AG's Part Management System (SRM)",
          tags: ["40,000+ users", "Engineering Client", "Smaragd", "DARRS"],
        },
        { text: "Provided 1st and 2nd level support with 1,000+ resolved tickets", tags: ["JIRA Service Desk", "Defect and Incident Management"] },
        { text: "Process and test automation with 250+ automated and reviewed test cases", tags: ["Ranorex", "C#", "CI Pipelines"] },
        { text: "Planned and coordinated 10+ enterprise-level releases for SRM", tags: ["JIRA", "Confluence", "SCRUM"] },
        { text: "Prepared 50+ test and management reports for stakeholders", tags: ["JIRA Dashboards", "Excel", "Confluence"] },
        { text: "Onboarded and mentored 5+ colleagues", tags: ["Agile", "Knowledge Transfer", "Mentorship"] },
      ],
    },
    {
      role: "Senior Test Manager",
      company: "Daimler - Mercedes-Benz",
      period: "2017 - 2020",
      location: "Istanbul",
      bullets: [
        { text: "Created the software test strategy for Daimler PDM systems", tags: ["JIRA", "Xray", "HP ALM", "SCRUM"] },
        { text: "Quality and release management for PDM system 'Smaragd' (10+ releases)", tags: ["JIRA", "Confluence", "SCRUM"] },
        { text: "Executed E2E test activities for core PDM modules", tags: ["JIRA", "HP ALM", "E2E Testing"] },
        { text: "Managed HP ALM to Xray migration for Smaragd", tags: ["HP ALM", "Xray", "JIRA"] },
        { text: "Applied SCRUM methodology across test processes", tags: ["SCRUM", "JIRA", "Confluence"] },
        { text: "Selected test tools via scoring model and technical evaluation", tags: ["Ranorex", "JIRA", "Xray", "HP ALM", "C#"] },
        { text: "Built JIRA projects from scratch for Daimler test activities", tags: ["JIRA Administration", "Workflow Design", "Defect Management"] },
        { text: "Automated 1,000+ test cases for PDM System 'Smaragd'", tags: ["Ranorex", "C#"] },
        { text: "Mentored and onboarded 20+ colleagues", tags: ["SCRUM", "Knowledge Transfer", "Agile Coaching"] },
      ],
    },
    {
      role: "Development Engineer",
      company: "Daimler - Mercedes-Benz",
      period: "2007 - 2017",
      bullets: [
        { text: "Interior design and vehicle components development", tags: ["Catia V4/V5", "Siemens NX", "SAP", "DOORS", "SWAN"] },
        { text: "Integration team - Project Next Generation Conecto", tags: ["Catia V5", "Siemens NX", "SAP", "DOORS"] },
        { text: "Factory support for customer special order vehicles (Mannheim)", tags: ["Catia V5", "SAP", "DOORS"] },
        { text: "Prototype assembly support for NCI E6 vehicles", tags: ["Catia V5", "Siemens NX", "SAP", "DOORS"] },
        { text: "Integration support for Setra vehicle assembly projects", tags: ["Catia V5", "Siemens NX", "SAP", "DOORS"] },
      ],
    },
  ] satisfies RecruiterExperienceItem[],
  corporateProjects: [
    {
      title: "Smaragd - Daimler / Mercedes-Benz",
      description:
        "A global Product Data Management system used by thousands of engineers across Mercedes-Benz. Test strategy, quality processes, and release management were established and executed throughout the project lifecycle. The system supported highly complex engineering workflows and integrations.",
    },
    {
      title: "SRM - Daimler / Mercedes-Benz",
      description:
        "A critical Supply and Parts Management platform serving tens of thousands of internal users. End-to-end testing, test automation processes, and global rollout support were delivered. The project played a key role in ensuring stability across global supply chain operations.",
    },
    {
      title: "DARRS - Daimler / Mercedes-Benz",
      description:
        "An internal communication and reporting system used for operational and management-level decision processes. Functional, integration, and user acceptance testing activities were carried out. The system directly supported data-driven corporate operations.",
    },
    {
      title: "TKL - Swisslog",
      description:
        "A warehouse automation and robotics integration project for logistics operations. Software and hardware synchronization tests were executed across robotic and conveyor systems. The project required high reliability under real-time operational conditions.",
    },
    {
      title: "Kruitbosch - Swisslog",
      description:
        "A warehouse management system supporting retail distribution operations. Order picking, stock management, and shipment processes were tested across automated workflows. Close interaction between physical automation and software systems was a key success factor.",
    },
    {
      title: "Albert Heijn - Swisslog",
      description:
        "A high-volume warehouse automation project for one of Europe's largest retail chains. System validation, go-live support, and data integrity testing were delivered under heavy operational load. The project operated in a high-availability production environment.",
    },
    {
      title: "EDEKA - Swisslog",
      description:
        "A large-scale automation project for Germany's leading supermarket group. Pre-go-live validation, integration testing, and operational stability checks were conducted. The system ensured uninterrupted warehouse operations during transition phases.",
    },
  ] satisfies RecruiterProjectItem[],
  privateProjects: [
    {
      title: "UBT - Testing",
      description:
        "A personal quality assurance brand focused on sharing real-world testing experience and best practices. The platform covers test strategies, tools, and career-related insights, serving as a professional personal knowledge hub.",
    },
    {
      title: "All in 2 Minutes!",
      description:
        "A short-form content series designed to explain complex topics in under two minutes. The concept focuses on speed, clarity, and entertainment, combining educational value with engaging presentation.",
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
        "An educational micro-content platform built around daily 'Did you know?' facts. The project focuses on curiosity, learning, and knowledge sharing, designed to be short, informative, and engaging.",
    },
    {
      title: "Don't Follow Just Like",
      description:
        "An entertainment-focused digital brand built on irony, humor, and experimental social content. The concept plays with reversed social-media dynamics and is designed purely for engagement and creative expression.",
    },
  ] satisfies RecruiterProjectItem[],
  contacts: [
    { kind: "whatsapp", label: "WhatsApp", href: "https://wa.me/491739569429" },
    { kind: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/ubterzioglu/" },
    { kind: "instagram", label: "Instagram", href: "https://www.instagram.com/ubterzioglu/" },
    { kind: "location", label: "Dortmund", href: "https://maps.google.com/?q=Dortmund,Germany" },
    { kind: "phone", label: "Phone", href: "tel:+491739569429" },
    { kind: "email", label: "Email", href: "mailto:ubterzioglu@gmail.com" },
  ] satisfies RecruiterContactItem[],
} as const;
