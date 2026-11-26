import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Calendar, ChevronDown, Building2, Globe, ShieldCheck, Lock, Share2 } from 'lucide-react';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-[var(--bg)]/95 backdrop-blur-md border-b border-[var(--border)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Monogram & Wordmark (Clean single-line Top Bar Contract) */}
          <Link to="/" className="flex items-center gap-3 group text-left shrink-0">
            <div className="relative w-10 h-10 rounded-xl bg-[#14141b] border border-[#e8c872]/50 flex items-center justify-center shadow-lg group-hover:border-[#e8c872] transition-colors">
              <span className="font-heading font-bold text-lg text-gold-gradient tracking-tight">GW</span>
            </div>
            <span className="font-heading font-bold text-lg tracking-[0.06em] text-[#f7f4ec] group-hover:text-[#e8c872] transition-colors whitespace-nowrap">
              GHAZI WAZIR
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link
              to="/companies"
              className={`text-sm font-medium transition-colors ${
                isActive('/companies') ? 'text-[#e8c872]' : 'text-[#a8a7b3] hover:text-[#f5f1e8]'
              }`}
            >
              Companies
            </Link>

            <Link
              to="/start"
              className={`text-sm font-medium transition-colors ${
                isActive('/start') ? 'text-[#e8c872]' : 'text-[#a8a7b3] hover:text-[#f5f1e8]'
              }`}
            >
              Start Here
            </Link>

            {/* Services Dropdown */}
            <div className="relative" onMouseLeave={() => setServicesOpen(false)}>
              <button
                type="button"
                onClick={() => setServicesOpen(!servicesOpen)}
                onMouseEnter={() => setServicesOpen(true)}
                className="flex items-center gap-1 text-sm font-medium text-[#a8a7b3] hover:text-[#f5f1e8] transition-colors py-2"
              >
                <span>Services</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {servicesOpen && (
                <div
                  onMouseEnter={() => setServicesOpen(true)}
                  className="absolute top-full left-0 w-80 p-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-2xl z-50 grid gap-1.5 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="px-3 py-1.5 text-[11px] font-bold text-[#b8893a] uppercase tracking-wider">
                    Bab Al-Khaleej (Bahrain)
                  </div>
                  <Link
                    to="/services/business-registration"
                    onClick={() => setServicesOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[#f5f1e8] hover:bg-[#1a1a26] hover:text-[#e8c872] transition-colors"
                  >
                    <Building2 className="w-4 h-4 text-[#e8c872]" />
                    <span>Company Registration</span>
                  </Link>
                  <Link
                    to="/services/investor-visa"
                    onClick={() => setServicesOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[#f5f1e8] hover:bg-[#1a1a26] hover:text-[#e8c872] transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#e8c872]" />
                    <span>Investor & Partner Visa</span>
                  </Link>
                  <Link
                    to="/services/worker-visa"
                    onClick={() => setServicesOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[#f5f1e8] hover:bg-[#1a1a26] hover:text-[#e8c872] transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#e8c872]" />
                    <span>Worker Visas & LMRA</span>
                  </Link>

                  <div className="mt-2 pt-2 border-t border-[#2a2a38] px-3 py-1 text-[11px] font-bold text-[#b8893a] uppercase tracking-wider">
                    Back for Brand LLC (Technology)
                  </div>
                  <Link
                    to="/services/geo-aeo"
                    onClick={() => setServicesOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[#f5f1e8] hover:bg-[#1a1a26] hover:text-[#e8c872] transition-colors"
                  >
                    <Globe className="w-4 h-4 text-[#e8c872]" />
                    <span>GEO & AEO Optimization</span>
                  </Link>
                  <Link
                    to="/services/ai-agents"
                    onClick={() => setServicesOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[#f5f1e8] hover:bg-[#1a1a26] hover:text-[#e8c872] transition-colors"
                  >
                    <Globe className="w-4 h-4 text-[#e8c872]" />
                    <span>Autonomous AI Agents</span>
                  </Link>
                  <Link
                    to="/packages"
                    onClick={() => setServicesOpen(false)}
                    className="mt-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-center text-[#e8c872] bg-[#1a1a26] hover:bg-[#232334] transition-colors"
                  >
                    View All 12 Services & Packages &rarr;
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/content-studio"
              className={`text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                isActive('/content-studio') ? 'text-[#e8c872]' : 'text-[#a39f96] hover:text-[#f7f4ec]'
              }`}
            >
              Content Studio
            </Link>

            <Link
              to="/blog"
              className={`text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                isActive('/blog') ? 'text-[#e8c872]' : 'text-[#a39f96] hover:text-[#f7f4ec]'
              }`}
            >
              Guides
            </Link>

            <Link
              to="/about"
              className={`text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                isActive('/about') ? 'text-[#e8c872]' : 'text-[#a39f96] hover:text-[#f7f4ec]'
              }`}
            >
              About
            </Link>

            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                isActive('/contact') ? 'text-[#e8c872]' : 'text-[#a39f96] hover:text-[#f7f4ec]'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Header Action CTA & Login Portal */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <Link
              to="/login"
              className="px-3.5 py-2 rounded-full text-xs font-semibold text-[#f7f4ec] bg-[#14141b] hover:bg-[#1b1b24] border border-[#262633] hover:border-[#e8c872]/50 transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              <Lock className="w-3.5 h-3.5 text-[#e8c872]" />
              <span>Login</span>
            </Link>

            <Link
              to="/book"
              className="btn-gold px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#0b0905] flex items-center gap-1.5 shadow-lg whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5 text-[#0b0905]" />
              <span>Book Consultation</span>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-[#a8a7b3] hover:text-[#f5f1e8] hover:bg-[#14141d] focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden max-h-[calc(100vh-80px)] overflow-y-auto bg-[#101018] border-b border-[#2a2a38] px-4 pt-3 pb-24 space-y-1.5">
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className="flex items-center min-h-[44px] px-3 py-2.5 rounded-lg text-base font-medium text-[#f5f1e8] hover:bg-[#14141d]"
          >
            Home
          </Link>
          <Link
            to="/companies"
            onClick={() => setMobileOpen(false)}
            className="flex items-center min-h-[44px] px-3 py-2.5 rounded-lg text-base font-medium text-[#f5f1e8] hover:bg-[#14141d]"
          >
            Two Companies
          </Link>
          <Link
            to="/start"
            onClick={() => setMobileOpen(false)}
            className="flex items-center min-h-[44px] px-3 py-2.5 rounded-lg text-base font-medium text-[#f5f1e8] hover:bg-[#14141d]"
          >
            Start Funnel Hub
          </Link>
          <Link
            to="/packages"
            onClick={() => setMobileOpen(false)}
            className="flex items-center min-h-[44px] px-3 py-2.5 rounded-lg text-base font-medium text-[#f5f1e8] hover:bg-[#14141d]"
          >
            Services & Packages
          </Link>
          <Link
            to="/formation"
            onClick={() => setMobileOpen(false)}
            className="flex items-center min-h-[44px] px-3 py-2.5 rounded-lg text-base font-medium text-[#e8c872] hover:bg-[#14141d]"
          >
            Bahrain Formation Blueprint
          </Link>
          <Link
            to="/blog"
            onClick={() => setMobileOpen(false)}
            className="flex items-center min-h-[44px] px-3 py-2.5 rounded-lg text-base font-medium text-[#f5f1e8] hover:bg-[#14141d]"
          >
            Strategic Guides
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileOpen(false)}
            className="flex items-center min-h-[44px] px-3 py-2.5 rounded-lg text-base font-medium text-[#f5f1e8] hover:bg-[#14141d]"
          >
            About Ghazi Wazir
          </Link>
          <Link
            to="/content-studio"
            onClick={() => setMobileOpen(false)}
            className="min-h-[44px] px-3 py-2.5 rounded-lg text-base font-medium text-[#e8c872] hover:bg-[#14141b] flex items-center justify-between"
          >
            <span>Content Studio</span>
          </Link>
          <Link
            to="/login"
            onClick={() => setMobileOpen(false)}
            className="min-h-[44px] px-3 py-2.5 rounded-lg text-base font-medium text-[#f7f4ec] hover:bg-[#14141b] flex items-center gap-2"
          >
            <Lock className="w-4 h-4 text-[#e8c872]" />
            <span>Executive Login Portal</span>
          </Link>
          <div className="pt-3 space-y-2">
            <Link
              to="/book"
              onClick={() => setMobileOpen(false)}
              className="btn-gold min-h-[48px] flex items-center justify-center gap-2 py-3 rounded-full text-sm font-bold uppercase tracking-wider text-[#0b0905]"
            >
              <Calendar className="w-4 h-4 text-[#0b0905]" />
              <span>Book Free Consultation</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
