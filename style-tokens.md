# Style Tokens

## Status

Initial extraction complete from Figma `Home` and `Pamoja` context.

## Colors

- Page background: `#000000`
- Surface strong: `#131313`
- Surface neural: `#1A1A1A`
- Surface border: `#363636`
- Surface border muted: `rgba(54, 54, 54, 0.3)`
- Surface secondary: `#424242`
- Text primary: `#FFFFFF`
- Text near-white: `#FAFAFA`
- Text muted: `#717171`
- Text secondary: `#AAAAAA`
- Text dim: `#545454`
- Accent green: `#0ACF83`
- Accent green dark background: `#082219`
- CTA mint: `#8BD8BD`

## Typography

- Primary display/body family: `Uncut Sans`
- Mono/navigation family: `DM Mono`
- Supporting UI family in buttons/meta: `Inter`
- Hero text: 48px, medium, approx `-1.44px` letter spacing in Figma.
- Section title: 48px, medium.
- Case-study title: 40px, medium.
- Project title: 24px, medium.
- Body large: 24px.
- Body/default: 18px.
- UI/link: 16px.
- Tags: 12px.

Note: Figma uses negative letter spacing. In implementation, keep this restrained and verify mobile text-fit carefully.

## Spacing And Layout

- Desktop frame width: `1512px`
- Main desktop content inset: `104px`
- Main content width: `1303px` to `1306px`
- Homepage hero top nav y: `35px`
- Hero block starts around `163px`
- Section vertical padding commonly `64px`, `86px`, or `96px`
- Project grid gap: `24px`
- Project column width: about `419px`
- Project card internal gaps: `12px`, `13px`, `32px`
- Case-study content gap: `32px`

## Radius

- Page frame: `32px` in Figma preview, but implementation should usually use square viewport unless intentionally framed.
- Project media: `16px`
- Case-study hero media: `24px`
- Stack logo tiles: `32px`
- Filter/tag chips: `8px`
- Pills/badges/buttons: `50px` to `80px`

## Borders And Effects

- Stack tiles: `1px solid #424242`
- Case-study divider: `1px solid #363636`
- Case-study chips: `1px solid rgba(54, 54, 54, 0.3)`
- Contact inputs: bottom border using `#131313`
- Background blur shapes: dark `rgba(26, 26, 26, 0.25-0.3)` with large blur.

## Implementation Notes

- Store tokens centrally.
- Prefer semantic names over raw visual names.
- Keep raw Figma values traceable in this document.
- Map tokens into CSS custom properties or the selected framework theme.
- Add animation tokens alongside visual tokens so motion stays consistent.

## Initial Layout Tokens

```css
:root {
  --layout-page-width: 100%;
  --layout-content-max: 1440px;
  --layout-reading-max: 860px;
  --section-padding-x: clamp(20px, 4vw, 72px);
  --section-padding-y: clamp(56px, 8vw, 128px);
  --color-bg-page: #000000;
  --color-surface-strong: #131313;
  --color-surface-neural: #1a1a1a;
  --color-border-strong: #363636;
  --color-text-primary: #ffffff;
  --color-text-muted: #717171;
  --color-text-secondary: #aaaaaa;
  --color-accent-green: #0acf83;
  --color-cta-mint: #8bd8bd;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --ease-emphasized: cubic-bezier(0.16, 1, 0.3, 1);
  --duration-fast: 160ms;
  --duration-base: 240ms;
  --duration-slow: 420ms;
  --duration-entrance: 640ms;
}
```
