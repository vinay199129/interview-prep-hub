import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getAllQuestions,
  getCategories,
  getGlossary,
  getRoleFocusById,
  getRoleFocuses,
} from "@/lib/data";
import { ROLE_FOCUS_LEVEL_LABEL, DIFFICULTY_LABEL, TYPE_LABEL } from "@/lib/types";
import { MarkdownAnswer } from "@/components/MarkdownAnswer";
import { ProgressStats } from "@/components/ProgressStats";

export function generateStaticParams() {
  return getRoleFocuses().map((focus) => ({ id: focus.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const focus = getRoleFocusById(id);
  if (!focus) return { title: "Role focus not found" };
  const title = `${focus.company} — ${focus.roleTitle} · Interview Prep Hub`;
  const description = focus.jdSummary.slice(0, 200);
  return {
    title,
    description,
    openGraph: { title, description, type: "article" },
  };
}

const difficultyAccent: Record<string, string> = {
  easy: "border-emerald-300 text-emerald-700 dark:border-emerald-700 dark:text-emerald-300",
  medium: "border-amber-300 text-amber-700 dark:border-amber-700 dark:text-amber-300",
  hard: "border-orange-300 text-orange-700 dark:border-orange-700 dark:text-orange-300",
  expert: "border-rose-300 text-rose-700 dark:border-rose-700 dark:text-rose-300",
};

export default async function RoleFocusPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const focus = getRoleFocusById(id);
  if (!focus) notFound();

  const allQuestions = getAllQuestions();
  const questionById = new Map(allQuestions.map((q) => [q.id, q]));
  const categories = getCategories();
  const categoryById = new Map(categories.map((c) => [c.id, c]));
  const glossary = getGlossary();
  const glossaryById = new Map(glossary.map((g) => [g.id, g]));

  const curatedQuestions = focus.curatedQuestionIds
    .map((qid) => questionById.get(qid))
    .filter((q): q is NonNullable<typeof q> => Boolean(q));

  return (
    <div className="space-y-8">
      <Link
        href="/roles"
        className="text-sm text-brand-600 dark:text-brand-100 hover:underline"
      >
        ← All role focuses
      </Link>

      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-brand-700 dark:text-brand-100">
            {focus.company}
          </span>
          <span className="text-[11px] px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
            {ROLE_FOCUS_LEVEL_LABEL[focus.level]}
          </span>
        </div>
        <h1 className="text-2xl font-semibold">{focus.roleTitle}</h1>
        <div className="max-w-3xl text-slate-700 dark:text-slate-200">
          <MarkdownAnswer>{focus.jdSummary}</MarkdownAnswer>
        </div>
        <ProgressStats
          questionIds={curatedQuestions.map((q) => q.id)}
          variant="full"
          className="pt-1 max-w-md"
        />
      </header>

      <section className="grid md:grid-cols-2 gap-4">
        <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
          <h2 className="font-semibold mb-2">Must-have skills</h2>
          <ul className="list-disc list-inside text-sm text-slate-700 dark:text-slate-300 space-y-1">
            {focus.mustHaveSkills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
          <h2 className="font-semibold mb-2">Nice-to-have</h2>
          <ul className="list-disc list-inside text-sm text-slate-700 dark:text-slate-300 space-y-1">
            {focus.niceToHaveSkills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Revision lanes</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Pick a time-box. Each list links into the full question page.
          </p>
        </div>
        <div className="space-y-3">
          {focus.revisionLanes.map((lane) => (
            <details
              key={lane.id}
              className="group rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
            >
              <summary className="cursor-pointer list-none px-5 py-3 flex items-start justify-between gap-3">
                <div>
                  <div className="font-semibold">
                    {lane.name}{" "}
                    <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
                      · {lane.timebox} · {lane.questionIds.length} questions
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                    {lane.description}
                  </p>
                </div>
                <span className="text-slate-400 group-open:rotate-180 transition shrink-0">
                  ▾
                </span>
              </summary>
              <ol className="border-t border-slate-200 dark:border-slate-800 divide-y divide-slate-200 dark:divide-slate-800">
                {lane.questionIds.map((qid, idx) => {
                  const q = questionById.get(qid);
                  if (!q) return null;
                  const primaryCategory = categoryById.get(q.categoryIds[0]);
                  return (
                    <li key={qid} className="px-5 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/60">
                      <Link href={`/questions/${q.id}`} className="block">
                        <div className="flex items-baseline gap-3">
                          <span className="text-xs text-slate-400 dark:text-slate-500 shrink-0 w-6 tabular-nums">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                              {q.prompt}
                            </div>
                            <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                              <span
                                className={`px-1.5 py-0.5 rounded border ${difficultyAccent[q.difficulty]}`}
                              >
                                {DIFFICULTY_LABEL[q.difficulty]}
                              </span>
                              <span className="px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                                {TYPE_LABEL[q.type]}
                              </span>
                              <span>{q.topic}</span>
                              {primaryCategory && (
                                <span>· {primaryCategory.shortName}</span>
                              )}
                              <span>· ~{q.estimatedTimeMin} min</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </details>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3">
        <h2 className="font-semibold">Glossary pre-flight</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Terms an interviewer is likely to drop without defining. Skim before
          the call.
        </p>
        <div className="flex flex-wrap gap-2">
          {focus.glossaryIds.map((gid) => {
            const term = glossaryById.get(gid);
            if (!term) return null;
            return (
              <Link
                key={gid}
                href={`/glossary#${term.id}`}
                className="text-xs px-2 py-1 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-brand-400 hover:text-brand-700 dark:hover:text-brand-100"
              >
                {term.term}
              </Link>
            );
          })}
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3">
        <h2 className="font-semibold">Behavioral stories to rehearse</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          STAR-format prompts that tend to surface for this role. Build a
          1-minute and a 3-minute version of each.
        </p>
        <ul className="space-y-2">
          {focus.behavioralStoryIds.map((bid) => {
            const q = questionById.get(bid);
            if (!q) return null;
            return (
              <li key={bid}>
                <Link
                  href={`/questions/${q.id}`}
                  className="text-sm text-brand-700 dark:text-brand-100 hover:underline"
                >
                  → {q.prompt}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {focus.references.length > 0 && (
        <section className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-2">
          <h2 className="font-semibold">References</h2>
          <ul className="list-disc list-inside text-sm text-slate-700 dark:text-slate-300 space-y-1">
            {focus.references.map((r) => (
              <li key={r.url}>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand-700 dark:text-brand-100 hover:underline"
                >
                  {r.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {focus.tagFilters.length > 0 && (
        <section className="text-sm text-slate-600 dark:text-slate-300">
          Browse all questions tagged for this role:{" "}
          {focus.tagFilters.map((tag, i) => (
            <span key={tag}>
              {i > 0 && " · "}
              <Link
                href={`/browse?tag=${encodeURIComponent(tag)}`}
                className="text-brand-700 dark:text-brand-100 underline"
              >
                {tag}
              </Link>
            </span>
          ))}
        </section>
      )}
    </div>
  );
}
