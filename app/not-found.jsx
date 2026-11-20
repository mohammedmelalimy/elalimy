import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050B12] px-6 text-white">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(6,182,212,0.07), transparent 65%)'
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-xs text-slate-400">
          <span className="h-2 w-2 rounded-full bg-[#06B6D4]" />
          ERROR 404
        </div>

        <h1 className="text-[clamp(7rem,18vw,12rem)] font-bold leading-none tracking-[-0.08em]">
          4<span className="text-[#06B6D4]">0</span>4
        </h1>

        <h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">Page not found.</h2>

        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-slate-400">
          Looks like this page doesn't exist. Let's get you back to where the good stuff is.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="rounded-lg bg-[#06B6D4] px-6 py-3 font-semibold text-[#050B12] transition-colors hover:bg-[#22D3EE]"
          >
            Back to Home
          </Link>

          <Link
            href="/projects"
            className="rounded-lg border border-white/15 px-6 py-3 font-medium text-white transition-colors hover:border-[#06B6D4]/50 hover:bg-white/5"
          >
            View Projects
          </Link>
        </div>

        <div className="mt-16 font-mono text-sm text-slate-500">
          &gt; elalimy<span className="text-[#06B6D4]">_</span>
        </div>
      </div>
    </main>
  );
}
