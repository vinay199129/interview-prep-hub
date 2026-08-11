# Agentic AI Solution Architect — Interview Guide (12+ years)

A complete, round-by-round preparation guide for a senior/principal **Solution Architect — Agentic AI / Enterprise AI** role. Built from a job description asking for 12+ years in solution architecture, AI/ML and Generative AI, with explicit expectations around **agentic architecture, use-case discovery, LLM selection, AI security and Responsible AI, guardrails, integration architecture, technical governance and stakeholder management**. Used by the `/agentic-ai` page.

> **Scope note.** No employer's internal architecture is published, so everything below is an **industry-standard pattern you should be able to defend**, backed by primary sources (papers, vendor docs, standards bodies) linked in *Learn it properly* and *Sources*. Treat vendor and product facts as public context, not insider knowledge. Product surfaces in this space change fast — always re-check the linked docs before an interview and say so out loud if a detail is version-dependent; that itself is an architect signal.

---

## The JD, decoded — what each line is really testing

| JD line | What the interviewer is actually probing | Where it shows up in the loop |
| --- | --- | --- |
| 12+ years in solution architecture / AI-ML / GenAI | Can you operate at portfolio altitude, not project altitude? | Rounds 1–2, executive round |
| Strong expertise in **agentic AI architecture** | Do you know when *not* to use an agent, and can you name/justify patterns? | Rounds 3–5 |
| **Use-case discovery**, requirement analysis, business → scalable AI | Do you have a repeatable qualification method, or do you just say yes? | Round 3 |
| **Agent design patterns**, autonomous & multi-agent | Depth: ReAct, planner-executor, reflection, supervisor/orchestrator, hand-off, HITL | Round 4 |
| **LLM evaluation & selection** on business/technical/perf/cost | Can you build a selection matrix and defend it with numbers? | Round 6 |
| AI security, Responsible AI, risk, enterprise security | Threat modelling for AI, not generic security theatre | Round 7 |
| **AI guardrails** for secure, reliable, compliant behaviour | Layered controls with failure modes, not "we added a system prompt" | Round 8 |
| **Integration architecture** — APIs, enterprise apps, data, external | The unglamorous 70% of the work: contracts, identity, idempotency, latency budgets | Round 9 |
| **Technical governance**, standards, best practices | Do you produce artefacts (ADRs, paved roads, review gates) or opinions? | Round 10 |
| Scalable, secure, high-performance, enterprise-ready | Capacity, cost per task, latency budgets, resilience, AgentOps | Round 11 |
| Cross-functional collaboration + stakeholder management | Influence without authority; translating between CxO and engineers | Rounds 12–13 |

**The single biggest differentiator at this level:** most candidates describe *what an agent is*. You must describe **what breaks in production** — non-determinism, unbounded loops, tool-call cost blow-ups, prompt injection through retrieved content, silent quality regression on model upgrade, and no rollback story — and the architecture that contains each.

---

## How to use this guide

Read each answer as a **spoken structure**, not a script. Every design answer should open by driving requirements before drawing anything:

1. **Business outcome and the decision the agent replaces or assists.** What is the unit of work? What does "good" mean numerically?
2. **Autonomy level and blast radius.** Read-only, write-with-approval, or fully autonomous? What is the worst thing a wrong action can do?
3. **NFRs.** p50/p95 latency, concurrency, task success rate, cost per resolved task, availability, RTO/RPO.
4. **Data classification and residency.** What data reaches the model? Who can see the trace?
5. **Compliance and audit.** What evidence must exist after the fact?

Then move: architecture → control flow → data/state → evaluation → guardrails → operations → trade-offs → what you'd do differently at 10× scale.

For leadership rounds, answer with **artefacts**: ADRs, C4 views, a model-selection matrix, an eval suite, a threat model, an AI use-case intake form, a risk register, a golden-path repo, a cost dashboard. Artefacts are how a 12-year architect is distinguished from a very good 6-year engineer.

---

## Round 1 · Recruiter / HR screen

**What they're testing:** Is your experience at enterprise altitude, is the GenAI experience *production* rather than *pilot*, and are logistics (notice, comp, location) aligned?

### Q: Walk me through your background in 90 seconds, architect-level.

**Answer:** Frame it as three arcs, ending in agentic AI.

"I have 12+ years progressing from hands-on engineering into solution and enterprise architecture. The first arc was distributed systems and cloud-native platforms — microservices, event-driven integration, multi-region resilience. The second arc was data and ML platforms — pipelines, feature stores, model lifecycle and governance. The third, and where I spend most of my time now, is production Generative AI: RAG systems, tool-using agents and multi-agent workflows, with the surrounding evaluation, guardrail and governance machinery.

Concretely, I own architecture decisions across [N] teams, define the NFRs and reference architectures they build against, run the AI architecture review for the portfolio, and I'm accountable for cost, security posture and delivery risk — not just the diagram. The thing I'd emphasise for this role is that I've taken agentic systems past demo into production, which mostly means I've been burned by non-determinism, tool failures, prompt injection and cost variance, and I've built the controls for each."

**Key points:** ownership language, production (not pilot) GenAI, quantified scope, governance accountability.
**Red flags:** all pilots and PoCs; "we used LangChain" as the whole story; no numbers; no mention of evaluation or security.

### Q: How much of your GenAI work reached production, and what scale?

**Answer:** Be exact and unembarrassed about the ratio. A credible answer sounds like: "Of the [X] GenAI initiatives I architected, [Y] reached production. Largest carried ~[N] requests/day across [M] business units, with p95 end-to-end latency of [T] seconds and a measured cost of ~$[C] per resolved task. Two were deliberately killed at the discovery gate because a deterministic workflow or classical ML solved them cheaper — I count those as wins, because the expensive failure in this field is shipping an agent where a rules engine would do."

**Key points:** production ratio, throughput, latency, unit cost, willingness to kill use cases.
**Red flags:** implying everything succeeded; no cost figure; no idea what p95 was.

### Q: Why this role / why agentic AI now?

**Answer:** "Because the bottleneck has moved. Two years ago the hard part was getting a model to produce useful text; that's largely commoditised. The hard part now is making a system that *takes actions* safe, observable, governable and economically sane inside an enterprise — identity for agents, tool permissions, guardrails, evaluation as a release gate, and integration with systems of record that were never designed for a non-deterministic caller. That's an architecture problem, and it's the problem I want to own."

**Key points:** thesis about where the difficulty actually is; role-fit reasoning.
**Red flags:** hype language; "agents will replace everything."

### Q: Compensation and notice period.

**Answer:** Give a researched range for the market and grade, anchored on total package (base, bonus, equity/allowances, relocation if applicable), and an exact notice period. "I'm targeting [range] for the scope described; I'm flexible on the mix depending on total package and the architecture remit — specifically whether this role owns standards for the portfolio or advises a single programme." That last clause quietly negotiates scope, which is what actually sets the grade.

---

## Round 2 · Hiring manager — scope, ownership & architecture altitude

**What they're testing:** Have you owned architecture across teams you don't manage, and can you govern without blocking?

### Q: What's the broadest architecture scope you've owned?

**Answer:** Describe blast radius, not headcount. "Decisions I made about [the agent runtime, the tool/permission model, the retrieval layer contract, the evaluation gate] were binding on [N] teams and [M] applications. Getting the tool-permission model wrong would have meant every team inventing their own auth path into systems of record — so I treated it as a platform decision with an ADR, a reference implementation and a conformance test, not as guidance."

Follow with the regulated/complex example: multi-entity data boundaries, residency, audit evidence.

**Key points:** cross-team blast radius, NFR ownership, platform vs project thinking.
**Red flags:** single-team examples; describing headcount instead of decision reach.

### Q: How do you keep 6–10 teams consistent with your architectural intent when they don't report to you?

**Answer:** "Artefacts and paved roads, with automation doing the enforcing.

- **Intent is written down** — ADRs and reference architectures with explicit NFRs, consequences, security and cost implications. If it isn't in an ADR it isn't a standard, it's an opinion.
- **The easy path is the compliant path** — a golden-path template repo: agent runtime scaffold, gateway-mediated model access, tool registry client, tracing/OTel wired in, eval harness, content-safety filters on by default, cost tags.
- **Automated gates** — CI checks for: no direct model endpoint calls (must route through the gateway), no unregistered tools, eval suite present and passing thresholds, prompt/config under version control.
- **Human review only for high blast radius** — new autonomous write-capable agents, new data classifications, new external egress.
- **Exceptions are recorded** with owner, expiry date and remediation plan, in a register I review monthly.

Governance as acceleration: teams adopt it because it's faster than building their own, not because I told them to."

**Key points:** ADRs, golden path, automated conformance, exception register, tiered review.
**Red flags:** "I attend design reviews"; architecture-by-slide-deck; no automation.

### Q: How do you decide *not* to build an agent?

**Answer:** "I use an autonomy ladder and take the lowest rung that meets the outcome:

1. **Deterministic workflow / rules** — the requirement is stable, auditable and high-volume.
2. **Classical ML** — the task is prediction/classification with labelled data; cheaper, faster, more testable.
3. **Single LLM call with structured output** — bounded transformation, extraction or classification.
4. **RAG (retrieve-then-generate)** — the task is grounded question answering over a known corpus.
5. **Tool-using agent (single)** — the task needs a *variable number* of steps and real system interaction.
6. **Multi-agent** — genuinely separable specialisations, separate tool/permission boundaries, or parallelism that pays for the coordination overhead.

Each rung adds non-determinism, latency, cost and failure modes. I only climb when the rung below provably can't meet the outcome. The most senior thing I do in discovery is talk people *down* the ladder."

**Key points:** explicit ladder, cost of autonomy, willingness to say no.
**Red flags:** multi-agent as the default answer.

---

## Round 3 · AI use-case discovery & requirement analysis

**What they're testing:** Do you have a repeatable method for turning vague business asks into scoped, feasible, measurable AI solutions — and for killing bad ones early?

### Q: A business unit says "we want an AI agent for customer support." Walk me through what you do.

**Answer:** Run a structured discovery, not a workshop about technology.

**1. Find the decision and the unit of work.** What task, performed how many times per day, by whom, taking how long, costing what? "AI for support" isn't a use case; "deflect password-reset and order-status contacts, currently 38% of 12k weekly tickets, 6 min average handle time" is.

**2. Establish the value hypothesis with a number.** Value = volume × (time or cost saved per unit) × automation rate × quality factor. If the arithmetic doesn't clear the build+run cost with margin, stop here.

**3. Classify the task shape.** Retrieval? Extraction? Reasoning over multiple steps? Action-taking in systems of record? This determines the autonomy rung.

**4. Interrogate the data.** Does the ground truth exist, is it accessible, is it current, is it clean, who owns it, what's its classification, can it leave the boundary? Most GenAI projects fail here, not on the model.

**5. Define "good" before building.** Task success rate, groundedness/faithfulness, containment/deflection rate, escalation precision, p95 latency, cost per resolved contact, safety violation rate. Agree a **release threshold** for each with the business owner, in writing.

**6. Risk and compliance triage.** Who is affected by an error, how reversible is it, what regulation applies (sectoral rules, EU AI Act risk tier if in scope), does a human need to be in the loop, what audit evidence is required?

**7. Feasibility spike, time-boxed.** Build the eval set *first* (100–200 representative cases with expected outcomes), then a thin vertical slice. Measure against thresholds.

**8. Gate decision.** Proceed / re-scope to a lower autonomy rung / kill. Record the decision and rationale — killed use cases are reusable knowledge.

**Key points:** quantified value hypothesis, data reality check, success metrics agreed *before* build, eval-set-first, explicit gate.
**Red flags:** starting with framework choice; no metric definition; no kill criteria.

### Q: How do you prioritise a portfolio of 30 candidate AI use cases?

**Answer:** "Score on two axes and one veto.

- **Value axis:** annualised benefit (cost, revenue, risk reduction), strategic fit, number of users.
- **Feasibility axis:** data readiness, integration complexity, task determinism, evaluability (can we even measure success?), change-management burden on the humans affected.
- **Veto:** unacceptable risk tier without a viable control, or no accountable business owner.

That gives four quadrants. Sequence deliberately: start with **high-value, high-feasibility** but *also* deliberately pick one that shares infrastructure with several others — the second use case should cost 40% of the first because the retrieval layer, gateway, eval harness and guardrails are already there. I make that platform leverage explicit in the roadmap, because it's the argument that funds the platform."

**Key points:** two-axis scoring, veto criterion, platform leverage as sequencing logic, named business owner.
**Red flags:** pure gut ranking; ignoring change management; treating each use case as an island.

### Q: How do you translate a business requirement into an NFR set for an agentic system?

**Answer:** Map each business statement to a measurable constraint.

| Business statement | Architectural NFR |
| --- | --- |
| "It has to feel instant" | p95 first-token < 1s; p95 full task < 8s; streaming required |
| "It must never give wrong policy info" | Groundedness ≥ 0.95 on eval set; citations mandatory; refuse-if-unsupported behaviour; no-answer is a *success* state |
| "It should handle Black Friday" | 20× peak concurrency, provisioned throughput + queued fallback, graceful degradation to a cheaper model/answer |
| "Legal needs to review what it did" | Full trace retention (prompt, retrieved docs, tool calls, model+version, output) for N years, immutable, access-controlled |
| "It mustn't leak customer data" | Data classification per tool; per-user identity propagation to retrieval; no cross-tenant context; PII redaction pre-model |
| "We can't blow the budget" | Cost per task ceiling with per-tenant budgets, token/step caps, hard circuit-breaker |

"The discipline is that every one of those has an owner, a measurement method and a release threshold. Un-measurable NFRs are decoration."

---

## Round 4 · Agent design patterns (autonomous & multi-agent)

**What they're testing:** Genuine pattern depth — can you name patterns, state their failure modes, and choose between them under constraints?

### Q: What is an "agent," architecturally?

**Answer:** "Strip the marketing: an agent is a **control loop around a model that can call tools and decide when to stop**. The model proposes actions; the runtime executes them against real systems; observations feed back into context; a termination condition ends the loop. Everything interesting is in the parts that aren't the model: the tool contracts and permissions, the state/memory model, the termination and budget controls, the error handling, and the observability.

The architectural consequence is that an agent is a **distributed system with a non-deterministic scheduler**. That reframing drives every decision I make: idempotency on every tool, budgets on every loop, tracing on every step, and a compensation story for partial completion."

**Key points:** loop + tools + termination; the runtime is the architecture; non-deterministic scheduler framing.
**Red flags:** defining agents purely as prompt patterns.

### Q: Name the core agent design patterns and when each applies.

**Answer:**

**Single-agent patterns**

- **ReAct (reason + act interleaved).** Model alternates reasoning traces and tool calls. Good default for variable-step tasks. *Failure mode:* loops, thrashing between tools, context bloat. *Control:* step budget, tool-call dedupe, forced-progress checks. ([Yao et al., 2022](https://arxiv.org/abs/2210.03629))
- **Plan-and-execute (planner/executor separation).** A planner drafts a full plan; an executor runs steps, optionally re-planning on failure. Better cost and predictability for long tasks; lets you review the plan before execution — a natural human-approval point. *Failure mode:* brittle plans when the environment changes mid-run.
- **Reflection / self-critique.** A critic pass reviews output against criteria and triggers revision. Meaningfully improves quality on generation tasks. *Failure mode:* latency and cost doubling, self-congratulatory critique. *Control:* max 1–2 reflection rounds, critique against an explicit rubric or an external verifier (tests, schema validation, a retrieval check) rather than vibes. ([Reflexion, Shinn et al., 2023](https://arxiv.org/abs/2303.11366))
- **Tool use / function calling with structured output.** The workhorse. Constrain outputs with JSON Schema; validate before executing. ([Toolformer](https://arxiv.org/abs/2302.04761); [Model Context Protocol](https://modelcontextprotocol.io/) for standardised tool exposure.)
- **Routing / dispatch.** A cheap classifier routes to specialised handlers — often a small model or even a rules layer. The highest-ROI pattern in practice: it keeps expensive reasoning off easy traffic.
- **Retrieval-augmented generation.** Not an agent pattern per se, but almost always the grounding substrate. Agentic RAG adds query rewriting, multi-hop retrieval and self-correction. ([Lewis et al., 2020](https://arxiv.org/abs/2005.11401); [Self-RAG](https://arxiv.org/abs/2310.11511); [Corrective RAG](https://arxiv.org/abs/2401.15884))

**Multi-agent patterns**

- **Supervisor / orchestrator-worker.** A coordinator decomposes work and delegates to specialists, aggregating results. Most common enterprise shape; keeps control flow centralised and auditable.
- **Hand-off / triage.** Agents transfer the conversation with context to a better-suited peer (classic in customer service). Keep the hand-off contract explicit — what state transfers, what doesn't.
- **Sequential pipeline.** Deterministic ordering of specialist steps (extract → validate → summarise → file). Prefer this over free-form collaboration whenever the order is actually known — it's testable.
- **Parallel fan-out / map-reduce.** Independent subtasks run concurrently and merge. The main genuine latency win in multi-agent designs.
- **Debate / ensemble with a judge.** Multiple candidates, an adjudicator selects. Expensive; reserve for high-stakes, low-volume decisions.
- **Group chat / free collaboration.** Emergent, hard to test, hard to bound. I use it for exploration, rarely for production.
- **Agent-to-agent across organisational boundaries.** Needs a protocol and identity story ([A2A](https://a2a-protocol.org/), [MCP](https://modelcontextprotocol.io/)) — treat a peer agent as an untrusted external system.

**Cross-cutting**

- **Human-in-the-loop:** approve-before-act, review-after-act, or escalate-on-uncertainty. Choose per action risk, not per agent.
- **Memory:** short-term (working context), episodic (past runs/threads), semantic (facts, vectorised), procedural (learned routines). Every memory tier is a data-governance surface — memory is a *retention and leakage* decision, not a feature toggle.
- **Reflection + tool + planning + multi-agent** is the widely used four-pattern taxonomy (Ng); useful vocabulary in an interview because interviewers often use it.

### Q: When does multi-agent actually beat a single well-built agent?

**Answer:** "Three legitimate reasons, and one illegitimate one.

Legitimate: (1) **separate permission boundaries** — the agent that reads HR data must not be the agent that posts to the public site, and separation is enforced by having different identities and tool sets; (2) **genuine parallelism** — independent subtasks whose latency you can overlap; (3) **context isolation** — long specialised contexts that would otherwise collide and degrade each other, or different models genuinely suited to different subtasks.

Illegitimate: making the org chart into an architecture because a diagram with five agents looks more impressive. Multi-agent multiplies non-determinism, cost and debugging difficulty — coordination failures are the dominant failure class, and error compounds across hops (0.95 per step is 0.77 over five steps). My default is one agent with good tools; I split when I can name which of the three reasons applies."

**Key points:** permissions, parallelism, context isolation; compounding error math; default to simple.
**Red flags:** "multi-agent is more scalable" with no mechanism.

### Q: How do you stop an agent looping forever or burning budget?

**Answer:** Defence in depth, all enforced by the runtime, never by the prompt:

- **Step budget** (max iterations) and **wall-clock deadline** per task.
- **Token/cost budget** per task, per user, per tenant, per day — with a hard circuit breaker, not a warning.
- **Repetition detection:** hash tool name + normalised arguments; identical repeats short-circuit with a "you already tried this" observation, and N repeats terminate.
- **Progress checks:** if no new information has entered context for K steps, force a summarise-and-decide step.
- **Per-tool timeouts, retries with jitter, and circuit breakers** on downstream systems.
- **Terminal states are explicit:** success, escalate-to-human, give-up-with-reason. "Give up cleanly with a reason" must be a first-class, *rewarded* outcome, otherwise the model will thrash to avoid it.
- **Kill switch:** a runtime flag that disables a tool, an agent or the whole fleet without a deployment.

"And all of it is observable — I want a dashboard of steps-per-task and cost-per-task distributions, because the tail is where the money goes."

### Q: How do you handle state and memory in an agentic system?

**Answer:** "Externalise it. The agent process must be stateless; conversation and run state live in a store (durable, versioned, keyed by thread/run id) so a run can resume after a crash, be inspected, and be replayed.

Then treat each memory tier as a governance object: short-term working context (ephemeral, capped, summarised on overflow), episodic run history (retention policy, PII-scrubbed), semantic memory (vector store, per-user or per-tenant partitioned — cross-tenant memory bleed is a breach, not a bug), procedural memory (versioned like code, because it changes behaviour).

Two rules I never bend: **memory writes are permissioned like any other write**, and **memory is retrievable and deletable per subject** — otherwise you fail your first data-subject deletion request."

---

## Round 5 · Agentic system design cases

Each case: drive requirements first, then architecture, control flow, data, guardrails, evaluation, operations, trade-offs.

### Case 1 · Enterprise support agent that can actually act (read + write)

**Requirements to establish:** contact volume and peak, channels, which actions are write actions (refund, reschedule, credential reset), reversibility of each, per-action authority limits, languages, latency expectation, audit needs, existing systems of record (CRM, ticketing, billing).

**Architecture:**

- **Channel layer** → web/chat/voice/email adapters normalise to a common task envelope (tenant, user identity, channel, locale, correlation id).
- **AI gateway** in front of all model calls: authentication, per-tenant quota and budget, model routing/fallback, prompt+response logging, PII redaction, content safety. Every model call in the enterprise goes through it — that's the control point that makes governance possible at all.
- **Orchestrator** (durable workflow engine) hosts the agent loop. Durable because tasks span human approvals and flaky downstreams; you need resumability and exactly-once side-effect semantics.
- **Retrieval layer** over policy/KB content with **identity-scoped filtering** — the retrieval query carries the end user's identity so the agent can never surface documents that user couldn't open. Hybrid search (keyword + vector) with reranking; chunking tuned per document type; freshness pipeline with change-data-capture from source systems.
- **Tool layer** = registered, versioned, schema-described capabilities over existing APIs. Each tool declares: input/output schema, side-effect class (read / reversible write / irreversible write), required scopes, rate limit, timeout, idempotency requirement, data classification.
- **Policy engine** external to the model: authority limits (refund ≤ $X auto, > $X requires approval), eligibility rules, entitlement checks. Business rules that must be *right* live here, not in a prompt.
- **Human-in-the-loop service**: approval queues, SLA, escalation with full context hand-off to an agent-assist view for the human.
- **Observability**: OpenTelemetry GenAI traces — every step, tool call, token count, latency, model+version, retrieval hits, guardrail verdicts — into a trace store with a replay UI.

**Control flow:** classify intent (cheap model or classifier) → route → retrieve → reason/act loop with step budget → policy check before any write → execute write via idempotent tool → verify → summarise + cite → close or escalate.

**Key design decisions to defend:**

- *Why a durable workflow engine, not a request-scoped loop?* Because human approvals and long tool latencies make in-memory loops lose work; and because partial completion needs compensation.
- *Idempotency:* every write tool takes a deterministic idempotency key derived from run id + step; retries can't double-refund. This is the single most important correctness control in an acting agent.
- *Confidence and refusal:* the agent must have a supported "I can't determine this — escalating" path, and escalation precision is a tracked metric.
- *Degradation:* if retrieval is down, answer only from policy-cached content with a warning, or escalate; never free-generate policy.

**Evaluation:** offline eval set of ~300 real contacts with expected outcomes; metrics = task success, groundedness, escalation precision/recall, unsafe-action rate (must be 0 on the red-team set), p95 latency, cost per resolved contact. Online: shadow mode → 5% canary with human review of 100% of writes → progressive rollout with automatic rollback on metric regression.

### Case 2 · Multi-agent document/claims processing at volume

**Requirements:** documents/day, document types, extraction fields, accuracy requirement per field, regulatory retention, straight-through-processing target, existing OCR/DMS.

**Design:** deliberately a **sequential pipeline with specialists**, not free-form collaboration — classify → extract (structured output, schema-validated) → validate against systems of record and business rules → decide (auto-approve / refer / reject) → file + notify. Parallel fan-out across documents; per-field confidence with routing to human review below threshold. Deterministic components do everything deterministic: schema validation, arithmetic, rules. Critically: **the model never does arithmetic that matters** — it extracts values and a calculator/tool computes.

**Trade-offs to voice:** classical ML/OCR beats an LLM on cost for high-volume fixed layouts; the LLM earns its place on layout variability and long-tail formats. A hybrid (deterministic extractor first, LLM fallback on low confidence) is usually the right economic answer, and I'd state that explicitly rather than pretend the LLM should see every page.

**Scale:** queue-based ingestion with backpressure; batch where latency allows (batch APIs are materially cheaper); cache by document hash; prioritise by SLA class.

### Case 3 · Cross-system "agentic automation" over enterprise apps

**Scenario:** an agent that spans CRM, ERP, ticketing and email to complete a business process end to end.

**The hard parts are integration, not intelligence:**

- **Identity:** the agent acts *on behalf of* a user (delegated, scoped, consent-bound) or as itself (service identity with narrowly scoped permissions and its own auditable principal). Decide per action; never a shared god-mode credential. Agent identity, entitlement review and credential lifecycle are first-class governance items.
- **Contracts:** wrap each system in a tool with a stable schema — the anti-corruption layer pattern. Never let the model see raw enterprise payloads it might be prompt-injected by, and never let a vendor field rename break the agent.
- **Consistency:** the process spans systems with no distributed transaction. Use a **saga with explicit compensations** and record which steps completed; a partially completed agent run is the norm, so design for it.
- **Latency budget:** allocate it — e.g. 8s total = 0.4s retrieval + 3× tool calls at 0.8s + 2 model calls at 1.2s + overhead. Publish the budget; every new tool must fit or something gives.
- **Rate limits and quotas** on the enterprise systems are usually the real scaling ceiling, not the model.

### Case 4 · Regulated-industry copilot with strict grounding

**Non-negotiables:** answer only from approved sources, citations always, refuse when unsupported, full audit trail, data residency, no training on customer data, human review for anything that constitutes advice. Design consequences: retrieval-only generation with a groundedness verifier in-line (an independent check that every claim maps to a retrieved span, and low-groundedness answers are suppressed rather than shown), immutable trace store, region-pinned model deployments with a documented fallback that never crosses the boundary, and a documented model change-control process — because an upstream model version change is a *regulatory* event, not just a technical one.

### Case 5 · The "why is it worse today?" case

**Scenario:** the system was fine for three months; quality complaints spike. **Approach:** this tests whether you understand that GenAI systems rot. Check, in order: (1) model version/endpoint change or provider-side update; (2) prompt/config drift — is everything versioned and diffable?; (3) retrieval corpus change — new documents, stale index, embedding model change without re-index; (4) traffic mix shift — new intents outside the eval set; (5) tool/downstream degradation raising failure-retry loops; (6) guardrail threshold change causing over-refusal. "The architectural point is that I can only answer this quickly if I built the telemetry and the continuous eval to answer it — a nightly eval run against a fixed suite, alerting on delta, plus model-version pinning. If those aren't in place, my first fix is to build them."

---

## Round 6 · LLM evaluation & model selection

**What they're testing:** Can you make a defensible, evidence-based model choice across business, technical, performance and cost dimensions — the JD says this explicitly.

### Q: How do you select an LLM for an enterprise use case?

**Answer:** "I run a structured selection, and the output is a matrix plus an ADR, because this decision will be re-litigated every quarter as the market moves.

**Step 1 — Constraints first (these eliminate, they don't score).** Data residency and sovereignty; contractual guarantees on training-on-your-data; deployment mode (SaaS API / private endpoint / self-hosted / on-prem); certifications the vendor must hold; regional availability; procurement and exit terms. Half the candidate list usually dies here, which is why it goes first.

**Step 2 — Capability fit against *my* eval set, not public leaderboards.** Public benchmarks are directionally useful and contaminated; I build a task-representative set of 100–300 cases from real traffic with expected outputs and grade with a mix of programmatic checks, human review on a sample, and LLM-as-judge calibrated against human labels. For agentic use, the decisive capabilities are: reliable tool/function calling and schema adherence, multi-step instruction following, long-context behaviour (including retrieval-in-the-middle), structured output validity rate, and refusal behaviour.

**Step 3 — Performance.** p50/p95 latency, time-to-first-token (dominant for perceived speed in streaming UX), throughput/concurrency limits, rate limits, provisioned-capacity options.

**Step 4 — Cost, modelled properly.** Not $/1M tokens — **cost per completed task**, which includes the loop: input tokens × steps (context grows!), output tokens, retries, reflection passes, guardrail model calls, embedding and re-index costs. A "cheaper" model that needs 3 extra steps and 2 retries is more expensive. Model peak and average, and include caching effects (prompt caching can move this by an order of magnitude on repeated system prompts).

**Step 5 — Operational and strategic.** Version deprecation policy and notice period, roadmap stability, portability (can I move providers behind my gateway?), fine-tuning/distillation options, support model, and lock-in.

**Step 6 — Decide and write it down.** ADR with the matrix, the eval numbers, the constraints applied and the review trigger ('re-evaluate when X ships or in 6 months').

**And the architecture-level answer:** I don't pick *a* model, I pick a **portfolio and a routing policy** — a small/cheap model for classification and routing, a mid-tier workhorse for most turns, a frontier model for hard reasoning or escalation, all behind a gateway with a model abstraction so swapping is a config change plus a re-run of the eval suite. Model choice must never be a code change in twelve services."

**Key points:** constraints-eliminate-first, own eval set, cost-per-task not per-token, TTFT, gateway abstraction, ADR with review trigger.
**Red flags:** picking by leaderboard; quoting per-token price as the cost answer; single-model architecture.

### Q: Build me the evaluation strategy for an agentic system.

**Answer:** Four layers, each with an owner and a gate.

1. **Component evals.** Retrieval (recall@k, MRR, context precision), extraction (field-level F1), classification/routing accuracy, tool-call correctness (right tool, valid arguments, schema-valid). These are cheap, fast and catch most regressions.
2. **End-to-end task evals.** Did the run achieve the goal? Trajectory quality (unnecessary steps, wrong tools), groundedness/faithfulness with citations, answer relevance, steps-per-task and cost-per-task, and **unsafe action rate** on an adversarial set.
3. **Safety and adversarial evals.** Prompt injection (direct and indirect via retrieved/tool content), jailbreaks, PII leakage, toxic/harmful content, data-exfiltration attempts, over-refusal (false positives are a real cost). Automated red-teaming on every release plus periodic human red-teaming.
4. **Online evaluation.** A/B or canary with business metrics (containment, handle time, conversion, escalation rate), user feedback signals, human review sampling of production traces, drift alerts against the offline baseline.

"Governance-wise: the eval suite is a **release gate** in CI/CD with numeric thresholds, versioned alongside prompts and configs; it runs nightly against pinned model versions; and any model/prompt/retrieval change re-runs it. LLM-as-judge is used, but I calibrate judges against human labels and report agreement — an uncalibrated judge is a random number generator with good manners."

### Q: Fine-tune, RAG, or prompt engineering?

**Answer:** "They solve different problems and the confusion is expensive. **RAG** for knowledge — facts that change, need attribution, or are access-controlled. **Prompting/structured output** for behaviour and format at low cost, first stop always. **Fine-tuning (incl. PEFT/LoRA)** for *form* — consistent style, domain vocabulary, tighter structured output, or distilling a big model into a small cheap one for a narrow task at volume. **Continued pre-training** only for genuinely new domains at large scale.

Fine-tuning does not make a model know your current data, and it creates a lifecycle burden: data curation, versioning, re-training on drift, eval per version, and a rollback path. My order of attack is prompt → retrieval quality → tooling/decomposition → fine-tune, and I insist the eval set exists before any of it, because otherwise none of these decisions are measurable."

---

## Round 7 · AI security, Responsible AI & risk management

**What they're testing:** Do you threat-model AI systems specifically, and do you know the frameworks well enough to run a governance conversation with a CISO and a legal counsel?

### Q: Threat-model an agentic AI system.

**Answer:** "I use the OWASP Top 10 for LLM Applications and MITRE ATLAS as checklists over a normal STRIDE-style decomposition, then add the agentic amplifiers.

**Model/prompt layer:** prompt injection — **direct** (user input) and, far more dangerous, **indirect** (malicious instructions embedded in a retrieved document, a web page, an email, a tool response, even an image). Jailbreaks. System-prompt extraction. Assume the system prompt is public.

**Data layer:** sensitive information disclosure through outputs, logs or traces; cross-tenant leakage through shared vector stores or memory; training/RAG data poisoning; embedding-inversion risk on stored vectors; over-broad retrieval that bypasses source-system ACLs (the classic "the copilot found the HR spreadsheet" incident).

**Tool/action layer — the agentic amplifier:** excessive agency (too many tools, too much scope, no approval on irreversible actions); confused-deputy attacks where injected content makes the agent use *its* privileges on the attacker's behalf; unsafe tool argument construction leading to SSRF/SQLi/command injection; unbounded consumption (cost as a denial-of-wallet attack vector).

**Supply chain:** model provenance, third-party tools/plugins, MCP servers you didn't write, prompt templates from the internet, vulnerable libraries, poisoned fine-tuning data.

**Output layer:** insecure output handling — treating model output as trusted input to a browser, shell, SQL engine or downstream API. This is where a chatbot bug becomes an RCE.

**Controls, mapped:**

- **Least privilege per tool, per agent, per user context**; delegated identity so the agent can never exceed the human's own entitlements; short-lived, scoped credentials; separate identities per agent so the audit trail is meaningful.
- **Untrusted-content boundary:** everything retrieved or returned by a tool is *data*, never instructions — structurally separated in the context, spotlighted/delimited, and injection-scanned. Design assuming injection *will* succeed sometimes, so the blast radius is bounded by permissions and approvals rather than by detection.
- **Approval gates on irreversible or high-value actions**, with the *human seeing the actual action and its parameters*, not a summary.
- **Input and output filtering** (content safety, PII detection/redaction, secret scanning), plus schema validation and allow-listing before any output is executed or rendered.
- **Egress control:** no arbitrary outbound calls; allow-listed domains; no rendering of attacker-controlled URLs/images (a classic exfiltration channel).
- **Budgets, rate limits and circuit breakers** as security controls, not just cost controls.
- **Full, immutable audit trail** and anomaly detection on agent behaviour (unusual tool sequences, sudden step-count spikes).
- **Red-teaming in CI** and periodic human adversarial testing; a documented AI incident response runbook including kill switch and rollback.

**Frameworks I run governance against:** NIST AI RMF (+ Generative AI Profile) for risk function structure, ISO/IEC 42001 for the AI management system, OWASP LLM Top 10 and MITRE ATLAS for threats, EU AI Act for risk tiering and obligations where in scope, plus the org's existing security standards — AI doesn't get its own parallel universe."

**Key points:** indirect injection prioritised; excessive agency; insecure output handling; permission-bounded blast radius; named frameworks.
**Red flags:** "we filter bad words"; believing a system prompt is a security control; no mention of indirect injection.

### Q: What does Responsible AI mean in your architecture, concretely?

**Answer:** "It means design commitments with owners and evidence, not a values slide.

- **Fairness:** define protected dimensions with legal, test outcomes across cohorts on the eval set, document known limitations. For generative systems this often means testing for differential quality (does it answer worse for some dialects/segments?) rather than only classic disparate impact.
- **Transparency:** users know they're talking to AI; citations for factual claims; confidence and refusal behaviour; documented capability *and limitation* statements (model/system cards).
- **Accountability:** a named human owner per AI system; an approval record for deployment; a change-control process; an incident process. Ownership is architectural — an unowned agent is an unmanaged risk.
- **Contestability and human oversight:** a person affected by a decision can get an explanation and a human review; the human reviewer has enough context to actually disagree (avoid rubber-stamp oversight — that's a real failure mode).
- **Privacy:** data minimisation into the prompt, purpose limitation, retention limits on traces and memory, subject-access and deletion paths that include vector stores and caches, no training on customer data unless contractually explicit.
- **Reliability and safety:** thresholds, degradation behaviour, out-of-scope refusal, and no silent failure.

Each of these maps to a control I can point at in the architecture, and to evidence I can hand an auditor. That's the difference between Responsible AI as governance and as marketing."

### Q: How do you manage AI risk across a portfolio?

**Answer:** A tiered model. Every AI system is registered in an **inventory** (what it does, data classes, autonomy level, model versions, owner, last eval date, risk tier). Tier by impact × autonomy × reversibility × regulatory exposure. Tier 1 (high) gets a full risk assessment, threat model, human oversight design, pre-deployment review board sign-off, and quarterly re-assessment; Tier 3 (internal, read-only, low impact) gets a lightweight self-attestation on the paved road. Risks live in the enterprise risk register with owners and mitigations, not a separate "AI risk" silo. "The inventory is the foundation — you cannot govern what you cannot enumerate, and shadow AI is the number-one governance gap I've seen."

---

## Round 8 · Guardrails — design & implementation

**What they're testing:** The JD calls this out separately, so expect depth. Show layers, placement, failure behaviour and measurement.

### Q: Design a guardrail architecture for an enterprise agent.

**Answer:** "Guardrails are **layered, defence-in-depth, and enforced outside the model** wherever correctness matters. I place them at six points:

**1. Input guardrails (pre-model).**
Authentication and entitlement resolution; PII/secret detection and redaction; content safety classification; prompt-injection and jailbreak detection; topic/scope classification (is this even in scope?); language and length checks; per-user and per-tenant rate/budget checks.

**2. Grounding guardrails (retrieval).**
Identity-scoped retrieval (ACL-trimmed at query time, not filtered after); source allow-listing; freshness checks; retrieved content marked and treated as untrusted data; "insufficient evidence" detection that triggers refusal or escalation instead of speculation.

**3. Reasoning-loop guardrails (runtime).**
Step, time and cost budgets; repetition/no-progress detection; tool allow-list per agent per context; argument validation against JSON Schema *plus* semantic checks (is this account id owned by this user?); policy engine evaluation before any side effect; approval gate on irreversible/high-value actions.

**4. Output guardrails (post-model).**
Schema validation; groundedness/citation verification against retrieved spans; content-safety and PII scanning on output; policy compliance checks (no promises about pricing/legal/medical); secret and internal-URL scanning; format/rendering safety (no executable output paths, sanitise HTML/markdown, block auto-loading external images).

**5. Action guardrails (execution).**
Idempotency keys; authority limits from the policy engine; dry-run/simulation for destructive actions; blast-radius caps (max N records per run); reversible-by-default design with compensating actions; irreversible actions behind human approval.

**6. Observability guardrails (post-hoc).**
Full trace, guardrail verdicts recorded (including *why*), anomaly detection on behaviour patterns, sampled human review, feedback loop into eval sets.

**Design principles I insist on:**

- **The model is not the enforcement point.** Prompts are hints; the runtime, policy engine and permission model are controls. Anything a prompt can be talked out of isn't a guardrail.
- **Fail closed on safety, fail open on availability** — decide per guardrail, explicitly, and document it. A content-safety service outage should not become a data breach; it also shouldn't take down a read-only helpdesk.
- **Measure the guardrails themselves:** false-positive rate (over-refusal is a real business cost users will route around) and false-negative rate on the red-team set. Untuned guardrails get disabled by frustrated teams, which is worse than not having them.
- **Every guardrail decision is logged with a reason** so you can explain a refusal to a user and to an auditor.
- **Central, reusable, versioned** — a guardrail library/service on the paved path, so 12 teams don't write 12 regex filters of varying quality."

**Key points:** six placement points, enforcement outside the model, fail-open/closed decision, measuring FP/FN, centralised reuse.
**Red flags:** guardrails = system prompt; no false-positive consideration; no logging.

### Q: A guardrail is blocking 8% of legitimate traffic. What do you do?

**Answer:** "Treat it as a tuning problem with data, not a debate. Sample and label the blocked traffic to split true from false positives. If FPs dominate: identify the classifier/rule at fault, adjust the threshold against a labelled set (showing the FN cost at the new threshold), and where possible replace a blunt block with a **softer control** — warn, redact, require citation, downgrade to read-only, or route to human review instead of hard-refusing. Ship the change through the eval gate like any other change, and add the labelled cases to the permanent suite so it can't regress. Then close the loop with whoever raised it, with the numbers. The meta-point is that guardrails need a product owner and a tuning cadence; unowned guardrails always end up either bypassed or blocking the business."

---

## Round 9 · Integration architecture

**What they're testing:** The JD lists APIs, enterprise applications, data platforms and external services. This is where 12-year architects separate from 6-year ones.

### Q: How do you expose enterprise capabilities to an agent?

**Answer:** "Through a **governed tool layer**, never direct model-to-system coupling.

- **Tool registry** — every capability is registered with: name, natural-language description (this is a *prompt asset*; it materially drives selection accuracy and gets versioned and A/B tested), JSON Schema for input and output, side-effect class, required scopes, data classification, rate limit, timeout, owner and version.
- **Anti-corruption layer** — tools wrap existing APIs; they don't expose vendor payloads. This protects the agent from schema churn and protects the enterprise from the agent doing something creative with an undocumented field.
- **Contract stability and versioning** — tools are versioned like APIs; breaking changes get a new version, and agents pin. Deprecation runs on a published schedule with usage telemetry.
- **Coarse over chatty** — design tools around business intent (`reschedule_appointment`) not CRUD primitives, so a task takes 2 tool calls rather than 9. This directly reduces latency, cost and error compounding.
- **Ergonomics for a model:** small tool sets (accuracy degrades as the tool list grows — use routing/namespacing/hierarchical tool selection or per-agent tool subsets when you have hundreds), unambiguous names, examples in the description, informative structured errors ("account not found; try search_account with a partial name") because the error message is the recovery instruction.
- **Standardised transport where it helps:** MCP for exposing tools/resources to any compliant client, A2A for agent-to-agent interop across boundaries. Both are architecture decisions with security implications — an MCP server is a new trust boundary and a supply-chain surface; treat third-party servers as untrusted code.
- **Identity and authorisation** — OAuth 2.0 with on-behalf-of/delegated flows for user-context actions, workload identity for autonomous ones, scopes per tool, short-lived tokens, no shared secrets, full attribution in logs.
- **Reliability** — idempotency keys, timeouts, retries with exponential backoff and jitter, circuit breakers, bulkheads per downstream, graceful degradation with a documented behaviour when a tool is down."

### Q: How does the agent integrate with the enterprise data platform?

**Answer:** "Two distinct paths, and conflating them is a common mistake.

**Unstructured/knowledge path:** source systems → ingestion (with CDC or scheduled sync, not one-off loads) → parsing/chunking (per document type; layout-aware for tables and forms) → enrichment (metadata, ACLs, classification, freshness) → embedding → index. Hybrid retrieval with reranking. Critically, **ACLs travel with the chunk** and are enforced at query time using the caller's identity; re-index or re-permission on source ACL change. Own the re-embedding runbook — changing embedding models is a full re-index and a versioned index swap, and people forget until it's an outage.

**Structured/analytical path:** don't let the model write free-form SQL against production. Prefer a **semantic layer or curated, parameterised query tools** with allow-listed metrics and dimensions, row-level security applied by the platform, query cost limits and read replicas. If NL2SQL is genuinely required, constrain it to a governed schema view, validate the generated SQL (parse, allow-list tables/columns, forbid DDL/DML), run it read-only with a cost ceiling, and show the query to the user.

**Governance across both:** lineage and cataloguing so you can answer 'where did this answer come from', classification-driven policy, retention on traces and derived stores, and deletion propagation into vector stores and caches."

### Q: How do you integrate external/third-party AI services safely?

**Answer:** Vendor assessment (data handling, training-on-your-data terms, certifications, residency, sub-processors, exit), a gateway in front so provider swap is config not code, network egress controls and private connectivity where available, secrets in a managed vault with rotation, per-vendor quotas and circuit breakers, contractual SLAs matched to your own degradation plan, and a documented fallback provider with the eval suite already run against it. "And an explicit decision about what data may cross that boundary at all — classification-driven, enforced by the gateway's redaction and routing policy, not by developer discipline."

---

## Round 10 · Technical governance, standards & architecture practice

**What they're testing:** The JD says "defining and implementing technical governance frameworks, architecture standards and best practices." Show mechanisms.

### Q: Stand up an AI governance framework for an enterprise. What does it consist of?

**Answer:** "Six components, and I'd sequence them in this order because each makes the next cheaper.

1. **Inventory and intake.** A register of every AI system and a lightweight intake form that captures purpose, data classes, autonomy, users affected, and business owner. Intake produces a **risk tier**, which determines everything downstream. Without this you're governing rumours.
2. **Tiered review, proportionate to risk.** Tier 1: architecture review board + security + legal/privacy + Responsible AI sign-off, with a threat model and human-oversight design. Tier 3: automated checks on the paved road and a self-attestation. The failure mode of governance is uniform heavyweight process, which teams then evade.
3. **Standards as artefacts.** Reference architectures, ADR templates and an ADR log, an approved-model/pattern catalogue, prompt and eval conventions, naming/tagging for cost attribution, data-classification-to-control mappings. Short, versioned, and owned.
4. **Paved road.** Golden-path templates, a shared AI gateway, guardrail library, eval harness, tracing conventions, tool registry, a sandbox with synthetic data. Adoption is voluntary but overwhelmingly attractive — that's the design goal.
5. **Automated conformance.** CI policy checks, gateway-enforced routing (no direct provider keys in app code), tagging enforcement, dependency and model-version scanning, drift detection. Anything checkable by a machine should never be a review meeting.
6. **Operating cadence.** An architecture forum with published decisions; a monthly risk/exception review with expiry dates; quarterly re-assessment of Tier 1 systems and re-run of eval baselines; a communication path so decisions are discoverable (searchable ADRs beat a wiki graveyard).

**Metrics for the governance function itself:** % of AI systems in the inventory, % on the paved road, median time from intake to approval (if this rises, teams route around me), exception count and age, eval-gate pass rate, incident count. Governance that isn't measured becomes bureaucracy."

### Q: How do you handle a team that shipped an agent outside the process?

**Answer:** "Assess before punishing: what data does it touch, what can it do, who's affected, is there an immediate risk? Contain if needed (revoke a scope, disable a tool, apply the gateway). Then bring it onto the paved road with a time-boxed remediation plan and a named owner. Then — the important part — ask why they bypassed the process. Nine times out of ten it's because the compliant path was slower or didn't exist. That's a defect in my product, and I fix it. Governance succeeds when compliance is the path of least resistance."

### Q: How do you keep standards current in a field that changes every quarter?

**Answer:** "Version the standards and give them explicit review triggers. I separate **durable principles** (least privilege, idempotency, eval-gated release, human oversight proportional to blast radius, no model as enforcement point) from **volatile choices** (which model, which framework, which vector store). Principles change rarely; choices are ADRs with a stated re-evaluation date or trigger event. I run a small evaluation cadence — a standing spike allocation to assess new capability against our eval suite — so that adoption decisions are evidence-based rather than driven by whoever read a launch blog. And I write ADRs with honest 'consequences' sections, so revisiting a decision isn't an admission of failure."

---

## Round 11 · Scale, performance, cost & AgentOps

### Q: How do you make an agentic system performant?

**Answer:** "Latency in agentic systems is mostly **step count and serialisation**, not model speed. Levers, in order of impact:

1. **Reduce steps** — coarser tools, better tool descriptions, routing to skip planning for simple intents, caching prior results.
2. **Parallelise** — independent tool calls concurrently; speculative retrieval while the model reasons.
3. **Right-size the model per step** — small model for classification/routing/extraction, big model only for hard reasoning.
4. **Stream** — time-to-first-token dominates perceived latency; stream tokens and stream *progress* ('checking your order…') for long tool calls.
5. **Cache aggressively** — prompt/prefix caching for long system prompts, semantic cache for repeated questions (with strict tenant/permission scoping — a shared cache is a cross-tenant leak waiting to happen), embedding cache, tool-result cache with TTL.
6. **Trim context** — retrieval precision over recall, rerank, summarise history, drop stale observations. Context growth is a silent cost and latency multiplier across a loop, and long contexts degrade accuracy too.
7. **Async where the UX allows** — not everything needs a synchronous answer; a task queue with notification is often the better product.

Then publish a **latency budget** per component and alert on breach."

### Q: How do you control cost?

**Answer:** "Measure **cost per completed task**, per tenant, per use case — instrumented in the gateway with tags, on a dashboard the business owner sees. Then: model routing (the biggest single lever, often 60–80%), prompt/context trimming, caching, batching for non-interactive workloads, step budgets, output length limits, distilling a fine-tuned small model for a high-volume narrow task, provisioned throughput for predictable base load with pay-as-you-go for spikes, and hard per-tenant budget circuit breakers. I also track cost *distribution*, not just the mean — the p99 task usually costs 10–50× the median and that tail is where budgets die."

### Q: What does production operations look like — "AgentOps"?

**Answer:** "Everything you'd expect from a distributed system, plus the AI-specific parts.

- **Tracing:** OpenTelemetry GenAI semantic conventions — spans for each model call, tool call, retrieval, guardrail check, with token counts, model+version, latency and verdicts. A run-replay UI is the single most valuable debugging investment.
- **Metrics/SLOs:** task success rate, containment/escalation, groundedness, safety-violation rate, p95 latency, steps and cost per task, tool error rates, guardrail FP/FN.
- **Continuous evaluation:** nightly eval suite against pinned versions; alert on delta; sampled human review of production traces feeding new eval cases.
- **Release process:** everything versioned (prompts, tools, configs, model versions, index versions) and deployed with shadow → canary → progressive rollout, with automatic rollback on metric regression. Never auto-upgrade a model version in production; pin, test, promote.
- **Incident response:** AI-specific runbooks — kill switch per tool/agent, rollback to a previous prompt/model version, containment for a leak, communication and, for regulated contexts, a defined reporting path. Rehearse it.
- **Feedback loop:** user feedback and human-review labels flow back into eval sets and retrieval improvements. A system that doesn't learn from production traces stagnates.

The mindset shift I emphasise: an agentic system is never 'done'. It's a **continuously evaluated product**, and staffing/funding must reflect that — a build-and-hand-over model fails here."

---

## Round 12 · Stakeholder management & behavioral (STAR)

**What they're testing:** The JD emphasises cross-functional collaboration with business, engineering, security and others. Answer in STAR, quantify, and always name the artefact that resolved it.

### Q: Tell me about a time you had to say no to an executive's AI idea.

**Structure:** Situation (executive wanted an autonomous agent doing X) → Task (assess feasibility and risk) → Action: reframed from "no" to "here's what we can do now and what would have to be true for the rest" — ran a two-week discovery producing a value model, a data-readiness assessment, and a risk tier; showed a lower-autonomy version delivering ~70% of the value at ~20% of the risk; wrote the ADR with the trigger conditions for revisiting → Result: shipped the reduced-scope version, measured outcome, and the full version was revisited when the data gap closed. **Signal:** you convert opinion conflicts into evidence and options, and you leave a documented decision behind.

### Q: Describe a disagreement with security that you resolved.

**Answer shape:** Security wanted to block a class of capability outright; you agreed on the risk but not the control. You produced a threat model, proposed compensating controls (delegated identity, approval gates on writes, egress allow-list, full audit), ran a joint red-team, and agreed a phased autonomy increase tied to measured safety metrics. Result: shipped with security as a co-owner of the metrics. **Signal:** you treat security as a design partner and you make risk quantitative.

### Q: Tell me about an AI project that failed.

**Answer honestly, with a real failure mode:** e.g. quality was fine in eval but production traffic distribution differed; or the humans it was meant to help never adopted it because the workflow integration was an afterthought; or unit economics didn't work at scale. State the root cause, what you changed structurally (eval sets built from real traffic distribution; change management and workflow integration as first-class workstreams; cost-per-task modelled at discovery), and what you now do differently on every engagement. **Signal:** post-mortem thinking and generalised lessons, not a disguised humblebrag.

### Q: How do you explain agentic architecture to non-technical stakeholders?

**Answer:** "I use the new-employee analogy, because it makes the controls intuitive: the model is judgement, the tools are systems access, the guardrails are policy and approval limits, evaluation is performance review, and observability is the audit trail. You wouldn't give a capable new hire unsupervised authority over refunds on day one — you'd scope their access, review their work, and expand authority as they demonstrate reliability. That's exactly our rollout plan. Then I translate everything into their metrics — containment rate, handle time, cost per contact, risk exposure — never token counts. And I'm explicit about uncertainty: I give ranges and the assumptions behind them, because over-promising on GenAI is how architects lose credibility with a business."

### Q: How do you work with engineering teams who think governance slows them down?

**Answer:** "Make the compliant path the fast path, then prove it with data — time-to-first-production-agent before and after the paved road. Co-design the standards with the teams that have to live with them; a standard written *at* engineers gets ignored. Automate everything checkable. And publish the exception route so there's a legitimate escape hatch with an expiry, rather than a shadow one."

---

## Round 13 · Executive / bar-raiser

### Q: What's your 90-day plan?

**Answer:** "**Days 1–30 — inventory and truth.** Meet business owners, engineering leads, security, legal, data. Enumerate every AI initiative (including shadow ones), their risk tiers, their state and their spend. Assess what exists: gateway? eval practice? guardrails? tool registry? Produce a current-state map and a candid gap assessment.

**Days 31–60 — decide and demonstrate.** Publish a target-state reference architecture and 4–6 foundational ADRs (gateway, model portfolio and routing, tool/permission model, retrieval and identity-scoped access, eval gate, guardrail baseline). Stand up the intake and risk-tiering process. Pick one high-value use case and deliver a thin production slice on the paved road — credibility comes from something shipping, not from the diagram.

**Days 61–90 — scale the pattern.** Onboard 2–3 teams to the paved road, publish the governance cadence and metrics, run the first architecture forum with real decisions, and put a 12-month roadmap in front of the exec sponsor with cost, risk and value framing. Success measures: N systems inventoried, N on the paved road, one production use case with measured business outcome, and a published decision log."

### Q: Build vs buy for agentic capability?

**Answer:** "Buy the commodity, build the differentiator, and be honest about which is which. Model providers, vector/search infrastructure, gateways, observability and content-safety services are commodity — buying is almost always right. Your **domain tools, data/retrieval quality, evaluation suite, guardrail policy and the orchestration of your specific business processes** are the differentiators; those encode your business and shouldn't be outsourced. Vendor agent platforms are attractive for speed, but I evaluate them on exit cost: can I take my prompts, evals, tool contracts and traces with me? I keep the abstraction at the gateway and tool-registry boundary so the expensive assets remain portable, and I write the lock-in trade-off into the ADR explicitly rather than discovering it at renewal."

### Q: Where does agentic AI genuinely change this business, and where is it hype?

**Answer:** "Genuine: high-volume, well-instrumented processes with messy unstructured inputs, clear ground truth, and a human fallback — support deflection, document/claims processing, internal knowledge access, developer productivity, sales and service augmentation. Those have measurable unit economics.

Hype: fully autonomous end-to-end business processes in regulated, irreversible domains; 'replace the team' claims; and anything where nobody can define what success means numerically. My test is simple — if we can't build a 200-case eval set with expected outcomes, the use case isn't ready, regardless of how exciting the demo was. I'd rather ship three boring things with measured ROI than one impressive thing nobody trusts enough to leave on."

### Q: How do you justify the platform investment to a CFO?

**Answer:** "Marginal cost per use case. The first use case carries the platform: gateway, retrieval, evals, guardrails, governance. The second and third should cost a fraction of it, and I commit to that ratio as a measurable target. I present three numbers: total cost of ownership including run and continuous evaluation (people forget the run cost of a system that must be re-evaluated forever), value per use case with confidence ranges, and the risk-avoidance value — one prevented data-leak or wrong-advice incident often exceeds the annual platform cost. And I'd bring the cost-per-task dashboard, because CFOs trust architects who volunteer unit economics before being asked."

---

## Technology & skills map — JD requirement ↔ stack ↔ your evidence

| JD requirement | What you must be able to design | Concrete stack you should be able to name | Evidence to prepare (fill with your own) |
| --- | --- | --- | --- |
| Agentic AI architecture | Agent runtime, control loop, state, termination, HITL | Microsoft Agent Framework / Semantic Kernel / AutoGen, LangGraph, CrewAI, OpenAI Agents SDK, Google ADK, durable workflow engines (Durable Functions, Temporal) | A production agent: steps/task, success rate, cost/task |
| Enterprise AI solution design | Reference architecture, NFRs, multi-tenancy, residency | Azure AI Foundry / Bedrock / Vertex AI, AKS/Container Apps, API Management, event bus | A reference architecture you authored and teams adopted |
| Use-case discovery | Intake, value model, feasibility gate | Discovery canvas, eval-set-first method, risk tiering | A use case you killed and why |
| Agent design patterns | ReAct, plan-execute, reflection, supervisor, hand-off, HITL | Framework-level primitives; MCP for tools; A2A for interop | A design where you chose single-agent over multi-agent |
| LLM evaluation & selection | Selection matrix, own eval set, cost per task | Azure AI Foundry evaluations, RAGAS, DeepEval, promptfoo, LangSmith, Braintrust, MLflow LLM eval | A model-selection ADR with numbers |
| AI security | AI threat model, injection defence, least-privilege tools | OWASP LLM Top 10, MITRE ATLAS, PyRIT/Garak red-teaming, Entra ID / OAuth OBO, Key Vault, private endpoints | A threat model you wrote; a red-team finding you fixed |
| Responsible AI & risk | Fairness, transparency, oversight, accountability, privacy | NIST AI RMF + GenAI Profile, ISO/IEC 42001, EU AI Act, Microsoft RAI Standard, model/system cards | A Tier-1 system you took through review |
| Guardrails | Six-layer control placement, fail-open/closed, FP/FN tuning | Azure AI Content Safety (incl. prompt-shield style detection & groundedness checks), Bedrock Guardrails, NeMo Guardrails, Guardrails AI, Llama Guard | A guardrail you tuned with before/after FP rates |
| Integration architecture | Tool registry, ACL, identity propagation, saga/compensation | REST/OpenAPI, gRPC, GraphQL, Kafka/Service Bus/EventBridge, MCP servers, iPaaS, CDC | A cross-system agent flow with compensations |
| Technical governance | Inventory, tiered review, paved road, automated conformance | ADR log, template repos, policy-as-code (OPA/Azure Policy), CI gates, cost tagging | A governance framework you stood up + its metrics |
| Scale/performance/cost | Latency budget, routing, caching, budgets, capacity | Provisioned throughput, prompt caching, semantic cache, batch APIs, autoscaling | Cost-per-task before/after optimisation |
| Stakeholder management | Translating to business metrics, influence without authority | Architecture forum, ADRs, exec briefings | A time you changed an executive decision with evidence |

**Gap-closing advice:** pick the two rows where your evidence is weakest and build a small but real artefact this week — e.g. a model-selection matrix for a use case you know, and a one-page AI threat model. Interviewers at this level respond far better to "here's the artefact I use" than to a fluent description of one.

---

## Technical question bank (rapid-fire, by topic)

### Agentic fundamentals

- **What's the difference between a workflow and an agent?** A workflow has predetermined control flow (you decide the steps); an agent decides its own steps at runtime. Prefer workflows whenever the steps are knowable — they're cheaper, faster, testable and auditable. Most successful production systems are workflows with agentic steps inside them.
- **What is ReAct?** Interleaved reasoning and acting: the model emits a thought, an action (tool call), observes the result, repeats until it answers. Needs step budgets and repetition detection.
- **What's the termination problem?** An agent must decide when it's done; without explicit budgets, progress checks and a rewarded give-up path, it thrashes. Terminal states: success, escalate, give-up-with-reason.
- **What is excessive agency?** OWASP's term for granting an agent more functionality, permissions or autonomy than the task needs — the root cause of most agentic security incidents. Fix with least-privilege tools, scoped identity and approval gates on irreversible actions.
- **How do you make an agent's actions safe to retry?** Idempotency keys derived deterministically from run id + step, enforced by the tool/downstream, plus compensations for partially completed sagas.
- **Why is structured output important?** It turns model output into validated data, enabling schema validation, deterministic downstream code and safe execution. Use JSON Schema / constrained decoding, and always validate — never trust the shape.
- **What is MCP?** An open protocol for exposing tools, resources and prompts to LLM applications through a standard client-server interface, so a capability written once is usable by any compliant host. Architecturally: a new trust boundary and supply-chain surface.
- **What is A2A?** A protocol for agents to discover and delegate to other agents across boundaries (agent cards, task lifecycle). Treat a peer agent as an untrusted external system.

### RAG & retrieval

- **Why does RAG beat fine-tuning for knowledge?** Freshness, attribution, access control and cheap updates; fine-tuning changes form, not facts.
- **Chunking strategy?** Depends on document structure — semantic/heading-aware for prose, row/table-aware for structured docs, with overlap and parent-document or contextual retrieval so a retrieved chunk carries enough surrounding context to be interpretable.
- **Hybrid search?** Combine lexical (BM25) with vector similarity and fuse (e.g. RRF), then rerank with a cross-encoder. Lexical catches exact IDs, codes and rare terms that embeddings miss.
- **How do you enforce permissions in RAG?** ACLs stored on the chunk, applied as a filter at query time using the caller's identity; re-sync on source permission change. Post-filtering after generation is far too late.
- **What is agentic RAG?** The retrieval loop itself becomes agentic: query rewriting, decomposition into sub-questions, multi-hop retrieval, self-assessment of sufficiency, and re-retrieval on failure.
- **How do you measure RAG quality?** Retrieval: recall@k, MRR, context precision. Generation: groundedness/faithfulness, answer relevance, citation correctness. Plus refusal correctness on unanswerable questions.
- **Biggest RAG failure mode in enterprises?** Data quality and permissions, not the model — stale content, duplicated conflicting documents, and over-broad access.

### Models & evaluation

- **Context window vs effective context?** A large window doesn't guarantee uniform attention; accuracy commonly degrades for information in the middle of long contexts, so retrieval precision and reranking still matter.
- **Temperature in production agents?** Low (often 0) for tool selection, extraction and routing where determinism matters; higher only for creative surfaces. Note that even at 0 you're not fully deterministic across infrastructure.
- **LLM-as-judge — risks?** Position and verbosity bias, self-preference, and drift when the judge model changes. Calibrate against human labels, pin the judge version, and report agreement.
- **What is distillation and when do you use it?** Train a small model on a large model's outputs for a narrow task — the standard answer to "this works but costs too much at volume."
- **Benchmarks vs your eval set?** Benchmarks are contaminated and rarely task-representative; use them to shortlist, use your own set to decide.
- **How often do you re-evaluate?** Nightly against pinned versions, on every prompt/model/retrieval change, and on a scheduled cadence for Tier-1 systems.

### Security

- **Direct vs indirect prompt injection?** Direct comes from the user; indirect arrives via content the model reads (documents, web pages, emails, tool responses) — indirect is more dangerous because the attacker isn't the user and the payload may be invisible.
- **Can you fully prevent prompt injection?** No. Detection reduces frequency; **architecture bounds the damage** — least privilege, untrusted-content boundaries, approval gates, egress controls, and never treating model output as trusted input.
- **What's insecure output handling?** Passing model output unsanitised into a browser, shell, SQL engine or API — turning a text bug into XSS/RCE/SQLi. Validate and escape at every sink.
- **Confused deputy in agent systems?** Injected content causes the agent to use *its* legitimate privileges for the attacker. Mitigation: delegated (on-behalf-of) identity so the agent never exceeds the requesting user's rights, plus per-action authorisation.
- **How do you secure an MCP server / third-party tool?** Treat as untrusted supply chain: review the code, pin versions, run with least privilege in an isolated sandbox, allow-list which tools it may expose, monitor calls, and never give it ambient credentials.
- **Denial of wallet?** Attacker-driven token consumption. Controls: authentication, per-user/tenant budgets, step caps, rate limits, anomaly alerts, hard circuit breakers.

### Governance & Responsible AI

- **NIST AI RMF core functions?** Govern, Map, Measure, Manage — with a Generative AI Profile enumerating GenAI-specific risks and suggested actions.
- **ISO/IEC 42001?** A certifiable management-system standard for AI (an ISMS-equivalent for AI) — policy, roles, risk treatment, lifecycle controls, continual improvement. Useful when you need auditable governance, not just guidance.
- **EU AI Act in one line?** Risk-tiered obligations (unacceptable / high-risk / limited / minimal) with transparency duties, plus obligations for general-purpose AI models; where in scope it drives documentation, human oversight, logging and conformity work — architecture must produce that evidence by design.
- **What goes in a model/system card?** Purpose, in/out-of-scope uses, data, evaluation results and limitations, safety measures, known failure modes, owner and version.
- **Who owns an AI system?** A named accountable human on the business side, with a technical owner. Unowned = unmanaged risk.

### Platform & operations

- **Why an AI gateway?** One control point for authn/z, quotas, budgets, routing/fallback, caching, redaction, safety and logging — and the abstraction that makes model swaps a config change.
- **Provisioned vs pay-as-you-go capacity?** Provisioned for predictable base load and latency guarantees; on-demand for spikes; route between them with a fallback policy.
- **How do you version a prompt?** As code — in the repo, reviewed, tagged, deployed with the app or via a config service with rollback, and always paired with the eval run that approved it.
- **What do you trace in a GenAI system?** OpenTelemetry GenAI spans: model calls (model, version, tokens, latency), tool calls (args hash, result status), retrieval (query, doc ids, scores), guardrail verdicts, and the full run tree.
- **Blue/green for agents?** Shadow first (run in parallel, don't act), then canary with 100% human review of write actions, then progressive rollout with automatic rollback on metric regression.

---

## Deeper / staff-level questions

1. **Design an agent runtime that supports resumability across days-long human approvals.** Durable orchestration (event-sourced), externalised run state with versioned schema, deterministic replay of the loop given the same observations, approval as a first-class awaited event with timeout and escalation, and idempotent side effects so replay can't duplicate actions. Discuss what happens when the model version changes mid-run (pin per run) and when a tool schema changes mid-run (version pinning per run).
2. **How do you do cross-tenant isolation in a multi-tenant agent platform?** Identity propagation end-to-end; per-tenant index partitions or filters enforced server-side; per-tenant encryption keys where required; tenant-scoped caches and memory (never a global semantic cache); per-tenant budgets and rate limits; trace access controls; and a test suite that actively attempts cross-tenant retrieval on every release.
3. **A single model provider outage takes your fleet down. Design for it.** Gateway-level abstraction, at least two providers with the eval suite already run against both, capability-tiered fallback (accepting graceful quality degradation, communicated to users), circuit breakers, cached/degraded read-only mode, and a documented decision on which use cases may fail closed vs degrade. Discuss the honesty problem: fallback models behave differently, so guardrail thresholds and prompts must be validated per provider.
4. **How would you migrate a 200-service enterprise to a governed AI platform without stopping delivery?** Strangler pattern: gateway first (it can be adopted with a base-URL change and immediately gives inventory and telemetry), then retrieval and eval as shared services, then tool registry; publish a deprecation timeline for direct provider keys enforced by network policy and secret scanning; fund a migration squad; measure adoption weekly.
5. **Your eval suite says quality is fine; users say it's bad. Reconcile.** The suite doesn't represent production distribution. Mine production traces (with consent/PII controls) to rebuild the eval set from real traffic; add the failure clusters users report; check for evaluation overfitting (the suite became the target); and add online metrics and human review sampling so offline and online can be compared continuously.
6. **How do you handle a model deprecation with 60 days' notice across 12 applications?** Inventory from gateway telemetry (who uses what), pin and freeze, run the eval suite for each app against the successor, prioritise by risk tier, canary the highest-volume first, budget for prompt re-tuning (behaviour shifts are normal), and negotiate an extension for anything regulated needing re-certification. This question is really testing whether your platform gives you the inventory at all.
7. **Design cost attribution for shared AI infrastructure across business units.** Tags at the gateway (tenant, use case, environment, cost centre), per-request token accounting, allocation of shared platform cost by usage or by seat, a showback period before chargeback, and per-BU budget alerts. The political part matters: agree the allocation model with finance *before* the bills land.
8. **When would you build your own agent framework?** Rarely — and only for the runtime concerns frameworks handle badly for you: durable state, your permission model, your observability standard. Even then I'd build a thin orchestration layer over provider SDKs rather than a full framework, because framework churn in this space is a liability and the durable value is in the tool contracts, evals and guardrails, not the loop code.
9. **How do you evaluate an agent's *trajectory*, not just its final answer?** Compare against reference trajectories on the eval set: tool-selection precision/recall, unnecessary step rate, invalid-argument rate, recovery rate after tool errors, and cost/step distributions. A right answer reached through a dangerous or expensive path is a latent incident.
10. **How do you decide the autonomy level for a new action?** A matrix of impact × reversibility × confidence × volume. Irreversible + high impact = human approval regardless of confidence. Reversible + high volume + measured high confidence = autonomous with post-hoc sampling. And autonomy is **earned progressively** with measured data, with a written promotion criterion — that framing is what senior interviewers are listening for.

---

## Scenario-based questions (situational & troubleshooting)

- **"The agent refunded 400 customers twice overnight."** Immediate: kill switch on the refund tool, quantify blast radius from traces, reconcile with finance, communicate. Root cause is almost always missing idempotency plus retries on a timeout that actually succeeded. Structural fixes: deterministic idempotency keys enforced downstream, exactly-once side-effect semantics via durable orchestration, blast-radius cap per run, anomaly alert on action-rate spikes, and a rule that irreversible bulk actions require approval. The post-mortem output is a standard added to the paved road, not a patch in one service.
- **"A user got another customer's data in an answer."** Contain (disable the surface), determine the path — over-broad retrieval, shared cache, memory bleed, or logs — then fix at the architectural layer (identity-scoped retrieval, tenant-scoped cache keys, PII redaction), notify per your breach process, and add an automated cross-tenant leakage test to CI. Be explicit that this is a privacy incident with regulatory timelines, not just a bug.
- **"Legal asks: can you prove what the agent told a customer six months ago and why?"** Immutable trace store with the prompt, model+version, retrieved documents and versions, tool calls, guardrail verdicts and the final output, retained per policy and access-controlled. If you can't answer yes, that's the top item on your remediation plan — auditability must be designed in, never reconstructed later.
- **"Cost tripled this month with flat traffic."** Check: model version/routing change, context growth (history not trimmed, retrieval k increased), retry storms from a degraded tool, reflection loops, cache hit-rate collapse, a new expensive use case sharing the tenant, or abuse. The dashboard should show cost per task by use case — if it doesn't, that's the finding.
- **"The business wants to remove the human approval step to hit their automation target."** Convert to a measurable question: what is the current false-action rate on approved items, on what sample size, and what's the cost of an error? Propose a staged removal — auto-approve only the segment where measured precision exceeds the threshold, keep sampling and post-hoc review, define the rollback trigger, and get the business owner to sign the residual risk. Never a blanket removal; always a segment with data.
- **"A pen-test embedded instructions in a PDF and the agent emailed data out."** Classic indirect injection plus missing egress control. Fixes: retrieved content structurally marked as untrusted data, injection scanning, no free-form recipient selection (allow-list or approval on external send), egress domain allow-listing, and reduced tool scope. Add the attack to the permanent red-team suite. Emphasise: detection is secondary; the real fix is that the tool shouldn't have been able to do that unattended.
- **"Two teams built two different agents for the same process."** Governance gap, not an engineering one. Inventory reveals it; convene both owners, pick the stronger implementation on evidence (evals, cost, adoption), merge the tool contracts, deprecate one with a migration plan, and fix the intake process so duplicates surface at registration.
- **"Users have stopped using it after a strong launch."** Instrument abandonment: where in the flow, which intents, what latency, what refusal rate. Common causes: over-refusal, latency, generic answers due to poor retrieval, or workflow friction (it lives outside where people work). Fix the top cluster and re-measure; adoption is a product problem and needs a product owner.

---

## Real-world case studies to reference

Naming real, documented systems makes answers credible. Prepare two or three of these and be able to state the pattern and the trade-off.

- **Anthropic — "Building effective agents."** The most-cited practitioner guidance: prefer simple composable patterns (prompt chaining, routing, parallelisation, orchestrator-workers, evaluator-optimiser) over frameworks and complex autonomy; only use agents when the flexibility genuinely pays. Great source for the workflow-vs-agent distinction. ([read](https://www.anthropic.com/engineering/building-effective-agents))
- **OpenAI — "A practical guide to building agents."** Vendor-neutral-ish guidance on when to build agents, single vs multi-agent (manager and decentralised hand-off patterns), and layered guardrails with human intervention. ([read](https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf))
- **Google — Agents & agent design patterns (whitepapers + ADK).** Formalises the agent = model + tools + orchestration framing, plus A2A for interop. ([Agents whitepaper](https://www.kaggle.com/whitepaper-agents), [ADK](https://google.github.io/adk-docs/))
- **Microsoft — Azure AI Foundry & Agent Framework architecture guidance.** Enterprise-shaped material: agent identity, networking, content safety, evaluation, and the Well-Architected lens for AI workloads. ([AI workloads on Azure](https://learn.microsoft.com/azure/well-architected/ai/), [Agent Framework](https://learn.microsoft.com/agent-framework/))
- **Klarna's AI assistant.** Widely reported large-scale customer-service deployment (and the later, equally instructive rebalancing back toward human agents for quality) — a useful case for "autonomy is earned and revisited," and for talking honestly about limits.
- **GitHub Copilot / coding agents.** The most mature production agentic surface: bounded tools, sandboxed execution, human review as the guardrail, and evaluation via acceptance metrics.
- **Retrieval at scale in enterprise search products** (Microsoft 365 Copilot, Glean-style architectures): the decisive engineering is permission-trimmed retrieval and freshness, not the model — exactly the point you want to make about enterprise RAG.
- **Devin/SWE-bench-style autonomous coding results.** Useful for a grounded take on autonomy limits: strong on bounded, verifiable tasks; weak where verification is impossible. Verifiability is the real determinant of safe autonomy — a line worth saying out loud.

---

## Learn it properly — external reading & study path

Everything below is external, primary-source material. Work top-to-bottom if you're building depth; skim the "must-read" markers if you're prepping in a week.

### Foundational papers (agents & reasoning)

| Paper | Why it matters |
| --- | --- |
| [ReAct: Synergizing Reasoning and Acting (Yao et al., 2022)](https://arxiv.org/abs/2210.03629) | **Must-read.** The canonical agent loop. |
| [Chain-of-Thought Prompting (Wei et al., 2022)](https://arxiv.org/abs/2201.11903) | Where step-by-step reasoning came from. |
| [Toolformer (Schick et al., 2023)](https://arxiv.org/abs/2302.04761) | Models learning to call tools. |
| [Reflexion (Shinn et al., 2023)](https://arxiv.org/abs/2303.11366) | Self-critique / verbal reinforcement. |
| [Tree of Thoughts (Yao et al., 2023)](https://arxiv.org/abs/2305.10601) | Search over reasoning paths; cost/benefit of deliberation. |
| [MRKL Systems (Karpas et al., 2022)](https://arxiv.org/abs/2205.00445) | Early modular reasoning + tools architecture. |
| [Generative Agents (Park et al., 2023)](https://arxiv.org/abs/2304.03442) | Memory, reflection and planning in a simulated society. |
| [AutoGen (Wu et al., 2023)](https://arxiv.org/abs/2308.08155) | Multi-agent conversation framework and patterns. |
| [Voyager (Wang et al., 2023)](https://arxiv.org/abs/2305.16291) | Skill acquisition / procedural memory. |
| [Agent survey: The Rise and Potential of LLM Based Agents](https://arxiv.org/abs/2309.07864) | Broad taxonomy for vocabulary. |
| [A Survey on LLM-based Autonomous Agents](https://arxiv.org/abs/2308.11432) | Construction, evaluation and applications. |

### Foundational papers (RAG & grounding)

| Paper | Why it matters |
| --- | --- |
| [RAG (Lewis et al., 2020)](https://arxiv.org/abs/2005.11401) | **Must-read.** The original. |
| [Self-RAG (Asai et al., 2023)](https://arxiv.org/abs/2310.11511) | Self-reflective retrieval and critique tokens. |
| [Corrective RAG (Yan et al., 2024)](https://arxiv.org/abs/2401.15884) | Retrieval quality assessment and correction. |
| [Lost in the Middle (Liu et al., 2023)](https://arxiv.org/abs/2307.03172) | **Must-read.** Why long context ≠ solved retrieval. |
| [Dense Passage Retrieval (Karpukhin et al., 2020)](https://arxiv.org/abs/2004.04906) | Dense retrieval foundations. |
| [HyDE (Gao et al., 2022)](https://arxiv.org/abs/2212.10496) | Hypothetical document embeddings for query expansion. |
| [RAG survey (Gao et al., 2023)](https://arxiv.org/abs/2312.10997) | Naive → advanced → modular RAG taxonomy. |
| [Anthropic — Contextual Retrieval](https://www.anthropic.com/news/contextual-retrieval) | Practical chunk-context technique with measured gains. |

### Practitioner guidance (read these before any interview)

- [Anthropic — **Building effective agents**](https://www.anthropic.com/engineering/building-effective-agents) — **Must-read.** Workflow vs agent, five composable patterns.
- [Anthropic — Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [Anthropic — Writing tools for agents](https://www.anthropic.com/engineering/writing-tools-for-agents) — tool-description design as an engineering discipline.
- [OpenAI — A practical guide to building agents (PDF)](https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf) — **Must-read.**
- [OpenAI — Agents SDK docs](https://openai.github.io/openai-agents-python/) and [Prompt engineering guide](https://platform.openai.com/docs/guides/prompt-engineering)
- [Google — Agents whitepaper](https://www.kaggle.com/whitepaper-agents) and [Agent Development Kit docs](https://google.github.io/adk-docs/)
- [Microsoft — AI workloads on the Well-Architected Framework](https://learn.microsoft.com/azure/well-architected/ai/) — **Must-read** for enterprise framing.
- [Microsoft — Azure architecture centre: AI/ML idea guidance](https://learn.microsoft.com/azure/architecture/ai-ml/) and the [baseline agentic AI / Azure AI Foundry chat architectures](https://learn.microsoft.com/azure/architecture/ai-ml/architecture/baseline-openai-e2e-chat)
- [Microsoft — Agent Framework docs](https://learn.microsoft.com/agent-framework/) · [Semantic Kernel](https://learn.microsoft.com/semantic-kernel/) · [AutoGen](https://microsoft.github.io/autogen/)
- [AWS — Well-Architected Generative AI Lens](https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/generative-ai-lens.html) · [Bedrock Agents](https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html)
- [Google Cloud — Generative AI design patterns / architecture centre](https://cloud.google.com/architecture/ai-ml)
- [LangGraph docs](https://langchain-ai.github.io/langgraph/) and [LangChain agent concepts](https://python.langchain.com/docs/concepts/agents/) — the most common orchestration vocabulary in interviews.
- [CrewAI docs](https://docs.crewai.com/) · [LlamaIndex agent docs](https://docs.llamaindex.ai/en/stable/use_cases/agents/)
- [Chip Huyen — AI Engineering (book)](https://www.oreilly.com/library/view/ai-engineering/9781098166298/) and her [blog](https://huyenchip.com/blog/) — especially the agents and evaluation posts. Best single source on evaluation thinking.
- [Eugene Yan — Patterns for building LLM systems](https://eugeneyan.com/writing/llm-patterns/) — **Must-read** engineering patterns with evidence.
- [Hamel Husain — Your AI product needs evals](https://hamel.dev/blog/posts/evals/) — **Must-read** on evaluation discipline and error analysis.
- [Lilian Weng — LLM Powered Autonomous Agents](https://lilianweng.github.io/posts/2023-06-23-agent/) — **Must-read.** The best conceptual overview of planning/memory/tools.

### Protocols & interoperability

- [Model Context Protocol — docs](https://modelcontextprotocol.io/) and [specification](https://modelcontextprotocol.io/specification) — **Must-read** for tool exposure and its trust boundaries.
- [MCP GitHub org](https://github.com/modelcontextprotocol) — reference servers, SDKs, and the security discussions.
- [Agent2Agent (A2A) protocol](https://a2a-protocol.org/) · [A2A GitHub](https://github.com/a2aproject/A2A) — cross-boundary agent interop.
- [OpenAPI Specification](https://spec.openapis.org/oas/latest.html) — still the substrate most tools are built on.
- [OAuth 2.0 for AI agents / on-behalf-of flows](https://learn.microsoft.com/entra/identity-platform/v2-oauth2-on-behalf-of-flow) — delegated identity is the core agent-authorisation pattern.

### Security & adversarial

- [OWASP Top 10 for LLM Applications & Generative AI](https://genai.owasp.org/llm-top-10/) — **Must-read.** Know all ten by name.
- [OWASP GenAI Security Project — Agentic AI threats & mitigations](https://genai.owasp.org/resource/agentic-ai-threats-and-mitigations/) — **Must-read** for this specific role.
- [MITRE ATLAS](https://atlas.mitre.org/) — adversarial TTP matrix for AI systems.
- [Microsoft — Prompt injection & indirect prompt injection guidance](https://learn.microsoft.com/azure/ai-services/openai/concepts/prompt-engineering) plus [Azure AI Content Safety docs](https://learn.microsoft.com/azure/ai-services/content-safety/)
- [Microsoft PyRIT](https://github.com/Azure/PyRIT) and [Garak](https://github.com/NVIDIA/garak) — automated red-teaming tooling you should be able to name.
- [Simon Willison — prompt injection archive](https://simonwillison.net/tags/prompt-injection/) — **Must-read.** The clearest ongoing explanation of why this isn't solvable by filtering, including the "lethal trifecta" framing (private data + untrusted content + external communication).
- [NVIDIA NeMo Guardrails](https://docs.nvidia.com/nemo/guardrails/) · [Guardrails AI](https://www.guardrailsai.com/docs) · [Llama Guard](https://ai.meta.com/research/publications/llama-guard-llm-based-input-output-safeguard-for-human-ai-conversations/)
- [Cloud Security Alliance — AI safety & security research](https://cloudsecurityalliance.org/artificial-intelligence)

### Responsible AI, standards & regulation

- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) and the [Generative AI Profile (NIST AI 600-1)](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf) — **Must-read** structure for risk conversations.
- [ISO/IEC 42001 — AI management system](https://www.iso.org/standard/42001) — certifiable AI governance.
- [ISO/IEC 23894 — AI risk management guidance](https://www.iso.org/standard/77304.html)
- [EU AI Act — official text portal](https://artificialintelligenceact.eu/) and the [European Commission AI Act page](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai) — know the risk tiers and GPAI obligations.
- [Microsoft Responsible AI Standard (v2, PDF)](https://blogs.microsoft.com/wp-content/uploads/prod/sites/5/2022/06/Microsoft-Responsible-AI-Standard-v2-General-Requirements-3.pdf) and [Responsible AI resources](https://www.microsoft.com/ai/responsible-ai)
- [Google — Responsible AI practices](https://ai.google/responsibility/responsible-ai-practices/) · [Secure AI Framework (SAIF)](https://saif.google/)
- [Partnership on AI / model card guidance](https://arxiv.org/abs/1810.03993) — the original Model Cards paper.
- [UK AI Safety / AISI evaluations work](https://www.aisi.gov.uk/) — useful vocabulary for capability evaluation.

### Evaluation & observability

- [OpenTelemetry — GenAI semantic conventions](https://opentelemetry.io/docs/specs/semconv/gen-ai/) — **Must-read.** The vendor-neutral answer to "how do you trace this?"
- [Azure AI Foundry — evaluation of generative AI](https://learn.microsoft.com/azure/ai-foundry/concepts/evaluation-approach-gen-ai) — groundedness, relevance, safety evaluators and CI integration.
- [RAGAS](https://docs.ragas.io/) · [DeepEval](https://docs.confident-ai.com/) · [promptfoo](https://www.promptfoo.dev/docs/intro/) · [LangSmith evaluation](https://docs.smith.langchain.com/evaluation) · [MLflow LLM evaluation](https://mlflow.org/docs/latest/llms/llm-evaluate/index.html)
- [HELM (Stanford CRFM)](https://crfm.stanford.edu/helm/) · [LMArena](https://lmarena.ai/) · [SWE-bench](https://www.swebench.com/) · [GAIA benchmark](https://arxiv.org/abs/2311.12983) · [τ-bench (tool-agent-user)](https://arxiv.org/abs/2406.12045) — the agentic benchmarks worth naming.
- [Judging LLM-as-a-Judge (MT-Bench / Chatbot Arena paper)](https://arxiv.org/abs/2306.05685) — biases and calibration of judge models.

### Architecture, integration & platform craft

- [Microsoft — Cloud Adoption Framework: AI adoption](https://learn.microsoft.com/azure/cloud-adoption-framework/scenarios/ai/) — governance and operating-model material that maps directly to the JD's governance bullet.
- [Azure Architecture Center — Application patterns](https://learn.microsoft.com/azure/architecture/patterns/) — saga, anti-corruption layer, circuit breaker, bulkhead, claim-check: the vocabulary you should use in agent integration answers.
- [Enterprise Integration Patterns (Hohpe & Woolf)](https://www.enterpriseintegrationpatterns.com/) — still the reference for messaging/integration design.
- [Martin Fowler — Software architecture guide](https://martinfowler.com/architecture/) and [ADR resources](https://adr.github.io/) — **Must-read** if you'll be asked to describe your ADR practice.
- [Google SRE Book](https://sre.google/books/) — SLO/error-budget language for AI reliability answers.
- [Designing Data-Intensive Applications (Kleppmann)](https://dataintensive.net/) — consistency, idempotency and failure reasoning behind agent tool design.
- [TOGAF Standard](https://www.opengroup.org/togaf) · [ArchiMate](https://pubs.opengroup.org/architecture/archimate3-doc/) · [C4 model](https://c4model.com/) — the notation you'll be asked to draw in.

### Courses & structured learning

- [DeepLearning.AI — short courses on agents (AutoGen, LangGraph, CrewAI, multi-agent, evaluation)](https://www.deeplearning.ai/short-courses/) — fastest structured ramp; Andrew Ng's four agentic design patterns come from this stream.
- [Microsoft — AI Agents for Beginners](https://github.com/microsoft/ai-agents-for-beginners) and [Generative AI for Beginners](https://github.com/microsoft/generative-ai-for-beginners) — free, hands-on, well-maintained.
- [Hugging Face — Agents Course](https://huggingface.co/learn/agents-course/) and [LLM Course](https://huggingface.co/learn/llm-course/)
- [Anthropic Courses (GitHub)](https://github.com/anthropics/courses) — tool use, prompt engineering, evals.
- [Microsoft Learn — AI-102 (Azure AI Engineer)](https://learn.microsoft.com/credentials/certifications/azure-ai-engineer/) and [AZ-305 (Solutions Architect Expert)](https://learn.microsoft.com/credentials/certifications/azure-solutions-architect/) — credential signals that match this JD.
- [Full Stack Deep Learning / LLM Bootcamp](https://fullstackdeeplearning.com/llm-bootcamp/) — production-oriented.

### Staying current (pick two, not ten)

- [Simon Willison's blog](https://simonwillison.net/) — the best practitioner filter on what actually changed.
- [Latent Space](https://www.latent.space/) — engineering-depth podcast/newsletter.
- [Anthropic engineering blog](https://www.anthropic.com/engineering) · [OpenAI research](https://openai.com/research/) · [Google DeepMind blog](https://deepmind.google/discover/blog/)
- [Microsoft Azure blog — AI announcements](https://azure.microsoft.com/en-us/blog/) · [AWS ML blog](https://aws.amazon.com/blogs/machine-learning/)
- [The Batch (DeepLearning.AI)](https://www.deeplearning.ai/the-batch/) · [Ahead of AI (Sebastian Raschka)](https://magazine.sebastianraschka.com/)

### A four-week study plan

| Week | Focus | Do this |
| --- | --- | --- |
| 1 | Agent fundamentals | ReAct, Reflexion, Lilian Weng's post, Anthropic's *Building effective agents*, OpenAI's practical guide. Write your own one-page definition of agent vs workflow, and the autonomy ladder from Round 2. |
| 2 | Enterprise shape | Azure WAF AI workloads, CAF AI adoption, MCP spec, OAuth on-behalf-of, integration patterns. Draw a full reference architecture for Case 1 from memory, twice. |
| 3 | Safety & governance | OWASP LLM Top 10 + agentic threats, MITRE ATLAS, NIST AI RMF + GenAI profile, ISO 42001 overview, EU AI Act tiers, Simon Willison on injection. Write a one-page threat model and a six-layer guardrail diagram. |
| 4 | Evaluation & economics | Hamel Husain on evals, Chip Huyen on evaluation, RAGAS/promptfoo docs, OTel GenAI conventions, LLM-as-judge paper. Build a model-selection matrix and a cost-per-task model for a use case you know. Then do three timed mock design cases out loud. |

---

## Sources & further reading

- [OWASP Top 10 for LLM Applications & Generative AI](https://genai.owasp.org/llm-top-10/)
- [OWASP GenAI Security Project — Agentic AI: threats and mitigations](https://genai.owasp.org/resource/agentic-ai-threats-and-mitigations/)
- [MITRE ATLAS — adversarial threat landscape for AI systems](https://atlas.mitre.org/)
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
- [NIST AI 600-1 — Generative AI Profile (PDF)](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf)
- [ISO/IEC 42001 — AI management systems](https://www.iso.org/standard/42001)
- [EU AI Act — text and explorer](https://artificialintelligenceact.eu/)
- [Anthropic — Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)
- [OpenAI — A practical guide to building agents (PDF)](https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf)
- [Lilian Weng — LLM Powered Autonomous Agents](https://lilianweng.github.io/posts/2023-06-23-agent/)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Agent2Agent (A2A) protocol](https://a2a-protocol.org/)
- [Microsoft — Agent Framework](https://learn.microsoft.com/agent-framework/)
- [Microsoft — Well-Architected Framework: AI workloads](https://learn.microsoft.com/azure/well-architected/ai/)
- [Microsoft — Cloud Adoption Framework: AI adoption](https://learn.microsoft.com/azure/cloud-adoption-framework/scenarios/ai/)
- [Microsoft — Azure AI Foundry evaluation concepts](https://learn.microsoft.com/azure/ai-foundry/concepts/evaluation-approach-gen-ai)
- [AWS — Well-Architected Generative AI Lens](https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/generative-ai-lens.html)
- [Google — Secure AI Framework (SAIF)](https://saif.google/)
- [OpenTelemetry — GenAI semantic conventions](https://opentelemetry.io/docs/specs/semconv/gen-ai/)
- [ReAct (arXiv:2210.03629)](https://arxiv.org/abs/2210.03629) · [Reflexion (arXiv:2303.11366)](https://arxiv.org/abs/2303.11366) · [RAG (arXiv:2005.11401)](https://arxiv.org/abs/2005.11401) · [Lost in the Middle (arXiv:2307.03172)](https://arxiv.org/abs/2307.03172)
- [Hamel Husain — Your AI product needs evals](https://hamel.dev/blog/posts/evals/)
- [Eugene Yan — Patterns for building LLM systems](https://eugeneyan.com/writing/llm-patterns/)
- [Simon Willison — prompt injection writing](https://simonwillison.net/tags/prompt-injection/)

