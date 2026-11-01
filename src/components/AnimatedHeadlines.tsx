import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Building2, ShieldCheck, Globe, Bot } from 'lucide-react';

interface HeadlineItem {
  id: string;
  badge: string;
  icon: typeof Sparkles;
  lead: string;
  highlight: string;
  description: string;
  gradient: string;
}

const HEADLINES: HeadlineItem[] = [
  {
    id: 'h1-bahrain-tech',
    badge: 'Dual Corporate Leadership',
    icon: Sparkles,
    lead: 'Your business in Bahrain, ',
    highlight: 'powered by technology.',
    description: 'Two companies under one standard: corporate formation with Bab Al-Khaleej in Manama, and global digital growth with Back for Brand LLC in Florida.',
    gradient: 'from-[#38bdf8] via-[#60a5fa] to-[#818cf8]',
  },
  {
    id: 'h2-foreign-ownership',
    badge: '100% Equity Ownership',
    icon: Building2,
    lead: 'Incorporate in Bahrain with ',
    highlight: 'full foreign ownership.',
    description: 'Direct Sijilat Commercial Registration (CR), activity classification, and corporate banking introduction without requiring a local sponsor.',
    gradient: 'from-[#38bdf8] via-[#34d399] to-[#22c55e]',
  },
  {
    id: 'h3-investor-visas',
    badge: 'Residency & Mobility',
    icon: ShieldCheck,
    lead: 'Fast-track investor visas & ',
    highlight: 'CPR residency permits.',
    description: 'Renewable self-sponsorship residency, family permits, and LMRA workforce quotas handled with verified document clearance.',
    gradient: 'from-[#38bdf8] via-[#a855f7] to-[#ec4899]',
  },
  {
    id: 'h4-geo-aeo',
    badge: 'AI Visibility & Authority',
    icon: Globe,
    lead: 'Generative Engine Optimization that ',
    highlight: 'cites your brand in AI search.',
    description: 'Structure entity graphs and semantic data so Perplexity, ChatGPT, and Google Gemini recommend your enterprise directly.',
    gradient: 'from-[#38bdf8] via-[#38bdf8] to-[#0284c7]',
  },
  {
    id: 'h5-autonomous-agents',
    badge: '24/7 Revenue Automation',
    icon: Bot,
    lead: 'Autonomous AI sales agents that ',
    highlight: 'qualify leads & close deals.',
    description: 'Trilingual voice and text agents in Urdu, Arabic & English that guide prospects, generate requirement briefs, and book discovery calls.',
    gradient: 'from-[#38bdf8] via-[#f59e0b] to-[#e11d48]',
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
    <div className="space-y-5 min-h-[220px] sm:min-h-[240px] flex flex-col justify-start">
      {/* Category Tag Indicator with Cycle Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#38bdf8]/40 bg-[#131d33] text-xs font-semibold text-[#38bdf8] shadow-sm">
          <IconComponent className="w-3.5 h-3.5 text-[#38bdf8] animate-pulse" />
          <span>{current.badge}</span>
        </div>

        {/* Headline Indicators */}
        <div className="flex items-center gap-1.5 ml-auto">
          {HEADLINES.map((h, i) => (
            <button
              key={h.id}
              type="button"
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? 'w-7 bg-[#38bdf8]'
                  : 'w-2 bg-[#1e2d4d] hover:bg-[#38bdf8]/50'
              }`}
              aria-label={`Switch to headline ${i + 1}: ${h.badge}`}
            />
          ))}
        </div>
      </div>

      {/* Animated Headline Heading */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-[#f8fafc] leading-[1.12] tracking-tight">
              {current.lead}{' '}
              <span className={`bg-gradient-to-r ${current.gradient} bg-clip-text text-transparent drop-shadow-sm`}>
                {current.highlight}
              </span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-[#94a3b8] leading-relaxed max-w-2xl">
              {current.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
