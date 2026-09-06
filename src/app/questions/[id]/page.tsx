import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getAllQuestions,
  getCategories,
  getDomainForCategory,
  getQuestionById,
} from "@/lib/data";
import { getRelatedQuestions } from "@/lib/related";
import { QuestionCard } from "@/components/QuestionCard";
import { RelatedQuestions } from "@/components/RelatedQuestions";

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
  const allQuestions = getAllQuestions();
  const related = getRelatedQuestions(q, allQuestions);
  const domain = getDomainForCategory(q.categoryIds[0]);

  return (
    <div className="space-y-4">
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm">
        <Link href="/browse" className="text-brand-600 hover:underline dark:text-brand-100">
          ← Back to browse
        </Link>
        {domain && (
          <>
            <span aria-hidden="true" className="text-slate-400">
              ·
            </span>
            <Link
              href={`/domains/${domain.id}`}
              className="text-slate-600 hover:text-brand-600 hover:underline dark:text-slate-300 dark:hover:text-brand-100"
            >
              {domain.name}
            </Link>
          </>
        )}
      </nav>
      <QuestionCard q={q} categories={categories} defaultOpen />
      <RelatedQuestions questions={related} />
    </div>
  );
}
