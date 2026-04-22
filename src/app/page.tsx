import Link from "next/link";
import { getPods, getAllQuestions } from "@/lib/data";

const accentBg: Record<string, string> = {
  blue: "bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900",
  amber: "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900",
  emerald:
    "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900",
};
const accentText: Record<string, string> = {
  blue: "text-blue-800 dark:text-blue-200",
  amber: "text-amber-800 dark:text-amber-200",
  emerald: "text-emerald-800 dark:text-emerald-200",
};

export default function Home() {
  const pods = getPods();
  const questions = getAllQuestions();

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">
          Interview Hub
        </h1>
        <p className="text-slate-600 dark:text-slate-300 max-w-3xl">
          A curated, filterable bank of interview questions for our three
          delivery PODs, with detailed answers, follow-ups, red flags, and
          references. Use it to prepare candidates, run interviews, or
          self-study.
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
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        {pods.map((p) => {
          const count = questions.filter((q) => q.podIds.includes(p.id)).length;
          return (
            <Link
              key={p.id}
              href={`/pods/${p.id}`}
              className={`block rounded-lg border p-5 hover:shadow transition ${accentBg[p.accent] ?? ""}`}
            >
              <div
                className={`text-xs font-semibold uppercase tracking-wide ${accentText[p.accent] ?? ""}`}
              >
                {p.shortName}
              </div>
              <h2 className="mt-1 font-semibold">{p.name}</h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 line-clamp-3">
                {p.description}
              </p>
              <div className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                {count} questions • {p.mustHave.length} must-have skills
              </div>
              <div className="mt-3 flex flex-wrap gap-1">
                {p.mustHave.slice(0, 5).map((s) => (
                  <span
                    key={s}
                    className="text-[11px] px-2 py-0.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded"
                  >
                    {s}
                  </span>
                ))}
                {p.mustHave.length > 5 ? (
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    +{p.mustHave.length - 5} more
                  </span>
                ) : null}
              </div>
            </Link>
          );
        })}
      </section>

      <section className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
        <h2 className="font-semibold mb-2">How to use this</h2>
        <ul className="list-disc list-inside text-sm text-slate-700 dark:text-slate-300 space-y-1">
          <li>
            <strong>Interviewers</strong>: open Browse, filter by POD +
            experience band + difficulty, share question deep-links with the
            panel.
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
