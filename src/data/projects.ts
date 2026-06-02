import { ProjectCategory, type Project, type ProjectFilter } from "../types/site";
import chekkerImage from "../assets/images/projects/chekker.png";
import ekohubImage from "../assets/images/projects/ekohub.jpg";
import kiiraImage from "../assets/images/projects/kiira.png";
import qoreImage from "../assets/images/projects/qore.png";
import signatureBankImage from "../assets/images/projects/signature-bank.png";
import spoxioImage from "../assets/images/projects/spoxio.png";
import vbanThumbnailImage from "../assets/images/projects/vban-thumbnail.png";

export const projectFilters: ProjectFilter[] = [
  { label: "All", category: ProjectCategory.All },
  { label: "Mobile", category: ProjectCategory.Mobile },
  { label: "Web", category: ProjectCategory.Web },
];

export const projects: Project[] = [
  {
    title: "VBAN",
    slug: "vban",
    year: "2024",
    categories: [ProjectCategory.Web, ProjectCategory.Mobile, ProjectCategory.Fintech],
    summaryLabel: "Fin-tech - Remittance product",
    description:
      "VBAN is a remittance product that helps Africans receive payments easily from overseas. I shaped the experience to feel modern, trustworthy, and effortless to use.",
    imageDescription: "Dark product preview card for the VBAN remittance experience.",
    imageSource: vbanThumbnailImage,
    liveHref: "https://vban.com",
    isCaseStudyLocked: true,
  },
  {
    title: "Ekohub",
    slug: "ekohub",
    year: "2024",
    categories: [ProjectCategory.Web, ProjectCategory.Mobile, ProjectCategory.Ecommerce],
    summaryLabel: "E-commerce - Marketplace",
    description:
      "EkoHub is a dynamic commerce platform designed to simplify buying and selling online for everyday sellers and customers.",
    imageDescription: "Dark product preview card for the EkoHub commerce platform.",
    imageSource: ekohubImage,
    caseStudyHref: "/works/ekohub",
    isCaseStudyLocked: false,
  },
  {
    title: "Signature Bank",
    slug: "signature-bank",
    year: "2024",
    categories: [ProjectCategory.Web, ProjectCategory.Mobile, ProjectCategory.Fintech],
    summaryLabel: "Fin-tech - Commercial bank",
    description:
      "Signature Bank delivers personal banking, business banking, and digital financial services through a clear and dependable interface.",
    imageDescription: "Dark product preview card for Signature Bank digital banking.",
    imageSource: signatureBankImage,
    caseStudyHref: "/works/signature-bank",
    liveHref: "https://signaturebank.ng",
    isCaseStudyLocked: false,
  },
  {
    title: "Spoxio",
    slug: "spoxio",
    year: "2024",
    categories: [ProjectCategory.Web, ProjectCategory.Mobile, ProjectCategory.Sport],
    summaryLabel: "Sport - Athlete platform",
    description:
      "Spoxio connects athletes with agents and clubs, helping sports talent bridge the gap between their current path and dream contracts.",
    imageDescription: "Dark product preview card for the Spoxio sports platform.",
    imageSource: spoxioImage,
    caseStudyHref: "/works/spoxio",
    liveHref: "https://spoxio.com",
    isCaseStudyLocked: false,
  },
  {
    title: "Chekker",
    slug: "chekker",
    year: "2024",
    categories: [ProjectCategory.Web, ProjectCategory.Mobile, ProjectCategory.Healthcare],
    summaryLabel: "Healthcare - Digital health",
    description:
      "Chekker is a healthcare platform connecting doctors, patients, laboratories, and phlebotomists in one coordinated ecosystem.",
    imageDescription: "Dark product preview card for the Chekker healthcare platform.",
    imageSource: chekkerImage,
    caseStudyHref: "/works/chekker",
    liveHref: "https://chekkerhealth.com",
    isCaseStudyLocked: false,
  },
  {
    title: "Qore",
    slug: "qore",
    year: "2024",
    categories: [ProjectCategory.Web, ProjectCategory.Fintech],
    summaryLabel: "Fin-tech - Core banking",
    description:
      "Qore builds automation products for financial institutions, simplifying day-to-day operations and core banking management.",
    imageDescription: "Dark product preview card for Qore core banking automation.",
    imageSource: qoreImage,
    caseStudyHref: "/works/qore",
    liveHref: "https://qore.inc",
    isCaseStudyLocked: false,
  },
  {
    title: "Kiira Health",
    slug: "kiira-health",
    year: "2022",
    categories: [ProjectCategory.Web, ProjectCategory.Healthcare],
    summaryLabel: "Healthcare - Virtual care",
    description:
      "Kiira is a Los Angeles-based virtual health clinic dedicated to the holistic wellbeing of young women and gender-diverse students.",
    imageDescription: "Dark product preview card for the Kiira Health virtual care platform.",
    imageSource: kiiraImage,
    caseStudyHref: "/works/kiira-health",
    isCaseStudyLocked: false,
  },
];
