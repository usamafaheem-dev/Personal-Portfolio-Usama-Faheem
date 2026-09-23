'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';

export interface ProjectData {
  title: string;
  subtitle: string;
  quote: string;
  category: string;
  tech: string[];
  link: string;
  image: string;
  images?: string[];
  video?: string;
  stats?: { value: string; label: string }[];
  variant?: 'split' | 'split-reversed' | 'quote' | 'banner' | 'landscape' | 'stacked';
  cardBg?: string;
  imageFit?: 'cover' | 'contain' | 'top';
}

// One accent family: lime neon -> soft -> tint -> paper. Variation is tonal, not hue-based.
const THEMES = [
  {
    bg: 'bg-[#FFA946]', // Alex Lieberman exact yellow/orange: rgb(255, 169, 70)
    text: 'text-[#0f172a]',
    subtext: 'text-[#57534E]',
  },
  {
    bg: 'bg-[#34D399]', // Exact Wispr Flow is-green: rgb(52, 211, 153)
    text: 'text-[#064E3B]',
    subtext: 'text-[#047857]',
  },
  {
    bg: 'bg-[#F0D7FF]', // Lavender (Wispr Flow exact: rgb(240, 215, 255))
    text: 'text-[#0f172a]',
    subtext: 'text-[#3730A3]',
  },
  {
    bg: 'bg-[#F7F4EB]', // Warm Cream (Wispr Flow exact: rgb(247, 244, 235))
    text: 'text-[#0f172a]',
    subtext: 'text-[#57534E]',
  },
  {
    bg: 'bg-[#FFE4E6]', // Soft Rose (Wispr Flow exact: rgb(255, 228, 230))
    text: 'text-[#0f172a]',
    subtext: 'text-[#BE123C]',
  },
];

export default function ProjectCard({
  project,
  index = 0,
  isActive = true,
}: {
  project: ProjectData;
  index?: number;
  isActive?: boolean;
}) {
  const theme = THEMES[index % THEMES.length];
  const bgClass = project.cardBg || theme.bg;
  const variantType = project.variant || (index % 4 === 0 ? 'split' : index % 4 === 1 ? 'quote' : index % 4 === 2 ? 'banner' : 'split-reversed');
  const mediaSrc = project.video || project.image;
  const isMediaVideo = Boolean(mediaSrc && (mediaSrc.endsWith('.mp4') || mediaSrc.endsWith('.webm') || mediaSrc.endsWith('.mov')));

  const imageList = project.images && project.images.length > 0 ? project.images : [project.image];
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (imageList.length <= 1 || !isActive) return;
    const interval = setInterval(() => {
      setActiveImageIdx((prev) => (prev + 1) % imageList.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [imageList.length, isActive]);

  useEffect(() => {
    if (!isMediaVideo || !videoRef.current) return;
    if (isActive) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isActive, isMediaVideo]);

  // Helper to render single image, multi-image rotating carousel, or video
  const renderMediaViewport = (extraClasses = "w-full h-full object-cover object-top") => {
    if (isMediaVideo) {
      return (
        <video
          ref={videoRef}
          src={mediaSrc}
          loop
          muted
          playsInline
          preload="metadata"
          className={`w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-700 transform-gpu`}
        />
      );
    }

    if (imageList.length > 1) {
      return (
        <div className="relative w-full h-full overflow-hidden bg-black/5">
          {imageList.map((imgSrc, i) => (
            <img
              key={imgSrc}
              src={imgSrc}
              alt={`${project.title} - ${i + 1}`}
              className={`absolute inset-0 w-full h-full ${extraClasses} transition-all duration-700 ${
                i === activeImageIdx ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-105 pointer-events-none'
              }`}
            />
          ))}

          {/* Carousel Indicator Dots */}
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 shadow-lg">
            {imageList.map((_, dotIdx) => (
              <div
                key={dotIdx}
                className={`rounded-full transition-all duration-300 ${
                  dotIdx === activeImageIdx
                    ? 'w-4 h-1.5 bg-lime-400 shadow-[0_0_8px_rgba(163,230,53,0.8)]'
                    : 'w-1.5 h-1.5 bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>
      );
    }

    return (
      <img
        src={project.image}
        alt={project.title}
        className={`${extraClasses} group-hover:scale-[1.02] transition-transform duration-700`}
      />
    );
  };

  // ════════════════════════════════════════════════════════════════
  // VARIANT 4: "Landscape Showcase" (TOP: HEADING, QUOTE & TECH; BOTTOM: WIDE SCREENSHOT)
  // ════════════════════════════════════════════════════════════════
  if (variantType === 'landscape' || variantType === 'stacked') {
    return (
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className={`group relative flex flex-col justify-between w-full max-w-[690px] sm:max-w-[730px] h-[390px] sm:h-[435px] mx-auto rounded-[34px] sm:rounded-[42px] p-6 sm:p-7 shadow-2xl transition-all duration-500 hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.6)] border border-black/5 overflow-hidden ${bgClass}`}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* TOP SECTION: Header Info, Quote, Badges, and Stats */}
        <div className="relative z-10 flex flex-col gap-2">
          {/* Top Bar: Title & Category + Stats / View CTA */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="font-poppins font-extrabold text-lg sm:text-3xl tracking-tight uppercase text-[#0f172a] leading-none mb-1">
                {project.title}
              </div>
              <div className="text-[9px] sm:text-xs font-sans font-bold uppercase tracking-[0.15em] text-[#0f172a]/60">
                {project.category}
              </div>
            </div>

            {/* Quick Stats & Animated View CTA Button */}
            <div className="flex items-center gap-3 sm:gap-4">
              {project.stats && project.stats.length > 0 && (
                <div className="hidden sm:flex items-center gap-3 pr-3 border-r border-black/10">
                  {project.stats.map((s, i) => (
                    <div key={i} className="flex flex-col text-right">
                      <span className="font-sans text-lg sm:text-xl font-bold text-[#0f172a] leading-none">{s.value}</span>
                      <span className="text-[9px] font-sans font-semibold uppercase tracking-wider text-[#0f172a]/60">{s.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Styled Pill Button (Black Pill with Yellow Circle Icon by default, Glowing Yellow on Hover) */}
              <div className="inline-flex items-center gap-2 pl-4 pr-1.5 py-1.5 rounded-full bg-[#0f172a] text-white text-xs font-sans font-bold uppercase tracking-wider shadow-md transition-all duration-300 group-hover:bg-[#0052ff] group-hover:text-white group-hover:shadow-[0_6px_20px_rgba(0,82,255,0.45)] group-hover:scale-105 shrink-0">
                <span>View</span>
                <span className="w-5 h-5 rounded-full bg-[#d8ff00] text-black flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:text-[#0052ff] group-hover:scale-110 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight size={12} strokeWidth={2.5} />
                </span>
              </div>
            </div>
          </div>

          {/* Quote & Badges */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-0.5">
            <p className="font-sans text-[12.5px] sm:text-base md:text-[17px] font-normal leading-snug tracking-tight text-[#0f172a] line-clamp-2 max-w-xl">
              &ldquo;{project.quote}&rdquo;
            </p>

            {project.tech && (
              <div className="flex flex-wrap gap-1.5 shrink-0">
                {project.tech.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className={`px-3 py-1 rounded-full text-[11px] sm:text-xs font-mono font-bold bg-white/90 backdrop-blur-md text-slate-900 border border-lime-400/80 shadow-[0_2px_6px_rgba(163,230,53,0.2)] transition-all hover:bg-[#0f172a] hover:text-white ${
                      t.toLowerCase().includes('tailwind') ? 'hidden sm:inline-block' : ''
                    }`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM SECTION: Sleek Wide Landscape Browser Window Mockup */}
        <div className="relative z-10 w-full h-[205px] sm:h-[245px] mt-1 rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-xl border border-black/10 bg-white/95 group/frame flex flex-col">
          {/* Browser Window Top Bar */}
          <div className="w-full h-6 sm:h-7 bg-slate-100/95 border-b border-black/5 flex items-center px-3 gap-1.5 shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
            <div className="mx-auto px-3 py-0.5 rounded-md bg-white/80 border border-black/5 text-[10px] font-mono text-slate-600 font-medium truncate max-w-[220px]">
              {project.link.replace('https://', '').replace(/\/$/, '')}
            </div>
          </div>

          {/* Screenshot Viewport */}
          <div className="relative w-full flex-1 overflow-hidden bg-white">
            {renderMediaViewport()}
          </div>
        </div>
      </a>
    );
  }

  // ════════════════════════════════════════════════════════════════
  // VARIANT 1: "Slash Gear" Archetype (Square Serif Quote Card with Large Image Preview)
  // ════════════════════════════════════════════════════════════════
  if (variantType === 'quote') {
    return (
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className={`group relative flex flex-col justify-between w-full max-w-[520px] sm:max-w-[560px] h-[390px] sm:h-[435px] mx-auto rounded-[34px] sm:rounded-[42px] p-5 sm:p-6 ${project.cardBg || 'bg-[#F7F4EB]'} text-[#0f172a] shadow-2xl transition-all duration-500 hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.6)] border border-black/5 overflow-hidden`}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Top: Main Serif Quote & Badges */}
        <div className="relative z-10 flex flex-col gap-1.5">
          <p className="font-sans text-sm sm:text-base md:text-[17px] font-normal leading-snug tracking-tight text-[#0f172a] line-clamp-2">
            &ldquo;{project.quote}&rdquo;
          </p>

          {project.tech && (
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {project.tech.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono font-bold bg-white/90 backdrop-blur-md text-slate-900 border border-lime-400/80 shadow-sm ${
                    t.toLowerCase().includes('tailwind') ? 'hidden sm:inline-block' : ''
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Middle: Expanded Sleek Screenshot Preview Frame */}
        {mediaSrc && (
          <div className="relative z-10 w-full h-[165px] sm:h-[195px] my-1 rounded-[18px] sm:rounded-[22px] overflow-hidden shadow-md border border-black/10 bg-white">
            {renderMediaViewport()}
          </div>
        )}

        {/* Bottom: Author / Brand Row */}
        <div className="relative z-10 flex items-center justify-between pt-2.5 border-t border-black/10">
          <div>
            <div className="font-poppins font-extrabold text-sm sm:text-base uppercase text-[#0f172a] leading-tight">
              {project.title}
            </div>
            <div className="font-sans text-[11px] sm:text-xs text-[#57534E] font-medium tracking-wide">
              {project.category}
            </div>
          </div>

          <div className="inline-flex items-center gap-2 pl-3.5 pr-1.5 py-1.5 rounded-full bg-[#0f172a] text-white text-xs font-sans font-bold uppercase tracking-wider shadow-md transition-all duration-300 group-hover:bg-[#0052ff] group-hover:text-white group-hover:shadow-[0_6px_20px_rgba(0,82,255,0.45)] group-hover:scale-105">
            <span>View</span>
            <span className="w-5 h-5 rounded-full bg-[#d8ff00] text-black flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:text-[#0052ff] group-hover:scale-110 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight size={12} strokeWidth={2.5} />
            </span>
          </div>
        </div>
      </a>
    );
  }

  // ════════════════════════════════════════════════════════════════
  // VARIANT 2: "Alex Lieberman" Archetype (Portrait / Video Banner with Floating Bottom Card)
  // ════════════════════════════════════════════════════════════════
  if (variantType === 'banner') {
    return (
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className={`group relative flex flex-col justify-end w-full max-w-[420px] sm:max-w-[440px] h-[410px] sm:h-[450px] mx-auto rounded-[34px] sm:rounded-[42px] p-3 sm:p-3.5 shadow-2xl transition-all duration-500 hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.6)] border border-black/5 overflow-hidden ${bgClass || 'bg-[#D6E6F8]'}`}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Inner Image Viewport Frame */}
        <div className="absolute inset-3 sm:inset-3.5 rounded-[26px] sm:rounded-[32px] overflow-hidden shadow-md border border-black/10 bg-slate-900">
          {renderMediaViewport('w-full h-full object-cover object-top')}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Floating Bottom Card */}
        <div className="relative z-10 w-full min-h-[180px] sm:min-h-[195px] p-4 sm:p-5 rounded-[22px] sm:rounded-[26px] bg-white/95 backdrop-blur-xl shadow-xl border border-black/5 flex flex-col justify-between">
          <div>
            <p className="font-sans text-sm sm:text-base font-normal leading-snug tracking-tight text-[#0f172a] line-clamp-2 mb-2">
              &ldquo;{project.quote}&rdquo;
            </p>

            {project.tech && (
              <div className="flex flex-wrap gap-1 mb-2">
                {project.tech.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white/90 backdrop-blur-md text-slate-900 border border-lime-400/80 shadow-sm ${
                      t.toLowerCase().includes('tailwind') ? 'hidden sm:inline-block' : ''
                    }`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-black/10">
            <div>
              <div className="font-poppins font-extrabold text-xs sm:text-sm uppercase tracking-wider text-[#0f172a]">
                {project.title}
              </div>
              <div className="font-sans text-[10px] sm:text-[11px] font-medium text-[#0f172a]/70 truncate max-w-[160px]">
                {project.category}
              </div>
            </div>
            <div className="inline-flex items-center gap-1.5 pl-3.5 pr-1.5 py-1.5 rounded-full bg-[#0f172a] text-white text-[11px] sm:text-xs font-sans font-bold uppercase tracking-wider shadow-md transition-all duration-300 group-hover:bg-[#0052ff] group-hover:text-white group-hover:shadow-[0_6px_20px_rgba(0,82,255,0.45)] group-hover:scale-105">
              <span>View</span>
              <span className="w-4.5 h-4.5 rounded-full bg-[#d8ff00] text-black flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:text-[#0052ff] group-hover:scale-110 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight size={11} strokeWidth={2.5} />
              </span>
            </div>
          </div>
        </div>
      </a>
    );
  }

  // ════════════════════════════════════════════════════════════════
  // VARIANT 3: "Reversed Split" (PHOTO FIRST ON LEFT, TEXT ON RIGHT)
  // ════════════════════════════════════════════════════════════════
  if (variantType === 'split-reversed') {
    return (
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className={`group relative flex flex-col sm:flex-row items-stretch justify-between w-full max-w-[690px] sm:max-w-[730px] h-[390px] sm:h-[435px] mx-auto rounded-[28px] sm:rounded-[42px] p-4 sm:p-8 shadow-2xl transition-all duration-500 hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.6)] border border-black/5 overflow-hidden ${bgClass}`}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* TOP/RIGHT COLUMN: Title, Serif Quote, Tech Stack and Action Link */}
        <div className="flex-1 flex flex-col justify-between mb-3 sm:mb-0 pl-0 sm:pl-8 z-10 min-w-0 order-1 sm:order-2">
          <div>
            <div className="font-poppins font-extrabold text-xl sm:text-3xl md:text-[33px] tracking-tight uppercase text-[#0f172a] mb-1 leading-tight">
              {project.title}
            </div>

            <div className="text-[10px] sm:text-xs font-sans font-bold uppercase tracking-[0.12em] text-[#0f172a]/60 mb-1.5 sm:mb-3">
              {project.category}
            </div>

            <p className="font-sans text-sm sm:text-2xl md:text-[25px] font-normal leading-snug sm:leading-[1.22] tracking-tight text-[#0f172a] mb-2 sm:mb-4 line-clamp-2 sm:line-clamp-3">
              &ldquo;{project.quote}&rdquo;
            </p>

            {/* Tech Badges */}
            {project.tech && (
              <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-2">
                {project.tech.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className={`px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-mono font-bold bg-white/90 backdrop-blur-md text-slate-900 border border-lime-400/80 shadow-xs ${
                      t.toLowerCase().includes('tailwind') ? 'hidden sm:inline-block' : ''
                    }`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="inline-flex items-center gap-1.5 sm:gap-2 pl-3.5 sm:pl-4 pr-1.5 sm:pr-1.5 py-1.5 sm:py-1.5 rounded-full bg-[#0f172a] text-white text-xs sm:text-sm font-sans font-bold uppercase tracking-wider shadow-md transition-all duration-300 group-hover:bg-[#0052ff] group-hover:text-white group-hover:scale-105 w-fit">
            <span>View Project</span>
            <span className="w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full bg-[#d8ff00] text-black flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:text-[#0052ff]">
              <ArrowUpRight size={12} className="sm:w-[13px] sm:h-[13px]" strokeWidth={2.5} />
            </span>
          </div>
        </div>

        {/* BOTTOM/LEFT COLUMN: Photo Showcase */}
        <div className="w-full sm:w-[280px] md:w-[320px] h-[155px] sm:h-auto shrink-0 relative rounded-[18px] sm:rounded-[30px] overflow-hidden flex flex-col justify-end p-2 sm:p-4 shadow-xl border border-black/10 z-10 bg-[#064E3B] order-2 sm:order-1">
          {renderMediaViewport(`absolute inset-0 w-full h-full object-cover object-center`)}

          {project.stats && project.stats.length > 0 && (
            <div className="relative z-20 hidden sm:grid grid-cols-2 gap-2 w-full p-2.5 sm:p-3 rounded-[18px] sm:rounded-[20px] bg-black/65 backdrop-blur-md border border-white/20 shadow-xl">
              {project.stats.map((s, i) => (
                <div key={i} className="flex flex-col">
                  <div className="font-sans text-xl sm:text-2xl md:text-[26px] font-bold text-[#fbfff0] tracking-tight leading-none mb-0.5">
                    {s.value}
                  </div>
                  <div className="font-sans text-[8px] sm:text-[10px] font-semibold uppercase tracking-wider text-[#fbfff0]/80 leading-tight">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </a>
    );
  }

  // ════════════════════════════════════════════════════════════════
  // VARIANT 0: "Steven Bartlett" (TEXT FIRST ON LEFT, PHOTO ON RIGHT)
  // ════════════════════════════════════════════════════════════════
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex flex-col sm:flex-row items-stretch justify-between w-full max-w-[690px] sm:max-w-[730px] h-[390px] sm:h-[435px] mx-auto rounded-[28px] sm:rounded-[42px] p-4 sm:p-8 shadow-2xl transition-all duration-500 hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.6)] border border-black/5 overflow-hidden ${bgClass}`}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* TOP/LEFT COLUMN: Title, Serif Quote, Tech Stack and Action Link */}
      <div className="flex-1 flex flex-col justify-between mb-3 sm:mb-0 pr-0 sm:pr-8 z-10 min-w-0">
        <div>
          <div className="font-poppins font-extrabold text-xl sm:text-3xl md:text-[33px] tracking-tight uppercase text-[#0f172a] mb-1 leading-tight">
            {project.title}
          </div>

          <div className="text-[10px] sm:text-xs font-sans font-bold uppercase tracking-[0.12em] text-[#0f172a]/60 mb-1.5 sm:mb-3">
            {project.category}
          </div>

          <p className="font-sans text-sm sm:text-2xl md:text-[25px] font-normal leading-snug sm:leading-[1.22] tracking-tight text-[#0f172a] mb-2 sm:mb-4 line-clamp-2 sm:line-clamp-3">
            &ldquo;{project.quote}&rdquo;
          </p>

          {/* Tech Badges */}
          {project.tech && (
            <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-2">
              {project.tech.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className={`px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-mono font-bold bg-white/90 backdrop-blur-md text-slate-900 border border-lime-400/80 shadow-xs ${
                    t.toLowerCase().includes('tailwind') ? 'hidden sm:inline-block' : ''
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="inline-flex items-center gap-1.5 sm:gap-2 pl-3.5 sm:pl-4 pr-1.5 sm:pr-1.5 py-1.5 sm:py-1.5 rounded-full bg-[#0f172a] text-white text-xs sm:text-sm font-sans font-bold uppercase tracking-wider shadow-md transition-all duration-300 group-hover:bg-[#0052ff] group-hover:text-white group-hover:scale-105 w-fit">
          <span>View Project</span>
          <span className="w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full bg-[#d8ff00] text-black flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:text-[#0052ff]">
            <ArrowUpRight size={12} className="sm:w-[13px] sm:h-[13px]" strokeWidth={2.5} />
          </span>
        </div>
      </div>

      {/* BOTTOM/RIGHT COLUMN: Large Photo Showcase */}
      <div className="w-full sm:w-[280px] md:w-[320px] h-[155px] sm:h-auto shrink-0 relative rounded-[18px] sm:rounded-[30px] overflow-hidden flex flex-col justify-end p-2 sm:p-4 shadow-xl border border-black/10 z-10 bg-[#064E3B]">
        {renderMediaViewport(`absolute inset-0 w-full h-full object-cover object-center`)}

        {project.stats && project.stats.length > 0 && (
          <div className="relative z-20 hidden sm:grid grid-cols-2 gap-2 w-full p-2.5 sm:p-3 rounded-[18px] sm:rounded-[20px] bg-black/65 backdrop-blur-md border border-white/20 shadow-xl">
            {project.stats.map((s, i) => (
              <div key={i} className="flex flex-col">
                <div className="font-sans text-xl sm:text-2xl md:text-[26px] font-bold text-[#fbfff0] tracking-tight leading-none mb-0.5">
                  {s.value}
                </div>
                <div className="font-sans text-[8px] sm:text-[10px] font-semibold uppercase tracking-wider text-[#fbfff0]/80 leading-tight">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </a>
  );
}
