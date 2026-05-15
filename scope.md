# Scope

## Goal

Build a polished portfolio website based on the client's Figma design, improving implementation quality while preserving the design direction.

## Initial Deliverables

- Figma context and design extraction notes.
- Component and section map.
- Style token documentation.
- Animation strategy documentation.
- Implementation todo list.
- Responsive layout strategy.
- Production-ready frontend implementation.
- Visual QA across key viewports.

## Pages / Views

- Home / portfolio index.
- Case-study detail page template.
- Initial case study: Pamoja.
- Optional pages/routes from nav:
  - Me/About
  - Works
  - Resume
  - Connect

Decision pending: whether nav items become separate pages immediately or section anchors in the first build.

## Stack Decision

- Frontend: React + TypeScript.
- Build tool: Vite.
- Styling: CSS modules or plain scoped CSS with design tokens; no Tailwind dependency unless explicitly requested.
- Animation: CSS-first, with React state only where interaction requires it.
- Code comments: include concise comments for key React decisions because the owner is learning React.
- Engineering guide: strict typing, no hardcoded strings in components, and simple JSX templates.

## Out Of Scope Until Confirmed

- CMS integration.
- Blog/editorial system.
- Multi-language support.
- Backend/contact form persistence.
- Analytics setup.
- SEO copywriting beyond page structure and metadata.

## Open Inputs

- Client name and preferred public identity.
- Final project/work images.
- Final copy or permission to refine copy.
- Deployment target.
- Contact form behavior.
- Whether case studies should be full public pages or locked/coming-soon states.
