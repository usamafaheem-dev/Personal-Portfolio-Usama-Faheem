'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import usePageReady from './usePageReady';

const stats = [
  { label: 'Happy Clients', value: '10+' },
  { label: 'Projects Delivered', value: '25+' },
  { label: 'Years Experience', value: '1+' },
];

function AnimatedCounter({ value, startDelay = 2.2 }: { value: string; startDelay?: number }) {
  const isPageReady = usePageReady();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const isInView = isPageReady && inView;

  const numMatch = value.match(/\d+/);
  const targetNum = numMatch ? parseInt(numMatch[0], 10) : 0;
  const suffix = value.replace(/\d+/, '');

  const [displayValue, setDisplayValue] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    let frameId: number;
    const timeoutId = setTimeout(() => {
      setHasStarted(true);
      const duration = 1400;
      const startTime = performance.now();

      const updateCounter = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Smooth easeOutExpo curve
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = Math.round(targetNum * ease);

        setDisplayValue(current);

        if (progress < 1) {
          frameId = requestAnimationFrame(updateCounter);
        }
      };

      frameId = requestAnimationFrame(updateCounter);
    }, startDelay * 1000);

    return () => {
      clearTimeout(timeoutId);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [isInView, targetNum, startDelay]);

  return (
    <span ref={ref} className="inline-flex items-center tracking-tight">
      <motion.span
        initial={{ y: -20, opacity: 0 }}
        animate={isInView && hasStarted ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="inline-flex items-center"
      >
        <span>{displayValue}</span>
        <span className="text-slate-700 ml-0.5">{suffix}</span>
      </motion.span>
    </span>
  );
}

export default function Stats() {
  return (
    <section className="relative bg-[#ededf0] py-12 sm:py-16 lg:py-20 border-y border-gray-200/80 overflow-hidden font-sans">
      {/* ── Precision Dotted Grid Background Pattern ── */}
      <div className="absolute inset-0 bg-[radial-gradient(#99a1af_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-40 pointer-events-none [mask-image:radial-gradient(ellipse_75%_75%_at_50%_50%,#000_60%,transparent_100%)]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">

        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-8 sm:gap-12 lg:gap-8 w-full">

          {/* Left Text Box */}
          <div className="lg:w-1/3 flex flex-col justify-center relative text-center lg:text-left z-10 font-sans items-center lg:items-start">
            {/* 🌟 Stylish Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#ffaa00]/15 via-[#ffea00]/15 to-[#ccff00]/15 border border-[#ffaa00]/30 px-3.5 py-1 rounded-full text-xs font-bold text-amber-800 uppercase tracking-widest font-poppins mb-4 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#ffaa00]" />
              <span>PROVEN METRICS</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-poppins font-black leading-[1.12] tracking-tight mb-6">
              <span className="text-[#0f172a] block">Proven</span>
              <span className="text-[#0f172a]">Track </span>
              <span className="bg-gradient-to-r from-[#ffaa00] to-[#ffea00] bg-clip-text text-transparent">Record</span>
            </h2>
            <p className="text-gray-500 text-sm sm:text-base font-normal font-sans leading-relaxed max-w-md mx-auto lg:mx-0">
              Delivering high-quality digital experiences, from pixel-perfect frontend designs to robust full-stack architectures. Focused on real business value.
            </p>
          </div>

          {/* Right Stats Infographic */}
          <div className="lg:w-2/3 flex flex-row items-center justify-between sm:justify-around relative w-full z-10 px-0 sm:px-0 font-sans">

            {/* STEP 1: Yellow connecting line fills up across first */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="absolute top-1/2 -translate-y-1/2 left-2 right-2 sm:left-0 sm:right-0 h-[3px] bg-yellow-400 shadow-[0_0_12px_rgba(234,179,8,0.6)] -z-10 overflow-hidden rounded-full origin-left"
            />

            {stats.map((stat, i) => {
              const isCenter = i === 1;
              const isLeft = i === 0;
              const isRight = i === 2;

              // Step 2: Big Center circle pops in first at center (0.7s)
              // Step 3: Left & Right circles emerge from INSIDE the big center circle at 1.0s and slide out to their positions
              const initialX = isLeft ? "100%" : isRight ? "-100%" : 0;
              const initialScale = isCenter ? 0 : 0.2;
              const delay = isCenter ? 0.7 : 1.05;

              const transitionConfig = isCenter
                ? { type: 'spring' as const, damping: 14, stiffness: 140, delay }
                : { duration: 1.15, ease: [0.16, 1, 0.3, 1] as const, delay };

              // Sizing responsive: Center is big, outer circles are smaller, tailored for small mobile screens (<390px) up to desktop
              const sphereSizeClasses = isCenter
                ? "w-28 h-28 min-[390px]:w-32 min-[390px]:h-32 sm:w-44 sm:h-44 lg:w-52 lg:h-52 z-20 shadow-[0_10px_30px_rgba(202,138,4,0.45)]"
                : "w-20 h-20 min-[390px]:w-24 min-[390px]:h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 z-10 shadow-[0_8px_20px_rgba(202,138,4,0.3)]";

              const numberTextClasses = isCenter
                ? "text-2xl min-[390px]:text-3xl sm:text-5xl lg:text-6xl font-bold font-poppins text-gray-950 tracking-tight"
                : "text-xl min-[390px]:text-2xl sm:text-3xl lg:text-4xl font-bold font-poppins text-gray-950 tracking-tight";

              const labelTextClasses = isCenter
                ? "mt-0.5 sm:mt-2 text-[8px] min-[390px]:text-[9.5px] sm:text-[11px] font-bold font-sans uppercase tracking-wider text-slate-800 leading-tight px-1"
                : "mt-0.5 sm:mt-2 text-[7px] min-[390px]:text-[8.5px] sm:text-[10px] lg:text-[11px] font-bold font-sans uppercase tracking-wider text-slate-800 leading-tight px-1";

              return (
                <div key={stat.label} className="flex-1 flex justify-center items-center relative z-10 font-sans px-0.5">
                  {/* Floating container after appearing */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 3 + i * 0.4,
                      ease: "easeInOut",
                      delay: 2.8 + i * 0.3
                    }}
                  >
                    {/* 3D Yellow Sphere with Content Inside */}
                    <motion.div
                      initial={{
                        scale: initialScale,
                        x: initialX,
                        opacity: 0
                      }}
                      whileInView={{
                        scale: 1,
                        x: 0,
                        opacity: 1
                      }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={transitionConfig}
                      className={`${sphereSizeClasses} rounded-full relative flex flex-col items-center justify-center text-center p-1 sm:p-4 hover:scale-105 transition-transform duration-300 select-none cursor-pointer font-sans`}
                      style={{
                        background: 'radial-gradient(circle at 50% 18%, #ffffff 0%, #facc15 38%, #eab308 65%, #713f12 100%)'
                      }}
                    >
                      {/* STEP 4: Number drops down and counts up once circles finish sliding out (at 2.2s) */}
                      <div className={`${numberTextClasses} leading-none flex items-center justify-center drop-shadow-sm font-sans`}>
                        <AnimatedCounter value={stat.value} startDelay={2.2 + (isCenter ? 0 : 0.15)} />
                      </div>
                      <div className={labelTextClasses}>
                        {stat.label}
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
