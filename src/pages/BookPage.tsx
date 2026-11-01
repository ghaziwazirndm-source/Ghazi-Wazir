import { useEffect } from 'react';
import { SEOHead } from '../components/SEOHead';
import { BookingWidget } from '../components/BookingWidget';
import { api } from '../services/api';
import { Calendar, ShieldCheck, Clock, Phone, Mail } from 'lucide-react';

export function BookPage() {
  useEffect(() => {
    api.trackFunnelEvent('/book', 'view', { service: 'Direct Consultation Booking' });
  }, []);
  return (
    <>
      <SEOHead
        title="Book a Free Strategic Consultation — Ghazi Wazir"
        description="Schedule a 1-on-1 private consultation with Ghazi Wazir regarding Bahrain business registration (CR), investor visas, or GEO/AEO technology."
        canonical="https://ghaziwazir.com/book"
      />

      <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="tag inline-block">1-on-1 Consultation</div>
          <h1 className="font-heading font-black text-4xl sm:text-5xl text-[#f5f1e8]">
            Schedule Your <span className="text-gold-gradient">Executive Session</span>
          </h1>
          <p className="text-base text-[#a8a7b3] leading-relaxed">
            Select an available time slot below. All consultations are conducted directly with Ghazi Wazir, CEO of Bab Al-Khaleej and Back for Brand LLC.
          </p>
        </div>

        {/* Host banner */}
        <div className="card-luxury p-6 max-w-3xl mx-auto border-gold-glow flex flex-col sm:flex-row items-center gap-5">
          <img
            src="/ghazi-wazir-photo.jpg"
            alt="Ghazi Wazir"
            className="w-20 h-20 rounded-full object-cover border-2 border-[#e8c872] flex-none shadow-lg"
          />
          <div className="space-y-1 text-center sm:text-left">
            <h2 className="font-heading font-bold text-lg text-[#f5f1e8]">What to Expect During Your Call</h2>
            <p className="text-xs text-[#a8a7b3] leading-relaxed">
              We review your exact situation, confirm ministry eligibility criteria in Bahrain, or scope your brand's AI search visibility strategy. You will receive clear, direct answers with zero sales fluff.
            </p>
          </div>
        </div>

        {/* Booking Calendar Widget */}
        <BookingWidget defaultService="Free Strategic Consultation" />

        {/* Fast Fallback */}
        <div className="text-center max-w-xl mx-auto pt-4 space-y-3">
          <p className="text-xs text-[#a8a7b3]">
            Need immediate assistance or have an urgent filing question?
          </p>
          <a
            href="https://wa.me/97335628353?text=Hello%20Ghazi%2C%20I%20have%20an%20urgent%20consultation%20inquiry."
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#4ade80]/50 text-xs font-bold text-[#4ade80] hover:bg-[#14141d]"
          >
            <Phone className="w-4 h-4" />
            <span>Chat Directly on WhatsApp (+973 3562 8353)</span>
          </a>
        </div>
      </div>
    </>
  );
}
