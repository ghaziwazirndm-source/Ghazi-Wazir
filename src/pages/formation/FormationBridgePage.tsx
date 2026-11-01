import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../../components/SEOHead';
import { api } from '../../services/api';
import { CheckCircle2, ArrowRight, Play, BookOpen, Sparkles, ShieldAlert } from 'lucide-react';

export function FormationBridgePage() {
  useEffect(() => {
    api.trackFunnelEvent('/formation/bridge', 'view', { service: 'Formation Bridge Video' });
  }, []);
  return (
    <>
      <SEOHead
        title="Your Blueprint Is Ready — The 3 Key Decisions | Ghazi Wazir"
        description="Watch this short briefing or read the 3 decisions that dictate how smooth your Bahrain company registration will be."
        noindex={true}
      />

      <div className="py-12 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1c2e20] text-[#4ade80] border border-[#4ade80]/40 text-xs font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>You Are Confirmed. Your Blueprint is Ready Below.</span>
          </div>

          <h1 className="font-heading font-black text-3xl sm:text-5xl text-[#f5f1e8] leading-tight">
            Before You Open It: The 3 Decisions That Dictate Your{' '}
            <span className="text-gold-gradient">Company Formation Success</span>
          </h1>

          <p className="text-sm sm:text-base text-[#a8a7b3] max-w-2xl mx-auto leading-relaxed">
            Take two minutes to review this strategic narrative. It separates founders who get their Commercial Registration in days from those who spend months stuck in ministry revisions.
          </p>
        </div>

        {/* Video / Host Card */}
        <div className="card-luxury p-6 sm:p-8 border-gold-glow max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <img
              src="/ghazi-wazir-photo.jpg"
              alt="Ghazi Wazir"
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-[#e8c872] flex-none shadow-xl"
            />
            <div className="space-y-2 text-center sm:text-left flex-1">
              <div className="font-heading font-bold text-xl text-[#f5f1e8]">Ghazi Wazir</div>
              <div className="text-xs font-semibold text-[#e8c872]">
                CEO &middot; Bab Al-Khaleej & Back for Brand LLC
              </div>
              <p className="text-xs text-[#a8a7b3] leading-relaxed">
                &ldquo;When I began navigating Bahraini commercial registries, I noticed that failed applications weren't caused by bad business ideas. They failed because founders executed steps out of order.&rdquo;
              </p>
              <div className="pt-1 text-[11px] text-[#ffa24d] font-semibold flex items-center justify-center sm:justify-start gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Video Briefing: CONFIGURATION REQUIRED (Awaiting embed URL)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Direct Action Button */}
        <div className="text-center">
          <Link
            to="/formation/blueprint"
            className="btn-gold inline-flex items-center gap-2 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider text-[#16120a] shadow-2xl"
          >
            <BookOpen className="w-4 h-4" />
            <span>Open Interactive 7-Step Blueprint Now &rarr;</span>
          </Link>
        </div>

        {/* The Epiphany Bridge Story (5 Stages) */}
        <div className="card-luxury p-8 sm:p-12 space-y-10 border-t-2 border-t-[#e8c872]">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#e8c872]">The Epiphany Bridge</span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#f5f1e8]">
              Why Sequence Matters More Than Anything in Bahrain
            </h2>
          </div>

          <div className="space-y-8 text-sm sm:text-base text-[#f5f1e8] leading-relaxed">
            <div className="space-y-2 pb-6 border-b border-[#2a2a38]">
              <h3 className="font-heading font-bold text-lg text-[#e8c872]">1. The Decision</h3>
              <p className="text-[#a8a7b3] text-xs sm:text-sm">
                You decide it is time to establish your own company in the Arabian Gulf. Bahrain represents the ideal jurisdiction: zero corporate tax for most sectors, 100% foreign ownership eligibility, and lower operating costs than Dubai or Riyadh.
              </p>
            </div>

            <div className="space-y-2 pb-6 border-b border-[#2a2a38]">
              <h3 className="font-heading font-bold text-lg text-[#e8c872]">2. The Wall</h3>
              <p className="text-[#a8a7b3] text-xs sm:text-sm">
                Then the bureaucratic maze begins. Which of the 2,000+ ISIC commercial activities should you choose? Does your activity require Central Bank or Ministry of Health pre-approval? Do your foreign parent documents require MOFA apostilles? One miscategorized activity code triggers a formal rejection in Sijilat and costs you weeks.
              </p>
            </div>

            <div className="space-y-2 pb-6 border-b border-[#2a2a38]">
              <h3 className="font-heading font-bold text-lg text-[#e8c872]">3. The Realisation</h3>
              <p className="text-[#a8a7b3] text-xs sm:text-sm">
                The international founders who receive their active Commercial Registration (CR) in days do not know more legal statutes than you. The difference is simple: <strong>they execute the steps in the exact right order.</strong>
              </p>
            </div>

            <div className="space-y-2 pb-6 border-b border-[#2a2a38]">
              <h3 className="font-heading font-bold text-lg text-[#e8c872]">4. The 3 Decisions</h3>
              <ul className="space-y-2 text-xs sm:text-sm text-[#a8a7b3]">
                <li><strong className="text-[#e8c872]">First:</strong> Define your commercial activity with extreme precision before filing, because it dictates your lease size, municipal zoning, and statutory licenses.</li>
                <li><strong className="text-[#e8c872]">Second:</strong> Select your legal structure (W.L.L. vs. branch) to match your foreign shareholder liability and banking expectations.</li>
                <li><strong className="text-[#e8c872]">Third:</strong> Audit and attest all shareholder passports and corporate resolutions once, thoroughly, before uploading to ministry portals.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="font-heading font-bold text-lg text-[#e8c872]">5. The Result</h3>
              <p className="text-[#a8a7b3] text-xs sm:text-sm">
                You open your email to see your official Commercial Registration Certificate issued by the Ministry of Industry and Commerce, your investor residency approved, and your corporate bank account ready to accept client wires.
              </p>
            </div>
          </div>
        </div>

        {/* CTA to Blueprint & Offer */}
        <div className="text-center space-y-4">
          <Link
            to="/formation/blueprint"
            className="btn-gold inline-flex items-center gap-2 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider text-[#16120a] shadow-2xl"
          >
            <BookOpen className="w-4 h-4" />
            <span>Open the 7-Step Interactive Blueprint &rarr;</span>
          </Link>
          <div>
            <Link to="/formation/offer" className="text-xs font-semibold text-[#e8c872] hover:underline">
              Or see our Done-With-You Setup Packages &rarr;
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
