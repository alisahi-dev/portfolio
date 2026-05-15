'use client';

import { motion } from 'framer-motion';

const FACTS = [
  { icon: '🎓', label: 'BSc (Hons) Data Science', sub: 'York University · Graduating 2027' },
  { icon: '📍', label: 'Toronto, Canada',          sub: 'Open to remote & hybrid' },
  { icon: '⚗', label: '4 projects this summer',   sub: 'ML · AI · Full-stack' },
  { icon: '🏆', label: 'AWS cert in progress',     sub: 'Cloud Practitioner' },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-mono tracking-widest px-3 py-1 rounded-full border text-cyan-400 border-cyan-400/30 inline-block mb-6">
              👤 ABOUT
            </span>
            <h2 className="text-4xl font-bold text-white mb-6">
              Hi, I&apos;m Ali.
            </h2>
            <div className="space-y-4 text-slate-400 leading-relaxed">
              <p>
                I&apos;m a 4th year Data Science student at York University who got tired of watching
                everyone else ship products and decided to do it myself. This summer I&apos;m building
                four real ML/AI products from scratch — not tutorial clones, actual things people
                can use.
              </p>
              <p>
                My interest is in the full journey: getting messy real-world data, turning it into
                a model that actually works, and then shipping it in a way that non-technical people
                can interact with. I want to be the kind of data scientist who can do the whole stack.
              </p>
              <p>
                By September I&apos;ll have shipped a real estate price engine, an LLM-powered research
                tool, a live job market tracker, and a pip-installable AutoML library. The code will
                all be public. Come back and check.
              </p>
            </div>

            <div className="mt-8 flex gap-4">
              <a href="https://linkedin.com/in/alisahi" target="_blank" rel="noopener noreferrer"
                className="text-sm font-mono text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-2 border border-slate-700 hover:border-cyan-400/40 px-4 py-2 rounded-lg">
                LinkedIn →
              </a>
              <a href="https://github.com/alisahi-dev" target="_blank" rel="noopener noreferrer"
                className="text-sm font-mono text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-2 border border-slate-700 hover:border-cyan-400/40 px-4 py-2 rounded-lg">
                GitHub →
              </a>
            </div>
          </motion.div>

          {/* Right: fact cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-2 gap-4"
          >
            {FACTS.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-xl border p-5"
                style={{ background: 'rgba(13,13,26,0.7)', borderColor: 'rgba(0,212,255,0.1)' }}
              >
                <div className="text-2xl mb-3">{f.icon}</div>
                <div className="text-sm font-bold text-white">{f.label}</div>
                <div className="text-xs font-mono text-slate-500 mt-1">{f.sub}</div>
              </motion.div>
            ))}

            {/* Currently building card */}
            <div className="col-span-2 rounded-xl border p-5"
              style={{ background: 'rgba(0,212,255,0.04)', borderColor: 'rgba(0,212,255,0.2)' }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs font-mono text-cyan-400 tracking-widest">CURRENTLY BUILDING</span>
              </div>
              <div className="font-mono text-sm text-slate-300">
                Real Estate Price Intelligence Engine &amp; Research Copilot
              </div>
              <div className="text-xs text-slate-500 mt-1 font-mono">
                Summer 2026 · shipping Aug–Sep
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
