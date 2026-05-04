import { Suspense } from "react";
import { notFound } from "next/navigation";
import { BrowseClient } from "@/components/BrowseClient";
import { ProgressStats } from "@/components/ProgressStats";
import { getAllQuestions, getCategories, getTrackById, getTracks } from "@/lib/data";

export function generateStaticParams() {
  return getTracks().map((track) => ({ id: track.id }));
}

export default async function TrackPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const track = getTrackById(id);
  if (!track) notFound();

  const categories = getCategories();
  const questions = getAllQuestions();
  const categoryById = new Map(categories.map((c) => [c.id, c]));
  const trackQuestions = questions.filter((q) =>
    q.categoryIds.some((categoryId) => track.categoryIds.includes(categoryId)),
  );

  return (
    <div className="space-y-4">
      <header className="space-y-2">
        <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Career track
        </div>
        <h1 className="text-2xl font-semibold">{track.name}</h1>
        <p className="max-w-3xl text-slate-600 dark:text-slate-300">
          {track.description}
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          {track.categoryIds.map((categoryId) => {
            const category = categoryById.get(categoryId);
            return (
              <span
                key={categoryId}
                className="text-xs px-2 py-1 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200"
              >
                {category?.shortName ?? categoryId}
              </span>
            );
          })}
        </div>
        <ProgressStats
          questionIds={trackQuestions.map((q) => q.id)}
          variant="full"
          className="pt-1 max-w-md"
        />
      </header>
      <Suspense fallback={null}>
        <BrowseClient
          categories={categories}
          questions={questions}
          initialCategories={track.categoryIds}
        />
      </Suspense>
    </div>
  );
}
