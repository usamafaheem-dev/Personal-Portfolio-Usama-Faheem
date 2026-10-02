'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main
      suppressHydrationWarning
      className="w-full h-screen overflow-hidden flex flex-col justify-between relative font-sans select-none"
      style={{
        backgroundColor: '#e0e0e0', // Portfolio Hero Background Color
      }}
    >
      {/* ── Background Colorful Glowing Orbs (Portfolio Colors) ── */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-lime-400/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/15 rounded-full blur-[150px] pointer-events-none" />

      {/* ── 1. HEADER (Left: Black 'Usama' + Lime 'Faheem' | Right: Blue Resume Button) ── */}
      <header className="relative z-40 flex items-center justify-between px-4 sm:px-6 md:px-12 py-3.5 sm:py-5 shrink-0">
        <Link
          href="/"
          className="flex items-center group z-10 pointer-events-auto transition-transform duration-300 hover:scale-105"
        >
          <span
            suppressHydrationWarning
            className="text-base sm:text-xl md:text-[21px] font-sans tracking-tight flex items-center leading-none"
          >
            <span
              suppressHydrationWarning
              className="font-sans font-bold text-base sm:text-xl md:text-[21px] mr-1 text-[#d8ff00] drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]"
            >
              &lt;
            </span>
            <span
              suppressHydrationWarning
              className="font-extrabold text-slate-950"
            >
              Usama
            </span>
            <span
              suppressHydrationWarning
              className="font-extrabold ml-1 text-[#d8ff00] drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]"
            >
              Faheem
            </span>
            <span
              suppressHydrationWarning
              className="font-sans font-bold text-base sm:text-xl md:text-[21px] ml-1 text-[#d8ff00] drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]"
            >
              /&gt;
            </span>
          </span>
        </Link>

        {/* Right Side: Resume Button in Blue */}
        <div className="flex items-center justify-end z-10">
          <a
            href="/CV_USAMA/Usama_Faheem_CV_Lahore.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="Usama_Faheem_CV_Lahore.pdf"
            className="inline-flex rounded-full bg-[#0052ff] hover:bg-[#003fcc] px-4 sm:px-6 py-1.5 sm:py-2.5 font-sans text-xs sm:text-sm font-extrabold uppercase tracking-widest text-white shadow-[0_4px_14px_rgba(0,82,255,0.35)] transition-all hover:scale-105 active:scale-95"
          >
            RESUME
          </a>
        </div>
      </header>

      {/* ── 2. CENTER STAGE (Left '4' + Spacing + Center Oval '0' + Spacing + Right '4') ── */}
      <div className="relative flex-1 flex flex-col items-center justify-center w-full min-h-0 overflow-hidden z-10 px-2 sm:px-4">
        <div className="relative w-full flex items-center justify-between sm:justify-center gap-1 xs:gap-2 sm:gap-6 md:gap-10 select-none max-w-5xl mx-auto">
          {/* Left "4" - Left edge par with comfortable space to oval */}
          <span
            aria-hidden="true"
            className="relative z-0 font-black leading-none tracking-tighter select-none pointer-events-none text-slate-500/35 text-[150px] xs:text-[180px] sm:text-[260px] md:text-[360px] lg:text-[440px]"
          >
            4
          </span>

          {/* Center White Oval "0" Portal with Mascot inside */}
          <div
            aria-hidden="true"
            className="relative z-10 flex items-center justify-center shrink-0 w-[130px] xs:w-[155px] sm:w-[220px] md:w-[290px] lg:w-[350px] h-[210px] xs:h-[250px] sm:h-[350px] md:h-[440px] lg:h-[510px] rounded-full bg-white/85 sm:bg-white/90 backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.08),0_2px_15px_rgba(255,255,255,0.8)] border border-white/80 p-1 sm:p-5"
          >
            {/* Mascot Character inside the "0" oval */}
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src="/fox-transparent.webp"
                alt="404 Animated Fox Mascot"
                className="w-full h-full max-h-[95%] sm:max-h-[85%] scale-110 sm:scale-100 object-contain pointer-events-none drop-shadow-[0_15px_25px_rgba(234,179,8,0.25)]"
              />
            </div>
          </div>

          {/* Right "4" - Right edge par with comfortable space to oval */}
          <span
            aria-hidden="true"
            className="relative z-0 font-black leading-none tracking-tighter select-none pointer-events-none text-slate-500/35 text-[150px] xs:text-[180px] sm:text-[260px] md:text-[360px] lg:text-[440px]"
          >
            4
          </span>
        </div>
      </div>

      {/* ── 3. BOTTOM ACTIONS ── */}
      <div className="relative z-30 pb-12 sm:pb-16 pt-1 flex flex-col items-center text-center px-4 shrink-0">
        <h2 className="text-slate-800 text-sm sm:text-xl md:text-2xl font-extrabold mb-3 sm:mb-5 tracking-tight drop-shadow-sm font-sans">
          Oops, something went wrong!
        </h2>

        <Link
          href="/"
          className="
            inline-flex items-center gap-2 sm:gap-3 px-6 py-2.5 sm:px-10 sm:py-4 rounded-full
            bg-lime-400 hover:bg-lime-500
            text-black font-extrabold text-xs sm:text-base tracking-widest uppercase font-mono
            shadow-[0_12px_28px_rgba(163,230,53,0.35)] 
            hover:shadow-[0_16px_36px_rgba(163,230,53,0.55)]
            transition-all active:scale-95 duration-300 group hover:scale-105 pointer-events-auto
          "
        >
          <ArrowLeft className="w-3.5 h-3.5 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>
      </div>
    </main>
  );
}
