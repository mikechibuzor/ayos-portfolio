# Todo

## Phase 1 - Figma Access And Extraction

- [x] Re-authenticate Figma MCP if needed.
- [x] Confirm Figma file access for `iwuagwuchibuzor@gmail.com`.
- [x] Extract page/frame inventory.
- [x] Capture/read main Home design context.
- [x] Capture/read Pamoja case-study context.
- [x] Update `figma-context.md` with initial design notes.
- [x] Audit all `/me` sections from Figma screenshots.
- [x] Audit `/works` page/flow from Figma screenshots.
- [x] Audit `/connect` page/flow from Figma screenshot.
- [x] Audit project-card case-study CTA route/details flow from Figma.
- [x] Update reusable component map after full route audit.
- [x] Extract final image assets when implementation begins.

## Phase 2 - Planning

- [x] Decide layout strategy.
- [x] Draft reusable section/component map.
- [x] Extract and document initial style tokens.
- [x] Define initial content/data model for projects and case studies.
- [x] Confirm implementation stack.
- [x] Research and document animation strategy.
- [x] Document React architecture and comment policy.
- [x] Document engineering guide.
- [x] Confirm route strategy: separate pages vs anchors for `/me`, `/works`, `/resume`, `/connect`.
- [ ] Confirm contact form behavior.
- [ ] Confirm copy cleanup permission.

## Phase 3 - Implementation

- [x] Scaffold frontend project.
- [x] Implement global styles and tokens.
- [x] Implement global animation utilities and reduced-motion baseline.
- [x] Build layout primitives.
- [x] Build reusable sections/components.
- [x] Implement pages and content flow.
- [x] Add responsive behavior.
- [x] Install dependencies.
- [x] Run production build.
- [x] Replace nav anchor scrolling with page-path hrefs.
- [x] Wire React Router for separate nav pages.
- [x] Replace placeholder route pages with first-pass standalone pages.
- [x] Add first-pass dynamic project detail routes.
- [x] Build reusable case-study detail page layout for `/works/:slug`.
- [x] Wire project card case-study CTAs to reusable work detail pages.
- [x] Rebuild `/me` page to match provided Figma screenshot.
- [x] Remove generic route chrome from `/me` and match Figma media stage composition.
- [x] Restore `/me` navbar and align intro typography with home hero scale.
- [x] Tune `/me` intro vertical rhythm and six-card media strip spacing.
- [x] Reduce `/me` intro body copy scale and downsize six-card media stage.
- [x] Allow Figma-matched negative tracking and apply it to `/me` display headline.
- [x] Reposition `/me` media stage with six viewport-spread cards matching Figma count and layering.
- [x] Replace stack placeholders with local Figma SVG assets.
- [x] Tighten hero scale closer to Figma.
- [x] Match stack tile size, padding, and radius closer to Figma.
- [x] Improve contact input border visibility.
- [x] Improve stack tile bottom border visibility.
- [x] Keep stack icons on one row with horizontal overflow fallback.
- [x] Make stack tile bottom border blend into page background.
- [x] Remove duplicated Claude stack icon and keep Framer as final stack icon.
- [x] Load Figma font families with Fontsource packages.
- [x] Prevent stack SVG distortion with fixed icon frame and natural aspect ratio.
- [x] Restore stack tile bottom-radius fade without clipping the tile.
- [x] Match framed footer social links to Figma SVG icons.
- [x] Add mobile stack scroll controls with pulsing hint.
- [x] Tune footer subtitle and social icon visual weight against Figma.
- [x] Normalize footer social icon dimensions to Figma viewBox/inset proportions.
- [x] Tune hero/header/work-grid sizing against Figma values.
- [x] Fix project card action copy, divider, lock, and live-link styling.
- [x] Replace project action glyphs with local SVG lock and arrow icons.
- [x] Add rounded keyhole detail to project lock icon.
- [x] Match project card media background to Figma flat surface color.
- [x] Remove non-Figma media labels and brightening effect from project placeholders.
- [x] Tighten contact section spacing, input rhythm, and CTA sizing.
- [x] Make project media heights responsive on tablet and mobile.
- [x] Remove viewport-scaled font sizing from responsive CSS.
- [x] Document SVG/icon sizing rule in engineering guide.
- [x] Align heading font weights with Figma Uncut Sans Medium.
- [x] Implement remaining `/me` overview, stack, experience, hobbies, testimonials, and contact sections.
- [x] Store remaining `/me` copy in typed data instead of component templates.
- [x] Add CSS-first premium tactile animation utilities.
- [x] Add `/me` staggered media, stack tile, preview card, and testimonial hover animations.
- [x] Convert Experience Highlight to closed-by-default click accordion behavior.
- [x] Fix Experience Highlight so every card opens independently and closes the previous card.
- [x] Revise `/me` media-card animation so hover only highlights and click opens a spin-in centered preview.
- [x] Upgrade `/me` media-card preview to FLIP-style source-to-center and center-to-source motion.
- [x] Smooth `/me` media-card return landing so the preview no longer snaps back into the source card.
- [x] Correct `/me` media-card FLIP source measurement so the preview returns to the true original stack position.
- [x] Convert `/me` testimonials into a looping marquee with hover pause and reduced-motion fallback.
- [x] Add shared center theme toggle to the global header.
- [x] Rebuild `/works` using shared project index, contact section, and footer.
- [x] Rebuild `/connect` as the shared contact section plus footer.
- [x] Match Home hero line width and subtitle copy to Figma.
- [x] Match header social links to footer SVG social icons.
- [x] Add shared footer section to `/me`.
- [x] Add downloaded project thumbnails to existing work cards and case-study media.

## Phase 4 - QA

- [x] Run production build.
- [ ] Check desktop viewport.
- [x] Check tablet viewport.
- [x] Check mobile viewport.
- [x] Fix `/me` tablet header/theme-toggle collision and responsive media-strip sizing.
- [ ] Fix visual overlap, spacing, and text-fit issues.
- [ ] Final pass against Figma.
