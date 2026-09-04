'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Sparkles, ShieldCheck, Heart, Star, Code2, ExternalLink } from 'lucide-react';

export default function WhatIDoDifferently() {
  return (
    <section id="difference" className="bg-[#f8fafc] py-10 sm:py-14 lg:py-18 overflow-hidden font-sans select-none relative text-gray-900 border-t border-b border-slate-200">
      {/* ── Precision Dotted Grid Background Pattern ── */}
      <div className="absolute inset-0 bg-[radial-gradient(#99a1af_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-40 pointer-events-none [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_60%,transparent_100%)]" />

      <div className="mx-auto max-w-[1420px] w-full px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Top Outer Container (Headline & Pop-out Space) */}
        <div className="relative pt-2 sm:pt-4 pb-1 md:pb-4">

          {/* Decorative Brush Stroke / Swoosh Line Behind Line 2 & 4 (USAMA? & EXCELLENCE) */}
          <div className="absolute top-[68px] min-[360px]:top-[64px] min-[400px]:top-[60px] sm:top-[68px] md:top-[60px] left-2 right-2 md:left-8 md:right-8 h-10 sm:h-14 md:h-16 bg-gradient-to-r from-amber-300/70 via-yellow-400/80 to-lime-300/70 rounded-full blur-[1px] opacity-80 -rotate-1 pointer-events-none z-0"></div>

          {/* Decorative Star */}
          <div className="absolute top-2 right-4 text-amber-500 opacity-90 pointer-events-none z-10 hidden sm:block">
            <Star size={28} className="fill-amber-500" />
          </div>

          {/* 🌟 Stylish Top Badge */}
          <div className="flex justify-center md:justify-start mb-3 sm:mb-4 relative z-10">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#ffaa00]/15 via-[#ffea00]/15 to-[#ccff00]/15 border border-[#ffaa00]/30 px-3.5 py-1 rounded-full text-xs font-bold text-amber-800 uppercase tracking-widest font-poppins shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#ffaa00]" />
              <span>WHY CHOOSE USAMA</span>
            </div>
          </div>

          {/* Big Typography Header (Stepped 2-Line Layout) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-16 items-end z-10 relative mb-4 md:mb-0 px-2 sm:px-4">

            {/* Left Side: Why Work With (Line 1 Top) / USAMA? (Line 2 Bottom, Indented) */}
            <div className="text-left font-poppins">
              <h2 className="text-[#0f172a] tracking-tight leading-none font-poppins">
                <span className="text-xl sm:text-3xl lg:text-4xl font-extrabold italic text-[#0f172a] block mb-1 tracking-tight">
                  Why Work With
                </span>
                <span className="text-4xl sm:text-6xl lg:text-[72px] font-black uppercase text-amber-500 block leading-none pl-9 sm:pl-10 tracking-tight">
                  USAMA?
                </span>
              </h2>
            </div>

            {/* Right Side: Engineered For (Line 1 Top, Left on mobile) / EXCELLENCE (Line 2 Bottom) */}
            <div className="font-poppins mt-2 md:mt-0">
              <h2 className="text-[#0f172a] tracking-tight leading-none font-poppins">
                <span className="text-xl sm:text-3xl lg:text-4xl font-extrabold italic text-[#0f172a] block text-left md:text-right mb-1 tracking-tight">
                  Engineered For
                </span>
                <span className="text-4xl sm:text-6xl lg:text-[72px] font-black uppercase text-lime-600 block text-right leading-none pr-4 sm:pr-10 tracking-tight">
                  EXCELLENCE
                </span>
              </h2>
            </div>

          </div>

          {/* Main Card Box (Vibrant Yellow to Lime Gradient Container) */}
          <div className="relative mt-4 sm:mt-6 md:mt-10 bg-gradient-to-br from-yellow-400 via-amber-400 to-lime-400 rounded-[28px] sm:rounded-[32px] md:rounded-[44px] p-5 sm:p-10 lg:p-14 text-gray-950 shadow-[0_25px_60px_rgba(250,204,21,0.35)] border border-yellow-300 min-h-[380px] md:min-h-[560px] flex flex-col justify-between">

            {/* Background Decorative Wavy Circles */}
            <div className="absolute inset-0 rounded-[28px] sm:rounded-[32px] md:rounded-[44px] overflow-hidden opacity-25 pointer-events-none">
              <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full border-[60px] border-white/40 blur-xl"></div>
              <div className="absolute top-1/2 right-1/3 translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full border-[50px] border-white/40 blur-xl"></div>
            </div>

            {/* Inner Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 items-center relative z-20 h-full">

              {/* Left Column (Heading, Description, CTA, Social Proof) - 5 cols */}
              <motion.div
                initial={{ opacity: 0, y: -25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="md:col-span-5 space-y-3.5 sm:space-y-6 text-center md:text-left flex flex-col items-center md:items-start relative z-20"
              >

                {/* Clear Section Purpose Badge (Single Line on Mobile) */}
                <div className="inline-flex items-center gap-2 bg-black/10 backdrop-blur-xl border border-black/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-sm max-w-full">
                  <Sparkles size={13} className="text-gray-950 fill-gray-950 shrink-0" />
                  <span className="font-bold text-[9px] min-[360px]:text-[10px] sm:text-[11px] tracking-[0.12em] sm:tracking-[0.16em] text-gray-950 uppercase font-poppins whitespace-nowrap">THE CREATIVE DEV DIFFERENCE</span>
                </div>

                {/* Main Headline (Creative Precision on Next Line) */}
                <h3 className="text-2xl sm:text-4xl lg:text-[44px] font-black leading-[1.15] sm:leading-[1.1] tracking-tight text-gray-950 font-poppins">
                  Where Code Meets <br className="hidden sm:inline" />
                  <span className="text-[#3b0764] underline underline-offset-4 sm:underline-offset-8 decoration-black/20">Creative Precision</span>
                </h3>

                {/* Description (Clear Purpose) */}
                <p className="text-gray-900/90 text-xs sm:text-base font-normal leading-relaxed max-w-md font-sans">
                  I craft high-converting, ultra-fast web applications using Next.js 15, Framer Motion, and 1:1 Figma translations — built to load instantly and win clients.
                </p>

                {/* CTA Button */}
                <div>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-3 bg-[#0f0728] hover:bg-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-xs sm:text-sm tracking-wide shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:scale-105 transition-all group font-poppins"
                  >
                    <span>START A PROJECT</span>
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                      <ArrowRight size={14} className="text-white" />
                    </div>
                  </a>
                </div>

                {/* Bottom Social Proof Badge (Desktop Only) */}
                <div className="hidden md:block pt-2">
                  <div className="inline-flex items-center gap-3 bg-black/10 backdrop-blur-xl border border-black/15 px-5 py-3 rounded-2xl shadow-md font-sans">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gray-950 border-2 border-yellow-400 flex items-center justify-center text-[10px] font-bold text-amber-300 font-sans">JS</div>
                      <div className="w-8 h-8 rounded-full bg-gray-950 border-2 border-yellow-400 flex items-center justify-center text-[10px] font-bold text-lime-400 font-sans">TS</div>
                      <div className="w-8 h-8 rounded-full bg-gray-950 border-2 border-yellow-400 flex items-center justify-center text-[10px] font-bold text-cyan-400 font-sans">NX</div>
                    </div>
                    <div className="text-left font-sans">
                      <p className="text-xs font-bold flex items-center gap-1 text-gray-950 tracking-tight">
                        100% Client Satisfaction <Heart size={12} className="fill-rose-600 text-rose-600 inline" />
                      </p>
                      <p className="text-[10px] text-gray-800 font-medium">Delivered 20+ Global Web Projects</p>
                    </div>
                  </div>
                </div>

              </motion.div>

              {/* Middle Spacer for Person */}
              <div className="hidden md:block md:col-span-2"></div>

              {/* Right Column (Badges + Featured Card) - 5 cols */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
                className="md:col-span-5 flex flex-col items-center md:items-end space-y-3 sm:space-y-6 font-sans relative z-20"
              >

                {/* Feature Badges */}
                <div className="flex flex-wrap gap-2 justify-center md:justify-end font-sans">

                  {/* Speed Score Badge */}
                  <div className="flex items-center gap-2 bg-black/10 backdrop-blur-xl border border-black/15 px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl shadow-sm font-sans">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-black/10 flex items-center justify-center">
                      <Zap size={13} className="text-gray-950 fill-gray-950" />
                    </div>
                    <span className="text-[11px] sm:text-xs font-bold tracking-tight text-gray-950 font-sans">99+ Lighthouse Speed</span>
                  </div>

                  {/* Clean Code Badge */}
                  <div className="flex items-center gap-2 bg-black/10 backdrop-blur-xl border border-black/15 px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl shadow-sm font-sans">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-black/10 flex items-center justify-center">
                      <Code2 size={13} className="text-gray-950" />
                    </div>
                    <span className="text-[11px] sm:text-xs font-bold tracking-tight text-gray-950 font-sans">Next.js 15 & TS Specs</span>
                  </div>

                  {/* Mobile-Only SoftCr8ors Direct Link Pill Button */}
                  <a
                    href="https://softcr8ors.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex md:hidden items-center gap-2 bg-black/10 backdrop-blur-xl border border-black/15 px-3 py-1.5 rounded-2xl shadow-sm hover:bg-black/20 transition-colors font-sans"
                  >
                    <div className="w-4 h-4 rounded-md overflow-hidden bg-white p-0.5 flex-shrink-0">
                      <img src="/softcr8ors_preview.png" alt="SoftCr8ors" className="w-full h-full object-cover object-top rounded-sm" />
                    </div>
                    <span className="text-[11px] font-bold text-gray-950">Visit SoftCr8ors</span>
                    <ExternalLink size={11} className="text-gray-950" />
                  </a>

                </div>

                {/* Featured Showcase Card (Desktop Only) */}
                <div className="hidden md:block bg-white text-gray-950 p-4 rounded-[28px] shadow-2xl w-full max-w-[310px] border border-black/10 group hover:scale-[1.02] transition-all duration-300 font-sans">
                  <div className="flex items-center justify-between mb-2.5 font-sans">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 font-sans">FEATURED CLIENT WORK</span>
                    <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
                  </div>

                  <a
                    href="https://softcr8ors.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative w-full h-[155px] rounded-2xl overflow-hidden mb-3 bg-gray-100 border border-black/5"
                  >
                    <Image
                      src="/softcr8ors_preview.png"
                      alt="SoftCr8ors Preview"
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  </a>

                  <div className="flex items-center justify-between font-sans">
                    <div className="font-sans">
                      <h4 className="font-bold text-sm text-gray-950 leading-tight tracking-tight font-sans">SoftCr8ors Platform</h4>
                      <p className="text-[11px] text-gray-600 font-normal font-sans">Agency & Tech Solutions</p>
                    </div>
                    <a
                      href="https://softcr8ors.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 bg-[#0f0728] hover:bg-black text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-md transition-all shrink-0 font-sans"
                    >
                      <span>Visit</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>

              </motion.div>

            </div>

            {/* Subject Image (Animates in FIRST on mobile & desktop, low opacity on mobile for 100% text readability) */}
            <div className="absolute inset-x-0 bottom-0 top-[-30px] sm:top-[-80px] md:top-[-110px] flex justify-center items-end pointer-events-none z-10 opacity-25 sm:opacity-40 md:opacity-100">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-[250px] sm:w-[380px] md:w-[440px] lg:w-[480px] h-[100%] sm:h-[115%] md:h-[120%]"
              >
                <Image
                  src="/man_cutout.png"
                  alt="Usama - Creative Developer"
                  fill
                  className="object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)]"
                  priority
                />
              </motion.div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
