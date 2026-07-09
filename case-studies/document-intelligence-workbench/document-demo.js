const documents = [
  {
    id: "INV-1048",
    title: "Vendor invoice",
    type: "Invoice",
    status: "review",
    owner: "Finance Ops",
    received: "2026-07-02",
    schemaStatus: "Needs review",
    lines: [
      ["Vendor", "Northstar Materials LLC"],
      ["Invoice number", "INV-1048"],
      ["Invoice date", "July 1, 2026"],
      ["Purchase order", "Missing"],
      ["Total amount due", "$4,825.30"],
      ["Payment terms", "Net 30"],
      ["Remit to", "Northstar Materials, 1188 Hill Road"],
      ["Notes", "Delivery accepted by site supervisor."]
    ],
    fields: [
      { name: "vendor_name", value: "Northstar Materials LLC", confidence: 0.97, evidence: "Vendor: Northstar Materials LLC", status: "pass" },
      { name: "invoice_number", value: "INV-1048", confidence: 0.95, evidence: "Invoice number: INV-1048", status: "pass" },
      { name: "invoice_total", value: "4825.30", confidence: 0.96, evidence: "Total amount due: $4,825.30", status: "pass" },
      { name: "purchase_order", value: null, confidence: 0.42, evidence: "Purchase order: Missing", status: "review" },
      { name: "payment_terms", value: "Net 30", confidence: 0.9, evidence: "Payment terms: Net 30", status: "pass" }
    ]
  },
  {
    id: "CLM-2207",
    title: "Insurance claim intake",
    type: "Claim",
    status: "blocked",
    owner: "Claims Ops",
    received: "2026-07-03",
    schemaStatus: "Blocked",
    lines: [
      ["Claimant", "Maya Chen"],
      ["Claim number", "CLM-2207"],
      ["Loss date", "June 28, 2026"],
      ["Incident type", "Water damage"],
      ["Estimated loss", "$18,400"],
      ["Policy number", "Unreadable"],
      ["Contact phone", "(314) 555-0184"],
      ["Adjuster note", "Policy number cropped in original scan."]
    ],
    fields: [
      { name: "claimant_name", value: "Maya Chen", confidence: 0.94, evidence: "Claimant: Maya Chen", status: "pass" },
      { name: "claim_number", value: "CLM-2207", confidence: 0.93, evidence: "Claim number: CLM-2207", status: "pass" },
      { name: "loss_date", value: "2026-06-28", confidence: 0.91, evidence: "Loss date: June 28, 2026", status: "pass" },
      { name: "estimated_loss", value: "18400.00", confidence: 0.88, evidence: "Estimated loss: $18,400", status: "pass" },
      { name: "policy_number", value: null, confidence: 0.21, evidence: "Policy number: Unreadable", status: "blocked" }
    ]
  },
  {
    id: "CTR-7812",
    title: "Vendor services agreement",
    type: "Contract",
    status: "approved",
    owner: "Legal Ops",
    received: "2026-07-05",
    schemaStatus: "Valid",
    lines: [
      ["Counterparty", "Aster Cloud Services"],
      ["Agreement ID", "CTR-7812"],
      ["Effective date", "July 15, 2026"],
      ["Renewal", "Auto-renews annually unless canceled with 60 days notice"],
      ["Liability cap", "$250,000"],
      ["Governing law", "Delaware"],
      ["Data processing", "Vendor must maintain SOC 2 controls."],
      ["Signature status", "Signed by both parties"]
    ],
    fields: [
      { name: "counterparty", value: "Aster Cloud Services", confidence: 0.96, evidence: "Counterparty: Aster Cloud Services", status: "pass" },
      { name: "effective_date", value: "2026-07-15", confidence: 0.94, evidence: "Effective date: July 15, 2026", status: "pass" },
      { name: "renewal_terms", value: "Auto-renews annually unless canceled with 60 days notice", confidence: 0.89, evidence: "Renewal: Auto-renews annually unless canceled with 60 days notice", status: "pass" },
      { name: "liability_cap", value: "250000.00", confidence: 0.92, evidence: "Liability cap: $250,000", status: "pass" },
      { name: "governing_law", value: "Delaware", confidence: 0.91, evidence: "Governing law: Delaware", status: "pass" }
    ]
  },
  {
    id: "INT-3390",
    title: "Client onboarding form",
    type: "Intake",
    status: "review",
    owner: "Implementation",
    received: "2026-07-06",
    schemaStatus: "Needs review",
    lines: [
      ["Client", "Brightline Studio"],
      ["Primary contact", "Jordan Reyes"],
      ["Requested workflow", "Monthly social analytics reporting"],
      ["Source systems", "Meta, TikTok, Shopify"],
      ["Data warehouse", "Not yet selected"],
      ["Success metric", "Reduce report prep time by 70%"],
      ["Launch target", "August 2026"],
      ["Security note", "Client prefers least privilege access."]
    ],
    fields: [
      { name: "client_name", value: "Brightline Studio", confidence: 0.95, evidence: "Client: Brightline Studio", status: "pass" },
      { name: "primary_contact", value: "Jordan Reyes", confidence: 0.93, evidence: "Primary contact: Jordan Reyes", status: "pass" },
      { name: "workflow_type", value: "Monthly social analytics reporting", confidence: 0.9, evidence: "Requested workflow: Monthly social analytics reporting", status: "pass" },
      { name: "source_systems", value: "Meta, TikTok, Shopify", confidence: 0.89, evidence: "Source systems: Meta, TikTok, Shopify", status: "pass" },
      { name: "warehouse", value: null, confidence: 0.48, evidence: "Data warehouse: Not yet selected", status: "review" }
    ]
  }
];

let activeDocumentId = documents[0].id;

const queueEl = document.getElementById("documentQueue");
const titleEl = document.getElementById("documentTitle");
const statusEl = document.getElementById("documentStatus");
const previewEl = document.getElementById("documentPreview");
const confidenceEl = document.getElementById("overallConfidence");
const schemaEl = document.getElementById("schemaStatus");
const fieldTableEl = document.getElementById("fieldTable");
const evidenceGridEl = document.getElementById("evidenceGrid");
const approveButton = document.getElementById("approveButton");
const reviewButton = document.getElementById("reviewButton");

function statusLabel(status) {
  if (status === "approved") return "Approved";
  if (status === "blocked") return "Blocked";
  return "Needs Review";
}

function confidenceClass(confidence) {
  if (confidence >= 0.9) return "high";
  if (confidence >= 0.72) return "medium";
  return "low";
}

function averageConfidence(fields) {
  const total = fields.reduce((sum, field) => sum + field.confidence, 0);
  return Math.round((total / fields.length) * 100);
}

function activeDocument() {
  return documents.find((document) => document.id === activeDocumentId) || documents[0];
}

function renderQueue() {
  queueEl.innerHTML = documents.map((document) => `
    <button type="button" class="queue-item ${document.id === activeDocumentId ? "active" : ""}" data-id="${document.id}">
      <h3>${document.title}</h3>
      <div class="queue-meta">
        <span>${document.id}</span>
        <span>${document.type}</span>
        <span>${statusLabel(document.status)}</span>
      </div>
    </button>
  `).join("");

  queueEl.querySelectorAll(".queue-item").forEach((button) => {
    button.addEventListener("click", () => {
      activeDocumentId = button.dataset.id;
      render();
    });
  });
}

function renderPreview(document) {
  previewEl.innerHTML = `
    <div class="doc-letterhead">
      <div>
        <h3>${document.title}</h3>
        <p>${document.owner} | Received ${document.received}</p>
      </div>
      <p>${document.id}</p>
    </div>
    <div class="doc-grid">
      ${document.lines.map(([label, value]) => {
        const field = document.fields.find((candidate) => candidate.evidence.includes(`${label}:`));
        const flagged = field && field.status !== "pass";
        return `<div class="doc-line"><strong>${label}</strong><br><mark>${value}</mark>${flagged ? "  <em>review</em>" : ""}</div>`;
      }).join("")}
    </div>
  `;
}

function renderFields(document) {
  fieldTableEl.innerHTML = document.fields.map((field) => `
    <div class="field-row">
      <div class="field-name">${field.name}</div>
      <div class="field-value">${field.value ?? "Requires review"}</div>
      <span class="confidence ${confidenceClass(field.confidence)}">${Math.round(field.confidence * 100)}%</span>
    </div>
  `).join("");
}

function renderEvidence(document) {
  evidenceGridEl.innerHTML = document.fields.map((field) => `
    <article class="evidence-card">
      <h3>${field.name}</h3>
      <p>Value: ${field.value ?? "unresolved"} | Confidence: ${Math.round(field.confidence * 100)}%</p>
      <blockquote>${field.evidence}</blockquote>
    </article>
  `).join("");
}

function renderStatus(document) {
  titleEl.textContent = document.title;
  statusEl.textContent = statusLabel(document.status);
  statusEl.className = `status-pill ${document.status}`;
  confidenceEl.textContent = `${averageConfidence(document.fields)}%`;
  schemaEl.textContent = document.schemaStatus;
}

function render() {
  const document = activeDocument();
  renderQueue();
  renderStatus(document);
  renderPreview(document);
  renderFields(document);
  renderEvidence(document);
}

approveButton.addEventListener("click", () => {
  const document = activeDocument();
  document.status = "approved";
  document.schemaStatus = "Valid";
  render();
});

reviewButton.addEventListener("click", () => {
  const document = activeDocument();
  document.status = "review";
  document.schemaStatus = "Needs review";
  render();
});

render();
