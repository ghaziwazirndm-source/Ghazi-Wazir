import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../../components/SEOHead';
import { api } from '../../services/api';
import { Printer, CheckSquare, Square, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';
import { FunnelSalesAgent } from '../../components/FunnelSalesAgent';

interface StepData {
  number: number;
  title: string;
  items: string[];
}

const BLUEPRINT_STEPS: StepData[] = [
  {
    number: 1,
    title: 'Step 1: Decide Your Business Plan & Activity',
    items: [
      'Define exactly what your business will sell, to whom, and your revenue model',
      'Select your specific ISIC commercial activity code (trading, consulting, technology, etc.)',
      'Decide whether you will incorporate as a solo founder or with equity partners',
      'Establish your initial operating budget and target operational launch date',
    ],
  },
  {
    number: 2,
    title: 'Step 2: Choose Your Bahrain Legal Form',
    items: [
      'Compare company types in Bahrain (W.L.L. vs. branch of foreign company vs. sole proprietorship)',
      'Confirm whether your chosen commercial activity permits 100% full foreign ownership',
      'Structure shareholder equity percentages and liability parameters',
      'Verify requirements with a qualified Bahrain corporate adviser before paying ministry fees',
    ],
  },
  {
    number: 3,
    title: 'Step 3: Commercial Name & Shareholder Documents',
    items: [
      'Select 3 proposed commercial trade names in order of preference adhering to MOIC guidelines',
      'Verify that proposed names are available and not already trademarked in the Kingdom',
      'Prepare high-resolution color passport copies (min. 6 months validity) for all shareholders',
      'Gather verified proof of residential address (utility bill / bank statement within 90 days)',
    ],
  },
  {
    number: 4,
    title: 'Step 4: Sijilat Registration & Commercial Lease',
    items: [
      'File the commercial registration application through Sijilat (national portal)',
      'Obtain external regulatory approvals if required (Central Bank, NHRA, Telecommunications)',
      'Draft and sign the corporate Memorandum of Association (MOA) at the notary',
      'Secure a verified commercial lease address (office, business center, or incubator) approved by municipality',
    ],
  },
  {
    number: 5,
    title: 'Step 5: Visas, CPR Cards & LMRA Workforce',
    items: [
      'Determine how many foreign staff members you require and calculate LMRA quota parameters',
      'Apply for self-sponsorship Investor / Partner Visas or employee work permits',
      'Complete Bahrain biometric fingerprinting, pre-employment medical examinations, and CPR smart card issuance',
      'Enroll your enterprise and workforce with the Social Insurance Organization (SIO)',
    ],
  },
  {
    number: 6,
    title: 'Step 6: Corporate Banking & Tax Compliance',
    items: [
      'Prepare your attested corporate resolution and CR certificate packet for the bank',
      'Open your commercial corporate bank account with an authorized Bahraini retail bank',
      'Establish compliant bookkeeping, chart of accounts, and invoicing standards',
      'Check National Bureau for Revenue (NBR) Value Added Tax (VAT) registration threshold requirements',
    ],
  },
  {
    number: 7,
    title: 'Step 7: Launch & Acquire Your First Clients',
    items: [
      'Build a modern, lightning-fast web application showcasing your service catalog',
      'Establish your verified Google Business Profile in Manama',
      'Deploy basic technical and programmatic SEO so corporate buyers find you organically',
      'Structure your semantic entity data for GEO & AEO so ChatGPT and Perplexity recommend your firm',
      'Deploy an autonomous 24/7 AI sales agent to qualify incoming leads and book discovery calls',
    ],
  },
];

export function FormationBlueprintPage() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    api.trackFunnelEvent('/formation/blueprint', 'view', { service: 'Statutory 7-Step Blueprint' });
  }, []);

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <SEOHead
        title="The 7-Step Bahrain Company Formation Blueprint | Ghazi Wazir"
        description="Interactive printable 7-step checklist from concept to a company ready for revenue in the Kingdom of Bahrain."
        noindex={true}
      />

      <div className="py-12 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2a2a38]">
          <div>
            <div className="tag inline-block mb-1">Interactive Action Guide</div>
            <h1 className="font-heading font-black text-2xl sm:text-4xl text-[#f5f1e8]">
              The Bahrain Company Formation Blueprint
            </h1>
            <p className="text-xs text-[#a8a7b3] mt-1">
              Follow and check off each step sequentially to ensure an error-free corporate launch.
            </p>
          </div>

          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#e8c872]/60 text-xs font-bold text-[#e8c872] hover:bg-[#1a1a26] transition-colors print:hidden"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>

        {/* 7 Interactive Steps */}
        <div className="space-y-6">
          {BLUEPRINT_STEPS.map(step => (
            <div key={step.number} className="card-luxury p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#1c1c28] border border-[#e8c872]/50 text-[#e8c872] font-heading font-bold text-sm flex items-center justify-center">
                  0{step.number}
                </span>
                <h2 className="font-heading font-bold text-lg text-[#f5f1e8]">
                  {step.title}
                </h2>
              </div>

              <div className="space-y-2.5 pt-2">
                {step.items.map((item, idx) => {
                  const itemId = `s${step.number}-i${idx}`;
                  const isChecked = !!checkedItems[itemId];
                  return (
                    <button
                      key={itemId}
                      type="button"
                      onClick={() => toggleCheck(itemId)}
                      className={`w-full text-left p-3.5 rounded-xl border flex items-start gap-3 transition-colors ${
                        isChecked
                          ? 'bg-[#1c2e20]/60 border-[#4ade80]/40 text-[#f5f1e8]'
                          : 'bg-[#101018] border-[#2a2a38] text-[#a8a7b3] hover:border-[#b8893a]/50'
                      }`}
                    >
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-[#4ade80] flex-none mt-0.5" />
                      ) : (
                        <Square className="w-4 h-4 text-[#a8a7b3] flex-none mt-0.5" />
                      )}
                      <span className={`text-xs sm:text-sm leading-relaxed ${isChecked ? 'line-through text-[#a8a7b3]' : ''}`}>
                        {item}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="card-luxury p-6 flex items-start gap-3 text-xs text-[#a8a7b3] bg-[#101018]">
          <ShieldAlert className="w-5 h-5 text-[#e8c872] flex-none mt-0.5" />
          <p>
            General business roadmap only; not statutory legal counsel. Ministry licensing fees, municipal lease requirements, and LMRA workforce levies depend on your verified business activities. Always confirm specifics with our consultancy before financial deployment.
          </p>
        </div>

        {/* Interactive AI Blueprint Consultant */}
        <div className="print:hidden">
          <FunnelSalesAgent
            funnelSlug="/formation/blueprint"
            serviceName="Bahrain Company Formation Blueprint"
            companyName="Bab Al-Khaleej"
            defaultQuestions={[
              'Which legal structure allows 100% foreign ownership in Bahrain?',
              'What are the mandatory documents for Sijilat CR registration?',
              'How long does an Investor Visa take after CR issuance?',
              'Can I connect with Ghazi Wazir directly on WhatsApp?'
            ]}
          />
        </div>

        {/* Want This Done With You CTA Banner */}
        <div className="card-luxury p-8 sm:p-10 border-gold-glow text-center space-y-4 print:hidden">
          <div className="tag inline-block">Done-With-You Corporate Execution</div>
          <h3 className="font-heading font-bold text-2xl text-[#f5f1e8]">
            Want Bab Al-Khaleej to Handle This For You?
          </h3>
          <p className="text-xs sm:text-sm text-[#a8a7b3] max-w-lg mx-auto">
            We review your business plan, audit your shareholder documentation, execute Sijilat filings, and clear your investor visas without delays.
          </p>
          <div className="pt-2">
            <Link
              to="/formation/offer"
              className="btn-gold inline-flex items-center gap-2 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-wider text-[#16120a] shadow-2xl"
            >
              <span>Explore Done-With-You Setup Offer &rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
