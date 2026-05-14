"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  onConfirm: () => void;
  label: string;
  confirmingLabel?: string;
  className?: string;
  destructive?: boolean;
  /** Auto-revert after this many ms if user doesn't click again. Default 4000. */
  revertMs?: number;
}

/**
 * Two-step inline confirm: first click reveals "Confirm?" state; second click
 * fires onConfirm. Auto-reverts after `revertMs` to avoid accidental commits.
 */
export function ConfirmButton({
  onConfirm,
  label,
  confirmingLabel = "Click again to confirm",
  className = "",
  destructive = false,
  revertMs = 4000,
}: Props) {
  const [armed, setArmed] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const arm = () => {
    setArmed(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setArmed(false), revertMs);
  };

  const baseTone = destructive
    ? "text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-700"
    : "text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700";
  const armedTone = destructive
    ? "bg-rose-600 text-white border-rose-700"
    : "bg-brand-600 text-white border-brand-700";

  return (
    <button
      type="button"
      onClick={() => {
        if (!armed) {
          arm();
          return;
        }
        if (timerRef.current) clearTimeout(timerRef.current);
        setArmed(false);
        onConfirm();
      }}
      aria-pressed={armed}
      className={`${armed ? armedTone : baseTone} border rounded px-2 py-1 text-xs transition ${className}`}
    >
      {armed ? confirmingLabel : label}
    </button>
  );
}
