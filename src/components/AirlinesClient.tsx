"use client";

import { useState } from "react";
import Link from "next/link";
import { PatternsToc } from "@/components/PatternsToc";
import type { TocItem } from "@/lib/toc";

export interface Round {
  label: string;
  href: string;
  description: string;
}

export interface QuickLink {
  href: string;
  icon: string;
  title: string;
  description: string;
}

export interface Carrier {
  id: string;
  name: string;
  /** Short label used to disambiguate headings in the combined "All carriers" view. */
  shortName?: string;
  tagline: string;
  markdown: string;
  toc: TocItem[];
  rounds: Round[];
  quickLinks: QuickLink[];
}

interface Props {
  carriers: Carrier[];
}

export function AirlinesClient({ carriers }: Props) {
  const [activeId, setActiveId] = useState(carriers[0]?.id);
  const active = carriers.find((c) => c.id === activeId) ?? carriers[0];

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <h1 className="text-2xl font-semibold">
          Airline Solutions Architect — UAE (Dubai &amp; Abu Dhabi)
        </h1>
        <p className="max-w-3xl text-slate-600 dark:text-slate-300">
          Complete, round-by-round Solutions Architect interview guides for the
          major UAE carriers. Pick a carrier to switch the entire guide —
          interview rounds, system-design cases, tech-stack map, and question
          banks are tailored to each airline&apos;s real technology landscape, or
          choose <strong>All carriers</strong> to read everything in one
          unfiltered view. See{" "}
          <Link href="/patterns" className="text-brand-600 dark:text-brand-100 underline">
            Company &amp; region patterns
          </Link>{" "}
          for UAE-market loop context and{" "}
          <Link href="/leadership" className="text-brand-600 dark:text-brand-100 underline">
            Senior &amp; Leadership
          </Link>{" "}
          for the broader staff-plus/architect question bank.
        </p>

        <div
          className="flex flex-wrap gap-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-1 w-fit"
          role="tablist"
          aria-label="Choose a carrier"
        >
          {carriers.map((c) => {
            const selected = c.id === active.id;
            return (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveId(c.id)}
                className={`rounded-md px-4 py-2 text-sm font-semibold transition ${
                  selected
                    ? "bg-brand-600 text-white shadow"
                    : "text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800"
                }`}
              >
                {c.name}
              </button>
            );
          })}
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400">{active.tagline}</p>
      </header>

      <details className="space-y-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <summary className="cursor-pointer select-none px-4 py-3 flex items-center justify-between gap-2 group">
          <span className="inline-flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {active.name} · interview rounds
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              ({active.rounds.length} stages · jump to a round)
            </span>
          </span>
          <span className="text-slate-500 dark:text-slate-400 text-xs transition-transform group-open:rotate-90" aria-hidden="true">
            ▸
          </span>
        </summary>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 px-4 pb-4">
          {active.rounds.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="block rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 hover:shadow transition"
            >
              <div className="font-semibold text-sm">{r.label}</div>
              <div className="mt-1 text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                {r.description}
              </div>
            </Link>
          ))}
        </div>
      </details>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {active.quickLinks.map((q) => (
          <Link
            key={q.href}
            href={q.href}
            className="block rounded-lg border border-brand-200 dark:border-brand-100/20 bg-brand-50 dark:bg-brand-100/5 p-4 hover:shadow transition"
          >
            <div className="font-semibold text-sm text-brand-700 dark:text-brand-100">
              {q.icon} {q.title}
            </div>
            <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">
              {q.description}
            </div>
          </Link>
        ))}
      </div>

      <section className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
        <PatternsToc key={active.id} markdown={active.markdown} toc={active.toc} />
      </section>
    </div>
  );
}
