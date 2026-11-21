'use client';

import { useEffect, useRef, type MouseEvent } from 'react';
import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import TypingText from '../typing-text';
import LiveCodeEditor from './live-code-editor';

// Keep these URLs as supplied in the existing project.
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
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // No entrance/scroll effects if the visitor prefers reduced motion.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const ctx = gsap.context(() => {
      const entrance = gsap.timeline({
        defaults: { ease: 'power3.out' }
      });

      // Calm, carefully staggered entrance — preserve the existing layout.
      entrance
        .from('[data-hero-badge]', {
          y: 20,
          autoAlpha: 0,
          duration: 0.65
        })
        .from(
          '[data-hero-line]',
          { yPercent: 115, autoAlpha: 0, duration: 0.94, stagger: 0.14 },
          '-=0.28'
        )
        .from(
          '[data-hero-stack]',
          { y: 16, autoAlpha: 0, duration: 0.65 },
          '-=0.45'
        )
        .from(
          '[data-hero-description]',
          { y: 18, autoAlpha: 0, duration: 0.70 },
          '-=0.40'
        )
        .from(
          '[data-hero-action]',
          { y: 18, autoAlpha: 0, duration: 0.65, stagger: 0.12 },
          '-=0.43'
        )
        .from(
          '[data-hero-social]',
          { y: 12, autoAlpha: 0, duration: 0.55, stagger: 0.08 },
          '-=0.37'
        )
        .from(
          '[data-hero-editor-entrance]',
          {
            x: 22,
            y: 24,
            autoAlpha: 0,
            scale: 0.965,
            duration: 1.1,
            ease: 'power2.out'
          },
          0.45
        )
        .from(
          '[data-hero-scroll-cue]',
          { y: 12, autoAlpha: 0, duration: 0.55 },
          '-=0.22'
        );

      // The wheel travels down inside the mouse, then gently loops.
      gsap.fromTo(
        '[data-hero-mouse-wheel]',
        { y: 0, opacity: 1 },
        {
          y: 12,
          opacity: 0,
          duration: 1.05,
          ease: 'power2.inOut',
          repeat: -1,
          repeatDelay: 0.45
        }
      );

      // Very subtle float. This is applied to a nested element so it does
      // not conflict with the entrance and scroll transforms above.
      gsap.to('[data-hero-editor-float]', {
        y: -5,
        duration: 4.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1.6
      });

      // Motion exists only on desktop. There is NO pin, scroll lock,
      // spacer insertion, or artificial page height.
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.to('[data-hero-intro]', {
          y: -22,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
            invalidateOnRefresh: true
          }
        });
        gsap.to('[data-hero-editor-scroll]', {
          y: 24,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
            invalidateOnRefresh: true
          }
        });
      });

      // Scope the matchMedia rules to the same GSAP context for cleanup.
      return () => mm.revert();
    }, section);

    return () => ctx.revert();
  }, []);

  // Smooth GSAP scroll to the real first section, including fixed-header offset.
  // Unlike a native #hash link, the browser doesn't jump before the animation.
  function scrollToProjects(event: MouseEvent<HTMLAnchorElement>) {
    const target = document.getElementById('selected-work');
    if (!target) return;
    event.preventDefault();

    const header = document.querySelector('header');
    const offset = Math.max(0, header?.getBoundingClientRect().bottom ?? 96) + 16;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      window.scrollTo({ top: Math.max(0, window.scrollY + target.getBoundingClientRect().top - offset), behavior: 'instant' });
      window.history.replaceState(null, '', '#selected-work');
      return;
    }

    gsap.registerPlugin(ScrollToPlugin);
    gsap.killTweensOf(window);
    gsap.to(window, {
      scrollTo: { y: target, offsetY: offset, autoKill: true },
      duration: 1.25,
      ease: 'power2.inOut',
      onComplete: () => window.history.replaceState(null, '', '#selected-work')
    });
  }

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[calc(100svh-7rem)] items-center overflow-hidden bg-[#050B12] text-white light:bg-[#F7FAFC] light:text-[#122638]"
    >
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
      <div className="mx-auto flex w-full max-w-7xl flex-col px-5 pb-6 pt-8 sm:px-8 sm:pb-8 lg:px-10 lg:py-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          {/* Left: Introduction */}
          <div data-hero-intro className="order-1 max-w-[650px]">
            {/* Developer badge */}
            <div
              data-hero-badge
              className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.025] px-4 py-2 font-mono text-xs text-slate-300 light:border-[#CEDBE6] light:bg-[#EDF4F8] light:text-[#385268]"
            >
              <span className="h-2 w-2 rounded-full bg-[#06B6D4] shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
              Full-Stack &amp; Shopify Developer
            </div>

            {/* Reveal each line through its own overflow-hidden mask. */}
            <h1 className="text-[clamp(2.2rem,4vw,4.2rem)] font-bold leading-[1.13] tracking-[-0.045em]">
              <span className="block overflow-hidden">
                <span data-hero-line className="block">
                  I turn ideas
                </span>
              </span>
              <span className="block overflow-hidden">
                <span data-hero-line className="block">
                  into real
                </span>
              </span>
              <span className="relative block overflow-hidden text-[#06B6D4] light:text-[#087F99]">
                <span data-hero-line className="relative block min-h-[1.13em]">
                  {/* Reserve space for the longest typing phrase. */}
                  <span aria-hidden="true" className="invisible block">
                    e-commerce stores.|
                  </span>
                  <span className="absolute inset-0">
                    <TypingText />
                  </span>
                </span>
              </span>
            </h1>

            {/* Technology stack */}
            <p data-hero-stack className="mt-5 font-mono text-sm text-slate-400 md:text-base light:text-[#526679]">
              MERN Stack
              <span className="mx-2 text-[#06B6D4]">{'//'}</span>
              Next.js
              <span className="mx-2 text-[#06B6D4]">{'//'}</span>
              Shopify
            </p>

            {/* Description */}
            <p
              data-hero-description
              className="mt-5 max-w-[540px] text-base leading-7 text-slate-400 light:text-[#526679]"
            >
              I build modern web applications and e-commerce experiences with clean code, thoughtful
              design, and a focus on performance.
            </p>

            {/* Action buttons */}
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                data-hero-action
                href="/projects"
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-[#06B6D4] px-6 font-semibold text-[#061018] transition-colors duration-300 hover:bg-[#22D3EE]"
              >
                View My Work
                <ArrowRight size={18} />
              </Link>
              <Link
                data-hero-action
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-[#06B6D4]/70 px-6 font-medium text-[#06B6D4] transition-colors duration-300 hover:bg-[#06B6D4]/10 light:text-[#087F99]"
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
                    data-hero-social
                    key={label}
                    href={href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    aria-label={label}
                    title={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-slate-400 transition-colors duration-300 hover:border-[#06B6D4]/60 hover:bg-[#06B6D4]/10 hover:text-[#06B6D4] light:border-[#CEDBE6] light:bg-white light:text-[#526679] light:hover:text-[#087F99]"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right: Live code editor — original component stays untouched. */}
          <div data-hero-editor-scroll className="order-2 flex justify-center lg:justify-end">
            <div data-hero-editor-entrance className="w-full">
              <div data-hero-editor-float className="w-full">
                <LiveCodeEditor />
              </div>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
}
