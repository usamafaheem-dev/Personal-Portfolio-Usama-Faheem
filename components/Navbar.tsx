'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Stack', href: '#stack' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [isDarkSection, setIsDarkSection] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const projectsEl = document.getElementById('projects');
      if (projectsEl) {
        const rect = projectsEl.getBoundingClientRect();
        const navbarY = 60;
        if (rect.top <= navbarY && rect.bottom >= navbarY) {
          setIsDarkSection(true);
          return;
        }
      }
      setIsDarkSection(false);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    
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
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('heroNavbarTrigger', handleNavbarShow);
      window.removeEventListener('heroVideoEnded', handleNavbarShow);
      window.removeEventListener('heroVideoStarted', handleVideoStart);
      clearTimeout(playTimeout);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -120, opacity: 0 }}
        animate={{ 
          y: showNavbar ? 0 : -120,
          opacity: showNavbar ? 1 : 0
        }}
        transition={{ 
          duration: 0.65, 
          ease: [0.16, 1, 0.3, 1] 
        }}
        className={`fixed left-0 right-0 mx-auto z-50 flex items-center justify-between rounded-full transform-gpu ${
          showNavbar ? 'pointer-events-auto' : 'pointer-events-none'
        } ${
          isDarkSection
            ? 'bg-white/90 backdrop-blur-2xl border border-white/90 shadow-[0_15px_45px_rgba(0,0,0,0.35)] text-slate-900'
            : 'bg-black/25 backdrop-blur-xl border border-white/10 shadow-lg text-white'
        } ${
          scrolled 
            ? 'top-2 sm:top-4 w-[calc(100%-1.25rem)] sm:w-[calc(100%-2rem)] max-w-5xl px-3 sm:px-4 py-1 sm:py-2' 
            : 'top-2.5 sm:top-9 w-[calc(100%-1.5rem)] sm:w-[calc(100%-6rem)] max-w-6xl px-3 sm:px-6 py-1 sm:py-2.5'
        }`}
        style={{
          transition: 'background-color 0.3s ease, border-color 0.3s ease, width 0.4s ease, top 0.4s ease, padding 0.4s ease'
        }}
      >
        {/* Left Logo */}
        <Link 
          href="/" 
          className="flex items-center group z-10 pointer-events-auto transition-transform duration-300 hover:scale-105"
        >
          <span className={`text-base sm:text-2xl font-sans tracking-tighter flex items-center transition-colors duration-300 ${
            isDarkSection ? 'text-gray-950 drop-shadow-none' : 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'
          }`}>
            <span className={`font-sans font-bold text-base sm:text-2xl mr-1 transition-colors ${
              isDarkSection ? 'text-yellow-600' : 'text-yellow-400 opacity-80'
            }`}>&lt;</span>
            <span className="font-bold">Usama</span>
            <span className={`font-black transition-colors ${
              isDarkSection ? 'text-yellow-600' : 'text-yellow-400'
            }`}>Faheem</span>
            <span className={`font-sans font-bold text-base sm:text-2xl ml-1 transition-colors ${
              isDarkSection ? 'text-yellow-600' : 'text-yellow-400 opacity-80'
            }`}>/&gt;</span>
          </span>
        </Link>

        {/* ── Desktop Center Nav Links ── */}
        <motion.nav
          initial={{ y: -60, opacity: 0, scale: 0.9 }}
          animate={{ 
            y: showNavbar ? 0 : -60, 
            opacity: showNavbar ? 1 : 0, 
            scale: showNavbar ? 1 : 0.9 
          }}
          transition={{ 
            delay: showNavbar ? 0.25 : 0, 
            duration: 0.6, 
            ease: [0.34, 1.3, 0.64, 1] 
          }}
          className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-2 sm:gap-4 px-2 py-1.5 rounded-full bg-[#1e1e1e]/90 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] z-0 pointer-events-auto overflow-hidden font-sans"
        >
          <div 
            className="absolute inset-0 bg-yellow-400 -z-10 pointer-events-none" 
            style={{ clipPath: 'polygon(0 0, 41% 0, 51% 100%, 0 100%)' }} 
          />
          
          {navLinks.map((link, i) => {
            const isYellowSide = i < 2;
            
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`px-4 sm:px-5 py-1.5 text-sm font-semibold font-sans tracking-tight rounded-full transition-all relative z-10 ${
                  isYellowSide 
                    ? 'text-black hover:bg-black hover:text-white hover:shadow-sm' 
                    : 'text-zinc-300 hover:bg-white hover:text-black hover:shadow-sm'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </motion.nav>

        {/* Right Side (Resume Button & Mobile Menu Toggle) */}
        <div className="flex items-center justify-end z-10 pointer-events-auto transition-all duration-300 font-sans">
          <a
            href="/Usama_Faheem_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex rounded-full bg-yellow-400 px-6 py-2 font-sans text-sm font-bold uppercase tracking-wider text-black shadow-[0_4px_14px_rgba(250,204,21,0.3)] transition-all hover:bg-yellow-500 hover:shadow-[0_6px_20px_rgba(250,204,21,0.5)] hover:scale-105"
          >
            RESUME
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open Menu"
            className={`inline-flex md:hidden items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full backdrop-blur-md shadow-sm transition-all cursor-pointer ${
              isDarkSection
                ? 'bg-black/10 border border-black/15 text-gray-950 hover:bg-black/20'
                : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
            }`}
          >
            <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </motion.header>

      {/* ── Ultra-Fast Butter Smooth Mobile Menu Drawer (Zero Lag Optimized) ── */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-[60] flex justify-end items-center pointer-events-auto">
            {/* Clean Fast Backdrop (No backdrop-blur to prevent mobile GPU repaint lag) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="absolute inset-0 bg-black/60"
            />

            {/* Floating Drawer Container in #f8fafc (Slate-50 Light Grey with Safe Mobile Padding) */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-full w-full sm:w-[380px] sm:h-[calc(100vh-1rem)] sm:my-2 sm:mr-2 sm:rounded-[24px] sm:border sm:border-slate-200/90 bg-[#f8fafc] shadow-2xl flex flex-col justify-between px-6 pt-12 pb-10 sm:p-7 overflow-hidden z-[65] transform-gpu"
            >
              {/* Subtle Static Crossed Slanted Ribbons (Lightweight, Zero FPS Lag) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden opacity-75">
                <div className="absolute w-[200%] h-9 bg-yellow-300/25 -rotate-[42deg] border-y border-yellow-400/20 flex items-center justify-center">
                  <span className="font-poppins font-black text-[11px] tracking-[0.25em] text-amber-900/40 uppercase whitespace-nowrap">
                    USAMA FAHEEM ✦ FRONTEND ENGINEER ✦ MERN STACK ✦ THREE.JS ✦ NEXT.JS
                  </span>
                </div>
                <div className="absolute w-[200%] h-9 bg-slate-200/30 rotate-[42deg] border-y border-slate-300/30 flex items-center justify-center">
                  <span className="font-poppins font-black text-[11px] tracking-[0.25em] text-slate-700/35 uppercase whitespace-nowrap">
                    CREATIVE UI ✦ WEBGL CANVAS ✦ TAILWIND CSS ✦ FIGMA 1:1 ✦ REACT 19
                  </span>
                </div>
              </div>

              {/* Drawer Header */}
              <div className="flex items-center justify-between relative z-20">
                <Link 
                  href="/" 
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center group pl-0.5"
                >
                  <span className="text-lg sm:text-2xl font-sans tracking-tighter text-slate-900 flex items-center">
                    <span className="font-sans font-bold text-yellow-500 text-lg sm:text-2xl mr-1 opacity-90">&lt;</span>
                    <span className="font-bold">Usama</span>
                    <span className="font-black text-yellow-500">Faheem</span>
                    <span className="font-sans font-bold text-yellow-500 text-lg sm:text-2xl ml-1 opacity-90">/&gt;</span>
                  </span>
                </Link>

                {/* Compact Yellow Theme Close (X) Button */}
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close Menu"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-yellow-400 text-black hover:bg-yellow-500 shadow-sm flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <X className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
                </button>
              </div>

              {/* 🌟 ALTERNATING LEFT-RIGHT SMOOTH STAGGERED LINKS */}
              <div className="flex flex-col items-center justify-center gap-4 sm:gap-5 my-auto text-center relative z-20">
                {navLinks.map((link, i) => {
                  const isEven = i % 2 === 0;
                  const initialX = isEven ? -40 : 40;

                  return (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: initialX }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.08 + i * 0.06,
                        duration: 0.3,
                        ease: 'easeOut'
                      }}
                      className="transform-gpu"
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="text-3xl sm:text-[36px] font-poppins font-black text-[#0f172a] hover:text-amber-500 active:scale-95 transition-colors duration-150 tracking-tight block py-0.5"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom Yellow RESUME Button */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38, duration: 0.3, ease: 'easeOut' }}
                className="w-full relative z-20 transform-gpu"
              >
                <a
                  href="/Usama_Faheem_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="w-full py-3.5 rounded-full bg-yellow-400 text-black font-poppins font-black text-sm tracking-widest uppercase flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(250,204,21,0.35)] hover:bg-yellow-500 hover:shadow-[0_12px_28px_rgba(250,204,21,0.55)] transition-all text-center"
                >
                  <span>RESUME</span>
                </a>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
