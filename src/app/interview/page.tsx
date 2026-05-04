import { Suspense } from "react";
import { InterviewClient } from "@/components/InterviewClient";
import {
  getAllQuestions,
  getCategories,
  getCriteria,
  getTracks,
} from "@/lib/data";

export default function InterviewPage() {
  const questions = getAllQuestions();
  const categories = getCategories();
  const tracks = getTracks();
  const criteria = getCriteria();
  return (
    <Suspense fallback={null}>
      <InterviewClient
        questions={questions}
        categories={categories}
        tracks={tracks}
        criteria={criteria}
      />
    </Suspense>
  );
}
