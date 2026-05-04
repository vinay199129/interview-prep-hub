"use client";

import { useEffect, useMemo, useState } from "react";
import { useProfile } from "@/lib/profile";
import {
  DIFFICULTY_LABEL,
  EXPERIENCE_LABEL,
  TYPE_LABEL,
  type Category,
  type Difficulty,
  type EvaluationCriterion,
  type ExperienceBand,
  type Question,
  type Track,
} from "@/lib/types";
import { MarkdownAnswer } from "./MarkdownAnswer";
import {
  MARK_BUTTON,
  MARK_BUTTON_ACTIVE,
  MARK_DOT,
  MARK_LABEL,
  RECOMMENDATION_LABEL,
  emptySession,
  useInterview,
  type CriterionScore,
  type QuestionMark,
  type Recommendation,
} from "@/lib/interview";

const ALL_MARKS: QuestionMark[] = ["strong", "partial", "weak", "skip"];
const DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard", "expert"];
const BANDS: ExperienceBand[] = ["junior", "mid", "senior", "lead"];
const RECS: Recommendation[] = [
  "strong-hire",
  "hire",
  "lean-hire",
  "lean-no-hire",
  "no-hire",
];

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function emptyCriterion(): CriterionScore {
  return { rating: 0, comment: "" };
}

export function InterviewClient({
  questions,
  categories,
  tracks,
  criteria,
}: {
  questions: Question[];
  categories: Category[];
  tracks: Track[];
  criteria: EvaluationCriterion[];
}) {
  const { session, update, reset } = useInterview();
  const categoryById = useMemo(
    () => new Map(categories.map((c) => [c.id, c])),
    [categories],
  );
  const questionById = useMemo(
    () => new Map(questions.map((q) => [q.id, q])),
    [questions],
  );

  if (session.phase === "session") {
    return (
      <SessionView
        session={session}
        update={update}
        questions={questions}
        categoryById={categoryById}
      />
    );
  }
  if (session.phase === "scoresheet") {
    return (
      <Scoresheet
        session={session}
        update={update}
        reset={reset}
        criteria={criteria}
        questionById={questionById}
        categoryById={categoryById}
      />
    );
  }
  return (
    <Setup
      session={session}
      update={update}
      questions={questions}
      categories={categories}
      tracks={tracks}
    />
  );
}

// ---------------- SETUP ----------------

function Setup({
  session,
  update,
  questions,
  categories,
  tracks,
}: {
  session: ReturnType<typeof useInterview>["session"];
  update: ReturnType<typeof useInterview>["update"];
  questions: Question[];
  categories: Category[];
  tracks: Track[];
}) {
  const { profile, ready: profileReady } = useProfile();
  const [candidateName, setCandidateName] = useState(session.candidateName);
  const [interviewerName, setInterviewerName] = useState(session.interviewerName);
  const [trackId, setTrackId] = useState(session.trackId);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<Difficulty[]>([
    "medium",
    "hard",
  ]);
  const [band, setBand] = useState<ExperienceBand>("senior");
  const [count, setCount] = useState(8);
  const [pickMode, setPickMode] = useState<"random" | "first">("random");

  // Pre-fill from profile on first load if Setup fields are still at defaults.
  useEffect(() => {
    if (!profileReady) return;
    if (!candidateName && profile.name) setCandidateName(profile.name);
    if (profile.experienceBand) setBand(profile.experienceBand);
    if (!trackId && profile.targetTrackIds && profile.targetTrackIds.length > 0) {
      setTrackId(profile.targetTrackIds[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileReady]);

  const selectedTrack = tracks.find((t) => t.id === trackId);
  const effectiveCategories =
    selectedCategories.length > 0
      ? selectedCategories
      : selectedTrack
        ? selectedTrack.categoryIds
        : categories.map((c) => c.id);

  const pool = useMemo(() => {
    return questions.filter(
      (q) =>
        q.categoryIds.some((c) => effectiveCategories.includes(c)) &&
        selectedDifficulties.includes(q.difficulty) &&
        q.experienceBands.includes(band),
    );
  }, [questions, effectiveCategories, selectedDifficulties, band]);

  const start = () => {
    if (pool.length === 0) return;
    const picks = (pickMode === "random" ? shuffle(pool) : pool).slice(0, count);
    update({
      ...emptySession(),
      candidateName: candidateName.trim(),
      interviewerName: interviewerName.trim(),
      trackId,
      questionIds: picks.map((q) => q.id),
      currentIndex: 0,
      startedAt: new Date().toISOString(),
      phase: "session",
    });
  };

  const toggle = <T extends string>(arr: T[], v: T): T[] =>
    arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Interviewer mode</h1>
        <p className="text-slate-600 dark:text-slate-300 mt-1 text-sm">
          Build a session, step through questions with marks and notes, then
          fill in the scoresheet. Everything stays in your browser.
        </p>
      </div>

      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 space-y-3">
        <h2 className="font-semibold text-sm uppercase tracking-wide text-slate-500 dark:text-slate-400">
          People
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <label className="text-sm">
            <span className="block mb-1 text-slate-700 dark:text-slate-300">Candidate name</span>
            <input
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-950"
              placeholder="e.g. Alex Doe"
            />
          </label>
          <label className="text-sm">
            <span className="block mb-1 text-slate-700 dark:text-slate-300">Interviewer name (optional)</span>
            <input
              value={interviewerName}
              onChange={(e) => setInterviewerName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-950"
              placeholder="you"
            />
          </label>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 space-y-3">
        <h2 className="font-semibold text-sm uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Track (optional)
        </h2>
        <select
          value={trackId}
          onChange={(e) => setTrackId(e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-950 text-sm"
        >
          <option value="">— No track (use category filter) —</option>
          {tracks.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
        {selectedTrack ? (
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {selectedTrack.description}
          </p>
        ) : null}
      </section>

      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 space-y-3">
        <h2 className="font-semibold text-sm uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Categories {selectedCategories.length > 0 ? `(${selectedCategories.length} chosen)` : "(all)"}
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
          {BANDS.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setBand(b)}
              className={`text-xs px-2 py-1 border rounded ${
                band === b
                  ? "bg-brand-600 text-white border-brand-600"
                  : "border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60"
              }`}
            >
              {EXPERIENCE_LABEL[b]}
            </button>
          ))}
        </div>
      </section>

      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 space-y-3">
        <h2 className="font-semibold text-sm uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Question count &amp; pick
        </h2>
        <div className="flex flex-wrap gap-3 items-center text-sm">
          <label>
            How many:
            <input
              type="number"
              min={1}
              max={50}
              value={count}
              onChange={(e) => setCount(Math.max(1, Math.min(50, Number(e.target.value) || 1)))}
              className="ml-2 w-20 px-2 py-1 border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-950"
            />
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              checked={pickMode === "random"}
              onChange={() => setPickMode("random")}
            />
            random
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              checked={pickMode === "first"}
              onChange={() => setPickMode("first")}
            />
            first N
          </label>
          <span className="text-slate-500 dark:text-slate-400">
            Pool: <strong>{pool.length}</strong> matching questions
          </span>
        </div>
      </section>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={start}
          disabled={pool.length === 0 || candidateName.trim() === ""}
          className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Start session ({Math.min(count, pool.length)} questions)
        </button>
        {candidateName.trim() === "" ? (
          <span className="text-xs text-slate-500 dark:text-slate-400 self-center">
            Enter a candidate name to start.
          </span>
        ) : null}
      </div>
    </div>
  );
}

// ---------------- SESSION ----------------

function SessionView({
  session,
  update,
  questions,
  categoryById,
}: {
  session: ReturnType<typeof useInterview>["session"];
  update: ReturnType<typeof useInterview>["update"];
  questions: Question[];
  categoryById: Map<string, Category>;
}) {
  const [showAnswer, setShowAnswer] = useState(false);
  const idx = session.currentIndex;
  const total = session.questionIds.length;
  const id = session.questionIds[idx];
  const q = questions.find((x) => x.id === id);

  if (!q) {
    return (
      <div className="space-y-3">
        <p>Session has no current question.</p>
        <button
          type="button"
          onClick={() => update({ phase: "scoresheet" })}
          className="px-3 py-1.5 bg-brand-600 text-white rounded text-sm"
        >
          Go to scoresheet
        </button>
      </div>
    );
  }

  const goto = (i: number) => {
    setShowAnswer(false);
    update({ currentIndex: Math.max(0, Math.min(total - 1, i)) });
  };

  const setMark = (m: QuestionMark) => {
    const next = { ...session.marks };
    if (next[id] === m) delete next[id];
    else next[id] = m;
    update({ marks: next });
  };

  const setNote = (text: string) => {
    update({ notes: { ...session.notes, [id]: text } });
  };

  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-baseline gap-3 justify-between">
        <div>
          <h1 className="text-xl font-semibold">
            {session.candidateName || "Candidate"}{" "}
            <span className="text-slate-400 dark:text-slate-500 text-sm font-normal">
              · question {idx + 1} of {total}
            </span>
          </h1>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => update({ phase: "setup" })}
            className="text-xs px-2 py-1 border border-slate-300 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-800/60"
          >
            ← Setup
          </button>
          <button
            type="button"
            onClick={() => update({ phase: "scoresheet" })}
            className="text-xs px-2 py-1 bg-brand-600 hover:bg-brand-700 text-white rounded"
          >
            Finish → Scoresheet
          </button>
        </div>
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
          <span className="px-2 py-0.5 text-slate-500 dark:text-slate-400">
            ~{q.estimatedTimeMin} min
          </span>
        </div>
        <div className="text-lg font-medium">{q.prompt}</div>

        <div className="flex flex-wrap gap-1.5">
          {ALL_MARKS.map((m) => {
            const active = session.marks[id] === m;
            return (
              <button
                key={m}
                type="button"
                onClick={() => setMark(m)}
                className={`text-xs px-2.5 py-1 border rounded ${
                  active ? MARK_BUTTON_ACTIVE[m] : MARK_BUTTON[m]
                }`}
              >
                {MARK_LABEL[m]}
              </button>
            );
          })}
        </div>

        <textarea
          value={session.notes[id] ?? ""}
          onChange={(e) => setNote(e.target.value)}
          rows={4}
          placeholder="Notes — what they said, gaps, follow-ups asked…"
          className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-950"
        />

        <button
          type="button"
          onClick={() => setShowAnswer((s) => !s)}
          className="text-sm text-brand-700 dark:text-brand-200 underline"
        >
          {showAnswer ? "Hide reference answer ▲" : "Show reference answer ▼"}
        </button>

        {showAnswer ? (
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
                  Red flags
                </h3>
                <ul className="list-disc list-inside text-sm space-y-0.5 text-rose-900 dark:text-rose-200">
                  {q.redFlags.map((k, i) => (
                    <li key={i}>{k}</li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>
        ) : null}
      </div>

      <nav className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => goto(idx - 1)}
          disabled={idx === 0}
          className="px-3 py-1.5 border border-slate-300 dark:border-slate-700 rounded text-sm disabled:opacity-50"
        >
          ← Prev
        </button>
        <div className="flex flex-wrap gap-1 justify-center">
          {session.questionIds.map((qid, i) => {
            const m = session.marks[qid];
            return (
              <button
                key={qid}
                type="button"
                onClick={() => goto(i)}
                className={`w-7 h-7 text-xs border rounded flex items-center justify-center ${
                  i === idx
                    ? "border-brand-500 ring-2 ring-brand-500/30"
                    : "border-slate-300 dark:border-slate-700"
                }`}
                title={`Q${i + 1}${m ? ` · ${MARK_LABEL[m]}` : ""}`}
              >
                <span
                  className={`inline-block w-2 h-2 rounded-full ${
                    m ? MARK_DOT[m] : "bg-slate-300 dark:bg-slate-600"
                  }`}
                />
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => goto(idx + 1)}
          disabled={idx === total - 1}
          className="px-3 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded text-sm disabled:opacity-50"
        >
          Next →
        </button>
      </nav>
    </div>
  );
}

// ---------------- SCORESHEET ----------------

function Scoresheet({
  session,
  update,
  reset,
  criteria,
  questionById,
  categoryById,
}: {
  session: ReturnType<typeof useInterview>["session"];
  update: ReturnType<typeof useInterview>["update"];
  reset: ReturnType<typeof useInterview>["reset"];
  criteria: EvaluationCriterion[];
  questionById: Map<string, Question>;
  categoryById: Map<string, Category>;
}) {
  const setCriterion = (id: number, patch: Partial<CriterionScore>) => {
    const prev = session.criteria[id] ?? emptyCriterion();
    update({
      criteria: { ...session.criteria, [id]: { ...prev, ...patch } },
    });
  };

  const counts = ALL_MARKS.reduce<Record<QuestionMark, number>>(
    (acc, m) => {
      acc[m] = 0;
      return acc;
    },
    { strong: 0, partial: 0, weak: 0, skip: 0 },
  );
  for (const id of session.questionIds) {
    const m = session.marks[id];
    if (m) counts[m] += 1;
  }
  const unmarked = session.questionIds.length - (counts.strong + counts.partial + counts.weak + counts.skip);

  const markdown = useMemo(
    () => buildMarkdown(session, criteria, questionById, categoryById),
    [session, criteria, questionById, categoryById],
  );

  const copyMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap justify-between items-baseline gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Scoresheet</h1>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {session.candidateName || "Candidate"}{" "}
            {session.interviewerName ? `· interviewer ${session.interviewerName} ` : ""}·{" "}
            {session.questionIds.length} questions
            {session.startedAt ? ` · started ${new Date(session.startedAt).toLocaleString()}` : ""}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => update({ phase: "session" })}
            className="text-xs px-2 py-1 border border-slate-300 dark:border-slate-700 rounded hover:bg-slate-50 dark:hover:bg-slate-800/60"
          >
            ← Back to session
          </button>
          <button
            type="button"
            onClick={copyMarkdown}
            className="text-xs px-2 py-1 bg-brand-600 hover:bg-brand-700 text-white rounded"
          >
            Copy as Markdown
          </button>
          <button
            type="button"
            onClick={() => {
              if (confirm("Discard this session and start over?")) reset();
            }}
            className="text-xs px-2 py-1 border border-rose-300 dark:border-rose-700 text-rose-700 dark:text-rose-300 rounded hover:bg-rose-50 dark:hover:bg-rose-950/40"
          >
            Reset
          </button>
        </div>
      </header>

      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
        <h2 className="font-semibold text-sm uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
          Question summary
        </h2>
        <div className="flex flex-wrap gap-3 text-sm mb-3">
          {ALL_MARKS.map((m) => (
            <span key={m} className="flex items-center gap-1.5">
              <span className={`inline-block w-2.5 h-2.5 rounded-full ${MARK_DOT[m]}`} />
              {MARK_LABEL[m]}: <strong>{counts[m]}</strong>
            </span>
          ))}
          {unmarked > 0 ? (
            <span className="text-slate-500 dark:text-slate-400">
              Unmarked: <strong>{unmarked}</strong>
            </span>
          ) : null}
        </div>
        <ul className="divide-y divide-slate-200 dark:divide-slate-800">
          {session.questionIds.map((id, i) => {
            const q = questionById.get(id);
            const m = session.marks[id];
            const note = session.notes[id] ?? "";
            return (
              <li key={id} className="py-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 dark:text-slate-500 w-6">
                    {i + 1}.
                  </span>
                  <span
                    className={`inline-block w-2 h-2 rounded-full ${
                      m ? MARK_DOT[m] : "bg-slate-300 dark:bg-slate-600"
                    }`}
                  />
                  <span className="font-medium">{q?.prompt ?? id}</span>
                </div>
                {note ? (
                  <p className="ml-8 text-slate-600 dark:text-slate-300 whitespace-pre-wrap text-[13px]">
                    {note}
                  </p>
                ) : null}
              </li>
            );
          })}
        </ul>
      </section>

      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 space-y-4">
        <h2 className="font-semibold text-sm uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Evaluation criteria
        </h2>
        {criteria.map((c) => {
          const score = session.criteria[c.id] ?? emptyCriterion();
          return (
            <div
              key={c.id}
              className="border border-slate-200 dark:border-slate-800 rounded p-3 space-y-2"
            >
              <div className="flex items-baseline gap-3">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 w-6">
                  {String(c.id).padStart(2, "0")}
                </span>
                <h3 className="font-semibold">{c.title}</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">{c.description}</p>
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-slate-500 dark:text-slate-400 mr-1">Rating:</span>
                {[1, 2, 3, 4, 5].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() =>
                      setCriterion(c.id, {
                        rating: (score.rating === r ? 0 : r) as CriterionScore["rating"],
                      })
                    }
                    className={`w-8 h-8 text-xs border rounded ${
                      score.rating === r
                        ? "bg-brand-600 text-white border-brand-600"
                        : "border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                    }`}
                  >
                    {r}
                  </button>
                ))}
                {score.rating > 0 ? (
                  <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">
                    1 = weak · 5 = strong
                  </span>
                ) : null}
              </div>
              <textarea
                value={score.comment}
                onChange={(e) => setCriterion(c.id, { comment: e.target.value })}
                rows={2}
                placeholder="What was good, what was weak, growth areas…"
                className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-950"
              />
            </div>
          );
        })}
      </section>

      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 space-y-3">
        <h2 className="font-semibold text-sm uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Recommendation
        </h2>
        <select
          value={session.recommendation}
          onChange={(e) =>
            update({ recommendation: e.target.value as Recommendation })
          }
          className="px-3 py-2 border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-950 text-sm"
        >
          <option value="">— select —</option>
          {RECS.map((r) => (
            <option key={r} value={r}>
              {RECOMMENDATION_LABEL[r]}
            </option>
          ))}
        </select>
        <textarea
          value={session.summary}
          onChange={(e) => update({ summary: e.target.value })}
          rows={4}
          placeholder="Overall summary, fit for the role, recommended next steps…"
          className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-950"
        />
      </section>

      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
        <h2 className="font-semibold text-sm uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
          Markdown export preview
        </h2>
        <pre className="text-xs whitespace-pre-wrap bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded p-3 max-h-80 overflow-auto">
{markdown}
        </pre>
      </section>
    </div>
  );
}

// ---------------- helpers ----------------

function buildMarkdown(
  session: ReturnType<typeof useInterview>["session"],
  criteria: EvaluationCriterion[],
  questionById: Map<string, Question>,
  categoryById: Map<string, Category>,
): string {
  const lines: string[] = [];
  lines.push(`# Interview scoresheet — ${session.candidateName || "Candidate"}`);
  if (session.interviewerName) lines.push(`Interviewer: ${session.interviewerName}`);
  if (session.startedAt)
    lines.push(`Date: ${new Date(session.startedAt).toLocaleString()}`);
  lines.push("");

  lines.push(`## Recommendation`);
  lines.push(
    `**${RECOMMENDATION_LABEL[session.recommendation] || "— not set —"}**`,
  );
  if (session.summary) {
    lines.push("");
    lines.push(session.summary);
  }
  lines.push("");

  lines.push(`## Evaluation criteria`);
  for (const c of criteria) {
    const s = session.criteria[c.id];
    const r = s && s.rating > 0 ? `${s.rating}/5` : "—";
    lines.push(`### ${String(c.id).padStart(2, "0")}. ${c.title} — ${r}`);
    if (s?.comment) lines.push(s.comment);
    lines.push("");
  }

  lines.push(`## Questions`);
  session.questionIds.forEach((id, i) => {
    const q = questionById.get(id);
    if (!q) return;
    const m = session.marks[id];
    const cats = q.categoryIds
      .map((c) => categoryById.get(c)?.shortName ?? c)
      .join(", ");
    lines.push(
      `### ${i + 1}. [${m ? MARK_LABEL[m] : "Unmarked"}] ${q.prompt}`,
    );
    lines.push(`*${cats} · ${q.difficulty} · ${q.type}*`);
    const note = session.notes[id];
    if (note) {
      lines.push("");
      lines.push(note);
    }
    lines.push("");
  });

  return lines.join("\n");
}
