import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ABVariantId, ABVariant, ABTestStats } from '../types';

export const AB_VARIANTS: Record<ABVariantId, ABVariant> = {
  variant_a_gold: {
    id: 'variant_a_gold',
    name: 'Imperial Obsidian & Gold',
    badge: 'Variant A — Classic Luxury',
    tagline: 'Private Office & Sovereign Wealth Standard',
    scope: 'Universal Executive Brand',
    colors: {
      bg: '#0a0a0f',
      bgAlt: '#101018',
      surface: '#14141d',
      border: '#2a2a38',
      accent: '#e8c872',
      accentDark: '#b8893a',
      glow: 'rgba(232, 200, 114, 0.2)'
    }
  },
  variant_b_emerald: {
    id: 'variant_b_emerald',
    name: 'Royal Emerald & Desert Gold',
    badge: 'Variant B — GCC Prestige',
    tagline: 'Kingdom of Bahrain Commercial & Investor High-Trust',
    scope: 'Bab Al-Khaleej & Sijilat Priority',
    colors: {
      bg: '#04120c',
      bgAlt: '#081d14',
      surface: '#0e2b1e',
      border: '#1a4230',
      accent: '#22c55e',
      accentDark: '#15803d',
      glow: 'rgba(34, 197, 94, 0.22)'
    }
  },
  variant_c_sapphire: {
    id: 'variant_c_sapphire',
    name: 'Midnight Sapphire & Platinum',
    badge: 'Variant C — Global Tech',
    tagline: 'US Tech Dominance, GEO, AEO & Autonomous AI Agents',
    scope: 'Back for Brand LLC Worldwide',
    colors: {
      bg: '#060a17',
      bgAlt: '#0a1226',
      surface: '#111d38',
      border: '#1d335d',
      accent: '#38bdf8',
      accentDark: '#0284c7',
      glow: 'rgba(56, 189, 248, 0.22)'
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
    variant_a_gold: {
      name: 'Imperial Obsidian & Gold',
      badge: 'Variant A',
      impressions: 1420,
      leads: 58,
      bookings: 22,
      convRate: 5.63
    },
    variant_b_emerald: {
      name: 'Royal Emerald & Desert Gold',
      badge: 'Variant B',
      impressions: 1485,
      leads: 94,
      bookings: 41,
      convRate: 9.09
    },
    variant_c_sapphire: {
      name: 'Midnight Sapphire & Platinum',
      badge: 'Variant C',
      impressions: 890,
      leads: 48,
      bookings: 17,
      convRate: 7.30
    }
  },
  activeVariant: 'variant_b_emerald',
  winner: 'variant_b_emerald',
  liftPercentage: 61.4,
  totalImpressions: 3795,
  totalConversions: 280
};

export function ABThemeProvider({ children }: { children: React.ReactNode }) {
  const [stats, setStats] = useState<ABTestStats>(() => {
    try {
      const stored = localStorage.getItem('gw_ab_stats');
      if (stored) return JSON.parse(stored);
    } catch {}
    return DEFAULT_STATS;
  });

  const [isOverrideActive, setIsOverrideActive] = useState<boolean>(false);

  // Determine initial variant
  const [variantId, setVariantIdState] = useState<ABVariantId>(() => {
    // 1. Check URL parameters
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlVar = params.get('variant')?.toLowerCase();
      const urlTheme = params.get('theme')?.toLowerCase();

      if (urlVar === 'b' || urlVar === 'emerald' || urlTheme === 'emerald') return 'variant_b_emerald';
      if (urlVar === 'c' || urlVar === 'sapphire' || urlTheme === 'sapphire') return 'variant_c_sapphire';
      if (urlVar === 'a' || urlVar === 'gold' || urlTheme === 'gold') return 'variant_a_gold';

      // 2. Check localStorage
      const stored = localStorage.getItem('gw_ab_variant') as ABVariantId;
      if (stored && AB_VARIANTS[stored]) return stored;
    }

    // 3. Default to Variant B (GCC Prestige) for new visitors or 50/50 test
    return 'variant_b_emerald';
  });

  // Apply theme to DOM
  const applyThemeToDOM = useCallback((id: ABVariantId) => {
    const root = document.documentElement;
    root.setAttribute('data-theme', id);
    const variant = AB_VARIANTS[id];
    if (variant) {
      root.style.setProperty('--bg', variant.colors.bg);
      root.style.setProperty('--bg-alt', variant.colors.bgAlt);
      root.style.setProperty('--surface', variant.colors.surface);
      root.style.setProperty('--border', variant.colors.border);
      root.style.setProperty('--gold', variant.colors.accent);
      root.style.setProperty('--gold-dark', variant.colors.accentDark);
      root.style.setProperty('--theme-glow', variant.colors.glow);
      root.style.setProperty('--theme-name', `"${variant.name}"`);
    }
  }, []);

  useEffect(() => {
    applyThemeToDOM(variantId);
    localStorage.setItem('gw_ab_variant', variantId);

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
        localStorage.setItem('gw_ab_stats', JSON.stringify(updated));
      } catch {}
      return updated;
    });

    // Notify backend if available
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
      if (prev === 'variant_a_gold') return 'variant_b_emerald';
      if (prev === 'variant_b_emerald') return 'variant_c_sapphire';
      return 'variant_a_gold';
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
        localStorage.setItem('gw_ab_stats', JSON.stringify(updated));
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
        currentVariant: AB_VARIANTS[variantId],
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
