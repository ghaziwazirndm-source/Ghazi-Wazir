import { Link } from 'react-router-dom';
import { SEOHead } from '../../components/SEOHead';
import { ShieldCheck, AlertCircle } from 'lucide-react';

export function PrivacyPolicyPage() {
  return (
    <>
      <SEOHead
        title="Privacy Policy — Ghazi Wazir | Bab Al-Khaleej & Back for Brand LLC"
        description="Official privacy policy governing data handling, PII protection, and inquiry processing for Ghazi Wazir's consultancies."
        canonical="https://ghaziwazir.com/privacy-policy"
      />

      <div className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-left">
        <div className="space-y-3">
          <div className="tag inline-block">Legal Documentation</div>
          <h1 className="font-heading font-black text-3xl sm:text-4xl text-[#f5f1e8]">
            Privacy Policy
          </h1>
          <p className="text-xs text-[#a8a7b3]">
            Last updated: October 2026 &middot; Applies to Bab Al-Khaleej (Bahrain) & Back for Brand LLC (USA)
          </p>
        </div>

        <div className="p-4 bg-[#14141d] border border-[#ffa24d]/40 rounded-xl text-xs text-[#ffa24d] flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 flex-none" />
          <span>Notice: This policy is provided for operational transparency. It should be formally reviewed by a qualified corporate attorney prior to high-volume commercial scaling.</span>
        </div>

        <div className="card-luxury p-8 sm:p-10 space-y-6 text-xs sm:text-sm text-[#a8a7b3] leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-heading font-bold text-lg text-[#f5f1e8]">1. Introduction & Scope</h2>
            <p>
              This Privacy Policy details how personal information is collected, utilized, and protected across the online platforms, consultation booking systems, and communication channels managed by Ghazi Wazir in his capacity as CEO of Bab Al-Khaleej (Manama, Bahrain) and Back for Brand LLC (Florida, USA).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading font-bold text-lg text-[#f5f1e8]">2. Information We Collect</h2>
            <p>We collect information voluntarily submitted by visitors, including:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Full Name, Corporate Email Address, and Phone/WhatsApp numbers.</li>
              <li>Business activity preferences, target corporate structures, and timeline notes.</li>
              <li>Technical metadata: IP address, browser type, and cookie preference selections.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading font-bold text-lg text-[#f5f1e8]">3. How Data is Handled</h2>
            <p>
              Collected data is processed exclusively to deliver requested consultation scoping, verify ministry filing feasibility in Bahrain, coordinate calendar appointments, and provide technology services. We do not sell, rent, or lease client data to third-party data brokers under any circumstances.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading font-bold text-lg text-[#f5f1e8]">4. Server-Side Security & Data Minimization</h2>
            <p>
              Our platforms enforce least-privilege role-based access control, cryptographic password hashing (PBKDF2), and append-only audit trail logging. Client API keys and sensitive corporate credentials live strictly in protected server environment variables, never in client-accessible frontend bundles.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading font-bold text-lg text-[#f5f1e8]">5. Your Rights & Data Deletion</h2>
            <p>
              Clients may request a complete export of their consultation history or request permanent deletion of their lead records at any time by contacting our data officer at <a href="mailto:ghaziwazirndm@gmail.com" className="text-[#e8c872] underline">ghaziwazirndm@gmail.com</a>.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
