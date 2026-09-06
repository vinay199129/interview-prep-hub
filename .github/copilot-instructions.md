# Copilot instructions for interview-prep-hub

Next.js 15 (App Router) + React 19 + TypeScript + Tailwind, statically exported to GitHub Pages. The site is a data-driven interview question bank: all content lives as JSON under `data/` and is validated by Zod schemas at load time.

## Commands

Node 20 (see `.nvmrc`). All scripts via `npm`:

| Task | Command |
| --- | --- |
| Dev server (http://localhost:3000) | `npm run dev` |
| Production static export → `./out` | `npm run build` |
| Serve the built site | `npm run start` |
| ESLint | `npm run lint` |
| Validate JSON content (Zod + cross-checks) | `npm run validate-data` |

`npm test` runs focused regressions using Node's built-in test runner through `tsx`. CI runs it alongside `npm run validate-data`, `npm run lint`, and `npm run build` (`.github/workflows/ci.yml`). Always run all four after touching `data/**` or `src/lib/schema.ts`.

To re-merge per-pod authoring files into the runtime bundle: `npx tsx scripts/merge-additions.ts` (writes `data/questions/podN.json`). Note this is not the runtime source — see below.

## Architecture

**Content is the product.** The pages are thin views over JSON. The flow is:

```
data/*.json  →  Zod parse (src/lib/schema.ts)  →  src/lib/data.ts loaders  →  RSC pages  →  static export
```

- `src/lib/data.ts` is the only place that reads the filesystem. Loaders (`getAllQuestions`, `getCategories`, `getDomains`, `getTracks`, `getCriteria`, `getGlossary`) parse with Zod and throw on duplicate IDs. Never `JSON.parse` data files directly in a page or component — go through these loaders so schemas stay enforced.
- **Runtime source of truth for questions is `data/questions.migrated.json`**, not `data/questions/podN.json`. The pod files and `data/additions/` are authoring scratch; only the migrated file is loaded at build time.
- `CategoryId` is a closed enum defined in **two** places that must stay in sync: `src/lib/schema.ts` (`CategoryIdSchema`) and `src/lib/types.ts` (`CategoryId`). Adding a category also requires an entry in `data/categories.json`. Current enum includes engineering categories plus `leadership`, `behavioral`, `staff-plus` (added for the senior/leadership track).
- **Taxonomy has three levels: domain → category → topic.** `data/domains.json` groups the 21 categories into 5 domains (`ai-engineering`, `agentic-systems`, `production-ai`, `software-cloud`, `leadership-signal`). `DomainId` is likewise duplicated in `src/lib/schema.ts` and `src/lib/types.ts`. `scripts/validate-data.ts` enforces that domains **partition** the categories — every category belongs to exactly one domain, and none may be orphaned or claimed twice. Domains drive the homepage, `/domains/[id]`, and the grouped category filter on `/browse`.
- **`topic` is a controlled vocabulary, not free text.** It was normalised down from 162 values to ~27 by `scripts/normalize-topics.ts`; reuse an existing `topic` and put the specific angle in `subTopic`. Introducing a one-off topic re-fragments the Topic filter on `/browse`.
- **Related questions are computed, not authored.** `src/lib/related.ts` scores prompt-text overlap plus shared categories/tags at build time to cross-link questions covering the same ground from different angles. Deliberate overlap in the bank is fine — it surfaces as "Related questions" rather than reading as duplication.
- **Tag conventions** for senior/regional/behavioral content (additive on top of free-form domain tags):
  - region: `region-india` · `region-singapore` · `region-uae` · `region-global`
  - company pattern: `pattern-faang` · `pattern-services-firm` · `pattern-bigtech-india` · `pattern-product-startup` · `pattern-bank-fintech` · `pattern-gov-public-sector` · `pattern-genai-lab`
  - role: `role-staff-ic` · `role-eng-manager` · `role-architect` · `role-tech-lead`
  
  `/patterns` and `/leadership` rely on these for filter shortcuts. The narrative behind them lives in `docs/COMPANY-PATTERNS.md`.
- Pages use the App Router under `src/app/`. Dynamic routes (e.g. `src/app/questions/[id]/page.tsx`) implement `generateStaticParams()` because `next.config.js` sets `output: "export"` — every URL must be enumerable at build time. No server-only runtime, no API routes.
- Path alias `@/*` → `./src/*` (see `tsconfig.json`). Use `@/lib/...` and `@/components/...` rather than relative paths from pages.
- Client-only behavior (filters, progress, profile, theme) lives in `src/components/*Client.tsx` with `"use client"`; the matching `page.tsx` stays a server component and just passes loaded data in as props.
- Persistent client state uses `localStorage` keys namespaced `iph:*` (e.g. `iph:progress:v1`, `iph:profile:v1`). Bump the `:vN` suffix when changing the stored shape.
- Theme: the inline script in `src/app/layout.tsx` applies `dark` class pre-paint to avoid FOUC. Don't replace it with a React effect.

## GitHub Pages basePath

`next.config.js` reads `NEXT_PUBLIC_BASE_PATH` and applies it as both `basePath` and `assetPrefix`. The deploy workflow (`.github/workflows/deploy.yml`) computes it from the repo name (`/interview-prep-hub`) before building. Locally it's empty. Use `next/link` and `next/image` — they handle the prefix. Never hardcode `/interview-prep-hub` in source.

## Content conventions (enforced by `scripts/validate-data.ts`)

When adding or editing a question in `data/questions.migrated.json`:

- `id` is the permalink slug — **never rename an existing id**. Convention: `<area>-<topic>-<NNN>` (e.g. `rag-chunking-007`).
- A question can belong to multiple categories via `categoryIds` (multi-tag is normal).
- Required minimums: `keyPoints ≥ 3`, `followUps ≥ 2`, `redFlags ≥ 2`, `references ≥ 1`, `tags ≥ 1`.
- Answer word-count bands by `type` (warnings only, but respect them): conceptual 80–250, coding 100–350, scenario 120–300, system-design 150–400, debugging 100–300.
- `type: "coding"` answers must contain a fenced code block.
- `type: "system-design"` answers must mention both a trade-off and scaling.
- `redFlags` describe the *mistake*, not the correction ("Says strings are value types", not "Explain that strings are reference types").
- Reference URLs should be `https://` and prefer canonical docs (Microsoft Learn, official framework docs, original papers) over blogs.
- Answer markdown follows the template in `docs/AUTHORING.md` (TL;DR → Strong answer → Example → Trade-offs → When to use / avoid → Interview signal). Headings start at `##` — `#` is reserved.

`docs/AUTHORING.md` is the authoritative authoring guide and contains the LLM drafting prompt; read it before bulk-editing questions.

## Misc

- `reactStrictMode: true`, `trailingSlash: true`, `images: { unoptimized: true }` are required for the static export — don't disable them.
- ESLint config is `eslint-config-next` (flat config via `next lint`); no Prettier config in the repo.
- The deploy workflow uploads `./out` to GitHub Pages on push to `main`. CI runs validate + build on PRs.
