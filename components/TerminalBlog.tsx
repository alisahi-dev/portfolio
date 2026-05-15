"use client";
import { useState } from "react";

const posts = [
  {
    id: "week-1",
    date: "2026-05-18",
    title: "Week 1: Setting Up the War Room",
    preview:
      "Dev environment, GitHub profile, portfolio site — the foundation before the real builds begin.",
    tags: ["setup", "portfolio", "devops"],
    readTime: "4 min",
  },
  {
    id: "scraping",
    date: "2026-05-25",
    title: "How I Scraped 50K Real Estate Listings Without Getting Banned",
    preview:
      "Rotating proxies, respectful rate-limiting, and cleaning the messiest HTML I've ever seen.",
    tags: ["scraping", "python", "data-engineering"],
    readTime: "6 min",
  },
  {
    id: "rag-lessons",
    date: "2026-06-08",
    title: "RAG Is Harder Than It Looks — Lessons from Research Copilot",
    preview:
      "Chunking strategies, embedding drift, and why retrieval quality matters more than your LLM.",
    tags: ["RAG", "LLM", "AI-engineering"],
    readTime: "8 min",
  },
];

export default function TerminalBlog() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="blog" className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-t-dim text-xs mb-1">
          visitor@alisahi.dev:~$ cat /var/log/build.log | tail -n 20
        </div>
        <h2 className="text-xl font-bold text-t-green glow-green mb-8">
          BUILD LOG — LATEST ENTRIES
        </h2>

        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className={`bg-t-surface border rounded-lg p-4 transition-all duration-300 cursor-pointer ${
                hoveredId === post.id
                  ? "border-t-green/40 shadow-[0_0_15px_rgba(74,222,128,0.05)]"
                  : "border-t-border hover:border-t-green/20"
              }`}
              onMouseEnter={() => setHoveredId(post.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="flex items-center gap-3 mb-2 text-xs">
                <span className="text-t-dim">[{post.date}]</span>
                <span className="text-t-dim">|</span>
                <span className="text-t-purple">{post.readTime} read</span>
              </div>
              <h3 className="text-white font-semibold text-sm mb-1.5">
                <span className="text-t-green mr-2">&gt;</span>
                {post.title}
              </h3>
              <p className="text-t-dim text-xs ml-5 mb-3">{post.preview}</p>
              <div className="flex items-center gap-2 ml-5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded bg-t-cyan/5 text-t-cyan border border-t-cyan/10"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-6 text-t-dim text-xs">
          <span className="text-t-green">$</span> More entries coming as projects ship...
        </div>
      </div>
    </section>
  );
}
