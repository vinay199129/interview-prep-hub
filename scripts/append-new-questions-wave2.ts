/**
 * Wave 2: behavioral STAR prompts, region-flavored situational, expert + debugging fills.
 * Idempotent.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { Question } from "../src/lib/types";

const FILE = join(process.cwd(), "data", "questions.migrated.json");

const NEW_QUESTIONS: Question[] = [
  // ---------------- BEHAVIORAL / STAR (8) ----------------
  {
    id: "behav-001",
    categoryIds: ["behavioral"],
    topic: "Ownership",
    difficulty: "medium",
    experienceBands: ["mid", "senior", "lead"],
    type: "scenario",
    prompt: "Tell me about a time you owned a problem that wasn't technically your responsibility.",
    answer:
      "**TL;DR.** This is the Amazon-Ownership-LP archetype, and a Googleyness probe at Google. The signal is *durable ownership*, not heroics.\n\n**Strong answer** (STAR+R):\n\n- **Situation** — a real symptom you noticed (customer complaint, recurring on-call page, a data quality issue) that fell between teams.\n- **Task** — you weren't asked. Be explicit: this was outside your remit.\n- **Action** — what you did. Best stories: drove an investigation across teams, surfaced root cause, identified the missing owner, *handed it off cleanly* with the structure in place to keep it owned. Not: \"I just fixed it myself in my spare time.\"\n- **Result** — quantify. Reduced page volume by N, prevented X-class incidents, established a runbook.\n- **Reflection (R)** — what you would have escalated faster.\n\nAvoid: martyr framing (\"nobody else would\"), permanently absorbing the work (signals you can't delegate or grow others), or fictional re-org credit.\n\n**Interview signal:** explicit non-remit + named handoff + quantified result.",
    keyPoints: [
      "Acknowledge the problem was outside your remit",
      "Named handoff or new owner established",
      "Quantified result",
      "Reflection: what you'd escalate faster",
    ],
    followUps: [
      "How did you avoid stepping on the original owner's toes?",
      "What if no team would take it?",
      "Tell me about a time you decided *not* to step into someone else's problem.",
    ],
    redFlags: [
      "Martyr framing — 'no one else would do it'",
      "Permanently absorbed the work",
      "Vague, no quantified result",
    ],
    references: [
      { title: "Amazon Leadership Principles", url: "https://www.amazon.jobs/content/en/our-workplace/leadership-principles" },
    ],
    tags: ["region-global", "pattern-faang", "role-staff-ic", "role-eng-manager"],
    estimatedTimeMin: 6,
  },
  {
    id: "behav-002",
    categoryIds: ["behavioral"],
    topic: "Failure",
    difficulty: "medium",
    experienceBands: ["mid", "senior", "lead"],
    type: "scenario",
    prompt: "Describe a project that failed. What was your role in the failure?",
    answer:
      "**TL;DR.** Intellectual honesty signal. You need a real failure where *you* contributed materially, not a story where the team failed and you were just there.\n\n**Strong answer**:\n\n- **Pick a real one.** Most candidates choose a 2/10 failure to be safe; that signals you can't be honest. Pick a 7/10.\n- **Your specific role** — what *you* decided, what *you* missed. Use \"I\" not \"we\" in this part.\n- **Why** — the decision-tree at the time, what data you didn't have, where your assumptions were wrong.\n- **Cost** — to users, to the team, to your own credibility. Quantify.\n- **Permanent change** — in your decision process, not just in that project. Specific: \"I now write an inverse RFC before any irreversible decision listing what would make me wrong.\"\n- **Reflection** — what early signal you'd weight more now.\n\n**Interview signal:** willingness to name a real failure; named permanent change; the change has actually stuck (interviewer will probe).",
    keyPoints: [
      "Pick a real, material failure — not a token one",
      "'I' framing in the role-attribution section",
      "Named permanent change in your own decision process",
      "Cost quantified",
    ],
    followUps: [
      "What signal do you weigh more now?",
      "Has the permanent change actually stuck? Example?",
      "Have you made a similar mistake since?",
    ],
    redFlags: [
      "Token / safe failure",
      "Permanent change is vague or aspirational",
      "Blames team / context entirely",
    ],
    references: [
      { title: "interviewing.io — Behavioral interview", url: "https://interviewing.io/guides/behavioral-interview" },
    ],
    tags: ["region-global", "pattern-faang", "role-staff-ic", "role-eng-manager"],
    estimatedTimeMin: 8,
  },
  {
    id: "behav-003",
    categoryIds: ["behavioral"],
    topic: "Disagreement",
    subTopic: "Disagree and commit",
    difficulty: "hard",
    experienceBands: ["senior", "lead"],
    type: "scenario",
    prompt: "Tell me about a time you strongly disagreed with your manager on something important.",
    answer:
      "**TL;DR.** Amazon's Have-Backbone-Disagree-And-Commit LP is the most misread. They want respectful challenge *before* the decision, then *full* commitment *after*. Both halves matter.\n\n**Strong answer**:\n\n- **Pre-decision** — you brought data, alternatives, named risks. Specific channel (1-on-1 → broader doc → escalation if needed). You did *not* surface the disagreement publicly first.\n- **Decision moment** — the manager decided. State explicitly that you disagreed.\n- **Post-decision** — you committed *visibly*. You owned the execution, didn't sandbag, didn't say \"I told you so\" when the predicted risk hit.\n- **Reflection** — what you'd do differently and whether the outcome changed your prior. (\"They were right and I learned X\" is a strong move when honest.)\n\nAvoid: capitulation without voicing disagreement (\"I just went along\"); or persistent dissent post-decision (\"I kept pushing on it\"). Both fail the LP for opposite reasons.\n\n**Interview signal:** clear pre-vs-post structure; visible commit; honest post-mortem.",
    keyPoints: [
      "Disagreement raised through appropriate channel before the decision",
      "Visible commit after the decision — no sandbagging",
      "Specific data brought, specific alternatives named",
      "Honest reflection: were you right?",
    ],
    followUps: [
      "What if you commit and then it goes badly — do you say 'I told you so'?",
      "What's the line between disagree-and-commit and being a yes-person?",
      "Tell me about a time you were the manager on the receiving end.",
    ],
    redFlags: [
      "Capitulation with no voiced disagreement",
      "Persistent dissent post-decision",
      "Vague, no specific data brought",
    ],
    references: [
      { title: "interviewing.io — Amazon LP interview", url: "https://interviewing.io/guides/amazon-leadership-principles" },
    ],
    tags: ["region-global", "pattern-faang", "role-staff-ic", "role-eng-manager"],
    estimatedTimeMin: 8,
  },
  {
    id: "behav-004",
    categoryIds: ["behavioral"],
    topic: "Ambiguity",
    difficulty: "medium",
    experienceBands: ["senior", "lead"],
    type: "scenario",
    prompt: "Walk me through how you operated when the requirements were genuinely unclear.",
    answer:
      "**TL;DR.** Senior candidates are *expected* to operate without complete requirements; the signal is the *structure* you bring to ambiguity.\n\n**Strong answer**:\n\n- **Diagnose the source of ambiguity** — is it goal-level (\"what are we trying to do\"), constraint-level (\"can we use X\"), or solution-level (\"how do we get there\")? Different responses for each.\n- **Reversibility heuristic** — for reversible decisions (Bezos' Type 2), pick the most plausible answer and ship. For irreversible decisions, gather more signal before committing.\n- **Spike or prototype** — bound it (1–2 days), produce a runnable artifact, force the requirements conversation around something concrete.\n- **Write the assumptions list** — visible to all stakeholders. Ambiguity collapses fastest when you state your interpretation in writing and ask for corrections.\n- **Identify the cheapest disconfirming experiment** — what would make you wrong, and how expensive is it to find out?\n\nAvoid: paralysis until requirements are clarified; assuming and shipping without surfacing assumptions; treating every decision as one-way.\n\n**Interview signal:** reversibility heuristic, written assumptions, cheap disconfirming experiment.",
    keyPoints: [
      "Diagnose ambiguity source (goal / constraint / solution)",
      "Bezos Type 1 vs Type 2 reversibility heuristic",
      "Written assumptions list shared with stakeholders",
      "Cheapest disconfirming experiment named",
    ],
    followUps: [
      "What if you can't get clarification — the stakeholder is unavailable?",
      "How do you avoid endless prototyping?",
      "What's the role of the team in ambiguity work?",
    ],
    redFlags: [
      "Paralysis until requirements clarified",
      "Treats every decision as irreversible",
      "No written assumptions trail",
    ],
    references: [
      { title: "Jeff Bezos — 2015 letter (Type 1/Type 2 decisions)", url: "https://www.sec.gov/Archives/edgar/data/1018724/000119312516530910/d168744dex991.htm" },
    ],
    tags: ["region-global", "pattern-faang", "role-staff-ic"],
    estimatedTimeMin: 8,
  },
  {
    id: "behav-005",
    categoryIds: ["behavioral"],
    topic: "Working backwards",
    subTopic: "Amazon PRFAQ",
    difficulty: "hard",
    experienceBands: ["senior", "lead"],
    type: "scenario",
    prompt: "Walk me through how you'd write a Working Backwards PRFAQ for a new AI feature.",
    answer:
      "**TL;DR.** Amazon's Working-Backwards artifact: start from the customer outcome, write the press release, then design backward into the system. Used at L6+ in technical loops.\n\n**Strong answer** covers each section:\n\n1. **Press release** (1 page) — fictional launch announcement. Customer-language only. Lead with the user problem, then the solution in one sentence, then a quote from a customer who used it. *No technical detail.* If you can't write a crisp PR, the feature isn't ready.\n2. **Internal FAQ** — engineering, business, and risk questions. \"What if the model hallucinates? What's the rollback? How do we measure success? What does this cost per query?\"\n3. **External FAQ** — what customers will actually ask. \"Is my data used to train the model? What happens when the model is wrong? How do I disable it?\"\n4. **Trade-offs section** — what you're explicitly *not* doing in v1.\n5. **Success metric** — pre-committed, ideally a leading indicator, not just \"engagement\".\n\nThe document is read silently for 20 minutes by the room (no presentation) before discussion. This forces written clarity.\n\n**Interview signal:** customer-language PR, hard internal FAQ, named non-goals, leading-indicator success metric.",
    keyPoints: [
      "PR in customer language, no jargon",
      "Internal FAQ includes hard engineering + risk questions",
      "External FAQ anticipates customer concerns",
      "Explicit non-goals in trade-offs section",
      "Leading-indicator success metric",
    ],
    followUps: [
      "What if the PR is hard to write — what does that signal?",
      "How does this differ for an internal-only feature?",
      "How do you handle a PRFAQ that turns out to be wrong post-launch?",
    ],
    redFlags: [
      "PR has technical jargon",
      "Internal FAQ skipped or thin",
      "No named non-goals",
      "Engagement metric only",
    ],
    references: [
      { title: "Working Backwards — Bryar & Carr", url: "https://www.workingbackwards.com/" },
    ],
    tags: ["region-global", "pattern-faang", "role-staff-ic", "role-eng-manager"],
    estimatedTimeMin: 12,
  },
  {
    id: "behav-006",
    categoryIds: ["behavioral"],
    topic: "Cross-functional",
    difficulty: "medium",
    experienceBands: ["mid", "senior", "lead"],
    type: "scenario",
    prompt: "Tell me about a time a cross-functional partner (design, DS, security) caught something important you missed.",
    answer:
      "**TL;DR.** Tests whether you can name a real moment of being wrong with a non-engineering partner. Most candidates only have engineer-vs-engineer stories.\n\n**Strong answer**:\n\n- **Partner role** — designer, data scientist, security engineer, PM. Specific named function.\n- **What they caught** — substantively. Examples that work: a designer flagging accessibility on a critical flow, a DS finding the A/B test surface area was contaminated, a security engineer finding an indirect prompt injection vector, a PM noticing the user research said the opposite of the assumed need.\n- **Your immediate response** — acknowledged, didn't defend. Got curious about their model.\n- **Action** — redesigned, rolled back, re-scoped. Specific.\n- **Permanent change** — XFN earlier in the next cycle. Specific: \"now I bring security and DS into the RFC review *before* I commit to architecture, not at staging gate.\"\n\nThis question maps directly to Meta's XFN round; Microsoft, Google, Apple all probe a flavor of it.\n\n**Interview signal:** non-engineering partner, real catch, permanent process change.",
    keyPoints: [
      "Non-engineering partner named",
      "Substantive catch, not a nit",
      "Curiosity not defensiveness in immediate response",
      "Permanent process change in how you bring XFN in earlier",
    ],
    followUps: [
      "When have you been the one catching something the engineer missed?",
      "How do you make XFN feel like collaborators, not gatekeepers?",
      "What if the partner's catch is wrong?",
    ],
    redFlags: [
      "Defensive in the moment",
      "Story is engineer-vs-engineer (misses the XFN signal)",
      "No process change",
    ],
    references: [
      { title: "interviewing.io — Meta XFN round", url: "https://interviewing.io/guides/hiring-process/meta-facebook" },
    ],
    tags: ["region-global", "pattern-faang", "role-staff-ic", "role-eng-manager"],
    estimatedTimeMin: 7,
  },
  {
    id: "behav-007",
    categoryIds: ["behavioral", "safety"],
    topic: "AI ethics judgment",
    difficulty: "hard",
    experienceBands: ["senior", "lead"],
    type: "scenario",
    prompt: "Tell me about a time you had to say no to a GenAI feature request.",
    answer:
      "**TL;DR.** Tests your judgment under business pressure on responsible AI. The signal is in the *alternative* you proposed, not the refusal.\n\n**Strong answer**:\n\n- **The ask** — specific feature, specific stakeholder, specific business case. Don't sanitise to a hypothetical.\n- **The named risk** — hallucination in a high-stakes context (medical, legal, financial), PII handling against DPDP/PDPA/DIFC DP / DPDP, model latency at scale, eval gap, prompt injection vector.\n- **What you proposed instead** — never a flat refusal. A staged rollout, a different model, a human-in-the-loop variant, a sandboxed pilot. Show you offered a path.\n- **Stakeholder alignment** — how you handled the disagreement. Brought the security/legal/risk owner in by name. Didn't go around the requester.\n- **Outcome** — what shipped, what didn't, and what you learned about your own risk calibration.\n\nA flat \"I blocked it\" without an alternative reads as risk-averse rather than judgment-driven.\n\n**Interview signal:** named alternative, specific risk, brought right partners in, calibrated outcome.",
    keyPoints: [
      "Specific risk named (not generic 'safety')",
      "Alternative path offered, not flat refusal",
      "Right partners (security, legal, risk) brought in",
      "Outcome calibrated honestly",
    ],
    followUps: [
      "When have you said yes to something you initially wanted to say no to?",
      "How do you avoid being the team's perpetual blocker?",
      "What if the stakeholder goes over your head?",
    ],
    redFlags: [
      "Flat refusal, no alternative",
      "Generic 'it's not safe' without specific risk",
      "Went around the requester",
      "No partner brought in",
    ],
    references: [
      { title: "Microsoft Responsible AI Standard v2", url: "https://www.microsoft.com/en-us/ai/responsible-ai" },
    ],
    tags: ["region-global", "pattern-faang", "pattern-genai-lab", "role-staff-ic", "role-eng-manager"],
    estimatedTimeMin: 10,
  },
  {
    id: "behav-008",
    categoryIds: ["behavioral"],
    topic: "Sunset",
    difficulty: "hard",
    experienceBands: ["senior", "lead"],
    type: "scenario",
    prompt: "Describe a time you had to sunset a system you built.",
    answer:
      "**TL;DR.** Tests *non-ego* technical maturity. Many seniors can build; fewer can kill their own work cleanly.\n\n**Strong answer**:\n\n- **Original context** — what the system was for, what it solved, how long it ran.\n- **Why sunset** — new pattern superseded it, business pivot, cost compounding, security debt, the org grew past it. Specific.\n- **Migration plan** — usually expand-migrate-contract. Dual-run period; named cutover criteria; named owners on the destination system.\n- **Communication** — to dependent teams, with timeline, with their migration cost acknowledged. Office hours.\n- **The hard parts** — what almost broke (a dependency you didn't know about, a customer using the deprecated API in an undocumented way, a team that didn't get the memo).\n- **The emotional part** — honest. You built this; you're killing it. The signal is that you can do both.\n\n**Interview signal:** dual-run + cutover criteria; named dependencies; willingness to talk about the cost of pride.",
    keyPoints: [
      "Specific original context + reason for sunset",
      "Dual-run + cutover criteria + named destination owner",
      "Communication plan and migration support for dependents",
      "Honest about what almost broke",
    ],
    followUps: [
      "What did the team building the replacement want from you?",
      "When have you refused to sunset something you should have?",
      "How do you handle a team that won't migrate off?",
    ],
    redFlags: [
      "Cold sunset / hard cut",
      "No dual-run period",
      "Resents the sunset",
      "No named owner on the destination",
    ],
    references: [
      { title: "Will Larson — Migrations", url: "https://lethain.com/migrations/" },
    ],
    tags: ["region-global", "role-staff-ic", "role-architect"],
    estimatedTimeMin: 10,
  },

  // ---------------- REGION: INDIA (5) ----------------
  {
    id: "region-in-001",
    categoryIds: ["azure-platform", "safety"],
    topic: "RBI cloud adoption framework",
    difficulty: "hard",
    experienceBands: ["senior", "lead"],
    type: "scenario",
    prompt: "A PSB wants to migrate workloads to Azure. What RBI cloud-adoption principles apply?",
    answer:
      "**TL;DR.** RBI's 2023 Cloud Adoption Framework for Regulated Entities is risk-based, with data classification and exit-strategy at its heart. Cite it directly.\n\n**Strong answer** covers:\n\n- **Risk-based approach** — classify systems by criticality (critical / important / non-critical). Critical systems carry hardest controls.\n- **Data classification** — public / internal / confidential / regulated. Drives encryption, residency, audit. Maps onto Azure tags + Microsoft Purview labels.\n- **Right to audit** — CSP must contractually allow inspection by the bank *and* by RBI directly. Azure has this as part of regulated-customer agreements; named in the SoA.\n- **Data residency in India** for sensitive/critical data — Azure India South / India Central regions, with paired DR within India. **Storage account redundancy** must be ZRS/GZRS in-country, not cross-region.\n- **Sovereign-preference for critical workloads** — RBI has been increasingly explicit about preferring in-country cloud for systemic players.\n- **Business continuity** — RTO/RPO mapped per workload tier; documented DR runbook; tested annually.\n- **Reversibility / exit strategy** — explicit in the contract. Documented egress path; data-export tooling tested before go-live; no proprietary lock-in for regulated data.\n- **Incident reporting** — RBI notification windows per circular timeline.\n\nReference circular DIT.CO.MSME.BC.No.2/33.05.001/2023-24.\n\n**Trade-offs:** sovereign-preference can constrain feature parity; data classification adds friction; right-to-audit complicates managed-service usage.\n\n**Interview signal:** specific citations, residency naming, exit-strategy named, incident reporting.",
    keyPoints: [
      "Risk-based classification (critical / important / non-critical)",
      "Data classification drives encryption + residency",
      "Right-to-audit for CSP, explicit in contract",
      "Residency + paired DR within India",
      "Documented + tested exit strategy",
    ],
    followUps: [
      "What changes if it's a private bank vs a PSB?",
      "How would you handle a managed Azure OpenAI dependency under these rules?",
      "What's the RBI position on cross-border training data for AI models?",
    ],
    redFlags: [
      "No mention of exit strategy or right-to-audit",
      "Generic 'use Azure Sentinel' answer",
      "Ignores data classification",
    ],
    references: [
      { title: "RBI — Cloud adoption framework circular", url: "https://www.rbi.org.in/" },
      { title: "Azure — Compliance with Indian regulations", url: "https://learn.microsoft.com/azure/compliance/" },
    ],
    tags: ["region-india", "pattern-bank-fintech", "pattern-services-firm", "role-architect"],
    estimatedTimeMin: 15,
  },
  {
    id: "region-in-002",
    categoryIds: ["safety", "rag"],
    topic: "DPDP Act 2023",
    difficulty: "hard",
    experienceBands: ["senior", "lead"],
    type: "scenario",
    prompt: "Design a RAG system for a fintech under DPDP Act 2023 constraints.",
    answer:
      "**TL;DR.** DPDP 2023 brings consent, purpose limitation, right-to-erasure, and ₹250-cr breach penalty. RAG design has to bake them in, not bolt on.\n\n**Strong answer**:\n\n- **Consent management** — every document indexed for retrieval is tied to a consent ledger entry. Withdrawn consent triggers re-indexing within an SLA (24–72h typical). Maintain audit of which consent allowed which retrieval.\n- **Purpose limitation** — separate vector indexes per purpose (e.g. fraud-detection retrieval ≠ customer-support retrieval). Cross-purpose retrieval is explicitly blocked.\n- **PII handling in prompts** — pre-prompt PII scrubber (regex + NER) on user queries before they hit the LLM; explicit allowlist for fields that *must* be passed (e.g. account-context). Audit log of what fields were sent.\n- **Data localisation** — for regulated data, embedding model + vector store + LLM endpoint all in India region. Cross-border inference requires DPDP transfer compliance.\n- **Right to erasure** — document tombstoning + vector reindexing on user erasure request. SLA committed to data fiduciary.\n- **Audit trail** — every retrieval, every prompt, every output, with timestamps and consent reference. Immutable storage (e.g. WORM blob).\n- **Data Protection Officer** named for the system.\n\n**Trade-offs:** purpose-segregation hurts retrieval recall; localisation reduces model choice; consent withdrawal forces reindex storms. All manageable.\n\n**Interview signal:** consent ledger, per-purpose indexes, PII scrubber, erasure path, audit trail.",
    keyPoints: [
      "Per-purpose vector indexes; cross-purpose retrieval blocked",
      "PII scrubber before any LLM call; audit of fields sent",
      "Consent ledger drives indexing + erasure",
      "Right-to-erasure tombstoning + reindex SLA",
      "All compute + storage in India region for regulated data",
    ],
    followUps: [
      "How do you handle cross-border inference if the best model is global?",
      "What if the DPO disagrees with your architecture?",
      "How does this compare to GDPR right-to-be-forgotten implementation?",
    ],
    redFlags: [
      "Single global vector index across purposes",
      "No PII scrubber",
      "No consent ledger",
      "Treats DPDP as 'similar to GDPR' without specifics",
    ],
    references: [
      { title: "DPDP Act 2023 — MeitY", url: "https://www.meity.gov.in/" },
    ],
    tags: ["region-india", "pattern-bank-fintech", "pattern-bigtech-india", "role-architect"],
    estimatedTimeMin: 18,
  },
  {
    id: "region-in-003",
    categoryIds: ["system-design"],
    topic: "UPI architecture",
    difficulty: "hard",
    experienceBands: ["mid", "senior", "lead"],
    type: "system-design",
    prompt: "Design a payment notification system for a UPI app at 100M+ users (Razorpay / PhonePe scale).",
    answer:
      "**TL;DR.** Idempotency, ordered-where-needed delivery, and NPCI / UPI-circular compliance. This is a signature question at Razorpay, PhonePe, Paytm.\n\n**Strong answer**:\n\n- **Ingestion** — Kafka partitioned by user ID for per-user ordering; at-least-once. Idempotency key per transaction (NPCI's RRN can anchor it).\n- **Notification service** — consumer group reading from Kafka. Routes events to channels: push (FCM/APNs), in-app socket, SMS (with TRAI DLT compliance), email, webhook (for merchant integrations).\n- **Delivery workers** per channel with exponential backoff + DLQ. Push tokens rotated. SMS only on failure of push (cost).\n- **De-duplication** — Redis bloom filter on (txn_id × channel) for fast \"already delivered\" check, plus a durable de-dupe table for the long-tail.\n- **Ordering** — within a user, ordered. Across users, no global order. Use Kafka partition key = user_id.\n- **Backpressure** — slow consumers can't poison the cluster. Per-channel rate limit; circuit-breaker at the channel boundary.\n- **NPCI / RBI compliance** — log every notification with transaction reference for reconciliation; settlement-cycle awareness (UPI is real-time, NEFT batched); audit trail retained per RBI Master Direction.\n- **UPI Lite offline** — local-store-and-sync pattern; reconcile at next-online via background job; reference RBI's UPI Lite circular (Sep 2022).\n- **Observability** — golden signals per channel: delivery rate, p95 latency, failure-by-error-code.\n\n**Trade-offs:** at-least-once + dedup gives effectively-once but at cost of dedup-table storage; per-user-ordered Kafka throttles a hot user; SMS is expensive at fallback frequency.\n\n**Interview signal:** idempotency keys, partition-by-user, channel-specific backpressure, NPCI/RBI references.",
    keyPoints: [
      "Idempotency keyed on NPCI RRN or txn_id",
      "Kafka partition by user_id for per-user ordering",
      "Per-channel workers + exponential backoff + DLQ",
      "De-dupe via Redis bloom + durable table",
      "RBI / NPCI audit trail; UPI Lite offline reconciliation",
    ],
    followUps: [
      "What changes at 1B users?",
      "How do you handle TRAI DLT for SMS without dropping critical notifications?",
      "What's your reconciliation strategy with NPCI EOD batch?",
    ],
    redFlags: [
      "No idempotency / dedup",
      "Global ordering claim",
      "Ignores NPCI / RBI references",
      "SMS-first design (cost blowout)",
    ],
    references: [
      { title: "NPCI — UPI Procedural Guidelines", url: "https://www.npci.org.in/what-we-do/upi/product-overview" },
      { title: "RBI — Master Direction on KYC", url: "https://www.rbi.org.in/" },
    ],
    tags: ["region-india", "pattern-bank-fintech", "pattern-bigtech-india", "role-architect", "role-staff-ic"],
    estimatedTimeMin: 25,
  },
  {
    id: "region-in-004",
    categoryIds: ["rag", "llm-fundamentals"],
    topic: "Indic NLP",
    difficulty: "hard",
    experienceBands: ["senior", "lead"],
    type: "scenario",
    prompt: "How would you fine-tune a multilingual LLM for code-mixed Hindi-English customer support?",
    answer:
      "**TL;DR.** Indic + code-mixed has tokenizer, data, and evaluation gotchas that a global English playbook doesn't catch. Specific to Sarvam, Krutrim, Yellow.ai, Haptik interview territory.\n\n**Strong answer**:\n\n- **Base model selection** — start from a model with strong Indic coverage (Sarvam-1, IndicBERT v2, mT5, Llama-3 with Indic adapters). Avoid English-only models — tokenizer alone wastes 4–8× tokens on Devanagari.\n- **Tokenizer audit** — measure tokens-per-Hindi-word on your corpus. If >2, extend vocab (Falcon-Arabic did 32K extension; equivalent applies for Devanagari).\n- **Data** — code-mixed support transcripts (real, anonymised) > synthetic translation. Address typo/spelling variations (\"acha\" / \"accha\"), Romanised Hindi (\"kya hua\"), and transliteration.\n- **PEFT method** — LoRA / QLoRA at rank 16–64. Full fine-tune rarely justified for support domain.\n- **SFT recipe** — instruction-tuning with code-mixed prompts and Hindi+English outputs. Sample with care: support data often has dataset bias (escalation cases over-represented).\n- **Evaluation** — *don't* rely on BLEU alone; code-mixed BLEU is noisy. Use a held-out human-rated set; LLM-as-judge calibrated by a small human-rated anchor set; intent-classification accuracy as a proxy for downstream task quality.\n- **DPO / RLHF** — useful for tone (formal-respectful vs casual). Native annotators only.\n- **Inference** — quantize (GPTQ / AWQ) for cost; deploy in India region for DPDP compliance.\n\n**Interview signal:** tokenizer audit, code-mixed-specific data, PEFT, India-region inference.",
    keyPoints: [
      "Base model with strong Indic coverage; audit tokenizer overhead",
      "Real code-mixed data > synthetic translation",
      "LoRA/QLoRA, rarely full fine-tune for domain adaptation",
      "Evaluation: human-rated + calibrated LLM-as-judge; intent acc as proxy",
      "India-region inference for DPDP",
    ],
    followUps: [
      "What's your fallback when the LLM produces bad code-mixed output?",
      "How do you handle a user switching mid-conversation to Tamil?",
      "What's the cost story at 1M conversations / day?",
    ],
    redFlags: [
      "English-only base model",
      "BLEU-only evaluation",
      "Synthetic translation as primary data",
      "Ignores India-region inference",
    ],
    references: [
      { title: "AI4Bharat — IndicBERT & Indic-NLP", url: "https://ai4bharat.iitm.ac.in/" },
      { title: "Sarvam-1 model release", url: "https://www.sarvam.ai/" },
    ],
    tags: ["region-india", "pattern-bigtech-india", "pattern-product-startup", "role-staff-ic"],
    estimatedTimeMin: 15,
  },
  {
    id: "region-in-005",
    categoryIds: ["behavioral"],
    topic: "Services → product transition",
    difficulty: "medium",
    experienceBands: ["mid", "senior"],
    type: "scenario",
    prompt: "Why do you want to transition from a services firm to a product company?",
    answer:
      "**TL;DR.** Standard at Flipkart / Razorpay / Swiggy lateral interviews. The signal is genuine pull toward product-engineering practice, not push from services pay or culture.\n\n**Strong answer**:\n\n- **Specific pull factor** — direct ownership of a long-running system; investing in technical bets that may pay back over years rather than per-engagement; tighter feedback loop with users; deeper specialisation (DSA, LLD, system design as ongoing craft, not just for next interview).\n- **Acknowledge what services taught you** — multi-client breadth, delivery discipline, working with non-engineering stakeholders, regulatory exposure. Don't trash the past.\n- **Honest about adjustment** — you've been measured on hours billed / SLA / client satisfaction; product is measured on user metrics / iteration speed / on-call ownership. Different muscle.\n- **Concrete preparation** — you've been studying LLD/HLD, machine coding, contributing to open-source, building side projects. Show you've done the work.\n- **Why this product company specifically** — research their tech stack, their published engineering blog posts, their product surface.\n\nAvoid: pay-only framing; generic \"I want to work on products\"; trashing the services firm; treating the move as escape.\n\n**Interview signal:** specific pull, honest adjustment, named preparation, company-specific reason.",
    keyPoints: [
      "Specific pull factor toward product practice",
      "Acknowledges what services taught you",
      "Honest about the adjustment shift in measurement",
      "Concrete preparation done (LLD, machine coding, OSS)",
      "Company-specific reason for the choice",
    ],
    followUps: [
      "What's the biggest thing you'll miss from services?",
      "How will you handle on-call?",
      "What if the product turns out to be less interesting than you expected?",
    ],
    redFlags: [
      "Pay-only framing",
      "Trash-talks the services firm",
      "Generic 'I want to work on a product'",
      "No company-specific research",
    ],
    references: [
      { title: "InterviewBit — Flipkart interview experiences", url: "https://www.interviewbit.com/" },
    ],
    tags: ["region-india", "pattern-services-firm", "pattern-bigtech-india", "career-transition"],
    estimatedTimeMin: 7,
  },

  // ---------------- REGION: SINGAPORE (3) ----------------
  {
    id: "region-sg-001",
    categoryIds: ["safety", "rag"],
    topic: "MAS FEAT principles",
    difficulty: "hard",
    experienceBands: ["senior", "lead"],
    type: "scenario",
    prompt: "Under MAS FEAT, how do you assess whether your LLM-based credit-scoring model is Fair and Accountable?",
    answer:
      "**TL;DR.** MAS FEAT (Fairness, Ethics, Accountability, Transparency) is the lingua franca at DBS, OCBC, UOB; you'll be expected to *operationalise* it, not just name it.\n\n**Strong answer** addresses each pillar:\n\n- **Fairness** — protected-attribute analysis (gender, race, age, residency status). Disparate-impact testing across cohorts: false-positive rate parity, equal opportunity, calibration parity. Document which metric you optimised and why (these are not all simultaneously satisfiable). Use a holdout reserved for fairness testing.\n- **Ethics** — explicit *what we won't use the model for* statement. No credit decisions on protected classes; no chained-inference from soft attributes (e.g. inferring income from app behavior in ways that proxy protected attributes).\n- **Accountability** — named human owner for the model; documented override workflow when the model rejects; audit log of overrides; quarterly model committee review with risk officer.\n- **Transparency** — model card published internally (and externally where required); SHAP / LIME explanations available to the affected customer per MAS notice; the *reason code* given to the customer is testable and stable.\n\n**Tooling** — AI Verify framework provides process + technical tests aligned to FEAT; reference it directly.\n\n**Trade-offs:** fairness optimisation reduces aggregate accuracy; full transparency invites gaming; named-owner accountability creates bottlenecks. Surface these.\n\n**Interview signal:** named fairness metrics, override workflow, AI Verify referenced, trade-offs surfaced.",
    keyPoints: [
      "Named fairness metric, knowing they're not all simultaneously satisfiable",
      "Disparate-impact + calibration parity tests on a reserved holdout",
      "Override workflow + quarterly model committee",
      "Customer-facing reason code stable and testable",
      "AI Verify framework referenced",
    ],
    followUps: [
      "Which fairness metric would you optimise for credit and why?",
      "How would you handle a finding of unfair impact post-launch?",
      "How does this scale to 300+ models in production (the DBS case)?",
    ],
    redFlags: [
      "Names FEAT but can't operationalise any pillar",
      "Claims all fairness metrics are simultaneously satisfiable",
      "No override workflow",
      "No reference to AI Verify",
    ],
    references: [
      { title: "MAS FEAT principles", url: "https://www.mas.gov.sg/" },
      { title: "AI Verify — what is it", url: "https://aiverifyfoundation.sg/what-is-ai-verify/" },
    ],
    tags: ["region-singapore", "pattern-bank-fintech", "role-staff-ic", "role-architect"],
    estimatedTimeMin: 15,
  },
  {
    id: "region-sg-002",
    categoryIds: ["agents", "system-design"],
    topic: "Multi-agent LLM in production",
    difficulty: "expert",
    experienceBands: ["senior", "lead"],
    type: "system-design",
    prompt: "Design a multi-agent LLM workflow for automated trade reconciliation in a MAS-regulated bank.",
    answer:
      "**TL;DR.** LangGraph (or equivalent state-machine) supervisor + specialist agents, with deterministic validation between agent steps and human-in-the-loop above a value threshold. Mirrors Grab's published pattern adapted for finance.\n\n**Strong answer**:\n\n- **Topology** — supervisor agent routes by intent to specialists: Match (deterministic ledger lookup), Investigate (LLM + tool-using), Adjust (constrained write), Escalate (human queue). Supervisor is itself an LLM but its outputs are constrained to a fixed set of routes.\n- **State machine** — explicit state per case (received → matched → exception → investigated → adjusted/escalated → closed). LangGraph nodes per state.\n- **Deterministic validation between agents** — agent output passes through schema validation + business-rule check before next agent sees it. No agent-to-agent free text.\n- **Grounding** — every claim must cite a structured DB lookup. Agents cannot hallucinate trade IDs; if no match, route to Investigate.\n- **Human-in-the-loop threshold** — above $X (configurable), require human approval. Below, audit-only.\n- **Audit log per decision** — every agent call logged with prompt, output, tool calls, validation result. Immutable storage.\n- **Failure modes & mitigations** — hallucinated trade IDs (catch in validation); cost runaway (token budget per case + circuit breaker); agent loop (max iterations); prompt injection from trade memo fields (sanitise before LLM call).\n- **MAS TRM compliance** — critical-system change controls, incident notification within 1 hour, immutable audit, customer-data residency in Singapore region.\n\n**Trade-offs:** state-machine rigour adds latency vs free-form ReAct; per-step validation increases cost; human-in-loop threshold is a calibration headache.\n\n**Interview signal:** state machine, deterministic validation, grounding requirement, MAS TRM references.",
    keyPoints: [
      "Supervisor + specialist agents in explicit state machine",
      "Deterministic validation between agents — no free text handoffs",
      "Grounding: every claim cites a DB lookup",
      "Human-in-loop threshold + immutable audit log",
      "MAS TRM compliance baked in (residency, incident SLA, change control)",
    ],
    followUps: [
      "What if a specialist agent disagrees with the supervisor's routing?",
      "How do you evaluate the system end-to-end?",
      "What's the rollback if the system makes a bad adjustment in prod?",
    ],
    redFlags: [
      "Free-form ReAct without state machine",
      "Agents pass natural language without validation",
      "No grounding requirement",
      "No MAS TRM acknowledgement",
    ],
    references: [
      { title: "Grab Engineering — LangGraph multi-agent system", url: "https://engineering.grab.com/from-firefighting-to-building" },
      { title: "MAS Technology Risk Management Guidelines", url: "https://www.mas.gov.sg/" },
    ],
    tags: ["region-singapore", "pattern-bank-fintech", "pattern-genai-lab", "role-architect", "role-staff-ic"],
    estimatedTimeMin: 25,
  },
  {
    id: "region-sg-003",
    categoryIds: ["safety"],
    topic: "PDPA + AI Verify",
    difficulty: "hard",
    experienceBands: ["senior", "lead"],
    type: "scenario",
    prompt: "GovTech is shipping a citizen-facing LLM chatbot for seniors. Apply the MGF-GenAI 9 dimensions.",
    answer:
      "**TL;DR.** AI Verify's MGF-GenAI is the Singapore reference frame; for a senior-citizen audience, *accountability + transparency + accessibility* dominate.\n\n**Strong answer** maps the 9 dimensions concretely:\n\n1. **Accountability** — named human escalation path; human reachable within minutes; clearly labelled \"You're talking to a chatbot\".\n2. **Transparency** — discloses AI use up-front; explains why it gave each answer (source document citation); does *not* claim authority it doesn't have.\n3. **Fairness** — explicit accessibility (large text, screen-reader, audio), low-literacy plain-language outputs, tested across 4 official languages.\n4. **Safety** — pre-filter on harmful content; output filter for misinformation; refuses to give medical/legal/financial *decisions* (only points to authoritative sources).\n5. **Data governance** — no PII retention beyond session; no training data taken from senior conversations without explicit opt-in; PDPA purpose-limitation respected.\n6. **Explainability** — every answer cites the source policy/document; users can ask \"why did you say that?\" and get the retrieved chunk.\n7. **Human oversight** — sample of conversations reviewed weekly; escalation rate monitored; explicit \"I'm not sure, let me connect you to someone\" path.\n8. **Privacy** — no third-party API receives full conversation; on-prem or sovereign LLM hosting (GCC on AWS Singapore); IM8 classification respected.\n9. **Robustness** — adversarial test set (jailbreak, prompt injection, scam-script extraction); retrained on findings.\n\n**Trade-offs:** sovereign hosting limits model choice; high-citation requirement reduces conversational quality; refuse-on-uncertainty hurts UX completion rate. Acknowledge these.\n\n**Interview signal:** specific seniors-audience adaptations, all 9 dimensions named, sovereign hosting acknowledged.",
    keyPoints: [
      "All 9 MGF-GenAI dimensions named concretely",
      "Seniors-specific adaptations (plain language, multilingual, accessibility)",
      "Refuses to give medical/legal/financial decisions",
      "Sovereign hosting on GCC; no PII retention",
      "Source citation on every answer",
    ],
    followUps: [
      "Which dimension would you cut if forced to ship in 6 weeks?",
      "How does this differ from a Smart Nation chatbot for working-age citizens?",
      "What's your evaluation regimen pre-launch?",
    ],
    redFlags: [
      "Names MGF-GenAI without dimension-by-dimension specifics",
      "External API for inference (PII leak risk)",
      "No accessibility / multilingual",
      "No source-citation guarantee",
    ],
    references: [
      { title: "AI Verify Foundation — MGF-GenAI", url: "https://aiverifyfoundation.sg/resources/mgf-gen-ai/" },
      { title: "GovTech — Governing AI responsibly", url: "https://www.tech.gov.sg/technews/governing-ai-responsibly/" },
    ],
    tags: ["region-singapore", "pattern-gov-public-sector", "role-staff-ic", "role-architect"],
    estimatedTimeMin: 18,
  },

  // ---------------- REGION: UAE (3) ----------------
  {
    id: "region-uae-001",
    categoryIds: ["rag", "system-design"],
    topic: "Sovereign cloud RAG",
    difficulty: "expert",
    experienceBands: ["senior", "lead"],
    type: "system-design",
    prompt: "Design a RAG system for a UAE government document store where data must never leave UAE jurisdiction.",
    answer:
      "**TL;DR.** Sovereign-first by default. Every layer — embedding, retrieval, generation, observability — must stay inside UAE; no foreign API calls; UAE-controlled KMS.\n\n**Strong answer**:\n\n- **Compute & hosting** — Core42 / G42 Cloud, Azure UAE North, AWS me-central-1, or Oracle OCI UAE. No US/EU region failover for regulated data.\n- **Model** — open-weights, locally hosted: Falcon-Arabic (TII), Jais (MBZUAI), or a fine-tuned Llama variant. Falcon-Arabic for Arabic-heavy use, Jais for mixed Arabic-English. Self-hosted on UAE-resident GPUs (Core42 offers NVIDIA, Cerebras, AMD).\n- **Embeddings** — Arabic-aware embedding model (multilingual-e5 with Arabic fine-tune, or BGE-Arabic). Test on OALL v2 retrieval benchmarks.\n- **Vector store** — pgvector on UAE-region RDS or FAISS / Qdrant on UAE-region VMs. Never a managed service outside UAE.\n- **Tokenizer extension** — for Arabic-heavy corpora, audit token-per-word overhead; extend vocabulary (Falcon-Arabic added 32K Arabic tokens).\n- **RAG pipeline** — chunk with awareness of Arabic right-to-left and mixed-script segments; hybrid search (BM25 + dense) for Arabic, since pure-dense underperforms on morphologically rich languages.\n- **KMS** — UAE-controlled keys; HSM in UAE (NESA-compliant); no cross-border key escrow.\n- **NESA IAS compliance** — 11 security domains mapped to the architecture; pre-go-live audit; immutable audit log.\n- **UAE Data Office notification** — for personal data; UAE PASS integration if citizen-facing.\n- **Observability** — logs and traces stay in UAE; no SaaS APM unless the SaaS has UAE residency.\n\n**Trade-offs:** model choice is constrained (no Claude / GPT-4 unless via sovereign Azure OpenAI with UAE residency); Arabic retrieval quality is lower than English baselines; sovereign infrastructure costs more.\n\n**Interview signal:** specific UAE providers, named Arabic models, NESA reference, no foreign-API leakage.",
    keyPoints: [
      "All layers UAE-resident: compute, model, vector store, KMS, observability",
      "Open-weights Arabic LLM (Falcon-Arabic / Jais) self-hosted",
      "Hybrid retrieval (BM25 + dense) for Arabic",
      "Arabic-aware tokenizer + embedding",
      "NESA IAS + UAE Data Office compliance baked in",
    ],
    followUps: [
      "What if the ministry wants GPT-4 specifically — how do you negotiate?",
      "How do you evaluate Arabic RAG quality?",
      "What's the cost story vs a US-hosted equivalent?",
    ],
    redFlags: [
      "Pinecone / managed-service vector store without residency check",
      "English-only embedding model",
      "Pure dense retrieval for Arabic",
      "No NESA reference",
    ],
    references: [
      { title: "Falcon-Arabic — TII", url: "https://falcon-lm.github.io/blog/falcon-arabic/" },
      { title: "Core42 — sovereign AI", url: "https://core42.ai/" },
    ],
    tags: ["region-uae", "pattern-gov-public-sector", "pattern-bank-fintech", "role-architect", "role-staff-ic"],
    estimatedTimeMin: 22,
  },
  {
    id: "region-uae-002",
    categoryIds: ["llm-fundamentals"],
    topic: "Arabic LLM landscape",
    difficulty: "hard",
    experienceBands: ["senior", "lead"],
    type: "conceptual",
    prompt: "Compare Falcon-Arabic, Jais, ALLaM and AceGPT. When would you choose each?",
    answer:
      "**TL;DR.** Four open-weights Arabic LLMs, each with different training data, dialect coverage, and license. Choose by use-case + jurisdiction.\n\n**Falcon-Arabic (TII, UAE)** — 7B, 32K Arabic vocabulary extension, Apache 2.0; MSA + Gulf-leaning dialect; topped OALL v2 leaderboard at release; SFT + DPO trained. *Choose for*: UAE-based deployments, Gulf-Arabic use cases, government / sovereign-cloud preference for UAE-origin models.\n\n**Jais (MBZUAI / Inception, UAE)** — 13B / 30B variants, Apache 2.0; trained on a balanced Arabic-English corpus (~half-half); strong on MSA + bilingual contexts. *Choose for*: bilingual customer-support, content moderation needing English+Arabic, larger-context Arabic generation.\n\n**ALLaM (SDAIA, Saudi Arabia)** — 7B / 13B; trained with a heavy Saudi national-corpus weight; aligned to Saudi cultural and policy norms. *Choose for*: Saudi-jurisdiction projects, Najdi/Hijazi dialect focus, public-sector work where alignment to local norms is procurement criterion.\n\n**AceGPT (Chinese research team)** — Llama-based with Arabic post-training; multiple sizes; less Gulf-dialect emphasis. *Choose for*: research baselines, comparative evaluation, when you specifically want a Llama-architecture starting point.\n\n**Selection axes**: (1) **dialect** — MSA-only vs Gulf vs Levantine vs Maghrebi; (2) **license** — Apache 2.0 is the easy case for production; (3) **jurisdiction** — UAE projects favour Falcon/Jais; Saudi favours ALLaM; (4) **bilingual quality** — Jais and AceGPT lead; (5) **eval** — OALL v2 (ArabicMMLU, AraTrust, AlGhafa, MadinahQA) is the canonical Arabic leaderboard.\n\n**Interview signal:** specific model names + sizes + jurisdiction + dialect coverage; OALL v2 referenced.",
    keyPoints: [
      "Falcon-Arabic = UAE, Gulf-leaning, 7B, Apache 2.0",
      "Jais = bilingual Arabic-English, larger, balanced corpus",
      "ALLaM = Saudi-jurisdiction, local-norm aligned",
      "AceGPT = Llama-arch baseline, less Gulf",
      "OALL v2 is the canonical eval",
    ],
    followUps: [
      "How would you evaluate dialect handling beyond OALL?",
      "What if your use case is Egyptian Arabic specifically?",
      "When would you fine-tune vs use a closed model with Arabic via API?",
    ],
    redFlags: [
      "Treats Arabic as one language (ignores diglossia)",
      "No license awareness",
      "No mention of OALL or any Arabic benchmark",
    ],
    references: [
      { title: "Falcon-Arabic launch", url: "https://falcon-lm.github.io/blog/falcon-arabic/" },
      { title: "Jais — Inception / MBZUAI", url: "https://inceptionai.ai/jais/" },
      { title: "OALL leaderboard", url: "https://huggingface.co/spaces/OALL/Open-Arabic-LLM-Leaderboard" },
    ],
    tags: ["region-uae", "pattern-genai-lab", "pattern-gov-public-sector", "role-staff-ic"],
    estimatedTimeMin: 10,
  },
  {
    id: "region-uae-003",
    categoryIds: ["behavioral"],
    topic: "Multicultural team dynamics",
    difficulty: "medium",
    experienceBands: ["mid", "senior", "lead"],
    type: "scenario",
    prompt: "Describe working on a team where no two members share the same cultural background.",
    answer:
      "**TL;DR.** UAE tech teams are 80%+ expat, frequently 6–8 nationalities. Specific awareness of communication style, religious calendar, and authority norms is a real signal.\n\n**Strong answer**:\n\n- **Specific team composition** — name the rough mix (e.g. Emirati lead, South Asian engineers, Western architect, Arab/Levantine PM, Filipino QA). Not stereotyping — describing reality.\n- **Concrete adaptations** — meeting scheduling around prayer times and Ramadan working hours; written-vs-verbal communication preferences; direct-vs-indirect feedback styles; authority deference norms (Emirati senior may speak last in meetings, not first).\n- **Specific incident handled well** — a misunderstanding caught and corrected. Common: an indirect \"maybe\" misread as agreement; written follow-up after every verbal alignment helped.\n- **What you changed** — meeting cadences, written-first communication, explicit \"are we aligned or are we deferring this\" check, made async-default for time-zone fairness.\n- **Honest self-awareness** — what *your* default communication style is, and how you adapted.\n\nAvoid: stereotyping; framing local norms as obstacles; \"I treat everyone the same\" (which often means defaulting to your own culture and not adapting).\n\n**Interview signal:** specific composition, named adaptations, self-awareness about your own style.",
    keyPoints: [
      "Named team composition without stereotyping",
      "Concrete adaptations (prayer time, Ramadan, written follow-up)",
      "Specific incident caught + corrected",
      "Self-aware about own default communication style",
    ],
    followUps: [
      "What's the hardest part for you personally?",
      "How do you adapt to a new team member from a background you haven't worked with?",
      "How do you handle a clash between a manager's style and a report's?",
    ],
    redFlags: [
      "Stereotypes any culture",
      "'I treat everyone the same' framing",
      "No concrete adaptation named",
    ],
    references: [
      { title: "Erin Meyer — The Culture Map", url: "https://erinmeyer.com/books/the-culture-map/" },
    ],
    tags: ["region-uae", "region-global", "role-eng-manager", "role-staff-ic"],
    estimatedTimeMin: 6,
  },

  // ---------------- EXPERT TIER FILLS (4) ----------------
  {
    id: "expert-rag-001",
    categoryIds: ["rag", "evaluation"],
    topic: "Production RAG hardening",
    difficulty: "expert",
    experienceBands: ["senior", "lead"],
    type: "scenario",
    prompt: "Your production RAG system has 89% retrieval recall in eval but 62% answer accuracy in prod. Diagnose.",
    answer:
      "**TL;DR.** The gap between retrieval recall and answer accuracy is a *generation problem*, not a retrieval problem — until you prove otherwise. Diagnose in order: retrieval → assembly → generation → eval mismatch.\n\n**Strong answer** — work the funnel:\n\n1. **Verify the eval mismatch first** — is your offline eval set representative of production traffic? Production has long-tail queries, typos, multi-intent prompts that your golden set probably lacks. Mine a stratified sample of prod queries and re-score retrieval recall on those. Often the prod recall is much lower than 89%.\n2. **Retrieval realism** — top-k value, chunk size, embedding model freshness, are out-of-vocab handled? Are you reranking? If not, recall@k tells you the doc exists but not whether it's in position 1.\n3. **Prompt assembly** — is the *order* of retrieved chunks influencing the LLM (recency / primacy bias)? Are you including chunks that overlap and confuse? Are you exceeding context length and silently truncating?\n4. **Generation** — turn temperature to 0 for factual queries; check if the model is groundedness-failing (cross-encode the answer against retrieved context). Common failure: model knows the answer from training, ignores retrieval, hallucinates with confidence.\n5. **Groundedness gate** — refuse or fall back to \"I don't know\" when the answer can't be supported by retrieved context. Most teams under-invest here.\n6. **Eval rebuild** — once you've found the gap, build a regression suite from the prod-mined queries; rerun on every model / prompt / embedding change.\n\n**Trade-offs:** groundedness gate reduces helpfulness; reranking adds latency; production-mined evals leak PII if not scrubbed.\n\n**Interview signal:** named gap diagnosis order, eval rebuild from prod queries, groundedness gate.",
    keyPoints: [
      "Eval mismatch first — prod queries vs golden set",
      "Retrieval funnel: recall@k → rerank → position",
      "Prompt assembly: order, overlap, truncation",
      "Generation: groundedness cross-encode against retrieved context",
      "Groundedness gate as failure mode",
    ],
    followUps: [
      "What if rebuilding the eval reveals it's actually a retrieval problem?",
      "How do you measure groundedness automatically?",
      "What's the smallest change that gives the most lift on this kind of gap?",
    ],
    redFlags: [
      "Immediately tunes prompt without diagnosis",
      "No eval-realism check",
      "No groundedness gate",
      "Treats retrieval recall as success metric on its own",
    ],
    references: [
      { title: "RAGAS — evaluation framework", url: "https://docs.ragas.io/" },
    ],
    tags: ["region-global", "pattern-faang", "pattern-genai-lab", "role-staff-ic"],
    estimatedTimeMin: 20,
  },
  {
    id: "expert-agents-001",
    categoryIds: ["agents", "system-design"],
    topic: "Agent reliability at scale",
    difficulty: "expert",
    experienceBands: ["senior", "lead"],
    type: "system-design",
    prompt: "Your tool-using agent has a 4% step-failure rate; over a 7-step task that's ~25% end-to-end failure. How do you design for reliability?",
    answer:
      "**TL;DR.** Per-step error compounds geometrically. You don't fix it by making the model smarter — you change the topology so the error doesn't compound.\n\n**Strong answer** — five levers:\n\n1. **Shorten the chain** — every step you can do deterministically should be. The fewer LLM-decided steps, the smaller the compounded error. A 4-step task at 4% per-step failure = ~15% end-to-end vs 25% at 7 steps.\n2. **Validate at every step** — schema check, business-rule check, plausibility check. Failed validation = retry with new context, or escalate. Treat the LLM like an unreliable RPC.\n3. **Replan on failure** — instead of dying on a failed step, give the agent the failure as context and let it choose a different path. Pair with a max-iterations circuit breaker.\n4. **Reflection / self-critique step** — for high-stakes tasks, add a separate LLM call that reviews the proposed action before execution. Adds cost; reduces irreversible mistakes.\n5. **Human-in-the-loop above a threshold** — irreversible or high-value actions (refund > $X, send email to external, write to prod) escalate. The expected-cost-of-error sets the threshold.\n6. **Observability** — trace every step with tools.run / tool.result / validation outcome. Without traces, debugging is hopeless.\n\n**Trade-offs:** validation + replan increases cost and latency; reflection doubles the LLM bill; HITL throttles throughput. All worth it on irreversible actions.\n\n**Interview signal:** topology change before model upgrade; per-step validation; replan + HITL threshold; named observability.",
    keyPoints: [
      "Shorten the chain — deterministic steps wherever possible",
      "Validate every step; treat LLM like unreliable RPC",
      "Replan on failure with max-iteration breaker",
      "Reflection step for high-stakes",
      "HITL threshold by expected cost of error",
    ],
    followUps: [
      "What changes if step-failure is correlated rather than independent?",
      "How would you measure 'expected cost of error'?",
      "When does it make sense to retrain or fine-tune vs scaffolding?",
    ],
    redFlags: [
      "'Use a smarter model' as primary answer",
      "No validation between steps",
      "No HITL threshold",
      "Multiplies cost without naming it",
    ],
    references: [
      { title: "Anthropic — Building effective agents", url: "https://www.anthropic.com/research/building-effective-agents" },
    ],
    tags: ["region-global", "pattern-faang", "pattern-genai-lab", "role-staff-ic", "role-architect"],
    estimatedTimeMin: 22,
  },
  {
    id: "expert-sysd-001",
    categoryIds: ["system-design", "azure-platform"],
    topic: "Active-active multi-region",
    difficulty: "expert",
    experienceBands: ["senior", "lead"],
    type: "system-design",
    prompt: "Design active-active multi-region for a regulated payments API on Azure with <30s RTO.",
    answer:
      "**TL;DR.** Active-active <30s RTO at payments scale means conflict-free data partitioning, near-zero replication lag, and a deterministic split-brain story.\n\n**Strong answer**:\n\n- **Region pair** — Azure pair-region within the regulated jurisdiction (e.g. India South + India Central; UAE North + UAE Central). Latency ≤ 30 ms intra-pair.\n- **Traffic routing** — Front Door with geo-routing primary + health-probe-driven failover. Active-active means clients land where their data lives.\n- **Data partitioning** — *partition the data, not duplicate it*. User shard pinned to a home region with replica in the other. Write to home region; reads anywhere. Sharding key chosen so cross-shard transactions are <1% of volume.\n- **Replication** — async with bounded lag SLA (e.g. <500ms p95). Track lag; degrade writes if lag exceeds SLA (better to be slow than to corrupt).\n- **Consistency model** — strong within shard, eventual across shards. Idempotency keys protect retries. Use compensating transactions for the rare cross-shard case (saga pattern).\n- **Conflict resolution** — for the genuinely rare same-shard cross-region write, last-write-wins with monotonic clocks, *and* a reconciliation queue.\n- **Failover** — health probes per service, per region; Front Door + Traffic Manager move traffic; the *data* failover is the bigger story: promote replica to primary (Cosmos DB multi-region writes; Azure SQL auto-failover groups). Document the procedure; test quarterly.\n- **Split-brain** — explicit policy: which region wins; how the loser reconciles when it returns; manual sign-off gate or automated by quorum.\n- **Regulatory** — data residency satisfied because both regions are in the regulated jurisdiction.\n\n**Trade-offs:** active-active is *expensive* and complex; most teams should be active-passive with disciplined DR drills. Reach for active-active only when business case justifies; the RTO/RPO targets drive cost.\n\n**Interview signal:** partition-not-duplicate; bounded replication-lag SLA; explicit split-brain policy; regulatory residency.",
    keyPoints: [
      "Partition data, don't duplicate; user shard pinned to home region",
      "Async replication with bounded lag SLA; degrade on breach",
      "Strong-within-shard, eventual-across-shard; idempotency + saga for cross-shard",
      "Explicit split-brain reconciliation policy",
      "Regulatory residency satisfied by in-jurisdiction pair",
    ],
    followUps: [
      "How do you test the failover without taking prod down?",
      "What changes if you can't have an in-jurisdiction pair?",
      "Active-active vs active-passive at this scale — when is the trade worth it?",
    ],
    redFlags: [
      "Full data duplication without sharding",
      "No replication-lag SLA",
      "No split-brain policy",
      "No regulatory residency story",
    ],
    references: [
      { title: "Azure — Multi-region deployment patterns", url: "https://learn.microsoft.com/azure/architecture/patterns/multi-region/" },
      { title: "Saga pattern (Microservices.io)", url: "https://microservices.io/patterns/data/saga.html" },
    ],
    tags: ["region-global", "region-india", "region-singapore", "region-uae", "pattern-bank-fintech", "role-architect", "role-staff-ic"],
    estimatedTimeMin: 25,
  },
  {
    id: "expert-saf-001",
    categoryIds: ["safety", "agents"],
    topic: "Prompt injection at scale",
    difficulty: "expert",
    experienceBands: ["senior", "lead"],
    type: "scenario",
    prompt: "Your customer-support agent has tools that can refund and email. Design defence-in-depth against prompt injection.",
    answer:
      "**TL;DR.** Prompt injection is unsolved at the model layer. Defence-in-depth means assume the LLM *will* be tricked — bound the blast radius around it.\n\n**Strong answer** — layered defences:\n\n1. **Privilege separation** — the LLM never gets credentials to call refund/email directly. It produces a structured intent (`{action: refund, amount: 50, account: X}`); a separate authorisation service validates against business rules and customer context, then executes. The LLM has no API keys.\n2. **Action allow-listing + rate limits** — each tool has an explicit allow-list of arg shapes, value ranges (refund ≤ $X), and per-customer / per-session rate limits.\n3. **Hard rules outside the prompt** — refunds > $X require human approval; emails to external addresses require human approval; never act on input that contains \"ignore previous instructions\".\n4. **Indirect injection defence** — when the agent reads tool output (e.g. an email body, a doc, a webpage), treat that content as *untrusted user input* — never as system instructions. Strip / quote markdown that could be confused with instructions.\n5. **Spotlight / delimiters** — wrap retrieved/user content in unique delimiters and instruct the model not to act on instructions inside them. Imperfect but adds friction.\n6. **Output validation** — schema-check every tool call before execution; semantically check it's plausible (refund amount matches a real transaction).\n7. **Behavioural detection** — anomaly detection on per-session action volume, value distribution, novel argument patterns.\n8. **Red-team library** — known injection prompts run as part of CI/CD evals; regressions block deploy.\n9. **Audit + reversibility** — every action logged; reversibility plan for the most damaging actions.\n\n**Trade-offs:** privilege separation adds latency; rate limits frustrate legitimate users; hard rules make the agent feel restricted.\n\n**Interview signal:** privilege separation, indirect-injection awareness, red-team in CI/CD, audit + reversibility.",
    keyPoints: [
      "Privilege separation: LLM produces intent; auth service executes",
      "Allow-listed tool args + per-customer rate limits",
      "Indirect injection: treat retrieved content as untrusted",
      "Red-team library in CI/CD eval",
      "Hard rules + human-approval threshold for irreversible actions",
    ],
    followUps: [
      "What's your response if a successful injection is reported in prod?",
      "How do you balance these defences with conversational UX?",
      "What changes if the agent has read access to a customer's account data?",
    ],
    redFlags: [
      "LLM has direct API credentials",
      "Relies only on system prompt 'don't do X'",
      "No indirect-injection defence",
      "No red-team in CI",
    ],
    references: [
      { title: "OWASP — LLM Top 10 (Prompt Injection)", url: "https://owasp.org/www-project-top-10-for-large-language-model-applications/" },
      { title: "Simon Willison — Indirect prompt injection", url: "https://simonwillison.net/2023/Apr/14/worst-that-can-happen/" },
    ],
    tags: ["region-global", "pattern-faang", "pattern-genai-lab", "role-staff-ic", "role-architect"],
    estimatedTimeMin: 22,
  },

  // ---------------- DEBUGGING TIER FILLS (4) ----------------
  {
    id: "debug-llm-001",
    categoryIds: ["mlops", "evaluation"],
    topic: "Hallucination spike",
    difficulty: "hard",
    experienceBands: ["senior", "lead"],
    type: "debugging",
    prompt: "Your RAG chatbot's hallucination rate doubled in the last 24 hours. Walk me through your response.",
    answer:
      "**TL;DR.** Treat this like any prod regression: bisect the change surface, restore service first, root-cause second.\n\n**Strong answer**:\n\n1. **Triage** (first 30 min) — is it a real spike or a measurement artefact? Sample 100 recent flagged responses; manually validate the metric. Many \"hallucination spikes\" are eval-tooling regressions.\n2. **Restore service** — flip to last-known-good if the spike correlates with a deploy. Acceptable to roll back even before root-causing.\n3. **Bisect the change surface** — list everything that changed in 24 hours: model version (vendor silently rotated?), embedding model, prompt template, retrieval index (re-indexed? new docs?), chunking strategy, post-filter, evaluation pipeline. Bisect.\n4. **Common culprits**:\n   - Vendor model rotation (OpenAI / Anthropic ships a quiet update)\n   - Embedding model change without reindex\n   - New documents ingested with wrong metadata or chunk size\n   - Prompt template change losing the groundedness instruction\n   - Cache poisoning: a bad answer cached and replayed\n   - Eval pipeline change in the *measurement* (false alarm)\n5. **Mitigation** — pin model version explicitly; revert the changed component; add the case to red-team library.\n6. **Post-mortem within 5 days** — blameless, system-failure framed. What detection signal would have caught this faster?\n\n**Interview signal:** measurement-first, restore-first, bisect cleanly, named common culprits, post-mortem follow-through.",
    keyPoints: [
      "Verify the metric isn't a measurement artefact",
      "Restore service before root-causing",
      "Bisect across model / embedding / index / prompt / cache",
      "Vendor-model rotation is a frequent cause",
      "Post-mortem with detection-signal improvement",
    ],
    followUps: [
      "What if the rollback option doesn't exist?",
      "How would you detect this in <1 hour next time?",
      "What's the user-facing communication during the incident?",
    ],
    redFlags: [
      "Jumps straight to 'tune the prompt'",
      "No metric verification",
      "Ignores vendor-version rotation",
      "No post-mortem follow-through",
    ],
    references: [
      { title: "Google SRE Book — Incident response", url: "https://sre.google/sre-book/managing-incidents/" },
    ],
    tags: ["region-global", "pattern-faang", "pattern-genai-lab", "role-tech-lead", "role-staff-ic"],
    estimatedTimeMin: 15,
  },
  {
    id: "debug-cost-001",
    categoryIds: ["mlops", "safety"],
    topic: "LLM cost spike",
    difficulty: "hard",
    experienceBands: ["mid", "senior", "lead"],
    type: "debugging",
    prompt: "Your LLM API bill is 8× normal this morning. Walk me through the next hour.",
    answer:
      "**TL;DR.** Bound the spend now, locate the source second.\n\n**Strong answer**:\n\n1. **Bound the spend — minute 1** — flip the per-endpoint rate limit to a fraction of normal, or pause non-critical endpoints. A bill you can't read in real time is a fire you can't see.\n2. **Locate the source — minute 5–20** — break the bill by endpoint, by team tag, by model. The 8× is almost always concentrated in one source.\n3. **Identify the pattern** — common patterns: (a) agent loop (max-iteration bug, no circuit breaker); (b) prompt-injection-driven cost (attacker repeatedly invokes expensive model); (c) cache miss (key change broke semantic cache); (d) cron / backfill job that fired today; (e) new feature shipped that calls LLM where it shouldn't; (f) vendor pricing change (rare but real).\n4. **Verify with traces** — pull request-level traces for the spike window; group by user / session / prompt template.\n5. **Mitigate** — circuit-break the offending source; add a per-session cost ceiling; rotate API keys if you suspect external abuse.\n6. **Add detection** — anomaly alert on hourly cost per endpoint, 3σ over rolling baseline. Without this, today's incident silently repeats.\n7. **Post-mortem** — blameless, system-framed; the question is \"why didn't we detect this in 10 minutes instead of overnight\".\n\n**Interview signal:** bound-first, attribution by source, agent-loop hypothesis, detection added.",
    keyPoints: [
      "Bound spend first (rate-limit / pause) before investigating",
      "Attribute by endpoint / team / model",
      "Agent loop and prompt-injection are common causes",
      "Add 3σ hourly anomaly alert post-mitigation",
    ],
    followUps: [
      "What's your communication plan if you can't pause the endpoint without breaking customers?",
      "How would you detect a slow, expensive abuse pattern (5% over baseline for a week)?",
      "What's the smallest budget control you'd add for every new LLM endpoint going forward?",
    ],
    redFlags: [
      "Investigates before bounding spend",
      "No per-team / per-endpoint attribution",
      "No anomaly detection added",
      "Doesn't consider prompt-injection abuse",
    ],
    references: [
      { title: "OpenAI — Usage policies & rate limits", url: "https://platform.openai.com/docs/guides/production-best-practices" },
    ],
    tags: ["region-global", "pattern-faang", "pattern-genai-lab", "role-tech-lead", "role-staff-ic"],
    estimatedTimeMin: 12,
  },
  {
    id: "debug-prod-001",
    categoryIds: ["azure-platform", "system-design"],
    topic: "p99 latency spike",
    difficulty: "hard",
    experienceBands: ["mid", "senior", "lead"],
    type: "debugging",
    prompt: "Java Spring Boot microservices on Azure show p99 latency spikes during month-end batch jobs. Diagnose.",
    answer:
      "**TL;DR.** p99 during cron-aligned spikes is almost always *resource contention* downstream of the batch — the user request isn't what's slow; it's waiting for something the batch is holding.\n\n**Strong answer** — work it as a funnel:\n\n1. **Confirm correlation** — overlay the latency spike with the batch schedule. Is it the entire batch window, or a particular phase (data load, compute, write-back)?\n2. **Saturation diagnosis** — at the spike: CPU, memory, IO, network, GC pause, connection-pool exhaustion, thread-pool queue depth. App Insights / Container Insights / `kubectl top` / `jcmd` thread dumps. p99 spikes with stable p50 strongly indicate contention.\n3. **Common culprits in this shape**:\n   - **DB connection pool exhaustion** — batch holds connections; user requests queue. HikariCP `awaitNanos` metric is the giveaway.\n   - **Lock contention** — batch holds row/table locks; user reads block. Check `pg_locks` or equivalent.\n   - **GC pressure** — batch allocates heavily; old-gen fills; full GC pause. JVM GC logs.\n   - **Noisy neighbour** — if AKS / ACA, the batch pod hogs CPU on the node.\n   - **Network / storage IOPS quota** — batch reads big blob storage; throttled; latency knocks on.\n4. **Hypothesis confirm-or-deny** — pick the most likely (usually connection pool), check the metric, prove or move on. Don't tune until you've confirmed.\n5. **Mitigations** — separate the batch onto its own node pool / its own DB replica / its own connection pool; rate-limit the batch; reschedule to off-peak; convert synchronous batch to streaming if scale warrants.\n6. **Preventive** — alert on pool-wait time, GC pause time, lock-wait. They should fire before the user p99 does.\n\n**Trade-offs:** isolating the batch costs more (replica, node pool). Compare against the user-visible cost of the spike.\n\n**Interview signal:** named saturation diagnosis order, named likely culprit (connection pool), preventive instrumentation.",
    keyPoints: [
      "Correlate spike with batch schedule explicitly",
      "p99 with stable p50 = contention not raw load",
      "Connection-pool exhaustion is the most common cause in this shape",
      "GC, locks, IOPS quota as adjacent hypotheses",
      "Isolate batch onto own pool / replica as primary mitigation",
    ],
    followUps: [
      "What changes if it's Cosmos DB / SQL Database instead of self-managed?",
      "How do you size connection pools for this kind of bursty pattern?",
      "What metric would tell you the problem is GC vs connection pool?",
    ],
    redFlags: [
      "Tunes JVM flags without diagnosis",
      "Assumes 'just scale out'",
      "No metric checked before mitigation",
      "Doesn't consider connection pool",
    ],
    references: [
      { title: "Brendan Gregg — USE Method", url: "https://www.brendangregg.com/usemethod.html" },
      { title: "HikariCP — Pool sizing", url: "https://github.com/brettwooldridge/HikariCP/wiki/About-Pool-Sizing" },
    ],
    tags: ["region-global", "pattern-bank-fintech", "pattern-faang", "role-tech-lead"],
    estimatedTimeMin: 15,
  },
  {
    id: "debug-vec-001",
    categoryIds: ["vector-search", "rag"],
    topic: "Vector search recall regression",
    difficulty: "hard",
    experienceBands: ["mid", "senior"],
    type: "debugging",
    prompt: "After a routine reindex, recall@10 on your vector store dropped from 0.91 to 0.62. Debug.",
    answer:
      "**TL;DR.** Recall regressions on reindex almost always come from embedding-model mismatch, chunk-strategy change, or index-build parameters. Bisect cleanly.\n\n**Strong answer**:\n\n1. **Verify the regression** — eval set is the same? Re-run on the old index and confirm 0.91 still holds. If the eval set changed, the regression isn't real.\n2. **What changed at reindex**:\n   - **Embedding model version** — silently upgraded? Same-named model from a different provider snapshot?\n   - **Chunk strategy** — different chunk size or overlap; tokenization different for the source docs\n   - **Index params** — HNSW `M`, `efConstruction`, `efSearch`; IVF `nlist`, `nprobe`. A higher-recall config got reverted.\n   - **Doc set** — did you accidentally reindex against a stale corpus? Are docs missing?\n   - **Distance metric** — cosine vs dot product silently swapped (Azure AI Search default changed once)\n3. **Pinpoint** — for 10 known-good queries, retrieve top-50 from old and new indexes, diff. Often the relevant doc is now at position 11–20, meaning the index works but ranking shifted.\n4. **Common fixes**:\n   - Bump `efSearch` (HNSW) or `nprobe` (IVF) — trades query latency for recall\n   - Restore embedding model version\n   - Reduce chunk size or increase overlap\n   - Add reranker (cross-encoder) on top-k to recover position\n5. **Lesson learnt** — pin the embedding model + index params + chunk strategy as a single artifact. Reindex should be reproducible. Don't reindex into prod without an offline recall gate.\n\n**Interview signal:** bisect cleanly, named index params (HNSW / IVF), restore as a path, recall gate before prod.",
    keyPoints: [
      "Verify the regression isn't an eval-set change",
      "Bisect: embedding model / chunk / index params / corpus / distance metric",
      "HNSW efSearch and IVF nprobe are common recall levers",
      "Reranker on top-k as a recovery option",
      "Pin embedding + chunk + index params as one artifact",
    ],
    followUps: [
      "What's your offline recall gate look like before a prod reindex?",
      "How would you A/B a new embedding model safely?",
      "Recall@10 = 0.62 with what precision? Does that matter?",
    ],
    redFlags: [
      "Tunes the prompt instead of the index",
      "Doesn't verify the eval set",
      "Treats embedding model as static",
      "No recall gate before prod reindex",
    ],
    references: [
      { title: "HNSW — Malkov & Yashunin", url: "https://arxiv.org/abs/1603.09320" },
      { title: "Azure AI Search — vector search", url: "https://learn.microsoft.com/azure/search/vector-search-overview" },
    ],
    tags: ["region-global", "pattern-faang", "pattern-genai-lab", "role-tech-lead"],
    estimatedTimeMin: 12,
  },
];

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
