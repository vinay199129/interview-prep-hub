"use client";

import { useRef } from "react";
import { useFocusTrap } from "./useFocusTrap";

interface Shortcut {
  keys: string;
  action: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  title?: string;
  shortcuts: Shortcut[];
}

export function ShortcutsHelp({ open, onClose, title = "Keyboard shortcuts", shortcuts }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(ref, open, onClose);

  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="shortcuts-help-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={ref}
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-xl shadow-card-hover border border-slate-200 dark:border-slate-700 p-5 space-y-3"
      >
        <div className="flex items-start justify-between">
          <h2
            id="shortcuts-help-title"
            className="text-base font-semibold text-slate-900 dark:text-slate-100"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 -mt-1 -mr-1 p-1"
          >
            ×
          </button>
        </div>
        <dl className="text-sm space-y-1.5">
          {shortcuts.map((s) => (
            <div key={s.keys} className="flex items-center gap-3">
              <dt className="font-mono text-xs px-1.5 py-0.5 rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 min-w-[3rem] text-center">
                {s.keys}
              </dt>
              <dd className="text-slate-600 dark:text-slate-300">{s.action}</dd>
            </div>
          ))}
        </dl>
        <div className="text-xs text-slate-500 dark:text-slate-400 pt-1">
          Press <span className="font-mono">Esc</span> to close.
        </div>
      </div>
    </div>
  );
}
