'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Mail } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Personal, editorial sign-off for the homepage.
 * Replaces the oversized agency-style Contact CTA panel.
 * Compatible with the site's existing `light:` Tailwind variant.
 */
export default function ContactCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: section,
            start: 'top 82%',
            once: true
          }
        })
        .fromTo(
          '[data-hello-eyebrow]',
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.55 }
        )
        .fromTo(
          '[data-hello-title]',
          { autoAlpha: 0, y: 28 },
          { autoAlpha: 1, y: 0, duration: 0.85 },
          '-=0.3'
        )
        .fromTo(
          '[data-hello-copy]',
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.7 },
          '-=0.5'
        )
        .fromTo(
          '[data-hello-link]',
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.12 },
          '-=0.35'
        );

      gsap.fromTo(
        '[data-hello-rule]',
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 1.25,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: section,
            start: 'top 82%',
            once: true
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact-cta"
      ref={sectionRef}
      aria-labelledby="contact-cta-heading"
      className="relative overflow-hidden bg-[#050B12] py-20 text-white light:bg-[#F7FAFC] light:text-[#122638] sm:py-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Light visual separator; no card, border box, or extra footer strip. */}
        <div
          data-hello-rule
          aria-hidden="true"
          className="mb-12 h-px w-full bg-white/[0.10] light:bg-[#DCE6EC] sm:mb-16"
        />

        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(300px,0.9fr)] lg:gap-20">
          <div>
            <p
              data-hello-eyebrow
              className="mb-5 flex items-center gap-3 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[#06B6D4] sm:text-[11px]"
            >
              <span aria-hidden="true" className="h-px w-7 bg-[#06B6D4]" />
              Before you go
            </p>

            <h2
              id="contact-cta-heading"
              data-hello-title
              className="max-w-[610px] text-[clamp(1.9rem,3.2vw,3rem)] font-semibold leading-[1.17] tracking-[-0.055em]"
            >
              Thanks for stopping by.
              <span className="mt-1 block text-[#06B6D4]">Say hello sometime.</span>
            </h2>
          </div>

          <div className="max-w-[445px] lg:pb-1">
            <p
              data-hello-copy
              className="max-w-[405px] text-[14px] leading-[1.9] text-slate-400 light:text-[#526679] sm:text-[15px]"
            >
              Want to talk code, share an idea, or just say hi? I&apos;m always happy to hear from
              people who enjoy building things for the web.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-4">
              <a
                data-hello-link
                href="mailto:mohammed.m.elalimy@gmail.com"
                className="group inline-flex items-center gap-2 border-b border-[#06B6D4]/45 pb-1.5 text-sm font-semibold text-[#06B6D4] transition-colors duration-300 hover:border-[#06B6D4] hover:text-[#67E8F9] light:hover:text-[#07849A] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#06B6D4]"
              >
                <Mail aria-hidden="true" size={16} />
                Drop me a message
                <ArrowUpRight
                  aria-hidden="true"
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>

              <Link
                data-hello-link
                href="/contact"
                className="group inline-flex items-center gap-1.5 pb-1.5 text-[13px] text-slate-400 transition-colors duration-300 hover:text-white light:text-[#607487] light:hover:text-[#122638] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#06B6D4]"
              >
                Contact page
                <ArrowUpRight
                  aria-hidden="true"
                  size={13}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
