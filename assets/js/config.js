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

// ============== CURRENCIES ==============
const CURRENCIES = {
  EGP: { symbol: '£', nameAr: 'جنيه مصري', nameEn: 'Egyptian Pound' },
  SAR: { symbol: '﷼', nameAr: 'ريال سعودي', nameEn: 'Saudi Riyal' },
  USD: { symbol: '$', nameAr: 'دولار أمريكي', nameEn: 'US Dollar' },
  EUR: { symbol: '€', nameAr: 'يورو', nameEn: 'Euro' },
  GBP: { symbol: '£', nameAr: 'جنيه إسترليني', nameEn: 'British Pound' },
};

function getCurrency() {
  return localStorage.getItem('currency') || 'EGP';
}

function setCurrency(code) {
  if (!CURRENCIES[code]) return;
  localStorage.setItem('currency', code);
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