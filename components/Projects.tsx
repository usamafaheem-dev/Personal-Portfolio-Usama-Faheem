'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import ProjectCard, { type ProjectData } from './ProjectCard';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

const projects: ProjectData[] = [
  {
    title: 'SoftCr8ors',
    category: 'SOFTCR8ORS — AI & TECH AGENCY',
    quote: 'The official digital experience for an AI & Tech Agency transforming complex startup ideas into scalable production products.',
    subtitle: 'Nodemailer contact pipeline with interactive 3D showcase and team presentation.',
    tech: ['Next.js 15', 'Redux Toolkit', 'Nodemailer', 'GSAP'],
    link: 'https://softcr8ors.com/',
    variant: 'landscape',
    stats: [
      { value: '25+', label: 'Global Clients' },
      { value: '60fps', label: 'Smooth Motion' },
    ],
    image: '/projects_images/softcr8ors_Video.mp4',
    video: '/projects_images/softcr8ors_Video.mp4',
    cardBg: 'bg-gradient-to-tr from-[#FFD8EC] via-[#E8DBFC] to-[#D5F2FD]',
  },
  {
    title: 'Tehreem Arif',
    category: 'TEHREEM ARIF — SQA & AUTOMATION',
    quote: 'Ensuring zero-bug production releases through automated testing frameworks, API performance audits, and high-coverage CI/CD pipelines.',
    subtitle: 'Quality assurance engineer specialized in automated test frameworks and performance audits.',
    tech: ['Selenium', 'Cypress', 'Python Automation', 'CI/CD Pipelines'],
    link: 'https://tahreem-arif.vercel.app/',
    variant: 'quote',
    image: '/projects_images/tahreem_portflio.png',
    cardBg: 'bg-[#EDE7FB]',
  },
  {
    title: 'Reeba Yaseen',
    category: 'REEBA YASEEN — B2B WEB & SAAS',
    quote: 'Helping startups & businesses turn ideas into scalable software, high-converting SaaS platforms, and production-ready AI products.',
    subtitle: 'Full-stack software engineer crafting scalable web apps and intuitive interfaces with Next.js & MERN.',
    tech: ['Next.js 15', 'MERN Stack', 'AI Integrations', 'Hostinger'],
    link: 'https://reeba.softcr8ors.com/',
    variant: 'landscape',
    stats: [
      { value: '150+', label: 'Delivered Globally' },
      { value: '4.5+', label: 'Years Experience' },
    ],
    image: '/projects_images/reeba_portfolio.png',
    cardBg: 'bg-[#CEEFF9]',
  },
  {
    title: 'GM MZ Removals',
    category: 'GM MZ REMOVALS — GREATER MANCHESTER',
    quote: 'Professional, reliable removals across Greater Manchester handling residential, commercial, and industrial relocations with zero hidden costs.',
    subtitle: 'Dynamic removal quote calculator, coverage lookup, and Luton van fleet booking system.',
    tech: ['Next.js', 'Redux', 'Booking Engine', 'Distance API'],
    link: 'https://gmmzremovals.co.uk/',
    variant: 'quote',
    image: '/projects_images/gm_cleaner.png',
    cardBg: 'bg-[#D6E6F8]',
  },
  {
    title: 'Shadab Rice',
    category: 'SHADAB RICE — BASMATI E-COMMERCE',
    quote: 'Premium Basmati rice exporter storefront featuring an instant 1-click WhatsApp order checkout, dynamic product bundle discounts, and real-time inventory.',
    subtitle: 'Product catalog with shopping cart management and instant mobile ordering.',
    tech: ['Next.js 15', 'Tailwind CSS', 'WhatsApp Checkout', 'Bundle Deals'],
    link: 'https://shadabrice.pk/',
    variant: 'split-reversed',
    stats: [
      { value: '1-Click', label: 'WhatsApp Order' },
      { value: '1121', label: 'Steam Basmati' },
    ],
    image: '/projects_images/shahdab_rice_portrait_1.png',
    images: [
      '/projects_images/shahdab_rice_portrait_1.png',
      '/projects_images/shahdab_rice_portrait_2.png',
      '/projects_images/shahdab_rice_portrait_3.png',
    ],
    cardBg: 'bg-[#D9F2E4]',
  },
  {
    title: 'MZ Cleaner',
    category: 'MZ CLEANER — SERVICES',
    quote: 'Manchester premier commercial cleaning platform with 24/7 automated booking workflows and instant consultation dispatch.',
    subtitle: 'Custom service packages, customer testimonials, and direct booking pipeline.',
    tech: ['Next.js', 'Redux', 'Booking Pipeline', 'Framer Motion'],
    link: 'https://mz-cleaner.vercel.app/',
    variant: 'banner',
    stats: [
      { value: '24/7', label: 'Online Booking' },
      { value: '98%', label: 'Satisfied Clients' },
    ],
    image: '/projects_images/mz-.png',
    cardBg: 'bg-[#D6E6F8]',
  },
  {
    title: 'Northwest Tyres',
    category: 'NORTHWEST — ROADSIDE TECH',
    quote: 'Mobile tyre-fitting platform with live geolocation tracking, emergency roadside dispatch, and automated booking queues.',
    subtitle: 'Live coverage area mapping and emergency online booking system.',
    tech: ['Roadside Tech', 'Next.js', 'Google Maps API', 'Tailwind'],
    link: 'https://car-tyre-vertex.vercel.app/',
    variant: 'landscape',
    stats: [
      { value: '<30m', label: 'Dispatch Speed' },
      { value: 'Live', label: 'Coverage Area' },
    ],
    image: '/projects_images/north.png',
    images: [
      '/projects_images/north.png',
      '/projects_images/north_1.png',
      '/projects_images/north_3.png',
    ],
    cardBg: 'bg-[#FED7AA]',
  },
  {
    title: 'Tekrivo Platform',
    category: 'TEKRIVO — EDTECH & CONSULTANCY',
    quote: 'Comprehensive Virtual University project consultancy and developer mentorship platform helping 500+ students launch software.',
    subtitle: 'Final year project consultation, service packages, and student guidance.',
    tech: ['EdTech', 'Next.js', 'Redux', 'Stripe Integration'],
    link: 'https://tekrivo.vercel.app/',
    variant: 'quote',
    image: '/projects_images/tekrivo.png',
    cardBg: 'bg-[#EDE7FB]',
  },
  {
    title: '3D Next',
    category: '3D NEXT — WEBGL SHOWCASE',
    quote: 'Cinematic 3D web experience combining Three.js, custom WebGL fragment shaders, and interactive camera staging.',
    subtitle: 'Immersive interactive graphics and scroll-driven WebGL animations.',
    tech: ['Three.js', 'WebGL Shaders', 'Spline 3D', 'Next.js'],
    link: 'https://3dnext.vercel.app/',
    variant: 'landscape',
    stats: [
      { value: '60 FPS', label: 'WebGL Render' },
      { value: '3D', label: 'Interactive Scene' },
    ],
    image: '/projects_images/3d_proeejct.mp4',
    video: '/projects_images/3d_proeejct.mp4',
    cardBg: 'bg-gradient-to-tr from-[#D5F2FD] via-[#E8DBFC] to-[#FFD8EC]',
  },
];

// Ultra-Smooth Continuous Card Index Mapping with Start & End Dwell Buffers
function getContinuousIndex(p: number, total: number): number {
  const START_PHASE = 0.04;
  const END_BUFFER = 0.93; // 9th card fully centers at 93% scroll; 93%-100% gives comfortable dwell time before exit
  if (p <= START_PHASE) return 0;
  if (p >= END_BUFFER) return total - 1;
  const progress = (p - START_PHASE) / (END_BUFFER - START_PHASE);
  return progress * (total - 1);
}

// ── DIAGONAL CONVEYOR CARD COMPONENT ──
function DiagonalConveyorCard({
  project,
  index,
  total,
  smoothProgress,
  onCardClick,
}: {
  project: ProjectData;
  index: number;
  total: number;
  smoothProgress: MotionValue<number>;
  onCardClick: (index: number) => void;
}) {
  // Horizontal Spacing: 640px diagonal conveyor track
  const x = useTransform(smoothProgress, (p) => {
    const activeIndex = getContinuousIndex(p, total);
    const rel = index - activeIndex;
    return -rel * 640;
  });

  // Vertical Spacing: 270px diagonal elevation with silky smooth continuous header offset
  const y = useTransform(smoothProgress, (p) => {
    const activeIndex = getContinuousIndex(p, total);
    const rel = index - activeIndex;
    const headerOffset = Math.max(0, 1 - p / 0.05) * 55;
    return rel * 270 + headerOffset;
  });

  // Scale: Smoothly scales up to 1.0 at dead center, gracefully scales down to 0.72 off-center
  const scale = useTransform(smoothProgress, (p) => {
    const activeIndex = getContinuousIndex(p, total);
    const dist = Math.abs(index - activeIndex);
    if (dist > 2.5) return 0.72;
    return Math.max(0.72, 1.0 - dist * 0.09);
  });

  // Wispr Flow Exact Z-Tilt:
  // - Upcoming card (bottom-left, rel = +1): Tilted counter-clockwise (-7.5°)
  // - Active card (center, rel = 0): Perfectly level and straight (0°)
  // - Exiting card (top-right, rel = -1): Tilted clockwise (+7.5°)
  const rotate = useTransform(smoothProgress, (p) => {
    const activeIndex = getContinuousIndex(p, total);
    const rel = index - activeIndex;
    return rel * -7.5;
  });

  // 3D Yaw Rotation (Y-axis perspective tilt)
  const rotateY = useTransform(smoothProgress, (p) => {
    const activeIndex = getContinuousIndex(p, total);
    const rel = index - activeIndex;
    return rel * -4.5;
  });

  // 3D Pitch / "Fall-Back" Tilt (X-axis):
  // Smooth asymptotic curve that tops out at 20° without sharp derivative kinks
  const rotateX = useTransform(smoothProgress, (p) => {
    const activeIndex = getContinuousIndex(p, total);
    const dist = Math.abs(index - activeIndex);
    return (dist / (1 + dist * 0.3)) * 16;
  });

  // Opacity: Fully visible in center stage, smoothly fades out at edges
  const opacity = useTransform(smoothProgress, (p) => {
    const activeIndex = getContinuousIndex(p, total);
    const dist = Math.abs(index - activeIndex);
    if (dist > 2.4) return 0;
    if (dist > 1.3) return (2.4 - dist) / 1.1;
    return 1;
  });

  // Z-Index: Active card always commands topmost stack
  const zIndex = useTransform(smoothProgress, (p) => {
    const activeIndex = getContinuousIndex(p, total);
    const dist = Math.abs(index - activeIndex);
    return Math.max(1, Math.round(50 - dist * 10));
  });

  return (
    <motion.div
      style={{
        x,
        y,
        scale,
        rotate,
        rotateY,
        rotateX,
        opacity,
        zIndex,
        transformOrigin: '50% 85%',
        transformStyle: 'preserve-3d',
        willChange: 'transform, opacity',
      }}
      onClick={() => onCardClick(index)}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-[730px] pointer-events-auto transform-gpu cursor-pointer select-none"
    >
      <ProjectCard project={project} index={index} />
    </motion.div>
  );
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIdx, setCurrentIdx] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Exact GSAP Scrub 1.4 Viscous Liquid Inertia Physics
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 45,
    stiffness: 65,
    mass: 0.2,
    restDelta: 0.0001,
  });

  // Header Animation: Slides completely off screen and fades out swiftly on initial scroll
  const headerY = useTransform(smoothProgress, [0, 0.06], [0, -220]);
  const headerOpacity = useTransform(smoothProgress, [0, 0.04], [1, 0]);
  const headerDisplay = useTransform(smoothProgress, (p) => (p > 0.06 ? 'none' : 'block'));

  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (latest) => {
      const activeIdx = Math.round(getContinuousIndex(latest, projects.length));
      setCurrentIdx(Math.max(0, Math.min(projects.length - 1, activeIdx)));
    });
    return () => unsubscribe();
  }, [smoothProgress]);

  const scrollToCard = (index: number) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const containerTop = rect.top + scrollTop;
    const scrollableHeight = container.offsetHeight - window.innerHeight;

    const START_PHASE = 0.04;
    const END_BUFFER = 0.93;
    const progressForIndex = index === 0 ? 0 : START_PHASE + (index / (projects.length - 1)) * (END_BUFFER - START_PHASE);
    const targetScroll = containerTop + progressForIndex * scrollableHeight;

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      scrollToCard(currentIdx - 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < projects.length - 1) {
      scrollToCard(currentIdx + 1);
    }
  };

  return (
    <section
      ref={containerRef}
      id="projects"
      className="relative h-[750vh] bg-[#1A1A1A] text-white border-t border-white/10 overflow-visible"
    >
      {/* Sticky Viewport Frame with Video Background */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden bg-black">

        {/* ── 0. SLEEK WAVE PARTICLE VIDEO BACKGROUND ── */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover object-center opacity-75 scale-105"
          >
            <source src="/vesper-bg.mp4" type="video/mp4" />
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260818_072341_50851634-bbc3-4c33-9acc-7647d4db44aa.mp4" type="video/mp4" />
          </video>
          {/* Subtle dark gradient overlay & ambient glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/90 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.12)_1.2px,transparent_1.2px)] [background-size:28px_28px] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-950/20 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* ── TOP-LEFT: Hand-Drawn Curvy Arrow Doodle (Crisp White on #1A1A1A) ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
          animate={{ opacity: 0.85, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="absolute top-16 sm:top-20 left-6 sm:left-14 pointer-events-none hidden md:block z-20"
        >
          <svg
            width="130"
            height="130"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transform -rotate-12 hover:rotate-0 transition-transform duration-300 drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]"
          >
            <path
              d="M10 20 C 50 -10, 100 40, 80 80 C 70 100, 30 110, 50 120 C 60 125, 90 120, 110 100"
              stroke="#ffffff"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M95 95 L 110 100 L 100 115"
              stroke="#ffffff"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        {/* ── BOTTOM-RIGHT: Continuous Infinite Rotating Star Spinner Doodle (Vibrant Blue #60a5fa) ── */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-20 sm:bottom-28 right-8 sm:right-24 pointer-events-none hidden md:block z-20 text-[#60a5fa] drop-shadow-[0_0_16px_rgba(96,165,250,0.5)]"
        >
          <svg
            width="85"
            height="85"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="2" x2="12" y2="22"></line>
            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <line x1="4.93" y1="19.07" x2="19.07" y2="4.93"></line>
          </svg>
        </motion.div>

        {/* ── 1. SECTION HEADER (Cleanly slides -220px up and completely disappears) ── */}
        <motion.div
          style={{ y: headerY, opacity: headerOpacity, display: headerDisplay }}
          className="absolute top-14 sm:top-18 left-0 right-0 z-30 max-w-4xl mx-auto px-6 text-center pointer-events-none"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-yellow-500/15 border border-yellow-500/30 text-[11px] font-black uppercase tracking-widest text-yellow-400 mb-2 backdrop-blur-md shadow-sm">
            <Sparkles size={12} className="text-yellow-400" />
            <span>Featured Portfolio & Projects</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-poppins font-black text-white tracking-tight leading-tight mb-1">
            From concept to <span className="font-poppins italic font-black text-yellow-400">production.</span>
          </h2>

          <p className="text-gray-400 text-xs sm:text-sm max-w-lg mx-auto font-normal font-sans">
            A curated collection of production platforms, AI applications, and digital products.
          </p>
        </motion.div>

        {/* ── 2. 3D DIAGONAL CONVEYOR STAGE ── */}
        <div className="relative w-full h-full flex items-center justify-center perspective-[1400px] overflow-visible bg-transparent z-10">
          {projects.map((project, i) => (
            <DiagonalConveyorCard
              key={project.title}
              project={project}
              index={i}
              total={projects.length}
              smoothProgress={smoothProgress}
              onCardClick={scrollToCard}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
