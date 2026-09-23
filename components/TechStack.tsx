'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiFramer,
  SiThreedotjs,
  SiGit,
  SiVercel,
  SiSupabase,
  SiHostinger,
  SiFigma
} from 'react-icons/si';
import { Sparkles } from 'lucide-react';
import usePageReady from './usePageReady';

interface TechItem {
  name: string;
  category: string;
  icon: React.ComponentType<{ className?: string; size?: number; style?: React.CSSProperties }>;
  color: string;
  bgLight: string;
  isFeatured?: boolean;
}

interface Quadrant {
  id: string;
  title: string;
  label: string;
  glowColor: string;
  borderColor: string;
  items: TechItem[];
}

const quadrantData: Quadrant[] = [
  {
    id: 'frontend',
    title: 'Front-end Architecture',
    label: 'Front-end',
    glowColor: 'rgba(14, 165, 233, 0.4)',
    borderColor: '#38bdf8',
    items: [
      { name: 'JavaScript', category: 'ES6+ Engine', icon: SiJavascript, color: '#5f7a12', bgLight: 'bg-lime-50' },
      { name: 'React 19', category: 'Core Library', icon: SiReact, color: '#0284c7', bgLight: 'bg-slate-50', isFeatured: true },
      { name: 'Next.js 15', category: 'Full-Stack App', icon: SiNextdotjs, color: '#000000', bgLight: 'bg-slate-100', isFeatured: true },
      { name: 'TypeScript', category: 'Type Safety', icon: SiTypescript, color: '#2563eb', bgLight: 'bg-slate-50' }
    ]
  },
  {
    id: 'ui3d',
    title: 'UI Design & 3D Graphics',
    label: 'UI & 3D',
    glowColor: 'rgba(236, 72, 153, 0.4)',
    borderColor: '#ec4899',
    items: [
      { name: 'Tailwind CSS', category: 'Utility UI', icon: SiTailwindcss, color: '#0284c7', bgLight: 'bg-slate-50' },
      { name: 'Framer Motion', category: 'Web Animations', icon: SiFramer, color: '#db2777', bgLight: 'bg-slate-50' },
      { name: 'Three.js 3D', category: 'WebGL Canvas', icon: SiThreedotjs, color: '#5f7a12', bgLight: 'bg-lime-50' },
      { name: 'Figma 1:1', category: 'Pixel Perfect', icon: SiFigma, color: '#a259ff', bgLight: 'bg-slate-50' }
    ]
  },
  {
    id: 'backend',
    title: 'Back-end & Cloud DB',
    label: 'Back-end',
    glowColor: 'rgba(34, 197, 94, 0.4)',
    borderColor: '#22c55e',
    items: [
      { name: 'Node.js', category: 'Async Engine', icon: SiNodedotjs, color: '#16a34a', bgLight: 'bg-slate-50' },
      { name: 'Express.js', category: 'REST APIs', icon: SiExpress, color: '#000000', bgLight: 'bg-slate-100' },
      { name: 'MongoDB', category: 'NoSQL Cluster', icon: SiMongodb, color: '#15803d', bgLight: 'bg-slate-50', isFeatured: true },
      { name: 'Supabase', category: 'Realtime BaaS', icon: SiSupabase, color: '#3ecf8e', bgLight: 'bg-slate-50' }
    ]
  },
  {
    id: 'devops',
    title: 'AI & Deployment',
    label: 'AI & Deployment',
    glowColor: 'rgba(249, 115, 22, 0.4)',
    borderColor: '#f97316',
    items: [
      { name: 'Git & GitHub', category: 'CI/CD & Code', icon: SiGit, color: '#f05032', bgLight: 'bg-slate-50' },
      { name: 'Hostinger', category: 'VPS & Cloud', icon: SiHostinger, color: '#673de6', bgLight: 'bg-slate-50' },
      { name: 'Vercel', category: 'Edge Cloud', icon: SiVercel, color: '#000000', bgLight: 'bg-slate-100' },
      { name: 'Groq AI (LLMs)', category: 'AI Integration', icon: Sparkles, color: '#5f7a12', bgLight: 'bg-lime-50' }
    ]
  }
];

const cardinalPulses = [
  { endX: 500, endY: 165, color: '#38bdf8', filter: 'url(#glowSky)' },
  { endX: 675, endY: 350, color: '#ec4899', filter: 'url(#glowPink)' },
  { endX: 500, endY: 535, color: '#22c55e', filter: 'url(#glowGreen)' },
  { endX: 325, endY: 350, color: '#f97316', filter: 'url(#glowOrange)' },
];

const spokePulses = [
  // Front-end
  { startX: 500, startY: 143, endX: 260, endY: 75, color: '#38bdf8', filter: 'url(#glowSky)' },
  { startX: 500, startY: 143, endX: 420, endY: 30, color: '#38bdf8', filter: 'url(#glowSky)' },
  { startX: 500, startY: 143, endX: 580, endY: 30, color: '#38bdf8', filter: 'url(#glowSky)' },
  { startX: 500, startY: 143, endX: 740, endY: 75, color: '#38bdf8', filter: 'url(#glowSky)' },
  // UI & 3D
  { startX: 738, startY: 350, endX: 1030, endY: 190, color: '#ec4899', filter: 'url(#glowPink)' },
  { startX: 738, startY: 350, endX: 960, endY: 305, color: '#ec4899', filter: 'url(#glowPink)' },
  { startX: 738, startY: 350, endX: 960, endY: 395, color: '#ec4899', filter: 'url(#glowPink)' },
  { startX: 738, startY: 350, endX: 1030, endY: 510, color: '#ec4899', filter: 'url(#glowPink)' },
  // Back-end
  { startX: 500, startY: 557, endX: 230, endY: 600, color: '#22c55e', filter: 'url(#glowGreen)' },
  { startX: 500, startY: 557, endX: 410, endY: 660, color: '#22c55e', filter: 'url(#glowGreen)' },
  { startX: 500, startY: 557, endX: 590, endY: 660, color: '#22c55e', filter: 'url(#glowGreen)' },
  { startX: 500, startY: 557, endX: 770, endY: 600, color: '#22c55e', filter: 'url(#glowGreen)' },
  // AI & Deployment
  { startX: 253, startY: 350, endX: 10, endY: 190, color: '#f97316', filter: 'url(#glowOrange)' },
  { startX: 253, startY: 350, endX: 40, endY: 305, color: '#f97316', filter: 'url(#glowOrange)' },
  { startX: 253, startY: 350, endX: 40, endY: 395, color: '#f97316', filter: 'url(#glowOrange)' },
  { startX: 253, startY: 350, endX: 10, endY: 510, color: '#f97316', filter: 'url(#glowOrange)' },
];

export default function TechStack() {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [pulseKey, setPulseKey] = useState<number>(0);
  const [isCenterHovered, setIsCenterHovered] = useState<boolean>(false);
  const activeGroup = quadrantData.find(q => q.id === activeTab) || quadrantData[0];

  const isPageReady = usePageReady();
  const diagramRef = useRef<HTMLDivElement>(null);
  const inView = useInView(diagramRef, { once: true, amount: 0.5 });
  const isInView = isPageReady && inView;

  return (
    <section
      id="stack"
      className="relative bg-[#f8fafc] py-8 sm:py-12 lg:py-14 overflow-hidden font-sans text-[#0f172a] border-t border-b border-slate-200"
    >
      {/* ── Precision Dotted Grid Background Pattern ── */}
      <div className="absolute inset-0 bg-[radial-gradient(#99a1af_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-40 pointer-events-none [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_60%,transparent_100%)]" />

      {/* Background Subtle Ambient Glass Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-gradient-to-br from-[#d8ff00]/10 via-[#ccf23a]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-[760px] mx-auto mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* 🌟 Signature Amber Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 bg-[#d8ff00] border-2 border-black px-3.5 py-1 rounded-full shadow-sm mb-4">
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span style={{ fontFamily: 'var(--font-caveat), cursive' }} className="text-base font-bold text-black font-caveat">Tech Stack & Architecture</span>
            </div>

            {/* Title with Yellow Accent on Development */}
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#1e293b] tracking-tight mb-3 font-poppins">
              Technologies for Marketplace & SaaS <span className="bg-gradient-to-r from-[#d8ff00] to-[#ccf23a] bg-clip-text text-transparent">Development</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-normal font-sans">
              High-performance frontend libraries, cloud databases, microservices, and AI toolchains connected seamlessly in a scalable architecture.
            </p>
          </motion.div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            DESKTOP 3D ORBITAL DIAGRAM CONTAINER
           ══════════════════════════════════════════════════════════ */}
        <div ref={diagramRef} className="hidden lg:block relative w-[1000px] h-[700px] mx-auto scale-[0.92] xl:scale-100 origin-center">

          {/* ══════════════════════════════════════════════════════════
              STACK ARCHITECTURE DIAGRAM
             ══════════════════════════════════════════════════════════ */}
          <div className="absolute inset-0 w-full h-full">

            {/* SVG Canvas for Flowing Energy Lines & Orbit Paths (1:1 with container) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" viewBox="0 0 1000 700" fill="none">
              <defs>
                {/* Glowing Filters */}
                <filter id="glowSky" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="glowPink" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="glowGreen" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="glowOrange" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* ════ Progressive Electricity Reveal Masks (Smooth 1.4s draw from Category Capsules to Tech Chips) ════ */}
                {/* Top Front-end Masks */}
                <mask id="mask_js"><motion.path d="M 500 143 L 260 75" stroke="#fff" strokeWidth="40" strokeLinecap="round" initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : { pathLength: 0 }} transition={{ duration: 1.4, delay: 1.4, ease: "easeInOut" }} /></mask>
                <mask id="mask_react"><motion.path d="M 500 143 L 420 30" stroke="#fff" strokeWidth="40" strokeLinecap="round" initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : { pathLength: 0 }} transition={{ duration: 1.4, delay: 1.4, ease: "easeInOut" }} /></mask>
                <mask id="mask_next"><motion.path d="M 500 143 L 580 30" stroke="#fff" strokeWidth="40" strokeLinecap="round" initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : { pathLength: 0 }} transition={{ duration: 1.4, delay: 1.4, ease: "easeInOut" }} /></mask>
                <mask id="mask_ts"><motion.path d="M 500 143 L 740 75" stroke="#fff" strokeWidth="40" strokeLinecap="round" initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : { pathLength: 0 }} transition={{ duration: 1.4, delay: 1.4, ease: "easeInOut" }} /></mask>

                <mask id="mask_tw"><motion.path d="M 738 350 L 1030 190" stroke="#fff" strokeWidth="40" strokeLinecap="round" initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : { pathLength: 0 }} transition={{ duration: 1.4, delay: 1.4, ease: "easeInOut" }} /></mask>
                <mask id="mask_framer"><motion.path d="M 738 350 L 960 305" stroke="#fff" strokeWidth="40" strokeLinecap="round" initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : { pathLength: 0 }} transition={{ duration: 1.4, delay: 1.4, ease: "easeInOut" }} /></mask>
                <mask id="mask_three"><motion.path d="M 738 350 L 960 395" stroke="#fff" strokeWidth="40" strokeLinecap="round" initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : { pathLength: 0 }} transition={{ duration: 1.4, delay: 1.4, ease: "easeInOut" }} /></mask>
                <mask id="mask_figma"><motion.path d="M 738 350 L 1030 510" stroke="#fff" strokeWidth="40" strokeLinecap="round" initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : { pathLength: 0 }} transition={{ duration: 1.4, delay: 1.4, ease: "easeInOut" }} /></mask>

                {/* Bottom Back-end Masks (4 Symmetrical Items) */}
                <mask id="mask_node"><motion.path d="M 500 557 L 230 600" stroke="#fff" strokeWidth="40" strokeLinecap="round" initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : { pathLength: 0 }} transition={{ duration: 1.4, delay: 1.4, ease: "easeInOut" }} /></mask>
                <mask id="mask_express"><motion.path d="M 500 557 L 410 660" stroke="#fff" strokeWidth="40" strokeLinecap="round" initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : { pathLength: 0 }} transition={{ duration: 1.4, delay: 1.4, ease: "easeInOut" }} /></mask>
                <mask id="mask_mongo" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" x="0" y="0" width="1000" height="700"><motion.path d="M 500 557 L 590 660" stroke="#fff" strokeWidth="40" strokeLinecap="round" initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : { pathLength: 0 }} transition={{ duration: 1.4, delay: 1.4, ease: "easeInOut" }} /></mask>
                <mask id="mask_supabase"><motion.path d="M 500 557 L 770 600" stroke="#fff" strokeWidth="40" strokeLinecap="round" initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : { pathLength: 0 }} transition={{ duration: 1.4, delay: 1.4, ease: "easeInOut" }} /></mask>

                {/* Left AI & Deployment Masks */}
                <mask id="mask_git"><motion.path d="M 253 350 L 10 190" stroke="#fff" strokeWidth="40" strokeLinecap="round" initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : { pathLength: 0 }} transition={{ duration: 1.4, delay: 1.4, ease: "easeInOut" }} /></mask>
                <mask id="mask_hostinger"><motion.path d="M 253 350 L 40 305" stroke="#fff" strokeWidth="40" strokeLinecap="round" initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : { pathLength: 0 }} transition={{ duration: 1.4, delay: 1.4, ease: "easeInOut" }} /></mask>
                <mask id="mask_vercel"><motion.path d="M 253 350 L 40 395" stroke="#fff" strokeWidth="40" strokeLinecap="round" initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : { pathLength: 0 }} transition={{ duration: 1.4, delay: 1.4, ease: "easeInOut" }} /></mask>
                <mask id="mask_groq"><motion.path d="M 253 350 L 10 510" stroke="#fff" strokeWidth="40" strokeLinecap="round" initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : { pathLength: 0 }} transition={{ duration: 1.4, delay: 1.4, ease: "easeInOut" }} /></mask>
              </defs>

              {/* Orbit Guide Rings */}
              <motion.circle
                cx="500" cy="350" r="225" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="6 6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 0.45, scale: 1 } : { opacity: 0, scale: 0.8 }}
                style={{ transformOrigin: '500px 350px' }}
                transition={{ duration: 1.2, delay: 0.2 }}
              />
              <motion.circle
                cx="500" cy="350" r="145" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="6 6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 0.45, scale: 1 } : { opacity: 0, scale: 0.8 }}
                style={{ transformOrigin: '500px 350px' }}
                transition={{ duration: 1.2, delay: 0.2 }}
              />

              {/* Outer 8-Point Star Perimeter Polygon */}
              <motion.polygon
                points="500,165 620,230 675,350 620,470 500,535 380,470 325,350 380,230"
                stroke="#94a3b8"
                strokeWidth="2"
                strokeDasharray="6 6"
                fill="rgba(163,230,53, 0.03)"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 0.7 } : { opacity: 0 }}
                transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
              />

              {/* 4 Diagonal Star Radial Beams */}
              <motion.line
                x1="500" y1="350" x2="620" y2="230" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 6" strokeLinecap="round"
                initial={{ opacity: 0, strokeDashoffset: 50 }}
                animate={isInView ? { opacity: 0.7, strokeDashoffset: 0 } : { opacity: 0, strokeDashoffset: 50 }}
                transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
              />
              <motion.line
                x1="500" y1="350" x2="620" y2="470" stroke="#ec4899" strokeWidth="2" strokeDasharray="6 6" strokeLinecap="round"
                initial={{ opacity: 0, strokeDashoffset: 50 }}
                animate={isInView ? { opacity: 0.7, strokeDashoffset: 0 } : { opacity: 0, strokeDashoffset: 50 }}
                transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
              />
              <motion.line
                x1="500" y1="350" x2="380" y2="470" stroke="#22c55e" strokeWidth="2" strokeDasharray="6 6" strokeLinecap="round"
                initial={{ opacity: 0, strokeDashoffset: 50 }}
                animate={isInView ? { opacity: 0.7, strokeDashoffset: 0 } : { opacity: 0, strokeDashoffset: 50 }}
                transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
              />
              <motion.line
                x1="500" y1="350" x2="380" y2="230" stroke="#f97316" strokeWidth="2" strokeDasharray="6 6" strokeLinecap="round"
                initial={{ opacity: 0, strokeDashoffset: 50 }}
                animate={isInView ? { opacity: 0.7, strokeDashoffset: 0 } : { opacity: 0, strokeDashoffset: 50 }}
                transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
              />

              {/* ── 4 PRIMARY CARDINAL POWER STEMS ── */}
              <motion.path
                d="M 500 350 L 500 165" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" filter="url(#glowSky)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
              />
              <motion.path
                d="M 500 350 L 675 350" stroke="#ec4899" strokeWidth="4" strokeLinecap="round" filter="url(#glowPink)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
              />
              <motion.path
                d="M 500 350 L 500 535" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" filter="url(#glowGreen)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
              />
              <motion.path
                d="M 500 350 L 325 350" stroke="#f97316" strokeWidth="4" strokeLinecap="round" filter="url(#glowOrange)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
              />

              {/* 4 Cardinal Energy Pulses from Center Outwards */}
              <motion.circle r="4.5" fill="#38bdf8" filter="url(#glowSky)" initial={{ cx: 500, cy: 350, opacity: 0 }} animate={isInView ? { cx: 500, cy: [350, 165], opacity: [0, 1, 1, 0] } : { opacity: 0 }} transition={{ duration: 0.8, delay: 0.6, ease: "easeInOut" }} />
              <motion.circle r="4.5" fill="#ec4899" filter="url(#glowPink)" initial={{ cx: 500, cy: 350, opacity: 0 }} animate={isInView ? { cx: [500, 675], cy: 350, opacity: [0, 1, 1, 0] } : { opacity: 0 }} transition={{ duration: 0.8, delay: 0.6, ease: "easeInOut" }} />
              <motion.circle r="4.5" fill="#22c55e" filter="url(#glowGreen)" initial={{ cx: 500, cy: 350, opacity: 0 }} animate={isInView ? { cx: 500, cy: [350, 535], opacity: [0, 1, 1, 0] } : { opacity: 0 }} transition={{ duration: 0.8, delay: 0.6, ease: "easeInOut" }} />
              <motion.circle r="4.5" fill="#f97316" filter="url(#glowOrange)" initial={{ cx: 500, cy: 350, opacity: 0 }} animate={isInView ? { cx: [500, 325], cy: 350, opacity: [0, 1, 1, 0] } : { opacity: 0 }} transition={{ duration: 0.8, delay: 0.6, ease: "easeInOut" }} />

              {/* ── DOTTED SPOKE WIRES ── */}
              {/* Top Front-end */}
              <path d="M 500 143 L 260 75" stroke="#38bdf8" strokeWidth="3" strokeDasharray="4 14" strokeLinecap="round" mask="url(#mask_js)" opacity="0.9" />
              <path d="M 500 143 L 420 30" stroke="#38bdf8" strokeWidth="3.5" strokeDasharray="4 14" strokeLinecap="round" filter="url(#glowSky)" mask="url(#mask_react)" opacity="0.95" />
              <path d="M 500 143 L 580 30" stroke="#38bdf8" strokeWidth="3.5" strokeDasharray="4 14" strokeLinecap="round" filter="url(#glowSky)" mask="url(#mask_next)" opacity="0.95" />
              <path d="M 500 143 L 740 75" stroke="#38bdf8" strokeWidth="3" strokeDasharray="4 14" strokeLinecap="round" mask="url(#mask_ts)" opacity="0.9" />

              {/* Right UI & 3D */}
              <path d="M 738 350 L 1030 190" stroke="#ec4899" strokeWidth="3" strokeDasharray="4 14" strokeLinecap="round" mask="url(#mask_tw)" opacity="0.9" />
              <path d="M 738 350 L 960 305" stroke="#ec4899" strokeWidth="3.5" strokeDasharray="4 14" strokeLinecap="round" filter="url(#glowPink)" mask="url(#mask_framer)" opacity="0.95" />
              <path d="M 738 350 L 960 395" stroke="#ec4899" strokeWidth="3" strokeDasharray="4 14" strokeLinecap="round" mask="url(#mask_three)" opacity="0.9" />
              <path d="M 738 350 L 1030 510" stroke="#ec4899" strokeWidth="3" strokeDasharray="4 14" strokeLinecap="round" mask="url(#mask_figma)" opacity="0.9" />

              {/* Bottom Back-end (4 Items) */}
              <path d="M 500 557 L 230 600" stroke="#22c55e" strokeWidth="3" strokeDasharray="4 14" strokeLinecap="round" mask="url(#mask_node)" opacity="0.9" />
              <path d="M 500 557 L 410 660" stroke="#22c55e" strokeWidth="3.5" strokeDasharray="4 14" strokeLinecap="round" filter="url(#glowGreen)" mask="url(#mask_express)" opacity="0.95" />
              <path d="M 500 557 L 590 660" stroke="#22c55e" strokeWidth="3.5" strokeDasharray="4 14" strokeLinecap="round" filter="url(#glowGreen)" mask="url(#mask_mongo)" opacity="0.95" />
              <path d="M 500 557 L 770 600" stroke="#22c55e" strokeWidth="3" strokeDasharray="4 14" strokeLinecap="round" mask="url(#mask_supabase)" opacity="0.9" />

              {/* Left AI & Deployment */}
              <path d="M 253 350 L 10 190" stroke="#f97316" strokeWidth="3" strokeDasharray="4 14" strokeLinecap="round" mask="url(#mask_git)" opacity="0.9" />
              <path d="M 253 350 L 40 305" stroke="#f97316" strokeWidth="3.5" strokeDasharray="4 14" strokeLinecap="round" filter="url(#glowOrange)" mask="url(#mask_hostinger)" opacity="0.95" />
              <path d="M 253 350 L 40 395" stroke="#f97316" strokeWidth="3" strokeDasharray="4 14" strokeLinecap="round" mask="url(#mask_vercel)" opacity="0.9" />
              <path d="M 253 350 L 10 510" stroke="#f97316" strokeWidth="3" strokeDasharray="4 14" strokeLinecap="round" mask="url(#mask_groq)" opacity="0.9" />

              {/* ── GLOWING ELECTRIC LEAD PARTICLES (Flowing out at 1.4s) ── */}
              {/* Top Front-end Lead Pulses */}
              <motion.circle r="4" fill="#38bdf8" filter="url(#glowSky)" initial={{ cx: 500, cy: 143, opacity: 0 }} animate={isInView ? { cx: [500, 260], cy: [143, 75], opacity: [0, 1, 1, 0] } : { opacity: 0 }} transition={{ duration: 1.4, delay: 1.4, ease: "easeInOut" }} />
              <motion.circle r="4.5" fill="#38bdf8" filter="url(#glowSky)" initial={{ cx: 500, cy: 143, opacity: 0 }} animate={isInView ? { cx: [500, 420], cy: [143, 30], opacity: [0, 1, 1, 0] } : { opacity: 0 }} transition={{ duration: 1.4, delay: 1.4, ease: "easeInOut" }} />
              <motion.circle r="4.5" fill="#38bdf8" filter="url(#glowSky)" initial={{ cx: 500, cy: 143, opacity: 0 }} animate={isInView ? { cx: [500, 580], cy: [143, 30], opacity: [0, 1, 1, 0] } : { opacity: 0 }} transition={{ duration: 1.4, delay: 1.4, ease: "easeInOut" }} />
              <motion.circle r="4" fill="#38bdf8" filter="url(#glowSky)" initial={{ cx: 500, cy: 143, opacity: 0 }} animate={isInView ? { cx: [500, 740], cy: [143, 75], opacity: [0, 1, 1, 0] } : { opacity: 0 }} transition={{ duration: 1.4, delay: 1.4, ease: "easeInOut" }} />

              {/* Right UI & 3D Lead Pulses */}
              <motion.circle r="4" fill="#ec4899" filter="url(#glowPink)" initial={{ cx: 738, cy: 350, opacity: 0 }} animate={isInView ? { cx: [738, 1030], cy: [350, 190], opacity: [0, 1, 1, 0] } : { opacity: 0 }} transition={{ duration: 1.4, delay: 1.4, ease: "easeInOut" }} />
              <motion.circle r="4.5" fill="#ec4899" filter="url(#glowPink)" initial={{ cx: 738, cy: 350, opacity: 0 }} animate={isInView ? { cx: [738, 960], cy: [350, 305], opacity: [0, 1, 1, 0] } : { opacity: 0 }} transition={{ duration: 1.4, delay: 1.4, ease: "easeInOut" }} />
              <motion.circle r="4.5" fill="#ec4899" filter="url(#glowPink)" initial={{ cx: 738, cy: 350, opacity: 0 }} animate={isInView ? { cx: [738, 960], cy: [350, 395], opacity: [0, 1, 1, 0] } : { opacity: 0 }} transition={{ duration: 1.4, delay: 1.4, ease: "easeInOut" }} />
              <motion.circle r="4" fill="#ec4899" filter="url(#glowPink)" initial={{ cx: 738, cy: 350, opacity: 0 }} animate={isInView ? { cx: [738, 1030], cy: [350, 510], opacity: [0, 1, 1, 0] } : { opacity: 0 }} transition={{ duration: 1.4, delay: 1.4, ease: "easeInOut" }} />

              {/* Bottom Back-end Lead Pulses */}
              <motion.circle r="4" fill="#22c55e" filter="url(#glowGreen)" initial={{ cx: 500, cy: 557, opacity: 0 }} animate={isInView ? { cx: [500, 230], cy: [557, 600], opacity: [0, 1, 1, 0] } : { opacity: 0 }} transition={{ duration: 1.4, delay: 1.4, ease: "easeInOut" }} />
              <motion.circle r="4.5" fill="#22c55e" filter="url(#glowGreen)" initial={{ cx: 500, cy: 557, opacity: 0 }} animate={isInView ? { cx: [500, 410], cy: [557, 660], opacity: [0, 1, 1, 0] } : { opacity: 0 }} transition={{ duration: 1.4, delay: 1.4, ease: "easeInOut" }} />
              <motion.circle r="4.5" fill="#22c55e" filter="url(#glowGreen)" initial={{ cx: 500, cy: 557, opacity: 0 }} animate={isInView ? { cx: [500, 590], cy: [557, 660], opacity: [0, 1, 1, 0] } : { opacity: 0 }} transition={{ duration: 1.4, delay: 1.4, ease: "easeInOut" }} />
              <motion.circle r="4" fill="#22c55e" filter="url(#glowGreen)" initial={{ cx: 500, cy: 557, opacity: 0 }} animate={isInView ? { cx: [500, 770], cy: [557, 600], opacity: [0, 1, 1, 0] } : { opacity: 0 }} transition={{ duration: 1.4, delay: 1.4, ease: "easeInOut" }} />

              {/* Left AI & Deployment Lead Pulses */}
              <motion.circle r="4" fill="#f97316" filter="url(#glowOrange)" initial={{ cx: 253, cy: 350, opacity: 0 }} animate={isInView ? { cx: [253, 10], cy: [350, 190], opacity: [0, 1, 1, 0] } : { opacity: 0 }} transition={{ duration: 1.4, delay: 1.4, ease: "easeInOut" }} />
              <motion.circle r="4.5" fill="#f97316" filter="url(#glowOrange)" initial={{ cx: 253, cy: 350, opacity: 0 }} animate={isInView ? { cx: [253, 40], cy: [350, 305], opacity: [0, 1, 1, 0] } : { opacity: 0 }} transition={{ duration: 1.4, delay: 1.4, ease: "easeInOut" }} />
              <motion.circle r="4.5" fill="#f97316" filter="url(#glowOrange)" initial={{ cx: 253, cy: 350, opacity: 0 }} animate={isInView ? { cx: [253, 40], cy: [350, 395], opacity: [0, 1, 1, 0] } : { opacity: 0 }} transition={{ duration: 1.4, delay: 1.4, ease: "easeInOut" }} />
              <motion.circle r="4" fill="#f97316" filter="url(#glowOrange)" initial={{ cx: 253, cy: 350, opacity: 0 }} animate={isInView ? { cx: [253, 10], cy: [350, 510], opacity: [0, 1, 1, 0] } : { opacity: 0 }} transition={{ duration: 1.4, delay: 1.4, ease: "easeInOut" }} />

              {/* ── Sleek Line-Following Energy Pulses on Center Hub Hover ── */}
              {isCenterHovered && (
                <g key="center-line-following-pulses">
                  {/* Stage 1: Primary Cardinal Stem Pulses (Center Hub -> 4 Categories) */}
                  {cardinalPulses.map((stem, idx) => (
                    <motion.circle
                      key={`cardinal-pulse-${idx}`}
                      r="3.5"
                      fill={stem.color}
                      filter={stem.filter}
                      initial={{ cx: 500, cy: 350, opacity: 0 }}
                      animate={{
                        cx: [500, stem.endX],
                        cy: [350, stem.endY],
                        opacity: [0, 1, 1, 0]
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        repeatDelay: 0.6,
                        ease: "easeInOut"
                      }}
                    />
                  ))}

                  {/* Stage 2: Secondary Spoke Wire Pulses (Categories -> 16 Tech Chips) */}
                  {spokePulses.map((spoke, idx) => (
                    <motion.circle
                      key={`spoke-pulse-${idx}`}
                      r="3.5"
                      fill={spoke.color}
                      filter={spoke.filter}
                      initial={{ cx: spoke.startX, cy: spoke.startY, opacity: 0 }}
                      animate={{
                        cx: [spoke.startX, spoke.endX],
                        cy: [spoke.startY, spoke.endY],
                        opacity: [0, 1, 1, 0]
                      }}
                      transition={{
                        duration: 0.6,
                        delay: 0.35,
                        repeat: Infinity,
                        repeatDelay: 0.5,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </g>
              )}
            </svg>

            {/* Central Tech Hub (Interactive Bullet Laser Burst on Hover) */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.12 }}
              onMouseEnter={() => {
                setPulseKey(prev => prev + 1);
                setIsCenterHovered(true);
              }}
              onMouseLeave={() => setIsCenterHovered(false)}
              className="absolute top-[350px] left-[500px] -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-auto cursor-pointer flex items-center justify-center group"
            >
              <div className="relative w-[130px] h-[130px] rounded-full bg-gradient-to-r from-[#d8ff00] to-[#ccf23a] backdrop-blur-xl border border-white shadow-[0_12px_35px_rgba(216,255,0,0.5)] group-hover:shadow-[0_18px_50px_rgba(216,255,0,0.85)] transition-shadow duration-300 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-[#d8ff00]/40 animate-ping group-hover:bg-[#d8ff00]/80" style={{ animationDuration: '2.5s' }} />
                <div className="absolute -inset-2 rounded-full border-2 border-[#ccf23a]/60 animate-pulse" />
                <div className="absolute inset-2 rounded-full border-2 border-dashed border-lime-800/25 animate-[spin_15s_linear_infinite]" />
                <div className="w-[82px] h-[82px] rounded-full bg-white/95 shadow-inner flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <div className="w-12 h-12 rounded-full bg-lime-400/20 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-lime-50 flex items-center justify-center" />
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 m-auto w-10 h-10 flex items-center justify-center text-slate-800"
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full fill-current drop-shadow-xs">
                    <path d="M50 35c-8.28 0-15 6.72-15 15s6.72 15 15 15 15-6.72 15-15-6.72-15-15-15zm36.5 10.5l-6.1-1.3c-.4-1.5-1-3-1.8-4.3l3.6-5.1c.8-1.2.7-2.8-.3-3.8l-4.2-4.2c-1-1-2.6-1.1-3.8-.3l-5.1 3.6c-1.3-.8-2.8-1.4-4.3-1.8l-1.3-6.1c-.3-1.4-1.5-2.5-3-2.5h-6c-1.5 0-2.7 1.1-3 2.5l-1.3 6.1c-1.5.4-3 1-4.3 1.8l-5.1-3.6c-1.2-.8-2.8-.7-3.8.3l-4.2 4.2c-1 1-1.1 2.6-.3 3.8l3.6 5.1c-.8 1.3-1.4 2.8-1.8 4.3l-6.1 1.3c-1.4.3-2.5 1.5-2.5 3v6c0 1.5 1.1 2.7 2.5 3l6.1 1.3c.4 1.5 1 3 1.8 4.3l-3.6 5.1c-.8 1.2-.7 2.8.3 3.8l4.2 4.2c1 1 2.6 1.1 3.8.3l5.1-3.6c1.3.8 2.8 1.4 4.3 1.8l1.3 6.1c.3 1.4 1.5 2.5 3 2.5h6c1.5 0 2.7-1.1 3-2.5l1.3-6.1c1.5-.4 3-1 4.3-1.8l5.1 3.6c1.2.8 2.8.7 3.8-.3l4.2-4.2c1-1 1.1-2.6-.3-3.8l-3.6-5.1c.8-1.3 1.4-2.8 1.8-4.3l6.1-1.3c1.4-.3 2.5-1.5 2.5-3v-6c0-1.5-1.1-2.7-2.5-3z" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>

            {/* 4 Category Capsules (Pop in with glow at 1.0s) */}
            <div className="absolute top-[165px] left-[500px] -translate-x-1/2 -translate-y-1/2 z-20">
              <motion.div
                initial={{ scale: 0, opacity: 0, y: 15 }}
                animate={isInView ? { scale: 1, opacity: 1, y: 0 } : { scale: 0, opacity: 0, y: 15 }}
                transition={{ duration: 0.6, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.06 }}
                className="w-[140px] h-[44px] bg-gradient-to-r from-[#1e293b] to-[#334155] text-white rounded-full font-extrabold text-xs sm:text-sm tracking-wider shadow-[0_10px_25px_rgba(14,165,233,0.35)] border-2 border-[#38bdf8] flex items-center justify-center gap-2 cursor-pointer relative font-poppins"
              >
                <div className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse" />
                <span>Front-end</span>
              </motion.div>
            </div>

            <div className="absolute top-[350px] left-[675px] -translate-x-1/2 -translate-y-1/2 z-20">
              <motion.div
                initial={{ scale: 0, opacity: 0, x: -15 }}
                animate={isInView ? { scale: 1, opacity: 1, x: 0 } : { scale: 0, opacity: 0, x: -15 }}
                transition={{ duration: 0.6, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.06 }}
                className="w-[126px] h-[44px] bg-gradient-to-r from-[#1e293b] to-[#334155] text-white rounded-full font-extrabold text-xs sm:text-sm tracking-wider shadow-[0_10px_25px_rgba(236,72,153,0.35)] border-2 border-[#ec4899] flex items-center justify-center gap-2 cursor-pointer relative font-poppins"
              >
                <div className="w-2 h-2 rounded-full bg-[#ec4899] animate-pulse" />
                <span>UI & 3D</span>
              </motion.div>
            </div>

            <div className="absolute top-[535px] left-[500px] -translate-x-1/2 -translate-y-1/2 z-20">
              <motion.div
                initial={{ scale: 0, opacity: 0, y: -15 }}
                animate={isInView ? { scale: 1, opacity: 1, y: 0 } : { scale: 0, opacity: 0, y: -15 }}
                transition={{ duration: 0.6, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.06 }}
                className="w-[140px] h-[44px] bg-gradient-to-r from-[#1e293b] to-[#334155] text-white rounded-full font-extrabold text-xs sm:text-sm tracking-wider shadow-[0_10px_25px_rgba(34,197,94,0.35)] border-2 border-[#22c55e] flex items-center justify-center gap-2 cursor-pointer relative font-poppins"
              >
                <div className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
                <span>Back-end</span>
              </motion.div>
            </div>

            <div className="absolute top-[350px] left-[325px] -translate-x-1/2 -translate-y-1/2 z-20">
              <motion.div
                initial={{ scale: 0, opacity: 0, x: 15 }}
                animate={isInView ? { scale: 1, opacity: 1, x: 0 } : { scale: 0, opacity: 0, x: 15 }}
                transition={{ duration: 0.6, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.06 }}
                className="w-[160px] h-[44px] bg-gradient-to-r from-[#1e293b] to-[#334155] text-white rounded-full font-extrabold text-xs sm:text-sm tracking-wider shadow-[0_10px_25px_rgba(249,115,22,0.35)] border-2 border-[#f97316] flex items-center justify-center gap-2 cursor-pointer relative font-poppins"
              >
                <div className="w-2 h-2 rounded-full bg-[#f97316] animate-pulse" />
                <span>AI & Deployment</span>
              </motion.div>
            </div>

            {/* ════ 17 TECH CHIPS (Bloom in gracefully from 2.1s - 2.8s as energy lines arrive) ════ */}
            {/* Top Front-end */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.55, delay: 2.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.1, y: -3 }}
              className="absolute top-[75px] left-[260px] -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl px-3.5 py-2 flex items-center gap-2 shadow-md hover:border-lime-400 cursor-pointer transition-all whitespace-nowrap"
            >
              <div className="w-7 h-7 rounded-xl bg-lime-50 flex items-center justify-center shrink-0">
                <SiJavascript size={16} className="text-[#5f7a12]" />
              </div>
              <div className="whitespace-nowrap">
                <div className="font-extrabold text-xs text-slate-800 leading-tight whitespace-nowrap font-poppins">JavaScript</div>
                <div className="text-[9px] text-slate-400 font-semibold whitespace-nowrap font-sans">ES6+ Engine</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.55, delay: 2.25, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.12, y: -4 }}
              className="absolute top-[30px] left-[420px] -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md border-2 border-slate-200/90 rounded-2xl px-4 py-2.5 flex items-center gap-2.5 shadow-lg cursor-pointer transition-all whitespace-nowrap"
            >
              <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                <SiReact size={20} className="text-[#0284c7] animate-[spin_10s_linear_infinite]" />
              </div>
              <div className="whitespace-nowrap">
                <div className="font-extrabold text-xs text-slate-900 leading-tight whitespace-nowrap font-poppins">React 19</div>
                <div className="text-[8px] text-[#5f7a12] font-extrabold uppercase tracking-wider whitespace-nowrap font-poppins">CORE FRAMEWORK</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.55, delay: 2.4, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.12, y: -4 }}
              className="absolute top-[30px] left-[580px] -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md border-2 border-slate-800/90 rounded-2xl px-4 py-2.5 flex items-center gap-2.5 shadow-lg cursor-pointer transition-all whitespace-nowrap"
            >
              <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                <SiNextdotjs size={18} className="text-black" />
              </div>
              <div className="whitespace-nowrap">
                <div className="font-extrabold text-xs text-slate-900 leading-tight whitespace-nowrap font-poppins">Next.js 15</div>
                <div className="text-[8px] text-slate-700 font-extrabold uppercase tracking-wider whitespace-nowrap font-poppins">FULL-STACK APP</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.55, delay: 2.55, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.1, y: -3 }}
              className="absolute top-[75px] left-[740px] -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl px-3.5 py-2 flex items-center gap-2 shadow-md hover:border-slate-200 cursor-pointer transition-all whitespace-nowrap"
            >
              <div className="w-7 h-7 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                <SiTypescript size={16} className="text-[#2563eb]" />
              </div>
              <div className="whitespace-nowrap">
                <div className="font-extrabold text-xs text-slate-800 leading-tight whitespace-nowrap font-poppins">TypeScript</div>
                <div className="text-[9px] text-slate-400 font-semibold whitespace-nowrap font-sans">Type Safety</div>
              </div>
            </motion.div>

            {/* Right UI & 3D */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.55, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.1, x: 3 }}
              className="absolute top-[190px] left-[970px] -translate-y-1/2 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl px-3.5 py-2 flex items-center gap-2 shadow-md hover:border-slate-200 cursor-pointer transition-all whitespace-nowrap"
            >
              <div className="w-7 h-7 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                <SiTailwindcss size={18} className="text-[#0284c7]" />
              </div>
              <div className="whitespace-nowrap">
                <div className="font-extrabold text-xs text-slate-800 leading-tight whitespace-nowrap font-poppins">Tailwind CSS</div>
                <div className="text-[9px] text-slate-400 font-semibold whitespace-nowrap font-sans">Utility UI</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.55, delay: 2.35, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.1, x: 3 }}
              className="absolute top-[305px] left-[900px] -translate-y-1/2 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl px-3.5 py-2 flex items-center gap-2 shadow-md hover:border-slate-200 cursor-pointer transition-all whitespace-nowrap"
            >
              <div className="w-7 h-7 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                <SiFramer size={18} className="text-[#db2777]" />
              </div>
              <div className="whitespace-nowrap">
                <div className="font-extrabold text-xs text-slate-800 leading-tight whitespace-nowrap font-poppins">Framer Motion</div>
                <div className="text-[9px] text-slate-400 font-semibold whitespace-nowrap font-sans">Web Animations</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.55, delay: 2.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.1, x: 3 }}
              className="absolute top-[395px] left-[900px] -translate-y-1/2 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl px-3.5 py-2 flex items-center gap-2 shadow-md hover:border-lime-400 cursor-pointer transition-all whitespace-nowrap"
            >
              <div className="w-7 h-7 rounded-xl bg-lime-50 flex items-center justify-center shrink-0">
                <SiThreedotjs size={18} className="text-[#5f7a12]" />
              </div>
              <div className="whitespace-nowrap">
                <div className="font-extrabold text-xs text-slate-800 leading-tight whitespace-nowrap font-poppins">Three.js 3D</div>
                <div className="text-[9px] text-slate-400 font-semibold whitespace-nowrap font-sans">WebGL Canvas</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.55, delay: 2.65, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.1, x: 3 }}
              className="absolute top-[510px] left-[970px] -translate-y-1/2 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl px-3.5 py-2 flex items-center gap-2 shadow-md hover:border-slate-200 cursor-pointer transition-all whitespace-nowrap"
            >
              <div className="w-7 h-7 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                <SiFigma size={18} className="text-[#a259ff]" />
              </div>
              <div className="whitespace-nowrap">
                <div className="font-extrabold text-xs text-slate-800 leading-tight whitespace-nowrap font-poppins">Figma 1:1</div>
                <div className="text-[9px] text-slate-400 font-semibold whitespace-nowrap font-sans">Pixel Perfect</div>
              </div>
            </motion.div>

            {/* Bottom Back-end (4 Items) */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.55, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.1, y: 3 }}
              className="absolute top-[600px] left-[230px] -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl px-3.5 py-2 flex items-center gap-2 shadow-md hover:border-slate-200 cursor-pointer transition-all whitespace-nowrap"
            >
              <div className="w-7 h-7 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                <SiNodedotjs size={18} className="text-[#16a34a]" />
              </div>
              <div className="whitespace-nowrap">
                <div className="font-extrabold text-xs text-slate-800 leading-tight whitespace-nowrap font-poppins">Node.js</div>
                <div className="text-[9px] text-slate-400 font-semibold whitespace-nowrap font-sans">Async Engine</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.55, delay: 2.35, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.1, y: 3 }}
              className="absolute top-[660px] left-[410px] -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl px-3.5 py-2 flex items-center gap-2 shadow-md hover:border-black cursor-pointer transition-all whitespace-nowrap"
            >
              <div className="w-7 h-7 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                <SiExpress size={16} className="text-black" />
              </div>
              <div className="whitespace-nowrap">
                <div className="font-extrabold text-xs text-slate-800 leading-tight whitespace-nowrap font-poppins">Express.js</div>
                <div className="text-[9px] text-slate-400 font-semibold whitespace-nowrap font-sans">REST APIs</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.55, delay: 2.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.12, y: 4 }}
              className="absolute top-[660px] left-[590px] -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md border-2 border-slate-200/90 rounded-2xl px-4 py-2.5 flex items-center gap-2.5 shadow-lg cursor-pointer transition-all whitespace-nowrap"
            >
              <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                <SiMongodb size={20} className="text-[#15803d]" />
              </div>
              <div className="whitespace-nowrap">
                <div className="font-extrabold text-xs text-slate-900 leading-tight whitespace-nowrap font-poppins">MongoDB</div>
                <div className="text-[8px] text-[#5f7a12] font-extrabold uppercase tracking-wider whitespace-nowrap font-poppins">NOSQL CLUSTER</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.55, delay: 2.65, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.1, y: 3 }}
              className="absolute top-[600px] left-[770px] -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl px-3.5 py-2 flex items-center gap-2 shadow-md hover:border-slate-200 cursor-pointer transition-all whitespace-nowrap"
            >
              <div className="w-7 h-7 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                <SiSupabase size={16} className="text-[#3ecf8e]" />
              </div>
              <div className="whitespace-nowrap">
                <div className="font-extrabold text-xs text-slate-800 leading-tight whitespace-nowrap font-poppins">Supabase</div>
                <div className="text-[9px] text-slate-400 font-semibold whitespace-nowrap font-sans">Realtime BaaS</div>
              </div>
            </motion.div>

            {/* Left AI & Deployment */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.55, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.1, x: -3 }}
              className="absolute top-[190px] left-[70px] -translate-x-full -translate-y-1/2 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl px-3.5 py-2 flex items-center gap-2 shadow-md hover:border-slate-200 cursor-pointer transition-all whitespace-nowrap"
            >
              <div className="w-7 h-7 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                <SiGit size={18} className="text-[#f05032]" />
              </div>
              <div className="whitespace-nowrap">
                <div className="font-extrabold text-xs text-slate-800 leading-tight whitespace-nowrap font-poppins">Git & GitHub</div>
                <div className="text-[9px] text-slate-400 font-semibold whitespace-nowrap font-sans">CI/CD & Code</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.55, delay: 2.35, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.1, x: -3 }}
              className="absolute top-[305px] left-[100px] -translate-x-full -translate-y-1/2 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl px-3.5 py-2 flex items-center gap-2 shadow-md hover:border-slate-200 cursor-pointer transition-all whitespace-nowrap"
            >
              <div className="w-7 h-7 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                <SiHostinger size={18} className="text-[#673de6]" />
              </div>
              <div className="whitespace-nowrap">
                <div className="font-extrabold text-xs text-slate-800 leading-tight whitespace-nowrap font-poppins">Hostinger</div>
                <div className="text-[9px] text-slate-400 font-semibold whitespace-nowrap font-sans">VPS & Cloud</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.55, delay: 2.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.1, x: -3 }}
              className="absolute top-[395px] left-[100px] -translate-x-full -translate-y-1/2 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl px-3.5 py-2 flex items-center gap-2 shadow-md hover:border-black cursor-pointer transition-all whitespace-nowrap"
            >
              <div className="w-7 h-7 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                <SiVercel size={16} className="text-black" />
              </div>
              <div className="whitespace-nowrap">
                <div className="font-extrabold text-xs text-slate-800 leading-tight whitespace-nowrap font-poppins">Vercel</div>
                <div className="text-[9px] text-slate-400 font-semibold whitespace-nowrap font-sans">Edge Cloud</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.55, delay: 2.65, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.1, x: -3 }}
              className="absolute top-[510px] left-[70px] -translate-x-full -translate-y-1/2 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl px-3.5 py-2 flex items-center gap-2 shadow-md hover:border-lime-400 cursor-pointer transition-all whitespace-nowrap"
            >
              <div className="w-7 h-7 rounded-xl bg-lime-50 flex items-center justify-center shrink-0">
                <Sparkles size={16} className="text-[#5f7a12]" />
              </div>
              <div className="whitespace-nowrap">
                <div className="font-extrabold text-xs text-slate-800 leading-tight whitespace-nowrap font-poppins">Groq AI (LLMs)</div>
                <div className="text-[9px] text-slate-400 font-semibold whitespace-nowrap font-sans">AI Integration</div>
              </div>
            </motion.div>

          </div>

        </div>

        {/* ══════════════════════════════════════════════════════════
            MOBILE & TABLET INTERACTIVE VIEW (Pill Grid, Floating Cards & Hover Fill)
           ══════════════════════════════════════════════════════════ */}
        <div className="lg:hidden flex flex-col items-center w-full px-2">

          {/* Segmented Tab Controller */}
          <div className="w-full mb-6 -mx-2 px-2">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-1 font-poppins">
              {[
                { id: 'all', label: 'All Tech' },
                ...quadrantData.map(q => ({ id: q.id, label: q.label }))
              ].map(tab => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`snap-start shrink-0 py-2 px-4 rounded-full text-[11px] font-bold tracking-wide transition-all cursor-pointer font-poppins text-center border ${isActive
                        ? 'bg-[#0f172a] text-white shadow-md border-[#0f172a]'
                        : 'bg-white text-slate-600 hover:text-slate-900 border-slate-200 hover:border-slate-300'
                      }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Category Items Grid (2 Columns, Ultra-Compact Slim Pill Shape) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="grid grid-cols-2 gap-2 sm:gap-2.5 w-full max-w-[290px] sm:max-w-xs mx-auto"
            >
              {(activeTab === 'all' ? quadrantData.flatMap(q => q.items) : activeGroup.items).map((tech, index) => {
                const IconComp = tech.icon;
                return (
                  <motion.div
                    key={tech.name}
                    animate={{ y: [0, -3.5, 0] }}
                    transition={{
                      duration: 2.6 + (index % 4) * 0.35,
                      repeat: Infinity,
                      repeatType: 'mirror',
                      ease: 'easeInOut',
                      delay: (index % 4) * 0.12,
                    }}
                    whileTap={{ scale: 0.96 }}
                    className="group relative overflow-hidden bg-white border border-slate-200/80 hover:border-lime-400/80 rounded-[18px] py-2 px-2 flex flex-col items-center justify-center gap-1 text-center shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-md transition-all duration-300 cursor-pointer h-[62px]"
                  >
                    {/* Bottom-to-Top Slide Fill Hover Accent */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#d8ff00]/20 via-[#ccf23a]/8 to-transparent translate-y-full group-hover:translate-y-0 group-active:translate-y-0 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none rounded-[18px]" />

                    {/* Ultra-Delicate Icon (18px) */}
                    <div className="relative z-10 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                      <IconComp size={18} style={{ color: tech.color }} />
                    </div>

                    {/* Compact text (11px, font-medium) */}
                    <div className="relative z-10 font-medium text-[11px] text-slate-700 leading-tight font-poppins group-hover:text-slate-900 tracking-tight">
                      {tech.name}
                    </div>

                    {/* Bottom accent glow line */}
                    <div className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-gradient-to-r from-[#d8ff00] to-[#ccf23a] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
