import Link from "next/link";
import type { Metadata } from "next";
import { PatternsToc } from "@/components/PatternsToc";
import { getStudyGuide } from "@/lib/data";
import { extractTopLevelHeadings } from "@/lib/toc";

export const metadata: Metadata = {
  title: "Study method and readiness · Interview Prep Hub",
  description: "Revision schedules, practical rehearsal drills, readiness criteria and a final-interview checklist.",
};

export default function StudyGuidePage() {
  const markdown = getStudyGuide();
  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <h1 className="text-2xl font-semibold">Study method and readiness</h1>
        <div className="flex flex-wrap gap-4 text-sm text-brand-700 dark:text-brand-100">
          <Link href="/tracks" className="underline">Career tracks</Link>
          <Link href="/roles" className="underline">Role focuses</Link>
          <Link href="/practice" className="underline">Spaced recall</Link>
          <Link href="/interview" className="underline">Mock interview</Link>
          <Link href="/criteria" className="underline">Evaluation criteria</Link>
        </div>
      </header>
      <PatternsToc markdown={markdown} toc={extractTopLevelHeadings(markdown)} />
    </div>
  );
}