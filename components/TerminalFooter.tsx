export default function TerminalFooter() {
  return (
    <footer className="border-t border-t-border py-8 px-6">
      <div className="max-w-3xl mx-auto text-center font-mono text-xs text-t-dim space-y-2">
        <p>
          <span className="text-t-green">$</span> echo &quot;Built with Next.js
          + Tailwind. Deployed on Vercel.&quot;
        </p>
        <p>
          <span className="text-t-green">$</span> echo &quot;Designed &amp;
          coded by Ali Sahi &copy; {new Date().getFullYear()}&quot;
        </p>
        <div className="pt-2 flex items-center justify-center gap-4">
          <a
            href="https://github.com/alisahi-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-t-green transition-colors"
          >
            [github]
          </a>
          <a
            href="https://linkedin.com/in/alisahi"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-t-green transition-colors"
          >
            [linkedin]
          </a>
          <a
            href="mailto:aa5118503@gmail.com"
            className="hover:text-t-green transition-colors"
          >
            [email]
          </a>
        </div>
      </div>
    </footer>
  );
}
