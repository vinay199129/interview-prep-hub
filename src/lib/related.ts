import type { Question } from "./types";

const STOP_WORDS = new Set(
  "a an the how what why when where which who do does did is are was were you your for to of in on at and or with without vs versus that this it its as be been being by from into if then than but not no can could should would will shall may might must about over under between across explain describe give use used using write example examples design system application production".split(
    " ",
  ),
);

function tokenize(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9+#. ]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 2 && !STOP_WORDS.has(w)),
  );
}

function jaccard(a: Set<string>, b: Set<string>): number {
  let shared = 0;
  for (const t of a) if (b.has(t)) shared++;
  const union = a.size + b.size - shared;
  return union === 0 ? 0 : shared / union;
}

/**
 * The bank deliberately covers the same idea from several angles (e.g. MCP is
 * introduced under Agent Frameworks and revisited under Agents). Surfacing those
 * as explicit "related" links turns what reads as repetition into a study path,
 * so this is computed at build time rather than hand-authored.
 *
 * Scoring blends prompt-text overlap with shared categories and shared
 * domain-agnostic tags; region/pattern/role tags are ignored because almost
 * every question carries them and they would swamp the signal.
 */
export function getRelatedQuestions(
  target: Question,
  all: Question[],
  limit = 4,
): Question[] {
  const targetTokens = tokenize(`${target.prompt} ${target.subTopic ?? ""}`);
  const meaningfulTags = (q: Question) =>
    q.tags.filter((t) => !/^(region|pattern|role)-/.test(t));
  const targetTags = new Set(meaningfulTags(target));
  const targetCategories = new Set<string>(target.categoryIds);

  const scored = all
    .filter((q) => q.id !== target.id)
    .map((q) => {
      const textScore = jaccard(
        targetTokens,
        tokenize(`${q.prompt} ${q.subTopic ?? ""}`),
      );
      const tagScore = meaningfulTags(q).filter((t) => targetTags.has(t)).length;
      const categoryScore = q.categoryIds.filter((c) => targetCategories.has(c)).length;
      return { q, textScore, score: textScore * 3 + tagScore * 0.35 + categoryScore * 0.2 };
    })
    .filter((s) => s.textScore >= 0.12 && s.score > 0.45)
    .sort((a, b) => b.score - a.score || a.q.id.localeCompare(b.q.id));

  return scored.slice(0, limit).map((s) => s.q);
}
