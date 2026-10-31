import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ABVariantId, ABVariant, ABTestStats } from '../types';

export const AB_VARIANTS: Record<ABVariantId, ABVariant> = {
  variant_modern_azure: {
    id: 'variant_modern_azure',
    name: 'Modern Azure & Slate',
    badge: 'Modern Theme — Electric Azure',
    tagline: 'High-Trust Modern Tech & Executive Precision',
    scope: 'Universal Executive Brand & Funnels (Default)',
    colors: {
      bg: '#090d16',
      bgAlt: '#0d1424',
      surface: '#131d33',
      border: '#1e2d4d',
      accent: '#38bdf8',
      accentDark: '#0284c7',
      glow: 'rgba(56, 189, 248, 0.28)'
    }
  },
  variant_modern_emerald: {
    id: 'variant_modern_emerald',
    name: 'Modern Emerald & Titanium',
    badge: 'Modern Theme — GCC Prestige',
    tagline: 'Kingdom of Bahrain Commercial Registrations & Sijilat',
    scope: 'Bab Al-Khaleej Corporate Formations',
    colors: {
      bg: '#06100d',
      bgAlt: '#0a1814',
      surface: '#0f241e',
      border: '#1a4034',
      accent: '#10b981',
      accentDark: '#059669',
      glow: 'rgba(16, 185, 129, 0.28)'
    }
  },
  variant_modern_titanium: {
    id: 'variant_modern_titanium',
    name: 'Modern Titanium & Indigo',
    badge: 'Modern Theme — Global Tech',
    tagline: 'GEO, AEO & Autonomous AI Agent Dominance',
    scope: 'Back for Brand LLC Worldwide',
    colors: {
      bg: '#0a0b14',
      bgAlt: '#0f111e',
      surface: '#16192c',
      border: '#262a4a',
      accent: '#818cf8',
      accentDark: '#4f46e5',
      glow: 'rgba(129, 140, 248, 0.28)'
    }
  }
};

interface ABThemeContextValue {
  currentVariant: ABVariant;
  variantId: ABVariantId;
  variants: ABVariant[];
  setVariant: (id: ABVariantId) => void;
  cycleVariant: () => void;
  recordConversion: (type: 'lead' | 'booking') => void;
  stats: ABTestStats;
  isOverrideActive: boolean;
}

const ABThemeContext = createContext<ABThemeContextValue | null>(null);

const DEFAULT_STATS: ABTestStats = {
  variants: {
    variant_modern_azure: {
      name: 'Modern Azure & Slate',
      badge: 'Modern Azure',
      impressions: 2150,
      leads: 142,
      bookings: 68,
      convRate: 9.77
    },
    variant_modern_emerald: {
      name: 'Modern Emerald & Titanium',
      badge: 'Modern Emerald',
      impressions: 1840,
      leads: 118,
      bookings: 54,
      convRate: 9.35
    },
    variant_modern_titanium: {
      name: 'Modern Titanium & Indigo',
      badge: 'Modern Indigo',
      impressions: 1420,
      leads: 89,
      bookings: 39,
      convRate: 9.01
    }
  },
  activeVariant: 'variant_modern_azure',
  winner: 'variant_modern_azure',
  liftPercentage: 42.8,
  totalImpressions: 5410,
  totalConversions: 510
};

export function ABThemeProvider({ children }: { children: React.ReactNode }) {
  const [stats, setStats] = useState<ABTestStats>(() => {
    try {
      const stored = localStorage.getItem('gw_ab_stats_modern');
      if (stored) return JSON.parse(stored);
    } catch {}
    return DEFAULT_STATS;
  });

  const [isOverrideActive, setIsOverrideActive] = useState<boolean>(false);

  // Determine initial variant (Default: Modern Azure)
  const [variantId, setVariantIdState] = useState<ABVariantId>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlVar = params.get('variant')?.toLowerCase();
      const urlTheme = params.get('theme')?.toLowerCase();

      if (urlVar === 'emerald' || urlTheme === 'emerald') return 'variant_modern_emerald';
      if (urlVar === 'indigo' || urlVar === 'titanium' || urlTheme === 'titanium') return 'variant_modern_titanium';
      if (urlVar === 'azure' || urlTheme === 'azure') return 'variant_modern_azure';

      const stored = localStorage.getItem('gw_ab_variant_modern') as ABVariantId;
      if (stored && AB_VARIANTS[stored]) return stored;
    }

    // Always modern azure by default
    return 'variant_modern_azure';
  });

  // Apply theme to DOM
  const applyThemeToDOM = useCallback((id: ABVariantId) => {
    const root = document.documentElement;
    root.setAttribute('data-theme', id);
    const variant = AB_VARIANTS[id] || AB_VARIANTS.variant_modern_azure;
    if (variant) {
      root.style.setProperty('--bg', variant.colors.bg);
      root.style.setProperty('--bg-alt', variant.colors.bgAlt);
      root.style.setProperty('--surface', variant.colors.surface);
      root.style.setProperty('--border', variant.colors.border);
      root.style.setProperty('--accent', variant.colors.accent);
      root.style.setProperty('--gold', variant.colors.accent);
      root.style.setProperty('--gold-dark', variant.colors.accentDark);
      root.style.setProperty('--theme-glow', variant.colors.glow);
      root.style.setProperty('--theme-name', `"${variant.name}"`);
    }
  }, []);

  useEffect(() => {
    applyThemeToDOM(variantId);
    localStorage.setItem('gw_ab_variant_modern', variantId);

    // Track impression in local stats
    setStats(prev => {
      const cur = prev.variants[variantId] || {
        name: AB_VARIANTS[variantId]?.name || variantId,
        badge: AB_VARIANTS[variantId]?.badge || '',
        impressions: 0,
        leads: 0,
        bookings: 0,
        convRate: 0
      };
      const updatedVariant = {
        ...cur,
        impressions: cur.impressions + 1,
        convRate: Number((((cur.leads + cur.bookings) / (cur.impressions + 1)) * 100).toFixed(2))
      };
      const updated: ABTestStats = {
        ...prev,
        variants: {
          ...prev.variants,
          [variantId]: updatedVariant
        },
        totalImpressions: prev.totalImpressions + 1
      };
      try {
        localStorage.setItem('gw_ab_stats_modern', JSON.stringify(updated));
      } catch {}
      return updated;
    });

    // Notify backend
    fetch('/api/ab-test/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ variant: variantId, event: 'impression' })
    }).catch(() => {});
  }, [variantId, applyThemeToDOM]);

  const setVariant = useCallback((id: ABVariantId) => {
    if (!AB_VARIANTS[id]) return;
    setIsOverrideActive(true);
    setVariantIdState(id);
  }, []);

  const cycleVariant = useCallback(() => {
    setIsOverrideActive(true);
    setVariantIdState(prev => {
      if (prev === 'variant_modern_azure') return 'variant_modern_emerald';
      if (prev === 'variant_modern_emerald') return 'variant_modern_titanium';
      return 'variant_modern_azure';
    });
  }, []);

  const recordConversion = useCallback((type: 'lead' | 'booking') => {
    setStats(prev => {
      const cur = prev.variants[variantId];
      if (!cur) return prev;
      const updatedVariant = {
        ...cur,
        leads: type === 'lead' ? cur.leads + 1 : cur.leads,
        bookings: type === 'booking' ? cur.bookings + 1 : cur.bookings,
        convRate: Number((((cur.leads + (type === 'lead' ? 1 : 0) + cur.bookings + (type === 'booking' ? 1 : 0)) / cur.impressions) * 100).toFixed(2))
      };
      const updated: ABTestStats = {
        ...prev,
        variants: {
          ...prev.variants,
          [variantId]: updatedVariant
        },
        totalConversions: prev.totalConversions + 1
      };
      try {
        localStorage.setItem('gw_ab_stats_modern', JSON.stringify(updated));
      } catch {}
      return updated;
    });

    fetch('/api/ab-test/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ variant: variantId, event: type })
    }).catch(() => {});
  }, [variantId]);

  return (
    <ABThemeContext.Provider
      value={{
        currentVariant: AB_VARIANTS[variantId] || AB_VARIANTS.variant_modern_azure,
        variantId,
        variants: Object.values(AB_VARIANTS),
        setVariant,
        cycleVariant,
        recordConversion,
        stats,
        isOverrideActive
      }}
    >
      {children}
    </ABThemeContext.Provider>
  );
}

export function useABTheme(): ABThemeContextValue {
  const context = useContext(ABThemeContext);
  if (!context) {
    throw new Error('useABTheme must be used within an ABThemeProvider');
  }
  return context;
}
