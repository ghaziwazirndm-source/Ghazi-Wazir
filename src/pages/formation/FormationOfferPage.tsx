import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../../components/SEOHead';
import { LeadModal } from '../../components/LeadModal';
import { api } from '../../services/api';
import { CheckCircle2, XCircle, ArrowRight, ShieldCheck, Calendar, Phone, Sparkles, HelpCircle } from 'lucide-react';

export function FormationOfferPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState('');

  useEffect(() => {
    api.trackFunnelEvent('/formation/offer', 'view', { service: 'Fast-Track Formation Offer Package' });
  }, []);

  const handleQuoteClick = (tier: string) => {
    setSelectedOffer(tier);
    setModalOpen(true);
  };

  return (
    <>
      <SEOHead
        title="Done-With-You Bahrain Setup Offer | Ghazi Wazir"
        description="Let Bab Al-Khaleej handle your company formation, CR approvals, and investor visas step by step."
        noindex={true}
      />

      <div className="py-12 sm:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="tag inline-block">The Done-With-You Offer</div>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-[#f5f1e8] leading-tight">
            Let Us Build Your Bahrain Company{' '}
            <span className="text-gold-gradient">Step by Step</span>
          </h1>
          <p className="text-sm sm:text-base text-[#a8a7b3] leading-relaxed">
            Skip the bureaucratic learning curve. Bab Al-Khaleej reviews your commercial objectives, prepares verified documents, files through Sijilat, and tracks each approval until your business is active.
          </p>
        </div>

        {/* The 3 Paths */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Path 1: Essential */}
          <div className="card-luxury p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-bold text-[#e8c872] uppercase tracking-wider block">Path 01</span>
              <h2 className="font-heading font-bold text-xl text-[#f5f1e8]">Essential Formation</h2>
              <p className="text-xs text-[#a8a7b3] leading-relaxed">
                For solo founders who need a verified Commercial Registration (CR) quickly and cleanly.
              </p>

              <div className="py-3 border-y border-[#2a2a38]">
                <span className="text-xs text-[#a8a7b3]">Scope:</span>
                <div className="font-heading font-bold text-lg text-[#e8c872]">Tailored Quotation</div>
              </div>

              <ul className="space-y-2 text-xs text-[#f5f1e8]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#e8c872] flex-none mt-0.5" />
                  <span>Commercial name clearance & registration</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#e8c872] flex-none mt-0.5" />
                  <span>Activity code classification & municipal check</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#e8c872] flex-none mt-0.5" />
                  <span>Drafting Memorandum of Association (MOA)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#e8c872] flex-none mt-0.5" />
                  <span>Bank introduction letter for account opening</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <button
                type="button"
                onClick={() => handleQuoteClick('Formation Offer: Essential Path')}
                className="w-full py-3 rounded-full border border-[#2a2a38] text-xs font-semibold text-[#f5f1e8] hover:border-[#e8c872] transition-colors"
              >
                Request Quote
              </button>
            </div>
          </div>

          {/* Path 2: Complete Setup */}
          <div className="card-luxury p-8 flex flex-col justify-between border-gold-glow relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-[#e8c872] to-[#b8893a] text-[#16120a] text-[10px] font-black uppercase tracking-wider">
              Most Popular Choice
            </div>

            <div className="space-y-4">
              <span className="text-xs font-bold text-[#e8c872] uppercase tracking-wider block">Path 02</span>
              <h2 className="font-heading font-bold text-xl text-[#f5f1e8]">Complete Setup + Visa</h2>
              <p className="text-xs text-[#a8a7b3] leading-relaxed">
                Turnkey business registration plus partner/investor residency permits and CPR smart card clearing.
              </p>

              <div className="py-3 border-y border-[#2a2a38]">
                <span className="text-xs text-[#a8a7b3]">Scope:</span>
                <div className="font-heading font-bold text-lg text-[#e8c872]">Full Corporate Package</div>
              </div>

              <ul className="space-y-2 text-xs text-[#f5f1e8]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#e8c872] flex-none mt-0.5" />
                  <span>Everything in Essential Path</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#e8c872] flex-none mt-0.5" />
                  <span>Investor self-sponsorship visa application</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#e8c872] flex-none mt-0.5" />
                  <span>Medical appointment & CPR smart card clearance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#e8c872] flex-none mt-0.5" />
                  <span>Commercial lease verification with municipality</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <button
                type="button"
                onClick={() => handleQuoteClick('Formation Offer: Complete Setup + Visa')}
                className="btn-gold w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#16120a]"
              >
                Request Complete Quote
              </button>
            </div>
          </div>

          {/* Path 3: Setup + Growth */}
          <div className="card-luxury p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-bold text-[#e8c872] uppercase tracking-wider block">Path 03</span>
              <h2 className="font-heading font-bold text-xl text-[#f5f1e8]">Setup + Growth Suite</h2>
              <p className="text-xs text-[#a8a7b3] leading-relaxed">
                Dual company execution: Bab Al-Khaleej corporate formation plus Back for Brand LLC digital funnels & GEO.
              </p>

              <div className="py-3 border-y border-[#2a2a38]">
                <span className="text-xs text-[#a8a7b3]">Scope:</span>
                <div className="font-heading font-bold text-lg text-[#e8c872]">Dual Enterprise Launch</div>
              </div>

              <ul className="space-y-2 text-xs text-[#f5f1e8]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#e8c872] flex-none mt-0.5" />
                  <span>Complete Bahrain CR + Investor Residency</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#e8c872] flex-none mt-0.5" />
                  <span>LMRA initial employee workforce quota filing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#e8c872] flex-none mt-0.5" />
                  <span>GEO / AEO semantic brand entity setup</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#e8c872] flex-none mt-0.5" />
                  <span>High-converting VSL sales funnel architecture</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <button
                type="button"
                onClick={() => handleQuoteClick('Formation Offer: Setup + Growth Suite')}
                className="w-full py-3 rounded-full border border-[#2a2a38] text-xs font-semibold text-[#f5f1e8] hover:border-[#e8c872] transition-colors"
              >
                Request Growth Quote
              </button>
            </div>
          </div>
        </div>

        {/* Who It Is For & Who It Is NOT For */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card-luxury p-8 space-y-4 border-l-4 border-l-[#4ade80]">
            <h3 className="font-heading font-bold text-xl text-[#f5f1e8] flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#4ade80]" />
              <span>Who This Is For</span>
            </h3>
            <ul className="space-y-3 text-xs text-[#a8a7b3]">
              <li className="flex items-start gap-2">
                <span className="text-[#4ade80] font-bold">&bull;</span>
                <span>International entrepreneurs who value time and want zero filing errors.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4ade80] font-bold">&bull;</span>
                <span>Founders expanding branches or foreign subsidiaries into the GCC region.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4ade80] font-bold">&bull;</span>
                <span>Businesses that want modern digital infrastructure (GEO, AEO, funnels) ready on launch day.</span>
              </li>
            </ul>
          </div>

          <div className="card-luxury p-8 space-y-4 border-l-4 border-l-[#ff5d5d]">
            <h3 className="font-heading font-bold text-xl text-[#f5f1e8] flex items-center gap-2">
              <XCircle className="w-5 h-5 text-[#ff5d5d]" />
              <span>Who This Is NOT For</span>
            </h3>
            <ul className="space-y-3 text-xs text-[#a8a7b3]">
              <li className="flex items-start gap-2">
                <span className="text-[#ff5d5d] font-bold">&bull;</span>
                <span>Anyone seeking illegal shortcuts, fake residency, or unofficial backchannels.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#ff5d5d] font-bold">&bull;</span>
                <span>Individuals expecting statutory government guarantees from a private consultancy.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#ff5d5d] font-bold">&bull;</span>
                <span>Founders unwilling to provide attested identity documents and legitimate commercial plans.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="card-luxury p-8 sm:p-10 space-y-6">
          <h3 className="font-heading font-bold text-2xl text-[#f5f1e8] flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-[#e8c872]" />
            <span>Frequently Asked Questions</span>
          </h3>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="p-4 bg-[#101018] rounded-xl border border-[#2a2a38] space-y-1">
              <strong className="text-[#f5f1e8] block">Do I need to be in Bahrain to incorporate?</strong>
              <p className="text-[#a8a7b3]">Initial commercial registration filings and trade name reservations can be initiated remotely via Power of Attorney. You will only need to visit Bahrain for mandatory biometric fingerprinting and medical examinations to finalize your CPR ID card.</p>
            </div>
            <div className="p-4 bg-[#101018] rounded-xl border border-[#2a2a38] space-y-1">
              <strong className="text-[#f5f1e8] block">How long does the entire process take?</strong>
              <p className="text-[#a8a7b3]">Standard commercial registration without license takes approximately 3 to 7 business days, while commercial licensing with physical municipal address verification takes an additional 1 to 2 weeks depending on ministerial activity clearances.</p>
            </div>
          </div>
        </div>

        {/* P.S. Note from Ghazi Wazir */}
        <div className="card-luxury p-8 border-l-4 border-l-[#e8c872] space-y-3 text-xs sm:text-sm text-[#f5f1e8]">
          <h4 className="font-heading font-bold text-base text-[#e8c872]">P.S. From Ghazi Wazir</h4>
          <p className="text-[#a8a7b3] leading-relaxed">
            Starting a business in a foreign country can feel intimidating when information is fragmented. When you work with Bab Al-Khaleej, you are not handing your company over to an anonymous call center. You have my personal executive oversight on your filings from day one.
          </p>
          <div className="pt-2">
            <Link to="/book" className="text-xs font-bold text-[#e8c872] hover:underline flex items-center gap-1">
              <span>Book a consultation with me directly &rarr;</span>
            </Link>
          </div>
        </div>

        {/* Next Step Link */}
        <div className="text-center pt-4">
          <Link
            to="/book"
            className="btn-gold inline-flex items-center gap-2 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider text-[#16120a] shadow-2xl"
          >
            <Calendar className="w-4 h-4" />
            <span>Proceed to Consultation Booking</span>
          </Link>
        </div>
      </div>

      <LeadModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultService={selectedOffer}
      />
    </>
  );
}
