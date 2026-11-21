'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Code2, ShoppingBag, Sparkles, Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const expertise = [
  {
    number: '01',
    label: 'DEVELOPMENT',
    title: 'Full-Stack Development',
    description:
      'Fast, scalable web applications, custom dashboards, and digital platforms built from frontend to backend.',
    tools: ['React', 'Next.js', 'TypeScript', 'Node.js'],
    Icon: Code2
  },
  {
    number: '02',
    label: 'E-COMMERCE',
    title: 'Shopify Development',
    description:
      'Custom Shopify storefronts, flexible theme sections, and integrations that turn designs into seamless shopping experiences.',
    tools: ['Shopify', 'Liquid', 'JavaScript', 'Theme Development'],
    Icon: ShoppingBag
  }
] as const;

export default function MyExpertise() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Different from Selected Work: the intro comes from the left,
      // and each expertise row enters independently from the right.
      gsap.fromTo(
        '[data-expertise-intro]',
        { x: -28, autoAlpha: 0 },
        {
          x: 0,
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

      gsap.utils.toArray<HTMLElement>('[data-expertise-card]').forEach((card) => {
        gsap.fromTo(
          card,
          { x: 28, autoAlpha: 0 },
          {
            x: 0,
            autoAlpha: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              once: true
            }
          }
        );
      });

      gsap.fromTo(
        '[data-expertise-footer]',
        { y: 16, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.75,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '[data-expertise-footer]',
            start: 'top 94%',
            once: true
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="expertise"
      ref={sectionRef}
      aria-labelledby="expertise-heading"
      className="relative isolate overflow-hidden bg-[#050B12] py-20 text-white light:bg-[#F7FAFC] light:text-[#122638] sm:py-24 lg:py-28"
    >
      {/* Quiet divider from Selected Work */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#06B6D4]/20 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-56 top-1/4 -z-10 h-[420px] w-[420px] rounded-full bg-[#06B6D4]/[0.035] blur-[120px] light:bg-[#06B6D4]/[0.045]"
      />

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid items-start gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:gap-16 xl:gap-24">
          {/* Left: editorial introduction */}
          <div data-expertise-intro className="max-w-[460px] lg:pt-3">
            <p className="mb-5 flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#06B6D4]">
              <span className="h-px w-8 bg-[#06B6D4]" />
              What I Do
            </p>

            <h2
              id="expertise-heading"
              className="max-w-[480px] text-[clamp(2.15rem,3.6vw,3.5rem)] font-bold leading-[1.12] tracking-[-0.05em]"
            >
              Building for the web,
              <span className="block text-[#06B6D4]">end to end.</span>
            </h2>

            <p className="mt-5 max-w-[410px] text-sm leading-7 text-slate-400 light:text-[#526679] sm:text-[15px]">
              From full-stack platforms to custom e-commerce stores, I focus on clean
              implementation, meaningful interactions, and experiences that work beautifully on
              every screen.
            </p>

            <Link
              href="/contact"
              className="group mt-7 inline-flex items-center gap-2 border-b border-[#06B6D4]/40 pb-2 text-sm font-medium text-[#06B6D4] transition-colors duration-300 hover:border-[#06B6D4] hover:text-[#67E8F9] light:hover:text-[#07849A]"
            >
              Let's work together
              <ArrowUpRight
                size={16}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>

          {/* Right: deliberately compact service rows, not oversized cards */}
          <div className="grid gap-4">
            {expertise.map(({ number, label, title, description, tools, Icon }) => (
              <article
                key={number}
                data-expertise-card
                className="group relative overflow-hidden rounded-[20px] border border-white/[0.09] bg-[#0B121C] p-5 transition-colors duration-300 hover:border-[#06B6D4]/35 hover:bg-[#0E1824] light:border-[#DBE5EC] light:bg-white light:hover:border-[#92D9E6] light:hover:bg-[#FCFEFF] sm:p-7"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-y-5 left-0 w-[2px] origin-top scale-y-0 rounded-r-full bg-[#06B6D4] transition-transform duration-500 group-hover:scale-y-100"
                />

                <div className="flex items-start gap-4 sm:gap-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#06B6D4]/20 bg-[#06B6D4]/[0.075] text-[#06B6D4] light:bg-[#06B6D4]/[0.08]">
                    <Icon size={21} strokeWidth={1.8} aria-hidden="true" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#06B6D4]">
                        {number} / {label}
                      </span>
                      <ArrowUpRight
                        size={16}
                        aria-hidden="true"
                        className="text-slate-600 transition-colors duration-300 group-hover:text-[#06B6D4] light:text-[#8197A6]"
                      />
                    </div>

                    <h3 className="mt-2 text-[19px] font-semibold leading-snug tracking-[-0.035em] sm:text-[22px]">
                      {title}
                    </h3>
                    <p className="mt-2 max-w-[520px] text-[13px] leading-[1.8] text-slate-400 light:text-[#526679] sm:text-sm">
                      {description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {tools.map((tool) => (
                        <span
                          key={tool}
                          className="rounded-full border border-white/[0.09] bg-white/[0.025] px-2.5 py-1 font-mono text-[10px] text-slate-400 light:border-[#DFE7EC] light:bg-[#F5F8FA] light:text-[#546C7E]"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Small supporting line: keeps the section grounded rather than adding a third big card. */}
        <div
          data-expertise-footer
          className="mt-12 flex flex-col gap-4 border-t border-white/[0.08] pt-6 light:border-[#DCE7EE] sm:mt-14 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-2.5 text-sm font-medium text-slate-300 light:text-[#38566B]">
            <Sparkles size={16} className="text-[#06B6D4]" aria-hidden="true" />
            The details matter, too.
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-400 light:text-[#607789]">
            {['Responsive by default', 'Smooth interactions', 'Performance focused'].map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5">
                <Check size={13} className="text-[#06B6D4]" aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
