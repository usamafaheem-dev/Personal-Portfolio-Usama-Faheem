'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Sparkles, ShieldCheck, Heart, Star, Code2, ExternalLink } from 'lucide-react';

export default function WhatIDoDifferently() {
  return (
    <section id="difference" className="bg-[#f8fafc] py-14 md:py-24 overflow-hidden font-sans select-none relative text-gray-900 border-t border-b border-slate-200">
      {/* ── Precision Dotted Grid Background Pattern ── */}
      <div className="absolute inset-0 bg-[radial-gradient(#99a1af_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-40 pointer-events-none [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_60%,transparent_100%)]" />

      <div className="mx-auto max-w-[1420px] w-full px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Top Outer Container (Headline & Pop-out Space) */}
        <div className="relative pt-6 pb-2 md:pb-6">

          {/* Decorative Brush Stroke / Swoosh Line Behind Line 2 (USAMA? & EXCELLENCE) */}
          <div className="absolute top-[48px] sm:top-[56px] md:top-[60px] left-2 right-2 md:left-8 md:right-8 h-10 sm:h-14 md:h-16 bg-gradient-to-r from-amber-300/70 via-yellow-400/80 to-lime-300/70 rounded-full blur-[1px] opacity-80 -rotate-1 pointer-events-none z-0"></div>

          {/* Decorative Star */}
          <div className="absolute top-2 right-4 text-amber-500 opacity-90 pointer-events-none z-10">
            <Star size={28} className="fill-amber-500" />
          </div>

          {/* Big Typography Header (Stepped 2-Line Layout: Line 1 above swoosh, Line 2 inside swoosh) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 items-end z-10 relative mb-4 md:mb-0 px-2 sm:px-4">

            {/* Left Side: Why Work With (Line 1 Top) / USAMA? (Line 2 Bottom, Indented) */}
            <div className="text-left font-poppins">
              <h2 className="text-[#0f172a] tracking-tight leading-none font-poppins">
                <span className="text-xl sm:text-3xl lg:text-4xl font-extrabold italic text-[#0f172a] block mb-1 tracking-tight">
                  Why Work With
                </span>
                <span className="text-4xl sm:text-6xl lg:text-[72px] font-black uppercase text-amber-500 block leading-none pl-4 sm:pl-10 tracking-tight">
                  USAMA?
                </span>
              </h2>
            </div>

            {/* Right Side: Engineered For (Line 1 Top) / EXCELLENCE (Line 2 Bottom) */}
            <div className="text-left md:text-right font-poppins">
              <h2 className="text-[#0f172a] tracking-tight leading-none font-poppins">
                <span className="text-xl sm:text-3xl lg:text-4xl font-extrabold italic text-[#0f172a] block mb-1 tracking-tight">
                  Engineered For
                </span>
                <span className="text-4xl sm:text-6xl lg:text-[72px] font-black uppercase text-lime-600 block leading-none pr-4 sm:pr-10 tracking-tight">
                  EXCELLENCE
                </span>
              </h2>
            </div>

          </div>

          {/* Main Card Box (Vibrant Yellow to Lime Gradient Container) */}
          <div className="relative mt-8 md:mt-12 bg-gradient-to-br from-yellow-400 via-amber-400 to-lime-400 rounded-[32px] md:rounded-[44px] p-6 sm:p-10 lg:p-14 text-gray-950 shadow-[0_25px_60px_rgba(250,204,21,0.35)] border border-yellow-300 min-h-[500px] md:min-h-[560px] flex flex-col justify-between">

            {/* Background Decorative Wavy Circles */}
            <div className="absolute inset-0 rounded-[32px] md:rounded-[44px] overflow-hidden opacity-25 pointer-events-none">
              <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] rounded-full border-[60px] border-white/40 blur-xl"></div>
              <div className="absolute top-1/2 right-1/3 translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full border-[50px] border-white/40 blur-xl"></div>
            </div>

            {/* Inner Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-20 h-full">

              {/* Left Column (Heading, Description, CTA, Social Proof) - 5 cols */}
              <div className="md:col-span-5 space-y-6 text-left">

                {/* Clear Section Purpose Badge */}
                <div className="inline-flex items-center gap-2.5 bg-black/10 backdrop-blur-xl border border-black/20 px-4 py-2 rounded-full shadow-sm">
                  <Sparkles size={14} className="text-gray-950 fill-gray-950" />
                  <span className="font-bold text-[11px] tracking-[0.16em] text-gray-950 uppercase font-poppins">THE CREATIVE DEV DIFFERENCE</span>
                </div>

                {/* Main Headline (Creative Precision on Next Line) */}
                <h3 className="text-3xl sm:text-4xl lg:text-[44px] font-black leading-[1.1] tracking-tight text-gray-950 font-poppins">
                  Where Code Meets <br />
                  <span className="text-[#3b0764] underline underline-offset-8 decoration-black/20">Creative Precision</span>
                </h3>

                {/* Description (Clear Purpose) */}
                <p className="text-gray-900/90 text-sm sm:text-base font-normal leading-relaxed max-w-md font-sans">
                  I craft high-converting, ultra-fast web applications using Next.js 15, Framer Motion, and 1:1 Figma translations — built to load instantly and win clients.
                </p>

                {/* CTA Button */}
                <div>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-3 bg-[#0f0728] hover:bg-black text-white px-8 py-4 rounded-full font-bold text-sm tracking-wide shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:scale-105 transition-all group font-poppins"
                  >
                    <span>START A PROJECT</span>
                    <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                      <ArrowRight size={15} className="text-white" />
                    </div>
                  </a>
                </div>

                {/* Bottom Social Proof Badge */}
                <div className="pt-2">
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

              </div>

              {/* Middle Spacer for Person */}
              <div className="hidden md:block md:col-span-2"></div>

              {/* Right Column (Badges + Featured Card) - 5 cols */}
              <div className="md:col-span-5 flex flex-col items-start md:items-end space-y-6 font-sans">

                {/* 2 Feature Badges */}
                <div className="flex flex-wrap gap-3 justify-start md:justify-end font-sans">

                  {/* Speed Score Badge */}
                  <div className="flex items-center gap-2.5 bg-black/10 backdrop-blur-xl border border-black/15 px-4 py-2 rounded-2xl shadow-sm font-sans">
                    <div className="w-6 h-6 rounded-lg bg-black/10 flex items-center justify-center">
                      <Zap size={14} className="text-gray-950 fill-gray-950" />
                    </div>
                    <span className="text-xs font-bold tracking-tight text-gray-950 font-sans">99+ Lighthouse Speed</span>
                  </div>

                  {/* Clean Code Badge */}
                  <div className="flex items-center gap-2.5 bg-black/10 backdrop-blur-xl border border-black/15 px-4 py-2 rounded-2xl shadow-sm font-sans">
                    <div className="w-6 h-6 rounded-lg bg-black/10 flex items-center justify-center">
                      <Code2 size={14} className="text-gray-950" />
                    </div>
                    <span className="text-xs font-bold tracking-tight text-gray-950 font-sans">Next.js 15 & TS Specs</span>
                  </div>

                </div>

                {/* Featured Showcase Card (Linked to SoftCr8ors.com in _blank) */}
                <div className="bg-white text-gray-950 p-4 rounded-[28px] shadow-2xl w-full max-w-[310px] border border-black/10 group hover:scale-[1.02] transition-all duration-300 font-sans">
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

              </div>

            </div>

            {/* Subject Image */}
            <div className="absolute inset-x-0 bottom-0 top-[-70px] md:top-[-110px] flex justify-center items-end pointer-events-none z-30">
              <div className="relative w-[300px] sm:w-[380px] md:w-[440px] lg:w-[480px] h-[115%] md:h-[120%]">
                <Image
                  src="/man_cutout.png"
                  alt="Usama - Creative Developer"
                  fill
                  className="object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.35)]"
                  priority
                />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
