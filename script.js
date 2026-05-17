// ===== Navigation ===== 
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();

        // Remove active class from all items
        document.querySelectorAll('.nav-item').forEach(nav => {
            nav.classList.remove('active');
        });

        // Add active class to clicked item
        item.classList.add('active');

        // Get section ID
        const sectionId = item.getAttribute('data-section');

        // Hide all sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });

        // Show selected section
        document.getElementById(sectionId).classList.add('active');

        // Scroll to top
        document.querySelector('.content-wrapper').scrollTop = 0;
    });
});

// ===== Model Details Data =====
const modelDetails = {
kmeans: {
    title: 'K-Means Clustering',

    overview: `An Unsupervised Learning algorithm that segments data into clusters
      based on similarity. The data was scaled, and different values of K (2–10)
      were tested using the Elbow Method and Silhouette Score.`,

    algorithm: [
        "Select the number of clusters (K)",
        "Initialize centroids randomly (k-means++)",
        "Compute distance between each point and centroids",
        "Update centroids based on mean values",
        "Repeat until convergence (max 300 iterations)"
    ],

    parameters: {
        "Best K": "2",
        "Init Method": "k-means++",
        "Max Iterations": "300"
    },

    summary: {
        totalCustomers: 7032,
        silhouette: 0.2174,
        daviesBouldin: 1.0925,
        churnDiff: "24.4%",
        clusters: [
            { id: 0, label: "High Risk", count: 5512, pct: 78.4, churn: 31.9, color: "#ef4444" },
            { id: 1, label: "Low Risk",  count: 1520, pct: 21.6, churn: 7.4,  color: "#10b981" }
        ]
    },

    insights: [
        "The Elbow curve is not very clear, but the Silhouette Score confirms that K=2 is optimal",
        "Davies-Bouldin = 1.09 → clusters are reasonably separated but still have some overlap",
        "Churn difference of 24.4% between clusters → the model successfully distinguishes two segments",
        "High Risk cluster represents the majority → requires immediate retention strategy"
    ],

    images: [
        {
            url: "./images/elbow.png",
            title: "Elbow Method & Silhouette Score",
            description: "The elbow is not sharp, but the Silhouette Score clearly indicates K=2 as optimal — after K=2 the score decreases steadily from 0.33 to 0.13, meaning additional clusters do not add value."
        },
        {
            url: "./images/pca.png",
            title: "K-Means vs Actual Churn — PCA 2D",
            description: "Cluster 1 (Low Risk) is clearly separated in PCA space — confirming the model successfully isolated stable customers. Most churned customers belong to Cluster 0."
        }
    ]
},

dbscan: {
    title: 'DBSCAN Clustering',

    overview: `
    A density-based clustering algorithm that groups data based on density.
    It can detect outliers (noise) without predefining the number of clusters.
  `,

    content: `
    Multiple eps values were tested to find the optimal configuration.
    The best result was achieved at eps = 3.5, balancing cluster count and noise ratio.
  `,

    algorithm: [
        "Select eps and min_samples",
        "Identify core points",
        "Group nearby points based on density",
        "Detect noise (outliers)",
        "Form final clusters"
    ],

    advantages: [
        "No need to predefine number of clusters",
        "Automatically detects outliers",
        "Effective with irregular data shapes"
    ],

    disadvantages: [
        "Sensitive to eps selection",
        "Weak performance in high-dimensional data",
        "Can be difficult to interpret"
    ],

    parameters: {
        "Epsilon (eps)": "3.5",
        "Min Samples": "5"
    },

    results: {
        "Number of Clusters": "3",
        "Noise Points": "157 (2.2%)",
        "Silhouette Score": "0.2939"
    },

    insights: [
        "Cluster 1 is the largest and represents the majority of customers",
        "Cluster 2 has the lowest churn rate (best customers)",
        "Cluster 0 shows متوسط performance",
        "Noise represents outliers that require separate analysis"
    ],

    clusters: [
        { name: "Noise / Outliers", count: 157, churn: "14%" },
        { name: "Cluster 0", count: 622, churn: "26.2%" },
        { name: "Cluster 1", count: 4733, churn: "33.2%" },
        { name: "Cluster 2", count: 1520, churn: "7.4%" }
    ],

    images: [
{
    "url": "./images/k_distance_plot_elbow.png",
    "title": "K-Distance Plot (k=5)",
    "description": "The sorted 5-nearest neighbor distances show a clear elbow or threshold change. The suggested eps is set at 3.5, effectively separating core dense points from sparse, high-distance noise points."
},
{
    "url": "./images/dbscan_grid_search.png",
    "title": "DBSCAN — Grid Search Results",
    "description": "As eps increases, the number of clusters drastically drops and stabilizes, while the noise percentage falls well below the 20% threshold. At the suggested eps = 3.5, the model reaches a steady state with a minimal, controlled amount of noise."
},
{
    "url": "./images/silhouette_eps.png",
    "title": "Silhouette Score vs eps — Fine-Grained Search",
    "description": "The Silhouette Score peaks near eps = 3.6. The suggested eps is set to 3.50, achieving a high score of 0.2939, which indicates an optimal balance between cluster cohesion and separation."
},

{
    "url": "./images/dbscan_final_clusters.png",
    "title": "DBSCAN Clusters & Outlier Detection (eps=3.5)",
    "description": "The final DBSCAN model identifies 3 distinct clusters projected onto PCA space, with Cluster 2 (green) completely isolated on the right. The accompanying plot highlights 157 detected outliers (red points) primarily concentrated in the overlapping region of the main dense structures."
}

    ]
},

som: {
    title: 'Self-Organizing Map (SOM)',

    overview: `A Neural Network model that maps high-dimensional data into a 2D grid
    while preserving similarity between customers. A 10×10 grid was trained using
    U-Matrix, Hit Map, and Churn Map for segmentation analysis.`,

    algorithm: [
        "Initialize a 2D grid of neurons",
        "Find the Best Matching Unit (BMU) for each customer",
        "Update weights based on neighbors",
        "Repeat until convergence (10,000 iterations)",
        "Analyze the map and define customer segments"
    ],

    parameters: {
        "Grid Size": "10 × 10",
        "Sigma": "1.5",
        "Learning Rate": "0.5",
        "Iterations": "10,000"
    },

    summary: {
        kpis: [
            { label: "Quantization Error", value: "2.93" },
            { label: "Cells Used", value: "92 / 100" },
            { label: "Max Customers/Cell", value: "164" },
            { label: "Avg Churn Overall", value: "26.6%" }
        ],
        segments: [
            { label: "High Risk",   count: 1434, pct: 20.4, churn: 61.1, color: "#ef4444" },
            { label: "Medium Risk", count: 1665, pct: 23.7, churn: 36.8, color: "#f59e0b" },
            { label: "Low Risk",    count: 3933, pct: 55.9, churn: 9.7,  color: "#10b981" }
        ],
        topCells: [
            { cell: "(8,2)", customers: 102, churn: "74.5%" },
            { cell: "(9,1)", customers: 103, churn: "72.8%" },
            { cell: "(9,3)", customers: 104, churn: "72.1%" },
            { cell: "(0,6)", customers: 22,  churn: "9.1%"  },
            { cell: "(3,9)", customers: 68,  churn: "8.8%"  }
        ]
    },

    insights: [
        "Low Risk represents more than half of customers (55.9%) → strong stable base",
        "High Risk is only 20.4% but with 61.1% churn → top retention priority",
        "U-Matrix reveals clear boundaries between clusters",
        "Cells (8,2) and (9,1) are highest risk → churn above 72% with 100+ customers each",
        "92 out of 100 cells are utilized → excellent data coverage"
    ],

    images: [
        {
            url: "./images/som_pca.png",
            title: "SOM Customer Segmentation — PCA 2D & Segment Distribution",
            description: "Low Risk (green) is clearly separated in PCA space, especially on the right. High Risk (red) and Medium Risk (yellow) overlap on the left, indicating gradual differences."
        },
        {
            url: "./images/som_grid.png",
            title: "Self-Organizing Map — 10×10 Grid Analysis",
            description: "U-Matrix shows cluster boundaries. Hit Map confirms balanced distribution. Churn Map highlights high-risk zones reaching 75% churn."
        },
        {
            url: "./images/som_qe_te.png",
            title: "Quantization Error & Topographic Error",
            description: "Quantization Error = 2.93 indicates acceptable mapping. Topographic Error = 0.2244 means 22.4% distortion — acceptable for 10×10 grid."
        }
    ]
},

autoencoder: {
    title: 'Autoencoder — Anomaly Detection & Clustering',

    overview: `A Deep Learning model that compresses 30 features into 8 (bottleneck)
    and reconstructs them. Customers with high reconstruction error are anomalies.
    Embeddings were then clustered using KMeans (K=2).`,

    algorithm: [
        "Compress 30 features into bottleneck (size 8)",
        "Reconstruct and compare with original",
        "Compute reconstruction error per customer",
        "Define anomaly threshold (p95 = 0.306)",
        "Apply KMeans on embeddings (Best K=2)"
    ],

    parameters: {
        "Architecture": "30 → 16 → 8 → 16 → 30",
        "Bottleneck Size": "8",
        "Epochs": "100",
        "Threshold (p95)": "0.306"
    },

    summary: {
        training: {
            lossStart: "0.97",
            lossFinal: "0.22"
        },
        anomaly: {
            threshold: "0.306 (p95)",
            rows: [
                { label: "Normal",  count: 6680, pct: "95%", churn: "27.3%", tenure: "32 mo", monthly: "$64", total: "$2,241" },
                { label: "Anomaly", count: 352,  pct: "5%",  churn: "13.6%", tenure: "38 mo", monthly: "$79", total: "$3,088" }
            ],
            thresholds: [
                { name: "p90", value: "0.270", count: "704 (10%)",  churn: "17.3%" },
                { name: "p92", value: "0.284", count: "563 (8%)",   churn: "16.9%" },
                { name: "p95", value: "0.306", count: "352 (5%)",   churn: "13.6%" },
                { name: "p97", value: "0.330", count: "211 (3%)",   churn: "14.7%" },
                { name: "p99", value: "0.371", count: "71 (1%)",    churn: "11.3%" }
            ]
        },
        clusters: [
            { label: "Cluster 0 — Low Risk",  count: 2329, pct: 33.1, churn: 14.6, color: "#6366f1" },
            { label: "Cluster 1 — High Risk", count: 4703, pct: 66.9, churn: 32.5, color: "#ef4444" }
        ]
    },

    insights: [
        "Anomalies are not risky customers — they are premium customers with higher tenure and spending",
        "Best business threshold is p90 → covers 704 customers with 17.3% churn and better actionability",
        "Cluster 1 represents 66.9% with 32.5% churn → highest priority for retention",
        "Cluster 0 is stable with 14.6% churn → requires maintenance, not urgent action",
        "Loss decreased smoothly from 0.97 to 0.22 → model learned patterns effectively"
    ],

    images: [
        {
            url: "./images/ae_loss.png",
            title: "Autoencoder — Training Loss",
            description: "Loss decreased smoothly from 0.97 to 0.22 across 100 epochs — no overfitting, stable learning."
        },
        {
            url: "./images/ae_reconstruction_dist.png",
            title: "Reconstruction Error Distribution",
            description: "Churned customers tend to have higher error, but overlap exists. Threshold at 0.306 captures top 5% anomalies."
        },
        {
            url: "./images/ae_anomaly_pca.png",
            title: "Anomalies in PCA 2D Space",
            description: "Anomalies are clustered in a specific region — confirming they represent a real segment, not noise."
        },
        {
            url: "./images/ae_error_customers.png",
            title: "Reconstruction Error — per Customer",
            description: "Error is low for most customers, then spikes sharply in top 5% — anomalies are clearly separable."
        },
        {
            url: "./images/ae_embeddings_kmeans.png",
            title: "AE Embeddings — KMeans K=2",
            description: "Clusters are clearly separated in embedding space — better than raw features."
        },
        {
            url: "./images/ae_anomaly_ae_space.png",
            title: "Anomalies on AE Space (p95)",
            description: "Anomalies are more spread in AE space — expected since error is computed in original space."
        },
        {
            url: "./images/ae_churn_per_cluster.png",
            title: "Churn Rate per AE Cluster",
            description: "Clear difference: 32.5% vs 14.6% — confirms strong segmentation."
        }
    ]
}
};

// ===== Model Cards Click Handler =====
document.querySelectorAll('.model-card').forEach(card => {
    card.addEventListener('click', () => {
        const modelId = card.getAttribute('data-model');
        const model = modelDetails[modelId];

        if (model) {
            showModelDetails(model);
        }
    });
});

// ===== Show Model Details Function =====
function showModelDetails(model) {
  const modal = document.getElementById('modelModal');
  const detailsDiv = document.getElementById('modelDetails');

  let html = `
    <div class="modal-overlay">
      <div class="modal-card">
        <div class="modal-header">
          <h2>${model.title}</h2>
          <button class="close-btn">&times;</button>
        </div>
  `;

  // Overview
  if (model.overview) {
    html += `
      <div class="section">
        <h3>📌 Overview</h3>
        <p>${model.overview}</p>
      </div>
    `;
  }

  // Content (للموديلات التانية اللي عندا content)
  if (model.content) {
    html += `
      <div class="section">
        <h3>🧠 Explanation</h3>
        <p>${model.content}</p>
      </div>
    `;
  }

  // Algorithm
  if (model.algorithm) {
    html += `
      <div class="section">
        <h3>⚙️ Algorithm Steps</h3>
        <ul>${model.algorithm.map(s => `<li>${s}</li>`).join('')}</ul>
      </div>
    `;
  }

  // Parameters فقط (مش Results علشان موجودة في Summary)
  if (model.parameters) {
    html += `
      <div class="section">
        <h3>📊 Parameters</h3>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
          ${Object.entries(model.parameters).map(([k,v]) => `
            <div class="box"><b>${k}:</b> ${v}</div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Results (للموديلات التانية اللي معنداش summary)
  if (model.results && !model.summary) {
    html += `
      <div class="section">
        <h3>📈 Results</h3>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
          ${Object.entries(model.results).map(([k,v]) => `
            <div class="box"><b>${k}:</b> ${v}</div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // Summary (بيجمع النتائج والـ clusters في مكان واحد)
 if (model.summary) {
  const s = model.summary;

  html += `<div class="section"><h3>📋 Results & Summary</h3>`;

  // ✅ KPIs (للـ SOM)
  if (s.kpis) {
    html += `
      <div style="display:grid; grid-template-columns:repeat(2,1fr); gap:10px; margin-bottom:16px;">
        ${s.kpis.map(k => `
          <div class="box" style="text-align:center;">
            <div style="font-size:11px; color:var(--text-secondary); margin-bottom:4px;">${k.label}</div>
            <div style="font-size:20px; font-weight:700; color:var(--primary-color);">${k.value}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // ✅ KPIs (للـ KMeans — 3 قيم ثابتة)
  if (s.totalCustomers !== undefined) {
    html += `
      <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:10px; margin-bottom:16px;">
        <div class="box" style="text-align:center;">
          <div style="font-size:11px; color:var(--text-secondary); margin-bottom:4px;">Total Customers</div>
          <div style="font-size:22px; font-weight:700; color:var(--primary-color);">${s.totalCustomers.toLocaleString()}</div>
        </div>
        <div class="box" style="text-align:center;">
          <div style="font-size:11px; color:var(--text-secondary); margin-bottom:4px;">Silhouette Score</div>
          <div style="font-size:22px; font-weight:700; color:var(--primary-color);">${s.silhouette}</div>
        </div>
        <div class="box" style="text-align:center;">
          <div style="font-size:11px; color:var(--text-secondary); margin-bottom:4px;">Davies-Bouldin ↓</div>
          <div style="font-size:22px; font-weight:700; color:var(--primary-color);">${s.daviesBouldin}</div>
        </div>
      </div>
    `;
  }

  // ✅ Segments / Clusters progress bars
  const items = s.segments || s.clusters || [];
  if (items.length > 0) {
    html += `<div style="display:flex; flex-direction:column; gap:12px;">`;
    items.forEach((c, i) => {
      const label = c.label || c.id !== undefined ? (c.label || `Cluster ${c.id}`) : c.label;
      const color = c.color || "#6366f1";
      html += `
        <div style="
          background:var(--surface-light);
          border:1px solid ${color}44;
          border-left:4px solid ${color};
          border-radius:12px;
          padding:14px 16px;
        ">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <span style="
              background:${color}22; color:${color};
              padding:3px 10px; border-radius:20px;
              font-size:12px; font-weight:700;
              border:1px solid ${color}66;
            ">${c.label || `Cluster ${c.id}`}</span>
            <span style="color:var(--text-secondary); font-size:13px;">${c.count.toLocaleString()} customers</span>
          </div>

          <div style="margin-bottom:8px;">
            <div style="display:flex; justify-content:space-between; font-size:11px; color:var(--text-secondary); margin-bottom:4px;">
              <span>Distribution</span>
              <span style="color:${color}; font-weight:600;">${c.pct}%</span>
            </div>
            <div style="background:var(--background); border-radius:6px; height:8px; overflow:hidden;">
              <div style="width:${c.pct}%; height:100%; background:linear-gradient(90deg,${color},${color}88); border-radius:6px;"></div>
            </div>
          </div>

          <div>
            <div style="display:flex; justify-content:space-between; font-size:11px; color:var(--text-secondary); margin-bottom:4px;">
              <span>Churn Rate</span>
              <span style="color:${color}; font-weight:600;">${c.churn}%</span>
            </div>
            <div style="background:var(--background); border-radius:6px; height:8px; overflow:hidden;">
              <div style="width:${c.churn}%; height:100%; background:linear-gradient(90deg,${color},${color}66); border-radius:6px;"></div>
            </div>
          </div>
        </div>
      `;
    });
    html += `</div>`;
  }

  // ✅ Churn Diff (للـ KMeans بس)
  if (s.churnDiff) {
    html += `
      <div style="
        margin-top:14px; padding:10px 16px;
        background:rgba(99,102,241,0.1);
        border:1px solid var(--primary-color);
        border-radius:10px;
        display:flex; justify-content:space-between; align-items:center;
      ">
        <span style="color:var(--text-secondary); font-size:13px;">Churn Rate Difference between clusters</span>
        <span style="color:var(--primary-color); font-weight:700; font-size:18px;">${s.churnDiff}</span>
      </div>
    `;
  }

  // ✅ Top High-Churn Cells (للـ SOM بس)
  if (s.topCells) {
    html += `
      <div style="margin-top:16px;">
        <div style="font-size:13px; font-weight:600; color:var(--accent-color); margin-bottom:10px;">
          🔥 Top High-Churn Cells (min 20 customers)
        </div>
        <table class="table">
          <thead>
            <tr>
              <th>Cell</th>
              <th>Customers</th>
              <th>Churn Rate</th>
            </tr>
          </thead>
          <tbody>
            ${s.topCells.map(c => `
              <tr>
                <td style="font-family:monospace; color:var(--primary-color);">${c.cell}</td>
                <td>${c.customers}</td>
                <td style="color:var(--accent-color); font-weight:600;">${c.churn}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  html += `</div>`;
}

  // Insights (تحليل بس، مش أرقام)
  if (model.insights) {
    html += `
      <div class="section">
        <h3>💡 Key Insights</h3>
        <ul>${model.insights.map(i => `<li>${i}</li>`).join('')}</ul>
      </div>
    `;
  }

  // Segments (للموديلات التانية)
  if (model.segments) {
    html += `
      <div class="section">
        <h3>🧩 Customer Segments</h3>
        <table class="table">
          <thead><tr><th>Segment</th><th>Customers</th><th>Pct</th><th>Churn Rate</th></tr></thead>
          <tbody>${model.segments.map(s => `
            <tr><td>${s.name}</td><td>${s.count}</td><td>${s.pct}</td><td>${s.churn}</td></tr>
          `).join('')}</tbody>
        </table>
      </div>
    `;
  }

  // Clusters table (للموديلات التانية)
  if (model.clusters) {
    html += `
      <div class="section">
        <h3>📊 Cluster Analysis</h3>
        <table class="table">
          <thead><tr><th>Cluster</th><th>Count</th><th>Churn Rate</th></tr></thead>
          <tbody>${model.clusters.map(c => `
            <tr><td>${c.name}</td><td>${c.count}</td><td>${c.churn}</td></tr>
          `).join('')}</tbody>
        </table>
      </div>
    `;
  }

  // ✅ الصور في الآخر — كل صورة مع عنوانا ووصفا
  if (model.images?.length > 0) {
    const isObjectImages = typeof model.images[0] === 'object';

    if (isObjectImages) {
      html += `<div style="display:flex; flex-direction:column; gap:20px; margin-top:8px;">`;
      model.images.forEach(img => {
        html += `
          <div style="
            border:1px solid var(--border-color);
            border-radius:14px;
            overflow:hidden;
            background:var(--surface-light);
          ">
            <div style="padding:12px 16px; border-bottom:1px solid var(--border-color);">
              <span style="font-size:14px; font-weight:600; color:var(--primary-color);">📊 ${img.title}</span>
            </div>
            <img
              src="${img.url}"
              alt="${img.title}"
              style="width:100%; display:block; cursor:zoom-in;"
              onclick="openImgOverlay('${img.url}')"
            />
            <div style="padding:12px 16px; border-top:1px solid var(--border-color);">
              <p style="color:var(--text-secondary); font-size:13px; line-height:1.7; margin:0;">
                ${img.description}
              </p>
            </div>
          </div>
        `;
      });
      html += `</div>`;

    } else {
      // الموديلات التانية اللي لس بتستخدم string URLs
      html += `
        <div class="image-slider">
          ${model.images.map(img => `<img src="${img}" />`).join('')}
        </div>
      `;
    }
  }

  html += `</div></div>`;

  detailsDiv.innerHTML = html;
  modal.classList.add('active');

  document.querySelector('.close-btn').onclick = () => modal.classList.remove('active');
  modal.onclick = (e) => {
    if (e.target.classList.contains('modal-overlay')) modal.classList.remove('active');
  };
}

// ✅ Image Zoom Overlay
function openImgOverlay(src) {
  const overlay = document.createElement('div');
  overlay.className = 'img-overlay';
  overlay.innerHTML = `
    <div class="img-modal">
      <span class="img-close">&times;</span>
      <img src="${src}" class="img-full" />
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.querySelector('.img-close').onclick = () => overlay.remove();
  overlay.onclick = (e) => {
    if (e.target.classList.contains('img-overlay')) overlay.remove();
  };
}

// ✅ Image overlay function
function openImgOverlay(src) {
  const overlay = document.createElement('div');
  overlay.className = 'img-overlay';
  overlay.innerHTML = `
    <div class="img-modal">
      <span class="img-close">&times;</span>
      <img src="${src}" class="img-full" />
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.querySelector('.img-close').onclick = () => overlay.remove();
  overlay.onclick = (e) => { if (e.target.classList.contains('img-overlay')) overlay.remove(); };
}





// ===== Smooth Scroll Animation =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== Add Animation on Scroll =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.overview-card, .category-card, .issue-card, .model-card, .team-card').forEach(card => {
    observer.observe(card);
});

// ===== Add Hover Effects to Buttons =====
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-3px)';
    });

    btn.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
    });
});

// ===== Keyboard Navigation =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('modelModal');
        if (modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    }
});

// ===== Add Active State to Nav Items on Page Load =====
document.addEventListener('DOMContentLoaded', () => {
    // Set first nav item as active
    const firstNavItem = document.querySelector('.nav-item');
    if (firstNavItem) {
        firstNavItem.classList.add('active');
    }

    // Show first section
    const firstSection = document.querySelector('.content-section');
    if (firstSection) {
        firstSection.classList.add('active');
    }
});

// ===== Add Loading Animation =====
function addLoadingAnimation() {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';

        setTimeout(() => {
            section.style.transition = 'all 0.5s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 50);
    });
}

// ===== Responsive Sidebar Toggle (Optional) =====
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active');
}

// ===== Add Copy to Clipboard for Code Blocks =====
document.querySelectorAll('pre').forEach(pre => {
    const code = pre.querySelector('code');
    if (code) {
        const button = document.createElement('button');
        button.textContent = 'نسخ';
        button.className = 'btn btn-primary';
        button.style.position = 'absolute';
        button.style.top = '10px';
        button.style.right = '10px';
        button.style.padding = '0.5rem 1rem';
        button.style.fontSize = '0.875rem';

        pre.style.position = 'relative';
        pre.appendChild(button);

        button.addEventListener('click', () => {
            navigator.clipboard.writeText(code.textContent);
            button.textContent = 'تم النسخ!';
            setTimeout(() => {
                button.textContent = 'نسخ';
            }, 2000);
        });
    }
});

// ===== Add Print Functionality =====
window.printDashboard = function () {
    window.print();
};

// ===== Add Export to PDF (Optional) =====
window.exportToPDF = function () {
    alert('يمكنك استخدام Ctrl+P لطباعة الصفحة كـ PDF');
};

// ===== Performance Optimization =====
// Lazy load images if needed
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== Add Dark Mode Toggle (Optional) =====
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

console.log('Dashboard loaded successfully!');
