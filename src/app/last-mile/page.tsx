import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import type { Metadata } from "next";
import { PatternsToc } from "@/components/PatternsToc";
import { extractTopLevelHeadings } from "@/lib/toc";

export const metadata: Metadata = {
  title: "Last-Mile Delivery EM (UAE) · Interview Prep Hub",
  description:
    "Round-by-round Engineering Manager interview prep for a UAE/MENA last-mile delivery platform (Americana-style QSR logistics): system design, event-driven Kafka, Azure (AKS/APIM/PostgreSQL/Data Lake), AI/ML forecasting, leadership and behavioral.",
};

const DOC_REL = path.join("docs", "AMERICANA-LAST-MILE.md");

interface Round {
  label: string;
  href: string;
  description: string;
}

const ROUNDS: Round[] = [
  {
    label: "1 · Recruiter / HR screen",
    href: "#round-1-recruiter-hr-screen",
    description: "Motivation, comp, visa/relocation, leadership scope, MENA market fit",
  },
  {
    label: "2 · Hiring manager",
    href: "#round-2-hiring-manager",
    description: "Ownership of last-mile platform, org scope, roadmap, stakeholder alignment",
  },
  {
    label: "3 · System design",
    href: "#round-3-system-design",
    description: "Order processing, dispatch/orchestration, Kafka streaming, ETA, scale to 99.99%",
  },
  {
    label: "4 · Coding / technical",
    href: "#round-4-coding-technical-deep-dive",
    description: "Java/Node/Python, distributed-systems primitives, idempotency, dispatch logic",
  },
  {
    label: "5 · Cloud & data architecture",
    href: "#round-5-cloud-data-architecture-azure",
    description: "AKS, APIM, PostgreSQL, Data Lake, event-driven integration, observability",
  },
  {
    label: "6 · AI/ML & MLOps",
    href: "#round-6-aiml-mlops",
    description: "Demand forecasting, ETA models, dynamic routing, model lifecycle governance",
  },
  {
    label: "7 · Engineering leadership",
    href: "#round-7-engineering-management-leadership",
    description: "Hiring, mentoring, agile delivery, KPIs, vendor coordination, conflict",
  },
  {
    label: "8 · Behavioral / STAR",
    href: "#round-8-behavioral-star",
    description: "Failure, ambiguity, incidents, cross-functional partnership, MENA context",
  },
  {
    label: "9 · Executive / bar-raiser",
    href: "#round-9-executive-bar-raiser",
    description: "Business acumen, build-vs-buy, cost, risk, vision for AI-driven optimization",
  },
];

export default function LastMilePage() {
  const docPath = path.join(process.cwd(), DOC_REL);
  const markdown = fs.readFileSync(docPath, "utf-8");
  const toc = extractTopLevelHeadings(markdown);

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">Last-Mile Delivery EM — UAE / MENA</h1>
        <p className="max-w-3xl text-slate-600 dark:text-slate-300">
          A complete, round-by-round Engineering Manager interview guide for a
          UAE/MENA last-mile delivery platform (Americana-style QSR logistics):
          event-driven microservices on Kafka, Azure-native infrastructure
          (AKS, APIM, PostgreSQL, Data Lake, AI/ML), real-time order processing,
          dispatch orchestration, ETA &amp; demand forecasting, and people
          leadership. See{" "}
          <Link href="/patterns" className="text-brand-600 dark:text-brand-100 underline">
            Company &amp; region patterns
          </Link>{" "}
          for UAE-market loop context and{" "}
          <Link href="/leadership" className="text-brand-600 dark:text-brand-100 underline">
            Senior &amp; Leadership
          </Link>{" "}
          for the broader EM question bank.
        </p>
      </header>

      <details className="space-y-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <summary className="cursor-pointer select-none px-4 py-3 flex items-center justify-between gap-2 group">
          <span className="inline-flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Interview rounds
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              ({ROUNDS.length} stages · jump to a round)
            </span>
          </span>
          <span className="text-slate-500 dark:text-slate-400 text-xs transition-transform group-open:rotate-90" aria-hidden="true">
            ▸
          </span>
        </summary>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 px-4 pb-4">
          {ROUNDS.map((r) => (
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

      <div className="grid sm:grid-cols-3 gap-2">
        <Link
          href="#technical-question-bank-rapid-fire-by-jd-topic"
          className="block rounded-lg border border-brand-200 dark:border-brand-100/20 bg-brand-50 dark:bg-brand-100/5 p-4 hover:shadow transition"
        >
          <div className="font-semibold text-sm text-brand-700 dark:text-brand-100">
            ⚡ Technical bank (rapid-fire)
          </div>
          <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">
            44 quick-drill Q&amp;A across Kafka, distributed systems, microservices/API,
            Java/Node/Python, Azure, AI/ML, observability and the last-mile domain.
          </div>
        </Link>
        <Link
          href="#more-technical-questions-deeper-staff-level"
          className="block rounded-lg border border-brand-200 dark:border-brand-100/20 bg-brand-50 dark:bg-brand-100/5 p-4 hover:shadow transition"
        >
          <div className="font-semibold text-sm text-brand-700 dark:text-brand-100">
            🧠 Deeper / staff-level
          </div>
          <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">
            10 harder questions: exactly-once to Postgres, hot partitions, zero-downtime
            migrations, active-active regions, chaos testing.
          </div>
        </Link>
        <Link
          href="#scenario-based-questions-situational-troubleshooting"
          className="block rounded-lg border border-brand-200 dark:border-brand-100/20 bg-brand-50 dark:bg-brand-100/5 p-4 hover:shadow transition"
        >
          <div className="font-semibold text-sm text-brand-700 dark:text-brand-100">
            🎯 Scenario-based
          </div>
          <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">
            14 &quot;what would you do&quot; incident, scaling, data/ML, integration,
            DR and cost scenarios — with structured approaches and red flags.
          </div>
        </Link>
      </div>

      <section className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
        <PatternsToc markdown={markdown} toc={toc} />
      </section>
    </div>
  );
}
