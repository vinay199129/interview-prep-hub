"use client";

import { useEffect, useState } from "react";
import type { ExperienceBand } from "./types";

export type ProfileRole =
  | "ai-engineer"
  | "backend"
  | "frontend"
  | "data"
  | "fullstack"
  | "other";

export const PROFILE_ROLES: { id: ProfileRole; label: string }[] = [
  { id: "ai-engineer", label: "AI Engineer" },
  { id: "backend", label: "Backend Engineer" },
  { id: "frontend", label: "Frontend Engineer" },
  { id: "fullstack", label: "Fullstack Engineer" },
  { id: "data", label: "Data / ML Engineer" },
  { id: "other", label: "Other" },
];

export interface Profile {
  name?: string;
  role?: ProfileRole;
  experienceBand?: ExperienceBand;
  targetTrackIds?: string[];
  welcomeAcknowledged: boolean;
  isGuest: boolean;
  createdAt?: number;
  updatedAt?: number;
}

const KEY = "iph:profile:v1";
const EVENT = "iph:profile:change";

// All localStorage keys this app writes (used for "Clear everything").
export const TRACKING_KEYS = [
  "iph:profile:v1",
  "iph:progress:v1",
  "iph:interview:v1",
  "iph:srs:v1",
] as const;

const EMPTY: Profile = { welcomeAcknowledged: false, isGuest: false };

function safeRead(): Profile {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return EMPTY;
    return { ...EMPTY, ...(parsed as Profile) };
  } catch {
    return EMPTY;
  }
}

function safeWrite(p: Profile) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    /* ignore quota / privacy-mode errors */
  }
  window.dispatchEvent(new Event(EVENT));
}

export function getProfile(): Profile {
  return safeRead();
}

export function setProfile(
  updater: Profile | ((prev: Profile) => Profile),
): Profile {
  const current = safeRead();
  const next =
    typeof updater === "function"
      ? (updater as (p: Profile) => Profile)(current)
      : updater;
  const stamped: Profile = {
    ...next,
    createdAt: current.createdAt ?? Date.now(),
    updatedAt: Date.now(),
  };
  safeWrite(stamped);
  return stamped;
}

export function clearProfile() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
  window.dispatchEvent(new Event(EVENT));
}

export function clearKey(key: (typeof TRACKING_KEYS)[number]) {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(key);
  window.dispatchEvent(new Event(EVENT));
}

export function clearAllTracking() {
  if (typeof window === "undefined") return;
  for (const k of TRACKING_KEYS) window.localStorage.removeItem(k);
  window.dispatchEvent(new Event(EVENT));
}

/** Reactive hook. Starts EMPTY on first render (server + client) to avoid hydration mismatch. */
export function useProfile(): { profile: Profile; ready: boolean } {
  const [profile, setLocal] = useState<Profile>(EMPTY);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setLocal(safeRead());
    setReady(true);
    const handler = () => setLocal(safeRead());
    window.addEventListener(EVENT, handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener(EVENT, handler);
      window.removeEventListener("storage", handler);
    };
  }, []);
  return { profile, ready };
}

export function getInitials(p: Profile): string {
  if (!p.name || p.isGuest) return p.isGuest ? "G" : "?";
  const parts = p.name.trim().split(/\s+/).slice(0, 2);
  const initials = parts.map((s) => s[0]?.toUpperCase() ?? "").join("");
  return initials || "?";
}

export interface StorageCounts {
  progress: number;
  interview: number;
  srs: number;
}

export function getStorageCounts(): StorageCounts {
  if (typeof window === "undefined") return { progress: 0, interview: 0, srs: 0 };
  const count = (key: string): number => {
    try {
      const raw = window.localStorage.getItem(key);
      if (!raw) return 0;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed.length;
      if (parsed && typeof parsed === "object") return Object.keys(parsed).length;
      return 0;
    } catch {
      return 0;
    }
  };
  return {
    progress: count("iph:progress:v1"),
    interview: count("iph:interview:v1"),
    srs: count("iph:srs:v1"),
  };
}
