'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  Plus,
  Minus,
  Send,
  Check,
  Copy,
  ArrowUpRight,
  MessageCircle,
  Mail,
  MapPin,
  Sparkles,
} from 'lucide-react';

/* ── FAQ Data ── */
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

/* ── Editorial "Credibility" Card (Matching gsap.mp4) ── */
function EditorialCard() {
  return (
    <div className="relative w-[320px] sm:w-[340px] xl:w-[360px] rounded-[28px] bg-gradient-to-b from-[#181d29] via-[#10141e] to-[#0a0d14] p-3.5 sm:p-4 border border-slate-700/70 shadow-[0_30px_70px_rgba(15,23,42,0.35)] text-white overflow-hidden group select-none">
      {/* Top Banner (Matching "CREDIBILITY" in gsap.mp4) */}
      <div className="flex items-center justify-between px-3.5 py-2 rounded-[16px] bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-slate-950 mb-3 shadow-md">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-slate-950 animate-pulse" />
          <span className="text-[11px] font-black uppercase tracking-wider font-sans">
            CREDIBILITY
          </span>
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest font-mono text-slate-800">
          VOL. 26
        </span>
      </div>

      {/* Portrait Photo Container */}
      <div className="relative w-full h-[320px] sm:h-[350px] rounded-[20px] overflow-hidden bg-slate-900 border border-white/10 shadow-inner">
        <Image
          src="/Man_looking_back_over_shoulder_202608131928.jpeg"
          alt="Usama Faheem - Full Stack Architect"
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          priority
        />
        {/* Soft Glass / Vignette Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-black/20 pointer-events-none" />

        {/* Floating Verified Badge */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white/90 z-10">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>Verified Creator</span>
            </div>
            <div className="text-sm font-black font-sans uppercase tracking-tight text-white">
              Usama Faheem
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider border border-white/20">
            FULL STACK
          </span>
        </div>
      </div>

      {/* Bottom Detail Bar */}
      <div className="mt-3 px-2 pt-1 flex items-center justify-between text-xs text-slate-400">
        <span className="font-mono text-[10.5px] uppercase tracking-wider text-slate-400">
          Next.js 15 &bull; MERN &bull; GSAP
        </span>
        <span className="font-mono text-[10.5px] text-amber-400/90 font-bold">
          ★ 5.0 RATED
        </span>
      </div>
    </div>
  );
}

export default function FAQAndContact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const faqSlotRef = useRef<HTMLDivElement>(null);
  const contactSlotRef = useRef<HTMLDivElement>(null);

  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    projectType: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Dynamic relative offset between FAQ slot and Contact slot
  const [delta, setDelta] = useState({ x: 714, y: 1354 });

  useEffect(() => {
    const updateLayout = () => {
      if (faqSlotRef.current && contactSlotRef.current) {
        const faqRect = faqSlotRef.current.getBoundingClientRect();
        const contactRect = contactSlotRef.current.getBoundingClientRect();

        const newDeltaX = contactRect.left - faqRect.left;
        const newDeltaY = contactRect.top - faqRect.top;

        if (Math.abs(newDeltaY) > 200) {
          setDelta({ x: newDeltaX, y: newDeltaY });
        }
      }
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && containerRef.current) {
      observer = new ResizeObserver(() => {
        updateLayout();
      });
      observer.observe(containerRef.current);
    }

    const t1 = setTimeout(updateLayout, 100);
    const t2 = setTimeout(updateLayout, 500);
    const t3 = setTimeout(updateLayout, 1200);

    return () => {
      window.removeEventListener('resize', updateLayout);
      if (observer) observer.disconnect();
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // Continuous Scroll progress through container (FAQ + Contact)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Snappy yet smooth spring physics for authentic GSAP-like scrubbed momentum
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 120,
    mass: 0.1,
    restDelta: 0.0001,
  });

  // Normalized transition ratio: 0 in FAQ, smoothly reaches 1 as Contact section enters view
  const progressRatio = useTransform(smoothProgress, [0.18, 0.68], [0, 1], {
    clamp: true,
  });

  // Dynamic transforms directly proportional to actual measured delta between slots
  const cardX = useTransform(progressRatio, (r) => r * delta.x);
  const cardY = useTransform(progressRatio, (r) => r * delta.y);

  // Dynamic Rotation: Starts at -4deg in FAQ, swings up to +10deg in flight, settles at -2deg in Contact
  const cardRotate = useTransform(progressRatio, (r) => {
    if (r <= 0.5) {
      return -4 + (r / 0.5) * 14;
    } else {
      return 10 + ((r - 0.5) / 0.5) * -12;
    }
  });

  // Dynamic Scale: Gentle swell mid-air (1.0 -> 1.05 -> 1.0)
  const cardScale = useTransform(progressRatio, (r) => {
    if (r <= 0.5) {
      return 1.0 + (r / 0.5) * 0.05;
    } else {
      return 1.05 - ((r - 0.5) / 0.5) * 0.05;
    }
  });

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('usamafaheem989@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div
      ref={containerRef}
      className="relative bg-[#eae9e5] text-slate-900 select-none"
    >
      {/* ── Precision Dotted Grid Background Pattern ── */}
      <div className="absolute inset-0 bg-[radial-gradient(#99a1af_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-35 pointer-events-none" />

      {/* ════════════════════════════════════════════════════════════════════════
          PART 1: FAQ SECTION
          ════════════════════════════════════════════════════════════════════════ */}
      <section id="faq" className="relative py-24 sm:py-28 lg:py-36 z-10">
        <div className="mx-auto max-w-[1420px] w-full px-4 xs:px-6 sm:px-8 lg:px-12">
          
          {/* Section Header */}
          <div className="text-left font-sans mb-12 sm:mb-16 lg:mb-20">
            <span
              style={{ fontFamily: 'var(--font-caveat), cursive' }}
              className="text-[#e11d48] text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold tracking-wide -rotate-2 inline-block mb-1"
            >
              got a doubt? →
            </span>
            <h2 className="text-2xl xs:text-3xl sm:text-5xl lg:text-[56px] font-black font-sans tracking-tight text-slate-950 uppercase leading-none">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <p className="text-xs sm:text-sm lg:text-base font-sans text-slate-600 font-medium mt-2 max-w-2xl leading-relaxed">
              Everything you need to know about partnering together, development timelines, architecture, and post-launch support.
            </p>
          </div>

          {/* Grid Layout: Left Slot (holds travelling card) & Right Accordion */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Left Slot: Travelling Card anchored in its natural FAQ position */}
            <div className="lg:col-span-5 self-start">
              {/* Desktop Slot with Travelling Card */}
              <div
                ref={faqSlotRef}
                className="hidden lg:block relative w-[320px] sm:w-[340px] xl:w-[360px] h-[460px]"
              >
                <motion.div
                  style={{
                    x: cardX,
                    y: cardY,
                    rotate: cardRotate,
                    scale: cardScale,
                  }}
                  className="absolute top-0 left-0 z-30 pointer-events-auto origin-center transform-gpu will-change-transform"
                >
                  <EditorialCard />
                </motion.div>
              </div>

              {/* Mobile Inline Card */}
              <div className="block lg:hidden mb-8">
                <EditorialCard />
              </div>
            </div>

            {/* Right Column: Accordion List */}
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
                            ? 'bg-[#e11d48] text-white rotate-180 shadow-md shadow-rose-500/30'
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

      {/* ════════════════════════════════════════════════════════════════════════
          PART 2: CONTACT US SECTION ("LET'S TALK SAY HI")
          ════════════════════════════════════════════════════════════════════════ */}
      <section id="contact" className="relative py-20 sm:py-28 lg:py-36 z-10">
        <div className="mx-auto max-w-[1420px] w-full px-4 xs:px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-14 items-start">
            
            {/* ── LEFT COLUMN: TAPED PAPER NOTE FORM WITH 3D AVATAR SITTING ON TOP ── */}
            <div className="lg:col-span-6 relative pt-32 sm:pt-40 flex justify-center lg:justify-start">
              
              {/* 3D Usama Avatar Sitting on Top Edge with Legs Dangling Over Note */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 lg:left-1/2 lg:-translate-x-1/2 z-20 w-[240px] sm:w-[290px] pointer-events-none drop-shadow-[0_15px_25px_rgba(0,0,0,0.22)]">
                <motion.div
                  initial={{ y: -10 }}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative w-full h-[280px] sm:h-[340px]"
                >
                  <Image
                    src="/usama_sitting_avatar.png"
                    alt="Usama 3D Avatar sitting on paper note"
                    fill
                    className="object-contain object-bottom select-none"
                    priority
                  />
                </motion.div>
              </div>

              {/* The Stylized Paper Note Sheet */}
              <div className="relative w-full max-w-[500px] bg-[#faf8f3] rounded-[24px] sm:rounded-[28px] p-6 xs:p-8 sm:p-10 pt-16 sm:pt-20 border border-[#e2ded4] shadow-[0_20px_60px_rgba(0,0,0,0.08),0_4px_16px_rgba(0,0,0,0.04)]">
                
                {/* Top-Left Masking Tape Strip */}
                <div className="absolute -top-3.5 left-8 w-24 h-8 bg-amber-200/70 backdrop-blur-[1px] border border-amber-300/60 -rotate-[10deg] shadow-[0_2px_6px_rgba(0,0,0,0.08)] z-20 pointer-events-none rounded-xs" />
                
                {/* Top-Right Masking Tape Strip */}
                <div className="absolute -top-3.5 right-8 w-24 h-8 bg-amber-200/70 backdrop-blur-[1px] border border-amber-300/60 rotate-[8deg] shadow-[0_2px_6px_rgba(0,0,0,0.08)] z-20 pointer-events-none rounded-xs" />

                {/* Form Heading Inside Paper */}
                <div className="text-left font-sans mb-6 sm:mb-8">
                  <span className="text-[#e11d48] text-xs font-black uppercase tracking-widest block mb-1">
                    GET IN TOUCH
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black font-sans text-slate-950 uppercase tracking-tight leading-tight">
                    LET&apos;S MAKE IT FUN
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-500 font-medium mt-1">
                    Fill in the details below and I&apos;ll get back to you within 24 hours.
                  </p>
                </div>

                {/* Interactive Form Fields */}
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-4.5 text-left font-sans">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-3 sm:py-3.5 rounded-[14px] bg-[#f0ebe1] border border-[#ded7c8] text-slate-900 text-sm placeholder-slate-400 font-medium focus:outline-none focus:border-slate-800 focus:bg-[#ede6da] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-4 py-3 sm:py-3.5 rounded-[14px] bg-[#f0ebe1] border border-[#ded7c8] text-slate-900 text-sm placeholder-slate-400 font-medium focus:outline-none focus:border-slate-800 focus:bg-[#ede6da] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Project Type
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Next.js SaaS Web App / Portfolio Redesign"
                      value={formState.projectType}
                      onChange={(e) => setFormState({ ...formState, projectType: e.target.value })}
                      className="w-full px-4 py-3 sm:py-3.5 rounded-[14px] bg-[#f0ebe1] border border-[#ded7c8] text-slate-900 text-sm placeholder-slate-400 font-medium focus:outline-none focus:border-slate-800 focus:bg-[#ede6da] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                      Tell Me More About It
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Timeline, goals, budget, or wild ideas..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-[14px] bg-[#f0ebe1] border border-[#ded7c8] text-slate-900 text-sm placeholder-slate-400 font-medium focus:outline-none focus:border-slate-800 focus:bg-[#ede6da] transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Pill Button */}
                  <button
                    type="submit"
                    className="w-full mt-2 py-4 px-6 rounded-full bg-gradient-to-r from-[#ff381e] to-[#e0240d] hover:from-[#e0240d] hover:to-[#b81804] text-white font-black text-sm uppercase tracking-wider shadow-[0_10px_25px_rgba(239,68,68,0.35)] transition-all transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {submitted ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Message Dispatched!</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>

            </div>

            {/* ── RIGHT COLUMN: "LET'S TALK SAY HI" & DOCKED TRAVELLING CARD BELOW PARAGRAPH ── */}
            <div className="lg:col-span-6 text-left font-sans space-y-6 sm:space-y-7 lg:pl-6">
              
              {/* Massive Hero Heading */}
              <div className="space-y-1">
                <h2 className="text-5xl xs:text-6xl sm:text-7xl lg:text-[84px] font-black font-sans tracking-tight text-slate-950 uppercase leading-[0.92]">
                  LET&apos;S TALK
                </h2>
                <div className="text-5xl xs:text-6xl sm:text-7xl lg:text-[84px] font-black font-sans tracking-tight uppercase leading-[0.92] bg-gradient-to-r from-[#8b5cf6] via-[#ec4899] to-[#f97316] bg-clip-text text-transparent drop-shadow-sm">
                  SAY HI
                </div>
              </div>

              <p className="text-base sm:text-lg lg:text-xl text-slate-600 font-normal leading-relaxed max-w-lg">
                Got a project, a wild idea, or just wanna say hi? Hit me up, coffee is on me. Let&apos;s build something that stops people in their tracks.
              </p>

              {/* Dedicated Docking Slot for the Travelling Card (Right below the paragraph!) */}
              <div ref={contactSlotRef} className="pt-4 sm:pt-6">
                {/* Desktop Slot Placeholder */}
                <div className="hidden lg:block w-[320px] sm:w-[340px] xl:w-[360px] h-[460px] invisible pointer-events-none" />

                {/* Mobile Inline Card */}
                <div className="block lg:hidden my-6">
                  <EditorialCard />
                </div>
              </div>

              {/* Quick Contact Badges */}
              <div className="rounded-[24px] bg-white/90 backdrop-blur-md p-6 border border-slate-200/80 shadow-[0_12px_35px_rgba(15,23,42,0.06)] max-w-lg space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Available for Select Q3/Q4 Projects
                  </span>
                </div>

                {/* Email Copy Pill */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs sm:text-[13px] font-bold transition-colors cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5 text-slate-600" />
                    <span>usamafaheem989@gmail.com</span>
                    {copiedEmail ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                    )}
                  </button>

                  <a
                    href="https://wa.me/923249000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs sm:text-[13px] font-bold border border-emerald-200 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Chat</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>

                <div className="pt-2 flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>Lahore, Pakistan • Working with clients worldwide</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
