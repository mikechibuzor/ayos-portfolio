# Architecture

## Stack

- React + TypeScript
- Vite
- Plain CSS with design tokens
- CSS-first animation system
- GSAP only if a later interaction needs timeline-level control

## Code Philosophy

- Keep components small and readable.
- Use descriptive names over clever abstractions.
- Keep content/data outside presentation components where practical.
- Avoid hardcoded strings in components; prefer typed data files.
- Keep JSX simple; move complex logic into helpers, hooks, or page-level constants.
- Preserve SVG aspect ratios with fixed icon frames and typed per-icon sizing when needed.
- Use comments to explain key React decisions, data flow, and non-obvious UI logic.
- Avoid comments for obvious JSX or simple CSS.

## Planned Project Structure

```txt
src/
  assets/
    images/
    icons/
  components/
    layout/
    navigation/
    sections/
    projects/
    case-study/
    ui/
  data/
    projects.ts
    profile.ts
    stacks.ts
  pages/
    HomePage.tsx
    CaseStudyPage.tsx
  styles/
    tokens.css
    global.css
    animations.css
  App.tsx
  main.tsx
```

## File Decisions

### `src/main.tsx`

React app entry point. It should stay thin and only mount the app.

### `src/App.tsx`

Top-level application shell. Responsible for routing/page selection once routing is added.

### `src/styles/tokens.css`

Holds colors, spacing, typography, radii, and animation tokens. This prevents one-off values from spreading across components.

### `src/styles/global.css`

Base reset, body styles, font setup, selection styles, and shared defaults.

### `src/styles/animations.css`

Reusable animation utilities and reduced-motion baseline. Keeping these centralized makes motion consistent.

CSS remains the default animation engine. React state is reserved for interactions that need memory, such as click-persistent accordions.

### `src/data/projects.ts`

Stores portfolio project content. Project cards should render from data instead of hardcoded repeated JSX.

### `src/data/caseStudies.ts`

Stores authored case-study content. Detail pages read from this file so the shared layout can be reused for every project without duplicating page markup.

### `src/data/profile.ts`

Stores owner details, hero copy, social links, footer copy, and contact metadata.

### `src/data/stacks.ts`

Stores stack/tool logo data for the My Stacks section.

## Component Decisions

### `SiteHeader`

Owns primary navigation, center theme toggle, and header social links. Theme state is local to the toggle for now and writes to the root `data-theme` attribute so the token system can support full light mode later.

### `SocialLinks`

Reusable icon link group used by the header and footer. This avoids duplicating social markup and accessibility labels.

### `IntroHero`

Owns the homepage headline and supporting copy. It can use reveal animations but should not know about projects or filters.

### `WorkFilterBar`

Owns filter buttons and active state UI. Filtering state may live in `HomePage` so project grid remains reusable.

### `ProjectIndex`

Composes `WorkFilterBar` and `ProjectGrid`. It exists so Home and Works reuse the same project index structure without duplicating JSX.

### `ProjectGrid`

Receives a list of projects and renders layout only. It should not mutate project data.

### `ProjectCard`

Renders one project. It owns local hover/focus presentation only. Case-study links navigate to typed detail routes, while the lock icon remains a visual status from the project data.

### `StackSection`

Renders the My Stacks title/subtitle and logo tiles from `stacks.ts`.

### `ContactSection`

Owns the contact form UI. If form submission is added later, submit behavior should be isolated in a handler or hook.

### `Experience Highlight`

Uses stable data IDs and page-level state so cards are closed by default and one card can be opened persistently. Card headers are real buttons for keyboard and touch accessibility.

### `MePage` Media And Testimonials

Owns lightweight interaction state for the media-card focus effect because click-to-preview needs open/closing memory and Escape/backdrop close behavior. Testimonials remain data-driven and use CSS duplication/marquee for movement.

### `Footer`

Renders closing CTA, social links, credit, and year.

### `CaseStudyDetail`

Renders the complete reusable work-detail structure: breadcrumb, hero media, title/meta, narrative grid, impact cards, reflection, visual gallery, and related projects.

### Case Study Fallback Builder

`getCaseStudyForProject()` returns authored content when available and a typed placeholder structure for the other projects. This keeps every project route functional while final copy and images are still pending.

## Comment Policy

Because you are new to React, implementation should include short comments for:

- why state lives in a parent component;
- why data is separated from JSX;
- why a component receives props instead of importing data directly;
- non-obvious responsive or animation decisions;
- accessibility decisions such as labels, reduced motion, or keyboard behavior.

Avoid comments for:

- simple imports;
- obvious JSX markup;
- plain CSS declarations;
- comments that merely repeat variable names.

## Routing Decision

React Router is the route layer. Current route model:

- `/`
- `/me`
- `/works`
- `/resume`
- `/connect`
- `/works/:slug`
- `/work/:slug` as a backward-compatible alias

## Animation Decision

Start with CSS.

Add GSAP only if we need:

- scroll scrubbing;
- pinned storytelling;
- complex sequenced timelines;
- cursor-follow smoothing;
- timeline coordination that would make CSS brittle.
