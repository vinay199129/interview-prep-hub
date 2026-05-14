// Markdown TOC helpers — server-safe (no React, no client hooks).

export interface TocItem {
  text: string;
  slug: string;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

export function extractTopLevelHeadings(markdown: string): TocItem[] {
  const seen = new Set<string>();
  const out: TocItem[] = [];
  for (const line of markdown.split(/\r?\n/)) {
    const m = /^##\s+(.+?)\s*$/.exec(line);
    if (!m) continue;
    const text = m[1].replace(/[`*_]/g, "");
    const slug = slugify(text);
    if (!slug) continue;
    let unique = slug;
    let n = 2;
    while (seen.has(unique)) unique = `${slug}-${n++}`;
    seen.add(unique);
    out.push({ text, slug: unique });
  }
  return out;
}
