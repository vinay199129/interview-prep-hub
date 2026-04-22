"use client";

import { useMemo, useState } from "react";
import { QuestionCard } from "./QuestionCard";
import { applyFilters, EMPTY_FILTERS, uniqueTopics } from "@/lib/filters";
import {
  DIFFICULTY_LABEL,
  EXPERIENCE_LABEL,
  TYPE_LABEL,
  type Difficulty,
  type ExperienceBand,
  type Pod,
  type PodId,
  type Question,
  type QuestionType,
} from "@/lib/types";

interface Props {
  pods: Pod[];
  questions: Question[];
  initialPod?: PodId;
}

function toggle<T>(arr: T[], v: T): T[] {
  return arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
}

const DIFFS: Difficulty[] = ["easy", "medium", "hard", "expert"];
const BANDS: ExperienceBand[] = ["junior", "mid", "senior", "lead"];
const TYPES: QuestionType[] = [
  "conceptual",
  "coding",
  "scenario",
  "system-design",
  "debugging",
];

export function BrowseClient({ pods, questions, initialPod }: Props) {
  const [filters, setFilters] = useState({
    ...EMPTY_FILTERS,
    pods: initialPod ? [initialPod] : [],
  });
  const [topicQuery, setTopicQuery] = useState("");

  const topics = useMemo(() => uniqueTopics(questions), [questions]);
  const visibleTopics = useMemo(() => {
    const q = topicQuery.trim().toLowerCase();
    if (!q) return topics;
    return topics.filter((t) => t.toLowerCase().includes(q));
  }, [topics, topicQuery]);
  const filtered = useMemo(
    () => applyFilters(questions, filters),
    [questions, filters],
  );

  return (
    <div className="grid md:grid-cols-[260px_1fr] gap-6 md:h-[calc(100vh-9rem)]">
      <aside className="md:h-full md:overflow-y-auto md:pr-1 space-y-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 text-sm">
        <div>
          <input
            type="search"
            placeholder="Search prompts, tags, key points..."
            value={filters.search}
            onChange={(e) =>
              setFilters({ ...filters, search: e.target.value })
            }
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 rounded-md text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
        </div>

        <FilterGroup label="POD">
          {pods.map((p) => (
            <Check
              key={p.id}
              label={p.shortName}
              checked={filters.pods.includes(p.id)}
              onChange={() =>
                setFilters({ ...filters, pods: toggle(filters.pods, p.id) })
              }
            />
          ))}
        </FilterGroup>

        <FilterGroup label="Experience band">
          {BANDS.map((b) => (
            <Check
              key={b}
              label={EXPERIENCE_LABEL[b]}
              checked={filters.experienceBands.includes(b)}
              onChange={() =>
                setFilters({
                  ...filters,
                  experienceBands: toggle(filters.experienceBands, b),
                })
              }
            />
          ))}
        </FilterGroup>

        <FilterGroup label="Difficulty">
          {DIFFS.map((d) => (
            <Check
              key={d}
              label={DIFFICULTY_LABEL[d]}
              checked={filters.difficulties.includes(d)}
              onChange={() =>
                setFilters({
                  ...filters,
                  difficulties: toggle(filters.difficulties, d),
                })
              }
            />
          ))}
        </FilterGroup>

        <FilterGroup label="Question type">
          {TYPES.map((t) => (
            <Check
              key={t}
              label={TYPE_LABEL[t]}
              checked={filters.types.includes(t)}
              onChange={() =>
                setFilters({ ...filters, types: toggle(filters.types, t) })
              }
            />
          ))}
        </FilterGroup>

        <FilterGroup label="Topic">
          <div className="space-y-2">
            <div className="relative">
              <input
                type="search"
                value={topicQuery}
                onChange={(e) => setTopicQuery(e.target.value)}
                placeholder={`Search ${topics.length} topics...`}
                className="w-full px-2 py-1.5 pr-6 border border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 rounded text-xs placeholder:text-slate-400 dark:placeholder:text-slate-500"
              />
              {topicQuery ? (
                <button
                  type="button"
                  onClick={() => setTopicQuery("")}
                  aria-label="Clear topic search"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm leading-none"
                >
                  ×
                </button>
              ) : null}
            </div>
            {filters.topics.length ? (
              <div className="flex flex-wrap gap-1">
                {filters.topics.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() =>
                      setFilters({
                        ...filters,
                        topics: filters.topics.filter((x) => x !== t),
                      })
                    }
                    className="text-[10px] px-1.5 py-0.5 rounded bg-brand-600 text-white hover:bg-brand-700"
                    title="Remove"
                  >
                    {t} ×
                  </button>
                ))}
              </div>
            ) : null}
            <div className="max-h-44 overflow-y-auto pr-1">
              {visibleTopics.length === 0 ? (
                <div className="text-xs text-slate-400 dark:text-slate-500 italic px-1 py-2">
                  No topics match “{topicQuery}”
                </div>
              ) : (
                visibleTopics.map((t) => (
                  <Check
                    key={t}
                    label={t}
                    checked={filters.topics.includes(t)}
                    onChange={() =>
                      setFilters({
                        ...filters,
                        topics: toggle(filters.topics, t),
                      })
                    }
                  />
                ))
              )}
            </div>
          </div>
        </FilterGroup>

        <button
          type="button"
          onClick={() => setFilters(EMPTY_FILTERS)}
          className="w-full text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 underline"
        >
          Reset filters
        </button>
      </aside>

      <section className="md:h-full md:overflow-y-auto md:pr-2 space-y-3">
        <div className="text-xs text-slate-500 dark:text-slate-400 sticky top-0 bg-slate-50 dark:bg-slate-950 py-1 z-[1]">
          Showing <strong>{filtered.length}</strong> of {questions.length}{" "}
          questions
        </div>
        {filtered.length === 0 ? (
          <div className="text-sm text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded p-6 text-center">
            No questions match these filters.
          </div>
        ) : (
          filtered.map((q) => <QuestionCard key={q.id} q={q} />)
        )}
      </section>
    </div>
  );
}

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset>
      <legend className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">
        {label}
      </legend>
      <div className="space-y-1">{children}</div>
    </fieldset>
  );
}

function Check({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="rounded border-slate-300 dark:border-slate-600 dark:bg-slate-800"
      />
      <span className="text-sm text-slate-700 dark:text-slate-300">{label}</span>
    </label>
  );
}
