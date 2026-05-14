"use client";

import { STATUS_DOT, useProgress } from "@/lib/progress";

interface Props {
  questionIds: string[];
  variant?: "compact" | "full";
  className?: string;
}

export function ProgressStats({ questionIds, variant = "compact", className = "" }: Props) {
  const { map } = useProgress();
  const total = questionIds.length;
  if (total === 0) return null;

  let known = 0,
    review = 0,
    unknown = 0;
  for (const id of questionIds) {
    const s = map[id];
    if (s === "known") known++;
    else if (s === "review") review++;
    else if (s === "unknown") unknown++;
  }
  const unseen = total - known - review - unknown;

  const pct = (n: number) => (n / total) * 100;
  const hasProgress = known + review + unknown > 0;

  if (variant === "compact") {
    return (
      <div
        className={`flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 ${className}`}
        role="group"
        aria-label="Progress summary"
      >
        <span className="inline-flex items-center gap-1" aria-label={`${known} got it`}>
          <span aria-hidden="true" className={`inline-block w-1.5 h-1.5 rounded-full ${STATUS_DOT.known}`} />
          {known}
        </span>
        <span className="inline-flex items-center gap-1" aria-label={`${review} to review`}>
          <span aria-hidden="true" className={`inline-block w-1.5 h-1.5 rounded-full ${STATUS_DOT.review}`} />
          {review}
        </span>
        <span className="inline-flex items-center gap-1" aria-label={`${unknown} didn't know`}>
          <span aria-hidden="true" className={`inline-block w-1.5 h-1.5 rounded-full ${STATUS_DOT.unknown}`} />
          {unknown}
        </span>
        <span aria-label={`${unseen} unseen`}>· {unseen} unseen</span>
      </div>
    );
  }

  const reviewed = known + review + unknown;
  return (
    <div className={`space-y-1.5 ${className}`}>
      <div
        className="h-2 rounded bg-slate-200 dark:bg-slate-800 overflow-hidden flex"
        role="progressbar"
        aria-valuenow={reviewed}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={`Reviewed ${reviewed} of ${total}`}
      >
        {hasProgress ? (
          <>
            {known > 0 && <div className="h-full bg-emerald-500" style={{ width: `${pct(known)}%` }} />}
            {review > 0 && <div className="h-full bg-amber-500" style={{ width: `${pct(review)}%` }} />}
            {unknown > 0 && <div className="h-full bg-rose-500" style={{ width: `${pct(unknown)}%` }} />}
          </>
        ) : null}
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-600 dark:text-slate-300">
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden="true" className={`inline-block w-2 h-2 rounded-full ${STATUS_DOT.known}`} />
          {known} got it
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden="true" className={`inline-block w-2 h-2 rounded-full ${STATUS_DOT.review}`} />
          {review} review
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden="true" className={`inline-block w-2 h-2 rounded-full ${STATUS_DOT.unknown}`} />
          {unknown} didn&apos;t know
        </span>
        <span className="text-slate-500 dark:text-slate-400">{unseen} unseen of {total}</span>
      </div>
    </div>
  );
}
