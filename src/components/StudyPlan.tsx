import Link from "next/link";
import type { Question, StudyStage } from "@/lib/types";
import { ProgressStats } from "./ProgressStats";

export function StudyPlan({ stages, questions }: { stages: StudyStage[]; questions: Question[] }) {
  const questionById = new Map(questions.map((question) => [question.id, question]));

  return (
    <section aria-labelledby="study-sequence" className="space-y-4 pt-4">
      <h2 id="study-sequence" className="text-xl font-semibold">Essential study sequence</h2>
      <p className="max-w-3xl text-sm text-slate-600 dark:text-slate-300">
        Answer from memory, complete the exercise, then defend your choices against the
        readiness checks. Time estimates cover rehearsal, not learning an unfamiliar subject
        from scratch. A self-rating is not evidence of mastery.
      </p>
      <Link href="/study-guide" className="inline-block text-sm text-brand-700 underline dark:text-brand-100">
        Revision schedules and self-assessment
      </Link>
      <ol className="space-y-6">
        {stages.map((stage, index) => {
          const stageQuestions = stage.questionIds.map((questionId) => {
            const question = questionById.get(questionId);
            if (!question) throw new Error(`Unknown study question: ${questionId}`);
            return question;
          });
          const minutes = stage.practiceTimeMin + stageQuestions.reduce((total, question) => total + question.estimatedTimeMin, 0);
          return (
            <li key={stage.id} className="border-t border-slate-200 pt-5 dark:border-slate-800">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold">{index + 1}. {stage.name}</h3>
                <span className="text-sm text-slate-500 dark:text-slate-400">~{minutes} min rehearsal</span>
              </div>
              <ProgressStats questionIds={stage.questionIds} variant="compact" className="mt-2" />
              <ol className="mt-3 list-decimal space-y-2 pl-5">
                {stageQuestions.map((question) => (
                  <li key={question.id} className="text-sm">
                    <Link href={`/questions/${question.id}`} className="text-brand-700 underline dark:text-brand-100">
                      {question.prompt}
                    </Link>
                    <span className="ml-2 text-xs text-slate-500 dark:text-slate-400">{question.difficulty} / {question.type}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="text-sm font-semibold">Rehearsal / {stage.practiceTimeMin} min</h4>
                  <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">{stage.exercise}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold">Ready to move on when</h4>
                  <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-slate-700 dark:text-slate-300">
                    {stage.readinessChecks.map((check) => <li key={check}>{check}</li>)}
                  </ul>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}