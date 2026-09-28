'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Compass,
  Palette,
  Code2,
  Rocket,
  Sparkles
} from 'lucide-react';

interface ProcessStep {
  stepNum: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  bubbleBg: string;
  glowColor: string;
  tagColor: string;
  titleColor: string;
  hoverTitleColor: string;
  badge1Class: string;
  badge2Class: string;
  cardBorderHover: string;
  cardShadowHover: string;
  badges: [string, string];
}

const stepsData: ProcessStep[] = [
  {
    stepNum: '01',
    title: 'Discussion & Planning',
    subtitle: 'Understanding your vision.',
    description: 'We talk about your project goals, audience, and features to create a clear, realistic roadmap.',
    icon: <Compass className="w-5 h-5 sm:w-6 sm:h-6 text-white stroke-[2.2]" />,
    bubbleBg: 'bg-[#0052ff]',
    glowColor: 'rgba(0, 82, 255, 0.45)',
    tagColor: 'text-[#0052ff]',
    titleColor: 'text-[#0052ff]',
    hoverTitleColor: 'group-hover:text-blue-700',
    badge1Class: 'bg-[#0052ff]/10 text-[#0052ff] border-[#0052ff]/25',
    badge2Class: 'bg-blue-50 text-blue-700 border-blue-200/70',
    cardBorderHover: 'hover:border-blue-400/50',
    cardShadowHover: 'hover:shadow-[0_16px_36px_rgba(0,82,255,0.12)]',
    badges: ['Roadmap', 'Discovery'],
  },
  {
    stepNum: '02',
    title: 'UI/UX & Wireframing',
    subtitle: 'Designing the look & feel.',
    description: 'Creating clean modern layouts and clickable Figma prototypes so you can preview everything beforehand.',
    icon: <Palette className="w-5 h-5 sm:w-6 sm:h-6 text-white stroke-[2.2]" />,
    bubbleBg: 'bg-[#8b5cf6]',
    glowColor: 'rgba(139, 92, 246, 0.45)',
    tagColor: 'text-purple-600',
    titleColor: 'text-[#8b5cf6]',
    hoverTitleColor: 'group-hover:text-purple-700',
    badge1Class: 'bg-purple-500/10 text-purple-600 border-purple-500/25',
    badge2Class: 'bg-purple-50 text-purple-700 border-purple-200/70',
    cardBorderHover: 'hover:border-purple-400/50',
    cardShadowHover: 'hover:shadow-[0_16px_36px_rgba(139,92,246,0.12)]',
    badges: ['Figma', 'Prototypes'],
  },
  {
    stepNum: '03',
    title: 'Development & Build',
    subtitle: 'Writing fast, clean code.',
    description: 'Turning designs into reality using Next.js and Tailwind, with smooth interactions and mobile responsiveness.',
    icon: <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-white stroke-[2.2]" />,
    bubbleBg: 'bg-[#10b981]',
    glowColor: 'rgba(16, 185, 129, 0.45)',
    tagColor: 'text-emerald-600',
    titleColor: 'text-[#10b981]',
    hoverTitleColor: 'group-hover:text-emerald-700',
    badge1Class: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/25',
    badge2Class: 'bg-emerald-50 text-emerald-700 border-emerald-200/70',
    cardBorderHover: 'hover:border-emerald-400/50',
    cardShadowHover: 'hover:shadow-[0_16px_36px_rgba(16,185,129,0.12)]',
    badges: ['Next.js', 'Tailwind'],
  },
  {
    stepNum: '04',
    title: 'Testing & Launch',
    subtitle: 'Ready for the world.',
    description: 'Testing speed, fixing every small detail, deploying live, and making sure everything runs smoothly.',
    icon: <Rocket className="w-5 h-5 sm:w-6 sm:h-6 text-white stroke-[2.2]" />,
    bubbleBg: 'bg-[#f97316]',
    glowColor: 'rgba(249, 115, 22, 0.45)',
    tagColor: 'text-orange-600',
    titleColor: 'text-[#f97316]',
    hoverTitleColor: 'group-hover:text-orange-700',
    badge1Class: 'bg-orange-500/10 text-orange-600 border-orange-500/25',
    badge2Class: 'bg-orange-50 text-orange-700 border-orange-200/70',
    cardBorderHover: 'hover:border-orange-400/50',
    cardShadowHover: 'hover:shadow-[0_16px_36px_rgba(249,115,22,0.12)]',
    badges: ['Vercel', 'QA Pass'],
  },
];

export default function Process() {
  const [isDesktop, setIsDesktop] = useState(false);

  React.useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section
      id="process"
      className="relative py-6 sm:py-8 lg:py-10 overflow-hidden font-sans bg-[#fbfcfb] text-slate-900 border-y border-slate-200/80"
    >
      {/* ── Precision Dotted Grid Background Canvas Matching Proven Metrics ── */}
      <div className="absolute inset-0 bg-[radial-gradient(#99a1af_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-40 pointer-events-none [mask-image:radial-gradient(ellipse_75%_75%_at_50%_50%,#000_60%,transparent_100%)]" />

      {/* ── Ambient Studio Glows in Usama's Brand Accents (Amber & Lime - Desktop only to save mobile GPU) ── */}
      <div className="hidden sm:block absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] left-[5%] w-[450px] h-[450px] rounded-full bg-[#d8ff00]/08 blur-[140px]" />
        <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] rounded-full bg-[#ccf23a]/06 blur-[150px]" />
        <div className="absolute top-[35%] right-[25%] w-[350px] h-[350px] rounded-full bg-[#ccf23a]/06 blur-[130px]" />
      </div>

      <div className="mx-auto max-w-[1440px] w-full px-5 sm:px-8 lg:px-12 relative z-10">

        {/* ── Section Header ── */}
        <div className="text-center max-w-4xl mx-auto mb-5 sm:mb-7">

          {/* Top Brand Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-[#d8ff00] border-2 border-black px-3.5 py-1 rounded-full shadow-sm mb-3"
          >
            <Sparkles className="w-3.5 h-3.5 text-black" />
            <span style={{ fontFamily: 'var(--font-caveat), cursive' }} className="text-base font-bold text-black font-caveat">How We Work</span>
          </motion.div>

          {/* Clean Responsive Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl xs:text-3xl sm:text-4xl lg:text-[42px] font-bold font-poppins tracking-tight uppercase leading-[1.2] text-slate-950"
          >
            {/* Mobile / Tablet view: 3 well-balanced lines */}
            <span className="block sm:hidden">
              <span className="block">How We Build</span>
              <span className="block mt-1">
                Your Product In 4
              </span>
              <span className="block text-[#0052ff] mt-1">
                Simple Steps
              </span>
            </span>

            {/* Desktop / Tablet screens (sm and up): clean 2-line layout */}
            <span className="hidden sm:block">
              <span className="block">How We Build Your Product</span>
              <span className="block text-[#0052ff] mt-1">
                In 4 Simple Steps
              </span>
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs sm:text-sm lg:text-base font-sans mt-2.5 leading-relaxed max-w-xl mx-auto text-slate-600"
          >
            From the initial idea to the final launch, here is how we bring your project to life.
          </motion.p>
        </div>

        {/* ═════════════════════════════════════════════════════════════════
            DESKTOP: COMPACT ELEGANT WAVE (FINALIZED CRISP WHITE CARDS)
           ═════════════════════════════════════════════════════════════════ */}
        {isDesktop && (
        <div className="hidden lg:block relative w-full max-w-[1260px] mx-auto h-[480px] my-2">

          {/* Continuous Gentle Sine Wave SVG Track + Embedded Nodes & Stems */}
          <div className="absolute inset-0 pointer-events-none z-30">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 1260 480"
              preserveAspectRatio="none"
              fill="none"
            >
              <defs>
                {/* Glowing filter for nodes */}
                <filter id="process-node-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* ── Soft Ambient Glow Trail for the Mountain Wave (Blue) ── */}
              <motion.path
                d="M 20,230 C 80,230 110,130 180,130 C 280,130 380,330 480,330 C 580,330 680,130 780,130 C 880,130 980,330 1080,330 C 1150,330 1180,230 1240,230"
                stroke="rgba(0, 82, 255, 0.25)"
                strokeWidth="8"
                strokeLinecap="round"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
              />

              {/* ── Mountain Wave Line Drawing from Left to Right (Solid Blue) ── */}
              <motion.path
                d="M 20,230 C 80,230 110,130 180,130 C 280,130 380,330 480,330 C 580,330 680,130 780,130 C 880,130 980,330 1080,330 C 1150,330 1180,230 1240,230"
                stroke="#0052ff"
                strokeWidth="3.2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 1 }}
                whileInView={{ pathLength: 1, opacity: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  pathLength: { duration: 1.15, ease: "easeInOut" },
                  opacity: { delay: 1.15, duration: 0.25, ease: "easeOut" }
                }}
              />

              {/* ── Flowing Dashed Mountain Wave (Vibrant Blue) ── */}
              <motion.path
                d="M 20,230 C 80,230 110,130 180,130 C 280,130 380,330 480,330 C 580,330 680,130 780,130 C 880,130 980,330 1080,330 C 1150,330 1180,230 1240,230"
                stroke="#0052ff"
                strokeWidth="3.2"
                strokeDasharray="8 8"
                strokeLinecap="round"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1, strokeDashoffset: [0, -32] }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  opacity: { delay: 1.1, duration: 0.3 },
                  strokeDashoffset: { repeat: Infinity, duration: 2.2, ease: "linear", delay: 1.1 }
                }}
              />

              {/* ── Vertical Connector Stems & Terminal Dots (Blue & Role Accents) ── */}
              <g opacity="0.95">
                {/* Step 1: Stem from Node 1 (148) straight DOWN to Card 1 Pointer Tip (244) */}
                <motion.g
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 1.35 }}
                >
                  <line x1="180" y1="148" x2="180" y2="244" stroke="#0052ff" strokeWidth="1.8" strokeDasharray="3 3" />
                  <circle cx="180" cy="148" r="2.5" fill="#0052ff" />
                  <circle cx="180" cy="244" r="3.5" fill="#0052ff" stroke="#ffffff" strokeWidth="1.5" />
                </motion.g>

                {/* Step 2: Stem from Card 2 Pointer Tip (217) straight DOWN to Node 2 (312) */}
                <motion.g
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 2.30 }}
                >
                  <line x1="480" y1="217" x2="480" y2="312" stroke="#0052ff" strokeWidth="1.8" strokeDasharray="3 3" />
                  <circle cx="480" cy="217" r="3.5" fill="#8b5cf6" stroke="#ffffff" strokeWidth="1.5" />
                  <circle cx="480" cy="312" r="2.5" fill="#0052ff" />
                </motion.g>

                {/* Step 3: Stem from Node 3 (148) straight DOWN to Card 3 Pointer Tip (244) */}
                <motion.g
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 3.25 }}
                >
                  <line x1="780" y1="148" x2="780" y2="244" stroke="#0052ff" strokeWidth="1.8" strokeDasharray="3 3" />
                  <circle cx="780" cy="148" r="2.5" fill="#0052ff" />
                  <circle cx="780" cy="244" r="3.5" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
                </motion.g>

                {/* Step 4: Stem from Card 4 Pointer Tip (217) straight DOWN to Node 4 (312) */}
                <motion.g
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 4.20 }}
                >
                  <line x1="1080" y1="217" x2="1080" y2="312" stroke="#0052ff" strokeWidth="1.8" strokeDasharray="3 3" />
                  <circle cx="1080" cy="217" r="3.5" fill="#f97316" stroke="#ffffff" strokeWidth="1.5" />
                  <circle cx="1080" cy="312" r="2.5" fill="#0052ff" />
                </motion.g>
              </g>

              {/* ── 4 NODES DIRECTLY ON THE WAVE (Original Lime Numbers & Blue STEP Labels) ── */}
              {/* Node 1: Crest 1 at (180, 130) */}
              <g transform="translate(180, 130)">
                <motion.g
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 1.25 }}
                >
                  <circle r="18" fill="#10121a" stroke="#d8ff00" strokeWidth="2.5" filter="url(#process-node-glow)" />
                  <text className="font-poppins font-extrabold" textAnchor="middle" dy="4.5" fill="#ccf23a" fontSize="11" fontWeight="900" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>01</text>
                  <text className="font-poppins font-extrabold" textAnchor="middle" dy="-22" fill="#0052ff" fontSize="9" fontWeight="900" letterSpacing="0.2em" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>STEP</text>
                </motion.g>
              </g>

              {/* Node 2: Valley 1 at (480, 330) */}
              <g transform="translate(480, 330)">
                <motion.g
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 2.20 }}
                >
                  <circle r="18" fill="#10121a" stroke="#d8ff00" strokeWidth="2.5" filter="url(#process-node-glow)" />
                  <text className="font-poppins font-extrabold" textAnchor="middle" dy="4.5" fill="#ccf23a" fontSize="11" fontWeight="900" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>02</text>
                  <text className="font-poppins font-extrabold" textAnchor="middle" dy="28" fill="#0052ff" fontSize="9" fontWeight="900" letterSpacing="0.2em" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>STEP</text>
                </motion.g>
              </g>

              {/* Node 3: Crest 2 at (780, 130) */}
              <g transform="translate(780, 130)">
                <motion.g
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 3.15 }}
                >
                  <circle r="18" fill="#10121a" stroke="#d8ff00" strokeWidth="2.5" filter="url(#process-node-glow)" />
                  <text className="font-poppins font-extrabold" textAnchor="middle" dy="4.5" fill="#ccf23a" fontSize="11" fontWeight="900" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>03</text>
                  <text className="font-poppins font-extrabold" textAnchor="middle" dy="-22" fill="#0052ff" fontSize="9" fontWeight="900" letterSpacing="0.2em" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>STEP</text>
                </motion.g>
              </g>

              {/* Node 4: Valley 2 at (1080, 330) */}
              <g transform="translate(1080, 330)">
                <motion.g
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 4.10 }}
                >
                  <circle r="18" fill="#10121a" stroke="#d8ff00" strokeWidth="2.5" filter="url(#process-node-glow)" />
                  <text className="font-poppins font-extrabold" textAnchor="middle" dy="4.5" fill="#ccf23a" fontSize="11" fontWeight="900" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>04</text>
                  <text className="font-poppins font-extrabold" textAnchor="middle" dy="28" fill="#0052ff" fontSize="9" fontWeight="900" letterSpacing="0.2em" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>STEP</text>
                </motion.g>
              </g>
            </svg>
          </div>

          {/* ── STEP 1: Card 1 at BOTTOM (X = 14.286%) ── */}
          <div className="absolute left-[14.286%] -translate-x-1/2 top-[252px] w-[270px] z-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 1.45, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, scale: 1.02 }}
              className={`w-full rounded-[22px] transition-all duration-300 cursor-pointer group relative p-3.5 bg-white text-slate-900 border border-slate-200/90 shadow-[0_12px_28px_rgba(0,0,0,0.06)] ${stepsData[0].cardShadowHover} ${stepsData[0].cardBorderHover} flex items-start gap-3`}
            >
              {/* Pointer Indicator pointing UP to Stem */}
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border-t border-l bg-white border-slate-200/90" />

              <div
                className="relative shrink-0 rounded-full bg-[#0052ff] p-0.5 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300 w-9 h-9 mt-0.5"
                style={{ boxShadow: '0 4px 12px rgba(0,82,255, 0.4)' }}
              >
                <div className="absolute inset-0.5 rounded-full border-t border-l border-white/60 pointer-events-none" />
                <div className="relative z-10 scale-85">{stepsData[0].icon}</div>
              </div>

              <div className="min-w-0 flex-1 text-left">
                <h4 className={`text-[12.5px] font-bold font-poppins leading-tight transition-colors ${stepsData[0].titleColor} ${stepsData[0].hoverTitleColor}`}>
                  {stepsData[0].title}
                </h4>
                <p className={`text-[10px] font-semibold font-sans mt-0.5 leading-snug ${stepsData[0].tagColor}`}>
                  {stepsData[0].subtitle}
                </p>
                <p className="text-[9px] font-sans mt-1 leading-relaxed text-slate-600">
                  {stepsData[0].description}
                </p>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <span className={`text-[8px] font-semibold px-2 py-0.5 rounded-full border ${stepsData[0].badge1Class}`}>{stepsData[0].badges[0]}</span>
                  <span className={`text-[8px] font-semibold px-2 py-0.5 rounded-full border ${stepsData[0].badge2Class}`}>{stepsData[0].badges[1]}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── STEP 2: Card 2 at TOP (X = 38.095%) ── */}
          <div className="absolute left-[38.095%] -translate-x-1/2 top-[208px] -translate-y-full w-[270px] z-20">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 2.40, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, scale: 1.02 }}
              className={`w-full rounded-[22px] transition-all duration-300 cursor-pointer group relative p-3.5 bg-white text-slate-900 border border-slate-200/90 shadow-[0_12px_28px_rgba(0,0,0,0.06)] ${stepsData[1].cardShadowHover} ${stepsData[1].cardBorderHover} flex items-start gap-3`}
            >
              {/* Pointer Indicator pointing DOWN to Stem */}
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border-b border-r bg-white border-slate-200/90" />

              <div
                className="relative shrink-0 rounded-full bg-[#8b5cf6] p-0.5 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300 w-9 h-9 mt-0.5"
                style={{ boxShadow: '0 4px 12px rgba(139,92,246, 0.4)' }}
              >
                <div className="absolute inset-0.5 rounded-full border-t border-l border-white/60 pointer-events-none" />
                <div className="relative z-10 scale-85">{stepsData[1].icon}</div>
              </div>

              <div className="min-w-0 flex-1 text-left">
                <h4 className={`text-[12.5px] font-bold font-poppins leading-tight transition-colors ${stepsData[1].titleColor} ${stepsData[1].hoverTitleColor}`}>
                  {stepsData[1].title}
                </h4>
                <p className={`text-[10px] font-semibold font-sans mt-0.5 leading-snug ${stepsData[1].tagColor}`}>
                  {stepsData[1].subtitle}
                </p>
                <p className="text-[9px] font-sans mt-1 leading-relaxed text-slate-600">
                  {stepsData[1].description}
                </p>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <span className={`text-[8px] font-semibold px-2 py-0.5 rounded-full border ${stepsData[1].badge1Class}`}>{stepsData[1].badges[0]}</span>
                  <span className={`text-[8px] font-semibold px-2 py-0.5 rounded-full border ${stepsData[1].badge2Class}`}>{stepsData[1].badges[1]}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── STEP 3: Card 3 at BOTTOM (X = 61.905%) ── */}
          <div className="absolute left-[61.905%] -translate-x-1/2 top-[252px] w-[270px] z-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 3.35, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, scale: 1.02 }}
              className={`w-full rounded-[22px] transition-all duration-300 cursor-pointer group relative p-3.5 bg-white text-slate-900 border border-slate-200/90 shadow-[0_12px_28px_rgba(0,0,0,0.06)] ${stepsData[2].cardShadowHover} ${stepsData[2].cardBorderHover} flex items-start gap-3`}
            >
              {/* Pointer Indicator pointing UP to Stem */}
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border-t border-l bg-white border-slate-200/90" />

              <div
                className="relative shrink-0 rounded-full bg-[#10b981] p-0.5 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300 w-9 h-9 mt-0.5"
                style={{ boxShadow: '0 4px 12px rgba(16,185,129, 0.4)' }}
              >
                <div className="absolute inset-0.5 rounded-full border-t border-l border-white/60 pointer-events-none" />
                <div className="relative z-10 scale-85">{stepsData[2].icon}</div>
              </div>

              <div className="min-w-0 flex-1 text-left">
                <h4 className={`text-[12.5px] font-bold font-poppins leading-tight transition-colors ${stepsData[2].titleColor} ${stepsData[2].hoverTitleColor}`}>
                  {stepsData[2].title}
                </h4>
                <p className={`text-[10px] font-semibold font-sans mt-0.5 leading-snug ${stepsData[2].tagColor}`}>
                  {stepsData[2].subtitle}
                </p>
                <p className="text-[9px] font-sans mt-1 leading-relaxed text-slate-600">
                  {stepsData[2].description}
                </p>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <span className={`text-[8px] font-semibold px-2 py-0.5 rounded-full border ${stepsData[2].badge1Class}`}>{stepsData[2].badges[0]}</span>
                  <span className={`text-[8px] font-semibold px-2 py-0.5 rounded-full border ${stepsData[2].badge2Class}`}>{stepsData[2].badges[1]}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── STEP 4: Card 4 at TOP (X = 85.714%) ── */}
          <div className="absolute left-[85.714%] -translate-x-1/2 top-[208px] -translate-y-full w-[270px] z-20">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 4.30, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, scale: 1.02 }}
              className={`w-full rounded-[22px] transition-all duration-300 cursor-pointer group relative p-3.5 bg-white text-slate-900 border border-slate-200/90 shadow-[0_12px_28px_rgba(0,0,0,0.06)] ${stepsData[3].cardShadowHover} ${stepsData[3].cardBorderHover} flex items-start gap-3`}
            >
              {/* Pointer Indicator pointing DOWN to Stem */}
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border-b border-r bg-white border-slate-200/90" />

              <div
                className="relative shrink-0 rounded-full bg-[#f97316] p-0.5 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300 w-9 h-9 mt-0.5"
                style={{ boxShadow: '0 4px 12px rgba(249,115,22, 0.4)' }}
              >
                <div className="absolute inset-0.5 rounded-full border-t border-l border-white/60 pointer-events-none" />
                <div className="relative z-10 scale-85">{stepsData[3].icon}</div>
              </div>

              <div className="min-w-0 flex-1 text-left">
                <h4 className={`text-[12.5px] font-bold font-poppins leading-tight transition-colors ${stepsData[3].titleColor} ${stepsData[3].hoverTitleColor}`}>
                  {stepsData[3].title}
                </h4>
                <p className={`text-[10px] font-semibold font-sans mt-0.5 leading-snug ${stepsData[3].tagColor}`}>
                  {stepsData[3].subtitle}
                </p>
                <p className="text-[9px] font-sans mt-1 leading-relaxed text-slate-600">
                  {stepsData[3].description}
                </p>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <span className={`text-[8px] font-semibold px-2 py-0.5 rounded-full border ${stepsData[3].badge1Class}`}>{stepsData[3].badges[0]}</span>
                  <span className={`text-[8px] font-semibold px-2 py-0.5 rounded-full border ${stepsData[3].badge2Class}`}>{stepsData[3].badges[1]}</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
        )}

        {/* ═════════════════════════════════════════════════════════════════
            MOBILE & TABLET: CLEAN RESPONSIVE TIMELINE
           ═════════════════════════════════════════════════════════════════ */}
        <div className="block lg:hidden relative max-w-lg mx-auto py-2">

          {/* Vertical dashed guideline (Blue) */}
          <div className="absolute left-6 top-3 bottom-3 w-0.5 border-l-2 border-dashed border-[#0052ff]/40 pointer-events-none" />

          <div className="space-y-4 relative z-10">
            {stepsData.map((step, index) => {
              return (
                <motion.div
                  key={step.stepNum}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="relative flex items-start gap-3.5 pl-1"
                >
                  {/* Step Marker Node (Original Lime) */}
                  <div className="shrink-0 w-10 h-10 rounded-full bg-[#10121a] border-2 border-[#d8ff00] text-[#d8ff00] shadow-[0_0_10px_rgba(216,255,0,0.35)] flex items-center justify-center z-20 mt-1">
                    <span className="text-[12px] font-bold font-poppins">
                      {step.stepNum}
                    </span>
                  </div>

                  {/* Card with Finalized Crisp White Theme */}
                  <div className="flex-1 min-w-0 rounded-2xl p-3.5 sm:p-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-slate-200/90 bg-white text-slate-900 transition-all">
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <div
                        className={`shrink-0 w-8 h-8 rounded-full ${step.bubbleBg} flex items-center justify-center shadow-sm`}
                        style={{ boxShadow: `0 3px 8px ${step.glowColor}` }}
                      >
                        <div className="scale-75">{step.icon}</div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className={`text-[13px] sm:text-sm font-bold font-poppins leading-tight whitespace-nowrap overflow-hidden text-ellipsis ${step.titleColor}`}>
                          {step.title}
                        </h4>
                        <p className={`text-[10.5px] sm:text-[11px] font-semibold font-sans truncate ${step.tagColor}`}>
                          {step.subtitle}
                        </p>
                      </div>
                    </div>
                    <p className="text-[11.5px] sm:text-xs font-sans leading-relaxed pl-0.5 text-slate-600">
                      {step.description}
                    </p>
                    <div className="mt-2 flex items-center gap-1.5 pl-0.5">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${step.badge1Class}`}>{step.badges[0]}</span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${step.badge2Class}`}>{step.badges[1]}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
