'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const ROLES = [
  'Data Scientist',
  'ML Engineer',
  'AI Builder',
  'Full-Stack Dev',
];

// Particle system
interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  r: number; alpha: number;
}

function useParticles(canvasRef: React.RefObject<HTMLCanvasElement>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = canvas.offsetWidth;
    let H = canvas.offsetHeight;
    canvas.width = W;
    canvas.height = H;

    const N = Math.floor((W * H) / 12000);
    const particles: Particle[] = Array.from({ length: N }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    let raf: number;

    function draw() {
      ctx!.clearRect(0, 0, W, H);

      // Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 130) {
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.strokeStyle = `rgba(0,212,255,${(1 - d / 130) * 0.15})`;
            ctx!.lineWidth = 1;
            ctx!.stroke();
          }
        }
      }

      // Dots
      particles.forEach(p => {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(0,212,255,${p.alpha})`;
        ctx!.fill();

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      });

      raf = requestAnimationFrame(draw);
    }

    draw();

    const handleResize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', handleResize);
    };
  }, [canvasRef]);
}

function Typewriter({ words }: { words: string[] }) {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[idx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting) {
      if (displayed.length < word.length) {
        timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
      } else {
        timeout = setTimeout(() => setDeleting(true), 2200);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
      } else {
        setDeleting(false);
        setIdx(i => (i + 1) % words.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, idx, words]);

  return (
    <span className="font-mono" style={{ color: '#00d4ff' }}>
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useParticles(canvasRef);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,212,255,0.04) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #030712)' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-emerald-400 tracking-widest">AVAILABLE FOR OPPORTUNITIES</span>
          </div>

          <div className="text-slate-400 font-mono text-sm mb-3">
            &gt; ali_sahi.init()
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-4">
            Ali Sahi
          </h1>

          <div className="text-2xl lg:text-3xl font-light text-slate-300 mb-6 h-10">
            <Typewriter words={ROLES} />
          </div>

          <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-lg">
            4th year BSc Data Science @ York University. I build end-to-end ML systems —
            from raw data to deployed products. Scroll down and try the live demos.
          </p>

          <div className="flex flex-wrap gap-3">
            <a href="#lab"
              className="px-7 py-3 rounded-xl font-mono font-bold text-sm transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #00d4ff, #0096b7)',
                color: '#000',
                boxShadow: '0 0 24px rgba(0,212,255,0.3)',
              }}>
              ⚗ Try the demos
            </a>
            <a href="#projects"
              className="px-7 py-3 rounded-xl font-mono text-sm border transition-all hover:scale-105"
              style={{ borderColor: 'rgba(255,255,255,0.15)', color: '#e2e8f0', background: 'rgba(255,255,255,0.04)' }}>
              View projects →
            </a>
          </div>
        </motion.div>

        {/* Right: stats card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className="hidden lg:block"
        >
          <div className="rounded-2xl border p-6 font-mono text-sm space-y-4"
            style={{ background: 'rgba(13,13,26,0.7)', borderColor: 'rgba(0,212,255,0.15)', backdropFilter: 'blur(20px)' }}>

            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-2 text-slate-500 text-xs">ali_sahi.profile</span>
            </div>

            {[
              { key: 'name',        val: '"Ali Sahi"',          color: '#e2e8f0' },
              { key: 'university',  val: '"York University"',   color: '#a855f7' },
              { key: 'degree',      val: '"BSc Data Science"',  color: '#a855f7' },
              { key: 'year',        val: '4',                   color: '#f59e0b' },
              { key: 'status',      val: '"building"',          color: '#10b981' },
              { key: 'stack',       val: '["Python", "ML", "Next.js"]', color: '#00d4ff' },
              { key: 'open_to',     val: '"roles + collabs"',  color: '#10b981' },
            ].map(({ key, val, color }) => (
              <div key={key} className="flex gap-2">
                <span className="text-slate-500">{key}:</span>
                <span style={{ color }}>{val}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="text-slate-600 text-xs font-mono">scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-slate-600 to-transparent" />
      </motion.div>
    </section>
  );
}
