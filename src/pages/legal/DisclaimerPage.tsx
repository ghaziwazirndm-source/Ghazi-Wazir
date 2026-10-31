import { Link } from 'react-router-dom';
import { SEOHead } from '../../components/SEOHead';
import { ShieldAlert } from 'lucide-react';

export function DisclaimerPage() {
  return (
    <>
      <SEOHead
        title="Consultancy Disclaimer — Ghazi Wazir | Private Consultancy Notice"
        description="Statutory non-government consultancy disclaimer and general legal notice for Bab Al-Khaleej and Back for Brand LLC."
        canonical="https://ghaziwazir.com/disclaimer"
      />

      <div className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-left">
        <div className="space-y-3">
          <div className="tag inline-block">Regulatory Notice</div>
          <h1 className="font-heading font-black text-3xl sm:text-4xl text-[#f5f1e8]">
            Consultancy & Legal Disclaimer
          </h1>
          <p className="text-xs text-[#a8a7b3]">
            Mandatory disclosure regarding governmental status and legal advice limitations
          </p>
        </div>

        <div className="card-luxury p-8 sm:p-10 space-y-6 text-xs sm:text-sm text-[#a8a7b3] leading-relaxed border-t-2 border-t-[#e8c872]">
          <div className="flex items-start gap-3 p-4 bg-[#14141d] rounded-xl border border-[#e8c872]/40 text-[#f5f1e8]">
            <ShieldAlert className="w-5 h-5 text-[#e8c872] flex-none mt-0.5" />
            <p className="font-semibold text-xs leading-relaxed">
              Bab Al-Khaleej and Back for Brand LLC are independent private commercial consultancies. We are NOT a government ministry, official authority, immigration department, or law firm.
            </p>
          </div>

          <section className="space-y-2">
            <h2 className="font-heading font-bold text-lg text-[#f5f1e8]">1. General Information Only</h2>
            <p>
              The content published across this website, including all guides, checklist blueprints, video sales letters, and automated AI agent responses, is provided exclusively for general business intelligence and scoping orientation. It does not constitute formal legal, taxation, or statutory immigration advice.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading font-bold text-lg text-[#f5f1e8]">2. Government Authority Jurisdiction</h2>
            <p>
              In the Kingdom of Bahrain, all decisions regarding trade name reservation, Commercial Registration (CR) approval, commercial activity authorization, municipal address clearance, Labour Market Regulatory Authority (LMRA) workforce quota allocation, and investor/worker residency permits remain the sole, sovereign, and statutory prerogative of the relevant ministerial authorities.
            </p>
            <p>
              Neither Ghazi Wazir, Bab Al-Khaleej, nor Back for Brand LLC promises, warrants, or guarantees approval outcomes, specific processing speeds, or bureaucratic exceptions.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-heading font-bold text-lg text-[#f5f1e8]">3. Technology & Search Engine Visibility</h2>
            <p>
              Back for Brand LLC provides Generative Engine Optimization (GEO) and technical SEO based on documented search engineering methodologies. We do not represent, partner with, or act on behalf of Google, OpenAI, Anthropic, or Perplexity. We make zero guarantees regarding specific search ranks, search traffic quantities, or commercial revenue generation.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
