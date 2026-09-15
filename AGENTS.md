## Portfolio engineering rules

- Indent TypeScript, TSX, and CSS with tabs; do not mix tabs and spaces.
- Keep project, profile, and graph content in `src/data`; presentation components must not contain project-specific branches unless they are visual treatments.
- Critical content must remain available without WebGL or animation.
- Every motion feature must preserve a usable `prefers-reduced-motion` experience.
- Run `npm run validate` after structural changes and `npm run build` before handoff.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
