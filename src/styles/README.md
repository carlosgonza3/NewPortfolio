# Styling architecture

The root `app/globals.css` file is only an ordered entry point. Keep new styles with the route or component that owns them whenever possible.

## Global foundation

- `tokens.css` owns theme variables and shared design tokens.
- `base.css` owns element defaults and document-wide transitions.
- `utilities.css` contains the small set of intentional global helpers such as `section-shell`, `eyebrow`, and `sr-only`.
- `responsive/` contains cross-cutting breakpoint and reduced-motion overrides for the animation-driven home experience. Component-specific responsive rules should stay in their component stylesheet or CSS Module.

## Component styles

- Use a colocated CSS Module for isolated components and route content.
- Keep a colocated global stylesheet only when several coordinated components or GSAP timelines depend on shared state classes.
- JavaScript and GSAP must target stable `data-*` attributes, not presentation class names. This keeps animation behavior independent from CSS Module hashing and future visual renames.
- Keep each component's base, responsive, theme, and reduced-motion rules together when the rules are not shared across the page experience.

## Editing rules

- Preserve tab indentation.
- Add new design values to `tokens.css` instead of scattering repeated literals.
- Do not add page-specific styles back to `app/globals.css`.
- Run `npm run validate` after structural changes and `npm run build` before handoff.
