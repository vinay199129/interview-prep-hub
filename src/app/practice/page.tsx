import { Suspense } from "react";
import type { Metadata } from "next";
import { PracticeClient } from "@/components/PracticeClient";
import { PracticeSkeleton } from "@/components/Skeletons";
import { getAllQuestions, getCategories } from "@/lib/data";

export const metadata: Metadata = {
  title: "Practice · Interview Prep Hub",
  description:
    "Spaced-repetition practice over the 215-question bank. Filter by track, difficulty, and band; grade yourself with Again / Hard / Good / Easy.",
};

export default function PracticePage() {
  const questions = getAllQuestions();
  const categories = getCategories();
  return (
    <Suspense fallback={<PracticeSkeleton />}>
      <PracticeClient questions={questions} categories={categories} />
    </Suspense>
  );
}
