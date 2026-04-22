import { notFound } from "next/navigation";
import { getAllQuestions, getPodById, getPods } from "@/lib/data";
import { BrowseClient } from "@/components/BrowseClient";
import type { PodId } from "@/lib/types";

export function generateStaticParams() {
  return getPods().map((p) => ({ id: p.id }));
}

export default async function PodPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pod = getPodById(id);
  if (!pod) notFound();
  const allPods = getPods();
  const allQuestions = getAllQuestions();

  return (
    <div className="space-y-4">
      <header className="space-y-2">
        <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
          {pod.shortName}
        </div>
        <h1 className="text-2xl font-semibold">{pod.name}</h1>
        <p className="text-slate-600 dark:text-slate-300">{pod.description}</p>
        <div className="grid sm:grid-cols-2 gap-3 pt-2">
          <SkillList title="Must Have" items={pod.mustHave} />
          {pod.goodToHave.length ? (
            <SkillList title="Good to Have" items={pod.goodToHave} />
          ) : null}
        </div>
      </header>
      <BrowseClient
        pods={allPods}
        questions={allQuestions}
        initialPod={pod.id as PodId}
      />
    </div>
  );
}

function SkillList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
        {title}
      </div>
      <ul className="text-sm space-y-1">
        {items.map((s) => (
          <li key={s}>• {s}</li>
        ))}
      </ul>
    </div>
  );
}
