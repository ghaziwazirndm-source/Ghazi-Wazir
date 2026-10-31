import { useParams, Link, Navigate } from 'react-router-dom';
import { SEOHead } from '../../components/SEOHead';
import { SERVICES_CATALOG } from '../ServiceDetailPage';
import {
  Play,
  Calendar,
  Phone,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export function VSLServicePage() {
  const { service } = useParams<{ service: string }>();
  const svc = service ? SERVICES_CATALOG[service] : null;

  if (!svc) {
    return <Navigate to="/funnels" replace />;
  }

  return (
    <>
      <SEOHead
        title={`${svc.name} — Direct Executive VSL | Ghazi Wazir`}
        description={svc.headline}
        noindex={true}
      />

      <div className="py-12 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Top Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#a8a7b3]">
          <Link to="/" className="hover:text-[#f5f1e8]">Home</Link>
          <span>/</span>
          <Link to="/funnels" className="hover:text-[#f5f1e8]">Funnels</Link>
          <span>/</span>
          <span className="text-[#e8c872]">{svc.name}</span>
        </div>

        {/* Hero Headline */}
        <div className="text-center space-y-4">
          <div className="tag inline-block">{svc.company}</div>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-[#f5f1e8] leading-tight">
            {svc.headline}
          </h1>
          <p className="text-sm sm:text-base text-[#a8a7b3] max-w-2xl mx-auto leading-relaxed">
            {svc.description}
          </p>
        </div>

        {/* Video Block or Host Card Fallback */}
        <div className="card-luxury p-6 sm:p-8 border-gold-glow max-w-3xl mx-auto shadow-2xl">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <img
              src="/ghazi-wazir-photo.jpg"
              alt="Ghazi Wazir"
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl object-cover border-2 border-[#e8c872] flex-none shadow-xl"
            />
            <div className="space-y-2 text-center sm:text-left flex-1">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="font-heading font-bold text-xl text-[#f5f1e8]">Ghazi Wazir</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#1c2e20] text-[#4ade80] font-bold border border-[#4ade80]/40">
                  Verified Host
                </span>
              </div>
              <p className="text-xs text-[#e8c872] font-semibold">
                CEO &middot; Bab Al-Khaleej & Back for Brand LLC
              </p>
              <p className="text-xs text-[#a8a7b3] leading-relaxed">
                &ldquo;In this presentation, I outline the exact requirements, operational timelines, and statutory safeguards for {svc.name}.&rdquo;
              </p>
              <div className="pt-2 text-[11px] text-[#ffa24d] font-semibold flex items-center justify-center sm:justify-start gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Video Embed: CONFIGURATION REQUIRED (Awaiting embed URL)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main CTA Section */}
        <div className="text-center space-y-4 max-w-md mx-auto">
          <Link
            to="/book"
            className="btn-gold block py-4 rounded-full text-xs font-bold uppercase tracking-wider text-[#16120a] shadow-2xl"
          >
            📅 Book Your Free Consultation Now
          </Link>
          <a
            href={`https://wa.me/97335628353?text=Hello%20Ghazi%2C%20I%20am%20interested%20in%20your%20${encodeURIComponent(svc.name)}%20service.`}
            target="_blank"
            rel="noreferrer"
            className="block py-3.5 rounded-full border border-[#4ade80]/50 text-xs font-bold text-[#4ade80] hover:bg-[#14141d] transition-colors"
          >
            💬 Fast WhatsApp Inquiry (+973 3562 8353)
          </a>
        </div>

        {/* "What You Get" Section */}
        <div className="card-luxury p-8 sm:p-10 space-y-6 border-t-2 border-t-[#e8c872]">
          <h2 className="font-heading font-bold text-2xl text-[#f5f1e8]">
            What You Get With This Solution
          </h2>
          <div className="space-y-3">
            {svc.deliverables.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3.5 bg-[#101018] rounded-xl border border-[#2a2a38]">
                <CheckCircle2 className="w-5 h-5 text-[#e8c872] flex-none mt-0.5" />
                <span className="text-xs sm:text-sm text-[#f5f1e8] leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 3-Step Process */}
        <div className="space-y-6">
          <h2 className="font-heading font-bold text-2xl text-[#f5f1e8] text-center">
            Our 3-Step Execution Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-luxury p-6 space-y-2">
              <span className="text-xs font-bold text-[#e8c872] block">Step 01</span>
              <h3 className="font-heading font-bold text-base text-[#f5f1e8]">Discovery & Scoping</h3>
              <p className="text-xs text-[#a8a7b3] leading-relaxed">
                We review shareholder eligibility or technical infrastructure needs, verifying all documentation beforehand.
              </p>
            </div>
            <div className="card-luxury p-6 space-y-2">
              <span className="text-xs font-bold text-[#e8c872] block">Step 02</span>
              <h3 className="font-heading font-bold text-base text-[#f5f1e8]">Execution & Clearance</h3>
              <p className="text-xs text-[#a8a7b3] leading-relaxed">
                We submit official Sijilat filings or deploy semantic AI entity schemas with active monitoring.
              </p>
            </div>
            <div className="card-luxury p-6 space-y-2">
              <span className="text-xs font-bold text-[#e8c872] block">Step 03</span>
              <h3 className="font-heading font-bold text-base text-[#f5f1e8]">Active Delivery & Scale</h3>
              <p className="text-xs text-[#a8a7b3] leading-relaxed">
                Receive your Commercial Registration, investor smart cards, or live AI sales agent in production.
              </p>
            </div>
          </div>
        </div>

        {/* Meet the CEO */}
        <div className="card-luxury p-8 flex flex-col sm:flex-row items-center gap-6">
          <img
            src="/ghazi-wazir-photo.jpg"
            alt="Ghazi Wazir"
            className="w-20 h-20 rounded-full object-cover border border-[#e8c872] flex-none"
          />
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-bold text-[#e8c872] uppercase tracking-wider block">Direct Responsibility</span>
            <h3 className="font-heading font-bold text-lg text-[#f5f1e8]">Meet Ghazi Wazir</h3>
            <p className="text-xs text-[#a8a7b3] leading-relaxed">
              Based in the Kingdom of Bahrain. Ghazi Wazir leads every commercial engagement personally, ensuring client operations are protected from regulatory errors and digital obsolescence.
            </p>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="card-luxury p-6 sm:p-8 space-y-4">
          <h3 className="font-heading font-bold text-lg text-[#f5f1e8]">Frequently Asked Questions</h3>
          <div className="space-y-3">
            {svc.faqs.map((f, idx) => (
              <div key={idx} className="p-4 bg-[#101018] rounded-xl border border-[#2a2a38] space-y-1.5">
                <h4 className="font-bold text-xs text-[#e8c872]">{f.q}</h4>
                <p className="text-xs text-[#a8a7b3] leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Regulatory Disclaimer */}
        <div className="card-luxury p-6 flex items-start gap-3 text-xs text-[#a8a7b3] bg-[#101018]">
          <ShieldAlert className="w-5 h-5 text-[#e8c872] flex-none mt-0.5" />
          <p>
            <strong>Regulatory Disclaimer:</strong> Bab Al-Khaleej and Back for Brand LLC are private commercial and technical consultancies, not government bodies or law practices. Approvals and final residency determinations remain under the statutory discretion of Bahraini government ministries. This page contains general corporate intelligence, not legal counsel.
          </p>
        </div>

        {/* Bottom CTA */}
        <div className="text-center pt-4">
          <Link
            to="/book"
            className="btn-gold inline-flex items-center gap-2 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider text-[#16120a] shadow-2xl"
          >
            <Calendar className="w-4 h-4" />
            <span>Lock Your Consultation Slot</span>
          </Link>
        </div>
      </div>
    </>
  );
}
