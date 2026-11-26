import { Link } from 'react-router-dom';
import { Phone, PhoneCall, MapPin, Lock, ShieldAlert } from 'lucide-react';
import { ProtectedEmailButton } from './ProtectedEmailButton';

export function Footer() {
  return (
    <footer className="bg-[#101018] border-t border-[#2a2a38] text-[#a8a7b3] text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-28 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#14141d] border border-[#e8c872]/60 flex items-center justify-center">
                <span className="font-heading font-black text-lg text-gold-gradient">GW</span>
              </div>
              <div>
                <p className="font-heading font-bold text-lg text-[#f5f1e8]">Ghazi Wazir</p>
                <p className="text-xs text-[#b8893a] font-medium tracking-wide">CEO &middot; Founder</p>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-[#a8a7b3] max-w-md">
              Positioning your enterprise in Bahrain, powered by next-generation digital technology.
              Dual executive leadership across <strong className="text-[#f5f1e8]">Bab Al-Khaleej</strong> (Manama, Bahrain) and <strong className="text-[#f5f1e8]">Back for Brand LLC</strong> (Florida, USA).
            </p>

            <div className="pt-2 space-y-2">
              <a
                href="https://wa.me/97335628353"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-[#f5f1e8] hover:text-[#e8c872] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#4ade80]" />
                <span>+973 3562 8353 (WhatsApp VIP)</span>
              </a>
              <a
                href="tel:+97334398754"
                className="flex items-center gap-2 text-sm text-[#f5f1e8] hover:text-[#e8c872] transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-[#e8c872]" />
                <span>+973 3439 8754 (Manama Office)</span>
              </a>
              <div className="flex items-start gap-2 text-xs text-[#a8a7b3]">
                <MapPin className="w-4 h-4 text-[#e8c872] flex-none mt-0.5" />
                <span>The Collective Hub, Yateem Center, Manama, Bahrain</span>
              </div>
              <ProtectedEmailButton variant="footer" />
            </div>
          </div>

          {/* Bahrain Services */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#e8c872]">
              Bab Al-Khaleej (Bahrain)
            </h2>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/services/business-registration" className="hover:text-[#f5f1e8] transition-colors">
                  Business Registration (CR)
                </Link>
              </li>
              <li>
                <Link to="/services/investor-visa" className="hover:text-[#f5f1e8] transition-colors">
                  Investor & Partner Visa
                </Link>
              </li>
              <li>
                <Link to="/services/worker-visa" className="hover:text-[#f5f1e8] transition-colors">
                  Worker Visas & LMRA
                </Link>
              </li>
              <li>
                <Link to="/services/document-consultancy" className="hover:text-[#f5f1e8] transition-colors">
                  Document Consultancy
                </Link>
              </li>
              <li>
                <Link to="/services/application-tracking" className="hover:text-[#f5f1e8] transition-colors">
                  Application Tracking
                </Link>
              </li>
              <li>
                <Link to="/services/ongoing-support" className="hover:text-[#f5f1e8] transition-colors">
                  Ongoing Corporate Support
                </Link>
              </li>
              <li>
                <Link to="/formation" className="text-[#e8c872] font-semibold hover:underline block pt-1">
                  Bahrain Blueprint Funnel &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Technology Services */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#e8c872]">
              Back for Brand LLC (USA)
            </h2>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/services/geo-aeo" className="hover:text-[#f5f1e8] transition-colors">
                  GEO & AEO Optimization
                </Link>
              </li>
              <li>
                <Link to="/services/seo" className="hover:text-[#f5f1e8] transition-colors">
                  Search Engine Optimization
                </Link>
              </li>
              <li>
                <Link to="/services/ai-agents" className="hover:text-[#f5f1e8] transition-colors">
                  Autonomous AI Agents
                </Link>
              </li>
              <li>
                <Link to="/services/automation" className="hover:text-[#f5f1e8] transition-colors">
                  Workflow & CRM Automation
                </Link>
              </li>
              <li>
                <Link to="/services/digital-marketing" className="hover:text-[#f5f1e8] transition-colors">
                  Digital Performance Marketing
                </Link>
              </li>
              <li>
                <Link to="/services/websites-funnels" className="hover:text-[#f5f1e8] transition-colors">
                  Websites & High-Converting Funnels
                </Link>
              </li>
              <li>
                <Link to="/packages" className="text-[#e8c872] font-semibold hover:underline block pt-1">
                  View All Packages &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Knowledge, Navigation & Legal */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#e8c872]">
              Navigation &amp; Legal
            </h2>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/start" className="hover:text-[#f5f1e8] transition-colors">
                  Start Here Hub
                </Link>
              </li>
              <li>
                <Link to="/companies" className="hover:text-[#f5f1e8] transition-colors">
                  Two Companies Overview
                </Link>
              </li>
              <li>
                <Link to="/book" className="hover:text-[#f5f1e8] transition-colors text-[#e8c872] font-semibold">
                  Book Consultation
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-[#f5f1e8] transition-colors">
                  Strategic Guides &amp; Articles
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#f5f1e8] transition-colors">
                  About Ghazi Wazir
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#f5f1e8] transition-colors">
                  Contact Executive Office
                </Link>
              </li>
              <li>
                <Link to="/ar" className="hover:text-[#e8c872] transition-colors">
                  النسخة العربية (Arabic)
                </Link>
              </li>
              <li>
                <Link to="/funnels" className="hover:text-[#f5f1e8] transition-colors">
                  12 VSL Funnels Directory
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-[#f5f1e8] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="hover:text-[#f5f1e8] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="hover:text-[#f5f1e8] transition-colors">
                  Consultancy Disclaimer
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="hover:text-[#f5f1e8] transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li className="pt-2">
                {/* Team Login ONLY here as mandated by Section 9 */}
                <Link
                  to="/admin"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#2a2a38] text-[#f5f1e8] hover:border-[#b8893a] hover:text-[#e8c872] text-[11px] font-semibold transition-colors"
                >
                  <Lock className="w-3.5 h-3.5 text-[#e8c872]" />
                  <span>Team Login</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory Disclaimer & Official External Authority Portals */}
        <div className="mt-12 pt-8 border-t border-[#2a2a38]/80 text-xs text-[#a8a7b3] leading-relaxed space-y-4">
          <div className="flex items-start gap-2 max-w-4xl">
            <ShieldAlert className="w-4 h-4 text-[#e8c872] flex-none mt-0.5" />
            <p>
              <strong>Legal Notice &amp; Official Source Verification:</strong> We are a private management and technology consultancy, not a government ministry, authority, or law firm. Any summary of Bahraini commercial law, government fees, visa eligibility, or timelines must be verified against official sources (Sijilat, MOIC, NPRA, LMRA). We never guarantee approvals, official timelines, search rankings, or commercial revenues.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px]">
            <h3 className="font-bold uppercase tracking-wider text-[#e8c872]">Official Bahrain Authorities:</h3>
            <a href="https://www.sijilat.bh" target="_blank" rel="noopener noreferrer" className="hover:text-[#e8c872] underline">Sijilat Bahrain</a>
            <a href="https://www.moic.gov.bh" target="_blank" rel="noopener noreferrer" className="hover:text-[#e8c872] underline">MOIC Bahrain</a>
            <a href="https://www.lmra.gov.bh" target="_blank" rel="noopener noreferrer" className="hover:text-[#e8c872] underline">LMRA Portal</a>
            <a href="https://www.npra.gov.bh" target="_blank" rel="noopener noreferrer" className="hover:text-[#e8c872] underline">NPRA Residency</a>
            <a href="https://www.bahrainedb.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#e8c872] underline">Bahrain EDB</a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-[#1a1a24] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            &copy; {new Date().getFullYear()} Ghazi Wazir. All rights reserved. Two companies. One standard.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px]">
            <span>The Collective Hub, Yateem Center, Manama, Bahrain</span>
            <span>&bull;</span>
            <span>Florida, United States</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
