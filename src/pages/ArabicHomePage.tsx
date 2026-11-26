import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import {
  Building2,
  Globe,
  ShieldCheck,
  Calendar,
  Phone,
  ArrowLeft,
  CheckCircle2,
  ShieldAlert,
  MapPin
} from 'lucide-react';

export function ArabicHomePage() {
  const arabicFaqSchema = {
    '@type': 'FAQPage',
    '@id': 'https://ghazi-wazir.vercel.app/ar#faq',
    inLanguage: 'ar',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'كيف تبدأ شركة في البحرين بملكية أجنبية ١٠٠٪ مع باب الخليج؟',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'نساعد المستثمرين في اختيار الأنشطة التجارية المناسبة عبر بوابة سجلات، وتجهيز عقد التأسيس، وترتيب العنوان التجاري المعتمد. تخضع الأهلية النهائية والموافقات الرسمية للجهات المختصة في مملكة البحرين (يرجى التحقق من المصادر الرسمية: سجلات ووزارة الصناعة والتجارة).'
        }
      },
      {
        '@type': 'Question',
        name: 'ما هي الخدمات التي تقدمها باك فور براند (Back for Brand LLC)؟',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'تقدم شركة باك فور براند خدمات تحسين محركات التوليد والذكاء الاصطناعي (GEO و AEO)، وتحسين محركات البحث (SEO)، ووكلاء المبيعات الذكيين متعددي اللغات، وبناء مسارات التحويل الرقمية.'
        }
      }
    ]
  };

  return (
    <>
      <SEOHead
        title="تأسيس الشركات في البحرين والتسويق بالذكاء الاصطناعي | غازي وزير"
        description="خدمات تأسيس الشركات في البحرين وإقامات المستثمرين مع باب الخليج، وحلول GEO و AEO والذكاء الاصطناعي مع باك فور براند. احجز استشارتك."
        canonical="https://ghazi-wazir.vercel.app/ar"
        lang="ar"
        alternateEn="https://ghazi-wazir.vercel.app/"
        alternateAr="https://ghazi-wazir.vercel.app/ar"
        breadcrumbs={[
          { name: 'الرئيسية', item: 'https://ghazi-wazir.vercel.app/ar' }
        ]}
        schema={arabicFaqSchema}
      />

      <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16" dir="rtl">
        {/* Language Switch Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#262633]">
          <span className="text-xs font-semibold text-[#e8c872]">
            النسخة العربية الرسمية &middot; غازي وزير
          </span>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#14141b] border border-[#262633] hover:border-[#e8c872] text-xs font-semibold text-[#f7f4ec] transition-colors"
          >
            <span>English Version</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6 text-right">
            <div className="tag inline-block">القيادة التنفيذية &middot; المنامة وفلوريدا</div>
            <h1 className="font-heading font-bold text-4xl sm:text-5xl text-[#f7f4ec] leading-tight">
              أعمالك في مملكة البحرين،{' '}
              <span className="text-gold-gradient">مدعومة بأحدث تقنيات الذكاء الاصطناعي.</span>
            </h1>
            <p className="text-base text-[#a39f96] leading-relaxed max-w-2xl">
              يقود غازي وزير شركتين متخصصتين بمعيار تنفيذي موحد: <strong className="text-[#f7f4ec]">باب الخليج</strong> لتأسيس الشركات واستخراج السجل التجاري والإقامات في البحرين، و<strong className="text-[#f7f4ec]">باك فور براند (Back for Brand LLC)</strong> لحلول البحث الذكي GEO و AEO ووكلاء المبيعات المؤتمتين.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/book"
                className="btn-gold min-h-[48px] px-7 py-3.5 rounded-full text-xs font-bold text-[#0b0905] inline-flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>احجز استشارة مجانية</span>
              </Link>
              <a
                href="https://wa.me/97335628353"
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[48px] px-6 py-3.5 rounded-full border border-[#262633] hover:border-[#4ade80] text-xs font-semibold text-[#f7f4ec] inline-flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#4ade80]" />
                <span>واتساب مباشر (+973 3562 8353)</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm bg-[#121218] border border-[#e8c872]/30 rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/ghazi-wazir-photo.jpg"
                alt="غازي وزير - الرئيس التنفيذي لباب الخليج وباك فور براند"
                width={400}
                height={500}
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="p-5 space-y-1.5">
                <div className="font-heading font-bold text-2xl text-[#f7f4ec]">غازي وزير</div>
                <div className="text-xs text-[#e8c872]">الرئيس التنفيذي &middot; المنامة، البحرين</div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#a39f96] pt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#e8c872]" />
                  <span>مركز يتيم (The Collective Hub)، المنامة &middot; هاتف: 34398754 973+</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Two Companies Breakdown */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <article className="card-luxury p-8 space-y-5 border-t-2 border-t-[#e8c872]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#e8c872]">البحرين &middot; المنامة</span>
              <Building2 className="w-5 h-5 text-[#e8c872]" />
            </div>
            <h2 className="font-heading font-bold text-2xl text-[#f7f4ec]">
              باب الخليج لخدمات الأعمال وتخليص المعاملات
            </h2>
            <p className="text-xs text-[#a39f96] leading-relaxed">
              مؤسسة استشارية خاصة تساعد رواد الأعمال والمستثمرين في تجهيز ملفات تأسيس الشركات والسجل التجاري وطلبات الإقامة وتصاريح العمل وتصديق الوثائق.
            </p>
            <ul className="space-y-2.5 text-xs text-[#f7f4ec]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#e8c872] flex-none mt-0.5" />
                <span>تأسيس الشركات والسجل التجاري (CR) عبر بوابة سجلات</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#e8c872] flex-none mt-0.5" />
                <span>تنسيق تأشيرات المستثمرين والإقامات (NPRA) وتصاريح العمل (LMRA)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#e8c872] flex-none mt-0.5" />
                <span>تصديق المستندات والترجمة القانونية وصياغة عقود التأسيس</span>
              </li>
            </ul>
            <div className="pt-4 border-t border-[#262633] flex flex-wrap gap-3">
              <Link to="/services/business-registration" className="text-xs font-bold text-[#e8c872] hover:underline">
                تفاصيل تأسيس الشركات &larr;
              </Link>
              <Link to="/services/investor-visa" className="text-xs font-bold text-[#f7f4ec] hover:text-[#e8c872]">
                تأشيرات المستثمرين &larr;
              </Link>
            </div>
          </article>

          <article className="card-luxury p-8 space-y-5 border-t-2 border-t-[#c59b38]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#e8c872]">الولايات المتحدة والعالم</span>
              <Globe className="w-5 h-5 text-[#e8c872]" />
            </div>
            <h2 className="font-heading font-bold text-2xl text-[#f7f4ec]">
              باك فور براند (Back for Brand LLC)
            </h2>
            <p className="text-xs text-[#a39f96] leading-relaxed">
              وكالة تقنية مسجلة في فلوريدا تساعد الشركات على الظهور في محركات الإجابات والذكاء الاصطناعي وبناء وكلاء مبيعات مؤتمتين ومسارات تحويل عالية الكفاءة.
            </p>
            <ul className="space-y-2.5 text-xs text-[#f7f4ec]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#e8c872] flex-none mt-0.5" />
                <span>تحسين محركات التوليد والإجابة (GEO و AEO) والبيانات المنظمة Schema</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#e8c872] flex-none mt-0.5" />
                <span>تطوير وكلاء المبيعات بالذكاء الاصطناعي باللغتين العربية والإنجليزية</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#e8c872] flex-none mt-0.5" />
                <span>تصميم المواقع ومسارات المبيعات (Funnels) وربط أنظمة CRM</span>
              </li>
            </ul>
            <div className="pt-4 border-t border-[#262633] flex flex-wrap gap-3">
              <Link to="/services/geo-aeo" className="text-xs font-bold text-[#e8c872] hover:underline">
                خدمات GEO و AEO &larr;
              </Link>
              <Link to="/services/ai-agents" className="text-xs font-bold text-[#f7f4ec] hover:text-[#e8c872]">
                وكلاء الذكاء الاصطناعي &larr;
              </Link>
            </div>
          </article>
        </section>

        {/* Official Sources & Legal Notice */}
        <section className="card-luxury p-6 sm:p-8 space-y-4 bg-[#0e0e14]">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-[#e8c872] flex-none mt-0.5" />
            <div className="space-y-2 text-xs text-[#a39f96] leading-relaxed">
              <h2 className="text-sm font-bold text-[#f7f4ec]">
                إفصاح رسمي والتحقق من المصادر الحكومية (VERIFY against official source)
              </h2>
              <p>
                باب الخليج وباك فور براند هي جهات استشارية خاصة وليست جهات حكومية أو مكاتب محاماة. تخضع جميع قوانين التملك الأجنبي والرسوم الحكومية وشروط التأشيرات والمدد الزمنية للتحديثات والقرارات الرسمية الصادرة عن الجهات المختصة في مملكة البحرين فقط:
              </p>
              <div className="flex flex-wrap gap-4 pt-1 font-semibold text-[#e8c872]">
                <a href="https://www.sijilat.bh" target="_blank" rel="noopener noreferrer" className="hover:underline">بوابة سجلات (Sijilat)</a>
                <a href="https://www.moic.gov.bh" target="_blank" rel="noopener noreferrer" className="hover:underline">وزارة الصناعة والتجارة (MOIC)</a>
                <a href="https://www.lmra.gov.bh" target="_blank" rel="noopener noreferrer" className="hover:underline">هيئة تنظيم سوق العمل (LMRA)</a>
                <a href="https://www.npra.gov.bh" target="_blank" rel="noopener noreferrer" className="hover:underline">شؤون الجنسية والجوازات (NPRA)</a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
