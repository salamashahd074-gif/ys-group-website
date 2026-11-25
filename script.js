"use strict";

const WHATSAPP_NUMBER = "201550702254";
const PAYMENT_LINKS = { paymob: "", kashier: "", fawry: "" };
const ANALYTICS = { ga4Id: "", metaPixelId: "" };
const SUPABASE_CONFIG = window.YS_SUPABASE_CONFIG || { url: "", anonKey: "" };

const PRODUCTS = [
  {
    id: "counter-basic",
    category: "counter",
    name: { ar: "ماكينة عدّ نقود", en: "Money Counter" },
    description: { ar: "حل لعدّ الأوراق النقدية — الاسم والمواصفات النهائية قيد الإضافة.", en: "A banknote counting solution — final model name and specifications to be added." },
    image: "images/money-counter-transparent.png",
    imageAlt: { ar: "ماكينة عدّ نقود", en: "Money counting machine" },
    specs: { speed: "[SPEC]", detection: "[SPEC]", currency: "[SPEC]", size: "[SPEC]", weight: "[SPEC]" }
  },
  {
    id: "counter-advanced",
    category: "counter",
    name: { ar: "ماكينة عدّ وفحص", en: "Counting & Detection Machine" },
    description: { ar: "ماكينة لفحص وعدّ النقد — تُحدّث البيانات عند اعتماد الموديل.", en: "Cash counting and detection — update details when the model is confirmed." },
    image: "images/money-counter-transparent.png",
    imageAlt: { ar: "ماكينة عدّ نقود", en: "Money counting machine" },
    specs: { speed: "[SPEC]", detection: "[SPEC]", currency: "[SPEC]", size: "[SPEC]", weight: "[SPEC]" }
  },
  {
    id: "safe-business",
    category: "safe",
    name: { ar: "خزنة للأعمال", en: "Business Safe" },
    description: { ar: "مساحة تخزين آمنة — صورة ومواصفات الموديل الفعلي تُضاف لاحقًا.", en: "Secure storage — actual product photography and model specifications to be added." },
    image: "",
    imageAlt: { ar: "رسم توضيحي لخزنة، وليس صورة موديل فعلي", en: "Illustration of a safe, not a photograph of a real model" },
    specs: { speed: "[SPEC]", detection: "[SPEC]", currency: "[SPEC]", size: "[SPEC]", weight: "[SPEC]" }
  },
  {
    id: "safe-electronic",
    category: "safe",
    name: { ar: "خزنة إلكترونية", en: "Electronic Safe" },
    description: { ar: "خزنة إلكترونية — المواصفات والصور الفعلية ستُضاف بعد تأكيد المنتج.", en: "Electronic safe — add confirmed specifications and real product imagery before publishing." },
    image: "",
    imageAlt: { ar: "رسم توضيحي لخزنة، وليس صورة موديل فعلي", en: "Illustration of a safe, not a photograph of a real model" },
    specs: { speed: "[SPEC]", detection: "[SPEC]", currency: "[SPEC]", size: "[SPEC]", weight: "[SPEC]" }
  },
  {
    id: "accessory-placeholder",
    category: "accessory",
    name: { ar: "إكسسوارات", en: "Accessories" },
    description: { ar: "أضف اسم الإكسسوار ومواصفاته وصورته الفعلية قبل عرض المنتج.", en: "Add the accessory name, specifications, and real product image before listing." },
    image: "",
    imageAlt: { ar: "عنصر توضيحي للإكسسوارات", en: "Decorative placeholder for accessories" },
    specs: { speed: "[SPEC]", detection: "[SPEC]", currency: "[SPEC]", size: "[SPEC]", weight: "[SPEC]" }
  }
];

const TRANSLATIONS = {
  ar: {
    tagline: "حلول النقد والأمان", navProducts: "المنتجات", navWhy: "لماذا نحن", navPayment: "الدفع", navAbout: "من نحن", navContact: "تواصل معنا", headerCta: "اطلب عرض سعر",
    heroEyebrow: "YS GROUP — ثقة في كل تفصيلة", heroTitle: "حلول عملية", heroEmphasis: "للنقد والأمان", heroText: "خزائن وماكينات عدّ النقود وخدمات صيانة تساعد أعمالك على العمل بثقة ووضوح.", heroQuote: "اطلب عرض سعر عبر واتساب", heroProducts: "استكشف المنتجات", heroMetaOne: "خزائن للأعمال", heroMetaTwo: "إدارة نقدية موثوقة", counterPlaceholder: "صورة ماكينة عدّ النقود", visualCaption: "معدات إدارة النقد",
    stripOne: "خزائن أمان", stripTwo: "ماكينات عدّ النقود", stripThree: "صيانة ودعم", stripFour: "حلول للأعمال", productsKicker: "اختيارات مدروسة", productsTitle: "منتجات لعملك", productsIntro: "استكشف الفئات المتاحة، واطلب المواصفات والسعر من فريقنا مباشرة.", filterAll: "الكل", filterCounters: "ماكينات عدّ النقود", filterSafes: "الخزائن", filterAccessories: "إكسسوارات",
    filterGroupAll: "كل المنتجات", categoryCounter: "ماكينات عدّ النقود", categorySafe: "خزائن", categoryAccessory: "إكسسوارات", productPlaceholder: "صورة توضيحية للمنتج", designedPlaceholder: "رسم توضيحي — ليس صورة موديل فعلي", askPrice: "اسأل عن السعر", buyNow: "اشترِ / ادفع الآن", details: "التفاصيل", specsTitle: "المواصفات", specSpeed: "سرعة العدّ", specDetection: "كشف التزوير", specCurrency: "العملات المدعومة", specSize: "الأبعاد", specWeight: "الوزن", productPriceNote: "السعر عند الطلب",
    compareKicker: "قارن قبل الاختيار", compareTitle: "مقارنة سريعة", compareIntro: "اختر منتجين لمقارنة المواصفات المتاحة. القيم المعروضة عناصر نائبة إلى حين اعتماد بيانات الموديلات.", compareProductOne: "المنتج الأول", compareProductTwo: "المنتج الثاني", specLabel: "المواصفة",
    whyKicker: "شريك يعتمد عليه", whyTitle: "لماذا تختار YS Group؟", whyIntro: "نهتم بأن تكون تجربة الاختيار والدعم واضحة من أول استفسار.", benefitReliability: "اختيار موثوق", benefitReliabilityText: "نساعدك في التعرف على الحل المناسب لاحتياجك الفعلي.", benefitWarranty: "ضمان واضح", benefitWarrantyText: "[شروط الضمان] — تُراجع التفاصيل مع فريق المبيعات قبل الشراء.", benefitInstallation: "تنسيق التركيب", benefitInstallationText: "استفسر عن خيارات التوصيل أو التركيب المتاحة لموقعك.", benefitSupport: "دعم ما بعد البيع", benefitSupportText: "تواصل معنا للصيانة والمساندة وفق آلية الخدمة المتاحة.",
    warrantyKicker: "خدمة ممتدة", warrantyTitle: "العناية بالمنتج تستمر", warrantyIntro: "نوضح شروط الضمان وخطوات الصيانة لكل منتج قبل إتمام الطلب.", warrantyTerms: "شروط الضمان", maintenanceProcess: "آلية الصيانة", stepsKicker: "بخطوات واضحة", stepsTitle: "كيف تطلب؟", stepsIntro: "فريقنا ينسق معك لتأكيد المنتج والتفاصيل المناسبة قبل إتمام الطلب.", stepOne: "اختر المنتج", stepOneText: "استعرض الفئات وحدد ما يناسب عملك.", stepTwo: "أرسل استفسارك", stepTwoText: "شاركنا الموديل والكمية المطلوبة.", stepThree: "أكد التفاصيل", stepThreeText: "تعرّف على السعر والتوفر وشروط الخدمة.", stepFour: "أكمل الطلب", stepFourText: "اختر وسيلة الدفع المناسبة بعد تأكيدها.",
    businessKicker: "حلول للكميات والأعمال", businessTitle: "لشركتك أو منشأتك", businessIntro: "أرسل طلب عرض سعر مخصص للشركات والبنوك والمحلات.", companyLabel: "اسم الشركة", quantityLabel: "الكمية", productLabel: "المنتج المطلوب", phoneLabel: "رقم الهاتف", sendQuote: "إرسال الطلب عبر واتساب",
    paymentKicker: "خيارات واضحة", paymentTitle: "وسائل الدفع", paymentIntro: "لا تُدخل بيانات بطاقتك في هذا الموقع. أكمل الدفع فقط عبر صفحة بوابة الدفع الآمنة.", secureNote: "تُعالج المدفوعات عبر الصفحة الآمنة لمزود بوابة الدفع.", gatewayTitle: "الدفع الإلكتروني", gatewayText: "Paymob / Kashier / Fawry — خيارات الدفع المتاحة تظهر بعد إضافة رابط رسمي.", gatewayUnavailable: "ستتوفر روابط الدفع قريبًا. تواصل معنا لإتمام الطلب.", bankTitle: "تحويل بنكي", walletTitle: "InstaPay / محفظة هاتف", copyDetails: "نسخ التفاصيل", copyNumber: "نسخ الرقم", cashTitle: "عربون أو الدفع عند الاستلام", cashText: "تواصل معنا لتأكيد إمكانية الدفع وتفاصيل الطلب قبل الإرسال.", confirmOnWhatsapp: "تأكيد عبر واتساب ↗", orderTitle: "جاهز لإرسال تفاصيل طلبك؟", orderIntro: "أرسل المنتج والكمية وطريقة الدفع المفضلة لتأكيدها مع فريقنا.", orderProduct: "المنتج", orderQuantity: "الكمية", paymentMethod: "طريقة الدفع", sendOrder: "إرسال التفاصيل", policyLabel: "سياسة الدفع:", policyText: "[PAYMENT POLICY] — يرجى التواصل معنا لمعرفة الشروط المعتمدة.",
    galleryKicker: "من المنتجات", galleryTitle: "لمحة عن المعدات", galleryIntro: "الصورة المتاحة للماكينة، ومساحات جاهزة لإضافة صور المنتجات والفيديو.", galleryCounter: "ماكينات عدّ النقود", safeGalleryPlaceholder: "صورة خزنة — تُضاف صورة المنتج الفعلية", videoPlaceholder: "مساحة لفيديو توضيحي — أضف رابط فيديو أو صورة معاينة", videoNote: "لا يوجد فيديو مضاف حاليًا", accessoryGalleryPlaceholder: "صورة إكسسوار — تُضاف صورة المنتج الفعلية", clientsKicker: "ثقة تُبنى بالوقت", clientsTitle: "عملاؤنا وتجاربهم", clientsIntro: "نشارك شعارات العملاء وآراءهم الحقيقية بعد الحصول على موافقتهم.", clientsComing: "سيُضاف محتوى العملاء والتقييمات بعد اعتماد المواد الحقيقية.",
    aboutKicker: "عن YS GROUP", aboutTitle: "حلول تخدم احتياجاتك", aboutStory: "[COMPANY STORY] — نعمل على توفير الخزائن وماكينات عدّ النقود وخدمات الصيانة.", experienceLabel: "سنوات من الخبرة", faqKicker: "معلومات مفيدة", faqTitle: "أسئلة شائعة", faqIntro: "لم تجد إجابة؟ تواصل معنا مباشرة وسنساعدك.", faqQuestionOne: "كيف أطلب سعر منتج؟", faqAnswerOne: "اختر المنتج واضغط «اسأل عن السعر» لإرسال استفسارك عبر واتساب.", faqQuestionTwo: "هل يمكن طلب كمية للشركات؟", faqAnswerTwo: "نعم، استخدم نموذج عرض سعر الشركات لتزويدنا بالمنتج والكمية وبيانات التواصل.", faqQuestionThree: "ما شروط الضمان والصيانة؟", faqAnswerThree: "تختلف التفاصيل حسب المنتج، وستُوضح لك قبل إتمام الطلب. [WARRANTY TERMS] [MAINTENANCE PROCESS]", faqQuestionFour: "كيف أتمم الدفع الإلكتروني؟", faqAnswerFour: "عند توفر رابط رسمي، أكمل الدفع على صفحة بوابة الدفع الآمنة. لا تشارك بيانات بطاقتك معنا عبر النموذج.",
    contactKicker: "نحن هنا لمساعدتك", contactTitle: "ابدأ المحادثة", contactIntro: "أرسل استفسارك وسنساعدك في معرفة الخطوة التالية.", contactPhone: "الهاتف: 01550702254", contactEmail: "البريد: [EMAIL]", contactAddress: "العنوان: [ADDRESS]", callUs: "اتصل بنا", formName: "الاسم", formPhone: "رقم الهاتف", formInterest: "المنتج محل الاهتمام", formMessage: "رسالتك", sendMessage: "إرسال عبر واتساب", mapNote: "أضف رابط تضمين Google Maps الحقيقي هنا عند توفر العنوان.", footerMessage: "حلول عملية للنقد والأمان، بخدمة تبدأ من استفسارك.", backTop: "العودة للأعلى ↑", adminLogin: "دخول المالك", privacyConsent: "أوافق على حفظ بيانات الاتصال لمتابعة هذا الطلب والتواصل معي.", cookieText: "نستخدم أدوات التحليل الاختيارية لفهم استخدام الموقع. لن تُحمّل إلا بعد موافقتك.", acceptCookies: "موافقة", rejectCookies: "لا شكرًا",
    waMissing: "واتساب غير مُعدّ بعد. يُرجى التواصل عبر بيانات الاتصال بعد إضافتها.", formThanks: "شكرًا لك. جارٍ فتح واتساب لإرسال طلبك.", requestSaved: "تم تسجيل طلبك وفتح واتساب لإرساله.", requestNotTracked: "فُتح واتساب، لكن يلزم إكمال إعداد Supabase حتى يظهر الطلب في لوحة المالك.", requestSaveFailed: "فُتح واتساب، لكن تعذّر تسجيل الطلب بلوحة المالك. يُرجى التواصل هاتفيًا للتأكد.", formInvalid: "يرجى إدخال بيانات صحيحة في الحقول المطلوبة.", copySuccess: "تم نسخ التفاصيل.", copyFailure: "تعذّر النسخ. يُرجى نسخ النص يدويًا.", paymentComing: "رابط الدفع غير متاح حاليًا. تواصل معنا عبر واتساب.", consentSaved: "تم حفظ تفضيل ملفات تعريف الارتباط.",
    compareFields: { speed: "سرعة العدّ", detection: "كشف التزوير", currency: "العملات المدعومة", size: "الأبعاد", weight: "الوزن" },
    paymentMethods: ["بوابة دفع إلكترونية", "تحويل بنكي", "InstaPay / محفظة هاتف", "عربون / الدفع عند الاستلام"],
    quoteTemplate: "مرحبًا YS Group، أود طلب عرض سعر.\nاسم الشركة: {company}\nالمنتج: {product}\nالكمية: {quantity}\nرقم الهاتف: {phone}",
    orderTemplate: "مرحبًا YS Group، أود الاستفسار عن طلب.\nالاسم: {name}\nالهاتف: {phone}\nالمنتج: {product}\nالكمية: {quantity}\nطريقة الدفع المفضلة: {payment}\nيرجى تأكيد السعر والتوفر والتفاصيل.",
    contactTemplate: "مرحبًا YS Group، لدي استفسار.\nالاسم: {name}\nرقم الهاتف: {phone}\nالمنتج: {product}\nالرسالة: {message}"
  },
  en: {
    tagline: "Cash & Security Solutions", navProducts: "Products", navWhy: "Why Us", navPayment: "Payment", navAbout: "About", navContact: "Contact", headerCta: "Request a Quote",
    heroEyebrow: "YS GROUP — TRUST IN EVERY DETAIL", heroTitle: "Practical solutions", heroEmphasis: "for cash & security", heroText: "Safes, money counters and maintenance support to help your business work with confidence and clarity.", heroQuote: "Request a WhatsApp quote", heroProducts: "Explore products", heroMetaOne: "Safes for business", heroMetaTwo: "Trusted cash management", counterPlaceholder: "Money counter image", visualCaption: "Cash management equipment",
    stripOne: "Security safes", stripTwo: "Money counters", stripThree: "Maintenance & support", stripFour: "Business solutions", productsKicker: "Considered choices", productsTitle: "Products for your business", productsIntro: "Explore available categories and ask our team directly for model details and pricing.", filterAll: "All", filterCounters: "Money counters", filterSafes: "Safes", filterAccessories: "Accessories",
    filterGroupAll: "All products", categoryCounter: "Money counters", categorySafe: "Safes", categoryAccessory: "Accessories", productPlaceholder: "Illustrative product image", designedPlaceholder: "Illustration — not a photo of a real model", askPrice: "Ask for price", buyNow: "Buy / Pay Now", details: "Details", specsTitle: "Specifications", specSpeed: "Counting speed", specDetection: "Counterfeit detection", specCurrency: "Supported currencies", specSize: "Dimensions", specWeight: "Weight", productPriceNote: "Price on request",
    compareKicker: "Compare before choosing", compareTitle: "Quick comparison", compareIntro: "Choose two products to compare. Values remain placeholders until model details are confirmed.", compareProductOne: "First product", compareProductTwo: "Second product", specLabel: "Specification",
    whyKicker: "A partner you can rely on", whyTitle: "Why choose YS Group?", whyIntro: "We aim to make the selection and support experience clear from your first enquiry.", benefitReliability: "Reliable selection", benefitReliabilityText: "We help you identify a solution that fits your actual needs.", benefitWarranty: "Clear warranty", benefitWarrantyText: "[WARRANTY TERMS] — Confirm details with our sales team before purchase.", benefitInstallation: "Installation coordination", benefitInstallationText: "Ask about delivery or installation options available for your location.", benefitSupport: "After-sales support", benefitSupportText: "Contact us for maintenance and assistance under the available service process.",
    warrantyKicker: "Ongoing care", warrantyTitle: "Product care continues", warrantyIntro: "Warranty terms and maintenance steps are clarified for each product before an order is completed.", warrantyTerms: "Warranty terms", maintenanceProcess: "Maintenance process", stepsKicker: "A clear process", stepsTitle: "How to order", stepsIntro: "Our team coordinates with you to confirm the product and details before the order is placed.", stepOne: "Choose a product", stepOneText: "Browse the categories and find what suits your business.", stepTwo: "Send an enquiry", stepTwoText: "Share the model and quantity you need.", stepThree: "Confirm the details", stepThreeText: "Check pricing, availability and service terms.", stepFour: "Complete your order", stepFourText: "Choose a payment option once confirmed.",
    businessKicker: "Bulk & business solutions", businessTitle: "For your business", businessIntro: "Request a dedicated quote for companies, banks and shops.", companyLabel: "Company name", quantityLabel: "Quantity", productLabel: "Product required", phoneLabel: "Phone number", sendQuote: "Send request on WhatsApp",
    paymentKicker: "Clear options", paymentTitle: "Payment methods", paymentIntro: "Do not enter card details on this website. Complete payment only on the payment gateway's secure page.", secureNote: "Payments are processed on the gateway's secure page.", gatewayTitle: "Online payment", gatewayText: "Paymob / Kashier / Fawry — options appear when official payment links are configured.", gatewayUnavailable: "Payment links will be available soon. Contact us to complete your order.", bankTitle: "Bank transfer", walletTitle: "InstaPay / mobile wallet", copyDetails: "Copy details", copyNumber: "Copy number", cashTitle: "Deposit or cash on delivery", cashText: "Contact us to confirm payment availability and order details before sending.", confirmOnWhatsapp: "Confirm on WhatsApp ↗", orderTitle: "Ready to send your order details?", orderIntro: "Share the product, quantity and preferred payment method for confirmation with our team.", orderProduct: "Product", orderQuantity: "Quantity", paymentMethod: "Payment method", sendOrder: "Send order details", policyLabel: "Payment policy:", policyText: "[PAYMENT POLICY] — Contact us for the current terms.",
    galleryKicker: "Product gallery", galleryTitle: "A look at the equipment", galleryIntro: "The available machine photo, with space to add more product photos and a video.", galleryCounter: "Money counting machines", safeGalleryPlaceholder: "Safe image — add an actual product photo", videoPlaceholder: "Product demo video — add a video URL or poster image", videoNote: "No video added yet", accessoryGalleryPlaceholder: "Accessory image — add an actual product photo", clientsKicker: "Trust takes time", clientsTitle: "Clients & testimonials", clientsIntro: "Client logos and genuine reviews will be shared with permission.", clientsComing: "Client information and testimonials will appear once real materials are approved.",
    aboutKicker: "About YS GROUP", aboutTitle: "Solutions for your needs", aboutStory: "[COMPANY STORY] — We provide safes, money counters and maintenance services.", experienceLabel: "years of experience", faqKicker: "Useful information", faqTitle: "Frequently asked questions", faqIntro: "Didn't find an answer? Contact us directly and we'll help.", faqQuestionOne: "How do I request a product price?", faqAnswerOne: "Choose a product and select “Ask for price” to send an enquiry on WhatsApp.", faqQuestionTwo: "Can businesses request bulk quantities?", faqAnswerTwo: "Yes. Use the business quote form to share the product, quantity and contact details.", faqQuestionThree: "What are the warranty and maintenance terms?", faqAnswerThree: "Details vary by product and will be shared before your order is completed. [WARRANTY TERMS] [MAINTENANCE PROCESS]", faqQuestionFour: "How do I complete an online payment?", faqAnswerFour: "When an official link is available, pay on the gateway's secure page. Do not send card details through our form.",
    contactKicker: "We're here to help", contactTitle: "Start a conversation", contactIntro: "Send an enquiry and we'll help you with the next step.", contactPhone: "Phone: 01550702254", contactEmail: "Email: [EMAIL]", contactAddress: "Address: [ADDRESS]", callUs: "Call us", formName: "Name", formPhone: "Phone number", formInterest: "Product interest", formMessage: "Message", sendMessage: "Send on WhatsApp", mapNote: "Add the real Google Maps embed link here when the address is confirmed.", footerMessage: "Practical cash and security solutions, with service that starts with your enquiry.", backTop: "Back to top ↑", adminLogin: "Owner login", privacyConsent: "I agree to storing my contact details so YS Group can follow up on this request.", cookieText: "Optional analytics help us understand site usage. They load only after you consent.", acceptCookies: "Accept", rejectCookies: "No thanks",
    waMissing: "WhatsApp is not configured yet. Please use the contact details after they are added.", formThanks: "Thank you. Opening WhatsApp to send your enquiry.", requestSaved: "Your request was recorded. WhatsApp is opening to send it.", requestNotTracked: "WhatsApp opened, but Supabase setup is required before requests appear in the owner dashboard.", requestSaveFailed: "WhatsApp opened, but the request could not be recorded in the owner dashboard. Please call to confirm.", formInvalid: "Please enter valid information in the required fields.", copySuccess: "Details copied.", copyFailure: "Could not copy. Please copy the text manually.", paymentComing: "The payment link is not available yet. Contact us on WhatsApp.", consentSaved: "Cookie preference saved.",
    compareFields: { speed: "Counting speed", detection: "Counterfeit detection", currency: "Supported currencies", size: "Dimensions", weight: "Weight" },
    paymentMethods: ["Online payment gateway", "Bank transfer", "InstaPay / mobile wallet", "Deposit / cash on delivery"],
    quoteTemplate: "Hello YS Group, I would like to request a quote.\nCompany: {company}\nProduct: {product}\nQuantity: {quantity}\nPhone: {phone}",
    orderTemplate: "Hello YS Group, I would like to enquire about an order.\nName: {name}\nPhone: {phone}\nProduct: {product}\nQuantity: {quantity}\nPreferred payment method: {payment}\nPlease confirm pricing, availability and details.",
    contactTemplate: "Hello YS Group, I have an enquiry.\nName: {name}\nPhone: {phone}\nProduct: {product}\nMessage: {message}"
  }
};

const SPEC_KEYS = ["speed", "detection", "currency", "size", "weight"];
let currentLanguage = "ar";
let activeProduct = PRODUCTS[0];
let selectedFilter = "all";
let modalPreviousFocus = null;
let toastTimer = 0;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const languageStoreKey = "ys-group-language";
const consentStoreKey = "ys-group-analytics-consent";
const watchedImages = new WeakSet();

function text(key) {
  return TRANSLATIONS[currentLanguage][key] || key;
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function translatedProduct(product, property) {
  return product[property][currentLanguage];
}

function categoryName(category) {
  const key = category === "counter" ? "categoryCounter" : category === "safe" ? "categorySafe" : "categoryAccessory";
  return text(key);
}

function toast(message) {
  const element = document.getElementById("toastMessage");
  element.textContent = message;
  element.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => element.classList.remove("is-visible"), 3200);
}

function trackEvent(eventName, details) {
  const payload = Object.assign({ event_category: "engagement" }, details || {});
  if (typeof window.gtag === "function") window.gtag("event", eventName, payload);
  if (typeof window.fbq === "function") window.fbq("trackCustom", eventName, payload);
  document.dispatchEvent(new CustomEvent("ys:analytics", { detail: { eventName, details: payload } }));
}

function whatsappUrl(message) {
  if (!WHATSAPP_NUMBER) {
    toast(text("waMissing"));
    return "";
  }
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function openWhatsApp(message, eventName, details) {
  const url = whatsappUrl(message);
  if (!url) return false;
  trackEvent(eventName || "whatsapp_click", details);
  window.open(url, "_blank", "noopener,noreferrer");
  return true;
}

function renderProductCard(product) {
  const name = translatedProduct(product, "name");
  const description = translatedProduct(product, "description");
  const alt = translatedProduct(product, "imageAlt");
  const artwork = product.image
    ? `<div class="image-fallback">${escapeHTML(text("productPlaceholder"))}</div><img src="${escapeHTML(product.image)}" alt="${escapeHTML(alt)}" width="600" height="420" loading="lazy">`
    : `${product.category === "safe" ? `<div class="safe-drawing" role="img" aria-label="${escapeHTML(alt)}"><span></span></div>` : `<div class="accessory-illustration" role="img" aria-label="${escapeHTML(alt)}">YS</div>`}<span class="placeholder-label">${escapeHTML(text("designedPlaceholder"))}</span>`;
  const specs = SPEC_KEYS.map((key) => `<li>${escapeHTML(text(`spec${key[0].toUpperCase()}${key.slice(1)}`))}: <strong>${escapeHTML(product.specs[key])}</strong></li>`).join("");
  return `<article class="product-card" data-product-id="${escapeHTML(product.id)}">
    <div class="product-art ${product.category === "safe" ? "safe-art" : ""}">
      <span class="category-label">${escapeHTML(categoryName(product.category))}</span>${artwork}
    </div>
    <div class="product-content">
      <h3>${escapeHTML(name)}</h3><p>${escapeHTML(description)}</p>
      <ul class="spec-list">${specs}</ul>
      <p class="product-price-note">${escapeHTML(text("productPriceNote"))}</p>
      <div class="product-actions">
        <button class="button button-outline" type="button" data-action="details" data-product-id="${escapeHTML(product.id)}">${escapeHTML(text("details"))}</button>
        <button class="button button-gold" type="button" data-action="ask" data-product-id="${escapeHTML(product.id)}">${escapeHTML(text("askPrice"))}</button>
        <button class="button button-outline" type="button" data-action="buy" data-product-id="${escapeHTML(product.id)}">${escapeHTML(text("buyNow"))}</button>
      </div>
    </div>
  </article>`;
}

function renderProducts() {
  document.getElementById("productGrid").innerHTML = PRODUCTS.map(renderProductCard).join("");
  updateProductSelects();
  updateComparison();
  updateModalContent();
  watchImages(document.getElementById("productGrid"));
  applyFilters(selectedFilter);
  setProductTilt();
}

function productOptions(select, selectedId) {
  const previous = selectedId || select.value;
  select.innerHTML = PRODUCTS.map((product) => `<option value="${escapeHTML(product.id)}">${escapeHTML(translatedProduct(product, "name"))}</option>`).join("");
  if (PRODUCTS.some((product) => product.id === previous)) select.value = previous;
}

function updateProductSelects() {
  ["compareOne", "compareTwo", "businessProduct", "orderProduct", "contactProduct"].forEach((id) => {
    const select = document.getElementById(id);
    if (select) productOptions(select);
  });
  const compareTwo = document.getElementById("compareTwo");
  if (compareTwo.value === document.getElementById("compareOne").value && PRODUCTS.length > 1) compareTwo.selectedIndex = 1;
  const paymentSelect = document.getElementById("paymentMethod");
  const previousPayment = paymentSelect.value;
  paymentSelect.innerHTML = TRANSLATIONS[currentLanguage].paymentMethods.map((method, index) => `<option value="${index}">${escapeHTML(method)}</option>`).join("");
  if (previousPayment) paymentSelect.value = previousPayment;
}

function updateComparison() {
  const one = PRODUCTS.find((product) => product.id === document.getElementById("compareOne").value) || PRODUCTS[0];
  const two = PRODUCTS.find((product) => product.id === document.getElementById("compareTwo").value) || PRODUCTS[1];
  document.getElementById("compareHeadingOne").textContent = translatedProduct(one, "name");
  document.getElementById("compareHeadingTwo").textContent = translatedProduct(two, "name");
  document.getElementById("comparisonBody").innerHTML = SPEC_KEYS.map((key) => `<tr><td>${escapeHTML(TRANSLATIONS[currentLanguage].compareFields[key])}</td><td>${escapeHTML(one.specs[key])}</td><td>${escapeHTML(two.specs[key])}</td></tr>`).join("");
}

function updateModalContent() {
  if (!activeProduct) return;
  document.getElementById("modalTitle").textContent = translatedProduct(activeProduct, "name");
  document.getElementById("modalDescription").textContent = translatedProduct(activeProduct, "description");
  document.getElementById("modalCategory").textContent = categoryName(activeProduct.category);
  document.getElementById("modalSpecs").innerHTML = SPEC_KEYS.map((key) => `<li><strong>${escapeHTML(text(`spec${key[0].toUpperCase()}${key.slice(1)}`))}:</strong> ${escapeHTML(activeProduct.specs[key])}</li>`).join("");
  const image = document.getElementById("modalImage");
  const fallback = image.previousElementSibling;
  image.alt = translatedProduct(activeProduct, "imageAlt");
  image.hidden = !activeProduct.image;
  fallback.hidden = Boolean(activeProduct.image);
  if (activeProduct.image) image.src = activeProduct.image;
  else image.removeAttribute("src");
}

function setLanguage(language) {
  currentLanguage = language === "en" ? "en" : "ar";
  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";
  document.title = currentLanguage === "ar" ? "YS Group | حلول النقد والأمان" : "YS Group | Cash & Security Solutions";
  document.getElementById("metaDescription").content = currentLanguage === "ar"
    ? "YS Group — حلول موثوقة للخزائن وماكينات عدّ النقود في مصر."
    : "YS Group — trusted safes, money counters and maintenance solutions in Egypt.";
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (TRANSLATIONS[currentLanguage][key]) element.textContent = text(key);
  });
  document.getElementById("languageToggle").textContent = currentLanguage === "ar" ? "EN" : "عربي";
  document.getElementById("languageToggle").setAttribute("aria-label", currentLanguage === "ar" ? "Switch language to English" : "تغيير اللغة إلى العربية");
  document.getElementById("menuToggle").setAttribute("aria-label", currentLanguage === "ar" ? "فتح القائمة" : "Open navigation");
  document.querySelector(".main-nav").setAttribute("aria-label", currentLanguage === "ar" ? "التنقل الرئيسي" : "Main navigation");
  document.querySelectorAll("input[placeholder], textarea[placeholder]").forEach((element) => {
    const placeholderKey = element.dataset.placeholderKey;
    if (placeholderKey && TRANSLATIONS[currentLanguage][placeholderKey]) element.placeholder = text(placeholderKey);
  });
  renderProducts();
  populatePaymentLinks();
  updateWhatsAppAnchors();
  try { localStorage.setItem(languageStoreKey, currentLanguage); } catch (error) { /* Storage may be disabled by the browser. */ }
}

function applyFilters(category) {
  selectedFilter = category;
  const cards = document.querySelectorAll(".product-card");
  cards.forEach((card) => {
    const product = PRODUCTS.find((item) => item.id === card.dataset.productId);
    const shouldShow = category === "all" || product.category === category;
    window.clearTimeout(card.filterTimer);
    if (shouldShow) {
      card.hidden = false;
      if (!reduceMotion) {
        card.classList.add("is-hiding");
        requestAnimationFrame(() => card.classList.remove("is-hiding"));
      }
    } else {
      card.classList.add("is-hiding");
      card.filterTimer = window.setTimeout(() => {
        const latestProduct = PRODUCTS.find((item) => item.id === card.dataset.productId);
        if (latestProduct && selectedFilter !== "all" && latestProduct.category !== selectedFilter) card.hidden = true;
        card.classList.remove("is-hiding");
      }, reduceMotion ? 0 : 210);
    }
  });
}

function setProductTilt() {
  if (reduceMotion || window.matchMedia("(hover: none)").matches || window.innerWidth < 760) return;
  document.querySelectorAll(".product-card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;
      card.style.setProperty("--card-rx", `${(0.5 - y) * 8}deg`);
      card.style.setProperty("--card-ry", `${(x - 0.5) * 8}deg`);
      card.style.setProperty("--pointer-x", `${x * 100}%`);
      card.style.setProperty("--pointer-y", `${y * 100}%`);
    });
    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--card-rx", "0deg");
      card.style.setProperty("--card-ry", "0deg");
    });
  });
}

function openModal(product) {
  activeProduct = product;
  updateModalContent();
  modalPreviousFocus = document.activeElement;
  const modal = document.getElementById("productModal");
  modal.hidden = false;
  watchImages(modal);
  document.body.classList.add("modal-open");
  document.getElementById("modalClose").focus();
}

function closeModal() {
  document.getElementById("productModal").hidden = true;
  document.body.classList.remove("modal-open");
  if (modalPreviousFocus) modalPreviousFocus.focus();
}

function populatePaymentLinks() {
  const links = document.querySelectorAll("[data-gateway]");
  links.forEach((link) => {
    const url = PAYMENT_LINKS[link.dataset.gateway];
    if (!url) {
      link.classList.remove("is-available");
      link.removeAttribute("href");
      return;
    }
    link.href = url;
    link.classList.add("is-available");
  });
  document.querySelector(".coming-soon").hidden = Object.values(PAYMENT_LINKS).some(Boolean);
}

function updateWhatsAppAnchors() {
  document.querySelectorAll("[data-whatsapp]").forEach((link) => {
    link.href = WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}` : "#contact";
    link.target = WHATSAPP_NUMBER ? "_blank" : "";
    link.rel = WHATSAPP_NUMBER ? "noopener noreferrer" : "";
  });
}

function interpolate(template, values) {
  return template.replace(/\{(\w+)\}/g, (_, key) => values[key] || "—");
}

function validPhone(value) {
  return /^[+\d][\d\s()+-]{5,}$/.test(value.trim());
}

function trackFormSubmit(type) {
  trackEvent("form_submit", { form_type: type });
}

async function saveRequestToSupabase(order) {
  const projectUrl = SUPABASE_CONFIG.url.trim().replace(/\/+$/, "");
  const anonKey = SUPABASE_CONFIG.anonKey.trim();
  if (!projectUrl || !anonKey) throw new Error("backend-not-configured");
  const response = await fetch(`${projectUrl}/rest/v1/orders`, {
    method: "POST",
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal"
    },
    body: JSON.stringify(order)
  });
  if (!response.ok) throw new Error(`request-storage-failed-${response.status}`);
}

async function submitForm(form, statusElement, message, eventName, details, order) {
  if (!form.reportValidity()) {
    statusElement.textContent = text("formInvalid");
    return;
  }
  if (details.phone && !validPhone(details.phone)) {
    form.elements.phone.focus();
    statusElement.textContent = text("formInvalid");
    return;
  }
  const sent = openWhatsApp(message, eventName, details);
  if (!sent) {
    statusElement.textContent = text("waMissing");
    return;
  }
  trackFormSubmit(details.formType);
  statusElement.textContent = text("formThanks");
  try {
    await saveRequestToSupabase(order);
    statusElement.textContent = text("requestSaved");
  } catch (error) {
    if (error.message !== "backend-not-configured") {
      console.error("Request could not be stored for the owner dashboard:", error.message);
    }
    statusElement.textContent = error.message === "backend-not-configured"
      ? text("requestNotTracked")
      : text("requestSaveFailed");
  }
}

function loadAnalytics() {
  if (ANALYTICS.ga4Id) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ANALYTICS.ga4Id)}`;
    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag() { window.dataLayer.push(arguments); };
      window.gtag("js", new Date());
      window.gtag("config", ANALYTICS.ga4Id);
    };
    document.head.appendChild(script);
  }
  if (ANALYTICS.metaPixelId) {
    const script = document.createElement("script");
    script.textContent = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${ANALYTICS.metaPixelId.replace(/[^a-zA-Z0-9_-]/g, "")}');fbq('track','PageView');`;
    document.head.appendChild(script);
  }
}

function initCookieConsent() {
  const notice = document.getElementById("cookieNotice");
  let choice = "";
  try { choice = localStorage.getItem(consentStoreKey) || ""; } catch (error) { choice = ""; }
  if (!choice) notice.hidden = false;
  document.getElementById("acceptCookies").addEventListener("click", () => {
    try { localStorage.setItem(consentStoreKey, "accepted"); } catch (error) { toast(text("consentSaved")); }
    notice.hidden = true;
    loadAnalytics();
  });
  document.getElementById("rejectCookies").addEventListener("click", () => {
    try { localStorage.setItem(consentStoreKey, "rejected"); } catch (error) { /* Analytics remains disabled for this visit. */ }
    notice.hidden = true;
  });
  if (choice === "accepted") loadAnalytics();
}

function initTiltAndParallax() {
  if (reduceMotion) return;
  const hero = document.querySelector(".hero-visual");
  const watermark = document.querySelector(".brand-watermark");
  const canTilt = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  let latestX = 0;
  let latestY = 0;
  let framePending = false;
  const update = () => {
    framePending = false;
    if (canTilt) {
      const x = (latestX / window.innerWidth - 0.5) * 7;
      const y = (latestY / window.innerHeight - 0.5) * -7;
      hero.style.setProperty("--tilt-x", `${y}deg`);
      hero.style.setProperty("--tilt-y", `${x}deg`);
    } else {
      const bounds = hero.getBoundingClientRect();
      const distanceFromCenter = (bounds.top + bounds.height / 2 - window.innerHeight / 2) / window.innerHeight;
      const tilt = Math.max(-2, Math.min(2, distanceFromCenter * -2));
      hero.style.setProperty("--tilt-x", `${tilt}deg`);
    }
    const scrollRatio = Math.min(window.scrollY / Math.max(document.documentElement.scrollHeight - window.innerHeight, 1), 1);
    watermark.style.setProperty("--watermark-y", `${(scrollRatio - .5) * 30}px`);
    watermark.style.setProperty("--watermark-rotate", `${(scrollRatio - .5) * 4}deg`);
  };
  window.addEventListener("pointermove", (event) => {
    latestX = event.clientX;
    latestY = event.clientY;
    if (!framePending) {
      framePending = true;
      requestAnimationFrame(update);
    }
  }, { passive: true });
  window.addEventListener("scroll", () => {
    if (!framePending) {
      framePending = true;
      requestAnimationFrame(update);
    }
  }, { passive: true });
}

function initReveal() {
  const elements = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  elements.forEach((element) => observer.observe(element));
}

function watchImages(root) {
  root.querySelectorAll("img").forEach((image) => {
    if (watchedImages.has(image)) return;
    watchedImages.add(image);
    image.addEventListener("error", () => {
      image.hidden = true;
      if (image.parentElement && image.parentElement.querySelector(".image-fallback")) image.parentElement.querySelector(".image-fallback").hidden = false;
      if (image.closest(".brand-watermark") || image.closest(".about-mark") || image.closest(".contact-watermark")) image.parentElement.classList.add("asset-missing");
    });
    image.addEventListener("load", () => {
      if (image.parentElement && image.parentElement.querySelector(".image-fallback")) image.parentElement.querySelector(".image-fallback").hidden = true;
    });
    if (image.complete) {
      if (image.naturalWidth > 0) {
        if (image.parentElement && image.parentElement.querySelector(".image-fallback")) image.parentElement.querySelector(".image-fallback").hidden = true;
      } else {
        image.dispatchEvent(new Event("error"));
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("currentYear").textContent = new Date().getFullYear();
  document.getElementById("compareOne").value = PRODUCTS[0].id;
  document.getElementById("compareTwo").value = PRODUCTS[1].id;
  document.querySelectorAll(".product-card").forEach((element) => element.remove());
  let preferredLanguage = "ar";
  try { preferredLanguage = localStorage.getItem(languageStoreKey) || "ar"; } catch (error) { preferredLanguage = "ar"; }
  setLanguage(preferredLanguage);
  initCookieConsent();
  initReveal();
  initTiltAndParallax();
  populatePaymentLinks();

  document.getElementById("languageToggle").addEventListener("click", () => setLanguage(currentLanguage === "ar" ? "en" : "ar"));
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    nav.classList.toggle("is-open", !isOpen);
  });
  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      nav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
  document.querySelectorAll(".filter-button").forEach((button) => button.addEventListener("click", () => {
    selectedFilter = button.dataset.filter;
    document.querySelectorAll(".filter-button").forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    applyFilters(button.dataset.filter);
  }));
  document.getElementById("compareOne").addEventListener("change", updateComparison);
  document.getElementById("compareTwo").addEventListener("change", updateComparison);

  document.getElementById("productGrid").addEventListener("click", (event) => {
    const button = event.target.closest("[data-action]");
    if (!button) return;
    const product = PRODUCTS.find((item) => item.id === button.dataset.productId);
    if (!product) return;
    const name = translatedProduct(product, "name");
    if (button.dataset.action === "details") {
      openModal(product);
      return;
    }
    if (button.dataset.action === "ask") {
      openWhatsApp(currentLanguage === "ar" ? `مرحبًا، أود الاستفسار عن سعر وتفاصيل: ${name}.` : `Hello, I'd like to ask about the price and details for: ${name}.`, "product_ask_price", { product_id: product.id });
      return;
    }
    if (button.dataset.action === "buy") {
      document.getElementById("orderProduct").value = product.id;
      document.getElementById("payment").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
      document.getElementById("orderQuantity").focus();
    }
  });
  document.getElementById("modalClose").addEventListener("click", closeModal);
  document.getElementById("productModal").addEventListener("click", (event) => {
    if (event.target.id === "productModal") closeModal();
  });
  document.addEventListener("keydown", (event) => {
    const modal = document.getElementById("productModal");
    if (event.key === "Escape" && !modal.hidden) {
      closeModal();
      return;
    }
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      nav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.focus();
      return;
    }
    if (modal.hidden) return;
    if (event.key === "Tab") {
      const focusable = [...modal.querySelectorAll("button:not([disabled]), a[href], input, select, textarea, [tabindex]:not([tabindex='-1'])")];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });

  document.getElementById("businessForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    const product = PRODUCTS.find((item) => item.id === values.product);
    const message = interpolate(TRANSLATIONS[currentLanguage].quoteTemplate, {
      company: values.company.trim(), quantity: values.quantity, phone: values.phone.trim(), product: product ? translatedProduct(product, "name") : ""
    });
    const request = {
      customer_name: values.company.trim(),
      phone: values.phone.trim(),
      company_name: values.company.trim(),
      product: product ? translatedProduct(product, "name") : "",
      quantity: Number(values.quantity),
      request_type: "business_quote",
      message: "",
      payment_method: null,
      consent: values.consent === "yes"
    };
    submitForm(form, document.getElementById("businessStatus"), message, "business_quote_submit", { phone: values.phone, formType: "business_quote" }, request);
  });
  document.getElementById("contactForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    const product = PRODUCTS.find((item) => item.id === values.product);
    const message = interpolate(TRANSLATIONS[currentLanguage].contactTemplate, {
      name: values.name.trim(), phone: values.phone.trim(), product: product ? translatedProduct(product, "name") : "", message: values.message.trim() || "—"
    });
    const request = {
      customer_name: values.name.trim(),
      phone: values.phone.trim(),
      company_name: null,
      product: product ? translatedProduct(product, "name") : "",
      quantity: 1,
      request_type: "contact",
      message: values.message.trim(),
      payment_method: null,
      consent: values.consent === "yes"
    };
    submitForm(form, document.getElementById("contactStatus"), message, "contact_form_submit", { phone: values.phone, formType: "contact" }, request);
  });
  document.getElementById("orderForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    const product = PRODUCTS.find((item) => item.id === values.product);
    const message = interpolate(TRANSLATIONS[currentLanguage].orderTemplate, {
      name: values.name.trim(), phone: values.phone.trim(), product: product ? translatedProduct(product, "name") : "", quantity: values.quantity,
      payment: TRANSLATIONS[currentLanguage].paymentMethods[Number(values.payment)] || ""
    });
    const request = {
      customer_name: values.name.trim(),
      phone: values.phone.trim(),
      company_name: null,
      product: product ? translatedProduct(product, "name") : "",
      quantity: Number(values.quantity),
      request_type: "order",
      message: "",
      payment_method: TRANSLATIONS[currentLanguage].paymentMethods[Number(values.payment)] || "",
      consent: values.consent === "yes"
    };
    submitForm(form, document.getElementById("orderStatus"), message, "order_submit", {
      phone: values.phone,
      product_id: values.product,
      payment_method: values.payment,
      formType: "order"
    }, request);
  });
  document.querySelectorAll("[data-whatsapp]").forEach((link) => link.addEventListener("click", (event) => {
    event.preventDefault();
    const messageKey = link.dataset.whatsapp;
    const messages = {
      quote: currentLanguage === "ar" ? "مرحبًا YS Group، أود طلب عرض سعر." : "Hello YS Group, I would like to request a quote.",
      payment: currentLanguage === "ar" ? "مرحبًا، أود تأكيد خيارات الدفع وإتمام الطلب." : "Hello, I would like to confirm payment options and complete an order.",
      hello: currentLanguage === "ar" ? "مرحبًا YS Group، أود الاستفسار عن منتجاتكم." : "Hello YS Group, I would like to enquire about your products.",
      product: currentLanguage === "ar" ? `مرحبًا، أود الاستفسار عن ${translatedProduct(activeProduct, "name")}.` : `Hello, I would like to enquire about ${translatedProduct(activeProduct, "name")}.`
    };
    openWhatsApp(messages[messageKey] || messages.hello, "whatsapp_click", { placement: messageKey });
  }));
  document.querySelectorAll("[data-gateway]").forEach((link) => link.addEventListener("click", (event) => {
    const url = PAYMENT_LINKS[link.dataset.gateway];
    if (!url) {
      event.preventDefault();
      toast(text("paymentComing"));
      return;
    }
    trackEvent("payment_option_click", { provider: link.dataset.gateway });
  }));
  document.querySelectorAll(".payment-card:not(.gateway-card)").forEach((card) => card.addEventListener("click", (event) => {
    if (event.target.closest(".copy-button") || event.target.closest(".whatsapp-action") || event.target.closest("a")) {
      trackEvent("payment_option_click", { option: card.querySelector("h3").textContent });
    }
  }));
  document.querySelectorAll(".copy-button").forEach((button) => button.addEventListener("click", async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(button.dataset.copy);
      else {
        const temporaryInput = document.createElement("textarea");
        temporaryInput.value = button.dataset.copy;
        temporaryInput.setAttribute("readonly", "");
        temporaryInput.style.position = "fixed";
        temporaryInput.style.opacity = "0";
        document.body.appendChild(temporaryInput);
        temporaryInput.select();
        const copied = document.execCommand("copy");
        temporaryInput.remove();
        if (!copied) throw new Error("Clipboard copy command was rejected.");
      }
      toast(text("copySuccess"));
    } catch (error) {
      toast(text("copyFailure"));
    }
  }));
  watchImages(document);
});
