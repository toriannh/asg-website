# Agent Operations Console

## Working Idea

A live console that shows how an AI agent takes a business request, chooses tools, executes steps, checks confidence, and saves a reviewable result.

## Demo Surface

- Prompt input for a business workflow.
- Tool call timeline.
- Run status and error handling.
- Confidence and review state.
- Saved structured output.

## Stack To Demonstrate

- TypeScript / React or vanilla JS prototype.
- LLM API pattern: Claude or OpenAI.
- Postgres/Supabase-style run history.
- Tool schemas and structured JSON outputs.
- Eval checks, retries, and fallback states.

## Open Decisions

- Whether the first version should be ecommerce, property management, marketing ops, or generic business workflow automation.
- Whether to simulate tool calls locally or wire a lightweight serverless endpoint later.
