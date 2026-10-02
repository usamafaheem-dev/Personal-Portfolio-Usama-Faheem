'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Sparkles,
  Radio,
  Mic,
  Volume2,
  ShieldCheck,
  Cpu,
  Layers,
  CheckCircle2,
  ExternalLink,
  Code2,
  Terminal,
  Activity,
  FolderGit2,
  Wrench,
  Award,
  Send,
  Home,
} from 'lucide-react';
import SciFiVoiceAgentTest from '@/components/SciFiVoiceAgentTest';

function getHumanSectionTitle(target: string): string {
  const t = target.toLowerCase();
  if (t.includes('shadab') || t.includes('rice')) return 'Shadab Rice Mill Project';
  if (t.includes('softcr8or')) return 'SoftCr8ors Agency Project';
  if (t.includes('removal') || t.includes('gm')) return 'GM Removals Project';
  if (t.includes('reeba')) return 'Reeba Yaseen Portfolio';
  if (t.includes('clean')) return 'MZ Cleaner Project';
  if (t.includes('hero') || t.includes('top') || t.includes('home')) return 'Hero Section';
  if (t.includes('skill') || t.includes('tech') || t.includes('stack')) return 'Tech Stack & Skills';
  if (t.includes('cert') || t.includes('mern') || t.includes('google')) return 'Certifications Showcase';
  if (t.includes('diff')) return 'What I Do Differently';
  if (t.includes('contact') || t.includes('hire') || t.includes('email') || t.includes('whatsapp')) return 'Contact Usama';
  if (t.includes('project') || t.includes('portfolio') || t.includes('work')) return 'Projects Showcase';
  return target.charAt(0).toUpperCase() + target.slice(1);
}

interface ToolCallLog {
  id: number;
  time: string;
  tool: string;
  rawArgs: string;
  targetTitle: string;
  targetSection: string;
}

export default function VoiceTestPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [voiceTeleportOverlay, setVoiceTeleportOverlay] = useState<{
    visible: boolean;
    title: string;
  } | null>(null);

  const [toolCallsLog, setToolCallsLog] = useState<ToolCallLog[]>([]);
  const [widgetStatus, setWidgetStatus] = useState<'connecting' | 'ready' | 'active'>('connecting');
  const agentId = 'agent_5701m2zvfkwpf6tbcwxd2gbr3d56';
  const widgetContainerRef = useRef<HTMLDivElement>(null);

  // ── Scroll to Section with Highlight Glow ──
  const scrollToTestSection = useCallback((targetRaw: string) => {
    const t = targetRaw.toLowerCase();
    let targetId = 'projects';
    if (t.includes('hero') || t.includes('top') || t.includes('home')) targetId = 'hero';
    else if (t.includes('skill') || t.includes('tech') || t.includes('stack')) targetId = 'skills';
    else if (t.includes('cert') || t.includes('mern') || t.includes('google')) targetId = 'certifications';
    else if (t.includes('diff')) targetId = 'difference';
    else if (t.includes('contact') || t.includes('hire') || t.includes('email') || t.includes('whatsapp')) targetId = 'contact';
    else if (t.includes('project') || t.includes('shadab') || t.includes('softcr8or') || t.includes('removal') || t.includes('clean')) targetId = 'projects';

    const el = document.getElementById(targetId);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      el.classList.add('ai-highlight-section');
      setTimeout(() => el.classList.remove('ai-highlight-section'), 3500);
    }
  }, []);

  // ── Manual Simulation / Direct Test of Client Tool ──
  const triggerToolSimulation = useCallback(
    async (sectionName: string) => {
      const title = getHumanSectionTitle(sectionName);

      setToolCallsLog((prev) => [
        {
          id: Date.now(),
          time: new Date().toLocaleTimeString(),
          tool: 'navigate_to_section',
          rawArgs: JSON.stringify({ section: sectionName }),
          targetTitle: title,
          targetSection: sectionName,
        },
        ...prev.slice(0, 9),
      ]);

      // 1. Show 9th Pure Blue Soundwave Capsule Loader
      setVoiceTeleportOverlay({ visible: true, title });

      // 2. Teleport behind curtain
      await new Promise((r) => setTimeout(r, 220));
      scrollToTestSection(sectionName);

      // 3. Hold for 1.5 seconds (1500ms)
      await new Promise((r) => setTimeout(r, 1500));
      setVoiceTeleportOverlay(null);
    },
    [scrollToTestSection]
  );

  // ── Load ElevenLabs Official Script & Register Client Tool ──
  useEffect(() => {
    if (typeof document === 'undefined') return;

    if (!document.querySelector('script[src*="convai-widget"]')) {
      const s = document.createElement('script');
      s.src = 'https://elevenlabs.io/convai-widget/index.js';
      s.async = true;
      document.body.appendChild(s);
    }

    // Mount widget stably into container once
    if (widgetContainerRef.current && !widgetContainerRef.current.querySelector('elevenlabs-convai')) {
      const widgetEl = document.createElement('elevenlabs-convai');
      widgetEl.setAttribute('agent-id', agentId);
      widgetContainerRef.current.appendChild(widgetEl);
    }

    const handleClientToolExecution = async (args: any) => {
      console.log('⚡ ElevenLabs Client Tool [navigate_to_section] called:', args);
      const targetStr =
        typeof args === 'string'
          ? args
          : args?.section || args?.section_name || args?.target || args?.id || Object.values(args || {})[0] || 'projects';

      const title = getHumanSectionTitle(String(targetStr));

      // Log to debug monitor
      setToolCallsLog((prev) => [
        {
          id: Date.now(),
          time: new Date().toLocaleTimeString(),
          tool: 'navigate_to_section',
          rawArgs: JSON.stringify(args),
          targetTitle: title,
          targetSection: String(targetStr),
        },
        ...prev.slice(0, 9),
      ]);

      // 1. Show 9th Pure Electric Blue Capsule Loader
      setVoiceTeleportOverlay({ visible: true, title });

      // 2. Scroll to section
      await new Promise((r) => setTimeout(r, 220));
      scrollToTestSection(String(targetStr));

      // 3. Hold for 1.5s
      await new Promise((r) => setTimeout(r, 1500));
      setVoiceTeleportOverlay(null);

      return {
        success: true,
        message: `Successfully navigated user to ${title}`,
      };
    };

    const attachToolListener = () => {
      const widget = document.querySelector('elevenlabs-convai') as any;
      if (!widget) return;

      setWidgetStatus((prev) => (prev === 'connecting' ? 'ready' : prev));

      if (widget.__hasNavigateClientTool) return;
      widget.__hasNavigateClientTool = true;

      const onConvaiCall = (event: any) => {
        console.log('⚡ [elevenlabs-convai:call] event intercepted:', event);
        setWidgetStatus('active');
        if (!event.detail) event.detail = {};
        if (!event.detail.config) event.detail.config = {};

        const baseTools: Record<string, any> = {
          navigate_to_section: handleClientToolExecution,
          navigateToSection: handleClientToolExecution,
          navigate: handleClientToolExecution,
          navigate_section: handleClientToolExecution,
        };

        event.detail.config.clientTools = new Proxy(baseTools, {
          get(target, prop) {
            if (typeof prop === 'string' && prop in target) return target[prop];
            if (typeof prop === 'string' && prop !== 'then' && prop !== 'toJSON') {
              console.log(`⚡ Voice-Test: forwarding unmapped tool "${String(prop)}" to handleClientToolExecution!`);
              return handleClientToolExecution;
            }
            return (target as any)[prop];
          },
        });
      };

      widget.addEventListener('elevenlabs-convai:call', onConvaiCall);

      // Also listen on global window and document in capture phase
      window.addEventListener('elevenlabs-convai:call', onConvaiCall, true);
      document.addEventListener('elevenlabs-convai:call', onConvaiCall, true);
    };

    const timer = setInterval(attachToolListener, 1000);
    attachToolListener();

    return () => clearInterval(timer);
  }, [scrollToTestSection]);

  return (
    <div
      className={`min-h-screen transition-colors duration-500 flex flex-col font-sans relative ${
        isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* ── TOP NAV BAR ── */}
      <header
        className={`px-5 py-4 border-b flex items-center justify-between sticky top-0 z-50 backdrop-blur-md ${
          isDarkMode
            ? 'bg-slate-950/80 border-slate-800'
            : 'bg-white/80 border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className={`inline-flex items-center gap-1.5 text-xs font-mono font-semibold px-3 py-1.5 rounded-xl border transition-all ${
              isDarkMode
                ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 shadow-xs'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Main Portfolio
          </Link>

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
            <h1 className="text-sm font-mono font-bold tracking-wider uppercase">
              ElevenLabs Client Tool Test Studio
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Light/Dark Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`text-xs font-mono font-bold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
              isDarkMode
                ? 'bg-slate-900 border-blue-500/40 text-blue-300 hover:bg-slate-800'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 shadow-xs'
            }`}
          >
            {isDarkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>
        </div>
      </header>

      {/* ── MAIN STUDIO CONTENT ── */}
      <main className="flex-1 p-4 sm:p-8 max-w-5xl mx-auto w-full relative z-10">
        {/* Ambient Glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[350px] rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

        {/* ── 1. AGENT & TOOL STATUS BANNER ── */}
        <div
          className={`p-5 rounded-2xl border mb-8 transition-all relative overflow-hidden ${
            isDarkMode
              ? 'bg-slate-900/80 border-slate-800 shadow-xl'
              : 'bg-white border-slate-200 shadow-md'
          }`}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/25 mb-2">
                <Cpu className="w-3.5 h-3.5" />
                <span>Test Mode Agent Active</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                ElevenLabs <span className="text-blue-500">navigate_to_section</span> Live Test
              </h2>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                Agent ID: <span className="text-blue-400 font-bold">{agentId}</span>
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Client Tool Registered</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Voice command boleing toh ElevenLabs yeh tool trigger karega.</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Tool trigger hone par 1.5s ka Pure Blue Capsule Loader aayega.</span>
            </div>
          </div>
        </div>

        {/* ── JARVIS-LIKE SCI-FI VOICE AGENT (HUD & SOUNDWAVE) ── */}
        <div className="w-full flex justify-center mb-10">
          <SciFiVoiceAgentTest mode="embedded" defaultOpen={false} />
        </div>

        {/* ── 2. QUICK TEST SIMULATION BUTTONS ── */}
        <div
          className={`p-5 rounded-2xl border mb-8 transition-all ${
            isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider">
                Instant Tool Test (Click to trigger tool directly):
              </h3>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">Simulates ElevenLabs call</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {[
              { label: '🚀 Hero', sec: 'hero' },
              { label: '📁 Projects', sec: 'projects' },
              { label: '🍚 Shadab Rice', sec: 'shadab-rice' },
              { label: '🛠️ Tech Stack', sec: 'skills' },
              { label: '📜 Certificates', sec: 'certifications' },
              { label: '📞 Contact', sec: 'contact' },
            ].map((btn, idx) => (
              <button
                key={idx}
                onClick={() => triggerToolSimulation(btn.sec)}
                className="px-3 py-2 rounded-xl text-xs font-mono font-bold text-center border border-slate-700 bg-slate-800/80 hover:bg-blue-600 hover:border-blue-400 hover:text-white text-slate-200 transition-all cursor-pointer active:scale-95 shadow-xs"
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── 3. LIVE DEBUG CONSOLE & TOOL CALL MONITOR ── */}
        <div
          className={`p-5 rounded-2xl border mb-12 transition-all ${
            isDarkMode ? 'bg-slate-950/90 border-slate-800' : 'bg-slate-900 text-white border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-blue-400" />
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                Live Tool Execution Monitor
              </h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
              Auto-listening for events
            </span>
          </div>

          {toolCallsLog.length === 0 ? (
            <div className="py-8 text-center text-xs font-mono text-slate-500">
              Awaiting tool call... Click ElevenLabs voice button (bottom right) ya upar test buttons click karein.
            </div>
          ) : (
            <div className="space-y-2 max-h-56 overflow-y-auto font-mono text-xs pr-1">
              {toolCallsLog.map((log) => (
                <div
                  key={log.id}
                  className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 text-[10px]">[{log.time}]</span>
                    <span className="text-emerald-400 font-bold">{log.tool}</span>
                    <span className="text-slate-400 text-[11px]">{log.rawArgs}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-blue-400 font-semibold text-[11px] shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                    <span>Teleported to: {log.targetTitle} (1.5s loader)</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── 4. TARGET TEST SECTIONS (FOR SCROLL & HIGHLIGHT VERIFICATION) ── */}
        <div className="space-y-8 pb-32">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Test Target Sections (Destination Anchors):
            </h3>
            <span className="text-xs text-blue-400 font-mono">Smooth scroll targets</span>
          </div>

          {/* Target: Hero */}
          <div
            id="hero"
            className="p-8 rounded-3xl border border-slate-800 bg-gradient-to-br from-blue-950/30 via-slate-900/60 to-slate-950 transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <Home className="w-6 h-6 text-blue-400" />
              <h4 className="text-xl font-bold font-mono">Hero Section Destination</h4>
            </div>
            <p className="text-xs text-slate-400">
              ID: <code className="text-blue-400 font-bold">#hero</code> — Top hero banner with Usama Faheem intro and CTA.
            </p>
          </div>

          {/* Target: Projects */}
          <div
            id="projects"
            className="p-8 rounded-3xl border border-slate-800 bg-gradient-to-br from-indigo-950/30 via-slate-900/60 to-slate-950 transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <FolderGit2 className="w-6 h-6 text-indigo-400" />
              <h4 className="text-xl font-bold font-mono">Projects Showcase Destination</h4>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              ID: <code className="text-indigo-400 font-bold">#projects</code> — Featured Production SaaS & Client Work.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300">
                🍚 Shadab Rice Mills ERP
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300">
                ⚡ SoftCr8ors Agency Platform
              </div>
            </div>
          </div>

          {/* Target: Tech Stack */}
          <div
            id="skills"
            className="p-8 rounded-3xl border border-slate-800 bg-gradient-to-br from-cyan-950/30 via-slate-900/60 to-slate-950 transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <Wrench className="w-6 h-6 text-cyan-400" />
              <h4 className="text-xl font-bold font-mono">Tech Stack & Skills Destination</h4>
            </div>
            <p className="text-xs text-slate-400 mb-3">
              ID: <code className="text-cyan-400 font-bold">#skills</code> — React, Next.js, Node.js, Express, MongoDB, Tailwind.
            </p>
          </div>

          {/* Target: Certifications */}
          <div
            id="certifications"
            className="p-8 rounded-3xl border border-slate-800 bg-gradient-to-br from-amber-950/30 via-slate-900/60 to-slate-950 transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-6 h-6 text-amber-400" />
              <h4 className="text-xl font-bold font-mono">Certifications Showcase Destination</h4>
            </div>
            <p className="text-xs text-slate-400 mb-3">
              ID: <code className="text-amber-400 font-bold">#certifications</code> — Verified MERN Stack and Google DevFest Certifications.
            </p>
          </div>

          {/* Target: Difference */}
          <div
            id="difference"
            className="p-8 rounded-3xl border border-slate-800 bg-gradient-to-br from-emerald-950/30 via-slate-900/60 to-slate-950 transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <Layers className="w-6 h-6 text-emerald-400" />
              <h4 className="text-xl font-bold font-mono">What I Do Differently Destination</h4>
            </div>
            <p className="text-xs text-slate-400 mb-3">
              ID: <code className="text-emerald-400 font-bold">#difference</code> — Performance, Architecture, Clean Code.
            </p>
          </div>

          {/* Target: Contact */}
          <div
            id="contact"
            className="p-8 rounded-3xl border border-slate-800 bg-gradient-to-br from-rose-950/30 via-slate-900/60 to-slate-950 transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <Send className="w-6 h-6 text-rose-400" />
              <h4 className="text-xl font-bold font-mono">Contact Usama Destination</h4>
            </div>
            <p className="text-xs text-slate-400 mb-3">
              ID: <code className="text-rose-400 font-bold">#contact</code> — WhatsApp, Direct Email, Consultation Form.
            </p>
          </div>
        </div>
      </main>

      {/* ── NATIVE ELEVENLABS CONVAI WIDGET CUSTOM ELEMENT (Dedicated Test Agent) ── */}
      <div ref={widgetContainerRef} />

      {/* ── 9TH PURE ELECTRIC BLUE SOUNDWAVE CAPSULE TELEPORT OVERLAY (1.5s DURATION) ── */}
      <AnimatePresence>
        {voiceTeleportOverlay?.visible && (
          <motion.div
            key="voice-teleport-loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed inset-0 z-[9999999] flex flex-col items-center justify-center bg-white/80 dark:bg-slate-950/85 backdrop-blur-md pointer-events-none select-none"
          >
            {/* Ambient Blue Radial Glow */}
            <div className="absolute w-[460px] h-[460px] rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />

            {/* Pill Capsule with Dark Border */}
            <motion.div
              initial={{ scale: 0.88, y: 14 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: -8 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative px-7 py-3.5 rounded-full border-[2px] border-slate-700 bg-white/95 dark:bg-slate-900/95 shadow-[0_12px_40px_rgba(0,82,255,0.25)] flex items-center justify-center gap-2 backdrop-blur-md"
            >
              {/* 9 Pure Electric Blue Wave Bars */}
              {[10, 18, 30, 42, 48, 42, 30, 18, 10].map((baseHeight, i) => (
                <motion.span
                  key={i}
                  animate={{
                    height: [baseHeight * 0.45, baseHeight, baseHeight * 0.3, baseHeight * 0.9, baseHeight * 0.45],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.75 + (i % 3) * 0.15,
                    ease: 'easeInOut',
                    delay: (i * 0.07) % 0.4,
                  }}
                  className="w-2.5 rounded-full bg-gradient-to-t from-[#0052ff] via-[#2563eb] to-[#38bdf8] shadow-[0_0_10px_rgba(0,82,255,0.45)]"
                  style={{ height: `${baseHeight}px` }}
                />
              ))}
            </motion.div>

            {/* Teleporting destination label */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-4 px-4 py-1.5 rounded-full bg-slate-900/80 border border-blue-500/30 text-xs font-mono font-semibold text-blue-400 flex items-center gap-2 shadow-lg"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
              <span>Teleporting to {voiceTeleportOverlay.title}...</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
