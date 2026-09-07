'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Hand } from 'lucide-react';

const SLAT_ROWS = [0, 1, 2, 3, 4, 5, 6, 7];

export default function Preloader() {
  const [stage, setStage] = useState<'entering' | 'exiting' | 'removed'>('entering');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        window.history.scrollRestoration = 'manual';
      } catch {}
      window.scrollTo(0, 0);
      (window as any).__preloaderDone = false;
    }
    document.body.style.overflow = 'hidden';

    // 1. At 3.5s: Start tile exit animation
    const exitTimer = setTimeout(() => {
      setStage('exiting');
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('preloaderExiting'));
      }
    }, 3500);

    // 2. At 4.0s: Dispatch preloaderComplete so website components mount fresh as doors slice open
    const completeTimer = setTimeout(() => {
      if (typeof window !== 'undefined') {
        (window as any).__preloaderDone = true;
        window.dispatchEvent(new CustomEvent('preloaderComplete'));
      }
    }, 4000);

    // 3. Unmount preloader div at 5.4s (giving full 1.9s for mobile GPU exit animation)
    const removeTimer = setTimeout(() => {
      setStage('removed');
      document.body.style.overflow = '';
    }, 5400);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
      clearTimeout(removeTimer);
      document.body.style.overflow = '';
    };
  }, []);

  if (stage === 'removed') return null;

  const isExiting = stage === 'exiting';

  return (
    <div className="fixed inset-0 z-[99999] pointer-events-auto select-none overflow-hidden font-poppins bg-transparent">
      {/* ══════════════════════════════════════════════════════════
          STAGGERED HORIZONTAL LIGHT GREY TILE SLAT DOORS (GPU Accelerated for Mobile)
          8 Horizontal rows splitting cleanly at exact 50% X axis across all viewports
         ══════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {SLAT_ROWS.map((row) => (
          <div
            key={`slat-row-${row}`}
            className="absolute left-0 w-full"
            style={{
              top: `${row * 12.5}vh`,
              height: '12.55vh',
            }}
          >
            {/* Left Tile Slat (0% to 50% Center, GPU Hardware Accelerated) */}
            <motion.div
              initial={{ x: '0%' }}
              animate={{ x: isExiting ? '-105%' : '0%' }}
              transition={{
                duration: 1.25,
                delay: isExiting ? row * 0.06 : 0,
                ease: [0.76, 0, 0.24, 1],
              }}
              className="absolute top-0 left-0 w-[50.15vw] h-full bg-[#eae9e5] border-b border-black/5 will-change-transform transform-gpu shadow-sm"
            />

            {/* Right Tile Slat (50% Center to 100%, GPU Hardware Accelerated) */}
            <motion.div
              initial={{ x: '0%' }}
              animate={{ x: isExiting ? '105%' : '0%' }}
              transition={{
                duration: 1.25,
                delay: isExiting ? row * 0.06 : 0,
                ease: [0.76, 0, 0.24, 1],
              }}
              className="absolute top-0 right-0 w-[50.15vw] h-full bg-[#eae9e5] border-b border-black/5 will-change-transform transform-gpu shadow-sm"
            />
          </div>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════
          MAIN HIGH-FASHION EDITORIAL INTRO CONTENT (Mobile Responsive)
         ══════════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: isExiting ? 0 : 1, scale: isExiting ? 0.94 : 1 }}
        transition={{ duration: 0.45, ease: 'easeInOut' }}
        className="relative z-20 w-full h-full flex flex-col justify-center items-center p-3 sm:p-12 md:p-16"
      >
        {/* ── Center Composition: SOFTWARE (Left) ➔ ENGINEER (Right) ➔ PORTRAIT CARD (Top Drop) ── */}
        <div className="w-full max-w-[1020px] mx-auto flex flex-col md:flex-row items-center justify-center relative gap-2 sm:gap-4 lg:gap-6 px-2 sm:px-4">
          
          {/* STEP 1: SOFTWARE TEXT */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="z-10 flex flex-col items-center md:items-start md:mt-8 lg:mt-10"
          >
            {/* Name placed directly above SOFTWARE text */}
            <span className="text-[10px] xs:text-xs sm:text-sm font-extrabold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#1c1c1c] mb-0.5 sm:mb-1 font-poppins text-center md:text-left">
              USAMA FAHEEM
            </span>

            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-[68px] lg:text-[88px] xl:text-[98px] font-extrabold uppercase text-[#222222] tracking-tight leading-none select-none font-poppins whitespace-nowrap">
              SOFTWARE
            </h1>
          </motion.div>

          {/* STEP 3: CENTER PORTRAIT CARD */}
          <motion.div
            initial={{ opacity: 0, y: -200, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.3, delay: 1.4, ease: [0.34, 1.25, 0.64, 1] }}
            className="relative z-20 my-2 sm:my-4 md:my-0 flex-shrink-0 mx-1 sm:mx-4"
          >
            <div className="relative w-[170px] xs:w-[210px] sm:w-[270px] md:w-[320px] lg:w-[370px] h-[210px] xs:h-[260px] sm:h-[340px] md:h-[400px] lg:h-[470px] rounded-[14px] xs:rounded-[16px] sm:rounded-[20px] md:rounded-[22px] bg-[#d5d4cf] border-2 border-black/10 shadow-[0_20px_50px_rgba(0,0,0,0.22)] overflow-hidden group">
              {/* Usama Portrait Photo */}
              <img
                src="/Man_looking_back_over_shoulder_202608131928 copy.jpeg"
                alt="Usama Faheem Portrait"
                className="w-full h-full object-cover object-[center_top] filter contrast-105 group-hover:scale-105 transition-all duration-500"
              />
            </div>

            {/* STEP 4: Floating Blue Hand Wave Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 2.2, type: 'spring' }}
              className="absolute -bottom-3 -left-3 xs:-bottom-4 xs:-left-4 sm:-bottom-6 sm:-left-6 z-30 w-12 h-12 xs:w-15 xs:h-15 sm:w-20 sm:h-20 rounded-full bg-[#3b52f6] text-white flex items-center justify-center shadow-2xl shadow-blue-600/45 border-2 xs:border-4 border-white cursor-pointer hover:scale-110 transition-transform"
            >
              <Hand className="w-5 h-5 xs:w-7 xs:h-7 sm:w-10 sm:h-10 animate-[bounce_2s_infinite]" />
            </motion.div>
          </motion.div>

          {/* STEP 2: ENGINEER TEXT */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="z-10 flex flex-col items-center md:items-start md:-mt-8 lg:-mt-10"
          >
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-[68px] lg:text-[88px] xl:text-[98px] font-extrabold uppercase text-[#222222] tracking-tight leading-none select-none font-poppins whitespace-nowrap">
              ENGINEER
            </h1>
            
            {/* Sub-caption under ENGINEER */}
            <p className="mt-2 sm:mt-4 max-w-[220px] xs:max-w-[250px] sm:max-w-[290px] text-[11px] xs:text-xs sm:text-sm text-slate-600 font-medium leading-relaxed font-sans text-center md:text-left">
              I accelerate business growth through digital demand generation.
            </p>
          </motion.div>

        </div>

      </motion.div>
    </div>
  );
}
