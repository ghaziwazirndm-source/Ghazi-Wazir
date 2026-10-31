import { Link } from 'react-router-dom';
import { SEOHead } from '../../components/SEOHead';
import { ShieldAlert } from 'lucide-react';

export function TermsPage() {
  return (
    <>
      <SEOHead
        title="Terms of Service — Ghazi Wazir | Bab Al-Khaleej & Back for Brand LLC"
        description="Terms and conditions governing consulting agreements, scope of work, and advisory boundaries."
        canonical="https://ghaziwazir.com/terms-of-service"
      />

      <div className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-left">
        <div className="space-y-3">
          <div className="tag inline-block">Commercial Terms</div>
          <h1 className="font-heading font-black text-3xl sm:text-4xl text-[#f5f1e8]">
            Terms of Service
          </h1>
          <p className="text-xs text-[#a8a7b3]">
            Last updated: October 2026 &middot; Binding commercial provisions
          </p>
        </div>

        <div className="card-luxury p-8 sm:p-10 space-y-6 text-xs sm:text-sm text-[#a8a7b3] leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-heading font-bold text-lg text-[#f5f1e8]">1. Nature of Services</h2>
            <p>
              Bab Al-Khaleej provides private business setup consultancy, document preparation, and application tracking services in the Kingdom of Bahrain. Back for Brand LLC provides Generative Engine Optimization (GEO), AI sales agent development, and digital marketing consulting.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading font-bold text-lg text-[#f5f1e8]">2. No Statutory Guarantee</h2>
            <p>
              The client acknowledges and agrees that our firms are private commercial consultants, not government ministries, courts, or law firms. Approval of commercial registrations (CR), activity licenses, investor visas, and worker quotas rests solely within the statutory discretion of Bahraini government authorities (MOIC, LMRA, NPRA). We make no warranties regarding approval outcomes or ministry processing speeds.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading font-bold text-lg text-[#f5f1e8]">3. Payment & Price List Integrity</h2>
            <p>
              All payment requests are issued strictly against our executive-approved price list or formal written proposal. Payments are recognized and verified solely through official, trusted payment-provider confirmations. Screenshots, deposit slips, or verbal customer assertions do not constitute proof of payment.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading font-bold text-lg text-[#f5f1e8]">4. Client Responsibilities & Document Accuracy</h2>
            <p>
              The client warrants that all corporate resolutions, shareholder identities, financial declarations, and passport copies provided for Bahraini filings are authentic, lawful, and properly notarized. Providing fraudulent or falsified documentation is grounds for immediate termination of services with zero refund.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
