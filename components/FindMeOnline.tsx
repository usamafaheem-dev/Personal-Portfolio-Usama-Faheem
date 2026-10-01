'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { SiFacebook, SiThreads } from 'react-icons/si';

interface SocialPlatform {
  id: string;
  name: string;
  subtitle: string;
  ctaText: string;
  url: string;
  cardBg: string;
  cardBorder: string;
  cardShadow: string;
  ctaColor: string;
  titleHover: string;
  iconBg: string;
  iconShadow: string;
  iconBorder: string;
  tilt: string; // Staggered tilt for "1 ulta 1 seedha"
  yOffset: string; // Staggered elevation
  renderIcon: () => React.ReactNode;
}

// 6 Core Channels with Distinct Icon-Matched Background Themes
const socialPlatforms: SocialPlatform[] = [
  {
    id: 'github',
    name: 'GITHUB',
    subtitle: 'Production code repositories, MERN architectures & full-stack open source packages.',
    ctaText: 'EXPLORE REPOS →',
    url: 'https://github.com/usamafaheem-dev',
    cardBg: 'bg-gradient-to-b from-[#fbfbf7] via-[#f3f3ed] to-[#e8e8e0]',
    cardBorder: 'border-0',
    cardShadow: 'shadow-[0_4px_22px_rgba(13,13,13,0.06)] hover:shadow-[0_16px_36px_rgba(13,13,13,0.12)]',
    ctaColor: 'text-[#0052ff] group-hover:text-blue-700',
    titleHover: 'group-hover:text-[#0052ff]',
    iconBg: 'bg-gradient-to-br from-[#24292f] via-[#161b22] to-[#0d1117]',
    iconShadow: 'shadow-[0_10px_24px_rgba(13,17,23,0.35)]',
    iconBorder: 'border-t border-l border-white/35 border-b border-r border-black/40',
    tilt: '-rotate-[1.5deg] sm:-rotate-[2.5deg]',
    yOffset: '-translate-y-1.5 sm:-translate-y-3.5',
    renderIcon: () => (
      <svg aria-hidden="true" className="w-7 h-7 xs:w-8 xs:h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 text-white fill-current" viewBox="0 0 24 24">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    id: 'linkedin',
    name: 'LINKEDIN',
    subtitle: 'Professional updates, engineering case studies & tech leadership insights.',
    ctaText: "LET'S CONNECT →",
    url: 'https://www.linkedin.com/in/usama-faheem/',
    cardBg: 'bg-gradient-to-b from-[#fbfbf7] via-[#f3f3ed] to-[#e8e8e0]',
    cardBorder: 'border-0',
    cardShadow: 'shadow-[0_4px_22px_rgba(13,13,13,0.06)] hover:shadow-[0_16px_36px_rgba(13,13,13,0.12)]',
    ctaColor: 'text-[#0052ff] group-hover:text-blue-700',
    titleHover: 'group-hover:text-[#0052ff]',
    iconBg: 'bg-gradient-to-br from-[#0a84ff] via-[#0077b5] to-[#004182]',
    iconShadow: 'shadow-[0_10px_24px_rgba(0,119,181,0.38)]',
    iconBorder: 'border-t border-l border-white/45 border-b border-r border-blue-950/30',
    tilt: 'rotate-[1.5deg] sm:rotate-[2.5deg]',
    yOffset: 'translate-y-1.5 sm:translate-y-3.5',
    renderIcon: () => (
      <svg aria-hidden="true" className="w-7 h-7 xs:w-8 xs:h-8 sm:w-9.5 sm:h-9.5 lg:w-10 lg:h-10 text-white fill-current" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    id: 'x',
    name: 'X (TWITTER)',
    subtitle: 'Daily web dev insights, interactive UI micro-animations & founder workflow.',
    ctaText: 'FOLLOW ME →',
    url: 'https://x.com/usamafaheemdev',
    cardBg: 'bg-gradient-to-b from-[#fbfbf7] via-[#f3f3ed] to-[#e8e8e0]',
    cardBorder: 'border-0',
    cardShadow: 'shadow-[0_4px_22px_rgba(13,13,13,0.06)] hover:shadow-[0_16px_36px_rgba(13,13,13,0.12)]',
    ctaColor: 'text-[#0052ff] group-hover:text-blue-700',
    titleHover: 'group-hover:text-[#0052ff]',
    iconBg: 'bg-gradient-to-br from-[#27272a] via-[#18181b] to-[#09090b]',
    iconShadow: 'shadow-[0_10px_24px_rgba(0,0,0,0.35)]',
    iconBorder: 'border-t border-l border-white/35 border-b border-r border-black/40',
    tilt: '-rotate-[1.5deg] sm:-rotate-[2.5deg]',
    yOffset: '-translate-y-1.5 sm:-translate-y-3.5',
    renderIcon: () => (
      <svg aria-hidden="true" className="w-7 h-7 xs:w-8 xs:h-8 sm:w-9.5 sm:h-9.5 lg:w-10 lg:h-10 text-white fill-current" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    id: 'instagram',
    name: 'INSTAGRAM',
    subtitle: 'Design experiments, visual UI showcases & behind-the-scenes engineering builds.',
    ctaText: 'FOLLOW ALONG →',
    url: 'https://www.instagram.com/usamafaheemdev/',
    cardBg: 'bg-gradient-to-b from-[#fbfbf7] via-[#f3f3ed] to-[#e8e8e0]',
    cardBorder: 'border-0',
    cardShadow: 'shadow-[0_4px_22px_rgba(13,13,13,0.06)] hover:shadow-[0_16px_36px_rgba(13,13,13,0.12)]',
    ctaColor: 'text-[#0052ff] group-hover:text-blue-700',
    titleHover: 'group-hover:text-[#0052ff]',
    iconBg: 'bg-gradient-to-tr from-[#f58529] via-[#dd2a7b] to-[#8134af]',
    iconShadow: 'shadow-[0_10px_24px_rgba(221,42,123,0.38)]',
    iconBorder: 'border-t border-l border-white/45 border-b border-r border-purple-950/30',
    tilt: 'rotate-[1.5deg] sm:rotate-[2.5deg]',
    yOffset: 'translate-y-1.5 sm:translate-y-3.5',
    renderIcon: () => (
      <svg aria-hidden="true" className="w-7 h-7 xs:w-8 xs:h-8 sm:w-9.5 sm:h-9.5 lg:w-10 lg:h-10 text-white fill-current" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    id: 'facebook',
    name: 'FACEBOOK',
    subtitle: 'Tech community updates, project launches & web development discussions.',
    ctaText: 'CONNECT ON FB →',
    url: 'https://web.facebook.com/usamafaheemDev',
    cardBg: 'bg-gradient-to-b from-[#fbfbf7] via-[#f3f3ed] to-[#e8e8e0]',
    cardBorder: 'border-0',
    cardShadow: 'shadow-[0_4px_22px_rgba(13,13,13,0.06)] hover:shadow-[0_16px_36px_rgba(13,13,13,0.12)]',
    ctaColor: 'text-[#0052ff] group-hover:text-blue-700',
    titleHover: 'group-hover:text-[#0052ff]',
    iconBg: 'bg-gradient-to-br from-[#1877f2] via-[#0d65d9] to-[#0a4fa8]',
    iconShadow: 'shadow-[0_10px_24px_rgba(24,119,242,0.38)]',
    iconBorder: 'border-t border-l border-white/45 border-b border-r border-blue-950/30',
    tilt: '-rotate-[1.5deg] sm:-rotate-[2.5deg]',
    yOffset: '-translate-y-1.5 sm:-translate-y-3.5',
    renderIcon: () => (
      <SiFacebook aria-hidden="true" className="w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 lg:w-9.5 lg:h-9.5 text-white" />
    ),
  },
  {
    id: 'threads',
    name: 'THREADS',
    subtitle: 'Quick dev thoughts, live engineering notes & interactive tech conversations.',
    ctaText: 'FOLLOW ON THREADS →',
    url: 'https://www.threads.com/@usamafaheemdev',
    cardBg: 'bg-gradient-to-b from-[#fbfbf7] via-[#f3f3ed] to-[#e8e8e0]',
    cardBorder: 'border-0',
    cardShadow: 'shadow-[0_4px_22px_rgba(13,13,13,0.06)] hover:shadow-[0_16px_36px_rgba(13,13,13,0.12)]',
    ctaColor: 'text-[#0052ff] group-hover:text-blue-700',
    titleHover: 'group-hover:text-[#0052ff]',
    iconBg: 'bg-gradient-to-br from-[#27272a] via-[#18181b] to-[#09090b]',
    iconShadow: 'shadow-[0_10px_24px_rgba(0,0,0,0.38)]',
    iconBorder: 'border-t border-l border-white/35 border-b border-r border-black/40',
    tilt: 'rotate-[1.5deg] sm:rotate-[2.5deg]',
    yOffset: 'translate-y-1.5 sm:translate-y-3.5',
    renderIcon: () => (
      <SiThreads aria-hidden="true" className="w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 lg:w-9.5 lg:h-9.5 text-white" />
    ),
  },
];

const LargeSocialCard = React.memo(function LargeSocialCard({
  platform,
  index,
  total,
  smoothProgress,
}: {
  platform: SocialPlatform;
  index: number;
  total: number;
  smoothProgress: any;
}) {
  // Target scroll progress where this specific card reaches viewport center
  const targetP = (index / (total - 1)) * 0.78;

  // Dynamic Y offset: As card enters from right, it starts lowered (+115px) and rises smoothly up to 0px
  const cardY = useTransform(smoothProgress, (p: number) => {
    const diff = targetP - p;
    if (diff <= 0) return 0;
    // Window of entrance animation as card travels from right to center
    const entryProgress = Math.max(0, Math.min(1, 1 - diff / 0.22));
    // Ease-out curve: begins moving immediately and decelerates into resting position
    const lift = 1 - Math.pow(1 - entryProgress, 2.2);
    return (1 - lift) * 115;
  });

  // Dynamic scale: subtle natural swell as it ascends into position (0.92 -> 1.0)
  const cardScale = useTransform(smoothProgress, (p: number) => {
    const diff = targetP - p;
    if (diff <= 0) return 1;
    const entryProgress = Math.max(0, Math.min(1, 1 - diff / 0.22));
    const lift = 1 - Math.pow(1 - entryProgress, 2.2);
    return 0.92 + lift * 0.08;
  });

  // Dynamic tilt: creates a buoyant ascending tilt while lifting from below
  const dynamicRotate = useTransform(smoothProgress, (p: number) => {
    const diff = targetP - p;
    if (diff <= 0) return 0;
    const entryProgress = Math.max(0, Math.min(1, 1 - diff / 0.22));
    const lift = 1 - Math.pow(1 - entryProgress, 2.2);
    const tiltDirection = index % 2 === 0 ? 3.5 : -3.5;
    return (1 - lift) * tiltDirection;
  });

  // Dynamic opacity: softens card entrance from right viewport border
  const cardOpacity = useTransform(smoothProgress, (p: number) => {
    const diff = targetP - p;
    if (diff <= 0) return 1;
    const entryProgress = Math.max(0, Math.min(1, 1 - diff / 0.22));
    return Math.min(1, 0.4 + entryProgress * 1.5);
  });

  return (
    <motion.div
      style={{
        y: cardY,
        scale: cardScale,
        rotate: dynamicRotate,
        opacity: cardOpacity,
      }}
      className="shrink-0 transform-gpu will-change-transform"
    >
      <a
        href={platform.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`group relative block py-4 ${platform.yOffset} cursor-pointer focus:outline-none`}
      >
        <div
          className={`relative w-[460px] lg:w-[520px] min-h-[175px] lg:min-h-[195px] rounded-[28px] sm:rounded-[32px] ${platform.cardBg} px-7 lg:px-9 py-6 lg:py-7 border ${platform.cardBorder} ${platform.cardShadow} transition-all duration-300 flex items-center gap-6 sm:gap-7 transform ${platform.tilt} group-hover:rotate-0 group-hover:-translate-y-2 group-hover:scale-[1.02] [contain:paint]`}
        >
          {/* 3D Skeuomorphic App Icon Squircle */}
          <div
            className={`relative shrink-0 w-22 h-22 lg:w-24 lg:h-24 rounded-[22px] sm:rounded-[24px] ${platform.iconBg} ${platform.iconShadow} ${platform.iconBorder} flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-0.5`}
          >
            {/* Soft Glass Highlights */}
            <div className="absolute inset-0 rounded-[22px] sm:rounded-[24px] bg-gradient-to-t from-transparent via-transparent to-white/25 pointer-events-none" />
            <div className="relative z-10">{platform.renderIcon()}</div>
          </div>

          {/* Right Column Content */}
          <div className="flex-1 min-w-0 flex flex-col justify-center text-left font-sans">
            <h3 className={`text-xl lg:text-2xl font-extrabold font-sans text-slate-950 uppercase tracking-wide ${platform.titleHover} transition-colors truncate mb-1.5`}>
              {platform.name}
            </h3>
            <p className="text-xs sm:text-[13.5px] lg:text-[14.5px] text-slate-600 font-sans font-normal leading-relaxed line-clamp-2 mb-3 sm:mb-3.5">
              {platform.subtitle}
            </p>
            <span className={`inline-flex items-center gap-1.5 text-xs sm:text-[13px] lg:text-[13.5px] font-bold font-sans ${platform.ctaColor} transition-colors uppercase tracking-wider`}>
              <span>{platform.ctaText}</span>
            </span>
          </div>
        </div>
      </a>
    </motion.div>
  );
});

// Compact Mobile Tray Card for 3-card + 2-card mobile layout
const CompactMobileCard = React.memo(function CompactMobileCard({ platform }: { platform: SocialPlatform }) {
  return (
    <a
      href={platform.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative shrink-0 w-[270px] min-[400px]:w-[310px] min-h-[82px] xs:min-h-[90px] rounded-[18px] xs:rounded-[20px] ${platform.cardBg} p-3 xs:p-3.5 border ${platform.cardBorder} ${platform.cardShadow} transition-all duration-300 flex items-center gap-3 xs:gap-3.5 cursor-pointer transform ${platform.tilt} active:scale-95 [contain:paint] pointer-events-auto touch-manipulation`}
    >
      {/* 3D Skeuomorphic App Icon Squircle */}
      <div
        className={`relative shrink-0 w-11 h-11 xs:w-13 xs:h-13 rounded-[13px] xs:rounded-[15px] ${platform.iconBg} ${platform.iconShadow} ${platform.iconBorder} flex items-center justify-center transition-transform duration-300 group-hover:scale-105`}
      >
        <div className="absolute inset-0 rounded-[13px] xs:rounded-[15px] bg-gradient-to-t from-transparent via-transparent to-white/25 pointer-events-none" />
        <div className="relative z-10 scale-90 xs:scale-100">{platform.renderIcon()}</div>
      </div>

      {/* Right Column Content */}
      <div className="flex-1 min-w-0 flex flex-col justify-center text-left font-sans">
        <h3 className={`text-xs xs:text-sm font-extrabold font-sans text-slate-950 uppercase tracking-wide ${platform.titleHover} transition-colors truncate mb-0.5`}>
          {platform.name}
        </h3>
        <p className="text-[11px] text-slate-600 font-sans font-normal leading-snug line-clamp-2 mb-1">
          {platform.subtitle}
        </p>
        <span className={`inline-flex items-center gap-1 text-[10px] xs:text-[10.5px] font-bold font-sans ${platform.ctaColor} transition-colors uppercase tracking-wider`}>
          <span>{platform.ctaText}</span>
        </span>
      </div>
    </a>
  );
});

export default function FindMeOnline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const desktopTrackRef = useRef<HTMLDivElement>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);
  const [xRange, setXRange] = useState<[number, number]>([0, -1600]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 35,
    stiffness: 120,
    mass: 0.15,
    restDelta: 0.001,
  });

  // Calculate dynamic startX and endX
  // Desktop: Card 0 centered -> Card 4 centered
  // Mobile: Column 1 (3 cards) centered -> Column 2 (2 cards) centered
  useEffect(() => {
    const updateScrollMetrics = () => {
      const isMobile = window.innerWidth < 768;
      const activeTrack = isMobile ? mobileTrackRef.current : desktopTrackRef.current;

      if (activeTrack && activeTrack.children.length >= 2) {
        const children = Array.from(activeTrack.children) as HTMLElement[];
        const firstEl = children[0];
        const lastEl = children[children.length - 1];

        const viewportCenter = window.innerWidth / 2;
        const firstCenter = firstEl.offsetLeft + firstEl.offsetWidth / 2;
        const lastCenter = lastEl.offsetLeft + lastEl.offsetWidth / 2;

        const startX = viewportCenter - firstCenter;
        const endX = viewportCenter - lastCenter;

        setXRange((prev) => (prev[0] === startX && prev[1] === endX ? prev : [startX, endX]));
      }
    };

    updateScrollMetrics();
    window.addEventListener('resize', updateScrollMetrics);
    const t1 = setTimeout(updateScrollMetrics, 100);
    const t2 = setTimeout(updateScrollMetrics, 300);
    const t3 = setTimeout(updateScrollMetrics, 800);
    return () => {
      window.removeEventListener('resize', updateScrollMetrics);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // Smooth scroll translation locked at 0.78 so last card/tray centers and then flows naturally to next section
  const trackX = useTransform(smoothProgress, [0.0, 0.78], xRange, { clamp: true });

  const mobileGroup1 = socialPlatforms.slice(0, 2); // 2 Cards (GitHub, LinkedIn)
  const mobileGroup2 = socialPlatforms.slice(2, 4); // 2 Cards (X, Instagram)
  const mobileGroup3 = socialPlatforms.slice(4, 6); // 2 Cards (Facebook, Threads)

  // Dynamic Y offset for Mobile Tray 2 (X, Instagram) entering around 0.39
  const tray2Y = useTransform(smoothProgress, (p: number) => {
    const diff = 0.39 - p;
    if (diff <= 0) return 0;
    const entryProgress = Math.max(0, Math.min(1, 1 - diff / 0.25));
    const lift = 1 - Math.pow(1 - entryProgress, 2.2);
    return (1 - lift) * 60;
  });

  const tray2Scale = useTransform(smoothProgress, (p: number) => {
    const diff = 0.39 - p;
    if (diff <= 0) return 1;
    const entryProgress = Math.max(0, Math.min(1, 1 - diff / 0.25));
    const lift = 1 - Math.pow(1 - entryProgress, 2.2);
    return 0.94 + lift * 0.06;
  });

  const tray2Opacity = useTransform(smoothProgress, (p: number) => {
    const diff = 0.39 - p;
    if (diff <= 0) return 1;
    const entryProgress = Math.max(0, Math.min(1, 1 - diff / 0.25));
    return Math.min(1, 0.45 + entryProgress * 1.4);
  });

  // Dynamic Y offset for Mobile Tray 3 (Facebook, Threads) entering around 0.78
  const tray3Y = useTransform(smoothProgress, (p: number) => {
    const diff = 0.78 - p;
    if (diff <= 0) return 0;
    const entryProgress = Math.max(0, Math.min(1, 1 - diff / 0.25));
    const lift = 1 - Math.pow(1 - entryProgress, 2.2);
    return (1 - lift) * 60;
  });

  const tray3Scale = useTransform(smoothProgress, (p: number) => {
    const diff = 0.78 - p;
    if (diff <= 0) return 1;
    const entryProgress = Math.max(0, Math.min(1, 1 - diff / 0.25));
    const lift = 1 - Math.pow(1 - entryProgress, 2.2);
    return 0.94 + lift * 0.06;
  });

  const tray3Opacity = useTransform(smoothProgress, (p: number) => {
    const diff = 0.78 - p;
    if (diff <= 0) return 1;
    const entryProgress = Math.max(0, Math.min(1, 1 - diff / 0.25));
    return Math.min(1, 0.45 + entryProgress * 1.4);
  });

  return (
    <section
      ref={containerRef}
      id="find-me-online"
      className="relative h-[250vh] xs:h-[280vh] sm:h-[310vh] lg:h-[350vh] bg-[#ededf0] text-slate-900 border-t border-b border-slate-200/80"
    >
      {/* Sticky Full-Viewport Showcase Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between pt-24 xs:pt-28 sm:pt-24 lg:pt-28 pb-8 sm:pb-14 lg:pb-16 overflow-hidden bg-[#ededf0] z-10">
        
        {/* ── Crisp Ambient Background Dot Pattern (Matched with Proven / Stats) ── */}
        <div className="absolute inset-0 bg-[radial-gradient(#99a1af_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-40 pointer-events-none [mask-image:radial-gradient(ellipse_75%_75%_at_50%_50%,#000_60%,transparent_100%)]" />

        {/* ── SECTION HEADER ── */}
        <div className="mx-auto max-w-[1420px] w-full px-4 xs:px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="text-left font-sans">
            <div className="inline-flex items-center gap-2 bg-[#d8ff00] border-2 border-black px-3.5 py-1 rounded-full shadow-sm mb-2">
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span style={{ fontFamily: 'var(--font-caveat), cursive' }} className="text-base font-bold text-black font-caveat">Stay In Touch</span>
            </div>
            <h2 className="text-2xl xs:text-3xl sm:text-5xl lg:text-[56px] font-extrabold font-sans tracking-tight text-slate-950 uppercase leading-none">
              FIND ME ONLINE
            </h2>
            <p className="text-[11px] sm:text-sm lg:text-base font-sans text-slate-600 font-medium mt-1 sm:mt-2 max-w-2xl leading-relaxed line-clamp-2 sm:line-clamp-none">
              Where I share open-source code, design systems, tech tutorials & behind-the-scenes engineering experiments.
            </p>
          </div>
        </div>

        {/* ── DESKTOP SCROLL-DRIVEN HORIZONTAL TRACK (MD & UP: 6 LARGE CARDS) ── */}
        <div className="hidden md:block relative w-full my-auto overflow-y-visible py-14 lg:py-20">
          <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-20 bg-gradient-to-r from-[#ededf0] to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-8 sm:w-20 bg-gradient-to-l from-[#ededf0] to-transparent z-20 pointer-events-none" />

          <motion.div
            ref={desktopTrackRef}
            style={{ x: trackX }}
            className="flex items-center gap-6 sm:gap-10 w-max transform-gpu will-change-transform"
          >
            {socialPlatforms.map((platform, idx) => (
              <LargeSocialCard
                key={platform.id}
                platform={platform}
                index={idx}
                total={socialPlatforms.length}
                smoothProgress={smoothProgress}
              />
            ))}
          </motion.div>
        </div>

        {/* ── MOBILE SCROLL-DRIVEN TRAY TRACK (< MD: 3 TRAYS: 2 + 2 + 2 CARDS) ── */}
        <div className="block md:hidden relative w-full my-auto overflow-y-visible py-8 xs:py-12">
          <div className="absolute top-0 bottom-0 left-0 w-4 bg-gradient-to-r from-[#ededf0] to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-4 bg-gradient-to-l from-[#ededf0] to-transparent z-20 pointer-events-none" />

          <motion.div
            ref={mobileTrackRef}
            style={{ x: trackX }}
            className="flex items-center gap-6 xs:gap-8 w-max transform-gpu will-change-transform"
          >
            {/* Tray 1: 2 Stacked Cards (GitHub, LinkedIn) */}
            <div className="flex flex-col gap-2 xs:gap-2.5 shrink-0">
              {mobileGroup1.map((platform) => (
                <CompactMobileCard key={platform.id} platform={platform} />
              ))}
            </div>

            {/* Tray 2: 2 Stacked Cards (X, Instagram) */}
            <motion.div
              style={{
                y: tray2Y,
                scale: tray2Scale,
                opacity: tray2Opacity,
              }}
              className="flex flex-col gap-2 xs:gap-2.5 shrink-0 justify-center transform-gpu will-change-transform"
            >
              {mobileGroup2.map((platform) => (
                <CompactMobileCard key={platform.id} platform={platform} />
              ))}
            </motion.div>

            {/* Tray 3: 2 Stacked Cards (Facebook, Threads) */}
            <motion.div
              style={{
                y: tray3Y,
                scale: tray3Scale,
                opacity: tray3Opacity,
              }}
              className="flex flex-col gap-2 xs:gap-2.5 shrink-0 justify-center transform-gpu will-change-transform"
            >
              {mobileGroup3.map((platform) => (
                <CompactMobileCard key={platform.id} platform={platform} />
              ))}
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
