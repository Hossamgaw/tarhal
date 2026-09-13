// ============================================
// TARHAL — Cities Database (IndexedDB)
// Loads from countriesnow.tech (per-country)
// ============================================

const CITIES_DB_NAME = 'tarhal_cities_db_v2';
const CITIES_DB_VERSION = 1;

let _dbPromise = null;

function openCitiesDB() {
  if (_dbPromise) return _dbPromise;
  _dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(CITIES_DB_NAME, CITIES_DB_VERSION);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('cities')) {
        const store = db.createObjectStore('cities', { keyPath: 'id', autoIncrement: true });
        store.createIndex('nameLower', 'nameLower', { unique: false });
      }
      if (!db.objectStoreNames.contains('meta')) {
        db.createObjectStore('meta', { keyPath: 'key' });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  return _dbPromise;
}

async function isCitiesReady() {
  try {
    const db = await openCitiesDB();
    return new Promise((resolve) => {
      const tx = db.transaction('meta', 'readonly');
      const req = tx.objectStore('meta').get('status');
      req.onsuccess = () => resolve(!!(req.result && req.result.loaded));
      req.onerror = () => resolve(false);
    });
  } catch (e) { return false; }
}

async function setCitiesStatus(data) {
  const db = await openCitiesDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('meta', 'readwrite');
    tx.objectStore('meta').put({ key: 'status', ...data });
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
  });
}

async function getCitiesStatus() {
  try {
    const db = await openCitiesDB();
    return new Promise((resolve) => {
      const tx = db.transaction('meta', 'readonly');
      const req = tx.objectStore('meta').get('status');
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  } catch (e) { return null; }
}

/**
 * Fetch cities for one country from countriesnow.tech
 */
async function fetchCitiesForCountry(countryNameEn) {
  const res = await fetch('https://countriesnow.tech/api/v1/cities', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ country: countryNameEn }),
  });
  if (!res.ok) throw new Error('HTTP ' + res.status);
  const data = await res.json();
  return (data.data || []).map(name => ({ name }));
}

/**
 * Save one country's cities to IndexedDB
 */
async function saveCitiesToDB(cities, countryCode) {
  const db = await openCitiesDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('cities', 'readwrite');
    const store = tx.objectStore('cities');
    cities.forEach(c => {
      if (!c.name) return;
      store.put({
        name: c.name,
        nameLower: c.name.toLowerCase(),
        countryCode: countryCode,
      });
    });
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
  });
}

/**
 * Mark a country as loaded
 */
async function markCountryLoaded(code) {
  const db = await openCitiesDB();
  return new Promise((resolve) => {
    const tx = db.transaction('meta', 'readwrite');
    tx.objectStore('meta').put({ key: 'country_' + code, loaded: true });
    tx.oncomplete = resolve;
  });
}

async function isCountryLoaded(code) {
  try {
    const db = await openCitiesDB();
    return new Promise((resolve) => {
      const tx = db.transaction('meta', 'readonly');
      const req = tx.objectStore('meta').get('country_' + code);
      req.onsuccess = () => resolve(!!(req.result && req.result.loaded));
      req.onerror = () => resolve(false);
    });
  } catch (e) { return false; }
}

/**
 * Load cities for ALL countries (progressive)
 */
async function loadAllCities(onProgress) {
  if (await isCitiesReady()) return true;

  const countries = await loadCountries();
  const total = countries.length;
  let done = 0;
  let totalCities = 0;

  // Process in batches of 5 (parallel)
  const batchSize = 5;

  for (let i = 0; i < countries.length; i += batchSize) {
    const batch = countries.slice(i, i + batchSize);

    await Promise.all(batch.map(async (country) => {
      // Skip if already loaded
      if (await isCountryLoaded(country.code)) {
        done++;
        if (onProgress) onProgress(done, total, totalCities);
        return;
      }

      try {
        const cities = await fetchCitiesForCountry(country.nameEn);
        if (cities.length > 0) {
          await saveCitiesToDB(cities, country.code);
          totalCities += cities.length;
        }
        await markCountryLoaded(country.code);
      } catch (err) {
        console.warn('Failed cities for', country.code, err);
      }

      done++;
      if (onProgress) onProgress(done, total, totalCities);
    }));

    // Small delay between batches to be nice to the API
    await new Promise(r => setTimeout(r, 100));
  }

  await setCitiesStatus({ loaded: true, count: totalCities, date: Date.now() });
  return true;
}

/**
 * Search cities in IndexedDB
 */
async function searchCitiesIndexed(query, limit = 30) {
  if (!query || query.length < 2) return [];
  const db = await openCitiesDB();
  const q = query.toLowerCase();

  return new Promise((resolve) => {
    const results = [];
    const tx = db.transaction('cities', 'readonly');
    const store = tx.objectStore('cities');
    const index = store.index('nameLower');
    const range = IDBKeyRange.bound(q, q + '\uffff');
    const req = index.openCursor(range);
    req.onsuccess = (e) => {
      const cursor = e.target.result;
      if (cursor && results.length < limit) {
        results.push(cursor.value);
        cursor.continue();
      } else {
        resolve(results);
      }
    };
    req.onerror = () => resolve([]);
  });
}

async function getCitiesCount() {
  try {
    const db = await openCitiesDB();
    return new Promise((resolve) => {
      const tx = db.transaction('cities', 'readonly');
      const req = tx.objectStore('cities').count();
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(0);
    });
  } catch (e) { return 0; }
}