const toArray = (value) => {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (value === undefined || value === null || value === '') return [];
  return [value];
};

const textFromProduct = (product) => {
  const specValues = product.specifications ? Object.values(product.specifications).join(' ') : '';
  return `${product.title || ''} ${product.description || ''} ${specValues}`;
};

const extractWithRegex = (text, regex) => {
  if (!text) return [];
  const matches = text.match(regex) || [];
  return matches.map((item) => item.trim());
};

const normalizedUnique = (values) => {
  const map = new Map();
  values
    .flatMap((item) => toArray(item))
    .map((item) => String(item).trim())
    .filter(Boolean)
    .forEach((value) => {
      const normalized = value.toLowerCase();
      if (!map.has(normalized)) {
        map.set(normalized, value);
      }
    });
  return [...map.values()];
};

const getSpec = (product, key) => product.specifications?.[key] || '';

const getStorageValues = (product) => {
  const text = `${product.storage || ''} ${getSpec(product, 'Storage')} ${textFromProduct(product)}`;
  return normalizedUnique(extractWithRegex(text, /(16GB|32GB|64GB|128GB|256GB|512GB|1TB|2TB)/gi));
};

const getDisplayValues = (product) => {
  const text = `${product.displaySize || ''} ${getSpec(product, 'Display')} ${textFromProduct(product)}`;
  const raw = extractWithRegex(text, /\d{1,2}(?:\.\d)?\s?(?:inch|"|in)/gi).map((value) =>
    value.replace(/\s+/g, ' ').replace('"', ' inch').trim()
  );
  return normalizedUnique(raw);
};

const getRatingBuckets = (product) => {
  if (Array.isArray(product.filterMeta?.customerRatingBuckets) && product.filterMeta.customerRatingBuckets.length > 0) {
    return normalizedUnique(product.filterMeta.customerRatingBuckets);
  }
  const rating = Number(product.rating || 0);
  const buckets = [];
  if (rating >= 1) buckets.push('1 Star & Up');
  if (rating >= 2) buckets.push('2 Stars & Up');
  if (rating >= 3) buckets.push('3 Stars & Up');
  if (rating >= 4) buckets.push('4 Stars & Up');
  return normalizedUnique(buckets);
};

const marketplaceFacetKeys = [
  'primeProgram',
  'deliveryDay',
  'shippingSpeed',
  'sellerName',
  'fulfillment',
  'customerRating',
  'dealBucket',
  'availability'
];

const facetFactory = {
  primeProgram: {
    key: 'primeProgram',
    label: 'Prime',
    getValues: (product) => [product.delivery?.prime ? 'Prime Eligible' : 'Non-Prime']
  },
  deliveryDay: {
    key: 'deliveryDay',
    label: 'Delivery Day',
    getValues: (product) => normalizedUnique([product.delivery?.deliveryDay])
  },
  shippingSpeed: {
    key: 'shippingSpeed',
    label: 'Shipping Speed',
    getValues: (product) => normalizedUnique([product.delivery?.shippingSpeed, product.delivery?.deliveryBucket])
  },
  sellerName: {
    key: 'sellerName',
    label: 'Seller',
    getValues: (product) => normalizedUnique([product.seller?.name])
  },
  fulfillment: {
    key: 'fulfillment',
    label: 'Fulfillment',
    getValues: (product) =>
      normalizedUnique([product.filterMeta?.fulfillment, product.seller?.fulfillment === 'Amazon' ? 'Fulfilled by Amazon' : 'Ships from Seller'])
  },
  customerRating: {
    key: 'customerRating',
    label: 'Customer Review',
    getValues: (product) => getRatingBuckets(product)
  },
  dealBucket: {
    key: 'dealBucket',
    label: 'Deals & Discounts',
    getValues: (product) => normalizedUnique([product.filterMeta?.dealBucket])
  },
  availability: {
    key: 'availability',
    label: 'Availability',
    getValues: (product) => normalizedUnique([product.filterMeta?.availability])
  },
  subcategory: {
    key: 'subcategory',
    label: 'Subcategory',
    getValues: (product) => normalizedUnique([product.subcategory])
  },
  condition: {
    key: 'condition',
    label: 'Condition',
    getValues: (product) => normalizedUnique([product.condition, getSpec(product, 'Condition') || 'New'])
  },
  storage: {
    key: 'storage',
    label: 'Storage Capacity',
    getValues: (product) => getStorageValues(product)
  },
  display: {
    key: 'display',
    label: 'Screen Size',
    getValues: (product) => getDisplayValues(product)
  },
  connectivity: {
    key: 'connectivity',
    label: 'Connectivity',
    getValues: (product) => normalizedUnique([product.connectivity, getSpec(product, 'Connectivity')])
  },
  format: {
    key: 'format',
    label: 'Format',
    getValues: (product) => normalizedUnique([product.format, getSpec(product, 'Format')])
  },
  language: {
    key: 'language',
    label: 'Language',
    getValues: (product) => normalizedUnique([product.language, getSpec(product, 'Language')])
  },
  author: {
    key: 'author',
    label: 'Author',
    getValues: (product) => normalizedUnique([product.author, getSpec(product, 'Author')])
  },
  size: {
    key: 'size',
    label: 'Size',
    getValues: (product) => normalizedUnique([product.size, product.sizes, getSpec(product, 'Size')])
  },
  color: {
    key: 'color',
    label: 'Color',
    getValues: (product) => normalizedUnique([product.color, product.colors, getSpec(product, 'Color')])
  },
  material: {
    key: 'material',
    label: 'Material',
    getValues: (product) => normalizedUnique([product.material, getSpec(product, 'Material')])
  },
  capacity: {
    key: 'capacity',
    label: 'Capacity',
    getValues: (product) => normalizedUnique([product.capacity, getSpec(product, 'Capacity')])
  },
  petType: {
    key: 'petType',
    label: 'Pet Type',
    getValues: (product) => normalizedUnique([product.petType, getSpec(product, 'Pet Type')])
  },
  ageRange: {
    key: 'ageRange',
    label: 'Age Range',
    getValues: (product) => normalizedUnique([product.ageRange, getSpec(product, 'Age Range')])
  },
  diet: {
    key: 'diet',
    label: 'Dietary Preference',
    getValues: (product) => normalizedUnique([product.diet, getSpec(product, 'Dietary Preference')])
  },
  vehicleType: {
    key: 'vehicleType',
    label: 'Vehicle Type',
    getValues: (product) => normalizedUnique([product.vehicleType, getSpec(product, 'Vehicle Type')])
  },
  skinType: {
    key: 'skinType',
    label: 'Skin Type',
    getValues: (product) => normalizedUnique([product.skinType, getSpec(product, 'Skin Type')])
  },
  hairType: {
    key: 'hairType',
    label: 'Hair Type',
    getValues: (product) => normalizedUnique([product.hairType, getSpec(product, 'Hair Type')])
  }
};

const categoryFacetKeyMap = {
  electronics: [...marketplaceFacetKeys, 'condition', 'storage', 'display', 'connectivity', 'color', 'subcategory'],
  books: [...marketplaceFacetKeys, 'format', 'language', 'author', 'condition', 'subcategory'],
  clothing: [...marketplaceFacetKeys, 'size', 'color', 'material', 'condition', 'subcategory'],
  'home-garden': [...marketplaceFacetKeys, 'material', 'capacity', 'condition', 'color', 'subcategory'],
  sports: [...marketplaceFacetKeys, 'subcategory', 'material', 'size', 'condition', 'color'],
  beauty: [...marketplaceFacetKeys, 'subcategory', 'skinType', 'hairType', 'color', 'condition'],
  toys: [...marketplaceFacetKeys, 'subcategory', 'ageRange', 'condition'],
  'pet-supplies': [...marketplaceFacetKeys, 'subcategory', 'petType', 'condition', 'size'],
  grocery: [...marketplaceFacetKeys, 'subcategory', 'diet', 'condition', 'size'],
  automotive: [...marketplaceFacetKeys, 'subcategory', 'vehicleType', 'material', 'condition'],
  'office-products': [...marketplaceFacetKeys, 'subcategory', 'color', 'material', 'condition', 'size']
};

export const resolveDominantCategory = (products) => {
  if (!products?.length) return null;
  const counter = new Map();
  products.forEach((product) => {
    const key = product.category;
    if (!key) return;
    counter.set(key, (counter.get(key) || 0) + 1);
  });
  if (!counter.size) return null;
  return [...counter.entries()].sort((a, b) => b[1] - a[1])[0][0];
};

export const buildFacetDefinitions = (activeCategory, products) => {
  const facetKeys = categoryFacetKeyMap[activeCategory] || [...marketplaceFacetKeys, 'subcategory', 'condition'];

  return facetKeys
    .map((facetKey) => facetFactory[facetKey])
    .filter(Boolean)
    .map((definition) => {
      const counts = new Map();
      products.forEach((product) => {
        definition.getValues(product).forEach((value) => {
          counts.set(value, (counts.get(value) || 0) + 1);
        });
      });

      const values = [...counts.entries()]
        .sort((a, b) => {
          if (b[1] !== a[1]) return b[1] - a[1];
          return a[0].localeCompare(b[0]);
        })
        .map(([value]) => value)
        .slice(0, 14);

      return {
        ...definition,
        values
      };
    })
    .filter((definition) => definition.values.length > 1);
};

export const matchDynamicFacets = (product, facetDefinitions, selections) =>
  facetDefinitions.every((definition) => {
    const selected = selections[definition.key] || [];
    if (!selected.length) return true;
    const productValues = definition.getValues(product);
    return selected.some((value) => productValues.includes(value));
  });
