import { useState } from 'react';
import { api } from '../services/api';
import { Bot, Send, Sparkles, CheckCircle2, ShieldCheck, Phone, Mail, ArrowRight } from 'lucide-react';
import { adTracker } from '../services/adTracking';

interface FunnelSalesAgentProps {
  funnelSlug: string;
  serviceName: string;
  companyName: string;
  defaultQuestions?: string[];
}

export function FunnelSalesAgent({
  funnelSlug,
  serviceName,
  companyName,
  defaultQuestions = [
    'What documents are needed to begin?',
    'What is the estimated timeline for approval?',
    'Can I receive the full service specification by email?',
  ],
}: FunnelSalesAgentProps) {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'agent'; text: string; leadCaptured?: boolean }>>([
    {
      sender: 'agent',
      text: `Hello! I am Ghazi Wazir's Autonomous AI Agent for ${serviceName}. What specific details, requirements, or package scopes would you like to explore?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [contactCaptured, setContactCaptured] = useState(false);

  const handleSend = async (queryText?: string) => {
    const text = (queryText || input).trim();
    if (!text || loading) return;

    if (!queryText) setInput('');
    setMessages(prev => [...prev, { sender: 'user', text }]);
    setLoading(true);

    adTracker.trackContact('AI_Sales_Agent', serviceName);

    const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    const phoneMatch = text.match(/\+?[0-9]{7,15}/);

    const leadCapture = emailMatch || phoneMatch ? {
      email: emailMatch ? emailMatch[0] : undefined,
      phone: phoneMatch ? phoneMatch[0] : undefined,
    } : undefined;

    try {
      const res = await api.chatWithAI(text, undefined, { funnelSlug, serviceName }, leadCapture);

      if (res.leadCaptured) {
        setContactCaptured(true);
        api.trackFunnelEvent(funnelSlug, 'opt_in', { service: serviceName });
      }

      setMessages(prev => [
        ...prev,
        {
          sender: 'agent',
          text: res.reply,
          leadCaptured: res.leadCaptured,
        },
      ]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          sender: 'agent',
          text: 'Thank you for reaching out! To consult directly with Ghazi Wazir regarding this service, please message via WhatsApp at +973 3562 8353 or schedule an executive session.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card-luxury p-6 border-[#1e2d4d] bg-[#0c1322] rounded-2xl shadow-xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#1e2d4d]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#131d33] border border-[#38bdf8]/50 flex items-center justify-center">
            <Bot className="w-5 h-5 text-[#38bdf8]" />
          </div>
          <div>
            <h4 className="font-heading font-bold text-sm text-[#f8fafc] flex items-center gap-1.5">
              <span>Interactive {serviceName} Sales Agent</span>
              <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse" />
            </h4>
            <p className="text-[11px] text-[#94a3b8]">
              {companyName} &middot; Grounded in Approved Policies
            </p>
          </div>
        </div>
        <div className="text-[10px] text-[#38bdf8] font-bold px-2.5 py-1 rounded-full bg-[#131d33] border border-[#38bdf8]/30">
          24/7 Autonomous
        </div>
      </div>

      {contactCaptured && (
        <div className="p-3 bg-[#12261f] border border-[#22c55e]/40 rounded-xl text-xs text-[#4ade80] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 flex-none" />
          <span>Inquiry captured! Ghazi Wazir's office has received your interest and will provide direct follow-up.</span>
        </div>
      )}

      {/* Messages */}
      <div className="space-y-3 max-h-64 overflow-y-auto pr-1 text-xs">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`p-3 rounded-xl max-w-[90%] leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-gradient-to-r from-[#38bdf8] to-[#0284c7] text-[#090d16] font-semibold'
                  : 'bg-[#131d33] border border-[#1e2d4d] text-[#f8fafc]'
              }`}
            >
              {m.text}
            </div>
            {m.leadCaptured && (
              <span className="text-[10px] text-[#4ade80] font-bold mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Contact Registered</span>
              </span>
            )}
          </div>
        ))}
        {loading && (
          <div className="text-xs text-[#94a3b8] flex items-center gap-2 py-1">
            <div className="w-2 h-2 rounded-full bg-[#38bdf8] animate-ping" />
            <span>AI Sales Agent analyzing...</span>
          </div>
        )}
      </div>

      {/* Quick Prompts */}
      <div className="flex flex-wrap gap-1.5 pt-1">
        {defaultQuestions.map((q, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSend(q)}
            className="text-[11px] px-2.5 py-1 rounded-lg bg-[#131d33] border border-[#1e2d4d] text-[#94a3b8] hover:text-[#38bdf8] hover:border-[#38bdf8] transition-colors text-left"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input */}
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2 pt-2 border-t border-[#1e2d4d]"
      >
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={`Ask anything about ${serviceName}...`}
          className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#1e2d4d] bg-[#090d16] text-xs text-[#f8fafc] placeholder-[#64748b] focus:outline-none focus:border-[#38bdf8]"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-4 py-2.5 rounded-xl bg-[#38bdf8] hover:bg-[#0ea5e9] text-[#090d16] font-bold text-xs disabled:opacity-40 transition-colors flex items-center gap-1.5"
        >
          <span>Ask</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
