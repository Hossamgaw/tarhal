// ============================================
// TARHAL — Cities Database (IndexedDB)
// Loads 150,000+ cities from all countries
// ============================================

const CITIES_DB_NAME = 'tarhal_cities_db';
const CITIES_DB_VERSION = 1;
const CITIES_CDN = 'https://cdn.jsdelivr.net/gh/dr5hn/countries-states-cities-database@master/json/cities.min.json';

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
 * Load all cities from CDN and store in IndexedDB
 */
async function loadAllCities(onProgress) {
  if (await isCitiesReady()) return true;

  const res = await fetch(CITIES_CDN);
  if (!res.ok) throw new Error('فشل تحميل المدن');
  const cities = await res.json();

  const db = await openCitiesDB();
  const total = cities.length;
  const batchSize = 500;

  // Clear existing (in case of partial load)
  await new Promise((resolve) => {
    const tx = db.transaction('cities', 'readwrite');
    tx.objectStore('cities').clear();
    tx.oncomplete = resolve;
  });

  for (let i = 0; i < total; i += batchSize) {
    const batch = cities.slice(i, i + batchSize);
    await new Promise((resolve, reject) => {
      const tx = db.transaction('cities', 'readwrite');
      const store = tx.objectStore('cities');
      batch.forEach(c => {
        const name = c.name || c.city || '';
        if (!name) return;
        store.put({
          name: name,
          nameLower: name.toLowerCase(),
          countryCode: c.country_code || c.countryCode || '',
          stateName: c.state_name || c.stateName || c.state || '',
        });
      });
      tx.oncomplete = resolve;
      tx.onerror = () => reject(tx.error);
    });
    if (onProgress) onProgress(Math.min(i + batchSize, total), total);
    // Small delay to avoid blocking UI
    if (i % 5000 === 0) await new Promise(r => setTimeout(r, 0));
  }

  await setCitiesStatus({ loaded: true, count: total, date: Date.now() });
  return true;
}

/**
 * Fast search in IndexedDB
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

/**
 * Get count of stored cities
 */
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