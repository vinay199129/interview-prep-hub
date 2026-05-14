"use client";

import { useEffect, useMemo, useState } from "react";
import {
  DIFFICULTY_LABEL,
  EXPERIENCE_LABEL,
  TYPE_LABEL,
  type Category,
  type Difficulty,
  type ExperienceBand,
  type Question,
} from "@/lib/types";
import { MarkdownAnswer } from "./MarkdownAnswer";
import { ConfirmButton } from "./ConfirmButton";
import {
  GRADE_BUTTON,
  GRADE_LABEL,
  bucket,
  isDue,
  previewInterval,
  useSrs,
  type Grade,
} from "@/lib/srs";

type Mode = "due" | "filtered";
type Phase = "setup" | "session" | "summary";

const GRADES: Grade[] = ["again", "hard", "good", "easy"];
const DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard", "expert"];
const BANDS: ExperienceBand[] = ["junior", "mid", "senior", "lead"];

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function PracticeClient({
  questions,
  categories,
}: {
  questions: Question[];
  categories: Category[];
}) {
  const { map, review, clearAll } = useSrs();
  const allIds = useMemo(() => questions.map((q) => q.id), [questions]);
  const buckets = useMemo(() => bucket(allIds, map), [allIds, map]);

  const [phase, setPhase] = useState<Phase>("setup");
  const [mode, setMode] = useState<Mode>("due");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<Difficulty[]>([
    "medium",
    "hard",
  ]);
  const [bandFilter, setBandFilter] = useState<ExperienceBand | "any">("any");
  const [count, setCount] = useState(10);
  const [includeNew, setIncludeNew] = useState(true);

  const [queue, setQueue] = useState<string[]>([]);
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [reviewed, setReviewed] = useState<{ id: string; grade: Grade }[]>([]);

  const toggle = <T extends string>(arr: T[], v: T): T[] =>
    arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];

  const pool = useMemo(() => {
    return questions.filter((q) => {
      if (selectedCategories.length > 0 && !q.categoryIds.some((c) => selectedCategories.includes(c)))
        return false;
      if (!selectedDifficulties.includes(q.difficulty)) return false;
      if (bandFilter !== "any" && !q.experienceBands.includes(bandFilter))
        return false;
      return true;
    });
  }, [questions, selectedCategories, selectedDifficulties, bandFilter]);

  const buildQueue = (): string[] => {
    if (mode === "due") {
      const due = questions.filter((q) => {
        const c = map[q.id];
        if (!c) return includeNew; // unseen counts only if includeNew
        return isDue(c);
      });
      return shuffle(due).slice(0, count).map((q) => q.id);
    }
    return shuffle(pool).slice(0, count).map((q) => q.id);
  };

  const start = () => {
    const q = buildQueue();
    if (q.length === 0) return;
    setQueue(q);
    setIdx(0);
    setRevealed(false);
    setReviewed([]);
    setPhase("session");
  };

  if (phase === "session") {
    return (
      <SessionView
        questions={questions}
        categories={categories}
        queue={queue}
        idx={idx}
        revealed={revealed}
        setRevealed={setRevealed}
        srsMap={map}
        onGrade={(grade) => {
          const id = queue[idx];
          review(id, grade);
          const next = [...reviewed, { id, grade }];
          setReviewed(next);
          if (idx + 1 >= queue.length) {
            setPhase("summary");
          } else {
            setIdx(idx + 1);
            setRevealed(false);
          }
        }}
        onAbort={() => setPhase("setup")}
        reviewedCount={reviewed.length}
      />
    );
  }

  if (phase === "summary") {
    return (
      <SummaryView
        questions={questions}
        reviewed={reviewed}
        onAgain={() => setPhase("setup")}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Self-practice</h1>
        <p className="text-slate-600 dark:text-slate-300 mt-1 text-sm">
          Spaced-repetition study queue. Review what&apos;s due, or build a
          filtered mock quiz. Progress lives in this browser.
        </p>
      </div>

      <section className="grid sm:grid-cols-4 gap-3 text-sm">
        <Stat label="Due now" value={buckets.due} accent="text-rose-600 dark:text-rose-300" />
        <Stat label="Learning" value={buckets.learning} accent="text-amber-600 dark:text-amber-300" />
        <Stat label="Mature (7d+)" value={buckets.mature} accent="text-emerald-600 dark:text-emerald-300" />
        <Stat label="Unseen" value={buckets.unseen} accent="text-slate-600 dark:text-slate-300" />
      </section>

      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 space-y-3">
        <h2 className="font-semibold text-sm uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Mode
        </h2>
        <div className="flex flex-wrap gap-1.5">
          <ModeBtn active={mode === "due"} onClick={() => setMode("due")} label="Due review" />
          <ModeBtn active={mode === "filtered"} onClick={() => setMode("filtered")} label="Mock quiz (filtered)" />
        </div>

        {mode === "due" ? (
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={includeNew}
              onChange={(e) => setIncludeNew(e.target.checked)}
            />
            Include unseen questions in the queue
          </label>
        ) : null}
      </section>

      {mode === "filtered" ? (
        <>
          <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 space-y-3">
            <h2 className="font-semibold text-sm uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Categories {selectedCategories.length > 0 ? `(${selectedCategories.length})` : "(all)"}
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((c) => {
                const active = selectedCategories.includes(c.id);
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedCategories((s) => toggle(s, c.id))}
                    className={`text-xs px-2 py-1 border rounded ${
                      active
                        ? "bg-brand-600 text-white border-brand-600"
                        : "border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                    }`}
                  >
                    {c.shortName}
                  </button>
                );
              })}
              {selectedCategories.length > 0 ? (
                <button
                  type="button"
                  onClick={() => setSelectedCategories([])}
                  className="text-xs px-2 py-1 text-slate-500 dark:text-slate-400 underline"
                >
                  clear
                </button>
              ) : null}
            </div>
          </section>

          <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 space-y-3">
            <h2 className="font-semibold text-sm uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Difficulty &amp; experience
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {DIFFICULTIES.map((d) => {
                const active = selectedDifficulties.includes(d);
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setSelectedDifficulties((s) => toggle(s, d))}
                    className={`text-xs px-2 py-1 border rounded ${
                      active
                        ? "bg-brand-600 text-white border-brand-600"
                        : "border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                    }`}
                  >
                    {DIFFICULTY_LABEL[d]}
                  </button>
                );
              })}
            </div>
            <div className="flex flex-wrap gap-1.5">
              <BandBtn label="Any band" active={bandFilter === "any"} onClick={() => setBandFilter("any")} />
              {BANDS.map((b) => (
                <BandBtn
                  key={b}
                  label={EXPERIENCE_LABEL[b]}
                  active={bandFilter === b}
                  onClick={() => setBandFilter(b)}
                />
              ))}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Pool: <strong>{pool.length}</strong> matching questions
            </p>
          </section>
        </>
      ) : null}

      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 space-y-3">
        <h2 className="font-semibold text-sm uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Session size
        </h2>
        <label className="text-sm">
          How many:
          <input
            type="number"
            min={1}
            max={50}
            value={count}
            onChange={(e) =>
              setCount(Math.max(1, Math.min(50, Number(e.target.value) || 1)))
            }
            className="ml-2 w-20 px-2 py-1 border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-950"
          />
        </label>
      </section>

      <div className="flex gap-3 items-center">
        <button
          type="button"
          onClick={start}
          className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded text-sm"
        >
          Start session
        </button>
        <ConfirmButton
          onConfirm={clearAll}
          label="Reset all SRS data"
          confirmingLabel="Click again to reset all SRS data"
          destructive
        />
      </div>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: number; accent: string }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3">
      <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">{label}</div>
      <div className={`text-2xl font-semibold ${accent}`}>{value}</div>
    </div>
  );
}

function ModeBtn({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-xs px-2.5 py-1 border rounded ${
        active
          ? "bg-brand-600 text-white border-brand-600"
          : "border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60"
      }`}
    >
      {label}
    </button>
  );
}

function BandBtn({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-xs px-2 py-1 border rounded ${
        active
          ? "bg-brand-600 text-white border-brand-600"
          : "border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60"
      }`}
    >
      {label}
    </button>
  );
}

// ---------------- SESSION ----------------

function SessionView({
  questions,
  categories,
  queue,
  idx,
  revealed,
  setRevealed,
  srsMap,
  onGrade,
  onAbort,
  reviewedCount,
}: {
  questions: Question[];
  categories: Category[];
  queue: string[];
  idx: number;
  revealed: boolean;
  setRevealed: (b: boolean) => void;
  srsMap: ReturnType<typeof useSrs>["map"];
  onGrade: (g: Grade) => void;
  onAbort: () => void;
  reviewedCount: number;
}) {
  const id = queue[idx];
  const q = questions.find((x) => x.id === id);
  const categoryById = useMemo(() => new Map(categories.map((c) => [c.id, c])), [categories]);

  // Keyboard shortcuts: space = reveal; 1..4 = grade
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === " " && !revealed) {
        e.preventDefault();
        setRevealed(true);
        return;
      }
      if (revealed) {
        if (e.key === "1") onGrade("again");
        else if (e.key === "2") onGrade("hard");
        else if (e.key === "3") onGrade("good");
        else if (e.key === "4") onGrade("easy");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [revealed, setRevealed, onGrade]);

  if (!q) {
    return <p>Question not found.</p>;
  }

  const card = srsMap[id];

  return (
    <div className="space-y-4">
      <header className="flex flex-wrap justify-between items-baseline gap-3">
        <h1 className="text-xl font-semibold">
          Practice
          <span className="text-slate-400 dark:text-slate-500 text-sm font-normal ml-2">
            · {idx + 1} of {queue.length} · {reviewedCount} reviewed
          </span>
        </h1>
        <button
          type="button"
          onClick={onAbort}
          className="text-xs px-2 py-1 border border-slate-300 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-800/60"
        >
          End session
        </button>
      </header>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 space-y-3">
        <div className="flex flex-wrap gap-1.5 text-[11px] items-center">
          {q.categoryIds.map((c) => (
            <span
              key={c}
              className="px-2 py-0.5 border rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700"
            >
              {categoryById.get(c)?.shortName ?? c}
            </span>
          ))}
          <span className="px-2 py-0.5 border border-slate-200 dark:border-slate-700 rounded text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800">
            {DIFFICULTY_LABEL[q.difficulty]}
          </span>
          <span className="px-2 py-0.5 border border-slate-200 dark:border-slate-700 rounded text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800">
            {TYPE_LABEL[q.type]}
          </span>
          {card ? (
            <span className="px-2 py-0.5 text-slate-500 dark:text-slate-400">
              reps {card.reps} · ease {card.ease.toFixed(2)} · last interval {card.interval}d
            </span>
          ) : (
            <span className="px-2 py-0.5 text-slate-500 dark:text-slate-400">new</span>
          )}
        </div>

        <div className="text-lg font-medium">{q.prompt}</div>

        {!revealed ? (
          <button
            type="button"
            onClick={() => setRevealed(true)}
            className="px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded text-sm"
          >
            Reveal answer (space)
          </button>
        ) : (
          <div className="border-t border-slate-200 dark:border-slate-800 pt-3 space-y-3">
            <section>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">
                Reference answer
              </h3>
              <MarkdownAnswer>{q.answer}</MarkdownAnswer>
            </section>
            <section>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">
                Listen for
              </h3>
              <ul className="list-disc list-inside text-sm space-y-0.5">
                {q.keyPoints.map((k, i) => (
                  <li key={i}>{k}</li>
                ))}
              </ul>
            </section>
          </div>
        )}
      </div>

      {revealed ? (
        <div className="flex flex-wrap gap-2">
          {GRADES.map((g, i) => (
            <button
              key={g}
              type="button"
              onClick={() => onGrade(g)}
              className={`flex flex-col items-center px-3 py-2 border rounded text-sm ${GRADE_BUTTON[g]}`}
            >
              <span className="font-semibold">
                {GRADE_LABEL[g]}{" "}
                <span className="text-[10px] opacity-60">({i + 1})</span>
              </span>
              <span className="text-[11px] opacity-80">
                next: {previewInterval(card, g)}
              </span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

// ---------------- SUMMARY ----------------

function SummaryView({
  questions,
  reviewed,
  onAgain,
}: {
  questions: Question[];
  reviewed: { id: string; grade: Grade }[];
  onAgain: () => void;
}) {
  const counts = reviewed.reduce<Record<Grade, number>>(
    (acc, r) => {
      acc[r.grade] += 1;
      return acc;
    },
    { again: 0, hard: 0, good: 0, easy: 0 },
  );
  const qById = new Map(questions.map((q) => [q.id, q]));
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Session complete</h1>
      <p className="text-sm text-slate-600 dark:text-slate-300">
        Reviewed {reviewed.length} questions.
      </p>
      <div className="grid sm:grid-cols-4 gap-3 text-sm">
        <Stat label="Again" value={counts.again} accent="text-rose-600 dark:text-rose-300" />
        <Stat label="Hard" value={counts.hard} accent="text-amber-600 dark:text-amber-300" />
        <Stat label="Good" value={counts.good} accent="text-emerald-600 dark:text-emerald-300" />
        <Stat label="Easy" value={counts.easy} accent="text-sky-600 dark:text-sky-300" />
      </div>
      <ul className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
        {reviewed.map((r, i) => {
          const q = qById.get(r.id);
          return (
            <li key={`${r.id}-${i}`} className="p-3 text-sm flex items-baseline gap-3">
              <span className="text-xs text-slate-400 dark:text-slate-500 w-6">{i + 1}.</span>
              <span className="text-xs uppercase tracking-wide w-14">{GRADE_LABEL[r.grade]}</span>
              <span>{q?.prompt ?? r.id}</span>
            </li>
          );
        })}
      </ul>
      <button
        type="button"
        onClick={onAgain}
        className="px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded text-sm"
      >
        New session
      </button>
    </div>
  );
}
