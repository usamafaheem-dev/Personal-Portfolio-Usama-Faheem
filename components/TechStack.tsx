'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
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
  SiPostgresql,
  SiDocker,
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
      { name: 'JavaScript', category: 'ES6+ Engine', icon: SiJavascript, color: '#eab308', bgLight: 'bg-amber-50' },
      { name: 'React 19', category: 'Core Library', icon: SiReact, color: '#0284c7', bgLight: 'bg-sky-50', isFeatured: true },
      { name: 'Next.js 15', category: 'Full-Stack App', icon: SiNextdotjs, color: '#000000', bgLight: 'bg-zinc-100', isFeatured: true },
      { name: 'TypeScript', category: 'Type Safety', icon: SiTypescript, color: '#2563eb', bgLight: 'bg-blue-50' }
    ]
  },
  {
    id: 'ui3d',
    title: 'UI Design & 3D Graphics',
    label: 'UI & 3D',
    glowColor: 'rgba(236, 72, 153, 0.4)',
    borderColor: '#ec4899',
    items: [
      { name: 'Tailwind CSS', category: 'Utility UI', icon: SiTailwindcss, color: '#0284c7', bgLight: 'bg-cyan-50' },
      { name: 'Framer Motion', category: 'Web Animations', icon: SiFramer, color: '#db2777', bgLight: 'bg-pink-50' },
      { name: 'Three.js 3D', category: 'WebGL Canvas', icon: SiThreedotjs, color: '#d97706', bgLight: 'bg-amber-50' },
      { name: 'Figma 1:1', category: 'Pixel Perfect', icon: SiFigma, color: '#a259ff', bgLight: 'bg-purple-50' }
    ]
  },
  {
    id: 'backend',
    title: 'Back-end & Cloud DB',
    label: 'Back-end',
    glowColor: 'rgba(34, 197, 94, 0.4)',
    borderColor: '#22c55e',
    items: [
      { name: 'Node.js', category: 'Async Engine', icon: SiNodedotjs, color: '#16a34a', bgLight: 'bg-green-50' },
      { name: 'Express.js', category: 'REST APIs', icon: SiExpress, color: '#000000', bgLight: 'bg-zinc-100' },
      { name: 'MongoDB', category: 'NoSQL Cluster', icon: SiMongodb, color: '#15803d', bgLight: 'bg-emerald-50', isFeatured: true },
      { name: 'PostgreSQL', category: 'Relational DB', icon: SiPostgresql, color: '#336791', bgLight: 'bg-blue-50' },
      { name: 'Supabase', category: 'Realtime BaaS', icon: SiSupabase, color: '#3ecf8e', bgLight: 'bg-emerald-50' }
    ]
  },
  {
    id: 'devops',
    title: 'DevOps, Cloud & AI',
    label: 'DevOps & AI',
    glowColor: 'rgba(249, 115, 22, 0.4)',
    borderColor: '#f97316',
    items: [
      { name: 'Git & GitHub', category: 'CI/CD & Code', icon: SiGit, color: '#f05032', bgLight: 'bg-orange-50' },
      { name: 'Docker', category: 'Containers', icon: SiDocker, color: '#2496ed', bgLight: 'bg-sky-50' },
      { name: 'Vercel', category: 'Edge Cloud', icon: SiVercel, color: '#000000', bgLight: 'bg-zinc-100' },
      { name: 'Groq AI (LLMs)', category: 'AI Integration', icon: Sparkles, color: '#f59e0b', bgLight: 'bg-amber-50' }
    ]
  }
];

export default function TechStack() {
  const [activeTab, setActiveTab] = useState<string>('frontend');
  const activeGroup = quadrantData.find(q => q.id === activeTab) || quadrantData[0];

  const isPageReady = usePageReady();
  const diagramRef = useRef<HTMLDivElement>(null);
  const inView = useInView(diagramRef, { once: true, amount: 0.5 });
  const isInView = isPageReady && inView;

  return (
    <section
      id="stack"
      className="relative bg-[#f8fafc] py-20 sm:py-28 overflow-hidden font-sans text-[#1a1a1a] border-t border-b border-slate-200 select-none"
    >
      {/* ── Precision Dotted Grid Background Pattern ── */}
      <div className="absolute inset-0 bg-[radial-gradient(#99a1af_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-40 pointer-events-none [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_60%,transparent_100%)]" />

      {/* Background Subtle Ambient Glass Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-gradient-to-br from-blue-400/8 via-purple-400/5 to-pink-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-[760px] mx-auto mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md border border-slate-200 px-4 py-1.5 rounded-full shadow-xs mb-3">
              <Sparkles size={14} className="text-blue-600" />
              <span className="font-extrabold text-xs tracking-wider text-slate-800 uppercase">Architecture & Tech Stack</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#1e293b] tracking-tight mb-3 font-sans">
              Technologies for Marketplace & SaaS Development
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

                {/* Right UI & 3D Masks */}
                <mask id="mask_tw"><motion.path d="M 738 350 L 1030 190" stroke="#fff" strokeWidth="40" strokeLinecap="round" initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : { pathLength: 0 }} transition={{ duration: 1.4, delay: 1.4, ease: "easeInOut" }} /></mask>
                <mask id="mask_framer"><motion.path d="M 738 350 L 960 305" stroke="#fff" strokeWidth="40" strokeLinecap="round" initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : { pathLength: 0 }} transition={{ duration: 1.4, delay: 1.4, ease: "easeInOut" }} /></mask>
                <mask id="mask_three"><motion.path d="M 738 350 L 960 395" stroke="#fff" strokeWidth="40" strokeLinecap="round" initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : { pathLength: 0 }} transition={{ duration: 1.4, delay: 1.4, ease: "easeInOut" }} /></mask>
                <mask id="mask_figma"><motion.path d="M 738 350 L 1030 510" stroke="#fff" strokeWidth="40" strokeLinecap="round" initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : { pathLength: 0 }} transition={{ duration: 1.4, delay: 1.4, ease: "easeInOut" }} /></mask>

                {/* Bottom Back-end Masks */}
                <mask id="mask_node"><motion.path d="M 500 557 L 200 590" stroke="#fff" strokeWidth="40" strokeLinecap="round" initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : { pathLength: 0 }} transition={{ duration: 1.4, delay: 1.4, ease: "easeInOut" }} /></mask>
                <mask id="mask_express"><motion.path d="M 500 557 L 350 645" stroke="#fff" strokeWidth="40" strokeLinecap="round" initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : { pathLength: 0 }} transition={{ duration: 1.4, delay: 1.4, ease: "easeInOut" }} /></mask>
                <mask id="mask_mongo" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" x="0" y="0" width="1000" height="700"><motion.path d="M 500 557 L 500 680" stroke="#fff" strokeWidth="40" strokeLinecap="round" initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : { pathLength: 0 }} transition={{ duration: 1.4, delay: 1.4, ease: "easeInOut" }} /></mask>
                <mask id="mask_postgres"><motion.path d="M 500 557 L 650 645" stroke="#fff" strokeWidth="40" strokeLinecap="round" initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : { pathLength: 0 }} transition={{ duration: 1.4, delay: 1.4, ease: "easeInOut" }} /></mask>
                <mask id="mask_supabase"><motion.path d="M 500 557 L 800 590" stroke="#fff" strokeWidth="40" strokeLinecap="round" initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : { pathLength: 0 }} transition={{ duration: 1.4, delay: 1.4, ease: "easeInOut" }} /></mask>

                {/* Left DevOps & AI Masks */}
                <mask id="mask_git"><motion.path d="M 253 350 L 10 190" stroke="#fff" strokeWidth="40" strokeLinecap="round" initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : { pathLength: 0 }} transition={{ duration: 1.4, delay: 1.4, ease: "easeInOut" }} /></mask>
                <mask id="mask_docker"><motion.path d="M 253 350 L 40 305" stroke="#fff" strokeWidth="40" strokeLinecap="round" initial={{ pathLength: 0 }} animate={isInView ? { pathLength: 1 } : { pathLength: 0 }} transition={{ duration: 1.4, delay: 1.4, ease: "easeInOut" }} /></mask>
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
                fill="rgba(250, 204, 21, 0.03)"
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

              {/* 4 Satellite Star Diamonds */}
              <motion.g
                transform="translate(620, 230) rotate(45)"
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <rect x="-6" y="-6" width="12" height="12" fill="#ffffff" stroke="#38bdf8" strokeWidth="2" rx="2" />
                <circle cx="0" cy="0" r="2.5" fill="#38bdf8" />
              </motion.g>
              <motion.g
                transform="translate(620, 470) rotate(45)"
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <rect x="-6" y="-6" width="12" height="12" fill="#ffffff" stroke="#ec4899" strokeWidth="2" rx="2" />
                <circle cx="0" cy="0" r="2.5" fill="#ec4899" />
              </motion.g>
              <motion.g
                transform="translate(380, 470) rotate(45)"
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <rect x="-6" y="-6" width="12" height="12" fill="#ffffff" stroke="#22c55e" strokeWidth="2" rx="2" />
                <circle cx="0" cy="0" r="2.5" fill="#22c55e" />
              </motion.g>
              <motion.g
                transform="translate(380, 230) rotate(45)"
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <rect x="-6" y="-6" width="12" height="12" fill="#ffffff" stroke="#f97316" strokeWidth="2" rx="2" />
                <circle cx="0" cy="0" r="2.5" fill="#f97316" />
              </motion.g>

              {/* ── 4 PRIMARY CARDINAL POWER STEMS (Solid Glowing Lasers from Center to Categories) ── */}
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

              {/* ── 17 DOTTED SPOKE WIRES ── */}
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

              {/* Bottom Back-end */}
              <path d="M 500 557 L 200 590" stroke="#22c55e" strokeWidth="3" strokeDasharray="4 14" strokeLinecap="round" mask="url(#mask_node)" opacity="0.9" />
              <path d="M 500 557 L 350 645" stroke="#22c55e" strokeWidth="3" strokeDasharray="4 14" strokeLinecap="round" mask="url(#mask_express)" opacity="0.9" />
              <path d="M 500 557 L 500 680" stroke="#22c55e" strokeWidth="3" strokeDasharray="4 14" strokeLinecap="round" mask="url(#mask_mongo)" opacity="0.9" />
              <path d="M 500 557 L 650 645" stroke="#22c55e" strokeWidth="3" strokeDasharray="4 14" strokeLinecap="round" mask="url(#mask_postgres)" opacity="0.9" />
              <path d="M 500 557 L 800 590" stroke="#22c55e" strokeWidth="3" strokeDasharray="4 14" strokeLinecap="round" mask="url(#mask_supabase)" opacity="0.9" />

              {/* Left DevOps & AI */}
              <path d="M 253 350 L 10 190" stroke="#f97316" strokeWidth="3" strokeDasharray="4 14" strokeLinecap="round" mask="url(#mask_git)" opacity="0.9" />
              <path d="M 253 350 L 40 305" stroke="#f97316" strokeWidth="3.5" strokeDasharray="4 14" strokeLinecap="round" filter="url(#glowOrange)" mask="url(#mask_docker)" opacity="0.95" />
              <path d="M 253 350 L 40 395" stroke="#f97316" strokeWidth="3" strokeDasharray="4 14" strokeLinecap="round" mask="url(#mask_vercel)" opacity="0.9" />
              <path d="M 253 350 L 10 510" stroke="#f97316" strokeWidth="3" strokeDasharray="4 14" strokeLinecap="round" mask="url(#mask_groq)" opacity="0.9" />

              {/* ── 17 GLOWING ELECTRIC LEAD PARTICLES (Flowing out at 1.4s) ── */}
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
              <motion.circle r="4" fill="#22c55e" filter="url(#glowGreen)" initial={{ cx: 500, cy: 557, opacity: 0 }} animate={isInView ? { cx: [500, 200], cy: [557, 590], opacity: [0, 1, 1, 0] } : { opacity: 0 }} transition={{ duration: 1.4, delay: 1.4, ease: "easeInOut" }} />
              <motion.circle r="4" fill="#22c55e" filter="url(#glowGreen)" initial={{ cx: 500, cy: 557, opacity: 0 }} animate={isInView ? { cx: [500, 350], cy: [557, 645], opacity: [0, 1, 1, 0] } : { opacity: 0 }} transition={{ duration: 1.4, delay: 1.4, ease: "easeInOut" }} />
              <motion.circle r="4.5" fill="#22c55e" filter="url(#glowGreen)" initial={{ cx: 500, cy: 557, opacity: 0 }} animate={isInView ? { cx: [500, 500], cy: [557, 680], opacity: [0, 1, 1, 0] } : { opacity: 0 }} transition={{ duration: 1.4, delay: 1.4, ease: "easeInOut" }} />
              <motion.circle r="4" fill="#22c55e" filter="url(#glowGreen)" initial={{ cx: 500, cy: 557, opacity: 0 }} animate={isInView ? { cx: [500, 650], cy: [557, 645], opacity: [0, 1, 1, 0] } : { opacity: 0 }} transition={{ duration: 1.4, delay: 1.4, ease: "easeInOut" }} />
              <motion.circle r="4" fill="#22c55e" filter="url(#glowGreen)" initial={{ cx: 500, cy: 557, opacity: 0 }} animate={isInView ? { cx: [500, 800], cy: [557, 590], opacity: [0, 1, 1, 0] } : { opacity: 0 }} transition={{ duration: 1.4, delay: 1.4, ease: "easeInOut" }} />

              {/* Left DevOps & AI Lead Pulses */}
              <motion.circle r="4" fill="#f97316" filter="url(#glowOrange)" initial={{ cx: 253, cy: 350, opacity: 0 }} animate={isInView ? { cx: [253, 10], cy: [350, 190], opacity: [0, 1, 1, 0] } : { opacity: 0 }} transition={{ duration: 1.4, delay: 1.4, ease: "easeInOut" }} />
              <motion.circle r="4.5" fill="#f97316" filter="url(#glowOrange)" initial={{ cx: 253, cy: 350, opacity: 0 }} animate={isInView ? { cx: [253, 40], cy: [350, 305], opacity: [0, 1, 1, 0] } : { opacity: 0 }} transition={{ duration: 1.4, delay: 1.4, ease: "easeInOut" }} />
              <motion.circle r="4.5" fill="#f97316" filter="url(#glowOrange)" initial={{ cx: 253, cy: 350, opacity: 0 }} animate={isInView ? { cx: [253, 40], cy: [350, 395], opacity: [0, 1, 1, 0] } : { opacity: 0 }} transition={{ duration: 1.4, delay: 1.4, ease: "easeInOut" }} />
              <motion.circle r="4" fill="#f97316" filter="url(#glowOrange)" initial={{ cx: 253, cy: 350, opacity: 0 }} animate={isInView ? { cx: [253, 10], cy: [350, 510], opacity: [0, 1, 1, 0] } : { opacity: 0 }} transition={{ duration: 1.4, delay: 1.4, ease: "easeInOut" }} />
            </svg>

            {/* Central Tech Hub (Starts smoothly at 0.1s) */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-[350px] left-[500px] -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none flex items-center justify-center"
            >
              <div className="relative w-[130px] h-[130px] rounded-full bg-yellow-400 backdrop-blur-xl border border-white shadow-[0_12px_35px_rgba(250,204,21,0.5)] flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-yellow-400/40 animate-ping" style={{ animationDuration: '3.5s' }} />
                <div className="absolute -inset-2 rounded-full border-2 border-yellow-300/60 animate-pulse" />
                <div className="absolute inset-2 rounded-full border-2 border-dashed border-amber-800/25 animate-[spin_20s_linear_infinite]" />
                <div className="w-[82px] h-[82px] rounded-full bg-white/95 shadow-inner flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-yellow-400/20 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center" />
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
                className="w-[140px] h-[44px] bg-gradient-to-r from-[#1e293b] to-[#334155] text-white rounded-full font-black text-xs sm:text-sm tracking-wider shadow-[0_10px_25px_rgba(14,165,233,0.35)] border-2 border-[#38bdf8] flex items-center justify-center gap-2 cursor-pointer relative"
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
                className="w-[126px] h-[44px] bg-gradient-to-r from-[#1e293b] to-[#334155] text-white rounded-full font-black text-xs sm:text-sm tracking-wider shadow-[0_10px_25px_rgba(236,72,153,0.35)] border-2 border-[#ec4899] flex items-center justify-center gap-2 cursor-pointer relative"
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
                className="w-[140px] h-[44px] bg-gradient-to-r from-[#1e293b] to-[#334155] text-white rounded-full font-black text-xs sm:text-sm tracking-wider shadow-[0_10px_25px_rgba(34,197,94,0.35)] border-2 border-[#22c55e] flex items-center justify-center gap-2 cursor-pointer relative"
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
                className="w-[144px] h-[44px] bg-gradient-to-r from-[#1e293b] to-[#334155] text-white rounded-full font-black text-xs sm:text-sm tracking-wider shadow-[0_10px_25px_rgba(249,115,22,0.35)] border-2 border-[#f97316] flex items-center justify-center gap-2 cursor-pointer relative"
              >
                <div className="w-2 h-2 rounded-full bg-[#f97316] animate-pulse" />
                <span>DevOps & AI</span>
              </motion.div>
            </div>

            {/* ════ 17 TECH CHIPS (Bloom in gracefully from 2.1s - 2.8s as energy lines arrive) ════ */}
            {/* Top Front-end */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.55, delay: 2.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.1, y: -3 }}
              className="absolute top-[75px] left-[260px] -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl px-3.5 py-2 flex items-center gap-2 shadow-md hover:border-amber-400 cursor-pointer transition-all whitespace-nowrap"
            >
              <div className="w-7 h-7 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                <SiJavascript size={16} className="text-[#eab308]" />
              </div>
              <div className="whitespace-nowrap">
                <div className="font-extrabold text-xs text-slate-800 leading-tight whitespace-nowrap">JavaScript</div>
                <div className="text-[9px] text-slate-400 font-semibold whitespace-nowrap">ES6+ Engine</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.55, delay: 2.25, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.12, y: -4 }}
              className="absolute top-[30px] left-[420px] -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md border-2 border-sky-400/90 rounded-2xl px-4 py-2.5 flex items-center gap-2.5 shadow-lg cursor-pointer transition-all whitespace-nowrap"
            >
              <div className="w-8 h-8 rounded-xl bg-sky-50 flex items-center justify-center shrink-0">
                <SiReact size={20} className="text-[#0284c7] animate-[spin_10s_linear_infinite]" />
              </div>
              <div className="whitespace-nowrap">
                <div className="font-black text-xs text-slate-900 leading-tight whitespace-nowrap">React 19</div>
                <div className="text-[8px] text-sky-600 font-extrabold uppercase tracking-wider whitespace-nowrap">CORE FRAMEWORK</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.55, delay: 2.4, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.12, y: -4 }}
              className="absolute top-[30px] left-[580px] -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md border-2 border-slate-800/90 rounded-2xl px-4 py-2.5 flex items-center gap-2.5 shadow-lg cursor-pointer transition-all whitespace-nowrap"
            >
              <div className="w-8 h-8 rounded-xl bg-zinc-100 flex items-center justify-center shrink-0">
                <SiNextdotjs size={18} className="text-black" />
              </div>
              <div className="whitespace-nowrap">
                <div className="font-black text-xs text-slate-900 leading-tight whitespace-nowrap">Next.js 15</div>
                <div className="text-[8px] text-slate-700 font-extrabold uppercase tracking-wider whitespace-nowrap">FULL-STACK APP</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.55, delay: 2.55, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.1, y: -3 }}
              className="absolute top-[75px] left-[740px] -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl px-3.5 py-2 flex items-center gap-2 shadow-md hover:border-blue-400 cursor-pointer transition-all whitespace-nowrap"
            >
              <div className="w-7 h-7 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                <SiTypescript size={16} className="text-[#2563eb]" />
              </div>
              <div className="whitespace-nowrap">
                <div className="font-extrabold text-xs text-slate-800 leading-tight whitespace-nowrap">TypeScript</div>
                <div className="text-[9px] text-slate-400 font-semibold whitespace-nowrap">Type Safety</div>
              </div>
            </motion.div>

            {/* Right UI & 3D */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.55, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.1, x: 3 }}
              className="absolute top-[190px] left-[970px] -translate-y-1/2 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl px-3.5 py-2 flex items-center gap-2 shadow-md hover:border-cyan-400 cursor-pointer transition-all whitespace-nowrap"
            >
              <div className="w-7 h-7 rounded-xl bg-cyan-50 flex items-center justify-center shrink-0">
                <SiTailwindcss size={18} className="text-[#0284c7]" />
              </div>
              <div className="whitespace-nowrap">
                <div className="font-extrabold text-xs text-slate-800 leading-tight whitespace-nowrap">Tailwind CSS</div>
                <div className="text-[9px] text-slate-400 font-semibold whitespace-nowrap">Utility UI</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.55, delay: 2.35, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.1, x: 3 }}
              className="absolute top-[305px] left-[900px] -translate-y-1/2 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl px-3.5 py-2 flex items-center gap-2 shadow-md hover:border-pink-400 cursor-pointer transition-all whitespace-nowrap"
            >
              <div className="w-7 h-7 rounded-xl bg-pink-50 flex items-center justify-center shrink-0">
                <SiFramer size={18} className="text-[#db2777]" />
              </div>
              <div className="whitespace-nowrap">
                <div className="font-extrabold text-xs text-slate-800 leading-tight whitespace-nowrap">Framer Motion</div>
                <div className="text-[9px] text-slate-400 font-semibold whitespace-nowrap">Web Animations</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.55, delay: 2.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.1, x: 3 }}
              className="absolute top-[395px] left-[900px] -translate-y-1/2 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl px-3.5 py-2 flex items-center gap-2 shadow-md hover:border-amber-400 cursor-pointer transition-all whitespace-nowrap"
            >
              <div className="w-7 h-7 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                <SiThreedotjs size={18} className="text-[#d97706]" />
              </div>
              <div className="whitespace-nowrap">
                <div className="font-extrabold text-xs text-slate-800 leading-tight whitespace-nowrap">Three.js 3D</div>
                <div className="text-[9px] text-slate-400 font-semibold whitespace-nowrap">WebGL Canvas</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.55, delay: 2.65, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.1, x: 3 }}
              className="absolute top-[510px] left-[970px] -translate-y-1/2 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl px-3.5 py-2 flex items-center gap-2 shadow-md hover:border-purple-400 cursor-pointer transition-all whitespace-nowrap"
            >
              <div className="w-7 h-7 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
                <SiFigma size={18} className="text-[#a259ff]" />
              </div>
              <div className="whitespace-nowrap">
                <div className="font-extrabold text-xs text-slate-800 leading-tight whitespace-nowrap">Figma 1:1</div>
                <div className="text-[9px] text-slate-400 font-semibold whitespace-nowrap">Pixel Perfect</div>
              </div>
            </motion.div>

            {/* Bottom Back-end */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.55, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.1, y: 3 }}
              className="absolute top-[590px] left-[200px] -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl px-3.5 py-2 flex items-center gap-2 shadow-md hover:border-green-400 cursor-pointer transition-all whitespace-nowrap"
            >
              <div className="w-7 h-7 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                <SiNodedotjs size={18} className="text-[#16a34a]" />
              </div>
              <div className="whitespace-nowrap">
                <div className="font-extrabold text-xs text-slate-800 leading-tight whitespace-nowrap">Node.js</div>
                <div className="text-[9px] text-slate-400 font-semibold whitespace-nowrap">Async Engine</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.55, delay: 2.35, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.1, y: 3 }}
              className="absolute top-[645px] left-[350px] -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl px-3.5 py-2 flex items-center gap-2 shadow-md hover:border-black cursor-pointer transition-all whitespace-nowrap"
            >
              <div className="w-7 h-7 rounded-xl bg-zinc-100 flex items-center justify-center shrink-0">
                <SiExpress size={16} className="text-black" />
              </div>
              <div className="whitespace-nowrap">
                <div className="font-extrabold text-xs text-slate-800 leading-tight whitespace-nowrap">Express.js</div>
                <div className="text-[9px] text-slate-400 font-semibold whitespace-nowrap">REST APIs</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.55, delay: 2.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.12, y: 4 }}
              className="absolute top-[680px] left-[500px] -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md border-2 border-emerald-400/90 rounded-2xl px-4 py-2.5 flex items-center gap-2.5 shadow-lg cursor-pointer transition-all whitespace-nowrap"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                <SiMongodb size={20} className="text-[#15803d]" />
              </div>
              <div className="whitespace-nowrap">
                <div className="font-black text-xs text-slate-900 leading-tight whitespace-nowrap">MongoDB</div>
                <div className="text-[8px] text-emerald-600 font-extrabold uppercase tracking-wider whitespace-nowrap">NOSQL CLUSTER</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.55, delay: 2.65, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.1, y: 3 }}
              className="absolute top-[645px] left-[650px] -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl px-3.5 py-2 flex items-center gap-2 shadow-md hover:border-blue-400 cursor-pointer transition-all whitespace-nowrap"
            >
              <div className="w-7 h-7 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                <SiPostgresql size={16} className="text-[#336791]" />
              </div>
              <div className="whitespace-nowrap">
                <div className="font-extrabold text-xs text-slate-800 leading-tight whitespace-nowrap">PostgreSQL</div>
                <div className="text-[9px] text-slate-400 font-semibold whitespace-nowrap">Relational DB</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.55, delay: 2.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.1, y: 3 }}
              className="absolute top-[590px] left-[800px] -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl px-3.5 py-2 flex items-center gap-2 shadow-md hover:border-emerald-400 cursor-pointer transition-all whitespace-nowrap"
            >
              <div className="w-7 h-7 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                <SiSupabase size={16} className="text-[#3ecf8e]" />
              </div>
              <div className="whitespace-nowrap">
                <div className="font-extrabold text-xs text-slate-800 leading-tight whitespace-nowrap">Supabase</div>
                <div className="text-[9px] text-slate-400 font-semibold whitespace-nowrap">Realtime BaaS</div>
              </div>
            </motion.div>

            {/* Left DevOps & AI */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.55, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.1, x: -3 }}
              className="absolute top-[190px] left-[70px] -translate-x-full -translate-y-1/2 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl px-3.5 py-2 flex items-center gap-2 shadow-md hover:border-orange-400 cursor-pointer transition-all whitespace-nowrap"
            >
              <div className="w-7 h-7 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                <SiGit size={18} className="text-[#f05032]" />
              </div>
              <div className="whitespace-nowrap">
                <div className="font-extrabold text-xs text-slate-800 leading-tight whitespace-nowrap">Git & GitHub</div>
                <div className="text-[9px] text-slate-400 font-semibold whitespace-nowrap">CI/CD & Code</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.55, delay: 2.35, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.1, x: -3 }}
              className="absolute top-[305px] left-[100px] -translate-x-full -translate-y-1/2 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl px-3.5 py-2 flex items-center gap-2 shadow-md hover:border-sky-400 cursor-pointer transition-all whitespace-nowrap"
            >
              <div className="w-7 h-7 rounded-xl bg-sky-50 flex items-center justify-center shrink-0">
                <SiDocker size={18} className="text-[#2496ed]" />
              </div>
              <div className="whitespace-nowrap">
                <div className="font-extrabold text-xs text-slate-800 leading-tight whitespace-nowrap">Docker</div>
                <div className="text-[9px] text-slate-400 font-semibold whitespace-nowrap">Containers</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.55, delay: 2.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.1, x: -3 }}
              className="absolute top-[395px] left-[100px] -translate-x-full -translate-y-1/2 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl px-3.5 py-2 flex items-center gap-2 shadow-md hover:border-black cursor-pointer transition-all whitespace-nowrap"
            >
              <div className="w-7 h-7 rounded-xl bg-zinc-100 flex items-center justify-center shrink-0">
                <SiVercel size={16} className="text-black" />
              </div>
              <div className="whitespace-nowrap">
                <div className="font-extrabold text-xs text-slate-800 leading-tight whitespace-nowrap">Vercel</div>
                <div className="text-[9px] text-slate-400 font-semibold whitespace-nowrap">Edge Cloud</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.55, delay: 2.65, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.1, x: -3 }}
              className="absolute top-[510px] left-[70px] -translate-x-full -translate-y-1/2 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl px-3.5 py-2 flex items-center gap-2 shadow-md hover:border-amber-400 cursor-pointer transition-all whitespace-nowrap"
            >
              <div className="w-7 h-7 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                <Sparkles size={16} className="text-[#f59e0b]" />
              </div>
              <div className="whitespace-nowrap">
                <div className="font-extrabold text-xs text-slate-800 leading-tight whitespace-nowrap">Groq AI (LLMs)</div>
                <div className="text-[9px] text-slate-400 font-semibold whitespace-nowrap">AI Integration</div>
              </div>
            </motion.div>

          </div>

        </div>

        {/* ══════════════════════════════════════════════════════════
            MOBILE & TABLET INTERACTIVE VIEW
           ══════════════════════════════════════════════════════════ */}
        <div className="lg:hidden flex flex-col items-center">

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8 bg-slate-200/80 p-1.5 rounded-full border border-slate-300">
            {quadrantData.map(q => {
              const isActive = activeTab === q.id;
              return (
                <button
                  key={q.id}
                  onClick={() => setActiveTab(q.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all cursor-pointer ${isActive ? 'bg-[#1e293b] text-white shadow-md' : 'text-slate-700 hover:text-black'
                    }`}
                >
                  {q.label}
                </button>
              );
            })}
          </div>

          {/* Active Category Items Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 w-full max-w-lg">
            {activeGroup.items.map(tech => {
              const IconComp = tech.icon;
              return (
                <div
                  key={tech.name}
                  className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 text-center shadow-xs"
                >
                  <div className={`w-10 h-10 rounded-xl ${tech.bgLight} flex items-center justify-center`}>
                    <IconComp size={22} style={{ color: tech.color }} />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-800">{tech.name}</div>
                    <div className="text-[10px] text-slate-400 font-medium">{tech.category}</div>
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
