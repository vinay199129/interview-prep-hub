# Interview Prep Hub

A curated, filterable interview preparation hub. Content is organised as **domain → category → topic**, with career tracks and role focuses cutting across it:

- **AI Engineering** — LLM fundamentals, prompting, RAG, vector search, evaluation, ML foundations.
- **Agentic Systems** — tool-using agents, planning and memory, multi-agent orchestration, MCP, frameworks.
- **Production AI** — AI system design, MLOps/LLMOps, safety and responsible AI, the Azure AI stack.
- **Software & Cloud** — .NET, Java, Python, frontend, Azure platform services, migration.
- **Leadership & Signal** — behavioural/STAR, engineering management, Staff+ IC scope and influence.

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
npm test           # focused study-content and behavior regressions
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

This runs the zod schemas over `data/categories.json`, `data/domains.json`, `data/tracks.json`, `data/evaluation-criteria.json`, and `data/questions.migrated.json`, plus cross-checks for unknown category references, unknown track references, duplicate IDs, topic-vocabulary drift, track coverage gaps, and that the domains partition the categories exactly (every category in one domain, no orphans, no overlaps).

## Add or edit questions

Runtime questions live in `data/questions.migrated.json` and conform to the schema in `src/lib/schema.ts`. Required shape:

```json
{
  "id": "ai-rag-099",
  "categoryIds": ["rag", "azure-ai"],
  "topic": "RAG",
  "subTopic": "optional",
  "difficulty": "easy | medium | hard | expert",
  "experienceBands": ["junior", "mid", "senior", "lead"],
  "type": "conceptual | coding | scenario | system-design | debugging",
  "prompt": "...",
  "answer": "Markdown — code blocks, tables, lists supported.",
  "keyPoints": ["...", "...", "..."],
  "followUps": ["...", "..."],
  "redFlags": ["...", "..."],
  "references": [{ "title": "...", "url": "https://..." }],
  "tags": ["rag", "fundamentals"],
  "estimatedTimeMin": 5
}
```

A question can apply to multiple skill categories through `categoryIds`. `topic` is a **controlled vocabulary** — reuse an existing value and put the specific angle in `subTopic`, otherwise the Topic filter on `/browse` fragments (see `docs/AUTHORING.md` for the list). `data/domains.json` groups categories into the five domains above; career tracks in `data/tracks.json` group categories into realistic preparation paths.

After editing, run `npm test`, `npm run validate-data`, `npm run lint`, and `npm run build`.

## Study workflow

- `/study-guide` provides 48-hour, 7-day and 30-day revision schedules, five timed drills, a readiness rubric and a final-interview checklist. Source: [docs/STUDY-METHOD.md](docs/STUDY-METHOD.md).
- All nine `/tracks/[id]` pages start with a curated three-stage sequence. Each stage has three existing question links, an exercise, a rehearsal-time estimate and readiness criteria. The full bank remains available for optional depth.
- `/roles/[id]` offers job-specific revision lanes. Use these instead of duplicating an equivalent track stage.
- `/practice` supports spaced recall; `/interview` supports mock interviews and scoring. Reading progress and self-ratings are not proof of mastery.
- `/patterns` separates editorial rehearsal suggestions from primary-source regulatory facts, with a dated source register.

Topics are enforced by the shared `TOPICS` vocabulary in `src/lib/topics.ts`. Retired topic URLs show an explicit notice and retain the unavailable filter until the learner removes it; they are not silently broadened.

Track `studyPlan` entries are validated for unknown question IDs, repeated stages/questions and category alignment. `npm test` uses Node's built-in test runner through `tsx`, without another test framework.

## Project layout

```text
data/                       JSON content (domains, categories, tracks, criteria, questions)
src/
  app/                      Next.js App Router pages
  components/               UI components
  lib/                      types, zod schema, data loader, filter logic
scripts/validate-data.ts    Schema + cross-check validator
docs/AUTHORING.md           Question authoring guide (template, rules, LLM prompt)
```

## Authoring new questions

See [docs/AUTHORING.md](docs/AUTHORING.md) for the answer template, length bands, required field counts, and a copy-pasteable LLM drafting prompt. Run `npm run validate-data` before committing.

## Further content work

- Continue version-specific checks of SDK examples and keep primary sources close to factual claims.
- Expand practical exercises in response to demonstrated role-specific gaps, not question-count targets alone.
- An authoring UI remains future work; content is currently maintained as validated JSON and Markdown.
