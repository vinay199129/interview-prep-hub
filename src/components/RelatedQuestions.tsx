import Link from "next/link";
import type { Question } from "@/lib/types";

interface Props {
  questions: Question[];
}

/**
 * Cross-links to questions covering adjacent ground. Keeps overlapping coverage
 * feeling like a study path rather than repetition.
 */
export function RelatedQuestions({ questions }: Props) {
  if (questions.length === 0) return null;
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <h2 className="font-semibold">Related questions</h2>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
        Related concepts and alternative angles.
      </p>
      <ul className="mt-3 space-y-2">
        {questions.map((q) => (
          <li key={q.id}>
            <Link
              href={`/questions/${q.id}`}
              className="group flex flex-col gap-0.5 rounded-md border border-slate-200 px-3 py-2 transition hover:border-brand-400 dark:border-slate-800"
            >
              <span className="text-sm group-hover:text-brand-600 dark:group-hover:text-brand-100">
                {q.prompt}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {q.topic} · {q.difficulty} · {q.estimatedTimeMin} min
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
