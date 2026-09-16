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
  EGP: { symbol: '£', codeAr: 'ج.م', nameAr: 'جنيه مصري', nameEn: 'Egyptian Pound' },
  SAR: { symbol: '﷼', codeAr: 'ر.س', nameAr: 'ريال سعودي', nameEn: 'Saudi Riyal' },
  AED: { symbol: 'د.إ', codeAr: 'د.إ', nameAr: 'درهم إماراتي', nameEn: 'UAE Dirham' },
  KWD: { symbol: 'د.ك', codeAr: 'د.ك', nameAr: 'دينار كويتي', nameEn: 'Kuwaiti Dinar' },
  QAR: { symbol: 'ر.ق', codeAr: 'ر.ق', nameAr: 'ريال قطري', nameEn: 'Qatari Riyal' },
  BHD: { symbol: 'د.ب', codeAr: 'د.ب', nameAr: 'دينار بحريني', nameEn: 'Bahraini Dinar' },
  OMR: { symbol: 'ر.ع', codeAr: 'ر.ع', nameAr: 'ريال عُماني', nameEn: 'Omani Rial' },
  JOD: { symbol: 'د.أ', codeAr: 'د.أ', nameAr: 'دينار أردني', nameEn: 'Jordanian Dinar' },
  LBP: { symbol: 'ل.ل', codeAr: 'ل.ل', nameAr: 'ليرة لبنانية', nameEn: 'Lebanese Pound' },
  IQD: { symbol: 'ع.د', codeAr: 'ع.د', nameAr: 'دينار عراقي', nameEn: 'Iraqi Dinar' },
  SYP: { symbol: 'ل.س', codeAr: 'ل.س', nameAr: 'ليرة سورية', nameEn: 'Syrian Pound' },
  YER: { symbol: '﷼', codeAr: 'ر.ي', nameAr: 'ريال يمني', nameEn: 'Yemeni Rial' },

  // North Africa
  LYD: { symbol: 'ل.د', codeAr: 'ل.د', nameAr: 'دينار ليبي', nameEn: 'Libyan Dinar' },
  TND: { symbol: 'د.ت', codeAr: 'د.ت', nameAr: 'دينار تونسي', nameEn: 'Tunisian Dinar' },
  DZD: { symbol: 'د.ج', codeAr: 'د.ج', nameAr: 'دينار جزائري', nameEn: 'Algerian Dinar' },
  MAD: { symbol: 'د.م', codeAr: 'د.م', nameAr: 'درهم مغربي', nameEn: 'Moroccan Dirham' },
  SDG: { symbol: 'ج.س', codeAr: 'ج.س', nameAr: 'جنيه سوداني', nameEn: 'Sudanese Pound' },

  // Turkey & Asia
  TRY: { symbol: '₺', codeAr: 'ل.ت', nameAr: 'ليرة تركية', nameEn: 'Turkish Lira' },
  MYR: { symbol: 'RM', codeAr: 'RM', nameAr: 'رينغيت ماليزي', nameEn: 'Malaysian Ringgit' },
  IDR: { symbol: 'Rp', codeAr: 'Rp', nameAr: 'روبية إندونيسية', nameEn: 'Indonesian Rupiah' },
  MVR: { symbol: 'Rf', codeAr: 'Rf', nameAr: 'روفيا مالديفية', nameEn: 'Maldivian Rufiyaa' },
  THB: { symbol: '฿', codeAr: '฿', nameAr: 'بات تايلاندي', nameEn: 'Thai Baht' },
  SGD: { symbol: 'S$', codeAr: 'S$', nameAr: 'دولار سنغافوري', nameEn: 'Singapore Dollar' },
  JPY: { symbol: '¥', codeAr: '¥', nameAr: 'ين ياباني', nameEn: 'Japanese Yen' },
  CNY: { symbol: '¥', codeAr: '¥', nameAr: 'يوان صيني', nameEn: 'Chinese Yuan' },
  KRW: { symbol: '₩', codeAr: '₩', nameAr: 'وون كوري', nameEn: 'Korean Won' },
  INR: { symbol: '₹', codeAr: '₹', nameAr: 'روبية هندية', nameEn: 'Indian Rupee' },
  PKR: { symbol: '₨', codeAr: '₨', nameAr: 'روبية باكستانية', nameEn: 'Pakistani Rupee' },

  // Europe
  EUR: { symbol: '€', codeAr: '€', nameAr: 'يورو', nameEn: 'Euro' },
  GBP: { symbol: '£', codeAr: '£', nameAr: 'جنيه إسترليني', nameEn: 'British Pound' },
  CHF: { symbol: 'Fr', codeAr: 'Fr', nameAr: 'فرنك سويسري', nameEn: 'Swiss Franc' },
  SEK: { symbol: 'kr', codeAr: 'kr', nameAr: 'كرونة سويدية', nameEn: 'Swedish Krona' },
  NOK: { symbol: 'kr', codeAr: 'kr', nameAr: 'كرونة نرويجية', nameEn: 'Norwegian Krone' },
  RUB: { symbol: '₽', codeAr: '₽', nameAr: 'روبل روسي', nameEn: 'Russian Ruble' },
  AZN: { symbol: '₼', codeAr: '₼', nameAr: 'مانات أذربيجاني', nameEn: 'Azerbaijani Manat' },
  GEL: { symbol: '₾', codeAr: '₾', nameAr: 'لاري جورجي', nameEn: 'Georgian Lari' },

  // Americas
  USD: { symbol: '$', codeAr: '$', nameAr: 'دولار أمريكي', nameEn: 'US Dollar' },
  CAD: { symbol: 'C$', codeAr: 'C$', nameAr: 'دولار كندي', nameEn: 'Canadian Dollar' },
  BRL: { symbol: 'R$', codeAr: 'R$', nameAr: 'ريال برازيلي', nameEn: 'Brazilian Real' },
  MXN: { symbol: '$', codeAr: 'MX$', nameAr: 'بيزو مكسيكي', nameEn: 'Mexican Peso' },
  ARS: { symbol: '$', codeAr: 'AR$', nameAr: 'بيزو أرجنتيني', nameEn: 'Argentine Peso' },

  // Africa
  ZAR: { symbol: 'R', codeAr: 'R', nameAr: 'راند جنوب أفريقي', nameEn: 'South African Rand' },
  KES: { symbol: 'KSh', codeAr: 'KSh', nameAr: 'شلن كيني', nameEn: 'Kenyan Shilling' },
  ETB: { symbol: 'Br', codeAr: 'Br', nameAr: 'بير إثيوبي', nameEn: 'Ethiopian Birr' },
  NGN: { symbol: '₦', codeAr: '₦', nameAr: 'نايرا نيجيري', nameEn: 'Nigerian Naira' },
  TZS: { symbol: 'TSh', codeAr: 'TSh', nameAr: 'شلن تنزاني', nameEn: 'Tanzanian Shilling' },

  // Oceania
  AUD: { symbol: 'A$', codeAr: 'A$', nameAr: 'دولار أسترالي', nameEn: 'Australian Dollar' },
  NZD: { symbol: 'NZ$', codeAr: 'NZ$', nameAr: 'دولار نيوزيلندي', nameEn: 'New Zealand Dollar' },
};

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