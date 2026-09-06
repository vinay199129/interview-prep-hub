import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BrowseClient } from "@/components/BrowseClient";
import { ProgressStats } from "@/components/ProgressStats";
import { StudyPlan } from "@/components/StudyPlan";
import {
  getAllQuestions,
  getCategories,
  getDomains,
  getTrackById,
  getTracks,
} from "@/lib/data";

export function generateStaticParams() {
  return getTracks().map((track) => ({ id: track.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const t = getTrackById(id);
  if (!t) return { title: "Track not found" };
  const title = `${t.name} · Interview Prep Hub`;
  return { title, description: t.description, openGraph: { title, description: t.description } };
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
        <div className="pt-1 text-xs text-slate-500 dark:text-slate-400">Essential sequence progress</div>
        <ProgressStats
          questionIds={track.studyPlan.flatMap((stage) => stage.questionIds)}
          variant="full"
          className="pt-1 max-w-md"
        />
      </header>
      <StudyPlan stages={track.studyPlan} questions={trackQuestions} />
      <h2 className="border-t border-slate-200 pt-6 text-xl font-semibold dark:border-slate-800">
        Full question bank / optional depth ({trackQuestions.length})
      </h2>
      <Suspense fallback={null}>
        <BrowseClient
          categories={categories}
          questions={questions}
          domains={getDomains()}
          initialCategories={track.categoryIds}
        />
      </Suspense>
    </div>
  );
}
