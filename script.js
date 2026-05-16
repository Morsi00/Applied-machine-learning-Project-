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

    overview: `خوارزمية Unsupervised Learning بتقسم الداتا إلى مجموعات (Clusters)
      بناءً على التشابه بين النقاط. تم تطبيق Scaling على البيانات ثم تجربة قيم 
      مختلفة لـ K من 2 إلى 10 باستخدام Elbow Method و Silhouette Score.`,

    algorithm: [
        "تحديد عدد العناقيد K",
        "اختيار Centroids بشكل عشوائي (k-means++)",
        "حساب المسافة بين كل نقطة والـ Centroids",
        "تحديث الـ Centroids بناءً على المتوسط",
        "التكرار حتى الاستقرار (max 300 iteration)"
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
        "الـ Elbow مش واضح جداً لكن Silhouette Score بيأكد إن K=2 هو الأمثل",
        "Davies-Bouldin = 1.09 → الـ clusters مقبولة التمييز لكن فيه overlap",
        "فرق الـ Churn 24.4% بين الـ clusters → الموديل قدر يميز بين شريحتين مختلفتين بوضوح",
        "الـ High Risk بيمثل الغالبية → محتاج استراتيجية retention فورية"
    ],

    images: [
        {
            url: "./images/elbow.png",
            title: "Elbow Method & Silhouette Score",
            description: "الـ Elbow مش حاد جداً لكن الـ Silhouette Score بيأكد K=2 كأفضل قيمة — بعد K=2 الـ Score بيقل بشكل مستمر من 0.33 لـ 0.13، يعني زيادة الـ clusters مش بتضيف قيمة حقيقية."
        },
        {
            url: "./images/pca.png",
            title: "K-Means vs Actual Churn — PCA 2D",
            description: "Cluster 1 (Low Risk) منفصل تماماً في الـ PCA space — ده بيأكد إن الموديل قدر يعزل شريحة العملاء المستقرين بوضوح. المقارنة مع الـ Actual Churn بتوضح إن معظم الـ churned customers موجودين في Cluster 0."
        }
    ]
},
    dbscan: {
        title: 'DBSCAN Clustering',

        overview: `
    خوارزمية تعتمد على الكثافة (Density-Based) لتجميع البيانات.
    قادرة على اكتشاف الـ Outliers (Noise) بدون تحديد عدد الـ Clusters مسبقًا.
  `,

        content: `
    قمنا بتجربة عدة قيم لـ eps لتحديد أفضل إعداد.
    أفضل نتيجة كانت عند eps = 3.5 حيث تحقق توازن بين عدد الكلاسترز ونسبة الـ Noise.
  `,

        algorithm: [
            "اختيار eps و min_samples",
            "تحديد النقاط الأساسية (Core Points)",
            "تجميع النقاط القريبة بناءً على الكثافة",
            "تحديد النقاط الشاذة (Noise)",
            "تكوين الـ Clusters النهائية"
        ],

        advantages: [
            "لا يحتاج تحديد عدد Clusters مسبقًا",
            "يكتشف الـ Outliers تلقائيًا",
            "فعال مع البيانات غير المنتظمة"
        ],

        disadvantages: [
            "حساس لاختيار eps",
            "أداء ضعيف مع البيانات عالية الأبعاد",
            "صعب التفسير أحيانًا"
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

        // 👇 أهم جزء (تحليل فعلي)
        insights: [
            "Cluster 1 هو الأكبر ويمثل أغلب العملاء",
            "Cluster 2 لديه أقل churn rate (أفضل عملاء)",
            "Cluster 0 متوسط الأداء",
            "Noise يمثل حالات شاذة تحتاج تحليل منفصل"
        ],

        clusters: [
            { name: "Noise / Outliers", count: 157, churn: "14%" },
            { name: "Cluster 0", count: 622, churn: "26.2%" },
            { name: "Cluster 1", count: 4733, churn: "33.2%" },
            { name: "Cluster 2", count: 1520, churn: "7.4%" }
        ],

        images: [
            "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
        ]
    },
   som: {
  title: 'Self-Organizing Map (SOM)',

  overview: `نموذج Neural Network بيحوّل البيانات عالية الأبعاد إلى خريطة ثنائية (2D Grid)
    مع الحفاظ على التشابه بين العملاء. تم تدريب SOM بحجم 10×10 Grid باستخدام
    U-Matrix و Hit Map و Churn Map لتحليل توزيع العملاء.`,

  algorithm: [
    "تهيئة شبكة ثنائية الأبعاد من Neurons",
    "تحديد أقرب Neuron لكل عميل (Winner)",
    "تحديث الأوزان بناءً على الجيران",
    "تكرار العملية حتى الاستقرار (10,000 iteration)",
    "تحليل الخريطة وتصنيف العملاء في segments"
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
    "Low Risk يمثل أكثر من نص العملاء (55.9%) → قاعدة مستقرة قوية",
    "High Risk رغم إنه 20.4% بس بـ churn 61.1% → أولوية قصوى للـ retention",
    "الـ U-Matrix بيكشف إن فيه حدود واضحة بين الـ clusters في الـ grid",
    "Cells (8,2) و(9,1) الأعلى خطورة → churn فوق 72% مع أكثر من 100 عميل في كل cell",
    "92 من 100 cell مستخدمة → الـ SOM غطى البيانات بشكل ممتاز"
  ],

  images: [
    {
      url: "./images/som_pca.png",
      title: "SOM Customer Segmentation — PCA 2D & Segment Distribution",
      description: "الـ PCA بيوضح إن الـ Low Risk (أخضر) منفصل تماماً في الـ space — خصوصاً الـ cluster اليميني المنعزل. الـ High Risk (أحمر) والـ Medium Risk (أصفر) متداخلين في المنطقة اليسارية، وده منطقي لأن الفرق بينهم تدريجي مش حاد."
    },
    {
      url: "./images/som_grid.png",
      title: "Self-Organizing Map — 10×10 Grid Analysis",
      description: "الـ U-Matrix بيوضح الحدود بين الـ clusters (المناطق الداكنة). الـ Hit Map بيأكد إن التوزيع متوازن — أكتر cell فيها 164 عميل. الـ Churn Map بيكشف إن الـ cells في الركن الأيسر السفلي الأعلى خطورة بـ churn يوصل لـ 75%."
    }
  ]
},
autoencoder: {
  title: 'Autoencoder — Anomaly Detection & Clustering',

  overview: `نموذج Deep Learning بيتعلم يضغط 30 feature في 8 بس (Bottleneck)
    ثم يعيد بناءها. العملاء اللي الموديل بيفشل في إعادة بنائهم بدقة → Anomalies.
    بعد كده استخدمنا الـ Embeddings في KMeans Clustering لتقسيم العملاء.`,

  algorithm: [
    "ضغط الـ 30 feature في Bottleneck بحجم 8",
    "إعادة البناء (Reconstruction) والمقارنة بالأصل",
    "حساب Reconstruction Error لكل عميل",
    "تحديد Threshold (p95 = 0.306) لتصنيف الـ Anomalies",
    "تطبيق KMeans على الـ Embeddings (Best K=2)"
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
    "الـ Anomalies مش عملاء خطرين — هم Premium Customers بـ tenure أعلى وإنفاق أعلى وchurn أقل",
    "الـ Threshold الأمثل للبيزنس هو p90 → يغطي 704 عميل بـ churn 17.3% وأكثر قابلية للتنفيذ",
    "Cluster 1 يمثل 66.9% من العملاء بـ churn 32.5% → أولوية قصوى للـ retention",
    "Cluster 0 عملاء مستقرين بـ churn 14.6% → يحتاج maintenance مش تدخل عاجل",
    "الـ Loss انخفض من 0.97 لـ 0.22 بسلاسة → الموديل تعلم الـ patterns بشكل صح"
  ],

  images: [
    {
      url: "./images/ae_loss.png",
      title: "Autoencoder — Training Loss",
      description: "الـ Loss بدأ من 0.97 وانخفض بسلاسة لـ 0.22 خلال 100 epoch — مفيش overfitting أو instability، ده بيأكد إن الموديل تعلم الـ patterns الأساسية في البيانات صح."
    },
    {
      url: "./images/ae_reconstruction_dist.png",
      title: "Reconstruction Error Distribution",
      description: "الـ Churned customers (أحمر) عندهم Reconstruction Error أعلى بشكل عام — بس الـ overlap كبير. الـ Threshold عند 0.306 بيمسك الـ 5% الأعلى error وهم الـ Premium Customers."
    },
    {
      url: "./images/ae_anomaly_pca.png",
      title: "Anomalies in PCA 2D Space",
      description: "الـ Anomalies (أحمر) متمركزة في منطقة معينة من الـ PCA space — مش موزعة عشوائياً. ده بيأكد إن الموديل اكتشف شريحة متميزة فعلاً مش مجرد noise."
    },
    {
      url: "./images/ae_error_customers.png",
      title: "Reconstruction Error — per Customer",
      description: "الـ Error منخفض جداً لمعظم العملاء ثم يقفز فجأة في آخر 5% — الخط المتقطع عند 0.306 بيوضح إن الـ anomalies واضحة ومنفصلة عن الباقي."
    },
    {
      url: "./images/ae_embeddings_kmeans.png",
      title: "AE Embeddings — KMeans K=2",
      description: "الـ Cluster 0 (أزرق) و Cluster 1 (أحمر) منفصلين بوضوح في الـ Embedding space — ده أقوى من الـ raw features لأن الـ Autoencoder عمل تمثيل أذكى للبيانات."
    },
    {
      url: "./images/ae_anomaly_ae_space.png",
      title: "Anomalies on AE Space (p95)",
      description: "الـ Anomalies في الـ AE space موزعة أكثر من PCA — ده طبيعي لأن الـ Reconstruction Error بيتحسب في الـ original space مش في الـ embedding space."
    },
    {
      url: "./images/ae_churn_per_cluster.png",
      title: "Churn Rate per AE Cluster",
      description: "الفرق واضح — Cluster 1 بـ churn 32.5% مقابل Cluster 0 بـ 14.6%. فرق 17.9% بيأكد إن الـ Autoencoder Embeddings قدرت تميز بين شريحتين مختلفتين بشكل فعلي."
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

  // Content (للموديلات التانية اللي عندها content)
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

  // Results (للموديلات التانية اللي معندهاش summary)
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

  // ✅ الصور في الآخر — كل صورة مع عنوانها ووصفها
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
      // الموديلات التانية اللي لسه بتستخدم string URLs
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
