import { getCriteria } from "@/lib/data";

export default function CriteriaPage() {
  const criteria = getCriteria();
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Evaluation criteria</h1>
      <p className="text-slate-600 dark:text-slate-300">
        A generic rubric you can use as a starting point when scoring an
        interview, or as a self-check while preparing. The dimensions below
        try to capture what most engineering interviews actually look for, but
        every role and team weights them differently &mdash; treat this as a
        prompt for your own judgement, not a fixed grading scheme.
      </p>
      <p className="text-slate-600 dark:text-slate-300">
        Interviewer Mode lets you rate each criterion 1&ndash;5, leave
        per-criterion comments, and finish with an overall recommendation
        that reflects how the role and team weight these dimensions.
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
