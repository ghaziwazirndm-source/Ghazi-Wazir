/**
 * Comprehensive Multilingual Knowledge Base & Expert Sales Engine
 * for Bab Al-Khaleej (Bahrain) & Back for Brand LLC (USA).
 * 
 * Provides rich, authoritative, prevalent information in 6 locales:
 * Arabic, Urdu, English, Bengali, Filipino, and Marwari/Hindi.
 */

export interface KnowledgeResponse {
  reply: string;
  category: 'cr_setup' | 'investor_visa' | 'pricing' | 'timeline' | 'banking_tax' | 'geo_aeo' | 'general';
  suggestedAction?: 'BOOK_CALL' | 'WHATSAPP' | 'DOWNLOAD_BLUEPRINT';
}

export function querySalesAgentKnowledge(
  query: string,
  locale: string = 'en'
): KnowledgeResponse {
  const q = query.toLowerCase().trim();
  const lang = locale.toLowerCase().slice(0, 2);

  // Intent classification
  const isPricing = /(cost|price|fees|fee|charges|bhd|usd|dinar|how much|كم|تكلفة|رسوم|خرچہ|قیمت|খরচ|মূল্য|magkano|presyo|खर्च|लागत|भाव)/i.test(q);
  const isVisa = /(visa|residency|cpr|golden visa|family|dependents|sponsor|تأشيرة|اقامة|إقامة|فيزا|ویزا|ریزیڈنسی|ভিসা|রেসিডেন্সি|পাসপোর্ট|visas|paninirahan|वीजा|रेजिडेंसी)/i.test(q);
  const isCR = /(cr|sijilat|commercial registration|company|formation|incorporation|foreign ownership|100%|wll|spc|branch|سجل|سجلات|تأسيس|شركة|تملك|کمپنی|رجسٹریشن|ملکیت|কোম্পানি|রেজিস্ট্রেশন|kumpanya|negosyo|फर्म|दुकान|मालिकी)/i.test(q);
  const isTimeline = /(timeline|time|how long|days|weeks|duration|وقت|مدة|کم وقت|کتنا وقت|সময়|কতদিন|gaano katagal|panahon|टेम|समय)/i.test(q);
  const isBanking = /(bank|banking|account|tax|taxes|vat|repatriation|بنك|حساب|ضرائب|بینک|ٹیکس|ট্যাক্স|ব্যাংক|bangko|buwis|बैंक|टैक्स|खाता)/i.test(q);
  const isGeoAeo = /(geo|aeo|seo|marketing|ai|perplexity|chatgpt|search|digital|ماركتنج|تسويق|اے آئی|مارکیٹنگ|এআই|মার্কেটিং|negosyo sa ai|एआई|प्रचार)/i.test(q);

  // 1. ARABIC (طارق الهاشمي - Tariq Al-Hashemi)
  if (lang === 'ar' || (/[\u0600-\u06FF]/.test(query) && !/ہے|کیا|ہیں|آپ|کر|والا/.test(query))) {
    if (isPricing) {
      return {
        category: 'pricing',
        suggestedAction: 'BOOK_CALL',
        reply: `أهلاً بك! إليك تفاصيل تكاليف تأسيس الشركات وتأشيرات المستثمرين في البحرين بكل شفافية:
1. تأسيس السجل التجاري (CR): يبدأ من 280 دينار بحريني للشركات الفردية و350 دينار لشركات ذات مسؤولية محدودة (W.L.L.)، شاملاً الموافقات والتوثيق عبر سجلات.
2. باقة تأشيرة وإقامة المستثمر: 450 دينار بحريني، وتتضمن الفحص الطبي، التخليص الأمني الحكومي، وإصدار بطاقة الهوية السكانية الذكية (CPR).
3. العنوان المكتبي وحاضنات الأعمال: 180 دينار سنوياً للمكاتب المعتمدة.
نوفر خصماً فورياً بنسبة 10% عند تأكيد حجز الاستشارة المباشرة اليوم عبر الرابط https://ghaziwazir.com/book أو التواصل مباشرة مع غازي وزير عبر الواتساب على +973 3562 8353.`
      };
    }
    if (isVisa) {
      return {
        category: 'investor_visa',
        suggestedAction: 'WHATSAPP',
        reply: `بخصوص تأشيرات وإقامات المستثمرين في مملكة البحرين:
• تمنحك إقامة مستثمر رسمية لمدة سنتين قابلة للتجديد بكفالة شخصية ذاتية استناداً إلى حصتك في السجل التجاري (CR) دون الحاجة إلى كفيل محلي.
• يحق لك فور صدور بطاقة CPR الخاصة بك كفالة عائلتك بالكامل (الزوجة والأبناء).
• نوفر أيضاً استشارات الحصول على الإقامة الذهبية (Golden Visa) لمدة 10 سنوات للمستثمرين وأصحاب الأملاك العقارية المعتمدة.
تستغرق الإجراءات الحكومية من 5 إلى 7 أيام عمل. بإمكانك التواصل معي فوراً عبر الواتساب على +973 3562 8353 لمراجعة المستندات المطلوبة.`
      };
    }
    if (isCR || isTimeline) {
      return {
        category: 'cr_setup',
        suggestedAction: 'DOWNLOAD_BLUEPRINT',
        reply: `تأسيس الشركات بنسبة تملك أجنبي 100% في البحرين يتميز بالسهولة والسرعة الفائقة:
• قانون الشركات التجارية البحريني يسمح للمستثمرين الأجانب بتملك كامل للشركة بنسبة 100% دون اشتراط شريك بحريني في أكثر من 98% من الأنشطة الاقتصادية.
• المستندات المطلوبة: نسخة جواز سفر سارية، إثبات عنوان الإقامة، وثلاثة خيارات للاسم التجاري، مع تحديد النشاط (ISIC).
• المدة الزمنية: تستغرق الموافقة المبدئية واستخراج السجل التجاري عبر بوابة سجلات (Sijilat) من 3 إلى 5 أيام عمل فقط.
• تشمل خدماتنا استخراج السجل، توفير العنوان التجاري المعتمد، وتجهيز ملف فتح الحساب البنكي التجاري. تفضل بطلب الدليل الشامل أو احجز موعدك الآن عبر https://ghaziwazir.com/book.`
      };
    }
    if (isBanking) {
      return {
        category: 'banking_tax',
        suggestedAction: 'BOOK_CALL',
        reply: `مملكة البحرين توفر بيئة ضريبية ومالية هي الأكثر تنافسية في منطقة الخليج:
• 0% ضريبة دخل شخصي و0% ضريبة شركات، مع حرية تحويل الأرباح ورأس المال بنسبة 100% إلى بلدك الأم.
• نساعدك في فتح الحساب البنكي التجاري لدى بنوك بحرينية رائدة (مثل بنك البحرين والكويت، بنك السلام، وبنك إشهار، وبنك ila الرقمي).
• اتفاقيات التجارة الحرة والربط المباشر مع السوق السعودي عبر جسر الملك فهد يمنحان شركتك وصولاً سريعاً لكافة دول مجلس التعاون الخليجي.`
      };
    }
    return {
      category: 'general',
      suggestedAction: 'WHATSAPP',
      reply: `مرحباً بك في باب الخليج وبنك الحلول التقنية باك فور براند. أنا طارق الهاشمي، مستشارك التنفيذي.
نحن متخصصون في:
1. تأسيس السجلات التجارية (CR) بتملك أجنبي 100% وإنجاز خلال 5 أيام عمل.
2. استخراج تأشيرات وإقامات المستثمرين والإقامة الذهبية.
3. التخليص الحكومي الشامل وفتح الحسابات البنكية.
4. أنظمة التسويق والذكاء الاصطناعي التوليدي (GEO & AEO).
كيف ترغب في البدء؟ يمكنك طرح سؤالك مباشرة، أو التنسيق مع الرئيس التنفيذي غازي وزير عبر الواتساب على +973 3562 8353.`
    };
  }

  // 2. URDU (عائشہ صدیقی - Ayesha Siddiqui)
  if (lang === 'ur' || /[\u0600-\u06FF]/.test(query)) {
    if (isPricing) {
      return {
        category: 'pricing',
        suggestedAction: 'BOOK_CALL',
        reply: `السلام علیکم! بحرین میں کمپنی رجسٹریشن اور انویسٹر ویزا کے شفاف اور مکمل اخراجات کی تفصیل یہ ہے:
1. کمپنی رجسٹریشن (CR): سنگل اونر (SPC/WLL) کے لیے 280 بحرینی دینار اور پارٹنرشپ فرم کے لیے 350 دینار سے شروع ہوتا ہے، جس میں تمام سرکاری وزارتوں کے اندراج شامل ہیں۔
2. انویسٹر ریزیڈنسی ویزا پیکج: کل 450 بحرینی دینار، جس میں میڈیکل فٹنس، سیکیورٹی کلیرنس، اور بائیومیٹرک اسمارٹ CPR شناختی کارڈ کی فیس شامل ہے۔
3. سالانہ رجسٹرڈ آفس ایڈریس: 180 دینار سالانہ۔
آج ویڈیو کال کے ذریعے بکنگ پر آپ کو 10 فیصد ڈسکاؤنٹ کی سہولت حاصل ہے۔ آپ غازی وزیر صاحب سے فوری واٹس ایپ پر +973 3562 8353 پر رابطہ کر سکتے ہیں یا https://ghaziwazir.com/book پر سیشن بک کر سکتے ہیں۔`
      };
    }
    if (isVisa) {
      return {
        category: 'investor_visa',
        suggestedAction: 'WHATSAPP',
        reply: `بحرین انویسٹر ریزیڈنسی ویزا کے حوالے سے اہم معلومات:
• انویسٹر ویزا کمپنی کے قانونی حصص کی بنیاد پر 2 سال کے لیے ملتا ہے، جو باقاعدہ قابلِ تجدید ہوتا ہے۔ اس کے لیے کسی مقامی بحرینی کفیل کی ضرورت نہیں ہوتی۔
• کمپنی بننے اور آپ کا سی پی آر کارڈ جاری ہونے کے بعد آپ اپنے شریک حیات اور بچوں کو بطور فیملی اسپانسر کر سکتے ہیں۔
• پراپرٹی ہولڈرز اور سرمایہ کاروں کے لیے 10 سالہ بحرین گولڈن ویزا کا آپشن بھی میسر ہے۔
پورا پراسیس عموماً 5 سے 7 کاروباری دنوں میں مکمل ہو جاتا ہے۔ دستاویزات چیک کروانے کے لیے واٹس ایپ پر +973 3562 8353 پر میسج فرمائیں۔`
      };
    }
    if (isCR || isTimeline) {
      return {
        category: 'cr_setup',
        suggestedAction: 'DOWNLOAD_BLUEPRINT',
        reply: `بحرین میں 100 فیصد قانونی ملکیت کے ساتھ کمپنی رجسٹریشن (CR) کا طریقہ کار:
• پاکستانی اور دیگر غیر ملکی شہری 98 فیصد سے زائد تجارتی سرگرمیوں میں 100% کے مالک بن سکتے ہیں۔
• ضروری دستاویزات: پاسپورٹ کی کاپی، رہائشی ایڈریس کا ثبوت، کمپنی کے 3 مجوزہ نام، اور سرگرمی کی تفصیل۔
• وقت کی مدت: سجلات پورٹل کے ذریعے ابتدائی منظوری اور سی آر کا اجرا صرف 3 سے 5 کام کے دنوں میں ہو جاتا ہے۔
• ہماری ٹیم لائسنس کی تکمیل کے ساتھ ساتھ بزنس بینک اکاؤنٹ کھولنے میں بھی مکمل مدد فراہم کرتی ہے۔ آپ مفت پی ڈی ایف گائیڈ حاصل کر سکتے ہیں یا فوری میٹنگ شیڈول کر سکتے ہیں۔`
      };
    }
    return {
      category: 'general',
      suggestedAction: 'WHATSAPP',
      reply: `السلام علیکم! میں عائشہ صدیقی ہوں، باب الخلیج اور بیک فار برانڈ سے۔
ہم آپ کو بحرین میں 100% ملکیت کے ساتھ نئی کمپنی کے قانونی لائسنس (CR)، انویسٹر و فیملی ریزیڈنسی ویزا، اور گلوبل اے آئی مارکیٹنگ کی جامع سہولیات فراہم کرتے ہیں۔
آپ غازی وزیر صاحب سے براہ راست واٹس ایپ پر +973 3562 8353 پر رابطہ کر سکتے ہیں یا ہمارے ساتھ ویڈیو کال پر تفصیلات طے کر سکتے ہیں۔ آپ کا کیا سوال ہے؟`
    };
  }

  // 3. BENGALI (কবির চৌধুরী - Kabir Chowdhury)
  if (lang === 'bn' || /[\u0980-\u09FF]/.test(query)) {
    if (isPricing || isVisa || isCR) {
      return {
        category: 'cr_setup',
        suggestedAction: 'BOOK_CALL',
        reply: `নমস্কার! বাহরাইনে ১০০% বিদেশি মালিকানায় কোম্পানি গঠন (CR) এবং ইনভেস্টর রেসিডেন্সি ভিসার সম্পূর্ণ বিবরণ:
১. কমার্শিয়াল রেজিস্ট্রেশন (CR): মাত্র ২৮০ থেকে ৩৫০ বাহরাইনি দিনার (BHD) থেকে শুরু, যার মাধ্যমে কোনো স্থানীয় স্পনসর ছাড়াই ১০০% সম্পূর্ণ মালিকানা পাওয়া যায়।
২. ইনভেস্টর রেসিডেন্সি ভিসা: প্যাকেজ খরচ ৪৫০ বাহরাইনি দিনার (মেডিকেল, সিকিউরিটি ক্লিয়ারেন্স ও স্মার্ট CPR কার্ড অন্তর্ভুক্ত)। এটি ২ বছরের জন্য নবায়নযোগ্য সেলফ-স্পন্সরড ভিসা।
৩. প্রয়োজনীয় কাগজপত্র: বৈধ পাসপোর্ট কপি, বর্তমান ঠিকানার প্রমাণ এবং প্রস্তাবিত কোম্পানির নাম।
৪. সময়সীমা: মাত্র ৫ থেকে ৭ কার্যদিবসের মধ্যে সম্পূর্ণ প্রক্রিয়া সম্পন্ন হয়।
আপনি সরাসরি সিইও গাজী ওয়াজিরের সাথে হোয়াটসঅ্যাপে (+973 3562 8353) যোগাযোগ করতে পারেন অথবা https://ghaziwazir.com/book লিঙ্কে গিয়ে ফ্রি কনসালটেশন শিডিউল করতে পারেন।`
      };
    }
    return {
      category: 'general',
      suggestedAction: 'WHATSAPP',
      reply: `নমস্কার! আমি কবির চৌধুরী, বাব আল-খালিজ ও ব্যাক ফর ব্র্যান্ড-এর কর্পোরেট পরামর্শক। বাহরাইনে নতুন কোম্পানি শুরু, ১০০% বিদেশি মালিকানাধীন সিআর (CR), ইনভেস্টর ভিসা ও ব্যাংক অ্যাকাউন্ট খোলার জন্য আমি আপনাকে সার্বিক সহায়তা করতে প্রস্তুত। বিস্তারিত জানতে হোয়াটসঅ্যাপে সরাসরি +973 3562 8353 নম্বরে মেসেজ দিন।`
    };
  }

  // 4. FILIPINO / TAGALOG (Danica Santos)
  if (lang === 'fil' || lang === 'tl' || /\b(kumusta|salamat|po|kumpanya|negosyo|magkano|paano)\b/i.test(query)) {
    if (isPricing || isVisa || isCR) {
      return {
        category: 'cr_setup',
        suggestedAction: 'BOOK_CALL',
        reply: `Mabuhay at kumusta! Narito ang kumpletong detalye para sa pagtatayo ng kumpanya at Investor Visa sa Bahrain:
1. Commercial Registration (CR): 100% Foreign Ownership nang walang kinakailangang lokal na Bahraini partner. Nagsisimula sa 280 hanggang 350 BHD ang statutory setup.
2. 2-Year Investor Residency Visa: 450 BHD package kasama na ang medical clearance, security approval, at CPR smart card identity. Pwede ka ring mag-sponsor ng asawa at mga anak.
3. Timeline: 5 hanggang 7 business days lamang ang buong proseso ng pagkuha ng CR at visa.
4. Tax Advantage: 0% corporate tax at 0% personal income tax na may 100% free capital repatriation.
Maaari kang makipag-ugnayan agad kay CEO Ghazi Wazir sa WhatsApp sa +973 3562 8353 o mag-book ng discovery session sa https://ghaziwazir.com/book.`
      };
    }
    return {
      category: 'general',
      suggestedAction: 'WHATSAPP',
      reply: `Kumusta! Ako si Danica Santos mula sa Bab Al-Khaleej at Back for Brand LLC. Matutulungan ka namin sa 100% foreign-owned company setup sa Bahrain, Investor Visa processing, at corporate bank accounts. Mag-message lang sa WhatsApp sa +973 3562 8353 para sa mabilisang tulong!`
    };
  }

  // 5. MARWARI / HINDI (राजेश अग्रवाल - Rajesh Agarwal)
  if (lang === 'mwr' || lang === 'hi' || /\b(खम्मा|घणी|राम|व्यापार|दुकान|मालिकी|धंधो|सा|हुकम)\b/i.test(query)) {
    if (isPricing || isVisa || isCR) {
      return {
        category: 'cr_setup',
        suggestedAction: 'BOOK_CALL',
        reply: `खम्मा घणी सा! बहरीन में व्यापार री नई फर्म और इन्वेस्टर रेजिडेंसी बाबत पूरी जानकारी हुकम:
१. 100% मालिकाना हक री कंपनी (CR): 280 सूं 350 बहरीनी दीनार (BHD) सूं शुरू होवे सा। बहरीन में कोई भी लोकल पार्टनर या हिस्सेदार री जरूरत कोनी, पूरो 100% मालिकाना हक आपरो ही रेवेला।
२. 2 साल रो इन्वेस्टर रेजिडेंसी वीजा: पूरो खर्च 450 BHD है, जिमें मेडिकल, सरकारी सुरक्षा मंजूरी अर स्मार्ट CPR कार्ड सब शामिल है। आप आपरे परिवार ने भी वीजा स्पॉन्सर कर सको सा।
३. समय: पूरा काम 5 सूं 7 काम का दिनां में पूरो हो जावे सा।
४. 0% टैक्स: बहरीन में कोई इनकम टैक्स या कॉर्पोरेट टैक्स कोनी लागे सा।
आप सीधा बाब अल-खलीज रा सीईओ गाजी वजीर सा'ब सूं व्हाट्सएप +973 3562 8353 पर बात कर सको हो या https://ghaziwazir.com/book पर मीटिंग तय कर सको सा।`
      };
    }
    return {
      category: 'general',
      suggestedAction: 'WHATSAPP',
      reply: `खम्मा घणी सा! प्रणाम। मैं राजेश अग्रवाल, बाब अल-खलीज और बैक फॉर ब्रांड सूं। बहरीन में 100% मालिकाना हक री फर्म रजिस्ट्रेशन (CR), इन्वेस्टर वीजा और बैंक खाता खुलवाने खातिर आपरी पूरी सेवा में हाजिर हूं सा। व्हाट्सएप +973 3562 8353 पर संपर्क करो सा!`
    };
  }

  // 6. ENGLISH (Sarah Vance - Default)
  if (isPricing) {
    return {
      category: 'pricing',
      suggestedAction: 'BOOK_CALL',
      reply: `Here is our transparent corporate formation & residency pricing for Bahrain:
1. Commercial Registration (CR): 280 BHD for Single Person W.L.L. and 350 BHD for multi-partner W.L.L. entities, including statutory Sijilat filings and MOIC activity clearances.
2. 2-Year Investor Visa Package: 450 BHD all-inclusive (covers Ministry security approvals, medical fitness examination, biometric enrollment, and physical CPR smart card issuance).
3. Registered Commercial Office / Business Incubator: 180 BHD per year.
4. Back for Brand AI Growth & GEO Foundation: 450 BHD ($1,500 USD).
We offer a 10% instant discovery discount for sessions scheduled today. You can lock your slot at https://ghaziwazir.com/book or message CEO Ghazi Wazir directly on WhatsApp at +973 3562 8353.`
    };
  }

  if (isVisa) {
    return {
      category: 'investor_visa',
      suggestedAction: 'WHATSAPP',
      reply: `Bahrain Investor Visas & Golden Residency Breakdown:
• Self-Sponsored Investor Visa: Issued for 2 years renewable based directly on your equity shareholding in your Commercial Registration (CR). No local Bahraini sponsor or LMRA employer quota is required.
• Family Sponsorship Rights: Upon issuance of your CPR smart card, you hold full legal entitlement to sponsor your spouse, dependent children, and parents under family residency permits.
• Golden Residency (10-Year Visa): Available for entrepreneurs and property investors holding qualifying real estate valued at 200,000 BHD or verifiable monthly income above 2,000 BHD.
Processing duration is 5 to 7 business days. Contact Ghazi Wazir on WhatsApp at +973 3562 8353 to submit your passport copies for immediate pre-clearance.`
    };
  }

  if (isCR || isTimeline) {
    return {
      category: 'cr_setup',
      suggestedAction: 'DOWNLOAD_BLUEPRINT',
      reply: `100% Foreign Ownership Company Formation in Bahrain (Sijilat CR):
• Legal Foundation: Under Legislative Decree No. 28 of 2020, foreign nationals and international corporations enjoy 100% statutory equity ownership without requiring a local Bahraini partner in over 98% of commercial activities (ISIC Rev. 4).
• Statutory Requirements: Valid passport copies of all shareholders, proof of residential address, 3 proposed company trade names, and activity selection.
• Approvals & Timeline: Standard Ministry of Industry & Commerce (MOIC) Sijilat clearance takes 3 to 5 business days.
• Complete Turnkey Delivery: We handle name reservation, statutory document drafting, commercial address provision, and bank introduction. Generate our official PDF Requirements Brief or schedule a consultation at https://ghaziwazir.com/book.`
    };
  }

  if (isBanking) {
    return {
      category: 'banking_tax',
      suggestedAction: 'BOOK_CALL',
      reply: `Bahrain Fiscal Environment & Corporate Banking:
• 0% Personal Income Tax & 0% Corporate Income Tax (outside upstream oil and gas extraction), with zero capital gains tax and 100% unrestricted repatriation of capital and dividends.
• Corporate Banking Facilitation: We assist with pre-screened account openings at premier institutions including BBK, National Bank of Bahrain (NBB), Al Salam Bank, Ahli United Bank, and digital banks like ila Bank.
• Strategic Access: Bahrain offers direct duty-free overland access to Saudi Arabia and the 400-billion GCC commercial marketplace via the King Fahd Causeway.`
    };
  }

  if (isGeoAeo) {
    return {
      category: 'geo_aeo',
      suggestedAction: 'BOOK_CALL',
      reply: `Back for Brand LLC - Generative Engine Optimization (GEO) & AEO:
• Beyond SEO: Over 45% of high-intent B2B inquiries now terminate in AI answer engines (ChatGPT Search, Perplexity AI, Google Gemini Overviews) rather than 10 blue links.
• Our Architecture: We engineer semantic entity knowledge graphs, authoritative citation networks, and autonomous sales agent pipelines that ensure your brand is cited and recommended as the primary solution.
• Proven ROI: Decreases customer acquisition cost by up to 60% with 24/7 multilingual sales qualification. Schedule an architecture review at https://ghaziwazir.com/book.`
    };
  }

  // General fallback with thorough information
  return {
    category: 'general',
    suggestedAction: 'WHATSAPP',
    reply: `Welcome to Bab Al-Khaleej & Back for Brand LLC. I am Sarah Vance, VP of Global Expansion.
We provide end-to-end statutory execution:
1. 100% Foreign-Owned Bahrain Commercial Registrations (CR) completed in 5 business days.
2. Self-sponsored 2-Year Investor Residency Visas and Bahrain Golden Visas (450 BHD package).
3. Ministry document clearance, commercial addresses, and corporate banking setup.
4. Generative Engine Optimization (GEO) and 24/7 autonomous sales agents.
How can I assist your business today? Feel free to ask a specific question, or connect directly with CEO Ghazi Wazir on WhatsApp at +973 3562 8353.`
  };
}
