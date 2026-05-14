import { Suspense } from "react";
import type { Metadata } from "next";
import { InterviewClient } from "@/components/InterviewClient";
import { InterviewSkeleton } from "@/components/Skeletons";
import {
  getAllQuestions,
  getCategories,
  getCriteria,
  getTracks,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Interviewer Mode · Interview Prep Hub",
  description:
    "Run a structured interview: pick a track, mark questions per candidate, score against the 9-criteria rubric, and export the result as Markdown or JSON.",
};

export default function InterviewPage() {
  const questions = getAllQuestions();
  const categories = getCategories();
  const tracks = getTracks();
  const criteria = getCriteria();
  return (
    <Suspense fallback={<InterviewSkeleton />}>
      <InterviewClient
        questions={questions}
        categories={categories}
        tracks={tracks}
        criteria={criteria}
      />
    </Suspense>
  );
}
