# Emirates Group — Solutions Architect Interview Guide

A complete, round-by-round preparation guide for a **Solutions Architect** role at **Emirates Group IT** (Dubai, UAE) — spanning Passenger (reservations/Skywards), SkyCargo, and enterprise-platform portfolios. Built from the role's job description and the wider Emirates Group technology landscape. Used by the `/airlines` page.

> **Scope note.** This guide reverse-engineers a realistic interview loop and technical landscape from the public JD (SAFe Agile Release Trains, architecture runway, ADRs, enterprise architecture governance, Azure/cloud-native, microservices, event-driven architecture) plus Emirates Group's publicly documented technology partnerships (Microsoft Azure, AWS, Amadeus Altéa PSS, IBS Software OneCargo). Emirates does not publish its internal architecture repository, so technical specifics below are **industry-standard aviation/logistics patterns you should be able to defend**, not confirmed internal system designs. Treat brand and vendor facts as public context, not insider knowledge.

---

## Context: Emirates Group IT & the aviation-tech landscape

**Who Emirates Group is.** Emirates Group is the Dubai Government-owned aviation conglomerate comprising **Emirates airline**, a full-service mega-carrier operating through Dubai, and **dnata**, spanning ground handling, cargo, catering and travel services. Emirates Group IT therefore runs business-critical platforms for passenger retailing, airport operations, loyalty, cargo, crew, finance, data and AI at 24/7 aviation scale.

**Why this JD reads the way it does.** The language — *Agile Release Trains*, *architecture runway*, *architectural intent*, *ADRs*, *enterprise architecture views* and *Teams of Teams* — is SAFe vocabulary. A staff/principal Solutions Architect is expected to shape portfolio architecture, not merely draw a service diagram: clarify NFRs, make trade-offs visible, prepare runway one or two PIs ahead, and align teams that do not report to them.

**Public platform context you should preserve accurately.** Emirates uses **Amadeus Altéa** as the PSS context: Reservation/RES, Inventory/INV and Departure Control/DCS, with EDIFACT/XML/IATA NDC style interfaces. The right design pattern is an **anti-corruption layer** and orchestration around Altéa, not a replacement. **Emirates Skywards** is a large loyalty ecosystem (~30M members) where event-driven microservices, ledgering and partner settlement are natural patterns. **SkyCargo / OneCargo**, publicly co-developed with **IBS Software**, maps to cargo booking, warehouse, ULD tracking, compliance and IATA **ONE Record** partner integration. Cloud posture is **hybrid**: Azure for core digital/AI patterns such as AKS, Azure SQL/Cosmos, Azure AI, Entra ID and Azure DevOps, with AWS present in some cargo/loyalty contexts. The staff answer is “right cloud per workload, governed by a placement ADR,” not “everything on my favorite cloud.”

**Governance and regulation.** Use **TOGAF** for enterprise method, **ArchiMate/C4/UML** for views, **SAFe** for delivery, ADRs for decision records and Well-Architected reviews for assurance. UAE PDPL/TDRA cloud policy, PCI-DSS, GDPR for EU passengers and IATA security shape data placement, encryption, access, audit evidence and DR decisions.

**Why the candidate profile maps well.** The candidate has 14 years as a Microsoft Technical Lead/Architect with AZ-305, AI-102, AZ-204, AZ-104 and AZ-400; production GenAI/RAG/multi-agent experience; a connected-vehicle platform at **20M+ vehicles and ~2M telemetry messages/min** with 98-99% SLA expectations; and a UAE government data-sovereignty engagement involving Informatica-to-SQL modernization and Microsoft Purview. Those are strong transfer stories for aviation-scale event processing, regulated data governance and Azure-first AI/platform architecture.

---

## How to use this guide

Use each section as a spoken interview answer, not a memorized script. Start every design answer by driving requirements: traffic, regions, latency, RTO/RPO, data classification, consistency and what cannot fail. Then move through architecture, data/consistency, capacity, resilience, trade-offs and follow-up questions.

For leadership rounds, answer with artifacts: ADRs, C4 views, architecture runway enablers, exception registers, cost dashboards, threat models, runbooks and Well-Architected findings. For behavioral rounds, use STAR and quantify scale. Repeatedly state that public vendor facts are context; the proposed designs are defensible industry patterns, not claims about Emirates internals.

---

## Round 1 · Recruiter / HR screen

**What they're testing:** Is your experience at enterprise/portfolio altitude, and are relocation, notice and compensation aligned?

### Q: Walk me through your background in 90 seconds, architect-level.

**Answer:** I have 14 years of experience progressing from hands-on engineering into Technical Lead and Architect roles at Microsoft, owning solution strategy, technology selection, NFRs, delivery risk, security, cost and stakeholder alignment. My strongest areas are Azure cloud-native architecture, event-driven platforms, enterprise integration and production AI, including RAG and multi-agent systems. I have led teams from small engineering pods to 40+ engineers and hold AZ-305, AI-102, AZ-204, AZ-104 and AZ-400.

The scale is relevant to Emirates. On a connected-vehicle platform, the architecture supported **20M+ vehicles** and about **2M telemetry messages per minute** with 98-99% SLA expectations across regions. I also delivered a UAE government data-sovereignty and governance engagement using SQL and Purview-style controls. That maps well to Emirates' regulated, high-throughput passenger, cargo, loyalty and AI landscape.

**Key points:** ownership language, quantified scale, regulated delivery, Azure/AI credentials. **Red flags:** code-only story, no governance, no numbers.

### Q: Why Emirates / why UAE?

**Answer:** Emirates is compelling because it combines digital commerce, logistics, real-time operations, loyalty and regulated data at global scale. Those are the same architectural muscles I have used in connected vehicles, AI platforms and government data governance: event ingestion, resilience, partner integration, data sovereignty and cloud operating models.

The UAE is not a random pivot. I already have UAE government data-sovereignty exposure, and Emirates' public Azure/hybrid direction fits my Microsoft architecture background. I would be clear that I am open to Dubai relocation, need the normal visa sponsorship process, and can discuss notice period and package structure realistically.

**Key points:** UAE proof, aviation/logistics technical hook, relocation readiness. **Red flags:** generic travel enthusiasm, unclear relocation.

### Q: What's your target compensation and notice period?

**Answer:** Give a researched tax-free AED package range for a senior/staff Solutions Architect in Dubai and discuss total package: base, bonus, housing, schooling if relevant, flights, medical and relocation. Phrase it as: “I am targeting a competitive AED package for the scope; I am flexible depending on total benefits and portfolio responsibility.”

For notice, be exact: “My notice period is X, and I can start relocation paperwork immediately after offer acceptance.” Confidence matters; UAE packages often include allowances, so asking about them is professional.

**Key points:** AED total package, allowances, clear notice. **Red flags:** refusing a range, home-country comp logic only.

---

## Round 2 · Hiring manager (architecture scope & fit)

**What they're testing:** Can you operate at ART/portfolio scope and govern architecture through influence?

### Q: Describe the broadest architectural scope you've owned — how many teams, portfolios, or ARTs did your decisions touch?

**Answer:** The connected-vehicle platform is the closest scale story: **20M+ vehicles**, **~2M telemetry messages/min**, multiple regions and downstream consumers. Decisions about partitioning, ingestion backpressure, schema evolution, observability and SLA targets affected many teams, not a single service. That is the same type of blast radius I would expect in Emirates passenger, cargo or loyalty domains.

A second example is the UAE government data-sovereignty program, where the architecture had to satisfy multiple entities and compliance expectations. That maps to Emirates because a Solutions Architect must reconcile business speed with UAE PDPL/TDRA, GDPR, PCI-DSS, IATA security, data lineage and operational continuity.

**Key points:** multi-team blast radius, NFR ownership, regulatory boundaries. **Red flags:** only single-team examples.

### Q: How do you keep 5–10 teams building consistently with your architectural intent when you don't manage them?

**Answer:** I use artifacts and paved roads. Architecture intent is written as ADRs/RFCs with C4 views, NFRs, decision consequences and security/cost implications. Then I provide golden paths: API templates, CI/CD checks, observability libraries, threat-model templates, cost tags and reference deployments. A lightweight review happens early for high-risk changes; routine standards are enforced through automation.

I would align with Product, RTEs and Enterprise Architecture during PI planning, so runway items are visible and funded. Deviations are allowed but recorded with owner, expiry and remediation. That is governance as acceleration, not command-and-control.

**Key points:** ADRs, golden paths, automated controls, exception register. **Red flags:** “I talk to people,” no repeatable mechanism.

### Q: Tell me about a time your architecture and another architect's architecture conflicted. What happened?

**Answer:** A good example is a regulated document/intelligence platform where one view preferred retaining raw documents for audit and another minimized storage for privacy/compliance. The trade-off was real: auditability versus data minimization. I would resolve it through an ADR: raw documents are processed ephemerally unless policy requires retention; extracted fields, hashes, model version, confidence scores and audit logs are retained; access to raw content is separately controlled.

The result is a reusable pattern for Emirates-style cargo customs or passenger document verification: preserve evidence without expanding sensitive-data blast radius. The point is not “my design won”; it is that the decision was explicit, reviewed and reusable.

**Key points:** concrete trade-off, documented resolution, durable pattern. **Red flags:** blame, no artifact.

---

## Round 3 · System design (aviation/logistics domain)

### Case 1 — Reservation & inventory around a PSS you don't own (Altéa-style)

Design an orchestration layer for Emirates channels around a third-party PSS such as Altéa.

**Requirements & scale** — Assume global web/app/contact-centre traffic, **5,000-10,000 availability/search requests/sec** during campaigns, **100-300 booking attempts/sec** at peak, p95 search under 300-500 ms when cached, and zero tolerance for duplicate PNRs or double-booking. RTO for orchestration is 15-30 minutes; RPO for confirmed booking state is effectively zero because the PSS remains source of truth.

**Architecture**
```text
[Web/App/Contact Centre]
        -> [Front Door/WAF]
        -> [APIM: auth, quotas, versions]
        -> [Booking Orchestration on AKS]
              |-> [Redis/Cosmos short-TTL availability cache]
              |-> [Canonical booking/request store + idempotency]
              |-> [PSS Anti-Corruption Layer]
                       -> [Altéa RES/INV/DCS via EDIFACT/XML/NDC]
              |-> [Outbox/Event Hubs]
                       -> [Skywards, notifications, analytics]
```

**Data & consistency** — Emirates owns the canonical channel model, request state, audit and idempotency mapping; Altéa owns PNR, inventory and DCS truth. Availability cache is only a shopping hint. Before payment capture and final confirmation, the service performs a confirm-at-PSS step. Strong consistency applies at PSS and payment boundaries; events to loyalty/analytics are eventual and idempotent.

**Scale & capacity** — A 30-second cache keyed by route/date/fare family can absorb repeated shopping traffic. If 5% of 10,000 searches/sec become booking attempts, design internal workers for hundreds/sec, but respect PSS quotas as the real bottleneck. Partition events by booking reference so all changes to one booking are ordered.

**Failure modes & resilience** — If the PSS is degraded, continue cached shopping with clear “availability confirmed at checkout” messaging and pause or queue unsafe booking commits. Use circuit breakers, bulkheads per PSS adapter, exponential backoff and reconciliation for ambiguous booking/payment states. Reads can be active-active; writes may be active-passive or single-writer because the vendor is authority.

**Trade-offs & alternatives** — Direct channel-to-PSS integration is cheaper but tightly couples every channel to vendor formats and failure modes. Rebuilding inventory locally is unsafe and expensive. The anti-corruption layer costs more and adds latency, but gives migration optionality, consistent observability, idempotency and channel autonomy.

**Follow-up answers** — During a peak sale outage, serve cached search, protect the PSS with throttles, stop final commits if confirmation cannot be obtained, do not capture payment without a booking, and reconcile idempotency keys to PSS references after recovery. Customer messaging must be explicit; silent double-booking is never acceptable.

**Key points:** anti-corruption layer, canonical model, idempotency, cache-then-confirm. **Red flags:** replacing Altéa, caching as truth, blind retries.

### Case 2 — Emirates Skywards accrual/redemption at scale

**Requirements & scale** — Assume **30M members**, large arrival-bank bursts, accrual visible within minutes and redemption p95 <500 ms. Accrual is eventually consistent; redemption must prevent double-spend. Ledger RPO is near-zero and audit retention is long.

**Architecture**
```text
[Flight/partner completion events]
        -> [Event Hub/Kafka]
        -> [Accrual rules service]
        -> [Ledger service]
              -> [Append-only ledger DB]
              -> [Balance projection/read model]
              -> [Outbox: miles-credited/debited]
                    -> [notifications, campaigns, partner settlement]
[Redemption API] -> [Ledger transaction/optimistic lock] -> [commerce/PSS flow]
```

**Data & consistency** — Use an append-only ledger: member, source event, ticket/flight/partner reference, points delta, rule version, effective time, posted time, status and correlation ID. Current balance is a projection, not the only truth. Accrual can be replayed and corrected; redemption requires atomic check-and-debit or reservation semantics with optimistic concurrency on member/version. Partner exchange is a saga with pending/reserved/confirmed/compensated states.

**Scale & capacity** — Hundreds of thousands of daily accrual entries are straightforward, but years of audit history reach hundreds of GB or TB. Partition by member_id and time; partition event streams by member_id for ordered balance updates. Use monthly snapshots to speed “balance as of date” queries while preserving the ledger.

**Failure modes & resilience** — Duplicate events are blocked by unique `(member_id, source_event_id, type)`. If rules fail, events remain in the stream. If partner APIs fail, miles remain pending/reserved with reconciliation. Multi-zone ledger storage and restore testing are more important than low-latency vanity.

**Trade-offs & alternatives** — A mutable balance column is simple but fails audit and disputes. Full event sourcing for every loyalty attribute may be overkill; use ledger/event sourcing for value movement and simpler CRUD for preferences. Azure SQL/PostgreSQL may fit transactional ledger; Cosmos fits high-scale partitioned read/member documents if the partition key is sound.

**Follow-up answers** — For a missing accrual dispute, trace ticket, coupon, flight event, member ID, rules version, rejected-event table, ledger and projection lag. If correction is needed, post an adjustment ledger entry with reason and approver; never overwrite balance silently.

**Key points:** append-only ledger, CQRS projection, redemption strong consistency, partner settlement. **Red flags:** mutable balance only.

### Case 3 — SkyCargo booking & ULD tracking (OneCargo-style)

**Requirements & scale** — Assume cargo bookings across hubs, partner/GHA integrations, and **10,000-50,000 scan events/min** globally. ULD tracking can be seconds-to-minutes eventual; customs/compliance decisions need auditability and controlled state. Operational dashboards target 99.9% availability.

**Architecture**
```text
[Customers/forwarders] -> [Cargo APIM/B2B gateway] -> [Booking service]
                                                        |-> [capacity/rate]
                                                        |-> [warehouse]
                                                        |-> [customs/compliance]
                                                        |-> [revenue accounting]
[GHA scanners/IoT gateways] -> [IoT/Event Hubs] -> [ULD event processor]
                                             -> [ULD state projection + ops dashboard]
[Partner adapters] <-> [IATA ONE Record-shaped contracts]
```

**Data & consistency** — Booking owns airway bill/shipment booking; ULD tracking owns scan events and current ULD state; customs owns declarations, holds and clearance. Scan events are immutable: uld_id, event_id, location, occurred_at, received_at, source, sequence and confidence. The current state is a projection. Strong consistency is needed for booking/capacity commit and customs release; dashboards can be eventually consistent with staleness indicators.

**Scale & capacity** — 50,000 events/min is ~833/sec; at ~1 KB/event, raw volume is ~72 GB/day before compression/indexes. Partition by uld_id or shipment_id to maintain order per ULD. Keep recent operational state in a fast store and historical events in a data lake.

**Failure modes & resilience** — Remote airports may buffer scans offline and upload later. Handle out-of-order events by event time and reconciliation windows, not receive time. Partner/customs outages move shipments to pending/held queues rather than blocking all booking. Use circuit breakers and dead-letter queues.

**Trade-offs & alternatives** — A monolith is simpler initially but couples customs, booking and warehouse release cycles. Synchronous partner calls for every event are fragile. Event-driven bounded contexts cost more to operate but support replay, audit and partner isolation.

**Follow-up answers** — If a ULD scan arrives late, recompute projection if within the reconciliation window; if it conflicts with lifecycle rules, flag an exception. Never “latest received wins” for physical logistics.

**Key points:** bounded contexts, ONE Record, immutable events, out-of-order handling. **Red flags:** monolith, no customs isolation.

### Case 4 — Irregular operations (IRROPS): rebooking at scale during a disruption

**Requirements & scale** — A six-hour DXB closure could affect **50,000-150,000 passengers** and create 100x normal rebooking demand. The goal is prioritized, safe recovery, not instant rebooking for everyone. Decision-support RTO should be <30 minutes; final seat assignment must be strongly consistent at the PSS.

**Architecture**
```text
[Ops disruption feed]
   -> [Affected passenger graph: PNR, connections, tier, SSRs]
   -> [Priority queue: tier, risk, special needs, fare rules]
   -> [Rules/optimization engine]
         |-> [PSS live inventory confirm]
         |-> [hotel/transport adapters]
         |-> [human agent workbench]
   -> [notifications: app/SMS/email/contact centre]
```

**Data & consistency** — Disruption work items track passenger group, original itinerary, candidates, priority, status and audit. The PSS owns final itinerary and inventory. Use a saga: propose itinerary, reserve/confirm in PSS, update work item, notify; compensate on failure.

**Scale & capacity** — Rebooking 100,000 passengers in two hours needs ~14 final passenger decisions/sec, but candidate evaluation may need hundreds/sec. Partition queues by disruption event and priority. Cache schedules/minimum connection data; confirm inventory live.

**Failure modes & resilience** — If automation cannot safely confirm, degrade to ranked suggestions for human agents. If notifications overload, prioritize confirmed changes and vulnerable/high-tier passengers. Run tooling in a secondary region because local disruption may coincide with operational stress.

**Trade-offs & alternatives** — Fully automated rebooking is unsafe for edge cases like visas, groups and special services. Manual-only cannot scale. Use automation for high-confidence cases and human workflow for exceptions.

**Follow-up answers** — Prevent double-booking by treating PSS commit as the only truth. Parallel engines may generate candidates, but final confirmation uses idempotency and optimistic concurrency; losers recompute.

**Key points:** burst queues, rules + human fallback, saga, degraded UX. **Red flags:** normal-load assumptions.

### Case 5 — Multi-region data residency & DR across UAE, EU and other jurisdictions

**Requirements & scale** — Classify systems by data and criticality: booking RTO 15-30 minutes, ledger/payment RPO near-zero, analytics RTO hours. UAE PDPL/TDRA, GDPR, PCI and IATA security mean not all data can be globally replicated.

**Architecture**
```text
[Regional operational systems]
      -> [classification policy: PII, PCI, loyalty, telemetry, anonymized]
            |-> [UAE resident stores]
            |-> [EU resident stores]
            |-> [tokenized/global views]
      -> [CDC/events with policy filters]
      -> [regional lakes + Purview catalog]
      -> [approved analytics/AI workspaces]
```

**Data & consistency** — Classification drives placement. Raw PII and PCI stay in approved regional stores; global products receive tokenized, minimized or aggregated data only with lawful basis. Strong consistency stays inside regional operational stores; cross-region data products are eventually consistent and governed.

**Scale & capacity** — Partition data by domain, region, subject jurisdiction and date. Use lifecycle policies to avoid replicating raw data forever. Policy enforcement at ingestion prevents later cleanup problems.

**Failure modes & resilience** — Fail over only to legally approved regions. If catalog/policy tooling is down, deny new high-risk movement rather than allow uncontrolled export. DR varies: active-active for stateless apps, active-passive for regulated stores, backup/restore for analytics.

**Trade-offs & alternatives** — Replicating everything everywhere improves recovery but violates minimization and increases breach blast radius. Fully isolating every country blocks global operations. The balanced design is regional ownership plus governed cross-border data products.

**Follow-up answers** — Prove compliance with Purview lineage, classification reports, access logs, storage region inventory, encryption/key evidence, DLP alerts and approved transfer records. Manual spreadsheets are not sufficient.

**Key points:** classification-driven placement, lawful transfer, Purview evidence. **Red flags:** global raw replication.

---

## Round 4 · Coding / technical deep-dive

**What they're testing:** Can you translate diagrams into correct idempotency, transaction, retry, versioning and locking patterns?

### Idempotent event consumer with processed-events and outbox

At-least-once delivery means duplicates are expected. Exactly-once business behavior is created by idempotency keys and transactional writes.

```csharp
public sealed record FlightCompletedEvent(
    string EventId, string FlightNumber, string TicketNumber,
    string MemberId, DateTimeOffset CompletedAt, string FareClass);

public sealed class AccrualConsumer
{
    private readonly SkywardsDbContext _db;
    private readonly IMilesCalculator _calculator;

    public async Task HandleAsync(FlightCompletedEvent e, CancellationToken ct)
    {
        var key = $"flight-completed:{e.EventId}:{e.MemberId}";
        await using var tx = await _db.Database.BeginTransactionAsync(ct);

        if (await _db.ProcessedEvents.AnyAsync(x => x.IdempotencyKey == key, ct))
        {
            await tx.CommitAsync(ct);
            return;
        }

        var miles = await _calculator.CalculateAsync(e.MemberId, e.FlightNumber, e.FareClass, ct);
        _db.LedgerEntries.Add(new LedgerEntry {
            Id = Guid.NewGuid(), MemberId = e.MemberId, SourceEventId = e.EventId,
            PointsDelta = miles, Type = "ACCRUAL", EffectiveAt = e.CompletedAt,
            PostedAt = DateTimeOffset.UtcNow, RuleVersion = _calculator.RuleVersion
        });
        _db.ProcessedEvents.Add(new ProcessedEvent { IdempotencyKey = key, ProcessedAt = DateTimeOffset.UtcNow });
        _db.OutboxMessages.Add(new OutboxMessage {
            Id = Guid.NewGuid(), Topic = "skywards.miles-credited",
            PayloadJson = JsonSerializer.Serialize(new { e.MemberId, Miles = miles, e.FlightNumber }),
            CreatedAt = DateTimeOffset.UtcNow
        });

        await _db.SaveChangesAsync(ct);
        await tx.CommitAsync(ct);
    }
}
```

```sql
CREATE TABLE processed_events (
  idempotency_key varchar(200) PRIMARY KEY,
  processed_at datetime2 NOT NULL
);
CREATE UNIQUE INDEX ux_ledger_source
ON ledger_entries(member_id, source_event_id, type);
```

An outbox publisher later sends unsent messages. If publishing fails, ledger correctness is preserved and publication retries safely.

### API versioning across an ART

Use additive changes first. For a breaking booking API change, publish v2 in APIM while v1 remains supported for a defined deprecation window. Add consumer contract tests, telemetry on v1 usage, a sunset date and an ADR naming consumers, risks and migration plan. The migration ends when old-version usage is zero or exceptions are approved.

### Circuit breaker around a flaky partner system

```python
import time
from enum import Enum

class State(Enum): CLOSED="closed"; OPEN="open"; HALF_OPEN="half_open"

class CircuitBreaker:
    def __init__(self, threshold=5, reset_after=30):
        self.threshold, self.reset_after = threshold, reset_after
        self.failures, self.opened_at, self.state = 0, None, State.CLOSED
    def allow_call(self):
        if self.state == State.CLOSED: return True
        if time.time() - self.opened_at >= self.reset_after:
            self.state = State.HALF_OPEN; return True
        return False
    def success(self):
        self.failures, self.opened_at, self.state = 0, None, State.CLOSED
    def failure(self):
        self.failures += 1
        if self.failures >= self.threshold:
            self.state, self.opened_at = State.OPEN, time.time()

def get_uld_status(uld_id, partner, cache, breaker):
    if not breaker.allow_call():
        return {"status": cache.get(uld_id), "stale": True, "source": "cache"}
    try:
        status = partner.fetch_uld_status(uld_id, timeout_seconds=2)
        cache.set(uld_id, status, ttl_seconds=900)
        breaker.success()
        return {"status": status, "stale": False, "source": "partner"}
    except Exception:
        breaker.failure()
        return {"status": cache.get(uld_id), "stale": True, "source": "cache"}
```

The fallback exposes staleness to operators. It avoids retry storms and uses half-open probes to recover gradually.

### Concurrency control for seat/ULD assignment

```sql
UPDATE seat_holds
SET status = 'CONFIRMING', version = version + 1
WHERE flight_id = @flight_id
  AND seat_number = @seat_number
  AND status = 'AVAILABLE'
  AND version = @expected_version;
```

If one row is updated, call the PSS with the same idempotency key. If the PSS confirms, mark confirmed with PSS reference; if it rejects, release and recompute. Optimistic locking is preferred for high-scale rebooking because pessimistic distributed locks reduce availability and can deadlock. For ULD assignment, use `uld_id + version` or a short-lived lease if conflict rates are high.

### Data modelling for an append-only ledger

```sql
CREATE TABLE skywards_ledger (
  ledger_id bigint identity primary key,
  member_id varchar(50) not null,
  entry_type varchar(30) not null,
  points_delta int not null,
  source_system varchar(50) not null,
  source_reference varchar(100) not null,
  effective_at datetime2 not null,
  posted_at datetime2 not null,
  rule_version varchar(30) not null,
  status varchar(20) not null,
  correlation_id varchar(100) not null
);
CREATE INDEX ix_ledger_member_effective ON skywards_ledger(member_id, effective_at, ledger_id);

SELECT COALESCE(SUM(points_delta), 0) AS balance_as_of
FROM skywards_ledger
WHERE member_id = @member_id
  AND status = 'POSTED'
  AND effective_at <= @as_of;
```

For scale, maintain monthly/member snapshots and replay later entries. Corrections are new entries, never destructive updates.

---

## Round 5 · Cloud & data architecture (Azure / hybrid)

**What they're testing:** Azure depth, hybrid-cloud judgment, cost/security/regulatory awareness and operating model maturity.

### AKS for a multi-tenant ART landscape

**Requirements & scale** — Five ARTs may share 50-100 services with different traffic, criticality and release cadences. The platform must isolate blast radius, enforce security, allocate cost and support independent delivery.

**Architecture**
```text
[Enterprise landing zone]
   |-> [Shared AKS cluster: standard workloads]
   |       namespaces per ART, quotas, network policy, workload identity
   |-> [Dedicated AKS cluster: PCI/critical booking workloads]
   |       stricter blast radius and change windows
   |-> [Shared services: ACR, Key Vault, Monitor, Defender, Policy, APIM]
```

**Data & consistency** — AKS is not the data boundary. Data classification decides whether a workload can share infrastructure. Secrets come from Key Vault and Workload Identity, not long-lived Kubernetes secrets. Network policies prevent namespace lateral movement.

**Scale & capacity** — Use HPA/KEDA, node pools by workload class, namespace quotas and mandatory labels: ART, service, environment, owner, cost center. Export usage to Cost Management/FinOps dashboards. Critical services may need reserved capacity; batch/worker services can scale to zero or use spot where safe.

**Failure modes & resilience** — Noisy neighbors, bad cluster upgrades and shared ingress failures are real risks. Shared clusters are cheaper but increase blast radius; cluster-per-ART improves isolation but increases cost, drift and operational burden. The balanced design is shared clusters for standard workloads and dedicated clusters for PCI/mission-critical/regulatory domains.

**Trade-offs & alternatives** — Namespace-per-ART is cost-efficient but weaker isolation. Cluster-per-ART is safer but expensive. Serverless may fit bursty simple workloads, but long-running adapters and complex networking often favor AKS.

**Follow-up answers** — If one ART needs a risky platform change, isolate through a separate ingress/node pool/cluster or staged rollout. Do not impose one ART's risk on all tenants.

### APIM as the enterprise integration front door

**Requirements & scale** — Expose booking, cargo and loyalty APIs to partners, channels and internal teams with OAuth/OIDC, per-partner quotas, versioning, schema validation, correlation IDs and audit. Design for thousands of calls/sec in peaks and controlled B2B traffic.

**Architecture**
```text
[Partners/channels]
   -> [Front Door/WAF]
   -> [Azure API Management]
        products, subscriptions, quotas, versions, validation, transformations
   -> [Booking APIs | Cargo ONE Record adapters | Skywards partner APIs]
```

**Data & consistency** — APIM owns contracts and policy, not business state. It validates NDC/ONE Record-shaped payloads, masks sensitive logs and propagates correlation IDs. Business commits remain in domain services.

**Scale & capacity** — Regional APIM instances behind Front Door improve latency and resilience. Use products/subscriptions to isolate partner traffic. Cache only safe reference data, not booking commit responses.

**Failure modes & resilience** — Misbehaving partners are throttled without harming others. Backend degradation should produce controlled errors and retry-after responses. APIM policy is code and must deploy through CI/CD rings.

**Trade-offs & alternatives** — Direct integration is cheaper but creates inconsistent auth and versioning. Service mesh helps east-west traffic but does not replace partner API product management. APIM adds cost and latency but gives governance and partner isolation.

**Follow-up answers** — Breaking changes use parallel v1/v2 products, contract tests, telemetry and deprecation windows. Exceptions are documented in ADRs.

### Data Lake + governance

**Requirements & scale** — Feed revenue management, crew optimization, personalization and AI from operational systems while satisfying UAE/EU/PCI obligations. Expect TB-scale history, mixed batch/streaming, and audit-grade lineage.

**Architecture**
```text
[Operational systems: booking, loyalty, cargo, crew, payments]
        -> [CDC/events + batch ingestion]
        -> [Bronze raw zone by region/classification]
        -> [Silver conformed data products]
        -> [Gold analytics/AI features]
[Purview/catalog] <-> classification, lineage, owners, access approvals
```

**Data & consistency** — Operational systems remain sources of truth. Lake zones have data contracts, schema quality gates and classification labels. EU passenger data remains in EU-approved stores unless minimized/tokenized under approved transfer. PII access is RBAC/ABAC-controlled.

**Scale & capacity** — Partition by date, region, domain and classification. Use streaming only for low-latency use cases; batch is cheaper for planning and training. Lifecycle raw data to reduce cost and risk.

**Failure modes & resilience** — Schema drift or bad data can poison ML. Use schema registry, quality checks, quarantine zones, freshness indicators and lineage-based rollback. If access policy fails, fail closed and require governed access workflow.

**Trade-offs & alternatives** — A single global lake is simple but risky for residency. Fully isolated lakes reduce risk but fragment analytics. Federated domain-owned data products with central catalog is the staff-level compromise.

**Follow-up answers** — Auditor evidence should be generated by architecture: Purview lineage, access logs, storage region inventory, classification, DLP and approval records. This is a direct place to cite the candidate's Purview/UAE governance work.

### Hybrid/multi-cloud reality

**Requirements & scale** — Azure for core digital/AI and AWS for some cargo/loyalty is plausible public context. The goal is governed placement, not cloud-agnostic fantasy.

**Architecture**
```text
[Cloud placement policy]
   data residency | latency | vendor adjacency | managed service fit | skills | cost | exit strategy
        |-> [Azure landing zones: AKS, Azure AI, SQL/Cosmos, Entra, DevOps]
        |-> [AWS landing zones: selected cargo/loyalty workloads]
        -> [Common controls: identity federation, observability, tagging, security baselines, ADRs]
```

**Data & consistency** — Each workload has one system-of-record decision. Cross-cloud replication is explicit, classified and minimized. Normalize identity, logging schema, tags, incident process and cost reporting.

**Scale & capacity** — Do not make every service portable at the cost of losing managed-service value. Standardize the control plane, not the entire data plane. Include egress and latency in ADRs.

**Failure modes & resilience** — Multi-cloud reduces some vendor concentration risk but increases IAM, networking, secrets, cost and ownership complexity. Landing-zone standards and a platform council are mandatory.

**Trade-offs & alternatives** — Single-cloud is simpler; full cloud-agnostic abstraction becomes least-common-denominator. Right-cloud-per-workload with shared governance is the realistic answer.

**Follow-up answers** — Every major workload gets a cloud-placement ADR: candidate clouds, data class, managed services, DR, cost, team skills and exit plan.

### Well-Architected review

**Requirements & scale** — Review the reservation orchestration service against explicit SLOs: search p95, booking-confirmation p95, PSS adapter error budget, RTO/RPO, PSS quota ceilings, PCI scope and cost per confirmed booking. The output must be a risk/action register, not a generic maturity score.

**Architecture**
```text
[Well-Architected review]
   |-> reliability tests: PSS outage, regional failover, retry storm
   |-> security review: identity, secrets, PCI boundary, threat model
   |-> cost review: AKS/APIM/cache/telemetry unit cost
   |-> operations review: runbooks, dashboards, release rings
   |-> performance review: cache hit rate, partitioning, vendor quotas
        -> [prioritized backlog + ADR/runway items]
```

**Data & consistency** — The review checks whether cached availability is clearly separated from PSS-confirmed booking truth, whether payment/PSS ambiguity has a reconciliation model, and whether outbox events are idempotent. It also verifies that logs do not leak PCI/PII and that audit events are retained according to policy.

**Scale & capacity** — Load tests should model flash-sale read traffic, booking-write peaks and PSS rate limits. Cost analysis should include APIM calls, AKS node utilization, Redis hit ratio, Event Hubs throughput units, Cosmos RU/s if used, and telemetry volume.

**Failure modes & resilience** — Test PSS outage, APIM policy failure, cache outage, regional failover, Event Hubs backlog, payment timeout and identity-provider blips. Each failure needs an expected degraded behavior and runbook.

**Trade-offs & alternatives** — Active-active everywhere may be too expensive and misleading if PSS writes are single-authority. Conversely, single-region orchestration may be cheaper but weak for global resilience. The review should recommend the least-cost design that still satisfies business RTO/RPO and correctness.

**Follow-up answers** — For PI planning, convert findings into enabler work: circuit breakers, reconciliation automation, cost tagging, dashboard gaps, DR test automation and ADR updates, each with owner and due date.

---

## Round 5B · Full-stack reference architecture (edge → database)

**Requirements & scale** — Passenger booking needs global latency, high read/search throughput, lower but critical writes, PCI isolation and graceful degradation. Search can be eventual; booking/payment commits must be correct. Size for thousands of reads/sec and hundreds of writes/sec during peaks.

**Architecture**
```text
[Browser/mobile]
 -> [Azure Front Door/CDN/WAF/DDoS]
 -> [APIM: auth, quotas, versioning]
 -> [Booking BFF/API on AKS]
      |-> [Redis availability cache]
      |-> [Booking orchestration]
             |-> [PSS adapter / Altéa RES+INV]
             |-> [Payment provider / PCI boundary]
             |-> [Canonical request store]
      |-> [Outbox -> Event Hubs]
             |-> [Skywards, notifications, data lake/Purview]
[Entra workload identity] + [Azure Monitor/App Insights/ADX]
```

**Data & consistency** — Search results are cached hints. Booking confirmation is strong at PSS commit. Payment is a saga: authorize, confirm PSS, capture; on failure, void or reconcile. Events to loyalty and analytics are eventual and idempotent.

**Scale & capacity** — Edge/CDN absorbs static and cacheable content. APIM quotas protect downstream. AKS scales BFF, orchestration and adapter workers separately. Redis reduces repeated search traffic. Event partitions use booking reference to preserve order. Cosmos is suitable for distributed read/session models; Azure SQL is suitable for transactional request/idempotency state.

**Failure modes & resilience** — Front Door routes around regional front-end failures. APIM policy mistakes must be caught by CI/CD and staged rollout. PSS degradation triggers controlled checkout degradation. Payment/PSS ambiguity goes to reconciliation queues. Data lake failure must not block booking. Observability outages should alert but not stop customer traffic.

**Trade-offs & alternatives** — Serverless can lower cost for spiky simple flows but may be harder for long-running sagas and complex adapters. Direct PSS calls are cheaper but fragile. Multi-region is appropriate for edge/stateless/read paths; write paths may be active-passive because the PSS is authority.

**Follow-up answers** — “Active-active” means active-active front door, stateless APIs and reads; it does not mean inventing multi-master booking inventory if the PSS is single authority.

---

## Real-world case studies — how airlines & partners actually solve this

- **Emirates + Microsoft Azure.** Public partnership context supports Azure-first digital/AI discussion: AKS, SQL/Cosmos, Azure AI, DevOps and Entra. Use it to justify Azure fluency, not to claim internal topology.
- **Emirates SkyCargo + IBS Software (OneCargo).** A credible modernization pattern: modular cargo domains and standards-based integration rather than reckless big-bang replacement. Use it for bounded contexts, partner APIs and ONE Record.
- **Amadeus Altéa.** The canonical example of specialized vendor PSS: orchestrate around it with anti-corruption layers, idempotency and source-of-truth boundaries.
- **Industry IRROPS patterns.** Airlines commonly combine rules engines, optimization, human workbenches and customer notification during disruption. Use as industry analogy, not Emirates-specific claim.
- **Candidate mapping.** Connected vehicles map to telemetry/cargo events; UAE government governance maps to PDPL/GDPR/Purview; production RAG/agents map to customer assistants and document intelligence.

---

## Round 6 · AI/ML & MLOps (aviation-specific)

**What they're testing:** Can you apply production AI responsibly to aviation, not just demo GenAI?

**Dynamic pricing / revenue management.** Treat ML as a recommendation engine, not an uncontrolled fare setter. Demand signals, search traffic, booking velocity, seasonality, inventory and approved competitive signals feed feature pipelines. Guardrails bound changes by route/fare class, require human approval above thresholds, log model version/features/approver and support rollback. This maps to the candidate's model-governance and cost-governance instincts.

**Predictive maintenance.** Architecturally similar to connected-vehicle telemetry: high-volume time-series ingestion, partition by asset, feature extraction, anomaly scoring, work-order integration and drift monitoring. The aviation difference is safety and maintenance-procedure governance. Models support engineering decisions; they do not bypass approved maintenance processes.

**Document intelligence for cargo/customs.** Airway bills, certificates, invoices and dangerous-goods documents are OCR/extraction plus compliance validation. Use Document Intelligence, confidence thresholds, human review and audit logs with model version and extracted fields. Retain raw documents only as policy allows. This directly maps to invoice-intelligence, procurement RAG and Purview experience.

**Customer-facing GenAI.** Use RAG over approved fare rules, refund policy and disruption documents with citations, not unconstrained model memory. Tool calls are authorized, deterministic and auditable. Guardrails include retrieval filters, prompt-injection defenses, confidence thresholds, red-team tests, human escalation and transcript/model-version logging. A hallucinated refund answer is an incident.

**MLOps governance at enterprise scale.** Models need owners, risk tiers, approval gates, model registry, evaluation harness, drift monitoring, data-quality contracts, rollback and Responsible AI review. These become architecture runway items so teams can ship AI safely rather than reinvent controls.

---

## Round 6B · Agentic AI, LLM & MCP engineering depth

**What they're testing:** Emirates Group IT increasingly hires architects against a *GenAI/Agentic AI* skills bar (agents, orchestration, RAG, vector search, MCP, guardrails, evaluation, LLMOps) on top of the aviation architecture bar in Rounds 3–5. Round 6 above is the *applied aviation* view; this round is the *engineering depth* view. If the role you're interviewing for is AI-weighted, work through the full **Agentic AI Solution Architect** guide on this site — this section is the aviation-contextualised summary.

### Agentic AI & multi-agent workflows

**Q: When does an airline problem justify an agent instead of a deterministic workflow?** Use a deterministic workflow when the steps are known and stable — fare quote, payment capture, ticket issue. Use an agent when the *path* is unknown at design time but the *tools* are bounded: an IRROPS ops copilot that must inspect a disrupted PNR, check re-accommodation options, look up hotel/duty rules and draft a recommendation. Rule of thumb: agency buys you branching you can't enumerate; it costs you determinism, latency, token spend and auditability. If you can enumerate the branches, don't pay for an agent.

**Q: How would you structure a multi-agent system for cargo document processing?** Supervisor/orchestrator over specialists: an *extraction* agent (AWB, invoice, dangerous-goods declaration), a *compliance* agent (customs/DGR rule checks), a *reconciliation* agent (match against the booking) and a *human-review* handoff. Agents communicate through a typed shared state, not free-text chat. Hard caps: max steps, max tool calls, wall-clock and token budget, plus a terminating condition — an unbounded agent loop is a production incident and a cost incident at the same time.

**Q: Planning & reasoning patterns you'd actually use.** ReAct for tool-using single agents; plan-and-execute when the task decomposes cleanly and you want the plan reviewable before it runs (useful when a human approver must see the plan); reflection/critic loops for document extraction quality; routing/handoff for a supervisor topology. State the failure mode of each: ReAct loops, plan-and-execute plans go stale mid-run, reflection doubles cost.

**Q: Memory design.** Separate short-term (turn/session state — conversation buffer, tool results), long-term semantic (vector-indexed prior interactions, retrievable), and episodic/operational (durable case state in a real datastore, e.g. the disruption case record). Never let PNR or passenger PII sit in a shared long-term vector memory without classification, TTL and per-user retrieval filters. Memory is a data-governance surface, not a convenience feature.

**Q: Human-in-the-loop.** Design approval as an architectural checkpoint, not a UI afterthought: the agent produces a *proposal* (rebooking option, fare adjustment, refund eligibility) with evidence and confidence; a policy layer decides auto-approve / approve-with-human / block by risk tier and value threshold; the approver's identity, the proposal and the decision are logged immutably. In aviation, anything that spends money or touches safety/entitlement is human-approved above a threshold.

### LLMs & prompting

Capabilities/limits framing: LLMs are strong at language transformation, extraction, summarisation and tool selection; weak at arithmetic, freshness, and any claim not present in the context. **Structured outputs** (JSON schema / constrained decoding) for anything a downstream system consumes — never regex-parse prose. **Function/tool calling** for actions, with the tool contract as the trust boundary: validate arguments server-side, authorise per-user, and make the tool itself idempotent (same `idempotency_key`, same result) because the model *will* retry. **Context management**: budget the window explicitly (system + policy + retrieved chunks + history), compress history by summarisation, drop rather than truncate mid-document. **Model selection** is an architecture decision with an ADR: small/cheap model for classification and routing, frontier model for reasoning-heavy synthesis, and a documented fallback when a region or deployment is unavailable.

### LLM orchestration frameworks

Be able to compare, not just name: **LangChain** (broad integrations, easy start, weaker on long-running control flow), **LangGraph** (explicit graph/state machine, durable checkpoints, best fit when you need resumable, auditable agent runs), **Semantic Kernel** (strongly .NET/Azure-aligned, plugin + planner model, natural fit for a Microsoft-heavy enterprise), **AutoGen** (conversational multi-agent research/experimentation), **CrewAI** (role/task framing, quick to demo). The senior answer is that the framework is replaceable and the *architecture* is not: keep prompts, tool contracts, evaluation harness and state schema outside the framework so a framework swap is a refactor, not a rewrite. Say which you'd choose and why — e.g. LangGraph or Semantic Kernel for a governed enterprise workflow that needs checkpointing and approval gates.

### RAG pipeline design

Ingestion (policy manuals, fare rules, tariff/customs docs, engineering manuals) → parsing/layout-aware extraction (tables in a DGR or tariff document break naive text splitters) → **chunking** (structure-aware by heading/clause with overlap, beats fixed-size; keep the clause identifier in metadata so you can cite "Fare rule 16.2") → **embeddings** (domain-appropriate model, versioned — changing the embedding model means a full re-index) → **vector search** (hybrid: BM25/keyword + vector, because fare codes, AWB numbers and airport codes are lexical, not semantic) → **reranking** (cross-encoder or semantic reranker over top-k to fix recall/precision trade-off) → **context optimisation** (dedupe, order by relevance, budget tokens) → **grounded generation** with mandatory citations and an explicit "not in policy" refusal path. Metadata filters carry entitlement: cabin, market, language, effective-date, and *who is allowed to see this document*. Freshness matters more than cleverness — a correct answer from a superseded fare rule is still a wrong answer, so version and effective-date every chunk.

**RAG vs fine-tuning:** RAG for knowledge that changes (policy, fares, schedules) and needs traceability; fine-tuning for stable format/tone/task shaping; almost never fine-tune to inject facts.

### Vector databases & knowledge retrieval

**Azure AI Search** is the natural default in an Azure-aligned Emirates landscape: hybrid search, semantic reranker, security trimming, and integrated indexers — the security-trimming/filter story is usually the deciding factor in an enterprise. Alternatives: **pgvector** when the corpus is modest and you already run Postgres (one datastore, transactional consistency between metadata and vectors), **Pinecone/Weaviate/Milvus** for very large dedicated vector workloads, **FAISS** for in-process/offline experimentation and benchmarking, not as a governed production store. Selection criteria to state out loud: filtered-search quality, hybrid support, scale/latency at p95, multi-tenancy and access control, data residency (UAE/EU), operational burden, and cost per million vectors. Write it as an ADR with a PoC against representative data — not a vendor preference.

### Model Context Protocol (MCP)

MCP standardises how an AI client discovers and calls **tools**, reads **resources** and uses **prompts** from a server, so capabilities aren't re-implemented per agent or per framework. The enterprise argument: one governed MCP server per bounded context (a *booking* server, a *loyalty* server, a *cargo docs* server) gives you a reusable, versioned capability layer across ARTs instead of five teams writing five bespoke tool integrations. Architectural cautions to raise unprompted: MCP servers are a new privilege boundary — authenticate the caller, propagate *user* identity (not just a service principal) so entitlement checks are real, allow-list tools per agent, validate every argument, rate-limit, and treat tool descriptions themselves as untrusted input (tool-description injection is a real attack). Version tool schemas like APIs and log every invocation with correlation IDs.

### AI tool integration with enterprise systems

Agents reach the Emirates estate the same way any client does — through the **anti-corruption layer and APIM**, never straight into a vendor PSS. Wrap existing REST/GraphQL/SDK capabilities as narrow, well-described tools with explicit schemas; keep write-tools idempotent and scoped; use event-driven integration (Event Hubs/Service Bus) for anything long-running so the agent isn't holding a synchronous connection through a 30-second partner call. Rate limits, circuit breakers and timeouts from Round 4 apply unchanged — an agent is just a very enthusiastic, occasionally confused API client.

### Guardrails & Responsible AI

Layer them: **input** (PII detection/redaction before the prompt, prompt-injection classifiers, jailbreak patterns, topic scoping), **retrieval** (entitlement filters so the index can't leak another market's or another passenger's documents), **tool** (allow-list, argument validation, authorisation on the *user's* identity, spend/action thresholds), **output** (content filtering, groundedness/citation check, schema validation, policy-claim verification), **process** (human approval above risk thresholds, kill switch, immutable audit trail, red-team suite in CI). Indirect prompt injection is the one to name: a malicious instruction embedded in an uploaded customs document or an email the agent reads. Mitigation is defence in depth — never treat retrieved content as instructions, separate data from instruction channels, and make destructive tools require confirmation. Map it to a recognised frame (NIST AI RMF, EU AI Act risk tiers, Microsoft Responsible AI) plus UAE PDPL for personal data.

### Evaluation & observability

Evaluate at three levels: **retrieval** (recall@k, precision, citation coverage), **generation** (groundedness/faithfulness, answer relevance, refusal correctness, safety), **task/agent** (end-to-end task success, tool-selection accuracy, steps-to-completion, cost per resolved case). Build a golden dataset from real policy questions with SME-approved answers; run it in CI so a prompt or model change is gated like a code change; add LLM-as-judge with a human-calibrated sample, never judge-only. **Hallucination detection** in production: groundedness scoring against retrieved context, citation-required outputs, and abstention when confidence or retrieval score is low. **Observability**: OpenTelemetry-style distributed tracing where a trace spans the whole agent run — every LLM call, tool call, retrieved chunk, token count and latency — plus dashboards for cost/request, p95 latency, refusal rate, escalation rate and drift. Close the loop with user feedback (thumbs, escalation reasons, agent-handoff transcripts) feeding the golden set. Define the KPIs with the business up front: containment rate, first-contact resolution, cost per contact, and *no increase* in wrong-policy answers.

### Performance & cost optimisation

Levers in the order you should apply them: route to the smallest model that passes evals (classification/routing on a small model, synthesis on a large one); cache aggressively (exact-match response cache, semantic cache, prompt/prefix caching, and cached embeddings — re-embedding an unchanged corpus is pure waste); trim context (rerank then truncate rather than stuffing top-50 chunks); stream tokens to cut *perceived* latency; parallelise independent tool calls; batch offline workloads; cap agent steps. Then the aviation framing: express it as **cost per resolved contact** or **cost per document processed** against the human baseline, with a p95 latency SLO and a quality floor — an optimisation that breaks the eval suite isn't an optimisation. Provisioned/PTU capacity vs pay-as-you-go is a genuine FinOps trade-off to raise for predictable high-volume workloads.

### Python, FastAPI & software engineering

Expect to defend production Python, not notebooks: **FastAPI** for the service layer (async I/O — LLM and vector calls are I/O-bound; Pydantic models as the schema contract shared with structured outputs; dependency injection for auth and clients; background tasks or a real queue for long-running agent runs; SSE/WebSocket for streaming). Add: typing everywhere, `ruff`/`mypy` in CI, `pytest` with recorded LLM fixtures so tests are deterministic, structured logging with correlation IDs, connection pooling and retry-with-jitter on model endpoints, and graceful degradation when a model region is throttled (429 → fallback deployment).

### Cloud AI platform (Azure) & data

**Azure AI Foundry** for model catalogue, deployments, prompt flow, evaluation and content safety; **Azure OpenAI** for governed model access with private networking, managed identity and regional/residency control; **Azure AI Search** for hybrid retrieval with security trimming; **Azure Machine Learning** for classical ML lifecycle (the pricing/predictive-maintenance models in Round 6), registries and pipelines; **Databricks/Fabric** where the enterprise lakehouse and feature engineering live. Data-engineering framing: ingestion from PSS/loyalty/cargo/ops sources, batch plus streaming (Event Hubs), medallion-style curation, contracts and quality gates on the tables that feed features and knowledge indexes, and Purview for lineage/classification — because a knowledge index inherits every governance obligation of its sources.

### LLMOps, containers & security

CI/CD for AI assets: **prompts, tool schemas, index configuration, embedding model version and evaluation datasets are all versioned artefacts** in Git, promoted dev→test→prod with the eval suite as the release gate; index rebuilds are blue/green with an alias flip so a bad re-index is a one-line rollback; canary a new model deployment behind a routing flag with online quality/cost monitoring. Package agents and RAG services as containers (**Docker**) on **AKS** or Container Apps with HPA/KEDA (queue-depth scaling suits bursty agent load), managed identity for every dependency, secrets in Key Vault (never in prompts or env dumps), private endpoints to model/search/data planes, egress control, and network isolation for anything touching PNR/payment data. Security posture to state: authenticate the user, authorise per tool, propagate identity end-to-end, encrypt in transit and at rest, classify before choosing a region, and log immutably for audit.

### Architecture & technical leadership for AI

The staff-level answer: publish the reference architecture (ingestion → index → retrieval → orchestration → guardrails → observability), ship a golden-path template so teams don't reinvent guardrails, define AI-specific review gates (data classification, eval results, red-team results, cost model, human-approval design) as part of the existing ADR/architecture-board process, tier governance by risk so a low-risk internal summariser doesn't need the same gate as a customer-facing entitlement assistant, and stay hands-on in code and evaluation reviews. Business-value framing throughout: which use case, what KPI, what it costs, what the failure mode is, and who approves it.

---

## Round 7 · Architecture leadership (ARTs, runway, governance)

**What they're testing:** Can you operate the SAFe/ART machinery in the JD?

**Architecture runway.** Runway contains enablers needed in the next one or two PIs: identity patterns, API contracts, observability, PSS adapter hardening, data-model changes, platform upgrades and risk-reduction spikes. If no committed feature depends on it, keep it as exploration, not production runway. In PI planning, make runway visible as enabler features with acceptance criteria.

**ADR discipline.** Write ADRs for decisions that are hard to reverse, cross team boundaries, affect NFRs, change standards, create compliance/security impact or intentionally deviate from reference architecture. Include context, options, decision, consequences, cost, security/compliance, owner and review date. Deviations need expiry and remediation.

**Technical debt as an enabler.** Translate debt into business risk: incident probability, lead-time drag, cloud waste, security exposure or blocked features. “Add circuit breaker to PSS adapter” is not cleanup; it is flash-sale resilience. Put it in the Program Backlog as an enabler with measurable outcome.

**Vendor/PoC governance.** A PoC answers a decision question. Define success criteria upfront: latency, security, data residency, cost, operations, integration, failure modes and exit strategy. Use representative data and load. The output is an ADR: adopt, reject or defer.

**Cross-ART consistency without authority.** Map actual contracts and pain, define a target pattern, stop further divergence and migrate high-risk paths first using adapters/strangler layers. Do not force an immediate rewrite unless risk demands it. Durable artifacts are ADRs, API standards, diagrams and review checklists.

---

## Round 8 · Behavioral / STAR

- **Tell me about a time you delivered under significant ambiguity.** **Situation:** UAE government data-sovereignty requirements were initially unclear across two entities. **Task:** Create a defensible modernization/governance approach. **Action:** Clarified data classes, integration boundaries, SQL target architecture and Purview-style lineage/access evidence; aligned stakeholders through diagrams and decision records. **Result:** Ambiguity became an executable architecture with compliance evidence.
- **Describe a time your architectural recommendation was rejected by leadership.** **Situation:** Leadership may choose a cheaper or faster option. **Task:** Preserve trust while making risk visible. **Action:** Quantify outage/compliance/cost trade-offs in an ADR with alternatives and accepted risk. **Result:** Even if the recommendation is not chosen, the organization has traceability and a review trigger instead of hidden disagreement.
- **Tell me about mentoring a team through a difficult technical transition.** **Situation:** Teams moving into AI/GenAI or Python delivery need production patterns. **Task:** Raise capability without becoming the bottleneck. **Action:** Use AI Apprentice/Mastery-style enablement, reference implementations, office hours, evaluation templates and code reviews. **Result:** Engineers become independently productive and quality becomes repeatable.
- **Describe managing conflicting priorities across multiple concurrent client engagements.** **Situation:** Fortune 500 and government engagements can overlap. **Task:** Protect commitments and architecture quality. **Action:** Prioritize by risk, deadline, dependency and business impact; communicate trade-offs early; split runway from feature work; delegate with clear decision rights. **Result:** Delivery continues without silent overcommitment.
- **Tell me about a production incident you owned end-to-end, including the postmortem and what changed afterward.** **Situation:** A connected-vehicle platform at **20M+ vehicles** and **~2M msgs/min** can create large operational incidents. **Task:** Restore service and reduce recurrence. **Action:** Run incident command, stabilize ingestion with backpressure/bulkheads, communicate, identify root cause and produce a blameless postmortem. **Result:** Durable actions include partitioning fixes, alerts, replay tooling, runbooks and improved SLO dashboards.

---

## Round 9 · Executive / bar-raiser

**What they're testing:** Strategic judgment, build-vs-buy, cost discipline and realistic AI vision.

**If you had 90 days as the new Solutions Architect for a portfolio, what would your first three moves be?** First, baseline architecture: C4 views, ownership, data flows, SLOs, incident history, cloud spend, security and current ADRs. Second, align with Product, RTEs, EA and operations on the top three risks. Third, turn those risks into visible runway enablers for the next PI. Do not arrive with a prebuilt “Microsoft answer”; start with evidence.

**Build vs. buy: when would you recommend Emirates build in-house vs buy/extend a vendor platform?** Buy/extend specialized industry commodity capabilities such as PSS core inventory/ticketing/DCS or mature cargo platform components. Build where Emirates differentiates: customer experience, orchestration, AI/data products, partner experience, operational decision support and governance. The anti-corruption layer is the compromise: use vendor depth while preserving Emirates-owned agility.

**How do you defend an architecture decision's cost to a CFO who only sees the invoice?** Translate cost into risk-adjusted business value: avoided outage, lower MTTR, compliance evidence, partner isolation and unit cost per transaction. Show alternatives considered, including cheaper options rejected or accepted. Also identify overbuild honestly; not every workload deserves active-active.

**Where do you think generative AI and agentic systems genuinely change airline operations in the next 3 years, versus where it's hype?** Real value is constrained knowledge work: policy-grounded customer service, cargo document intelligence, engineering knowledge search, ops copilots and developer productivity. Hype is unconstrained agents making pricing, refund, safety or rebooking decisions without deterministic controls. Aviation AI must be grounded, auditable, reversible and policy-bound.

**How would you structure architecture governance so it accelerates delivery instead of becoming a bottleneck for five ARTs?** Pre-solve common decisions through reference architectures, templates, landing zones, API standards and observability packages. Use risk-tiered governance: golden path for low-risk changes, peer review for medium risk, architecture board with SLA for high-risk data/security/PSS/cost decisions. Track exceptions openly.

---

## Interview strategy & negotiation playbook

The rounds above prepare *what* you'll say. This section is the *how* — the meta-game of positioning yourself at senior/principal altitude (Emirates uses a **Grade** system; a 14-year cross-domain architect should be aiming at the **Grade 9 / senior IC band**, not the entry Grade 8 Solution Architect), controlling each phase, and closing the offer. Every script below is written in **your** voice and mapped to **your résumé**, so you can say it as-is.

### Phase 1 — Recruiter screen: confirm the budget, plant the "senior" seed

**Objective:** find out the grade/budget early and anchor yourself one level up before assessments lock you in.

**Grading seed (say this on the first call):**
> "I understand the title is Solutions Architect. Given my 14 years leading cross-domain architecture — including a 20-million-vehicle platform at ~2M messages a minute and a UAE-government data-sovereignty programme — I'm targeting a **senior individual-contributor package (Grade 9-equivalent)**. Is this role budgeted to accommodate that experience level, or is the grade assessed during the loop?"

**Read the answer:**
- *"Strictly Grade 8"* → decide consciously whether the total package still works; pivot to maxing the band + sign-on/relocation later (Phase 5).
- *"Grade is assessed on the interview"* → you're green-lit; now your job is to *perform at Grade 9* in every round (scope, governance, mentoring language — not just code).

**Your elevator pitch (résumé-anchored):**
> "I'm a hands-on architect who doesn't just design — I own delivery. For 14 years I've closed the gap between 'PowerPoint architecture' and shipped code: I owned a 98–99% SLA on a connected-vehicle platform at aviation-comparable scale, modernised regulated UAE-government data into governed SQL with Purview lineage, and shipped production GenAI/RAG systems on Azure AI Foundry. I design it, I govern it, and I make sure it actually lands in production."

**Key points:** anchor the grade in round one; lead the pitch with *ownership + delivery + a number*. **Red flags:** accepting the entry grade by default; a pitch that's all design and no delivery.

### Phase 2 — Technical assessment: prove "Emirates scale" with principal-level twists

**Objective:** on the case study (take-home or whiteboard) don't just draw microservices — show the *migration risk, consistency and resilience* thinking a principal brings. These map directly to Round 3's worked cases above; here's how to frame each to score senior:

- **Booking-engine modernisation (monolith → microservices, zero downtime).** Lead with **strangler fig** (route a growing % behind a façade, never a big-bang), **SAGA** for split-brain/distributed transactions during dual-run, **distributed tracing (OpenTelemetry)** so you can prove parity, and **idempotency** so retries across old/new paths never double-book. Tie to your résumé: *"I ran exactly this incremental-cutover discipline when I owned the 98–99%-SLA platform — you migrate behind a façade and reconcile against a single source of truth."* (See Round 3 Case 1 + Deeper "zero-downtime migration".)
- **Loyalty / 3rd-party partner integration (Skywards + hotel partner).** Lead with **OAuth2/OIDC** for partner trust, **circuit breakers + timeouts** for when the partner API is slow, **idempotency keys** to stop double points accrual, and an **append-only ledger** for auditable settlement between two companies. (See Round 3 Case 2 + the ledger/idempotency code in Round 4.)
- **High-volume "mega sale" (system crashes at 50% off launch).** Lead with a **virtual waiting room / queue + backpressure**, **CDN edge caching** of static assets, **read-replicas + Redis** to protect the write path, and **cache-then-confirm** so you never sell a stale price. Tie to résumé: *"Burst load is the connected-vehicle problem — you queue and shed, you don't assume linear autoscale."* (See Round 3 Case 4 + Scenario 2.)

**Study/verbal checklist to have on the tip of your tongue:** Strangler Fig · SAGA · Circuit Breaker · CQRS · Idempotency · Outbox · Kafka (async) · Redis (cache) · Kubernetes (scale) · OpenTelemetry (trace).

**Key points:** every case = *pattern name + why + failure mode + a résumé tie-in*. **Red flags:** drawing boxes with no migration/consistency/resilience story.

### Phase 3 — The technical grill: survive the "why", bridge the stack

**Objective:** answer "why", and bridge Emirates' actual engineering stack to your Azure/.NET depth without faking Java experience.

**The coding-question trap — answer at Grade 9, not junior:**
> "I can write this in Python or C#. Before I do — what are the latency and consistency constraints, is this a real-time service or a batch job, and what's the expected throughput? That changes the data structure and the error-handling." *Then* write it.

**Bridge the stack honestly.** Emirates Group IT is a well-known **Java / Spring Boot** shop with **React/Angular** front-ends, **Kafka** messaging, and **Oracle / Couchbase / MongoDB** data stores — that's the environment you'd operate in. Your résumé is **Azure / .NET / C#**. Don't bluff Java seniority; bridge it:
> "My production depth is .NET and Azure, but the *architecture* is stack-agnostic — Kafka is Event Hubs, Spring Boot services are the same bounded-context microservices I've designed on AKS, Couchbase/Mongo are the same document-store consistency trade-offs I make with Cosmos DB. I ramp on Spring quickly because I've made these exact design decisions; the syntax is the smallest part."

This is credible *because* your guide already reasons in patterns (outbox, circuit breaker, optimistic locking) that are identical across both stacks.

**Killer question to ask *them* (shows leadership):**
> "How does Emirates handle **architecture drift** today — when production code no longer matches the design documentation or the ADRs? That's a problem I've fixed before with golden paths and design-time review gates, and I'd want to know how much of my first 90 days goes there."

**Key points:** clarify constraints before coding; bridge stacks via patterns, not bluffing; ask a question that positions you as the person who *fixes* drift. **Red flags:** coding instantly; pretending to be a Java expert; no questions for them.

### Phase 4 — Behavioral & leadership: be senior, safe, and diplomatic

**Objective:** prove "influence without authority", sound judgment under conflict, and customer obsession — the Grade 9 differentiators. Full STAR answers live in Round 8; here are the three the grade hinges on, in your voice:

- **Influence without authority (change a team's tech stack):**
> "I didn't mandate it. On the procurement platform, leadership leaned toward fine-tuning; I built a scoped **PoC comparing RAG vs fine-tuning** on accuracy, cost and freshness, showed the numbers, and let the team *discover* the win themselves. We adopted RAG where it won — decision by evidence, not authority. That's how I move teams I don't manage."

- **Conflict / risk (a PM wants to skip a security review to hit a date):**
> "I don't block emotionally — I make the risk *business-legible*: 'skipping this exposes us to a potential compliance finding and X hours of downtime risk; here's the cost.' Then I put the decision where it belongs — I document it as a **tracked exception with a named owner and a remediation date**, so whoever accepts the risk accepts it on record. Nine times out of ten, once it's explicit and owned, the review happens." *(Note: frame it as informed, documented risk-acceptance — not as pressuring anyone.)*

- **Customer obsession (tie architecture to the passenger):**
> "I connect every NFR to the passenger. We didn't cut booking API latency to hit a dashboard metric — we cut it so a passenger checks in seconds faster at the gate, or a Skywards member sees their miles instantly. On the document-intelligence platform I made processing ~3× faster at lower cost; that's fewer seconds a customer waits, not just a cheaper invoice."

**Have three war stories ready** (this is your prep homework — write them STAR-shaped):
1. **A failure you owned and fixed** → the SLA-threatening production incident on the connected-vehicle platform (incident command → root cause → durable pattern).
2. **A disagreement with a boss where you were right** → RAG-over-fine-tuning, proven with a PoC.
3. **A time you saved money** → in-flight document processing with no persistent storage → ~3× faster, lower cost, compliance bar intact.

**Key points:** influence via PoC, not mandate; risk = documented, owned, business-framed; every answer lands back on the passenger. **Red flags:** "I forced them"; skipping governance to please a PM; metrics with no customer link.

### Phase 5 — Negotiation: close at the right grade

**Objective:** convert the offer into a Grade 9-appropriate package, with a graceful fallback if the title can't move.

**The primary close (when they offer):**
> "I'm genuinely excited about the team and the scope. Looking at what we discussed — mentoring, architecture strategy and governance across multiple teams — this is **principal/senior scope**, and I'd want the package to reflect the **Grade 9 band**, particularly the tier-1 benefits like **schooling and housing allowances**, to make the relocation viable."

**The fallback (if the grade/title is fixed at 8):**
> "If the grade is fixed, I understand. Then I'd ask that we **max out the Grade 8 band** and bridge the gap with a **sign-on bonus or relocation premium** — so the total package reflects the scope even if the grade label can't move yet, with a review checkpoint at [6–12 months]."

**Frame it on tax-free AED total package**, not home-country base: base + bonus + housing + schooling + flights + medical + relocation. Asking about allowances is normal and expected in Dubai.

**Key points:** justify the grade with *scope you already demonstrated in the loop*; always have a title-vs-comp fallback; negotiate total package, not base. **Red flags:** anchoring on base alone; no fallback; conceding the grade before testing the band.

### One-page pre-loop checklist

- **Résumé tweak:** ensure "Governance", "Strategy" and "Cost Optimization" appear in your summary line (they map straight to the JD's accountability language).
- **System design reps:** rehearse "design an airline check-in / booking system" out loud until the strangler-fig + SAGA + idempotency + cache-then-confirm flow is automatic.
- **Three war stories written** (failure-fixed / disagreed-and-right / saved-money) — STAR, quantified.
- **Grade anchored** in the recruiter call; **stack bridge** rehearsed (Azure ↔ Java/Kafka/Couchbase); **drift question** ready to ask.
- **Numbers loaded:** 14 yrs · 20M+ vehicles · ~2M msgs/min · 98–99% SLA · ~3× faster doc processing · AZ-305/AI-102/AZ-204/AZ-104/AZ-400.

---

## Technology & skills map — JD stack ↔ Emirates landscape ↔ your resume

| JD / Emirates area | What it is | Your resume evidence | Gap to address in prep |
|---|---|---|---|
| SAFe (ARTs, architecture runway) | Scaled Agile portfolio delivery with PI planning, enablers and runway | Led cross-functional teams and multi-team platforms; can map experience to ART language | Learn SAFe terms precisely: ART, PI, enabler, runway, ROAM, RTE |
| ADRs / architecture governance | Durable, reviewable decisions and exception management | Well-Architected reviews, NFR ownership, regulated delivery | Prepare 2-3 example ADRs from past work |
| TOGAF / ArchiMate / C4 / UML | EA method and modelling views | Architecture communication experience | Be fluent enough to explain which view answers which stakeholder question |
| Azure cloud-native | AKS, APIM, Azure SQL/Cosmos, Event Hubs, Entra, DevOps | AZ-305/AZ-204/AZ-104/AZ-400; Azure Functions/AKS/Service Bus/AI | Strong — lead with this |
| Emirates engineering stack | Java/Spring Boot, React/Angular, Kafka, Oracle/Couchbase/MongoDB | Azure/.NET/C# depth; identical patterns (Event Hubs≈Kafka, Cosmos≈Couchbase/Mongo) | Don't bluff Java — bridge via stack-agnostic patterns; be ready to ramp on Spring |
| Amadeus Altéa / PSS integration | Vendor PSS source of truth for RES/INV/DCS | No direct PSS experience | Frame as anti-corruption layer around a vendor system |
| SkyCargo / OneCargo logistics | Cargo booking, warehouse, ULD, customs, ONE Record | Connected-vehicle telemetry and distributed scale | Emphasize event ingestion and partner integration transferability |
| GenAI/RAG/agents | Customer assistants, document intelligence, ops copilots | Production GenAI/RAG/multi-agent delivery, AI-102 | Strong differentiator; stress guardrails and evaluation |
| Agentic AI / multi-agent | Autonomous & supervisor-worker workflows, planning/reasoning, memory, HITL | Production multi-agent delivery | Be ready to justify agent-vs-workflow and show step/cost bounding |
| LLM orchestration frameworks | LangChain, LangGraph, Semantic Kernel, AutoGen, CrewAI | Hands-on orchestration work | Have a one-line comparison plus a defended choice per scenario |
| RAG pipeline engineering | Ingestion, chunking, embeddings, hybrid search, reranking, grounding | Production RAG delivery | Rehearse chunking + hybrid + rerank trade-offs on fare-rule/DGR corpora |
| Vector databases | Azure AI Search, pgvector, Pinecone, Weaviate, Milvus, FAISS | Vector search experience | Prepare explicit selection criteria (filters, security trimming, residency, cost) |
| Model Context Protocol (MCP) | Standard tool/resource/prompt contract for agents | MCP server & tool integration | Frame as a governed, reusable capability layer *and* a privilege boundary |
| Guardrails & Responsible AI | Input/retrieval/tool/output/process controls, prompt-injection & PII defence | Guardrail and governance work | Name indirect prompt injection; map to NIST AI RMF / EU AI Act / UAE PDPL |
| AI evaluation & observability | Golden sets, groundedness, hallucination detection, tracing, feedback loops | Evaluation harness experience | Bring concrete metrics and a CI eval-gate story |
| AI cost & latency optimisation | Model routing, caching, token/context trimming, provisioned capacity | LLM cost-governance work | Express as cost per resolved contact with a p95 SLO and quality floor |
| Python / FastAPI | Async production services, Pydantic contracts, streaming | Python delivery | Be ready for a live FastAPI + async + testing discussion, not notebooks |
| Azure AI platform | AI Foundry, Azure OpenAI, AI Search, Azure ML, Databricks/Fabric | AI-102, Azure AI delivery | Know which service owns which lifecycle stage |
| LLMOps / MLOps | Prompt & index versioning, eval gates, canary/blue-green, drift monitoring | CI/CD and model governance | Emphasise prompts/indexes as versioned, gated release artefacts |
| Containers & deployment | Docker, AKS/Container Apps, KEDA/HPA, managed identity | AKS and cloud-native delivery | Tie autoscaling to bursty agent workloads and queue depth |
| Enterprise data governance | Lineage, classification, data residency, audit evidence | UAE government data-sovereignty, SQL + Purview | Very relevant to UAE/GDPR/PDPL discussion |
| Regulatory/security | UAE PDPL, TDRA, PCI-DSS, GDPR, IATA security | Regulated government engagements, Azure security certs | Classify data before choosing region |
| Cost/FinOps | Shared cloud spend, ART chargeback, CFO defense | Cost optimization and platform governance experience | Prepare cost-per-transaction and chargeback examples |

---

## Technical question bank (rapid-fire, by topic)

### PSS / reservations

**Q: What's the difference between Reservation, Inventory and Departure Control in a PSS?** Reservation manages PNRs, ticketing and booking records. Inventory manages schedules, seat/class availability and overbooking controls. Departure Control handles check-in, boarding and load/day-of-departure processes. Emirates-built systems should orchestrate around these vendor-owned domains rather than duplicate them.

**Q: Why is an anti-corruption layer the right pattern around a vendor PSS?** It translates vendor-specific EDIFACT/XML/NDC concepts into Emirates-owned canonical APIs and events. It centralizes idempotency, observability, error handling and rate limits. It also protects channels from future PSS interface changes.

**Q: How do you avoid double-booking when the PSS is the source of truth but you cache availability?** Treat cache as a shopping hint only. At checkout, confirm availability in the PSS with an idempotency key before payment capture. If the PSS rejects or times out, reconcile by request key/reference and never create a blind second booking.

**Q: What is IATA NDC and why does it matter for distribution?** NDC is an IATA standard for richer airline offer/order distribution through sellers and aggregators. It lets airlines expose more controlled offers than legacy distribution paths. Architecturally it still needs versioned contracts, validation and partner governance.

**Q: How would you version a booking API consumed by five teams?** Prefer additive changes. For breaking change, run v1 and v2 in APIM, add contract tests, publish deprecation timelines and monitor old-version usage. Capture the migration in an ADR so the sunset is governed rather than tribal knowledge.

### Loyalty / event-driven

**Q: Why is redemption a stronger-consistency problem than accrual?** Accrual can post later and be corrected with an adjustment. Redemption spends value and must prevent double-spend at transaction time. Therefore redemption needs atomic check-and-debit/reservation semantics while accrual can be eventually consistent.

**Q: How do you design an auditable, append-only ledger?** Store every accrual, redemption, expiry and adjustment as immutable entries with source reference, rule version, effective time, posted time and correlation ID. Current balance is a projection or sum, not the only truth. Corrections are new entries.

**Q: What's the difference between at-least-once and exactly-once processing, and how do you get exactly-once semantics on top of at-least-once delivery?** At-least-once means duplicates can arrive. Business-exactly-once is achieved with idempotency keys, unique constraints and transactional domain writes. The broker may redeliver, but the ledger or booking state changes once.

**Q: When would you choose Kafka-class streaming vs a simple queue for accrual events?** Use streaming when many consumers need replayable ordered events: ledger projections, notifications, campaigns and analytics. Use a queue for point-to-point work where one worker handles a message. Loyalty fan-out is a good streaming case.

### Cargo / logistics

**Q: How do you handle out-of-order IoT/scan events in a state machine?** Store immutable events and use occurred_at, sequence and business transition rules. Recompute projections within a reconciliation window. Conflicts become operational exceptions, not silent overwrites.

**Q: Why decompose cargo into booking/warehouse/ULD/compliance as separate services?** These domains have different ownership, release cadence, data models and compliance risk. Customs changes should not redeploy booking; scan ingestion should not block revenue accounting. Bounded contexts reduce blast radius.

**Q: What does IATA ONE Record standardize and why does it matter at partner boundaries?** ONE Record standardizes cargo data sharing across airlines, forwarders, handlers and authorities. It reduces bespoke partner mappings. It improves interoperability for shipment, tracking and compliance data.

### Cloud / Azure

**Q: AKS namespace-per-ART vs cluster-per-ART — trade-offs?** Namespace-per-ART is cheaper and simpler but shares blast radius. Cluster-per-ART improves isolation but increases cost, policy drift and upgrade work. Use shared clusters for normal workloads and dedicated clusters for regulated or mission-critical domains.

**Q: How does APIM handle per-partner rate limiting and contract versioning?** APIM products/subscriptions apply quotas and policies per partner. Versioning can be route, header or product based with separate schemas/backends. Telemetry identifies consumers still on deprecated versions.

**Q: When do you choose Cosmos DB over Azure SQL, and what does tunable consistency mean operationally?** Choose Cosmos for high-scale, partitioned, globally distributed document/key-value workloads with a strong partition key. Choose Azure SQL for relational integrity, transactions and complex queries. Tunable consistency means explicitly choosing strong, bounded staleness, session or eventual consistency and accepting latency/availability/cost implications.

**Q: What does a Well-Architected review actually produce as an artifact?** It produces a prioritized risk/action register across reliability, security, cost, operations and performance. Each finding has severity, owner, due date and acceptance criteria. A score without actions is not architecture governance.

### Governance / SAFe

**Q: What triggers writing an ADR vs just making the call?** Write an ADR for decisions that are hard to reverse, cross teams, affect standards, create security/compliance/cost impact or set long-lived direction. Routine local implementation choices can stay local. ADRs are for consequential traceability.

**Q: What's on an architecture runway, and how far ahead should it look?** Runway contains enablers needed for upcoming features: platform work, API contracts, observability, data models and risk-reduction spikes. It usually looks one to two PIs ahead. Too far ahead becomes speculative inventory.

**Q: How do you track and eventually resolve a documented deviation from architecture standards?** Record owner, reason, risk, review date and remediation path. Review in PI planning or architecture governance. A deviation without owner/expiry is unmanaged debt.

**Q: What's the difference between an Enterprise Architect and a Solution Architect's remit?** Enterprise Architecture sets cross-portfolio principles and standards. Solution Architecture applies them to a portfolio/product, makes delivery trade-offs and governs teams toward the target. Staff-level SAs also feed lessons back to EA.

### AI/ML for aviation

**Q: What guardrails would you put around an ML-driven dynamic pricing engine?** Bound price changes, require human approval above thresholds, log model version/features/decision, monitor drift and support rollback. The model recommends; deterministic business rules and governance constrain. Avoid opaque autonomous price changes.

**Q: How is aircraft predictive maintenance architecturally similar to connected-vehicle telemetry?** Both ingest high-volume time-series events from assets, partition by asset, handle late/out-of-order data, extract features and score risk. Both need replay, drift monitoring and alert routing. Aviation adds stricter safety and maintenance governance.

**Q: How do you keep a customer-facing fare-rules chatbot from hallucinating policy details?** Use RAG over approved policy documents, cite sources, restrict tool actions, set confidence thresholds and escalate uncertain cases. Log prompts, retrieved docs, model version and answer. Deterministic eligibility tools should decide refunds, not free-form text.

### Agentic AI / LLM engineering (JD rapid-fire)

**Q: Agent vs deterministic workflow — how do you decide?** If you can enumerate the steps, orchestrate them deterministically; agency is for bounded-tool, unbounded-path problems. Agents cost latency, tokens and auditability, so justify them per use case and always bound steps, tool calls and budget.

**Q: LangChain vs LangGraph vs Semantic Kernel vs AutoGen vs CrewAI?** LangChain for integration breadth, LangGraph for explicit stateful graphs with durable checkpoints and resumable runs, Semantic Kernel for .NET/Azure-aligned enterprises with plugins and planners, AutoGen for conversational multi-agent exploration, CrewAI for role/task prototyping. Keep prompts, tool contracts, state schema and evals framework-independent so the choice is reversible.

**Q: Which chunking strategy for fare rules or a DGR manual?** Structure-aware chunking on headings/clauses with overlap, retaining the clause ID and effective date in metadata so answers can cite "rule 16.2" and stale versions can be filtered out. Fixed-size splitting destroys tables and clause boundaries.

**Q: Why hybrid search plus a reranker instead of pure vector search?** Airline corpora are full of lexical tokens — fare codes, AWB numbers, airport and RBD codes — that embeddings blur. BM25 catches exact tokens, vectors catch paraphrase, and a cross-encoder reranker over top-k restores precision after you widen recall.

**Q: How do you choose a vector store?** Score candidates on filtered/hybrid search quality, security trimming, p95 latency at scale, multi-tenancy, residency, ops burden and cost per million vectors. Azure AI Search is the default in an Azure estate; pgvector when the corpus is small and Postgres is already there; FAISS is for experiments, not governed production.

**Q: What does MCP give you that a bespoke tool integration doesn't?** A standard discovery/invocation contract for tools, resources and prompts, so one governed server per bounded context is reused across agents and ARTs. Treat the server as a privilege boundary: user-identity propagation, per-agent tool allow-lists, argument validation, versioned schemas and full invocation logging.

**Q: What's indirect prompt injection and how do you defend against it?** Malicious instructions hidden in content the agent reads — an uploaded customs document, an email, a web page. Defend in depth: never treat retrieved content as instructions, separate data and instruction channels, filter and classify inputs, allow-list tools, require confirmation for destructive actions, and red-team it in CI.

**Q: How do you evaluate a RAG assistant before it ships?** Golden dataset of SME-approved questions run in CI as a release gate, scoring retrieval (recall@k, citation coverage), generation (groundedness, relevance, correct refusals) and task success. LLM-as-judge is calibrated against human review, never trusted alone.

**Q: What do you trace in production?** One trace per agent run spanning every LLM call, tool call, retrieved chunk, token count and latency, plus dashboards for cost per request, p95 latency, refusal and escalation rate, groundedness and drift. Feedback and escalations feed back into the golden set.

**Q: Cheapest levers to cut LLM cost without cutting quality?** Route to the smallest model that passes evals, cache (exact, semantic, prefix and embeddings), rerank-then-truncate instead of stuffing context, stream for perceived latency, parallelise independent tool calls, cap agent steps, and consider provisioned capacity for predictable volume. Report it as cost per resolved contact against a quality floor.

**Q: What makes a FastAPI agent service production-grade?** Async I/O for model and retrieval calls, Pydantic schemas shared with structured outputs, dependency-injected auth and clients, queued background execution for long agent runs, streaming responses, retry-with-jitter and fallback deployments on 429s, deterministic tests with recorded LLM fixtures, and structured logs with correlation IDs.

**Q: What does LLMOps version that MLOps doesn't?** Prompts, tool schemas, index and chunking configuration, embedding model version and evaluation datasets — all in Git, promoted through environments with the eval suite as the gate, with blue/green index rebuilds behind an alias and canary model routing for rollback.

---

## Deeper / staff-level questions

### Design a zero-downtime migration of the booking orchestration layer from one PSS integration pattern to another, with live traffic and no double-bookings during cutover.

**Requirements & scale** — Live global booking traffic, hundreds of writes/sec at peak, no duplicate PNRs, no incorrect payment capture, rollback in minutes. The PSS remains source of truth.

**Architecture**
```text
[Channels] -> [Booking API facade]
                 |-> [Old adapter] -> [PSS]
                 |-> [New adapter] -> [PSS]
                 |-> [shared idempotency store]
                 |-> [shadow compare + reconciliation]
              [feature flags / canary router]
```

**Data & consistency** — Centralize idempotency before migration. Start with shadow reads/non-mutating compares, then canary low-risk writes. Map every idempotency key to a PSS reference. Payment capture remains behind confirmed PSS booking.

**Scale & capacity** — Shadowing can double read load, so throttle comparisons and avoid unnecessary vendor calls. Canary by channel, market, route or percentage. Metrics compare latency, response codes, fares, availability and mismatch rates.

**Failure modes & resilience** — Ambiguous new-adapter writes trigger lookup by idempotency/PSS reference before retry. If mismatch rates exceed threshold, route back to old adapter. Keep old path warm until reconciliation is clean.

**Trade-offs & alternatives** — Big-bang cutover is cheaper but too risky. Dual-writing to two booking truths is invalid. Strangler/canary migration costs more but gives rollback and evidence.

**Follow-up answers** — No double-bookings come from shared idempotency and PSS commit semantics, not from deployment tooling alone.

### How would you design chargeback-accurate cost allocation for shared AKS/APIM infrastructure used by five ARTs with very different traffic profiles?

**Requirements & scale** — Leadership needs fair cost visibility by ART, service, environment and capability. Accuracy should drive behavior without creating accounting theater.

**Architecture**
```text
[AKS labels/quotas] + [APIM product metrics] + [Log Analytics usage] + [Azure cost exports]
        -> [FinOps model]
        -> [dashboard: ART, service, unit cost, trend, anomaly]
```

**Data & consistency** — Enforce tags/labels at deployment: ART, service, env, owner, costCenter. APIM subscriptions map API calls to consumers. Shared fixed cost is allocated by agreed formula; variable cost follows usage.

**Scale & capacity** — Track CPU/memory requests vs actuals, APIM calls, egress, Cosmos RU/s and telemetry volume. Log volume is often the hidden cost. Use budgets and alerts.

**Failure modes & resilience** — Missing tags break chargeback, so fail CI/CD or Azure Policy for untagged resources. If the model is opaque, teams will dispute it; publish assumptions.

**Trade-offs & alternatives** — Showback is easier culturally; chargeback drives accountability but can cause gaming. Start with showback and move to chargeback when data quality is strong.

**Follow-up answers** — CFOs should see cost per booking search, confirmed booking, cargo event or loyalty transaction, not just cloud service totals.

### Two ARTs need the same capability (e.g., document intelligence for both cargo customs docs and passenger travel-document verification) — do you build a shared platform service or let each build their own? Defend the trade-off.

**Requirements & scale** — Both need OCR/extraction, confidence scoring, human review and audit. Cargo and passenger identity data have different schemas, retention and privacy rules.

**Architecture**
```text
[Shared Document AI Platform]
  OCR runtime, model registry, evaluation, observability, human-review workflow
        |-> [Cargo customs domain adapter]
        |-> [Passenger travel-doc domain adapter]
```

**Data & consistency** — Share platform primitives, not domain ownership. Each ART owns schema, validation, retention and access. Raw documents are isolated by domain/jurisdiction.

**Scale & capacity** — Shared runtime reduces duplicated cost and governance work. Quotas prevent one ART starving another. Evaluation sets are per domain.

**Failure modes & resilience** — A shared outage affects both domains, so SLOs and manual fallback are required. Model regression must be caught before production by domain-specific tests.

**Trade-offs & alternatives** — Independent builds are faster initially but duplicate compliance and cost. A heavy central platform bottlenecks teams. A thin shared platform plus domain adapters is the balanced answer.

**Follow-up answers** — This is a strong candidate mapping to production document/RAG work, but be careful about passenger identity privacy.

### Design a multi-region active-active architecture for the booking orchestration layer where the underlying PSS itself is single-write-region — what does "active-active" even mean here, and where's the real bottleneck?

**Requirements & scale** — Global users need low-latency reads and reliable writes. The PSS write path is the real authority and may be single-region/single-writer.

**Architecture**
```text
[Global users] -> [Front Door active-active]
      |-> [Region A stateless APIs/read cache]
      |-> [Region B stateless APIs/read cache]
                  -> [single PSS write authority]
```

**Data & consistency** — Active-active applies to edge, stateless APIs, search and read models. Booking writes route to the PSS authority with idempotency. Local stores track request state but do not become inventory truth.

**Scale & capacity** — Regional caches absorb reads; event partitions use booking reference. Write throughput is bounded by PSS quotas and payment/PSS saga latency.

**Failure modes & resilience** — If one region fails, route users to another. If the PSS write authority is degraded, front-end active-active does not solve booking commits; enter degraded mode.

**Trade-offs & alternatives** — True multi-master inventory is unsafe without PSS support. Active-passive everything is simpler but poorer for global reads. Precise language beats buzzwords.

**Follow-up answers** — The bottleneck is source-of-truth inventory/booking confirmation, not AKS replicas.

### How would you retrofit architecture governance (ADRs, runway, review gates) onto five ARTs that have been shipping without any for two years, without grinding delivery to a halt?

**Requirements & scale** — Five ARTs already have delivery pressure and local patterns. Governance must reduce risk while preserving velocity.

**Architecture**
```text
[current-state assessment] -> [top risks] -> [golden paths]
          -> [lightweight ADRs] -> [exception register] -> [PI runway]
```

**Data & consistency** — Create a decision repository and service catalog. Do not demand retroactive ADRs for everything; document high-risk current decisions and standards going forward.

**Scale & capacity** — Start with controls that scale: API standards, identity/secrets, observability, cost tags and data classification. Automate checks in CI/CD.

**Failure modes & resilience** — If governance is bureaucracy, teams bypass it. If too weak, risk remains hidden. Time-box reviews and provide templates.

**Trade-offs & alternatives** — Full board review for every change is slow; no governance is risky. Use risk-tiered governance with SLAs.

**Follow-up answers** — The first PI should show value: fewer incidents, clearer ownership, faster onboarding or cost visibility.

### Walk through a "chaos day" scenario: DXB is unreachable, the PSS is degraded, and your booking orchestration layer's regional failover partially works. What's your incident-command sequence?

**Requirements & scale** — Combined regional, vendor and application incident affecting revenue and passengers. Goals: protect correctness, restore critical paths, communicate clearly and avoid making recovery harder.

**Architecture / sequence**
```text
1. Declare major incident; appoint incident commander.
2. Freeze risky deployments; preserve logs/evidence.
3. Assess customer impact, PSS status, region health, payment ambiguity.
4. Shift safe read traffic to healthy region.
5. Put booking writes into controlled degraded mode.
6. Protect PSS with throttles/circuit breakers.
7. Start reconciliation for ambiguous bookings/payments.
8. Communicate to channels, contact centre, executives and partners.
9. Recover gradually, validate business transactions, then postmortem.
```

**Data & consistency** — Do not sacrifice booking/payment correctness for availability. Ambiguous states are isolated for reconciliation. Idempotency keys are essential during retry/recovery.

**Scale & capacity** — Surviving regions receive extra traffic, so shed non-critical personalization and protect core booking/status endpoints.

**Failure modes & resilience** — Partial failover can be worse than no failover if health checks are only technical. Use business-transaction health: can we search, price, book, pay and retrieve?

**Trade-offs & alternatives** — Keeping checkout open may protect short-term revenue but create disputes. Controlled degradation is safer.

**Follow-up answers** — Postmortem creates runway items: failover tests, degraded-mode UX, clearer health signals, reconciliation automation and communication templates.

---

## Scenario-based questions (situational & troubleshooting)

1. **A partner airline's mileage-exchange API silently starts returning stale data. How do you detect this, and what's your immediate mitigation?** Detection comes from freshness SLOs, partner response timestamps, sequence gaps, settlement variance and member-dispute spikes. Immediately mark the partner path degraded, stop final automatic posting if correctness is uncertain, hold transactions as pending and communicate to operations. Root cause checks partner release/cache behavior and our adapter assumptions. The durable ADR requires freshness fields, contract tests, stale-data circuit breakers, reconciliation and partner health dashboards.

2. **Booking volume spikes 50x in 10 minutes (a flash sale). Your orchestration layer's downstream PSS calls are rate-limited by the vendor. What do you do in the first hour?** Detect 429s, queue depth, retry amplification and conversion impact. Immediately enable APIM/channel throttles, increase safe cache use, slow checkout entry, disable non-critical personalization and protect PSS with backoff/circuit breakers. Do not let clients create duplicate booking attempts. The durable fix is a flash-sale mode ADR: pre-warmed caches, queue-based checkout, vendor quota planning, explicit customer messaging and load-test gates.

3. **An auditor asks you to prove that EU passenger data never left EU-classified storage for the last 12 months. What evidence do you produce, and how did your architecture make that possible?** Produce Purview lineage, classification reports, storage-region inventory, access logs, pipeline histories, DLP alerts, encryption/key evidence and approved transfer records. The architecture made this possible by tagging data at source, separating EU storage, enforcing policy-controlled pipelines and cataloging lineage automatically. If evidence is missing, freeze questionable flows and investigate. Durable fix: no production pipeline without classification, lineage and region-policy checks.

4. **A newly onboarded ART starts building a service that duplicates an existing platform capability because they didn't know it existed. How do you prevent this going forward without adding bureaucracy?** First compare requirements and see whether the existing capability can be extended rather than blaming the team. Root cause is discoverability and onboarding, not bad intent. Durable fix: searchable service/capability catalog, onboarding checklist, platform office hours, reference architectures and a lightweight reuse check for new epics.

5. **Your Well-Architected review flags a cost issue in a service that's also mid-way through a critical PI (Program Increment). Do you block the release?** Classify severity. If it risks runaway spend, reliability or compliance, block or require mitigation; if it is optimization, add budgets, autoscaling caps, log sampling or rightsizing while release proceeds. Root cause is often missing FinOps gates, tags or load testing. Durable fix: cost acceptance criteria, unit-cost dashboards and remediation as a PI enabler.

6. **A GenAI-based customer service assistant gives a passenger an incorrect refund-eligibility answer. Walk through your incident response and the architectural fix.** Immediately disable the affected intent or force human escalation, preserve transcript, retrieved docs, model version and tool calls, and correct the passenger outcome. Root cause checks stale retrieval, prompt, policy version, guardrail and tool authorization. Durable fix: stricter RAG grounding, deterministic refund eligibility tools, confidence thresholds, citations, red-team tests and an ADR defining allowed assistant actions.

7. **Cargo customs integration goes down at a regional hub, blocking shipments. Your architecture has no fallback for this partner. What's the immediate workaround, and what ADR do you write afterward?** Use an approved manual or alternate customs channel if allowed, queue submissions, mark shipments customs-pending/held, prioritize critical cargo and keep booking/warehouse running without falsely clearing goods. Root cause is missing partner resilience design. ADR: customs integration needs health checks, circuit breaker, DLQ, manual fallback workflow, audit trail, OLA/SLA and degraded-mode UI. Never bypass customs controls silently.

8. **A CFO asks why the cloud bill doubled after a "successful" migration. How do you investigate and what governance was missing?** Start with cost exports by subscription, tag, service, region and time; find drivers such as AKS overprovisioning, APIM tier, egress, logs, Cosmos RU/s, snapshots or idle non-prod. Mitigate with budgets, rightsizing, autoscaling schedules, telemetry sampling and cleanup. Missing governance likely includes enforced tags, unit-cost model, budgets, architecture cost review and chargeback/showback.

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
