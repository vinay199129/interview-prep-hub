import path from "node:path";
import fs from "node:fs";
import {
  CategoriesFileSchema,
  TracksFileSchema,
  QuestionsFileSchema,
  CriteriaFileSchema,
  GlossaryFileSchema,
} from "./schema";
import type {
  Category,
  Question,
  EvaluationCriterion,
  GlossaryTerm,
  Track,
} from "./types";

const DATA_DIR = path.join(process.cwd(), "data");

function readJson<T>(rel: string): T {
  const full = path.join(DATA_DIR, rel);
  const raw = fs.readFileSync(full, "utf-8");
  return JSON.parse(raw) as T;
}

export function getCategories(): Category[] {
  const data = readJson<unknown>("categories.json");
  const parsed = CategoriesFileSchema.parse(data);
  return [...parsed].sort((a, b) => a.order - b.order);
}

export function getTracks(): Track[] {
  const data = readJson<unknown>("tracks.json");
  const parsed = TracksFileSchema.parse(data);
  return [...parsed].sort((a, b) => a.order - b.order);
}

export function getCriteria(): EvaluationCriterion[] {
  const data = readJson<unknown>("evaluation-criteria.json");
  return CriteriaFileSchema.parse(data);
}

export function getGlossary(): GlossaryTerm[] {
  const data = readJson<unknown>("glossary.json");
  const parsed = GlossaryFileSchema.parse(data);
  return [...parsed].sort((a, b) =>
    a.term.toLocaleLowerCase().localeCompare(b.term.toLocaleLowerCase()),
  );
}

export function getAllQuestions(): Question[] {
  const data = readJson<unknown>("questions.migrated.json");
  const parsed = QuestionsFileSchema.parse(data);
  const seen = new Set<string>();
  for (const q of parsed) {
    if (seen.has(q.id)) throw new Error(`Duplicate question id: ${q.id}`);
    seen.add(q.id);
  }
  return parsed;
}

export function getQuestionById(id: string): Question | undefined {
  return getAllQuestions().find((q) => q.id === id);
}

export function getCategoryById(id: string): Category | undefined {
  return getCategories().find((c) => c.id === id);
}

export function getTrackById(id: string): Track | undefined {
  return getTracks().find((t) => t.id === id);
}
