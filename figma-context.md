# Figma Context

## Source Links

- Prototype: https://www.figma.com/proto/YDhhEZghBsxWWbK7lwTgnR/Portfolio-designs?node-id=1-3679&p=f&t=9px59fjINqlKkxTO-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A3029
- Design file: https://www.figma.com/design/YDhhEZghBsxWWbK7lwTgnR/Portfolio-designs?node-id=0-1&p=f&t=XqHdqx39lk8PH6XL-0

## Access Status

- Current MCP auth user: `iwuagwuchibuzor@gmail.com`
- Current status: access confirmed, but Figma MCP is currently blocked by the Starter plan tool-call limit.
- Top-level pages: `Page 1` (`0:1`)
- 2026-05-13 audit note: full-route audit for `/me`, `/works`, `/connect`, and project detail pages is pending until the Figma MCP limit resets or screenshots/exports are provided.

## Main Frames

- `Home` (`1:3029`) — main portfolio/homepage frame, `1512 x 3496`.
- `Pamoja case study intro/content` (`1:5679`) — detailed case-study section embedded in the same Home frame.
- Additional case-study sections in Home frame:
  - `The Impact` (`1:5732`)
  - `Reflection` (`1:5777`)
  - `Visual Gallery` (`1:5764`)
  - `More Projects` (`1:5783`)

## Homepage Structure

- Top navigation:
  - Left nav links: `/home`, `/me`, `/works`, `/resume`, `/connect`
  - Right social icons: LinkedIn, Behance, X, Instagram
  - Uses `DM Mono`, 16px, muted inactive links.
- Intro hero:
  - Large text: "Turning difficult problems into delightful digital experiences — the kind that feel simple, intuitive, and quietly powerful."
  - Supporting text: "Currently blowing bubbles and fight crimes with Oval labs inc. Building vban and other cool stuffs."
  - Dark canvas with subtle blurred dark shapes.
- Work filter row:
  - Filters: All, Mobile, Web, Branding
  - Each filter has a small count.
  - Active state uses strong dark chip and white text.
- Work grid:
  - Three-column desktop masonry-style grid.
  - Project cards use dark media blocks, project title/year row, category tags, description, and actions.
  - Projects visible: Vban, Ekohub, Signature bank, Spoxio, Chekker, Qore.
- My Stacks:
  - Centered title/subtitle.
  - Horizontal row of bordered logo tiles.
  - Tools include Figma, Adobe XD, Photoshop, Illustrator, Google Meet, Gmail, OpenAI, Claude-like/star icons, Google Drive, Framer-like mark.
- Contact section:
  - Availability badge.
  - Centered headline: "Let’s collaborate on your next big idea"
  - Inputs: full name, email, message.
  - Button text currently says "Send message"; source component contains typo "Rech out" in hidden/animated state.
- Footer:
  - CTA text: "Whatever I touch, I leave my footprint."
  - Subtitle: "Let's build that brilliant idea together"
  - Social icons repeated.
  - Bottom text: "Cooked and chopped by Oluolagunju Ayomide" and year `2026`.

## Me Page Structure

- Later screenshots show the global site nav on `/me`; keep the shared nav visible with `/me` active.
- Hero statement is centered and split by color:
  - White: "I’m Ayomide,"
  - Muted gray: "I design products that actually solve problems and help brands reach their"
  - Mint: "business goals."
- Body copy is a centered/narrow text block below the headline, left-aligned on desktop.
- Two visible paragraphs:
  - "I’m a Product & Brand Designer with over 5 years of creative experience and 3+ years turning real-world ideas into digital products that make people’s lives easier (and a little more beautiful)."
  - "I’ve always believed design sits at the intersection of logic and emotion — where thoughtful strategy meets visual storytelling. My work revolves around creating experiences that don’t just look great, but actually work for the people using them."
- Lower viewport has six large dark media placeholders/blocks, horizontally spread, staggered, layered, and partially cropped by viewport edges.
- After the intro/media stage, the page continues with a centered overview section:
  - Title: "The only prerequisite? Awesomeness — at any stage of the journey: idea, redesign, or reinvention."
  - Three paragraphs about founder/team collaboration, product design craft, and intentional user-centered work.
  - Rounded chips: Visual design, Prototyping, Research, Branding, Brand Strategy.
- The next section reuses the stack-logo tile pattern, but with a split layout:
  - Left heading/subtitle: "My Stacks" and "Let's build that brilliant idea together".
  - Right horizontal logo row, overflowing at the right edge.
  - Below it are dark project-preview placeholders with small mono labels such as "Building VBAN".
- Experience section:
  - Centered title/subtitle: "Experience Highlight".
  - Two-column dark accordion cards on desktop.
  - Entries: Iterative Financials, Inc.; vban; Chekker Health; EOC.
  - Chekker Health is shown expanded with a divider and descriptive paragraph.
- Personal/creating section:
  - Centered heading: "When I’m Not Pushing Pixels, I’m Still Creating".
  - Two paragraphs about video games, anime, music production, curiosity, and creativity beyond pixels.
- Testimonials section:
  - Centered title: "What people say about me".
  - Horizontal overflow row of dark testimonial cards, with first/last cards partially cropped.
  - Repeated visible author: "Ayodeji Osindele", "Creative Director, EOC".
- The `/me` page ends with the same contact form pattern used on Home.

## Case Study Structure

- Case-study hero:
  - Large rounded media placeholder, `1300 x 421`, radius 24.
  - Project title: Pamoja.
  - Subtitle: Redefining Payment Experience.
  - Metadata chips/rows: Product designer, Lead designer: Ayodeji Osindele, 2022.
- Narrative sections:
  - The Context
  - The Challenge
  - The Discovery
  - The Exploration
  - The Craft
- Detail sections:
  - The Impact: metric cards.
  - Reflection: centered paragraph block.
  - Visual Gallery: horizontal/overflow gallery with varied image heights.
  - More Projects: horizontal card row that overflows beyond viewport.

## Content Notes

- Portfolio owner appears to be `Oluolagunju Ayomide`.
- Contact email appears in a hidden footer block: `oluolagunjuayomide@gmail.com`.
- Several copy issues should be fixed during implementation:
  - "fight crimes" likely should be "fighting crimes" unless intentional.
  - "cool stuffs" should likely be "cool stuff".
  - "aproduct" should be "a product".
  - "briliant" should be "brilliant".
  - "Rech out" should be "Reach out".
  - Some project descriptions appear swapped: Ekohub text references Signature Bank, and Signature Bank text references EkoHub.

## Persistent Notes

- Use this file as the long-lived design memory so we do not need to repeatedly inspect Figma.
- Update this file after every meaningful Figma review.
- Treat Figma as source of truth, but flag design decisions that may hurt responsiveness, accessibility, or implementation quality.
- Figma-generated React/Tailwind code is reference only. Implementation should be adapted to the final stack and local conventions.

## Pending Full Route Audit

The next Figma pass must inventory these flows before more route implementation:

- `/me`
  - Confirm all sections after the intro/media stage.
  - Confirm whether header/footer are present in the real page view versus prototype chrome.
  - Confirm media placeholder count, size, vertical positions, and later section structure.
- `/works`
  - Screenshots confirm it reuses the project filter and project-card grid pattern from Home.
  - Top section: shared global nav with `/works` active, center theme toggle, right social icons.
  - Hero copy: "Check out my works" and "Delivering excellence at all levels".
  - Filter row appears below the centered hero with Figma count labels `18`.
  - Visible project grid uses the same six projects as Home: Vban, Ekohub, Signature bank, Spoxio, Chekker, Qore.
  - Page continues into the shared contact section and shared footer.
  - Project-card CTA behavior into `/work/:slug` still needs detail-page screenshots.
- `/connect`
  - Confirm whether it reuses the home contact section or has a distinct page layout.
  - Confirm form fields, availability badge, social/contact details, and footer treatment.
- Project detail pages
  - Confirm the detail route entered from each project-card case-study CTA.
  - Confirm reusable case-study sections: hero, metadata row, narrative blocks, impact cards, reflection, visual gallery, and more-projects carousel.
  - Confirm locked-case-study behavior: disabled CTA, password/locked state, or still navigable.
