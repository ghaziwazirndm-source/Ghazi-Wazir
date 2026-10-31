import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { Shield, Building2, Globe, Calendar, Phone, Mail, Award, CheckCircle2 } from 'lucide-react';

export function AboutPage() {
  return (
    <>
      <SEOHead
        title="About Ghazi Wazir — CEO of Bab Al-Khaleej & Back for Brand LLC"
        description="Learn about Ghazi Wazir, an executive based in Bahrain heading Bab Al-Khaleej (business setup, visas, tracking) and Back for Brand LLC (GEO, AEO, AI agents, funnels)."
        canonical="https://ghaziwazir.com/about"
      />

      <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-1 bg-gradient-to-tr from-[#e8c872] to-[#b8893a] rounded-3xl blur-sm opacity-50" />
              <div className="relative bg-[#14141d] border border-[#2a2a38] rounded-3xl p-3 shadow-2xl">
                <img
                  src="/ghazi-wazir-photo.jpg"
                  alt="Ghazi Wazir"
                  className="w-full h-auto aspect-[4/5] object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="tag inline-block">Executive Biography</div>
            <h1 className="font-heading font-black text-4xl sm:text-5xl text-[#f5f1e8]">
              Ghazi Wazir
            </h1>
            <p className="text-sm font-semibold text-[#e8c872] tracking-wider uppercase">
              Chief Executive Officer &middot; Based in the Kingdom of Bahrain
            </p>

            <p className="text-sm sm:text-base text-[#a8a7b3] leading-relaxed">
              Ghazi Wazir serves as the CEO of two distinct corporate entities: <strong className="text-[#f5f1e8]">Bab Al-Khaleej</strong>, a specialized corporate services consultancy in Manama, Bahrain; and <strong className="text-[#f5f1e8]">Back for Brand LLC</strong>, an American technology company registered in Florida, USA.
            </p>

            <p className="text-sm sm:text-base text-[#a8a7b3] leading-relaxed">
              Operating at the intersection of Middle Eastern regulatory compliance and advanced generative search engineering, Ghazi Wazir provides international founders, investors, and corporate leadership with a singular, accountable standard of execution.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link to="/book" className="btn-gold px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#16120a] flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Book a Consultation</span>
              </Link>
              <a
                href="https://wa.me/97335628353"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 rounded-full border border-[#2a2a38] text-xs font-semibold text-[#f5f1e8] hover:border-[#4ade80] flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#4ade80]" />
                <span>WhatsApp (+973 3562 8353)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Operating Philosophy */}
        <div className="card-luxury p-8 sm:p-12 border-t-2 border-t-[#e8c872] space-y-8">
          <div className="max-w-3xl space-y-3">
            <div className="tag inline-block">The Standard</div>
            <h2 className="font-heading font-bold text-3xl text-[#f5f1e8]">
              The Core Operating Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#a8a7b3]">
            <div className="p-6 bg-[#101018] rounded-2xl border border-[#2a2a38] space-y-3">
              <h3 className="font-heading font-bold text-base text-[#f5f1e8]">
                1. No False Promises
              </h3>
              <p className="leading-relaxed">
                We are a private management consultancy, not a government ministry. We do not invent statistics, promise guaranteed visa approvals, or forecast impossible timelines. All final statutory decisions belong to the respective Bahraini authorities.
              </p>
            </div>

            <div className="p-6 bg-[#101018] rounded-2xl border border-[#2a2a38] space-y-3">
              <h3 className="font-heading font-bold text-base text-[#f5f1e8]">
                2. Real Technology, No AI Slop
              </h3>
              <p className="leading-relaxed">
                Back for Brand LLC builds real, verified digital architectures: server-enforced Generative Engine Optimization (GEO), Answer Engine Optimization (AEO), and deterministic AI sales systems backed by cryptographic audit logs.
              </p>
            </div>

            <div className="p-6 bg-[#101018] rounded-2xl border border-[#2a2a38] space-y-3">
              <h3 className="font-heading font-bold text-base text-[#f5f1e8]">
                3. Direct Executive Contact
              </h3>
              <p className="leading-relaxed">
                When you schedule a consultation with our firm, you speak directly with Ghazi Wazir. We prioritize long-term corporate relationships over high-volume transactional handling.
              </p>
            </div>
          </div>
        </div>

        {/* Dual Leadership Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card-luxury p-8 space-y-4">
            <div className="flex items-center gap-3">
              <Building2 className="w-6 h-6 text-[#e8c872]" />
              <h3 className="font-heading font-bold text-xl text-[#f5f1e8]">Bab Al-Khaleej</h3>
            </div>
            <p className="text-xs text-[#a8a7b3] leading-relaxed">
              Positioned in Manama, Bahrain. Specializing in Commercial Registration (CR), investor visa residency, employee LMRA clearing, and corporate document attestation.
            </p>
            <Link to="/companies" className="text-xs font-bold text-[#e8c872] hover:underline inline-block">
              Learn more about Bab Al-Khaleej &rarr;
            </Link>
          </div>

          <div className="card-luxury p-8 space-y-4">
            <div className="flex items-center gap-3">
              <Globe className="w-6 h-6 text-[#b8893a]" />
              <h3 className="font-heading font-bold text-xl text-[#f5f1e8]">Back for Brand LLC</h3>
            </div>
            <p className="text-xs text-[#a8a7b3] leading-relaxed">
              Incorporated in Florida, USA. Serving clients globally with Generative Engine Optimization (GEO), Answer Engine Optimization (AEO), AI automation, and high-converting funnels.
            </p>
            <Link to="/companies" className="text-xs font-bold text-[#e8c872] hover:underline inline-block">
              Learn more about Back for Brand LLC &rarr;
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
