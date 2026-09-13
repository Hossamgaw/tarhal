// ============================================
// TARHAL — Global Data (Countries, Cities, Currencies)
// Uses free APIs + localStorage cache
// ============================================

const CACHE_KEYS = {
  COUNTRIES: 'tarhal_countries_v2',
  CITIES: 'tarhal_cities_v2_',
};

const CACHE_DURATION = 30 * 24 * 60 * 60 * 1000; // 30 days

// In-memory cache (fast access)
let _countriesCache = null;
const _citiesCache = {};

// ============================================
// COUNTRIES — from mledoze/countries on GitHub
// ============================================
async function loadCountries() {
  if (_countriesCache) return _countriesCache;

  // Check localStorage cache
  try {
    const cached = localStorage.getItem(CACHE_KEYS.COUNTRIES);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed.expiry > Date.now()) {
        _countriesCache = parsed.data;
        return parsed.data;
      }
    }
  } catch (e) { /* ignore */ }

  // Fetch from GitHub
  try {
    const res = await fetch(
      'https://raw.githubusercontent.com/mledoze/countries/master/countries.json'
    );
    const raw = await res.json();

    const countries = raw
      .filter(c => c.cca2 && c.name && (c.name.common || c.name.official))
      .map(c => {
        // Extract currency (first one)
        const currencyCodes = c.currencies ? Object.keys(c.currencies) : [];
        const currency = currencyCodes[0] || 'USD';
        const currencyData = c.currencies ? c.currencies[currency] : null;

        return {
          code: c.cca2,
          nameEn: c.name.common,
          nameAr: (c.translations && c.translations.ara && c.translations.ara.common)
                  || c.name.common,
          currency: currency,
          currencySymbol: currencyData ? (currencyData.symbol || currency) : currency,
          currencyNameAr: currencyData ? (currencyData.name || currency) : currency,
          flag: countryCodeToFlag(c.cca2),
          region: c.region || '',
          capital: (c.capital && c.capital[0]) || '',
        };
      })
      .sort((a, b) => a.nameEn.localeCompare(b.nameEn));

    // Save to localStorage
    try {
      localStorage.setItem(CACHE_KEYS.COUNTRIES, JSON.stringify({
        data: countries,
        expiry: Date.now() + CACHE_DURATION,
      }));
    } catch (e) { /* ignore quota errors */ }

    _countriesCache = countries;
    return countries;
  } catch (e) {
    console.error('Failed to load countries:', e);
    return [];
  }
}

// ============================================
// CITIES — from countriesnow.tech API
// ============================================
async function loadCities(countryCode) {
  if (!countryCode) return [];

  if (_citiesCache[countryCode]) return _citiesCache[countryCode];

  const cacheKey = CACHE_KEYS.CITIES + countryCode;

  // Check cache
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed.expiry > Date.now()) {
        _citiesCache[countryCode] = parsed.data;
        return parsed.data;
      }
    }
  } catch (e) { /* ignore */ }

  // Get country English name
  const countries = await loadCountries();
  const country = countries.find(c => c.code === countryCode);
  if (!country) return [];

  // Fetch cities
  try {
    const res = await fetch('https://countriesnow.tech/api/v1/cities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ country: country.nameEn }),
    });
    const data = await res.json();
    const cities = (data.data || []).map(name => ({ name }));

    // Save cache
    try {
      localStorage.setItem(cacheKey, JSON.stringify({
        data: cities,
        expiry: Date.now() + CACHE_DURATION,
      }));
    } catch (e) { /* ignore */ }

    _citiesCache[countryCode] = cities;
    return cities;
  } catch (e) {
    console.error('Failed to load cities for', countryCode, e);
    return [];
  }
}

// ============================================
// HELPERS
// ============================================

/**
 * Convert country code (e.g. "EG") to emoji flag (🇪🇬)
 */
function countryCodeToFlag(code) {
  if (!code || code.length !== 2) return '🌍';
  try {
    const codePoints = code
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  } catch (e) {
    return '🌍';
  }
}

/**
 * Get country by code (from cache)
 */
function getCountryByCode(code) {
  if (!_countriesCache) return null;
  return _countriesCache.find(c => c.code === code) || null;
}

/**
 * Get all countries (from cache)
 */
function getAllCountries() {
  return _countriesCache || [];
}

/**
 * Get country name by locale
 */
function getCountryName(code, locale) {
  const country = getCountryByCode(code);
  if (!country) return code;
  const loc = locale || (typeof getLocale === 'function' ? getLocale() : 'ar');
  return loc === 'ar' ? country.nameAr : country.nameEn;
}

/**
 * Get currency by country code
 */
function getCurrencyByCountry(code) {
  const country = getCountryByCode(code);
  return country ? country.currency : 'USD';
}

/**
 * Detect user's country via IP
 */
async function detectUserCountry() {
  // Check cache first
  try {
    const cached = localStorage.getItem('tarhal_user_country');
    if (cached) {
      const parsed = JSON.parse(cached);
      if (parsed.expiry > Date.now()) return parsed.data;
    }
  } catch (e) { /* ignore */ }

  const fallback = { country: 'EG', currency: 'EGP' };

  try {
    const res = await fetch('https://ipwho.is/');
    const data = await res.json();
    if (data && data.success && data.country_code) {
      const result = {
        country: data.country_code,
        currency: getCurrencyByCountry(data.country_code) || 'USD',
      };
      try {
        localStorage.setItem('tarhal_user_country', JSON.stringify({
          data: result,
          expiry: Date.now() + (7 * 24 * 60 * 60 * 1000),
        }));
      } catch (e) { /* ignore */ }
      return result;
    }
  } catch (e) {
    console.warn('IP detection failed, using fallback');
  }

  return fallback;
}

/**
 * Clear all data cache (useful for debugging)
 */
function clearDataCache() {
  _countriesCache = null;
  Object.keys(_citiesCache).forEach(k => delete _citiesCache[k]);
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith('tarhal_countries_') ||
        key.startsWith('tarhal_cities_') ||
        key === 'tarhal_user_country') {
      localStorage.removeItem(key);
    }
  });
}