import {
  getAllQuestions,
  getCategories,
  getCriteria,
  getGlossary,
  getRoleFocuses,
  getTracks,
} from "../src/lib/data";

interface Issue {
  id: string;
  message: string;
}

const LENGTH_BANDS: Record<string, { min: number; max: number }> = {
  conceptual: { min: 80, max: 250 },
  coding: { min: 100, max: 350 },
  scenario: { min: 120, max: 300 },
  "system-design": { min: 150, max: 400 },
  debugging: { min: 100, max: 300 },
};

function wordCount(s: string): number {
  return s.trim().split(/\s+/).filter(Boolean).length;
}

// Curated allow-list for region/pattern/role tags. Keep in sync with
// docs/COMPANY-PATTERNS.md and the /patterns page shortcuts. Any tag matching
// /^(region|pattern|role)-/ that is NOT here is treated as drift and errors out.
const SPECIAL_TAGS = new Set<string>([
  // region
  "region-india",
  "region-singapore",
  "region-uae",
  "region-global",
  // company pattern
  "pattern-faang",
  "pattern-services-firm",
  "pattern-bigtech-india",
  "pattern-product-startup",
  "pattern-bank-fintech",
  "pattern-gov-public-sector",
  "pattern-genai-lab",
  // role
  "role-staff-ic",
  "role-eng-manager",
  "role-architect",
  "role-tech-lead",
  "role-forward-deployed-engineer",
  "role-ml-engineer",
]);
const SPECIAL_TAG_PREFIX = /^(region|pattern|role)-/;

function main() {
  const categories = getCategories();
  const tracks = getTracks();
  const criteria = getCriteria();
  const questions = getAllQuestions();
  const glossary = getGlossary();
  const roleFocuses = getRoleFocuses();

  const errors: Issue[] = [];
  const warnings: Issue[] = [];

  // Reference checks
  const categoryIds = new Set(categories.map((c) => c.id));
  for (const q of questions) {
    for (const cid of q.categoryIds) {
      if (!categoryIds.has(cid)) {
        errors.push({ id: q.id, message: `references unknown category ${cid}` });
      }
    }
  }
  for (const track of tracks) {
    for (const cid of track.categoryIds) {
      if (!categoryIds.has(cid)) {
        errors.push({ id: track.id, message: `track references unknown category ${cid}` });
      }
    }
  }

  // Duplicate ids
  const seen = new Map<string, number>();
  for (const q of questions) {
    seen.set(q.id, (seen.get(q.id) ?? 0) + 1);
  }
  for (const [id, n] of seen) {
    if (n > 1) errors.push({ id, message: `duplicate id (appears ${n} times)` });
  }

  // Per-question quality rules
  for (const q of questions) {
    if (q.keyPoints.length < 3) {
      errors.push({ id: q.id, message: `keyPoints=${q.keyPoints.length} (min 3)` });
    }
    if (q.followUps.length < 2) {
      errors.push({ id: q.id, message: `followUps=${q.followUps.length} (min 2)` });
    }
    if (q.redFlags.length < 2) {
      errors.push({ id: q.id, message: `redFlags=${q.redFlags.length} (min 2)` });
    }
    if (q.references.length < 1) {
      errors.push({ id: q.id, message: `references=0 (min 1)` });
    }
    if (q.tags.length < 1) {
      errors.push({ id: q.id, message: `tags=0 (min 1)` });
    }

    // Length warnings
    const band = LENGTH_BANDS[q.type];
    if (band) {
      const wc = wordCount(q.answer);
      if (wc < band.min) {
        warnings.push({ id: q.id, message: `answer ${wc} words, below ${band.min} (${q.type})` });
      } else if (wc > band.max) {
        warnings.push({ id: q.id, message: `answer ${wc} words, above ${band.max} (${q.type})` });
      }
    }

    // Type-specific keyword warnings
    if (q.type === "coding" && !/```/.test(q.answer)) {
      warnings.push({ id: q.id, message: `coding question missing fenced code block` });
    }
    if (q.type === "system-design") {
      const lower = q.answer.toLowerCase();
      const hasTradeoff = /trade-?off/.test(lower);
      const hasScale = /scal(e|ing|ability)/.test(lower);
      if (!hasTradeoff || !hasScale) {
        warnings.push({
          id: q.id,
          message: `system-design answer missing ${[
            !hasTradeoff && "trade-off",
            !hasScale && "scaling",
          ]
            .filter(Boolean)
            .join(" + ")} keyword(s)`,
        });
      }
    }

    // Reference URL hygiene
    for (const r of q.references) {
      if (!r.url.startsWith("https://")) {
        warnings.push({ id: q.id, message: `reference URL not https: ${r.url}` });
      }
    }

    // Special-tag drift: region/pattern/role tags must be in the allow-list
    for (const tag of q.tags) {
      if (SPECIAL_TAG_PREFIX.test(tag) && !SPECIAL_TAGS.has(tag)) {
        errors.push({
          id: q.id,
          message: `unknown region/pattern/role tag "${tag}" (add to SPECIAL_TAGS allow-list + docs/COMPANY-PATTERNS.md, or fix the typo)`,
        });
      }
    }
  }

  // Glossary checks
  const glossaryIds = new Set<string>();
  for (const g of glossary) {
    if (glossaryIds.has(g.id)) {
      errors.push({ id: g.id, message: `duplicate glossary id` });
    }
    glossaryIds.add(g.id);
    for (const cid of g.categoryIds) {
      if (!categoryIds.has(cid)) {
        errors.push({ id: g.id, message: `glossary references unknown category ${cid}` });
      }
    }
    if (g.references) {
      for (const r of g.references) {
        if (!r.url.startsWith("https://")) {
          warnings.push({ id: g.id, message: `glossary reference URL not https: ${r.url}` });
        }
      }
    }
  }
  for (const g of glossary) {
    if (!g.related) continue;
    for (const rel of g.related) {
      if (!glossaryIds.has(rel)) {
        warnings.push({ id: g.id, message: `related term not in glossary: ${rel}` });
      }
    }
  }

  // Role focus checks
  const questionIdSet = new Set(questions.map((q) => q.id));
  for (const rf of roleFocuses) {
    for (const cid of rf.categoryIds) {
      if (!categoryIds.has(cid)) {
        errors.push({ id: rf.id, message: `role focus references unknown category ${cid}` });
      }
    }
    for (const qid of rf.curatedQuestionIds) {
      if (!questionIdSet.has(qid)) {
        errors.push({ id: rf.id, message: `role focus references unknown question ${qid}` });
      }
    }
    for (const qid of rf.behavioralStoryIds) {
      if (!questionIdSet.has(qid)) {
        errors.push({ id: rf.id, message: `role focus behavioral story id missing: ${qid}` });
      }
    }
    for (const gid of rf.glossaryIds) {
      if (!glossaryIds.has(gid)) {
        errors.push({ id: rf.id, message: `role focus glossary id missing: ${gid}` });
      }
    }
    const laneIds = new Set<string>();
    for (const lane of rf.revisionLanes) {
      if (laneIds.has(lane.id)) {
        errors.push({ id: rf.id, message: `duplicate revision lane id ${lane.id}` });
      }
      laneIds.add(lane.id);
      for (const qid of lane.questionIds) {
        if (!questionIdSet.has(qid)) {
          errors.push({
            id: rf.id,
            message: `lane ${lane.id} references unknown question ${qid}`,
          });
        }
      }
    }
  }

  // Output
  console.log(`✓ ${categories.length} categories`);
  console.log(`✓ ${tracks.length} career tracks`);
  console.log(`✓ ${criteria.length} evaluation criteria`);
  console.log(`✓ ${glossary.length} glossary terms`);
  console.log(`✓ ${questions.length} questions parsed`);
  console.log(`✓ ${roleFocuses.length} role focuses`);

  for (const c of categories) {
    const count = questions.filter((q) => q.categoryIds.includes(c.id)).length;
    console.log(`  - ${c.shortName}: ${count} questions`);
  }
  for (const track of tracks) {
    const count = questions.filter((q) =>
      q.categoryIds.some((cid) => track.categoryIds.includes(cid)),
    ).length;
    console.log(`  - ${track.shortName}: ${count} questions`);
  }

  if (warnings.length) {
    console.log(`\n⚠ ${warnings.length} warnings:`);
    for (const w of warnings) console.log(`  ! ${w.id}: ${w.message}`);
  }

  if (errors.length) {
    console.error(`\n✗ ${errors.length} errors:`);
    for (const e of errors) console.error(`  ✗ ${e.id}: ${e.message}`);
    process.exit(1);
  }

  console.log(
    `\n✓ ${questions.length} questions validated · 0 errors · ${warnings.length} warnings`,
  );
}

try {
  main();
} catch (err) {
  console.error("Validation failed:", err);
  process.exit(1);
}
