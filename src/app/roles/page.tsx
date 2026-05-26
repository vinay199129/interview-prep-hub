import Link from "next/link";
import type { Metadata } from "next";
import { getAllQuestions, getRoleFocuses } from "@/lib/data";
import { ROLE_FOCUS_LEVEL_LABEL } from "@/lib/types";
import { ProgressStats } from "@/components/ProgressStats";

export const metadata: Metadata = {
  title: "Role focuses · Interview Prep Hub",
  description:
    "JD-shaped revision lanes for specific roles and companies. 30-min cram, 1-day deep prep, or 3-day mastery — built from the question bank.",
};

export default function RoleFocusesPage() {
  const focuses = getRoleFocuses();
  const questions = getAllQuestions();
  const questionById = new Map(questions.map((q) => [q.id, q]));

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">Role focuses</h1>
        <p className="max-w-3xl text-slate-600 dark:text-slate-300">
          JD-shaped revision lanes for specific roles and companies. Pick the
          time you have — <strong>30-min cram</strong>,{" "}
          <strong>1-day deep prep</strong>, or <strong>3-day mastery</strong> —
          and walk into the loop knowing exactly which questions, glossary
          terms, and behavioral stories will be on the table.
        </p>
        <p className="max-w-3xl text-sm text-slate-500 dark:text-slate-400">
          Different from{" "}
          <Link
            href="/tracks"
            className="text-brand-600 dark:text-brand-100 underline"
          >
            Career tracks
          </Link>{" "}
          (broad skill paths) and{" "}
          <Link
            href="/patterns"
            className="text-brand-600 dark:text-brand-100 underline"
          >
            Patterns
          </Link>{" "}
          (company / region archetypes) — Role focuses target one JD.
        </p>
      </header>

      <section className="grid md:grid-cols-2 gap-4">
        {focuses.map((focus) => {
          const curatedIds = focus.curatedQuestionIds.filter((id) =>
            questionById.has(id),
          );
          return (
            <Link
              key={focus.id}
              href={`/roles/${focus.id}`}
              className="block rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:shadow transition"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="text-xs font-semibold uppercase tracking-wide text-brand-700 dark:text-brand-100">
                  {focus.company}
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                  {ROLE_FOCUS_LEVEL_LABEL[focus.level]}
                </span>
              </div>
              <h2 className="mt-1 font-semibold">{focus.roleTitle}</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 line-clamp-3">
                {focus.jdSummary}
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-slate-600 dark:text-slate-300">
                {focus.revisionLanes.map((lane) => (
                  <span
                    key={lane.id}
                    className="px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  >
                    {lane.name} · {lane.questionIds.length}q
                  </span>
                ))}
              </div>
              <div className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                {curatedIds.length} curated questions
              </div>
              <ProgressStats
                questionIds={curatedIds}
                variant="compact"
                className="mt-2"
              />
            </Link>
          );
        })}
      </section>
    </div>
  );
}
