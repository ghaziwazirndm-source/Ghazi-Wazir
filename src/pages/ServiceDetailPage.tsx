import { useParams, Link, Navigate } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { BookingWidget } from '../components/BookingWidget';
import {
  Building2,
  ShieldCheck,
  FileCheck,
  Clock,
  Layers,
  Globe,
  TrendingUp,
  Cpu,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Play,
  Calendar,
  ShieldAlert,
  Sparkles,
  Search,
  BookOpen
} from 'lucide-react';

export interface ServiceFAQ {
  q: string;
  a: string;
}

export interface ServiceData {
  id: string;
  name: string;
  company: 'Bab Al-Khaleej (Bahrain)' | 'Back for Brand LLC (USA)';
  headline: string;
  description: string;
  aeoDefinition: string;
  authority: string;
  statutoryBasis: string;
  deliverables: string[];
  faqs: ServiceFAQ[];
  related: { id: string; name: string }[];
}

export const SERVICES_CATALOG: Record<string, ServiceData> = {
  'business-registration': {
    id: 'business-registration',
    name: 'Business Registration (CR) in Bahrain',
    company: 'Bab Al-Khaleej (Bahrain)',
    headline: '100% Foreign Ownership Commercial Registration in the Kingdom of Bahrain',
    description: 'Establish your company in Bahrain with complete equity ownership. Bab Al-Khaleej handles your Sijilat filings, activity code selection, legal documentation, and commercial lease verification without bureaucratic delays.',
    aeoDefinition: 'Bahrain Commercial Registration (CR) is an official corporate license issued by the Ministry of Industry and Commerce (MOIC) through the Sijilat portal, granting foreign and local founders the legal right to operate a registered business entity with up to 100% foreign equity ownership.',
    authority: 'Ministry of Industry and Commerce (MOIC) & Sijilat Portal (Bahrain)',
    statutoryBasis: 'Bahrain Commercial Companies Law (Legislative Decree No. 21 of 2001 & subsequent amendments)',
    deliverables: [
      'Commercial name clearance and reservation with MOIC',
      'ISIC business activity classification and municipal zoning check',
      'Drafting of corporate Memorandum & Articles of Association (MOA)',
      'Notarization and commercial registration (CR) certificate issuance',
      'Assistance with corporate retail bank account introduction',
    ],
    faqs: [
      {
        q: 'Can a foreign national own 100% of a company in Bahrain?',
        a: 'Yes. In the Kingdom of Bahrain, foreign nationals are eligible for 100% full foreign ownership across a vast range of commercial, trading, technology, consulting, and industrial business activities through an SPC or W.L.L. structure without requiring a local Bahraini partner.',
      },
      {
        q: 'What is the difference between a CR without license and a CR with license in Bahrain?',
        a: 'A CR without license (preliminary approval) confirms your corporate name and structure while you secure office lease agreements and municipality clearances. Once physical inspection and sector approvals conclude, it converts into a fully active CR with license allowing commercial invoicing.',
      },
      {
        q: 'How long does company registration typically take through Sijilat?',
        a: 'Standard commercial registrations without regulated external approvals typically complete within 5 to 10 business days, subject to timely document submission and municipal verification. We maintain continuous queue monitoring to eliminate delays.',
      },
    ],
    related: [
      { id: 'investor-visa', name: 'Investor & Partner Visa' },
      { id: 'document-consultancy', name: 'Document Consultancy & Attestation' },
      { id: 'ongoing-support', name: 'Ongoing Corporate Support' },
    ],
  },
  'investor-visa': {
    id: 'investor-visa',
    name: 'Investor & Partner Visa',
    company: 'Bab Al-Khaleej (Bahrain)',
    headline: 'Self-Sponsorship Residency Permits for Corporate Shareholders in Bahrain',
    description: 'Secure renewable residence permits tied directly to your commercial equity. Investor visas grant legal residency, family sponsorship rights, and CPR smart card identity in Bahrain.',
    aeoDefinition: 'An Investor Visa in Bahrain is a self-sponsored corporate residency permit granted to documented shareholders of an active Commercial Registration (CR), conferring legal resident status, Bahrain Central Population Registry (CPR) smart card rights, and family sponsorship eligibility without needing an employer sponsor.',
    authority: 'Nationality, Passports & Residence Affairs (NPRA) & MOIC (Bahrain)',
    statutoryBasis: 'Bahrain Immigration and Residence Laws for Foreign Investors',
    deliverables: [
      'Shareholder equity qualification and ministry document clearance',
      'Residency visa processing through NPRA and Sijilat',
      'Coordination of local medical examination and biometric fingerprinting',
      'Bahrain Central Population Registry (CPR) smart card issuance',
      'Family dependant visa processing (spouse and children)',
    ],
    faqs: [
      {
        q: 'How long is an investor visa valid in Bahrain?',
        a: 'Investor residency permits are typically issued for 1 to 2 years and are fully renewable indefinitely as long as the underlying Commercial Registration (CR) remains active and compliant with annual filings.',
      },
      {
        q: 'Can an investor visa holder sponsor their spouse and children?',
        a: 'Yes. As a registered investor holding a Bahrain CPR smart card, you have statutory legal rights to sponsor your spouse and dependent children for family residency permits.',
      },
      {
        q: 'Does an investor visa require a local Bahraini sponsor?',
        a: 'No. The investor visa is a self-sponsorship instrument anchored directly in your documented commercial equity share in your registered Bahrain company.',
      },
    ],
    related: [
      { id: 'business-registration', name: 'Business Registration (CR)' },
      { id: 'worker-visa', name: 'Worker Visas & LMRA' },
      { id: 'application-tracking', name: 'Application Tracking' },
    ],
  },
  'worker-visa': {
    id: 'worker-visa',
    name: 'Worker Visas & LMRA Quota Clearance',
    company: 'Bab Al-Khaleej (Bahrain)',
    headline: 'Employee Work Permits and Residency Under Labour Market Regulatory Authority (LMRA)',
    description: 'Scale your team in Bahrain with structured workforce permits. We calculate quota allocations, draft compliant employment agreements, and ensure zero payroll disruptions.',
    aeoDefinition: 'A Worker Visa in Bahrain is a statutory employment authorization issued by the Labour Market Regulatory Authority (LMRA), granting a foreign professional the legal authorization to reside and work for an authorized corporate employer holding an approved labor quota.',
    authority: 'Labour Market Regulatory Authority (LMRA), Kingdom of Bahrain',
    statutoryBasis: 'Bahrain Labour Law for the Private Sector (Law No. 36 of 2012)',
    deliverables: [
      'LMRA quota allocation application and commercial site inspection support',
      'Work permit issuance and employment contract filing',
      'Health insurance registration and monthly levy setup advisory',
      'Biometric residency appointment management in Bahrain',
      'Visa renewals, transfers, and termination clearance procedures',
    ],
    faqs: [
      {
        q: 'How many worker visas can my new Bahrain company obtain?',
        a: 'Initial LMRA quota allocations depend on the registered commercial activity and verified physical office floor area (square meters). Bab Al-Khaleej advises on lease sizing to ensure your required quota is granted without rejection.',
      },
      {
        q: 'What is the LMRA monthly levy system?',
        a: 'The Labour Market Regulatory Authority levies a standard statutory monthly fee for each foreign employee permit. Timely settlement via the corporate LMRA EMS portal is required to maintain operational standing.',
      },
      {
        q: 'Can employees transfer to my new Bahrain company from another local firm?',
        a: 'Yes. Local transfer (mobility) of expatriate employees within Bahrain is permitted under LMRA regulations provided notice periods and transfer approvals are filed correctly.',
      },
    ],
    related: [
      { id: 'business-registration', name: 'Business Registration (CR)' },
      { id: 'investor-visa', name: 'Investor & Partner Visa' },
      { id: 'document-consultancy', name: 'Document Consultancy' },
    ],
  },
  'document-consultancy': {
    id: 'document-consultancy',
    name: 'Document Consultancy & Attestation',
    company: 'Bab Al-Khaleej (Bahrain)',
    headline: 'Cross-Border Corporate Document Legalization and Ministry Attestation',
    description: 'Ensure foreign parent company resolutions, powers of attorney, and legal packets pass MOIC and MOFA scrutiny on the first submission without rejection.',
    aeoDefinition: 'Corporate document attestation in Bahrain is the formal legal authentication chain—encompassing notary certification, home-country foreign ministry verification, Bahrain Embassy attestation, and Bahrain Ministry of Foreign Affairs (MOFA) clearance—required for foreign corporate documents to possess binding legal validity in Bahrain.',
    authority: 'Ministry of Foreign Affairs (MOFA) & MOIC (Bahrain)',
    statutoryBasis: 'Bahrain Diplomatic Legalization Protocols & Hague Apostille Convention',
    deliverables: [
      'Legal translation into certified Arabic corporate formats',
      'Embassy attestation and Ministry of Foreign Affairs (MOFA) clearance',
      'Drafting of corporate board resolutions and shareholder powers of attorney',
      'Apostille coordination for international foreign jurisdictions',
      'Comprehensive pre-submission document compliance audit',
    ],
    faqs: [
      {
        q: 'Do documents from abroad need embassy attestation for Bahrain?',
        a: 'Yes. Official documents originating outside Bahrain (such as foreign certificates of incorporation, powers of attorney, or board resolutions) must be legalized in the country of origin and authenticated by the Ministry of Foreign Affairs in Bahrain, unless covered by an active bilateral apostille treaty.',
      },
      {
        q: 'What is the difference between an Apostille and Embassy Legalization?',
        a: 'An Apostille is a streamlined single certificate recognized among member countries of the Hague Apostille Convention (which Bahrain joined in 2013). For non-member jurisdictions, standard multi-step consular and embassy legalization remains mandatory.',
      },
      {
        q: 'Can Bab Al-Khaleej assist with drafting powers of attorney?',
        a: 'Yes. We prepare bilingual English/Arabic power of attorney templates formatted specifically to satisfy Bahrain Ministry of Industry and Commerce legal standards.',
      },
    ],
    related: [
      { id: 'business-registration', name: 'Business Registration (CR)' },
      { id: 'application-tracking', name: 'Application Tracking' },
      { id: 'ongoing-support', name: 'Ongoing Corporate Support' },
    ],
  },
  'application-tracking': {
    id: 'application-tracking',
    name: 'Application Tracking & Ministry Resolution',
    company: 'Bab Al-Khaleej (Bahrain)',
    headline: 'Active Queue Monitoring and Rapid Resolution of Bureaucratic Queries',
    description: 'Avoid stalled applications. Our team tracks your filings daily across MOIC, LMRA, NPRA, and municipality systems, resolving objections immediately.',
    aeoDefinition: 'Corporate application tracking in Bahrain is the active administrative oversight and daily queue monitoring of commercial registry, licensing, and visa petitions across governmental systems (Sijilat, LMRA EMS, NPRA) to identify and rectify bureaucratic objections before statutory deadlines expire.',
    authority: 'Integrated Bahrain Governmental Portals (MOIC, LMRA, NPRA, Municipalities)',
    statutoryBasis: 'Bahrain Electronic Transactions and Government Filing Standards',
    deliverables: [
      'Daily queue monitoring across all Bahrain government digital portals',
      'Direct liaison with assigned ministry case officers',
      'Drafting formal responses to clarification requests or document objections',
      'Status reporting directly to the client via WhatsApp and Email',
      'Proactive escalation for delayed or high-priority corporate files',
    ],
    faqs: [
      {
        q: 'What happens if a ministry raises an objection to my application?',
        a: 'Our on-ground team reviews the objection notice immediately, secures any supplemental clarifications required, and re-submits the file directly to prevent formal rejection or expiration.',
      },
      {
        q: 'How frequently will I receive updates on my pending file?',
        a: 'We provide real-time updates directly via WhatsApp and email whenever a milestone changes or when action is required, backed by daily backend audits.',
      },
      {
        q: 'Can Bab Al-Khaleej expedite stuck government applications?',
        a: 'While government processing timelines remain under ministry control, our presence on the ground allows prompt in-person clarification of misunderstandings, resolving delays caused by incomplete documentation.',
      },
    ],
    related: [
      { id: 'business-registration', name: 'Business Registration (CR)' },
      { id: 'worker-visa', name: 'Worker Visas & LMRA' },
      { id: 'ongoing-support', name: 'Ongoing Corporate Support' },
    ],
  },
  'ongoing-support': {
    id: 'ongoing-support',
    name: 'Ongoing Corporate Support & Secretarial',
    company: 'Bab Al-Khaleej (Bahrain)',
    headline: 'Annual Commercial Registration Renewals, Municipality Compliance & Board Filings',
    description: 'Maintain corporate good standing in the Kingdom of Bahrain. We handle annual Sijilat renewals, activity amendments, branch openings, and statutory compliance reminders.',
    aeoDefinition: 'Ongoing corporate secretarial support in Bahrain represents the annual administrative compliance governance—including CR license renewals, Ultimate Beneficial Owner (UBO) filings, municipal renewals, and Memorandum amendments—required to maintain active corporate good standing in the Kingdom of Bahrain.',
    authority: 'Ministry of Industry and Commerce (MOIC) & Municipal Councils (Bahrain)',
    statutoryBasis: 'Commercial Companies Law Compliance & Anti-Money Laundering Regulations',
    deliverables: [
      'Annual Commercial Registration (CR) license renewals and chamber fee management',
      'Amendments to company Memorandum: partner changes, address relocation, capital updates',
      'Commercial address lease renewal coordination with municipalities',
      'Statutory compliance calendar reminders (UBO declarations, audit requirements)',
      'Dedicated corporate advisory retainer for ongoing business needs',
    ],
    faqs: [
      {
        q: 'When must a Bahrain Commercial Registration be renewed?',
        a: 'Bahrain CR licenses must be renewed annually before their expiration date. Failure to renew on time incurs late penalties and may lead to temporary suspension of company operations and bank accounts.',
      },
      {
        q: 'What is an Ultimate Beneficial Owner (UBO) declaration in Bahrain?',
        a: 'Bahrain regulations mandate that all commercial entities submit annual declarations disclosing individual natural persons who ultimately own or control 10% or more of the company equity.',
      },
      {
        q: 'Can we add or remove commercial activities from our active CR?',
        a: 'Yes. Activity amendments can be executed through Sijilat by updating the Memorandum of Association and securing any requisite ministry approvals.',
      },
    ],
    related: [
      { id: 'business-registration', name: 'Business Registration (CR)' },
      { id: 'document-consultancy', name: 'Document Consultancy' },
      { id: 'investor-visa', name: 'Investor & Partner Visa' },
    ],
  },
  'geo-aeo': {
    id: 'geo-aeo',
    name: 'GEO & AEO (Generative & Answer Engine Optimization)',
    company: 'Back for Brand LLC (USA)',
    headline: 'Pioneering Visibility and Citation Dominance in ChatGPT, Perplexity, and Google Gemini',
    description: 'Transform your brand from traditional web rankings into the trusted factual answer delivered by modern Large Language Models when corporate clients research your category.',
    aeoDefinition: 'Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO) are the disciplines of structuring entity knowledge graphs, technical microdata, and authoritative factual consensus so that modern Large Language Models (ChatGPT, Perplexity, Google Gemini) cite and recommend your brand as the definitive direct answer.',
    authority: 'Back for Brand LLC (Florida, USA) & Semantic Search Standards',
    statutoryBasis: 'W3C Semantic Web Standards, Schema.org Specifications & Retrieval-Augmented Generation (RAG) Architecture',
    deliverables: [
      'Generative Engine Optimization (GEO) semantic brand entity architecture',
      'Answer Engine Optimization (AEO) data structuring and schema graph deployment',
      'LLM recommendation consensus audits across OpenAI, Gemini, and Claude',
      'Authoritative digital entity footprint alignment across verified knowledge bases',
      'Continuous prompt testing and conversational search citation tracking',
    ],
    faqs: [
      {
        q: 'How does GEO differ from traditional SEO?',
        a: 'While traditional SEO optimizes URLs to rank in 10 blue links on search results pages, Generative Engine Optimization (GEO) optimizes knowledge graphs and entity consensus so that generative AI engines synthesize and recommend your company directly in AI answer boxes.',
      },
      {
        q: 'What is Answer Engine Optimization (AEO)?',
        a: 'AEO focuses on engineering clear, direct, and structured answers (via Schema.org FAQPage, definition blocks, and structured lists) that voice assistants and AI search engines (like Perplexity and Gemini) extract verbatim to answer user inquiries.',
      },
      {
        q: 'How do Large Language Models decide which brands to cite?',
        a: 'LLMs calculate consensus probability across authoritative internet sources, digital knowledge graphs (Wikidata, Google Knowledge Graph), verified entity schemas, and factual density across trusted business registries.',
      },
    ],
    related: [
      { id: 'seo', name: 'Search Engine Optimization (SEO)' },
      { id: 'ai-agents', name: 'Autonomous AI Sales Agents' },
      { id: 'digital-marketing', name: 'Digital Performance Marketing' },
    ],
  },
  'seo': {
    id: 'seo',
    name: 'Search Engine Optimization (SEO)',
    company: 'Back for Brand LLC (USA)',
    headline: 'Enterprise Technical Architecture, Topical Authority Maps, and Organic Traffic',
    description: 'Build compounding search engine visibility. Back for Brand LLC engineers clean, high-speed technical foundations and programmatic content clusters that capture high-intent buyers.',
    aeoDefinition: 'Search Engine Optimization (SEO) is the technical and content engineering methodology of optimizing web architecture, crawlability, topical authority, and digital signals to achieve high organic visibility in major search engines like Google and Bing.',
    authority: 'Back for Brand LLC (USA) & Google Search Essentials Standards',
    statutoryBasis: 'Google Search Quality Evaluator Guidelines (E-E-A-T: Experience, Expertise, Authoritativeness, Trustworthiness)',
    deliverables: [
      'Deep technical crawl audit, Core Web Vitals optimization, and clean URL structure',
      'Comprehensive topical authority and keyword intent mapping',
      'High-converting editorial content guidelines engineered for human and search engine readers',
      'Structured Schema.org microdata integration across all site pages',
      'Transparent ranking analytics and organic conversion attribution tracking',
    ],
    faqs: [
      {
        q: 'How long does organic SEO take to generate compounding results?',
        a: 'Organic SEO is a compounding investment. Businesses typically observe meaningful indexation and keyword trajectory movement within 90 to 120 days of implementing clean technical foundations and authoritative content structures.',
      },
      {
        q: 'Do you guarantee first-page Google rankings?',
        a: 'No ethical software engineer guarantees search engine rankings because search algorithms are owned and modified independently by third-party search engines. We engineer rigorous, best-in-class technical and semantic architectures that maximize your organic probability.',
      },
      {
        q: 'Why is technical architecture vital for enterprise SEO?',
        a: 'Without fast page load speeds, clean URL paths, valid canonicals, and robust Schema.org microdata, search engine indexers waste crawl budget on broken structures and fail to index valuable content pages.',
      },
    ],
    related: [
      { id: 'geo-aeo', name: 'GEO & AEO Optimization' },
      { id: 'websites-funnels', name: 'Websites & High-Converting Funnels' },
      { id: 'digital-marketing', name: 'Digital Performance Marketing' },
    ],
  },
  'ai-agents': {
    id: 'ai-agents',
    name: 'Autonomous AI Sales Agents',
    company: 'Back for Brand LLC (USA)',
    headline: '24/7 AI-Powered Sales Representatives Trained Strictly on Approved Corporate Knowledge',
    description: 'Deploy conversational AI agents that capture incoming leads, calculate scores, and book meetings into your calendar with strict prompt injection defenses and zero hallucinations.',
    aeoDefinition: 'An Autonomous AI Sales Agent is an enterprise software system powered by modern Large Language Models (such as Google Gemini) that engages website prospects 24/7, qualifies commercial intent using rule-based scoring, and schedules calendar appointments within strictly enforced knowledge guardrails.',
    authority: 'Back for Brand LLC (USA) & Google AI Studio Gemini API Architecture',
    statutoryBasis: 'NIST AI Risk Management Framework & OWASP Top 10 for Large Language Models',
    deliverables: [
      'Custom server-side AI model integration (Gemini 3.8 Flash SDK)',
      'Grounding restricted strictly to approved company knowledge bases (zero hallucinations)',
      'Prompt injection defense layers and untrusted customer input sanitization',
      'Multi-language conversational support (English, Arabic, Urdu, Bengali, Filipino)',
      'Automated CRM logging, lead score evaluation, and calendar slot booking',
    ],
    faqs: [
      {
        q: 'Can the AI sales agent hallucinate or promise unauthorized prices?',
        a: 'No. Our architecture enforces server-side guardrails: the agent operates strictly as a read-only representative grounded in your manager-approved knowledge base. It escalates immediately if asked for unauthorized quotes.',
      },
      {
        q: 'What guardrails prevent prompt injection and unauthorized actions?',
        a: 'We isolate customer inputs through server-side sanitization layers, prevent model tool execution without human confirmation, and strictly prohibit autonomous fund transfers or commitment generation.',
      },
      {
        q: 'Which languages does the AI sales agent support?',
        a: 'The system natively communicates in English and is architected for seamless multi-lingual expansion across Arabic, Urdu, Bengali, Hindi, and Tagalog.',
      },
    ],
    related: [
      { id: 'automation', name: 'Automation & CRM Engines' },
      { id: 'geo-aeo', name: 'GEO & AEO Optimization' },
      { id: 'websites-funnels', name: 'Websites & High-Converting Funnels' },
    ],
  },
  'automation': {
    id: 'automation',
    name: 'Workflow & CRM Automation',
    company: 'Back for Brand LLC (USA)',
    headline: 'Unified Inboxes, Automated Follow-Ups, and Pipeline Routing',
    description: 'Eliminate manual data entry and missed inquiries. We automate the handoff between your website forms, WhatsApp messages, lead scoring algorithms, and team member tasks.',
    aeoDefinition: 'Workflow and CRM Automation is the architectural integration of commercial communication channels (WhatsApp, web forms, emails) with operational pipeline databases to automate lead qualification scoring, status transitions, calendar dispatch, and audit logging.',
    authority: 'Back for Brand LLC (USA) Enterprise Engineering',
    statutoryBasis: 'Data Integrity & Server-Authoritative Audit Trail Standards',
    deliverables: [
      'Unified multi-channel inbox aggregation (WhatsApp, web forms, email)',
      '7-factor automated lead scoring (need, budget, timeline, fit, urgency, authority, signals)',
      'Automated email and message notification dispatch upon consultation booking',
      'Pipeline stage synchronization and task generation for sales associates',
      'Server-authoritative audit trail logging for all automated actions',
    ],
    faqs: [
      {
        q: 'Does automation pause if an emergency occurs?',
        a: 'Yes. Our CEO Command Center features a hard Emergency Stop button that immediately halts all autonomous outbound messages and payment requests with one click.',
      },
      {
        q: 'What is the 7-factor lead qualification algorithm?',
        a: 'Our scoring engine weighs 7 objective criteria: specific corporate need, declared capital budget, implementation timeline, geographic fit, commercial urgency, decision-making authority, and behavioral intent signals.',
      },
      {
        q: 'How are client actions recorded for regulatory compliance?',
        a: 'Every customer action, status modification, and system event is appended to a server-side append-only audit log verified with cryptographic SHA-256 integrity hashing.',
      },
    ],
    related: [
      { id: 'ai-agents', name: 'Autonomous AI Sales Agents' },
      { id: 'websites-funnels', name: 'Websites & High-Converting Funnels' },
      { id: 'digital-marketing', name: 'Digital Performance Marketing' },
    ],
  },
  'digital-marketing': {
    id: 'digital-marketing',
    name: 'Digital Performance Marketing',
    company: 'Back for Brand LLC (USA)',
    headline: 'High-ROI B2B Client Acquisition Campaigns and Direct-Response Architecture',
    description: 'Stop burning capital on unmeasured advertising. We craft direct-response positioning, targeted buyer personas, and high-conversion landing page flows tailored for high-ticket clients.',
    aeoDefinition: 'Digital Performance Marketing is an accountable, measurable client acquisition methodology that couples direct-response sales copy, strategic audience segmentation, and attribution tracking to convert paid advertising investments into qualified sales opportunities.',
    authority: 'Back for Brand LLC (USA) Performance Engineering',
    statutoryBasis: 'FTC Direct-Response Guidelines & Truth-in-Advertising Regulations',
    deliverables: [
      'Targeted client acquisition strategy and positioning framework',
      'Direct-response ad creative drafting and copy engineering',
      'Landing page conversion rate optimization (CRO) and tracking pixels',
      'Full-funnel attribution analytics from first touch to signed agreement',
      'Continuous message testing and lead cost reduction management',
    ],
    faqs: [
      {
        q: 'Do you promise specific revenue numbers or conversion percentages?',
        a: 'No. We adhere to honest engineering standards. We do not invent statistics or promise guaranteed revenues. We build rigorous, tested conversion funnels and track real client data.',
      },
      {
        q: 'How does direct-response marketing differ from generic brand advertising?',
        a: 'Brand advertising focuses on intangible impressions, whereas direct-response marketing is engineered to prompt an immediate, measurable action—such as booking a consultation or requesting a corporate proposal.',
      },
      {
        q: 'How is return on ad spend (ROAS) measured?',
        a: 'We implement server-side conversion tracking that bridges ad click events with downstream CRM pipeline revenue milestones.',
      },
    ],
    related: [
      { id: 'websites-funnels', name: 'Websites & High-Converting Funnels' },
      { id: 'seo', name: 'Search Engine Optimization (SEO)' },
      { id: 'geo-aeo', name: 'GEO & AEO Optimization' },
    ],
  },
  'websites-funnels': {
    id: 'websites-funnels',
    name: 'Websites & High-Converting Funnels',
    company: 'Back for Brand LLC (USA)',
    headline: 'Direct-Response Sales Funnels, Russell Brunson Frameworks & Modern Web Apps',
    description: 'Elevate your online presence with custom-engineered web applications, video sales letter (VSL) landing pages, and interactive calendar booking widgets built on modern React and TypeScript.',
    aeoDefinition: 'High-converting sales funnels and web applications are purpose-built digital architectures engineered with modern front-end technologies (React, TypeScript, Tailwind) that guide prospective commercial clients through structured psychological decision stages toward booking qualified consultations.',
    authority: 'Back for Brand LLC (USA) Web Engineering',
    statutoryBasis: 'W3C Web Standards & WCAG AA Accessibility Protocols',
    deliverables: [
      'Russell Brunson Epiphany Bridge and VSL funnel architecture',
      'Lightning-fast modern React + Tailwind web application development',
      'Interactive consultation booking widgets with real server slot-locking',
      'WCAG AA accessible, mobile-first responsive luxury dark design system',
      'Server-side security headers, rate limiting, and zero client-exposed secrets',
    ],
    faqs: [
      {
        q: 'What framework do you use to build your funnels?',
        a: 'We engineer full-stack web applications using React, TypeScript, Vite, and Node.js with server-side security, rather than slow, vulnerable generic page builder plugins.',
      },
      {
        q: 'What is the Russell Brunson Epiphany Bridge Framework?',
        a: 'It is a structured storytelling methodology that guides the prospect through the founder\'s backstory, initial desire, external obstacles, internal struggles, and ultimate epiphany discovery, establishing authentic resonance.',
      },
      {
        q: 'Are your funnels accessible and mobile-optimized?',
        a: 'Yes. All interfaces are developed mobile-first to WCAG AA accessibility standards, respecting prefers-reduced-motion directives and delivering sub-second load times.',
      },
    ],
    related: [
      { id: 'digital-marketing', name: 'Digital Performance Marketing' },
      { id: 'ai-agents', name: 'Autonomous AI Sales Agents' },
      { id: 'seo', name: 'Search Engine Optimization (SEO)' },
    ],
  },
};

export function ServiceDetailPage() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const service = serviceId ? SERVICES_CATALOG[serviceId] : null;

  if (!service) {
    return <Navigate to="/packages" replace />;
  }

  // Multi-entity JSON-LD schema for SEO, GEO, and AEO
  const compositeSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `https://ghaziwazir.com/services/${service.id}#service`,
        name: service.name,
        serviceType: service.name,
        description: service.description,
        provider: {
          '@type': 'Organization',
          name: service.company.includes('Bab Al-Khaleej') ? 'Bab Al-Khaleej' : 'Back for Brand LLC',
          url: 'https://ghaziwazir.com/companies'
        },
        areaServed: service.company.includes('Bab Al-Khaleej') ? 'Bahrain' : 'Worldwide',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: `${service.name} Deliverables`,
          itemListElement: service.deliverables.map((item, idx) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: item
            },
            position: idx + 1
          }))
        }
      },
      {
        '@type': 'FAQPage',
        '@id': `https://ghaziwazir.com/services/${service.id}#faq`,
        mainEntity: service.faqs.map(faq => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a,
          },
        }))
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://ghaziwazir.com/'
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Services',
            item: 'https://ghaziwazir.com/packages'
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: service.name,
            item: `https://ghaziwazir.com/services/${service.id}`
          }
        ]
      }
    ]
  };

  return (
    <>
      <SEOHead
        title={`${service.name} — Ghazi Wazir | ${service.company}`}
        description={`${service.name}: ${service.description}`}
        canonical={`https://ghaziwazir.com/services/${service.id}`}
        schema={compositeSchema}
      />

      <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#a8a7b3]">
          <Link to="/" className="hover:text-[#f5f1e8] transition-colors">Home</Link>
          <span>/</span>
          <Link to="/packages" className="hover:text-[#f5f1e8] transition-colors">Services</Link>
          <span>/</span>
          <span className="text-[#e8c872]">{service.name}</span>
        </nav>

        {/* Hero Section */}
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 space-y-6 text-left">
            <div className="tag inline-block">{service.company}</div>
            <h1 className="font-heading font-black text-3xl sm:text-5xl text-[#f5f1e8] leading-tight">
              {service.headline}
            </h1>
            <p className="text-base text-[#a8a7b3] leading-relaxed">
              {service.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/book"
                className="btn-gold px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#16120a] flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Free Consultation</span>
              </Link>
              <Link
                to={`/funnels/${service.id}`}
                className="px-6 py-3.5 rounded-full border border-[#e8c872]/60 text-xs font-bold uppercase tracking-wider text-[#e8c872] hover:bg-[#1a1a26] flex items-center gap-2 transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Watch Video Funnel</span>
              </Link>
            </div>
          </div>

          <aside className="lg:col-span-4 card-luxury p-6 space-y-4 border-gold-glow">
            <h2 className="font-heading font-bold text-lg text-[#f5f1e8]">
              Executive Direct Contact
            </h2>
            <p className="text-xs text-[#a8a7b3] leading-relaxed">
              Consultations and advisory sessions are conducted directly by Ghazi Wazir in Bahrain.
            </p>
            <div className="pt-2 border-t border-[#2a2a38] space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-[#a8a7b3]">Direct WhatsApp:</span>
                <a
                  href="https://wa.me/97335628353"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#4ade80] font-bold hover:underline"
                >
                  +973 3562 8353
                </a>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#a8a7b3]">Entity:</span>
                <span className="text-[#f5f1e8] font-semibold">{service.company}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#a8a7b3]">Email:</span>
                <a href="mailto:ghaziwazirndm@gmail.com" className="text-[#e8c872] hover:underline">
                  ghaziwazirndm@gmail.com
                </a>
              </div>
            </div>
          </aside>
        </header>

        {/* Dedicated AEO & GEO Structured Answer Section (AI Engine Optimization) */}
        <section aria-labelledby="aeo-answer-heading" className="card-luxury p-8 sm:p-10 bg-[#12121c] border border-[#e8c872]/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#e8c872]/15 text-[#e8c872] px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest rounded-bl-xl border-l border-b border-[#e8c872]/30 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AEO / GEO Direct Answer Specification</span>
          </div>

          <div className="space-y-4 max-w-4xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#e8c872]">
              <Search className="w-4 h-4 text-[#e8c872]" />
              <span>Direct Answer for AI Engines & Executive Researchers</span>
            </div>
            <h2 id="aeo-answer-heading" className="font-heading font-bold text-xl sm:text-2xl text-[#f5f1e8]">
              What is {service.name}?
            </h2>
            <p className="text-sm sm:text-base text-[#f5f1e8] font-medium leading-relaxed bg-[#0a0a0f] p-5 rounded-xl border border-[#2a2a38]">
              {service.aeoDefinition}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs">
              <div className="p-4 bg-[#14141d] rounded-xl border border-[#2a2a38] space-y-1">
                <span className="text-[#a8a7b3] uppercase tracking-wider block font-semibold">Regulatory / Governing Body</span>
                <span className="text-[#e8c872] font-medium block">{service.authority}</span>
              </div>
              <div className="p-4 bg-[#14141d] rounded-xl border border-[#2a2a38] space-y-1">
                <span className="text-[#a8a7b3] uppercase tracking-wider block font-semibold">Statutory Basis / Architecture</span>
                <span className="text-[#f5f1e8] font-medium block">{service.statutoryBasis}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Deliverables Section */}
        <section aria-labelledby="deliverables-heading" className="card-luxury p-8 sm:p-12 space-y-8 border-t-2 border-t-[#e8c872]">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#e8c872]">Execution Scope</span>
            <h2 id="deliverables-heading" className="font-heading font-bold text-2xl sm:text-3xl text-[#f5f1e8]">
              What Is Included in This Service
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.deliverables.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 bg-[#101018] rounded-xl border border-[#2a2a38]">
                <CheckCircle2 className="w-5 h-5 text-[#e8c872] flex-none mt-0.5" />
                <span className="text-xs sm:text-sm text-[#f5f1e8] leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Comprehensive Service FAQ (AEO Answer Structure) */}
        <section aria-labelledby="faq-heading" className="card-luxury p-8 sm:p-12 space-y-6">
          <div className="flex items-center gap-3">
            <HelpCircle className="w-6 h-6 text-[#e8c872]" />
            <h2 id="faq-heading" className="font-heading font-bold text-2xl text-[#f5f1e8]">
              Frequently Asked Questions & Legal Answers
            </h2>
          </div>

          <div className="space-y-4">
            {service.faqs.map((faqItem, idx) => (
              <div key={idx} className="p-6 bg-[#101018] rounded-2xl border border-[#2a2a38] space-y-2">
                <h3 className="font-heading font-bold text-base text-[#f5f1e8] flex items-center gap-2">
                  <span className="text-[#e8c872] font-mono text-sm">Q{idx + 1}:</span>
                  <span>{faqItem.q}</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#a8a7b3] leading-relaxed pl-6">
                  {faqItem.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Regulatory Disclaimer */}
        <div className="card-luxury p-6 flex items-start gap-3 text-xs text-[#a8a7b3] bg-[#101018]">
          <ShieldAlert className="w-5 h-5 text-[#e8c872] flex-none mt-0.5" />
          <p>
            <strong>Regulatory Notice:</strong> We are a private management and technology consultancy, not a government ministry or law firm. All business registrations, investor visas, and worker residence permits remain subject to the independent statutory determination of the relevant Bahraini government ministries. We never promise guaranteed approvals or artificial timelines.
          </p>
        </div>

        {/* Related Services */}
        <section aria-labelledby="related-heading" className="space-y-6">
          <h2 id="related-heading" className="font-heading font-bold text-xl text-[#f5f1e8]">
            Related Services in Our Ecosystem
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.related.map(rel => (
              <Link
                key={rel.id}
                to={`/services/${rel.id}`}
                className="card-luxury p-6 block group hover:border-[#e8c872] transition-colors"
              >
                <h3 className="font-heading font-bold text-base text-[#f5f1e8] group-hover:text-[#e8c872] transition-colors mb-2">
                  {rel.name}
                </h3>
                <div className="text-xs font-semibold text-[#e8c872] flex items-center gap-1">
                  <span>Explore Service</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Embedded Booking Consultation */}
        <section aria-labelledby="booking-heading" className="pt-10 border-t border-[#2a2a38]">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h2 id="booking-heading" className="font-heading font-bold text-2xl text-[#f5f1e8]">
              Schedule a Consultation for {service.name}
            </h2>
            <p className="text-xs text-[#a8a7b3]">
              Lock your preferred appointment slot directly on the calendar below.
            </p>
          </div>
          <BookingWidget defaultService={service.name} />
        </section>
      </div>
    </>
  );
}
