import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import type { Metadata } from "next";
import { PatternsToc } from "@/components/PatternsToc";
import { extractTopLevelHeadings } from "@/lib/toc";

export const metadata: Metadata = {
  title: "Company & region patterns · Interview Prep Hub",
  description:
    "Interview patterns by region (India, Singapore, UAE) and company archetype (FAANG, AI labs, banks, services firms, gov). Cited from public sources.",
};

const DOC_REL = path.join("docs", "COMPANY-PATTERNS.md");

interface Shortcut {
  label: string;
  href: string;
  description: string;
}

const SHORTCUTS: Shortcut[] = [
  { label: "India 🇮🇳", href: "/browse?tag=region-india", description: "RBI / DPDP / NPCI / services-firm + product-co + GCC + AI-startup patterns" },
  { label: "Singapore 🇸🇬", href: "/browse?tag=region-singapore", description: "MAS TRM / FEAT / PDPA / AI Verify / Grab + GovTech + bank + APAC HQ patterns" },
  { label: "UAE 🇦🇪", href: "/browse?tag=region-uae", description: "Sovereign cloud / NESA / DIFC / ADGM / Falcon-Arabic / G42 / Careem / consulting patterns" },
  { label: "Global big-tech", href: "/browse?tag=pattern-faang", description: "Amazon LP + Bar Raiser, Google process, Meta XFN, Microsoft Connect, Netflix Keeper" },
  { label: "GenAI labs", href: "/browse?tag=pattern-genai-lab", description: "OpenAI / Anthropic / DeepMind / GenAI tooling cos; safety + alignment rounds" },
  { label: "Bank / fintech", href: "/browse?tag=pattern-bank-fintech", description: "Idempotency, audit, model risk, MAS / DIFC / RBI / CBUAE constraints" },
  { label: "Services firm", href: "/browse?tag=pattern-services-firm", description: "Case-study presentation, certifications, client-stakeholder behavioral" },
  { label: "Product startup", href: "/browse?tag=pattern-product-startup", description: "Take-home as primary signal, founder rounds, ambiguity, scrappy execution" },
  { label: "Gov / public sector", href: "/browse?tag=pattern-gov-public-sector", description: "Mission-pull behavioral, ownership evidence, sovereign-cloud constraints" },
  { label: "Eng Manager loop", href: "/browse?tag=role-eng-manager", description: "IC→Mgr, hiring, performance, conflict, prioritization, org design" },
  { label: "Staff+ IC loop", href: "/browse?tag=role-staff-ic", description: "Scope, influence-without-authority, architecture review, AI strategy" },
  { label: "Forward-deployed eng", href: "/browse?tag=role-forward-deployed-engineer", description: "Customer-facing GenAI delivery, ambiguity, scrappy prototyping, stakeholder management" },
  { label: "ML engineer", href: "/browse?tag=role-ml-engineer", description: "Training/serving pipelines, fine-tuning, eval harnesses, model lifecycle" },
];

export default function PatternsPage() {
  const docPath = path.join(process.cwd(), DOC_REL);
  const markdown = fs.readFileSync(docPath, "utf-8");
  const toc = extractTopLevelHeadings(markdown);

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">Company &amp; Region Patterns</h1>
        <p className="max-w-3xl text-slate-600 dark:text-slate-300">
          Distilled from public interview-experience write-ups, official career
          pages, regulatory documents, and engineering blogs. Use the shortcut
          buttons to jump into{" "}
          <Link
            href="/browse"
            className="text-brand-600 dark:text-brand-100 underline"
          >
            Browse
          </Link>{" "}
          pre-filtered to the relevant tag, then add difficulty / type / band
          filters from there.
        </p>
      </header>

      <details className="space-y-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <summary className="cursor-pointer select-none px-4 py-3 flex items-center justify-between gap-2 group">
          <span className="inline-flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Shortcuts
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              ({SHORTCUTS.length} pre-filtered views into Browse)
            </span>
          </span>
          <span className="text-slate-500 dark:text-slate-400 text-xs transition-transform group-open:rotate-90" aria-hidden="true">
            ▸
          </span>
        </summary>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 px-4 pb-4">
          {SHORTCUTS.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="block rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 hover:shadow transition"
            >
              <div className="font-semibold text-sm">{s.label}</div>
              <div className="mt-1 text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                {s.description}
              </div>
            </Link>
          ))}
        </div>
      </details>

      <section className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
        <PatternsToc markdown={markdown} toc={toc} />
      </section>
    </div>
  );
}
