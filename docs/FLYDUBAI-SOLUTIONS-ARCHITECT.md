# flydubai — Solutions Architect Interview Guide

A complete, round-by-round preparation guide for a **Solutions Architect** role at **flydubai** (Dubai, UAE) — the Dubai Government-owned **low-cost carrier (LCC)** that is now deeply partnered with Emirates. Built from the role's job description and flydubai's publicly documented technology landscape. Used by the `/airlines` page.

> **Scope note.** This guide reverse-engineers a realistic interview loop and technical landscape from the public JD (large-scale distributed systems, microservices, event-driven architecture, cloud-native, SAFe/agile, well-architected framework) plus flydubai's publicly reported technology choices (**Sabre SabreSonic** PSS, **Microsoft Azure** cloud-first, **OPEN** rewards now unified into **Emirates Skywards**, the Emirates–flydubai codeshare partnership). flydubai does not publish its internal architecture, so technical specifics below are **industry-standard airline/LCC patterns you should be able to defend**, not confirmed internal system designs. Treat brand and vendor facts as public context, not insider knowledge.

---

## Context: flydubai & the low-cost-carrier tech landscape

**Who flydubai is.** flydubai is a **low-cost carrier** launched in 2009, owned by the Investment Corporation of Dubai (Dubai Government) and chaired by Sheikh Ahmed bin Saeed Al Maktoum — the same chairman as Emirates. It operates a **single-fleet-type** Boeing 737 operation (737-800 and 737 MAX 8/9), flying a point-to-point and DXB-connecting network of 130+ destinations. The LCC model shapes everything in IT: **ancillary revenue** (unbundled fares, seats, bags, meals) is a first-class product, **cost-efficiency and lean IT** are architectural constraints, and **high aircraft utilisation** makes operational-disruption tooling business-critical.

**Why this matters for architecture.** An LCC is not "a smaller full-service airline." The commercial model — sell the seat cheap, monetise everything around it — means the booking/merchandising path and the **dynamic pricing / ancillary engine** are the crown jewels, and every millisecond and every dollar of run-cost is scrutinised. You should be able to reason about **unbundled fare construction, ancillary catalog/offer management, and conversion-optimised booking flows**, not just seat inventory.

**The platform landscape you'll be expected to reason about:**

1. **Passenger Service System (PSS) — Sabre SabreSonic.** flydubai publicly moved onto **Sabre's SabreSonic** PSS (from its earlier Videcom/legacy LCC system), which also put flydubai into the **GDS** so travel agents and corporate channels can sell it. SabreSonic provides reservation, inventory and departure control, plus merchandising/ancillary capabilities. As with any vendor PSS, flydubai-built systems are **orchestrators and channels around Sabre**, integrating over Sabre APIs and IATA **NDC**, not replacements for it.
2. **Digital channels & merchandising.** Web and mobile booking, self-service (check-in, changes, disruption re-accommodation), and third-party/OTA/GDS distribution — all fronted by APIs, with an **offer/order** mindset (IATA's Offers & Orders direction) where ancillaries are merchandised alongside the fare.
3. **OPEN rewards → Emirates Skywards.** flydubai's own loyalty program, **OPEN**, is a deliberately simple, cash-like scheme (earn ~1 point per USD spent, no blackout dates, redeem on any flight; points forfeited after 24 months of account inactivity). Under the **Emirates–flydubai partnership**, **Emirates Skywards** is now the unified loyalty currency across both carriers — members earn and redeem Miles and Tier Points on both airlines. This makes **loyalty integration between two independent programs/platforms** a very real, flydubai-specific architecture problem.
4. **Emirates–flydubai partnership integration.** Codeshare, aligned schedules, **through-check-in and baggage transfer** across Dubai International (flydubai at Terminal 2/3, Emirates at Terminal 3), and a combined network marketed as one journey. The integration surface — schedules, availability, single PNR/interline, baggage, loyalty, and disruption handling **across two different PSS platforms (Sabre and Amadeus Altéa)** — is arguably the most distinctive system-design theme at flydubai.
5. **Cloud strategy — Azure cloud-first.** flydubai has publicly pursued a **Microsoft Azure** cloud-first strategy (with Microsoft 365 for collaboration), giving a cleaner, more Azure-native landscape than Emirates' Azure+AWS hybrid. Expect Azure-native answers (AKS, App Service/Functions, API Management, Azure SQL/Cosmos DB, Event Hubs/Service Bus, Entra ID, Azure Monitor) with an LCC's relentless focus on **cost per transaction**.
6. **Governance & regulatory context.** UAE data-residency and sector guidance (Dubai Government / TDRA cloud policies), **PCI-DSS** (payments are central to a direct-sell LCC), IATA security standards, and GDPR-equivalent handling for EU passengers all shape architecture. Agile/SAFe-style delivery and a "well-architected" bar are expected, but expect a leaner, more pragmatic governance footprint than a mega-carrier's.

**Why a Microsoft Azure/GenAI architect profile fits.** flydubai's Azure-first, cost-conscious, digitally-merchandised model maps directly onto an Azure Solutions Architect background: cloud-native platforms, event-driven integration, production RAG/agentic delivery for self-service and operations, Well-Architected cost/reliability reviews, and multi-team technical leadership — with a strong bonus if you can talk **ancillary revenue, dynamic pricing guardrails, and cross-carrier integration** fluently.

**UAE hiring loop context.** flydubai loops for architect-level roles typically run: **online application (sometimes an aptitude/technical screen) → recruiter/HR screen (occasionally a recorded video intro) → 1–2 technical/architecture rounds (scenario + case study) → managerial/behavioral → final leadership round**, over **3–6 weeks**. Comp is **tax-free AED**; expect discussion of relocation, visa sponsorship, and allowances (housing, schooling, flights) as part of total comp — this repo's own résumé already states "Open to relocation to the UAE," a strong opener.

---

## How to use this guide

Each round below has the same shape:

- **What they're testing** — the signal the interviewer is calibrating.
- **Questions** — realistic prompts, each with a **strong-answer skeleton**, **key points to hit**, and **red flags** that fail the round.

Practice out loud. For system design, **drive the requirements yourself** (peak transactions/sec, regions, SLA, consistency needs, and *cost per transaction* — this is an LCC) before drawing boxes. For architecture-leadership questions, anchor answers in **trade-offs, ADRs, and governance**, not just technology choices. For behavioral, use **STAR** (Situation, Task, Action, Result) with a quantified result.

---

## Round 1 · Recruiter / HR screen

**What they're testing:** Is your architecture experience real and at the right altitude (enterprise/platform vs single-project)? Are location, visa, notice period and comp aligned? Can you tell a crisp, senior-sounding story in 90 seconds?

**Q: Walk me through your background in 90 seconds, architect-level.**
- *Strong-answer skeleton:* 14 years → progression from developer to Technical Lead/Architect at Microsoft → own end-to-end architecture strategy, technology selection, delivery risk and cost across Fortune 500 + government engagements → GenAI/Azure specialization with production RAG and multi-agent systems → led/influenced teams from 6 to 40+ engineers → AZ-305 (Solutions Architect Expert) plus AI-102/AZ-204/AZ-104/AZ-400.
- **Key points:** Ownership language ("I own," not "I contributed to"), quantified scale, a certification that maps directly to the JD (AZ-305), and — for an LCC — at least one *cost-optimisation* proof point.
- **Red flags:** Talking only about code; no mention of governance, stakeholders, cost, or trade-offs; can't name a scale metric.

**Q: Why flydubai / why an LCC?**
- *Strong-answer skeleton:* Genuine UAE exposure (delivered a UAE Government data-sovereignty/governance engagement — Informatica → SQL + Purview, 2 government entities). Interest in flydubai's Azure-first, cost-disciplined, digitally-merchandised model and the distinctive Emirates–flydubai integration challenge. Openness to relocation already stated.
- **Key points:** Cite the actual UAE project; show you understand an LCC is a *merchandising and cost* business, not a scaled-down full-service airline; be concrete about relocation readiness (visa sponsorship required, timeline).
- **Red flags:** Generic "I love aviation"; treating flydubai as "just a small Emirates"; unclear on relocation logistics.

**Q: What's your target compensation and notice period?**
- *Strong-answer skeleton:* State a tax-free AED band researched for Solutions Architect level in Dubai, note current notice period, and ask about the relocation/housing package structure explicitly (a normal ask in UAE hiring).
- **Key points:** Research-backed number, not a guess; comfortable discussing allowances (housing, schooling, flights) as part of total comp.
- **Red flags:** Refusing to give a number; anchoring only on home-country comp without adjusting for tax-free AED and relocation costs.

---

## Round 2 · Hiring manager (architecture scope & fit)

**What they're testing:** Can you operate at platform scope, not just project scope? Do you understand escalation, governance, and enforcing architectural intent across teams you don't manage — in a lean, cost-sensitive org?

**Q: Describe the broadest architectural scope you've owned — how many teams and platforms did your decisions touch?**
- *Strong-answer skeleton:* Reference the connected-vehicle platform (20M+ vehicles, ~2M telemetry msgs/min, EMEA/Russia/Americas/Asia) — architecture decisions rippled across regional platform teams, not one project; SLA ownership (98–99%) is a platform-level commitment. Pair with the UAE government marketplace work, where architecture had to satisfy two separate entities' governance requirements simultaneously.
- **Key points:** Multi-team blast radius, SLA/NFR ownership at platform level, working across organizational/regulatory boundaries.
- **Red flags:** Every example is single-team/single-project; no decision reconciled across conflicting stakeholder requirements.

**Q: How do you keep several teams building consistently with your architectural intent when you don't manage them — without heavyweight process?**
- *Strong-answer skeleton:* Written artifacts first (ADRs/RFCs), not verbal alignment; a lightweight design-time review gate, not just at release; a small set of non-negotiable NFRs (security, observability, **cost tagging** — crucial for an LCC) enforced via templates/golden paths rather than manual review of everything; a pre-defined escalation owner so a disagreement has a known resolution path.
- **Key points:** Artifact-driven governance, golden paths over gatekeeping, pre-defined escalation, cost-awareness baked into the standard.
- **Red flags:** "I just talk to people a lot" with no repeatable mechanism; pure command-and-control review that a lean org can't sustain.

**Q: Tell me about a time your architecture and another architect's conflicted. What happened?**
- *Strong-answer skeleton:* STAR — name the actual trade-off (e.g., in-flight document processing without persistent storage vs. another team's audit-log requirement on the automotive invoice project), how it was resolved (ephemeral processing + a compliant audit trail via structured logging, not raw document storage), and what changed afterward (it became the template pattern for future document-processing services).
- **Key points:** Specific technical conflict, a documented resolution, a durable artifact/pattern that outlived the disagreement.
- **Red flags:** Vague "we talked it through"; no lasting artifact; blames the other architect.

---

## Round 3 · System design (LCC / aviation domain)

Five cases mapped to flydubai's actual domains. Always **gather requirements first**: peak transactions/sec, regions/latency budget, consistency needs (strong vs eventual), failure-mode tolerance (can we lose a booking? double-sell a seat?), and — because this is an LCC — **cost per transaction**.

### Case 1 — Booking & ancillary merchandising around a PSS you don't own (SabreSonic-style)
Design the orchestration/merchandising layer that lets flydubai's own channels (app, web, contact centre) sell fares **plus ancillaries** (seats, bags, meals) against a third-party PSS (Sabre SabreSonic) without becoming tightly coupled to it.
- **Strong-answer skeleton:** Anti-corruption layer between flydubai channels and Sabre's APIs/NDC; own a **canonical offer/order domain model** so ancillaries are merchandised consistently across channels and a future PSS change doesn't ripple everywhere; an **offer/pricing service** that composes fare + ancillary bundles (aligned to IATA Offers & Orders thinking); idempotent writes back to Sabre (order/PNR references, not raw retries) to avoid duplicate bookings; cache read-heavy availability/ancillary-catalog queries with a short TTL and a "confirm at PSS before payment capture" step.
- **Key points:** Anti-corruption layer, canonical offer/order model, ancillary/merchandising as a first-class concern, idempotency at the PSS boundary, cache-then-confirm before payment.
- **Follow-ups:** How do you keep ancillary conversion high without over-calling the PSS (cost + latency)? (Cache the catalog + price locally; confirm price/availability at order creation only.)
- **Red flags:** Proposes replacing Sabre; treats ancillaries as an afterthought; no idempotency story; "just call the API" for a payment-bearing flow.

### Case 2 — Loyalty integration: OPEN and Emirates Skywards across two carriers
Design accrual/redemption so that a flydubai flight earns the correct **Emirates Skywards** Miles/Tier Points (the unified currency), while respecting flydubai's own OPEN mechanics and Emirates' program rules — across two independently-owned loyalty platforms.
- **Strong-answer skeleton:** Event-driven: flight-completion event → accrual calculation (fare class, tier multiplier, cross-carrier earning rules) → **append-only, auditable ledger** → member balance projection (read model) updated async; **redemption is the harder path** — needs strong consistency (no double-spend) via a transactional outbox / optimistic locking; because Skywards is owned by a *partner* program, the cross-program exchange runs through a **reconciliation/settlement boundary** (near-real-time earning event, but authoritative settlement reconciled in batch), with an anti-corruption layer isolating flydubai from Skywards' contract changes.
- **Key points:** Append-only ledger + CQRS-style read projection, strong consistency only for redemption, cross-program integration as a settlement/reconciliation boundary (not naive real-time), anti-corruption between the two programs.
- **Follow-ups:** A member's flydubai flight didn't credit Skywards Miles — how do you investigate across two systems? (Correlation ID on the earning event, ledger replay on both sides, reconciliation report — not "look at current balance.")
- **Red flags:** Single mutable balance column with no audit trail; assumes both programs can share one synchronous database; treats accrual and redemption as the same consistency problem.

### Case 3 — Emirates–flydubai codeshare / interline integration (the signature flydubai case)
Design the integration that makes an Emirates + flydubai itinerary feel like **one journey**: aligned schedules and availability, single/linked PNR, **through-check-in and baggage transfer at DXB**, and coordinated disruption handling — spanning **two different PSS platforms** (Sabre for flydubai, Amadeus Altéa for Emirates).
- **Strong-answer skeleton:** Treat each carrier's PSS as an external system behind an anti-corruption layer; build an **interline/codeshare orchestration service** exchanging schedule/availability and booking/interline messages over IATA standards (EDIFACT/NDC, interline messaging); own a **canonical itinerary model** spanning both segments so downstream (baggage, notifications, disruption) doesn't care which PSS owns which leg; baggage transfer is an **event + reconciliation** problem across two DCS systems (bag-tag events, sortation, mishandled-bag fallback); disruption/IRROPS must coordinate re-accommodation across both carriers with clear ownership per segment.
- **Key points:** Two-PSS anti-corruption, canonical cross-carrier itinerary model, standards-based interline messaging, baggage as cross-DCS events with reconciliation, disruption coordination with per-segment ownership.
- **Follow-ups:** A passenger misconnects DXB because the flydubai inbound is late — which system owns the rebooking, and how do both PSS stay consistent? (Segment-owning carrier owns its rebooking; orchestration layer coordinates and keeps the canonical itinerary authoritative; no silent double-booking on either PSS.)
- **Red flags:** Assumes one shared PSS; ignores that baggage/DCS are per-carrier; no canonical model, so every downstream system has to special-case each PSS.

### Case 4 — Irregular operations (IRROPS) for a point-to-point LCC network
A sandstorm closes DXB for six hours. Design the system that re-accommodates affected flydubai passengers across a mostly point-to-point Boeing 737 network with high aircraft utilisation.
- **Strong-answer skeleton:** Burst-load, priority-queueing problem — expect 50–100x normal rebooking volume in minutes; an auto-rebooking rules engine (tier priority, connection risk, fare rules, **ancillary re-fulfilment** for paid seats/bags) generates candidate itineraries against live inventory, falling back to human agents for edge cases; design for **graceful degradation** (batch + queue-depth-driven customer comms) rather than assuming real-time for everyone; because a single-fleet LCC has thin aircraft/crew slack, surface **crew/aircraft constraints** into re-accommodation options; run decision-support tooling from a secondary region because DXB itself may be degraded.
- **Key points:** Burst/priority-queue design, rules engine + human fallback, ancillary re-fulfilment, LCC crew/aircraft scarcity, explicit degraded-mode UX, geographic failover for tooling.
- **Follow-ups:** How do you stop the rebooking engine from double-selling seats while thousands race for the same inventory? (Optimistic concurrency + PSS as single source of truth for seat state — ties back to Case 1.)
- **Red flags:** Assumes normal-load architecture scales linearly; no human fallback; forgets ancillaries the passenger already paid for; forgets the tooling itself must survive the outage.

### Case 5 — Dynamic pricing & ancillary revenue optimisation
Design a system that recommends fare and ancillary price adjustments in near-real-time from demand signals, safely — the commercial heart of an LCC.
- **Strong-answer skeleton:** A pricing/offer service consumes demand signals (searches, load factor, competitor fares, time-to-departure) and produces bounded recommendations; **guardrails are the architecture**: hard min/max bounds, rate-of-change limits, human approval above a threshold, full audit trail, and a fast kill-switch/rollback; ancillary pricing (seats/bags/meals) is optimised per-segment; the ML models sit behind an MLOps pipeline with versioning, drift monitoring, and shadow/A-B evaluation before any price goes live.
- **Key points:** Bounded, auditable, reversible pricing; guardrails and human-in-the-loop above thresholds; ancillary as its own optimisation surface; MLOps discipline (shadow, drift, rollback).
- **Follow-ups:** A pricing model starts recommending near-zero fares on a route — what stops that reaching customers? (Bounds + rate limits + anomaly alarm + kill-switch, all before publish — never rely on the model being "correct.")
- **Red flags:** Unbounded model output straight to the storefront; no rollback/kill-switch; no audit trail; treating dynamic pricing as a pure data-science problem with no guardrail architecture.

### Case 6 — Multi-region data residency & DR
flydubai operates from the UAE (home jurisdiction) and flies into the EU (GDPR) and other markets with local rules. Design the data architecture.
- **Strong-answer skeleton:** Residency isn't "one Azure region" — it needs a **data-classification model** (PII, payment/PCI, regulated, operational telemetry) with per-classification placement rules; UAE-resident systems for local regulatory data, EU-appropriate processing for GDPR subjects, with cross-border transfer mechanisms only where genuinely needed; DR strategy (active-active vs active-passive) chosen per criticality tier and RTO/RPO, not one global story; prove compliance with lineage/governance tooling (Purview-class), not a spreadsheet.
- **Key points:** Classification drives placement, explicit cross-border justification, DR varies by tier, PCI-DSS isolation for payments, auditable lineage.
- **Red flags:** "Replicate everything everywhere"; no classification step; unaware UAE PDPL and GDPR differ; payments not isolated for PCI.

---

## Round 4 · Coding / technical deep-dive

**What they're testing:** Can you go from architecture diagram to real implementation trade-offs? Comfort in the JD's stack (cloud-native, event-driven, APIs) with an LCC's cost lens.

- **Idempotent event consumer.** Implement a Kafka/Event-Hubs/Service-Bus consumer that processes a "flight completed" event exactly-once from the accrual service's point of view, given at-least-once delivery. *(Answer: idempotency key = flight+passenger+event-type with a unique constraint, or an outbox + processed-events table.)*
- **API versioning across consumers.** Multiple channels (web, app, OTAs/GDS) consume your booking/offer API and you need a breaking change. Version and migrate without a big-bang release. *(Answer: additive-first, deprecation window with telemetry on old-version usage, contract testing, and a documented ADR for the sunset date.)*
- **Circuit breaker around a flaky dependency.** A partner/interline or GDS endpoint is unreliable. Implement/describe a circuit breaker + fallback for availability lookups. *(Answer: breaker with half-open probing, fallback to last-known/cached availability with a staleness flag surfaced to the user — not a silent stale read.)*
- **Concurrency control for seat/ancillary assignment.** Two booking requests race for the same seat. Walk through optimistic vs pessimistic locking trade-offs and pick one with justification.
- **Cost-aware caching.** Design a cache for the ancillary catalog/pricing that minimises expensive PSS calls without ever charging a stale price — where's the "confirm at PSS" boundary?

---

## Round 5 · Cloud & data architecture (Azure-first)

**What they're testing:** Real Azure depth mapped to flydubai's Azure-first, cost-disciplined reality — not "read the docs" answers.

- **AKS / App Service for a lean platform.** How do you structure namespaces/environments so several teams share infrastructure without stepping on each other's blast radius or cost allocation — while keeping run-cost low for an LCC?
- **APIM as the integration front door.** How would you use Azure API Management to expose booking/offer/loyalty APIs to partners (Emirates interline, OTAs, GDS, aggregators) with per-partner rate limiting, versioning, and NDC-shaped payload validation?
- **Data platform + governance.** Design the data platform feeding revenue management, ancillary/pricing analytics, and personalization from operational systems, with lineage and access control (Purview-class) satisfying UAE/EU compliance.
- **Cost per transaction.** For an LCC, cloud spend is a P&L line. Where do you attack cost — right-sizing, autoscaling to zero for spiky workloads (Functions/Container Apps), reserved capacity for steady load, caching to cut PSS calls — and how do you make cost visible (tagging, showback)?
- **Well-Architected review.** Walk through applying the Azure Well-Architected Framework's five pillars (reliability, security, cost, operational excellence, performance) to the booking/offer service from Case 1 — leading with **cost** and **reliability**.

---

## Round 5B · Full-stack reference architecture (edge → database)

Walk end-to-end through a passenger-facing booking + ancillary flow, naming the component, its purpose, the trade-off, a lower-cost alternative, and single- vs multi-region considerations at each layer:

1. **Edge/CDN** — Azure Front Door / CDN for static app assets and DDoS protection; trade-off: latency hop on cache miss; lower-cost alt: App Gateway alone at smaller scale.
2. **API Gateway (APIM)** — auth, rate limiting, partner/GDS contract versioning; trade-off: another hop + per-call cost; multi-region: regional APIM with Front Door geo-routing.
3. **Offer/booking orchestration service (AKS or Container Apps)** — the anti-corruption + merchandising layer from Case 1; trade-off: complexity vs calling Sabre directly; multi-region: active-active read, active-passive write (PSS is the write authority).
4. **Event backbone (Event Hubs / Service Bus)** — fan-out to loyalty, notifications, analytics; trade-off: eventual consistency downstream; lower-cost alt: Service Bus topics for lower-throughput domains.
5. **Order/OLTP store (Azure SQL / Cosmos DB)** — strong consistency for payment/order and loyalty redemption; trade-off: Cosmos DB tunable consistency needs a deliberate choice, not a default.
6. **Payments (PCI-DSS scope)** — tokenized, isolated payment service; trade-off: added integration vs keeping cardholder data out of the main app; a hard compliance boundary for a direct-sell LCC.
7. **Data Lake + Purview** — analytics/AI training data with lineage; trade-off: freshness lag vs operational stores.
8. **Identity (Entra ID / Workload Identity Federation)** — service-to-service auth without embedded secrets; multi-region: token caching to survive a transient IdP blip.
9. **Observability (Azure Monitor / App Insights + a business-metric layer like Kusto/ADX)** — SLA/SLO **and** cost-per-transaction tracking; trade-off: telemetry volume cost.

---

## Real-world case studies — how flydubai & the industry actually solve this

- **flydubai + Sabre (SabreSonic).** flydubai selected Sabre's SabreSonic PSS to power its digital transformation and enter the GDS — the reference example of an LCC standardising on a vendor PSS and building channels/merchandising around it rather than running a bespoke reservation core.
- **flydubai + Microsoft Azure.** flydubai's publicly reported Azure cloud-first move (plus Microsoft 365) is the model for "cost-disciplined, cloud-native LCC IT" — scale on demand, pay for what you use, keep the run-team lean.
- **OPEN → Emirates Skywards.** The Emirates–flydubai partnership unifying loyalty onto Emirates Skywards is a live example of **integrating two independently-owned loyalty platforms** into one member-facing currency — the archetypal cross-program accrual/redemption/settlement problem.
- **Emirates–flydubai codeshare.** Aligned schedules, through-check-in, baggage transfer and single-journey marketing across **two different PSS platforms (Sabre + Amadeus Altéa)** — the canonical "make two systems feel like one product via anti-corruption layers and a canonical model" case.
- **Industry patterns.** Ryanair, Wizz Air and other LCCs have published on ancillary merchandising, dynamic pricing, and cloud cost discipline; IATA's **Offers & Orders / NDC** direction is the distribution backbone. Use these as "here's how the industry solves this class of problem" evidence, not claims about flydubai's internals.

---

## Round 6 · AI/ML & MLOps (aviation / LCC-specific)

**What they're testing:** Can you connect your production GenAI/RAG background to an LCC's actual AI use cases?

- **Dynamic pricing / ancillary optimisation.** Architect near-real-time fare/ancillary recommendations with guardrails (bounded ranges, human approval above a threshold, kill-switch, full audit) — same governance instinct as your LLM cost/model-governance experience, applied to revenue.
- **Ancillary personalization / next-best-offer.** Recommend the right seat/bag/meal bundle at booking to lift conversion — a recommendation + experimentation problem (shadow, A/B, guardrails against dark-pattern pricing).
- **Disruption self-service (GenAI).** RAG over fare rules / re-accommodation policy for a chat/voice assistant during IRROPS, with **strict grounding** (no hallucinated refund/rebooking eligibility) — connect to your fine-tuning-vs-RAG trade-off experience.
- **Predictive maintenance (single fleet).** Boeing 737 sensor telemetry → failure prediction; map to your connected-vehicle telemetry experience (2M msgs/min) — same ingestion/streaming shape, different label. A single fleet type actually *simplifies* the model surface.
- **MLOps governance at scale.** Model versioning, drift monitoring, rollback, and a clear owner for "who approves a pricing/rebooking model going to production" — exactly the ADR/governance muscle the JD is testing, applied to ML models.

---

## Round 7 · Architecture leadership (agile, runway, governance)

**What they're testing:** Direct evidence you can operate architecture governance in a lean, fast-moving org — not just system-design skill.

- **Architecture runway.** How do you decide what architectural enablers to build 1–2 increments ahead vs what's too speculative — while an LCC pushes hard for feature velocity and low cost?
- **ADR discipline.** Walk through your ADR process — what triggers one, who reviews it, how deviations get tracked and reconciled.
- **Technical debt vs velocity.** How do you get debt remediation prioritized against feature and cost work when you don't own the backlog?
- **Vendor/PoC governance.** Describe running a PoC to validate a new technology (agent framework, vector store, a Sabre capability) and converting the result into a go/no-go architecture decision — not just a demo.
- **Cross-team consistency without authority.** Two teams built complementary features with incompatible integration patterns. How do you reconcile it after the fact without grinding delivery to a halt?

---

## Round 8 · Behavioral / STAR

- Tell me about a time you delivered under significant ambiguity (mirrors the UAE government data-sovereignty engagement — unclear initial requirements across two entities).
- Describe a time your architectural recommendation was rejected by leadership. What did you do?
- Tell me about mentoring a team through a difficult technical transition (mirrors your AI Apprentice/Mastery programme and Python skilling work).
- Describe managing conflicting priorities across multiple concurrent engagements (mirrors running Fortune 500 + government engagements in parallel).
- Tell me about a production incident you owned end-to-end, including the postmortem and what changed afterward (mirrors your SLA/telemetry ownership on the connected-vehicle platform).
- Tell me about a time you cut cost significantly without hurting reliability (an LCC-specific favourite — have a quantified example ready).

---

## Round 9 · Executive / bar-raiser

**What they're testing:** Strategic judgment — build vs. buy, cost discipline, and a point of view on where LCC/aviation-tech is heading.

- If you had 90 days as the new Solutions Architect for a platform, what would your first three moves be?
- Build vs. buy: when would you recommend flydubai build in-house (e.g., a GenAI self-service layer or ancillary optimiser) vs. buy/extend a vendor platform (SabreSonic, a loyalty platform)?
- How do you defend an architecture decision's cost to a CFO who only sees the invoice, not the risk it avoided — in a business where cost per seat is the whole game?
- Where does generative AI / agentic tech genuinely change LCC operations in the next 3 years (self-service, merchandising, disruption) versus where it's hype?
- How would you structure architecture governance so it *accelerates* delivery for a fast, lean org instead of becoming a bottleneck?

---

## Technology & skills map — JD stack ↔ flydubai landscape ↔ your resume

| JD / flydubai area | What it is | Your resume evidence | Gap to address in prep |
|---|---|---|---|
| LCC commercial model | Ancillary revenue, unbundled fares, cost-per-seat discipline | Cost-optimisation ownership across engagements | Learn LCC merchandising / offer-order vocabulary so you can talk ancillaries fluently |
| Sabre SabreSonic / PSS integration | Airline reservation backbone (vendor) | No direct PSS experience | Frame as "anti-corruption layer + canonical model around a vendor system" — a pattern you *have* done |
| Emirates–flydubai integration | Cross-carrier codeshare/loyalty across two PSS | Multi-entity UAE government integration | Direct transferable pattern — two systems, one product, via anti-corruption + canonical model |
| Loyalty (OPEN / Skywards) | Cross-program accrual/redemption/settlement | Event-driven, ledgered systems | Prepare the append-only ledger + cross-program settlement answer |
| Azure cloud-native (AKS, APIM, event-driven) | flydubai's primary cloud platform | Azure Functions, AKS, Service Bus, Logic Apps, APIM-adjacent work | Strong — lead with this; add explicit *cost-per-transaction* framing |
| Dynamic pricing / ancillary ML | Revenue optimisation with guardrails | LLM cost/model governance, guardrail design | Map your guardrail instincts onto revenue-safety (bounds, kill-switch, audit) |
| GenAI/RAG/agents | Self-service & operations AI | Deep production delivery (Azure AI Foundry, multi-agent, RAG) | Strongest differentiator — anchor Round 6 and Round 9 here |
| Enterprise governance (security, cost, observability) | Cross-platform standards, lean footprint | SLA ownership, cost optimisation, Purview-based governance | Strong — emphasise *lean* governance that speeds delivery |
| Regulatory (UAE PDPL, GDPR, PCI-DSS) | Multi-jurisdiction + payments compliance | Data-sovereignty/governance delivery in UAE government | Add PCI-DSS payment-isolation talking point for a direct-sell LCC |

---

## Technical question bank (rapid-fire, by topic)

**PSS / booking / ancillary:** What are Reservation, Inventory and Departure Control in a PSS? · Why an anti-corruption layer around a vendor PSS (SabreSonic)? · How do you merchandise ancillaries consistently across channels? · How do you avoid double-booking when the PSS is source of truth but you cache availability? · What is IATA NDC / Offers & Orders and why does it matter for an LCC? · How do you cache ancillary pricing without ever charging a stale price?

**Loyalty / cross-program:** Why is redemption a stronger-consistency problem than accrual? · How do you design an auditable, append-only ledger? · How do you integrate two independently-owned loyalty programs (OPEN ↔ Skywards) — real-time earning vs batch settlement? · Exactly-once on top of at-least-once delivery?

**Cross-carrier integration:** How do you make an Emirates+flydubai itinerary feel like one journey across two PSS? · How do you handle baggage transfer across two DCS systems? · Who owns rebooking on a misconnect, and how do both PSS stay consistent?

**Cloud / Azure:** AKS namespace-vs-cluster trade-offs for a lean org? · How does APIM do per-partner rate limiting and versioning? · When Cosmos DB over Azure SQL, and what does tunable consistency mean operationally? · Where do you attack cloud cost for an LCC? · What does a Well-Architected review produce as an artifact?

**Governance / agile:** What triggers an ADR vs just making the call? · What's on an architecture runway and how far ahead? · How do you keep governance lightweight enough to *speed up* a fast org? · Enterprise Architect vs Solution Architect remit?

**AI/ML for aviation:** What guardrails around an ML dynamic-pricing/ancillary engine? · How is 737 predictive maintenance like connected-vehicle telemetry? · How do you stop a fare-rules chatbot from hallucinating refund eligibility?

---

## Deeper / staff-level questions

- Design a zero-downtime migration of the booking/offer orchestration layer from one PSS integration pattern to another, with live traffic and no double-bookings during cutover.
- Design the Emirates–flydubai interline layer so that either carrier's PSS can be down for maintenance without blocking the other carrier's ability to sell/service the shared itinerary. Where's the real bottleneck?
- How would you design chargeback-accurate cloud cost allocation across several teams with very different traffic profiles, so an LCC can see cost-per-booking by product?
- Two teams need the same capability (e.g., document intelligence for both travel-document verification and refund evidence) — shared platform service or let each build their own? Defend the trade-off.
- Design an active-active booking layer where the underlying PSS is single-write-region — what does "active-active" even mean here, and where's the bottleneck?
- Walk through a "chaos day": DXB is unreachable, SabreSonic is degraded, and your regional failover only partially works. What's your incident-command sequence?

---

## Scenario-based questions (situational & troubleshooting)

1. Skywards Miles stop crediting for flydubai flights after a partner-side API change. How do you detect it, and what's your immediate mitigation?
2. Booking volume spikes 50x in 10 minutes (a flash sale). Your orchestration layer's downstream PSS calls are rate-limited by the vendor. What do you do in the first hour — and how do you protect ancillary conversion?
3. An auditor asks you to prove EU passenger data never left EU-classified storage for 12 months. What evidence do you produce, and how did your architecture make that possible?
4. The cloud bill jumped 40% after a "successful" feature launch on an LCC's tight budget. How do you investigate, and what cost-governance was missing?
5. Your Well-Architected review flags a reliability risk in a service mid-way through a critical release. Do you block it? How do you decide?
6. A GenAI disruption-assistant gives a passenger an incorrect rebooking-eligibility answer. Walk through incident response and the architectural fix (grounding, guardrails).
7. A dynamic-pricing model starts publishing near-zero fares on a route. What in your architecture stops it reaching customers, and what's the postmortem?
8. Baggage transfer between a flydubai and an Emirates flight fails at DXB because the two DCS systems disagree on the bag's state. What's the immediate workaround and the ADR you write afterward?

---

## Sources & further reading

- [flydubai — About us](https://www.flydubai.com/en/about-us)
- [Sabre — flydubai selects Sabre to power its digital transformation](https://www.sabre.com/insights/releases/flydubai-selects-sabre-to-power-its-digital-transformation-journey/)
- [Microsoft — flydubai customer story (Azure)](https://customers.microsoft.com/en-us/story/1393081532428034087-flydubai-travel-azure-uae)
- [flydubai — OPEN rewards](https://news.flydubai.com/welcome-to-open-rewards-by-flydubai)
- [Emirates & flydubai — Skywards loyalty partnership](https://www.emirates.com/english/skywards/flydubai/)
- [IATA — New Distribution Capability (NDC)](https://www.iata.org/en/programs/airline-distribution/ndc/)
- [IATA — Offers & Orders](https://www.iata.org/en/programs/airline-distribution/retailing/)
- [Microsoft Azure — Well-Architected Framework](https://learn.microsoft.com/azure/well-architected/)
- [Microsoft Learn — Azure Solutions Architect Expert (AZ-305)](https://learn.microsoft.com/credentials/certifications/azure-solutions-architect/)
- [PCI Security Standards Council — PCI DSS](https://www.pcisecuritystandards.org/)
