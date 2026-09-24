import dynamic from 'next/dynamic';
import Preloader from "@/components/Preloader";
import MainWrapper from "@/components/MainWrapper";
import DeferredMount from "@/components/DeferredMount";
import LazySection from "@/components/LazySection";

// ── Critical above-fold: eager import (user sees these first) ──
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

// ── Below fold: lazy-load (code split, loads when needed) ──
const TechMarquee = dynamic(() => import("@/components/TechMarquee"));
const About = dynamic(() => import("@/components/About"));
const Stats = dynamic(() => import("@/components/Stats"));
const WhatIDoDifferently = dynamic(() => import("@/components/WhatIDoDifferently"));
const Services = dynamic(() => import("@/components/Services"));
const Process = dynamic(() => import("@/components/Process"));
const Experience = dynamic(() => import("@/components/Experience"));
const TechStack = dynamic(() => import("@/components/TechStack"));
const Projects = dynamic(() => import("@/components/Projects"));
const Certifications = dynamic(() => import("@/components/Certifications"));
const FindMeOnline = dynamic(() => import("@/components/FindMeOnline"));
const FAQAndContact = dynamic(() => import("@/components/FAQAndContact"));
const Footer = dynamic(() => import("@/components/Footer"));

// ── Floating UI: fully deferred ──
const AIChatbot = dynamic(() => import("@/components/AIChatbot"));
const WhatsAppButton = dynamic(() => import("@/components/WhatsAppButton"));
const ElevenLabsVoice = dynamic(() => import("@/components/ElevenLabsVoice"));

export default function Home() {
  return (
    <div className="relative w-full min-h-screen bg-porcelain">
      {/* ── Precision Dotted Grid Background Canvas Behind Hero & Entire Website ── */}
      <div className="fixed inset-0 bg-[radial-gradient(#99a1af_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-40 pointer-events-none z-0" />

      <div className="relative z-10">
        <Preloader />
        <MainWrapper>
          <Navbar />
          <main>
            <Hero />
            <TechMarquee />
            <About />
            <LazySection name="stats" minHeight="60vh"><Stats /></LazySection>
            <LazySection name="difference"><WhatIDoDifferently /></LazySection>
            <LazySection name="services"><Services /></LazySection>
            <LazySection name="process"><Process /></LazySection>
            <LazySection name="experience"><Experience /></LazySection>
            <LazySection name="techstack"><TechStack /></LazySection>
            <LazySection name="projects"><Projects /></LazySection>
            <LazySection name="certifications"><Certifications /></LazySection>
            <LazySection name="findme"><FindMeOnline /></LazySection>
            <LazySection name="contact"><FAQAndContact /></LazySection>
            <LazySection name="footer" minHeight="50vh"><Footer /></LazySection>
          </main>
        </MainWrapper>
        <DeferredMount delay={3500}>
          <AIChatbot />
          <WhatsAppButton />
          <ElevenLabsVoice />
        </DeferredMount>
      </div>
    </div>
  );
}
