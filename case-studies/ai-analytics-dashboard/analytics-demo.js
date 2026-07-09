const clients = {
  "maven-skincare": {
    name: "Maven Skincare",
    category: "Beauty ecommerce",
    summaryTone: "polished consumer brand",
    months: {
      "2026-06": {
        label: "June 2026",
        kpis: {
          reach: 184200,
          engagements: 14170,
          clicks: 5280,
          followers: 41200
        },
        deltas: {
          reach: 18.4,
          engagements: 12.7,
          clicks: 21.6,
          followers: 4.3
        },
        weekly: [
          { week: "W1", reach: 28200, engagements: 2020 },
          { week: "W2", reach: 33800, engagements: 2380 },
          { week: "W3", reach: 49200, engagements: 4140 },
          { week: "W4", reach: 40700, engagements: 3180 },
          { week: "W5", reach: 32300, engagements: 2450 },
          { week: "W6", reach: 0, engagements: 0 }
        ],
        channels: [
          { name: "Instagram", reach: 96400, engagementRate: 8.1, share: 52 },
          { name: "TikTok", reach: 63800, engagementRate: 6.8, share: 35 },
          { name: "Facebook", reach: 24000, engagementRate: 3.2, share: 13 }
        ],
        narrative: {
          headline: "The launch content worked because it showed the product in use, not just the product on a surface.",
          risk: "TikTok reach grew quickly, but saves and clicks were concentrated in only two posts. The next cycle needs more repeatable creative formats.",
          next: "Turn the highest-performing routine demo into a three-part series and move paid spend behind the post format that produced the strongest click-through rate."
        },
        recommendations: [
          { priority: "high", title: "Build a routine-based content series", body: "Use the best-performing morning routine post as the template for three new variations." },
          { priority: "medium", title: "Retarget engaged viewers", body: "Create an audience from video viewers and clickers before the campaign resets." },
          { priority: "low", title: "Refresh Facebook creative", body: "Facebook is stable but under-contributing. Reuse the Instagram winner with simpler copy." }
        ]
      },
      "2026-05": {
        label: "May 2026",
        kpis: {
          reach: 155600,
          engagements: 12570,
          clicks: 4340,
          followers: 39500
        },
        deltas: {
          reach: 9.8,
          engagements: 7.1,
          clicks: 10.4,
          followers: 3.1
        },
        weekly: [
          { week: "W1", reach: 24400, engagements: 1840 },
          { week: "W2", reach: 29000, engagements: 2240 },
          { week: "W3", reach: 34000, engagements: 2700 },
          { week: "W4", reach: 37200, engagements: 3060 },
          { week: "W5", reach: 31000, engagements: 2730 },
          { week: "W6", reach: 0, engagements: 0 }
        ],
        channels: [
          { name: "Instagram", reach: 85600, engagementRate: 7.6, share: 55 },
          { name: "TikTok", reach: 45100, engagementRate: 5.9, share: 29 },
          { name: "Facebook", reach: 24900, engagementRate: 3.4, share: 16 }
        ],
        narrative: {
          headline: "May established the creative baseline and showed that routine content beats static product shots.",
          risk: "The campaign still depends heavily on Instagram, which creates channel concentration risk.",
          next: "Package the top Instagram concepts for TikTok testing and compare hook retention after 48 hours."
        },
        recommendations: [
          { priority: "high", title: "Reduce channel concentration", body: "Repurpose the best Instagram creative into short TikTok tests." },
          { priority: "medium", title: "Tag product benefits consistently", body: "Use the same benefit language across captions to improve attribution." },
          { priority: "low", title: "Archive weak static posts", body: "Remove low-save static formats from next month’s content plan." }
        ]
      }
    }
  },
  "northstar-fitness": {
    name: "Northstar Fitness",
    category: "Local fitness studio",
    summaryTone: "direct response local service",
    months: {
      "2026-06": {
        label: "June 2026",
        kpis: {
          reach: 92100,
          engagements: 6830,
          clicks: 2140,
          followers: 18700
        },
        deltas: {
          reach: 6.2,
          engagements: 14.1,
          clicks: 17.8,
          followers: 2.4
        },
        weekly: [
          { week: "W1", reach: 13200, engagements: 840 },
          { week: "W2", reach: 15400, engagements: 1060 },
          { week: "W3", reach: 18400, engagements: 1420 },
          { week: "W4", reach: 20500, engagements: 1660 },
          { week: "W5", reach: 24600, engagements: 1850 },
          { week: "W6", reach: 0, engagements: 0 }
        ],
        channels: [
          { name: "Instagram", reach: 52200, engagementRate: 7.2, share: 57 },
          { name: "TikTok", reach: 28100, engagementRate: 8.7, share: 30 },
          { name: "Facebook", reach: 11800, engagementRate: 4.4, share: 13 }
        ],
        narrative: {
          headline: "Trainer-led clips are converting better than facility shots because they make the offer feel personal.",
          risk: "Click growth is strong, but the lead magnet is not visible enough in top-performing posts.",
          next: "Add a consistent trial-class CTA to trainer clips and route viewers into a retargeting audience."
        },
        recommendations: [
          { priority: "high", title: "Attach CTA to trainer clips", body: "Add trial-class language to the first caption line and end card." },
          { priority: "medium", title: "Build a local testimonial series", body: "Use member outcomes to strengthen trust before the summer promo." },
          { priority: "low", title: "Keep facility tours as support content", body: "Facility posts are useful but should not carry the campaign." }
        ]
      },
      "2026-05": {
        label: "May 2026",
        kpis: {
          reach: 86700,
          engagements: 5990,
          clicks: 1816,
          followers: 18260
        },
        deltas: {
          reach: 4.6,
          engagements: 8.9,
          clicks: 11.2,
          followers: 1.8
        },
        weekly: [
          { week: "W1", reach: 12200, engagements: 760 },
          { week: "W2", reach: 14600, engagements: 940 },
          { week: "W3", reach: 16100, engagements: 1160 },
          { week: "W4", reach: 19300, engagements: 1430 },
          { week: "W5", reach: 24500, engagements: 1700 },
          { week: "W6", reach: 0, engagements: 0 }
        ],
        channels: [
          { name: "Instagram", reach: 50300, engagementRate: 6.9, share: 58 },
          { name: "TikTok", reach: 23100, engagementRate: 7.8, share: 27 },
          { name: "Facebook", reach: 13300, engagementRate: 4.1, share: 15 }
        ],
        narrative: {
          headline: "May showed steady growth, with short trainer clips starting to outperform branded facility content.",
          risk: "Content volume is low for TikTok relative to the engagement rate it is producing.",
          next: "Increase TikTok posting cadence and keep the same trainer-led hook structure."
        },
        recommendations: [
          { priority: "high", title: "Increase short-form cadence", body: "TikTok is under-supplied relative to engagement quality." },
          { priority: "medium", title: "Test class-specific hooks", body: "Split creative by strength, Pilates, and conditioning audiences." },
          { priority: "low", title: "Move admin posts to Stories", body: "Non-conversion updates should not occupy feed slots." }
        ]
      }
    }
  },
  "brightdesk-saas": {
    name: "BrightDesk SaaS",
    category: "B2B software",
    summaryTone: "pipeline and authority building",
    months: {
      "2026-06": {
        label: "June 2026",
        kpis: {
          reach: 121400,
          engagements: 6110,
          clicks: 3860,
          followers: 26400
        },
        deltas: {
          reach: 11.9,
          engagements: -2.3,
          clicks: 15.5,
          followers: 3.7
        },
        weekly: [
          { week: "W1", reach: 18400, engagements: 900 },
          { week: "W2", reach: 21300, engagements: 1120 },
          { week: "W3", reach: 24700, engagements: 1200 },
          { week: "W4", reach: 29100, engagements: 1430 },
          { week: "W5", reach: 27900, engagements: 1460 },
          { week: "W6", reach: 0, engagements: 0 }
        ],
        channels: [
          { name: "LinkedIn", reach: 81200, engagementRate: 4.6, share: 67 },
          { name: "Instagram", reach: 23700, engagementRate: 3.9, share: 20 },
          { name: "Facebook", reach: 16500, engagementRate: 2.4, share: 13 }
        ],
        narrative: {
          headline: "LinkedIn is driving reach and clicks, but engagement softened as the content became more product-heavy.",
          risk: "The campaign is generating traffic, but authority content is losing share to feature announcements.",
          next: "Rebalance the calendar toward problem-led posts and use product proof as the second beat, not the hook."
        },
        recommendations: [
          { priority: "high", title: "Shift back to problem-led content", body: "The strongest click-through posts started with an operational pain point." },
          { priority: "medium", title: "Add proof screenshots", body: "Pair thought-leadership posts with product evidence in the second frame." },
          { priority: "low", title: "Reduce Facebook reporting weight", body: "Facebook contributes low engagement and should stay secondary." }
        ]
      },
      "2026-05": {
        label: "May 2026",
        kpis: {
          reach: 108500,
          engagements: 6254,
          clicks: 3342,
          followers: 25460
        },
        deltas: {
          reach: 7.4,
          engagements: 4.5,
          clicks: 9.7,
          followers: 2.6
        },
        weekly: [
          { week: "W1", reach: 15800, engagements: 820 },
          { week: "W2", reach: 18200, engagements: 980 },
          { week: "W3", reach: 22100, engagements: 1360 },
          { week: "W4", reach: 25400, engagements: 1460 },
          { week: "W5", reach: 27000, engagements: 1634 },
          { week: "W6", reach: 0, engagements: 0 }
        ],
        channels: [
          { name: "LinkedIn", reach: 72400, engagementRate: 5.2, share: 67 },
          { name: "Instagram", reach: 20100, engagementRate: 4.1, share: 18 },
          { name: "Facebook", reach: 16000, engagementRate: 2.7, share: 15 }
        ],
        narrative: {
          headline: "May’s strongest posts combined operational pain points with clear product proof.",
          risk: "The content engine depends on founder-led posts, which may create a production bottleneck.",
          next: "Turn the top founder post into a repeatable carousel format for the content team."
        },
        recommendations: [
          { priority: "high", title: "Systematize founder content", body: "Build a reusable carousel template from the best founder-led post." },
          { priority: "medium", title: "Add conversion CTA", body: "Use demo language on posts with high saves and comments." },
          { priority: "low", title: "Trim weak platform exports", body: "Keep Facebook in the report but reduce campaign planning weight." }
        ]
      }
    }
  }
};

const sourceStatus = [
  { source: "Meta Graph API", status: "Synced", rows: "18.4K", freshness: "7 min ago" },
  { source: "TikTok Business API", status: "Synced", rows: "9.8K", freshness: "11 min ago" },
  { source: "LinkedIn API", status: "Partial", rows: "6.2K", freshness: "42 min ago" },
  { source: "Warehouse model", status: "Ready", rows: "34.4K", freshness: "2 min ago" }
];

const deliverables = [
  "Client-facing monthly report with executive summary.",
  "Channel performance breakdown with chart-ready metrics.",
  "AI-generated recommendations routed for human review.",
  "Data freshness and sync status for API-backed reporting.",
  "Reusable dashboard template for additional agency clients."
];

const clientSelect = document.getElementById("clientSelect");
const monthSelect = document.getElementById("monthSelect");
const refreshButton = document.getElementById("refreshButton");
const dashboardTitle = document.getElementById("dashboardTitle");
const kpiGrid = document.getElementById("kpiGrid");
const weeklyChart = document.getElementById("weeklyChart");
const trendBadge = document.getElementById("trendBadge");
const modelBadge = document.getElementById("modelBadge");
const aiSummary = document.getElementById("aiSummary");
const channelRows = document.getElementById("channelRows");
const recommendationList = document.getElementById("recommendationList");
const pipelineRows = document.getElementById("pipelineRows");
const deliverableList = document.getElementById("deliverableList");

function formatNumber(value) {
  return new Intl.NumberFormat("en-US", { notation: value >= 100000 ? "compact" : "standard" }).format(value);
}

function formatPercent(value) {
  return `${value > 0 ? "+" : ""}${value.toFixed(1)}%`;
}

function activeData() {
  const client = clients[clientSelect.value];
  const month = client.months[monthSelect.value];
  return { client, month };
}

function populateControls() {
  clientSelect.innerHTML = Object.entries(clients)
    .map(([id, client]) => `<option value="${id}">${client.name}</option>`)
    .join("");
  clientSelect.value = "maven-skincare";
  populateMonths();
}

function populateMonths() {
  const client = clients[clientSelect.value];
  monthSelect.innerHTML = Object.entries(client.months)
    .map(([id, month]) => `<option value="${id}">${month.label}</option>`)
    .join("");
  monthSelect.value = Object.keys(client.months)[0];
}

function renderKpis(month) {
  const kpis = [
    { label: "Reach", value: month.kpis.reach, delta: month.deltas.reach },
    { label: "Engagements", value: month.kpis.engagements, delta: month.deltas.engagements },
    { label: "Clicks", value: month.kpis.clicks, delta: month.deltas.clicks },
    { label: "Followers", value: month.kpis.followers, delta: month.deltas.followers }
  ];

  kpiGrid.innerHTML = kpis.map((kpi) => `
    <article class="kpi-card">
      <p class="kpi-label">${kpi.label}</p>
      <span class="kpi-value">${formatNumber(kpi.value)}</span>
      <span class="kpi-delta ${kpi.delta < 0 ? "down" : ""}">${formatPercent(kpi.delta)} vs prior month</span>
    </article>
  `).join("");
}

function renderWeeklyChart(month) {
  const maxReach = Math.max(...month.weekly.map((week) => week.reach), 1);
  const maxEngagement = Math.max(...month.weekly.map((week) => week.engagements), 1);

  weeklyChart.innerHTML = month.weekly.map((week) => {
    const reachHeight = Math.max(week.reach ? 12 : 0, Math.round((week.reach / maxReach) * 100));
    const engagementHeight = Math.max(week.engagements ? 12 : 0, Math.round((week.engagements / maxEngagement) * 100));
    return `
      <div class="week-bar">
        <div class="bar-stack" title="${week.week}: ${formatNumber(week.reach)} reach, ${formatNumber(week.engagements)} engagements">
          <span class="bar reach" style="height:${reachHeight}%"></span>
          <span class="bar engagement" style="height:${engagementHeight}%"></span>
        </div>
        <span class="week-label">${week.week}</span>
      </div>
    `;
  }).join("");
}

function renderSummary(client, month) {
  dashboardTitle.textContent = `${client.name} - ${month.label}`;
  trendBadge.textContent = month.deltas.engagements < 0 ? "Watch engagement" : "Synced";
  modelBadge.textContent = client.summaryTone.includes("pipeline") ? "Claude summary" : "GPT summary";

  aiSummary.innerHTML = `
    <article class="summary-block">
      <strong>What worked</strong>
      <p>${month.narrative.headline}</p>
    </article>
    <article class="summary-block">
      <strong>What needs attention</strong>
      <p>${month.narrative.risk}</p>
    </article>
    <article class="summary-block">
      <strong>Next move</strong>
      <p>${month.narrative.next}</p>
    </article>
  `;
}

function renderChannels(month) {
  channelRows.innerHTML = month.channels.map((channel) => `
    <div class="channel-row">
      <div class="channel-meta">
        <strong>${channel.name}</strong>
        <span>${formatNumber(channel.reach)} reach | ${channel.engagementRate.toFixed(1)}% ER</span>
      </div>
      <div class="progress-track">
        <div class="progress-fill" style="width:${channel.share}%"></div>
      </div>
    </div>
  `).join("");
}

function renderRecommendations(month) {
  recommendationList.innerHTML = month.recommendations.map((item) => `
    <article class="recommendation">
      <div class="recommendation-header">
        <strong>${item.title}</strong>
        <span class="priority ${item.priority}">${item.priority}</span>
      </div>
      <p>${item.body}</p>
    </article>
  `).join("");
}

function renderPipeline() {
  pipelineRows.innerHTML = sourceStatus.map((row) => `
    <div class="pipeline-row">
      <div>
        <strong>${row.source}</strong>
        <span>${row.rows} rows | refreshed ${row.freshness}</span>
      </div>
      <span class="status-pill ${row.status === "Partial" ? "model-pill" : ""}">${row.status}</span>
    </div>
  `).join("");

  deliverableList.innerHTML = deliverables.map((item) => `<li>${item}</li>`).join("");
}

function renderDashboard() {
  const { client, month } = activeData();
  renderKpis(month);
  renderWeeklyChart(month);
  renderSummary(client, month);
  renderChannels(month);
  renderRecommendations(month);
  renderPipeline();
}

clientSelect.addEventListener("change", () => {
  populateMonths();
  renderDashboard();
});

monthSelect.addEventListener("change", renderDashboard);

refreshButton.addEventListener("click", () => {
  refreshButton.textContent = "Refreshing...";
  setTimeout(() => {
    renderDashboard();
    refreshButton.textContent = "Refresh Report";
  }, 280);
});

populateControls();
renderDashboard();
