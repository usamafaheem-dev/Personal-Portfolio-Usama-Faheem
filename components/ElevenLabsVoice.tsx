'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { PhoneCall, PhoneOff, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ensureAllSectionsMounted } from '@/components/LazySection';

// Pool of ElevenLabs Agent IDs with active credits verified - Verified Healthy agents at top
const DEFAULT_AGENT_IDS = [
  'agent_5701m2zvfkwpf6tbcwxd2gbr3d56', // Verified Healthy
  'agent_9401m2zt1218fee9vf15j6ykam2y', // Verified Healthy
  'agent_6101m2zvqra0e6ebkbzennsyak2d', // Verified Healthy
  'agent_3901m344jcyjfq4bjqbp0635z595', // Verified Healthy
  'agent_7201m2zwkz4gf0gb1jefce2ac6wp', // Quota Exceeded
  'agent_7601m2zv2rayfxnr3q0mj1s3xwq1', // Quota Exceeded
  'agent_9701m2zt455hemjbp84p9yk89dnk', // Quota Exceeded
  'agent_3601m2w6eyzjeyybxv6a6yva3mk0', // Quota Exceeded
  'agent_3401m2ztp1svfz7r8b4ejrzf823w', // Quota Exceeded
];

const KNOWN_EXHAUSTED = new Set([
  'agent_7201m2zwkz4gf0gb1jefce2ac6wp',
  'agent_7601m2zv2rayfxnr3q0mj1s3xwq1',
  'agent_9701m2zt455hemjbp84p9yk89dnk',
  'agent_3601m2w6eyzjeyybxv6a6yva3mk0',
  'agent_3401m2ztp1svfz7r8b4ejrzf823w',
]);

const STORAGE_KEY = 'elevenlabs_active_agent_id_v10';
const EXHAUSTED_STORAGE_KEY = 'elevenlabs_exhausted_agents_v10';

function getExhaustedPool(): Set<string> {
  const set = new Set(KNOWN_EXHAUSTED);
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(EXHAUSTED_STORAGE_KEY);
      if (stored) {
        JSON.parse(stored).forEach((id: string) => {
          set.add(id);
        });
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

function getHumanSectionTitle(target: string): string {
  const t = target.toLowerCase();
  if (t.includes('shadab') || t.includes('rice')) return 'Shadab Rice Project';
  if (t.includes('softcr8or')) return 'SoftCr8ors Project';
  if (t.includes('removal') || t.includes('gm')) return 'GM MZ Removals';
  if (t.includes('reeba')) return 'Reeba Yaseen Project';
  if (t.includes('clean')) return 'MZ Cleaner Project';
  if (t.includes('work') || t.includes('construction')) return 'MZ Works Construction';
  if (t.includes('hero') || t.includes('top') || t.includes('navbar') || t.includes('home')) return 'Hero Section';
  if (t.includes('about')) return 'About Usama';
  if (t.includes('diff')) return 'What I Do Differently';
  if (t.includes('process') || t.includes('workflow')) return 'Development Process';
  if (t.includes('exp') || t.includes('job')) return 'Work Experience';
  if (t.includes('skill') || t.includes('stack') || t.includes('tech')) return 'Tech Stack & Skills';
  if (t.includes('project') || t.includes('portfolio')) return 'Projects Showcase';
  if (t.includes('mern')) return 'MERN Stack Certificate';
  if (t.includes('google') || t.includes('devfest')) return 'Google DevFest Certificate';
  if (t.includes('cisco') && t.includes('ai')) return 'Cisco AI & Networks Certificate';
  if (t.includes('cisco') || t.includes('network')) return 'Cisco Networking Certificate';
  if (t.includes('free')) return 'DigiSkills Freelancing Certificate';
  if (t.includes('cert')) return 'Certifications Showcase';
  if (t.includes('contact') || t.includes('hire') || t.includes('whatsapp')) return 'Contact Usama';
  return target.charAt(0).toUpperCase() + target.slice(1);
}

async function waitForElement(id: string, maxWaitMs = 1500): Promise<HTMLElement | null> {
  const start = Date.now();
  while (Date.now() - start < maxWaitMs) {
    const el = document.getElementById(id);
    if (el) return el;
    await new Promise((r) => setTimeout(r, 40));
  }
  return document.getElementById(id);
}

async function executePortfolioNavigation(targetRaw: string) {
  if (typeof window === 'undefined') return;
  ensureAllSectionsMounted();
  window.dispatchEvent(new Event('app-mount-all-sections'));

  const t = targetRaw.toLowerCase().trim();

  // ── 1. CERTIFICATE TARGET (MERN, Google DevFest, Cisco, DigiSkills) ──
  if (
    t.includes('mern') ||
    t.includes('devfest') ||
    t.includes('google') ||
    t.includes('cisco') ||
    t.includes('network') ||
    t.includes('free') ||
    t.includes('digiskill') ||
    t.includes('nextskill')
  ) {
    const certSection = await waitForElement('certifications', 1500);
    if (certSection) {
      const yOffset = -40;
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      const targetY = Math.max(0, certSection.getBoundingClientRect().top + currentScroll + yOffset);
      window.scrollTo(0, targetY);
      certSection.classList.add('ai-highlight-section');
      setTimeout(() => certSection.classList.remove('ai-highlight-section'), 3500);

      let certId = 'nextskill-mern';
      if (t.includes('devfest') || t.includes('google')) certId = 'google-devfest';
      else if (t.includes('digiskill') && t.includes('mern')) certId = 'digiskills-mern';
      else if (t.includes('digiskill') || t.includes('free')) certId = 'digiskills-freelancing';
      else if (t.includes('cisco') && t.includes('ai')) certId = 'cisco-ai';
      else if (t.includes('cisco') || t.includes('network')) certId = 'cisco-networking';

      const dispatchOpen = () => {
        window.dispatchEvent(
          new CustomEvent('app-open-certificate', {
            detail: { id: certId, query: t },
          })
        );
      };

      dispatchOpen();
      setTimeout(dispatchOpen, 220);
      setTimeout(dispatchOpen, 500);
    }
    return;
  }

  // ── 2. PROJECT TARGET (Shadab Rice, SoftCr8ors, Removals, etc.) ──
  if (
    t.includes('shadab') ||
    t.includes('rice') ||
    t.includes('softcr8or') ||
    t.includes('removal') ||
    t.includes('gm') ||
    t.includes('reeba') ||
    t.includes('clean') ||
    t.includes('work') ||
    t.includes('tekrivo')
  ) {
    const projSection = await waitForElement('projects', 1500);
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
      if (t.includes('shadab') || t.includes('rice')) cardIdx = 3;
      else if (t.includes('softcr8or')) cardIdx = 0;
      else if (t.includes('removal') || t.includes('gm')) cardIdx = 1;
      else if (t.includes('reeba')) cardIdx = 2;
      else if (t.includes('clean')) cardIdx = 4;
      else if (t.includes('work') || t.includes('construction')) cardIdx = 5;

      const progressForIndex = cardIdx === 0 ? 0 : START_PHASE + (CARD_POSITIONS[cardIdx] / maxPos) * (END_BUFFER - START_PHASE);
      const targetScroll = containerTop + progressForIndex * scrollableHeight;

      window.scrollTo(0, targetScroll);
      projSection.classList.add('ai-highlight-section');
      setTimeout(() => projSection.classList.remove('ai-highlight-section'), 3500);

      window.dispatchEvent(
        new CustomEvent('app-navigate-project', {
          detail: { target: targetRaw },
        })
      );
    }
    return;
  }

  // ── 3. GENERAL STANDARD SECTIONS ──
  let targetId = 'projects';
  if (t.includes('hero') || t.includes('top') || t.includes('home') || t.includes('header')) targetId = 'hero';
  else if (t.includes('skill') || t.includes('tech') || t.includes('stack')) targetId = 'skills';
  else if (t.includes('cert') || t.includes('degree') || t.includes('diploma')) targetId = 'certifications';
  else if (t.includes('diff') || t.includes('differently')) targetId = 'difference';
  else if (t.includes('process') || t.includes('workflow')) targetId = 'process';
  else if (t.includes('exp') || t.includes('experience') || t.includes('job')) targetId = 'experience';
  else if (t.includes('contact') || t.includes('hire') || t.includes('whatsapp') || t.includes('email')) targetId = 'contact';
  else if (t.includes('service')) targetId = 'services';
  else if (t.includes('stat')) targetId = 'stats';
  else if (t.includes('social') || t.includes('findme')) targetId = 'find-me-online';

  if (targetId === 'hero') {
    window.scrollTo(0, 0);
    const heroEl = document.getElementById('hero') || document.getElementById('navbar');
    if (heroEl) {
      heroEl.classList.add('ai-highlight-section');
      setTimeout(() => heroEl.classList.remove('ai-highlight-section'), 3500);
    }
    return;
  }

  const el = await waitForElement(targetId, 1500);
  if (el) {
    const yOffset = -75;
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    const targetY = Math.max(0, el.getBoundingClientRect().top + currentScroll + yOffset);
    window.scrollTo(0, targetY);
    el.classList.add('ai-highlight-section');
    setTimeout(() => el.classList.remove('ai-highlight-section'), 3500);
  }
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
  button[aria-label*="helpful" i] {
    display: none !important;
    opacity: 0 !important;
    visibility: hidden !important;
    pointer-events: none !important;
  }

  /* ═══ SUPPRESS AND HIDE ANY ERROR / QUOTA MODAL DIALOGS FROM USER ═══ */
  [role="dialog"]:has(*),
  [class*="dialog" i],
  [class*="modal" i]:not([class*="box"]),
  [class*="error" i],
  [class*="alert" i] {
    display: none !important;
    opacity: 0 !important;
    visibility: hidden !important;
    pointer-events: none !important;
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

  if (!(widget.shadowRoot as any).__hasQuotaObserver) {
    (widget.shadowRoot as any).__hasQuotaObserver = true;
    const observer = new MutationObserver(() => {
      const text = (widget.shadowRoot.textContent || '').toLowerCase();
      if (
        text.includes('quota_exceeded') ||
        text.includes('run out of credits') ||
        text.includes('out of credits') ||
        text.includes('quota limit') ||
        text.includes('credit limit') ||
        text.includes('an error occurred')
      ) {
        // Immediately suppress and hide the error modal popup so the user never sees it
        try {
          const allEls = widget.shadowRoot.querySelectorAll('*');
          allEls.forEach((el: HTMLElement) => {
            const t = (el.textContent || '').toLowerCase();
            if (
              t.includes('quota_exceeded') ||
              t.includes('out of credits') ||
              t.includes('an error occurred') ||
              t.includes('upgrade your plan')
            ) {
              el.style.setProperty('display', 'none', 'important');
              el.style.setProperty('opacity', '0', 'important');
              el.style.setProperty('visibility', 'hidden', 'important');
              el.style.setProperty('pointer-events', 'none', 'important');
            }
          });
        } catch {}

        if (onQuota) onQuota();
      }

      // Check if call has ended or feedback appears
      const hasFeedback = widget.shadowRoot.querySelector(
        '[class*="feedback" i], [class*="inlineFeedback" i], [class*="evaluation" i], [class*="rating" i]'
      );
      const isEnded =
        text.includes('conversation ended') ||
        text.includes('call ended') ||
        text.includes('call disconnected');

      if (hasFeedback || isEnded) {
        onEnd();
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

      // If user clicked "Start a call" or Urdu "کال شروع کریں", DO NOT close!
      if (title.includes('start') || text.includes('start') || text.includes('شروع')) {
        return;
      }

      // If user clicked "End call" or Urdu "ختم کریں", or dismiss/close, cleanly close
      if (
        title === 'end' ||
        title === 'end call' ||
        aria === 'end call' ||
        text === 'end' ||
        text === 'end call' ||
        text.includes('ختم') ||
        title.includes('close') ||
        aria.includes('close') ||
        title.includes('dismiss') ||
        text === 'close'
      ) {
        setTimeout(() => {
          onEnd();
        }, 120);
      }
    },
    true // Capture phase intercepts event before button is swapped in DOM
  );
}

function createClientToolsProxy(handler: (args: any) => Promise<any>) {
  const baseTools: Record<string, any> = {
    navigate_to_section: handler,
    navigateToSection: handler,
    navigate: handler,
    navigate_section: handler,
    scroll_to_section: handler,
    scrollToSection: handler,
    open_certificate: handler,
    view_certificate: handler,
    show_certificate: handler,
    open_project: handler,
    show_project: handler,
    navigate_to_project: handler,
    navigateToProject: handler,
    navigate_to_certificate: handler,
    navigateToCertificate: handler,
    goto_section: handler,
    gotoSection: handler,
    show_section: handler,
    showSection: handler,
  };

  return new Proxy(baseTools, {
    get(target, prop) {
      if (typeof prop === 'string' && prop in target) {
        return target[prop];
      }
      if (typeof prop === 'string' && prop !== 'then' && prop !== 'toJSON' && typeof (target as any)[prop] !== 'function') {
        console.log(`⚡ ElevenLabs requested custom tool: "${String(prop)}" -> Forwarding to navigation handler!`);
        return handler;
      }
      return (target as any)[prop];
    },
  });
}

export default function ElevenLabsVoice() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeAgentId, setActiveAgentId] = useState<string>(DEFAULT_AGENT_IDS[0]);
  const [statusNotice, setStatusNotice] = useState<string | null>(null);
  const [voiceTeleportOverlay, setVoiceTeleportOverlay] = useState<{
    visible: boolean;
    title: string;
  } | null>(null);

  const widgetContainerRef = useRef<HTMLDivElement>(null);

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

  const handleClientToolExecution = useCallback(async (args: any) => {
    console.log('⚡ ElevenLabs client tool called with args:', args);
    const targetStr = (() => {
      if (typeof args === 'string') return args;
      if (!args || typeof args !== 'object') return 'projects';
      if (args.certificate || args.cert || args.cert_id) return String(args.certificate || args.cert || args.cert_id);
      if (args.section || args.section_name || args.target || args.id || args.destination || args.page || args.name || args.project || args.input || args.value) {
        const sec = String(args.section || args.section_name || args.target || args.id || args.destination || args.page || args.name || args.project || args.input || args.value);
        if (args.query) return `${sec} ${args.query}`;
        return sec;
      }
      return Object.values(args).map(String).join(' ') || 'projects';
    })();

    const title = getHumanSectionTitle(String(targetStr));

    // 1. Show visual status toast and 9th pure electric blue soundwave capsule loader
    setStatusNotice(`⚡ Navigating to ${title}...`);
    setTimeout(() => setStatusNotice(null), 3500);
    setVoiceTeleportOverlay({ visible: true, title });

    // 2. Perform smooth navigation asynchronously
    executePortfolioNavigation(String(targetStr)).catch(console.error);

    // 3. Keep visual capsule overlay for 1.5s
    setTimeout(() => {
      setVoiceTeleportOverlay(null);
    }, 1500);

    // Return response promptly to ElevenLabs so WebSocket never hangs or times out
    return {
      success: true,
      message: `Navigated user to ${title}`,
      result: `Navigated user to ${title}`,
    };
  }, []);

  // Fresh remount of ElevenLabs widget element: clears finished sessions and guarantees clean "Start a call" state
  const remountWidget = useCallback(
    (forcedAgentId?: string) => {
      if (!widgetContainerRef.current) return null;
      const container = widgetContainerRef.current;
      const targetAgentId = forcedAgentId || activeAgentId;

      try {
        const existing = container.querySelector('elevenlabs-convai') as any;
        if (existing) {
          try {
            if (typeof existing.endConversation === 'function') {
              existing.endConversation();
            }
          } catch {}
          container.removeChild(existing);
        }
      } catch {
        container.innerHTML = '';
      }

      const freshWidget = document.createElement('elevenlabs-convai');
      freshWidget.setAttribute('agent-id', targetAgentId);
      freshWidget.setAttribute('variant', 'full');
      freshWidget.setAttribute('expandable', 'never');
      container.appendChild(freshWidget);

      hasCallStartedRef.current = false;

      freshWidget.addEventListener('elevenlabs-convai:call', (event: any) => {
        if (!event.detail) event.detail = {};
        if (!event.detail.config) event.detail.config = {};
        event.detail.config.clientTools = createClientToolsProxy(handleClientToolExecution);
      });

      return freshWidget;
    },
    [activeAgentId, handleClientToolExecution]
  );

  // Mount ElevenLabs widget stably into the container DOM node; recreate cleanly when agent ID changes
  useEffect(() => {
    if (!widgetContainerRef.current) return;
    const container = widgetContainerRef.current;
    const widget = container.querySelector('elevenlabs-convai') as any;
    if (!widget || widget.getAttribute('agent-id') !== activeAgentId) {
      remountWidget(activeAgentId);
    }
  }, [activeAgentId, remountWidget]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const onConvaiCall = (event: any) => {
      console.log('⚡ [elevenlabs-convai:call] event intercepted in ElevenLabsVoice:', event);
      if (!event.detail) event.detail = {};
      if (!event.detail.config) event.detail.config = {};

      setStatusNotice('⚡ Voice AI Connected (Tools Ready)');
      setTimeout(() => setStatusNotice(null), 3500);

      event.detail.config.clientTools = createClientToolsProxy(handleClientToolExecution);
    };

    // 1. Capture on window and document (intercepts unbubbled events in capture phase)
    window.addEventListener('elevenlabs-convai:call', onConvaiCall, true);
    document.addEventListener('elevenlabs-convai:call', onConvaiCall, true);

    // 2. Also attach directly to any elevenlabs-convai elements present or dynamically rendered
    const attachToWidget = () => {
      const widgets = document.querySelectorAll('elevenlabs-convai');
      widgets.forEach((w: any) => {
        if (!w.__hasNavigateClientTool) {
          w.__hasNavigateClientTool = true;
          w.addEventListener('elevenlabs-convai:call', onConvaiCall);
        }
      });
    };

    attachToWidget();
    const widgetInterval = setInterval(attachToWidget, 500);

    return () => {
      clearInterval(widgetInterval);
      window.removeEventListener('elevenlabs-convai:call', onConvaiCall, true);
      document.removeEventListener('elevenlabs-convai:call', onConvaiCall, true);
    };
  }, [handleClientToolExecution]);

  // Terminate call cleanly, reset widget to fresh state, and revert button to BLACK immediately
  const handleCallTermination = useCallback(
    (isDisconnect = false) => {
      // Guard against duplicate cleanup
      if (!isOpenRef.current && !hasCallStartedRef.current) return;

      const wasActiveCall = hasCallStartedRef.current || isOpenRef.current;
      hasCallStartedRef.current = false;
      isOpenRef.current = false;
      setIsOpen(false);

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('elevenlabs-voice-close'));
      }

      // Recreate a pristine new widget so the next call ALWAYS shows "Start a call" card!
      remountWidget();

      // ONLY notify if a call was ACTUALLY in progress and dropped due to internet loss
      if (wasActiveCall && isDisconnect) {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(
            new CustomEvent('app-action-blocked-offline', {
              detail: {
                message: 'Call disconnected: Internet connection was lost.',
              },
            })
          );
        }
      }
    },
    [remountWidget]
  );

  // Close Action: Cleanly dismiss and terminate active call ONLY if a call is active
  const handleClose = useCallback(() => {
    const widget = document.querySelector('elevenlabs-convai') as any;
    if (widget) {
      try {
        if (typeof widget.endConversation === 'function') {
          widget.endConversation();
        }
      } catch {}
      if (widget.shadowRoot) {
        const endBtn =
          widget.shadowRoot.querySelector('button[title*="End" i]') ||
          widget.shadowRoot.querySelector('button[aria-label*="End" i]') ||
          Array.from(widget.shadowRoot.querySelectorAll('button')).find((b: any) => {
            const t = (b.textContent || '').trim().toLowerCase();
            return t === 'end' || t === 'end call' || t.includes('ختم');
          });

        if (endBtn) {
          try {
            (endBtn as HTMLElement).click();
          } catch {}
        }
      }
    }

    handleCallTermination(false);
  }, [handleCallTermination]);

  // Drop call immediately on network disconnect and dispatch warning toast
  const handleNetworkDrop = useCallback(() => {
    const wasCallOpen = isOpenRef.current || hasCallStartedRef.current;
    if (wasCallOpen) {
      handleCallTermination(true);
    }
  }, [handleCallTermination]);

  useEffect(() => {
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      setIsOnline(false);
      isOnlineRef.current = false;
    }

    const handleBrowserOnline = () => {
      setIsOnline(true);
      isOnlineRef.current = true;
    };

    const handleBrowserOffline = () => {
      setIsOnline(false);
      isOnlineRef.current = false;
      handleNetworkDrop();
    };

    window.addEventListener('online', handleBrowserOnline);
    window.addEventListener('offline', handleBrowserOffline);

    return () => {
      window.removeEventListener('online', handleBrowserOnline);
      window.removeEventListener('offline', handleBrowserOffline);
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

  // 0. Lazy-load ElevenLabs script strictly on user interaction/scroll (prevents 3rd-party cookie flags on initial load)
  useEffect(() => {
    const loadScript = () => {
      if (document.querySelector('script[src*="elevenlabs"]')) return;
      const script = document.createElement('script');
      script.src = 'https://elevenlabs.io/convai-widget/index.js';
      script.async = true;
      document.body.appendChild(script);
    };
    window.addEventListener('scroll', loadScript, { once: true, passive: true });
    window.addEventListener('pointerdown', loadScript, { once: true, passive: true });
    return () => {
      window.removeEventListener('scroll', loadScript);
      window.removeEventListener('pointerdown', loadScript);
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
          setActiveAgentId((prev) => (prev !== data.agentId ? data.agentId : prev));
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
        isOpenRef.current = false;
        setActiveAgentId(nextCandidate);
        try {
          localStorage.setItem(STORAGE_KEY, nextCandidate);
        } catch {}

        remountWidget(nextCandidate);

        setTimeout(() => {
          hasCallStartedRef.current = false;
          callStartTimeRef.current = Date.now();
          isOpenRef.current = true;
          setIsOpen(true);
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new Event('elevenlabs-voice-open'));
          }
          setStatusNotice(null);
          isSwitchingRef.current = false;

          // Seamlessly auto-connect the new agent line
          setTimeout(() => {
            triggerElevenLabsCall();
          }, 350);
        }, 650);
      } else {
        setIsOpen(false);
        isOpenRef.current = false;
        remountWidget();
        setStatusNotice('Voice lines currently busy. Please connect via WhatsApp or Chat!');
        setTimeout(() => setStatusNotice(null), 4500);
        isSwitchingRef.current = false;
      }
    },
    [activeAgentId, agentList, isOnline, handleCallTermination, remountWidget]
  );

  // 3. Configure widget shadow DOM styling once attached
  useEffect(() => {
    let t1: NodeJS.Timeout;
    let t2: NodeJS.Timeout;

    const setup = () => {
      const widget = document.querySelector('elevenlabs-convai') as any;
      if (widget) {
        if (widget.shadowRoot) {
          injectStyleSafely(widget.shadowRoot);
          autoAcceptTermsSafely(widget.shadowRoot);
          setupShadowListeners(
            widget,
            () => handleCallTermination(false),
            () => switchToNextAgent(activeAgentId)
          );

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

    t1 = setTimeout(setup, 300);
    t2 = setTimeout(setup, 1000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [activeAgentId, switchToNextAgent, isOnline, handleCallTermination]);

  // 4. While open, keep styles active safely, auto-detect call start and clean call termination
  useEffect(() => {
    if (!isOpen) return;

    // Immediate initial styling and setup
    const runImmediateSetup = () => {
      const widget = document.querySelector('elevenlabs-convai') as any;
      if (!widget || !widget.shadowRoot) return;
      injectStyleSafely(widget.shadowRoot);
      autoAcceptTermsSafely(widget.shadowRoot);
      setupShadowListeners(
        widget,
        () => handleCallTermination(false),
        () => switchToNextAgent(activeAgentId)
      );
    };

    const immediateTimer1 = setTimeout(runImmediateSetup, 60);
    const immediateTimer2 = setTimeout(runImmediateSetup, 250);

    const interval = setInterval(() => {
      const widget = document.querySelector('elevenlabs-convai') as any;
      if (!widget || !widget.shadowRoot) return;

      const sr = widget.shadowRoot as ShadowRoot;
      injectStyleSafely(sr);
      autoAcceptTermsSafely(sr);
      setupShadowListeners(
        widget,
        () => handleCallTermination(false),
        () => switchToNextAgent(activeAgentId)
      );

      // Check if quota exhaustion occurred during call
      const text = (sr.textContent || '').toLowerCase();
      if (
        text.includes('quota limit') ||
        text.includes('quota_exceeded') ||
        text.includes('credit limit') ||
        text.includes('out of credits') ||
        text.includes('run out of credits')
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
          return t === 'end' || t === 'end call' || t.includes('ختم');
        });

      const hasFeedback = sr.querySelector(
        '[class*="feedback" i], [class*="inlineFeedback" i], [class*="evaluation" i], [class*="rating" i]'
      );
      const isEndedText =
        text.includes('conversation ended') ||
        text.includes('call ended') ||
        text.includes('call disconnected');

      if (endBtn) {
        hasCallStartedRef.current = true;
      } else if (hasCallStartedRef.current || hasFeedback || isEndedText) {
        // Active call finished: clean termination and revert button to black
        handleCallTermination(false);
      }
    }, 300);

    return () => {
      clearTimeout(immediateTimer1);
      clearTimeout(immediateTimer2);
      clearInterval(interval);
    };
  }, [isOpen, activeAgentId, switchToNextAgent, handleCallTermination]);

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
      let targetAgentId = activeAgentId;
      if (pool.has(activeAgentId)) {
        const next = agentList.find((id) => !pool.has(id));
        if (next && next !== activeAgentId) {
          targetAgentId = next;
          setActiveAgentId(next);
          try {
            localStorage.setItem(STORAGE_KEY, next);
          } catch {}
        }
      }

      if (!document.querySelector('script[src*="elevenlabs"]')) {
        const script = document.createElement('script');
        script.src = 'https://elevenlabs.io/convai-widget/index.js';
        script.async = true;
        document.body.appendChild(script);
      }

      // Ensure widget is mounted and fresh (if previously ended or missing)
      const currentWidget = widgetContainerRef.current?.querySelector('elevenlabs-convai') as any;
      const sr = currentWidget?.shadowRoot;
      const isDeadOrEnded =
        !currentWidget ||
        (sr &&
          (sr.querySelector('[class*="feedback" i], [class*="inlineFeedback" i]') ||
            (sr.textContent || '').toLowerCase().includes('conversation ended') ||
            (sr.textContent || '').toLowerCase().includes('call ended')));

      if (isDeadOrEnded || hasCallStartedRef.current) {
        remountWidget(targetAgentId);
      }

      hasCallStartedRef.current = false;
      callStartTimeRef.current = Date.now();
      isOpenRef.current = true;
      setIsOpen(true);
      window.dispatchEvent(new Event('elevenlabs-voice-open'));

      const widget = document.querySelector('elevenlabs-convai') as any;
      if (widget) {
        if (widget.shadowRoot) {
          injectStyleSafely(widget.shadowRoot);
          autoAcceptTermsSafely(widget.shadowRoot);
          setupShadowListeners(
            widget,
            () => handleCallTermination(false),
            () => switchToNextAgent(targetAgentId)
          );
        }
      }
    } else {
      handleClose();
    }
  };

  return (
    <>
      {/* ── Native ElevenLabs custom element (Persistent container prevents unmount and signal abort errors) ── */}
      <div
        className={`fixed inset-0 pointer-events-none z-[99990] transition-opacity duration-150 ${
          isOpen && isOnline ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          visibility: isOpen && isOnline ? 'visible' : 'hidden',
        }}
      >
        <div ref={widgetContainerRef} />
      </div>

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

      {/* ── 9TH PURE ELECTRIC BLUE SOUNDWAVE CAPSULE TELEPORT OVERLAY (1.5s DURATION) ── */}
      <AnimatePresence>
        {voiceTeleportOverlay?.visible && (
          <motion.div
            key="elevenlabs-voice-teleport-overlay"
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
