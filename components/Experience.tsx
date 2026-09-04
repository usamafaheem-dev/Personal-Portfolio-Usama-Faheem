'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Download } from 'lucide-react';
import usePageReady from './usePageReady';

interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  description: string;
  period: string;
  badgeNumber: string;
  logoSrc: string;
  logoAlt: string;
  cardGradient: string;
  cardShadow: string;
  cardBorder: string;
  roleTagBg: string;
  numberColor: string;
  accentColor: string;
}

const experiences: ExperienceItem[] = [
  {
    id: 'vertex',
    company: 'VERTEXAI TEC',
    role: 'React/Next.js & MERN Developer',
    description: 'Developed scalable modern web apps, API integrations & responsive UI systems.',
    period: 'Dec 2025 – Aug 2026',
    badgeNumber: '01',
    logoSrc: '/company_icon/vertex_mark.png',
    logoAlt: 'VertexAi Tec Logo',
    cardGradient: 'bg-gradient-to-r from-[#0244ad] via-[#1d4ed8] to-[#2563eb]',
    cardShadow: 'shadow-[0_20px_45px_rgba(2,68,173,0.35)]',
    cardBorder: 'border-blue-400/50',
    roleTagBg: 'bg-white/20 text-white border-white/30',
    numberColor: 'text-slate-200/75',
    accentColor: '#38bdf8',
  },
  {
    id: 'softcr8ors',
    company: 'SOFTCR8ORS',
    role: 'Frontend Developer Intern',
    description: 'Crafted pixel-perfect user interfaces, animations, and high-performance components.',
    period: 'April 2026 – July 2026',
    badgeNumber: '02',
    logoSrc: '/company_icon/softcr8ors_mark.png',
    logoAlt: 'SoftCr8ors Logo',
    cardGradient: 'bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#ec4899]',
    cardShadow: 'shadow-[0_20px_45px_rgba(139,92,246,0.35)]',
    cardBorder: 'border-purple-300/50',
    roleTagBg: 'bg-white/20 text-white border-white/30',
    numberColor: 'text-slate-200/75',
    accentColor: '#ec4899',
  },
  {
    id: 'tekrivo',
    company: 'TEKRIVO',
    role: 'Founder & Full-Stack Engineer',
    description: 'Building custom client software, high-converting digital products & web systems.',
    period: 'Overall 1 Year Experience',
    badgeNumber: '03',
    logoSrc: '/company_icon/tekrivo_mark.png',
    logoAlt: 'Tekrivo Logo',
    cardGradient: 'bg-gradient-to-r from-[#6d28d9] via-[#7c3aed] to-[#8b5cf6]',
    cardShadow: 'shadow-[0_20px_45px_rgba(124,58,237,0.35)]',
    cardBorder: 'border-purple-300/50',
    roleTagBg: 'bg-white/20 text-white border-white/30',
    numberColor: 'text-slate-200/75',
    accentColor: '#8b5cf6',
  },
];

export default function Experience() {
  const isPageReady = usePageReady();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });
  const isInView = isPageReady && inView;

  const handleDownloadCV = () => {
    window.open('/Badge_holder_with_man_photo_202608121707.jpeg', '_blank');
  };

  // ── ORIGINAL EXPERIENCE CARD RENDERER (Used in Left-Column Grid) ──
  const renderOriginalGridCard = (item: ExperienceItem) => (
    <>
      {/* Glass Gloss Overlay */}
      <div className="absolute inset-0 rounded-[26px] sm:rounded-[30px] bg-gradient-to-b from-white/20 via-transparent to-black/10 pointer-events-none" />

      {/* Left: Clean White 3D Glossy Box with Original Logo */}
      <div className="flex items-center gap-4 sm:gap-5 flex-1 min-w-0 relative z-10">
        <div className="relative shrink-0">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white shadow-[0_8px_20px_rgba(0,0,0,0.25)] p-2.5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <img
              src={item.logoSrc}
              alt={item.logoAlt}
              className="w-full h-full object-contain drop-shadow-xs"
            />
          </div>
        </div>

        {/* Middle: Title & Role */}
        <div className="flex flex-col min-w-0 pr-2">
          <div className="flex items-center gap-2">
            <h3 className="font-black font-poppins text-base sm:text-lg tracking-tight text-white uppercase drop-shadow-xs truncate">
              {item.company}
            </h3>
          </div>
          <div className="mt-1">
            <span className={`inline-block text-xs font-bold font-poppins px-3 py-1 rounded-full border backdrop-blur-md ${item.roleTagBg}`}>
              {item.role}
            </span>
          </div>
          <p className="text-white/80 text-xs sm:text-sm mt-1.5 line-clamp-1 font-normal font-sans">
            {item.description}
          </p>
        </div>
      </div>

      {/* Right: Badge Number & Period */}
      <div className="flex flex-col items-end shrink-0 relative z-10 pl-2">
        <span className={`font-bold font-poppins text-2xl sm:text-3xl tracking-tight ${item.numberColor}`}>
          {item.badgeNumber}
        </span>
        <span className="text-[11px] sm:text-xs text-white/70 font-semibold font-sans whitespace-nowrap mt-1">
          {item.period}
        </span>
      </div>
    </>
  );

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative bg-[#f8fafc] py-24 lg:py-32 overflow-hidden font-sans text-[#1a1a1a] border-t border-b border-slate-200 select-none min-h-[700px]"
    >
      {/* ── Precision Dotted Grid Background Pattern ── */}
      <div className="absolute inset-0 bg-[radial-gradient(#99a1af_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-45 pointer-events-none [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_60%,transparent_100%)]" />

      {/* ── Background Subtle Glow Gradients ── */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* ── Decorative Corner Lines ── */}
      <div className="absolute bottom-0 right-0 w-80 h-80 pointer-events-none opacity-40 overflow-hidden">
        <svg
          viewBox="0 0 300 300"
          className="w-full h-full text-zinc-300"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <line x1="120" y1="300" x2="300" y2="120" />
          <line x1="170" y1="300" x2="300" y2="170" />
          <line x1="220" y1="300" x2="300" y2="220" />
          <line x1="260" y1="300" x2="300" y2="260" />
        </svg>
      </div>

      <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-12 relative z-10">

        {/* ══════════════════════════════════════════════════════════════
            EXPERIENCE GRID (3 Cards Animate Directly into Position)
           ══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-20 items-center">

          {/* ── LEFT COLUMN: 3 Experience Cards ── */}
          <div className="lg:col-span-7 flex flex-col gap-6 sm:gap-7 relative py-4">

            {/* Top Header */}
            <div className="mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Career Milestones & Roles
              </span>
            </div>

            {/* SLOT 1: VertexAi Tec */}
            <motion.div
              initial={{
                opacity: 0,
                x: 120,
                y: -40,
                rotateZ: 8,
                scale: 0.9
              }}
              animate={isInView ? {
                opacity: 1,
                x: 0,
                y: 0,
                rotateZ: -2.5,
                scale: 1
              } : {}}
              transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{
                scale: 1.025,
                rotateZ: 0,
                y: -4,
                boxShadow: '0 28px 60px -10px rgba(2,68,173,0.45)',
                transition: { duration: 0.25, ease: 'easeOut' }
              }}
              className={`
                relative group ${experiences[0].cardGradient} 
                border ${experiences[0].cardBorder} rounded-[24px] sm:rounded-[28px] 
                p-5 sm:p-6 transition-all duration-300 ease-out ${experiences[0].cardShadow}
                flex items-center justify-between gap-4 cursor-pointer text-white w-full
                origin-top-left
              `}
            >
              {renderOriginalGridCard(experiences[0])}
            </motion.div>

            {/* SLOT 2: SoftCr8ors */}
            <motion.div
              initial={{
                opacity: 0,
                x: -120,
                y: 30,
                rotateZ: -10,
                scale: 0.9
              }}
              animate={isInView ? {
                opacity: 1,
                x: 0,
                y: 0,
                rotateZ: -0.5,
                scale: 1
              } : {}}
              transition={{ duration: 1.1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{
                scale: 1.025,
                rotateZ: 0,
                y: -4,
                boxShadow: '0 28px 60px -10px rgba(139,92,246,0.45)',
                transition: { duration: 0.25, ease: 'easeOut' }
              }}
              className={`
                relative group ${experiences[1].cardGradient} 
                border ${experiences[1].cardBorder} rounded-[24px] sm:rounded-[28px] 
                p-5 sm:p-6 transition-all duration-300 ease-out ${experiences[1].cardShadow}
                flex items-center justify-between gap-4 cursor-pointer text-white w-full
                origin-center
              `}
            >
              {renderOriginalGridCard(experiences[1])}
            </motion.div>

            {/* SLOT 3: Tekrivo */}
            <motion.div
              initial={{
                opacity: 0,
                x: 120,
                y: 50,
                rotateZ: 10,
                scale: 0.9
              }}
              animate={isInView ? {
                opacity: 1,
                x: 0,
                y: 0,
                rotateZ: 1.5,
                scale: 1
              } : {}}
              transition={{ duration: 1.1, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{
                scale: 1.025,
                rotateZ: 0,
                y: -4,
                boxShadow: '0 28px 60px -10px rgba(124,58,237,0.45)',
                transition: { duration: 0.25, ease: 'easeOut' }
              }}
              className={`
                relative group ${experiences[2].cardGradient} 
                border ${experiences[2].cardBorder} rounded-[24px] sm:rounded-[28px] 
                p-5 sm:p-6 transition-all duration-300 ease-out ${experiences[2].cardShadow}
                flex items-center justify-between gap-4 cursor-pointer text-white w-full
                origin-bottom-right
              `}
            >
              {renderOriginalGridCard(experiences[2])}
            </motion.div>

          </div>

          {/* ── RIGHT COLUMN: Heading, Description & Download CV ── */}
          <div className="lg:col-span-5 flex flex-col items-start space-y-6 text-left">

            {/* Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/80 shadow-2xs mb-1">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider font-poppins">
                EXPERIENCE & IMPACT
              </span>
            </div>

            {/* Main Dual-Tone Poppins Headline (Exact 2-Color Style from Reference) */}
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black leading-[1.12] tracking-tight font-poppins">
              <span className="text-[#0f172a] block">Why Hire Me</span>
              <span className="text-[#0f172a]">For Your </span>
              <span className="text-[#99a1af]">Next Project?</span>
            </h2>

            {/* Description Bio */}
            <p className="text-[#475569] text-sm sm:text-base leading-relaxed font-normal font-sans">
              With over 1 year of production experience across fast-paced AI agencies, client startups, and agency environments, I specialize in translating complex ideas into high-performance, conversion-driven web applications.
            </p>

            {/* Pill Button: Download My CV */}
            <div className="pt-2">
              <motion.button
                onClick={handleDownloadCV}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="
                  inline-flex items-center gap-3 px-8 py-4 rounded-full
                  bg-gradient-to-r from-[#ef4444] via-[#f87171] to-[#dc2626] 
                  hover:from-[#dc2626] hover:to-[#b91c1c]
                  text-white font-bold text-sm tracking-wider uppercase font-poppins
                  shadow-[0_12px_28px_rgba(239,68,68,0.35)] 
                  hover:shadow-[0_16px_36px_rgba(239,68,68,0.55)]
                  transition-all duration-300 group cursor-pointer
                "
              >
                <span>Download My CV</span>
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-y-0.5 transition-transform">
                  <Download size={15} className="text-white" />
                </div>
              </motion.button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
