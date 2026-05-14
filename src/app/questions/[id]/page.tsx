import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllQuestions, getCategories, getQuestionById } from "@/lib/data";
import { QuestionCard } from "@/components/QuestionCard";

export function generateStaticParams() {
  return getAllQuestions().map((q) => ({ id: q.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const q = getQuestionById(id);
  if (!q) return { title: "Question not found" };
  const trimmed = q.prompt.replace(/\s+/g, " ").trim();
  const title = `${trimmed.length > 70 ? trimmed.slice(0, 67) + "…" : trimmed} · Interview Prep Hub`;
  const description = q.keyPoints[0] ?? trimmed;
  return {
    title,
    description,
    openGraph: { title, description, type: "article" },
  };
}

export default async function QuestionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const q = getQuestionById(id);
  if (!q) notFound();
  const categories = getCategories();
  return (
    <div className="space-y-4">
      <Link
        href="/browse"
        className="text-sm text-brand-600 dark:text-brand-100 hover:underline"
      >
        ← Back to browse
      </Link>
      <QuestionCard q={q} categories={categories} defaultOpen />
    </div>
  );
}
