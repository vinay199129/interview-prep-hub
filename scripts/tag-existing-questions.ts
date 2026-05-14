/**
 * Tag existing questions with region-global and an applicable pattern tag.
 * Idempotent: only adds tags that aren't already present.
 *
 * Skips questions that already carry a region-* or pattern-* tag (i.e. the new
 * questions we just authored).
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { Question, CategoryId } from "../src/lib/types";

const FILE = join(process.cwd(), "data", "questions.migrated.json");

const AI_CATEGORIES: CategoryId[] = [
  "llm-fundamentals",
  "prompt-engineering",
  "rag",
  "agents",
  "agent-frameworks",
  "evaluation",
  "vector-search",
  "safety",
  "foundations",
  "azure-ai",
];

const questions = JSON.parse(readFileSync(FILE, "utf8")) as Question[];

let touched = 0;
for (const q of questions) {
  const hasRegion = q.tags.some((t) => t.startsWith("region-"));
  const hasPattern = q.tags.some((t) => t.startsWith("pattern-"));
  if (hasRegion && hasPattern) continue; // already tagged by wave 1 / 2 or earlier pass

  const additions: string[] = [];
  if (!hasRegion) additions.push("region-global");
  if (!hasPattern) {
    additions.push("pattern-faang");
    if (q.categoryIds.some((c) => AI_CATEGORIES.includes(c))) {
      additions.push("pattern-genai-lab");
    }
    if (q.categoryIds.includes("migration")) {
      additions.push("pattern-services-firm");
    }
  }
  if (additions.length) {
    q.tags = Array.from(new Set([...q.tags, ...additions]));
    touched++;
  }
}

writeFileSync(FILE, JSON.stringify(questions, null, 2) + "\n");
console.log(`Tagged ${touched} questions (region-global + pattern-*).`);
