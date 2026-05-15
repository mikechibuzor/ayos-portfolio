# Animation Strategy

## Direction

Use premium, CSS-first interaction design. The site should feel alive, but not noisy.

Current decision: keep the engine CSS-first. Do not add GSAP unless a later section needs scroll-scrubbing, pinned storytelling, cursor-follow smoothing, or complex timeline coordination.

## Principles

- Prefer CSS transitions/keyframes over JavaScript for simple interactions.
- Animate `transform` and `opacity` by default.
- Use `clip-path`, `mask`, `filter`, and SVG effects selectively for hero/project imagery.
- Respect `prefers-reduced-motion`.
- Keep hover states meaningful: reveal project intent, improve feedback, or guide navigation.
- Avoid constant ambient motion unless it is subtle and cheap.
- Use React state only for interactions that need state: filters, menus, route transitions, form state.

## Recommended Effects

### Navigation

- Slash nav underline/reveal using pseudo-elements.
- Active link text color shift.
- Social icons with subtle lift, rotate, or stroke-draw effect.

### Hero

- Intro text reveal on load using staggered opacity/translate.
- Background blur shapes can drift very slowly, disabled for reduced motion.
- Optional cursor-aware light wash, but only if it remains subtle.

### Project Cards

- Image/media zoom on hover.
- Card lift using `translateY`.
- Muted sibling cards using `:has()` where supported, with a graceful fallback.
- Project action links reveal arrow movement.
- Locked case-study state should feel intentional: lock icon, muted text, no fake click.

### Images

- Frame hover effect: image brightens while inner border/outline resolves.
- Split reveal or diagonal `clip-path` effect for selected featured work.
- Gallery hover: hovered image expands slightly while siblings dim.
- Avoid heavy SVG filter effects on large repeated grids.

### Stack Logos

- Logo tiles can lift and brighten on hover.
- Optional SVG path draw for icons we own/control.
- Keep third-party brand marks readable and recognizable.

### Contact Form

- Inputs animate border/color on focus.
- Submit button can use sliding background/reveal effect.
- Validation states should be clear, not playful.

### Page / Route Transitions

- Use native View Transitions API progressively if simple enough.
- Fallback to CSS fade/translate transitions.
- Keep route transitions short: around 220ms to 420ms.

## Performance Guardrails

- Default transition duration: `180ms` to `320ms`.
- Larger section entrance animations: `420ms` to `700ms`.
- Prefer `transform`, `opacity`.
- Use `will-change` only on elements likely to animate soon.
- Avoid animating layout properties like width, height, top, left, margin, and padding.
- Avoid large blur/filter animations on many elements at once.
- Test on mobile before adding more motion.

## Accessibility Guardrails

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

Use this as a baseline, then selectively preserve non-motion state changes like color and opacity where appropriate.

## Initial Animation Tokens

```css
:root {
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --ease-emphasized: cubic-bezier(0.16, 1, 0.3, 1);
  --duration-fast: 160ms;
  --duration-base: 240ms;
  --duration-slow: 420ms;
  --duration-entrance: 640ms;
}
```

## Candidate Effects To Build

- `scroll-reveal`
- `media-card-reveal`
- `media-mask-hover`
- `sibling-dim-group`
- `arrow-slide-link`
- `logo-tile-lift`
- `input-focus-line`
- `button-fill-slide`
- `case-study-image-gallery-hover`

## Implemented Effects

- Shared reveal utilities in `src/styles/animations.css`.
- Staggered `/me` intro media-card reveal with `clip-path`, opacity, and transform.
- Stack tile lift, border brightening, and restrained sheen.
- Project-preview media hover with inner light wash, border resolve, and subtle scale.
- `/me` media strip uses a playful click-to-focus interaction: hover only signals selection, then click runs a FLIP-style card flight from the source position into a centered preview.
- Testimonials use a full-width looping marquee with edge masking, hover pause, sibling dimming, and reduced-motion fallback.
- Experience Highlight is a click-persistent accordion: closed by default, every card can open, one card is open at a time, keyboard-accessible buttons, and CSS grid/opacity content expansion.

## Current `/me` Animation Notes

- Media focus is click/tap driven so hover transitions do not compete with the centered preview animation.
- The focused media preview is rendered separately from the source card so the Figma-positioned card stack stays stable.
- The active source card is hidden while the fixed preview travels out and back, creating the illusion that the card leaves and returns to its original stack position.
- Experience accordions use React state because the interaction needs memory.
- Testimonials duplicate the data row in the template for a seamless marquee while keeping the real copy in `pageContent.ts`.
- Reduced-motion users get a static testimonial row with horizontal overflow instead of constant marquee movement.

## References

- Prismic CSS hover effects: https://prismic.io/blog/css-hover-effects
- Prismic CSS image effects: https://prismic.io/blog/css-image-effects
- web.dev animation performance guide: https://web.dev/animations-guide/
- web.dev animations and performance: https://web.dev/animations-and-performance/
- MDN `prefers-reduced-motion`: https://developer.mozilla.org/en-US/docs/Web/CSS/%40media/prefers-reduced-motion
- MDN View Transition API: https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API
