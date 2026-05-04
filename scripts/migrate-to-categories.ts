/**
 * Migration: read old data/questions/pod*.json, drop podIds, assign categoryIds.
 * Strategy: explicit overrides for AI-specific items, then prefix-based fallback
 * so every original question is preserved.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

type OldQuestion = {
  id: string;
  podIds: string[];
  topic: string;
  subTopic?: string;
  [k: string]: unknown;
};

type CategoryId =
  | "llm-fundamentals"
  | "prompt-engineering"
  | "rag"
  | "agents"
  | "agent-frameworks"
  | "evaluation"
  | "vector-search"
  | "mlops"
  | "safety"
  | "foundations"
  | "python"
  | "azure-ai"
  | "system-design"
  | "dotnet"
  | "java"
  | "azure-platform"
  | "frontend"
  | "migration";

// Hand-curated overrides — these win over prefix rules.
const ID_TO_CATEGORIES: Record<string, CategoryId[]> = {
  // ------ Cross-cutting architecture ------
  "p1-arch-001": ["system-design", "dotnet"],
  "p1-arch-002": ["system-design", "azure-platform"],
  "p1-arch-003": ["mlops", "system-design"],
  "p1-arch-004": ["azure-platform", "safety"],
  "p1-arch-005": ["system-design"],
  "p1-cs-020": ["system-design", "dotnet"],
  "p2-arch-001": ["system-design", "java"],
  "p2-arch-002": ["system-design", "migration"],
  "p2-arch-003": ["system-design", "java"],

  // ------ Azure AI search / doc intel ------
  "p3-search-001": ["azure-ai", "vector-search"],
  "p3-search-002": ["azure-ai", "vector-search", "rag"],
  "p3-search-003": ["azure-ai"],
  "p3-docint-001": ["azure-ai"],
  "p3-docint-002": ["azure-ai"],

  // ------ RAG ------
  "p3-rag-001": ["rag"],
  "p3-rag-002": ["rag", "system-design"],
  "p3-rag-003": ["rag"],
  "p3-rag-004": ["rag", "evaluation"],
  "p3-rag-005": ["rag", "vector-search"],
  "p3-rag-006": ["rag", "system-design"],

  // ------ LLM / Agents ------
  "p3-llm-001": ["prompt-engineering"],
  "p3-llm-002": ["vector-search", "llm-fundamentals"],
  "p3-llm-003": ["safety"],
  "p3-llm-004": ["llm-fundamentals", "mlops"],
  "p3-llm-005": ["agents"],
  "p3-llm-006": ["llm-fundamentals"],
  "p3-llm-007": ["agents", "system-design"],
  "p3-py-018": ["agents", "prompt-engineering", "python"],

  // ------ GitHub Copilot ------
  "p1-ghcp-001": ["agents", "mlops"],
};

// Prefix-based fallback — applied when no explicit override exists.
function categoriesByPrefix(id: string): CategoryId[] | null {
  if (id.startsWith("p1-cs-")) return ["dotnet"];
  if (id.startsWith("p1-apim-")) return ["azure-platform"];
  if (id.startsWith("p1-fn-")) return ["azure-platform", "dotnet"];
  if (id.startsWith("p1-la-")) return ["azure-platform"];
  if (id.startsWith("p1-spa-")) return ["frontend"];
  if (id.startsWith("p1-aks-")) return ["azure-platform", "mlops"];
  if (id.startsWith("p1-iot-")) return ["azure-platform", "migration"];
  if (id.startsWith("p1-ghcp-")) return ["agents", "mlops"];
  if (id.startsWith("p1-arch-")) return ["system-design"];

  if (id.startsWith("p2-java-")) return ["java"];
  if (id.startsWith("p2-spring-")) return ["java"];
  if (id.startsWith("p2-fn-java-")) return ["azure-platform", "java"];
  if (id.startsWith("p2-aws-mig-")) return ["migration", "azure-platform"];
  if (id.startsWith("p2-arch-")) return ["system-design"];

  if (id.startsWith("p3-py-")) return ["python"];
  if (id.startsWith("p3-fn-py-")) return ["azure-platform", "python"];
  if (id.startsWith("p3-rag-")) return ["rag"];
  if (id.startsWith("p3-llm-")) return ["llm-fundamentals"];
  if (id.startsWith("p3-search-")) return ["azure-ai", "vector-search"];
  if (id.startsWith("p3-docint-")) return ["azure-ai"];
  return null;
}

const root = process.cwd();
const oldFiles = ["pod1.json", "pod2.json", "pod3.json"];
const all: OldQuestion[] = [];
for (const f of oldFiles) {
  const raw = readFileSync(join(root, "data", "questions", f), "utf8");
  const arr = JSON.parse(raw) as OldQuestion[];
  all.push(...arr);
}

const skipped: string[] = [];
const migrated = all
  .map((q) => {
    const cats = ID_TO_CATEGORIES[q.id] ?? categoriesByPrefix(q.id);
    if (!cats) {
      skipped.push(q.id);
      return null;
    }
    const { podIds: _drop, ...rest } = q;
    void _drop;
    return { ...rest, categoryIds: cats };
  })
  .filter((q): q is NonNullable<typeof q> => q !== null);

if (skipped.length) {
  console.warn(`⚠ ${skipped.length} questions had no category mapping:`);
  for (const id of skipped) console.warn(`  - ${id}`);
}

console.log(`migrated ${migrated.length} of ${all.length} questions`);

writeFileSync(
  join(root, "data", "questions.migrated.json"),
  JSON.stringify(migrated, null, 2) + "\n",
);
console.log("wrote data/questions.migrated.json");
