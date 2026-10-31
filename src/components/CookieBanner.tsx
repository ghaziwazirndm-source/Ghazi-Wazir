import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Cookie, X } from 'lucide-react';

const COOKIE_STORAGE_KEY = 'gw_cookie_consent_v1';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsAllowed, setAnalyticsAllowed] = useState(true);

  useEffect(() => {
    try {
      const consent = localStorage.getItem(COOKIE_STORAGE_KEY);
      if (!consent) {
        // Small delay for smooth entry
        const timer = setTimeout(() => setVisible(true), 1000);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const handleConsent = (accepted: boolean) => {
    try {
      const record = {
        accepted,
        analytics: accepted ? analyticsAllowed : false,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(record));
    } catch (e) {
      // ignore
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-[#14141d] border border-[#e8c872]/40 rounded-2xl p-5 shadow-2xl backdrop-blur-xl">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#1c1c28] border border-[#2a2a38] flex items-center justify-center flex-none">
            <Cookie className="w-5 h-5 text-[#e8c872]" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-[#f5f1e8] font-heading">
              Cookie & Data Privacy
            </h4>
            <p className="text-xs text-[#a8a7b3] mt-1 leading-relaxed">
              We use necessary cookies to maintain session security and optional analytical signals. See our{' '}
              <Link to="/cookie-policy" className="text-[#e8c872] underline hover:text-[#f5f1e8]">
                Cookie Policy
              </Link>{' '}
              for full details.
            </p>

            {showPreferences && (
              <div className="mt-3 p-3 bg-[#101018] rounded-xl border border-[#2a2a38] space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-[#f5f1e8]">Essential Cookies</span>
                    <p className="text-[10px] text-[#a8a7b3]">Security, CSRF & Command Center state</p>
                  </div>
                  <span className="text-[11px] font-bold text-[#4ade80]">Always On</span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-[#2a2a38]">
                  <div>
                    <span className="font-semibold text-[#f5f1e8]">Analytics & Signals</span>
                    <p className="text-[10px] text-[#a8a7b3]">Anonymous visitor navigation flow</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={analyticsAllowed}
                    onChange={e => setAnalyticsAllowed(e.target.checked)}
                    className="accent-[#e8c872] w-4 h-4 rounded cursor-pointer"
                  />
                </div>
              </div>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => handleConsent(true)}
                className="btn-gold px-4 py-2 rounded-full text-xs font-bold text-[#16120a]"
              >
                Accept All
              </button>
              <button
                type="button"
                onClick={() => handleConsent(false)}
                className="px-4 py-2 rounded-full border border-[#2a2a38] text-xs font-semibold text-[#f5f1e8] hover:bg-[#1c1c28] transition-colors"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => setShowPreferences(!showPreferences)}
                className="text-[11px] text-[#a8a7b3] hover:text-[#e8c872] underline ml-auto"
              >
                {showPreferences ? 'Hide Options' : 'Preferences'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
