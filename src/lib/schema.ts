import { z } from "zod";
import { TOPICS } from "./topics";

export const CategoryIdSchema = z.enum([
  "llm-fundamentals",
  "prompt-engineering",
  "rag",
  "agents",
  "agent-frameworks",
  "evaluation",
  "vector-search",
  "mlops",
  "safety",
  "foundations",
  "python",
  "azure-ai",
  "system-design",
  "dotnet",
  "java",
  "azure-platform",
  "frontend",
  "migration",
  "leadership",
  "behavioral",
  "staff-plus",
]);
export const DifficultySchema = z.enum(["easy", "medium", "hard", "expert"]);
export const ExperienceBandSchema = z.enum(["junior", "mid", "senior", "lead"]);
export const QuestionTypeSchema = z.enum([
  "conceptual",
  "coding",
  "scenario",
  "system-design",
  "debugging",
]);

export const ReferenceSchema = z.object({
  title: z.string().min(1),
  url: z.string().url(),
});

export const CategorySchema = z.object({
  id: CategoryIdSchema,
  name: z.string().min(1),
  shortName: z.string().min(1),
  description: z.string().min(1),
  accent: z.string().min(1),
  order: z.number().int().nonnegative(),
});

export const DomainIdSchema = z.enum([
  "ai-engineering",
  "agentic-systems",
  "production-ai",
  "software-cloud",
  "leadership-signal",
]);

export const DomainSchema = z.object({
  id: DomainIdSchema,
  name: z.string().min(1),
  shortName: z.string().min(1),
  tagline: z.string().min(1),
  description: z.string().min(1),
  accent: z.string().min(1),
  categoryIds: z.array(CategoryIdSchema).min(1),
  order: z.number().int().nonnegative(),
});

export const StudyStageSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  questionIds: z.array(z.string().min(1)).min(1),
  exercise: z.string().min(1),
  practiceTimeMin: z.number().int().positive(),
  readinessChecks: z.array(z.string().min(1)).min(2),
});

export const TrackSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  shortName: z.string().min(1),
  description: z.string().min(1),
  categoryIds: z.array(CategoryIdSchema).min(1),
  targetQuestionCount: z.number().int().positive().optional(),
  studyPlan: z.array(StudyStageSchema).min(3),
  order: z.number().int().nonnegative(),
});

export const QuestionSchema = z.object({
  id: z.string().min(1),
  categoryIds: z.array(CategoryIdSchema).min(1),
  topic: z.enum(TOPICS),
  subTopic: z.string().optional(),
  difficulty: DifficultySchema,
  experienceBands: z.array(ExperienceBandSchema).min(1),
  type: QuestionTypeSchema,
  prompt: z.string().min(1),
  answer: z.string().min(1),
  keyPoints: z.array(z.string().min(1)).min(1),
  followUps: z.array(z.string().min(1)),
  redFlags: z.array(z.string().min(1)),
  references: z.array(ReferenceSchema),
  tags: z.array(z.string().min(1)),
  estimatedTimeMin: z.number().int().positive(),
});

export const EvaluationCriterionSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1),
  description: z.string().min(1),
});

export const GlossaryTermSchema = z.object({
  id: z.string().min(1),
  term: z.string().min(1),
  categoryIds: z.array(CategoryIdSchema).min(1),
  plainEnglish: z.string().min(1).optional(),
  definition: z.string().min(1),
  aliases: z.array(z.string().min(1)).optional(),
  related: z.array(z.string().min(1)).optional(),
  references: z.array(ReferenceSchema).optional(),
});

export const RoleFocusLaneSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  timebox: z.string().min(1),
  description: z.string().min(1),
  questionIds: z.array(z.string().min(1)).min(1),
});

export const RoleFocusSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  company: z.string().min(1),
  roleTitle: z.string().min(1),
  level: z.enum(["ic", "senior-ic", "staff", "lead", "manager"]),
  jdSummary: z.string().min(1),
  mustHaveSkills: z.array(z.string().min(1)).min(1),
  niceToHaveSkills: z.array(z.string().min(1)),
  categoryIds: z.array(CategoryIdSchema).min(1),
  tagFilters: z.array(z.string().min(1)),
  curatedQuestionIds: z.array(z.string().min(1)).min(1),
  revisionLanes: z.array(RoleFocusLaneSchema).min(1),
  glossaryIds: z.array(z.string().min(1)),
  behavioralStoryIds: z.array(z.string().min(1)),
  references: z.array(ReferenceSchema),
  order: z.number().int().nonnegative(),
});

export const CategoriesFileSchema = z.array(CategorySchema);
export const DomainsFileSchema = z.array(DomainSchema);
export const TracksFileSchema = z.array(TrackSchema);
export const QuestionsFileSchema = z.array(QuestionSchema);
export const CriteriaFileSchema = z.array(EvaluationCriterionSchema);
export const GlossaryFileSchema = z.array(GlossaryTermSchema);
export const RoleFocusesFileSchema = z.array(RoleFocusSchema);
