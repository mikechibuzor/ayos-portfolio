import type { ContactField, NavigationItem, ProfileFact, ResumeEntry, SocialLink } from "../types/site";
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
} as const;

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
    href: "https://www.behance.net",
    shortLabel: "Be",
    iconSource: behanceIcon,
    iconClassName: "social-links__icon--behance",
  },
  {
    label: "X",
    href: "https://x.com",
    shortLabel: "X",
    iconSource: xIcon,
    iconClassName: "social-links__icon--x",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com",
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
