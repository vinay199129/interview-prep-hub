import { Suspense } from "react";
import { PracticeClient } from "@/components/PracticeClient";
import { getAllQuestions, getCategories } from "@/lib/data";

export default function PracticePage() {
  const questions = getAllQuestions();
  const categories = getCategories();
  return (
    <Suspense fallback={null}>
      <PracticeClient questions={questions} categories={categories} />
    </Suspense>
  );
}
