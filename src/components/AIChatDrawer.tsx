import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { api } from '../services/api';
import { Bot, Send, X, ShieldAlert, Sparkles, AlertTriangle, Calendar, CheckCircle2, Phone, Mail } from 'lucide-react';
import { getStoredAttribution } from '../services/attribution';

interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  escalation?: boolean;
  escalationReason?: string;
  flagged?: boolean;
  leadCaptured?: boolean;
  suggestedAction?: 'BOOK_CALL' | 'WHATSAPP' | 'DOWNLOAD_BLUEPRINT';
}

const QUICK_PROMPTS = [
  'What are the steps for a Bahrain CR with Bab Al-Khaleej?',
  'How do Investor & Partner Visas work in Bahrain?',
  'Explain Generative Engine Optimization (GEO) & AEO',
  'I want to book a direct consultation with Ghazi Wazir',
];

export function AIChatDrawer() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [leadCapturedNotice, setLeadCapturedNotice] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'agent',
      text: "Hello! I am Ghazi Wazir's Autonomous Sales & Advisory Agent. I assist prospective clients with Bahrain company formation (CR), investor residency visas with Bab Al-Khaleej, and global GEO, AEO & AI agent solutions with Back for Brand LLC. How may I advise your business today?",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const userText = (textToSend || input).trim();
    if (!userText || loading) return;

    if (!textToSend) setInput('');
    const userMsg: ChatMessage = {
      id: 'u-' + Date.now(),
      sender: 'user',
      text: userText,
    };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    // Extract quick email or phone patterns if user types them in chat
    const emailMatch = userText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    const phoneMatch = userText.match(/\+?[0-9]{7,15}/);

    const leadCapture = emailMatch || phoneMatch ? {
      email: emailMatch ? emailMatch[0] : undefined,
      phone: phoneMatch ? phoneMatch[0] : undefined,
    } : undefined;

    // Detect active funnel context from current path
    const funnelContext = {
      funnelSlug: location.pathname,
      serviceName: location.pathname.includes('formation')
        ? 'Bahrain Company Formation'
        : location.pathname.includes('geo')
        ? 'GEO & AEO Systems'
        : 'Executive Consultation',
    };

    try {
      const res = await api.chatWithAI(userText, undefined, funnelContext, leadCapture);
      
      if (res.leadCaptured) {
        setLeadCapturedNotice('Your inquiry has been verified and registered into Ghazi Wazir\'s CEO Command Center.');
      }

      const agentMsg: ChatMessage = {
        id: 'a-' + Date.now(),
        sender: 'agent',
        text: res.reply,
        escalation: res.escalation,
        escalationReason: res.escalationReason,
        flagged: res.flagged,
        leadCaptured: res.leadCaptured,
        suggestedAction: res.suggestedAction,
      };
      setMessages(prev => [...prev, agentMsg]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: 'err-' + Date.now(),
          sender: 'agent',
          text: 'Thank you for reaching out. To speak directly with Ghazi Wazir, please connect via WhatsApp at +973 3562 8353 or schedule a consultation.',
          escalation: true,
          escalationReason: 'Connecting to Ghazi Wazir Direct',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Launcher Button - Modern Azure Design */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-30 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#131d33] border border-[#38bdf8]/50 text-xs font-bold text-[#38bdf8] shadow-2xl hover:border-[#38bdf8] hover:bg-[#1a2744] hover:shadow-[0_0_20px_rgba(56,189,248,0.25)] transition-all hover:scale-105 active:scale-95"
        aria-label="Open AI Sales Agent Chat"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38bdf8] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#38bdf8]"></span>
        </span>
        <Bot className="w-4 h-4 text-[#38bdf8]" />
        <span>Ask Sales Agent</span>
      </button>

      {/* Slide-out Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#090d16] border-l border-[#1e2d4d] h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="p-4 border-b border-[#1e2d4d] flex items-center justify-between bg-[#131d33]/90">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1a2744] to-[#090d16] border border-[#38bdf8]/60 flex items-center justify-center shadow-[0_0_15px_rgba(56,189,248,0.2)]">
                  <Bot className="w-5 h-5 text-[#38bdf8]" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm text-[#f8fafc] flex items-center gap-2">
                    <span>Executive AI Sales Agent</span>
                    <span className="w-2 h-2 rounded-full bg-[#38bdf8] shadow-[0_0_8px_#38bdf8]" />
                  </h3>
                  <p className="text-[11px] text-[#94a3b8]">
                    Bab Al-Khaleej &middot; Back for Brand LLC
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 text-[#94a3b8] hover:text-[#f8fafc] rounded-lg hover:bg-[#1a2744] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Disclaimer strip */}
            <div className="px-4 py-2 bg-[#0d1526] border-b border-[#1e2d4d] text-[10px] text-[#38bdf8] flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 flex-none text-[#38bdf8]" />
              <span>Private consultancy. Strictly grounded in approved executive policies.</span>
            </div>

            {leadCapturedNotice && (
              <div className="px-4 py-2.5 bg-[#12261f] border-b border-[#22c55e]/40 text-[11px] text-[#4ade80] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4ade80] flex-none" />
                  <span>{leadCapturedNotice}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setLeadCapturedNotice(null)}
                  className="text-[#94a3b8] hover:text-[#f8fafc]"
                >
                  &times;
                </button>
              </div>
            )}

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-sm">
              {messages.map(m => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 leading-relaxed text-xs shadow-md ${
                      m.sender === 'user'
                        ? 'bg-gradient-to-r from-[#38bdf8] to-[#0284c7] text-[#090d16] font-semibold'
                        : 'bg-[#131d33] border border-[#1e2d4d] text-[#f8fafc]'
                    }`}
                  >
                    {m.text}
                  </div>

                  {m.leadCaptured && (
                    <div className="mt-1.5 flex items-center gap-1.5 px-3 py-1 bg-[#12261f] rounded-lg border border-[#22c55e]/40 text-[10px] text-[#4ade80] font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Contact details qualified and forwarded to Ghazi Wazir</span>
                    </div>
                  )}

                  {m.flagged && (
                    <div className="mt-1 flex items-center gap-1 text-[10px] text-[#f59e0b] font-semibold">
                      <AlertTriangle className="w-3 h-3" />
                      <span>Security policy: System prompt protection engaged</span>
                    </div>
                  )}

                  {m.escalation && (
                    <div className="mt-2.5 p-3 bg-[#131d33] border border-[#38bdf8]/50 rounded-xl text-[11px] text-[#38bdf8] max-w-[85%] space-y-2 shadow-lg">
                      <div className="font-bold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#38bdf8]" />
                        <span>Direct Executive Escalation: {m.escalationReason || 'Senior Advisory'}</span>
                      </div>
                      <p className="text-[#94a3b8] text-[10px] leading-relaxed">
                        For bespoke corporate formations, legal verification, or enterprise agreements, connect directly with Ghazi Wazir:
                      </p>
                      <div className="flex flex-col gap-1.5 pt-1">
                        <a
                          href="https://wa.me/97335628353"
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 font-bold text-[11px] text-[#4ade80] hover:underline"
                        >
                          <Phone className="w-3 h-3" />
                          <span>WhatsApp (+973 3562 8353) &rarr;</span>
                        </a>
                        <a
                          href="mailto:ghaziwazirndm@gmail.com"
                          className="flex items-center gap-1.5 font-bold text-[11px] text-[#38bdf8] hover:underline"
                        >
                          <Mail className="w-3 h-3" />
                          <span>ghaziwazirndm@gmail.com &rarr;</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2.5 text-xs text-[#94a3b8] p-2 bg-[#131d33]/50 rounded-xl border border-[#1e2d4d]">
                  <div className="w-2 h-2 rounded-full bg-[#38bdf8] animate-ping" />
                  <span>AI Sales Agent analyzing approved knowledge base...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Chips */}
            <div className="px-3 py-2 border-t border-[#1e2d4d] bg-[#090d16] flex gap-2 overflow-x-auto text-[11px]">
              {QUICK_PROMPTS.map((qp, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(qp)}
                  className="flex-none px-2.5 py-1 rounded-lg bg-[#131d33] border border-[#1e2d4d] text-[#94a3b8] hover:text-[#38bdf8] hover:border-[#38bdf8] transition-colors whitespace-nowrap"
                >
                  {qp}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 border-t border-[#1e2d4d] bg-[#131d33] flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask about CR, visas, GEO, or provide your email..."
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#1e2d4d] bg-[#090d16] text-xs text-[#f8fafc] placeholder-[#64748b] focus:outline-none focus:border-[#38bdf8]"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="p-2.5 rounded-xl bg-[#38bdf8] hover:bg-[#0ea5e9] text-[#090d16] font-bold disabled:opacity-40 transition-colors shadow-[0_0_12px_rgba(56,189,248,0.3)]"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
