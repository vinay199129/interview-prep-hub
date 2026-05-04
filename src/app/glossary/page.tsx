import { Suspense } from "react";
import { getAllQuestions, getCategories, getGlossary } from "@/lib/data";
import { GlossaryClient } from "@/components/GlossaryClient";

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
        these questions. Use the search box or filter by category. Each
        entry links back to the questions that touch the same topic so you
        can drill from a term into practice prompts.
      </p>
      <Suspense fallback={null}>
        <GlossaryClient
          terms={terms}
          categories={categories}
          questions={questions}
        />
      </Suspense>
    </div>
  );
}
