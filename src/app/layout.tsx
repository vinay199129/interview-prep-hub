import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ProfileBadge } from "@/components/ProfileBadge";
import { WelcomeModal } from "@/components/WelcomeModal";
import { NavMore } from "@/components/NavMore";
import { NavLink } from "@/components/NavLink";

// Author / project links — update these to point at your real profiles.
const AUTHOR_NAME = "Vinay Pratap Singh Bhadauria";
const REPO_URL = "https://github.com/vinay-p-singh/interview-prep-hub";
const PROFILE_URL = "https://github.com/vinay-p-singh";
const PORTFOLIO_URL = "https://vinay-p-singh.github.io/portfolio/";

export const metadata: Metadata = {
  title: "Interview Prep Hub",
  description:
    "Curated, filterable interview prep hub for AI engineering: LLMs, RAG, agents, evaluation, MLOps, and more. For self-study and interviewer practice.",
  openGraph: {
    title: "Interview Prep Hub",
    description:
      "Curated, filterable interview prep hub for AI engineering, cloud, leadership and staff-IC interviews.",
    type: "website",
    siteName: "Interview Prep Hub",
  },
  twitter: { card: "summary" },
};

// Inline script: applies the persisted/system theme before paint to avoid FOUC.
const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}if(t==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-3 focus:py-2 focus:rounded focus:bg-brand-600 focus:text-white focus:shadow"
        >
          Skip to content
        </a>
        <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center gap-3 lg:gap-6">
            <Link
              href="/"
              className="font-semibold text-brand-700 dark:text-brand-100 text-base sm:text-lg shrink-0"
            >
              Interview Prep Hub
            </Link>
            <nav aria-label="Main" className="relative order-last w-full flex flex-wrap items-center gap-2 text-sm lg:order-none lg:w-auto lg:flex-1">
                <NavLink href="/browse">Browse</NavLink>
                <NavMore
                  label="Prepare"
                  align="left"
                  items={[
                    { href: "/study-guide", label: "Study method", desc: "Revision plans, drills and readiness" },
                    { href: "/tracks", label: "Career tracks", desc: "Skill-set aligned paths" },
                    { href: "/roles", label: "Role focuses", desc: "Revise against a real JD" },
                    { href: "/leadership", label: "Senior & leadership", desc: "Behavioural, EM, Staff+" },
                    { href: "/patterns", label: "Company & region patterns", desc: "What each archetype probes" },
                  ]}
                />
                <NavMore
                  label="Guides"
                  align="left"
                  items={[
                    { href: "/agentic-ai", label: "Agentic AI architect", desc: "Deep-dive modules" },
                    { href: "/airlines", label: "Airlines & aviation", desc: "Carrier-by-carrier prep" },
                    { href: "/skills-prep", label: "Skills prep", desc: "Close specific gaps" },
                    { href: "/last-mile", label: "Last-mile delivery EM", desc: "UAE / MENA logistics interviews" },
                  ]}
                />
                <NavMore
                  label="Practice"
                  align="left"
                  items={[
                    { href: "/practice", label: "Flashcards", desc: "Self-test with progress" },
                    { href: "/interview", label: "Run an interview", desc: "Build a panel set" },
                    { href: "/criteria", label: "Evaluation criteria", desc: "The 9-point scorecard" },
                  ]}
                />
              <NavMore
                label="Resources"
                items={[
                  { href: "/glossary", label: "Glossary" },
                  { href: "/about", label: "About" },
                ]}
              />
            </nav>
            <div className="ml-auto shrink-0 flex items-center gap-2 lg:ml-0">
              <ThemeToggle />
              <ProfileBadge />
            </div>
          </div>
        </header>
        <main id="main-content" className="flex-1 max-w-6xl mx-auto w-full px-6 py-6">
          {children}
        </main>
        <WelcomeModal />
        <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-500 dark:text-slate-400">
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row gap-2 sm:gap-4 sm:items-center sm:justify-between">
            <div>
              Built by{" "}
              <a
                href={PORTFOLIO_URL}
                target="_blank"
                rel="noreferrer"
                className="text-brand-600 dark:text-brand-100 hover:underline"
              >
                {AUTHOR_NAME}
              </a>
              {" · "}
              <a
                href={REPO_URL}
                target="_blank"
                rel="noreferrer"
                className="text-brand-600 dark:text-brand-100 hover:underline"
              >
                GitHub
              </a>
              {" · "}
              <a
                href={PROFILE_URL}
                target="_blank"
                rel="noreferrer"
                className="text-brand-600 dark:text-brand-100 hover:underline"
              >
                Profile
              </a>
              {" · "}
              <Link href="/about" className="text-brand-600 dark:text-brand-100 hover:underline">
                About &amp; disclaimer
              </Link>
            </div>
            <div className="text-slate-400 dark:text-slate-500">
              Personal study project — not affiliated with Microsoft or any employer. See{" "}
              <Link href="/about" className="underline hover:text-brand-600 dark:hover:text-brand-100">
                About
              </Link>{" "}for fair-use terms.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
