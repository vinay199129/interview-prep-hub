import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getAllQuestions, getCategoryById, getCategories } from "@/lib/data";
import { BrowseClient } from "@/components/BrowseClient";
import type { CategoryId } from "@/lib/types";

export function generateStaticParams() {
  return getCategories().map((c) => ({ id: c.id }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = getCategoryById(id as CategoryId);
  if (!category) notFound();
  const allCategories = getCategories();
  const allQuestions = getAllQuestions();

  return (
    <div className="space-y-4">
      <header className="space-y-2">
        <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
          {category.shortName}
        </div>
        <h1 className="text-2xl font-semibold">{category.name}</h1>
        <p className="text-slate-600 dark:text-slate-300">{category.description}</p>
      </header>
      <Suspense fallback={null}>
        <BrowseClient
          categories={allCategories}
          questions={allQuestions}
          initialCategory={category.id}
        />
      </Suspense>
    </div>
  );
}
