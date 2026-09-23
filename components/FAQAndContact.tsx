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
  ArrowRight,
} from 'lucide-react';
import RetroPhone from '@/components/RetroPhone';

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

/* ── Background Video Scrubber on Desktop / Static Image on Mobile (60% Opacity) ── */
function BackgroundVideoPlayer({ progress }: { progress?: any }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const videoSrc = '/man_walking_crossing_arms.mp4';
  const posterSrc = '/man_walking_crossing_arms_poster.jpg';
  const defaultDuration = 9.8;

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;
    if (video.readyState === 0) {
      video.load();
    }

    let targetTime = 0;
    let isSeeking = false;

    const applySeek = () => {
      if (!video || isSeeking || video.readyState < 1) return;
      if (Math.abs(video.currentTime - targetTime) > 0.04) {
        isSeeking = true;
        try {
          if ('fastSeek' in video && typeof (video as any).fastSeek === 'function') {
            (video as any).fastSeek(targetTime);
          } else {
            video.currentTime = targetTime;
          }
        } catch {
          video.currentTime = targetTime;
        }
      }
    };

    const onSeeked = () => {
      isSeeking = false;
      applySeek();
    };

    video.addEventListener('seeked', onSeeked);

    const onMetadata = () => {
      const dur = video.duration || defaultDuration;
      const initialRatio = progress ? progress.get() : 0;
      targetTime = Math.min(Math.max(initialRatio, 0), 1) * Math.max(dur - 0.05, 0.1);
      applySeek();
    };

    if (video.readyState >= 1) {
      onMetadata();
    } else {
      video.addEventListener('loadedmetadata', onMetadata, { once: true });
    }

    let unsubscribe: (() => void) | undefined;
    if (progress) {
      unsubscribe = progress.on('change', (latest: number) => {
        const dur = video.duration || defaultDuration;
        const clamped = Math.min(Math.max(latest, 0), 1);
        targetTime = clamped * Math.max(dur - 0.05, 0.1);
        applySeek();
      });
    }

    return () => {
      video.removeEventListener('seeked', onSeeked);
      if (unsubscribe) unsubscribe();
    };
  }, [progress, isDesktop]);

  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-none transform-gpu">
      {/* Mobile: Static Picture (zero video download, ultra fast) */}
      <img
        src={posterSrc}
        alt="Usama Faheem FAQ"
        style={{ opacity: 0.60 }}
        className={`w-full h-full object-cover object-[center_35%] sm:object-[center_top] pointer-events-none transform-gpu ${
          isDesktop ? 'hidden' : 'block'
        }`}
      />

      {/* Desktop: Smooth Scroll-Scrubbed Video Animation */}
      {isDesktop && (
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          playsInline
          muted
          preload="none"
          style={{ opacity: 0.60 }}
          className="w-full h-full object-cover object-[center_top] pointer-events-none transform-gpu"
        />
      )}

      {/* Soft cinematic vignette blending cleanly with #eae9e5 background */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#eae9e5]/20 via-transparent to-[#eae9e5]/30" />
    </div>
  );
}



export default function FAQAndContact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const faqSectionRef = useRef<HTMLElement>(null);
  const contactSectionRef = useRef<HTMLElement>(null);

  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    projectType: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Dynamic clearance tracker ensuring the coiled phone wire NEVER touches the form card
  const formCardRef = useRef<HTMLDivElement>(null);
  const [wireBottomY, setWireBottomY] = useState(570);

  useEffect(() => {
    if (!formCardRef.current) return;
    const calculateWireY = () => {
      if (formCardRef.current) {
        const formHeight = formCardRef.current.offsetHeight;
        const phoneTopOffset = window.innerWidth >= 640 ? 64 : 48;
        const formBottomRelToPhone = formHeight - phoneTopOffset;
        // Guaranteed 80px clearance below form bottom & comfortably below 520px handset boot (502px)
        const safeY = Math.max(620, formBottomRelToPhone + 80);
        setWireBottomY(safeY);
      }
    };
    calculateWireY();
    const ro = new ResizeObserver(calculateWireY);
    ro.observe(formCardRef.current);
    window.addEventListener('resize', calculateWireY);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', calculateWireY);
    };
  }, []);

  // Continuous Scroll progress through entire container (FAQ + Contact)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });


  // Luxurious buttery-smooth spring physics (absorbs fast scroll wheel jerks with graceful inertia)
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 42,
    stiffness: 70,
    mass: 0.25,
    restDelta: 0.001,
  });

  // Continuous journey from start of FAQ (0.0) to end of Contact (1.0)
  const bgScrollRatio = useTransform(smoothProgress, [0.0, 1.0], [0, 1], {
    clamp: true,
  });

  // Shift to Left ONLY when Contact Us arrives:
  // During entire FAQ, cards stay at their normal right position (x: 0).
  // When Contact Us section rises up towards the pinned note, the cards smoothly glide left (-115px) to align with Contact!
  const { scrollYProgress: contactEnterProgress } = useScroll({
    target: contactSectionRef,
    offset: ['start 70%', 'start 30%'],
  });

  const smoothRightRail = useSpring(contactEnterProgress, {
    damping: 24,
    stiffness: 140,
    mass: 0.15,
    restDelta: 0.001,
  });

  // Glides smoothly from 0 to -115px exactly when Contact Us meets the pinned card
  const rightRailX = useTransform(smoothRightRail, [0, 1], [0, -115]);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('developer@usamafaheem.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsChatOpen(true);
    const handleClose = () => setIsChatOpen(false);
    window.addEventListener('gemini-chat-open', handleOpen);
    window.addEventListener('gemini-chat-close', handleClose);
    return () => {
      window.removeEventListener('gemini-chat-open', handleOpen);
      window.removeEventListener('gemini-chat-close', handleClose);
    };
  }, []);

  const handleToggleChat = () => {
    if (typeof window !== 'undefined') {
      if (isChatOpen) {
        window.dispatchEvent(new CustomEvent('openGeminiChat', { detail: { forceClose: true } }));
        setIsChatOpen(false);
      } else {
        window.dispatchEvent(new CustomEvent('openGeminiChat', { detail: { forceOpen: true } }));
        setIsChatOpen(true);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div
      ref={containerRef}
      className="relative text-slate-900"
    >

      {/* ── Sticky Full-Viewport Background Video Layer ── */}
      <div className="sticky top-0 h-screen w-full pointer-events-none z-0 overflow-hidden -mb-[100vh]">
        <BackgroundVideoPlayer progress={bgScrollRatio} />
      </div>

      {/* ── Unified Content Wrapper for FAQ + Contact ── */}
      <div className="relative z-10 mx-auto max-w-[1420px] w-full px-4 xs:px-6 sm:px-8 lg:px-12 pt-8 sm:pt-12 lg:pt-14 pb-28 sm:pb-36 lg:pb-44">

        {/* Master Two-Column Flex Container: Left = FAQ + Form; Right = Sticky Rail until Form Ends */}
        <div className="relative flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-14 xl:gap-16">

          {/* ════════════════════════════════════════════════════════════════════════
              LEFT COLUMN: 1) FAQ ACCORDION FIRST → 2) CONTACT FORM DIRECTLY BELOW
              ════════════════════════════════════════════════════════════════════════ */}
          <div className="w-full lg:flex-1 min-w-0">

            {/* ── 1. FAQ ACCORDION SUB-SECTION ── */}
            <section id="faq" ref={faqSectionRef} className="scroll-mt-24">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
                <div className="text-left font-sans max-w-2xl">
                  <div className="inline-flex items-center gap-2 bg-[#d8ff00] border-2 border-black px-3.5 py-1 rounded-full shadow-sm mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-black" />
                    <span style={{ fontFamily: 'var(--font-caveat), cursive' }} className="text-base font-bold text-black font-caveat">Got A Doubt?</span>
                  </div>
                  <h2 className="text-3xl xs:text-4xl sm:text-5xl lg:text-[48px] font-extrabold font-sans tracking-tight uppercase leading-none text-slate-950">
                    FREQUENTLY ASKED QUESTIONS
                  </h2>
                  <p className="text-xs sm:text-sm lg:text-base font-sans font-medium mt-3 leading-relaxed text-slate-600">
                    Everything you need to know about partnering together, development timelines, architecture, and post-launch support.
                  </p>
                </div>

                {/* ── Exact "Ask" AI Button matching user's design (Toggle Chatbot) ── */}
                <button
                  type="button"
                  onClick={handleToggleChat}
                  aria-label={isChatOpen ? 'Close AI Assistant' : 'Ask AI Assistant a question'}
                  title={isChatOpen ? 'Close AI Chat' : 'Ask Usama AI any question'}
                  className={`inline-flex items-center gap-2 self-start sm:self-auto px-4 py-2 rounded-2xl border transition-all duration-200 active:scale-95 cursor-pointer shrink-0 group shadow-xs hover:shadow-md ${
                    isChatOpen
                      ? 'bg-slate-950 text-white border-slate-900 ring-2 ring-blue-500/50'
                      : 'bg-white hover:bg-slate-50 text-slate-950 border-slate-300/90 hover:border-blue-500/60'
                  }`}
                >
                  <div className="relative flex items-center justify-center">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="shrink-0 transition-transform duration-200 group-hover:scale-105"
                    >
                      {/* Chat bubble body with rounded corners & tail pointing down-left */}
                      <path
                        d="M20 15C20 16.1046 19.1046 17 18 17H7.5L3.5 20.5V6C3.5 4.89543 4.39543 4 5.5 4H14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={isChatOpen ? 'text-white' : 'text-slate-900 group-hover:text-[#0052ff] transition-colors'}
                      />
                      {/* 4-point Sparkle / Plus on top-right corner */}
                      <path
                        d="M19.5 2V7M17 4.5H22"
                        stroke={isChatOpen ? '#38bdf8' : '#0052ff'}
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <span
                    className={`font-sans font-bold text-[14px] transition-colors ${
                      isChatOpen ? 'text-white' : 'text-slate-950 group-hover:text-[#0052ff]'
                    }`}
                  >
                    {isChatOpen ? 'Close' : 'Ask'}
                  </span>
                </button>
              </div>

              {/* FAQ Accordion Tiles */}
              <div className="space-y-4 sm:space-y-5">
                {faqList.map((item, index) => {
                  const isOpen = openIndex === index;

                  return (
                    <div
                      key={item.id}
                      className={`relative rounded-none border-y border-slate-300/70 border-l-[3.5px] border-r-[3.5px] transition-all duration-300 overflow-hidden backdrop-blur-xl group ${isOpen
                        ? 'bg-white/60 border-l-[#d8ff00] border-r-[#d8ff00] shadow-[0_12px_36px_rgba(0,0,0,0.08)]'
                        : 'bg-white/35 hover:bg-white/50 border-l-slate-900 border-r-slate-900 shadow-[0_4px_20px_rgba(0,0,0,0.04)]'
                        }`}
                    >
                      <button
                        onClick={() => toggleQuestion(index)}
                        aria-expanded={isOpen}
                        className="w-full text-left p-5 sm:p-6 sm:py-5 flex items-center justify-between gap-4 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-2.5 sm:gap-4 min-w-0">
                          <span
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-none flex items-center justify-center text-xs font-mono font-bold shrink-0 transition-colors ${isOpen
                              ? 'bg-slate-950 text-white'
                              : 'bg-white/70 text-slate-900 border border-slate-400/60'
                              }`}
                          >
                            {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                          </span>
                          <span className="hidden sm:inline font-mono text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-slate-500">
                            {item.id.replace('faq-', '0')}
                          </span>
                          <h3
                            className={`text-[13px] sm:text-base md:text-lg font-bold transition-colors leading-snug ${isOpen ? 'text-slate-950 font-extrabold' : 'text-slate-800 group-hover:text-slate-950'
                              }`}
                          >
                            {item.question}
                          </h3>
                        </div>

                        <span
                          className={`hidden sm:inline-block px-2.5 py-1 text-[10px] font-mono font-bold uppercase rounded-none border transition-colors shrink-0 ${isOpen
                            ? 'bg-[#d8ff00]/20 text-slate-900 border-[#d8ff00]'
                            : 'bg-slate-100/80 text-slate-600 border-slate-300'
                            }`}
                        >
                          {item.tag}
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-5 sm:px-6 sm:pb-6 sm:pl-16 text-slate-700 text-xs sm:text-sm md:text-base leading-relaxed font-sans font-medium border-t border-slate-300/50 pt-4">
                              <p>{item.answer}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div
                        className={`absolute bottom-0 left-0 right-0 transition-all duration-300 pointer-events-none ${isOpen
                          ? 'h-[2px] bg-gradient-to-r from-transparent via-[#d8ff00] to-transparent shadow-[0_0_16px_rgba(216,255,0,0.9)] opacity-100'
                          : 'h-[1.5px] bg-gradient-to-r from-transparent via-[#d8ff00]/60 to-transparent shadow-[0_0_10px_rgba(216,255,0,0.45)] opacity-75 group-hover:opacity-100 group-hover:via-[#d8ff00]'
                          }`}
                      />
                    </div>
                  );
                })}
              </div>

              {/* ── Bottom Fallback: "Got a question not covered above?" ── */}
              <div className="mt-6 p-4 sm:p-5 rounded-none border-y border-slate-300/80 border-l-[3.5px] border-r-[3.5px] border-l-[#0052ff] border-r-[#0052ff] bg-white/60 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 backdrop-blur-md">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-[#d8ff00] flex items-center justify-center shrink-0 shadow-xs">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-[13.5px] font-bold text-slate-950 font-sans">
                      Got a question that isn&apos;t covered above?
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-500 font-sans">
                      Ask Usama AI Assistant directly for instant answers about projects, pricing, or tech stack.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleToggleChat}
                  className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-950 hover:bg-[#0052ff] text-white text-xs font-bold font-sans transition-all active:scale-95 shadow-xs cursor-pointer shrink-0"
                >
                  <span>{isChatOpen ? 'Close Assistant' : 'Ask Usama AI'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </section>

            {/* ── 2. CONTACT FORM (PAPER NOTE WITH 3D AVATAR & VINTAGE RED TELEPHONE) ── */}
            <section id="contact" ref={contactSectionRef} className="mt-16 sm:mt-14 scroll-mt-24 sm:scroll-mt-32 pt-24 sm:pt-20 lg:pt-24 relative">

              <div className="relative w-full max-w-[450px] mx-auto md:mx-0 md:ml-48 lg:ml-56 mt-2 sm:mt-4">
                {/* ── RETRO RED TELEPHONE HANDSET (LEFT OF FORM, CONTINUING WIRE SAFELY BELOW FORM) ── */}
                <div className="hidden sm:block absolute -left-44 lg:-left-52 top-12 sm:top-16 z-20 pointer-events-none">
                  <RetroPhone cordWidth={920} wireBottomY={wireBottomY} />
                </div>

                {/* The Stylized Paper Note Sheet Form */}
                <div ref={formCardRef} className="relative w-full rounded-[22px] sm:rounded-[26px] p-6 sm:p-7 pt-16 sm:pt-20 border border-[#e2ded4] bg-[#faf8f3]/95 text-slate-900 shadow-[0_18px_48px_rgba(0,0,0,0.09)] backdrop-blur-lg">

                {/* ── Finalized 3D Thumbs-Up Avatar (Centered, Compact & Subtly Animated) ── */}
                <div className="absolute -top-[106px] sm:-top-[125px] left-1/2 -translate-x-1/2 z-30 w-[130px] sm:w-[150px] pointer-events-none drop-shadow-[0_12px_22px_rgba(0,0,0,0.18)]">
                  {/* Floating Speech Bubble */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1, y: [0, -3, 0] }}
                    transition={{
                      opacity: { duration: 0.4 },
                      y: { repeat: Infinity, duration: 3.5, ease: 'easeInOut' },
                    }}
                    className="absolute -top-6.5 left-1/2 -translate-x-1/2 bg-white/95 border border-slate-200/90 text-slate-800 text-[10.5px] font-bold px-3 py-0.5 rounded-full shadow-md whitespace-nowrap z-40 flex items-center gap-1 backdrop-blur-xs"
                  >
                    <span>Ready to build? 🚀</span>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white border-b border-r border-slate-200/90 rotate-45" />
                  </motion.div>

                  {/* Smooth, Gentle Subtle Animation (Calm & Elegant) */}
                  <motion.div
                    animate={{
                      y: [0, -3.5, 0],
                      rotate: [-1.2, 1.2, -1.2],
                    }}
                    transition={{
                      duration: 4.2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="relative w-full h-[165px] sm:h-[190px] origin-bottom"
                  >
                    <Image
                      src="/usaam_emoji.png"
                      alt="Usama 3D Avatar giving thumbs up"
                      fill
                      className="object-contain object-bottom select-none"
                      priority
                    />
                  </motion.div>
                </div>

                {/* Top-Left Masking Tape Strip */}
                <div className="absolute -top-3 left-6 w-20 h-7 bg-lime-200/70 backdrop-blur-[1px] border border-lime-300/60 -rotate-[8deg] shadow-[0_2px_6px_rgba(0,0,0,0.06)] z-20 pointer-events-none rounded-xs" />

                {/* Top-Right Masking Tape Strip */}
                <div className="absolute -top-3 right-6 w-20 h-7 bg-lime-200/70 backdrop-blur-[1px] border border-lime-300/60 rotate-[7deg] shadow-[0_2px_6px_rgba(0,0,0,0.06)] z-20 pointer-events-none rounded-xs" />

                {/* Form Heading Inside Paper */}
                <div className="text-left font-sans mb-5 sm:mb-6">
                  <span className="text-[#0052ff] text-[11px] font-extrabold uppercase tracking-widest block mb-1">
                    GET IN TOUCH
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold font-sans uppercase tracking-tight leading-tight text-slate-950">
                    LET&apos;S MAKE IT FUN
                  </h3>
                  <p className="text-xs sm:text-[12.5px] font-medium mt-1 text-slate-500">
                    Fill in the details below and I&apos;ll get back to you within 24 hours.
                  </p>
                </div>

                {/* Interactive Form Fields */}
                <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4 text-left font-sans">
                  <div>
                    <label className="block text-[10.5px] font-bold uppercase tracking-wider mb-1.5 text-slate-600">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 sm:py-2.5 rounded-xl border border-[#ded7c8] bg-white/90 hover:bg-white text-slate-900 text-[13px] sm:text-sm placeholder:text-slate-400 font-medium shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:border-slate-400 focus:outline-none focus-visible:outline-none focus:border-[#0052ff] focus:ring-2 focus:ring-[#0052ff]/20 focus:bg-white transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-[10.5px] font-bold uppercase tracking-wider mb-1.5 text-slate-600">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 sm:py-2.5 rounded-xl border border-[#ded7c8] bg-white/90 hover:bg-white text-slate-900 text-[13px] sm:text-sm placeholder:text-slate-400 font-medium shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:border-slate-400 focus:outline-none focus-visible:outline-none focus:border-[#0052ff] focus:ring-2 focus:ring-[#0052ff]/20 focus:bg-white transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-[10.5px] font-bold uppercase tracking-wider mb-1.5 text-slate-600">
                      Project Type
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. SaaS App / Portfolio Redesign"
                      value={formState.projectType}
                      onChange={(e) => setFormState({ ...formState, projectType: e.target.value })}
                      className="w-full px-3.5 py-2.5 sm:py-2.5 rounded-xl border border-[#ded7c8] bg-white/90 hover:bg-white text-slate-900 text-[13px] sm:text-sm placeholder:text-slate-400 font-medium shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:border-slate-400 focus:outline-none focus-visible:outline-none focus:border-[#0052ff] focus:ring-2 focus:ring-[#0052ff]/20 focus:bg-white transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-[10.5px] font-bold uppercase tracking-wider mb-1.5 text-slate-600">
                      Tell Me More About It
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Timeline, goals, budget, or wild ideas..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 sm:py-2.5 rounded-xl border border-[#ded7c8] bg-white/90 hover:bg-white text-slate-900 text-[13px] sm:text-sm placeholder:text-slate-400 font-medium shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:border-slate-400 focus:outline-none focus-visible:outline-none focus:border-[#0052ff] focus:ring-2 focus:ring-[#0052ff]/20 focus:bg-white transition-all duration-200 resize-none"
                    />
                  </div>

                  {/* Submit Button Centered Inline-Block per Audio Instructions */}
                  <div className="flex justify-center pt-2 sm:pt-2.5">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#0052ff] hover:bg-[#003fcc] text-white font-extrabold text-xs sm:text-[13px] uppercase tracking-wider shadow-[0_10px_22px_rgba(0,82,255,0.35)] hover:shadow-[0_14px_28px_rgba(0,82,255,0.48)] transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                    >
                      {submitted ? (
                        <>
                          <Check className="w-4 h-4 text-white" />
                          <span>Message Dispatched!</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="w-3.5 h-3.5 text-white" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>

            </div>

              {/* Mobile Contact Action Row (< lg) */}
              <div className="lg:hidden mt-8 max-w-[450px] mx-auto md:mx-0 p-4 rounded-3xl bg-white/85 backdrop-blur-md border border-slate-300/80 shadow-md flex flex-col gap-3">
                {/* Top Row: Direct Tap-to-Copy Email Pill */}
                <div
                  onClick={handleCopyEmail}
                  className="w-full py-2.5 px-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-between gap-2.5 cursor-pointer transition-all active:scale-[0.98]"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        copiedEmail ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-white'
                      }`}
                    >
                      {copiedEmail ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <Mail className="w-3.5 h-3.5" />
                      )}
                    </div>
                    <div className="min-w-0 text-left">
                      <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                        Direct Email
                      </span>
                      <span className="block text-[12px] font-bold text-slate-900 truncate font-sans">
                        developer@usamafaheem.com
                      </span>
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-1 text-[9.5px] font-bold uppercase tracking-wider rounded-lg transition-colors shrink-0 font-mono ${
                      copiedEmail
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {copiedEmail ? 'COPIED!' : 'COPY'}
                  </span>
                </div>

                {/* Bottom Row: 1-Click WhatsApp & 1-Click Send Email Buttons */}
                <div className="flex items-center gap-2.5">
                  <a
                    href="https://wa.me/923143416588"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Chat on WhatsApp"
                    className="flex-1 py-2.5 px-3 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98] transition-all"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href="mailto:developer@usamafaheem.com"
                    aria-label="Send Email"
                    className="flex-1 py-2.5 px-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98] transition-all"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send Email</span>
                  </a>
                </div>
              </div>

            </section>

          </div>

          {/* ════════════════════════════════════════════════════════════════════════
              RIGHT COLUMN: STICKY RAIL (PERSISTS ACROSS FAQ + CONTACT FORM UNTIL FORM ENDS!)
              Cleanly anchored in its dedicated column with zero overlap on FAQ tiles
              ════════════════════════════════════════════════════════════════════════ */}
          <div className="hidden lg:flex flex-col w-[330px] shrink-0 sticky top-32 z-20 self-start mt-8 lg:mt-12 pointer-events-auto">
            <motion.div
              style={{ x: rightRailX }}
              className="flex flex-col gap-5 w-full transform-gpu will-change-transform"
            >

              {/* ── 1. HANDCRAFTED TAPED PAPER NOTE (IDEA 5) WITH 3D PUSHPIN ── */}
              <div className="relative p-5 w-full flex flex-col items-center justify-center bg-[#faf8f3] border border-[#e2ded4] text-slate-900 shadow-md rotate-2 transition-transform duration-300 hover:rotate-0 hover:scale-102">
                {/* Masking Tape */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-lime-200/80 border border-lime-300/70 -rotate-2 shadow-xs pointer-events-none" />

                {/* 3D Realistic Pushpin / Thumbtack */}
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10 pointer-events-none -rotate-6">
                  <svg
                    width="26"
                    height="34"
                    viewBox="0 0 28 36"
                    fill="none"
                    className="drop-shadow-[2px_6px_5px_rgba(0,0,0,0.4)]"
                  >
                    <defs>
                      <radialGradient id="pushpinHead" cx="35%" cy="30%" r="70%">
                        <stop offset="0%" stopColor="#60a5fa" />
                        <stop offset="40%" stopColor="#0052ff" />
                        <stop offset="85%" stopColor="#1d4ed8" />
                        <stop offset="100%" stopColor="#1e3a8a" />
                      </radialGradient>
                      <linearGradient id="needleShine" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#64748b" />
                        <stop offset="50%" stopColor="#f8fafc" />
                        <stop offset="100%" stopColor="#334155" />
                      </linearGradient>
                    </defs>
                    {/* Pinhole shadow on tape/paper */}
                    <ellipse cx="14" cy="33.5" rx="2.2" ry="0.9" fill="rgba(0,0,0,0.45)" />
                    {/* Metal needle tip piercing through tape */}
                    <polygon points="12.5,23 15.5,23 14,33 12.5,23" fill="url(#needleShine)" />
                    {/* Pin collar base ring */}
                    <ellipse cx="14" cy="22.5" rx="7" ry="2.5" fill="#1e3a8a" />
                    <ellipse cx="14" cy="22" rx="6.5" ry="2.2" fill="url(#pushpinHead)" />
                    {/* Pin body / waist */}
                    <path d="M9 13 C9 18, 10.5 21, 14 21 C17.5 21, 19 18, 19 13 Z" fill="url(#pushpinHead)" />
                    {/* Upper collar rim */}
                    <ellipse cx="14" cy="13" rx="6.5" ry="2" fill="#1d4ed8" />
                    {/* Pin top spherical dome */}
                    <circle cx="14" cy="9" r="6" fill="url(#pushpinHead)" />
                    {/* Glossy specular light reflection */}
                    <ellipse cx="12" cy="7.5" rx="2" ry="1.2" fill="#ffffff" opacity="0.75" />
                  </svg>
                </div>

                <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-slate-400 mb-1">
                  QUICK NOTE
                </span>
                <span style={{ fontFamily: 'var(--font-caveat), cursive' }} className="text-2xl text-[#0052ff] font-bold text-center leading-tight font-caveat">
                  &quot;Still got doubts?&quot;
                </span>
                <p className="text-xs font-sans text-slate-600 text-center mt-2 leading-relaxed">
                  Hit me up directly on WhatsApp or email — let&apos;s clear it up in 5 mins! ☕
                </p>
                <a href="#contact" className="mt-2.5 text-[11px] font-bold uppercase tracking-wider text-slate-900 underline underline-offset-4 hover:text-[#5f7a12] transition-colors">
                  Drop a Line →
                </a>
              </div>

              {/* ── 2. USAMA 3D AVATAR MASCOT BADGE (IDEA 10) ── */}
              <div className="relative p-4 w-full flex flex-col items-center justify-center bg-white/60 backdrop-blur-xl border-y border-slate-300/80 border-l-[3.5px] border-r-[3.5px] border-l-slate-900 border-r-slate-900 shadow-md rotate-0 transition-transform duration-300 hover:scale-102">
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-slate-500 mb-1.5">
                  DIRECT ACCESS
                </span>
                <div className="relative mt-1 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full border-2 border-slate-900 overflow-hidden bg-gradient-to-b from-[#d8ff00]/20 to-white shadow-md">
                    <Image src="/usaam_emoji.png" alt="Usama Faheem" width={64} height={64} loading="lazy" className="w-full h-full object-contain scale-110 translate-y-1" />
                  </div>
                  <div className="mt-2.5 px-3 py-0.5 bg-slate-950 text-white text-[10px] font-mono font-bold tracking-wider shadow-sm">
                    &quot;ASK ME ANYTHING&quot;
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#d8ff00] to-transparent shadow-[0_0_10px_rgba(216,255,0,0.5)]" />
              </div>

              {/* ── 3. COMPACT CONTACT DOCK (LET'S TALK / SAY HI + EMAIL + CIRCULAR WHATSAPP) ── */}
              <div className="relative p-4 w-full bg-white/60 backdrop-blur-xl border-y border-slate-300/80 border-l-[3.5px] border-r-[3.5px] border-l-slate-900 border-r-slate-900 shadow-md -rotate-1 transition-transform duration-300 hover:rotate-0 hover:scale-102">

                {/* Compact Heading */}
                <div className="text-left mb-2.5">
                  <span
                    style={{ fontFamily: 'var(--font-caveat), cursive' }}
                    className="text-[#0052ff] text-base font-bold block -rotate-1 font-caveat"
                  >
                    have an idea? →
                  </span>
                  <div className="flex items-center gap-1.5 font-sans font-extrabold text-lg tracking-tight uppercase leading-none text-slate-950">
                    <span>LET&apos;S TALK</span>
                    <span className="text-[#0052ff]">SAY HI</span>
                  </div>
                </div>

                {/* Direct Email Chip with Rounded Pill Styling per Audio instructions */}
                <div
                  onClick={handleCopyEmail}
                  className="w-full py-2.5 px-3 rounded-xl bg-white/95 hover:bg-white border border-slate-300 flex items-center justify-between gap-2 cursor-pointer transition-all shadow-xs group select-none active:scale-[0.98]"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-200 ${
                        copiedEmail ? 'bg-emerald-600 text-white' : 'bg-slate-950 text-white'
                      }`}
                    >
                      {copiedEmail ? (
                        <Check className="w-3.5 h-3.5 text-white stroke-[2.5]" />
                      ) : (
                        <Mail className="w-3.5 h-3.5" />
                      )}
                    </div>
                    <span className="text-[11.5px] font-sans font-bold text-slate-900 group-hover:text-[#0052ff] transition-colors tracking-tight whitespace-nowrap">
                      developer@usamafaheem.com
                    </span>
                  </div>
                  <div
                    className={`px-2.5 py-0.5 text-[9px] font-sans font-extrabold uppercase tracking-wide rounded-md flex items-center justify-center transition-all duration-200 shrink-0 ${
                      copiedEmail
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 group-hover:bg-slate-900 group-hover:text-white'
                    }`}
                  >
                    {copiedEmail ? 'COPIED!' : 'COPY'}
                  </div>
                </div>

                {/* Bottom Row: Status + Circular WhatsApp Button with Official WhatsApp Green */}
                <div className="mt-3 flex items-center justify-between gap-2 pt-2 border-t border-slate-300/60">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                    <span>AVAILABLE NOW</span>
                  </div>

                  {/* Circular WhatsApp Button with Official Brand Green */}
                  <a
                    href="https://wa.me/923143416588"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Chat on WhatsApp"
                    className="relative group/wa w-9 h-9 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-[0_4px_14px_rgba(37,211,102,0.45)] hover:scale-110 active:scale-95 transition-all cursor-pointer"
                  >
                    <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-75 animate-ping pointer-events-none group-hover/wa:opacity-0" />
                    <MessageCircle className="w-4 h-4 relative z-10" />
                  </a>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#d8ff00] to-transparent shadow-[0_0_10px_rgba(216,255,0,0.5)]" />
              </div>

            </motion.div>
          </div>

        </div>

      </div>
    </div>
  );
}
