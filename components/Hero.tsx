'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Play, Pause } from 'lucide-react';
import DoodlesOverlay from './DoodlesOverlay';
import VoiceRibbonOverlay from './VoiceRibbonOverlay';
import usePageReady from './usePageReady';

const NAME_LETTERS = [
  { char: 'U', delay: 0.1 },
  { char: 'S', delay: 0.3 },
  { char: 'A', delay: 0.5 },
  { char: 'M', delay: 0.7 },
  { char: 'A', delay: 0.9 },
];

export default function Hero() {
  const isPageReady = usePageReady();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [replayKey, setReplayKey] = useState(0);

  // Play video smoothly ONLY ONCE preloader split doors start opening (isPageReady === true)
  useEffect(() => {
    if (isPageReady && videoRef.current) {
      delete videoRef.current.dataset.endedDispatched;
      delete videoRef.current.dataset.navbarDispatched;
      
      // On mobile screens, start video at 3.0s
      if (window.innerWidth < 768) {
        videoRef.current.currentTime = 3.0;
      }

      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          window.dispatchEvent(new Event('heroVideoStarted'));
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }
  }, [isPageReady]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        const isMobile = window.innerWidth < 768;
        // If the video is at or past 7.8 seconds, restart (from 3.0s on mobile, 0.0s on desktop)
        if (videoRef.current.currentTime >= 7.8) {
          videoRef.current.currentTime = isMobile ? 3.0 : 0.0;
          setReplayKey((prev) => prev + 1);
          delete videoRef.current.dataset.endedDispatched;
          delete videoRef.current.dataset.navbarDispatched;
        }
        videoRef.current.play().then(() => {
          setIsPlaying(true);
          window.dispatchEvent(new Event('heroVideoStarted'));
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section id="hero" className="relative min-h-[calc(100vh-0.5rem)] sm:min-h-[calc(100vh-1.5rem)] w-[calc(100%-0.75rem)] sm:w-[calc(100%-3rem)] mx-auto mt-1.5 sm:mt-6 overflow-hidden bg-[#d0d4dc] rounded-t-[20px] sm:rounded-t-[40px] transform-gpu">
      {/* ── Background Video ── */}
      <div className="absolute inset-0 z-0 transform-gpu">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          onLoadedData={(e) => {
            if (window.innerWidth < 768) {
              e.currentTarget.currentTime = 3.0;
            }
          }}
          onPlay={(e) => {
            setIsPlaying(true);
            window.dispatchEvent(new Event('heroVideoStarted'));
            if (window.innerWidth < 768 && e.currentTarget.currentTime < 2.8) {
              e.currentTarget.currentTime = 3.0;
            }
          }}
          onPause={() => {
            setIsPlaying(false);
            if (!videoRef.current?.dataset.endedDispatched) {
              window.dispatchEvent(new Event('heroVideoEnded'));
            }
          }}
          onTimeUpdate={(e) => {
            const video = e.currentTarget;

            // Trigger Navbar to slide down from top at 6.0s (1.5s before video ends at 8.0s)
            if (video.currentTime >= 6.0 && !video.dataset.navbarDispatched) {
              video.dataset.navbarDispatched = 'true';
              window.dispatchEvent(new Event('heroNavbarTrigger'));
            }

            // Exact 8.0s cutoff
            if (video.currentTime >= 8.0) {
              video.pause();
              if (!video.dataset.endedDispatched) {
                video.dataset.endedDispatched = 'true';
                window.dispatchEvent(new Event('heroVideoEnded'));
              }
            }
          }}
          onEnded={(e) => {
            const video = e.currentTarget;
            if (!video.dataset.endedDispatched) {
              video.dataset.endedDispatched = 'true';
              window.dispatchEvent(new Event('heroVideoEnded'));
            }
          }}
          className="w-full h-full object-cover object-[center_top]"
        >
          <source src="/hero_video_optimized.webm" type="video/webm" />
          <source src="/hero_video_optimized.mp4" type="video/mp4" />
        </video>
      </div>

      {/* ── Play/Pause Button (Left Side - Desktop Only) ── */}
      <div className="hidden sm:flex absolute left-6 bottom-12 z-[25] xl:left-12 xl:bottom-16">
        <button
          onClick={togglePlay}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-white/90 backdrop-blur-md border border-black/5 text-black shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-all duration-300 hover:bg-white hover:scale-110 cursor-pointer"
        >
          {/* Animated Circles */}
          <div className="absolute inset-[-6px] rounded-full border-2 border-[#d8ff00] animate-[ping_3s_ease-in-out_infinite]" />
          <div className="absolute inset-[-14px] rounded-full border-[3px] border-[#5f7a12] border-dashed shadow-[0_0_12px_rgba(216,255,0,0.55)] animate-[spin_8s_linear_infinite]" />

          <div className="absolute inset-0 rounded-full border border-white/60 animate-[ping_2.5s_ease-in-out_infinite]" />
          <div className="absolute inset-0 rounded-full border border-white/40 animate-[ping_3s_ease-in-out_infinite_0.5s]" />
          
          <div className="relative z-10 flex items-center justify-center">
            {isPlaying ? (
              <Pause className="h-5 w-5 fill-black transition-transform group-hover:scale-110" />
            ) : (
              <Play className="h-5 w-5 fill-black transition-transform group-hover:scale-110 ml-1" />
            )}
          </div>
        </button>
      </div>

      {/* ── Very light tint: just enough edge shading to keep overlaid text legible ── */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/6 via-transparent to-black/4 pointer-events-none" />

      {/* ══════════════════════════════════════════════════════════════
          HERO SIDE ELEMENTS:
          - Left: Stacked Upright Letters U - S - A - M - A (Original Outline Stroke #99a1af)
          - Right: High-Contrast Rotating Circular Stamp Badge
         ══════════════════════════════════════════════════════════════ */}
      <div 
        key={`decor-${replayKey}`}
        className="absolute inset-0 z-[20] pointer-events-none overflow-hidden select-none block"
      >
        {/* Left Wall: Stacked Vertical U - S - A - M - A starting after page is ready */}
        <div className="absolute top-14 sm:top-12 xl:top-16 left-2.5 sm:left-3 xl:left-4 flex flex-col items-center gap-0.5 sm:gap-1 xl:gap-1.5 select-none pointer-events-none z-20">
          {NAME_LETTERS.map((item, index) => (
            <motion.span
              key={`letter-${index}`}
              initial={{ opacity: 0, y: -60, scale: 0.6, rotate: -4 }}
              animate={isPageReady ? { opacity: 0.95, y: 0, scale: 1, rotate: 0 } : { opacity: 0, y: -60, scale: 0.6, rotate: -4 }}
              transition={{
                delay: isPageReady ? item.delay : 0,
                duration: 0.75,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              className="text-2xl sm:text-4xl xl:text-[54px] font-extrabold font-poppins uppercase leading-none select-none transition-all duration-300"
              style={{
                WebkitTextStroke: '1.2px rgba(255, 255, 255, 0.9)',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
              }}
            >
              {item.char}
            </motion.span>
          ))}
        </div>

        {/* Top-Right: High-Contrast Bold Rotating Stamp Badge starting after page is ready */}
        <div className="absolute top-32 right-2.5 sm:top-8 sm:right-8 xl:top-10 xl:right-10 pointer-events-auto group cursor-pointer z-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: -20 }}
            animate={isPageReady ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.5, y: -20 }}
            transition={{ delay: isPageReady ? 0.8 : 0, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
              className="w-14 h-14 sm:w-24 sm:h-24 rounded-full border border-dashed border-slate-900 flex items-center justify-center p-0.5 sm:p-1 bg-[#0f172a] text-white shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-transform group-hover:scale-110"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path id="curve-hero-stamp" fill="none" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                <text className="text-[9px] sm:text-[10px] font-mono font-extrabold uppercase tracking-[0.2em] fill-white">
                  <textPath href="#curve-hero-stamp">✦ STUDIO 2026 • CREATIVE DEV ✦</textPath>
                </text>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 sm:w-9 sm:h-9 rounded-full bg-white text-slate-950 flex items-center justify-center shadow-md font-extrabold font-poppins text-[9px] sm:text-xs tracking-wider">
                  UF
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-7xl flex-col items-center justify-center px-4 z-[3]">
        {/* ── Foreground: Doodles ── */}
        <div key={`doodles-${replayKey}`} className="relative z-10 flex w-full max-w-[900px] flex-col items-center h-[50vh] sm:h-[60vh] lg:h-[75vh] min-h-[400px] pointer-events-none">
          <DoodlesOverlay visible={isPageReady} />
        </div>
      </div>

      {/* ── Voice Ribbon Overlay (Full Section Width, Continuous Flow at z-10) ── */}
      <VoiceRibbonOverlay key={`ribbon-${replayKey}`} />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isPageReady ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: isPageReady ? 1.0 : 0 }}
        className="absolute bottom-2 left-1/2 -translate-x-1/2 z-[4]"
      >
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-black/50 transition-colors hover:text-[#5f7a12]"
          aria-label="Scroll to about section"
        >
          <span className="font-poppins text-[11px] font-bold uppercase tracking-wider text-black/80">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <ArrowDown size={16} color="black" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
