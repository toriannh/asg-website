const scenarios = {
  ecommerce: {
    prompt:
      "Create a product-launch package for a small ecommerce shop selling Father's Day fishing gifts. Research demand signals, propose original product concepts, block trademarked language, estimate margin risk, and return a reviewable launch brief.",
    workflow: "product_launch",
    briefTitle: "Father's Day Fishing Gift Launch Pack",
    briefSummary:
      "Three original product concepts passed novelty and margin checks. Two keyword clusters require review because they include restricted retailer and sports-team language.",
    tags: ["fishing gifts", "dad products", "etsy launch", "review required"],
    output: {
      workflow: "product_launch",
      audience: "gift buyers shopping for fishing dads",
      launch_score: 86,
      concepts: [
        {
          title: "Reel Cool Dad Dockside Tumbler",
          margin_estimate: 0.58,
          status: "ready_for_listing"
        },
        {
          title: "Weekend Angler Tackle Tray Label Set",
          margin_estimate: 0.49,
          status: "needs_mockup_review"
        },
        {
          title: "Lake Day Dad Camp Mug",
          margin_estimate: 0.53,
          status: "ready_for_listing"
        }
      ],
      review_flags: ["blocked_terms_removed", "mockup_review_required"],
      next_action: "approve safe concepts and send flagged phrases to human review"
    }
  },
  property: {
    prompt:
      "Respond to a leasing inquiry for a two-bedroom unit. Classify the request, check availability, draft a response, flag policy-sensitive questions, and create a follow-up task for the leasing team.",
    workflow: "leasing_inquiry",
    briefTitle: "Leasing Inquiry Response Package",
    briefSummary:
      "The agent drafted a response, confirmed availability from property data, and routed pet-policy and income-verification questions to review.",
    tags: ["leasing", "property ops", "policy review", "follow-up task"],
    output: {
      workflow: "leasing_inquiry",
      lead_intent: "schedule_tour",
      unit_match: "2BR / 2BA",
      confidence: 0.91,
      review_flags: ["policy_sensitive_question"],
      next_action: "send approved tour options after policy response is reviewed"
    }
  },
  leads: {
    prompt:
      "Review a batch of inbound B2B leads. Score fit, enrich company context, classify buying intent, route high-priority prospects, and write a short sales follow-up for each qualified lead.",
    workflow: "lead_routing",
    briefTitle: "B2B Lead Routing Batch",
    briefSummary:
      "The agent qualified eight leads, routed three to sales, held two for enrichment, and generated follow-up copy with CRM-ready fields.",
    tags: ["lead scoring", "crm routing", "sales ops", "human review"],
    output: {
      workflow: "lead_routing",
      leads_processed: 12,
      routed_to_sales: 3,
      enrichment_needed: 2,
      confidence: 0.89,
      review_flags: ["missing_company_size", "unclear_budget_signal"],
      next_action: "sync qualified leads to CRM after enrichment"
    }
  }
};

const steps = [
  {
    id: "router",
    title: "Router",
    summary: "Classifies the request and selects the correct workflow.",
    detail:
      "The router maps the prompt to a product_launch workflow and assigns strict review gates because the request includes public listing copy and compliance-sensitive keywords."
  },
  {
    id: "planner",
    title: "Planner",
    summary: "Creates the execution plan and required tool sequence.",
    detail:
      "The planner decomposes the request into trend retrieval, product ideation, restricted-term screening, margin scoring, listing generation, and database persistence."
  },
  {
    id: "trend",
    title: "Trend research tool",
    summary: "Pulls demand, keyword, and seasonal signals.",
    detail:
      "The research tool returns rising clusters around fishing dad gifts, tumblers, tackle storage, dock day language, and personalized gift phrases."
  },
  {
    id: "ideas",
    title: "Concept generator",
    summary: "Generates original product concepts from the research context.",
    detail:
      "The model generates product concepts constrained by category, buyer intent, production feasibility, margin requirements, and originality rules."
  },
  {
    id: "compliance",
    title: "Compliance guard",
    summary: "Blocks restricted terms and routes uncertain phrases to review.",
    detail:
      "The deterministic gate catches retailer names, sports-team language, celebrity references, and low-confidence claims before listing copy can be approved.",
    warning: true
  },
  {
    id: "listing",
    title: "Listing builder",
    summary: "Creates title, tags, mockup notes, and product copy.",
    detail:
      "The output builder returns clean listing fields, SEO tags, visual mockup instructions, pricing notes, and a review checklist for the operator."
  },
  {
    id: "save",
    title: "Save run state",
    summary: "Persists prompt, tools, outputs, and review flags.",
    detail:
      "The final tool writes run metadata, structured output, review flags, and approval status into a Postgres-style run history table."
  }
];

const promptInput = document.querySelector("#promptInput");
const runButton = document.querySelector("#runButton");
const timeline = document.querySelector("#timeline");
const runState = document.querySelector("#runState");
const progressBar = document.querySelector("#progressBar");
const toolCount = document.querySelector("#toolCount");
const confidenceScore = document.querySelector("#confidenceScore");
const reviewCount = document.querySelector("#reviewCount");
const latency = document.querySelector("#latency");
const detailTitle = document.querySelector("#detailTitle");
const detailBody = document.querySelector("#detailBody");
const reviewQueue = document.querySelector("#reviewQueue");
const briefTitle = document.querySelector("#briefTitle");
const briefSummary = document.querySelector("#briefSummary");
const briefTags = document.querySelector("#briefTags");
const jsonOutput = document.querySelector("#jsonOutput");
const exportButton = document.querySelector("#exportButton");
const approveButton = document.querySelector("#approveButton");

let activeScenario = "ecommerce";
let runComplete = false;
let currentOutput = null;

function setScenario(name) {
  activeScenario = name;
  promptInput.value = scenarios[name].prompt;
  document.querySelectorAll(".scenario").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.scenario === name);
  });
  resetRun();
}

function statusLabel(status) {
  if (status === "complete") return "Complete";
  if (status === "running") return "Running";
  if (status === "warning") return "Review";
  return "Queued";
}

function renderTimeline(activeIndex = -1, completeThrough = -1) {
  timeline.innerHTML = "";
  steps.forEach((step, index) => {
    let status = "queued";
    if (index <= completeThrough) status = step.warning ? "warning" : "complete";
    if (index === activeIndex) status = "running";

    const button = document.createElement("button");
    button.className = "step";
    button.type = "button";
    button.dataset.step = step.id;
    button.innerHTML = `
      <span class="step-index">${String(index + 1).padStart(2, "0")}</span>
      <span>
        <h3>${step.title}</h3>
        <p>${step.summary}</p>
      </span>
      <span class="status-pill ${status}">${statusLabel(status)}</span>
    `;
    button.addEventListener("click", () => selectStep(step.id));
    timeline.appendChild(button);
  });
}

function selectStep(stepId) {
  const step = steps.find((item) => item.id === stepId);
  if (!step) return;

  document.querySelectorAll(".step").forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.step === stepId);
  });

  detailTitle.textContent = step.title;
  detailBody.textContent = step.detail;
}

function resetRun() {
  runComplete = false;
  currentOutput = null;
  runState.textContent = "Ready";
  runState.className = "run-state";
  progressBar.style.width = "0%";
  toolCount.textContent = "0";
  confidenceScore.textContent = "--";
  reviewCount.textContent = "0";
  latency.textContent = "0.0s";
  detailTitle.textContent = "No tool selected";
  detailBody.textContent = "Run the agent, then select a step in the timeline to inspect its output, risk notes, and saved state.";
  reviewQueue.innerHTML = '<li class="empty">No review items yet.</li>';
  briefTitle.textContent = "Waiting for agent run";
  briefSummary.textContent = "The generated brief will appear here after the workflow completes.";
  briefTags.innerHTML = "";
  jsonOutput.textContent = JSON.stringify(
    {
      status: "not_started",
      message: "Run the agent to generate a structured output."
    },
    null,
    2
  );
  renderTimeline();
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runAgent() {
  const scenario = scenarios[activeScenario];
  runButton.disabled = true;
  runState.textContent = "Running";
  runState.className = "run-state running";
  reviewQueue.innerHTML = '<li class="empty">Agent is evaluating review gates.</li>';

  for (let index = 0; index < steps.length; index += 1) {
    renderTimeline(index, index - 1);
    selectStep(steps[index].id);
    progressBar.style.width = `${Math.round((index / steps.length) * 100)}%`;
    toolCount.textContent = String(index + 1);
    latency.textContent = `${(0.4 + index * 0.31).toFixed(1)}s`;
    await sleep(420);
  }

  renderTimeline(-1, steps.length - 1);
  progressBar.style.width = "100%";
  runState.textContent = "Review Ready";
  runState.className = "run-state complete";
  confidenceScore.textContent = activeScenario === "ecommerce" ? "91%" : activeScenario === "property" ? "88%" : "89%";
  reviewCount.textContent = activeScenario === "ecommerce" ? "2" : "1";
  latency.textContent = "2.6s";
  runComplete = true;
  currentOutput = {
    status: "review_ready",
    model_route: document.querySelector("#modelRoute").value,
    risk_mode: document.querySelector("#riskMode").value,
    prompt: promptInput.value,
    ...scenario.output
  };

  briefTitle.textContent = scenario.briefTitle;
  briefSummary.textContent = scenario.briefSummary;
  briefTags.innerHTML = scenario.tags.map((tag) => `<span>${tag}</span>`).join("");
  jsonOutput.textContent = JSON.stringify(currentOutput, null, 2);
  renderReviewQueue(activeScenario);
  selectStep("save");
  runButton.disabled = false;
}

function renderReviewQueue(name) {
  const queues = {
    ecommerce: [
      "Blocked terms removed from keyword set: Bass Pro, Cabelas, team-name variants.",
      "Mockup review required before the tackle-tray concept can be approved."
    ],
    property: [
      "Pet policy and income-verification language require operator approval."
    ],
    leads: [
      "Two leads need enrichment before CRM sync because company size is missing."
    ]
  };

  reviewQueue.innerHTML = queues[name].map((item) => `<li>${item}</li>`).join("");
}

function exportJson() {
  if (!runComplete || !currentOutput) return;

  const blob = new Blob([JSON.stringify(currentOutput, null, 2)], {
    type: "application/json"
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${currentOutput.workflow}_agent_output.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function approveDraft() {
  if (!runComplete || !currentOutput) return;
  currentOutput.status = "approved_for_next_step";
  currentOutput.approved_at = new Date().toISOString();
  jsonOutput.textContent = JSON.stringify(currentOutput, null, 2);
  runState.textContent = "Approved";
}

document.querySelectorAll(".scenario").forEach((button) => {
  button.addEventListener("click", () => setScenario(button.dataset.scenario));
});

runButton.addEventListener("click", runAgent);
exportButton.addEventListener("click", exportJson);
approveButton.addEventListener("click", approveDraft);

setScenario("ecommerce");
