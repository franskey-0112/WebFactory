// Stable formatting helpers to avoid SSR/CSR mismatch

const numberFmt = new Intl.NumberFormat('en-US');

export function formatNumber(n) {
  try { return numberFmt.format(Number(n)); } catch { return String(n); }
}

export function formatCurrencyUSD(n) {
  try { return `$${numberFmt.format(Number(n))}`; } catch { return `$${String(n)}`; }
}

export default { formatNumber, formatCurrencyUSD };


