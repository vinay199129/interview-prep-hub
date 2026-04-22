import { getPods, getCriteria, getAllQuestions } from "../src/lib/data";

function main() {
  const pods = getPods();
  const criteria = getCriteria();
  const questions = getAllQuestions();

  // Sanity: every podId on questions exists in pods.json
  const podIds = new Set(pods.map((p) => p.id));
  for (const q of questions) {
    for (const pid of q.podIds) {
      if (!podIds.has(pid)) {
        throw new Error(`Question ${q.id} references unknown pod ${pid}`);
      }
    }
  }

  console.log(`✓ ${pods.length} pods`);
  console.log(`✓ ${criteria.length} evaluation criteria`);
  console.log(`✓ ${questions.length} questions validated`);
  for (const p of pods) {
    const count = questions.filter((q) => q.podIds.includes(p.id)).length;
    console.log(`  - ${p.shortName}: ${count} questions`);
  }
}

try {
  main();
} catch (err) {
  console.error("Validation failed:", err);
  process.exit(1);
}
