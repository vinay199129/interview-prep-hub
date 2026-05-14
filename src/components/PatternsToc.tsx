"use client";

import { Children, isValidElement, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { CopyButton } from "./CopyButton";
import { slugify, type TocItem } from "@/lib/toc";

function extractText(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return extractText(node.props.children);
  }
  return "";
}

interface Props {
  markdown: string;
  toc: TocItem[];
}

export function PatternsToc({ markdown, toc }: Props) {
  // Stable, pure lookup: heading text → slug, computed once from the toc prop.
  // Falls back to slugify(text) if the heading isn't in the toc (defensive).
  const slugByText = new Map(toc.map((t) => [t.text, t.slug]));
  const slugFor = (text: string) => slugByText.get(text) ?? slugify(text);

  return (
    <div className="grid md:grid-cols-[220px_1fr] gap-6">
      <nav
        aria-label="On this page"
        className="md:sticky md:top-20 md:self-start text-sm space-y-1 max-h-[80vh] md:overflow-y-auto pr-2"
      >
        <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">
          On this page
        </div>
        <ul className="space-y-1">
          {toc.map((t) => (
            <li key={t.slug}>
              <a
                href={`#${t.slug}`}
                className="block text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-100 hover:underline underline-offset-4 leading-snug py-0.5"
              >
                {t.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="prose-answer text-sm min-w-0">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            h1: () => null,
            h2: ({ children }) => {
              const slug = slugFor(extractText(children));
              return (
                <h2 id={slug} className="scroll-mt-24 group">
                  <a
                    href={`#${slug}`}
                    className="no-underline hover:underline"
                  >
                    {children}
                  </a>
                </h2>
              );
            },
            pre: ({ children: preChildren, ...rest }) => {
              const codeText = Children.toArray(preChildren)
                .map(extractText)
                .join("");
              return (
                <pre className="relative group" {...rest}>
                  <CopyButton text={codeText} />
                  {preChildren}
                </pre>
              );
            },
          }}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </div>
  );
}
