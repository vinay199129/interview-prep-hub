# Company & Region Interview Patterns

A reference distilling public interview-experience write-ups, official career pages, regulatory documents, and engineering blogs from India, Singapore, the UAE, and global big-tech / AI labs. Used by the `/patterns` page.

> Research sources: staffeng.com, interviewing.io, Amazon Leadership Principles, Tech Interview Handbook, MAS / AI Verify Foundation, GovTech SG engineering blog, RBI circulars, MeitY DPDP Act, TII / Core42 / Presight, AmbitionBox, InterviewBit, Grab Engineering, Careem Engineering, levels.fyi (Q3 2025 AI comp data). See per-section citations.

---

## How to read this

Each archetype has the same shape:

- **Loop** — typical interview structure
- **Signature questions** — what shows up consistently
- **Cultural signal** — what they evaluate beyond the right answer
- **AI / cloud-specific twists** — how the loop adapts for AI engineering and cloud roles
- **Red flags** — the moves that fail the loop

Use the shortcut links to jump into `/browse` pre-filtered for the relevant tag.

---

## Region: India 🇮🇳

### What's different from global

1. **Mass-recruitment aptitude filter at services firms** (TCS NQT, InfyTQ, Wipro Elite) — numerical / verbal / reasoning + 1–2 coding questions before any human screen. Global FAANG has no equivalent layer.
2. **Aptitude never fully disappears**, even at Indian product companies — SQL + reasoning MCQs are still part of online assessments.
3. **Core CS depth is non-negotiable** — OOPS, DBMS (joins, normalisation, query optimisation), OS internals, Computer Networks appear in technical rounds across every archetype.
4. **Machine Coding Rounds** are a distinct tier — Flipkart, Razorpay, Swiggy, CRED run 60–90-minute "build a real component" sessions. LLD (class diagrams, SOLID) and HLD (distributed systems) are tested **separately**.
5. **Regulatory literacy** at fintech/banking — RBI cloud adoption framework, DPDP Act 2023, UPI/NPCI architecture, PCI-DSS, SEBI cybersecurity circular.
6. **Designation inflation at services firms** — "Senior Consultant" at TCS/Infosys ≈ mid-level SWE elsewhere; question calibration shifts to client-delivery, pre-sales, TOGAF/Zachman at senior bands.
7. **Indic / regional-language AI** is a dedicated sub-domain — Sarvam, Krutrim, Yellow.ai, Haptik ask about Indic NLP, ASR for Hindi/Tamil/Bengali, transliteration, code-mixed text.

### Archetypes inside India

| Archetype | Examples | Loop shape |
| --- | --- | --- |
| IT services / big-services | TCS, Infosys, Wipro, HCL, Cognizant, Capgemini, Tech Mahindra, LTIMindtree | Aptitude → Technical → Managerial → HR |
| Indian product | Flipkart, Razorpay, Swiggy, Zomato, Freshworks, Zerodha, CRED, PhonePe, Paytm, Meesho, Postman, Atlan | OA → Machine coding → DS&A → LLD → HLD → Bar raiser → HR |
| GCC (Global Capability Center) | Microsoft IDC, Google India, Amazon India, Walmart Global Tech, Salesforce, Adobe, NVIDIA | Identical to global parent loop; behavioural calibrated to STAR/LPs |
| AI startup / lab | Sarvam, Krutrim, Yellow.ai, Haptik, Observe.AI, Mad Street Den | Take-home → ML depth → MLOps system design → live debug → culture |
| Bank / fintech tech | HDFC, ICICI, Axis tech arms; PayU | Aptitude → Domain → Architecture → AI/analytics → Managerial |

### Sample loop signals

- **Amazon India** — full LP coverage on every round; Bar Raiser veto; LRU/LFU cache appears almost every cycle.
- **Flipkart** — Machine Coding round is the differentiator; SDE3 expected to do HLD of recommendation engines or payment-notification systems.
- **Razorpay / PhonePe / Paytm** — UPI Lite, offline-first, idempotent notification design, DPDP Act constraints on prompt content for GenAI.
- **TCS / Infosys** — IaaS vs PaaS vs SaaS definitions, SDLC stages of a migration, "willingness to relocate to Pune/Chennai", service-bond questions.

### Regulatory anchors (cited in interviews)

- **RBI Cloud Adoption Framework for Regulated Entities (2023)** — risk-based approach, data classification, data residency, right-to-audit for CSPs, reversibility/exit strategy
- **DPDP Act 2023** — consent-based processing, data fiduciary, right to erasure, ₹250 cr penalty cap
- **RBI Master Direction on KYC (2016, updated 2023)** — V-CIP (video KYC) flow design
- **SEBI Cybersecurity & Cyber Resilience Framework (CIR/MRD/DP/01/2023)** — VAPT, SOC, CSPM, quarterly pen test for stock brokers
- **RBI Payment Aggregator guidelines** + NPCI fraud framework

Filter the bank into `/browse?tag=region-india` (also `pattern-services-firm`, `pattern-bigtech-india`, `pattern-bank-fintech`).

---

## Region: Singapore 🇸🇬

### What's different from global

1. **Regulatory literacy is table stakes in finance & public sector** — MAS Technology Risk Management (Jan 2021), MAS FEAT principles (Fairness, Ethics, Accountability, Transparency), PDPA, AI Verify framework. Failing to mention these in a DBS/OCBC/GovTech system-design round is a real red flag.
2. **Multi-cloud + Government Commercial Cloud (GCC) awareness is required** for public-sector adjacent roles — sovereign data residency, SingPass / MyInfo integration.
3. **Super-app scale, not single-service scale** — Grab / Shopee / Sea interviews emphasise cross-service consistency (payments + logistics + maps), SEA multi-country latency budgets, Kafka + Apache Flink, LangGraph as first-class topics.
4. **AI governance questions are mainstream** — "Describe a responsible AI deployment referencing FEAT or AI Verify dimensions" appears routinely at DBS and GovTech.
5. **Values cultures replace 'culture fit' vagueness** — Grab's 4Hs (Heart, Hunger, Honour, Humility) are explicit scoring axes.
6. **Less whiteboard, more collaborative editors + take-homes**, especially post-2022.
7. **Senior loops add 'influence without authority' probes** in Singapore's consensus-driven culture.

### Archetypes inside Singapore

| Archetype | Examples | Loop shape |
| --- | --- | --- |
| Banks / financial | DBS, OCBC, UOB, Standard Chartered, Citi APAC, JPMorgan, Goldman, SGX | OA → Recruiter → HM tech → Panel (coding + SD) → Behavioural → (Senior) Architecture / CISO |
| Super-app / ride-hail | Grab, Shopee/Sea, Carousell, Lazada, ByteDance SG, Ninja Van | Recruiter → OA → 2× tech screen → Onsite (3 rounds + behavioural) → Bar raiser at G6+ |
| Public sector tech | GovTech / OGP, MAS, IMDA, AI Verify Foundation | Portfolio → Take-home → Take-home review → SD → Behavioural → (Optional) panel |
| AI labs / research | A*STAR I2R, AI Singapore, AI Verify, NUS labs | CV → Research talk → Technical deep-dive → Applied build → Mission-fit |
| Big tech APAC HQ | Google SG, Meta SG, Microsoft SG, AWS SG, Stripe, Visa, Atlassian | Functionally identical to US loop; APAC flavor in SD prompts |

### Regulatory anchors

- **MAS TRM Guidelines (Jan 2021)** — risk assessment, customer data residency in SG, incident notification within 1 hour, annual third-party audit, critical-system change controls
- **MAS FEAT Principles** — Fairness, Ethics, Accountability, Transparency for AI in finance
- **PDPA** — purpose limitation, consent, data-sharing agreements
- **AI Verify (IMDA / AI Verify Foundation)** — process + technical test framework, MGF-GenAI 9 dimensions (accountability, fairness, transparency, safety, data governance, etc.)
- **Online Safety Act 2022** + IMDA content code — 24-hour takedown, multilingual classification

Filter to `/browse?tag=region-singapore` (also `pattern-bank-fintech`, `pattern-gov-public-sector`, `pattern-product-startup`).

---

## Region: UAE 🇦🇪

### What's different from global

1. **Sovereign cloud is a first-class topic, not a footnote** — G42 Cloud / Core42 / Azure UAE North / AWS me-central-1 / Etisalat UAE Cloud. Data residency and jurisdictional control are design constraints, not optional.
2. **Arabic NLP is a real differentiator** — TII Falcon Arabic, Jais (MBZUAI), ALLaM (Saudi); MSA vs dialect handling, 32K Arabic tokenizers, diglossic corpora.
3. **Regulatory literacy replaces GDPR literacy** — UAE Data Office, NESA IAS, DIFC DP Law 2020, ADGM DP Regulations 2021, TDRA, CBUAE circulars. GDPR is welcomed but insufficient.
4. **Government-facing delivery is central** — Core42 serves 15+ government agencies, 40+ smart cities, 50M+ citizens. "Design a sovereign citizen-scale AI service" is the local equivalent of "design a URL shortener".
5. **Consultancy loops are longer + presentation-heavy** — Big-4 and IBM/Accenture UAE add a case-study presentation and architecture walkthrough in front of a partner.
6. **Principal/Architect roles are disproportionately valued** in the consulting market — "Enterprise Architect", "Solution Architect — Sovereign Cloud", "AI Architect" titles carry weight.
7. **Multicultural team dynamics are explicitly tested** — 80%+ expat workforce, Ramadan schedule adjustments, communication across Emirati / South Asian / Arab / Western teams.

### Archetypes inside UAE

| Archetype | Examples | Loop shape |
| --- | --- | --- |
| Sovereign AI / Mubadala portfolio | G42, M42, TII (Falcon), Core42, Presight, Bayanat, Inception | Recruiter → SD or LLM-deploy → Panel → Architecture (VP/SVP) → Values |
| Banks / financial | Emirates NBD, FAB, ADCB, Mashreq, ADGM/DIFC fintechs, ADIA tech | HR → Technical → Coding → Fitment → (ADGM/DIFC) compliance round |
| Telco / digital | e& (Etisalat) / e&Enterprise, du, Careem | Recruiter → Technical phone → 2× onsite (algo + ML/SD) → HM values |
| Government / public sector | Smart Dubai / Digital Dubai, DGE AD, DESC, ADDA | Application → Technical panel → Presentation → Clearance |
| Consultancy / GCC | Accenture, Deloitte, PwC, EY, IBM, Microsoft, AWS, Oracle UAE | HR → Case study → Architecture → Competency (STAR) → Partner |

### Regulatory anchors

- **UAE National AI Strategy 2031** — AI = 14% of GDP target; sovereign compute via Core42/G42
- **UAE Data Office (Federal)** — personal data processing notification, data residency
- **NESA IAS** — 11 security domains, mandatory pre-go-live audit for federal entities
- **DIFC DP Law 2020** — GDPR-comparable, 72-hr breach notification, DPO required
- **ADGM DP Regulations 2021** — English common law, virtual-assets specific guidance
- **CBUAE circulars** — critical system data must remain in UAE, outsourcing risk guidelines

Filter to `/browse?tag=region-uae` (also `pattern-bank-fintech`, `pattern-gov-public-sector`).

---

## Global archetypes

### FAANG / MAANG (Meta · Apple · Amazon · Netflix · Google)

- **Amazon** — 5–6 rounds; Leadership Principles surface in *every* round; **Bar Raiser** has unilateral veto and zero team affiliation. Avoid naming LPs aloud — they want behaviour, not buzzwords. Most-misread LP: "Have Backbone; Disagree and Commit" — they want respectful challenge *before* the decision, then full commitment *after*.
- **Google** — process over result, deliberately disguised problem types ("looks like 3Sum but isn't"), 1-year cooldown on a passed onsite, 3 attempts in 5 years cap. **Coding is still the most important round even at Staff**, distinctive vs other big-tech.
- **Meta** — Formula-1 team metaphor; speed-first; **AI-assisted coding round** rolling out 2025–2026 (mandatory for E7+); explicit **XFN (cross-functional) round** with a PM/designer/DS evaluating partnership signal.
- **Netflix** — heaviest SD loop (~8 rounds), directors in the panel, "Keeper Test" behavioural framing.
- **Apple** — army loyalty, motivation-oriented; HM may cancel remaining onsite if first 4 rounds miss the bar (unique among FAANG).

Filter: `/browse?tag=pattern-faang`.

### Microsoft

- Team-dependent loop; can interview multiple teams concurrently (unlike Google).
- **Domain-specific rounds** are unique to Microsoft — hybrid SD + live coding with Azure/compliance/EU-residency emphasis.
- Performance system: **Model–Coach–Care** (managers) / **Growth Mindset** (ICs). Behavioural is *low* weight but a filter, not a differentiator.
- AI/Azure twists: Azure OpenAI RAG, Responsible AI framework (fairness, reliability, privacy, inclusiveness, transparency, accountability), Copilot product depth, Azure AI Search vector workloads.

Filter: `/browse?tag=pattern-faang` (Microsoft included in big-tech tag).

### AI-first labs (OpenAI · Anthropic · Cohere · Mistral · Hugging Face · DeepMind · xAI)

- Live coding in Colab / CodeSignal, not LeetCode.
- **Safety / alignment rounds** at Anthropic and OpenAI — genuine philosophical engagement expected; "AI is fine" is a fail.
- Research engineer vs Member-of-Technical-Staff tracks blur; half of Anthropic technical staff joined without prior ML experience.
- Comp anchor (levels.fyi Q3 2025): OpenAI L4 median **$608K** TC, L5 **$1.15M** TC — "why this lab vs Big Tech" is a genuine question.

Filter: `/browse?tag=pattern-genai-lab`.

### GenAI tooling (Pinecone · Weaviate · LangChain · LlamaIndex · Modal · Replicate · Together)

- 3–4 round loops; **take-home is the bar**.
- "Build a semantic-search pipeline using our SDK" or "build a serverless GPU function that scales to zero".
- Graded on approach and reasoning, not correctness.
- Cultural slogans: LangChain "maximum agency / run to the roar"; Weaviate "be a pro, be yourself, be a friend".

Filter: `/browse?tag=pattern-product-startup` + `pattern-genai-lab`.

### Services / consulting (Accenture · Deloitte · IBM · Capgemini · Cognizant)

- 2–3 rounds; almost no LeetCode; case-study presentation is the differentiator.
- Certifications (AWS Solutions Architect Pro, Azure Expert, GCP Pro, Databricks) are explicit signal.
- IBM Consulting: watsonx, responsible AI; Accenture Applied Intelligence: MLOps stack + GenAI use-case scoping; Deloitte AI & Data: MRM + EU AI Act mapping.

Filter: `/browse?tag=pattern-services-firm`.

### Banks / fintech globally

- **Core-eng track** (Goldman Tech, JPMorgan SWE) — OA + LC medium + risk-culture behavioural (spotting issues proactively, escalating, not cutting corners).
- **Quant track** (Jane Street, Citadel, HRT, Two Sigma) — parallel universe: probability puzzles, market-making sims, OCaml/C++.
- **Stripe / Plaid / Block** — payment API design take-homes, API design rigor, idempotency, dead-letter queues.

Filter: `/browse?tag=pattern-bank-fintech`.

### Gov / public-sector (GovTech SG · GDS UK · USDS · 18F · India DigiLocker/UPI · Smart Dubai)

- 2–4 rounds, mission-forward; lighter LC bar; end-to-end ownership evidence weighs heavily.
- "Why public sector?" is genuine, not rhetorical — comp is materially lower; mission-pull is the unstated filter.
- Open-source preference (GDS UK publishes everything on GitHub).
- India stack: UPI/DigiLocker design, interoperability protocols.

Filter: `/browse?tag=pattern-gov-public-sector`.

### Product startups (Series A–C)

- 3–5 rounds, founder-proximate.
- **Take-home project is the primary signal** — well-commented, tested, READMEd take-home outperforms a perfect LC.
- Runway awareness, equity literacy, ambiguity tolerance are explicit checks.
- FAANG-scale answers ("100-shard message queue for a 5-engineer team") fail.

Filter: `/browse?tag=pattern-product-startup`.

---

## Senior+ signal that cuts across every archetype

From staffeng.com, lethain, Pragmatic Engineer, Tech Interview Handbook:

- **Scope is the single sharpest IC differentiator** — Senior owns project; Staff owns product/org; Principal owns company; Director owns org strategy.
- **Influence-without-authority** is the defining Staff+ skill — distinct from management, which is positional authority.
- **Management is a career change, not a promotion** (Charity Majors) — "Why management?" is deeply probed; ego-driven transitions get filtered.
- **The STAR + R (Reflection)** format is the gold standard at Senior+ — the final "R" (what you learned / would do differently) is what separates senior from mid-level signal.
- **Written communication is first-class signal** — RFC culture, ADRs, design docs, Working Backwards PRFAQs (Amazon), Minto pyramid / SCQA framing.
- **AI seniority commands a measurable premium** — levels.fyi Q3 2025: AI-specialised Staff Engineers earn 18.7% more than non-AI Staff (vs 15.8% in 2024).

### Decision frameworks every Staff+ candidate should be fluent in

| Framework | Use |
| --- | --- |
| **STAR+R** | All behavioural questions |
| **SCQA / Minto Pyramid** | Exec communication, design-doc openings |
| **CIRCLES** | Product-flavoured SD framing |
| **DACI** | Cross-functional technical decisions (Driver / Approver / Contributor / Informed) |
| **RACI** | Org-wide initiatives |
| **RICE** | Roadmap prioritisation |
| **RFC vs ADR** | RFC = open for input; ADR = immutable past-decision log |
| **Working Backwards (Amazon)** | Start from customer outcome, write press release, design backward |
| **Snacking / preening / ghost-chasing** (Larson) | Prioritisation anti-patterns |

### Technical-quality staircase (staffeng.com)

1. Fix **hot spots** (cheap, now)
2. Adopt **best practices** (linting, testing, review)
3. Prioritise **leverage points** (interfaces, APIs, shared infra)
4. Align **technical vectors** across teams
5. **Measure** technical quality (DORA, code churn, incident rates)
6. Spin up a **technical-quality / platform team**
7. Run a **quality program** (measurement → accountability → improvement)

---

## How questions in the bank are tagged

Every senior, behavioural, regional, or company-pattern question carries one or more of:

- `region-india` · `region-singapore` · `region-uae` · `region-global`
- `pattern-faang` · `pattern-services-firm` · `pattern-bigtech-india` · `pattern-product-startup` · `pattern-bank-fintech` · `pattern-gov-public-sector` · `pattern-genai-lab`
- `role-staff-ic` · `role-eng-manager` · `role-architect` · `role-tech-lead`

Combine these in `/browse` with category and difficulty filters to build a focused practice set.

---

## Sources

- staffeng.com guides (Larson)
- Amazon Leadership Principles (amazon.jobs)
- interviewing.io company hiring-process guides (Amazon, Google, Microsoft, Meta, Netflix, Apple)
- techinterviewhandbook.org (Yangshun Tay)
- charity.wtf (Engineer/Manager Pendulum, Know Your One Job)
- lethain.com (Staff Engineer Archetypes, Perf Management, Work on What Matters)
- newsletter.pragmaticengineer.com
- levels.fyi (Q3 2025 AI Engineer Compensation Trends)
- RBI circulars (Cloud Adoption Framework 2023, KYC Master Direction, Payment Aggregator guidelines)
- DPDP Act 2023 (MeitY)
- SEBI Cybersecurity & Cyber Resilience Framework (CIR/MRD/DP/01/2023)
- MAS Technology Risk Management Guidelines (Jan 2021), FEAT principles
- AI Verify Foundation (MGF-GenAI 9 dimensions)
- aisingapore.org / tech.gov.sg engineering blog
- engineering.grab.com (LangGraph multi-agent, Flink shadow testing, data mesh)
- engineering.careem.com (RDS scaling, FAISS fraud detection, server-driven UI)
- falconllm.tii.ae · core42.ai · presight.ai · difc.ae
- UAE National AI Strategy 2031, NESA IAS, UAE Data Office
- AmbitionBox / InterviewBit / GeeksforGeeks per-company write-ups (India + Singapore + UAE archetypes)
