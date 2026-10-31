import { useLocation } from 'react-router-dom';
import { MessageSquareText } from 'lucide-react';

export function WhatsAppButton() {
  const location = useLocation();

  const getCustomMessage = () => {
    const p = location.pathname;
    if (p.includes('business-registration')) {
      return "Hello Ghazi, I'm inquiring about Commercial Registration in Bahrain through Bab Al-Khaleej.";
    }
    if (p.includes('investor-visa')) {
      return "Hello Ghazi, I would like to consult on the Bahrain Investor Visa & residency pathway.";
    }
    if (p.includes('worker-visa')) {
      return "Hello Ghazi, I need guidance regarding LMRA quotas and Bahrain worker visas.";
    }
    if (p.includes('document-consultancy')) {
      return "Hello Ghazi, I have questions regarding Bahrain ministry document clearance and Sijilat.";
    }
    if (p.includes('geo-aeo') || p.includes('seo')) {
      return "Hello Ghazi, I'm interested in Back for Brand LLC's Generative Engine Optimization (GEO & AEO) services.";
    }
    if (p.includes('ai-agents') || p.includes('automation')) {
      return "Hello Ghazi, I would like to discuss implementing autonomous AI sales agents for my company.";
    }
    if (p.includes('formation')) {
      return "Hello Ghazi, I'm reviewing the Bahrain Company Formation Blueprint and would like to speak directly.";
    }
    if (p.includes('book')) {
      return "Hello Ghazi, I'm looking at your calendar to schedule an executive consultation.";
    }
    return "Hello Ghazi Wazir, I'm visiting your official website and would like to speak directly regarding your services.";
  };

  const encodedMsg = encodeURIComponent(getCustomMessage());
  const whatsappUrl = `https://wa.me/97335628353?text=${encodedMsg}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 group">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp VIP with Ghazi Wazir"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-2xl pulse-whatsapp hover:scale-105 transition-transform"
      >
        <MessageSquareText className="w-7 h-7" />
        <span className="sr-only">Chat on WhatsApp (+973 3562 8353)</span>
      </a>
      <div className="hidden sm:block absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[#14141d] border border-[#2a2a38] text-xs font-semibold text-[#f5f1e8] px-3.5 py-2 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="text-[11px] text-[#25D366] font-bold">WhatsApp Direct VIP</div>
        <div className="text-[10px] text-[#a8a7b3]">+973 3562 8353 (Ghazi Wazir)</div>
      </div>
    </div>
  );
}
