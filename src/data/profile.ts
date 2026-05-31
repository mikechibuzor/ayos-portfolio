import type { ContactField, HomeAudienceIntro, NavigationItem, ProfileFact, ResumeEntry, SocialLink } from "../types/site";
import { SiteRoute } from "../types/site";
import behanceIcon from "../assets/icons/social/behance.svg";
import instagramIcon from "../assets/icons/social/instagram.svg";
import linkedinIcon from "../assets/icons/social/linkedin.svg";
import xIcon from "../assets/icons/social/x.svg";

export const profile = {
  ownerName: "Oluolagunju Ayomide",
  role: "Product Designer",
  pageTitle: "Oluolagunju Ayomide - Product Designer",
  heroTitle:
    "Turning difficult problems into delightful digital experiences — the kind that feel simple, intuitive, and quietly powerful.",
  heroSubtitle:
    "Currently blowing bubbles and fight crimes with Oval labs inc. Building vban and other cool stuffs.",
  stacksTitle: "My Stacks",
  stacksSubtitle: "Let's build that brilliant idea together",
  contactAvailability: "Available",
  contactTitle: "Let's collaborate on your next big idea",
  contactSubtitle: "Share your goals, and we will help turn them into real results.",
  contactButtonLabel: "Send message",
  footerTitle: "Whatever I touch, I leave my footprint.",
  footerSubtitle: "Let's build that brilliant idea together",
  footerCredit: "Cooked and chopped by Oluolagunju Ayomide",
  footerYear: "2026",
  contactEmail: "oluolagunjuayomide@gmail.com",
  heroAudienceLabel: "Choose homepage introduction",
  heroLocationStartLabel: "LAGOS",
  heroLocationEndLabel: "NIGERIA",
} as const;

export const homeAudienceIntros: HomeAudienceIntro[] = [
  {
    id: "everyone",
    label: "Everyone",
    title:
      "Hi there, I design digital products that feel like somebody actually thought about you. Because somebody did",
  },
  {
    id: "recruiters",
    label: "Recruiters",
    title:
      "I've spent 4 years turning vague briefs, tight deadlines, and shifting requirements into products people actually enjoy. That's not luck — that's process.",
  },
  {
    id: "engineers",
    label: "Engineers",
    title:
      "I don't hand off pretty pictures and disappear. I sit in the complexity with you, think through the edge cases, and design something we can both be proud of shipping.",
  },
  {
    id: "designers",
    label: "Designers",
    title:
      "Most designers have a process. Mine started with feeling — music, stories, visuals that hit different. Design just became the most useful place to channel that.",
  },
];

export const navigationItems: NavigationItem[] = [
  { label: "/home", href: SiteRoute.Home },
  { label: "/me", href: SiteRoute.Me },
  { label: "/works", href: SiteRoute.Works },
  { label: "/resume", href: SiteRoute.Resume },
  { label: "/connect", href: SiteRoute.Connect },
];

export const socialLinks: SocialLink[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com",
    shortLabel: "in",
    iconSource: linkedinIcon,
    iconClassName: "social-links__icon--linkedin",
  },
  {
    label: "Behance",
    href: "https://www.behance.net/oluolaayomide",
    shortLabel: "Be",
    iconSource: behanceIcon,
    iconClassName: "social-links__icon--behance",
  },
  {
    label: "X",
    href: "https://x.com/oluolagunju_ayo?s=21",
    shortLabel: "X",
    iconSource: xIcon,
    iconClassName: "social-links__icon--x",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/oluolagunju.ayomide?igsh=N3Bka25xdGQyZjF0&utm_source=qr",
    shortLabel: "Ig",
    iconSource: instagramIcon,
    iconClassName: "social-links__icon--instagram",
  },
];

export const contactFields: ContactField[] = [
  { id: "fullName", label: "Your full name", inputType: "text" },
  { id: "email", label: "Your email", inputType: "email" },
  { id: "message", label: "Your message", inputType: "textarea" },
];

export const profileFacts: ProfileFact[] = [
  { label: "Focus", value: "Product design, interaction systems, and digital product strategy." },
  { label: "Currently", value: "Building thoughtful financial and operational products with Oval Labs Inc." },
  { label: "Strength", value: "Turning complex user journeys into clear, confident interfaces." },
];

export const resumeEntries: ResumeEntry[] = [
  {
    role: "Product Designer",
    company: "Oval Labs Inc.",
    period: "Present",
    description: "Designing VBAN and related product experiences across remittance, onboarding, and business workflows.",
  },
  {
    role: "Product Designer",
    company: "Independent Projects",
    period: "2024",
    description: "Shaping fintech, healthcare, commerce, and sports products from discovery through interface execution.",
  },
];
