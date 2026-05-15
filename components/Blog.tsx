const posts = [
  {
    title: "How I Built a RAG Pipeline From Scratch",
    excerpt:
      "A deep dive into building a production-ready Retrieval Augmented Generation system — vector databases, chunking strategies, and lessons learned.",
    date: "Coming Soon",
    tags: ["AI", "RAG", "LangChain"],
    readTime: "10 min read",
  },
  {
    title: "Analyzing 10,000 Canadian Tech Job Postings",
    excerpt:
      "What skills are actually in demand? I scraped thousands of job listings and used NLP to find out. The results might surprise you.",
    date: "Coming Soon",
    tags: ["NLP", "Analytics", "Career"],
    readTime: "8 min read",
  },
  {
    title: "Publishing Your First Python Package to PyPI",
    excerpt:
      "A practical guide to going from a local script to a pip-installable package with tests, CI/CD, and proper documentation.",
    date: "Coming Soon",
    tags: ["Python", "Open Source", "DevOps"],
    readTime: "7 min read",
  },
];

export default function Blog() {
  return (
    <section id="blog" className="py-24 px-6 bg-navy-light/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-2">Blog</h2>
        <div className="w-16 h-1 bg-accent rounded mb-4" />
        <p className="text-gray-400 mb-12 max-w-2xl">
          I write about what I build and what I learn. Technical deep dives,
          tutorials, and lessons from shipping real projects.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article
              key={post.title}
              className="card-glow bg-navy-light rounded-xl p-6 border border-white/5 hover:border-accent/20 transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
            >
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                <span>{post.date}</span>
                <span>&middot;</span>
                <span>{post.readTime}</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-accent transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                {post.excerpt}
              </p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-md bg-accent/10 text-accent"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
