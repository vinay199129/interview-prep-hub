import fs from "node:fs";
import path from "node:path";
import { z } from "zod";
import { QuestionSchema } from "../src/lib/schema";
import { normalizeTopic } from "../src/lib/topics";

const file = path.join(process.cwd(), "data", "questions.migrated.json");
const sourceSchema = z.array(QuestionSchema.extend({ topic: z.string().min(1) }).passthrough());
const questions = sourceSchema.parse(JSON.parse(fs.readFileSync(file, "utf-8")));
const before = new Set(questions.map((question) => question.topic)).size;
let moved = 0;

for (const question of questions) {
  const topic = normalizeTopic(question.topic, question.categoryIds[0]);
  if (topic === question.topic) continue;
  question.subTopic ??= question.topic;
  question.topic = topic;
  moved++;
}

fs.writeFileSync(file, JSON.stringify(questions, null, 2) + "\n", "utf-8");
console.log(`Rewrote ${moved} questions; topics ${before} -> ${new Set(questions.map((question) => question.topic)).size}`);
