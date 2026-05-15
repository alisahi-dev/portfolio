const skills = [
  { name: "Python", level: 90, category: "lang" },
  { name: "SQL", level: 85, category: "lang" },
  { name: "JavaScript", level: 75, category: "lang" },
  { name: "TypeScript", level: 70, category: "lang" },
  { name: "scikit-learn", level: 85, category: "ml" },
  { name: "PyTorch", level: 70, category: "ml" },
  { name: "XGBoost", level: 80, category: "ml" },
  { name: "Pandas", level: 90, category: "ml" },
  { name: "LangChain", level: 75, category: "ml" },
  { name: "FastAPI", level: 80, category: "web" },
  { name: "React", level: 70, category: "web" },
  { name: "Next.js", level: 70, category: "web" },
  { name: "Docker", level: 70, category: "infra" },
  { name: "AWS", level: 65, category: "infra" },
  { name: "PostgreSQL", level: 75, category: "infra" },
  { name: "Git", level: 85, category: "infra" },
];

function Bar({ level }: { level: number }) {
  const filled = Math.round(level / 5);
  const empty = 20 - filled;
  return (
    <span>
      <span className="text-t-green">{"█".repeat(filled)}</span>
      <span className="text-t-border">{"░".repeat(empty)}</span>
    </span>
  );
}

export default function TerminalTech() {
  return (
    <section id="tech" className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-t-dim text-xs mb-1">visitor@alisahi.dev:~$ neofetch --skills</div>
        <h2 className="text-xl font-bold text-t-green glow-green mb-8">
          SYSTEM PROFICIENCY REPORT
        </h2>

        <div className="bg-t-surface border border-t-border rounded-lg p-5">
          <div className="grid gap-1.5 font-mono text-xs">
            <div className="text-t-dim mb-2">
              ┌─────────────────┬────────────────────────┬──────┐
            </div>
            <div className="text-t-dim">
              │ {"SKILL".padEnd(17)}│ {"PROFICIENCY".padEnd(24)}│ {"LVL".padEnd(6)}│
            </div>
            <div className="text-t-dim">
              ├─────────────────┼────────────────────────┼──────┤
            </div>
            {skills.map((s) => (
              <div key={s.name} className="flex">
                <span className="text-t-dim">│ </span>
                <span className={`${
                  s.category === "lang" ? "text-t-cyan" :
                  s.category === "ml" ? "text-t-purple" :
                  s.category === "web" ? "text-t-orange" : "text-t-blue"
                } w-[136px]`}>
                  {s.name.padEnd(16)}
                </span>
                <span className="text-t-dim">│ </span>
                <span className="w-[192px]"><Bar level={s.level} /></span>
                <span className="text-t-dim"> │ </span>
                <span className="text-white w-[48px]">{String(s.level).padEnd(3)}%</span>
                <span className="text-t-dim">│</span>
              </div>
            ))}
            <div className="text-t-dim mt-2">
              └─────────────────┴────────────────────────┴──────┘
            </div>
          </div>

          <div className="flex gap-6 mt-4 text-xs">
            <span><span className="text-t-cyan">■</span> Languages</span>
            <span><span className="text-t-purple">■</span> ML &amp; Data</span>
            <span><span className="text-t-orange">■</span> Web &amp; API</span>
            <span><span className="text-t-blue">■</span> Infrastructure</span>
          </div>
        </div>
      </div>
    </section>
  );
}
