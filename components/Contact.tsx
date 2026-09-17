'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Send, Check, Copy, ArrowUpRight, MessageCircle, Mail, MapPin, Sparkles } from 'lucide-react';
import RetroPhone from './RetroPhone';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    projectType: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('developer@usamafaheem.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section
      id="contact"
      className="relative py-20 sm:py-28 lg:py-36 bg-[#eae9e5] text-slate-900 overflow-hidden select-none"
    >
      {/* ── Crisp Ambient Background Dot Pattern ── */}
      <div className="absolute inset-0 bg-[radial-gradient(#99a1af_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-35 pointer-events-none" />

      <div className="mx-auto max-w-[1420px] w-full px-4 xs:px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-14 items-center">
          
          {/* ── LEFT COLUMN: TAPED PAPER SHEET FORM WITH 3D AVATAR SITTING ON TOP ── */}
          <div className="lg:col-span-6 relative pt-36 sm:pt-44 lg:pt-48 flex justify-center lg:justify-start">
            
            {/* 3D Usama Avatar Sitting on Top Edge with Legs Dangling Over Note */}
            <div className="absolute -top-[122px] sm:-top-[144px] left-1/2 -translate-x-1/2 z-30 w-[150px] sm:w-[175px] pointer-events-none drop-shadow-[0_14px_24px_rgba(0,0,0,0.20)]">
              {/* Floating Speech Bubble */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1, y: [0, -3, 0] }}
                transition={{
                  opacity: { duration: 0.4 },
                  y: { repeat: Infinity, duration: 3.5, ease: 'easeInOut' },
                }}
                className="absolute -top-6.5 left-1/2 -translate-x-1/2 bg-white/95 border border-slate-200/90 text-slate-800 text-[10.5px] font-bold px-3 py-0.5 rounded-full shadow-md whitespace-nowrap z-40 flex items-center gap-1 backdrop-blur-xs"
              >
                <span>Ready to build? 🚀</span>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white border-b border-r border-slate-200/90 rotate-45" />
              </motion.div>

              <motion.div
                animate={{
                  y: [0, -4, 0],
                  rotate: [-1.2, 1.2, -1.2],
                }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-full h-[190px] sm:h-[220px] origin-bottom"
              >
                <Image
                  src="/usaam_emoji.png"
                  alt="Usama 3D Avatar giving thumbs up"
                  fill
                  className="object-contain object-bottom select-none"
                  priority
                />
              </motion.div>
            </div>

            {/* The Stylized Paper Note Sheet with Retro Phone */}
            <div className="relative w-full max-w-[450px] md:ml-48 lg:ml-56 mt-4 sm:mt-8 bg-[#faf8f3]/95 rounded-[22px] sm:rounded-[26px] p-6 sm:p-7 pt-16 sm:pt-20 border border-[#e2ded4] shadow-[0_18px_48px_rgba(0,0,0,0.09)] backdrop-blur-lg">
              
              {/* ── RETRO RED TELEPHONE HANDSET (LEFT OF FORM, CONTINUING WIRE SAFELY BELOW FORM) ── */}
              <div className="hidden sm:block absolute -left-44 lg:-left-52 top-12 sm:top-16 z-20 pointer-events-none">
                <RetroPhone cordWidth={920} wireBottomY={620} />
              </div>
              
              {/* Top-Left Masking Tape Strip */}
              <div className="absolute -top-3 left-6 w-20 h-7 bg-lime-200/70 backdrop-blur-[1px] border border-lime-300/60 -rotate-[8deg] shadow-[0_2px_6px_rgba(0,0,0,0.06)] z-20 pointer-events-none rounded-xs" />
              
              {/* Top-Right Masking Tape Strip */}
              <div className="absolute -top-3 right-6 w-20 h-7 bg-lime-200/70 backdrop-blur-[1px] border border-lime-300/60 rotate-[7deg] shadow-[0_2px_6px_rgba(0,0,0,0.06)] z-20 pointer-events-none rounded-xs" />

              {/* Form Heading Inside Paper */}
              <div className="text-left font-sans mb-5 sm:mb-6">
                <span className="text-[#0052ff] text-[11px] font-extrabold uppercase tracking-widest block mb-1">
                  GET IN TOUCH
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold font-sans uppercase tracking-tight leading-tight text-slate-950">
                  LET&apos;S MAKE IT FUN
                </h3>
                <p className="text-xs sm:text-[12.5px] font-medium mt-1 text-slate-500">
                  Fill in the details below and I&apos;ll get back to you within 24 hours.
                </p>
              </div>

              {/* Interactive Form Fields */}
              <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4 text-left font-sans">
                <div>
                  <label className="flex items-center justify-between text-[10.5px] font-bold uppercase tracking-wider mb-1.5 text-slate-600">
                    <span>Your Name</span>
                    <span className="text-[9.5px] font-semibold text-[#0052ff] lowercase">*required</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 sm:py-2.5 rounded-xl border border-[#ded7c8] bg-white/80 hover:bg-white text-slate-900 text-[13px] sm:text-sm placeholder:text-slate-400 font-medium shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:border-slate-400 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 focus:bg-white transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="flex items-center justify-between text-[10.5px] font-bold uppercase tracking-wider mb-1.5 text-slate-600">
                    <span>Email Address</span>
                    <span className="text-[9.5px] font-semibold text-[#0052ff] lowercase">*required</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 sm:py-2.5 rounded-xl border border-[#ded7c8] bg-white/80 hover:bg-white text-slate-900 text-[13px] sm:text-sm placeholder:text-slate-400 font-medium shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:border-slate-400 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 focus:bg-white transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block text-[10.5px] font-bold uppercase tracking-wider mb-1.5 text-slate-600">
                    Project Type
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Next.js SaaS Web App / Portfolio Redesign"
                    value={formState.projectType}
                    onChange={(e) => setFormState({ ...formState, projectType: e.target.value })}
                    className="w-full px-3.5 py-2.5 sm:py-2.5 rounded-xl border border-[#ded7c8] bg-white/80 hover:bg-white text-slate-900 text-[13px] sm:text-sm placeholder:text-slate-400 font-medium shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:border-slate-400 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 focus:bg-white transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="flex items-center justify-between text-[10.5px] font-bold uppercase tracking-wider mb-1.5 text-slate-600">
                    <span>Tell Me More About It</span>
                    <span className="text-[9.5px] font-semibold text-[#0052ff] lowercase">*required</span>
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Timeline, goals, budget, or wild ideas..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 sm:py-2.5 rounded-xl border border-[#ded7c8] bg-white/80 hover:bg-white text-slate-900 text-[13px] sm:text-sm placeholder:text-slate-400 font-medium shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:border-slate-400 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 focus:bg-white transition-all duration-200 resize-none"
                  />
                </div>

                {/* Submit Button Centered Inline-Block */}
                <div className="flex justify-center pt-2 sm:pt-2.5">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#0052ff] hover:bg-[#003fcc] text-white font-extrabold text-xs sm:text-[13px] uppercase tracking-wider shadow-[0_10px_22px_rgba(0,82,255,0.35)] hover:shadow-[0_14px_28px_rgba(0,82,255,0.48)] transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                  >
                    {submitted ? (
                      <>
                        <Check className="w-4 h-4 text-white" />
                        <span>Message Dispatched!</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-3.5 h-3.5 text-white" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

          </div>

          {/* ── RIGHT COLUMN: OVERSIZED "LET'S TALK SAY HI" TYPOGRAPHY & CHANNELS ── */}
          <div className="lg:col-span-6 text-left font-sans space-y-8 sm:space-y-10 lg:pl-6">
            
            {/* Massive Hero Heading */}
            <div className="space-y-1">
              <h2 className="text-5xl xs:text-6xl sm:text-7xl lg:text-[86px] font-extrabold font-sans tracking-tight text-slate-950 uppercase leading-[0.92]">
                LET&apos;S TALK
              </h2>
              <div className="text-5xl xs:text-6xl sm:text-7xl lg:text-[86px] font-extrabold font-sans tracking-tight uppercase leading-[0.92] text-[#0052ff] drop-shadow-sm">
                SAY HI
              </div>
            </div>

            <p className="text-base sm:text-lg lg:text-xl text-slate-600 font-normal leading-relaxed max-w-lg">
              Got a project, a wild idea, or just wanna say hi? Hit me up, coffee is on me. Let&apos;s build something that stops people in their tracks.
            </p>

            {/* Floating Docked Card / Quick Badges */}
            <div className="rounded-[24px] bg-white/90 backdrop-blur-md p-6 border border-slate-200/80 shadow-[0_12px_35px_rgba(15,23,42,0.06)] max-w-lg space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Available for Select Q3/Q4 Projects
                </span>
              </div>

              {/* Email Copy Pill */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs sm:text-[13px] font-bold transition-colors cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-600" />
                  <span>developer@usamafaheem.com</span>
                  {copiedEmail ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </button>

                <a
                  href="https://wa.me/923249000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs sm:text-[13px] font-bold border border-emerald-200 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Chat</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>

              <div className="pt-2 flex items-center gap-2 text-xs text-slate-500 font-medium">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>Lahore, Pakistan • Working with clients worldwide</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

/*
================================================================================
PREVIOUS IMPLEMENTATION (COMMENTED OUT FOR FUTURE REFERENCE AS REQUESTED)
================================================================================

interface CharConfig {
  char: string;
  y: number;
  rotate: number;
}

const customCharConfigs: CharConfig[] = [
  { char: 'i', y: 0, rotate: 0 },
  { char: ' ', y: 0, rotate: 0 },
  { char: 't', y: -75, rotate: -6 },
  { char: 'r', y: 80, rotate: 6 },
  { char: 'a', y: -75, rotate: -5 },
  { char: 'n', y: 80, rotate: 7 },
  { char: 's', y: -75, rotate: -6 },
  { char: 'f', y: 80, rotate: 5 },
  { char: 'o', y: -75, rotate: -7 },
  { char: 'r', y: 80, rotate: 6 },
  { char: 'm', y: -75, rotate: -5 },
  { char: ' ', y: 0, rotate: 0 },
  { char: 'i', y: 80, rotate: 6 },
  { char: 'd', y: -75, rotate: -6 },
  { char: 'e', y: 80, rotate: 7 },
  { char: 'a', y: -75, rotate: -5 },
  { char: 's', y: 80, rotate: 6 },
  { char: ' ', y: 0, rotate: 0 },
  { char: 'i', y: -75, rotate: -6 },
  { char: 'n', y: 80, rotate: 6 },
  { char: 't', y: -75, rotate: -5 },
  { char: 'o', y: 80, rotate: 7 },
  { char: ' ', y: 0, rotate: 0 },
  { char: 'p', y: -80, rotate: -7 },
  { char: 'r', y: 85, rotate: 6 },
  { char: 'o', y: -80, rotate: -6 },
  { char: 'd', y: 85, rotate: 7 },
  { char: 'u', y: -80, rotate: -5 },
  { char: 'c', y: 85, rotate: 6 },
  { char: 't', y: -80, rotate: -7 },
  { char: 'i', y: 85, rotate: 5 },
  { char: 'o', y: -80, rotate: -6 },
  { char: 'n', y: 85, rotate: 7 },
  { char: '-', y: 0, rotate: 0 },
  { char: 'r', y: -80, rotate: -6 },
  { char: 'e', y: 85, rotate: 6 },
  { char: 'a', y: -80, rotate: -7 },
  { char: 'd', y: 85, rotate: 5 },
  { char: 'y', y: -80, rotate: -6 },
  { char: ' ', y: 0, rotate: 0 },
  { char: 'a', y: 85, rotate: 6 },
  { char: 'p', y: -80, rotate: -7 },
  { char: 'p', y: 85, rotate: 7 },
  { char: 'l', y: -80, rotate: -6 },
  { char: 'i', y: 85, rotate: 6 },
  { char: 'c', y: -80, rotate: -5 },
  { char: 'a', y: 85, rotate: 7 },
  { char: 't', y: -80, rotate: -6 },
  { char: 'i', y: 85, rotate: 6 },
  { char: 'o', y: -80, rotate: -7 },
  { char: 'n', y: 85, rotate: 5 },
  { char: 's', y: -80, rotate: -6 },
  { char: '.', y: 0, rotate: 0 },
];
================================================================================
*/
