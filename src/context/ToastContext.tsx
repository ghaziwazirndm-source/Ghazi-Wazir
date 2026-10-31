import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { ToastItem, ToastOptions, ToastTheme } from '../types';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, Sparkles, X, Volume2, VolumeX } from 'lucide-react';

interface ToastContextValue {
  toasts: ToastItem[];
  showToast: (options: ToastOptions) => string;
  removeToast: (id: string) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  // Shorthands
  success: (title: string, message?: string, theme?: ToastTheme) => string;
  info: (title: string, message?: string, theme?: ToastTheme) => string;
  warning: (title: string, message?: string, theme?: ToastTheme) => string;
  error: (title: string, message?: string, theme?: ToastTheme) => string;
  themeToast: (theme: ToastTheme, title: string, message?: string) => string;
}

const ToastContext = createContext<ToastContextValue | null>(null);

function playExecutiveChime() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    // Subtle luxury 2-tone harp chime
    osc.frequency.setValueAtTime(659.25, ctx.currentTime); // E5
    osc.frequency.exponentialRampToValueAtTime(987.77, ctx.currentTime + 0.09); // B5

    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.36);
  } catch {
    // Browsers block audio until first user interaction; ignore silently
  }
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    return localStorage.getItem('gw_toast_sound') !== 'false';
  });

  const toggleSound = () => {
    setSoundEnabled(prev => {
      const next = !prev;
      localStorage.setItem('gw_toast_sound', String(next));
      return next;
    });
  };

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const showToast = useCallback((options: ToastOptions): string => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const toastItem: ToastItem = {
      ...options,
      id,
      theme: options.theme || (options.type === 'error' ? 'crimson' : options.type === 'warning' ? 'gold' : 'gold'),
      duration: options.duration ?? 5000,
      createdAt: Date.now()
    };

    setToasts(prev => [toastItem, ...prev.slice(0, 4)]); // max 5 toasts visible

    if (soundEnabled) {
      playExecutiveChime();
    }

    if (toastItem.duration && toastItem.duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, toastItem.duration);
    }

    return id;
  }, [soundEnabled, removeToast]);

  const success = useCallback((title: string, message?: string, theme: ToastTheme = 'emerald') => {
    return showToast({ title, message, type: 'success', theme });
  }, [showToast]);

  const info = useCallback((title: string, message?: string, theme: ToastTheme = 'sapphire') => {
    return showToast({ title, message, type: 'info', theme });
  }, [showToast]);

  const warning = useCallback((title: string, message?: string, theme: ToastTheme = 'gold') => {
    return showToast({ title, message, type: 'warning', theme });
  }, [showToast]);

  const error = useCallback((title: string, message?: string, theme: ToastTheme = 'crimson') => {
    return showToast({ title, message, type: 'error', theme });
  }, [showToast]);

  const themeToast = useCallback((theme: ToastTheme, title: string, message?: string) => {
    return showToast({ title, message, theme });
  }, [showToast]);

  return (
    <ToastContext.Provider
      value={{
        toasts,
        showToast,
        removeToast,
        soundEnabled,
        toggleSound,
        success,
        info,
        warning,
        error,
        themeToast
      }}
    >
      {children}
      <ToastContainer toasts={toasts} onDismiss={removeToast} soundEnabled={soundEnabled} toggleSound={toggleSound} />
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

// -------------------------------------------------------------
// Toast UI Container & Individual Toast Component
// -------------------------------------------------------------
function ToastContainer({
  toasts,
  onDismiss,
  soundEnabled,
  toggleSound
}: {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
}) {
  if (toasts.length === 0) return null;

  return (
    <aside
      aria-label="Notifications"
      className="fixed top-24 right-4 sm:right-6 z-50 flex flex-col gap-3 w-[calc(100vw-2rem)] max-w-sm pointer-events-none"
    >
      {/* Sound Controller Pill if toasts present */}
      <div className="flex justify-end pr-1 pointer-events-auto">
        <button
          type="button"
          onClick={toggleSound}
          className="px-2.5 py-1 rounded-full bg-[#14141d]/80 border border-[#2a2a38] text-[11px] text-[#a8a7b3] hover:text-[#f5f1e8] flex items-center gap-1.5 backdrop-blur-md transition-colors"
          title={soundEnabled ? 'Mute notification sound' : 'Enable notification sound'}
        >
          {soundEnabled ? <Volume2 className="w-3 h-3 text-[#e8c872]" /> : <VolumeX className="w-3 h-3 text-red-400" />}
          <span>{soundEnabled ? 'Audio Chime ON' : 'Audio Muted'}</span>
        </button>
      </div>

      {toasts.map(toast => (
        <ToastCard key={toast.id} toast={toast} onDismiss={() => onDismiss(toast.id)} />
      ))}
    </aside>
  );
}

function ToastCard({ toast, onDismiss }: { toast: ToastItem; onDismiss: () => void }) {
  const theme = toast.theme || 'gold';

  // Theming configurations
  const themeStyles = {
    gold: {
      border: 'border-[#38bdf8]/50 shadow-[0_0_25px_rgba(56,189,248,0.25)]',
      bg: 'bg-[#131d33]/95 backdrop-blur-xl',
      title: 'text-[#38bdf8]',
      accentBg: 'bg-gradient-to-r from-[#38bdf8] to-[#2563eb]',
      icon: <Sparkles className="w-5 h-5 text-[#38bdf8] shrink-0" />
    },
    emerald: {
      border: 'border-[#22c55e]/50 shadow-[0_0_20px_rgba(34,197,94,0.18)]',
      bg: 'bg-[#0d2218]/95 backdrop-blur-xl',
      title: 'text-[#4ade80]',
      accentBg: 'bg-gradient-to-r from-[#22c55e] to-[#15803d]',
      icon: <CheckCircle2 className="w-5 h-5 text-[#4ade80] shrink-0" />
    },
    sapphire: {
      border: 'border-[#38bdf8]/50 shadow-[0_0_20px_rgba(56,189,248,0.18)]',
      bg: 'bg-[#0c162e]/95 backdrop-blur-xl',
      title: 'text-[#38bdf8]',
      accentBg: 'bg-gradient-to-r from-[#38bdf8] to-[#0284c7]',
      icon: <Info className="w-5 h-5 text-[#38bdf8] shrink-0" />
    },
    crimson: {
      border: 'border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.18)]',
      bg: 'bg-[#210c0e]/95 backdrop-blur-xl',
      title: 'text-red-400',
      accentBg: 'bg-gradient-to-r from-red-500 to-rose-700',
      icon: <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
    }
  }[theme];

  return (
    <div
      role="alert"
      className={`pointer-events-auto toast-enter relative overflow-hidden rounded-xl border ${themeStyles.border} ${themeStyles.bg} p-4 shadow-2xl transition-all`}
    >
      <div className="flex items-start gap-3">
        {themeStyles.icon}
        <div className="flex-1 min-w-0 pr-2">
          <h4 className={`text-sm font-semibold tracking-wide ${themeStyles.title}`}>{toast.title}</h4>
          {toast.message && (
            <p className="mt-1 text-xs text-[#a8a7b3] leading-relaxed line-clamp-2">{toast.message}</p>
          )}

          {toast.action && (
            <div className="mt-2.5">
              <button
                type="button"
                onClick={() => {
                  toast.action?.onClick();
                  onDismiss();
                }}
                className="text-xs font-semibold px-2.5 py-1 rounded bg-[#1c1c28] border border-[#2a2a38] text-[#f5f1e8] hover:text-[#e8c872] hover:border-[#e8c872]/40 transition-colors"
              >
                {toast.action.label}
              </button>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={onDismiss}
          className="text-[#a8a7b3] hover:text-[#f5f1e8] transition-colors p-1 rounded-md"
          aria-label="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Progress Bar Animation */}
      {toast.duration && toast.duration > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2a2a38]">
          <div
            className={`h-full ${themeStyles.accentBg}`}
            style={{
              animation: `shrink-progress ${toast.duration}ms linear forwards`
            }}
          />
        </div>
      )}
    </div>
  );
}
