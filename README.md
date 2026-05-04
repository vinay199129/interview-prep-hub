# Interview Prep Hub

A curated, filterable interview preparation hub organized by skill categories and career tracks:

- **AI Engineer Core** — LLM fundamentals, prompting, RAG, vector search, evaluation, safety, and operations.
- **Azure Integration Engineer** — API Management, Functions, Logic Apps, migration, observability, and system design.
- **Cloud Application Engineer** — .NET, Java, Python, Azure platform services, and production engineering patterns.

Used for both **interviewer prep / question selection** and **candidate self-study**.

## Run locally

Prerequisites: Node.js 20+ (see [.nvmrc](.nvmrc)) and npm.

```pwsh
npm install
copy .env.local.example .env.local   # optional, all vars are optional
npm run dev
# open http://localhost:3000
```

Other useful scripts:

```pwsh
npm run build      # production build (static export to ./out)
npm run start      # serve the production build
npm run lint       # eslint
npm run validate-data
```

### VS Code

Recommended extensions are listed in [.vscode/extensions.json](.vscode/extensions.json). The workspace ships with:

- **Run and Debug** configs (`F5`): *Next.js: dev (server)*, *Next.js: debug client (Chrome)*, *validate-data*, and a *Next.js: full stack* compound.
- **Tasks** (`Ctrl+Shift+B`): `dev`, `build`, `start`, `lint`, `validate-data`.

## Validate the question bank

```pwsh
npm run validate-data
```

This runs the zod schemas over `data/categories.json`, `data/tracks.json`, `data/evaluation-criteria.json`, and `data/questions.migrated.json`, plus cross-checks for unknown category references, unknown track references, duplicate IDs, and track coverage gaps.

## Add or edit questions

Runtime questions live in `data/questions.migrated.json` and conform to the schema in `src/lib/schema.ts`. Required shape:

```json
{
  "id": "ai-rag-099",
  "categoryIds": ["rag", "azure-ai"],
  "topic": "C# Language",
  "subTopic": "optional",
  "difficulty": "easy | medium | hard | expert",
  "experienceBands": ["junior", "mid", "senior", "lead"],
  "type": "conceptual | coding | scenario | system-design | debugging",
  "prompt": "...",
  "answer": "Markdown — code blocks, tables, lists supported.",
  "keyPoints": ["...", "..."],
  "followUps": ["...", "..."],
  "redFlags": ["...", "..."],
  "references": [{ "title": "...", "url": "https://..." }],
  "tags": ["c#", "fundamentals"],
  "estimatedTimeMin": 5
}
```

A question can apply to multiple skill categories through `categoryIds`. Career tracks in `data/tracks.json` group categories into realistic preparation paths.

After editing, run `npm run validate-data` and `npm run build`.

## Project layout

```
data/                       JSON content (categories, tracks, criteria, questions)
src/
  app/                      Next.js App Router pages
  components/               UI components
  lib/                      types, zod schema, data loader, filter logic
scripts/validate-data.ts    Schema + cross-check validator
docs/AUTHORING.md           Question authoring guide (template, rules, LLM prompt)
```

## Authoring new questions

See [docs/AUTHORING.md](docs/AUTHORING.md) for the answer template, length bands, required field counts, and a copy-pasteable LLM drafting prompt. Run `npm run validate-data` before committing.

## Roadmap (Phase 2)

- **Self-prep mode** — hide answers by default, mark Known/Review/Unknown, persisted in `localStorage`.
- **Evaluator mode** — pick career track + candidate + experience, score the 9 criteria, export Markdown/JSON evaluation.
- **Authoring UI** — in-app editor for non-developer authors.
- **Static export + Azure Static Web Apps deploy**.
