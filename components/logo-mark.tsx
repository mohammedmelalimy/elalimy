import Link from 'next/link';

export default function LogoMark() {
  return (
    <Link
      href="/"
      aria-label="Mohammed Elalimy - Home"
      className="inline-flex items-center gap-3 transition-opacity duration-300 hover:opacity-80"
    >
      {/* Terminal dots */}
      <span className="flex items-center gap-1">
        <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
        <span className="h-2 w-2 rounded-full bg-[#FEBC2E]" />
        <span className="h-2 w-2 rounded-full bg-[#28C840]" />
      </span>

      {/* Developer name */}
      <span className="inline-flex items-center gap-1 font-mono text-lg tracking-tight">
        <span className="font-bold text-[#06B6D4]">{'>'}</span>

        <span className="font-semibold text-white">elalimy</span>

        <span className="cursor-blink font-bold text-[#06B6D4]">_</span>
      </span>
    </Link>
  );
}
