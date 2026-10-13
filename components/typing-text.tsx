'use client';

import { useEffect, useState } from 'react';

const phrases = ['web experiences.', 'digital solutions.', 'e-commerce stores.'];

export default function TypingText() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const phrase = phrases[phraseIndex];

  useEffect(() => {
    const isComplete = charIndex === phrase.length;
    const isEmpty = charIndex === 0;

    let delay = deleting ? 45 : 85;

    if (isComplete && !deleting) delay = 2000;
    if (isEmpty && deleting) delay = 350;

    const timer = setTimeout(() => {
      if (isComplete && !deleting) {
        setDeleting(true);
        return;
      }

      if (isEmpty && deleting) {
        setDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
        return;
      }

      setCharIndex((prev) => (deleting ? prev - 1 : prev + 1));
    }, delay);

    return () => clearTimeout(timer);
  }, [charIndex, deleting, phrase, phraseIndex]);

  return (
    <span className="text-[#06B6D4]" aria-label={phrase}>
      <span aria-hidden="true">{phrase.slice(0, charIndex)}</span>

      <span
        aria-hidden="true"
        className="ml-1 inline-block animate-pulse text-[#06B6D4] motion-reduce:animate-none"
      >
        |
      </span>
    </span>
  );
}
