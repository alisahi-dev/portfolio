'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { analyzeSentiment, type SentimentResult } from '@/lib/sentiment';

const EXAMPLES = [
  "This project is amazing! The model achieves excellent accuracy and the code is clean and well-structured.",
  "The dataset is noisy and the training failed after 3 hours. Terrible results, completely broken pipeline.",
  "Performance is okay. Could be better but it does the job for now.",
  "I absolutely love working with PyTorch. Building neural networks has never been more intuitive and fun!",
  "The deployment was a disaster. Crashes on every request. Awful user experience overall.",
];

const LABEL_CONFIG = {
  'VERY POSITIVE': { color: '#10b981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)' },
  'POSITIVE':      { color: '#34d399', bg: 'rgba(52,211,153,0.1)',  border: 'rgba(52,211,153,0.3)' },
  'NEUTRAL':       { color: '#94a3b8', bg: 'rgba(148,163,184,0.1)', border: 'rgba(148,163,184,0.3)' },
  'NEGATIVE':      { color: '#f87171', bg: 'rgba(248,113,113,0.1)', border: 'rgba(248,113,113,0.3)' },
  'VERY NEGATIVE': { color: '#ef4444', bg: 'rgba(239,68,68,0.1)',   border: 'rgba(239,68,68,0.3)' },
};

function ScoreArc({ score }: { score: number }) {
  const size = 140;
  const cx = size / 2;
  const cy = size / 2;
  const r = 54;
  const strokeWidth = 8;

  // Arc from -140° to +140° (280° total sweep)
  const startAngle = -220;
  const endAngle   = 40;
  const totalSweep = endAngle - startAngle; // 260°

  function polarToXY(angleDeg: number) {
    const rad = (angleDeg * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }

  function describeArc(from: number, to: number) {
    const s = polarToXY(from);
    const e = polarToXY(to);
    const large = to - from > 180 ? 1 : 0;
    return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`;
  }

  // Map score (-100..+100) → angle
  const pct = (score + 100) / 200; // 0..1
  const fillEnd = startAngle + totalSweep * pct;

  const color = score > 15 ? '#10b981' : score < -15 ? '#ef4444' : '#94a3b8';

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Track */}
      <path
        d={describeArc(startAngle, endAngle)}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* Fill */}
      <motion.path
        d={describeArc(startAngle, endAngle)}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={`${2 * Math.PI * r}`}
        initial={{ strokeDashoffset: 2 * Math.PI * r }}
        animate={{ strokeDashoffset: 2 * Math.PI * r * (1 - pct) }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{ filter: `drop-shadow(0 0 6px ${color})` }}
      />
      {/* Score label */}
      <text x={cx} y={cy - 6} textAnchor="middle" fill={color} fontSize="26" fontWeight="700" fontFamily="JetBrains Mono">
        {score > 0 ? '+' : ''}{score}
      </text>
      <text x={cx} y={cy + 14} textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="monospace">
        SENTIMENT SCORE
      </text>
    </svg>
  );
}

function WordToken({ word, score, isScored }: { word: string; score: number; isScored: boolean }) {
  if (!isScored) return <span className="text-slate-500">{word} </span>;
  const color = score > 0 ? '#10b981' : '#ef4444';
  const bg = score > 0 ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)';
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{ color, backgroundColor: bg, borderRadius: 3, padding: '1px 3px', margin: '0 1px' }}
      title={`Score: ${score > 0 ? '+' : ''}${score}`}
    >
      {word}
    </motion.span>
  );
}

export default function SentimentAnalyzer() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<SentimentResult | null>(null);
  const [exampleIdx, setExampleIdx] = useState(0);

  const analyze = useCallback((input: string) => {
    setResult(analyzeSentiment(input));
  }, []);

  useEffect(() => {
    if (text) analyze(text);
    else setResult(null);
  }, [text, analyze]);

  const loadExample = () => {
    const ex = EXAMPLES[exampleIdx % EXAMPLES.length];
    setText(ex);
    setExampleIdx(i => i + 1);
  };

  const cfg = result ? LABEL_CONFIG[result.label] : LABEL_CONFIG['NEUTRAL'];

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Input panel */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-mono text-cyan-400 tracking-widest">INPUT TEXT</label>
          <button
            onClick={loadExample}
            className="text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors border border-slate-700 hover:border-cyan-400/50 px-3 py-1 rounded"
          >
            try example →
          </button>
        </div>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Type or paste any text here — code reviews, project descriptions, research papers…"
          className="w-full h-48 bg-black/30 border border-slate-700 focus:border-cyan-400/50 rounded-lg p-4 text-slate-300 text-sm font-mono resize-none outline-none transition-colors placeholder:text-slate-600"
        />

        {/* Word-by-word breakdown */}
        {result && result.tokenCount > 0 && (
          <div className="bg-black/20 border border-slate-800 rounded-lg p-4">
            <div className="text-xs font-mono text-slate-500 mb-2 tracking-widest">HIGHLIGHTED WORDS</div>
            <div className="text-sm leading-7 font-mono">
              {result.scoredTokens.map((t, i) => (
                <WordToken key={i} word={t.word} score={t.score} isScored={t.isScored} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Results panel */}
      <div className="space-y-4">
        <div className="text-xs font-mono text-cyan-400 tracking-widest">ANALYSIS OUTPUT</div>

        {!result || result.tokenCount === 0 ? (
          <div className="h-48 flex items-center justify-center border border-dashed border-slate-800 rounded-lg">
            <span className="text-slate-600 font-mono text-sm">awaiting input…</span>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={result.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              {/* Score arc + label */}
              <div
                className="flex items-center gap-6 p-4 rounded-xl border"
                style={{ background: cfg.bg, borderColor: cfg.border }}
              >
                <ScoreArc score={result.score} />
                <div>
                  <div className="text-2xl font-bold font-mono" style={{ color: cfg.color }}>
                    {result.label}
                  </div>
                  <div className="text-xs text-slate-400 mt-1 font-mono">
                    {result.tokenCount} tokens analysed
                  </div>
                  <div className="text-xs text-slate-400 font-mono">
                    comparative: {result.comparative.toFixed(3)}
                  </div>
                </div>
              </div>

              {/* Top words */}
              {result.positive.length > 0 && (
                <div className="bg-black/20 border border-slate-800 rounded-lg p-4">
                  <div className="text-xs font-mono text-emerald-400 tracking-widest mb-2">
                    POSITIVE SIGNALS ({result.positive.length})
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {result.positive.slice(0, 8).map((w, i) => (
                      <span key={i} className="text-xs font-mono px-2 py-1 rounded" style={{ background: 'rgba(16,185,129,0.15)', color: '#10b981' }}>
                        {w.word} +{w.score}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {result.negative.length > 0 && (
                <div className="bg-black/20 border border-slate-800 rounded-lg p-4">
                  <div className="text-xs font-mono text-red-400 tracking-widest mb-2">
                    NEGATIVE SIGNALS ({result.negative.length})
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {result.negative.slice(0, 8).map((w, i) => (
                      <span key={i} className="text-xs font-mono px-2 py-1 rounded" style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444' }}>
                        {w.word} {w.score}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
