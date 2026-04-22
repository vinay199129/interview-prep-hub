import { getCriteria } from "@/lib/data";

export default function CriteriaPage() {
  const criteria = getCriteria();
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Candidate evaluation criteria</h1>
      <p className="text-slate-600 dark:text-slate-300">
        Use these nine criteria when scoring an interview. The technical-skills
        match (criterion 1) is mandatory:{" "}
        <strong>at least 80% match on the POD&apos;s Must-Have skills</strong>.
        For each criterion, give detailed feedback on what was good, what was
        weak, and where the candidate could grow — and clearly call out a
        Hire / No-Hire recommendation.
      </p>
      <ol className="space-y-3">
        {criteria.map((c) => (
          <li
            key={c.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4"
          >
            <div className="flex items-baseline gap-3">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {String(c.id).padStart(2, "0")}
              </span>
              <h2 className="font-semibold">{c.title}</h2>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">{c.description}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
