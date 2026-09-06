import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllQuestions,
  getCategories,
  getCategoryById,
  getDomainForCategory,
  getDomains,
} from "@/lib/data";
import { BrowseClient } from "@/components/BrowseClient";
import type { CategoryId } from "@/lib/types";

export function generateStaticParams() {
  return getCategories().map((c) => ({ id: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const c = getCategoryById(id as CategoryId);
  if (!c) return { title: "Category not found" };
  const title = `${c.name} · Interview Prep Hub`;
  return { title, description: c.description, openGraph: { title, description: c.description } };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = getCategoryById(id as CategoryId);
  if (!category) notFound();
  const allCategories = getCategories();
  const allQuestions = getAllQuestions();
  const domain = getDomainForCategory(category.id);

  return (
    <div className="space-y-4">
      <header className="space-y-2">
        <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
          {domain ? (
            <Link
              href={`/domains/${domain.id}`}
              className="hover:text-brand-600 hover:underline dark:hover:text-brand-100"
            >
              {domain.name}
            </Link>
          ) : (
            category.shortName
          )}
          {domain && <span aria-hidden="true"> › {category.shortName}</span>}
        </div>
        <h1 className="text-2xl font-semibold">{category.name}</h1>
        <p className="text-slate-600 dark:text-slate-300">{category.description}</p>
      </header>
      <Suspense fallback={null}>
        <BrowseClient
          categories={allCategories}
          questions={allQuestions}
          domains={getDomains()}
          initialCategory={category.id}
        />
      </Suspense>
    </div>
  );
}
