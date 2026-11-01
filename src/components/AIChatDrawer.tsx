import { useState, useRef, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { api } from '../services/api';
import {
  Bot,
  Send,
  X,
  ShieldAlert,
  Sparkles,
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Phone,
  Mail,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  FileText,
  ArrowRight,
  Briefcase
} from 'lucide-react';
import { RequirementBriefModal } from './RequirementBriefModal';

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

type SupportedLang = 'en' | 'ar' | 'ur';

const TRANSLATIONS: Record<
  SupportedLang,
  {
    title: string;
    subtitle: string;
    welcome: string;
    inputPlaceholder: string;
    quickPrompts: string[];
    pdfBtn: string;
    dealCloseHeader: string;
    dealCloseSub: string;
    bookBtn: string;
    whatsappBtn: string;
    disclaimer: string;
  }
> = {
  en: {
    title: 'Executive AI Sales Agent',
    subtitle: 'Bab Al-Khaleej &middot; Back for Brand LLC',
    welcome: "Hello! I am Ghazi Wazir's Autonomous Sales Agent. I provide verified guidance on Bahrain company formation (CR), investor residency visas with Bab Al-Khaleej, and global GEO, AEO & AI agent automation with Back for Brand LLC. How can I advise you today?",
    inputPlaceholder: 'Ask about CR, visas, GEO, pricing, or provide your details...',
    quickPrompts: [
      'What are the steps for a Bahrain CR with Bab Al-Khaleej?',
      'How do Investor & Partner Visas work in Bahrain?',
      'Explain Generative Engine Optimization (GEO) & AEO',
      'I want to book a direct consultation with Ghazi Wazir'
    ],
    pdfBtn: '📄 Generate Official Requirements PDF',
    dealCloseHeader: 'Ready to Close Your Agreement?',
    dealCloseSub: 'Lock your executive slot with Ghazi Wazir or chat directly on WhatsApp.',
    bookBtn: '📅 Lock Consultation Slot',
    whatsappBtn: '💬 WhatsApp Direct (+973 3562 8353)',
    disclaimer: 'Private corporate advisory; never guarantees official approvals or government timelines.'
  },
  ar: {
    title: 'المستشار الذكي للمبيعات وتأسيس الشركات',
    subtitle: 'باب الخليج (البحرين) &middot; باك فور براند (أمريكا)',
    welcome: 'مرحباً بك! أنا الوكيل الذكي للرئيس التنفيذي غازي وزير. يسعدني إرشادك بدقة حول تأسيس الشركات في البحرين، استخراج السجل التجاري (CR)، تأشيرات وإقامات المستثمرين مع باب الخليج، وحلول الذكاء الاصطناعي مع باك فور براند. كيف أستطيع خدمتك اليوم؟',
    inputPlaceholder: 'اسأل عن السجل التجاري، التأشيرات، الأسعار، أو اترك بياناتك...',
    quickPrompts: [
      'ما هي متطلبات السجل التجاري والتملك الأجنبي 100%؟',
      'كيف أحصل على تأشيرة وإقامة مستثمر في البحرين؟',
      'ما هي تكلفة ومدة تأسيس الشركة في البحرين؟',
      'أريد حجز استشارة مباشرة مع غازي وزير'
    ],
    pdfBtn: '📄 تحميل دليل المتطلبات الرسمي (PDF)',
    dealCloseHeader: 'هل أنت جاهز لبدء معاملتك وإتمام الاتفاق؟',
    dealCloseSub: 'احجز موعد استشارتك مع غازي وزير أو تواصل مباشرة عبر الواتساب الرسمي.',
    bookBtn: '📅 حجز موعد الاستشارة التنفيذية',
    whatsappBtn: '💬 واتساب مباشر (+973 3562 8353)',
    disclaimer: 'مؤسسة استشارية خاصة؛ لا تضمن قرارات الوزارات أو المهل الحكومية الرسمية.'
  },
  ur: {
    title: 'ایگزیکٹو اے آئی سیلز ایجنٹ',
    subtitle: 'باب الخلیج (بحرین) &middot; بیک فار برانڈ (امریکہ)',
    welcome: 'السلام علیکم! میں غازی وزیر کا بااختیار اے آئی سیلز کنسلٹنٹ ہوں۔ میں بحرین میں کمپنی رجسٹریشن (CR)، 100 فیصد ملکیت، انویسٹر ریزیڈنسی ویزا، اور جدید ڈیجیٹل مارکیٹنگ میں آپ کی رہنمائی کے لیے حاضر ہوں۔ میں آپ کے بزنس کے لیے کیا مدد کر سکتا ہوں؟',
    inputPlaceholder: 'کمپنی رجسٹریشن، ویزا، فیس یا مشاورت کے بارے میں پوچھیں...',
    quickPrompts: [
      'بحرین میں کمپنی رجسٹریشن (CR) کے کیا تقاضے ہیں؟',
      'انویسٹر ویزا اور فیملی ریزیڈنسی کا کیا طریقہ کار ہے؟',
      'کمپنی سیٹ اپ میں کتنا وقت اور اخراجات آتے ہیں؟',
      'میں غازی وزیر کے ساتھ ڈائریکٹ میٹنگ بک کرنا چاہتا ہوں'
    ],
    pdfBtn: '📄 آفیشل ریکوائرمنٹس چیک لسٹ (PDF) ڈاؤنلوڈ کریں',
    dealCloseHeader: 'کیا آپ ڈیل فائنل کر کے کام شروع کرنا چاہتے ہیں؟',
    dealCloseSub: 'غازی وزیر کے ساتھ فری میٹنگ کا وقت طے کریں یا فوری واٹس ایپ پر رابطہ کریں۔',
    bookBtn: '📅 فری مشاورتی میٹنگ بک کریں',
    whatsappBtn: '💬 ڈائریکٹ واٹس ایپ (+973 3562 8353)',
    disclaimer: 'ہم پرائیویٹ کنسلٹنسی ہیں۔ تمام ویزوں اور لائسنس کے حتمی فیصلے بحرین حکومت کے مجاز ادارے کرتے ہیں۔'
  }
};

export function AIChatDrawer() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState<SupportedLang>('en');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [leadCapturedNotice, setLeadCapturedNotice] = useState<string | null>(null);
  const [showBriefModal, setShowBriefModal] = useState(false);

  // Voice State
  const [isRecording, setIsRecording] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);

  const t = TRANSLATIONS[lang];
  const isRTL = lang === 'ar' || lang === 'ur';

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'agent',
      text: t.welcome,
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // When language changes, update initial welcome message if only 1 message exists
  useEffect(() => {
    setMessages(prev => {
      if (prev.length === 1 && prev[0].id === 'welcome') {
        return [{ id: 'welcome', sender: 'agent', text: TRANSLATIONS[lang].welcome }];
      }
      return prev;
    });
  }, [lang]);

  // Voice Recognition (Speech-to-Text)
  const toggleRecording = () => {
    if (isRecording) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsRecording(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please type your message.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = lang === 'ar' ? 'ar-BH' : lang === 'ur' ? 'ur-PK' : 'en-US';

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInput(prev => (prev ? `${prev} ${transcript}` : transcript));
        }
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsRecording(false);
    }
  };

  // Voice Synthesis (Text-to-Speech)
  const handleSpeak = (text: string, msgId: string) => {
    if (!('speechSynthesis' in window)) return;

    if (speakingMessageId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'ar' ? 'ar-SA' : lang === 'ur' ? 'ur-PK' : 'en-US';
    utterance.rate = 1.0;

    utterance.onend = () => {
      setSpeakingMessageId(null);
    };

    utterance.onerror = () => {
      setSpeakingMessageId(null);
    };

    setSpeakingMessageId(msgId);
    window.speechSynthesis.speak(utterance);
  };

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

    // Extract quick email or phone patterns
    const emailMatch = userText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    const phoneMatch = userText.match(/\+?[0-9]{7,15}/);

    const leadCapture = emailMatch || phoneMatch ? {
      email: emailMatch ? emailMatch[0] : undefined,
      phone: phoneMatch ? phoneMatch[0] : undefined,
    } : undefined;

    const funnelContext = {
      funnelSlug: location.pathname,
      serviceName: location.pathname.includes('formation')
        ? 'Bahrain Company Formation'
        : location.pathname.includes('geo')
        ? 'GEO & AEO Systems'
        : 'Executive Consultation',
    };

    try {
      const res = await api.chatWithAI(userText, lang, funnelContext, leadCapture);

      if (res.leadCaptured) {
        setLeadCapturedNotice(
          lang === 'ur'
            ? 'آپ کے کوائف غازی وزیر کے سسٹم میں رجسٹر کر لیے گئے ہیں۔'
            : lang === 'ar'
            ? 'تم تسجيل بياناتك وتأكيد اهتمامك في نظام الرئيس التنفيذي غازي وزير بنجاح.'
            : 'Your inquiry has been qualified and registered into Ghazi Wazir\'s CEO Command Center.'
        );
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
          text:
            lang === 'ur'
              ? 'براہ راست غازی وزیر سے بات کرنے کے لیے واٹس ایپ +973 3562 8353 پر رابطہ فرمائیں۔'
              : lang === 'ar'
              ? 'للتواصل المباشر مع الرئيس التنفيذي غازي وزير، يرجى المراسلة عبر الواتساب: +973 3562 8353.'
              : 'Thank you for reaching out. To speak directly with Ghazi Wazir, please connect via WhatsApp at +973 3562 8353 or schedule a consultation.',
          escalation: true,
          escalationReason: 'Direct Executive Line',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Launcher Button */}
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
        <span>Ask Sales Agent (EN &middot; AR &middot; UR)</span>
      </button>

      {/* Slide-out Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="w-full max-w-md bg-[#090d16] border-l border-[#1e2d4d] h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300"
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            {/* Header */}
            <div className="p-4 border-b border-[#1e2d4d] flex items-center justify-between bg-[#131d33]/90">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1a2744] to-[#090d16] border border-[#38bdf8]/60 flex items-center justify-center shadow-[0_0_15px_rgba(56,189,248,0.2)]">
                  <Bot className="w-5 h-5 text-[#38bdf8]" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm text-[#f8fafc] flex items-center gap-2">
                    <span>{t.title}</span>
                    <span className="w-2 h-2 rounded-full bg-[#38bdf8] shadow-[0_0_8px_#38bdf8]" />
                  </h3>
                  <p className="text-[11px] text-[#94a3b8]">{t.subtitle}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  window.speechSynthesis?.cancel();
                  setIsOpen(false);
                }}
                className="p-2 text-[#94a3b8] hover:text-[#f8fafc] rounded-lg hover:bg-[#1a2744] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Trilingual Selector Strip */}
            <div className="px-4 py-2 bg-[#0c1322] border-b border-[#1e2d4d] flex items-center justify-between text-xs">
              <span className="text-[11px] text-[#94a3b8] font-bold">Language:</span>
              <div className="flex rounded-lg bg-[#131d33] p-0.5 border border-[#1e2d4d]">
                <button
                  type="button"
                  onClick={() => setLang('en')}
                  className={`px-2.5 py-1 rounded text-xs font-bold transition-colors ${
                    lang === 'en' ? 'bg-[#38bdf8] text-[#090d16]' : 'text-[#94a3b8] hover:text-[#f8fafc]'
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setLang('ar')}
                  className={`px-2.5 py-1 rounded text-xs font-bold transition-colors ${
                    lang === 'ar' ? 'bg-[#38bdf8] text-[#090d16]' : 'text-[#94a3b8] hover:text-[#f8fafc]'
                  }`}
                >
                  العربية
                </button>
                <button
                  type="button"
                  onClick={() => setLang('ur')}
                  className={`px-2.5 py-1 rounded text-xs font-bold transition-colors ${
                    lang === 'ur' ? 'bg-[#38bdf8] text-[#090d16]' : 'text-[#94a3b8] hover:text-[#f8fafc]'
                  }`}
                >
                  اردو
                </button>
              </div>
            </div>

            {/* PDF Requirement Brief Generator Button */}
            <div className="px-4 py-2 bg-[#0d1829] border-b border-[#1e2d4d] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowBriefModal(true)}
                className="w-full py-1.5 px-3 rounded-lg bg-[#131d33] hover:bg-[#1a2744] border border-[#38bdf8]/40 hover:border-[#38bdf8] text-[#38bdf8] font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <FileText className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span>{t.pdfBtn}</span>
              </button>
            </div>

            {leadCapturedNotice && (
              <div className="px-4 py-2 bg-[#12261f] border-b border-[#22c55e]/40 text-[11px] text-[#4ade80] flex items-center justify-between">
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
                    className={`max-w-[88%] rounded-2xl px-4 py-3 leading-relaxed text-xs shadow-md relative group ${
                      m.sender === 'user'
                        ? 'bg-gradient-to-r from-[#38bdf8] to-[#0284c7] text-[#090d16] font-semibold'
                        : 'bg-[#131d33] border border-[#1e2d4d] text-[#f8fafc]'
                    }`}
                  >
                    <div>{m.text}</div>

                    {/* Text-To-Speech Button */}
                    {m.sender === 'agent' && (
                      <button
                        type="button"
                        onClick={() => handleSpeak(m.text, m.id)}
                        className="mt-2 text-[10px] text-[#38bdf8] hover:text-[#f8fafc] flex items-center gap-1 font-bold pt-1 border-t border-[#1e2d4d]"
                        title="Listen to this response"
                      >
                        {speakingMessageId === m.id ? (
                          <>
                            <VolumeX className="w-3 h-3 text-[#f59e0b] animate-pulse" />
                            <span>Stop voice</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3 h-3" />
                            <span>Listen (Voice)</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {m.leadCaptured && (
                    <div className="mt-1.5 flex items-center gap-1.5 px-3 py-1 bg-[#12261f] rounded-lg border border-[#22c55e]/40 text-[10px] text-[#4ade80] font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{lang === 'ur' ? 'رابطہ تصدیق شدہ' : lang === 'ar' ? 'تم حفظ وتأكيد بيانات الاتصال' : 'Contact Registered & Qualified'}</span>
                    </div>
                  )}

                  {m.flagged && (
                    <div className="mt-1 flex items-center gap-1 text-[10px] text-[#f59e0b] font-semibold">
                      <AlertTriangle className="w-3 h-3" />
                      <span>Policy: Prompt defense active</span>
                    </div>
                  )}

                  {m.escalation && (
                    <div className="mt-2.5 p-3 bg-[#131d33] border border-[#38bdf8]/50 rounded-xl text-[11px] text-[#38bdf8] max-w-[88%] space-y-2 shadow-lg">
                      <div className="font-bold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#38bdf8]" />
                        <span>Executive Escalation: {m.escalationReason || 'Senior Advisory'}</span>
                      </div>
                      <p className="text-[#94a3b8] text-[10px] leading-relaxed">
                        For verified corporate agreements, ministry clearance, or custom retainers:
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
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2.5 text-xs text-[#94a3b8] p-2 bg-[#131d33]/50 rounded-xl border border-[#1e2d4d]">
                  <div className="w-2 h-2 rounded-full bg-[#38bdf8] animate-ping" />
                  <span>{lang === 'ur' ? 'اے آئی سیلز ایجنٹ جواب تیار کر رہا ہے...' : lang === 'ar' ? 'الوكيل الذكي يحلل اللوائح والأنظمة...' : 'AI Sales Agent analyzing approved policies...'}</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Deal Closer Banner */}
            <div className="p-3 bg-[#0d1526] border-t border-[#1e2d4d] space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-[#f8fafc] flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-[#38bdf8]" />
                  <span>{t.dealCloseHeader}</span>
                </span>
                <span className="text-[10px] text-[#38bdf8] font-bold">VIP Direct</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <Link
                  to="/book"
                  onClick={() => setIsOpen(false)}
                  className="py-2 px-3 rounded-lg bg-[#38bdf8] hover:bg-[#0ea5e9] text-[#090d16] font-bold text-center transition-colors shadow-sm"
                >
                  {t.bookBtn}
                </Link>
                <a
                  href={`https://wa.me/97335628353?text=${encodeURIComponent(
                    lang === 'ur'
                      ? 'السلام علیکم غازی صاحب، میں بحرین کمپنی سیٹ اپ اور ویزا کے حوالے سے مشاورت چاہتا ہوں۔'
                      : lang === 'ar'
                      ? 'مرحباً أستاذ غازي، أود استشارة حول تأسيس الشركة والإقامة في البحرين.'
                      : 'Hello Ghazi, I consulted your AI Sales Agent and would like to finalize my Bahrain setup package.'
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2 px-3 rounded-lg border border-[#22c55e]/50 hover:bg-[#12261f] text-[#4ade80] font-bold text-center transition-colors flex items-center justify-center gap-1"
                >
                  <Phone className="w-3 h-3" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Quick Prompt Chips */}
            <div className="px-3 py-2 border-t border-[#1e2d4d] bg-[#090d16] flex gap-2 overflow-x-auto text-[11px]">
              {t.quickPrompts.map((qp, idx) => (
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

            {/* Input Bar with Voice Microphone Toggle */}
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 border-t border-[#1e2d4d] bg-[#131d33] flex items-center gap-2"
            >
              {/* Microphone Button */}
              <button
                type="button"
                onClick={toggleRecording}
                className={`p-2.5 rounded-xl border transition-all ${
                  isRecording
                    ? 'bg-[#ef4444] border-[#ef4444] text-white animate-pulse'
                    : 'bg-[#090d16] border-[#1e2d4d] text-[#94a3b8] hover:text-[#38bdf8] hover:border-[#38bdf8]'
                }`}
                title={isRecording ? 'Listening... click to stop' : 'Click to speak (Voice input)'}
              >
                {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={t.inputPlaceholder}
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

      {/* Requirement Brief Printable / PDF Modal */}
      <RequirementBriefModal
        isOpen={showBriefModal}
        onClose={() => setShowBriefModal(false)}
        defaultLanguage={lang}
      />
    </>
  );
}
