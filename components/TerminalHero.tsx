"use client";
import { useEffect, useState } from "react";

const bootSequence = [
  { text: "ALISAHI-OS v4.0.26 — SYSTEM BOOT", color: "text-t-dim", delay: 0 },
  { text: "[  OK  ] Loading kernel modules...", color: "text-t-dim", delay: 200 },
  { text: "[  OK  ] Mounting data pipelines...", color: "text-t-dim", delay: 400 },
  { text: "[  OK  ] Initializing ML runtime...", color: "text-t-dim", delay: 600 },
  { text: "[  OK  ] Neural networks online", color: "text-t-dim", delay: 800 },
  { text: "[  OK  ] RAG engine loaded", color: "text-t-dim", delay: 1000 },
  { text: "[  OK  ] All systems operational", color: "text-t-green", delay: 1200 },
  { text: "", color: "", delay: 1400 },
];

const typedLines = [
  { prompt: "visitor@alisahi.dev:~$", command: " cat about.txt", delay: 1600 },
];

const aboutText = [
  "",
  "  ╔══════════════════════════════════════════════════════╗",
  "  ║                                                      ║",
  "  ║   ALI SAHI                                           ║",
  "  ║   Data Scientist & AI Engineer                       ║",
  "  ║                                                      ║",
  "  ║   BSc Honours Data Science — York University         ║",
  "  ║   AWS Cloud Practitioner Certified                   ║",
  "  ║                                                      ║",
  "  ║   I build end-to-end AI products.                    ║",
  "  ║   From data pipelines to deployed apps.              ║",
  "  ║   4 projects shipping this summer.                   ║",
  "  ║                                                      ║",
  "  ╚══════════════════════════════════════════════════════╝",
  "",
];

export default function TerminalHero() {
  const [visibleBoot, setVisibleBoot] = useState<number>(0);
  const [typedText, setTypedText] = useState("");
  const [showAbout, setShowAbout] = useState(false);
  const [visibleAboutLines, setVisibleAboutLines] = useState(0);
  const [showPrompt, setShowPrompt] = useState(false);

  // Boot sequence
  useEffect(() => {
    const timers = bootSequence.map((line, i) =>
      setTimeout(() => setVisibleBoot(i + 1), line.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  // Typing effect for command
  useEffect(() => {
    const cmd = typedLines[0];
    const fullText = cmd.command;
    let charIndex = 0;

    const startTyping = setTimeout(() => {
      const interval = setInterval(() => {
        if (charIndex < fullText.length) {
          setTypedText(fullText.slice(0, charIndex + 1));
          charIndex++;
        } else {
          clearInterval(interval);
          setTimeout(() => setShowAbout(true), 300);
        }
      }, 60);
      return () => clearInterval(interval);
    }, cmd.delay);

    return () => clearTimeout(startTyping);
  }, []);

  // About text reveal
  useEffect(() => {
    if (!showAbout) return;
    const timer = setInterval(() => {
      setVisibleAboutLines((prev) => {
        if (prev >= aboutText.length) {
          clearInterval(timer);
          setTimeout(() => setShowPrompt(true), 300);
          return prev;
        }
        return prev + 1;
      });
    }, 50);
    return () => clearInterval(timer);
  }, [showAbout]);

  return (
    <section className="min-h-screen flex flex-col justify-center px-6 py-20 relative">
      <div className="max-w-3xl mx-auto w-full">
        {/* Terminal window */}
        <div className="bg-t-surface border border-t-border rounded-lg overflow-hidden shadow-2xl">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-2.5 bg-t-border/50 border-b border-t-border">
            <div className="w-3 h-3 rounded-full bg-t-red/80" />
            <div className="w-3 h-3 rounded-full bg-t-yellow/80" />
            <div className="w-3 h-3 rounded-full bg-t-green/80" />
            <span className="ml-3 text-xs text-t-dim">alisahi@dev — bash — 80x24</span>
          </div>

          {/* Terminal content */}
          <div className="p-5 font-mono text-sm leading-relaxed min-h-[420px]">
            {/* Boot sequence */}
            {bootSequence.slice(0, visibleBoot).map((line, i) => (
              <div key={i} className={`${line.color} boot-line`}>
                {line.text === "" ? <br /> : line.text}
              </div>
            ))}

            {/* Typed command */}
            {visibleBoot >= bootSequence.length && (
              <div className="mt-2">
                <span className="text-t-green">visitor@alisahi.dev</span>
                <span className="text-t-dim">:</span>
                <span className="text-t-blue">~</span>
                <span className="text-t-dim">$ </span>
                <span className="text-white">{typedText}</span>
                {!showAbout && <span className="cursor-blink text-t-green">▊</span>}
              </div>
            )}

            {/* About output */}
            {showAbout && (
              <div className="text-t-cyan mt-1">
                {aboutText.slice(0, visibleAboutLines).map((line, i) => (
                  <div key={i} className={i > 0 && i < aboutText.length - 1 ? "glow-blue" : ""}>
                    {line || " "}
                  </div>
                ))}
              </div>
            )}

            {/* Final prompt */}
            {showPrompt && (
              <div className="mt-2">
                <span className="text-t-green">visitor@alisahi.dev</span>
                <span className="text-t-dim">:</span>
                <span className="text-t-blue">~</span>
                <span className="text-t-dim">$ </span>
                <span className="cursor-blink text-t-green">▊</span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation hints below terminal */}
        {showPrompt && (
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs animate-pulse">
            <a href="#projects" className="text-t-dim hover:text-t-green transition-colors">
              [ <span className="text-t-green">01</span> PROJECTS ]
            </a>
            <a href="#tech" className="text-t-dim hover:text-t-green transition-colors">
              [ <span className="text-t-green">02</span> TECH STACK ]
            </a>
            <a href="#blog" className="text-t-dim hover:text-t-green transition-colors">
              [ <span className="text-t-green">03</span> BLOG ]
            </a>
            <a href="#contact" className="text-t-dim hover:text-t-green transition-colors">
              [ <span className="text-t-green">04</span> CONTACT ]
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
