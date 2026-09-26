'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles, Zap, Radio, Compass, Orbit, Cpu, Eye, Activity } from 'lucide-react';

export default function LoadersPurePage() {
  const [activeLoader, setActiveLoader] = useState<number>(9);
  const [isLightMode, setIsLightMode] = useState<boolean>(true);

  return (
    <div
      className={`min-h-screen w-full flex flex-col items-center justify-between p-6 transition-colors duration-300 select-none overflow-hidden ${
        isLightMode ? 'bg-[#f8fafc] text-slate-900' : 'bg-[#070b14] text-white'
      }`}
    >
      {/* Top Header - Super Minimal */}
      <div className="w-full max-w-4xl flex items-center justify-between z-20">
        <Link
          href="/"
          className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all ${
            isLightMode
              ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm'
              : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsLightMode(!isLightMode)}
            className={`text-xs font-mono font-bold px-3 py-1.5 rounded-xl border transition-all ${
              isLightMode
                ? 'bg-white border-violet-200 text-violet-700 shadow-sm hover:bg-violet-50'
                : 'bg-slate-900 border-cyan-500/40 text-cyan-300 hover:bg-slate-800'
            }`}
          >
            {isLightMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </div>

      {/* CENTER STAGE: PURE LOADER ONLY */}
      <div className="relative flex-1 flex flex-col items-center justify-center my-auto z-10">
        {/* Soft Ambient Halo */}
        <div
          className={`absolute w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none transition-all duration-500 ${
            isLightMode
              ? 'bg-gradient-to-tr from-violet-300/35 via-fuchsia-200/30 to-cyan-200/35'
              : 'bg-gradient-to-tr from-violet-600/20 via-cyan-500/15 to-blue-600/20'
          }`}
        />

        {/* Pure Loader Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeLoader}-${isLightMode}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="relative flex items-center justify-center"
          >
            {activeLoader === 1 && <PureLoader1 isLight={isLightMode} />}
            {activeLoader === 2 && <PureLoader2 isLight={isLightMode} />}
            {activeLoader === 3 && <PureLoader3 isLight={isLightMode} />}
            {activeLoader === 4 && <PureLoader4 isLight={isLightMode} />}
            {activeLoader === 5 && <PureLoader5 isLight={isLightMode} />}
            {activeLoader === 6 && <PureLoader6 isLight={isLightMode} />}
            {activeLoader === 7 && <PureLoader7 isLight={isLightMode} />}
            {activeLoader === 8 && <PureLoader8 isLight={isLightMode} />}
            {activeLoader === 9 && <PureLoader9 isLight={isLightMode} />}
            {activeLoader === 10 && <PureLoader10 isLight={isLightMode} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* BOTTOM SELECTOR: NUMBERS 1 TO 10 */}
      <div className="w-full max-w-xl flex items-center justify-center gap-1.5 sm:gap-2 z-20 pb-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
          const isActive = activeLoader === num;
          return (
            <button
              key={num}
              onClick={() => setActiveLoader(num)}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all active:scale-95 cursor-pointer flex items-center justify-center ${
                isActive
                  ? isLightMode
                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-200 scale-110 ring-2 ring-violet-300'
                    : 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30 scale-110'
                  : isLightMode
                  ? 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white hover:bg-slate-800'
              }`}
            >
              {num === 9 ? '9★' : num}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PURE LOADERS (ANIMATIONS ONLY, ZERO CLUTTER)
// ─────────────────────────────────────────────────────────────

// 09. SCI-FI SOUNDWAVE PILL CAPSULE (PURE ELECTRIC BLUE)
function PureLoader9({ isLight }: { isLight: boolean }) {
  return (
    <div className="relative flex items-center justify-center">
      {/* Outer Pure Blue Caustic Glow */}
      <div className="absolute -inset-4 rounded-full bg-blue-500/20 blur-xl animate-pulse pointer-events-none" />

      {/* Pill Capsule with Pure Electric Blue Colors */}
      <div
        className={`relative px-7 py-3.5 rounded-full border-[2px] shadow-xl flex items-center justify-center gap-2 backdrop-blur-md transition-colors ${
          isLight
            ? 'border-slate-700 bg-white/95 shadow-[0_12px_40px_rgba(0,82,255,0.2)]'
            : 'border-slate-700 bg-slate-900/90 shadow-[0_12px_40px_rgba(0,82,255,0.25)]'
        }`}
      >
        {[10, 18, 30, 42, 48, 42, 30, 18, 10].map((h, i) => (
          <motion.div
            key={i}
            animate={{
              height: [h * 0.35, h, h * 0.35],
              opacity: [0.85, 1, 0.85],
            }}
            transition={{
              duration: 0.65,
              repeat: Infinity,
              delay: i * 0.08,
              ease: 'easeInOut',
            }}
            style={{ height: `${h}px` }}
            className="w-2.5 rounded-full bg-gradient-to-t from-[#0052ff] via-[#2563eb] to-[#38bdf8] shadow-[0_0_10px_rgba(0,82,255,0.45)]"
          />
        ))}
      </div>
    </div>
  );
}

// 01. QUANTUM WARP
function PureLoader1({ isLight }: { isLight: boolean }) {
  return (
    <div className="relative w-48 h-48 flex items-center justify-center">
      <div
        className={`absolute inset-0 rounded-full border-2 border-dashed ${
          isLight ? 'border-blue-500/50' : 'border-cyan-400/60'
        } animate-[spin_5s_linear_infinite]`}
      />
      <div
        className={`absolute inset-4 rounded-full border border-dotted ${
          isLight ? 'border-indigo-500/60' : 'border-blue-400/80'
        } animate-[spin_3.5s_linear_infinite_reverse]`}
      />
      <div
        className={`w-20 h-20 rounded-full flex items-center justify-center shadow-xl animate-pulse ${
          isLight
            ? 'bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 shadow-blue-300'
            : 'bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 shadow-[0_0_40px_rgba(6,182,212,0.9)]'
        }`}
      >
        <Sparkles className="w-10 h-10 text-white" />
      </div>
    </div>
  );
}

// 02. HYPERSPACE
function PureLoader2({ isLight }: { isLight: boolean }) {
  return (
    <div
      className={`relative w-48 h-48 flex items-center justify-center overflow-hidden rounded-full border-2 ${
        isLight ? 'bg-indigo-950 border-indigo-300' : 'bg-black/90 border-cyan-400/50'
      }`}
    >
      {[...Array(24)].map((_, i) => (
        <div
          key={i}
          style={{ transform: `rotate(${i * 15}deg) translateY(-40px)` }}
          className="absolute w-1 h-20 bg-gradient-to-t from-transparent via-cyan-300 to-white rounded-full animate-pulse"
        />
      ))}
      <div className="w-8 h-8 rounded-full bg-white shadow-[0_0_35px_#fff,0_0_70px_#38bdf8] animate-ping" />
    </div>
  );
}

// 03. JARVIS HUD
function PureLoader3({ isLight }: { isLight: boolean }) {
  return (
    <div className="relative w-48 h-48 flex items-center justify-center">
      <div
        className={`absolute inset-0 rounded-3xl border-2 ${
          isLight ? 'border-amber-600/60' : 'border-amber-400/50'
        } rotate-45 animate-[spin_10s_linear_infinite]`}
      />
      <div
        className={`absolute inset-3 rounded-full border border-dashed ${
          isLight ? 'border-blue-600/70' : 'border-cyan-400'
        } animate-[spin_6s_linear_infinite_reverse]`}
      />
      <div className="absolute inset-8 rounded-full border border-amber-500/80 animate-ping" />
      <div className="w-16 h-16 rounded-full border-2 border-amber-500 flex items-center justify-center font-mono font-bold text-amber-500 text-xs">
        TARGET
      </div>
    </div>
  );
}

// 04. LIQUID ORB
function PureLoader4({ isLight }: { isLight: boolean }) {
  return (
    <div className="relative w-48 h-48 flex items-center justify-center">
      <motion.div
        animate={{
          borderRadius: [
            '60% 40% 30% 70% / 60% 30% 70% 40%',
            '30% 60% 70% 40% / 50% 60% 30% 60%',
            '60% 40% 30% 70% / 60% 30% 70% 40%',
          ],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className={`w-32 h-32 bg-gradient-to-tr from-fuchsia-500 via-violet-500 to-cyan-400 blur-[2px] ${
          isLight ? 'shadow-lg shadow-fuchsia-200' : 'shadow-[0_0_60px_rgba(217,70,239,0.8)]'
        }`}
      />
      <div className="absolute w-16 h-16 rounded-full bg-white/50 backdrop-blur-md border border-white flex items-center justify-center">
        <Sparkles className="w-7 h-7 text-white" />
      </div>
    </div>
  );
}

// 05. BLACK HOLE
function PureLoader5({ isLight }: { isLight: boolean }) {
  return (
    <div className="relative w-48 h-48 flex items-center justify-center">
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500 via-red-600 to-orange-400 blur-[8px] animate-[spin_3s_linear_infinite]" />
      <div className="absolute -inset-2 rounded-full border-t-4 border-b-4 border-amber-300 animate-[spin_2s_linear_infinite_reverse]" />
      <div className="relative w-24 h-24 rounded-full bg-[#030712] shadow-2xl border border-amber-500/60" />
    </div>
  );
}

// 06. MATRIX DECODE
function PureLoader6({ isLight }: { isLight: boolean }) {
  return (
    <div
      className={`relative w-44 h-44 rounded-3xl border-2 p-4 flex flex-col justify-between font-mono text-xs overflow-hidden ${
        isLight
          ? 'bg-slate-900 border-emerald-400 text-emerald-300'
          : 'bg-slate-950 border-emerald-500 text-emerald-400'
      }`}
    >
      <div className="flex justify-between text-[10px] text-emerald-500">
        <span>0x9F</span>
        <span className="animate-pulse">DECODE</span>
      </div>
      <div className="text-center font-black tracking-widest text-lg text-emerald-300 animate-glitch">
        [ SYNCING ]
      </div>
      <div className="w-full bg-emerald-950 rounded h-1.5 overflow-hidden">
        <motion.div
          animate={{ width: ['0%', '100%'] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
          className="h-full bg-emerald-400"
        />
      </div>
    </div>
  );
}

// 07. NEURAL SYNAPSE
function PureLoader7({ isLight }: { isLight: boolean }) {
  return (
    <div className="relative w-48 h-48 flex items-center justify-center">
      <div
        className={`w-24 h-24 rounded-full border-2 border-dashed ${
          isLight ? 'border-purple-600' : 'border-pink-500'
        } animate-[spin_8s_linear_infinite] flex items-center justify-center shadow-lg`}
      >
        <Cpu className={`w-10 h-10 ${isLight ? 'text-purple-700' : 'text-pink-300'} animate-pulse`} />
      </div>
    </div>
  );
}

// 08. ARC REACTOR
function PureLoader8({ isLight }: { isLight: boolean }) {
  return (
    <div className="relative w-48 h-48 flex items-center justify-center">
      <div
        className={`absolute inset-0 rounded-full border-4 ${
          isLight ? 'border-blue-500/40 border-t-blue-600' : 'border-cyan-400/50 border-t-cyan-200'
        } border-r-transparent animate-[spin_2s_linear_infinite]`}
      />
      <div
        className={`relative w-20 h-20 rounded-full border-2 flex items-center justify-center shadow-lg animate-pulse ${
          isLight ? 'bg-cyan-100 border-cyan-400 text-blue-600' : 'bg-cyan-400/25 border-cyan-300 text-cyan-100'
        }`}
      >
        <Zap className="w-10 h-10 fill-current" />
      </div>
    </div>
  );
}

// 10. SPATIAL GLASS
function PureLoader10({ isLight }: { isLight: boolean }) {
  return (
    <div
      className={`relative w-44 h-44 rounded-3xl border flex items-center justify-center shadow-xl ${
        isLight ? 'bg-white/90 border-slate-300' : 'bg-white/10 backdrop-blur-2xl border-white/40'
      }`}
    >
      <div
        className={`w-20 h-20 rounded-2xl border rotate-12 flex items-center justify-center ${
          isLight ? 'border-slate-400 text-slate-800' : 'border-white/60 text-white'
        }`}
      >
        <Compass className="w-10 h-10" />
      </div>
    </div>
  );
}
