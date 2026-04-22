# Interview Prep Hub

A curated, filterable interview question bank for our three Azure delivery PODs:

- **POD 1** — .NET / C# + Azure (APIM, Functions, Logic Apps, Angular/React, GHCP, AKS, Greengrass→IoT migration)
- **POD 2** — Java + Azure (APIM, Functions, Logic Apps, Angular/React, GHCP, AWS→Azure migration)
- **POD 3** — Python + Azure AI (APIM, Functions, AI Search, Document Intelligence, RAG)

Used for both **interviewer prep / question selection** and **candidate self-study**.

## Run locally

```pwsh
npm install
npm run dev
# open http://localhost:3000
```

## Validate the question bank

```pwsh
npm run validate-data
```

This runs the zod schemas over `data/pods.json`, `data/evaluation-criteria.json`, and `data/questions/*.json`, plus cross-checks (unknown POD references, duplicate IDs).

## Add or edit questions

Each question lives in `data/questions/podN.json` and conforms to the schema in `src/lib/schema.ts`. Required shape:

```json
{
  "id": "p1-cs-099",
  "podIds": ["pod1"],
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

A question can apply to multiple PODs (set multiple values in `podIds`) — common cross-cutting topics like APIM, Functions, GitHub Copilot, observability, and secrets management are shared across PODs.

After editing, run `npm run validate-data` and `npm run build`.

## Project layout

```
data/                       JSON content (pods, criteria, questions)
src/
  app/                      Next.js App Router pages
  components/               UI components
  lib/                      types, zod schema, data loader, filter logic
scripts/validate-data.ts    Schema + cross-check validator
```

## Roadmap (Phase 2)

- **Self-prep mode** — hide answers by default, mark Known/Review/Unknown, persisted in `localStorage`.
- **Evaluator mode** — pick POD + candidate + experience, score the 9 criteria, export Markdown/JSON evaluation.
- **Authoring UI** — in-app editor for non-developer authors.
- **Static export + Azure Static Web Apps deploy**.
