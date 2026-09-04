'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import usePageReady from './usePageReady';

export default function VoiceRibbonOverlay() {
  const isPageReady = usePageReady();
  const [cycleIndex, setCycleIndex] = useState(0);
  const [isBadge, setIsBadge] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const transformations = [
    {
      raw: 'waiting?',
      badge: 'Saved name',
    },
    {
      raw: 'on so can',
      badge: 'Added question mark',
    },
    {
      raw: 'need full-stack?',
      badge: 'Removed "Umm" & Cleaned Code',
    },
    {
      raw: 'is speed optimized?',
      badge: '99+ Lighthouse Score',
    },
    {
      raw: 'production ready?',
      badge: 'Added Next.js 15 & MERN',
    },
  ];

  // Cycle raw text -> action badge (only when page is ready)
  useEffect(() => {
    if (!isPageReady) return;
    let timeout: NodeJS.Timeout;
    if (!isBadge) {
      // Show raw speech edit for 2.0s
      timeout = setTimeout(() => {
        setIsBadge(true);
      }, 2000);
    } else {
      // Show AI action badge for 2.6s, then next
      timeout = setTimeout(() => {
        setCycleIndex((prev) => (prev + 1) % transformations.length);
        setIsBadge(false);
      }, 2600);
    }
    return () => clearTimeout(timeout);
  }, [isBadge, isPageReady, transformations.length]);

  if (!isPageReady) return null;

  const current = transformations[cycleIndex];

  // Long repeating text strings to ensure zero empty spots at any point on the curve
  const rawSpeechSentence =
    "to handle the first part of the project, but I'm not totally sure. Also, I told the team the new timeline should be ready by Friday, although it's probably going to slip. There's been a lot of back and forth and honestly the... ";
  const longRawSpeech = rawSpeechSentence.repeat(8);

  const polishedRibbonSentence =
    "I'm not totally sure. I also told the team the new timeline should be ready by Friday — Usama Faheem is crafting high-performance MERN & Next.js web applications with clean architecture • Available for hire • ";
  const longPolishedRibbon = polishedRibbonSentence.repeat(8);

  // Dedicated Mobile Render (400x800 viewBox fits mobile screens without horizontal cropping)
  if (isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isPageReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ delay: 2.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 pointer-events-none select-none z-10 overflow-hidden transform-gpu"
      >
        <svg
          className="w-full h-full absolute inset-0 transform-gpu"
          viewBox="0 0 400 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Mobile Left Speech Loop Path (Fits inside 400px screen) */}
            <path
              id="mobLeftLoop"
              d="M -40, 680 C 10, 600 50, 520 70, 460 C 85, 420 30, 390 0, 450 C -30, 520 40, 640 200, 680"
              fill="none"
            />
            {/* Mobile Right Lime Ribbon Path */}
            <path
              id="mobRightRibbon"
              d="M 200, 680 C 280, 680 360, 610 430, 540"
              fill="none"
            />
            <linearGradient id="mobRibbonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ccff00" />
              <stop offset="100%" stopColor="#ffaa00" />
            </linearGradient>
          </defs>

          {/* ── LEFT SIDE: Raw Speech Loop Text ── */}
          <text
            className="fill-black/65 text-[12px] font-sans font-medium tracking-tight select-none"
            xmlSpace="preserve"
            dy="5"
          >
            <textPath href="#mobLeftLoop" startOffset="-50%">
              {longRawSpeech}
              <animate attributeName="startOffset" from="-50%" to="0%" dur="10s" repeatCount="indefinite" />
            </textPath>
          </text>

          {/* ── RIGHT SIDE: Gradient Lime Ribbon Bar ── */}
          <path
            d="M 200, 680 C 280, 680 360, 610 430, 540"
            fill="none"
            stroke="url(#mobRibbonGrad)"
            strokeWidth="24"
            strokeLinecap="round"
          />

          {/* ── RIGHT SIDE: Text inside Lime Ribbon ── */}
          <text
            className="fill-black text-[12px] font-sans font-bold tracking-tight select-none"
            dominantBaseline="central"
            dy="1.5"
            xmlSpace="preserve"
          >
            <textPath href="#mobRightRibbon" startOffset="-50%">
              {longPolishedRibbon}
              <animate attributeName="startOffset" from="-50%" to="0%" dur="8s" repeatCount="indefinite" />
            </textPath>
          </text>

          {/* ── TOP FLOATING BADGE ── */}
          <foreignObject
            x={200 - 100}
            y={680 - 24 - 36}
            width="200"
            height="30"
            className="overflow-visible pointer-events-none"
          >
            <div className="flex items-center justify-center w-full h-full">
              <AnimatePresence mode="wait">
                {!isBadge ? (
                  <motion.div
                    key={`raw-${cycleIndex}`}
                    initial={{ opacity: 0, y: 4, scale: 0.94 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.94 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className="text-black font-sans text-[11px] font-semibold tracking-tight flex items-center gap-1 drop-shadow-sm px-3 py-0.5 rounded-full bg-white/95 backdrop-blur-md border border-black/10 shadow-sm"
                  >
                    <span>{current.raw}</span>
                    <span className="text-orange-500 text-[10px]">✨</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key={`badge-${cycleIndex}`}
                    initial={{ opacity: 0, y: 6, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.92 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="flex items-center gap-1 px-3 py-0.5 rounded-full bg-[#064e3b] text-emerald-100 text-[11px] font-sans font-semibold shadow-md border border-emerald-400/40 backdrop-blur-md"
                  >
                    <svg
                      className="w-3 h-3 text-emerald-300 stroke-[2.5]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{current.badge}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </foreignObject>

          {/* ── CENTER MIC CAPSULE PILL ── */}
          <foreignObject
            x={200 - 75}
            y={680 - 22}
            width="150"
            height="44"
            className="overflow-visible pointer-events-none"
          >
            <div className="w-full h-full flex items-center justify-center">
              <div className="flex items-center justify-center h-[44px] px-4 rounded-full bg-[#fffdf5] text-black shadow-xl border-[2px] border-[#18181b]">
                <div className="flex items-center gap-[2.5px] h-4 px-0.5">
                  <span className="w-[2px] h-2.5 bg-black rounded-full animate-[bounce_1s_infinite_100ms]" />
                  <span className="w-[2px] h-4 bg-black rounded-full animate-[bounce_1s_infinite_200ms]" />
                  <span className="w-[2px] h-5 bg-black rounded-full animate-[bounce_1s_infinite_300ms]" />
                  <span className="w-[2px] h-3.5 bg-black rounded-full animate-[bounce_1s_infinite_150ms]" />
                  <span className="w-[2px] h-1.5 bg-black rounded-full opacity-60" />
                  <span className="w-[2px] h-1 bg-black rounded-full opacity-40" />
                  <span className="w-[2px] h-1 bg-black rounded-full opacity-40" />
                  <span className="w-[2px] h-1.5 bg-black rounded-full opacity-60" />
                  <span className="w-[2px] h-3 bg-black rounded-full animate-[bounce_1s_infinite_180ms]" />
                  <span className="w-[2px] h-4.5 bg-black rounded-full animate-[bounce_1s_infinite_280ms]" />
                  <span className="w-[2px] h-3.5 bg-black rounded-full animate-[bounce_1s_infinite_380ms]" />
                  <span className="w-[2px] h-4 bg-black rounded-full animate-[bounce_1s_infinite_220ms]" />
                  <span className="w-[2px] h-3 bg-black rounded-full animate-[bounce_1s_infinite_320ms]" />
                </div>
              </div>
            </div>
          </foreignObject>
        </svg>
      </motion.div>
    );
  }

  // Original Desktop Render (1440x900 viewBox)
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isPageReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ delay: 2.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0 pointer-events-none select-none z-10 overflow-hidden"
    >
      <svg
        className="w-full h-full absolute inset-0"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <path
            id="leftLoopPath"
            d="M -120, 730 C -40, 630 40, 550 100, 490 C 150, 440 160, 320 100, 270 C 40, 220 -60, 240 -80, 320 C -100, 400 -10, 480 100, 500 C 200, 518 500, 725 670, 725"
            fill="none"
          />
          <path
            id="rightRibbonPath"
            d="M 720, 725 C 1020, 725 1340, 600 1580, 500"
            fill="none"
          />
          <filter id="ribbonShadow" x="-10%" y="-30%" width="130%" height="180%">
            <feDropShadow dx="0" dy="6" stdDeviation="6" floodOpacity="0.3" />
          </filter>
          <linearGradient id="ribbonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ccff00" />
            <stop offset="100%" stopColor="#ffaa00" />
          </linearGradient>
        </defs>

        <text
          className="fill-black/60 md:fill-black/45 text-[13px] md:text-[15px] lg:text-[16px] font-sans font-medium tracking-tight select-none"
          xmlSpace="preserve"
          dy="6"
        >
          <textPath href="#leftLoopPath" startOffset="-50%">
            {longRawSpeech}
            <animate attributeName="startOffset" from="-50%" to="0%" dur="10s" repeatCount="indefinite" />
          </textPath>
        </text>

        <path
          d="M 720, 725 C 1020, 725 1340, 600 1580, 500"
          fill="none"
          stroke="url(#ribbonGradient)"
          strokeWidth="40"
          strokeLinecap="round"
          filter="url(#ribbonShadow)"
        />

        <text
          className="fill-black text-[14px] md:text-[16px] lg:text-[17px] font-sans font-bold tracking-tight select-none"
          dominantBaseline="central"
          dy="2"
          xmlSpace="preserve"
        >
          <textPath href="#rightRibbonPath" startOffset="-50%">
            {longPolishedRibbon}
            <animate attributeName="startOffset" from="-50%" to="0%" dur="8s" repeatCount="indefinite" />
          </textPath>
        </text>

        <foreignObject
          x={720 - 140}
          y={725 - 26 - 38}
          width="280"
          height="32"
          className="overflow-visible pointer-events-none"
        >
          <div className="flex items-center justify-center w-full h-full">
            <AnimatePresence mode="wait">
              {!isBadge ? (
                <motion.div
                  key={`raw-${cycleIndex}`}
                  initial={{ opacity: 0, y: 4, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.94 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="text-black font-sans text-xs font-semibold tracking-tight flex items-center gap-1.5 drop-shadow-sm px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-black/10 shadow-sm"
                >
                  <span>{current.raw}</span>
                  <span className="text-orange-500 text-xs">✨</span>
                </motion.div>
              ) : (
                <motion.div
                  key={`badge-${cycleIndex}`}
                  initial={{ opacity: 0, y: 6, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.92 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#064e3b] text-emerald-100 text-xs font-sans font-semibold shadow-md border border-emerald-400/40 backdrop-blur-md"
                >
                  <svg
                    className="w-3.5 h-3.5 text-emerald-300 stroke-[2.5]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{current.badge}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </foreignObject>

        <foreignObject
          x={720 - 100}
          y={725 - 26}
          width="200"
          height="52"
          className="overflow-visible pointer-events-none"
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="flex items-center justify-center h-[52px] px-5 rounded-full bg-[#fffdf5] text-black shadow-xl border-[2.5px] border-[#18181b]">
              <div className="flex items-center gap-[3px] h-5 px-1">
                <span className="w-[2.5px] h-3 bg-black rounded-full animate-[bounce_1s_infinite_100ms]" />
                <span className="w-[2.5px] h-4.5 bg-black rounded-full animate-[bounce_1s_infinite_200ms]" />
                <span className="w-[2.5px] h-6 bg-black rounded-full animate-[bounce_1s_infinite_300ms]" />
                <span className="w-[2.5px] h-4 bg-black rounded-full animate-[bounce_1s_infinite_150ms]" />
                <span className="w-[2.5px] h-2 bg-black rounded-full opacity-60" />
                <span className="w-[2.5px] h-1.5 bg-black rounded-full opacity-40" />
                <span className="w-[2.5px] h-1.5 bg-black rounded-full opacity-40" />
                <span className="w-[2.5px] h-2 bg-black rounded-full opacity-60" />
                <span className="w-[2.5px] h-3.5 bg-black rounded-full animate-[bounce_1s_infinite_180ms]" />
                <span className="w-[2.5px] h-5.5 bg-black rounded-full animate-[bounce_1s_infinite_280ms]" />
                <span className="w-[2.5px] h-4 bg-black rounded-full animate-[bounce_1s_infinite_380ms]" />
                <span className="w-[2.5px] h-5 bg-black rounded-full animate-[bounce_1s_infinite_220ms]" />
                <span className="w-[2.5px] h-3.5 bg-black rounded-full animate-[bounce_1s_infinite_320ms]" />
                <span className="w-[2.5px] h-2 bg-black rounded-full animate-[bounce_1s_infinite_420ms]" />
              </div>
            </div>
          </div>
        </foreignObject>
      </svg>
    </motion.div>
  );
}
