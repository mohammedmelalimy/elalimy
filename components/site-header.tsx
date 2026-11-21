'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Download, Menu, X } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

import LogoMark from './logo-mark';
import ThemeToggle from './theme-toggle';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Client Work', href: '/work' },
  { label: 'Contact', href: '/contact' }
] as const;

// Keep the paths and contact details used by the existing portfolio.
const resumeUrl = '/mohamedelalimy.pdf';
const whatsappNumber = '201113414805';
const whatsappMessage = 'Hi Mohammed, I visited your portfolio and would like to get in touch.';
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

export default function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 14);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Keep the floating CV button away from the global footer.
  // It fades out before reaching the footer, on desktop and mobile.
  useEffect(() => {
    const footer = document.getElementById('site-footer');
    if (!footer) return;

    const observer = new IntersectionObserver(([entry]) => setNearFooter(entry.isIntersecting), {
      rootMargin: '0px 0px 120px 0px',
      threshold: 0
    });

    observer.observe(footer);
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b shadow-none transition-[background-color,border-color] duration-300 ease-out ${
          scrolled || menuOpen
            ? 'border-white/[0.08] bg-[#050B12] light:border-[#DFE8EF] light:bg-[#F7FAFC]'
            : 'border-transparent bg-[#050B12] light:bg-[#F7FAFC]'
        }`}
      >
        <div className="mx-auto flex h-[68px] w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:h-[74px] lg:px-10">
          {/* LEFT: original logo, always left-aligned. */}
          <div className="min-w-0 shrink-0">
            <LogoMark />
          </div>

          {/* RIGHT: navigation, theme and WhatsApp on one line. */}
          <div className="ml-auto flex items-center gap-1.5 sm:gap-2 lg:gap-5 xl:gap-7">
            <nav
              aria-label="Main navigation"
              className="hidden items-center gap-4 lg:flex xl:gap-7"
            >
              {navLinks.map(({ label, href }) => {
                const active = isActive(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    aria-current={active ? 'page' : undefined}
                    className={`group relative whitespace-nowrap py-3 text-[13px] font-medium transition-colors duration-200 ${
                      active
                        ? 'text-white light:text-[#102638]'
                        : 'text-[#94A6B7] hover:text-white light:text-[#65798B] light:hover:text-[#102638]'
                    }`}
                  >
                    {label}
                    <span
                      aria-hidden="true"
                      className={`absolute bottom-[6px] left-0 right-0 h-px origin-left bg-[#06B6D4] transition-transform duration-300 ${
                        active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            <span
              aria-hidden="true"
              className="hidden h-4 w-px bg-white/10 lg:block light:bg-[#DCE6EE]"
            />

            {/* Re-use the working theme toggle; don't change its logic. */}
            <ThemeToggle />

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with me on WhatsApp"
              title="WhatsApp"
              className="inline-flex h-10 min-w-10 shrink-0 items-center justify-center gap-2 rounded-full border-0 bg-[#06B6D4]/10 px-2.5 text-[#06B6D4] shadow-none transition-[background-color,color,transform] duration-200 hover:-translate-y-px hover:bg-[#06B6D4]/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#06B6D4] sm:px-4 light:bg-[#06B6D4]/10 light:text-[#078AA3] light:hover:bg-[#06B6D4]/20"
            >
              <FaWhatsapp size={20} aria-hidden="true" />
              <span className="hidden text-[13px] font-semibold tracking-[-0.015em] sm:inline">
                WhatsApp
              </span>
            </a>

            <button
              type="button"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              aria-controls="elalimy-mobile-navigation"
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 text-[#C0D0DD] transition-[border-color,color,background-color] duration-200 hover:border-[#06B6D4]/45 hover:text-[#06B6D4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#06B6D4] lg:hidden light:border-[#D7E2EB] light:text-[#2C495C] light:hover:text-[#078AA3]"
            >
              {menuOpen ? <X size={18} strokeWidth={1.8} /> : <Menu size={18} strokeWidth={1.8} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown: flat, no shadow or raised card. */}
        {menuOpen && (
          <div
            id="elalimy-mobile-navigation"
            className="border-t border-white/[0.07] bg-[#050B12] shadow-none lg:hidden light:border-[#E0E8EF] light:bg-[#F7FAFC]"
          >
            <nav aria-label="Mobile navigation" className="mx-auto max-w-7xl px-5 py-2 sm:px-8">
              {navLinks.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  aria-current={isActive(href) ? 'page' : undefined}
                  onClick={() => setMenuOpen(false)}
                  className={`flex min-h-11 items-center border-b border-white/[0.06] text-[13px] font-medium last:border-0 light:border-[#E6EDF2] ${
                    isActive(href)
                      ? 'text-[#06B6D4] light:text-[#078AA3]'
                      : 'text-[#C8D5E0] hover:text-[#06B6D4] light:text-[#344B5C] light:hover:text-[#078AA3]'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Keep the floating CV download button that replaced the old WhatsApp bubble. */}
      <a
        href={resumeUrl}
        download="Mohammed_Elalimy_CV.pdf"
        aria-label="Download Mohammed Elalimy's CV"
        title="Download CV"
        aria-hidden={nearFooter}
        tabIndex={nearFooter ? -1 : undefined}
        className={`group fixed bottom-5 right-4 z-[45] inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#06B6D4]/35 bg-[#091925]/95 px-4 text-[12px] font-semibold text-[#BCECF4] shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-[opacity,transform,border-color,background-color] duration-300 ease-out hover:border-[#06B6D4]/70 hover:bg-[#0E2531] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#06B6D4] motion-reduce:transition-none sm:bottom-7 sm:right-7 sm:h-12 sm:px-5 light:border-[#B6E0E8] light:bg-white light:text-[#078AA3] light:hover:bg-[#EAF8FB] ${
          nearFooter
            ? 'pointer-events-none translate-y-3 opacity-0'
            : 'translate-y-0 opacity-100 hover:-translate-y-0.5 motion-reduce:transform-none'
        }`}
      >
        <Download size={16} strokeWidth={1.8} aria-hidden="true" className="text-[#06B6D4]" />
        <span className="sm:hidden">CV</span>
        <span className="hidden sm:inline">Resume</span>
      </a>
    </>
  );
}
