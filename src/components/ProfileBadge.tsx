"use client";

import Link from "next/link";
import { getInitials, useProfile } from "@/lib/profile";

export function ProfileBadge() {
  const { profile, ready } = useProfile();
  // Render a stable placeholder until hydrated to avoid mismatch.
  const initials = ready ? getInitials(profile) : "·";
  const label = ready
    ? profile.isGuest
      ? "Guest profile"
      : profile.name
        ? `Profile: ${profile.name}`
        : "Set up profile"
    : "Profile";

  return (
    <Link
      href="/profile"
      title={label}
      aria-label={label}
      className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-100 text-sm font-semibold border border-brand-200 dark:border-brand-800 hover:bg-brand-200 dark:hover:bg-brand-900/70 transition-colors"
    >
      {initials}
    </Link>
  );
}
