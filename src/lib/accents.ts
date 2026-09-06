/**
 * Tailwind cannot see dynamically built class names, so accent colours have to
 * be enumerated as full class strings here and looked up by key.
 */
export const accentBg: Record<string, string> = {
  indigo: "bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-900",
  violet: "bg-violet-50 dark:bg-violet-950/40 border-violet-200 dark:border-violet-900",
  emerald: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900",
  orange: "bg-orange-50 dark:bg-orange-950/40 border-orange-200 dark:border-orange-900",
  amber: "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900",
  cyan: "bg-cyan-50 dark:bg-cyan-950/40 border-cyan-200 dark:border-cyan-900",
  teal: "bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-900",
  sky: "bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-900",
  rose: "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900",
  slate: "bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800",
  blue: "bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900",
  purple: "bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-900",
  fuchsia: "bg-fuchsia-50 dark:bg-fuchsia-950/40 border-fuchsia-200 dark:border-fuchsia-900",
  yellow: "bg-yellow-50 dark:bg-yellow-950/40 border-yellow-200 dark:border-yellow-900",
};

export const accentText: Record<string, string> = {
  indigo: "text-indigo-800 dark:text-indigo-200",
  violet: "text-violet-800 dark:text-violet-200",
  emerald: "text-emerald-800 dark:text-emerald-200",
  orange: "text-orange-800 dark:text-orange-200",
  amber: "text-amber-800 dark:text-amber-200",
  cyan: "text-cyan-800 dark:text-cyan-200",
  teal: "text-teal-800 dark:text-teal-200",
  sky: "text-sky-800 dark:text-sky-200",
  rose: "text-rose-800 dark:text-rose-200",
  slate: "text-slate-800 dark:text-slate-200",
  blue: "text-blue-800 dark:text-blue-200",
  purple: "text-purple-800 dark:text-purple-200",
  fuchsia: "text-fuchsia-800 dark:text-fuchsia-200",
  yellow: "text-yellow-800 dark:text-yellow-200",
};
