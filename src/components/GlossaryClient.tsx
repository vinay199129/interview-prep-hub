"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Category, CategoryId, GlossaryTerm } from "@/lib/types";

interface QuestionRef {
  id: string;
  title: string;
  categoryIds: CategoryId[];
}

interface Props {
  terms: GlossaryTerm[];
  categories: Category[];
  questions: QuestionRef[];
}

export function GlossaryClient({ terms, categories, questions }: Props) {
  const [search, setSearch] = useState("");
  const [activeCats, setActiveCats] = useState<Set<CategoryId>>(new Set());

  const categoryById = useMemo(
    () => new Map(categories.map((c) => [c.id, c])),
    [categories],
  );
  const termById = useMemo(() => new Map(terms.map((t) => [t.id, t])), [terms]);

  const usedCats = useMemo(() => {
    const ids = new Set<CategoryId>();
    for (const t of terms) for (const c of t.categoryIds) ids.add(c);
    return categories.filter((c) => ids.has(c.id));
  }, [terms, categories]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return terms.filter((t) => {
      if (activeCats.size && !t.categoryIds.some((c) => activeCats.has(c))) {
        return false;
      }
      if (!q) return true;
      const haystack = [
        t.term,
        t.definition,
        ...(t.aliases ?? []),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [terms, search, activeCats]);

  function toggleCat(id: CategoryId) {
    setActiveCats((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function clearAll() {
    setSearch("");
    setActiveCats(new Set());
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
        <input
          type="search"
          placeholder="Search terms, aliases, definitions…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-3 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
        <div className="text-xs text-slate-500 dark:text-slate-400">
          {filtered.length} of {terms.length} terms
          {(search || activeCats.size > 0) && (
            <button
              type="button"
              onClick={clearAll}
              className="ml-2 underline hover:text-brand-600 dark:hover:text-brand-100"
            >
              clear
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {usedCats.map((c) => {
          const active = activeCats.has(c.id);
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => toggleCat(c.id)}
              className={
                "text-xs px-2 py-1 rounded-full border transition-colors " +
                (active
                  ? "bg-brand-600 text-white border-brand-600"
                  : "bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-brand-500")
              }
            >
              {c.shortName}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          No terms match. Try clearing filters.
        </p>
      ) : (
        <ul className="space-y-3">
          {filtered.map((t) => {
            const linkedQs = questions
              .filter((q) =>
                q.categoryIds.some((c) => t.categoryIds.includes(c)),
              )
              .slice(0, 5);
            return (
              <li
                key={t.id}
                id={`term-${t.id}`}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 scroll-mt-20"
              >
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h2 className="font-semibold text-base">{t.term}</h2>
                  {t.aliases?.map((a) => (
                    <span
                      key={a}
                      className="text-[10px] uppercase tracking-wide text-slate-500 dark:text-slate-400"
                    >
                      aka {a}
                    </span>
                  ))}
                  <div className="flex flex-wrap gap-1 ml-auto">
                    {t.categoryIds.map((cid) => {
                      const c = categoryById.get(cid);
                      if (!c) return null;
                      return (
                        <span
                          key={cid}
                          className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                        >
                          {c.shortName}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 mt-2 leading-relaxed">
                  {t.definition}
                </p>
                {t.related && t.related.length > 0 && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                    Related:{" "}
                    {t.related.map((r, i) => {
                      const rt = termById.get(r);
                      const label = rt?.term ?? r;
                      return (
                        <span key={r}>
                          {i > 0 && ", "}
                          {rt ? (
                            <a
                              href={`#term-${r}`}
                              className="text-brand-600 dark:text-brand-100 hover:underline"
                            >
                              {label}
                            </a>
                          ) : (
                            label
                          )}
                        </span>
                      );
                    })}
                  </p>
                )}
                {t.references && t.references.length > 0 && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    References:{" "}
                    {t.references.map((r, i) => (
                      <span key={r.url}>
                        {i > 0 && ", "}
                        <a
                          href={r.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-brand-600 dark:text-brand-100 hover:underline"
                        >
                          {r.title}
                        </a>
                      </span>
                    ))}
                  </p>
                )}
                {linkedQs.length > 0 && (
                  <details className="mt-3 text-xs">
                    <summary className="cursor-pointer text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-100">
                      {linkedQs.length} related question
                      {linkedQs.length === 1 ? "" : "s"}
                    </summary>
                    <ul className="mt-2 space-y-1 pl-4 list-disc text-slate-700 dark:text-slate-300">
                      {linkedQs.map((q) => (
                        <li key={q.id}>
                          <Link
                            href={`/questions/${q.id}/`}
                            className="hover:text-brand-600 dark:hover:text-brand-100 hover:underline"
                          >
                            {q.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
