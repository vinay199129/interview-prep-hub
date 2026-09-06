import path from "node:path";
import fs from "node:fs";
import {
  CategoriesFileSchema,
  DomainsFileSchema,
  TracksFileSchema,
  QuestionsFileSchema,
  CriteriaFileSchema,
  GlossaryFileSchema,
  RoleFocusesFileSchema,
} from "./schema";
import type {
  Category,
  Domain,
  Question,
  EvaluationCriterion,
  GlossaryTerm,
  RoleFocus,
  Track,
} from "./types";

const DATA_DIR = path.join(process.cwd(), "data");

export function getStudyGuide(): string {
  return fs.readFileSync(path.join(process.cwd(), "docs", "STUDY-METHOD.md"), "utf-8");
}

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

export function getDomains(): Domain[] {
  const data = readJson<unknown>("domains.json");
  const parsed = DomainsFileSchema.parse(data);
  const seen = new Set<string>();
  for (const d of parsed) {
    if (seen.has(d.id)) throw new Error(`Duplicate domain id: ${d.id}`);
    seen.add(d.id);
  }
  return [...parsed].sort((a, b) => a.order - b.order);
}

export function getDomainById(id: string): Domain | undefined {
  return getDomains().find((d) => d.id === id);
}

/** Domain that owns a given category, if any. Categories map to exactly one domain. */
export function getDomainForCategory(categoryId: string): Domain | undefined {
  return getDomains().find((d) =>
    (d.categoryIds as string[]).includes(categoryId),
  );
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

export function getRoleFocuses(): RoleFocus[] {
  const data = readJson<unknown>("role-focuses.json");
  const parsed = RoleFocusesFileSchema.parse(data);
  const seen = new Set<string>();
  for (const r of parsed) {
    if (seen.has(r.id)) throw new Error(`Duplicate role focus id: ${r.id}`);
    seen.add(r.id);
  }
  return [...parsed].sort((a, b) => a.order - b.order);
}

export function getRoleFocusById(id: string): RoleFocus | undefined {
  return getRoleFocuses().find((r) => r.id === id);
}
