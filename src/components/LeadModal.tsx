import { useState } from 'react';
import { api } from '../services/api';
import { X, Send, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export function LeadModal({ isOpen, onClose, defaultService = 'General Inquiry' }: LeadModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(defaultService);
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [consent, setConsent] = useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setErrorMsg('Please confirm your consent to be contacted.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      await api.submitLead({
        name,
        email,
        phone,
        service,
        message,
        honeypot,
        consent,
      });
      setSuccess(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="card-luxury w-full max-w-lg p-6 sm:p-8 relative shadow-2xl border-gold-glow animate-in zoom-in-95 duration-200">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#a8a7b3] hover:text-[#f5f1e8] rounded-lg hover:bg-[#1c1c28]"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-[#1c2e20] border border-[#4ade80] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-[#4ade80]" />
            </div>
            <h3 className="font-heading font-bold text-2xl text-[#f5f1e8] mb-2">
              Inquiry Dispatched
            </h3>
            <p className="text-sm text-[#a8a7b3] max-w-sm mx-auto mb-6">
              Thank you for reaching out. Ghazi Wazir and the executive team will review your inquiry and follow up promptly.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="btn-gold px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-[#16120a]"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="tag inline-block mb-2">Private Consultation</div>
              <h3 className="font-heading font-bold text-xl text-[#f5f1e8]">
                Connect with Ghazi Wazir
              </h3>
              <p className="text-xs text-[#a8a7b3] mt-1">
                Tell us about your Bahrain company or digital growth requirements.
              </p>
            </div>

            {/* Invisible Honeypot */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website_trap">Do not fill this field</label>
              <input
                id="website_trap"
                type="text"
                value={honeypot}
                onChange={e => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#a8a7b3] uppercase tracking-wider mb-1">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Full name"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#2a2a38] bg-[#101018] text-sm text-[#f5f1e8] focus:outline-none focus:border-[#e8c872]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#a8a7b3] uppercase tracking-wider mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#2a2a38] bg-[#101018] text-sm text-[#f5f1e8] focus:outline-none focus:border-[#e8c872]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#a8a7b3] uppercase tracking-wider mb-1">
                  WhatsApp (Optional)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+973 3xxx xxxx"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#2a2a38] bg-[#101018] text-sm text-[#f5f1e8] focus:outline-none focus:border-[#e8c872]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#a8a7b3] uppercase tracking-wider mb-1">
                Area of Interest
              </label>
              <select
                value={service}
                onChange={e => setService(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#2a2a38] bg-[#101018] text-sm text-[#f5f1e8] focus:outline-none focus:border-[#e8c872]"
              >
                <option value="business-registration">Bahrain Business Registration (CR)</option>
                <option value="investor-visa">Investor & Partner Visa</option>
                <option value="worker-visa">Worker Visas & LMRA Quota</option>
                <option value="document-consultancy">Document Consultancy & Attestation</option>
                <option value="application-tracking">Application Tracking & Resolution</option>
                <option value="ongoing-support">Ongoing Corporate Support</option>
                <option value="geo-aeo">GEO & AEO (Generative Engine Optimization)</option>
                <option value="seo">Search Engine Optimization (SEO)</option>
                <option value="ai-agents">Autonomous AI Sales Agents</option>
                <option value="automation">CRM & Process Automation</option>
                <option value="websites-funnels">Websites & High-Converting Funnels</option>
                <option value="General Inquiry">General Strategy Consultation</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#a8a7b3] uppercase tracking-wider mb-1">
                Project Scope / Message
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Briefly describe your objectives, questions, or timeline..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#2a2a38] bg-[#101018] text-xs text-[#f5f1e8] focus:outline-none focus:border-[#e8c872]"
              />
            </div>

            <div className="flex items-start gap-2 pt-1">
              <input
                id="modal-consent"
                type="checkbox"
                required
                checked={consent}
                onChange={e => setConsent(e.target.checked)}
                className="mt-0.5 accent-[#e8c872] w-4 h-4 rounded cursor-pointer"
              />
              <label htmlFor="modal-consent" className="text-[11px] text-[#a8a7b3] cursor-pointer">
                I agree to be contacted by Ghazi Wazir's consultancy regarding this inquiry. I understand this is private corporate guidance, not statutory government advice.
              </label>
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
              className="btn-gold w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#16120a] flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? 'Submitting...' : 'Send Inquiry to Ghazi Wazir'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
