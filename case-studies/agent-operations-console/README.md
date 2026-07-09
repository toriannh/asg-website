# AI Agent Operations Console

## Working Idea

A live console that shows how an AI agent takes a business request, chooses tools, executes steps, checks confidence, saves structured output, and routes risky items to human review.

The first working demo uses an ecommerce product-launch workflow because it is easy for clients to understand, but the architecture is intentionally reusable across property management, sales operations, marketing operations, and internal workflow automation.

## Demo Surface

- Scenario selector and prompt input.
- Model route and risk-mode controls.
- Tool-call timeline with runtime status.
- Confidence, review, latency, and tool metrics.
- Human review queue.
- Structured JSON output with approve/export actions.
- Architecture strip and code-pattern section.

## Stack To Demonstrate

- Frontend: static HTML/CSS/JavaScript prototype now; Next.js/React production path.
- AI layer: Claude/OpenAI orchestration pattern, tool schemas, structured outputs.
- Data layer: Postgres/Supabase-style run history, review queue, and output records.
- Reliability layer: deterministic review gates, status tracking, retry/fallback pattern.
- Delivery layer: deployable as static demo now, with API routes/serverless functions later.

## Open Decisions

- Whether the next iteration should become a Next.js app with API routes.
- Whether to wire a real LLM endpoint or keep the public portfolio version fully synthetic.
- Whether to deepen the ecommerce story or pivot the visible demo to property management or lead routing.

## Production Translation

The portfolio version runs locally in the browser using synthetic data. A production implementation would move the agent runner behind an authenticated API, persist run state in Postgres/Supabase, call model APIs from the server, and write every tool call, output, review flag, and approval event to database tables.
