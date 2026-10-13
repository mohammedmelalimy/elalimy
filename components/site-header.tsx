'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Download, Menu, X } from 'lucide-react';
import LogoMark from './logo-mark';
const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Client Work', href: '/work' },
  { label: 'Contact', href: '/contact' }
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between rounded-2xl border border-white/10 bg-[#081018]/75 px-4 backdrop-blur-xl shadow-[0_0_40px_rgba(6,182,212,0.06)] sm:px-6">
          <div className="shrink-0">
            <LogoMark />
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="group relative text-sm font-medium text-[#C8D3E0] transition-colors duration-300 hover:text-white"
              >
                {link.label}
                <span className="absolute -bottom-2 left-0 h-0.5 w-0 bg-[#06B6D4] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/resume.pdf"
              className="inline-flex items-center gap-2 rounded-xl border border-[#06B6D4]/50 bg-[#06B6D4]/5 px-4 py-2.5 text-sm font-medium text-[#06B6D4] transition-all duration-300 hover:bg-[#06B6D4]/10 hover:text-white"
            >
              Resume
              <Download size={16} />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="inline-flex items-center justify-center rounded-xl border border-white/10 p-2 text-white transition hover:border-[#06B6D4]/50 hover:text-[#06B6D4] md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {open && (
          <div className="mt-3 rounded-2xl border border-white/10 bg-[#081018]/95 p-4 backdrop-blur-xl md:hidden">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm font-medium text-[#C8D3E0] transition hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}

              <Link
                href="/resume.pdf"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl border border-[#06B6D4]/50 bg-[#06B6D4]/5 px-4 py-3 text-sm font-medium text-[#06B6D4] transition hover:bg-[#06B6D4]/10 hover:text-white"
              >
                Resume
                <Download size={16} />
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
