import { useState } from 'react';
import { useABTheme } from '../context/ABThemeContext';
import { useToast } from '../context/ToastContext';
import { ABVariantId } from '../types';
import { Palette, Sparkles, Check, ChevronUp, ChevronDown, Volume2, VolumeX, BarChart3, Bell, X, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export function ABThemeSwitcher() {
  const { currentVariant, variantId, variants, setVariant, stats } = useABTheme();
  const { showToast, soundEnabled, toggleSound, themeToast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectVariant = (id: ABVariantId) => {
    setVariant(id);
    const target = variants.find(v => v.id === id);
    if (target) {
      const toastTheme = id === 'variant_b_emerald' ? 'emerald' : id === 'variant_c_sapphire' ? 'sapphire' : 'gold';
      themeToast(toastTheme, `A/B Theme Switched: ${target.name}`, `Now previewing ${target.badge}. Conversions and impressions are tracked.`);
    }
  };

  const handleTestToast = (theme: 'gold' | 'emerald' | 'sapphire' | 'crimson') => {
    if (theme === 'emerald') {
      showToast({
        title: 'Bahrain CR Application Approved',
        message: 'Bab Al-Khaleej has expedited Sijilat Commercial Registration approval with NPRA clearance.',
        theme: 'emerald',
        type: 'success',
        duration: 5000,
        action: {
          label: 'View Dossier',
          onClick: () => {}
        }
      });
    } else if (theme === 'sapphire') {
      showToast({
        title: 'GEO & AEO Citation Ingested',
        message: 'Back for Brand semantic entities indexed in Google Gemini & Perplexity answer engines.',
        theme: 'sapphire',
        type: 'info',
        duration: 5000
      });
    } else if (theme === 'crimson') {
      showToast({
        title: 'Security Alert: Prompt Injection Blocked',
        message: 'WAF & AI Agent Firewall intercepted untrusted payload; zero breach detected.',
        theme: 'crimson',
        type: 'error',
        duration: 5000
      });
    } else {
      showToast({
        title: 'High-Ticket Consultation Reserved',
        message: 'CEO VIP consultation confirmed for Bahrain CR & Global Technology Funnels.',
        theme: 'gold',
        type: 'warning',
        duration: 5000
      });
    }
  };

  return (
    <aside aria-label="A/B theme switcher" className="fixed bottom-5 left-5 z-40">
      {/* Floating Pill Trigger */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#14141d]/90 hover:bg-[#1a1a28] border border-[#2a2a38] hover:border-[#e8c872]/60 backdrop-blur-xl shadow-2xl transition-all hover:scale-105 text-left"
          title="Open A/B Theme & Toast Controller"
        >
          <div
            className="w-3.5 h-3.5 rounded-full border border-white/40 shadow-sm transition-transform group-hover:scale-110"
            style={{ backgroundColor: currentVariant.colors.accent }}
          />
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#a8a7b3] group-hover:text-[#e8c872] transition-colors flex items-center gap-1">
              <span>A/B TEST ACTIVE</span>
              <Palette className="w-3 h-3 text-[#e8c872]" />
            </span>
            <span className="text-xs font-semibold text-[#f5f1e8] truncate max-w-[150px]">
              {currentVariant.name}
            </span>
          </div>
          <ChevronUp className="w-3.5 h-3.5 text-[#a8a7b3] group-hover:text-[#f5f1e8]" />
        </button>
      )}

      {/* Expanded Modal / Glass Card */}
      {isOpen && (
        <div className="w-[340px] sm:w-[380px] p-4 rounded-2xl bg-[#14141d]/98 border border-[#2a2a38] shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-2xl animate-in fade-in slide-in-from-bottom-3 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#2a2a38]">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-[#e8c872]" />
              <div>
                <h4 className="text-xs font-bold text-[#f5f1e8] uppercase tracking-wider">A/B Testing Theme Engine</h4>
                <p className="text-[10px] text-[#a8a7b3]">Live Split-Test & Toast Experience</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-[#a8a7b3] hover:text-[#f5f1e8] hover:bg-[#1a1a26] transition-colors"
              aria-label="Close theme switcher"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Theme Variant Options */}
          <div className="mt-3 space-y-2">
            <div className="text-[11px] font-bold text-[#a8a7b3] uppercase tracking-wider flex items-center justify-between">
              <span>Select Active Variant</span>
              <span className="text-[10px] text-[#4ade80] font-mono">
                {stats.variants[variantId]?.convRate}% Conv.
              </span>
            </div>

            {variants.map(v => {
              const isSelected = v.id === variantId;
              const isWinner = stats.winner === v.id;
              const vStats = stats.variants[v.id];

              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => handleSelectVariant(v.id)}
                  className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                    isSelected
                      ? 'border-[#e8c872] bg-[#1a1a28] shadow-[0_0_15px_rgba(232,200,114,0.15)]'
                      : 'border-[#2a2a38] bg-[#101018] hover:border-[#3a3a4e] hover:bg-[#141420]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-5 h-5 rounded-lg border border-white/20 flex items-center justify-center shrink-0 shadow-sm"
                      style={{ backgroundColor: v.colors.surface }}
                    >
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: v.colors.accent }}
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-[#f5f1e8]">{v.name}</span>
                        {isWinner && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-[#1c3322] text-[#4ade80] border border-[#4ade80]/40">
                            LEADER
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-[#a8a7b3] block line-clamp-1">{v.scope}</span>
                    </div>
                  </div>

                  <div className="text-right pl-2">
                    {isSelected ? (
                      <Check className="w-4 h-4 text-[#e8c872]" />
                    ) : (
                      <span className="text-[10px] font-mono text-[#a8a7b3]">{vStats?.convRate || 0}%</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Toast Notification Showcase */}
          <div className="mt-4 pt-3 border-t border-[#2a2a38]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-[#a8a7b3] uppercase tracking-wider flex items-center gap-1">
                <Bell className="w-3 h-3 text-[#e8c872]" />
                <span>Test Toast Themes</span>
              </span>
              <button
                type="button"
                onClick={toggleSound}
                className="text-[10px] text-[#a8a7b3] hover:text-[#f5f1e8] flex items-center gap-1"
                title="Toggle Chime Sound"
              >
                {soundEnabled ? <Volume2 className="w-3 h-3 text-[#e8c872]" /> : <VolumeX className="w-3 h-3 text-red-400" />}
                <span>{soundEnabled ? 'Chime ON' : 'Muted'}</span>
              </button>
            </div>

            <div className="grid grid-cols-4 gap-1.5">
              <button
                type="button"
                onClick={() => handleTestToast('gold')}
                className="px-2 py-1.5 rounded-lg bg-[#1a1710] border border-[#e8c872]/40 hover:border-[#e8c872] text-[10px] font-semibold text-[#e8c872] transition-colors text-center"
              >
                Gold
              </button>
              <button
                type="button"
                onClick={() => handleTestToast('emerald')}
                className="px-2 py-1.5 rounded-lg bg-[#0c1f15] border border-[#22c55e]/40 hover:border-[#22c55e] text-[10px] font-semibold text-[#4ade80] transition-colors text-center"
              >
                Emerald
              </button>
              <button
                type="button"
                onClick={() => handleTestToast('sapphire')}
                className="px-2 py-1.5 rounded-lg bg-[#0b172a] border border-[#38bdf8]/40 hover:border-[#38bdf8] text-[10px] font-semibold text-[#38bdf8] transition-colors text-center"
              >
                Sapphire
              </button>
              <button
                type="button"
                onClick={() => handleTestToast('crimson')}
                className="px-2 py-1.5 rounded-lg bg-[#240c0f] border border-red-500/40 hover:border-red-500 text-[10px] font-semibold text-red-400 transition-colors text-center"
              >
                Crimson
              </button>
            </div>
          </div>

          {/* Footer stats & link */}
          <div className="mt-3.5 pt-2.5 border-t border-[#2a2a38] flex items-center justify-between text-[11px]">
            <span className="text-[#a8a7b3]">
              Split sample: <strong className="text-[#f5f1e8]">{stats.totalImpressions}</strong> visits
            </span>
            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              className="text-[#e8c872] hover:underline font-semibold flex items-center gap-1"
            >
              <BarChart3 className="w-3 h-3" />
              <span>Full A/B Matrix →</span>
            </Link>
          </div>
        </div>
      )}
    </aside>
  );
}
