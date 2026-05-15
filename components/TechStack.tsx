const categories = [
  {
    title: "Languages",
    items: [
      { name: "Python", level: 90 },
      { name: "SQL", level: 85 },
      { name: "JavaScript", level: 75 },
      { name: "TypeScript", level: 70 },
      { name: "R", level: 65 },
    ],
  },
  {
    title: "ML & Data",
    items: [
      { name: "scikit-learn", level: 85 },
      { name: "PyTorch", level: 70 },
      { name: "XGBoost", level: 80 },
      { name: "Pandas / NumPy", level: 90 },
      { name: "LangChain", level: 75 },
    ],
  },
  {
    title: "Web & API",
    items: [
      { name: "FastAPI", level: 80 },
      { name: "React / Next.js", level: 70 },
      { name: "Streamlit", level: 75 },
      { name: "REST APIs", level: 85 },
      { name: "Tailwind CSS", level: 70 },
    ],
  },
  {
    title: "Infrastructure",
    items: [
      { name: "Docker", level: 70 },
      { name: "AWS (EC2/S3)", level: 65 },
      { name: "PostgreSQL", level: 75 },
      { name: "Git / GitHub", level: 85 },
      { name: "GitHub Actions", level: 60 },
    ],
  },
];

export default function TechStack() {
  return (
    <section id="tech" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-2">Tech Stack</h2>
        <div className="w-16 h-1 bg-accent rounded mb-12" />

        <div className="grid md:grid-cols-2 gap-8">
          {categories.map((cat) => (
            <div key={cat.title} className="card-glow bg-navy-light rounded-xl p-6 border border-white/5">
              <h3 className="text-lg font-semibold text-white mb-5">
                {cat.title}
              </h3>
              <div className="space-y-4">
                {cat.items.map((item) => (
                  <div key={item.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">{item.name}</span>
                      <span className="text-gray-500 font-mono text-xs">
                        {item.level}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-accent to-purple transition-all duration-1000"
                        style={{ width: `${item.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
