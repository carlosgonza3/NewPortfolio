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

## Development preview

Pushes to `main` deploy a static development preview to GitHub Pages. In the
repository settings, choose **GitHub Actions** as the Pages source once; the
workflow will publish subsequent changes automatically.

The preview build uses the repository name as its URL prefix. Normal builds do
not use that prefix or static-export mode, so a later Netlify deployment can
serve the site from the purchased domain at its root.

## Content

- Projects: `src/data/projects.ts`
- Knowledge nodes and relationships: `src/data/knowledge.ts`
- Shared content types: `src/types/content.ts`

The homepage, case-study routes, current-project callout, and knowledge explorer are generated from these sources.
