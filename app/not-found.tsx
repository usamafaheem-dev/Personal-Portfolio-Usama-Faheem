'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NotFound() {
  const textRef = useRef<HTMLHeadingElement>(null);
  const [scaleY, setScaleY] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: 'About', href: '/' },
    { label: 'Experience', href: '/' },
    { label: 'Stack', href: '/' },
    { label: 'Projects', href: '/' },
    { label: 'Contact', href: '/' },
  ];

  // Dynamic Scale calculation for Background 404 Text & Oval
  useEffect(() => {
    const calculateScale = () => {
      if (textRef.current) {
        const offsetHeight = textRef.current.offsetHeight || 1;
        const computedScaleY = window.innerHeight / offsetHeight;
        setScaleY(computedScaleY);
      }
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <main
      className="w-full h-screen overflow-hidden flex flex-col relative select-none font-sans"
      style={{
        backgroundColor: '#e0e0e0', // Portfolio Hero Background Color
      }}
    >
      {/* ── Background Colorful Glowing Orbs (Portfolio Colors) ── */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-lime-400/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/15 rounded-full blur-[150px] pointer-events-none" />

      {/* ── 1. NAVIGATION BAR ── */}
      <header className="relative z-40 flex items-center justify-between px-4 sm:px-6 md:px-12 py-4 sm:py-5">
        {/* Logo Left */}
        <Link href="/" className="flex items-center gap-2 group z-10">
          <div className="grid grid-cols-2 gap-0.5">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-blue-600 rounded-full group-hover:scale-110 transition-transform" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-indigo-600 rounded-full group-hover:scale-110 transition-transform" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-purple-600 rounded-full group-hover:scale-110 transition-transform" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-pink-500 rounded-full group-hover:scale-110 transition-transform" />
          </div>
          <span className="text-slate-900 font-bold text-lg sm:text-xl ml-1 tracking-tight">
            Usama Faheem
          </span>
        </Link>

        {/* Desktop Nav Links (Centered Pill) */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-1 px-2 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] z-0">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="px-4 py-1.5 text-sm font-bold rounded-full text-slate-600 hover:text-blue-600 hover:bg-white/80 transition-all"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Side (Resume Button & Mobile Menu Toggle) */}
        <div className="flex items-center justify-end z-10">
          <a
            href="/Usama_Faheem_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex rounded-full bg-lime-400 px-6 py-2.5 font-sans text-sm font-extrabold uppercase tracking-widest text-black shadow-[0_4px_14px_rgba(163,230,53,0.3)] transition-all hover:bg-lime-500 hover:shadow-[0_6px_20px_rgba(163,230,53,0.4)]"
          >
            RESUME
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="inline-flex md:hidden items-center justify-center w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-700 cursor-pointer hover:bg-slate-50 transition-all shadow-sm"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* ── 2. MOBILE MENU OVERLAY ── */}
      <div
        className={`fixed inset-0 z-50 transition-visibility duration-500 ${
          isMenuOpen ? 'pointer-events-auto visible' : 'pointer-events-none invisible'
        }`}
      >
        {/* Backdrop */}
        <div
          onClick={() => setIsMenuOpen(false)}
          className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-500 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Panel Slider */}
        <div
          className={`absolute top-0 right-0 h-full w-full sm:w-[380px] p-6 flex flex-col justify-between transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] bg-[#fbfcfb] shadow-2xl ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Panel Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="grid grid-cols-2 gap-0.5">
                <div className="w-3 h-3 bg-blue-600 rounded-full" />
                <div className="w-3 h-3 bg-indigo-600 rounded-full" />
                <div className="w-3 h-3 bg-purple-600 rounded-full" />
                <div className="w-3 h-3 bg-pink-500 rounded-full" />
              </div>
              <span className="text-slate-900 font-bold text-xl ml-1">Usama Faheem</span>
            </div>

            <button
              onClick={() => setIsMenuOpen(false)}
              className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Staggered Menu Links */}
          <div className="flex flex-col gap-3 my-auto">
            {navLinks.map((link, i) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`px-6 py-4 text-lg font-bold text-slate-700 rounded-2xl bg-white border border-slate-100 shadow-sm hover:text-blue-600 hover:border-blue-100 hover:shadow-md transition-all duration-300 transform ${
                  isMenuOpen
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
                style={{
                  transitionDelay: isMenuOpen ? `${150 + i * 60}ms` : '0ms',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Bottom CTA */}
          <div
            className={`transition-all duration-500 ${
              isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: isMenuOpen ? '450ms' : '0ms' }}
          >
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="w-full py-4 rounded-full bg-lime-400 text-black font-bold text-sm tracking-widest uppercase font-mono flex items-center justify-center gap-2 shadow-[0_12px_28px_rgba(163,230,53,0.35)] hover:bg-lime-500 hover:shadow-[0_16px_36px_rgba(163,230,53,0.55)] transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── 3. BACKGROUND "404" TEXT & CRISP "0" OVAL LAYER ── */}
      <div
        className="absolute inset-0 pointer-events-none flex items-center justify-center z-0"
        style={{
          maskImage: 'linear-gradient(to bottom, black 50%, transparent 98%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 98%)',
        }}
      >
        <div className="relative flex items-center justify-center w-full h-full">
          {/* Giant 404 Text - Vibrant Gradient matching Portfolio */}
          <h1
            ref={textRef}
            className="font-extrabold leading-none tracking-tighter whitespace-nowrap select-none bg-gradient-to-br from-lime-400 via-blue-500 to-orange-500 bg-clip-text text-transparent opacity-20"
            style={{
              fontSize: 'clamp(200px, 48vw, 800px)',
              transform: `scale(1.15, ${scaleY * 1.4})`,
              transformOrigin: 'center',
            }}
          >
            404
          </h1>

          {/* Clean Crisp White "0" Oval Portal */}
          <div
            className="absolute rounded-full bg-white/60 backdrop-blur-md shadow-[0_8px_40px_rgba(163,230,53,0.15)] border border-white/50 pointer-events-none"
            style={{
              height: 'clamp(320px, 68vh, 720px)',
              width: 'clamp(240px, 28vw, 440px)',
              transform: `scale(1, ${scaleY * 1.15})`,
              transformOrigin: 'center',
            }}
          />
        </div>
      </div>

      {/* ── 4. CENTER 100% TRANSPARENT ANIMATED CHARACTER (WebP with Native Alpha) ── */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
        style={{
          marginTop: 'calc(-6vh - 40px)',
        }}
      >
        <div className="w-[120vw] h-[85vh] sm:w-[70vw] sm:h-[70vh] md:w-[62vw] md:h-[78vh] flex items-center justify-center relative">
          <img
            src="/fox-transparent.webp"
            alt="404 Animated Fox Character"
            className="w-full h-full object-contain pointer-events-none drop-shadow-[0_20px_30px_rgba(234,179,8,0.2)]"
          />
        </div>
      </div>

      {/* ── 5. BOTTOM CONTENT & CTA ── */}
      <div className="relative z-30 mt-auto pb-8 sm:pb-16 flex flex-col items-center text-center px-4">
        <h2 className="text-slate-800 text-lg sm:text-xl md:text-2xl font-extrabold mb-4 sm:mb-6 tracking-tight drop-shadow-sm font-sans">
          Oops, something went wrong!
        </h2>

        <Link
          href="/"
          className="
            inline-flex items-center gap-3 px-8 py-3.5 sm:px-10 sm:py-4 rounded-full
            bg-lime-400 hover:bg-lime-500
            text-black font-extrabold text-sm sm:text-base tracking-widest uppercase font-mono
            shadow-[0_12px_28px_rgba(163,230,53,0.35)] 
            hover:shadow-[0_16px_36px_rgba(163,230,53,0.55)]
            transition-all active:scale-95 duration-300 group hover:scale-105
          "
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>
      </div>
    </main>
  );
}
