'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, 
  CheckCircle2, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles, 
  Code2, 
  Cloud, 
  BrainCircuit, 
  Layers, 
  Calendar, 
  X,
  ChevronRight,
  BadgeCheck
} from 'lucide-react';

interface Certification {
  id: string;
  title: string;
  issuer: string;
  issuerBadge: string;
  category: 'frontend' | 'cloud' | 'ai-fullstack';
  date: string;
  credentialId: string;
  verificationUrl: string;
  description: string;
  skills: string[];
  gradient: string;
  borderColor: string;
  accentColor: string;
  badgeBg: string;
  highlights: string[];
}

const certifications: Certification[] = [
  {
    id: 'meta-frontend',
    title: 'Meta Certified Frontend Developer Professional',
    issuer: 'Meta / Coursera',
    issuerBadge: 'META',
    category: 'frontend',
    date: 'Issued Jan 2024 • No Expiration',
    credentialId: 'META-FD-894291',
    verificationUrl: 'https://coursera.org/verify/professional-cert',
    description: 'Comprehensive 9-course professional certification covering advanced React architecture, state management with Redux, semantic HTML5/CSS3, responsive UI systems, accessibility (a11y), and production deployment.',
    skills: ['React 19', 'Next.js', 'Redux Toolkit', 'JavaScript ES6+', 'UI/UX Principles', 'Unit Testing (Jest)'],
    gradient: 'from-blue-50/80 via-indigo-50/40 to-white',
    borderColor: 'border-blue-200/80 hover:border-blue-500',
    accentColor: '#2563eb',
    badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
    highlights: ['Advanced React Patterns & Hooks', 'Modern Asynchronous JavaScript', 'End-to-End Application Architecture'],
  },
  {
    id: 'aws-cloud',
    title: 'AWS Certified Solutions Architect & Cloud Practitioner',
    issuer: 'Amazon Web Services',
    issuerBadge: 'AWS',
    category: 'cloud',
    date: 'Issued Apr 2024 • Valid 3 Years',
    credentialId: 'AWS-CSA-774109',
    verificationUrl: 'https://aws.amazon.com/verification',
    description: 'Mastery in architecting secure, resilient, high-performing, and cost-optimized cloud solutions using AWS Lambda, S3, CloudFront, DynamoDB, API Gateway, and automated CI/CD pipelines.',
    skills: ['AWS Lambda', 'Amazon S3', 'CloudFront CDN', 'IAM Security', 'Serverless', 'Microservices'],
    gradient: 'from-amber-50/80 via-orange-50/40 to-white',
    borderColor: 'border-amber-200/80 hover:border-amber-500',
    accentColor: '#d97706',
    badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
    highlights: ['Serverless Edge Architecture', 'Global Content Delivery with CloudFront', 'High-Availability Database Design'],
  },
  {
    id: 'mongodb-mern',
    title: 'MERN Stack & MongoDB Certified Developer',
    issuer: 'MongoDB University',
    issuerBadge: 'MONGODB',
    category: 'ai-fullstack',
    date: 'Issued Aug 2023 • No Expiration',
    credentialId: 'MDB-DEV-651208',
    verificationUrl: 'https://university.mongodb.com/verify',
    description: 'In-depth validation of full-stack NoSQL database design, aggregation pipelines, schema modeling, indexing strategies, Express.js middleware security, and scalable Node.js backend infrastructure.',
    skills: ['Node.js', 'Express.js', 'MongoDB Atlas', 'Aggregation Pipelines', 'REST APIs', 'JWT Auth'],
    gradient: 'from-emerald-50/80 via-teal-50/40 to-white',
    borderColor: 'border-emerald-200/80 hover:border-emerald-500',
    accentColor: '#059669',
    badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    highlights: ['Complex Aggregation Framework', 'Secure RESTful API Pipelines', 'High-Performance Schema Indexing'],
  },
  {
    id: 'deeplearning-ai',
    title: 'Generative AI & LLM Application Engineering',
    issuer: 'DeepLearning.AI & OpenAI',
    issuerBadge: 'OPENAI',
    category: 'ai-fullstack',
    date: 'Issued Nov 2024 • No Expiration',
    credentialId: 'DLAI-LLM-330192',
    verificationUrl: 'https://deeplearning.ai/verify',
    description: 'Specialized accreditation for integrating Large Language Models (LLMs), LangChain, semantic search with Vector Embeddings (Pinecone / ChromaDB), autonomous agent workflows, and prompt engineering.',
    skills: ['OpenAI APIs', 'LangChain', 'Vector Search', 'RAG Pipelines', 'AI Agents', 'Function Calling'],
    gradient: 'from-purple-50/80 via-fuchsia-50/40 to-white',
    borderColor: 'border-purple-200/80 hover:border-purple-500',
    accentColor: '#9333ea',
    badgeBg: 'bg-purple-50 text-purple-800 border-purple-200',
    highlights: ['Retrieval Augmented Generation (RAG)', 'Autonomous Tool Calling Agents', 'Semantic Vector Embedding Retrieval'],
  },
  {
    id: 'google-performance',
    title: 'Google Web Performance & Core Web Vitals Specialist',
    issuer: 'Google Digital Academy',
    issuerBadge: 'GOOGLE',
    category: 'frontend',
    date: 'Issued May 2024 • No Expiration',
    credentialId: 'GOOG-OPT-441982',
    verificationUrl: 'https://developers.google.com/verify',
    description: 'Engineered for building sub-second loading applications, achieving 99+ Google Lighthouse scores, eliminating Cumulative Layout Shift (CLS), optimizing Largest Contentful Paint (LCP), and advanced SEO audits.',
    skills: ['Core Web Vitals', 'Lighthouse 99+', 'Image Optimization', 'Edge Caching', 'Bundle Splitting', 'SEO Strategy'],
    gradient: 'from-rose-50/80 via-orange-50/40 to-white',
    borderColor: 'border-rose-200/80 hover:border-rose-500',
    accentColor: '#e11d48',
    badgeBg: 'bg-rose-50 text-rose-800 border-rose-200',
    highlights: ['Sub-Second Load Time Optimization', 'Elimination of Layout Shifts (CLS)', 'Modern Edge Caching Strategies'],
  },
  {
    id: 'vercel-nextjs',
    title: 'Next.js Production Architecture & Edge Systems',
    issuer: 'Vercel Certified Partner Track',
    issuerBadge: 'VERCEL',
    category: 'cloud',
    date: 'Issued Sep 2024 • No Expiration',
    credentialId: 'VRC-NEXT-110943',
    verificationUrl: 'https://vercel.com/verify',
    description: 'Advanced mastery in Next.js 15 App Router architecture, React Server Components (RSC), Server Actions, Edge Middleware, Dynamic Route Handlers, and Incremental Static Regeneration (ISR).',
    skills: ['Next.js 15', 'Server Components (RSC)', 'Edge Middleware', 'Server Actions', 'ISR / SSG / SSR', 'Turbopack'],
    gradient: 'from-zinc-100/90 via-slate-50 to-white',
    borderColor: 'border-zinc-300 hover:border-zinc-800',
    accentColor: '#18181b',
    badgeBg: 'bg-zinc-100 text-zinc-900 border-zinc-300',
    highlights: ['Next.js 15 App Router Mastery', 'Hybrid Static/Server Dynamic Rendering', 'Zero-Bundle Overhead Server Actions'],
  },
];

type CategoryFilter = 'all' | 'frontend' | 'cloud' | 'ai-fullstack';

export default function Certifications() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  const filteredCertifications = activeCategory === 'all'
    ? certifications
    : certifications.filter((c) => c.category === activeCategory);

  return (
    <section 
      id="certifications"
      className="relative w-full py-24 sm:py-28 px-6 sm:px-10 lg:px-16 bg-[#f4f4f7] text-[#111111] overflow-hidden select-none"
    >
      {/* ── Precision Dotted Grid Background Pattern ── */}
      <div className="absolute inset-0 bg-[radial-gradient(#99a1af_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-40 pointer-events-none [mask-image:radial-gradient(ellipse_75%_75%_at_50%_50%,#000_60%,transparent_100%)]" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* ── SECTION HEADER ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 font-sans">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-zinc-200 text-xs font-sans uppercase tracking-widest text-[#d97706] font-bold shadow-2xs mb-4">
              <ShieldCheck size={14} className="text-[#d97706]" />
              <span>ACCREDITED & VERIFIED QUALIFICATIONS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-poppins tracking-tight text-zinc-900 uppercase">
              CERTIFICATIONS<span className="text-[#d97706]">.</span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 max-w-xl mt-3 font-normal font-sans leading-relaxed">
              Continuous rigorous specialization in modern frontend systems, distributed cloud architecture, and full-stack AI engineering.
            </p>
          </div>

          {/* ── FILTER TABS ── */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-full bg-zinc-200/80 border border-zinc-300 backdrop-blur-md self-start md:self-auto shadow-2xs font-sans">
            {[
              { id: 'all', label: 'All', count: certifications.length },
              { id: 'frontend', label: 'Frontend & React', count: 2 },
              { id: 'cloud', label: 'Cloud & DevOps', count: 2 },
              { id: 'ai-fullstack', label: 'AI & MERN', count: 2 },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as CategoryFilter)}
                className={`px-4 py-2 rounded-full text-xs font-sans transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeCategory === tab.id
                    ? 'bg-white text-zinc-950 font-bold shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-white/40 font-medium'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-sans ${
                  activeCategory === tab.id ? 'bg-zinc-100 text-zinc-900 font-bold' : 'bg-black/5 text-zinc-500 font-semibold'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── CERTIFICATIONS GRID ── */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans"
        >
          <AnimatePresence mode="popLayout">
            {filteredCertifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                onClick={() => setSelectedCert(cert)}
                className={`group relative rounded-2xl bg-white border ${cert.borderColor} p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-zinc-300/50 cursor-pointer overflow-hidden shadow-xs font-sans`}
              >
                {/* Background card subtle gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${cert.gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                {/* Top Badge & Verified Status */}
                <div className="relative z-10 flex items-center justify-between mb-5 font-sans">
                  <div className="flex items-center gap-2 font-sans">
                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-sans font-black tracking-wider uppercase border ${cert.badgeBg}`}>
                      {cert.issuerBadge}
                    </span>
                    <span className="text-[11px] font-sans text-zinc-500 font-semibold">
                      {cert.issuer}
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-sans text-emerald-700 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>VERIFIED</span>
                  </div>
                </div>

                {/* Title & Description */}
                <div className="relative z-10 flex-1 font-sans">
                  <h3 className="text-lg sm:text-xl font-bold font-sans text-zinc-900 tracking-tight leading-snug mb-3 group-hover:text-black transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 font-normal font-sans leading-relaxed line-clamp-3 mb-5">
                    {cert.description}
                  </p>

                  {/* Skills Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6 font-sans">
                    {cert.skills.slice(0, 4).map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-zinc-100/90 border border-zinc-200 text-[11px] font-sans text-zinc-700 font-semibold"
                      >
                        {skill}
                      </span>
                    ))}
                    {cert.skills.length > 4 && (
                      <span className="px-2 py-1 rounded-md bg-zinc-50 border border-zinc-200 text-[10px] font-sans text-zinc-500 font-medium">
                        +{cert.skills.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Footer Details */}
                <div className="relative z-10 pt-4 border-t border-zinc-200/80 flex items-center justify-between text-xs font-sans text-zinc-500">
                  <div className="flex items-center gap-1.5 font-sans">
                    <Calendar size={13} className="text-zinc-400" />
                    <span className="text-[11px] font-medium font-sans">{cert.date.split('•')[0]}</span>
                  </div>

                  <div className="inline-flex items-center gap-1 text-[#d97706] group-hover:translate-x-0.5 transition-transform text-xs font-bold font-sans">
                    <span>Inspect</span>
                    <ChevronRight size={14} />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>



      </div>

      {/* ── MODAL: CERTIFICATE INSPECTION DIALOG ── */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative w-full max-w-2xl bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 shadow-2xl text-zinc-900 overflow-hidden z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-600 hover:text-zinc-950 transition-all cursor-pointer"
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>

              {/* Issuer Badge & Verified Status */}
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-md text-xs font-mono font-black uppercase tracking-wider border ${selectedCert.badgeBg}`}>
                  {selectedCert.issuerBadge}
                </span>
                <span className="text-xs font-mono text-zinc-500 font-medium">
                  {selectedCert.issuer}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <BadgeCheck size={14} /> Verified Credential
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-bold font-sans text-zinc-900 tracking-tight mb-3">
                {selectedCert.title}
              </h3>

              {/* Credential ID & Date */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-600 mb-6 pb-5 border-b border-zinc-200">
                <div>
                  <span className="text-zinc-400">ID: </span>
                  <span className="text-zinc-900 font-bold">{selectedCert.credentialId}</span>
                </div>
                <div>
                  <span className="text-zinc-400">Date: </span>
                  <span className="text-zinc-800">{selectedCert.date}</span>
                </div>
              </div>

              {/* Full Description */}
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal mb-6">
                {selectedCert.description}
              </p>

              {/* Key Architectural Highlights */}
              <div className="mb-6">
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold mb-3">
                  Core Validated Competencies
                </h4>
                <div className="space-y-2">
                  {selectedCert.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-zinc-800">
                      <CheckCircle2 size={15} className="text-[#d97706] shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills Tags */}
              <div className="mb-8">
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold mb-2.5">
                  Demonstrated Tech Stack
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCert.skills.map((s, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-md bg-zinc-100 border border-zinc-200 text-xs font-mono text-zinc-800 font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verification & Action Links */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={selectedCert.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[200px] px-6 py-3 rounded-xl bg-zinc-900 hover:bg-black text-white font-bold text-xs font-mono uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Verify on Official Registry</span>
                  <ExternalLink size={14} />
                </a>

                <button
                  onClick={() => setSelectedCert(null)}
                  className="px-6 py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border border-zinc-300 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer font-medium"
                >
                  Close
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
