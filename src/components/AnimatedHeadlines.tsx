import { useState, useEffect } from 'react';
import { Sparkles, Building2, ShieldCheck, Globe, Bot } from 'lucide-react';

interface HeadlineItem {
  id: string;
  badge: string;
  icon: typeof Sparkles;
  lead: string;
  highlight: string;
  description: string;
}

const HEADLINES: HeadlineItem[] = [
  {
    id: 'h1-bahrain-tech',
    badge: 'Dual Corporate Leadership · Manama & Florida',
    icon: Sparkles,
    lead: 'Your business in Bahrain, ',
    highlight: 'powered by technology.',
    description:
      'Two companies under one standard: corporate formation with Bab Al-Khaleej at Yateem Center in Manama, and global digital growth with Back for Brand LLC in Florida.',
  },
  {
    id: 'h2-foreign-ownership',
    badge: '100% Foreign Equity Ownership · Sijilat CR',
    icon: Building2,
    lead: 'Incorporate in Bahrain with ',
    highlight: 'full foreign ownership.',
    description:
      'Direct Sijilat Commercial Registration (CR), activity classification, and corporate banking introduction without requiring a local sponsor.',
  },
  {
    id: 'h3-investor-visas',
    badge: 'Self-Sponsored Residency & Mobility',
    icon: ShieldCheck,
    lead: 'Fast-track investor visas & ',
    highlight: 'CPR residency permits.',
    description:
      'Renewable self-sponsorship residency, family permits, and LMRA workforce quotas handled with verified document clearance.',
  },
  {
    id: 'h4-geo-aeo',
    badge: 'Generative & Answer Engine Optimization',
    icon: Globe,
    lead: 'Generative Engine Optimization that ',
    highlight: 'cites your brand in AI search.',
    description:
      'Structure entity graphs and semantic data so Perplexity, ChatGPT, and Google Gemini recommend your enterprise directly.',
  },
  {
    id: 'h5-autonomous-agents',
    badge: '24/7 Executive Revenue Automation',
    icon: Bot,
    lead: 'Autonomous AI sales agents that ',
    highlight: 'qualify leads & close deals.',
    description:
      'Trilingual voice and text agents in Urdu, Arabic & English that guide prospects, generate requirement briefs, and book discovery calls.',
  },
];

export function AnimatedHeadlines() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % HEADLINES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const current = HEADLINES[currentIndex];
  const IconComponent = current.icon;

  return (
    <div className="space-y-4 min-h-[175px] sm:min-h-[205px] flex flex-col justify-start">
      {/* Quiet Editorial Eyebrow + Indicator */}
      <div className="flex flex-wrap items-center gap-3 pb-2 border-b border-[#e8c872]/20">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#e8c872]">
          <IconComponent className="w-3.5 h-3.5 text-[#e8c872]" />
          <span>{current.badge}</span>
        </div>

        <div className="flex items-center gap-1 ml-auto">
          {HEADLINES.map((h, i) => (
            <button
              key={h.id}
              type="button"
              onClick={() => setCurrentIndex(i)}
              className="min-h-[28px] px-1 flex items-center justify-center rounded-full transition-all duration-300"
              aria-label={`Switch to headline ${i + 1}: ${h.badge}`}
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? 'w-7 bg-[#e8c872]'
                    : 'w-2 bg-[#262633] hover:bg-[#e8c872]/50'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Luxury Editorial Headline Heading */}
      <div key={current.id} className="space-y-3.5 transition-opacity duration-300">
        <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-[3.75rem] text-[#f7f4ec] leading-[1.08] tracking-tight">
          {current.lead}{' '}
          <span className="text-gold-gradient">
            {current.highlight}
          </span>
        </h1>

        <p className="text-sm sm:text-base lg:text-[17px] text-[#a39f96] leading-relaxed max-w-2xl">
          {current.description}
        </p>
      </div>
    </div>
  );
}
