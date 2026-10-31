import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SEOHead } from '../../components/SEOHead';
import { api } from '../../services/api';
import { CheckCircle2, ArrowRight, ShieldCheck, Download, AlertCircle, Clock } from 'lucide-react';

export function FormationIndexPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleOptIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setErrorMsg('Please enter your name and corporate email address.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      await api.submitLead({
        name,
        email,
        phone: whatsapp,
        service: 'Bahrain Formation Blueprint Funnel',
        message: 'Opted in for the free 7-Step Bahrain Company Formation Blueprint',
        consent: true,
      });

      // Navigate to Epiphany Bridge video page
      navigate('/formation/bridge');
    } catch (err: any) {
      setErrorMsg(err.message || 'Opt-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Free Bahrain Company Formation Blueprint | Ghazi Wazir"
        description="Get the free 7-step Bahrain Company Formation Blueprint: the order to follow, documents to prepare, and mistakes that cause delays."
        noindex={true}
      />

      <div className="py-12 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Funnel Header */}
        <div className="text-center space-y-4">
          <div className="tag inline-block">Free Strategic Blueprint &middot; Bahrain Formation</div>
          <h1 className="font-heading font-black text-3xl sm:text-5xl text-[#f5f1e8] leading-tight">
            Open Your Bahrain Company the Right Way,{' '}
            <span className="text-gold-gradient">Without Weeks of Guesswork</span>
          </h1>
          <p className="text-sm sm:text-base text-[#a8a7b3] max-w-2xl mx-auto leading-relaxed">
            Get the free 7-step Bahrain Company Formation Blueprint: the exact sequence to follow, documents to prepare, and critical Sijilat pitfalls that stall approvals.
          </p>
        </div>

        {/* 5 Blueprint Bullets */}
        <div className="card-luxury p-8 space-y-4 max-w-2xl mx-auto border-t-2 border-t-[#e8c872]">
          <h3 className="font-heading font-bold text-lg text-[#f5f1e8]">What This Free Blueprint Reveals:</h3>
          <ul className="space-y-3 text-xs sm:text-sm text-[#f5f1e8]">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#e8c872] flex-none mt-0.5" />
              <span><strong>Step 1: Activity Classification:</strong> Why your business activity code is the single most critical decision and how it impacts capital requirements.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#e8c872] flex-none mt-0.5" />
              <span><strong>Step 2: Legal Form Selection:</strong> How to compare W.L.L. vs. branch vs. sole proprietorship before committing financial fees.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#e8c872] flex-none mt-0.5" />
              <span><strong>Step 3: Document Pre-Clearance:</strong> The exact attested shareholder documents and passport standards that pass MOIC review immediately.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#e8c872] flex-none mt-0.5" />
              <span><strong>Step 4: Visas & People:</strong> Calculating LMRA workforce quota sizing and securing Investor self-sponsorship residency.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#e8c872] flex-none mt-0.5" />
              <span><strong>Step 5: Client Acquisition:</strong> What most consultants miss: setting up GEO, AEO, and web funnels to win customers upon launch.</span>
            </li>
          </ul>
        </div>

        {/* Opt-in Form Card */}
        <div className="card-luxury p-8 sm:p-10 border-gold-glow max-w-lg mx-auto shadow-2xl">
          <form onSubmit={handleOptIn} className="space-y-4">
            <div className="text-center space-y-1 mb-2">
              <h3 className="font-heading font-bold text-xl text-[#f5f1e8]">Instant Access to the Blueprint</h3>
              <p className="text-xs text-[#a8a7b3]">Enter your details below to proceed to the briefing video and interactive checklist.</p>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#a8a7b3] uppercase tracking-wider mb-1">
                Your First Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="First name"
                className="w-full px-4 py-3 rounded-xl border border-[#2a2a38] bg-[#101018] text-sm text-[#f5f1e8] focus:outline-none focus:border-[#e8c872]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#a8a7b3] uppercase tracking-wider mb-1">
                Corporate Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full px-4 py-3 rounded-xl border border-[#2a2a38] bg-[#101018] text-sm text-[#f5f1e8] focus:outline-none focus:border-[#e8c872]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#a8a7b3] uppercase tracking-wider mb-1">
                WhatsApp Phone Number (Optional)
              </label>
              <input
                type="tel"
                value={whatsapp}
                onChange={e => setWhatsapp(e.target.value)}
                placeholder="+973 3xxx xxxx"
                className="w-full px-4 py-3 rounded-xl border border-[#2a2a38] bg-[#101018] text-sm text-[#f5f1e8] focus:outline-none focus:border-[#e8c872]"
              />
            </div>

            {errorMsg && (
              <div className="p-3 bg-[#2a1313] border border-[#ff5d5d] rounded-xl flex items-center gap-2 text-xs text-[#ffb3b3]">
                <AlertCircle className="w-4 h-4 flex-none" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full py-4 rounded-full text-xs font-bold uppercase tracking-wider text-[#16120a] flex items-center justify-center gap-2 shadow-xl"
            >
              <Download className="w-4 h-4" />
              <span>{loading ? 'Registering Access...' : 'Send Me the Free Blueprint \u2192'}</span>
            </button>

            <p className="text-[11px] text-[#a8a7b3] text-center pt-1">
              🔒 Your details are stored securely. No spam. Unsubscribe anytime.
            </p>
          </form>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 text-xs text-[#a8a7b3] text-center">
          <span className="flex items-center gap-1.5 text-[#4ade80]">
            <CheckCircle2 className="w-4 h-4" />
            <span>100% Free Blueprint</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#e8c872]" />
            <span>Instant Digital Access</span>
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#e8c872]" />
            <span>Engineered for Bahrain MOIC & Sijilat</span>
          </span>
        </div>

        {/* Host Card */}
        <div className="card-luxury p-6 max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-5">
          <img
            src="/ghazi-wazir-photo.jpg"
            alt="Ghazi Wazir"
            className="w-20 h-20 rounded-full object-cover border-2 border-[#e8c872] flex-none"
          />
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-bold text-[#e8c872] uppercase tracking-wider block">Author & Guide</span>
            <h4 className="font-heading font-bold text-base text-[#f5f1e8]">Ghazi Wazir</h4>
            <p className="text-xs text-[#a8a7b3] leading-relaxed">
              CEO of Bab Al-Khaleej in Bahrain and Back for Brand LLC in the United States. Providing foreign founders with transparent, accountable company setup.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
