'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { WifiOff, Wifi } from 'lucide-react';

export default function NetworkStatusBanner() {
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    if (typeof navigator !== 'undefined') return navigator.onLine;
    return true;
  });
  const [showReconnected, setShowReconnected] = useState(false);
  const [blockedNotice, setBlockedNotice] = useState<string | null>(null);
  const lastOnlineState = useRef<boolean>(true);
  const noticeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectTimerRef = useRef<NodeJS.Timeout | null>(null);

  const markOnline = useCallback((dispatch = true) => {
    if (lastOnlineState.current) return;
    lastOnlineState.current = true;
    setIsOnline(true);
    setBlockedNotice(null);
    if (noticeTimerRef.current) clearTimeout(noticeTimerRef.current);

    setShowReconnected(true);
    if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);
    reconnectTimerRef.current = setTimeout(() => setShowReconnected(false), 2500);

    if (dispatch && typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('app-network-status', { detail: { isOnline: true } }));
      window.dispatchEvent(new Event('online'));
    }
  }, []);

  const markOffline = useCallback((reasonMsg?: string, dispatch = true) => {
    if (!lastOnlineState.current) return;
    lastOnlineState.current = false;
    setIsOnline(false);
    setShowReconnected(false);
    if (dispatch && typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('app-network-status', { detail: { isOnline: false } }));
      window.dispatchEvent(new Event('offline'));
    }
    const msg = reasonMsg || 'Internet connection lost. You are offline.';
    setBlockedNotice(msg);
    if (noticeTimerRef.current) clearTimeout(noticeTimerRef.current);
    noticeTimerRef.current = setTimeout(() => {
      setBlockedNotice(null);
    }, 2800);
  }, []);

  useEffect(() => {
    // Initial sync with true browser online status
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      lastOnlineState.current = false;
      setIsOnline(false);
    }

    const handleBrowserOnline = () => {
      markOnline();
    };

    const handleBrowserOffline = () => {
      markOffline('Internet connection lost. You are offline.');
    };

    const handleActionBlocked = (e: any) => {
      const msg = e?.detail?.message || 'Active internet connection required for this feature.';
      setBlockedNotice(msg);
      if (noticeTimerRef.current) clearTimeout(noticeTimerRef.current);
      noticeTimerRef.current = setTimeout(() => {
        setBlockedNotice(null);
      }, 2800);
    };

    const handleAppNetwork = (e: any) => {
      if (typeof e?.detail?.isOnline === 'boolean') {
        if (e.detail.isOnline) {
          markOnline(false);
        } else {
          markOffline(e?.detail?.message || 'Internet connection lost. You are offline.', false);
        }
      }
    };

    window.addEventListener('online', handleBrowserOnline);
    window.addEventListener('offline', handleBrowserOffline);
    window.addEventListener('app-network-status', handleAppNetwork);
    window.addEventListener('app-action-blocked-offline', handleActionBlocked);

    return () => {
      window.removeEventListener('online', handleBrowserOnline);
      window.removeEventListener('offline', handleBrowserOffline);
      window.removeEventListener('app-network-status', handleAppNetwork);
      window.removeEventListener('app-action-blocked-offline', handleActionBlocked);
      if (noticeTimerRef.current) clearTimeout(noticeTimerRef.current);
      if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);
    };
  }, [markOnline, markOffline]);

  return (
    <div
      id="global-network-banner-container"
      className="fixed top-20 sm:top-24 inset-x-0 z-[99999999] flex flex-col items-center pointer-events-none px-3 sm:px-4 gap-2.5 select-none"
    >
      {/* ── 1. OFFLINE / DISCONNECTED TOAST (Positioned below Navbar, auto-dismissing in 2.8s) ── */}
      {blockedNotice && (
        <div className="pointer-events-auto flex items-center gap-2.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-rose-600 via-rose-500 to-red-600 text-white font-semibold text-xs sm:text-sm shadow-[0_12px_36px_rgba(225,29,72,0.55)] border border-rose-300/50 backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-top-2">
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
          </span>
          <WifiOff className="w-4 h-4 text-white shrink-0 drop-shadow-sm" />
          <span className="tracking-wide text-white drop-shadow-sm">{blockedNotice}</span>
        </div>
      )}

      {/* ── 2. RECONNECTED BADGE (Positioned below Navbar, green confirmation for 2.5s) ── */}
      {showReconnected && isOnline && (
        <div className="pointer-events-auto flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold text-xs sm:text-sm shadow-[0_12px_36px_rgba(16,185,129,0.5)] border border-emerald-300/50 backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-top-2">
          <Wifi className="w-4 h-4 text-white shrink-0 drop-shadow-sm" />
          <span className="tracking-wide text-white drop-shadow-sm">
            Back online! Real-time features restored.
          </span>
        </div>
      )}
    </div>
  );
}
