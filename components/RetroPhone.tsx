'use client';

import React, { useState, useRef, useId } from 'react';
import { motion, useInView } from 'framer-motion';
import { PhoneCall } from 'lucide-react';

/* ══════════════════════════════════════════════════════════════════════════════
   1. RETRO RED TELEPHONE HANDSET (RESTORED TO FULL ORIGINAL 3D SIZE & FIDELITY)
   Width: 162px, Height: 520px — Large, bold, studio-shaded & interactive
   ══════════════════════════════════════════════════════════════════════════════ */
export function RetroPhoneHandset({
  className = '',
  onCallClick,
  hovered,
  onHoverChange,
  isInView,
}: {
  className?: string;
  onCallClick?: () => void;
  hovered?: boolean;
  onHoverChange?: (v: boolean) => void;
  isInView?: boolean;
}) {
  const [internalHover, setInternalHover] = useState(false);
  const isHovered = hovered !== undefined ? hovered : internalHover;
  const fallbackRef = useRef<HTMLDivElement>(null);
  const internalInView = useInView(fallbackRef, { once: true, amount: 0.15 });
  const activeInView = isInView !== undefined ? isInView : internalInView;

  const handleMouseEnter = () => {
    setInternalHover(true);
    onHoverChange?.(true);
  };

  const handleMouseLeave = () => {
    setInternalHover(false);
    onHoverChange?.(false);
  };

  const handleCall = () => {
    if (onCallClick) {
      onCallClick();
    } else {
      window.open('https://wa.me/923143416588', '_blank');
    }
  };

  return (
    <div ref={fallbackRef} className={`relative select-none pointer-events-auto ${className}`}>
      {/* ── Handset pivots around its bottom strain-relief plug (81px, 502px) so wire stays 100% attached ── */}
      <motion.div
        style={{ transformOrigin: '81px 502px' }}
        initial={{ rotate: -8, scale: 0.95 }}
        animate={
          activeInView
            ? { rotate: 0, scale: 1 }
            : { rotate: -8, scale: 0.95 }
        }
        transition={{
          type: 'spring',
          stiffness: 85,
          damping: 15,
          mass: 0.9,
          delay: 0.15,
        }}
        className="relative"
      >
        {/* Playful Vintage Telephone "RING-RING" Wobble on landing + Interactive Hover response */}
        <motion.div
          style={{ transformOrigin: '81px 502px' }}
          animate={
            isHovered
              ? {
                  rotate: [-2, 2.2, -2.2, 1.5, 0],
                  y: -8,
                  scale: 1.03,
                  transition: { duration: 0.45, ease: 'easeInOut' },
                }
              : activeInView
              ? {
                  rotate: [0, 0, -4.5, 4.5, -3.5, 3.5, -2, 2, -1, 1, 0],
                  y: [0, 0, -2.5, 2.5, -2, 2, -1, 1, 0],
                  scale: [1, 1, 1.025, 1.025, 1.015, 1],
                  transition: {
                    duration: 0.75,
                    delay: 0.55,
                    ease: 'easeInOut',
                  },
                }
              : { rotate: 0, y: 0, scale: 1 }
          }
          whileTap={{ scale: 0.97 }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleCall}
          className="relative cursor-pointer group"
          title="Click to call / WhatsApp Usama"
        >
        {/* Soft Ambient Red Pulse on Hover */}
        <div className="absolute -inset-5 bg-red-500/25 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Floating Call Badge (Always visible & continuously animating with floating bob and ringing phone icon) */}
        <motion.div
          initial={{ opacity: 1, y: 0, scale: 1 }}
          animate={
            isHovered
              ? { opacity: 1, y: -7, scale: 1.05 }
              : {
                  opacity: 1,
                  scale: 1,
                  y: [0, -5, 0],
                }
          }
          transition={
            isHovered
              ? { duration: 0.25, ease: 'easeOut' }
              : {
                  y: {
                    repeat: Infinity,
                    duration: 2.6,
                    ease: 'easeInOut',
                  },
                }
          }
          className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-950/95 backdrop-blur-md text-white text-[11px] font-bold font-mono tracking-wider px-3.5 py-1.5 rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.35)] whitespace-nowrap z-50 flex items-center gap-2 pointer-events-none border border-white/10"
        >
          <motion.div
            animate={{
              rotate: [0, -15, 15, -12, 12, -6, 6, 0],
              scale: [1, 1.15, 1.15, 1.1, 1.1, 1.05, 1.05, 1],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              repeatDelay: 1.6,
              ease: 'easeInOut',
            }}
          >
            <PhoneCall className="w-3.5 h-3.5 text-red-400" />
          </motion.div>
          <span>PICK UP / CALL USAMA</span>
        </motion.div>

        {/* 
            Full-Sized 3D Handset SVG:
            Width: 162px, Height: 520px (Restored to original large, impressive dimensions)
        */}
        <svg
          aria-hidden="true"
          width="162"
          height="520"
          viewBox="0 0 128 412"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible filter drop-shadow-[0_24px_38px_rgba(0,0,0,0.30)]"
        >
          <defs>
            {/* Handset Body Plastic Gradient - Rich Vintage Tomato Red */}
            <linearGradient id="phoneBodyGradLg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff6750" />
              <stop offset="10%" stopColor="#f33820" />
              <stop offset="45%" stopColor="#db1e08" />
              <stop offset="80%" stopColor="#b31202" />
              <stop offset="100%" stopColor="#6e0a00" />
            </linearGradient>

            {/* Specular Highlight Streak */}
            <linearGradient id="phoneHandleGlossLg" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.88" />
              <stop offset="35%" stopColor="#ffffff" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            {/* Dome Cup Gradient - Vivid 3D Tomato Red */}
            <radialGradient id="cupDomeLg" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ff7e6a" />
              <stop offset="28%" stopColor="#f2351c" />
              <stop offset="68%" stopColor="#c51805" />
              <stop offset="88%" stopColor="#961002" />
              <stop offset="100%" stopColor="#5c0700" />
            </radialGradient>

            {/* Inset Acoustic Dish Gradient */}
            <radialGradient id="acousticDishLg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1a0200" />
              <stop offset="65%" stopColor="#450501" />
              <stop offset="88%" stopColor="#730d02" />
              <stop offset="100%" stopColor="#991403" />
            </radialGradient>

            {/* Rim Specular Crescent */}
            <linearGradient id="rimSpecularGlintLg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="55%" stopColor="#ffffff" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* ── Ambient Contact Drop Shadow on Desk Surface ── */}
          <g opacity="0.48">
            <ellipse cx="76" cy="74" rx="42" ry="44" fill="#000000" filter="blur(16px)" />
            <ellipse cx="76" cy="326" rx="42" ry="44" fill="#000000" filter="blur(16px)" />
            <rect x="56" y="80" width="42" height="230" rx="18" fill="#000000" filter="blur(14px)" />
          </g>

          {/* ── Central Ergonomic Handle ── */}
          <path
            d="M 44 80 
               C 43 125, 46 175, 46 205
               C 46 235, 43 285, 44 330
               C 54 334, 74 334, 84 330
               C 85 285, 82 235, 82 205
               C 82 175, 85 125, 84 80
               Z"
            fill="url(#phoneBodyGradLg)"
          />

          {/* Specular Highlight along Left Ridge of Handle */}
          <path
            d="M 46 90
               C 45 130, 48 175, 48 205
               C 48 235, 45 280, 46 320
               C 49 320, 52 320, 53 320
               C 52 280, 55 235, 55 205
               C 55 175, 52 130, 53 90
               Z"
            fill="url(#phoneHandleGlossLg)"
          />

          {/* Authentic CE Mark & Stamp as seen in reference photo */}
          <g opacity="0.35">
            <text
              x="64"
              y="180"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="8.5"
              fontFamily="system-ui, -apple-system, sans-serif"
              fontWeight="900"
              letterSpacing="1.5"
            >
              CE
            </text>
            <circle cx="64" cy="194" r="4.2" stroke="#ffffff" strokeWidth="0.8" fill="none" strokeDasharray="3 1.8" />
          </g>

          {/* ── TOP EARPIECE (CIRCULAR CUP & CONCENTRIC ACOUSTIC HOLES) ── */}
          <g>
            <circle cx="64" cy="70" r="45" fill="url(#cupDomeLg)" />
            <circle cx="64" cy="70" r="43" stroke="#ff7b65" strokeWidth="1.2" fill="none" opacity="0.75" />
            <circle cx="64" cy="70" r="41" stroke="#520700" strokeWidth="1.6" fill="none" opacity="0.85" />
            <circle cx="64" cy="70" r="36" fill="url(#acousticDishLg)" />
            <circle cx="64" cy="70" r="36" stroke="#2b0300" strokeWidth="1.5" fill="none" />

            {/* Concentric Acoustic Circles */}
            <circle cx="64" cy="70" r="28" stroke="#e02812" strokeWidth="2.2" fill="none" strokeDasharray="2.5 3.2" opacity="0.85" />
            <circle cx="64" cy="70" r="21" stroke="#e02812" strokeWidth="2.2" fill="none" strokeDasharray="2.5 3" opacity="0.9" />
            <circle cx="64" cy="70" r="14" stroke="#ff4d36" strokeWidth="2.2" fill="none" strokeDasharray="2.2 2.8" opacity="0.9" />
            <circle cx="64" cy="70" r="7" stroke="#ff6e5a" strokeWidth="1.8" fill="none" strokeDasharray="2 2.2" opacity="0.95" />
            <circle cx="64" cy="70" r="2.6" fill="#170100" />

            {/* Specular Curved Glint on Upper Rim */}
            <path d="M 33 55 C 40 36, 73 32, 93 44" stroke="url(#rimSpecularGlintLg)" strokeWidth="3.2" strokeLinecap="round" fill="none" />
          </g>

          {/* ── BOTTOM MOUTHPIECE (CIRCULAR CUP & MICROPHONE HOLES) ── */}
          <g>
            <circle cx="64" cy="330" r="45" fill="url(#cupDomeLg)" />
            <circle cx="64" cy="330" r="43" stroke="#ff7b65" strokeWidth="1.2" fill="none" opacity="0.75" />
            <circle cx="64" cy="330" r="41" stroke="#520700" strokeWidth="1.6" fill="none" opacity="0.85" />
            <circle cx="64" cy="330" r="36" fill="url(#acousticDishLg)" />
            <circle cx="64" cy="330" r="36" stroke="#2b0300" strokeWidth="1.5" fill="none" />

            {/* Concentric Acoustic Circles */}
            <circle cx="64" cy="330" r="28" stroke="#e02812" strokeWidth="2.2" fill="none" strokeDasharray="2.5 3.2" opacity="0.85" />
            <circle cx="64" cy="330" r="21" stroke="#e02812" strokeWidth="2.2" fill="none" strokeDasharray="2.5 3" opacity="0.9" />
            <circle cx="64" cy="330" r="14" stroke="#ff4d36" strokeWidth="2.2" fill="none" strokeDasharray="2.2 2.8" opacity="0.9" />
            <circle cx="64" cy="330" r="7" stroke="#ff6e5a" strokeWidth="1.8" fill="none" strokeDasharray="2 2.2" opacity="0.95" />
            <circle cx="64" cy="330" r="2.6" fill="#170100" />

            {/* Specular Curved Glint on Upper Rim */}
            <path d="M 33 315 C 40 296, 73 292, 93 304" stroke="url(#rimSpecularGlintLg)" strokeWidth="3.2" strokeLinecap="round" fill="none" />
          </g>

          {/* ── CABLE STRAIN RELIEF BOOT (WHERE WIRE EMERGES) ── */}
          <g>
            <path
              d="M 58 375 
                 C 58 382, 60 392, 61 398
                 C 62 400, 66 400, 67 398
                 C 68 392, 70 382, 70 375
                 Z"
              fill="#b31202"
              stroke="#5c0800"
              strokeWidth="0.8"
            />
            <line x1="59" y1="381" x2="69" y2="381" stroke="#420600" strokeWidth="1.2" />
            <line x1="60" y1="387" x2="68" y2="387" stroke="#420600" strokeWidth="1.2" />
            <line x1="61" y1="393" x2="67" y2="393" stroke="#420600" strokeWidth="1.2" />
          </g>
        </svg>
      </motion.div>
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   2. RETRO COILED TELEPHONE WIRE (HORIZONTAL RUNNING BELOW FORM, CLEARANCE & CONTINUATION)
   Runs horizontally safely below the form without touching it, and continues forward across.
   ══════════════════════════════════════════════════════════════════════════════ */
export function RetroTelephoneCord({
  className = '',
  width = 920,
  wireBottomY = 620,
  handsetPlugX = 81,
  handsetPlugY = 502,
  coilStartX = 170,
  isInView,
}: {
  className?: string;
  width?: number;
  wireBottomY?: number;
  handsetPlugX?: number;
  handsetPlugY?: number;
  coilStartX?: number;
  isHovered?: boolean;
  isInView?: boolean;
}) {
  const clipId = useId();
  const clipPathId = `wireClip_${clipId.replace(/:/g, '')}`;

  const cordContainerRef = useRef<HTMLDivElement>(null);
  const internalInView = useInView(cordContainerRef, { once: true, amount: 0.15 });
  const activeInView = isInView !== undefined ? isInView : internalInView;

  const effectiveCoilStart = Math.min(coilStartX, width - 80);
  const coilEndX = width - 70;
  const coilPitch = 10.2;
  const numCoils = Math.max(8, Math.floor((coilEndX - effectiveCoilStart) / coilPitch));
  const coils = Array.from({ length: numCoils }, (_, i) => ({
    id: i,
    x: effectiveCoilStart + i * coilPitch,
  }));

  // Dynamic midpoint for the natural gravity slack loop under the handset
  const yMid = handsetPlugY + Math.max(wireBottomY - handsetPlugY, 50) * 0.52;

  const leadPathD = `M ${handsetPlugX} ${handsetPlugY} 
      C ${handsetPlugX} ${handsetPlugY + 25}, 80 ${handsetPlugY + 45}, 76 ${yMid - 25} 
      C 70 ${yMid - 5}, 58 ${yMid + 15}, 64 ${yMid + 32} 
      C 70 ${yMid + 46}, 90 ${yMid + 42}, 100 ${yMid + 24} 
      C 110 ${yMid + 6}, 108 ${yMid - 15}, 120 ${yMid + 5} 
      C 130 ${yMid + 25}, 136 ${wireBottomY - 8}, 145 ${wireBottomY - 2} 
      C 149 ${wireBottomY}, 152 ${wireBottomY}, ${effectiveCoilStart} ${wireBottomY}`;

  const leadHighlightD = `M ${handsetPlugX + 1} ${handsetPlugY + 2} 
      C ${handsetPlugX + 1} ${handsetPlugY + 24}, 81 ${handsetPlugY + 43}, 77 ${yMid - 26} 
      C 71 ${yMid - 6}, 59 ${yMid + 14}, 65 ${yMid + 30} 
      C 71 ${yMid + 44}, 89 ${yMid + 40}, 99 ${yMid + 23} 
      C 109 ${yMid + 5}, 107 ${yMid - 14}, 119 ${yMid + 4} 
      C 129 ${yMid + 23}, 135 ${wireBottomY - 9}, 144 ${wireBottomY - 3}`;

  return (
    <div
      ref={cordContainerRef}
      className={`relative overflow-visible pointer-events-none select-none ${className}`}
    >
      <svg
        width={width + 50}
        height={wireBottomY + 50}
        viewBox={`0 0 ${width + 50} ${wireBottomY + 50}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible pointer-events-none"
      >
        <defs>
          {/* Wire Coil 3D Shading - Classic Vintage Red */}
          <linearGradient id="wireGradUnified" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ff705a" />
            <stop offset="28%" stopColor="#f0331a" />
            <stop offset="70%" stopColor="#b81503" />
            <stop offset="100%" stopColor="#660900" />
          </linearGradient>

          {/* Specular Highlight for Lead Wire */}
          <linearGradient id="wireLeadShine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffb5aa" />
            <stop offset="50%" stopColor="#ff6a55" />
            <stop offset="100%" stopColor="#b81503" />
          </linearGradient>

          {/* Ambient Shadow Filter for Coiled Cord */}
          <filter id="wireShadowUnified" x="-10%" y="-30%" width="120%" height="180%">
            <feDropShadow dx="1" dy="3.5" stdDeviation="2.8" floodColor="#000000" floodOpacity="0.25" />
          </filter>

          {/* ── Dynamic Uncoiling Reveal ClipPath (Rolls out seamlessly from left to right) ── */}
          <clipPath id={clipPathId}>
            <motion.rect
              initial={{ width: 0 }}
              animate={activeInView ? { width: width - effectiveCoilStart + 120 } : { width: 0 }}
              transition={{
                duration: 1.0,
                delay: 0.55,
                ease: [0.16, 1, 0.3, 1],
              }}
              x={effectiveCoilStart - 10}
              y={0}
              height={wireBottomY + 80}
            />
          </clipPath>
        </defs>

        {/* ── 1. NATURAL SLACK TELEPHONE CORD LOOP CONNECTING HANDSET TO HORIZONTAL COILS ── */}
        <g>
          {/* Shadow of the lead loop */}
          <motion.path
            d={leadPathD}
            stroke="#000000"
            strokeWidth="4.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.22"
            filter="blur(4px)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={activeInView ? { pathLength: 1, opacity: 0.22 } : { pathLength: 0, opacity: 0 }}
            transition={{
              pathLength: { duration: 0.55, delay: 0.25, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.2, delay: 0.25 },
            }}
          />

          {/* Lead Wire 3D Core Stroke */}
          <motion.path
            d={leadPathD}
            stroke="url(#wireGradUnified)"
            strokeWidth="4.2"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={activeInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{
              pathLength: { duration: 0.55, delay: 0.25, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.2, delay: 0.25 },
            }}
          />

          {/* Lead Wire Specular Highlight Stripe */}
          <motion.path
            d={leadHighlightD}
            stroke="#ffb7ab"
            strokeWidth="1.3"
            strokeLinecap="round"
            fill="none"
            opacity="0.85"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={activeInView ? { pathLength: 1, opacity: 0.85 } : { pathLength: 0, opacity: 0 }}
            transition={{
              pathLength: { duration: 0.55, delay: 0.25, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.2, delay: 0.25 },
            }}
          />
        </g>

        {/* ── 2. ANIMATED REVEAL OF HORIZONTAL COILED ROW + CONTINUATION TAIL ── */}
        <g clipPath={`url(#${clipPathId})`}>
          {/* Ambient Desk Shadow Under Horizontal Row */}
          <ellipse
            cx={(effectiveCoilStart + coilEndX + 40) / 2}
            cy={wireBottomY + 8}
            rx={Math.max((coilEndX - effectiveCoilStart + 50) / 2, 40)}
            ry="7"
            fill="#000000"
            opacity="0.20"
            filter="blur(5px)"
          />

          {/* 3D Helical Coils */}
          <motion.g
            initial={{ opacity: 0, y: 6 }}
            animate={activeInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            filter="url(#wireShadowUnified)"
          >
            {coils.map((coil) => (
              <g key={coil.id}>
                {/* Back half of coil loop */}
                <ellipse
                  cx={coil.x}
                  cy={wireBottomY}
                  rx={4.8}
                  ry={12}
                  transform={`rotate(-12 ${coil.x} ${wireBottomY})`}
                  stroke="#540800"
                  strokeWidth="3.6"
                  fill="none"
                  opacity="0.94"
                />

                {/* Front half of coil loop */}
                <path
                  d={`M ${coil.x - 3.8} ${wireBottomY - 9} 
                      C ${coil.x - 4.2} ${wireBottomY - 14}, ${coil.x + 3.2} ${wireBottomY - 14}, ${coil.x + 4.6} ${wireBottomY - 9}
                      C ${coil.x + 6} ${wireBottomY - 3}, ${coil.x + 3.5} ${wireBottomY + 8}, ${coil.x - 1} ${wireBottomY + 11}`}
                  stroke="url(#wireGradUnified)"
                  strokeWidth="3.8"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Top loop crest highlight */}
                <path
                  d={`M ${coil.x - 1.4} ${wireBottomY - 12.5} C ${coil.x} ${wireBottomY - 13}, ${coil.x + 2} ${wireBottomY - 12.5}, ${coil.x + 3.2} ${wireBottomY - 10.5}`}
                  stroke="#ffb7ab"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.9"
                />
              </g>
            ))}
          </motion.g>

          {/* Continuation Tail Past Form to Right */}
          <g>
            <path
              d={`M ${coilEndX - 1} ${wireBottomY} 
                  C ${coilEndX + 16} ${wireBottomY}, ${coilEndX + 32} ${wireBottomY - 3}, ${coilEndX + 48} ${wireBottomY + 2} 
                  C ${coilEndX + 62} ${wireBottomY + 6}, ${coilEndX + 74} ${wireBottomY + 3}, ${coilEndX + 88} ${wireBottomY}`}
              stroke="#000000"
              strokeWidth="4.2"
              strokeLinecap="round"
              fill="none"
              opacity="0.20"
              filter="blur(3px)"
            />

            <path
              d={`M ${coilEndX - 1} ${wireBottomY} 
                  C ${coilEndX + 16} ${wireBottomY}, ${coilEndX + 32} ${wireBottomY - 3}, ${coilEndX + 48} ${wireBottomY + 2} 
                  C ${coilEndX + 62} ${wireBottomY + 6}, ${coilEndX + 74} ${wireBottomY + 3}, ${coilEndX + 88} ${wireBottomY}`}
              stroke="url(#wireGradUnified)"
              strokeWidth="3.8"
              strokeLinecap="round"
              fill="none"
            />

            <path
              d={`M ${coilEndX} ${wireBottomY - 1} 
                  C ${coilEndX + 16} ${wireBottomY - 1}, ${coilEndX + 32} ${wireBottomY - 4}, ${coilEndX + 48} ${wireBottomY + 1} 
                  C ${coilEndX + 62} ${wireBottomY + 5}, ${coilEndX + 74} ${wireBottomY + 2}, ${coilEndX + 88} ${wireBottomY - 1}`}
              stroke="#ffb7ab"
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
              opacity="0.8"
            />

            <circle cx={coilEndX + 88} cy={wireBottomY} r="3" fill="#800b00" stroke="#420600" strokeWidth="0.8" />
          </g>
        </g>
      </svg>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   3. DEFAULT COMPOSITE RETRO PHONE EXPORT
   ══════════════════════════════════════════════════════════════════════════════ */
export default function RetroPhone({
  className = '',
  onCallClick,
  cordWidth = 920,
  wireBottomY = 620,
  coilStartX = 170,
}: {
  className?: string;
  onCallClick?: () => void;
  cordWidth?: number;
  wireBottomY?: number;
  coilStartX?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, x: -40, y: -20 }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -40, y: -20 }}
      transition={{
        type: 'spring',
        stiffness: 75,
        damping: 16,
        mass: 0.9,
        delay: 0.1,
      }}
      className={`relative select-none ${className}`}
    >
      {/* Handset on Left (z-30) */}
      <div className="relative z-30 pointer-events-auto">
        <RetroPhoneHandset
          onCallClick={onCallClick}
          hovered={isHovered}
          onHoverChange={setIsHovered}
          isInView={isInView}
        />
      </div>

      {/* Coiled Wire extending below & across (z-20 so it is visible in front along the bottom edge) */}
      <div className="absolute top-0 left-0 z-20 pointer-events-none overflow-visible">
        <RetroTelephoneCord
          width={cordWidth}
          wireBottomY={wireBottomY}
          handsetPlugX={81}
          handsetPlugY={502}
          coilStartX={coilStartX}
          isHovered={isHovered}
          isInView={isInView}
        />
      </div>
    </motion.div>
  );
}

