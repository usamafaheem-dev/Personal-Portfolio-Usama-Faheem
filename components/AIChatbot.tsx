'use client';

import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  X,
  RotateCcw,
  Sparkles,
  User,
  ArrowUpRight,
  Copy,
  Check,
  Compass,
  Radio,
} from 'lucide-react';
import { ensureAllSectionsMounted } from '@/components/LazySection';

export interface ChatAction {
  type: 'NAVIGATE' | 'CERTIFICATE' | 'PROJECT' | 'CLOSE';
  target: string;
  label: string;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  action?: ChatAction;
}

// ── Cinematic Camera Drone Scroll (Silky-Smooth, Majestic, Never Blitzes) ──
function smoothScrollTo(targetY: number, customDuration?: number): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve();

    const startY = window.pageYOffset || document.documentElement.scrollTop;
    const distance = Math.abs(targetY - startY);

    if (distance < 12) {
      window.scrollTo(0, targetY);
      return resolve();
    }

    // Majestic, luxurious drone glide timing:
    // Short distance (< 1500px): ~1400ms
    // Medium distance (1500px - 4500px): ~2000ms
    // Long distance (4500px - 8500px): ~2500ms
    // Ultra long distance (> 8500px, e.g. Hero down to Contact): ~2900ms - 3200ms
    let calculatedDuration = 1400;
    if (distance > 8500) {
      calculatedDuration = 3000;
    } else if (distance > 4500) {
      calculatedDuration = 2500;
    } else if (distance > 2000) {
      calculatedDuration = 2000;
    } else if (distance > 800) {
      calculatedDuration = 1600;
    }

    const duration = customDuration ?? calculatedDuration;
    const startTime = performance.now();

    function step(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // easeInOutQuart: Very gentle slow start, steady cinematic cruise, plush cushioned deceleration
      const ease = progress < 0.5
        ? 8 * progress * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 4) / 2;

      window.scrollTo(0, startY + (targetY - startY) * ease);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        window.scrollTo(0, targetY);
        resolve();
      }
    }

    requestAnimationFrame(step);
  });
}

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
  if (t.includes('freelanc') || t.includes('digiskill')) return 'Freelancing Certificate';
  if (t.includes('cisco') && t.includes('ai')) return 'Cisco AI Certificate';
  if (t.includes('cisco')) return 'Cisco Networking Certificate';
  return target.charAt(0).toUpperCase() + target.slice(1);
}

// ── Screen Action Executor (Smooth scroll & highlight target section or pop modal) ──
// ── Screen Action Executor (Quantum Teleport & Instant Seamless Repositioning) ──
async function executeScreenAction(action: ChatAction) {
  if (typeof window === 'undefined') return;

  // 1. Immediately ensure all lazy sections are mounted in DOM
  ensureAllSectionsMounted();
  window.dispatchEvent(new Event('app-mount-all-sections'));

  // 2. Ensure chat window stays open
  window.dispatchEvent(new CustomEvent('openGeminiChat', { detail: { forceOpen: true } }));

  const title = getHumanSectionTitle(action.target);

  // Close command (e.g. close certificate modal)
  if (action.type === 'CLOSE' || action.target.toLowerCase() === 'close') {
    window.dispatchEvent(new Event('app-close-certificate'));
    return;
  }

  // Project Specific Navigation
  const isProjectSpecific =
    action.type === 'PROJECT' ||
    action.target.includes('shadab') ||
    action.target.includes('rice') ||
    action.target.includes('softcr8or') ||
    action.target.includes('removal') ||
    action.target.includes('reeba') ||
    action.target.includes('clean') ||
    action.target.includes('tekrivo') ||
    action.target.includes('work') ||
    action.target.includes('construction') ||
    action.target.includes('tyre') ||
    action.target.includes('tehreem');

  if (isProjectSpecific) {
    const projSection = document.getElementById('projects');
    if (projSection) {
      const rect = projSection.getBoundingClientRect();
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      const containerTop = rect.top + currentScroll;
      const scrollableHeight = Math.max(0, projSection.offsetHeight - window.innerHeight);

      // Targeted Card Position Map (Matches Projects.tsx):
      const CARD_POSITIONS = [0, 1, 2, 3.18, 4.18, 5.18, 6.18, 7.18, 8.18];
      const maxPos = 8.18;
      const START_PHASE = 0.055;
      const END_BUFFER = 0.93;

      let cardIdx = 0;
      const t = action.target.toLowerCase();
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

      // ── IF USER IS ALREADY ON THIS PROJECT CARD: DO NOT RUN LOADER ──
      const isAlreadyOnCard = Math.abs(currentScroll - targetScroll) < 180;
      if (isAlreadyOnCard) {
        window.dispatchEvent(
          new CustomEvent('app-navigate-project', {
            detail: { target: action.target },
          })
        );
        projSection.classList.add('ai-highlight-section');
        setTimeout(() => projSection.classList.remove('ai-highlight-section'), 2500);
        return;
      }

      // Not on card: Show Pure Blue Soundwave Loader and Teleport!
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
          detail: { target: action.target },
        })
      );

      await new Promise((r) => setTimeout(r, 1500));
      window.dispatchEvent(
        new CustomEvent('app-ai-teleport', {
          detail: { visible: false, title },
        })
      );
      return;
    }
  }

  if (action.type === 'NAVIGATE') {
    let targetId = action.target.toLowerCase().trim();

    // Top / Hero / Navbar handler
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

      // ── IF ALREADY AT TOP / HERO: DO NOT RUN LOADER ──
      if (currentScroll < 250) {
        if (heroEl) {
          heroEl.classList.add('ai-highlight-section');
          setTimeout(() => heroEl.classList.remove('ai-highlight-section'), 2500);
        }
        if (currentScroll > 0) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }

      // Not at top: Show Pure Blue Soundwave Loader and Teleport!
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
      window.dispatchEvent(
        new CustomEvent('app-ai-teleport', {
          detail: { visible: false, title },
        })
      );
      return;
    }

    // Aliases
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

      // ── IF ALREADY ON THIS SECTION: DO NOT RUN LOADER ──
      const isAlreadyOnSection = distance < 220 || (rect.top <= 200 && rect.bottom >= window.innerHeight * 0.4);
      if (isAlreadyOnSection) {
        el.classList.add('ai-highlight-section');
        setTimeout(() => el.classList.remove('ai-highlight-section'), 2500);
        if (distance > 25 && distance < 220) {
          window.scrollTo({ top: targetY, behavior: 'smooth' });
        }
        return;
      }

      // Not on section: Show Pure Blue Soundwave Loader and Teleport!
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
      window.dispatchEvent(
        new CustomEvent('app-ai-teleport', {
          detail: { visible: false, title },
        })
      );
      return;
    }

  } else if (action.type === 'CERTIFICATE') {
    const certSection = document.getElementById('certifications');
    if (certSection) {
      const yOffset = -40;
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      const targetY = Math.max(0, certSection.getBoundingClientRect().top + currentScroll + yOffset);
      const distance = Math.abs(targetY - currentScroll);
      const rect = certSection.getBoundingClientRect();
      const isAlreadyAtSection = distance < 220 || (rect.top <= 200 && rect.bottom >= window.innerHeight * 0.4);

      // ── IF ALREADY AT CERTIFICATIONS: OPEN DIRECTLY WITHOUT RUNNING LOADER ──
      if (isAlreadyAtSection) {
        window.dispatchEvent(
          new CustomEvent('app-open-certificate', {
            detail: { id: action.target, query: action.target },
          })
        );
        certSection.classList.add('ai-highlight-section');
        setTimeout(() => certSection.classList.remove('ai-highlight-section'), 2500);
        return;
      }

      // Not at cert section: Show Pure Blue Soundwave Loader and Teleport!
      window.dispatchEvent(
        new CustomEvent('app-ai-teleport', {
          detail: { visible: true, title },
        })
      );
      await new Promise((r) => setTimeout(r, 220));

      window.scrollTo(0, targetY);
      certSection.classList.add('ai-highlight-section');
      setTimeout(() => certSection.classList.remove('ai-highlight-section'), 3500);

      // Open verified certificate modal
      window.dispatchEvent(
        new CustomEvent('app-open-certificate', {
          detail: { id: action.target, query: action.target },
        })
      );

      await new Promise((r) => setTimeout(r, 1500));
      window.dispatchEvent(
        new CustomEvent('app-ai-teleport', {
          detail: { visible: false, title },
        })
      );
      return;
    }
  }
}

// ── Parse action tags [[ACTION:TYPE:TARGET]] from AI response text ──
function parseActionFromText(rawText: string): { cleanText: string; action?: ChatAction } {
  const match = rawText.match(/\[\[ACTION:(NAVIGATE|CERTIFICATE|PROJECT|CLOSE|OPEN):([a-zA-Z0-9_-]+)\]\]/i);
  if (!match) {
    return { cleanText: rawText.trim() };
  }

  const rawType = match[1].toUpperCase();
  const type = (rawType === 'OPEN' ? 'NAVIGATE' : rawType) as 'NAVIGATE' | 'CERTIFICATE' | 'PROJECT' | 'CLOSE';
  const target = match[2].trim();
  const cleanText = rawText.replace(match[0], '').trim();

  let label = '';
  if (type === 'NAVIGATE' || type === 'PROJECT') {
    const t = target.toLowerCase();
    if (t.includes('shadab') || t.includes('rice')) label = '🍚 Navigated to Shadab Rice Project';
    else if (t.includes('softcr8or')) label = '⚡ Navigated to SoftCr8ors Project';
    else if (t.includes('removal') || t.includes('gm')) label = '🚚 Navigated to GM MZ Removals';
    else if (t.includes('reeba')) label = '💼 Navigated to Reeba Yaseen Project';
    else if (t.includes('clean')) label = '✨ Navigated to MZ Cleaner';
    else if (t.includes('work') || t.includes('construction')) label = '🏗️ Navigated to MZ Works Construction';
    else if (t.includes('hero') || t.includes('top') || t.includes('home') || t.includes('nav') || t.includes('header') || t.includes('wapis') || t.includes('back')) {
      label = '🚀 Navigated to Hero Section';
    } else if (t.includes('project') || t.includes('portfolio')) {
      label = '📁 Navigated to Projects';
    } else if (t.includes('cert')) {
      label = '📜 Navigated to Certifications';
    } else if (t.includes('skill') || t.includes('stack') || t.includes('tech')) {
      label = '🛠️ Navigated to Tech Stack';
    } else if (t.includes('diff')) {
      label = '💡 Navigated to What I Do Differently';
    } else if (t.includes('process') || t.includes('workflow')) {
      label = '🔄 Navigated to Process';
    } else if (t.includes('contact') || t.includes('hire') || t.includes('whatsapp') || t.includes('reach')) {
      label = '📬 Navigated to Contact Usama';
    } else if (t.includes('exp') || t.includes('job') || t.includes('career')) {
      label = '💼 Navigated to Experience';
    } else if (t.includes('service')) {
      label = '⚡ Navigated to Services';
    } else if (t.includes('social') || t.includes('find') || t.includes('online')) {
      label = '🌐 Navigated to Social Channels';
    } else if (t.includes('faq') || t.includes('question')) {
      label = '❓ Navigated to FAQ';
    } else if (t.includes('footer') || t.includes('bottom')) {
      label = '⚓ Navigated to Footer';
    } else if (t.includes('about') || t.includes('bio')) {
      label = '👤 Navigated to About Usama';
    } else {
      label = `📍 Navigated to ${target}`;
    }
  } else if (type === 'CERTIFICATE') {
    const t = target.toLowerCase();
    if (t.includes('mern')) label = '📜 Opened MERN Stack Certificate Modal';
    else if (t.includes('devfest') || t.includes('google')) label = '📜 Opened Google DevFest Certificate';
    else if (t.includes('freelanc') || t.includes('digiskill')) label = '📜 Opened Freelancing Certificate';
    else if (t.includes('cisco') && t.includes('ai')) label = '📜 Opened Cisco AI Certificate';
    else if (t.includes('cisco') || t.includes('network')) label = '📜 Opened Cisco Networking Certificate';
    else label = '📜 Opened Certificate Preview';
  } else if (type === 'CLOSE') {
    label = '✕ Closed Preview Modal';
  }

  return {
    cleanText,
    action: {
      type,
      target,
      label,
    },
  };
}

const CHAT_STORAGE_KEY = 'usama_portfolio_chat_v2';

const INITIAL_WELCOME: ChatMessage = {
  id: 'welcome-msg',
  role: 'assistant',
  content:
    "Assalam-o-Alaikum! 👋\nI am Usama AI Assistant.\n\nAsk me anything about Usama's projects, tech stack, 3D animations, experience, or how we can collaborate! 🚀",
  timestamp: 'Just now',
};

const QUICK_PROMPTS = [
  { label: '🚀 Top Projects', prompt: 'Usama ke top projects dikhao' },
  { label: '📜 MERN Certificate', prompt: 'Usama ki MERN stack certification dikhao' },
  { label: '🛠️ Tech Stack', prompt: 'Usama ka tech stack kya hai?' },
  { label: '📞 Contact Usama', prompt: 'How can I contact Usama directly?' },
];

// ── Isolated Clean Text ChatInput Component ──
const ChatInput = memo(function ChatInput({
  value,
  onChange,
  onSend,
  disabled,
}: {
  value: string;
  onChange: (val: string) => void;
  onSend: (text: string) => void;
  disabled: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim() || disabled) return;
    onSend(value.trim());
    onChange('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
    >
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Ask anything about Usama..."
        disabled={disabled}
        autoComplete="off"
        spellCheck={false}
        className="flex-1 bg-slate-100 hover:bg-slate-50 focus:bg-white text-slate-900 font-medium text-[13px] px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none placeholder:text-slate-400 select-text transition-colors"
      />

      {/* Send Message Button */}
      <button
        type="submit"
        disabled={!value.trim() || disabled}
        aria-label="Send message"
        className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0052ff] to-[#2563eb] hover:from-[#0045d8] hover:to-[#1d4ed8] disabled:opacity-40 disabled:from-blue-400 disabled:to-blue-500 text-white flex items-center justify-center transition-all active:scale-95 shadow-md shadow-blue-500/25 shrink-0 cursor-pointer"
      >
        <Send className="w-4 h-4" />
      </button>
    </form>
  );
});

export default function AIChatbot() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_WELCOME]);
  const [inputText, setInputText] = useState('');
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [teleportOverlay, setTeleportOverlay] = useState<{
    visible: boolean;
    title: string;
  } | null>(null);

  useEffect(() => {
    const handleTeleport = (e: Event) => {
      const custom = e as CustomEvent<{ visible: boolean; title: string }>;
      if (custom.detail) {
        setTeleportOverlay(custom.detail);
        if (custom.detail.visible) {
          setIsChatOpen(true);
        }
      }
    };

    window.addEventListener('app-ai-teleport', handleTeleport);
    return () => {
      window.removeEventListener('app-ai-teleport', handleTeleport);
    };
  }, []);

  const handleCopyMessage = (text: string, id: string) => {
    try {
      navigator.clipboard.writeText(text);
      setCopiedMessageId(id);
      setTimeout(() => setCopiedMessageId(null), 2000);
    } catch {}
  };

  // Sync state with ElevenLabs dialog opening/closing
  useEffect(() => {
    const handleVoiceOpen = () => setIsVoiceOpen(true);
    const handleVoiceClose = () => setIsVoiceOpen(false);

    const handleToggleGemini = (e?: any) => {
      if (e?.detail?.forceOpen) {
        setIsChatOpen(true);
      } else if (e?.detail?.forceClose) {
        setIsChatOpen(false);
      } else {
        setIsChatOpen((prev) => !prev);
      }
      setIsMenuOpen(false);
    };

    window.addEventListener('elevenlabs-voice-open', handleVoiceOpen);
    window.addEventListener('elevenlabs-voice-close', handleVoiceClose);
    window.addEventListener('openGeminiChat', handleToggleGemini);

    return () => {
      window.removeEventListener('elevenlabs-voice-open', handleVoiceOpen);
      window.removeEventListener('elevenlabs-voice-close', handleVoiceClose);
      window.removeEventListener('openGeminiChat', handleToggleGemini);
    };
  }, []);

  // Dispatch global events when chat window opens or closes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isChatOpen) {
        window.dispatchEvent(new Event('gemini-chat-open'));
      } else {
        window.dispatchEvent(new Event('gemini-chat-close'));
      }
    }
  }, [isChatOpen]);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const menuContainerRef = useRef<HTMLDivElement>(null);

  // ── 1. Restore Chat History from localStorage across Page Refreshes ──
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CHAT_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }
    } catch (err) {
      console.error('Failed to load chat history from localStorage:', err);
    }
  }, []);

  // ── 2. Persist Chat History to localStorage whenever messages update ──
  useEffect(() => {
    try {
      if (messages.length > 1) {
        localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
      }
    } catch (err) {
      console.error('Failed to save chat history to localStorage:', err);
    }
  }, [messages]);

  // ── 3. Smart Scroll: Align TOP of new answer with question so user never scrolls back up ──
  useEffect(() => {
    if (!isChatOpen) return;

    if (messages.length > 1) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.role === 'assistant') {
        setTimeout(() => {
          if (lastMessageRef.current && messagesContainerRef.current) {
            const container = messagesContainerRef.current;
            const target = lastMessageRef.current;
            const targetOffset = target.offsetTop - 75;
            container.scrollTo({
              top: Math.max(0, targetOffset),
              behavior: 'smooth',
            });
          }
        }, 80);
      } else {
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 40);
      }
    }
  }, [messages, isChatOpen]);

  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  // Close speed dial when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuContainerRef.current && !menuContainerRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // ── Send Message to AI Assistant API ──
  const handleSendMessage = useCallback(
    async (query: string) => {
      const cleanQuery = query.trim();
      if (!cleanQuery || isLoading) return;

      // Stop any active speech if playing
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }

      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'user',
        content: cleanQuery,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      const newMessages = [...messagesRef.current, userMessage];
      setMessages(newMessages);
      setInputText('');

      // Offline instant answer
      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        setTimeout(() => {
          const offlineReply: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: "You appear to be offline right now! 🌐\n\nLive AI queries need an internet connection, but you can still view my projects and experience on the page, or connect with me once you're back online! 🚀",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
          setMessages((prev) => [...prev, offlineReply]);
          if (typeof window !== 'undefined') {
            window.dispatchEvent(
              new CustomEvent('app-action-blocked-offline', {
                detail: { message: 'Chat is in offline mode.' },
              })
            );
          }
        }, 300);
        return;
      }

      setIsLoading(true);

      try {
        const controller = new AbortController();
        const clientTimeout = setTimeout(() => controller.abort(), 15000); // 15s resilient timeout

        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({
            messages: newMessages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });

        clearTimeout(clientTimeout);

        if (!response.ok) {
          throw new Error(`Server returned ${response.status}`);
        }

        const data = await response.json();
        const rawReply = data.reply || "I didn't receive a response. Please ask again or contact Usama directly!";
        const { cleanText, action } = parseActionFromText(rawReply);

        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: cleanText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          action,
        };

        setMessages((prev) => [...prev, botMessage]);

        // Auto-execute screen navigation or modal preview immediately
        if (action) {
          executeScreenAction(action);
        }
      } catch (err) {
        console.error('Chat error:', err);
        const q = cleanQuery.toLowerCase();
        let fallbackReply = "I am having a brief connection delay. Please feel free to reach out to Usama directly on WhatsApp (+92 314 3416588 / +92 348 7700972)!";

        if (q.includes('phone') || q.includes('contact') || q.includes('number') || q.includes('whatsapp') || q.includes('call') || q.includes('email') || q.includes('hire') || q.includes('rabta')) {
          fallbackReply = "Main aapko Usama ke Contact & WhatsApp section par le kar ja raha hoon.\n\n• **Phone / WhatsApp:** +92 314 3416588 / +92 348 7700972\n• **Email:** developer@usamafaheem.com\n\n[[ACTION:NAVIGATE:contact]]";
        } else if (q.includes('shadab') || q.includes('rice')) {
          fallbackReply = "Main aapko Shadab Rice project card par le kar ja raha hoon (https://shadabrice.pk/).\n\n[[ACTION:NAVIGATE:shadab-rice]]";
        } else if (q.includes('softcr8or')) {
          fallbackReply = "Main aapko SoftCr8ors project card par le kar ja raha hoon (https://softcr8ors.com/).\n\n[[ACTION:NAVIGATE:softcr8ors]]";
        } else if (q.includes('clean') || (q.includes('mz') && q.includes('clean'))) {
          fallbackReply = "Main aapko MZ Cleaners project card par le kar ja raha hoon.\n\n[[ACTION:NAVIGATE:mz-cleaners]]";
        } else if (q.includes('removal') || (q.includes('mz') && (q.includes('van') || q.includes('gm')))) {
          fallbackReply = "Main aapko GM MZ Removals project card par le kar ja raha hoon.\n\n[[ACTION:NAVIGATE:gm-mz-removals]]";
        } else if (q.includes('work') || q.includes('construction')) {
          fallbackReply = "Main aapko MZ Works Construction project card par le kar ja raha hoon.\n\n[[ACTION:NAVIGATE:mz-works]]";
        } else if (q.includes('reeba')) {
          fallbackReply = "Main aapko Reeba Yaseen SaaS showcase par le kar ja raha hoon.\n\n[[ACTION:NAVIGATE:reeba-yaseen]]";
        } else if (q.includes('mern') || q.includes('cert') || q.includes('sanad')) {
          fallbackReply = "Main aapko Usama ke verified Certifications showcase par le kar ja raha hoon.\n\n[[ACTION:NAVIGATE:certifications]]";
        } else if (q.includes('skill') || q.includes('stack') || q.includes('tech')) {
          fallbackReply = "Main aapko Usama ke Tech Stack & Skills section par le kar ja raha hoon.\n\n[[ACTION:NAVIGATE:skills]]";
        } else if (q.includes('wapis') || q.includes('upar') || q.includes('top') || q.includes('hero') || q.includes('navbar')) {
          fallbackReply = "Main aapko website ke main Hero section par le kar ja raha hoon.\n\n[[ACTION:NAVIGATE:hero]]";
        } else if (q.includes('close') || q.includes('band')) {
          fallbackReply = "Main ne modal band kar diya hai.\n\n[[ACTION:CLOSE:modal]]";
        } else if (q.match(/\b(project|projects|preojct|preojcts|porject|projekts|showcase)\b/)) {
          fallbackReply = "Here are Usama's top projects with live links:\n\n• Shadab Rice: https://shadabrice.pk/\n• SoftCr8ors: https://softcr8ors.com/\n• GM MZ Removals: https://gmmzremovals.co.uk/\n• MZ Works Construction: https://mzworks.co.uk/\n• Reeba Yaseen: https://reeba.softcr8ors.com/\n\n[[ACTION:NAVIGATE:projects]]";
        }

        const { cleanText, action } = parseActionFromText(fallbackReply);
        const errorMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: cleanText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          action,
        };
        setMessages((prev) => [...prev, errorMessage]);
        if (action) {
          executeScreenAction(action);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading]
  );





  // ── 4. Reset Button: Clears chat from state and localStorage ──
  const clearChat = () => {
    try {
      localStorage.removeItem(CHAT_STORAGE_KEY);
    } catch (err) {
      console.error('Error clearing localStorage:', err);
    }
    setInputText('');
    setMessages([INITIAL_WELCOME]);
  };

  // ── 5. Formatted Text Renderer with Bold Poppins Category Headers & Clickable Links ──
  const parseInlineContent = (str: string) => {
    // Clean up any broken protocol spacing like [https: //url] or https: //url
    const cleaned = str
      .replace(/\[https?:\s*\/\//gi, (m) => (m.toLowerCase().startsWith('[https') ? '[https://' : '[http://'))
      .replace(/https?:\s*\/\//gi, (m) => (m.toLowerCase().startsWith('https') ? 'https://' : 'http://'));

    // Split on markdown links [label](url)
    const linkParts = cleaned.split(/(\[[^\]]+\]\([^)]+\))/g);

    return linkParts.map((part, pIdx) => {
      const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        const label = linkMatch[1].replace(/\*/g, '').trim();
        let url = linkMatch[2].replace(/[\*.,;:\)\]]+$/, '').trim();
        if (!/^https?:\/\//i.test(url) && !url.startsWith('#') && !url.startsWith('mailto:') && !url.startsWith('tel:')) {
          url = `https://${url}`;
        }
        return (
          <a
            key={pIdx}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 text-[#0052ff] hover:text-blue-700 underline font-semibold break-all"
          >
            {label}
            <ArrowUpRight className="w-3 h-3 inline shrink-0" />
          </a>
        );
      }

      // Check for standalone raw URLs, stripping trailing markdown punctuation like **, *, ), ., ,
      const rawUrlParts = part.split(/(https?:\/\/[^\s<>"']+|www\.[^\s<>"']+)/gi);
      return rawUrlParts.map((uPart, uIdx) => {
        if (/^(https?:\/\/|www\.)/i.test(uPart)) {
          let cleanUrl = uPart.replace(/[\*.,;:\)\]]+$/, '').trim();
          const trailingPunct = uPart.slice(cleanUrl.length);
          if (/^www\./i.test(cleanUrl)) {
            cleanUrl = `https://${cleanUrl}`;
          }
          const displayLabel = cleanUrl.replace(/^https?:\/\/(www\.)?/i, '').replace(/\/$/, '');

          return (
            <span key={`${pIdx}-${uIdx}`}>
              <a
                href={cleanUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-0.5 text-[#0052ff] hover:text-blue-700 underline font-semibold break-all"
              >
                {displayLabel}
                <ArrowUpRight className="w-3 h-3 inline shrink-0" />
              </a>
              {trailingPunct && <span>{trailingPunct.replace(/\*+/g, '')}</span>}
            </span>
          );
        }

        const boldParts = uPart.split(/(\*\*.*?\*\*)/g);
        return boldParts.map((bPart, bIdx) => {
          if (bPart.startsWith('**') && bPart.endsWith('**')) {
            const inner = bPart.slice(2, -2).replace(/\*/g, '').trim();
            return (
              <strong
                key={bIdx}
                className="font-poppins font-extrabold text-[#0f172a] text-[13.5px] tracking-wide"
              >
                {inner}
              </strong>
            );
          }
          return <span key={bIdx}>{bPart.replace(/\*+/g, '')}</span>;
        });
      });
    });
  };

  const renderFormattedText = (text: string) => {
    const sanitized = text
      .replace(/^[ \t]*[-*_]{3,}[ \t]*$/gm, '')
      .replace(/\s*[—–]\s*/g, ', ')
      .replace(/\s*--\s*/g, ', ');

    const lines = sanitized.split('\n');

    return lines.map((rawLine, lIdx) => {
      const line = rawLine.trim();
      if (!line) {
        return <div key={lIdx} className="h-2" />;
      }

      // Check for bullet or numbering prefix
      const bulletPrefixMatch = line.match(/^([•*-]|\d+\.)\s*(.*)$/);
      const isBullet = !!bulletPrefixMatch;
      const cleanLine = isBullet ? bulletPrefixMatch[2].trim() : line;

      // 1. Standalone Section Heading (e.g. "Core Tech Stack:", "Top Projects:", "**Key Skills:**")
      const strippedForHeadingCheck = cleanLine.replace(/\*+/g, '').trim();
      const isStandaloneHeader =
        strippedForHeadingCheck.endsWith(':') &&
        strippedForHeadingCheck.length <= 35 &&
        !strippedForHeadingCheck.includes('. ') &&
        !strippedForHeadingCheck.toLowerCase().startsWith('http');

      if (isStandaloneHeader) {
        return (
          <div key={lIdx} className="mt-3.5 mb-1.5 flex items-center gap-2 first:mt-1">
            <span className="w-1.5 h-3.5 bg-[#0052ff] rounded-full shrink-0" />
            <h4 className="font-poppins font-extrabold text-[#0f172a] text-[13.5px] sm:text-[14px] tracking-tight">
              {strippedForHeadingCheck}
            </h4>
          </div>
        );
      }

      // 2. Bullet or line with category colon (e.g. "Frontend: Next.js 16...", "Backend: Node.js...")
      // IMPORTANT: Do NOT treat URLs or protocol colons (https:) as category labels!
      const colonIdx = cleanLine.indexOf(':');
      if (colonIdx > 0 && colonIdx <= 30) {
        const rawLabel = cleanLine.slice(0, colonIdx + 1);
        const rest = cleanLine.slice(colonIdx + 1).trim();
        const cleanLabel = rawLabel.replace(/\*+/g, '').trim();

        // Check if the colon is part of a URL protocol or markdown link
        const isUrlProtocolOrLink =
          /https?:\s*$/i.test(rawLabel) ||
          cleanLine.startsWith('[') ||
          rawLabel.includes('//') ||
          rawLabel.includes('[');

        if (!isUrlProtocolOrLink && rest) {
          return (
            <div
              key={lIdx}
              className="flex items-start gap-2 my-1.5 text-slate-700 leading-relaxed text-[13px] sm:text-[13.5px]"
            >
              <span className="text-[#0052ff] font-black text-sm leading-none mt-1 shrink-0">
                •
              </span>
              <div className="flex-1">
                <strong className="font-poppins font-extrabold text-[#0f172a] text-[13.5px] inline-block mr-1.5">
                  {cleanLabel}
                </strong>
                <span className="text-slate-700 font-normal">
                  {parseInlineContent(rest)}
                </span>
              </div>
            </div>
          );
        }
      }

      // 3. Normal Bullet Point without colon
      if (isBullet) {
        return (
          <div
            key={lIdx}
            className="flex items-start gap-2 my-1.5 text-slate-700 leading-relaxed text-[13px] sm:text-[13.5px]"
          >
            <span className="text-[#0052ff] font-black text-sm leading-none mt-1 shrink-0">
              •
            </span>
            <div className="flex-1">{parseInlineContent(cleanLine)}</div>
          </div>
        );
      }

      // 4. Regular Paragraph
      return (
        <p
          key={lIdx}
          className="leading-relaxed my-1.5 text-slate-700 text-[13px] sm:text-[13.5px]"
        >
          {parseInlineContent(cleanLine)}
        </p>
      );
    });
  };

  return (
    <>
      {/* ── 2. CHAT MODAL WINDOW (GPU ISOLATED TO ELIMINATE REPAINT LAG) ── */}
      <AnimatePresence>
        {isChatOpen && (
          <>
            {/* Mobile Backdrop Overlay (Hides page distractions, tap outside to close) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsChatOpen(false)}
              className="fixed inset-0 bg-black/45 backdrop-blur-[2px] z-[99995] sm:hidden cursor-pointer"
            />

            <motion.div
              data-lenis-prevent="true"
              initial={{ opacity: 0, y: 35, scale: 0.98 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              style={{ transform: 'translateZ(0)' }}
              className="fixed z-[99999] inset-x-0 bottom-0 w-full sm:inset-x-auto sm:right-auto sm:bottom-6 sm:left-[84px] sm:w-[375px] h-[85vh] max-h-[640px] sm:h-[520px] sm:max-h-[82vh] flex flex-col rounded-t-[28px] sm:rounded-3xl rounded-b-none sm:rounded-b-3xl bg-white border-t sm:border border-slate-200/90 shadow-[0_-12px_40px_rgba(0,0,0,0.22)] sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] overflow-hidden font-sans transform-gpu will-change-transform"
            >
              {/* ── Mobile Top Pull Handle (Xiaomi Style Top Pill) ── */}
              <div 
                className="w-full pt-1.5 pb-0.5 flex justify-center items-center bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] sm:hidden select-none"
              >
                <div className="w-9 h-1 rounded-full bg-white/30" />
              </div>

              {/* ── Header (Compact & Sleek) ── */}
              <div className="relative px-3.5 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white flex items-center justify-between border-b border-slate-800/80 select-none">
                {/* Avatar + Info */}
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="relative w-8 h-8 rounded-full bg-slate-800 border border-white/20 overflow-hidden flex items-center justify-center shrink-0 shadow-sm">
                    <Image
                      src="/usaam_emoji.png"
                      alt="Usama"
                      width={32}
                      height={32}
                      className="w-full h-full object-contain scale-110 translate-y-0.5"
                    />
                    <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-400 border border-slate-900 rounded-full" />
                  </div>
                  <div className="min-w-0 flex flex-col justify-center">
                    <div className="flex items-center gap-1">
                      <h3 className="text-[13.5px] sm:text-sm font-bold tracking-tight text-white font-poppins">
                        Usama
                      </h3>
                      <Sparkles className="w-3 h-3 text-[#d8ff00] shrink-0" />
                    </div>
                    <p className="text-[10px] text-slate-300 flex items-center gap-1 font-mono leading-none mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                      Online
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-0.5 text-slate-300">
                  <button
                    type="button"
                    onClick={clearChat}
                    title="Reset Chat"
                    className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsChatOpen(false)}
                    title="Close"
                    className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* ── Content ── */}
              <div className="relative flex-1 flex flex-col min-h-0 bg-slate-50/40">
                {/* ── Messages Stream with Smooth Auto-Scroll & Native Threading ── */}
                <div
                  ref={messagesContainerRef}
                  data-lenis-prevent="true"
                  className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-4 text-[13px] sm:text-[13.5px] scrollbar-thin scrollbar-thumb-slate-300"
                  style={{
                    touchAction: 'pan-y',
                    WebkitOverflowScrolling: 'touch',
                  }}
                >
                  {messages.map((msg, idx) => {
                    const isLast = idx === messages.length - 1;
                    const isBot = msg.role === 'assistant';

                    return (
                      <div
                        key={msg.id}
                        ref={isLast ? lastMessageRef : null}
                        className={`flex gap-2.5 ${isBot ? 'items-start' : 'items-end justify-end'}`}
                      >
                        {/* Bot Avatar Image (Using Usama's Picture) */}
                        {isBot && (
                          <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden bg-slate-900 border border-white/50 shadow-xs shrink-0 mt-0.5 ring-1 ring-blue-500/30 flex items-center justify-center">
                            <Image
                              src="/usaam_emoji.png"
                              alt="Usama AI"
                              width={32}
                              height={32}
                              className="w-full h-full object-contain scale-110 translate-y-0.5"
                            />
                          </div>
                        )}

                        <div
                          className={`group relative max-w-[84%] sm:max-w-[80%] rounded-2xl px-3.5 py-2.5 shadow-xs select-text ${isBot
                            ? 'bg-white border border-slate-200 text-slate-800 rounded-tl-sm'
                            : 'bg-gradient-to-r from-[#0052ff] to-[#1e40af] text-white rounded-br-sm shadow-md'
                            }`}
                        >
                          {/* Autonomous Action Pill Badge */}
                          {isBot && msg.action && (
                            <div className="mb-2 pb-1.5 border-b border-slate-100 flex items-center justify-between gap-1.5">
                              <button
                                type="button"
                                onClick={() => executeScreenAction(msg.action!)}
                                title="Click to trigger this screen navigation again"
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50/90 hover:bg-blue-100/90 border border-blue-200/80 text-[#0052ff] text-[11px] font-semibold tracking-wide shadow-xs transition-all cursor-pointer group/badge"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-[#0052ff] animate-ping shrink-0" />
                                <span className="truncate">{msg.action.label}</span>
                                <ArrowUpRight className="w-3 h-3 shrink-0 opacity-70 group-hover/badge:opacity-100 group-hover/badge:translate-x-0.5 group-hover/badge:-translate-y-0.5 transition-transform" />
                              </button>
                            </div>
                          )}

                          {!isBot ? (
                            <p className="text-white font-medium text-[13px] sm:text-[13.5px] leading-relaxed break-words whitespace-pre-wrap select-text selection:bg-white/30">
                              {msg.content}
                            </p>
                          ) : (
                            <div className="break-words text-slate-800 select-text selection:bg-blue-100">
                              {renderFormattedText(msg.content)}
                            </div>
                          )}

                          <div className="flex items-center justify-between mt-1 pt-0.5 gap-2 select-none">
                            {isBot && (
                              <button
                                type="button"
                                onClick={() => handleCopyMessage(msg.content, msg.id)}
                                className="flex items-center gap-1 text-[10.5px] text-slate-400 hover:text-blue-600 transition-colors cursor-pointer py-0.5 px-1.5 rounded-md hover:bg-slate-100/80 active:scale-95"
                                title="Copy message"
                              >
                                {copiedMessageId === msg.id ? (
                                  <>
                                    <Check className="w-3 h-3 text-emerald-500" />
                                    <span className="text-emerald-500 font-medium text-[10px]">Copied!</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" />
                                    <span className="text-[10px]">Copy</span>
                                  </>
                                )}
                              </button>
                            )}
                            <span
                              className={`block text-[10px] font-mono ml-auto ${isBot ? 'text-slate-400' : 'text-blue-100/90'
                                }`}
                            >
                              {msg.timestamp}
                            </span>
                          </div>
                        </div>

                        {!isBot && (
                          <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mb-0.5 shadow-xs">
                            <User className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {/* Loading Typing Indicator with Usama Avatar */}
                  {isLoading && (
                    <div className="flex items-center gap-2 text-slate-500 text-xs font-mono">
                      <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden bg-slate-900 border border-white/50 shadow-xs shrink-0 ring-1 ring-blue-500/30 flex items-center justify-center">
                        <Image
                          src="/usaam_emoji.png"
                          alt="Usama AI"
                          width={32}
                          height={32}
                          className="w-full h-full object-contain scale-110 translate-y-0.5"
                        />
                      </div>
                      <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3.5 py-2.5 rounded-2xl rounded-tl-sm shadow-xs">
                        <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" />
                        <span className="text-[11px] text-slate-400 ml-1.5 font-sans">Thinking...</span>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* ── Compact 2x2 Suggested Questions (Only shown before user starts chatting) ── */}
                {messages.length <= 1 && (
                  <div className="px-3 pt-2 pb-2.5 bg-gradient-to-b from-blue-50/40 to-blue-50/80 border-t border-blue-100">
                    <div className="flex items-center gap-1.5 mb-1.5 px-0.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      <span className="text-[11px] font-semibold text-blue-700/90 uppercase tracking-wider font-mono">
                        Suggested questions
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {QUICK_PROMPTS.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(item.prompt)}
                          disabled={isLoading}
                          className="text-left text-[11.5px] px-2.5 py-2 rounded-xl bg-white hover:bg-blue-100/60 text-slate-800 hover:text-blue-900 border border-blue-200/80 hover:border-blue-400/80 transition-all shadow-xs font-medium cursor-pointer flex items-center justify-between group"
                        >
                          <span className="truncate">{item.label}</span>
                          <ArrowUpRight className="w-3 h-3 text-blue-400 group-hover:text-blue-600 shrink-0 transition-colors ml-1" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Pure Text Chat Input ── */}
                <ChatInput
                  value={inputText}
                  onChange={setInputText}
                  onSend={handleSendMessage}
                  disabled={isLoading}
                />

                {/* Micro Footer */}
                <div className="py-1 px-3 bg-slate-100 text-center border-t border-slate-200 flex items-center justify-center gap-1.5">
                  <span className="text-[10px] text-slate-500 font-mono">
                    Usama Faheem • AI Assistant
                  </span>
                </div>
              </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ═══ FULLSCREEN SCI-FI 9TH SOUNDWAVE CAPSULE (PURE ELECTRIC BLUE ONLY) ═══ */}
      <AnimatePresence>
        {teleportOverlay?.visible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            className="fixed inset-0 z-[99990] flex items-center justify-center bg-white/75 backdrop-blur-md pointer-events-none select-none"
          >
            {/* Ambient Pure Blue Caustic Glow */}
            <div className="absolute w-[460px] h-[460px] rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />

            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              className="relative flex items-center justify-center"
            >
              {/* Exact Pill Capsule with Pure Electric Blue Colors */}
              <div className="relative px-7 py-3.5 rounded-full border-[2px] border-slate-700 bg-white/95 shadow-[0_12px_40px_rgba(0,82,255,0.2)] flex items-center justify-center gap-2 backdrop-blur-md">
                {[10, 18, 30, 42, 48, 42, 30, 18, 10].map((h, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      height: [h * 0.35, h, h * 0.35],
                      opacity: [0.85, 1, 0.85],
                    }}
                    transition={{
                      duration: 0.65,
                      repeat: Infinity,
                      delay: i * 0.08,
                      ease: 'easeInOut',
                    }}
                    style={{ height: `${h}px` }}
                    className="w-2.5 rounded-full bg-gradient-to-t from-[#0052ff] via-[#2563eb] to-[#38bdf8] shadow-[0_0_10px_rgba(0,82,255,0.45)]"
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function openGeminiChat() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('openGeminiChat', { detail: { forceOpen: true } }));
  }
}


