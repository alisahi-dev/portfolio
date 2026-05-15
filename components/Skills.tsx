'use client';

import { motion } from 'framer-motion';

const CATEGORIES = [
  {
    label: 'ML & Data Science',
    color: '#00d4ff',
    skills: [
      { name: 'Python',       level: 92 },
      { name: 'scikit-learn', level: 85 },
      { name: 'PyTorch',      level: 72 },
      { name: 'XGBoost',      level: 80 },
      { name: 'Pandas / NumPy', level: 90 },
      { name: 'SQL',          level: 82 },
    ],
  },
  {
    label: 'AI & LLMs',
    color: '#a855f7',
    skills: [
      { name: 'LangChain',   level: 70 },
      { name: 'OpenAI API',  level: 78 },
      { name: 'RAG Systems', level: 65 },
      { name: 'Embeddings',  level: 68 },
      { name: 'Prompt Eng.', level: 80 },
      { name: 'FAISS',       level: 60 },
    ],
  },
  {
    label: 'Engineering',
    color: '#10b981',
    skills: [
      { name: 'FastAPI',     level: 75 },
      { name: 'Docker',      level: 65 },
      { name: 'Next.js',     level: 70 },
      { name: 'Git / GitHub', level: 88 },
      { name: 'PostgreSQL',  level: 72 },
      { name: 'AWS',         level: 55 },
    ],
  },
];

function SkillBar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  return (
    <div>
      <div className="flex justify-between text-xs font-mono mb-1.5">
        <span className="text-slate-300">{name}</span>
        <span style={{ color }} className="tabular-nums">{level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}60)` }}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-xs font-mono tracking-widest px-3 py-1 rounded-full border text-cyan-400 border-cyan-400/30 inline-block mb-4">
            ⚙ STACK
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            Tools of the{' '}
            <span style={{ background: 'linear-gradient(135deg, #10b981, #00d4ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              trade
            </span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl">
            Levels based on honest self-assessment, not confidence bias.
            By the end of this summer every bar moves right.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, ci) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: ci * 0.15 }}
              className="rounded-2xl border p-6"
              style={{ background: 'rgba(13,13,26,0.7)', borderColor: cat.color + '20' }}
            >
              {/* Category header */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full" style={{ background: cat.color, boxShadow: `0 0 8px ${cat.color}` }} />
                <span className="text-sm font-bold text-white">{cat.label}</span>
              </div>

              {/* Skill bars */}
              <div className="space-y-4">
                {cat.skills.map((s, si) => (
                  <SkillBar
                    key={s.name}
                    name={s.name}
                    level={s.level}
                    color={cat.color}
                    delay={ci * 0.1 + si * 0.06}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Learning now chips */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <span className="text-xs font-mono text-slate-500">learning now →</span>
          {['AWS Cloud Practitioner', 'MLflow', 'Kubernetes', 'Rust'].map(s => (
            <span key={s} className="text-xs font-mono px-3 py-1 rounded-full border border-dashed border-slate-700 text-slate-500">
              {s}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
