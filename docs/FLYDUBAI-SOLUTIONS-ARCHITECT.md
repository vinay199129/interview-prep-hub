# flydubai — Solutions Architect Interview Guide

A complete, round-by-round preparation guide for a **Solutions Architect** role at **flydubai** (Dubai, UAE) — the Dubai Government-owned **low-cost carrier (LCC)** now deeply partnered with Emirates. Every round below contains **full, worked, architect-level answers** — not one-line skeletons — so you can read them aloud in the room and defend the trade-offs.

> **Scope note.** This guide reverse-engineers a realistic interview loop and technical landscape from the public JD (large-scale distributed systems, microservices, event-driven architecture, cloud-native, SAFe/agile, well-architected framework) plus flydubai's publicly reported technology choices (**Sabre SabreSonic** PSS, **Microsoft Azure** cloud-first, **OPEN** rewards now unified into **Emirates Skywards**, the Emirates–flydubai codeshare partnership). flydubai does not publish its internal architecture, so specifics below are **industry-standard airline/LCC patterns you should be able to defend**, not confirmed internal designs. Treat brand/vendor facts as public context, not insider knowledge.

---

## Context: flydubai & the low-cost-carrier tech landscape

**Who flydubai is.** A **low-cost carrier** launched in 2009, owned by the Investment Corporation of Dubai and chaired by Sheikh Ahmed bin Saeed Al Maktoum (the same chairman as Emirates). It runs a **single-fleet-type** Boeing 737 operation (737-800 and 737 MAX 8/9) across a 130+ destination point-to-point and DXB-connecting network. The LCC model shapes IT: **ancillary revenue** (unbundled fares, seats, bags, meals) is a first-class product, **cost-per-transaction** is an architectural constraint, and **high aircraft utilisation** makes disruption tooling business-critical.

**Why this matters for architecture.** An LCC is not "a smaller full-service airline." Sell the seat cheap, monetise everything around it — so the **shopping/booking/merchandising path** and the **dynamic-pricing / ancillary engine** are the crown jewels, and every millisecond and every dirham of run-cost is scrutinised. You must reason about **unbundled fare construction, ancillary catalog/offer management, conversion-optimised booking flows**, and cloud spend as a P&L line — not just seat inventory.

**The platform landscape you'll be expected to reason about:**

1. **PSS — Sabre SabreSonic.** flydubai publicly moved onto **Sabre's SabreSonic** PSS (from an earlier legacy LCC system) and into the **GDS**, so agents/corporates can sell it. SabreSonic provides reservation, inventory and departure control plus merchandising/ancillary capabilities, exposed via Sabre REST/SOAP APIs and IATA **NDC**. flydubai-built systems are **orchestrators and channels around Sabre** (anti-corruption layer), not a bespoke reservation core.
2. **Digital channels & merchandising.** Web/mobile booking, self-service (check-in, changes, disruption re-accommodation), OTA/GDS distribution — API-fronted, with an **offer/order** mindset (IATA Offers & Orders) where ancillaries are merchandised beside the fare.
3. **OPEN rewards → Emirates Skywards.** flydubai's own loyalty program, **OPEN**, is deliberately simple and cash-like (earn ~1 point per USD, no blackout dates, redeem on any flight; points forfeited after 24 months of inactivity). Under the **Emirates–flydubai partnership**, **Emirates Skywards** is now the unified loyalty currency across both carriers. This makes **loyalty integration between two independently-owned platforms** a live, flydubai-specific architecture problem.
4. **Emirates–flydubai partnership integration.** Codeshare, aligned schedules, **through-check-in and baggage transfer** at DXB (flydubai at T2/T3, Emirates at T3), single-journey marketing. The integration surface — schedules, availability, interline PNR, baggage, loyalty and disruption **across two different PSS platforms (Sabre + Amadeus Altéa)** — is the most distinctive system-design theme at flydubai.
5. **Cloud — Azure cloud-first.** flydubai has publicly pursued a **Microsoft Azure** cloud-first strategy (plus Microsoft 365), a cleaner Azure-native landscape than Emirates' Azure+AWS hybrid. Expect Azure-native answers (AKS/Container Apps, App Service/Functions, API Management, Azure SQL/Cosmos DB, Event Hubs/Service Bus, Entra ID, Azure Monitor) with relentless **cost-per-transaction** focus.
6. **Governance & regulation.** UAE data-residency and TDRA cloud policy, **PCI-DSS** (payments are central to a direct-sell LCC), IATA security, and GDPR-equivalent handling for EU passengers. Agile/SAFe-style delivery and a "well-architected" bar are expected, but leaner and more pragmatic than a mega-carrier's.

**Why a Microsoft Azure/GenAI architect profile fits.** flydubai's Azure-first, cost-conscious, digitally-merchandised model maps onto an Azure Solutions Architect background: cloud-native platforms, event-driven integration, production RAG/agentic delivery for self-service and operations, Well-Architected cost/reliability reviews, and multi-team leadership — with a bonus if you talk **ancillary revenue, dynamic-pricing guardrails and cross-carrier integration** fluently.

**UAE hiring loop context.** flydubai architect loops typically run **online application (sometimes an aptitude/technical screen) → recruiter/HR screen (occasionally a recorded video intro) → 1–2 technical/architecture rounds (scenario + case study) → managerial/behavioural → final leadership round**, over **3–6 weeks**. Comp is **tax-free AED**; expect relocation, visa sponsorship and allowances (housing, schooling, flights) in the conversation — this repo's résumé already says "Open to relocation to the UAE," a strong opener.

---

## How to use this guide

Each round has the same shape: **What they're testing**, then **Questions** with a **full worked answer**, the **key points** to land, and the **red flags** that fail the round. System-design cases follow a fixed skeleton you should replicate live: **Requirements & scale → Architecture (with a diagram) → Data & consistency → Scale & capacity → Failure modes → Trade-offs & alternatives → Follow-ups**.

Practice out loud. For system design, **drive the requirements yourself** (peak TPS, regions, latency budget, consistency, RTO/RPO, and *cost per transaction* — this is an LCC) before drawing boxes. For leadership questions, anchor in **trade-offs, ADRs and governance**. For behavioural, use **STAR** with a quantified result.

---

## Round 1 · Recruiter / HR screen

**What they're testing:** Is your architecture experience real and at the right altitude (enterprise/platform vs single-project)? Are location, visa, notice period and comp aligned? Can you tell a crisp, senior story in 90 seconds?

**Q: Walk me through your background in 90 seconds, architect-level.**

> "I'm an AI & cloud architect with 14 years' experience, currently a Technical Lead/Architect at Microsoft. I own end-to-end solution architecture — technology selection, NFRs, delivery risk and cost — for Fortune 500 and government clients. My deepest scale work is a connected-vehicle platform serving 20M+ vehicles at ~2M telemetry messages a minute across four regions, where I owned a 98–99% SLA, the event-ingestion architecture and incident patterns. I also delivered a UAE-government data-sovereignty programme, migrating regulated data into governed SQL with Microsoft Purview lineage for two government entities. On the AI side I've shipped production RAG and multi-agent systems on Azure AI Foundry with explicit cost and model governance. I'm AZ-305 (Solutions Architect Expert) plus AI-102, AZ-204, AZ-104 and AZ-400. What draws me to flydubai specifically is the LCC problem shape — merchandising, ancillary revenue and cost-per-transaction discipline — layered on an Azure-first stack, which is exactly where I operate."

- **Key points:** ownership language ("I own"), quantified scale, an AZ-305 hook that maps to the JD, and at least one **cost-optimisation** proof point (LCCs care).
- **Red flags:** only talking about code; no governance/stakeholders/cost; can't name a scale metric.

**Q: Why flydubai / why an LCC?**

> "Two reasons. First, genuine regional fit — I've already delivered a UAE-government data-sovereignty engagement, so I understand PDPL, residency and governed-data expectations here, not as theory. Second, the LCC engineering problem is genuinely interesting to me: an LCC lives or dies on ancillary attach-rate, conversion and cost-per-seat, so the booking and offer path is the commercial core, not a back-office system. flydubai's Azure-first stack and the distinctive Emirates–flydubai integration — making two carriers on two different PSS feel like one journey — are exactly the kind of problems I want to own. And I've already stated I'm open to relocating to the UAE."

- **Key points:** cite the real UAE project; show you understand an LCC is a *merchandising and cost* business; be concrete on relocation (visa sponsorship required, timeline).
- **Red flags:** generic "I love aviation"; treating flydubai as "a small Emirates"; vague on relocation.

**Q: Target compensation and notice period?**

> "My notice is [X weeks]. On comp, I'm benchmarking against Solutions Architect roles in Dubai on a tax-free AED total-package basis, so I'd want to look at base plus the housing, schooling and flight allowances together rather than just base — I'm targeting a total package in the [researched AED band]. Could you share how the relocation and housing package is structured for this level?"

- **Key points:** a research-backed number; comfort discussing allowances as part of total comp; you understand tax-free changes the maths.
- **Red flags:** refusing a number; anchoring only on home-country base without adjusting for tax-free AED and relocation.

---

## Round 2 · Hiring manager (architecture scope & fit)

**What they're testing:** Can you operate at platform scope, not just project scope? Do you understand escalation, governance, and enforcing architectural intent across teams you don't manage — in a lean, cost-sensitive org?

**Q: Describe the broadest architectural scope you've owned — how many teams and platforms did your decisions touch?**

> "The connected-vehicle platform is my clearest example of platform-scope, not project-scope, ownership. It served 20M+ vehicles at ~2M messages/minute across EMEA, Russia, the Americas and Asia. My architecture decisions there — the ingestion/streaming topology, partitioning strategy, back-pressure handling and the regional failover model — weren't scoped to one team; they set constraints that every regional platform team had to build within, and the 98–99% SLA was a platform-level commitment I owned, not a single team's. My second example is the UAE-government marketplace, where the architecture had to satisfy **two** separate government entities' governance and residency requirements simultaneously — so the hard part wasn't the tech, it was reconciling conflicting stakeholder constraints into one design that both would accept. Both are the kind of 'your decision ripples across many teams and you own the NFRs' scope this role needs."

- **Key points:** multi-team blast radius, platform-level SLA/NFR ownership, reconciling conflicting stakeholders.
- **Red flags:** every example is single-team/single-project; no decision reconciled across conflicting requirements.

**Q: How do you keep several teams building to your architectural intent when you don't manage them — without heavyweight process a lean org can't afford?**

> "Three mechanisms, in order. First, **write it down** — architectural intent lives in ADRs and lightweight RFCs, not in my head or in meetings, so a team building six weeks later has a durable, linkable decision with its context and trade-offs. Second, **golden paths over gatekeeping** — I encode the non-negotiables (identity via Entra, structured logging/observability, cost tagging, secrets handling) into templates, pipeline checks and reference implementations, so the *easy* path is the *compliant* path and I'm not manually reviewing every PR. Third, a **design-time review gate, not a release-time one** — a 30-minute architecture review when a design is still cheap to change, plus a pre-agreed escalation owner (the Enterprise Architect or the ART lead) so a genuine disagreement has a known, fast resolution path instead of stalling delivery. For a lean LCC the key is that governance has to *accelerate* delivery — templates and automated checks do that; a heavyweight review board doesn't."

- **Key points:** artifact-driven governance, golden paths, design-time gate, pre-defined escalation, cost-tagging as a first-class NFR.
- **Red flags:** "I talk to people a lot" with no repeatable mechanism; a command-and-control board a lean org can't sustain.

**Q: Tell me about a time your architecture and another architect's conflicted.**

> "On the automotive invoice-intelligence platform I designed **in-flight document processing with no persistent storage** — documents were processed in memory and discarded — to meet a strict security/compliance bar. Another architect on the audit side needed a durable audit trail of every document processed, which looked like a direct contradiction with 'don't store the document.' We resolved it by separating the two concerns: we never persisted the raw document, but we persisted a **structured, hashed audit record** (document hash, extracted fields, decision, timestamps, actor) — enough to prove what happened and reconstruct the decision without retaining sensitive content. I wrote it up as an ADR, and it became the **template pattern** for every subsequent document-processing service. The lasting value wasn't winning the argument; it was that the resolution outlived the disagreement as a reusable standard."

- **Key points:** a specific technical conflict, a documented resolution that satisfied both, a durable artifact/pattern.
- **Red flags:** vague "we talked it through"; no lasting artifact; blaming the other architect.

---

## Round 3 · System design (LCC / aviation domain)

Six worked cases mapped to flydubai's real domains. In each, notice the discipline: **state requirements with numbers first, draw the components, name where consistency is strong vs eventual, do the capacity math, then failure modes and trade-offs.** Do this live — the panel is scoring your *process* as much as your answer.

### Case 1 — Booking & ancillary merchandising around SabreSonic (a PSS you don't own)

*Design the orchestration/merchandising layer that lets flydubai's channels (app, web, contact centre) sell fares **plus ancillaries** against Sabre SabreSonic without tightly coupling to it.*

**Requirements & scale.** Assume ~1,000–3,000 availability searches/sec at peak (shopping) but only ~10–50 bookings/sec (look-to-book on an LCC is often 100:1 to 1000:1); a **price-accuracy** hard requirement (never charge a stale ancillary price); payment involved, so PCI-DSS scope; p95 search latency budget ~300–500 ms; booking must be **idempotent** (a double-submit or retry must never create two PNRs). Cost target: minimise paid Sabre API calls, which dominate marginal cost.

**Architecture.**
```
                 ┌──────────────┐
  web / app  ───▶│ Front Door/CDN│───▶ static assets, WAF, DDoS
                 └──────┬───────┘
                        ▼
                 ┌──────────────┐   authN/Z, rate-limit, versioning
                 │   APIM (GW)  │
                 └──────┬───────┘
                        ▼
        ┌───────────────────────────────┐
        │  Shopping/Offer service (AKS) │◀── competitor & demand signals
        │  - fare + ancillary bundling  │
        │  - Offer cache (Redis)        │
        └───────┬───────────────┬───────┘
                │ (read)        │ (write, at order time only)
                ▼               ▼
        ┌──────────────┐  ┌───────────────────────┐
        │ Availability │  │ Booking/Order service │──▶ Payments (PCI, tokenised)
        │ cache (Redis)│  │  - idempotency store   │
        └──────┬───────┘  │  - Sabre ACL           │
               │          └───────────┬───────────┘
               │  cache-miss / confirm │  order create/modify
               └──────────────┬────────┘
                              ▼
                    ┌───────────────────┐
                    │  Sabre SabreSonic │  (RES/INV/DCS, NDC)  ◀ system of record
                    └─────────┬─────────┘
                              ▼ order events (outbox → Event Hubs)
        ┌────────────┬──────────────┬─────────────┐
        ▼            ▼              ▼             ▼
   Loyalty     Notifications   Analytics/DL   Ancillary fulfilment
```

**Anti-corruption layer (ACL).** All Sabre calls go through a single ACL that translates Sabre's models to a **canonical offer/order domain model**. Channels depend on the canonical model, so a Sabre change (or a future PSS swap) is absorbed in one place instead of rippling into every app.

**Data & consistency.** Sabre is the **single source of truth** for inventory and PNRs — I do **not** hold a competing booking database. I keep two short-TTL read caches (availability, ancillary catalog+price) to serve the read-heavy shopping traffic cheaply, and I apply a **cache-then-confirm** rule: I can *show* a cached price, but I re-validate price and availability **at order creation, before payment capture**, so a stale cache can never charge the wrong amount. Booking writes carry an **idempotency key** (channel + client-generated request id) persisted with a unique constraint, so retries/double-submits collapse to one PNR.

**Scale & capacity.** At 2,000 searches/sec with a 90% cache hit rate, only ~200 calls/sec reach Sabre — an order-of-magnitude cost saving that is itself an architectural justification. Redis sized for the working set of routes×dates (tens of GB); TTL tuned per volatility (availability seconds-to-minutes, catalog hours). Booking at 50/sec is trivial for the OLTP store.

**Failure modes.** If **Sabre is degraded**: shopping continues in a clearly-labelled degraded mode from cache (read-through with staleness flag); new bookings **queue with honest customer messaging** and are reconciled when Sabre recovers — never a silent success. Circuit-breaker around the ACL (half-open probing) so we shed load instead of hammering a sick dependency. Payments stay isolated in PCI scope; a payment success with a failed PSS write becomes a **compensating action** (saga) that either completes the booking on recovery or refunds — never take money without a booking.

**Trade-offs & alternatives.** (a) *Own a full booking DB and sync with Sabre* — rejected: you inherit a two-master consistency nightmare and duplicate the vendor's core competency. (b) *Call Sabre directly from each channel, no ACL* — rejected: every channel couples to EDIFACT/NDC quirks and a PSS change is a fleet-wide rewrite. (c) *Cache nothing, always hit Sabre* — rejected on **cost and latency** for an LCC. The chosen design isolates the vendor, protects price integrity, and cuts marginal cost.

**Follow-ups.**
- *Keep ancillary conversion high without over-calling the PSS?* Cache catalog + price locally with a short TTL; only confirm price/availability at order creation. Pre-warm caches for hot routes ahead of a sale.
- *Prevent double PNRs on retry?* Idempotency key with a unique constraint at the booking store, plus idempotent order-create semantics at the Sabre boundary (reference the prior request, don't blindly retry).

**Red flags:** proposing to replace Sabre; treating ancillaries as an afterthought; no idempotency; "just call the API" for a money-bearing flow; caching prices with no confirm-before-charge boundary.

### Case 2 — Loyalty across two programs: OPEN and Emirates Skywards

*A flydubai flight must earn the correct **Emirates Skywards** Miles/Tier Points (the unified currency) while respecting flydubai's OPEN mechanics and Emirates' rules — across two independently-owned platforms.*

**Requirements & scale.** ~30M shared Skywards members; accrual events on every completed segment (flydubai does tens of thousands of segments/day); **redemption must never double-spend** (strong consistency); accrual can be **eventually consistent** (miles appearing seconds/minutes later is fine); cross-program settlement must be **auditable** for money-movement between two companies.

**Architecture.**
```
 flight completed (DCS) ──▶ [outbox] ──▶ Event Hubs
                                           │
                                           ▼
                              ┌───────────────────────┐
                              │ Accrual service        │  fare class × tier ×
                              │  (rules engine)        │  cross-carrier rules
                              └──────────┬─────────────┘
                                         ▼ append
                              ┌───────────────────────┐        ┌───────────────┐
                              │ Miles LEDGER           │──CQRS─▶│ Balance read   │
                              │ (append-only, audited) │  proj  │ model (fast)   │
                              └──────────┬─────────────┘        └───────────────┘
                                         ▼ (cross-program)
                              ┌───────────────────────┐   ACL   ┌───────────────┐
                              │ Settlement/Reconcile   │◀──────▶│ Skywards       │
                              │ (near-RT earn, batch $)│         │ (partner sys)  │
                              └───────────────────────┘         └───────────────┘
 redemption ──▶ Redemption service ──▶ ledger (strong consistency, optimistic lock)
```

**Data & consistency.** The **ledger is append-only** — every accrual/redemption/adjustment is an immutable entry; the member **balance is a projection** (CQRS), rebuildable by replay. **Accrual** is eventually consistent (fire the earn event, update the projection async). **Redemption** needs **strong consistency to prevent double-spend**: I take a conditional write against the ledger (optimistic concurrency on the member's version, or a serializable transaction) so two concurrent redemptions can't both succeed on the same balance. Because Skywards is a **partner-owned** program, cross-program earning fires near-real-time but the authoritative **money settlement is a batch reconciliation** — I never assume the two systems share a synchronous transaction.

**Scale & capacity.** Ledger grows unbounded, so I partition by member id and roll old entries to cheaper storage with periodic **balance snapshots** so "current balance" doesn't require replaying years of history. "What was my balance on 3 March?" = snapshot + entries since — cheap and provable.

**Failure modes.** If the Skywards ACL is down, earning events **buffer** (Event Hubs retention) and reconcile on recovery; members see a pending state, not a lost mile. A poison earning event goes to a **dead-letter queue** with a correlation id for investigation. Redemption fails **closed** (deny) rather than risk double-spend.

**Trade-offs & alternatives.** (a) *Single mutable balance column* — rejected: no audit trail, impossible to answer disputes or prove settlement between two companies. (b) *Real-time synchronous cross-program calls on every earn* — rejected: couples flydubai's availability to a partner's uptime and creates a distributed transaction across company boundaries. (c) *Same strong consistency for accrual and redemption* — rejected: accrual doesn't need it and paying that cost hurts throughput.

**Follow-ups.**
- *A flydubai flight didn't credit Skywards Miles — investigate across two systems?* Correlation id on the earn event → check outbox/Event Hubs delivery → ledger entry present? → reconciliation report between the two programs. Never "look at the current balance."
- *Member disputes a redemption from 3 weeks ago?* Ledger replay/audit trail shows the exact entries; the balance is derived, so the history is the truth.

**Red flags:** mutable balance with no ledger; assuming both programs share one DB; treating accrual and redemption as the same consistency problem.

### Case 3 — Emirates–flydubai codeshare / interline integration (the signature flydubai case)

*Make an Emirates + flydubai itinerary feel like **one journey**: aligned schedules/availability, linked PNR, **through-check-in and baggage transfer at DXB**, coordinated disruption — spanning **two different PSS** (Sabre for flydubai, Amadeus Altéa for Emirates).*

**Requirements & scale.** Two systems of record that will never merge; a passenger expects one booking, one bag-drop, one set of connections; DXB is the hub where bags and passengers transfer between T2/T3; disruption on one carrier's leg must trigger coordinated re-accommodation; interline settlement (who owes whom) must be auditable.

**Architecture.**
```
        ┌───────────────────────────────────────────┐
        │   Interline/Codeshare Orchestration svc    │
        │   - canonical cross-carrier ITINERARY model│
        │   - per-segment ownership map              │
        └───────┬───────────────────────────┬────────┘
             ACL│ (EDIFACT/NDC, interline)   │ACL
                ▼                            ▼
        ┌──────────────┐             ┌──────────────┐
        │ flydubai PSS │             │ Emirates PSS │
        │ (SabreSonic) │             │ (Amadeus     │
        │  RES/INV/DCS │             │  Altéa)      │
        └──────┬───────┘             └──────┬───────┘
               │ bag-tag/scan events        │
               ▼                            ▼
        ┌───────────────────────────────────────────┐
        │  Baggage reconciliation (cross-DCS events) │
        │  bag state machine + mishandled fallback   │
        └───────────────────────────────────────────┘
```

**Data & consistency.** Each PSS stays authoritative for **its own segment**; the orchestration layer owns a **canonical itinerary** that references both segments and records **which carrier owns which leg** (so rebooking authority is never ambiguous). There is **no shared booking database** — consistency is achieved by **exchanging standards-based interline messages** (IATA EDIFACT/NDC, interline e-ticketing) through per-carrier ACLs, plus an eventual-consistency reconciliation loop. Baggage transfer is modelled as a **cross-DCS event stream + state machine**: bag-tag/scan events from both DCS systems drive a per-bag state (checked → loaded → transferred → delivered), with a **mishandled-bag fallback** when the two systems disagree.

**Failure modes.** If one carrier's PSS is down for maintenance, the other carrier can still sell/service its own leg because the canonical itinerary and ACL decouple them; the down segment shows a pending state and reconciles on recovery. On a **misconnect** (flydubai inbound late → missed Emirates connection): the **segment-owning carrier owns its rebooking**, the orchestration layer coordinates and keeps the canonical itinerary authoritative, and neither PSS is double-booked because each write goes through its own idempotent ACL.

**Trade-offs & alternatives.** (a) *One shared PSS* — impossible/undesirable; two companies, two vendors, two roadmaps. (b) *Point-to-point integrations between every app and both PSS* — rejected: N×2 coupling and every downstream system special-cases each PSS. (c) *Batch-only reconciliation* — rejected for the passenger-facing path (too slow for connections); batch is fine for **settlement** but the itinerary/baggage path needs event-time coordination.

**Follow-ups.**
- *Which system owns the rebooking on a misconnect, and how do both PSS stay consistent?* The carrier that owns the affected segment; orchestration coordinates; canonical itinerary stays authoritative; idempotent ACL writes prevent double-booking.
- *Baggage state disagreement between the two DCS?* Last-writer-wins per bag within a reconciliation window, plus a mishandled-bag exception workflow — not "latest message wins" blindly.

**Red flags:** assuming a shared PSS; ignoring that baggage/DCS are per-carrier; no canonical model, so everything special-cases each PSS.

### Case 4 — Irregular operations (IRROPS) for a point-to-point LCC network

*A sandstorm closes DXB for six hours. Re-accommodate affected passengers across a mostly point-to-point Boeing 737 network with high utilisation and thin slack.*

**Requirements & scale.** Expect **50–100× normal rebooking volume in minutes**; a hard need to avoid double-selling seats while thousands race; passengers have **paid ancillaries** (seats/bags) that must be re-fulfilled; crew/aircraft slack is thin on a single-fleet LCC, so options are constrained; the tooling itself must survive a degraded DXB.

**Architecture & approach.** This is a **burst-load, priority-queue** problem, not steady-state. Affected passengers enter a **priority queue** (tier, connection risk, fare rules, special-needs). A **rules-engine + optimiser** generates candidate itineraries against **live Sabre inventory**, honouring crew/aircraft constraints surfaced from ops systems, and **re-fulfils paid ancillaries** on the new itinerary. High-confidence matches auto-rebook; ambiguous/edge cases **fall back to human agents**. Customer comms are **queue-depth-driven** (batch notifications with realistic ETAs) rather than pretending every passenger gets instant real-time handling. **Decision-support tooling runs from a secondary Azure region** because DXB infra may itself be degraded.

**Consistency.** Seat assignment uses **optimistic concurrency with Sabre as the single source of truth** — the rebooking engine proposes, Sabre confirms; a lost race retries against fresh inventory. No local seat-map "truth" that can drift.

**Failure modes.** If the optimiser is overwhelmed, degrade to **rules-only** auto-rebooking plus agent queues (graceful degradation), never a hard stop. If comms provider throttles, batch and back off with backpressure.

**Trade-offs.** (a) *Assume normal-load architecture scales linearly* — rejected: 100× bursts need queueing/backpressure, not just autoscale. (b) *Fully automated, no humans* — rejected: edge cases and duty-of-care need agents. (c) *Real-time individual processing for all* — rejected: batch + honest ETAs is more reliable under burst.

**Follow-ups.** *Stop the engine double-selling seats?* Optimistic concurrency + Sabre as source of truth (ties to Case 1's idempotency). *Passenger already paid for seat/bag?* Ancillary re-fulfilment is part of the rebooking transaction, with automatic refund if it can't be honoured.

**Red flags:** linear-scale assumption; no human fallback; forgetting paid ancillaries; forgetting the tooling must survive the outage.

### Case 5 — Dynamic pricing & ancillary revenue optimisation (the commercial core)

*Recommend fare and ancillary price adjustments in near-real-time from demand signals — safely.*

**Requirements & scale.** Inputs: searches, load factor, time-to-departure, competitor fares, historical demand. Output: a bounded price recommendation per fare/ancillary per segment. Hard constraint: **a model error must never publish an absurd fare to customers**. Revenue impact is direct, so **guardrails are the architecture**, not an add-on.

**Architecture.**
```
 demand/competitor signals ──▶ Feature store ──▶ Pricing model (versioned)
                                                        │ recommendation
                                                        ▼
                                         ┌──────────────────────────┐
                                         │  Guardrail / policy layer │
                                         │  - hard min/max bounds     │
                                         │  - max rate-of-change      │
                                         │  - anomaly detector        │
                                         │  - human approval > thresh │
                                         │  - kill-switch / rollback  │
                                         └────────────┬─────────────┘
                                                      ▼ published price
                                            Offer service / storefront
                                                      │
                                            (shadow + A/B logs) ──▶ eval
```

**Design.** The model sits behind an **MLOps pipeline** (feature store, versioning, drift monitoring, shadow deployment, A/B). Its output is **never trusted directly**: a **policy/guardrail layer** enforces hard min/max bounds, a maximum rate-of-change per interval, an anomaly detector, human approval above a configurable threshold, a full audit trail of every price change, and a **fast kill-switch** to revert to a safe rules-based baseline. Ancillary pricing (seats/bags/meals) is a **separate optimisation surface** with its own bounds.

**Failure modes.** A model that starts recommending near-zero fares is **caught by bounds + rate-limits + anomaly alarm before publish**, and the kill-switch reverts to the baseline. A drifting model trips the drift monitor and is rolled back to the last-known-good version.

**Trade-offs.** (a) *Model output straight to storefront* — rejected: one bad model = revenue disaster. (b) *Pure rules, no ML* — safer but leaves revenue on the table; use rules as the **fallback baseline**, ML as the optimiser on top. (c) *Human approval on every change* — too slow; approve only above a materiality threshold.

**Red flags:** unbounded output to the storefront; no rollback/kill-switch; no audit trail; treating pricing as a pure data-science problem with no guardrail architecture.

### Case 6 — Multi-region data residency, payments & DR

*flydubai operates from the UAE and flies into the EU (GDPR) and other jurisdictions. Design the data architecture.*

**Requirements.** UAE PDPL/TDRA residency for local regulatory data; GDPR obligations for EU passengers; **PCI-DSS** isolation for cardholder data (central to a direct-sell LCC); different criticality tiers need different RTO/RPO.

**Design.** Start with a **data-classification model** — PII, payment/PCI, regulated, operational telemetry — and derive **per-classification placement rules**, because "put everything in one region" fails both residency and cost tests. UAE-resident stores for local regulatory data; EU-appropriate processing for GDPR subjects, with cross-border transfer mechanisms (SCCs/adequacy) **only where genuinely needed and justified in an ADR**. **Payments** are tokenised and isolated in a PCI-scoped service so cardholder data never touches the main application estate. **DR** is chosen **per tier**: active-active for the booking/offer path (revenue-critical, low RTO), active-passive for back-office; not one global story. Prove compliance with **lineage/governance tooling (Purview-class)**, not a manual spreadsheet — which maps directly to my UAE-government Purview experience.

**Follow-up.** *Prove to an auditor EU data never left EU storage for 12 months?* Data lineage/catalog evidence plus access logs — and the architecture made it provable by classifying and placing data deliberately, not by hoping.

**Red flags:** "replicate everything everywhere"; no classification; unaware PDPL and GDPR differ; payments not PCI-isolated.

---

## Round 4 · Coding / technical deep-dive

**What they're testing:** Can you go from diagram to real implementation trade-offs? Comfort in the JD's stack (cloud-native, event-driven, APIs) with an LCC's cost lens. Below are **worked** answers with real code.

**1) Idempotent event consumer (exactly-once *effect* on at-least-once delivery).**
The transport (Event Hubs/Service Bus/Kafka) gives at-least-once, so duplicates *will* arrive. Make the **effect** idempotent with a processed-events table and a unique constraint inside the same transaction as the business write:

```csharp
// C# — accrual consumer; "flight completed" may be delivered more than once.
public async Task HandleAsync(FlightCompletedEvent e, CancellationToken ct)
{
    // Idempotency key = the natural business identity of the effect.
    var key = $"{e.FlightId}:{e.PassengerId}:accrual";

    await using var tx = await _db.BeginTransactionAsync(ct);
    try
    {
        // INSERT fails on the unique constraint if we've seen this key before.
        await _db.ExecuteAsync(
            "INSERT INTO processed_events(idempotency_key, processed_at) VALUES(@k, SYSUTCDATETIME())",
            new { k = key }, tx);

        var miles = _rules.CalculateMiles(e);          // fare class × tier × partner rules
        await _ledger.AppendAsync(e.MemberId, miles, key, tx);  // append-only ledger entry

        await tx.CommitAsync(ct);                       // atomic: dedupe + effect together
    }
    catch (UniqueConstraintViolation)                   // duplicate delivery
    {
        await tx.RollbackAsync(ct);                     // already processed → no-op, ack the message
    }
}
```
Key point: the dedupe row and the ledger write commit **atomically**, so a crash between them can't double-credit. This is the **inbox** side of the inbox/outbox pattern.

**2) Transactional outbox (reliable publish without dual-write).**
Never write to your DB *and* publish to a broker in two separate steps — a crash between them loses or duplicates events. Write the event to an `outbox` table **in the same transaction** as the state change; a relay publishes and marks it sent:

```sql
BEGIN TRAN;
  UPDATE orders SET status = 'CONFIRMED' WHERE order_id = @id;
  INSERT INTO outbox(id, topic, payload, created_at, sent)
  VALUES (NEWID(), 'order.confirmed', @json, SYSUTCDATETIME(), 0);
COMMIT;   -- state change and event are now atomic
-- A background relay (or CDC/Debezium) reads unsent rows, publishes, sets sent=1.
```

**3) Circuit breaker + fallback around a flaky dependency (GDS/interline).**

```python
# Half-open circuit breaker: shed load from a sick dependency, serve stale-with-flag.
class Breaker:
    def __init__(self, fail_threshold=5, cooldown=30):
        self.fails, self.open_until, self.f, self.cd = 0, 0, fail_threshold, cooldown
    def call(self, fn, fallback):
        now = time.time()
        if now < self.open_until:                 # OPEN → don't even try
            return fallback(stale=True)
        try:
            r = fn(); self.fails = 0; return r    # success resets (also closes half-open)
        except DependencyError:
            self.fails += 1
            if self.fails >= self.f:
                self.open_until = now + self.cd   # trip to OPEN
            return fallback(stale=True)           # last-known value, flagged stale (never silent)
```
Key point: the fallback returns **last-known availability with an explicit staleness flag** surfaced to the user — a silent stale read is worse than a visible one.

**4) Concurrency control for seat/ancillary assignment (optimistic vs pessimistic).**
Two bookings race for seat 12A. **Optimistic** wins for high-read/low-contention web traffic — no held locks, cheaper, but the loser must retry:

```sql
-- Optimistic: succeed only if the row hasn't changed since we read it (version check).
UPDATE seat_assignment
   SET passenger_id = @pax, version = version + 1
 WHERE flight_id = @f AND seat = '12A' AND version = @seenVersion;
-- @@ROWCOUNT = 0  → someone else took it → re-read fresh inventory and retry/offer alternative.
```
Pessimistic (`SELECT ... FOR UPDATE`) is justified only for genuinely high-contention rows (e.g., the last seat in a flash sale), where retry storms would be worse than a short lock. State the trade-off and pick deliberately.

**5) Cost-aware caching with a confirm boundary.**
Cache the ancillary catalog/price with a short TTL to cut expensive PSS calls, but **re-validate at order creation before payment** so a stale cache can never charge a wrong price:

```
show price (from cache, may be stale)  →  add to cart  →
   AT ORDER CREATE: reprice+reconfirm against PSS  →  if changed, tell customer; else capture payment
```
The "confirm at PSS" step is the hard boundary between *cheap reads* and *correct money*.

---

## Round 5 · Cloud & data architecture (Azure-first)

**What they're testing:** Real Azure depth mapped to flydubai's Azure-first, cost-disciplined reality.

**Q: How do you structure compute (AKS/Container Apps) for several teams without stepping on each other's blast radius or cost — while keeping run-cost low for an LCC?**
> Namespace-per-team on a shared AKS cluster gives cost efficiency and a single upgrade surface, with **network policies, resource quotas and separate node pools** to contain blast radius and noisy-neighbour risk; cluster-per-domain is justified only where isolation/compliance demands it (e.g., PCI). For spiky, event-driven workloads I'd push toward **Azure Container Apps / Functions that scale to zero** rather than always-on AKS pods, because for an LCC idle capacity is wasted margin. Cost is made visible with **tag-based showback per team/product** so each ART sees its cost-per-booking.

**Q: How would you use APIM as the partner front door?**
> Azure API Management sits in front of booking/offer/loyalty APIs exposed to Emirates interline, OTAs, GDS and aggregators. It enforces **per-partner products with rate limits and quotas**, **contract versioning** (path/header versioning with deprecation windows), **payload validation** against NDC/interline schemas, OAuth2/JWT validation, and response caching for idempotent reads. Regional APIM instances behind Front Door give geo-routing and residency control.

**Q: Design the data platform feeding revenue management, ancillary analytics and personalization.**
> Operational stores publish changes via **CDC/outbox → Event Hubs → a medallion Data Lake** (bronze raw / silver conformed / gold marts) on ADLS + Synapse/Fabric, with **Purview** for catalog, lineage and access control satisfying UAE/EU compliance. Analytical load is isolated from OLTP (no reporting queries on the booking DB). Freshness is tiered — near-real-time for pricing/ops signals, batch for finance.

**Q: Where do you attack cloud cost for an LCC?**
> Right-size and autoscale (scale-to-zero for spiky services), **reserved capacity/savings plans** for steady baseline load, **caching to cut paid PSS/GDS calls** (often the biggest marginal cost), lifecycle-tier cold data to cheap storage, and enforce **cost tagging + budgets/alerts** so spend is attributable and anomalies are caught early. Cost is an NFR I review in every design, not a cleanup afterthought.

**Q: Walk a Well-Architected review of the Case 1 booking/offer service.**
> **Reliability:** circuit breakers around Sabre, queue-and-reconcile on PSS outage, multi-region active-active read. **Security:** Entra workload identity (no embedded secrets), PCI isolation for payments, APIM auth. **Cost:** cache hit-rate as a first-class metric (fewer paid PSS calls), scale-to-zero for spiky compute. **Operational excellence:** IaC, blue/green deploys, structured logging, runbooks. **Performance:** p95 search-latency budget, Redis for read-heavy shopping. I'd lead the readout with **cost and reliability** because that's where the LCC business risk concentrates.

---

## Round 5B · Full-stack reference architecture (edge → database)

Walk end-to-end through a passenger-facing booking + ancillary flow, naming each component's purpose, the trade-off, a lower-cost alternative, and single- vs multi-region considerations:

1. **Edge/CDN** — Azure Front Door/CDN for static assets, WAF and DDoS at the edge. *Trade-off:* latency hop on cache miss. *Cheaper alt:* App Gateway alone at smaller scale. *Multi-region:* Front Door geo-routes to the nearest region.
2. **API Gateway (APIM)** — auth, rate-limiting, partner/GDS contract versioning, schema validation. *Trade-off:* another hop + per-call cost. *Multi-region:* regional APIM behind Front Door.
3. **Offer/booking orchestration (AKS or Container Apps)** — the ACL + merchandising layer from Case 1. *Trade-off:* complexity vs calling Sabre directly (worth it for decoupling + caching). *Multi-region:* active-active read, active-passive write (PSS is the write authority).
4. **Cache (Azure Cache for Redis)** — availability + ancillary catalog/price. *Trade-off:* staleness, bounded by TTL + confirm-at-order. *Cheaper alt:* in-process cache for low scale (loses cross-node sharing).
5. **Event backbone (Event Hubs / Service Bus)** — fan-out to loyalty, notifications, analytics via outbox. *Trade-off:* downstream eventual consistency. *Cheaper alt:* Service Bus topics for lower-throughput domains.
6. **Order/OLTP store (Azure SQL / Cosmos DB)** — strong consistency for order + loyalty redemption. *Trade-off:* Cosmos tunable consistency is a deliberate choice, not a default.
7. **Payments (PCI-DSS scope)** — tokenised, isolated payment service; cardholder data never enters the main estate. *A hard compliance boundary for a direct-sell LCC.*
8. **Data Lake + Purview** — analytics/AI training data with lineage. *Trade-off:* freshness lag vs operational stores.
9. **Identity (Entra ID / Workload Identity Federation)** — service-to-service auth without embedded secrets. *Multi-region:* token caching to survive a transient IdP blip.
10. **Observability (Azure Monitor / App Insights + Kusto/ADX)** — SLA/SLO **and** cost-per-transaction telemetry. *Trade-off:* telemetry volume cost at scale; sample high-volume traces.

---

## Real-world case studies — how flydubai & the industry actually solve this

- **flydubai + Sabre (SabreSonic).** flydubai selected Sabre's SabreSonic PSS to power its digital transformation and enter the GDS — the reference example of an LCC standardising on a vendor PSS and building channels/merchandising around it (anti-corruption layer) rather than running a bespoke reservation core.
- **flydubai + Microsoft Azure.** flydubai's publicly reported Azure cloud-first move (plus Microsoft 365) is the model for cost-disciplined, cloud-native LCC IT — scale on demand, pay for what you use, keep the run-team lean.
- **OPEN → Emirates Skywards.** The Emirates–flydubai partnership unifying loyalty onto Emirates Skywards is a live example of **integrating two independently-owned loyalty platforms** into one member-facing currency — the archetypal cross-program accrual/redemption/settlement problem (Case 2).
- **Emirates–flydubai codeshare.** Aligned schedules, through-check-in, baggage transfer and single-journey marketing across **two different PSS (Sabre + Amadeus Altéa)** — the canonical "make two systems feel like one product via anti-corruption layers and a canonical model" case (Case 3).
- **Industry patterns.** Ryanair and Wizz Air have published on ancillary merchandising, dynamic pricing and cloud cost discipline; IATA's **Offers & Orders / NDC** is the distribution backbone. Use these as "here's how the industry solves this class of problem," not claims about flydubai internals.

---

## Round 6 · AI/ML & MLOps (aviation / LCC-specific)

**What they're testing:** Can you connect your production GenAI/RAG background to an LCC's real AI use cases — with governance?

**Dynamic pricing / ancillary optimisation.** Architect near-real-time fare/ancillary recommendations behind the **guardrail layer from Case 5** (bounded ranges, rate-of-change limits, anomaly detection, human approval above a threshold, audit trail, kill-switch). This is the same instinct as my LLM cost/model-governance work — the model proposes, the policy layer disposes.

**Ancillary personalization / next-best-offer.** Recommend the right seat/bag/meal bundle at booking to lift conversion — a recommender + online-experimentation problem. Serve from a feature store, evaluate with **shadow + A/B**, and guardrail against dark-pattern or discriminatory pricing. Success metric is attach-rate lift, measured, not assumed.

**Disruption self-service (GenAI).** A chat/voice assistant for IRROPS built as **RAG over fare rules / re-accommodation policy** with **strict grounding** — it must cite policy and must **refuse rather than hallucinate** refund/rebooking eligibility. This is exactly my fine-tuning-vs-RAG trade-off experience: RAG for freshness/traceability of policy, with retrieval-quality evals and a "no-answer" path.

**Predictive maintenance (single fleet).** Boeing 737 sensor telemetry → failure prediction maps directly onto my connected-vehicle telemetry experience (~2M msgs/min): the ingestion/streaming/feature shape is the same, only the label differs. A **single fleet type simplifies** the model surface (one airframe/engine family), which is an advantage over a mixed fleet.

**MLOps governance at scale.** Model registry/versioning, drift and data-quality monitoring, automatic rollback, and a **named approver** for "who signs off a pricing/rebooking model going to production." That approval + ADR discipline is precisely the governance muscle the JD is testing, applied to models.

---

## Round 6B · Agentic AI, LLM & MCP engineering depth

**What they're testing:** the AI-weighted version of this role is assessed against a GenAI/Agentic AI skills bar — agents, orchestration frameworks, RAG, vector search, MCP, guardrails, evaluation, LLMOps — not just "we use some AI." Round 6 is the applied LCC view; this is the engineering-depth view. If the JD you're answering is AI-first, work the full **Agentic AI Solution Architect** guide on this site; this section is the flydubai-contextualised summary, and the LCC lens is always the same: *what does it cost per resolved contact, and what stops it doing something expensive?*

### Agentic AI & multi-agent workflows

**Agent vs workflow.** Deterministic orchestration for the enumerable paths — shop, price, pay, issue. Agents for bounded-tool/unbounded-path work: a disruption assistant that inspects a PNR, checks re-accommodation and OPEN/Skywards entitlement, applies EU261/consumer rules and drafts an option set. Agency buys branching you can't enumerate and costs determinism, latency and tokens — for a cost-per-seat carrier, that trade has to be argued in money.

**Multi-agent shape.** Supervisor + specialists over a typed shared state, not chat between LLMs: an *entitlement* agent, a *re-accommodation options* agent, a *comms drafting* agent, plus a human-approval handoff. Bound everything — max steps, max tool calls, wall-clock, token budget, terminating condition — because a runaway agent loop is simultaneously an incident and an invoice.

**Planning & reasoning.** ReAct for single tool-using agents; plan-and-execute where a supervisor (or human) should approve the plan before it runs; reflection/critic loops where extraction or draft quality matters; routing/handoff for supervisor topologies. Name each pattern's failure mode: ReAct loops, plans go stale mid-run, reflection doubles cost.

**Memory.** Short-term session state, long-term semantic memory (vector-indexed, TTL'd, retrieval-filtered by user), and durable operational case state in a real datastore. Passenger PII and PNR content in a shared vector memory without classification and per-user filters is a PDPL/GDPR incident waiting to happen.

**Human-in-the-loop.** The agent proposes with evidence and confidence; a policy layer routes auto-approve / human-approve / block by risk tier and value; approver identity, proposal and decision are immutably logged. Anything that spends money — waivers, refunds, compensation, fare overrides — is human-approved above a threshold.

### LLMs & prompting

Strong at extraction, transformation, summarisation and tool selection; weak at arithmetic, freshness and anything absent from context. Use **structured outputs** (JSON schema/constrained decoding) for machine-consumed results, never prose parsing. Use **function/tool calling** for actions, treating the tool contract as the trust boundary: server-side argument validation, per-user authorisation, and idempotent write-tools because the model will retry. Manage context explicitly — budget system + policy + retrieved chunks + history, summarise history rather than truncating mid-document. **Model selection** is an ADR: small model for routing/classification, larger for synthesis, documented fallback deployment for throttling or regional outage.

### LLM orchestration frameworks

**LangChain** — integration breadth, fastest start, weakest long-running control flow. **LangGraph** — explicit graph/state machine with durable checkpoints; the right answer when an agent run must be resumable, auditable and approval-gated. **Semantic Kernel** — .NET/Azure-native plugins and planners, natural in a Microsoft-aligned estate. **AutoGen** — conversational multi-agent exploration. **CrewAI** — role/task framing, quick prototypes. The senior point: prompts, tool contracts, state schema and the evaluation harness live *outside* the framework, so swapping frameworks is a refactor, not a rewrite. For a lean LCC team, also weigh operational simplicity and hiring — the cheapest framework is the one your five engineers can debug at 3am.

### RAG pipeline design

Corpus: fare rules and conditions of carriage, ancillary/baggage policy, disruption & re-accommodation policy, codeshare/interline rules, crew and ground-ops manuals. Pipeline: ingestion → layout-aware parsing (fare tables and baggage matrices break naive splitters) → **structure-aware chunking** on clause/heading with overlap and clause-ID + effective-date metadata → **versioned embeddings** (changing the model means a full re-index) → **hybrid retrieval** (BM25 + vector, because RBDs, fare codes and airport codes are lexical) → **reranking** over top-k → context budgeting (dedupe, order, trim) → **grounded generation with citations** and an explicit refusal path. Entitlement and market filters ride in metadata; effective-dating is non-negotiable, since a correct answer from a superseded fare rule is still a wrong answer. RAG for changing knowledge, fine-tuning for stable format/tone — never fine-tune to inject facts.

### Vector databases & knowledge retrieval

**Azure AI Search** is the default in flydubai's Azure-first estate: hybrid search, semantic reranker, security trimming, integrated indexers, and one less bespoke service for a lean run-team. **pgvector** when the corpus is modest and Postgres is already in the estate — one datastore, transactional consistency between metadata and vectors, and materially lower run cost. **Pinecone / Weaviate / Milvus** for very large dedicated vector workloads; **FAISS** for offline benchmarking, not governed production. Decide on filtered/hybrid search quality, security trimming, p95 latency, multi-tenancy, residency (UAE/EU), operational burden and cost per million vectors — then write the ADR off a PoC with representative data, not a vendor deck.

### Model Context Protocol (MCP)

MCP standardises tool, resource and prompt exposure to AI clients, so capabilities aren't rebuilt per agent or framework. In a lean org that's leverage: one governed MCP server per bounded context — *booking/ancillary*, *loyalty*, *disruption* — reused by every agent and channel instead of bespoke glue per project. Raise the cautions unprompted: the MCP server is a privilege boundary, so authenticate the caller, propagate *user* identity for real entitlement checks, allow-list tools per agent, validate arguments, rate-limit, version tool schemas like APIs, log every invocation with correlation IDs, and treat tool descriptions themselves as untrusted input.

### AI tool integration with enterprise systems

Agents call the estate through the same **anti-corruption layer and APIM** as any other client — never directly into SabreSonic. Wrap existing REST/GraphQL/SDK capabilities as narrow tools with explicit schemas; keep write-tools idempotent and scoped; push long-running work onto events/queues (Service Bus/Event Hubs) instead of holding a synchronous connection across a slow partner call. Every Round 4 control still applies — timeouts, circuit breakers, rate limits, cost-aware caching of paid PSS/GDS calls — because an agent is just a very enthusiastic API client, and on a metered vendor contract enthusiasm is expensive.

### Guardrails & Responsible AI

Layered: **input** (PII detection/redaction, prompt-injection and jailbreak classifiers, topic scoping), **retrieval** (entitlement/market filters so the index can't leak another market's or another passenger's content), **tool** (allow-list, argument validation, user-identity authorisation, spend and action thresholds), **output** (content filtering, groundedness/citation checks, schema validation), **process** (human approval above risk thresholds, kill-switch, immutable audit, red-team suite in CI). Call out indirect prompt injection — instructions hidden in an uploaded document, an email or a scraped page the agent reads — and defend by never treating retrieved content as instructions, separating data and instruction channels, and requiring confirmation for destructive tools. Map governance to NIST AI RMF / EU AI Act risk tiers / Microsoft Responsible AI, plus UAE PDPL, GDPR for EU passengers and PCI-DSS isolation anywhere payments are in scope.

### Evaluation & observability

Three levels: **retrieval** (recall@k, precision, citation coverage), **generation** (groundedness, relevance, correct refusal, safety), **task** (end-to-end success, tool-selection accuracy, steps to completion, cost per resolved case). Build a golden set from real contact-centre questions with SME-approved answers and run it in CI as the release gate for prompt, model, chunking or index changes; calibrate LLM-as-judge against human review. **Hallucination detection** in production via groundedness scoring against retrieved context, mandatory citations and abstention on low retrieval confidence. **Observability**: one trace per agent run covering every LLM call, tool call, retrieved chunk, token count and latency, with dashboards for cost per request, p95 latency, containment, escalation and drift. Agree the KPIs with commercial up front — containment rate, first-contact resolution, cost per contact, ancillary attach-rate lift — with a hard constraint of no increase in wrong-policy answers, and feed escalations back into the golden set.

### Performance & cost optimisation

The LCC round you should expect to win. Levers, in order: route to the smallest model that passes evals; cache hard (exact-match, semantic, prompt/prefix, and embedding reuse — re-embedding an unchanged corpus is pure waste); rerank-then-truncate instead of stuffing top-50 chunks; stream tokens to cut perceived latency; parallelise independent tool calls; batch offline work; cap agent steps; and cache paid PSS/GDS lookups behind the agent so a chatty agent doesn't multiply vendor transaction fees. Report **cost per resolved contact** and **cost per document processed** against the human baseline, under a p95 latency SLO and an eval-quality floor. Provisioned/PTU capacity vs pay-as-you-go is a real FinOps decision once volume is predictable.

### Python, FastAPI & software engineering

Production Python, not notebooks: **FastAPI** with async I/O (LLM and vector calls are I/O-bound), Pydantic models doubling as the structured-output schema, dependency-injected auth and clients, queued/background execution for long agent runs, SSE or WebSocket streaming, retry-with-jitter plus fallback deployment on 429s, connection pooling, structured logging with correlation IDs, `ruff`/`mypy` in CI, and `pytest` with recorded LLM fixtures so tests are deterministic and free.

### Cloud AI platform (Azure) & data

**Azure AI Foundry** for model catalogue, deployments, prompt flow, evaluation and content safety; **Azure OpenAI** for governed model access with managed identity, private networking and regional control; **Azure AI Search** for hybrid retrieval with security trimming; **Azure Machine Learning** for the classical pricing/ancillary/maintenance model lifecycle, registry and pipelines; **Databricks/Fabric** where the lakehouse and feature engineering sit. Data engineering framing: booking, ancillary, loyalty, ops and clickstream sources; batch plus streaming ingestion via Event Hubs; medallion curation with data contracts and quality gates on anything feeding a feature store or a knowledge index; Purview for lineage and classification — a knowledge index inherits every governance obligation of its sources.

### LLMOps, containers & security

Version **prompts, tool schemas, chunking/index configuration, embedding model version and eval datasets** in Git as first-class release artefacts, promoted dev→test→prod with the eval suite as the gate; rebuild indexes blue/green behind an alias so a bad re-index rolls back in one flip; canary new model deployments behind a routing flag with online quality and cost monitoring; monitor drift and keep a rules-based fallback. Ship agents and RAG services as **Docker** containers on **AKS or Container Apps** with KEDA/HPA queue-depth autoscaling (and scale-to-zero for spiky assistants — the LCC-correct default), managed identity for every dependency, Key Vault for secrets, private endpoints to model/search/data planes, egress control, and PCI-scope isolation anywhere payment context could reach a prompt or a log.

### Architecture & technical leadership for AI

Publish the reference architecture (ingestion → index → retrieval → orchestration → guardrails → observability), ship a golden-path template so a lean team never rebuilds guardrails, add AI-specific review gates (data classification, eval results, red-team results, cost model, human-approval design) to the existing ADR/review process, tier governance by risk so an internal summariser isn't gated like a customer-facing entitlement assistant, and stay hands-on in code and eval reviews. Frame every use case as: which KPI, what it costs per transaction, what the failure mode is, and who approves it.

---

## Round 6C · Sovereign & air-gapped AI (government-entity constraints)

**Why this comes up here:** flydubai is wholly owned by the Government of Dubai, operates under UAE PDPL and TDRA rules, integrates with government systems (immigration, customs, API/PNR exchange) and processes EU passengers under GDPR and card data under PCI-DSS. So expect the panel question *"this data can never reach a model vendor — now what?"* The full playbook is Module 14 of the **Agentic AI Solution Architect** guide on this site; this is the flydubai-shaped version, and the LCC lens still applies: the strictest tier is also the most expensive one, so match the tier to the mandate, not to anxiety.

### Decompose the mandate before designing anything

| Requirement | What it forbids | flydubai example |
| --- | --- | --- |
| **Residency** | Processing/storage outside the UAE | PDPL-scoped passenger and loyalty data |
| **Sovereignty** | Foreign jurisdiction over data or operator | Government-integrated datasets, national systems |
| **Operational sovereignty** | Offshore/uncleared staff operating the platform | Security-adjacent and government-facing systems |
| **No third-party inference** | Any prompt or document reaching a model vendor | Classified government data, security screening, some API/PNR contexts |

Only the fourth forces local weights. Residency and no-training requirements are normally met by in-tenant Azure OpenAI in a UAE region with private endpoints — and for a cost-disciplined carrier, correctly identifying that is worth real money.

### The tiers, and where an LCC workload lands

1. **Public SaaS AI** — public marketing content only.
2. **In-tenant Azure OpenAI / AI Foundry, private networking, UAE region, no-training terms** — the default for fare-rules assistants, disruption self-service, ancillary personalisation copy, cargo/customs documents, developer productivity.
3. **Sovereign / government cloud region, local key custody, in-country operators** — government-integrated or higher-classification datasets.
4. **Self-hosted open-weight models on your own GPUs (AKS)** — only where "no third-party inference" is an explicit requirement.
5. **Fully air-gapped** — security/border/classified government workloads, artefacts imported through a controlled path.

Confidential computing (TEE-backed VMs/GPUs, customer-managed HSM keys) is the orthogonal control when the operator is part of the threat model. PCI scope stays isolated at every tier — card data should never be reachable from a prompt, a retrieval index, a trace or a log.

### Proving your knowledge never reaches a model

- **Contractual** — no-training and zero-data-retention terms, disabled abuse-monitoring/human review, sub-processor and jurisdiction disclosure, deletion SLAs. Real at tiers 1–3, irrelevant at 4–5.
- **Network** — deny-all egress, private endpoints to model/search/storage planes, private DNS, no public IP on inference subnets, allow-listed egress proxy, and a tested alert on any unexpected destination.
- **Service configuration** — turn off vendor and framework telemetry. The most common real-world leak in a "private" deployment is not the model but the tooling: an orchestration SDK's analytics flag or a default cloud tracing exporter posting prompts and retrieved chunks to a SaaS backend. Self-host the collector; ban public MCP/plugin marketplaces at runtime.
- **Data handling** — minimise and redact before prompting, classify at ingestion and carry the label through chunks, traces and eval sets, trim retrieval on the caller's clearance, separate indexes per classification, and never fine-tune a vendor-hosted model on internal corpora — that *is* exporting your knowledge into weights you don't control, it's extractable, and it can't enforce entitlement. Use retrieval.
- **Evidence** — data-flow diagram with every crossing enumerated, network policy as code, tested DLP/egress detection, immutable audit of prompts/retrievals/tool calls/approvals, signed model provenance, and CI conformance checks so a public endpoint or SaaS exporter can't be reintroduced.

### How each capability is achieved with local-only models

- **Models** — open-weight families (Llama, Qwen, Mistral, Gemma, Phi, DeepSeek) plus Arabic-first sovereign models (Falcon, JAIS) where local-language quality or national policy matters. Serve on vLLM/TGI with continuous batching on AKS GPU nodes. Route by task — 7–8B for routing, classification and extraction; 30–70B for synthesis. Quantisation is a measured trade-off re-validated on your eval set, never assumed. Weights are supply chain: provenance, checksums, licence review, malware scanning, signed internal registry.
- **Orchestration & agents** — frameworks run as your containers with vendored dependencies and telemetry disabled; agent state checkpoints to in-boundary Postgres/Redis. Keep autonomy lower than with a frontier model and prefer plan-approve-execute for anything touching a booking, fare, waiver or refund.
- **RAG** — local OCR/parsing instead of a cloud document API, locally served embedding and reranker models, in-boundary vector store, effective-dated policy chunks with mandatory citations and a refusal path. Store embedding models locally — you cannot re-download them mid-incident.
- **Vector store** — pgvector first for a lean team (one datastore, existing DBA model, lowest run cost), otherwise Qdrant/Weaviate/Milvus/OpenSearch self-hosted. Security trimming at query time from the caller's identity; separate indexes where physical separation is expected.
- **MCP & tools** — in-boundary MCP servers from an internal signed catalogue only, per-agent allow-lists, user-identity propagation, argument validation, no runtime installation, full invocation audit. Agents still reach SabreSonic, loyalty and partner systems only through the ACL and APIM with delegated identity.
- **Guardrails** — locally served safety and PII classifiers (Llama Guard-class, Presidio) plus deterministic policy code, an output guard against classification spillage, fail-closed defaults, and a spillage runbook covering cache, index, trace and log purge.
- **Evaluation & observability** — the golden set inherits the classification of its sources, so no public benchmark services and no hosted frontier judge; use a local judge calibrated against SME review. Self-host OpenTelemetry, Grafana and LLM tracing in-cluster, because traces carry prompts and retrieved content.
- **Cost** — no per-token bill but a fixed GPU cost, so utilisation becomes the objective: batch aggressively, share one served model across use cases behind a gateway, cache semantically, schedule offline work into idle windows, scale non-GPU services to zero. Report cost per resolved contact including amortised GPU, hosting and ops — and state the break-even honestly, because below it an API is cheaper and only the mandate justifies the tier.
- **LLMOps in an air gap** — signed artefacts (weights, images, dependency bundles, prompts, tool schemas, index config, eval sets) acquired and scanned low-side, imported by approved media or a one-way diode, gated high-side by the eval suite, with blue/green index rebuilds and canary rollouts. Quarterly cadence; keep last known-good weights.
- **Platform & DR** — internal package mirror and private registry, builds that succeed with the network disabled, in-boundary vault with HSM-backed keys, mTLS and micro-segmentation per zone, and a second in-country site because failing over to a public region isn't available.

### Sovereign use cases to name

- **Low risk / internal** — policy and manual Q&A, SOP and briefing summarisation, Arabic↔English official translation, engineering-manual search, code assistance over internal repositories.
- **Medium risk / officer-in-the-loop** — tender and contract analysis, customs and dangerous-goods document checking, incident and complaint triage, regulatory-change impact analysis, disruption and roster decision support where a human signs.
- **Medium risk / customer-facing but bounded** — grounded fare-rule and disruption assistants with citations, refusal paths and human escalation; eligibility *explanation*, never eligibility *decision*.
- **Higher risk / mandatory human decision** — border and security screening analytics, fraud/AML support, safety-adjacent engineering decision support: the AI produces evidence and a recommendation, a named human decides, and both are recorded.
- **Cross-entity** — a shared sovereign AI platform tenanted per government entity so nobody builds a solo GPU estate, with federated retrieval leaving data with its owner.

### Rapid-fire

**Q: "It can never go to a model vendor" — first question back?** Which classification levels are in scope and whether the objection is residency, jurisdiction, training or all third-party processing. Only the last one requires local weights.

**Q: How do you prove nothing leaves?** Deny-all egress, private endpoints and DNS, telemetry disabled, self-hosted tracing, tested egress alerts, enumerated data-flow diagram, immutable audit, CI conformance checks.

**Q: Sneakiest leak?** Framework/observability telemetry sending prompts and retrieved chunks to a SaaS backend by default. Then unreviewed public MCP servers or IDE assistants inside the boundary.

**Q: Why not fine-tune on internal data?** It exports knowledge into weights you don't control, it's extractable, it goes stale, and it can't enforce per-user entitlement. Retrieval keeps it governed, fresh and citable.

**Q: What do you lose with a local model, and how do you cover it?** Long-context reasoning and complex tool selection. Cover it with tighter retrieval, task decomposition, constrained decoding, verification steps and more human-in-the-loop — then quantify the gap on your own eval set per use case.

---

## Round 7 · Architecture leadership (agile, runway, governance)

**What they're testing:** Can you run architecture governance in a lean, fast org — not just design systems?

**Q: How do you decide what goes on the architecture runway 1–2 increments ahead vs what's too speculative?**
> The runway holds **enablers that near-term features will provably need** — the ACL for a new partner we've already committed to, the event backbone a queued epic depends on. I fund an enabler when there's a concrete downstream feature within ~2 PIs that would otherwise be blocked or forced into rework; I defer anything speculative to a spike/PoC rather than building it. For an LCC pushing feature velocity, the runway must be *just enough* architecture to keep delivery flowing, not gold-plating.

**Q: Walk me through your ADR process.**
> An ADR is triggered by a decision that is **costly to reverse or affects multiple teams** (a datastore choice, an integration pattern, a cross-cutting NFR). It captures context, options, the decision, and consequences, is reviewed by the affected architects/ART lead, and lives in a repo next to the code. Deviations aren't forbidden — they're **logged as a tracked exception** with an owner and a reconciliation date, so drift is visible and eventually paid down.

**Q: How do you get tech-debt remediation prioritised when you don't own the backlog?**
> I make debt **economic and visible** — quantify it as risk/cost (incident hours, cloud waste, change-failure rate) and attach it to a business outcome, then negotiate a standing capacity allocation (e.g., ~15–20% per PI) with the product owner rather than fighting feature-by-feature. Enabler stories on the runway are the SAFe-native vehicle for this.

**Q: Describe running a PoC and converting it into a go/no-go decision, not just a demo.**
> I define **success criteria up front** (latency, cost, operability, security) so the PoC answers a decision, not a vibe. Example: evaluating an agent framework or vector store — I'd run it against representative data and load, measure against the criteria, and write the result as an ADR with a clear recommendation and the conditions under which we'd revisit. A demo that doesn't change a decision is wasted effort.

**Q: Two teams shipped incompatible integration patterns. Reconcile it after the fact without stalling delivery.**
> Pick one pattern as the standard based on evidence (which better meets the NFRs), write the ADR, and migrate with a **strangler-fig** approach behind an adapter so neither team stops shipping — converge incrementally rather than a big-bang rewrite. Add a golden-path template so the next team can't diverge by accident.

---

## Round 8 · Behavioral / STAR

Model answers, STAR-shaped and mapped to the résumé.

**Delivering under significant ambiguity.**
> *Situation:* the UAE-government data-sovereignty programme started with unclear, sometimes conflicting requirements across two entities. *Task:* deliver one governed migration both would accept. *Action:* I ran a discovery to converge on a shared data-classification and residency model, migrated Informatica → SQL with Microsoft Purview lineage, and captured contested decisions as ADRs. *Result:* a governed, reusable data services marketplace with lineage and access controls, accepted by both entities.

**Architectural recommendation rejected by leadership.**
> *Situation:* I recommended RAG over fine-tuning on a procurement platform; leadership initially favoured fine-tuning. *Task:* make the right call defensible. *Action:* I ran a scoped evaluation comparing accuracy, retrieval cost and freshness, and presented the trade-off with numbers. *Result:* we adopted RAG where it won and reserved fine-tuning for narrow cases — decision made on evidence, not authority, and documented.

**Mentoring through a hard technical transition.**
> *Situation:* engineers needed to move onto applied GenAI/Azure AI. *Task:* raise capability fast. *Action:* I designed and ran AI Apprentice/Mastery and two-tier Python skilling programmes and delivered Tech-Lead-Readiness sessions. *Result:* multiple developer communities onboarded to AI workloads; several went on to lead client-facing architecture.

**Conflicting priorities across concurrent engagements.**
> *Situation:* running Fortune-500 and government engagements in parallel. *Task:* protect delivery on all. *Action:* I set explicit priority and escalation rules, delegated with clear ownership, and made trade-offs visible to stakeholders early. *Result:* commitments met without silent slippage.

**Production incident owned end-to-end.**
> *Situation:* an SLA-threatening issue on the connected-vehicle platform (98–99% SLA). *Task:* restore and prevent recurrence. *Action:* I drove incident command, used telemetry to isolate root cause, mitigated, and ran the postmortem. *Result:* SLA held; the fix became a durable pattern and a monitoring improvement.

**Cutting cost without hurting reliability (LCC favourite).**
> *Situation:* rising cloud/processing cost on a document-intelligence platform. *Task:* cut cost, keep security and reliability. *Action:* moved to in-flight processing with no persistent storage and right-sized/cached the hot path. *Result:* ~3× faster processing at lower cost with the compliance bar intact.

---

## Round 9 · Executive / bar-raiser

**What they're testing:** strategic judgment — build vs buy, cost discipline, a point of view on where LCC/aviation-tech is heading.

**Q: First 90 days as the new Solutions Architect for a platform?**
> *0–30:* listen and map — the current architecture, the ADR backlog (or lack of one), the top reliability/cost pains, and the team's golden paths. *30–60:* land two or three high-leverage decisions as ADRs (e.g., the PSS anti-corruption pattern, a cost-tagging/observability standard) and stand up a lightweight design-review gate. *60–90:* prove value on one concrete outcome — a cost-per-booking reduction or a reliability fix — so governance is seen as an accelerator, not a tax.

**Q: Build vs buy?**
> Buy/extend where a specialist vendor already does it at scale and it's not your differentiator — the reservation core (SabreSonic), a loyalty platform. Build where it's **your competitive edge and moves fast** — the offer/merchandising layer, ancillary optimisation, disruption self-service. The test is: does building this create durable differentiation, or am I rebuilding a commodity I'll have to maintain forever?

**Q: Defend a decision's cost to a CFO who only sees the invoice?**
> I translate architecture into **risk and unit economics** — this spend buys a lower change-failure rate, avoided incident hours, or a lower cost-per-booking — and I show the counterfactual cost of *not* doing it (an outage during a flash sale, a compliance finding). For an LCC where cost-per-seat is the whole game, I frame everything as its effect on unit cost.

**Q: Where does GenAI genuinely change LCC ops in 3 years vs hype?**
> Real: disruption self-service and contact-centre deflection (grounded RAG), merchandising/next-best-offer, and internal engineering/ops copilots. Hype-for-now: fully autonomous pricing or irrops decisions with no human guardrail — the guardrail/kill-switch architecture matters more than the model. I'd invest where there's a measurable attach-rate or deflection metric and a safe fallback.

**Q: Structure governance so it accelerates a lean org instead of bottlenecking it?**
> Golden paths and automated policy checks instead of manual review boards; ADRs for the few decisions that matter; a design-time gate, not a release-time one; and pre-agreed escalation so disagreements resolve in hours, not sprints. Governance should make the compliant path the easy path.

---

## Technology & skills map — JD stack ↔ flydubai landscape ↔ your resume

| JD / flydubai area | What it is | Your resume evidence | Gap to address in prep |
|---|---|---|---|
| LCC commercial model | Ancillary revenue, unbundled fares, cost-per-seat discipline | Cost-optimisation ownership across engagements | Learn LCC merchandising / offer-order vocabulary to talk ancillaries fluently |
| Sabre SabreSonic / PSS integration | Airline reservation backbone (vendor) | No direct PSS experience | Frame as "anti-corruption layer + canonical model around a vendor system" — a pattern you *have* done |
| Emirates–flydubai integration | Cross-carrier codeshare/loyalty across two PSS | Multi-entity UAE government integration | Direct transferable pattern — two systems, one product, via ACL + canonical model |
| Loyalty (OPEN / Skywards) | Cross-program accrual/redemption/settlement | Event-driven, ledgered systems | Rehearse the append-only ledger + cross-program settlement answer (Case 2) |
| Azure cloud-native (AKS, APIM, event-driven) | flydubai's primary cloud platform | Azure Functions, AKS, Service Bus, Logic Apps, APIM-adjacent work | Strong — lead with this; add explicit *cost-per-transaction* framing |
| Dynamic pricing / ancillary ML | Revenue optimisation with guardrails | LLM cost/model governance, guardrail design | Map guardrail instincts onto revenue-safety (bounds, kill-switch, audit) |
| GenAI/RAG/agents | Self-service & operations AI | Deep production delivery (Azure AI Foundry, multi-agent, RAG) | Strongest differentiator — anchor Rounds 6 and 9 here |
| Agentic AI / multi-agent | Autonomous & supervisor-worker workflows, planning, memory, HITL | Production multi-agent delivery | Justify agent-vs-workflow in money; show step/token bounding |
| LLM orchestration frameworks | LangChain, LangGraph, Semantic Kernel, AutoGen, CrewAI | Hands-on orchestration work | One-line comparison plus a defended choice for a lean team |
| RAG pipeline engineering | Chunking, embeddings, hybrid search, reranking, grounding, citations | Production RAG delivery | Rehearse the fare-rules/baggage-policy corpus end to end, incl. effective-dating |
| Vector databases | Azure AI Search, pgvector, Pinecone, Weaviate, Milvus, FAISS | Vector search experience | Have explicit selection criteria and an LCC cost/ops angle |
| Model Context Protocol (MCP) | Standard tool/resource/prompt contract for agents | MCP server & tool integration | Frame as reusable capability layer *and* privilege boundary |
| Guardrails & Responsible AI | Input/retrieval/tool/output/process controls, injection & PII defence | Guardrail and governance work | Name indirect prompt injection; map to NIST AI RMF / EU AI Act / PDPL / PCI-DSS |
| AI evaluation & observability | Golden sets, groundedness, hallucination detection, tracing, feedback | Evaluation harness experience | Bring metrics, a CI eval-gate story and commercial KPIs |
| AI cost & latency optimisation | Model routing, caching, token trimming, provisioned capacity | LLM cost-governance work | Express as cost per resolved contact — the LCC-native framing |
| Python / FastAPI | Async production services, Pydantic contracts, streaming | Python delivery | Expect a real FastAPI/async/testing discussion, not notebooks |
| Azure AI platform | AI Foundry, Azure OpenAI, AI Search, Azure ML, Databricks/Fabric | AI-102, Azure AI delivery | Know which service owns which lifecycle stage |
| LLMOps / MLOps | Prompt & index versioning, eval gates, canary/blue-green, drift | CI/CD and model governance | Stress prompts/indexes as gated release artefacts |
| Containers & deployment | Docker, AKS/Container Apps, KEDA/HPA, scale-to-zero | AKS and cloud-native delivery | Tie autoscaling and scale-to-zero to bursty agent load and cost |
| Enterprise governance (security, cost, observability) | Cross-platform standards, lean footprint | SLA ownership, cost optimisation, Purview-based governance | Strong — emphasise *lean* governance that speeds delivery |
| Regulatory (UAE PDPL, GDPR, PCI-DSS) | Multi-jurisdiction + payments compliance | Data-sovereignty/governance delivery in UAE government | Add PCI-DSS payment-isolation talking point for a direct-sell LCC |

---

## Technical question bank (rapid-fire, by topic)

Each question has a concise but real answer — say these in 2–4 sentences.

**PSS / booking / ancillary**
- **Q: What are RES, INV and DCS in a PSS?** Reservation manages bookings/ticketing (PNRs); Inventory manages schedules, seat availability and overbooking; Departure Control handles check-in, boarding and load planning. They're distinct because they change at different rates and have different consistency needs.
- **Q: Why an anti-corruption layer around SabreSonic?** It translates the vendor's models to your canonical domain model so channels don't couple to EDIFACT/NDC quirks, and a PSS change (or swap) is absorbed in one place instead of rippling fleet-wide.
- **Q: How do you merchandise ancillaries consistently across channels?** Own a single **offer/order** service that composes fare + ancillary bundles, so every channel renders the same catalog, pricing and rules from one source.
- **Q: Avoid double-booking when you cache availability but the PSS is source of truth?** Cache-then-confirm: show cached availability, but re-validate and write through the PSS at order time with an idempotency key, so the PSS remains the single arbiter of seat state.
- **Q: What is IATA NDC / Offers & Orders and why does it matter for an LCC?** A modern XML/API distribution standard that lets airlines sell rich, personalised offers (fare + ancillaries) through third parties instead of legacy fare-filing — crucial for an LCC whose revenue is ancillary-heavy.
- **Q: Cache ancillary pricing without charging a stale price?** Short TTL for display, plus a mandatory reprice/confirm against the PSS at order creation before payment capture.

**Loyalty / cross-program**
- **Q: Why is redemption a stronger-consistency problem than accrual?** Redemption spends a finite balance, so a race can double-spend real value; accrual only adds and can be eventually consistent. Redemption needs a conditional/serializable write.
- **Q: Design an auditable append-only ledger.** Immutable entries (accrual/redemption/adjustment) partitioned by member, with periodic balance snapshots; the current balance is a projection you can rebuild by replay, which makes disputes and settlement provable.
- **Q: Integrate OPEN ↔ Skywards — real-time or batch?** Near-real-time earning event for member experience, but authoritative money settlement between the two companies as a batch reconciliation, with an ACL isolating you from the partner's contract changes.
- **Q: Exactly-once on at-least-once delivery?** You can't get exactly-once *delivery*, so make the *effect* idempotent: a processed-events key with a unique constraint committed atomically with the business write.

**Cross-carrier integration**
- **Q: Make an Emirates+flydubai itinerary feel like one journey across two PSS?** A canonical cross-carrier itinerary model plus per-carrier ACLs exchanging standards-based interline messages; each PSS stays authoritative for its own segment.
- **Q: Baggage transfer across two DCS?** Model it as a cross-DCS event stream driving a per-bag state machine, with last-writer-wins in a reconciliation window and a mishandled-bag fallback.
- **Q: Who owns rebooking on a misconnect?** The carrier that owns the affected segment; the orchestration layer coordinates and keeps the canonical itinerary authoritative so neither PSS is double-booked.

**Cloud / Azure**
- **Q: AKS namespace-vs-cluster trade-offs for a lean org?** Namespace-per-team on a shared cluster is cheaper and simpler to operate (quotas + network policies for isolation); cluster-per-domain only where compliance/isolation demands it.
- **Q: APIM per-partner rate limiting and versioning?** Per-partner products with quotas/throttling and OAuth, plus header/path versioning with deprecation windows and schema validation on NDC/interline payloads.
- **Q: Cosmos DB over Azure SQL — when, and what is tunable consistency?** Cosmos for globally-distributed, high-throughput, flexible-schema workloads; its consistency levels (strong→eventual) are an explicit per-workload choice trading latency/availability for freshness — never leave it on default without deciding.
- **Q: Where do you attack cloud cost for an LCC?** Scale-to-zero for spiky compute, reservations for steady load, caching to cut paid PSS/GDS calls, storage tiering, and cost tagging with budgets so spend is attributable.
- **Q: What does a Well-Architected review produce?** A prioritised findings/risk register across the five pillars with owners and remediation actions — an artifact, not a verbal "looks fine."

**Governance / agile**
- **Q: What triggers an ADR vs just deciding?** A decision that's costly to reverse or affects multiple teams; trivial, local, reversible calls don't need one.
- **Q: What's on an architecture runway and how far ahead?** The enablers near-term (~1–2 PI) committed features provably need — no more; speculative work goes to a spike.
- **Q: Keep governance lightweight enough to speed up a fast org?** Golden paths + automated checks + design-time review, not release-time gatekeeping.
- **Q: Enterprise Architect vs Solution Architect remit?** EA owns cross-portfolio standards and the reference architecture; SA owns the end-to-end architecture of a specific solution/ART within those standards.

**AI/ML for aviation**
- **Q: Guardrails around an ML dynamic-pricing engine?** Hard min/max bounds, rate-of-change limits, anomaly detection, human approval above a threshold, full audit and a kill-switch to a rules baseline — all before publish.
- **Q: How is 737 predictive maintenance like connected-vehicle telemetry?** Same high-volume sensor ingestion/streaming/feature pipeline; only the predicted label differs, and a single fleet type simplifies the model.
- **Q: Stop a fare-rules chatbot hallucinating refund eligibility?** Grounded RAG over policy with citations, retrieval-quality evals, and a "refuse/escalate" path rather than a confident guess.

**Agentic AI / LLM engineering (JD rapid-fire)**
- **Q: Agent or deterministic workflow?** If the steps are enumerable, orchestrate them; agents are for bounded-tool, unbounded-path problems and must be bounded by max steps, tool calls, wall-clock and token budget.
- **Q: LangChain vs LangGraph vs Semantic Kernel vs AutoGen vs CrewAI?** Breadth vs stateful checkpointed graphs vs .NET/Azure-native plugins vs conversational multi-agent vs role/task prototyping. Keep prompts, tool contracts, state schema and evals outside the framework so the choice stays reversible.
- **Q: Chunking strategy for fare rules and baggage policy?** Structure-aware on clause/heading with overlap, carrying clause ID and effective date so answers cite the rule and superseded versions are filtered out.
- **Q: Why hybrid search plus a reranker?** RBDs, fare codes and airport codes are lexical tokens embeddings blur; BM25 catches exact matches, vectors catch paraphrase, a cross-encoder reranker restores precision after widening recall.
- **Q: Which vector store for a lean LCC?** Azure AI Search by default (hybrid + security trimming + one less service to run); pgvector when Postgres is already there and the corpus is modest; FAISS only for benchmarking. Decide on filters, latency, residency, ops burden and cost per million vectors.
- **Q: Why MCP rather than bespoke tool glue?** One governed server per bounded context, reused across agents and channels — with user-identity propagation, per-agent tool allow-lists, argument validation, versioned schemas and full invocation logging, because the server is a privilege boundary.
- **Q: Indirect prompt injection?** Instructions hidden in content the agent reads. Never treat retrieved content as instructions, separate data and instruction channels, classify inputs, allow-list tools, confirm destructive actions, and red-team in CI.
- **Q: How do you gate an AI release?** A golden set of SME-approved questions scored for retrieval, groundedness, refusal correctness and task success, run in CI on every prompt/model/index change, with LLM-as-judge calibrated against human review.
- **Q: What do you trace in production?** One trace per agent run — every LLM call, tool call, retrieved chunk, tokens and latency — plus cost per request, p95 latency, containment, escalation, groundedness and drift dashboards.
- **Q: Cut LLM cost without cutting quality?** Smallest model that passes evals, layered caching (exact/semantic/prefix/embeddings), rerank-then-truncate, streaming, parallel tool calls, step caps, cached paid PSS/GDS lookups, and provisioned capacity once volume is predictable — reported as cost per resolved contact under a quality floor.
- **Q: What makes a FastAPI agent service production-grade?** Async I/O, Pydantic schemas shared with structured outputs, DI'd auth/clients, queued long runs, streaming, retry-with-jitter and fallback deployments on 429s, deterministic tests with recorded fixtures, correlation-ID logging.
- **Q: What does LLMOps add over MLOps?** Prompts, tool schemas, chunking/index config, embedding model version and eval datasets become versioned, gated release artefacts, with blue/green index rebuilds behind an alias and canary model routing.

---

## Deeper / staff-level questions

- **Zero-downtime PSS integration migration.** Move the booking/offer orchestration from one PSS integration pattern to another with live traffic and no double-bookings during cutover. *Approach:* **strangler-fig** behind the ACL — route a growing % of traffic (canary by route/market) to the new path, run both in parallel with shadow-comparison of results, keep the PSS as the single source of truth so both paths reconcile there (no local truth to diverge), and cut over per-route with instant rollback. Idempotency keys ensure a retry across paths can't create two PNRs.
- **Resilient Emirates interline.** Design the interline layer so either carrier's PSS can be down for maintenance without blocking the other carrier's ability to sell/service the shared itinerary. *Approach:* canonical itinerary + per-carrier ACL decouple the two; the up carrier serves its own segment; the down segment shows a pending state and reconciles on recovery; the real bottleneck is **write-availability to the down PSS**, mitigated by queue-and-reconcile plus clear customer messaging.
- **Cost-per-booking allocation.** Chargeback-accurate cloud cost across teams with different traffic profiles. *Approach:* mandatory resource tagging by team/product, per-request cost attribution via telemetry (compute + paid PSS/GDS calls), and showback dashboards so an LCC can see cost-per-booking by product and optimise it.
- **Shared vs per-team capability.** Document intelligence needed for both travel-document verification and refund evidence — build a shared platform service or let each team build its own? *Approach:* shared service if the capability is stable, reused and benefits from a single security/compliance surface; per-team if requirements genuinely diverge and coupling would slow both. Decide with an ADR; a thin shared library + separate deployments is often the pragmatic middle.
- **Active-active with a single-write PSS.** What does active-active even mean when the PSS is single-write-region? *Approach:* active-active applies to the **read/orchestration tier** (both regions serve shopping and read paths); writes still funnel to the PSS's write authority, so the real design question is **fast, consistent read replication and graceful write-path failover**, not pretending you have multi-master booking.
- **Chaos day.** DXB unreachable, SabreSonic degraded, regional failover only partially works. *Approach:* incident command from the secondary region; shed load with circuit breakers; serve shopping in degraded/cached mode; queue bookings with honest messaging; prioritise IRROPS re-accommodation via rules-only fallback; communicate status; post-incident, write ADRs for the gaps the partial failover exposed.

---

## Scenario-based questions (situational & troubleshooting)

Each has a full answer: **detect → mitigate → root-cause → durable fix / ADR.**

1. **Skywards Miles stop crediting for flydubai flights after a partner-side API change.** *Detect:* accrual-success-rate and reconciliation-mismatch alarms fire; correlation ids show earn events sent but not settling. *Mitigate:* buffer earn events (Event Hubs retention) so nothing is lost; show members a pending state; hotfix the ACL mapping. *Root cause:* the partner changed a contract we consumed without a versioned/validated boundary. *Durable fix:* contract tests + schema validation at the ACL, a versioning agreement with the partner, and an alert on reconciliation drift — ADR recorded.
2. **Booking volume spikes 50× in 10 minutes (flash sale); Sabre rate-limits us.** *First hour:* protect the PSS with a **request queue + backpressure**, raise cache hit-rate/TTL for availability to cut PSS calls, and serve shopping in a slightly-degraded cached mode; keep the **confirm-at-order** step so prices stay correct; prioritise checkout traffic over speculative shopping; protect ancillary conversion by caching the catalog so add-to-cart still works. *Durable fix:* pre-warm caches before announced sales, negotiate burst limits, and load-test the sale path — ADR on the sale runbook.
3. **Auditor: prove EU passenger data never left EU-classified storage for 12 months.** *Answer:* produce **data-lineage/catalog evidence (Purview-class)** plus access logs showing storage location and cross-border transfers; the architecture made this provable because data was **classified and placed deliberately** with per-classification residency rules, not replicated everywhere. If we lacked it, the fix is to introduce classification-driven placement and lineage tooling.
4. **Cloud bill jumps 40% after a "successful" launch on a tight LCC budget.** *Investigate:* cost-by-tag/resource breakdown to find the driver (often an un-cached hot path hitting paid PSS/GDS calls, an oversized SKU, or chatty telemetry). *Mitigate:* add caching/right-size/sample telemetry. *Root cause:* cost wasn't an NFR in the design review and there was no budget alert. *Durable fix:* cost tagging, budgets/alerts, and cost as a mandatory Well-Architected review item — ADR.
5. **Well-Architected review flags a reliability risk mid-way through a critical release. Block it?** *Decide by risk:* if the risk is customer-facing revenue loss (e.g., no PSS-outage fallback on the booking path) I hold the release and fast-track the fix; if it's a lower-tier concern I let it ship with a **tracked exception (logged deviation + owner + remediation date)** so delivery isn't held hostage. Governance should be risk-proportionate, not binary.
6. **GenAI disruption-assistant gives a passenger wrong rebooking eligibility.** *Respond:* disable the specific capability (kill-switch), fall back to agent handling, and notify affected passengers. *Root cause:* the model answered beyond its grounding. *Durable fix:* strict RAG grounding with citations, a refusal path for low-confidence retrieval, eval gates on policy-answer accuracy before release, and human-in-the-loop for eligibility decisions — ADR.
7. **Dynamic-pricing model publishes near-zero fares on a route.** *What stopped it:* the **guardrail layer** — hard min bounds + rate-of-change limit + anomaly alarm — blocks publish, and the kill-switch reverts to the rules baseline. *Postmortem:* investigate the feature/data drift that produced the recommendation, add a regression case, and confirm bounds/alerts are tuned. The architecture's job was to make the model *unable* to reach customers with an absurd price.
8. **Baggage transfer between a flydubai and Emirates flight fails at DXB — the two DCS disagree on the bag's state.** *Immediate:* trigger the **mishandled-bag exception workflow** (locate, reconcile, forward on next service) and inform the passenger. *Root cause:* out-of-order/late scan events across two DCS with no reconciliation window. *Durable fix:* a per-bag state machine with last-writer-wins in a bounded reconciliation window and an explicit exception path — ADR on cross-DCS baggage consistency.

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
- [Martin Fowler — Transactional Outbox / enterprise integration patterns](https://martinfowler.com/eaaDev/EventSourcing.html)
- [PCI Security Standards Council — PCI DSS](https://www.pcisecuritystandards.org/)
