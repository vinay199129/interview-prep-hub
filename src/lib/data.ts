import path from "node:path";
import fs from "node:fs";
import {
  PodsFileSchema,
  QuestionsFileSchema,
  CriteriaFileSchema,
} from "./schema";
import type { Pod, Question, EvaluationCriterion } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");

function readJson<T>(rel: string): T {
  const full = path.join(DATA_DIR, rel);
  const raw = fs.readFileSync(full, "utf-8");
  return JSON.parse(raw) as T;
}

export function getPods(): Pod[] {
  const data = readJson<unknown>("pods.json");
  return PodsFileSchema.parse(data);
}

export function getCriteria(): EvaluationCriterion[] {
  const data = readJson<unknown>("evaluation-criteria.json");
  return CriteriaFileSchema.parse(data);
}

export function getAllQuestions(): Question[] {
  const files = ["questions/pod1.json", "questions/pod2.json", "questions/pod3.json"];
  const all: Question[] = [];
  for (const f of files) {
    const data = readJson<unknown>(f);
    const parsed = QuestionsFileSchema.parse(data);
    all.push(...parsed);
  }
  // Ensure unique IDs
  const seen = new Set<string>();
  for (const q of all) {
    if (seen.has(q.id)) throw new Error(`Duplicate question id: ${q.id}`);
    seen.add(q.id);
  }
  return all;
}

export function getQuestionById(id: string): Question | undefined {
  return getAllQuestions().find((q) => q.id === id);
}

export function getPodById(id: string): Pod | undefined {
  return getPods().find((p) => p.id === id);
}
