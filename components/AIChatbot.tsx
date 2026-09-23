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
} from 'lucide-react';

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
            "Here are Usama's top projects:\n\n• SoftCr8ors: AI & Tech Agency platform with 3D showcases and 60fps motion.\n• GM MZ Removals: UK logistics and booking calculator.\n• Shadab Rice: E-commerce with 1-click WhatsApp checkout.\n• Reeba Yaseen: Full-stack developer portfolio & SaaS.\n\nYou can also contact Usama directly on WhatsApp (+92 314 3416588)! 🚀",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, errorMessage]);
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
        const url = linkMatch[2].trim();
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

      // Check for standalone raw URLs
      const rawUrlParts = part.split(/(https?:\/\/[^\s<>"']+)/gi);
      return rawUrlParts.map((uPart, uIdx) => {
        if (/^https?:\/\//i.test(uPart)) {
          return (
            <a
              key={`${pIdx}-${uIdx}`}
              href={uPart}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 text-[#0052ff] hover:text-blue-700 underline font-semibold break-all"
            >
              {uPart.replace(/^https?:\/\//i, '')}
              <ArrowUpRight className="w-3 h-3 inline shrink-0" />
            </a>
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

    </>
  );
}

export function openGeminiChat() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('openGeminiChat', { detail: { forceOpen: true } }));
  }
}


