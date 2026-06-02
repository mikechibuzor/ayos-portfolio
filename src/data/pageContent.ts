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
    title: "Designs built to disappear — and be remembered anyway.",
    description: "Every project here started with a problem worth solving. Here's what came out the other side.",
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
    { text: "I'm Ayomide, and I've never designed anything I wasn't trying to break first.", tone: "primary" },
  ],
  paragraphs: [
    "Every product I've worked on has taught me something the previous one couldn't. One of them is Vban — a remittance platform built for Africans earning in foreign currencies. I designed it from scratch, across every surface: admin, mobile, web. And as it grows, I grow it with it.",
    "Product design is the craft. Building something that becomes something — that's the point.",
    "“I kicked off my design career at a small digital agency, where I wore many hats — from branding to UI, social content to web design. That early experience gave me the freedom to explore and build for diverse industries, shaping how I think about design from both the business and human side.”",
  ],
  mediaStripLabel: "Profile media previews",
  mediaPreviewLabel: "Focused profile media preview",
  mediaPreviewCloseLabel: "Close focused profile media preview",
  mediaShuffleLabel: "Shuffle deck",
  overview: {
    title: "You don't need a finished idea. You just need the right one.",
    paragraphs: [
      "I work with founders and teams at whatever stage they're at — early chaos, mid-rebuild, or the uncomfortable moment your retention numbers tell you something your instincts didn't. I've been in all three rooms.",
      "I come in, question everything, and pull until something clicks. My process isn't linear and I won't pretend it is — I sketch chaos first, then find the order buried inside it.",
      "The core is product design — web, mobile, desktop. Around it: brand identity, design systems, prototyping, launch visuals. Whatever the build needs. No two projects are the same, and I'm not interested in treating them like they are.",
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
    title: "I make beats I'll probably never release.",
    paragraphs: [
      "Sound experiments, weird textures, half-finished tracks living in folders I never open twice. Not a side hustle — just what happens when the need to keep making things doesn't stop at 6pm.",
      "Video games and anime live in the same drawer. Both are masterclasses in pacing, world-building, and the kind of visual storytelling that never makes it into a design case study. They keep me curious, a little restless, and permanently skeptical of first drafts.",
      "That restlessness is the job. I just stopped pretending it has an off switch.",
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
