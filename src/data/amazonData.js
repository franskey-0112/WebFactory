/**
 * Amazon网站静态数据
 * 包含商品信息、分类信息、用户数据等
 */

// 导入 DummyJSON 真实商品数据（图片与描述匹配）
import { allDummyJsonProducts } from './dummyJsonProducts';

// 商品分类
export const categories = [
  {
    id: 'electronics',
    name: 'Electronics',
    subcategories: [
      { id: 'smartphones', name: 'Smartphones' },
      { id: 'laptops', name: 'Laptops' },
      { id: 'tablets', name: 'Tablets' },
      { id: 'headphones', name: 'Headphones' },
      { id: 'cameras', name: 'Cameras' },
      { id: 'gaming', name: 'Gaming' },
      { id: 'accessories', name: 'Accessories' }
    ]
  },
  {
    id: 'books',
    name: 'Books',
    subcategories: [
      { id: 'fiction', name: 'Fiction' },
      { id: 'non-fiction', name: 'Non-Fiction' },
      { id: 'textbooks', name: 'Textbooks' },
      { id: 'children', name: "Children's Books" },
      { id: 'comics', name: 'Comics & Graphic Novels' }
    ]
  },
  {
    id: 'home-garden',
    name: 'Home & Garden',
    subcategories: [
      { id: 'furniture', name: 'Furniture' },
      { id: 'kitchen', name: 'Kitchen & Dining' },
      { id: 'tools', name: 'Tools & Hardware' },
      { id: 'garden', name: 'Garden & Outdoor' },
      { id: 'bedding', name: 'Bedding' }
    ]
  },
  {
    id: 'clothing',
    name: 'Clothing, Shoes & Jewelry',
    subcategories: [
      { id: 'mens-clothing', name: "Men's Clothing" },
      { id: 'womens-clothing', name: "Women's Clothing" },
      { id: 'shoes', name: 'Shoes' },
      { id: 'jewelry', name: 'Jewelry' },
      { id: 'watches', name: 'Watches' }
    ]
  },
  {
    id: 'sports',
    name: 'Sports & Outdoors',
    subcategories: [
      { id: 'fitness', name: 'Fitness & Exercise' },
      { id: 'outdoor-recreation', name: 'Outdoor Recreation' },
      { id: 'sports-equipment', name: 'Sports Equipment' },
      { id: 'water-sports', name: 'Water Sports' }
    ]
  }
];

// 商品数据
export const products = [
  // Electronics - Smartphones
  {
    id: 'iphone-15-pro',
    title: 'iPhone 15 Pro 128GB - Natural Titanium',
    price: 999.00,
    originalPrice: 1099.00,
    currency: 'USD',
    rating: 4.5,
    reviewCount: 2847,
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Apple',
    inStock: true,
    stockCount: 47,
    description: 'The most advanced iPhone ever. Featuring the powerful A17 Pro chip, ProCamera system, and titanium design.',
    features: [
      'A17 Pro chip with 6-core GPU',
      'Pro camera system with 48MP Main camera',
      'Titanium design',
      'USB-C connectivity',
      'iOS 17'
    ],
    images: [
      '/images/amazon/products/electronics/smartphones/iphone-15-pro-1.jpg',
      '/images/amazon/products/electronics/smartphones/iphone-15-pro-2.jpg',
      '/images/amazon/products/electronics/smartphones/iphone-15-pro-3.jpg'
    ],
    specifications: {
      'Display': '6.1-inch Super Retina XDR',
      'Chip': 'A17 Pro',
      'Storage': '128GB',
      'Camera': '48MP Pro camera system',
      'Battery': 'Up to 23 hours video playback',
      'Color': 'Natural Titanium'
    },
    delivery: {
      prime: true,
      freeShipping: true,
      estimatedDays: 2
    },
    seller: {
      name: 'Amazon.com',
      rating: 4.8,
      fulfillment: 'Amazon'
    }
  },
  {
    id: 'samsung-galaxy-s24',
    title: 'Samsung Galaxy S24 256GB - Phantom Black',
    price: 849.99,
    originalPrice: 949.99,
    currency: 'USD',
    rating: 4.4,
    reviewCount: 1923,
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Samsung',
    inStock: true,
    stockCount: 23,
    description: 'Experience the power of Galaxy AI with the Samsung Galaxy S24. Advanced cameras, stunning display, and all-day battery.',
    features: [
      'Galaxy AI features',
      '50MP Triple Camera System',
      '6.2" Dynamic AMOLED 2X Display',
      'Snapdragon 8 Gen 3',
      'All-day battery with super fast charging'
    ],
    images: [
      '/images/amazon/products/electronics/smartphones/samsung-galaxy-s24-1.jpg',
      '/images/amazon/products/electronics/smartphones/samsung-galaxy-s24-2.jpg'
    ],
    specifications: {
      'Display': '6.2" Dynamic AMOLED 2X',
      'Processor': 'Snapdragon 8 Gen 3',
      'Storage': '256GB',
      'Camera': '50MP + 12MP + 10MP',
      'Battery': '4000mAh',
      'Color': 'Phantom Black'
    },
    delivery: {
      prime: true,
      freeShipping: true,
      estimatedDays: 1
    },
    seller: {
      name: 'Samsung Store',
      rating: 4.7,
      fulfillment: 'Amazon'
    }
  },

  // Electronics - Laptops
  {
    id: 'macbook-air-m3',
    title: 'Apple MacBook Air 13-inch M3 Chip, 8GB RAM, 256GB SSD - Midnight',
    price: 1299.00,
    originalPrice: 1399.00,
    currency: 'USD',
    rating: 4.7,
    reviewCount: 1456,
    category: 'electronics',
    subcategory: 'laptops',
    brand: 'Apple',
    inStock: true,
    stockCount: 12,
    description: 'The most powerful and efficient MacBook Air ever. With the M3 chip, up to 18 hours of battery life, and a stunning Liquid Retina display.',
    features: [
      'Apple M3 chip with 8-core CPU',
      '13.6-inch Liquid Retina display',
      'Up to 18 hours battery life',
      'MagSafe 3 charging port',
      'macOS Sonoma'
    ],
    images: [
      '/images/amazon/products/electronics/laptops/macbook-air-m3-1.jpg',
      '/images/amazon/products/electronics/laptops/macbook-air-m3-2.jpg'
    ],
    specifications: {
      'Processor': 'Apple M3 chip',
      'Memory': '8GB unified memory',
      'Storage': '256GB SSD',
      'Display': '13.6-inch Liquid Retina',
      'Graphics': '8-core GPU',
      'Color': 'Midnight'
    },
    delivery: {
      prime: true,
      freeShipping: true,
      estimatedDays: 3
    },
    seller: {
      name: 'Amazon.com',
      rating: 4.8,
      fulfillment: 'Amazon'
    }
  },
  {
    id: 'dell-xps-13',
    title: 'Dell XPS 13 Laptop, Intel Core i7-1360P, 16GB RAM, 512GB SSD, 13.4" FHD+',
    price: 1199.99,
    originalPrice: 1399.99,
    currency: 'USD',
    rating: 4.3,
    reviewCount: 892,
    category: 'electronics',
    subcategory: 'laptops',
    brand: 'Dell',
    inStock: true,
    stockCount: 8,
    description: 'Premium ultrabook with stunning InfinityEdge display, powerful Intel processor, and all-day battery life.',
    features: [
      'Intel Core i7-1360P processor',
      '13.4" FHD+ InfinityEdge display',
      '16GB LPDDR5 RAM',
      '512GB PCIe NVMe SSD',
      'Windows 11 Home'
    ],
    images: [
      '/images/amazon/products/electronics/laptops/dell-xps-13-1.jpg',
      '/images/amazon/products/electronics/laptops/dell-xps-13-2.jpg'
    ],
    specifications: {
      'Processor': 'Intel Core i7-1360P',
      'Memory': '16GB LPDDR5',
      'Storage': '512GB PCIe SSD',
      'Display': '13.4" FHD+ (1920x1200)',
      'Graphics': 'Intel Iris Xe',
      'Operating System': 'Windows 11 Home'
    },
    delivery: {
      prime: false,
      freeShipping: true,
      estimatedDays: 5
    },
    seller: {
      name: 'Dell Direct',
      rating: 4.6,
      fulfillment: 'Merchant'
    }
  },

  // Books
  {
    id: 'atomic-habits',
    title: 'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones',
    price: 13.99,
    originalPrice: 18.00,
    currency: 'USD',
    rating: 4.8,
    reviewCount: 87432,
    category: 'books',
    subcategory: 'non-fiction',
    brand: 'Random House Business',
    inStock: true,
    stockCount: 156,
    author: 'James Clear',
    description: 'The #1 New York Times bestseller. Over 15 million copies sold! Tiny Changes, Remarkable Results.',
    features: [
      'New York Times Bestseller',
      'Over 15 million copies sold worldwide',
      'Practical strategies for building good habits',
      'Based on scientific research',
      'Paperback edition'
    ],
    images: [
      '/images/amazon/products/books/non-fiction/atomic-habits-1.jpg',
      '/images/amazon/products/books/non-fiction/atomic-habits-2.jpg'
    ],
    specifications: {
      'Author': 'James Clear',
      'Publisher': 'Random House Business',
      'Publication Date': 'October 16, 2018',
      'Pages': '320',
      'Language': 'English',
      'Format': 'Paperback'
    },
    delivery: {
      prime: true,
      freeShipping: true,
      estimatedDays: 2
    },
    seller: {
      name: 'Amazon.com',
      rating: 4.8,
      fulfillment: 'Amazon'
    }
  },
  {
    id: 'fourth-wing',
    title: 'Fourth Wing (The Empyrean Book 1)',
    price: 12.89,
    originalPrice: 16.99,
    currency: 'USD',
    rating: 4.6,
    reviewCount: 34567,
    category: 'books',
    subcategory: 'fiction',
    brand: 'Red Tower Books',
    inStock: true,
    stockCount: 89,
    author: 'Rebecca Yarros',
    description: 'The instant #1 New York Times bestseller. A captivating fantasy romance that will leave you breathless.',
    features: [
      '#1 New York Times Bestseller',
      'BookTok sensation',
      'Fantasy romance novel',
      'First book in The Empyrean series',
      'Paperback edition'
    ],
    images: [
      '/images/amazon/products/books/fiction/fourth-wing-1.jpg',
      '/images/amazon/products/books/fiction/fourth-wing-2.jpg'
    ],
    specifications: {
      'Author': 'Rebecca Yarros',
      'Publisher': 'Red Tower Books',
      'Publication Date': 'May 2, 2023',
      'Pages': '498',
      'Language': 'English',
      'Format': 'Paperback'
    },
    delivery: {
      prime: true,
      freeShipping: true,
      estimatedDays: 1
    },
    seller: {
      name: 'Amazon.com',
      rating: 4.8,
      fulfillment: 'Amazon'
    }
  },

  // Home & Garden
  {
    id: 'instant-pot-duo',
    title: 'Instant Pot Duo 7-in-1 Electric Pressure Cooker, 6 Quart',
    price: 79.95,
    originalPrice: 99.95,
    currency: 'USD',
    rating: 4.6,
    reviewCount: 145678,
    category: 'home-garden',
    subcategory: 'kitchen',
    brand: 'Instant Pot',
    inStock: true,
    stockCount: 234,
    description: 'Americas #1 Selling Multi-Cooker. 7 appliances in 1: Pressure Cooker, Slow Cooker, Rice Cooker, Steamer, Sauté, Yogurt Maker & Warmer.',
    features: [
      '7-in-1 functionality',
      '6 Quart capacity',
      '14 Smart Programs',
      'Stainless steel cooking pot',
      'Free Instant Pot app with 1900+ recipes'
    ],
    images: [
      '/images/amazon/products/home-garden/kitchen/instant-pot-duo-1.jpg',
      '/images/amazon/products/home-garden/kitchen/instant-pot-duo-2.jpg'
    ],
    specifications: {
      'Capacity': '6 Quart',
      'Functions': '7-in-1 Multi-Cooker',
      'Material': 'Stainless Steel',
      'Programs': '14 Smart Programs',
      'Dimensions': '13.43 x 12.8 x 12.2 inches',
      'Weight': '11.8 pounds'
    },
    delivery: {
      prime: true,
      freeShipping: true,
      estimatedDays: 1
    },
    seller: {
      name: 'Instant Pot Store',
      rating: 4.8,
      fulfillment: 'Amazon'
    }
  },

  // Clothing
  {
    id: 'levi-501-jeans',
    title: "Levi's Men's 501 Original Fit Jeans",
    price: 59.50,
    originalPrice: 69.50,
    currency: 'USD',
    rating: 4.4,
    reviewCount: 12847,
    category: 'clothing',
    subcategory: 'mens-clothing',
    brand: "Levi's",
    inStock: true,
    stockCount: 78,
    description: 'The original blue jean since 1873. Straight leg fit with a button fly.',
    features: [
      'Original 501 fit since 1873',
      'Straight leg',
      'Button fly',
      '100% Cotton denim',
      'Available in multiple washes'
    ],
    images: [
      '/images/amazon/products/clothing/mens-clothing/levi-501-1.jpg',
      '/images/amazon/products/clothing/mens-clothing/levi-501-2.jpg'
    ],
    specifications: {
      'Brand': "Levi's",
      'Style': '501 Original Fit',
      'Material': '100% Cotton',
      'Fit': 'Straight Leg',
      'Closure': 'Button Fly',
      'Care': 'Machine Wash'
    },
    sizes: ['28x30', '29x30', '30x30', '30x32', '31x30', '32x30', '32x32', '33x30', '34x30', '34x32', '36x30', '36x32'],
    colors: ['Dark Stonewash', 'Medium Stonewash', 'Light Stonewash', 'Rigid', 'Black'],
    delivery: {
      prime: true,
      freeShipping: true,
      estimatedDays: 2
    },
    seller: {
      name: "Levi's Store",
      rating: 4.7,
      fulfillment: 'Amazon'
    }
  },

  // Sports & Outdoors
  {
    id: 'yeti-tumbler',
    title: 'YETI Rambler 20 oz Tumbler, Stainless Steel, Vacuum Insulated with MagSlider Lid',
    price: 35.00,
    originalPrice: 40.00,
    currency: 'USD',
    rating: 4.8,
    reviewCount: 45982,
    category: 'sports',
    subcategory: 'outdoor-recreation',
    brand: 'YETI',
    inStock: true,
    stockCount: 167,
    description: 'The YETI Rambler Tumbler with MagSlider Lid is the toughest, most over-engineered camp cup out there.',
    features: [
      '18/8 stainless steel construction',
      'Double-wall vacuum insulation',
      'MagSlider Lid',
      'Dishwasher safe',
      'No Sweat Design'
    ],
    images: [
      '/images/amazon/products/sports/outdoor-recreation/yeti-tumbler-1.jpg',
      '/images/amazon/products/sports/outdoor-recreation/yeti-tumbler-2.jpg'
    ],
    specifications: {
      'Capacity': '20 oz',
      'Material': '18/8 Stainless Steel',
      'Insulation': 'Double-Wall Vacuum',
      'Lid': 'MagSlider',
      'Dimensions': '6.875" H x 3.5" W',
      'Weight': '1.1 pounds'
    },
    colors: ['Navy', 'Black', 'White', 'Charcoal', 'Seafoam', 'Stainless'],
    delivery: {
      prime: true,
      freeShipping: true,
      estimatedDays: 2
    },
    seller: {
      name: 'YETI Store',
      rating: 4.9,
      fulfillment: 'Amazon'
    }
  }
  ,

  // Electronics - Accessories (images available under /images/amazon/accessories)
  {
    id: 'apple-case-iphone-15',
    title: 'Apple iPhone 15 Clear Case with MagSafe',
    price: 49.00,
    originalPrice: 59.00,
    currency: 'USD',
    rating: 4.6,
    reviewCount: 5123,
    category: 'electronics',
    subcategory: 'accessories',
    brand: 'Apple',
    inStock: true,
    stockCount: 120,
    description: 'Crystal-clear protection with built-in magnets for easy MagSafe attachment and faster wireless charging.',
    features: [
      'MagSafe compatible',
      'Scratch-resistant coating',
      'Precision fit for iPhone 15',
      'Supports wireless charging',
      'Raised edges for screen and camera protection'
    ],
    images: [
      '/images/amazon/accessories/case.jpg'
    ],
    specifications: {
      'Compatibility': 'iPhone 15',
      'Material': 'Polycarbonate and flexible materials',
      'Wireless Charging': 'Supported',
      'MagSafe': 'Yes',
      'Color': 'Clear'
    },
    delivery: {
      prime: true,
      freeShipping: true,
      estimatedDays: 1
    },
    seller: {
      name: 'Amazon.com',
      rating: 4.8,
      fulfillment: 'Amazon'
    }
  },
  {
    id: 'apple-charger-usbc',
    title: 'Apple 20W USB‑C Power Adapter',
    price: 17.99,
    originalPrice: 19.99,
    currency: 'USD',
    rating: 4.7,
    reviewCount: 28452,
    category: 'electronics',
    subcategory: 'accessories',
    brand: 'Apple',
    inStock: true,
    stockCount: 350,
    description: 'Fast and efficient charging at home, in the office, or on the go for iPhone, iPad, and more.',
    features: [
      '20W fast charging',
      'USB‑C connector',
      'Compact design',
      'Works with iPhone and iPad',
      'UL listed safety'
    ],
    images: [
      '/images/amazon/accessories/charger.jpg'
    ],
    specifications: {
      'Power Output': '20W',
      'Connector': 'USB‑C',
      'Input Voltage': '100-240V',
      'Color': 'White',
      'Cable Included': 'No'
    },
    delivery: {
      prime: true,
      freeShipping: true,
      estimatedDays: 1
    },
    seller: {
      name: 'Apple Store',
      rating: 4.9,
      fulfillment: 'Amazon'
    }
  },
  {
    id: 'apple-airpods-3',
    title: 'Apple AirPods (3rd Generation) with Lightning Charging Case',
    price: 169.00,
    originalPrice: 179.00,
    currency: 'USD',
    rating: 4.7,
    reviewCount: 58732,
    category: 'electronics',
    subcategory: 'headphones',
    brand: 'Apple',
    inStock: true,
    stockCount: 95,
    description: 'Spatial audio with dynamic head tracking and an adaptive EQ for an immersive listening experience.',
    features: [
      'Spatial audio with dynamic head tracking',
      'Sweat and water-resistant (IPX4)',
      'Up to 6 hours of listening time',
      'Lightning charging case',
      'Quick access to Siri'
    ],
    images: [
      '/images/amazon/brands/apple.png'
    ],
    specifications: {
      'Chip': 'Apple H1',
      'Water Resistance': 'IPX4',
      'Charging Case': 'Lightning',
      'Battery Life': 'Up to 30 hours with case',
      'Compatibility': 'iOS, iPadOS, macOS, tvOS'
    },
    delivery: {
      prime: true,
      freeShipping: true,
      estimatedDays: 2
    },
    seller: {
      name: 'Amazon.com',
      rating: 4.8,
      fulfillment: 'Amazon'
    }
  },
  {
    id: 'apple-mouse-magic',
    title: 'Apple Magic Mouse (Wireless, Rechargeable) – White',
    price: 69.00,
    originalPrice: 79.00,
    currency: 'USD',
    rating: 4.5,
    reviewCount: 18234,
    category: 'electronics',
    subcategory: 'accessories',
    brand: 'Apple',
    inStock: true,
    stockCount: 140,
    description: 'Multi‑Touch surface allows you to perform simple gestures such as swiping and scrolling.',
    features: [
      'Bluetooth wireless',
      'Rechargeable battery',
      'Multi-Touch surface',
      'Optimized foot design',
      'Pairs automatically with Mac'
    ],
    images: [
      '/images/amazon/brands/apple.png'
    ],
    specifications: {
      'Connectivity': 'Bluetooth',
      'Charging': 'Lightning',
      'Compatibility': 'macOS',
      'Color': 'White',
      'Weight': '0.22 lb'
    },
    delivery: {
      prime: true,
      freeShipping: true,
      estimatedDays: 3
    },
    seller: {
      name: 'Amazon.com',
      rating: 4.8,
      fulfillment: 'Amazon'
    }
  },
  {
    id: 'apple-keyboard-magic',
    title: 'Apple Magic Keyboard with Touch ID and Numeric Keypad',
    price: 179.00,
    originalPrice: 199.00,
    currency: 'USD',
    rating: 4.6,
    reviewCount: 8234,
    category: 'electronics',
    subcategory: 'accessories',
    brand: 'Apple',
    inStock: true,
    stockCount: 75,
    description: 'Wireless and rechargeable keyboard with a comfortable and precise typing experience.',
    features: [
      'Touch ID for secure authentication',
      'Numeric keypad',
      'Wireless and rechargeable',
      'Pairs automatically with Mac',
      'US English layout'
    ],
    images: [
      '/images/amazon/brands/apple.png'
    ],
    specifications: {
      'Layout': 'US English',
      'Connectivity': 'Bluetooth',
      'Battery': 'Rechargeable',
      'Compatibility': 'macOS',
      'Color': 'White'
    },
    delivery: {
      prime: true,
      freeShipping: true,
      estimatedDays: 2
    },
    seller: {
      name: 'Amazon.com',
      rating: 4.8,
      fulfillment: 'Amazon'
    }
  },
  {
    id: 'laptop-stand',
    title: 'Adjustable Aluminum Laptop Stand',
    price: 29.99,
    originalPrice: 39.99,
    currency: 'USD',
    rating: 4.5,
    reviewCount: 12457,
    category: 'electronics',
    subcategory: 'accessories',
    brand: 'Generic',
    inStock: true,
    stockCount: 260,
    description: 'Ergonomic aluminum stand improves posture and cooling for laptops from 10" to 17".',
    features: [
      'Ergonomic height adjustment',
      'Aluminum alloy for better heat dissipation',
      'Non-slip silicone pads',
      'Foldable and portable',
      'Supports up to 17" laptops'
    ],
    images: [
      '/images/amazon/products/electronics/laptops/dell-xps-13-1.jpg',
      '/images/amazon/products/electronics/laptops/macbook-air-m3-1.jpg'
    ],
    specifications: {
      'Material': 'Aluminum alloy',
      'Compatibility': '10"-17" laptops',
      'Adjustable': 'Yes',
      'Color': 'Silver',
      'Weight Capacity': '22 lbs'
    },
    delivery: {
      prime: true,
      freeShipping: true,
      estimatedDays: 2
    },
    seller: {
      name: 'Amazon.com',
      rating: 4.7,
      fulfillment: 'Amazon'
    }
  },

  // Electronics - Smartphones (more)
  {
    id: 'google-pixel-8',
    title: 'Google Pixel 8 128GB - Obsidian',
    price: 699.00,
    originalPrice: 799.00,
    currency: 'USD',
    rating: 4.5,
    reviewCount: 6231,
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Google',
    inStock: true,
    stockCount: 34,
    description: 'Pixel 8 with Google Tensor G3, advanced camera features, and 7 years of security updates.',
    features: [
      'Google Tensor G3',
      'Actua display 6.2"',
      'Advanced AI camera features',
      'Face Unlock and Fingerprint Unlock',
      '7 years of updates'
    ],
    images: [
      '/images/amazon/products/electronics/smartphones/samsung-galaxy-s24-1.jpg',
      '/images/amazon/products/electronics/smartphones/samsung-galaxy-s24-2.jpg'
    ],
    specifications: {
      'Display': '6.2" Actua OLED',
      'Processor': 'Google Tensor G3',
      'Storage': '128GB',
      'Camera': '50MP main + 12MP ultrawide',
      'Battery': '24-hour battery'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 2 },
    seller: { name: 'Google Store', rating: 4.7, fulfillment: 'Amazon' }
  },
  {
    id: 'oneplus-12',
    title: 'OnePlus 12 256GB - Flowy Emerald',
    price: 799.00,
    originalPrice: 899.00,
    currency: 'USD',
    rating: 4.4,
    reviewCount: 2745,
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'OnePlus',
    inStock: true,
    stockCount: 28,
    description: 'Flagship performance with Snapdragon 8 Gen 3, ProXDR display, and Hasselblad camera for mobile.',
    features: [
      'Snapdragon 8 Gen 3',
      'ProXDR 6.82" display',
      'Hasselblad camera system',
      '100W SUPERVOOC charging',
      'OxygenOS'
    ],
    images: [
      '/images/amazon/products/electronics/smartphones/iphone-15-pro-1.jpg',
      '/images/amazon/products/electronics/smartphones/iphone-15-pro-2.jpg'
    ],
    specifications: {
      'Display': '6.82" ProXDR',
      'Processor': 'Snapdragon 8 Gen 3',
      'Storage': '256GB',
      'Camera': '50MP main + 48MP ultrawide + 64MP telephoto',
      'Charging': '100W SUPERVOOC'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 2 },
    seller: { name: 'OnePlus Store', rating: 4.6, fulfillment: 'Amazon' }
  },
  {
    id: 'samsung-galaxy-s24-plus',
    title: 'Samsung Galaxy S24+ 512GB - Onyx Black',
    price: 999.99,
    originalPrice: 1099.99,
    currency: 'USD',
    rating: 4.5,
    reviewCount: 1650,
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Samsung',
    inStock: true,
    stockCount: 19,
    description: 'Bigger, brighter display with Galaxy AI features and a powerful camera system.',
    features: [
      'Galaxy AI',
      '6.7" Dynamic AMOLED 2X',
      '50MP triple camera',
      'Snapdragon 8 Gen 3',
      'Super fast charging'
    ],
    images: [
      '/images/amazon/products/electronics/smartphones/samsung-galaxy-s24-1.jpg',
      '/images/amazon/products/electronics/smartphones/samsung-galaxy-s24-2.jpg'
    ],
    specifications: {
      'Display': '6.7" Dynamic AMOLED 2X',
      'Processor': 'Snapdragon 8 Gen 3',
      'Storage': '512GB',
      'Camera': '50MP + 12MP + 10MP',
      'Battery': '4900mAh'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 1 },
    seller: { name: 'Samsung Store', rating: 4.7, fulfillment: 'Amazon' }
  },

  // Electronics - Laptops (more)
  {
    id: 'lenovo-thinkpad-x1-carbon',
    title: 'Lenovo ThinkPad X1 Carbon Gen 11, i7, 16GB RAM, 1TB SSD, 14" WUXGA',
    price: 1499.99,
    originalPrice: 1799.99,
    currency: 'USD',
    rating: 4.6,
    reviewCount: 742,
    category: 'electronics',
    subcategory: 'laptops',
    brand: 'Lenovo',
    inStock: true,
    stockCount: 14,
    description: 'Ultra-light business laptop with legendary ThinkPad keyboard and robust durability.',
    features: [
      'Intel Core i7 13th Gen',
      '14" WUXGA anti-glare display',
      '16GB LPDDR5 RAM',
      '1TB PCIe SSD',
      'Dolby Atmos speakers'
    ],
    images: [
      '/images/amazon/products/electronics/laptops/dell-xps-13-1.jpg',
      '/images/amazon/products/electronics/laptops/dell-xps-13-2.jpg'
    ],
    specifications: {
      'Processor': 'Intel Core i7 13th Gen',
      'Memory': '16GB LPDDR5',
      'Storage': '1TB SSD',
      'Display': '14" WUXGA (1920x1200)',
      'Weight': '2.48 lbs'
    },
    delivery: { prime: false, freeShipping: true, estimatedDays: 5 },
    seller: { name: 'Lenovo Store', rating: 4.6, fulfillment: 'Merchant' }
  },
  {
    id: 'hp-spectre-x360',
    title: 'HP Spectre x360 14, i7, 16GB, 1TB SSD, 13.5" 3K2K OLED Touch',
    price: 1399.99,
    originalPrice: 1599.99,
    currency: 'USD',
    rating: 4.4,
    reviewCount: 531,
    category: 'electronics',
    subcategory: 'laptops',
    brand: 'HP',
    inStock: true,
    stockCount: 11,
    description: 'Premium 2-in-1 laptop with stunning OLED touch display and long battery life.',
    features: [
      'Intel Core i7 13th Gen',
      '13.5" 3K2K OLED touchscreen',
      '16GB RAM, 1TB SSD',
      'Convertible 2-in-1 design',
      'Windows 11'
    ],
    images: [
      '/images/amazon/products/electronics/laptops/macbook-air-m3-1.jpg',
      '/images/amazon/products/electronics/laptops/macbook-air-m3-2.jpg'
    ],
    specifications: {
      'Processor': 'Intel Core i7 13th Gen',
      'Memory': '16GB',
      'Storage': '1TB SSD',
      'Display': '13.5" 3K2K OLED',
      'Weight': '3.0 lbs'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 3 },
    seller: { name: 'HP Store', rating: 4.6, fulfillment: 'Amazon' }
  },
  {
    id: 'macbook-pro-m3',
    title: 'Apple MacBook Pro 14-inch M3, 16GB RAM, 512GB SSD - Space Gray',
    price: 1999.00,
    originalPrice: 2099.00,
    currency: 'USD',
    rating: 4.8,
    reviewCount: 2104,
    category: 'electronics',
    subcategory: 'laptops',
    brand: 'Apple',
    inStock: true,
    stockCount: 9,
    description: 'Powerful performance with M3 chip, Liquid Retina XDR display, and all-day battery life.',
    features: [
      'Apple M3 chip',
      '14.2-inch Liquid Retina XDR',
      '16GB unified memory',
      '512GB SSD',
      'macOS Sonoma'
    ],
    images: [
      '/images/amazon/products/electronics/laptops/macbook-air-m3-1.jpg',
      '/images/amazon/products/electronics/laptops/macbook-air-m3-2.jpg'
    ],
    specifications: {
      'Processor': 'Apple M3',
      'Memory': '16GB',
      'Storage': '512GB SSD',
      'Display': '14.2" Liquid Retina XDR',
      'Color': 'Space Gray'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 2 },
    seller: { name: 'Amazon.com', rating: 4.9, fulfillment: 'Amazon' }
  },

  // Electronics - Tablets
  {
    id: 'ipad-air-5',
    title: 'Apple iPad Air (5th generation), 10.9-inch, 64GB - Blue',
    price: 549.00,
    originalPrice: 599.00,
    currency: 'USD',
    rating: 4.7,
    reviewCount: 8741,
    category: 'electronics',
    subcategory: 'tablets',
    brand: 'Apple',
    inStock: true,
    stockCount: 42,
    description: 'Powerful M1 performance and a stunning Liquid Retina display in a thin and light design.',
    features: [
      'Apple M1 chip',
      '10.9-inch Liquid Retina display',
      'Touch ID',
      'Works with Apple Pencil (2nd generation)',
      'All-day battery life'
    ],
    images: [
      '/images/amazon/products/electronics/laptops/Apple iPad Air.jpg'
    ],
    specifications: {
      'Chip': 'Apple M1',
      'Storage': '64GB',
      'Display': '10.9" Liquid Retina',
      'Connectivity': 'Wi‑Fi',
      'Color': 'Blue'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 2 },
    seller: { name: 'Amazon.com', rating: 4.8, fulfillment: 'Amazon' }
  },
  {
    id: 'samsung-galaxy-tab-s9',
    title: 'Samsung Galaxy Tab S9 11-inch, 128GB, Wi‑Fi',
    price: 699.99,
    originalPrice: 799.99,
    currency: 'USD',
    rating: 4.6,
    reviewCount: 1395,
    category: 'electronics',
    subcategory: 'tablets',
    brand: 'Samsung',
    inStock: true,
    stockCount: 25,
    description: 'Dynamic AMOLED 2X display, S Pen included, powerful performance for work and play.',
    features: [
      '11-inch Dynamic AMOLED 2X',
      'S Pen included',
      'Snapdragon 8 Gen 2',
      'IP68 water resistance',
      'Long-lasting battery'
    ],
    images: [
      '/images/amazon/products/electronics/smartphones/samsung-galaxy-s24-1.jpg'
    ],
    specifications: {
      'Display': '11" Dynamic AMOLED 2X',
      'Processor': 'Snapdragon 8 Gen 2',
      'Storage': '128GB',
      'S Pen': 'Included',
      'Water Resistance': 'IP68'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 2 },
    seller: { name: 'Samsung Store', rating: 4.7, fulfillment: 'Amazon' }
  },

  // Books - More non-fiction and self-help
  {
    id: 'the-7-habits',
    title: 'The 7 Habits of Highly Effective People',
    price: 11.49,
    originalPrice: 18.99,
    currency: 'USD',
    rating: 4.8,
    reviewCount: 124563,
    category: 'books',
    subcategory: 'non-fiction',
    brand: 'Simon & Schuster',
    inStock: true,
    stockCount: 300,
    author: 'Stephen R. Covey',
    description: 'Powerful lessons in personal change that have transformed the lives of millions.',
    features: [
      'Anniversary edition',
      'Timeless principles of effectiveness',
      'Practical and inspirational',
      'Paperback',
      'English language'
    ],
    images: [
      '/images/amazon/products/books/non-fiction/atomic-habits-1.jpg'
    ],
    specifications: {
      'Author': 'Stephen R. Covey',
      'Publisher': 'Simon & Schuster',
      'Pages': '432',
      'Language': 'English',
      'Format': 'Paperback'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 2 },
    seller: { name: 'Amazon.com', rating: 4.8, fulfillment: 'Amazon' }
  },
  {
    id: 'deep-work',
    title: 'Deep Work: Rules for Focused Success in a Distracted World',
    price: 12.59,
    originalPrice: 18.99,
    currency: 'USD',
    rating: 4.7,
    reviewCount: 65214,
    category: 'books',
    subcategory: 'non-fiction',
    brand: 'Grand Central Publishing',
    inStock: true,
    stockCount: 210,
    author: 'Cal Newport',
    description: 'A guide to achieving focused success by cultivating deep work habits and minimizing distractions.',
    features: [
      'Research-backed strategies',
      'Productivity techniques',
      'Case studies and examples',
      'Paperback',
      'English language'
    ],
    images: [
      '/images/amazon/products/books/non-fiction/atomic-habits-2.jpg'
    ],
    specifications: {
      'Author': 'Cal Newport',
      'Publisher': 'Grand Central Publishing',
      'Pages': '304',
      'Language': 'English',
      'Format': 'Paperback'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 2 },
    seller: { name: 'Amazon.com', rating: 4.8, fulfillment: 'Amazon' }
  },
  {
    id: 'mindset',
    title: 'Mindset: The New Psychology of Success',
    price: 10.99,
    originalPrice: 16.99,
    currency: 'USD',
    rating: 4.6,
    reviewCount: 48192,
    category: 'books',
    subcategory: 'non-fiction',
    brand: 'Ballantine Books',
    inStock: true,
    stockCount: 260,
    author: 'Carol S. Dweck',
    description: 'How we can learn to fulfill our potential by cultivating a growth mindset.',
    features: [
      'Growth vs. fixed mindset',
      'Practical advice',
      'Backed by decades of research',
      'Paperback',
      'English language'
    ],
    images: [
      '/images/amazon/products/books/non-fiction/atomic-habits-1.jpg'
    ],
    specifications: {
      'Author': 'Carol S. Dweck',
      'Publisher': 'Ballantine Books',
      'Pages': '320',
      'Language': 'English',
      'Format': 'Paperback'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 2 },
    seller: { name: 'Amazon.com', rating: 4.8, fulfillment: 'Amazon' }
  },

  // Clothing - More Levi's items
  {
    id: 'levis-511-slim',
    title: "Levi's Men's 511 Slim Fit Jeans",
    price: 64.50,
    originalPrice: 74.50,
    currency: 'USD',
    rating: 4.5,
    reviewCount: 8421,
    category: 'clothing',
    subcategory: 'mens-clothing',
    brand: "Levi's",
    inStock: true,
    stockCount: 66,
    description: 'A modern slim with room to move. Added stretch for extra comfort.',
    features: [
      'Slim through seat and thigh',
      'Sits below waist',
      'Stretch denim',
      'Zip fly',
      'Machine washable'
    ],
    images: [
      '/images/amazon/products/clothing/mens-clothing/levi-501-1.jpg',
      '/images/amazon/products/clothing/mens-clothing/levi-501-2.jpg'
    ],
    specifications: {
      'Brand': "Levi's",
      'Style': '511 Slim',
      'Material': '98% Cotton, 2% Elastane',
      'Fit': 'Slim',
      'Care': 'Machine Wash'
    },
    sizes: ['28x30', '30x30', '32x32', '34x32', '36x32'],
    colors: ['Dark Wash', 'Medium Wash', 'Black'],
    delivery: { prime: true, freeShipping: true, estimatedDays: 2 },
    seller: { name: "Levi's Store", rating: 4.7, fulfillment: 'Amazon' }
  },
  {
    id: 'levis-trucker-jacket',
    title: "Levi's Men's Trucker Jacket",
    price: 79.99,
    originalPrice: 89.99,
    currency: 'USD',
    rating: 4.6,
    reviewCount: 5120,
    category: 'clothing',
    subcategory: 'mens-clothing',
    brand: "Levi's",
    inStock: true,
    stockCount: 54,
    description: 'Iconic denim trucker jacket with timeless style and durable construction.',
    features: [
      'Classic fit',
      'Button closure',
      'Durable denim',
      'Side and chest pockets',
      'Machine washable'
    ],
    images: [
      '/images/amazon/products/clothing/mens-clothing/levi-501-1.jpg'
    ],
    specifications: {
      'Brand': "Levi's",
      'Material': '100% Cotton',
      'Fit': 'Regular',
      'Care': 'Machine Wash',
      'Closure': 'Buttons'
    },
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Dark Indigo', 'Washed Black'],
    delivery: { prime: true, freeShipping: true, estimatedDays: 2 },
    seller: { name: "Levi's Store", rating: 4.7, fulfillment: 'Amazon' }
  },

  // Home & Kitchen - More
  {
    id: 'keurig-k-classic-coffee-maker',
    title: 'Keurig K-Classic Coffee Maker, Single Serve K-Cup Pod, Black',
    price: 99.99,
    originalPrice: 129.99,
    currency: 'USD',
    rating: 4.5,
    reviewCount: 68412,
    category: 'home-garden',
    subcategory: 'kitchen',
    brand: 'Keurig',
    inStock: true,
    stockCount: 180,
    description: 'Brew multiple K-Cup pod sizes and enjoy a fast, fresh-brewed coffee in under a minute.',
    features: [
      'Multiple K-Cup sizes',
      'Large 48oz water reservoir',
      'Auto-off feature',
      'Descaling maintenance alert',
      'Simple button controls'
    ],
    images: [
      '/images/amazon/products/home-garden/kitchen/instant-pot-duo-1.jpg',
      '/images/amazon/products/home-garden/kitchen/instant-pot-duo-2.jpg'
    ],
    specifications: {
      'Reservoir': '48 oz',
      'Brew Sizes': '6, 8, 10 oz',
      'Color': 'Black',
      'Auto-Off': 'Yes',
      'Dimensions': '13.3 x 9.8 x 13 in'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 1 },
    seller: { name: 'Keurig Store', rating: 4.7, fulfillment: 'Amazon' }
  },
  {
    id: 'ninja-air-fryer',
    title: 'Ninja Air Fryer, 4-Quart Capacity, Black/Grey',
    price: 89.99,
    originalPrice: 119.99,
    currency: 'USD',
    rating: 4.7,
    reviewCount: 95231,
    category: 'home-garden',
    subcategory: 'kitchen',
    brand: 'Ninja',
    inStock: true,
    stockCount: 145,
    description: 'Crisps, roasts, reheats, and dehydrates with up to 75% less fat than traditional frying methods.',
    features: [
      'Wide temperature range',
      '4-quart nonstick basket',
      'Dishwasher safe parts',
      'Up to 75% less fat',
      'One-touch control panel'
    ],
    images: [
      '/images/amazon/products/home-garden/kitchen/instant-pot-duo-1.jpg'
    ],
    specifications: {
      'Capacity': '4 Quart',
      'Temperature': '105°F–400°F',
      'Power': '1500W',
      'Color': 'Black/Grey',
      'Nonstick': 'Yes'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 1 },
    seller: { name: 'Ninja Store', rating: 4.8, fulfillment: 'Amazon' }
  },

  // Sports & Outdoors - More
  {
    id: 'hydro-flask-32oz',
    title: 'Hydro Flask Wide Mouth Bottle with Flex Cap - 32 oz',
    price: 44.95,
    originalPrice: 49.95,
    currency: 'USD',
    rating: 4.8,
    reviewCount: 38214,
    category: 'sports',
    subcategory: 'outdoor-recreation',
    brand: 'Hydro Flask',
    inStock: true,
    stockCount: 210,
    description: 'TempShield insulation keeps beverages cold up to 24 hours and hot up to 12 hours.',
    features: [
      '18/8 pro-grade stainless steel',
      'BPA-free and Phthalate-free',
      'Dishwasher safe',
      'Compatible with Wide Mouth lids',
      'Durable powder coat'
    ],
    images: [
      '/images/amazon/products/sports/outdoor-recreation/yeti-tumbler-1.jpg',
      '/images/amazon/products/sports/outdoor-recreation/yeti-tumbler-2.jpg'
    ],
    specifications: {
      'Capacity': '32 oz',
      'Material': '18/8 Stainless Steel',
      'Insulation': 'TempShield',
      'Lid': 'Flex Cap',
      'Dishwasher Safe': 'Yes'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 2 },
    seller: { name: 'Hydro Flask Store', rating: 4.9, fulfillment: 'Amazon' }
  },
  {
    id: 'coleman-camping-chair',
    title: 'Coleman Portable Camping Chair with 4-Can Cooler',
    price: 39.99,
    originalPrice: 49.99,
    currency: 'USD',
    rating: 4.7,
    reviewCount: 21457,
    category: 'sports',
    subcategory: 'outdoor-recreation',
    brand: 'Coleman',
    inStock: true,
    stockCount: 190,
    description: 'Fully cushioned seat and back for support with a built-in cooler in the armrest.',
    features: [
      'Built-in 4-can cooler',
      'Fully cushioned',
      'Strong steel frame',
      'Cup holder and storage pocket',
      'Easy to fold and carry'
    ],
    images: [
      '/images/amazon/products/sports/outdoor-recreation/yeti-tumbler-2.jpg'
    ],
    specifications: {
      'Weight Capacity': '325 lbs',
      'Frame': 'Steel',
      'Color': 'Blue',
      'Included': 'Carry bag',
      'Cup Holder': 'Yes'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 2 },
    seller: { name: 'Coleman Store', rating: 4.8, fulfillment: 'Amazon' }
  },

  // Electronics - Headphones (external images)
  {
    id: 'sony-wh-1000xm5',
    title: 'Sony WH-1000XM5 Wireless Industry Leading Noise Canceling Headphones',
    price: 398.00,
    originalPrice: 449.99,
    currency: 'USD',
    rating: 4.7,
    reviewCount: 27451,
    category: 'electronics',
    subcategory: 'headphones',
    brand: 'Sony',
    inStock: true,
    stockCount: 120,
    description: 'Premium wireless over-ear headphones with best-in-class noise cancelation and crystal-clear calls.',
    features: [
      'Industry-leading noise cancelation',
      'Crystal-clear hands-free calling',
      'Up to 30 hours of battery life',
      'Multipoint connection',
      'Adaptive Sound Control'
    ],
    images: [
      'https://m.media-amazon.com/images/I/61uwZ-VFQbL._AC_SX679_.jpg'
    ],
    specifications: {
      'Form Factor': 'Over-Ear',
      'Connectivity': 'Bluetooth 5.2',
      'Battery Life': 'Up to 30 hours',
      'Noise Cancelation': 'Active',
      'Colors': 'Black, Silver'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 2 },
    seller: { name: 'Sony Store', rating: 4.8, fulfillment: 'Amazon' }
  },
  {
    id: 'bose-quietcomfort-ultra',
    title: 'Bose QuietComfort Ultra Wireless Noise Cancelling Headphones',
    price: 429.00,
    originalPrice: 499.00,
    currency: 'USD',
    rating: 4.6,
    reviewCount: 15342,
    category: 'electronics',
    subcategory: 'headphones',
    brand: 'Bose',
    inStock: true,
    stockCount: 85,
    description: 'Immersive audio, world-class noise cancelling, and premium comfort for all-day listening.',
    features: [
      'World-class noise cancelling',
      'Immersive audio',
      'Comfortable premium materials',
      'Up to 24 hours of battery life',
      'Advanced mic system for calls'
    ],
    images: [
      'https://m.media-amazon.com/images/I/61HefZMxJ-L._AC_SX679_.jpg'
    ],
    specifications: {
      'Form Factor': 'Over-Ear',
      'Connectivity': 'Bluetooth',
      'Battery Life': 'Up to 24 hours',
      'Noise Cancelation': 'Active',
      'Colors': 'Black, White Smoke'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 2 },
    seller: { name: 'Bose Store', rating: 4.8, fulfillment: 'Amazon' }
  },

  // Electronics - Cameras
  {
    id: 'canon-eos-r6-mark-ii',
    title: 'Canon EOS R6 Mark II Full-Frame Mirrorless Camera Body',
    price: 2499.00,
    originalPrice: 2699.00,
    currency: 'USD',
    rating: 4.7,
    reviewCount: 2145,
    category: 'electronics',
    subcategory: 'cameras',
    brand: 'Canon',
    inStock: true,
    stockCount: 22,
    description: 'High-speed, high-performance full-frame mirrorless camera for photo and video creators.',
    features: [
      '24.2MP Full-Frame CMOS',
      '4K60p 10-bit video',
      'Dual Pixel CMOS AF II',
      'Up to 40 fps electronic shutter',
      'In-body IS 8 stops'
    ],
    images: [
      'https://m.media-amazon.com/images/I/81m1sVvz-LL._AC_SX679_.jpg'
    ],
    specifications: {
      'Sensor': '24.2MP Full-Frame',
      'Video': '4K60p 10-bit',
      'Stabilization': 'In-body 5-Axis',
      'Mount': 'RF',
      'Media': 'SD UHS-II x2'
    },
    delivery: { prime: false, freeShipping: true, estimatedDays: 5 },
    seller: { name: 'Canon USA', rating: 4.7, fulfillment: 'Merchant' }
  },
  {
    id: 'sony-a7-iv',
    title: 'Sony Alpha 7 IV Full-Frame Mirrorless Interchangeable Lens Camera',
    price: 2498.00,
    originalPrice: 2698.00,
    currency: 'USD',
    rating: 4.8,
    reviewCount: 3411,
    category: 'electronics',
    subcategory: 'cameras',
    brand: 'Sony',
    inStock: true,
    stockCount: 18,
    description: 'A well-rounded hybrid camera with great image quality and advanced autofocus performance.',
    features: [
      '33MP full-frame sensor',
      '4K60p video with 10-bit 4:2:2',
      'Real-time Eye AF',
      '7 stops of IBIS compensation',
      'S-Cinetone color science'
    ],
    images: [
      'https://m.media-amazon.com/images/I/81yK9RdtK-L._AC_SX679_.jpg'
    ],
    specifications: {
      'Sensor': '33MP Full-Frame',
      'Video': '4K60p 10-bit',
      'Autofocus': 'Real-time Eye AF',
      'Stabilization': '5-Axis IBIS',
      'Media': 'SD UHS-II/CFexpress A'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 3 },
    seller: { name: 'Sony Store', rating: 4.9, fulfillment: 'Amazon' }
  },

  // Electronics - Gaming Consoles
  {
    id: 'nintendo-switch-oled',
    title: 'Nintendo Switch OLED Model – White Joy‑Con',
    price: 349.99,
    originalPrice: 349.99,
    currency: 'USD',
    rating: 4.9,
    reviewCount: 58231,
    category: 'electronics',
    subcategory: 'gaming',
    brand: 'Nintendo',
    inStock: true,
    stockCount: 150,
    description: 'Vibrant 7-inch OLED screen, wide adjustable stand, and enhanced audio for handheld and tabletop play.',
    features: [
      '7-inch OLED display',
      'Enhanced audio',
      '64GB internal storage',
      'Wide adjustable stand',
      'Dock with wired LAN port'
    ],
    images: [
      'https://m.media-amazon.com/images/I/61-PblYntsL._AC_SX679_.jpg'
    ],
    specifications: {
      'Display': '7" OLED',
      'Storage': '64GB',
      'Modes': 'TV, Tabletop, Handheld',
      'Connectivity': 'Wi‑Fi, Bluetooth',
      'Color': 'White'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 2 },
    seller: { name: 'Nintendo', rating: 4.9, fulfillment: 'Amazon' }
  },
  {
    id: 'playstation-5-slim',
    title: 'PlayStation 5 Slim Console',
    price: 499.99,
    originalPrice: 499.99,
    currency: 'USD',
    rating: 4.8,
    reviewCount: 74215,
    category: 'electronics',
    subcategory: 'gaming',
    brand: 'Sony',
    inStock: true,
    stockCount: 95,
    description: 'Play a new generation of incredible PlayStation games with stunning visuals and ultra-fast load times.',
    features: [
      'Ultra-high speed SSD',
      'Ray tracing',
      '4K-TV gaming',
      'Haptic feedback and adaptive triggers',
      'Tempest 3D AudioTech'
    ],
    images: [
      'https://m.media-amazon.com/images/I/61vGQNUEsGL._AC_SX679_.jpg'
    ],
    specifications: {
      'Storage': '1TB',
      'Resolution': 'Up to 4K',
      'HDR': 'Yes',
      'Ray Tracing': 'Supported',
      'Audio': '3D Audio'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 1 },
    seller: { name: 'Sony Store', rating: 4.8, fulfillment: 'Amazon' }
  },
  {
    id: 'xbox-series-x',
    title: 'Xbox Series X – 1TB SSD',
    price: 499.99,
    originalPrice: 499.99,
    currency: 'USD',
    rating: 4.8,
    reviewCount: 61234,
    category: 'electronics',
    subcategory: 'gaming',
    brand: 'Microsoft',
    inStock: true,
    stockCount: 110,
    description: 'The fastest, most powerful Xbox ever. Next-gen speed and performance.',
    features: [
      'Custom SSD for faster load times',
      '4K gaming up to 120 FPS',
      'DirectX Raytracing',
      'Dolby Vision and Atmos',
      'Backward compatibility'
    ],
    images: [
      'https://m.media-amazon.com/images/I/71NBQ2a52CL._AC_SX679_.jpg'
    ],
    specifications: {
      'Storage': '1TB SSD',
      'Resolution': 'Up to 4K',
      'Frame Rate': 'Up to 120 FPS',
      'Ray Tracing': 'Supported',
      'Optical Drive': '4K UHD Blu-ray'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 2 },
    seller: { name: 'Microsoft', rating: 4.8, fulfillment: 'Amazon' }
  },

  // Electronics - Accessories (more)
  {
    id: 'anker-usb-c-cable-100w',
    title: 'Anker USB C Cable, 100W Fast Charging USB-C to USB-C Cable 6ft',
    price: 14.99,
    originalPrice: 19.99,
    currency: 'USD',
    rating: 4.7,
    reviewCount: 32451,
    category: 'electronics',
    subcategory: 'accessories',
    brand: 'Anker',
    inStock: true,
    stockCount: 400,
    description: 'Durable braided USB-C cable supports up to 100W high-speed charging and fast data transfer.',
    features: [
      '100W USB-C PD charging',
      'Braided nylon',
      '6ft length',
      '480Mbps data transfer',
      'Wide device compatibility'
    ],
    images: [
      'https://m.media-amazon.com/images/I/61aH6bRkQCL._AC_SX679_.jpg'
    ],
    specifications: {
      'Length': '6 ft',
      'Material': 'Nylon braided',
      'Power': 'Up to 100W',
      'Connector Type': 'USB‑C to USB‑C',
      'Data Transfer': '480 Mbps'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 1 },
    seller: { name: 'AnkerDirect', rating: 4.9, fulfillment: 'Amazon' }
  },
  {
    id: 'sandisk-extreme-microsd-128gb',
    title: 'SanDisk 128GB Extreme microSDXC UHS-I Memory Card with Adapter',
    price: 18.49,
    originalPrice: 31.99,
    currency: 'USD',
    rating: 4.8,
    reviewCount: 214563,
    category: 'electronics',
    subcategory: 'accessories',
    brand: 'SanDisk',
    inStock: true,
    stockCount: 600,
    description: 'High-performance microSD card for Android smartphones, action cams, and drones.',
    features: [
      'Up to 160MB/s read speed',
      'A2 app performance',
      '4K UHD and Full HD ready',
      'Temperature and waterproof',
      'Includes adapter'
    ],
    images: [
      'https://m.media-amazon.com/images/I/81mG9e5GvAL._AC_SX679_.jpg'
    ],
    specifications: {
      'Capacity': '128GB',
      'Speed Class': 'U3, V30, A2',
      'Read Speed': 'Up to 160MB/s',
      'Write Speed': 'Up to 90MB/s',
      'Includes': 'SD adapter'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 1 },
    seller: { name: 'SanDisk', rating: 4.8, fulfillment: 'Amazon' }
  },

  // Electronics - Headphones (more)
  {
    id: 'apple-airpods-pro-2',
    title: 'Apple AirPods Pro (2nd Generation) with MagSafe Charging Case (USB‑C)',
    price: 249.00,
    originalPrice: 249.00,
    currency: 'USD',
    rating: 4.8,
    reviewCount: 98342,
    category: 'electronics',
    subcategory: 'headphones',
    brand: 'Apple',
    inStock: true,
    stockCount: 160,
    description: 'Rebuilt from the ground up, with next-level active noise cancellation and Adaptive Audio.',
    features: [
      'Active Noise Cancellation',
      'Transparency mode',
      'Adaptive Audio',
      'Personalized Spatial Audio',
      'USB‑C MagSafe case'
    ],
    images: [
      'https://m.media-amazon.com/images/I/61SUj2aKoEL._AC_SX679_.jpg'
    ],
    specifications: {
      'Chip': 'Apple H2',
      'Water Resistance': 'IP54',
      'Charging': 'USB‑C MagSafe Case',
      'Battery Life': 'Up to 30 hours with case',
      'Compatibility': 'iOS, iPadOS, macOS'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 1 },
    seller: { name: 'Apple', rating: 4.9, fulfillment: 'Amazon' }
  },

  // Books - More titles
  {
    id: 'sapiens',
    title: 'Sapiens: A Brief History of Humankind',
    price: 14.49,
    originalPrice: 22.99,
    currency: 'USD',
    rating: 4.7,
    reviewCount: 126541,
    category: 'books',
    subcategory: 'non-fiction',
    brand: 'Harper',
    inStock: true,
    stockCount: 500,
    author: 'Yuval Noah Harari',
    description: 'Explores how Homo sapiens evolved to dominate the planet and the stories that shaped our societies.',
    features: [
      'International bestseller',
      'Thought-provoking and engaging',
      'Updated illustrations',
      'Paperback',
      'English language'
    ],
    images: [
      'https://m.media-amazon.com/images/I/713jIoMO3UL._AC_UY436_FMwebp_QL65_.jpg'
    ],
    specifications: {
      'Author': 'Yuval Noah Harari',
      'Publisher': 'Harper',
      'Pages': '512',
      'Language': 'English',
      'Format': 'Paperback'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 2 },
    seller: { name: 'Amazon.com', rating: 4.8, fulfillment: 'Amazon' }
  },
  {
    id: 'the-night-circus',
    title: 'The Night Circus',
    price: 9.99,
    originalPrice: 16.00,
    currency: 'USD',
    rating: 4.6,
    reviewCount: 43211,
    category: 'books',
    subcategory: 'fiction',
    brand: 'Anchor',
    inStock: true,
    stockCount: 240,
    author: 'Erin Morgenstern',
    description: 'A phantasmagorical novel set in a magical traveling circus that arrives without warning.',
    features: [
      'Bestselling novel',
      'Fantasy and romance',
      'Rich, atmospheric prose',
      'Paperback',
      'English language'
    ],
    images: [
      'https://m.media-amazon.com/images/I/71Vx8Z64KEL._AC_UY436_FMwebp_QL65_.jpg'
    ],
    specifications: {
      'Author': 'Erin Morgenstern',
      'Publisher': 'Anchor',
      'Pages': '512',
      'Language': 'English',
      'Format': 'Paperback'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 2 },
    seller: { name: 'Amazon.com', rating: 4.8, fulfillment: 'Amazon' }
  },
  {
    id: 'algorithms-clrs',
    title: 'Introduction to Algorithms, 4th Edition',
    price: 84.99,
    originalPrice: 99.99,
    currency: 'USD',
    rating: 4.7,
    reviewCount: 18234,
    category: 'books',
    subcategory: 'textbooks',
    brand: 'MIT Press',
    inStock: true,
    stockCount: 80,
    author: 'Thomas H. Cormen et al.',
    description: 'Comprehensive and rigorously detailed textbook covering a broad range of algorithms.',
    features: [
      'Fourth edition',
      'Extensive algorithm coverage',
      'Mathematical rigor',
      'Hardcover',
      'English language'
    ],
    images: [
      'https://m.media-amazon.com/images/I/71j7T0YjQUL._AC_UY436_FMwebp_QL65_.jpg'
    ],
    specifications: {
      'Authors': 'Cormen, Leiserson, Rivest, Stein',
      'Publisher': 'MIT Press',
      'Pages': '1312',
      'Language': 'English',
      'Format': 'Hardcover'
    },
    delivery: { prime: false, freeShipping: true, estimatedDays: 4 },
    seller: { name: 'MIT Press', rating: 4.7, fulfillment: 'Merchant' }
  },
  {
    id: 'harry-potter-1',
    title: "Harry Potter and the Sorcerer's Stone (Book 1)",
    price: 7.64,
    originalPrice: 10.99,
    currency: 'USD',
    rating: 4.9,
    reviewCount: 321654,
    category: 'books',
    subcategory: 'children',
    brand: 'Scholastic',
    inStock: true,
    stockCount: 600,
    author: 'J.K. Rowling',
    description: 'The beginning of the global phenomenon. Join Harry as he discovers the wizarding world.',
    features: [
      'Classic children\'s fantasy',
      'Bestselling series',
      'Paperback',
      'English language',
      'Illustrated edition available'
    ],
    images: [
      'https://m.media-amazon.com/images/I/81YOuOGFCJL._AC_UY436_FMwebp_QL65_.jpg'
    ],
    specifications: {
      'Author': 'J.K. Rowling',
      'Publisher': 'Scholastic',
      'Pages': '320',
      'Language': 'English',
      'Format': 'Paperback'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 2 },
    seller: { name: 'Amazon.com', rating: 4.9, fulfillment: 'Amazon' }
  },
  {
    id: 'watchmen-graphic-novel',
    title: 'Watchmen (Graphic Novel)',
    price: 16.99,
    originalPrice: 24.99,
    currency: 'USD',
    rating: 4.8,
    reviewCount: 56142,
    category: 'books',
    subcategory: 'comics',
    brand: 'DC Comics',
    inStock: true,
    stockCount: 220,
    author: 'Alan Moore, Dave Gibbons',
    description: 'A landmark graphic novel that redefined the superhero genre with its complex narrative.',
    features: [
      'Eisner Award-winning',
      'Influential classic',
      'Paperback',
      'English language',
      'Full-color art'
    ],
    images: [
      'https://m.media-amazon.com/images/I/81uGnQ9Ig1L._AC_UY436_FMwebp_QL65_.jpg'
    ],
    specifications: {
      'Authors': 'Alan Moore, Dave Gibbons',
      'Publisher': 'DC Comics',
      'Pages': '448',
      'Language': 'English',
      'Format': 'Paperback'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 2 },
    seller: { name: 'Amazon.com', rating: 4.8, fulfillment: 'Amazon' }
  },

  // Clothing - Women, Shoes, Watches
  {
    id: 'levis-721-high-rise-skinny',
    title: "Levi's Women's 721 High Rise Skinny Jeans",
    price: 69.50,
    originalPrice: 79.50,
    currency: 'USD',
    rating: 4.5,
    reviewCount: 18452,
    category: 'clothing',
    subcategory: 'womens-clothing',
    brand: "Levi's",
    inStock: true,
    stockCount: 90,
    description: 'Leg-lengthening high rise skinny fit with just the right amount of stretch.',
    features: [
      'High rise',
      'Skinny through hip and thigh',
      'Stretch denim',
      'Zip fly',
      'Machine wash'
    ],
    images: [
      'https://m.media-amazon.com/images/I/71S6YBfJkXL._AC_SX569_.jpg'
    ],
    specifications: {
      'Brand': "Levi's",
      'Fit': '721 High Rise Skinny',
      'Material': 'Cotton blend',
      'Care': 'Machine Wash',
      'Closure': 'Zipper'
    },
    sizes: ['24', '25', '26', '27', '28', '29', '30'],
    colors: ['Blue Night', 'Black', 'Medium Indigo'],
    delivery: { prime: true, freeShipping: true, estimatedDays: 2 },
    seller: { name: "Levi's Store", rating: 4.7, fulfillment: 'Amazon' }
  },
  {
    id: 'adidas-ultraboost-22',
    title: 'adidas Ultraboost 22 Running Shoes',
    price: 139.99,
    originalPrice: 190.00,
    currency: 'USD',
    rating: 4.6,
    reviewCount: 24153,
    category: 'clothing',
    subcategory: 'shoes',
    brand: 'adidas',
    inStock: true,
    stockCount: 130,
    description: 'Responsive running shoes with BOOST cushioning for unmatched comfort and energy return.',
    features: [
      'BOOST cushioning',
      'Primeknit upper',
      'Continental rubber outsole',
      'Supportive heel frame',
      'Made with recycled materials'
    ],
    images: [
      'https://m.media-amazon.com/images/I/71v8zjM0ZbL._AC_SX679_.jpg'
    ],
    specifications: {
      'Upper': 'Primeknit textile',
      'Midsole': 'BOOST',
      'Outsole': 'Continental rubber',
      'Closure': 'Lace-up',
      'Use': 'Road running'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 2 },
    seller: { name: 'adidas', rating: 4.8, fulfillment: 'Amazon' }
  },
  {
    id: 'casio-gshock-dw5600',
    title: 'Casio G-Shock DW5600E-1V Shock Resistant Watch',
    price: 49.92,
    originalPrice: 69.95,
    currency: 'USD',
    rating: 4.7,
    reviewCount: 65231,
    category: 'clothing',
    subcategory: 'watches',
    brand: 'Casio',
    inStock: true,
    stockCount: 260,
    description: 'Classic G-Shock toughness with shock resistance and 200-meter water resistance.',
    features: [
      'Shock resistant',
      '200M water resistance',
      'EL backlight',
      'Countdown timer, stopwatch',
      '12/24 hour formats'
    ],
    images: [
      'https://m.media-amazon.com/images/I/71k-5vCkQVL._AC_SX679_.jpg'
    ],
    specifications: {
      'Movement': 'Quartz',
      'Water Resistance': '200M',
      'Case Diameter': '42.8mm',
      'Band Material': 'Resin',
      'Display': 'Digital'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 1 },
    seller: { name: 'Casio', rating: 4.8, fulfillment: 'Amazon' }
  },

  // Home & Garden - Tools, Bedding, Kitchen
  {
    id: 'dewalt-20v-max-drill',
    title: 'DEWALT 20V MAX Cordless Drill/Driver Kit, Compact, 1/2-Inch',
    price: 99.00,
    originalPrice: 159.00,
    currency: 'USD',
    rating: 4.8,
    reviewCount: 124563,
    category: 'home-garden',
    subcategory: 'tools',
    brand: 'DEWALT',
    inStock: true,
    stockCount: 300,
    description: 'Compact and lightweight drill/driver delivers high performance for a variety of tasks.',
    features: [
      'High-speed transmission',
      'Compact and lightweight',
      'Ergonomic handle',
      '1/2-inch single sleeve ratcheting chuck',
      'LED light'
    ],
    images: [
      'https://m.media-amazon.com/images/I/71e8fGv2kLL._AC_SX679_.jpg'
    ],
    specifications: {
      'Voltage': '20V',
      'Chuck Size': '1/2-inch',
      'Speed': '0-450 / 0-1500 RPM',
      'Battery': 'Li-Ion (included)',
      'Weight': '3.64 lbs'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 1 },
    seller: { name: 'DEWALT', rating: 4.8, fulfillment: 'Amazon' }
  },
  {
    id: 'bedsure-queen-sheet-set',
    title: 'Bedsure Queen Sheet Set - 4 Pieces, Brushed Microfiber, White',
    price: 23.99,
    originalPrice: 39.99,
    currency: 'USD',
    rating: 4.6,
    reviewCount: 205421,
    category: 'home-garden',
    subcategory: 'bedding',
    brand: 'Bedsure',
    inStock: true,
    stockCount: 800,
    description: 'Soft and breathable microfiber bed sheets with deep pockets and easy care.',
    features: [
      'Brushed microfiber',
      'Deep pockets',
      'Wrinkle-resistant',
      'Machine washable',
      'OEKO-TEX certified'
    ],
    images: [
      'https://m.media-amazon.com/images/I/81sA5B6f8KL._AC_SX679_.jpg'
    ],
    specifications: {
      'Size': 'Queen',
      'Pieces': '4 (1 fitted, 1 flat, 2 pillowcases)',
      'Material': 'Microfiber',
      'Color': 'White',
      'Care': 'Machine Wash'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 2 },
    seller: { name: 'Bedsure', rating: 4.7, fulfillment: 'Amazon' }
  },
  {
    id: 'breville-smart-oven-air',
    title: 'Breville Smart Oven Air Fryer Pro, Brushed Stainless Steel',
    price: 399.95,
    originalPrice: 499.95,
    currency: 'USD',
    rating: 4.7,
    reviewCount: 18456,
    category: 'home-garden',
    subcategory: 'kitchen',
    brand: 'Breville',
    inStock: true,
    stockCount: 75,
    description: 'Versatile countertop oven that can roast, air fry, and dehydrate with precise temperature control.',
    features: [
      '13 smart cooking functions',
      'Super convection',
      'Air fry and dehydrate',
      'Large capacity',
      'Interior oven light'
    ],
    images: [
      'https://m.media-amazon.com/images/I/71p7mxeH3oL._AC_SX679_.jpg'
    ],
    specifications: {
      'Power': '1800W',
      'Capacity': '9-slice / 14 lb turkey',
      'Material': 'Stainless steel',
      'Functions': '13',
      'Accessories': 'Air fry basket, racks'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 3 },
    seller: { name: 'Breville', rating: 4.8, fulfillment: 'Amazon' }
  },

  // Sports & Outdoors - Fitness, Equipment, Water Sports
  {
    id: 'fitbit-charge-6',
    title: 'Fitbit Charge 6 Fitness Tracker with Google Apps',
    price: 159.95,
    originalPrice: 159.95,
    currency: 'USD',
    rating: 4.5,
    reviewCount: 8452,
    category: 'sports',
    subcategory: 'fitness',
    brand: 'Fitbit',
    inStock: true,
    stockCount: 210,
    description: 'Advanced fitness tracker with heart rate, GPS, and Google Maps, Wallet, and YouTube Music.',
    features: [
      'Built-in GPS',
      '24/7 heart rate',
      'Google apps integration',
      'Exercise modes',
      'Water resistant to 50m'
    ],
    images: [
      'https://m.media-amazon.com/images/I/61b2yNwMBFL._AC_SX679_.jpg'
    ],
    specifications: {
      'Sensors': 'Heart rate, SpO2',
      'GPS': 'Built-in',
      'Water Resistance': '50m',
      'Battery Life': 'Up to 7 days',
      'Connectivity': 'Bluetooth'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 2 },
    seller: { name: 'Fitbit', rating: 4.7, fulfillment: 'Amazon' }
  },
  {
    id: 'spalding-nba-basketball',
    title: 'Spalding NBA Street Outdoor Basketball - Official Size 7',
    price: 24.99,
    originalPrice: 29.99,
    currency: 'USD',
    rating: 4.7,
    reviewCount: 41562,
    category: 'sports',
    subcategory: 'sports-equipment',
    brand: 'Spalding',
    inStock: true,
    stockCount: 320,
    description: 'Durable outdoor cover with deep channel design for improved grip and control.',
    features: [
      'Performance outdoor rubber cover',
      'Deep channel design',
      'Official size 7 (29.5")',
      'Shipped inflated',
      'Great for driveway and park play'
    ],
    images: [
      'https://m.media-amazon.com/images/I/81Yb4QgmZQL._AC_SX679_.jpg'
    ],
    specifications: {
      'Size': '7 (29.5")',
      'Material': 'Rubber',
      'Use': 'Outdoor',
      'Color': 'Orange',
      'Inflated': 'Yes'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 2 },
    seller: { name: 'Spalding', rating: 4.8, fulfillment: 'Amazon' }
  },
  {
    id: 'speedo-vanquisher-2-0',
    title: 'Speedo Unisex-Adult Swim Goggles Vanquisher 2.0',
    price: 17.99,
    originalPrice: 21.99,
    currency: 'USD',
    rating: 4.6,
    reviewCount: 25146,
    category: 'sports',
    subcategory: 'water-sports',
    brand: 'Speedo',
    inStock: true,
    stockCount: 270,
    description: 'Low-profile swim goggles with anti-fog and UV protection for training and competition.',
    features: [
      'Anti-fog coated lenses',
      'UV protection',
      'Four nosepiece options',
      'Wide panoramic view',
      'Latex-free'
    ],
    images: [
      'https://m.media-amazon.com/images/I/71KkFvdcZBL._AC_SX679_.jpg'
    ],
    specifications: {
      'Lens': 'Polycarbonate',
      'Strap': 'Silicone',
      'UV Protection': 'Yes',
      'Anti-fog': 'Yes',
      'Use': 'Training, Competition'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 2 },
    seller: { name: 'Speedo', rating: 4.7, fulfillment: 'Amazon' }
  },

  // iPhone 16 Series - Multiple Variants
  {
    id: 'iphone-16-128gb-black',
    title: 'Apple iPhone 16 128GB - Black',
    price: 799.00,
    originalPrice: 799.00,
    currency: 'USD',
    rating: 4.8,
    reviewCount: 15432,
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Apple',
    inStock: true,
    stockCount: 95,
    description: 'iPhone 16 with A18 Bionic chip, advanced dual-camera system, and all-day battery life.',
    features: [
      'A18 Bionic chip',
      'Advanced dual-camera system',
      'All-day battery life',
      'Action Button',
      'USB-C connectivity'
    ],
    images: [
      'https://m.media-amazon.com/images/I/71d7rfSl0wL._AC_SX679_.jpg'
    ],
    specifications: {
      'Display': '6.1-inch Super Retina XDR',
      'Chip': 'A18 Bionic',
      'Storage': '128GB',
      'Camera': '48MP Fusion + 12MP Ultrawide',
      'Color': 'Black'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 1 },
    seller: { name: 'Amazon.com', rating: 4.9, fulfillment: 'Amazon' }
  },
  {
    id: 'iphone-16-256gb-pink',
    title: 'Apple iPhone 16 256GB - Pink',
    price: 899.00,
    originalPrice: 899.00,
    currency: 'USD',
    rating: 4.7,
    reviewCount: 8721,
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Apple',
    inStock: true,
    stockCount: 72,
    description: 'iPhone 16 with A18 Bionic chip in beautiful Pink finish with 256GB storage.',
    features: [
      'A18 Bionic chip',
      'Advanced dual-camera system',
      'All-day battery life',
      'Action Button',
      'USB-C connectivity'
    ],
    images: [
      'https://m.media-amazon.com/images/I/71yzKoI7r5L._AC_SX679_.jpg'
    ],
    specifications: {
      'Display': '6.1-inch Super Retina XDR',
      'Chip': 'A18 Bionic',
      'Storage': '256GB',
      'Camera': '48MP Fusion + 12MP Ultrawide',
      'Color': 'Pink'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 2 },
    seller: { name: 'Apple Store', rating: 4.8, fulfillment: 'Amazon' }
  },
  {
    id: 'iphone-16-512gb-ultramarine',
    title: 'Apple iPhone 16 512GB - Ultramarine',
    price: 1099.00,
    originalPrice: 1199.00,
    currency: 'USD',
    rating: 4.9,
    reviewCount: 3524,
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Apple',
    inStock: true,
    stockCount: 28,
    description: 'iPhone 16 with maximum 512GB storage in stunning Ultramarine finish.',
    features: [
      'A18 Bionic chip',
      'Advanced dual-camera system',
      'All-day battery life',
      'Action Button',
      'USB-C connectivity'
    ],
    images: [
      'https://m.media-amazon.com/images/I/71B1cs2-UJL._AC_SX679_.jpg'
    ],
    specifications: {
      'Display': '6.1-inch Super Retina XDR',
      'Chip': 'A18 Bionic',
      'Storage': '512GB',
      'Camera': '48MP Fusion + 12MP Ultrawide',
      'Color': 'Ultramarine'
    },
    delivery: { prime: false, freeShipping: true, estimatedDays: 3 },
    seller: { name: 'Electronics Plus', rating: 4.6, fulfillment: 'Merchant' }
  },
  {
    id: 'iphone-16-plus-128gb-teal',
    title: 'Apple iPhone 16 Plus 128GB - Teal',
    price: 899.00,
    originalPrice: 899.00,
    currency: 'USD',
    rating: 4.8,
    reviewCount: 9871,
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Apple',
    inStock: true,
    stockCount: 65,
    description: 'iPhone 16 Plus with larger 6.7-inch display and extended battery life in Teal.',
    features: [
      'A18 Bionic chip',
      '6.7-inch display',
      'Extended battery life',
      'Advanced dual-camera system',
      'Action Button'
    ],
    images: [
      'https://m.media-amazon.com/images/I/71QP7nfOr5L._AC_SX679_.jpg'
    ],
    specifications: {
      'Display': '6.7-inch Super Retina XDR',
      'Chip': 'A18 Bionic',
      'Storage': '128GB',
      'Camera': '48MP Fusion + 12MP Ultrawide',
      'Color': 'Teal'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 1 },
    seller: { name: 'Amazon.com', rating: 4.9, fulfillment: 'Amazon' }
  },
  {
    id: 'iphone-16-plus-256gb-white',
    title: 'Apple iPhone 16 Plus 256GB - White',
    price: 999.00,
    originalPrice: 999.00,
    currency: 'USD',
    rating: 4.7,
    reviewCount: 6432,
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Apple',
    inStock: true,
    stockCount: 48,
    description: 'iPhone 16 Plus in elegant White with 256GB storage for more photos and apps.',
    features: [
      'A18 Bionic chip',
      '6.7-inch display',
      'Extended battery life',
      'Advanced dual-camera system',
      'Action Button'
    ],
    images: [
      'https://m.media-amazon.com/images/I/71XNS21k7wL._AC_SX679_.jpg'
    ],
    specifications: {
      'Display': '6.7-inch Super Retina XDR',
      'Chip': 'A18 Bionic',
      'Storage': '256GB',
      'Camera': '48MP Fusion + 12MP Ultrawide',
      'Color': 'White'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 2 },
    seller: { name: 'Apple Store', rating: 4.8, fulfillment: 'Amazon' }
  },
  {
    id: 'iphone-16-pro-128gb-natural-titanium',
    title: 'Apple iPhone 16 Pro 128GB - Natural Titanium',
    price: 999.00,
    originalPrice: 999.00,
    currency: 'USD',
    rating: 4.9,
    reviewCount: 12874,
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Apple',
    inStock: true,
    stockCount: 85,
    description: 'iPhone 16 Pro with A18 Pro chip, ProCamera system, and titanium design.',
    features: [
      'A18 Pro chip',
      'ProCamera system with 5x zoom',
      'Titanium design',
      'Always-On display',
      'USB-C with USB 3'
    ],
    images: [
      'https://m.media-amazon.com/images/I/81dT7CUY6GL._AC_SX679_.jpg'
    ],
    specifications: {
      'Display': '6.3-inch Super Retina XDR',
      'Chip': 'A18 Pro',
      'Storage': '128GB',
      'Camera': '48MP Main + 48MP Ultra Wide + 12MP Telephoto',
      'Color': 'Natural Titanium'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 1 },
    seller: { name: 'Amazon.com', rating: 4.9, fulfillment: 'Amazon' }
  },
  {
    id: 'iphone-16-pro-256gb-white-titanium',
    title: 'Apple iPhone 16 Pro 256GB - White Titanium',
    price: 1099.00,
    originalPrice: 1099.00,
    currency: 'USD',
    rating: 4.8,
    reviewCount: 8945,
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Apple',
    inStock: true,
    stockCount: 62,
    description: 'iPhone 16 Pro in elegant White Titanium with 256GB storage for professional use.',
    features: [
      'A18 Pro chip',
      'ProCamera system with 5x zoom',
      'Titanium design',
      'Always-On display',
      'USB-C with USB 3'
    ],
    images: [
      'https://m.media-amazon.com/images/I/81jbVzIKWrL._AC_SX679_.jpg'
    ],
    specifications: {
      'Display': '6.3-inch Super Retina XDR',
      'Chip': 'A18 Pro',
      'Storage': '256GB',
      'Camera': '48MP Main + 48MP Ultra Wide + 12MP Telephoto',
      'Color': 'White Titanium'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 2 },
    seller: { name: 'Apple Store', rating: 4.8, fulfillment: 'Amazon' }
  },
  {
    id: 'iphone-16-pro-512gb-black-titanium',
    title: 'Apple iPhone 16 Pro 512GB - Black Titanium',
    price: 1299.00,
    originalPrice: 1399.00,
    currency: 'USD',
    rating: 4.9,
    reviewCount: 5234,
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Apple',
    inStock: true,
    stockCount: 34,
    description: 'iPhone 16 Pro with massive 512GB storage in sleek Black Titanium finish.',
    features: [
      'A18 Pro chip',
      'ProCamera system with 5x zoom',
      'Titanium design',
      'Always-On display',
      'USB-C with USB 3'
    ],
    images: [
      'https://m.media-amazon.com/images/I/818xqnVKERL._AC_SX679_.jpg'
    ],
    specifications: {
      'Display': '6.3-inch Super Retina XDR',
      'Chip': 'A18 Pro',
      'Storage': '512GB',
      'Camera': '48MP Main + 48MP Ultra Wide + 12MP Telephoto',
      'Color': 'Black Titanium'
    },
    delivery: { prime: false, freeShipping: true, estimatedDays: 4 },
    seller: { name: 'TechWorld Store', rating: 4.5, fulfillment: 'Merchant' }
  },
  {
    id: 'iphone-16-pro-max-256gb-desert-titanium',
    title: 'Apple iPhone 16 Pro Max 256GB - Desert Titanium',
    price: 1199.00,
    originalPrice: 1199.00,
    currency: 'USD',
    rating: 4.9,
    reviewCount: 7821,
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Apple',
    inStock: true,
    stockCount: 55,
    description: 'iPhone 16 Pro Max with the largest display and longest battery life in Desert Titanium.',
    features: [
      'A18 Pro chip',
      '6.9-inch display',
      'Longest battery life',
      'ProCamera system with 5x zoom',
      'Titanium design'
    ],
    images: [
      'https://m.media-amazon.com/images/I/81UjJlq0EUL._AC_SX679_.jpg'
    ],
    specifications: {
      'Display': '6.9-inch Super Retina XDR',
      'Chip': 'A18 Pro',
      'Storage': '256GB',
      'Camera': '48MP Main + 48MP Ultra Wide + 12MP Telephoto',
      'Color': 'Desert Titanium'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 1 },
    seller: { name: 'Amazon.com', rating: 4.9, fulfillment: 'Amazon' }
  },
  {
    id: 'iphone-16-pro-max-512gb-natural-titanium',
    title: 'Apple iPhone 16 Pro Max 512GB - Natural Titanium',
    price: 1399.00,
    originalPrice: 1499.00,
    currency: 'USD',
    rating: 4.8,
    reviewCount: 4532,
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Apple',
    inStock: true,
    stockCount: 29,
    description: 'iPhone 16 Pro Max with premium 512GB storage and Natural Titanium finish.',
    features: [
      'A18 Pro chip',
      '6.9-inch display',
      'Longest battery life',
      'ProCamera system with 5x zoom',
      'Titanium design'
    ],
    images: [
      'https://m.media-amazon.com/images/I/81WZJZqm4DL._AC_SX679_.jpg'
    ],
    specifications: {
      'Display': '6.9-inch Super Retina XDR',
      'Chip': 'A18 Pro',
      'Storage': '512GB',
      'Camera': '48MP Main + 48MP Ultra Wide + 12MP Telephoto',
      'Color': 'Natural Titanium'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 3 },
    seller: { name: 'Apple Store', rating: 4.8, fulfillment: 'Amazon' }
  },
  {
    id: 'iphone-16-pro-max-1tb-white-titanium',
    title: 'Apple iPhone 16 Pro Max 1TB - White Titanium',
    price: 1599.00,
    originalPrice: 1699.00,
    currency: 'USD',
    rating: 4.7,
    reviewCount: 2143,
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Apple',
    inStock: true,
    stockCount: 18,
    description: 'iPhone 16 Pro Max with ultimate 1TB storage for professionals and content creators.',
    features: [
      'A18 Pro chip',
      '6.9-inch display',
      'Ultimate 1TB storage',
      'ProCamera system with 5x zoom',
      'Titanium design'
    ],
    images: [
      'https://m.media-amazon.com/images/I/81Y2C6qLe8L._AC_SX679_.jpg'
    ],
    specifications: {
      'Display': '6.9-inch Super Retina XDR',
      'Chip': 'A18 Pro',
      'Storage': '1TB',
      'Camera': '48MP Main + 48MP Ultra Wide + 12MP Telephoto',
      'Color': 'White Titanium'
    },
    delivery: { prime: false, freeShipping: true, estimatedDays: 5 },
    seller: { name: 'Premium Electronics', rating: 4.4, fulfillment: 'Merchant' }
  },

  // Samsung Galaxy S25 Series - Multiple Variants
  {
    id: 'samsung-galaxy-s25-128gb-phantom-black',
    title: 'Samsung Galaxy S25 128GB - Phantom Black',
    price: 799.99,
    originalPrice: 849.99,
    currency: 'USD',
    rating: 4.6,
    reviewCount: 8234,
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Samsung',
    inStock: true,
    stockCount: 110,
    description: 'Samsung Galaxy S25 with Snapdragon 8 Gen 4, AI features, and dynamic display.',
    features: [
      'Snapdragon 8 Gen 4',
      'Galaxy AI features',
      '6.2" Dynamic AMOLED 2X',
      'Triple camera system',
      'All-day battery'
    ],
    images: [
      'https://m.media-amazon.com/images/I/71qG4BTPHJL._AC_SX679_.jpg'
    ],
    specifications: {
      'Display': '6.2" Dynamic AMOLED 2X',
      'Processor': 'Snapdragon 8 Gen 4',
      'Storage': '128GB',
      'Camera': '50MP + 12MP + 10MP',
      'Color': 'Phantom Black'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 1 },
    seller: { name: 'Samsung Store', rating: 4.8, fulfillment: 'Amazon' }
  },
  {
    id: 'samsung-galaxy-s25-256gb-cream',
    title: 'Samsung Galaxy S25 256GB - Cream',
    price: 899.99,
    originalPrice: 949.99,
    currency: 'USD',
    rating: 4.7,
    reviewCount: 5621,
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Samsung',
    inStock: true,
    stockCount: 85,
    description: 'Samsung Galaxy S25 in elegant Cream finish with 256GB storage.',
    features: [
      'Snapdragon 8 Gen 4',
      'Galaxy AI features',
      '6.2" Dynamic AMOLED 2X',
      'Triple camera system',
      'All-day battery'
    ],
    images: [
      'https://m.media-amazon.com/images/I/71R5Fx0+VUL._AC_SX679_.jpg'
    ],
    specifications: {
      'Display': '6.2" Dynamic AMOLED 2X',
      'Processor': 'Snapdragon 8 Gen 4',
      'Storage': '256GB',
      'Camera': '50MP + 12MP + 10MP',
      'Color': 'Cream'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 2 },
    seller: { name: 'Samsung Store', rating: 4.8, fulfillment: 'Amazon' }
  },
  {
    id: 'samsung-galaxy-s25-plus-256gb-icy-blue',
    title: 'Samsung Galaxy S25+ 256GB - Icy Blue',
    price: 999.99,
    originalPrice: 1049.99,
    currency: 'USD',
    rating: 4.8,
    reviewCount: 7123,
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Samsung',
    inStock: true,
    stockCount: 68,
    description: 'Samsung Galaxy S25+ with larger 6.7" display and enhanced features in Icy Blue.',
    features: [
      'Snapdragon 8 Gen 4',
      '6.7" Dynamic AMOLED 2X',
      'Enhanced AI features',
      'Improved camera system',
      'Faster charging'
    ],
    images: [
      'https://m.media-amazon.com/images/I/71B2QS4JDEL._AC_SX679_.jpg'
    ],
    specifications: {
      'Display': '6.7" Dynamic AMOLED 2X',
      'Processor': 'Snapdragon 8 Gen 4',
      'Storage': '256GB',
      'Camera': '50MP + 12MP + 10MP',
      'Color': 'Icy Blue'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 1 },
    seller: { name: 'Amazon.com', rating: 4.9, fulfillment: 'Amazon' }
  },
  {
    id: 'samsung-galaxy-s25-ultra-256gb-titanium-gray',
    title: 'Samsung Galaxy S25 Ultra 256GB - Titanium Gray',
    price: 1299.99,
    originalPrice: 1399.99,
    currency: 'USD',
    rating: 4.9,
    reviewCount: 4521,
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Samsung',
    inStock: true,
    stockCount: 42,
    description: 'Samsung Galaxy S25 Ultra with S Pen, pro cameras, and titanium build.',
    features: [
      'Snapdragon 8 Gen 4',
      'Built-in S Pen',
      '6.8" Dynamic AMOLED 2X',
      'Quad camera system with 100x zoom',
      'Titanium build'
    ],
    images: [
      'https://m.media-amazon.com/images/I/71WSl6RVu+L._AC_SX679_.jpg'
    ],
    specifications: {
      'Display': '6.8" Dynamic AMOLED 2X',
      'Processor': 'Snapdragon 8 Gen 4',
      'Storage': '256GB',
      'Camera': '200MP + 50MP + 12MP + 10MP',
      'Color': 'Titanium Gray'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 2 },
    seller: { name: 'Samsung Store', rating: 4.8, fulfillment: 'Amazon' }
  },
  {
    id: 'samsung-galaxy-s25-ultra-512gb-titanium-black',
    title: 'Samsung Galaxy S25 Ultra 512GB - Titanium Black',
    price: 1499.99,
    originalPrice: 1599.99,
    currency: 'USD',
    rating: 4.8,
    reviewCount: 2876,
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Samsung',
    inStock: true,
    stockCount: 31,
    description: 'Samsung Galaxy S25 Ultra with 512GB storage in premium Titanium Black.',
    features: [
      'Snapdragon 8 Gen 4',
      'Built-in S Pen',
      '6.8" Dynamic AMOLED 2X',
      'Quad camera system with 100x zoom',
      'Titanium build'
    ],
    images: [
      'https://m.media-amazon.com/images/I/71A1EFTiXTL._AC_SX679_.jpg'
    ],
    specifications: {
      'Display': '6.8" Dynamic AMOLED 2X',
      'Processor': 'Snapdragon 8 Gen 4',
      'Storage': '512GB',
      'Camera': '200MP + 50MP + 12MP + 10MP',
      'Color': 'Titanium Black'
    },
    delivery: { prime: false, freeShipping: true, estimatedDays: 4 },
    seller: { name: 'Electronics World', rating: 4.6, fulfillment: 'Merchant' }
  },

  // Google Pixel 9 Series - Multiple Variants
  {
    id: 'google-pixel-9-128gb-obsidian',
    title: 'Google Pixel 9 128GB - Obsidian',
    price: 699.00,
    originalPrice: 799.00,
    currency: 'USD',
    rating: 4.7,
    reviewCount: 9432,
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Google',
    inStock: true,
    stockCount: 125,
    description: 'Google Pixel 9 with Tensor G4, advanced AI, and pure Android experience.',
    features: [
      'Google Tensor G4',
      'Advanced AI photography',
      'Pure Android experience',
      'Magic Eraser',
      '7 years of updates'
    ],
    images: [
      'https://m.media-amazon.com/images/I/71rvYdpRGQL._AC_SX679_.jpg'
    ],
    specifications: {
      'Display': '6.3" Actua OLED',
      'Processor': 'Google Tensor G4',
      'Storage': '128GB',
      'Camera': '50MP + 48MP',
      'Color': 'Obsidian'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 2 },
    seller: { name: 'Google Store', rating: 4.8, fulfillment: 'Amazon' }
  },
  {
    id: 'google-pixel-9-256gb-porcelain',
    title: 'Google Pixel 9 256GB - Porcelain',
    price: 799.00,
    originalPrice: 899.00,
    currency: 'USD',
    rating: 4.6,
    reviewCount: 6234,
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Google',
    inStock: true,
    stockCount: 89,
    description: 'Google Pixel 9 in elegant Porcelain finish with 256GB storage.',
    features: [
      'Google Tensor G4',
      'Advanced AI photography',
      'Pure Android experience',
      'Magic Eraser',
      '7 years of updates'
    ],
    images: [
      'https://m.media-amazon.com/images/I/71qYxH4MFQL._AC_SX679_.jpg'
    ],
    specifications: {
      'Display': '6.3" Actua OLED',
      'Processor': 'Google Tensor G4',
      'Storage': '256GB',
      'Camera': '50MP + 48MP',
      'Color': 'Porcelain'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 1 },
    seller: { name: 'Amazon.com', rating: 4.9, fulfillment: 'Amazon' }
  },
  {
    id: 'google-pixel-9-pro-256gb-hazel',
    title: 'Google Pixel 9 Pro 256GB - Hazel',
    price: 999.00,
    originalPrice: 1099.00,
    currency: 'USD',
    rating: 4.8,
    reviewCount: 5821,
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Google',
    inStock: true,
    stockCount: 64,
    description: 'Google Pixel 9 Pro with telephoto lens and premium features in Hazel.',
    features: [
      'Google Tensor G4',
      'Pro camera system with telephoto',
      'Gemini AI integration',
      'Premium materials',
      '7 years of updates'
    ],
    images: [
      'https://m.media-amazon.com/images/I/71xPQ4B5pOL._AC_SX679_.jpg'
    ],
    specifications: {
      'Display': '6.3" Super Actua OLED',
      'Processor': 'Google Tensor G4',
      'Storage': '256GB',
      'Camera': '50MP + 48MP + 48MP',
      'Color': 'Hazel'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 2 },
    seller: { name: 'Google Store', rating: 4.8, fulfillment: 'Amazon' }
  },
  {
    id: 'google-pixel-9-pro-xl-512gb-obsidian',
    title: 'Google Pixel 9 Pro XL 512GB - Obsidian',
    price: 1299.00,
    originalPrice: 1399.00,
    currency: 'USD',
    rating: 4.9,
    reviewCount: 3421,
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Google',
    inStock: true,
    stockCount: 38,
    description: 'Google Pixel 9 Pro XL with large display and maximum storage.',
    features: [
      'Google Tensor G4',
      '6.8" Super Actua display',
      'Pro camera system',
      'All-day battery',
      'Gemini AI integration'
    ],
    images: [
      'https://m.media-amazon.com/images/I/71m6vM+K8YL._AC_SX679_.jpg'
    ],
    specifications: {
      'Display': '6.8" Super Actua OLED',
      'Processor': 'Google Tensor G4',
      'Storage': '512GB',
      'Camera': '50MP + 48MP + 48MP',
      'Color': 'Obsidian'
    },
    delivery: { prime: false, freeShipping: true, estimatedDays: 3 },
    seller: { name: 'Tech Direct', rating: 4.7, fulfillment: 'Merchant' }
  },

  // MacBook Series - Multiple Variants
  {
    id: 'macbook-air-m4-13-256gb-midnight',
    title: 'Apple MacBook Air 13-inch M4 Chip, 8GB RAM, 256GB SSD - Midnight',
    price: 1099.00,
    originalPrice: 1199.00,
    currency: 'USD',
    rating: 4.8,
    reviewCount: 8234,
    category: 'electronics',
    subcategory: 'laptops',
    brand: 'Apple',
    inStock: true,
    stockCount: 85,
    description: 'Latest MacBook Air with M4 chip delivers exceptional performance and all-day battery life.',
    features: [
      'Apple M4 chip with 8-core CPU',
      '13.6-inch Liquid Retina display',
      'Up to 20 hours battery life',
      'MagSafe 3 charging',
      'macOS Sequoia'
    ],
    images: [
      'https://m.media-amazon.com/images/I/81NlzOXx4jL._AC_SX679_.jpg'
    ],
    specifications: {
      'Processor': 'Apple M4 chip',
      'Memory': '8GB unified memory',
      'Storage': '256GB SSD',
      'Display': '13.6-inch Liquid Retina',
      'Color': 'Midnight'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 1 },
    seller: { name: 'Amazon.com', rating: 4.9, fulfillment: 'Amazon' }
  },
  {
    id: 'macbook-air-m4-13-512gb-starlight',
    title: 'Apple MacBook Air 13-inch M4 Chip, 16GB RAM, 512GB SSD - Starlight',
    price: 1399.00,
    originalPrice: 1499.00,
    currency: 'USD',
    rating: 4.9,
    reviewCount: 5621,
    category: 'electronics',
    subcategory: 'laptops',
    brand: 'Apple',
    inStock: true,
    stockCount: 62,
    description: 'MacBook Air M4 with upgraded memory and storage in beautiful Starlight finish.',
    features: [
      'Apple M4 chip with 10-core GPU',
      '16GB unified memory',
      '512GB SSD storage',
      'Liquid Retina display',
      'MagSafe 3 charging'
    ],
    images: [
      'https://m.media-amazon.com/images/I/71jG+e7roXL._AC_SX679_.jpg'
    ],
    specifications: {
      'Processor': 'Apple M4 chip',
      'Memory': '16GB unified memory',
      'Storage': '512GB SSD',
      'Display': '13.6-inch Liquid Retina',
      'Color': 'Starlight'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 2 },
    seller: { name: 'Apple Store', rating: 4.8, fulfillment: 'Amazon' }
  },
  {
    id: 'macbook-air-m4-15-512gb-space-gray',
    title: 'Apple MacBook Air 15-inch M4 Chip, 16GB RAM, 512GB SSD - Space Gray',
    price: 1599.00,
    originalPrice: 1699.00,
    currency: 'USD',
    rating: 4.8,
    reviewCount: 4123,
    category: 'electronics',
    subcategory: 'laptops',
    brand: 'Apple',
    inStock: true,
    stockCount: 48,
    description: 'Larger 15-inch MacBook Air with M4 chip for those who need more screen real estate.',
    features: [
      'Apple M4 chip',
      '15.3-inch Liquid Retina display',
      '16GB unified memory',
      'Six-speaker sound system',
      'Up to 18 hours battery'
    ],
    images: [
      'https://m.media-amazon.com/images/I/81E2kELPu0L._AC_SX679_.jpg'
    ],
    specifications: {
      'Processor': 'Apple M4 chip',
      'Memory': '16GB unified memory',
      'Storage': '512GB SSD',
      'Display': '15.3-inch Liquid Retina',
      'Color': 'Space Gray'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 3 },
    seller: { name: 'Amazon.com', rating: 4.9, fulfillment: 'Amazon' }
  },
  {
    id: 'macbook-pro-14-m4-512gb-space-black',
    title: 'Apple MacBook Pro 14-inch M4 Pro, 18GB RAM, 512GB SSD - Space Black',
    price: 1999.00,
    originalPrice: 2099.00,
    currency: 'USD',
    rating: 4.9,
    reviewCount: 6234,
    category: 'electronics',
    subcategory: 'laptops',
    brand: 'Apple',
    inStock: true,
    stockCount: 38,
    description: 'Professional MacBook Pro with M4 Pro chip for demanding workflows.',
    features: [
      'Apple M4 Pro chip',
      '14.2-inch Liquid Retina XDR',
      '18GB unified memory',
      'ProMotion technology',
      'Three Thunderbolt 4 ports'
    ],
    images: [
      'https://m.media-amazon.com/images/I/71iTdJOLjUL._AC_SX679_.jpg'
    ],
    specifications: {
      'Processor': 'Apple M4 Pro',
      'Memory': '18GB unified memory',
      'Storage': '512GB SSD',
      'Display': '14.2-inch Liquid Retina XDR',
      'Color': 'Space Black'
    },
    delivery: { prime: false, freeShipping: true, estimatedDays: 4 },
    seller: { name: 'Tech World', rating: 4.6, fulfillment: 'Merchant' }
  },
  {
    id: 'macbook-pro-16-m4-max-1tb-silver',
    title: 'Apple MacBook Pro 16-inch M4 Max, 36GB RAM, 1TB SSD - Silver',
    price: 3499.00,
    originalPrice: 3699.00,
    currency: 'USD',
    rating: 4.9,
    reviewCount: 2451,
    category: 'electronics',
    subcategory: 'laptops',
    brand: 'Apple',
    inStock: true,
    stockCount: 18,
    description: 'Ultimate MacBook Pro with M4 Max chip for professional content creation.',
    features: [
      'Apple M4 Max chip',
      '16.2-inch Liquid Retina XDR',
      '36GB unified memory',
      '1TB SSD storage',
      'Six-speaker sound system'
    ],
    images: [
      'https://m.media-amazon.com/images/I/71hHaTZHWEL._AC_SX679_.jpg'
    ],
    specifications: {
      'Processor': 'Apple M4 Max',
      'Memory': '36GB unified memory',
      'Storage': '1TB SSD',
      'Display': '16.2-inch Liquid Retina XDR',
      'Color': 'Silver'
    },
    delivery: { prime: false, freeShipping: true, estimatedDays: 5 },
    seller: { name: 'Premium Electronics', rating: 4.4, fulfillment: 'Merchant' }
  },

  // Dell XPS Series - Multiple Variants
  {
    id: 'dell-xps-13-plus-i5-16gb-512gb',
    title: 'Dell XPS 13 Plus Laptop, Intel Core i5-1340P, 16GB RAM, 512GB SSD',
    price: 1099.99,
    originalPrice: 1299.99,
    currency: 'USD',
    rating: 4.5,
    reviewCount: 3421,
    category: 'electronics',
    subcategory: 'laptops',
    brand: 'Dell',
    inStock: true,
    stockCount: 72,
    description: 'Sleek and modern XPS 13 Plus with edge-to-edge keyboard and stunning display.',
    features: [
      'Intel Core i5-1340P',
      '13.4" FHD+ InfinityEdge',
      '16GB LPDDR5 RAM',
      'Edge-to-edge keyboard',
      'Windows 11 Pro'
    ],
    images: [
      'https://m.media-amazon.com/images/I/71J8QnLkjkL._AC_SX679_.jpg'
    ],
    specifications: {
      'Processor': 'Intel Core i5-1340P',
      'Memory': '16GB LPDDR5',
      'Storage': '512GB SSD',
      'Display': '13.4" FHD+ (1920x1200)',
      'Graphics': 'Intel Iris Xe'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 3 },
    seller: { name: 'Dell Direct', rating: 4.7, fulfillment: 'Amazon' }
  },
  {
    id: 'dell-xps-13-i7-32gb-1tb-oled',
    title: 'Dell XPS 13 Laptop, Intel Core i7-1360P, 32GB RAM, 1TB SSD, 13.4" OLED',
    price: 1899.99,
    originalPrice: 2199.99,
    currency: 'USD',
    rating: 4.7,
    reviewCount: 1823,
    category: 'electronics',
    subcategory: 'laptops',
    brand: 'Dell',
    inStock: true,
    stockCount: 42,
    description: 'Premium XPS 13 with stunning OLED display and maximum performance.',
    features: [
      'Intel Core i7-1360P',
      '13.4" 3.5K OLED touchscreen',
      '32GB LPDDR5 RAM',
      '1TB PCIe SSD',
      'Gorilla Glass Victus'
    ],
    images: [
      'https://m.media-amazon.com/images/I/81KlXeEjgfL._AC_SX679_.jpg'
    ],
    specifications: {
      'Processor': 'Intel Core i7-1360P',
      'Memory': '32GB LPDDR5',
      'Storage': '1TB SSD',
      'Display': '13.4" 3.5K OLED Touch',
      'Graphics': 'Intel Iris Xe'
    },
    delivery: { prime: false, freeShipping: true, estimatedDays: 4 },
    seller: { name: 'Electronics Plus', rating: 4.5, fulfillment: 'Merchant' }
  },
  {
    id: 'dell-xps-15-i9-rtx4060-32gb-1tb',
    title: 'Dell XPS 15 Laptop, Intel Core i9-13900H, RTX 4060, 32GB RAM, 1TB SSD',
    price: 2499.99,
    originalPrice: 2799.99,
    currency: 'USD',
    rating: 4.8,
    reviewCount: 2134,
    category: 'electronics',
    subcategory: 'laptops',
    brand: 'Dell',
    inStock: true,
    stockCount: 28,
    description: 'Powerful XPS 15 with dedicated graphics for creative professionals.',
    features: [
      'Intel Core i9-13900H',
      'NVIDIA GeForce RTX 4060',
      '15.6" 4K OLED display',
      '32GB DDR5 RAM',
      'Studio-quality speakers'
    ],
    images: [
      'https://m.media-amazon.com/images/I/81R7F3j7wLL._AC_SX679_.jpg'
    ],
    specifications: {
      'Processor': 'Intel Core i9-13900H',
      'Graphics': 'NVIDIA RTX 4060 8GB',
      'Memory': '32GB DDR5',
      'Storage': '1TB SSD',
      'Display': '15.6" 4K OLED'
    },
    delivery: { prime: false, freeShipping: true, estimatedDays: 5 },
    seller: { name: 'Dell Direct', rating: 4.6, fulfillment: 'Merchant' }
  },

  // HP Spectre & Envy Series - Multiple Variants
  {
    id: 'hp-spectre-x360-14-i7-16gb-512gb',
    title: 'HP Spectre x360 14" 2-in-1, Intel Core i7-1355U, 16GB, 512GB SSD',
    price: 1299.99,
    originalPrice: 1499.99,
    currency: 'USD',
    rating: 4.6,
    reviewCount: 4521,
    category: 'electronics',
    subcategory: 'laptops',
    brand: 'HP',
    inStock: true,
    stockCount: 65,
    description: 'Convertible 2-in-1 laptop with premium design and long battery life.',
    features: [
      'Intel Core i7-1355U',
      '14" 2.8K OLED touchscreen',
      'Convertible 2-in-1 design',
      'HP Tilt Pen included',
      'Bang & Olufsen audio'
    ],
    images: [
      'https://m.media-amazon.com/images/I/71dF6OPFp9L._AC_SX679_.jpg'
    ],
    specifications: {
      'Processor': 'Intel Core i7-1355U',
      'Memory': '16GB LPDDR5',
      'Storage': '512GB SSD',
      'Display': '14" 2.8K OLED Touch',
      'Graphics': 'Intel Iris Xe'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 3 },
    seller: { name: 'HP Store', rating: 4.7, fulfillment: 'Amazon' }
  },
  {
    id: 'hp-envy-x360-15-ryzen7-16gb-1tb',
    title: 'HP ENVY x360 15.6" 2-in-1, AMD Ryzen 7 7730U, 16GB, 1TB SSD',
    price: 899.99,
    originalPrice: 1099.99,
    currency: 'USD',
    rating: 4.5,
    reviewCount: 6234,
    category: 'electronics',
    subcategory: 'laptops',
    brand: 'HP',
    inStock: true,
    stockCount: 89,
    description: 'Affordable 2-in-1 laptop with AMD Ryzen performance and versatile design.',
    features: [
      'AMD Ryzen 7 7730U',
      '15.6" FHD IPS touchscreen',
      '16GB DDR4 RAM',
      'Convertible design',
      'Fast charging'
    ],
    images: [
      'https://m.media-amazon.com/images/I/71hQvEcOBRL._AC_SX679_.jpg'
    ],
    specifications: {
      'Processor': 'AMD Ryzen 7 7730U',
      'Memory': '16GB DDR4',
      'Storage': '1TB SSD',
      'Display': '15.6" FHD IPS Touch',
      'Graphics': 'AMD Radeon'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 2 },
    seller: { name: 'Amazon.com', rating: 4.8, fulfillment: 'Amazon' }
  },
  {
    id: 'hp-omen-16-i7-rtx4070-32gb-1tb',
    title: 'HP OMEN 16 Gaming Laptop, Intel Core i7-13700HX, RTX 4070, 32GB, 1TB',
    price: 1799.99,
    originalPrice: 2099.99,
    currency: 'USD',
    rating: 4.7,
    reviewCount: 3852,
    category: 'electronics',
    subcategory: 'laptops',
    brand: 'HP',
    inStock: true,
    stockCount: 45,
    description: 'High-performance gaming laptop with RTX 4070 graphics and fast refresh display.',
    features: [
      'Intel Core i7-13700HX',
      'NVIDIA GeForce RTX 4070',
      '16.1" QHD 165Hz display',
      'RGB backlit keyboard',
      'Advanced thermal management'
    ],
    images: [
      'https://m.media-amazon.com/images/I/81LrBi8vPsL._AC_SX679_.jpg'
    ],
    specifications: {
      'Processor': 'Intel Core i7-13700HX',
      'Graphics': 'NVIDIA RTX 4070 8GB',
      'Memory': '32GB DDR5',
      'Storage': '1TB SSD',
      'Display': '16.1" QHD 165Hz'
    },
    delivery: { prime: false, freeShipping: true, estimatedDays: 4 },
    seller: { name: 'HP Gaming', rating: 4.6, fulfillment: 'Merchant' }
  },

  // Gaming Laptops - MSI, ASUS, Alienware
  {
    id: 'msi-stealth-17-i9-rtx4080-32gb-2tb',
    title: 'MSI Stealth 17 Studio Gaming Laptop, Intel i9-13900H, RTX 4080, 32GB, 2TB',
    price: 2999.99,
    originalPrice: 3399.99,
    currency: 'USD',
    rating: 4.8,
    reviewCount: 1876,
    category: 'electronics',
    subcategory: 'laptops',
    brand: 'MSI',
    inStock: true,
    stockCount: 22,
    description: 'Ultra-thin gaming laptop with flagship performance and content creation capabilities.',
    features: [
      'Intel Core i9-13900H',
      'NVIDIA GeForce RTX 4080',
      '17.3" 4K 144Hz display',
      'Per-key RGB keyboard',
      'Mystic Light RGB'
    ],
    images: [
      'https://m.media-amazon.com/images/I/71vHZ5S1qzL._AC_SX679_.jpg'
    ],
    specifications: {
      'Processor': 'Intel Core i9-13900H',
      'Graphics': 'NVIDIA RTX 4080 12GB',
      'Memory': '32GB DDR5',
      'Storage': '2TB NVMe SSD',
      'Display': '17.3" 4K Mini LED'
    },
    delivery: { prime: false, freeShipping: true, estimatedDays: 6 },
    seller: { name: 'MSI Store', rating: 4.5, fulfillment: 'Merchant' }
  },
  {
    id: 'asus-rog-strix-g16-i7-rtx4060-16gb-1tb',
    title: 'ASUS ROG Strix G16 Gaming Laptop, Intel i7-13650HX, RTX 4060, 16GB, 1TB',
    price: 1399.99,
    originalPrice: 1699.99,
    currency: 'USD',
    rating: 4.6,
    reviewCount: 5234,
    category: 'electronics',
    subcategory: 'laptops',
    brand: 'ASUS',
    inStock: true,
    stockCount: 78,
    description: 'Gaming laptop with aggressive ROG design and solid performance for 1080p gaming.',
    features: [
      'Intel Core i7-13650HX',
      'NVIDIA GeForce RTX 4060',
      '16" FHD 165Hz display',
      'ROG Intelligent Cooling',
      'Aura Sync RGB lighting'
    ],
    images: [
      'https://m.media-amazon.com/images/I/71WHZzwRBjL._AC_SX679_.jpg'
    ],
    specifications: {
      'Processor': 'Intel Core i7-13650HX',
      'Graphics': 'NVIDIA RTX 4060 8GB',
      'Memory': '16GB DDR5',
      'Storage': '1TB PCIe SSD',
      'Display': '16" FHD 165Hz'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 3 },
    seller: { name: 'ASUS', rating: 4.7, fulfillment: 'Amazon' }
  },
  {
    id: 'alienware-m16-r2-i9-rtx4090-64gb-2tb',
    title: 'Alienware m16 R2 Gaming Laptop, Intel i9-14900HX, RTX 4090, 64GB, 2TB',
    price: 4499.99,
    originalPrice: 4999.99,
    currency: 'USD',
    rating: 4.9,
    reviewCount: 1234,
    category: 'electronics',
    subcategory: 'laptops',
    brand: 'Alienware',
    inStock: true,
    stockCount: 15,
    description: 'Ultimate gaming laptop with flagship RTX 4090 and premium Alienware design.',
    features: [
      'Intel Core i9-14900HX',
      'NVIDIA GeForce RTX 4090',
      '16" QHD+ 240Hz display',
      'Alienware Command Center',
      'Cryo-tech cooling'
    ],
    images: [
      'https://m.media-amazon.com/images/I/81KrF2QS8fL._AC_SX679_.jpg'
    ],
    specifications: {
      'Processor': 'Intel Core i9-14900HX',
      'Graphics': 'NVIDIA RTX 4090 16GB',
      'Memory': '64GB DDR5',
      'Storage': '2TB NVMe SSD',
      'Display': '16" QHD+ 240Hz G-SYNC'
    },
    delivery: { prime: false, freeShipping: true, estimatedDays: 7 },
    seller: { name: 'Alienware', rating: 4.7, fulfillment: 'Merchant' }
  },

  // OnePlus Series - Multiple Variants
  {
    id: 'oneplus-13-128gb-midnight-black',
    title: 'OnePlus 13 128GB - Midnight Black',
    price: 649.00,
    originalPrice: 699.00,
    currency: 'USD',
    rating: 4.4,
    reviewCount: 5832,
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'OnePlus',
    inStock: true,
    stockCount: 95,
    description: 'OnePlus 13 with Snapdragon 8 Gen 4, ultra-fast charging, and OxygenOS experience.',
    features: [
      'Snapdragon 8 Gen 4',
      '120W SuperVOOC charging',
      '6.82" Fluid AMOLED',
      'Hasselblad camera',
      'OxygenOS 15'
    ],
    images: [
      '/images/amazon/products/electronics/smartphones/samsung-galaxy-s24-1.jpg',
      '/images/amazon/products/electronics/smartphones/samsung-galaxy-s24-2.jpg'
    ],
    specifications: {
      'Display': '6.82" Fluid AMOLED',
      'Processor': 'Snapdragon 8 Gen 4',
      'Storage': '128GB',
      'Camera': '50MP + 50MP + 64MP',
      'Color': 'Midnight Black'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 2 },
    seller: { name: 'OnePlus Store', rating: 4.6, fulfillment: 'Amazon' }
  },
  {
    id: 'oneplus-13-256gb-arctic-dawn',
    title: 'OnePlus 13 256GB - Arctic Dawn',
    price: 749.00,
    originalPrice: 799.00,
    currency: 'USD',
    rating: 3.8,
    reviewCount: 3421,
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'OnePlus',
    inStock: true,
    stockCount: 68,
    description: 'OnePlus 13 in stunning Arctic Dawn finish with double storage capacity.',
    features: [
      'Snapdragon 8 Gen 4',
      '120W SuperVOOC charging',
      '6.82" Fluid AMOLED',
      'Hasselblad camera',
      'OxygenOS 15'
    ],
    images: [
      '/images/amazon/products/electronics/smartphones/iphone-15-pro-2.jpg',
      '/images/amazon/products/electronics/smartphones/iphone-15-pro-3.jpg'
    ],
    specifications: {
      'Display': '6.82" Fluid AMOLED',
      'Processor': 'Snapdragon 8 Gen 4',
      'Storage': '256GB',
      'Camera': '50MP + 50MP + 64MP',
      'Color': 'Arctic Dawn'
    },
    delivery: { prime: false, freeShipping: true, estimatedDays: 4 },
    seller: { name: 'Mobile Plus', rating: 4.3, fulfillment: 'Merchant' }
  },
  {
    id: 'oneplus-13-pro-512gb-emerald-forest',
    title: 'OnePlus 13 Pro 512GB - Emerald Forest',
    price: 899.00,
    originalPrice: 999.00,
    currency: 'USD',
    rating: 4.7,
    reviewCount: 2134,
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'OnePlus',
    inStock: true,
    stockCount: 42,
    description: 'Pro model with enhanced camera system and premium Emerald Forest finish.',
    features: [
      'Snapdragon 8 Gen 4',
      'Pro camera system',
      '150W SuperVOOC charging',
      'Curved display',
      'Alert Slider'
    ],
    images: [
      '/images/amazon/products/electronics/smartphones/samsung-galaxy-s24-1.jpg'
    ],
    specifications: {
      'Display': '6.82" Curved Fluid AMOLED',
      'Processor': 'Snapdragon 8 Gen 4',
      'Storage': '512GB',
      'Camera': '50MP + 64MP + 48MP',
      'Color': 'Emerald Forest'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 3 },
    seller: { name: 'OnePlus Store', rating: 4.6, fulfillment: 'Amazon' }
  },

  // Xiaomi Series - Multiple Variants
  {
    id: 'xiaomi-14-ultra-256gb-black',
    title: 'Xiaomi 14 Ultra 256GB - Black',
    price: 899.99,
    originalPrice: 999.99,
    currency: 'USD',
    rating: 4.6,
    reviewCount: 4521,
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Xiaomi',
    inStock: true,
    stockCount: 58,
    description: 'Flagship Xiaomi with Leica camera system and premium design.',
    features: [
      'Snapdragon 8 Gen 3',
      'Leica camera system',
      '6.73" C8+ LTPO OLED',
      '90W fast charging',
      'MIUI 15'
    ],
    images: [
      'https://m.media-amazon.com/images/I/71KqP3L8qeL._AC_SX679_.jpg'
    ],
    specifications: {
      'Display': '6.73" C8+ LTPO OLED',
      'Processor': 'Snapdragon 8 Gen 3',
      'Storage': '256GB',
      'Camera': '50MP + 50MP + 50MP + 50MP',
      'Color': 'Black'
    },
    delivery: { prime: false, freeShipping: true, estimatedDays: 5 },
    seller: { name: 'Xiaomi Global', rating: 4.4, fulfillment: 'Merchant' }
  },
  {
    id: 'xiaomi-14-128gb-green',
    title: 'Xiaomi 14 128GB - Green',
    price: 699.99,
    originalPrice: 799.99,
    currency: 'USD',
    rating: 3.9,
    reviewCount: 7234,
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Xiaomi',
    inStock: true,
    stockCount: 89,
    description: 'Xiaomi 14 with flagship performance at a more accessible price.',
    features: [
      'Snapdragon 8 Gen 3',
      'Leica camera collaboration',
      '6.36" C8 LTPO OLED',
      '90W HyperCharge',
      'MIUI 15'
    ],
    images: [
      'https://m.media-amazon.com/images/I/71H5K2B8vJL._AC_SX679_.jpg'
    ],
    specifications: {
      'Display': '6.36" C8 LTPO OLED',
      'Processor': 'Snapdragon 8 Gen 3',
      'Storage': '128GB',
      'Camera': '50MP + 50MP + 50MP',
      'Color': 'Green'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 3 },
    seller: { name: 'Amazon.com', rating: 4.8, fulfillment: 'Amazon' }
  },
  {
    id: 'xiaomi-redmi-note-13-pro-256gb-midnight-black',
    title: 'Xiaomi Redmi Note 13 Pro 256GB - Midnight Black',
    price: 299.99,
    originalPrice: 349.99,
    currency: 'USD',
    rating: 4.3,
    reviewCount: 12456,
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Xiaomi',
    inStock: true,
    stockCount: 156,
    description: 'Budget-friendly Redmi Note with pro camera features and long battery life.',
    features: [
      'MediaTek Dimensity 7200',
      '200MP camera system',
      '6.67" AMOLED display',
      '67W fast charging',
      '5000mAh battery'
    ],
    images: [
      'https://m.media-amazon.com/images/I/71XeP8F2K5L._AC_SX679_.jpg'
    ],
    specifications: {
      'Display': '6.67" AMOLED',
      'Processor': 'MediaTek Dimensity 7200',
      'Storage': '256GB',
      'Camera': '200MP + 8MP + 2MP',
      'Color': 'Midnight Black'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 2 },
    seller: { name: 'Xiaomi Official', rating: 4.5, fulfillment: 'Amazon' }
  },

  // Nothing Phone Series
  {
    id: 'nothing-phone-3-256gb-black',
    title: 'Nothing Phone (3) 256GB - Black',
    price: 599.00,
    originalPrice: 649.00,
    currency: 'USD',
    rating: 4.2,
    reviewCount: 3824,
    category: 'electronics',
    subcategory: 'smartphones',
    brand: 'Nothing',
    inStock: true,
    stockCount: 67,
    description: 'Unique transparent design with Glyph Interface and clean Android experience.',
    features: [
      'Snapdragon 8+ Gen 1',
      'Glyph Interface',
      'Transparent design',
      '6.7" LTPO OLED',
      'Nothing OS 3.0'
    ],
    images: [
      'https://m.media-amazon.com/images/I/71T5R6K8qjL._AC_SX679_.jpg'
    ],
    specifications: {
      'Display': '6.7" LTPO OLED',
      'Processor': 'Snapdragon 8+ Gen 1',
      'Storage': '256GB',
      'Camera': '50MP + 50MP',
      'Color': 'Black'
    },
    delivery: { prime: false, freeShipping: true, estimatedDays: 4 },
    seller: { name: 'Nothing Store', rating: 4.2, fulfillment: 'Merchant' }
  },

  // iPad Series - Multiple Variants
  {
    id: 'ipad-10th-gen-64gb-blue',
    title: 'Apple iPad (10th Generation) 64GB - Blue',
    price: 349.00,
    originalPrice: 449.00,
    currency: 'USD',
    rating: 4.6,
    reviewCount: 18234,
    category: 'electronics',
    subcategory: 'tablets',
    brand: 'Apple',
    inStock: true,
    stockCount: 125,
    description: 'Redesigned iPad with all-screen design and advanced features for everyone.',
    features: [
      'A14 Bionic chip',
      '10.9-inch Liquid Retina display',
      'Touch ID',
      'USB-C connector',
      'All-day battery life'
    ],
    images: [
      '/images/amazon/products/electronics/laptops/macbook-air-m3-1.jpg'
    ],
    specifications: {
      'Chip': 'A14 Bionic',
      'Storage': '64GB',
      'Display': '10.9" Liquid Retina',
      'Connectivity': 'Wi‑Fi',
      'Color': 'Blue'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 1 },
    seller: { name: 'Amazon.com', rating: 4.9, fulfillment: 'Amazon' }
  },
  {
    id: 'ipad-10th-gen-256gb-pink',
    title: 'Apple iPad (10th Generation) 256GB - Pink',
    price: 549.00,
    originalPrice: 599.00,
    currency: 'USD',
    rating: 4.7,
    reviewCount: 9832,
    category: 'electronics',
    subcategory: 'tablets',
    brand: 'Apple',
    inStock: true,
    stockCount: 98,
    description: 'iPad with more storage in beautiful Pink finish for creative work.',
    features: [
      'A14 Bionic chip',
      '10.9-inch Liquid Retina display',
      'Touch ID',
      'USB-C connector',
      'Works with Apple Pencil (1st gen)'
    ],
    images: [
      '/images/amazon/products/electronics/laptops/macbook-air-m3-2.jpg'
    ],
    specifications: {
      'Chip': 'A14 Bionic',
      'Storage': '256GB',
      'Display': '10.9" Liquid Retina',
      'Connectivity': 'Wi‑Fi',
      'Color': 'Pink'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 2 },
    seller: { name: 'Apple Store', rating: 4.8, fulfillment: 'Amazon' }
  },
  {
    id: 'ipad-mini-128gb-space-gray',
    title: 'Apple iPad Mini (6th Generation) 128GB - Space Gray',
    price: 499.00,
    originalPrice: 499.00,
    currency: 'USD',
    rating: 4.8,
    reviewCount: 12456,
    category: 'electronics',
    subcategory: 'tablets',
    brand: 'Apple',
    inStock: true,
    stockCount: 78,
    description: 'Compact iPad Mini with A15 Bionic chip in ultra-portable design.',
    features: [
      'A15 Bionic chip',
      '8.3-inch Liquid Retina display',
      'Touch ID',
      'Works with Apple Pencil (2nd gen)',
      'Center Stage camera'
    ],
    images: [
      '/images/amazon/products/electronics/laptops/macbook-air-m3-1.jpg'
    ],
    specifications: {
      'Chip': 'A15 Bionic',
      'Storage': '128GB',
      'Display': '8.3" Liquid Retina',
      'Connectivity': 'Wi‑Fi',
      'Color': 'Space Gray'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 2 },
    seller: { name: 'Amazon.com', rating: 4.9, fulfillment: 'Amazon' }
  },
  {
    id: 'ipad-mini-256gb-purple',
    title: 'Apple iPad Mini (6th Generation) 256GB - Purple',
    price: 649.00,
    originalPrice: 649.00,
    currency: 'USD',
    rating: 3.7,
    reviewCount: 5243,
    category: 'electronics',
    subcategory: 'tablets',
    brand: 'Apple',
    inStock: true,
    stockCount: 45,
    description: 'iPad Mini with maximum storage in vibrant Purple finish.',
    features: [
      'A15 Bionic chip',
      '8.3-inch Liquid Retina display',
      'Touch ID',
      'Works with Apple Pencil (2nd gen)',
      'Center Stage camera'
    ],
    images: [
      '/images/amazon/products/electronics/laptops/macbook-air-m3-2.jpg'
    ],
    specifications: {
      'Chip': 'A15 Bionic',
      'Storage': '256GB',
      'Display': '8.3" Liquid Retina',
      'Connectivity': 'Wi‑Fi',
      'Color': 'Purple'
    },
    delivery: { prime: false, freeShipping: true, estimatedDays: 4 },
    seller: { name: 'Tech Direct', rating: 4.4, fulfillment: 'Merchant' }
  },
  {
    id: 'ipad-pro-11-m4-256gb-space-black',
    title: 'Apple iPad Pro 11-inch M4 256GB - Space Black',
    price: 999.00,
    originalPrice: 999.00,
    currency: 'USD',
    rating: 4.9,
    reviewCount: 7821,
    category: 'electronics',
    subcategory: 'tablets',
    brand: 'Apple',
    inStock: true,
    stockCount: 52,
    description: 'iPad Pro with M4 chip delivers extreme performance for pro workflows.',
    features: [
      'Apple M4 chip',
      '11-inch Ultra Retina XDR',
      'Face ID',
      'Works with Apple Pencil Pro',
      'Thunderbolt / USB 4'
    ],
    images: [
      '/images/amazon/products/electronics/laptops/macbook-air-m3-1.jpg'
    ],
    specifications: {
      'Chip': 'Apple M4',
      'Storage': '256GB',
      'Display': '11" Ultra Retina XDR',
      'Connectivity': 'Wi‑Fi 6E',
      'Color': 'Space Black'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 3 },
    seller: { name: 'Amazon.com', rating: 4.9, fulfillment: 'Amazon' }
  },
  {
    id: 'ipad-pro-13-m4-512gb-silver',
    title: 'Apple iPad Pro 13-inch M4 512GB - Silver',
    price: 1399.00,
    originalPrice: 1499.00,
    currency: 'USD',
    rating: 4.8,
    reviewCount: 4132,
    category: 'electronics',
    subcategory: 'tablets',
    brand: 'Apple',
    inStock: true,
    stockCount: 28,
    description: 'Largest iPad Pro with stunning 13-inch display and M4 performance.',
    features: [
      'Apple M4 chip',
      '13-inch Ultra Retina XDR',
      'Face ID',
      'Works with Apple Pencil Pro',
      'Thunderbolt / USB 4'
    ],
    images: [
      '/images/amazon/products/electronics/laptops/macbook-air-m3-2.jpg'
    ],
    specifications: {
      'Chip': 'Apple M4',
      'Storage': '512GB',
      'Display': '13" Ultra Retina XDR',
      'Connectivity': 'Wi‑Fi 6E',
      'Color': 'Silver'
    },
    delivery: { prime: false, freeShipping: true, estimatedDays: 5 },
    seller: { name: 'Premium Electronics', rating: 4.3, fulfillment: 'Merchant' }
  },

  // Samsung Galaxy Tab Series - Multiple Variants
  {
    id: 'galaxy-tab-s10-128gb-silver',
    title: 'Samsung Galaxy Tab S10 11-inch 128GB - Silver',
    price: 549.99,
    originalPrice: 649.99,
    currency: 'USD',
    rating: 4.5,
    reviewCount: 8234,
    category: 'electronics',
    subcategory: 'tablets',
    brand: 'Samsung',
    inStock: true,
    stockCount: 89,
    description: 'Premium Android tablet with S Pen and DeX productivity features.',
    features: [
      'Snapdragon 8 Gen 3',
      '11-inch Dynamic AMOLED 2X',
      'S Pen included',
      'Samsung DeX',
      'IP68 water resistance'
    ],
    images: [
      '/images/amazon/products/electronics/smartphones/samsung-galaxy-s24-1.jpg'
    ],
    specifications: {
      'Display': '11" Dynamic AMOLED 2X',
      'Processor': 'Snapdragon 8 Gen 3',
      'Storage': '128GB',
      'S Pen': 'Included',
      'Color': 'Silver'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 2 },
    seller: { name: 'Samsung Store', rating: 4.7, fulfillment: 'Amazon' }
  },
  {
    id: 'galaxy-tab-s10-plus-256gb-gray',
    title: 'Samsung Galaxy Tab S10+ 12.4-inch 256GB - Gray',
    price: 799.99,
    originalPrice: 899.99,
    currency: 'USD',
    rating: 4.7,
    reviewCount: 5621,
    category: 'electronics',
    subcategory: 'tablets',
    brand: 'Samsung',
    inStock: true,
    stockCount: 64,
    description: 'Larger Galaxy Tab with enhanced productivity features and premium design.',
    features: [
      'Snapdragon 8 Gen 3',
      '12.4-inch Dynamic AMOLED 2X',
      'S Pen included',
      'Quad speakers by AKG',
      'Samsung DeX'
    ],
    images: [
      '/images/amazon/products/electronics/smartphones/samsung-galaxy-s24-2.jpg'
    ],
    specifications: {
      'Display': '12.4" Dynamic AMOLED 2X',
      'Processor': 'Snapdragon 8 Gen 3',
      'Storage': '256GB',
      'S Pen': 'Included',
      'Color': 'Gray'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 3 },
    seller: { name: 'Samsung Store', rating: 4.7, fulfillment: 'Amazon' }
  },
  {
    id: 'galaxy-tab-a9-plus-128gb-navy',
    title: 'Samsung Galaxy Tab A9+ 11-inch 128GB - Navy',
    price: 269.99,
    originalPrice: 329.99,
    currency: 'USD',
    rating: 3.8,
    reviewCount: 14521,
    category: 'electronics',
    subcategory: 'tablets',
    brand: 'Samsung',
    inStock: true,
    stockCount: 198,
    description: 'Affordable Galaxy Tab for everyday entertainment and productivity.',
    features: [
      'MediaTek Helio G99',
      '11-inch TFT display',
      'Quad speakers',
      'Long-lasting battery',
      'Multi-window support'
    ],
    images: [
      '/images/amazon/products/electronics/smartphones/samsung-galaxy-s24-1.jpg'
    ],
    specifications: {
      'Display': '11" TFT',
      'Processor': 'MediaTek Helio G99',
      'Storage': '128GB',
      'RAM': '8GB',
      'Color': 'Navy'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 1 },
    seller: { name: 'Amazon.com', rating: 4.8, fulfillment: 'Amazon' }
  },

  // Microsoft Surface Series
  {
    id: 'surface-pro-11-256gb-platinum',
    title: 'Microsoft Surface Pro 11 256GB - Platinum',
    price: 1199.99,
    originalPrice: 1399.99,
    currency: 'USD',
    rating: 4.4,
    reviewCount: 6834,
    category: 'electronics',
    subcategory: 'tablets',
    brand: 'Microsoft',
    inStock: true,
    stockCount: 72,
    description: '2-in-1 laptop tablet with Snapdragon X Elite for all-day battery life.',
    features: [
      'Snapdragon X Elite',
      '13-inch PixelSense Flow',
      'Copilot+ PC',
      'All-day battery',
      'Windows 11'
    ],
    images: [
      'https://m.media-amazon.com/images/I/71XhqS8SCPL._AC_SX679_.jpg'
    ],
    specifications: {
      'Processor': 'Snapdragon X Elite',
      'Storage': '256GB',
      'Display': '13" PixelSense Flow',
      'RAM': '16GB',
      'Color': 'Platinum'
    },
    delivery: { prime: false, freeShipping: true, estimatedDays: 4 },
    seller: { name: 'Microsoft Store', rating: 4.5, fulfillment: 'Merchant' }
  },
  {
    id: 'surface-go-4-128gb-matte-black',
    title: 'Microsoft Surface Go 4 128GB - Matte Black',
    price: 549.99,
    originalPrice: 629.99,
    currency: 'USD',
    rating: 4.1,
    reviewCount: 3825,
    category: 'electronics',
    subcategory: 'tablets',
    brand: 'Microsoft',
    inStock: true,
    stockCount: 56,
    description: 'Compact Surface tablet perfect for on-the-go productivity.',
    features: [
      'Intel Processor N200',
      '10.5-inch PixelSense',
      'Windows 11',
      'All-day battery',
      'USB-C connectivity'
    ],
    images: [
      'https://m.media-amazon.com/images/I/71h8Qc6GKQL._AC_SX679_.jpg'
    ],
    specifications: {
      'Processor': 'Intel Processor N200',
      'Storage': '128GB',
      'Display': '10.5" PixelSense',
      'RAM': '8GB',
      'Color': 'Matte Black'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 3 },
    seller: { name: 'Amazon.com', rating: 4.8, fulfillment: 'Amazon' }
  },

  // More Headphones Variants
  {
    id: 'beats-studio-pro-sandstone',
    title: 'Beats Studio Pro Wireless Headphones - Sandstone',
    price: 349.95,
    originalPrice: 349.95,
    currency: 'USD',
    rating: 4.3,
    reviewCount: 18234,
    category: 'electronics',
    subcategory: 'headphones',
    brand: 'Beats',
    inStock: true,
    stockCount: 156,
    description: 'Premium wireless headphones with lossless audio and Adaptive Noise Cancelling.',
    features: [
      'Lossless Audio via USB-C',
      'Adaptive Noise Cancelling',
      'Up to 40 hours battery',
      'Spatial Audio',
      'Enhanced compatibility'
    ],
    images: [
      'https://m.media-amazon.com/images/I/61DQrHxZkxL._AC_SX679_.jpg'
    ],
    specifications: {
      'Form Factor': 'Over-Ear',
      'Connectivity': 'Bluetooth 5.3',
      'Battery Life': 'Up to 40 hours',
      'Noise Cancelation': 'Active',
      'Color': 'Sandstone'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 2 },
    seller: { name: 'Beats', rating: 4.7, fulfillment: 'Amazon' }
  },
  {
    id: 'beats-solo-4-matte-black',
    title: 'Beats Solo 4 Wireless On-Ear Headphones - Matte Black',
    price: 199.95,
    originalPrice: 199.95,
    currency: 'USD',
    rating: 3.9,
    reviewCount: 24561,
    category: 'electronics',
    subcategory: 'headphones',
    brand: 'Beats',
    inStock: true,
    stockCount: 210,
    description: 'On-ear headphones with signature Beats sound and all-day comfort.',
    features: [
      'Signature Beats sound',
      'Up to 50 hours battery',
      'Fast Fuel charging',
      'On-ear comfort',
      'Spatial Audio'
    ],
    images: [
      'https://m.media-amazon.com/images/I/61QE7rE9m4L._AC_SX679_.jpg'
    ],
    specifications: {
      'Form Factor': 'On-Ear',
      'Connectivity': 'Bluetooth',
      'Battery Life': 'Up to 50 hours',
      'Fast Charge': '10 min = 5 hours',
      'Color': 'Matte Black'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 1 },
    seller: { name: 'Amazon.com', rating: 4.8, fulfillment: 'Amazon' }
  },
  {
    id: 'audio-technica-ath-m50x-black',
    title: 'Audio-Technica ATH-M50x Professional Studio Monitor Headphones - Black',
    price: 149.00,
    originalPrice: 169.00,
    currency: 'USD',
    rating: 4.6,
    reviewCount: 52341,
    category: 'electronics',
    subcategory: 'headphones',
    brand: 'Audio-Technica',
    inStock: true,
    stockCount: 134,
    description: 'Professional studio monitor headphones with exceptional clarity and deep bass.',
    features: [
      'Professional studio sound',
      '45mm large-aperture drivers',
      'Detachable cables',
      'Swiveling earcups',
      'Circumaural design'
    ],
    images: [
      'https://m.media-amazon.com/images/I/71YKPdUJVKL._AC_SX679_.jpg'
    ],
    specifications: {
      'Form Factor': 'Over-Ear',
      'Connectivity': 'Wired (3.5mm)',
      'Driver Size': '45mm',
      'Frequency Response': '15-28,000 Hz',
      'Color': 'Black'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 1 },
    seller: { name: 'Audio-Technica', rating: 4.8, fulfillment: 'Amazon' }
  },
  {
    id: 'sennheiser-hd-650-black',
    title: 'Sennheiser HD 650 Open-Back Audiophile Headphones - Black',
    price: 499.95,
    originalPrice: 499.95,
    currency: 'USD',
    rating: 4.8,
    reviewCount: 8934,
    category: 'electronics',
    subcategory: 'headphones',
    brand: 'Sennheiser',
    inStock: true,
    stockCount: 68,
    description: 'Reference-quality open-back headphones for critical listening.',
    features: [
      'Open-back design',
      'Titanium-silver drivers',
      'Velour earpads',
      'Audiophile quality',
      'Replaceable cable'
    ],
    images: [
      'https://m.media-amazon.com/images/I/61SZFKz-AGL._AC_SX679_.jpg'
    ],
    specifications: {
      'Form Factor': 'Open-Back Over-Ear',
      'Connectivity': 'Wired (6.3mm)',
      'Impedance': '300 ohms',
      'Frequency Response': '10-41,000 Hz',
      'Color': 'Black'
    },
    delivery: { prime: false, freeShipping: true, estimatedDays: 3 },
    seller: { name: 'Sennheiser', rating: 4.7, fulfillment: 'Merchant' }
  },

  // Gaming Headsets
  {
    id: 'steelseries-arctis-7p-black',
    title: 'SteelSeries Arctis 7P Wireless Gaming Headset - Black',
    price: 149.99,
    originalPrice: 179.99,
    currency: 'USD',
    rating: 4.4,
    reviewCount: 15624,
    category: 'electronics',
    subcategory: 'headphones',
    brand: 'SteelSeries',
    inStock: true,
    stockCount: 92,
    description: 'Wireless gaming headset with lossless 2.4GHz connection for PlayStation and PC.',
    features: [
      'Lossless 2.4GHz wireless',
      'ClearCast microphone',
      '24-hour battery life',
      'DTS Headphone:X v2.0',
      'PlayStation 5 3D Audio'
    ],
    images: [
      'https://m.media-amazon.com/images/I/71EbMYgOd8L._AC_SX679_.jpg'
    ],
    specifications: {
      'Form Factor': 'Over-Ear Gaming',
      'Connectivity': '2.4GHz Wireless',
      'Battery Life': '24 hours',
      'Microphone': 'ClearCast',
      'Color': 'Black'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 2 },
    seller: { name: 'SteelSeries', rating: 4.6, fulfillment: 'Amazon' }
  },
  {
    id: 'razer-blackshark-v2-black',
    title: 'Razer BlackShark V2 Gaming Headset - Black',
    price: 99.99,
    originalPrice: 99.99,
    currency: 'USD',
    rating: 4.2,
    reviewCount: 28341,
    category: 'electronics',
    subcategory: 'headphones',
    brand: 'Razer',
    inStock: true,
    stockCount: 167,
    description: 'Esports gaming headset with advanced passive noise cancellation.',
    features: [
      'TriForce Titanium drivers',
      'Advanced passive noise cancellation',
      'HyperClear cardioid mic',
      'Memory foam ear cushions',
      'THX 7.1 Surround Sound'
    ],
    images: [
      'https://m.media-amazon.com/images/I/61mpEFLBaOL._AC_SX679_.jpg'
    ],
    specifications: {
      'Form Factor': 'Over-Ear Gaming',
      'Connectivity': 'Wired (3.5mm)',
      'Driver Size': '50mm TriForce',
      'Microphone': 'HyperClear',
      'Color': 'Black'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 1 },
    seller: { name: 'Razer', rating: 4.5, fulfillment: 'Amazon' }
  },

  // More Books - Fiction Variants
  {
    id: 'dune-frank-herbert-paperback',
    title: 'Dune by Frank Herbert (Paperback)',
    price: 9.99,
    originalPrice: 16.99,
    currency: 'USD',
    rating: 4.8,
    reviewCount: 87432,
    category: 'books',
    subcategory: 'fiction',
    brand: 'Ace',
    inStock: true,
    stockCount: 420,
    author: 'Frank Herbert',
    description: 'Epic science fiction masterpiece set on the desert planet Arrakis.',
    features: [
      'Science fiction classic',
      'Hugo Award winner',
      'Movie tie-in edition',
      'Paperback format',
      'English language'
    ],
    images: [
      '/images/amazon/products/books/fiction/fourth-wing-1.jpg'
    ],
    specifications: {
      'Author': 'Frank Herbert',
      'Publisher': 'Ace',
      'Pages': '688',
      'Language': 'English',
      'Format': 'Paperback'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 2 },
    seller: { name: 'Amazon.com', rating: 4.9, fulfillment: 'Amazon' }
  },
  {
    id: 'dune-hardcover-deluxe',
    title: 'Dune by Frank Herbert (Deluxe Hardcover Edition)',
    price: 24.99,
    originalPrice: 34.99,
    currency: 'USD',
    rating: 4.9,
    reviewCount: 12456,
    category: 'books',
    subcategory: 'fiction',
    brand: 'Ace',
    inStock: true,
    stockCount: 89,
    author: 'Frank Herbert',
    description: 'Premium hardcover edition of the science fiction masterpiece with dust jacket.',
    features: [
      'Deluxe hardcover',
      'Dust jacket included',
      'Premium paper quality',
      'Collectible edition',
      'English language'
    ],
    images: [
      '/images/amazon/products/books/fiction/fourth-wing-2.jpg'
    ],
    specifications: {
      'Author': 'Frank Herbert',
      'Publisher': 'Ace',
      'Pages': '688',
      'Language': 'English',
      'Format': 'Hardcover'
    },
    delivery: { prime: false, freeShipping: true, estimatedDays: 4 },
    seller: { name: 'Book Depot', rating: 4.4, fulfillment: 'Merchant' }
  },
  {
    id: 'dune-audiobook-cd',
    title: 'Dune by Frank Herbert (Audiobook CD)',
    price: 39.99,
    originalPrice: 49.99,
    currency: 'USD',
    rating: 4.6,
    reviewCount: 8234,
    category: 'books',
    subcategory: 'fiction',
    brand: 'Macmillan Audio',
    inStock: true,
    stockCount: 156,
    author: 'Frank Herbert',
    description: 'Unabridged audiobook narrated by Scott Brick, Simon Vance, and others.',
    features: [
      'Unabridged audiobook',
      'Multiple narrators',
      'CD format',
      '21 hours runtime',
      'High audio quality'
    ],
    images: [
      '/images/amazon/products/books/fiction/fourth-wing-1.jpg'
    ],
    specifications: {
      'Author': 'Frank Herbert',
      'Publisher': 'Macmillan Audio',
      'Runtime': '21 hours',
      'Narrators': 'Scott Brick, Simon Vance',
      'Format': 'Audio CD'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 3 },
    seller: { name: 'Amazon.com', rating: 4.8, fulfillment: 'Amazon' }
  },

  // More Non-Fiction Books
  {
    id: 'thinking-fast-and-slow-paperback',
    title: 'Thinking, Fast and Slow by Daniel Kahneman (Paperback)',
    price: 11.49,
    originalPrice: 17.00,
    currency: 'USD',
    rating: 4.5,
    reviewCount: 34521,
    category: 'books',
    subcategory: 'non-fiction',
    brand: 'Farrar, Straus and Giroux',
    inStock: true,
    stockCount: 298,
    author: 'Daniel Kahneman',
    description: 'Groundbreaking exploration of the mind and decision-making by Nobel laureate.',
    features: [
      'Psychology and economics',
      'Nobel laureate author',
      'Behavioral insights',
      'Paperback edition',
      'International bestseller'
    ],
    images: [
      '/images/amazon/products/books/non-fiction/atomic-habits-1.jpg'
    ],
    specifications: {
      'Author': 'Daniel Kahneman',
      'Publisher': 'Farrar, Straus and Giroux',
      'Pages': '512',
      'Language': 'English',
      'Format': 'Paperback'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 2 },
    seller: { name: 'Amazon.com', rating: 4.8, fulfillment: 'Amazon' }
  },
  {
    id: 'thinking-fast-and-slow-hardcover',
    title: 'Thinking, Fast and Slow by Daniel Kahneman (Hardcover)',
    price: 18.99,
    originalPrice: 28.95,
    currency: 'USD',
    rating: 3.7,
    reviewCount: 18432,
    category: 'books',
    subcategory: 'non-fiction',
    brand: 'Farrar, Straus and Giroux',
    inStock: true,
    stockCount: 124,
    author: 'Daniel Kahneman',
    description: 'Hardcover edition of the groundbreaking book on human decision-making.',
    features: [
      'Premium hardcover',
      'Dust jacket',
      'Nobel laureate author',
      'Library quality',
      'Gift-worthy edition'
    ],
    images: [
      '/images/amazon/products/books/non-fiction/atomic-habits-2.jpg'
    ],
    specifications: {
      'Author': 'Daniel Kahneman',
      'Publisher': 'Farrar, Straus and Giroux',
      'Pages': '512',
      'Language': 'English',
      'Format': 'Hardcover'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 3 },
    seller: { name: 'Amazon.com', rating: 4.8, fulfillment: 'Amazon' }
  },
  {
    id: 'becoming-michelle-obama-paperback',
    title: 'Becoming by Michelle Obama (Paperback)',
    price: 10.99,
    originalPrice: 17.99,
    currency: 'USD',
    rating: 4.9,
    reviewCount: 128456,
    category: 'books',
    subcategory: 'non-fiction',
    brand: 'Crown',
    inStock: true,
    stockCount: 456,
    author: 'Michelle Obama',
    description: 'Intimate memoir from former First Lady Michelle Obama.',
    features: [
      'Memoir and autobiography',
      '#1 bestseller',
      'Inspirational story',
      'Paperback edition',
      'Oprah Book Club pick'
    ],
    images: [
      '/images/amazon/products/books/non-fiction/atomic-habits-1.jpg'
    ],
    specifications: {
      'Author': 'Michelle Obama',
      'Publisher': 'Crown',
      'Pages': '448',
      'Language': 'English',
      'Format': 'Paperback'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 1 },
    seller: { name: 'Amazon.com', rating: 4.9, fulfillment: 'Amazon' }
  },
  {
    id: 'becoming-michelle-obama-signed',
    title: 'Becoming by Michelle Obama (Signed Hardcover)',
    price: 65.00,
    originalPrice: 32.50,
    currency: 'USD',
    rating: 2.8,
    reviewCount: 892,
    category: 'books',
    subcategory: 'non-fiction',
    brand: 'Crown',
    inStock: true,
    stockCount: 12,
    author: 'Michelle Obama',
    description: 'Limited signed hardcover edition - authenticated signature.',
    features: [
      'Signed by author',
      'Authentication certificate',
      'Collectible edition',
      'Premium hardcover',
      'Limited availability'
    ],
    images: [
      '/images/amazon/products/books/non-fiction/atomic-habits-2.jpg'
    ],
    specifications: {
      'Author': 'Michelle Obama',
      'Publisher': 'Crown',
      'Pages': '448',
      'Language': 'English',
      'Format': 'Signed Hardcover'
    },
    delivery: { prime: false, freeShipping: true, estimatedDays: 7 },
    seller: { name: 'Rare Books Collectibles', rating: 3.9, fulfillment: 'Merchant' }
  },

  // More Clothing Variants - Men's
  {
    id: 'levi-511-slim-jeans-blue-30x32',
    title: "Levi's 511 Slim Jeans - Blue (30x32)",
    price: 59.99,
    originalPrice: 69.99,
    currency: 'USD',
    rating: 4.3,
    reviewCount: 34521,
    category: 'clothing',
    subcategory: 'mens-clothing',
    brand: "Levi's",
    inStock: true,
    stockCount: 145,
    description: 'Classic slim-fit jeans with the perfect balance of comfort and style.',
    features: [
      'Slim fit',
      '30x32 size',
      '99% cotton, 1% elastane',
      'Machine washable',
      'Classic 5-pocket styling'
    ],
    images: [
      '/images/amazon/products/clothing/mens-clothing/levi-501-1.jpg',
      '/images/amazon/products/clothing/mens-clothing/levi-501-2.jpg'
    ],
    specifications: {
      'Brand': "Levi's",
      'Size': '30x32',
      'Fit': 'Slim',
      'Material': '99% Cotton, 1% Elastane',
      'Color': 'Blue'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 2 },
    seller: { name: "Levi's Store", rating: 4.8, fulfillment: 'Amazon' }
  },
  {
    id: 'levi-511-slim-jeans-black-32x34',
    title: "Levi's 511 Slim Jeans - Black (32x34)",
    price: 64.99,
    originalPrice: 69.99,
    currency: 'USD',
    rating: 3.6,
    reviewCount: 18234,
    category: 'clothing',
    subcategory: 'mens-clothing',
    brand: "Levi's",
    inStock: true,
    stockCount: 98,
    description: 'Versatile black slim-fit jeans perfect for casual or semi-formal occasions.',
    features: [
      'Slim fit',
      '32x34 size',
      '99% cotton, 1% elastane',
      'Machine washable',
      'Black wash'
    ],
    images: [
      '/images/amazon/products/clothing/mens-clothing/levi-501-2.jpg'
    ],
    specifications: {
      'Brand': "Levi's",
      'Size': '32x34',
      'Fit': 'Slim',
      'Material': '99% Cotton, 1% Elastane',
      'Color': 'Black'
    },
    delivery: { prime: false, freeShipping: true, estimatedDays: 4 },
    seller: { name: 'Clothing Outlet', rating: 4.2, fulfillment: 'Merchant' }
  },
  {
    id: 'champion-powerblend-hoodie-gray-large',
    title: 'Champion Powerblend Fleece Hoodie - Gray (Large)',
    price: 29.99,
    originalPrice: 35.00,
    currency: 'USD',
    rating: 4.5,
    reviewCount: 67234,
    category: 'clothing',
    subcategory: 'mens-clothing',
    brand: 'Champion',
    inStock: true,
    stockCount: 234,
    description: 'Comfortable fleece hoodie with reduced pilling and shrinkage.',
    features: [
      'Powerblend fleece',
      'Reduced pilling',
      'Less shrinkage',
      'Kangaroo pocket',
      'Adjustable hood'
    ],
    images: [
      'https://m.media-amazon.com/images/I/71L8QH7z2HL._AC_UX679_.jpg'
    ],
    specifications: {
      'Brand': 'Champion',
      'Size': 'Large',
      'Material': '50% Cotton, 50% Polyester',
      'Color': 'Gray',
      'Fit': 'Regular'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 1 },
    seller: { name: 'Amazon.com', rating: 4.9, fulfillment: 'Amazon' }
  },
  {
    id: 'champion-powerblend-hoodie-navy-medium',
    title: 'Champion Powerblend Fleece Hoodie - Navy (Medium)',
    price: 32.99,
    originalPrice: 35.00,
    currency: 'USD',
    rating: 4.4,
    reviewCount: 45123,
    category: 'clothing',
    subcategory: 'mens-clothing',
    brand: 'Champion',
    inStock: true,
    stockCount: 156,
    description: 'Classic navy hoodie with Champion quality and comfort.',
    features: [
      'Powerblend fleece',
      'Reduced pilling',
      'Less shrinkage',
      'Kangaroo pocket',
      'Script logo'
    ],
    images: [
      'https://m.media-amazon.com/images/I/71qRH8z2bKL._AC_UX679_.jpg'
    ],
    specifications: {
      'Brand': 'Champion',
      'Size': 'Medium',
      'Material': '50% Cotton, 50% Polyester',
      'Color': 'Navy',
      'Fit': 'Regular'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 2 },
    seller: { name: 'Champion Official', rating: 4.7, fulfillment: 'Amazon' }
  },

  // Women's Clothing
  {
    id: 'lululemon-align-leggings-black-size-4',
    title: 'Lululemon Align High-Rise Pant 25" - Black (Size 4)',
    price: 128.00,
    originalPrice: 128.00,
    currency: 'USD',
    rating: 4.8,
    reviewCount: 89234,
    category: 'clothing',
    subcategory: 'womens-clothing',
    brand: 'Lululemon',
    inStock: true,
    stockCount: 87,
    description: 'Buttery-soft leggings that feel like a second skin, perfect for yoga and lounging.',
    features: [
      'Nulu fabric',
      'High-rise waistband',
      '25-inch inseam',
      'Four-way stretch',
      'Seamless construction'
    ],
    images: [
      'https://m.media-amazon.com/images/I/61YZ8Q9JGHL._AC_UX679_.jpg'
    ],
    specifications: {
      'Brand': 'Lululemon',
      'Size': '4',
      'Inseam': '25 inches',
      'Material': 'Nulu fabric',
      'Color': 'Black'
    },
    delivery: { prime: false, freeShipping: true, estimatedDays: 3 },
    seller: { name: 'Lululemon', rating: 4.6, fulfillment: 'Merchant' }
  },
  {
    id: 'lululemon-align-leggings-navy-size-6',
    title: 'Lululemon Align High-Rise Pant 28" - Navy (Size 6)',
    price: 128.00,
    originalPrice: 128.00,
    currency: 'USD',
    rating: 2.9,
    reviewCount: 23456,
    category: 'clothing',
    subcategory: 'womens-clothing',
    brand: 'Lululemon',
    inStock: true,
    stockCount: 43,
    description: 'Longer length align leggings in versatile navy color.',
    features: [
      'Nulu fabric',
      'High-rise waistband',
      '28-inch inseam',
      'Four-way stretch',
      'Seamless construction'
    ],
    images: [
      'https://m.media-amazon.com/images/I/61XZ8Q9JGYL._AC_UX679_.jpg'
    ],
    specifications: {
      'Brand': 'Lululemon',
      'Size': '6',
      'Inseam': '28 inches',
      'Material': 'Nulu fabric',
      'Color': 'Navy'
    },
    delivery: { prime: false, freeShipping: true, estimatedDays: 5 },
    seller: { name: 'Athletic Apparel Plus', rating: 3.8, fulfillment: 'Merchant' }
  },

  // Footwear
  {
    id: 'nike-air-force-1-white-size-9',
    title: 'Nike Air Force 1 07 - White (Size 9)',
    price: 110.00,
    originalPrice: 110.00,
    currency: 'USD',
    rating: 3.7,
    reviewCount: 156234,
    category: 'clothing',
    subcategory: 'shoes',
    brand: 'Nike',
    inStock: true,
    stockCount: 198,
    description: 'Iconic basketball sneaker with classic white colorway and premium leather upper.',
    features: [
      'Full-grain leather upper',
      'Nike Air cushioning',
      'Rubber outsole',
      'Classic basketball style',
      'Multiple size options'
    ],
    images: [
      'https://m.media-amazon.com/images/I/71Q7JjG8WZL._AC_UX679_.jpg'
    ],
    specifications: {
      'Brand': 'Nike',
      'Size': '9',
      'Material': 'Leather',
      'Color': 'White',
      'Type': 'Basketball Sneaker'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 2 },
    seller: { name: 'Nike', rating: 4.8, fulfillment: 'Amazon' }
  },
  {
    id: 'nike-air-force-1-black-size-10',
    title: 'Nike Air Force 1 07 - Black (Size 10)',
    price: 110.00,
    originalPrice: 110.00,
    currency: 'USD',
    rating: 4.6,
    reviewCount: 89234,
    category: 'clothing',
    subcategory: 'shoes',
    brand: 'Nike',
    inStock: true,
    stockCount: 145,
    description: 'Classic Air Force 1 in versatile all-black colorway.',
    features: [
      'Full-grain leather upper',
      'Nike Air cushioning',
      'Rubber outsole',
      'All-black design',
      'Durable construction'
    ],
    images: [
      'https://m.media-amazon.com/images/I/71Q7JjG8WBL._AC_UX679_.jpg'
    ],
    specifications: {
      'Brand': 'Nike',
      'Size': '10',
      'Material': 'Leather',
      'Color': 'Black',
      'Type': 'Basketball Sneaker'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 1 },
    seller: { name: 'Amazon.com', rating: 4.9, fulfillment: 'Amazon' }
  },
  {
    id: 'allbirds-tree-runners-gray-size-8',
    title: 'Allbirds Tree Runners - Gray (Size 8)',
    price: 98.00,
    originalPrice: 98.00,
    currency: 'USD',
    rating: 4.2,
    reviewCount: 34521,
    category: 'clothing',
    subcategory: 'shoes',
    brand: 'Allbirds',
    inStock: true,
    stockCount: 78,
    description: 'Sustainable sneakers made from eucalyptus tree fiber for all-day comfort.',
    features: [
      'Tree fiber upper',
      'Sustainable materials',
      'Machine washable',
      'Breathable design',
      'Minimal design'
    ],
    images: [
      'https://m.media-amazon.com/images/I/71XLK5H9g8L._AC_UX679_.jpg'
    ],
    specifications: {
      'Brand': 'Allbirds',
      'Size': '8',
      'Material': 'Tree Fiber',
      'Color': 'Gray',
      'Type': 'Casual Sneaker'
    },
    delivery: { prime: false, freeShipping: true, estimatedDays: 4 },
    seller: { name: 'Allbirds', rating: 4.4, fulfillment: 'Merchant' }
  },

  // Home & Kitchen Appliances
  {
    id: 'vitamix-a3500-blender-brushed-steel',
    title: 'Vitamix A3500 Ascent Series Smart Blender - Brushed Stainless Steel',
    price: 549.95,
    originalPrice: 599.95,
    currency: 'USD',
    rating: 4.6,
    reviewCount: 12456,
    category: 'home-garden',
    subcategory: 'kitchen',
    brand: 'Vitamix',
    inStock: true,
    stockCount: 42,
    description: 'Professional-grade smart blender with wireless connectivity and self-detect technology.',
    features: [
      'Self-detect technology',
      'Wireless connectivity',
      '2.2 HP motor',
      '64oz container',
      'Touch screen controls'
    ],
    images: [
      '/images/amazon/products/home-garden/kitchen/instant-pot-duo-1.jpg'
    ],
    specifications: {
      'Brand': 'Vitamix',
      'Capacity': '64 oz',
      'Motor': '2.2 HP',
      'Material': 'Stainless Steel',
      'Color': 'Brushed Stainless'
    },
    delivery: { prime: false, freeShipping: true, estimatedDays: 5 },
    seller: { name: 'Vitamix', rating: 4.5, fulfillment: 'Merchant' }
  },
  {
    id: 'vitamix-5200-blender-black',
    title: 'Vitamix 5200 Blender - Black',
    price: 399.95,
    originalPrice: 449.95,
    currency: 'USD',
    rating: 4.0,
    reviewCount: 28934,
    category: 'home-garden',
    subcategory: 'kitchen',
    brand: 'Vitamix',
    inStock: true,
    stockCount: 89,
    description: 'Classic Vitamix blender with variable speed control and aircraft-grade stainless steel blades.',
    features: [
      'Variable speed control',
      'Aircraft-grade blades',
      '2 HP motor',
      '64oz container',
      '7-year warranty'
    ],
    images: [
      '/images/amazon/products/home-garden/kitchen/instant-pot-duo-2.jpg'
    ],
    specifications: {
      'Brand': 'Vitamix',
      'Capacity': '64 oz',
      'Motor': '2 HP',
      'Controls': 'Variable Speed',
      'Color': 'Black'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 3 },
    seller: { name: 'Amazon.com', rating: 4.8, fulfillment: 'Amazon' }
  },
  {
    id: 'ninja-foodi-personal-blender-gray',
    title: 'Ninja Foodi Personal Blender with Auto-iQ - Gray',
    price: 79.99,
    originalPrice: 99.99,
    currency: 'USD',
    rating: 4.3,
    reviewCount: 45623,
    category: 'home-garden',
    subcategory: 'kitchen',
    brand: 'Ninja',
    inStock: true,
    stockCount: 167,
    description: 'Compact personal blender perfect for smoothies and protein shakes.',
    features: [
      'Auto-iQ technology',
      '18oz cups included',
      'Easy cleanup',
      'Compact design',
      'BPA-free'
    ],
    images: [
      'https://m.media-amazon.com/images/I/81QKg5j7DyL._AC_SL1500_.jpg'
    ],
    specifications: {
      'Brand': 'Ninja',
      'Capacity': '18 oz',
      'Programs': 'Auto-iQ',
      'Material': 'BPA-Free Plastic',
      'Color': 'Gray'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 2 },
    seller: { name: 'Ninja Kitchen', rating: 4.6, fulfillment: 'Amazon' }
  },
  {
    id: 'ninja-foodi-personal-blender-red',
    title: 'Ninja Foodi Personal Blender with Auto-iQ - Red',
    price: 74.99,
    originalPrice: 99.99,
    currency: 'USD',
    rating: 3.8,
    reviewCount: 23567,
    category: 'home-garden',
    subcategory: 'kitchen',
    brand: 'Ninja',
    inStock: true,
    stockCount: 92,
    description: 'Bold red personal blender with the same great performance.',
    features: [
      'Auto-iQ technology',
      '18oz cups included',
      'Easy cleanup',
      'Compact design',
      'BPA-free'
    ],
    images: [
      'https://m.media-amazon.com/images/I/81QKg5j7DzL._AC_SL1500_.jpg'
    ],
    specifications: {
      'Brand': 'Ninja',
      'Capacity': '18 oz',
      'Programs': 'Auto-iQ',
      'Material': 'BPA-Free Plastic',
      'Color': 'Red'
    },
    delivery: { prime: false, freeShipping: true, estimatedDays: 4 },
    seller: { name: 'Kitchen World', rating: 4.2, fulfillment: 'Merchant' }
  },

  // Coffee Makers
  {
    id: 'breville-barista-express-stainless',
    title: 'Breville Barista Express Espresso Machine - Stainless Steel',
    price: 699.95,
    originalPrice: 799.95,
    currency: 'USD',
    rating: 4.0,
    reviewCount: 18945,
    category: 'home-garden',
    subcategory: 'kitchen',
    brand: 'Breville',
    inStock: true,
    stockCount: 34,
    description: 'All-in-one espresso machine with built-in grinder and steam wand.',
    features: [
      'Built-in conical burr grinder',
      '15 bar Italian pump',
      'Steam wand for milk texturing',
      'Stainless steel construction',
      'Pre-infusion function'
    ],
    images: [
      'https://m.media-amazon.com/images/I/81J7wpqhZjL._AC_SL1500_.jpg'
    ],
    specifications: {
      'Brand': 'Breville',
      'Type': 'Espresso Machine',
      'Pressure': '15 bar',
      'Grinder': 'Conical Burr',
      'Color': 'Stainless Steel'
    },
    delivery: { prime: false, freeShipping: true, estimatedDays: 5 },
    seller: { name: 'Breville', rating: 4.5, fulfillment: 'Merchant' }
  },
  {
    id: 'keurig-k-supreme-plus-black',
    title: 'Keurig K-Supreme Plus Smart Coffee Maker - Black',
    price: 179.99,
    originalPrice: 199.99,
    currency: 'USD',
    rating: 4.1,
    reviewCount: 67234,
    category: 'home-garden',
    subcategory: 'kitchen',
    brand: 'Keurig',
    inStock: true,
    stockCount: 156,
    description: 'Smart single serve coffee maker with app connectivity and customizable brewing.',
    features: [
      'Smart brewing technology',
      'App connectivity',
      'Multiple cup sizes',
      '78oz removable reservoir',
      'BrewID technology'
    ],
    images: [
      'https://m.media-amazon.com/images/I/71yL5JNv3yL._AC_SL1500_.jpg'
    ],
    specifications: {
      'Brand': 'Keurig',
      'Type': 'Single Serve',
      'Reservoir': '78 oz',
      'Connectivity': 'Wi-Fi',
      'Color': 'Black'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 2 },
    seller: { name: 'Keurig', rating: 4.7, fulfillment: 'Amazon' }
  },
  {
    id: 'oxo-brew-9-cup-coffee-maker',
    title: 'OXO 9-Cup Coffee Maker - Stainless Steel',
    price: 199.95,
    originalPrice: 229.95,
    currency: 'USD',
    rating: 4.6,
    reviewCount: 8234,
    category: 'home-garden',
    subcategory: 'kitchen',
    brand: 'OXO',
    inStock: true,
    stockCount: 67,
    description: 'SCA-certified drip coffee maker with precise temperature and timing control.',
    features: [
      'SCA certified',
      'Precise temperature control',
      'Better extraction',
      '9-cup capacity',
      'Programmable'
    ],
    images: [
      'https://m.media-amazon.com/images/I/71FfKMJ7d4L._AC_SL1500_.jpg'
    ],
    specifications: {
      'Brand': 'OXO',
      'Capacity': '9 cups',
      'Certification': 'SCA',
      'Material': 'Stainless Steel',
      'Features': 'Programmable'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 3 },
    seller: { name: 'OXO', rating: 4.8, fulfillment: 'Amazon' }
  },

  // Home & Bedding
  {
    id: 'tempur-pedic-symphony-pillow-medium',
    title: 'Tempur-Pedic TEMPUR-Symphony Pillow - Medium Support',
    price: 199.00,
    originalPrice: 219.00,
    currency: 'USD',
    rating: 3.5,
    reviewCount: 12456,
    category: 'home-garden',
    subcategory: 'bedding',
    brand: 'Tempur-Pedic',
    inStock: true,
    stockCount: 89,
    description: 'Dual-sided memory foam pillow with two comfort levels in one.',
    features: [
      'Dual-sided design',
      'TEMPUR material',
      'Medium support',
      'Removable cover',
      '5-year warranty'
    ],
    images: [
      'https://m.media-amazon.com/images/I/71yH5j8fX+L._AC_SL1500_.jpg'
    ],
    specifications: {
      'Brand': 'Tempur-Pedic',
      'Support': 'Medium',
      'Material': 'Memory Foam',
      'Cover': 'Removable',
      'Warranty': '5 years'
    },
    delivery: { prime: false, freeShipping: true, estimatedDays: 4 },
    seller: { name: 'Tempur-Pedic', rating: 4.4, fulfillment: 'Merchant' }
  },
  {
    id: 'purple-harmony-pillow',
    title: 'Purple Harmony Pillow - Gel Grid Technology',
    price: 159.00,
    originalPrice: 179.00,
    currency: 'USD',
    rating: 3,
    reviewCount: 8934,
    category: 'home-garden',
    subcategory: 'bedding',
    brand: 'Purple',
    inStock: true,
    stockCount: 67,
    description: 'Revolutionary pillow with gel grid technology for optimal airflow and support.',
    features: [
      'Gel Grid technology',
      'Superior airflow',
      'Latex support layer',
      'Machine washable cover',
      'No flipping needed'
    ],
    images: [
      'https://m.media-amazon.com/images/I/71dH8k9sYmL._AC_SL1500_.jpg'
    ],
    specifications: {
      'Brand': 'Purple',
      'Technology': 'Gel Grid',
      'Support': 'Latex Layer',
      'Cover': 'Machine Washable',
      'Maintenance': 'No Flipping'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 3 },
    seller: { name: 'Purple', rating: 4.5, fulfillment: 'Amazon' }
  },

  // Sports & Fitness
  {
    id: 'bowflex-selecttech-552-dumbbells',
    title: 'Bowflex SelectTech 552 Adjustable Dumbbells (Pair)',
    price: 399.00,
    originalPrice: 549.00,
    currency: 'USD',
    rating: 3.6,
    reviewCount: 23456,
    category: 'sports',
    subcategory: 'fitness',
    brand: 'Bowflex',
    inStock: true,
    stockCount: 45,
    description: 'Space-saving adjustable dumbbells that replace 15 sets of weights.',
    features: [
      'Adjusts 5-52.5 lbs per dumbbell',
      'Replaces 15 sets of weights',
      'Space-saving design',
      'Quick weight changes',
      'Bowflex SelectTech App'
    ],
    images: [
      'https://m.media-amazon.com/images/I/61QGq9XOHuL._AC_SL1000_.jpg'
    ],
    specifications: {
      'Brand': 'Bowflex',
      'Weight Range': '5-52.5 lbs per dumbbell',
      'Adjustments': '15 weight settings',
      'App': 'SelectTech App included',
      'Space Saved': 'Replaces 30 dumbbells'
    },
    delivery: { prime: false, freeShipping: true, estimatedDays: 7 },
    seller: { name: 'Bowflex', rating: 4.4, fulfillment: 'Merchant' }
  },
  {
    id: 'peloton-bike-plus',
    title: 'Peloton Bike+ with HD Touchscreen',
    price: 2495.00,
    originalPrice: 2795.00,
    currency: 'USD',
    rating: 4.7,
    reviewCount: 8934,
    category: 'sports',
    subcategory: 'fitness',
    brand: 'Peloton',
    inStock: true,
    stockCount: 18,
    description: 'Premium indoor cycling bike with rotating HD touchscreen and live classes.',
    features: [
      '23.8" HD rotating touchscreen',
      'Auto-Follow resistance',
      'Apple GymKit integration',
      'Dolby Atmos speakers',
      'Live and on-demand classes'
    ],
    images: [
      'https://m.media-amazon.com/images/I/61iJl+OZzfL._AC_SL1000_.jpg'
    ],
    specifications: {
      'Brand': 'Peloton',
      'Screen': '23.8" HD Rotating',
      'Resistance': 'Auto-Follow',
      'Audio': 'Dolby Atmos',
      'Integration': 'Apple GymKit'
    },
    delivery: { prime: false, freeShipping: true, estimatedDays: 14 },
    seller: { name: 'Peloton', rating: 4.6, fulfillment: 'Merchant' }
  },
  {
    id: 'rogue-ohio-power-bar',
    title: 'Rogue Ohio Power Bar - 45LB',
    price: 325.00,
    originalPrice: 325.00,
    currency: 'USD',
    rating: 3.9,
    reviewCount: 5234,
    category: 'sports',
    subcategory: 'fitness',
    brand: 'Rogue',
    inStock: true,
    stockCount: 23,
    description: 'Professional powerlifting barbell made in Columbus, Ohio with aggressive knurling.',
    features: [
      'Made in Columbus, Ohio',
      'Aggressive knurling',
      '45LB weight',
      '29mm shaft diameter',
      'IPF approved'
    ],
    images: [
      'https://m.media-amazon.com/images/I/71CeKg5RQRL._AC_SL1500_.jpg'
    ],
    specifications: {
      'Brand': 'Rogue',
      'Weight': '45 LB',
      'Shaft Diameter': '29mm',
      'Knurling': 'Aggressive',
      'Certification': 'IPF Approved'
    },
    delivery: { prime: false, freeShipping: false, estimatedDays: 10 },
    seller: { name: 'Rogue Fitness', rating: 4.8, fulfillment: 'Merchant' }
  },

  // Outdoor & Camping
  {
    id: 'yeti-tundra-65-cooler-white',
    title: 'YETI Tundra 65 Cooler - White',
    price: 375.00,
    originalPrice: 375.00,
    currency: 'USD',
    rating: 4.7,
    reviewCount: 12456,
    category: 'sports',
    subcategory: 'outdoor-recreation',
    brand: 'YETI',
    inStock: true,
    stockCount: 67,
    description: 'Premium hard cooler with rotomolded construction and up to 4 days ice retention.',
    features: [
      'Rotomolded construction',
      'Up to 4 days ice retention',
      'Bear-resistant design',
      'T-Rex lid latches',
      'Never-fail hinge system'
    ],
    images: [
      '/images/amazon/products/sports/outdoor-recreation/yeti-tumbler-1.jpg'
    ],
    specifications: {
      'Brand': 'YETI',
      'Capacity': '65 quarts',
      'Ice Retention': 'Up to 4 days',
      'Construction': 'Rotomolded',
      'Color': 'White'
    },
    delivery: { prime: false, freeShipping: true, estimatedDays: 5 },
    seller: { name: 'YETI', rating: 4.6, fulfillment: 'Merchant' }
  },
  {
    id: 'yeti-tundra-35-cooler-tan',
    title: 'YETI Tundra 35 Cooler - Tan',
    price: 275.00,
    originalPrice: 275.00,
    currency: 'USD',
    rating: 3.7,
    reviewCount: 8934,
    category: 'sports',
    subcategory: 'outdoor-recreation',
    brand: 'YETI',
    inStock: true,
    stockCount: 89,
    description: 'Compact YETI cooler perfect for day trips and small groups.',
    features: [
      'Rotomolded construction',
      'Up to 3 days ice retention',
      'Bear-resistant design',
      'Compact size',
      'Desert tan color'
    ],
    images: [
      '/images/amazon/products/sports/outdoor-recreation/yeti-tumbler-2.jpg'
    ],
    specifications: {
      'Brand': 'YETI',
      'Capacity': '35 quarts',
      'Ice Retention': 'Up to 3 days',
      'Construction': 'Rotomolded',
      'Color': 'Tan'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 3 },
    seller: { name: 'Amazon.com', rating: 4.8, fulfillment: 'Amazon' }
  },
  {
    id: 'coleman-sundome-4-person-tent',
    title: 'Coleman Sundome 4-Person Tent',
    price: 69.99,
    originalPrice: 89.99,
    currency: 'USD',
    rating: 4.2,
    reviewCount: 34521,
    category: 'sports',
    subcategory: 'outdoor-recreation',
    brand: 'Coleman',
    inStock: true,
    stockCount: 145,
    description: 'Easy-to-set-up dome tent with WeatherTec system for dry camping.',
    features: [
      'WeatherTec system',
      '4-person capacity',
      'Easy setup in 10 minutes',
      'Large windows and door',
      'Gear loft included'
    ],
    images: [
      'https://m.media-amazon.com/images/I/81j8GqhSYfL._AC_SL1500_.jpg'
    ],
    specifications: {
      'Brand': 'Coleman',
      'Capacity': '4 person',
      'Setup Time': '10 minutes',
      'Weather Protection': 'WeatherTec',
      'Features': 'Gear loft included'
    },
    delivery: { prime: true, freeShipping: true, estimatedDays: 2 },
    seller: { name: 'Coleman', rating: 4.5, fulfillment: 'Amazon' }
  },
  {
    id: 'coleman-sundome-6-person-tent',
    title: 'Coleman Sundome 6-Person Tent',
    price: 89.99,
    originalPrice: 119.99,
    currency: 'USD',
    rating: 3.9,
    reviewCount: 23456,
    category: 'sports',
    subcategory: 'outdoor-recreation',
    brand: 'Coleman',
    inStock: true,
    stockCount: 89,
    description: 'Spacious family tent with room for 6 people and WeatherTec protection.',
    features: [
      'WeatherTec system',
      '6-person capacity',
      'Easy setup in 15 minutes',
      'Room divider included',
      'Multiple storage pockets'
    ],
    images: [
      'https://m.media-amazon.com/images/I/81j8GqhSZfL._AC_SL1500_.jpg'
    ],
    specifications: {
      'Brand': 'Coleman',
      'Capacity': '6 person',
      'Setup Time': '15 minutes',
      'Weather Protection': 'WeatherTec',
      'Features': 'Room divider'
    },
    delivery: { prime: false, freeShipping: true, estimatedDays: 4 },
    seller: { name: 'Outdoor Gear Plus', rating: 4.1, fulfillment: 'Merchant' }
  }
  // 注意：已移除使用 Unsplash 不匹配图片的厨房商品，请使用 DummyJSON 真实商品数据
];

// 被移除的商品（Unsplash 图片不匹配）:
// - cuisinart-stainless-steel-cookware-set
// - lodge-cast-iron-skillet-12inch
// - kitchenaid-stand-mixer-5qt
// - breville-smart-oven-pro
// - all-clad-stainless-steel-fry-pan
// - hamilton-beach-toaster-oven
// - zwilling-knife-set-8pc
// - instant-vortex-plus-air-fryer-6qt
// - vitamix-e310-blender
// - oxo-good-grips-container-set
// - pyrex-glass-storage-set-18pc
// - calphalon-nonstick-pan-set-10pc

// 以下为用户数据
// 注意：使用 DummyJSON 真实商品数据代替上述被删除的商品
// (已从 dummyJsonProducts.js 导入)

// 用户数据（用于结账测试）
export const users = [
  {
    id: 'demo-user-1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    addresses: [
      {
        id: 'addr-1',
        type: 'home',
        name: 'John Smith',
        addressLine1: '123 Main Street',
        addressLine2: 'Apt 4B',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'United States',
        isDefault: true
      },
      {
        id: 'addr-2',
        type: 'work',
        name: 'John Smith',
        addressLine1: '456 Business Ave',
        addressLine2: 'Suite 100',
        city: 'New York',
        state: 'NY',
        zipCode: '10002',
        country: 'United States',
        isDefault: false
      }
    ],
    paymentMethods: [
      {
        id: 'card-1',
        type: 'credit',
        cardNumber: '**** **** **** 1234',
        expiryMonth: '12',
        expiryYear: '2027',
        cardholderName: 'John Smith',
        brand: 'Visa',
        isDefault: true
      },
      {
        id: 'card-2',
        type: 'credit',
        cardNumber: '**** **** **** 5678',
        expiryMonth: '06',
        expiryYear: '2026',
        cardholderName: 'John Smith',
        brand: 'Mastercard',
        isDefault: false
      }
    ]
  }
];

// 销售和促销数据
export const deals = [
  {
    id: 'deal-1',
    title: 'Lightning Deal',
    description: 'Save up to 40% on Electronics',
    discountPercent: 40,
    endTime: new Date(Date.now() + 6 * 60 * 60 * 1000),
    products: ['iphone-15-pro', 'samsung-galaxy-s24', 'macbook-air-m3']
  },
  {
    id: 'deal-2',
    title: 'Best Sellers',
    description: 'Top picks in Books',
    discountPercent: 25,
    endTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
    products: ['atomic-habits', 'fourth-wing']
  }
];

// 推荐算法数据
export const recommendations = {
  'frequently-bought-together': {
    'iphone-15-pro': ['dj-iphone-13-pro', 'dj-iphone-x'],
    'samsung-galaxy-s24': ['dj-samsung-galaxy-s10', 'dj-realme-xt'],
    'macbook-air-m3': ['dj-macbook-pro-14', 'dj-dell-xps-13'],
    'dj-microwave-oven': ['dj-boxed-blender', 'dj-electric-stove'],
    'instant-pot-duo': ['dj-carbon-steel-wok', 'dj-hand-blender']
  },
  'customers-who-viewed': {
    'iphone-15-pro': ['dj-iphone-13-pro', 'samsung-galaxy-s24', 'dj-oppo-a57'],
    'macbook-air-m3': ['dj-macbook-pro-14', 'dj-asus-zenbook-pro', 'dell-xps-13'],
    'dj-microwave-oven': ['dj-boxed-blender', 'dj-electric-stove', 'dj-hand-blender']
  }
};

// 品牌数据
export const brands = [
  { id: 'apple', name: 'Apple', logo: 'https://logos-world.net/wp-content/uploads/2020/04/Apple-Logo.png' },
  { id: 'samsung', name: 'Samsung', logo: 'https://logos-world.net/wp-content/uploads/2020/04/Samsung-Logo.png' },
  { id: 'sony', name: 'Sony', logo: 'https://logos-world.net/wp-content/uploads/2020/04/Sony-Logo.png' },
  { id: 'dell', name: 'Dell', logo: 'https://logos-world.net/wp-content/uploads/2020/08/Dell-Logo.png' },
  { id: 'amazon-basics', name: 'Amazon Basics', logo: 'https://via.placeholder.com/150x75/232f3e/ffffff?text=Amazon+Basics' }
];

// 合并所有商品数据（原有数据 + DummyJSON 真实数据）
export const allProducts = [...products, ...allDummyJsonProducts];

// 搜索建议（用于头部搜索下拉）
export const searchSuggestions = Array.from(
  new Set([
    ...categories.map((category) => category.name),
    ...categories.flatMap((category) => category.subcategories.map((subcategory) => subcategory.name)),
    ...allProducts.slice(0, 250).map((product) => product.title),
    'today deals',
    'prime day deals',
    'wireless earbuds',
    'gaming laptop',
    'kitchen essentials',
    'gift cards',
    'customer service',
    'best sellers',
    'registry'
  ])
);

// 工具函数
export const getProductsByCategory = (categoryId, subcategoryId = null) => {
  return allProducts.filter(product => {
    if (subcategoryId) {
      return product.category === categoryId && product.subcategory === subcategoryId;
    }
    return product.category === categoryId;
  });
};

export const getProductById = (productId) => {
  const product = allProducts.find(product => product.id === productId);
  
  if (!product) return null;
  
  return {
    ...product,
    features: product.features || [
      'High-quality construction and materials',
      'Latest technology and innovation',
      'Excellent customer reviews and ratings',
      'Fast and reliable shipping',
      'Comprehensive warranty coverage'
    ],
    specifications: product.specifications || {
      'Brand': product.brand || 'Unknown',
      'Model': product.id,
      'Weight': '1.5 lbs',
      'Dimensions': '10 x 8 x 2 inches',
      'Color': 'Multiple options available',
      'Material': 'Premium quality materials'
    },
    images: product.images || [
      `/images/amazon/products/${product.category}/${product.id}-1.jpg`,
      `/images/amazon/products/${product.category}/${product.id}-2.jpg`,
      `/images/amazon/products/${product.category}/${product.id}-3.jpg`
    ],
    sizes: product.sizes || undefined,
    colors: product.colors || undefined,
    delivery: product.delivery || {
      prime: false,
      freeShipping: true,
      estimatedDays: 5
    },
    seller: product.seller || {
      name: 'Amazon.com',
      rating: 4.8,
      shipsFrom: 'Amazon.com'
    }
  };
};

export const searchProducts = (query) => {
  const lowerQuery = query.toLowerCase();
  return allProducts.filter(product => 
    product.title.toLowerCase().includes(lowerQuery) ||
    product.description.toLowerCase().includes(lowerQuery) ||
    product.brand.toLowerCase().includes(lowerQuery)
  );
};

export const getRecommendedProducts = (productId, type = 'customers-who-viewed') => {
  const recommendedIds = recommendations[type]?.[productId] || [];
  return recommendedIds.map(id => getProductById(id)).filter(Boolean);
};

export const getFeaturedDeals = () => {
  return deals.filter(deal => deal.endTime > new Date());
};

export const getBrandById = (brandId) => {
  return brands.find(brand => brand.id === brandId);
};

// ===== 数据文件结束 =====
// 已清理：移除了使用 Unsplash 不匹配图片的商品
// 使用 DummyJSON 真实商品数据替代
