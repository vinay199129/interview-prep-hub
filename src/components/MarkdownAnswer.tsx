"use client";

import { Children, isValidElement, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { CopyButton } from "./CopyButton";

function extractText(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return extractText(node.props.children);
  }
  return "";
}

function isTldrLabel(node: ReactNode): boolean {
  if (!isValidElement<{ children?: ReactNode }>(node)) return false;
  if (node.type !== "strong") return false;
  const t = extractText(node.props.children).trim();
  // Accept "TL;DR.", "TL;DR", "tl;dr." case-insensitively.
  return /^tl;?dr\.?$/i.test(t);
}

export function MarkdownAnswer({ children }: { children: string }) {
  return (
    <div className="prose-answer text-sm">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          p: ({ children: pChildren, ...rest }) => {
            const arr = Children.toArray(pChildren);
            const first = arr[0];
            if (first && isTldrLabel(first)) {
              // Strip immediately-following whitespace text node (the space after **TL;DR.**)
              const rest2 = arr.slice(1);
              const trimmed = rest2[0];
              if (typeof trimmed === "string") {
                rest2[0] = trimmed.replace(/^\s+/, "");
              }
              return (
                <div
                  className="not-prose mb-3 rounded-md border-l-4 border-brand-500 bg-brand-50 dark:bg-brand-900/20 px-3 py-2"
                  role="note"
                  aria-label="Summary"
                >
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-brand-700 dark:text-brand-200 mb-0.5">
                    TL;DR
                  </div>
                  <div className="text-slate-700 dark:text-slate-200 leading-snug">
                    {rest2}
                  </div>
                </div>
              );
            }
            return <p {...rest}>{pChildren}</p>;
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
        {children}
      </ReactMarkdown>
    </div>
  );
}
