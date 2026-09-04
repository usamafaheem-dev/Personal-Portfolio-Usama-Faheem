'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
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
        <span className="text-yellow-950/80 ml-0.5">{suffix}</span>
      </motion.span>
    </span>
  );
}

export default function Stats() {
  return (
    <section className="relative bg-[#ededf0] py-24 border-y border-gray-200/80 overflow-hidden font-sans">
      {/* ── Precision Dotted Grid Background Pattern ── */}
      <div className="absolute inset-0 bg-[radial-gradient(#99a1af_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-40 pointer-events-none [mask-image:radial-gradient(ellipse_75%_75%_at_50%_50%,#000_60%,transparent_100%)]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">

        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-16 lg:gap-8 w-full">

          {/* Left Text Box */}
          <div className="lg:w-1/3 flex flex-col justify-center relative text-center lg:text-left z-10 font-sans">
            <h2 className="text-4xl sm:text-5xl font-sans font-black text-gray-900 mb-6 tracking-tight">
              Proven <br className="hidden lg:block" />Track Record
            </h2>
            <p className="text-gray-500 text-sm sm:text-base font-normal font-sans leading-relaxed max-w-md mx-auto lg:mx-0">
              Delivering high-quality digital experiences, from pixel-perfect frontend designs to robust full-stack architectures. Focused on real business value.
            </p>
          </div>

          {/* Right Stats Infographic */}
          <div className="lg:w-2/3 flex flex-row items-center justify-between sm:justify-around relative w-full z-10 px-2 sm:px-0 font-sans">

            {/* STEP 1: Yellow connecting line fills up across first */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-[3px] bg-yellow-400 shadow-[0_0_12px_rgba(234,179,8,0.6)] -z-10 overflow-hidden rounded-full origin-left"
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

              // Sizing to match screenshot: Center is big (w-52), outer circles are smaller (w-36)
              const sphereSizeClasses = isCenter
                ? "w-36 h-36 sm:w-52 sm:h-52 z-20 shadow-[0_15px_40px_rgba(202,138,4,0.45)]"
                : "w-28 h-28 sm:w-36 sm:h-36 z-10 shadow-[0_10px_28px_rgba(202,138,4,0.3)]";

              const numberTextClasses = isCenter
                ? "text-4xl sm:text-6xl font-black font-sans text-gray-950 tracking-tight"
                : "text-3xl sm:text-4xl font-black font-sans text-gray-950 tracking-tight";

              return (
                <div key={stat.label} className="flex-1 flex justify-center items-center relative z-10 font-sans">
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
                    {/* 3D Sphere with Content Inside */}
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
                      className={`${sphereSizeClasses} rounded-full relative flex flex-col items-center justify-center text-center p-2 sm:p-4 hover:scale-105 transition-transform duration-300 select-none cursor-pointer font-sans`}
                      style={{
                        background: 'radial-gradient(circle at 50% 18%, #ffffff 0%, #facc15 38%, #eab308 65%, #713f12 100%)'
                      }}
                    >
                      {/* STEP 4: Number drops down and counts up once circles finish sliding out (at 2.2s) */}
                      <div className={`${numberTextClasses} leading-none flex items-center justify-center drop-shadow-sm font-sans`}>
                        <AnimatedCounter value={stat.value} startDelay={2.2 + (isCenter ? 0 : 0.15)} />
                      </div>
                      <div className="mt-1 sm:mt-2 text-[9px] sm:text-[11px] font-bold font-sans uppercase tracking-wider text-yellow-950/90 leading-tight">
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
