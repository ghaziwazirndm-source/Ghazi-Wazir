import { useState, useRef, useEffect } from 'react';
import { api } from '../services/api';
import { Bot, Send, X, ShieldAlert, Sparkles, MessageSquare, AlertTriangle } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  escalation?: boolean;
  escalationReason?: string;
  flagged?: boolean;
}

export function AIChatDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'agent',
      text: "Hello! I am Ghazi Wazir's AI Sales Assistant. I can answer questions about Bahrain company formation (CR), investor visas with Bab Al-Khaleej, and our technology & GEO/AEO solutions at Back for Brand LLC. How can I help you today?",
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

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setInput('');
    const userMsg: ChatMessage = {
      id: 'u-' + Date.now(),
      sender: 'user',
      text: userText,
    };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await api.chatWithAI(userText);
      const agentMsg: ChatMessage = {
        id: 'a-' + Date.now(),
        sender: 'agent',
        text: res.reply,
        escalation: res.escalation,
        escalationReason: res.escalationReason,
        flagged: res.flagged,
      };
      setMessages(prev => [...prev, agentMsg]);
    } catch (err: any) {
      setMessages(prev => [
        ...prev,
        {
          id: 'err-' + Date.now(),
          sender: 'agent',
          text: 'Thank you for reaching out. To speak directly with Ghazi Wazir, please connect via WhatsApp at +973 3562 8353 or book a free consultation.',
          escalation: true,
          escalationReason: 'Automated service offline',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating launcher button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-30 flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#14141d] border border-[#e8c872]/60 text-xs font-bold text-[#e8c872] shadow-2xl hover:border-[#e8c872] hover:bg-[#1a1a26] transition-all hover:scale-105"
        aria-label="Open AI Sales Agent Chat"
      >
        <Bot className="w-4 h-4 text-[#e8c872]" />
        <span>Ask AI Assistant</span>
      </button>

      {/* Slide-out Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#101018] border-l border-[#2a2a38] h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="p-4 border-b border-[#2a2a38] flex items-center justify-between bg-[#14141d]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1c1c28] to-[#14141d] border border-[#e8c872]/60 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-[#e8c872]" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm text-[#f5f1e8] flex items-center gap-1.5">
                    <span>Executive AI Agent</span>
                    <span className="w-2 h-2 rounded-full bg-[#4ade80]" />
                  </h3>
                  <p className="text-[11px] text-[#a8a7b3]">
                    Grounded on Approved Knowledge Base
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 text-[#a8a7b3] hover:text-[#f5f1e8] rounded-lg hover:bg-[#1c1c28]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Disclaimer strip */}
            <div className="px-4 py-2 bg-[#1a1710] border-b border-[#2a2a38] text-[10px] text-[#e8c872] flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 flex-none" />
              <span>Private consultancy; never guarantees approvals or timelines.</span>
            </div>

            {/* Messages body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
              {messages.map(m => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 leading-relaxed text-xs ${
                      m.sender === 'user'
                        ? 'bg-gradient-to-r from-[#e8c872] to-[#b8893a] text-[#16120a] font-semibold'
                        : 'bg-[#14141d] border border-[#2a2a38] text-[#f5f1e8]'
                    }`}
                  >
                    {m.text}
                  </div>

                  {m.flagged && (
                    <div className="mt-1 flex items-center gap-1 text-[10px] text-[#ffa24d] font-semibold">
                      <AlertTriangle className="w-3 h-3" />
                      <span>Security flag: Untrusted instruction neutralized</span>
                    </div>
                  )}

                  {m.escalation && (
                    <div className="mt-2 p-2.5 bg-[#14141d] border border-[#b8893a]/50 rounded-xl text-[11px] text-[#e8c872] max-w-[85%] space-y-1.5">
                      <div className="font-bold flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-[#e8c872]" />
                        <span>Escalation Trigger: {m.escalationReason || 'Human Assistance'}</span>
                      </div>
                      <p className="text-[#a8a7b3] text-[10px]">
                        For legal interpretations, custom quotes, or dispute clearance, connect directly with Ghazi Wazir.
                      </p>
                      <a
                        href="https://wa.me/97335628353"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block mt-1 font-bold text-[11px] underline text-[#4ade80]"
                      >
                        Open WhatsApp (+973 3562 8353) &rarr;
                      </a>
                    </div>
                  )}
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-2 text-xs text-[#a8a7b3]">
                  <div className="w-2 h-2 rounded-full bg-[#e8c872] animate-ping" />
                  <span>AI Agent verifying approved knowledge...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input bar */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-[#2a2a38] bg-[#14141d] flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask about CR, visas, GEO, or funnels..."
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#2a2a38] bg-[#101018] text-xs text-[#f5f1e8] focus:outline-none focus:border-[#e8c872]"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="btn-gold p-2.5 rounded-xl text-[#16120a] disabled:opacity-40"
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
