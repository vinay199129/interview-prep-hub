export type PodId = "pod1" | "pod2" | "pod3";
export type Difficulty = "easy" | "medium" | "hard" | "expert";
export type ExperienceBand = "junior" | "mid" | "senior" | "lead";
export type QuestionType =
  | "conceptual"
  | "coding"
  | "scenario"
  | "system-design"
  | "debugging";

export interface Reference {
  title: string;
  url: string;
}

export interface Pod {
  id: PodId;
  name: string;
  shortName: string;
  description: string;
  mustHave: string[];
  goodToHave: string[];
  accent: string; // tailwind color hint
}

export interface Question {
  id: string;
  podIds: PodId[];
  topic: string;
  subTopic?: string;
  difficulty: Difficulty;
  experienceBands: ExperienceBand[];
  type: QuestionType;
  prompt: string;
  answer: string; // markdown
  keyPoints: string[];
  followUps: string[];
  redFlags: string[];
  references: Reference[];
  tags: string[];
  estimatedTimeMin: number;
}

export interface EvaluationCriterion {
  id: number;
  title: string;
  description: string;
}

export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
  expert: "Expert",
};

export const EXPERIENCE_LABEL: Record<ExperienceBand, string> = {
  junior: "Junior (0–3 yrs)",
  mid: "Mid (3–6 yrs)",
  senior: "Senior (6–10 yrs)",
  lead: "Lead/Principal (10+ yrs)",
};

export const TYPE_LABEL: Record<QuestionType, string> = {
  conceptual: "Conceptual",
  coding: "Coding",
  scenario: "Scenario",
  "system-design": "System Design",
  debugging: "Debugging",
};
