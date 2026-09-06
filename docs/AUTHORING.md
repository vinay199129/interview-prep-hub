# Authoring Guide

How to add or rewrite a question for the Interview Prep Hub. Follow this guide to keep the bank consistent, skim-able, and trustworthy.

## Where questions live

- Active source of truth: `data/questions.migrated.json` (one big array; the app reads this directly).
- Each question has a stable `id`. Once published, do not change the `id` (it is the permalink slug).

## Question schema (Zod-validated)

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `id` | string | yes | Slug-style, unique. Convention: `<area>-<topic>-<NNN>`, e.g. `rag-chunking-007`. |
| `categoryIds` | `CategoryId[]` | yes | At least 1. Multi-tag if a question spans categories (e.g. `rag` + `evaluation`). |
| `topic` | canonical string | yes | Must be a member of `TOPICS` in `src/lib/topics.ts`; Zod rejects other values. Put the specific angle in `subTopic`. |
| `subTopic` | string | no | Optional finer label. |
| `difficulty` | `easy` \| `medium` \| `hard` \| `expert` | yes | See calibration below. |
| `experienceBands` | `(junior \| mid \| senior \| lead)[]` | yes | At least 1. |
| `type` | `conceptual` \| `coding` \| `scenario` \| `system-design` \| `debugging` | yes | Drives validation rules below. |
| `prompt` | string | yes | The question text. End with `?` for direct questions. |
| `answer` | Markdown string | yes | See answer template. |
| `keyPoints` | string[] | yes | ≥3 bullets. What an interviewer should hear. |
| `followUps` | string[] | yes | ≥2 probes. |
| `redFlags` | string[] | yes | ≥2 weak-answer signals. |
| `references` | `{ title, url }[]` | yes | ≥1. Prefer official docs over blog posts. |
| `tags` | string[] | yes | Lowercase, kebab-case. Reuse existing tags. |
| `estimatedTimeMin` | int (positive) | yes | Realistic time to discuss in an interview. |

## Difficulty calibration

| Difficulty | Who can answer | Examples |
| --- | --- | --- |
| `easy` | Junior should answer cleanly | "What is async/await?" |
| `medium` | Mid-level expected; junior partially | "How does ConfigureAwait(false) help libraries?" |
| `hard` | Senior expected; mid-level partially | "Design a streaming RAG pipeline with citation enforcement" |
| `expert` | Staff/lead-level depth | "Trade-offs between speculative decoding and continuous batching for low-latency LLM serving" |

Avoid stacking too many `expert` questions — aim ~50% medium, ~25% hard, ~15% easy, ~10% expert per category.

## Answer template

Every answer should follow this Markdown structure. Sections are optional only when truly N/A. Open with **one or two sentences of summary as plain text** — no `TL;DR` label; the lead sentence stands on its own.

```markdown
One or two sentences of summary. The interviewer should be able to read just this and grade a junior answer.

## Strong answer
The full explanation in 3–6 short paragraphs. Use concrete nouns. Avoid filler ("basically", "essentially").

## Example
A code block, scenario, or worked numeric example. Keep code under ~25 lines. Use realistic, idiomatic snippets.

## Trade-offs
Bulleted list of what you give up. Every non-trivial answer should name at least one trade-off.

## When to use / avoid
- Use when: …
- Avoid when: …

## Interview signal
What separates a strong answer from a passable one (one or two bullets). Useful for the interviewer pane.
```

### Length guidance

| Type | Target words (answer body) |
| --- | --- |
| `conceptual` | 80–250 |
| `coding` | 100–350, must include a fenced code block |
| `scenario` | 120–300 |
| `system-design` | 150–400, must mention trade-offs and scaling |
| `debugging` | 100–300, should sketch a hypothesis flow |

Going over the band is fine for genuinely deep topics, but consider splitting into a follow-up question.

## Markdown conventions

- Use `**bold**` for terms on first use.
- Use fenced code blocks with a language hint (` ```csharp `, ` ```python `, ` ```bash `).
- Tables are great for trade-off comparisons.
- Keep headings at `##` and below — `#` is reserved for the page title.
- Inline code in backticks for identifiers, file names, env vars.

## keyPoints / followUps / redFlags

- **keyPoints**: what the interviewer wants to *hear*. Phrase as concise statements ("Uses immutable strings", not "explains immutability of strings").
- **followUps**: what to ask if the candidate does well. Should escalate difficulty.
- **redFlags**: weak-answer patterns. Phrase as the *mistake* ("Says strings are value types"), not the correction.

Minimum counts (enforced by `npm run validate-data`):

- `keyPoints` ≥ 3
- `followUps` ≥ 2
- `redFlags` ≥ 2
- `references` ≥ 1

## References

- Prefer canonical docs: Microsoft Learn, official framework docs, original papers.
- Use full URLs, not redirector links.
- Don't link to paywalled content unless it's truly the best source.

For version-sensitive SDK examples, state the API family and runtime assumptions; label dependency sketches rather than presenting them as standalone programs. Test failure paths such as refusals, cancellation and partial completion, not only the happy path. Schema-valid output is not necessarily factually correct or authorized.

Company and regulatory guides must separate editorial preparation advice from factual claims. Cite a direct source with its review date and applicable scope. Do not infer employer policy from candidate anecdotes or turn a sector-specific obligation into a universal residency rule. Record uncertainty rather than supplying unsupported round counts, salary figures or legal deadlines.

## Track study plans

Every entry in `data/tracks.json` includes at least three ordered `studyPlan` stages. Each stage has `id`, `name`, `questionIds`, `exercise`, `practiceTimeMin`, and at least two `readinessChecks`.

- Select existing, stable question IDs within the track's categories. Do not repeat a question within one essential sequence.
- Progress from prerequisites to applied work and a design or leadership defense. Keep the full bank available as optional depth.
- Require an observable artifact or decision, such as tests, a trace-based diagnosis, a quantified design or a real behavioral example.
- Write readiness checks as evidence the learner can demonstrate, not claims that completing a page guarantees interview success.
- Rehearsal estimates combine question discussion times and exercise time; they are not estimates for learning a subject from scratch.

Run `npm test`, `npm run validate-data`, `npm run lint` and `npm run build` after changes. The study method and self-assessment rubric live in `docs/STUDY-METHOD.md`.

## Adding a new question — checklist

1. Pick a `categoryIds` set. If none fit, raise it before inventing one (categories are curated in `data/categories.json`).
2. Choose a unique `id`.
3. Draft the answer in the template.
4. Fill keyPoints / followUps / redFlags / references.
5. Set realistic `difficulty`, `experienceBands`, `estimatedTimeMin`.
6. Run `npm run validate-data` — fix any errors.
7. Run `npm test` and `npm run lint`, then `npm run build` — confirm the question's static page generates.

## LLM drafting prompt

Use this prompt as a starting point when drafting with an LLM. Always edit the output by hand before committing.

```text
You are helping author an interview question for an internal AI/cloud engineering interview prep hub.

Return a single JSON object that matches this TypeScript shape:

{
  id: string,                 // slug like "<area>-<topic>-<NNN>"
  categoryIds: string[],      // pick from: llm-fundamentals, prompt-engineering, rag, agents, agent-frameworks,
                              //   evaluation, vector-search, mlops, safety, foundations, python, azure-ai,
                              //   system-design, dotnet, java, azure-platform, frontend, migration,
                              //   behavioral, leadership, staff-plus
  topic: string,              // MUST reuse an existing topic (controlled vocabulary, ~27 values):
                              //   AI Agents, AI System Design, ASP.NET Core, Agent Frameworks, Azure AI Search,
                              //   Azure AI Services, Azure APIM, Azure Functions, Azure Platform,
                              //   Behavioral & STAR, C# Language, Cloud Migration, Engineering Leadership,
                              //   Frontend (Angular/React), Java Language, LLM Engineering, LLM Evaluation,
                              //   ML Foundations, MLOps & LLMOps, Prompt Engineering, Python Language, RAG,
                              //   Safety & Responsible AI, Software Architecture, Spring Boot, Staff+ Signal,
                              //   Vector Search & Embeddings
  subTopic?: string,          // the specific angle — this is where new wording belongs, NOT in `topic`
  difficulty: "easy"|"medium"|"hard"|"expert",
  experienceBands: ("junior"|"mid"|"senior"|"lead")[],
  type: "conceptual"|"coding"|"scenario"|"system-design"|"debugging",
  prompt: string,             // the interview question, ending with "?"
  answer: string,             // Markdown, following the template below
  keyPoints: string[],        // >=3
  followUps: string[],        // >=2
  redFlags: string[],         // >=2
  references: { title: string, url: string }[], // >=1, prefer official docs
  tags: string[],             // lowercase, kebab-case
  estimatedTimeMin: number    // realistic discussion time
}

Answer Markdown template (sections in this order; open with a plain-text summary — no `TL;DR` label):

<one or two sentences of summary, plain text>

## Strong answer
<3-6 short paragraphs>

## Example
<code block or worked example>

## Trade-offs
- <bullet>
- <bullet>

## When to use / avoid
- Use when: <…>
- Avoid when: <…>

## Interview signal
- <one or two bullets>

Constraints:
- Be concrete and accurate. Cite the official doc in `references`. Do not invent APIs.
- Length guidance by type: conceptual 80-250 words, coding 100-350 (must include fenced code),
  system-design 150-400 (must mention trade-offs and scaling), scenario 120-300, debugging 100-300.
- redFlags should describe the mistake, not the correction.

Topic to write about: <FILL IN>
Target difficulty: <FILL IN>
Target experience band(s): <FILL IN>
```

## Backlog

If you're picking what to write next, prioritize the thin categories surfaced by `npm run validate-data`:

- `agent-frameworks`, `foundations`, `evaluation`, `prompting`, `safety`, `llm-fundamentals`, `frontend`

Aim for ~10 questions per category before moving to a new one.
