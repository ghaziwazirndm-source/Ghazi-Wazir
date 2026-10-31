import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { Building2, Globe, ShieldCheck, Cpu, ArrowRight, CheckCircle2, Calendar } from 'lucide-react';

export function CompaniesPage() {
  return (
    <>
      <SEOHead
        title="Two Companies. One Standard — Bab Al-Khaleej & Back for Brand LLC | Ghazi Wazir"
        description="Learn how Ghazi Wazir leads Bab Al-Khaleej (Bahrain corporate formation, visas, document clearing) and Back for Brand LLC (USA technology, GEO, AEO, AI agents)."
        canonical="https://ghaziwazir.com/companies"
      />

      <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="tag inline-block">The Executive Ecosystem</div>
          <h1 className="font-heading font-black text-4xl sm:text-5xl text-[#f5f1e8]">
            Two Companies. <span className="text-gold-gradient">One Standard.</span>
          </h1>
          <p className="text-base text-[#a8a7b3] leading-relaxed">
            Discover how Ghazi Wazir unifies traditional on-ground Middle Eastern commercial advisory with cutting-edge American AI and search technology.
          </p>
        </div>

        {/* Company 1: Bab Al-Khaleej */}
        <div className="card-luxury p-8 sm:p-12 border-t-4 border-t-[#e8c872] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#1c1c28] border border-[#e8c872]/40 flex items-center justify-center text-[#e8c872]">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#e8c872]">Bahrain Headquarters</span>
                <h2 className="font-heading font-black text-3xl text-[#f5f1e8]">Bab Al-Khaleej</h2>
              </div>
            </div>

            <p className="text-sm text-[#a8a7b3] leading-relaxed">
              Bab Al-Khaleej is a premier Bahraini business advisory consultancy. We empower foreign investors, regional enterprises, and ambitious startups to establish an official, compliant presence in Bahrain with 100% foreign ownership eligibility.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#f5f1e8]">
              <div className="p-4 bg-[#101018] rounded-xl border border-[#2a2a38] space-y-1">
                <span className="font-bold text-[#e8c872] block">Commercial Registration (CR)</span>
                <p className="text-[#a8a7b3]">Sijilat filings, activity classification, and ministry clearances.</p>
              </div>
              <div className="p-4 bg-[#101018] rounded-xl border border-[#2a2a38] space-y-1">
                <span className="font-bold text-[#e8c872] block">Investor Visas</span>
                <p className="text-[#a8a7b3]">Direct self-sponsorship partner visas for business shareholders.</p>
              </div>
              <div className="p-4 bg-[#101018] rounded-xl border border-[#2a2a38] space-y-1">
                <span className="font-bold text-[#e8c872] block">LMRA Worker Permits</span>
                <p className="text-[#a8a7b3]">Work permits, quota allocations, and residency card clearing.</p>
              </div>
              <div className="p-4 bg-[#101018] rounded-xl border border-[#2a2a38] space-y-1">
                <span className="font-bold text-[#e8c872] block">Document Tracking</span>
                <p className="text-[#a8a7b3]">Active queue follow-up and resolution of ministry inquiries.</p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link to="/services/business-registration" className="btn-gold px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-[#16120a] flex items-center gap-2">
                <span>View Registration Services</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/formation" className="px-6 py-3 rounded-full border border-[#2a2a38] text-xs font-semibold text-[#f5f1e8] hover:border-[#e8c872]">
                Bahrain Formation Funnel
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#101018] border border-[#2a2a38] rounded-2xl p-6 space-y-4">
            <h3 className="font-heading font-bold text-lg text-[#f5f1e8]">
              Key Bab Al-Khaleej Facts
            </h3>
            <ul className="space-y-3 text-xs text-[#a8a7b3]">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#e8c872] flex-none mt-0.5" />
                <span>Operating under direct leadership of CEO Ghazi Wazir in Manama.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#e8c872] flex-none mt-0.5" />
                <span>Specialized in Foreign Direct Investment (FDI) structuring.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#e8c872] flex-none mt-0.5" />
                <span>Private corporate consultancy ensuring full regulatory compliance.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Company 2: Back for Brand LLC */}
        <div className="card-luxury p-8 sm:p-12 border-t-4 border-t-[#b8893a] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#1c1c28] border border-[#b8893a]/40 flex items-center justify-center text-[#e8c872]">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#e8c872]">USA Headquarters</span>
                <h2 className="font-heading font-black text-3xl text-[#f5f1e8]">Back for Brand LLC</h2>
              </div>
            </div>

            <p className="text-sm text-[#a8a7b3] leading-relaxed">
              Back for Brand LLC is a Florida-registered technology and digital marketing company delivering advanced Generative Engine Optimization (GEO), Answer Engine Optimization (AEO), autonomous AI agents, and high-performance revenue funnels to businesses worldwide.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#f5f1e8]">
              <div className="p-4 bg-[#101018] rounded-xl border border-[#2a2a38] space-y-1">
                <span className="font-bold text-[#e8c872] block">GEO & AEO Systems</span>
                <p className="text-[#a8a7b3]">Citation dominance in Perplexity, ChatGPT, and Google Gemini.</p>
              </div>
              <div className="p-4 bg-[#101018] rounded-xl border border-[#2a2a38] space-y-1">
                <span className="font-bold text-[#e8c872] block">Autonomous AI Agents</span>
                <p className="text-[#a8a7b3]">Secure, 24/7 sales qualification bots with prompt injection defenses.</p>
              </div>
              <div className="p-4 bg-[#101018] rounded-xl border border-[#2a2a38] space-y-1">
                <span className="font-bold text-[#e8c872] block">Organic & Programmatic SEO</span>
                <p className="text-[#a8a7b3]">Entity maps and technical search architecture that drive qualified traffic.</p>
              </div>
              <div className="p-4 bg-[#101018] rounded-xl border border-[#2a2a38] space-y-1">
                <span className="font-bold text-[#e8c872] block">Conversion Funnels</span>
                <p className="text-[#a8a7b3]">Direct-response VSL architectures that transform clicks into paid clients.</p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link to="/services/geo-aeo" className="btn-gold px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-[#16120a] flex items-center gap-2">
                <span>View Tech & AI Services</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/packages" className="px-6 py-3 rounded-full border border-[#2a2a38] text-xs font-semibold text-[#f5f1e8] hover:border-[#e8c872]">
                Explore Tech Packages
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#101018] border border-[#2a2a38] rounded-2xl p-6 space-y-4">
            <h3 className="font-heading font-bold text-lg text-[#f5f1e8]">
              Key Back for Brand LLC Facts
            </h3>
            <ul className="space-y-3 text-xs text-[#a8a7b3]">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#e8c872] flex-none mt-0.5" />
                <span>Incorporated in the State of Florida, serving clients globally.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#e8c872] flex-none mt-0.5" />
                <span>Architects of modern Generative AI visibility and LLM indexing.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#e8c872] flex-none mt-0.5" />
                <span>Zero fake metrics; built on audited server-side logic and real ROI.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Unified CTA */}
        <div className="text-center bg-[#14141d] border border-[#2a2a38] rounded-3xl p-10 max-w-3xl mx-auto space-y-4">
          <h3 className="font-heading font-bold text-2xl text-[#f5f1e8]">
            One Executive Discussion
          </h3>
          <p className="text-sm text-[#a8a7b3] max-w-xl mx-auto">
            Whether your immediate priority is establishing a Bahrain Commercial Registration or deploying generative AI marketing, speak directly with Ghazi Wazir.
          </p>
          <div className="pt-2">
            <Link to="/book" className="btn-gold inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#16120a]">
              <Calendar className="w-4 h-4" />
              <span>Book Your Scoping Session</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
