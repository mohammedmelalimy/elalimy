'use client';

import { useEffect, useState } from 'react';
import { Terminal } from 'lucide-react';

const codeLines = [
  'const developer = {',
  '  name: "Mohammed Elalimy",',
  '  role: "Full-Stack Developer",',
  '  stack: [',
  '    "MERN",',
  '    "Next.js",',
  '    "Shopify",',
  '  ],',
  '  passion: "Building digital experiences",',
  '  location: "Egypt",',
  '};',
  '',
  'console.log(developer);'
];

const fullCode = codeLines.join('\n');

function highlightCode(line: string) {
  const parts = line.split(/("(?:[^"\\]|\\.)*"|\b(?:const|console|log)\b)/g);

  return parts.map((part, index) => {
    let className = 'text-slate-200 light:text-[#25394A]';

    if (part.startsWith('"')) {
      className = 'text-[#06B6D4] light:text-[#087F99]';
    } else if (part === 'const') {
      className = 'text-purple-400 light:text-[#7C3AED]';
    } else if (part === 'console') {
      className = 'text-yellow-300 light:text-[#A16207]';
    } else if (part === 'log') {
      className = 'text-blue-400 light:text-[#2563EB]';
    }

    return (
      <span key={index} className={className}>
        {part}
      </span>
    );
  });
}

export default function LiveCodeEditor() {
  const [visibleChars, setVisibleChars] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (visibleChars >= fullCode.length) {
      setFinished(true);

      const restart = setTimeout(() => {
        setVisibleChars(0);
        setFinished(false);
      }, 4000);

      return () => clearTimeout(restart);
    }

    const char = fullCode[visibleChars];

    const delay = char === '\n' ? 260 : char === ' ' ? 25 : 35;

    const timer = setTimeout(() => {
      setVisibleChars((previous) => previous + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [visibleChars]);

  const displayedCode = fullCode.slice(0, visibleChars);
  const displayedLines = displayedCode.split('\n');

  const currentLineIndex = displayedLines.length - 1;

  return (
    <div className="w-full max-w-[480px] overflow-hidden rounded-2xl border border-cyan-500/25 bg-[#0B1119]/95 shadow-[0_20px_70px_rgba(0,0,0,0.3)] light:border-[#C0D8E4] light:bg-white light:shadow-[0_16px_50px_rgba(15,37,55,0.08)]">
      {/* Window header */}
      <div className="flex h-11 items-center gap-3 border-b border-white/[0.07] bg-white/[0.02] px-4 light:border-[#E4ECF2] light:bg-[#F4F8FB]">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </div>

        <div className="ml-2 flex items-center gap-2 border-l border-white/10 pl-3 light:border-[#D5E1E9]">
          <Terminal size={14} className="text-[#06B6D4]" />
          <span className="font-mono text-xs text-slate-400 light:text-[#526679]">developer.ts</span>
        </div>
      </div>

      {/* Code area */}
      <div className="overflow-x-auto py-4">
        <div className="min-w-max px-4 font-mono text-[11px] leading-[1.6rem] sm:text-xs">
          {codeLines.map((_, index) => {
            const line = displayedLines[index] ?? '';
            const isCurrentLine = index === currentLineIndex && !finished;

            return (
              <div key={index} className="flex min-h-[1.6rem]">
                <span className="mr-5 w-5 shrink-0 select-none text-right text-slate-600 light:text-[#8393A1]">
                  {index + 1}
                </span>

                <code className="whitespace-pre text-slate-200 light:text-[#25394A]">
                  {highlightCode(line)}

                  {isCurrentLine && (
                    <span
                      aria-hidden="true"
                      className="ml-[1px] inline-block h-[14px] w-[2px] animate-pulse bg-[#06B6D4] align-middle"
                    />
                  )}
                </code>
              </div>
            );
          })}
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between border-t border-white/[0.07] px-4 py-2 font-mono text-[10px] text-slate-500 light:border-[#E4ECF2] light:text-[#6E7F8C]">
        <span>TypeScript</span>

        <span className="flex items-center gap-2">
          <span
            className={`h-1.5 w-1.5 rounded-full ${finished ? 'bg-green-400' : 'bg-[#06B6D4]'}`}
          />

          {finished ? 'Build complete' : 'Writing code...'}
        </span>
      </div>
    </div>
  );
}
