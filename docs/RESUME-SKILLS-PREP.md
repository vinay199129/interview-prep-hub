# Résumé skills mastery — L100 → L200 interview prep

A personal, résumé-driven study section. Every skill and technology listed on the CV is covered here so you can confidently field **L100 (fundamentals)** through **L200 (intermediate/practical)** interview questions on anything you claim.

## How to use this guide

- **Coverage.** Grouped exactly like the résumé: **Architecture & Design · Azure & Cloud Platform · AI & GenAI · Engineering · Reliability & Operations · ML Foundations · Certifications.** Use the on-page navigation to jump to any skill.
- **The L100 → L200 model.** *L100* is the definition and core concepts a beginner must know; *L200* is intermediate depth — trade-offs, patterns, limits, and how it's applied in real systems. If you can answer both bands for a skill, you can hold a credible conversation with a senior interviewer on it.
- **Each skill block gives you:** *What it is (L100)* · *Why/when to use it (L100)* · *Core concepts to know (L200)* · *Interview Q&A* (mixed L100/L200 with crisp model answers) · *Red flags to avoid* · a **Résumé hook** tying the skill to one of your real projects so you can give an authentic, specific example instead of a textbook one.
- **How to drill.** Read the *What/Why*, then cover the answers and try to respond to each **Q** out loud in 1–2 sentences. Anything you fumble, re-read the *Core concepts* bullets. Always close with the **Résumé hook** so the skill is anchored to something you actually shipped.
- **Honesty caveat.** Only claim depth you have. For any skill where you're at L100, say so and pivot to the adjacent thing you *have* shipped — that self-awareness is itself a senior signal. The résumé hooks are drawn from your real engagements (invoice-intelligence automation, UAE data-sovereignty, CPG procurement RAG, plant-operations assistant, insurance claims, the 20M-vehicle connected-car platform, the AI hiring platform, and 8 years of full-stack .NET).

---

## Architecture & Design

Architecture & Design is about turning business goals into secure, scalable, operable systems. For a Solution Architect, the interview signal is showing structured trade-off thinking, not just naming Azure services.

### Enterprise Azure architecture
**What it is (L100):** Enterprise Azure architecture defines how applications, data, identity, networking, security, and operations fit together across subscriptions and environments. It usually follows landing-zone principles rather than isolated resource design.
**Why/when to use it (L100):** Use it when systems must support scale, compliance, team autonomy, and repeatable delivery across multiple workloads.
**Core concepts to know (L200):**
- Management groups, subscriptions, resource groups
- Hub-spoke and Virtual WAN networking
- Identity-first design with Microsoft Entra ID
- Azure Policy, RBAC, tags, budgets
- Landing zones and environment separation
- Shared services: DNS, firewall, monitoring
**Interview Q&A:**
- **Q (L100):** What is an Azure landing zone? — **A:** A preconfigured Azure environment with identity, networking, governance, security, and management foundations for hosting workloads consistently.
- **Q (L100):** Why separate subscriptions? — **A:** Subscriptions create isolation for billing, RBAC, policy, quota, and blast-radius control.
- **Q (L200):** Hub-spoke vs flat networking? — **A:** Hub-spoke centralizes shared services like firewall, DNS, and connectivity while spokes isolate workloads; flat networks are simpler but harder to govern at scale.
- **Q (L200):** How do you design for regulated enterprises? — **A:** Start with data classification, residency, identity boundaries, policy guardrails, audit logging, and private connectivity before choosing compute.
**Red flags to avoid:** Weak answers jump straight to VMs or App Service without discussing governance, identity, networking, or operating model.
**Résumé hook:** Use the UAE Government secure services marketplace to discuss data residency, Purview lineage, access controls, and multi-entity governance.

### Cloud-native / serverless platforms
**What it is (L100):** Cloud-native platforms use managed services, containers, serverless compute, and automation to reduce infrastructure ownership. Serverless means the platform abstracts provisioning and scaling, but architecture responsibility remains.
**Why/when to use it (L100):** Use it for event-based workloads, APIs, background jobs, bursty demand, and teams that need rapid delivery with low ops overhead.
**Core concepts to know (L200):**
- Azure Functions, Container Apps, AKS, App Service
- Stateless compute and externalized state
- Autoscaling triggers and cold starts
- Managed identity over secrets
- CI/CD and infrastructure as code
- Cost models: consumption vs provisioned
**Interview Q&A:**
- **Q (L100):** What is serverless? — **A:** A model where the cloud provider manages servers, scaling, and runtime hosting while developers focus on code and events.
- **Q (L100):** Is serverless always cheaper? — **A:** No; it is cost-effective for variable workloads but provisioned services may be cheaper for steady high throughput.
- **Q (L200):** When avoid Azure Functions? — **A:** Avoid for long-running, highly stateful, latency-sensitive, or runtime-constrained workloads unless Durable Functions or another pattern fits.
- **Q (L200):** How do containers complement serverless? — **A:** Containers give portability and custom runtime control; platforms like Azure Container Apps add event-driven scaling with less AKS complexity.
**Red flags to avoid:** Saying “serverless means no servers” without discussing limits, observability, state, cold starts, and cost.
**Résumé hook:** Use the automotive invoice-intelligence project to explain transient processing, no persistent storage, compliance, and throughput of 200–400 invoices/day.

### AI platform design (LLM, RAG, multi-agent)
**What it is (L100):** AI platform design combines models, data, prompts, orchestration, evaluation, safety, and integration into a production system. RAG retrieves grounded context; fine-tuning changes model behavior; agents coordinate tools and tasks.
**Why/when to use it (L100):** Use LLM platforms when natural language, summarization, reasoning, semantic search, or knowledge assistance creates measurable business value.
**Core concepts to know (L200):**
- RAG ingestion, chunking, embeddings, vector search
- Prompt templates, grounding, citations
- Model selection, latency, token cost
- Evaluation: quality, safety, regression tests
- Tool calling and agent orchestration
- Guardrails, content filtering, human review
**Interview Q&A:**
- **Q (L100):** What is RAG? — **A:** Retrieval-Augmented Generation retrieves relevant enterprise content and supplies it to an LLM so answers are grounded in approved data.
- **Q (L100):** Why not fine-tune for everything? — **A:** Fine-tuning is useful for behavior or style, but RAG is better for frequently changing factual knowledge.
- **Q (L200):** How do you reduce hallucination? — **A:** Use grounded retrieval, citations, constrained prompts, confidence thresholds, eval sets, fallback paths, and human review for high-risk decisions.
- **Q (L200):** What makes multi-agent systems risky? — **A:** They add coordination, tool-permission, latency, cost, and observability complexity; use them only when task decomposition adds value.
**Red flags to avoid:** Weak answers treat LLMs as magic APIs and ignore data quality, evaluation, security, grounding, and cost.
**Résumé hook:** Use the Global CPG RAG procurement platform with 20,000 documents and 300 users to discuss RAG vs fine-tuning trade-offs.

### Event-driven and distributed systems
**What it is (L100):** Event-driven systems communicate through events rather than direct synchronous calls. Distributed systems split work across services, requiring explicit handling of latency, failure, ordering, and consistency.
**Why/when to use it (L100):** Use it for decoupling, high-throughput ingestion, asynchronous workflows, IoT, telemetry, and integration across independently scaling components.
**Core concepts to know (L200):**
- Queues, topics, streams, event grids
- At-least-once delivery and idempotency
- Ordering, partitioning, backpressure
- Eventual consistency and sagas
- Retry, dead-letter, poison messages
- Observability with correlation IDs
**Interview Q&A:**
- **Q (L100):** Queue vs topic? — **A:** A queue sends each message to one consumer; a topic publishes events to multiple subscribers.
- **Q (L100):** What is eventual consistency? — **A:** Data may be temporarily inconsistent across services but converges after asynchronous processing completes.
- **Q (L200):** How handle duplicate events? — **A:** Design idempotent consumers using message IDs, deduplication stores, natural keys, or safe upserts.
- **Q (L200):** How do you handle failure in event flows? — **A:** Use retries with backoff, dead-letter queues, monitoring, replay strategy, and clear ownership for failed events.
**Red flags to avoid:** Weak answers assume events are always ordered, exactly-once, or simpler than APIs.
**Résumé hook:** Use the connected-vehicle platform with 20M+ vehicles and ~2M telemetry messages/minute to discuss IoT Hub, Kusto, scale, and SLAs.

### Integration architecture
**What it is (L100):** Integration architecture defines how systems exchange data and commands across APIs, events, files, middleware, and data pipelines. It balances reliability, coupling, security, and ownership boundaries.
**Why/when to use it (L100):** Use it when connecting SaaS, legacy, cloud, partner, and internal systems without creating brittle point-to-point dependencies.
**Core concepts to know (L200):**
- API-led and event-led integration
- Canonical models vs domain contracts
- Synchronous vs asynchronous trade-offs
- API Management, Logic Apps, Service Bus
- Data mapping, validation, lineage
- Versioning, throttling, retries
**Interview Q&A:**
- **Q (L100):** What is API Management for? — **A:** It provides a governed API front door with policies for auth, throttling, transformation, routing, and analytics.
- **Q (L100):** Why avoid point-to-point integration? — **A:** It creates tight coupling, hidden dependencies, duplicated logic, and difficult change management.
- **Q (L200):** When choose async integration? — **A:** Choose it when workflows can tolerate delay and need resilience, decoupling, buffering, or fan-out.
- **Q (L200):** How ensure data trust? — **A:** Validate schemas, track lineage, classify data, enforce access controls, and monitor reconciliation errors.
**Red flags to avoid:** Weak answers focus only on moving data and ignore contracts, ownership, versioning, security, and failure handling.
**Résumé hook:** Use the UAE Government Informatica Cloud to SQL and Purview lineage work to discuss governed integration and data residency.

### Azure Well-Architected reviews
**What it is (L100):** Azure Well-Architected reviews assess workloads across reliability, security, cost optimization, operational excellence, and performance efficiency. They identify risks and prioritized improvements.
**Why/when to use it (L100):** Use reviews before go-live, during modernization, after incidents, or when scaling workloads to enterprise standards.
**Core concepts to know (L200):**
- Five Well-Architected pillars
- Risk scoring and remediation backlog
- SLA/SLO alignment
- Resiliency and DR validation
- Cost-performance trade-offs
- Continuous review, not one-time audit
**Interview Q&A:**
- **Q (L100):** Name the five pillars. — **A:** Reliability, security, cost optimization, operational excellence, and performance efficiency.
- **Q (L100):** What is the output of a review? — **A:** A prioritized risk register and action plan tied to business impact.
- **Q (L200):** How handle pillar conflicts? — **A:** Make trade-offs explicit, quantify impact, and align decisions with business criticality and risk appetite.
- **Q (L200):** How validate reliability? — **A:** Test failover, backup restore, dependency failure, scaling behavior, alerting, and recovery objectives.
**Red flags to avoid:** Weak answers treat Well-Architected as a checklist rather than a decision and risk-management framework.
**Résumé hook:** Use the connected-vehicle platform to discuss reliability, throughput, regional scale, and 98–99% SLA decisions.

### Non-functional requirements (NFRs)
**What it is (L100):** NFRs define how a system must behave: availability, performance, scalability, security, compliance, maintainability, and usability. They make architecture measurable.
**Why/when to use it (L100):** Use NFRs early because they drive service choice, topology, cost, testing, and operational design.
**Core concepts to know (L200):**
- SLOs, SLIs, SLAs, error budgets
- RTO, RPO, backup, DR
- Latency, throughput, concurrency
- Security and compliance requirements
- Capacity planning and load testing
- Maintainability and support model
**Interview Q&A:**
- **Q (L100):** What is an SLA? — **A:** A formal availability or service commitment, often contractual, such as 99.9% uptime.
- **Q (L100):** What are RTO and RPO? — **A:** RTO is acceptable recovery time; RPO is acceptable data loss window.
- **Q (L200):** How gather NFRs? — **A:** Convert business impact into measurable targets for users, transactions, latency, availability, recovery, security, and compliance.
- **Q (L200):** How do NFRs affect cost? — **A:** Higher availability, lower latency, stronger DR, and stricter compliance usually require redundancy, automation, monitoring, and testing.
**Red flags to avoid:** Weak answers say “highly scalable and secure” without measurable targets or validation methods.
**Résumé hook:** Use the SD Global Services multi-modal interview platform to discuss concurrency, latency, reliability, and candidate experience.

### Cross-cutting concerns: security, governance, observability, cost, and delivery risk
**What it is (L100):** Cross-cutting concerns apply across every component rather than one feature. They include security, governance, observability, cost control, compliance, DevOps, and delivery risk.
**Why/when to use it (L100):** Address them from day one because retrofitting them later is expensive, risky, and often incomplete.
**Core concepts to know (L200):**
- Zero Trust and least privilege
- Policy-as-code and guardrails
- Centralized logging, metrics, tracing
- FinOps, tagging, budgets, showback
- CI/CD, IaC, environment promotion
- Risk register and dependency management
**Interview Q&A:**
- **Q (L100):** What is least privilege? — **A:** Grant only the minimum permissions needed for a role, workload, or identity to perform its function.
- **Q (L100):** Why is observability more than logging? — **A:** It combines logs, metrics, traces, alerts, and correlation to understand system behavior and diagnose issues.
- **Q (L200):** How control cloud cost architecturally? — **A:** Use right-sizing, autoscaling, budgets, tagging, reserved capacity where suitable, storage lifecycle, and workload-level cost ownership.
- **Q (L200):** How reduce delivery risk? — **A:** Use IaC, CI/CD gates, progressive rollout, rollback plans, threat modeling, operational readiness, and clear ownership.
**Red flags to avoid:** Weak answers discuss these as afterthoughts or rely only on manual reviews.
**Résumé hook:** Use the Global Insurance Broker reusable AI patterns to discuss secure, observable, governable AI delivery across multiple use cases.

## Azure & Cloud Platform

This section covers the Azure platform services a Solution Architect should explain from fundamentals through practical design trade-offs. Focus on when to use each service, how it integrates, and what interviewers expect beyond buzzwords.

### Azure OpenAI (Service)
**What it is (L100):** Azure OpenAI Service provides managed access to OpenAI models such as GPT, embeddings, and image/audio-capable models through Azure. It adds Azure identity, networking, compliance, regional deployment, and enterprise governance around model usage.  
**Why/when to use it (L100):** Use it when you need LLM capabilities with Azure security, private networking, quota management, and enterprise controls.  
**Core concepts to know (L200):**
- Models are deployed per Azure resource/region with quotas such as TPM/RPM.
- Supports chat completions, embeddings, assistants/agents patterns, and content filtering.
- Integrates with Azure AI Search for RAG and with managed identity/private endpoints.
- Provisioned throughput is used for predictable high-volume workloads.
- Alternative: direct OpenAI API, self-hosted models, or model catalog via Azure AI Foundry.
**Interview Q&A:**
- **Q (L100):** What problem does Azure OpenAI solve? — **A:** It gives enterprise-grade access to generative AI models with Azure governance, networking, identity, and compliance.
- **Q (L100):** Is it the same as ChatGPT? — **A:** No. ChatGPT is an app; Azure OpenAI is a programmable enterprise service for deploying and calling models.
- **Q (L200):** How do you ground model answers? — **A:** Use RAG: retrieve trusted context from sources such as Azure AI Search, then pass it to the model with instructions.
- **Q (L200):** What are key production concerns? — **A:** Quotas, latency, cost, prompt safety, content filtering, observability, private access, and fallback strategy.
**Red flags to avoid:** Do not claim the model “knows” private enterprise data unless you provide it through grounding, fine-tuning, or tools. Avoid treating prompts as security boundaries.  
**Résumé hook:** Use the Global Insurance Broker claim summarisation project to discuss secure document-grounded LLM workflows.

### Azure AI Foundry
**What it is (L100):** Azure AI Foundry is Microsoft’s platform for building, evaluating, deploying, and governing generative AI applications and agents. It brings together model catalog, projects, prompt flows, evaluations, safety tooling, and deployment workflows.  
**Why/when to use it (L100):** Use it to manage end-to-end GenAI solution development instead of treating model calls as isolated API calls.  
**Core concepts to know (L200):**
- Projects organize models, connections, deployments, evaluations, and assets.
- Supports model catalog choices across Azure OpenAI and other supported models.
- Useful for RAG, agents, prompt evaluation, tracing, and safety checks.
- Integrates with Azure AI Search, Storage, Key Vault, Monitor, and Entra ID.
- Alternative: custom app stack using SDKs, LangChain/Semantic Kernel, or direct APIs.
**Interview Q&A:**
- **Q (L100):** What is Azure AI Foundry used for? — **A:** Building and operating AI apps with models, data connections, evaluation, deployment, and governance.
- **Q (L100):** Who uses it? — **A:** Architects, AI engineers, data scientists, and platform teams building production GenAI systems.
- **Q (L200):** How does it help RAG? — **A:** It provides project structure, model deployments, data connections, evaluation, and integration with Azure AI Search.
- **Q (L200):** When not to use it? — **A:** For very simple one-off model calls where direct SDK use is enough.
**Red flags to avoid:** Do not describe Foundry as just “a portal.” Its value is lifecycle management, evaluation, governance, and integration.  
**Résumé hook:** Tie it to the Global CPG RAG procurement platform with 20,000 documents and 300 users.

### Azure AI Search
**What it is (L100):** Azure AI Search is a managed search service for full-text, vector, hybrid, and semantic search over enterprise content. It indexes data and exposes query APIs for retrieval scenarios.  
**Why/when to use it (L100):** Use it for RAG, document search, catalog search, and applications needing relevance ranking over structured and unstructured content.  
**Core concepts to know (L200):**
- Indexes define fields, analyzers, filters, vector fields, and scoring profiles.
- Supports BM25 keyword, vector search, hybrid search, and semantic ranking.
- Indexers and skillsets can pull/enrich content from supported Azure data sources.
- Scale uses replicas for query throughput and partitions for storage/index size.
- Alternatives: Elasticsearch/OpenSearch, Cosmos DB vector search, database full-text search.
**Interview Q&A:**
- **Q (L100):** What does Azure AI Search do? — **A:** It indexes content and returns relevant results through search APIs.
- **Q (L100):** Why is it common in RAG? — **A:** It retrieves grounded context before sending a prompt to an LLM.
- **Q (L200):** Hybrid vs vector search? — **A:** Vector captures semantic similarity; hybrid combines vector with keyword matching for better precision.
- **Q (L200):** How do you secure it? — **A:** Use Entra ID/RBAC, private endpoints, API keys where appropriate, and document-level filtering in the app/index design.
**Red flags to avoid:** Do not assume vector search replaces keyword search; hybrid often performs better. Avoid ignoring index design and chunking.  
**Résumé hook:** Use the Global CPG procurement RAG platform to explain hybrid retrieval over 20,000 documents.

### Azure Machine Learning (Azure ML)
**What it is (L100):** Azure ML is a managed platform for training, tracking, deploying, and governing machine-learning models. It supports notebooks, pipelines, compute clusters, registries, endpoints, and MLOps.  
**Why/when to use it (L100):** Use it when you need repeatable ML experimentation, model training, deployment, and lifecycle management.  
**Core concepts to know (L200):**
- Workspaces contain experiments, jobs, datasets/assets, models, and endpoints.
- Compute can be managed clusters, instances, Kubernetes, or serverless options.
- Pipelines automate training, validation, registration, and deployment.
- Managed online endpoints serve real-time inference; batch endpoints serve offline scoring.
- Alternative: Databricks ML, SageMaker, custom Kubernetes, or pure CI/CD.
**Interview Q&A:**
- **Q (L100):** What is Azure ML for? — **A:** End-to-end ML lifecycle management from experimentation to production deployment.
- **Q (L100):** Is it only for data scientists? — **A:** No; architects and DevOps teams use it for governance, deployment, and MLOps.
- **Q (L200):** Online vs batch endpoint? — **A:** Online is low-latency request/response; batch processes large offline datasets asynchronously.
- **Q (L200):** How does it support governance? — **A:** Through model registry, lineage, environments, versioning, RBAC, and reproducible pipelines.
**Red flags to avoid:** Do not use Azure ML for every GenAI app by default; Azure AI Foundry may fit LLM app workflows better.  
**Résumé hook:** Relate it to SD Global Services for evaluating AI hiring models and multimodal interview pipelines.

### Azure Functions
**What it is (L100):** Azure Functions is a serverless compute service for running event-driven code without managing servers. Functions are triggered by HTTP, timers, queues, Event Grid, Service Bus, Blob Storage, and more.  
**Why/when to use it (L100):** Use it for lightweight APIs, automation, event processing, integration glue, and bursty workloads.  
**Core concepts to know (L200):**
- Hosting options include Consumption, Premium, and Dedicated/App Service plans.
- Durable Functions add orchestration, fan-out/fan-in, timers, and stateful workflows.
- Cold start matters on Consumption; Premium reduces cold start and supports VNet.
- Bindings simplify input/output integration with Azure services.
- Alternatives: Logic Apps, Container Apps jobs, App Service, AKS.
**Interview Q&A:**
- **Q (L100):** What is serverless here? — **A:** Azure manages infrastructure and scales execution based on events.
- **Q (L100):** Typical trigger? — **A:** HTTP request, queue message, timer, blob event, or Service Bus message.
- **Q (L200):** Consumption vs Premium? — **A:** Consumption is cost-efficient and event-scaled; Premium adds warm instances, longer execution, and better networking.
- **Q (L200):** When use Durable Functions? — **A:** For stateful orchestration such as approvals, retries, fan-out/fan-in, or long-running workflows.
**Red flags to avoid:** Avoid putting heavy monoliths or long CPU-bound workloads into Functions without checking timeout, scale, and cold-start constraints.  
**Résumé hook:** Connect it to the Automotive Manufacturer Teams assistant for event-driven speech, alerts, and workflow triggers.

### Azure Logic Apps
**What it is (L100):** Azure Logic Apps is a low-code integration and workflow service with connectors for Microsoft, Azure, SaaS, and enterprise systems. It models business processes as triggers, actions, conditions, and loops.  
**Why/when to use it (L100):** Use it for integration workflows, approvals, routing, and automating business processes with minimal custom code.  
**Core concepts to know (L200):**
- Consumption and Standard hosting models differ in isolation, networking, and deployment.
- Connectors integrate with Office 365, SAP, Service Bus, SQL, HTTP, and more.
- Supports retries, scopes, error handling, managed identity, and secure parameters.
- Good for orchestration; not ideal for complex compute-heavy logic.
- Alternatives: Azure Functions, Power Automate, Durable Functions, ADF pipelines.
**Interview Q&A:**
- **Q (L100):** Logic Apps vs Functions? — **A:** Logic Apps is workflow/connectors-first; Functions is code-first serverless compute.
- **Q (L100):** What starts a Logic App? — **A:** A trigger such as HTTP, schedule, message, file, or connector event.
- **Q (L200):** How do you handle failures? — **A:** Use retry policies, scopes, run-after conditions, dead-letter patterns, and monitoring.
- **Q (L200):** When choose Standard? — **A:** For single-tenant hosting, VNet integration, local development, and more predictable isolation.
**Red flags to avoid:** Do not force complex application logic into low-code workflows when maintainability demands code.  
**Résumé hook:** Use the Automotive Manufacturer assistant to discuss workflow automation across plants and shifts.

### Azure Data Factory
**What it is (L100):** Azure Data Factory is a managed data integration service for building ETL/ELT pipelines. It moves and transforms data across cloud, SaaS, and on-premises systems.  
**Why/when to use it (L100):** Use it for scheduled ingestion, data movement, orchestration, and enterprise data pipeline automation.  
**Core concepts to know (L200):**
- Pipelines contain activities; datasets and linked services define data and connections.
- Integration Runtime enables Azure, self-hosted, or SSIS execution.
- Mapping Data Flows provide visual Spark-based transformations.
- Supports triggers, parameters, monitoring, retries, and Git integration.
- Alternatives: Synapse pipelines, Fabric Data Factory, Databricks Workflows.
**Interview Q&A:**
- **Q (L100):** What does ADF do? — **A:** It orchestrates and executes data movement and transformation pipelines.
- **Q (L100):** ETL vs ELT? — **A:** ETL transforms before loading; ELT loads first then transforms in the target engine.
- **Q (L200):** What is Self-hosted IR? — **A:** A runtime installed in a private network to access on-premises or restricted data sources.
- **Q (L200):** When use Data Flows? — **A:** For visual transformations without writing Spark code, though cost/performance must be validated.
**Red flags to avoid:** Do not confuse ADF with a database or analytics engine; it orchestrates movement and transformation.  
**Résumé hook:** Tie it to the UAE Government Informatica-to-SQL migration and governed data pipelines.

### Azure Service Bus
**What it is (L100):** Azure Service Bus is an enterprise messaging service for reliable asynchronous communication between applications. It supports queues, topics/subscriptions, sessions, dead-lettering, and transactions.  
**Why/when to use it (L100):** Use it to decouple services, absorb spikes, guarantee ordered processing where needed, and implement pub/sub workflows.  
**Core concepts to know (L200):**
- Queues are point-to-point; topics/subscriptions are publish-subscribe.
- Sessions provide ordered FIFO processing for related messages.
- Dead-letter queues capture poison, expired, or rejected messages.
- Premium tier provides dedicated resources, better isolation, and predictable performance.
- Alternatives: Event Grid for events, Event Hubs for telemetry streams, Storage Queues for simpler queues.
**Interview Q&A:**
- **Q (L100):** Why use Service Bus? — **A:** To reliably decouple producers and consumers with durable messaging.
- **Q (L100):** Queue vs topic? — **A:** Queue has one logical consumer path; topic distributes messages to multiple subscriptions.
- **Q (L200):** What is dead-lettering? — **A:** Moving failed or undeliverable messages aside for inspection and remediation.
- **Q (L200):** When use sessions? — **A:** When related messages must be processed in order, such as per order or per device workflow.
**Red flags to avoid:** Do not use Service Bus as a high-throughput telemetry ingestion platform; Event Hubs is usually better.  
**Résumé hook:** Relate it to the Automotive Manufacturer assistant for reliable alert and workflow message handling.

### Azure IoT Hub
**What it is (L100):** Azure IoT Hub is a managed service for secure bidirectional communication between IoT devices and cloud applications. It handles device identity, telemetry ingestion, commands, twin state, and device management.  
**Why/when to use it (L100):** Use it for connected-device platforms that need secure device onboarding, telemetry, cloud-to-device messaging, and fleet management.  
**Core concepts to know (L200):**
- Device identities and per-device credentials are central to security.
- Device twins store desired/reported state; direct methods support commands.
- Routes send telemetry to Event Hubs, Storage, Service Bus, or other endpoints.
- Tiers/units affect throughput and features; DPS supports large-scale provisioning.
- Alternatives: Event Hubs for raw streams, MQTT brokers, Azure IoT Central.
**Interview Q&A:**
- **Q (L100):** What is IoT Hub? — **A:** A secure cloud gateway for devices to send telemetry and receive commands.
- **Q (L100):** What is a device twin? — **A:** A JSON document representing desired and reported device state.
- **Q (L200):** IoT Hub vs Event Hubs? — **A:** IoT Hub adds device identity, twins, commands, and management; Event Hubs is stream ingestion.
- **Q (L200):** How scale onboarding? — **A:** Use Device Provisioning Service with enrollment groups or individual enrollments.
**Red flags to avoid:** Do not ignore per-device identity; shared credentials across fleets are a serious design flaw.  
**Résumé hook:** Use the Global Automotive Alliance platform with 20M+ vehicles and 2M telemetry messages/min.

### Azure Data Explorer (ADX / Kusto / KQL)
**What it is (L100):** Azure Data Explorer is a fast analytics service for log, telemetry, time-series, and event data. Kusto Query Language is used for querying and analyzing large volumes interactively.  
**Why/when to use it (L100):** Use it when you need near-real-time analytics over high-volume telemetry, logs, security, or IoT data.  
**Core concepts to know (L200):**
- Tables ingest data from Event Hubs, IoT Hub, Event Grid, Storage, and pipelines.
- KQL supports filtering, aggregation, joins, time-series, and anomaly analysis.
- Hot cache, retention, batching, and ingestion mapping affect cost/performance.
- Materialized views and update policies optimize repeated analytics patterns.
- Alternatives: Log Analytics, Synapse, Databricks, Fabric Real-Time Intelligence.
**Interview Q&A:**
- **Q (L100):** What is ADX best at? — **A:** Fast analytical queries over massive append-heavy event and telemetry data.
- **Q (L100):** What is KQL? — **A:** A read-oriented query language optimized for logs and time-series analytics.
- **Q (L200):** Why use ADX for IoT? — **A:** It handles high-ingestion telemetry and fast time-window analysis efficiently.
- **Q (L200):** How control cost? — **A:** Tune retention, cache policy, batching, cluster size, and query patterns.
**Red flags to avoid:** Do not treat ADX as an OLTP database; it is optimized for analytical workloads.  
**Résumé hook:** Tie it to connected-vehicle telemetry analytics for the Global Automotive Alliance.

### Microsoft Graph Data Connect
**What it is (L100):** Microsoft Graph Data Connect provides governed, bulk export of Microsoft 365 data into Azure data stores for analytics. It is different from Microsoft Graph REST APIs, which are request/response APIs.  
**Why/when to use it (L100):** Use it when you need large-scale M365 datasets for analytics, compliance, productivity insights, or ML pipelines.  
**Core concepts to know (L200):**
- Data is extracted through approved pipelines into Azure Storage/Data Lake.
- Requires tenant admin consent and supports privacy/security controls.
- Commonly orchestrated with Azure Data Factory or Synapse.
- Designed for bulk analytics, not low-latency transactional app calls.
- Alternative: Microsoft Graph REST API for operational access.
**Interview Q&A:**
- **Q (L100):** What does Graph Data Connect do? — **A:** It securely exports Microsoft 365 data at scale for analytics.
- **Q (L100):** How is it different from Graph API? — **A:** Graph API is real-time REST access; Data Connect is governed bulk extraction.
- **Q (L200):** Why is approval important? — **A:** M365 data is sensitive, so tenant-level consent and governance are required.
- **Q (L200):** Where does data land? — **A:** Typically in Azure Storage/Data Lake for processing by ADF, Synapse, or analytics tools.
**Red flags to avoid:** Do not propose Graph Data Connect for real-time user interactions. It is for governed bulk data movement.  
**Résumé hook:** Relate it to secure enterprise data access patterns in the UAE Government marketplace work.

### Microsoft Entra ID
**What it is (L100):** Microsoft Entra ID is Microsoft’s cloud identity and access management service. It provides authentication, authorization, SSO, app registrations, managed identities, Conditional Access, and RBAC integration.  
**Why/when to use it (L100):** Use it as the identity control plane for users, apps, APIs, Azure resources, and enterprise access policies.  
**Core concepts to know (L200):**
- App registrations define application identity; service principals are tenant instances.
- Managed identities let Azure resources access services without stored secrets.
- Conditional Access enforces risk, device, location, MFA, and compliance policies.
- Azure RBAC controls resource-plane access; app roles/scopes control app access.
- Alternatives: external IdPs can federate, but Entra is native for Azure.
**Interview Q&A:**
- **Q (L100):** What is Entra ID? — **A:** Azure’s identity platform for authenticating users and applications.
- **Q (L100):** What is SSO? — **A:** Users authenticate once and access multiple trusted applications.
- **Q (L200):** Managed identity vs service principal secret? — **A:** Managed identity avoids credential storage and rotation for Azure-hosted workloads.
- **Q (L200):** RBAC vs OAuth scopes? — **A:** RBAC governs Azure resource access; OAuth scopes/app roles govern application/API permissions.
**Red flags to avoid:** Do not hardcode client secrets when managed identity is available. Do not confuse authentication with authorization.  
**Résumé hook:** Use it across the secure services marketplace to explain identity, RBAC, and Conditional Access.

### Microsoft Purview
**What it is (L100):** Microsoft Purview is Microsoft’s data governance, catalog, compliance, and risk management platform. It helps discover, classify, protect, and govern data across Azure, Microsoft 365, and other sources.  
**Why/when to use it (L100):** Use it when organizations need data cataloging, lineage, sensitivity classification, access governance, DLP, and compliance visibility.  
**Core concepts to know (L200):**
- Data Map scans sources and captures metadata, classifications, and lineage.
- Data catalog enables discovery, ownership, glossary, and business context.
- Sensitivity labels and DLP help protect regulated information.
- Lineage shows data movement across pipelines and transformations.
- Alternatives: Collibra, Informatica governance, Alation, native platform catalogs.
**Interview Q&A:**
- **Q (L100):** What is Purview for? — **A:** Discovering, classifying, governing, and protecting enterprise data.
- **Q (L100):** What is lineage? — **A:** A view of where data came from, how it changed, and where it flows.
- **Q (L200):** How does Purview support compliance? — **A:** Through classification, cataloging, access insights, DLP, labels, and audit-oriented governance.
- **Q (L200):** What is a common integration? — **A:** Scanning data stores and connecting lineage from ADF, Synapse, SQL, and other sources.
**Red flags to avoid:** Do not present Purview as only a catalog; it also spans protection, compliance, and governance.  
**Résumé hook:** Tie directly to the UAE Government data-sovereignty project using Purview lineage, access controls, and residency.

### Azure Service Fabric
**What it is (L100):** Azure Service Fabric is a distributed systems platform for packaging, deploying, and managing scalable microservices and containers. It supports stateless and stateful services with orchestration, health monitoring, and rolling upgrades.  
**Why/when to use it (L100):** Use it for complex, long-running, high-scale microservice platforms, especially where stateful services and mature Service Fabric investments exist.  
**Core concepts to know (L200):**
- Supports stateless services, stateful reliable services, actors, and containers.
- Clusters consist of node types, upgrade domains, fault domains, and health policies.
- Provides rolling upgrades, service discovery, partitioning, and replication.
- Requires operational expertise compared with newer managed container platforms.
- Alternatives: AKS, Azure Container Apps, App Service, Functions.
**Interview Q&A:**
- **Q (L100):** What is Service Fabric? — **A:** A platform for running and managing distributed microservices at scale.
- **Q (L100):** Is it only for containers? — **A:** No. It supports native Service Fabric services and containers.
- **Q (L200):** Why use stateful services? — **A:** To colocate compute with replicated state for low-latency, partitioned workloads.
- **Q (L200):** Service Fabric vs AKS? — **A:** AKS is Kubernetes-based and ecosystem-rich; Service Fabric has native stateful service patterns but more specialized operations.
**Red flags to avoid:** Do not choose Service Fabric by default for new container workloads without comparing AKS and Container Apps.  
**Résumé hook:** Use the Global Automotive Alliance platform to discuss Service Fabric at connected-vehicle scale with 40+ engineers.

## AI & GenAI

This guide covers the AI & GenAI concepts a senior GenAI Solution Architect should explain from fundamentals to practical production trade-offs. Focus on crisp definitions, architecture choices, evaluation, governance, and real project applicability.

### RAG (Retrieval-Augmented Generation)
**What it is (L100):** RAG combines retrieval from external knowledge sources with LLM generation. Instead of relying only on model memory, it injects relevant documents into the prompt.
**Why/when to use it (L100):** Use RAG when answers must be grounded in private, changing, or auditable enterprise knowledge.
**Core concepts to know (L200):**
- Chunk by semantic sections, headings, tables, or sliding windows; tune size/overlap for recall vs noise.
- Embeddings map text to vectors; quality depends on model, normalization, metadata, and domain language.
- Vector search finds semantic similarity; hybrid combines keyword + vector; semantic retrieval adds ranker intent understanding.
- Reranking improves top-k quality before context injection.
- Manage context with compression, metadata filters, citation spans, and “lost-in-the-middle” mitigation.
- Hallucination mitigation: grounding, citations, abstention, evals, and constrained generation.
- RAG is better than fine-tuning for fresh knowledge; fine-tuning is better for style, behavior, or domain task adaptation.
**Interview Q&A:**
- **Q (L100):** What problem does RAG solve? — **A:** It lets an LLM answer using external, current, private data without retraining the model.
- **Q (L100):** What is a vector database used for? — **A:** It stores embeddings and retrieves semantically similar chunks.
- **Q (L200):** Why use hybrid retrieval? — **A:** It combines exact keyword precision with semantic recall, useful for contracts, IDs, clauses, and jargon.
- **Q (L200):** How do you evaluate RAG? — **A:** Measure retrieval recall/precision, groundedness, citation accuracy, answer relevance, latency, and cost.
**Red flags to avoid:** Do not say RAG eliminates hallucinations. Avoid treating chunk size, top-k, and embedding choice as one-time defaults.
**Résumé hook:** Tie this to the Global CPG procurement RAG platform on Azure AI Foundry with 20,000 documents and fine-tuning-vs-RAG evaluation.

### Multi-agent systems
**What it is (L100):** Multi-agent systems coordinate multiple AI agents, each with a role, tools, memory, or goal. Agents can collaborate, delegate, critique, or execute workflows.
**Why/when to use it (L100):** Use them when a task benefits from decomposition, specialization, tool use, or iterative planning.
**Core concepts to know (L200):**
- Patterns: sequential pipelines, concurrent agents, hierarchical supervisor, planner-executor, and group-chat.
- Tool use requires schemas, permissions, retries, validation, and audit logs.
- Memory can be short-term state, long-term vector memory, or workflow context.
- Hand-offs must carry goal, state, constraints, and expected output.
- Control loops with max steps, timeouts, guardrails, human approval, and termination criteria.
**Interview Q&A:**
- **Q (L100):** What is an AI agent? — **A:** An LLM-driven component that reasons over goals, state, and tools to produce actions.
- **Q (L100):** Why use multiple agents? — **A:** To split complex work into specialized roles such as planner, researcher, verifier, and executor.
- **Q (L200):** What causes agent loops? — **A:** Ambiguous goals, missing stopping criteria, poor tool feedback, or self-correction without limits.
- **Q (L200):** How do you make agents production-safe? — **A:** Use deterministic orchestration, permissions, evals, telemetry, circuit breakers, and human-in-loop gates.
**Red flags to avoid:** Do not make every workflow agentic. Many enterprise flows need deterministic orchestration plus small LLM steps.
**Résumé hook:** Connect this to reusable AI claim summarisation and validation patterns for the Global Insurance Broker.

### LangGraph
**What it is (L100):** LangGraph is a graph-based framework for building stateful, controllable LLM agent workflows. It extends LangChain concepts with nodes, edges, state, and cycles.
**Why/when to use it (L100):** Use it when agent flows need explicit state machines, branching, retries, human approval, or durable execution.
**Core concepts to know (L200):**
- Nodes represent steps; edges define transitions; state is passed and updated.
- Supports cyclic workflows like plan-act-observe-revise with termination guards.
- Better suited than basic chains for complex agent orchestration.
- Checkpointing enables recovery, inspection, and human-in-loop workflows.
- Useful for supervisor, router, tool-calling, and multi-agent graphs.
**Interview Q&A:**
- **Q (L100):** How is LangGraph different from LangChain? — **A:** LangChain provides components/chains; LangGraph provides explicit stateful graph orchestration.
- **Q (L100):** What is graph state? — **A:** Shared structured data passed between workflow nodes.
- **Q (L200):** Why are cycles useful? — **A:** They allow agents to iterate, validate, retry, and refine until a stop condition is met.
- **Q (L200):** What production concern does checkpointing solve? — **A:** It supports resumability, debugging, auditability, and human review.
**Red flags to avoid:** Do not describe LangGraph as just prompt chaining. Its value is controlled stateful orchestration.
**Résumé hook:** Map LangGraph-style orchestration to invoice audit workflows with validation, exception handling, and no persistent document storage.

### CrewAI
**What it is (L100):** CrewAI is a role-based multi-agent framework where agents collaborate as a “crew” on tasks. It emphasizes roles, goals, tools, and process flow.
**Why/when to use it (L100):** Use it for prototyping collaborative agent workflows such as researcher-writer-reviewer or planner-executor patterns.
**Core concepts to know (L200):**
- Agents have roles, backstories, tools, and goals.
- Tasks define expected outputs and dependencies.
- Processes can be sequential or hierarchical.
- Useful for demos and workflow ideation; production needs strong guardrails and observability.
- Tool permissioning and deterministic validation remain external responsibilities.
**Interview Q&A:**
- **Q (L100):** What is a CrewAI agent? — **A:** A role-defined LLM worker assigned tasks and tools.
- **Q (L100):** What is a crew? — **A:** A coordinated group of agents working toward a shared objective.
- **Q (L200):** When is CrewAI less ideal? — **A:** When enterprise compliance, deep Microsoft 365 integration, or deterministic workflow control is required.
- **Q (L200):** How do you reduce unreliable outputs? — **A:** Add structured outputs, validators, tool constraints, retries, and final review agents.
**Red flags to avoid:** Avoid assuming role prompts alone create reliable enterprise automation.
**Résumé hook:** Relate this to AI hiring workflows where evaluator, bias-checker, and summarizer roles can be separated.

### Semantic Kernel
**What it is (L100):** Semantic Kernel is Microsoft’s SDK for integrating LLMs with conventional code, plugins, planners, and memory. It supports C#, Python, and Java.
**Why/when to use it (L100):** Use it to embed AI capabilities into enterprise applications with strong software-engineering patterns.
**Core concepts to know (L200):**
- Plugins expose native functions or prompts as callable skills.
- Planners can select steps, but production flows often prefer explicit orchestration.
- Supports prompt templates, connectors, memory, and tool calling.
- Fits well with Azure OpenAI, Microsoft identity, and enterprise apps.
- Microsoft Agent Framework is the newer unified successor combining Semantic Kernel and AutoGen ideas.
**Interview Q&A:**
- **Q (L100):** What is a Semantic Kernel plugin? — **A:** A collection of functions the model or app can invoke.
- **Q (L100):** Is Semantic Kernel only for chatbots? — **A:** No, it supports AI workflows inside normal applications.
- **Q (L200):** Why wrap tools as native functions? — **A:** To enforce typed inputs, permissions, logging, and deterministic business logic.
- **Q (L200):** When prefer explicit orchestration over planners? — **A:** For regulated, auditable, high-risk enterprise workflows.
**Red flags to avoid:** Do not confuse Semantic Kernel with a low-code bot platform.
**Résumé hook:** Link it to reusable AI patterns for claim summarisation and validation.

### LangChain
**What it is (L100):** LangChain is a framework for composing LLM apps using models, prompts, retrievers, tools, chains, and agents. It accelerates prototyping and integration.
**Why/when to use it (L100):** Use it when you need a broad ecosystem for RAG, tool calling, memory, and model-provider abstraction.
**Core concepts to know (L200):**
- Chains compose deterministic LLM steps.
- Retrievers connect vector stores and search backends.
- Agents decide tool use dynamically.
- LCEL supports composable runnable pipelines.
- Production requires version pinning, tracing, evals, and careful abstraction boundaries.
**Interview Q&A:**
- **Q (L100):** What is a chain? — **A:** A sequence of components such as prompt, model, parser, and retriever.
- **Q (L100):** What is a retriever? — **A:** A component that returns relevant context for a query.
- **Q (L200):** LangChain vs LangGraph? — **A:** LangChain offers components; LangGraph handles stateful graph orchestration.
- **Q (L200):** What is a production risk? — **A:** Over-abstraction can hide prompts, retrieval behavior, latency, and errors.
**Red flags to avoid:** Do not equate LangChain with the architecture itself; it is an implementation toolkit.
**Résumé hook:** Apply it to RAG prototyping for contract comparison and issue detection.

### Microsoft Agent Framework
**What it is (L100):** Microsoft Agent Framework is Microsoft’s newer unified framework for building agents, combining ideas from Semantic Kernel and AutoGen. It targets pro-code, enterprise-grade agent orchestration.
**Why/when to use it (L100):** Use it for Microsoft-aligned agent systems needing tools, workflows, observability, governance, and Azure integration.
**Core concepts to know (L200):**
- Supports agent collaboration, tool use, memory, and structured workflows.
- Encourages clearer orchestration than ad-hoc autonomous loops.
- Aligns with Azure AI Foundry and enterprise governance patterns.
- Useful when moving from prototypes to managed, observable agents.
- Complements, rather than replaces, low-code Copilot Studio scenarios.
**Interview Q&A:**
- **Q (L100):** What problem does it address? — **A:** Building reliable enterprise agents with unified Microsoft patterns.
- **Q (L100):** Is it the same as Copilot Studio? — **A:** No, it is pro-code; Copilot Studio is low-code.
- **Q (L200):** Why mention Semantic Kernel and AutoGen? — **A:** It unifies plugin/workflow ideas with multi-agent collaboration concepts.
- **Q (L200):** What should architects evaluate? — **A:** Governance, telemetry, deployment model, tool permissions, and integration fit.
**Red flags to avoid:** Avoid presenting it as merely a renamed SDK; position it as Microsoft’s unified direction for pro-code agents.
**Résumé hook:** Relate it to Microsoft leadership work building AI Apprentice and AI Mastery curricula.

### Copilot Studio
**What it is (L100):** Copilot Studio is Microsoft’s low-code platform for creating copilots and agents connected to business data and actions. It integrates with Microsoft 365, Power Platform, connectors, and governance controls.
**Why/when to use it (L100):** Use it when business teams need governed, configurable copilots without full custom engineering.
**Core concepts to know (L200):**
- Topics, actions, connectors, knowledge sources, and generative answers.
- Strong fit for Teams and business-process automation.
- Supports authentication, environments, DLP, and admin governance.
- Less flexible than pro-code SDKs for complex custom orchestration.
- Needs testing for grounding, permissions, and escalation paths.
**Interview Q&A:**
- **Q (L100):** Is Copilot Studio low-code? — **A:** Yes, it lets makers build agents using configuration and connectors.
- **Q (L100):** What are actions? — **A:** Operations an agent can invoke, often through connectors or flows.
- **Q (L200):** When not to use it? — **A:** For highly custom orchestration, specialized runtime control, or complex ML pipelines.
- **Q (L200):** What governance matters? — **A:** DLP, identity, environment strategy, connector permissions, and audit logs.
**Red flags to avoid:** Do not claim Copilot Studio automatically solves data security; permissions and connector governance still matter.
**Résumé hook:** Connect it to the AI Teams assistant deployed across roughly 50 automotive plants.

### Microsoft 365 Agents SDK / M365 SDK
**What it is (L100):** Microsoft 365 Agents SDK is a pro-code approach for building agents that integrate with Microsoft 365 experiences such as Teams and Copilot. It gives developers more control than low-code tools.
**Why/when to use it (L100):** Use it for custom enterprise agents requiring code-level control, M365 integration, authentication, and backend workflows.
**Core concepts to know (L200):**
- Pro-code alternative to low-code Copilot Studio for custom scenarios.
- Integrates with Teams, Microsoft 365 app surfaces, identity, and Graph-oriented data/actions.
- Requires careful permission design and tenant governance.
- Useful for event-driven agents, notifications, workflow initiation, and enterprise UX.
- Production needs monitoring, auth validation, throttling, and safe action execution.
**Interview Q&A:**
- **Q (L100):** How is it different from Copilot Studio? — **A:** It is developer-centric and offers deeper code/runtime control.
- **Q (L100):** Why use Microsoft Graph? — **A:** To access M365 data and actions under user or app permissions.
- **Q (L200):** What is a key security concern? — **A:** Overbroad Graph permissions or actions executed without user intent validation.
- **Q (L200):** What makes an M365 agent useful? — **A:** It appears in user workflows, uses enterprise context, and safely triggers actions.
**Red flags to avoid:** Do not treat M365 agents as generic web chatbots; their value is contextual productivity integration.
**Résumé hook:** Tie this to the automotive Teams assistant with speech-to-text, alerts, and workflow initiation.

### AI evaluation (offline & online eval of LLM apps)
**What it is (L100):** AI evaluation measures whether an LLM application is accurate, relevant, grounded, safe, and useful. Offline eval uses datasets; online eval observes real production behavior.
**Why/when to use it (L100):** Use evaluation before launch, after prompt/model/retrieval changes, and continuously in production.
**Core concepts to know (L200):**
- Groundedness/faithfulness checks whether answers are supported by source context.
- Relevance and answer quality measure usefulness for the user’s query.
- Golden datasets include representative queries, expected answers, sources, and edge cases.
- LLM-as-judge is scalable but needs calibration and human spot checks.
- Azure AI evaluation and online monitoring help track quality, safety, latency, and drift.
**Interview Q&A:**
- **Q (L100):** What is groundedness? — **A:** Whether the answer is supported by retrieved or provided evidence.
- **Q (L100):** What is a golden dataset? — **A:** A curated benchmark of inputs, expected outputs, and evaluation criteria.
- **Q (L200):** Why combine human and LLM judges? — **A:** Humans calibrate quality; LLM judges scale repeatable scoring.
- **Q (L200):** What should online monitoring track? — **A:** Failure rates, hallucinations, user feedback, safety issues, latency, cost, and drift.
**Red flags to avoid:** Do not rely only on demo prompts. Evaluation must include adversarial, ambiguous, and domain-realistic cases.
**Résumé hook:** Connect to SD Global Services’ multimodal hiring platform with bias-aware evaluation.

### Prompt orchestration
**What it is (L100):** Prompt orchestration is the structured management of prompts, context, tools, model calls, and outputs across an AI workflow. It turns raw prompting into repeatable application behavior.
**Why/when to use it (L100):** Use it when an app has multi-step reasoning, retrieval, validation, routing, or tool execution.
**Core concepts to know (L200):**
- Prompt templates separate instructions, variables, examples, and output contracts.
- Routing selects prompts/models/tools based on intent or risk.
- Structured outputs use JSON schemas, function calling, or parsers.
- Context assembly must manage token limits and source priority.
- Version prompts and evaluate changes like code.
**Interview Q&A:**
- **Q (L100):** What is a system prompt? — **A:** High-priority instruction defining role, constraints, and behavior.
- **Q (L100):** Why use structured output? — **A:** To make model responses machine-parseable and easier to validate.
- **Q (L200):** How do you handle prompt drift? — **A:** Version prompts, run regression evals, and monitor production quality.
- **Q (L200):** What is prompt injection defense? — **A:** Separating trusted instructions from untrusted content and validating tool actions.
**Red flags to avoid:** Do not hide business logic inside long prompts when deterministic code is better.
**Résumé hook:** Apply this to contract comparison, issue detection, and renewal workflows in the procurement platform.

### Responsible AI
**What it is (L100):** Responsible AI ensures AI systems are fair, reliable, safe, private, secure, transparent, and accountable. It is both a design discipline and operating model.
**Why/when to use it (L100):** Use it throughout the lifecycle, especially for hiring, finance, insurance, healthcare, and employee-facing systems.
**Core concepts to know (L200):**
- Assess harms: bias, privacy leakage, unsafe advice, hallucination, exclusion, and misuse.
- Use data minimization, access control, red teaming, and content safety filters.
- Explain system limits, sources, confidence, and escalation paths.
- Human-in-loop is needed for high-impact decisions.
- Monitor drift, complaints, and subgroup performance.
**Interview Q&A:**
- **Q (L100):** What is AI fairness? — **A:** Avoiding unjustified performance or outcome differences across groups.
- **Q (L100):** What is transparency? — **A:** Making users aware of AI use, limits, and evidence.
- **Q (L200):** How do you handle bias in hiring AI? — **A:** Validate features, measure subgroup metrics, remove proxies, audit outputs, and keep humans accountable.
- **Q (L200):** What is red teaming? — **A:** Systematically testing harmful, adversarial, or policy-breaking behavior.
**Red flags to avoid:** Do not reduce Responsible AI to content filtering; it includes governance, process, measurement, and accountability.
**Résumé hook:** Tie directly to the bias-aware multimodal hiring platform and Microsoft AI skilling leadership.

### PyTorch
**What it is (L100):** PyTorch is an open-source deep learning framework for building and training neural networks. It uses tensors, automatic differentiation, and GPU acceleration.
**Why/when to use it (L100):** Use it for model research, custom training, fine-tuning, and deep learning experimentation.
**Core concepts to know (L200):**
- Tensors are multidimensional arrays executed on CPU/GPU.
- Autograd builds computation graphs and computes gradients.
- Training loop: forward pass, loss, backward pass, optimizer step.
- Manage overfitting with regularization, validation, dropout, and early stopping.
- Production concerns include reproducibility, checkpoints, batching, and hardware efficiency.
**Interview Q&A:**
- **Q (L100):** What is a tensor? — **A:** A multidimensional numeric array used for model inputs, weights, and activations.
- **Q (L100):** What does autograd do? — **A:** Automatically computes gradients for backpropagation.
- **Q (L200):** Why use mixed precision? — **A:** It reduces memory and speeds training/inference on supported GPUs.
- **Q (L200):** How do you debug training? — **A:** Check data, loss curves, gradients, learning rate, overfitting, and validation metrics.
**Red flags to avoid:** Do not claim PyTorch is only for research; it is widely used in production pipelines too.
**Résumé hook:** Link to M.Tech AIML work in deep neural networks, math for ML, PyTorch training, and evaluation.

### HuggingFace Transformers
**What it is (L100):** HuggingFace Transformers is a library and ecosystem for using pretrained transformer models. It supports NLP, vision, audio, multimodal models, tokenizers, datasets, and fine-tuning.
**Why/when to use it (L100):** Use it to quickly load, evaluate, adapt, and deploy pretrained models for domain tasks.
**Core concepts to know (L200):**
- Tokenizers convert text to model-readable token IDs.
- Models can be used via pipelines, trainer APIs, or custom PyTorch loops.
- Fine-tuning adapts weights; PEFT/LoRA reduces compute and storage.
- Evaluate with task-specific metrics plus safety and bias checks.
- Production needs model cards, licensing review, latency testing, and quantization options.
**Interview Q&A:**
- **Q (L100):** What is a pretrained model? — **A:** A model trained on large datasets before being adapted to a specific task.
- **Q (L100):** What does a tokenizer do? — **A:** Splits input into tokens and maps them to numeric IDs.
- **Q (L200):** When use LoRA? — **A:** When fine-tuning large models efficiently with fewer trainable parameters.
- **Q (L200):** What should you check before using a model? — **A:** License, model card, data risks, benchmarks, size, latency, and deployment constraints.
**Red flags to avoid:** Do not fine-tune by default; compare against prompting, RAG, adapters, and smaller task-specific models.
**Résumé hook:** Tie this to M.Tech AIML fine-tuning/evaluation work and practical enterprise model selection.

## Engineering

Engineering interview prep should prove both fundamentals and hands-on delivery judgment. For a Solution Architect / Technical Lead, focus on clear trade-offs, production readiness, and how each technology supports scalable systems.

### Python (with FastAPI and Flask)
**What it is (L100):** Python is a high-level, dynamically typed language widely used for APIs, automation, data, AI, and scripting. FastAPI and Flask are Python web frameworks for building HTTP services.
**Why/when to use it (L100):** Use Python when developer productivity, ecosystem depth, and AI/data integration matter. Use FastAPI for modern typed async APIs; Flask for lightweight synchronous apps.
**Core concepts to know (L200):**
- Typing improves maintainability but is optional at runtime.
- `async`/`await` helps I/O-bound concurrency, not CPU-bound work.
- The GIL limits parallel Python bytecode execution in threads.
- Use virtualenv/poetry/pip-tools to isolate dependencies.
- FastAPI uses ASGI, Pydantic validation, dependency injection, and async handlers.
- Flask is WSGI-first, minimal, synchronous by default, and extension-driven.
**Interview Q&A:**
- **Q (L100):** What is Python typing? — **A:** Type hints document expected shapes and enable tools like mypy, IDEs, and Pydantic validation.
- **Q (L100):** FastAPI vs Flask? — **A:** FastAPI is typed, async-first, OpenAPI-native; Flask is simpler, mature, sync-first, and flexible.
- **Q (L200):** When does async help? — **A:** For many concurrent I/O waits like HTTP, DB, or queue calls; CPU-heavy work needs processes or workers.
- **Q (L200):** Show a FastAPI endpoint. — **A:**
```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Invoice(BaseModel):
    id: str
    amount: float

@app.post("/invoices", status_code=201)
async def create_invoice(invoice: Invoice):
    return {"accepted": True, "id": invoice.id}
```
**Red flags to avoid:** Do not claim async makes CPU code faster. Do not ignore dependency isolation or schema validation.
**Résumé hook:** Connect this to Python skilling programmes and FastAPI-style services on the Global CPG RAG platform.

### C# / .NET Core
**What it is (L100):** C# is a statically typed, object-oriented language. .NET Core/.NET is a cross-platform runtime and framework for APIs, services, desktop, cloud, and background workers.
**Why/when to use it (L100):** Use it for enterprise-grade systems needing performance, strong tooling, maintainability, and Azure integration.
**Core concepts to know (L200):**
- CLR manages memory, JIT compilation, exceptions, and garbage collection.
- C# supports OOP, generics, LINQ, async/await, records, and pattern matching.
- Dependency Injection is built into modern .NET hosting.
- `Task`-based async improves scalability for I/O-bound services.
- Entity Framework Core maps objects to relational databases.
- Configuration, logging, health checks, and middleware are first-class.
**Interview Q&A:**
- **Q (L100):** What is .NET Core? — **A:** A cross-platform, open-source .NET runtime for building modern applications and services.
- **Q (L100):** What is garbage collection? — **A:** Automatic memory management that reclaims unreachable objects.
- **Q (L200):** Why use DI? — **A:** It decouples construction from behavior, improves testability, and centralizes lifetimes.
- **Q (L200):** What does async improve in APIs? — **A:** It frees threads during I/O waits, increasing request throughput under load.
**Red flags to avoid:** Avoid confusing .NET Framework with modern .NET. Do not block on async calls using `.Result` or `.Wait()`.
**Résumé hook:** Tie this to 8 years of full-stack .NET, Azure, SQL, and enterprise delivery at Intersoft Data Labs.

### ASP.NET MVC / Web API
**What it is (L100):** ASP.NET MVC structures web applications around Models, Views, and Controllers. ASP.NET Web API builds HTTP services returning JSON or other representations.
**Why/when to use it (L100):** Use MVC for server-rendered applications and Web API for RESTful backends consumed by web, mobile, or services.
**Core concepts to know (L200):**
- Routing maps URLs and verbs to controller actions.
- Model binding converts request data into typed objects.
- Filters handle cross-cutting concerns like auth and errors.
- Middleware processes requests before controllers.
- Attribute routing improves explicit API design.
- Validation attributes and DTOs protect domain models.
**Interview Q&A:**
- **Q (L100):** What is MVC? — **A:** A separation pattern: Model holds data/rules, View renders UI, Controller handles requests.
- **Q (L100):** What does Web API return? — **A:** Resources, usually JSON, over HTTP.
- **Q (L200):** Middleware vs filter? — **A:** Middleware works across the pipeline; filters wrap MVC action execution.
- **Q (L200):** Why use DTOs? — **A:** They prevent over-posting, stabilize contracts, and decouple API shape from persistence models.
**Red flags to avoid:** Do not expose EF entities directly. Do not put business logic inside controllers.
**Résumé hook:** Link this to Intersoft REST APIs and ASP.NET/Azure/SQL modernization work.

### REST API design
**What it is (L100):** REST is an architectural style using resources, representations, stateless requests, and standard HTTP semantics. APIs expose nouns like `/orders`, not actions like `/doOrder`.
**Why/when to use it (L100):** Use REST for interoperable, cacheable, web-friendly service contracts.
**Core concepts to know (L200):**
- Use verbs correctly: GET, POST, PUT, PATCH, DELETE.
- Status codes communicate outcomes: 200, 201, 204, 400, 401, 404, 409, 500.
- GET, PUT, DELETE should be idempotent by design.
- Version via URL, header, or media type with compatibility rules.
- Pagination uses limit/offset or cursor-based tokens.
- Know Richardson maturity and HATEOAS, even if not fully implemented.
**Interview Q&A:**
- **Q (L100):** What is statelessness? — **A:** Each request contains all context needed; the server does not rely on session state.
- **Q (L100):** POST vs PUT? — **A:** POST creates subordinate resources or actions; PUT replaces a known resource idempotently.
- **Q (L200):** How handle pagination? — **A:** Prefer cursor pagination for changing datasets; include next links or tokens.
- **Q (L200):** What is a 409? — **A:** Conflict, often used for duplicate keys, version conflicts, or invalid state transitions.
**Red flags to avoid:** Avoid tunneling all operations through POST. Do not return 200 for every error.
**Résumé hook:** Position REST design through Intersoft APIs and microservice foundations.

### Microservices
**What it is (L100):** Microservices are independently deployable services organized around business capabilities. Each service owns its logic, API, and ideally its data.
**Why/when to use it (L100):** Use microservices when independent scaling, team autonomy, and domain isolation outweigh distributed-systems complexity.
**Core concepts to know (L200):**
- Bounded contexts align services with domain boundaries.
- Data-per-service avoids hidden coupling through shared databases.
- Sync calls are simple but create runtime dependency chains.
- Async messaging improves decoupling and resilience.
- Sagas coordinate distributed transactions through choreography or orchestration.
- Gateways, discovery, retries, circuit breakers, and bulkheads improve operations.
**Interview Q&A:**
- **Q (L100):** Microservice vs monolith? — **A:** A monolith deploys as one unit; microservices deploy independently around bounded capabilities.
- **Q (L100):** Why separate databases? — **A:** To preserve service autonomy and prevent schema-level coupling.
- **Q (L200):** How handle distributed transactions? — **A:** Use sagas and compensating actions instead of two-phase commits in most cloud systems.
- **Q (L200):** When avoid microservices? — **A:** Small teams, unclear domains, or low scale where operational overhead exceeds benefits.
**Red flags to avoid:** Do not split by technical layers. Avoid assuming microservices automatically improve performance.
**Résumé hook:** Tie this to the Global Automotive Alliance connected-vehicle platform and containerized invoice processing.

### React.js
**What it is (L100):** React is a JavaScript library for building component-based user interfaces. It uses declarative rendering and state-driven updates.
**Why/when to use it (L100):** Use React for interactive web apps, reusable UI components, and large ecosystems such as Next.js.
**Core concepts to know (L200):**
- Components receive props and manage local state.
- Hooks like `useState`, `useEffect`, and `useMemo` compose behavior.
- One-way data flow improves predictability.
- Controlled components manage form state in React.
- Keys help reconciliation in lists.
- Performance needs memoization, code splitting, and avoiding unnecessary renders.
**Interview Q&A:**
- **Q (L100):** What is JSX? — **A:** A syntax extension that lets components describe UI using HTML-like markup.
- **Q (L100):** Props vs state? — **A:** Props come from parents; state is owned and changed by the component.
- **Q (L200):** When use `useEffect`? — **A:** For side effects like fetching, subscriptions, or syncing with external systems.
- **Q (L200):** Why are keys important? — **A:** They help React identify list items correctly during reconciliation.
**Red flags to avoid:** Do not mutate state directly. Avoid putting every value in global state.
**Résumé hook:** Connect this to React front-ends delivered during Intersoft full-stack engagements.

### Angular
**What it is (L100):** Angular is a full-featured TypeScript framework for building structured single-page applications. It includes routing, forms, HTTP, dependency injection, and build tooling.
**Why/when to use it (L100):** Use Angular for enterprise teams needing opinionated architecture, consistency, and large-scale maintainability.
**Core concepts to know (L200):**
- Components render UI; services hold reusable logic.
- Dependency Injection manages service lifetimes.
- RxJS Observables model async streams.
- Modules or standalone components organize features.
- Reactive forms provide typed, testable form control.
- Guards, interceptors, and resolvers support routing and cross-cutting behavior.
**Interview Q&A:**
- **Q (L100):** Angular vs React? — **A:** Angular is a complete framework; React is a UI library with ecosystem choices.
- **Q (L100):** What is a service? — **A:** A class for shared logic or data access, usually injected into components.
- **Q (L200):** Promise vs Observable? — **A:** Promise emits once; Observable can emit multiple values and be cancelled.
- **Q (L200):** Why use interceptors? — **A:** To add auth headers, logging, retries, or error handling centrally.
**Red flags to avoid:** Do not put API logic directly in components. Avoid unmanaged subscriptions causing memory leaks.
**Résumé hook:** Tie Angular to enterprise front-end delivery across Intersoft projects.

### Docker
**What it is (L100):** Docker packages applications and dependencies into portable container images. Containers run isolated processes using the host OS kernel.
**Why/when to use it (L100):** Use Docker for consistent local, CI, and production environments, especially for microservices.
**Core concepts to know (L200):**
- Images are immutable templates; containers are runtime instances.
- Dockerfiles define layered builds.
- Multi-stage builds reduce image size.
- Volumes persist data outside containers.
- Environment variables configure runtime behavior.
- Registries store and distribute images.
**Interview Q&A:**
- **Q (L100):** Container vs VM? — **A:** Containers share the host kernel and are lighter; VMs include a full guest OS.
- **Q (L100):** What is an image? — **A:** A versioned filesystem and metadata used to create containers.
- **Q (L200):** Why multi-stage builds? — **A:** To compile in one stage and ship only runtime artifacts.
- **Q (L200):** Example Dockerfile? — **A:**
```dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0"]
```
**Red flags to avoid:** Do not run containers as root unnecessarily. Avoid baking secrets into images.
**Résumé hook:** Link Docker to containerized automotive and invoice-processing platforms.

### Kubernetes
**What it is (L100):** Kubernetes orchestrates containers across a cluster. It manages scheduling, networking, scaling, rollout, and self-healing.
**Why/when to use it (L100):** Use Kubernetes for production container platforms needing high availability, scaling, and standardized operations.
**Core concepts to know (L200):**
- Pods run containers; Deployments manage replicas and rollouts.
- Services provide stable networking; Ingress exposes HTTP routes.
- HPA scales workloads based on metrics.
- Requests/limits guide scheduling and resource control.
- Probes detect startup, readiness, and liveness.
- ConfigMaps, Secrets, and namespaces separate configuration and scope.
**Interview Q&A:**
- **Q (L100):** What is a pod? — **A:** The smallest deployable unit, containing one or more tightly coupled containers.
- **Q (L100):** Service vs Ingress? — **A:** Service gives internal stable access; Ingress routes external HTTP traffic.
- **Q (L200):** Why readiness probes? — **A:** To avoid sending traffic before the app is ready.
- **Q (L200):** Example manifest snippet? — **A:**
```yaml
resources:
  requests:
    cpu: "250m"
    memory: "256Mi"
  limits:
    cpu: "500m"
    memory: "512Mi"
```
**Red flags to avoid:** Do not deploy without probes or resource limits. Avoid storing plain secrets in manifests.
**Résumé hook:** Tie Kubernetes to hyperscale connected-vehicle microservices and Azure engagements.

### Azure DevOps
**What it is (L100):** Azure DevOps is Microsoft’s platform for repos, boards, pipelines, artifacts, and test plans. It supports planning, source control, CI/CD, and release governance.
**Why/when to use it (L100):** Use it when teams need integrated delivery workflows, Azure alignment, and enterprise controls.
**Core concepts to know (L200):**
- Repos support Git branching, PRs, and policies.
- Boards track epics, features, stories, and bugs.
- Pipelines define YAML-based build and release automation.
- Artifacts host packages and feeds.
- Service connections authorize deployments to Azure.
- Environments, approvals, and checks control promotion.
**Interview Q&A:**
- **Q (L100):** What are Azure Pipelines? — **A:** Automated workflows for building, testing, packaging, and deploying code.
- **Q (L100):** What is a service connection? — **A:** A secured identity/configuration used by pipelines to access external systems.
- **Q (L200):** Why use branch policies? — **A:** To enforce reviews, builds, and quality gates before merging.
- **Q (L200):** How manage secrets? — **A:** Use variable groups, Key Vault integration, and scoped permissions.
**Red flags to avoid:** Do not give pipelines broad production permissions. Avoid manual deployment steps hidden outside pipelines.
**Résumé hook:** Connect Azure DevOps to delivery leadership across Docker, Kubernetes, and Terraform engagements.

### CI/CD
**What it is (L100):** CI/CD automates integration, validation, packaging, and deployment. CI proves code quality; CD promotes validated artifacts through environments.
**Why/when to use it (L100):** Use CI/CD to reduce release risk, improve feedback speed, and make deployments repeatable.
**Core concepts to know (L200):**
- Stages include build, test, scan, package, deploy, verify.
- Artifacts should be immutable and promoted, not rebuilt per environment.
- Environments require approvals, checks, and rollback plans.
- Blue-green and canary reduce release blast radius.
- IaC integration provisions infrastructure consistently.
- Pipeline security includes least privilege and secret management.
**Interview Q&A:**
- **Q (L100):** What is CI? — **A:** Frequent merging with automated validation to catch issues early.
- **Q (L100):** What is CD? — **A:** Automated delivery or deployment of validated changes to target environments.
- **Q (L200):** Canary vs blue-green? — **A:** Canary shifts traffic gradually; blue-green switches between two complete environments.
- **Q (L200):** Why promote artifacts? — **A:** It guarantees the tested build is the one deployed.
**Red flags to avoid:** Do not skip tests to “speed up” delivery. Avoid environment drift outside automation.
**Résumé hook:** Tie CI/CD to leading 40+ engineers on SLA-driven automotive platform delivery.

### Terraform
**What it is (L100):** Terraform is an Infrastructure as Code tool for declaring, planning, and applying cloud resources. It uses providers to manage platforms like Azure.
**Why/when to use it (L100):** Use Terraform to make infrastructure repeatable, reviewable, versioned, and environment-consistent.
**Core concepts to know (L200):**
- State maps declared resources to real infrastructure.
- Providers expose cloud APIs as Terraform resources.
- Modules package reusable infrastructure patterns.
- Variables and outputs parameterize environments.
- `plan` previews changes before `apply`.
- Remote state and locking protect team workflows.
**Interview Q&A:**
- **Q (L100):** What is IaC? — **A:** Managing infrastructure through versioned code instead of manual portal changes.
- **Q (L100):** What is Terraform state? — **A:** Terraform’s record of managed resources and their current attributes.
- **Q (L200):** Why use modules? — **A:** To standardize reusable infrastructure while reducing duplication.
- **Q (L200):** Example Azure resource? — **A:**
```hcl
resource "azurerm_resource_group" "rg" {
  name     = "rg-interview-prep"
  location = "eastus"
}
```
**Red flags to avoid:** Do not edit state manually unless absolutely necessary. Never commit secrets or local state files.
**Résumé hook:** Connect Terraform to repeatable Azure infrastructure across solution architecture engagements.

## Reliability & Operations

For a Solution Architect / Technical Lead, reliability is not just uptime; it is a design, measurement, operating, and learning discipline. Interviewers expect you to connect architecture choices to SLIs, on-call reality, telemetry, incident response, and continuous improvement.

### SLA / SLO / SLI & error budgets
**What it is (L100):** An SLI is a measurable reliability signal, such as availability, latency, or error rate. An SLO is the internal target for that signal, and an SLA is the external commitment with business consequences.
**Why/when to use it (L100):** Use them to align engineering, product, and leadership on what “reliable enough” means. Error budgets help balance feature velocity with operational risk.
**Core concepts to know (L200):**
- SLIs should reflect user experience, not only infrastructure health.
- SLOs are usually stricter than SLAs.
- Error budget = allowed unreliability over a time window.
- Burn rate shows how quickly the budget is being consumed.
- Reliability targets must account for dependencies.
- Too-high SLOs can waste engineering effort.
**Interview Q&A:**
- **Q (L100):** What is the difference between SLA and SLO? — **A:** SLA is a contractual promise; SLO is an internal reliability target used to operate the service.
- **Q (L100):** What is an SLI? — **A:** A measurable indicator like successful request rate, p95 latency, or message processing lag.
- **Q (L200):** How would you define reliability for a telemetry platform? — **A:** Use SLIs such as ingestion success rate, processing latency, data freshness, and query availability.
- **Q (L200):** What happens when the error budget is exhausted? — **A:** Teams slow risky releases, prioritize reliability work, and review causes of budget burn.
**Red flags to avoid:** Do not say SLA, SLO, and SLI are interchangeable. Avoid defining reliability only as VM uptime.
**Résumé hook:** Tie this to owning 98–99% SLA expectations for a connected-vehicle platform processing ~2M telemetry messages per minute.

### Incident management (on-call, sev levels, postmortems)
**What it is (L100):** Incident management is the operating model for detecting, responding to, communicating, and learning from production failures. It includes on-call rotations, severity levels, escalation paths, and postmortems.
**Why/when to use it (L100):** Use it whenever systems support real users or business-critical workflows. It reduces chaos during outages and improves future resilience.
**Core concepts to know (L200):**
- Severity levels should map to user/business impact.
- On-call needs runbooks, dashboards, ownership, and escalation.
- Incident commander separates coordination from debugging.
- Communication cadence matters during major incidents.
- Postmortems should be blameless and action-oriented.
- Track MTTA, MTTR, recurrence, and action-item closure.
**Interview Q&A:**
- **Q (L100):** What is a Sev1 incident? — **A:** A critical incident with major customer, revenue, safety, or platform impact requiring immediate response.
- **Q (L100):** Why do postmortems matter? — **A:** They turn incidents into learning and prevent repeat failures.
- **Q (L200):** What should be in a good runbook? — **A:** Symptoms, dashboards, diagnostic queries, rollback steps, escalation contacts, and validation checks.
- **Q (L200):** How do you avoid blame in postmortems? — **A:** Focus on system conditions, decision context, detection gaps, and durable corrective actions.
**Red flags to avoid:** Do not treat incidents as only technical debugging. Avoid postmortems that only say “human error.”
**Résumé hook:** Connect this to leading incident management across a 40+ engineer connected-vehicle program.

### Telemetry-based monitoring
**What it is (L100):** Telemetry-based monitoring uses emitted signals from applications, infrastructure, and business workflows to detect health, performance, and correctness issues. It goes beyond ping checks.
**Why/when to use it (L100):** Use it for distributed systems where failures are partial, delayed, or data-dependent. It helps detect issues before customers report them.
**Core concepts to know (L200):**
- Monitor golden signals: latency, traffic, errors, saturation.
- Include business KPIs such as messages processed or invoices completed.
- Alerts should be actionable and routed to owners.
- Use thresholds, anomaly detection, and burn-rate alerts.
- Reduce alert fatigue with deduplication and severity tuning.
- Validate monitoring during releases and failover drills.
**Interview Q&A:**
- **Q (L100):** What is telemetry? — **A:** Data emitted by systems to describe behavior, health, performance, and usage.
- **Q (L100):** Why not alert on every log error? — **A:** Many errors are non-impacting; alerts should represent user or service impact.
- **Q (L200):** How would you monitor telemetry ingestion? — **A:** Track input rate, failed writes, lag, schema errors, queue depth, and downstream availability.
- **Q (L200):** What makes an alert actionable? — **A:** It has ownership, impact, context, likely causes, and a clear response path.
**Red flags to avoid:** Avoid vanity dashboards with no operational decisions attached. Do not confuse logging volume with monitoring quality.
**Résumé hook:** Relate this to telemetry-driven monitoring for 20M+ connected vehicles using ADX/Kusto.

### Observability (metrics, logs, traces)
**What it is (L100):** Observability is the ability to understand internal system behavior from external outputs. The main signals are metrics, logs, and traces.
**Why/when to use it (L100):** Use it when debugging distributed systems, performance issues, dependency failures, and unknown failure modes. It helps answer “why is this happening?”
**Core concepts to know (L200):**
- Metrics are numeric time-series signals.
- Logs are event records with context.
- Traces show request flow across services.
- Correlation IDs connect signals.
- High-cardinality dimensions help debugging but need cost control.
- Observability should be designed into services, not added last.
**Interview Q&A:**
- **Q (L100):** Difference between monitoring and observability? — **A:** Monitoring tells you something is wrong; observability helps explain why.
- **Q (L100):** What is distributed tracing? — **A:** Tracking a request across service boundaries using spans and trace IDs.
- **Q (L200):** How do you debug high latency? — **A:** Check p95/p99 metrics, trace slow spans, inspect dependency calls, and correlate logs.
- **Q (L200):** Why use structured logs? — **A:** They enable reliable filtering, correlation, aggregation, and automated analysis.
**Red flags to avoid:** Do not say logs alone equal observability. Avoid missing correlation IDs in microservices.
**Résumé hook:** Tie this to using Datadog and Azure Data Explorer/Kusto for production observability.

### Datadog
**What it is (L100):** Datadog is a cloud monitoring and observability platform for metrics, logs, traces, dashboards, alerts, synthetics, and infrastructure visibility. It is commonly used across hybrid and cloud-native estates.
**Why/when to use it (L100):** Use it when teams need unified visibility across applications, infrastructure, cloud services, and user journeys. It is strong for dashboards, APM, alerting, and correlation.
**Core concepts to know (L200):**
- Agents collect host, container, and integration telemetry.
- APM traces reveal service dependencies and latency hotspots.
- Monitors define alert conditions and notification routing.
- Tags are critical for filtering by service, environment, region, and team.
- Log pipelines parse, enrich, and control ingestion cost.
- SLO dashboards can map reliability targets to real telemetry.
**Interview Q&A:**
- **Q (L100):** What is Datadog used for? — **A:** Monitoring infrastructure, applications, logs, traces, dashboards, and alerts.
- **Q (L100):** What is APM? — **A:** Application Performance Monitoring, used to measure request latency, errors, and service dependencies.
- **Q (L200):** How do tags help operations? — **A:** Tags enable slicing telemetry by service, environment, region, version, or owner.
- **Q (L200):** How would you control Datadog cost? — **A:** Tune log ingestion, sampling, retention, cardinality, and dashboard/monitor scope.
**Red flags to avoid:** Do not treat Datadog as only a dashboard tool. Avoid unbounded high-cardinality tags.
**Résumé hook:** Position Datadog experience alongside Azure observability in large-scale automotive and GenAI platforms.

### Azure Monitor / Log Analytics / Application Insights
**What it is (L100):** Azure Monitor is Azure’s observability platform. Log Analytics stores and queries logs with KQL, while Application Insights provides application performance monitoring and distributed tracing.
**Why/when to use it (L100):** Use it for Azure-native monitoring, diagnostics, alerting, dashboards, and operational analytics. It is especially useful when workloads rely on App Service, Functions, AKS, Azure OpenAI, or data platforms.
**Core concepts to know (L200):**
- Log Analytics workspaces store queryable telemetry.
- KQL is used for filtering, aggregation, joins, and time analysis.
- Application Insights tracks requests, dependencies, exceptions, and traces.
- Azure Monitor alerts can trigger action groups.
- Diagnostic settings route platform logs and metrics.
- Workbooks support operational dashboards.
**Interview Q&A:**
- **Q (L100):** What is Log Analytics? — **A:** A workspace for collecting and querying logs using KQL.
- **Q (L100):** What does Application Insights provide? — **A:** APM, request tracking, dependency tracking, exceptions, and performance metrics.
- **Q (L200):** How do diagnostic settings help? — **A:** They route Azure resource logs and metrics to Log Analytics, Event Hub, or Storage.
- **Q (L200):** When use ADX vs Log Analytics? — **A:** Use Log Analytics for operational monitoring; use ADX for high-scale analytical telemetry and custom time-series workloads.
**Red flags to avoid:** Do not ignore workspace design, retention, or cost. Avoid relying only on portal metrics without KQL-based investigation.
**Résumé hook:** Connect this to ADX/Kusto ownership for high-volume connected-vehicle telemetry.

## ML Foundations (M.Tech AIML topics)

For senior Azure + GenAI roles, ML foundations help you explain not just how to call models, but why training works, how models fail, and how to evaluate improvements. Interviewers often test whether GenAI experience is grounded in fundamentals.

### Deep neural networks (fundamentals: layers, activations, backprop, loss)
**What it is (L100):** A deep neural network is a model composed of multiple layers that learn representations from data. Layers transform inputs using weights, activations introduce non-linearity, and loss measures prediction error.
**Why/when to use it (L100):** Use deep networks for complex patterns in text, images, speech, recommendations, and sequence data. They are powerful when enough data, compute, and evaluation discipline are available.
**Core concepts to know (L200):**
- Forward pass computes predictions.
- Loss function quantifies error.
- Backpropagation computes gradients.
- Optimizers update weights using gradients.
- Activations like ReLU or GELU add non-linearity.
- Depth enables hierarchical feature learning.
- Batch size, learning rate, and initialization affect convergence.
**Interview Q&A:**
- **Q (L100):** Why do neural networks need activation functions? — **A:** Without non-linearity, stacked layers collapse into a linear transformation.
- **Q (L100):** What is a loss function? — **A:** A mathematical measure of how wrong the model’s predictions are.
- **Q (L200):** What does backpropagation do? — **A:** It applies the chain rule to compute gradients for each parameter.
- **Q (L200):** Why can deep networks overfit? — **A:** They have high capacity and may memorize training data without regularization or sufficient validation.
**Red flags to avoid:** Do not describe neural networks as magic black boxes. Avoid saying more layers always improve performance.
**Résumé hook:** Tie this to M.Tech AIML coursework and practical PyTorch/HuggingFace experimentation.

### Mathematical foundations for ML (linear algebra, calculus/gradients, probability)
**What it is (L100):** ML relies on linear algebra for vectors, matrices, embeddings, and transformations; calculus for optimization; and probability for uncertainty and statistical reasoning. These foundations explain how models learn from data.
**Why/when to use it (L100):** Use them to reason about training behavior, model outputs, evaluation, embeddings, and uncertainty. They are essential for explaining ML beyond APIs.
**Core concepts to know (L200):**
- Vectors represent features, tokens, and embeddings.
- Matrix multiplication powers layers and attention.
- Gradients show the direction of steepest loss increase.
- Gradient descent updates parameters to reduce loss.
- Probability supports classification, calibration, and uncertainty.
- Distributions explain data drift and sampling.
- Cosine similarity is common for vector search.
**Interview Q&A:**
- **Q (L100):** Why is linear algebra important in ML? — **A:** Model inputs, weights, activations, and embeddings are represented as vectors and matrices.
- **Q (L100):** What is a gradient? — **A:** A vector of partial derivatives showing how loss changes with parameters.
- **Q (L200):** Why does learning rate matter? — **A:** Too high can diverge; too low can train slowly or get stuck.
- **Q (L200):** How does probability help classification? — **A:** It models confidence, class likelihoods, thresholds, and calibration.
**Red flags to avoid:** Do not claim math is unnecessary because frameworks automate it. Avoid confusing correlation with causation.
**Résumé hook:** Relate this to BITS Pilani AIML preparation and explaining embedding similarity in RAG platforms.

### Training, fine-tuning & evaluation (overfitting, regularization, metrics, transfer learning, PEFT/LoRA)
**What it is (L100):** Training teaches a model patterns from data by minimizing loss. Fine-tuning adapts a pretrained model to a task or domain, while evaluation measures whether the model actually improved.
**Why/when to use it (L100):** Use fine-tuning when prompting or RAG is insufficient and domain-specific behavior must be learned. Use evaluation before deploying changes to production.
**Core concepts to know (L200):**
- Overfitting means good training performance but poor generalization.
- Regularization includes dropout, weight decay, data augmentation, and early stopping.
- Metrics depend on task: accuracy, F1, ROC-AUC, BLEU, ROUGE, exact match, human eval.
- Transfer learning reuses pretrained representations.
- PEFT/LoRA adapts fewer parameters to reduce cost.
- Validation and test sets must remain separate.
- GenAI evaluation should include safety, groundedness, relevance, and latency.
**Interview Q&A:**
- **Q (L100):** What is overfitting? — **A:** When a model memorizes training data and performs poorly on unseen data.
- **Q (L100):** What is fine-tuning? — **A:** Updating a pretrained model on task-specific or domain-specific data.
- **Q (L200):** When choose LoRA? — **A:** When you need efficient adaptation with fewer trainable parameters and lower compute cost.
- **Q (L200):** How evaluate a RAG system? — **A:** Measure retrieval relevance, answer groundedness, faithfulness, latency, cost, and human acceptance.
**Red flags to avoid:** Do not fine-tune to fix missing knowledge that RAG can supply. Avoid evaluating only on cherry-picked prompts.
**Résumé hook:** Tie this to Global CPG RAG and plant-assistant work using HuggingFace-style fine-tuning and evaluation thinking.

## Certifications — exam-ready refreshers

These certifications should translate into practical architecture judgment, not badge memorization. Be ready to connect services, governance, security, DevOps, and responsible AI.

| Cert | What it proves | 3 things you must be able to explain |
| --- | --- | --- |
| AZ-305 (Solutions Architect Expert) | Designing Azure solutions across compute, data, security, networking, and reliability. | Well-Architected pillars; landing zones and governance; HA/DR trade-offs. |
| AZ-204 (Developer Associate) | Building Azure applications and integrations. | Managed identity usage; App Service/Functions patterns; storage, messaging, and API integration. |
| AZ-104 (Administrator Associate) | Operating Azure subscriptions, identities, compute, networking, and storage. | RBAC and Entra ID basics; VNets and private endpoints; monitoring and backup. |
| AZ-400 (DevOps Engineer Expert) | Delivering software using DevOps practices. | CI/CD design; IaC and release strategies; security/compliance in pipelines. |
| AI-102 (Azure AI Engineer Associate) | Building AI solutions with Azure AI services. | Azure AI Search/RAG; Azure OpenAI integration; responsible AI and monitoring. |
| SC-900 (Security/Compliance/Identity Fundamentals) | Understanding Microsoft security, compliance, and identity concepts. | Zero Trust; shared responsibility; Entra ID and compliance capabilities. |
| AZ-900 (Azure Fundamentals) | Core Azure cloud concepts. | IaaS/PaaS/SaaS; regions and availability zones; pricing and support models. |
| AI-900 (Azure AI Fundamentals) | Foundational AI and Azure AI service knowledge. | ML vs AI vs GenAI; common AI workloads; responsible AI principles. |
| GitHub Copilot Certified | Effective and responsible use of GitHub Copilot. | Prompting and context; code review/security limits; productivity workflows. |
| AB-730 (AI Business Professional) | Business value and adoption of AI solutions. | Use-case framing; ROI and risk; responsible adoption. |
| AB-731 (AI Transformation Leader) | Leading organizational AI transformation. | Operating model; governance and change management; adoption measurement. |
| AB-100 (AI Business Solution Architect) | Mapping AI business needs to solution architecture. | Reference architectures; data readiness; security, integration, and lifecycle. |

- **Q (L100):** What is the shared responsibility model? — **A:** Cloud providers secure the cloud infrastructure, while customers remain responsible for identities, data, access, configuration, and application security depending on service model.
- **Q (L100):** What are the Azure Well-Architected pillars? — **A:** Reliability, security, cost optimization, operational excellence, and performance efficiency.
- **Q (L200):** Managed identity vs service principal? — **A:** Managed identity is Azure-managed credential lifecycle for Azure resources; service principal is broader app identity where you often manage credentials or federation.
- **Q (L200):** RBAC vs ABAC? — **A:** RBAC grants permissions based on role assignments; ABAC adds conditions based on attributes such as resource tags, request context, or principal attributes.
- **Q (L200):** How would you secure a production GenAI solution? — **A:** Use private networking where needed, managed identity, least privilege, content safety, prompt/data controls, logging, evaluation, and responsible AI review.
- **Q (L200):** How do DevOps and architecture certs connect? — **A:** Architecture defines target qualities; DevOps makes them repeatable through IaC, CI/CD, policy gates, observability, and rollback strategy.
