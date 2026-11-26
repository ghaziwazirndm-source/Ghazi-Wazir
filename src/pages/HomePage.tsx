import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { BookingWidget } from '../components/BookingWidget';
import { SocialLinks } from '../components/SocialLinks';
import { LeadModal } from '../components/LeadModal';
import { AnimatedHeadlines } from '../components/AnimatedHeadlines';
import { Top20ProblemsHub } from '../components/Top20ProblemsHub';
import { TOP_20_PROBLEMS } from '../data/top20Problems';
import {
  Building2,
  Globe,
  ShieldCheck,
  Cpu,
  TrendingUp,
  FileCheck,
  Clock,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Sparkles,
  Award,
  Layers,
  ChevronRight,
  MessageSquare,
  ExternalLink
} from 'lucide-react';

export function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalService, setModalService] = useState('General Inquiry');

  const openInquiry = (svc: string) => {
    setModalService(svc);
    setModalOpen(true);
  };

  const homeSchema = {
    '@type': 'FAQPage',
    '@id': 'https://ghaziwazir.com/#faq',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Who is Ghazi Wazir?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ghazi Wazir is an executive and technology leader based at The Collective Hub, Yateem Center in Manama, Bahrain (+973 3439 8754), serving as CEO of both Bab Al-Khaleej (Bahrain corporate setup and residency advisory) and Back for Brand LLC (USA technology services including SEO, GEO, AEO, and AI automation).'
        }
      },
      ...TOP_20_PROBLEMS.map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${item.solution} Detailed guidance is available at https://ghaziwazir.com${item.internalLink.to}.`
        }
      }))
    ]
  };

  return (
    <>
      <SEOHead
        title="Ghazi Wazir — CEO, Bab Al-Khaleej & Back for Brand LLC | Bahrain Setup & Technology"
        description="CEO of Bab Al-Khaleej (Bahrain business registration, investor visas, document tracking) and Back for Brand LLC (SEO, GEO, AEO, AI agents, funnels). Two companies. One standard."
        schema={homeSchema}
      />

      <div className="relative overflow-hidden">
        {/* Ambient Subtle Champagne Illumination */}
        <div className="absolute -top-24 left-1/4 w-[28rem] h-[28rem] bg-[#e8c872]/[0.06] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/4 right-10 w-80 h-80 bg-[#c59b38]/[0.05] rounded-full blur-3xl pointer-events-none" />

        {/* Hero Section */}
        <section className="relative pt-4 pb-14 sm:pt-6 lg:pt-8 lg:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* Hero Copy */}
              <div className="lg:col-span-7 space-y-5 text-left">
                {/* Dynamic Kinetic Animated Headlines */}
                <AnimatedHeadlines />

                {/* Primary Actions */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                  <Link
                    to="/book"
                    className="btn-gold min-h-[48px] px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider text-[#0b0905] flex items-center justify-center gap-2 shadow-2xl whitespace-nowrap"
                  >
                    <Calendar className="w-4 h-4 text-[#0b0905]" />
                    <span>Book a Free Consultation</span>
                  </Link>

                  <Link
                    to="/formation"
                    className="min-h-[48px] px-7 py-4 rounded-full border border-[#e8c872]/50 text-xs font-bold uppercase tracking-wider text-[#e8c872] hover:bg-[#181822] flex items-center justify-center gap-2 transition-all hover:border-[#e8c872] whitespace-nowrap"
                  >
                    <span>Bahrain Formation Blueprint</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Authority Highlights */}
                <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-5 border-t border-[#262633]">
                  <div>
                    <div className="font-heading font-bold text-xl text-[#f7f4ec] tabular-nums">100% Foreign</div>
                    <div className="text-xs text-[#a39f96]">Ownership Eligibility</div>
                  </div>
                  <div>
                    <div className="font-heading font-bold text-xl text-[#e8c872]">Dual CEO</div>
                    <div className="text-xs text-[#a39f96]">Manama &amp; Florida Entities</div>
                  </div>
                  <div>
                    <div className="font-heading font-bold text-xl text-[#f7f4ec]">GEO &amp; AEO</div>
                    <div className="text-xs text-[#a39f96]">Generative AI Authority</div>
                  </div>
                </div>
              </div>

              {/* Hero Portrait Card */}
              <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
                <div className="relative w-full max-w-md">
                  <div className="absolute -inset-px bg-gradient-to-b from-[#e8c872]/45 via-[#e8c872]/15 to-transparent rounded-3xl pointer-events-none" />
                  <div className="relative bg-[#121218] border border-[#e8c872]/25 rounded-3xl overflow-hidden shadow-[0_28px_60px_-20px_rgba(0,0,0,0.9)]">
                    <div className="relative">
                      <img
                        src="/ghazi-wazir-photo.jpg"
                        alt="Ghazi Wazir, CEO of Bab Al-Khaleej and Back for Brand LLC"
                        width={400}
                        height={500}
                        fetchPriority="high"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        className="w-full h-auto aspect-[4/5] object-cover transition-transform duration-500 hover:scale-[1.015]"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#121218] via-[#121218]/65 to-transparent pointer-events-none" />
                    </div>
                    <div className="px-6 pb-6 pt-2 bg-[#121218]">
                      <div className="flex items-center justify-between gap-2">
                        <div className="font-heading font-bold text-2xl text-[#f7f4ec]">Ghazi Wazir</div>
                        <span className="text-[11px] font-semibold uppercase tracking-widest text-[#e8c872]">
                          CEO &middot; Manama
                        </span>
                      </div>
                      <p className="text-xs text-[#a39f96] mt-2 leading-relaxed">
                        &ldquo;We don&rsquo;t offer generic templates or bureaucratic promises. We deliver structured execution for entrepreneurs setting up in Bahrain and scaling worldwide.&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust & Authority Strip */}
        <section className="border-y border-[#2a2a38] bg-[#101018] py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col items-center gap-1.5">
                <Building2 className="w-5 h-5 text-[#e8c872]" />
                <span className="text-xs font-bold text-[#f5f1e8] uppercase tracking-wider">Bahrain MOIC & Sijilat</span>
                <span className="text-[11px] text-[#a8a7b3]">Commercial Registration (CR)</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <ShieldCheck className="w-5 h-5 text-[#e8c872]" />
                <span className="text-xs font-bold text-[#f5f1e8] uppercase tracking-wider">LMRA & NPRA Bahrain</span>
                <span className="text-[11px] text-[#a8a7b3]">Investor & Worker Residency</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <Globe className="w-5 h-5 text-[#e8c872]" />
                <span className="text-xs font-bold text-[#f5f1e8] uppercase tracking-wider">GEO & AEO Search</span>
                <span className="text-[11px] text-[#a8a7b3]">Perplexity, ChatGPT & Gemini</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <Cpu className="w-5 h-5 text-[#e8c872]" />
                <span className="text-xs font-bold text-[#f5f1e8] uppercase tracking-wider">Autonomous AI Agents</span>
                <span className="text-[11px] text-[#a8a7b3]">Back for Brand Technology</span>
              </div>
            </div>
          </div>
        </section>


        {/* "Two Companies. One Standard" Section */}
        <section className="py-20 bg-[#0a0a0f]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <div className="tag inline-block">The Dual Executive Advantage</div>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#f5f1e8]">
                Two Specialized Companies. <span className="text-gold-gradient">One CEO Standard.</span>
              </h2>
              <p className="text-sm sm:text-base text-[#a8a7b3]">
                Most business registration consultants know zero technology. Most digital agencies know nothing about Bahrain government clearance. Ghazi Wazir directs both under one rigorous operating standard.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Bab Al-Khaleej Card */}
              <div className="card-luxury p-8 flex flex-col justify-between border-t-2 border-t-[#e8c872]">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#e8c872]">Bahrain On-Ground Entity</span>
                    <span className="text-xs text-[#a8a7b3]">Manama, Bahrain</span>
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-[#f5f1e8]">
                    Bab Al-Khaleej
                  </h3>
                  <p className="text-xs text-[#a8a7b3] leading-relaxed">
                    Your complete operational bridge into the Kingdom of Bahrain. We navigate local ministries, commercial lease requirements, shareholder resolutions, and document clearing so you launch without administrative friction.
                  </p>

                  <ul className="space-y-2.5 pt-2 text-xs text-[#f5f1e8]">
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#e8c872] flex-none" />
                      <span>Commercial Registration (CR) through Sijilat portal</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#e8c872] flex-none" />
                      <span>Investor Visas (self-sponsorship) & LMRA Worker permits</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#e8c872] flex-none" />
                      <span>Document clearance, embassy attestation, and tracking</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#e8c872] flex-none" />
                      <span>Ongoing corporate secretarial and annual compliance</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-8 mt-6 border-t border-[#2a2a38] flex items-center justify-between">
                  <Link
                    to="/services/business-registration"
                    className="text-xs font-bold text-[#e8c872] hover:underline flex items-center gap-1.5"
                  >
                    <span>Explore Bahrain Services</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => openInquiry('Bab Al-Khaleej Consultation')}
                    className="px-4 py-2 rounded-full border border-[#2a2a38] text-xs font-semibold text-[#f5f1e8] hover:border-[#e8c872]"
                  >
                    Request CR Quote
                  </button>
                </div>
              </div>

              {/* Back for Brand LLC Card */}
              <div className="card-luxury p-8 flex flex-col justify-between border-t-2 border-t-[#b8893a]">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#e8c872]">Global Tech & AI Entity</span>
                    <span className="text-xs text-[#a8a7b3]">Florida, United States</span>
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-[#f5f1e8]">
                    Back for Brand LLC
                  </h3>
                  <p className="text-xs text-[#a8a7b3] leading-relaxed">
                    Pioneering Generative Engine Optimization (GEO), Answer Engine Optimization (AEO), and autonomous AI agent architectures. We position modern brands inside ChatGPT, Gemini, Perplexity, and high-converting sales funnels.
                  </p>

                  <ul className="space-y-2.5 pt-2 text-xs text-[#f5f1e8]">
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#b8893a] flex-none" />
                      <span>GEO & AEO (AI search engine visibility & citation dominance)</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#b8893a] flex-none" />
                      <span>Autonomous AI Sales Agents & Unified Customer Inboxes</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#b8893a] flex-none" />
                      <span>Modern digital marketing, organic search & programmatic SEO</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#b8893a] flex-none" />
                      <span>High-converting VSL sales funnels & full-stack development</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-8 mt-6 border-t border-[#2a2a38] flex items-center justify-between">
                  <Link
                    to="/services/geo-aeo"
                    className="text-xs font-bold text-[#e8c872] hover:underline flex items-center gap-1.5"
                  >
                    <span>Explore Technology Services</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => openInquiry('Back for Brand Tech Consultation')}
                    className="px-4 py-2 rounded-full border border-[#2a2a38] text-xs font-semibold text-[#f5f1e8] hover:border-[#e8c872]"
                  >
                    Request Tech Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 12 Core Services Overview */}
        <section className="py-20 bg-[#101018] border-t border-[#2a2a38]" id="services">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <div className="tag inline-block mb-2">Corporate & Digital Solutions</div>
                <h2 className="font-heading font-black text-3xl text-[#f5f1e8]">
                  Complete Suite of 12 Services
                </h2>
              </div>
              <Link
                to="/packages"
                className="text-xs font-bold text-[#e8c872] hover:underline flex items-center gap-1"
              >
                <span>View Full Packages & Pricing Structure &rarr;</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Service 1 */}
              <div className="card-luxury p-6 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#1c1c28] border border-[#2a2a38] flex items-center justify-center mb-4 text-[#e8c872]">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-[#f5f1e8] mb-1">
                    Business Registration
                  </h3>
                  <p className="text-xs text-[#a8a7b3] leading-relaxed mb-4">
                    End-to-end Commercial Registration (CR) setup in Bahrain for foreign and domestic founders with 100% ownership options.
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[#2a2a38] text-xs">
                  <Link to="/services/business-registration" className="font-semibold text-[#e8c872] hover:underline">
                    View Details &rarr;
                  </Link>
                  <Link to="/funnels/business-registration" className="text-[11px] text-[#a8a7b3] hover:text-[#f5f1e8]">
                    VSL Funnel
                  </Link>
                </div>
              </div>

              {/* Service 2 */}
              <div className="card-luxury p-6 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#1c1c28] border border-[#2a2a38] flex items-center justify-center mb-4 text-[#e8c872]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-[#f5f1e8] mb-1">
                    Investor & Partner Visa
                  </h3>
                  <p className="text-xs text-[#a8a7b3] leading-relaxed mb-4">
                    Residency permits linked directly to your corporate ownership in Bahrain, enabling multi-entry and regional travel.
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[#2a2a38] text-xs">
                  <Link to="/services/investor-visa" className="font-semibold text-[#e8c872] hover:underline">
                    View Details &rarr;
                  </Link>
                  <Link to="/funnels/investor-visa" className="text-[11px] text-[#a8a7b3] hover:text-[#f5f1e8]">
                    VSL Funnel
                  </Link>
                </div>
              </div>

              {/* Service 3 */}
              <div className="card-luxury p-6 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#1c1c28] border border-[#2a2a38] flex items-center justify-center mb-4 text-[#e8c872]">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-[#f5f1e8] mb-1">
                    Worker Visas & LMRA
                  </h3>
                  <p className="text-xs text-[#a8a7b3] leading-relaxed mb-4">
                    Labour Market Regulatory Authority quota applications, work permits, and biometric residency coordination.
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[#2a2a38] text-xs">
                  <Link to="/services/worker-visa" className="font-semibold text-[#e8c872] hover:underline">
                    View Details &rarr;
                  </Link>
                  <Link to="/funnels/worker-visa" className="text-[11px] text-[#a8a7b3] hover:text-[#f5f1e8]">
                    VSL Funnel
                  </Link>
                </div>
              </div>

              {/* Service 4 */}
              <div className="card-luxury p-6 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#1c1c28] border border-[#2a2a38] flex items-center justify-center mb-4 text-[#e8c872]">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-[#f5f1e8] mb-1">
                    Document Consultancy
                  </h3>
                  <p className="text-xs text-[#a8a7b3] leading-relaxed mb-4">
                    Expert translation, MOFA & embassy attestation, corporate resolution structuring, and legal packet validation.
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[#2a2a38] text-xs">
                  <Link to="/services/document-consultancy" className="font-semibold text-[#e8c872] hover:underline">
                    View Details &rarr;
                  </Link>
                  <Link to="/funnels/document-consultancy" className="text-[11px] text-[#a8a7b3] hover:text-[#f5f1e8]">
                    VSL Funnel
                  </Link>
                </div>
              </div>

              {/* Service 5 */}
              <div className="card-luxury p-6 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#1c1c28] border border-[#2a2a38] flex items-center justify-center mb-4 text-[#e8c872]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-[#f5f1e8] mb-1">
                    Application Tracking
                  </h3>
                  <p className="text-xs text-[#a8a7b3] leading-relaxed mb-4">
                    Active case tracking across ministry queues with proactive resolution of clearance queries or delays.
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[#2a2a38] text-xs">
                  <Link to="/services/application-tracking" className="font-semibold text-[#e8c872] hover:underline">
                    View Details &rarr;
                  </Link>
                  <Link to="/funnels/application-tracking" className="text-[11px] text-[#a8a7b3] hover:text-[#f5f1e8]">
                    VSL Funnel
                  </Link>
                </div>
              </div>

              {/* Service 6 */}
              <div className="card-luxury p-6 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#1c1c28] border border-[#2a2a38] flex items-center justify-center mb-4 text-[#e8c872]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-[#f5f1e8] mb-1">
                    Ongoing Corporate Support
                  </h3>
                  <p className="text-xs text-[#a8a7b3] leading-relaxed mb-4">
                    Annual CR renewals, audit filing reminders, bank account maintenance, and regulatory compliance advisory.
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[#2a2a38] text-xs">
                  <Link to="/services/ongoing-support" className="font-semibold text-[#e8c872] hover:underline">
                    View Details &rarr;
                  </Link>
                  <Link to="/funnels/ongoing-support" className="text-[11px] text-[#a8a7b3] hover:text-[#f5f1e8]">
                    VSL Funnel
                  </Link>
                </div>
              </div>

              {/* Service 7 */}
              <div className="card-luxury p-6 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#1c1c28] border border-[#2a2a38] flex items-center justify-center mb-4 text-[#e8c872]">
                    <Globe className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-[#f5f1e8] mb-1">
                    GEO & AEO Optimization
                  </h3>
                  <p className="text-xs text-[#a8a7b3] leading-relaxed mb-4">
                    Position your brand inside modern Generative Engine answer boxes like ChatGPT, Perplexity, and Google Gemini.
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[#2a2a38] text-xs">
                  <Link to="/services/geo-aeo" className="font-semibold text-[#e8c872] hover:underline">
                    View Details &rarr;
                  </Link>
                  <Link to="/funnels/geo-aeo" className="text-[11px] text-[#a8a7b3] hover:text-[#f5f1e8]">
                    VSL Funnel
                  </Link>
                </div>
              </div>

              {/* Service 8 */}
              <div className="card-luxury p-6 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#1c1c28] border border-[#2a2a38] flex items-center justify-center mb-4 text-[#e8c872]">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-[#f5f1e8] mb-1">
                    Organic & Technical SEO
                  </h3>
                  <p className="text-xs text-[#a8a7b3] leading-relaxed mb-4">
                    High-authority technical architecture, topical authority maps, and programmatic search growth.
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[#2a2a38] text-xs">
                  <Link to="/services/seo" className="font-semibold text-[#e8c872] hover:underline">
                    View Details &rarr;
                  </Link>
                  <Link to="/funnels/seo" className="text-[11px] text-[#a8a7b3] hover:text-[#f5f1e8]">
                    VSL Funnel
                  </Link>
                </div>
              </div>

              {/* Service 9 */}
              <div className="card-luxury p-6 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#1c1c28] border border-[#2a2a38] flex items-center justify-center mb-4 text-[#e8c872]">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-[#f5f1e8] mb-1">
                    Autonomous AI Sales Agents
                  </h3>
                  <p className="text-xs text-[#a8a7b3] leading-relaxed mb-4">
                    Deploy 24/7 AI sales agents trained strictly on approved corporate knowledge with prompt injection security.
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[#2a2a38] text-xs">
                  <Link to="/services/ai-agents" className="font-semibold text-[#e8c872] hover:underline">
                    View Details &rarr;
                  </Link>
                  <Link to="/funnels/ai-agents" className="text-[11px] text-[#a8a7b3] hover:text-[#f5f1e8]">
                    VSL Funnel
                  </Link>
                </div>
              </div>

              {/* Service 10 */}
              <div className="card-luxury p-6 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#1c1c28] border border-[#2a2a38] flex items-center justify-center mb-4 text-[#e8c872]">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-[#f5f1e8] mb-1">
                    Automation & CRM Engines
                  </h3>
                  <p className="text-xs text-[#a8a7b3] leading-relaxed mb-4">
                    Unified inboxes, lead qualification pipelines, calendar sync, and automated follow-ups.
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[#2a2a38] text-xs">
                  <Link to="/services/automation" className="font-semibold text-[#e8c872] hover:underline">
                    View Details &rarr;
                  </Link>
                  <Link to="/funnels/automation" className="text-[11px] text-[#a8a7b3] hover:text-[#f5f1e8]">
                    VSL Funnel
                  </Link>
                </div>
              </div>

              {/* Service 11 */}
              <div className="card-luxury p-6 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#1c1c28] border border-[#2a2a38] flex items-center justify-center mb-4 text-[#e8c872]">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-[#f5f1e8] mb-1">
                    Digital Performance Marketing
                  </h3>
                  <p className="text-xs text-[#a8a7b3] leading-relaxed mb-4">
                    Data-driven client acquisition campaigns engineered to generate qualified B2B inquiries and sales bookings.
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[#2a2a38] text-xs">
                  <Link to="/services/digital-marketing" className="font-semibold text-[#e8c872] hover:underline">
                    View Details &rarr;
                  </Link>
                  <Link to="/funnels/digital-marketing" className="text-[11px] text-[#a8a7b3] hover:text-[#f5f1e8]">
                    VSL Funnel
                  </Link>
                </div>
              </div>

              {/* Service 12 */}
              <div className="card-luxury p-6 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#1c1c28] border border-[#2a2a38] flex items-center justify-center mb-4 text-[#e8c872]">
                    <Globe className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-[#f5f1e8] mb-1">
                    Websites & High-Converting Funnels
                  </h3>
                  <p className="text-xs text-[#a8a7b3] leading-relaxed mb-4">
                    Russell Brunson-style video sales letter funnels, interactive qualification quizzes, and luxury web presence.
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[#2a2a38] text-xs">
                  <Link to="/services/websites-funnels" className="font-semibold text-[#e8c872] hover:underline">
                    View Details &rarr;
                  </Link>
                  <Link to="/funnels/websites-funnels" className="text-[11px] text-[#a8a7b3] hover:text-[#f5f1e8]">
                    VSL Funnel
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3-Step Methodology Section */}
        <section className="py-20 bg-[#0a0a0f]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <div className="tag inline-block">Methodology</div>
              <h2 className="font-heading font-black text-3xl text-[#f5f1e8]">
                How We Execute: The 3-Step Path
              </h2>
              <p className="text-sm text-[#a8a7b3]">
                Predictable, audited, and transparent corporate execution from initial scoping to operational launch.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card-luxury p-8 relative">
                <span className="font-heading font-black text-5xl text-[#e8c872]/20 absolute top-4 right-6">01</span>
                <h3 className="font-heading font-bold text-xl text-[#f5f1e8] mb-2">Strategy & Scoping</h3>
                <p className="text-xs text-[#a8a7b3] leading-relaxed">
                  We review your business activities, shareholder residency plans, and commercial objectives. We determine the exact Bahrain activity codes or digital infrastructure needed.
                </p>
              </div>

              <div className="card-luxury p-8 relative">
                <span className="font-heading font-black text-5xl text-[#e8c872]/20 absolute top-4 right-6">02</span>
                <h3 className="font-heading font-bold text-xl text-[#f5f1e8] mb-2">Filing & Clearance</h3>
                <p className="text-xs text-[#a8a7b3] leading-relaxed">
                  We handle the bureaucratic heavy lifting: drafting memorandum of association, submitting Sijilat filings, clearing LMRA approvals, or deploying AI search entities.
                </p>
              </div>

              <div className="card-luxury p-8 relative">
                <span className="font-heading font-black text-5xl text-[#e8c872]/20 absolute top-4 right-6">03</span>
                <h3 className="font-heading font-bold text-xl text-[#f5f1e8] mb-2">Launch & Scale</h3>
                <p className="text-xs text-[#a8a7b3] leading-relaxed">
                  Receive your verified Commercial Registration Certificate, active residency cards, bank accounts, and high-performance digital marketing funnels to capture market share.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Strategic Guides Preview */}
        <section className="py-20 bg-[#101018] border-t border-[#2a2a38]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <div className="tag inline-block mb-2">Knowledge Base</div>
                <h2 className="font-heading font-black text-3xl text-[#f5f1e8]">
                  In-Depth Strategic Guides
                </h2>
              </div>
              <Link to="/blog" className="text-xs font-bold text-[#e8c872] hover:underline">
                View All Guides &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link to="/blog/register-company-bahrain" className="card-luxury p-6 block group">
                <span className="text-[11px] font-bold text-[#e8c872] uppercase tracking-wider block mb-2">Bahrain Formation</span>
                <h3 className="font-heading font-bold text-lg text-[#f5f1e8] group-hover:text-[#e8c872] transition-colors mb-2">
                  How to Register a Company in Bahrain: The Complete Founder's Guide
                </h3>
                <p className="text-xs text-[#a8a7b3] leading-relaxed">
                  Understand 100% foreign ownership criteria, commercial lease requirements, and Sijilat approvals.
                </p>
                <div className="mt-4 text-xs font-semibold text-[#e8c872] flex items-center gap-1">
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>

              <Link to="/blog/investor-vs-worker-visa" className="card-luxury p-6 block group">
                <span className="text-[11px] font-bold text-[#e8c872] uppercase tracking-wider block mb-2">Residency & Visas</span>
                <h3 className="font-heading font-bold text-lg text-[#f5f1e8] group-hover:text-[#e8c872] transition-colors mb-2">
                  Investor Visa vs Worker Visa in Bahrain: Rights, Costs, and Rules
                </h3>
                <p className="text-xs text-[#a8a7b3] leading-relaxed">
                  Comparing self-sponsorship partner residency against employee work permits under LMRA.
                </p>
                <div className="mt-4 text-xs font-semibold text-[#e8c872] flex items-center gap-1">
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>

              <Link to="/blog/what-is-geo-and-aeo" className="card-luxury p-6 block group">
                <span className="text-[11px] font-bold text-[#e8c872] uppercase tracking-wider block mb-2">Generative AI</span>
                <h3 className="font-heading font-bold text-lg text-[#f5f1e8] group-hover:text-[#e8c872] transition-colors mb-2">
                  What is GEO & AEO? The Evolution from Google Ranks to AI Answers
                </h3>
                <p className="text-xs text-[#a8a7b3] leading-relaxed">
                  How to structure entity data so modern Large Language Models cite your company as the authoritative answer.
                </p>
                <div className="mt-4 text-xs font-semibold text-[#e8c872] flex items-center gap-1">
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Top 20 Searchable Founder & Growth Problems Knowledge Hub */}
        <Top20ProblemsHub />

        {/* Executive Semantic Linking Directory & Internal Architecture Mesh */}
        <section className="py-16 bg-[#08080b] border-t border-[#262633]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
              <div className="tag inline-block">Executive Semantic Index &amp; Architecture</div>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#f7f4ec]">
                Complete Advisory Services &amp; Funnel Network
              </h2>
              <p className="text-xs sm:text-sm text-[#a39f96]">
                Direct semantic navigation to all corporate formation pathways, AI marketing services, and verified statutory frameworks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 sm:p-8 rounded-2xl bg-[#111117] border border-[#262633]">
              {/* Column 1: Bab Al-Khaleej (Bahrain) */}
              <div className="space-y-4">
                <h3 className="flex items-center gap-2 text-base font-bold text-[#e8c872] pb-2 border-b border-[#262633]">
                  <Building2 className="w-4 h-4 text-[#e8c872]" />
                  <span>Bab Al-Khaleej (Bahrain CR &amp; Visas)</span>
                </h3>
                <ul className="space-y-2.5 text-xs text-[#a39f96]">
                  <li>
                    <Link to="/services/business-registration" className="hover:text-[#e8c872] transition-colors flex items-center justify-between">
                      <span>Commercial Registration (CR) Formation</span>
                      <ChevronRight className="w-3 h-3 text-[#e8c872]" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/investor-visa" className="hover:text-[#e8c872] transition-colors flex items-center justify-between">
                      <span>Investor &amp; Partner Self-Sponsored Visas</span>
                      <ChevronRight className="w-3 h-3 text-[#e8c872]" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/worker-visa" className="hover:text-[#e8c872] transition-colors flex items-center justify-between">
                      <span>Worker Permits &amp; LMRA Workforce Quota</span>
                      <ChevronRight className="w-3 h-3 text-[#e8c872]" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/document-consultancy" className="hover:text-[#e8c872] transition-colors flex items-center justify-between">
                      <span>Document Clearance &amp; Notary Notarization</span>
                      <ChevronRight className="w-3 h-3 text-[#e8c872]" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/application-tracking" className="hover:text-[#e8c872] transition-colors flex items-center justify-between">
                      <span>Sijilat Status &amp; Real-Time Tracking</span>
                      <ChevronRight className="w-3 h-3 text-[#e8c872]" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/ongoing-support" className="hover:text-[#e8c872] transition-colors flex items-center justify-between">
                      <span>Annual Corporate &amp; Municipal Compliance</span>
                      <ChevronRight className="w-3 h-3 text-[#e8c872]" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/formation/blueprint" className="hover:text-[#e8c872] transition-colors flex items-center justify-between font-semibold text-[#f7f4ec]">
                      <span>7-Step Bahrain Formation Blueprint</span>
                      <ChevronRight className="w-3 h-3 text-[#e8c872]" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/formation/offer" className="hover:text-[#e8c872] transition-colors flex items-center justify-between font-semibold text-[#f7f4ec]">
                      <span>Done-With-You Corporate Execution Package</span>
                      <ChevronRight className="w-3 h-3 text-[#e8c872]" />
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 2: Back for Brand LLC (USA & Worldwide Tech) */}
              <div className="space-y-4">
                <h3 className="flex items-center gap-2 text-base font-bold text-[#e8c872] pb-2 border-b border-[#262633]">
                  <Globe className="w-4 h-4 text-[#e8c872]" />
                  <span>Back for Brand LLC (GEO, AEO &amp; AI)</span>
                </h3>
                <ul className="space-y-2.5 text-xs text-[#a39f96]">
                  <li>
                    <Link to="/services/geo-aeo" className="hover:text-[#e8c872] transition-colors flex items-center justify-between">
                      <span>Generative Engine Optimization (GEO)</span>
                      <ChevronRight className="w-3 h-3 text-[#e8c872]" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/geo-aeo" className="hover:text-[#e8c872] transition-colors flex items-center justify-between">
                      <span>Answer Engine Optimization (AEO Citations)</span>
                      <ChevronRight className="w-3 h-3 text-[#e8c872]" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/seo" className="hover:text-[#e8c872] transition-colors flex items-center justify-between">
                      <span>Programmatic &amp; Technical Organic SEO</span>
                      <ChevronRight className="w-3 h-3 text-[#e8c872]" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/ai-agents" className="hover:text-[#e8c872] transition-colors flex items-center justify-between">
                      <span>24/7 Autonomous AI Sales &amp; Voice Agents</span>
                      <ChevronRight className="w-3 h-3 text-[#e8c872]" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/automation" className="hover:text-[#e8c872] transition-colors flex items-center justify-between">
                      <span>CRM &amp; Workflow Business Automation</span>
                      <ChevronRight className="w-3 h-3 text-[#e8c872]" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/digital-marketing" className="hover:text-[#e8c872] transition-colors flex items-center justify-between">
                      <span>Digital Performance &amp; Omnichannel Ads</span>
                      <ChevronRight className="w-3 h-3 text-[#e8c872]" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/websites-funnels" className="hover:text-[#e8c872] transition-colors flex items-center justify-between">
                      <span>High-Converting VSL Web Applications</span>
                      <ChevronRight className="w-3 h-3 text-[#e8c872]" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/funnels" className="hover:text-[#e8c872] transition-colors flex items-center justify-between font-semibold text-[#f7f4ec]">
                      <span>12 Direct-Response VSL Funnels Hub</span>
                      <ChevronRight className="w-3 h-3 text-[#e8c872]" />
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 3: Corporate Portals, Guides & AI Crawler Corpus */}
              <div className="space-y-4">
                <h3 className="flex items-center gap-2 text-base font-bold text-[#e8c872] pb-2 border-b border-[#262633]">
                  <ShieldCheck className="w-4 h-4 text-[#e8c872]" />
                  <span>Authority Portals &amp; Discovery</span>
                </h3>
                <ul className="space-y-2.5 text-xs text-[#a39f96]">
                  <li>
                    <Link to="/companies" className="hover:text-[#e8c872] transition-colors flex items-center justify-between">
                      <span>Two Companies. One Standard Portfolio</span>
                      <ChevronRight className="w-3 h-3 text-[#e8c872]" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" className="hover:text-[#e8c872] transition-colors flex items-center justify-between">
                      <span>Ghazi Wazir Executive Biography &amp; Track Record</span>
                      <ChevronRight className="w-3 h-3 text-[#e8c872]" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/packages" className="hover:text-[#e8c872] transition-colors flex items-center justify-between">
                      <span>Complete Advisory &amp; Tech Packages</span>
                      <ChevronRight className="w-3 h-3 text-[#e8c872]" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/book" className="hover:text-[#e8c872] transition-colors flex items-center justify-between font-semibold text-[#e8c872]">
                      <span>Calendar Consultation Reservation</span>
                      <ChevronRight className="w-3 h-3 text-[#e8c872]" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="hover:text-[#e8c872] transition-colors flex items-center justify-between">
                      <span>Direct Executive Contact Channels</span>
                      <ChevronRight className="w-3 h-3 text-[#e8c872]" />
                    </Link>
                  </li>
                  <li>
                    <a href="/llms.txt" target="_blank" rel="noreferrer" className="hover:text-[#e8c872] transition-colors flex items-center justify-between">
                      <span>llms.txt (AI Discovery Standard)</span>
                      <ChevronRight className="w-3 h-3 text-[#e8c872]" />
                    </a>
                  </li>
                  <li>
                    <a href="/llms-full.txt" target="_blank" rel="noreferrer" className="hover:text-[#e8c872] transition-colors flex items-center justify-between">
                      <span>llms-full.txt (Knowledge Corpus)</span>
                      <ChevronRight className="w-3 h-3 text-[#e8c872]" />
                    </a>
                  </li>
                  <li>
                    <a href="/sitemap.xml" target="_blank" rel="noreferrer" className="hover:text-[#e8c872] transition-colors flex items-center justify-between">
                      <span>XML Sitemap Index</span>
                      <ChevronRight className="w-3 h-3 text-[#e8c872]" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Official Regulatory & Standards Outbound Authority Links */}
            <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-[#111117] border border-[#262633] space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#262633]">
                <h3 className="font-heading font-bold text-lg text-[#f7f4ec]">
                  Official Statutory Portals &amp; Technical Authority References
                </h3>
                <span className="text-xs text-[#a39f96]">Verified external regulatory &amp; web standards</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <a
                  href="https://www.sijilat.bh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-[#16161f] border border-[#262633] hover:border-[#e8c872] transition-colors space-y-1.5 block"
                >
                  <h4 className="font-bold text-[#f7f4ec] flex items-center justify-between gap-2">
                    <span>Sijilat Bahrain Portal</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#e8c872] flex-none" />
                  </h4>
                  <p className="text-[#a39f96]">Official commercial licensing &amp; ISIC4 registration system.</p>
                </a>

                <a
                  href="https://www.moic.gov.bh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-[#16161f] border border-[#262633] hover:border-[#e8c872] transition-colors space-y-1.5 block"
                >
                  <h4 className="font-bold text-[#f7f4ec] flex items-center justify-between gap-2">
                    <span>MOIC Bahrain</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#e8c872] flex-none" />
                  </h4>
                  <p className="text-[#a39f96]">Ministry of Industry &amp; Commerce corporate regulations.</p>
                </a>

                <a
                  href="https://www.lmra.gov.bh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-[#16161f] border border-[#262633] hover:border-[#e8c872] transition-colors space-y-1.5 block"
                >
                  <h4 className="font-bold text-[#f7f4ec] flex items-center justify-between gap-2">
                    <span>LMRA Authority</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#e8c872] flex-none" />
                  </h4>
                  <p className="text-[#a39f96]">Work permits, expatriate quotas &amp; labour compliance.</p>
                </a>

                <a
                  href="https://www.npra.gov.bh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-[#16161f] border border-[#262633] hover:border-[#e8c872] transition-colors space-y-1.5 block"
                >
                  <h4 className="font-bold text-[#f7f4ec] flex items-center justify-between gap-2">
                    <span>NPRA Residency</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#e8c872] flex-none" />
                  </h4>
                  <p className="text-[#a39f96]">Golden Visa, investor &amp; partner residency permits.</p>
                </a>

                <a
                  href="https://www.bahrainedb.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-[#16161f] border border-[#262633] hover:border-[#e8c872] transition-colors space-y-1.5 block"
                >
                  <h4 className="font-bold text-[#f7f4ec] flex items-center justify-between gap-2">
                    <span>Bahrain EDB</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#e8c872] flex-none" />
                  </h4>
                  <p className="text-[#a39f96]">Foreign Direct Investment incentives &amp; market data.</p>
                </a>

                <a
                  href="https://www.nbr.gov.bh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-[#16161f] border border-[#262633] hover:border-[#e8c872] transition-colors space-y-1.5 block"
                >
                  <h4 className="font-bold text-[#f7f4ec] flex items-center justify-between gap-2">
                    <span>NBR Bahrain Tax</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#e8c872] flex-none" />
                  </h4>
                  <p className="text-[#a39f96]">National Bureau for Revenue tax &amp; VAT compliance.</p>
                </a>

                <a
                  href="https://schema.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-[#16161f] border border-[#262633] hover:border-[#e8c872] transition-colors space-y-1.5 block"
                >
                  <h4 className="font-bold text-[#f7f4ec] flex items-center justify-between gap-2">
                    <span>Schema.org Standard</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#e8c872] flex-none" />
                  </h4>
                  <p className="text-[#a39f96]">Structured semantic knowledge graph specification.</p>
                </a>

                <a
                  href="https://developers.google.com/search"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-[#16161f] border border-[#262633] hover:border-[#e8c872] transition-colors space-y-1.5 block"
                >
                  <h4 className="font-bold text-[#f7f4ec] flex items-center justify-between gap-2">
                    <span>Google Search Central</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#e8c872] flex-none" />
                  </h4>
                  <p className="text-[#a39f96]">Core Web Vitals, crawlability &amp; technical SEO rules.</p>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 20 Verified Social Profiles Section */}
        <section className="py-20 bg-[#0a0a0f] border-t border-[#2a2a38]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
              <div className="tag inline-block">Executive Social Presence</div>
              <h2 className="font-heading font-black text-3xl text-[#f5f1e8]">
                Connect Across 20 Brand Channels
              </h2>
              <p className="text-sm text-[#a8a7b3]">
                Official verified profiles managed directly from the CEO Command Center.
              </p>
            </div>

            <SocialLinks />
          </div>
        </section>

        {/* Interactive Consultation Booking Widget Section */}
        <section className="py-20 bg-[#101018] border-t border-[#2a2a38]" id="book">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
              <div className="tag inline-block">Reserve Time Directly</div>
              <h2 className="font-heading font-black text-3xl text-[#f5f1e8]">
                Book a Free 1-on-1 Consultation
              </h2>
              <p className="text-sm text-[#a8a7b3]">
                Discuss your Bahrain company registration, investor visas, or Generative Engine Optimization directly with Ghazi Wazir.
              </p>
            </div>

            <BookingWidget defaultService="Free Strategic Consultation" />
          </div>
        </section>
      </div>

      <LeadModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultService={modalService}
      />
    </>
  );
}
