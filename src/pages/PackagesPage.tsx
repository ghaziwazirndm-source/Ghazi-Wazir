import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { LeadModal } from '../components/LeadModal';
import { CheckCircle2, Building2, Globe, ArrowRight, ShieldAlert, Calendar } from 'lucide-react';

export function PackagesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalService, setModalService] = useState('');

  const requestQuote = (pkgName: string) => {
    setModalService(pkgName);
    setModalOpen(true);
  };

  return (
    <>
      <SEOHead
        title="Packages & Scope of Work — Bab Al-Khaleej & Back for Brand LLC | Ghazi Wazir"
        description="Structured corporate formation and digital growth packages. Transparent scoping with direct executive management. Request a custom quote."
        canonical="https://ghaziwazir.com/packages"
      />

      <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="tag inline-block">Transparent Scoping</div>
          <h1 className="font-heading font-black text-4xl sm:text-5xl text-[#f5f1e8]">
            Corporate Packages & <span className="text-gold-gradient">Service Tiers</span>
          </h1>
          <p className="text-base text-[#a8a7b3] leading-relaxed">
            Every business has distinct operational requirements, ministry classifications, and digital objectives. We tailor our agreements to your verified corporate scope.
          </p>
        </div>

        {/* Section 1: Bab Al-Khaleej Corporate Setup Packages */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 pb-2 border-b border-[#2a2a38]">
            <Building2 className="w-6 h-6 text-[#e8c872]" />
            <h2 className="font-heading font-bold text-2xl text-[#f5f1e8]">
              Bahrain Corporate Formation Tiers (Bab Al-Khaleej)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tier 1 */}
            <div className="card-luxury p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-bold text-[#e8c872] uppercase tracking-wider block">Tier 1</span>
                <h3 className="font-heading font-bold text-xl text-[#f5f1e8]">Essential CR Setup</h3>
                <p className="text-xs text-[#a8a7b3] leading-relaxed">
                  Ideal for solo founders requiring swift commercial registration without initial employee quotas.
                </p>

                <div className="py-2 border-y border-[#2a2a38]">
                  <span className="text-xs text-[#a8a7b3]">Fee Structure:</span>
                  <div className="font-heading font-bold text-lg text-[#e8c872]">Custom Quotation</div>
                </div>

                <ul className="space-y-2.5 text-xs text-[#f5f1e8]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#e8c872] flex-none mt-0.5" />
                    <span>Commercial Registration (CR) filing via Sijilat</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#e8c872] flex-none mt-0.5" />
                    <span>Standard commercial activity approval coordination</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#e8c872] flex-none mt-0.5" />
                    <span>Drafting of Memorandum of Association (MOA)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#e8c872] flex-none mt-0.5" />
                    <span>Bank introduction letter for corporate account</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <button
                  type="button"
                  onClick={() => requestQuote('Essential CR Setup Package')}
                  className="w-full py-3 rounded-full border border-[#2a2a38] text-xs font-semibold text-[#f5f1e8] hover:border-[#e8c872] transition-colors"
                >
                  Request Quote
                </button>
              </div>
            </div>

            {/* Tier 2: Complete */}
            <div className="card-luxury p-8 flex flex-col justify-between border-gold-glow relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-[#e8c872] to-[#b8893a] text-[#16120a] text-[10px] font-black uppercase tracking-wider">
                Most Requested
              </div>
              <div className="space-y-4">
                <span className="text-xs font-bold text-[#e8c872] uppercase tracking-wider block">Tier 2</span>
                <h3 className="font-heading font-bold text-xl text-[#f5f1e8]">Complete Setup + Investor Visa</h3>
                <p className="text-xs text-[#a8a7b3] leading-relaxed">
                  Full corporate registration combined with partner/investor residency permit and active document clearance.
                </p>

                <div className="py-2 border-y border-[#2a2a38]">
                  <span className="text-xs text-[#a8a7b3]">Fee Structure:</span>
                  <div className="font-heading font-bold text-lg text-[#e8c872]">Comprehensive Package</div>
                </div>

                <ul className="space-y-2.5 text-xs text-[#f5f1e8]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#e8c872] flex-none mt-0.5" />
                    <span>All services in Essential CR Tier</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#e8c872] flex-none mt-0.5" />
                    <span>Investor Visa application, medical, and CPR ID clearance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#e8c872] flex-none mt-0.5" />
                    <span>Municipality commercial address coordination</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#e8c872] flex-none mt-0.5" />
                    <span>Direct application tracking in ministry queues</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <button
                  type="button"
                  onClick={() => requestQuote('Complete Setup + Investor Visa')}
                  className="btn-gold w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#16120a]"
                >
                  Request Complete Quote
                </button>
              </div>
            </div>

            {/* Tier 3: Growth */}
            <div className="card-luxury p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-bold text-[#e8c872] uppercase tracking-wider block">Tier 3</span>
                <h3 className="font-heading font-bold text-xl text-[#f5f1e8]">Setup + Growth Suite</h3>
                <p className="text-xs text-[#a8a7b3] leading-relaxed">
                  Seamlessly combines Bab Al-Khaleej corporate formation with Back for Brand LLC digital foundation and funnels.
                </p>

                <div className="py-2 border-y border-[#2a2a38]">
                  <span className="text-xs text-[#a8a7b3]">Fee Structure:</span>
                  <div className="font-heading font-bold text-lg text-[#e8c872]">Dual Enterprise Tier</div>
                </div>

                <ul className="space-y-2.5 text-xs text-[#f5f1e8]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#e8c872] flex-none mt-0.5" />
                    <span>Complete Bahrain CR + Investor Residency</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#e8c872] flex-none mt-0.5" />
                    <span>LMRA initial employee quota filing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#e8c872] flex-none mt-0.5" />
                    <span>GEO / AEO semantic brand foundation setup</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#e8c872] flex-none mt-0.5" />
                    <span>Direct-response funnel and landing page architecture</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <button
                  type="button"
                  onClick={() => requestQuote('Setup + Growth Suite')}
                  className="w-full py-3 rounded-full border border-[#2a2a38] text-xs font-semibold text-[#f5f1e8] hover:border-[#e8c872] transition-colors"
                >
                  Request Suite Quote
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Back for Brand LLC Technology Packages */}
        <div className="space-y-6 pt-10 border-t border-[#2a2a38]">
          <div className="flex items-center gap-3 pb-2 border-b border-[#2a2a38]">
            <Globe className="w-6 h-6 text-[#b8893a]" />
            <h2 className="font-heading font-bold text-2xl text-[#f5f1e8]">
              Technology & AI Growth Packages (Back for Brand LLC)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tech 1 */}
            <div className="card-luxury p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="font-heading font-bold text-xl text-[#f5f1e8]">GEO & AEO Implementation</h3>
                <p className="text-xs text-[#a8a7b3] leading-relaxed">
                  Entity authority architecture, schema structuring, and LLM answer box citations across ChatGPT, Perplexity, and Gemini.
                </p>
                <div className="py-2 border-y border-[#2a2a38]">
                  <span className="text-xs text-[#a8a7b3]">Scope:</span>
                  <div className="font-heading font-bold text-sm text-[#f5f1e8]">Monthly or Project-Based</div>
                </div>
              </div>
              <div className="pt-6">
                <button
                  type="button"
                  onClick={() => requestQuote('GEO and AEO Implementation Package')}
                  className="w-full py-3 rounded-full border border-[#2a2a38] text-xs font-semibold text-[#f5f1e8] hover:border-[#e8c872]"
                >
                  Inquire Scope
                </button>
              </div>
            </div>

            {/* Tech 2 */}
            <div className="card-luxury p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="font-heading font-bold text-xl text-[#f5f1e8]">Autonomous AI Agent Suite</h3>
                <p className="text-xs text-[#a8a7b3] leading-relaxed">
                  Deploy custom server-side AI sales reps with verified knowledge base grounding, prompt injection security, and CRM handoff.
                </p>
                <div className="py-2 border-y border-[#2a2a38]">
                  <span className="text-xs text-[#a8a7b3]">Scope:</span>
                  <div className="font-heading font-bold text-sm text-[#f5f1e8]">Custom Development</div>
                </div>
              </div>
              <div className="pt-6">
                <button
                  type="button"
                  onClick={() => requestQuote('Autonomous AI Agent Deployment')}
                  className="w-full py-3 rounded-full border border-[#2a2a38] text-xs font-semibold text-[#f5f1e8] hover:border-[#e8c872]"
                >
                  Inquire Scope
                </button>
              </div>
            </div>

            {/* Tech 3 */}
            <div className="card-luxury p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="font-heading font-bold text-xl text-[#f5f1e8]">High-Converting VSL Funnel</h3>
                <p className="text-xs text-[#a8a7b3] leading-relaxed">
                  End-to-end direct-response funnel engineering: Russell Brunson Epiphany Bridge frameworks, video embeds, and slot locking.
                </p>
                <div className="py-2 border-y border-[#2a2a38]">
                  <span className="text-xs text-[#a8a7b3]">Scope:</span>
                  <div className="font-heading font-bold text-sm text-[#f5f1e8]">Turnkey Architecture</div>
                </div>
              </div>
              <div className="pt-6">
                <button
                  type="button"
                  onClick={() => requestQuote('High-Converting VSL Funnel')}
                  className="w-full py-3 rounded-full border border-[#2a2a38] text-xs font-semibold text-[#f5f1e8] hover:border-[#e8c872]"
                >
                  Inquire Scope
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Notice on Price Transparency */}
        <div className="card-luxury p-6 max-w-4xl mx-auto flex items-start gap-3 bg-[#101018] text-xs text-[#a8a7b3]">
          <ShieldAlert className="w-5 h-5 text-[#e8c872] flex-none mt-0.5" />
          <p>
            <strong>Pricing Policy & Integrity:</strong> Government fees in Bahrain (Sijilat CR registration fees, chamber of commerce dues, LMRA work permit levies, and municipality charges) vary depending on selected activity codes, number of foreign partners, and commercial office size. All fee proposals are itemized in writing following initial consultation.
          </p>
        </div>
      </div>

      <LeadModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultService={modalService}
      />
    </>
  );
}
