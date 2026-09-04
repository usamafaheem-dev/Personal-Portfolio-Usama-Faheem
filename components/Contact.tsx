'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { ArrowUpRight, ArrowUp, Copy, Check, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons';

// Exact Character Configuration for the Marquee Text
interface CharConfig {
  char: string;
  y: number;
  rotate: number;
}

const customCharConfigs: CharConfig[] = [
  // "i"
  { char: 'i', y: 0, rotate: 0 },
  { char: ' ', y: 0, rotate: 0 },
  // "transform" (Split between top & bottom lanes)
  { char: 't', y: -75, rotate: -6 },
  { char: 'r', y: 80, rotate: 6 },
  { char: 'a', y: -75, rotate: -5 },
  { char: 'n', y: 80, rotate: 7 },
  { char: 's', y: -75, rotate: -6 },
  { char: 'f', y: 80, rotate: 5 },
  { char: 'o', y: -75, rotate: -7 },
  { char: 'r', y: 80, rotate: 6 },
  { char: 'm', y: -75, rotate: -5 },
  { char: ' ', y: 0, rotate: 0 },
  // "ideas"
  { char: 'i', y: 80, rotate: 6 },
  { char: 'd', y: -75, rotate: -6 },
  { char: 'e', y: 80, rotate: 7 },
  { char: 'a', y: -75, rotate: -5 },
  { char: 's', y: 80, rotate: 6 },
  { char: ' ', y: 0, rotate: 0 },
  // "into"
  { char: 'i', y: -75, rotate: -6 },
  { char: 'n', y: 80, rotate: 6 },
  { char: 't', y: -75, rotate: -5 },
  { char: 'o', y: 80, rotate: 7 },
  { char: ' ', y: 0, rotate: 0 },
  // "production-ready"
  { char: 'p', y: -80, rotate: -7 },
  { char: 'r', y: 85, rotate: 6 },
  { char: 'o', y: -80, rotate: -6 },
  { char: 'd', y: 85, rotate: 7 },
  { char: 'u', y: -80, rotate: -5 },
  { char: 'c', y: 85, rotate: 6 },
  { char: 't', y: -80, rotate: -7 },
  { char: 'i', y: 85, rotate: 5 },
  { char: 'o', y: -80, rotate: -6 },
  { char: 'n', y: 85, rotate: 7 },
  { char: '-', y: 0, rotate: 0 },
  { char: 'r', y: -80, rotate: -6 },
  { char: 'e', y: 85, rotate: 6 },
  { char: 'a', y: -80, rotate: -7 },
  { char: 'd', y: 85, rotate: 5 },
  { char: 'y', y: -80, rotate: -6 },
  { char: ' ', y: 0, rotate: 0 },
  // "applications."
  { char: 'a', y: 85, rotate: 6 },
  { char: 'p', y: -80, rotate: -7 },
  { char: 'p', y: 85, rotate: 7 },
  { char: 'l', y: -80, rotate: -6 },
  { char: 'i', y: 85, rotate: 6 },
  { char: 'c', y: -80, rotate: -5 },
  { char: 'a', y: 85, rotate: 7 },
  { char: 't', y: -80, rotate: -6 },
  { char: 'i', y: 85, rotate: 6 },
  { char: 'o', y: -80, rotate: -7 },
  { char: 'n', y: 85, rotate: 5 },
  { char: 's', y: -80, rotate: -6 },
  { char: '.', y: 0, rotate: 0 },
];

function MergingChar({
  cfg,
  charIndex,
  totalChars,
  scrollProgress,
}: {
  cfg: CharConfig;
  charIndex: number;
  totalChars: number;
  scrollProgress: MotionValue<number>;
}) {
  const charWidthVw = 4.2;
  const entryStart = Math.max(0, (charIndex * charWidthVw - 12) / 690);
  const entryMerge = entryStart + 0.012; // Instant snap right at the edge!
  const exitStart = entryMerge + 0.35;
  const exitEnd = exitStart + 0.06;

  const y = useTransform(
    scrollProgress,
    [
      Math.max(0, entryStart - 0.02),
      entryStart,
      entryMerge,
      exitStart,
      exitEnd,
    ],
    [cfg.y, cfg.y, 0, 0, 0]
  );

  const rotate = useTransform(
    scrollProgress,
    [
      Math.max(0, entryStart - 0.02),
      entryStart,
      entryMerge,
      exitStart,
      exitEnd,
    ],
    [cfg.rotate, cfg.rotate, 0, 0, 0]
  );

  const opacity = useTransform(
    scrollProgress,
    [Math.max(0, entryStart - 0.02), entryStart],
    [0.2, 1]
  );

  if (cfg.char === ' ') {
    return <span className="inline-block w-[0.34em]">&nbsp;</span>;
  }

  return (
    <motion.span
      style={{
        y,
        rotate,
        opacity,
      }}
      className="inline-block will-change-transform transform-gpu origin-center"
    >
      {cfg.char}
    </motion.span>
  );
}

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Scroll tracking for the sticky stage
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 28,
    stiffness: 85,
    mass: 0.14,
  });

  // ── 1. KINETIC HORIZONTAL TRACK TRANSLATION (Scroll 0% to 44%) ──
  const textX = useTransform(smoothProgress, [0, 0.44], ['75vw', '-270vw']);
  const textOpacity = useTransform(smoothProgress, [0, 0.02, 0.36, 0.44], [0, 1, 1, 0]);

  // ── 2. "let's talk." DESTINATION STAGE (Direct seamless overlap at 34% to 44% - ZERO BLANK GAP) ──
  const talkOpacity = useTransform(smoothProgress, [0.34, 0.44, 1], [0, 1, 1]);
  const talkScale = useTransform(smoothProgress, [0.34, 0.46], [0.94, 1]);
  const talkY = useTransform(smoothProgress, [0.34, 0.46], [25, 0]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('developer@usamafaheem.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalChars = customCharConfigs.length;

  return (
    <div id="contact" className="relative w-full bg-[#f0f0f2] text-[#111111] overflow-visible select-none">
      
      {/* ══════════════════════════════════════════════════════════════
          PINNED STAGE (185vh Height - Snappy & Immediate Transition)
         ══════════════════════════════════════════════════════════════ */}
      <section ref={containerRef} className="relative h-[185vh] w-full bg-[#f0f0f2] overflow-visible">
        
        {/* Sticky 100vh Viewport Container */}
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#f0f0f2] flex flex-col justify-between py-8 px-6 sm:px-12 z-10">
          {/* ── Precision Dotted Grid Background Pattern ── */}
          <div className="absolute inset-0 bg-[radial-gradient(#99a1af_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-40 pointer-events-none [mask-image:radial-gradient(ellipse_75%_75%_at_50%_50%,#000_60%,transparent_100%)]" />
          
          {/* Empty spacer for flex layout balance */}
          <div className="w-full h-4" />

          {/* ── 1. DEAD-CENTER HORIZONTAL TEXT STREAM (Clean Solid Words with 1-by-1 Character Offsets) ── */}
          <div className="absolute inset-0 flex items-center overflow-hidden pointer-events-none z-10">
            <motion.div
              style={{
                x: textX,
                opacity: textOpacity,
              }}
              className="whitespace-nowrap flex items-center will-change-transform pl-6 py-12"
            >
              <h2 className="font-sans text-[13vw] sm:text-[11vw] lg:text-[9.2vw] font-bold tracking-tight text-[#111111] lowercase leading-none flex items-center">
                {customCharConfigs.map((cfg, idx) => (
                  <MergingChar
                    key={idx}
                    cfg={cfg}
                    charIndex={idx}
                    totalChars={totalChars}
                    scrollProgress={smoothProgress}
                  />
                ))}
              </h2>
            </motion.div>
          </div>

          {/* ── 2. DEAD-CENTER "let's talk." DESTINATION STAGE (Matching Exact Image 2 Scale) ── */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden z-20 pointer-events-none">
            <motion.div
              style={{
                opacity: talkOpacity,
                scale: talkScale,
                y: talkY,
              }}
              className="flex flex-col items-center justify-center text-center px-4 w-full max-w-7xl mx-auto pointer-events-auto font-sans"
            >
              {/* Eyebrow */}
              <span className="text-xs sm:text-sm font-sans uppercase tracking-[0.25em] text-zinc-500 font-bold mb-3 sm:mb-4 block">
                HAVE A PROJECT IN MIND?
              </span>

              {/* Giant Title: let's talk. with Massive Scale (Matching Image 2) */}
              <h2 className="font-sans text-7xl sm:text-9xl md:text-[14vw] lg:text-[17vw] xl:text-[18.5vw] font-black tracking-[-0.04em] text-[#111111] lowercase leading-[0.85] mb-5 sm:mb-7 whitespace-nowrap">
                let&apos;s talk<span className="text-[#111111]">.</span>
              </h2>

              {/* Clickable Email Box with Copy */}
              <button
                onClick={handleCopyEmail}
                className="group inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-white/95 hover:bg-white border border-zinc-300 shadow-xs hover:shadow-md transition-all text-xs sm:text-sm font-sans text-zinc-800 font-semibold mb-7 sm:mb-8 active:scale-95 cursor-pointer"
                title="Click to copy email address"
              >
                <Mail size={15} className="text-zinc-500 group-hover:text-black transition-colors" />
                <span>developer@usamafaheem.com</span>
                {copiedEmail ? (
                  <span className="inline-flex items-center gap-1 text-emerald-600 text-[11px] font-bold font-sans">
                    <Check size={13} /> Copied!
                  </span>
                ) : (
                  <Copy size={13} className="text-zinc-400 group-hover:text-zinc-600" />
                )}
              </button>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 font-sans">
                <a
                  href="#projects"
                  className="px-8 py-3.5 rounded-full bg-[#111111] hover:bg-black text-white text-xs sm:text-sm font-bold tracking-wider uppercase transition-all hover:scale-105 shadow-md flex items-center gap-2 group cursor-pointer font-sans"
                >
                  <span>VIEW PORTFOLIO</span>
                  <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href="mailto:developer@usamafaheem.com"
                  className="px-8 py-3.5 rounded-full bg-transparent hover:bg-white text-zinc-900 border border-zinc-400 hover:border-zinc-900 text-xs sm:text-sm font-bold tracking-wider uppercase transition-all hover:scale-105 shadow-xs flex items-center gap-2 cursor-pointer font-sans"
                >
                  <span>GET IN TOUCH</span>
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Empty spacer for bottom padding balance */}
          <div className="w-full h-4" />

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SINGLE UNIFIED FOOTER
          Clean, minimal, with "USAMA" background watermark
         ══════════════════════════════════════════════════════════════ */}
      <footer id="footer-section" className="relative w-full bg-[#eaeaea] text-[#111111] pt-16 pb-12 px-6 sm:px-10 lg:px-16 overflow-hidden select-none border-t border-zinc-300 z-30">
        
        {/* Giant Watermark Text: USAMA in Brand Yellow/Amber */}
        <div className="absolute -left-6 top-1/2 -translate-y-1/2 text-[24vw] lg:text-[20vw] font-black text-[#eab308]/[0.12] tracking-tighter uppercase font-sans pointer-events-none select-none leading-none">
          USAMA
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start pb-12 border-b border-zinc-300/80">
            
            {/* Left Column: Wordmark & Bio & Socials */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-zinc-900 tracking-tight uppercase mb-3 font-sans">
                  USAMA FAHEEM.
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 max-w-md leading-relaxed font-normal mb-6">
                  Full-Stack Developer & UI/UX Specialist crafting high-performance digital systems and production-ready applications.
                </p>

                {/* Social Channels */}
                <div className="flex items-center gap-3 mb-6">
                  <a
                    href="https://github.com/Usama-Faheem-Offical"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white hover:bg-zinc-900 hover:text-white border border-zinc-300 flex items-center justify-center text-zinc-700 transition-all hover:scale-110 shadow-xs"
                    aria-label="GitHub"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                  <a
                    href="https://linkedin.com/in/usama-faheem"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white hover:bg-zinc-900 hover:text-white border border-zinc-300 flex items-center justify-center text-zinc-700 transition-all hover:scale-110 shadow-xs"
                    aria-label="LinkedIn"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                  <a
                    href="mailto:developer@usamafaheem.com"
                    className="w-10 h-10 rounded-full bg-white hover:bg-zinc-900 hover:text-white border border-zinc-300 flex items-center justify-center text-zinc-700 transition-all hover:scale-110 shadow-xs"
                    aria-label="Email"
                  >
                    <Mail size={16} />
                  </a>
                  <a
                    href="tel:+923143416588"
                    className="w-10 h-10 rounded-full bg-white hover:bg-zinc-900 hover:text-white border border-zinc-300 flex items-center justify-center text-zinc-700 transition-all hover:scale-110 shadow-xs"
                    aria-label="Phone"
                  >
                    <Phone size={16} />
                  </a>
                </div>
              </div>

              {/* Location & Timezone */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-zinc-600">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-zinc-500" />
                  <span>Lahore, Pakistan • Remote Worldwide</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe size={14} className="text-zinc-500" />
                  <span>GMT+5 Timezone</span>
                </div>
              </div>
            </div>

            {/* Right Column: Navigation Links */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-8 font-sans">
              
              <div className="flex flex-col gap-2.5 text-xs font-sans text-zinc-600">
                <span className="text-[11px] font-bold text-zinc-900 uppercase tracking-wider mb-1">EXPLORE PROJECTS</span>
                <a href="#projects" className="hover:text-zinc-900 transition-colors font-medium">SoftCr8ors AI Agency</a>
                <a href="#projects" className="hover:text-zinc-900 transition-colors font-medium">Reeba Yaseen Portfolio</a>
                <a href="#projects" className="hover:text-zinc-900 transition-colors font-medium">Shadab Rice E-Commerce</a>
                <a href="#projects" className="hover:text-zinc-900 transition-colors font-medium">3D Web Experience</a>
              </div>

              <div className="flex flex-col gap-2.5 text-xs font-sans text-zinc-600">
                <span className="text-[11px] font-bold text-zinc-900 uppercase tracking-wider mb-1">QUICK LINKS</span>
                <a href="#about" className="hover:text-zinc-900 transition-colors font-medium">About Me</a>
                <a href="#services" className="hover:text-zinc-900 transition-colors font-medium">Services</a>
                <a href="#experience" className="hover:text-zinc-900 transition-colors font-medium">Experience</a>
                <a href="#testimonials" className="hover:text-zinc-900 transition-colors font-medium">Client Reviews</a>
              </div>

            </div>

          </div>

          {/* Bottom Copyright Bar */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-zinc-500">
            <span>© 2026 USAMA FAHEEM — ALL RIGHTS RESERVED</span>
            
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-zinc-200 border border-zinc-300 text-zinc-700 transition-all text-[11px] cursor-pointer font-medium font-sans"
            >
              <span>Back to Top</span>
              <ArrowUp size={13} />
            </button>
          </div>

        </div>

      </footer>

    </div>
  );
}
