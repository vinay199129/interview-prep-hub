import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { AirlinesClient, type Carrier } from "@/components/AirlinesClient";
import { extractTopLevelHeadings } from "@/lib/toc";

export const metadata: Metadata = {
  title: "Emirates, flydubai & Etihad Solutions Architect · Interview Prep Hub",
  description:
    "Round-by-round Solutions Architect interview prep for UAE carriers Emirates Group IT, flydubai and Etihad Airways: SAFe/agile delivery, architecture runway & ADRs, PSS/loyalty/cargo system design, cloud & data architecture, agentic AI and sovereign/air-gapped AI, ancillary/dynamic pricing, and executive/behavioral rounds — per carrier or all in one view.",
};

function loadDoc(relFile: string) {
  const docPath = path.join(process.cwd(), "docs", relFile);
  const markdown = fs.readFileSync(docPath, "utf-8");
  return { markdown, toc: extractTopLevelHeadings(markdown) };
}

const emiratesDoc = loadDoc("EMIRATES-SOLUTIONS-ARCHITECT.md");
const flydubaiDoc = loadDoc("FLYDUBAI-SOLUTIONS-ARCHITECT.md");
const etihadDoc = loadDoc("ETIHAD-SOLUTIONS-ARCHITECT.md");

const CARRIERS: Carrier[] = [
  {
    id: "emirates",
    name: "Emirates Group",
    shortName: "Emirates",
    tagline:
      "Full-service mega-carrier · Amadeus Altéa PSS · Azure + AWS hybrid · SkyCargo/OneCargo · SAFe Agile Release Trains.",
    markdown: emiratesDoc.markdown,
    toc: emiratesDoc.toc,
    rounds: [
      {
        label: "1 · Recruiter / HR screen",
        href: "#round-1-recruiter-hr-screen",
        description: "Fit, motivation, UAE relocation & tax-free comp framing",
      },
      {
        label: "2 · Hiring manager",
        href: "#round-2-hiring-manager-architecture-scope-fit",
        description:
          "ART/portfolio-scale ownership, governance without authority, resolving architecture conflicts",
      },
      {
        label: "3 · System design",
        href: "#round-3-system-design-aviationlogistics-domain",
        description:
          "5 cases: PSS/reservations, Skywards loyalty, SkyCargo/ULD tracking, IRROPS rebooking, multi-region residency",
      },
      {
        label: "4 · Coding / technical",
        href: "#round-4-coding-technical-deep-dive",
        description:
          "Idempotent consumers, API versioning, circuit breakers, concurrency, ledger modelling",
      },
      {
        label: "5 · Cloud & data architecture",
        href: "#round-5-cloud-data-architecture-azure-hybrid",
        description:
          "AKS, APIM, Data Lake/governance, Azure+AWS hybrid reality, Well-Architected review",
      },
      {
        label: "5B · Full-stack reference architecture",
        href: "#round-5b-full-stack-reference-architecture-edge-database",
        description:
          "Component-by-component walkthrough edge→database for a booking flow, with trade-offs and multi-region notes",
      },
      {
        label: "6 · AI/ML for aviation",
        href: "#round-6-aiml-mlops-aviation-specific",
        description:
          "Dynamic pricing, predictive maintenance, cargo/customs document intelligence, GenAI guardrails",
      },
      {
        label: "6B · Agentic AI, LLM & MCP depth",
        href: "#round-6b-agentic-ai-llm-mcp-engineering-depth",
        description:
          "Agents & multi-agent, orchestration frameworks, RAG/vector search, MCP, guardrails, evals & observability, LLMOps, Python/FastAPI, cost",
      },
      {
        label: "6C · Sovereign & air-gapped AI",
        href: "#round-6c-sovereign-air-gapped-ai-government-entity-constraints",
        description:
          "Government-entity constraints: residency vs sovereignty vs no-vendor-inference, deployment tiers, proving nothing leaves, local open-weight models, sovereign use cases",
      },
      {
        label: "7 · Architecture leadership",
        href: "#round-7-architecture-leadership-arts-runway-governance",
        description:
          "Architecture runway, ADR discipline, technical debt, vendor PoC governance, cross-ART consistency",
      },
      {
        label: "8 · Behavioral / STAR",
        href: "#round-8-behavioral-star",
        description:
          "Ambiguity, rejected recommendations, mentorship, conflicting priorities, incident ownership",
      },
      {
        label: "9 · Executive / bar-raiser",
        href: "#round-9-executive-bar-raiser",
        description:
          "First 90 days, build vs buy, defending cost to a CFO, where GenAI genuinely changes airline ops",
      },
    ],
    quickLinks: [
      {
        href: "#round-6b-agentic-ai-llm-mcp-engineering-depth",
        icon: "🤖",
        title: "Agentic AI / LLM depth",
        description:
          "The GenAI skills bar, aviation-contextualised: agents, LangGraph/Semantic Kernel, RAG & vector stores, MCP, guardrails, evals, LLMOps, FastAPI, cost.",
      },
      {
        href: "#round-6c-sovereign-air-gapped-ai-government-entity-constraints",
        icon: "🛡️",
        title: "Sovereign & air-gapped AI",
        description:
          "When nothing may leave the org: mandate decomposition, deployment tiers, five layers of no-egress proof, local open-weight models, and sovereign use cases by risk tier.",
      },
      {
        href: "#interview-strategy-negotiation-playbook",
        icon: "♟️",
        title: "Strategy & negotiation playbook",
        description:
          "5-phase game plan: anchor the grade, principal-level case twists, bridge the Java/Kafka stack, war stories, and the offer close — all in your voice.",
      },
      {
        href: "#technology-skills-map-jd-stack-emirates-landscape-your-resume",
        icon: "🧭",
        title: "Tech & skills map",
        description:
          "JD stack ↔ Emirates landscape ↔ your resume evidence, with explicit gaps to close before the loop.",
      },
      {
        href: "#technical-question-bank-rapid-fire-by-topic",
        icon: "⚡",
        title: "Technical bank (rapid-fire)",
        description:
          "Quick-drill Q&A across PSS/reservations, loyalty/event-driven, cargo/logistics, Azure cloud, and SAFe/governance.",
      },
      {
        href: "#deeper-staff-level-questions",
        icon: "🧠",
        title: "Deeper / staff-level",
        description:
          "Zero-downtime PSS migration, cross-ART cost allocation, retrofitting governance, active-active with a single-write-region PSS.",
      },
      {
        href: "#scenario-based-questions-situational-troubleshooting",
        icon: "🎯",
        title: "Scenario-based",
        description:
          "\"What would you do\" incident, compliance, cost, and governance scenarios — with the architectural fix, not just the fix.",
      },
      {
        href: "#real-world-case-studies-how-airlines-partners-actually-solve-this",
        icon: "🌍",
        title: "Real-world case studies",
        description:
          "Emirates + Azure, SkyCargo OneCargo (IBS Software), Amadeus Altéa, and how carriers modernize IRROPS & distribution.",
      },
    ],
  },
  {
    id: "flydubai",
    name: "flydubai",
    shortName: "flydubai",
    tagline:
      "Low-cost carrier · Sabre SabreSonic PSS · Azure cloud-first · OPEN→Emirates Skywards loyalty · ancillary & dynamic pricing.",
    markdown: flydubaiDoc.markdown,
    toc: flydubaiDoc.toc,
    rounds: [
      {
        label: "1 · Recruiter / HR screen",
        href: "#round-1-recruiter-hr-screen",
        description: "Fit, why an LCC, UAE relocation & tax-free comp framing",
      },
      {
        label: "2 · Hiring manager",
        href: "#round-2-hiring-manager-architecture-scope-fit",
        description:
          "Platform-scale ownership, lightweight governance for a lean org, resolving architecture conflicts",
      },
      {
        label: "3 · System design",
        href: "#round-3-system-design-lcc-aviation-domain",
        description:
          "6 cases: SabreSonic booking/ancillary, OPEN↔Skywards loyalty, Emirates codeshare integration, IRROPS, dynamic pricing, residency",
      },
      {
        label: "4 · Coding / technical",
        href: "#round-4-coding-technical-deep-dive",
        description:
          "Idempotent consumers, API versioning, circuit breakers, concurrency, cost-aware caching",
      },
      {
        label: "5 · Cloud & data architecture",
        href: "#round-5-cloud-data-architecture-azure-first",
        description:
          "AKS/Container Apps, APIM, data platform, cost-per-transaction discipline, Well-Architected review",
      },
      {
        label: "5B · Full-stack reference architecture",
        href: "#round-5b-full-stack-reference-architecture-edge-database",
        description:
          "Component-by-component edge→database for a booking + ancillary flow, with PCI-DSS payment isolation",
      },
      {
        label: "6 · AI/ML for aviation",
        href: "#round-6-aiml-mlops-aviation-lcc-specific",
        description:
          "Dynamic pricing & ancillary optimisation, next-best-offer, disruption GenAI, 737 predictive maintenance",
      },
      {
        label: "6B · Agentic AI, LLM & MCP depth",
        href: "#round-6b-agentic-ai-llm-mcp-engineering-depth",
        description:
          "Agents & multi-agent, orchestration frameworks, RAG/vector search, MCP, guardrails, evals, LLMOps, FastAPI, cost-per-contact",
      },
      {
        label: "6C · Sovereign & air-gapped AI",
        href: "#round-6c-sovereign-air-gapped-ai-government-entity-constraints",
        description:
          "Government-owned-entity constraints: residency vs sovereignty vs no-vendor-inference, deployment tiers, proving nothing leaves, local models, sovereign use cases",
      },
      {
        label: "7 · Architecture leadership",
        href: "#round-7-architecture-leadership-agile-runway-governance",
        description:
          "Architecture runway, ADR discipline, tech debt vs velocity, vendor PoC governance, lean consistency",
      },
      {
        label: "8 · Behavioral / STAR",
        href: "#round-8-behavioral-star",
        description:
          "Ambiguity, rejected recommendations, mentorship, conflicting priorities, cost-cutting without hurting reliability",
      },
      {
        label: "9 · Executive / bar-raiser",
        href: "#round-9-executive-bar-raiser",
        description:
          "First 90 days, build vs buy, defending cost to a CFO, where GenAI changes LCC ops",
      },
    ],
    quickLinks: [
      {
        href: "#round-6b-agentic-ai-llm-mcp-engineering-depth",
        icon: "🤖",
        title: "Agentic AI / LLM depth",
        description:
          "The GenAI skills bar for a lean LCC: agents, orchestration frameworks, RAG & vector stores, MCP, guardrails, evals, LLMOps, FastAPI, cost per contact.",
      },
      {
        href: "#round-6c-sovereign-air-gapped-ai-government-entity-constraints",
        icon: "🛡️",
        title: "Sovereign & air-gapped AI",
        description:
          "Government-owned-entity constraints: mandate decomposition, deployment tiers, five layers of no-egress proof, local open-weight models, sovereign use cases.",
      },
      {
        href: "#technology-skills-map-jd-stack-flydubai-landscape-your-resume",
        icon: "🧭",
        title: "Tech & skills map",
        description:
          "JD stack ↔ flydubai landscape ↔ your resume evidence, with explicit gaps to close before the loop.",
      },
      {
        href: "#technical-question-bank-rapid-fire-by-topic",
        icon: "⚡",
        title: "Technical bank (rapid-fire)",
        description:
          "Quick-drill Q&A across booking/ancillary, loyalty/cross-program, cross-carrier integration, Azure cost, and governance.",
      },
      {
        href: "#deeper-staff-level-questions",
        icon: "🧠",
        title: "Deeper / staff-level",
        description:
          "Zero-downtime PSS migration, resilient Emirates interline, cost-per-booking allocation, active-active with single-write PSS.",
      },
      {
        href: "#scenario-based-questions-situational-troubleshooting",
        icon: "🎯",
        title: "Scenario-based",
        description:
          "\"What would you do\" incident, compliance, cost, and cross-carrier baggage scenarios — with the architectural fix.",
      },
      {
        href: "#real-world-case-studies-how-flydubai-the-industry-actually-solve-this",
        icon: "🌍",
        title: "Real-world case studies",
        description:
          "flydubai + Sabre, flydubai + Azure, OPEN→Skywards loyalty, Emirates–flydubai codeshare across two PSS platforms.",
      },
    ],
  },
  {
    id: "etihad",
    name: "Etihad Airways",
    shortName: "Etihad",
    tagline:
      "Abu Dhabi flag carrier · ADQ government-owned · Amadeus Altéa & offers-and-orders retailing · Etihad Guest · Etihad Cargo (iCargo) · mixed-fleet MRO · no global alliance.",
    markdown: etihadDoc.markdown,
    toc: etihadDoc.toc,
    rounds: [
      {
        label: "1 · Recruiter / HR screen",
        href: "#round-1-recruiter-hr-screen",
        description:
          "Fit, why Abu Dhabi, grade anchoring and total-package framing",
      },
      {
        label: "2 · Hiring manager",
        href: "#round-2-hiring-manager-architecture-scope-fit",
        description:
          "Blast-radius scope, governing without authority, vendor roadmap vs target architecture",
      },
      {
        label: "3 · System design",
        href: "#round-3-system-design-aviation-domain",
        description:
          "5 cases: offer/order orchestration around Altéa, Etihad Guest ledger & settlement, Etihad Cargo/iCargo, IRROPS without an alliance, residency/ADGM & DR",
      },
      {
        label: "4 · Coding / technical",
        href: "#round-4-coding-technical-deep-dive",
        description:
          "Idempotent consumers & outbox, idempotent PSS writes, circuit breakers, concurrency, ledger modelling, API versioning",
      },
      {
        label: "5 · Cloud & data architecture",
        href: "#round-5-cloud-data-architecture",
        description:
          "Hybrid estate reality, Kubernetes, API front door, lakehouse & contracts, Well-Architected, cost-per-transaction",
      },
      {
        label: "5B · Full-stack reference architecture",
        href: "#round-5b-full-stack-reference-architecture-edge-database",
        description:
          "Edge→database walkthrough for a booking + ancillary flow, with PCI isolation and multi-region honesty",
      },
      {
        label: "6 · AI/ML for aviation",
        href: "#round-6-aiml-mlops-aviation-specific",
        description:
          "Dynamic offers with guardrails, mixed-fleet predictive maintenance, cargo document intelligence, customer GenAI, MLOps governance",
      },
      {
        label: "6B · Agentic AI, LLM & MCP depth",
        href: "#round-6b-agentic-ai-llm-mcp-engineering-depth",
        description:
          "Agents & multi-agent, orchestration frameworks, RAG/vector search, MCP, guardrails, evals & observability, LLMOps, FastAPI, cost",
      },
      {
        label: "6C · Sovereign & air-gapped AI",
        href: "#round-6c-sovereign-air-gapped-ai-government-entity-constraints",
        description:
          "ADQ-owned constraints: residency vs sovereignty vs no-vendor-inference, deployment tiers, proving nothing leaves, Abu Dhabi sovereign cloud & Arabic models",
      },
      {
        label: "7 · Architecture leadership",
        href: "#round-7-architecture-leadership-runway-adrs-governance",
        description:
          "Architecture runway, ADR discipline, debt as economics, PoC governance, consistency without authority",
      },
      {
        label: "8 · Behavioral / STAR",
        href: "#round-8-behavioral-star",
        description:
          "Ambiguity, rejected recommendations, mentorship, conflicting priorities, incident ownership",
      },
      {
        label: "9 · Executive / bar-raiser",
        href: "#round-9-executive-bar-raiser",
        description:
          "First 90 days, build vs buy, defending cost to a CFO, where GenAI genuinely changes an airline",
      },
    ],
    quickLinks: [
      {
        href: "#round-6b-agentic-ai-llm-mcp-engineering-depth",
        icon: "🤖",
        title: "Agentic AI / LLM depth",
        description:
          "The GenAI skills bar in Etihad's context: agents, LangGraph/Semantic Kernel, RAG & vector stores, MCP, guardrails, evals, LLMOps, FastAPI, cost.",
      },
      {
        href: "#round-6c-sovereign-air-gapped-ai-government-entity-constraints",
        icon: "🛡️",
        title: "Sovereign & air-gapped AI",
        description:
          "ADQ-owned, Abu Dhabi context: mandate decomposition, deployment tiers, five layers of no-egress proof, local/Arabic open-weight models, sovereign use cases.",
      },
      {
        href: "#technology-skills-map-jd-stack-etihad-landscape-your-resume",
        icon: "🧭",
        title: "Tech & skills map",
        description:
          "JD stack ↔ Etihad landscape ↔ your resume evidence, with explicit gaps to close before the loop.",
      },
      {
        href: "#technical-question-bank-rapid-fire-by-topic",
        icon: "⚡",
        title: "Technical bank (rapid-fire)",
        description:
          "Quick-drill Q&A across PSS/offers-and-orders, loyalty, cargo & ops, cloud/data/governance and AI.",
      },
      {
        href: "#deeper-staff-level-questions",
        icon: "🧠",
        title: "Deeper / staff-level",
        description:
          "Offers-and-orders migration, partner integration without an alliance, chargeback cost allocation, retrofitting governance, single-write-region reality.",
      },
      {
        href: "#scenario-based-questions-situational-troubleshooting",
        icon: "🎯",
        title: "Scenario-based",
        description:
          "Latency regressions, duplicate bookings, AI audit requests, cost spikes, a model update that breaks refusals, and the fine-tuning request you should decline.",
      },
    ],
  },
];

/**
 * Combined "All carriers" view. Carrier docs share heading text (every guide has
 * a "Round 8 · Behavioral / STAR"), so headings are prefixed with the carrier
 * name before concatenation to keep slugs unique and the TOC readable.
 */
function prefixHeadings(markdown: string, prefix: string): string {
  return markdown
    .split(/\r?\n/)
    .map((line) => {
      const m = /^##\s+(.+?)\s*$/.exec(line);
      return m ? `## ${prefix} · ${m[1]}` : line;
    })
    .join("\n");
}

function buildAllCarriers(carriers: Carrier[]): Carrier {
  const short = (c: Carrier) => c.shortName ?? c.name;

  const markdown = carriers
    .map((c) => prefixHeadings(c.markdown, short(c)))
    .join("\n\n---\n\n");
  const toc = extractTopLevelHeadings(markdown);
  const slugByText = new Map(toc.map((t) => [t.text, t.slug]));

  // Re-point each carrier's round/quick links at its prefixed heading.
  const repoint = (c: Carrier, href: string): string | undefined => {
    const text = c.toc.find((t) => `#${t.slug}` === href)?.text;
    if (!text) return undefined;
    const slug = slugByText.get(`${short(c)} · ${text}`);
    return slug ? `#${slug}` : undefined;
  };

  const rounds = carriers.flatMap((c) =>
    c.rounds.flatMap((r) => {
      const href = repoint(c, r.href);
      return href
        ? [{ ...r, href, label: `${short(c)} · ${r.label}` }]
        : [];
    }),
  );

  // Only the two shared AI rounds per carrier — the full set would be 20+ cards.
  const quickLinks = carriers.flatMap((c) =>
    c.quickLinks.slice(0, 2).flatMap((q) => {
      const href = repoint(c, q.href);
      return href ? [{ ...q, href, title: `${short(c)} · ${q.title}` }] : [];
    }),
  );

  return {
    id: "all",
    name: "All carriers",
    shortName: "All",
    tagline:
      "Every guide in one unfiltered view — Emirates, flydubai and Etihad end to end, with headings prefixed by carrier so nothing collides.",
    markdown,
    toc,
    rounds,
    quickLinks,
  };
}

const ALL_CARRIERS: Carrier[] = [...CARRIERS, buildAllCarriers(CARRIERS)];

export default function AirlinesPage() {
  return <AirlinesClient carriers={ALL_CARRIERS} />;
}
