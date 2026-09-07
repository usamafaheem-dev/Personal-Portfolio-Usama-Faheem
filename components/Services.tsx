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
    color: 'bg-[#ffaa00]', // golden amber
  },
  {
    id: 2,
    title: 'BACKEND API',
    description: 'Creating fast &\nscalable REST APIs\nusing Node & Express.',
    icon: Server,
    color: 'bg-[#b4f34c]', // green/lime
  },
  {
    id: 3,
    title: 'FULL STACK WEB',
    description: 'Developing\nfull-stack web\napplications with\nMERN stack.',
    icon: Code,
    color: 'bg-[#f87171]', // red
  },
  {
    id: 4,
    title: 'UI TO CODE',
    description: 'Converting Figma\ndesigns into clean\npixel-perfect code.',
    icon: Smartphone,
    color: 'bg-[#56edf0]', // cyan
  },
];

const introSteps = [
  { text: 'IDEA', bg: 'bg-[#56edf0]', textColor: 'text-[#1a1a1a]', initial: { opacity: 0, x: -180, rotate: -12, scale: 0.7 } },
  { text: 'DESIGN', bg: 'bg-[#b4f34c]', textColor: 'text-[#1a1a1a]', initial: { opacity: 0, x: 180, rotate: 12, scale: 0.7 } },
  { text: 'CODE', bg: 'bg-[#ffaa00]', textColor: 'text-[#1a1a1a]', initial: { opacity: 0, y: 180, rotate: -8, scale: 0.6 } },
  { text: 'BUILD', bg: 'bg-[#ef4444]', textColor: 'text-white', initial: { opacity: 0, y: -180, rotate: 8, scale: 1.3 } },
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
      className={`relative bg-[#fbfcfb] ${showContent ? 'py-12 sm:py-16 lg:py-24' : 'py-3.5 sm:py-5 h-[270px] sm:h-[330px] md:h-[480px] lg:h-[540px]'} overflow-hidden select-none border-t border-b border-zinc-200/80 transition-all duration-450 ease-out`}
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
            className={`absolute inset-x-3.5 sm:inset-x-6 top-3.5 sm:top-5 bottom-3.5 sm:bottom-5 md:inset-x-8 md:top-8 md:bottom-8 z-50 ${currentStep.bg} flex items-center justify-center pointer-events-none overflow-hidden rounded-2xl md:rounded-3xl shadow-xl transition-colors duration-300 ease-out`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep.text}
                initial={currentStep.initial}
                animate={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7, transition: { duration: 0.22, ease: 'easeIn' } }}
                transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
                className={`text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black italic tracking-tight uppercase font-poppins ${currentStep.textColor} text-center px-4 drop-shadow-md`}
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
          <path d="M10 20 C 50 -10, 100 40, 80 80 C 70 100, 30 110, 50 120 C 60 125, 90 120, 110 100" stroke="#1a1a1a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M95 95 L 110 100 L 100 115" stroke="#1a1a1a" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
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

      <div className="max-w-[1260px] w-full flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-12 relative z-10 mx-auto px-4 sm:px-8">

        {/* Header Section */}
        <div className="lg:w-[24%] flex flex-col justify-center relative shrink-0 text-center lg:text-left mt-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={showContent ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          >
            {/* Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#ffaa00]/15 via-[#ffea00]/15 to-[#ccff00]/15 border border-[#ffaa00]/30 px-3.5 py-1 rounded-full text-xs font-bold text-amber-800 uppercase tracking-widest font-poppins shadow-2xs mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#ffaa00]" />
              <span>SERVICES</span>
            </div>

            {/* Dual-Tone Poppins Heading (Enlarged) */}
            <h2 className="text-5xl sm:text-7xl lg:text-[85px] xl:text-[90px] font-black leading-[0.88] tracking-tight uppercase font-poppins">
              <span className="text-[#0f172a] block">What</span>
              <span className="bg-gradient-to-r from-[#ffaa00] to-[#ffea00] bg-clip-text text-transparent block">I Do</span>
            </h2>
            {/* Cyan-Green ribbon gradient underline doodle */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={showContent ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-4 lg:mt-7 w-24 sm:w-32 h-2.5 bg-gradient-to-r from-[#56edf0] to-[#b4f34c] rounded-full -rotate-3 mx-auto lg:mx-0 origin-left"
            ></motion.div>

            {/* Bottom left red circle doodle - Perfect Spring Pop */}
            <div className="absolute -bottom-32 -left-10 lg:-left-20 pointer-events-none hidden md:block">
              {showContent && (
                <motion.div
                  initial={{ scale: 0, opacity: 0, rotate: -45 }}
                  animate={{ scale: 1, opacity: 1, rotate: -12 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 13, bounce: 0.65, delay: 0.2 }}
                  className="w-40 h-40 rounded-full bg-[#ef4444] text-white flex items-center justify-center font-black font-poppins text-xl tracking-wider border-4 border-[#fbfcfb] shadow-lg z-20"
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
              className="group relative flex flex-col items-center lg:items-start text-center lg:text-left p-6 sm:p-7 rounded-2xl bg-white/90 border border-zinc-200/90 shadow-xs hover:shadow-xl hover:border-zinc-300"
            >
              {/* Top Card Subtle Glow Accent on Hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-amber-50/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="relative mb-6 group-hover:scale-110 transition-transform duration-300">
                {/* Hand-drawn style circle background */}
                <div
                  className={`w-[72px] h-[72px] ${service.color} absolute -top-1 -left-2 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 mix-blend-multiply`}
                  style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }}
                ></div>
                <service.icon className="w-9 h-9 text-[#1a1a1a] relative z-10 m-4 stroke-[1.6]" />
              </div>

              <h3 className="text-[16px] xl:text-[17px] font-black font-poppins text-[#0f172a] mb-3 tracking-tight uppercase leading-snug z-10">
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
