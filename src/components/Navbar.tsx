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
          {/* Brand Monogram & Title */}
          <Link to="/" className="flex items-center gap-3.5 group text-left">
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-[#131d33] to-[#0d1424] border border-[var(--accent)]/50 flex items-center justify-center shadow-lg group-hover:border-[var(--accent)] transition-colors">
              <span className="font-heading font-black text-lg text-gold-gradient tracking-tighter">GW</span>
            </div>
            <div>
              <div className="font-heading font-bold text-lg text-[#f8fafc] tracking-wide group-hover:text-[var(--accent)] transition-colors">
                GHAZI WAZIR
              </div>
              <div className="text-[11px] text-[#94a3b8] font-medium tracking-wider uppercase flex items-center gap-1.5">
                <span>Bab Al-Khaleej</span>
                <span className="text-[var(--accent)]">&bull;</span>
                <span>Back for Brand LLC</span>
              </div>
            </div>
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
              className={`text-sm font-medium transition-colors flex items-center gap-1.5 ${
                isActive('/content-studio') ? 'text-[#38bdf8]' : 'text-[#a8a7b3] hover:text-[#f8fafc]'
              }`}
            >
              <span>Content Studio</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-[#38bdf8]/15 text-[#38bdf8] border border-[#38bdf8]/30">
                AI
              </span>
            </Link>

            <Link
              to="/blog"
              className={`text-sm font-medium transition-colors ${
                isActive('/blog') ? 'text-[#e8c872]' : 'text-[#a8a7b3] hover:text-[#f5f1e8]'
              }`}
            >
              Guides
            </Link>

            <Link
              to="/about"
              className={`text-sm font-medium transition-colors ${
                isActive('/about') ? 'text-[#e8c872]' : 'text-[#a8a7b3] hover:text-[#f5f1e8]'
              }`}
            >
              About
            </Link>

            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors ${
                isActive('/contact') ? 'text-[#e8c872]' : 'text-[#a8a7b3] hover:text-[#f5f1e8]'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Header Action CTA & Login Portal */}
          <div className="hidden sm:flex items-center gap-2.5">
            <Link
              to="/login"
              className="px-3.5 py-2 rounded-full text-xs font-semibold text-[#f8fafc] bg-[#131d33] hover:bg-[#1e2d4d] border border-[#1e2d4d] hover:border-[#38bdf8]/40 transition-colors flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span>Login</span>
            </Link>

            <Link
              to="/book"
              className="btn-gold px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg"
            >
              <Calendar className="w-3.5 h-3.5 text-[#16120a]" />
              <span>Book Consultation</span>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg text-[#a8a7b3] hover:text-[#f5f1e8] hover:bg-[#14141d] focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#101018] border-b border-[#2a2a38] px-4 pt-3 pb-6 space-y-3">
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-[#f5f1e8] hover:bg-[#14141d]"
          >
            Home
          </Link>
          <Link
            to="/companies"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-[#f5f1e8] hover:bg-[#14141d]"
          >
            Two Companies
          </Link>
          <Link
            to="/start"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-[#f5f1e8] hover:bg-[#14141d]"
          >
            Start Funnel Hub
          </Link>
          <Link
            to="/packages"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-[#f5f1e8] hover:bg-[#14141d]"
          >
            Services & Packages
          </Link>
          <Link
            to="/formation"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-[#e8c872] hover:bg-[#14141d]"
          >
            Bahrain Formation Blueprint
          </Link>
          <Link
            to="/blog"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-[#f5f1e8] hover:bg-[#14141d]"
          >
            Strategic Guides
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-[#f5f1e8] hover:bg-[#14141d]"
          >
            About Ghazi Wazir
          </Link>
          <Link
            to="/content-studio"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-[#38bdf8] hover:bg-[#14141d] flex items-center justify-between"
          >
            <span>Content Studio (AI Autopilot)</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-black uppercase bg-[#38bdf8]/15 text-[#38bdf8]">
              AI
            </span>
          </Link>
          <Link
            to="/login"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-[#f8fafc] hover:bg-[#14141d] flex items-center gap-2"
          >
            <Lock className="w-4 h-4 text-[#38bdf8]" />
            <span>Executive Login Portal</span>
          </Link>
          <div className="pt-2">
            <Link
              to="/book"
              onClick={() => setMobileOpen(false)}
              className="btn-gold block text-center py-3 rounded-full text-sm font-bold uppercase tracking-wider text-[#16120a]"
            >
              📅 Book Free Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
