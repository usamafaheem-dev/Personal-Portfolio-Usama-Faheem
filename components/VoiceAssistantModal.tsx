'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic,
  MicOff,
  PhoneOff,
  Sparkles,
  MessageSquare,
  RefreshCw,
  Globe,
  Square,
  Play,
} from 'lucide-react';

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToTextChat: () => void;
}

type VoiceState = 'idle' | 'listening' | 'thinking' | 'speaking' | 'muted';

interface VoiceOption {
  id: string;
  name: string;
  recogLang: string;
}

const VOICE_OPTIONS: VoiceOption[] = [
  { id: 'nPczCjzI2devNBz1zQrb', name: 'Brian (AI)', recogLang: 'en-US' },
  { id: 'iP95p4xoKVk53GoZ742B', name: 'Chris (AI)', recogLang: 'ur-PK' },
  { id: 'pFZP5JQG7iQjIQuC4Bku', name: 'Lily (AI)', recogLang: 'en-US' },
];

const MAX_RETRIES = 8;

export default function VoiceAssistantModal({
  isOpen,
  onClose,
  onSwitchToTextChat,
}: VoiceAssistantModalProps) {
  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  const [selectedVoice, setSelectedVoice] = useState('nPczCjzI2devNBz1zQrb');
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [callSeconds, setCallSeconds] = useState(0);
  const [bars, setBars] = useState<number[]>(Array(13).fill(14));

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const objUrlRef = useRef<string | null>(null);
  const recogRef = useRef<any>(null);
  const mountedRef = useRef(true);
  const callActiveRef = useRef(false);
  const greetedRef = useRef(false);
  const retryRef = useRef(0);
  const voiceRef = useRef(selectedVoice);
  const mutedRef = useRef(isMicMuted);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastTranscriptRef = useRef('');

  // Keep refs in sync with state
  voiceRef.current = selectedVoice;
  mutedRef.current = isMicMuted;

  // ── Ref-based functions to break circular dependency ──
  const listenFnRef = useRef<() => void>(() => {});
  const speakFnRef = useRef<(text: string, onDone?: () => void) => void>(() => {});
  const queryFnRef = useRef<(q: string) => void>(() => {});

  // ── Helpers ──
  function killAudio() {
    if (audioRef.current) {
      try { audioRef.current.pause(); audioRef.current.currentTime = 0; } catch {}
      audioRef.current.onended = null;
      audioRef.current.onerror = null;
    }
    if (objUrlRef.current) {
      try { URL.revokeObjectURL(objUrlRef.current); } catch {}
      objUrlRef.current = null;
    }
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      try { window.speechSynthesis.cancel(); } catch {}
    }
  }

  function killRecog() {
    retryRef.current = MAX_RETRIES;
    if (silenceTimerRef.current) { clearTimeout(silenceTimerRef.current); silenceTimerRef.current = null; }
    if (recogRef.current) {
      try { recogRef.current.abort(); } catch {}
      recogRef.current = null;
    }
  }

  function killAll() {
    killAudio();
    killRecog();
  }

  function browserTTS(text: string, cb: () => void) {
    if (typeof window === 'undefined' || !window.speechSynthesis) { cb(); return; }
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 1; u.pitch = 1;
    u.onend = cb;
    u.onerror = () => cb();
    window.speechSynthesis.speak(u);
  }

  // ── Core: startListening ──
  listenFnRef.current = () => {
    if (!mountedRef.current || !callActiveRef.current || mutedRef.current) return;
    if (typeof window === 'undefined') return;

    killAudio();
    if (silenceTimerRef.current) { clearTimeout(silenceTimerRef.current); silenceTimerRef.current = null; }
    lastTranscriptRef.current = '';

    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;

    if (recogRef.current) {
      try { recogRef.current.abort(); } catch {}
      recogRef.current = null;
    }

    try {
      const voice = VOICE_OPTIONS.find((v) => v.id === voiceRef.current);
      const r = new SR();
      r.continuous = false;
      r.interimResults = true;
      r.lang = voice?.recogLang || 'en-US';

      let transcript = '';

      // Safety net: max 20 seconds per recording session
      silenceTimerRef.current = setTimeout(() => {
        silenceTimerRef.current = null;
        try { r.stop(); } catch {}
      }, 20000);

      r.onstart = () => {
        if (mountedRef.current) setVoiceState('listening');
      };

      r.onresult = (e: any) => {
        let t = '';
        for (let i = 0; i < e.results.length; i++) t += e.results[i][0].transcript + ' ';
        transcript = t.trim();
        lastTranscriptRef.current = transcript;
        retryRef.current = 0;
      };

      r.onerror = (e: any) => {
        if (silenceTimerRef.current) { clearTimeout(silenceTimerRef.current); silenceTimerRef.current = null; }
        if (e.error === 'aborted') return;
        if (e.error === 'no-speech') {
          if (retryRef.current < MAX_RETRIES && callActiveRef.current && !mutedRef.current) {
            retryRef.current++;
            setTimeout(() => listenFnRef.current(), 300);
          } else {
            setVoiceState('idle');
          }
          return;
        }
        if (callActiveRef.current && !mutedRef.current) {
          setTimeout(() => listenFnRef.current(), 500);
        } else {
          setVoiceState('idle');
        }
      };

      r.onend = () => {
        if (silenceTimerRef.current) { clearTimeout(silenceTimerRef.current); silenceTimerRef.current = null; }
        if (transcript.length > 1) {
          queryFnRef.current(transcript);
        } else if (callActiveRef.current && !mutedRef.current && retryRef.current < MAX_RETRIES) {
          retryRef.current++;
          setTimeout(() => listenFnRef.current(), 300);
        } else {
          setVoiceState('idle');
        }
      };

      recogRef.current = r;
      retryRef.current = 0;
      r.start();
    } catch {
      if (callActiveRef.current) setTimeout(() => listenFnRef.current(), 500);
    }
  };

  // ── Core: playNeuralSpeech ──
  speakFnRef.current = async (text: string, onDone?: () => void) => {
    killAudio();
    if (!mountedRef.current || !callActiveRef.current) return;
    setVoiceState('thinking');

    const afterDone = () => {
      killAudio();
      if (!mountedRef.current || !callActiveRef.current) return;
      setVoiceState('idle');
      if (onDone) { onDone(); } else { listenFnRef.current(); }
    };

    try {
      const ctrl = new AbortController();
      const tid = setTimeout(() => ctrl.abort(), 15000);

      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voice: voiceRef.current }),
        signal: ctrl.signal,
      });
      clearTimeout(tid);

      if (!res.ok) throw new Error('TTS ' + res.status);
      if (!mountedRef.current || !callActiveRef.current) return;

      const blob = await res.blob();
      if (!mountedRef.current || !callActiveRef.current) return;

      const url = URL.createObjectURL(blob);
      objUrlRef.current = url;

      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.onended = afterDone;
        audioRef.current.onerror = () => browserTTS(text, afterDone);
        audioRef.current.onplay = () => { if (mountedRef.current) setVoiceState('speaking'); };
        audioRef.current.play().catch(() => browserTTS(text, afterDone));
      }
    } catch {
      if (!mountedRef.current || !callActiveRef.current) return;
      setVoiceState('speaking');
      browserTTS(text, afterDone);
    }
  };

  // ── Core: handleSendQuery ──
  queryFnRef.current = async (query: string) => {
    if (!query.trim()) return;
    killRecog();
    if (!mountedRef.current || !callActiveRef.current) return;
    setVoiceState('thinking');

    try {
      const ctrl = new AbortController();
      const tid = setTimeout(() => ctrl.abort(), 10000);

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [{ role: 'user', content: query }], mode: 'voice' }),
        signal: ctrl.signal,
      });
      clearTimeout(tid);

      if (!res.ok) throw new Error('Chat ' + res.status);

      const data = await res.json();
      const reply = data.reply || 'Usama specializes in Next.js, React, and creative web animations.';

      if (mountedRef.current && callActiveRef.current) {
        speakFnRef.current(reply);
      }
    } catch {
      if (mountedRef.current && callActiveRef.current) {
        speakFnRef.current('Sorry, I had a brief connection issue. Please ask me again.');
      }
    }
  };

  // ── Voice switch ──
  const handleSelectVoice = (id: string) => {
    killAll();
    setSelectedVoice(id);
    voiceRef.current = id;
    setVoiceState('idle');
    setTimeout(() => {
      if (callActiveRef.current) {
        retryRef.current = 0;
        listenFnRef.current();
      }
    }, 400);
  };

  // ── Mute toggle ──
  const toggleMute = () => {
    if (isMicMuted) {
      setIsMicMuted(false);
      mutedRef.current = false;
      retryRef.current = 0;
      listenFnRef.current();
    } else {
      setIsMicMuted(true);
      mutedRef.current = true;
      killRecog();
      setVoiceState('muted');
    }
  };

  // ── Interrupt ──
  const handleInterrupt = () => {
    killAll();
    retryRef.current = 0;
    listenFnRef.current();
  };

  // ── End call ──
  const handleEndCall = () => {
    callActiveRef.current = false;
    greetedRef.current = false;
    killAll();
    setVoiceState('idle');
    onClose();
  };

  // ── Mount / Open / Close ──
  useEffect(() => {
    if (!isOpen) {
      callActiveRef.current = false;
      greetedRef.current = false;
      setCallSeconds(0);
      killAll();
      setVoiceState('idle');
      return;
    }

    mountedRef.current = true;
    callActiveRef.current = true;

    const timer = setInterval(() => setCallSeconds((s) => s + 1), 1000);

    if (!greetedRef.current) {
      greetedRef.current = true;
      const greeting = "Assalam-o-Alaikum, I am Usama's AI assistant, I am here to help you.";
      const t = setTimeout(() => {
        if (!callActiveRef.current) return;
        setVoiceState('speaking');
        browserTTS(greeting, () => {
          if (callActiveRef.current) {
            setVoiceState('idle');
            listenFnRef.current();
          }
        });
      }, 300);
      return () => { clearTimeout(t); clearInterval(timer); };
    }

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      callActiveRef.current = false;
      killAll();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Visualizer ──
  useEffect(() => {
    const iv = setInterval(() => {
      if (voiceState === 'speaking' || voiceState === 'listening') {
        setBars(Array.from({ length: 13 }, () => Math.floor(10 + Math.random() * 36)));
      }
    }, 120);
    return () => clearInterval(iv);
  }, [voiceState]);

  const fmt = (s: number) =>
    `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          data-lenis-prevent="true"
          initial={{ opacity: 0, scale: 0.94, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="fixed z-50 bottom-4 right-3 sm:bottom-6 sm:right-6 w-[calc(100vw-24px)] sm:w-[400px] h-[550px] max-h-[90vh] flex flex-col rounded-3xl bg-[#090d16] text-white border border-slate-700/60 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] overflow-hidden font-sans select-none"
        >
          <audio ref={audioRef} playsInline preload="auto" className="hidden" />

        {/* Ambient Glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className={`absolute -top-20 -left-20 w-64 h-64 rounded-full blur-[90px] transition-all duration-700 opacity-30 ${voiceState === 'speaking' ? 'bg-blue-600' : voiceState === 'listening' ? 'bg-emerald-500' : 'bg-purple-600'}`} />
          <div className={`absolute -bottom-20 -right-20 w-64 h-64 rounded-full blur-[90px] transition-all duration-700 opacity-25 ${voiceState === 'speaking' ? 'bg-purple-600' : voiceState === 'listening' ? 'bg-cyan-500' : 'bg-indigo-600'}`} />
        </div>

        {/* Header */}
        <div className="relative z-10 px-4 py-3 flex items-center justify-between border-b border-slate-800/80 bg-slate-900/40 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-3 w-3">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${voiceState === 'speaking' ? 'bg-blue-400' : voiceState === 'listening' ? 'bg-emerald-400' : 'bg-purple-400'}`} />
              <span className={`relative inline-flex rounded-full h-3 w-3 ${voiceState === 'speaking' ? 'bg-blue-500' : voiceState === 'listening' ? 'bg-emerald-500' : 'bg-purple-500'}`} />
            </span>
            <div className="flex items-center gap-2">
              <h3 className="text-[13px] font-bold tracking-tight text-white font-poppins flex items-center gap-1.5">
                Usama Voice AI
                <Sparkles className="w-3.5 h-3.5 text-[#d8ff00]" />
              </h3>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                {fmt(callSeconds)}
              </span>
            </div>
          </div>
          <button
            onClick={() => { handleEndCall(); onSwitchToTextChat(); }}
            title="Switch to Text Chat"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-medium transition-colors border border-slate-700 cursor-pointer"
          >
            <MessageSquare className="w-3 h-3 text-blue-400" />
            <span>Text</span>
          </button>
        </div>

        {/* Voice Selector */}
        <div className="relative z-10 px-4 py-2 bg-slate-900/60 border-b border-slate-800/80 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
            <Globe className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span>Voice:</span>
          </div>
          <div className="flex items-center gap-1">
            {VOICE_OPTIONS.map((v) => (
              <button
                key={v.id}
                onClick={() => handleSelectVoice(v.id)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer ${
                  selectedVoice === v.id
                    ? 'bg-blue-600 text-white shadow-xs font-semibold'
                    : 'bg-slate-800/70 hover:bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {v.name}
              </button>
            ))}
          </div>
        </div>

        {/* Voice Stage */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-4 text-center">
          <div className="relative flex items-center justify-center w-48 h-48 sm:w-52 sm:h-52">
            <motion.div
              animate={{
                scale: voiceState === 'speaking' || voiceState === 'listening' ? [1, 1.25, 1] : 1,
                opacity: voiceState === 'speaking' || voiceState === 'listening' ? [0.3, 0.65, 0.3] : 0.15,
              }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className={`absolute inset-0 rounded-full border-2 ${voiceState === 'speaking' ? 'border-blue-500/40' : voiceState === 'listening' ? 'border-emerald-500/40' : 'border-purple-500/30'}`}
            />
            <motion.div
              animate={{
                scale: voiceState === 'speaking' || voiceState === 'listening' ? [1, 1.45, 1] : 1,
                opacity: voiceState === 'speaking' || voiceState === 'listening' ? [0.15, 0.45, 0.15] : 0.08,
              }}
              transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut', delay: 0.3 }}
              className={`absolute inset-2 rounded-full border ${voiceState === 'speaking' ? 'border-cyan-400/30' : voiceState === 'listening' ? 'border-green-400/30' : 'border-indigo-400/20'}`}
            />

            <div
              onClick={() => {
                if (voiceState === 'speaking') handleInterrupt();
                else if (voiceState === 'listening') {
                  if (silenceTimerRef.current) { clearTimeout(silenceTimerRef.current); silenceTimerRef.current = null; }
                  if (recogRef.current) { try { recogRef.current.stop(); } catch {} }
                }
                else { retryRef.current = 0; listenFnRef.current(); }
              }}
              className={`relative w-32 h-32 sm:w-36 sm:h-36 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 overflow-hidden border-2 cursor-pointer active:scale-95 ${
                voiceState === 'speaking'
                  ? 'bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 border-blue-400 shadow-blue-500/50'
                  : voiceState === 'listening'
                  ? 'bg-gradient-to-tr from-emerald-600 via-teal-600 to-cyan-500 border-emerald-400 shadow-emerald-500/50 ring-4 ring-emerald-500/30'
                  : voiceState === 'thinking'
                  ? 'bg-gradient-to-tr from-purple-600 via-pink-600 to-blue-600 border-purple-400 animate-spin shadow-purple-500/50'
                  : 'bg-slate-800 border-slate-600 hover:border-blue-400'
              }`}
            >
              {voiceState !== 'thinking' && (
                <Image src="/usaam_emoji.png" alt="Usama AI" width={130} height={130} className="w-full h-full object-contain scale-110 translate-y-1 drop-shadow-md pointer-events-none" priority />
              )}
              {voiceState === 'thinking' && <RefreshCw className="w-10 h-10 text-white animate-spin" />}
            </div>
          </div>

          <div className="flex items-center justify-center gap-1.5 h-7 my-3">
            {bars.map((h, i) => (
              <span
                key={i}
                style={{ height: voiceState === 'speaking' || voiceState === 'listening' ? `${Math.max(4, Math.min(30, h * 0.75))}px` : '4px' }}
                className={`w-1 rounded-full transition-all duration-150 ${voiceState === 'speaking' ? 'bg-gradient-to-t from-blue-500 to-cyan-300' : voiceState === 'listening' ? 'bg-gradient-to-t from-emerald-500 to-teal-300' : 'bg-slate-700'}`}
              />
            ))}
          </div>

          <div className="text-center mt-1 mb-2">
            <p className="text-[13px] font-poppins font-medium text-slate-300">
              {voiceState === 'speaking' ? '🔊 Usama AI is speaking...'
                : voiceState === 'listening' ? '🎙️ Listening... speak now'
                : voiceState === 'thinking' ? '⚡ Thinking...'
                : voiceState === 'muted' ? 'Microphone muted'
                : 'Tap to speak with Usama AI'}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="relative z-10 p-4 border-t border-slate-800/80 bg-slate-900/70 backdrop-blur-md flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={toggleMute}
            title={isMicMuted ? 'Unmute' : 'Mute'}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all active:scale-95 cursor-pointer border ${isMicMuted ? 'bg-amber-500/20 text-amber-400 border-amber-500/40 shadow-md shadow-amber-500/20' : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'}`}
          >
            {isMicMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5 text-emerald-400" />}
          </button>

          {voiceState === 'speaking' ? (
            <button type="button" onClick={handleInterrupt} className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-poppins text-xs font-bold shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer">
              <Square className="w-3.5 h-3.5 fill-current" /><span>Interrupt & Speak</span>
            </button>
          ) : voiceState === 'thinking' ? (
            <button type="button" disabled className="flex-1 py-3 px-4 rounded-2xl bg-purple-600/70 text-white font-poppins text-xs font-bold flex items-center justify-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" /><span>Thinking...</span>
            </button>
          ) : voiceState === 'listening' ? (
            <button type="button" onClick={() => {
              if (silenceTimerRef.current) { clearTimeout(silenceTimerRef.current); silenceTimerRef.current = null; }
              if (recogRef.current) { try { recogRef.current.stop(); } catch {} }
            }} className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-poppins text-xs font-bold shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer animate-pulse">
              <Mic className="w-4 h-4" /><span>Listening... Tap when Done</span>
            </button>
          ) : (
            <button type="button" onClick={() => { retryRef.current = 0; listenFnRef.current(); }} className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-poppins text-xs font-bold shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer">
              <Play className="w-4 h-4 fill-current" /><span>Tap to Speak</span>
            </button>
          )}

          <button type="button" onClick={handleEndCall} title="End voice call" className="w-12 h-12 rounded-2xl bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-lg shadow-red-600/40 active:scale-95 transition-all cursor-pointer border border-red-400/40">
            <PhoneOff className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);
}
