'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { Sparkles, Download, Award, BadgeCheck } from 'lucide-react';
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
    description: 'Built React & Next.js apps, MERN APIs and responsive UI.',
    period: 'Dec 2025 – Aug 2026',
    badgeNumber: '01',
    logoSrc: '/company_icon/vertex_mark.png',
    logoAlt: 'VertexAI Tec logo',
    cardGradient: 'bg-gradient-to-r from-[#0244ad] via-[#1d4ed8] to-[#2563eb]',
    cardShadow: 'shadow-[0_20px_45px_rgba(2,68,173,0.35)]',
    cardBorder: 'border-lime-400/50',
    roleTagBg: 'bg-white/20 text-white border-white/30',
    numberColor: 'text-slate-200/75',
    accentColor: '#38bdf8',
  },
  {
    id: 'softcr8ors',
    company: 'SOFTCR8ORS',
    role: 'Frontend Developer Intern',
    description: 'Turned Figma designs into fast, responsive web pages.',
    period: 'April 2026 – July 2026',
    badgeNumber: '02',
    logoSrc: '/company_icon/softcr8ors_mark.png',
    logoAlt: 'SoftCr8ors Logo',
    cardGradient: 'bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#ec4899]',
    cardShadow: 'shadow-[0_20px_45px_rgba(139,92,246,0.35)]',
    cardBorder: 'border-lime-300/50',
    roleTagBg: 'bg-white/20 text-white border-white/30',
    numberColor: 'text-slate-200/75',
    accentColor: '#ec4899',
  },
  {
    id: 'tekrivo',
    company: 'TEKRIVO',
    role: 'Founder & Full-Stack Engineer',
    description: 'Websites and web apps for clients in Lahore & worldwide.',
    period: 'Overall 1 Year Experience',
    badgeNumber: '03',
    logoSrc: '/company_icon/tekrivo_mark.png',
    logoAlt: 'Tekrivo Logo',
    cardGradient: 'bg-gradient-to-r from-[#6d28d9] via-[#7c3aed] to-[#8b5cf6]',
    cardShadow: 'shadow-[0_20px_45px_rgba(124,58,237,0.35)]',
    cardBorder: 'border-lime-300/50',
    roleTagBg: 'bg-white/20 text-white border-white/30',
    numberColor: 'text-slate-200/75',
    accentColor: '#8b5cf6',
  },
];

interface ExperienceCert {
  id: string;
  company: string;
  title: string;
  period: string;
  logoSrc: string;
  gradientFrom: string;
  gradientTo: string;
  imageSrc?: string;
}

const experienceCerts: ExperienceCert[] = [
  {
    id: 'vertex-cert',
    company: 'VertexAI Tec',
    title: 'Experience Certificate — React/Next.js & MERN Developer',
    period: 'Dec 2025 – Aug 2026',
    logoSrc: '/company_icon/vertex_mark.png',
    gradientFrom: '#0052ff',
    gradientTo: '#38bdf8',
    imageSrc: '/Experience Certificate/Usama_Faheem_Experience_Certificate.pdf',
  },
  {
    id: 'softcr8ors-cert',
    company: 'SoftCr8ors',
    title: 'Internship Completion Certificate — Frontend Developer Intern',
    period: 'April 2026 – June 2026',
    logoSrc: '/company_icon/softcr8ors_mark.png',
    gradientFrom: '#8b5cf6',
    gradientTo: '#ec4899',
    imageSrc: '/Experience Certificate/certificate.jpeg',
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

  // ── EXPERIENCE CARD RENDERER (Original Desktop + Compact Mobile) ──
  const renderOriginalGridCard = (item: ExperienceItem) => (
    <>
      {/* Glass Gloss Overlay */}
      <div className="absolute inset-0 rounded-[18px] min-[400px]:rounded-[22px] lg:rounded-[28px] bg-gradient-to-b from-white/20 via-transparent to-black/10 pointer-events-none" />

      {/* ── 1. ORIGINAL DESKTOP VIEW (lg:flex) ── */}
      <div className="hidden lg:flex items-center justify-between gap-4 w-full relative z-10">
        {/* Left: Logo Box + Company + Role + Description */}
        <div className="flex items-center gap-5 flex-1 min-w-0">
          <div className="relative shrink-0">
            <div className="w-16 h-16 rounded-2xl bg-white shadow-[0_8px_20px_rgba(0,0,0,0.25)] p-2.5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <img
                src={item.logoSrc}
                alt={item.logoAlt}
                loading="lazy"
                className="w-full h-full object-contain drop-shadow-xs"
              />
            </div>
          </div>

          <div className="flex flex-col min-w-0 pr-2">
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold font-poppins text-lg tracking-tight text-white uppercase drop-shadow-xs truncate">
                {item.company}
              </h3>
            </div>
            <div className="mt-1">
              <span className={`inline-block text-xs font-bold font-poppins px-3 py-1 rounded-full border backdrop-blur-md ${item.roleTagBg}`}>
                {item.role}
              </span>
            </div>
            <p className="text-white/80 text-sm mt-1.5 line-clamp-1 font-normal font-sans">
              {item.description}
            </p>
          </div>
        </div>

        {/* Right: Badge Number & Period */}
        <div className="flex flex-col items-end shrink-0 pl-2">
          <span className={`font-bold font-poppins text-3xl tracking-tight ${item.numberColor}`}>
            {item.badgeNumber}
          </span>
          <span className="text-xs text-white/70 font-semibold font-sans whitespace-nowrap mt-1">
            {item.period}
          </span>
        </div>
      </div>

      {/* ── 2. COMPACT MOBILE VIEW (flex lg:hidden) ── */}
      <div className="flex lg:hidden flex-col w-full gap-2 relative z-10">
        {/* Top Bar: Icon + Company Name (Left) & Badge Number + Period (Right) */}
        <div className="flex items-center justify-between gap-3 w-full">
          {/* Left: Icon + Company */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 min-[400px]:w-10 min-[400px]:h-10 rounded-xl bg-white shadow-md p-1.5 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
              <img
                src={item.logoSrc}
                alt={item.logoAlt}
                loading="lazy"
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="font-extrabold font-poppins text-xs sm:text-sm tracking-wide text-white uppercase drop-shadow-xs truncate">
              {item.company}
            </h3>
          </div>

          {/* Right: Badge Number & Period */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] sm:text-xs text-white/80 font-medium font-sans whitespace-nowrap hidden min-[380px]:inline-block">
              {item.period}
            </span>
            <span className={`font-extrabold font-poppins text-base sm:text-xl tracking-tight ${item.numberColor}`}>
              {item.badgeNumber}
            </span>
          </div>
        </div>

        {/* Bottom Bar: Marquee Role Badge */}
        <div className="flex items-center justify-between gap-2 w-full pt-0.5">
          <div className={`overflow-hidden max-w-[185px] min-[380px]:max-w-[220px] sm:max-w-[320px] text-[10px] sm:text-xs font-bold font-poppins px-2.5 py-0.5 rounded-full border backdrop-blur-md whitespace-nowrap ${item.roleTagBg}`}>
            <motion.div
              animate={{ x: ['0%', '-50%'] }}
              transition={{ repeat: Infinity, duration: 9, ease: 'linear' }}
              className="inline-flex items-center gap-3 whitespace-nowrap pr-3 transform-gpu"
            >
              <span>{item.role}</span>
              <span className="text-white/40 text-[7px]">●</span>
              <span>{item.role}</span>
              <span className="text-white/40 text-[7px]">●</span>
            </motion.div>
          </div>
          <span className="text-[10px] text-white/80 font-medium font-sans whitespace-nowrap inline-block min-[380px]:hidden">
            {item.period}
          </span>
        </div>
      </div>
    </>
  );

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative bg-[#ededf0] py-8 sm:py-12 lg:py-14 overflow-hidden font-sans text-[#0f172a] border-t border-b border-slate-200/80 min-h-[500px]"
    >
      {/* ── Precision Dotted Grid Background Pattern ── */}
      <div className="absolute inset-0 bg-[radial-gradient(#99a1af_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-45 pointer-events-none [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_60%,transparent_100%)]" />

      {/* ── Background Subtle Glow Gradients ── */}
      <div className="absolute top-1/4 -left-40 w-72 sm:w-96 h-72 sm:h-96 bg-lime-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 sm:w-96 h-72 sm:h-96 bg-lime-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* ── Decorative Corner Lines ── */}
      <div className="absolute bottom-0 right-0 w-60 sm:w-80 h-60 sm:h-80 pointer-events-none opacity-40 overflow-hidden">
        <svg
          aria-hidden="true"
          viewBox="0 0 300 300"
          className="w-full h-full text-slate-300"
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

      <div className="mx-auto max-w-[1360px] px-4 sm:px-8 lg:px-12 relative z-10">

        {/* ══════════════════════════════════════════════════════════════
            EXPERIENCE GRID (Responsive 2-Column Layout)
           ══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 xl:gap-20 items-center">

          {/* ── LEFT COLUMN: 3 Experience Cards ── */}
          <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-6 lg:gap-7 relative py-2 order-2 lg:order-1">

            {/* Top Header */}
            <div className="mb-1 text-center lg:text-left">
              <span className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider font-poppins">
                Career Milestones & Roles
              </span>
            </div>

            {/* SLOT 1: VertexAi Tec */}
            <motion.div
              initial={{ opacity: 0, y: 25, x: 20, rotateZ: 2, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, x: 0, rotateZ: -1.5, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{
                scale: 1.02,
                rotateZ: 0,
                y: -3,
                boxShadow: '0 20px 45px -10px rgba(2,68,173,0.45)',
                transition: { duration: 0.2, ease: 'easeOut' }
              }}
              className={`
                relative group ${experiences[0].cardGradient} 
                border ${experiences[0].cardBorder} rounded-[18px] min-[400px]:rounded-[22px] lg:rounded-[28px] 
                p-3.5 min-[400px]:p-4 lg:p-6 transition-all duration-300 ease-out ${experiences[0].cardShadow}
                flex flex-col cursor-pointer text-white w-full
                origin-top-left transform-gpu
              `}
            >
              {renderOriginalGridCard(experiences[0])}
            </motion.div>

            {/* SLOT 2: SoftCr8ors */}
            <motion.div
              initial={{ opacity: 0, y: 25, x: -20, rotateZ: -3, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, x: 0, rotateZ: -0.5, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{
                scale: 1.02,
                rotateZ: 0,
                y: -3,
                boxShadow: '0 20px 45px -10px rgba(139,92,246,0.45)',
                transition: { duration: 0.2, ease: 'easeOut' }
              }}
              className={`
                relative group ${experiences[1].cardGradient} 
                border ${experiences[1].cardBorder} rounded-[18px] min-[400px]:rounded-[22px] lg:rounded-[28px] 
                p-3.5 min-[400px]:p-4 lg:p-6 transition-all duration-300 ease-out ${experiences[1].cardShadow}
                flex flex-col cursor-pointer text-white w-full
                origin-center transform-gpu
              `}
            >
              {renderOriginalGridCard(experiences[1])}
            </motion.div>

            {/* SLOT 3: Tekrivo */}
            <motion.div
              initial={{ opacity: 0, y: 25, x: 20, rotateZ: 3, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, x: 0, rotateZ: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{
                scale: 1.02,
                rotateZ: 0,
                y: -3,
                boxShadow: '0 20px 45px -10px rgba(124,58,237,0.45)',
                transition: { duration: 0.2, ease: 'easeOut' }
              }}
              className={`
                relative group ${experiences[2].cardGradient} 
                border ${experiences[2].cardBorder} rounded-[18px] min-[400px]:rounded-[22px] lg:rounded-[28px] 
                p-3.5 min-[400px]:p-4 lg:p-6 transition-all duration-300 ease-out ${experiences[2].cardShadow}
                flex flex-col cursor-pointer text-white w-full
                origin-bottom-right transform-gpu
              `}
            >
              {renderOriginalGridCard(experiences[2])}
            </motion.div>

          </div>

          {/* ── RIGHT COLUMN: Heading, Description & Download CV ── */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-center lg:items-start space-y-5 sm:space-y-6 text-center lg:text-left order-1 lg:order-2"
          >

            {/* 🌟 Stylish Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 bg-[#d8ff00] border-2 border-black px-3.5 py-1 rounded-full shadow-sm self-center lg:self-start">
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span style={{ fontFamily: 'var(--font-caveat), cursive' }} className="text-base font-bold text-black font-caveat">Experience & Impact</span>
            </div>

            {/* Main Dual-Tone Poppins Headline */}
            <h2 className="text-2xl min-[380px]:text-3xl sm:text-4xl lg:text-[46px] font-extrabold leading-[1.15] sm:leading-[1.12] tracking-tight font-poppins">
              <span className="text-[#0f172a] block">Why Hire Me</span>
              <span className="text-[#0f172a]">For Your </span>
              <span className="text-[#0052ff]">Next Project?</span>
            </h2>

            {/* Description Bio */}
            <p className="text-[#475569] text-xs min-[380px]:text-sm sm:text-base leading-[1.75] sm:leading-[1.8] font-normal font-sans max-w-[600px] lg:max-w-none">
              I have <strong className="font-semibold text-slate-900">1 year</strong> of real work experience as a MERN Stack and Frontend Developer in Lahore. I have worked with VertexAI Tec and SoftCr8ors, and I run my own studio, Tekrivo. I build fast, clean and mobile-friendly websites that help businesses get more clients.
            </p>

            {/* Pill Button: Download My CV (primary action = blue) */}
            <div className="pt-1">
              <motion.button
                onClick={handleDownloadCV}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="
                  inline-flex items-center gap-2.5 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full
                  bg-[#0052ff] hover:bg-[#003fcc]
                  text-white font-extrabold text-xs sm:text-[13px] tracking-wider uppercase font-poppins
                  shadow-[0_8px_20px_rgba(0,82,255,0.35)] 
                  hover:shadow-[0_12px_26px_rgba(0,82,255,0.55)]
                  transition-all duration-300 group cursor-pointer border border-[#0052ff]/40
                "
              >
                <span>Download My CV</span>
                <div className="w-6 h-6 rounded-full bg-[#d8ff00] flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                  <Download size={13} className="text-[#171712] group-hover:translate-y-0.5 transition-all duration-300 stroke-[2.2]" />
                </div>
              </motion.button>
            </div>

          </motion.div>

        </div>

        {/* ══════════════════════════════════════════════════════════════
            EXPERIENCE CERTIFICATES (Placeholder Cards)
           ══════════════════════════════════════════════════════════════ */}
        <div className="mt-8 sm:mt-12 lg:mt-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-8 sm:mb-10"
          >
            <div className="inline-flex items-center gap-2 bg-[#d8ff00] border-2 border-black px-3.5 py-1 rounded-full shadow-sm mb-4">
              <Award className="w-3.5 h-3.5 text-black" />
              <span style={{ fontFamily: 'var(--font-caveat), cursive' }} className="text-base font-bold text-black font-caveat">Work Certificates</span>
            </div>
            <h3 className="text-xl min-[380px]:text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-poppins text-[#0f172a]">
              Experience <span className="text-[#0052ff]">Certificates</span>
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 max-w-3xl mx-auto">
            {experienceCerts.map((cert, i) => (
              <motion.a
                key={cert.id}
                href={cert.imageSrc}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.25 } }}
                className="relative group rounded-[22px] sm:rounded-[26px] bg-white p-[2.5px] pb-3.5 sm:pb-4 overflow-hidden cursor-pointer transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] block transform-gpu"
              >
                {/* Animated border beam & bottom shelf on hover */}
                <div className="absolute inset-0 rounded-[22px] sm:rounded-[26px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden">
                  <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(to bottom, transparent 35%, ${cert.gradientFrom} 75%, ${cert.gradientTo} 100%)` }}
                  />
                  <div
                    className="absolute inset-[-150%] group-hover:animate-[spin_2s_linear_infinite] transform-gpu"
                    style={{ background: `conic-gradient(from 0deg, transparent 0 170deg, ${cert.gradientFrom} 230deg, ${cert.gradientTo} 310deg, transparent 360deg)` }}
                  />
                </div>

                {/* Static border */}
                <div className="absolute inset-0 rounded-[22px] sm:rounded-[26px] border-2 border-slate-200/70 pointer-events-none group-hover:opacity-0 transition-opacity duration-300" />

                {/* Card body */}
                <div className="relative w-full rounded-[20px] sm:rounded-[24px] bg-white p-4 sm:p-5 z-10">
                  {/* Top row: logo + company */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-slate-50 border border-slate-100 p-1.5 flex items-center justify-center shrink-0">
                      <Image src={cert.logoSrc} alt={cert.company} width={44} height={44} loading="lazy" className="w-full h-full object-contain" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-extrabold font-poppins text-sm sm:text-[15px] text-slate-900 uppercase tracking-tight truncate">{cert.company}</h4>
                      <p className="text-[10px] sm:text-xs text-slate-500 font-medium">{cert.period}</p>
                    </div>
                    <div className="ml-auto shrink-0">
                      <BadgeCheck className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: cert.gradientFrom }} />
                    </div>
                  </div>

                  {/* Certificate preview */}
                  {cert.imageSrc?.endsWith('.pdf') ? (
                    <div className="relative w-full h-[180px] xs:h-[200px] sm:h-[220px] rounded-xl bg-slate-50 border border-slate-100 overflow-hidden group-hover:border-slate-200 transition-colors">
                      <iframe src={`${cert.imageSrc}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`} title={cert.title} className="w-full h-[500px] pointer-events-none select-none origin-top-left scale-[0.45] sm:scale-[0.5]" style={{ width: '220%', height: '500px' }} tabIndex={-1} />
                      <div className="absolute inset-0 bg-transparent group-hover:bg-black/5 transition-colors" />
                    </div>
                  ) : cert.imageSrc ? (
                    <div className="relative w-full h-[180px] xs:h-[200px] sm:h-[220px] rounded-xl bg-slate-50 border border-slate-100 overflow-hidden flex items-center justify-center p-2 group-hover:border-slate-200 transition-colors">
                      <Image src={cert.imageSrc} alt={cert.title} fill loading="lazy" sizes="(max-width: 640px) 100vw, 50vw" className="object-contain rounded-lg transition-transform duration-500 group-hover:scale-105" />
                    </div>
                  ) : null}

                  {/* Certificate title */}
                  <p className="mt-3 text-xs sm:text-[13px] font-semibold text-slate-700 leading-snug line-clamp-2 min-h-[34px] sm:min-h-[38px] flex items-center">
                    {cert.title}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
