'use client';

import {
  SiNextdotjs,
  SiReact,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiSupabase,
  SiRedux,
  SiThreedotjs,
  SiFramer,
  SiGithub,
  SiVercel,
  SiPostman
} from 'react-icons/si';

const techs = [
  { name: 'React.js', icon: SiReact, color: '#61DAFB' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
  { name: 'Express.js', icon: SiExpress, color: '#ffffff' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
  { name: 'Supabase', icon: SiSupabase, color: '#3ECF8E' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'Redux', icon: SiRedux, color: '#764ABC' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'Three.js', icon: SiThreedotjs, color: '#ffffff' },
  { name: 'Framer Motion', icon: SiFramer, color: '#0055FF' },
  { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
  { name: 'CSS3', icon: SiCss, color: '#1572B6' },
  { name: 'GitHub', icon: SiGithub, color: '#ffffff' },
  { name: 'Vercel', icon: SiVercel, color: '#ffffff' },
  { name: 'Postman', icon: SiPostman, color: '#FF6C37' },
];

export default function TechMarquee() {
  return (
    <div className="relative w-full h-28 sm:h-44 md:h-56 mt-2 sm:mt-4 overflow-hidden bg-transparent flex items-center justify-center z-[20]">

      {/* 
        Pure CSS animation using translate3d for GPU acceleration. 
        It is completely detached from JS thread.
      */}
      <style>
        {`
          @keyframes hardware-marquee {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-50%, 0, 0); }
          }
          .animate-hardware-marquee {
            animation: hardware-marquee 60s linear infinite;
            will-change: transform;
            transform: translateZ(0);
            backface-visibility: hidden;
            perspective: 1000px;
          }
        `}
      </style>

      {/* Background Slanted Box: brand lime running into the action blue on the right */}
      <div className="absolute w-[115%] h-12 sm:h-16 md:h-20 bg-gradient-to-r from-[#d8ff00] to-[#0052ff] rotate-2 origin-center opacity-90 shadow-lg" style={{ transform: 'translateZ(0)' }} />

      {/* Black Marquee Slanted Strip */}
      <div className="absolute w-[115%] h-12 sm:h-16 md:h-20 bg-[#18181b] -rotate-2 origin-center flex flex-col justify-center border-y border-white/10 shadow-xl" style={{ transform: 'translateZ(0)' }}>

        <div className="flex w-max items-center animate-hardware-marquee">
          {/* Render exactly 2 identical blocks (no 4x duplication) to keep DOM tiny */}
          {[1, 2].map((blockId) => (
            <div key={blockId} className="flex items-center gap-4 sm:gap-8 md:gap-12 pr-4 sm:pr-8 md:pr-12">
              {techs.map((tech, index) => (
                <div key={`${blockId}-${index}`} className="flex items-center gap-2 sm:gap-3 md:gap-4 pointer-events-none">
                  <tech.icon aria-hidden="true" className="w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10" style={{ color: tech.color }} />
                  <span className="text-white font-sans font-bold text-sm sm:text-xl md:text-2xl tracking-tight whitespace-nowrap">
                    {tech.name}
                  </span>
                  {/* Star Separator */}
                  <span className="text-lime-400/90 mx-2 sm:mx-4 md:mx-6 text-xs sm:text-lg md:text-xl">
                    ✦
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
