'use client';

import { motion } from 'framer-motion';

const LINKS = [
  { label: 'Email',    value: 'aa5118503@gmail.com', href: 'mailto:aa5118503@gmail.com', color: '#00d4ff' },
  { label: 'GitHub',   value: 'github.com/alisahi-dev', href: 'https://github.com/alisahi-dev', color: '#a855f7' },
  { label: 'LinkedIn', value: 'linkedin.com/in/alisahi', href: 'https://linkedin.com', color: '#10b981' },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6">
      {/* Divider line */}
      <div className="max-w-6xl mx-auto mb-20">
        <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-xs font-mono tracking-widest px-3 py-1 rounded-full border text-cyan-400 border-cyan-400/30 inline-block mb-6">
            📡 CONTACT
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Let&apos;s build something{' '}
            <span style={{ background: 'linear-gradient(135deg, #00d4ff, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              together
            </span>
          </h2>
          <p className="text-slate-400 max-w-md mx-auto">
            Looking for internships, grad roles, or interesting projects.
            If you&apos;re building something cool, I want to hear about it.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {LINKS.map((l, i) => (
            <motion.a
              key={l.label}
              href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="flex items-center gap-4 px-7 py-5 rounded-2xl border transition-all"
              style={{
                background: 'rgba(13,13,26,0.8)',
                borderColor: l.color + '25',
                minWidth: 240,
              }}
            >
              <div className="w-3 h-3 rounded-full shrink-0" style={{ background: l.color, boxShadow: `0 0 10px ${l.color}` }} />
              <div>
                <div className="text-xs font-mono text-slate-500">{l.label}</div>
                <div className="text-sm font-mono font-bold text-white">{l.value}</div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center text-slate-600 font-mono text-xs">
          <div className="mb-2">Built by Ali Sahi · Summer 2026</div>
          <div style={{ color: 'rgba(0,212,255,0.4)' }}>
            Next.js · Tailwind · Framer Motion · AFINN · K-Means
          </div>
        </div>
      </div>
    </section>
  );
}
