import Link from "next/link";

const AUTHOR_NAME = "Vinay Pratap Singh Bhadauria";
const REPO_URL = "https://github.com/vinay-p-singh/interview-prep-hub";
const PROFILE_URL = "https://github.com/vinay-p-singh";
const PORTFOLIO_URL = "https://vinay-p-singh.github.io/portfolio/";

export const metadata = {
  title: "About — Interview Prep Hub",
};

const linkCls = "text-brand-600 dark:text-brand-100 hover:underline";

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mt-6 mb-2">
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
      {children}
    </p>
  );
}

function UL({ children }: { children: React.ReactNode }) {
  return (
    <ul className="list-disc list-inside text-sm leading-relaxed text-slate-700 dark:text-slate-300 space-y-1">
      {children}
    </ul>
  );
}

export default function AboutPage() {
  return (
    <article className="max-w-3xl space-y-3">
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
        About Interview Prep Hub
      </h1>
      <P>
        Interview Prep Hub is a personal, open study project. It curates
        interview-style questions across AI engineering, cloud platform work,
        and adjacent topics, with reference answers, listening cues, follow-up
        probes, and red flags. Two workflows sit on top of the question bank:
      </P>
      <UL>
        <li>
          <strong>Browse &amp; Practice</strong> — filter the bank, mark your
          progress, and run spaced-repetition self-study sessions.
        </li>
        <li>
          <strong>Interviewer Mode</strong> — build a session, take notes per
          question, fill in a generic scoresheet, and export the result as
          Markdown.
        </li>
      </UL>

      <H2>Credits</H2>
      <P>
        Built by{" "}
        <a href={PORTFOLIO_URL} target="_blank" rel="noreferrer" className={linkCls}>
          {AUTHOR_NAME}
        </a>
        . Source on{" "}
        <a href={REPO_URL} target="_blank" rel="noreferrer" className={linkCls}>
          GitHub
        </a>
        . More work on my{" "}
        <a href={PROFILE_URL} target="_blank" rel="noreferrer" className={linkCls}>
          GitHub profile
        </a>
        .
      </P>

      <H2>Disclaimer</H2>
      <P>
        This site is a personal project for study and interviewer practice. It
        is{" "}
        <strong>not affiliated with, endorsed by, or sponsored by Microsoft</strong>{" "}
        or any current or former employer. References to Azure, Microsoft 365,
        Microsoft Foundry, Microsoft Agent Framework, AKS, App Service, and
        other Microsoft products are descriptive only; product names belong to
        their respective owners.
      </P>
      <P>
        Reference answers reflect the author&apos;s opinion and reading of
        public documentation as of the page&apos;s last update. They are not a
        substitute for the official documentation, vendor support, or
        professional advice. Always cross-check with the linked sources before
        relying on guidance for production decisions or in real interviews.
      </P>

      <H2>Fair use</H2>
      <P>You are welcome to:</P>
      <UL>
        <li>Use this site for personal study or interview preparation.</li>
        <li>Use it as one input among many when planning interviews you run.</li>
        <li>Fork the repository and adapt the question bank for your team.</li>
      </UL>
      <P>Please do not:</P>
      <UL>
        <li>
          Republish the question bank verbatim as if it were your own original
          content.
        </li>
        <li>
          Use the site to grade real candidates without your own independent
          judgement — the rubric is intentionally generic.
        </li>
        <li>
          Treat reference answers as ground truth without checking the cited
          sources.
        </li>
      </UL>

      <H2>Privacy</H2>
      <P>
        All progress — question status, SRS reviews, interview sessions — is
        stored in your browser&apos;s{" "}
        <code className="px-1 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-xs">
          localStorage
        </code>
        . No accounts, no servers, no tracking. Clearing your browser data
        clears your progress.
      </P>

      <H2>Feedback</H2>
      <P>
        Spotted a wrong answer, a missing topic, or a UX issue? Open an issue
        or PR on the{" "}
        <a href={REPO_URL} target="_blank" rel="noreferrer" className={linkCls}>
          GitHub repository
        </a>
        .
      </P>

      <p className="text-sm text-slate-500 dark:text-slate-400 pt-3">
        <Link href="/" className="hover:underline">
          ← Back to home
        </Link>
      </p>
    </article>
  );
}
