"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { QuestionCard } from "./QuestionCard";
import { applyFilters, EMPTY_FILTERS, uniqueTopics, type Filters } from "@/lib/filters";
import {
  DIFFICULTY_LABEL,
  EXPERIENCE_LABEL,
  TYPE_LABEL,
  type Category,
  type CategoryId,
  type Difficulty,
  type ExperienceBand,
  type Question,
  type QuestionType,
} from "@/lib/types";
import {
  STATUS_DOT,
  STATUS_LABEL,
  useProgress,
  type Status,
  type StatusFilter,
} from "@/lib/progress";
import { ShortcutsHelp } from "./ShortcutsHelp";
import { ConfirmButton } from "./ConfirmButton";

const BROWSE_SHORTCUTS = [
  { keys: "J / K", action: "Next / previous question" },
  { keys: "R", action: "Reveal / hide answer" },
  { keys: "1", action: "Mark Got it" },
  { keys: "2", action: "Mark Review later" },
  { keys: "3", action: "Mark Didn't know" },
  { keys: "?", action: "Show this help" },
];

const SHORTCUT_STATUS: Record<string, Status> = {
  "1": "known",
  "2": "review",
  "3": "unknown",
};

function isTypingTarget(el: EventTarget | null): boolean {
  if (!(el instanceof HTMLElement)) return false;
  const tag = el.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || el.isContentEditable;
}

interface Props {
  categories: Category[];
  questions: Question[];
  initialCategory?: CategoryId;
  initialCategories?: CategoryId[];
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

export function BrowseClient({
  categories,
  questions,
  initialCategory,
  initialCategories,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialBaseCategories =
    initialCategories ?? (initialCategory ? [initialCategory] : []);
  const validCategoryIds = useMemo(
    () => new Set(categories.map((c) => c.id)),
    [categories],
  );
  const validTopics = useMemo(() => new Set(uniqueTopics(questions)), [questions]);

  const initialFilters = useMemo<Filters>(() => {
    const csv = (key: string) =>
      (searchParams.get(key) ?? "").split(",").map((s) => s.trim()).filter(Boolean);
    // accept ?cat= (canonical) or ?cats= (legacy alias used by some shortcut links)
    const catRaw = csv("cat").length ? csv("cat") : csv("cats");
    const cats = catRaw.filter((c) => validCategoryIds.has(c as CategoryId)) as CategoryId[];
    return {
      categories: cats.length ? cats : initialBaseCategories,
      topics: csv("topic").filter((t) => validTopics.has(t)),
      difficulties: csv("diff").filter((d) => (DIFFS as string[]).includes(d)) as Difficulty[],
      experienceBands: csv("band").filter((b) => (BANDS as string[]).includes(b)) as ExperienceBand[],
      types: csv("type").filter((t) => (TYPES as string[]).includes(t)) as QuestionType[],
      tags: csv("tag"),
      search: searchParams.get("q") ?? "",
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const initialStatus = (() => {
    const s = searchParams.get("status");
    if (s === "unseen" || s === "known" || s === "review" || s === "unknown") return s as StatusFilter;
    return "all" as StatusFilter;
  })();

  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [topicQuery, setTopicQuery] = useState("");
  const [revealAll, setRevealAll] = useState(false);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>(initialStatus);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});
  const [showShortcuts, setShowShortcuts] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { map: progressMap, setStatus, clearAll } = useProgress();

  // Sync filters → URL (replace, no history spam)
  const firstSync = useRef(true);
  useEffect(() => {
    if (firstSync.current) {
      firstSync.current = false;
      return;
    }
    const params = new URLSearchParams();
    if (filters.categories.length) params.set("cat", filters.categories.join(","));
    if (filters.topics.length) params.set("topic", filters.topics.join(","));
    if (filters.difficulties.length) params.set("diff", filters.difficulties.join(","));
    if (filters.experienceBands.length) params.set("band", filters.experienceBands.join(","));
    if (filters.types.length) params.set("type", filters.types.join(","));
    if (filters.tags.length) params.set("tag", filters.tags.join(","));
    if (filters.search.trim()) params.set("q", filters.search.trim());
    if (statusFilter !== "all") params.set("status", statusFilter);
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [filters, statusFilter, pathname, router]);

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

  const visibleQuestions = useMemo(() => {
    if (statusFilter === "all") return filtered;
    if (statusFilter === "unseen") return filtered.filter((q) => !progressMap[q.id]);
    return filtered.filter((q) => progressMap[q.id] === statusFilter);
  }, [filtered, statusFilter, progressMap]);

  const progressCounts = useMemo(() => {
    const ids = filtered.map((q) => q.id);
    let known = 0,
      review = 0,
      unknown = 0;
    for (const id of ids) {
      const s = progressMap[id];
      if (s === "known") known++;
      else if (s === "review") review++;
      else if (s === "unknown") unknown++;
    }
    return { known, review, unknown, unseen: filtered.length - known - review - unknown };
  }, [filtered, progressMap]);

  // Reset focus when the visible list changes
  useEffect(() => {
    if (focusedIndex >= visibleQuestions.length) {
      setFocusedIndex(visibleQuestions.length > 0 ? 0 : 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleQuestions.length]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (isTypingTarget(e.target)) return;
      const total = visibleQuestions.length;
      if (total === 0) return;

      const key = e.key.toLowerCase();
      if (key === "j") {
        e.preventDefault();
        setFocusedIndex((i) => Math.min(total - 1, i + 1));
      } else if (key === "k") {
        e.preventDefault();
        setFocusedIndex((i) => Math.max(0, i - 1));
      } else if (key === "r") {
        e.preventDefault();
        const id = visibleQuestions[focusedIndex]?.id;
        if (id) setRevealedIds((prev) => ({ ...prev, [id]: !prev[id] }));
      } else if (key === "?") {
        e.preventDefault();
        setShowShortcuts(true);
      } else if (SHORTCUT_STATUS[e.key]) {
        e.preventDefault();
        const q = visibleQuestions[focusedIndex];
        if (q) {
          const next = SHORTCUT_STATUS[e.key];
          setStatus(q.id, progressMap[q.id] === next ? null : next);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visibleQuestions, focusedIndex, setStatus, progressMap]);

  // Scroll focused card into view
  useEffect(() => {
    const el = cardRefs.current[focusedIndex];
    if (el) {
      el.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [focusedIndex]);

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

        <FilterGroup label="Status">
          {([
            ["all", "All"],
            ["unseen", "Unseen"],
            ["known", STATUS_LABEL.known],
            ["review", STATUS_LABEL.review],
            ["unknown", STATUS_LABEL.unknown],
          ] as [StatusFilter, string][]).map(([value, label]) => (
            <label key={value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="status-filter"
                checked={statusFilter === value}
                onChange={() => setStatusFilter(value)}
                className="h-3.5 w-3.5"
              />
              <span className="flex items-center gap-1.5">
                {value === "known" || value === "review" || value === "unknown" ? (
                  <span className={`inline-block w-2 h-2 rounded-full ${STATUS_DOT[value as Status]}`} />
                ) : null}
                {label}
              </span>
            </label>
          ))}
          <ConfirmButton
            onConfirm={clearAll}
            label="Clear my progress"
            confirmingLabel="Click again to clear"
            destructive
            className="mt-2 self-start"
          />
        </FilterGroup>

        <FilterGroup label="Category" defaultOpen={filters.categories.length > 0} count={filters.categories.length}>
          {categories.map((c) => (
            <Check
              key={c.id}
              label={c.shortName}
              checked={filters.categories.includes(c.id)}
              onChange={() =>
                setFilters({
                  ...filters,
                  categories: toggle(filters.categories, c.id),
                })
              }
            />
          ))}
        </FilterGroup>

        <FilterGroup label="Experience band" count={filters.experienceBands.length}>
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

        <FilterGroup label="Difficulty" count={filters.difficulties.length}>
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

        <FilterGroup label="Question type" count={filters.types.length}>
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

        <FilterGroup label="Topic" defaultOpen={filters.topics.length > 0} count={filters.topics.length}>
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
        {filters.tags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <span className="text-slate-500 dark:text-slate-400">Filtered by tag:</span>
            {filters.tags.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() =>
                  setFilters((f) => ({ ...f, tags: f.tags.filter((x) => x !== t) }))
                }
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-brand-300 dark:border-brand-700 bg-brand-50 dark:bg-brand-900/30 text-brand-800 dark:text-brand-100 hover:bg-brand-100 dark:hover:bg-brand-900/50"
                aria-label={`Remove tag filter: ${t}`}
              >
                {t}
                <span aria-hidden="true">×</span>
              </button>
            ))}
          </div>
        )}
        <div className="sticky top-0 bg-slate-50 dark:bg-slate-950 py-1 z-[1] flex items-center justify-between gap-3">
          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 flex-wrap">
            <span>
              Showing <strong>{visibleQuestions.length}</strong> of {filtered.length}{" "}
              filtered ({questions.length} total)
            </span>
            <span className="inline-flex items-center gap-1" title={`${progressCounts.known} got it`}>
              <span className={`inline-block w-1.5 h-1.5 rounded-full ${STATUS_DOT.known}`} />
              {progressCounts.known}
            </span>
            <span className="inline-flex items-center gap-1" title={`${progressCounts.review} to review`}>
              <span className={`inline-block w-1.5 h-1.5 rounded-full ${STATUS_DOT.review}`} />
              {progressCounts.review}
            </span>
            <span className="inline-flex items-center gap-1" title={`${progressCounts.unknown} didn't know`}>
              <span className={`inline-block w-1.5 h-1.5 rounded-full ${STATUS_DOT.unknown}`} />
              {progressCounts.unknown}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowShortcuts(true)}
              className="text-[11px] px-2 py-1 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400"
              title="Keyboard shortcuts"
              aria-label="Keyboard shortcuts"
            >
              ?
            </button>
            <button
              type="button"
              onClick={() => setRevealAll((r) => !r)}
              className="text-xs px-2.5 py-1 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
              title={revealAll ? "Hide all answers (self-test mode)" : "Reveal all answers"}
            >
              {revealAll ? "Hide all answers" : "Reveal all answers"}
            </button>
          </div>
        </div>
        {visibleQuestions.length === 0 ? (
          <div className="text-sm text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded p-6 text-center">
            No questions match these filters.
          </div>
        ) : (
          visibleQuestions.map((q, i) => (
            <QuestionCard
              key={q.id}
              q={q}
              categories={categories}
              defaultOpen={revealAll || !!revealedIds[q.id]}
              isFocused={i === focusedIndex}
              cardRef={(el) => {
                cardRefs.current[i] = el;
              }}
            />
          ))
        )}
      </section>
      <ShortcutsHelp
        open={showShortcuts}
        onClose={() => setShowShortcuts(false)}
        shortcuts={BROWSE_SHORTCUTS}
      />
    </div>
  );
}

function FilterGroup({
  label,
  children,
  defaultOpen = true,
  count,
}: {
  label: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  count?: number;
}) {
  return (
    <details open={defaultOpen} className="group">
      <summary className="cursor-pointer list-none flex items-center justify-between text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1 select-none">
        <span className="inline-flex items-center gap-1">
          <span className="transition-transform group-open:rotate-90" aria-hidden="true">
            ▸
          </span>
          {label}
          {typeof count === "number" && count > 0 ? (
            <span className="ml-1 inline-flex items-center justify-center min-w-4 h-4 px-1 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-100 text-[10px]">
              {count}
            </span>
          ) : null}
        </span>
      </summary>
      <div className="space-y-1 pt-1">{children}</div>
    </details>
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
