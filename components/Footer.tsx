'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Heart, Sparkles, MessageSquare } from 'lucide-react';

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);

  // Pupil offsets for mouse tracking
  const [leftPupilPos, setLeftPupilPos] = useState({ x: 0, y: 0 });
  const [rightPupilPos, setRightPupilPos] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);

  // Calculate mouse gaze angle and offset relative to eye centers
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const calcPupil = (eyeEl: HTMLDivElement | null) => {
        if (!eyeEl) return { x: 0, y: 0 };
        const rect = eyeEl.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;

        const deltaX = e.clientX - eyeCenterX;
        const deltaY = e.clientY - eyeCenterY;
        const angle = Math.atan2(deltaY, deltaX);
        const distance = Math.min(26, Math.hypot(deltaX, deltaY) / 14);

        return {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
        };
      };

      setLeftPupilPos(calcPupil(leftEyeRef.current));
      setRightPupilPos(calcPupil(rightEyeRef.current));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Natural spontaneous blinking loop
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 180);
    }, 4500);

    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <footer
      ref={containerRef}
      className="relative bg-[#eae9e5] text-slate-900 pt-16 sm:pt-24 lg:pt-32 overflow-hidden select-none"
    >
      {/* ── Ambient Background Pattern ── */}
      <div className="absolute inset-0 bg-[radial-gradient(#99a1af_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-35 pointer-events-none" />

      {/* ── Top Header with Hand-Drawn Circled "DON'T" ── */}
      <div className="mx-auto max-w-[1420px] w-full px-4 sm:px-8 relative z-10 text-center">
        
        {/* Floating Pill Badges */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 mb-8 flex-wrap">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="px-4 py-1.5 rounded-full bg-[#f03e1e] text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-red-500/20"
          >
            Available Now
          </motion.div>
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
            className="px-4 py-1.5 rounded-full bg-[#f03e1e] text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-red-500/20"
          >
            Worldwide Remote
          </motion.div>
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
            className="px-4 py-1.5 rounded-full bg-[#f03e1e] text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-red-500/20"
          >
            Say Hello ↗
          </motion.div>
        </div>

        {/* Stacked Typographic Statement */}
        <div className="inline-block relative">
          
          {/* Circled "DON'T" with SVG Hand-Drawn Oval Sketch */}
          <div className="relative inline-block">
            <span className="text-4xl xs:text-5xl sm:text-7xl lg:text-[86px] font-black font-sans tracking-tight text-slate-950 uppercase leading-none px-4 sm:px-6">
              DON&apos;T
            </span>
            {/* Hand-Drawn Sketchy Circle Stroke */}
            <svg
              className="absolute -inset-2 sm:-inset-4 w-[calc(100%+16px)] sm:w-[calc(100%+32px)] h-[calc(100%+16px)] sm:h-[calc(100%+32px)] pointer-events-none text-slate-800"
              viewBox="0 0 200 90"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M10,48 C14,18 70,8 140,12 C185,15 194,40 188,62 C180,82 120,86 50,82 C16,80 6,60 12,42 C16,28 45,15 90,13"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-75"
              />
            </svg>
          </div>

          <h2 className="text-4xl xs:text-5xl sm:text-7xl lg:text-[86px] font-black font-sans tracking-tight text-slate-950 uppercase leading-[0.9] mt-1 sm:mt-2">
            HESITATE<br />
            TO REACH<br />
            OUT!
          </h2>
        </div>

      </div>

      {/* ── Giant Red/Orange Curved Arch Hill with Interactive Cartoon Eyes ── */}
      <div className="relative w-full mt-10 sm:mt-14 pt-16 sm:pt-24 pb-12 sm:pb-16 bg-[#f03e1e] rounded-t-[100px] xs:rounded-t-[140px] sm:rounded-t-[220px] lg:rounded-t-[300px] shadow-[0_-15px_50px_rgba(240,62,30,0.25)] text-white overflow-hidden">
        
        {/* Subtle Arch Ambient Shading */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/15 pointer-events-none" />

        {/* ── TWO INTERACTIVE EYES ── */}
        <div className="flex items-center justify-center gap-4 sm:gap-7 relative z-20 mb-10 sm:mb-14">
          
          {/* Left Eye */}
          <div
            ref={leftEyeRef}
            className={`relative w-20 h-28 xs:w-24 xs:h-34 sm:w-32 sm:h-44 lg:w-40 lg:h-54 rounded-full bg-white shadow-[inset_0_4px_12px_rgba(0,0,0,0.15)] flex items-center justify-center overflow-hidden transition-all duration-150 ${
              isBlinking ? 'scale-y-[0.06]' : 'scale-y-100'
            }`}
          >
            <motion.div
              animate={{
                x: leftPupilPos.x,
                y: leftPupilPos.y,
              }}
              transition={{ type: 'spring', stiffness: 260, damping: 22, mass: 0.6 }}
              className="relative w-10 h-10 xs:w-12 xs:h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-[#111319] flex items-center justify-center"
            >
              {/* Pupil Light Glare Highlight */}
              <div className="absolute top-2 left-2 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-white opacity-90" />
            </motion.div>
          </div>

          {/* Right Eye */}
          <div
            ref={rightEyeRef}
            className={`relative w-20 h-28 xs:w-24 xs:h-34 sm:w-32 sm:h-44 lg:w-40 lg:h-54 rounded-full bg-white shadow-[inset_0_4px_12px_rgba(0,0,0,0.15)] flex items-center justify-center overflow-hidden transition-all duration-150 ${
              isBlinking ? 'scale-y-[0.06]' : 'scale-y-100'
            }`}
          >
            <motion.div
              animate={{
                x: rightPupilPos.x,
                y: rightPupilPos.y,
              }}
              transition={{ type: 'spring', stiffness: 260, damping: 22, mass: 0.6 }}
              className="relative w-10 h-10 xs:w-12 xs:h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full bg-[#111319] flex items-center justify-center"
            >
              {/* Pupil Light Glare Highlight */}
              <div className="absolute top-2 left-2 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-white opacity-90" />
            </motion.div>
          </div>

        </div>

        {/* ── Footer Bottom Copy & Credits (Matching Video Reference) ── */}
        <div className="mx-auto max-w-[1420px] w-full px-5 sm:px-8 lg:px-12 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end pt-8 border-t border-white/20">
            
            {/* Left Column: Brand & Copyright */}
            <div className="md:col-span-6 text-left space-y-2">
              <h4 className="text-xl sm:text-2xl font-black font-sans uppercase tracking-tight text-white">
                USAMA FAHEEM
              </h4>
              <p className="text-xs sm:text-sm text-white/80 font-medium max-w-sm leading-relaxed">
                Creative Full-Stack Web Developer & UI Engineer crafting immersive digital experiences that convert.
              </p>
              <div className="text-[11px] text-white/60 font-mono pt-2">
                © {new Date().getFullYear()} Usama Faheem • All rights reserved.
              </div>
            </div>

            {/* Right Column: Persona Note & Fast Action */}
            <div className="md:col-span-6 text-left md:text-right space-y-3">
              <p className="text-xs sm:text-[13px] lg:text-sm text-white/90 font-medium leading-relaxed max-w-md md:ml-auto">
                &ldquo;I don&apos;t have all the answers but I know a person or three. Overnight sleep (or 4h naps) to hear about what you&apos;re building. Drop a message and I&apos;ll get back to you asap.&rdquo;
              </p>
              
              <div className="flex items-center justify-start md:justify-end gap-3 pt-1">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white text-[#f03e1e] text-xs font-black uppercase tracking-wider hover:bg-white/90 transition-all shadow-md transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Drop a Note</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href="https://linkedin.com/in/usama-faheem"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-bold uppercase tracking-wider border border-white/25 transition-all"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </footer>
  );
}
