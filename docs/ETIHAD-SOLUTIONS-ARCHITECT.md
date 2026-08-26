# Etihad Airways — Solutions Architect Interview Guide

> **How to read this.** Rounds 1–9 are the loop; 6B and 6C are the AI-weighted rounds (agentic/GenAI engineering depth, and sovereign/air-gapped AI for a government-owned entity). Everything about Etihad's landscape below is drawn from **public reporting and industry patterns** — use it to sound informed, never to claim knowledge of internal systems. When in doubt in the room, say "publicly, Etihad has talked about X; I'd want to confirm the internal picture."

---

## Context: Etihad Airways & the Abu Dhabi tech landscape

- **Who they are.** Abu Dhabi's flag carrier, hub at **AUH / Zayed International**, owned by the Abu Dhabi government through **ADQ**. Full-service, premium-heavy, mid-size relative to Emirates — which matters architecturally: Etihad has mega-carrier complexity (global network, cargo, MRO, loyalty) at a smaller scale and with tighter cost discipline than Emirates, and far more product complexity than an LCC like flydubai.
- **Strategic posture.** After the equity-partner era (Air Berlin, Alitalia, Jet Airways) Etihad reset to a profitability-first, mid-size model and has since returned to network and fleet growth. The architectural read: **transformation, consolidation and cost-per-transaction discipline**, not greenfield empire-building. Expect questions about modernising and simplifying an estate that grew through a very different strategy.
- **No global alliance.** Etihad is not a member of Star/oneworld/SkyTeam, so connectivity is built from **bilateral codeshare and interline partnerships** rather than alliance infrastructure. That's a genuinely distinctive integration problem and a great system-design topic — you own the canonical model, because no alliance owns it for you.
- **PSS and retailing.** Publicly, Etihad is an **Amadeus Altéa** carrier and has been associated with Amadeus's next-generation **offers & orders (Nevio-era)** retailing direction. Architecturally: the PSS is a vendor-owned source of truth for reservation/inventory/departure control, and the interesting work sits in offer construction, merchandising, orchestration and channels around it.
- **Loyalty.** **Etihad Guest**, with partner earn/burn across airlines, hotels, banks and retail — a cross-partner accrual/redemption/settlement problem.
- **Cargo.** **Etihad Cargo** has publicly implemented **IBS Software iCargo**, the same class of modular vendor cargo platform pattern as Emirates SkyCargo's OneCargo. ONE Record, e-AWB and customs integration are the standards to name.
- **Engineering/MRO.** **Etihad Engineering** at AUH is a full third-party MRO — so predictive maintenance, parts/inventory and work-order systems are in scope, over a **mixed fleet** (787, A350, 777, A380), which is materially harder to model than flydubai's single 737 type.
- **Abu Dhabi cloud & AI context.** Etihad has publicly discussed hyperscaler cloud and AI/ML work; separately, Abu Dhabi hosts a strong **sovereign AI ecosystem** (G42/Core42 sovereign cloud, national AI strategy, Arabic-first models such as Falcon from TII and JAIS). For a government-owned carrier, "run it in-country, under UAE jurisdiction" is a credible and often expected answer — see Round 6C.
- **Regulatory.** UAE **PDPL**, TDRA rules, **ADGM** as a financial free zone with its own data-protection regime, **GDPR** for EU passengers, **PCI-DSS** for payments, plus IATA security and API/PNR exchange obligations with border authorities.

---

## How to use this guide

Work it by round, not front to back. For a technical loop, the highest-leverage sections are Round 3 (system design), Round 5/5B (cloud and full-stack reference architecture) and Rounds 6/6B/6C if the role is AI-weighted. Rehearse each answer as a **spoken structure**: drive requirements → boundaries and source of truth → design → failure modes → trade-offs → what changes at 10×.

Three Etihad-specific framings to have ready in any round:

1. **"Vendor owns the core; we own the experience and the orchestration."** Altéa/iCargo are sources of truth; the value you add is the anti-corruption layer, canonical model, offer/order orchestration and channel consistency.
2. **"Mid-size means every decision has a cost-per-transaction answer."** You don't get Emirates' budget; you do get Emirates' complexity. Say the number.
3. **"Government-owned in Abu Dhabi."** Data residency, sovereignty and audit evidence are first-class NFRs, not an afterthought — and they change AI architecture materially.

---

## Round 1 · Recruiter / HR screen

**Q: Walk me through your background in 90 seconds, architect-level.** Lead with scope and outcomes, not tools: how many teams/portfolios your decisions covered, the scale you've operated (throughput, users, regions), the regulated/government delivery you've governed, and the production AI you've shipped. Land on: "I design end-to-end architectures around vendor cores, govern teams I don't manage, and I'm hands-on in code and evaluation."

**Q: Why Etihad / why Abu Dhabi?** Honest and specific beats flattery: a full-service carrier running a genuine transformation, a vendor-core estate where architecture actually decides outcomes, cargo and MRO alongside passenger, and a government-owned context where governance and sovereignty are taken seriously — which matches how you already work. Abu Dhabi: long-term relocation, family, and the UAE's AI/digital strategy.

**Q: Compensation and notice.** Anchor on the total package (tax-free base, housing/schooling allowances, relocation, ticket benefits) rather than base alone, give a range with a reason, and confirm the grade you're being assessed for early — grade decides the ceiling far more than negotiation does.

---

## Round 2 · Hiring manager (architecture scope & fit)

**Q: What's the broadest architecture scope you've owned?** Answer with blast radius: number of teams, systems, regions and users affected by your decisions, plus the artefacts you left behind (ADRs, reference architecture, API standards, review gates). Scope is measured by consequence, not headcount.

**Q: How do you keep multiple teams consistent when you don't manage them?** Pre-solve the common decisions — reference architectures, golden-path templates, API and event standards, an observability package — so the compliant path is the fastest path. Then tier the governance: golden path self-serve for low risk, peer review for medium, architecture board with a response SLA for high-risk data/security/PSS/cost decisions. Track deviations openly with an owner and an expiry.

**Q: A vendor's roadmap conflicts with your target architecture. What do you do?** Separate what the vendor must own (PSS core inventory, ticketing, DCS) from what you must own (canonical model, orchestration, customer experience, data). Keep the anti-corruption layer as the negotiating position: it lets you absorb vendor change without freezing your own roadmap. Write the disagreement into an ADR with the cost of each option so the decision is traceable rather than personal.

**Q: Tell me about an architecture conflict with another architect.** Convert opinion into criteria: agree the NFRs and the deciding evidence first, run a bounded spike if the data is missing, then commit and document. Escalate the *decision*, never the person, and support the chosen option publicly once it's made.

---

## Round 3 · System design (aviation domain)

### Case 1 — Offer & order orchestration around Altéa (a PSS you don't own)

**Requirements to drive first:** which channels (web, app, GDS/NDC, agents, partners), read vs write paths, peak shopping QPS vs booking TPS (shopping outnumbers booking by orders of magnitude), latency budget for a search, consistency requirement at checkout, and who is the source of truth for inventory (the PSS, always).

**Design.** Channels → API gateway → **offer service** (composes fare + ancillaries + partner content into a single offer) → **order service** (orchestrates create/modify/cancel against the PSS through an anti-corruption layer) → PSS. Shopping is cached and approximate; **ordering is authoritative and idempotent**. Cache availability/price aggressively for shopping with short TTLs and a mandatory **reprice-and-confirm** against the PSS before payment capture. Every write carries an idempotency key; on timeout you reconcile by key rather than retrying blind, because a duplicate booking is a customer-visible incident and a revenue-accounting one.

**Offers & orders (NDC-era) angle.** The industry shift from PNR/ticket to **offer and order** objects is a modelling decision, not just a protocol change: an order is the single record of what the customer bought (flights, ancillaries, partner services), which finally lets you sell non-air content coherently. Say what it costs: dual-running order and legacy PNR/ticket semantics through a long migration, plus reconciliation between them.

**Trade-offs.** Cache aggressiveness vs price accuracy; building your own offer engine vs consuming the vendor's; strict consistency at checkout vs latency. **At 10×:** shopping scales horizontally and is the cost driver (cache hit rate and vendor call volume decide the bill); ordering scales with the PSS, which is the real ceiling.

### Case 2 — Etihad Guest accrual, redemption & partner settlement

**Design.** Ingest qualifying events (flown segments, partner airline/hotel/bank/retail transactions) onto a stream; an **append-only ledger** stores every accrual, redemption, expiry and adjustment with source reference, rule version, effective time and correlation ID; balance is a projection, not the only truth. Accrual is **eventually consistent** (late posting is fine, corrections are new entries); **redemption is strongly consistent** because it spends finite value — atomic check-and-debit or a reservation/hold with expiry. Partner settlement runs as a periodic reconciliation with dispute evidence, because money movement between legal entities should not be a side effect of an event handler.

**Failure modes.** Duplicate partner files (dedupe on a natural key), retro-claims months later (effective-dated rules), promotional multipliers (rule version on every entry), and fraud (velocity checks and holds before redemption).

### Case 3 — Etihad Cargo booking & ULD tracking around iCargo

**Design.** Bounded contexts: booking/capacity, warehouse/handling, ULD and shipment tracking, customs/compliance, revenue accounting. Scan and IoT events arrive out of order — store immutable events with `occurred_at` and sequence, drive a per-shipment/ULD state machine with explicit legal transitions, and recompute projections within a reconciliation window. Conflicts become operational exceptions, not silent overwrites. Partner boundaries use **ONE Record / e-AWB** standards to avoid bespoke mappings per forwarder.

**Compliance.** Dangerous goods, customs declarations and security screening are validation gates with audit evidence, not optional metadata. Document extraction is a strong AI use case (Round 6) *with* confidence thresholds and human review.

### Case 4 — IRROPS and re-accommodation without an alliance

**The Etihad twist:** with no alliance, re-accommodation options depend on **bilateral interline and codeshare agreements**, each with its own contract, messaging and settlement. Design a **canonical partner-capability model** (who you can rebook onto, under what conditions, with what settlement) fed by per-partner adapters, so the re-accommodation engine reasons over one model instead of N integrations.

**Flow.** Disruption event → impacted-itinerary identification → prioritised re-accommodation (fare/cabin rules, connections, entitlements, partner availability, tier and duty-of-care) → options presented to self-service *and* an agent workbench → confirmed changes written to the PSS idempotently → proactive notification. Optimisation is a recommendation engine; a human or a deterministic policy makes irreversible calls above thresholds. Design for the surge: a disruption is a 50–100× traffic spike concentrated in minutes, so queue-based backpressure, bulkheads and graceful degradation matter more than steady-state throughput.

### Case 5 — Data residency, ADGM and multi-region DR

**Design.** Classify first (passenger PII, payment, crew, government-exchanged API/PNR, operational telemetry), then place: PDPL-scoped data in-country with UAE-resident primaries; EU passenger data handled under GDPR with a lawful transfer basis; payments in an isolated PCI scope where card data never reaches general application logs, prompts or analytics; ADGM-entity data under its own regime. **Active-active is a per-domain decision:** stateless read/shopping paths can be multi-region; anything the PSS arbitrates is effectively single-write-region, so "active-active" for booking means regional read/serve with a single authoritative write path and a tested failover, and you should say so plainly rather than drawing an optimistic diagram. DR: RPO/RTO per domain, tested failover, and evidence — an untested DR plan is a slide, not an architecture.

---

## Round 4 · Coding / technical deep-dive

Expect to write real code or read someone else's. The recurring themes:

**Idempotent event consumer.** A `processed_events` table with a unique constraint on the event key, written **in the same transaction** as the business change; duplicates hit the constraint and no-op. That's how you get business-exactly-once on top of at-least-once delivery. Pair it with the **outbox pattern** for publishing: write the domain change and the outbound event in one transaction, and let a relay publish it, so you never have a booking without its event or an event without its booking.

**Idempotent PSS writes.** Client-generated idempotency key, stored request fingerprint, cached response for a replay window; on timeout, **reconcile by key** before retrying — never issue a blind second create.

**Circuit breaker around a flaky vendor.** Closed → open on error/latency thresholds → half-open probe. Say what happens in the open state: serve stale-with-flag, degrade to a reduced experience, or fail fast with a clear error — the fallback *is* the design decision, the state machine is just plumbing.

**Concurrency for seat/ULD assignment.** Optimistic concurrency with a version column for low contention; a short-lived hold/reservation with expiry for interactive flows; serialisable or row-lock semantics only where the contention is real. Always define what happens when the hold expires mid-payment.

**API versioning across teams.** Additive by default; for breaking changes run both versions behind the gateway with contract tests, published deprecation dates and telemetry on who's still on the old one, and record the sunset in an ADR.

**Ledger modelling.** Immutable entries, no updates or deletes, corrections as compensating entries, periodic snapshots for performance, replayable projections. If someone proposes `UPDATE balances SET ...`, explain why disputes and audits make that indefensible.

---

## Round 5 · Cloud & data architecture

**Hybrid reality.** Assume a mixed estate: hyperscaler cloud for new build, on-prem or hosted for legacy and some airport/ops systems, vendor SaaS for PSS and cargo. Design for that honestly — a clean single-cloud diagram that ignores the vendor SaaS and the airport edge is a fantasy. Name the integration seams: identity federation, network paths and latency to AUH, data gravity, and the cost of egress.

**Compute.** Kubernetes (AKS/EKS) with namespace-per-team on shared clusters for normal workloads, dedicated clusters only where compliance or blast radius demands it; serverless/container-apps for spiky, event-driven workloads; queue-depth autoscaling for ingestion and disruption spikes.

**Integration front door.** An API gateway/management layer for partner and channel traffic: per-partner products with quotas and throttling, OAuth/mTLS, schema validation on NDC/interline payloads, versioning, and telemetry that tells you which consumer is on which version.

**Data platform.** Streaming ingestion for operational events, a lakehouse with medallion-style curation, data contracts and quality gates on anything feeding a feature store or a knowledge index, catalogue/lineage/classification for PDPL evidence, and a serving layer for analytics and ML. Retention and deletion must work end to end — a deletion request has to remove the record from the source, the lake, the indexes, the caches and the traces.

**Well-Architected review.** The artefact is a prioritised risk/action register across reliability, security, cost, operations and performance, each finding with severity, owner, due date and acceptance criteria. A score with no actions isn't governance.

**Cost.** Tag and attribute spend per domain, publish cost-per-transaction (per shopping request, per booking, per kilo of cargo processed), reserve steady-state capacity, scale spiky workloads to zero, and attack the vendor call volume — for an airline, paid PSS/GDS transactions are often a bigger lever than compute.

---

## Round 5B · Full-stack reference architecture (edge → database)

Walk it component by component for a booking + ancillary flow, saying what each layer *decides*:

1. **Edge/CDN + WAF** — static assets, bot and scraping defence (airline shopping is heavily scraped, and scrapers are a real cost line), TLS termination, geo-routing.
2. **API gateway** — authN/Z, rate limits per channel and partner, request validation, versioning, correlation-ID injection.
3. **BFF per channel** — web, mobile and partner BFFs shape responses without polluting the domain services.
4. **Domain services** — offer, order, ancillary, loyalty, customer, notification; each owns its data, communicates by contract, and never reaches into another's store.
5. **Anti-corruption layer** — the only component that speaks Altéa/vendor dialects; centralises idempotency, retries, circuit breaking, rate limiting and mapping to the canonical model.
6. **Async backbone** — events for fan-out (loyalty, analytics, notifications, ops), queues for point-to-point work, outbox for reliable publication, DLQs with replay tooling.
7. **Data stores** — relational for orders/ledger (integrity and transactions), document/key-value for high-read profile and content, cache for shopping, search/vector for knowledge and retrieval, object storage for documents.
8. **Payments** — isolated PCI scope, tokenisation, never card data in logs, prompts or analytics.
9. **Cross-cutting** — identity (workload + user), secrets in a vault, OpenTelemetry tracing end to end with a correlation ID that survives the vendor hop, SLOs per journey, feature flags for progressive rollout.

**Multi-region note.** Read paths and shopping can be regional; the order path follows the PSS's single-write reality. Failover is tested, documented and rehearsed, not assumed.

---

## Round 6 · AI/ML & MLOps (aviation-specific)

**What they're testing:** whether you apply production AI responsibly to aviation rather than demoing GenAI.

**Revenue management & dynamic offers.** ML proposes, policy disposes: bounded price/offer changes by route and cabin, rate-of-change limits, anomaly detection, human approval above thresholds, full audit of model version/features/approver, and a kill-switch to a rules baseline. For a premium carrier, personalisation must also be defensible — no discriminatory or dark-pattern pricing, and the ability to explain an offer.

**Predictive maintenance across a mixed fleet.** Same telemetry architecture as any high-volume asset platform (partition by asset, late/out-of-order handling, feature extraction, anomaly scoring, work-order integration, drift monitoring), but a **mixed fleet multiplies the model surface** — separate models or fleet-type features per airframe/engine family, and per-type evaluation. Models support engineering decisions; they never bypass approved maintenance procedures. Etihad Engineering's third-party MRO work adds a customer dimension: whose data, whose model, whose liability.

**Cargo & customs document intelligence.** OCR/extraction plus compliance validation over AWBs, invoices, certificates and dangerous-goods declarations, with confidence thresholds, human review queues, and audit logs capturing model version and extracted fields. Retain raw documents only as policy allows.

**Customer-facing GenAI.** RAG over approved fare rules, baggage and disruption policy with mandatory citations; deterministic tools — not free text — decide eligibility for refunds or compensation; guardrails cover retrieval filters, injection defence, confidence thresholds, red-teaming, human escalation and full transcript logging. A hallucinated entitlement answer is an incident with a regulatory tail.

**MLOps governance.** Model owners, risk tiers, approval gates, registry, evaluation harness, drift and data-quality monitoring, rollback, and a Responsible AI review — expressed as architecture-runway enablers so teams can ship AI safely instead of reinventing controls per project.

---

## Round 6B · Agentic AI, LLM & MCP engineering depth

**What they're testing:** the AI-weighted version of this role is assessed against a GenAI/Agentic AI skills bar — agents, orchestration frameworks, RAG, vector search, MCP, guardrails, evaluation, LLMOps. Round 6 is the applied aviation view; this is the engineering-depth view. The full playbook is the **Agentic AI Solution Architect** guide on this site; this is the Etihad-shaped summary.

### Agentic AI & multi-agent workflows

**Agent vs deterministic workflow.** Orchestrate deterministically when the steps are enumerable — shop, price, pay, issue. Use an agent when the *path* is unknown but the *tools* are bounded: a disruption or servicing copilot that inspects an order, checks partner re-accommodation options and entitlements, applies duty-of-care and compensation rules, and drafts an option set. Agency buys branching you can't enumerate; it costs determinism, latency, tokens and auditability.

**Multi-agent shape.** Supervisor plus specialists over a **typed shared state**, not free-text chat between models: entitlement, options, compliance and drafting specialists with a human-approval handoff. Bound everything — max steps, max tool calls, wall-clock and token budget, explicit termination — because an unbounded loop is an incident and an invoice simultaneously.

**Planning, reasoning and memory.** ReAct for single tool-using agents; plan-and-execute where the plan should be reviewable (or human-approved) before it runs; reflection/critic loops for document extraction quality; routing/handoff for supervisor topologies — and name each pattern's failure mode. Separate short-term session state, long-term semantic memory (vector-indexed, TTL'd, retrieval-filtered per user) and durable case state in a real datastore. Passenger PII in a shared long-term memory without classification and per-user filters is a PDPL problem, not a feature.

**Human-in-the-loop.** The agent proposes with evidence and confidence; a policy layer routes auto-approve / human-approve / block by risk tier and value; approver identity, proposal and decision are logged immutably. Anything spending money — waivers, compensation, refunds, upgrades — is human-approved above a threshold.

### LLMs, prompting and orchestration frameworks

Strong at extraction, transformation, summarisation and tool selection; weak at arithmetic, freshness and anything not in context. Use **structured outputs** (JSON schema/constrained decoding) for machine-consumed results, **function/tool calling** for actions with the tool contract as the trust boundary (server-side validation, per-user authorisation, idempotent writes because the model will retry), explicit **context budgeting**, and **model selection as an ADR** with a documented fallback deployment.

Frameworks: **LangChain** (integration breadth), **LangGraph** (explicit stateful graph, durable checkpoints, resumable and auditable runs), **Semantic Kernel** (.NET/Azure-native plugins and planners), **AutoGen** (conversational multi-agent exploration), **CrewAI** (role/task prototyping). The senior point: keep prompts, tool contracts, state schema and the evaluation harness *outside* the framework so a swap is a refactor, not a rewrite.

### RAG, vector search and MCP

**Pipeline.** Ingestion (fare rules, conditions of carriage, baggage and disruption policy, partner/interline agreements, engineering and cargo manuals) → layout-aware parsing → **structure-aware chunking** on clause/heading with clause-ID and effective-date metadata → **versioned embeddings** → **hybrid retrieval** (BM25 + vector, because fare codes, RBDs, AWB numbers and airport codes are lexical) → **reranking** → context budgeting → **grounded generation with citations** and an explicit refusal path. Effective-dating is non-negotiable: a correct answer from a superseded rule is still wrong. RAG for changing knowledge, fine-tuning for format/tone — never to inject facts.

**Vector store selection.** Score on filtered/hybrid quality, security trimming, p95 latency at scale, multi-tenancy, residency, ops burden and cost per million vectors: managed cloud search (Azure AI Search or the equivalent) as the default in a cloud-aligned estate, **pgvector** when the corpus is modest and Postgres already exists, Qdrant/Weaviate/Milvus for large dedicated workloads, FAISS for benchmarking only. Decide it with a PoC and an ADR.

**MCP.** A standard contract for exposing tools, resources and prompts to AI clients, so one governed server per bounded context (order, loyalty, cargo, disruption) is reused across agents and channels rather than rebuilt per project. Cautions to raise unprompted: the MCP server is a **privilege boundary** — authenticate the caller, propagate *user* identity for real entitlement checks, allow-list tools per agent, validate arguments, rate-limit, version schemas like APIs, log every invocation, and treat tool descriptions themselves as untrusted input.

### Guardrails, evaluation, observability and cost

**Guardrails, layered:** input (PII redaction, injection/jailbreak classifiers, topic scoping), retrieval (entitlement and market filters), tool (allow-list, argument validation, user-identity authorisation, spend thresholds), output (content filtering, groundedness and citation checks, schema validation), process (human approval, kill-switch, immutable audit, red-team suite in CI). Name **indirect prompt injection** — instructions hidden in an uploaded document or email the agent reads — and defend by never treating retrieved content as instructions.

**Evaluation:** retrieval (recall@k, citation coverage), generation (groundedness, relevance, correct refusal, safety) and task (success rate, tool-selection accuracy, steps, cost per resolved case), on a golden set of SME-approved questions run in CI as the release gate, with LLM-as-judge calibrated against human review.

**Observability:** one trace per agent run covering every LLM call, tool call, retrieved chunk, token count and latency, plus dashboards for cost per request, p95 latency, containment, escalation, groundedness and drift, feeding escalations back into the golden set.

**Cost and latency:** route to the smallest model that passes evals, cache (exact, semantic, prefix, embeddings), rerank-then-truncate rather than stuffing context, stream for perceived latency, parallelise independent tool calls, cap agent steps, cache paid PSS/GDS lookups behind the agent, and consider provisioned capacity once volume is predictable. Report **cost per resolved contact** against the human baseline under a p95 SLO and an eval quality floor.

### Engineering, platform and LLMOps

**Python/FastAPI:** async I/O, Pydantic models shared with structured outputs, dependency-injected auth and clients, queued background execution for long agent runs, streaming responses, retry-with-jitter and fallback deployments on 429s, deterministic tests with recorded LLM fixtures, structured logging with correlation IDs, `ruff`/`mypy` in CI.

**Platform:** a model/AI platform layer (Azure AI Foundry / Bedrock / Vertex equivalents) for deployments, prompt flow, evaluation and content safety; managed search for retrieval; the existing lakehouse for features and knowledge sources; Purview-class lineage and classification, because a knowledge index inherits every governance obligation of its sources.

**LLMOps:** prompts, tool schemas, chunking/index configuration, embedding model version and eval datasets are **versioned release artefacts** promoted dev→test→prod with the eval suite as the gate; blue/green index rebuilds behind an alias; canary model rollouts behind a routing flag; drift monitoring with a rules fallback. Ship as containers on Kubernetes with queue-depth autoscaling, managed identity everywhere, secrets in a vault, private endpoints to model/search/data planes.

**Leadership:** publish the reference architecture, ship a golden-path template so teams don't reinvent guardrails, add AI-specific review gates (classification, evals, red-team, cost model, human-oversight design) to the existing ADR process, tier governance by risk, and stay hands-on in code and evaluation reviews.

---

## Round 6C · Sovereign & air-gapped AI (government-entity constraints)

**Why this comes up here:** Etihad is government-owned (ADQ) in a jurisdiction with an explicit sovereign-AI agenda — Abu Dhabi hosts sovereign cloud capability (G42/Core42), a national AI strategy, and Arabic-first models (Falcon, JAIS). Add PDPL, ADGM, GDPR and government data exchange, and you should expect the panel question *"this data can never go to a model vendor — now what?"* Module 14 of the **Agentic AI Solution Architect** guide is the full playbook; this is the Etihad version.

### Decompose the mandate first

| Requirement | What it forbids | Etihad example |
| --- | --- | --- |
| **Residency** | Processing/storage outside the UAE | PDPL-scoped passenger, crew and loyalty data |
| **Sovereignty** | Foreign jurisdiction over data or operator | Government-exchanged datasets, national systems interfaces |
| **Operational sovereignty** | Offshore/uncleared staff operating the platform | Security-adjacent and government-facing systems |
| **No third-party inference** | Any prompt, document or output reaching a model vendor | Classified government data, security screening, some API/PNR contexts |

Only the last one forces local model weights. Residency and no-training requirements are usually satisfied by in-tenant model services in a UAE region with private networking — and identifying that correctly saves a GPU estate you didn't need.

### The tiers, and where an Etihad workload lands

1. **Public SaaS AI** — public marketing content only.
2. **In-tenant cloud AI in a UAE region, private endpoints, no-training/zero-retention terms** — the default for fare-rule assistants, disruption self-service, cargo document intelligence, engineering knowledge search, developer productivity.
3. **Sovereign / government cloud with in-country operators and local key custody** — government-integrated or higher-classification datasets; in Abu Dhabi this is a genuinely available option, which is a strong, locally-credible answer.
4. **Self-hosted open-weight models on your own GPUs** — where "no third-party inference" is explicit.
5. **Fully air-gapped** — security, border and classified workloads; artefacts enter through a controlled import path only.

Confidential computing (TEE-backed VMs/GPUs, customer-managed HSM keys) is the orthogonal control when the infrastructure operator is in the threat model. PCI scope stays isolated at every tier: card data must never be reachable from a prompt, an index, a trace or a log.

### Proving your knowledge never reaches a model

- **Contractual** — no-training and zero-data-retention terms, disabled abuse-monitoring/human review, sub-processor and jurisdiction disclosure, deletion SLAs. Real at tiers 1–3, meaningless at 4–5.
- **Network** — deny-all egress by default, private endpoints to model/search/storage planes, private DNS so the public endpoint doesn't resolve, no public IP on inference subnets, allow-listed egress proxy, and a **tested** alert on any unexpected destination.
- **Service configuration** — disable vendor and framework telemetry. The most common real leak in a "private" deployment isn't the model, it's the tooling: an orchestration SDK's analytics flag or a default cloud tracing exporter posting prompts and retrieved chunks to a SaaS backend. Self-host the collector; ban public MCP/plugin marketplaces at runtime.
- **Data handling** — minimise and redact before prompting, classify at ingestion and carry the label through chunks, traces and eval sets, trim retrieval on the *caller's* clearance, keep classification levels in separate indexes, and **never fine-tune a vendor-hosted model on internal corpora** — that is exporting your knowledge into weights you don't control, it's extractable, it goes stale, and it can't enforce per-user entitlement. Use retrieval.
- **Evidence** — a data-flow diagram with every crossing enumerated, network policy as code, tested DLP/egress detection, immutable audit of prompts, retrievals, tool calls and approvals, signed model provenance, and CI conformance checks so nobody reintroduces a public endpoint or a SaaS exporter.

### How each capability is achieved with local-only models

- **Models** — open-weight families (Llama, Qwen, Mistral, Gemma, Phi, DeepSeek) plus **Arabic-first sovereign models (Falcon, JAIS)**, which matter for Arabic service quality and often for procurement. Serve with vLLM/TGI (continuous batching, paged attention) on your GPU nodes, or a vendor local control plane on Arc-enabled/on-prem infrastructure. Route by task: 7–8B for routing, classification and extraction; 30–70B for synthesis. Quantisation is a measured trade re-validated on your eval set. Weights are supply chain: provenance, checksums, licence review, malware/pickle scanning, signed internal registry.
- **Orchestration & agents** — frameworks run as your containers with vendored dependencies and telemetry disabled; checkpoint state to in-boundary Postgres/Redis. Keep autonomy lower than with a frontier model: cap steps hard and prefer plan-approve-execute for anything touching an order, a refund or an operational decision.
- **RAG** — local OCR/parsing instead of a cloud document API, locally served embedding and reranker models, in-boundary vector store, effective-dated chunks, mandatory citations and a refusal path. Store embedding models locally — you can't re-download them mid-incident.
- **Vector store** — pgvector, Qdrant, Weaviate, Milvus or OpenSearch self-hosted, with query-time security trimming from the caller's identity and separate indexes where physical separation is expected.
- **MCP & tools** — in-boundary servers from an internal signed catalogue only, per-agent allow-lists, user-identity propagation, argument validation, no runtime installation, full invocation audit. Agents still reach Altéa, loyalty and cargo systems only through the ACL and gateway with delegated identity.
- **Guardrails** — locally served safety and PII classifiers (Llama Guard-class, Presidio) plus deterministic policy code, an output guard against classification spillage, fail-closed defaults, and a spillage runbook covering cache, index, trace and log purge.
- **Evaluation & observability** — the golden set inherits its sources' classification, so no public benchmark services and no hosted frontier judge; use a local judge calibrated against SME review with a larger human sample, and self-host OpenTelemetry, Grafana and LLM tracing in-cluster, because traces carry prompts and retrieved content.
- **Cost** — no per-token bill but a fixed GPU cost, so **utilisation** becomes the objective: batch aggressively, share one served model across use cases behind a gateway, cache semantically, schedule offline work into idle windows. Report cost per resolved task including amortised GPU, hosting and ops, and state the break-even honestly — below it, an API is cheaper and only the mandate justifies the tier.
- **LLMOps in an air gap** — signed artefacts (weights, images, dependency bundles, prompts, tool schemas, index config, eval sets) acquired and scanned in a low-side enclave, imported via approved media or a one-way diode, gated high-side by the eval suite, with blue/green index rebuilds and canary rollouts. Expect a quarterly cadence; keep last known-good weights.
- **Platform & DR** — internal package mirror and private registry, builds that must succeed with the network disabled, in-boundary vault with HSM-backed customer-managed keys, mTLS and micro-segmentation per classification zone, and a second **in-country** site, because failing over to a public region isn't available.

### Sovereign use cases to name

- **Low risk / internal** — policy, manual and circular Q&A; engineering and MRO manual search; SOP and briefing summarisation; Arabic↔English official translation; code assistance over internal repositories.
- **Medium risk / officer-in-the-loop** — tender and contract analysis; customs and dangerous-goods document checking; case, incident and complaint triage; regulatory-change impact analysis; disruption and roster decision support where a human signs.
- **Medium risk / customer-facing but bounded** — grounded fare-rule, baggage and disruption assistants with citations, refusal paths and human escalation; eligibility *explanation*, never eligibility *decision*.
- **Higher risk / mandatory human decision** — border and security screening analytics, fraud/AML support, safety-adjacent engineering decision support: the system produces evidence and a recommendation, a named human decides, and both are recorded.
- **Cross-entity** — a shared sovereign AI platform tenanted per government entity so nobody builds a solo GPU estate, with federated retrieval leaving data with its owning entity.

---

## Round 7 · Architecture leadership (runway, ADRs, governance)

**Architecture runway.** Enablers that committed near-term features provably need — the ACL hardening for a new partner, the event backbone a queued epic depends on, identity and observability patterns, data-model changes, risk-reduction spikes. If nothing within roughly two increments depends on it, it's a spike, not runway. Make runway visible as enabler features with acceptance criteria.

**ADR discipline.** Trigger an ADR for decisions that are costly to reverse, cross team boundaries, affect NFRs or standards, or carry security/compliance/cost impact. Capture context, options, decision, consequences, cost, security/compliance, owner and review date. Deviations are permitted but **logged with an owner and an expiry** — drift you can see is manageable, drift you can't is debt.

**Technical debt as economics.** Translate debt into incident probability, lead-time drag, cloud waste, vendor transaction cost or blocked features, then negotiate a standing capacity allocation rather than fighting story by story. "Add a circuit breaker to the PSS adapter" isn't cleanup; it's disruption-day resilience.

**Vendor and PoC governance.** A PoC answers a decision, not a vibe: define success criteria up front (latency, quality, security, residency, cost, operability, exit), run against representative data and load, and publish the result as an ADR — adopt, reject or defer.

**Consistency without authority.** Map the actual contracts and pain, pick the target pattern on evidence, stop further divergence, migrate the high-risk paths first behind adapters (strangler fig), and give teams a golden path so accidental divergence stops. Durable artefacts: ADRs, API standards, C4 views, review checklists.

---

## Round 8 · Behavioral / STAR

**Delivering under ambiguity.** *Situation:* a regulated multi-entity programme with conflicting data-residency and classification requirements. *Task:* one governed approach both parties would accept. *Action:* ran discovery to converge on a shared classification and residency model, captured contested calls as ADRs, and produced lineage/access evidence. *Result:* ambiguity became an executable architecture with compliance evidence.

**Your recommendation was rejected.** Quantify the trade-off (outage risk, compliance exposure, cost) in an ADR with alternatives and the accepted risk, support the decision publicly, and set a review trigger. Trust is preserved and the risk is visible rather than hidden.

**Mentoring through a hard transition.** Reference implementations, office hours, evaluation templates and code reviews rather than becoming the bottleneck; measure success by engineers shipping independently.

**Conflicting priorities.** Prioritise by risk, deadline, dependency and business impact; communicate trade-offs early; separate runway from feature work; delegate with explicit decision rights.

**An incident you owned end to end.** Incident command, stabilise with backpressure and bulkheads, communicate, root-cause, blameless postmortem, and durable actions — partitioning fixes, alerts, replay tooling, runbooks, SLO dashboards. Name what changed structurally, not just what was restarted.

---

## Round 9 · Executive / bar-raiser

**First 90 days.** Baseline the architecture (C4 views, ownership, data flows, SLOs, incident history, cloud and vendor spend, security posture, existing ADRs); align with product, delivery, EA and operations on the top three risks; convert those risks into visible runway enablers for the next increment. Arrive with a method, not a pre-baked answer.

**Build vs buy.** Buy specialised industry commodity — PSS core inventory/ticketing/DCS, mature cargo platform components, model providers, search infrastructure. Build where Etihad differentiates: offer and order orchestration, customer experience, partner integration, data and AI products, operational decision support. The anti-corruption layer is the compromise that keeps vendor depth without surrendering agility.

**Defending cost to a CFO.** Translate architecture into risk-adjusted business value: avoided outage, lower MTTR, compliance evidence, partner isolation, and unit cost per transaction. Show the cheaper options you rejected *and* the places you'd deliberately underbuild — not every workload deserves active-active.

**Where GenAI genuinely changes an airline in three years.** Real: constrained knowledge work — policy-grounded service, cargo and customs document intelligence, engineering knowledge search, ops copilots, developer productivity. Hype: unconstrained agents making pricing, refund, safety or rebooking decisions without deterministic controls. Aviation AI must be grounded, auditable, reversible and policy-bound.

**Governance that accelerates delivery.** Pre-solve common decisions (reference architectures, landing zones, API standards, observability packages), tier review by risk, publish SLAs for architecture decisions, and track exceptions openly. Governance that can't be measured becomes a queue.

---

## Technology & skills map — JD stack ↔ Etihad landscape ↔ your resume

| Area | What it is | Your evidence | Gap to address |
|---|---|---|---|
| Amadeus Altéa / PSS integration | Vendor source of truth for RES/INV/DCS | No direct PSS experience | Frame as anti-corruption layer + canonical model around a vendor core |
| Offers & orders / NDC retailing | Modern airline retailing objects replacing PNR/ticket semantics | API/domain modelling experience | Learn the vocabulary; be able to explain the dual-run migration cost |
| Bilateral interline/codeshare (no alliance) | Partner-by-partner connectivity and settlement | Multi-party integration delivery | Rehearse the canonical partner-capability model answer |
| Etihad Guest loyalty | Cross-partner accrual, redemption, settlement | Event-driven, ledgered systems | Ledger + settlement + fraud-hold story |
| Etihad Cargo / iCargo | Modular vendor cargo platform, ONE Record, e-AWB | Telemetry and partner integration at scale | Emphasise event ingestion, out-of-order state machines, customs gates |
| Etihad Engineering / MRO | Mixed-fleet maintenance, parts, work orders | Predictive/telemetry ML experience | Note mixed-fleet model surface vs single-type |
| Cloud-native platform | Kubernetes, gateway, streaming, lakehouse | Azure/AWS delivery, certifications | Lead with this; add cost-per-transaction framing |
| Data governance & residency | Classification, lineage, PDPL/ADGM/GDPR evidence | Government data-sovereignty delivery | Directly transferable — bring the evidence artefacts |
| GenAI / RAG / agents | Assistants, document intelligence, ops copilots | Production GenAI/RAG/multi-agent delivery | Strongest differentiator — Rounds 6, 6B, 6C |
| Sovereign AI | In-country inference, local models, no-egress proof | Regulated/government delivery | Know the Abu Dhabi sovereign-cloud and Arabic-model context |
| Governance & leadership | ADRs, runway, review gates, standards | Architecture governance experience | Bring 2–3 real ADRs and a review-gate design |
| Cost / FinOps | Vendor transaction cost, cloud spend, chargeback | Cost-optimisation ownership | Prepare cost-per-shopping-request and cost-per-booking examples |

---

## Technical question bank (rapid-fire, by topic)

**PSS, offers & orders**
- **Q: RES vs INV vs DCS?** Reservation owns PNRs and ticketing; Inventory owns schedules, availability and overbooking; Departure Control owns check-in, boarding and load. They change at different rates with different consistency needs — orchestrate around them, don't duplicate them.
- **Q: Why an ACL around Altéa?** It translates vendor dialects into your canonical model, centralises idempotency, retries, circuit breaking and observability, and means a vendor interface change lands in one component instead of every channel.
- **Q: Order vs PNR/ticket — what actually changes?** The order becomes the single record of everything the customer bought, including non-air content, which makes retailing coherent. The cost is a long dual-run with reconciliation between order and legacy semantics.
- **Q: Preventing double-booking with cached availability?** Cache is a shopping hint; at checkout, reprice and confirm in the PSS with an idempotency key before payment capture, and reconcile by key on timeout rather than retrying blind.

**Loyalty & event-driven**
- **Q: Why is redemption harder than accrual?** Redemption spends finite value and must prevent double-spend at transaction time; accrual can post late and be corrected with an adjustment entry.
- **Q: Exactly-once on at-least-once delivery?** You get business-exactly-once with idempotency keys and a unique constraint committed in the same transaction as the domain write. The broker may redeliver; the ledger changes once.
- **Q: Kafka-class stream vs queue?** Stream when many consumers need replayable, ordered events (ledger projections, notifications, campaigns, analytics); queue for point-to-point work.

**Cargo & operations**
- **Q: Out-of-order scan/IoT events?** Immutable events with `occurred_at` and sequence, an explicit state machine, projections recomputed within a reconciliation window, and conflicts raised as operational exceptions.
- **Q: Why bounded contexts in cargo?** Booking, warehouse, ULD, customs and revenue accounting differ in ownership, cadence, data model and compliance risk — a customs change shouldn't redeploy booking.
- **Q: Designing for a disruption spike?** Queue-based backpressure, bulkheads, prioritised processing, graceful degradation of non-critical features, and pre-scaled capacity — a disruption is a 50–100× spike in minutes.

**Cloud, data & governance**
- **Q: Shared cluster vs dedicated?** Namespace-per-team with quotas and network policies for normal workloads; dedicated clusters only where compliance or blast radius justifies the cost and drift.
- **Q: What does a Well-Architected review produce?** A prioritised risk/action register with severity, owner, due date and acceptance criteria — not a score.
- **Q: What triggers an ADR?** Costly-to-reverse, cross-team, standard-setting, or security/compliance/cost-affecting decisions. Local reversible choices stay local.
- **Q: Where's the biggest cost lever for an airline platform?** Usually vendor transaction volume (PSS/GDS calls) and shopping-path cache hit rate, before compute.

**AI/ML**
- **Q: Guardrails for a dynamic-offer engine?** Bounded changes, rate-of-change limits, anomaly detection, human approval above thresholds, model/feature/approver audit, kill-switch to a rules baseline.
- **Q: Mixed fleet vs single fleet for predictive maintenance?** A mixed fleet multiplies the model surface — per-type models or fleet-type features, per-type evaluation, and more drift monitoring.
- **Q: Stop a policy assistant hallucinating entitlement?** Grounded RAG with citations and effective-dated rules, deterministic eligibility tools rather than free text, confidence thresholds, refusal and escalation paths, and full logging.
- **Q: Agent or workflow?** Enumerable steps → workflow. Bounded tools with an unbounded path → agent, with hard caps on steps, tool calls, wall-clock and tokens.
- **Q: How do you prove no data reaches a model vendor?** Deny-all egress, private endpoints and DNS, telemetry disabled, self-hosted tracing, tested egress alerts, enumerated data-flow diagram, immutable audit, CI conformance checks.

---

## Deeper / staff-level questions

**Migrate to an offers-and-orders model without stopping delivery.** Introduce the order as the canonical customer-facing record while the PSS still arbitrates PNR/ticket, dual-write behind the ACL with reconciliation and a comparison harness, migrate one channel and one product at a time behind flags, and keep a rollback path per slice. The hard part isn't the API — it's revenue accounting, refunds and partner settlement reconciling across two models for the length of the migration.

**Design partner integration when there's no alliance.** Build the canonical partner-capability model (what each partner permits, under which fares, with what settlement and messaging), per-partner adapters behind it, contract tests per partner, and a capability registry the re-accommodation and shopping engines query. Onboarding a partner becomes configuration plus an adapter, not a project.

**Chargeback-accurate cost allocation across shared platform infrastructure.** Tag everything, attribute shared services by measured usage (requests, ingest volume, storage, vendor calls) rather than headcount, publish per-domain cost-per-transaction dashboards, and reserve a platform overhead line that isn't silently cross-subsidised. Make the allocation model an ADR so teams argue with the method, not the invoice.

**Retrofit governance onto teams that have shipped without it.** Start with a decision log and a lightweight ADR template for *new* decisions only, add golden paths so the compliant route is the fastest, introduce risk-tiered review with a response SLA, and backfill ADRs only for the decisions that are actively causing pain. Trying to document two years of history first is how governance programmes die.

**Active-active when the PSS is single-write-region.** Be honest: regional read/serve and shopping are active-active; the order path has one authoritative write region, so the design question is failover time, data reconciliation and what degraded service looks like during a regional loss — not a diagram with two equal arrows.

**Chaos day: AUH is degraded, the PSS is slow, failover is partial.** Incident command with named roles, stabilise ingestion with backpressure, shed non-critical load, protect the order path, communicate internally and to customers on a cadence, then a blameless postmortem with structural actions (partitioning, alerts, replay tooling, runbooks, SLO changes).

---

## Scenario-based questions (situational & troubleshooting)

- **Shopping latency doubles after a partner content integration.** Isolate with tracing: is it the partner call, the fan-out, or cache miss rate? Short term, bulkhead and timeout the partner path and serve degraded content; structurally, make partner content asynchronous or cached with staleness bounds so one partner can't set your latency budget.
- **Duplicate bookings appear after a network blip.** Check idempotency-key coverage on the write path and the retry policy; reconcile by key, quantify the customer impact, and fix the pattern — a retry without a key is the root cause, not the network.
- **A compliance review asks who accessed a passenger record through the AI assistant.** You should already have immutable logs of prompt, retrieved documents, tool calls, user identity and output. If you don't, that's the finding — and the remediation is architecture, not a report.
- **Cloud spend jumps 40% in a month.** Attribute by tag, find the delta (usually a new workload, a cache regression, an egress path or a retry storm), fix the cause, then add a budget alert and a cost gate in CI so the next one is caught before the invoice.
- **A model update improves benchmarks but breaks refusal behaviour on policy questions.** Your eval suite should have blocked it. Roll back via the routing flag, add the failing cases to the golden set, and tighten the release gate — benchmark scores are not evidence about your corpus.
- **Someone proposes fine-tuning a hosted model on internal policy documents.** Decline with reasons: knowledge in weights you don't control, extractable, stale on day one, and no per-user entitlement enforcement. Offer retrieval with citations instead, and fine-tune only format/tone on infrastructure you own.

---

## Sources & further reading

- **Amadeus** — Altéa suite and the offers-and-orders / NDC retailing direction (vendor documentation and press).
- **IATA** — NDC, Offers & Orders, ONE Record, e-AWB standards.
- **IBS Software** — iCargo platform (publicly announced airline cargo implementations, including Etihad Cargo).
- **Etihad Airways / ADQ** — investor and press material for strategy, fleet and ownership context.
- **UAE regulatory** — Federal Decree-Law on Personal Data Protection (PDPL), TDRA guidance, ADGM data-protection regulations.
- **Abu Dhabi AI ecosystem** — national AI strategy, sovereign cloud providers, and Arabic-first open models (Falcon from TII, JAIS).
- **AI governance frameworks** — NIST AI Risk Management Framework, ISO/IEC 42001, EU AI Act risk tiers, OWASP Top 10 for LLM Applications.

> Everything above is public-domain context and industry pattern. In the interview, present it as informed hypothesis and ask questions about the real estate — architects who assume are worse than architects who ask.
