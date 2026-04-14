/**
 * 从 DummyJSON API 获取的真实商品数据
 * 图片和商品描述是匹配的
 * 来源: https://dummyjson.com/products
 */

// 智能手机数据
export const smartphones = [
  {
    id: 'dj-iphone-13-pro',
    title: 'iPhone 13 Pro',
    price: 1099.99,
    originalPrice: 1199.99,
    currency: 'USD',
    rating: 4.12,
    reviewCount: 3456,
    boughtInPastMonth: 8500,
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Apple',
    inStock: true,
    stockCount: 56,
    description: 'The iPhone 13 Pro is a cutting-edge smartphone with a powerful camera system, high-performance chip, and stunning display. It offers advanced features for users who demand top-notch technology.',
    features: [
      'Pro camera system with 12MP sensors',
      'A15 Bionic chip',
      'Super Retina XDR display',
      'Ceramic Shield front',
      '5G capable'
    ],
    images: [
      'https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/1.webp',
      'https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/2.webp',
      'https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/3.webp'
    ],
    specifications: {
      'Display': '6.1-inch Super Retina XDR',
      'Chip': 'A15 Bionic',
      'Storage': '128GB/256GB/512GB/1TB',
      'Camera': '12MP Pro camera system',
      'Battery': 'Up to 22 hours video playback'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 2 },
    seller: { name: 'Amazon.com', rating: 4.9, fulfillment: 'Amazon' }
  },
  {
    id: 'dj-iphone-x',
    title: 'iPhone X',
    price: 899.99,
    originalPrice: 1099.99,
    currency: 'USD',
    rating: 2.51,
    reviewCount: 2345,
    boughtInPastMonth: 3200,
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Apple',
    inStock: true,
    stockCount: 37,
    description: 'The iPhone X is a flagship smartphone featuring a bezel-less OLED display, facial recognition technology (Face ID), and impressive performance. It represents a milestone in iPhone design and innovation.',
    features: [
      'Face ID facial recognition',
      'Bezel-less OLED display',
      'A11 Bionic chip',
      'Dual 12MP cameras',
      'Wireless charging'
    ],
    images: [
      'https://cdn.dummyjson.com/product-images/smartphones/iphone-x/1.webp',
      'https://cdn.dummyjson.com/product-images/smartphones/iphone-x/2.webp',
      'https://cdn.dummyjson.com/product-images/smartphones/iphone-x/3.webp'
    ],
    specifications: {
      'Display': '5.8-inch Super Retina OLED',
      'Chip': 'A11 Bionic',
      'Storage': '64GB/256GB',
      'Camera': 'Dual 12MP cameras',
      'Face ID': 'Yes'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 2 },
    seller: { name: 'Apple Store', rating: 4.8, fulfillment: 'Amazon' }
  },
  {
    id: 'dj-samsung-galaxy-s10',
    title: 'Samsung Galaxy S10',
    price: 699.99,
    originalPrice: 799.99,
    currency: 'USD',
    rating: 3.06,
    reviewCount: 4567,
    boughtInPastMonth: 5600,
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Samsung',
    inStock: true,
    stockCount: 19,
    description: 'The Samsung Galaxy S10 is a flagship device featuring a dynamic AMOLED display, versatile camera system, and powerful performance. It represents innovation and excellence in smartphone technology.',
    features: [
      'Dynamic AMOLED display',
      'Triple camera system',
      'Ultrasonic fingerprint sensor',
      'Wireless PowerShare',
      'All-day battery'
    ],
    images: [
      'https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s10/1.webp',
      'https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s10/2.webp',
      'https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s10/3.webp'
    ],
    specifications: {
      'Display': '6.1-inch Dynamic AMOLED',
      'Processor': 'Snapdragon 855',
      'Storage': '128GB/512GB',
      'Camera': '12MP + 12MP + 16MP',
      'Battery': '3400mAh'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 1 },
    seller: { name: 'Samsung Store', rating: 4.7, fulfillment: 'Amazon' }
  },
  {
    id: 'dj-oppo-a57',
    title: 'Oppo A57',
    price: 249.99,
    originalPrice: 279.99,
    currency: 'USD',
    rating: 3.94,
    reviewCount: 1234,
    boughtInPastMonth: 2800,
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Oppo',
    inStock: true,
    stockCount: 19,
    description: 'The Oppo A57 is a mid-range smartphone known for its sleek design and capable features. It offers a balance of performance and affordability, making it a popular choice.',
    features: [
      'Sleek and lightweight design',
      '16MP front camera',
      'Fast fingerprint unlock',
      'Long-lasting battery',
      'ColorOS'
    ],
    images: [
      'https://cdn.dummyjson.com/product-images/smartphones/oppo-a57/1.webp',
      'https://cdn.dummyjson.com/product-images/smartphones/oppo-a57/2.webp',
      'https://cdn.dummyjson.com/product-images/smartphones/oppo-a57/3.webp'
    ],
    specifications: {
      'Display': '5.2-inch IPS LCD',
      'Processor': 'Snapdragon 435',
      'Storage': '32GB',
      'Camera': '13MP rear, 16MP front',
      'Battery': '2900mAh'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 2 },
    seller: { name: 'Oppo Store', rating: 4.5, fulfillment: 'Amazon' }
  },
  {
    id: 'dj-realme-xt',
    title: 'Realme XT',
    price: 349.99,
    originalPrice: 399.99,
    currency: 'USD',
    rating: 4.58,
    reviewCount: 2890,
    boughtInPastMonth: 4200,
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Realme',
    inStock: true,
    stockCount: 80,
    description: 'The Realme XT is a feature-rich smartphone with a focus on camera technology. It comes equipped with advanced camera sensors, delivering high-quality photos and videos for photography enthusiasts.',
    features: [
      '64MP quad camera',
      'Super AMOLED display',
      'In-display fingerprint',
      'VOOC 3.0 fast charging',
      'Snapdragon 712'
    ],
    images: [
      'https://cdn.dummyjson.com/product-images/smartphones/realme-xt/1.webp',
      'https://cdn.dummyjson.com/product-images/smartphones/realme-xt/2.webp',
      'https://cdn.dummyjson.com/product-images/smartphones/realme-xt/3.webp'
    ],
    specifications: {
      'Display': '6.4-inch Super AMOLED',
      'Processor': 'Snapdragon 712',
      'Storage': '64GB/128GB',
      'Camera': '64MP + 8MP + 2MP + 2MP',
      'Battery': '4000mAh'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 3 },
    seller: { name: 'Realme Official', rating: 4.6, fulfillment: 'Amazon' }
  }
];

// 笔记本电脑数据
export const laptops = [
  {
    id: 'dj-macbook-pro-14',
    title: 'Apple MacBook Pro 14 Inch Space Grey',
    price: 1999.99,
    originalPrice: 2199.99,
    currency: 'USD',
    rating: 3.65,
    reviewCount: 5678,
    boughtInPastMonth: 3400,
    category: 'electronics',
    subcategory: 'laptops',
    brand: 'Apple',
    inStock: true,
    stockCount: 24,
    description: 'The MacBook Pro 14 Inch in Space Grey is a powerful and sleek laptop, featuring Apple\'s M1 Pro chip for exceptional performance and a stunning Retina display.',
    features: [
      'Apple M1 Pro chip',
      '14.2-inch Liquid Retina XDR display',
      'Up to 17 hours battery life',
      'MagSafe 3 charging',
      '16GB unified memory'
    ],
    images: [
      'https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/1.webp',
      'https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/2.webp',
      'https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/3.webp'
    ],
    specifications: {
      'Processor': 'Apple M1 Pro',
      'Memory': '16GB unified memory',
      'Storage': '512GB SSD',
      'Display': '14.2-inch Liquid Retina XDR',
      'Battery': 'Up to 17 hours'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 3 },
    seller: { name: 'Amazon.com', rating: 4.9, fulfillment: 'Amazon' }
  },
  {
    id: 'dj-asus-zenbook-pro',
    title: 'Asus Zenbook Pro Dual Screen Laptop',
    price: 1799.99,
    originalPrice: 1999.99,
    currency: 'USD',
    rating: 3.95,
    reviewCount: 2345,
    boughtInPastMonth: 1800,
    category: 'electronics',
    subcategory: 'laptops',
    brand: 'Asus',
    inStock: true,
    stockCount: 45,
    description: 'The Asus Zenbook Pro Dual Screen Laptop is a high-performance device with dual screens, providing productivity and versatility for creative professionals.',
    features: [
      'Dual screen design',
      'Intel Core i7 processor',
      'NVIDIA GeForce RTX graphics',
      '4K OLED touchscreen',
      '32GB RAM'
    ],
    images: [
      'https://cdn.dummyjson.com/product-images/laptops/asus-zenbook-pro-dual-screen-laptop/1.webp',
      'https://cdn.dummyjson.com/product-images/laptops/asus-zenbook-pro-dual-screen-laptop/2.webp',
      'https://cdn.dummyjson.com/product-images/laptops/asus-zenbook-pro-dual-screen-laptop/3.webp'
    ],
    specifications: {
      'Processor': 'Intel Core i7',
      'Memory': '32GB RAM',
      'Storage': '1TB SSD',
      'Display': 'Dual 4K OLED',
      'Graphics': 'NVIDIA GeForce RTX'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 4 },
    seller: { name: 'Asus Store', rating: 4.6, fulfillment: 'Amazon' }
  },
  {
    id: 'dj-dell-xps-13',
    title: 'New DELL XPS 13 9300 Laptop',
    price: 1499.99,
    originalPrice: 1699.99,
    currency: 'USD',
    rating: 2.67,
    reviewCount: 3456,
    boughtInPastMonth: 2600,
    category: 'electronics',
    subcategory: 'laptops',
    brand: 'Dell',
    inStock: true,
    stockCount: 74,
    description: 'The New DELL XPS 13 9300 Laptop is a compact and powerful device, featuring a virtually borderless InfinityEdge display and high-end performance for various tasks.',
    features: [
      'InfinityEdge display',
      'Intel 10th Gen processor',
      'Compact and lightweight',
      'All-day battery life',
      'Thunderbolt 3'
    ],
    images: [
      'https://cdn.dummyjson.com/product-images/laptops/new-dell-xps-13-9300-laptop/1.webp',
      'https://cdn.dummyjson.com/product-images/laptops/new-dell-xps-13-9300-laptop/2.webp',
      'https://cdn.dummyjson.com/product-images/laptops/new-dell-xps-13-9300-laptop/3.webp'
    ],
    specifications: {
      'Processor': 'Intel 10th Gen Core i7',
      'Memory': '16GB LPDDR4x',
      'Storage': '512GB SSD',
      'Display': '13.4-inch InfinityEdge',
      'Weight': '2.8 lbs'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 3 },
    seller: { name: 'Dell Direct', rating: 4.5, fulfillment: 'Amazon' }
  },
  {
    id: 'dj-huawei-matebook-x-pro',
    title: 'Huawei Matebook X Pro',
    price: 1399.99,
    originalPrice: 1549.99,
    currency: 'USD',
    rating: 4.98,
    reviewCount: 4567,
    boughtInPastMonth: 3100,
    category: 'electronics',
    subcategory: 'laptops',
    brand: 'Huawei',
    inStock: true,
    stockCount: 75,
    description: 'The Huawei Matebook X Pro is a slim and stylish laptop with a high-resolution touchscreen display, offering a premium experience for users on the go.',
    features: [
      '3K FullView touchscreen',
      'Intel Core i7 processor',
      'Ultra-slim design',
      'Fingerprint power button',
      'All-day battery'
    ],
    images: [
      'https://cdn.dummyjson.com/product-images/laptops/huawei-matebook-x-pro/1.webp',
      'https://cdn.dummyjson.com/product-images/laptops/huawei-matebook-x-pro/2.webp',
      'https://cdn.dummyjson.com/product-images/laptops/huawei-matebook-x-pro/3.webp'
    ],
    specifications: {
      'Processor': 'Intel Core i7',
      'Memory': '16GB RAM',
      'Storage': '512GB SSD',
      'Display': '13.9-inch 3K touchscreen',
      'Weight': '2.93 lbs'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 2 },
    seller: { name: 'Huawei Store', rating: 4.7, fulfillment: 'Amazon' }
  },
  {
    id: 'dj-lenovo-yoga-920',
    title: 'Lenovo Yoga 920',
    price: 1099.99,
    originalPrice: 1299.99,
    currency: 'USD',
    rating: 2.86,
    reviewCount: 2123,
    boughtInPastMonth: 1500,
    category: 'electronics',
    subcategory: 'laptops',
    brand: 'Lenovo',
    inStock: true,
    stockCount: 40,
    description: 'The Lenovo Yoga 920 is a 2-in-1 convertible laptop with a flexible hinge, allowing you to use it as a laptop or tablet, offering versatility and portability.',
    features: [
      '360-degree hinge',
      '4K UHD touchscreen',
      'Intel 8th Gen Core i7',
      'Thunderbolt 3 ports',
      'Fingerprint reader'
    ],
    images: [
      'https://cdn.dummyjson.com/product-images/laptops/lenovo-yoga-920/1.webp',
      'https://cdn.dummyjson.com/product-images/laptops/lenovo-yoga-920/2.webp',
      'https://cdn.dummyjson.com/product-images/laptops/lenovo-yoga-920/3.webp'
    ],
    specifications: {
      'Processor': 'Intel Core i7-8550U',
      'Memory': '8GB RAM',
      'Storage': '256GB SSD',
      'Display': '13.9-inch 4K UHD',
      'Form Factor': '2-in-1 Convertible'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 3 },
    seller: { name: 'Lenovo', rating: 4.5, fulfillment: 'Amazon' }
  }
];

// 厨房用品数据
export const kitchenAccessories = [
  {
    id: 'dj-microwave-oven',
    title: 'Microwave Oven',
    price: 89.99,
    originalPrice: 109.99,
    currency: 'USD',
    rating: 4.82,
    reviewCount: 8765,
    boughtInPastMonth: 12000,
    category: 'home-garden',
    subcategory: 'kitchen',
    brand: 'Generic',
    inStock: true,
    stockCount: 59,
    description: 'The Microwave Oven is a versatile kitchen appliance for quick and efficient cooking, reheating, and defrosting. Its compact size makes it suitable for various kitchen setups.',
    features: [
      'Multiple power levels',
      'Quick defrost function',
      'Easy-clean interior',
      'Child safety lock',
      'LED display'
    ],
    images: [
      'https://cdn.dummyjson.com/product-images/kitchen-accessories/microwave-oven/1.webp',
      'https://cdn.dummyjson.com/product-images/kitchen-accessories/microwave-oven/2.webp',
      'https://cdn.dummyjson.com/product-images/kitchen-accessories/microwave-oven/3.webp',
      'https://cdn.dummyjson.com/product-images/kitchen-accessories/microwave-oven/4.webp'
    ],
    specifications: {
      'Capacity': '0.9 cu. ft.',
      'Wattage': '900W',
      'Functions': 'Cook, Reheat, Defrost',
      'Display': 'LED',
      'Dimensions': '19 x 14 x 11 inches'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 2 },
    seller: { name: 'Amazon.com', rating: 4.8, fulfillment: 'Amazon' }
  },
  {
    id: 'dj-boxed-blender',
    title: 'Boxed Blender',
    price: 39.99,
    originalPrice: 49.99,
    currency: 'USD',
    rating: 4.56,
    reviewCount: 5432,
    boughtInPastMonth: 8500,
    category: 'home-garden',
    subcategory: 'kitchen',
    brand: 'Generic',
    inStock: true,
    stockCount: 9,
    description: 'The Boxed Blender is a powerful and compact blender perfect for smoothies, shakes, and more. Its convenient design and multiple functions make it a versatile kitchen appliance.',
    features: [
      'Powerful motor',
      'Multiple speed settings',
      'BPA-free pitcher',
      'Easy-clean design',
      'Compact storage'
    ],
    images: [
      'https://cdn.dummyjson.com/product-images/kitchen-accessories/boxed-blender/1.webp',
      'https://cdn.dummyjson.com/product-images/kitchen-accessories/boxed-blender/2.webp',
      'https://cdn.dummyjson.com/product-images/kitchen-accessories/boxed-blender/3.webp',
      'https://cdn.dummyjson.com/product-images/kitchen-accessories/boxed-blender/4.webp'
    ],
    specifications: {
      'Motor': '600W',
      'Capacity': '48 oz',
      'Speeds': '3 + Pulse',
      'Material': 'BPA-free plastic',
      'Warranty': '2 years'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 1 },
    seller: { name: 'Kitchen Essentials', rating: 4.6, fulfillment: 'Amazon' }
  },
  {
    id: 'dj-electric-stove',
    title: 'Electric Stove',
    price: 49.99,
    originalPrice: 59.99,
    currency: 'USD',
    rating: 4.11,
    reviewCount: 3456,
    boughtInPastMonth: 5600,
    category: 'home-garden',
    subcategory: 'kitchen',
    brand: 'Generic',
    inStock: true,
    stockCount: 21,
    description: 'The Electric Stove provides a portable and efficient cooking solution. Ideal for small kitchens or as an additional cooking surface for various culinary needs.',
    features: [
      'Portable design',
      'Adjustable temperature',
      'Cool-touch handles',
      'Easy to clean',
      'Indicator light'
    ],
    images: [
      'https://cdn.dummyjson.com/product-images/kitchen-accessories/electric-stove/1.webp',
      'https://cdn.dummyjson.com/product-images/kitchen-accessories/electric-stove/2.webp',
      'https://cdn.dummyjson.com/product-images/kitchen-accessories/electric-stove/3.webp',
      'https://cdn.dummyjson.com/product-images/kitchen-accessories/electric-stove/4.webp'
    ],
    specifications: {
      'Wattage': '1500W',
      'Surface': 'Cast iron',
      'Temperature': 'Adjustable',
      'Portable': 'Yes',
      'Cord Length': '4 ft'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 2 },
    seller: { name: 'Home & Kitchen', rating: 4.5, fulfillment: 'Amazon' }
  },
  {
    id: 'dj-carbon-steel-wok',
    title: 'Carbon Steel Wok',
    price: 29.99,
    originalPrice: 39.99,
    currency: 'USD',
    rating: 4.05,
    reviewCount: 4321,
    boughtInPastMonth: 7800,
    category: 'home-garden',
    subcategory: 'kitchen',
    brand: 'Generic',
    inStock: true,
    stockCount: 40,
    description: 'The Carbon Steel Wok is a versatile cooking pan suitable for stir-frying, sautéing, and deep frying. Its sturdy construction ensures even heat distribution for delicious meals.',
    features: [
      'Carbon steel construction',
      'Even heat distribution',
      'Traditional flat bottom',
      'Long wooden handle',
      'Pre-seasoned'
    ],
    images: [
      'https://cdn.dummyjson.com/product-images/kitchen-accessories/carbon-steel-wok/1.webp'
    ],
    specifications: {
      'Material': 'Carbon Steel',
      'Diameter': '14 inches',
      'Handle': 'Wooden',
      'Bottom': 'Flat',
      'Seasoned': 'Pre-seasoned'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 1 },
    seller: { name: 'Wok Shop', rating: 4.7, fulfillment: 'Amazon' }
  },
  {
    id: 'dj-hand-blender',
    title: 'Hand Blender',
    price: 34.99,
    originalPrice: 44.99,
    currency: 'USD',
    rating: 3.86,
    reviewCount: 2890,
    boughtInPastMonth: 4500,
    category: 'home-garden',
    subcategory: 'kitchen',
    brand: 'Generic',
    inStock: true,
    stockCount: 84,
    description: 'The Hand Blender is a versatile kitchen appliance for blending, pureeing, and mixing. Its compact design and powerful motor make it a convenient tool for various recipes.',
    features: [
      'Immersion design',
      'Variable speed control',
      'Stainless steel blade',
      'Ergonomic grip',
      'Detachable shaft'
    ],
    images: [
      'https://cdn.dummyjson.com/product-images/kitchen-accessories/hand-blender/1.webp'
    ],
    specifications: {
      'Motor': '400W',
      'Blade': 'Stainless steel',
      'Speeds': 'Variable',
      'Cord': '5 ft',
      'Dishwasher Safe': 'Detachable parts'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 2 },
    seller: { name: 'Kitchen Tools', rating: 4.4, fulfillment: 'Amazon' }
  },
  {
    id: 'dj-chopping-board',
    title: 'Chopping Board',
    price: 12.99,
    originalPrice: 16.99,
    currency: 'USD',
    rating: 3.7,
    reviewCount: 5678,
    boughtInPastMonth: 15000,
    category: 'home-garden',
    subcategory: 'kitchen',
    brand: 'Generic',
    inStock: true,
    stockCount: 14,
    description: 'The Chopping Board is an essential kitchen accessory for food preparation. Made from durable material, it provides a safe and hygienic surface for cutting and chopping.',
    features: [
      'Non-slip design',
      'Easy-grip handles',
      'Juice groove',
      'Dishwasher safe',
      'BPA-free'
    ],
    images: [
      'https://cdn.dummyjson.com/product-images/kitchen-accessories/chopping-board/1.webp'
    ],
    specifications: {
      'Material': 'Bamboo',
      'Size': '15 x 10 inches',
      'Features': 'Juice groove',
      'Dishwasher': 'Safe',
      'BPA Free': 'Yes'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 1 },
    seller: { name: 'Kitchen Basics', rating: 4.5, fulfillment: 'Amazon' }
  },
  {
    id: 'dj-knife-set',
    title: 'Kitchen Knife',
    price: 14.99,
    originalPrice: 19.99,
    currency: 'USD',
    rating: 3.26,
    reviewCount: 3456,
    boughtInPastMonth: 8900,
    category: 'home-garden',
    subcategory: 'kitchen',
    brand: 'Generic',
    inStock: true,
    stockCount: 7,
    description: 'The Knife is an essential kitchen tool for chopping, slicing, and dicing. Its sharp blade and ergonomic handle make it a reliable choice for food preparation.',
    features: [
      'Sharp stainless steel blade',
      'Ergonomic handle',
      'Full tang construction',
      'Easy to sharpen',
      'Balanced weight'
    ],
    images: [
      'https://cdn.dummyjson.com/product-images/kitchen-accessories/knife/1.webp'
    ],
    specifications: {
      'Blade': 'Stainless Steel',
      'Length': '8 inches',
      'Handle': 'Ergonomic',
      'Construction': 'Full tang',
      'Care': 'Hand wash'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 1 },
    seller: { name: 'Cutlery World', rating: 4.3, fulfillment: 'Amazon' }
  },
  {
    id: 'dj-lunch-box',
    title: 'Lunch Box',
    price: 12.99,
    originalPrice: 17.99,
    currency: 'USD',
    rating: 4.93,
    reviewCount: 7890,
    boughtInPastMonth: 22000,
    category: 'home-garden',
    subcategory: 'kitchen',
    brand: 'Generic',
    inStock: true,
    stockCount: 94,
    description: 'The Lunch Box is a convenient and portable container for packing and carrying your meals. With compartments for different foods, it\'s perfect for on-the-go dining.',
    features: [
      'Multiple compartments',
      'Leak-proof design',
      'Microwave safe',
      'BPA-free materials',
      'Easy-carry handle'
    ],
    images: [
      'https://cdn.dummyjson.com/product-images/kitchen-accessories/lunch-box/1.webp'
    ],
    specifications: {
      'Compartments': '3',
      'Material': 'BPA-free plastic',
      'Microwave': 'Safe',
      'Leak-proof': 'Yes',
      'Capacity': '1200ml'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 1 },
    seller: { name: 'Lunch Gear', rating: 4.8, fulfillment: 'Amazon' }
  },
  {
    id: 'dj-bamboo-spatula',
    title: 'Bamboo Spatula',
    price: 7.99,
    originalPrice: 9.99,
    currency: 'USD',
    rating: 3.27,
    reviewCount: 2345,
    boughtInPastMonth: 6700,
    category: 'home-garden',
    subcategory: 'kitchen',
    brand: 'Generic',
    inStock: true,
    stockCount: 37,
    description: 'The Bamboo Spatula is a versatile kitchen tool made from eco-friendly bamboo. Ideal for flipping, stirring, and serving various dishes.',
    features: [
      'Eco-friendly bamboo',
      'Heat resistant',
      'Non-scratch surface',
      'Comfortable grip',
      'Easy to clean'
    ],
    images: [
      'https://cdn.dummyjson.com/product-images/kitchen-accessories/bamboo-spatula/1.webp'
    ],
    specifications: {
      'Material': 'Bamboo',
      'Length': '12 inches',
      'Heat Resistant': 'Up to 400°F',
      'Eco-friendly': 'Yes',
      'Care': 'Hand wash'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 1 },
    seller: { name: 'Eco Kitchen', rating: 4.4, fulfillment: 'Amazon' }
  },
  {
    id: 'dj-citrus-squeezer',
    title: 'Citrus Squeezer Yellow',
    price: 8.99,
    originalPrice: 11.99,
    currency: 'USD',
    rating: 4.63,
    reviewCount: 4567,
    boughtInPastMonth: 9800,
    category: 'home-garden',
    subcategory: 'kitchen',
    brand: 'Generic',
    inStock: true,
    stockCount: 22,
    description: 'The Citrus Squeezer in Yellow is a handy tool for extracting juice from citrus fruits. Its vibrant color adds a cheerful touch to your kitchen gadgets.',
    features: [
      'Efficient juice extraction',
      'Ergonomic handles',
      'Seed catcher',
      'Dishwasher safe',
      'Vibrant yellow color'
    ],
    images: [
      'https://cdn.dummyjson.com/product-images/kitchen-accessories/citrus-squeezer-yellow/1.webp'
    ],
    specifications: {
      'Material': 'Aluminum alloy',
      'Size': 'Standard lemon size',
      'Color': 'Yellow',
      'Dishwasher': 'Safe',
      'Use': 'Lemons, limes'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 1 },
    seller: { name: 'Citrus Tools', rating: 4.6, fulfillment: 'Amazon' }
  },
  {
    id: 'dj-ice-cube-tray',
    title: 'Ice Cube Tray',
    price: 5.99,
    originalPrice: 7.99,
    currency: 'USD',
    rating: 4.71,
    reviewCount: 6789,
    boughtInPastMonth: 18000,
    category: 'home-garden',
    subcategory: 'kitchen',
    brand: 'Generic',
    inStock: true,
    stockCount: 13,
    description: 'The Ice Cube Tray is a practical accessory for making ice cubes in various shapes. Perfect for keeping your drinks cool and adding a fun element to your beverages.',
    features: [
      'Flexible silicone',
      'Easy ice release',
      '15 cube capacity',
      'Stackable design',
      'BPA-free'
    ],
    images: [
      'https://cdn.dummyjson.com/product-images/kitchen-accessories/ice-cube-tray/1.webp'
    ],
    specifications: {
      'Material': 'Silicone',
      'Cubes': '15',
      'BPA Free': 'Yes',
      'Freezer': 'Safe',
      'Stackable': 'Yes'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 1 },
    seller: { name: 'Cool Kitchen', rating: 4.7, fulfillment: 'Amazon' }
  },
  {
    id: 'dj-black-aluminium-cup',
    title: 'Black Aluminium Cup',
    price: 5.99,
    originalPrice: 8.99,
    currency: 'USD',
    rating: 4.46,
    reviewCount: 3456,
    boughtInPastMonth: 11000,
    category: 'home-garden',
    subcategory: 'kitchen',
    brand: 'Generic',
    inStock: true,
    stockCount: 75,
    description: 'The Black Aluminium Cup is a stylish and durable cup suitable for both hot and cold beverages. Its sleek black design adds a modern touch to your drinkware collection.',
    features: [
      'Double-wall insulation',
      'Hot and cold drinks',
      'Lightweight aluminum',
      'Modern black finish',
      'Easy to clean'
    ],
    images: [
      'https://cdn.dummyjson.com/product-images/kitchen-accessories/black-aluminium-cup/1.webp',
      'https://cdn.dummyjson.com/product-images/kitchen-accessories/black-aluminium-cup/2.webp'
    ],
    specifications: {
      'Material': 'Aluminum',
      'Capacity': '12 oz',
      'Insulation': 'Double-wall',
      'Color': 'Black',
      'Care': 'Hand wash'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 1 },
    seller: { name: 'Drinkware Plus', rating: 4.5, fulfillment: 'Amazon' }
  }
];

// 合并所有 DummyJSON 商品
export const allDummyJsonProducts = [
  ...smartphones,
  ...laptops,
  ...kitchenAccessories
];

export default {
  smartphones,
  laptops,
  kitchenAccessories,
  allDummyJsonProducts
};
