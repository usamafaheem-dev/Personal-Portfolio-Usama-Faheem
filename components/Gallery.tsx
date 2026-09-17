'use client';

import AnimatedSection from './AnimatedSection';

const images = [
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600&h=400',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600&h=400',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600&h=400',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600&h=400'
];

export default function Gallery() {
  return (
    <section id="gallery" className="relative bg-white py-24 lg:py-32 border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[200px_1fr] lg:gap-16">
          <AnimatedSection direction="left">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
              Gallery
            </p>
            <div className="mt-3 h-px w-12 bg-gold/30" />
          </AnimatedSection>

          <div>
            <AnimatedSection>
              <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                A glimpse into my <span className="text-gold">workspace</span>
              </h2>
            </AnimatedSection>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {images.map((src, i) => (
                <AnimatedSection key={i} delay={i * 0.1}>
                  <div className="group overflow-hidden rounded-2xl bg-gray-100">
                    <img 
                      src={src} 
                      alt="Workspace" 
                      className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
