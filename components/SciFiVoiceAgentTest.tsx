'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  X,
  Compass,
  ArrowUpRight,
  Radio,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';
import { ensureAllSectionsMounted } from '@/components/LazySection';

function getHumanSectionTitle(target: string): string {
  const t = target.toLowerCase();
  if (t.includes('shadab') || t.includes('rice')) return 'Shadab Rice Project';
  if (t.includes('softcr8or')) return 'SoftCr8ors Project';
  if (t.includes('removal') || t.includes('gm')) return 'GM MZ Removals';
  if (t.includes('reeba')) return 'Reeba Yaseen Project';
  if (t.includes('clean')) return 'MZ Cleaner Project';
  if (t.includes('work') || t.includes('construction')) return 'MZ Works Construction';
  if (t.includes('hero') || t.includes('top') || t.includes('navbar') || t.includes('header') || t.includes('home')) return 'Hero Section';
  if (t.includes('about') || t.includes('bio')) return 'About Usama';
  if (t.includes('diff')) return 'What I Do Differently';
  if (t.includes('process') || t.includes('workflow')) return 'Development Process';
  if (t.includes('exp') || t.includes('job') || t.includes('vertex')) return 'Work Experience';
  if (t.includes('skill') || t.includes('stack') || t.includes('tech')) return 'Tech Stack & Skills';
  if (t.includes('project') || t.includes('portfolio')) return 'Projects Showcase';
  if (t.includes('cert')) return 'Certifications Showcase';
  if (t.includes('social') || t.includes('online') || t.includes('find')) return 'Social Profiles';
  if (t.includes('faq')) return 'FAQ Section';
  if (t.includes('contact') || t.includes('hire') || t.includes('whatsapp')) return 'Contact Usama';
  if (t.includes('footer') || t.includes('bottom')) return 'Footer';
  if (t.includes('close')) return 'Closed Preview';
  if (t.includes('mern')) return 'MERN Certificate';
  if (t.includes('devfest') || t.includes('google')) return 'Google DevFest Certificate';
  return target.charAt(0).toUpperCase() + target.slice(1);
}
export type VoiceState = 'idle' | 'listening' | 'processing' | 'speaking';

interface SciFiVoiceAgentProps {
  mode?: 'floating' | 'embedded';
  defaultOpen?: boolean;
  agentId?: string;
}

export default function SciFiVoiceAgentTest({
  mode = 'floating',
  defaultOpen = false,
  agentId = 'agent_5701m2zvfkwpf6tbcwxd2gbr3d56',
}: SciFiVoiceAgentProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  const [transcript, setTranscript] = useState<string>('');
  const [aiResponse, setAiResponse] = useState<string>(
    'Assalam-o-Alaikum! Main Usama AI Voice Assistant hoon. Aap aawaz se kisi bhi project ya section par navigate kar sakte hain!'
  );
  const [isMicAvailable, setIsMicAvailable] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [simulatedAction, setSimulatedAction] = useState<string | null>(null);
  const [voiceTeleportOverlay, setVoiceTeleportOverlay] = useState<{
    visible: boolean;
    title: string;
  } | null>(null);

  const recognitionRef = useRef<any>(null);
  const isSpeakingRef = useRef<boolean>(false);

  // ── 1. Voice Synthesis (TTS - Human Speech Output) ──
  const speakText = useCallback(
    (text: string, onEnd?: () => void) => {
      if (typeof window === 'undefined' || isMuted || !('speechSynthesis' in window)) {
        setTimeout(() => {
          setVoiceState('idle');
          if (onEnd) onEnd();
        }, 1200);
        return;
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;

      // Select natural sounding voice if available
      const voices = window.speechSynthesis.getVoices();
      const preferred = voices.find(
        (v) =>
          v.lang.includes('en') &&
          (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha'))
      );
      if (preferred) utterance.voice = preferred;

      setVoiceState('speaking');
      isSpeakingRef.current = true;

      utterance.onend = () => {
        isSpeakingRef.current = false;
        setVoiceState('idle');
        if (onEnd) onEnd();
      };

      utterance.onerror = () => {
        isSpeakingRef.current = false;
        setVoiceState('idle');
        if (onEnd) onEnd();
      };

      window.speechSynthesis.speak(utterance);
    },
    [isMuted]
  );

  // ── 2. Natural Navigation & Action Dispatcher ──
  const handleVoiceIntent = useCallback(
    async (rawText: string) => {
      const q = rawText.toLowerCase().trim();
      setVoiceState('processing');

      // Small processing latency for sci-fi feel
      await new Promise((r) => setTimeout(r, 400));

      let responseMessage = '';
      let targetAction: { type: 'NAVIGATE' | 'PROJECT' | 'CERTIFICATE' | 'CLOSE'; target: string } | null = null;

      if (q.includes('shadab') || q.includes('rice')) {
        responseMessage = 'Navigating to Shadab Rice Mill ERP project.';
        targetAction = { type: 'PROJECT', target: 'shadab-rice' };
      } else if (q.includes('softcr8or') || q.includes('soft')) {
        responseMessage = 'Opening SoftCr8ors digital agency project.';
        targetAction = { type: 'PROJECT', target: 'softcr8ors' };
      } else if (q.includes('removal') || q.includes('gm')) {
        responseMessage = 'Navigating to GM MZ Removals platform.';
        targetAction = { type: 'PROJECT', target: 'gm-removals' };
      } else if (q.includes('reeba') || q.includes('yaseen')) {
        responseMessage = 'Navigating to Reeba Yaseen design portfolio.';
        targetAction = { type: 'PROJECT', target: 'reeba-yaseen' };
      } else if (q.includes('clean') || q.includes('cleaner')) {
        responseMessage = 'Navigating to MZ Cleaner booking platform.';
        targetAction = { type: 'PROJECT', target: 'cleaner' };
      } else if (q.includes('mern') && (q.includes('cert') || q.includes('dikhao') || q.includes('show'))) {
        responseMessage = 'Opening Usama verified MERN stack certification.';
        targetAction = { type: 'CERTIFICATE', target: 'mern' };
      } else if (q.includes('google') || q.includes('devfest')) {
        responseMessage = 'Opening Google DevFest certificate.';
        targetAction = { type: 'CERTIFICATE', target: 'google-devfest' };
      } else if (q.includes('cert') || q.includes('diploma') || q.includes('degree')) {
        responseMessage = 'Navigating to verified Certifications section.';
        targetAction = { type: 'NAVIGATE', target: 'certifications' };
      } else if (q.includes('project') || q.includes('work') || q.includes('portfolio')) {
        responseMessage = 'Taking you to Usama featured Projects Showcase.';
        targetAction = { type: 'NAVIGATE', target: 'projects' };
      } else if (q.includes('skill') || q.includes('stack') || q.includes('tech')) {
        responseMessage = 'Navigating to Usama Core Tech Stack: React, Next.js, Node, and TypeScript.';
        targetAction = { type: 'NAVIGATE', target: 'skills' };
      } else if (q.includes('diff') || q.includes('differently') || q.includes('kyun')) {
        responseMessage = 'Navigating to What Usama Does Differently section.';
        targetAction = { type: 'NAVIGATE', target: 'difference' };
      } else if (q.includes('process') || q.includes('workflow') || q.includes('how you work')) {
        responseMessage = 'Taking you to Usama 4-step Development Workflow.';
        targetAction = { type: 'NAVIGATE', target: 'process' };
      } else if (q.includes('contact') || q.includes('hire') || q.includes('whatsapp') || q.includes('email')) {
        responseMessage = 'Navigating to Contact Usama section.';
        targetAction = { type: 'NAVIGATE', target: 'contact' };
      } else if (q.includes('top') || q.includes('hero') || q.includes('home') || q.includes('wapis')) {
        responseMessage = 'Returning to top Hero section.';
        targetAction = { type: 'NAVIGATE', target: 'hero' };
      } else if (q.includes('close') || q.includes('band')) {
        responseMessage = 'Closing preview modal.';
        targetAction = { type: 'CLOSE', target: 'close' };
      } else if (q.includes('who is usama') || q.includes('usama kon') || q.includes('tell me about')) {
        responseMessage =
          'Usama Faheem is a Full-Stack MERN and Frontend Engineer in Lahore with 3+ years experience building fast SaaS and 3D web apps.';
        targetAction = null;
      } else {
        responseMessage = `Recognized: "${rawText}". Main Usama ke portfolio mein aapko projects, tech stack ya contact par le ja sakta hoon.`;
        targetAction = null;
      }

      setAiResponse(responseMessage);
      setSimulatedAction(targetAction ? `${targetAction.type}: ${targetAction.target}` : null);

      // Execute actual screen action on page if in live page environment
      if (targetAction && typeof window !== 'undefined') {
        ensureAllSectionsMounted();
        window.dispatchEvent(new Event('app-mount-all-sections'));

        const title = getHumanSectionTitle(targetAction.target);

        if (targetAction.type === 'CLOSE') {
          window.dispatchEvent(new Event('app-close-certificate'));
        } else if (targetAction.type === 'PROJECT') {
          const projSection = document.getElementById('projects');
          if (projSection) {
            const rect = projSection.getBoundingClientRect();
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
            const containerTop = rect.top + currentScroll;
            const scrollableHeight = Math.max(0, projSection.offsetHeight - window.innerHeight);

            const CARD_POSITIONS = [0, 1, 2, 3.18, 4.18, 5.18, 6.18, 7.18, 8.18];
            const maxPos = 8.18;
            const START_PHASE = 0.055;
            const END_BUFFER = 0.93;

            let cardIdx = 0;
            const t = targetAction.target.toLowerCase();
            if (t.includes('shadab') || t.includes('rice')) cardIdx = 3;
            else if (t.includes('softcr8or')) cardIdx = 0;
            else if (t.includes('removal') || t.includes('gm')) cardIdx = 1;
            else if (t.includes('reeba')) cardIdx = 2;
            else if (t.includes('clean')) cardIdx = 4;
            else if (t.includes('work') || t.includes('construction')) cardIdx = 5;
            else if (t.includes('tekrivo')) cardIdx = 6;
            else if (t.includes('tyre') || t.includes('car')) cardIdx = 7;
            else if (t.includes('tehreem')) cardIdx = 8;

            const progressForIndex = cardIdx === 0 ? 0 : START_PHASE + (CARD_POSITIONS[cardIdx] / maxPos) * (END_BUFFER - START_PHASE);
            const targetScroll = containerTop + progressForIndex * scrollableHeight;

            // Check if already on this card
            const isAlreadyOnCard = Math.abs(currentScroll - targetScroll) < 180;
            if (isAlreadyOnCard) {
              window.dispatchEvent(
                new CustomEvent('app-navigate-project', {
                  detail: { target: targetAction.target },
                })
              );
              projSection.classList.add('ai-highlight-section');
              setTimeout(() => projSection.classList.remove('ai-highlight-section'), 2500);
            } else {
              // Trigger 9th Blue Soundwave Loader!
              setVoiceTeleportOverlay({ visible: true, title });
              window.dispatchEvent(
                new CustomEvent('app-ai-teleport', {
                  detail: { visible: true, title },
                })
              );
              await new Promise((r) => setTimeout(r, 220));

              window.scrollTo(0, targetScroll);
              projSection.classList.add('ai-highlight-section');
              setTimeout(() => projSection.classList.remove('ai-highlight-section'), 3500);

              window.dispatchEvent(
                new CustomEvent('app-navigate-project', {
                  detail: { target: targetAction.target },
                })
              );

              await new Promise((r) => setTimeout(r, 1500));
              setVoiceTeleportOverlay(null);
              window.dispatchEvent(
                new CustomEvent('app-ai-teleport', {
                  detail: { visible: false, title },
                })
              );
            }
          }
        } else if (targetAction.type === 'NAVIGATE') {
          let targetId = targetAction.target.toLowerCase().trim();

          if (
            targetId === 'hero' ||
            targetId === 'top' ||
            targetId === 'navbar' ||
            targetId === 'home' ||
            targetId === 'header' ||
            targetId === 'wapis' ||
            targetId === 'back'
          ) {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
            const heroEl = document.getElementById('hero') || document.getElementById('navbar');

            if (currentScroll < 250) {
              if (heroEl) {
                heroEl.classList.add('ai-highlight-section');
                setTimeout(() => heroEl.classList.remove('ai-highlight-section'), 2500);
              }
              if (currentScroll > 0) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            } else {
              setVoiceTeleportOverlay({ visible: true, title });
              window.dispatchEvent(
                new CustomEvent('app-ai-teleport', {
                  detail: { visible: true, title },
                })
              );
              await new Promise((r) => setTimeout(r, 220));

              window.scrollTo(0, 0);
              if (heroEl) {
                heroEl.classList.add('ai-highlight-section');
                setTimeout(() => heroEl.classList.remove('ai-highlight-section'), 3500);
              }

              await new Promise((r) => setTimeout(r, 1500));
              setVoiceTeleportOverlay(null);
              window.dispatchEvent(
                new CustomEvent('app-ai-teleport', {
                  detail: { visible: false, title },
                })
              );
            }
          } else {
            if (targetId === 'stack' || targetId === 'techstack' || targetId === 'tech') targetId = 'skills';
            if (targetId === 'social' || targetId === 'socials' || targetId === 'findme' || targetId === 'links') targetId = 'find-me-online';
            if (targetId === 'work' || targetId === 'portfolio') targetId = 'projects';
            if (targetId === 'difference' || targetId === 'different' || targetId === 'differently') targetId = 'difference';
            if (targetId === 'workflow' || targetId === 'methodology' || targetId === 'steps') targetId = 'process';
            if (targetId === 'hire' || targetId === 'reach' || targetId === 'email' || targetId === 'whatsapp' || targetId === 'phone') targetId = 'contact';

            const el = document.getElementById(targetId);
            if (el) {
              const yOffset = -75;
              const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
              const targetY = Math.max(0, el.getBoundingClientRect().top + currentScroll + yOffset);
              const distance = Math.abs(targetY - currentScroll);
              const rect = el.getBoundingClientRect();

              const isAlreadyOnSection = distance < 220 || (rect.top <= 200 && rect.bottom >= window.innerHeight * 0.4);
              if (isAlreadyOnSection) {
                el.classList.add('ai-highlight-section');
                setTimeout(() => el.classList.remove('ai-highlight-section'), 2500);
                if (distance > 25 && distance < 220) {
                  window.scrollTo({ top: targetY, behavior: 'smooth' });
                }
              } else {
                setVoiceTeleportOverlay({ visible: true, title });
                window.dispatchEvent(
                  new CustomEvent('app-ai-teleport', {
                    detail: { visible: true, title },
                  })
                );
                await new Promise((r) => setTimeout(r, 220));

                window.scrollTo(0, targetY);
                el.classList.add('ai-highlight-section');
                setTimeout(() => el.classList.remove('ai-highlight-section'), 3500);

                await new Promise((r) => setTimeout(r, 1500));
                setVoiceTeleportOverlay(null);
                window.dispatchEvent(
                  new CustomEvent('app-ai-teleport', {
                    detail: { visible: false, title },
                  })
                );
              }
            }
          }
        } else if (targetAction.type === 'CERTIFICATE') {
          const certSection = document.getElementById('certifications');
          if (certSection) {
            const yOffset = -40;
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
            const targetY = Math.max(0, certSection.getBoundingClientRect().top + currentScroll + yOffset);
            const distance = Math.abs(targetY - currentScroll);
            const rect = certSection.getBoundingClientRect();
            const isAlreadyAtSection = distance < 220 || (rect.top <= 200 && rect.bottom >= window.innerHeight * 0.4);

            if (isAlreadyAtSection) {
              window.dispatchEvent(
                new CustomEvent('app-open-certificate', {
                  detail: { id: targetAction.target, query: targetAction.target },
                })
              );
              certSection.classList.add('ai-highlight-section');
              setTimeout(() => certSection.classList.remove('ai-highlight-section'), 2500);
            } else {
              setVoiceTeleportOverlay({ visible: true, title });
              window.dispatchEvent(
                new CustomEvent('app-ai-teleport', {
                  detail: { visible: true, title },
                })
              );
              await new Promise((r) => setTimeout(r, 220));

              window.scrollTo(0, targetY);
              certSection.classList.add('ai-highlight-section');
              setTimeout(() => certSection.classList.remove('ai-highlight-section'), 3500);

              window.dispatchEvent(
                new CustomEvent('app-open-certificate', {
                  detail: { id: targetAction.target, query: targetAction.target },
                })
              );

              await new Promise((r) => setTimeout(r, 1500));
              setVoiceTeleportOverlay(null);
              window.dispatchEvent(
                new CustomEvent('app-ai-teleport', {
                  detail: { visible: false, title },
                })
              );
            }
          }
        }
      }

      // Speak back the response
      speakText(responseMessage);
    },
    [speakText]
  );

  // ── 3. Initialize Browser Web Speech Recognition ──
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsMicAvailable(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setVoiceState('listening');
        setTranscript('Listening for your voice...');
      };

      recognition.onresult = (event: any) => {
        const current = event.resultIndex;
        const text = event.results[current][0].transcript;
        setTranscript(text);

        if (event.results[current].isFinal) {
          handleVoiceIntent(text);
        }
      };

      recognition.onerror = (event: any) => {
        if (event.error !== 'no-speech') {
          console.warn('[SciFiVoice] Speech Recognition Error:', event.error);
        }
        setVoiceState('idle');
      };

      recognition.onend = () => {
        if (voiceState === 'listening') {
          setVoiceState('idle');
        }
      };

      recognitionRef.current = recognition;
    } catch {
      setIsMicAvailable(false);
    }
  }, [handleVoiceIntent, voiceState]);

  // ── 4. Toggle Microphone Listening ──
  const toggleListening = () => {
    if (voiceState === 'listening') {
      try {
        recognitionRef.current?.stop();
      } catch {}
      setVoiceState('idle');
    } else {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      try {
        recognitionRef.current?.start();
      } catch {
        // If recognition fails (e.g. permission or duplicate call), fallback to prompt test
        setVoiceState('listening');
        setTranscript('Listening for speech...');
      }
    }
  };

  // Soundwave bar heights for 9 bars
  const barHeights = [10, 20, 32, 44, 52, 44, 32, 20, 10];

  return (
    <>
      {/* ── 1. FLOATING SCI-FI TRIGGER BUTTON (Positioned cleanly on bottom right, stacked above ElevenLabs) ── */}
      {mode === 'floating' && !isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="fixed bottom-[86px] right-3.5 sm:right-5 z-[99980] flex items-center"
        >
          {/* Outer Pulsing Electric Blue Aura */}
          <div className="absolute -inset-2 rounded-full bg-blue-500/25 blur-lg animate-pulse pointer-events-none" />

          <button
            onClick={() => setIsOpen(true)}
            className="relative group flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-slate-950/95 hover:bg-slate-900 border border-blue-500/50 hover:border-blue-400 text-white shadow-[0_8px_32px_rgba(0,82,255,0.4)] backdrop-blur-xl transition-all cursor-pointer select-none active:scale-95"
            title="Open Jarvis Voice Agent Test"
          >
            {/* 5-bar Mini Electric Blue Equalizer */}
            <div className="flex items-center gap-0.5 h-4">
              {[8, 14, 18, 14, 8].map((h, i) => (
                <motion.div
                  key={i}
                  animate={{ height: [h * 0.4, h, h * 0.4] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                  className="w-1 rounded-full bg-gradient-to-t from-[#0052ff] to-[#38bdf8]"
                />
              ))}
            </div>

            <div className="flex flex-col text-left">
              <span className="text-[11px] font-mono font-bold tracking-wider text-blue-400 group-hover:text-blue-300 uppercase flex items-center gap-1">
                Jarvis AI
                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  TEST
                </span>
              </span>
              <span className="text-[9.5px] text-slate-400 font-sans">Voice Navigator</span>
            </div>

            <Radio className="w-3.5 h-3.5 text-blue-400 animate-pulse ml-0.5" />
          </button>
        </motion.div>
      )}

      {/* ── 2. SCI-FI VOICE HUD CAPSULE (EXPANDED DIALOG / TEST BENCH) ── */}
      <AnimatePresence>
        {(isOpen || mode === 'embedded') && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            className={
              mode === 'floating'
                ? 'fixed bottom-6 right-4 sm:right-6 z-[99990] w-[92vw] sm:w-[380px] max-w-[420px]'
                : 'w-full max-w-xl mx-auto'
            }
          >
            {/* Outer Cyan / Electric Blue Caustic Glow */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-600/30 via-cyan-500/20 to-blue-600/30 blur-xl pointer-events-none" />

            <div className="relative rounded-3xl bg-slate-950/95 border border-blue-500/40 shadow-[0_20px_60px_rgba(0,82,255,0.35)] backdrop-blur-2xl overflow-hidden text-white flex flex-col">
              {/* Top Header Bar */}
              <div className="px-4 py-3 border-b border-blue-900/50 bg-gradient-to-r from-blue-950/60 to-slate-950/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-xs font-mono font-bold tracking-wide text-white flex items-center gap-1.5">
                      USAMA AI • JARVIS HUD
                      <span className="text-[9px] font-sans px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/40">
                        TEST
                      </span>
                    </h3>
                    <p className="text-[9px] font-mono text-blue-400/80 truncate max-w-[210px]">
                      Agent: {agentId}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                    title={isMuted ? 'Unmute voice' : 'Mute voice'}
                  >
                    {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-blue-300" />}
                  </button>

                  {mode === 'floating' && (
                    <button
                      onClick={() => {
                        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                          window.speechSynthesis.cancel();
                        }
                        setIsOpen(false);
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                      title="Close Sci-Fi Voice Test"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* ── CENTER STAGE: 9TH PURE ELECTRIC BLUE SOUNDWAVE CAPSULE ── */}
              <div className="relative py-7 px-4 flex flex-col items-center justify-center bg-gradient-to-b from-blue-950/20 via-transparent to-blue-950/30">
                {/* Dynamic Aura Glow reacting to voiceState */}
                <div
                  className={`absolute w-44 h-44 rounded-full blur-2xl pointer-events-none transition-all duration-500 ${
                    voiceState === 'listening'
                      ? 'bg-cyan-500/35 scale-125 animate-pulse'
                      : voiceState === 'speaking'
                      ? 'bg-blue-500/40 scale-135'
                      : 'bg-blue-600/15 scale-90'
                  }`}
                />

                {/* Pill Capsule with Electric Blue Soundwaves */}
                <div className="relative px-7 py-4 rounded-full border-[2px] border-slate-700/80 bg-slate-900/90 shadow-[0_12px_40px_rgba(0,82,255,0.3)] flex items-center justify-center gap-2 backdrop-blur-md">
                  {barHeights.map((h, i) => {
                    const isSpeaking = voiceState === 'speaking';
                    const isListening = voiceState === 'listening';
                    const isThinking = voiceState === 'processing';

                    return (
                      <motion.div
                        key={i}
                        animate={{
                          height: isSpeaking
                            ? [h * 0.35, h * 1.15, h * 0.35]
                            : isListening
                            ? [h * 0.5, h * 0.9, h * 0.5]
                            : isThinking
                            ? [h * 0.2, h * 0.7, h * 0.2]
                            : [h * 0.3, h * 0.5, h * 0.3],
                          opacity: isSpeaking || isListening ? 1 : 0.75,
                        }}
                        transition={{
                          duration: isSpeaking ? 0.55 : isListening ? 0.35 : 0.85,
                          repeat: Infinity,
                          delay: i * 0.07,
                          ease: 'easeInOut',
                        }}
                        style={{ height: `${h}px` }}
                        className="w-2.5 rounded-full bg-gradient-to-t from-[#0052ff] via-[#2563eb] to-[#38bdf8] shadow-[0_0_12px_rgba(0,82,255,0.6)]"
                      />
                    );
                  })}
                </div>

                {/* State Status Tag */}
                <div className="mt-4 flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-medium border transition-colors ${
                      voiceState === 'listening'
                        ? 'bg-cyan-500/15 border-cyan-400/40 text-cyan-300'
                        : voiceState === 'speaking'
                        ? 'bg-blue-500/20 border-blue-400/40 text-blue-300'
                        : voiceState === 'processing'
                        ? 'bg-amber-500/15 border-amber-400/40 text-amber-300 animate-pulse'
                        : 'bg-slate-800/60 border-slate-700/60 text-slate-400'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        voiceState === 'listening'
                          ? 'bg-cyan-400 animate-ping'
                          : voiceState === 'speaking'
                          ? 'bg-blue-400'
                          : voiceState === 'processing'
                          ? 'bg-amber-400'
                          : 'bg-slate-500'
                      }`}
                    />
                    {voiceState === 'listening' && 'Listening... Speak now'}
                    {voiceState === 'processing' && 'Processing intent...'}
                    {voiceState === 'speaking' && 'Usama AI Speaking'}
                    {voiceState === 'idle' && 'Ready • Tap Mic to Speak'}
                  </span>
                </div>
              </div>

              {/* ── LIVE TRANSCRIPTION & AI RESPONSE CARD ── */}
              <div className="px-4 py-2.5 bg-slate-900/60 border-y border-slate-800/80 text-xs flex flex-col gap-1.5">
                {transcript && (
                  <div className="flex items-start gap-1.5 text-slate-300 font-sans">
                    <span className="font-mono text-cyan-400 text-[10px] shrink-0 uppercase mt-0.5">You:</span>
                    <span className="italic text-[11.5px] leading-snug">"{transcript}"</span>
                  </div>
                )}
                <div className="flex items-start gap-1.5 text-blue-100 font-sans">
                  <span className="font-mono text-blue-400 text-[10px] shrink-0 uppercase mt-0.5">AI:</span>
                  <span className="text-[12px] leading-snug">{aiResponse}</span>
                </div>
                {simulatedAction && (
                  <div className="flex items-center gap-1.5 pt-1 text-[11px] text-cyan-400 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Triggered: {simulatedAction}</span>
                  </div>
                )}
              </div>

              {/* ── QUICK VOICE COMMAND PRESETS (INSTANT ONE-CLICK TEST) ── */}
              <div className="p-3 bg-slate-950/80">
                <div className="flex items-center justify-between mb-2 px-1">
                  <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                    Quick test voice commands:
                  </span>
                  <span className="text-[10px] text-blue-400 font-mono">Click to test</span>
                </div>

                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { label: '🍚 Shadab Rice Project', cmd: 'Shadab rice project par le jao' },
                    { label: '📜 MERN Certificate', cmd: 'Usama ka MERN stack certificate dikhao' },
                    { label: '📁 Top Projects', cmd: 'Usama ke top projects dikhao' },
                    { label: '🛠️ Tech Stack', cmd: 'Usama ka tech stack kya hai' },
                    { label: '🚀 Hero Section', cmd: 'Go to hero section' },
                    { label: '📞 Contact Usama', cmd: 'Contact Usama directly' },
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setTranscript(item.cmd);
                        handleVoiceIntent(item.cmd);
                      }}
                      disabled={voiceState === 'processing'}
                      className="text-left text-[11px] px-2.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-blue-900/30 border border-slate-800 hover:border-blue-500/50 text-slate-300 hover:text-white transition-all cursor-pointer flex items-center justify-between group active:scale-95"
                    >
                      <span className="truncate">{item.label}</span>
                      <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover:text-blue-400 shrink-0 ml-1" />
                    </button>
                  ))}
                </div>
              </div>

              {/* ── BOTTOM CONTROLS & MIC BUTTON ── */}
              <div className="p-3 bg-gradient-to-t from-slate-950 to-slate-900/90 border-t border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="font-mono text-[10px]">Speech Engine Online</span>
                </div>

                {/* Big Futuristic Sci-Fi Mic Trigger */}
                <button
                  onClick={toggleListening}
                  className={`px-4 py-2 rounded-full flex items-center gap-2 font-mono text-xs font-semibold shadow-lg transition-all cursor-pointer active:scale-95 ${
                    voiceState === 'listening'
                      ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/30 ring-2 ring-rose-400/50 animate-pulse'
                      : 'bg-gradient-to-r from-[#0052ff] via-[#2563eb] to-[#38bdf8] text-white hover:brightness-110 shadow-blue-500/30'
                  }`}
                >
                  {voiceState === 'listening' ? (
                    <>
                      <MicOff className="w-3.5 h-3.5" />
                      <span>Stop Mic</span>
                    </>
                  ) : (
                    <>
                      <Mic className="w-3.5 h-3.5" />
                      <span>Tap to Speak</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 9TH PURE ELECTRIC BLUE SOUNDWAVE CAPSULE TELEPORT OVERLAY (1.5s DURATION) ── */}
      <AnimatePresence>
        {voiceTeleportOverlay?.visible && (
          <motion.div
            key="scifi-voice-teleport-overlay"
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

            {/* Destination label */}
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
    </>
  );
}
