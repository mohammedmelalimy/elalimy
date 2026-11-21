'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

type Theme = 'dark' | 'light';
const STORAGE_KEY = 'elalimy-theme';
const CHANGE_EVENT = 'elalimy-theme-change';
const TRANSITION_CLASS = 'theme-switching';

function readTheme(): Theme {
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    // If the preload script failed or was blocked, use localStorage as a fallback.
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'light' || stored === 'dark') {
        document.documentElement.setAttribute('data-theme', stored);
      }
    } catch {
      // The toggle still works if storage is unavailable.
    }
    setTheme(readTheme());

    const syncTheme = () => setTheme(readTheme());
    const syncStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return;
      document.documentElement.setAttribute(
        'data-theme',
        event.newValue === 'light' ? 'light' : 'dark'
      );
      syncTheme();
    };
    window.addEventListener(CHANGE_EVENT, syncTheme);
    window.addEventListener('storage', syncStorage);
    return () => {
      window.removeEventListener(CHANGE_EVENT, syncTheme);
      window.removeEventListener('storage', syncStorage);
    };
  }, []);

  const toggle = () => {
    const next: Theme = readTheme() === 'dark' ? 'light' : 'dark';
    const root = document.documentElement;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const updateTheme = () => {
      root.setAttribute('data-theme', next);
      setTheme(next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Theme switching still works when storage is unavailable.
      }
      // Keep desktop and mobile toggles in sync.
      window.dispatchEvent(new Event(CHANGE_EVENT));
    };

    // Smooth page-wide crossfade on Chromium / browsers that support View Transitions.
    // Fallback below uses transitions for actual foreground/background colors.
    if (!reduceMotion && typeof document.startViewTransition === 'function') {
      document.startViewTransition(updateTheme);
      return;
    }

    if (!reduceMotion) {
      root.classList.add(TRANSITION_CLASS);
      updateTheme();
      window.setTimeout(() => root.classList.remove(TRANSITION_CLASS), 850);
      return;
    }

    updateTheme();
  };

  const isDark = theme === 'dark';
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Activate light mode' : 'Activate dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      aria-pressed={!isDark}
      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-0 bg-transparent text-slate-200 shadow-none transition-colors duration-300 hover:bg-white/[0.045] hover:text-[#06B6D4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#06B6D4] light:bg-transparent light:text-[#294456] light:hover:bg-[#06B6D4]/[0.07] light:hover:text-[#087F99]"
    >
      <span className="relative block h-[18px] w-[18px]">
        <Sun
          aria-hidden="true"
          size={18}
          className={`absolute inset-0 transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none ${
            isDark ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-50 opacity-0'
          }`}
        />
        <Moon
          aria-hidden="true"
          size={18}
          className={`absolute inset-0 transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none ${
            isDark ? '-rotate-90 scale-50 opacity-0' : 'rotate-0 scale-100 opacity-100'
          }`}
        />
      </span>
    </button>
  );
}
