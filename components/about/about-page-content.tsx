'use client';

import { useEffect, useRef } from 'react';
import { ArrowDown, GraduationCap, MapPin, BriefcaseBusiness, BookOpen, Code2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/* Roles, dates, education, skills and certifications are based on the supplied CV.
   The NTI 97% score and first-place ranking were provided separately by the user. */

type JourneyItem = {
  id: string;
  date: string;
  title: string;
  organization: string;
  location: string;
  kind: 'work' | 'internship' | 'training' | 'education';
  summary: string;
  details: string[];
};

const journey: JourneyItem[] = [
  {
    id: 'bigbee',
    date: 'Apr 2026 — Present',
    title: 'Software Engineer / Web Developer',
    organization: 'BigBee Marketing Agency & Advertising',
    location: 'Cairo, Egypt',
    kind: 'work',
    summary: 'My day-to-day is turning real client requirements into working web experiences.',
    details: [
      'Building Next.js, React, TypeScript and Tailwind websites with reusable components, responsive layouts, routing and SEO metadata.',
      'Connecting REST APIs and creating backend and AI automations with n8n, webhooks and third-party services.',
      'Customizing Shopify and Salla storefronts, product pages, collections and navigation.'
    ]
  },
  {
    id: 'areeb',
    date: 'Jul 2026',
    title: 'Full-Stack Development Intern',
    organization: 'Areeb Technology',
    location: 'Egypt',
    kind: 'internship',
    summary: 'A hands-on opportunity to work across both sides of an application.',
    details: [
      'Developed frontend and backend features with API integrations.',
      'Worked on debugging and improving application functionality.'
    ]
  },
  {
    id: 'nti',
    date: 'Jan — Mar 2026',
    title: 'Full-Stack Web Development Trainee',
    organization: 'National Telecommunication Institute (NTI)',
    location: 'Benha, Egypt',
    kind: 'training',
    summary: 'Where I deepened my full-stack development foundations through practical training.',
    details: [
      'Developed applications using React, Next.js, Node.js, Express and MongoDB / Mongoose.',
      'Built and consumed REST APIs, worked with multi-collection databases and JWT-based authentication / authorization.',
      'Practiced Git workflows, Agile / Scrum, debugging, API testing and production-oriented development.'
    ]
  },
  {
    id: 'tanta',
    date: '2019 — 2024',
    title: 'Bachelor of Engineering — Computer Engineering',
    organization: 'Tanta University',
    location: 'Tanta, Egypt',
    kind: 'education',
    summary: 'The engineering foundation behind the way I approach problems.',
    details: [
      'Overall grade: Very Good · GPA approximately 3.4 / 4.0.',
      'Graduation project grade: Excellent.'
    ]
  }
];

const technicalSkills = [
  { label: 'Languages', items: ['JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3', 'SQL'] },
  {
    label: 'Frontend',
    items: ['React.js', 'Next.js', 'Redux', 'Zustand', 'React Query', 'Tailwind CSS']
  },
  {
    label: 'Backend',
    items: ['Node.js', 'Express.js', 'RESTful APIs', 'Authentication & Authorization', 'JWT']
  },
  { label: 'Databases', items: ['MongoDB', 'Mongoose', 'SQL Server'] },
  { label: 'Forms & validation', items: ['React Hook Form', 'Formik', 'Yup', 'Zod'] },
  {
    label: 'Tools & platforms',
    items: ['Git', 'GitHub', 'Postman', 'Vite', 'n8n', 'Shopify', 'Salla']
  },
  {
    label: 'Engineering',
    items: [
      'OOP',
      'Data Structures',
      'API Integration',
      'Component Architecture',
      'Debugging',
      'Performance Optimization'
    ]
  },
  {
    label: 'Workflow',
    items: ['Agile / Scrum', 'Git Workflows', 'Code Review', 'Responsive Design', 'CI/CD']
  }
];

const softSkills = ['Problem Solving', 'Communication', 'Teamwork', 'Time Management'];

function JourneyIcon({ kind }: { kind: JourneyItem['kind'] }) {
  if (kind === 'education') return <GraduationCap size={16} aria-hidden="true" />;
  if (kind === 'training') return <BookOpen size={16} aria-hidden="true" />;
  if (kind === 'internship') return <Code2 size={16} aria-hidden="true" />;
  return <BriefcaseBusiness size={16} aria-hidden="true" />;
}

export default function AboutPageContent() {
  const rootRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const timeline = timelineRef.current;
    const progress = progressRef.current;
    if (!root || !timeline || !progress) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-about-hero]',
        { y: 22, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.13, ease: 'power3.out' }
      );

      // An actual scroll-progress line, not a timer and not a pinned section.
      gsap.fromTo(
        progress,
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: timeline,
            start: 'top 72%',
            end: 'bottom 62%',
            scrub: 0.45,
            invalidateOnRefresh: true
          }
        }
      );

      // Alternate entry direction on desktop; softer, one-sided reveal on mobile.
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        gsap.utils.toArray<HTMLElement>('[data-journey-card]').forEach((card, index) => {
          gsap.fromTo(
            card,
            { x: index % 2 === 0 ? -38 : 38, y: 15, autoAlpha: 0 },
            {
              x: 0,
              y: 0,
              autoAlpha: 1,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: { trigger: card, start: 'top 86%', once: true }
            }
          );
        });
      });
      mm.add('(max-width: 767px)', () => {
        gsap.utils.toArray<HTMLElement>('[data-journey-card]').forEach((card) => {
          gsap.fromTo(
            card,
            { x: 18, y: 12, autoAlpha: 0 },
            {
              x: 0,
              y: 0,
              autoAlpha: 1,
              duration: 0.75,
              ease: 'power2.out',
              scrollTrigger: { trigger: card, start: 'top 92%', once: true }
            }
          );
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-about-reveal]').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 19, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.75,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 92%', once: true }
          }
        );
      });

      return () => mm.revert();
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative isolate min-h-screen overflow-hidden bg-[#050B12] text-white light:bg-[#F7FAFC] light:text-[#122638]"
    >
      {/* A subtle inherited portfolio grid, not a second hero or a fake editor. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[670px] opacity-45 light:opacity-55"
        style={{
          backgroundImage:
            'linear-gradient(rgba(6,182,212,0.045) 1px,transparent 1px),linear-gradient(90deg,rgba(6,182,212,0.045) 1px,transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'linear-gradient(to bottom, black, transparent 93%)'
        }}
      />

      {/* HERO */}
      <section className="mx-auto w-full max-w-7xl px-5 pb-20 pt-16 sm:px-8 sm:pb-24 sm:pt-24 lg:px-10 lg:pb-28 lg:pt-28">
        <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-16">
          <div>
            <div data-about-hero>
              <div className="mb-4 flex items-center gap-3 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[#06B6D4] sm:text-[11px]">
                <span aria-hidden="true" className="h-px w-7 bg-[#06B6D4]" />
                Behind the code
              </div>
            </div>
            <h1
              data-about-hero
              className="max-w-3xl text-[clamp(2.5rem,4.75vw,4.2rem)] font-bold leading-[1.1] tracking-[-0.055em]"
            >
              Hi, I&apos;m Mohammed.
              <br />
              <span className="text-[#06B6D4]">Here&apos;s my story.</span>
            </h1>
            <p
              data-about-hero
              className="mt-6 max-w-[650px] text-[15px] leading-8 text-slate-400 light:text-[#526679] sm:text-base"
            >
              I&apos;m a software engineer and full-stack JavaScript developer based in Cairo. I
              enjoy building useful web applications, connecting the pieces behind them, and making
              the experience feel simple for the person using it.
            </p>
            <div data-about-hero className="mt-7 flex flex-wrap items-center gap-4">
              <a
                href="#journey"
                className="group inline-flex items-center gap-2 border-b border-[#06B6D4]/45 pb-1.5 text-sm font-medium text-[#06B6D4] transition-colors hover:border-[#06B6D4] light:text-[#0786A0]"
              >
                Follow my journey <ArrowDown size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div data-about-hero className="border-l border-[#06B6D4]/35 pl-5 sm:pl-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#06B6D4]">
              Currently
            </p>
            <p className="mt-3 text-base font-semibold tracking-[-0.02em] sm:text-lg">
              Software Engineer / Web Developer
            </p>
            <p className="mt-1 text-sm text-slate-400 light:text-[#526679]">
              BigBee Marketing Agency &amp; Advertising
            </p>
            <div className="mt-5 flex items-center gap-2 text-xs text-slate-500 light:text-[#607589]">
              <MapPin size={14} aria-hidden="true" /> Cairo, Egypt
              <span className="mx-1 text-[#06B6D4]">/</span>
              Since Apr 2026
            </div>
          </div>
        </div>
      </section>

      {/* ALTERNATING JOURNEY */}
      <section
        id="journey"
        aria-labelledby="journey-title"
        className="scroll-mt-28 border-t border-white/[0.08] py-20 light:border-[#DCE5ED] sm:py-24 lg:py-28"
      >
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10">
          <div data-about-reveal className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[#06B6D4] sm:text-[11px]">
              <span aria-hidden="true" className="h-px w-7 bg-[#06B6D4]" />
              The journey
            </div>
            <h2
              id="journey-title"
              className="text-[clamp(2rem,3.5vw,3.2rem)] font-bold tracking-[-0.05em]"
            >
              How I got <span className="text-[#06B6D4]">here.</span>
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-400 light:text-[#526679] sm:text-[15px]">
              A few meaningful stops along the way — from university and hands-on training to
              professional experience.
            </p>
          </div>

          <div ref={timelineRef} className="relative mt-12 space-y-12 pb-3 sm:mt-16 md:space-y-16">
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-[14px] top-0 w-px -translate-x-1/2 bg-white/[0.12] light:bg-[#CCD9E2] md:left-1/2"
            />
            <div
              ref={progressRef}
              aria-hidden="true"
              className="absolute bottom-0 left-[14px] top-0 w-[2px] origin-top -translate-x-1/2 scale-y-0 bg-[#06B6D4] motion-reduce:scale-y-100 md:left-1/2"
            />

            {journey.map((item, index) => (
              <div
                key={item.id}
                className="relative grid grid-cols-[28px_minmax(0,1fr)] gap-x-5 md:grid-cols-[minmax(0,1fr)_48px_minmax(0,1fr)] md:gap-x-8"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-[14px] top-5 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border border-[#06B6D4]/55 bg-[#07131D] text-[#06B6D4] light:bg-[#F7FAFC] md:left-1/2"
                >
                  <JourneyIcon kind={item.kind} />
                </span>
                <article
                  data-journey-card
                  className={`col-start-2 min-w-0 rounded-2xl border border-white/[0.09] bg-white/[0.025] p-5 shadow-none light:border-[#DCE5ED] light:bg-white/75 sm:p-6 md:row-start-1 md:max-w-[485px] ${
                    index % 2 === 0
                      ? 'md:col-start-1 md:justify-self-end'
                      : 'md:col-start-3 md:justify-self-start'
                  }`}
                >
                  <p className="font-mono text-[11px] tracking-wide text-[#06B6D4]">{item.date}</p>
                  <h3 className="mt-3 text-lg font-semibold leading-snug tracking-[-0.035em] sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-slate-300 light:text-[#344D60]">
                    {item.organization}
                  </p>
                  <p className="mt-1 text-xs text-slate-500 light:text-[#73899A]">
                    {item.location}
                  </p>
                  {item.id === 'nti' && (
                    <div className="mt-5 flex flex-wrap items-center gap-4 rounded-xl border border-[#06B6D4]/25 bg-[#06B6D4]/[0.055] px-4 py-3.5 light:border-[#97DCE7] light:bg-[#E8F8FB]">
                      <span
                        className="text-4xl font-bold leading-none tracking-[-0.055em] text-[#06B6D4]"
                        aria-label="Final score 97 percent"
                      >
                        97%
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold leading-5 text-white light:text-[#123144]">
                          Ranked #1 in NTI training
                        </p>
                        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-slate-400 light:text-[#60768A]">
                          Final score · First place
                        </p>
                      </div>
                    </div>
                  )}
                  <p className="mt-4 text-[13px] leading-6 text-slate-400 light:text-[#526679] sm:text-sm">
                    {item.summary}
                  </p>
                  <ul className="mt-4 space-y-2.5 border-t border-white/[0.08] pt-4 light:border-[#E0E9F0]">
                    {item.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex gap-2.5 text-xs leading-6 text-slate-400 light:text-[#526679] sm:text-[13px]"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[10px] h-1 w-1 shrink-0 rounded-full bg-[#06B6D4]"
                        />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FULL STACK IN THE CV — ALL CATEGORIES RETAINED */}
      <section
        id="toolkit"
        aria-labelledby="toolkit-title"
        className="scroll-mt-28 border-t border-white/[0.08] py-20 light:border-[#DCE5ED] sm:py-24"
      >
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10">
          <div data-about-reveal>
            <div className="mb-4 flex items-center gap-3 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[#06B6D4] sm:text-[11px]">
              <span aria-hidden="true" className="h-px w-7 bg-[#06B6D4]" />
              My toolkit
            </div>
            <h2
              id="toolkit-title"
              className="text-[clamp(2rem,3.5vw,3.2rem)] font-bold tracking-[-0.05em]"
            >
              Tools I work <span className="text-[#06B6D4]">with.</span>
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400 light:text-[#526679] sm:text-[15px]">
              Languages, frameworks and workflows I&apos;ve used across projects, training and work.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-12 md:grid-cols-2">
            {technicalSkills.map((group) => (
              <div
                key={group.label}
                data-about-reveal
                className="border-t border-white/[0.09] py-5 light:border-[#DCE5ED] sm:py-6"
              >
                <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-slate-400 light:text-[#60768A]">
                  {group.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5 text-xs text-slate-200 light:border-[#DDE7EF] light:bg-white light:text-[#344B5F]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div
            data-about-reveal
            className="mt-6 border-t border-white/[0.09] pt-6 light:border-[#DCE5ED]"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate-500 light:text-[#60768A]">
              Beyond the technical side
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-400 light:text-[#526679]">
              {softSkills.join('  ·  ')}
            </p>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS, LANGUAGES AND CONTACT */}
      <section
        aria-labelledby="more-title"
        className="border-t border-white/[0.08] py-20 light:border-[#DCE5ED] sm:py-24"
      >
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1fr] lg:gap-20 lg:px-10">
          <div data-about-reveal>
            <div className="mb-4 flex items-center gap-3 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[#06B6D4] sm:text-[11px]">
              <span aria-hidden="true" className="h-px w-7 bg-[#06B6D4]" />
              Still learning
            </div>
            <h2
              id="more-title"
              className="text-[clamp(1.8rem,2.7vw,2.6rem)] font-bold tracking-[-0.05em]"
            >
              Courses &amp; certifications.
            </h2>
            <div className="mt-7 divide-y divide-white/[0.09] border-y border-white/[0.09] light:divide-[#DCE5ED] light:border-[#DCE5ED]">
              <div className="py-4">
                <p className="text-sm font-medium">Full-Stack Web Development Training Program</p>
                <p className="mt-1 text-xs text-slate-400 light:text-[#60768A]">
                  National Telecommunication Institute (NTI)
                </p>
                <p className="mt-2 text-xs font-semibold text-[#06B6D4] light:text-[#0786A0]">
                  97% final score · Ranked 1st
                </p>
              </div>
              <div className="py-4">
                <p className="text-sm font-medium">Web Development Challenger Nanodegree</p>
                <p className="mt-1 text-xs text-slate-400 light:text-[#60768A]">Udacity</p>
              </div>
            </div>
          </div>
          <div data-about-reveal>
            <div className="mb-4 flex items-center gap-3 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[#06B6D4] sm:text-[11px]">
              <span aria-hidden="true" className="h-px w-7 bg-[#06B6D4]" />
              Languages
            </div>
            <h2 className="text-[clamp(1.8rem,2.7vw,2.6rem)] font-bold tracking-[-0.05em]">
              A little more about me.
            </h2>
            <dl className="mt-7 space-y-4">
              <div className="flex items-center justify-between gap-5 border-b border-white/[0.09] pb-4 light:border-[#DCE5ED]">
                <dt className="text-sm font-medium">Arabic</dt>
                <dd className="text-xs text-slate-400 light:text-[#60768A]">Native</dd>
              </div>
              <div className="flex items-center justify-between gap-5 border-b border-white/[0.09] pb-4 light:border-[#DCE5ED]">
                <dt className="text-sm font-medium">English</dt>
                <dd className="text-right text-xs text-slate-400 light:text-[#60768A]">
                  Professional working proficiency
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </div>
  );
}
