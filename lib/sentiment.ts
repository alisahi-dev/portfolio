// AFINN-based sentiment analysis — runs 100% in the browser, no API needed

const AFINN: Record<string, number> = {
  // ── Very positive ──
  love: 3, loved: 3, loving: 3, wonderful: 4, amazing: 4, fantastic: 4,
  brilliant: 4, excellent: 3, outstanding: 4, superb: 3, awesome: 4,
  perfect: 3, magnificent: 3, extraordinary: 4, exceptional: 3,
  incredible: 4, remarkable: 3, phenomenal: 4, spectacular: 3,
  thrilled: 4, delighted: 3, ecstatic: 4, overjoyed: 4, elated: 4,
  // ── Positive ──
  great: 3, good: 2, best: 3, better: 2, nice: 2, happy: 3, glad: 3,
  pleased: 2, enjoy: 2, enjoyed: 2, like: 2, liked: 2, success: 3,
  successful: 3, win: 3, won: 3, improve: 2, improved: 2, impressive: 3,
  effective: 2, helpful: 2, benefit: 2, beneficial: 2, positive: 2,
  strong: 2, stronger: 2, smart: 2, clever: 2, innovative: 3,
  creative: 2, capable: 2, skilled: 2, efficient: 2, powerful: 2,
  robust: 2, reliable: 2, accurate: 2, precise: 2, clean: 1,
  productive: 2, motivated: 2, inspired: 2, excited: 3, confident: 2,
  fun: 2, interesting: 2, engaging: 2, intuitive: 2, elegant: 2,
  fast: 1, quick: 1, easy: 1, simple: 1, smooth: 1,
  // ── Slightly positive ──
  ok: 1, okay: 1, fine: 1, decent: 1, fair: 1, useful: 1, clear: 1,
  fresh: 1, safe: 1, stable: 1, steady: 1, solid: 1,
  // ── Slightly negative ──
  hard: -1, slow: -1, boring: -1, dull: -1, weak: -1, limited: -1,
  issue: -1, concern: -1, tricky: -1, confusing: -1, unclear: -1,
  bug: -1, error: -1, problem: -1, lacking: -1,
  // ── Negative ──
  bad: -2, poor: -2, wrong: -2, fail: -2, failed: -2, failure: -2,
  broken: -2, worse: -2, worst: -3, hate: -3, hated: -3, sad: -2,
  angry: -2, upset: -2, frustrated: -2, disappointed: -2, annoying: -2,
  difficult: -1, complex: -1, crash: -2, frustrating: -2, useless: -3,
  terrible: -3, awful: -3, horrible: -4, atrocious: -4, disgusting: -4,
  pathetic: -3, worthless: -3, toxic: -3, disaster: -3, catastrophic: -4,
  devastating: -4, dangerous: -2,
  // ── Tech & DS specific ──
  performant: 2, scalable: 2, optimized: 2, deployed: 2,
  trained: 1, converged: 2, overfit: -2, underfit: -2, imbalanced: -1,
  noisy: -1, corrupt: -2, missing: -1, biased: -2, leaking: -2,
};

export interface WordScore {
  word: string;
  score: number;
}

export interface SentimentResult {
  score: number;        // normalised -100 → +100
  comparative: number;  // score per word
  label: 'VERY POSITIVE' | 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE' | 'VERY NEGATIVE';
  positive: WordScore[];
  negative: WordScore[];
  neutral: string[];
  tokenCount: number;
  scoredTokens: Array<{ word: string; score: number; isScored: boolean }>;
}

export function analyzeSentiment(text: string): SentimentResult {
  const empty: SentimentResult = {
    score: 0, comparative: 0, label: 'NEUTRAL',
    positive: [], negative: [], neutral: [], tokenCount: 0, scoredTokens: [],
  };
  if (!text.trim()) return empty;

  const rawTokens = text.toLowerCase().match(/\b[a-z']+\b/g) ?? [];
  const tokens = rawTokens.map(t => t.replace(/'/g, ''));

  let totalScore = 0;
  const positive: WordScore[] = [];
  const negative: WordScore[] = [];
  const neutral: string[] = [];
  const scoredTokens: Array<{ word: string; score: number; isScored: boolean }> = [];

  tokens.forEach(token => {
    const score = AFINN[token];
    if (score !== undefined) {
      totalScore += score;
      scoredTokens.push({ word: token, score, isScored: true });
      if (score > 0) positive.push({ word: token, score });
      else negative.push({ word: token, score });
    } else {
      scoredTokens.push({ word: token, score: 0, isScored: false });
      neutral.push(token);
    }
  });

  // Normalise: map raw score to -100..+100 via tanh-like curve
  const comparative = tokens.length > 0 ? totalScore / tokens.length : 0;
  const score = Math.round(Math.tanh(comparative * 2) * 100);

  let label: SentimentResult['label'] = 'NEUTRAL';
  if (score >= 50) label = 'VERY POSITIVE';
  else if (score >= 15) label = 'POSITIVE';
  else if (score <= -50) label = 'VERY NEGATIVE';
  else if (score <= -15) label = 'NEGATIVE';

  return {
    score,
    comparative,
    label,
    positive: positive.sort((a, b) => b.score - a.score),
    negative: negative.sort((a, b) => a.score - b.score),
    neutral,
    tokenCount: tokens.length,
    scoredTokens,
  };
}
