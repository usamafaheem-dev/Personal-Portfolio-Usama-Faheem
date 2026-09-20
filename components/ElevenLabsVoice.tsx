'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';

// Pool of 8 ElevenLabs Agent IDs for automatic monthly credit pooling (8 x 10k = 80k credits)
const DEFAULT_AGENT_IDS = [
  'agent_9701m2zt455hemjbp84p9yk89dnk',
  'agent_3401m2ztp1svfz7r8b4ejrzf823w',
  'agent_7601m2zv2rayfxnr3q0mj1s3xwq1',
  'agent_5701m2zvfkwpf6tbcwxd2gbr3d56',
  'agent_9401m2zt1218fee9vf15j6ykam2y',
  'agent_6101m2zvqra0e6ebkbzennsyak2d',
  'agent_7201m2zwkz4gf0gb1jefce2ac6wp',
  'agent_3601m2w6eyzjeyybxv6a6yva3mk0',
];

const STORAGE_KEY = 'elevenlabs_active_agent_index';

export function triggerElevenLabsCall() {
  const widget = document.querySelector('elevenlabs-convai');
  if (!widget) return;
  if (widget.shadowRoot) {
    const btn = widget.shadowRoot.querySelector('button');
    if (btn) btn.click();
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
  }

  /* ═══ EXPANDED PANEL ═══ */
  .sheet {
    max-height: 60vh !important;
    max-width: min(380px, calc(100vw - 48px)) !important;
    border-radius: 16px !important;
    box-shadow: 0 8px 32px rgba(0,0,0,0.2) !important;
  }

  /* ═══ ANIMATIONS ═══ */
  @keyframes el-bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
  }
  @keyframes el-glow {
    0%, 100% { box-shadow: 0 0 6px 2px rgba(59, 130, 246, 0.6); opacity: 1; }
    50% { box-shadow: 0 0 12px 4px rgba(59, 130, 246, 0.9); opacity: 0.8; }
  }
`;

function autoAcceptTerms(sr: ShadowRoot) {
  const obs = new MutationObserver(() => {
    const buttons = sr.querySelectorAll('button');
    for (const btn of buttons) {
      if (btn.textContent?.includes('قبول') || btn.textContent?.includes('Accept')) {
        btn.click();
        obs.disconnect();
        return;
      }
    }
  });
  obs.observe(sr, { childList: true, subtree: true });
}

function injectStyle(sr: ShadowRoot): boolean {
  if (!sr.querySelector('[data-custom-style]')) {
    const style = document.createElement('style');
    style.setAttribute('data-custom-style', '');
    style.textContent = WIDGET_CSS;
    sr.appendChild(style);
  }
  return true;
}

function isSheetOpen(sr: ShadowRoot): boolean {
  const sheet = sr.querySelector('.sheet') as HTMLElement | null;
  if (!sheet) return false;
  if (sheet.hasAttribute('data-hidden')) return false;
  if (sheet.style.display === 'none') return false;
  return sheet.offsetWidth > 50 && sheet.offsetHeight > 50;
}

/**
 * Minimal approach: find the compact wrapper (not the expanded call panel),
 * force it into a 44px dark circle, hide only avatar/text siblings,
 * and handle toggling so re-clicking closes the panel instead of restarting the voice.
 */
function enforceCompactCircle(sr: ShadowRoot) {
  const attachToggleInterception = (compact: HTMLElement) => {
    if (compact.hasAttribute('data-toggle-attached')) return;
    compact.setAttribute('data-toggle-attached', 'true');

    // Intercept click in CAPTURE phase so it doesn't trigger ElevenLabs startSession
    compact.addEventListener(
      'click',
      (e) => {
        if (isSheetOpen(sr)) {
          // Sheet is open: close it instead of restarting voice!
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          const evt = new CustomEvent('elevenlabs-agent:expand', {
            detail: { action: 'collapse' },
            bubbles: true,
            composed: true,
          });
          document.dispatchEvent(evt);
          if (sr.host) sr.host.dispatchEvent(evt);
          sr.dispatchEvent(evt);
        }
      },
      true // Capture phase
    );
  };

  const enforce = () => {
    const sheet = sr.querySelector('.sheet') as HTMLElement | null;
    const sheetOpen = isSheetOpen(sr);

    // Find the compact widget container (old or new layout)
    const compact = (
      sr.querySelector('.rounded-compact-sheet') ||
      sr.querySelector('.rounded-sheet:not(.sheet)')
    ) as HTMLElement | null;
    if (!compact) return;

    // Attach click interceptor to compact
    attachToggleInterception(compact);

    // Force circle shape on the compact wrapper
    Object.assign(compact.style, {
      width: '44px',
      height: '44px',
      minWidth: '44px',
      minHeight: '44px',
      maxWidth: '44px',
      maxHeight: '44px',
      borderRadius: '50%',
      background: '#0f172a',
      border: '1px solid #334155',
      padding: '0',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      cursor: 'pointer',
      boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
      animation: sheetOpen ? 'none' : 'el-bounce 2.5s ease-in-out infinite',
      transition: 'transform 0.2s ease, background 0.2s ease',
    });

    // Dynamic icon container inside the circle
    let iconContainer = compact.querySelector('[data-custom-icon]') as HTMLElement | null;
    if (!iconContainer) {
      iconContainer = document.createElement('div');
      iconContainer.setAttribute('data-custom-icon', '');
      iconContainer.style.cssText = `
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        width: 100% !important;
        height: 100% !important;
        position: absolute !important;
        inset: 0 !important;
        pointer-events: none !important;
        z-index: 10 !important;
      `;
      compact.appendChild(iconContainer);
    }

    // Set icon based on whether panel is open or closed
    if (sheetOpen) {
      // When open: Chevron Down arrow to indicate "Click to collapse/minimize"
      iconContainer.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:block;">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      `;
    } else {
      // When closed: Phone icon to indicate "Click to call"
      iconContainer.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      `;
    }

    // Hide any raw text/span children in compact to prevent overflowing
    Array.from(compact.children).forEach((child) => {
      const el = child as HTMLElement;
      if (el.tagName === 'STYLE' || el === iconContainer || el.hasAttribute('data-glow-dot')) return;
      el.style.setProperty('display', 'none', 'important');
    });

    // Glowing blue dot (only when closed)
    let dot = compact.querySelector('[data-glow-dot]') as HTMLElement | null;
    if (!dot) {
      dot = document.createElement('div');
      dot.setAttribute('data-glow-dot', '');
      dot.style.cssText = `
        position: absolute !important;
        top: -2px !important;
        right: -2px !important;
        width: 10px !important;
        height: 10px !important;
        background: #3b82f6 !important;
        border-radius: 50% !important;
        z-index: 20 !important;
        animation: el-glow 1.5s ease-in-out infinite !important;
        box-shadow: 0 0 6px 2px rgba(59, 130, 246, 0.6) !important;
        pointer-events: none !important;
      `;
      compact.appendChild(dot);
    }
    dot.style.display = sheetOpen ? 'none' : 'block';

    // In the sheet header: add a matching minimize/collapse arrow button next to the expand button
    if (sheetOpen && sheet) {
      let headerCollapseBtn = sheet.querySelector('[data-header-collapse]') as HTMLElement | null;
      if (!headerCollapseBtn) {
        const expandBtn =
          sheet.querySelector('button[aria-label="Expand widget"]') ||
          sheet.querySelector('button[aria-label="سکیڑیں"]') ||
          sheet.querySelector('button:has(svg)');
        if (expandBtn && expandBtn.parentElement) {
          headerCollapseBtn = document.createElement('button');
          headerCollapseBtn.setAttribute('data-header-collapse', '');
          headerCollapseBtn.setAttribute('aria-label', 'Collapse panel');
          headerCollapseBtn.style.cssText = `
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            width: 32px !important;
            height: 32px !important;
            border-radius: 8px !important;
            border: 1px solid #e2e8f0 !important;
            background: #ffffff !important;
            color: #0f172a !important;
            cursor: pointer !important;
            margin-right: 6px !important;
            padding: 0 !important;
            transition: all 0.2s ease !important;
          `;
          headerCollapseBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:block;">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          `;
          headerCollapseBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const evt = new CustomEvent('elevenlabs-agent:expand', {
              detail: { action: 'collapse' },
              bubbles: true,
              composed: true,
            });
            document.dispatchEvent(evt);
            if (sr.host) sr.host.dispatchEvent(evt);
            sr.dispatchEvent(evt);
          });
          expandBtn.parentElement.insertBefore(headerCollapseBtn, expandBtn);
        }
      }
    }
  };

  // Run immediately, then watch for changes, and poll as backup
  enforce();
  const obs = new MutationObserver(enforce);
  obs.observe(sr, { childList: true, subtree: true });
  setInterval(enforce, 800);
}

export default function ElevenLabsVoice() {
  const scriptLoaded = useRef(false);
  const [agentIndex, setAgentIndex] = useState(0);

  // Parse agent list from env or fallback to provided pool
  const agentList = useMemo(() => {
    const envList = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_IDS;
    if (envList && envList.trim()) {
      const parsed = envList.split(',').map((s) => s.trim()).filter(Boolean);
      if (parsed.length > 0) return parsed;
    }
    return DEFAULT_AGENT_IDS;
  }, []);

  // Initialize from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved !== null) {
        const idx = parseInt(saved, 10);
        if (!isNaN(idx) && idx >= 0 && idx < agentList.length) {
          setAgentIndex(idx);
        }
      }
    } catch {
      // Ignore localStorage errors in restricted environments
    }
  }, [agentList]);

  // Fallback to next agent if current one exhausts limit or fails
  const switchToNextAgent = useCallback(() => {
    setAgentIndex((prev) => {
      const next = (prev + 1) % agentList.length;
      try {
        localStorage.setItem(STORAGE_KEY, String(next));
      } catch {
        // Ignore
      }
      console.warn(`[ElevenLabs] Quota exceeded or error encountered. Switched to next agent (${next + 1}/${agentList.length}): ${agentList[next]}`);
      return next;
    });
  }, [agentList]);

  // Load widget script once
  useEffect(() => {
    if (scriptLoaded.current) return;
    if (document.querySelector('script[src*="convai-widget-embed"]')) {
      scriptLoaded.current = true;
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
    script.async = true;
    script.type = 'text/javascript';
    document.body.appendChild(script);
    scriptLoaded.current = true;
  }, []);

  const activeAgentId = agentList[agentIndex] || DEFAULT_AGENT_IDS[0];

  // Watch widget shadow root and events for quota limits and errors
  useEffect(() => {
    let interval: NodeJS.Timeout;
    let observer: MutationObserver;
    let shadowObserver: MutationObserver | null = null;
    let isCleanedUp = false;

    const errorKeywords = [
      'quota',
      'limit reached',
      'usage limit',
      'insufficient credit',
      'conversation limit',
      'rate limit',
      'agent unavailable',
      'failed to connect',
    ];

    function checkShadowErrors(sr: ShadowRoot): boolean {
      const text = (sr.textContent || '').toLowerCase();
      for (const kw of errorKeywords) {
        if (text.includes(kw)) {
          switchToNextAgent();
          return true;
        }
      }
      return false;
    }

    function setupWidget(el: Element): boolean {
      if (!el.shadowRoot) return false;
      const sr = el.shadowRoot;

      injectStyle(sr);
      enforceCompactCircle(sr);
      autoAcceptTerms(sr);

      // Check for immediate quota error in text
      if (checkShadowErrors(sr)) return true;

      // Observe shadow root changes for error or quota banners
      shadowObserver = new MutationObserver(() => {
        if (!isCleanedUp) {
          checkShadowErrors(sr);
        }
      });
      shadowObserver.observe(sr, { childList: true, subtree: true, characterData: true });

      // Listen for custom widget error events
      const handleErrorEvent = (e: any) => {
        console.warn('[ElevenLabs] Widget error event:', e);
        switchToNextAgent();
      };

      el.addEventListener('elevenlabs-convai:error', handleErrorEvent);
      el.addEventListener('error', handleErrorEvent);

      return true;
    }

    function tryInit(): boolean {
      const el = document.querySelector('elevenlabs-convai');
      if (el && setupWidget(el)) return true;
      return false;
    }

    if (!tryInit()) {
      interval = setInterval(() => {
        if (tryInit()) {
          clearInterval(interval);
          if (observer) observer.disconnect();
        }
      }, 400);

      observer = new MutationObserver(() => {
        if (tryInit()) {
          clearInterval(interval);
          observer.disconnect();
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }

    // Handle outside clicks to collapse the panel when open
    const handleOutsideClick = (e: MouseEvent) => {
      const widget = document.querySelector('elevenlabs-convai');
      if (!widget) return;
      const target = e.target as Node | null;
      if (target && !widget.contains(target)) {
        if (widget.shadowRoot && isSheetOpen(widget.shadowRoot)) {
          const evt = new CustomEvent('elevenlabs-agent:expand', {
            detail: { action: 'collapse' },
            bubbles: true,
            composed: true,
          });
          document.dispatchEvent(evt);
          widget.dispatchEvent(evt);
          widget.shadowRoot.dispatchEvent(evt);
        }
      }
    };
    document.addEventListener('click', handleOutsideClick, true);

    return () => {
      isCleanedUp = true;
      document.removeEventListener('click', handleOutsideClick, true);
      if (interval) clearInterval(interval);
      if (observer) observer.disconnect();
      if (shadowObserver) shadowObserver.disconnect();
    };
  }, [activeAgentId, switchToNextAgent]);

  return (
    <div
      key={`elevenlabs-${activeAgentId}`}
      dangerouslySetInnerHTML={{
        __html: `<elevenlabs-convai agent-id="${activeAgentId}"></elevenlabs-convai>`,
      }}
    />
  );
}
