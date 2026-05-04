"use client";

import { useCallback, useEffect, useState } from "react";

export type Status = "known" | "review" | "unknown";
export type StatusFilter = "all" | "unseen" | Status;

const STORAGE_KEY = "iph:progress:v1";

type ProgressMap = Record<string, Status>;

function read(): ProgressMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ProgressMap) : {};
  } catch {
    return {};
  }
}

function write(map: ProgressMap) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    // ignore quota / private mode
  }
}

const EVENT = "iph:progress-change";

export function useProgress() {
  const [map, setMap] = useState<ProgressMap>({});

  useEffect(() => {
    setMap(read());
    const onChange = () => setMap(read());
    window.addEventListener(EVENT, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(EVENT, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  const setStatus = useCallback((id: string, status: Status | null) => {
    const next = read();
    if (status === null) delete next[id];
    else next[id] = status;
    write(next);
    setMap(next);
    window.dispatchEvent(new Event(EVENT));
  }, []);

  const clearAll = useCallback(() => {
    write({});
    setMap({});
    window.dispatchEvent(new Event(EVENT));
  }, []);

  return { map, setStatus, clearAll };
}

export const STATUS_LABEL: Record<Status, string> = {
  known: "Got it",
  review: "Review later",
  unknown: "Didn't know",
};

export const STATUS_DOT: Record<Status, string> = {
  known: "bg-emerald-500",
  review: "bg-amber-500",
  unknown: "bg-rose-500",
};

export const STATUS_BUTTON: Record<Status, string> = {
  known:
    "border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/40",
  review:
    "border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-200 hover:bg-amber-50 dark:hover:bg-amber-950/40",
  unknown:
    "border-rose-300 dark:border-rose-700 text-rose-800 dark:text-rose-200 hover:bg-rose-50 dark:hover:bg-rose-950/40",
};

export const STATUS_BUTTON_ACTIVE: Record<Status, string> = {
  known: "bg-emerald-600 text-white border-emerald-600",
  review: "bg-amber-600 text-white border-amber-600",
  unknown: "bg-rose-600 text-white border-rose-600",
};
