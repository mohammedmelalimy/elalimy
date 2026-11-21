'use client';

import { useEffect, useState } from 'react';
import LogoMark from './logo-mark';
import { ArrowUp, Mail } from 'lucide-react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/mohammedmelalimy',
    icon: FaGithub,
    external: true
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/mohammed-elalimy-aa2556287/',
    icon: FaLinkedinIn,
    external: true
  },
  {
    label: 'Email',
    href: 'mailto:mohammed.m.elalimy@gmail.com',
    icon: Mail,
    external: false
  }
] as const;

export default function SiteFooter() {
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer
      id="site-footer"
      aria-label="Portfolio footer"
      className="border-t border-white/[0.08] bg-[#050B12] text-white light:border-[#DCE6EC] light:bg-[#F7FAFC] light:text-[#122638]"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-4 px-5 py-5 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-5">
          {/* Reuse the exact same logo component as the header. */}
          <LogoMark />
          <span className="text-[11px] text-slate-500 light:text-[#738697]">
            © {year} Mohammed Elalimy
          </span>
        </div>

        <nav aria-label="Social links" className="flex items-center gap-2">
          {socials.map(({ label, href, icon: Icon, external }) => (
            <a
              key={label}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              aria-label={label}
              title={label}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.10] bg-white/[0.025] text-slate-400 transition-colors duration-200 hover:border-[#06B6D4]/45 hover:bg-[#06B6D4]/10 hover:text-[#06B6D4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#06B6D4] light:border-[#D8E4EA] light:bg-white light:text-[#607487] light:hover:border-[#06B6D4]/45 light:hover:bg-[#06B6D4]/10 light:hover:text-[#07879F]"
            >
              <Icon aria-hidden="true" size={16} />
            </a>
          ))}
          <span aria-hidden="true" className="mx-1 h-4 w-px bg-white/10 light:bg-[#D8E4EA]" />
          <button
            type="button"
            aria-label="Back to top"
            title="Back to top"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.10] bg-white/[0.025] text-slate-400 transition-colors duration-200 hover:border-[#06B6D4]/45 hover:bg-[#06B6D4]/10 hover:text-[#06B6D4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#06B6D4] light:border-[#D8E4EA] light:bg-white light:text-[#607487] light:hover:border-[#06B6D4]/45 light:hover:bg-[#06B6D4]/10 light:hover:text-[#07879F]"
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
                  ? 'auto'
                  : 'smooth'
              });
            }}
          >
            <ArrowUp aria-hidden="true" size={16} />
          </button>
        </nav>
      </div>
    </footer>
  );
}
