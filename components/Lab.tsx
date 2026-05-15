'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

const SentimentAnalyzer = dynamic(() => import('./SentimentAnalyzer'), { ssr: false });
const KMeansViz = dynamic(() => import('./KMeansViz'), { ssr: false });

const DEMOS = [
  {
    id: 'sentiment',
    label: 'Sentiment Analyzer',
    tag: 'NLP',
    tagColor: '#a855f7',
    desc: 'AFINN lexicon-based sentiment analysis with per-word scoring. Runs entirely in your browser — zero API calls.',
    stats: [
      { label: 'LEXICON SIZE', value: '150+ words' },
      { label: 'LATENCY',      value: '< 1ms' },
      { label: 'API CALLS',    value: 'zero' },
    ],
  },
  {
    id: 'kmeans',
    label: 'K-Means Clustering',
    tag: 'Unsupervised ML',
    tagColor: '#00d4ff',
    desc: 'Interactive K-Means implementation. Add your own data points, set K, and watch the algorithm converge in real time.',
    stats: [
      { label: 'ALGORITHM',   value: 'Lloyd\'s' },
      { label: 'MAX ITER',    value: '50' },
      { label: 'CONVERGENCE', value: '< 0.5px' },
    ],
  },
];

export default function Lab() {
  const [active, setActive] = useState('sentiment');
  const demo = DEMOS.find(d => d.id === active)!;

  return (
    <section id="lab" className="py-24 px-6 relative">
      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #a855f7 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono tracking-widest px-3 py-1 rounded-full border"
              style={{ color: '#a855f7', borderColor: 'rgba(168,85,247,0.4)', background: 'rgba(168,85,247,0.08)' }}>
              ⚗ THE LAB
            </span>
            <span className="text-xs font-mono text-slate-500">— interactive demos, live in your browser</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            Don&apos;t just read about it.{' '}
            <span style={{ background: 'linear-gradient(135deg, #a855f7, #00d4ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Try it.
            </span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl">
            These are real working ML implementations — not demos hitting a paid API.
            They prove I can take an algorithm from theory to a working product.
          </p>
        </motion.div>

        {/* Demo tabs */}
        <div className="flex gap-2 mb-8">
          {DEMOS.map(d => (
            <button
              key={d.id}
              onClick={() => setActive(d.id)}
              className="relative px-5 py-2.5 rounded-lg text-sm font-mono transition-all"
              style={{
                background: active === d.id ? 'rgba(255,255,255,0.05)' : 'transparent',
                border: `1px solid ${active === d.id ? d.tagColor + '60' : 'rgba(255,255,255,0.08)'}`,
                color: active === d.id ? '#fff' : '#64748b',
              }}
            >
              <span className="mr-2 text-xs" style={{ color: d.tagColor }}>{d.tag}</span>
              {d.label}
              {active === d.id && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute inset-0 rounded-lg -z-10"
                  style={{ background: `linear-gradient(135deg, ${d.tagColor}10, transparent)` }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Demo card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border p-8"
            style={{
              background: 'rgba(13,13,26,0.8)',
              borderColor: demo.tagColor + '25',
              backdropFilter: 'blur(12px)',
            }}
          >
            {/* Demo header */}
            <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono px-2 py-0.5 rounded"
                    style={{ color: demo.tagColor, background: demo.tagColor + '15' }}>
                    {demo.tag}
                  </span>
                  <span className="text-xs font-mono text-slate-500">● live</span>
                </div>
                <h3 className="text-xl font-bold text-white">{demo.label}</h3>
                <p className="text-sm text-slate-400 mt-1 max-w-md">{demo.desc}</p>
              </div>
              <div className="flex gap-4">
                {demo.stats.map((s, i) => (
                  <div key={i} className="text-right">
                    <div className="text-xs font-mono text-slate-500">{s.label}</div>
                    <div className="text-sm font-mono text-white font-bold">{s.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* The demo itself */}
            {active === 'sentiment' && <SentimentAnalyzer />}
            {active === 'kmeans' && <KMeansViz />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
