# RAG Knowledge Base

## Working Idea

A searchable knowledge base demo that shows ingestion, chunking, embeddings, vector retrieval, source evidence, and answer evaluation.

## Demo Surface

- Search input.
- Retrieved source cards.
- Answer panel with citations.
- Retrieval confidence and filter metadata.
- Evaluation checklist.

## Stack To Demonstrate

- Python ingestion pipeline.
- Postgres metadata store.
- Pinecone or pgvector vector database.
- OpenAI or Anthropic answer generation.
- Retrieval evals and citation checks.

## Open Decisions

- Use synthetic policy docs, product docs, public knowledge snippets, or generated business manuals as the knowledge source.
- Decide whether to simulate vector results in-browser first or later wire a server endpoint.
