'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { PhoneCall, PhoneOff, X } from 'lucide-react';

// Pool of ElevenLabs Agent IDs with active credits verified
const DEFAULT_AGENT_IDS = [
  'agent_7601m2zv2rayfxnr3q0mj1s3xwq1',
  'agent_5701m2zvfkwpf6tbcwxd2gbr3d56',
  'agent_9401m2zt1218fee9vf15j6ykam2y',
  'agent_6101m2zvqra0e6ebkbzennsyak2d',
  'agent_7201m2zwkz4gf0gb1jefce2ac6wp',
  'agent_9701m2zt455hemjbp84p9yk89dnk',
  'agent_3601m2w6eyzjeyybxv6a6yva3mk0',
  'agent_3901m344jcyjfq4bjqbp0635z595',
];

const KNOWN_EXHAUSTED = new Set([
  'agent_3901m344jcyjfq4bjqbp0635z595',
  'agent_3401m2ztp1svfz7r8b4ejrzf823w',
]);

const STORAGE_KEY = 'elevenlabs_active_agent_id_v5';
const EXHAUSTED_STORAGE_KEY = 'elevenlabs_exhausted_agents_v5';

function getExhaustedPool(): Set<string> {
  const set = new Set(KNOWN_EXHAUSTED);
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(EXHAUSTED_STORAGE_KEY);
      if (stored) {
        JSON.parse(stored).forEach((id: string) => set.add(id));
      }
    } catch {}
  }
  return set;
}

function markAgentExhausted(agentId: string) {
  KNOWN_EXHAUSTED.add(agentId);
  if (typeof window !== 'undefined') {
    try {
      const pool = getExhaustedPool();
      pool.add(agentId);
      localStorage.setItem(EXHAUSTED_STORAGE_KEY, JSON.stringify(Array.from(pool)));
    } catch {}
  }
}

function pingRealInternet(): Promise<boolean> {
  if (typeof window === 'undefined') return Promise.resolve(true);
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return Promise.resolve(false);
  }
  return new Promise((resolve) => {
    let resolved = false;
    const finish = (result: boolean) => {
      if (!resolved) {
        resolved = true;
        resolve(result);
      }
    };

    const timer = setTimeout(() => finish(false), 1200);

    try {
      fetch('https://www.google.com/generate_204?_t=' + Date.now(), {
        method: 'GET',
        mode: 'no-cors',
        cache: 'no-store',
      })
        .then(() => {
          clearTimeout(timer);
          finish(true);
        })
        .catch(() => {
          clearTimeout(timer);
          finish(false);
        });
    } catch {
      clearTimeout(timer);
      finish(false);
    }
  });
}

export function triggerElevenLabsCall() {
  if (typeof document === 'undefined') return;
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('app-action-blocked-offline', {
          detail: { message: 'Voice Call requires an active internet connection.' },
        })
      );
    }
    return;
  }
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
      left: auto !important;
      bottom: 78px !important;
      max-width: calc(100vw - 28px) !important;
      width: auto !important;
      transform: scale(0.78) !important;
      transform-origin: bottom right !important;
    }

    [class*="wrapper"] {
      width: 100% !important;
      max-width: calc(100vw - 28px) !important;
      align-items: flex-end !important;
    }

    [class*="box"] {
      width: 290px !important;
      max-width: calc(100vw - 28px) !important;
      box-sizing: border-box !important;
      overflow: hidden !important;
      border-radius: 22px !important;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.25) !important;
    }

    [class*="box"],
    [class*="box"] * {
      box-sizing: border-box !important;
    }

    [class*="box"] button {
      max-width: 100% !important;
      box-sizing: border-box !important;
      border-radius: 9999px !important;
      overflow: hidden !important;
      text-overflow: ellipsis !important;
      white-space: nowrap !important;
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
    overflow: hidden !important;
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
  div:has(> svg[class*="thumb" i]),
  /* ═══ SUPPRESS ELEVENLABS QUOTA & ERROR DIALOG MODALS ═══ */
  [role="alertdialog"],
  [role="dialog"],
  [class*="dialog" i],
  [class*="modal" i],
  [class*="backdrop" i],
  [class*="overlay" i],
  [class*="popup" i],
  [class*="errorCard" i],
  [class*="errorDialog" i],
  [class*="errorModal" i],
  [class*="errorContainer" i],
  [class*="errorMessage" i],
  div:has(> *[class*="quota" i]),
  div:has(> button[class*="close" i]):not([class*="box"] *) {
    display: none !important;
    opacity: 0 !important;
    visibility: hidden !important;
    pointer-events: none !important;
    height: 0 !important;
    width: 0 !important;
    max-height: 0 !important;
    max-width: 0 !important;
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

function setupShadowListeners(widget: any, onEnd: () => void, onQuota?: () => void) {
  if (!widget?.shadowRoot) return;

  const scrubErrorPopups = () => {
    try {
      const popups = widget.shadowRoot.querySelectorAll(
        '[role="dialog"], [role="alertdialog"], [class*="dialog"], [class*="modal"], [class*="error"]'
      );
      popups.forEach((el: any) => {
        const txt = (el.textContent || '').toLowerCase();
        el.style.display = 'none';
        el.remove();
        if (txt.includes('credit') || txt.includes('quota')) {
          if (onQuota) onQuota();
        } else if (
          txt.includes('error') ||
          txt.includes('conversation') ||
          txt.includes('connection') ||
          txt.includes('disconnect') ||
          txt.includes('failed')
        ) {
          // Connection / network termination - close call and revert button to black!
          if (onEnd) onEnd();
        }
      });
    } catch {}
  };

  scrubErrorPopups();

  if (!(widget.shadowRoot as any).__hasQuotaObserver) {
    (widget.shadowRoot as any).__hasQuotaObserver = true;
    const observer = new MutationObserver(() => {
      scrubErrorPopups();
      const text = (widget.shadowRoot.textContent || '').toLowerCase();
      if (
        text.includes('quota_exceeded') ||
        text.includes('run out of credits') ||
        text.includes('out of credits') ||
        text.includes('quota limit') ||
        text.includes('credit limit')
      ) {
        if (onQuota) onQuota();
      }
    });

    observer.observe(widget.shadowRoot, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }

  if ((widget.shadowRoot as any).__hasVoiceListeners) return;
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
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    if (typeof navigator !== 'undefined') return navigator.onLine;
    return true;
  });
  const isOnlineRef = useRef<boolean>(isOnline);
  useEffect(() => {
    isOnlineRef.current = isOnline;
  }, [isOnline]);

  const lastSwitchTimeRef = useRef(0);
  const isSwitchingRef = useRef(false);
  const isOpenRef = useRef(isOpen);
  const callStartTimeRef = useRef(0);
  const hasCallStartedRef = useRef(false);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Terminate call cleanly and revert button to BLACK immediately
  const handleCallTermination = useCallback((isDisconnect = false) => {
    hasCallStartedRef.current = false;
    setIsOpen(false);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('elevenlabs-voice-close'));
    }

    if (isDisconnect || (typeof navigator !== 'undefined' && !navigator.onLine) || !isOnlineRef.current) {
      setIsOnline(false);
      isOnlineRef.current = false;
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('app-network-status', { detail: { isOnline: false } }));
        window.dispatchEvent(
          new CustomEvent('app-action-blocked-offline', {
            detail: {
              message: 'Call disconnected: Internet connection was lost.',
            },
          })
        );
      }
    }
  }, []);

  // Close Action: Cleanly dismiss and terminate active call ONLY if a call is active
  const handleClose = useCallback(() => {
    handleCallTermination(false);

    const widget = document.querySelector('elevenlabs-convai') as any;
    if (widget?.shadowRoot) {
      // ONLY trigger the real End Call button if an audio call is in progress
      const endBtn =
        widget.shadowRoot.querySelector('button[title="End"]') ||
        widget.shadowRoot.querySelector('button[aria-label="End call"]') ||
        widget.shadowRoot.querySelector('button[title="End call"]') ||
        Array.from(widget.shadowRoot.querySelectorAll('button')).find((b: any) => {
          const t = (b.textContent || '').trim().toLowerCase();
          return t === 'end' || t === 'end call';
        });

      if (endBtn) {
        try {
          (endBtn as HTMLElement).click();
        } catch {}
      }
    }
  }, [handleCallTermination]);

  // Drop call immediately on network disconnect and dispatch warning toast
  const handleNetworkDrop = useCallback(() => {
    const wasCallOpen = isOpenRef.current;
    handleCallTermination(wasCallOpen);
  }, [handleCallTermination]);

  useEffect(() => {
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      setIsOnline(false);
      isOnlineRef.current = false;
    }

    const setOffline = () => {
      if (isOnlineRef.current) {
        setIsOnline(false);
        isOnlineRef.current = false;
        handleNetworkDrop();
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('app-network-status', { detail: { isOnline: false } }));
        }
      }
    };

    const setOnline = () => {
      if (!isOnlineRef.current) {
        setIsOnline(true);
        isOnlineRef.current = true;
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('app-network-status', { detail: { isOnline: true } }));
        }
      }
    };

    const handleBrowserOnline = () => {
      pingRealInternet().then((ok) => {
        if (ok) setOnline();
        else setOffline();
      });
    };

    const handleBrowserOffline = () => {
      setOffline();
    };

    const handleAppNetwork = (e: any) => {
      if (typeof e?.detail?.isOnline === 'boolean') {
        if (e.detail.isOnline) {
          setOnline();
        } else {
          setOffline();
        }
      }
    };

    window.addEventListener('online', handleBrowserOnline);
    window.addEventListener('offline', handleBrowserOffline);
    window.addEventListener('app-network-status', handleAppNetwork);

    // Active heartbeat: constantly verifies real WAN reachability
    let isChecking = false;
    const recoveryInterval = setInterval(async () => {
      if (isChecking) return;
      isChecking = true;
      try {
        if (typeof navigator !== 'undefined' && !navigator.onLine) {
          setOffline();
          return;
        }

        const realOnline = await pingRealInternet();
        if (!realOnline) {
          setOffline();
        } else {
          setOnline();
        }
      } finally {
        isChecking = false;
      }
    }, 1500);

    return () => {
      window.removeEventListener('online', handleBrowserOnline);
      window.removeEventListener('offline', handleBrowserOffline);
      window.removeEventListener('app-network-status', handleAppNetwork);
      clearInterval(recoveryInterval);
    };
  }, [handleNetworkDrop]);

  useEffect(() => {
    isOpenRef.current = isOpen;
    if (!isOpen && typeof window !== 'undefined') {
      window.dispatchEvent(new Event('elevenlabs-voice-close'));
    }
  }, [isOpen]);

  // Hide voice trigger on mobile when AI Chatbot or Mobile Menu is open so it never overlaps
  useEffect(() => {
    const handleChatOpen = () => setIsChatOpen(true);
    const handleChatClose = () => setIsChatOpen(false);
    const handleMenuOpen = () => setIsMobileMenuOpen(true);
    const handleMenuClose = () => setIsMobileMenuOpen(false);

    window.addEventListener('gemini-chat-open', handleChatOpen);
    window.addEventListener('gemini-chat-close', handleChatClose);
    window.addEventListener('mobile-menu-open', handleMenuOpen);
    window.addEventListener('mobile-menu-close', handleMenuClose);

    return () => {
      window.removeEventListener('gemini-chat-open', handleChatOpen);
      window.removeEventListener('gemini-chat-close', handleChatClose);
      window.removeEventListener('mobile-menu-open', handleMenuOpen);
      window.removeEventListener('mobile-menu-close', handleMenuClose);
    };
  }, []);

  // Parse agent list from env or fallback
  const agentList = useMemo(() => {
    const envList = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_IDS;
    if (envList && envList.trim()) {
      const parsed = envList.split(',').map((s) => s.trim()).filter(Boolean);
      if (parsed.length > 0) return parsed;
    }
    return DEFAULT_AGENT_IDS;
  }, []);

  // 0. Lazy-load ElevenLabs script on first scroll (not during initial page load)
  useEffect(() => {
    const loadScript = () => {
      if (document.querySelector('script[src*="elevenlabs"]')) return;
      const script = document.createElement('script');
      script.src = 'https://elevenlabs.io/convai-widget/index.js';
      script.async = true;
      document.body.appendChild(script);
    };
    const timer = setTimeout(loadScript, 4000);
    window.addEventListener('scroll', loadScript, { once: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', loadScript);
    };
  }, []);

  // 1. Initialize active agent: check exhausted pool & proactively fetch from server
  useEffect(() => {
    const exhausted = getExhaustedPool();
    const primaryCandidate = agentList.find((id) => !exhausted.has(id)) || agentList[0];

    try {
      ['elevenlabs_active_agent_id_v1', 'elevenlabs_active_agent_id_v2', 'elevenlabs_active_agent_id_v3', 'elevenlabs_active_agent_id_v4'].forEach((k) => {
        try { localStorage.removeItem(k); } catch {}
      });

      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && !exhausted.has(saved) && agentList.includes(saved)) {
        setActiveAgentId(saved);
      } else {
        setActiveAgentId(primaryCandidate);
        localStorage.setItem(STORAGE_KEY, primaryCandidate);
      }
    } catch {
      setActiveAgentId(primaryCandidate);
    }

    // Pre-flight check with backend route for live healthy agent
    fetch('/api/voice-agent')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.agentId && !exhausted.has(data.agentId)) {
          setActiveAgentId(data.agentId);
          try {
            localStorage.setItem(STORAGE_KEY, data.agentId);
          } catch {}
        }
      })
      .catch(() => {});
  }, [agentList]);

  // 2. Silent background failover to next agent if quota limit is reached
  const switchToNextAgent = useCallback(
    async (exhaustedId?: string) => {
      // If offline or network lost, NEVER switch agent or reopen call! Cleanly close and stay BLACK!
      if (!isOnline || (typeof navigator !== 'undefined' && !navigator.onLine)) {
        handleCallTermination(true);
        return;
      }

      const now = Date.now();
      if (now - lastSwitchTimeRef.current < 2000 || isSwitchingRef.current) return;
      lastSwitchTimeRef.current = now;
      isSwitchingRef.current = true;

      const current = exhaustedId || activeAgentId;
      markAgentExhausted(current);

      try {
        fetch('/api/voice-agent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reportExhausted: current }),
        }).catch(() => {});
      } catch {}

      const pool = getExhaustedPool();
      const nextCandidate = agentList.find((id) => !pool.has(id));

      if (nextCandidate && nextCandidate !== current) {
        setStatusNotice('Switching to fresh voice agent line...');
        setIsOpen(false);
        setActiveAgentId(nextCandidate);
        try {
          localStorage.setItem(STORAGE_KEY, nextCandidate);
        } catch {}

        setTimeout(() => {
          hasCallStartedRef.current = false;
          callStartTimeRef.current = Date.now();
          setIsOpen(true);
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new Event('elevenlabs-voice-open'));
          }
          setStatusNotice(null);
          isSwitchingRef.current = false;
        }, 750);
      } else {
        setIsOpen(false);
        setStatusNotice('Voice lines currently busy. Please connect via WhatsApp or Chat!');
        setTimeout(() => setStatusNotice(null), 4500);
        isSwitchingRef.current = false;
      }
    },
    [activeAgentId, agentList, isOnline, handleCallTermination]
  );

  // 3. Configure widget shadow DOM styling once attached
  useEffect(() => {
    let t1: NodeJS.Timeout;
    let t2: NodeJS.Timeout;

    const setup = () => {
      const widget = document.querySelector('elevenlabs-convai') as any;
      if (widget) {
        // Native ElevenLabs widget lifecycle event listeners
        if (!widget.__hasConvaiEvents) {
          widget.__hasConvaiEvents = true;
          widget.addEventListener('conversationEnded', () => {
            handleCallTermination(false);
          });
        }

        if (widget.shadowRoot) {
          injectStyleSafely(widget.shadowRoot);
          autoAcceptTermsSafely(widget.shadowRoot);
          setupShadowListeners(widget, () => handleCallTermination(false), () => switchToNextAgent(activeAgentId));

          // Check for quota exhaustion banner
          const text = (widget.shadowRoot.textContent || '').toLowerCase();
          if (
            text.includes('quota limit') ||
            text.includes('quota_exceeded') ||
            text.includes('credit limit') ||
            text.includes('out of credits') ||
            text.includes('run out of credits')
          ) {
            switchToNextAgent(activeAgentId);
          }
        }
      }
    };

    t1 = setTimeout(setup, 400);
    t2 = setTimeout(setup, 1500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [activeAgentId, switchToNextAgent, isOnline]);

  // 4. While open, keep styles active safely, auto-detect call closure, and observe quota continuously
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      const widget = document.querySelector('elevenlabs-convai') as any;
      if (!widget || !widget.shadowRoot) {
        if (hasCallStartedRef.current || Date.now() - callStartTimeRef.current > 15000) {
          hasCallStartedRef.current = false;
          setIsOpen(false);
        }
        return;
      }
      const sr = widget.shadowRoot as ShadowRoot;
      injectStyleSafely(sr);
      setupShadowListeners(widget, () => setIsOpen(false), () => switchToNextAgent(activeAgentId));

      const text = (sr.textContent || '').toLowerCase();
      if (
        text.includes('quota_exceeded') ||
        text.includes('run out of credits') ||
        text.includes('out of credits') ||
        text.includes('quota limit')
      ) {
        switchToNextAgent(activeAgentId);
        return;
      }

      // Check if active call UI is visible
      const endBtn =
        sr.querySelector('button[title*="End" i]') ||
        sr.querySelector('button[aria-label*="End" i]') ||
        Array.from(sr.querySelectorAll('button')).find((b) => {
          const t = (b.textContent || '').trim().toLowerCase();
          return t === 'end' || t === 'end call';
        });

      const box = sr.querySelector('[class*="box"]') as HTMLElement | null;
      const isBoxVisible = Boolean(box && window.getComputedStyle(box).display !== 'none' && box.offsetHeight > 0);

      // Once the call UI renders (End button or speech indicators), mark call as started
      if (endBtn || (box && isBoxVisible && (text.includes('interrupt') || text.includes('speaking') || text.includes('listening')))) {
        hasCallStartedRef.current = true;
      }

      // Check for disconnect or network failure text in widget
      const hasConnectionError =
        text.includes('error occurred') ||
        text.includes('connection lost') ||
        text.includes('disconnected') ||
        text.includes('unable to connect') ||
        text.includes('failed to connect');

      if (hasConnectionError) {
        handleCallTermination(true);
        return;
      }

      // ONLY if the call had officially started, and now the call box collapsed or End button is gone:
      if (hasCallStartedRef.current && (!isBoxVisible || !endBtn)) {
        handleCallTermination(!navigator.onLine || !isOnline);
        return;
      }
    }, 250);

    return () => clearInterval(interval);
  }, [isOpen, activeAgentId, switchToNextAgent, isOnline, handleCallTermination]);

  // Toggle Voice: Open or Close widget cleanly
  const handleToggle = () => {
    if (!isOpen) {
      // Offline Check: Prevent opening call without active internet connection
      if (!isOnline || (typeof navigator !== 'undefined' && !navigator.onLine)) {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(
            new CustomEvent('app-action-blocked-offline', {
              detail: { message: 'Voice Call is disabled while offline. Please connect to internet.' },
            })
          );
        }
        return;
      }

      // Pre-flight check: If currently selected agent is in exhausted pool, switch immediately
      const pool = getExhaustedPool();
      if (pool.has(activeAgentId)) {
        const next = agentList.find((id) => !pool.has(id));
        if (next && next !== activeAgentId) {
          setActiveAgentId(next);
          try {
            localStorage.setItem(STORAGE_KEY, next);
          } catch {}
        }
      }

      hasCallStartedRef.current = false;
      callStartTimeRef.current = Date.now();
      const widget = document.querySelector('elevenlabs-convai') as any;
      setIsOpen(true);
      window.dispatchEvent(new Event('elevenlabs-voice-open'));

      if (widget) {
        if (!widget.__hasConvaiEvents) {
          widget.__hasConvaiEvents = true;
          widget.addEventListener('conversationEnded', () => {
            setIsOpen(false);
          });
        }
        if (widget.shadowRoot) {
          injectStyleSafely(widget.shadowRoot);
          autoAcceptTermsSafely(widget.shadowRoot);
          setupShadowListeners(widget, () => setIsOpen(false), () => switchToNextAgent(activeAgentId));
        }
      }
    } else {
      handleClose();
    }
  };

  return (
    <>
      {/* ── Native ElevenLabs custom element (Only rendered when online to prevent 'Cannot fetch config' errors) ── */}
      {isOnline && (
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
      )}

      {/* ── Main Circular Voice Button (Anchored bottom right, responsive compact on mobile) ── */}
      <div
        className={`fixed right-3.5 sm:right-5 bottom-3.5 sm:bottom-5 z-[99990] pointer-events-auto select-none transition-all duration-300 ${
          isChatOpen || isMobileMenuOpen
            ? 'opacity-0 translate-y-20 pointer-events-none sm:opacity-100 sm:translate-y-0 sm:pointer-events-auto'
            : 'opacity-100 translate-y-0'
        }`}
      >
        {/* Status Toast (e.g. switching agent) */}
        {statusNotice && (
          <div className="absolute bottom-14 sm:bottom-16 right-0 bg-[#0f172a]/95 text-white text-xs font-medium px-3.5 py-1.5 rounded-xl border border-blue-500/40 shadow-xl backdrop-blur-md animate-fade-in whitespace-nowrap">
            {statusNotice}
          </div>
        )}

        {/* 
          Main Toggle Button:
          - Mobile: w-10 h-10 (40px)
          - Desktop: w-12 h-12 (48px)
        */}
        <button
          id="voice-trigger-btn"
          type="button"
          onClick={handleToggle}
          aria-disabled={!isOnline}
          aria-label={
            !isOnline
              ? 'Voice Assistant Disabled (Offline)'
              : isOpen
              ? 'End Voice Call'
              : 'Call Usama AI Voice Assistant'
          }
          title={
            !isOnline
              ? 'Voice Assistant Disabled (Offline)'
              : isOpen
              ? 'End Call'
              : 'Voice Call with Usama AI'
          }
          className={`group relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full transition-all duration-300 shadow-[0_8px_24px_rgba(0,0,0,0.35)] ${
            !isOnline
              ? 'bg-[#121620] text-slate-500 border-2 border-slate-700/60 opacity-40 cursor-not-allowed grayscale pointer-events-auto'
              : isOpen
              ? 'bg-gradient-to-tr from-rose-600 via-rose-500 to-red-600 hover:from-rose-700 hover:to-red-700 text-white border-2 border-rose-300/60 shadow-rose-600/40 cursor-pointer active:scale-95'
              : 'bg-gradient-to-tr from-[#090d16] via-[#111c38] to-[#1e293b] hover:from-[#0d1527] hover:to-[#243452] text-white border-2 border-slate-700/80 hover:border-emerald-400/80 shadow-[0_8px_25px_rgba(0,0,0,0.4)] hover:shadow-[0_10px_28px_rgba(16,185,129,0.35)] cursor-pointer active:scale-95'
          }`}
        >
          {!isOnline ? (
            /* Disabled / Offline State: Muted grey slash phone with disabled dot */
            <>
              <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-slate-600 border-2 border-[#090d16]" />
              <PhoneOff className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500" />
            </>
          ) : isOpen ? (
            /* Crisp PhoneOff / End Call icon ONLY when call is actively OPEN */
            <PhoneOff className="w-4 h-4 sm:w-5 sm:h-5 text-white drop-shadow-sm" />
          ) : (
            /* Normal Online: Crisp Call / Phone icon with live green indicator */
            <>
              <span className="absolute -inset-1 rounded-full bg-emerald-500/25 animate-ping [animation-duration:2.5s] pointer-events-none" />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] border-2 border-[#090d16]" />
              <div className="flex items-center justify-center">
                <PhoneCall className="w-4 h-4 sm:w-5 sm:h-5 text-white drop-shadow-sm group-hover:scale-110 transition-transform duration-200" />
              </div>
            </>
          )}
        </button>
      </div>
    </>
  );
}
