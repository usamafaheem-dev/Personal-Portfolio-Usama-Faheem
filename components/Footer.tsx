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

  // Calculate mouse gaze angle and offset relative to eye centers ONLY when footer is visible
  useEffect(() => {
    let isIntersecting = false;
    let rafId: number | null = null;
    let lastEvent: MouseEvent | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const calcPupil = (eyeEl: HTMLDivElement | null, clientX: number, clientY: number) => {
      if (!eyeEl) return { x: 0, y: 0 };
      const rect = eyeEl.getBoundingClientRect();
      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2;

      const deltaX = clientX - eyeCenterX;
      const deltaY = clientY - eyeCenterY;
      const angle = Math.atan2(deltaY, deltaX);
      const distance = Math.min(26, Math.hypot(deltaX, deltaY) / 14);

      return {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
      };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isIntersecting) return;
      lastEvent = e;

      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          if (lastEvent && isIntersecting) {
            setLeftPupilPos(calcPupil(leftEyeRef.current, lastEvent.clientX, lastEvent.clientY));
            setRightPupilPos(calcPupil(rightEyeRef.current, lastEvent.clientX, lastEvent.clientY));
          }
          rafId = null;
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
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
      className="relative bg-[#eae9e5] text-slate-900 pt-8 sm:pt-12 overflow-hidden"
    >
      {/* ── Ambient Background Dot Grid ── */}
      <div className="absolute inset-0 bg-[radial-gradient(#99a1af_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-35 pointer-events-none" />

      {/* ── Top Area: Floating Badges (Stairs) + Centered Condensed Statement ── */}
      <div className="relative mx-auto max-w-[1440px] w-full px-4 sm:px-8 z-10">
        
        {/* ── LEFT FLOATING STAIRCASE (3 Stepped Levels - Closer to Footer Curve) ── */}
        <div className="hidden md:flex absolute left-4 lg:left-8 top-12 sm:top-16 lg:top-22 flex-col gap-7 lg:gap-10 items-start z-20 pointer-events-auto">
          {/* Step 1: Outer Top Step */}
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            className="px-5 py-2 rounded-full bg-[#d8ff00] border-2 border-black text-black text-xs lg:text-[13px] font-extrabold uppercase tracking-wider shadow-[0_6px_20px_rgba(216,255,0,0.38)] -rotate-12 cursor-default transform-gpu will-change-transform"
          >
            AVAILABLE NOW
          </motion.div>

          {/* Step 2: Middle Inward Step */}
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
            className="ml-14 lg:ml-20 px-5 py-2 rounded-full bg-[#d8ff00] border-2 border-black text-black text-xs lg:text-[13px] font-extrabold uppercase tracking-wider shadow-[0_6px_20px_rgba(216,255,0,0.38)] -rotate-6 cursor-default transform-gpu will-change-transform"
          >
            WORLDWIDE REMOTE
          </motion.div>

          {/* Step 3: Inner Bottom Step (Close to Footer Curve) */}
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
            className="ml-24 lg:ml-34 px-5 py-2 rounded-full bg-[#d8ff00] border-2 border-black text-black text-xs lg:text-[13px] font-extrabold uppercase tracking-wider shadow-[0_6px_20px_rgba(216,255,0,0.38)] rotate-3 cursor-default transform-gpu will-change-transform"
          >
            OPEN FOR PROJECTS
          </motion.div>
        </div>

        {/* ── RIGHT FLOATING STAIRCASE (3 Stepped Levels - Closer to Footer Curve) ── */}
        <div className="hidden md:flex absolute right-4 lg:right-8 top-12 sm:top-16 lg:top-22 flex-col gap-7 lg:gap-10 items-end z-20 pointer-events-auto">
          {/* Step 1: Outer Top Step (Book a Call Button) */}
          <motion.a
            href="#contact"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0052ff] hover:bg-[#003fcc] border-2 border-black text-white text-xs lg:text-sm font-extrabold uppercase tracking-wider shadow-[0_6px_22px_rgba(0,82,255,0.42)] transition-all hover:scale-105 cursor-pointer transform-gpu will-change-transform"
          >
            <span>Book a Call</span>
            <span className="text-base leading-none font-extrabold">+</span>
          </motion.a>

          {/* Step 2: Middle Inward Step */}
          <motion.a
            href="#contact"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
            className="mr-14 lg:mr-20 px-5 py-2 rounded-full bg-[#d8ff00] border-2 border-black text-black text-xs lg:text-[13px] font-extrabold uppercase tracking-wider shadow-[0_6px_20px_rgba(216,255,0,0.38)] rotate-6 hover:scale-105 transition-transform cursor-pointer transform-gpu will-change-transform"
          >
            LET&apos;S TALK
          </motion.a>

          {/* Step 3: Inner Bottom Step (Close to Footer Curve) */}
          <motion.a
            href="#contact"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="mr-24 lg:mr-34 px-5 py-2 rounded-full bg-[#d8ff00] border-2 border-black text-black text-xs lg:text-[13px] font-extrabold uppercase tracking-wider shadow-[0_6px_20px_rgba(216,255,0,0.38)] -rotate-3 hover:scale-105 transition-transform cursor-pointer transform-gpu will-change-transform"
          >
            SAY HELLO 👋
          </motion.a>
        </div>

        {/* ── Mobile-Only Badges Row ── */}
        <div className="flex md:hidden items-center justify-center gap-2 mb-4 flex-wrap">
          <span className="px-3.5 py-1 rounded-full bg-[#d8ff00] border-2 border-black text-black text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
            Available Now
          </span>
          <span className="px-3.5 py-1 rounded-full bg-[#d8ff00] border-2 border-black text-black text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
            Worldwide Remote
          </span>
          <a
            href="#contact"
            className="px-3.5 py-1 rounded-full bg-[#0052ff] border-2 border-black text-white text-[10px] font-extrabold uppercase tracking-wider shadow-sm"
          >
            Book a Call +
          </a>
        </div>

        {/* ── Centered Condensed Poster Statement ── */}
        <div className="text-center pt-2 sm:pt-4 pb-2 sm:pb-4 relative z-30 px-2">
          <div className="inline-block relative">

            {/* Circled "DON'T" with SVG Hand-Drawn Oval Sketch (LIME) */}
            <div className="relative inline-block">
              <span
                style={{
                  transform: 'scaleY(1.15)',
                  display: 'inline-block',
                }}
                className="text-3xl xs:text-4xl sm:text-6xl lg:text-[70px] xl:text-[76px] font-extrabold font-sans tracking-tight uppercase leading-none px-3 sm:px-6 origin-bottom text-[#0052ff]"
              >
                DON&apos;T
              </span>
              {/* Hand-Drawn Sketchy Circle Stroke (LIME) */}
              <svg
                className="absolute -inset-2 sm:-inset-3 w-[calc(100%+16px)] sm:w-[calc(100%+24px)] h-[calc(100%+16px)] sm:h-[calc(100%+24px)] pointer-events-none text-[#0052ff]"
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
                  className="opacity-90"
                />
              </svg>
            </div>

            {/* "HESITATE TO REACH OUT!" (BLACK) */}
            <h2
              style={{
                transform: 'scaleY(1.15)',
                display: 'block',
              }}
              className="text-3xl xs:text-4xl sm:text-6xl lg:text-[70px] xl:text-[76px] font-extrabold font-sans tracking-tight text-slate-950 uppercase leading-[0.88] mt-1 origin-top"
            >
              HESITATE<br />
              TO REACH<br />
              OUT!
            </h2>
          </div>
        </div>

      </div>

      {/* ── Giant Monster Curved Arch Hill (ELECTRIC BLUE) ── */}
      <div className="relative w-full -mt-2 sm:-mt-3 lg:-mt-4 z-20">
        
        {/* Continuous SVG Arch Dome Top with Embedded Eyes */}
        <div className="relative w-full leading-none overflow-visible">
          <svg
            viewBox="0 0 1440 140"
            preserveAspectRatio="none"
            className="w-full h-24 sm:h-32 lg:h-44 block -mb-[2px]"
          >
            {/* Gentle, Subtle, Broad Dome Hill (Unified Solid Electric Blue) */}
            <path
              d="M 0,110 C 480,18 960,18 1440,110 L 1440,140 L 0,140 Z"
              fill="#000000"
            />
            {/* Crisp Top Rim Highlight */}
            <path
              d="M 0,110 C 480,18 960,18 1440,110"
              fill="none"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="2"
            />
          </svg>

          {/* ── TWO INTERACTIVE EYES (Positioned neatly inside the dome, below the top curve) ── */}
          <div className="absolute inset-x-0 top-6 sm:top-14 lg:top-20 flex items-center justify-center gap-2.5 sm:gap-4 z-20 pointer-events-none">

            {/* Left Eye */}
            <div
              ref={leftEyeRef}
              className={`pointer-events-auto relative w-14 h-20 xs:w-16 xs:h-24 sm:w-24 sm:h-36 lg:w-28 lg:h-42 rounded-[50%_50%_48%_48%] bg-white shadow-[0_6px_20px_rgba(0,0,0,0.18),inset_0_3px_10px_rgba(0,0,0,0.06)] flex items-center justify-center overflow-hidden transition-all duration-150 ${
                isBlinking ? 'scale-y-[0.06]' : 'scale-y-100'
              }`}
            >
              <motion.div
                animate={{
                  x: leftPupilPos.x,
                  y: leftPupilPos.y,
                }}
                transition={{ type: 'spring', stiffness: 280, damping: 24, mass: 0.5 }}
                className="relative w-7 h-7 xs:w-8 xs:h-8 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-[#111319] flex items-center justify-center shadow-md"
              >
                {/* Pupil Light Glare Highlight */}
                <div className="absolute top-1.5 left-1.5 w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white opacity-95" />
              </motion.div>
            </div>

            {/* Right Eye */}
            <div
              ref={rightEyeRef}
              className={`pointer-events-auto relative w-14 h-20 xs:w-16 xs:h-24 sm:w-24 sm:h-36 lg:w-28 lg:h-42 rounded-[50%_50%_48%_48%] bg-white shadow-[0_6px_20px_rgba(0,0,0,0.18),inset_0_3px_10px_rgba(0,0,0,0.06)] flex items-center justify-center overflow-hidden transition-all duration-150 ${
                isBlinking ? 'scale-y-[0.06]' : 'scale-y-100'
              }`}
            >
              <motion.div
                animate={{
                  x: rightPupilPos.x,
                  y: rightPupilPos.y,
                }}
                transition={{ type: 'spring', stiffness: 280, damping: 24, mass: 0.5 }}
                className="relative w-7 h-7 xs:w-8 xs:h-8 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-[#111319] flex items-center justify-center shadow-md"
              >
                {/* Pupil Light Glare Highlight */}
                <div className="absolute top-1.5 left-1.5 w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-white opacity-95" />
              </motion.div>
            </div>

          </div>
        </div>

        {/* ── Monster Bottom Body (Electric Blue) ── */}
        <div
          className="relative w-full bg-black pt-12 sm:pt-16 lg:pt-22 pb-24 sm:pb-8 text-white"
        >
          <div className="mx-auto max-w-[1440px] w-full px-4 sm:px-10 lg:px-14 relative z-20">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-8 items-end">

              {/* Left: Brand & Copyright */}
              <div className="md:col-span-6 text-center md:text-left space-y-1.5 sm:space-y-2">
                <h4 className="text-lg sm:text-2xl font-extrabold font-sans uppercase tracking-tight text-white">
                  USAMA FAHEEM
                </h4>
                <p className="text-[11px] sm:text-sm font-semibold max-w-sm mx-auto md:mx-0 leading-relaxed text-white/85">
                  Creative Full-Stack Web Developer & UI Engineer crafting immersive digital experiences that convert.
                </p>
                <div className="text-[10px] sm:text-[11px] font-mono font-medium pt-1 text-white/60">
                  © {new Date().getFullYear()} Usama Faheem • All rights reserved.
                </div>
              </div>

              {/* Right: Persona Note */}
              <div className="md:col-span-6 text-center md:text-right flex flex-col items-center md:items-end justify-end">
                <p className="text-[11px] sm:text-[13px] lg:text-sm font-semibold leading-relaxed max-w-md text-white/90">
                  &ldquo;I don&apos;t take on every project, as I don&apos;t always have room right away, but I&apos;d love to hear what you&apos;re building. Drop a message and I&apos;ll get back to you asap.&rdquo;
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
