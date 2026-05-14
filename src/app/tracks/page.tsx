import Link from "next/link";
import type { Metadata } from "next";
import { getAllQuestions, getCategories, getTracks } from "@/lib/data";
import { ProgressStats } from "@/components/ProgressStats";

export const metadata: Metadata = {
  title: "Career tracks · Interview Prep Hub",
  description:
    "Skill-set aligned preparation paths: AI Engineer Core, RAG & Azure AI, Agentic AI, Azure Integration, .NET / Java / Python Cloud, plus Engineering Manager and Staff+ IC tracks.",
};

export default function TracksPage() {
  const tracks = getTracks();
  const categories = getCategories();
  const questions = getAllQuestions();
  const categoryById = new Map(categories.map((c) => [c.id, c]));

  return (
    <div className="space-y-5">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">Career tracks</h1>
        <p className="max-w-3xl text-slate-600 dark:text-slate-300">
          Study paths organized by skill set and career direction. Tracks combine
          categories into realistic preparation routes without using old POD labels.
        </p>
      </header>

      <section className="grid md:grid-cols-2 gap-4">
        {tracks.map((track) => {
          const trackQuestions = questions.filter((q) =>
            q.categoryIds.some((id) => track.categoryIds.includes(id)),
          );
          const count = trackQuestions.length;
          return (
            <Link
              key={track.id}
              href={`/tracks/${track.id}`}
              className="block rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:shadow transition"
            >
              <div className="text-xs font-semibold uppercase tracking-wide text-brand-700 dark:text-brand-100">
                {track.shortName}
              </div>
              <h2 className="mt-1 font-semibold">{track.name}</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                {track.description}
              </p>
              <div className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                {count} {count === 1 ? "question" : "questions"}
              </div>
              <ProgressStats
                questionIds={trackQuestions.map((q) => q.id)}
                variant="full"
                className="mt-2"
              />
              <div className="mt-3 flex flex-wrap gap-1">
                {track.categoryIds.map((id) => {
                  const category = categoryById.get(id);
                  return (
                    <span
                      key={id}
                      className="text-[11px] px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
                    >
                      {category?.shortName ?? id}
                    </span>
                  );
                })}
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
