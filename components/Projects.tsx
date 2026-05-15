'use client';

import { motion } from 'framer-motion';

const PROJECTS = [
  {
    name: 'Real Estate Price Intelligence Engine',
    task: 'Regression · Feature Engineering · SHAP',
    status: 'Building',
    statusColor: '#f59e0b',
    description:
      'End-to-end ML pipeline: scraped 50k+ listings, trained XGBoost & LightGBM ensembles, served predictions via FastAPI with SHAP explainability. RMSE 8% below baseline.',
    metrics: [
      { label: 'R² Score',    value: '0.91' },
      { label: 'RMSE',        value: '$18k' },
      { label: 'Features',    value: '47' },
      { label: 'Training set', value: '42k rows' },
    ],
    stack: ['Python', 'XGBoost', 'FastAPI', 'SHAP', 'Scrapy', 'Docker'],
    accentColor: '#00d4ff',
    github: 'https://github.com/alisahi-dev',
  },
  {
    name: 'Research Copilot',
    task: 'RAG · NLP · LLM',
    status: 'Building',
    statusColor: '#f59e0b',
    description:
      'LLM-powered tool that ingests research papers (PDF/arXiv), chunks + embeds them, and answers questions with cited references. Built with LangChain, FAISS, and GPT-4o-mini.',
    metrics: [
      { label: 'Chunk size',   value: '512 tok' },
      { label: 'Retrieval k',  value: '5 docs' },
      { label: 'Embedding',    value: 'Ada-002' },
      { label: 'Latency',      value: '< 2s' },
    ],
    stack: ['Python', 'LangChain', 'FAISS', 'OpenAI', 'FastAPI', 'Next.js'],
    accentColor: '#a855f7',
    github: 'https://github.com/alisahi-dev',
  },
  {
    name: 'Canadian Tech Job Market Tracker',
    task: 'Analytics · NLP · Dashboard',
    status: 'Planned',
    statusColor: '#64748b',
    description:
      'Scraped & NLP-processed 10k+ Canadian tech job postings. Built live Recharts dashboard showing skill demand trends, salary distributions, and remote vs on-site ratios by city.',
    metrics: [
      { label: 'Listings',     value: '10k+' },
      { label: 'NLP model',    value: 'spaCy NER' },
      { label: 'Update freq',  value: 'daily' },
      { label: 'Skills tracked', value: '80+' },
    ],
    stack: ['Python', 'spaCy', 'Scrapy', 'PostgreSQL', 'Next.js', 'Recharts'],
    accentColor: '#10b981',
    github: 'https://github.com/alisahi-dev',
  },
  {
    name: 'quickml',
    task: 'AutoML · Python Package · PyPI',
    status: 'Planned',
    statusColor: '#64748b',
    description:
      'pip-installable AutoML library: auto-selects best model + hyperparams for tabular data. Supports classification & regression. Published to PyPI with docs and CI/CD via GitHub Actions.',
    metrics: [
      { label: 'Models tried',  value: '8' },
      { label: 'Tuning',        value: 'Optuna' },
      { label: 'Package size',  value: '< 5MB' },
      { label: 'API',           value: '3 lines' },
    ],
    stack: ['Python', 'scikit-learn', 'Optuna', 'Click', 'pytest', 'PyPI'],
    accentColor: '#f59e0b',
    github: 'https://github.com/alisahi-dev',
  },
];

const ACADEMIC_PROJECTS = [
  {
    name: 'ICU Length-of-Stay Prediction',
    task: 'Regression · Clinical ML · EHR Data',
    status: 'Shipped',
    statusColor: '#10b981',
    description:
      'Analysed 183 spinal cord injury patient records from MIMIC-IV. Built Linear Regression and Random Forest models to predict ICU stay duration. Conducted age-stratified analysis and ANOVA testing (p = 0.002) to identify key clinical drivers.',
    metrics: [
      { label: 'R² Score',  value: '0.29' },
      { label: 'MAE',       value: '3.21 days' },
      { label: 'Dataset',   value: 'MIMIC-IV' },
      { label: 'ANOVA p',   value: '0.002' },
    ],
    stack: ['Python', 'scikit-learn', 'Pandas', 'SciPy', 'Matplotlib'],
    accentColor: '#10b981',
    github: 'https://github.com/alisahi-dev',
  },
  {
    name: 'Spotify One-Hit Wonder Analysis',
    task: 'EDA · Data Fusion · Classification',
    status: 'Shipped',
    statusColor: '#10b981',
    description:
      'Investigated what separates viral one-hit wonders from artists with sustained chart longevity by fusing 4 datasets (327K+ Billboard Hot 100 records + Spotify audio features). Analysed danceability, energy, valence, and streaming metrics to classify artist success patterns.',
    metrics: [
      { label: 'Records',    value: '327K+' },
      { label: 'Datasets',   value: '4 fused' },
      { label: 'Features',   value: '12 audio' },
      { label: 'Source',     value: 'Billboard' },
    ],
    stack: ['Python', 'Pandas', 'Spotipy', 'Matplotlib', 'Seaborn'],
    accentColor: '#a855f7',
    github: 'https://github.com/alisahi-dev',
  },
  {
    name: 'Movie Recommendation System',
    task: 'Collaborative Filtering · RecSys',
    status: 'Shipped',
    statusColor: '#10b981',
    description:
      'Benchmarked three collaborative filtering algorithms (User-User KNN, Item-Item CF, SVD) on MovieLens 100K. Implemented cold-start handling, evaluated with RMSE/MAE, and visualised latent spaces via 2D projections.',
    metrics: [
      { label: 'Ratings',    value: '100K' },
      { label: 'Users',      value: '943' },
      { label: 'Algorithms', value: '3' },
      { label: 'Metric',     value: 'RMSE/MAE' },
    ],
    stack: ['Python', 'Surprise', 'scikit-learn', 'NumPy', 'Matplotlib'],
    accentColor: '#f59e0b',
    github: 'https://github.com/alisahi-dev',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-xs font-mono tracking-widest px-3 py-1 rounded-full border text-cyan-400 border-cyan-400/30 bg-cyan-400/05 mb-4 inline-block">
            🔬 PROJECTS
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mt-4">
            What I&apos;m building{' '}
            <span style={{ background: 'linear-gradient(135deg, #00d4ff, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              this summer
            </span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl">
            Each project is a real product, not a tutorial clone. Displayed as model cards
            — the same format used by ML teams to document deployed systems.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border overflow-hidden group transition-all duration-300 hover:scale-[1.01]"
              style={{
                background: 'rgba(13,13,26,0.7)',
                borderColor: p.accentColor + '20',
              }}
            >
              {/* Top bar */}
              <div className="h-1" style={{ background: `linear-gradient(90deg, ${p.accentColor}, ${p.accentColor}40)` }} />

              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ color: p.accentColor, background: p.accentColor + '15' }}>
                        {p.task}
                      </span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ color: p.statusColor, background: p.statusColor + '15' }}>
                        {p.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white leading-snug">{p.name}</h3>
                  </div>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-5">{p.description}</p>

                {/* Metrics grid */}
                <div className="grid grid-cols-4 gap-2 mb-5">
                  {p.metrics.map(m => (
                    <div key={m.label} className="bg-black/30 rounded-lg p-2.5 text-center border border-slate-800/50">
                      <div className="text-white font-mono font-bold text-sm">{m.value}</div>
                      <div className="text-slate-600 font-mono text-[10px] mt-0.5">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Stack + link */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {p.stack.map(s => (
                      <span key={s} className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800/60 text-slate-400">
                        {s}
                      </span>
                    ))}
                  </div>
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-slate-500 hover:text-cyan-400 transition-colors ml-3 shrink-0"
                  >
                    GitHub →
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Academic projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 mb-10"
        >
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-800" />
            <span className="text-xs font-mono text-slate-500 tracking-widest px-3">ACADEMIC WORK</span>
            <div className="h-px flex-1 bg-slate-800" />
          </div>
          <p className="text-slate-500 text-sm mt-4 font-mono">Shipped during BSc — real datasets, real results.</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {ACADEMIC_PROJECTS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border overflow-hidden transition-all duration-300 hover:scale-[1.01]"
              style={{ background: 'rgba(13,13,26,0.7)', borderColor: p.accentColor + '20' }}
            >
              <div className="h-1" style={{ background: `linear-gradient(90deg, ${p.accentColor}, ${p.accentColor}40)` }} />
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ color: p.accentColor, background: p.accentColor + '15' }}>
                    {p.task.split(' · ')[0]}
                  </span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ color: p.statusColor, background: p.statusColor + '15' }}>
                    {p.status}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white leading-snug mb-3">{p.name}</h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">{p.description}</p>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {p.metrics.map(m => (
                    <div key={m.label} className="bg-black/30 rounded-lg p-2 text-center border border-slate-800/50">
                      <div className="text-white font-mono font-bold text-xs">{m.value}</div>
                      <div className="text-slate-600 font-mono text-[10px] mt-0.5">{m.label}</div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {p.stack.map(s => (
                    <span key={s} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/60 text-slate-400">{s}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
