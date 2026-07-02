export type NavigationItem = {
  label: string;
  href: SiteRoute;
};

export enum SiteRoute {
  Home = "/",
  Me = "/me",
  Works = "/works",
  Resume = "/resume",
  Connect = "/connect",
}

export type SocialLink = {
  label: string;
  href: string;
  shortLabel: string;
  iconSource?: string;
  iconClassName?: string;
};

export type HomeAudienceId = "everyone" | "recruiters" | "engineers" | "designers";

export type HomeAudienceIntro = {
  id: HomeAudienceId;
  label: string;
  title: string;
};

export enum ProjectCategory {
  All = "ALL",
  Web = "WEB",
  Mobile = "MOBILE",
  Fintech = "FINTECH",
  Sport = "SPORT",
  Ecommerce = "E-COMMERCE",
  Healthcare = "HEALTHCARE",
  Branding = "BRANDING",
}

export type WorkProjectCategory = Exclude<ProjectCategory, ProjectCategory.All>;

export type Project = {
  title: string;
  slug: string;
  year: string;
  categories: WorkProjectCategory[];
  summaryLabel: string;
  description: string;
  imageDescription: string;
  imageSource?: string;
  caseStudyHref?: string;
  liveHref?: string;
  isCaseStudyLocked: boolean;
};

export type ProjectFilter = {
  label: string;
  category: ProjectCategory;
  displayCount?: number;
};

export enum ThemeMode {
  Dark = "dark",
  Light = "light",
}

export enum CaseStudyMetaIcon {
  Role = "ROLE",
  Lead = "LEAD",
  Team = "TEAM",
  Calendar = "CALENDAR",
}

export enum CaseStudyTextSectionLayout {
  Half = "HALF",
  Wide = "WIDE",
}

export enum CaseStudyImpactCardVariant {
  Story = "STORY",
  Metric = "METRIC",
}

export type CaseStudyMetaItem = {
  id: string;
  icon: CaseStudyMetaIcon;
  label: string;
};

export type CaseStudyParagraph = {
  lead?: string;
  text: string;
};

export type CaseStudyTextSection = {
  id: string;
  title: string;
  paragraphs: CaseStudyParagraph[];
  layout?: CaseStudyTextSectionLayout;
};

export type CaseStudyImpactCard = {
  id: string;
  title: string;
  label: string;
  variant?: CaseStudyImpactCardVariant;
};

export type CaseStudyGalleryItem = {
  id: string;
  label: string;
  imageSource?: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  category: string;
  liveHref?: string;
  coverImageDescription: string;
  coverImageSource?: string;
  metaItems: CaseStudyMetaItem[];
  textSections: CaseStudyTextSection[];
  impactTitle: string;
  impactCards: CaseStudyImpactCard[];
  reflection: CaseStudyTextSection;
  galleryTitle: string;
  galleryItems: CaseStudyGalleryItem[];
  moreProjectsTitle: string;
};

export type StackTool = {
  name: string;
  iconSource: string;
  iconClassName?: string;
};

export type ContactField = {
  id: string;
  label: string;
  inputType: "text" | "email" | "textarea";
};

export type PageIntro = {
  eyebrow: string;
  title: string;
  description: string;
};

export type MeHeadlineSegment = {
  text: string;
  tone: "primary" | "muted" | "accent";
};

export type MePageContent = {
  headlineSegments: MeHeadlineSegment[];
  paragraphs: string[];
  mediaStripLabel: string;
  mediaPreviewLabel: string;
  mediaPreviewCloseLabel: string;
  mediaShuffleLabel: string;
  overview: MeOverviewSection;
  stackShowcase: MeStackShowcaseSection;
  experience: MeExperienceSection;
  creating: MeTextSection;
  testimonials: MeTestimonialsSection;
};

export type MeOverviewSection = {
  title: string;
  paragraphs: string[];
  tags: string[];
};

export type MeStackShowcaseSection = {
  title: string;
  subtitle: string;
};

export type MeExperienceSection = {
  title: string;
  subtitle: string;
  entries: MeExperienceEntry[];
};

export type MeExperienceEntry = {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
};

export type MeTextSection = {
  title: string;
  paragraphs: string[];
};

export type MeTestimonialsSection = {
  title: string;
  quoteSymbol: string;
  items: MeTestimonial[];
};

export type MeTestimonial = {
  quote: string;
  author: string;
  role: string;
};

export type ProfileFact = {
  label: string;
  value: string;
};

export type ResumeEntry = {
  role: string;
  company: string;
  period: string;
  description: string;
  logoSource: string;
  logoAlt: string;
};
