import { getAllQuestions, getPods } from "@/lib/data";
import { BrowseClient } from "@/components/BrowseClient";

export default function BrowsePage() {
  const pods = getPods();
  const questions = getAllQuestions();
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Browse questions</h1>
      <BrowseClient pods={pods} questions={questions} />
    </div>
  );
}
