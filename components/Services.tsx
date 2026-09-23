'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Monitor, Smartphone, Server, Code, Sparkles } from 'lucide-react';
import usePageReady from './usePageReady';

const services = [
  {
    id: 1,
    title: 'FRONTEND DEV',
    description: 'Building modern &\nresponsive web UIs\nwith React & Next.js.',
    icon: Monitor,
    color: 'bg-[#0052ff]', // Blue
    iconColor: 'text-white',
    hoverGlow: 'from-blue-500/25 via-blue-500/10',
    hoverBorder: 'hover:border-blue-400',
  },
  {
    id: 2,
    title: 'BACKEND API',
    description: 'Creating fast &\nscalable REST APIs\nusing Node & Express.',
    icon: Server,
    color: 'bg-[#d8ff00]', // Lime
    iconColor: 'text-[#171712]',
    hoverGlow: 'from-[#d8ff00]/55 via-[#d8ff00]/20',
    hoverBorder: 'hover:border-lime-500',
  },
  {
    id: 3,
    title: 'FULL STACK WEB',
    description: 'Developing\nfull-stack web\napplications with\nMERN stack.',
    icon: Code,
    color: 'bg-[#10121a]', // Black
    iconColor: 'text-white',
    hoverGlow: 'from-slate-600/22 via-slate-500/8',
    hoverBorder: 'hover:border-slate-500',
  },
  {
    id: 4,
    title: 'UI TO CODE',
    description: 'Converting Figma\ndesigns into clean\npixel-perfect code.',
    icon: Smartphone,
    color: 'bg-[#00d5b5]', // Lime + Blue mix (Electric Mint / Teal)
    iconColor: 'text-white',
    hoverGlow: 'from-[#00d5b5]/35 via-[#00d5b5]/15',
    hoverBorder: 'hover:border-teal-400',
  },
];

const introSteps = [
  { text: 'IDEA', bg: 'bg-[#0052ff]', textColor: 'text-white', initial: { opacity: 0, x: -180, rotate: -12, scale: 0.7 } },
  { text: 'DESIGN', bg: 'bg-[#10121a]', textColor: 'text-white', initial: { opacity: 0, x: 180, rotate: 12, scale: 0.7 } },
  { text: 'CODE', bg: 'bg-[#00d5b5]', textColor: 'text-[#10121a]', initial: { opacity: 0, y: 180, rotate: -8, scale: 0.6 } },
  { text: 'BUILD', bg: 'bg-[#d8ff00]', textColor: 'text-[#171712]', initial: { opacity: 0, y: -180, rotate: 8, scale: 1.3 } },
];

export default function Services() {
  const isPageReady = usePageReady();
  const sectionRef = useRef<HTMLElement>(null);
  // Trigger ONLY when the section reaches the center of the viewport
  const inView = useInView(sectionRef, { once: true, margin: '-30% 0px -30% 0px' });
  const isInView = isPageReady && inView;
  const hasTriggeredRef = useRef(false);

  // Animation states: 'idle' | 'fullscreen' | 'shrinking' | 'done'
  const [animStage, setAnimStage] = useState<'idle' | 'fullscreen' | 'shrinking' | 'done'>('idle');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    if (isInView && !hasTriggeredRef.current) {
      hasTriggeredRef.current = true;
      setAnimStage('fullscreen');

      // Relaxed & smooth word cycle (680ms per step)
      let step = 0;
      const interval = setInterval(() => {
        step++;
        if (step < introSteps.length) {
          setCurrentWordIndex(step);
        } else {
          clearInterval(interval);
          // Pause smoothly on BUILD, then shrink gracefully to reveal section
          setTimeout(() => {
            setAnimStage('shrinking');
            setTimeout(() => {
              setAnimStage('done');
            }, 450);
          }, 320);
        }
      }, 680);
    }
  }, [isInView]);

  const showContent = animStage === 'shrinking' || animStage === 'done';
  const currentStep = introSteps[currentWordIndex];

  return (
    <section
      id="services"
      ref={sectionRef}
      className={`relative bg-[#ededf0] ${showContent ? 'pt-8 sm:pt-12 lg:pt-14 pb-32 sm:pb-36 lg:pb-40' : 'py-3.5 sm:py-5 h-[270px] sm:h-[330px] md:h-[480px] lg:h-[540px]'} overflow-hidden border-t border-b border-slate-200/80 transition-all duration-450 ease-out`}
    >
      {/* ── Precision Dotted Grid Background Pattern ── */}
      <div className="absolute inset-0 bg-[radial-gradient(#99a1af_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-45 pointer-events-none [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_60%,transparent_100%)]" />

      {/* ── 1. Dynamic Colorful Section Intro Overlay ── */}
      <AnimatePresence>
        {animStage === 'fullscreen' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0, originX: 0.1, originY: 0.85 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute inset-x-3.5 sm:inset-x-6 top-3.5 sm:top-5 bottom-3.5 sm:bottom-5 md:inset-x-8 md:top-8 md:bottom-8 z-30 ${currentStep.bg} flex items-center justify-center pointer-events-none overflow-hidden rounded-2xl md:rounded-3xl shadow-xl transition-colors duration-300 ease-out`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep.text}
                initial={currentStep.initial}
                animate={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7, transition: { duration: 0.22, ease: 'easeIn' } }}
                transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
                className={`text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold italic tracking-tight uppercase font-poppins ${currentStep.textColor} text-center px-4 drop-shadow-md`}
              >
                {currentStep.text}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Arrow Doodle - Drop down into position after red intro */}
      <motion.div
        initial={{ opacity: 0, y: -100, rotate: -25 }}
        animate={showContent ? { opacity: 0.8, y: 0, rotate: 0 } : { opacity: 0, y: -100 }}
        transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1], delay: 0.3 }}
        className="absolute top-12 right-12 lg:right-24 pointer-events-none hidden md:block"
      >
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 20 C 50 -10, 100 40, 80 80 C 70 100, 30 110, 50 120 C 60 125, 90 120, 110 100" stroke="#0f172a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M95 95 L 110 100 L 100 115" stroke="#0f172a" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>

      {/* Decorative Star Doodle - Continuous Infinite Rotation */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-12 right-12 lg:right-32 pointer-events-none opacity-80 hidden md:block text-[#60a5fa]"
      >
        <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="2" x2="12" y2="22"></line>
          <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <line x1="4.93" y1="19.07" x2="19.07" y2="4.93"></line>
        </svg>
      </motion.div>

      {/* ── Floating 3D Isometric Cube 1 (Brand Lime & Slate) ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={showContent ? {
          opacity: 0.95,
          scale: 1,
          y: [0, -18, 0],
          rotate: [-5, 7, -5],
        } : { opacity: 0, scale: 0.6 }}
        transition={{
          opacity: { duration: 0.8, delay: 0.4 },
          scale: { duration: 0.8, delay: 0.4 },
          y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
          rotate: { duration: 6.5, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="absolute top-10 sm:top-12 right-6 sm:right-16 lg:right-28 pointer-events-none z-0 drop-shadow-[0_16px_28px_rgba(216,255,0,0.3)] hidden sm:block"
      >
        <svg width="68" height="78" viewBox="0 0 68 78" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Top Face (Bright Lime) */}
          <polygon points="34,2 66,20 34,38 2,20" fill="#d8ff00" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
          {/* Left Face (Deep Slate/Black) */}
          <polygon points="2,20 34,38 34,74 2,56" fill="#18181b" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
          {/* Right Face (Muted Citrus Lime) */}
          <polygon points="34,38 66,20 66,56 34,74" fill="#a3d600" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
          <line x1="34" y1="38" x2="34" y2="74" stroke="#0f172a" strokeWidth="2.5" />
        </svg>
      </motion.div>

      {/* ── Floating 3D Isometric Cube 2 (Brand Blue & Sky) ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={showContent ? {
          opacity: 0.85,
          scale: 1,
          y: [0, 16, 0],
          rotate: [6, -8, 6],
        } : { opacity: 0, scale: 0.5 }}
        transition={{
          opacity: { duration: 0.8, delay: 0.6 },
          scale: { duration: 0.8, delay: 0.6 },
          y: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 },
          rotate: { duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 },
        }}
        className="absolute bottom-16 sm:bottom-24 left-[24%] sm:left-[30%] pointer-events-none z-0 drop-shadow-[0_14px_22px_rgba(0,82,255,0.25)] hidden md:block"
      >
        <svg width="52" height="60" viewBox="0 0 68 78" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Top Face (Sky Blue) */}
          <polygon points="34,2 66,20 34,38 2,20" fill="#60a5fa" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
          {/* Left Face (Brand Blue) */}
          <polygon points="2,20 34,38 34,74 2,56" fill="#0052ff" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
          {/* Right Face (Deep Navy) */}
          <polygon points="34,38 66,20 66,56 34,74" fill="#072266" stroke="#0f172a" strokeWidth="2.5" strokeLinejoin="round" />
          <line x1="34" y1="38" x2="34" y2="74" stroke="#0f172a" strokeWidth="2.5" />
        </svg>
      </motion.div>

      {/* ── Floating Tech Dot Clusters in Background ── */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-24 right-4 lg:right-10 pointer-events-none hidden sm:grid grid-cols-4 gap-2.5 opacity-30 z-0"
      >
        {[...Array(12)].map((_, i) => (
          <span key={i} className="w-1.5 h-1.5 rounded-full bg-slate-600" />
        ))}
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute bottom-12 left-6 lg:left-12 pointer-events-none hidden sm:grid grid-cols-3 gap-2 opacity-35 z-0"
      >
        {[...Array(9)].map((_, i) => (
          <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#0052ff]" />
        ))}
      </motion.div>

      <div className="max-w-[1260px] w-full flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-12 relative z-10 mx-auto px-4 sm:px-8">

        {/* Header Section */}
        <div className="lg:w-[24%] flex flex-col justify-center relative shrink-0 text-center lg:text-left mt-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={showContent ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          >
            {/* Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 bg-[#d8ff00] border-2 border-black px-3.5 py-1 rounded-full shadow-sm mb-4">
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span style={{ fontFamily: 'var(--font-caveat), cursive' }} className="text-base font-bold text-black font-caveat">Services</span>
            </div>

            {/* Dual-Tone Poppins Heading (Enlarged) */}
            <h2 className="text-5xl sm:text-7xl lg:text-[85px] xl:text-[90px] font-extrabold leading-[0.88] tracking-tight uppercase font-poppins">
              <span className="text-[#0f172a] block">What</span>
              <span className="text-[#0052ff] block">I Do</span>
            </h2>
            {/* Blue ribbon underline doodle */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={showContent ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-4 lg:mt-7 w-24 sm:w-32 h-2.5 bg-[#0052ff] rounded-full -rotate-3 mx-auto lg:mx-0 origin-left"
            ></motion.div>

            {/* Bottom left lime circle doodle - Perfect Spring Pop */}
            <div className="absolute -bottom-28 lg:-bottom-32 -left-10 lg:-left-20 pointer-events-none hidden md:block">
              {showContent && (
                <motion.div
                  initial={{ scale: 0, opacity: 0, rotate: -45 }}
                  animate={{ scale: 1, opacity: 1, rotate: -12 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 13, bounce: 0.65, delay: 0.2 }}
                  className="w-40 h-40 rounded-full bg-[#d8ff00] text-[#171712] flex items-center justify-center font-extrabold font-poppins text-xl tracking-wider border-4 border-[#ededf0] shadow-[0_12px_32px_rgba(216,255,0,0.45)] z-20"
                >
                  BUILD
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Services Cards Grid with Interactive Hover & Spring Bounce Drop */}
        <motion.div
          className="lg:w-[76%] w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-5"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 35, scale: 0.96 }}
              animate={showContent ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 35, scale: 0.96 }}
              transition={showContent ? {
                duration: 0.55,
                ease: [0.16, 1, 0.3, 1],
                delay: index * 0.08,
              } : { duration: 0 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`group relative flex flex-col items-center lg:items-start text-center lg:text-left p-6 sm:p-7 rounded-2xl bg-white/90 border border-slate-200/90 shadow-xs hover:shadow-xl ${service.hoverBorder || 'hover:border-slate-300'}`}
            >
              {/* Top Card Subtle Color Accent (Visible normally like hover state) */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-b ${service.hoverGlow || 'from-lime-50/30'} via-transparent to-transparent opacity-100 pointer-events-none`} />

              {/* Corner Accent Pulse Dot */}
              <div className="absolute top-4 sm:top-5 right-4 sm:right-5 flex items-center justify-center pointer-events-none z-10">
                <span className="relative flex h-2.5 w-2.5">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${service.color} opacity-40`} style={{ animationDuration: '3s' }} />
                  <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${service.color} shadow-xs`} />
                </span>
              </div>

              <div className="relative mb-6 group-hover:scale-110 transition-transform duration-300">
                {/* Hand-drawn style circle background */}
                <div
                  className={`w-[72px] h-[72px] ${service.color} absolute -top-1 -left-2 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 shadow-sm`}
                  style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }}
                ></div>
                <service.icon className={`w-9 h-9 ${service.iconColor} relative z-10 m-4 stroke-[1.8]`} />
              </div>

              <h3 className="text-[16px] xl:text-[17px] font-extrabold font-poppins text-[#0f172a] mb-3 tracking-tight uppercase leading-snug z-10">
                {service.title}
              </h3>

              <p className="text-[14px] xl:text-[14.5px] text-[#475569] leading-relaxed font-normal font-sans whitespace-pre-line z-10">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
