# AI Analytics Dashboard

## Case Study Goal

This project is a live browser-based analytics dashboard for agency-style reporting. It shows how performance metrics from multiple platforms can be normalized, visualized, summarized with AI, and packaged into a client-ready monthly report.

## Current Demo

- Multi-client and multi-month selector.
- KPI tiles for reach, engagements, clicks, and followers.
- Weekly trend chart built with CSS.
- Channel breakdown across Instagram, TikTok, Facebook, and LinkedIn-style sources.
- AI monthly summary with "what worked," "what needs attention," and "next move."
- Recommendation queue with priority states.
- API sync and warehouse status panel.
- Client report deliverable checklist.
- Code snippets for metric modeling and LLM summary contracts.

## Stack To Demonstrate

- React-style dashboard interface.
- Social/media API ingestion pattern.
- SQL analytics layer.
- Claude/OpenAI narrative generation.
- Multi-client reporting template.
- Data freshness and pipeline observability.

## Production Version

The static page demonstrates the product behavior without external credentials. A production build would add:

- Meta Graph API, TikTok, LinkedIn, Google Analytics, or Supermetrics/Phyllo ingestion.
- Postgres, BigQuery, or Snowflake metric store.
- dbt or SQL models for client-month facts.
- Scheduled refresh jobs and sync monitoring.
- Claude/OpenAI summary generation with a review queue.
- Exportable PDF or client portal report package.
