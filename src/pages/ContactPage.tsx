import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { api } from '../services/api';
import { useToast } from '../context/ToastContext';
import { useABTheme } from '../context/ABThemeContext';
import { Phone, Mail, MapPin, Send, CheckCircle2, AlertCircle, Calendar } from 'lucide-react';

export function ContactPage() {
  const { variantId, recordConversion } = useABTheme();
  const { success, error } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('General Corporate Inquiry');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [consent, setConsent] = useState(false);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setErrorMsg('Please confirm your consent to be contacted.');
      error('Consent Required', 'Please confirm your consent to be contacted.', 'crimson');
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
        abVariant: variantId
      });
      recordConversion('lead');
      setSubmitted(true);
      success(
        'Inquiry Dispatched to Ghazi Wazir',
        'Your commercial inquiry has been logged in the CEO Unified Inbox and emailed to advisory leadership.',
        variantId === 'variant_b_emerald' ? 'emerald' : 'gold'
      );
    } catch (err: any) {
      setErrorMsg(err.message || 'Submission failed. Please try again.');
      error('Submission Error', err.message || 'Submission failed. Please try again.', 'crimson');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Contact Ghazi Wazir — WhatsApp, Email & Executive Inquiry | Bab Al-Khaleej & Back for Brand"
        description="Direct corporate contacts for Ghazi Wazir. WhatsApp: +973 3562 8353, Email: ghaziwazirndm@gmail.com. Offices in Bahrain and USA."
        canonical="https://ghaziwazir.com/contact"
      />

      <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="tag inline-block">Direct Executive Communication</div>
          <h1 className="font-heading font-black text-4xl sm:text-5xl text-[#f5f1e8]">
            Get in Touch with <span className="text-gold-gradient">Ghazi Wazir</span>
          </h1>
          <p className="text-base text-[#a8a7b3] leading-relaxed">
            Reach out via verified WhatsApp, send an email, or submit a detailed corporate inquiry. All correspondence is handled confidentially by Ghazi Wazir and the executive team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Cards */}
            <div className="card-luxury p-6 space-y-4">
              <h3 className="font-heading font-bold text-lg text-[#f5f1e8]">
                Direct Contacts
              </h3>

              <div className="space-y-4 text-xs">
                <a
                  href="https://wa.me/97335628353"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-3 p-3.5 rounded-xl border border-[#2a2a38] bg-[#101018] hover:border-[#4ade80] transition-colors"
                >
                  <Phone className="w-5 h-5 text-[#4ade80] flex-none mt-0.5" />
                  <div>
                    <span className="font-bold text-[#f5f1e8] text-sm block">WhatsApp VIP</span>
                    <span className="text-[#a8a7b3]">+973 3562 8353 (Immediate messaging)</span>
                  </div>
                </a>

                <a
                  href="mailto:ghaziwazirndm@gmail.com"
                  className="flex items-start gap-3 p-3.5 rounded-xl border border-[#2a2a38] bg-[#101018] hover:border-[#e8c872] transition-colors"
                >
                  <Mail className="w-5 h-5 text-[#e8c872] flex-none mt-0.5" />
                  <div>
                    <span className="font-bold text-[#f5f1e8] text-sm block">Executive Email</span>
                    <span className="text-[#a8a7b3]">ghaziwazirndm@gmail.com</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Entity Locations */}
            <div className="card-luxury p-6 space-y-4 text-xs text-[#a8a7b3]">
              <h3 className="font-heading font-bold text-lg text-[#f5f1e8]">
                Corporate Locations
              </h3>

              <div className="space-y-3">
                <div className="p-3 bg-[#101018] rounded-xl border border-[#2a2a38]">
                  <strong className="text-[#f5f1e8] block mb-1">Bab Al-Khaleej (Bahrain)</strong>
                  <p>Manama, Kingdom of Bahrain</p>
                  <p className="text-[11px] text-[#ffa24d] mt-1">*Physical address details: CONFIGURATION REQUIRED</p>
                </div>

                <div className="p-3 bg-[#101018] rounded-xl border border-[#2a2a38]">
                  <strong className="text-[#f5f1e8] block mb-1">Back for Brand LLC (USA)</strong>
                  <p>State of Florida, United States of America</p>
                  <p className="text-[11px] text-[#ffa24d] mt-1">*Registration number: CONFIGURATION REQUIRED</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-[#14141d] rounded-2xl border border-[#2a2a38] text-center space-y-3">
              <span className="text-xs text-[#a8a7b3]">Prefer to schedule a direct 1-on-1 video call?</span>
              <div>
                <Link to="/book" className="btn-gold inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#16120a]">
                  <Calendar className="w-4 h-4" />
                  <span>Open Calendar</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="card-luxury p-8 sm:p-10 border-gold-glow">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#1c2e20] border border-[#4ade80] flex items-center justify-center mx-auto mb-2">
                    <CheckCircle2 className="w-8 h-8 text-[#4ade80]" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-[#f5f1e8]">
                    Inquiry Received
                  </h3>
                  <p className="text-sm text-[#a8a7b3] max-w-md mx-auto">
                    Your inquiry has been stored directly in the CEO Command Center. Ghazi Wazir or an authorized senior associate will respond to you promptly.
                  </p>
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 rounded-full border border-[#2a2a38] text-xs font-semibold text-[#f5f1e8] hover:border-[#e8c872]"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="font-heading font-bold text-xl text-[#f5f1e8]">
                    Send a Message to the CEO
                  </h3>
                  <p className="text-xs text-[#a8a7b3]">
                    Fill in your project requirements below. All submissions are processed through our secure server pipeline with honeypot spam protection.
                  </p>

                  {/* Honeypot trap */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="hp_contact">Do not fill</label>
                    <input
                      id="hp_contact"
                      type="text"
                      value={honeypot}
                      onChange={e => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#a8a7b3] uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full px-4 py-3 rounded-xl border border-[#2a2a38] bg-[#101018] text-sm text-[#f5f1e8] focus:outline-none focus:border-[#e8c872]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#a8a7b3] uppercase tracking-wider mb-1">
                        Corporate Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="corporate@domain.com"
                        className="w-full px-4 py-3 rounded-xl border border-[#2a2a38] bg-[#101018] text-sm text-[#f5f1e8] focus:outline-none focus:border-[#e8c872]"
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
                        className="w-full px-4 py-3 rounded-xl border border-[#2a2a38] bg-[#101018] text-sm text-[#f5f1e8] focus:outline-none focus:border-[#e8c872]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#a8a7b3] uppercase tracking-wider mb-1">
                      Service Category
                    </label>
                    <select
                      value={service}
                      onChange={e => setService(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#2a2a38] bg-[#101018] text-sm text-[#f5f1e8] focus:outline-none focus:border-[#e8c872]"
                    >
                      <option value="business-registration">Bahrain Business Registration (CR)</option>
                      <option value="investor-visa">Investor & Partner Residency</option>
                      <option value="worker-visa">Worker Visas & LMRA Quota</option>
                      <option value="document-consultancy">Document Clearance & Attestation</option>
                      <option value="geo-aeo">GEO / AEO Engine Optimization</option>
                      <option value="ai-agents">Autonomous AI Sales Agents</option>
                      <option value="websites-funnels">Websites & High-Converting Funnels</option>
                      <option value="General Corporate Inquiry">General Corporate Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#a8a7b3] uppercase tracking-wider mb-1">
                      Project Details / Brief *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="Share your company background, target timeline, or specific questions..."
                      className="w-full px-4 py-3 rounded-xl border border-[#2a2a38] bg-[#101018] text-xs text-[#f5f1e8] focus:outline-none focus:border-[#e8c872]"
                    />
                  </div>

                  <div className="flex items-start gap-2 pt-1">
                    <input
                      id="contact-consent"
                      type="checkbox"
                      required
                      checked={consent}
                      onChange={e => setConsent(e.target.checked)}
                      className="mt-0.5 accent-[#e8c872] w-4 h-4 rounded cursor-pointer"
                    />
                    <label htmlFor="contact-consent" className="text-[11px] text-[#a8a7b3] cursor-pointer">
                      I agree to receive communications regarding this inquiry. I understand Bab Al-Khaleej and Back for Brand LLC are private consultancies and not government authorities.
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
                    className="btn-gold w-full py-4 rounded-full text-xs font-bold uppercase tracking-wider text-[#16120a] flex items-center justify-center gap-2 shadow-xl disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{loading ? 'Transmitting to Server...' : 'Submit Inquiry'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
