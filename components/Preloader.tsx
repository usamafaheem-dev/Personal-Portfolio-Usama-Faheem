'use client';

import { useState, useEffect, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── 1. PROMINENT GLOWING HEXAGON PATTERN ──
interface HexagonPatternProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  hexagons?: [number, number][];
  className?: string;
}

function HexagonPattern({
  width = 60,
  height = 60,
  x = 0,
  y = 0,
  hexagons = [
    [0, 1], [1, 3], [2, 1], [3, 4], [4, 2], [5, 5], [6, 1], [7, 3], [8, 0], [9, 4],
    [10, 2], [11, 5], [12, 1], [13, 3], [14, 2], [15, 5], [16, 1], [17, 4], [18, 2],
    [19, 5], [20, 1], [21, 3], [22, 4], [23, 2], [24, 5], [25, 1], [26, 3], [27, 4],
    [2, 6], [5, 7], [8, 6], [11, 7], [14, 8], [17, 6], [20, 7], [23, 8], [26, 6]
  ],
  className = '',
}: HexagonPatternProps) {
  const id = useId();

  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full fill-none ${className}`}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M ${width / 2} 0 L ${width} ${height / 4} L ${width} ${(height * 3) / 4} L ${width / 2} ${height} L 0 ${(height * 3) / 4} L 0 ${height / 4} Z`}
            strokeWidth={1.2}
            className="stroke-slate-300/85"
            fill="none"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />

      {hexagons && (
        <svg x={x} y={y} className="overflow-visible">
          {hexagons.map(([hx, hy], index) => {
            const isCyan = index % 3 === 0;
            const isPurple = index % 3 === 1;
            const fillClass = isCyan
              ? 'fill-blue-500/20 stroke-blue-500/60'
              : isPurple
              ? 'fill-purple-500/18 stroke-purple-500/60'
              : 'fill-emerald-500/20 stroke-emerald-500/60';

            return (
              <motion.path
                key={`${hx}-${hy}-${index}`}
                initial={{ opacity: 0.3 }}
                animate={{
                  opacity: [0.3, 1, 0.4, 0.95, 0.3],
                  scale: [1, 1.03, 1],
                }}
                transition={{
                  duration: 2.4 + (index % 4) * 0.4,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  delay: (index % 8) * 0.25,
                  ease: 'easeInOut',
                }}
                d={`M ${hx * width + width / 2} ${hy * height} L ${hx * width + width} ${hy * height + height / 4} L ${hx * width + width} ${hy * height + (height * 3) / 4} L ${hx * width + width / 2} ${hy * height + height} L ${hx * width} ${hy * height + (height * 3) / 4} L ${hx * width} ${hy * height + height / 4} Z`}
                className={`${fillClass} filter drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]`}
                strokeWidth={1.8}
              />
            );
          })}
        </svg>
      )}
    </svg>
  );
}

// ── 2. FLOWER & LEAF ASSETS FOR THE BRANCH ──
interface FlowerNode {
  x: number;
  y: number;
  rotation: number;
  type: 'pink_blossom' | 'rose_flower' | 'white_bloom' | 'leaf_cluster' | 'bud_sprout';
  threshold: number; // Progress percentage (0-100) when it blooms
  scale?: number;
}

const flowerNodes: FlowerNode[] = [
  { x: 120, y: 55, rotation: -25, type: 'leaf_cluster', threshold: 7, scale: 0.9 },
  { x: 240, y: 100, rotation: 15, type: 'pink_blossom', threshold: 14, scale: 1.1 },
  { x: 360, y: 155, rotation: 40, type: 'white_bloom', threshold: 22, scale: 1.0 },
  { x: 480, y: 100, rotation: -18, type: 'rose_flower', threshold: 30, scale: 1.15 },
  { x: 600, y: 45, rotation: -35, type: 'pink_blossom', threshold: 38, scale: 1.05 },
  { x: 720, y: 100, rotation: 20, type: 'leaf_cluster', threshold: 46, scale: 0.95 },
  { x: 840, y: 155, rotation: 35, type: 'white_bloom', threshold: 53, scale: 1.1 },
  { x: 960, y: 100, rotation: 0, type: 'rose_flower', threshold: 60, scale: 1.25 }, // Centerpiece
  { x: 1080, y: 45, rotation: -28, type: 'pink_blossom', threshold: 68, scale: 1.05 },
  { x: 1200, y: 100, rotation: 15, type: 'leaf_cluster', threshold: 74, scale: 0.95 },
  { x: 1320, y: 155, rotation: 42, type: 'rose_flower', threshold: 80, scale: 1.1 },
  { x: 1440, y: 100, rotation: -12, type: 'white_bloom', threshold: 86, scale: 1.0 },
  { x: 1580, y: 50, rotation: -30, type: 'pink_blossom', threshold: 92, scale: 1.1 },
  { x: 1760, y: 140, rotation: 25, type: 'leaf_cluster', threshold: 96, scale: 0.9 },
];

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [shouldRemove, setShouldRemove] = useState(false);

  useEffect(() => {
    // Reset scroll to top on page load/refresh & lock body scroll
    if (typeof window !== 'undefined') {
      try {
        window.history.scrollRestoration = 'manual';
      } catch {}
      window.scrollTo(0, 0);
      (window as any).__preloaderDone = false;
    }
    document.body.style.overflow = 'hidden';

    const startTime = performance.now();
    const duration = 5000; // 5.0 seconds smooth progress as requested

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);
      
      // Gentle natural easeOut curve
      const easeProgress = 1 - Math.pow(1 - rawProgress, 2.0);
      const currentPercent = Math.min(100, Math.floor(easeProgress * 100));

      setProgress(currentPercent);

      if (rawProgress < 1) {
        requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        // Short hold at 100% then slide out gracefully
        setTimeout(() => {
          setIsDone(true);
          document.body.style.overflow = '';
          if (typeof window !== 'undefined') {
            (window as any).__preloaderDone = true;
            window.dispatchEvent(new CustomEvent('preloaderComplete'));
          }
          setTimeout(() => {
            setShouldRemove(true);
          }, 950);
        }, 400);
      }
    };

    const animId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animId);
      document.body.style.overflow = '';
    };
  }, []);

  if (shouldRemove) return null;

  // Full-width edge-to-edge undulating branch wave path (0 to 1920px)
  const fullBranchPath = "M 0 100 C 60 25, 180 25, 240 100 C 300 175, 420 175, 480 100 C 540 25, 660 25, 720 100 C 780 175, 900 175, 960 100 C 1020 25, 1140 25, 1200 100 C 1260 175, 1380 175, 1440 100 C 1500 25, 1620 25, 1680 100 C 1740 175, 1860 175, 1920 100";

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="site-preloader"
          initial={{ y: 0 }}
          exit={{ 
            y: '-100%',
            transition: { 
              duration: 0.9, 
              ease: [0.76, 0, 0.24, 1] 
            } 
          }}
          className="fixed inset-0 z-[99999] flex flex-col justify-between bg-[#f8faf9] text-[#1a1a1a] overflow-hidden select-none"
        >
          {/* ══════════════════════════════════════════════════════════
              FULL-SCREEN PROMINENT GLOWING HEXAGON BACKGROUND
             ══════════════════════════════════════════════════════════ */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <HexagonPattern
              width={64}
              height={64}
              className="inset-0 skew-y-6 opacity-95 mask-[radial-gradient(1400px_circle_at_center,white,transparent)]"
            />
            {/* Ambient Multi-hue Radiant Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[600px] bg-gradient-to-r from-blue-400/15 via-emerald-400/12 to-pink-400/15 rounded-full blur-[150px] pointer-events-none" />
          </div>

          {/* ── Top Header Row ── */}
          <div className="relative z-10 w-full px-6 sm:px-12 pt-6 sm:pt-8 flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/95 border border-slate-200 shadow-xs backdrop-blur-md"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-800">
                Usama Faheem • Portfolio
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[11px] font-mono text-slate-600 font-bold tracking-wider hidden sm:block bg-white/70 px-3 py-1 rounded-md border border-slate-200/60"
            >
              FULL-STACK DEVELOPER
            </motion.div>
          </div>

          {/* ══════════════════════════════════════════════════════════
              CENTER STAGE: BLOOMING TREE BRANCH & PROGRESS COUNTER
             ══════════════════════════════════════════════════════════ */}
          <div className="relative z-10 w-full flex flex-col items-center justify-center my-auto">
            
            {/* ── Center Digital Progress Counter ── */}
            <div className="mb-3 sm:mb-6 flex flex-col items-center">
              <div className="flex items-baseline gap-1">
                <span className="text-6xl sm:text-7xl lg:text-8xl font-black font-mono tracking-tighter text-[#0f172a] drop-shadow-xs">
                  {progress}
                </span>
                <span className="text-3xl sm:text-4xl font-bold font-mono text-emerald-600">
                  %
                </span>
              </div>

              {/* Status Micro-text */}
              <div className="mt-2 flex items-center gap-2 text-xs font-mono text-slate-600 uppercase tracking-widest font-semibold bg-white/85 px-4 py-1.5 rounded-full border border-slate-200/80 shadow-2xs">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>
                  {progress < 25
                    ? 'Sprouting Creative Modules...'
                    : progress < 60
                    ? 'Blooming Full-Stack Architecture...'
                    : progress < 90
                    ? 'Finalizing Interactive Ecosystem...'
                    : 'System Ready • Welcome!'}
                </span>
              </div>
            </div>

            {/* ══════════════════════════════════════════════════════════
                EDGE-TO-EDGE FLOWERING TREE BRANCH / VINE WAVE (100% WIDTH)
               ══════════════════════════════════════════════════════════ */}
            <div className="w-full relative h-[100px] sm:h-[130px] flex items-center justify-center overflow-visible">
              
              {/* Background faint branch guide track */}
              <svg
                viewBox="0 0 1920 200"
                preserveAspectRatio="none"
                fill="none"
                className="w-full h-full absolute inset-0 opacity-20"
              >
                <path
                  d={fullBranchPath}
                  stroke="#94a3b8"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>

              {/* Active Animated Flowering Tree Branch & Flowers */}
              <svg
                viewBox="0 0 1920 200"
                preserveAspectRatio="none"
                fill="none"
                className="w-full h-full relative z-10 overflow-visible"
              >
                <defs>
                  {/* Organic Botanical Stem Gradient */}
                  <linearGradient id="branchGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#059669" />
                    <stop offset="35%" stopColor="#10b981" />
                    <stop offset="65%" stopColor="#2563eb" />
                    <stop offset="90%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#f43f5e" />
                  </linearGradient>

                  {/* Soft Radiant Glow Filter */}
                  <filter id="branchGlow" x="-10%" y="-30%" width="120%" height="160%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.1   0 0 0 0 0.7   0 0 0 0 0.4  0 0 0 0.3 0" />
                    <feMerge>
                      <feMergeNode />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* 1. Outer Soft Glowing Branch Stroke */}
                <motion.path
                  d={fullBranchPath}
                  stroke="url(#branchGradient)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  filter="url(#branchGlow)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: progress / 100 }}
                  transition={{ duration: 0.1, ease: 'linear' }}
                />

                {/* 2. Main Wooden/Vine Branch Stem */}
                <motion.path
                  d={fullBranchPath}
                  stroke="#047857"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: progress / 100 }}
                  transition={{ duration: 0.1, ease: 'linear' }}
                />

                {/* 3. Inner Vivid Green Highlight Line */}
                <motion.path
                  d={fullBranchPath}
                  stroke="#34d399"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: progress / 100 }}
                  transition={{ duration: 0.1, ease: 'linear' }}
                />

                {/* ── 4. BLOOMING FLOWERS & LEAVES ALONG THE BRANCH ── */}
                {flowerNodes.map((node, i) => {
                  const hasBloomed = progress >= node.threshold;

                  return (
                    <g
                      key={`flower-node-${i}`}
                      transform={`translate(${node.x}, ${node.y}) rotate(${node.rotation}) scale(${node.scale || 1})`}
                      className="transition-all duration-500 ease-out"
                      style={{
                        opacity: hasBloomed ? 1 : 0,
                        transformOrigin: '0 0',
                      }}
                    >
                      {/* Leaf Petiole / Small Stems */}
                      <path
                        d="M 0 0 Q -10 -15 -18 -22"
                        stroke="#059669"
                        strokeWidth="2"
                        strokeLinecap="round"
                        fill="none"
                      />
                      <path
                        d="M 0 0 Q 12 14 20 20"
                        stroke="#059669"
                        strokeWidth="2"
                        strokeLinecap="round"
                        fill="none"
                      />

                      {/* Leaf 1 (Top Left) */}
                      <path
                        d="M -18 -22 C -28 -30 -35 -24 -30 -14 C -25 -6 -18 -18 -18 -22 Z"
                        fill="#10b981"
                        stroke="#047857"
                        strokeWidth="1"
                      />

                      {/* Leaf 2 (Bottom Right) */}
                      <path
                        d="M 20 20 C 30 28 36 22 30 12 C 24 4 18 16 20 20 Z"
                        fill="#34d399"
                        stroke="#059669"
                        strokeWidth="1"
                      />

                      {/* Flower Type 1: Pink Cherry Blossom */}
                      {node.type === 'pink_blossom' && (
                        <g transform="translate(0, 0)">
                          {/* 5 Petals */}
                          <circle cx="0" cy="-11" r="7" fill="#f472b6" opacity="0.95" />
                          <circle cx="10" cy="-3" r="7" fill="#fb7185" opacity="0.95" />
                          <circle cx="6" cy="9" r="7" fill="#f472b6" opacity="0.95" />
                          <circle cx="-6" cy="9" r="7" fill="#fda4af" opacity="0.95" />
                          <circle cx="-10" cy="-3" r="7" fill="#fb7185" opacity="0.95" />
                          {/* Flower Center Golden Stamen */}
                          <circle cx="0" cy="0" r="4.5" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1" />
                          <circle cx="0" cy="0" r="2" fill="#d97706" />
                        </g>
                      )}

                      {/* Flower Type 2: Rose / Vibrant Coral Blossom */}
                      {node.type === 'rose_flower' && (
                        <g transform="translate(0, 0)">
                          {/* Outer Petals */}
                          <circle cx="0" cy="-13" r="8" fill="#f43f5e" />
                          <circle cx="12" cy="-4" r="8" fill="#e11d48" />
                          <circle cx="7" cy="11" r="8" fill="#f43f5e" />
                          <circle cx="-7" cy="11" r="8" fill="#fb7185" />
                          <circle cx="-12" cy="-4" r="8" fill="#e11d48" />
                          {/* Inner Layer */}
                          <circle cx="0" cy="0" r="7" fill="#fff1f2" stroke="#e11d48" strokeWidth="1.5" />
                          <circle cx="0" cy="0" r="3.5" fill="#fbbf24" />
                        </g>
                      )}

                      {/* Flower Type 3: White Jasmine / Spring Bloom */}
                      {node.type === 'white_bloom' && (
                        <g transform="translate(0, 0)">
                          {/* White Star Petals */}
                          <ellipse cx="0" cy="-11" rx="5" ry="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
                          <ellipse cx="11" cy="0" rx="8" ry="5" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
                          <ellipse cx="0" cy="11" rx="5" ry="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
                          <ellipse cx="-11" cy="0" rx="8" ry="5" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
                          {/* Golden Center */}
                          <circle cx="0" cy="0" r="4.5" fill="#f59e0b" />
                          <circle cx="0" cy="0" r="2" fill="#ffffff" />
                        </g>
                      )}

                      {/* Flower Type 4 & 5: Extra Leaf Sprouts & Golden Buds */}
                      {(node.type === 'leaf_cluster' || node.type === 'bud_sprout') && (
                        <g transform="translate(0, 0)">
                          <circle cx="-6" cy="-6" r="4" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
                          <circle cx="6" cy="6" r="3.5" fill="#f472b6" />
                          <circle cx="0" cy="0" r="3" fill="#10b981" />
                        </g>
                      )}
                    </g>
                  );
                })}
              </svg>

            </div>

          </div>

          {/* ── Bottom Footer Row ── */}
          <div className="relative z-10 w-full px-6 sm:px-12 pb-6 sm:pb-8 flex items-center justify-between text-[11px] font-mono text-slate-500 font-semibold uppercase tracking-widest">
            <div className="flex items-center gap-4 sm:gap-6 bg-white/70 px-4 py-1.5 rounded-full border border-slate-200/60 shadow-2xs">
              <span>Next.js 15</span>
              <span className="w-1 h-1 rounded-full bg-slate-400" />
              <span>React 19</span>
              <span className="w-1 h-1 rounded-full bg-slate-400" />
              <span>Tailwind CSS</span>
            </div>
            <div className="hidden sm:block text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200/80 font-bold">
              PORTFOLIO INITIALIZATION • 2026
            </div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
