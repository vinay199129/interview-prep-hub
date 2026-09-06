import Link from "next/link";
import { getAllQuestions, getDomains, getTracks } from "@/lib/data";
import { accentBg, accentText } from "@/lib/accents";
import { ProgressStats } from "@/components/ProgressStats";

/**
 * Three ways in. Everything else on the site is reachable from one of these, so
 * the landing page never has to list every route.
 */
const STARTING_POINTS = [
  {
    href: "/browse",
    title: "I want to study a subject",
    body: "Open the full question bank and filter by domain, difficulty, experience band and question type. Mark what you know as you go.",
    cta: "Browse questions",
  },
  {
    href: "/roles",
    title: "I have an interview for a specific role",
    body: "Start from a job description. Role focuses map a real JD onto curated questions, timeboxed revision lanes and the glossary terms you will be expected to use.",
    cta: "Pick a role focus",
  },
  {
    href: "/interview",
    title: "I am running the interview",
    body: "Assemble a balanced panel set, share deep-linked questions with your co-interviewers, and score against the nine-point evaluation rubric.",
    cta: "Build an interview",
  },
];

export default function Home() {
  const domains = getDomains();
  const questions = getAllQuestions();
  const tracks = getTracks();

  return (
    <div className="space-y-10">
      <section className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">Interview Prep Hub</h1>
        <p className="max-w-3xl text-slate-600 dark:text-slate-300">
          {questions.length} curated interview questions across AI engineering,
          agents, production systems, software &amp; cloud, and leadership — each
          with a model answer, the key points an interviewer listens for, follow-ups
          and red flags. Grouped into {domains.length} domains so you always know
          where you are.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Start here</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {STARTING_POINTS.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group flex flex-col rounded-lg border border-slate-200 bg-white p-5 transition hover:border-brand-400 hover:shadow dark:border-slate-800 dark:bg-slate-900"
            >
              <h3 className="font-semibold">{s.title}</h3>
              <p className="mt-2 flex-1 text-sm text-slate-600 dark:text-slate-300">
                {s.body}
              </p>
              <span className="mt-3 text-sm font-medium text-brand-600 group-hover:underline dark:text-brand-100">
                {s.cta} →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">The five domains</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Each domain groups a handful of related categories. A question that
              genuinely spans two domains appears in both.
            </p>
          </div>
          <Link
            href="/browse"
            className="shrink-0 text-sm text-brand-600 hover:underline dark:text-brand-100"
          >
            Browse everything
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {domains.map((d) => {
            const domainQs = questions.filter((q) =>
              q.categoryIds.some((c) => d.categoryIds.includes(c)),
            );
            return (
              <Link
                key={d.id}
                href={`/domains/${d.id}`}
                className={`block rounded-lg border p-5 transition hover:shadow ${accentBg[d.accent] ?? ""}`}
              >
                <div
                  className={`text-xs font-semibold uppercase tracking-wide ${accentText[d.accent] ?? ""}`}
                >
                  {d.tagline}
                </div>
                <h3 className="mt-1 font-semibold">{d.name}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  {d.description}
                </p>
                <div className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                  {domainQs.length} questions · {d.categoryIds.length} categories
                </div>
                <ProgressStats
                  questionIds={domainQs.map((q) => q.id)}
                  variant="compact"
                  className="mt-2"
                />
              </Link>
            );
          })}
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">Or follow a track</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Tracks cut across domains to match a job title rather than a
              subject — useful when you want an ordered plan instead of a list.
            </p>
          </div>
          <Link
            href="/tracks"
            className="shrink-0 text-sm text-brand-600 hover:underline dark:text-brand-100"
          >
            All {tracks.length} tracks
          </Link>
        </div>
        <ul className="flex flex-wrap gap-2">
          {tracks.map((track) => {
            const count = questions.filter((q) =>
              q.categoryIds.some((id) => track.categoryIds.includes(id)),
            ).length;
            return (
              <li key={track.id}>
                <Link
                  href={`/tracks/${track.id}`}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1.5 text-sm transition hover:border-brand-400 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-900 dark:hover:text-brand-100"
                >
                  {track.name}
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {count}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="mb-2 font-semibold">Going deeper</h2>
        <ul className="list-inside list-disc space-y-1 text-sm text-slate-700 dark:text-slate-300">
          <li>
            <Link href="/study-guide" className="text-brand-600 underline dark:text-brand-100">
              Study method and readiness
            </Link>{" "}
            — revision schedules, timed drills and a final-interview checklist.
          </li>
          <li>
            <Link href="/leadership" className="text-brand-600 underline dark:text-brand-100">
              Senior &amp; leadership
            </Link>{" "}
            — behavioural, EM and Staff+ loops, with STAR story scaffolding.
          </li>
          <li>
            <Link href="/patterns" className="text-brand-600 underline dark:text-brand-100">
              Company &amp; region patterns
            </Link>{" "}
            — what a FAANG loop probes versus a bank, a services firm or a GenAI lab.
          </li>
          <li>
            <Link href="/agentic-ai" className="text-brand-600 underline dark:text-brand-100">
              Long-form guides
            </Link>{" "}
            — agentic AI architecture, airline &amp; aviation prep, skills gap-closing,
            and the{" "}
            <Link href="/last-mile" className="text-brand-600 underline dark:text-brand-100">
              last-mile delivery EM guide
            </Link>{" "}
            for UAE / MENA logistics roles.
          </li>
          <li>
            <Link href="/practice" className="text-brand-600 underline dark:text-brand-100">
              Flashcards
            </Link>{" "}
            and the{" "}
            <Link href="/criteria" className="text-brand-600 underline dark:text-brand-100">
              nine-point evaluation rubric
            </Link>{" "}
            for testing yourself and scoring others.
          </li>
        </ul>
      </section>
    </div>
  );
}
