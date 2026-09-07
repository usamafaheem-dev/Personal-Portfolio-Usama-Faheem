import Preloader from "@/components/Preloader";
import MainWrapper from "@/components/MainWrapper";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TechMarquee from "@/components/TechMarquee";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import WhatIDoDifferently from "@/components/WhatIDoDifferently";
import Experience from "@/components/Experience";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";

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
            <Stats />
            <WhatIDoDifferently />
            <Services />
            <Experience />
            <TechStack />
            <Projects />
            <Certifications />
            <Testimonials />
            <Contact />
          </main>
        </MainWrapper>
      </div>
    </div>
  );
}
