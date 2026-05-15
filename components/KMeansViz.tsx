'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

const CLUSTER_COLORS = [
  '#00d4ff', '#a855f7', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#6366f1', '#84cc16',
];

interface Point { x: number; y: number; cluster: number }
interface Centroid { x: number; y: number }

function dist(a: { x: number; y: number }, b: { x: number; y: number }) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

function assignClusters(points: Point[], centroids: Centroid[]): Point[] {
  return points.map(p => ({
    ...p,
    cluster: centroids.reduce(
      (best, c, i) => (dist(p, c) < dist(p, centroids[best]) ? i : best),
      0
    ),
  }));
}

function moveCentroids(points: Point[], centroids: Centroid[], k: number): Centroid[] {
  return Array.from({ length: k }, (_, i) => {
    const members = points.filter(p => p.cluster === i);
    if (members.length === 0) return centroids[i];
    return {
      x: members.reduce((s, p) => s + p.x, 0) / members.length,
      y: members.reduce((s, p) => s + p.y, 0) / members.length,
    };
  });
}

function generateData(n: number, w: number, h: number): Point[] {
  return Array.from({ length: n }, () => ({
    x: 30 + Math.random() * (w - 60),
    y: 30 + Math.random() * (h - 60),
    cluster: 0,
  }));
}

function initCentroids(points: Point[], k: number): Centroid[] {
  const shuffled = [...points].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, k).map(p => ({ x: p.x, y: p.y }));
}

export default function KMeansViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [k, setK] = useState(3);
  const [points, setPoints] = useState<Point[]>([]);
  const [centroids, setCentroids] = useState<Centroid[]>([]);
  const [iteration, setIteration] = useState(0);
  const [status, setStatus] = useState<'idle' | 'running' | 'converged'>('idle');
  const [convergedAt, setConvergedAt] = useState<number | null>(null);
  const animRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stateRef = useRef({ points, centroids, k });

  // Keep ref in sync
  useEffect(() => { stateRef.current = { points, centroids, k }; }, [points, centroids, k]);

  const W = 560, H = 340;

  // Draw
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = 'rgba(0,0,0,0)';
    ctx.fillRect(0, 0, W, H);

    // Draw Voronoi-like backdrop (simple distance coloring, low opacity)
    // Skip for perf; just draw points and centroids

    // Points
    points.forEach(p => {
      const color = CLUSTER_COLORS[p.cluster % CLUSTER_COLORS.length];
      ctx.beginPath();
      ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = color + 'cc';
      ctx.fill();
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Lines from points to their centroid
    points.forEach(p => {
      if (centroids[p.cluster]) {
        const c = centroids[p.cluster];
        const color = CLUSTER_COLORS[p.cluster % CLUSTER_COLORS.length];
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(c.x, c.y);
        ctx.strokeStyle = color + '18';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    });

    // Centroids
    centroids.forEach((c, i) => {
      const color = CLUSTER_COLORS[i % CLUSTER_COLORS.length];
      // Outer ring
      ctx.beginPath();
      ctx.arc(c.x, c.y, 14, 0, Math.PI * 2);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();
      // Inner fill
      ctx.beginPath();
      ctx.arc(c.x, c.y, 8, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      // Label
      ctx.fillStyle = '#000';
      ctx.font = 'bold 9px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`C${i + 1}`, c.x, c.y);
    });
  }, [points, centroids]);

  // Click to add point
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (status === 'running') return;
    const rect = canvasRef.current!.getBoundingClientRect();
    const scaleX = W / rect.width;
    const scaleY = H / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    setPoints(prev => [...prev, { x, y, cluster: 0 }]);
    setStatus('idle');
    setIteration(0);
    setConvergedAt(null);
  };

  const handleRandom = () => {
    if (animRef.current) clearTimeout(animRef.current);
    const newPts = generateData(80, W, H);
    setPoints(newPts);
    setCentroids([]);
    setIteration(0);
    setStatus('idle');
    setConvergedAt(null);
  };

  const handleReset = () => {
    if (animRef.current) clearTimeout(animRef.current);
    setPoints([]);
    setCentroids([]);
    setIteration(0);
    setStatus('idle');
    setConvergedAt(null);
  };

  const runStep = useCallback(
    (pts: Point[], cents: Centroid[], iter: number, currentK: number) => {
      if (pts.length < currentK) {
        setStatus('idle');
        return;
      }
      const assigned = assignClusters(pts, cents);
      const newCents = moveCentroids(assigned, cents, currentK);
      const converged = newCents.every((c, i) => dist(c, cents[i]) < 0.5);

      setPoints(assigned);
      setCentroids(newCents);
      setIteration(iter + 1);

      if (converged || iter >= 50) {
        setStatus('converged');
        setConvergedAt(iter + 1);
      } else {
        animRef.current = setTimeout(() => runStep(assigned, newCents, iter + 1, currentK), 300);
      }
    },
    []
  );

  const handleRun = () => {
    if (animRef.current) clearTimeout(animRef.current);
    const { points: pts, k: currentK } = stateRef.current;
    if (pts.length < currentK) return;

    const initialCents = initCentroids(pts, currentK);
    setIteration(0);
    setStatus('running');
    setConvergedAt(null);
    setCentroids(initialCents);
    animRef.current = setTimeout(() => runStep(pts, initialCents, 0, currentK), 100);
  };

  useEffect(() => () => { if (animRef.current) clearTimeout(animRef.current); }, []);

  const statusMsg =
    status === 'idle' ? 'Click canvas to add points, then run K-Means' :
    status === 'running' ? `Running… iteration ${iteration}` :
    `Converged after ${convergedAt} iterations ✓`;

  const statusColor =
    status === 'converged' ? '#10b981' :
    status === 'running' ? '#f59e0b' : '#64748b';

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Canvas */}
      <div className="lg:col-span-2">
        <div className="text-xs font-mono text-cyan-400 tracking-widest mb-3">
          CANVAS — click to add points
        </div>
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          onClick={handleCanvasClick}
          className="w-full rounded-xl border border-slate-700/50 bg-[#0a0a1a] cursor-crosshair"
          style={{ maxHeight: 340 }}
        />
        <div className="mt-2 text-xs font-mono" style={{ color: statusColor }}>
          ⬤ {statusMsg}
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-5">
        <div className="text-xs font-mono text-cyan-400 tracking-widest">CONTROLS</div>

        {/* K slider */}
        <div>
          <div className="flex justify-between text-xs font-mono text-slate-400 mb-2">
            <span>K (clusters)</span>
            <span className="text-cyan-400 font-bold">{k}</span>
          </div>
          <input
            type="range" min={1} max={8} value={k}
            onChange={e => {
              setK(Number(e.target.value));
              setStatus('idle');
              setIteration(0);
              setConvergedAt(null);
            }}
            className="w-full accent-cyan-400"
          />
          <div className="flex justify-between text-xs text-slate-600 font-mono mt-1">
            <span>1</span><span>8</span>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-black/30 border border-slate-800 rounded-lg p-3 space-y-2 font-mono text-xs">
          <div className="flex justify-between text-slate-400">
            <span>points</span>
            <span className="text-white">{points.length}</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>iteration</span>
            <span className="text-white">{iteration}</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>k</span>
            <span className="text-white">{k}</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>status</span>
            <span style={{ color: statusColor }}>{status}</span>
          </div>
        </div>

        {/* Cluster legend */}
        {centroids.length > 0 && (
          <div className="space-y-1">
            <div className="text-xs font-mono text-slate-500 tracking-widest mb-2">CLUSTERS</div>
            {centroids.map((_, i) => {
              const count = points.filter(p => p.cluster === i).length;
              return (
                <div key={i} className="flex items-center gap-2 text-xs font-mono">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: CLUSTER_COLORS[i] }} />
                  <span className="text-slate-400">C{i + 1}</span>
                  <span className="text-slate-600 ml-auto">{count} pts</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Buttons */}
        <div className="space-y-2">
          <button
            onClick={handleRun}
            disabled={points.length < k || status === 'running'}
            className="w-full py-2.5 rounded-lg text-sm font-mono font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: 'linear-gradient(135deg, #00d4ff22, #a855f722)', border: '1px solid rgba(0,212,255,0.4)', color: '#00d4ff' }}
          >
            {status === 'running' ? '● running…' : '▶ run k-means'}
          </button>
          <button
            onClick={handleRandom}
            className="w-full py-2 rounded-lg text-xs font-mono text-slate-400 border border-slate-700 hover:border-slate-500 transition-colors"
          >
            generate 80 random points
          </button>
          <button
            onClick={handleReset}
            className="w-full py-2 rounded-lg text-xs font-mono text-slate-600 border border-slate-800 hover:border-slate-700 transition-colors"
          >
            reset canvas
          </button>
        </div>
      </div>
    </div>
  );
}
