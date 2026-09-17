'use client';

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Plus, Minus, Sparkles, Code2, ArrowUpRight } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  tag: string;
}

const faqList: FAQItem[] = [
  {
    id: 'faq-01',
    question: 'What core technologies and frameworks do you specialize in?',
    answer:
      'I build high-performance web applications primarily using Next.js 15, React 19, TypeScript, Node.js, Express, MongoDB, and Tailwind CSS. For interactive physics, creative storytelling, and visual micro-animations, I leverage Framer Motion, GSAP, and Three.js.',
    tag: 'Tech Stack',
  },
  {
    id: 'faq-02',
    question: 'What is your typical project timeline from concept to deployment?',
    answer:
      'Standard high-converting landing pages and MVP web apps are typically delivered in 1 to 2 weeks. Comprehensive full-stack platforms with authentication, custom databases, and API integrations span 3 to 5 weeks with weekly live demo milestones.',
    tag: 'Timeline',
  },
  {
    id: 'faq-03',
    question: 'Can you translate Figma designs into pixel-perfect responsive code?',
    answer:
      'Yes, 100%. I convert Figma concepts into 1:1 pixel-perfect, responsive code across all viewport sizes. Every typographic scale, button micro-interaction, spring physics curve, and layout transition is implemented with zero layout shift.',
    tag: 'Figma to Code',
  },
  {
    id: 'faq-04',
    question: 'How do you guarantee top performance and SEO optimization?',
    answer:
      'Every web application is engineered with Next.js Server Components, automated WebP image delivery, tree-shaken bundles, semantic HTML5, and Schema.org structured data. This guarantees instant sub-second load times and top Google Lighthouse scores.',
    tag: 'Performance & SEO',
  },
  {
    id: 'faq-05',
    question: 'How do we collaborate and communicate during the build process?',
    answer:
      'We maintain transparent communication via Slack, WhatsApp, or Discord, coupled with weekly video syncs. You get direct access to private live Vercel staging environments to interact with and test features in real-time as they are coded.',
    tag: 'Workflow',
  },
  {
    id: 'faq-06',
    question: 'Do you offer post-launch support and ongoing maintenance?',
    answer:
      'All completed projects include 30 days of complimentary post-launch support for bug fixes, performance monitoring, and handover documentation. I also offer flexible monthly retainer packages for continuous feature development.',
    tag: 'Support',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll tracking to drive the smooth GSAP-like rotation & glide trajectory into Contact section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Smooth rotation as user scrolls down towards Contact Us
  const cardRotate = useTransform(scrollYProgress, [0.1, 0.6, 1.0], [0, -7, -14]);
  const cardY = useTransform(scrollYProgress, [0.1, 0.6, 1.0], [0, 160, 380]);
  const cardScale = useTransform(scrollYProgress, [0.1, 0.7, 1.0], [1, 0.96, 0.92]);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={containerRef}
      id="faq"
      className="relative py-24 sm:py-28 lg:py-36 bg-[#eae9e5] text-slate-900 overflow-hidden select-none"
    >
      {/* ── Ambient Background Pattern ── */}
      <div className="absolute inset-0 bg-[radial-gradient(#99a1af_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-35 pointer-events-none" />

      <div className="mx-auto max-w-[1420px] w-full px-4 xs:px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* ── Section Header ── */}
        <div className="text-left font-sans mb-12 sm:mb-16 lg:mb-20">
          <span
            style={{ fontFamily: 'var(--font-caveat), cursive' }}
            className="text-[#0052ff] text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wide -rotate-2 inline-block mb-1"
          >
            got a doubt? →
          </span>
          <h2 className="text-2xl xs:text-3xl sm:text-5xl lg:text-[56px] font-extrabold font-sans tracking-tight text-slate-950 uppercase leading-none">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="text-xs sm:text-sm lg:text-base font-sans text-slate-600 font-medium mt-2 max-w-2xl leading-relaxed">
            Everything you need to know about partnering together, development timelines, architecture, and post-launch support.
          </p>
        </div>

        {/* ── Two-Column Layout (Left: Animated Card, Right: Accordion) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Floating Animated Feature Card that travels down into Contact on scroll */}
          <div className="lg:col-span-5 sticky top-28 self-start hidden lg:block">
            <motion.div
              style={{
                y: cardY,
                rotate: cardRotate,
                scale: cardScale,
              }}
              className="w-full transform-gpu will-change-transform"
            >
              <div className="relative rounded-[32px] bg-gradient-to-br from-[#ffffff] via-[#f8fafc] to-[#edf2f7] p-8 sm:p-9 border border-slate-300/80 shadow-[0_20px_50px_rgba(15,23,42,0.12)] overflow-hidden">
                {/* Decorative Subtle Grid & Glow */}
                <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-bl from-rose-500/10 via-lime-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr from-sky-500/10 via-indigo-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />

                {/* Top Badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950 text-white text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-lime-400" />
                    <span>Always Available</span>
                  </span>
                  <span className="text-xs font-bold text-slate-400 font-mono">
                    EST. 2024
                  </span>
                </div>

                {/* Main Card Content */}
                <div className="space-y-4 text-left">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0052ff] to-[#003fcc] text-white flex items-center justify-center shadow-lg shadow-blue-500/25">
                    <Code2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-extrabold font-sans text-slate-950 uppercase tracking-tight leading-tight">
                    Have a unique idea or custom requirements?
                  </h3>
                  <p className="text-sm text-slate-600 font-sans leading-relaxed">
                    No two projects are identical. Whether you need an MVP built in 7 days or a custom design system, let&apos;s brainstorm and craft the perfect solution.
                  </p>
                </div>

                {/* Card CTA Footer */}
                <div className="mt-8 pt-6 border-t border-slate-200/80 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Scroll to connect
                  </span>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#0052ff] hover:text-slate-950 transition-colors"
                  >
                    <span>Jump to form</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Clean Modern Accordion List */}
          <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-4.5">
            {faqList.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={item.id}
                  className={`group rounded-[22px] sm:rounded-[24px] border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'bg-white border-slate-300 shadow-[0_10px_30px_rgba(15,23,42,0.08)]'
                      : 'bg-white/80 hover:bg-white border-slate-200/80 hover:border-slate-300 shadow-sm'
                  }`}
                >
                  <button
                    onClick={() => toggleQuestion(index)}
                    aria-expanded={isOpen}
                    className="w-full text-left px-5 sm:px-7 py-5 sm:py-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  >
                    <span className="text-sm sm:text-base lg:text-lg font-bold font-sans text-slate-950 tracking-tight leading-snug">
                      {item.question}
                    </span>
                    
                    {/* Animated Circular Button (+ / −) */}
                    <div
                      className={`shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isOpen
                          ? 'bg-[#0052ff] text-white rotate-180 shadow-md shadow-blue-500/30'
                          : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200 rotate-0'
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="w-4 h-4 stroke-[2.5]" />
                      ) : (
                        <Plus className="w-4 h-4 stroke-[2.5]" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-7 pb-6 pt-1 border-t border-slate-100">
                          <p className="text-xs sm:text-sm lg:text-[15px] font-sans text-slate-600 font-normal leading-relaxed">
                            {item.answer}
                          </p>
                          <div className="mt-3.5 inline-block">
                            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-500 font-mono">
                              {item.tag}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
