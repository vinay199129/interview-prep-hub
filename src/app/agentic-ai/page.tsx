import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import type { Metadata } from "next";
import { PatternsToc } from "@/components/PatternsToc";
import { extractTopLevelHeadings } from "@/lib/toc";

export const metadata: Metadata = {
  title: "Agentic AI Solution Architect · Interview Prep Hub",
  description:
    "Round-by-round interview prep for a senior Agentic AI / Enterprise AI Solution Architect role: agent design patterns, use-case discovery, LLM evaluation & selection, AI security and Responsible AI, guardrails, integration architecture, technical governance, AgentOps — plus a curated external reading list and 4-week study plan.",
};

const DOC_REL = path.join("docs", "AGENTIC-AI-SOLUTION-ARCHITECT.md");

interface Item {
  label: string;
  href: string;
  description: string;
}

const ROUNDS: Item[] = [
  {
    label: "0 · The JD, decoded",
    href: "#the-jd-decoded-what-each-line-is-really-testing",
    description:
      "Every JD line mapped to what the interviewer is actually probing and where it lands in the loop",
  },
  {
    label: "1 · Recruiter / HR screen",
    href: "#round-1-recruiter-hr-screen",
    description:
      "Architect-level 90-second story, production-vs-pilot GenAI ratio, why agentic AI now, comp & notice",
  },
  {
    label: "2 · Hiring manager",
    href: "#round-2-hiring-manager-scope-ownership-architecture-altitude",
    description:
      "Blast-radius scope, governing teams you don't manage, and the autonomy ladder for deciding *not* to build an agent",
  },
  {
    label: "3 · Use-case discovery",
    href: "#round-3-ai-use-case-discovery-requirement-analysis",
    description:
      "8-step discovery, value hypothesis, data reality check, portfolio prioritisation, business ask → NFR table",
  },
  {
    label: "4 · Agent design patterns",
    href: "#round-4-agent-design-patterns-autonomous-multi-agent",
    description:
      "ReAct, plan-execute, reflection, routing, supervisor, hand-off, debate — with failure modes, loop control and memory",
  },
  {
    label: "5 · System design cases",
    href: "#round-5-agentic-system-design-cases",
    description:
      "5 cases: acting support agent, document/claims pipeline, cross-system automation, regulated copilot, quality-regression triage",
  },
  {
    label: "6 · LLM evaluation & selection",
    href: "#round-6-llm-evaluation-model-selection",
    description:
      "6-step selection method, cost per completed task, 4-layer evaluation strategy, fine-tune vs RAG vs prompting",
  },
  {
    label: "7 · AI security & Responsible AI",
    href: "#round-7-ai-security-responsible-ai-risk-management",
    description:
      "Full AI threat model (direct/indirect injection, excessive agency, insecure output handling), RAI commitments, portfolio risk tiering",
  },
  {
    label: "8 · Guardrails",
    href: "#round-8-guardrails-design-implementation",
    description:
      "Six placement layers, enforcement outside the model, fail-open vs fail-closed, tuning false positives",
  },
  {
    label: "9 · Integration architecture",
    href: "#round-9-integration-architecture",
    description:
      "Tool registry & anti-corruption layer, delegated identity, data-platform paths, NL2SQL safety, third-party AI services",
  },
  {
    label: "10 · Technical governance",
    href: "#round-10-technical-governance-standards-architecture-practice",
    description:
      "Inventory & intake, tiered review, standards as artefacts, paved road, automated conformance, governance metrics",
  },
  {
    label: "11 · Scale, cost & AgentOps",
    href: "#round-11-scale-performance-cost-agentops",
    description:
      "Latency budgets, model routing, caching, cost per task, tracing, continuous eval, shadow→canary release, incident response",
  },
  {
    label: "12 · Stakeholder & behavioral",
    href: "#round-12-stakeholder-management-behavioral-star",
    description:
      "STAR answers: saying no to an exec, resolving security disagreements, a failure post-mortem, explaining agents to the business",
  },
  {
    label: "13 · Executive / bar-raiser",
    href: "#round-13-executive-bar-raiser",
    description:
      "90-day plan, build vs buy, where agentic AI is genuine vs hype, justifying platform spend to a CFO",
  },
];

const QUICK_LINKS: Item[] = [
  {
    label: "📚 Learn it properly — external reading",
    href: "#learn-it-properly-external-reading-study-path",
    description:
      "Curated primary sources: agent & RAG papers, Anthropic/OpenAI/Google/Microsoft practitioner guides, MCP & A2A specs, OWASP/NIST/ISO/EU AI Act, evaluation & observability tooling, courses — plus a 4-week study plan.",
  },
  {
    label: "🧭 Tech & skills map",
    href: "#technology-skills-map-jd-requirement-stack-your-evidence",
    description:
      "Each JD requirement ↔ what you must be able to design ↔ the stack to name ↔ the evidence to prepare from your own work.",
  },
  {
    label: "⚡ Technical bank (rapid-fire)",
    href: "#technical-question-bank-rapid-fire-by-topic",
    description:
      "Quick-drill Q&A across agentic fundamentals, RAG & retrieval, models & evaluation, security, governance, platform & operations.",
  },
  {
    label: "🧠 Deeper / staff-level",
    href: "#deeper-staff-level-questions",
    description:
      "10 harder questions: resumable runtimes, multi-tenant isolation, provider outages, platform migration, model deprecation, trajectory evaluation.",
  },
  {
    label: "🎯 Scenario-based",
    href: "#scenario-based-questions-situational-troubleshooting",
    description:
      "\"What would you do\" incidents: duplicate refunds, cross-tenant leakage, audit requests, cost spikes, removing human approval, injection via PDF.",
  },
  {
    label: "🌍 Real-world case studies",
    href: "#real-world-case-studies-to-reference",
    description:
      "Documented systems and guidance to cite: Anthropic, OpenAI, Google ADK, Azure AI Foundry, Klarna, Copilot, enterprise search — each with its trade-off.",
  },
];

export default function AgenticAiPage() {
  const docPath = path.join(process.cwd(), DOC_REL);
  const markdown = fs.readFileSync(docPath, "utf-8");
  const toc = extractTopLevelHeadings(markdown);

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">
          Agentic AI Solution Architect — 12+ years
        </h1>
        <p className="max-w-3xl text-slate-600 dark:text-slate-300">
          A complete, round-by-round guide for a senior/principal{" "}
          <strong>Solution Architect — Agentic AI</strong> loop: agent design
          patterns (autonomous &amp; multi-agent), AI use-case discovery and
          requirement analysis, LLM evaluation and selection, AI security,
          Responsible AI and risk, guardrail architecture, enterprise
          integration, technical governance, and stakeholder management. Every
          section is written as a spoken answer with the failure modes and
          trade-offs an interviewer probes for. Pair it with{" "}
          <Link href="/skills-prep" className="text-brand-600 dark:text-brand-100 underline">
            Résumé skills mastery
          </Link>{" "}
          and{" "}
          <Link href="/leadership" className="text-brand-600 dark:text-brand-100 underline">
            Senior &amp; Leadership
          </Link>
          .
        </p>
        <p className="max-w-3xl text-sm text-slate-500 dark:text-slate-400">
          Learning externally?{" "}
          <Link
            href="#learn-it-properly-external-reading-study-path"
            className="text-brand-600 dark:text-brand-100 underline"
          >
            Jump to the curated external reading list &amp; 4-week study plan
          </Link>{" "}
          — papers, protocol specs, vendor guidance, security &amp; regulatory
          standards, evaluation tooling and courses, all linked to primary
          sources.
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
          <span
            className="text-slate-500 dark:text-slate-400 text-xs transition-transform group-open:rotate-90"
            aria-hidden="true"
          >
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

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {QUICK_LINKS.map((q) => (
          <Link
            key={q.href}
            href={q.href}
            className="block rounded-lg border border-brand-200 dark:border-brand-100/20 bg-brand-50 dark:bg-brand-100/5 p-4 hover:shadow transition"
          >
            <div className="font-semibold text-sm text-brand-700 dark:text-brand-100">
              {q.label}
            </div>
            <div className="mt-1 text-xs text-slate-600 dark:text-slate-300 line-clamp-3">
              {q.description}
            </div>
          </Link>
        ))}
      </div>

      <section className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
        <PatternsToc markdown={markdown} toc={toc} />
      </section>
    </div>
  );
}
