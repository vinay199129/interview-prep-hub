export type CategoryId =
  | "llm-fundamentals"
  | "prompt-engineering"
  | "rag"
  | "agents"
  | "agent-frameworks"
  | "evaluation"
  | "vector-search"
  | "mlops"
  | "safety"
  | "foundations"
  | "python"
  | "azure-ai"
  | "system-design"
  | "dotnet"
  | "java"
  | "azure-platform"
  | "frontend"
  | "migration"
  | "leadership"
  | "behavioral"
  | "staff-plus";

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

export interface Category {
  id: CategoryId;
  name: string;
  shortName: string;
  description: string;
  accent: string; // tailwind color hint
  order: number;
}

export interface Track {
  id: string;
  name: string;
  shortName: string;
  description: string;
  categoryIds: CategoryId[];
  targetQuestionCount?: number;
  order: number;
}

export interface Question {
  id: string;
  categoryIds: CategoryId[];
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

export interface GlossaryTerm {
  id: string;
  term: string;
  categoryIds: CategoryId[];
  plainEnglish?: string;
  definition: string;
  aliases?: string[];
  related?: string[];
  references?: Reference[];
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

export type RoleFocusLevel = "ic" | "senior-ic" | "staff" | "lead" | "manager";

export interface RoleFocusLane {
  id: string;
  name: string;
  timebox: string;
  description: string;
  questionIds: string[];
}

export interface RoleFocus {
  id: string;
  name: string;
  company: string;
  roleTitle: string;
  level: RoleFocusLevel;
  jdSummary: string; // markdown
  mustHaveSkills: string[];
  niceToHaveSkills: string[];
  categoryIds: CategoryId[];
  tagFilters: string[];
  curatedQuestionIds: string[];
  revisionLanes: RoleFocusLane[];
  glossaryIds: string[];
  behavioralStoryIds: string[];
  references: Reference[];
  order: number;
}

export const ROLE_FOCUS_LEVEL_LABEL: Record<RoleFocusLevel, string> = {
  ic: "IC",
  "senior-ic": "Senior IC",
  staff: "Staff",
  lead: "Lead / Principal",
  manager: "Manager",
};
