/**
 * One-shot: strip the leading `**TL;DR.**` (or `**TL;DR**`) prefix and the
 * whitespace immediately following from every answer. Leaves the lead sentence
 * intact as the natural opening paragraph.
 *
 * Idempotent.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { Question } from "../src/lib/types";

const FILE = join(process.cwd(), "data", "questions.migrated.json");

const questions = JSON.parse(readFileSync(FILE, "utf8")) as Question[];

// Match TL;DR label at the start of the answer (possibly preceded by whitespace
// only). Accept `**TL;DR.**`, `**TL;DR**`, case-insensitive. Strip whatever
// whitespace immediately follows (space or newline).
const RE = /^\s*\*\*TL;?DR\.?\*\*\s*/i;

let touched = 0;
for (const q of questions) {
  if (!RE.test(q.answer)) continue;
  q.answer = q.answer.replace(RE, "");
  touched++;
}

writeFileSync(FILE, JSON.stringify(questions, null, 2) + "\n");
console.log(`Stripped TL;DR prefix from ${touched} of ${questions.length} questions.`);
