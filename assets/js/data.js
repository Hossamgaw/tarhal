// ============================================
// TARHAL — Global Data
// Countries from GitHub + Cities from IndexedDB
// ============================================

const CACHE_KEYS = {
  COUNTRIES: 'tarhal_countries_v2',
};

const CACHE_DURATION = 30 * 24 * 60 * 60 * 1000; // 30 days

let _countriesCache = null;

// ============================================
// LOAD COUNTRIES
// ============================================
async function loadCountries() {
  if (_countriesCache) return _countriesCache;

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

  try {
    const res = await fetch(
      'https://raw.githubusercontent.com/mledoze/countries/master/countries.json'
    );
    const raw = await res.json();

    const countries = raw
      .filter(c => c.cca2 && c.name && (c.name.common || c.name.official))
      .map(c => {
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

    try {
      localStorage.setItem(CACHE_KEYS.COUNTRIES, JSON.stringify({
        data: countries,
        expiry: Date.now() + CACHE_DURATION,
      }));
    } catch (e) { /* ignore */ }

    _countriesCache = countries;
    return countries;
  } catch (e) {
    console.error('Failed to load countries:', e);
    return [];
  }
}

// ============================================
// SEARCH (Countries + Cities from IndexedDB)
// ============================================
async function searchAll(query) {
  const q = query.trim();
  if (!q || q.length < 2) return [];

  const results = [];
  const qLower = q.toLowerCase();

  // 1. Search countries
  const countries = await loadCountries();
  countries.forEach(c => {
    if (c.nameEn.toLowerCase().includes(qLower) || c.nameAr.includes(q)) {
      results.push({
        type: 'country',
        code: c.code,
        flag: c.flag,
        name: isRTL() ? c.nameAr : c.nameEn,
        sub: isRTL() ? c.nameEn : c.nameAr,
        displayName: `${c.flag} ${isRTL() ? c.nameAr : c.nameEn}`,
      });
    }
  });

  // 2. Search cities from IndexedDB
  try {
    if (typeof searchCitiesIndexed === 'function') {
      const cities = await searchCitiesIndexed(q, 30);
      for (const city of cities) {
        const country = countries.find(c => c.code === city.countryCode);
        if (!country) continue;
        results.push({
          type: 'city',
          countryCode: city.countryCode,
          flag: country.flag,
          name: city.name,
          sub: isRTL() ? country.nameAr : country.nameEn,
          displayName: `${country.flag} ${city.name} — ${isRTL() ? country.nameAr : country.nameEn}`,
        });
      }
    }
  } catch (e) {
    console.warn('City search failed:', e);
  }

  return results.slice(0, 30);
}

// ============================================
// HELPERS
// ============================================

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

function getCountryByCode(code) {
  if (!_countriesCache) return null;
  return _countriesCache.find(c => c.code === code) || null;
}

function getAllCountries() {
  return _countriesCache || [];
}

function getCountryName(code, locale) {
  const country = getCountryByCode(code);
  if (!country) return code;
  const loc = locale || (typeof getLocale === 'function' ? getLocale() : 'ar');
  return loc === 'ar' ? country.nameAr : country.nameEn;
}

function getCurrencyByCountry(code) {
  const country = getCountryByCode(code);
  return country ? country.currency : 'USD';
}

async function detectUserCountry() {
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

function clearDataCache() {
  _countriesCache = null;
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith('tarhal_countries_') || key === 'tarhal_user_country') {
      localStorage.removeItem(key);
    }
  });
}