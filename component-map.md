# Component Map

## Status

Initial extraction complete from main Figma frame. `/me`, `/works`, `/connect`, and the shared case-study detail structure are now mapped from supplied Figma screenshots.

## Reusable Units

- `SiteHeader`
  - Slash-style nav links.
  - Social icon group.
  - Center theme toggle shared across routes.
  - Needs mobile variant.
- `SocialLinks`
  - Reused in header and footer.
- `IntroHero`
  - Large intro statement and supporting status line.
- `WorkFilterBar`
  - Category filters with counts and active state.
- `ProjectGrid`
  - Desktop masonry-style, responsive collapse required.
- `ProjectCard`
  - Media block, title/year, tags, description, case-study/live actions.
  - Case-study action navigates to `/works/:slug`; lock remains a status icon where Figma shows it.
- `Tag`
  - Small uppercase project tags.
- `TextLinkAction`
  - Inline button with optional icon/lock and divider.
- `StackSection`
  - Centered heading plus technology logo tiles.
- `LogoTile`
  - Bordered rounded square icon tile.
- `ContactSection`
  - Availability badge, contact copy, form fields, submit button.
- `TextInput`
  - Underline-style input.
- `Footer`
  - CTA copy, social icons, credit/year row.
- `MeIntroSection`
  - Color-segmented headline, two-paragraph copy block, six-card staggered media stage.
  - Hover highlights selectable media cards; click opens a centered spin-in preview without disturbing the Figma card stack.
- `MeOverviewSection`
  - Centered display copy, paragraph stack, and service chips.
- `MeStackShowcase`
  - Split heading + horizontally overflowing stack-logo row + project preview placeholders.
- `ExperienceHighlight`
  - Two-column accordion-style role cards with click-persistent expanded descriptions.
  - All cards are closed by default; opening one closes the previous card.
- `CenteredTextSection`
  - Reusable centered heading + paragraph stack for personal narrative blocks.
- `TestimonialCarousel`
  - Looping marquee testimonial cards with partial edge cropping, hover pause, and reduced-motion fallback.
- `CaseStudyDetail`
  - Shared `/works/:slug` page renderer.
  - Composes breadcrumb, large media, project summary, metadata, two-column narrative, impact cards, reflection, gallery, related projects, and footer.
- `CaseStudyMetaItem`
  - Icon + text metadata rendered from typed data.
- `CaseStudyNarrativeGrid`
  - Two-column narrative blocks, collapses to one column on mobile.
- `ImpactCard`
  - Used by the case-study impact section.
- `VisualGallery`
  - Horizontal varied-height gallery placeholders until final assets are available.
- `MoreProjectsCarousel`
  - Horizontal overflow cards using the same project data model.

## Reuse Candidates To Confirm In Full Figma Audit

- `RoutePageShell`
  - Shared page container only if `/works`, `/resume`, and `/connect` actually share layout.
  - Do not use for `/me` intro if Figma keeps the custom hero/media composition.
- `MeIntroSection`
  - Should remain dedicated unless another page uses the same composition.
- `ProjectIndexSection`
  - Filter bar + project grid/card system.
  - Reused by home work section and `/works`.
- `CaseStudyPreviewAction`
  - Case-study label, lock state, divider, live website link, arrow icon.
  - Used in `ProjectCard`; detail routing behavior needs Figma confirmation.
- `CaseStudyPage`
  - Implemented as reusable `CaseStudyDetail`; authored data lives in `caseStudies.ts`, fallback detail data is generated from project data.
- `ContactFormSection`
  - Candidate reuse between home contact area and `/connect`.

## Works Page Reuse Decision

- `/works` composes `ProjectIndex`, `ProjectCard`, `WorkFilterBar`, `ContactSection`, and `Footer`.
- Keep project filtering state local to the page so Home and Works do not affect each other.
- Keep the center theme toggle in `SiteHeader`, not per page, because it is part of the global navigation system.

## Data Models

```ts
type ProjectCategory = "WEB" | "MOBILE" | "FINTECH" | "SPORT" | "E-COMMERCE" | "HEALTHCARE" | "BRANDING";

type Project = {
  title: string;
  slug: string;
  year: string;
  categories: ProjectCategory[];
  summaryLabel: string;
  description: string;
  imageDescription: string;
  caseStudyHref?: string;
  liveHref?: string;
  isCaseStudyLocked: boolean;
};

type CaseStudy = {
  slug: string;
  title: string;
  category: string;
  liveHref?: string;
  coverImageDescription: string;
  metaItems: Array<{
    id: string;
    icon: "ROLE" | "LEAD" | "TEAM" | "CALENDAR";
    label: string;
  }>;
  textSections: Array<{
    id: string;
    title: string;
    paragraphs: Array<{
      lead?: string;
      text: string;
    }>;
  }>;
  impactTitle: string;
  impactCards: Array<{
    id: string;
    title: string;
    label: string;
  }>;
  reflection: {
    id: string;
    title: string;
    paragraphs: Array<{
      lead?: string;
      text: string;
    }>;
  };
  galleryTitle: string;
  galleryItems: Array<{
    id: string;
    label: string;
  }>;
  moreProjectsTitle: string;
};
```

## Responsive Notes

- Header social icons can remain visible on tablet, but mobile likely needs compact nav or menu.
- Work grid should move from 3 columns to 2 columns to 1 column.
- Project media heights should become ratio-based instead of fixed per card where needed.
- Stack logo row can wrap or become horizontal scroll on small screens.
- Case-study narrative grid should collapse from two columns to one.
