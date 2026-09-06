import type { CategoryId } from "./types";

export const TOPICS = [
  "AI Agents", "AI System Design", "ASP.NET Core", "Agent Frameworks",
  "Azure AI Search", "Azure AI Services", "Azure APIM", "Azure Functions",
  "Azure Platform", "Behavioral & STAR", "C# Language", "Cloud Migration",
  "Engineering Leadership", "Frontend (Angular/React)", "Java Language",
  "LLM Engineering", "LLM Evaluation", "ML Foundations", "MLOps & LLMOps",
  "Prompt Engineering", "Python Language", "RAG", "Safety & Responsible AI",
  "Software Architecture", "Spring Boot", "Staff+ Signal", "Vector Search & Embeddings",
] as const;

export type Topic = (typeof TOPICS)[number];

const CATEGORY_TOPIC: Record<CategoryId, Topic> = {
  "llm-fundamentals": "LLM Engineering",
  "prompt-engineering": "Prompt Engineering",
  rag: "RAG",
  "vector-search": "Vector Search & Embeddings",
  evaluation: "LLM Evaluation",
  foundations: "ML Foundations",
  agents: "AI Agents",
  "agent-frameworks": "Agent Frameworks",
  "system-design": "AI System Design",
  mlops: "MLOps & LLMOps",
  safety: "Safety & Responsible AI",
  "azure-ai": "Azure AI Services",
  dotnet: "C# Language",
  java: "Java Language",
  python: "Python Language",
  frontend: "Frontend (Angular/React)",
  "azure-platform": "Azure Platform",
  migration: "Cloud Migration",
  behavioral: "Behavioral & STAR",
  leadership: "Engineering Leadership",
  "staff-plus": "Staff+ Signal",
};

const ALIASES = new Map<string, Topic>([
  ["C# / .NET", "C# Language"],
  ["Python", "Python Language"],
  ["Java & Spring", "Java Language"],
  ["Azure Functions (Python)", "Azure Functions"],
  ["Azure Functions (Java)", "Azure Functions"],
  ["AWS \u2192 Azure Migration", "Cloud Migration"],
  ["Architecture", "Software Architecture"],
]);

export function normalizeTopic(topic: string, category: CategoryId): Topic {
  return ALIASES.get(topic) ?? TOPICS.find((value) => value === topic) ?? CATEGORY_TOPIC[category];
}