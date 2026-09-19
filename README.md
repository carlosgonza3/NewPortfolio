# Carlos Gonzalez — Developer Knowledge System

A portfolio that connects academic concepts, engineering skills, and the projects where they became real.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validate

```bash
npm run validate
npm run build
```

## Vercel preview

The project is configured for Vercel's native Next.js runtime. Vercel uses
Node.js 22 and runs validation before every preview or production build.

To create the first hosted test:

1. Import the GitHub repository into Vercel.
2. Keep the detected **Next.js** framework preset and repository root.
3. Create a preview deployment from the current feature branch.
4. Test the generated preview URL before promoting or merging to production.

No output-directory override or static-export environment variable is needed
on Vercel. Optimized WebM assets are included; superseded source videos are
excluded from the deployment package to keep it comfortably below hosting
limits.

The existing GitHub Pages workflow remains available as a static development
preview until the Vercel project is ready to become the primary host.

## Content

- Projects: `src/data/projects.ts`
- Knowledge nodes and relationships: `src/data/knowledge.ts`
- Shared content types: `src/types/content.ts`

The homepage, case-study routes, current-project callout, and knowledge explorer are generated from these sources.
