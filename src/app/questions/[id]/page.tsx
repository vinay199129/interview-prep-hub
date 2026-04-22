import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllQuestions, getQuestionById } from "@/lib/data";
import { QuestionCard } from "@/components/QuestionCard";

export function generateStaticParams() {
  return getAllQuestions().map((q) => ({ id: q.id }));
}

export default async function QuestionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const q = getQuestionById(id);
  if (!q) notFound();
  return (
    <div className="space-y-4">
      <Link
        href="/browse"
        className="text-sm text-brand-600 dark:text-brand-100 hover:underline"
      >
        ← Back to browse
      </Link>
      <QuestionCard q={q} defaultOpen />
    </div>
  );
}
