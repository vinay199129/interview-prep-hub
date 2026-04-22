"use client";

import { useState } from "react";
import Link from "next/link";
import {
  DIFFICULTY_LABEL,
  EXPERIENCE_LABEL,
  TYPE_LABEL,
  type Question,
} from "@/lib/types";
import { MarkdownAnswer } from "./MarkdownAnswer";

const difficultyColors: Record<string, string> = {
  easy: "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800",
  medium:
    "bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 border-amber-200 dark:border-amber-800",
  hard: "bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-orange-200 border-orange-200 dark:border-orange-800",
  expert:
    "bg-rose-100 dark:bg-rose-900/40 text-rose-800 dark:text-rose-200 border-rose-200 dark:border-rose-800",
};

const podColors: Record<string, string> = {
  pod1: "bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-800",
  pod2: "bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 border-amber-200 dark:border-amber-800",
  pod3: "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800",
};

export function QuestionCard({
  q,
  defaultOpen = false,
}: {
  q: Question;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <article
      id={q.id}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden"
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 flex flex-col gap-2"
      >
        <div className="flex flex-wrap gap-1.5 text-[11px]">
          {q.podIds.map((p) => (
            <span
              key={p}
              className={`px-2 py-0.5 border rounded ${podColors[p] ?? ""}`}
            >
              {p.toUpperCase()}
            </span>
          ))}
          <span
            className={`px-2 py-0.5 border rounded ${difficultyColors[q.difficulty] ?? ""}`}
          >
            {DIFFICULTY_LABEL[q.difficulty]}
          </span>
          <span className="px-2 py-0.5 border border-slate-200 dark:border-slate-700 rounded text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800">
            {TYPE_LABEL[q.type]}
          </span>
          <span className="px-2 py-0.5 border border-slate-200 dark:border-slate-700 rounded text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800">
            {q.topic}
            {q.subTopic ? ` · ${q.subTopic}` : ""}
          </span>
          <span className="px-2 py-0.5 text-slate-500 dark:text-slate-400">
            ~{q.estimatedTimeMin} min
          </span>
        </div>
        <div className="font-medium text-slate-900 dark:text-slate-100">{q.prompt}</div>
        <div className="text-[11px] text-slate-500 dark:text-slate-400">
          For:{" "}
          {q.experienceBands.map((b) => EXPERIENCE_LABEL[b]).join(" · ")} •{" "}
          <span className="text-brand-600 dark:text-brand-100">
            {open ? "Hide answer ▲" : "Show answer ▼"}
          </span>
        </div>
      </button>

      {open ? (
        <div className="border-t border-slate-200 dark:border-slate-800 px-4 py-4 space-y-4 bg-slate-50/50 dark:bg-slate-900/40">
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">
              Answer
            </h3>
            <MarkdownAnswer>{q.answer}</MarkdownAnswer>
          </section>

          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">
              Key points to listen for
            </h3>
            <ul className="list-disc list-inside text-sm space-y-0.5">
              {q.keyPoints.map((k, i) => (
                <li key={i}>{k}</li>
              ))}
            </ul>
          </section>

          {q.followUps.length ? (
            <section>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">
                Follow-up probes
              </h3>
              <ul className="list-disc list-inside text-sm space-y-0.5">
                {q.followUps.map((k, i) => (
                  <li key={i}>{k}</li>
                ))}
              </ul>
            </section>
          ) : null}

          {q.redFlags.length ? (
            <section>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-rose-700 dark:text-rose-300 mb-1">
                Red flags (weak answers)
              </h3>
              <ul className="list-disc list-inside text-sm space-y-0.5 text-rose-900 dark:text-rose-200">
                {q.redFlags.map((k, i) => (
                  <li key={i}>{k}</li>
                ))}
              </ul>
            </section>
          ) : null}

          {q.references.length ? (
            <section>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">
                References
              </h3>
              <ul className="list-disc list-inside text-sm space-y-0.5">
                {q.references.map((r, i) => (
                  <li key={i}>
                    <a
                      className="text-brand-600 dark:text-brand-100 hover:underline"
                      href={r.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {r.title}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {q.tags.length ? (
            <div className="flex flex-wrap gap-1 pt-1">
              {q.tags.map((t) => (
                <span
                  key={t}
                  className="text-[11px] px-2 py-0.5 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded"
                >
                  #{t}
                </span>
              ))}
            </div>
          ) : null}

          <div className="text-xs">
            <Link
              href={`/questions/${q.id}`}
              className="text-brand-600 dark:text-brand-100 hover:underline"
            >
              Permalink to this question
            </Link>
          </div>
        </div>
      ) : null}
    </article>
  );
}
