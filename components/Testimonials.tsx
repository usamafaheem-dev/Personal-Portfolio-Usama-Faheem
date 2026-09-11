'use client';

import { motion } from 'framer-motion';
import { Star, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface TagTheme {
  bg: string;
  text: string;
  border: string;
  icon: string;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  quote: string;
  tag: string;
  tagTheme: TagTheme;
  location: string;
  featured?: boolean;
}

const testimonialsCol1: Testimonial[] = [
  {
    id: 't1',
    name: 'Alex Morgan',
    role: 'Founder & CEO',
    company: 'HyperScale AI',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=250&h=250&fit=crop&crop=face',
    rating: 5,
    quote: 'Usama delivered our Next.js platform 4 days ahead of deadline. The UI micro-animations and loading performance are world-class.',
    tag: 'Full-Stack Web App',
    tagTheme: {
      bg: 'bg-amber-100/80',
      text: 'text-amber-900',
      border: 'border-amber-300/90',
      icon: 'text-amber-600',
    },
    location: 'San Francisco, USA',
    featured: true,
  },
  {
    id: 't2',
    name: 'David Chen',
    role: 'Co-Founder & VP Design',
    company: 'VibeStream Labs',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=250&h=250&fit=crop&crop=face',
    rating: 5,
    quote: 'The attention to smooth transitions and glassmorphic UI is astonishing. Usama builds genuine digital experiences that convert.',
    tag: 'Interactive 3D & UI',
    tagTheme: {
      bg: 'bg-cyan-100/80',
      text: 'text-cyan-900',
      border: 'border-cyan-300/90',
      icon: 'text-cyan-600',
    },
    location: 'Singapore',
  },
  {
    id: 't3',
    name: 'Marcus Thorne',
    role: 'Design Director',
    company: 'Apex Creative Co.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=250&h=250&fit=crop&crop=face',
    rating: 5,
    quote: 'Rare full-stack talent who understands design aesthetics as deeply as technical engineering. Our signups jumped 42% right after launch.',
    tag: 'Figma to React',
    tagTheme: {
      bg: 'bg-purple-100/80',
      text: 'text-purple-900',
      border: 'border-purple-300/90',
      icon: 'text-purple-600',
    },
    location: 'Toronto, Canada',
  },
  {
    id: 't4',
    name: 'James Wilson',
    role: 'Head of Growth',
    company: 'SaaSGen Metrics',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=250&h=250&fit=crop&crop=face',
    rating: 5,
    quote: 'Top 1% developer on Upwork. Lightning-fast communication, zero bugs, and pristine TypeScript architecture.',
    tag: 'SaaS Dashboard',
    tagTheme: {
      bg: 'bg-blue-100/80',
      text: 'text-blue-900',
      border: 'border-blue-300/90',
      icon: 'text-blue-600',
    },
    location: 'Austin, USA',
    featured: true,
  },
];

const testimonialsCol2: Testimonial[] = [
  {
    id: 't5',
    name: 'Sarah Jenkins',
    role: 'Product Lead',
    company: 'CloudFlow UK',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=250&h=250&fit=crop&crop=face',
    rating: 5,
    quote: 'Working with Usama was an absolute breeze. He translated complex design specs into responsive, production-ready code with ease.',
    tag: 'Next.js 15 & Tailwind',
    tagTheme: {
      bg: 'bg-sky-100/80',
      text: 'text-sky-900',
      border: 'border-sky-300/90',
      icon: 'text-sky-600',
    },
    location: 'London, UK',
    featured: true,
  },
  {
    id: 't6',
    name: 'Elena Rostova',
    role: 'CTO & Tech Lead',
    company: 'FinEdge Core',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=250&h=250&fit=crop&crop=face',
    rating: 5,
    quote: 'Exceptional problem solver. Clean backend APIs, secure database structure, and 100/100 Lighthouse performance scores.',
    tag: 'Backend & APIs',
    tagTheme: {
      bg: 'bg-emerald-100/80',
      text: 'text-emerald-900',
      border: 'border-emerald-300/90',
      icon: 'text-emerald-600',
    },
    location: 'Berlin, Germany',
  },
  {
    id: 't7',
    name: 'Sophia Al-Mansoor',
    role: 'Managing Director',
    company: 'LuxeVault Digital',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=250&h=250&fit=crop&crop=face',
    rating: 5,
    quote: 'Incredible work ethic and 24/7 responsiveness. Usama went above and beyond to make our brand web portal look ultra-luxurious.',
    tag: 'E-Commerce Portal',
    tagTheme: {
      bg: 'bg-rose-100/80',
      text: 'text-rose-900',
      border: 'border-rose-300/90',
      icon: 'text-rose-600',
    },
    location: 'Dubai, UAE',
    featured: true,
  },
  {
    id: 't8',
    name: 'Isabella Rossi',
    role: 'Creative Founder',
    company: 'Bloom Agency',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=250&h=250&fit=crop&crop=face',
    rating: 5,
    quote: 'He crafted a truly captivating animated site for our agency. Clients constantly ask who built our web experience!',
    tag: 'Framer Motion & WebGL',
    tagTheme: {
      bg: 'bg-lime-100/90',
      text: 'text-lime-950',
      border: 'border-lime-400/90',
      icon: 'text-lime-700',
    },
    location: 'Milan, Italy',
  },
];

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <div className="relative bg-white rounded-2xl p-5 border border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(255,170,0,0.18)] hover:border-[#ffaa00] transition-all duration-300 group flex flex-col justify-between [transform:translateZ(0)] [backface-visibility:hidden]">
      {/* Top Row: User Avatar, Name, Role & Stars */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            {/* Avatar with Outside Green Online Dot */}
            <div className="relative shrink-0">
              <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white shadow-xs bg-slate-100">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white shadow-xs z-10" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="text-xs sm:text-[13px] font-poppins font-bold text-slate-900 leading-tight group-hover:text-amber-600 transition-colors">
                  {item.name}
                </h4>
                <CheckCircle2 size={12} className="text-sky-500 shrink-0 fill-sky-50" />
              </div>
              <p className="text-[10px] text-slate-500 font-sans font-medium truncate max-w-[150px]">
                {item.role} • <span className="text-slate-700 font-semibold">{item.company}</span>
              </p>
            </div>
          </div>

          {/* 5 Stars */}
          <div className="flex items-center gap-0.5 text-amber-400 shrink-0">
            {[...Array(item.rating)].map((_, i) => (
              <Star key={i} size={11} fill="currentColor" />
            ))}
          </div>
        </div>

        {/* Quote */}
        <p className="text-[11px] sm:text-xs text-slate-600 font-sans leading-relaxed mb-3.5 line-clamp-3">
          "{item.quote}"
        </p>
      </div>

      {/* Bottom Footer Themed Pill & Location */}
      <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 text-[10px] font-sans">
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${item.tagTheme.bg} ${item.tagTheme.text} ${item.tagTheme.border} border font-poppins font-bold shadow-2xs transition-transform group-hover:scale-105`}>
          <Sparkles size={11} className={item.tagTheme.icon} />
          {item.tag}
        </span>
        <span className="text-slate-400 font-sans text-[9px] font-medium">{item.location}</span>
      </div>
    </div>
  );
}

export default function Testimonials() {
  // Duplicated arrays for seamless vertical infinite loop
  const listCol1 = [...testimonialsCol1, ...testimonialsCol1];
  const listCol2 = [...testimonialsCol2, ...testimonialsCol2];

  return (
    <section
      id="testimonials"
      className="relative z-20 bg-[#fbfcfb] py-20 lg:py-28 overflow-hidden font-sans text-slate-900 select-none [contain:paint] rounded-t-[36px] sm:rounded-t-[54px] shadow-[0_-25px_60px_rgba(0,0,0,0.12)] border-t border-slate-300/70"
    >
      {/* ── GPU-Accelerated Anti-Jitter CSS Marquee ── */}
      <style>{`
        @keyframes marqueeVerticalUp {
          0% { transform: translate3d(0, 0%, 0); }
          100% { transform: translate3d(0, -50%, 0); }
        }
        @keyframes marqueeVerticalDown {
          0% { transform: translate3d(0, -50%, 0); }
          100% { transform: translate3d(0, 0%, 0); }
        }
        .anim-marquee-up {
          animation: marqueeVerticalUp 36s linear infinite;
          will-change: transform;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .anim-marquee-down {
          animation: marqueeVerticalDown 38s linear infinite;
          will-change: transform;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .anim-marquee-up:hover,
        .anim-marquee-down:hover {
          animation-play-state: paused !important;
        }
      `}</style>

      {/* ── Precision Dotted Grid Background Pattern ── */}
      <div className="absolute inset-0 bg-[radial-gradient(#99a1af_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-40 pointer-events-none [mask-image:radial-gradient(ellipse_75%_75%_at_50%_50%,#000_60%,transparent_100%)]" />

      {/* ── Background Ambient Radiant Warm Glows Matching Website Theme ── */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[520px] bg-gradient-to-tr from-amber-300/20 via-yellow-200/15 to-lime-200/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[650px] h-[520px] bg-gradient-to-br from-orange-300/15 via-pink-200/12 to-amber-300/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-[1420px] px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ══════════════════════════════════════════════════════════════
            2-COLUMN SPLIT SHOWCASE (Left: Text & CTAs / Right: 3D Floating Grid)
           ══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* ────────────────── LEFT COLUMN: HEADLINE, CTA & NAME/NOTE ────────────────── */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">

            {/* Top Pill Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mb-5 sm:mb-6"
            >
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#ffaa00]/15 via-[#ffea00]/15 to-[#ccff00]/15 border border-[#ffaa00]/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-900 uppercase tracking-widest font-poppins shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#ffaa00]" />
                <span>CLIENT STORIES & FEEDBACK</span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight text-slate-900 leading-[1.12] mb-5 font-poppins"
            >
              Loved by{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffaa00] via-amber-500 to-[#ffea00] font-black font-poppins">
                Founders
              </span>{' '}
              & Global Teams.
            </motion.h2>

            {/* Description Sub-text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-[500px] font-normal font-sans"
            >
              From fast-growing SaaS startups to global brands, discover how I turn complex product visions into high-converting, lightning-fast digital reality.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-1 font-poppins"
            >
              {/* Vibrant Main Theme Golden Amber Action Button */}
              <a
                href="#contact"
                className="relative group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#ffaa00] via-[#ffb703] to-[#ffea00] text-slate-950 font-bold text-base shadow-[0_10px_28px_rgba(255,170,0,0.35)] hover:shadow-[0_14px_36px_rgba(255,170,0,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 font-poppins cursor-pointer overflow-hidden"
              >
                {/* Subtle Hover Shimmer Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />
                <span className="relative z-10 font-poppins font-bold">Start Your Project</span>
                <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>

            {/* ── Bold Colorful Name & Animated Tagline ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 flex flex-col gap-2 text-left font-sans"
            >
              <div className="flex items-center gap-3 flex-wrap">
                <h4 className="text-2xl sm:text-3xl font-black tracking-tight bg-gradient-to-r from-[#ffaa00] via-amber-500 to-orange-500 bg-clip-text text-transparent font-poppins">
                  Usama Faheem
                </h4>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-[11px] font-poppins font-bold text-emerald-700 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Available for hire
                </span>
              </div>
              <p className="text-xs sm:text-[13px] font-medium text-slate-600 tracking-tight font-sans max-w-[420px]">
                Available for high-impact freelance projects & full-stack web applications.
              </p>
            </motion.div>

          </div>

          {/* ────────────────── RIGHT COLUMN: ANGLED 3D FLOATING CARDS GRID ────────────────── */}
          <div className="lg:col-span-7 relative">

            {/* ── Circular & Vignette Blur Effect Overlay (As Requested in Audio) ── */}
            <div className="relative h-[580px] sm:h-[640px] lg:h-[680px] w-full overflow-hidden rounded-3xl p-2 [contain:paint]">

              {/* 1. Top & Bottom Smooth Gradient Fade Curtains */}
              <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#fbfcfb] via-[#fbfcfb]/80 to-transparent z-20 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#fbfcfb] via-[#fbfcfb]/80 to-transparent z-20 pointer-events-none" />

              {/* 2. Soft Edge Blur Vignette Mask Layer */}
              <div className="absolute inset-0 bg-radial from-transparent via-transparent to-[#fbfcfb]/80 pointer-events-none z-20" />

              {/* 3. Angled Clean GPU-Accelerated Canvas with 2 Staggered Columns */}
              <div
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full transform sm:rotate-[-3deg] sm:scale-[0.98] origin-center [transform-style:preserve-3d] [backface-visibility:hidden]"
              >
                {/* ── Column 1: Smooth Upward Marquee Loop ── */}
                <div className="flex flex-col gap-4 overflow-hidden [contain:paint]">
                  <div className="flex flex-col gap-4 anim-marquee-up cursor-pointer">
                    {listCol1.map((item, idx) => (
                      <TestimonialCard key={`col1-${item.id}-${idx}`} item={item} />
                    ))}
                  </div>
                </div>

                {/* ── Column 2: Smooth Downward Marquee Loop ── */}
                <div className="hidden sm:flex flex-col gap-4 overflow-hidden [contain:paint]">
                  <div className="flex flex-col gap-4 anim-marquee-down cursor-pointer">
                    {listCol2.map((item, idx) => (
                      <TestimonialCard key={`col2-${item.id}-${idx}`} item={item} />
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
