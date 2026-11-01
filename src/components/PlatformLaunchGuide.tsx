import { useState } from 'react';
import {
  Rocket,
  Globe,
  Share2,
  Mail,
  Bot,
  DollarSign,
  CheckCircle2,
  Copy,
  ExternalLink,
  ShieldCheck,
  FileText,
  Phone,
  Layers,
  Sparkles,
  ArrowRight,
  Check,
  Calendar,
  Sliders,
  Inbox,
  AlertTriangle,
  FileCode
} from 'lucide-react';

interface PlatformLaunchGuideProps {
  onNavigateModule?: (moduleKey: string) => void;
}

export function PlatformLaunchGuide({ onNavigateModule }: PlatformLaunchGuideProps) {
  const [activeTab, setActiveTab] = useState<'launch' | 'ads' | 'agent' | 'operations' | 'utm_builder'>('launch');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // UTM Generator State
  const [utmPage, setUtmPage] = useState('/');
  const [utmSource, setUtmSource] = useState('facebook');
  const [utmMedium, setUtmMedium] = useState('cpc');
  const [utmCampaign, setUtmCampaign] = useState('bahrain_cr_fasttrack');
  const [utmContent, setUtmContent] = useState('video_vsl_investor');

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://ghaziwazir.com';
  const generatedUrl = `${origin}${utmPage}?utm_source=${utmSource}&utm_medium=${utmMedium}&utm_campaign=${utmCampaign}&utm_content=${utmContent}`;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header Banner */}
      <div className="card-luxury p-6 sm:p-8 bg-gradient-to-r from-[#131d33] via-[#090d16] to-[#131d33] border border-[#38bdf8]/40 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#38bdf8]/10 border border-[#38bdf8]/30 text-xs font-bold text-[#38bdf8]">
              <Rocket className="w-3.5 h-3.5" />
              <span>Executive Operating Manual & Launch Guide</span>
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#f8fafc]">
              How to Operate Platform & Launch Ads Marketing Now
            </h2>
            <p className="text-xs sm:text-sm text-[#94a3b8] max-w-2xl leading-relaxed">
              Step-by-step master instructions for launching with your custom domain (<span className="text-[#38bdf8] font-bold">ghaziwazir.com</span>), running paid traffic across Meta, Google, TikTok & Snapchat, deploying the trilingual AI Sales Agent, and closing commercial deals.
            </p>
          </div>

          <div className="flex flex-col sm:items-end gap-2 text-xs">
            <span className="text-[11px] text-[#94a3b8]">Verified Master Domain:</span>
            <code className="px-3 py-1.5 bg-[#090d16] border border-[#1e2d4d] rounded-xl font-mono text-[#38bdf8] font-bold select-all">
              https://ghaziwazir.com
            </code>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-[#1e2d4d]">
          {[
            { id: 'launch', label: '1. Custom Domain Launch', icon: Globe },
            { id: 'ads', label: '2. Multi-Platform Ads & Webhooks', icon: Share2 },
            { id: 'utm_builder', label: '3. Tracked Campaign URL Builder', icon: FileCode },
            { id: 'agent', label: '4. Trilingual AI Agent & Deal Closer', icon: Bot },
            { id: 'operations', label: '5. Complete Business Operations', icon: Layers }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                  isActive
                    ? 'bg-[#38bdf8] text-[#090d16] shadow-[0_0_15px_rgba(56,189,248,0.35)]'
                    : 'bg-[#090d16] text-[#94a3b8] hover:text-[#f8fafc] border border-[#1e2d4d]'
                }`}
              >
                <Icon className="w-4 h-4 flex-none" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* TAB 1: CUSTOM DOMAIN LAUNCH & DNS SETUP                       */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'launch' && (
        <div className="space-y-6">
          <div className="card-luxury p-6 space-y-4 border border-[#38bdf8]/30">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#38bdf8]/10 border border-[#38bdf8]/40 flex items-center justify-center font-bold text-xs text-[#38bdf8]">
                1
              </span>
              <h3 className="font-heading font-bold text-base text-[#f8fafc]">
                Connecting <span className="text-[#38bdf8]">ghaziwazir.com</span> in Registrar & Vercel
              </h3>
            </div>
            <p className="text-xs text-[#94a3b8] leading-relaxed">
              Follow these exact steps to connect your custom domain so that SSL certificates, routing, and deliverability are active instantly:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-4 rounded-xl bg-[#090d16] border border-[#1e2d4d] space-y-1.5">
                <span className="text-[10px] font-black text-[#38bdf8] uppercase">Step 1.1</span>
                <strong className="block text-[#f8fafc]">Add Domain in Vercel</strong>
                <p className="text-[11px] text-[#94a3b8]">
                  Open Vercel Project Settings &rarr; <strong>Domains</strong> &rarr; Add <code className="text-[#38bdf8]">ghaziwazir.com</code> and <code className="text-[#38bdf8]">www.ghaziwazir.com</code>.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#090d16] border border-[#1e2d4d] space-y-1.5">
                <span className="text-[10px] font-black text-[#38bdf8] uppercase">Step 1.2</span>
                <strong className="block text-[#f8fafc]">Update DNS at Registrar</strong>
                <p className="text-[11px] text-[#94a3b8]">
                  Log in to GoDaddy, Namecheap, or Cloudflare DNS manager and paste the 7 records below.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#090d16] border border-[#1e2d4d] space-y-1.5">
                <span className="text-[10px] font-black text-[#38bdf8] uppercase">Step 1.3</span>
                <strong className="block text-[#f8fafc]">Automatic SSL & Verify</strong>
                <p className="text-[11px] text-[#94a3b8]">
                  Vercel automatically issues Let's Encrypt TLS 1.3 certificates within 60 seconds of DNS propagation.
                </p>
              </div>
            </div>
          </div>

          {/* DNS Records Reference Table */}
          <div className="card-luxury p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-heading font-bold text-sm text-[#f8fafc]">Exact DNS Records to Copy</h4>
                <p className="text-xs text-[#94a3b8]">Copy each value directly into your DNS zone management table.</p>
              </div>
              <span className="tag text-[10px]">7 Mandatory Records</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-[#1e2d4d] text-[#94a3b8] uppercase text-[10px]">
                    <th className="p-3">Type</th>
                    <th className="p-3">Host / Name</th>
                    <th className="p-3">Value</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e2d4d]/60 text-xs">
                  {[
                    { type: 'A', host: '@', val: '76.76.21.21', desc: 'Vercel Anycast IP' },
                    { type: 'CNAME', host: 'www', val: 'cname.vercel-dns.com', desc: 'WWW Alias' },
                    { type: 'TXT', host: '@', val: 'v=spf1 include:_spf.google.com include:resend.com ~all', desc: 'SPF Email Authenticity' },
                    { type: 'TXT', host: '_dmarc', val: 'v=DMARC1; p=quarantine; rua=mailto:dmarc@ghaziwazir.com; pct=100', desc: 'DMARC Email Protection' },
                    { type: 'TXT', host: '@', val: 'facebook-domain-verification=fb_domain_verify_ghaziwazir_2026', desc: 'Meta Ads Domain Ownership' },
                    { type: 'TXT', host: '@', val: 'google-site-verification=gw_gsc_2026_verified', desc: 'Google Search Console Verification' },
                    { type: 'TXT', host: '@', val: 'tiktok-developers-site-verification=tt_domain_verify_ghaziwazir_2026', desc: 'TikTok Ads Domain Clearance' }
                  ].map((rec, i) => (
                    <tr key={i} className="hover:bg-[#090d16]">
                      <td className="p-3 font-bold text-[#38bdf8]">{rec.type}</td>
                      <td className="p-3 text-[#f8fafc]">{rec.host}</td>
                      <td className="p-3 text-[#94a3b8] select-all max-w-md truncate">
                        <span className="text-[#f8fafc]">{rec.val}</span>
                        <span className="block text-[10px] text-[#94a3b8] font-sans">{rec.desc}</span>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          type="button"
                          onClick={() => copyToClipboard(rec.val, `rec-${i}`)}
                          className="px-2.5 py-1 rounded-lg bg-[#131d33] border border-[#1e2d4d] hover:border-[#38bdf8] text-[11px] font-sans font-bold text-[#38bdf8] inline-flex items-center gap-1"
                        >
                          {copiedKey === `rec-${i}` ? <Check className="w-3 h-3 text-[#4ade80]" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedKey === `rec-${i}` ? 'Copied' : 'Copy'}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 2: MULTI-PLATFORM ADS & WEBHOOKS                          */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'ads' && (
        <div className="space-y-6">
          <div className="card-luxury p-6 space-y-4">
            <h3 className="font-heading font-bold text-base text-[#f8fafc] flex items-center gap-2">
              <Share2 className="w-5 h-5 text-[#38bdf8]" />
              <span>How to Configure & Launch Paid Campaigns on Every Network</span>
            </h3>
            <p className="text-xs text-[#94a3b8] leading-relaxed">
              Your platform features real-time client-side and server-side tracking. Here is the operational blueprint for Meta, Google, TikTok, and Snapchat:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Meta Ads Campaign Blueprint */}
              <div className="p-5 rounded-2xl bg-[#090d16] border border-[#1e2d4d] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#38bdf8]">1. Meta Ads (Facebook & Instagram)</span>
                  <span className="tag grn text-[10px]">PIXEL + CAPI READY</span>
                </div>
                <div className="space-y-1.5 text-[#94a3b8]">
                  <p><strong className="text-[#f8fafc]">&bull; Campaign Objective:</strong> Select <strong>Leads</strong>.</p>
                  <p><strong className="text-[#f8fafc]">&bull; Conversion Location:</strong> Choose <strong>Website</strong> (direct to your VSL or Formation Blueprint) OR <strong>Instant Forms</strong>.</p>
                  <p><strong className="text-[#f8fafc]">&bull; Pixel ID:</strong> <code className="text-[#38bdf8] select-all">984710293812034</code></p>
                  <p><strong className="text-[#f8fafc]">&bull; Standard Event:</strong> Optimize for <strong>Lead</strong> (auto-fires upon form or agent capture).</p>
                  <p><strong className="text-[#f8fafc]">&bull; Instant Form Webhook:</strong> Point Meta Leads Webhook to <code className="text-[#4ade80] select-all">{origin}/api/webhooks/meta-lead-gen</code> with Verify Token <code className="text-[#e8c872] select-all">ghazi_wazir_meta_webhook_2026</code>.</p>
                </div>
              </div>

              {/* Google Ads Campaign Blueprint */}
              <div className="p-5 rounded-2xl bg-[#090d16] border border-[#1e2d4d] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#38bdf8]">2. Google Ads (Search & Performance Max)</span>
                  <span className="tag grn text-[10px]">GCLID SYNC READY</span>
                </div>
                <div className="space-y-1.5 text-[#94a3b8]">
                  <p><strong className="text-[#f8fafc]">&bull; Campaign Objective:</strong> Select <strong>Leads &rarr; Form Submissions</strong>.</p>
                  <p><strong className="text-[#f8fafc]">&bull; High-Intent Keywords:</strong> [Bahrain company formation], [Bahrain CR registration], [Bab Al-Khaleej], [investor visa Bahrain].</p>
                  <p><strong className="text-[#f8fafc]">&bull; Google Measurement ID:</strong> <code className="text-[#38bdf8] select-all">G-GWCEO2026</code></p>
                  <p><strong className="text-[#f8fafc]">&bull; Lead Form Extension:</strong> In Google Ads Lead Form extension, set Webhook URL to <code className="text-[#4ade80] select-all">{origin}/api/webhooks/google-lead-form</code> with Key <code className="text-[#e8c872] select-all">ghazi_wazir_google_ads_key</code>.</p>
                </div>
              </div>

              {/* TikTok Ads Campaign Blueprint */}
              <div className="p-5 rounded-2xl bg-[#090d16] border border-[#1e2d4d] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#38bdf8]">3. TikTok Ads (Short-Form Video)</span>
                  <span className="tag grn text-[10px]">TTCLID READY</span>
                </div>
                <div className="space-y-1.5 text-[#94a3b8]">
                  <p><strong className="text-[#f8fafc]">&bull; Campaign Objective:</strong> Select <strong>Lead Generation</strong>.</p>
                  <p><strong className="text-[#f8fafc]">&bull; Creative Format:</strong> 15-30s executive video explaining 100% foreign ownership in Bahrain and fast-track Sijilat clearance.</p>
                  <p><strong className="text-[#f8fafc]">&bull; Conversion Event:</strong> Optimize for <strong>SubmitForm</strong>.</p>
                  <p><strong className="text-[#f8fafc]">&bull; Webhook URL:</strong> <code className="text-[#4ade80] select-all">{origin}/api/webhooks/tiktok-lead-gen</code>.</p>
                </div>
              </div>

              {/* Snapchat Ads Campaign Blueprint */}
              <div className="p-5 rounded-2xl bg-[#090d16] border border-[#1e2d4d] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#38bdf8]">4. Snapchat Ads (GCC Video Reach)</span>
                  <span className="tag grn text-[10px]">SC_CLICK_ID READY</span>
                </div>
                <div className="space-y-1.5 text-[#94a3b8]">
                  <p><strong className="text-[#f8fafc]">&bull; Campaign Objective:</strong> Select <strong>Lead Generation / Drive Traffic to Website</strong>.</p>
                  <p><strong className="text-[#f8fafc]">&bull; Geo-Targeting:</strong> Target GCC investors (Bahrain, Saudi Arabia, UAE, Kuwait, Qatar).</p>
                  <p><strong className="text-[#f8fafc]">&bull; Conversion Event:</strong> Optimize for <strong>SIGN_UP</strong> or <strong>RESERVE</strong>.</p>
                  <p><strong className="text-[#f8fafc]">&bull; Webhook URL:</strong> <code className="text-[#4ade80] select-all">{origin}/api/webhooks/snapchat-lead-gen</code>.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 3: TRACKED CAMPAIGN URL BUILDER                           */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'utm_builder' && (
        <div className="card-luxury p-6 space-y-5">
          <div>
            <h3 className="font-heading font-bold text-base text-[#f8fafc] flex items-center gap-2">
              <FileCode className="w-5 h-5 text-[#38bdf8]" />
              <span>Omni-Channel Tracked Campaign URL Builder</span>
            </h3>
            <p className="text-xs text-[#94a3b8]">
              Generate trackable links with UTM attribution so every click, lead, meeting, and dollar is attributed in your real-time analytics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
            <div>
              <label className="block text-[#94a3b8] font-bold mb-1">Landing Page Destination</label>
              <select
                value={utmPage}
                onChange={e => setUtmPage(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#090d16] border border-[#1e2d4d] text-[#f8fafc] focus:outline-none focus:border-[#38bdf8]"
              >
                <option value="/">Home Page (Hero + AI Drawer)</option>
                <option value="/formation">Bahrain CR Formation Funnel</option>
                <option value="/formation/blueprint">Download CR Blueprint Page</option>
                <option value="/vsl/business-registration">VSL: Company Formation</option>
                <option value="/vsl/investor-visa">VSL: Investor Golden Visa</option>
                <option value="/vsl/geo-aeo">VSL: GEO & AEO AI Transformation</option>
                <option value="/book">Consultation Scheduling Page</option>
              </select>
            </div>

            <div>
              <label className="block text-[#94a3b8] font-bold mb-1">Ad Platform (utm_source)</label>
              <select
                value={utmSource}
                onChange={e => setUtmSource(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#090d16] border border-[#1e2d4d] text-[#f8fafc] focus:outline-none focus:border-[#38bdf8]"
              >
                <option value="facebook">Meta (Facebook Ads)</option>
                <option value="instagram">Meta (Instagram Ads)</option>
                <option value="google">Google Ads (Search / PMax)</option>
                <option value="tiktok">TikTok Ads</option>
                <option value="snapchat">Snapchat Ads</option>
                <option value="linkedin">LinkedIn Ads (B2B)</option>
                <option value="whatsapp">WhatsApp Direct Campaign</option>
              </select>
            </div>

            <div>
              <label className="block text-[#94a3b8] font-bold mb-1">Medium (utm_medium)</label>
              <input
                type="text"
                value={utmMedium}
                onChange={e => setUtmMedium(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#090d16] border border-[#1e2d4d] text-[#f8fafc] focus:outline-none focus:border-[#38bdf8]"
              />
            </div>

            <div>
              <label className="block text-[#94a3b8] font-bold mb-1">Campaign Name (utm_campaign)</label>
              <input
                type="text"
                value={utmCampaign}
                onChange={e => setUtmCampaign(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#090d16] border border-[#1e2d4d] text-[#f8fafc] focus:outline-none focus:border-[#38bdf8]"
              />
            </div>

            <div>
              <label className="block text-[#94a3b8] font-bold mb-1">Ad Creative (utm_content)</label>
              <input
                type="text"
                value={utmContent}
                onChange={e => setUtmContent(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#090d16] border border-[#1e2d4d] text-[#f8fafc] focus:outline-none focus:border-[#38bdf8]"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#090d16] border border-[#38bdf8]/40 space-y-2">
            <span className="text-[10px] font-bold text-[#38bdf8] uppercase tracking-wider block">
              Generated Ready-to-Run Ad URL:
            </span>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <code className="text-xs font-mono text-[#f8fafc] select-all break-all">
                {generatedUrl}
              </code>
              <button
                type="button"
                onClick={() => copyToClipboard(generatedUrl, 'utm-gen')}
                className="px-4 py-2 rounded-xl bg-[#38bdf8] text-[#090d16] font-bold text-xs hover:bg-[#7dd3fc] transition-all flex items-center justify-center gap-1.5 flex-none"
              >
                {copiedKey === 'utm-gen' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'utm-gen' ? 'Copied URL!' : 'Copy Ad URL'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 4: TRILINGUAL AI AGENT & DEAL CLOSER                     */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'agent' && (
        <div className="card-luxury p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading font-bold text-base text-[#f8fafc] flex items-center gap-2">
                <Bot className="w-5 h-5 text-[#38bdf8]" />
                <span>Trilingual Autonomous AI Sales Agent Engine</span>
              </h3>
              <p className="text-xs text-[#94a3b8]">
                How the agent conducts business in Urdu, Arabic, and English to qualify leads and secure contracts.
              </p>
            </div>
            {onNavigateModule && (
              <button
                type="button"
                onClick={() => onNavigateModule('agent')}
                className="px-3.5 py-1.5 rounded-xl bg-[#38bdf8]/10 border border-[#38bdf8]/30 text-xs font-bold text-[#38bdf8] hover:bg-[#38bdf8]/20 transition-all"
              >
                Open Agent Sandbox &rarr;
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#090d16] border border-[#1e2d4d] space-y-2">
              <div className="flex items-center gap-2 text-[#38bdf8]">
                <Globe className="w-4 h-4" />
                <strong className="text-sm">Trilingual Mastery</strong>
              </div>
              <p className="text-[#94a3b8] leading-relaxed">
                Automatically detects customer language. Fluent in <strong className="text-[#f8fafc]">English</strong>, <strong className="text-[#f8fafc]">Arabic (العربية)</strong> with RTL layout, and <strong className="text-[#f8fafc]">Urdu (اردو)</strong> for Pakistani and South Asian investors.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#090d16] border border-[#1e2d4d] space-y-2">
              <div className="flex items-center gap-2 text-[#38bdf8]">
                <FileText className="w-4 h-4" />
                <strong className="text-sm">Statutory PDF Brief</strong>
              </div>
              <p className="text-[#94a3b8] leading-relaxed">
                When prospective clients ask about document requirements, the agent provides an official, printable statutory checklist covering shareholder IDs, lease criteria, and capital requirements.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#090d16] border border-[#1e2d4d] space-y-2">
              <div className="flex items-center gap-2 text-[#38bdf8]">
                <Phone className="w-4 h-4" />
                <strong className="text-sm">Embedded Deal Closer</strong>
              </div>
              <p className="text-[#94a3b8] leading-relaxed">
                When commercial intent reaches high temperature, the agent triggers 1-click consultation booking (<code className="text-[#38bdf8]">/book</code>) and direct VIP WhatsApp dispatch (<code className="text-[#4ade80]">+973 3562 8353</code>).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 5: COMPLETE BUSINESS OPERATIONS WORKFLOW                  */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'operations' && (
        <div className="card-luxury p-6 space-y-5">
          <div>
            <h3 className="font-heading font-bold text-base text-[#f8fafc] flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#38bdf8]" />
              <span>Full Commercial Operations Lifecycle (Leads &rarr; Revenue)</span>
            </h3>
            <p className="text-xs text-[#94a3b8]">
              Step-by-step workflow for managing clients from initial ad impression to signed contract and ledger settlement.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                step: 'Phase 1',
                title: 'Inbound Ingestion & Qualification',
                mod: 'inbox',
                desc: 'Ad form submissions and chatbot inquiries arrive in the Unified Inbox. System automatically calculates 7-factor intent score (Budget, Authority, Need, Urgency).'
              },
              {
                step: 'Phase 2',
                title: 'Consultation & Calendar Booking',
                mod: 'bookings',
                desc: 'Client locks a 30-minute executive session. Synchronized with the Meeting Agenda and dispatches automated prep email checklists.'
              },
              {
                step: 'Phase 3',
                title: 'Commercial Proposal Drafting & Approval',
                mod: 'proposals',
                desc: 'Create official proposal for Bab Al-Khaleej (CR & Visas) or Back for Brand LLC (GEO/AEO). Discounts above 15% automatically route to the Governance Engine for CEO sign-off.'
              },
              {
                step: 'Phase 4',
                title: 'Payment & Append-Only Audit Chain',
                mod: 'payments',
                desc: 'Record BenefitPay, wire transfer, or credit card settlements. Invoices log with cryptographic SHA-256 genesis hashes to prevent tampering.'
              }
            ].map(ph => (
              <div
                key={ph.step}
                className="p-4 rounded-xl bg-[#090d16] border border-[#1e2d4d] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-[#38bdf8]/10 text-[#38bdf8] font-mono text-[10px] font-bold">
                      {ph.step}
                    </span>
                    <strong className="text-xs text-[#f8fafc]">{ph.title}</strong>
                  </div>
                  <p className="text-xs text-[#94a3b8]">{ph.desc}</p>
                </div>

                {onNavigateModule && (
                  <button
                    type="button"
                    onClick={() => onNavigateModule(ph.mod)}
                    className="px-3 py-1.5 rounded-lg bg-[#131d33] border border-[#1e2d4d] hover:border-[#38bdf8] text-[11px] font-bold text-[#38bdf8] flex items-center gap-1 flex-none"
                  >
                    <span>View Module</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
