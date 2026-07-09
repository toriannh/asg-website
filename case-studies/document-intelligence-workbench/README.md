# Document Intelligence Workbench

## Case Study Goal

This project is a live browser-based document AI demo for prospective clients. It shows how unstructured or semi-structured documents become validated, reviewable structured data.

## Current Demo

- Document intake queue with multiple document types.
- Source document preview with highlighted evidence lines.
- Extracted field table with confidence scores.
- Overall confidence and schema status.
- Approve / send-to-review actions.
- Evidence cards for every extracted field.
- Architecture section showing file intake, OCR, LLM extraction, schema validation, review queue, and database write.
- Code snippets for extraction schema and validation gate.

## Stack To Demonstrate

- Python document pipeline.
- AWS-style file intake and processing flow.
- OCR / layout extraction pattern.
- LLM structured extraction.
- JSON schema validation.
- Postgres persistence and audit lineage.
- Human-in-the-loop review for low-confidence fields.

## Production Version

The static page demonstrates product behavior without external credentials. A production build would add:

- S3 file intake and signed upload URLs.
- OCR service such as AWS Textract, Azure Document Intelligence, or a PDF parser.
- LLM extraction with a typed output schema.
- Postgres document, field, evidence, and review tables.
- Validation jobs and exception queues.
- Reviewer audit logs and downstream workflow triggers.
