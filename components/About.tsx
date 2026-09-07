'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin } from 'react-icons/fa';
import { SiGithub, SiMongodb, SiExpress, SiReact, SiNodedotjs } from 'react-icons/si';
import { Sparkles, Download } from 'lucide-react';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isCardVisible, setIsCardVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      // Triggers when user scrolls to the middle of the About section (rect.top reaches 65% of viewport height)
      const visible = rect.top <= window.innerHeight * 0.65 && rect.bottom >= 100;
      setIsCardVisible(visible);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="about" ref={sectionRef} className="w-full bg-[#fbfcfb] py-16 sm:py-28 text-[#1a1a1a] relative overflow-hidden border-b border-zinc-200/80">
      {/* ── Precision Dotted Grid Background Pattern ── */}
      <div className="absolute inset-0 bg-[radial-gradient(#99a1af_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-40 pointer-events-none [mask-image:radial-gradient(ellipse_75%_75%_at_50%_50%,#000_60%,transparent_100%)]" />

      <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-12 flex flex-col lg:flex-row items-center gap-6 lg:gap-8 xl:gap-10 relative z-10">
        
        {/* ── Left Side: Tilted/Rotated Card Image (DESKTOP ONLY - Top Drop Animation) ── */}
        <div className="hidden lg:block relative flex-shrink-0 w-full max-w-[350px] xl:max-w-[370px]">
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
              className="w-full h-auto pointer-events-none transform rotate-[7deg] hover:rotate-0 transition-transform duration-500 origin-top mix-blend-multiply"
            />
          </motion.div>
        </div>

        {/* ── Right Side: Text & Experience Content ── */}
        <div className="w-full flex-1 flex flex-col pt-1 lg:pt-2 items-center lg:items-start text-center lg:text-left">
          
          {/* Header Title & Typewriter Summary */}
          <motion.div 
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans flex flex-col items-center lg:items-start w-full relative"
          >
            {/* 🌟 Stylish About Me Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#ffaa00]/15 via-[#ffea00]/15 to-[#ccff00]/15 border border-[#ffaa00]/30 px-3.5 py-1 rounded-full text-xs font-bold text-amber-800 uppercase tracking-widest font-poppins mb-4 shadow-2xs self-center lg:self-start">
              <Sparkles className="w-3.5 h-3.5 text-[#ffaa00]" />
              <span>ABOUT ME</span>
            </div>

            <h2 className="text-[22px] min-[380px]:text-[26px] sm:text-4xl lg:text-[54px] font-black text-[#0f172a] mb-4 sm:mb-5 tracking-tight font-poppins text-center lg:text-left whitespace-nowrap sm:whitespace-normal">
              Hi, I'm <span className="bg-gradient-to-r from-[#ffaa00] to-[#ffea00] bg-clip-text text-transparent">Usama Faheem</span>
            </h2>

            <p className="text-[#555555] text-sm sm:text-[16px] leading-[1.75] max-w-[850px] font-normal font-sans mb-6 lg:mb-10 text-center lg:text-left">
              I am a Frontend-focused MERN Stack Developer with <strong className="font-bold text-[#d97706] bg-[#ffaa00]/15 px-1.5 py-0.5 rounded border border-[#ffaa00]/30">1 year</strong> of experience building high-converting <strong className="font-bold text-[#d97706] bg-[#ffaa00]/15 px-1.5 py-0.5 rounded border border-[#ffaa00]/30">web applications</strong> for <strong className="font-bold text-[#d97706] bg-[#ffaa00]/15 px-1.5 py-0.5 rounded border border-[#ffaa00]/30">clients</strong>, <strong className="font-bold text-[#d97706] bg-[#ffaa00]/15 px-1.5 py-0.5 rounded border border-[#ffaa00]/30">startups</strong>, and <strong className="font-bold text-[#d97706] bg-[#ffaa00]/15 px-1.5 py-0.5 rounded border border-[#ffaa00]/30">agencies</strong>. Turning complex <strong className="font-bold text-[#d97706] bg-[#ffaa00]/15 px-1.5 py-0.5 rounded border border-[#ffaa00]/30">ideas</strong> into clean <strong className="font-bold text-[#d97706] bg-[#ffaa00]/15 px-1.5 py-0.5 rounded border border-[#ffaa00]/30">development</strong> and effortless user experiences.
            </p>
          </motion.div>

          {/* ── MOBILE ONLY CARD IMAGE (Positioned right after bio paragraph, animates in from LEFT) ── */}
          <div className="block lg:hidden w-full my-7 max-w-[245px] sm:max-w-[285px] mx-auto relative z-20">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                type: "spring",
                stiffness: 90,
                damping: 15,
                duration: 0.8
              }}
            >
              <img 
                src="/Badge_holder_with_man_photo_202608121707.jpeg" 
                alt="Usama Faheem Card Mobile" 
                className="w-full h-auto pointer-events-none transform rotate-[6deg] hover:rotate-0 transition-transform duration-500 origin-center mix-blend-multiply"
              />
            </motion.div>
          </div>

          {/* ── 3-Column Grid Spread Out Across Available Width ── */}
          <motion.div 
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 xl:gap-14 mt-4 lg:mt-0"
          >
            
            {/* Column 1: EXPERIENCE */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:pr-8 lg:border-r border-zinc-300/80">
              <h3 className="text-[13px] font-black tracking-[0.18em] text-[#d97706] mb-6 uppercase font-poppins">
                EXPERIENCE
              </h3>
              
              <div className="flex flex-col gap-6 w-full">
                <div>
                  <h4 className="text-[13px] xl:text-[14px] font-bold text-[#1f1f1f] leading-snug font-poppins">
                    React/Next.js & MERN Developer
                  </h4>
                  <p className="text-[12.5px] text-[#555555] font-normal mt-0.5 font-sans">
                    VertexAi Tec
                  </p>
                  <p className="text-[11px] text-[#888888] font-normal mt-0.5 font-sans">
                    Dec 2025 – Aug 2026
                  </p>
                </div>

                <div>
                  <h4 className="text-[13px] xl:text-[14px] font-bold text-[#1f1f1f] leading-snug font-poppins">
                    Frontend Developer Intern
                  </h4>
                  <p className="text-[12.5px] text-[#555555] font-normal mt-0.5 font-sans">
                    SoftCr8ors
                  </p>
                  <p className="text-[11px] text-[#888888] font-normal mt-0.5 font-sans">
                    April 2026 – July 2026
                  </p>
                </div>

                <div>
                  <h4 className="text-[13px] xl:text-[14px] font-bold text-[#1f1f1f] leading-snug font-poppins">
                    Freelance Full-Stack Developer
                  </h4>
                  <p className="text-[12.5px] text-[#555555] font-normal mt-0.5 font-sans">
                    3+ Client Projects
                  </p>
                  <p className="text-[11px] text-[#888888] font-normal mt-0.5 font-sans">
                    Overall 1 Year Experience
                  </p>
                </div>
              </div>
            </div>

            {/* Column 2: EDUCATION */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:pr-8 lg:border-r border-zinc-300/80">
              <h3 className="text-[13px] font-black tracking-[0.18em] text-[#d97706] mb-6 uppercase font-poppins">
                EDUCATION
              </h3>
              
              <div className="flex flex-col gap-6 w-full">
                <div>
                  <h4 className="text-[13px] xl:text-[14px] font-bold text-[#1f1f1f] leading-snug font-poppins">
                    BS Computer Science (6th Sem)
                  </h4>
                  <p className="text-[12.5px] text-[#555555] font-normal mt-0.5 font-sans">
                    Virtual University of Pakistan
                  </p>
                  <p className="text-[11px] text-[#888888] font-normal mt-0.5 font-sans">
                    Sep 2025 – Present
                  </p>
                </div>

                <div>
                  <h4 className="text-[13px] xl:text-[14px] font-bold text-[#1f1f1f] leading-snug font-poppins">
                    ADP in Computer Science
                  </h4>
                  <p className="text-[12.5px] text-[#555555] font-normal mt-0.5 font-sans">
                    Virtual University of Pakistan
                  </p>
                  <p className="text-[11px] text-[#888888] font-normal mt-0.5 font-sans">
                    March 2023 – March 2025
                  </p>
                </div>

                <div>
                  <h4 className="text-[13px] xl:text-[14px] font-bold text-[#1f1f1f] leading-snug font-poppins">
                    MERN Stack Certification
                  </h4>
                  <p className="text-[12.5px] text-[#555555] font-normal mt-0.5 font-sans">
                    Nexskill Institute
                  </p>
                  <p className="text-[11px] text-[#888888] font-normal mt-0.5 font-sans">
                    Dec 2024 – May 2025
                  </p>
                </div>
              </div>
            </div>

            {/* Column 3: CONTACT & SOFTWARES */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left justify-between">
              
              {/* Contact Links */}
              <div className="w-full flex flex-col items-center lg:items-start">
                <h3 className="text-[13px] font-black tracking-[0.18em] text-[#d97706] mb-6 uppercase font-poppins">
                  CONTACT
                </h3>
                
                <ul className="flex flex-col gap-3.5 items-center lg:items-start">
                  <li className="flex items-center gap-3 group">
                    <div className="w-7 h-7 rounded-md bg-[#ededf0] border border-zinc-200 flex items-center justify-center flex-shrink-0 shadow-2xs group-hover:scale-110 transition-transform">
                      <FaLinkedin className="w-5 h-5 text-[#0077b5]" />
                    </div>
                    <a 
                      href="https://www.linkedin.com/in/usama-faheem/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[12.5px] xl:text-[13px] text-[#444444] hover:text-[#0077b5] transition-colors whitespace-nowrap font-normal font-sans"
                    >
                      linkedin.com/in/usama-faheem
                    </a>
                  </li>

                  <li className="flex items-center gap-3 group">
                    <div className="w-7 h-7 rounded-md bg-[#ededf0] border border-zinc-200 flex items-center justify-center flex-shrink-0 shadow-2xs group-hover:scale-110 transition-transform">
                      <SiGithub className="w-[19px] h-[19px] text-[#24292f]" />
                    </div>
                    <a 
                      href="https://github.com/usamafaheem-dev" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[12.5px] xl:text-[13px] text-[#444444] hover:text-[#181717] transition-colors whitespace-nowrap font-normal font-sans"
                    >
                      github.com/usamafaheem-dev
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
                      className="text-[12.5px] xl:text-[13px] text-[#444444] hover:text-[#ea4335] transition-colors whitespace-nowrap font-normal font-sans"
                    >
                      developer@usamafaheem.com
                    </a>
                  </li>
                </ul>
              </div>

              {/* MERN STACK & Softwares */}
              <div className="mt-7 w-full flex flex-col items-center lg:items-start gap-5">
                {/* MERN Stack Row */}
                <div className="flex flex-col items-center lg:items-start">
                  <h3 className="text-[13px] font-black tracking-[0.18em] text-[#d97706] mb-3 uppercase font-poppins">
                    MERN STACK
                  </h3>
                  
                  <div className="flex items-center justify-center lg:justify-start gap-3 flex-nowrap">
                    {/* MongoDB */}
                    <div className="w-8 h-8 rounded-lg bg-[#fffce8] border border-amber-300/70 flex items-center justify-center p-1.5 shadow-2xs hover:scale-110 transition-transform cursor-pointer" title="MongoDB">
                      <SiMongodb className="w-5 h-5 text-[#47A248]" />
                    </div>

                    {/* Express.js */}
                    <div className="w-8 h-8 rounded-lg bg-[#fffce8] border border-amber-300/70 flex items-center justify-center p-1.5 shadow-2xs hover:scale-110 transition-transform cursor-pointer" title="Express.js">
                      <SiExpress className="w-4.5 h-4.5 text-[#18181b]" />
                    </div>

                    {/* React.js */}
                    <div className="w-8 h-8 rounded-lg bg-[#fffce8] border border-amber-300/70 flex items-center justify-center p-1.5 shadow-2xs hover:scale-110 transition-transform cursor-pointer" title="React.js">
                      <SiReact className="w-5 h-5 text-[#61DAFB]" />
                    </div>

                    {/* Node.js */}
                    <div className="w-8 h-8 rounded-lg bg-[#fffce8] border border-amber-300/70 flex items-center justify-center p-1.5 shadow-2xs hover:scale-110 transition-transform cursor-pointer" title="Node.js">
                      <SiNodedotjs className="w-5 h-5 text-[#339933]" />
                    </div>
                  </div>
                </div>

                {/* Softwares Row */}
                <div className="flex flex-col items-center lg:items-start">
                  <h3 className="text-[13px] font-black tracking-[0.18em] text-[#d97706] uppercase font-poppins mb-3">
                    SOFTWARES & TOOLS
                  </h3>
                  
                  <div className="flex items-center justify-center lg:justify-start gap-3 flex-nowrap">
                    <div className="w-8 h-8 rounded-lg bg-[#fffce8] border border-amber-300/70 flex items-center justify-center p-1.5 shadow-2xs hover:scale-110 transition-transform cursor-pointer overflow-hidden" title="Visual Studio Code">
                      <img src="/icons/vscode.png" alt="VS Code" className="w-full h-full object-contain mix-blend-multiply" />
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-[#fffce8] border border-amber-300/70 flex items-center justify-center p-1.5 shadow-2xs hover:scale-110 transition-transform cursor-pointer overflow-hidden" title="Cursor">
                      <img src="/icons/cursor.png" alt="Cursor" className="w-full h-full object-contain mix-blend-multiply" />
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-[#fffce8] border border-amber-300/70 flex items-center justify-center p-1.5 shadow-2xs hover:scale-110 transition-transform cursor-pointer overflow-hidden" title="Google Antigravity">
                      <img src="/icons/antigravity.png" alt="Antigravity" className="w-full h-full object-contain mix-blend-multiply" />
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-[#fffce8] border border-amber-300/70 flex items-center justify-center p-1.5 shadow-2xs hover:scale-110 transition-transform cursor-pointer overflow-hidden" title="Claude AI">
                      <img src="/icons/claude.png" alt="Claude AI" className="w-full h-full object-contain mix-blend-multiply" />
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-[#fffce8] border border-amber-300/70 flex items-center justify-center p-1.5 shadow-2xs hover:scale-110 transition-transform cursor-pointer" title="Figma">
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
              </div>

            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}
