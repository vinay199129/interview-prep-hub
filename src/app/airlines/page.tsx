import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { AirlinesClient, type Carrier } from "@/components/AirlinesClient";
import { extractTopLevelHeadings } from "@/lib/toc";

export const metadata: Metadata = {
  title: "Emirates & flydubai Solutions Architect · Interview Prep Hub",
  description:
    "Round-by-round Solutions Architect interview prep for Dubai carriers Emirates Group IT and flydubai: SAFe/agile delivery, architecture runway & ADRs, PSS/loyalty/cargo system design, Azure cloud, AI/ML for aviation, ancillary/dynamic pricing, and executive/behavioral rounds.",
};

function loadDoc(relFile: string) {
  const docPath = path.join(process.cwd(), "docs", relFile);
  const markdown = fs.readFileSync(docPath, "utf-8");
  return { markdown, toc: extractTopLevelHeadings(markdown) };
}

const emiratesDoc = loadDoc("EMIRATES-SOLUTIONS-ARCHITECT.md");
const flydubaiDoc = loadDoc("FLYDUBAI-SOLUTIONS-ARCHITECT.md");

const CARRIERS: Carrier[] = [
  {
    id: "emirates",
    name: "Emirates Group",
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
];

export default function AirlinesPage() {
  return <AirlinesClient carriers={CARRIERS} />;
}
