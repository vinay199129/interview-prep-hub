import { z } from "zod";

export const PodIdSchema = z.enum(["pod1", "pod2", "pod3"]);
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

export const PodSchema = z.object({
  id: PodIdSchema,
  name: z.string().min(1),
  shortName: z.string().min(1),
  description: z.string().min(1),
  mustHave: z.array(z.string().min(1)).min(1),
  goodToHave: z.array(z.string().min(1)),
  accent: z.string().min(1),
});

export const QuestionSchema = z.object({
  id: z.string().min(1),
  podIds: z.array(PodIdSchema).min(1),
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

export const PodsFileSchema = z.array(PodSchema);
export const QuestionsFileSchema = z.array(QuestionSchema);
export const CriteriaFileSchema = z.array(EvaluationCriterionSchema);
