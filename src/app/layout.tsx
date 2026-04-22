import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "Interview Hub",
  description:
    "Curated, filterable interview question bank for POD 1 (.NET), POD 2 (Java), and POD 3 (Python + AI) on Azure.",
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
        <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-6">
            <Link
              href="/"
              className="font-semibold text-brand-700 dark:text-brand-100 text-lg"
            >
              Interview Hub
            </Link>
            <nav className="flex gap-4 text-sm">
              <Link
                href="/"
                className="hover:text-brand-600 dark:hover:text-brand-100"
              >
                Home
              </Link>
              <Link
                href="/browse"
                className="hover:text-brand-600 dark:hover:text-brand-100"
              >
                Browse Questions
              </Link>
              <Link
                href="/pods/pod1"
                className="hover:text-brand-600 dark:hover:text-brand-100"
              >
                POD 1
              </Link>
              <Link
                href="/pods/pod2"
                className="hover:text-brand-600 dark:hover:text-brand-100"
              >
                POD 2
              </Link>
              <Link
                href="/pods/pod3"
                className="hover:text-brand-600 dark:hover:text-brand-100"
              >
                POD 3
              </Link>
              <Link
                href="/criteria"
                className="hover:text-brand-600 dark:hover:text-brand-100"
              >
                Evaluation Criteria
              </Link>
            </nav>
            <ThemeToggle />
          </div>
        </header>
        <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-6">
          {children}
        </main>
        <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-500 dark:text-slate-400">
          <div className="max-w-6xl mx-auto px-6 py-3">
            Interview Hub — content for internal hiring & self-prep.
          </div>
        </footer>
      </body>
    </html>
  );
}
