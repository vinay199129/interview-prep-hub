import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import type { Metadata } from "next";
import { PatternsToc } from "@/components/PatternsToc";
import { extractTopLevelHeadings } from "@/lib/toc";

export const metadata: Metadata = {
  title: "Résumé skills mastery (L100→L200) · Interview Prep Hub",
  description:
    "A personal, résumé-driven study guide: every skill and technology on the CV (Azure, GenAI/RAG/agents, engineering, reliability, ML foundations, certifications) with L100 fundamentals and L200 intermediate interview Q&A tied to real projects.",
};

const DOC_REL = path.join("docs", "RESUME-SKILLS-PREP.md");

interface Group {
  label: string;
  href: string;
  description: string;
}

const GROUPS: Group[] = [
  {
    label: "🏛️ Architecture & Design",
    href: "#architecture-design",
    description: "Enterprise Azure architecture, cloud-native/serverless, AI platform design, event-driven & distributed systems, integration, Well-Architected, NFRs.",
  },
  {
    label: "☁️ Azure & Cloud Platform",
    href: "#azure-cloud-platform",
    description: "Azure OpenAI, AI Foundry, AI Search, ML, Functions, Logic Apps, Data Factory, Service Bus, IoT Hub, ADX/Kusto, Graph Data Connect, Entra ID, Purview, Service Fabric.",
  },
  {
    label: "🤖 AI & GenAI",
    href: "#ai-genai",
    description: "RAG, multi-agent, LangGraph, CrewAI, Semantic Kernel, LangChain, Agent Framework, Copilot Studio, M365 SDK, AI evaluation, prompt orchestration, Responsible AI, PyTorch, HF.",
  },
  {
    label: "🛠️ Engineering",
    href: "#engineering",
    description: "Python (FastAPI/Flask), C#/.NET, ASP.NET, REST, microservices, React, Angular, Docker, Kubernetes, Azure DevOps, CI/CD, Terraform.",
  },
  {
    label: "📈 Reliability & Operations",
    href: "#reliability-operations",
    description: "SLA/SLO/SLI & error budgets, incident management, telemetry-based monitoring, observability, Datadog, Azure Monitor / Kusto.",
  },
  {
    label: "🧠 ML Foundations",
    href: "#ml-foundations-mtech-aiml-topics",
    description: "Deep neural networks, mathematical foundations for ML, training/fine-tuning/evaluation (PEFT/LoRA) — the M.Tech AIML core.",
  },
  {
    label: "🎓 Certifications",
    href: "#certifications-exam-ready-refreshers",
    description: "AZ-305/204/104/400, AI-102, SC-900, AZ/AI-900, GitHub Copilot, AB-730/731/100 — exam-ready refreshers and what each proves.",
  },
];

export default function SkillsPrepPage() {
  const docPath = path.join(process.cwd(), DOC_REL);
  const markdown = fs.readFileSync(docPath, "utf-8");
  const toc = extractTopLevelHeadings(markdown);

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">Résumé skills mastery — L100 → L200</h1>
        <p className="max-w-3xl text-slate-600 dark:text-slate-300">
          A personal, résumé-driven study section: every skill and technology on
          the CV, each with <strong>L100 fundamentals</strong> and{" "}
          <strong>L200 intermediate</strong> interview Q&amp;A, plus a
          &quot;résumé hook&quot; tying it to a real project so answers feel
          authentic. Built so you can confidently field 100- to 200-level
          questions on anything you list. See{" "}
          <Link href="/last-mile" className="text-brand-600 dark:text-brand-100 underline">
            the Last-Mile EM guide
          </Link>{" "}
          for a full round-by-round loop and{" "}
          <Link href="/leadership" className="text-brand-600 dark:text-brand-100 underline">
            Senior &amp; Leadership
          </Link>{" "}
          for the broader question bank.
        </p>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {GROUPS.map((g) => (
          <Link
            key={g.href}
            href={g.href}
            className="block rounded-lg border border-brand-200 dark:border-brand-100/20 bg-brand-50 dark:bg-brand-100/5 p-4 hover:shadow transition"
          >
            <div className="font-semibold text-sm text-brand-700 dark:text-brand-100">
              {g.label}
            </div>
            <div className="mt-1 text-xs text-slate-600 dark:text-slate-300 line-clamp-3">
              {g.description}
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
