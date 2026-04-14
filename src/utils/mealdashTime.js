// Fixed-time utilities for mealdash_gpt to ensure reproducible results
// All dates and time slots are derived from static constants and never from system time

// Use a fixed reference date so that searches/pages are reproducible months later
// YYYY-MM-DD format only; do not compute relative to new Date()
export const FIXED_REFERENCE_DATE = '2025-06-15';

// Number of selectable delivery days from the fixed reference date
export const DEFAULT_SELECTABLE_DAYS = 7;

// Generate a list of fixed delivery dates starting at FIXED_REFERENCE_DATE
// Returns array of ISO date strings: ['2025-06-15', '2025-06-16', ...]
export function getFixedDeliveryDates(numberOfDays = DEFAULT_SELECTABLE_DAYS) {
  const result = [];
  const [yearStr, monthStr, dayStr] = FIXED_REFERENCE_DATE.split('-');
  const baseYear = parseInt(yearStr, 10);
  const baseMonth = parseInt(monthStr, 10) - 1; // JS month index is 0-based
  const baseDay = parseInt(dayStr, 10);

  for (let i = 0; i < numberOfDays; i += 1) {
    // Create a date by adding i days to the fixed reference without using current time
    const date = new Date(Date.UTC(baseYear, baseMonth, baseDay + i));
    const y = date.getUTCFullYear();
    const m = String(date.getUTCMonth() + 1).padStart(2, '0');
    const d = String(date.getUTCDate()).padStart(2, '0');
    result.push(`${y}-${m}-${d}`);
  }
  return result;
}

// Provide fixed half-hour time slots independent of current time
// Example: ['10:00', '10:30', ..., '22:30']
export function getFixedHalfHourTimeSlots(start = '10:00', end = '22:30') {
  const [startH, startM] = start.split(':').map((v) => parseInt(v, 10));
  const [endH, endM] = end.split(':').map((v) => parseInt(v, 10));

  const slots = [];
  const startTotal = startH * 60 + startM;
  const endTotal = endH * 60 + endM;
  for (let t = startTotal; t <= endTotal; t += 30) {
    const h = String(Math.floor(t / 60)).padStart(2, '0');
    const m = String(t % 60).padStart(2, '0');
    slots.push(`${h}:${m}`);
  }
  return slots;
}

// Convenience default slots aligned with DoorDash-like windows
export const DEFAULT_TIME_SLOTS = getFixedHalfHourTimeSlots('10:00', '22:30');

// Helpers to format for display without locale dependencies
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function formatDisplayDate(isoDate) {
  // Parse using UTC so rendering is stable across timezones
  const [y, m, d] = isoDate.split('-').map((v) => parseInt(v, 10));
  const date = new Date(Date.UTC(y, m - 1, d));
  const weekday = WEEKDAYS[date.getUTCDay()];
  const month = MONTHS[date.getUTCMonth()];
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${weekday}, ${month} ${day}`;
}

export function formatDisplayTime(hhmm) {
  const [hStr, mStr] = hhmm.split(':');
  let h = parseInt(hStr, 10);
  const suffix = h >= 12 ? 'PM' : 'AM';
  if (h === 0) h = 12;
  if (h > 12) h -= 12;
  return `${h}:${mStr} ${suffix}`;
}

// Domain-specific utility: map ETA minutes into a human-friendly string like "25-35 min"
export function formatEtaRange(minMinutes, maxMinutes) {
  if (minMinutes === maxMinutes) return `${minMinutes} min`;
  return `${minMinutes}-${maxMinutes} min`;
}

// Domain-specific utility: compute delivery fee label
export function formatDeliveryFee(fee) {
  if (fee === 0) return 'Free delivery';
  return `$${fee.toFixed(2)}`;
}


