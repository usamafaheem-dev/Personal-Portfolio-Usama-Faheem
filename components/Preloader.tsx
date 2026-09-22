'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const PILLARS = [0, 1, 2, 3, 4, 5];

export default function Preloader() {
  const [stage, setStage] = useState<'entering' | 'exiting' | 'removed'>('entering');
  const [isClient, setIsClient] = useState(false);
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');

  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimers = () => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
  };

  const triggerExit = () => {
    setStage((prev) => (prev === 'removed' ? 'removed' : 'exiting'));
    
    if (typeof window !== 'undefined') {
      (window as any).__preloaderDone = true;
      window.dispatchEvent(new CustomEvent('preloaderExiting'));
      window.dispatchEvent(new Event('resize'));
    }

    // Allow full 6-tile slide reveal animation to complete before unmounting
    const removeTimer = setTimeout(() => {
      setStage('removed');
      document.body.style.overflow = '';
      if (typeof window !== 'undefined') {
        (window as any).__preloaderDone = true;
        window.dispatchEvent(new CustomEvent('preloaderComplete'));
        window.dispatchEvent(new Event('resize'));
      }
    }, 850);

    timersRef.current.push(removeTimer);
  };

  const startSequence = () => {
    clearAllTimers();
    setStage('entering');
    document.body.style.overflow = 'hidden';

    if (typeof window !== 'undefined') {
      try {
        window.history.scrollRestoration = 'manual';
      } catch {}
      window.scrollTo(0, 0);
      (window as any).__preloaderDone = false;
    }

    // Measure time already elapsed since page load to guarantee exact ~3s total on-screen time
    const elapsed = typeof performance !== 'undefined' ? performance.now() : 0;
    const remainingTime = Math.max(1000, Math.min(2500, 3000 - elapsed));

    const exitTimer = setTimeout(() => {
      triggerExit();
    }, remainingTime);

    // Hard safety failsafe
    const failsafeTimer = setTimeout(() => {
      setStage('removed');
      document.body.style.overflow = '';
      if (typeof window !== 'undefined') {
        (window as any).__preloaderDone = true;
        window.dispatchEvent(new CustomEvent('preloaderComplete'));
        window.dispatchEvent(new Event('resize'));
      }
    }, 4500);

    timersRef.current.push(exitTimer, failsafeTimer);
  };

  useEffect(() => {
    setIsClient(true);
    if (typeof document !== 'undefined') {
      const isDark = document.documentElement.classList.contains('dark');
      setThemeMode(isDark ? 'dark' : 'light');
    }

    startSequence();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        triggerExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearAllTimers();
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const isExiting = stage === 'exiting';
  const showPreloader = stage !== 'removed';
  const isLight = themeMode === 'light';

  // Theme palettes
  const pillarBg = isLight ? 'bg-[#f8fafc]' : 'bg-[#030712]';
  const primaryColor = isLight ? '#0052ff' : '#ffffff';
  const glowDrop = isLight 
    ? 'drop-shadow-[0_0_16px_rgba(0,82,255,0.35)]' 
    : 'drop-shadow-[0_0_18px_rgba(255,255,255,0.6)]';

  return (
    <>
      {/* ══════════════════════════════════════════════════════════
          PRELOADER OVERLAY (Click anywhere to exit immediately)
         ══════════════════════════════════════════════════════════ */}
      {showPreloader && (
        <div 
          onClick={triggerExit}
          title="Click anywhere to skip intro"
          className="fixed inset-0 z-[99999] pointer-events-auto select-none overflow-hidden bg-transparent cursor-pointer transition-colors duration-300"
        >
          
          {/* ── 6 ARCHITECTURAL PILLARS / TILES (Staggered Split Exit revealing site underneath) ── */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
            {PILLARS.map((col) => {
              const goUp = col % 2 === 0;
              return (
                <motion.div
                  key={`pillar-${col}`}
                  initial={{ y: '0%' }}
                  animate={{ y: isExiting ? (goUp ? '-105%' : '105%') : '0%' }}
                  transition={{
                    duration: 0.65,
                    delay: isExiting ? col * 0.04 : 0,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                  style={{ left: `${(col * 100) / 6}vw` }}
                  className={`absolute top-0 w-[17.2vw] h-full ${pillarBg} border-none shadow-none will-change-transform transform-gpu`}
                />
              );
            })}
          </div>

          {/* ══════════════════════════════════════════════════════════
              COSMIC GALAXY WAVE VIDEO & UNIFIED GEOMETRIC LOGOTYPE
              - Mobile:
                * Pure CSS media queries guarantee ZERO long lines at start
                * 'f' is 100% normal geometric letter
                * Background video is rotated 90deg to run VERTICALLY on mobile
                * Avatar picture sits cleanly above 'P' with zero overlap
              - Desktop:
                * Architectural extended stems on P and l untouched
                * Horizontal background video untouched
             ══════════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{
              opacity: isExiting ? 0 : 1,
              scale: isExiting ? 0.98 : 1,
              y: isExiting ? -16 : 0,
            }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="relative z-20 w-full h-full flex flex-col justify-center items-center px-4 pointer-events-none"
          >
            {/* ── RICH TECH DOT MATRIX & AMBIENT CANVAS ACCENTS ── */}
            <div 
              className={`absolute inset-0 pointer-events-none ${
                isLight 
                  ? 'bg-[radial-gradient(#0052ff_1.2px,transparent_1.2px)] opacity-[0.14]' 
                  : 'bg-[radial-gradient(rgba(255,255,255,0.35)_1.2px,transparent_1.2px)] opacity-[0.20]'
              } [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_88%)]`} 
            />

            {/* Ambient Floating Micro-Dots */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
              <div className="absolute top-[18%] left-[10%] w-2 h-2 rounded-full bg-[#0052ff]/40 blur-[0.5px] animate-pulse" />
              <div className="absolute top-[26%] right-[12%] w-2.5 h-2.5 rounded-full bg-[#0052ff]/45 blur-[0.5px] animate-ping [animation-duration:3.5s]" />
              <div className="absolute bottom-[26%] left-[14%] w-2 h-2 rounded-full bg-blue-500/40 blur-[0.5px] animate-pulse" />
              <div className="absolute bottom-[20%] right-[16%] w-2 h-2 rounded-full bg-[#0052ff]/40 blur-[0.5px] animate-pulse [animation-duration:4s]" />

              {/* 3x3 Matrix Grid Accents on Margins (hidden on mobile to prevent clutter) */}
              <div className="hidden sm:grid absolute top-[22%] left-[6%] grid-cols-3 gap-1.5 opacity-35">
                {[...Array(9)].map((_, i) => (
                  <span key={`tl-dot-${i}`} className="w-1 h-1 rounded-full bg-[#0052ff]" />
                ))}
              </div>
              <div className="hidden sm:grid absolute bottom-[22%] right-[6%] grid-cols-3 gap-1.5 opacity-35">
                {[...Array(9)].map((_, i) => (
                  <span key={`br-dot-${i}`} className="w-1 h-1 rounded-full bg-[#0052ff]" />
                ))}
              </div>
            </div>

            {/* ── SVG Filters for Clean Wave Extraction ── */}
            <svg className="absolute w-0 h-0 pointer-events-none opacity-0" aria-hidden="true">
              <defs>
                <filter id="cleanBlueWave" colorInterpolationFilters="sRGB">
                  <feColorMatrix
                    type="matrix"
                    values="
                      0 0 0 0 0.12
                      0 0 0 0 0.48
                      0 0 0 0 1.0
                      0.35 0.55 0.15 0 -0.1
                    "
                  />
                </filter>
              </defs>
            </svg>

            {/* ── REAL COSMIC GALAXY WAVE VIDEO (Ultra-lightweight 437KB, starts instantly) ── */}
            <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden flex items-center justify-center">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="min-w-[100vh] min-h-[100vw] w-[100vh] h-[100vw] sm:min-w-full sm:min-h-full sm:w-full sm:h-full object-cover rotate-90 sm:rotate-0 transform-gpu scale-110"
                style={{
                  filter: isLight 
                    ? 'url(#cleanBlueWave) drop-shadow(0 0 16px rgba(0,82,255,0.25))' 
                    : 'hue-rotate(0deg) saturate(1.3) contrast(1.2)',
                  mixBlendMode: isLight ? 'normal' : 'screen',
                  opacity: isLight ? 0.65 : 0.95,
                }}
              >
                <source src="/vesper_preloader_opt.mp4" type="video/mp4" />
              </video>
              
              {/* Atmospheric Diffused Center Aura Glow */}
              <div 
                className="absolute inset-0 pointer-events-none -z-10"
                style={{
                  background: isLight
                    ? 'radial-gradient(circle at center, rgba(0, 82, 255, 0.12) 0%, rgba(59, 130, 246, 0.05) 50%, transparent 80%)'
                    : 'radial-gradient(circle at center, rgba(168, 85, 247, 0.2) 0%, rgba(59, 130, 246, 0.1) 50%, transparent 80%)',
                }}
              />
            </div>

            {/* Main Wordmark Container */}
            <div className="relative z-10 flex flex-col items-center max-w-5xl mx-auto w-full">
              
              {/* Top Tagline: "WEB DEVELOPER" (Visible immediately from frame 0) */}
              <div className="w-full flex justify-start pl-[34%] xs:pl-[35%] sm:pl-[24%] md:pl-[24%] mb-1 sm:mb-2 opacity-100">
                <span className={`text-xs xs:text-sm sm:text-xl md:text-2xl lg:text-3xl font-extrabold tracking-[0.22em] uppercase font-mono ${
                  isLight ? 'text-[#0043d4]' : 'text-white/95'
                }`}>
                  WEB DEVELOPER
                </span>
              </div>

              {/* Central Wordmark */}
              <div className={`relative w-full max-w-[850px] flex items-center justify-center px-2 select-none ${glowDrop}`}>
                {/* ── Tilted Avatar Cutout: Visible immediately and floating gently ── */}
                <motion.div
                  initial={{ scale: 1, opacity: 1, rotate: -12 }}
                  animate={{
                    scale: 1,
                    rotate: [-12, -6, -12],
                    y: [0, -4, 0],
                    opacity: 1,
                  }}
                  transition={{
                    rotate: { repeat: Infinity, duration: 4.5, ease: 'easeInOut' },
                    y: { repeat: Infinity, duration: 3.5, ease: 'easeInOut' },
                  }}
                  className="absolute -top-18 xs:-top-22 sm:-top-22 md:-top-27 lg:-top-29 -left-1 xs:-left-2 sm:-left-16 md:-left-22 lg:-left-25 z-30 pointer-events-none transition-all"
                >
                  <img
                    src="/usaam_emoji.png"
                    alt="Usama Faheem"
                    loading="eager"
                    fetchPriority="high"
                    decoding="sync"
                    className="w-18 xs:w-22 sm:w-32 md:w-38 lg:w-42 h-auto object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.2)] select-none opacity-100"
                  />
                </motion.div>

                <svg
                  viewBox="0 0 304 100"
                  className="w-full h-auto overflow-visible select-none"
                  style={{ color: primaryColor }}
                >
                  {/* ── Letter P (Mobile: Pure CSS sm:hidden ensures baseline at y=80 with ZERO startup lag/flash) ── */}
                  <path
                    className="sm:hidden"
                    d="
                      M 0,15 
                      L 36,15 
                      A 12,12 0 0,1 48,27 
                      L 48,46 
                      A 12,12 0 0,1 36,58 
                      L 10,58 
                      L 10,80 
                      L 0,80 
                      Z 
                      M 10,25 
                      L 34,25 
                      A 5,5 0 0,1 39,30 
                      L 39,43 
                      A 5,5 0 0,1 34,48 
                      L 10,48 
                      Z
                    "
                    fill="currentColor"
                    fillRule="evenodd"
                  />

                  {/* ── Letter P (Desktop: hidden sm:inline keeps architectural downward beam to y=950) ── */}
                  <path
                    className="hidden sm:inline"
                    d="
                      M 0,15 
                      L 36,15 
                      A 12,12 0 0,1 48,27 
                      L 48,46 
                      A 12,12 0 0,1 36,58 
                      L 10,58 
                      L 10,950 
                      L 0,950 
                      Z 
                      M 10,25 
                      L 34,25 
                      A 5,5 0 0,1 39,30 
                      L 39,43 
                      A 5,5 0 0,1 34,48 
                      L 10,48 
                      Z
                    "
                    fill="currentColor"
                    fillRule="evenodd"
                  />

                  {/* ── Letter o (1st): Squircle (54 to 90 — 6px gap) ── */}
                  <path
                    d="
                      M 64,35 
                      L 80,35 
                      A 10,10 0 0,1 90,45 
                      L 90,70 
                      A 10,10 0 0,1 80,80 
                      L 64,80 
                      A 10,10 0 0,1 54,70 
                      L 54,45 
                      A 10,10 0 0,1 64,35 
                      Z 
                      M 66,45 
                      L 78,45 
                      A 3,3 0 0,1 81,48 
                      L 81,67 
                      A 3,3 0 0,1 78,70 
                      L 66,70 
                      A 3,3 0 0,1 63,67 
                      L 63,48 
                      A 3,3 0 0,1 66,45 
                      Z
                    "
                    fill="currentColor"
                    fillRule="evenodd"
                  />

                  {/* ── Letter r: Straight Stem + Smooth Shoulder (96 to 122 — 6px gap) ── */}
                  <rect x="96" y="35" width="10" height="45" rx="1" fill="currentColor" />
                  <path
                    d="
                      M 106,35 
                      L 114,35 
                      A 8,8 0 0,1 122,43 
                      L 122,49 
                      L 114,49 
                      L 114,45 
                      A 2,2 0 0,0 112,43 
                      L 106,43 
                      Z
                    "
                    fill="currentColor"
                  />

                  {/* ── Letter t: Full Symmetrical Crossbar + Stem (128 to 152 — 6px gap from r) ── */}
                  <rect x="135" y="24" width="10" height="56" rx="1" fill="currentColor" />
                  <rect x="128" y="35" width="24" height="10" rx="2" fill="currentColor" />

                  {/* ── Letter f (100% Normal standard geometric letter on all screens) ── */}
                  <path
                    d="
                      M 165,80 
                      L 175,80 
                      L 175,26 
                      A 10,10 0 0,1 185,16 
                      L 188,16 
                      L 188,25 
                      L 185,25 
                      A 3,3 0 0,0 182,28 
                      L 182,80 
                      Z
                    "
                    fill="currentColor"
                  />
                  <rect x="158" y="35" width="24" height="10" rx="2" fill="currentColor" />

                  {/* ── Letter o (2nd): Squircle (188 to 224 — 6px gap from f) ── */}
                  <path
                    d="
                      M 198,35 
                      L 214,35 
                      A 10,10 0 0,1 224,45 
                      L 224,70 
                      A 10,10 0 0,1 214,80 
                      L 198,80 
                      A 10,10 0 0,1 188,70 
                      L 188,45 
                      A 10,10 0 0,1 198,35 
                      Z 
                      M 200,45 
                      L 212,45 
                      A 3,3 0 0,1 215,48 
                      L 215,67 
                      A 3,3 0 0,1 212,70 
                      L 200,70 
                      A 3,3 0 0,1 197,67 
                      L 197,48 
                      A 3,3 0 0,1 200,45 
                      Z
                    "
                    fill="currentColor"
                    fillRule="evenodd"
                  />

                  {/* ── Letter l (Mobile: sm:hidden keeps normal height 65 from y=15 to y=80 with ZERO startup lag/flash) ── */}
                  <rect className="sm:hidden" x="230" y="15" width="10" height="65" rx="1" fill="currentColor" />

                  {/* ── Letter l (Desktop: hidden sm:inline keeps upward beam to y=-950) ── */}
                  <rect className="hidden sm:inline" x="230" y="-950" width="10" height="1030" rx="1" fill="currentColor" />

                  {/* ── Letter i: Straight Stem + Squircle Dot (246 to 256 — 6px gap) ── */}
                  <rect x="246" y="35" width="10" height="45" rx="1" fill="currentColor" />
                  <rect x="246" y="19" width="10" height="10" rx="2" fill="currentColor" />

                  {/* ── Letter o (3rd): Squircle (262 to 298 — 6px gap) ── */}
                  <path
                    d="
                      M 272,35 
                      L 288,35 
                      A 10,10 0 0,1 298,45 
                      L 298,70 
                      A 10,10 0 0,1 288,80 
                      L 272,80 
                      A 10,10 0 0,1 262,70 
                      L 262,45 
                      A 10,10 0 0,1 272,35 
                      Z 
                      M 274,45 
                      L 286,45 
                      A 3,3 0 0,1 289,48 
                      L 289,67 
                      A 3,3 0 0,1 286,70 
                      L 274,70 
                      A 3,3 0 0,1 271,67 
                      L 271,48 
                      A 3,3 0 0,1 274,45 
                      Z
                    "
                    fill="currentColor"
                    fillRule="evenodd"
                  />
                </svg>
              </div>

              {/* Bottom Right Details: Author Name + 2026 Year Badge (Visible immediately from frame 0) */}
              <div
                className="w-full flex justify-end mt-2 sm:-mt-6 md:-mt-8 lg:-mt-10 pr-[1%] sm:pr-[2%] opacity-100"
              >
                <div className="flex flex-row items-center gap-2 sm:gap-4">
                  <span className={`text-xs xs:text-sm sm:text-xl md:text-2xl lg:text-3xl font-extrabold tracking-[0.14em] font-mono uppercase ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}>
                    USAMA FAHEEM
                  </span>

                  {/* Premium Styled 2026 Capsule Badge */}
                  <div className={`inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-0.5 sm:py-1.5 rounded-full text-[10px] xs:text-xs sm:text-sm md:text-base font-mono font-extrabold tracking-widest shadow-md backdrop-blur-md transition-all ${
                    isLight 
                      ? 'bg-gradient-to-r from-[#0052ff] to-[#1d4ed8] text-white shadow-[0_4px_18px_rgba(0,82,255,0.35)] border border-blue-400/40' 
                      : 'bg-gradient-to-r from-white/20 to-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.25)] border border-white/30'
                  }`}>
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399] animate-pulse" />
                    <span>2026</span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      )}
    </>
  );
}
