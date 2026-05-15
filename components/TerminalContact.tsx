"use client";
import { useState } from "react";

const contactLinks = [
  {
    label: "email",
    value: "aa5118503@gmail.com",
    href: "mailto:aa5118503@gmail.com",
    icon: "@",
    color: "text-t-green",
  },
  {
    label: "github",
    value: "github.com/alisahi-dev",
    href: "https://github.com/alisahi-dev",
    icon: "~",
    color: "text-t-purple",
  },
  {
    label: "linkedin",
    value: "linkedin.com/in/alisahi",
    href: "https://linkedin.com/in/alisahi",
    icon: "in",
    color: "text-t-blue",
  },
];

export default function TerminalContact() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("aa5118503@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-t-dim text-xs mb-1">
          visitor@alisahi.dev:~$ cat ~/.contact
        </div>
        <h2 className="text-xl font-bold text-t-green glow-green mb-8">
          ESTABLISH CONNECTION
        </h2>

        <div className="bg-t-surface border border-t-border rounded-lg overflow-hidden">
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-2.5 bg-t-border/50 border-b border-t-border">
            <div className="w-3 h-3 rounded-full bg-t-red/80" />
            <div className="w-3 h-3 rounded-full bg-t-yellow/80" />
            <div className="w-3 h-3 rounded-full bg-t-green/80" />
            <span className="ml-3 text-xs text-t-dim">contact — bash</span>
          </div>

          <div className="p-5 font-mono text-sm space-y-4">
            <div className="text-t-dim text-xs leading-relaxed">
              <p># Open to conversations about data science, AI engineering,</p>
              <p># and new opportunities. Always happy to collaborate.</p>
              <p># Inbox is open — response time &lt; 24h.</p>
            </div>

            <div className="border-t border-t-border pt-4 space-y-3">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.label !== "email" ? "_blank" : undefined}
                  rel={link.label !== "email" ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-3 group"
                >
                  <span className={`${link.color} w-6 text-center font-bold`}>
                    {link.icon}
                  </span>
                  <span className="text-t-dim">{link.label}:</span>
                  <span className="text-white group-hover:text-t-green transition-colors">
                    {link.value}
                  </span>
                  <span className="text-t-dim opacity-0 group-hover:opacity-100 transition-opacity text-xs">
                    &#8599;
                  </span>
                </a>
              ))}
            </div>

            <div className="border-t border-t-border pt-4">
              <button
                onClick={handleCopy}
                className="text-xs text-t-dim hover:text-t-green transition-colors"
              >
                <span className="text-t-green">$</span>{" "}
                {copied
                  ? "echo 'Copied to clipboard!'"
                  : "pbcopy < ~/.email  # click to copy email"}
              </button>
            </div>

            {/* Final prompt */}
            <div className="pt-2">
              <span className="text-t-green">visitor@alisahi.dev</span>
              <span className="text-t-dim">:</span>
              <span className="text-t-blue">~</span>
              <span className="text-t-dim">$ </span>
              <span className="cursor-blink text-t-green">&#9610;</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
