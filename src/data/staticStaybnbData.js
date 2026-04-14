// Static StayBnB data for accommodation rental website (Airbnb clone)

// Property types
export const propertyTypes = [
  { id: 'entire-place', name: 'Entire place', icon: '🏠' },
  { id: 'private-room', name: 'Private room', icon: '🛏️' },
  { id: 'shared-room', name: 'Shared room', icon: '👥' },
  { id: 'hotel', name: 'Hotel', icon: '🏨' }
];

// Categories
export const categories = [
  { id: 'beachfront', name: 'Beachfront', icon: '🏖️' },
  { id: 'cabins', name: 'Cabins', icon: '🛖' },
  { id: 'trending', name: 'Trending', icon: '🔥' },
  { id: 'city', name: 'City', icon: '🏙️' },
  { id: 'countryside', name: 'Countryside', icon: '🌾' },
  { id: 'amazing-views', name: 'Amazing views', icon: '🏔️' },
  { id: 'luxury', name: 'Luxury', icon: '💎' },
  { id: 'unique-stays', name: 'Unique stays', icon: '🦄' },
  { id: 'tiny-homes', name: 'Tiny homes', icon: '🏡' },
  { id: 'treehouses', name: 'Treehouses', icon: '🌳' },
  { id: 'lakefront', name: 'Lakefront', icon: '🏞️' },
  { id: 'ski-in-out', name: 'Ski-in/out', icon: '⛷️' }
];

// Sample hosts
export const hosts = [
  {
    id: 'host-001',
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b282?w=150&h=150&fit=crop&crop=face',
    joinedDate: '2018-05-15',
    isSuperhost: true,
    responseRate: 98,
    responseTime: 'within an hour',
    languages: ['English', 'Spanish'],
    about: 'I love hosting travelers and sharing the best local experiences. I\'ve been welcoming guests to my city for over 5 years!',
    verified: true
  },
  {
    id: 'host-002',
    name: 'Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    joinedDate: '2019-03-22',
    isSuperhost: true,
    responseRate: 95,
    responseTime: 'within a few hours',
    languages: ['English', 'Mandarin', 'Cantonese'],
    about: 'Tech professional by day, travel enthusiast always. I enjoy meeting people from different cultures.',
    verified: true
  },
  {
    id: 'host-003',
    name: 'Emma Wilson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    joinedDate: '2020-01-10',
    isSuperhost: false,
    responseRate: 89,
    responseTime: 'within a day',
    languages: ['English', 'French'],
    about: 'Artist and designer who loves creating beautiful spaces for guests to enjoy.',
    verified: true
  },
  {
    id: 'host-004',
    name: 'David Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    joinedDate: '2017-09-08',
    isSuperhost: true,
    responseRate: 99,
    responseTime: 'within an hour',
    languages: ['English', 'Spanish', 'Portuguese'],
    about: 'Local guide and outdoor enthusiast. I know all the hidden gems in the area!',
    verified: true
  },
  {
    id: 'host-005',
    name: 'Lisa Thompson',
    avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face',
    joinedDate: '2019-11-30',
    isSuperhost: false,
    responseRate: 92,
    responseTime: 'within a few hours',
    languages: ['English'],
    about: 'Interior designer who loves creating cozy, Instagram-worthy spaces.',
    verified: true
  }
];

// Main properties data
export const properties = [
  {
    id: 'prop-001',
    title: 'Stunning Beachfront Villa with Private Pool',
    description: 'Wake up to breathtaking ocean views in this luxurious beachfront villa. Features include a private infinity pool, direct beach access, and spacious outdoor terraces perfect for watching spectacular sunsets. The villa has been professionally designed with modern amenities while maintaining authentic coastal charm.',
    shortDescription: 'Luxurious beachfront villa with private pool and direct beach access',
    type: 'entire-place',
    category: 'beachfront',
    hostId: 'host-001',
    location: {
      address: 'Malibu, California, United States',
      city: 'Malibu',
      state: 'California',
      country: 'United States',
      latitude: 34.0259,
      longitude: -118.7798,
      neighborhood: 'Carbon Beach'
    },
    images: [
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1570214476695-19bd4f25e93a?w=800&h=600&fit=crop'
    ],
    amenities: [
      'WiFi',
      'Kitchen',
      'Washer',
      'Dryer',
      'Air conditioning',
      'Heating',
      'Pool',
      'Hot tub',
      'Patio or balcony',
      'BBQ grill',
      'Fire pit',
      'Beach access',
      'Ocean view',
      'Parking'
    ],
    safetyFeatures: [
      'Smoke alarm',
      'Carbon monoxide alarm',
      'First aid kit',
      'Fire extinguisher',
      'Pool/hot tub without gate or lock'
    ],
    houseRules: [
      'Check-in: 4:00 PM - 10:00 PM',
      'Checkout: 11:00 AM',
      'No smoking',
      'No pets',
      'No parties or events',
      'Maximum 8 guests'
    ],
    maxGuests: 8,
    bedrooms: 4,
    beds: 4,
    bathrooms: 3.5,
    pricePerNight: 450,
    currency: 'USD',
    rating: 4.9,
    reviewCount: 127,
    availability: {
      minNights: 3,
      maxNights: 30,
      instantBook: true,
      cancellationPolicy: 'Moderate'
    },
    createdAt: '2023-01-15',
    isFavorite: false,
    isNewListing: false,
    cleaningFee: 75,
    serviceFee: 63,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'prop-002',
    title: 'Cozy Downtown Loft in Historic Building',
    description: 'Experience the heart of the city in this beautifully renovated loft apartment. Located in a historic brick building, this space combines industrial charm with modern comfort. Walking distance to the best restaurants, cafes, and cultural attractions the city has to offer.',
    shortDescription: 'Industrial loft in historic downtown building',
    type: 'entire-place',
    category: 'city',
    hostId: 'host-002',
    location: {
      address: 'SoHo, New York, NY, United States',
      city: 'New York',
      state: 'New York',
      country: 'United States',
      latitude: 40.7231,
      longitude: -74.0025,
      neighborhood: 'SoHo'
    },
    images: [
      'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1574691250077-03a929faece5?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop'
    ],
    amenities: [
      'WiFi',
      'Kitchen',
      'Washer',
      'Dryer',
      'Air conditioning',
      'Heating',
      'Elevator',
      'Gym',
      'Workspace',
      'TV',
      'Coffee maker',
      'Dishwasher',
      'Microwave',
      'Refrigerator'
    ],
    safetyFeatures: [
      'Smoke alarm',
      'Carbon monoxide alarm',
      'First aid kit',
      'Security system',
      'Doorman'
    ],
    houseRules: [
      'Check-in: 3:00 PM - 11:00 PM',
      'Checkout: 11:00 AM',
      'No smoking',
      'Pets allowed',
      'No parties or events',
      'Maximum 4 guests'
    ],
    maxGuests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 2,
    pricePerNight: 180,
    currency: 'USD',
    rating: 4.7,
    reviewCount: 89,
    availability: {
      minNights: 2,
      maxNights: 14,
      instantBook: true,
      cancellationPolicy: 'Flexible'
    },
    createdAt: '2023-03-22',
    isFavorite: false,
    isNewListing: false,
    cleaningFee: 40,
    serviceFee: 25,
    lastUpdated: '2024-01-10'
  },
  {
    id: 'prop-003',
    title: 'Rustic Mountain Cabin with Hot Tub',
    description: 'Escape to this charming log cabin nestled in the mountains. Perfect for a romantic getaway or small family retreat. Enjoy stargazing from the hot tub, cozy evenings by the fireplace, and hiking trails right outside your door. The cabin features rustic decor with modern amenities.',
    shortDescription: 'Romantic mountain cabin with hot tub and fireplace',
    type: 'entire-place',
    category: 'cabins',
    hostId: 'host-003',
    location: {
      address: 'Aspen, Colorado, United States',
      city: 'Aspen',
      state: 'Colorado',
      country: 'United States',
      latitude: 39.1911,
      longitude: -106.8175,
      neighborhood: 'Aspen Highlands'
    },
    images: [
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800&h=600&fit=crop'
    ],
    amenities: [
      'WiFi',
      'Kitchen',
      'Heating',
      'Hot tub',
      'Fireplace',
      'Mountain view',
      'Patio or balcony',
      'BBQ grill',
      'Parking',
      'TV',
      'Coffee maker',
      'Microwave',
      'Refrigerator',
      'Hiking nearby'
    ],
    safetyFeatures: [
      'Smoke alarm',
      'Carbon monoxide alarm',
      'First aid kit',
      'Fire extinguisher'
    ],
    houseRules: [
      'Check-in: 4:00 PM - 9:00 PM',
      'Checkout: 11:00 AM',
      'No smoking',
      'No pets',
      'No parties or events',
      'Maximum 4 guests'
    ],
    maxGuests: 4,
    bedrooms: 2,
    beds: 2,
    bathrooms: 1,
    pricePerNight: 220,
    currency: 'USD',
    rating: 4.8,
    reviewCount: 156,
    availability: {
      minNights: 2,
      maxNights: 21,
      instantBook: false,
      cancellationPolicy: 'Strict'
    },
    createdAt: '2022-11-08',
    isFavorite: false,
    isNewListing: false,
    cleaningFee: 50,
    serviceFee: 31,
    lastUpdated: '2024-01-12'
  },
  {
    id: 'prop-004',
    title: 'Unique Treehouse Retreat in the Forest',
    description: 'Sleep among the treetops in this magical treehouse experience. This eco-friendly retreat offers a one-of-a-kind stay surrounded by nature. Features include a suspended bridge entrance, wraparound deck, and skylights for stargazing. Perfect for adventurous couples or nature lovers.',
    shortDescription: 'Magical treehouse with bridge entrance and stargazing deck',
    type: 'entire-place',
    category: 'treehouses',
    hostId: 'host-004',
    location: {
      address: 'Olympic Peninsula, Washington, United States',
      city: 'Forks',
      state: 'Washington',
      country: 'United States',
      latitude: 47.9507,
      longitude: -124.3856,
      neighborhood: 'Olympic National Forest'
    },
    images: [
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'
    ],
    amenities: [
      'WiFi',
      'Kitchenette',
      'Heating',
      'Forest view',
      'Patio or balcony',
      'BBQ grill',
      'Parking',
      'Coffee maker',
      'Mini fridge',
      'Hiking nearby',
      'Fire pit',
      'Outdoor shower',
      'Composting toilet',
      'Solar power'
    ],
    safetyFeatures: [
      'Smoke alarm',
      'First aid kit',
      'Fire extinguisher',
      'Safety railings'
    ],
    houseRules: [
      'Check-in: 3:00 PM - 7:00 PM',
      'Checkout: 11:00 AM',
      'No smoking',
      'No pets',
      'No parties or events',
      'Maximum 2 guests',
      'Must be comfortable with heights'
    ],
    maxGuests: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    pricePerNight: 165,
    currency: 'USD',
    rating: 4.9,
    reviewCount: 203,
    availability: {
      minNights: 2,
      maxNights: 7,
      instantBook: false,
      cancellationPolicy: 'Moderate'
    },
    createdAt: '2023-05-14',
    isFavorite: false,
    isNewListing: false,
    cleaningFee: 30,
    serviceFee: 23,
    lastUpdated: '2024-01-08'
  },
  {
    id: 'prop-005',
    title: 'Modern Studio in Trendy Neighborhood',
    description: 'Stylish studio apartment in the heart of the city\'s most vibrant neighborhood. Features floor-to-ceiling windows, modern furnishings, and access to rooftop terrace. Walking distance to trendy restaurants, coffee shops, and nightlife. Perfect for solo travelers or couples.',
    shortDescription: 'Stylish studio with rooftop access in trendy area',
    type: 'entire-place',
    category: 'trending',
    hostId: 'host-005',
    location: {
      address: 'Mission District, San Francisco, CA, United States',
      city: 'San Francisco',
      state: 'California',
      country: 'United States',
      latitude: 37.7599,
      longitude: -122.4148,
      neighborhood: 'Mission District'
    },
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1574691250077-03a929faece5?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800&h=600&fit=crop'
    ],
    amenities: [
      'WiFi',
      'Kitchen',
      'Washer',
      'Dryer',
      'Air conditioning',
      'Heating',
      'TV',
      'Workspace',
      'Coffee maker',
      'Dishwasher',
      'Microwave',
      'Refrigerator',
      'Rooftop access',
      'City view'
    ],
    safetyFeatures: [
      'Smoke alarm',
      'Carbon monoxide alarm',
      'First aid kit',
      'Security system'
    ],
    houseRules: [
      'Check-in: 3:00 PM - 10:00 PM',
      'Checkout: 11:00 AM',
      'No smoking',
      'No pets',
      'No parties or events',
      'Maximum 2 guests'
    ],
    maxGuests: 2,
    bedrooms: 0, // Studio
    beds: 1,
    bathrooms: 1,
    pricePerNight: 95,
    currency: 'USD',
    rating: 4.6,
    reviewCount: 74,
    availability: {
      minNights: 1,
      maxNights: 28,
      instantBook: true,
      cancellationPolicy: 'Flexible'
    },
    createdAt: '2023-08-20',
    isFavorite: false,
    isNewListing: false,
    cleaningFee: 25,
    serviceFee: 13,
    lastUpdated: '2024-01-05'
  },
  {
    id: 'prop-006',
    title: 'Luxury Penthouse with City Skyline Views',
    description: 'Experience ultimate luxury in this stunning penthouse apartment with 360-degree city views. Features include a private elevator, marble bathrooms, gourmet kitchen, and expansive terraces. Located in the most prestigious building in downtown with concierge service and valet parking.',
    shortDescription: 'Luxury penthouse with 360-degree city views and private elevator',
    type: 'entire-place',
    category: 'luxury',
    hostId: 'host-001',
    location: {
      address: 'Downtown, Chicago, IL, United States',
      city: 'Chicago',
      state: 'Illinois',
      country: 'United States',
      latitude: 41.8781,
      longitude: -87.6298,
      neighborhood: 'The Loop'
    },
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1570214476695-19bd4f25e93a?w=800&h=600&fit=crop'
    ],
    amenities: [
      'WiFi',
      'Kitchen',
      'Washer',
      'Dryer',
      'Air conditioning',
      'Heating',
      'Elevator',
      'Gym',
      'Pool',
      'Hot tub',
      'Patio or balcony',
      'City view',
      'Workspace',
      'TV',
      'Sound system',
      'Wine fridge',
      'Concierge',
      'Valet parking'
    ],
    safetyFeatures: [
      'Smoke alarm',
      'Carbon monoxide alarm',
      'First aid kit',
      'Security system',
      'Doorman',
      '24-hour security'
    ],
    houseRules: [
      'Check-in: 4:00 PM - 11:00 PM',
      'Checkout: 12:00 PM',
      'No smoking',
      'No pets',
      'No parties or events',
      'Maximum 6 guests'
    ],
    maxGuests: 6,
    bedrooms: 3,
    beds: 3,
    bathrooms: 3,
    pricePerNight: 850,
    currency: 'USD',
    rating: 4.9,
    reviewCount: 45,
    availability: {
      minNights: 3,
      maxNights: 14,
      instantBook: false,
      cancellationPolicy: 'Strict'
    },
    createdAt: '2023-02-10',
    isFavorite: false,
    isNewListing: false,
    cleaningFee: 150,
    serviceFee: 119,
    lastUpdated: '2024-01-20'
  },
  {
    id: 'prop-007',
    title: 'Charming Countryside Cottage with Garden',
    description: 'Step back in time in this beautifully restored 18th-century cottage surrounded by rolling hills and meadows. The cottage features original stonework, exposed beams, and a large garden perfect for outdoor dining. Ideal for a peaceful retreat from city life.',
    shortDescription: 'Historic cottage with large garden in peaceful countryside',
    type: 'entire-place',
    category: 'countryside',
    hostId: 'host-003',
    location: {
      address: 'Cotswolds, Gloucestershire, United Kingdom',
      city: 'Chipping Campden',
      state: 'Gloucestershire',
      country: 'United Kingdom',
      latitude: 52.0411,
      longitude: -1.7800,
      neighborhood: 'Cotswolds'
    },
    images: [
      'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop'
    ],
    amenities: [
      'WiFi',
      'Kitchen',
      'Washer',
      'Heating',
      'Fireplace',
      'Garden',
      'Patio or balcony',
      'BBQ grill',
      'Parking',
      'TV',
      'Coffee maker',
      'Dishwasher',
      'Microwave',
      'Refrigerator',
      'Countryside view',
      'Hiking nearby'
    ],
    safetyFeatures: [
      'Smoke alarm',
      'Carbon monoxide alarm',
      'First aid kit',
      'Fire extinguisher'
    ],
    houseRules: [
      'Check-in: 3:00 PM - 8:00 PM',
      'Checkout: 11:00 AM',
      'No smoking',
      'Pets allowed',
      'No parties or events',
      'Maximum 6 guests'
    ],
    maxGuests: 6,
    bedrooms: 3,
    beds: 3,
    bathrooms: 2,
    pricePerNight: 195,
    currency: 'USD',
    rating: 4.8,
    reviewCount: 112,
    availability: {
      minNights: 2,
      maxNights: 21,
      instantBook: false,
      cancellationPolicy: 'Moderate'
    },
    createdAt: '2022-12-05',
    isFavorite: false,
    isNewListing: false,
    cleaningFee: 45,
    serviceFee: 27,
    lastUpdated: '2024-01-14'
  },
  {
    id: 'prop-008',
    title: 'Lakefront Cabin with Private Dock',
    description: 'Enjoy waterfront living in this cozy cabin with your own private dock. Perfect for swimming, fishing, or just relaxing by the water. The cabin features rustic charm with modern comforts, including a fully equipped kitchen and spacious deck overlooking the lake.',
    shortDescription: 'Cozy lakefront cabin with private dock and water activities',
    type: 'entire-place',
    category: 'lakefront',
    hostId: 'host-004',
    location: {
      address: 'Lake Tahoe, California, United States',
      city: 'South Lake Tahoe',
      state: 'California',
      country: 'United States',
      latitude: 38.9399,
      longitude: -119.9772,
      neighborhood: 'Lake Tahoe'
    },
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop'
    ],
    amenities: [
      'WiFi',
      'Kitchen',
      'Washer',
      'Dryer',
      'Heating',
      'Lake view',
      'Patio or balcony',
      'BBQ grill',
      'Parking',
      'TV',
      'Coffee maker',
      'Dishwasher',
      'Microwave',
      'Refrigerator',
      'Private dock',
      'Kayak included',
      'Fire pit'
    ],
    safetyFeatures: [
      'Smoke alarm',
      'Carbon monoxide alarm',
      'First aid kit',
      'Fire extinguisher',
      'Life jackets'
    ],
    houseRules: [
      'Check-in: 4:00 PM - 9:00 PM',
      'Checkout: 11:00 AM',
      'No smoking',
      'Pets allowed',
      'No parties or events',
      'Maximum 8 guests',
      'Children must be supervised near water'
    ],
    maxGuests: 8,
    bedrooms: 3,
    beds: 4,
    bathrooms: 2,
    pricePerNight: 275,
    currency: 'USD',
    rating: 4.9,
    reviewCount: 189,
    availability: {
      minNights: 2,
      maxNights: 14,
      instantBook: true,
      cancellationPolicy: 'Moderate'
    },
    createdAt: '2023-04-18',
    isFavorite: false,
    isNewListing: false,
    cleaningFee: 65,
    serviceFee: 38,
    lastUpdated: '2024-01-18'
  },
  {
    id: 'prop-009',
    title: 'Minimalist Tiny House in Nature',
    description: 'Experience the tiny house lifestyle in this beautifully designed minimalist home. Despite its compact size, this space is incredibly functional and comfortable. Surrounded by nature but with all modern amenities. Perfect for those seeking a unique, sustainable travel experience.',
    shortDescription: 'Minimalist tiny house with modern amenities in natural setting',
    type: 'entire-place',
    category: 'tiny-homes',
    hostId: 'host-005',
    location: {
      address: 'Austin, Texas, United States',
      city: 'Austin',
      state: 'Texas',
      country: 'United States',
      latitude: 30.2672,
      longitude: -97.7431,
      neighborhood: 'East Austin'
    },
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1574691250077-03a929faece5?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop'
    ],
    amenities: [
      'WiFi',
      'Kitchenette',
      'Heating',
      'Air conditioning',
      'Patio or balcony',
      'Parking',
      'TV',
      'Coffee maker',
      'Mini fridge',
      'Microwave',
      'Workspace',
      'Solar power',
      'Composting toilet',
      'Nature view'
    ],
    safetyFeatures: [
      'Smoke alarm',
      'Carbon monoxide alarm',
      'First aid kit',
      'Fire extinguisher'
    ],
    houseRules: [
      'Check-in: 3:00 PM - 9:00 PM',
      'Checkout: 11:00 AM',
      'No smoking',
      'No pets',
      'No parties or events',
      'Maximum 2 guests',
      'Be mindful of space limitations'
    ],
    maxGuests: 2,
    bedrooms: 0, // Loft bed
    beds: 1,
    bathrooms: 1,
    pricePerNight: 85,
    currency: 'USD',
    rating: 4.7,
    reviewCount: 98,
    availability: {
      minNights: 1,
      maxNights: 7,
      instantBook: true,
      cancellationPolicy: 'Flexible'
    },
    createdAt: '2023-07-12',
    isFavorite: false,
    isNewListing: false,
    cleaningFee: 20,
    serviceFee: 12,
    lastUpdated: '2024-01-11'
  },
  {
    id: 'prop-010',
    title: 'Ski-In/Ski-Out Mountain Lodge',
    description: 'Hit the slopes directly from your door in this premier ski-in/ski-out lodge. Features include a cozy stone fireplace, heated floors, ski storage, and panoramic mountain views. After a day on the mountain, relax in the hot tub while watching the sunset over the peaks.',
    shortDescription: 'Premier ski-in/ski-out lodge with hot tub and mountain views',
    type: 'entire-place',
    category: 'ski-in-out',
    hostId: 'host-002',
    location: {
      address: 'Whistler, British Columbia, Canada',
      city: 'Whistler',
      state: 'British Columbia',
      country: 'Canada',
      latitude: 50.1163,
      longitude: -122.9574,
      neighborhood: 'Whistler Village'
    },
    images: [
      'https://images.unsplash.com/photo-1551524164-687a55dd1126?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop'
    ],
    amenities: [
      'WiFi',
      'Kitchen',
      'Washer',
      'Dryer',
      'Heating',
      'Fireplace',
      'Hot tub',
      'Mountain view',
      'Patio or balcony',
      'Parking',
      'TV',
      'Coffee maker',
      'Dishwasher',
      'Microwave',
      'Refrigerator',
      'Ski storage',
      'Heated floors',
      'Ski-in/ski-out'
    ],
    safetyFeatures: [
      'Smoke alarm',
      'Carbon monoxide alarm',
      'First aid kit',
      'Fire extinguisher'
    ],
    houseRules: [
      'Check-in: 4:00 PM - 10:00 PM',
      'Checkout: 11:00 AM',
      'No smoking',
      'No pets',
      'No parties or events',
      'Maximum 8 guests',
      'Clean and store skis properly'
    ],
    maxGuests: 8,
    bedrooms: 4,
    beds: 4,
    bathrooms: 3,
    pricePerNight: 520,
    currency: 'USD',
    rating: 4.9,
    reviewCount: 167,
    availability: {
      minNights: 3,
      maxNights: 14,
      instantBook: false,
      cancellationPolicy: 'Strict'
    },
    createdAt: '2022-10-20',
    isFavorite: false,
    isNewListing: false,
    cleaningFee: 100,
    serviceFee: 73,
    lastUpdated: '2024-01-22'
  }
];

// Sample reviews for properties
export const reviews = [
  // Reviews for prop-001 (Beachfront Villa)
  {
    id: 'review-001',
    propertyId: 'prop-001',
    guestName: 'Jennifer Martinez',
    guestAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b282?w=80&h=80&fit=crop&crop=face',
    rating: 5,
    date: '2024-01-10',
    comment: 'Absolutely stunning property! The ocean views were breathtaking and the private pool was perfect. Sarah was an amazing host and very responsive. Would definitely stay here again!'
  },
  {
    id: 'review-002',
    propertyId: 'prop-001',
    guestName: 'Robert Kim',
    guestAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
    rating: 5,
    date: '2023-12-28',
    comment: 'Perfect for our family vacation. The kids loved the direct beach access and the adults enjoyed the beautiful terraces. Everything was exactly as described.'
  },
  {
    id: 'review-003',
    propertyId: 'prop-001',
    guestName: 'Emily Chen',
    guestAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
    rating: 5,
    date: '2023-12-15',
    comment: 'This place exceeded all expectations. The sunset views from the infinity pool were magical. Highly recommend for a romantic getaway!'
  },
  // Reviews for prop-002 (Downtown Loft)
  {
    id: 'review-004',
    propertyId: 'prop-002',
    guestName: 'Alex Thompson',
    guestAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
    rating: 5,
    date: '2024-01-05',
    comment: 'Perfect location in SoHo! Walking distance to everything. The loft is beautifully designed and Michael was a great host.'
  },
  {
    id: 'review-005',
    propertyId: 'prop-002',
    guestName: 'Maria Rodriguez',
    guestAvatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=80&h=80&fit=crop&crop=face',
    rating: 4,
    date: '2023-12-20',
    comment: 'Great space with lots of character. The industrial design is really cool. Only minor issue was some street noise at night.'
  },
  // More reviews can be added for other properties...
];

// Destinations for search
export const destinations = [
  {
    id: 'new-york',
    name: 'New York',
    country: 'United States',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop',
    propertyCount: 1250
  },
  {
    id: 'san-francisco',
    name: 'San Francisco',
    country: 'United States',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    propertyCount: 890
  },
  {
    id: 'los-angeles',
    name: 'Los Angeles',
    country: 'United States',
    image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=400&h=300&fit=crop',
    propertyCount: 1420
  },
  {
    id: 'chicago',
    name: 'Chicago',
    country: 'United States',
    image: 'https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=400&h=300&fit=crop',
    propertyCount: 675
  },
  {
    id: 'miami',
    name: 'Miami',
    country: 'United States',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    propertyCount: 980
  },
  {
    id: 'london',
    name: 'London',
    country: 'United Kingdom',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop',
    propertyCount: 2100
  }
];

// Utility functions
export const getPropertyById = (id) => {
  return properties.find(property => property.id === id);
};

export const getHostById = (id) => {
  return hosts.find(host => host.id === id);
};

export const getReviewsByPropertyId = (propertyId) => {
  return reviews.filter(review => review.propertyId === propertyId);
};

export const searchProperties = (filters = {}) => {
  let filteredProperties = [...properties];

  // Filter by destination/location
  if (filters.destination) {
    filteredProperties = filteredProperties.filter(property =>
      property.location.city.toLowerCase().includes(filters.destination.toLowerCase()) ||
      property.location.state.toLowerCase().includes(filters.destination.toLowerCase()) ||
      property.location.country.toLowerCase().includes(filters.destination.toLowerCase())
    );
  }

  // Filter by guests
  if (filters.guests) {
    filteredProperties = filteredProperties.filter(property =>
      property.maxGuests >= parseInt(filters.guests)
    );
  }

  // Filter by property type
  if (filters.type && filters.type !== 'any') {
    filteredProperties = filteredProperties.filter(property =>
      property.type === filters.type
    );
  }

  // Filter by category
  if (filters.category) {
    filteredProperties = filteredProperties.filter(property =>
      property.category === filters.category
    );
  }

  // Filter by price range
  if (filters.minPrice || filters.maxPrice) {
    filteredProperties = filteredProperties.filter(property => {
      const price = property.pricePerNight;
      const min = filters.minPrice ? parseInt(filters.minPrice) : 0;
      const max = filters.maxPrice ? parseInt(filters.maxPrice) : Infinity;
      return price >= min && price <= max;
    });
  }

  // Filter by instant book
  if (filters.instantBook) {
    filteredProperties = filteredProperties.filter(property =>
      property.availability.instantBook
    );
  }

  // Filter by amenities
  if (filters.amenities && filters.amenities.length > 0) {
    filteredProperties = filteredProperties.filter(property =>
      filters.amenities.every(amenity =>
        property.amenities.includes(amenity)
      )
    );
  }

  return filteredProperties;
};

export const calculateTotalPrice = (property, nights = 1) => {
  const subtotal = property.pricePerNight * nights;
  const cleaningFee = property.cleaningFee || 0;
  const serviceFee = property.serviceFee || 0;
  const total = subtotal + cleaningFee + serviceFee;

  return {
    subtotal,
    cleaningFee,
    serviceFee,
    total,
    nights
  };
};

const staticStaybnbData = {
  properties,
  hosts,
  reviews,
  destinations,
  propertyTypes,
  categories,
  getPropertyById,
  getHostById,
  getReviewsByPropertyId,
  searchProperties,
  calculateTotalPrice
};

export default staticStaybnbData;
