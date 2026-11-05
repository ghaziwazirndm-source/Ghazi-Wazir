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
import { speakStudioText, VoiceGender } from '../utils/speechVoiceEngine';

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

type SupportedLang = 'en' | 'ar' | 'ur' | 'bn' | 'fil' | 'mwr';

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
  },
  bn: {
    title: 'এক্সিকিউটিভ এআই সেলস কনসালটেন্ট',
    subtitle: 'বাব আল-খালিজ (বাহরাইন) &middot; ব্যাক ফর ব্র্যান্ড (ইউএসএ)',
    welcome: 'নমস্কার ও শুভকামনা! আমি গাজী উজিরের এআই সেলস কনসালটেন্ট। বাহরাইনে ১০০% বিদেশি মালিকানায় বাণিজ্যিক কোম্পানি স্থাপন (CR), ইনভেস্টর রেসিডেন্সি ভিসা এবং আধুনিক ডিজিটাল প্রযুক্তির জন্য আমি আপনার সেবায় প্রস্তুত। কীভাবে সাহায্য করতে পারি?',
    inputPlaceholder: 'সিআর, ভিসা, খরচ বা অন্যান্য তথ্যের জন্য প্রশ্ন লিখুন...',
    quickPrompts: [
      'বাহরাইনে কোম্পানি খোলার জন্য কী কী কাগজপত্র প্রয়োজন হয়?',
      'ইনভেস্টর রেসিডেন্সি ভিসার খরচ এবং সম্পূর্ণ সময় কত?',
      'কীভাবে ১০০% বিদেশি মালিকানা ও বাণিজ্যিক ব্যাংক অ্যাকাউন্ট পাব?',
      'আমি গাজী উজিরের সাথে সরাসরি পরামর্শ মিটিং করতে চাই'
    ],
    pdfBtn: '📄 রিকয়ারমেন্টস চেকলিস্ট (PDF) ডাউনলোড করুন',
    dealCloseHeader: 'আপনি কি চুক্তি চূড়ান্ত করতে প্রস্তুত?',
    dealCloseSub: 'গাজী উজিরের সাথে এক্সিকিউটিভ মিটিং বুক করুন অথবা সরাসরি হোয়াটসঅ্যাপে যোগাযোগ করুন।',
    bookBtn: '📅 কনসালটেশন স্লট বুক করুন',
    whatsappBtn: '💬 হোয়াটসঅ্যাপ সরাসরি (+973 3562 8353)',
    disclaimer: 'আমরা প্রাইভেট কর্পোরেট কনসালটেন্সি। সকল সরকারি অনুমোদন সংশ্লিষ্ট মন্ত্রণালয়ের অধীনে।'
  },
  fil: {
    title: 'Executive AI Sales Partner',
    subtitle: 'Bab Al-Khaleej &middot; Back for Brand LLC',
    welcome: 'Mabuhay! Ako ang AI Sales Partner ni Ghazi Wazir. Nandito ako para magbigay ng verified guidance ukol sa 100% foreign-owned commercial registration sa Bahrain, investor visa, at AI digital growth sa Back for Brand LLC. Paano kita matutulungan ngayon?',
    inputPlaceholder: 'Magtanong ukol sa CR, visa, pricing, o ilagay ang iyong details...',
    quickPrompts: [
      'Ano ang mga requirements para magtayo ng kumpanya sa Bahrain?',
      'Paano makakuha ng Investor Visa at Residency sa Bahrain?',
      'Gaano katagal ang proseso at magkano ang total cost?',
      'Gusto kong mag-book ng direct session kay Ghazi Wazir'
    ],
    pdfBtn: '📄 I-download ang Official Requirements PDF',
    dealCloseHeader: 'Handa ka na bang isara ang kasunduan?',
    dealCloseSub: 'Mag-book ng session kay Ghazi Wazir o mag-chat sa WhatsApp.',
    bookBtn: '📅 Mag-book ng Konsultasyon',
    whatsappBtn: '💬 WhatsApp Direct (+973 3562 8353)',
    disclaimer: 'Pribadong konsultansya; ang pinal na pag-apruba ay nakasalalay sa pamahalaan ng Bahrain.'
  },
  mwr: {
    title: 'एग्जीक्यूटिव एआई सेल्स सलाहकार',
    subtitle: 'बाब अल-खलीज &middot; बैक फॉर ब्रांड',
    welcome: 'खम्मा घणी सा! प्रणाम। मैं गाजी वजीर रो अधिकृत एआई व्यापारिक सलाहकार हूं। बहरीन में 100% मालिकाना हक री कंपनी (CR), इन्वेस्टर वीजा एवं बैक फॉर ब्रांड एआई टेक्नोलॉजी सारू आपरी सेवा में हाजिर हूं। हुकम करो सा, आज कांई सलाह चाहीजे?',
    inputPlaceholder: 'कंपनी रजिस्ट्रेशन, इन्वेस्टर वीजा या धंधे बाबत सवाल पूछो...',
    quickPrompts: [
      'बहरीन में 100% मालिकाना हक री कंपनी कियां बने सा?',
      'इन्वेस्टर वीजा और रेजिडेंसी रो पूरो खर्च अर टेम कितरो लागे?',
      'व्यापारी और एक्सपोर्ट फर्म सारू बहरीन क्यूं फायदামंद है?',
      'गाजी वजीर सूं सीधी मीटिंग या बात करवा रो तरीको कांई है?'
    ],
    pdfBtn: '📄 सरकारी नियम चेकलिस्ट (PDF) डाउनलोड करो सा',
    dealCloseHeader: 'कांई आप सौदो पक्को कर काम शुरू करवा चाहो हो?',
    dealCloseSub: 'गाजी वजीर सूं सीधी मीटिंग तय करो या व्हाट्सएप माथे बात करो सा।',
    bookBtn: '📅 मीटिंग रो स्लॉट पक्को करो',
    whatsappBtn: '💬 सीधी व्हाट्सएप बात (+973 3562 8353)',
    disclaimer: 'म्हे प्राइवेट सलाहकार हां। वीजा व लाइसेंस रा फैसला बहरीन सरकार रा महकमा करे।'
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

  const cancelSpeechRef = useRef<(() => void) | null>(null);

  // Voice Synthesis (Text-to-Speech) with Strict Gender and Acoustic Clarity
  const handleSpeak = (text: string, msgId: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (speakingMessageId === msgId) {
      if (cancelSpeechRef.current) cancelSpeechRef.current();
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
      return;
    }

    if (cancelSpeechRef.current) cancelSpeechRef.current();
    window.speechSynthesis.cancel();

    // Strict gender calibration: Arabic Tariq = male, Urdu Ayesha = female, English Sarah = female
    const targetGender: VoiceGender = lang === 'ar' ? 'male' : 'female';
    const langCode = lang === 'ar' ? 'ar-SA' : lang === 'ur' ? 'ur-PK' : 'en-US';

    setSpeakingMessageId(msgId);

    const cancel = speakStudioText(text, {
      gender: targetGender,
      langCode,
      pitch: targetGender === 'female' ? 1.18 : 0.90,
      rate: 0.98,
      onStart: () => setSpeakingMessageId(msgId),
      onEnd: () => setSpeakingMessageId(null),
      onError: () => setSpeakingMessageId(null),
    });

    cancelSpeechRef.current = cancel;
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
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
        </span>
        <Bot className="w-4 h-4 text-[#38bdf8]" />
        <span>AI Sales Agent &amp; Advisory</span>
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



            {/* Hexa-lingual Locale Selector Strip */}
            <div className="px-4 py-2 bg-[#0c1322] border-b border-[#1e2d4d] flex items-center justify-between text-xs overflow-x-auto">
              <span className="text-[11px] text-[#94a3b8] font-bold mr-2 whitespace-nowrap">Locale:</span>
              <div className="flex rounded-lg bg-[#131d33] p-0.5 border border-[#1e2d4d] gap-0.5 overflow-x-auto">
                {(['en', 'ar', 'ur', 'bn', 'fil', 'mwr'] as SupportedLang[]).map(l => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLang(l)}
                    className={`px-2 py-1 rounded text-[11px] font-bold transition-colors whitespace-nowrap ${
                      lang === l ? 'bg-[#38bdf8] text-[#090d16]' : 'text-[#94a3b8] hover:text-[#f8fafc]'
                    }`}
                  >
                    {l === 'en' ? 'EN' : l === 'ar' ? 'العربية' : l === 'ur' ? 'اردو' : l === 'bn' ? 'বাংলা' : l === 'fil' ? 'Tagalog' : 'मारवाड़ी'}
                  </button>
                ))}
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
        defaultLanguage={lang === 'ar' ? 'ar' : lang === 'ur' ? 'ur' : 'en'}
      />
    </>
  );
}
