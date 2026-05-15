"use client";
import { useState } from "react";

const projects = [
  {
    id: "real-estate-ml",
    name: "real-estate-ml",
    status: "SHIPPING",
    statusColor: "text-t-orange",
    desc: "End-to-end ML pipeline: scraping → ensemble model → REST API with SHAP explanations",
    details: [
      "├── data/         # Scraped real estate listings",
      "├── pipeline/     # Airflow DAGs for ETL",
      "├── models/       # XGBoost + neural net ensemble",
      "├── api/          # FastAPI serving layer",
      "├── frontend/     # Streamlit dashboard",
      "└── infra/        # Docker + AWS deployment",
    ],
    stack: ["Python", "XGBoost", "FastAPI", "Docker", "AWS", "SHAP"],
    github: "https://github.com/alisahi-dev/real-estate-ml",
  },
  {
    id: "research-copilot",
    name: "research-copilot",
    status: "SHIPPING",
    statusColor: "text-t-orange",
    desc: "AI-powered paper analyzer — upload PDFs, chat with your research via RAG",
    details: [
      "├── ingestion/    # PDF parsing + chunking",
      "├── embeddings/   # Vector store (Pinecone)",
      "├── agents/       # LangChain RAG pipeline",
      "├── api/          # FastAPI + WebSocket",
      "├── frontend/     # React chat interface",
      "└── eval/         # Retrieval quality tests",
    ],
    stack: ["LangChain", "OpenAI", "Pinecone", "React", "FastAPI"],
    github: "https://github.com/alisahi-dev/research-copilot",
  },
  {
    id: "job-market-tracker",
    name: "job-tracker",
    status: "QUEUED",
    statusColor: "text-t-yellow",
    desc: "Live analytics dashboard tracking Canadian tech job market trends with NLP",
    details: [
      "├── scrapers/     # Daily job posting collection",
      "├── nlp/          # spaCy skill extraction",
      "├── db/           # PostgreSQL + migrations",
      "├── dashboard/    # Plotly/Streamlit viz",
      "├── scheduler/    # GitHub Actions cron",
      "└── analysis/     # Trend notebooks",
    ],
    stack: ["spaCy", "Plotly", "PostgreSQL", "GitHub Actions"],
    github: "https://github.com/alisahi-dev/job-market-tracker",
  },
  {
    id: "quickml",
    name: "quickml",
    status: "QUEUED",
    statusColor: "text-t-yellow",
    desc: "Opinionated AutoML package — one-line model comparison, auto EDA, SHAP out of the box",
    details: [
      "├── quickml/      # Core package",
      "│   ├── eda.py    # Auto exploratory analysis",
      "│   ├── models.py # Model comparison engine",
      "│   └── explain.py# SHAP integration",
      "├── tests/        # pytest suite",
      "├── docs/         # Sphinx documentation",
      "└── .github/      # CI/CD workflows",
    ],
    stack: ["scikit-learn", "PyPI", "pytest", "CI/CD", "Sphinx"],
    github: "https://github.com/alisahi-dev/quickml",
  },
];

export default function TerminalProjects() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-t-dim text-xs mb-1">visitor@alisahi.dev:~$ ls -la projects/</div>
        <h2 className="text-xl font-bold text-t-green glow-green mb-8">
          drwxr-xr-x  4 ali  staff  — PROJECTS
        </h2>

        <div className="space-y-4">
          {projects.map((p) => (
            <div
              key={p.id}
              className="bg-t-surface border border-t-border rounded-lg overflow-hidden hover:border-t-green/30 transition-all duration-300 cursor-pointer"
              onClick={() => setExpanded(expanded === p.id ? null : p.id)}
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-t-green">&#9656;</span>
                    <span className="text-white font-semibold">{p.name}/</span>
                    <span className={`text-xs px-2 py-0.5 rounded border ${
                      p.status === "SHIPPING"
                        ? "border-t-orange/30 text-t-orange"
                        : "border-t-yellow/30 text-t-yellow"
                    }`}>
                      {p.status}
                    </span>
                  </div>
                  <span className="text-t-dim text-xs">
                    {expanded === p.id ? "[-]" : "[+]"}
                  </span>
                </div>
                <p className="text-t-dim text-sm ml-6"># {p.desc}</p>
              </div>

              {expanded === p.id && (
                <div className="border-t border-t-border px-4 py-3 bg-t-bg/50">
                  <div className="text-xs text-t-blue mb-3 font-mono">
                    {p.details.map((line, i) => (
                      <div key={i} className="ml-2">{line}</div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 mt-3 flex-wrap">
                    {p.stack.map((s) => (
                      <span key={s} className="text-xs px-2 py-0.5 rounded bg-t-green/5 text-t-green border border-t-green/10">
                        {s}
                      </span>
                    ))}
                  </div>
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-xs text-t-dim hover:text-t-green transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    → git clone {p.github.replace("https://github.com/", "")}
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
