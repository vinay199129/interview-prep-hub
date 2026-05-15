import { Suspense } from "react";
import type { Metadata } from "next";
import { getAllQuestions, getCategories, getGlossary } from "@/lib/data";
import { GlossaryClient } from "@/components/GlossaryClient";
import { ListSkeleton } from "@/components/Skeletons";

export const metadata: Metadata = {
  title: "Glossary · Interview Prep Hub",
  description:
    "Core AI/cloud interview terminology with category-aware cross-references back into the question bank.",
};

export default function GlossaryPage() {
  const terms = getGlossary();
  const categories = getCategories();
  const questions = getAllQuestions().map((q) => ({
    id: q.id,
    title: q.prompt,
    categoryIds: q.categoryIds,
  }));
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Glossary</h1>
      <p className="text-slate-600 dark:text-slate-300">
        A quick reference for the core terminology you&apos;ll see across
        these questions. Every entry has two views: a{" "}
        <strong>plain-English</strong> explanation aimed at beginners (and
        anyone who just needs the gist), and a <strong>technical</strong>{" "}
        definition with the precision an interviewer expects. Acronyms are
        spelled out in the heading. Use the search box or category filters,
        and follow the links at the bottom of each card into practice
        questions on that topic.
      </p>
      <Suspense fallback={<ListSkeleton />}>
        <GlossaryClient
          terms={terms}
          categories={categories}
          questions={questions}
        />
      </Suspense>
    </div>
  );
}
