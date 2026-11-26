export type ProblemCategory =
  | 'All'
  | 'Bahrain CR Setup'
  | 'Visas & LMRA'
  | 'Tax, Banking & US LLC'
  | 'GEO, SEO & AI Growth';

export interface TopProblemItem {
  id: string;
  number: string;
  category: Exclude<ProblemCategory, 'All'>;
  question: string;
  problemSummary: string;
  solution: string;
  keywords: string[];
  internalLink: {
    label: string;
    to: string;
  };
  externalSource?: {
    label: string;
    url: string;
  };
}

export const TOP_20_PROBLEMS: TopProblemItem[] = [
  {
    id: 'p01-foreign-ownership',
    number: '01',
    category: 'Bahrain CR Setup',
    question: 'Do I need a local Bahraini 51% sponsor to open a company in Bahrain?',
    problemSummary: 'Founders mistakenly give away 51% equity to silent sponsors out of fear of Gulf ownership restrictions.',
    solution:
      'No. Under Bahrain Commercial Companies Law, foreign founders can legally hold 100% equity across the majority of commercial, consulting, trading, and technology activities via Sijilat.',
    keywords: ['100% foreign ownership Bahrain', 'local sponsor', 'Sijilat CR', 'WLL', 'SPC'],
    internalLink: {
      label: 'Explore 100% Ownership CR Registration',
      to: '/services/business-registration',
    },
    externalSource: {
      label: 'Official Sijilat Commercial Portal',
      url: 'https://www.sijilat.bh',
    },
  },
  {
    id: 'p02-sijilat-rejections',
    number: '02',
    category: 'Bahrain CR Setup',
    question: 'Why do Sijilat Commercial Registration (CR) applications get delayed or rejected?',
    problemSummary: 'Wrong ISIC activity codes, unapproved trade names, or non-compliant commercial lease addresses stall CR filings for weeks.',
    solution:
      'Bab Al-Khaleej pre-validates exact ISIC4 activity compatibility, restricted ministry endorsements, and municipality-approved addresses at Yateem Center before submission.',
    keywords: ['Sijilat rejection', 'ISIC code Bahrain', 'MOIC approval', 'trade name reservation'],
    internalLink: {
      label: 'Follow the 7-Step Formation Blueprint',
      to: '/formation/blueprint',
    },
    externalSource: {
      label: 'Bahrain Ministry of Industry & Commerce (MOIC)',
      url: 'https://www.moic.gov.bh',
    },
  },
  {
    id: 'p03-wll-vs-spc',
    number: '03',
    category: 'Bahrain CR Setup',
    question: 'Should I register a W.L.L., S.P.C., or Foreign Branch in Bahrain?',
    problemSummary: 'Choosing the wrong corporate legal structure limits future shareholder onboarding or triggers extra parent-company attestation.',
    solution:
      'Single founders benefit from streamlined Single Person Company (S.P.C.) or W.L.L. structures (unified under modern Bahrain W.L.L. rules), while established overseas firms use Foreign Branches without paid-up local capital.',
    keywords: ['WLL vs SPC Bahrain', 'Foreign Branch Bahrain', 'company structure', 'legal form'],
    internalLink: {
      label: 'Compare Formation Structures & Packages',
      to: '/packages',
    },
    externalSource: {
      label: 'Bahrain Economic Development Board (EDB)',
      url: 'https://www.bahrainedb.com',
    },
  },
  {
    id: 'p04-virtual-cr-vs-office',
    number: '04',
    category: 'Bahrain CR Setup',
    question: 'Do I need an expensive physical office lease to activate a Bahrain CR?',
    problemSummary: 'Founders sign costly multi-year commercial leases before understanding whether incubator/hub desks qualify.',
    solution:
      'Depending on your ISIC activity code, approved business centers and hubs in Manama (such as The Collective Hub, Yateem Center) provide municipality-verified commercial addresses at predictable cost.',
    keywords: ['Bahrain commercial address', 'Yateem Center Manama', 'incubator CR', 'Sijili'],
    internalLink: {
      label: 'Read Complete Bahrain Company Guide',
      to: '/blog/register-company-bahrain',
    },
    externalSource: {
      label: 'Sijilat Activity & Address Standards',
      url: 'https://www.sijilat.bh',
    },
  },
  {
    id: 'p05-application-tracking',
    number: '05',
    category: 'Bahrain CR Setup',
    question: 'How do founders avoid silent government queues after submitting CR papers?',
    problemSummary: 'Without active queue follow-up, ministry comments sit unanswered for weeks and applications auto-expire.',
    solution:
      'We assign milestone tracking across MOIC, Municipality, Civil Defense, and Notary appointments so every comment is cleared on the same business cycle.',
    keywords: ['CR status tracking', 'Bahrain document clearance', 'MOIC queue', 'notary Bahrain'],
    internalLink: {
      label: 'View Live Application Tracking Service',
      to: '/services/application-tracking',
    },
  },
  {
    id: 'p06-investor-visa-self-sponsor',
    number: '06',
    category: 'Visas & LMRA',
    question: 'Can business owners get Bahrain residency without being hired by someone else?',
    problemSummary: 'Expats assume they need an employer to reside legally in Bahrain.',
    solution:
      'Shareholders holding qualifying equity on an active Commercial Registration can apply for a self-sponsored Investor / Partner Residency Visa through NPRA.',
    keywords: ['Bahrain investor visa', 'self sponsorship Bahrain', 'NPRA residency', 'partner visa'],
    internalLink: {
      label: 'Explore Investor & Partner Visas',
      to: '/services/investor-visa',
    },
    externalSource: {
      label: 'Nationality, Passports & Residence Affairs (NPRA)',
      url: 'https://www.npra.gov.bh',
    },
  },
  {
    id: 'p07-golden-visa',
    number: '07',
    category: 'Visas & LMRA',
    question: 'Who qualifies for the 10-Year Bahrain Golden Residency Visa?',
    problemSummary: 'Conflicting online claims confuse Golden Residency criteria for property owners, executives, and retirees.',
    solution:
      'We audit your residency, property deed value, salary threshold, or executive qualification against official NPRA Golden Residency guidelines before filing.',
    keywords: ['Bahrain Golden Visa', '10 year residency Bahrain', 'NPRA Golden Visa'],
    internalLink: {
      label: 'Book Investor & Golden Visa Scoping',
      to: '/book',
    },
    externalSource: {
      label: 'NPRA Golden Residency Portal',
      url: 'https://www.npra.gov.bh',
    },
  },
  {
    id: 'p08-lmra-quota-bahrainization',
    number: '08',
    category: 'Visas & LMRA',
    question: 'Why are LMRA expatriate worker visa quotas rejected for new companies?',
    problemSummary: 'New firms request worker visas without establishing commercial premises, SIO enrollment, or activity-aligned justification.',
    solution:
      'We structure initial LMRA establishment files, workspace evidence, and compliant Bahrainization planning so staff work permits pass inspection smoothly.',
    keywords: ['LMRA quota Bahrain', 'worker visa Bahrain', 'Bahrainization rules', 'SIO'],
    internalLink: {
      label: 'See LMRA Worker Visa Advisory',
      to: '/services/worker-visa',
    },
    externalSource: {
      label: 'Labour Market Regulatory Authority (LMRA)',
      url: 'https://www.lmra.gov.bh',
    },
  },
  {
    id: 'p09-family-dependents-visa',
    number: '09',
    category: 'Visas & LMRA',
    question: 'Can investors sponsor their spouse and children immediately after getting their CR?',
    problemSummary: 'Entrepreneurs relocate with families without coordinating CPR activation and income/ownership proof sequencing.',
    solution:
      'Once your Investor Visa and CPR smart card are issued, dependent family visas for spouses and children are sequenced directly through NPRA.',
    keywords: ['family visa Bahrain', 'dependent visa investor', 'CPR card Bahrain'],
    internalLink: {
      label: 'Compare Investor vs Worker Visa Rules',
      to: '/blog/investor-vs-worker-visa',
    },
  },
  {
    id: 'p10-cpr-biometrics',
    number: '10',
    category: 'Visas & LMRA',
    question: 'How long do medical tests, biometrics, and Bahrain CPR smart card issuance take?',
    problemSummary: 'Missed medical appointments or unverified residential leases delay banking and mobile SIM onboarding.',
    solution:
      'Bab Al-Khaleej schedules medical clearance, LMRA/NPRA biometrics, and Information & eGovernment Authority CPR issuance in a synchronized arrival checklist.',
    keywords: ['Bahrain CPR smart card', 'LMRA biometrics', 'medical test Bahrain visa'],
    internalLink: {
      label: 'Explore Ongoing Corporate Support',
      to: '/services/ongoing-support',
    },
    externalSource: {
      label: 'Bahrain National eGovernment Portal',
      url: 'https://www.bahrain.bh',
    },
  },
  {
    id: 'p11-corporate-tax-bahrain',
    number: '11',
    category: 'Tax, Banking & US LLC',
    question: 'Do Bahrain companies pay 0% corporate and personal income tax?',
    problemSummary: 'Founders overlook VAT thresholds or bilateral compliance rules when assuming zero filing obligations.',
    solution:
      'Bahrain levies 0% personal income tax and 0% corporate income tax on standard non-oil commercial activities (with 10% VAT applicable once revenue passes statutory thresholds).',
    keywords: ['0% tax Bahrain', 'Bahrain corporate tax', 'Bahrain VAT NBR', 'tax free GCC'],
    internalLink: {
      label: 'Request Company Structuring Call',
      to: '/contact',
    },
    externalSource: {
      label: 'National Bureau for Revenue (NBR Bahrain)',
      url: 'https://www.nbr.gov.bh',
    },
  },
  {
    id: 'p12-corporate-banking',
    number: '12',
    category: 'Tax, Banking & US LLC',
    question: 'Why do foreign founders struggle to open a corporate bank account in Bahrain?',
    problemSummary: 'Banks reject KYC files lacking clear UBO documentation, business plans, or verifiable office presence.',
    solution:
      'We prepare KYC compliance packs, certified MOA resolutions, and verifiable Yateem Center office records to streamline corporate bank introductions.',
    keywords: ['Bahrain corporate bank account', 'KYC Bahrain', 'UBO declaration', 'business banking'],
    internalLink: {
      label: 'View Done-With-You Setup Offer',
      to: '/formation/offer',
    },
  },
  {
    id: 'p13-document-attestation',
    number: '13',
    category: 'Tax, Banking & US LLC',
    question: 'How do I legalize foreign parent company or degree documents for Bahrain?',
    problemSummary: 'Missing Hague Apostille stamps or MOFA legalizations force documents to be couriered back abroad.',
    solution:
      'Our Document Consultancy team verifies Apostille, embassy attestation, certified Arabic legal translation, and Bahrain MOFA stamping up front.',
    keywords: ['MOFA attestation Bahrain', 'Hague Apostille Bahrain', 'document clearance Manama'],
    internalLink: {
      label: 'Explore Document Clearance Service',
      to: '/services/document-consultancy',
    },
  },
  {
    id: 'p14-usa-llc-stripe',
    number: '14',
    category: 'Tax, Banking & US LLC',
    question: 'How do Gulf founders accept global USD Stripe and enterprise payments legally?',
    problemSummary: 'Regional payment gateways restrict international SaaS subscriptions and USD settlements.',
    solution:
      'Through Back for Brand LLC (Florida, USA), founders combine GCC operational hubs with US digital infrastructure, global funnels, and international checkout workflows.',
    keywords: ['Florida LLC', 'Back for Brand LLC', 'global payments GCC', 'US entity tech'],
    internalLink: {
      label: 'Explore Bab Al-Khaleej & Back for Brand',
      to: '/companies',
    },
  },
  {
    id: 'p15-ai-search-invisibility',
    number: '15',
    category: 'GEO, SEO & AI Growth',
    question: 'Why doesn’t ChatGPT, Perplexity, or Google Gemini recommend my business?',
    problemSummary: 'Old keyword-stuffed websites lack structured entity facts, citations, and machine-readable Answer Engine blocks.',
    solution:
      'Back for Brand LLC implements Generative Engine Optimization (GEO) using Schema.org knowledge graphs, llms.txt discovery files, and factual citation corpora.',
    keywords: ['GEO Generative Engine Optimization', 'ChatGPT ranking', 'Perplexity SEO', 'Gemini citations'],
    internalLink: {
      label: 'Explore GEO & AEO Optimization',
      to: '/services/geo-aeo',
    },
  },
  {
    id: 'p16-schema-heading-seo',
    number: '16',
    category: 'GEO, SEO & AI Growth',
    question: 'How do Schema.org JSON-LD, semantic headings (H1–H4), and llms.txt boost rankings?',
    problemSummary: 'Broken heading hierarchy, missing static JSON-LD, and weak internal links prevent search engines from understanding service authority.',
    solution:
      'Enforcing one keyword-rich H1, nested H2/H3/H4 outlines, static + dynamic JSON-LD graphs (Organization, LocalBusiness, FAQPage, BreadcrumbList), and clean internal meshes maximizes crawl visibility.',
    keywords: ['Schema.org JSON-LD', 'H1 H2 H3 H4 SEO', 'llms.txt', 'internal linking SEO'],
    internalLink: {
      label: 'Read What is GEO & AEO Guide',
      to: '/blog/what-is-geo-and-aeo',
    },
    externalSource: {
      label: 'Schema.org Official Standard',
      url: 'https://schema.org',
    },
  },
  {
    id: 'p17-core-web-vitals-speed',
    number: '17',
    category: 'GEO, SEO & AI Growth',
    question: 'How do slow mobile speeds and render-blocking resources hurt Google visibility?',
    problemSummary: 'Unbundled JS, blocking CSS stylesheets, and eager third-party pixels push Time to Interactive past 8 seconds and spike bounce rates.',
    solution:
      'Inlining critical production CSS, code-splitting heavy admin/auth SDKs off the landing route, and deferring ad pixels to idle callbacks dramatically improves FCP, LCP, and TTI.',
    keywords: ['Core Web Vitals SEO', 'render blocking CSS', 'Time to Interactive', 'mobile speed'],
    internalLink: {
      label: 'Explore Technical Organic SEO',
      to: '/services/seo',
    },
    externalSource: {
      label: 'Google Search Central Core Web Vitals',
      url: 'https://developers.google.com/search/docs/appearance/core-web-vitals',
    },
  },
  {
    id: 'p18-slow-lead-response',
    number: '18',
    category: 'GEO, SEO & AI Growth',
    question: 'How do businesses stop losing international leads after business hours?',
    problemSummary: 'Leads in Europe, GCC, and US timezones go cold when nobody answers WhatsApp or website inquiries within 5 minutes.',
    solution:
      'Deploy 24/7 trilingual (English, Arabic, Urdu) AI Sales Agents that qualify buyers, answer regulatory FAQs safely, and book confirmed calendar calls automatically.',
    keywords: ['AI sales agent', '24/7 lead qualification', 'trilingual AI chatbot', 'CRM automation'],
    internalLink: {
      label: 'Explore Autonomous AI Sales Agents',
      to: '/services/ai-agents',
    },
  },
  {
    id: 'p19-low-website-conversions',
    number: '19',
    category: 'GEO, SEO & AI Growth',
    question: 'Why do expensive corporate websites generate traffic but zero consultation bookings?',
    problemSummary: 'Generic brochure pages lack clear offers, Epiphany Bridge storytelling, proof, and frictionless booking widgets.',
    solution:
      'Replace static brochures with conversion-engineered VSL funnels, instant scope calculators, and direct WhatsApp + calendar booking pathways.',
    keywords: ['VSL sales funnel', 'high converting website', 'Epiphany Bridge funnel', 'lead generation'],
    internalLink: {
      label: 'Browse 12 Direct-Response VSL Funnels',
      to: '/funnels',
    },
  },
  {
    id: 'p20-dual-execution-model',
    number: '20',
    category: 'GEO, SEO & AI Growth',
    question: 'How do I both incorporate legally in Bahrain and launch AI marketing under one roof?',
    problemSummary: 'Founders waste months coordinating disconnected company-setup PROs and overseas marketing freelancers.',
    solution:
      'Ghazi Wazir directs both Bab Al-Khaleej (Yateem Center, Manama) for legal formation/visas and Back for Brand LLC (USA) for GEO, AI agents, and revenue funnels under one executive standard.',
    keywords: ['Ghazi Wazir', 'Bab Al-Khaleej', 'Back for Brand LLC', 'Bahrain setup and marketing'],
    internalLink: {
      label: 'Start Your Dual-Entity Roadmap',
      to: '/start',
    },
  },
];
