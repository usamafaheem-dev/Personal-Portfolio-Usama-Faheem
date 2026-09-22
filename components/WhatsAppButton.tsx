'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function openGeminiChat() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('openGeminiChat'));
  }
}

type HoveredButton = 'trigger' | 'linkedin' | 'gemini' | 'whatsapp' | null;

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [hovered, setHovered] = useState<HoveredButton>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. Scroll-based visibility (hidden during Hero section, appears after scrolling past Hero)
  useEffect(() => {
    const checkVisibility = () => {
      const hero = document.getElementById('hero');
      if (!hero) {
        setIsVisible(window.scrollY > 450);
        return;
      }

      const rect = hero.getBoundingClientRect();
      const isPastHero = rect.bottom <= 80;
      setIsVisible(isPastHero);
    };

    checkVisibility();

    const hero = document.getElementById('hero');
    let observer: IntersectionObserver | null = null;

    if (hero) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.boundingClientRect.bottom > 80) {
              setIsVisible(false);
            } else if (entry.boundingClientRect.top < 0) {
              setIsVisible(true);
            }
          });
        },
        { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
      );
      observer.observe(hero);
    }

    window.addEventListener('scroll', checkVisibility, { passive: true });

    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener('scroll', checkVisibility);
    };
  }, []);

  // 2. Click outside to collapse the speed-dial
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  // 3. Listen to live ElevenLabs voice call state and Gemini Chat open/close state
  useEffect(() => {
    const handleVoiceOpen = () => setIsVoiceActive(true);
    const handleVoiceClose = () => setIsVoiceActive(false);
    const handleChatOpen = () => {
      setIsOpen(false);
      setIsChatOpen(true);
    };
    const handleChatClose = () => setIsChatOpen(false);

    window.addEventListener('elevenlabs-voice-open', handleVoiceOpen);
    window.addEventListener('elevenlabs-voice-close', handleVoiceClose);
    window.addEventListener('gemini-chat-open', handleChatOpen);
    window.addEventListener('gemini-chat-close', handleChatClose);

    return () => {
      window.removeEventListener('elevenlabs-voice-open', handleVoiceOpen);
      window.removeEventListener('elevenlabs-voice-close', handleVoiceClose);
      window.removeEventListener('gemini-chat-open', handleChatOpen);
      window.removeEventListener('gemini-chat-close', handleChatClose);
    };
  }, []);

  const whatsappUrl =
    'https://wa.me/923143416588?text=Hi%20Usama,%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20connect!';
  const linkedinUrl = 'https://www.linkedin.com/in/usama-faheem/';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={containerRef}
          aria-label="Quick Connect & AI tools"
          className={`fixed bottom-3.5 left-3.5 sm:bottom-6 sm:left-6 z-[99998] flex flex-col-reverse items-center gap-2 sm:gap-3 transition-all duration-300 ${
            isChatOpen ? 'hidden sm:flex' : ''
          } ${
            isVoiceActive ? 'opacity-0 pointer-events-none sm:opacity-100 sm:pointer-events-auto' : 'opacity-100'
          }`}
          initial={{ opacity: 0, x: -24, scale: 0.85 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -24, scale: 0.85 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          {/* ═════ 1. MAIN TRIGGER FAB BUTTON (Always at the bottom) ═════ */}
          <div
            className="relative"
            onMouseEnter={() => setHovered('trigger')}
            onMouseLeave={() => setHovered(null)}
          >
            <AnimatePresence>
              {!isOpen && hovered === 'trigger' && (
                <motion.div
                  initial={{ opacity: 0, x: -8, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -8, scale: 0.95 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  className="hidden sm:flex absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap px-3.5 py-1.5 rounded-full bg-slate-900/95 text-white text-[12px] font-medium backdrop-blur-md border border-slate-700/60 shadow-xl pointer-events-none items-center gap-2 z-50"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Connect & AI Hub</span>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open Connect & AI menu'}
              className={`group relative flex items-center justify-center w-[44px] h-[44px] sm:w-[54px] sm:h-[54px] rounded-full text-white shadow-[0_8px_25px_rgba(0,0,0,0.3)] hover:scale-108 active:scale-95 transition-all duration-200 cursor-pointer border-2 ${
                isOpen
                  ? 'bg-gradient-to-tr from-rose-600 via-rose-500 to-red-600 border-rose-300 shadow-[0_8px_25px_rgba(225,29,72,0.4)]'
                  : 'bg-gradient-to-tr from-[#0b0f19] via-[#111c38] to-[#1e3a8a] border-cyan-400/35 hover:border-cyan-400 shadow-[0_8px_28px_rgba(30,58,138,0.4)] hover:shadow-[0_10px_32px_rgba(6,182,212,0.45)]'
              }`}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close-icon"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center justify-center"
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-current stroke-[2.5]"
                      viewBox="0 0 24 24"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </motion.div>
                ) : (
                  <motion.div
                    key="open-icon"
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.7, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="relative flex items-center justify-center"
                  >
                    {/* Modern Communication & AI Hub Icon */}
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:scale-110 transition-transform duration-200"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                        fill="rgba(56, 189, 248, 0.18)"
                        stroke="#38bdf8"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle cx="9" cy="11.5" r="1.2" fill="#ffffff" />
                      <circle cx="13" cy="11.5" r="1.2" fill="#ffffff" />
                      <circle cx="17" cy="11.5" r="1.2" fill="#ffffff" />
                    </svg>

                    <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 border border-slate-900 shadow-[0_0_6px_#34d399]" />
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* ═════ 2. EXPANDED VERTICAL POP-OUT ITEMS (Staggered upwards) ═════ */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                    },
                  },
                  hidden: {
                    transition: {
                      staggerChildren: 0.03,
                      staggerDirection: -1,
                    },
                  },
                }}
                className="flex flex-col-reverse items-center gap-2 sm:gap-2.5"
              >
                {/* ── 1. WHATSAPP (Directly above trigger) ── */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 14, scale: 0.6 },
                    visible: { opacity: 1, y: 0, scale: 1 },
                  }}
                  transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                  className="relative"
                  onMouseEnter={() => setHovered('whatsapp')}
                  onMouseLeave={() => setHovered(null)}
                >
                  <AnimatePresence>
                    {hovered === 'whatsapp' && (
                      <motion.div
                        initial={{ opacity: 0, x: -8, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -8, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className="hidden sm:flex absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap px-3.5 py-1.5 rounded-full bg-slate-900/95 text-white text-[12px] font-medium backdrop-blur-md border border-emerald-500/40 shadow-xl pointer-events-none items-center gap-2 z-50"
                      >
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span>Chat on WhatsApp</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Chat with Usama on WhatsApp"
                    onClick={() => setIsOpen(false)}
                    className="group relative flex items-center justify-center w-[38px] h-[38px] sm:w-[48px] sm:h-[48px] rounded-full bg-gradient-to-tr from-[#128c7e] via-[#25D366] to-[#2cd86f] text-white shadow-[0_4px_14px_rgba(37,211,102,0.32)] hover:shadow-[0_8px_24px_rgba(37,211,102,0.48)] border-2 border-white/30 hover:scale-110 active:scale-95 transition-all duration-200"
                  >
                    <svg
                      className="w-4.5 h-4.5 sm:w-5 sm:h-5 fill-current drop-shadow-sm group-hover:scale-110 transition-transform duration-200"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.952 3.71 1.453 5.711 1.454h.005c6.554 0 11.89-5.336 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </a>
                </motion.div>

                {/* ── 2. USAMA AI BOT ASSISTANT (Middle) ── */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 14, scale: 0.6 },
                    visible: { opacity: 1, y: 0, scale: 1 },
                  }}
                  transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                  className="relative"
                  onMouseEnter={() => setHovered('gemini')}
                  onMouseLeave={() => setHovered(null)}
                >
                  <AnimatePresence>
                    {hovered === 'gemini' && (
                      <motion.div
                        initial={{ opacity: 0, x: -8, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -8, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className="hidden sm:flex absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap px-3.5 py-1.5 rounded-full bg-slate-900/95 text-white text-[12px] font-medium backdrop-blur-md border border-cyan-500/40 shadow-xl pointer-events-none items-center gap-2 z-50"
                      >
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        <span>Chat with Usama AI</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    onClick={() => {
                      openGeminiChat();
                      setIsOpen(false);
                    }}
                    aria-label="Open Usama AI Chatbot"
                    className="group relative flex items-center justify-center w-[38px] h-[38px] sm:w-[48px] sm:h-[48px] rounded-full bg-gradient-to-tr from-[#080d1a] via-[#101e4a] to-[#0052ff] text-white shadow-[0_4px_18px_rgba(0,82,255,0.42)] hover:shadow-[0_8px_28px_rgba(56,189,248,0.6)] border-2 border-cyan-400/50 hover:border-cyan-300 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
                  >
                    {/* Futuristic Robot / Bot Face Icon */}
                    <svg
                      className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-white drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Antenna with beacon */}
                      <path d="M12 2v3" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
                      <circle cx="12" cy="2" r="1.5" fill="#38bdf8" />
                      {/* Robot Head Frame */}
                      <rect
                        x="3.5"
                        y="5.5"
                        width="17"
                        height="13.5"
                        rx="4.5"
                        fill="rgba(56, 189, 248, 0.2)"
                        stroke="#38bdf8"
                        strokeWidth="1.8"
                      />
                      {/* Ears / Sound Receptors */}
                      <rect x="1" y="9.5" width="2.5" height="5.5" rx="1" fill="#38bdf8" />
                      <rect x="20.5" y="9.5" width="2.5" height="5.5" rx="1" fill="#38bdf8" />
                      {/* Expressive Smart Eyes */}
                      <circle cx="8" cy="11.5" r="1.8" fill="#ffffff" />
                      <circle cx="8" cy="11.5" r="0.9" fill="#0052ff" />
                      <circle cx="16" cy="11.5" r="1.8" fill="#ffffff" />
                      <circle cx="16" cy="11.5" r="0.9" fill="#0052ff" />
                      {/* Cute Smile */}
                      <path
                        d="M8.5 15.5c1 .9 6 .9 7 0"
                        stroke="#38bdf8"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </motion.div>

                {/* ── 3. LINKEDIN PROFILE (Top-most item) ── */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 14, scale: 0.6 },
                    visible: { opacity: 1, y: 0, scale: 1 },
                  }}
                  transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                  className="relative"
                  onMouseEnter={() => setHovered('linkedin')}
                  onMouseLeave={() => setHovered(null)}
                >
                  <AnimatePresence>
                    {hovered === 'linkedin' && (
                      <motion.div
                        initial={{ opacity: 0, x: -8, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -8, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className="hidden sm:flex absolute left-full ml-3 top-1/2 -translate-y-1/2 whitespace-nowrap px-3.5 py-1.5 rounded-full bg-slate-900/95 text-white text-[12px] font-medium backdrop-blur-md border border-slate-700/60 shadow-xl pointer-events-none items-center gap-2 z-50"
                      >
                        <span className="w-2 h-2 rounded-full bg-[#0a84ff]" />
                        <span>Connect on LinkedIn</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Usama Faheem on LinkedIn"
                    onClick={() => setIsOpen(false)}
                    className="group relative flex items-center justify-center w-[38px] h-[38px] sm:w-[48px] sm:h-[48px] rounded-full bg-gradient-to-tr from-[#005582] via-[#0077b5] to-[#0a84ff] text-white shadow-[0_4px_14px_rgba(0,119,181,0.32)] hover:shadow-[0_8px_24px_rgba(0,119,181,0.48)] border-2 border-white/25 hover:scale-110 active:scale-95 transition-all duration-200"
                  >
                    <svg
                      className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-current drop-shadow-sm group-hover:scale-110 transition-transform duration-200"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.68 1.68 0 1 0-.02-3.36 1.68 1.68 0 0 0 .02 3.36m1.4 9.74v-8.37H5.06v8.37h2.8z" />
                    </svg>
                  </a>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
