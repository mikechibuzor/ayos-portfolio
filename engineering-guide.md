# Engineering Guide

## Core Rules

- Use strict TypeScript.
- Avoid hardcoded strings inside components.
- Keep JSX templates simple and readable.
- Move content into data files.
- Move reusable logic into small hooks or helper functions only when needed.
- Keep components focused on rendering and interaction.
- Prefer descriptive names over clever names.
- Avoid unnecessary abstractions.

## No Hardcoded Strings

Components should not contain repeated product/content copy directly in JSX.

Preferred:

```tsx
<h1>{profile.hero.title}</h1>
```

Avoid:

```tsx
<h1>Turning difficult problems into delightful digital experiences</h1>
```

Allowed exceptions:

- `aria-*` labels when tightly coupled to a component.
- Small UI fallback labels.
- Test IDs only if needed.
- Form field `type` values like `"email"` or `"submit"`.

## Strict Typing

Define explicit types for:

- project data;
- profile data;
- stack/tool data;
- social links;
- navigation items;
- case-study content;
- component props;
- form state;
- filter state.

Avoid:

- `any`;
- implicit loosely shaped objects;
- broad string types when a union is safer.
- direct string comparisons for domain values; use enums or typed constants.

Preferred:

```ts
enum ProjectCategory {
  Web = "WEB",
  Mobile = "MOBILE",
  Fintech = "FINTECH",
  Branding = "BRANDING",
}

type Project = {
  title: string;
  slug: string;
  year: string;
  categories: ProjectCategory[];
};
```

## Simple JSX

JSX should mostly describe structure.

Move this out of JSX:

- filtering logic;
- sorting logic;
- complex conditionals;
- repeated mapping transforms;
- string formatting;
- animation calculations;
- form validation rules.

Preferred:

```tsx
const visibleProjects = getProjectsByCategory(projects, activeCategory);

return <ProjectGrid projects={visibleProjects} />;
```

Avoid:

```tsx
return (
  <>
    {projects
      .filter((project) => activeCategory === "ALL" || project.categories.includes(activeCategory))
      .sort((firstProject, secondProject) => Number(secondProject.year) - Number(firstProject.year))
      .map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
  </>
);
```

## Data Organization

Use `src/data/` for site content:

- `profile.ts`
- `navigation.ts`
- `projects.ts`
- `caseStudies.ts`
- `stacks.ts`

Use `src/types/` if shared types grow beyond a few files.

## Component Rules

- Components receive data through props unless they are top-level page components.
- Components should not import unrelated global data.
- Shared UI primitives should stay generic.
- Section components may be domain-specific.
- Page components compose sections and own page-level state.

## Typography Rules

- Use Figma font family, weight, size, line height, and tracking values when available.
- Prefer `rem` values in implementation, even when values originate from Figma pixels.
- Negative letter spacing is allowed for display text when it is needed to match Figma.
- Keep body copy tracking at `0` unless Figma clearly requires otherwise.

## Comment Rules

Use comments to explain:

- why state is owned by a parent;
- why data is shaped a certain way;
- why a CSS/animation choice exists;
- why accessibility markup is needed;
- non-obvious React behavior.

Avoid comments that restate the code.

## Animation Rules

- CSS first.
- Use motion tokens.
- Respect `prefers-reduced-motion`.
- Avoid JavaScript animation unless CSS becomes brittle.
- Do not animate layout-heavy properties by default.

## SVG And Icon Rules

- Do not force every SVG into the same `width` and `height` directly.
- Inspect the SVG `viewBox` and Figma dimensions before implementation.
- Render SVGs inside a fixed icon frame, then let the SVG preserve its natural aspect ratio.
- Use `width: auto`, `height: auto`, `max-width`, and `max-height` by default.
- Add typed per-icon class names only when raw SVG viewboxes/insets differ from the shared frame.
- Keep icon frame size, icon max size, and button/tile size tokenized with `rem`.
- For Figma exports with `preserveAspectRatio="none"`, override sizing carefully in CSS so the icon does not stretch.
- Verify social icons, stack icons, and logo marks visually against Figma before moving on.

## Quality Gates

Before marking implementation complete:

- TypeScript passes.
- Production build passes.
- No obvious hardcoded content strings in components.
- Mobile and desktop layouts are visually checked.
- Interactive states are keyboard-accessible where relevant.
- Reduced-motion baseline exists.
