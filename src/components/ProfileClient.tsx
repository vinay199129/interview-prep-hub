"use client";

import { useEffect, useState } from "react";
import {
  PROFILE_ROLES,
  clearAllTracking,
  clearKey,
  clearProfile,
  getStorageCounts,
  setProfile,
  useProfile,
  type ProfileRole,
  type StorageCounts,
} from "@/lib/profile";
import type { ExperienceBand, Track } from "@/lib/types";

const BANDS: { id: ExperienceBand; label: string }[] = [
  { id: "junior", label: "Junior (0–2 yrs)" },
  { id: "mid", label: "Mid (3–5 yrs)" },
  { id: "senior", label: "Senior (6–10 yrs)" },
  { id: "lead", label: "Lead / Staff (10+ yrs)" },
];

export function ProfileClient({ tracks }: { tracks: Track[] }) {
  const { profile, ready } = useProfile();
  const [name, setName] = useState("");
  const [role, setRole] = useState<ProfileRole | "">("");
  const [band, setBand] = useState<ExperienceBand | "">("");
  const [trackIds, setTrackIds] = useState<string[]>([]);
  const [counts, setCounts] = useState<StorageCounts>({
    progress: 0,
    interview: 0,
    srs: 0,
  });
  const [savedFlash, setSavedFlash] = useState(false);

  // Hydrate form from profile on first ready and whenever it changes externally.
  useEffect(() => {
    if (!ready) return;
    setName(profile.name ?? "");
    setRole(profile.role ?? "");
    setBand(profile.experienceBand ?? "");
    setTrackIds(profile.targetTrackIds ?? []);
    setCounts(getStorageCounts());
  }, [ready, profile]);

  const toggleTrack = (id: string) => {
    setTrackIds((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    );
  };

  const save = () => {
    setProfile({
      welcomeAcknowledged: true,
      isGuest: !name.trim() && !role && !band && trackIds.length === 0,
      name: name.trim() || undefined,
      role: role || undefined,
      experienceBand: band || undefined,
      targetTrackIds: trackIds.length ? trackIds : undefined,
    });
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1500);
  };

  const switchToGuest = () => {
    if (!confirm("Reset your profile to Guest? Your progress data will be kept.")) return;
    setProfile({ welcomeAcknowledged: true, isGuest: true });
  };

  const removeProfile = () => {
    if (!confirm("Delete your profile? You'll be re-prompted on next visit.")) return;
    clearProfile();
  };

  const wipeProgress = () => {
    if (!confirm("Clear question progress (known / review / unknown marks)?")) return;
    clearKey("iph:progress:v1");
    setCounts(getStorageCounts());
  };

  const wipeInterview = () => {
    if (!confirm("Clear Interviewer Mode session and scoresheet data?")) return;
    clearKey("iph:interview:v1");
    setCounts(getStorageCounts());
  };

  const wipeSrs = () => {
    if (!confirm("Clear Practice / spaced-repetition history?")) return;
    clearKey("iph:srs:v1");
    setCounts(getStorageCounts());
  };

  const wipeEverything = () => {
    if (
      !confirm(
        "Clear EVERYTHING (profile, progress, interview, practice)? This cannot be undone.",
      )
    )
      return;
    clearAllTracking();
    setCounts(getStorageCounts());
  };

  if (!ready) {
    return (
      <div className="text-sm text-slate-500 dark:text-slate-400">Loading…</div>
    );
  }

  const status = profile.isGuest
    ? "Browsing as Guest"
    : profile.name
      ? `Signed in locally as ${profile.name}`
      : "Profile not set";

  return (
    <div className="space-y-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Your profile
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {status}. All data lives only in your browser&rsquo;s local storage —
          nothing is sent to a server.
        </p>
      </header>

      {/* Profile editor */}
      <section className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4">
        <h2 className="text-lg font-semibold">Personalize</h2>

        <div className="grid sm:grid-cols-2 gap-4">
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
        </div>

        <fieldset className="text-sm">
          <legend className="text-slate-700 dark:text-slate-300 mb-1">
            Experience band
          </legend>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
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
          {band && (
            <button
              type="button"
              onClick={() => setBand("")}
              className="mt-2 text-xs text-slate-500 underline hover:text-slate-700 dark:hover:text-slate-300"
            >
              Clear band
            </button>
          )}
        </fieldset>

        <fieldset className="text-sm">
          <legend className="text-slate-700 dark:text-slate-300 mb-1">
            Target tracks (optional)
          </legend>
          <div className="grid sm:grid-cols-2 gap-2">
            {tracks.map((t) => (
              <label
                key={t.id}
                className={`flex items-start gap-2 rounded-md border px-3 py-2 cursor-pointer text-xs ${
                  trackIds.includes(t.id)
                    ? "border-brand-500 bg-brand-50 dark:bg-brand-900/30"
                    : "border-slate-300 dark:border-slate-700 hover:border-brand-400"
                }`}
              >
                <input
                  type="checkbox"
                  checked={trackIds.includes(t.id)}
                  onChange={() => toggleTrack(t.id)}
                  className="mt-0.5 accent-brand-600"
                />
                <span>
                  <span className="font-medium block">{t.shortName ?? t.name}</span>
                  <span className="text-slate-500 dark:text-slate-400">
                    {t.targetQuestionCount} questions
                  </span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="flex flex-wrap items-center gap-2 pt-2">
          <button
            type="button"
            onClick={save}
            className="px-4 py-2 text-sm rounded-md bg-brand-600 text-white hover:bg-brand-700"
          >
            Save profile
          </button>
          {savedFlash && (
            <span className="text-xs text-emerald-600 dark:text-emerald-400">
              Saved.
            </span>
          )}
          {!profile.isGuest && (
            <button
              type="button"
              onClick={switchToGuest}
              className="px-3 py-2 text-xs rounded-md border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Switch to Guest
            </button>
          )}
          <button
            type="button"
            onClick={removeProfile}
            className="px-3 py-2 text-xs rounded-md border border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-900/30"
          >
            Delete profile
          </button>
        </div>
      </section>

      {/* Tracking data */}
      <section className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4">
        <h2 className="text-lg font-semibold">Your tracking data</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Everything you do in Browse, Practice, and Interviewer Mode is stored
          locally. Clear individual datasets, or wipe everything.
        </p>

        <div className="grid sm:grid-cols-3 gap-3">
          <DataCard
            title="Question progress"
            count={counts.progress}
            unit="marks"
            description="Known / review / unknown marks from Browse and question pages."
            onClear={wipeProgress}
          />
          <DataCard
            title="Interviewer Mode"
            count={counts.interview}
            unit="fields"
            description="In-progress session, scoresheet ratings, candidate notes."
            onClear={wipeInterview}
          />
          <DataCard
            title="Practice (SRS)"
            count={counts.srs}
            unit="cards"
            description="Spaced-repetition history and due-date schedule."
            onClear={wipeSrs}
          />
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
          <button
            type="button"
            onClick={wipeEverything}
            className="px-4 py-2 text-sm rounded-md bg-rose-600 text-white hover:bg-rose-700"
          >
            Clear everything (profile + all tracking)
          </button>
        </div>
      </section>
    </div>
  );
}

function DataCard({
  title,
  count,
  unit,
  description,
  onClear,
}: {
  title: string;
  count: number;
  unit: string;
  description: string;
  onClear: () => void;
}) {
  const empty = count === 0;
  return (
    <div className="rounded-md border border-slate-200 dark:border-slate-800 p-3 flex flex-col gap-2">
      <div className="flex items-baseline justify-between">
        <h3 className="text-sm font-medium">{title}</h3>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {count} {unit}
        </span>
      </div>
      <p className="text-xs text-slate-600 dark:text-slate-400 flex-1">
        {description}
      </p>
      <button
        type="button"
        onClick={onClear}
        disabled={empty}
        className="self-start text-xs px-2 py-1 rounded-md border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Clear
      </button>
    </div>
  );
}
