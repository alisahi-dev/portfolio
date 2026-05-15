"use client";
import { useState, useEffect } from "react";

const navItems = [
  { label: "projects", href: "#projects" },
  { label: "tech", href: "#tech" },
  { label: "blog", href: "#blog" },
  { label: "contact", href: "#contact" },
];

export default function TerminalNav() {
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-t-bg/95 backdrop-blur-sm border-b border-t-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
        <a href="#" className="text-t-green font-bold text-sm hover:glow-green transition-all">
          ~/alisahi<span className="cursor-blink">_</span>
        </a>

        <div className="hidden sm:flex items-center gap-6 text-xs">
          {navItems.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              className="text-t-dim hover:text-t-green transition-colors"
            >
              <span className="text-t-green/60">0{i + 1}.</span> {item.label}
            </a>
          ))}
        </div>

        <div className="text-t-dim text-xs font-mono tabular-nums">
          {time}
        </div>
      </div>
    </nav>
  );
}
