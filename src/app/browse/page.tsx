import { Suspense } from "react";
import { getAllQuestions, getCategories } from "@/lib/data";
import { BrowseClient } from "@/components/BrowseClient";

export default function BrowsePage() {
  const categories = getCategories();
  const questions = getAllQuestions();
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Browse questions</h1>
      <Suspense fallback={null}>
        <BrowseClient categories={categories} questions={questions} />
      </Suspense>
    </div>
  );
}
