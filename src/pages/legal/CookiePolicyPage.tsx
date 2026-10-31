import { SEOHead } from '../../components/SEOHead';
import { Cookie } from 'lucide-react';

export function CookiePolicyPage() {
  return (
    <>
      <SEOHead
        title="Cookie Policy — Ghazi Wazir | Bab Al-Khaleej & Back for Brand LLC"
        description="Comprehensive cookie policy explaining essential cookies, session storage, and analytical privacy."
        canonical="https://ghaziwazir.com/cookie-policy"
      />

      <div className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-left">
        <div className="space-y-3">
          <div className="tag inline-block">Privacy Standards</div>
          <h1 className="font-heading font-black text-3xl sm:text-4xl text-[#f5f1e8]">
            Cookie Policy
          </h1>
          <p className="text-xs text-[#a8a7b3]">
            How we manage cookies and local browser storage across our web platforms
          </p>
        </div>

        <div className="card-luxury p-8 sm:p-10 space-y-6 text-xs sm:text-sm text-[#a8a7b3] leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-heading font-bold text-lg text-[#f5f1e8]">1. What Are Cookies?</h2>
            <p>
              Cookies are small alphanumeric files placed on your device to maintain session state, verify authenticated logins, and understand how visitors navigate our web platforms.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading font-bold text-lg text-[#f5f1e8]">2. Categories of Cookies We Use</h2>
            <div className="space-y-3 pt-2">
              <div className="p-4 bg-[#101018] rounded-xl border border-[#2a2a38]">
                <strong className="text-[#f5f1e8] block mb-1">Essential & Session Security (Always Active)</strong>
                <p>Required for CSRF protection, secure authentication tokens, and maintaining your session in the CEO Command Center.</p>
              </div>

              <div className="p-4 bg-[#101018] rounded-xl border border-[#2a2a38]">
                <strong className="text-[#f5f1e8] block mb-1">Analytical & Preference Signals (Consent Based)</strong>
                <p>Used anonymously to assess which strategic guides and funnels generate the highest reader interest. Loaded only upon explicit user consent.</p>
              </div>
            </div>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading font-bold text-lg text-[#f5f1e8]">3. Managing Your Preferences</h2>
            <p>
              You can adjust your cookie consent banner preferences or purge local storage directly in your web browser settings at any time without degrading site performance.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
