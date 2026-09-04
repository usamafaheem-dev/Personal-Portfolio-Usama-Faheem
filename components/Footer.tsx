'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ArrowUp, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#faf7f2] pt-8 pb-10 border-t border-slate-200/60 overflow-hidden font-sans text-slate-800 select-none w-full">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ── Slider Indicator Dots (Exact Matching Reference Image) ── */}
        <div className="flex items-center justify-center gap-1.5 mb-5">
          <span className="w-2 h-2 rounded-full bg-[#ea7059]" />
          <span className="w-2 h-2 rounded-full bg-slate-300/80" />
        </div>

        {/* ══════════════════════════════════════════════════════════════
            SLIM HORIZONTAL CTA BANNER (1:1 Match with Reference Image)
           ══════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative w-full bg-[#ea7059] rounded-[24px] sm:rounded-[30px] p-6 sm:p-8 lg:p-10 text-white overflow-hidden shadow-[0_12px_36px_rgba(234,112,89,0.22)] mb-12 sm:mb-16 min-h-[200px] lg:min-h-[220px] flex items-center"
        >
          {/* Subtle Concentric Decorative Background Circles (Left Side) */}
          <div className="absolute -left-12 -top-12 w-64 h-64 rounded-full border border-white/15 pointer-events-none" />
          <div className="absolute -left-4 -top-4 w-48 h-48 rounded-full border border-white/10 pointer-events-none" />
          <div className="absolute left-10 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/10 pointer-events-none" />

          {/* Right Peach Circle Backdrop (Spanning 40% of Banner on Right) */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[340px] sm:w-[420px] lg:w-[480px] h-[340px] sm:h-[420px] lg:h-[480px] rounded-full bg-[#fce0ce] pointer-events-none -mr-12 sm:-mr-16" />

          {/* Right Floating Teal Geometric Accent Circles */}
          <div className="absolute top-3 right-6 sm:right-12 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#187572] shadow-sm z-10 pointer-events-none" />
          <div className="absolute bottom-2 right-2 sm:right-6 w-8 h-8 rounded-full bg-[#187572]/30 z-10 pointer-events-none" />

          {/* Banner Content Grid */}
          <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Left Column: Eyebrow + Headline (4.5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-start">
              <span className="text-[10px] sm:text-[11px] font-sans font-bold tracking-wider text-white/90 uppercase mb-2">
                LET'S CONNECT
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-sans font-black text-white tracking-tight leading-[1.12]">
                Have a project <br className="hidden sm:inline" />
                in mind?
              </h2>
            </div>

            {/* Center Column: Paragraph + Let's Talk Button (4 cols) */}
            <div className="lg:col-span-4 flex flex-col items-start justify-center">
              <p className="text-white/95 text-[11px] sm:text-xs lg:text-[13px] leading-relaxed mb-4 max-w-xs font-normal font-sans">
                I'm always open to discussing new opportunities and exciting ideas.
              </p>
              
              <a
                href="#contact"
                className="bg-white text-slate-900 font-sans font-bold text-xs px-5 py-2.5 rounded-full hover:bg-slate-50 hover:shadow-md transition-all inline-flex items-center gap-2 group cursor-pointer active:scale-95 shadow-xs"
              >
                <span>Let's Talk</span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Right Column: Person Portrait (3.5 cols) */}
            <div className="lg:col-span-3 relative flex items-center justify-center lg:justify-end">
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 lg:w-48 lg:h-48 rounded-full overflow-hidden z-20 shadow-md border-3 border-white/40">
                <img
                  src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&h=600&fit=crop&crop=faces"
                  alt="Usama Faheem"
                  className="w-full h-full object-cover object-top scale-105"
                />
              </div>
            </div>

          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════
            FOOTER BOTTOM SECTION (Matching Reference Image Layout)
           ══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6 pt-2 pb-6 items-start font-sans">
          
          {/* Column 1: Brand Profile & Tagline */}
          <div className="lg:col-span-1 flex flex-col">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-4 h-4 rounded-full bg-[#187572] inline-block shrink-0 shadow-xs" />
              <h3 className="font-sans text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                Usama Faheem
              </h3>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed max-w-[210px] font-sans">
              Frontend & MERN Stack Developer crafting meaningful digital experiences.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col font-sans">
            <h4 className="text-xs font-bold text-slate-800 mb-2.5 tracking-wide font-sans">
              Quick Links
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-500">
              <li>
                <a href="#about" className="hover:text-slate-900 transition-colors">About</a>
              </li>
              <li>
                <a href="#services" className="hover:text-slate-900 transition-colors">Services</a>
              </li>
              <li>
                <a href="#experience" className="hover:text-slate-900 transition-colors">Experience</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-slate-900 transition-colors">Work</a>
              </li>
            </ul>
          </div>

          {/* Column 3: More Links */}
          <div className="flex flex-col">
            <h4 className="text-xs font-bold text-slate-800 mb-2.5 tracking-wide">
              More
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-500">
              <li>
                <a href="#stack" className="hover:text-slate-900 transition-colors">Tech Stack</a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-slate-900 transition-colors">Testimonials</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-slate-900 transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Let's Connect */}
          <div className="flex flex-col">
            <h4 className="text-xs font-bold text-slate-800 mb-2.5 tracking-wide">
              Let's Connect
            </h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>
                <a
                  href="mailto:developer@usamafaheem.com"
                  className="flex items-center gap-2 hover:text-slate-900 transition-colors group"
                >
                  <Mail size={12} className="text-slate-400 group-hover:text-slate-900 transition-colors" />
                  <span>developer@usamafaheem.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/usama-faheem"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-slate-900 transition-colors group"
                >
                  <LinkedinIcon size={12} className="text-slate-400 group-hover:text-slate-900 transition-colors" />
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/usamafaheem-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-slate-900 transition-colors group"
                >
                  <GithubIcon size={12} className="text-slate-400 group-hover:text-slate-900 transition-colors" />
                  <span>GitHub</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Copyright & Scroll to Top */}
          <div className="lg:col-span-1 flex flex-col sm:items-end justify-between h-full pt-0.5">
            <div className="text-[11px] text-slate-400 text-left sm:text-right mb-3">
              © {new Date().getFullYear()} Usama Faheem.<br />
              All rights reserved.
            </div>

            {/* Scroll-to-Top Circular Button */}
            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="w-9 h-9 rounded-full bg-[#187572] text-white flex items-center justify-center hover:bg-[#125856] hover:scale-105 active:scale-95 transition-all shadow-sm cursor-pointer"
            >
              <ArrowUp size={15} strokeWidth={2.5} />
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
}
