// Local storage overlay for carrental_gpt (favorites, recent searches, bookings)

const KEY = 'carrental_gpt_overrides_v1';

function readOverrides() {
  if (typeof window === 'undefined') return { favorites: {}, searches: [], bookings: [] };
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : { favorites: {}, searches: [], bookings: [] };
  } catch {
    return { favorites: {}, searches: [], bookings: [] };
  }
}

function writeOverrides(o) {
  if (typeof window === 'undefined') return;
  try { window.localStorage.setItem(KEY, JSON.stringify(o)); } catch {}
  try { window.dispatchEvent(new CustomEvent('carrental_gpt_overrides_changed')); } catch {}
}

export function getOverlayState() {
  return readOverrides();
}

export function toggleFavorite(carId) {
  const s = readOverrides();
  s.favorites[carId] = !s.favorites[carId];
  writeOverrides(s);
  return !!s.favorites[carId];
}

export function recordSearch(params) {
  const s = readOverrides();
  s.searches.unshift({ ...params, at: new Date().toISOString() });
  s.searches = s.searches.slice(0, 20);
  writeOverrides(s);
}

export function addBooking(booking) {
  const s = readOverrides();
  s.bookings.push(booking);
  writeOverrides(s);
}

export function getBookings() {
  const s = readOverrides();
  return Array.isArray(s.bookings) ? s.bookings : [];
}


