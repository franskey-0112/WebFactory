// CarRental Clone - Static Car Rental Data
// This file contains comprehensive car rental data for a fully functional Hertz clone

// Vehicle Categories
export const vehicleCategories = [
  {
    id: 'economy',
    name: 'Economy',
    icon: '🚗',
    description: 'Great fuel economy, ideal for city driving',
    features: ['Manual transmission', 'A/C', '4 doors', '4 seats'],
    popularVehicles: ['Nissan Versa', 'Mitsubishi Mirage', 'Chevrolet Spark']
  },
  {
    id: 'compact',
    name: 'Compact',
    icon: '🚙',
    description: 'Perfect balance of comfort and efficiency',
    features: ['Automatic transmission', 'A/C', '4 doors', '5 seats'],
    popularVehicles: ['Nissan Sentra', 'Toyota Corolla', 'Hyundai Elantra']
  },
  {
    id: 'midsize',
    name: 'Midsize',
    icon: '🚘',
    description: 'Spacious and comfortable for longer trips',
    features: ['Automatic transmission', 'A/C', '4 doors', '5 seats', 'Cruise control'],
    popularVehicles: ['Nissan Altima', 'Toyota Camry', 'Chevrolet Malibu']
  },
  {
    id: 'fullsize',
    name: 'Full-size',
    icon: '🚗',
    description: 'Premium comfort and performance',
    features: ['Automatic transmission', 'A/C', '4 doors', '5 seats', 'Premium audio'],
    popularVehicles: ['Chrysler 300', 'Chevrolet Impala', 'Toyota Avalon']
  },
  {
    id: 'premium',
    name: 'Premium',
    icon: '🏎️',
    description: 'Luxury vehicles with advanced features',
    features: ['Automatic transmission', 'Leather seats', 'GPS navigation', 'Premium sound'],
    popularVehicles: ['BMW 3 Series', 'Mercedes C-Class', 'Audi A4']
  },
  {
    id: 'luxury',
    name: 'Luxury',
    icon: '🚗',
    description: 'Ultimate in comfort and style',
    features: ['Automatic transmission', 'Leather seats', 'GPS', 'Premium everything'],
    popularVehicles: ['BMW 5 Series', 'Mercedes E-Class', 'Cadillac XTS']
  },
  {
    id: 'suv',
    name: 'SUV',
    icon: '🚐',
    description: 'Perfect for families and outdoor adventures',
    features: ['Automatic transmission', 'A/C', '4WD available', '7-8 seats'],
    popularVehicles: ['Chevrolet Tahoe', 'Ford Expedition', 'Nissan Armada']
  },
  {
    id: 'convertible',
    name: 'Convertible',
    icon: '🏎️',
    description: 'Open-air driving experience',
    features: ['Automatic transmission', 'Convertible top', 'Premium audio', '2-4 seats'],
    popularVehicles: ['Ford Mustang Convertible', 'Chevrolet Camaro Convertible']
  }
];

// Rental Locations
export const rentalLocations = [
  {
    id: 'location-001',
    name: 'Los Angeles International Airport (LAX)',
    type: 'airport',
    address: '1 World Way, Los Angeles, CA 90045',
    phone: '+1 (800) 654-3131',
    hours: {
      weekdays: '24/7',
      weekends: '24/7'
    },
    coordinates: { lat: 33.9425, lng: -118.4081 },
    amenities: ['24/7 service', 'Free shuttle', 'Premium collection'],
    vehicles: ['economy', 'compact', 'midsize', 'fullsize', 'premium', 'luxury', 'suv']
  },
  {
    id: 'location-002',
    name: 'Downtown Los Angeles',
    type: 'city',
    address: '100 S Hope St, Los Angeles, CA 90012',
    phone: '+1 (323) 555-0123',
    hours: {
      weekdays: '7:00 AM - 8:00 PM',
      weekends: '8:00 AM - 6:00 PM'
    },
    coordinates: { lat: 34.0522, lng: -118.2437 },
    amenities: ['Valet service', 'Car wash', 'GPS rental'],
    vehicles: ['economy', 'compact', 'midsize', 'premium', 'luxury']
  },
  {
    id: 'location-003',
    name: 'New York John F. Kennedy Airport (JFK)',
    type: 'airport',
    address: 'JFK Airport, Queens, NY 11430',
    phone: '+1 (800) 654-3131',
    hours: {
      weekdays: '24/7',
      weekends: '24/7'
    },
    coordinates: { lat: 40.6413, lng: -73.7781 },
    amenities: ['24/7 service', 'Express pickup', 'Premium vehicles'],
    vehicles: ['economy', 'compact', 'midsize', 'fullsize', 'premium', 'luxury', 'suv']
  },
  {
    id: 'location-004',
    name: 'Manhattan Midtown',
    type: 'city',
    address: '1 Penn Plaza, New York, NY 10119',
    phone: '+1 (212) 555-0456',
    hours: {
      weekdays: '6:00 AM - 10:00 PM',
      weekends: '7:00 AM - 9:00 PM'
    },
    coordinates: { lat: 40.7505, lng: -73.9934 },
    amenities: ['Concierge service', 'Luxury fleet', 'Corporate rates'],
    vehicles: ['compact', 'midsize', 'premium', 'luxury', 'convertible']
  },
  {
    id: 'location-005',
    name: 'Miami International Airport (MIA)',
    type: 'airport',
    address: '2100 NW 42nd Ave, Miami, FL 33126',
    phone: '+1 (800) 654-3131',
    hours: {
      weekdays: '24/7',
      weekends: '24/7'
    },
    coordinates: { lat: 25.7932, lng: -80.2906 },
    amenities: ['24/7 service', 'Convertible fleet', 'Beach packages'],
    vehicles: ['economy', 'compact', 'midsize', 'fullsize', 'luxury', 'convertible', 'suv']
  },
  {
    id: 'location-006',
    name: 'Chicago O\'Hare Airport (ORD)',
    type: 'airport',
    address: '10000 W Balmoral Ave, Chicago, IL 60666',
    phone: '+1 (800) 654-3131',
    hours: {
      weekdays: '24/7',
      weekends: '24/7'
    },
    coordinates: { lat: 41.9742, lng: -87.9073 },
    amenities: ['24/7 service', 'Winter packages', 'Business fleet'],
    vehicles: ['economy', 'compact', 'midsize', 'fullsize', 'premium', 'luxury', 'suv']
  }
];

// Vehicle Fleet
export const vehicles = [
  // Economy Cars
  {
    id: 'vehicle-001',
    name: 'Nissan Versa',
    category: 'economy',
    brand: 'Nissan',
    year: 2024,
    transmission: 'Manual',
    fuelType: 'Gasoline',
    seats: 4,
    doors: 4,
    luggage: 2,
    airConditioning: true,
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1493238792000-8113da705763?w=800&h=600&fit=crop'
    ],
    features: ['Manual transmission', 'Air conditioning', 'Radio', 'Power steering'],
    specifications: {
      engine: '1.6L 4-cylinder',
      horsepower: '122 HP',
      fuelEconomy: '32 city / 40 highway MPG',
      tankCapacity: '10.8 gallons'
    },
    pricing: {
      dailyRate: 29.99,
      weeklyRate: 189.99,
      monthlyRate: 649.99,
      insurance: 15.99,
      gps: 12.99,
      childSeat: 8.99
    },
    availability: {
      'location-001': 15,
      'location-002': 8,
      'location-003': 12,
      'location-004': 5,
      'location-005': 10,
      'location-006': 9
    },
    reviews: {
      rating: 4.2,
      count: 1847,
      highlights: ['Great fuel economy', 'Easy to park', 'Affordable']
    }
  },
  {
    id: 'vehicle-002',
    name: 'Mitsubishi Mirage',
    category: 'economy',
    brand: 'Mitsubishi',
    year: 2024,
    transmission: 'Manual',
    fuelType: 'Gasoline',
    seats: 4,
    doors: 4,
    luggage: 2,
    airConditioning: true,
    images: [
      'https://images.unsplash.com/photo-1549399596-3b3ac37c35c6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop'
    ],
    features: ['Manual transmission', 'Air conditioning', 'Bluetooth', 'USB ports'],
    specifications: {
      engine: '1.2L 3-cylinder',
      horsepower: '78 HP',
      fuelEconomy: '36 city / 43 highway MPG',
      tankCapacity: '9.2 gallons'
    },
    pricing: {
      dailyRate: 27.99,
      weeklyRate: 179.99,
      monthlyRate: 599.99,
      insurance: 15.99,
      gps: 12.99,
      childSeat: 8.99
    },
    availability: {
      'location-001': 12,
      'location-002': 6,
      'location-003': 10,
      'location-004': 4,
      'location-005': 8,
      'location-006': 7
    },
    reviews: {
      rating: 4.0,
      count: 1234,
      highlights: ['Excellent MPG', 'Budget-friendly', 'Compact size']
    }
  },

  // Compact Cars
  {
    id: 'vehicle-003',
    name: 'Toyota Corolla',
    category: 'compact',
    brand: 'Toyota',
    year: 2024,
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    seats: 5,
    doors: 4,
    luggage: 3,
    airConditioning: true,
    images: [
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=600&fit=crop'
    ],
    features: ['Automatic transmission', 'Air conditioning', 'Cruise control', 'Bluetooth', 'Backup camera'],
    specifications: {
      engine: '2.0L 4-cylinder',
      horsepower: '169 HP',
      fuelEconomy: '32 city / 41 highway MPG',
      tankCapacity: '13.2 gallons'
    },
    pricing: {
      dailyRate: 39.99,
      weeklyRate: 249.99,
      monthlyRate: 849.99,
      insurance: 18.99,
      gps: 12.99,
      childSeat: 8.99
    },
    availability: {
      'location-001': 20,
      'location-002': 12,
      'location-003': 18,
      'location-004': 8,
      'location-005': 15,
      'location-006': 14
    },
    reviews: {
      rating: 4.5,
      count: 2891,
      highlights: ['Reliable', 'Comfortable', 'Good value']
    }
  },
  {
    id: 'vehicle-004',
    name: 'Nissan Sentra',
    category: 'compact',
    brand: 'Nissan',
    year: 2024,
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    seats: 5,
    doors: 4,
    luggage: 3,
    airConditioning: true,
    images: [
      'https://images.unsplash.com/photo-1554744512-d6b055eeb97b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&h=600&fit=crop'
    ],
    features: ['CVT transmission', 'Air conditioning', 'Apple CarPlay', 'Android Auto', 'Remote start'],
    specifications: {
      engine: '2.0L 4-cylinder',
      horsepower: '149 HP',
      fuelEconomy: '29 city / 39 highway MPG',
      tankCapacity: '12.3 gallons'
    },
    pricing: {
      dailyRate: 37.99,
      weeklyRate: 239.99,
      monthlyRate: 799.99,
      insurance: 18.99,
      gps: 12.99,
      childSeat: 8.99
    },
    availability: {
      'location-001': 16,
      'location-002': 10,
      'location-003': 14,
      'location-004': 6,
      'location-005': 12,
      'location-006': 11
    },
    reviews: {
      rating: 4.3,
      count: 2156,
      highlights: ['Modern tech', 'Smooth ride', 'Spacious interior']
    }
  },

  // Midsize Cars
  {
    id: 'vehicle-005',
    name: 'Toyota Camry',
    category: 'midsize',
    brand: 'Toyota',
    year: 2024,
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    seats: 5,
    doors: 4,
    luggage: 4,
    airConditioning: true,
    images: [
      'https://images.unsplash.com/photo-1606016872023-cb845fe5fcfe?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1563720223185-11003d2b153f?w=800&h=600&fit=crop'
    ],
    features: ['8-speed automatic', 'Dual-zone climate', 'Lane keeping assist', 'Adaptive cruise', 'Premium audio'],
    specifications: {
      engine: '2.5L 4-cylinder',
      horsepower: '203 HP',
      fuelEconomy: '28 city / 39 highway MPG',
      tankCapacity: '14.3 gallons'
    },
    pricing: {
      dailyRate: 49.99,
      weeklyRate: 319.99,
      monthlyRate: 1099.99,
      insurance: 22.99,
      gps: 12.99,
      childSeat: 8.99
    },
    availability: {
      'location-001': 18,
      'location-002': 11,
      'location-003': 16,
      'location-004': 7,
      'location-005': 13,
      'location-006': 12
    },
    reviews: {
      rating: 4.6,
      count: 3472,
      highlights: ['Comfortable ride', 'Advanced safety', 'Fuel efficient']
    }
  },
  {
    id: 'vehicle-006',
    name: 'Nissan Altima',
    category: 'midsize',
    brand: 'Nissan',
    year: 2024,
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    seats: 5,
    doors: 4,
    luggage: 4,
    airConditioning: true,
    images: [
      'https://images.unsplash.com/photo-1562003123-3b0ac82ee5f7?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&h=600&fit=crop'
    ],
    features: ['CVT transmission', 'ProPILOT assist', 'Remote engine start', 'Heated seats', 'Bose audio'],
    specifications: {
      engine: '2.5L 4-cylinder',
      horsepower: '188 HP',
      fuelEconomy: '28 city / 39 highway MPG',
      tankCapacity: '16.2 gallons'
    },
    pricing: {
      dailyRate: 47.99,
      weeklyRate: 299.99,
      monthlyRate: 1049.99,
      insurance: 22.99,
      gps: 12.99,
      childSeat: 8.99
    },
    availability: {
      'location-001': 15,
      'location-002': 9,
      'location-003': 13,
      'location-004': 6,
      'location-005': 11,
      'location-006': 10
    },
    reviews: {
      rating: 4.4,
      count: 2987,
      highlights: ['Intelligent cruise', 'Roomy cabin', 'Good tech']
    }
  },

  // Premium Cars
  {
    id: 'vehicle-007',
    name: 'BMW 3 Series',
    category: 'premium',
    brand: 'BMW',
    year: 2024,
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    seats: 5,
    doors: 4,
    luggage: 3,
    airConditioning: true,
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1551722188-8e89a6cfd296?w=800&h=600&fit=crop'
    ],
    features: ['8-speed automatic', 'Leather seats', 'Premium audio', 'Navigation', 'Driver assistance'],
    specifications: {
      engine: '2.0L Turbo 4-cylinder',
      horsepower: '255 HP',
      fuelEconomy: '26 city / 36 highway MPG',
      tankCapacity: '15.6 gallons'
    },
    pricing: {
      dailyRate: 89.99,
      weeklyRate: 579.99,
      monthlyRate: 1999.99,
      insurance: 35.99,
      gps: 12.99,
      childSeat: 8.99
    },
    availability: {
      'location-001': 8,
      'location-002': 5,
      'location-003': 10,
      'location-004': 6,
      'location-005': 7,
      'location-006': 6
    },
    reviews: {
      rating: 4.7,
      count: 1892,
      highlights: ['Luxury feel', 'Great performance', 'Advanced tech']
    }
  },

  // SUVs
  {
    id: 'vehicle-008',
    name: 'Chevrolet Tahoe',
    category: 'suv',
    brand: 'Chevrolet',
    year: 2024,
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    seats: 8,
    doors: 4,
    luggage: 6,
    airConditioning: true,
    images: [
      'https://images.unsplash.com/photo-1549399596-3b3ac37c35c6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&h=600&fit=crop'
    ],
    features: ['10-speed automatic', '4WD', 'Towing package', 'Premium audio', 'Captain\'s chairs'],
    specifications: {
      engine: '5.3L V8',
      horsepower: '355 HP',
      fuelEconomy: '16 city / 20 highway MPG',
      tankCapacity: '24 gallons'
    },
    pricing: {
      dailyRate: 129.99,
      weeklyRate: 849.99,
      monthlyRate: 2899.99,
      insurance: 45.99,
      gps: 12.99,
      childSeat: 8.99
    },
    availability: {
      'location-001': 12,
      'location-002': 4,
      'location-003': 8,
      'location-004': 3,
      'location-005': 10,
      'location-006': 7
    },
    reviews: {
      rating: 4.5,
      count: 1456,
      highlights: ['Spacious', 'Powerful', 'Family-friendly']
    }
  },

  // Convertibles
  {
    id: 'vehicle-009',
    name: 'Ford Mustang Convertible',
    category: 'convertible',
    brand: 'Ford',
    year: 2024,
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    seats: 4,
    doors: 2,
    luggage: 2,
    airConditioning: true,
    images: [
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop'
    ],
    features: ['10-speed automatic', 'Convertible soft top', 'Premium sound', 'Sport mode', 'Performance package'],
    specifications: {
      engine: '2.3L Turbo 4-cylinder',
      horsepower: '310 HP',
      fuelEconomy: '21 city / 32 highway MPG',
      tankCapacity: '15.5 gallons'
    },
    pricing: {
      dailyRate: 149.99,
      weeklyRate: 979.99,
      monthlyRate: 3399.99,
      insurance: 55.99,
      gps: 12.99,
      childSeat: 8.99
    },
    availability: {
      'location-001': 6,
      'location-002': 2,
      'location-003': 4,
      'location-004': 3,
      'location-005': 8,
      'location-006': 3
    },
    reviews: {
      rating: 4.8,
      count: 987,
      highlights: ['Thrilling drive', 'Open-air fun', 'Iconic design']
    }
  }
];

// Add more vehicles for variety
const additionalVehicles = [
  // More Economy
  {
    id: 'vehicle-010',
    name: 'Chevrolet Spark',
    category: 'economy',
    brand: 'Chevrolet',
    year: 2024,
    transmission: 'Manual',
    fuelType: 'Gasoline',
    seats: 4,
    doors: 4,
    luggage: 2,
    airConditioning: true,
    images: [
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&h=600&fit=crop'
    ],
    features: ['Manual transmission', 'Air conditioning', 'Bluetooth', 'USB connectivity'],
    specifications: {
      engine: '1.4L 4-cylinder',
      horsepower: '98 HP',
      fuelEconomy: '30 city / 38 highway MPG',
      tankCapacity: '9.2 gallons'
    },
    pricing: {
      dailyRate: 25.99,
      weeklyRate: 169.99,
      monthlyRate: 579.99,
      insurance: 15.99,
      gps: 12.99,
      childSeat: 8.99
    },
    availability: {
      'location-001': 10,
      'location-002': 6,
      'location-003': 8,
      'location-004': 3,
      'location-005': 7,
      'location-006': 5
    },
    reviews: {
      rating: 3.9,
      count: 892,
      highlights: ['Very affordable', 'Easy to drive', 'Compact parking']
    }
  },
  
  // More Luxury
  {
    id: 'vehicle-011',
    name: 'Mercedes-Benz E-Class',
    category: 'luxury',
    brand: 'Mercedes-Benz',
    year: 2024,
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    seats: 5,
    doors: 4,
    luggage: 4,
    airConditioning: true,
    images: [
      'https://images.unsplash.com/photo-1563720223185-11003d2b153f?w=800&h=600&fit=crop'
    ],
    features: ['9G-TRONIC automatic', 'Luxury leather', 'Burmester sound', 'MBUX system', 'Driver assistance plus'],
    specifications: {
      engine: '2.0L Turbo 4-cylinder',
      horsepower: '255 HP',
      fuelEconomy: '23 city / 32 highway MPG',
      tankCapacity: '17.4 gallons'
    },
    pricing: {
      dailyRate: 199.99,
      weeklyRate: 1299.99,
      monthlyRate: 4499.99,
      insurance: 65.99,
      gps: 12.99,
      childSeat: 8.99
    },
    availability: {
      'location-001': 4,
      'location-002': 3,
      'location-003': 5,
      'location-004': 4,
      'location-005': 3,
      'location-006': 2
    },
    reviews: {
      rating: 4.9,
      count: 674,
      highlights: ['Ultimate luxury', 'Cutting-edge tech', 'Smooth performance']
    }
  }
];

// Extend vehicles array
vehicles.push(...additionalVehicles);

// Rental Packages and Add-ons
export const rentalPackages = [
  {
    id: 'weekend-special',
    name: 'Weekend Special',
    description: 'Perfect for weekend getaways',
    discount: 0.15,
    validDays: ['Friday', 'Saturday', 'Sunday'],
    minDays: 2,
    categories: ['economy', 'compact', 'midsize']
  },
  {
    id: 'business-traveler',
    name: 'Business Traveler',
    description: 'Premium vehicles for business trips',
    discount: 0.10,
    validDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    minDays: 1,
    categories: ['premium', 'luxury']
  },
  {
    id: 'family-vacation',
    name: 'Family Vacation',
    description: 'SUVs and large vehicles for families',
    discount: 0.20,
    validDays: ['all'],
    minDays: 7,
    categories: ['suv']
  }
];

export const addOns = [
  {
    id: 'gps',
    name: 'GPS Navigation',
    description: 'Never get lost with turn-by-turn directions',
    dailyRate: 12.99,
    icon: '🗺️'
  },
  {
    id: 'child-seat',
    name: 'Child Safety Seat',
    description: 'Keep your little ones safe and secure',
    dailyRate: 8.99,
    icon: '👶'
  },
  {
    id: 'ski-rack',
    name: 'Ski Rack',
    description: 'Transport your skiing equipment safely',
    dailyRate: 15.99,
    icon: '🎿'
  },
  {
    id: 'additional-driver',
    name: 'Additional Driver',
    description: 'Add an extra authorized driver',
    dailyRate: 10.99,
    icon: '👨‍👩‍👧‍👦'
  },
  {
    id: 'roadside-assistance',
    name: 'Premium Roadside Assistance',
    description: '24/7 roadside help anywhere you go',
    dailyRate: 7.99,
    icon: '🔧'
  }
];

// Insurance Options
export const insuranceOptions = [
  {
    id: 'basic',
    name: 'Basic Protection',
    description: 'Minimum required coverage',
    dailyRate: 15.99,
    coverage: ['Liability', 'Collision deductible: $1000']
  },
  {
    id: 'standard',
    name: 'Standard Protection',
    description: 'Good coverage for most trips',
    dailyRate: 25.99,
    coverage: ['Liability', 'Collision deductible: $500', 'Theft protection']
  },
  {
    id: 'premium',
    name: 'Premium Protection',
    description: 'Maximum peace of mind',
    dailyRate: 35.99,
    coverage: ['Full liability', 'Zero deductible', 'Theft protection', 'Personal effects', 'Roadside assistance']
  }
];

// Customer Data
export const customers = [
  {
    id: 'customer-001',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@email.com',
    phone: '+1-555-0123',
    dateOfBirth: '1985-03-15',
    licenseNumber: 'DL123456789',
    licenseExpiry: '2026-03-15',
    address: {
      street: '123 Main St',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      country: 'USA'
    },
    membershipLevel: 'Gold',
    joinDate: '2020-01-15',
    totalRentals: 24,
    preferredVehicles: ['premium', 'luxury'],
    emergencyContact: {
      name: 'Jane Smith',
      phone: '+1-555-0124',
      relationship: 'Spouse'
    }
  }
];

// Booking History
export const bookings = [
  {
    id: 'booking-001',
    customerId: 'customer-001',
    vehicleId: 'vehicle-007',
    locationId: 'location-001',
    pickupDate: '2024-01-15T10:00:00Z',
    returnDate: '2024-01-18T10:00:00Z',
    status: 'completed',
    totalCost: 389.96,
    addOns: ['gps', 'child-seat'],
    insurance: 'standard',
    paymentStatus: 'paid',
    feedback: {
      rating: 5,
      comment: 'Excellent service and clean vehicle!'
    }
  }
];

// Utility Functions
export const getVehicleById = (vehicleId) => {
  return vehicles.find(vehicle => vehicle.id === vehicleId);
};

export const getVehiclesByCategory = (category) => {
  return vehicles.filter(vehicle => vehicle.category === category);
};

export const getLocationById = (locationId) => {
  return rentalLocations.find(location => location.id === locationId);
};

export const searchVehicles = (filters) => {
  let filteredVehicles = [...vehicles];

  if (filters.category) {
    filteredVehicles = filteredVehicles.filter(v => v.category === filters.category);
  }

  if (filters.location) {
    filteredVehicles = filteredVehicles.filter(v => 
      v.availability[filters.location] && v.availability[filters.location] > 0
    );
  }

  if (filters.priceRange) {
    const { min, max } = filters.priceRange;
    filteredVehicles = filteredVehicles.filter(v => 
      v.pricing.dailyRate >= min && v.pricing.dailyRate <= max
    );
  }

  if (filters.seats) {
    filteredVehicles = filteredVehicles.filter(v => v.seats >= filters.seats);
  }

  if (filters.transmission) {
    filteredVehicles = filteredVehicles.filter(v => 
      v.transmission.toLowerCase() === filters.transmission.toLowerCase()
    );
  }

  return filteredVehicles;
};

export const calculateRentalCost = (vehicleId, days, addOns = [], insurance = 'basic') => {
  const vehicle = getVehicleById(vehicleId);
  if (!vehicle) return null;

  let baseCost = vehicle.pricing.dailyRate * days;
  
  // Apply weekly/monthly discounts
  if (days >= 30) {
    baseCost = vehicle.pricing.monthlyRate;
  } else if (days >= 7) {
    baseCost = vehicle.pricing.weeklyRate * Math.ceil(days / 7);
  }

  let addOnsCost = 0;
  addOns.forEach(addOnId => {
    const addOn = addOns.find(a => a.id === addOnId);
    if (addOn) {
      addOnsCost += addOn.dailyRate * days;
    }
  });

  let insuranceCost = 0;
  const insuranceOption = insuranceOptions.find(i => i.id === insurance);
  if (insuranceOption) {
    insuranceCost = insuranceOption.dailyRate * days;
  }

  const subtotal = baseCost + addOnsCost + insuranceCost;
  const taxes = subtotal * 0.0875; // 8.75% tax
  const total = subtotal + taxes;

  return {
    baseCost,
    addOnsCost,
    insuranceCost,
    subtotal,
    taxes,
    total,
    days
  };
};

export const getAvailableVehicles = (locationId, pickupDate, returnDate) => {
  // In a real app, this would check actual availability
  return vehicles.filter(vehicle => 
    vehicle.availability[locationId] && vehicle.availability[locationId] > 0
  );
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date));
};

const staticCarRentalData = {
  vehicleCategories,
  rentalLocations,
  vehicles,
  rentalPackages,
  addOns,
  insuranceOptions,
  customers,
  bookings,
  getVehicleById,
  getVehiclesByCategory,
  getLocationById,
  searchVehicles,
  calculateRentalCost,
  getAvailableVehicles,
  formatCurrency,
  formatDate
};

export default staticCarRentalData;
