import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllQuestions, getCategories, getDomains } from "@/lib/data";
import { BrowseClient } from "@/components/BrowseClient";
import { BrowseSkeleton } from "@/components/Skeletons";
import type { CategoryId } from "@/lib/types";

export const metadata: Metadata = {
  title: "Senior & Leadership · Interview Prep Hub",
  description:
    "Engineering Manager, Staff+ IC, and behavioural / STAR prep for AI and cloud roles. Sourced from India, Singapore, UAE and global big-tech interview patterns.",
};

const LEADERSHIP_CATEGORIES: CategoryId[] = [
  "leadership",
  "behavioral",
  "staff-plus",
];

interface Lens {
  id: string;
  title: string;
  description: string;
  categories: CategoryId[];
}

const LENSES: Lens[] = [
  {
    id: "people-mgmt",
    title: "Engineering Manager",
    description:
      "IC→manager and seasoned-manager: hiring, performance, conflict, prioritization, org design, partnership with PM/design/data.",
    categories: ["leadership"],
  },
  {
    id: "staff-ic",
    title: "Staff+ IC / Architect",
    description:
      "Staff, Principal, Distinguished IC and Architect signal: technical strategy, scope, influence-without-authority, architecture review, multiplier effect.",
    categories: ["staff-plus"],
  },
  {
    id: "behavioral",
    title: "Behavioral & STAR",
    description:
      "Story-based prompts interviewers actually ask: ownership, ambiguity, failure, cross-functional partnership, working backwards, disagreement.",
    categories: ["behavioral"],
  },
];

export default function LeadershipPage() {
  const categories = getCategories();
  const questions = getAllQuestions();

  const inScope = questions.filter((q) =>
    q.categoryIds.some((cid) => LEADERSHIP_CATEGORIES.includes(cid)),
  );

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">Senior & Leadership</h1>
        <p className="max-w-3xl text-slate-600 dark:text-slate-300">
          Preparation for senior, staff, principal, and engineering-manager
          interviews in AI &amp; cloud roles. Behavioral / STAR prompts,
          people-management loops, staff-IC scope &amp; influence, and
          architecture-review formats — sourced from public interview-experience
          write-ups across India, Singapore, the UAE, and global big-tech. See{" "}
          <Link href="/patterns" className="text-brand-600 dark:text-brand-100 underline">
            Company patterns
          </Link>{" "}
          for archetype-specific loop notes.
        </p>
        <div className="text-xs text-slate-500 dark:text-slate-400">
          {inScope.length} questions across {LEADERSHIP_CATEGORIES.length} categories.
        </div>
      </header>

      <section className="grid sm:grid-cols-3 gap-3">
        {LENSES.map((lens) => {
          const count = questions.filter((q) =>
            q.categoryIds.some((cid) => lens.categories.includes(cid)),
          ).length;
          const href = `/leadership?cats=${lens.categories.join(",")}`;
          return (
            <Link
              key={lens.id}
              href={href}
              className="block rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 hover:shadow transition"
            >
              <h2 className="font-semibold text-sm">{lens.title}</h2>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 line-clamp-3">
                {lens.description}
              </p>
              <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
                {count} {count === 1 ? "question" : "questions"}
              </div>
            </Link>
          );
        })}
      </section>

      <Suspense fallback={<BrowseSkeleton />}>
        <BrowseClient
          categories={categories}
          questions={questions}
          domains={getDomains()}
          initialCategories={LEADERSHIP_CATEGORIES}
        />
      </Suspense>
    </div>
  );
}
