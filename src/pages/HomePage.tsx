import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { BookingWidget } from '../components/BookingWidget';
import { SocialLinks } from '../components/SocialLinks';
import { LeadModal } from '../components/LeadModal';
import { AnimatedHeadlines } from '../components/AnimatedHeadlines';
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
  MessageSquare
} from 'lucide-react';

export function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalService, setModalService] = useState('General Inquiry');

  const openInquiry = (svc: string) => {
    setModalService(svc);
    setModalOpen(true);
  };

  const homeSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Who is Ghazi Wazir?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ghazi Wazir is an executive and technology leader based in Bahrain, serving as CEO of both Bab Al-Khaleej (Bahrain corporate setup and residency advisory) and Back for Brand LLC (USA technology services including SEO, GEO, AEO, and AI automation).'
        }
      },
      {
        '@type': 'Question',
        name: 'Can foreign nationals own 100% of a company in Bahrain?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Under Bahrain Commercial Companies Law, foreign nationals and international corporations are eligible for 100% equity ownership in most commercial, trading, and technology activities without requiring a local Bahraini partner.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is GEO (Generative Engine Optimization)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Generative Engine Optimization (GEO) is the practice of optimizing digital entity footprints, factual consistency, and semantic knowledge graphs so that Large Language Models (ChatGPT, Perplexity, Gemini) synthesize and recommend your company as the authoritative answer.'
        }
      },
      {
        '@type': 'Question',
        name: 'How do I book a consultation with Ghazi Wazir?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can book a free consultation directly through the online calendar at /book or via WhatsApp at +973 3562 8353.'
        }
      }
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
        {/* Ambient Decorative Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--accent)]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-[var(--accent-alt)]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Hero Section */}
        <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Hero Copy */}
              <div className="lg:col-span-7 space-y-6 text-left">
                {/* Dynamic Kinetic Animated Headlines */}
                <AnimatedHeadlines />

                {/* Primary Actions */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                  <Link
                    to="/book"
                    className="btn-gold px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-2xl"
                  >
                    <Calendar className="w-4 h-4 text-white" />
                    <span>Book a Free Consultation</span>
                  </Link>

                  <Link
                    to="/formation"
                    className="px-7 py-4 rounded-full border border-[#e8c872]/60 text-xs font-bold uppercase tracking-wider text-[#e8c872] hover:bg-[#1a1a26] flex items-center justify-center gap-2 transition-all hover:border-[#e8c872]"
                  >
                    <span>Bahrain Formation Blueprint</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Authority Highlights */}
                <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-[#2a2a38]">
                  <div>
                    <div className="font-heading font-bold text-lg text-[#f5f1e8]">100% Foreign</div>
                    <div className="text-xs text-[#a8a7b3]">Ownership Eligibility</div>
                  </div>
                  <div>
                    <div className="font-heading font-bold text-lg text-[#e8c872]">Dual CEO</div>
                    <div className="text-xs text-[#a8a7b3]">Bahrain & USA Entities</div>
                  </div>
                  <div>
                    <div className="font-heading font-bold text-lg text-[#f5f1e8]">GEO & AEO</div>
                    <div className="text-xs text-[#a8a7b3]">Generative AI Visibility</div>
                  </div>
                </div>
              </div>

              {/* Hero Portrait Card */}
              <div className="lg:col-span-5 relative flex justify-center">
                <div className="relative w-full max-w-md">
                  {/* Decorative Frame */}
                  <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#e8c872] via-[#b8893a] to-transparent rounded-3xl blur-sm opacity-60" />
                  <div className="relative bg-[#14141d] border border-[#2a2a38] rounded-3xl overflow-hidden p-3 shadow-2xl">
                    <img
                      src="/ghazi-wazir-photo.jpg"
                      alt="Ghazi Wazir, CEO of Bab Al-Khaleej and Back for Brand LLC"
                      className="w-full h-auto aspect-[4/5] object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="p-4 bg-gradient-to-t from-[#0a0a0f] via-[#101018] to-transparent">
                      <div className="font-heading font-bold text-xl text-[#f5f1e8]">Ghazi Wazir</div>
                      <div className="text-xs text-[#e8c872] font-semibold mt-0.5">
                        Chief Executive Officer
                      </div>
                      <p className="text-xs text-[#a8a7b3] mt-2 leading-relaxed">
                        &ldquo;We don't offer generic templates or bureaucratic promises. We deliver structured execution for entrepreneurs setting up in Bahrain and scaling worldwide.&rdquo;
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

        {/* Executive Semantic Linking Directory & Internal Architecture Mesh (Fixes Entry Page & Low Internal Link ratio) */}
        <section className="py-16 bg-[#090d16] border-t border-[#1e2d4d]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#131d33] border border-[#38bdf8]/40 text-[#38bdf8] text-xs font-bold uppercase tracking-wider">
                <Layers className="w-3.5 h-3.5" />
                <span>Executive Semantic Index &amp; Architecture</span>
              </div>
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#f8fafc]">
                Complete Advisory Services &amp; Funnel Network
              </h2>
              <p className="text-xs sm:text-sm text-[#94a3b8]">
                Direct semantic navigation to all corporate formation pathways, AI marketing services, and verified statutory frameworks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 rounded-2xl bg-[#0c1322] border border-[#1e2d4d]">
              {/* Column 1: Bab Al-Khaleej (Bahrain) */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-[#38bdf8] pb-2 border-b border-[#1e2d4d]">
                  <Building2 className="w-4 h-4 text-[#38bdf8]" />
                  <span>Bab Al-Khaleej (Bahrain CR &amp; Visas)</span>
                </div>
                <ul className="space-y-2.5 text-xs text-[#94a3b8]">
                  <li>
                    <Link to="/services/business-registration" className="hover:text-[#38bdf8] transition-colors flex items-center justify-between">
                      <span>Commercial Registration (CR) Formation</span>
                      <ChevronRight className="w-3 h-3 text-[#38bdf8]" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/investor-visa" className="hover:text-[#38bdf8] transition-colors flex items-center justify-between">
                      <span>Investor &amp; Partner Self-Sponsored Visas</span>
                      <ChevronRight className="w-3 h-3 text-[#38bdf8]" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/worker-visa" className="hover:text-[#38bdf8] transition-colors flex items-center justify-between">
                      <span>Worker Permits &amp; LMRA Workforce Quota</span>
                      <ChevronRight className="w-3 h-3 text-[#38bdf8]" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/document-clearance" className="hover:text-[#38bdf8] transition-colors flex items-center justify-between">
                      <span>Document Clearance &amp; Notary Notarization</span>
                      <ChevronRight className="w-3 h-3 text-[#38bdf8]" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/application-tracking" className="hover:text-[#38bdf8] transition-colors flex items-center justify-between">
                      <span>Sijilat Status &amp; Real-Time Tracking</span>
                      <ChevronRight className="w-3 h-3 text-[#38bdf8]" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/ongoing-support" className="hover:text-[#38bdf8] transition-colors flex items-center justify-between">
                      <span>Annual Corporate &amp; Municipal Compliance</span>
                      <ChevronRight className="w-3 h-3 text-[#38bdf8]" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/formation/blueprint" className="hover:text-[#38bdf8] transition-colors flex items-center justify-between font-semibold text-[#f8fafc]">
                      <span>7-Step Bahrain Formation Blueprint</span>
                      <ChevronRight className="w-3 h-3 text-[#38bdf8]" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/formation/offer" className="hover:text-[#38bdf8] transition-colors flex items-center justify-between font-semibold text-[#f8fafc]">
                      <span>Done-With-You Corporate Execution Package</span>
                      <ChevronRight className="w-3 h-3 text-[#38bdf8]" />
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 2: Back for Brand LLC (USA & Worldwide Tech) */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-[#38bdf8] pb-2 border-b border-[#1e2d4d]">
                  <Globe className="w-4 h-4 text-[#38bdf8]" />
                  <span>Back for Brand LLC (GEO, AEO &amp; AI)</span>
                </div>
                <ul className="space-y-2.5 text-xs text-[#94a3b8]">
                  <li>
                    <Link to="/services/geo" className="hover:text-[#38bdf8] transition-colors flex items-center justify-between">
                      <span>Generative Engine Optimization (GEO)</span>
                      <ChevronRight className="w-3 h-3 text-[#38bdf8]" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/aeo" className="hover:text-[#38bdf8] transition-colors flex items-center justify-between">
                      <span>Answer Engine Optimization (AEO Citations)</span>
                      <ChevronRight className="w-3 h-3 text-[#38bdf8]" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/seo" className="hover:text-[#38bdf8] transition-colors flex items-center justify-between">
                      <span>Programmatic &amp; Technical Organic SEO</span>
                      <ChevronRight className="w-3 h-3 text-[#38bdf8]" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/ai-agents" className="hover:text-[#38bdf8] transition-colors flex items-center justify-between">
                      <span>24/7 Autonomous AI Sales &amp; Voice Agents</span>
                      <ChevronRight className="w-3 h-3 text-[#38bdf8]" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/automation" className="hover:text-[#38bdf8] transition-colors flex items-center justify-between">
                      <span>CRM &amp; Workflow Business Automation</span>
                      <ChevronRight className="w-3 h-3 text-[#38bdf8]" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/funnels" className="hover:text-[#38bdf8] transition-colors flex items-center justify-between">
                      <span>High-Converting VSL Web Applications</span>
                      <ChevronRight className="w-3 h-3 text-[#38bdf8]" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/funnels" className="hover:text-[#38bdf8] transition-colors flex items-center justify-between font-semibold text-[#f8fafc]">
                      <span>12 Direct-Response VSL Funnels Hub</span>
                      <ChevronRight className="w-3 h-3 text-[#38bdf8]" />
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 3: Corporate Portals, Guides & AI Crawler Corpus */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-[#38bdf8] pb-2 border-b border-[#1e2d4d]">
                  <ShieldCheck className="w-4 h-4 text-[#38bdf8]" />
                  <span>Authority Portals &amp; Discovery</span>
                </div>
                <ul className="space-y-2.5 text-xs text-[#94a3b8]">
                  <li>
                    <Link to="/companies" className="hover:text-[#38bdf8] transition-colors flex items-center justify-between">
                      <span>Two Companies. One Standard Portfolio</span>
                      <ChevronRight className="w-3 h-3 text-[#38bdf8]" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" className="hover:text-[#38bdf8] transition-colors flex items-center justify-between">
                      <span>Ghazi Wazir Executive Biography &amp; Track Record</span>
                      <ChevronRight className="w-3 h-3 text-[#38bdf8]" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/packages" className="hover:text-[#38bdf8] transition-colors flex items-center justify-between">
                      <span>Complete Advisory &amp; Tech Packages</span>
                      <ChevronRight className="w-3 h-3 text-[#38bdf8]" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/book" className="hover:text-[#38bdf8] transition-colors flex items-center justify-between font-semibold text-[#38bdf8]">
                      <span>Calendar Consultation Reservation</span>
                      <ChevronRight className="w-3 h-3 text-[#38bdf8]" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="hover:text-[#38bdf8] transition-colors flex items-center justify-between">
                      <span>Direct Executive Contact Channels</span>
                      <ChevronRight className="w-3 h-3 text-[#38bdf8]" />
                    </Link>
                  </li>
                  <li>
                    <a href="/llms.txt" target="_blank" rel="noreferrer" className="hover:text-[#38bdf8] transition-colors flex items-center justify-between">
                      <span>llms.txt (AI Discovery Standard)</span>
                      <ChevronRight className="w-3 h-3 text-[#38bdf8]" />
                    </a>
                  </li>
                  <li>
                    <a href="/llms-full.txt" target="_blank" rel="noreferrer" className="hover:text-[#38bdf8] transition-colors flex items-center justify-between">
                      <span>llms-full.txt (Knowledge Corpus)</span>
                      <ChevronRight className="w-3 h-3 text-[#38bdf8]" />
                    </a>
                  </li>
                  <li>
                    <a href="/sitemap.xml" target="_blank" rel="noreferrer" className="hover:text-[#38bdf8] transition-colors flex items-center justify-between">
                      <span>XML Sitemap Index</span>
                      <ChevronRight className="w-3 h-3 text-[#38bdf8]" />
                    </a>
                  </li>
                </ul>
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
