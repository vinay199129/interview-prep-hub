"use client";

import { useState } from "react";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={copied ? "Copied" : "Copy code"}
      className="absolute top-2 right-2 text-[10px] uppercase tracking-wide px-2 py-0.5 rounded border border-slate-600 bg-slate-800/80 text-slate-200 hover:bg-slate-700 transition opacity-0 group-hover:opacity-100 focus:opacity-100"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
