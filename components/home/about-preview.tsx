'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * A short, personal introduction on the homepage.
 * The full story (education, courses, stack, experience and internships)
 * belongs on /about, not in this preview.
 */
export default function AboutPreview() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-about-heading]',
        { y: 28, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 82%',
            once: true
          }
        }
      );

      gsap.fromTo(
        '[data-about-copy]',
        { y: 20, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.75,
          stagger: 0.13,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 76%',
            once: true
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about-preview"
      ref={sectionRef}
      aria-labelledby="about-preview-title"
      className="relative isolate overflow-hidden bg-[#050B12] py-20 text-white light:bg-[#F7FAFC] light:text-[#122638] sm:py-24 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#06B6D4]/25 to-transparent"
      />

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid items-center gap-9 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 xl:gap-24">
          <div data-about-heading>
            <p className="mb-5 flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#06B6D4]">
              <span className="h-px w-8 bg-[#06B6D4]" />
              A Bit About Me
            </p>

            <h2
              id="about-preview-title"
              className="max-w-[490px] text-[clamp(2.1rem,3.65vw,3.55rem)] font-bold leading-[1.12] tracking-[-0.055em]"
            >
              More than
              <br />
              <span className="text-[#06B6D4]">just the code.</span>
            </h2>
          </div>

          <div className="max-w-[630px]">
            <p
              data-about-copy
              className="text-[clamp(1.2rem,1.9vw,1.6rem)] font-medium leading-[1.5] tracking-[-0.03em] text-slate-100 light:text-[#173044]"
            >
              Hey, I&apos;m <span className="text-[#06B6D4]">Mohammed</span> — a software engineer
              who enjoys building things for the web.
            </p>

            <p
              data-about-copy
              className="mt-4 max-w-[570px] text-[14px] leading-[1.9] text-slate-400 light:text-[#526679] sm:text-[15px]"
            >
              My background is in Computers &amp; Control Engineering. Today, I work with full-stack
              development and Shopify, always learning and paying attention to the details that make
              a difference.
            </p>

            <Link
              data-about-copy
              href="/about"
              className="group mt-7 inline-flex w-fit items-center gap-2 border-b border-[#06B6D4]/45 pb-1.5 text-sm font-medium text-[#06B6D4] transition-colors hover:border-[#06B6D4] hover:text-[#67E8F9] light:hover:text-[#07849A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#06B6D4]"
            >
              More about me
              <ArrowUpRight
                aria-hidden="true"
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
