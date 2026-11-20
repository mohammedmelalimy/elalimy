import Link from 'next/link';
import { ArrowDown, ArrowRight, Mail } from 'lucide-react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';

import TypingText from '../typing-text';
import LiveCodeEditor from './live-code-editor';

// Social links
const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/mohammedmelalimy',
    icon: FaGithub
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/mohammed-elalimy-aa2556287/',
    icon: FaLinkedinIn
  },
  {
    label: 'Email',
    href: 'mailto:mohammed.m.elalimy@gmail.com',
    icon: Mail
  }
];

export default function HeroSection() {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-7rem)] items-center overflow-hidden bg-[#050B12] text-white">
      {/* Grid background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(6,182,212,0.045) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(6,182,212,0.045) 1px,
              transparent 1px
            )
          `,
          backgroundSize: '70px 70px',
          maskImage: 'radial-gradient(ellipse at center, black 10%, transparent 85%)'
        }}
      />

      {/* Cyan ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/3 top-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-[#06B6D4]/[0.06] blur-[110px]"
      />

      {/* Main container */}
      <div className="mx-auto flex w-full max-w-7xl flex-col px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          {/* Left: Introduction */}
          <div className="order-1 max-w-[650px]">
            {/* Developer badge */}
            <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.025] px-4 py-2 font-mono text-xs text-slate-300">
              <span className="h-2 w-2 rounded-full bg-[#06B6D4] shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
              Full-Stack &amp; Shopify Developer
            </div>

            {/* Animated heading */}
            <h1 className="text-[clamp(2.2rem,4vw,4.2rem)] font-bold leading-[1.13] tracking-[-0.045em]">
              <span className="block">I turn ideas</span>

              <span className="block">into real</span>

              <span className="relative block min-h-[1.13em] text-[#06B6D4]">
                {/* Reserve space for longest phrase */}
                <span aria-hidden="true" className="invisible block">
                  e-commerce stores.|
                </span>

                {/* Animated heading text */}
                <span className="absolute inset-0">
                  <TypingText />
                </span>
              </span>
            </h1>

            {/* Technology stack */}
            <p className="mt-5 font-mono text-sm text-slate-400 md:text-base">
              MERN Stack
              <span className="mx-2 text-[#06B6D4]">{'//'}</span>
              Next.js
              <span className="mx-2 text-[#06B6D4]">{'//'}</span>
              Shopify
            </p>

            {/* Description */}
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
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-[#06B6D4]/70 px-6 font-medium text-[#06B6D4] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#06B6D4]/10"
              >
                Get In Touch
              </Link>
            </div>

            {/* Social icons */}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => {
                const isExternal = href.startsWith('http');

                return (
                  <a
                    key={label}
                    href={href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    aria-label={label}
                    title={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-[#06B6D4]/60 hover:bg-[#06B6D4]/10 hover:text-[#06B6D4]"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right: Live code editor */}
          <div className="order-2 flex justify-center lg:justify-end">
            <LiveCodeEditor />
          </div>
        </div>

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
