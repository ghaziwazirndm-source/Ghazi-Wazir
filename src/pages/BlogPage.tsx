import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { BookOpen, ArrowRight, Clock, Building2, Globe, ShieldCheck } from 'lucide-react';

export const GUIDES = [
  {
    slug: 'register-company-bahrain',
    title: 'How to Register a Company in Bahrain: The Complete Founder Guide',
    desc: 'Step-by-step walkthrough of establishing a 100% foreign-owned Commercial Registration (CR) through Sijilat, legal forms, commercial leases, and bank accounts.',
    category: 'Bahrain Corporate Setup',
    readTime: '8 min read',
    icon: Building2,
  },
  {
    slug: 'investor-vs-worker-visa',
    title: 'Investor Visa vs Worker Visa in Bahrain: Rights, Rules, and Clearances',
    desc: 'Understand the legal distinctions between partner/investor residency and LMRA-sponsored employee work permits in the Kingdom of Bahrain.',
    category: 'Residency & Visas',
    readTime: '7 min read',
    icon: ShieldCheck,
  },
  {
    slug: 'business-setup-checklist',
    title: 'Bahrain Business Setup Documents Checklist: Everything You Need to Prepare',
    desc: 'A comprehensive checklist of attested shareholder passports, commercial resolutions, proof of address, and bank references needed for Sijilat approval.',
    category: 'Documentation & Compliance',
    readTime: '6 min read',
    icon: BookOpen,
  },
  {
    slug: 'what-is-geo-and-aeo',
    title: 'What is GEO & AEO? The Evolution from Google Ranking to AI Answers',
    desc: 'Why traditional SEO is no longer enough. Learn how Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO) secure citations inside LLMs.',
    category: 'Generative AI Technology',
    readTime: '9 min read',
    icon: Globe,
  },
  {
    slug: 'seo-vs-geo-vs-aeo',
    title: 'SEO vs GEO vs AEO: Strategic Comparison for Modern Enterprise Growth',
    desc: 'A tactical side-by-side analysis of search algorithm crawlers versus generative reasoning engines, and how to structure your brand for both.',
    category: 'Search Strategy',
    readTime: '8 min read',
    icon: Globe,
  },
  {
    slug: 'ai-agents-for-small-business',
    title: 'Autonomous AI Agents for Small Business: Architecture, ROI, and Guardrails',
    desc: 'How small and medium businesses can deploy 24/7 AI sales reps that answer from approved knowledge bases without hallucinating or risking security breaches.',
    category: 'AI & Automation',
    readTime: '7 min read',
    icon: Globe,
  },
];

export function BlogPage() {
  return (
    <>
      <SEOHead
        title="Strategic Guides & Business Intelligence — Ghazi Wazir"
        description="Comprehensive founder guides on Bahrain business registration, investor visas, document attestation, GEO, AEO, and autonomous AI agents."
        canonical="https://ghaziwazir.com/blog"
      />

      <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="tag inline-block">Executive Knowledge Base</div>
          <h1 className="font-heading font-black text-4xl sm:text-5xl text-[#f5f1e8]">
            Strategic Guides & <span className="text-gold-gradient">Analysis</span>
          </h1>
          <p className="text-base text-[#a8a7b3] leading-relaxed">
            In-depth operational blueprints written from real experience navigating Bahraini commercial registries and cutting-edge generative AI architectures.
          </p>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {GUIDES.map(guide => {
            const Icon = guide.icon;
            return (
              <Link
                key={guide.slug}
                to={`/blog/${guide.slug}`}
                className="card-luxury p-8 flex flex-col justify-between group hover:border-[#e8c872] transition-all"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-[11px] text-[#a8a7b3]">
                    <span className="font-bold text-[#e8c872] uppercase tracking-wider">
                      {guide.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{guide.readTime}</span>
                    </span>
                  </div>

                  <h2 className="font-heading font-bold text-xl text-[#f5f1e8] group-hover:text-[#e8c872] transition-colors leading-snug">
                    {guide.title}
                  </h2>

                  <p className="text-xs text-[#a8a7b3] leading-relaxed">
                    {guide.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#2a2a38] flex items-center justify-between text-xs font-semibold text-[#e8c872]">
                  <span>Read Complete Guide</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
