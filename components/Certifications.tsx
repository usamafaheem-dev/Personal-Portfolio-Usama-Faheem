'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { 
  X,
  ArrowDown,
  ArrowRight
} from 'lucide-react';

interface Certification {
  id: string;
  title: string;
  issuer: string;
  issuerBadge: string;
  date: string;
  credentialId: string;
  image: string;
  description: string;
  skills: string[];
  cardBg?: string;
  tagBg?: string;
  highlights: string[];
}

const certifications: Certification[] = [
  {
    id: 'nextskill-mern',
    title: 'MERN Stack Development Bootcamp',
    issuer: 'Nextskill Arfa Tower Lahore',
    issuerBadge: 'NEXTSKILL — MERN STACK',
    date: 'Issued 2023 • Verified',
    credentialId: 'NS-MERN-8941',
    image: '/certificatoin/image copy.png',
    description: 'Intensive professional MERN Stack engineering bootcamp at Arfa Software Technology Park, Lahore. Full-stack mastery in MongoDB, Express.js, React, Node.js, and RESTful architectures.',
    skills: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'REST APIs', 'Full Stack'],
    highlights: ['Production MERN Application Architecture', 'Scalable Backend REST APIs', 'Complex State Management & UI Design'],
  },
  {
    id: 'google-devfest',
    title: 'Google DevFest Tech Conference',
    issuer: 'Google Developer Groups',
    issuerBadge: 'GOOGLE — DEVFEST',
    date: 'Issued 2023 • Verified',
    credentialId: 'GDG-DEVFEST-2023',
    image: '/certificatoin/ChatGPT Image Sep 7, 2026, 07_31_24 AM.png',
    description: 'Accreditation for Google DevFest developer conference, exploring modern web frameworks, progressive web apps, edge computing, and Google Cloud developer ecosystem.',
    skills: ['Modern Web', 'Google Cloud', 'PWA', 'Performance', 'Developer Ecosystem'],
    highlights: ['Modern Web Architectures', 'Cloud-Native Solutions', 'Interactive Tech Workshops'],
  },
  {
    id: 'digiskills-mern',
    title: 'Full Stack Development with MERN Specialization',
    issuer: 'DigiSkills.pk / Virtual University & Ignite',
    issuerBadge: 'DIGISKILL — MERN STACK',
    date: 'Issued Dec 2025 - Mar 2026 • Verified',
    credentialId: 'DSTP2.0-BATCH-02-MERN',
    image: '/certificatoin/ChatGPT Image Sep 7, 2026, 07_54_30 AM.png',
    description: 'Government-accredited MERN stack specialization by Ministry of IT & Ignite. Full-stack development with React, Node.js, Express, and MongoDB architectures.',
    skills: ['MERN Stack', 'React', 'Node.js', 'MongoDB', 'REST APIs'],
    highlights: ['Full-Stack MERN Architecture', 'Database Schema Modeling', 'RESTful API Integration'],
  },
  {
    id: 'digiskills-freelancing',
    title: 'DigiSkills Freelancing Training Program',
    issuer: 'DigiSkills.pk / Virtual University & Ignite',
    issuerBadge: 'DIGISKILL — FREELANCING',
    date: 'Issued Dec 2025 - Mar 2026 • Verified',
    credentialId: 'DSTP2.0-BATCH-02-FREE',
    image: '/certificatoin/ChatGPT Image Sep 7, 2026, 07_48_55 AM.png',
    description: 'Government-accredited professional program by Ministry of IT, Ignite & Virtual University. Certified mastery in international client delivery, project management, and freelance tech consulting.',
    skills: ['Freelancing', 'Client Relations', 'Proposal Writing', 'Project Scoping', 'Delivery'],
    highlights: ['International Client Management', 'Technical Requirement Scoping', 'Professional Project Execution'],
  },
  {
    id: 'cisco-networking',
    title: 'Cisco Networking Basics',
    issuer: 'Cisco Networking Academy',
    issuerBadge: 'CISCO — NETWORKING',
    date: 'Issued 2023 • Verified',
    credentialId: 'CISCO-NET-882',
    image: '/certificatoin/ChatGPT Image Sep 7, 2026, 07_29_35 AM.png',
    description: 'Fundamental networking concepts and enterprise protocols. Certified expertise in network architecture, routing, switching, IP subnetting, and network security.',
    skills: ['Networking', 'Routing & Switching', 'Subnetting', 'Network Security', 'Protocols'],
    highlights: ['Enterprise Network Topologies', 'IPv4/IPv6 Addressing & Subnetting', 'Network Device Configuration'],
  },
  {
    id: 'cisco-ai',
    title: 'Cisco Introduction to Modern AI & Networks',
    issuer: 'Cisco Networking Academy',
    issuerBadge: 'CISCO — AI & NETWORKS',
    date: 'Issued 2024 • Verified',
    credentialId: 'CISCO-AI-NET-104',
    image: '/certificatoin/image.png',
    description: 'Accreditation by Cisco Networking Academy validating core principles of Artificial Intelligence, neural networks, automation, and modern networked computational systems.',
    skills: ['Artificial Intelligence', 'Network Automation', 'Machine Learning Basics', 'Systems Architecture'],
    highlights: ['AI Foundational Models', 'Automated Network Protocols', 'Intelligent System Infrastructure'],
  },
];

export default function Certifications() {
  const containerRef = useRef<HTMLDivElement>(null);
  const enterBoxRef = useRef<HTMLDivElement>(null);
  const letterCRef = useRef<HTMLSpanElement>(null);
  const trackContentRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [portalOrigin, setPortalOrigin] = useState('50% 80%');
  const [portalShift, setPortalShift] = useState({ x: 0, y: 0 });
  const [targetTranslateX, setTargetTranslateX] = useState(-2200);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 90,
    mass: 0.2,
    restDelta: 0.0001,
  });

  // Calculate exact letter 'C' center for 100% accurate portal zoom & CTA screen center
  useEffect(() => {
    const updateGeometry = () => {
      const isMob = window.innerWidth < 768;
      setIsMobile(isMob);

      // 1. Calculate Portal Zoom origin centered at middle letter 'C'
      // Centers letter 'C' within enterBoxRef viewport
      if (letterCRef.current && enterBoxRef.current) {
        const cRect = letterCRef.current.getBoundingClientRect();
        const boxRect = enterBoxRef.current.getBoundingClientRect();
        if (boxRect.width > 0 && boxRect.height > 0) {
          const cCenterX = cRect.left + cRect.width * 0.50;
          const cCenterY = cRect.top + cRect.height * 0.82;

          const originX = ((cCenterX - boxRect.left) / boxRect.width) * 100;
          const originY = ((cCenterY - boxRect.top) / boxRect.height) * 100;
          setPortalOrigin(`${originX.toFixed(2)}% ${originY.toFixed(2)}%`);

          // Safe relative shift: centers 'C' relative to enterBoxRef center
          // Both use the same coordinate space, so scroll offset cancels out perfectly!
          const boxCenterX = boxRect.left + boxRect.width * 0.50;
          const boxCenterY = boxRect.top + boxRect.height * 0.50;
          const shiftX = isMob ? 0 : (boxCenterX - cCenterX);
          const shiftY = isMob ? 0 : (boxCenterY - cCenterY);
          setPortalShift({ x: shiftX, y: shiftY });
        }
      }

      // 2. Calculate exact translation required to center "GOT A PROJECT?" in viewport
      if (trackContentRef.current && ctaRef.current) {
        const ctaCenterInTrack = ctaRef.current.offsetLeft + ctaRef.current.offsetWidth / 2;
        const neededTranslate = (window.innerWidth / 2) - ctaCenterInTrack;
        setTargetTranslateX(neededTranslate);
      }
    };

    updateGeometry();
    window.addEventListener('resize', updateGeometry);
    const t1 = setTimeout(updateGeometry, 300);
    const t2 = setTimeout(updateGeometry, 800);
    return () => {
      window.removeEventListener('resize', updateGeometry);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // ═════════════════════════════════════════════════════════════════
  // MOTION TIMELINE ANIMATIONS (Seamless, NO gaps or blank screen)
  // ═════════════════════════════════════════════════════════════════

  // Step 1: Top-Right "LET MY CERTIFICATES DO THE TALKING" slides across to the LEFT
  const topHeadingX = useTransform(smoothProgress, [0.00, 0.16], ['0%', '-160%']);
  const topHeadingOpacity = useTransform(smoothProgress, [0.00, 0.10, 0.16], [1, 1, 0]);

  // Step 1.5: Stage 1 Graphic Pastel Circles fade out as Stage 1 text slides away
  const shapesOpacity = useTransform(smoothProgress, [0.00, 0.12, 0.18], [1, 1, 0]);
  const shapesScale = useTransform(smoothProgress, [0.00, 0.12, 0.18], [1, 1, 0.95]);

  // Step 2: Bottom-Left Bold "SCROLL TO SEE" slides across to the RIGHT
  const bottomScrollX = useTransform(smoothProgress, [0.00, 0.16], ['0%', '160%']);
  const bottomScrollOpacity = useTransform(smoothProgress, [0.00, 0.10, 0.16], [1, 1, 0]);

  // Step 3: "ENTER THE CERTIFICATIONS" — Prominently appears and Deep zooms inside 'C' letter portal
  const enterScale = useTransform(smoothProgress, [0.10, 0.18, 0.36], [0.92, 1.0, 65.0]);
  const enterOpacity = useTransform(smoothProgress, [0.06, 0.12, 0.28, 0.36], [0, 1, 1, 0]);
  const enterShiftX = useTransform(smoothProgress, [0.14, 0.36], [0, portalShift.x]);
  const enterShiftY = useTransform(smoothProgress, [0.14, 0.36], [0, portalShift.y]);

  // Step 4: Cards Track SCROLLS UP smoothly as the C portal opens
  const cardScale = useTransform(smoothProgress, [0.30, 0.40], [0.88, 1.0]);
  const trackOpacity = useTransform(smoothProgress, [0.30, 0.36], [0, 1]);
  const trackY = useTransform(smoothProgress, [0.30, 0.40], ['55vh', '0vh']);
  
  // Track X: Dynamically scrolls until "GOT A PROJECT?" is in the EXACT DEAD CENTER of the screen
  const trackX = useTransform(smoothProgress, [0.40, 0.88], [0, targetTranslateX]);

  // Step 5: Parallax exit scale & dimming as next section rolls up like a curtain
  const exitScale = useTransform(smoothProgress, [0.93, 1.0], [1.0, 0.96]);
  const exitOpacity = useTransform(smoothProgress, [0.94, 1.0], [1.0, 0.6]);

  return (
    <section
      ref={containerRef}
      id="certifications"
      className="relative h-[450vh] sm:h-[550vh] lg:h-[620vh] bg-[#eae9e5] text-slate-900 select-none"
    >
      {/* Sticky Viewport Container with Parallax Exit */}
      <motion.div 
        style={{ scale: exitScale, opacity: exitOpacity }}
        className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden bg-[#eae9e5] z-10 origin-center"
      >

        {/* ── AMBIENT PASTEL BACKGROUND GLOW (Provides soft organic colors for entire section & certificates) ── */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-5%] left-[-5%] w-[45vw] h-[45vw] rounded-full bg-[#ffd8ec]/60 blur-[90px]" />
          <div className="absolute bottom-[-5%] left-[5%] w-[42vw] h-[42vw] rounded-full bg-[#e8dbfc]/60 blur-[90px]" />
          <div className="absolute top-[8%] right-[-5%] w-[48vw] h-[48vw] rounded-full bg-[#fef3c7]/60 blur-[90px]" />
          <div className="absolute bottom-[-5%] right-[8%] w-[40vw] h-[40vw] rounded-full bg-[#d1fae5]/60 blur-[90px]" />
          
          {/* Fine Dotted Grid Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-25" />
        </div>

        {/* ── STAGE 1: GRAPHIC ORGANIC PASTEL BLOBS & DOODLES (Animated, Fades out ONLY at 'C' portal zoom) ── */}
        <motion.div 
          style={{ opacity: shapesOpacity, scale: shapesScale }}
          className="absolute inset-0 overflow-hidden pointer-events-none z-1"
        >
          {/* 1. Top-Left Dusty Rose / Pink Organic Blob (Behind Top-Left Heading) */}
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [0, 2, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            style={{ borderRadius: '54% 46% 62% 38% / 44% 56% 44% 56%' }}
            className="absolute top-[12%] sm:top-[2%] left-[-8%] sm:left-[0%] w-[170px] h-[160px] sm:w-[320px] sm:h-[300px] lg:w-[440px] lg:h-[410px] bg-[#f8b4c4]/50 shadow-xs"
          />
          
          {/* 2. Bottom-Left Soft Lilac / Lavender Organic Blob (Behind SCROLL TO SEE) */}
          <motion.div
            animate={{ y: [0, 8, 0], rotate: [0, -2, 0] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            style={{ borderRadius: '46% 54% 38% 62% / 56% 44% 62% 38%' }}
            className="absolute bottom-[10%] sm:bottom-[2%] left-[0%] sm:left-[8%] lg:left-[13%] w-[180px] h-[170px] sm:w-[330px] sm:h-[310px] lg:w-[460px] lg:h-[430px] bg-[#dfd4f8]/50 shadow-xs"
          />

          {/* Tiny Purple Accent Dot (Left of Lilac Blob) */}
          <motion.div 
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-[36%] sm:bottom-[35%] left-[3%] sm:left-[5%] w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-[#7c3aed]/70" 
          />

          {/* Coral Wavy Squiggly Line Doodle (Beside SCROLL TO SEE) */}
          <motion.div
            animate={{ x: [-3, 3, -3], rotate: [-2, 2, -2] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-[16%] sm:bottom-[12%] left-[10%] sm:left-[18%] lg:left-[22%] text-[#f43f5e]/80"
          >
            <svg className="w-8 sm:w-16 h-3 sm:h-5 stroke-current fill-none stroke-[3] stroke-linecap-round" viewBox="0 0 80 20">
              <path d="M 4 10 Q 14 0, 24 10 T 44 10 T 64 10 T 76 10" />
            </svg>
          </motion.div>

          {/* 3. Top-Right Sunny Yellow Organic Blob (Attached to right screen edge) */}
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [0, -2.5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
            style={{ borderRadius: '58% 42% 52% 48% / 42% 58% 48% 52%' }}
            className="absolute top-[12%] sm:top-[3%] right-[-8%] sm:right-[0%] w-[170px] h-[160px] sm:w-[310px] sm:h-[290px] lg:w-[430px] lg:h-[410px] bg-[#fef08a]/55 shadow-xs"
          />

          {/* 4-Pointed Sparkle Star (Inside Yellow Blob) */}
          <motion.div
            animate={{ scale: [1, 1.25, 1], rotate: [0, 15, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[16%] sm:top-[20%] right-[6%] sm:right-[12%] text-[#f59e0b]/75"
          >
            <svg className="w-5 h-5 sm:w-8 sm:h-8 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
            </svg>
          </motion.div>

          {/* 4. Bottom-Right Soft Mint / Seafoam Organic Blob (Shifted left away from yellow) */}
          <motion.div
            animate={{ y: [0, 8, 0], rotate: [0, 2, 0] }}
            transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
            style={{ borderRadius: '48% 52% 44% 56% / 54% 46% 56% 44%' }}
            className="absolute bottom-[10%] sm:bottom-[2%] right-[6%] sm:right-[20%] lg:right-[26%] w-[150px] h-[140px] sm:w-[260px] sm:h-[250px] lg:w-[360px] lg:h-[350px] bg-[#bbf3e0]/50 shadow-xs"
          />
        </motion.div>

        {/* ── STAGE 1: INITIAL UN-SCROLLED TYPOGRAPHY LAYOUT ── */}
        <div className="absolute inset-0 z-20 pointer-events-none p-4 sm:p-10 lg:p-16 flex flex-col justify-between">
          
          {/* Top-Right Main Staggered Heading (Slides to LEFT on scroll, with safe navbar top clearance) */}
          <motion.div
            style={{ x: topHeadingX, opacity: topHeadingOpacity }}
            className="pt-24 sm:pt-24 lg:pt-14 pr-2 sm:pr-6 lg:pr-10 max-w-full ml-auto flex flex-col items-end text-right"
          >
            <div className="flex flex-col items-end">
              <h2 className="text-[26px] min-[380px]:text-[30px] sm:text-6xl md:text-7xl lg:text-[96px] font-black font-sans tracking-tight text-slate-950 uppercase leading-none whitespace-nowrap mr-1 sm:mr-16 lg:mr-28 transform scale-y-[1.2] origin-bottom">
                LET MY CERTIFICATES
              </h2>
              <h2 className="text-[26px] min-[380px]:text-[30px] sm:text-6xl md:text-7xl lg:text-[96px] font-black font-sans tracking-tight text-[#e11d48] uppercase leading-none whitespace-nowrap mt-1.5 sm:mt-3 mr-0 transform scale-y-[1.2] origin-bottom">
                DO THE TALKING
              </h2>
            </div>
          </motion.div>

          {/* Bottom-Left Bold "SCROLL TO SEE ↓" (Elevated above bottom floating button) */}
          <motion.div
            style={{ x: bottomScrollX, opacity: bottomScrollOpacity }}
            className="pb-24 sm:pb-10 lg:pb-12 pl-4 sm:pl-6 lg:pl-10"
          >
            <div className="flex items-center gap-2.5 sm:gap-4 text-slate-950 whitespace-nowrap">
              <h3 className="text-[26px] min-[380px]:text-[30px] sm:text-6xl md:text-7xl lg:text-[100px] font-black font-sans uppercase tracking-tight leading-none transform scale-y-[1.2] origin-bottom">
                SCROLL TO SEE
              </h3>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                className="text-[#e11d48] shrink-0"
              >
                <ArrowDown className="w-7 h-7 min-[380px]:w-8 min-[380px]:h-8 sm:w-14 sm:h-14 lg:w-22 lg:h-22 stroke-[3] transform scale-y-[1.2]" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ── STAGE 2: "ENTER THE CERTIFICATIONS" — ZOOM PORTAL THROUGH LETTER 'C' ── */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none text-center px-4">
          <motion.div
            ref={enterBoxRef}
            style={{ 
              opacity: enterOpacity, 
              scale: enterScale,
              x: enterShiftX,
              y: enterShiftY,
              transformOrigin: portalOrigin
            }}
            className="flex flex-col items-center justify-center will-change-transform"
          >
            <h2 className="text-3xl min-[360px]:text-4xl sm:text-6xl md:text-8xl lg:text-[110px] font-black font-sans text-slate-950 uppercase tracking-tight leading-none mb-1.5 sm:mb-4 transform scale-y-[1.2] whitespace-nowrap">
              ENTER THE
            </h2>
            <h2 className="text-3xl min-[360px]:text-4xl sm:text-6xl md:text-8xl lg:text-[110px] font-black font-sans uppercase tracking-tight leading-none text-[#e11d48] transform scale-y-[1.2] whitespace-nowrap">
              CERTIFI<span ref={letterCRef} className="inline-block relative">C</span>ATIONS
            </h2>
          </motion.div>
        </div>



        {/* ── STAGE 3: HORIZONTAL CARDS TRACK (SCROLLS UP FROM BOTTOM INTO VIEW) ── */}
        <motion.div
          style={{ 
            opacity: trackOpacity, 
            y: trackY,
            scale: cardScale
          }}
          className="relative w-full h-full flex items-center z-30 overflow-hidden pl-4 sm:pl-16 lg:pl-24"
        >
          <motion.div
            ref={trackContentRef}
            style={{ x: trackX }}
            className="flex items-center gap-6 sm:gap-10 lg:gap-12 pr-16 sm:pr-24 transform-gpu"
          >
            {/* 1. Nextskill Arfa Tower MERN Stack (Upper card - White) */}
            <div className="shrink-0 w-[260px] xs:w-[285px] sm:w-[340px] lg:w-[380px] -translate-y-8 sm:-translate-y-16 lg:-translate-y-24 py-2 sm:py-3">
              <motion.div
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                onClick={() => setSelectedCert(certifications[0])}
                className="relative w-full rounded-[24px] sm:rounded-[30px] p-[2px] overflow-hidden group cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
              >
                {/* Default Static Border */}
                <div className="absolute inset-0 rounded-[24px] sm:rounded-[30px] border border-slate-200/90 pointer-events-none group-hover:opacity-0 transition-opacity duration-300" />
                
                {/* Animated Glowing Border Beam on Hover (Confined to border, NO spread) */}
                <div className="absolute inset-0 rounded-[24px] sm:rounded-[30px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden">
                  <div className="absolute inset-[-150%] animate-[spin_2.5s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_240deg,#ffaa00_290deg,#ffea00_340deg,transparent_360deg)]" />
                </div>

                {/* Inner Card Body */}
                <div className="relative w-full h-full rounded-[22px] sm:rounded-[28px] bg-white p-3.5 sm:p-5 z-10">
                  <div className="flex items-center justify-between px-1 mb-2.5 sm:mb-3">
                    <span className="text-[10px] sm:text-xs font-poppins font-bold tracking-wider text-slate-500 uppercase truncate max-w-[85%]">
                      {certifications[0].issuerBadge}
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300 group-hover:bg-[#ffaa00] transition-colors shadow-xs shrink-0" />
                  </div>
                  <div className="relative w-full h-[175px] xs:h-[195px] sm:h-[225px] lg:h-[235px] rounded-xl sm:rounded-2xl bg-[#f8fafc] border border-slate-100/90 overflow-hidden flex items-center justify-center p-2 group-hover:border-slate-200 transition-colors">
                    <img
                      src={certifications[0].image}
                      alt={certifications[0].title}
                      className="w-full h-full object-contain rounded-lg sm:rounded-xl transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* 2. Google DevFest (Lower card - Light Yellow Navbar Theme) */}
            <div className="shrink-0 w-[260px] xs:w-[285px] sm:w-[340px] lg:w-[380px] translate-y-8 sm:translate-y-16 lg:translate-y-24 py-2 sm:py-3">
              <motion.div
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                onClick={() => setSelectedCert(certifications[1])}
                className="relative w-full rounded-[24px] sm:rounded-[30px] p-[2px] overflow-hidden group cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
              >
                {/* Default Static Border */}
                <div className="absolute inset-0 rounded-[24px] sm:rounded-[30px] border border-[#fde047]/70 pointer-events-none group-hover:opacity-0 transition-opacity duration-300" />
                
                {/* Animated Glowing Border Beam on Hover (Confined to border, NO spread) */}
                <div className="absolute inset-0 rounded-[24px] sm:rounded-[30px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden">
                  <div className="absolute inset-[-150%] animate-[spin_2.5s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_240deg,#ffaa00_290deg,#ffea00_340deg,transparent_360deg)]" />
                </div>

                {/* Inner Card Body */}
                <div className="relative w-full h-full rounded-[22px] sm:rounded-[28px] bg-gradient-to-b from-[#fffef5] to-[#fef9c3]/70 p-3.5 sm:p-5 z-10">
                  <div className="flex items-center justify-between px-1 mb-2.5 sm:mb-3">
                    <span className="text-[10px] sm:text-xs font-poppins font-bold tracking-wider text-amber-900/80 uppercase truncate max-w-[85%]">
                      {certifications[1].issuerBadge}
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#ffaa00] to-[#ffea00] shadow-[0_0_8px_rgba(255,170,0,0.6)] shrink-0" />
                  </div>
                  <div className="relative w-full h-[175px] xs:h-[195px] sm:h-[225px] lg:h-[235px] rounded-xl sm:rounded-2xl bg-white/95 border border-[#fef08a]/80 overflow-hidden flex items-center justify-center p-2 group-hover:border-[#fde047] transition-colors">
                    <img
                      src={certifications[1].image}
                      alt={certifications[1].title}
                      className="w-full h-full object-contain rounded-lg sm:rounded-xl transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Quote Section (Usama Faheem Signature - Upper Position) */}
            <div className="shrink-0 w-[260px] xs:w-[285px] sm:w-[350px] lg:w-[410px] px-3 sm:px-6 flex flex-col justify-center -translate-y-8 sm:-translate-y-16 lg:-translate-y-24">
              <p className="text-lg xs:text-xl sm:text-2xl lg:text-[32px] font-semibold font-sans text-slate-900 leading-[1.25] tracking-tight">
                "It doesn't matter <span className="font-bold">what</span> you build, it matters <span className="font-bold">how much fun</span> it is to use."
              </p>
              <p style={{ fontFamily: 'var(--font-caveat), cursive' }} className="text-[#e11d48] text-3xl sm:text-4xl lg:text-5xl mt-2 sm:mt-3 -rotate-2 font-bold tracking-wider">
                Usama Faheem
              </p>
            </div>

            {/* 3. DigiSkills Full Stack MERN (Lower card - White) */}
            <div className="shrink-0 w-[260px] xs:w-[285px] sm:w-[340px] lg:w-[380px] translate-y-8 sm:translate-y-16 lg:translate-y-24 py-2 sm:py-3">
              <motion.div
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                onClick={() => setSelectedCert(certifications[2])}
                className="relative w-full rounded-[24px] sm:rounded-[30px] p-[2px] overflow-hidden group cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
              >
                {/* Default Static Border */}
                <div className="absolute inset-0 rounded-[24px] sm:rounded-[30px] border border-slate-200/90 pointer-events-none group-hover:opacity-0 transition-opacity duration-300" />
                
                {/* Animated Glowing Border Beam on Hover (Confined to border, NO spread) */}
                <div className="absolute inset-0 rounded-[24px] sm:rounded-[30px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden">
                  <div className="absolute inset-[-150%] animate-[spin_2.5s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_240deg,#ffaa00_290deg,#ffea00_340deg,transparent_360deg)]" />
                </div>

                {/* Inner Card Body */}
                <div className="relative w-full h-full rounded-[22px] sm:rounded-[28px] bg-white p-3.5 sm:p-5 z-10">
                  <div className="flex items-center justify-between px-1 mb-2.5 sm:mb-3">
                    <span className="text-[10px] sm:text-xs font-poppins font-bold tracking-wider text-slate-500 uppercase truncate max-w-[85%]">
                      {certifications[2].issuerBadge}
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300 group-hover:bg-[#ffaa00] transition-colors shadow-xs shrink-0" />
                  </div>
                  <div className="relative w-full h-[175px] xs:h-[195px] sm:h-[225px] lg:h-[235px] rounded-xl sm:rounded-2xl bg-[#f8fafc] border border-slate-100/90 overflow-hidden flex items-center justify-center p-2 group-hover:border-slate-200 transition-colors">
                    <img
                      src={certifications[2].image}
                      alt={certifications[2].title}
                      className="w-full h-full object-contain rounded-lg sm:rounded-xl transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* 4. DigiSkills Freelancing (Upper card - Light Yellow Navbar Theme) */}
            <div className="shrink-0 w-[260px] xs:w-[285px] sm:w-[340px] lg:w-[380px] -translate-y-8 sm:-translate-y-16 lg:-translate-y-24 py-2 sm:py-3">
              <motion.div
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                onClick={() => setSelectedCert(certifications[3])}
                className="relative w-full rounded-[24px] sm:rounded-[30px] p-[2px] overflow-hidden group cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
              >
                {/* Default Static Border */}
                <div className="absolute inset-0 rounded-[24px] sm:rounded-[30px] border border-[#fde047]/70 pointer-events-none group-hover:opacity-0 transition-opacity duration-300" />
                
                {/* Animated Glowing Border Beam on Hover (Confined to border, NO spread) */}
                <div className="absolute inset-0 rounded-[24px] sm:rounded-[30px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden">
                  <div className="absolute inset-[-150%] animate-[spin_2.5s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_240deg,#ffaa00_290deg,#ffea00_340deg,transparent_360deg)]" />
                </div>

                {/* Inner Card Body */}
                <div className="relative w-full h-full rounded-[22px] sm:rounded-[28px] bg-gradient-to-b from-[#fffef5] to-[#fef9c3]/70 p-3.5 sm:p-5 z-10">
                  <div className="flex items-center justify-between px-1 mb-2.5 sm:mb-3">
                    <span className="text-[10px] sm:text-xs font-poppins font-bold tracking-wider text-amber-900/80 uppercase truncate max-w-[85%]">
                      {certifications[3].issuerBadge}
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#ffaa00] to-[#ffea00] shadow-[0_0_8px_rgba(255,170,0,0.6)] shrink-0" />
                  </div>
                  <div className="relative w-full h-[175px] xs:h-[195px] sm:h-[225px] lg:h-[235px] rounded-xl sm:rounded-2xl bg-white/95 border border-[#fef08a]/80 overflow-hidden flex items-center justify-center p-2 group-hover:border-[#fde047] transition-colors">
                    <img
                      src={certifications[3].image}
                      alt={certifications[3].title}
                      className="w-full h-full object-contain rounded-lg sm:rounded-xl transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* 5. Cisco Networking Basics (Lower card - White) */}
            <div className="shrink-0 w-[260px] xs:w-[285px] sm:w-[340px] lg:w-[380px] translate-y-8 sm:translate-y-16 lg:translate-y-24 py-2 sm:py-3">
              <motion.div
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                onClick={() => setSelectedCert(certifications[4])}
                className="relative w-full rounded-[24px] sm:rounded-[30px] p-[2px] overflow-hidden group cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
              >
                {/* Default Static Border */}
                <div className="absolute inset-0 rounded-[24px] sm:rounded-[30px] border border-slate-200/90 pointer-events-none group-hover:opacity-0 transition-opacity duration-300" />
                
                {/* Animated Glowing Border Beam on Hover (Confined to border, NO spread) */}
                <div className="absolute inset-0 rounded-[24px] sm:rounded-[30px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden">
                  <div className="absolute inset-[-150%] animate-[spin_2.5s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_240deg,#ffaa00_290deg,#ffea00_340deg,transparent_360deg)]" />
                </div>

                {/* Inner Card Body */}
                <div className="relative w-full h-full rounded-[22px] sm:rounded-[28px] bg-white p-3.5 sm:p-5 z-10">
                  <div className="flex items-center justify-between px-1 mb-2.5 sm:mb-3">
                    <span className="text-[10px] sm:text-xs font-poppins font-bold tracking-wider text-slate-500 uppercase truncate max-w-[85%]">
                      {certifications[4].issuerBadge}
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300 group-hover:bg-[#ffaa00] transition-colors shadow-xs shrink-0" />
                  </div>
                  <div className="relative w-full h-[175px] xs:h-[195px] sm:h-[225px] lg:h-[235px] rounded-xl sm:rounded-2xl bg-[#f8fafc] border border-slate-100/90 overflow-hidden flex items-center justify-center p-2 group-hover:border-slate-200 transition-colors">
                    <img
                      src={certifications[4].image}
                      alt={certifications[4].title}
                      className="w-full h-full object-contain rounded-lg sm:rounded-xl transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* 6. Cisco AI & Networks (Upper card - Light Yellow Navbar Theme) */}
            <div className="shrink-0 w-[260px] xs:w-[285px] sm:w-[340px] lg:w-[380px] -translate-y-8 sm:-translate-y-16 lg:-translate-y-24 py-2 sm:py-3">
              <motion.div
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                onClick={() => setSelectedCert(certifications[5])}
                className="relative w-full rounded-[24px] sm:rounded-[30px] p-[2px] overflow-hidden group cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
              >
                {/* Default Static Border */}
                <div className="absolute inset-0 rounded-[24px] sm:rounded-[30px] border border-[#fde047]/70 pointer-events-none group-hover:opacity-0 transition-opacity duration-300" />
                
                {/* Animated Glowing Border Beam on Hover (Confined to border, NO spread) */}
                <div className="absolute inset-0 rounded-[24px] sm:rounded-[30px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden">
                  <div className="absolute inset-[-150%] animate-[spin_2.5s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_240deg,#ffaa00_290deg,#ffea00_340deg,transparent_360deg)]" />
                </div>

                {/* Inner Card Body */}
                <div className="relative w-full h-full rounded-[22px] sm:rounded-[28px] bg-gradient-to-b from-[#fffef5] to-[#fef9c3]/70 p-3.5 sm:p-5 z-10">
                  <div className="flex items-center justify-between px-1 mb-2.5 sm:mb-3">
                    <span className="text-[10px] sm:text-xs font-poppins font-bold tracking-wider text-amber-900/80 uppercase truncate max-w-[85%]">
                      {certifications[5].issuerBadge}
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#ffaa00] to-[#ffea00] shadow-[0_0_8px_rgba(255,170,0,0.6)] shrink-0" />
                  </div>
                  <div className="relative w-full h-[175px] xs:h-[195px] sm:h-[225px] lg:h-[235px] rounded-xl sm:rounded-2xl bg-white/95 border border-[#fef08a]/80 overflow-hidden flex items-center justify-center p-2 group-hover:border-[#fde047] transition-colors">
                    <img
                      src={certifications[5].image}
                      alt={certifications[5].title}
                      className="w-full h-full object-contain rounded-lg sm:rounded-xl transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* CTA Section - Big bold typography matching section headers, red PROJECT? and arrow */}
            <div 
              ref={ctaRef}
              className="shrink-0 ml-4 sm:ml-8 lg:ml-14 pr-8 sm:pr-16 lg:pr-24 flex flex-col items-start justify-center"
            >
              <h3 className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-[96px] font-black font-sans tracking-tight leading-[0.9] uppercase select-none whitespace-nowrap">
                <span className="text-slate-950 block">GOT A</span>
                <span className="text-[#e11d48] block">PROJECT?</span>
              </h3>
              <div className="text-[#e11d48] mt-3 sm:mt-7">
                <motion.div
                  animate={{ x: [0, 10, 0] }} 
                  transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                >
                  <ArrowRight className="w-10 h-10 xs:w-12 xs:h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 stroke-[3]" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>

      </motion.div>

      {/* ── CLEAN CERTIFICATE PREVIEW MODAL ── */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-3.5 sm:p-6 pointer-events-auto">
            {/* Light Blur Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Card with Animated Border Beam */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="relative w-full max-w-lg sm:max-w-xl rounded-3xl p-[2px] overflow-hidden shadow-2xl z-10"
            >
              {/* Animated Glowing Border Beam on Modal Border */}
              <div className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden">
                <div className="absolute inset-[-150%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_240deg,#ffaa00_290deg,#ffea00_340deg,transparent_360deg)]" />
              </div>

              {/* Inner Modal Content */}
              <div className="relative w-full h-full rounded-[22px] bg-white p-3.5 sm:p-5 text-slate-900">
                {/* Header: Title & Yellow Close Button */}
                <div className="flex items-center justify-between gap-2.5 mb-3 px-1">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#ffaa00] to-[#ffea00] shrink-0 shadow-[0_0_8px_rgba(255,170,0,0.6)]" />
                    <h3 className="text-sm sm:text-base font-bold font-sans text-slate-900 leading-snug line-clamp-2">
                      {selectedCert.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-r from-[#ffaa00] to-[#ffea00] text-black shadow-sm flex items-center justify-center transition-transform hover:scale-105 active:scale-95 hover:brightness-105 cursor-pointer"
                    aria-label="Close modal"
                  >
                    <X className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
                  </button>
                </div>

                {/* Certificate Image */}
                <div className="relative w-full rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center p-1 sm:p-2">
                  <img
                    src={selectedCert.image}
                    alt={selectedCert.title}
                    className="w-full h-auto max-h-[58vh] sm:max-h-[65vh] object-contain rounded-xl"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
