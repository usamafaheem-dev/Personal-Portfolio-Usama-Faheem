'use client';

import { motion } from 'framer-motion';

export default function DoodlesOverlay({ visible }: { visible: boolean }) {
  if (!visible) return null;

  return (
    <div
      className="hidden sm:block absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
      style={{ fontFamily: 'var(--font-caveat)' }}
    >
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#c2410c" />
          </marker>
        </defs>

        {/* Arrow 1: To React/Next.js */}
        <motion.path
          d="M 270 140 Q 330 130 340 190"
          fill="none"
          stroke="#c2410c"
          strokeWidth="2.5"
          strokeDasharray="4 4"
          markerEnd="url(#arrow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ delay: 3.2, duration: 0.8 }}
        />

        {/* Arrow 2: To Specialty */}
        <motion.path
          d="M 160 340 Q 220 330 270 370"
          fill="none"
          stroke="#c2410c"
          strokeWidth="2.5"
          strokeDasharray="4 4"
          markerEnd="url(#arrow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ delay: 3.8, duration: 0.8 }}
        />

        {/* Arrow 3: To 3D Web */}
        <motion.path
          d="M 640 130 Q 560 110 520 200"
          fill="none"
          stroke="#c2410c"
          strokeWidth="2.5"
          strokeDasharray="4 4"
          markerEnd="url(#arrow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ delay: 3.5, duration: 0.8 }}
        />
      </svg>

      {/* Left Top: Fave Stack */}
      <motion.div
        initial={{ opacity: 0, x: -30, rotate: -8 }}
        animate={{ opacity: 1, x: 0, rotate: -8 }}
        transition={{ delay: 3.0, duration: 0.6 }}
        className="absolute top-[14%] left-[4%] sm:left-[8%] lg:left-[10%] text-black text-lg sm:text-2xl md:text-3xl lg:text-4xl max-w-[130px] sm:max-w-[180px] lg:max-w-[200px] leading-tight"
      >
        <span className="text-orange-700 text-[10px] sm:text-xs font-sans font-bold uppercase block tracking-wider">fave stack?</span>
        React &amp; Next.js 🚀
      </motion.div>

      {/* Left Middle: Specialty */}
      <motion.div
        initial={{ opacity: 0, x: -30, rotate: 6 }}
        animate={{ opacity: 1, x: 0, rotate: 6 }}
        transition={{ delay: 3.6, duration: 0.6 }}
        className="absolute top-[42%] left-[1%] sm:left-[2%] lg:left-[4%] text-black text-lg sm:text-2xl md:text-3xl lg:text-4xl max-w-[130px] sm:max-w-[180px] lg:max-w-[200px] leading-tight"
      >
        <span className="text-orange-700 text-[10px] sm:text-xs font-sans font-bold uppercase block tracking-wider">specialty:</span>
        MERN Stack Lead 💻
      </motion.div>

      {/* Left Bottom: Location */}
      <motion.div
        initial={{ opacity: 0, x: -30, rotate: -4 }}
        animate={{ opacity: 1, x: 0, rotate: -4 }}
        transition={{ delay: 4.2, duration: 0.6 }}
        className="absolute bottom-[12%] left-[4%] sm:left-[8%] lg:left-[12%] text-black text-lg sm:text-2xl md:text-3xl lg:text-4xl max-w-[130px] sm:max-w-[180px] lg:max-w-[200px] leading-tight"
      >
        <span className="text-orange-700 text-[10px] sm:text-xs font-sans font-bold uppercase block tracking-wider">location:</span>
        Pakistan 🇵🇰
      </motion.div>

      {/* Right Top: 3D Experience */}
      <motion.div
        initial={{ opacity: 0, x: 30, rotate: 5 }}
        animate={{ opacity: 1, x: 0, rotate: 5 }}
        transition={{ delay: 3.3, duration: 0.6 }}
        className="absolute top-[15%] right-[4%] sm:right-[8%] lg:right-[14%] text-black text-lg sm:text-2xl md:text-3xl lg:text-4xl max-w-[130px] sm:max-w-[180px] lg:max-w-[200px] leading-tight text-right"
      >
        <span className="text-orange-700 text-[10px] sm:text-xs font-sans font-bold uppercase block tracking-wider">3D web:</span>
        Three.js &amp; WebGL ✨
      </motion.div>

      {/* Right Middle: Can't Live Without */}
      <motion.div
        initial={{ opacity: 0, x: 30, rotate: -6 }}
        animate={{ opacity: 1, x: 0, rotate: -6 }}
        transition={{ delay: 3.9, duration: 0.6 }}
        className="absolute top-[42%] right-[1%] sm:right-[2%] lg:right-[4%] text-black text-lg sm:text-2xl md:text-3xl lg:text-4xl max-w-[140px] sm:max-w-[190px] lg:max-w-[220px] leading-tight text-right"
      >
        <span className="text-orange-700 text-[10px] sm:text-xs font-sans font-bold uppercase block tracking-wider">can&apos;t live without:</span>
        VS Code &amp; Coffee ☕
      </motion.div>

      {/* Right Bottom: Vibe Coding */}
      <motion.div
        initial={{ opacity: 0, x: 30, rotate: 4 }}
        animate={{ opacity: 1, x: 0, rotate: 4 }}
        transition={{ delay: 4.5, duration: 0.6 }}
        className="absolute bottom-[12%] right-[1%] sm:right-[2%] lg:right-[4%] text-black text-lg sm:text-2xl md:text-3xl lg:text-4xl max-w-[150px] sm:max-w-[200px] lg:max-w-[250px] leading-tight text-right"
      >
        <span className="text-orange-700 text-[10px] sm:text-xs font-sans font-bold uppercase block tracking-wider">vibe coding:</span>
        Cursor &amp; Antigravity 🚀
      </motion.div>
    </div>
  );
}
