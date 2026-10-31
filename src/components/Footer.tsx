import { Link } from 'react-router-dom';
import { Mail, Phone, Lock, ExternalLink, ShieldAlert } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#101018] border-t border-[#2a2a38] text-[#a8a7b3] text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#14141d] border border-[#e8c872]/60 flex items-center justify-center">
                <span className="font-heading font-black text-lg text-gold-gradient">GW</span>
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-[#f5f1e8]">Ghazi Wazir</h3>
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
                href="mailto:ghaziwazirndm@gmail.com"
                className="flex items-center gap-2 text-sm text-[#f5f1e8] hover:text-[#e8c872] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#e8c872]" />
                <span>ghaziwazirndm@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Bahrain Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#e8c872]">
              Bab Al-Khaleej (Bahrain)
            </h4>
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
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#e8c872]">
              Back for Brand LLC (USA)
            </h4>
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

          {/* Knowledge & Funnels */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#e8c872]">
              Resources & Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/blog" className="hover:text-[#f5f1e8] transition-colors">
                  Strategic Guides & Articles
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

        {/* Regulatory Disclaimer Notice */}
        <div className="mt-12 pt-8 border-t border-[#2a2a38]/80 text-xs text-[#a8a7b3] leading-relaxed">
          <div className="flex items-start gap-2 max-w-4xl">
            <ShieldAlert className="w-4 h-4 text-[#e8c872] flex-none mt-0.5" />
            <p>
              <strong>Legal Notice & Authority Disclosure:</strong> We are a private management and technology consultancy, not a government ministry, authority, or law firm. All business registrations, Commercial Registration (CR) approvals, investor visas, and worker residence permits are subject to the independent statutory determination and approval of the Ministry of Industry and Commerce (MOIC), the Labour Market Regulatory Authority (LMRA), and the Nationality, Passports and Residence Affairs (NPRA) of the Kingdom of Bahrain. We never guarantee approvals, timelines, search engine ranks, or commercial revenues.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-[#1a1a24] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            &copy; {new Date().getFullYear()} Ghazi Wazir. All rights reserved. Two companies. One standard.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Manama, Kingdom of Bahrain</span>
            <span>&bull;</span>
            <span>Florida, United States</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
