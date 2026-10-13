import Link from 'next/link';
import { ArrowDown, ArrowRight, Mail, Terminal } from 'lucide-react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import TypingText from '../typing-text';

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/YOUR_USERNAME',
    icon: FaGithub
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/YOUR_USERNAME',
    icon: FaLinkedinIn
  },
  {
    label: 'Email',
    href: 'mailto:YOUR_EMAIL@example.com',
    icon: Mail
  }
];


const codeLines = [
  <>
    <span className="text-purple-400">const</span> developer = {'{'}
  </>,
  <>
    {' '}
    name: <span className="text-cyan-400">&quot;Mohammed Elalimy&quot;</span>,
  </>,
  <>
    {' '}
    role: <span className="text-cyan-400">&quot;Full-Stack Developer&quot;</span>,
  </>,
  <> stack: [</>,
  <>
    {' '}
    <span className="text-cyan-400">&quot;MERN&quot;</span>,
  </>,
  <>
    {' '}
    <span className="text-cyan-400">&quot;Next.js&quot;</span>,
  </>,
  <>
    {' '}
    <span className="text-cyan-400">&quot;Shopify&quot;</span>,
  </>,
  <> ],</>,
  <>
    {' '}
    passion: <span className="text-cyan-400">&quot;Building digital experiences&quot;</span>,
  </>,
  <>
    {' '}
    location: <span className="text-cyan-400">&quot;Egypt&quot;</span>,
  </>,
  <>{'};'}</>,
  <></>,
  <>
    <span className="text-yellow-300">console</span>.<span className="text-blue-400">log</span>
    (developer);
  </>
];

function CodeEditor() {
  return (
    <div className="w-full max-w-[480px] overflow-hidden rounded-2xl border border-cyan-500/25 bg-[#0B1119]/95 shadow-[0_20px_70px_rgba(0,0,0,0.3)]">
      {/* Window top bar */}
      <div className="flex h-11 items-center gap-3 border-b border-white/[0.07] bg-white/[0.02] px-4">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </div>

        <div className="ml-2 flex items-center gap-2 border-l border-white/10 pl-3">
          <Terminal size={14} className="text-cyan-400" />
          <span className="font-mono text-xs text-slate-400">developer.ts</span>
        </div>
      </div>

      {/* Code */}
      <div className="overflow-x-auto py-4">
        <div className="min-w-max space-y-0.5 px-4 font-mono text-[11px] leading-[1.6rem] sm:text-xs">
          {codeLines.map((line, index) => (
            <div key={index} className="flex">
              <span className="mr-5 w-5 shrink-0 select-none text-right text-slate-600">
                {index + 1}
              </span>

              <code className="whitespace-pre text-slate-200">{line}</code>
            </div>
          ))}
        </div>
      </div>

      {/* Editor status bar */}
      <div className="flex items-center justify-between border-t border-white/[0.07] px-4 py-2 font-mono text-[10px] text-slate-500">
        <span>TypeScript</span>

        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#06B6D4]" />
          Ready to build
        </span>
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-7rem)] items-center overflow-hidden bg-[#050B12] text-white">
      {/* Background grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(6,182,212,0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6,182,212,0.045) 1px, transparent 1px)
          `,
          backgroundSize: '70px 70px',
          maskImage: 'radial-gradient(ellipse at center, black 10%, transparent 85%)'
        }}
      />

      {/* Cyan glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/3 top-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-[#06B6D4]/[0.06] blur-[110px]"
      />

      {/* Main content */}
      <div className="mx-auto flex w-full max-w-7xl flex-col px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          {/* Left: introduction */}
          <div className="order-1 max-w-[650px]">
            <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.025] px-4 py-2 font-mono text-xs text-slate-300">
              <span className="h-2 w-2 rounded-full bg-[#06B6D4] shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
              Full-Stack & Shopify Developer
            </div>

            <h1 className="text-[clamp(2.5rem,4vw,4.2rem)] font-bold leading-[1.13] tracking-[-0.045em]">
              I turn ideas
              <br />
              into real{' '}
              <span className="relative inline-block align-bottom">
                {/* Reserve space to prevent layout shifts */}
                <span className="invisible">web experiences.|</span>

                {/* Animated text */}
                <span className="absolute inset-0 whitespace-nowrap">
                  <TypingText text="web experiences." />
                </span>
              </span>
            </h1>

            <p className="mt-5 font-mono text-sm text-slate-400 md:text-base">
              MERN Stack
              <span className="mx-2 text-[#06B6D4]">{'//'}</span>
              Next.js
              <span className="mx-2 text-[#06B6D4]">{'//'}</span>
              Shopify
            </p>

            <p className="mt-5 max-w-[540px] text-base leading-7 text-slate-400">
              I build modern web applications and e-commerce experiences with clean code, thoughtful
              design, and a focus on performance.
            </p>

            {/* Action buttons */}
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-[#06B6D4] px-6 font-semibold text-[#061018] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#22D3EE]"
              >
                View My Work
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg border border-[#06B6D4]/70 px-6 font-medium text-[#06B6D4] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#06B6D4]/10"
              >
                Get In Touch
              </Link>
            </div>

            {/* Social icons */}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  title={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-[#06B6D4]/60 hover:bg-[#06B6D4]/10 hover:text-[#06B6D4]"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Right: developer code window */}
          <div className="order-2 flex justify-center lg:justify-end">
            <CodeEditor />
          </div>
        </div>

        {/* Scroll hint */}

        {/* Scroll indicator */}
        <a
          href="#about"
          aria-label="Scroll to About section"
          className="group mt-8 flex w-fit items-center justify-center gap-3 self-center font-mono text-[11px] tracking-[0.18em] text-slate-500 transition-colors hover:text-[#06B6D4]"
        >
          <span>SCROLL TO EXPLORE</span>

          <ArrowDown
            size={16}
            className="animate-bounce text-[#06B6D4] motion-reduce:animate-none"
          />
        </a>
      </div>
    </section>
  );
}
