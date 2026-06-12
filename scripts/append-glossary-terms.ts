/**
 * Glossary fill: add terms for the 7 categories that previously had zero
 * glossary coverage (dotnet, java, python, migration, leadership, behavioral,
 * staff-plus). Idempotent.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const FILE = join(process.cwd(), "data", "glossary.json");

interface Reference {
  title: string;
  url: string;
}
interface GlossaryTerm {
  id: string;
  term: string;
  categoryIds: string[];
  plainEnglish?: string;
  definition: string;
  aliases?: string[];
  related?: string[];
  references?: Reference[];
}

const NEW_TERMS: GlossaryTerm[] = [
  // ---------------- .NET / C# ----------------
  {
    id: "clr",
    term: "Common Language Runtime (CLR)",
    categoryIds: ["dotnet"],
    plainEnglish:
      "The engine that actually runs your C# program: it compiles, manages memory, and handles exceptions so you don't have to.",
    definition:
      "The .NET virtual machine that executes managed code. It provides JIT compilation from IL to native code, automatic memory management via the garbage collector, type safety, exception handling, and thread management.",
    aliases: ["CLR"],
    related: ["garbage-collection-dotnet", "idisposable"],
  },
  {
    id: "garbage-collection-dotnet",
    term: "Garbage Collection (.NET)",
    categoryIds: ["dotnet"],
    plainEnglish:
      "Automatic cleanup of objects you stopped using, so you rarely free memory by hand. It works in 'generations' to stay fast.",
    definition:
      "The CLR's automatic memory reclamation. Objects are tracked across three generations (0, 1, 2); short-lived objects are collected cheaply in gen 0, long-lived survivors are promoted. Understanding generations explains why allocation churn is cheap but large/long-lived allocations are costly.",
    related: ["clr", "idisposable"],
  },
  {
    id: "idisposable",
    term: "IDisposable / using",
    categoryIds: ["dotnet"],
    plainEnglish:
      "A pattern for releasing things the GC can't handle — files, sockets, DB connections — deterministically with a `using` block.",
    definition:
      "An interface with a single `Dispose()` method for releasing unmanaged resources deterministically. The `using` statement guarantees `Dispose()` is called even on exceptions. Needed because the GC handles managed memory but not OS handles, connections, or streams.",
    related: ["garbage-collection-dotnet", "clr"],
  },
  {
    id: "configureawait",
    term: "ConfigureAwait(false)",
    categoryIds: ["dotnet"],
    plainEnglish:
      "A hint that says 'after this await, I don't need to come back to the original thread' — used in libraries to avoid deadlocks.",
    definition:
      "Tells an awaited task not to capture and resume on the original synchronization context. Used in library code to avoid context-capture deadlocks and reduce overhead. Has no effect in contexts without a synchronization context (e.g. ASP.NET Core).",
    related: ["idisposable"],
  },

  // ---------------- Java ----------------
  {
    id: "jvm",
    term: "Java Virtual Machine (JVM)",
    categoryIds: ["java"],
    plainEnglish:
      "The program that runs Java bytecode on any OS, handles memory, and speeds your code up as it runs.",
    definition:
      "The runtime that executes Java bytecode. It provides JIT compilation, garbage collection, the Java Memory Model, and platform independence ('write once, run anywhere'). The JVM also hosts other languages (Kotlin, Scala, Clojure).",
    aliases: ["JVM"],
    related: ["jmm", "garbage-collection-java", "virtual-threads"],
  },
  {
    id: "jmm",
    term: "Java Memory Model (JMM)",
    categoryIds: ["java"],
    plainEnglish:
      "The rulebook for what one thread is guaranteed to see of another thread's writes — the basis for `volatile` and `synchronized`.",
    definition:
      "The specification defining how threads interact through memory: visibility, ordering, and atomicity guarantees. It defines the happens-before relationship that `volatile`, `synchronized`, and `final` establish, preventing reordering surprises in concurrent code.",
    related: ["jvm", "virtual-threads"],
  },
  {
    id: "garbage-collection-java",
    term: "Garbage Collection (JVM)",
    categoryIds: ["java"],
    plainEnglish:
      "Automatic memory cleanup in the JVM. Modern collectors like G1 and ZGC aim for very short pauses.",
    definition:
      "The JVM's automatic memory reclamation. Collectors trade throughput against pause time: G1 (default, balanced), ZGC and Shenandoah (sub-millisecond pauses for large heaps), and Parallel (max throughput). Tuning targets pause-time goals and allocation rate.",
    related: ["jvm"],
  },
  {
    id: "virtual-threads",
    term: "Virtual Threads (Project Loom)",
    categoryIds: ["java"],
    plainEnglish:
      "Super-cheap threads (Java 21+) that let you write simple blocking code but scale to millions of concurrent tasks.",
    definition:
      "Lightweight, JVM-managed threads (Java 21+) that are cheap to create and block. They let blocking-style code scale to massive concurrency without the complexity of reactive/async APIs, by unmounting from carrier threads while blocked on I/O.",
    aliases: ["Project Loom"],
    related: ["jvm", "jmm"],
  },

  // ---------------- Python ----------------
  {
    id: "gil",
    term: "Global Interpreter Lock (GIL)",
    categoryIds: ["python"],
    plainEnglish:
      "A lock in CPython that lets only one thread run Python code at a time — why threads don't speed up CPU-bound work.",
    definition:
      "A mutex in CPython that allows only one thread to execute Python bytecode at once. It simplifies memory management but prevents true multi-core parallelism for CPU-bound threads; use multiprocessing or native extensions for CPU parallelism. (Python 3.13 introduces an experimental free-threaded build.)",
    aliases: ["GIL"],
    related: ["asyncio-event-loop"],
  },
  {
    id: "asyncio-event-loop",
    term: "asyncio Event Loop",
    categoryIds: ["python"],
    plainEnglish:
      "A single-threaded scheduler that juggles many I/O tasks by switching between them at `await` points.",
    definition:
      "The core of Python's asyncio: a single-threaded loop that runs coroutines, switching between them at `await` suspension points. It delivers high I/O concurrency on one thread, but any blocking/CPU-heavy call freezes the whole loop.",
    related: ["gil"],
  },
  {
    id: "context-manager",
    term: "Context Manager (with)",
    categoryIds: ["python"],
    plainEnglish:
      "The `with` block — it guarantees setup and cleanup (open/close, acquire/release) run even if an error happens.",
    definition:
      "An object implementing `__enter__`/`__exit__` (or built via `@contextmanager`) used with the `with` statement to guarantee resource acquisition and release, even on exceptions. Common for files, locks, DB sessions, and transactions.",
    related: ["asyncio-event-loop"],
  },
  {
    id: "duck-typing",
    term: "Duck Typing",
    categoryIds: ["python"],
    plainEnglish:
      "'If it walks like a duck and quacks like a duck...' — Python cares what an object can do, not what class it is.",
    definition:
      "A typing style where an object's suitability is determined by the presence of methods/attributes rather than its explicit type. Enables flexible, polymorphic code; `Protocol` types (PEP 544) add static checking to this dynamic pattern.",
    related: ["context-manager"],
  },

  // ---------------- Migration ----------------
  {
    id: "strangler-fig",
    term: "Strangler Fig Pattern",
    categoryIds: ["migration"],
    plainEnglish:
      "Replace a legacy system gradually by routing slices of traffic to new services until the old one can be switched off.",
    definition:
      "An incremental migration pattern (named by Martin Fowler) where a new system grows around the old one, intercepting and replacing functionality piece by piece until the legacy system is fully retired — avoiding a risky big-bang rewrite.",
    aliases: ["Strangler pattern"],
    related: ["anti-corruption-layer"],
    references: [
      {
        title: "Martin Fowler — StranglerFigApplication",
        url: "https://martinfowler.com/bliki/StranglerFigApplication.html",
      },
    ],
  },
  {
    id: "anti-corruption-layer",
    term: "Anti-Corruption Layer (ACL)",
    categoryIds: ["migration"],
    plainEnglish:
      "A translation layer that keeps a messy legacy model from leaking into your clean new system.",
    definition:
      "A DDD pattern that isolates a new system from a legacy or external model by translating between them, preventing the old model's concepts from corrupting the new design. Frequently paired with the Strangler Fig during migrations.",
    aliases: ["ACL"],
    related: ["strangler-fig"],
  },
  {
    id: "lift-and-shift",
    term: "Lift and Shift (Rehosting)",
    categoryIds: ["migration"],
    plainEnglish:
      "Move an app to the cloud as-is, with minimal changes — fast, but you don't get cloud-native benefits yet.",
    definition:
      "A cloud migration strategy (rehosting) that moves workloads to the cloud with little or no redesign. Fast and low-risk, but doesn't capture elasticity or managed-service benefits; often a first step before later replatforming or refactoring.",
    aliases: ["rehosting"],
    related: ["strangler-fig"],
    references: [
      {
        title: "Microsoft — Cloud migration approaches (5 Rs)",
        url: "https://learn.microsoft.com/azure/cloud-adoption-framework/migrate/",
      },
    ],
  },

  // ---------------- Leadership ----------------
  {
    id: "one-on-one",
    term: "1:1 (One-on-One)",
    categoryIds: ["leadership"],
    plainEnglish:
      "A regular private meeting between a manager and a report — the report's time to raise issues, growth, and blockers.",
    definition:
      "A recurring private meeting between a manager and a direct report, owned by the report's agenda. Used for unblocking, career growth, feedback, and trust-building — not status updates. A foundational management ritual.",
    aliases: ["1:1", "one-on-ones"],
    related: ["calibration", "pip"],
  },
  {
    id: "calibration",
    term: "Calibration",
    categoryIds: ["leadership"],
    plainEnglish:
      "A meeting where managers compare ratings across people so 'exceeds expectations' means the same thing everywhere.",
    definition:
      "A cross-manager process to normalize performance ratings and promotion decisions, reducing individual-manager bias and ensuring consistent standards across a team or org. Central to fair performance and promotion cycles.",
    related: ["one-on-one", "pip"],
  },
  {
    id: "pip",
    term: "Performance Improvement Plan (PIP)",
    categoryIds: ["leadership"],
    plainEnglish:
      "A formal, time-boxed plan with clear goals for an underperforming employee — improve or face consequences.",
    definition:
      "A structured, time-bound plan documenting specific performance gaps, expectations, and support, with defined check-ins. A formal HR step that should follow earlier informal feedback, not replace it.",
    aliases: ["PIP"],
    related: ["calibration", "one-on-one"],
  },
  {
    id: "engineer-manager-pendulum",
    term: "Engineer/Manager Pendulum",
    categoryIds: ["leadership"],
    plainEnglish:
      "The idea that you can swing between IC and management roles over a career, gaining from each side.",
    definition:
      "Charity Majors' concept that moving between individual-contributor and management tracks over a career is healthy, not a failure — each role refreshes skills the other erodes. Counters the myth that management is a one-way promotion.",
    related: ["one-on-one"],
    references: [
      {
        title: "Charity Majors — The Engineer/Manager Pendulum",
        url: "https://charity.wtf/2017/05/11/the-engineer-manager-pendulum/",
      },
    ],
  },

  // ---------------- Behavioral ----------------
  {
    id: "star-method",
    term: "STAR Method",
    categoryIds: ["behavioral"],
    plainEnglish:
      "A way to structure a behavioral answer: Situation, Task, Action, Result — so your story is clear and complete.",
    definition:
      "A framework for answering behavioral interview questions: Situation (context), Task (your responsibility), Action (what you specifically did), Result (quantified outcome). Often extended with Reflection (what you learned).",
    aliases: ["STAR", "STAR+R"],
    related: ["leadership-principles"],
  },
  {
    id: "leadership-principles",
    term: "Leadership Principles (LP)",
    categoryIds: ["behavioral"],
    plainEnglish:
      "Amazon's 16 values (Ownership, Customer Obsession, etc.) that interviewers explicitly grade your stories against.",
    definition:
      "Amazon's 16 cultural tenets used as the explicit rubric in behavioral interviews. Candidates are expected to map stories to specific principles. Many companies have analogous value frameworks scored in 'behavioral' or 'culture' rounds.",
    aliases: ["LP", "Amazon LP"],
    related: ["star-method", "bar-raiser"],
    references: [
      {
        title: "Amazon — Leadership Principles",
        url: "https://www.amazon.jobs/content/en/our-workplace/leadership-principles",
      },
    ],
  },
  {
    id: "bar-raiser",
    term: "Bar Raiser",
    categoryIds: ["behavioral"],
    plainEnglish:
      "A trained interviewer from outside the hiring team with veto power, there to keep the hiring bar high.",
    definition:
      "An Amazon (and similar at other firms) interview role: a trained, objective interviewer not on the hiring team who safeguards hiring quality and can veto an offer. Focuses heavily on Leadership Principles and long-term fit.",
    related: ["leadership-principles", "star-method"],
  },

  // ---------------- Staff+ IC ----------------
  {
    id: "rfc",
    term: "RFC (Request for Comments)",
    categoryIds: ["staff-plus"],
    plainEnglish:
      "A written proposal shared for feedback before building something significant — how senior engineers drive alignment.",
    definition:
      "A written technical proposal circulated for review before implementation, capturing context, options, trade-offs, and a recommendation. A primary tool for Staff+ engineers to build alignment and influence without authority across teams.",
    aliases: ["design doc"],
    related: ["adr", "tech-strategy"],
  },
  {
    id: "adr",
    term: "Architecture Decision Record (ADR)",
    categoryIds: ["staff-plus", "system-design"],
    plainEnglish:
      "A short, dated note recording one architectural decision and why you made it — so future teams understand the context.",
    definition:
      "A lightweight, immutable document capturing a single architectural decision: context, the decision, status, and consequences. Kept in version control alongside code so the rationale survives team turnover.",
    aliases: ["ADR"],
    related: ["rfc", "tech-strategy"],
    references: [
      {
        title: "Michael Nygard — Documenting Architecture Decisions",
        url: "https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions",
      },
    ],
  },
  {
    id: "tech-strategy",
    term: "Technical Strategy",
    categoryIds: ["staff-plus"],
    plainEnglish:
      "A multi-quarter plan for where the technology should go and why — the Staff+ deliverable beyond shipping features.",
    definition:
      "A coherent, multi-quarter direction connecting technical investments to business outcomes — naming the hard problems, sequencing bets, and creating leverage. A defining Staff+ output: setting direction, not just executing tasks.",
    related: ["rfc", "adr", "glue-work"],
  },
  {
    id: "glue-work",
    term: "Glue Work",
    categoryIds: ["staff-plus"],
    plainEnglish:
      "The unglamorous coordination — unblocking, reviewing, mentoring, aligning — that holds a project together but is easy to undervalue.",
    definition:
      "The non-feature work that keeps teams and projects functioning: facilitating decisions, reviewing designs, onboarding, cross-team coordination. High-leverage and a multiplier signal for Staff+, but often under-credited in promotion calibration.",
    related: ["tech-strategy", "rfc"],
    references: [
      {
        title: "Tanya Reilly — Being Glue",
        url: "https://noidea.dog/glue",
      },
    ],
  },
];

const existing = JSON.parse(readFileSync(FILE, "utf8")) as GlossaryTerm[];
const seen = new Set(existing.map((g) => g.id));
let added = 0;
for (const t of NEW_TERMS) {
  if (seen.has(t.id)) {
    console.log(`skip ${t.id} (already present)`);
    continue;
  }
  existing.push(t);
  seen.add(t.id);
  added++;
}
writeFileSync(FILE, JSON.stringify(existing, null, 2) + "\n");
console.log(`Added ${added} glossary terms; file now has ${existing.length} total.`);
