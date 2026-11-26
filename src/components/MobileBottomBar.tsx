import { useLocation, Link } from 'react-router-dom';
import { Bot, Calendar, MessageSquareText } from 'lucide-react';

export function MobileBottomBar() {
  const location = useLocation();

  const getCustomMessage = () => {
    const p = location.pathname;
    if (p.includes('business-registration')) {
      return "Hello Ghazi, I'm inquiring about Commercial Registration in Bahrain through Bab Al-Khaleej.";
    }
    if (p.includes('investor-visa')) {
      return 'Hello Ghazi, I would like to consult on the Bahrain Investor Visa & residency pathway.';
    }
    if (p.includes('worker-visa')) {
      return 'Hello Ghazi, I need guidance regarding LMRA quotas and Bahrain worker visas.';
    }
    if (p.includes('document-consultancy')) {
      return 'Hello Ghazi, I have questions regarding Bahrain ministry document clearance and Sijilat.';
    }
    if (p.includes('geo-aeo') || p.includes('seo')) {
      return "Hello Ghazi, I'm interested in Back for Brand LLC's Generative Engine Optimization (GEO & AEO) services.";
    }
    if (p.includes('ai-agents') || p.includes('automation')) {
      return 'Hello Ghazi, I would like to discuss implementing autonomous AI sales agents for my company.';
    }
    if (p.includes('formation')) {
      return "Hello Ghazi, I'm reviewing the Bahrain Company Formation Blueprint and would like to speak directly.";
    }
    if (p.includes('book')) {
      return "Hello Ghazi, I'm looking at your calendar to schedule an executive consultation.";
    }
    return "Hello Ghazi Wazir, I'm visiting your official website and would like to speak directly regarding your services.";
  };

  const whatsappUrl = `https://wa.me/97335628353?text=${encodeURIComponent(getCustomMessage())}`;

  return (
    <nav
      aria-label="Mobile quick actions"
      className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-[#0a0a0e]/95 backdrop-blur-xl border-t border-[#262633] shadow-[0_-10px_30px_rgba(0,0,0,0.75)] px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]"
    >
      <div className="max-w-lg mx-auto flex items-center justify-between gap-2">
        {/* Book Executive Consultation */}
        <Link
          to="/book"
          className="btn-gold flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-[11px] font-bold text-[#0b0905] shrink-0 active:scale-95 transition-all"
        >
          <Calendar className="w-3.5 h-3.5 text-[#0b0905] shrink-0" />
          <span>Book</span>
        </Link>

        {/* Executive AI Advisor Trigger */}
        <button
          type="button"
          onClick={() => window.dispatchEvent(new CustomEvent('gw:open-ai-chat'))}
          className="flex-1 min-w-0 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-[#14141b] border border-[#e8c872]/45 text-xs font-semibold text-[#f7f4ec] shadow-md active:scale-95 transition-all"
          aria-label="Open AI Sales Agent Chat"
        >
          <span className="inline-flex rounded-full h-2 w-2 bg-[#4ade80] shrink-0" />
          <Bot className="w-4 h-4 text-[#e8c872] shrink-0" />
          <span className="truncate">AI Advisor</span>
        </button>

        {/* Direct WhatsApp VIP Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Direct WhatsApp VIP with Ghazi Wazir"
          className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#153021] border border-[#4ade80]/40 text-[#4ade80] text-xs font-bold shadow-lg shrink-0 active:scale-95 transition-all"
        >
          <MessageSquareText className="w-4 h-4 shrink-0" />
          <span>WhatsApp</span>
        </a>
      </div>
    </nav>
  );
}
