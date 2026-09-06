# Study Method

Prepare to explain, implement and defend a decision under changing constraints. Finishing a reading list is not the same as being ready for an interview.

This is an editorial rehearsal framework, not an employer's scoring rubric or a guarantee of hiring outcomes. Adapt the time budget to your starting knowledge, accessibility needs and confirmed interview format.

## Start with the interview contract

Record the role, level, team, interview date, confirmed rounds, permitted tools and three skills the job description repeatedly emphasizes. Ask the recruiter about coding language, AI assistance, take-home limits and presentation expectations. Keep unknowns visible instead of filling them with assumptions about a company or region.

Choose one career track or a matching role focus as your primary plan. Use the full bank for a demonstrated gap, not as a second checklist to finish. Prepare three authentic examples: a successful delivery, a failure you owned and a disagreement you handled well.

## Establish a baseline

Without reading answers, attempt one foundational question, one implementation or debugging question, one design question and one behavioral question relevant to your role. Substitute a people-management scenario for implementation when coding is not part of the confirmed interview.

For each attempt, record:

- What you could explain unaided and what you guessed.
- A concrete error, missing constraint or untested claim.
- One artifact: code and tests, a diagram, a decision table or a concise story.
- The follow-up you could not answer and the next exercise that will close that gap.

Prioritize a foundational gap that blocks several other answers, then a weakness in a heavily weighted confirmed round. Do not spend the remaining time polishing the topic you already know best.

## Choose a revision schedule

These are workload suggestions for someone with the role's prerequisites, not promises that a new discipline can be mastered in a weekend. Include breaks; extend the schedule when the baseline exposes missing fundamentals.

| Time available | Essential work | Evidence before moving on |
| --- | --- | --- |
| 48 hours | First day: baseline and weakest essential stage. Second day: applied rehearsal, one mock interview, three short stories and final logistics. Avoid opening a large new topic. | Correct the baseline error, repeat the question cold and explain a changed constraint. |
| 7 days | Day 1 baseline; days 2-3 fundamentals and implementation; day 4 design; day 5 role/company context and stories; day 6 mock interview; day 7 targeted recall and logistics. | Working tests, a defended design and a specific correction from mock feedback. |
| 30 days | Week 1 foundations; week 2 implementation/debugging; week 3 production trade-offs and role depth; week 4 mixed mocks and weak-area repair. Revisit earlier material between new sessions. | Several spaced, unaided attempts and artifacts that survive follow-up questions. |

Each essential track stage contains three questions and a timed exercise. Use its discussion estimates plus exercise budget to plan the session. Unfamiliar topics need additional learning time. A job-specific revision lane can replace, rather than duplicate, the equivalent track stage.

## Run a repeatable study session

1. **Recall:** spend 10 minutes on previous weak points without answers or notes.
2. **Attempt:** spend 20 minutes on two or three related questions. Speak your reasoning and state assumptions.
3. **Build or investigate:** spend 25 minutes producing an artifact or testing a hypothesis.
4. **Compare:** spend 10 minutes against key points, references and red flags. A model answer is a reference, not a script to memorize.
5. **Retest:** spend 5 minutes explaining the correction and scheduling a later cold attempt.

Use shorter sessions where needed. Keep the sequence even when the time budget changes. Interleave related angles only after you can explain the underlying concept; a long list of loosely related links is not a curriculum.

## Practice with concrete drills

### Coding drill: idempotent order intake / 35 minutes

Define an API receiving an order and idempotency key. Implement or sketch persistent key storage, payload comparison and replay of the original result. Test duplicate requests, the same key with a different payload, concurrent callers and a crash near the write boundary.

**Expected evidence:** unique-key or transactional protection, a clear conflict response, bounded retention and explicit limits on external side effects. An in-memory dictionary alone is not multi-instance idempotency. Explain what happens when the database commit succeeds but the client times out.

### Debugging drill: p99 latency regression / 30 minutes

Synthetic fixture: traffic is unchanged; application CPU is 40%; median database-query time is unchanged; p99 request latency rises from 200 ms to 3 seconds; connection-pool wait time rises and errors cluster around one release. These numbers suggest a hypothesis, not a proven cause.

**Expected evidence:** compare pool occupancy, acquisition wait, transaction duration and release changes; distinguish a leak from longer connection holding time. Choose a mitigation with a rollback criterion, then verify p99, errors and saturation. Do not increase pool size before checking database capacity or call average query latency proof of a healthy database.

### System-design drill: tenant-safe document assistant / 45 minutes

Synthetic constraints: 100 tenants, 20 requests/second normally and 200 at peak, p95 time-to-first-token below 2 seconds, and no cross-tenant disclosure. Clarify corpus size, ingestion freshness, permitted model hosting, availability and the meaning of a successful answer.

**Expected evidence:** request and data flows, authorization before retrieval, permission-change handling, evaluation gates and backpressure. At an assumed five seconds of in-flight work per request, 200 requests/second implies roughly 1,000 concurrent requests; show where limits or queues apply rather than presenting this as provisioned capacity. Distinguish first-token latency from completion latency. Defend a simpler architecture and explain what evidence would justify more complexity.

### Evaluation drill: a promising aggregate hides a regression / 25 minutes

Synthetic fixture: baseline success is 70/90 on common cases and 8/10 on a sensitive slice; a candidate scores 80/90 and 2/10. Overall success increases from 78% to 82%, but the sensitive slice deteriorates.

**Expected evidence:** inspect paired failures, assess their severity, and collect more representative slice data. Ten examples are not enough for a confident generalization; they are enough to expose concrete failures that may block a release. Keep tuning data separate from the holdout and report counts alongside percentages. Do not accept a material safety or access-control failure because an aggregate improved.

### Leadership drill: a launch is at risk / 30 minutes

Present the goal, actual capacity, dependency risk and options to a skeptical product partner. Decide what to cut, defer or stop. Assign owners, escalation points and a communication cadence. Explain how you would learn from the incident without suppressing bad news.

**Expected evidence:** a decision tied to customer impact and constraints, not a list of meetings. For a real story, distinguish your contribution from the team's, protect confidential information and never invent outcome metrics.

## Judge readiness from evidence

Use this self-assessment alongside the nine evaluation criteria. It is deliberately separate from reading progress and is not a validated predictor of interview outcomes.

| Dimension | 0: not yet | 1: emerging | 2: defensible | 3: adaptable |
| --- | --- | --- | --- | --- |
| Correctness | Materially wrong or unsafe | Correct fragments with important gaps | Correct explanation or tested implementation | Handles boundaries and counterexamples |
| Judgment | No assumptions or alternatives | Names options without comparing them | Connects trade-offs to constraints | Revises the decision when evidence changes |
| Verification | Assertions only | Happy-path example | Tests, metrics or documented evidence | Distinguishes hypotheses and identifies failure modes |
| Communication | Hard to follow or no ownership | Understandable with substantial prompting | Concise, structured and explicit about uncertainty | Handles interruption and follow-ups without losing the thread |

**Suggested checkpoint:** reach at least 2 in each dimension on essential material and repeat a cold attempt on another day. Treat an unsafe authorization assumption, invented experience or untested destructive behavior as a blocker regardless of the average. A score of 3 everywhere is not required before interviewing.

Self-rated "Got it" records confidence; spaced recall records review timing; neither proves you can implement or defend an answer. Keep an error log and let failed cold attempts determine the next session. A peer-led mock gives a different signal from recognizing a familiar answer.

## Final 48-hour checklist

- Confirm time zone, meeting platform, accessibility arrangements and permitted tools.
- Test the editor, microphone, connection and screen-sharing setup with a small exercise.
- Prepare a two-minute role-relevant introduction and one-minute/three-minute versions of three real stories.
- Rehearse one design and one applied task; revisit the two most important weak points.
- Verify version-sensitive API and regulatory claims you intend to cite. Say what you would check when uncertain.
- Prepare questions about success measures, team boundaries, operational ownership and the first 90 days.
- Leave time for rest and logistics. Stop expanding the syllabus on the final evening.

## Keep evidence current

For code, record runtime/SDK versions and distinguish executable examples from pseudocode or dependency sketches. For company guidance, use the recruiter brief and current official preparation material. For regulation, record jurisdiction, entity, instrument, effective date and the relevant clause; ask qualified reviewers to confirm applicability.

For every revision, keep the original question permalink stable, retain useful detail and add the smallest exercise that makes a claim testable. Track the specific correction, not merely the number of pages read.
