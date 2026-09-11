'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Send, Check, Copy, ArrowUpRight, MessageCircle, Mail, MapPin, Sparkles } from 'lucide-react';

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
    navigator.clipboard.writeText('usamafaheem989@gmail.com');
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
          <div className="lg:col-span-6 relative pt-32 sm:pt-40 flex justify-center lg:justify-start">
            
            {/* 3D Usama Avatar Sitting on Top Edge with Legs Dangling Over Note */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 lg:left-1/2 lg:-translate-x-1/2 z-30 w-[240px] sm:w-[290px] pointer-events-none drop-shadow-[0_15px_25px_rgba(0,0,0,0.22)]">
              <motion.div
                initial={{ y: -10 }}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-full h-[280px] sm:h-[340px]"
              >
                <Image
                  src="/usama_sitting_avatar.png"
                  alt="Usama 3D Avatar sitting on paper note"
                  fill
                  className="object-contain object-bottom select-none"
                  priority
                />
              </motion.div>
            </div>

            {/* The Stylized Paper Note Sheet */}
            <div className="relative w-full max-w-[500px] bg-[#faf8f3] rounded-[24px] sm:rounded-[28px] p-6 xs:p-8 sm:p-10 pt-16 sm:pt-20 border border-[#e2ded4] shadow-[0_20px_60px_rgba(0,0,0,0.08),0_4px_16px_rgba(0,0,0,0.04)]">
              
              {/* Top-Left Masking Tape Strip */}
              <div className="absolute -top-3.5 left-8 w-24 h-8 bg-amber-200/70 backdrop-blur-[1px] border border-amber-300/60 -rotate-[10deg] shadow-[0_2px_6px_rgba(0,0,0,0.08)] z-20 pointer-events-none rounded-xs" />
              
              {/* Top-Right Masking Tape Strip */}
              <div className="absolute -top-3.5 right-8 w-24 h-8 bg-amber-200/70 backdrop-blur-[1px] border border-amber-300/60 rotate-[8deg] shadow-[0_2px_6px_rgba(0,0,0,0.08)] z-20 pointer-events-none rounded-xs" />

              {/* Form Heading Inside Paper */}
              <div className="text-left font-sans mb-6 sm:mb-8">
                <span className="text-[#e11d48] text-xs font-black uppercase tracking-widest block mb-1">
                  GET IN TOUCH
                </span>
                <h3 className="text-2xl sm:text-3xl font-black font-sans text-slate-950 uppercase tracking-tight leading-tight">
                  LET&apos;S MAKE IT FUN
                </h3>
                <p className="text-xs sm:text-[13px] text-slate-500 font-medium mt-1">
                  Fill in the details below and I&apos;ll get back to you within 24 hours.
                </p>
              </div>

              {/* Interactive Form Fields */}
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-4.5 text-left font-sans">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-4 py-3 sm:py-3.5 rounded-[14px] bg-[#f0ebe1] border border-[#ded7c8] text-slate-900 text-sm placeholder-slate-400 font-medium focus:outline-none focus:border-slate-800 focus:bg-[#ede6da] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full px-4 py-3 sm:py-3.5 rounded-[14px] bg-[#f0ebe1] border border-[#ded7c8] text-slate-900 text-sm placeholder-slate-400 font-medium focus:outline-none focus:border-slate-800 focus:bg-[#ede6da] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Project Type
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Next.js SaaS Web App / Portfolio Redesign"
                    value={formState.projectType}
                    onChange={(e) => setFormState({ ...formState, projectType: e.target.value })}
                    className="w-full px-4 py-3 sm:py-3.5 rounded-[14px] bg-[#f0ebe1] border border-[#ded7c8] text-slate-900 text-sm placeholder-slate-400 font-medium focus:outline-none focus:border-slate-800 focus:bg-[#ede6da] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Tell Me More About It
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Timeline, goals, budget, or wild ideas..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-[14px] bg-[#f0ebe1] border border-[#ded7c8] text-slate-900 text-sm placeholder-slate-400 font-medium focus:outline-none focus:border-slate-800 focus:bg-[#ede6da] transition-colors resize-none"
                  />
                </div>

                {/* Submit Pill Button */}
                <button
                  type="submit"
                  className="w-full mt-2 py-4 px-6 rounded-full bg-gradient-to-r from-[#ff381e] to-[#e0240d] hover:from-[#e0240d] hover:to-[#b81804] text-white font-black text-sm uppercase tracking-wider shadow-[0_10px_25px_rgba(239,68,68,0.35)] transition-all transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {submitted ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Message Dispatched!</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>

          </div>

          {/* ── RIGHT COLUMN: OVERSIZED "LET'S TALK SAY HI" TYPOGRAPHY & CHANNELS ── */}
          <div className="lg:col-span-6 text-left font-sans space-y-8 sm:space-y-10 lg:pl-6">
            
            {/* Massive Hero Heading */}
            <div className="space-y-1">
              <h2 className="text-5xl xs:text-6xl sm:text-7xl lg:text-[86px] font-black font-sans tracking-tight text-slate-950 uppercase leading-[0.92]">
                LET&apos;S TALK
              </h2>
              <div className="text-5xl xs:text-6xl sm:text-7xl lg:text-[86px] font-black font-sans tracking-tight uppercase leading-[0.92] bg-gradient-to-r from-[#8b5cf6] via-[#ec4899] to-[#f97316] bg-clip-text text-transparent drop-shadow-sm">
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
                  <span>usamafaheem989@gmail.com</span>
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
