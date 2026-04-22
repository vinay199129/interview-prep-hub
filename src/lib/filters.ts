import type {
  Question,
  Difficulty,
  ExperienceBand,
  PodId,
  QuestionType,
} from "./types";

export interface Filters {
  pods: PodId[];
  topics: string[];
  difficulties: Difficulty[];
  experienceBands: ExperienceBand[];
  types: QuestionType[];
  search: string;
}

export const EMPTY_FILTERS: Filters = {
  pods: [],
  topics: [],
  difficulties: [],
  experienceBands: [],
  types: [],
  search: "",
};

export function applyFilters(questions: Question[], f: Filters): Question[] {
  const term = f.search.trim().toLowerCase();
  return questions.filter((q) => {
    if (f.pods.length && !q.podIds.some((p) => f.pods.includes(p))) return false;
    if (f.topics.length && !f.topics.includes(q.topic)) return false;
    if (f.difficulties.length && !f.difficulties.includes(q.difficulty)) return false;
    if (
      f.experienceBands.length &&
      !q.experienceBands.some((b) => f.experienceBands.includes(b))
    )
      return false;
    if (f.types.length && !f.types.includes(q.type)) return false;
    if (term) {
      const hay = [
        q.prompt,
        q.topic,
        q.subTopic ?? "",
        q.tags.join(" "),
        q.keyPoints.join(" "),
      ]
        .join(" ")
        .toLowerCase();
      if (!hay.includes(term)) return false;
    }
    return true;
  });
}

export function uniqueTopics(questions: Question[]): string[] {
  return Array.from(new Set(questions.map((q) => q.topic))).sort();
}
