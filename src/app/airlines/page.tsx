import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import type { Metadata } from "next";
import { PatternsToc } from "@/components/PatternsToc";
import { extractTopLevelHeadings } from "@/lib/toc";

export const metadata: Metadata = {
  title: "Emirates Group Solutions Architect · Interview Prep Hub",
  description:
    "Round-by-round Solutions Architect interview prep for Emirates Group IT (Dubai): SAFe Agile Release Trains, architecture runway, ADRs, PSS/Skywards/SkyCargo system design, Azure hybrid cloud, AI/ML for aviation, and executive/behavioral rounds.",
};

const DOC_REL = path.join("docs", "EMIRATES-SOLUTIONS-ARCHITECT.md");

interface Round {
  label: string;
  href: string;
  description: string;
}

const ROUNDS: Round[] = [
  {
    label: "1 · Recruiter / HR screen",
    href: "#round-1-recruiter-hr-screen",
    description: "Fit, motivation, UAE relocation & tax-free comp framing",
  },
  {
    label: "2 · Hiring manager",
    href: "#round-2-hiring-manager-architecture-scope-fit",
    description: "ART/portfolio-scale ownership, governance without authority, resolving architecture conflicts",
  },
  {
    label: "3 · System design",
    href: "#round-3-system-design-aviationlogistics-domain",
    description: "5 cases: PSS/reservations, Skywards loyalty, SkyCargo/ULD tracking, IRROPS rebooking, multi-region residency",
  },
  {
    label: "4 · Coding / technical",
    href: "#round-4-coding-technical-deep-dive",
    description: "Idempotent consumers, API versioning, circuit breakers, concurrency, ledger modelling",
  },
  {
    label: "5 · Cloud & data architecture",
    href: "#round-5-cloud-data-architecture-azure-hybrid",
    description: "AKS, APIM, Data Lake/governance, Azure+AWS hybrid reality, Well-Architected review",
  },
  {
    label: "5B · Full-stack reference architecture",
    href: "#round-5b-full-stack-reference-architecture-edge-database",
    description: "Component-by-component walkthrough edge→database for a booking flow, with trade-offs and multi-region notes",
  },
  {
    label: "6 · AI/ML for aviation",
    href: "#round-6-aiml-mlops-aviation-specific",
    description: "Dynamic pricing, predictive maintenance, cargo/customs document intelligence, GenAI guardrails",
  },
  {
    label: "7 · Architecture leadership",
    href: "#round-7-architecture-leadership-arts-runway-governance",
    description: "Architecture runway, ADR discipline, technical debt, vendor PoC governance, cross-ART consistency",
  },
  {
    label: "8 · Behavioral / STAR",
    href: "#round-8-behavioral-star",
    description: "Ambiguity, rejected recommendations, mentorship, conflicting priorities, incident ownership",
  },
  {
    label: "9 · Executive / bar-raiser",
    href: "#round-9-executive-bar-raiser",
    description: "First 90 days, build vs buy, defending cost to a CFO, where GenAI genuinely changes airline ops",
  },
];

export default function AirlinesPage() {
  const docPath = path.join(process.cwd(), DOC_REL);
  const markdown = fs.readFileSync(docPath, "utf-8");
  const toc = extractTopLevelHeadings(markdown);

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">Emirates Group — Solutions Architect (Dubai, UAE)</h1>
        <p className="max-w-3xl text-slate-600 dark:text-slate-300">
          A complete, round-by-round Solutions Architect interview guide for{" "}
          <strong>Emirates Group IT</strong>: SAFe Agile Release Trains and
          architecture runway, ADR/governance discipline, aviation-domain
          system design (PSS/reservations, Emirates Skywards loyalty,
          SkyCargo/OneCargo-style logistics), Azure-hybrid cloud architecture,
          AI/ML for aviation, and the executive/behavioral rounds. See{" "}
          <Link href="/patterns" className="text-brand-600 dark:text-brand-100 underline">
            Company &amp; region patterns
          </Link>{" "}
          for UAE-market loop context and{" "}
          <Link href="/leadership" className="text-brand-600 dark:text-brand-100 underline">
            Senior &amp; Leadership
          </Link>{" "}
          for the broader staff-plus/architect question bank.
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

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
        <Link
          href="#technology-skills-map-jd-stack-emirates-landscape-your-resume"
          className="block rounded-lg border border-brand-200 dark:border-brand-100/20 bg-brand-50 dark:bg-brand-100/5 p-4 hover:shadow transition"
        >
          <div className="font-semibold text-sm text-brand-700 dark:text-brand-100">
            🧭 Tech &amp; skills map
          </div>
          <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">
            JD stack ↔ Emirates landscape ↔ your resume evidence, with explicit
            gaps to close before the loop.
          </div>
        </Link>
        <Link
          href="#technical-question-bank-rapid-fire-by-topic"
          className="block rounded-lg border border-brand-200 dark:border-brand-100/20 bg-brand-50 dark:bg-brand-100/5 p-4 hover:shadow transition"
        >
          <div className="font-semibold text-sm text-brand-700 dark:text-brand-100">
            ⚡ Technical bank (rapid-fire)
          </div>
          <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">
            Quick-drill Q&amp;A across PSS/reservations, loyalty/event-driven,
            cargo/logistics, Azure cloud, and SAFe/governance.
          </div>
        </Link>
        <Link
          href="#deeper-staff-level-questions"
          className="block rounded-lg border border-brand-200 dark:border-brand-100/20 bg-brand-50 dark:bg-brand-100/5 p-4 hover:shadow transition"
        >
          <div className="font-semibold text-sm text-brand-700 dark:text-brand-100">
            🧠 Deeper / staff-level
          </div>
          <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">
            Zero-downtime PSS migration, cross-ART cost allocation, retrofitting
            governance, active-active with a single-write-region PSS.
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
            &quot;What would you do&quot; incident, compliance, cost, and
            governance scenarios — with the architectural fix, not just the fix.
          </div>
        </Link>
        <Link
          href="#real-world-case-studies-how-airlines-partners-actually-solve-this"
          className="block rounded-lg border border-brand-200 dark:border-brand-100/20 bg-brand-50 dark:bg-brand-100/5 p-4 hover:shadow transition"
        >
          <div className="font-semibold text-sm text-brand-700 dark:text-brand-100">
            🌍 Real-world case studies
          </div>
          <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">
            Emirates + Azure, SkyCargo OneCargo (IBS Software), Amadeus Altéa,
            and how other carriers modernize IRROPS &amp; distribution.
          </div>
        </Link>
      </div>

      <section className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
        <PatternsToc markdown={markdown} toc={toc} />
      </section>
    </div>
  );
}
