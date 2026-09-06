"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export interface NavMoreItem {
  href: string;
  label: string;
  /** Optional one-line hint shown under the label. */
  desc?: string;
}

interface Props {
  items: NavMoreItem[];
  label?: string;
  /** Which edge of the trigger the dropdown is anchored to. */
  align?: "left" | "right";
}

export function NavMore({ items, label = "More", align = "right" }: Props) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="sm:relative"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={`shrink-0 inline-flex items-center gap-1 rounded-md border px-2.5 py-1 transition ${
          open
            ? "border-brand-400 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-100"
            : "border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-100"
        }`}
      >
        {label}
        <span aria-hidden="true" className="text-[10px] leading-none">
          ▾
        </span>
      </button>
      {open && (
        <div
          role="menu"
          aria-label={label}
          className={`absolute top-full left-0 right-0 ${align === "left" ? "sm:right-auto" : "sm:left-auto"} mt-2 sm:w-56 max-h-[60vh] overflow-y-auto rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-card py-1 z-20`}
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="block px-3 py-1.5 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {item.label}
              {item.desc && (
                <span className="block text-xs text-slate-500 dark:text-slate-400">
                  {item.desc}
                </span>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
