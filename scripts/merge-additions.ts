import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const pods = ["pod1", "pod2", "pod3"];

for (const pod of pods) {
  const mainPath = join(root, "data", "questions", `${pod}.json`);
  const addPath = join(root, "data", "additions", `${pod}-add.json`);
  if (!existsSync(addPath)) continue;
  const main = JSON.parse(readFileSync(mainPath, "utf8")) as Array<{ id: string }>;
  const add = JSON.parse(readFileSync(addPath, "utf8")) as Array<{ id: string }>;
  const ids = new Set(main.map((q) => q.id));
  let added = 0;
  for (const q of add) {
    if (ids.has(q.id)) {
      console.log(`skip duplicate ${q.id}`);
      continue;
    }
    main.push(q);
    ids.add(q.id);
    added++;
  }
  writeFileSync(mainPath, JSON.stringify(main, null, 2) + "\n");
  console.log(`${pod}: +${added} → ${main.length}`);
}
