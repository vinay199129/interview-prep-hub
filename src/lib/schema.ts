import { z } from "zod";

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

export const TrackSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  shortName: z.string().min(1),
  description: z.string().min(1),
  categoryIds: z.array(CategoryIdSchema).min(1),
  targetQuestionCount: z.number().int().positive().optional(),
  order: z.number().int().nonnegative(),
});

export const QuestionSchema = z.object({
  id: z.string().min(1),
  categoryIds: z.array(CategoryIdSchema).min(1),
  topic: z.string().min(1),
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

export const CategoriesFileSchema = z.array(CategorySchema);
export const TracksFileSchema = z.array(TrackSchema);
export const QuestionsFileSchema = z.array(QuestionSchema);
export const CriteriaFileSchema = z.array(EvaluationCriterionSchema);
export const GlossaryFileSchema = z.array(GlossaryTermSchema);
