const pipelines = [
  {
    id: "pay_001",
    domain: "Payments",
    name: "Payment Transactions Lakehouse",
    source: "Stripe, PayPal, Solidgate",
    status: "healthy",
    rows: 18420000,
    freshness: 12,
    sla: 30,
    quality: 99,
    blockedDashboards: 0,
    backfillHours: 0,
    owner: "Data Platform",
    action: "No action needed"
  },
  {
    id: "mkt_014",
    domain: "Marketing",
    name: "Marketing Attribution Mart",
    source: "GA4, Google Ads, Meta Ads",
    status: "warning",
    rows: 3170000,
    freshness: 61,
    sla: 45,
    quality: 92,
    blockedDashboards: 2,
    backfillHours: 3,
    owner: "Growth Analytics",
    action: "Replay GA4 export partition"
  },
  {
    id: "ops_022",
    domain: "Operations",
    name: "CRM Opportunity Sync",
    source: "SQL Server CRM",
    status: "healthy",
    rows: 842000,
    freshness: 18,
    sla: 60,
    quality: 97,
    blockedDashboards: 0,
    backfillHours: 0,
    owner: "RevOps",
    action: "Monitor owner mapping drift"
  },
  {
    id: "prd_031",
    domain: "Product",
    name: "Product Events Sessionization",
    source: "Application event stream",
    status: "failed",
    rows: 9250000,
    freshness: 142,
    sla: 30,
    quality: 81,
    blockedDashboards: 4,
    backfillHours: 7,
    owner: "Product Data",
    action: "Repair duplicate session keys"
  },
  {
    id: "pay_008",
    domain: "Payments",
    name: "Refund Reconciliation",
    source: "Stripe API and warehouse ledger",
    status: "warning",
    rows: 118000,
    freshness: 35,
    sla: 30,
    quality: 94,
    blockedDashboards: 1,
    backfillHours: 1,
    owner: "Finance Analytics",
    action: "Review source total variance"
  }
];

const qualityChecks = [
  {
    domain: "Payments",
    asset: "gold_revenue_mart",
    check: "source_to_mart_reconciliation",
    score: 99,
    status: "healthy",
    detail: "Payment totals reconcile within the accepted 100 dollar variance threshold.",
    owner: "Finance Analytics"
  },
  {
    domain: "Marketing",
    asset: "silver_ad_clicks",
    check: "click_id_not_null",
    score: 91,
    status: "warning",
    detail: "Meta Ads click IDs dropped below the expected match rate for one partition.",
    owner: "Growth Analytics"
  },
  {
    domain: "Product",
    asset: "silver_sessions",
    check: "session_key_unique",
    score: 74,
    status: "failed",
    detail: "Duplicate session keys increased after an application event schema change.",
    owner: "Product Data"
  },
  {
    domain: "Operations",
    asset: "gold_pipeline_health",
    check: "freshness_sla_met",
    score: 98,
    status: "healthy",
    detail: "Operational status marts refreshed inside the one-hour SLA.",
    owner: "Data Platform"
  }
];

const incidents = [
  {
    domain: "Marketing",
    title: "GA4 daily export late",
    severity: "medium",
    asset: "marketing_attribution_mart",
    action: "Replay raw partition and hold two dashboards until freshness clears."
  },
  {
    domain: "Product",
    title: "Duplicate session keys",
    severity: "high",
    asset: "silver_sessions",
    action: "Block downstream product funnel mart and backfill after dedupe patch."
  },
  {
    domain: "Payments",
    title: "Refund variance review",
    severity: "low",
    asset: "refund_reconciliation",
    action: "Compare Stripe refund status against ledger transaction date."
  }
];

const domainFilter = document.getElementById("domainFilter");
const windowFilter = document.getElementById("windowFilter");
const rerunButton = document.getElementById("rerunButton");
const healthyCount = document.getElementById("healthyCount");
const incidentCount = document.getElementById("incidentCount");
const rowsProcessed = document.getElementById("rowsProcessed");
const freshnessSla = document.getElementById("freshnessSla");
const freshAssets = document.getElementById("freshAssets");
const qualityRate = document.getElementById("qualityRate");
const blockedDashboards = document.getElementById("blockedDashboards");
const backfillHours = document.getElementById("backfillHours");
const pipelineList = document.getElementById("pipelineList");
const incidentList = document.getElementById("incidentList");
const qualityGrid = document.getElementById("qualityGrid");

function formatRows(value) {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${Math.round(value / 1000)}K`;
  return String(value);
}

function statusLabel(status) {
  if (status === "healthy") return "Healthy";
  if (status === "warning") return "Warning";
  return "Failed";
}

function getFilteredData() {
  const domain = domainFilter.value;
  const multiplier = windowFilter.value === "week" ? 7 : windowFilter.value === "month" ? 30 : 1;
  const filteredPipelines = pipelines
    .filter((pipeline) => domain === "all" || pipeline.domain === domain)
    .map((pipeline) => ({
      ...pipeline,
      rows: Math.round(pipeline.rows * multiplier),
      backfillHours: pipeline.backfillHours * (windowFilter.value === "today" ? 1 : Math.max(1, Math.round(multiplier / 3)))
    }));
  const filteredChecks = qualityChecks.filter((check) => domain === "all" || check.domain === domain);
  const filteredIncidents = incidents.filter((incident) => domain === "all" || incident.domain === domain);
  return { filteredPipelines, filteredChecks, filteredIncidents };
}

function renderSnapshot(filteredPipelines, filteredIncidents) {
  const healthy = filteredPipelines.filter((pipeline) => pipeline.status === "healthy").length;
  const rows = filteredPipelines.reduce((sum, pipeline) => sum + pipeline.rows, 0);
  const freshnessPass = filteredPipelines.filter((pipeline) => pipeline.freshness <= pipeline.sla).length;
  const qualityAvg = filteredPipelines.length
    ? Math.round(filteredPipelines.reduce((sum, pipeline) => sum + pipeline.quality, 0) / filteredPipelines.length)
    : 0;

  healthyCount.textContent = `${healthy}/${filteredPipelines.length}`;
  incidentCount.textContent = filteredIncidents.length;
  rowsProcessed.textContent = formatRows(rows);
  freshnessSla.textContent = filteredPipelines.length ? `${Math.round((freshnessPass / filteredPipelines.length) * 100)}%` : "0%";
  freshAssets.textContent = freshnessPass;
  qualityRate.textContent = `${qualityAvg}%`;
  blockedDashboards.textContent = filteredPipelines.reduce((sum, pipeline) => sum + pipeline.blockedDashboards, 0);
  backfillHours.textContent = `${filteredPipelines.reduce((sum, pipeline) => sum + pipeline.backfillHours, 0)}h`;
}

function renderPipelines(filteredPipelines) {
  pipelineList.innerHTML = filteredPipelines.map((pipeline) => {
    const freshnessPct = Math.max(0, Math.min(100, Math.round((1 - pipeline.freshness / Math.max(pipeline.sla * 3, 1)) * 100)));
    return `
      <article class="pipeline-row">
        <div class="pipeline-name">
          <h3>${pipeline.name}</h3>
          <p>${pipeline.domain} - ${pipeline.source}</p>
        </div>
        <span class="status-pill status-${pipeline.status}">${statusLabel(pipeline.status)}</span>
        <span class="mono">${formatRows(pipeline.rows)} rows</span>
        <div>
          <p class="mono">${pipeline.freshness}m freshness / ${pipeline.sla}m SLA</p>
          <div class="bar-track" aria-hidden="true">
            <div class="bar-fill" style="width: ${freshnessPct}%"></div>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function renderIncidents(filteredIncidents) {
  incidentList.innerHTML = filteredIncidents.length
    ? filteredIncidents.map((incident) => `
      <article class="incident-card">
        <h3>${incident.title}</h3>
        <p>${incident.action}</p>
        <div class="incident-meta">
          <span>${incident.domain}</span>
          <span>${incident.severity}</span>
          <span>${incident.asset}</span>
        </div>
      </article>
    `).join("")
    : `<article class="incident-card"><h3>No active incidents</h3><p>The selected domain has no open quality or freshness blockers.</p></article>`;
}

function renderQuality(filteredChecks) {
  qualityGrid.innerHTML = filteredChecks.length
    ? filteredChecks.map((check) => `
      <article class="quality-card">
        <span class="quality-score">${check.score}%</span>
        <h3>${check.check}</h3>
        <p>${check.detail}</p>
        <div class="quality-meta">
          <span class="status-${check.status}">${statusLabel(check.status)}</span>
          <span>${check.asset}</span>
          <span>${check.owner}</span>
        </div>
      </article>
    `).join("")
    : `<article class="quality-card"><span class="quality-score">--</span><h3>No checks in scope</h3><p>Select a broader domain to inspect quality gates.</p></article>`;
}

function renderDashboard() {
  const { filteredPipelines, filteredChecks, filteredIncidents } = getFilteredData();
  renderSnapshot(filteredPipelines, filteredIncidents);
  renderPipelines(filteredPipelines);
  renderIncidents(filteredIncidents);
  renderQuality(filteredChecks);
}

function simulateRerun() {
  rerunButton.textContent = "Rerun queued";
  setTimeout(() => {
    rerunButton.textContent = "Simulate Rerun";
    renderDashboard();
  }, 700);
}

domainFilter.addEventListener("change", renderDashboard);
windowFilter.addEventListener("change", renderDashboard);
rerunButton.addEventListener("click", simulateRerun);

renderDashboard();
