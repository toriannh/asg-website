# Data Platform Control Tower

## Case Study Goal

This project is a live browser-based control tower for a modern analytics platform. It shows how a senior data engineer thinks beyond "move data from A to B": orchestration state, freshness, lineage, quality gates, backfills, blocked dashboards, and stakeholder-ready metrics all need to be visible in one operating surface.

## Current Demo

- Domain filter for payments, marketing, operations, and product data.
- Run-window selector for today, trailing 7 days, and trailing 30 days.
- Pipeline health cards with row counts, freshness SLA, and status.
- Incident queue for failed checks and repair actions.
- Bronze/silver/gold lineage board from source APIs to BI and AI consumers.
- Data quality scorecards with owner, severity, asset, and action context.
- Code snippets for asset gates and SQL reconciliation.

## Stack To Demonstrate

- SQL and Python ETL/ELT.
- Airflow or Dagster orchestration concepts.
- dbt-style transformation layers and tests.
- Warehouse/lakehouse modeling.
- Monitoring, alerting, backfills, and incident response.
- Analytics dashboards and AI reporting consumers.

## Production Version

The static page demonstrates the product behavior without external credentials. A production build would add:

- Real orchestration metadata from Airflow, Dagster, or Prefect.
- Warehouse audit tables for row counts, freshness, and reconciliation.
- dbt artifacts and test results.
- Alert routing to Slack, email, Linear, or PagerDuty.
- Role-based views for engineering, finance, marketing, and executives.
