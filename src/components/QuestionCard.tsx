"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  DIFFICULTY_LABEL,
  EXPERIENCE_LABEL,
  TYPE_LABEL,
  type Category,
  type Question,
} from "@/lib/types";
import { MarkdownAnswer } from "./MarkdownAnswer";
import {
  STATUS_BUTTON,
  STATUS_BUTTON_ACTIVE,
  STATUS_DOT,
  STATUS_LABEL,
  useProgress,
  type Status,
} from "@/lib/progress";

const difficultyColors: Record<string, string> = {
  easy: "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800",
  medium:
    "bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 border-amber-200 dark:border-amber-800",
  hard: "bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-orange-200 border-orange-200 dark:border-orange-800",
  expert:
    "bg-rose-100 dark:bg-rose-900/40 text-rose-800 dark:text-rose-200 border-rose-200 dark:border-rose-800",
};

const categoryBadge =
  "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700";

export function QuestionCard({
  q,
  categories = [],
  defaultOpen = false,
  isFocused = false,
  cardRef,
}: {
  q: Question;
  categories?: Category[];
  defaultOpen?: boolean;
  isFocused?: boolean;
  cardRef?: (el: HTMLDivElement | null) => void;
}) {
  const [open, setOpen] = useState(defaultOpen);
  useEffect(() => {
    setOpen(defaultOpen);
  }, [defaultOpen]);
  const categoryById = new Map(categories.map((c) => [c.id, c]));
  const { map: progressMap, setStatus } = useProgress();
  const status = progressMap[q.id];

  const mark = (next: Status) => {
    setStatus(q.id, status === next ? null : next);
    if (next === "known" || next === "unknown") {
      setOpen(false);
    }
  };

  return (
    <article
      id={q.id}
      ref={cardRef}
      className={`bg-white dark:bg-slate-900 border rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-shadow ${
        isFocused
          ? "border-brand-500 dark:border-brand-300 ring-2 ring-brand-500/40 dark:ring-brand-300/40"
          : "border-slate-200 dark:border-slate-800"
      }`}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={`answer-${q.id}`}
        className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 flex flex-col gap-2"
      >
        <div className="flex flex-wrap gap-1.5 text-[11px] items-center">
          {status ? (
            <span
              className={`inline-block w-2 h-2 rounded-full ${STATUS_DOT[status]}`}
              title={STATUS_LABEL[status]}
              aria-label={`Status: ${STATUS_LABEL[status]}`}
            />
          ) : null}
          {q.categoryIds.map((c) => (
            <span
              key={c}
              className={`px-2 py-0.5 border rounded ${categoryBadge}`}
            >
              {categoryById.get(c)?.shortName ?? c}
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
          <span className="px-2 py-0.5 text-slate-500 dark:text-slate-400" title="Estimated discussion time">
            ~{q.estimatedTimeMin} min discuss
          </span>
          <span className="px-2 py-0.5 text-slate-500 dark:text-slate-400" title="Estimated answer reading time">
            ~{Math.max(1, Math.round(q.answer.trim().split(/\s+/).filter(Boolean).length / 200))} min read
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
        <div
          id={`answer-${q.id}`}
          className="border-t border-slate-200 dark:border-slate-800 px-4 py-4 space-y-4 bg-slate-50/50 dark:bg-slate-900/40"
        >
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

          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            <span className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400 mr-1">
              How well do you know this?
            </span>
            {(['known', 'review', 'unknown'] as Status[]).map((s) => {
              const active = status === s;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => mark(s)}
                  className={`text-xs px-2.5 py-1 rounded border transition ${
                    active ? STATUS_BUTTON_ACTIVE[s] : `bg-white dark:bg-slate-900 ${STATUS_BUTTON[s]}`
                  }`}
                >
                  {STATUS_LABEL[s]}
                </button>
              );
            })}
            {status ? (
              <button
                type="button"
                onClick={() => setStatus(q.id, null)}
                className="text-[11px] text-slate-500 dark:text-slate-400 hover:underline ml-1"
              >
                clear
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </article>
  );
}
