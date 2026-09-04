'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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

      // Check if navbar is currently positioned over the dark #projects section
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
      // Fallback: Show at 6.0s (1.5s before 8.0s video end)
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

        {/* ── Desktop Center Nav Links: Signature Black & Yellow Pill (Staggered Drop Animation) ── */}
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
          {/* Slanted Yellow Background on the left half */}
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
            className={`inline-flex md:hidden items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full backdrop-blur-md shadow-sm transition-all ${
              isDarkSection
                ? 'bg-black/10 border border-black/15 text-gray-950 hover:bg-black/20'
                : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
            }`}
          >
            <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[60] transition-visibility duration-500 ${
          mobileOpen ? 'pointer-events-auto visible' : 'pointer-events-none invisible'
        }`}
      >
        {/* Backdrop */}
        <div
          onClick={() => setMobileOpen(false)}
          className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-500 ${
            mobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Panel Slider */}
        <div
          className={`absolute top-0 right-0 h-full w-full sm:w-[380px] p-6 flex flex-col justify-between transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] bg-[#fbfcfb] shadow-2xl ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Panel Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-2xl font-sans tracking-tighter text-slate-900 flex items-center">
                <span className="font-sans font-bold text-yellow-500 text-2xl mr-1 opacity-90">&lt;</span>
                <span className="font-bold">Usama</span><span className="font-black text-yellow-500">Faheem</span>
                <span className="font-sans font-bold text-yellow-500 text-2xl ml-1 opacity-90">/&gt;</span>
              </span>
            </div>

            <button
              onClick={() => setMobileOpen(false)}
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
                onClick={() => setMobileOpen(false)}
                className={`px-6 py-4 text-lg font-sans font-bold text-slate-700 rounded-2xl bg-white border border-slate-100 shadow-sm hover:text-blue-600 hover:border-blue-100 hover:shadow-md transition-all duration-300 transform ${
                  mobileOpen
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
                style={{
                  transitionDelay: mobileOpen ? `${150 + i * 60}ms` : '0ms',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Bottom CTA */}
          <div
            className={`transition-all duration-500 ${
              mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: mobileOpen ? '450ms' : '0ms' }}
          >
            <a
              href="/Usama_Faheem_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="w-full py-4 rounded-full bg-yellow-400 text-black font-sans font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_12px_28px_rgba(250,204,21,0.35)] hover:bg-yellow-500 hover:shadow-[0_16px_36px_rgba(250,204,21,0.55)] transition-all"
            >
              <span>RESUME</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
