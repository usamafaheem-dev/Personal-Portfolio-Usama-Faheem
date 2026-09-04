'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin } from 'react-icons/fa';
import { SiGithub } from 'react-icons/si';

export default function About() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [isCardVisible, setIsCardVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!gridRef.current) return;
      const rect = gridRef.current.getBoundingClientRect();
      // Triggers right as soon as Experience/Education/Contact appears on screen
      const visible = rect.top <= window.innerHeight * 0.88 && rect.bottom >= 50;
      setIsCardVisible(visible);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="about" className="w-full bg-[#fbfcfb] py-20 sm:py-28 text-[#1a1a1a] relative overflow-hidden border-b border-zinc-200/80">
      {/* ── Precision Dotted Grid Background Pattern ── */}
      <div className="absolute inset-0 bg-[radial-gradient(#99a1af_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-40 pointer-events-none [mask-image:radial-gradient(ellipse_75%_75%_at_50%_50%,#000_60%,transparent_100%)]" />

      <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-12 flex flex-col lg:flex-row items-center gap-6 lg:gap-8 xl:gap-10 relative z-10">
        
        {/* ── Left Side: Tilted/Rotated Card Image (Lifted Higher Up & Full View) ── */}
        <div className="relative flex-shrink-0 w-full max-w-[280px] sm:max-w-[330px] lg:max-w-[350px] xl:max-w-[370px]">
          <motion.div
            initial="hidden"
            animate={isCardVisible ? "visible" : "hidden"}
            variants={{
              hidden: { 
                opacity: 0, 
                y: -350,
                transition: { 
                  duration: 0.8,
                  ease: "easeInOut" 
                }
              },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { 
                  type: "spring",
                  bounce: 0.72,
                  duration: 2.6,
                  delay: 0.1
                }
              }
            }}
          >
            <img 
              src="/Badge_holder_with_man_photo_202608121707.jpeg" 
              alt="Usama Faheem Card" 
              className="w-full h-auto pointer-events-none transform rotate-[7deg] hover:rotate-0 transition-transform duration-500 origin-top"
            />
          </motion.div>
        </div>

        {/* ── Right Side: Text & Experience Content (Starts Right by Ribbon Level) ── */}
        <div className="w-full flex-1 flex flex-col pt-1 lg:pt-2">
          
          {/* Header Title & Typewriter Summary */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px 0px -25% 0px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.15 } }
            }}
            className="font-sans"
          >
            <motion.h2 
              variants={{
                hidden: { opacity: 0, y: 25 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
              }}
              className="text-4xl sm:text-5xl lg:text-[54px] font-black text-[#1f1f1f] mb-5 tracking-tight font-sans"
            >
              Hi, I'm <span className="bg-gradient-to-r from-[#ffaa00] to-[#ffea00] bg-clip-text text-transparent font-black">Usama Faheem</span>
            </motion.h2>

            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
              }}
              className="text-[#555555] text-[15px] sm:text-[16px] leading-[1.75] max-w-[850px] font-normal font-sans mb-10"
            >
              I am a Frontend-focused MERN Stack Developer with 1 year of frontend and MERN stack experience. I design because I love solving problems and making things feel right. Web development is about people and the tiny details that make a product worth using. It is not just about looking good but feeling effortless. If it makes sense without overthinking then I have done my job.
            </motion.p>
          </motion.div>

          {/* ── 3-Column Grid Spread Out Across Available Width ── */}
          <motion.div 
            ref={gridRef}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.4, delayChildren: 0.2 } }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 xl:gap-14"
          >
            
            {/* Column 1: EXPERIENCE */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
              }}
              className="flex flex-col lg:pr-8 lg:border-r border-zinc-300/80"
            >
              <h3 className="text-[13px] font-bold tracking-[0.16em] bg-gradient-to-r from-cyan-500 via-yellow-400 to-lime-500 bg-[length:200%_auto] animate-[glow-slide_3s_linear_infinite] bg-clip-text text-transparent mb-6 uppercase">
                EXPERIENCE
              </h3>
              
              <div className="flex flex-col gap-6">
                <div>
                  <h4 className="text-[13px] xl:text-[14px] font-bold text-[#1f1f1f] leading-snug whitespace-nowrap">
                    React/Next.js & MERN Developer
                  </h4>
                  <p className="text-[12.5px] text-[#555555] font-normal mt-0.5">
                    VertexAi Tec
                  </p>
                  <p className="text-[11px] text-[#888888] font-normal mt-0.5">
                    Dec 2025 – Aug 2026
                  </p>
                </div>

                <div>
                  <h4 className="text-[13px] xl:text-[14px] font-bold text-[#1f1f1f] leading-snug whitespace-nowrap">
                    Frontend Developer Intern
                  </h4>
                  <p className="text-[12.5px] text-[#555555] font-normal mt-0.5">
                    SoftCr8ors
                  </p>
                  <p className="text-[11px] text-[#888888] font-normal mt-0.5">
                    April 2026 – July 2026
                  </p>
                </div>

                <div>
                  <h4 className="text-[13px] xl:text-[14px] font-bold text-[#1f1f1f] leading-snug whitespace-nowrap">
                    Freelance Full-Stack Developer
                  </h4>
                  <p className="text-[12.5px] text-[#555555] font-normal mt-0.5">
                    3+ Client Projects
                  </p>
                  <p className="text-[11px] text-[#888888] font-normal mt-0.5">
                    Overall 1 Year Experience
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Column 2: EDUCATION */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: -50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
              }}
              className="flex flex-col lg:pr-8 lg:border-r border-zinc-300/80"
            >
              <h3 className="text-[13px] font-bold tracking-[0.16em] bg-gradient-to-r from-cyan-500 via-yellow-400 to-lime-500 bg-[length:200%_auto] animate-[glow-slide_3s_linear_infinite] bg-clip-text text-transparent mb-6 uppercase">
                EDUCATION
              </h3>
              
              <div className="flex flex-col gap-6">
                <div>
                  <h4 className="text-[13px] xl:text-[14px] font-bold text-[#1f1f1f] leading-snug whitespace-nowrap">
                    BS Computer Science (6th Sem)
                  </h4>
                  <p className="text-[12.5px] text-[#555555] font-normal mt-0.5">
                    Virtual University of Pakistan
                  </p>
                  <p className="text-[11px] text-[#888888] font-normal mt-0.5">
                    Sep 2025 – Present
                  </p>
                </div>

                <div>
                  <h4 className="text-[13px] xl:text-[14px] font-bold text-[#1f1f1f] leading-snug whitespace-nowrap">
                    ADP in Computer Science
                  </h4>
                  <p className="text-[12.5px] text-[#555555] font-normal mt-0.5">
                    Virtual University of Pakistan
                  </p>
                  <p className="text-[11px] text-[#888888] font-normal mt-0.5">
                    March 2023 – March 2025
                  </p>
                </div>

                <div>
                  <h4 className="text-[13px] xl:text-[14px] font-bold text-[#1f1f1f] leading-snug whitespace-nowrap">
                    MERN Stack Certification
                  </h4>
                  <p className="text-[12.5px] text-[#555555] font-normal mt-0.5">
                    Nexskill Institute
                  </p>
                  <p className="text-[11px] text-[#888888] font-normal mt-0.5">
                    Dec 2024 – May 2025
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Column 3: CONTACT & SOFTWARES */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
              }}
              className="flex flex-col justify-between"
            >
              
              {/* Contact Links */}
              <div>
                <h3 className="text-[13px] font-bold tracking-[0.16em] bg-gradient-to-r from-cyan-500 via-yellow-400 to-lime-500 bg-[length:200%_auto] animate-[glow-slide_3s_linear_infinite] bg-clip-text text-transparent mb-6 uppercase">
                  CONTACT
                </h3>
                
                <ul className="flex flex-col gap-3.5">
                  <li className="flex items-center gap-3 group">
                    <div className="w-7 h-7 rounded-md bg-[#ededf0] border border-zinc-200 flex items-center justify-center flex-shrink-0 shadow-2xs group-hover:scale-110 transition-transform">
                      <FaLinkedin className="w-5 h-5 text-[#0077b5]" />
                    </div>
                    <a 
                      href="https://linkedin.com" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[12.5px] xl:text-[13px] text-[#444444] hover:text-[#0077b5] transition-colors whitespace-nowrap font-normal"
                    >
                      linkedin.com/in/usamafaheem
                    </a>
                  </li>

                  <li className="flex items-center gap-3 group">
                    <div className="w-7 h-7 rounded-md bg-[#ededf0] border border-zinc-200 flex items-center justify-center flex-shrink-0 shadow-2xs group-hover:scale-110 transition-transform">
                      <SiGithub className="w-[19px] h-[19px] text-[#24292f]" />
                    </div>
                    <a 
                      href="https://github.com" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[12.5px] xl:text-[13px] text-[#444444] hover:text-[#181717] transition-colors whitespace-nowrap font-normal"
                    >
                      github.com/usamafaheem
                    </a>
                  </li>

                  <li className="flex items-center gap-3 group">
                    <div className="w-7 h-7 rounded-md bg-[#ededf0] border border-zinc-200 flex items-center justify-center flex-shrink-0 shadow-2xs group-hover:scale-110 transition-transform">
                      {/* Official Google 4-Color Gmail Logo */}
                      <svg className="w-[20px] h-[20px] flex-shrink-0" viewBox="0 0 24 24" fill="none">
                        <path d="M1.5 6.5C1.5 5.39543 2.39543 4.5 3.5 4.5H5L12 9.75L19 4.5H20.5C21.6046 4.5 22.5 5.39543 22.5 6.5V17.5C22.5 18.6046 21.6046 19.5 20.5 19.5H19V8.5L12 13.75L5 8.5V19.5H3.5C2.39543 19.5 1.5 18.6046 1.5 17.5V6.5Z" fill="#EA4335"/>
                        <path d="M1.5 6.5V17.5C1.5 18.6046 2.39543 19.5 3.5 19.5H5V8.5L1.5 6.5Z" fill="#4285F4"/>
                        <path d="M22.5 6.5V17.5C22.5 18.6046 21.6046 19.5 20.5 19.5H19V8.5L22.5 6.5Z" fill="#34A853"/>
                        <path d="M19 4.5L22.5 6.5L19 8.5V4.5Z" fill="#FBBC04"/>
                        <path d="M5 4.5L1.5 6.5L5 8.5V4.5Z" fill="#C5221F"/>
                      </svg>
                    </div>
                    <a 
                      href="mailto:developer@usamafaheem.com" 
                      className="text-[12.5px] xl:text-[13px] text-[#444444] hover:text-[#ea4335] transition-colors whitespace-nowrap font-normal"
                    >
                      developer@usamafaheem.com
                    </a>
                  </li>
                </ul>
              </div>

              {/* Softwares in a Single Clean Row */}
              <div className="mt-8">
                <h3 className="text-[13px] font-bold tracking-[0.16em] bg-gradient-to-r from-cyan-500 via-yellow-400 to-lime-500 bg-[length:200%_auto] animate-[glow-slide_3s_linear_infinite] bg-clip-text text-transparent mb-4 uppercase">
                  SOFTWARES
                </h3>
                
                <div className="flex items-center gap-3 flex-nowrap">
                  {/* Visual Studio Code */}
                  <div className="w-8 h-8 rounded-lg bg-[#ededf0] border border-zinc-200 flex items-center justify-center p-1 shadow-2xs hover:scale-110 transition-transform cursor-pointer overflow-hidden" title="Visual Studio Code">
                    <img src="/icons/vscode.png" alt="VS Code" className="w-full h-full object-contain mix-blend-multiply" />
                  </div>

                  {/* Cursor */}
                  <div className="w-8 h-8 rounded-lg bg-[#ededf0] border border-zinc-200 flex items-center justify-center p-1 shadow-2xs hover:scale-110 transition-transform cursor-pointer overflow-hidden" title="Cursor">
                    <img src="/icons/cursor.png" alt="Cursor" className="w-full h-full object-contain mix-blend-multiply" />
                  </div>

                  {/* Google Antigravity */}
                  <div className="w-8 h-8 rounded-lg bg-[#ededf0] border border-zinc-200 flex items-center justify-center p-1 shadow-2xs hover:scale-110 transition-transform cursor-pointer overflow-hidden" title="Google Antigravity">
                    <img src="/icons/antigravity.png" alt="Antigravity" className="w-full h-full object-contain mix-blend-multiply" />
                  </div>

                  {/* Claude AI */}
                  <div className="w-8 h-8 rounded-lg bg-[#ededf0] border border-zinc-200 flex items-center justify-center p-1 shadow-2xs hover:scale-110 transition-transform cursor-pointer overflow-hidden" title="Claude AI">
                    <img src="/icons/claude.png" alt="Claude AI" className="w-full h-full object-contain mix-blend-multiply" />
                  </div>

                  {/* Figma Official Multi-Color Logo */}
                  <div className="w-8 h-8 rounded-lg bg-[#ededf0] border border-zinc-200 flex items-center justify-center shadow-2xs hover:scale-110 transition-transform cursor-pointer" title="Figma">
                    <svg className="w-[16px] h-[16px] flex-shrink-0" viewBox="0 0 38 57" fill="none">
                      <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
                      <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
                      <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
                      <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
                      <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
                    </svg>
                  </div>
                </div>
              </div>

            </motion.div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}
