// Lightweight static skeletons for Suspense fallbacks.
// Server-renderable — no hooks, no client state.

function Block({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-slate-200 dark:bg-slate-800 rounded ${className}`}
      aria-hidden="true"
    />
  );
}

export function BrowseSkeleton() {
  return (
    <div className="grid md:grid-cols-[260px_1fr] gap-4 mt-2" aria-busy="true" aria-live="polite">
      <aside className="space-y-3">
        <Block className="h-6 w-3/4" />
        <Block className="h-24" />
        <Block className="h-5 w-1/2" />
        <Block className="h-32" />
        <Block className="h-5 w-1/2" />
        <Block className="h-20" />
        <Block className="h-5 w-1/2" />
        <Block className="h-20" />
      </aside>
      <section className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-2"
          >
            <div className="flex flex-wrap gap-1.5">
              <Block className="h-4 w-16" />
              <Block className="h-4 w-12" />
              <Block className="h-4 w-20" />
              <Block className="h-4 w-14" />
            </div>
            <Block className="h-4 w-3/4" />
            <Block className="h-3 w-1/2" />
          </div>
        ))}
      </section>
      <span className="sr-only">Loading questions…</span>
    </div>
  );
}

export function PracticeSkeleton() {
  return (
    <div className="space-y-4 mt-2" aria-busy="true" aria-live="polite">
      <Block className="h-7 w-48" />
      <div className="grid sm:grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <Block key={i} className="h-20" />
        ))}
      </div>
      <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3">
        <Block className="h-5 w-2/3" />
        <Block className="h-4 w-full" />
        <Block className="h-4 w-5/6" />
        <Block className="h-4 w-4/6" />
        <div className="flex gap-2 pt-2">
          <Block className="h-9 w-24" />
          <Block className="h-9 w-24" />
          <Block className="h-9 w-24" />
          <Block className="h-9 w-24" />
        </div>
      </div>
      <span className="sr-only">Loading practice session…</span>
    </div>
  );
}

export function InterviewSkeleton() {
  return (
    <div className="space-y-4 mt-2" aria-busy="true" aria-live="polite">
      <Block className="h-7 w-56" />
      <div className="grid md:grid-cols-[260px_1fr] gap-4">
        <aside className="space-y-3">
          <Block className="h-5 w-1/2" />
          <Block className="h-24" />
          <Block className="h-5 w-1/2" />
          <Block className="h-24" />
          <Block className="h-9 w-full" />
        </aside>
        <section className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Block key={i} className="h-24" />
          ))}
        </section>
      </div>
      <span className="sr-only">Loading interviewer mode…</span>
    </div>
  );
}

export function ListSkeleton() {
  return (
    <div className="space-y-3 mt-2" aria-busy="true" aria-live="polite">
      {Array.from({ length: 8 }).map((_, i) => (
        <Block key={i} className="h-14" />
      ))}
      <span className="sr-only">Loading…</span>
    </div>
  );
}
