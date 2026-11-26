import { useState, useEffect } from 'react';
import { Building2, ShieldCheck, Globe, Bot, Sparkles } from 'lucide-react';

interface FocusPillar {
  id: string;
  badge: string;
  icon: typeof Sparkles;
  title: string;
  description: string;
}

const FOCUS_PILLARS: FocusPillar[] = [
  {
    id: 'pillar-sijilat',
    badge: 'Bab Al-Khaleej · Manama, Bahrain',
    icon: Building2,
    title: 'Sijilat Commercial Registration & 100% Foreign Ownership Guidance',
    description:
      'From The Collective Hub at Yateem Center in Manama, we prepare MOIC activity selection, MOA drafting, and municipality address coordination. VERIFY against official source (Sijilat, MOIC, NPRA, LMRA).',
  },
  {
    id: 'pillar-visas',
    badge: 'Bahrain Residency & Mobility',
    icon: ShieldCheck,
    title: 'NPRA Investor Visas, Golden Residency Review & LMRA Quotas',
    description:
      'Structured filing support for shareholder self-sponsorship visas, dependent permits, and LMRA employee quotas. Final eligibility and timelines remain subject to official Bahraini authority review.',
  },
  {
    id: 'pillar-geo',
    badge: 'Back for Brand LLC · Florida, USA',
    icon: Globe,
    title: 'Technical SEO, Answer Engine (AEO) & Generative Search Architecture',
    description:
      'Built for businesses seeking clean Schema.org entity graphs, answer-first copy, and technical visibility across Google Search, Perplexity, ChatGPT, and Gemini.',
  },
  {
    id: 'pillar-agents',
    badge: '24/7 Revenue Systems',
    icon: Bot,
    title: 'Multilingual AI Sales Agents & Conversion Funnels',
    description:
      'Grounded conversational qualification in English, Arabic, and Urdu connected to real appointment calendars and tamper-evident CRM routing.',
  },
];

export function AnimatedHeadlines() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % FOCUS_PILLARS.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const current = FOCUS_PILLARS[currentIndex];
  const IconComponent = current.icon;

  return (
    <div className="space-y-5 flex flex-col justify-start">
      {/* Quiet Editorial Eyebrow */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-[#e8c872]/20">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#e8c872]">
          <Sparkles className="w-3.5 h-3.5 text-[#e8c872]" />
          <span>Ghazi Wazir · Manama, Bahrain &amp; Florida, USA</span>
        </div>

        <span className="text-[11px] font-medium text-[#a39f96]">
          Bab Al-Khaleej &amp; Back for Brand LLC
        </span>
      </div>

      {/* Single Stable Semantic H1 for Search & Answer Engines */}
      <div className="space-y-3.5">
        <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-[3.5rem] text-[#f7f4ec] leading-[1.08] tracking-tight">
          Bahrain Company Formation &amp; Investor Visas{' '}
          <span className="text-gold-gradient">— Powered by AI Growth Systems.</span>
        </h1>

        <p className="text-sm sm:text-base lg:text-[17px] text-[#d6d1c7] leading-relaxed max-w-2xl">
          Foreign founders launch compliantly in Manama through <strong className="text-[#f7f4ec]">Bab Al-Khaleej</strong> (Sijilat CR, NPRA residency, LMRA permits, attestation), then scale globally with <strong className="text-[#f7f4ec]">Back for Brand LLC</strong> (GEO, AEO, AI agents &amp; funnels).
        </p>
      </div>

      {/* Interactive Focus Spotlight (Sub-heading Pillar Switcher without mutating H1) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#111118] border border-[#262633] space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#e8c872]">
            <IconComponent className="w-3.5 h-3.5 text-[#e8c872]" />
            <span>{current.badge}</span>
          </div>
          <div className="flex items-center gap-1">
            {FOCUS_PILLARS.map((pillar, i) => (
              <button
                key={pillar.id}
                type="button"
                onClick={() => setCurrentIndex(i)}
                className="min-h-[28px] px-1 flex items-center justify-center rounded-full transition-all"
                aria-label={`View executive pillar ${i + 1}: ${pillar.badge}`}
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? 'w-6 bg-[#e8c872]'
                      : 'w-2 bg-[#262633] hover:bg-[#e8c872]/50'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <p className="text-sm font-semibold text-[#f7f4ec]">
          {current.title}
        </p>
        <p className="text-xs text-[#a39f96] leading-relaxed">
          {current.description}
        </p>
      </div>
    </div>
  );
}
