"use client";

import { useCallback, useEffect, useState } from "react";

export type QuestionMark = "strong" | "partial" | "weak" | "skip";
export type Recommendation =
  | ""
  | "strong-hire"
  | "hire"
  | "lean-hire"
  | "lean-no-hire"
  | "no-hire";
export type Phase = "setup" | "session" | "scoresheet";

export interface CriterionScore {
  rating: 0 | 1 | 2 | 3 | 4 | 5; // 0 = not rated
  comment: string;
}

export interface SessionState {
  candidateName: string;
  interviewerName: string;
  trackId: string;
  questionIds: string[];
  currentIndex: number;
  marks: Record<string, QuestionMark>;
  notes: Record<string, string>;
  criteria: Record<number, CriterionScore>;
  recommendation: Recommendation;
  summary: string;
  startedAt: string;
  phase: Phase;
}

const STORAGE_KEY = "iph:interview:v1";
const EVENT = "iph:interview-change";

export function emptySession(): SessionState {
  return {
    candidateName: "",
    interviewerName: "",
    trackId: "",
    questionIds: [],
    currentIndex: 0,
    marks: {},
    notes: {},
    criteria: {},
    recommendation: "",
    summary: "",
    startedAt: "",
    phase: "setup",
  };
}

function read(): SessionState {
  if (typeof window === "undefined") return emptySession();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptySession();
    const parsed = JSON.parse(raw) as Partial<SessionState>;
    return { ...emptySession(), ...parsed };
  } catch {
    return emptySession();
  }
}

function write(s: SessionState) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {
    // ignore quota
  }
}

export function useInterview() {
  const [session, setSession] = useState<SessionState>(emptySession());

  useEffect(() => {
    setSession(read());
    const onChange = () => setSession(read());
    window.addEventListener(EVENT, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(EVENT, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  const update = useCallback((patch: Partial<SessionState> | ((s: SessionState) => SessionState)) => {
    const current = read();
    const next =
      typeof patch === "function" ? patch(current) : { ...current, ...patch };
    write(next);
    setSession(next);
    window.dispatchEvent(new Event(EVENT));
  }, []);

  const reset = useCallback(() => {
    const fresh = emptySession();
    write(fresh);
    setSession(fresh);
    window.dispatchEvent(new Event(EVENT));
  }, []);

  return { session, update, reset };
}

export const MARK_LABEL: Record<QuestionMark, string> = {
  strong: "Strong",
  partial: "Partial",
  weak: "Weak",
  skip: "Skipped",
};

export const MARK_DOT: Record<QuestionMark, string> = {
  strong: "bg-emerald-500",
  partial: "bg-amber-500",
  weak: "bg-rose-500",
  skip: "bg-slate-400",
};

export const MARK_BUTTON: Record<QuestionMark, string> = {
  strong:
    "border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/40",
  partial:
    "border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-200 hover:bg-amber-50 dark:hover:bg-amber-950/40",
  weak:
    "border-rose-300 dark:border-rose-700 text-rose-800 dark:text-rose-200 hover:bg-rose-50 dark:hover:bg-rose-950/40",
  skip:
    "border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60",
};

export const MARK_BUTTON_ACTIVE: Record<QuestionMark, string> = {
  strong: "bg-emerald-600 text-white border-emerald-600",
  partial: "bg-amber-600 text-white border-amber-600",
  weak: "bg-rose-600 text-white border-rose-600",
  skip: "bg-slate-600 text-white border-slate-600",
};

export const RECOMMENDATION_LABEL: Record<Recommendation, string> = {
  "": "— select —",
  "strong-hire": "Strong Hire",
  hire: "Hire",
  "lean-hire": "Lean Hire",
  "lean-no-hire": "Lean No-Hire",
  "no-hire": "No-Hire",
};
