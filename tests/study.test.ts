import assert from "node:assert/strict";
import test from "node:test";
import { getAllQuestions, getStudyGuide, getTracks } from "../src/lib/data";
import { applyFilters, EMPTY_FILTERS } from "../src/lib/filters";
import { getRelatedQuestions } from "../src/lib/related";
import { QuestionSchema } from "../src/lib/schema";
import { normalizeTopic, TOPICS } from "../src/lib/topics";
import { extractTopLevelHeadings } from "../src/lib/toc";

const questions = getAllQuestions();

test("the study guide has unique anchors for schedules, readiness and final revision", () => {
  const headings = extractTopLevelHeadings(getStudyGuide());
  const slugs = new Set(headings.map((heading) => heading.slug));
  assert.equal(slugs.size, headings.length);
  for (const slug of ["choose-a-revision-schedule", "judge-readiness-from-evidence", "final-48-hour-checklist"]) {
    assert.ok(slugs.has(slug));
  }
});

test("every track has an ordered, category-aligned rehearsal plan", () => {
  const questionById = new Map(questions.map((question) => [question.id, question]));
  for (const track of getTracks()) {
    assert.ok(track.studyPlan.length >= 3);
    assert.equal(new Set(track.studyPlan.map((stage) => stage.id)).size, track.studyPlan.length);
    const plannedIds = track.studyPlan.flatMap((stage) => stage.questionIds);
    assert.equal(new Set(plannedIds).size, plannedIds.length);
    for (const questionId of plannedIds) {
      const question = questionById.get(questionId);
      assert.ok(question, `${track.id}: missing ${questionId}`);
      assert.ok(question.categoryIds.some((categoryId) => track.categoryIds.includes(categoryId)), `${track.id}: unrelated ${questionId}`);
    }
  }
});

test("canonical topics reject drift and normalization is idempotent", () => {
  for (const topic of TOPICS) assert.equal(normalizeTopic(topic, "azure-platform"), topic);
  assert.equal(QuestionSchema.safeParse({ ...questions[0], topic: "Unapproved Topic" }).success, false);
  assert.equal(normalizeTopic("Azure Functions (Java)", "azure-platform"), "Azure Functions");
  assert.equal(normalizeTopic("Azure Functions (Python)", "python"), "Azure Functions");
  const functions = applyFilters(questions, { ...EMPTY_FILTERS, topics: ["Azure Functions"] });
  assert.equal(functions.length, 8);
  assert.ok(functions.some((question) => question.id === "p2-fn-java-001"));
});

test("retired topic filters cannot silently select the entire bank", () => {
  assert.equal(applyFilters(questions, { ...EMPTY_FILTERS, topics: ["Azure Logic Apps"] }).length, 0);
});

test("related questions require subject overlap, not just a shared category", () => {
  const target = questions.find((question) => question.id === "p3-fnd-004")!;
  const related = getRelatedQuestions(target, questions);
  assert.ok(related.some((question) => question.id === "found-finetune-vs-rag-011"));
  assert.ok(!related.some((question) => ["p3-fnd-002", "p3-fnd-003", target.id].includes(question.id)));
  assert.ok(related.length <= 4);
  assert.deepEqual(related, getRelatedQuestions(target, questions));
});