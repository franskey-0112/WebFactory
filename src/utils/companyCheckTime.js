// Fixed-time utilities for companycheck_gpt (Glassdoor-like)

export const COMPANYCHECK_FIXED_NOW_ISO = '2025-06-15T10:00:00.000Z';

export function getFixedNow() {
  return new Date(COMPANYCHECK_FIXED_NOW_ISO);
}

export function formatRelativeOrDate(iso) {
  const dt = new Date(iso);
  const now = getFixedNow();
  const diffMs = now - dt;
  const oneDay = 24 * 3600 * 1000;
  if (diffMs < oneDay) {
    const hours = Math.max(1, Math.floor(diffMs / (3600 * 1000)));
    return `${hours}h`;
  }
  return dt.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
}

export default {
  getFixedNow,
  formatRelativeOrDate,
};


