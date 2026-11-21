'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type Project = {
  id: string;
  index: string;
  title: string;
  category: string;
  description: string;
  stack: string[];
  screenshot: string;
  screenshotMobile: string;
  liveUrl: string;
};

const featuredProject: Project = {
  id: 'sapihive',
  index: '01',
  title: 'SapiHive',
  category: 'Corporate Website / Workforce',
  description:
    'A bilingual digital experience bringing five specialist workforce services together under one distinctive identity.',
  stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP'],
  screenshot: '/projects/sapihive-desktop.webp',
  screenshotMobile: '/projects/sapihive-mobile.webp',
  liveUrl: 'https://www.sapihive.com/en'
};

const otherProjects: Project[] = [
  {
    id: 'dermalyze',
    index: '02',
    title: 'Dermalyze',
    category: 'Healthcare / Corporate Website',
    description:
      'A modern experience connecting dermatological technology, device discovery, and business partnerships.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    screenshot: '/projects/dermalyze-desktop.webp',
    screenshotMobile: '/projects/dermalyze-mobile.webp',
    liveUrl: 'https://dermlyze.com/'
  },
  {
    id: 'decoviamaison',
    index: '03',
    title: 'Decovia Maison',
    category: 'Luxury Interiors / Shopify',
    description:
      'An elegant e-commerce experience showcasing curated furniture, Murano lighting, and decorative art.',
    stack: ['Shopify', 'Liquid', 'JavaScript'],
    screenshot: '/projects/decoviamaison-desktop.webp',
    screenshotMobile: '/projects/decoviamaison-mobile.webp',
    liveUrl: 'https://decoviamaison.com/'
  }
];

function ProjectCover({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <div
      className={
        'relative w-full overflow-hidden bg-[#101c2a] ' +
        (featured
          ? 'h-[230px] sm:h-[280px] md:h-full md:min-h-[300px]'
          : 'aspect-[4/3] sm:aspect-auto sm:h-[215px] lg:h-[230px]')
      }
    >
      {/* The mobile cover is designed at 1080 × 810, desktop at 1600 × 1000. */}
      <Image
        src={project.screenshotMobile}
        alt={`${project.title} website preview`}
        fill
        sizes="(max-width: 639px) calc(100vw - 40px), 1px"
        className="object-cover object-top transition-transform duration-700 motion-safe:group-hover:scale-[1.035] sm:hidden"
      />
      <Image
        src={project.screenshot}
        alt=""
        aria-hidden="true"
        fill
        sizes={
          featured
            ? '(min-width: 1024px) 560px, (min-width: 768px) 52vw, (min-width: 640px) 100vw, 1px'
            : '(min-width: 1024px) 520px, (min-width: 640px) 48vw, 1px'
        }
        className="hidden object-cover object-top transition-transform duration-700 motion-safe:group-hover:scale-[1.035] sm:block"
      />
    </div>
  );
}

function TechTags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full border border-white/[0.09] bg-white/[0.035] px-2.5 py-1 font-mono text-[10px] tracking-wide text-slate-400 light:border-[#D4E0E8] light:bg-[#F0F5F8] light:text-[#526679]"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function LiveLink({ project, compact = false }: { project: Project; compact?: boolean }) {
  return (
    <a
      href={project.liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${project.title} live website`}
      className={
        'inline-flex shrink-0 items-center justify-center border border-white/15 text-slate-300 transition-all duration-300 hover:border-[#06B6D4] hover:text-[#06B6D4] light:border-[#C9DAE4] light:text-[#526679] ' +
        (compact ? 'h-8 w-8 rounded-full' : 'gap-2 rounded-lg px-3 py-2 text-xs font-medium')
      }
    >
      {!compact && 'Visit live site'}
      <ExternalLink size={compact ? 15 : 14} />
    </a>
  );
}

export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-work-heading]',
        { yPercent: 105 },
        {
          yPercent: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 80%', once: true }
        }
      );

      gsap.fromTo(
        '[data-work-heading-detail]',
        { y: 18, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.75,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 80%', once: true }
        }
      );

      gsap.utils.toArray<HTMLElement>('[data-work-card]').forEach((card) => {
        gsap.fromTo(
          card,
          { y: 36, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%', once: true }
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="selected-work"
      ref={sectionRef}
      aria-labelledby="selected-work-title"
      className="relative isolate overflow-hidden bg-[#050B12] py-16 text-white light:bg-[#F7FAFC] light:text-[#122638] sm:py-20 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#06B6D4]/20 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-44 top-48 -z-10 h-[360px] w-[360px] rounded-full bg-[#06B6D4]/[0.025] blur-[100px]"
      />

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mb-8 flex flex-col justify-between gap-5 sm:mb-10 md:flex-row md:items-end">
          <div>
            <p
              data-work-heading-detail
              className="mb-3 flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[#06B6D4]"
            >
              <span className="h-px w-7 bg-[#06B6D4]" />
              Selected Work
            </p>
            <div className="overflow-hidden pb-1">
              <h2
                id="selected-work-title"
                data-work-heading
                className="text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.09] tracking-[-0.05em]"
              >
                Ideas turned into <span className="text-[#06B6D4]">reality.</span>
              </h2>
            </div>
            <p
              data-work-heading-detail
              className="mt-3 max-w-xl text-sm leading-6 text-slate-400 light:text-[#526679]"
            >
              A selection of real projects — designed and developed with purpose.
            </p>
          </div>
          <Link
            data-work-heading-detail
            href="/projects"
            className="inline-flex w-fit shrink-0 items-center gap-2 border-b border-white/20 pb-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-[#06B6D4] hover:text-[#06B6D4] light:border-[#BCD1DE] light:text-[#385268]"
          >
            View All Projects <ArrowUpRight size={15} />
          </Link>
        </div>

        {/* Original asymmetric composition: one wide featured card, two smaller cards. */}
        <div className="grid gap-4 sm:gap-5">
          <article
            data-work-card
            className="group grid min-w-0 overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0B121C] transition-colors duration-300 hover:border-[#06B6D4]/35 light:border-[#DBE5EC] light:bg-white md:grid-cols-[0.9fr_1.1fr]"
          >
            {/* On mobile: artwork first; desktop: content left, artwork right. */}
            <div className="order-2 flex min-w-0 flex-col justify-between gap-5 p-5 sm:p-6 md:order-1 lg:p-7">
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#06B6D4]">
                  Featured Project / {featuredProject.index}
                </span>
                <span className="text-slate-500 light:text-[#657B8B]" aria-hidden="true">
                  <ArrowUpRight size={18} />
                </span>
              </div>
              <div>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-wide text-slate-500 light:text-[#657B8B]">
                  {featuredProject.category}
                </p>
                <h3 className="text-[clamp(1.9rem,3vw,2.6rem)] font-bold leading-none tracking-[-0.05em]">
                  {featuredProject.title}
                </h3>
                <p className="mt-3 max-w-[420px] text-[13px] leading-6 text-slate-400 light:text-[#526679] sm:text-sm">
                  {featuredProject.description}
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <TechTags tags={featuredProject.stack} />
                <LiveLink project={featuredProject} />
              </div>
            </div>
            <div className="order-1 min-w-0 overflow-hidden border-b border-white/[0.07] light:border-[#E2EBF0] md:order-2 md:border-b-0 md:border-l">
              <ProjectCover project={featuredProject} featured />
            </div>
          </article>

          <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
            {otherProjects.map((project) => (
              <article
                key={project.id}
                data-work-card
                className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0B121C] transition-colors duration-300 hover:border-[#06B6D4]/35 light:border-[#DBE5EC] light:bg-white"
              >
                <div className="overflow-hidden border-b border-white/[0.07] light:border-[#E2EBF0]">
                  <ProjectCover project={project} />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="min-w-0 truncate font-mono text-[10px] uppercase tracking-[0.12em] text-[#06B6D4]">
                      {project.index} / {project.category}
                    </span>
                    <LiveLink project={project} compact />
                  </div>
                  <div>
                    <h3 className="text-[1.55rem] font-semibold leading-tight tracking-[-0.045em]">
                      {project.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-[13px] leading-[1.55] text-slate-400 light:text-[#526679]">
                      {project.description}
                    </p>
                  </div>
                  <div className="mt-auto border-t border-white/[0.07] pt-3 light:border-[#E2EBF0]">
                    <TechTags tags={project.stack} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
