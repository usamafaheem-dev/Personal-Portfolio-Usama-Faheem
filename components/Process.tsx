'use client';

import React from 'react';
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
  bubbleGradient: string;
  glowColor: string;
  tagColor: string;
}

const stepsData: ProcessStep[] = [
  {
    stepNum: '01',
    title: 'Discovery & Strategy',
    subtitle: 'Deep dive in the first 48 hours.',
    description: 'Clear architecture roadmap, audience research & technical scoping. 100% aligned on deliverables.',
    icon: <Compass className="w-5 h-5 sm:w-6 sm:h-6 text-white stroke-[2.2]" />,
    bubbleGradient: 'from-[#ffaa00] via-[#f59e0b] to-[#d97706]',
    glowColor: 'rgba(255, 170, 0, 0.45)',
    tagColor: 'text-amber-700',
  },
  {
    stepNum: '02',
    title: 'Figma & Visual Contrast',
    subtitle: 'Stand out from competitors.',
    description: 'Bespoke modern UI concepts, design tokens & high-fidelity prototypes. Zero generic templates.',
    icon: <Palette className="w-5 h-5 sm:w-6 sm:h-6 text-black stroke-[2.2]" />,
    bubbleGradient: 'from-[#ffea00] via-[#eab308] to-[#84cc16]',
    glowColor: 'rgba(255, 234, 0, 0.45)',
    tagColor: 'text-amber-800',
  },
  {
    stepNum: '03',
    title: 'Engineering & Motion',
    subtitle: 'Sub-second speed & spring physics.',
    description: 'Next.js 15, React 19 & TypeScript paired with silky Framer Motion & Three.js animations.',
    icon: <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-white stroke-[2.2]" />,
    bubbleGradient: 'from-[#38bdf8] via-[#0284c7] to-[#0369a1]',
    glowColor: 'rgba(56, 189, 248, 0.45)',
    tagColor: 'text-sky-700',
  },
  {
    stepNum: '04',
    title: '99+ Speed & Global Launch',
    subtitle: 'Zero layout shift, 100% SEO.',
    description: 'Rigorous performance audits, automated Vercel CI/CD pipelines & 30-day post-launch warranty.',
    icon: <Rocket className="w-5 h-5 sm:w-6 sm:h-6 text-white stroke-[2.2]" />,
    bubbleGradient: 'from-[#f43f5e] via-[#e11d48] to-[#be123c]',
    glowColor: 'rgba(244, 63, 94, 0.45)',
    tagColor: 'text-rose-700',
  },
];

export default function Process() {
  return (
    <section
      id="process"
      className="relative py-12 sm:py-16 lg:py-20 bg-[#090a0f] text-white overflow-hidden select-none font-sans"
    >
      {/* ── Precision Dotted Grid Background Canvas Matching Entire Website ── */}
      <div className="absolute inset-0 bg-[radial-gradient(#99a1af_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-25 pointer-events-none z-0" />

      {/* ── Ambient Studio Glows in Usama's Brand Accents (Amber & Lime) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] left-[5%] w-[450px] h-[450px] rounded-full bg-[#ffaa00]/10 blur-[140px]" />
        <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] rounded-full bg-[#ccff00]/08 blur-[150px]" />
        <div className="absolute top-[35%] right-[25%] w-[350px] h-[350px] rounded-full bg-[#ffea00]/08 blur-[130px]" />
      </div>

      <div className="mx-auto max-w-[1440px] w-full px-5 sm:px-8 lg:px-12 relative z-10">

        {/* ── Section Header ── */}
        <div className="text-center max-w-4xl mx-auto mb-6 sm:mb-8">

          {/* Top Brand Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#ffaa00]/15 via-[#ffea00]/15 to-[#ccff00]/15 border border-[#ffaa00]/30 px-3.5 py-1 rounded-full text-xs font-bold text-[#ffaa00] uppercase tracking-widest font-poppins mb-3 shadow-sm backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#ffaa00]" />
            <span>HOW WE WORK</span>
          </motion.div>

          {/* Clean 2-Line Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl xs:text-3xl sm:text-5xl lg:text-[48px] xl:text-[52px] font-black font-poppins tracking-tight text-white uppercase leading-[1.12]"
          >
            <span className="block whitespace-normal sm:whitespace-nowrap">
              HOW WE BUILD YOUR PRODUCT
            </span>
            <span className="block bg-gradient-to-r from-[#ffaa00] via-[#ffea00] to-[#ccff00] bg-clip-text text-transparent mt-1">
              IN 4 SEAMLESS STEPS?
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs sm:text-sm lg:text-base text-slate-400 font-sans mt-2 leading-relaxed max-w-xl mx-auto"
          >
            A battle-tested engineering sprint from initial wireframing to high-performance production launch.
          </motion.p>
        </div>

        {/* ═════════════════════════════════════════════════════════════════
            DESKTOP: COMPACT ELEGANT WAVE (100% MATCH TO USER SKETCH)
           ═════════════════════════════════════════════════════════════════ */}
        <div className="hidden lg:block relative w-full max-w-[1180px] mx-auto h-[370px] my-1">

          {/* Continuous Gentle Sine Wave SVG Track + Embedded Nodes & Stems */}
          <div className="absolute inset-0 pointer-events-none z-10">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 1260 370"
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
                <radialGradient id="node-center-grad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffea00" />
                  <stop offset="100%" stopColor="#ffaa00" />
                </radialGradient>
              </defs>

              {/* ── Soft Ambient Glow Trail for the Mountain Wave ── */}
              <motion.path
                d="M 20,175 C 80,175 110,95 180,95 C 280,95 380,255 480,255 C 580,255 680,95 780,95 C 880,95 980,255 1080,255 C 1150,255 1180,175 1240,175"
                stroke="rgba(255, 170, 0, 0.16)"
                strokeWidth="7"
                strokeLinecap="round"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
              />

              {/* ── Mountain Wave Line Drawing from Left to Right (Fades out once complete so dashed dots shine) ── */}
              <motion.path
                d="M 20,175 C 80,175 110,95 180,95 C 280,95 380,255 480,255 C 580,255 680,95 780,95 C 880,95 980,255 1080,255 C 1150,255 1180,175 1240,175"
                stroke="rgba(255, 170, 0, 0.95)"
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

              {/* ── Flowing Dashed Mountain Wave (Original Dotted Effect 100% Visible) ── */}
              <motion.path
                d="M 20,175 C 80,175 110,95 180,95 C 280,95 380,255 480,255 C 580,255 680,95 780,95 C 880,95 980,255 1080,255 C 1150,255 1180,175 1240,175"
                stroke="rgba(255, 170, 0, 0.85)"
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

              {/* ── Vertical Connector Stems (Balanced ~66px gap, Sequentially Revealed) ── */}
              <g opacity="0.85">
                {/* Step 1: Stem from Node 1 (113) straight DOWN to Card 1 Pointer (179) */}
                <motion.g
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 1.35 }}
                >
                  <line x1="180" y1="113" x2="180" y2="179" stroke="#ffaa00" strokeWidth="1.5" strokeDasharray="3 3" />
                  <circle cx="180" cy="179" r="2.5" fill="#ffaa00" />
                </motion.g>

                {/* Step 2: Stem from Card 2 Pointer (171) straight DOWN to Node 2 (237) */}
                <motion.g
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 2.30 }}
                >
                  <line x1="480" y1="171" x2="480" y2="237" stroke="#ffaa00" strokeWidth="1.5" strokeDasharray="3 3" />
                  <circle cx="480" cy="171" r="2.5" fill="#ffaa00" />
                </motion.g>

                {/* Step 3: Stem from Node 3 (113) straight DOWN to Card 3 Pointer (179) */}
                <motion.g
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 3.25 }}
                >
                  <line x1="780" y1="113" x2="780" y2="179" stroke="#ffaa00" strokeWidth="1.5" strokeDasharray="3 3" />
                  <circle cx="780" cy="179" r="2.5" fill="#ffaa00" />
                </motion.g>

                {/* Step 4: Stem from Card 4 Pointer (171) straight DOWN to Node 4 (237) */}
                <motion.g
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 4.20 }}
                >
                  <line x1="1080" y1="171" x2="1080" y2="237" stroke="#ffaa00" strokeWidth="1.5" strokeDasharray="3 3" />
                  <circle cx="1080" cy="171" r="2.5" fill="#ffaa00" />
                </motion.g>
              </g>

              {/* ── 4 NODES DIRECTLY ON THE WAVE (CIRCULAR MOUNTAIN CRESTS & VALLEYS) ── */}
              {/* Node 1: Crest 1 at (180, 95) */}
              <g transform="translate(180, 95)">
                <motion.g
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 1.25 }}
                >
                  <circle r="18" fill="#10121a" stroke="#ffaa00" strokeWidth="2.5" filter="url(#process-node-glow)" />
                  <text className="font-poppins font-black" textAnchor="middle" dy="4.5" fill="#ffea00" fontSize="11" fontWeight="900" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>01</text>
                  <text className="font-poppins font-black" textAnchor="middle" dy="-22" fill="#ffaa00" fontSize="9" fontWeight="900" letterSpacing="0.2em" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>STEP</text>
                </motion.g>
              </g>

              {/* Node 2: Valley 1 at (480, 255) */}
              <g transform="translate(480, 255)">
                <motion.g
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 2.20 }}
                >
                  <circle r="18" fill="#10121a" stroke="#ffaa00" strokeWidth="2.5" filter="url(#process-node-glow)" />
                  <text className="font-poppins font-black" textAnchor="middle" dy="4.5" fill="#ffea00" fontSize="11" fontWeight="900" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>02</text>
                  <text className="font-poppins font-black" textAnchor="middle" dy="28" fill="#ffaa00" fontSize="9" fontWeight="900" letterSpacing="0.2em" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>STEP</text>
                </motion.g>
              </g>

              {/* Node 3: Crest 2 at (780, 95) */}
              <g transform="translate(780, 95)">
                <motion.g
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 3.15 }}
                >
                  <circle r="18" fill="#10121a" stroke="#ffaa00" strokeWidth="2.5" filter="url(#process-node-glow)" />
                  <text className="font-poppins font-black" textAnchor="middle" dy="4.5" fill="#ffea00" fontSize="11" fontWeight="900" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>03</text>
                  <text className="font-poppins font-black" textAnchor="middle" dy="-22" fill="#ffaa00" fontSize="9" fontWeight="900" letterSpacing="0.2em" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>STEP</text>
                </motion.g>
              </g>

              {/* Node 4: Valley 2 at (1080, 255) */}
              <g transform="translate(1080, 255)">
                <motion.g
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 4.10 }}
                >
                  <circle r="18" fill="#10121a" stroke="#ffaa00" strokeWidth="2.5" filter="url(#process-node-glow)" />
                  <text className="font-poppins font-black" textAnchor="middle" dy="4.5" fill="#ffea00" fontSize="11" fontWeight="900" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>04</text>
                  <text className="font-poppins font-black" textAnchor="middle" dy="28" fill="#ffaa00" fontSize="9" fontWeight="900" letterSpacing="0.2em" style={{ fontFamily: 'var(--font-poppins), sans-serif' }}>STEP</text>
                </motion.g>
              </g>
            </svg>
          </div>

          {/* ── STEP 1: Card 1 at BOTTOM (X = 14.286%) ── */}
          <div className="absolute left-[14.286%] -translate-x-1/2 top-[185px] w-[240px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 1.45, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -3, scale: 1.02 }}
              className="w-full bg-white rounded-[20px] p-3 text-slate-900 shadow-[0_12px_28px_rgba(0,0,0,0.4)] flex items-center gap-2.5 border border-white/80 cursor-pointer group z-20"
            >
              {/* Pointer Indicator pointing UP to Stem */}
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-t border-l border-white/80" />

              <div
                className="relative shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-[#ffaa00] via-[#f59e0b] to-[#d97706] p-0.5 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300"
                style={{ boxShadow: '0 4px 12px rgba(255, 170, 0, 0.4)' }}
              >
                <div className="absolute inset-0.5 rounded-full border-t border-l border-white/60 pointer-events-none" />
                <div className="relative z-10 scale-80">{stepsData[0].icon}</div>
              </div>
              <div className="flex-1 min-w-0 text-left">
                <h4 className="text-[12px] font-black text-slate-950 font-poppins leading-tight group-hover:text-amber-600 transition-colors">
                  {stepsData[0].title}
                </h4>
                <p className="text-[9.5px] font-bold text-amber-700 font-sans mt-0.5 leading-snug">
                  {stepsData[0].subtitle}
                </p>
                <p className="text-[8.5px] text-slate-600 font-sans mt-0.5 leading-snug line-clamp-2 font-normal">
                  {stepsData[0].description}
                </p>
              </div>
            </motion.div>
          </div>

          {/* ── STEP 2: Card 2 at TOP (X = 38.095%) ── */}
          <div className="absolute left-[38.095%] -translate-x-1/2 top-[165px] -translate-y-full w-[240px]">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 2.40, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -3, scale: 1.02 }}
              className="w-full bg-white rounded-[20px] p-3 text-slate-900 shadow-[0_12px_28px_rgba(0,0,0,0.4)] flex items-center gap-2.5 border border-white/80 cursor-pointer group z-20"
            >
              {/* Pointer Indicator pointing DOWN to Stem */}
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-b border-r border-white/80" />

              <div
                className="relative shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-[#ffea00] via-[#eab308] to-[#84cc16] p-0.5 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300"
                style={{ boxShadow: '0 4px 12px rgba(255, 234, 0, 0.4)' }}
              >
                <div className="absolute inset-0.5 rounded-full border-t border-l border-white/60 pointer-events-none" />
                <div className="relative z-10 scale-80">{stepsData[1].icon}</div>
              </div>
              <div className="flex-1 min-w-0 text-left">
                <h4 className="text-[12px] font-black text-slate-950 font-poppins leading-tight group-hover:text-amber-600 transition-colors">
                  {stepsData[1].title}
                </h4>
                <p className="text-[9.5px] font-bold text-amber-800 font-sans mt-0.5 leading-snug">
                  {stepsData[1].subtitle}
                </p>
                <p className="text-[8.5px] text-slate-600 font-sans mt-0.5 leading-snug line-clamp-2 font-normal">
                  {stepsData[1].description}
                </p>
              </div>
            </motion.div>
          </div>

          {/* ── STEP 3: Card 3 at BOTTOM (X = 61.905%) ── */}
          <div className="absolute left-[61.905%] -translate-x-1/2 top-[185px] w-[240px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 3.35, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -3, scale: 1.02 }}
              className="w-full bg-white rounded-[20px] p-3 text-slate-900 shadow-[0_12px_28px_rgba(0,0,0,0.4)] flex items-center gap-2.5 border border-white/80 cursor-pointer group z-20"
            >
              {/* Pointer Indicator pointing UP to Stem */}
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-t border-l border-white/80" />

              <div
                className="relative shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-[#38bdf8] via-[#0284c7] to-[#0369a1] p-0.5 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300"
                style={{ boxShadow: '0 4px 12px rgba(56, 189, 248, 0.4)' }}
              >
                <div className="absolute inset-0.5 rounded-full border-t border-l border-white/60 pointer-events-none" />
                <div className="relative z-10 scale-80">{stepsData[2].icon}</div>
              </div>
              <div className="flex-1 min-w-0 text-left">
                <h4 className="text-[12px] font-black text-slate-950 font-poppins leading-tight group-hover:text-amber-600 transition-colors">
                  {stepsData[2].title}
                </h4>
                <p className="text-[9.5px] font-bold text-sky-700 font-sans mt-0.5 leading-snug">
                  {stepsData[2].subtitle}
                </p>
                <p className="text-[8.5px] text-slate-600 font-sans mt-0.5 leading-snug line-clamp-2 font-normal">
                  {stepsData[2].description}
                </p>
              </div>
            </motion.div>
          </div>

          {/* ── STEP 4: Card 4 at TOP (X = 85.714%) ── */}
          <div className="absolute left-[85.714%] -translate-x-1/2 top-[165px] -translate-y-full w-[240px]">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 4.30, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -3, scale: 1.02 }}
              className="w-full bg-white rounded-[20px] p-3 text-slate-900 shadow-[0_12px_28px_rgba(0,0,0,0.4)] flex items-center gap-2.5 border border-white/80 cursor-pointer group z-20"
            >
              {/* Pointer Indicator pointing DOWN to Stem */}
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-b border-r border-white/80" />

              <div
                className="relative shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-[#f43f5e] via-[#e11d48] to-[#be123c] p-0.5 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300"
                style={{ boxShadow: '0 4px 12px rgba(244, 63, 94, 0.4)' }}
              >
                <div className="absolute inset-0.5 rounded-full border-t border-l border-white/60 pointer-events-none" />
                <div className="relative z-10 scale-80">{stepsData[3].icon}</div>
              </div>
              <div className="flex-1 min-w-0 text-left">
                <h4 className="text-[12px] font-black text-slate-950 font-poppins leading-tight group-hover:text-amber-600 transition-colors">
                  {stepsData[3].title}
                </h4>
                <p className="text-[9.5px] font-bold text-rose-700 font-sans mt-0.5 leading-snug">
                  {stepsData[3].subtitle}
                </p>
                <p className="text-[8.5px] text-slate-600 font-sans mt-0.5 leading-snug line-clamp-2 font-normal">
                  {stepsData[3].description}
                </p>
              </div>
            </motion.div>
          </div>

        </div>

        {/* ═════════════════════════════════════════════════════════════════
            MOBILE & TABLET: COMPACT VERTICAL S-CURVE
           ═════════════════════════════════════════════════════════════════ */}
        <div className="block lg:hidden relative max-w-xl mx-auto py-3">

          <div className="absolute left-1/2 -translate-x-1/2 top-2 bottom-2 w-1 pointer-events-none z-0">
            <div className="w-0.5 h-full mx-auto border-r-2 border-dashed border-[#ffaa00]/40" />
          </div>

          <div className="space-y-7 sm:space-y-9 relative z-10">
            {stepsData.map((step, index) => {
              const isEven = index % 2 === 1;

              return (
                <div key={step.stepNum} className="relative flex items-center justify-between gap-2.5 sm:gap-4">

                  {/* Left Side */}
                  <div className="w-[46%] flex justify-end">
                    {!isEven ? (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="w-full bg-white rounded-2xl p-3 text-slate-900 shadow-lg border border-white/60 flex flex-col sm:flex-row items-center sm:items-start gap-2 text-center sm:text-left"
                      >
                        <div
                          className={`shrink-0 w-9 h-9 rounded-full bg-gradient-to-br ${step.bubbleGradient} flex items-center justify-center shadow-md`}
                          style={{ boxShadow: `0 4px 12px ${step.glowColor}` }}
                        >
                          <div className="scale-80">{step.icon}</div>
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-black text-slate-950 font-poppins leading-tight">
                            {step.title}
                          </h4>
                          <p className={`text-[9px] font-bold ${step.tagColor} font-sans mt-0.5`}>
                            {step.subtitle}
                          </p>
                          <p className="text-[8.5px] text-slate-600 font-sans mt-0.5 leading-snug line-clamp-2 font-normal">
                            {step.description}
                          </p>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="text-right pr-2 sm:pr-3"
                      >
                        <span className="block text-[10px] font-black uppercase tracking-widest text-[#ffaa00] font-poppins">
                          STEP
                        </span>
                        <span className="block text-3xl sm:text-4xl font-black font-poppins tracking-tight text-white leading-none mt-0.5">
                          {step.stepNum}
                        </span>
                      </motion.div>
                    )}
                  </div>

                  {/* Center Node Dot */}
                  <div className="shrink-0 w-7 h-7 rounded-full bg-[#12141c] border-2 border-[#ffaa00] flex items-center justify-center shadow-[0_0_12px_rgba(255,170,0,0.6)] z-20">
                    <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#ffaa00] to-[#ffea00]" />
                  </div>

                  {/* Right Side */}
                  <div className="w-[46%] flex justify-start">
                    {isEven ? (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="w-full bg-white rounded-2xl p-3 text-slate-900 shadow-lg border border-white/60 flex flex-col sm:flex-row items-center sm:items-start gap-2 text-center sm:text-left"
                      >
                        <div
                          className={`shrink-0 w-9 h-9 rounded-full bg-gradient-to-br ${step.bubbleGradient} flex items-center justify-center shadow-md`}
                          style={{ boxShadow: `0 4px 12px ${step.glowColor}` }}
                        >
                          <div className="scale-80">{step.icon}</div>
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-black text-slate-950 font-poppins leading-tight">
                            {step.title}
                          </h4>
                          <p className={`text-[9px] font-bold ${step.tagColor} font-sans mt-0.5`}>
                            {step.subtitle}
                          </p>
                          <p className="text-[8.5px] text-slate-600 font-sans mt-0.5 leading-snug line-clamp-2 font-normal">
                            {step.description}
                          </p>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, x: 15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="text-left pl-2 sm:pl-3"
                      >
                        <span className="block text-[10px] font-black uppercase tracking-widest text-[#ffaa00] font-poppins">
                          STEP
                        </span>
                        <span className="block text-3xl sm:text-4xl font-black font-poppins tracking-tight text-white leading-none mt-0.5">
                          {step.stepNum}
                        </span>
                      </motion.div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
