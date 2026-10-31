import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { CheckCircle2, Phone, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';

export function ThankYouPage() {
  return (
    <>
      <SEOHead
        title="Thank You — Inquiry Registered | Ghazi Wazir"
        description="Your consultation request or blueprint download has been recorded successfully."
        noindex={true}
      />

      <div className="py-20 sm:py-32 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="w-20 h-20 rounded-full bg-[#1c2e20] border-2 border-[#4ade80] flex items-center justify-center mx-auto shadow-2xl animate-in zoom-in-90 duration-300">
          <CheckCircle2 className="w-10 h-10 text-[#4ade80]" />
        </div>

        <div className="space-y-3">
          <div className="tag inline-block">Transmission Complete</div>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-[#f5f1e8]">
            Thank You. Your Request is Recorded.
          </h1>
          <p className="text-sm sm:text-base text-[#a8a7b3] max-w-lg mx-auto leading-relaxed">
            Ghazi Wazir and the executive team have received your request. If you booked a consultation slot, it has been locked in our server command center.
          </p>
        </div>

        <div className="card-luxury p-8 max-w-xl mx-auto text-left space-y-4 border-gold-glow">
          <h3 className="font-heading font-bold text-lg text-[#f5f1e8]">Next Steps:</h3>
          <ul className="space-y-3 text-xs sm:text-sm text-[#a8a7b3]">
            <li className="flex items-start gap-2.5">
              <span className="text-[#e8c872] font-bold">1.</span>
              <span><strong>Email Confirmation:</strong> Check your inbox for confirmation details (*Email dispatch requires connected email provider: <span className="text-[#ffa24d] font-semibold">CONFIGURATION REQUIRED</span>).</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#e8c872] font-bold">2.</span>
              <span><strong>WhatsApp Fast-Track:</strong> For instant verification, tap the button below to notify Ghazi Wazir directly on WhatsApp.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-[#e8c872] font-bold">3.</span>
              <span><strong>Preparation:</strong> Have your target business activities or questions ready for your session.</span>
            </li>
          </ul>

          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <a
              href="https://wa.me/97335628353?text=Hello%20Ghazi%2C%20I%20just%20completed%20the%20intake%20on%20your%20website."
              target="_blank"
              rel="noreferrer"
              className="btn-gold flex-1 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#16120a] flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Notify on WhatsApp (+973 3562 8353)</span>
            </a>
            <Link
              to="/"
              className="px-6 py-3.5 rounded-full border border-[#2a2a38] text-xs font-semibold text-[#f5f1e8] hover:border-[#e8c872] flex items-center justify-center gap-1"
            >
              <span>Return Home</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
