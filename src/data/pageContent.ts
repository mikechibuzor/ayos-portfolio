import type { MePageContent, PageIntro } from "../types/site";

export const pageIntros = {
  me: {
    eyebrow: "Profile",
    title: "Designing calm interfaces for complex products.",
    description:
      "Ayomide is a product designer focused on digital experiences that feel simple, useful, and quietly powerful.",
  },
  works: {
    eyebrow: "Selected work",
    title: "Check out my works",
    description: "Delivering excellence at all levels",
  },
  resume: {
    eyebrow: "Resume",
    title: "Experience shaped around useful products.",
    description:
      "A concise view of recent roles, responsibilities, and the product problems Ayomide has been solving.",
  },
  connect: {
    eyebrow: "Connect",
    title: "Let’s talk about the next useful thing.",
    description:
      "Share the product, brand, or experience you are building and we will turn the next step into something clear.",
  },
} satisfies Record<string, PageIntro>;

export const mePageContent = {
  headlineSegments: [
    { text: "I’m Ayomide, ", tone: "primary" },
    { text: "I design products that actually solve problems and help brands reach their ", tone: "muted" },
    { text: "business goals.", tone: "accent" },
  ],
  paragraphs: [
    "I’m a Product & Brand Designer with over 5 years of creative experience and 3+ years turning real-world ideas into digital products that make people’s lives easier (and a little more beautiful).",
    "I’ve always believed design sits at the intersection of logic and emotion — where thoughtful strategy meets visual storytelling. My work revolves around creating experiences that don’t just look great, but actually work for the people using them.",
  ],
  mediaStripLabel: "Profile media previews",
  mediaPreviewLabel: "Focused profile media preview",
  mediaPreviewCloseLabel: "Close focused profile media preview",
  mediaShuffleLabel: "Shuffle deck",
  overview: {
    title:
      "The only prerequisite? Awesomeness — at any stage of the journey: idea, redesign, or reinvention.",
    paragraphs: [
      "I work with driven founders and teams to bring bold ideas to life, whether they’re just sketches on a napkin, existing products ready for a redesign, or platforms looking to evolve into something greater. My goal is always the same: to turn imagination into impact and make the future feel a little closer.",
      "At the core of what I do is product design — my bread and butter. I design for web, mobile, and desktop platforms, building experiences that are both functional and human. Along the way, I’ve also explored the craft of website design, advanced prototyping, design systems, custom icons and illustrations, brand identity, and even launch visuals when needed.",
      "No two projects are ever the same. Every collaboration brings a new challenge, a new perspective, and a new chance to create something meaningful. I don’t believe in one-size-fits-all design — I believe in thoughtful, user-centered solutions built with intention and creativity.",
    ],
    tags: ["Visual design", "Prototyping", "Research", "Branding", "Brand Strategy"],
  },
  stackShowcase: {
    title: "My Stacks",
    subtitle: "Let's build that brilliant idea together",
    projectLabels: ["Building VBAN", "Building VBAN", "Building VBAN", "Building VBAN"],
  },
  experience: {
    title: "Experience Highlight",
    subtitle: "Experience Highlight",
    entries: [
      {
        id: "iterative-financials",
        company: "Iterative Financials, Inc.",
        role: "Product designer",
        period: "2024 - PRESENT",
        description:
          "At Iterative Financials, I shape product experiences for financial and operational tools, turning dense workflows into calm interfaces that teams can trust and use repeatedly.",
      },
      {
        id: "vban",
        company: "vban",
        role: "Product designer",
        period: "2024 - PRESENT",
        description:
          "On VBAN, I work across remittance and payment experiences, designing flows that make complex financial actions feel clear, confident, and easy to complete.",
      },
      {
        id: "chekker-health",
        company: "Chekker Health",
        role: "Product designer",
        period: "2024 - 2025",
        description:
          "From there, I joined Chekker, a healthcare tech company, where I focused on designing digital experiences that made medical testing and health services more accessible. Working in that space taught me the importance of empathy in design — how a simple interface can literally improve someone’s well-being.",
      },
      {
        id: "eoc",
        company: "EOC",
        role: "Product design intern",
        period: "2022 - 2024",
        description:
          "At EOC, I built early creative range across brand, UI, social content, and web design, learning how to connect visual craft with real business and user goals.",
      },
    ],
  },
  creating: {
    title: "When I’m Not Pushing Pixels, I’m Still Creating",
    paragraphs: [
      "When I’m not designing, I’m usually in my own little creative world — either playing video games, watching anime, or producing music (yes, I make beats and sound experiments for fun). These hobbies keep me curious, inspired, and always looking at design from new angles.",
      "They also remind me that creativity doesn’t have to be confined to pixels — it’s a way of seeing, building, and connecting everything around us.",
    ],
  },
  testimonials: {
    title: "What people say about me",
    quoteSymbol: "“",
    items: [
      {
        quote:
          "I kicked off my design career at a small digital agency, where I wore many hats — from branding to UI, social content to web design. That early experience gave me the freedom to explore and build for diverse industries, shaping how I think about design from both the business and human side.",
        author: "Ayodeji Osindele",
        role: "Creative Director, EOC",
      },
      {
        quote:
          "I kicked off my design career at a small digital agency, where I wore many hats — from branding to UI, social content to web design. That early experience gave me the freedom to explore and build for diverse industries, shaping how I think about design from both the business and human side.",
        author: "Ayodeji Osindele",
        role: "Creative Director, EOC",
      },
      {
        quote:
          "I kicked off my design career at a small digital agency, where I wore many hats — from branding to UI, social content to web design. That early experience gave me the freedom to explore and build for diverse industries, shaping how I think about design from both the business and human side.",
        author: "Ayodeji Osindele",
        role: "Creative Director, EOC",
      },
      {
        quote:
          "I kicked off my design career at a small digital agency, where I wore many hats — from branding to UI, social content to web design. That early experience gave me the freedom to explore and build for diverse industries, shaping how I think about design from both the business and human side.",
        author: "Ayodeji Osindele",
        role: "Creative Director, EOC",
      },
    ],
  },
} satisfies MePageContent;
