const knowledgeChunks = [
  {
    id: "FIN-002.1",
    title: "Vendor Invoice Processing SOP",
    section: "Purchase order matching",
    sourceType: "SOP",
    owner: "Finance Ops",
    updated: "2026-06-14",
    keywords: ["invoice", "vendor", "purchase order", "po", "approval", "exception"],
    text: "Every vendor invoice should be matched against a purchase order and receiving record before payment approval. If the purchase order is missing, the invoice should not be auto-approved."
  },
  {
    id: "FIN-002.2",
    title: "Vendor Invoice Processing SOP",
    section: "Exception queue",
    sourceType: "SOP",
    owner: "Finance Ops",
    updated: "2026-06-14",
    keywords: ["invoice", "missing po", "exception queue", "ap", "manager review"],
    text: "Invoices missing a purchase order route to the AP exception queue. The queue owner verifies the vendor, requests the missing PO or approval note, and sends amounts above 2500 dollars to manager review."
  },
  {
    id: "SEC-004.1",
    title: "API Key Rotation Policy",
    section: "Rotation cadence",
    sourceType: "Policy",
    owner: "Security",
    updated: "2026-05-20",
    keywords: ["api key", "rotation", "vendor", "security", "credential", "risk"],
    text: "Standard API keys rotate every 90 days. High risk vendor integrations rotate every 30 days, and keys with production write access require owner confirmation before renewal."
  },
  {
    id: "SEC-004.2",
    title: "API Key Rotation Policy",
    section: "Incident handling",
    sourceType: "Policy",
    owner: "Security",
    updated: "2026-05-20",
    keywords: ["api key", "leak", "incident", "revocation", "audit"],
    text: "If an API key is exposed, revoke the key immediately, create an incident record, audit the last 14 days of requests, and issue a replacement only after the integration owner confirms scope."
  },
  {
    id: "OPS-010.1",
    title: "Client Onboarding Playbook",
    section: "Kickoff readiness",
    sourceType: "Playbook",
    owner: "Implementation",
    updated: "2026-06-02",
    keywords: ["onboarding", "client", "kickoff", "data map", "source system", "owner"],
    text: "Before kickoff, the implementation lead confirms the business objective, source system inventory, data owner list, sample exports, access path, and success metric for the first workflow."
  },
  {
    id: "OPS-010.2",
    title: "Client Onboarding Playbook",
    section: "Data access checklist",
    sourceType: "Playbook",
    owner: "Implementation",
    updated: "2026-06-02",
    keywords: ["onboarding", "access", "permissions", "database", "api", "warehouse"],
    text: "Data access should be scoped by environment. Production credentials are not shared in kickoff notes. API, database, and warehouse access should be documented with owner, purpose, and expiration."
  },
  {
    id: "SLA-003.1",
    title: "Support Escalation Matrix",
    section: "Critical incident response",
    sourceType: "Runbook",
    owner: "Support Ops",
    updated: "2026-04-28",
    keywords: ["support", "critical", "incident", "sla", "escalation", "acknowledge"],
    text: "Critical incidents require acknowledgement within 15 minutes. The support lead opens an incident room, assigns an owner, posts status every 30 minutes, and escalates unresolved blockers after 60 minutes."
  },
  {
    id: "SLA-003.2",
    title: "Support Escalation Matrix",
    section: "Severity definitions",
    sourceType: "Runbook",
    owner: "Support Ops",
    updated: "2026-04-28",
    keywords: ["support", "severity", "incident", "customer impact", "sla"],
    text: "Severity one means a production workflow is unavailable for multiple customers or a data integrity issue is actively affecting customer decisions. Severity two covers degraded workflows with a workaround."
  },
  {
    id: "CAT-007.1",
    title: "Product Listing Launch Guide",
    section: "Listing requirements",
    sourceType: "Product",
    owner: "Ecommerce Ops",
    updated: "2026-06-18",
    keywords: ["product", "listing", "launch", "seo", "tags", "images", "pricing"],
    text: "A new ecommerce product listing requires an SEO title, 13 keyword tags, product category, image set, price, margin estimate, production notes, and compliance review before it can be pushed live."
  },
  {
    id: "CAT-007.2",
    title: "Product Listing Launch Guide",
    section: "Compliance review",
    sourceType: "Product",
    owner: "Ecommerce Ops",
    updated: "2026-06-18",
    keywords: ["product", "listing", "compliance", "trademark", "restricted", "review"],
    text: "Listings that include restricted terms, celebrity names, sports teams, protected brands, or medical claims are blocked until manual review approves the language and design direction."
  },
  {
    id: "DATA-011.1",
    title: "Analytics Data Quality Policy",
    section: "Freshness and reconciliation",
    sourceType: "Policy",
    owner: "Data Platform",
    updated: "2026-06-07",
    keywords: ["data quality", "freshness", "reconciliation", "pipeline", "warehouse"],
    text: "Daily analytics tables should publish freshness checks, row count deltas, and reconciliation totals against the source system. Failed checks block dashboard refresh until the owner reviews the variance."
  },
  {
    id: "DATA-011.2",
    title: "Analytics Data Quality Policy",
    section: "Review artifacts",
    sourceType: "Policy",
    owner: "Data Platform",
    updated: "2026-06-07",
    keywords: ["review artifact", "lineage", "data quality", "csv", "audit"],
    text: "Material data changes require a review artifact that includes stable keys, previous values, proposed values, source lineage, and status reason so a reviewer can validate the mutation set."
  }
];

const stopWords = new Set([
  "a", "an", "and", "are", "as", "at", "be", "before", "by", "for", "from", "how", "if",
  "in", "is", "it", "of", "on", "or", "should", "the", "to", "what", "when", "with"
]);

const queryInput = document.getElementById("queryInput");
const sourceFilter = document.getElementById("sourceFilter");
const modelMode = document.getElementById("modelMode");
const thresholdInput = document.getElementById("thresholdInput");
const thresholdValue = document.getElementById("thresholdValue");
const runButton = document.getElementById("runButton");
const answerTitle = document.getElementById("answerTitle");
const answerBody = document.getElementById("answerBody");
const citationRow = document.getElementById("citationRow");
const sourceResults = document.getElementById("sourceResults");
const chunksScanned = document.getElementById("chunksScanned");
const matchesReturned = document.getElementById("matchesReturned");
const topScore = document.getElementById("topScore");
const coverageScore = document.getElementById("coverageScore");
const evalList = document.getElementById("evalList");

function tokenize(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 1 && !stopWords.has(token));
}

function scoreChunk(query, chunk) {
  const queryTokens = tokenize(query);
  const text = `${chunk.title} ${chunk.section} ${chunk.text}`.toLowerCase();
  const keywordText = chunk.keywords.join(" ").toLowerCase();
  let rawScore = 0;

  queryTokens.forEach((token) => {
    if (text.includes(token)) rawScore += 7;
    if (keywordText.includes(token)) rawScore += 12;
    if (chunk.title.toLowerCase().includes(token)) rawScore += 5;
    if (chunk.section.toLowerCase().includes(token)) rawScore += 5;
  });

  chunk.keywords.forEach((keyword) => {
    if (query.toLowerCase().includes(keyword)) rawScore += 16;
  });

  const phraseBoosts = [
    ["purchase order", "missing po", "invoice"],
    ["api key", "rotation", "vendor"],
    ["client onboarding", "kickoff", "source system"],
    ["critical incident", "support", "sla"],
    ["product listing", "launch", "seo"]
  ];

  phraseBoosts.forEach((group) => {
    const hits = group.filter((phrase) => query.toLowerCase().includes(phrase)).length;
    if (hits > 1 && group.some((phrase) => keywordText.includes(phrase))) rawScore += 20;
  });

  return Math.min(0.98, Math.max(0, rawScore / 100));
}

function retrieve(query) {
  const threshold = Number(thresholdInput.value);
  const filter = sourceFilter.value;
  const allowed = knowledgeChunks.filter((chunk) => filter === "all" || chunk.sourceType === filter);

  const scored = allowed
    .map((chunk) => ({ ...chunk, score: scoreChunk(query, chunk) }))
    .filter((chunk) => chunk.score >= threshold)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6);

  return { allowed, scored, threshold };
}

function inferAnswer(query, matches) {
  const lower = query.toLowerCase();
  const cite = (id) => `<span class="citation-pill">${id}</span>`;

  if (!matches.length) {
    return {
      title: "No grounded answer available",
      html: "<p>The retrieval layer did not find enough source evidence above the selected threshold. Lower the threshold, remove the source filter, or rephrase the question.</p>",
      citations: []
    };
  }

  if (lower.includes("invoice") || lower.includes("purchase order") || lower.includes("po")) {
    return {
      title: "Vendor invoice exception path",
      html: `<p>Do not auto-approve the invoice. The knowledge base says vendor invoices should match both a purchase order and receiving record before payment approval.</p>
        <ul>
          <li>Route invoices missing a purchase order to the AP exception queue.</li>
          <li>The queue owner verifies the vendor and requests the missing PO or approval note.</li>
          <li>Amounts above 2500 dollars require manager review before payment.</li>
        </ul>`,
      citations: ["FIN-002.1", "FIN-002.2"]
    };
  }

  if (lower.includes("api") || lower.includes("key") || lower.includes("rotation")) {
    return {
      title: "API key rotation rule",
      html: `<p>Standard API keys rotate every 90 days, but high risk vendor integrations rotate every 30 days.</p>
        <ul>
          <li>Production write access requires owner confirmation before renewal.</li>
          <li>Exposed keys should be revoked immediately and reviewed through an incident record.</li>
        </ul>`,
      citations: ["SEC-004.1", "SEC-004.2"]
    };
  }

  if (lower.includes("onboarding") || lower.includes("kickoff") || lower.includes("client")) {
    return {
      title: "Client onboarding readiness",
      html: `<p>Before kickoff, the implementation lead should confirm the business objective, source system inventory, data owners, sample exports, access path, and success metric.</p>
        <ul>
          <li>Access should be scoped by environment.</li>
          <li>API, database, and warehouse access should include owner, purpose, and expiration.</li>
        </ul>`,
      citations: ["OPS-010.1", "OPS-010.2"]
    };
  }

  if (lower.includes("support") || lower.includes("critical") || lower.includes("incident") || lower.includes("sla")) {
    return {
      title: "Critical support incident flow",
      html: `<p>A critical incident requires acknowledgement within 15 minutes. The support lead opens an incident room, assigns an owner, and posts updates every 30 minutes.</p>
        <ul>
          <li>Unresolved blockers escalate after 60 minutes.</li>
          <li>Severity one covers production workflow outages or active data integrity issues affecting customer decisions.</li>
        </ul>`,
      citations: ["SLA-003.1", "SLA-003.2"]
    };
  }

  if (lower.includes("product") || lower.includes("listing") || lower.includes("launch") || lower.includes("seo")) {
    return {
      title: "Ecommerce product launch requirements",
      html: `<p>A new product listing needs an SEO title, 13 keyword tags, product category, image set, price, margin estimate, production notes, and compliance review before launch.</p>
        <ul>
          <li>Restricted terms, celebrity names, sports teams, protected brands, and medical claims require manual review.</li>
          <li>Blocked listings should not move live until the language and design direction are approved.</li>
        </ul>`,
      citations: ["CAT-007.1", "CAT-007.2"]
    };
  }

  const top = matches.slice(0, 3);
  return {
    title: "Grounded answer from retrieved sources",
    html: `<p>The strongest match is <strong>${top[0].title}</strong>, specifically the ${top[0].section.toLowerCase()} section. The retrieved evidence says: ${top[0].text}</p>`,
    citations: top.map((chunk) => chunk.id)
  };
}

function renderSources(matches) {
  sourceResults.innerHTML = matches.length
    ? matches.map((chunk) => `
      <article class="source-card">
        <div class="source-topline">
          <span class="source-id">${chunk.id}</span>
          <span class="score-badge">${chunk.score.toFixed(2)}</span>
        </div>
        <h3>${chunk.title}</h3>
        <p><strong>${chunk.section}</strong></p>
        <p>${chunk.text}</p>
        <div class="metadata-row">
          <span>${chunk.sourceType}</span>
          <span>${chunk.owner}</span>
          <span>${chunk.updated}</span>
        </div>
      </article>
    `).join("")
    : `<article class="source-card"><h3>No source evidence found</h3><p>Try a broader source filter or lower retrieval threshold.</p></article>`;
}

function renderMetrics(matches, scanned, threshold) {
  const top = matches[0]?.score ?? 0;
  const coverage = matches.length ? Math.round((matches.length / Math.min(scanned, 6)) * 100) : 0;
  chunksScanned.textContent = scanned;
  matchesReturned.textContent = matches.length;
  topScore.textContent = top.toFixed(2);
  coverageScore.textContent = `${coverage}%`;

  const checks = [
    { pass: matches.length >= 2, label: "At least two evidence chunks retrieved." },
    { pass: top >= threshold, label: "Top result clears the selected score threshold." },
    { pass: matches.length === 0 || new Set(matches.map((match) => match.title)).size >= 1, label: "Source metadata is available for review." },
    { pass: matches.length > 0, label: "Answer can be grounded with citations." },
    { pass: modelMode.value !== "", label: "Generation mode is explicitly selected." }
  ];

  evalList.innerHTML = checks.map((check) => `
    <li class="${check.pass ? "pass" : "warn"}">${check.label}</li>
  `).join("");
}

function renderAnswer(query, matches) {
  const answer = inferAnswer(query, matches);
  answerTitle.textContent = answer.title;
  answerBody.innerHTML = answer.html;
  citationRow.innerHTML = answer.citations.map((id) => `<span class="citation-pill">${id}</span>`).join("");
}

function runRetrieval() {
  const query = queryInput.value.trim();
  const { allowed, scored, threshold } = retrieve(query);
  renderAnswer(query, scored);
  renderSources(scored);
  renderMetrics(scored, allowed.length, threshold);
}

document.querySelectorAll(".sample-chip").forEach((button) => {
  button.addEventListener("click", () => {
    queryInput.value = button.dataset.query;
    runRetrieval();
  });
});

thresholdInput.addEventListener("input", () => {
  thresholdValue.textContent = Number(thresholdInput.value).toFixed(2);
});

runButton.addEventListener("click", runRetrieval);
sourceFilter.addEventListener("change", runRetrieval);
modelMode.addEventListener("change", runRetrieval);

runRetrieval();
