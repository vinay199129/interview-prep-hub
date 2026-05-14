"use client";

import { useCallback, useEffect, useState } from "react";

export type Grade = "again" | "hard" | "good" | "easy";

export interface SrsCard {
  ease: number; // 1.3 .. 3.0
  interval: number; // days
  reps: number;
  dueAt: number; // epoch ms
  lastReviewedAt: number;
  lapses: number;
}

export type SrsMap = Record<string, SrsCard>;

const STORAGE_KEY = "iph:srs:v1";
const EVENT = "iph:srs-change";
const DAY_MS = 24 * 60 * 60 * 1000;

function read(): SrsMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SrsMap) : {};
  } catch {
    return {};
  }
}

function write(m: SrsMap) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(m));
  } catch {
    // ignore
  }
}

export function newCard(now = Date.now()): SrsCard {
  return {
    ease: 2.5,
    interval: 0,
    reps: 0,
    dueAt: now,
    lastReviewedAt: 0,
    lapses: 0,
  };
}

export function applyGrade(card: SrsCard, grade: Grade, now = Date.now()): SrsCard {
  const c: SrsCard = { ...card, lastReviewedAt: now };
  if (grade === "again") {
    c.reps = 0;
    c.interval = 0;
    c.ease = Math.max(1.3, c.ease - 0.2);
    c.lapses += 1;
    c.dueAt = now + 10 * 60 * 1000; // 10 min
    return c;
  }
  if (grade === "hard") {
    c.ease = Math.max(1.3, c.ease - 0.15);
    c.interval = c.reps === 0 ? 1 : Math.max(1, Math.round(c.interval * 1.2));
  } else if (grade === "good") {
    if (c.reps === 0) c.interval = 1;
    else if (c.reps === 1) c.interval = 3;
    else c.interval = Math.max(1, Math.round(c.interval * c.ease));
  } else {
    c.ease = Math.min(3.0, c.ease + 0.15);
    if (c.reps === 0) c.interval = 2;
    else if (c.reps === 1) c.interval = 5;
    else c.interval = Math.max(1, Math.round(c.interval * c.ease * 1.3));
  }
  c.reps += 1;
  c.dueAt = now + c.interval * DAY_MS;
  return c;
}

export function isDue(card: SrsCard | undefined, now = Date.now()): boolean {
  if (!card) return true; // never seen = due
  return card.dueAt <= now;
}

export interface SrsBuckets {
  due: number;
  learning: number; // reps>0 && interval<7
  mature: number; // interval>=7
  unseen: number;
}

export function bucket(allIds: string[], map: SrsMap, now = Date.now()): SrsBuckets {
  let due = 0,
    learning = 0,
    mature = 0,
    unseen = 0;
  for (const id of allIds) {
    const c = map[id];
    if (!c) {
      unseen += 1;
      continue;
    }
    if (c.dueAt <= now) due += 1;
    if (c.reps > 0 && c.interval < 7) learning += 1;
    if (c.interval >= 7) mature += 1;
  }
  return { due, learning, mature, unseen };
}

export function useSrs() {
  const [map, setMap] = useState<SrsMap>({});

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

  const review = useCallback((id: string, grade: Grade) => {
    const current = read();
    const card = current[id] ?? newCard();
    const next = { ...current, [id]: applyGrade(card, grade) };
    write(next);
    setMap(next);
    window.dispatchEvent(new Event(EVENT));
  }, []);

  const resetCard = useCallback((id: string) => {
    const current = read();
    if (!(id in current)) return;
    const { [id]: _removed, ...rest } = current;
    void _removed;
    write(rest);
    setMap(rest);
    window.dispatchEvent(new Event(EVENT));
  }, []);

  const clearAll = useCallback(() => {
    write({});
    setMap({});
    window.dispatchEvent(new Event(EVENT));
  }, []);

  return { map, review, resetCard, clearAll };
}

export const GRADE_LABEL: Record<Grade, string> = {
  again: "Again",
  hard: "Hard",
  good: "Good",
  easy: "Easy",
};

export const GRADE_BUTTON: Record<Grade, string> = {
  again:
    "border-rose-300 dark:border-rose-700 text-rose-800 dark:text-rose-200 hover:bg-rose-50 dark:hover:bg-rose-950/40",
  hard:
    "border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-200 hover:bg-amber-50 dark:hover:bg-amber-950/40",
  good:
    "border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/40",
  easy:
    "border-sky-300 dark:border-sky-700 text-sky-800 dark:text-sky-200 hover:bg-sky-50 dark:hover:bg-sky-950/40",
};

export function previewInterval(card: SrsCard | undefined, grade: Grade): string {
  const base = card ?? newCard();
  const next = applyGrade(base, grade);
  if (grade === "again") return "10m";
  if (next.interval < 1) return "<1d";
  if (next.interval === 1) return "1d";
  if (next.interval < 30) return `${next.interval}d`;
  if (next.interval < 365) return `${Math.round(next.interval / 30)}mo`;
  return `${(next.interval / 365).toFixed(1)}y`;
}
