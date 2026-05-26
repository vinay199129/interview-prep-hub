# Role Focuses — JD-shaped revision lanes

A **Role Focus** is a hand-curated revision page tied to a specific job description
(company × role × level). It complements the broader pages:

| Page | Answers |
|---|---|
| `/categories` | "What is this topic?" |
| `/tracks` | "What should an AI engineer / Staff IC / EM study?" |
| `/patterns` | "What does FAANG / India / bank interview *look* like?" |
| `/roles` | "I have a Google Cloud GenAI FDE loop in 3 days — what do I cram?" |

Role Focuses pull questions, glossary terms, and behavioral stories from the
existing bank and stitch them into **time-boxed revision lanes** (30-min cram,
1-day prep, 3-day mastery).

## File

All role focuses live in `data/role-focuses.json` as a single array. Schema lives
in `src/lib/schema.ts` (`RoleFocusSchema`) and the loader is `getRoleFocuses()` in
`src/lib/data.ts`.

## Schema cheat-sheet

```ts
{
  id: string,              // slug, stable permalink — e.g. "gcp-genai-forward-deployed-engineer"
  name: string,            // long display name
  company: string,         // e.g. "Google Cloud"
  roleTitle: string,       // e.g. "GenAI Forward Deployed Engineer"
  level: "ic" | "senior-ic" | "staff" | "lead" | "manager",
  jdSummary: string,       // markdown — distilled 3-5 sentence JD recap
  mustHaveSkills: string[],
  niceToHaveSkills: string[],
  categoryIds: CategoryId[], // for cross-linking and filtering
  tagFilters: string[],    // free-form tags to surface via /browse?tag=…
  curatedQuestionIds: string[],  // hand-picked top picks (>=1)
  revisionLanes: [               // >=1; typically three
    {
      id: string,                // unique within this role focus
      name: string,              // e.g. "30-min cram"
      timebox: string,           // e.g. "~30 minutes"
      description: string,
      questionIds: string[],     // existing question IDs (>=1)
    }
  ],
  glossaryIds: string[],         // existing glossary IDs to pre-flight
  behavioralStoryIds: string[],  // existing question IDs (behavioral/STAR)
  references: { title, url }[],
  order: number,                 // sort key on the /roles index
}
```

`scripts/validate-data.ts` cross-checks every `questionId`, `categoryId`, and
`glossaryId` — bad references fail the build.

## Adding a new Role Focus

1. **Read the JD twice.** Note every named technology, every concrete responsibility,
   and the *level* (IC / senior / staff / manager). The JD usually reveals 6–10
   must-have skills and 3–4 nice-to-haves.
2. **Coverage scan.** Grep `data/questions.migrated.json` for each must-have
   keyword. Mark which already have ≥1 strong question and which are gaps.
3. **Fill the gaps.** Add new questions to `data/questions.migrated.json` following
   `docs/AUTHORING.md`. Use new free-form tags as needed:
   - `vendor-<provider>` (e.g. `vendor-gcp`, `vendor-aws`, `vendor-azure`)
   - `framework-<name>` (e.g. `framework-langgraph`, `framework-crewai`)
   - `role-<short-jd>` (e.g. `role-forward-deployed-engineer`, `role-solutions-architect`)
   - `topic-<area>` (e.g. `topic-mcp-servers`, `topic-llm-economics`)
4. **Design the lanes.** Pick a 30-min cram (~6–8 questions), a 1-day deep prep
   (~20–25), and a 3-day mastery (~35–55). Each lane should be self-contained —
   a candidate reading only that lane should walk in prepared at that depth.
5. **Pick glossary terms.** Skim `data/glossary.json` and pick terms an
   interviewer is likely to drop without defining for this JD.
6. **Pick behavioral stories.** Reference existing `behav-*`, `lead-em-*`, and
   `staff-*` question IDs that match the role's behavioral loop.
7. **Validate + build.**

```bash
npm run validate-data
npm run lint
npm run build
```

All three are CI gates — none can fail.

## Style notes

- `jdSummary` is shown both as markdown on the detail page and (line-clamped) as
  plain text on the index card. Keep the first 200 characters meaningful.
- `mustHaveSkills` should mirror the JD vocabulary, not the question taxonomy —
  candidates skim it to confirm "yes, this page is for my interview".
- Revision lane descriptions should tell the candidate *what they'll be able
  to do* after working through the lane, not just list the topics.
- The 30-min cram should bias toward questions that are unique to this JD
  (Vertex AI specifics for GCP FDE, Bedrock specifics for an AWS solutions
  architect, etc.) — generic questions live in the longer lanes.

## Anti-patterns

- Don't duplicate questions across role focuses by copying — link to one canonical
  question. If two roles need slightly different framing, write two questions.
- Don't invent JD content. The summary should be defensible from the actual JD.
- Don't create a Role Focus for a JD with fewer than ~5 strong questions in the
  bank — fill content first, then publish the focus page.
