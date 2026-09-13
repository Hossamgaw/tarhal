// ============================================
// TARHAL — Global Travel Platform
// Configuration File
// ============================================

// ============== BRAND ==============
const BRAND = {
  nameAr: 'ترحال',
  nameEn: 'Tarhal',
  taglineAr: 'شوف رحلتك… قبل ما تبدأ',
  taglineEn: 'See Your Trip Before It Starts',
  primary: '#0F766E',
  accent: '#D4A574',
  red: '#DC2626',
  lightTeal: '#14B8A6',
  darkText: '#1E293B',
  grayText: '#64748B',
  lightBg: '#F8FAFC',
  border: '#E2E8F0',
};

// ============== LOCALE ==============
const LOCALES = ['ar', 'en'];
const DEFAULT_LOCALE = 'ar';

function getLocale() {
  return localStorage.getItem('locale') || DEFAULT_LOCALE;
}

function setLocale(locale) {
  if (!LOCALES.includes(locale)) return;
  localStorage.setItem('locale', locale);
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = locale;
  document.documentElement.dir = dir;
}

function isRTL() {
  return getLocale() === 'ar';
}

// ============== CURRENCIES (Global) ==============
const CURRENCIES = {
  // Middle East
  EGP: { symbol: '£', nameAr: 'جنيه مصري', nameEn: 'Egyptian Pound' },
  SAR: { symbol: '﷼', nameAr: 'ريال سعودي', nameEn: 'Saudi Riyal' },
  AED: { symbol: 'د.إ', nameAr: 'درهم إماراتي', nameEn: 'UAE Dirham' },
  KWD: { symbol: 'د.ك', nameAr: 'دينار كويتي', nameEn: 'Kuwaiti Dinar' },
  QAR: { symbol: 'ر.ق', nameAr: 'ريال قطري', nameEn: 'Qatari Riyal' },
  BHD: { symbol: '.د.ب', nameAr: 'دينار بحريني', nameEn: 'Bahraini Dinar' },
  OMR: { symbol: 'ر.ع', nameAr: 'ريال عُماني', nameEn: 'Omani Rial' },
  JOD: { symbol: 'د.أ', nameAr: 'دينار أردني', nameEn: 'Jordanian Dinar' },
  LBP: { symbol: 'ل.ل', nameAr: 'ليرة لبنانية', nameEn: 'Lebanese Pound' },
  IQD: { symbol: 'ع.د', nameAr: 'دينار عراقي', nameEn: 'Iraqi Dinar' },
  SYP: { symbol: 'ل.س', nameAr: 'ليرة سورية', nameEn: 'Syrian Pound' },
  YER: { symbol: '﷼', nameAr: 'ريال يمني', nameEn: 'Yemeni Rial' },
  ILS: { symbol: '₪', nameAr: 'شيكل', nameEn: 'Israeli Shekel' },

  // North Africa
  LYD: { symbol: 'ل.د', nameAr: 'دينار ليبي', nameEn: 'Libyan Dinar' },
  TND: { symbol: 'د.ت', nameAr: 'دينار تونسي', nameEn: 'Tunisian Dinar' },
  DZD: { symbol: 'د.ج', nameAr: 'دينار جزائري', nameEn: 'Algerian Dinar' },
  MAD: { symbol: 'د.م', nameAr: 'درهم مغربي', nameEn: 'Moroccan Dirham' },
  SDG: { symbol: 'ج.س', nameAr: 'جنيه سوداني', nameEn: 'Sudanese Pound' },

  // Turkey & Asia
  TRY: { symbol: '₺', nameAr: 'ليرة تركية', nameEn: 'Turkish Lira' },
  MYR: { symbol: 'RM', nameAr: 'رينغيت ماليزي', nameEn: 'Malaysian Ringgit' },
  IDR: { symbol: 'Rp', nameAr: 'روبية إندونيسية', nameEn: 'Indonesian Rupiah' },
  MVR: { symbol: 'Rf', nameAr: 'روفيا مالديفية', nameEn: 'Maldivian Rufiyaa' },
  THB: { symbol: '฿', nameAr: 'بات تايلاندي', nameEn: 'Thai Baht' },
  SGD: { symbol: 'S$', nameAr: 'دولار سنغافوري', nameEn: 'Singapore Dollar' },
  JPY: { symbol: '¥', nameAr: 'ين ياباني', nameEn: 'Japanese Yen' },
  CNY: { symbol: '¥', nameAr: 'يوان صيني', nameEn: 'Chinese Yuan' },
  KRW: { symbol: '₩', nameAr: 'وون كوري', nameEn: 'Korean Won' },
  INR: { symbol: '₹', nameAr: 'روبية هندية', nameEn: 'Indian Rupee' },
  PKR: { symbol: '₨', nameAr: 'روبية باكستانية', nameEn: 'Pakistani Rupee' },

  // Europe
  EUR: { symbol: '€', nameAr: 'يورو', nameEn: 'Euro' },
  GBP: { symbol: '£', nameAr: 'جنيه إسترليني', nameEn: 'British Pound' },
  CHF: { symbol: 'Fr', nameAr: 'فرنك سويسري', nameEn: 'Swiss Franc' },
  SEK: { symbol: 'kr', nameAr: 'كرونة سويدية', nameEn: 'Swedish Krona' },
  NOK: { symbol: 'kr', nameAr: 'كرونة نرويجية', nameEn: 'Norwegian Krone' },
  RUB: { symbol: '₽', nameAr: 'روبل روسي', nameEn: 'Russian Ruble' },
  AZN: { symbol: '₼', nameAr: 'مانات أذربيجاني', nameEn: 'Azerbaijani Manat' },
  GEL: { symbol: '₾', nameAr: 'لاري جورجي', nameEn: 'Georgian Lari' },

  // Americas
  USD: { symbol: '$', nameAr: 'دولار أمريكي', nameEn: 'US Dollar' },
  CAD: { symbol: 'C$', nameAr: 'دولار كندي', nameEn: 'Canadian Dollar' },
  BRL: { symbol: 'R$', nameAr: 'ريال برازيلي', nameEn: 'Brazilian Real' },
  MXN: { symbol: '$', nameAr: 'بيزو مكسيكي', nameEn: 'Mexican Peso' },
  ARS: { symbol: '$', nameAr: 'بيزو أرجنتيني', nameEn: 'Argentine Peso' },

  // Africa
  ZAR: { symbol: 'R', nameAr: 'راند جنوب أفريقي', nameEn: 'South African Rand' },
  KES: { symbol: 'KSh', nameAr: 'شلن كيني', nameEn: 'Kenyan Shilling' },
  ETB: { symbol: 'Br', nameAr: 'بير إثيوبي', nameEn: 'Ethiopian Birr' },
  NGN: { symbol: '₦', nameAr: 'نايرا نيجيري', nameEn: 'Nigerian Naira' },
  TZS: { symbol: 'TSh', nameAr: 'شلن تنزاني', nameEn: 'Tanzanian Shilling' },

  // Oceania
  AUD: { symbol: 'A$', nameAr: 'دولار أسترالي', nameEn: 'Australian Dollar' },
  NZD: { symbol: 'NZ$', nameAr: 'دولار نيوزيلندي', nameEn: 'New Zealand Dollar' },
};

function getCurrency() {
  return localStorage.getItem('currency') || 'EGP';
}

function setCurrency(code) {
  if (!CURRENCIES[code]) return;
  localStorage.setItem('currency', code);
}

function getCurrencyInfo(code) {
  return CURRENCIES[code] || CURRENCIES.USD;
}

// ============== SUPABASE ==============
// ⚠️ هنضيف القيم دي لاحقًا
const SUPABASE_URL = 'PLACEHOLDER_URL';
const SUPABASE_ANON_KEY = 'PLACEHOLDER_KEY';

// ============== APP SETTINGS ==============
const APP = {
  version: '0.1.0',
  defaultCountry: 'EG',
  tripsPerPage: 12,
};