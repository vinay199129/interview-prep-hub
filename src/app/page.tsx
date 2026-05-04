import Link from "next/link";
import { getCategories, getAllQuestions, getTracks } from "@/lib/data";
import { ProgressStats } from "@/components/ProgressStats";

const accentBg: Record<string, string> = {
  indigo: "bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-900",
  violet: "bg-violet-50 dark:bg-violet-950/40 border-violet-200 dark:border-violet-900",
  emerald: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900",
  orange: "bg-orange-50 dark:bg-orange-950/40 border-orange-200 dark:border-orange-900",
  amber: "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900",
  cyan: "bg-cyan-50 dark:bg-cyan-950/40 border-cyan-200 dark:border-cyan-900",
  teal: "bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-900",
  sky: "bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-900",
  rose: "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900",
  slate: "bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800",
  blue: "bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900",
};
const accentText: Record<string, string> = {
  indigo: "text-indigo-800 dark:text-indigo-200",
  violet: "text-violet-800 dark:text-violet-200",
  emerald: "text-emerald-800 dark:text-emerald-200",
  orange: "text-orange-800 dark:text-orange-200",
  amber: "text-amber-800 dark:text-amber-200",
  cyan: "text-cyan-800 dark:text-cyan-200",
  teal: "text-teal-800 dark:text-teal-200",
  sky: "text-sky-800 dark:text-sky-200",
  rose: "text-rose-800 dark:text-rose-200",
  slate: "text-slate-800 dark:text-slate-200",
  blue: "text-blue-800 dark:text-blue-200",
};

export default function Home() {
  const categories = getCategories();
  const questions = getAllQuestions();
  const tracks = getTracks();

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">
          Interview Prep Hub
        </h1>
        <p className="text-slate-600 dark:text-slate-300 max-w-3xl">
          A curated, filterable bank of interview questions across AI engineering
          categories — LLMs, RAG, agents, evaluation, MLOps, safety, and more.
          Use it to prepare candidates, run interviews, or self-study.
        </p>
        <div className="flex gap-3 pt-1">
          <Link
            href="/browse"
            className="inline-flex items-center px-4 py-2 rounded-md bg-brand-600 text-white text-sm hover:bg-brand-700"
          >
            Browse all {questions.length} questions →
          </Link>
          <Link
            href="/criteria"
            className="inline-flex items-center px-4 py-2 rounded-md border border-slate-300 dark:border-slate-700 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            View evaluation criteria
          </Link>
          <Link
            href="/tracks"
            className="inline-flex items-center px-4 py-2 rounded-md border border-slate-300 dark:border-slate-700 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Explore career tracks
          </Link>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">Career tracks</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Skill-set aligned preparation paths built from the question categories.
            </p>
          </div>
          <Link
            href="/tracks"
            className="text-sm text-brand-600 dark:text-brand-100 hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {tracks.slice(0, 3).map((track) => {
            const trackQs = questions.filter((q) =>
              q.categoryIds.some((id) => track.categoryIds.includes(id)),
            );
            const count = trackQs.length;
            return (
              <Link
                key={track.id}
                href={`/tracks/${track.id}`}
                className="block rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:shadow transition"
              >
                <div className="text-xs font-semibold uppercase tracking-wide text-brand-700 dark:text-brand-100">
                  {track.shortName}
                </div>
                <h3 className="mt-1 font-semibold">{track.name}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 line-clamp-3">
                  {track.description}
                </p>
                <div className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                  {count} {count === 1 ? "question" : "questions"}
                </div>
                <ProgressStats
                  questionIds={trackQs.map((q) => q.id)}
                  variant="compact"
                  className="mt-2"
                />
              </Link>
            );
          })}
        </div>
      </section>

      <section className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((c) => {
          const categoryQs = questions.filter((q) => q.categoryIds.includes(c.id));
          const count = categoryQs.length;
          return (
            <Link
              key={c.id}
              href={`/categories/${c.id}`}
              className={`block rounded-lg border p-5 hover:shadow transition ${accentBg[c.accent] ?? ""}`}
            >
              <div
                className={`text-xs font-semibold uppercase tracking-wide ${accentText[c.accent] ?? ""}`}
              >
                {c.shortName}
              </div>
              <h2 className="mt-1 font-semibold">{c.name}</h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 line-clamp-3">
                {c.description}
              </p>
              <div className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                {count} questions
              </div>
              <ProgressStats
                questionIds={categoryQs.map((q) => q.id)}
                variant="compact"
                className="mt-2"
              />
            </Link>
          );
        })}
      </section>

      <section className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
        <h2 className="font-semibold mb-2">How to use this</h2>
        <ul className="list-disc list-inside text-sm text-slate-700 dark:text-slate-300 space-y-1">
          <li>
            <strong>Interviewers</strong>: open Browse, filter by category +
            experience band + difficulty, share question deep-links with the panel.
          </li>
          <li>
            <strong>Candidates / self-prep</strong>: browse by topic, study the
            answer + key points, then test yourself on follow-ups.
          </li>
          <li>
            <strong>Pair with the 9-criteria evaluation template</strong> when
            scoring interviews.
          </li>
        </ul>
      </section>
    </div>
  );
}
