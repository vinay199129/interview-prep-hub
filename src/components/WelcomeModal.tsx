"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  PROFILE_ROLES,
  setProfile,
  useProfile,
  type Profile,
  type ProfileRole,
} from "@/lib/profile";
import type { ExperienceBand } from "@/lib/types";
import { useFocusTrap } from "./useFocusTrap";

const BANDS: { id: ExperienceBand; label: string }[] = [
  { id: "junior", label: "Junior (0–2 yrs)" },
  { id: "mid", label: "Mid (3–5 yrs)" },
  { id: "senior", label: "Senior (6–10 yrs)" },
  { id: "lead", label: "Lead / Staff (10+ yrs)" },
];

export function WelcomeModal() {
  const { profile, ready } = useProfile();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState<ProfileRole | "">("");
  const [band, setBand] = useState<ExperienceBand | "">("");
  const panelRef = useRef<HTMLDivElement>(null);
  useFocusTrap(panelRef, open, () => setOpen(false));

  useEffect(() => {
    if (!ready) return;
    setOpen(!profile.welcomeAcknowledged);
  }, [ready, profile.welcomeAcknowledged]);

  if (!open) return null;

  const save = () => {
    const next: Profile = {
      welcomeAcknowledged: true,
      isGuest: false,
      name: name.trim() || undefined,
      role: role || undefined,
      experienceBand: band || undefined,
    };
    setProfile(next);
    setOpen(false);
  };

  const continueAsGuest = () => {
    setProfile({
      welcomeAcknowledged: true,
      isGuest: true,
    });
    setOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
    >
      <div ref={panelRef} className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-xl shadow-card-hover border border-slate-200 dark:border-slate-700 p-6 space-y-4">
        <div>
          <h2
            id="welcome-modal-title"
            className="text-xl font-semibold text-slate-900 dark:text-slate-100"
          >
            Welcome to Interview Prep Hub
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Tell us a bit about you and we&rsquo;ll personalize tracks, defaults
            in Interviewer Mode, and progress tracking. Everything stays in
            your browser&rsquo;s local storage — nothing is sent to a server.
          </p>
        </div>

        <div className="space-y-3">
          <label className="block text-sm">
            <span className="text-slate-700 dark:text-slate-300">Display name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Vinay"
              className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </label>

          <label className="block text-sm">
            <span className="text-slate-700 dark:text-slate-300">Role</span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as ProfileRole | "")}
              className="mt-1 w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="">Choose…</option>
              {PROFILE_ROLES.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.label}
                </option>
              ))}
            </select>
          </label>

          <fieldset className="text-sm">
            <legend className="text-slate-700 dark:text-slate-300 mb-1">
              Experience band
            </legend>
            <div className="grid grid-cols-2 gap-2">
              {BANDS.map((b) => (
                <label
                  key={b.id}
                  className={`flex items-center gap-2 rounded-md border px-3 py-2 cursor-pointer text-xs ${
                    band === b.id
                      ? "border-brand-500 bg-brand-50 dark:bg-brand-900/30"
                      : "border-slate-300 dark:border-slate-700 hover:border-brand-400"
                  }`}
                >
                  <input
                    type="radio"
                    name="band"
                    value={b.id}
                    checked={band === b.id}
                    onChange={() => setBand(b.id)}
                    className="accent-brand-600"
                  />
                  <span>{b.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400">
          You can edit or clear this anytime from your{" "}
          <Link href="/profile" className="underline" onClick={() => setOpen(false)}>
            profile page
          </Link>
          .
        </p>

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={continueAsGuest}
            className="px-4 py-2 text-sm rounded-md border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Continue as guest
          </button>
          <button
            type="button"
            onClick={save}
            className="px-4 py-2 text-sm rounded-md bg-brand-600 text-white hover:bg-brand-700"
          >
            Save and continue
          </button>
        </div>
      </div>
    </div>
  );
}
