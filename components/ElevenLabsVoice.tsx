'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Mic, X } from 'lucide-react';

// Pool of ElevenLabs Agent IDs with active credits verified
const DEFAULT_AGENT_IDS = [
  'agent_7601m2zv2rayfxnr3q0mj1s3xwq1',
  'agent_5701m2zvfkwpf6tbcwxd2gbr3d56',
  'agent_9401m2zt1218fee9vf15j6ykam2y',
  'agent_6101m2zvqra0e6ebkbzennsyak2d',
  'agent_7201m2zwkz4gf0gb1jefce2ac6wp',
];

const KNOWN_EXHAUSTED = new Set([
  'agent_3401m2ztp1svfz7r8b4ejrzf823w',
  'agent_9701m2zt455hemjbp84p9yk89dnk',
  'agent_3601m2w6eyzjeyybxv6a6yva3mk0',
]);

const STORAGE_KEY = 'elevenlabs_active_agent_id_v2';

export function triggerElevenLabsCall() {
  if (typeof document === 'undefined') return;
  const widget = document.querySelector('elevenlabs-convai');
  if (!widget) return;
  if (widget.shadowRoot) {
    const btn = widget.shadowRoot.querySelector('button');
    if (btn) (btn as HTMLElement).click();
  }
}

const WIDGET_CSS = `
  :host {
    --el-base: #fbfcfb !important;
    --el-base-hover: #f1f5f9 !important;
    --el-base-active: #e2e8f0 !important;
    --el-base-border: #e2e8f0 !important;
    --el-base-subtle: #64748b !important;
    --el-base-primary: #0f172a !important;
    --el-accent: #0f172a !important;
    --el-accent-hover: #1e293b !important;
    --el-accent-active: #334155 !important;
    --el-accent-border: #334155 !important;
    --el-accent-subtle: #94a3b8 !important;
    --el-accent-primary: #fbfcfb !important;
    position: fixed !important;
    right: 20px !important;
    bottom: 74px !important;
    margin: 0 !important;
    padding: 0 !important;
    z-index: 99990 !important;
    pointer-events: auto !important;
  }

  @media (max-width: 640px) {
    :host {
      right: 14px !important;
      bottom: 70px !important;
    }
  }

  /* ElevenLabs internal container resets - eliminate gaps and unwanted margins */
  [class*="wrapper"] {
    gap: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
    align-items: flex-end !important;
  }

  [class*="box"] {
    margin: 0 !important;
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.28) !important;
    border-radius: 20px !important;
    opacity: 1 !important;
    visibility: visible !important;
    pointer-events: auto !important;
    transition: none !important;
  }

  /* Suppress the attribution banner taking up vertical space */
  [class*="poweredBy"] {
    display: none !important;
    height: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
    opacity: 0 !important;
    visibility: hidden !important;
    pointer-events: none !important;
  }

  /* Suppress ElevenLabs's own internal launcher / minimize / white dot button */
  [class*="minimize"],
  [class*="avatarButton"],
  button:not([class*="box"] *) {
    display: none !important;
    opacity: 0 !important;
    visibility: hidden !important;
    pointer-events: none !important;
    width: 0 !important;
    height: 0 !important;
    max-width: 0 !important;
    max-height: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
    overflow: hidden !important;
  }

  /* When call ends, hide the collapsed empty box immediately (prevents white dot) */
  [class*="box"]:has([class*="inlineFeedback"]) {
    display: none !important;
    opacity: 0 !important;
    visibility: hidden !important;
    pointer-events: none !important;
    width: 0 !important;
    height: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  /* ═══ SUPPRESS POST-CALL FEEDBACK / EVALUATION (Thumbs Up/Down) ═══ */
  .feedback,
  [class*="feedback" i],
  [class*="inlineFeedback" i],
  [class*="feedbackText" i],
  [class*="rating" i],
  [class*="evaluation" i],
  [class*="thumbs" i],
  button[title="Yes"],
  button[title="No"],
  button[aria-label*="thumb" i],
  button[aria-label*="helpful" i],
  div:has(> button[title="Yes"]),
  div:has(> button[title="No"]),
  div:has(> button[aria-label*="thumb" i]),
  div:has(> button[aria-label*="helpful" i]),
  div:has(> svg[class*="thumb" i]) {
    display: none !important;
    opacity: 0 !important;
    visibility: hidden !important;
    pointer-events: none !important;
    height: 0 !important;
    max-height: 0 !important;
    width: 0 !important;
    overflow: hidden !important;
    margin: 0 !important;
    padding: 0 !important;
  }
`;

function injectStyleSafely(sr: ShadowRoot) {
  const existing = sr.querySelector('style[data-custom-style]');
  if (existing) {
    if (existing.textContent !== WIDGET_CSS) {
      existing.textContent = WIDGET_CSS;
    }
    return;
  }
  const style = document.createElement('style');
  style.setAttribute('data-custom-style', 'true');
  style.textContent = WIDGET_CSS;
  sr.appendChild(style);
}

function autoAcceptTermsSafely(sr: ShadowRoot) {
  try {
    const buttons = sr.querySelectorAll('button');
    for (const btn of buttons) {
      if (btn.textContent?.includes('قبول') || btn.textContent?.includes('Accept')) {
        btn.click();
        return;
      }
    }
  } catch {}
}

function setupShadowListeners(widget: any, onEnd: () => void) {
  if (!widget?.shadowRoot || (widget.shadowRoot as any).__hasVoiceListeners) return;
  (widget.shadowRoot as any).__hasVoiceListeners = true;

  // Use capture phase so we inspect the button BEFORE any internal re-render
  widget.shadowRoot.addEventListener(
    'click',
    (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const btn = target.closest('button');
      if (!btn) return;

      const title = (btn.getAttribute('title') || '').trim().toLowerCase();
      const text = (btn.textContent || '').trim().toLowerCase();
      const aria = (btn.getAttribute('aria-label') || '').trim().toLowerCase();

      // If user clicked "Start a call", DO NOT close!
      if (title.includes('start') || text.includes('start')) {
        return;
      }

      // If user clicked "End call", cleanly close the card
      if (
        title === 'end' ||
        title === 'end call' ||
        aria === 'end call' ||
        text === 'end' ||
        text === 'end call'
      ) {
        setTimeout(() => {
          onEnd();
        }, 120);
      }
    },
    true // Capture phase intercepts event before button is swapped in DOM
  );
}

export default function ElevenLabsVoice() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeAgentId, setActiveAgentId] = useState<string>(DEFAULT_AGENT_IDS[0]);
  const [statusNotice, setStatusNotice] = useState<string | null>(null);

  const lastSwitchTimeRef = useRef(0);
  const isSwitchingRef = useRef(false);
  const isOpenRef = useRef(isOpen);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  // Parse agent list from env or fallback
  const agentList = useMemo(() => {
    const envList = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_IDS;
    if (envList && envList.trim()) {
      const parsed = envList.split(',').map((s) => s.trim()).filter(Boolean);
      if (parsed.length > 0) return parsed;
    }
    return DEFAULT_AGENT_IDS;
  }, []);

  // 1. Initialize active agent: verify cache or fetch healthy agent from API
  useEffect(() => {
    let isMounted = true;

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && !KNOWN_EXHAUSTED.has(saved) && agentList.includes(saved)) {
        setActiveAgentId(saved);
      } else {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem('elevenlabs_active_agent_index');
      }
    } catch {}

    fetch('/api/voice-agent')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!isMounted || !data?.agentId) return;
        // Never replace or remount agent if user already opened the card!
        if (isOpenRef.current) return;
        if (data.agentId !== activeAgentId && !KNOWN_EXHAUSTED.has(data.agentId)) {
          setActiveAgentId(data.agentId);
          try {
            localStorage.setItem(STORAGE_KEY, data.agentId);
          } catch {}
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, [agentList]);

  // 2. Silent background failover to next agent if quota limit is reached
  const switchToNextAgent = useCallback(
    async (exhaustedId?: string) => {
      const now = Date.now();
      if (now - lastSwitchTimeRef.current < 6000 || isSwitchingRef.current) return;
      lastSwitchTimeRef.current = now;
      isSwitchingRef.current = true;

      const current = exhaustedId || activeAgentId;
      KNOWN_EXHAUSTED.add(current);

      try {
        fetch('/api/voice-agent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reportExhausted: current }),
        })
          .then((res) => (res.ok ? res.json() : null))
          .then((data) => {
            if (data?.agentId && data.agentId !== current) {
              setActiveAgentId(data.agentId);
              try {
                localStorage.setItem(STORAGE_KEY, data.agentId);
              } catch {}
            }
          })
          .catch(() => {});
      } catch {}

      const nextCandidate =
        agentList.find((id) => !KNOWN_EXHAUSTED.has(id)) ||
        agentList[(agentList.indexOf(current) + 1) % agentList.length];

      if (nextCandidate && nextCandidate !== current) {
        setActiveAgentId(nextCandidate);
        try {
          localStorage.setItem(STORAGE_KEY, nextCandidate);
        } catch {}

        setStatusNotice('Switching to fresh voice agent line...');
        setTimeout(() => setStatusNotice(null), 3000);
      }

      setTimeout(() => {
        isSwitchingRef.current = false;
      }, 3000);
    },
    [activeAgentId, agentList]
  );

  // Close Action: Cleanly dismiss and terminate active call ONLY if a call is active
  const handleClose = useCallback(() => {
    setIsOpen(false);
    window.dispatchEvent(new Event('elevenlabs-voice-close'));

    const widget = document.querySelector('elevenlabs-convai') as any;
    if (widget?.shadowRoot) {
      // ONLY trigger the real End Call button if an audio call is in progress
      const endBtn =
        widget.shadowRoot.querySelector('button[title="End"]') ||
        widget.shadowRoot.querySelector('button[aria-label="End call"]') ||
        widget.shadowRoot.querySelector('button[title="End call"]');

      if (endBtn) {
        (endBtn as HTMLElement).click();
      }
    }
  }, []);

  // 3. Configure widget shadow DOM styling once attached
  useEffect(() => {
    let t1: NodeJS.Timeout;
    let t2: NodeJS.Timeout;

    const setup = () => {
      const widget = document.querySelector('elevenlabs-convai') as any;
      if (widget && widget.shadowRoot) {
        injectStyleSafely(widget.shadowRoot);
        autoAcceptTermsSafely(widget.shadowRoot);
        setupShadowListeners(widget, () => setIsOpen(false));

        // Check for quota exhaustion banner
        const text = (widget.shadowRoot.textContent || '').toLowerCase();
        if (text.includes('quota limit') || text.includes('quota_exceeded') || text.includes('credit limit')) {
          switchToNextAgent(activeAgentId);
        }
      }
    };

    t1 = setTimeout(setup, 600);
    t2 = setTimeout(setup, 1800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [activeAgentId, switchToNextAgent]);

  // 4. While open, keep styles active safely and auto-close when call completes
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      const widget = document.querySelector('elevenlabs-convai') as any;
      if (!widget || !widget.shadowRoot) return;
      const sr = widget.shadowRoot as ShadowRoot;
      injectStyleSafely(sr);
      setupShadowListeners(widget, () => setIsOpen(false));

      // When call finishes and feedback component appears, close cleanly
      if (sr.querySelector('[class*="inlineFeedback"]')) {
        setIsOpen(false);
      }
    }, 250);

    return () => clearInterval(interval);
  }, [isOpen]);

  // Toggle Voice: Open or Close widget cleanly
  const handleToggle = () => {
    const widget = document.querySelector('elevenlabs-convai') as any;

    if (!isOpen) {
      setIsOpen(true);
      window.dispatchEvent(new Event('elevenlabs-voice-open'));

      if (widget?.shadowRoot) {
        injectStyleSafely(widget.shadowRoot);
        autoAcceptTermsSafely(widget.shadowRoot);
        setupShadowListeners(widget, () => setIsOpen(false));
      }
    } else {
      handleClose();
    }
  };

  return (
    <>
      {/* ── Native ElevenLabs custom element (Snugly seated 6px above toggle button) ── */}
      <div
        className={`fixed inset-0 pointer-events-none z-[99990] transition-opacity duration-150 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          visibility: isOpen ? 'visible' : 'hidden',
        }}
        dangerouslySetInnerHTML={{
          __html: `<elevenlabs-convai agent-id="${activeAgentId}" variant="full" expandable="never"></elevenlabs-convai>`,
        }}
      />

      {/* ── Main Circular Voice Button (Always anchored at bottom: 20px, right: 20px) ── */}
      <div className="fixed right-5 bottom-5 z-[99999] pointer-events-auto select-none">
        {/* Status Toast (e.g. switching agent) */}
        {statusNotice && (
          <div className="absolute bottom-16 right-0 bg-[#0f172a]/95 text-white text-xs font-medium px-3.5 py-1.5 rounded-xl border border-blue-500/40 shadow-xl backdrop-blur-md animate-fade-in whitespace-nowrap">
            {statusNotice}
          </div>
        )}

        {/* 
          Main Toggle Button:
          - Closed: Microphone icon with glowing blue indicator
          - Open: Red circle with white '✕' Close icon
          - Card sits at bottom: 74px, red button top is at 68px -> perfect 6px gap!
        */}
        <button
          id="voice-trigger-btn"
          type="button"
          onClick={handleToggle}
          aria-label={isOpen ? 'Close Voice Assistant' : 'Talk to Usama AI Voice'}
          title={isOpen ? 'Close Voice' : 'Talk with Usama AI Voice'}
          className={`group relative flex items-center justify-center w-12 h-12 rounded-full transition-colors duration-150 cursor-pointer shadow-[0_8px_24px_rgba(0,0,0,0.35)] active:scale-95 ${
            isOpen
              ? 'bg-rose-600 hover:bg-rose-700 text-white border border-rose-400/40 shadow-rose-600/30'
              : 'bg-[#0f172a] hover:bg-[#1e293b] text-white border border-[#334155] hover:border-blue-500/60'
          }`}
        >
          {isOpen ? (
            /* Crisp white X Close icon */
            <X className="w-5 h-5 text-white" />
          ) : (
            /* Crisp white Microphone icon */
            <>
              <span className="absolute -inset-1 rounded-full bg-blue-500/20 animate-ping [animation-duration:3s] pointer-events-none" />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6] border border-[#0f172a]" />
              <div className="flex items-center justify-center">
                <Mic className="w-5 h-5 text-white drop-shadow-sm" />
              </div>
            </>
          )}
        </button>
      </div>
    </>
  );
}
