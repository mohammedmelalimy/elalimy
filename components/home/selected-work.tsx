'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type Project = {
  id: string;
  index: string;
  title: string;
  category: string;
  description: string;
  stack: string[];
  art: 'sapihive' | 'dermalyze' | 'aplus';
  /** Add a screenshot to public/projects and set this path, e.g. '/projects/sapihive.webp'. */
  screenshot?: string;
  /** Only set a live URL after confirming the project is published. */
  liveUrl?: string;
};

const featuredProject: Project = {
  id: 'sapihive',
  index: '01',
  title: 'SapiHive',
  category: 'Corporate Website / Workforce',
  description:
    'A bilingual digital experience that brings five specialist workforce services together under one distinctive identity.',
  stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP'],
  art: 'sapihive',
  // screenshot: '/projects/sapihive.webp',
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
    art: 'dermalyze',
    liveUrl: 'https://dermlyze.com/'
    // screenshot: '/projects/dermalyze.webp',
  },
  {
    id: 'aplus',
    index: '03',
    title: 'A Plus',
    category: 'E-commerce / Shopify',
    description:
      'A custom storefront featuring engaging product showcases, smooth interactions, and a strong visual identity.',
    stack: ['Shopify', 'Liquid', 'JavaScript', 'GSAP'],
    art: 'aplus',
    // screenshot: '/projects/aplus.webp',
    liveUrl: 'https://aplus-egy.com/'
  }
];

const honeycombCells = [
  { x: 95, y: 40 },
  { x: 198, y: 40 },
  { x: 147, y: 130 },
  { x: 250, y: 130 },
  { x: 95, y: 220 },
  { x: 198, y: 220 },
  { x: 301, y: 220 }
];

/**
 * These are code-built editorial covers, NOT screenshots of the live websites.
 * When real screenshots are ready, uncomment each `screenshot` above.
 */
function ProjectArtwork({ project }: { project: Project }) {
  return (
    <div className="relative h-full min-h-[270px] w-full overflow-hidden sm:min-h-[320px]">
      {project.art === 'sapihive' && (
        <div className="relative h-full min-h-[270px] overflow-hidden bg-[#241B3B] text-[#F5F0E7] sm:min-h-[320px]">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage: 'radial-gradient(rgba(255,255,255,.26) 1px, transparent 1px)',
              backgroundSize: '19px 19px'
            }}
          />
          <div
            aria-hidden="true"
            className="absolute -right-16 top-0 h-72 w-72 rounded-full bg-[#A48AC9]/20 blur-[90px]"
          />
          <svg
            aria-hidden="true"
            viewBox="0 0 460 400"
            className="absolute -right-14 top-1/2 h-[350px] w-[400px] -translate-y-1/2 opacity-80 sm:right-0 sm:h-[400px] sm:w-[460px]"
          >
            {honeycombCells.map(({ x, y }, i) => (
              <polygon
                key={`${x}-${y}`}
                points={`${x + 46},${y} ${x + 92},${y + 27} ${x + 92},${y + 81} ${x + 46},${y + 108} ${x},${y + 81} ${x},${y + 27}`}
                stroke={i === 3 ? '#F3CB55' : '#A993C9'}
                strokeWidth={i === 3 ? 3 : 1.5}
                fill={i === 3 ? '#F3CB55' : 'none'}
                fillOpacity={i === 3 ? 0.92 : 0}
              />
            ))}
          </svg>
          <div className="relative z-10 flex h-full min-h-[270px] flex-col justify-between p-6 sm:min-h-[320px] sm:p-9 lg:p-11">
            <div className="flex items-center gap-2 text-xl font-extrabold tracking-[-0.06em] sm:text-2xl">
              <span className="text-[#F3CB55]">⬡</span> SapiHive
            </div>
            <div className="max-w-[310px]">
              <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-[#E6D8FA]/75">
                Workforce-as-a-Service
              </p>
              <p className="text-[clamp(1.8rem,3.4vw,3.25rem)] font-semibold leading-[1.03] tracking-[-0.055em]">
                People.
                <br />
                Potential.
                <br />
                <span className="text-[#F3CB55]">Progress.</span>
              </p>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#E6D8FA]/65">
              Human intelligence. Organized like a hive.
            </p>
          </div>
        </div>
      )}

      {project.art === 'dermalyze' && (
        <div className="relative h-full min-h-[270px] overflow-hidden bg-[#E9EEE8] text-[#183E37] sm:min-h-[320px]">
          <div
            aria-hidden="true"
            className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[#9FBDB0]/40 blur-[70px]"
          />
          <div
            aria-hidden="true"
            className="absolute -right-8 top-1/2 h-60 w-60 -translate-y-1/2 rounded-full border border-[#A9C2B4]/70 sm:right-8 sm:h-72 sm:w-72"
          />
          <div
            aria-hidden="true"
            className="absolute right-2 top-1/2 h-44 w-44 -translate-y-1/2 rounded-full border border-[#A9C2B4]/80 sm:right-14 sm:h-60 sm:w-60"
          />
          <div
            aria-hidden="true"
            className="absolute right-14 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-gradient-to-br from-white/90 via-[#BED4C6] to-[#5E9184] shadow-[0_18px_55px_rgba(44,86,73,0.17)] sm:right-28 sm:h-32 sm:w-32"
          />
          <div className="relative z-10 flex h-full min-h-[270px] flex-col justify-between p-6 sm:min-h-[320px] sm:p-9">
            <span className="text-xl font-semibold tracking-[-0.06em] sm:text-2xl">
              dermalyze<span className="text-[#568E7C]">.</span>
            </span>
            <div className="max-w-[250px]">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#4A7569]">
                Dermatological technology
              </p>
              <p className="text-[clamp(1.7rem,3vw,2.6rem)] font-semibold leading-[1.08] tracking-[-0.055em]">
                See beyond
                <br />
                the surface.
              </p>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.13em] text-[#64867B]">
              Technology / Partnership / Growth
            </span>
          </div>
        </div>
      )}

      {project.art === 'aplus' && (
        <div className="relative h-full min-h-[270px] overflow-hidden bg-[#23253C] text-white sm:min-h-[320px]">
          <div
            aria-hidden="true"
            className="absolute -right-12 -top-20 h-72 w-72 rounded-full bg-[#F05A28] blur-[0px] sm:-right-5 sm:h-80 sm:w-80"
          />
          <div
            aria-hidden="true"
            className="absolute right-12 top-8 h-64 w-64 rounded-full border border-white/20 sm:right-20 sm:h-72 sm:w-72"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-[-70px] right-[-48px] h-56 w-56 rounded-full bg-[#E8BA39] sm:h-64 sm:w-64"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage:
                'linear-gradient(120deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
              backgroundSize: '42px 42px'
            }}
          />
          <div className="relative z-10 flex h-full min-h-[270px] flex-col justify-between p-6 sm:min-h-[320px] sm:p-9">
            <span className="text-2xl font-extrabold tracking-[-0.06em] sm:text-3xl">
              A<span className="text-[#F7A77F]">+</span>
            </span>
            <div>
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.23em] text-white/65">
                Built for the everyday spark
              </p>
              <p className="max-w-[300px] text-[clamp(2rem,3.6vw,3.3rem)] font-extrabold leading-[1.04] tracking-[-0.055em]">
                LIGHT UP
                <br />
                THE DAY.
              </p>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/70">
              A Plus / Digital Storefront
            </span>
          </div>
        </div>
      )}

      {project.screenshot && (
        <Image
          src={project.screenshot}
          alt={`${project.title} website screenshot`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 58vw"
          className="relative z-20 object-cover object-top transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.035]"
        />
      )}
    </div>
  );
}

function TechTags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full border border-white/[0.09] bg-white/[0.035] light:border-[#D4E0E8] light:bg-[#F0F5F8] px-3 py-1.5 font-mono text-[10px] tracking-wide text-slate-400 light:text-[#526679] sm:text-[11px]"
        >
          {tag}
        </span>
      ))}
    </div>
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
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 78%', once: true }
        }
      );

      gsap.fromTo(
        '[data-work-heading-detail]',
        { y: 22, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 78%', once: true }
        }
      );

      const cards = gsap.utils.toArray<HTMLElement>('[data-work-card]');
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 54, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.95,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 87%', once: true }
          }
        );

        const artwork = card.querySelector('[data-work-art]');
        if (artwork) {
          gsap.fromTo(
            artwork,
            { scale: 1.07 },
            {
              scale: 1,
              duration: 1.3,
              ease: 'power2.out',
              scrollTrigger: { trigger: card, start: 'top 87%', once: true }
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="selected-work"
      ref={sectionRef}
      aria-labelledby="selected-work-title"
      className="relative isolate overflow-hidden bg-[#050B12] py-24 text-white sm:py-28 lg:py-32 light:bg-[#F7FAFC] light:text-[#122638]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#06B6D4]/20 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-44 top-48 -z-10 h-[420px] w-[420px] rounded-full bg-[#06B6D4]/[0.025] blur-[110px]"
      />

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Editorial heading */}
        <div className="mb-11 flex flex-col justify-between gap-7 sm:mb-14 lg:flex-row lg:items-end">
          <div>
            <p
              data-work-heading-detail
              className="mb-5 flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-[#06B6D4]"
            >
              <span className="h-px w-8 bg-[#06B6D4]" />
              Selected Work
            </p>

            <div className="overflow-hidden pb-1">
              <h2
                id="selected-work-title"
                data-work-heading
                className="text-[clamp(2.5rem,5vw,4.75rem)] font-bold leading-[1.06] tracking-[-0.055em]"
              >
                Ideas turned into <span className="text-[#06B6D4]">reality.</span>
              </h2>
            </div>

            <p
              data-work-heading-detail
              className="mt-5 max-w-xl text-sm leading-7 text-slate-400 light:text-[#526679] sm:text-base"
            >
              A selection of real-world projects — built with purpose, performance, and attention to
              detail.
            </p>
          </div>

          <Link
            data-work-heading-detail
            href="/projects"
            className="group inline-flex w-fit shrink-0 items-center gap-2.5 border-b border-white/20 light:border-[#BCD1DE] pb-2 text-sm font-medium text-white light:text-[#122638] transition-colors hover:border-[#06B6D4] hover:text-[#06B6D4]"
          >
            View all projects
            <ArrowUpRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        {/* Featured project — deliberately bigger than the other cards. */}
        <article
          data-work-card
          className="group grid overflow-hidden rounded-[24px] border border-white/[0.09] bg-[#0B121C] light:border-[#DBE5EC] light:bg-white transition-colors duration-300 hover:border-[#06B6D4]/25 lg:grid-cols-[0.85fr_1.15fr] lg:rounded-[28px]"
        >
          <div className="flex flex-col justify-between p-6 sm:p-9 lg:p-11">
            <div className="flex items-center justify-between gap-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#06B6D4]">
                Featured Project / 01
              </span>
              <ArrowUpRight aria-hidden="true" size={22} className="text-slate-600 light:text-[#8295A4]" />
            </div>

            <div className="py-12 lg:py-9">
              <p className="mb-4 font-mono text-xs uppercase tracking-widest text-slate-500 light:text-[#657B8B]">
                {featuredProject.category}
              </p>
              <h3 className="text-[clamp(2.4rem,4vw,4.2rem)] font-bold leading-none tracking-[-0.06em]">
                {featuredProject.title}
              </h3>
              <p className="mt-5 max-w-md text-sm leading-7 text-slate-400 light:text-[#526679] sm:text-base">
                {featuredProject.description}
              </p>
            </div>

            <TechTags tags={featuredProject.stack} />
          </div>

          <div className="relative min-h-[300px] overflow-hidden border-t border-white/[0.07] light:border-[#E2EBF0] lg:min-h-[440px] lg:border-l lg:border-t-0">
            <div
              data-work-art
              className="absolute inset-0 h-full w-full origin-center will-change-transform"
            >
              <ProjectArtwork project={featuredProject} />
            </div>
          </div>
        </article>

        {/* Two supporting projects. */}
        <div className="mt-5 grid gap-5 md:grid-cols-2 sm:mt-6 sm:gap-6">
          {otherProjects.map((project) => (
            <article
              key={project.id}
              data-work-card
              className="group overflow-hidden rounded-[24px] border border-white/[0.09] bg-[#0B121C] light:border-[#DBE5EC] light:bg-white transition-colors duration-300 hover:border-[#06B6D4]/25 lg:rounded-[28px]"
            >
              <div className="relative h-[270px] overflow-hidden sm:h-[320px]">
                <div
                  data-work-art
                  className="absolute inset-0 h-full w-full origin-center will-change-transform"
                >
                  <ProjectArtwork project={project} />
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#06B6D4]">
                    {project.index} / {project.category}
                  </span>
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${project.title} live website`}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 light:border-[#C9DAE4] text-slate-300 transition-colors hover:border-[#06B6D4] hover:text-[#06B6D4]"
                    >
                      <ExternalLink size={16} />
                    </a>
                  ) : (
                    <ArrowUpRight
                      aria-hidden="true"
                      size={19}
                      className="shrink-0 text-slate-600 light:text-[#8295A4]"
                    />
                  )}
                </div>

                <h3 className="text-3xl font-semibold tracking-[-0.05em] sm:text-[2rem]">
                  {project.title}
                </h3>
                <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-400 light:text-[#526679] sm:leading-7">
                  {project.description}
                </p>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-5 border-t border-white/[0.07] light:border-[#E2EBF0] pt-5">
                  <TechTags tags={project.stack} />
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#06B6D4] transition-colors hover:text-[#67E8F9]"
                    >
                      Live site <ArrowRight size={14} />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Section-to-page transition */}
        <div className="mt-10 flex justify-center sm:mt-12 lg:hidden">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 light:border-[#C9DAE4] px-6 py-3 text-sm font-semibold text-white light:text-[#122638] transition-colors hover:border-[#06B6D4]/50 hover:text-[#06B6D4]"
          >
            Explore all projects <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
