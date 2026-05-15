# Layout Strategy

## Decision

Use a hybrid fluid layout.

## Implementation Principle

- Let major visual bands, backgrounds, hero moments, and project showcases span the viewport.
- Keep readable content inside controlled containers.
- Use wider content caps than VBAN when the design is editorial or visual-heavy.
- Use fluid spacing and type with `clamp()` where it improves responsiveness.
- Avoid fully fluid paragraphs, nav groups, and dense content across ultra-wide screens.

## Initial Layout Defaults

- Page canvas: `width: 100%`
- Main content container: `max-width: 1280px` to `1440px`
- Narrow reading container: `max-width: 760px` to `920px`
- Section padding: fluid via `clamp()`
- Media sections: viewport-aware with stable aspect ratios

## Figma-Specific Translation

- Figma uses a `1512px` desktop frame with `104px` side padding and about `1304px` inner content.
- Implement as:
  - `--layout-content-max: 1304px` for pixel-faithful sections.
  - `--layout-wide-max: 1440px` for full visual bands if needed.
  - `padding-inline: clamp(20px, 6.9vw, 104px)`.
- Do not keep Figma's absolute positioning in implementation; convert to semantic sections.
- The project grid should be CSS grid/masonry-inspired, not fixed absolute columns.
- Case-study gallery and more-projects rows should intentionally overflow/scroll on smaller viewports.

## Rationale

Fully fluid layouts can feel immersive, but they often weaken composition on large screens. The hybrid approach keeps the premium full-bleed feel while preserving readability and visual intent.

## Edge Cases

- Ultra-wide monitors should not stretch text or cards into awkward widths.
- Mobile should preserve visual hierarchy without relying on desktop-only spacing.
- Image-heavy sections need stable aspect ratios to prevent layout shift.
- Sticky or animated sections must not trap scrolling or break keyboard navigation.
