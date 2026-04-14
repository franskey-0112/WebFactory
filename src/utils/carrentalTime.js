// Fixed-time utilities for carrental_gpt to ensure reproducible dates

export const CARRENTAL_GPT_FIXED_NOW_ISO = '2025-06-15T10:00:00.000Z';

export function getFixedNow() {
  return new Date(CARRENTAL_GPT_FIXED_NOW_ISO);
}

export function formatDate(d) {
  const dt = new Date(d);
  const y = dt.getFullYear();
  const m = String(dt.getMonth() + 1).padStart(2, '0');
  const day = String(dt.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`; // YYYY-MM-DD for inputs
}

export function formatTime(d) {
  const dt = new Date(d);
  const hh = String(dt.getHours()).padStart(2, '0');
  const mm = String(dt.getMinutes()).padStart(2, '0');
  return `${hh}:${mm}`;
}

export function formatDateTimeHuman(d) {
  const dt = new Date(d);
  return dt.toLocaleString('en-US', {
    year: 'numeric', month: 'short', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hour12: false,
  });
}

export function addDays(base, days) {
  const dt = new Date(base);
  dt.setDate(dt.getDate() + days);
  return dt;
}

export function ceilRentalDays(pickup, dropoff) {
  const ms = Math.max(0, new Date(dropoff) - new Date(pickup));
  const days = ms / (24 * 3600 * 1000);
  return Math.max(1, Math.ceil(days));
}

export function fixedDateOptions(numDays = 30) {
  const now = getFixedNow();
  const out = [];
  for (let i = 0; i < numDays; i += 1) {
    const d = addDays(now, i);
    out.push({ label: d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }), value: formatDate(d) });
  }
  return out;
}

export function fixedTimeOptions() {
  // 30-min step times from 07:00 to 23:00
  const out = [];
  for (let h = 7; h <= 23; h += 1) {
    for (let m = 0; m < 60; m += 30) {
      const hh = String(h).padStart(2, '0');
      const mm = String(m).padStart(2, '0');
      out.push(`${hh}:${mm}`);
    }
  }
  return out;
}


