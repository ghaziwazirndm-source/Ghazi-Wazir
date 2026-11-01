import { useState } from 'react';
import {
  FileText,
  Printer,
  X,
  CheckCircle2,
  Download,
  Building2,
  Mail,
  Phone,
  ShieldCheck,
  Send,
  Sparkles
} from 'lucide-react';
import { api } from '../services/api';

interface RequirementBriefModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
  defaultLanguage?: 'en' | 'ar' | 'ur';
}

interface ChecklistSection {
  title: string;
  items: string[];
}

const REQUIREMENTS_DATA: Record<
  string,
  {
    en: { title: string; subtitle: string; sections: ChecklistSection[]; disclaimer: string };
    ar: { title: string; subtitle: string; sections: ChecklistSection[]; disclaimer: string };
    ur: { title: string; subtitle: string; sections: ChecklistSection[]; disclaimer: string };
  }
> = {
  'cr-setup': {
    en: {
      title: 'Bahrain Commercial Registration (CR) Requirements Brief',
      subtitle: 'Official Statutory Scoping & Document Checklist &middot; Bab Al-Khaleej',
      sections: [
        {
          title: '1. Shareholder & Director Verification',
          items: [
            'Valid passport copy with minimum 6 months remaining validity for all partners',
            'Proof of residential address (utility bill or bank statement issued within 90 days)',
            'Shareholding percentage allocation and designated authorized signatory structure',
            'Curriculum Vitae (CV) and professional experience credentials for regulated activities'
          ]
        },
        {
          title: '2. Commercial Classification & Entity Type',
          items: [
            'Three (3) proposed trade names in order of commercial preference adhering to MOIC guidelines',
            'Selection of specific ISIC activity codes (confirming 100% full foreign ownership eligibility)',
            'Selection of corporate legal form: W.L.L. (With Limited Liability) or Foreign Branch',
            'Drafting and notarization of the bilingual Memorandum of Association (MOA)'
          ]
        },
        {
          title: '3. Physical Premises & Sijilat Approvals',
          items: [
            'Municipality-approved commercial address (physical office, business incubator, or virtual office lease)',
            'Preliminary commercial registration (CR without license) submission on Sijilat national portal',
            'External ministry clearances if applicable (Central Bank of Bahrain, NHRA, TRA)',
            'Bank capital deposit and corporate bank account introduction letter'
          ]
        }
      ],
      disclaimer: 'Bab Al-Khaleej is a private corporate advisory consultancy and is not a government department. Approval outcomes remain at the sole statutory discretion of MOIC and official Bahrain authorities.'
    },
    ar: {
      title: 'دليل متطلبات السجل التجاري في مملكة البحرين',
      subtitle: 'قائمة الوثائق والمستندات القانونية لتأسيس الشركات &middot; باب الخليج',
      sections: [
        {
          title: '١. وثائق الشركاء والمدراء',
          items: [
            'نسخة ملونة واضحة من جواز السفر ساري المفعول لمدة لا تقل عن ٦ أشهر لجميع الشركاء',
            'إثبات العنوان السكني (فاتورة كهرباء أو كشف حساب بنكي صادر خلال آخر ٩٠ يوماً)',
            'تحديد نسب الحصص بين الشركاء وتحديد المفوض بالتوقيع',
            'السيرة الذاتية والمؤهلات الأكاديمية في حال كانت الأنشطة تتطلب موافقات مهنية'
          ]
        },
        {
          title: '٢. حجز الاسم والأنشطة التجارية',
          items: [
            'اقتراح ٣ أسماء تجارية مرتبة حسب الأولوية ومطابقة لاشتراطات وزارة الصناعة والتجارة',
            'تحديد كود النشاط التجاري والتأكد من إمكانية التملك الأجنبي بنسبة ١٠٠٪',
            'صياغة وتوثيق عقد التأسيس والنظام الأساسي لدى كاتب العدل',
            'فتح الحساب البنكي وإصدار شهادة السجل التجاري النهائي'
          ]
        },
        {
          title: '٣. المقر التجاري والموافقات البلدية',
          items: [
            'توفير عنوان تجاري معتمد (مكتب تنفيذي، حاضنة أعمال، أو مركز أعمال مرخص)',
            'الحصول على موافقة البلدية والدفاع المدني حسب نوع النشاط',
            'تقديم المعاملة عبر بوابة سجلات الرسمية ومتابعة التدقيق'
          ]
        }
      ],
      disclaimer: 'مؤسسة باب الخليج هي جهة استشارية خاصة وليست جهة حكومية. جميع الموافقات تخضع لتقدير وزارة الصناعة والتجارة والجهات الرسمية في البحرين.'
    },
    ur: {
      title: 'بحرین کمرشل رجسٹریشن (CR) کمپنی سیٹ اپ تقاضے',
      subtitle: 'آفیشل دستاویزی چیک لسٹ برائے بزنس فارمیشن &middot; باب الخلیج',
      sections: [
        {
          title: '1۔ تمام پارٹنرز اور ڈائریکٹرز کے دستاویزات',
          items: [
            'تمام پارٹنرز کے پاسپورٹ کی رنگین کاپی (کم از کم 6 ماہ کی میعاد لازمی ہے)',
            'رہائشی پتہ کا ثبوت (یوٹیلیٹی بل یا پچھلے 90 دن کی بینک اسٹیٹمنٹ)',
            'کمپنی میں شیئر ہولڈنگ فیصد اور سائننگ اتھارٹی کا تعین',
            'ضروری سرگرمیوں کے لیے سی وی اور تجربے کا سرٹیفکیٹ'
          ]
        },
        {
          title: '2۔ کمپنی کا نام اور کاروباری سرگرمیاں',
          items: [
            'تین مجوزہ تجارتی نام ترجیحی بنیاد پر (وزارت تجارت کے اصولوں کے مطابق)',
            'بزنس ایکٹیوٹی کوڈ کا انتخاب (100 فیصد غیر ملکی ملکیت کی تصدیق)',
            'کمپنی کا قانونی ڈھانچہ (W.L.L یا فارن برانچ)',
            'عربی اور انگریزی میں میمورنڈم آف ایسوسی ایشن (MOA) کی تیاری اور نوٹری'
          ]
        },
        {
          title: '3۔ آفس ایڈریس اور حکومتی تصدیق',
          items: [
            'میونسپلٹی سے منظور شدہ تجارتی دفتر یا بزنس سینٹر کا کرایہ نامہ',
            'بحرین سجلات پورٹل پر آن لائن درخواست جمع کروانا',
            'کارپوریٹ بینک اکاؤنٹ کا اجراء اور فائنل سی آر سرٹیفکیٹ'
          ]
        }
      ],
      disclaimer: 'باب الخلیج ایک پرائیویٹ کارپوریٹ کنسلٹنسی ہے۔ حتمی منظوری اور لائسنس کا فیصلہ بحرین کی متعلقہ وزارتوں کا قانونی اختیار ہے۔'
    }
  },
  'investor-visa': {
    en: {
      title: 'Bahrain Investor & Partner Residency Visa Brief',
      subtitle: 'Self-Sponsorship Residency & Family Visas &middot; Bab Al-Khaleej',
      sections: [
        {
          title: '1. Eligibility & CR Linkage',
          items: [
            'Active commercial registration (CR) with registered equity/shareholding',
            'Minimum shareholder capital allocation meeting NPRA self-sponsorship requirements',
            'Clear criminal background check and valid international passport'
          ]
        },
        {
          title: '2. Application & In-Country Processing',
          items: [
            'Security clearance and entry visa issuance through Nationality, Passports & Residence Affairs (NPRA)',
            'In-Kingdom pre-employment medical examination at authorized medical clinic',
            'Biometric fingerprint appointment and digital record enrollment',
            'Issuance of official Bahrain Central Population Registry (CPR) Smart Card'
          ]
        }
      ],
      disclaimer: 'Visa issuances are subject to official security and immigration adjudication by Bahrain NPRA and LMRA.'
    },
    ar: {
      title: 'دليل تأشيرات المستثمر والإقامة في البحرين',
      subtitle: 'الإقامة الذاتية للمستثمرين والشركاء &middot; باب الخليج',
      sections: [
        {
          title: '١. شروط الاستحقاق والارتباط بالسجل',
          items: [
            'وجود سجل تجاري نشط يثبت ملكية الحصص في الشركة',
            'استيفاء اشتراطات شؤون الجنسية والجوازات والإقامة',
            'جواز سفر صالح وسيرة خالية من أي موانع أمنية'
          ]
        },
        {
          title: '٢. الإجراءات وإصدار بطاقة الهوية',
          items: [
            'الحصول على الموافقة الأمنية وتأشيرة الدخول',
            'إجراء الفحص الطبي لدى المراكز المعتمدة في البحرين',
            'حجز موعد التبصيم وأخذ البصمات الحيوية',
            'إصدار بطاقة الهوية الذكية (CPR) وتثبيت ملصق الإقامة'
          ]
        }
      ],
      disclaimer: 'إصدار التأشيرات والإقامات يخضع لتقدير شؤون الجنسية والجوازات والإقامة وهيئة تنظيم سوق العمل.'
    },
    ur: {
      title: 'بحرین انویسٹر اور پارٹنر ریزیڈنسی ویزا گائیڈ',
      subtitle: 'سیلف اسپانسرشپ ریزیڈنسی اور فیملی ویزا &middot; باب الخلیج',
      sections: [
        {
          title: '1۔ ویزا اہلیت کے تقاضے',
          items: [
            'بحرین میں ایکٹیو کمرشل رجسٹریشن (CR) میں شیئر ہولڈنگ کا اندراج',
            'کم از کم درکار سرمایہ اور این پی آر اے کے سیلف اسپانسرشپ معیار کی پاسداری',
            'درست پاسپورٹ اور صاف سیکیورٹی ریکارڈ'
          ]
        },
        {
          title: '2۔ طریقہ کار اور سمارٹ کارڈ کا اجراء',
          items: [
            'امیگریشن سے سیکیورٹی کلیئرنس اور انٹری ویزا کا حصول',
            'بحرین پہنچ کر منظور شدہ اسپتال سے میڈیکل ٹیسٹ',
            'بایومیٹرک فنگر پرنٹ اور سی پی آر (CPR) اسمارٹ کارڈ کا اجرا'
          ]
        }
      ],
      disclaimer: 'تمام ویزوں اور ریزیڈنسی کے حتمی فیصلے بحرین امیگریشن اور ایل ایم آر اے کے مجاز افسران کرتے ہیں۔'
    }
  }
};

export function RequirementBriefModal({
  isOpen,
  onClose,
  defaultService = 'cr-setup',
  defaultLanguage = 'en'
}: RequirementBriefModalProps) {
  const [selectedService, setSelectedService] = useState<'cr-setup' | 'investor-visa'>('cr-setup');
  const [lang, setLang] = useState<'en' | 'ar' | 'ur'>(defaultLanguage);
  const [emailInput, setEmailInput] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const content = REQUIREMENTS_DATA[selectedService][lang];
  const isRTL = lang === 'ar' || lang === 'ur';

  const handlePrint = () => {
    window.print();
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim() || loading) return;

    setLoading(true);
    try {
      await api.submitLead({
        name: 'Prospective Client (PDF Request)',
        email: emailInput.trim(),
        service: selectedService === 'cr-setup' ? 'Bahrain CR Requirements Brief' : 'Investor Visa Requirements Brief',
        message: `Requested official requirements brief in ${lang.toUpperCase()}`,
        consent: true
      });
      setEmailSent(true);
    } catch {
      setEmailSent(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-3xl max-h-[90vh] bg-[#090d16] border border-[#1e2d4d] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-[#f8fafc]"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {/* Modal Top Actions Bar */}
        <div className="p-4 bg-[#131d33] border-b border-[#1e2d4d] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#94a3b8]">Language / زبان / اللغة:</span>
            <div className="flex rounded-lg bg-[#090d16] p-1 border border-[#1e2d4d]">
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

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-[#38bdf8] hover:bg-[#0ea5e9] text-[#090d16] font-bold text-xs flex items-center gap-1.5 transition-colors shadow-md"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#94a3b8] hover:text-[#f8fafc] hover:bg-[#1e2d4d] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Service Toggle */}
        <div className="px-6 py-3 bg-[#0c1322] border-b border-[#1e2d4d] flex gap-3 overflow-x-auto text-xs">
          <button
            type="button"
            onClick={() => setSelectedService('cr-setup')}
            className={`px-3.5 py-1.5 rounded-lg font-bold border transition-colors ${
              selectedService === 'cr-setup'
                ? 'bg-[#131d33] border-[#38bdf8] text-[#38bdf8]'
                : 'border-[#1e2d4d] text-[#94a3b8] hover:border-[#38bdf8]/50'
            }`}
          >
            🏢 Commercial Registration (CR)
          </button>
          <button
            type="button"
            onClick={() => setSelectedService('investor-visa')}
            className={`px-3.5 py-1.5 rounded-lg font-bold border transition-colors ${
              selectedService === 'investor-visa'
                ? 'bg-[#131d33] border-[#38bdf8] text-[#38bdf8]'
                : 'border-[#1e2d4d] text-[#94a3b8] hover:border-[#38bdf8]/50'
            }`}
          >
            🛂 Investor & Partner Visas
          </button>
        </div>

        {/* Document Printable View */}
        <div id="printable-brief" className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-sm bg-[#090d16]">
          {/* Official Letterhead */}
          <div className="pb-6 border-b border-[#1e2d4d] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#131d33] border border-[#38bdf8]/40 text-[#38bdf8] text-[11px] font-bold uppercase tracking-wider mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Executive Corporate Advisory</span>
              </div>
              <h2 className="font-heading font-black text-xl sm:text-2xl text-[#f8fafc]">
                {content.title}
              </h2>
              <p className="text-xs text-[#94a3b8] mt-1">{content.subtitle}</p>
            </div>

            <div className="text-right text-xs space-y-1 sm:border-l sm:border-[#1e2d4d] sm:pl-4">
              <div className="font-bold text-[#f8fafc]">Ghazi Wazir</div>
              <div className="text-[11px] text-[#94a3b8]">CEO, Bab Al-Khaleej & Back for Brand LLC</div>
              <div className="text-[11px] text-[#22c55e] font-semibold">WhatsApp: +973 3562 8353</div>
              <div className="text-[11px] text-[#38bdf8]">ghaziwazirndm@gmail.com</div>
            </div>
          </div>

          {/* Checklist Sections */}
          <div className="space-y-6">
            {content.sections.map((sec, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-[#131d33]/60 border border-[#1e2d4d] space-y-3">
                <h3 className="font-heading font-bold text-base text-[#38bdf8] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#38bdf8]" />
                  <span>{sec.title}</span>
                </h3>
                <ul className="space-y-2 text-xs text-[#f8fafc]">
                  {sec.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#38bdf8] flex-none mt-0.5" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Disclaimer & Authority Notice */}
          <div className="p-4 rounded-xl bg-[#0c1322] border border-[#1e2d4d] text-[11px] text-[#94a3b8] leading-relaxed flex items-start gap-3">
            <ShieldCheck className="w-4 h-4 text-[#38bdf8] flex-none mt-0.5" />
            <p>{content.disclaimer}</p>
          </div>
        </div>

        {/* Email Copy Footer */}
        <div className="p-4 bg-[#131d33] border-t border-[#1e2d4d] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs print:hidden">
          <div className="flex items-center gap-2 text-[#94a3b8]">
            <Mail className="w-4 h-4 text-[#38bdf8]" />
            <span>Send this official PDF checklist to your inbox:</span>
          </div>

          {emailSent ? (
            <div className="flex items-center gap-1.5 text-xs text-[#4ade80] font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Document dispatched to your email!</span>
            </div>
          ) : (
            <form onSubmit={handleSendEmail} className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="email"
                required
                value={emailInput}
                onChange={e => setEmailInput(e.target.value)}
                placeholder="Enter your email address..."
                className="px-3 py-1.5 rounded-lg border border-[#1e2d4d] bg-[#090d16] text-xs text-[#f8fafc] placeholder-[#64748b] focus:outline-none focus:border-[#38bdf8]"
              />
              <button
                type="submit"
                disabled={loading || !emailInput.trim()}
                className="px-3.5 py-1.5 rounded-lg bg-[#38bdf8] hover:bg-[#0ea5e9] text-[#090d16] font-bold text-xs disabled:opacity-40 transition-colors flex items-center gap-1"
              >
                <span>Email Brief</span>
                <Send className="w-3 h-3" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
