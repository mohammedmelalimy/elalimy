export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center bg-[#050B12]"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Logo */}
        <div className="flex items-center gap-1 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          <span className="mr-2 font-mono text-[#06B6D4]">&gt;</span>
          <span>elalimy</span>
          <span className="animate-pulse text-[#06B6D4]">_</span>
        </div>

        {/* Loading indicator */}
        <div className="h-[2px] w-40 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-1/2 animate-[pulse_1.2s_ease-in-out_infinite] rounded-full bg-[#06B6D4]" />
        </div>

        <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-slate-500">
          Loading experience
        </span>
      </div>
    </div>
  );
}
