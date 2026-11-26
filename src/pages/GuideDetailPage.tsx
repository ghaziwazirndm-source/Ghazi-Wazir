import { useParams, Link, Navigate } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { BookingWidget } from '../components/BookingWidget';
import { GUIDES } from './BlogPage';
import {
  Clock,
  Calendar,
  ArrowLeft,
  ArrowRight,
  Share2,
  CheckCircle2,
  ShieldAlert,
  Sparkles,
  HelpCircle,
  Search,
  BookOpen
} from 'lucide-react';

interface GuideFAQ {
  q: string;
  a: string;
}

interface GuideContent {
  title: string;
  seoTitle: string;
  seoDescription: string;
  canonicalSlug: string;
  category: string;
  readTime: string;
  lead: string;
  aeoDirectAnswer: string;
  keyTakeaways: string[];
  sections: {
    heading: string;
    body: string[];
    checklist?: string[];
  }[];
  faqs: GuideFAQ[];
}

const GUIDE_DETAILS: Record<string, GuideContent> = {
  'register-company-bahrain': {
    title: 'How to Register a Company in Bahrain: The Complete Founder Guide',
    seoTitle: 'Register a Company in Bahrain: Guide | Ghazi Wazir',
    seoDescription: 'Step-by-step Bahrain company registration guide covering Sijilat CR, 100% foreign ownership rules, and office leases. Book a consultation.',
    canonicalSlug: 'register-company-bahrain',
    category: 'Bahrain Corporate Setup',
    readTime: '8 min read',
    lead: 'Bahrain provides foreign investors with 100% foreign ownership eligibility across many commercial and technology sectors through the MOIC Sijilat portal (VERIFY against official source: Sijilat, MOIC, NPRA, LMRA).',
    aeoDirectAnswer: 'Foreign entrepreneurs can apply for a 100% foreign-owned company in Bahrain across eligible activities via the MOIC Sijilat portal, subject to name clearance, ISIC activity rules, and a municipality-verified commercial address. VERIFY against official source (Sijilat, MOIC, NPRA, LMRA).',
    keyTakeaways: [
      '100% foreign equity ownership is legal across commercial, industrial, and technology sectors.',
      'Applications are filed online via the MOIC Sijilat system with no initial local sponsor requirement.',
      'A municipal-verified commercial address (office or approved incubator) is mandatory to activate CR licensing.',
      'No statutory minimum share capital requirement for standard commercial W.L.L. entities.'
    ],
    sections: [
      {
        heading: '1. Understanding 100% Foreign Ownership in Bahrain',
        body: [
          'Under Bahraini commercial law and the regulations established by the Ministry of Industry and Commerce (MOIC), foreign nationals can own 100% of their business entities in most commercial, industrial, and service sectors through an SPC (Single Person Company) or W.L.L. (With Limited Liability) structure.',
          'Unlike jurisdictions that mandate a local majority sponsor for all trading activities, Bahrain permits international entrepreneurs to retain total equity control and direct operational authority.',
        ],
      },
      {
        heading: '2. The Sijilat Commercial Registration Portal Process',
        body: [
          'All business registrations in the Kingdom are processed through Sijilat (the national commercial registration portal). The process begins with reserving an approved commercial trade name, followed by selecting International Standard Industrial Classification (ISIC) activity codes.',
          'Selecting the correct activity codes is paramount: certain regulated activities (such as financial advisory, healthcare, engineering, or legal consultancy) necessitate external approvals from bodies like the Central Bank of Bahrain (CBB) or the National Health Regulatory Authority (NHRA).',
        ],
        checklist: [
          'Trade name reservation adhering to MOIC naming conventions',
          'Selection of ISIC activity codes matching your verified business scope',
          'Submission of shareholder passport copies and proof of address',
          'Drafting of Memorandum of Association (MOA) and Articles of Association',
        ],
      },
      {
        heading: '3. Commercial Lease & Physical Address Requirements',
        body: [
          'Before a Commercial Registration without license (CR without license) can be converted to an active Commercial Registration with license (CR with license), the company must register a valid physical commercial address verified by the relevant municipality.',
          'Depending on your business activity, options range from incubator desk registrations and business centers to dedicated commercial offices. Bab Al-Khaleej assists founders in securing compliant, cost-effective addresses that satisfy municipality inspection standards.',
        ],
      },
      {
        heading: '4. Bank Account Opening & Capital Requirements',
        body: [
          'Once the MOA is signed and the commercial registration is active, the company proceeds to open a corporate bank account with an authorized retail bank in Bahrain. Standard W.L.L. structures generally enjoy zero statutory minimum share capital requirements for many activities, although capital appropriate to the business scope must be declared.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Is a local Bahraini partner required to incorporate a company?',
        a: 'No. The majority of commercial, consulting, and technological activities in Bahrain allow 100% foreign equity ownership with zero requirement for a local sponsor.',
      },
      {
        q: 'What is Sijilat in Bahrain?',
        a: 'Sijilat is the official digital commercial registration portal operated by the Ministry of Industry and Commerce (MOIC) for issuing, amending, and renewing business licenses in Bahrain.',
      },
      {
        q: 'How long does company registration in Bahrain take?',
        a: 'Indicative timelines vary (often around 5 to 10 working days for standard unregulated activities), depending on external ministry clearances and documentation. VERIFY against official source (Sijilat, MOIC, NPRA, LMRA).',
      },
    ],
  },
  'investor-vs-worker-visa': {
    title: 'Investor Visa vs Worker Visa in Bahrain: Rights, Rules, and Clearances',
    seoTitle: 'Bahrain Investor Visa vs Worker Visa | Ghazi Wazir',
    seoDescription: 'Compare Bahrain self-sponsored Investor Visas (NPRA) and employer-sponsored Worker Visas (LMRA). Schedule a residency consultation.',
    canonicalSlug: 'investor-vs-worker-visa',
    category: 'Residency & Visas',
    readTime: '7 min read',
    lead: 'Securing legal residency in the Kingdom of Bahrain depends on whether you enter as an equity shareholder or an employee. VERIFY against official source (Sijilat, MOIC, NPRA, LMRA).',
    aeoDirectAnswer: 'In Bahrain, an Investor Visa is a renewable self-sponsored residence permit for eligible CR equity partners (via NPRA), whereas a Worker Visa is an employment permit sponsored by an employer holding an approved LMRA quota. VERIFY against official source (Sijilat, MOIC, NPRA, LMRA).',
    keyTakeaways: [
      'Investor visas provide self-sponsorship with no employer dependencies.',
      'Worker visas require an approved employer with available LMRA labor quotas and monthly levies.',
      'Both visa classifications grant Bahrain Central Population Registry (CPR) smart cards and healthcare access.',
      'Investor visa holders possess immediate statutory rights to sponsor dependent family members.'
    ],
    sections: [
      {
        heading: '1. What is an Investor Visa (Partner Visa)?',
        body: [
          'An Investor Visa is granted to individuals who hold shares in an active Bahrain Commercial Registration (CR). Because the investor is an owner, this visa grants self-sponsorship status, allowing residency for up to 1 to 2 years (renewable).',
          'Investors are eligible for multi-entry status into Bahrain, can sponsor family dependants (spouse and children), and obtain a Bahrain Central Population Registry (CPR) smart card ID.',
        ],
      },
      {
        heading: '2. What is a Worker Visa (Employment Residence Permit)?',
        body: [
          'A Worker Visa is issued by the Labour Market Regulatory Authority (LMRA) and is tied directly to an employer who holds an approved LMRA quota. The employer acts as the statutory sponsor of the foreign worker.',
          'Worker visas require monthly LMRA levies, mandatory medical examinations, health insurance coverage, and formal employment contracts logged with the authority.',
        ],
        checklist: [
          'Employer must possess an active Commercial Registration (CR)',
          'LMRA quota allocation must be requested and approved for the job title',
          'Pre-employment medical report and biometric fingerprinting',
          'Issuance of work permit and CPR card upon entry',
        ],
      },
      {
        heading: '3. Strategic Decision Framework for Founders',
        body: [
          'If you are incorporating a company in Bahrain, you should generally secure an Investor Visa for yourself and fellow partners. For your team, you will utilize Bab Al-Khaleej to apply for an LMRA quota and issue worker visas step by step.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Can a shareholder work in another Bahrain company on an investor visa?',
        a: 'No. An investor visa is strictly tied to your own commercial registration equity and does not permit employment in an external third-party company without an LMRA work transfer.',
      },
      {
        q: 'How often must an investor visa be renewed in Bahrain?',
        a: 'Investor residency permits are renewed every 1 or 2 years, contingent upon the company maintaining an active CR and compliance standing.',
      },
    ],
  },
  'business-setup-checklist': {
    title: 'Bahrain Business Setup Documents Checklist: Everything You Need to Prepare',
    seoTitle: 'Bahrain Business Setup Checklist 2026 | Ghazi Wazir',
    seoDescription: 'Complete Bahrain company setup checklist covering passports, proof of address, MOA, and attested parent docs. Book a filing review.',
    canonicalSlug: 'business-setup-checklist',
    category: 'Documentation & Compliance',
    readTime: '6 min read',
    lead: 'Application stalls typically happen when shareholder passports, addresses, or foreign corporate attestations are incomplete. VERIFY current document standards against official source (Sijilat, MOIC, NPRA, LMRA).',
    aeoDirectAnswer: 'Individual founders generally prepare valid passport copies, recent proof of address, and specialized qualifications if required, while corporate shareholders also provide attested parent incorporation documents and powers of attorney. VERIFY against official source (Sijilat, MOIC, NPRA, LMRA).',
    keyTakeaways: [
      'Passports must have minimum 6-month validity for all shareholders and directors.',
      'Residential proof of address must be dated within the last 90 days.',
      'Foreign parent company documents require home country notarization, MOFA attestation, and Bahrain Embassy legalization.',
      'Sworn Arabic legal translation is mandatory for all foreign documentation.'
    ],
    sections: [
      {
        heading: '1. Identification & Shareholder Documents',
        body: [
          'For each individual shareholder and director, clear high-resolution color copies of valid passports (with at least 6 months remaining validity) are required, alongside verified residential proof of address (utility bill or bank statement within 90 days).',
        ],
        checklist: [
          'Clear color passport copies of all shareholders and authorized signatories',
          'Proof of residential address for each partner (utility bill / bank statement)',
          'Curriculum Vitae (CV) or professional profile for directors',
          'Power of Attorney (POA) if Bab Al-Khaleej is executing filings on your behalf',
        ],
      },
      {
        heading: '2. Corporate Shareholder Documents (If Holding Company Owns Shares)',
        body: [
          'If a foreign corporate entity will hold shares in the Bahrain company, additional legal documentation is required from the home country. These documents must be notarized and attested by the Ministry of Foreign Affairs (MOFA) and the Bahrain Embassy in the country of origin.',
        ],
        checklist: [
          'Certificate of Incorporation / Good Standing of the parent company',
          'Memorandum & Articles of Association of the parent company',
          'Board Resolution approving the establishment of the Bahrain subsidiary',
          'Power of Attorney authorizing the local representative to sign the MOA',
        ],
      },
    ],
    faqs: [
      {
        q: 'Does Bahrain accept the Hague Apostille certificate?',
        a: 'Yes. Bahrain acceded to the Hague Apostille Convention in 2013, allowing streamlined legalization of documents from participating member countries without separate consular stamping.',
      },
      {
        q: 'Do documents have to be submitted in Arabic?',
        a: 'Official legal filings submitted to Bahrain ministries require certified legal Arabic translations alongside the original language.',
      },
    ],
  },
  'what-is-geo-and-aeo': {
    title: 'What is GEO & AEO? The Evolution from Google Ranking to AI Answers',
    seoTitle: 'What Is GEO & AEO? AI Search Guide | Ghazi Wazir',
    seoDescription: 'Learn how Generative Engine Optimization (GEO) & AEO use schema graphs and clear facts for AI answers. Book an audit with Back for Brand.',
    canonicalSlug: 'what-is-geo-and-aeo',
    category: 'Generative AI Technology',
    readTime: '9 min read',
    lead: 'Search behavior now spans traditional search engines and AI synthesis interfaces like ChatGPT, Perplexity, and Google Gemini. GEO and AEO organize facts and schema cleanly for machine retrieval without guaranteeing citations.',
    aeoDirectAnswer: 'Generative Engine Optimization (GEO) improves entity clarity and corroborating authority for AI synthesis models, while Answer Engine Optimization (AEO) formats concise direct answers via Schema.org and clear HTML structure.',
    keyTakeaways: [
      'GEO focuses on Large Language Model retrieval and entity consensus across credible sources.',
      'AEO structures clear, direct, verifiable answers to buyer questions without fluff.',
      'Schema.org JSON-LD removes entity ambiguity for crawlers without guaranteeing AI citations.',
      'Combining technical SEO, AEO clarity, and off-site authority builds durable search equity.'
    ],
    sections: [
      {
        heading: '1. Defining GEO (Generative Engine Optimization)',
        body: [
          'GEO is the discipline of optimizing a brand’s digital presence, entity footprint, and authoritative documentation so that generative AI models cite, reference, and recommend the business in response to complex multi-turn user queries.',
          'Unlike traditional SEO that focuses solely on search engine crawlers and backlink volume, GEO focuses on semantic credibility, factual density, and knowledge-graph consensus.',
        ],
      },
      {
        heading: '2. Defining AEO (Answer Engine Optimization)',
        body: [
          'AEO focuses on structuring data for direct answer extraction. When a user asks "Who is the best company formation consultant in Bahrain?" answer engines look for clear entity statements, verified facts, and unambiguous authority signals.',
        ],
        checklist: [
          'Schema.org JSON-LD entity graph declarations (Person, Organization, Services)',
          'High factual density and authoritative source citations across web repositories',
          'Unambiguous brand positioning without deceptive or conflicting assertions',
          'Entity consensus across multiple independent verified public registries',
        ],
      },
    ],
    faqs: [
      {
        q: 'Can traditional SEO tactics succeed in generative AI engines?',
        a: 'No. Keyword stuffing and low-quality backlink farming are ignored or penalized by LLM consensus algorithms, which prioritize verified topical authority and entity citations.',
      },
      {
        q: 'How does Back for Brand LLC implement GEO for clients?',
        a: 'We architect semantic entity graphs, publish structured knowledge papers, optimize multi-channel citation registries, and monitor model recommendation probability continuously.',
      },
    ],
  },
  'seo-vs-geo-vs-aeo': {
    title: 'SEO vs GEO vs AEO: Strategic Comparison for Modern Enterprise Growth',
    seoTitle: 'SEO vs GEO vs AEO: Enterprise Strategy | Ghazi Wazir',
    seoDescription: 'Compare SEO, Generative Engine Optimization (GEO), and AEO to structure B2B search growth. Schedule a strategy call with Back for Brand.',
    canonicalSlug: 'seo-vs-geo-vs-aeo',
    category: 'Search Strategy',
    readTime: '8 min read',
    lead: 'A comprehensive strategic comparison of traditional Search Engine Optimization (SEO), Generative Engine Optimization (GEO), and Answer Engine Optimization (AEO).',
    aeoDirectAnswer: 'SEO targets traditional search engine crawler rankings in SERP listings; GEO targets conversational Large Language Model recommendation consensus; and AEO formats structured data for instant single-answer retrieval across AI interfaces and voice assistants.',
    keyTakeaways: [
      'SEO optimizes for clicks and rankings in Google/Bing web search lists.',
      'GEO optimizes for synthesis, citations, and recommendations inside LLMs.',
      'AEO optimizes for direct answer extraction in snippets, voice assistants, and AI overviews.',
      'Modern enterprise digital strategy must unify all three disciplines into one cohesive semantic architecture.'
    ],
    sections: [
      {
        heading: '1. Traditional SEO (Search Engine Optimization)',
        body: [
          'SEO targets Google and Bing search indexers. Success is measured by keyword positions, organic click-through rates (CTR), and website traffic volume. Tactics include keyword placement, page speed optimization, and backlink acquisition.',
        ],
      },
      {
        heading: '2. GEO (Generative Engine Optimization)',
        body: [
          'GEO targets Large Language Models (LLMs) like OpenAI GPT-4, Google Gemini, and Anthropic Claude. Success is measured by model recommendation probability, citation frequency, and sentiment accuracy.',
        ],
      },
      {
        heading: '3. AEO (Answer Engine Optimization)',
        body: [
          'AEO bridges traditional search and voice/AI interfaces (Perplexity, Google SGE, Siri). Success is measured by being selected as the singular synthesized answer to user inquiries.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Which discipline should high-growth companies prioritize first?',
        a: 'Companies need a solid technical SEO foundation first, layered immediately with AEO structured data and GEO semantic entity authority to capture both traditional and AI-driven buyer traffic.',
      },
    ],
  },
  'ai-agents-for-small-business': {
    title: 'Autonomous AI Agents for Small Business: Architecture, ROI, and Guardrails',
    seoTitle: 'AI Sales Agents for Small Business | Ghazi Wazir',
    seoDescription: 'Learn how grounded 24/7 AI sales agents qualify leads & schedule calls safely without hallucinations. Book a Back for Brand demo.',
    canonicalSlug: 'ai-agents-for-small-business',
    category: 'AI & Automation',
    readTime: '7 min read',
    lead: 'Deploying autonomous AI agents in 2026 is no longer a science experiment. For small and medium enterprises, it represents the ability to capture leads, qualify budgets, and answer customer inquiries 24 hours a day with zero staff burnout.',
    aeoDirectAnswer: 'Autonomous AI sales agents for small businesses are server-grounded software systems that qualify incoming prospect leads, answer operational inquiries using manager-approved knowledge bases, and book calendar appointments 24/7 without risking hallucinations or prompt injection.',
    keyTakeaways: [
      'Autonomous agents handle intent understanding and lead qualification 24 hours a day.',
      'Binding security guardrails prevent hallucinations, unauthorized discounts, or commitment promises.',
      'Execution on server-side architecture ensures API keys and corporate secrets are never exposed.',
      'Leads are qualified through multi-factor scoring algorithms and synced with staff CRM pipelines in real time.'
    ],
    sections: [
      {
        heading: '1. The Difference Between Chatbots and Autonomous AI Agents',
        body: [
          'Traditional chatbots rely on rigid decision trees and predefined button clicks. Autonomous AI agents, by contrast, utilize advanced LLM reasoning to comprehend customer intent, detect language shifts, and execute verified workflows.',
        ],
      },
      {
        heading: '2. The Binding Security Guardrails: Avoiding Hallucinations',
        body: [
          'At Back for Brand LLC, we enforce strict architectural boundaries: the AI agent only answers from APPROVED knowledge base items. It is strictly forbidden from moving money, approving unauthorized discounts, or guaranteeing government timelines.',
        ],
        checklist: [
          'Strict prompt injection defenses to neutralize malicious instructions',
          'Grounding on verified, manager-approved corporate knowledge only',
          'Automatic escalation triggers when human expertise or legal advice is needed',
          'Server-side execution so API keys and corporate secrets are never exposed',
        ],
      },
    ],
    faqs: [
      {
        q: 'How does an AI agent prevent prompt injection attacks?',
        a: 'Our systems pass all inputs through server-side sanitizer filters, run dual-pass intent verification, and restrict tool calls strictly to pre-authorized programmatic endpoints.',
      },
      {
        q: 'Can the AI agent book meetings directly on Google Calendar?',
        a: 'Yes. Upon qualifying lead score criteria, the agent offers real-time calendar availability and locks the slot without human intervention.',
      },
    ],
  },
};

// Aliases mapping for flexible URL resolutions
const SLUG_ALIASES: Record<string, string> = {
  'investor-visa-vs-worker-visa': 'investor-vs-worker-visa',
  'business-setup-documents-checklist': 'business-setup-checklist',
  'what-is-geo-aeo': 'what-is-geo-and-aeo',
};

export function GuideDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const resolvedSlug = slug ? (SLUG_ALIASES[slug] || slug) : null;
  const guide = resolvedSlug ? GUIDE_DETAILS[resolvedSlug] : null;

  if (!guide) {
    return <Navigate to="/blog" replace />;
  }

  // Schema.org Graph combining Article, FAQPage, BreadcrumbList, and Speakable
  const compositeSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `https://ghaziwazir.com/blog/${guide.canonicalSlug}#article`,
        headline: guide.title,
        description: guide.lead,
        author: {
          '@type': 'Person',
          name: 'Ghazi Wazir',
          jobTitle: 'CEO, Bab Al-Khaleej and Back for Brand LLC',
          url: 'https://ghaziwazir.com/',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Ghazi Wazir Executive Ecosystem',
          url: 'https://ghaziwazir.com/',
        },
        mainEntityOfPage: `https://ghaziwazir.com/blog/${guide.canonicalSlug}`,
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['#aeo-answer-box', '#guide-title']
        }
      },
      {
        '@type': 'FAQPage',
        '@id': `https://ghaziwazir.com/blog/${guide.canonicalSlug}#faq`,
        mainEntity: guide.faqs.map(faq => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a,
          },
        }))
      }
    ]
  };

  return (
    <>
      <SEOHead
        title={guide.seoTitle}
        description={guide.seoDescription}
        canonical={`https://ghaziwazir.com/blog/${guide.canonicalSlug}`}
        ogType="article"
        breadcrumbs={[
          { name: 'Home', item: '/' },
          { name: 'Strategic Guides', item: '/blog' },
          { name: guide.title, item: `/blog/${guide.canonicalSlug}` },
        ]}
        schema={compositeSchema}
      />

      <article className="py-12 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Breadcrumbs
          items={[
            { label: 'Home', to: '/' },
            { label: 'Strategic Guides', to: '/blog' },
            { label: guide.title },
          ]}
        />

        {/* Article Header */}
        <header className="space-y-4">
          <div className="flex items-center gap-3 text-xs text-[#a8a7b3]">
            <span className="tag">{guide.category}</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{guide.readTime}</span>
            </span>
          </div>

          <h1 id="guide-title" className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-[#f5f1e8] leading-tight">
            {guide.title}
          </h1>

          <p className="text-base sm:text-lg text-[#a8a7b3] leading-relaxed pt-2 border-l-2 border-[#e8c872] pl-4 italic">
            {guide.lead}
          </p>

          <div className="pt-4 flex items-center gap-4 text-xs text-[#a8a7b3]">
            <img
              src="/ghazi-wazir-photo.jpg"
              alt="Ghazi Wazir"
              className="w-10 h-10 rounded-full object-cover border border-[#e8c872]"
            />
            <div>
              <span className="font-bold text-[#f5f1e8] block">Ghazi Wazir</span>
              <span>CEO &middot; Bab Al-Khaleej (Bahrain) & Back for Brand LLC (USA)</span>
            </div>
          </div>
        </header>

        {/* AEO / GEO Direct Answer Callout Block */}
        <section
          id="aeo-answer-box"
          aria-labelledby="aeo-summary-title"
          className="card-luxury p-6 sm:p-8 bg-[#12121c] border border-[#e8c872]/40 relative overflow-hidden space-y-4"
        >
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#e8c872]">
              <Sparkles className="w-4 h-4 text-[#e8c872]" />
              <span id="aeo-summary-title">Executive Answer & AI Engine Summary (AEO / GEO)</span>
            </div>
            <span className="text-[10px] font-mono text-[#a8a7b3] bg-[#0a0a0f] px-2.5 py-1 rounded border border-[#2a2a38]">
              Schema Verified &middot; W3C Compliant
            </span>
          </div>

          <p className="text-sm sm:text-base text-[#f5f1e8] font-medium leading-relaxed bg-[#0a0a0f] p-5 rounded-xl border border-[#2a2a38]">
            {guide.aeoDirectAnswer}
          </p>

          <div className="space-y-2 pt-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#e8c872]">Key Strategic Takeaways</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#a8a7b3]">
              {guide.keyTakeaways.map((takeaway, tIdx) => (
                <li key={tIdx} className="flex items-start gap-2 bg-[#14141d] p-3 rounded-lg border border-[#2a2a38]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#e8c872] flex-none mt-0.5" />
                  <span className="text-[#f5f1e8] leading-snug">{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Article Body */}
        <div className="space-y-10 text-sm sm:text-base text-[#f5f1e8] leading-relaxed">
          {guide.sections.map((sec, idx) => (
            <section key={idx} className="space-y-4">
              <h2 className="font-heading font-bold text-2xl text-[#e8c872] pt-4">
                {sec.heading}
              </h2>
              {sec.body.map((p, pIdx) => (
                <p key={pIdx} className="text-[#a8a7b3] leading-relaxed">
                  {p}
                </p>
              ))}

              {sec.checklist && (
                <div className="p-6 bg-[#14141d] rounded-2xl border border-[#2a2a38] space-y-3 mt-4">
                  <h3 className="font-heading font-bold text-sm text-[#e8c872] uppercase tracking-wider">
                    Key Execution Checklist
                  </h3>
                  <ul className="space-y-2 text-xs text-[#f5f1e8]">
                    {sec.checklist.map((item, cIdx) => (
                      <li key={cIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#e8c872] flex-none mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* In-Guide FAQ Section (AEO Schema Backed) */}
        <section aria-labelledby="guide-faq-heading" className="card-luxury p-8 space-y-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#e8c872]" />
            <h2 id="guide-faq-heading" className="font-heading font-bold text-xl text-[#f5f1e8]">
              Frequently Asked Questions (AEO Answers)
            </h2>
          </div>
          <div className="space-y-4">
            {guide.faqs.map((faq, fIdx) => (
              <div key={fIdx} className="p-5 bg-[#101018] rounded-xl border border-[#2a2a38] space-y-2">
                <h3 className="font-heading font-bold text-sm text-[#f5f1e8]">
                  {faq.q}
                </h3>
                <p className="text-xs text-[#a8a7b3] leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Regulatory disclaimer */}
        <div className="card-luxury p-6 flex items-start gap-3 text-xs text-[#a8a7b3] bg-[#101018]">
          <ShieldAlert className="w-5 h-5 text-[#e8c872] flex-none mt-0.5" />
          <p>
            <strong>Regulatory Disclaimer &amp; Verification:</strong> This guide is prepared for informational business education only and is not legal advice. All company formation rules, government fees, visa requirements, and timelines must be confirmed independently — <strong>VERIFY against official source (Sijilat, MOIC, NPRA, LMRA)</strong>.
          </p>
        </div>

        {/* Contextual CTA Box */}
        <div className="card-luxury p-8 sm:p-10 border-gold-glow text-center space-y-4">
          <h2 className="font-heading font-bold text-2xl text-[#f5f1e8]">
            Need Direct Guidance for Your Business?
          </h2>
          <p className="text-xs text-[#a8a7b3] max-w-md mx-auto">
            Book a 1-on-1 strategy session directly with Ghazi Wazir to structure your Bahrain commercial setup or digital marketing roadmap.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link to="/book" className="btn-gold px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#16120a] transition-all">
              Book Consultation With Ghazi
            </Link>
            <Link to="/formation" className="px-6 py-3.5 rounded-full border border-[#2a2a38] text-xs font-semibold text-[#f5f1e8] hover:border-[#e8c872] transition-colors">
              Download Formation Blueprint
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
