'use client';

import { FaWhatsapp } from 'react-icons/fa';

const WHATSAPP_NUMBER = '201113414805';

const MESSAGE = "Hi Mohammed, I visited your portfolio and I'd like to discuss a project with you.";

export default function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(MESSAGE)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact Mohammed on WhatsApp"
      title="Chat on WhatsApp"
      className="group fixed bottom-6 right-6 z-[100] flex h-14 w-14 items-center justify-center rounded-full bg-[#06B6D4] text-[#051018] shadow-[0_8px_30px_rgba(6,182,212,0.20)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-[#22D3EE] hover:shadow-[0_12px_35px_rgba(6,182,212,0.35)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#06B6D4] motion-reduce:transform-none sm:bottom-8 sm:right-8"
    >
      <FaWhatsapp size={28} />

      {/* Tooltip */}
      <span className="pointer-events-none absolute right-[calc(100%+12px)] whitespace-nowrap rounded-lg border border-[#155E75] bg-[#0B1722] px-3 py-2 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
        Chat on WhatsApp
      </span>
    </a>
  );
}
