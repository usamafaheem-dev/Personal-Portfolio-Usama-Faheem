'use client';

import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  X,
  Minus,
  RotateCcw,
  Sparkles,
  User,
  ArrowUpRight,
  Mic,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { FaLinkedinIn, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import ElevenLabsVoice from './ElevenLabsVoice';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
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
  { label: '🚀 Top Projects', prompt: 'What are your top projects?' },
  { label: '🛠️ Tech Stack', prompt: 'What is Usama tech stack?' },
  { label: '💼 Services & Hire', prompt: 'What services do you offer and how can I hire Usama?' },
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
        className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-[#0052ff] disabled:opacity-40 disabled:hover:bg-slate-900 text-white flex items-center justify-center transition-all active:scale-95 shadow-sm shrink-0 cursor-pointer"
      >
        <Send className="w-4 h-4" />
      </button>
    </form>
  );
});

export default function AIChatbot() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_WELCOME]);
  const [inputText, setInputText] = useState('');
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);

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
    if (!isChatOpen || isMinimized) return;

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
  }, [messages, isChatOpen, isMinimized]);

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
        setSpeakingMessageId(null);
      }

      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'user',
        content: cleanQuery,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      const newMessages = [...messagesRef.current, userMessage];
      setMessages(newMessages);
      setIsLoading(true);
      setInputText('');

      try {
        const controller = new AbortController();
        const clientTimeout = setTimeout(() => controller.abort(), 8500);

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
        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.reply || "I didn't receive a response. Please ask again or contact Usama directly!",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages((prev) => [...prev, botMessage]);
      } catch (err) {
        console.error('Chat error:', err);
        const errorMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content:
            "Here are Usama's top projects:\n\n• SoftCr8ors: AI & Tech Agency platform with 3D showcases and 60fps motion.\n• GM MZ Removals: UK logistics and booking calculator.\n• Shadab Rice: E-commerce with 1-click WhatsApp checkout.\n• Reeba Yaseen: Full-stack developer portfolio & SaaS.\n\nYou can also contact Usama directly on WhatsApp (+92 324 9000000)! 🚀",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading]
  );





  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string | null>(null);

  // ── Text-to-Speech (Neural Voice Reading via /api/tts) ──
  const toggleSpeech = useCallback(
    async (msgId: string, content: string) => {
      if (audioPlayerRef.current) {
        try {
          audioPlayerRef.current.pause();
          audioPlayerRef.current.removeAttribute('src');
        } catch {}
        audioPlayerRef.current = null;
      }
      if (audioUrlRef.current) {
        try {
          URL.revokeObjectURL(audioUrlRef.current);
        } catch {}
        audioUrlRef.current = null;
      }

      if (speakingMessageId === msgId) {
        setSpeakingMessageId(null);
        return;
      }

      setSpeakingMessageId(msgId);

      try {
        const cleanText = content
          .replace(/[*_#•]/g, '')
          .replace(/https?:\/\/\S+/g, '')
          .replace(/\[(.*?)\]\(.*?\)/g, '$1')
          .trim();

        const res = await fetch('/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: cleanText,
            voice: 'nPczCjzI2devNBz1zQrb',
          }),
        });

        if (!res.ok) throw new Error('TTS failed');

        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        audioUrlRef.current = url;

        const audio = new Audio(url);
        audioPlayerRef.current = audio;

        audio.onended = () => {
          setSpeakingMessageId(null);
        };
        audio.onerror = () => {
          setSpeakingMessageId(null);
        };

        await audio.play();
      } catch (err) {
        console.error('Neural TTS playback error:', err);
        setSpeakingMessageId(null);
      }
    },
    [speakingMessageId]
  );

  // ── 4. Reset Button: Clears chat from state and localStorage ──
  const clearChat = () => {
    try {
      localStorage.removeItem(CHAT_STORAGE_KEY);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    } catch (err) {
      console.error('Error clearing localStorage:', err);
    }
    setSpeakingMessageId(null);
    setInputText('');
    setMessages([INITIAL_WELCOME]);
  };

  // ── 5. Formatted Text Renderer with Bold Poppins Category Headers ──
  const parseInlineContent = (str: string) => {
    const linkParts = str.split(/(\[.*?\]\(.*?\))/g);

    return linkParts.map((part, pIdx) => {
      const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
      if (linkMatch) {
        return (
          <a
            key={pIdx}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 text-[#0052ff] hover:text-blue-700 underline font-bold"
          >
            {linkMatch[1].replace(/\*/g, '')}
            <ArrowUpRight className="w-3 h-3 inline" />
          </a>
        );
      }

      const boldParts = part.split(/(\*\*.*?\*\*)/g);
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
        !strippedForHeadingCheck.includes('. ');

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
      const colonIdx = cleanLine.indexOf(':');
      if (colonIdx > 0 && colonIdx <= 30) {
        const rawLabel = cleanLine.slice(0, colonIdx + 1);
        const rest = cleanLine.slice(colonIdx + 1).trim();
        const cleanLabel = rawLabel.replace(/\*+/g, '').trim();

        if (rest) {
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

  const speedDialItems = [
    {
      id: 'ai-chat',
      label: "Usama's AI Assistant",
      subtitle: 'Ask questions & explore work',
      icon: (
        <div className="relative w-6 h-6 rounded-full overflow-hidden bg-slate-900 border border-white/40 shadow-xs flex items-center justify-center">
          <Image
            src="/usaam_emoji.png"
            alt="Usama AI"
            width={24}
            height={24}
            className="w-full h-full object-contain scale-110 translate-y-0.5"
          />
        </div>
      ),
      bg: 'bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0052ff]',
      onClick: () => {
        setIsMenuOpen(false);
        setIsChatOpen(true);
        setIsMinimized(false);
      },
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp Chat',
      subtitle: '+92 324 9000000',
      icon: <FaWhatsapp className="w-4 h-4 text-white" />,
      bg: 'bg-gradient-to-r from-emerald-600 to-green-500',
      onClick: () => {
        window.open('https://wa.me/923249000000', '_blank', 'noopener,noreferrer');
        setIsMenuOpen(false);
      },
    },
    {
      id: 'linkedin',
      label: 'LinkedIn Profile',
      subtitle: 'Professional network',
      icon: <FaLinkedinIn className="w-4 h-4 text-white" />,
      bg: 'bg-gradient-to-r from-[#0077b5] to-[#0a84ff]',
      onClick: () => {
        window.open('https://www.linkedin.com/in/usama-faheem/', '_blank', 'noopener,noreferrer');
        setIsMenuOpen(false);
      },
    },
    {
      id: 'instagram',
      label: 'Instagram',
      subtitle: '@usamafaheem',
      icon: <FaInstagram className="w-4 h-4 text-white" />,
      bg: 'bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af]',
      onClick: () => {
        window.open('https://instagram.com/usamafaheem', '_blank', 'noopener,noreferrer');
        setIsMenuOpen(false);
      },
    },
  ];

  return (
    <>
      {/* ── 1. SPEED DIAL LAUNCHER (VERTICAL STACK) ── */}
      <div
        ref={menuContainerRef}
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-auto"
      >
        {/* Speed-Dial Expanded Options (Popping Up Vertically) */}
        <AnimatePresence>
          {isMenuOpen && !isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.2 }}
              className="mb-3 flex flex-col items-end gap-2.5"
            >
              {speedDialItems.map((item, idx) => (
                <motion.button
                  key={item.id}
                  onClick={item.onClick}
                  initial={{ opacity: 0, x: 20, scale: 0.85 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 15, scale: 0.85 }}
                  transition={{ delay: (speedDialItems.length - 1 - idx) * 0.05, type: 'spring', damping: 20, stiffness: 300 }}
                  whileHover={{ scale: 1.04, x: -3 }}
                  whileTap={{ scale: 0.96 }}
                  className="group flex items-center gap-3 p-1.5 pl-3.5 pr-2 rounded-2xl bg-white hover:bg-slate-50 shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-slate-200 cursor-pointer text-left transition-shadow"
                >
                  <div className="flex flex-col items-end">
                    <span className="text-[13px] font-bold text-slate-800 group-hover:text-blue-600 transition-colors font-poppins">
                      {item.label}
                    </span>
                    <span className="text-[10.5px] text-slate-500 font-sans">
                      {item.subtitle}
                    </span>
                  </div>

                  <div
                    className={`w-9 h-9 rounded-xl ${item.bg} flex items-center justify-center shadow-md shrink-0`}
                  >
                    {item.icon}
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Main Floating Trigger Button with 3D Purple Robot Icon (When closed) ── */}
        {!isChatOpen && (
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Open Contact & AI Assistant"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#5b21b6] via-[#7c3aed] to-[#9333ea] text-white shadow-[0_12px_32px_rgba(124,58,237,0.45)] border-2 border-white/30 focus:outline-none focus:ring-4 focus:ring-purple-500/40 cursor-pointer"
          >
            {/* Ambient Pulsing Aura */}
            <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#ec4899] opacity-45 blur-md group-hover:opacity-75 transition-opacity duration-300 animate-pulse pointer-events-none" />

            {/* 3D Purple Robot Icon OR Close 'X' */}
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close-icon"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center justify-center"
                >
                  <X className="w-6 h-6 text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="robot-icon"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="relative w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center"
                >
                  <Image
                    src="/ai_robot_icon.png"
                    alt="Usama AI Assistant"
                    width={48}
                    height={48}
                    className="w-full h-full object-contain drop-shadow-md transition-transform group-hover:scale-110"
                    priority
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Glowing Green Online Indicator Badge */}
            {!isMenuOpen && (
              <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-emerald-400 border-2 border-[#5b21b6] rounded-full shadow-xs">
                <span className="absolute inset-0 rounded-full bg-emerald-300 animate-ping opacity-75" />
              </span>
            )}

            {/* Hover Tooltip (Desktop) */}
            {!isMenuOpen && (
              <span className="hidden sm:block absolute right-full mr-3.5 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-[12px] font-medium tracking-wide whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none shadow-lg border border-slate-700/50">
                ✨ Chat with Usama AI
              </span>
            )}
          </motion.button>
        )}
      </div>

      {/* ── 2. CHAT MODAL WINDOW (GPU ISOLATED TO ELIMINATE REPAINT LAG) ── */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            data-lenis-prevent="true"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{ transform: 'translateZ(0)' }}
            className={`fixed z-50 bottom-4 right-3 sm:bottom-6 sm:right-6 w-[calc(100vw-24px)] sm:w-[410px] ${
              isMinimized ? 'h-auto' : 'h-[580px] max-h-[88vh]'
            } flex flex-col rounded-3xl bg-white border border-slate-200 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden font-sans transform-gpu will-change-transform`}
          >
            {/* ── Header (Uses Usama's Picture) ── */}
            <div className="relative px-4 py-3.5 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white flex items-center justify-between border-b border-slate-800 select-none">
              {/* Avatar + Info */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative w-10 h-10 rounded-full bg-slate-800 border-2 border-white/20 overflow-hidden flex items-center justify-center shrink-0 shadow-md">
                  <Image
                    src="/usaam_emoji.png"
                    alt="Usama AI"
                    width={40}
                    height={40}
                    className="w-full h-full object-contain scale-110 translate-y-0.5"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border border-slate-900 rounded-full" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold tracking-tight truncate font-poppins">
                      Usama AI Assistant
                    </h3>
                    <Sparkles className="w-3.5 h-3.5 text-[#d8ff00] shrink-0" />
                  </div>
                  <p className="text-[11px] text-slate-300 flex items-center gap-1 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                    Online • Ready to assist
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1 text-slate-300">
                <button
                  onClick={() => {
                    setIsChatOpen(false);
                    setIsVoiceOpen(true);
                  }}
                  title="Switch to Live Voice Call"
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-purple-200 hover:text-white transition-colors cursor-pointer text-[11px] font-medium"
                >
                  <Mic className="w-3.5 h-3.5 text-purple-300" />
                  <span className="hidden sm:inline">Voice Call</span>
                </button>
                <button
                  onClick={clearChat}
                  title="Reset Chat"
                  className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  title={isMinimized ? 'Expand' : 'Minimize'}
                  className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsChatOpen(false)}
                  title="Close"
                  className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* ── Content (Only if not minimized) ── */}
            {!isMinimized && (
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
                    const isSpeakingThis = speakingMessageId === msg.id;

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
                          className={`group relative max-w-[84%] sm:max-w-[80%] rounded-2xl px-3.5 py-2.5 shadow-xs ${
                            isBot
                              ? 'bg-white border border-slate-200 text-slate-800 rounded-tl-sm'
                              : 'bg-gradient-to-r from-[#0052ff] to-[#1e40af] text-white rounded-br-sm shadow-md'
                          }`}
                        >
                          {!isBot ? (
                            <p className="text-white font-medium text-[13px] sm:text-[13.5px] leading-relaxed break-words whitespace-pre-wrap selection:bg-white/20">
                              {msg.content}
                            </p>
                          ) : (
                            <div className="break-words text-slate-800">
                              {renderFormattedText(msg.content)}
                            </div>
                          )}

                          <div className="flex items-center justify-between gap-2 mt-1.5 pt-0.5 border-t border-slate-100/50">
                            {/* Text-to-Speech button for Bot answers */}
                            {isBot && (
                              <button
                                onClick={() => toggleSpeech(msg.id, msg.content)}
                                title={isSpeakingThis ? 'Stop speaking' : 'Read aloud'}
                                className={`inline-flex items-center gap-1 text-[10.5px] font-medium transition-colors cursor-pointer ${
                                  isSpeakingThis
                                    ? 'text-blue-600 animate-pulse font-semibold'
                                    : 'text-slate-400 hover:text-blue-600'
                                }`}
                              >
                                {isSpeakingThis ? (
                                  <>
                                    <VolumeX className="w-3 h-3" />
                                    <span>Speaking...</span>
                                  </>
                                ) : (
                                  <>
                                    <Volume2 className="w-3 h-3" />
                                    <span>Listen</span>
                                  </>
                                )}
                              </button>
                            )}

                            <span
                              className={`block text-[10px] font-mono ml-auto ${
                                isBot ? 'text-slate-400' : 'text-blue-100/90'
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
                  <div className="px-3 pt-2 pb-2.5 bg-slate-50 border-t border-slate-200">
                    <div className="flex items-center gap-1.5 mb-1.5 px-0.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider font-mono">
                        Suggested questions
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {QUICK_PROMPTS.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(item.prompt)}
                          disabled={isLoading}
                          className="text-left text-[12px] px-2.5 py-2 rounded-xl bg-white hover:bg-blue-50 text-slate-800 hover:text-blue-700 border border-slate-200 hover:border-blue-300 transition-all shadow-2xs font-medium cursor-pointer flex items-center justify-between group"
                        >
                          <span className="truncate">{item.label}</span>
                          <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-blue-600 shrink-0 transition-colors ml-1" />
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
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 3. ELEVENLABS CONVERSATIONAL AI VOICE WIDGET (LEFT SIDE) ── */}
      <ElevenLabsVoice />
    </>
  );
}
