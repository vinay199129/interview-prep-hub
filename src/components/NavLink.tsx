"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

function normalize(p: string): string {
  return p.replace(/\/+$/, "") || "/";
}

export function NavLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isActive = normalize(pathname) === normalize(href);
  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`hover:text-brand-600 dark:hover:text-brand-100 ${
        isActive
          ? "text-brand-700 dark:text-brand-100 font-semibold underline underline-offset-4 decoration-2"
          : ""
      }`}
    >
      {children}
    </Link>
  );
}
