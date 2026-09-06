import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllQuestions,
  getCategories,
  getDomainById,
  getDomains,
  getTracks,
} from "@/lib/data";
import { accentBg, accentText } from "@/lib/accents";
import { ProgressStats } from "@/components/ProgressStats";
import { DIFFICULTY_LABEL, type Difficulty } from "@/lib/types";

const DIFFICULTY_ORDER: Difficulty[] = ["easy", "medium", "hard", "expert"];

export function generateStaticParams() {
  return getDomains().map((d) => ({ id: d.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const domain = getDomainById(id);
  if (!domain) return { title: "Domain not found" };
  return {
    title: `${domain.name} · Interview Prep Hub`,
    description: domain.description,
  };
}

export default async function DomainPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const domain = getDomainById(id);
  if (!domain) notFound();

  const categories = getCategories().filter((c) =>
    domain.categoryIds.includes(c.id),
  );
  const questions = getAllQuestions();
  const domainQs = questions.filter((q) =>
    q.categoryIds.some((c) => domain.categoryIds.includes(c)),
  );
  const browseHref = `/browse?cat=${domain.categoryIds.join(",")}`;

  const byDifficulty = DIFFICULTY_ORDER.map((d) => ({
    difficulty: d,
    count: domainQs.filter((q) => q.difficulty === d).length,
  })).filter((d) => d.count > 0);

  const relatedTracks = getTracks().filter((t) =>
    t.categoryIds.some((c) => domain.categoryIds.includes(c)),
  );

  return (
    <div className="space-y-8">
      <nav aria-label="Breadcrumb" className="text-sm">
        <Link href="/" className="text-brand-600 dark:text-brand-100 hover:underline">
          ← All domains
        </Link>
      </nav>

      <header className={`rounded-lg border p-6 ${accentBg[domain.accent] ?? ""}`}>
        <div
          className={`text-xs font-semibold uppercase tracking-wide ${accentText[domain.accent] ?? ""}`}
        >
          {domain.tagline}
        </div>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">{domain.name}</h1>
        <p className="mt-3 max-w-3xl text-slate-700 dark:text-slate-300">
          {domain.description}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Link
            href={browseHref}
            className="inline-flex items-center rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-700"
          >
            Browse all {domainQs.length} questions →
          </Link>
          <span className="text-xs text-slate-600 dark:text-slate-400">
            {byDifficulty
              .map((d) => `${d.count} ${DIFFICULTY_LABEL[d.difficulty].toLowerCase()}`)
              .join(" · ")}
          </span>
        </div>
        <ProgressStats questionIds={domainQs.map((q) => q.id)} className="mt-4" />
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Categories in this domain</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => {
            const categoryQs = questions.filter((q) => q.categoryIds.includes(c.id));
            return (
              <Link
                key={c.id}
                href={`/categories/${c.id}`}
                className="block rounded-lg border border-slate-200 bg-white p-5 transition hover:shadow dark:border-slate-800 dark:bg-slate-900"
              >
                <h3 className="font-semibold">{c.name}</h3>
                <p className="mt-2 line-clamp-3 text-sm text-slate-600 dark:text-slate-300">
                  {c.description}
                </p>
                <div className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                  {categoryQs.length} questions
                </div>
                <ProgressStats
                  questionIds={categoryQs.map((q) => q.id)}
                  variant="compact"
                  className="mt-2"
                />
              </Link>
            );
          })}
        </div>
      </section>

      {relatedTracks.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Tracks that draw on this domain</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            A track is an ordered study path; a domain is just the subject area.
            Pick a track if you want a plan rather than a list.
          </p>
          <ul className="flex flex-wrap gap-2">
            {relatedTracks.map((t) => (
              <li key={t.id}>
                <Link
                  href={`/tracks/${t.id}`}
                  className="inline-flex rounded-full border border-slate-300 px-3 py-1 text-sm hover:border-brand-400 hover:text-brand-600 dark:border-slate-700 dark:hover:text-brand-100"
                >
                  {t.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
