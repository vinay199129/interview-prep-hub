"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export interface NavMoreItem {
  href: string;
  label: string;
}

interface Props {
  items: NavMoreItem[];
  label?: string;
}

export function NavMore({ items, label = "More" }: Props) {
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
    <div ref={containerRef} className="relative">
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
          className="absolute right-0 mt-2 w-48 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-card py-1 z-20"
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
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
