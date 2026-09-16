// ============================================
// TARHAL — Main Application Logic
// Shared across all pages
// ============================================

// ============== UTILITIES ==============

/**
 * Format price with currency
 */
function formatPrice(amount, currencyCode) {
  const currency = currencyCode || (typeof getCurrency === 'function' ? getCurrency() : 'EGP');
  const info = CURRENCIES[currency] || CURRENCIES.EGP;
  const num = Number(amount || 0);
  const formatted = num.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  const isAr = typeof isRTL === 'function' ? isRTL() : true;
  const code = isAr ? (info.codeAr || info.symbol) : currency;
  return `${formatted} ${code}`;
}

/**
 * Format date
 */
function formatDate(dateString, locale) {
  if (!dateString) return '';
  const loc = locale || (typeof getLocale === 'function' ? getLocale() : 'ar');
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';

  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString(loc === 'ar' ? 'ar-EG' : 'en-US', options);
}

/**
 * Format date and time
 */
function formatDateTime(dateString, locale) {
  if (!dateString) return '';
  const loc = locale || (typeof getLocale === 'function' ? getLocale() : 'ar');
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';

  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return date.toLocaleDateString(loc === 'ar' ? 'ar-EG' : 'en-US', options);
}

/**
 * Format time only
 */
function formatTime(dateString, locale) {
  if (!dateString) return '';
  const loc = locale || (typeof getLocale === 'function' ? getLocale() : 'ar');
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';

  return date.toLocaleTimeString(loc === 'ar' ? 'ar-EG' : 'en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = String(str);
  return div.innerHTML;
}

/**
 * Get URL query parameter
 */
function getQueryParam(key) {
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
}

/**
 * Generate slug from text
 */
function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Show toast notification
 */
function showToast(message, type = 'info') {
  const existing = document.getElementById('tarhal-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'tarhal-toast';
  toast.className = `tarhal-toast tarhal-toast-${type}`;
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    background: ${type === 'error' ? '#DC2626' : type === 'success' ? '#16A34A' : '#1E293B'};
    color: white;
    padding: 12px 24px;
    border-radius: 12px;
    font-size: 14px;
    z-index: 9999;
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    max-width: 90%;
    text-align: center;
    animation: toastIn 0.3s ease-out;
  `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'toastOut 0.3s ease-in';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ============== LOGO SVG ==============

/**
 * Returns the Tarhal logo as SVG string
 */
function getLogoSVG(size = 32, variant = 'default') {
  const colors = variant === 'white'
    ? { pin: '#FFFFFF', dot: '#FFFFFF', line: '#FFFFFF' }
    : variant === 'dark'
    ? { pin: '#1E293B', dot: '#1E293B', line: '#1E293B' }
    : { pin: '#DC2626', dot: '#0F766E', line: '#14B8A6' };

  return `
    <svg width="${size}" height="${size * 0.4}" viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg">
      <!-- Line -->
      <line x1="35" y1="40" x2="165" y2="40" stroke="${colors.line}" stroke-width="3" stroke-linecap="round"/>
      <!-- Left pin -->
      <path d="M35 18 C42 18 48 24 48 31 C48 38 35 55 35 55 C35 55 22 38 22 31 C22 24 28 18 35 18 Z" fill="${colors.pin}"/>
      <circle cx="35" cy="31" r="4" fill="#FFFFFF"/>
      <!-- Center dot -->
      <circle cx="100" cy="40" r="6" fill="${colors.dot}"/>
      <!-- Right pin -->
      <path d="M165 18 C172 18 178 24 178 31 C178 38 165 55 165 55 C165 55 152 38 152 31 C152 24 158 18 165 18 Z" fill="${colors.pin}"/>
      <circle cx="165" cy="31" r="4" fill="#FFFFFF"/>
    </svg>
  `;
}

// ============== HEADER ==============

/**
 * Render the shared header
 */
function renderHeader(containerId = 'app-header') {
  const container = document.getElementById(containerId);
  if (!container) return;

  const locale = getLocale();
  const isAr = locale === 'ar';

  container.innerHTML = `
    <header class="tarhal-header">
      <div class="tarhal-header-inner">
        <a href="index.html" class="tarhal-logo" aria-label="Tarhal Home">
          ${getLogoSVG(90)}
          <span class="tarhal-logo-text">${isAr ? 'ترحال' : 'Tarhal'}</span>
        </a>

        <nav class="tarhal-nav-desktop">
          <a href="index.html">${t('nav.home')}</a>
          <a href="trips.html">${t('nav.trips')}</a>
        </nav>

        <div class="tarhal-header-actions">
          <button id="locale-toggle" class="tarhal-locale-btn" aria-label="Switch language">
            ${isAr ? 'EN' : 'ع'}
          </button>

          <div id="auth-actions" class="tarhal-auth-actions">
            <a href="login.html" class="tarhal-btn-text">${t('nav.login')}</a>
            <a href="register.html" class="tarhal-btn-primary-sm">${t('nav.register')}</a>
          </div>

          <div id="user-actions" class="tarhal-user-actions" style="display:none;">
            <a href="my-trips.html" class="tarhal-btn-text">${t('nav.myTrips')}</a>
            <a href="dashboard.html" class="tarhal-btn-text">${t('nav.dashboard')}</a>
            <button id="logout-btn" class="tarhal-btn-text">${t('nav.logout')}</button>
          </div>

          <button id="mobile-menu-btn" class="tarhal-mobile-menu-btn" aria-label="Menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </div>
      </div>

      <div id="mobile-menu" class="tarhal-mobile-menu" style="display:none;">
        <a href="index.html">${t('nav.home')}</a>
        <a href="trips.html">${t('nav.trips')}</a>
        <a href="my-trips.html">${t('nav.myTrips')}</a>
        <a href="dashboard.html">${t('nav.dashboard')}</a>
        <a href="login.html">${t('nav.login')}</a>
        <a href="register.html">${t('nav.register')}</a>

        <div class="menu-settings">
          <div class="menu-settings-title" id="menu-settings-toggle">
            <span>⚙️ ${isAr ? 'الإعدادات' : 'Settings'}</span>
            <span class="menu-settings-arrow" id="menu-settings-arrow">▼</span>
          </div>

          <div class="menu-settings-body" id="menu-settings-body" style="display:none;">
            <div class="menu-setting">
              <label>${isAr ? 'العملة' : 'Currency'}</label>
              <select id="menu-currency" class="menu-select">
                <option value="EGP">🇪🇬 جنيه مصري (ج.م)</option>
                <option value="SAR">🇸🇦 ريال سعودي (ر.س)</option>
                <option value="AED">🇦🇪 درهم إماراتي (د.إ)</option>
                <option value="KWD">🇰🇼 دينار كويتي (د.ك)</option>
                <option value="QAR">🇶🇦 ريال قطري (ر.ق)</option>
                <option value="USD">🇺🇸 دولار أمريكي ($)</option>
                <option value="EUR">🇪🇺 يورو (€)</option>
                <option value="GBP">🇬🇧 جنيه إسترليني (£)</option>
                <option value="TRY">🇹🇷 ليرة تركية (ل.ت)</option>
              </select>
            </div>

            <div class="menu-setting">
              <label>${isAr ? 'الموقع' : 'Location'}</label>
              <select id="menu-country" class="menu-select">
                <option value="EG">🇪🇬 مصر</option>
                <option value="SA">🇸🇦 السعودية</option>
                <option value="AE">🇦🇪 الإمارات</option>
                <option value="KW">🇰🇼 الكويت</option>
                <option value="QA">🇶🇦 قطر</option>
                <option value="BH">🇧🇭 البحرين</option>
                <option value="OM">🇴🇲 عُمان</option>
                <option value="JO">🇯🇴 الأردن</option>
                <option value="LB">🇱🇧 لبنان</option>
                <option value="IQ">🇮🇶 العراق</option>
                <option value="MA">🇲🇦 المغرب</option>
                <option value="DZ">🇩🇿 الجزائر</option>
                <option value="TN">🇹🇳 تونس</option>
                <option value="LY">🇱🇾 ليبيا</option>
                <option value="SD">🇸🇩 السودان</option>
                <option value="TR">🇹🇷 تركيا</option>
                <option value="GB">🇬🇧 بريطانيا</option>
                <option value="FR">🇫🇷 فرنسا</option>
                <option value="DE">🇩🇪 ألمانيا</option>
                <option value="US">🇺🇸 أمريكا</option>
              </select>
            </div>

            <button id="menu-locate-btn" class="menu-locate-btn">
              📍 ${isAr ? 'اكشف موقعي تلقائيًا' : 'Detect my location'}
            </button>
          </div>
        </div>
      </div>
    </header>
  `;

  // ============================================
  // LOCALE TOGGLE
  // ============================================
  document.getElementById('locale-toggle')?.addEventListener('click', () => {
    const newLocale = getLocale() === 'ar' ? 'en' : 'ar';
    setLocale(newLocale);
    window.location.reload();
  });

  // ============================================
  // MOBILE MENU TOGGLE
  // ============================================
  document.getElementById('mobile-menu-btn')?.addEventListener('click', () => {
    const menu = document.getElementById('mobile-menu');
    if (menu) menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
  });

  // ============================================
  // MENU SETTINGS — Toggle Open/Close
  // ============================================
  const settingsToggle = document.getElementById('menu-settings-toggle');
  const settingsBody = document.getElementById('menu-settings-body');

  if (settingsToggle && settingsBody) {
    settingsToggle.addEventListener('click', () => {
      const isOpen = settingsBody.style.display !== 'none';
      settingsBody.style.display = isOpen ? 'none' : 'block';
      settingsToggle.classList.toggle('open', !isOpen);
    });
  }

  // ============================================
  // CURRENCY SELECTOR
  // ============================================
  const currencySelect = document.getElementById('menu-currency');
  if (currencySelect) {
    currencySelect.value = getCurrency();

    currencySelect.addEventListener('change', (e) => {
      const newCurrency = e.target.value;
      setCurrency(newCurrency);

      const countryMap = {
        EGP: 'EG', SAR: 'SA', AED: 'AE', KWD: 'KW',
        QAR: 'QA', USD: 'US', EUR: 'DE', GBP: 'GB', TRY: 'TR',
      };
      if (countryMap[newCurrency]) {
        localStorage.setItem('tarhal_user_country_code', countryMap[newCurrency]);
        const countrySel = document.getElementById('menu-country');
        if (countrySel) countrySel.value = countryMap[newCurrency];
      }

      if (typeof showToast === 'function') {
        showToast(isRTL() ? 'تم تغيير العملة ✅' : 'Currency updated ✅', 'success');
      }

      setTimeout(() => window.location.reload(), 800);
    });
  }

  // ============================================
  // COUNTRY SELECTOR
  // ============================================
  const countrySelect = document.getElementById('menu-country');
  if (countrySelect) {
    const savedCountry = localStorage.getItem('tarhal_user_country_code');
    if (savedCountry) countrySelect.value = savedCountry;

    countrySelect.addEventListener('change', (e) => {
      const newCountry = e.target.value;
      localStorage.setItem('tarhal_user_country_code', newCountry);

      const currencyMap = {
        EG: 'EGP', SA: 'SAR', AE: 'AED', KW: 'KWD', QA: 'QAR',
        BH: 'BHD', OM: 'OMR', JO: 'JOD', LB: 'LBP', IQ: 'IQD',
        MA: 'MAD', DZ: 'DZD', TN: 'TND', LY: 'LYD', SD: 'SDG',
        TR: 'TRY', GB: 'GBP', FR: 'EUR', DE: 'EUR', US: 'USD',
      };
      if (currencyMap[newCountry]) {
        setCurrency(currencyMap[newCountry]);
        if (currencySelect) currencySelect.value = currencyMap[newCountry];
      }

      if (typeof showToast === 'function') {
        showToast(isRTL() ? 'تم تغيير الدولة ✅' : 'Location updated ✅', 'success');
      }

      setTimeout(() => window.location.reload(), 800);
    });
  }

  // ============================================
  // DETECT LOCATION BUTTON
  // ============================================
  const locateBtn = document.getElementById('menu-locate-btn');
  if (locateBtn) {
    locateBtn.addEventListener('click', async () => {
      locateBtn.textContent = isRTL() ? '⏳ جاري الكشف...' : '⏳ Detecting...';
      locateBtn.disabled = true;

      try {
        const detected = await detectUserCountry();
        if (detected && detected.country) {
          localStorage.setItem('tarhal_user_country_code', detected.country);
          setCurrency(detected.currency);

          if (typeof showToast === 'function') {
            showToast(isRTL() ? 'تم كشف موقعك ✅' : 'Location detected ✅', 'success');
          }
          setTimeout(() => window.location.reload(), 800);
        } else {
          throw new Error('No country detected');
        }
      } catch (err) {
        locateBtn.textContent = isRTL() ? '📍 اكشف موقعي تلقائيًا' : '📍 Detect my location';
        locateBtn.disabled = false;
        if (typeof showToast === 'function') {
          showToast(isRTL() ? 'فشل كشف الموقع، جرب تاني' : 'Detection failed, try again', 'error');
        }
      }
    });
  }
}

// ============== FOOTER ==============

/**
 * Render the shared footer
 */
function renderFooter(containerId = 'app-footer') {
  const container = document.getElementById(containerId);
  if (!container) return;

  const isAr = getLocale() === 'ar';

  container.innerHTML = `
    <footer class="tarhal-footer">
      <div class="tarhal-footer-inner">
        <div class="tarhal-footer-brand">
          ${getLogoSVG(100)}
          <div class="tarhal-footer-name">${isAr ? 'ترحال' : 'Tarhal'}</div>
          <div class="tarhal-footer-tagline">${t('app.tagline')}</div>
        </div>

        <div class="tarhal-footer-cols">
          <div class="tarhal-footer-col">
            <h4>${t('nav.home')}</h4>
            <a href="index.html">${t('nav.home')}</a>
            <a href="trips.html">${t('nav.trips')}</a>
          </div>
          <div class="tarhal-footer-col">
            <h4>${t('nav.login')}</h4>
            <a href="login.html">${t('nav.login')}</a>
            <a href="register.html">${t('nav.register')}</a>
          </div>
        </div>
      </div>

      <div class="tarhal-footer-bottom">
        © ${new Date().getFullYear()} ${isAr ? 'ترحال' : 'Tarhal'}
      </div>
    </footer>
  `;
}

// ============== AUTH STATE ==============

/**
 * Check current auth state (placeholder until Supabase is connected)
 */
function getCurrentUser() {
  const mockUser = localStorage.getItem('tarhal_mock_user');
  return mockUser ? JSON.parse(mockUser) : null;
}

/**
 * Update header based on auth state
 */
function updateAuthUI() {
  const user = getCurrentUser();
  const authActions = document.getElementById('auth-actions');
  const userActions = document.getElementById('user-actions');

  if (!authActions || !userActions) return;

  if (user) {
    authActions.style.display = 'none';
    userActions.style.display = 'flex';
  } else {
    authActions.style.display = 'flex';
    userActions.style.display = 'none';
  }

  document.getElementById('logout-btn')?.addEventListener('click', () => {
    localStorage.removeItem('tarhal_mock_user');
    showToast(t('auth.logoutSuccess'));
    setTimeout(() => window.location.href = 'index.html', 800);
  });
}

// ============== INITIALIZATION ==============

/**
 * Initialize common app features on every page
 */
function initApp(options = {}) {
  const {
    withHeader = true,
    withFooter = true,
    withAuthCheck = true,
  } = options;

  const locale = getLocale();
  document.documentElement.lang = locale;
  document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';

  if (withHeader) renderHeader();
  if (withFooter) renderFooter();
  if (withAuthCheck) updateAuthUI();
}

// ============== MOCK DATA ==============

const MOCK_TRIPS = [
  {
    id: '1',
    slug: 'umrah-7-days',
    title_ar: 'عمرة 7 أيام من القاهرة',
    title_en: '7-Day Umrah from Cairo',
    description_ar: 'رحلة عمرة شاملة مع فندق 5 نجوم قريب من الحرم.',
    description_en: 'Complete Umrah trip with 5-star hotel near Haram.',
    cover_url: '',
    base_price: 30000,
    currency: 'EGP',
    days: 7,
    nights: 6,
    destination_country: 'SA',
    trip_type: 'umrah',
    rating_avg: 4.7,
    seats_available: 12,
  },
  {
    id: '2',
    slug: 'turkey-adventure',
    title_ar: 'مغامرة في تركيا 5 أيام',
    title_en: '5-Day Turkey Adventure',
    description_ar: 'رحلة سياحية لاكتشاف إسطنبول وطرابزون.',
    description_en: 'Tour to discover Istanbul and Trabzon.',
    cover_url: '',
    base_price: 22000,
    currency: 'EGP',
    days: 5,
    nights: 4,
    destination_country: 'TR',
    trip_type: 'adventure',
    rating_avg: 4.5,
    seats_available: 8,
  },
  {
    id: '3',
    slug: 'honeymoon-maldives',
    title_ar: 'شهر عسل في المالديف 6 أيام',
    title_en: '6-Day Maldives Honeymoon',
    description_ar: 'إقامة في فيلا على الماء مع أنشطة رومانسية.',
    description_en: 'Water villa stay with romantic activities.',
    cover_url: '',
    base_price: 65000,
    currency: 'EGP',
    days: 6,
    nights: 5,
    destination_country: 'MV',
    trip_type: 'honeymoon',
    rating_avg: 5.0,
    seats_available: 4,
  },
  {
    id: '4',
    slug: 'hajj-package',
    title_ar: 'باقة حج 12 يوم',
    title_en: '12-Day Hajj Package',
    description_ar: 'برنامج حج كامل مع مرشد وإقامة قريبة من المشاعر.',
    description_en: 'Full Hajj program with guide and close accommodation.',
    cover_url: '',
    base_price: 145000,
    currency: 'EGP',
    days: 12,
    nights: 11,
    destination_country: 'SA',
    trip_type: 'hajj',
    rating_avg: 4.9,
    seats_available: 20,
  },
  {
    id: '5',
    slug: 'family-dubai',
    title_ar: 'رحلة عائلية لدبي 4 أيام',
    title_en: '4-Day Family Trip to Dubai',
    description_ar: 'رحلة عائلية تشمل حدائق الألعاب والتسوق.',
    description_en: 'Family trip with theme parks and shopping.',
    cover_url: '',
    base_price: 28000,
    currency: 'EGP',
    days: 4,
    nights: 3,
    destination_country: 'AE',
    trip_type: 'family',
    rating_avg: 4.6,
    seats_available: 15,
  },
  {
    id: '6',
    slug: 'cruise-mediterranean',
    title_ar: 'كروز البحر المتوسط 8 أيام',
    title_en: '8-Day Mediterranean Cruise',
    description_ar: 'كروز فاخر يمر على إيطاليا واليونان.',
    description_en: 'Luxury cruise through Italy and Greece.',
    cover_url: '',
    base_price: 89000,
    currency: 'EGP',
    days: 8,
    nights: 7,
    destination_country: 'IT',
    trip_type: 'cruise',
    rating_avg: 4.8,
    seats_available: 6,
  },
];