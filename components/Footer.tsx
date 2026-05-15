export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Ali Sahi. Built with Next.js &amp;
          Tailwind CSS.
        </p>
        <p className="text-gray-600 text-xs font-mono">
          Designed &amp; built by Ali Sahi
        </p>
      </div>
    </footer>
  );
}
