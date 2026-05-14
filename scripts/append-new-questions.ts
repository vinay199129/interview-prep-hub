/**
 * One-shot script: append research-backed leadership, behavioural, staff-plus,
 * region-flavored, expert-tier and debugging questions to data/questions.migrated.json.
 *
 * Idempotent: skips any id already present.
 *
 * Run with:  npx tsx scripts/append-new-questions.ts
 * After:     npm run validate-data
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { Question } from "../src/lib/types";

const ROOT = process.cwd();
const FILE = join(ROOT, "data", "questions.migrated.json");

const NEW_QUESTIONS: Question[] = [
  // ---------------- LEADERSHIP / EM (10) ----------------
  {
    id: "lead-em-001",
    categoryIds: ["leadership", "behavioral"],
    topic: "IC → Manager transition",
    difficulty: "medium",
    experienceBands: ["senior", "lead"],
    type: "scenario",
    prompt: "Why do you want to be an engineering manager?",
    answer:
      "**TL;DR.** Charity Majors' framing applies: management is a *career change*, not a promotion. The right answer shows pull toward people-leverage, not push from an IC ceiling.\n\n**Strong answer** names a specific moment that energised you — running an onboarding, unblocking a peer, designing a hiring rubric — and articulates what you're trading off. Concrete: \"I noticed I get more done in a week of mentoring four engineers than in a week of writing code myself; I want to operationalise that.\" Honest acknowledgment that you'll lose hands-on code time. A 60-second philosophy in plain language: e.g. \"servant leadership: my job is to remove friction so my team can do its best work.\"\n\n**Trade-offs:** less direct technical output, decision-by-influence rather than decision-by-implementation, slower feedback loops on your own work, the pendulum is real (Majors).\n\n**Interview signal:** specificity of the trigger story; willingness to name the loss; a coherent philosophy in own words.",
    keyPoints: [
      "Pull toward people-leverage, not push from IC ceiling",
      "Specific energising moment, not abstract 'I like helping people'",
      "Honest acknowledgment of hands-on coding loss",
      "Coherent 60-second philosophy in plain language",
    ],
    followUps: [
      "What would make you pendulum back to IC?",
      "How will you maintain technical credibility?",
      "Walk me through a previous time you led without the title.",
    ],
    redFlags: [
      "Frames management as a promotion or pay bump",
      "Denies losing anything ('I can still code as a manager')",
      "Buzzword-soup philosophy with no specifics",
    ],
    references: [
      { title: "Charity Majors — The Engineer/Manager Pendulum", url: "https://charity.wtf/2017/05/11/the-engineer-manager-pendulum/" },
      { title: "Tech Interview Handbook — Behavioral Interviews", url: "https://www.techinterviewhandbook.org/behavioral-interview/" },
    ],
    tags: ["role-eng-manager", "region-global", "pattern-faang", "career-transition"],
    estimatedTimeMin: 8,
  },
  {
    id: "lead-em-002",
    categoryIds: ["leadership"],
    topic: "People management",
    subTopic: "Performance management",
    difficulty: "hard",
    experienceBands: ["senior", "lead"],
    type: "scenario",
    prompt: "Walk me through how you'd put a low performer on a PIP.",
    answer:
      "**TL;DR.** PIP is the *documentation* of a long conversation that has already happened; it should never be the first time the report hears the feedback.\n\n**Strong answer** runs:\n\n1. **Earlier intervention** — direct feedback in 1-on-1s with specific examples weeks/months before. Documented in writing each time.\n2. **HR + skip-level alignment** before the PIP is drafted — calibration on whether expectations are role-appropriate.\n3. **Written plan** with measurable goals, mid-point checkpoints, and a defined window (typically 30 / 60 / 90 days).\n4. **Genuine intent to succeed** — coaching cadence, paired work, scope adjustment if useful. Resources matched to the gap.\n5. **Stated stakes**, clearly. The report knows what \"meeting the plan\" looks like and what happens if they don't.\n6. **Outcome path** — they exit the plan successfully *or* transition out with dignity (severance, references where honest). Both outcomes are legitimate.\n\n**Trade-offs:** PIPs damage trust on the team if mishandled. Done well, they protect the bar and respect the person. Done badly, they are exit machines that everyone sees through.\n\n**Interview signal:** structure first, empathy threaded through, no euphemisms.",
    keyPoints: [
      "Documented earlier feedback conversations are a prerequisite",
      "HR + skip-level calibrated before drafting",
      "Measurable goals + checkpoints + defined window",
      "Genuine coaching support during the plan",
      "Both outcomes (succeed or exit) are legitimate endings",
    ],
    followUps: [
      "What if your skip disagrees with putting someone on a PIP?",
      "How do you handle the team's reaction during a PIP?",
      "What signals would make you skip the PIP and go straight to termination?",
    ],
    redFlags: [
      "PIP-as-surprise, no earlier feedback",
      "Framed as a punishment or exit mechanism only",
      "No HR or skip-level alignment",
      "Vague success criteria",
    ],
    references: [
      { title: "lethain — Performance Management System", url: "https://lethain.com/perf-management-system/" },
    ],
    tags: ["role-eng-manager", "region-global", "pattern-faang"],
    estimatedTimeMin: 12,
  },
  {
    id: "lead-em-003",
    categoryIds: ["leadership"],
    topic: "Hiring",
    subTopic: "Bar-raising",
    difficulty: "medium",
    experienceBands: ["senior", "lead"],
    type: "scenario",
    prompt: "Describe your hiring bar. How do you decide pass vs hire vs strong-hire?",
    answer:
      "**TL;DR.** Explicit, role-anchored criteria + a bar-raiser mindset (\"Would this hire raise the average?\") beats gut feel every time.\n\n**Strong answer** names a rubric tied to the leveling guide for the role: a small set of competencies (technical depth, scope of past work, collaboration, judgement, communication) each scored on a fixed scale with examples. Strong-hire = at least one signal of *outstanding* in a competency the team is short on; Hire = no critical gaps and clears the level bar; Pass = a single critical gap or pattern across multiple competencies.\n\nReference Amazon's bar-raiser principle (\"Hire and Develop the Best\") and Google's promo-committee lenses (complexity, leadership, scope) for how senior bars differ from junior. For Staff+, name the gap the team has and whether this candidate genuinely closes it — not just \"could grow into it\".\n\nDiversity considerations are part of the rubric, not a separate sidebar — structured interviews, calibrated panels, blind initial review.\n\n**Interview signal:** explicit criteria, *named* competencies, willingness to say no on a strong technical performer who lacks one critical signal.",
    keyPoints: [
      "Role-anchored rubric with named competencies",
      "Strong-hire requires an outstanding signal in a needed area",
      "Bar-raising mindset: would this raise the team average?",
      "Diversity built into structured rubric, not a sidebar",
    ],
    followUps: [
      "How do you avoid lowering the bar under hiring pressure?",
      "Walk me through the toughest pass-decision you made.",
      "How do you calibrate bar across multiple panels?",
    ],
    redFlags: [
      "'I know it when I see it'",
      "No criteria, pure gut",
      "Bar drops under volume pressure with no acknowledgment",
    ],
    references: [
      { title: "Amazon Leadership Principles", url: "https://www.amazon.jobs/content/en/our-workplace/leadership-principles" },
      { title: "interviewing.io — Amazon hiring & Bar Raiser", url: "https://interviewing.io/guides/hiring-process/amazon" },
    ],
    tags: ["role-eng-manager", "region-global", "pattern-faang"],
    estimatedTimeMin: 10,
  },
  {
    id: "lead-em-004",
    categoryIds: ["leadership"],
    topic: "Conflict resolution",
    difficulty: "medium",
    experienceBands: ["mid", "senior", "lead"],
    type: "scenario",
    prompt: "Two of your engineers are in conflict — one IC, one tech lead. What do you do?",
    answer:
      "**TL;DR.** Coach, don't referee. Separate conversations first, shared frame second, mediated conversation third — and only escalate if a pattern emerges.\n\n**Strong answer**:\n\n1. **Separate 1-on-1s within 24 hours.** Understand each perspective, the underlying need, and what each person has already tried. Listen for the *cause* (scope ambiguity, status anxiety, technical disagreement, personality friction) — most engineering conflicts have a process root.\n2. **Reframe to shared interest.** Almost always there's a common goal both want — ship the feature, ship it well, look good doing it. Surface that.\n3. **Mediated conversation** with both engineers, manager present as facilitator not judge. Each restates the other's position before they argue their own. Concrete next actions named, written down.\n4. **Follow up** in next 1-on-1s; check the pattern doesn't recur.\n5. **Escalate only on pattern** — first incidents almost never need HR.\n\n**Trade-offs:** intervening too early can stunt the engineers; too late and the team has picked sides.\n\n**Interview signal:** process before judgement, curiosity about cause, named follow-up cadence.",
    keyPoints: [
      "Separate 1-on-1s first, then mediated session",
      "Diagnose the cause (scope, status, technical, personal)",
      "Each restates the other's position before arguing their own",
      "Follow up in next 1-on-1s; pattern triggers escalation",
    ],
    followUps: [
      "What if one of them is your highest performer and is threatening to leave?",
      "How does it change if the conflict is between your team and another?",
      "What if the tech lead is correct and the IC is wrong?",
    ],
    redFlags: [
      "Immediately escalating to HR or skip-level",
      "Taking sides before hearing both perspectives",
      "Ignoring it and hoping it resolves",
    ],
    references: [
      { title: "lethain — Managing Through a Reorg", url: "https://lethain.com/managing-through-a-reorg/" },
    ],
    tags: ["role-eng-manager", "region-global"],
    estimatedTimeMin: 10,
  },
  {
    id: "lead-em-005",
    categoryIds: ["leadership"],
    topic: "Prioritization",
    subTopic: "Tech debt",
    difficulty: "medium",
    experienceBands: ["senior", "lead"],
    type: "scenario",
    prompt: "How do you think about technical debt in your team's roadmap?",
    answer:
      "**TL;DR.** Treat tech debt as investment risk you have to *price*, not a moral category. Explicit allocation + a debt register + business framing.\n\n**Strong answer**:\n\n- **Explicit capacity allocation** — typically 20–30% of team capacity sustained, not a one-off \"cleanup sprint\".\n- **Debt register** — a living list with category (hot spot, leverage point, best practice gap), cost-of-carry estimate, and remediation cost.\n- **Prioritised against product work** using a shared frame (RICE, or simply \"what does this cost us in shipping speed / on-call pain / incident rate this quarter?\").\n- **Communicated to non-engineering stakeholders** as risk and unit economics, not as engineering hygiene. \"Auth library has known CVEs and we're 6 versions behind\" = security risk + integration cost compounding.\n- **Linked to DORA metrics** — debt that doesn't move deployment frequency, change-failure-rate, MTTR, or lead-time is often not actually debt worth paying down.\n- **Reference the staffeng.com 'technical quality staircase'** for what good looks like at org scale.\n\n**Interview signal:** treats debt as a business artefact, not a confessional. Names tradeoffs explicitly.",
    keyPoints: [
      "Sustained 20–30% capacity, not cleanup sprints",
      "Debt register with cost-of-carry and remediation estimates",
      "Business-language framing of risk, not engineering moralising",
      "DORA metrics as the lens for 'is this actually debt'",
    ],
    followUps: [
      "How do you push back when the business wants 100% on features?",
      "What's the difference between debt and bad code?",
      "How would you start a debt program in a team that has none?",
    ],
    redFlags: [
      "'We'll do it in a cleanup sprint'",
      "Treats debt as purely engineering's concern",
      "No measurement, just gut feel",
    ],
    references: [
      { title: "staffeng — Managing Technical Quality", url: "https://staffeng.com/guides/manage-technical-quality" },
      { title: "DORA — Accelerate State of DevOps", url: "https://dora.dev/" },
    ],
    tags: ["role-eng-manager", "role-tech-lead", "region-global"],
    estimatedTimeMin: 10,
  },
  {
    id: "lead-em-006",
    categoryIds: ["leadership"],
    topic: "Org design",
    difficulty: "hard",
    experienceBands: ["lead"],
    type: "scenario",
    prompt: "How would you structure a team of 12 engineers building an AI platform?",
    answer:
      "**TL;DR.** Conway's law is the constraint, not a curiosity. Pick the topology you actually want shipped.\n\n**Strong answer** for a 12-person AI platform team:\n\n- **Three pods of ~4** so each has a tech lead and Conway-clean ownership: (1) **inference & serving** (model gateway, routing, caching, cost), (2) **evals & safety** (eval harness, red team library, policy filters), (3) **data & retrieval** (embeddings, vector store, RAG pipelines, document refresh).\n- **One platform PM** covering all three; one designer for surface area that touches end users.\n- **One on-call rotation per pod** with shared follow-the-sun for severity-1.\n- **Career-level spread**: each pod gets 1 senior, 2 mids, 1 junior — keeps mentorship loops local; staff/principal IC sits across pods and chairs the architecture council.\n- **Cross-pod rituals**: weekly architecture review (RFC walkthrough), monthly post-mortem readout, quarterly roadmap planning.\n- **Avoid** 12-person scrum, single tech lead, or hub-and-spoke where everything routes through you.\n\n**Trade-offs:** dedicated pods can create silos; mitigate with rotation programs (one engineer per quarter rotates to an adjacent pod for 4 weeks). Three pods of 4 underweights any single pod for a major project; design rituals to lift initiatives across.\n\n**Interview signal:** topology reasoning, named on-call, career-level distribution, cross-pod rituals.",
    keyPoints: [
      "Conway's Law explicit; topology drives team shape",
      "Three pods of ~4 with tech lead per pod",
      "Career-level spread per pod for mentorship",
      "Cross-pod rituals (RFC review, post-mortem, planning)",
      "On-call rotation per pod + shared sev-1",
    ],
    followUps: [
      "What changes at 24 engineers?",
      "How do you split work that genuinely spans two pods?",
      "How do you avoid the staff IC becoming a bottleneck?",
    ],
    redFlags: [
      "Rigid headcount math with no topology reasoning",
      "Single tech lead bottleneck",
      "No on-call structure",
      "Ignores Conway's law",
    ],
    references: [
      { title: "Team Topologies (Skelton, Pais)", url: "https://teamtopologies.com/book" },
      { title: "lethain — Staff Engineer Archetypes", url: "https://lethain.com/staff-engineer-archetypes/" },
    ],
    tags: ["role-eng-manager", "region-global", "pattern-faang"],
    estimatedTimeMin: 15,
  },
  {
    id: "lead-em-007",
    categoryIds: ["leadership"],
    topic: "Cross-functional partnership",
    subTopic: "Meta XFN round",
    difficulty: "medium",
    experienceBands: ["senior", "lead"],
    type: "scenario",
    prompt: "Tell me about a time you disagreed with a PM on prioritisation. (XFN round)",
    answer:
      "**TL;DR.** This is the *signal* question of Meta's XFN round — graded by a PM/designer/DS who is checking whether you can disagree without being adversarial.\n\n**Strong answer** uses STAR+R:\n\n- **Situation/Task** — name the specific feature, the named PM, the trade-off (most often: scope vs date vs reliability).\n- **Action** — say what data you brought (user metric, error budget, customer story), what alternative you proposed, how you separated *your* concern from *the* decision.\n- **Result** — what you negotiated, what shipped, whether the prediction was right.\n- **Reflection** — what you'd do earlier next time. The R is what separates senior from mid signal.\n\nFraming matters: never \"engineering vs product\". Always \"we agreed on X outcome; my proposal gets there with a different cost shape\". Healthy long-term relationship maintained — the XFN interviewer will probe this.\n\n**Interview signal:** specificity, no adversarial framing, data-driven counterproposal, relationship preserved.",
    keyPoints: [
      "STAR+R format — Reflection is what raises the signal",
      "Specific PM, specific trade-off named",
      "Counter-proposal with data, not just objection",
      "Framed as shared outcome with different cost shape",
      "Long-term relationship intact",
    ],
    followUps: [
      "What if the PM has the CEO's ear and you don't?",
      "When have you been wrong in this kind of disagreement?",
      "How do you bring engineering trade-offs to a non-technical PM?",
    ],
    redFlags: [
      "'Engineering vs Product' framing",
      "Capitulation with no voiced disagreement",
      "Adversarial tone or implied superiority",
      "Vague, no data brought",
    ],
    references: [
      { title: "interviewing.io — Meta hiring process (XFN round)", url: "https://interviewing.io/guides/hiring-process/meta-facebook" },
    ],
    tags: ["role-eng-manager", "pattern-faang", "region-global"],
    estimatedTimeMin: 8,
  },
  {
    id: "lead-em-008",
    categoryIds: ["leadership", "behavioral"],
    topic: "Delivery under pressure",
    difficulty: "hard",
    experienceBands: ["senior", "lead"],
    type: "scenario",
    prompt: "A critical launch is at risk two weeks out. Walk me through your response.",
    answer:
      "**TL;DR.** Three levers — scope, date, quality — and you must pick which to move; heroics is not a strategy.\n\n**Strong answer**:\n\n1. **Risk triage** (day 1) — list every open risk with likelihood + impact. Separate \"unknown unknowns\" (run a tiger team to convert to known) from known risks (assign owners).\n2. **Stakeholder communication cadence** — daily executive update, no surprises. Frame *options*, not problems.\n3. **Choose a lever explicitly**:\n   - **Cut scope** — name the MVP cut line, get PM sign-off in writing\n   - **Slip date** — quantify the cost of slip vs cost of bad ship\n   - **Ship with named risk** — what's the rollback plan? Who owns the post-launch fix?\n4. **Protect the team** — overtime is a tool of last resort with a defined end. Burnout costs the next launch.\n5. **Post-launch** — retro within 5 days; document the *system* failure (not the people) that let it get to the edge.\n\n**Interview signal:** has a framework, refuses to default to heroics, explicit lever choice, post-launch follow-through.",
    keyPoints: [
      "Three levers: scope / date / quality — pick one explicitly",
      "Daily exec update; frame options not problems",
      "Heroics is last resort with defined end",
      "Retro within 5 days, system-failure framing",
    ],
    followUps: [
      "What if your skip says 'just make it happen'?",
      "How do you communicate slip externally?",
      "What if the team is already burned out?",
    ],
    redFlags: [
      "Heroics-only response",
      "No exec communication plan",
      "Blames the team in the retro",
      "Refuses to acknowledge any of the three levers",
    ],
    references: [
      { title: "Pragmatic Engineer — Incident response", url: "https://newsletter.pragmaticengineer.com/" },
    ],
    tags: ["role-eng-manager", "role-tech-lead", "region-global"],
    estimatedTimeMin: 12,
  },
  {
    id: "lead-em-009",
    categoryIds: ["leadership"],
    topic: "1-on-1s",
    difficulty: "easy",
    experienceBands: ["mid", "senior", "lead"],
    type: "scenario",
    prompt: "How do you run a 1-on-1?",
    answer:
      "**TL;DR.** The report owns the agenda. Your job is to listen first and unblock second.\n\n**Strong answer**:\n\n- **30 minutes, weekly** for direct reports; bi-weekly fine for stable senior ICs.\n- **Shared rolling agenda doc** — report adds first, manager adds last. If the doc is empty, ask about career or personal; never default to status (you have other channels for status).\n- **Three lanes per session, roughly**: project blockers + growth/career + personal/morale. Some weeks one dominates — that's fine.\n- **No interruptions** — phone away, calendar guarded, never reschedule for a meeting that could be async.\n- **Notes are the report's**, in a shared doc; manager keeps a private set of growth observations.\n- **Cadence on career conversation** — explicit quarterly career check-in beyond the day-to-day.\n\nReports flag when the 1-on-1 has drifted into status-only — fix it by asking \"what are you not telling me\" or \"what's the most frustrating thing about your work this month\".\n\n**Interview signal:** agenda ownership is *the* signal; psychological safety; non-status framing.",
    keyPoints: [
      "Report owns the agenda, not the manager",
      "Three lanes: project + growth + personal",
      "Not a status channel — use other forums for status",
      "Quarterly explicit career check-in",
    ],
    followUps: [
      "How do you adapt for a remote or distributed team?",
      "What about skip-level 1-on-1s?",
      "How do you handle a report who only ever brings status?",
    ],
    redFlags: [
      "Manager-led agenda",
      "Status-update format",
      "Frequently rescheduled",
    ],
    references: [
      { title: "lethain — Running effective 1:1s", url: "https://lethain.com/running-effective-1-1s/" },
    ],
    tags: ["role-eng-manager", "region-global"],
    estimatedTimeMin: 6,
  },
  {
    id: "lead-em-010",
    categoryIds: ["leadership", "behavioral"],
    topic: "Hiring under bias",
    difficulty: "hard",
    experienceBands: ["senior", "lead"],
    type: "scenario",
    prompt: "Tell me about a time you made a mis-hire. What did you change?",
    answer:
      "**TL;DR.** Own the error, name the *system* gap (interview design, role match, signal missed), describe what changed in the process — not just \"we worked on the person\".\n\n**Strong answer** uses STAR+R:\n\n- **Situation** — the role, the candidate's apparent strengths, what tipped you to hire.\n- **Task** — when and how the mismatch surfaced (typically 30/60/90 day reviews, or peer feedback).\n- **Action** — coaching attempt, scope adjustment, and ultimately the transition. Treat the person with dignity through the exit.\n- **Result** — quantify the cost (months lost, team morale, your time), then the systemic change: a missing competency on the rubric, a panel composition gap, a level mismatch, a culture-add question that wasn't asked.\n- **Reflection** — what permanent process change you'd make and whether you've made it.\n\nClaim of \"I've never made a mis-hire\" reads as either dishonest or undersampled.\n\n**Interview signal:** intellectual honesty, systemic-failure framing, permanent process change.",
    keyPoints: [
      "Own the error explicitly, no blame-shift",
      "Diagnose the system gap, not just the person",
      "Permanent process change implemented",
      "Treats the exited person with dignity",
    ],
    followUps: [
      "How did you handle the team's morale during the transition?",
      "What's the signal you wish you'd weighted more?",
      "How do you avoid over-correcting on the next loop?",
    ],
    redFlags: [
      "Blames the person entirely",
      "Claims they've never made a mis-hire",
      "No process change followed",
    ],
    references: [
      { title: "interviewing.io — Behavioural senior loop", url: "https://interviewing.io/guides/behavioral-interview" },
    ],
    tags: ["role-eng-manager", "region-global", "pattern-faang"],
    estimatedTimeMin: 10,
  },

  // ---------------- STAFF+ IC (10) ----------------
  {
    id: "staff-001",
    categoryIds: ["staff-plus"],
    topic: "Scope of impact",
    difficulty: "hard",
    experienceBands: ["senior", "lead"],
    type: "scenario",
    prompt: "Walk me through the most technically complex system you've architected.",
    answer:
      "**TL;DR.** This is a *scope* probe disguised as a depth probe. The interviewer is checking whether your project-level fluency extends to product/org-level reasoning.\n\n**Strong answer**:\n\n- **Constraints first** — what couldn't change (regulatory, latency, cost, team size, time). Anyone can name a fancy architecture; constraint articulation separates seniors from staff.\n- **Two named alternatives you rejected**, and why.\n- **At least one trade-off you actively *chose* to live with** — most candidates pretend they got everything; staff candidates name the thing they didn't.\n- **One failure** — what broke after launch, how you discovered, what changed (technical and process).\n- **Multiplier effect** — who else owned pieces, who you handed it to, what patterns from it spread to other systems.\n\nAvoid the textbook system-design dump (\"load balancer → service → database → cache\"). The signal is in the *messy* parts — capacity planning surprises, the migration you almost botched, the API choice you regret.\n\n**Interview signal:** scope, constraint articulation, named alternatives, named failure, multiplier effect.",
    keyPoints: [
      "Constraints first — what couldn't change",
      "Two rejected alternatives named",
      "At least one chosen trade-off you live with",
      "One named failure post-launch",
      "Multiplier effect on adjacent teams",
    ],
    followUps: [
      "What would you do differently with today's constraints?",
      "What's the smallest change that would let you 10x this?",
      "How did the team's career growth compare before and after this project?",
    ],
    redFlags: [
      "Textbook architecture diagram with no trade-offs",
      "No named failure",
      "Cannot articulate any constraint",
      "Self-credit only; no team / multiplier framing",
    ],
    references: [
      { title: "staffeng — Staff+ interview process", url: "https://staffeng.com/guides/staff-plus-interview-process" },
    ],
    tags: ["role-staff-ic", "role-architect", "region-global"],
    estimatedTimeMin: 20,
  },
  {
    id: "staff-002",
    categoryIds: ["staff-plus"],
    topic: "Influence without authority",
    difficulty: "hard",
    experienceBands: ["senior", "lead"],
    type: "scenario",
    prompt: "Tell me about a time you moved an organisation toward a technical practice they resisted.",
    answer:
      "**TL;DR.** Influence-without-authority is *the* Staff+ signal. The story has to show resistance you actually engaged with, not a mandate dressed up as influence.\n\n**Strong answer**:\n\n1. **Name the practice** (RFC culture, ADRs, on-call runbooks, evaluation harnesses, code review SLAs) — specific.\n2. **Name the resistance type** — was it skeptical seniors, busy teams, a competing standard, a previous failed attempt? Different responses for each.\n3. **Strategy used** — typically a sequence: write a clear proposal → recruit early-adopter teams → measure the early result → publish the result → make the path of least resistance lead to the practice.\n4. **Measurable adoption** — number of teams, time to adopt, what changed in DORA metrics or incident rate.\n5. **Honest cost** — what you gave up, who didn't end up adopting, what you'd do differently.\n\nLarson's framing helps: *learn to never be wrong* by structuring proposals so the listener can correct you cheaply. Avoid \"I made everyone do it\".\n\n**Interview signal:** resistance acknowledged, sequence not mandate, measured outcome, honest about non-adopters.",
    keyPoints: [
      "Specific practice + specific resistance type",
      "Sequence: proposal → early adopters → measurement → publish",
      "Quantifiable adoption outcome",
      "Honest about what didn't adopt",
    ],
    followUps: [
      "What changes when the resistance is from a peer who outranks you politically?",
      "How do you sunset a practice you championed when it stops fitting?",
      "What's the smallest org you've done this in vs the largest?",
    ],
    redFlags: [
      "Mandate-based adoption framed as influence",
      "Couldn't describe resistance specifically",
      "No measurement",
      "Credit-claiming with no team named",
    ],
    references: [
      { title: "staffeng — Learn to never be wrong", url: "https://staffeng.com/guides/learn-to-never-be-wrong" },
      { title: "staffeng — Create space for others", url: "https://staffeng.com/guides/create-space-for-others" },
    ],
    tags: ["role-staff-ic", "role-architect", "region-global"],
    estimatedTimeMin: 12,
  },
  {
    id: "staff-003",
    categoryIds: ["staff-plus"],
    topic: "Technical strategy",
    difficulty: "expert",
    experienceBands: ["lead"],
    type: "scenario",
    prompt: "What does a good technical strategy look like? Show me yours.",
    answer:
      "**TL;DR.** Larson's recipe: write five design docs, extract the patterns, the strategy *is* the rationale behind the choices — not a list of technologies.\n\n**Strong answer**:\n\n- **Diagnosis** — current state, the named problems, the constraints (regulatory, talent, budget). One paragraph.\n- **Guiding policy** — the principles you're committing to. e.g. \"prefer building on managed services unless we have a multi-region cost advantage at >$X/yr\".\n- **Coherent set of actions** — the bets you're making, sequenced. Each action references the policy.\n- **Anti-strategy section** — what you are *not* doing and why. This is the signal section; weak strategies skip it.\n- **Trade-offs and risks** named, with reversibility (which choices you can undo cheaply vs which lock you in for 3 years).\n- **Measurement plan** — how you'll know in 6 months that the strategy is or isn't working.\n\nAvoid: tech-stack lists, vendor brochures, mission statements. A strategy you can't disagree with isn't one.\n\n**Interview signal:** rationale present, anti-strategy section, reversibility named, measurement plan.",
    keyPoints: [
      "Diagnosis → policy → coherent actions → anti-strategy",
      "Rationale is the strategy; tech list isn't",
      "Anti-strategy section is the signal",
      "Reversibility of each choice named",
      "Measurement plan included",
    ],
    followUps: [
      "What did you change when the strategy didn't survive contact with reality?",
      "How is engineering strategy different from product strategy?",
      "Walk me through how you'd kill an old strategy in your org.",
    ],
    redFlags: [
      "One-page tech-stack list",
      "No anti-strategy section",
      "Aspirational language, no measurement",
      "Cannot articulate reversibility",
    ],
    references: [
      { title: "staffeng — Writing Engineering Strategy", url: "https://staffeng.com/guides/engineering-strategy" },
      { title: "Rumelt — Good Strategy / Bad Strategy", url: "https://www.goodreads.com/book/show/11721966-good-strategy-bad-strategy" },
    ],
    tags: ["role-staff-ic", "role-architect", "region-global", "pattern-faang"],
    estimatedTimeMin: 18,
  },
  {
    id: "staff-004",
    categoryIds: ["staff-plus"],
    topic: "RFC / ADR culture",
    difficulty: "medium",
    experienceBands: ["senior", "lead"],
    type: "scenario",
    prompt: "How do you decide when an RFC or ADR is required?",
    answer:
      "**TL;DR.** RFC = open for input on a *forthcoming* decision. ADR = immutable log of a *past* decision and its rationale. Use both; don't conflate them.\n\n**Strong answer**:\n\n- **RFC required when**: ≥1 month of engineering work; the system will be used by other teams; there's a meaningful user impact or compliance footprint; the decision is hard to reverse; you can name two reasonable alternatives.\n- **RFC not required when**: pure refactor within one team's blast radius; reversible within a sprint; following an existing pattern.\n- **ADR required when**: a *non-obvious* technical choice is made and a future engineer will reasonably ask \"why did we do this?\". One paragraph each: context → decision → consequences. Numbered, immutable.\n- **Cadence**: RFCs reviewed in a weekly forum; ADRs live next to the code they describe.\n- **Anti-patterns**: \"always write a doc\" (signals process theatre), \"never write a doc\" (signals tribal knowledge), and ADRs that get edited after the fact.\n\nMature orgs (Stripe, Etsy, Uber) explicitly distinguish RFC vs Tech Spec vs ADR; knowing the difference is a Staff+ signal.\n\n**Interview signal:** explicit framework, named distinctions, anti-pattern awareness.",
    keyPoints: [
      "RFC = future decision open for input; ADR = past decision logged",
      "RFC trigger: ≥1 month work or cross-team impact or hard reversal",
      "ADR is immutable — never edit after the fact",
      "Distinguish RFC vs tech spec vs ADR",
    ],
    followUps: [
      "How do you keep RFC review from becoming a bottleneck?",
      "How do you bring an RFC culture to a team that has none?",
      "What's the smallest decision that should still get an ADR?",
    ],
    redFlags: [
      "'I always write docs' or 'I never write docs'",
      "Conflates RFC with ADR",
      "Edits ADRs after the fact",
    ],
    references: [
      { title: "ADR pattern — Michael Nygard", url: "https://github.com/joelparkerhenderson/architecture-decision-record" },
    ],
    tags: ["role-staff-ic", "role-architect", "region-global"],
    estimatedTimeMin: 8,
  },
  {
    id: "staff-005",
    categoryIds: ["staff-plus", "system-design"],
    topic: "AI architecture review",
    difficulty: "expert",
    experienceBands: ["senior", "lead"],
    type: "system-design",
    prompt: "Walk me through an AI architecture review you'd lead for a new GenAI feature.",
    answer:
      "**TL;DR.** AI architecture review at Staff+ is *not* a system-design whiteboard. It's a structured trade-off + risk review with specific lenses.\n\n**Strong answer** covers six lenses in order:\n\n1. **Model selection & sourcing** — build vs buy vs fine-tune vs RAG vs prompt-engineering. Specific to the use case (knowledge-intensive → RAG; style/format → fine-tune; general → prompting; differentiated → build).\n2. **Cost model** — token in/out × price × monthly volume. Include caching hit-rate assumption. Include the cost of an unexpected 10× traffic event. Scaling at hundreds of millions of requests/month vs thousands matters.\n3. **Latency vs accuracy budget** — p50 / p95 / p99 targets. Streaming UX as a perceived-latency tool.\n4. **Evaluation strategy** — automatic metrics (limited for generative), LLM-as-judge with judge calibration, human eval cadence, regression suite, red-team adversarial library. Tied to risk tier.\n5. **Failure-mode analysis** — hallucination, prompt injection, model drift, vendor outage, cost spike. Each with a detection signal and a mitigation.\n6. **Governance & rollback** — staged rollout plan, kill switch, post-launch review cadence, model-card documentation.\n\n**Trade-offs** are explicit: how scaling pressure trades against accuracy and how safety requirements trade against cost.\n\n**Interview signal:** all six lenses named, cost modelled not waved away, evaluation tied to risk tier, rollback plan present.",
    keyPoints: [
      "Six lenses: model sourcing, cost, latency, eval, failure modes, governance",
      "Build vs fine-tune vs RAG vs prompting decision rationale",
      "Cost modelled per-token × volume × cache hit rate",
      "Evaluation tied to risk tier",
      "Failure modes each have a detection + mitigation",
    ],
    followUps: [
      "What changes if the feature is in healthcare or finance?",
      "How do you red-team this before launch?",
      "What's the runbook if hallucinations are reported in production?",
    ],
    redFlags: [
      "No evaluation strategy",
      "Hand-waves cost",
      "No rollback plan",
      "Doesn't distinguish safety review from QA",
    ],
    references: [
      { title: "Microsoft Responsible AI standards", url: "https://www.microsoft.com/en-us/ai/responsible-ai" },
      { title: "AI Verify Foundation — MGF-GenAI", url: "https://aiverifyfoundation.sg/resources/mgf-gen-ai/" },
    ],
    tags: ["role-staff-ic", "role-architect", "region-global", "pattern-faang", "pattern-genai-lab"],
    estimatedTimeMin: 25,
  },
  {
    id: "staff-006",
    categoryIds: ["staff-plus"],
    topic: "Mentorship / multiplier effect",
    difficulty: "medium",
    experienceBands: ["senior", "lead"],
    type: "scenario",
    prompt: "Tell me about someone you mentored who exceeded your expectations.",
    answer:
      "**TL;DR.** Staff+ is graded on multiplier effect. Specific person, specific gap, scaffolded stretch, named growth outcome.\n\n**Strong answer**:\n\n- **Specific person** (anonymised) — their starting state, what was holding them back (gap in scope, in technical depth, in confidence, in narrative).\n- **What you did** — *sponsorship* not just mentorship. Created a real opportunity they could grow into; let them lead something you could have led; made introductions; framed their work upward; gave hard feedback when needed.\n- **Mechanism** — paired on the first 1–2 design docs; backed off as confidence built; coached on the presentation rather than rewriting it.\n- **Outcome for them** — promotion, project ownership, conference talk, role move. Specific, recent.\n- **What it cost you** — your time, your visibility (sometimes), your discomfort.\n\nDistinguish *mentorship* (advice on request) from *sponsorship* (use of your political capital). Larson's \"Create space for others\" is canonical.\n\n**Interview signal:** specific person, sponsorship not mentorship, named outcome, named cost.",
    keyPoints: [
      "Specific person and specific gap",
      "Sponsorship > mentorship — used your political capital",
      "Created an opportunity you could have taken yourself",
      "Named, recent growth outcome",
    ],
    followUps: [
      "Tell me about someone you mentored who didn't work out.",
      "How do you sponsor someone with a very different background from yours?",
      "What's the multiplier for the team, not just the individual?",
    ],
    redFlags: [
      "Generic 'I helped my team a lot'",
      "No individual named",
      "Advice-only, no sponsorship",
      "No growth metric or outcome",
    ],
    references: [
      { title: "staffeng — Create space for others", url: "https://staffeng.com/guides/create-space-for-others" },
    ],
    tags: ["role-staff-ic", "region-global"],
    estimatedTimeMin: 8,
  },
  {
    id: "staff-007",
    categoryIds: ["staff-plus"],
    topic: "Onboarding into Staff role",
    difficulty: "medium",
    experienceBands: ["lead"],
    type: "scenario",
    prompt: "How would you onboard into a new Staff role at a new company?",
    answer:
      "**TL;DR.** 30/60/90: *listen* first, build the network second, *avoid ghost-chasing* (Larson: importing fixes from your last company before understanding this one).\n\n**Strong answer**:\n\n- **First 30 days — listen mode.** 30+ one-on-ones across engineering, product, design, data, security, support. Read every active RFC. Re-read the last 5 post-mortems. Sit in on every standup you can in week one. Document, don't propose.\n- **30–60 days — build the map.** Identify existential issues (the thing that will break the org if not fixed), high-leverage opportunities (small actions with outsized impact), and people who already know but lack the capital to act. Get a public reputation for being useful in small ways before you propose anything large.\n- **60–90 days — first written proposal.** A short RFC for one focused intervention, framed as a hypothesis with measurement. Validate that the proposal can be killed cheaply if wrong.\n- **Avoid**: rewriting the architecture before you understand why it's what it is; importing your last company's stack; \"why don't they just do X?\" framings.\n\nReference Larson's \"Work on What Matters\" for prioritisation under new-role uncertainty.\n\n**Interview signal:** listen-first cadence, named anti-pattern (ghost-chasing), measurable first proposal.",
    keyPoints: [
      "30 days listen → 60 days map → 90 days first proposal",
      "30+ 1-on-1s across functions in first month",
      "Avoid ghost-chasing — don't import previous company's fixes",
      "First proposal is small, falsifiable, cheap to kill",
    ],
    followUps: [
      "What if there's an obvious five-alarm fire in week 2?",
      "How does this change if you join in a reorg?",
      "How do you handle imposter syndrome in the listening period?",
    ],
    redFlags: [
      "Proposes architecture changes in week 1",
      "Skips listening period",
      "'Just do what worked at my last company'",
    ],
    references: [
      { title: "staffeng — Work on what matters", url: "https://staffeng.com/guides/work-on-what-matters" },
      { title: "lethain — Onboarding to staff", url: "https://lethain.com/onboarding-to-staff/" },
    ],
    tags: ["role-staff-ic", "region-global"],
    estimatedTimeMin: 10,
  },
  {
    id: "staff-008",
    categoryIds: ["staff-plus", "leadership"],
    topic: "AI org strategy",
    difficulty: "expert",
    experienceBands: ["lead"],
    type: "scenario",
    prompt: "How would you build the AI strategy for a 200-person engineering org?",
    answer:
      "**TL;DR.** Start with org readiness, not technology. Three to five high-ROI use cases beats a vanity feature on every team.\n\n**Strong answer**:\n\n1. **Readiness audit** — data maturity (cataloguing, lineage, quality), tooling baseline (CI/CD, observability, secret management), skills inventory, governance baseline. Without these the strategy can't land.\n2. **Use-case portfolio** — 3–5 candidates evaluated on: business value × probability of success × strategic differentiation. Reject the rest.\n3. **Platform-first sequencing** — build the shared substrate (model gateway, eval harness, prompt registry, vector store, observability) before scaling team-level point solutions. Otherwise every team rebuilds basics.\n4. **Hiring profile** — ML platform / MLOps engineers *first*, then evaluation engineers, then applied scientists, then research. Resist the \"hire PhDs first\" pattern.\n5. **Governance from day 1** — risk tiering, model cards, red-team program, safety/policy reviewer assignment, incident playbook.\n6. **Measurement** — per-use-case KPI tree, cost per query, eval regression rate, time-to-deploy a new model variant.\n\n**Common failure modes**: every team ships an LLM feature with no platform; PhD-first hiring with no infra; \"GenAI mandate\" with no eval rigor; cost surprises in month 3.\n\n**Interview signal:** readiness audit before tech, platform-first sequencing, hiring order, named failure modes.",
    keyPoints: [
      "Readiness audit before any tech proposal",
      "3–5 use cases beats every-team-ships-AI",
      "Platform before point solutions",
      "ML Platform → Evaluation → Applied → Research hiring order",
      "Governance and cost measurement from day 1",
    ],
    followUps: [
      "How does this change for a regulated industry (bank, healthcare)?",
      "What if the CTO mandates every team ships GenAI this quarter?",
      "When does it make sense to build vs buy the platform?",
    ],
    redFlags: [
      "'We should build LLM features on everything'",
      "Strategy is a tech-stack list",
      "Hires research-first with no platform",
      "No evaluation or cost framing",
    ],
    references: [
      { title: "levels.fyi — AI Engineer Comp Q3 2025", url: "https://www.levels.fyi/blog/ai-engineer-compensation-trends-q3-2025.html" },
    ],
    tags: ["role-staff-ic", "role-architect", "pattern-faang", "pattern-genai-lab", "region-global"],
    estimatedTimeMin: 20,
  },
  {
    id: "staff-009",
    categoryIds: ["staff-plus", "safety"],
    topic: "LLM cost governance",
    difficulty: "hard",
    experienceBands: ["senior", "lead"],
    type: "scenario",
    prompt: "How do you govern LLM cost at scale across an organisation?",
    answer:
      "**TL;DR.** Token budgets per endpoint, model tiering, caching, attribution, and anomaly detection — all instrumented before the bill surprises you.\n\n**Strong answer**:\n\n- **Per-endpoint token budget** with hard ceilings and alerting at 50/80/100%. A runaway agent loop should fire an alert in minutes, not at month-end.\n- **Semantic cache** in front of model calls — re-asks of similar prompts hit cache. Even 20% hit rate is meaningful.\n- **Model tiering** — route by complexity: cheap model triages, expensive model handles only the residual. Mirror the call-routing pattern from customer support.\n- **Per-team attribution** — every request tagged with team / feature / environment. Cost dashboards per team, not org-wide only.\n- **Anomaly detection** — z-score on daily cost per endpoint, flag 3σ. Catches the bug that loops.\n- **Quarterly cost-per-feature review** — owners present cost per active user and what they'd do at half the budget.\n- **Engineering controls, not finance reports** — by the time finance flags it, you're $50K over.\n\n**Trade-offs:** tiering adds latency and a routing failure mode; caching reduces freshness; budgets can throttle legitimate growth. All manageable with explicit ownership.\n\n**Interview signal:** specific controls, attribution baked in, treats cost as eng concern not finance's.",
    keyPoints: [
      "Per-endpoint token budgets with hard ceilings",
      "Semantic cache + model tiering",
      "Per-team attribution",
      "Anomaly detection (3σ) on daily cost",
      "Engineering controls, not after-the-fact finance reports",
    ],
    followUps: [
      "What's the smallest org that needs this?",
      "How does this change with on-premises / open-source models?",
      "How do you handle prompt-injection-driven cost blowups?",
    ],
    redFlags: [
      "'We monitor the bill'",
      "No per-team attribution",
      "Treats cost as finance's problem",
      "No anomaly detection",
    ],
    references: [
      { title: "OpenAI — Production best practices", url: "https://platform.openai.com/docs/guides/production-best-practices" },
    ],
    tags: ["role-staff-ic", "role-architect", "pattern-faang", "pattern-genai-lab", "region-global"],
    estimatedTimeMin: 12,
  },
  {
    id: "staff-010",
    categoryIds: ["staff-plus", "safety"],
    topic: "Model governance",
    difficulty: "expert",
    experienceBands: ["senior", "lead"],
    type: "scenario",
    prompt: "Design a model governance and safety review program for an org shipping GenAI features.",
    answer:
      "**TL;DR.** Tier by risk, review by tier, document with model cards, red-team continuously, instrument incidents.\n\n**Strong answer**:\n\n- **Risk tiering** — low (internal, no PII), medium (internal, sensitive), high (external, regulated). Tier drives the rest.\n  - Low → automated checks + peer review\n  - Medium → cross-functional review (eng + policy + security)\n  - High → above + external audit + executive sign-off + named accountable owner\n- **Model cards** — every shipped model has a card with intended use, training/data sourcing, known limitations, eval results, sensitive groups tested. Public for high-tier, internal-only for low.\n- **Red-team program** — documented adversarial prompt library, scored monthly. Findings feed eval suite. External red-team annually for high-tier.\n- **Incident response playbook** — pre-defined sev levels for model failures (harmful output, bias incident, prompt injection, PII leak). Runbook per sev with named owners, comms templates, regulatory notification timing where applicable.\n- **Post-mortems** within 5 days; public for material incidents.\n- **Cross-org governance** — quarterly review of changes to the rubric itself; one named exec owner.\n\nReference public frameworks: Microsoft Responsible AI, NIST AI RMF, MGF-GenAI (Singapore), EU AI Act risk tiers.\n\n**Interview signal:** named tiering, risk-aligned process, runbook present, exec accountability.",
    keyPoints: [
      "Risk-tiered review (low / medium / high)",
      "Model cards mandatory per ship",
      "Red-team program with documented adversarial library",
      "Incident response playbook with sev levels",
      "Quarterly rubric review with exec owner",
    ],
    followUps: [
      "How does this map to the EU AI Act risk tiers?",
      "What's the smallest org where you'd stand this up?",
      "How do you avoid governance becoming a velocity tax?",
    ],
    redFlags: [
      "No structure beyond 'we test it before shipping'",
      "No red team",
      "No documented incident response",
      "No exec accountability",
    ],
    references: [
      { title: "NIST AI Risk Management Framework", url: "https://www.nist.gov/itl/ai-risk-management-framework" },
      { title: "EU AI Act overview", url: "https://artificialintelligenceact.eu/" },
      { title: "AI Verify Foundation — MGF-GenAI", url: "https://aiverifyfoundation.sg/resources/mgf-gen-ai/" },
    ],
    tags: ["role-staff-ic", "role-architect", "pattern-faang", "pattern-genai-lab", "pattern-bank-fintech", "region-global"],
    estimatedTimeMin: 20,
  },
];

// --- Append (idempotent) ---
const existing = JSON.parse(readFileSync(FILE, "utf8")) as Question[];
const seen = new Set(existing.map((q) => q.id));
let added = 0;
for (const q of NEW_QUESTIONS) {
  if (seen.has(q.id)) {
    console.log(`skip ${q.id} (already present)`);
    continue;
  }
  existing.push(q);
  seen.add(q.id);
  added++;
}
writeFileSync(FILE, JSON.stringify(existing, null, 2) + "\n");
console.log(`Added ${added} questions; file now has ${existing.length} total.`);
