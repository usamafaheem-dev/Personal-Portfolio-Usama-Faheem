'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, ArrowDown, Mail, Copy, Check } from 'lucide-react';
import Link from 'next/link';

const navLinks = [
  { label: 'About', href: '#about', number: '01' },
  { label: 'Projects', href: '#projects', number: '02' },
  { label: 'Services', href: '#services', number: '03' },
  { label: 'Experience', href: '#experience', number: '04' },
  { label: 'Contact', href: '#contact', number: '05' },
];

const mobileNavLinks = [
  { label: 'About', href: '#about', number: '01' },
  { label: 'Projects', href: '#projects', number: '02' },
  { label: 'Services', href: '#services', number: '03' },
  { label: 'Experience', href: '#experience', number: '04' },
  { label: 'Contact', href: '#contact', number: '05' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [isDarkSection, setIsDarkSection] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText('developer@usamafaheem.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const nextScrolled = scrollY > 40;
          const nextPastHero = scrollY > 90;

          setScrolled((prev) => (prev !== nextScrolled ? nextScrolled : prev));
          setIsPastHero((prev) => (prev !== nextPastHero ? nextPastHero : prev));
          if (nextScrolled) {
            setShowNavbar((prev) => (!prev ? true : prev));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const projectsEl = document.getElementById('projects');
    let projectsObserver: IntersectionObserver | null = null;
    if (projectsEl) {
      projectsObserver = new IntersectionObserver(
        ([entry]) => {
          setIsDarkSection((prev) => (prev !== entry.isIntersecting ? entry.isIntersecting : prev));
        },
        { rootMargin: '-60px 0px -70% 0px', threshold: 0 }
      );
      projectsObserver.observe(projectsEl);
    }

    let playTimeout: NodeJS.Timeout;
    const handleNavbarShow = () => {
      setShowNavbar(true);
    };
    const handleVideoStart = () => {
      setShowNavbar(false);
      clearTimeout(playTimeout);
      playTimeout = setTimeout(() => setShowNavbar(true), 6000);
    };

    window.addEventListener('heroNavbarTrigger', handleNavbarShow);
    window.addEventListener('heroVideoEnded', handleNavbarShow);
    window.addEventListener('heroVideoStarted', handleVideoStart);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', onScroll);
      if (projectsObserver) projectsObserver.disconnect();
      window.removeEventListener('heroNavbarTrigger', handleNavbarShow);
      window.removeEventListener('heroVideoEnded', handleNavbarShow);
      window.removeEventListener('heroVideoStarted', handleVideoStart);
      clearTimeout(playTimeout);
    };
  }, []);

  // Lock body scroll and notify floating widgets when either drawer is open
  useEffect(() => {
    if (drawerOpen || mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    if (typeof window !== 'undefined') {
      if (mobileOpen) {
        window.dispatchEvent(new Event('mobile-menu-open'));
      } else {
        window.dispatchEvent(new Event('mobile-menu-close'));
      }
    }

    return () => {
      document.body.style.overflow = '';
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('mobile-menu-close'));
      }
    };
  }, [drawerOpen, mobileOpen]);

  const isHeaderVisible = isMobile ? showNavbar : (!isPastHero && showNavbar);

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════
          1. FULL NORMAL NAVBAR
             - Always remains visible and sticky on mobile as user scrolls
             - On desktop, visible at Hero / top, then transforms to floating controls past hero
         ════════════════════════════════════════════════════════════════ */}
      <motion.header
        initial={{ y: -120, opacity: 0 }}
        animate={{
          y: isHeaderVisible ? 0 : -120,
          opacity: isHeaderVisible ? 1 : 0,
        }}
        transition={{
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={`fixed left-0 right-0 mx-auto z-[70] flex items-center justify-between rounded-full transform-gpu ${
          isHeaderVisible ? 'pointer-events-auto' : 'pointer-events-none'
        } ${
          isDarkSection
            ? 'bg-white/90 backdrop-blur-2xl border border-white/90 shadow-[0_15px_45px_rgba(0,0,0,0.35)] text-slate-900'
            : 'bg-black/25 backdrop-blur-xl border border-white/10 shadow-lg text-white'
        } ${
          scrolled
            ? 'top-2 sm:top-4 w-[calc(100%-1.25rem)] sm:w-[calc(100%-2rem)] max-w-5xl px-3 sm:px-5 py-1 sm:py-1.5'
            : 'top-2.5 sm:top-7 w-[calc(100%-1.5rem)] sm:w-[calc(100%-6rem)] max-w-6xl px-3 sm:px-6 py-1.5 sm:py-2'
        }`}
        style={{
          transition:
            'background-color 0.3s ease, border-color 0.3s ease, width 0.4s ease, top 0.4s ease, padding 0.4s ease',
        }}
      >
        {/* Left Logo */}
        <Link
          href="/"
          className="flex items-center group z-10 pointer-events-auto transition-transform duration-300 hover:scale-105"
        >
          <span
            className={`text-base sm:text-xl md:text-[21px] font-sans tracking-tight flex items-center transition-colors duration-300 leading-none ${
              isDarkSection
                ? 'text-slate-950 drop-shadow-none'
                : 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'
            }`}
          >
            <span
              className={`font-sans font-bold text-base sm:text-xl md:text-[21px] mr-1 transition-colors ${
                isDarkSection ? 'text-[#5f7a12]' : 'text-[#d8ff00] opacity-90'
              }`}
            >
              &lt;
            </span>
            <span className="font-bold">Usama</span>
            <span
              className={`font-extrabold transition-colors ${
                isDarkSection ? 'text-[#5f7a12]' : 'text-[#d8ff00]'
              }`}
            >
              Faheem
            </span>
            <span
              className={`font-sans font-bold text-base sm:text-xl md:text-[21px] ml-1 transition-colors ${
                isDarkSection ? 'text-[#5f7a12]' : 'text-[#d8ff00] opacity-90'
              }`}
            >
              /&gt;
            </span>
          </span>
        </Link>

        {/* Desktop Center Nav Links */}
        <motion.nav
          initial={{ y: -60, opacity: 0, scale: 0.9 }}
          animate={{
            y: showNavbar ? 0 : -60,
            opacity: showNavbar ? 1 : 0,
            scale: showNavbar ? 1 : 0.9,
          }}
          transition={{
            delay: showNavbar ? 0.25 : 0,
            duration: 0.6,
            ease: [0.34, 1.3, 0.64, 1],
          }}
          className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-1.5 sm:gap-2 px-2 py-1 rounded-full bg-[#1e1e1e]/90 backdrop-blur-xl border border-white/10 shadow-[0_8px_28px_rgba(0,0,0,0.45)] z-0 pointer-events-auto overflow-hidden font-sans"
        >
          <div
            className="absolute inset-0 bg-[#d8ff00] -z-10 pointer-events-none"
            style={{ clipPath: 'polygon(0 0, 38.5% 0, 46.5% 100%, 0 100%)' }}
          />

          {navLinks.map((link, i) => {
            const isYellowSide = i < 2;

            return (
              <Link
                key={link.label}
                href={link.href}
                className={`px-3.5 sm:px-4 py-1 text-[13px] sm:text-[13.5px] font-semibold font-sans tracking-tight rounded-full transition-all relative z-10 ${
                  i === 1 ? 'mr-4 sm:mr-5' : ''
                } ${
                  isYellowSide
                    ? 'text-black hover:bg-black hover:text-white hover:shadow-xs'
                    : 'text-slate-200 hover:bg-white hover:text-black hover:shadow-xs'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </motion.nav>

        {/* Right Side: Resume Button & Mobile Menu Toggle */}
        <div className="flex items-center justify-end z-10 pointer-events-auto transition-all duration-300 font-sans">
          <a
            href="/Usama_Faheem_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex rounded-full bg-[#0052ff] px-5 sm:px-6 py-1.5 sm:py-2 font-sans text-xs sm:text-[13px] font-bold uppercase tracking-wider text-white shadow-[0_4px_14px_rgba(0,82,255,0.35)] transition-all hover:bg-[#003fcc] hover:shadow-[0_6px_20px_rgba(0,82,255,0.55)] hover:scale-105"
          >
            RESUME
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open Menu"
            className={`inline-flex md:hidden items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full backdrop-blur-md shadow-sm transition-all cursor-pointer ${
              isDarkSection
                ? 'bg-black/10 border border-black/15 text-slate-950 hover:bg-black/20'
                : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
            }`}
          >
            <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </motion.header>

      {/* ════════════════════════════════════════════════════════════════
          2. FLOATING COMPACT CONTROLS ON SCROLL (PAST HERO) - DESKTOP ONLY
             - Top Left: Floating Menu Button
             - Top Right: Floating Book a Call CTA
         ════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isPastHero && !isMobile && (
          <>
            {/* Top-Left: Ultra-Sleek Luxury Dark Glass Menu Capsule */}
            <motion.div
              initial={{ y: -60, opacity: 0, scale: 0.85 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -60, opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="hidden md:block fixed top-4 sm:top-6 left-4 sm:left-6 z-[70] pointer-events-auto"
            >
              <button
                onClick={() => setDrawerOpen(true)}
                aria-label="Toggle Menu"
                className="relative flex items-center gap-3 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#0c0e14]/90 hover:bg-[#0c0e14] text-white shadow-[0_12px_32px_rgba(0,0,0,0.35)] border border-white/15 backdrop-blur-2xl transition-all duration-300 hover:scale-105 hover:border-[#d8ff00]/40 active:scale-95 cursor-pointer group"
              >
                {/* Ambient Lime Aura Glow on Hover */}
                <div className="absolute -inset-1 rounded-full bg-[#d8ff00]/25 blur-md -z-10 opacity-40 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Animated Minimalist Staggered Menu Bars */}
                <div className="w-4 h-3.5 flex flex-col justify-between items-start">
                  <span className="w-4 h-[2px] bg-white rounded-full transition-all duration-300 group-hover:w-5 group-hover:bg-[#d8ff00]" />
                  <span className="w-2.5 h-[2px] bg-[#d8ff00] rounded-full transition-all duration-300 group-hover:w-4 group-hover:bg-white" />
                  <span className="w-4 h-[2px] bg-white/70 rounded-full transition-all duration-300 group-hover:w-3 group-hover:bg-[#d8ff00]" />
                </div>

                {/* Pulsing Live Dot */}
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d8ff00] opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#d8ff00]" />
                </span>

                {/* MENU Text with High-End Letter-Spacing */}
                <span className="text-[11px] sm:text-xs font-extrabold font-sans uppercase tracking-[0.2em] text-slate-200 group-hover:text-white transition-colors">
                  Menu
                </span>
              </button>
            </motion.div>

            {/* Top-Right: Sleek Floating CTA Button */}
            <motion.div
              initial={{ y: -60, opacity: 0, scale: 0.85 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -60, opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="hidden md:block fixed top-4 sm:top-6 right-4 sm:right-6 z-[70] pointer-events-auto"
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2 sm:px-6 sm:py-2.5 rounded-full bg-[#0052ff] hover:bg-[#003fcc] text-white text-xs sm:text-[13px] font-extrabold uppercase tracking-wider shadow-[0_8px_25px_rgba(0,82,255,0.4)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Book a Call</span>
                <span className="text-sm sm:text-base font-extrabold leading-none">+</span>
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════════════════════
          3. SLIDE-OUT DRAWER FROM LEFT (DESKTOP ONLY)
         ════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {drawerOpen && (
          <div className="hidden md:flex fixed inset-0 z-[80] justify-start items-stretch pointer-events-auto">
            {/* Backdrop Glass Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setDrawerOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-xs cursor-pointer"
            />

            {/* Drawer Panel Sliding from LEFT */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-full w-full sm:w-[420px] bg-white/95 backdrop-blur-2xl border-r border-slate-200/80 shadow-[20px_0_60px_rgba(0,0,0,0.18)] flex flex-col justify-between p-6 sm:p-8 z-[75] overflow-y-auto transform-gpu"
            >
              {/* Drawer Top Row: Logo & Close Button */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-200/60">
                <Link
                  href="/"
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center group"
                >
                  <span className="text-xl font-sans tracking-tight text-slate-900 flex items-center">
                    <span className="font-sans font-bold text-[#0052ff] text-xl mr-0.5">&lt;</span>
                    <span className="font-bold text-slate-950">Usama</span>
                    <span className="font-extrabold text-[#0052ff]">Faheem</span>
                    <span className="font-sans font-bold text-[#0052ff] text-xl ml-0.5">/&gt;</span>
                  </span>
                </Link>

                {/* Close Button */}
                <button
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close Menu"
                  className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links List */}
              <div className="flex flex-col gap-3 my-auto py-6">
                <span className="text-[11px] font-bold font-mono tracking-widest text-slate-400 uppercase mb-2">
                  Navigation
                </span>
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05, duration: 0.25 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setDrawerOpen(false)}
                      className="group flex items-center justify-between py-2.5 px-3 rounded-2xl hover:bg-slate-100/80 transition-all"
                    >
                      <span className="text-2xl sm:text-3xl font-extrabold font-sans tracking-tight text-slate-900 group-hover:text-[#0052ff] transition-colors">
                        {link.label}
                      </span>
                      <div className="flex items-center gap-2 text-slate-400 group-hover:text-[#0052ff] transition-colors">
                        <span className="text-xs font-mono font-bold">{link.number}</span>
                        <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Drawer Bottom Actions: Email Button & Download Resume */}
              <div className="pt-6 border-t border-slate-200/60 space-y-3">
                {/* Developer Email Button */}
                <button
                  onClick={handleCopyEmail}
                  className="w-full py-3 px-4 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200/90 hover:border-slate-300 font-sans font-bold text-xs sm:text-[13px] flex items-center justify-between transition-all cursor-pointer group shadow-2xs hover:shadow-xs active:scale-[0.99]"
                  title="Click to copy email"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-6 h-6 rounded-full bg-[#d8ff00] text-black flex items-center justify-center shrink-0 shadow-xs">
                      <Mail className="w-3.5 h-3.5 stroke-[2.2]" />
                    </div>
                    <span className="truncate font-mono text-[12px] sm:text-[12.5px] text-slate-900 font-semibold">
                      developer@usamafaheem.com
                    </span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0 text-slate-500 group-hover:text-slate-900 text-[11px] font-sans font-medium pl-1 transition-colors">
                    {copiedEmail ? (
                      <span className="text-emerald-600 font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Copied!
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <Copy className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" /> Copy
                      </span>
                    )}
                  </div>
                </button>

                <a
                  href="/Usama_Faheem_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setDrawerOpen(false)}
                  className="w-full py-3.5 rounded-full bg-[#0052ff] text-white font-sans font-extrabold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_8px_22px_rgba(0,82,255,0.35)] hover:bg-[#003fcc] hover:shadow-[0_12px_28px_rgba(0,82,255,0.5)] transition-all text-center cursor-pointer"
                >
                  <span>Download Resume</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════════════════════
          4. CUSTOM MOBILE SIDEBAR / DRAWER
             - Restored exact mobile sidebar with crossed ribbons and staggered layout
             - Zero lag optimized, pure mobile friendly (#f8fafc)
         ════════════════════════════════════════════════════════════════ */}
      {/* ════════════════════════════════════════════════════════════════
          4. SLEEK NUMBERED MOBILE DRAWER (MATCHING REFERENCE DESIGN)
             - Right-side slide-over sheet with high z-index (z-[100]+)
             - "MENU" header + rounded close box
             - Numbered list: 01 About, 02 Services, 03 Work, 04 Skills, 05 Journey, 06 Contact
             - Subtle horizontal dividers
             - "AVAILABLE FOR WORK" status indicator
             - Neon Lime "Download CV ↓" & Outlined "Email me" CTA buttons
         ════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-[100] flex justify-end md:hidden pointer-events-auto">
            {/* Backdrop Dimmer - Solid high-performance overlay without costly backdrop-blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/65 cursor-pointer"
            />

            {/* Right Slide-in White Card / Sheet - GPU Composited */}
            <motion.div
              data-lenis-prevent="true"
              initial={{ x: '100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              style={{
                transform: 'translateZ(0)',
                willChange: 'transform',
                touchAction: 'pan-y',
              }}
              className="relative w-[84vw] max-w-[340px] sm:max-w-[375px] h-[100dvh] bg-white shadow-[-16px_0_40px_rgba(0,0,0,0.3)] flex flex-col justify-between px-6 py-6 sm:px-7 sm:py-7 overflow-y-auto overscroll-contain z-[105]"
            >
              {/* Drawer Top Header: "MENU" text & Rounded Square Close Button */}
              <div className="flex items-center justify-between pb-3 pt-1">
                <span className="text-[11px] sm:text-xs font-bold font-sans tracking-[0.22em] text-neutral-400 uppercase">
                  MENU
                </span>

                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close Menu"
                  className="w-8 h-8 rounded-xl border border-slate-800 flex items-center justify-center text-slate-800 hover:bg-slate-100 active:scale-95 transition-all cursor-pointer shadow-xs"
                >
                  <X className="w-4 h-4 stroke-[2.2]" />
                </button>
              </div>

              {/* Numbered Navigation Links List with Dividers - Static for zero layout thrashing */}
              <div className="flex flex-col my-auto py-2">
                {mobileNavLinks.map((link) => (
                  <div key={link.label}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-4 py-3 sm:py-3.5 border-b border-slate-100 group transition-all active:opacity-70"
                    >
                      <span className="font-extrabold text-xs sm:text-sm font-sans tracking-wide text-[#7ba000] w-6">
                        {link.number}
                      </span>
                      <span className="font-extrabold text-[1.35rem] sm:text-[1.5rem] font-sans tracking-tight text-slate-950 group-hover:text-[#6a8400] transition-colors">
                        {link.label}
                      </span>
                    </Link>
                  </div>
                ))}
              </div>

              {/* Bottom Area: Status & Dual CTA Buttons */}
              <div className="pt-4">
                {/* Available For Work Live Indicator */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="relative flex h-2 w-2">
                    <span className="inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                  </span>
                  <span className="text-[11px] font-bold font-sans tracking-[0.14em] text-neutral-400 uppercase">
                    AVAILABLE FOR WORK
                  </span>
                </div>

                {/* Bright Neon Lime Download CV Button */}
                <a
                  href="/Usama_Faheem_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="w-full py-3.5 rounded-full bg-[#d8ff00] hover:bg-[#cbf200] text-black font-sans font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(216,255,0,0.35)] transition-all hover:scale-[1.02] active:scale-95 text-center mb-3 cursor-pointer"
                >
                  <span>Download CV</span>
                  <ArrowDown className="w-4 h-4 stroke-[2.6]" />
                </a>

                {/* Email Me Pill Button */}
                <a
                  href="mailto:developer@usamafaheem.com"
                  onClick={() => setMobileOpen(false)}
                  className="w-full py-3.5 rounded-full bg-white hover:bg-slate-50 text-black border-2 border-slate-900 font-sans font-extrabold text-sm sm:text-base flex items-center justify-center shadow-xs transition-all hover:scale-[1.02] active:scale-95 text-center cursor-pointer"
                >
                  Email me
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
