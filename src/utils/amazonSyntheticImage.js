const categoryThemes = {
  electronics: { start: '#e3f2fd', end: '#bbdefb', accent: '#1565c0' },
  books: { start: '#f3e5f5', end: '#e1bee7', accent: '#6a1b9a' },
  clothing: { start: '#fff3e0', end: '#ffe0b2', accent: '#ef6c00' },
  'home-garden': { start: '#e8f5e9', end: '#c8e6c9', accent: '#2e7d32' },
  sports: { start: '#fff8e1', end: '#ffecb3', accent: '#f57f17' },
  beauty: { start: '#fce4ec', end: '#f8bbd0', accent: '#ad1457' },
  toys: { start: '#e8eaf6', end: '#c5cae9', accent: '#283593' },
  'pet-supplies': { start: '#ede7f6', end: '#d1c4e9', accent: '#4527a0' },
  grocery: { start: '#f1f8e9', end: '#dcedc8', accent: '#558b2f' },
  automotive: { start: '#eceff1', end: '#cfd8dc', accent: '#37474f' },
  'office-products': { start: '#e0f2f1', end: '#b2dfdb', accent: '#00695c' },
  default: { start: '#f5f5f5', end: '#e0e0e0', accent: '#374151' }
};

const slugToText = (value) => String(value || '').replace(/-/g, ' ').trim();

const escapeXml = (value) =>
  String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const clampText = (value, maxLength) => {
  if (!value) return '';
  const text = String(value).trim();
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 3)}...`;
};

const splitTitle = (title, lineLength = 32, lineCount = 2) => {
  const words = String(title || '').split(/\s+/).filter(Boolean);
  if (!words.length) return ['Amazon Item', ''];

  const lines = [];
  let currentLine = '';
  words.forEach((word) => {
    const candidate = currentLine ? `${currentLine} ${word}` : word;
    if (candidate.length <= lineLength) {
      currentLine = candidate;
      return;
    }
    if (currentLine) {
      lines.push(currentLine);
    }
    currentLine = word;
  });
  if (currentLine) {
    lines.push(currentLine);
  }

  const sliced = lines.slice(0, lineCount).map((line, index) => {
    if (index === lineCount - 1 && lines.length > lineCount) {
      return clampText(line, lineLength - 1);
    }
    return line;
  });

  while (sliced.length < lineCount) {
    sliced.push('');
  }
  return sliced;
};

const hashString = (value) => {
  const source = String(value || '');
  let hash = 0;
  for (let i = 0; i < source.length; i += 1) {
    hash = (hash * 31 + source.charCodeAt(i)) >>> 0;
  }
  return hash;
};

const svgDataUri = (svg) => `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;

export const buildAmazonSyntheticImage = (product = {}) => {
  const theme = categoryThemes[product.category] || categoryThemes.default;
  const title = clampText(product.title || 'Amazon Product', 68);
  const [titleLine1, titleLine2] = splitTitle(title);
  const brand = clampText(product.brand || 'Amazon Marketplace', 24);
  const category = clampText(slugToText(product.category || 'general'), 22);
  const subcategory = clampText(slugToText(product.subcategory || 'featured'), 24);
  const price =
    Number.isFinite(Number(product.price)) && Number(product.price) >= 0
      ? `$${Number(product.price).toFixed(2)}`
      : 'Price unavailable';
  const sku = clampText(String(product.id || 'item').toUpperCase(), 20);

  const seed = hashString(product.id || product.title);
  const barWidth = 120 + (seed % 220);
  const circleX = 620 + (seed % 120);
  const circleY = 210 + (seed % 90);
  const circleR = 54 + (seed % 24);

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800" role="img" aria-label="${escapeXml(
    title
  )}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${theme.start}" />
      <stop offset="100%" stop-color="${theme.end}" />
    </linearGradient>
  </defs>
  <rect width="800" height="800" fill="url(#bg)" />
  <rect x="48" y="56" width="704" height="688" rx="28" fill="#ffffff" fill-opacity="0.9" />
  <rect x="48" y="56" width="${barWidth}" height="12" rx="6" fill="${theme.accent}" fill-opacity="0.72" />
  <circle cx="${circleX}" cy="${circleY}" r="${circleR}" fill="${theme.accent}" fill-opacity="0.16" />
  <rect x="84" y="112" width="210" height="40" rx="20" fill="${theme.accent}" fill-opacity="0.12" />
  <text x="104" y="138" font-family="Arial, sans-serif" font-size="18" font-weight="700" fill="${theme.accent}">${escapeXml(
    brand
  )}</text>

  <text x="84" y="212" font-family="Arial, sans-serif" font-size="30" font-weight="700" fill="#111827">${escapeXml(
    titleLine1
  )}</text>
  <text x="84" y="254" font-family="Arial, sans-serif" font-size="30" font-weight="700" fill="#111827">${escapeXml(
    titleLine2
  )}</text>

  <text x="84" y="322" font-family="Arial, sans-serif" font-size="20" fill="#374151">Category: ${escapeXml(
    category
  )}</text>
  <text x="84" y="358" font-family="Arial, sans-serif" font-size="20" fill="#374151">Type: ${escapeXml(
    subcategory
  )}</text>

  <rect x="84" y="406" width="260" height="84" rx="14" fill="${theme.accent}" fill-opacity="0.12" />
  <text x="104" y="456" font-family="Arial, sans-serif" font-size="36" font-weight="700" fill="${theme.accent}">${escapeXml(
    price
  )}</text>

  <rect x="84" y="536" width="632" height="92" rx="14" fill="#f9fafb" stroke="#d1d5db" />
  <text x="104" y="574" font-family="Arial, sans-serif" font-size="17" fill="#4b5563">AI-composited product image for offline reproducibility</text>
  <text x="104" y="606" font-family="Arial, sans-serif" font-size="17" fill="#4b5563">SKU: ${escapeXml(
    sku
  )}</text>

  <text x="84" y="704" font-family="Arial, sans-serif" font-size="16" fill="#6b7280">Generated for Amazon clone dataset</text>
</svg>
  `.trim();

  return svgDataUri(svg);
};
