import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { Building2, TrendingUp, HelpCircle, ArrowRight, Play, Sparkles } from 'lucide-react';

export function StartPage() {
  return (
    <>
      <SEOHead
        title="Start Here — Choose Your Strategic Path | Ghazi Wazir"
        description="I lead two companies that help you start in Bahrain and grow online. Tell me what you need, and choose your path."
        canonical="https://ghaziwazir.com/start"
      />

      <div className="py-16 sm:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="tag inline-block">Personal Brand Hub</div>
          <h1 className="font-heading font-black text-4xl sm:text-5xl text-[#f5f1e8]">
            Start Here with <span className="text-gold-gradient">Ghazi Wazir</span>
          </h1>
          <p className="text-base text-[#a8a7b3] leading-relaxed">
            I lead two specialized companies designed to help you launch compliantly in Bahrain and scale your client acquisition worldwide. Choose the path that matches your current priority.
          </p>
        </div>

        {/* Video / Host Card */}
        <div className="card-luxury p-6 sm:p-8 border-gold-glow flex flex-col sm:flex-row items-center gap-6 max-w-3xl mx-auto">
          <img
            src="/ghazi-wazir-photo.jpg"
            alt="Ghazi Wazir"
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-[#e8c872] flex-none shadow-xl"
          />
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="font-heading font-bold text-xl text-[#f5f1e8]">Ghazi Wazir</div>
            <div className="text-xs font-semibold text-[#e8c872]">
              CEO &middot; Bab Al-Khaleej & Back for Brand LLC
            </div>
            <p className="text-xs text-[#a8a7b3] leading-relaxed pt-1">
              &ldquo;Welcome. Whether you are an international founder looking to establish your 100% foreign-owned Commercial Registration in Bahrain, or seeking to dominate generative AI search results, select your path below.&rdquo;
            </p>
            <div className="text-[11px] text-[#ffa24d] font-medium pt-1 flex items-center justify-center sm:justify-start gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Video message: CONFIGURATION REQUIRED (Awaiting owner embed)</span>
            </div>
          </div>
        </div>

        {/* Three Strategic Paths */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Path 1 */}
          <Link
            to="/formation"
            className="card-luxury p-8 flex flex-col justify-between group hover:border-[#e8c872] transition-all"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#1c1c28] border border-[#e8c872]/40 flex items-center justify-center text-[#e8c872] group-hover:scale-110 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>
              <h2 className="font-heading font-bold text-xl text-[#f5f1e8] group-hover:text-[#e8c872] transition-colors">
                I want to start a company in Bahrain
              </h2>
              <p className="text-xs text-[#a8a7b3] leading-relaxed">
                Access the free Bahrain Company Formation Blueprint, understand 100% foreign ownership criteria, and explore our Done-With-You corporate setup packages.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-[#2a2a38] flex items-center justify-between text-xs font-bold text-[#e8c872]">
              <span>Get the Blueprint</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Path 2 */}
          <Link
            to="/funnels"
            className="card-luxury p-8 flex flex-col justify-between group hover:border-[#b8893a] transition-all"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#1c1c28] border border-[#b8893a]/40 flex items-center justify-center text-[#e8c872] group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h2 className="font-heading font-bold text-xl text-[#f5f1e8] group-hover:text-[#e8c872] transition-colors">
                I want to grow my business online
              </h2>
              <p className="text-xs text-[#a8a7b3] leading-relaxed">
                Explore our 12 Video Sales Letter funnels across Generative Engine Optimization (GEO), Answer Engine Optimization (AEO), AI sales agents, and automated acquisition.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-[#2a2a38] flex items-center justify-between text-xs font-bold text-[#e8c872]">
              <span>Explore 12 Funnels</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Path 3 */}
          <Link
            to="/book"
            className="card-luxury p-8 flex flex-col justify-between group hover:border-[#4ade80] transition-all"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#1c1c28] border border-[#4ade80]/40 flex items-center justify-center text-[#4ade80] group-hover:scale-110 transition-transform">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h2 className="font-heading font-bold text-xl text-[#f5f1e8] group-hover:text-[#4ade80] transition-colors">
                I am not sure yet & need advice
              </h2>
              <p className="text-xs text-[#a8a7b3] leading-relaxed">
                Book a direct, free 1-on-1 strategic consultation with Ghazi Wazir. We will review your goals and determine the exact path forward without obligation.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-[#2a2a38] flex items-center justify-between text-xs font-bold text-[#4ade80]">
              <span>Book Free Consultation</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Footer Navigation link */}
        <div className="text-center pt-8 border-t border-[#2a2a38] flex flex-wrap items-center justify-center gap-4">
          <Link to="/companies" className="px-5 py-2.5 rounded-full border border-[#2a2a38] text-xs font-semibold text-[#f5f1e8] hover:border-[#e8c872]">
            Detailed Company Background &rarr;
          </Link>
          <Link to="/about" className="px-5 py-2.5 rounded-full border border-[#2a2a38] text-xs font-semibold text-[#f5f1e8] hover:border-[#e8c872]">
            About Ghazi Wazir &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}
