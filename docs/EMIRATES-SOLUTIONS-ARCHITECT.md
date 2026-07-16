# Emirates Group — Solutions Architect Interview Guide

A complete, round-by-round preparation guide for a **Solutions Architect** role at **Emirates Group IT** (Dubai, UAE) — spanning Passenger (reservations/Skywards), SkyCargo, and enterprise-platform portfolios. Built from the role's job description and the wider Emirates Group technology landscape. Used by the `/airlines` page.

> **Scope note.** This guide reverse-engineers a realistic interview loop and technical landscape from the public JD (SAFe Agile Release Trains, architecture runway, ADRs, enterprise architecture governance, Azure/cloud-native, microservices, event-driven architecture) plus Emirates Group's publicly documented technology partnerships (Microsoft Azure, AWS, Amadeus Altéa PSS, IBS Software OneCargo). Emirates does not publish its internal architecture repository, so technical specifics below are **industry-standard aviation/logistics patterns you should be able to defend**, not confirmed internal system designs. Treat brand and vendor facts as public context, not insider knowledge.

---

## Context: Emirates Group IT & the aviation-tech landscape

**Who Emirates Group is.** Emirates Group is the Dubai Government-owned aviation conglomerate comprising **Emirates airline** (the world's largest international carrier by passenger-kilometres, ~250+ aircraft, 140+ destinations) and **dnata** (ground handling, cargo, catering, travel services across 35+ countries). Emirates Group IT is one of the largest in-house technology functions in the region, running everything from customer-facing digital channels to airport operations, crew systems, revenue management, and cargo logistics — at 24/7, mission-critical availability.

**Why this JD reads the way it does.** The language — *"Agile Release Trains (ARTs)"*, *"architecture runway"*, *"architectural intent"*, *"ADRs"*, *"enterprise architecture views"*, *"Teams of Teams"* — is textbook **SAFe (Scaled Agile Framework)** vocabulary. Emirates Group IT organizes delivery into ARTs aligned to business domains (e.g., Passenger Experience, SkyCargo, Airport Operations, Corporate Platforms), each with its own **Solution Architect** who owns the architecture runway (the near-term, ready-to-build architecture backlog) and governs consistency across teams. A **Solutions Architect — SkyCargo** posting is one concrete example of this pattern publicly advertised by Emirates Group.

**The platform landscape you'll be expected to reason about:**

1. **Passenger Service System (PSS).** Emirates runs on **Amadeus Altéa** — a multi-tenant, SOA-based PSS with three core modules: **Reservation (RES)** for booking/ticketing, **Inventory (INV)** for schedules/seat availability/overbooking, and **Departure Control (DCS)** for check-in/boarding/load planning. Altéa exposes EDIFACT, XML and IATA **NDC (New Distribution Capability)** interfaces, so most Emirates-built systems are *consumers* or *orchestrators* around Altéa, not replacements for it.
2. **Emirates Skywards.** The loyalty program (~30M+ members) runs as **microservices** — member management, accrual/redemption, tier management, partner-airline mileage exchange — behind an **API gateway**, with real-time event streaming (Kafka-class) for instant accrual/redemption and a security layer (OAuth2/OIDC, SSO) across app, web and partner channels.
3. **SkyCargo / OneCargo.** Emirates SkyCargo's freight platform, **co-developed with IBS Software**, is a cloud-native, modular replacement for the legacy cargo mainframe — decomposed into booking, warehouse management, revenue accounting, ULD (Unit Load Device) tracking, and customs/compliance services, integrating with ground handling agents, partner airlines, and customs authorities via REST/gRPC and IATA **ONE Record** data models.
4. **Cloud strategy — hybrid, not single-vendor.** Emirates has publicly partnered with **Microsoft Azure** for core digital transformation (AKS, Azure SQL/Cosmos DB, Azure AI/ML, Azure DevOps, Entra ID) and has also run cargo/loyalty workloads on **AWS** (auto-scaling, multi-AZ). Expect the real answer to "which cloud" to be **"depends on the domain and workload, governed by a cloud placement policy,"** not a single-cloud stance — a good architecture answer names this explicitly as a trade-off Emirates has actually made.
5. **Governance stack.** Public postings and the region's enterprise-IT norms point to **TOGAF** (ADM, Architecture Repository, Enterprise Continuum) for the EA method, **ArchiMate** or **C4** for modelling, and **SAFe** for portfolio/program delivery — i.e. exactly the "ArchiMate, C4, UML" + "SAFe" + "well-architected framework" combination named in the JD.
6. **Regulatory context.** UAE data residency and sector guidance (Dubai Government / TDRA cloud policies), PCI-DSS (payments), IATA security standards, and GDPR-equivalent handling for EU passengers all shape architecture decisions — expect "where does this data live and why" questions.

**Why a Microsoft Azure/GenAI architect profile fits.** Emirates Group IT's stated direction — Azure-first cloud-native platforms, AI/ML for personalization and operations (dynamic pricing, crew/catering optimization, predictive maintenance), event-driven integration, and enterprise governance — maps directly onto an Azure Solutions Architect background with production RAG/agentic delivery, Well-Architected reviews, and multi-team technical leadership.

**UAE hiring loop context.** Emirates Group interview loops for architect-level roles typically run: **resume shortlist → recruiter/HR screen → 1–2 technical/architecture rounds (scenario + whiteboard) → managerial/behavioral → final business/leadership round**, over **3–6 weeks**. Comp is **tax-free AED**; expect discussion of relocation, visa sponsorship, schooling, and housing allowances rather than just base salary — this repo's own résumé already states "Open to relocation to the UAE," which is a strong opener for this exact conversation.

---

## How to use this guide

Each round below has the same shape:

- **What they're testing** — the signal the interviewer is calibrating.
- **Questions** — realistic prompts, each with a **strong-answer skeleton**, **key points to hit**, and **red flags** that fail the round.

Practice out loud. For system design, **drive the requirements yourself** (peak transactions/sec, regions, SLA, consistency needs) before drawing boxes. For architecture-leadership questions, anchor answers in **ADRs, trade-offs, and governance**, not just technology choices. For behavioral, use **STAR** (Situation, Task, Action, Result) with a quantified result.

---

## Round 1 · Recruiter / HR screen

**What they're testing:** Is your architecture experience real and at the right altitude (enterprise/portfolio vs single-project)? Are location, visa, notice period and comp aligned? Can you tell a crisp, senior-sounding story in 90 seconds?

**Q: Walk me through your background in 90 seconds, architect-level.**
- *Strong-answer skeleton:* 14 years → progression from developer to Technical Lead/Architect at Microsoft → own end-to-end architecture strategy, technology selection, delivery risk and cost across Fortune 500 + government engagements → GenAI/Azure specialization with production RAG and multi-agent systems → led/influenced teams from 6 to 40+ engineers → AZ-305 (Solutions Architect Expert) plus AI-102/AZ-204/AZ-104/AZ-400.
- **Key points:** Ownership language ("I own," not "I contributed to"), quantified scale (invoices/day, documents, vehicles, engineers), a named certification that maps directly to the JD (AZ-305).
- **Red flags:** Talking only about code you wrote; no mention of governance, stakeholders, or trade-offs; can't name a scale metric.

**Q: Why Emirates / why UAE?**
- *Strong-answer skeleton:* Already delivered a UAE Government data-sovereignty/governance engagement (Informatica → SQL + Purview, 2 government entities) — genuine regional exposure, not a cold pivot. Interest in aviation/logistics-scale distributed systems and Emirates' documented Azure-first cloud strategy. Openness to relocation already stated.
- **Key points:** Cite the actual UAE project; connect personal specialization (event-driven, AI platform design) to Emirates' stated direction; be concrete about relocation readiness (visa sponsorship required, timeline).
- **Red flags:** Generic "I love travel/aviation" with no technical hook; unclear on relocation logistics.

**Q: What's your target compensation and notice period?**
- *Strong-answer skeleton:* State a tax-free AED band researched for Solutions Architect level in Dubai, note current notice period, and ask about the relocation/housing package structure explicitly (a normal ask in UAE hiring).
- **Key points:** Research-backed number, not a guess; confidence discussing allowances (housing, schooling, flights) as part of total comp.
- **Red flags:** Refusing to give a number; anchoring only on home-country comp without adjusting for tax-free AED and relocation costs.

---

## Round 2 · Hiring manager (architecture scope & fit)

**What they're testing:** Can you operate at ART/portfolio scope, not just project scope? Do you understand escalation, governance, and how architecture intent gets enforced across teams you don't manage?

**Q: Describe the broadest architectural scope you've owned — how many teams, portfolios, or ARTs did your decisions touch?**
- *Strong-answer skeleton:* Reference the connected-vehicle platform (20M+ vehicles, ~2M telemetry msgs/min, EMEA/Russia/Americas/Asia) — architecture decisions there ripple across regional platform teams, not one project; SLA ownership (98–99%) is a portfolio-level commitment, not a team-level one. Pair with the UAE government marketplace work, where architecture had to satisfy *two* separate government entities' governance requirements simultaneously.
- **Key points:** Multi-team blast radius, SLA/NFR ownership at the platform level, working across regulatory/organizational boundaries.
- **Red flags:** Every example is single-team/single-project; no mention of a decision that had to be reconciled across conflicting stakeholder requirements.

**Q: How do you keep 5–10 teams building consistently with your architectural intent when you don't manage them?**
- *Strong-answer skeleton:* Written artifacts first (ADRs/RFCs), not verbal alignment; a lightweight architecture review gate at design time, not just at release; a small set of non-negotiable NFRs (security, observability, cost tagging) enforced via templates/golden paths rather than manual review of everything; escalation path defined *before* it's needed, so an architecture disagreement has a known resolution owner (Enterprise Architect, ART lead).
- **Key points:** Artifact-driven governance, golden paths over gatekeeping, pre-defined escalation.
- **Red flags:** "I just talk to people a lot" with no artifact or repeatable mechanism; describes pure command-and-control review.

**Q: Tell me about a time your architecture and another architect's architecture conflicted. What happened?**
- *Strong-answer skeleton:* STAR — name the actual trade-off (e.g., in-flight document processing without persistent storage vs. another team's audit-log requirement on the automotive invoice project), how it was resolved (a documented decision satisfying both: ephemeral processing + compliant audit trail via structured logging, not raw document storage), and what changed afterward (became the template pattern for future document-processing services).
- **Key points:** Specific technical conflict, a documented resolution, a durable artifact/pattern that outlived the original disagreement.
- **Red flags:** Vague "we talked it through"; no lasting artifact; blames the other architect.

---

## Round 3 · System design (aviation/logistics domain)

Five cases mapped to Emirates' actual domains. Always **gather requirements first**: peak transactions/sec, regions/latency budget, consistency needs (strong vs eventual), and failure mode tolerance (can we lose a booking? can we double-book a seat?).

### Case 1 — Reservation & inventory around a PSS you don't own (Altéa-style)
Design an orchestration layer that lets Emirates' own digital channels (app, web, contact centre) book and manage trips against a third-party PSS (Amadeus Altéa) without becoming tightly coupled to it.
- **Strong-answer skeleton:** Anti-corruption layer between Emirates channels and Altéa's EDIFACT/XML/NDC interfaces; own canonical booking domain model so a future PSS migration doesn't ripple into every channel; async event stream (booking created/changed/cancelled) fan-out to Skywards accrual, notifications, and analytics; idempotent writes back to Altéa (booking references, not raw retries) to avoid duplicate PNRs; cache read-heavy inventory/availability queries with a short TTL and a "confirm at PSS" step before payment capture.
- **Key points:** Anti-corruption layer, canonical domain model, idempotency at the PSS boundary, event-driven fan-out, cache-then-confirm for availability.
- **Follow-ups:** How do you handle a PSS outage during peak booking (e.g., a sale)? (Answer: read-through cache serves availability in degraded mode; writes queue with clear customer messaging; no silent double-booking.)
- **Red flags:** Proposes replacing Altéa; no idempotency story; treats PSS integration as "just call the API."

### Case 2 — Emirates Skywards accrual/redemption at scale
Design mileage accrual and redemption so a flight landing triggers accurate, timely miles credit for 30M+ members, including partner-airline mileage exchange.
- **Strong-answer skeleton:** Event-driven: flight-completion event → accrual calculation service (fare class, tier multiplier, partner rules) → ledger write (append-only, auditable) → member balance projection (read model) updated async; redemption is the harder path — needs strong consistency on the ledger (no double-spend of miles) via a transactional outbox or optimistic locking; partner-airline exchange goes through a settlement/reconciliation batch, not real-time, because partner systems aren't real-time.
- **Key points:** Append-only ledger + CQRS-style read projection, strong consistency specifically for redemption (not accrual), partner settlement as an async batch boundary.
- **Follow-ups:** A member disputes a missing accrual from 3 weeks ago — how do you investigate? (Ledger replay/audit trail, not "look at current balance.")
- **Red flags:** Single mutable balance column with no audit trail; treats accrual and redemption as symmetric consistency problems (they aren't).

### Case 3 — SkyCargo booking & ULD tracking (OneCargo-style)
Design a cargo booking + Unit Load Device (ULD, i.e. cargo container/pallet) tracking platform integrating airline systems, ground handling agents, and customs.
- **Strong-answer skeleton:** Domain-decompose into booking, warehouse/ground-handling, ULD tracking, revenue accounting, and customs/compliance as separate bounded contexts/services; ULD tracking is an IoT/event-ingestion problem (scan events at each handling point) feeding a real-time location/state model; customs/compliance is a regulated, audit-heavy service that should be isolated so a customs-system change doesn't require redeploying booking; use an industry data standard (IATA ONE Record) at integration boundaries so partner airlines/GHAs aren't forced onto Emirates-specific formats.
- **Key points:** Bounded contexts per cargo function, IoT-style event ingestion for ULD state, isolate regulated/compliance services, standards-based integration (ONE Record) at partner boundaries.
- **Follow-ups:** A ULD scan event arrives out of order (network delay at a remote airport) — how does your state model stay correct? (Event timestamp + last-writer-wins per ULD with reconciliation window, not naive "latest message wins.")
- **Red flags:** One monolithic cargo service; no answer for out-of-order events; ignores customs/compliance isolation.

### Case 4 — Irregular operations (IRROPS): rebooking at scale during a disruption
A sandstorm closes DXB for six hours. Design the system that rebooks/reaccommodates tens of thousands of affected passengers.
- **Strong-answer skeleton:** This is a burst-load, priority-queueing problem, not a steady-state one — expect 100x normal rebooking volume in minutes; auto-rebooking rules engine (tier priority, connection risk, fare rules) generates candidate itineraries against live inventory, falling back to human agents for edge cases; explicitly design for graceful degradation (batch processing + queue-depth-driven customer communication) rather than assuming real-time for every passenger; multi-region failover matters here because DXB itself may be degraded — decision support tooling should run out of a secondary region.
- **Key points:** Burst/priority-queue design, rules engine + human fallback, explicit degraded-mode UX, geographic failover for tooling (not just data).
- **Follow-ups:** How do you prevent the rebooking engine from creating new double-bookings while racing thousands of other rebookings for the same seats? (Optimistic concurrency + PSS as the single source of truth for seat state — ties back to Case 1's idempotency point.)
- **Red flags:** Assumes normal-load architecture scales linearly; no fallback to human agents; forgets tooling itself needs to survive the outage.

### Case 5 — Multi-region data residency & DR across UAE, EU and other jurisdictions
Emirates operates in the UAE (home jurisdiction), the EU (GDPR), and other markets with local data-residency rules. Design the data architecture.
- **Strong-answer skeleton:** Regional data residency isn't solved by "put everything in one Azure region" — it requires a data-classification model (what's PII, what's regulated, what's operational telemetry) with per-classification placement rules; UAE-resident systems for local regulatory data, EU-resident processing for GDPR subjects, with a clear cross-border transfer mechanism (standard contractual clauses / adequacy) only where genuinely needed; active-active or active-passive DR per region depending on RTO/RPO, not a single global DR story.
- **Key points:** Data classification drives placement (not a single global answer), explicit cross-border transfer justification, DR strategy varies by criticality tier.
- **Follow-ups:** How would you prove compliance to an auditor? (Data lineage/governance tooling — e.g., Microsoft Purview-class catalog — not a manual spreadsheet.)
- **Red flags:** "We'll just replicate everything everywhere"; no data classification step; unaware that GDPR and UAE PDPL have different obligations.

---

## Round 4 · Coding / technical deep-dive

**What they're testing:** Can you go from architecture diagram to real implementation trade-offs? Comfort in the JD's actual stack (Java, cloud-native, event-driven, APIs).

- **Idempotent event consumer.** Implement a Kafka/Service-Bus consumer that processes a "flight completed" event exactly-once from the accrual service's point of view, given at-least-once delivery. *(Answer: idempotency key = flight+passenger+event-type stored with a unique constraint, or an outbox pattern with a processed-events table.)*
- **API versioning across an ART.** Five teams consume your booking API. You need a breaking change. How do you version and migrate without a synchronized "big bang" release? *(Answer: additive-first, deprecation window with telemetry on old-version usage, contract testing, and a documented ADR for the sunset date.)*
- **Circuit breaker around a flaky partner system.** Ground handling agent APIs are unreliable at some airports. Implement/describe a circuit breaker + fallback for ULD status updates. *(Answer: breaker with half-open probing, fallback to last-known-state with a staleness flag surfaced to operators, not a silent stale read.)*
- **Concurrency control for seat/ULD assignment.** Two rebooking requests race for the same seat. Walk through optimistic vs pessimistic locking trade-offs and pick one with justification.
- **Data modelling for an append-only ledger** (Skywards miles) — schema sketch, and how you'd answer "what was my balance on March 3rd?" from it.

---

## Round 5 · Cloud & data architecture (Azure / hybrid)

**What they're testing:** Real Azure depth mapped to Emirates' hybrid-cloud reality, not "read the docs" answers.

- **AKS for a multi-tenant ART landscape.** How do you structure namespaces/clusters so five ARTs share infrastructure without stepping on each other's blast radius or cost allocation?
- **APIM as the enterprise integration front door.** How would you use Azure API Management to expose booking/cargo/loyalty APIs to partners (other airlines, GHAs, aggregators) with per-partner rate limiting, versioning, and NDC/ONE-Record-shaped payload validation?
- **Data Lake + governance.** Design the data platform feeding revenue management, crew optimization, and customer personalization from operational systems, with lineage and access control (Purview-class) satisfying multi-jurisdiction compliance.
- **Hybrid/multi-cloud reality.** Emirates runs Azure for core digital/AI and has cargo/loyalty workloads on AWS. How do you architect for "the right cloud per workload" without ending up with an unmanageable multi-cloud mess? *(Answer: a documented cloud-placement policy — data residency, existing vendor integration, workload shape — captured as an ADR, plus a shared platform layer for identity/observability/cost-tagging that's cloud-agnostic.)*
- **Well-Architected review.** Walk through applying the Azure Well-Architected Framework's five pillars (reliability, security, cost, operational excellence, performance) to the reservation-orchestration service from Case 1.

---

## Round 5B · Full-stack reference architecture (edge → database)

Walk end-to-end through a passenger-facing booking flow, naming the component, its purpose, the trade-off, a lower-cost alternative, and single- vs multi-region considerations at each layer:

1. **Edge/CDN** — Azure Front Door / CDN for static app assets and DDoS protection at the edge; trade-off: added latency hop for cache misses; lower-cost alt: App Gateway alone for smaller scale.
2. **API Gateway (APIM)** — auth, rate limiting, partner-facing contract versioning; trade-off: another hop + cost per call; multi-region: regional APIM instances with Front Door routing by geography.
3. **Booking orchestration service (AKS)** — the anti-corruption layer from Case 1; trade-off: added complexity vs calling Altéa directly; multi-region: active-active read, active-passive write (PSS is often the single write authority).
4. **Event backbone (Event Hubs/Kafka-class)** — fan-out to Skywards, notifications, analytics; trade-off: eventual consistency for downstream systems; lower-cost alt: Service Bus topics for lower-throughput domains.
5. **Ledger/OLTP store (Azure SQL/Cosmos DB)** — strong consistency for redemption; trade-off: Cosmos DB's tunable consistency needs a deliberate choice, not a default.
6. **Data Lake + Purview** — analytics/AI training data with lineage; trade-off: freshness lag vs operational stores.
7. **Identity (Entra ID / Workload Identity Federation)** — service-to-service auth without embedded secrets; trade-off: added IdP dependency; multi-region: token caching to survive a transient IdP blip.
8. **Observability (Azure Monitor / App Insights + a business-metric layer like Kusto/ADX)** — SLA/SLO tracking; trade-off: telemetry volume cost at 24/7 global scale.

---

## Real-world case studies — how airlines & partners actually solve this

- **Emirates + Microsoft Azure.** Public partnership for cloud migration of digital/AI workloads — AKS, Azure SQL/Cosmos DB, Azure AI/ML, Azure DevOps, Entra ID — framed around scalability, disaster recovery, and AI-driven personalization.
- **Emirates SkyCargo + IBS Software (OneCargo).** A ground-up, cloud-native replacement of a legacy cargo mainframe, decomposed into booking/warehouse/ULD/compliance microservices on standards-based (IATA ONE Record) integration — the reference pattern for "how do you modernize a regulated legacy system without a big-bang rewrite."
- **Amadeus Altéa (industry-wide PSS).** Multi-tenant SOA serving dozens of airlines including Emirates; the canonical example of "don't rebuild what a specialized vendor already does at scale — build the orchestration layer around it."
- **Other carriers.** Delta and Qantas have both published on modernizing IRROPS/rebooking with rules engines + ML-ranked itinerary suggestions; Lufthansa Group's API-first "NDC-first" distribution strategy mirrors the partner-integration pattern in Case 3. Use these as "here's how the industry solves this class of problem" evidence, not as claims about Emirates' internals.

---

## Round 6 · AI/ML & MLOps (aviation-specific)

**What they're testing:** Can you connect your production GenAI/RAG background to aviation's actual AI use cases?

- **Dynamic pricing / revenue management.** How would you architect a system that recommends fare adjustments in near-real-time based on demand signals, without a human-in-the-loop pricing error causing revenue loss? *(Guardrails: bounded adjustment ranges, human approval above a threshold, full audit trail — same governance instinct as your LLM cost-governance/model-governance experience.)*
- **Predictive maintenance.** Aircraft sensor telemetry → failure prediction. Map this to your connected-vehicle telemetry experience (2M msgs/min) — same ingestion/streaming shape, different label (maintenance event vs incident).
- **Document intelligence for cargo/customs.** Directly maps to your invoice-intelligence and procurement-RAG delivery — customs paperwork (AWBs, certificates) is a document-extraction + compliance-validation problem.
- **Customer-facing GenAI (chat/voice assistants for booking, disruption self-service).** RAG over policy/fare-rules documents with strict grounding (no hallucinated fare rules) — connect to your fine-tuning-vs-RAG trade-off experience.
- **MLOps governance at enterprise scale.** Model versioning, drift monitoring, rollback, and a clear owner for "who approves a pricing/rebooking model going to production" — this is exactly the ADR/governance muscle the JD is testing for, applied to ML models specifically.

---

## Round 7 · Architecture leadership (ARTs, runway, governance)

**What they're testing:** Direct evidence you can operate the SAFe/ART machinery named in the JD, not just system design skill.

- **Architecture runway.** How do you decide what goes on the runway 1–2 program increments ahead vs what's too speculative to build yet?
- **ADR discipline.** Walk through your process for writing an ADR — what triggers one, who reviews it, how deviations get tracked and eventually reconciled with Enterprise Architecture.
- **Technical debt as an enabler.** How do you get technical-debt remediation prioritized against feature work inside a Program Backlog when you don't own the backlog?
- **Vendor/PoC governance.** Describe running a PoC to validate a new technology (e.g., a new agent framework or vector store) and how you converted the result into a go/no-go architecture decision, not just a demo.
- **Cross-ART consistency without authority.** Two ARTs building complementary features chose incompatible integration patterns. How do you reconcile it after the fact?

---

## Round 8 · Behavioral / STAR

- Tell me about a time you delivered under significant ambiguity (mirrors the UAE government data-sovereignty engagement — unclear initial requirements across two entities).
- Describe a time your architectural recommendation was rejected by leadership. What did you do?
- Tell me about mentoring a team through a difficult technical transition (mirrors your AI Apprentice/Mastery programme and Python skilling work).
- Describe managing conflicting priorities across multiple concurrent client engagements (mirrors running Fortune 500 + government engagements in parallel).
- Tell me about a production incident you owned end-to-end, including the postmortem and what changed afterward (mirrors your SLA/telemetry ownership on the connected-vehicle platform).

---

## Round 9 · Executive / bar-raiser

**What they're testing:** Strategic judgment — build vs. buy, cost discipline, and a point of view on where aviation-tech is heading.

- If you had 90 days as the new Solutions Architect for a portfolio, what would your first three moves be?
- Build vs. buy: when would you recommend Emirates build a capability in-house (e.g., a GenAI customer-service layer) vs. buy/extend a vendor platform (e.g., Altéa, OneCargo)?
- How do you defend an architecture decision's cost to a CFO who only sees the invoice, not the risk it avoided?
- Where do you think generative AI and agentic systems genuinely change airline operations in the next 3 years, versus where it's hype?
- How would you structure architecture governance so it accelerates delivery instead of becoming a bottleneck for five ARTs?

---

## Technology & skills map — JD stack ↔ Emirates landscape ↔ your resume

| JD / Emirates area | What it is | Your resume evidence | Gap to address in prep |
|---|---|---|---|
| SAFe (ARTs, architecture runway) | Scaled Agile portfolio delivery | Led cross-functional teams (6–10, and 40+ on connected-vehicle); no explicit "SAFe/ART" title | Learn SAFe vocabulary precisely (ART, PI, runway, enabler) so you can map your delivery experience onto it fluently |
| ADRs / architecture governance | Documented, reviewable architecture decisions | Well-Architected reviews, NFR ownership (implicit governance) | Prepare 2–3 concrete "here's an ADR I'd have written" examples from past projects |
| TOGAF / ArchiMate / C4 / UML | EA modelling frameworks and notations | Not explicitly listed | Skim TOGAF ADM phases and C4 model levels (context/container/component/code) — enough to discuss fluently, not become certified |
| Azure cloud-native (AKS, APIM, Event-driven) | Emirates' primary cloud platform | Azure Functions, AKS, Service Bus, Logic Apps, APIM-adjacent integration work | Strong — lead with this |
| Amadeus Altéa / PSS integration | Airline reservation backbone | No direct PSS experience | Frame as "anti-corruption layer around a vendor system" — a pattern you *have* done (Purview-integrated migration, procurement platform around existing ERP-like systems) |
| SkyCargo / OneCargo-style logistics | Cargo/logistics microservices | Connected-vehicle platform (20M+ vehicles), IoT-style telemetry | Direct transferable pattern — emphasize the telemetry/event-ingestion parallel |
| GenAI/RAG/agents | AI platform design | Deep, hands-on production delivery (Azure AI Foundry, multi-agent, RAG) | Strongest differentiator — anchor Round 6 and Round 9 here |
| Enterprise governance (security, cost, observability) | Cross-portfolio standards | SLA ownership, cost optimisation, Purview-based governance | Strong — cite the UAE government and CPG procurement engagements |
| Regulatory (UAE PDPL, GDPR, aviation security) | Multi-jurisdiction compliance | Data-sovereignty/governance delivery in UAE government | Directly relevant — your strongest regional proof point |

---

## Technical question bank (rapid-fire, by topic)

**PSS / reservations:** What's the difference between Reservation, Inventory and Departure Control in a PSS? · Why is an anti-corruption layer the right pattern around a vendor PSS? · How do you avoid double-booking when the PSS is the source of truth but you cache availability? · What is IATA NDC and why does it matter for distribution? · How would you version a booking API consumed by five teams?

**Loyalty / event-driven:** Why is redemption a stronger-consistency problem than accrual? · How do you design an auditable, append-only ledger? · What's the difference between at-least-once and exactly-once processing, and how do you get exactly-once semantics on top of at-least-once delivery? · When would you choose Kafka-class streaming vs a simple queue for accrual events?

**Cargo / logistics:** How do you handle out-of-order IoT/scan events in a state machine? · Why decompose cargo into booking/warehouse/ULD/compliance as separate services? · What does IATA ONE Record standardize and why does it matter at partner boundaries?

**Cloud / Azure:** AKS namespace-per-ART vs cluster-per-ART — trade-offs? · How does APIM handle per-partner rate limiting and contract versioning? · When do you choose Cosmos DB over Azure SQL, and what does "tunable consistency" actually mean operationally? · What does a Well-Architected review actually produce as an artifact?

**Governance / SAFe:** What triggers writing an ADR vs just making the call? · What's on an architecture runway, and how far ahead should it look? · How do you track and eventually resolve a documented "deviation" from architecture standards? · What's the difference between an Enterprise Architect and a Solution Architect's remit?

**AI/ML for aviation:** What guardrails would you put around an ML-driven dynamic pricing engine? · How is aircraft predictive maintenance architecturally similar to connected-vehicle telemetry? · How do you keep a customer-facing fare-rules chatbot from hallucinating policy details?

---

## Deeper / staff-level questions

- Design a zero-downtime migration of the booking orchestration layer from one PSS integration pattern to another, with live traffic and no double-bookings during cutover.
- How would you design chargeback-accurate cost allocation for shared AKS/APIM infrastructure used by five ARTs with very different traffic profiles?
- Two ARTs need the same capability (e.g., document intelligence for both cargo customs docs and passenger travel-document verification) — do you build a shared platform service or let each build their own? Defend the trade-off.
- Design a multi-region active-active architecture for the booking orchestration layer where the underlying PSS itself is single-write-region — what does "active-active" even mean here, and where's the real bottleneck?
- How would you retrofit architecture governance (ADRs, runway, review gates) onto five ARTs that have been shipping without any for two years, without grinding delivery to a halt?
- Walk through a "chaos day" scenario: DXB is unreachable, the PSS is degraded, and your booking orchestration layer's regional failover partially works. What's your incident-command sequence?

---

## Scenario-based questions (situational & troubleshooting)

1. A partner airline's mileage-exchange API silently starts returning stale data. How do you detect this, and what's your immediate mitigation?
2. Booking volume spikes 50x in 10 minutes (a flash sale). Your orchestration layer's downstream PSS calls are rate-limited by the vendor. What do you do in the first hour?
3. An auditor asks you to prove that EU passenger data never left EU-classified storage for the last 12 months. What evidence do you produce, and how did your architecture make that possible?
4. A newly onboarded ART starts building a service that duplicates an existing platform capability because they didn't know it existed. How do you prevent this going forward without adding bureaucracy?
5. Your Well-Architected review flags a cost issue in a service that's also mid-way through a critical PI (Program Increment). Do you block the release?
6. A GenAI-based customer service assistant gives a passenger an incorrect refund-eligibility answer. Walk through your incident response and the architectural fix.
7. Cargo customs integration goes down at a regional hub, blocking shipments. Your architecture has no fallback for this partner. What's the immediate workaround, and what ADR do you write afterward?
8. A CFO asks why the cloud bill doubled after a "successful" migration. How do you investigate and what governance was missing?

---

## Sources & further reading

- [Emirates Group Careers — Information Technology](https://www.emiratesgroupcareers.com/information-technology/)
- [Solutions Architect – SkyCargo, Emirates Group (public posting)](https://www.bayt.com/en/uae/jobs/solutions-architect-skycargo-74828070/)
- [Amadeus Altéa — Passenger Service System overview](https://amadeus.com/en/portfolio/altea)
- [IBS Software — Emirates SkyCargo OneCargo](https://ibssoftware.com/newsroom/press-releases/oneview/remodelling-skycargo-digital-architecture)
- [Microsoft Azure — Well-Architected Framework](https://learn.microsoft.com/azure/well-architected/)
- [Microsoft Learn — Azure Solutions Architect Expert (AZ-305)](https://learn.microsoft.com/credentials/certifications/azure-solutions-architect/)
- [The Open Group — TOGAF Standard](https://www.opengroup.org/togaf)
- [ArchiMate 3.2 Specification](https://pubs.opengroup.org/architecture/archimate3-doc/)
- [Scaled Agile Framework — Architecture Runway](https://scaledagileframework.com/architectural-runway/)
- [IATA — New Distribution Capability (NDC)](https://www.iata.org/en/programs/airline-distribution/ndc/)
- [IATA — ONE Record data standard](https://www.iata.org/en/programs/cargo/e/one-record/)
