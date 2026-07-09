# RAG Knowledge Base

## Case Study Goal

This project is a live browser-based RAG demo for prospective clients. It shows the complete retrieval story in a safe sample environment: knowledge sources, chunk metadata, vector-search-style ranking, cited answer generation, and answer quality checks.

## Current Demo

- Query input with sample business questions.
- Source type filter and retrieval threshold.
- Browser-side retrieval scoring that mirrors vector ranking behavior.
- Grounded answer panel with citations.
- Retrieved source cards with source ID, owner, update date, type, and score.
- Retrieval metrics and quality gate checks.
- Architecture section showing source -> chunk -> embed -> vector DB -> retrieve -> answer -> evaluate.
- Code snippets showing chunk payload and retrieval pattern.

## Stack To Demonstrate

- Python ingestion pipeline.
- Postgres metadata store.
- Pinecone or pgvector vector database.
- OpenAI or Anthropic answer generation.
- Retrieval evals and citation checks.
- Frontend review surface for non-technical users.

## Production Version

The static page demonstrates the product behavior without external credentials. A production build would add:

- Server endpoint for embedding queries.
- Pinecone or pgvector index.
- Postgres source metadata and access controls.
- LLM call with structured answer schema.
- LangSmith-style tracing or custom run logs.
- Regression eval dataset for retrieval and answer quality.
