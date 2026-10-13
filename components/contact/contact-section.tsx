'use client';

import { useState, type FormEvent } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  Code2,
  Loader2,
  Mail,
  MapPin,
  Send,
  Terminal,
  UserRound,
  XCircle
} from 'lucide-react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';

// Contact details
const EMAIL = 'mohammed.m.elalimy@gmail.com';
const GITHUB = 'https://github.com/mohammedmelalimy';
const LINKEDIN = 'https://www.linkedin.com/in/mohammed-elalimy-aa2556287/';

const subjects = [
  'Full-Stack Development',
  'Shopify Development',
  'Freelance Project',
  'Job Opportunity',
  'Other'
];

type ContactForm = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

const initialForm: ContactForm = {
  name: '',
  email: '',
  subject: '',
  message: ''
};

const contacts = [
  {
    title: 'Email',
    value: EMAIL,
    description: 'Send me an email',
    href: `mailto:${EMAIL}`,
    icon: Mail
  },
  {
    title: 'LinkedIn',
    value: 'Connect with me',
    description: 'Professional network',
    href: LINKEDIN,
    icon: FaLinkedinIn
  },
  {
    title: 'GitHub',
    value: 'Explore my code',
    description: 'Projects & repositories',
    href: GITHUB,
    icon: FaGithub
  }
];

const inputClass = `
  w-full min-w-0 rounded-lg
  border border-[#243544]
  bg-[#0E1722]
  px-4 py-3
  text-sm text-slate-100
  outline-none
  transition-all duration-200
  placeholder:text-slate-600
  focus:border-[#06B6D4]
  focus:ring-1 focus:ring-[#06B6D4]/20
`;

// Terminal-style header
function WindowHeader({ title, filename }: { title: string; filename?: string }) {
  return (
    <div className="flex min-h-11 items-center justify-between gap-2 border-b border-white/[0.07] bg-white/[0.02] px-4 sm:px-5">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex shrink-0 gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </div>

        <div className="min-w-0 border-l border-white/10 pl-3 font-mono text-xs text-slate-400">
          <span className="mr-2 text-[#06B6D4]">&gt;_</span>
          <span className="truncate">{title}</span>
        </div>
      </div>

      {filename && (
        <span className="hidden shrink-0 font-mono text-[11px] text-slate-600 sm:block">
          {filename}
        </span>
      )}
    </div>
  );
}

// Contact link card
function ContactCard({ contact }: { contact: (typeof contacts)[number] }) {
  const Icon = contact.icon;
  const external = contact.href.startsWith('http');

  return (
    <a
      href={contact.href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="group flex min-w-0 items-center gap-3 rounded-xl border border-[#203342] bg-[#0A121D]/80 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#06B6D4]/60 hover:bg-[#0D1B27]"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-cyan-500/20 bg-cyan-500/10 text-[#06B6D4]">
        <Icon size={19} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
          {contact.title}
        </p>

        <p className="mt-1 truncate text-sm font-medium text-white">{contact.value}</p>

        <p className="mt-1 text-xs text-slate-500">{contact.description}</p>
      </div>

      <ArrowUpRight
        size={15}
        className="shrink-0 text-slate-500 transition-colors group-hover:text-[#06B6D4]"
      />
    </a>
  );
}

// Live code preview
function CodePreview({ form }: { form: ContactForm }) {
  return (
    <div className="mb-4 overflow-x-auto border-l border-white/10 pl-4 font-mono text-[11px] leading-6 sm:text-xs">
      <div className="min-w-max">
        <p>
          <span className="text-purple-400">const</span> message = {'{'}
        </p>

        <p className="pl-4">
          name: <span className="text-cyan-400">{JSON.stringify(form.name)}</span>,
        </p>

        <p className="pl-4">
          email: <span className="text-cyan-400">{JSON.stringify(form.email)}</span>,
        </p>

        <p className="pl-4">
          subject: <span className="text-cyan-400">{JSON.stringify(form.subject)}</span>
        </p>

        <p>{'};'}</p>

        <p className="mt-1 text-slate-500">{'// Fill out the form below'}</p>
      </div>
    </div>
  );
}

// Developer status panel
function DeveloperStatus() {
  return (
    <div className="overflow-hidden rounded-xl border border-[#203342] bg-[#0A121D]/85">
      <WindowHeader title="status.ts" />

      <div className="space-y-1 overflow-x-auto p-4 font-mono text-[11px] leading-6 sm:text-xs">
        <div className="min-w-max">
          <p>
            <span className="text-purple-400">const</span> status = {'{'}
          </p>

          <p className="pl-4">
            location: <span className="text-cyan-400">"Egypt"</span>,
          </p>

          <p className="pl-4">
            focus: <span className="text-cyan-400">"Full-Stack & Shopify"</span>,
          </p>

          <p className="pl-4">
            availability: <span className="text-cyan-400">"Open for opportunities"</span>
          </p>

          <p>{'};'}</p>
        </div>
      </div>
    </div>
  );
}

// API response display
function ResponseConsole({ status, errorMessage }: { status: SubmitStatus; errorMessage: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#203342] bg-[#08121D]/90">
      <WindowHeader title="console.log(response)" />

      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="space-y-1 p-4 font-mono text-[11px] leading-6 sm:text-xs"
      >
        {status === 'idle' && (
          <>
            <p className="text-slate-400">
              <span className="text-purple-400">const</span> response = "Waiting for your message";
            </p>

            <p className="flex items-center gap-2 text-cyan-400">
              <Terminal size={14} />
              Ready for input_
            </p>
          </>
        )}

        {status === 'loading' && (
          <>
            <p className="flex items-center gap-2 text-cyan-400">
              <Loader2 size={15} className="animate-spin" />
              Sending message...
            </p>

            <p className="text-slate-400">Awaiting server response_</p>
          </>
        )}

        {status === 'success' && (
          <>
            <p className="flex items-center gap-2 text-green-400">
              <CheckCircle2 size={16} />
              Message sent successfully!
            </p>

            <p className="text-slate-300">Thanks for reaching out.</p>

            <p className="text-slate-400">I'll get back to you as soon as possible.</p>

            <p className="text-cyan-400">&gt; Ready for the next message_</p>
          </>
        )}

        {status === 'error' && (
          <>
            <p className="flex items-center gap-2 text-red-400">
              <XCircle size={16} />
              Error: Message not sent
            </p>

            <p className="break-words text-slate-400">{errorMessage}</p>

            <p className="text-cyan-400">&gt; Please try again_</p>
          </>
        )}
      </div>
    </div>
  );
}

export default function ContactSection() {
  const reduceMotion = useReducedMotion();

  const [form, setForm] = useState<ContactForm>(initialForm);

  const [status, setStatus] = useState<SubmitStatus>('idle');

  const [errorMessage, setErrorMessage] = useState('');

  // Update form fields
  function updateField(field: keyof ContactForm, value: string) {
    setForm((prev) => ({
      ...prev,
      [field]: value
    }));

    if (status !== 'loading') {
      setStatus('idle');
      setErrorMessage('');
    }
  }

  // Submit form to Next.js API

async function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  if (status === 'loading') return;

  setStatus('loading');
  setErrorMessage('');

  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    setStatus('error');
    setErrorMessage('Web3Forms Access Key is missing.');
    return;
  }

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        access_key: accessKey,
        from_name: 'Elalimy Portfolio',
        subject: `[Portfolio] ${form.subject}`,
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
        inquiry_type: form.subject
      })
    });

    const result = await response.json();

    if (!response.ok || result.success !== true) {
      throw new Error(result.message || 'Failed to send message.');
    }

    setStatus('success');

    setForm({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  } catch (error) {
    setStatus('error');

    setErrorMessage(
      error instanceof Error ? error.message : 'Something went wrong. Please try again.'
    );
  }
}


  const reveal = {
    initial: {
      opacity: 0,
      y: reduceMotion ? 0 : 20
    },
    whileInView: {
      opacity: 1,
      y: 0
    },
    viewport: {
      once: true,
      amount: 0.15
    },
    transition: {
      duration: reduceMotion ? 0 : 0.55
    }
  };

  return (
    <section className="relative isolate overflow-hidden bg-[#050B12] pb-6 pt-10 text-white sm:pt-12">
      {/* Dark grid background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(6,182,212,0.045) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(6,182,212,0.045) 1px,
              transparent 1px
            )
          `,
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse at center, black 10%, transparent 85%)'
        }}
      />

      {/* Ambient cyan glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-160px] top-[90px] -z-10 h-[420px] w-[420px] rounded-full bg-cyan-500/[0.06] blur-[110px]"
      />

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Small top heading */}
        <motion.div {...reveal} className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 font-mono text-xs tracking-[0.18em] text-[#06B6D4]">
            <span className="h-2 w-2 rounded-full bg-[#06B6D4]" />

            {'// CONTACT'}

            <span className="h-px w-16 bg-cyan-500/20" />
          </div>

          <div className="font-mono text-xs text-slate-500">
            &gt; Let&apos;s build something together
          </div>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid items-start gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          {/* LEFT — FORM */}
          <motion.div {...reveal} className="min-w-0">
            <div className="overflow-hidden rounded-2xl border border-[#155E75]/70 bg-[#08121D]/95 shadow-[0_20px_80px_rgba(0,0,0,0.28)]">
              <WindowHeader title="Send me a message" filename="contact.tsx" />

              <div className="p-5 sm:p-6">
                <CodePreview form={form} />

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name and email */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className="mb-2 block text-sm text-slate-200">
                        Your Name
                      </label>

                      <div className="relative">
                        <UserRound
                          size={16}
                          className="pointer-events-none absolute left-3.5 top-3.5 text-slate-500"
                        />

                        <input
                          id="contact-name"
                          type="text"
                          autoComplete="name"
                          required
                          disabled={status === 'loading'}
                          maxLength={100}
                          placeholder="Your name"
                          value={form.name}
                          onChange={(e) => updateField('name', e.target.value)}
                          className={`${inputClass} pl-10`}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="mb-2 block text-sm text-slate-200">
                        Your Email
                      </label>

                      <div className="relative">
                        <Mail
                          size={16}
                          className="pointer-events-none absolute left-3.5 top-3.5 text-slate-500"
                        />

                        <input
                          id="contact-email"
                          type="email"
                          autoComplete="email"
                          required
                          disabled={status === 'loading'}
                          maxLength={254}
                          placeholder="you@example.com"
                          value={form.email}
                          onChange={(e) => updateField('email', e.target.value)}
                          className={`${inputClass} pl-10`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="contact-subject" className="mb-2 block text-sm text-slate-200">
                      Subject
                    </label>

                    <div className="relative">
                      <select
                        id="contact-subject"
                        required
                        disabled={status === 'loading'}
                        value={form.subject}
                        onChange={(e) => updateField('subject', e.target.value)}
                        className={`${inputClass} appearance-none pr-10`}
                      >
                        <option value="" disabled>
                          What&apos;s this about?
                        </option>

                        {subjects.map((subject) => (
                          <option key={subject} value={subject}>
                            {subject}
                          </option>
                        ))}
                      </select>

                      <ChevronDown
                        size={16}
                        className="pointer-events-none absolute right-3.5 top-3.5 text-slate-500"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message" className="mb-2 block text-sm text-slate-200">
                      Your Message
                    </label>

                    <textarea
                      id="contact-message"
                      required
                      disabled={status === 'loading'}
                      minLength={10}
                      maxLength={4000}
                      rows={3}
                      placeholder="Tell me about your project, idea, or just say hi..."
                      value={form.message}
                      onChange={(e) => updateField('message', e.target.value)}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="flex min-h-12 w-full items-center justify-center gap-3 rounded-lg bg-[#06B6D4] px-5 font-semibold text-[#051018] transition-all duration-300 hover:bg-[#22D3EE] hover:shadow-[0_8px_30px_rgba(6,182,212,0.18)] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === 'loading' ? (
                      <>
                        Sending Message
                        <Loader2 size={17} className="animate-spin" />
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={17} />
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-slate-500">
                    Your message will be sent directly to my inbox.
                  </p>
                </form>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — CONTACT CARDS AND STATUS */}
          <motion.div
            {...reveal}
            transition={{
              duration: reduceMotion ? 0 : 0.6,
              delay: reduceMotion ? 0 : 0.08
            }}
            className="min-w-0 space-y-4"
          >
            {/* Social and contact links */}
            <div className="grid gap-3">
              {contacts.map((contact) => (
                <ContactCard key={contact.title} contact={contact} />
              ))}
            </div>

            {/* Developer info */}
            <DeveloperStatus />

            {/* Dynamic success/error console */}
            <ResponseConsole status={status} errorMessage={errorMessage} />
          </motion.div>
        </div>

        {/* Bottom signature */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-4 font-mono text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Code2 size={15} className="text-[#06B6D4]" />
            Built with purpose.
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-[#06B6D4]" />
            Egypt
          </div>
        </div>
      </div>
    </section>
  );
}
