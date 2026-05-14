import { Suspense } from "react";
import type { Metadata } from "next";
import { getAllQuestions, getCategories } from "@/lib/data";
import { BrowseClient } from "@/components/BrowseClient";
import { BrowseSkeleton } from "@/components/Skeletons";

export const metadata: Metadata = {
  title: "Browse questions · Interview Prep Hub",
  description:
    "Filter 215 curated AI engineering, cloud, leadership, and behavioural interview questions by category, difficulty, experience band, type, region, and company-pattern tags.",
};

export default function BrowsePage() {
  const categories = getCategories();
  const questions = getAllQuestions();
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Browse questions</h1>
      <Suspense fallback={<BrowseSkeleton />}>
        <BrowseClient categories={categories} questions={questions} />
      </Suspense>
    </div>
  );
}
