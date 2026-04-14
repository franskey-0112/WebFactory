// Static hotel data for hotel booking website
const staticHotelData = [
  {
    id: 1,
    name: 'Grand Luxury Hotel',
    starRating: 5,
    address: '123 Fifth Avenue, Manhattan, New York, NY 10001',
    city: 'New York',
    country: 'United States',
    location: {
      latitude: 40.7589,
      longitude: -73.9851,
      district: 'Midtown Manhattan',
      nearbyLandmarks: ['Empire State Building', 'Times Square', 'Central Park']
    },
    description: 'Experience unparalleled luxury in the heart of Manhattan. Our 5-star hotel offers world-class amenities, elegant rooms, and exceptional service.',
    images: [
      '/images/hotels/hotels/grand-luxury-hotel-1.jpg',
      '/images/hotels/hotels/grand-luxury-hotel-2.jpg',
      '/images/hotels/hotels/grand-luxury-hotel-3.jpg',
      '/images/hotels/hotels/grand-luxury-hotel-4.jpg'
    ],
    amenities: [
      'Free WiFi',
      'Fitness Center',
      'Swimming Pool',
      '24-hour Room Service',
      'Spa & Wellness Center',
      'Business Center',
      'Concierge Service',
      'Valet Parking',
      'Restaurant',
      'Bar',
      'Airport Shuttle',
      'Pet Friendly'
    ],
    roomTypes: [
      {
        id: 'deluxe-room',
        name: 'Deluxe Room',
        description: 'Elegantly appointed room with city views and modern amenities',
        size: 350,
        maxGuests: 2,
        bedType: 'King Bed',
        price: 299,
        features: ['City View', 'Mini Bar', 'Work Desk', 'Air Conditioning'],
        images: ['/images/hotels/hotels/grand-luxury-deluxe-room.jpg']
      },
      {
        id: 'executive-suite',
        name: 'Executive Suite',
        description: 'Spacious suite with separate living area and premium amenities',
        size: 650,
        maxGuests: 4,
        bedType: 'King Bed + Sofa Bed',
        price: 499,
        features: ['City View', 'Living Room', 'Kitchen', 'Premium Amenities'],
        images: ['/images/hotels/hotels/grand-luxury-executive-suite.jpg']
      }
    ],
    rating: 4.7,
    reviewCount: 2847,
    priceFrom: 299,
    freeCancellation: true,
    bookingDeadline: 24
  },
  {
    id: 2,
    name: 'Boutique Garden Hotel',
    starRating: 4,
    address: '456 Union Square, San Francisco, CA 94108',
    city: 'San Francisco',
    country: 'United States',
    location: {
      latitude: 37.7749,
      longitude: -122.4194,
      district: 'Union Square',
      nearbyLandmarks: ['Union Square', 'Chinatown', 'Golden Gate Bridge']
    },
    description: 'A charming boutique hotel in the heart of San Francisco, featuring unique design and personalized service.',
    images: [
      '/images/hotels/hotels/boutique-garden-hotel-1.jpg',
      '/images/hotels/hotels/boutique-garden-hotel-2.jpg',
      '/images/hotels/hotels/boutique-garden-hotel-3.jpg'
    ],
    amenities: [
      'Free WiFi',
      'Fitness Center',
      'Restaurant',
      'Bar',
      '24-hour Front Desk',
      'Concierge Service',
      'Business Center',
      'Laundry Service'
    ],
    roomTypes: [
      {
        id: 'standard-room',
        name: 'Standard Room',
        description: 'Comfortable room with modern amenities and city views',
        size: 280,
        maxGuests: 2,
        bedType: 'Queen Bed',
        price: 189,
        features: ['City View', 'Free WiFi', 'Work Desk', 'Coffee Maker'],
        images: ['/images/hotels/hotels/boutique-garden-standard-room.jpg']
      },
      {
        id: 'garden-suite',
        name: 'Garden Suite',
        description: 'Spacious suite overlooking our beautiful garden courtyard',
        size: 450,
        maxGuests: 3,
        bedType: 'King Bed + Day Bed',
        price: 289,
        features: ['Garden View', 'Balcony', 'Sitting Area', 'Premium Toiletries'],
        images: ['/images/hotels/hotels/boutique-garden-garden-suite.jpg']
      }
    ],
    rating: 4.4,
    reviewCount: 1523,
    priceFrom: 189,
    freeCancellation: true,
    bookingDeadline: 48
  },
  {
    id: 3,
    name: 'Oceanview Resort',
    starRating: 5,
    address: '789 Ocean Drive, Miami Beach, FL 33139',
    city: 'Miami',
    country: 'United States',
    location: {
      latitude: 25.7617,
      longitude: -80.1918,
      district: 'South Beach',
      nearbyLandmarks: ['South Beach', 'Art Deco District', 'Lincoln Road']
    },
    description: 'Luxury beachfront resort offering stunning ocean views, world-class dining, and exceptional amenities.',
    images: [
      '/images/hotels/hotels/oceanview-resort-1.jpg',
      '/images/hotels/hotels/oceanview-resort-2.jpg',
      '/images/hotels/hotels/oceanview-resort-3.jpg',
      '/images/hotels/hotels/oceanview-resort-4.jpg',
      '/images/hotels/hotels/oceanview-resort-5.jpg'
    ],
    amenities: [
      'Free WiFi',
      'Beach Access',
      'Swimming Pool',
      'Spa & Wellness Center',
      'Multiple Restaurants',
      'Beach Bar',
      '24-hour Room Service',
      'Fitness Center',
      'Tennis Court',
      'Water Sports',
      'Kids Club',
      'Valet Parking'
    ],
    roomTypes: [
      {
        id: 'ocean-view-room',
        name: 'Ocean View Room',
        description: 'Elegant room with breathtaking ocean views and luxury amenities',
        size: 420,
        maxGuests: 2,
        bedType: 'King Bed',
        price: 399,
        features: ['Ocean View', 'Balcony', 'Marble Bathroom', 'Premium Amenities'],
        images: ['/images/hotels/hotels/oceanview-resort-ocean-room.jpg']
      },
      {
        id: 'presidential-suite',
        name: 'Presidential Suite',
        description: 'Ultimate luxury suite with panoramic ocean views and premium services',
        size: 1200,
        maxGuests: 6,
        bedType: '2 King Beds + Living Room',
        price: 999,
        features: ['Panoramic Ocean View', 'Private Terrace', 'Butler Service', 'Jacuzzi'],
        images: ['/images/hotels/hotels/oceanview-resort-presidential-suite.jpg']
      }
    ],
    rating: 4.8,
    reviewCount: 3654,
    priceFrom: 399,
    freeCancellation: true,
    bookingDeadline: 24
  },
  {
    id: 4,
    name: 'Historic Downtown Inn',
    starRating: 3,
    address: '321 Main Street, Boston, MA 02101',
    city: 'Boston',
    country: 'United States',
    location: {
      latitude: 42.3601,
      longitude: -71.0589,
      district: 'Downtown',
      nearbyLandmarks: ['Freedom Trail', 'Boston Common', 'Faneuil Hall']
    },
    description: 'Charming historic inn in downtown Boston, perfect for exploring the city\'s rich history and culture.',
    images: [
      '/images/hotels/hotels/historic-downtown-inn-1.jpg',
      '/images/hotels/hotels/historic-downtown-inn-2.jpg',
      '/images/hotels/hotels/historic-downtown-inn-3.jpg'
    ],
    amenities: [
      'Free WiFi',
      'Restaurant',
      '24-hour Front Desk',
      'Business Center',
      'Fitness Center',
      'Laundry Service',
      'Parking Available'
    ],
    roomTypes: [
      {
        id: 'classic-room',
        name: 'Classic Room',
        description: 'Cozy room with traditional décor and modern comforts',
        size: 220,
        maxGuests: 2,
        bedType: 'Queen Bed',
        price: 149,
        features: ['City View', 'Work Desk', 'Coffee Maker', 'Historic Charm'],
        images: ['/images/hotels/hotels/historic-downtown-classic-room.jpg']
      },
      {
        id: 'heritage-suite',
        name: 'Heritage Suite',
        description: 'Spacious suite featuring original architectural details',
        size: 380,
        maxGuests: 4,
        bedType: 'King Bed + Sofa Bed',
        price: 229,
        features: ['Historic Features', 'Sitting Area', 'Kitchenette', 'High Ceilings'],
        images: ['/images/hotels/hotels/historic-downtown-heritage-suite.jpg']
      }
    ],
    rating: 4.2,
    reviewCount: 987,
    priceFrom: 149,
    freeCancellation: true,
    bookingDeadline: 72
  },
  {
    id: 5,
    name: 'Mountain Lodge Retreat',
    starRating: 4,
    address: '555 Alpine Way, Aspen, CO 81611',
    city: 'Aspen',
    country: 'United States',
    location: {
      latitude: 39.1911,
      longitude: -106.8175,
      district: 'Aspen Village',
      nearbyLandmarks: ['Aspen Mountain', 'Snowmass', 'Maroon Bells']
    },
    description: 'Luxury mountain lodge offering stunning alpine views, world-class skiing, and year-round outdoor activities.',
    images: [
      '/images/hotels/hotels/mountain-lodge-retreat-1.jpg',
      '/images/hotels/hotels/mountain-lodge-retreat-2.jpg',
      '/images/hotels/hotels/mountain-lodge-retreat-3.jpg',
      '/images/hotels/hotels/mountain-lodge-retreat-4.jpg'
    ],
    amenities: [
      'Free WiFi',
      'Ski-in/Ski-out Access',
      'Spa & Wellness Center',
      'Heated Pool',
      'Restaurant',
      'Bar',
      'Fitness Center',
      'Concierge Service',
      'Fireplace Lounge',
      'Equipment Rental',
      'Shuttle Service'
    ],
    roomTypes: [
      {
        id: 'mountain-view-room',
        name: 'Mountain View Room',
        description: 'Comfortable room with stunning mountain vistas and rustic elegance',
        size: 320,
        maxGuests: 2,
        bedType: 'King Bed',
        price: 259,
        features: ['Mountain View', 'Fireplace', 'Balcony', 'Ski Storage'],
        images: ['/images/hotels/hotels/mountain-lodge-mountain-room.jpg']
      },
      {
        id: 'alpine-suite',
        name: 'Alpine Suite',
        description: 'Luxurious suite with panoramic mountain views and premium amenities',
        size: 580,
        maxGuests: 4,
        bedType: 'King Bed + Sofa Bed',
        price: 459,
        features: ['Panoramic Views', 'Living Room', 'Kitchen', 'Private Hot Tub'],
        images: ['/images/hotels/hotels/mountain-lodge-alpine-suite.jpg']
      }
    ],
    rating: 4.6,
    reviewCount: 1876,
    priceFrom: 259,
    freeCancellation: true,
    bookingDeadline: 48
  },
  {
    id: 6,
    name: 'Business Plaza Hotel',
    starRating: 4,
    address: '100 Corporate Blvd, Chicago, IL 60601',
    city: 'Chicago',
    country: 'United States',
    location: {
      latitude: 41.8781,
      longitude: -87.6298,
      district: 'The Loop',
      nearbyLandmarks: ['Millennium Park', 'Navy Pier', 'Art Institute of Chicago']
    },
    description: 'Modern business hotel in Chicago\'s Loop district, ideal for corporate travelers and city explorers.',
    images: [
      '/images/hotels/hotels/business-plaza-hotel-1.jpg',
      '/images/hotels/hotels/business-plaza-hotel-2.jpg',
      '/images/hotels/hotels/business-plaza-hotel-3.jpg'
    ],
    amenities: [
      'Free WiFi',
      'Business Center',
      'Fitness Center',
      'Restaurant',
      'Bar',
      '24-hour Room Service',
      'Concierge Service',
      'Meeting Rooms',
      'Valet Parking',
      'Airport Shuttle'
    ],
    roomTypes: [
      {
        id: 'business-room',
        name: 'Business Room',
        description: 'Well-appointed room designed for the modern business traveler',
        size: 300,
        maxGuests: 2,
        bedType: 'King Bed',
        price: 199,
        features: ['City View', 'Work Station', 'High-Speed Internet', 'Coffee Station'],
        images: ['/images/hotels/hotels/business-plaza-business-room.jpg']
      },
      {
        id: 'executive-floor',
        name: 'Executive Floor Room',
        description: 'Premium room with executive lounge access and enhanced amenities',
        size: 350,
        maxGuests: 2,
        bedType: 'King Bed',
        price: 279,
        features: ['Executive Lounge', 'Premium Amenities', 'Express Check-in', 'Complimentary Breakfast'],
        images: ['/images/hotels/hotels/business-plaza-executive-room.jpg']
      }
    ],
    rating: 4.3,
    reviewCount: 2156,
    priceFrom: 199,
    freeCancellation: true,
    bookingDeadline: 24
  },
  // Additional hotels for expanded data
  {
    id: 7,
    name: 'The Metropolitan Tower',
    starRating: 5,
    address: '1000 Broadway, New York, NY 10019',
    city: 'New York',
    country: 'United States',
    location: {
      latitude: 40.7614,
      longitude: -73.9776,
      district: 'Times Square',
      nearbyLandmarks: ['Times Square', 'Broadway Theater District', 'Central Park']
    },
    description: 'Iconic luxury hotel in the heart of Times Square, offering unparalleled views and world-class amenities.',
    images: [
      '/images/hotels/hotels/metropolitan-tower-1.jpg',
      '/images/hotels/hotels/metropolitan-tower-2.jpg',
      '/images/hotels/hotels/metropolitan-tower-3.jpg'
    ],
    amenities: [
      'Free WiFi',
      'Rooftop Pool',
      'Spa & Wellness Center',
      'Multiple Restaurants',
      'Bar & Lounge',
      '24-hour Room Service',
      'Fitness Center',
      'Business Center',
      'Concierge Service',
      'Valet Parking',
      'Pet Friendly',
      'Meeting Rooms'
    ],
    roomTypes: [
      {
        id: 'city-view-room',
        name: 'City View Room',
        description: 'Modern room with stunning Manhattan skyline views',
        size: 400,
        maxGuests: 2,
        bedType: 'King Bed',
        price: 389,
        features: ['City View', 'Floor-to-Ceiling Windows', 'Marble Bathroom', 'Smart TV'],
        images: ['/images/hotels/hotels/metropolitan-city-room.jpg']
      },
      {
        id: 'penthouse-suite',
        name: 'Penthouse Suite',
        description: 'Luxury penthouse with 360-degree views of Manhattan',
        size: 1500,
        maxGuests: 6,
        bedType: '2 King Beds + Living Area',
        price: 1299,
        features: ['360-Degree Views', 'Private Terrace', 'Full Kitchen', 'Butler Service'],
        images: ['/images/hotels/hotels/metropolitan-penthouse.jpg']
      }
    ],
    rating: 4.9,
    reviewCount: 4521,
    priceFrom: 389,
    freeCancellation: true,
    bookingDeadline: 24
  },
  {
    id: 8,
    name: 'Golden Gate Suites',
    starRating: 4,
    address: '2001 Lombard Street, San Francisco, CA 94123',
    city: 'San Francisco',
    country: 'United States',
    location: {
      latitude: 37.7987,
      longitude: -122.4456,
      district: 'Marina District',
      nearbyLandmarks: ['Golden Gate Bridge', 'Presidio', 'Marina Green']
    },
    description: 'Stylish all-suite hotel with spectacular Golden Gate Bridge views and modern amenities.',
    images: [
      '/images/hotels/hotels/golden-gate-suites-1.jpg',
      '/images/hotels/hotels/golden-gate-suites-2.jpg',
      '/images/hotels/hotels/golden-gate-suites-3.jpg'
    ],
    amenities: [
      'Free WiFi',
      'Fitness Center',
      'Restaurant',
      'Bar',
      'Business Center',
      'Concierge Service',
      'Laundry Service',
      'Parking Available',
      'Pet Friendly'
    ],
    roomTypes: [
      {
        id: 'bridge-view-suite',
        name: 'Golden Gate Bridge View Suite',
        description: 'Spacious suite with direct Golden Gate Bridge views',
        size: 520,
        maxGuests: 4,
        bedType: 'King Bed + Sofa Bed',
        price: 329,
        features: ['Bridge View', 'Full Kitchen', 'Living Area', 'Balcony'],
        images: ['/images/hotels/hotels/golden-gate-bridge-suite.jpg']
      },
      {
        id: 'premium-suite',
        name: 'Premium Marina Suite',
        description: 'Luxury suite overlooking the marina and bay',
        size: 680,
        maxGuests: 6,
        bedType: '2 Queen Beds + Living Room',
        price: 429,
        features: ['Marina View', 'Full Kitchen', '2 Bathrooms', 'Dining Area'],
        images: ['/images/hotels/hotels/golden-gate-premium-suite.jpg']
      }
    ],
    rating: 4.5,
    reviewCount: 2334,
    priceFrom: 329,
    freeCancellation: true,
    bookingDeadline: 48
  },
  {
    id: 9,
    name: 'Art Deco Paradise',
    starRating: 4,
    address: '1401 Collins Avenue, Miami Beach, FL 33139',
    city: 'Miami',
    country: 'United States',
    location: {
      latitude: 25.7825,
      longitude: -80.1258,
      district: 'South Beach',
      nearbyLandmarks: ['Ocean Drive', 'Art Deco Historic District', 'Lincoln Road']
    },
    description: 'Iconic Art Deco hotel on South Beach featuring vibrant design, beachfront location, and Miami\'s legendary nightlife.',
    images: [
      '/images/hotels/hotels/art-deco-paradise-1.jpg',
      '/images/hotels/hotels/art-deco-paradise-2.jpg',
      '/images/hotels/hotels/art-deco-paradise-3.jpg'
    ],
    amenities: [
      'Free WiFi',
      'Beach Access',
      'Swimming Pool',
      'Beach Bar',
      'Restaurant',
      'Nightclub',
      'Fitness Center',
      'Spa Services',
      'Concierge Service',
      'Valet Parking'
    ],
    roomTypes: [
      {
        id: 'ocean-front-room',
        name: 'Ocean Front Room',
        description: 'Stylish room with direct ocean views and Art Deco design',
        size: 300,
        maxGuests: 2,
        bedType: 'King Bed',
        price: 279,
        features: ['Ocean View', 'Art Deco Furnishings', 'Private Balcony', 'Mini Bar'],
        images: ['/images/hotels/hotels/art-deco-ocean-room.jpg']
      },
      {
        id: 'deco-suite',
        name: 'Art Deco Suite',
        description: 'Luxurious suite celebrating Miami\'s Art Deco heritage',
        size: 600,
        maxGuests: 4,
        bedType: 'King Bed + Living Area',
        price: 449,
        features: ['Ocean View', 'Original Art Deco Details', 'Separate Living Room', 'Wet Bar'],
        images: ['/images/hotels/hotels/art-deco-suite.jpg']
      }
    ],
    rating: 4.4,
    reviewCount: 3127,
    priceFrom: 279,
    freeCancellation: true,
    bookingDeadline: 24
  },
  {
    id: 10,
    name: 'Freedom Trail Lodge',
    starRating: 3,
    address: '15 Beacon Street, Boston, MA 02108',
    city: 'Boston',
    country: 'United States',
    location: {
      latitude: 42.3584,
      longitude: -71.0598,
      district: 'Beacon Hill',
      nearbyLandmarks: ['Boston Common', 'State House', 'Freedom Trail']
    },
    description: 'Charming colonial-style hotel in historic Beacon Hill, steps from the Freedom Trail and Boston Common.',
    images: [
      '/images/hotels/hotels/freedom-trail-lodge-1.jpg',
      '/images/hotels/hotels/freedom-trail-lodge-2.jpg',
      '/images/hotels/hotels/freedom-trail-lodge-3.jpg'
    ],
    amenities: [
      'Free WiFi',
      'Restaurant',
      'Bar',
      '24-hour Front Desk',
      'Business Center',
      'Fitness Center',
      'Laundry Service'
    ],
    roomTypes: [
      {
        id: 'colonial-room',
        name: 'Colonial Room',
        description: 'Traditional room with colonial charm and modern comforts',
        size: 250,
        maxGuests: 2,
        bedType: 'Queen Bed',
        price: 169,
        features: ['Historic Charm', 'Hardwood Floors', 'Work Desk', 'Coffee Maker'],
        images: ['/images/hotels/hotels/freedom-trail-colonial-room.jpg']
      },
      {
        id: 'beacon-suite',
        name: 'Beacon Hill Suite',
        description: 'Spacious suite with period furnishings and city views',
        size: 450,
        maxGuests: 4,
        bedType: 'King Bed + Sitting Area',
        price: 269,
        features: ['City View', 'Period Furnishings', 'Sitting Area', 'Kitchenette'],
        images: ['/images/hotels/hotels/freedom-trail-beacon-suite.jpg']
      }
    ],
    rating: 4.1,
    reviewCount: 1456,
    priceFrom: 169,
    freeCancellation: true,
    bookingDeadline: 48
  },
  {
    id: 11,
    name: 'Aspen Peaks Resort',
    starRating: 5,
    address: '1245 Castle Creek Road, Aspen, CO 81611',
    city: 'Aspen',
    country: 'United States',
    location: {
      latitude: 39.1637,
      longitude: -106.7864,
      district: 'Castle Creek',
      nearbyLandmarks: ['Aspen Highlands', 'Castle Creek', 'Independence Pass']
    },
    description: 'Ultra-luxury mountain resort offering world-class skiing, spa services, and breathtaking alpine scenery.',
    images: [
      '/images/hotels/hotels/aspen-peaks-resort-1.jpg',
      '/images/hotels/hotels/aspen-peaks-resort-2.jpg',
      '/images/hotels/hotels/aspen-peaks-resort-3.jpg'
    ],
    amenities: [
      'Free WiFi',
      'Ski-in/Ski-out Access',
      'Luxury Spa',
      'Heated Pools',
      'Multiple Restaurants',
      'Bars & Lounges',
      'Fitness Center',
      'Kids Club',
      'Equipment Rental',
      'Helicopter Service',
      'Private Ski Lessons',
      'Butler Service'
    ],
    roomTypes: [
      {
        id: 'luxury-mountain-room',
        name: 'Luxury Mountain Room',
        description: 'Elegant room with panoramic mountain views and luxury amenities',
        size: 450,
        maxGuests: 2,
        bedType: 'King Bed',
        price: 599,
        features: ['Mountain Views', 'Fireplace', 'Heated Floors', 'Premium Minibar'],
        images: ['/images/hotels/hotels/aspen-peaks-luxury-room.jpg']
      },
      {
        id: 'presidential-chalet',
        name: 'Presidential Chalet',
        description: 'Ultimate luxury chalet with private ski access and personal butler',
        size: 2000,
        maxGuests: 8,
        bedType: '3 King Beds + Living Areas',
        price: 1899,
        features: ['Private Ski Access', 'Full Kitchen', 'Wine Cellar', 'Personal Butler'],
        images: ['/images/hotels/hotels/aspen-peaks-chalet.jpg']
      }
    ],
    rating: 4.9,
    reviewCount: 1234,
    priceFrom: 599,
    freeCancellation: true,
    bookingDeadline: 24
  },
  {
    id: 12,
    name: 'Millennium Tower Chicago',
    starRating: 5,
    address: '200 N Michigan Avenue, Chicago, IL 60601',
    city: 'Chicago',
    country: 'United States',
    location: {
      latitude: 41.8861,
      longitude: -87.6241,
      district: 'Magnificent Mile',
      nearbyLandmarks: ['Millennium Park', 'Art Institute', 'Chicago River']
    },
    description: 'Luxury hotel on the Magnificent Mile featuring modern design, fine dining, and spectacular city views.',
    images: [
      '/images/hotels/hotels/millennium-tower-chicago-1.jpg',
      '/images/hotels/hotels/millennium-tower-chicago-2.jpg',
      '/images/hotels/hotels/millennium-tower-chicago-3.jpg'
    ],
    amenities: [
      'Free WiFi',
      'Rooftop Bar',
      'Spa & Wellness Center',
      'Fine Dining Restaurant',
      'Fitness Center',
      'Business Center',
      'Concierge Service',
      'Valet Parking',
      'Meeting Rooms',
      'Pet Friendly'
    ],
    roomTypes: [
      {
        id: 'skyline-room',
        name: 'Chicago Skyline Room',
        description: 'Modern room with floor-to-ceiling windows and skyline views',
        size: 380,
        maxGuests: 2,
        bedType: 'King Bed',
        price: 319,
        features: ['Skyline Views', 'Floor-to-Ceiling Windows', 'Marble Bathroom', 'Smart Technology'],
        images: ['/images/hotels/hotels/millennium-skyline-room.jpg']
      },
      {
        id: 'millennium-suite',
        name: 'Millennium Suite',
        description: 'Spacious suite with panoramic city views and luxury amenities',
        size: 800,
        maxGuests: 4,
        bedType: 'King Bed + Living Room',
        price: 599,
        features: ['Panoramic Views', 'Separate Living Room', 'Wet Bar', 'Premium Amenities'],
        images: ['/images/hotels/hotels/millennium-suite.jpg']
      }
    ],
    rating: 4.7,
    reviewCount: 3567,
    priceFrom: 319,
    freeCancellation: true,
    bookingDeadline: 24
  },
  // West Coast additions
  {
    id: 13,
    name: 'Hollywood Hills Luxury',
    starRating: 5,
    address: '8221 Sunset Boulevard, Los Angeles, CA 90046',
    city: 'Los Angeles',
    country: 'United States',
    location: {
      latitude: 34.0969,
      longitude: -118.3761,
      district: 'West Hollywood',
      nearbyLandmarks: ['Hollywood Sign', 'Sunset Strip', 'Griffith Observatory']
    },
    description: 'Glamorous hotel in the heart of Hollywood offering luxury accommodations and celebrity sightings.',
    images: [
      '/images/hotels/hotels/hollywood-hills-luxury-1.jpg',
      '/images/hotels/hotels/hollywood-hills-luxury-2.jpg',
      '/images/hotels/hotels/hollywood-hills-luxury-3.jpg'
    ],
    amenities: [
      'Free WiFi',
      'Rooftop Pool',
      'Celebrity Chef Restaurant',
      'Rooftop Bar',
      'Spa & Wellness Center',
      'Fitness Center',
      'Valet Parking',
      'Concierge Service',
      '24-hour Room Service'
    ],
    roomTypes: [
      {
        id: 'hollywood-room',
        name: 'Hollywood Hills Room',
        description: 'Stylish room with city views and Hollywood glamour',
        size: 350,
        maxGuests: 2,
        bedType: 'King Bed',
        price: 429,
        features: ['City Views', 'Hollywood Decor', 'Premium Amenities', 'Smart TV'],
        images: ['/images/hotels/hotels/hollywood-hills-room.jpg']
      }
    ],
    rating: 4.6,
    reviewCount: 2890,
    priceFrom: 429,
    freeCancellation: true,
    bookingDeadline: 24
  },
  {
    id: 14,
    name: 'Vegas Strip Grand',
    starRating: 4,
    address: '3570 Las Vegas Boulevard South, Las Vegas, NV 89109',
    city: 'Las Vegas',
    country: 'United States',
    location: {
      latitude: 36.1147,
      longitude: -115.1728,
      district: 'The Strip',
      nearbyLandmarks: ['Bellagio Fountains', 'High Roller', 'Forum Shops']
    },
    description: 'Vibrant hotel on the famous Las Vegas Strip featuring gaming, entertainment, and dining.',
    images: [
      '/images/hotels/hotels/vegas-strip-grand-1.jpg',
      '/images/hotels/hotels/vegas-strip-grand-2.jpg',
      '/images/hotels/hotels/vegas-strip-grand-3.jpg'
    ],
    amenities: [
      'Free WiFi',
      'Casino',
      'Multiple Pools',
      'Shows & Entertainment',
      'Multiple Restaurants',
      'Bars & Lounges',
      'Spa Services',
      'Fitness Center',
      'Shopping',
      'Valet Parking'
    ],
    roomTypes: [
      {
        id: 'strip-view-room',
        name: 'Strip View Room',
        description: 'Modern room with views of the famous Las Vegas Strip',
        size: 320,
        maxGuests: 2,
        bedType: 'King Bed',
        price: 199,
        features: ['Strip Views', 'Modern Furnishings', 'Mini Refrigerator', 'Coffee Maker'],
        images: ['/images/hotels/hotels/vegas-strip-room.jpg']
      }
    ],
    rating: 4.2,
    reviewCount: 5678,
    priceFrom: 199,
    freeCancellation: true,
    bookingDeadline: 24
  },
  {
    id: 15,
    name: 'Space Needle Suites',
    starRating: 4,
    address: '400 Broad Street, Seattle, WA 98109',
    city: 'Seattle',
    country: 'United States',
    location: {
      latitude: 47.6205,
      longitude: -122.3493,
      district: 'Seattle Center',
      nearbyLandmarks: ['Space Needle', 'Pike Place Market', 'Puget Sound']
    },
    description: 'Modern hotel near the Space Needle offering stunning views of the city and Puget Sound.',
    images: [
      '/images/hotels/hotels/space-needle-suites-1.jpg',
      '/images/hotels/hotels/space-needle-suites-2.jpg',
      '/images/hotels/hotels/space-needle-suites-3.jpg'
    ],
    amenities: [
      'Free WiFi',
      'Restaurant',
      'Bar',
      'Fitness Center',
      'Business Center',
      'Concierge Service',
      'Laundry Service',
      'Pet Friendly'
    ],
    roomTypes: [
      {
        id: 'sound-view-suite',
        name: 'Puget Sound View Suite',
        description: 'Spacious suite with panoramic Puget Sound views',
        size: 500,
        maxGuests: 4,
        bedType: 'King Bed + Sofa Bed',
        price: 289,
        features: ['Sound Views', 'Full Kitchen', 'Living Area', 'Balcony'],
        images: ['/images/hotels/hotels/space-needle-sound-suite.jpg']
      }
    ],
    rating: 4.4,
    reviewCount: 1876,
    priceFrom: 289,
    freeCancellation: true,
    bookingDeadline: 48
  },
  // =================== EXPANDED HOTEL DATA ===================
  // Los Angeles Hotels
  {
    id: 16,
    name: 'Hollywood Hills Resort',
    starRating: 4,
    address: '8221 Sunset Boulevard, West Hollywood, Los Angeles, CA 90046',
    city: 'Los Angeles',
    country: 'United States',
    location: {
      latitude: 34.0928,
      longitude: -118.3287,
      district: 'West Hollywood',
      nearbyLandmarks: ['Hollywood Sign', 'Walk of Fame', 'Griffith Observatory']
    },
    description: 'Modern resort in the heart of Hollywood with stunning city views and celebrity spotting opportunities.',
    images: [
      '/images/hotels/destinations/los-angeles.jpg',
      '/images/hotels/hotels/boutique-garden-1.jpg',
      '/images/hotels/hotels/boutique-garden-2.jpg',
      '/images/hotels/hotels/boutique-garden-3.jpg'
    ],
    amenities: [
      'Free WiFi',
      'Swimming Pool',
      'Fitness Center',
      'Restaurant',
      'Bar',
      'Valet Parking',
      'Concierge Service',
      'Spa & Wellness Center'
    ],
    roomTypes: [
      {
        id: 'hollywood-view',
        name: 'Hollywood View Room',
        description: 'Modern room with panoramic views of the Hollywood Hills',
        size: 320,
        maxGuests: 2,
        bedType: 'King Bed',
        price: 189,
        features: ['City View', 'Mini Bar', 'Balcony', 'Air Conditioning'],
        images: ['/images/hotels/rooms/boutique-garden-standard-room.jpg']
      }
    ],
    rating: 4.3,
    reviewCount: 2847,
    priceFrom: 189,
    freeCancellation: true,
    bookingDeadline: 24
  },
  {
    id: 17,
    name: 'Beverly Hills Grand Hotel',
    starRating: 5,
    address: '9641 Sunset Boulevard, Beverly Hills, Los Angeles, CA 90210',
    city: 'Los Angeles',
    country: 'United States',
    location: {
      latitude: 34.0736,
      longitude: -118.4004,
      district: 'Beverly Hills',
      nearbyLandmarks: ['Rodeo Drive', 'Beverly Hills Hotel', 'Greystone Mansion']
    },
    description: 'Ultra-luxury hotel in exclusive Beverly Hills with world-class shopping and dining.',
    images: [
      '/images/hotels/hotels/grand-luxury-hotel-1.jpg',
      '/images/hotels/hotels/grand-luxury-hotel-2.jpg',
      '/images/hotels/hotels/grand-luxury-hotel-3.jpg',
      '/images/hotels/hotels/grand-luxury-hotel-4.jpg'
    ],
    amenities: [
      'Free WiFi',
      'Swimming Pool',
      'Fitness Center',
      'Restaurant',
      'Bar',
      'Valet Parking',
      'Concierge Service',
      'Spa & Wellness Center',
      '24-hour Room Service',
      'Business Center'
    ],
    roomTypes: [
      {
        id: 'beverly-deluxe',
        name: 'Beverly Deluxe Room',
        description: 'Elegant room with marble bathroom and city views',
        size: 420,
        maxGuests: 2,
        bedType: 'King Bed',
        price: 459,
        features: ['City View', 'Marble Bathroom', 'Premium Linens', 'Work Desk'],
        images: ['/images/hotels/rooms/grand-luxury-deluxe-room.jpg']
      }
    ],
    rating: 4.8,
    reviewCount: 1923,
    priceFrom: 459,
    freeCancellation: true,
    bookingDeadline: 48
  },
  // London Hotels
  {
    id: 18,
    name: 'The London Mayfair',
    starRating: 5,
    address: '12 Berkeley Street, Mayfair, London, W1J 8DY',
    city: 'London',
    country: 'United Kingdom',
    location: {
      latitude: 51.5074,
      longitude: -0.1278,
      district: 'Mayfair',
      nearbyLandmarks: ['Hyde Park', 'Buckingham Palace', 'Oxford Street']
    },
    description: 'Prestigious hotel in the heart of Mayfair, offering traditional British elegance with modern luxury.',
    images: [
      '/images/hotels/hotels/mayfair-palace-1.jpg',
      '/images/hotels/hotels/mayfair-palace-2.jpg',
      '/images/hotels/hotels/mayfair-palace-3.jpg',
      '/images/hotels/hotels/mayfair-palace-4.jpg'
    ],
    amenities: [
      'Free WiFi',
      'Fitness Center',
      'Restaurant',
      'Bar',
      'Concierge Service',
      'Business Center',
      '24-hour Room Service',
      'Spa & Wellness Center',
      'Valet Parking'
    ],
    roomTypes: [
      {
        id: 'mayfair-classic',
        name: 'Mayfair Classic Room',
        description: 'Elegantly furnished room with traditional British decor',
        size: 280,
        maxGuests: 2,
        bedType: 'King Bed',
        price: 329,
        features: ['Park View', 'Mini Bar', 'Work Desk', 'Marble Bathroom'],
        images: ['/images/hotels/rooms/grand-luxury-deluxe-room.jpg']
      }
    ],
    rating: 4.7,
    reviewCount: 3254,
    priceFrom: 329,
    freeCancellation: true,
    bookingDeadline: 24
  },
  {
    id: 19,
    name: 'Tower Bridge Boutique Hotel',
    starRating: 4,
    address: '2 More London Riverside, London, SE1 2DB',
    city: 'London',
    country: 'United Kingdom',
    location: {
      latitude: 51.5045,
      longitude: -0.0865,
      district: 'Southwark',
      nearbyLandmarks: ['Tower Bridge', 'Tower of London', 'London Bridge']
    },
    description: 'Contemporary boutique hotel with stunning views of Tower Bridge and the Thames.',
    images: [
      '/images/hotels/hotels/boutique-garden-1.jpg',
      '/images/hotels/hotels/boutique-garden-2.jpg',
      '/images/hotels/hotels/boutique-garden-3.jpg',
      '/images/hotels/hotels/boutique-garden-4.jpg'
    ],
    amenities: [
      'Free WiFi',
      'Restaurant',
      'Bar',
      'Fitness Center',
      'Business Center',
      'Concierge Service'
    ],
    roomTypes: [
      {
        id: 'bridge-view',
        name: 'Tower Bridge View Room',
        description: 'Modern room with direct views of iconic Tower Bridge',
        size: 250,
        maxGuests: 2,
        bedType: 'Queen Bed',
        price: 189,
        features: ['Bridge View', 'Mini Bar', 'Work Desk', 'Smart TV'],
        images: ['/images/hotels/rooms/boutique-garden-standard-room.jpg']
      }
    ],
    rating: 4.4,
    reviewCount: 1876,
    priceFrom: 189,
    freeCancellation: true,
    bookingDeadline: 12
  },
  // Paris Hotels
  {
    id: 20,
    name: 'Hotel des Champs-Élysées',
    starRating: 5,
    address: '12 Rue Magellan, 8th Arrondissement, Paris, 75008',
    city: 'Paris',
    country: 'France',
    location: {
      latitude: 48.8566,
      longitude: 2.3522,
      district: 'Champs-Élysées',
      nearbyLandmarks: ['Arc de Triomphe', 'Champs-Élysées', 'Louvre Museum']
    },
    description: 'Elegant Parisian hotel steps away from the Arc de Triomphe, offering quintessential French luxury.',
    images: [
      '/images/hotels/destinations/paris.jpg',
      '/images/hotels/hotels/grand-luxury-hotel-2.jpg',
      '/images/hotels/hotels/grand-luxury-hotel-3.jpg',
      '/images/hotels/hotels/grand-luxury-hotel-4.jpg'
    ],
    amenities: [
      'Free WiFi',
      'Restaurant',
      'Bar',
      'Fitness Center',
      'Concierge Service',
      'Business Center',
      '24-hour Room Service',
      'Spa & Wellness Center'
    ],
    roomTypes: [
      {
        id: 'parisian-deluxe',
        name: 'Parisian Deluxe Room',
        description: 'Sophisticated room with French decor and modern amenities',
        size: 300,
        maxGuests: 2,
        bedType: 'King Bed',
        price: 389,
        features: ['City View', 'French Balcony', 'Marble Bathroom', 'Mini Bar'],
        images: ['/images/hotels/rooms/grand-luxury-deluxe-room.jpg']
      }
    ],
    rating: 4.6,
    reviewCount: 2143,
    priceFrom: 389,
    freeCancellation: true,
    bookingDeadline: 24
  },
  // Tokyo Hotels
  {
    id: 21,
    name: 'Tokyo Imperial Palace Hotel',
    starRating: 5,
    address: '1-1-1 Uchisaiwaicho, Chiyoda, Tokyo, 100-8558',
    city: 'Tokyo',
    country: 'Japan',
    location: {
      latitude: 35.6762,
      longitude: 139.6503,
      district: 'Chiyoda',
      nearbyLandmarks: ['Imperial Palace', 'Tokyo Station', 'Ginza']
    },
    description: 'Prestigious hotel overlooking the Imperial Palace Gardens, blending traditional Japanese hospitality with modern luxury.',
    images: [
      '/images/hotels/hotels/tokyo-imperial-1.jpg',
      '/images/hotels/hotels/tokyo-imperial-2.jpg',
      '/images/hotels/hotels/tokyo-imperial-3.jpg',
      '/images/hotels/hotels/tokyo-imperial-4.jpg'
    ],
    amenities: [
      'Free WiFi',
      'Restaurant',
      'Bar',
      'Fitness Center',
      'Spa & Wellness Center',
      'Business Center',
      'Concierge Service',
      'Valet Parking',
      '24-hour Room Service'
    ],
    roomTypes: [
      {
        id: 'imperial-view',
        name: 'Imperial Palace View Room',
        description: 'Luxurious room with serene views of the Imperial Palace Gardens',
        size: 380,
        maxGuests: 2,
        bedType: 'King Bed',
        price: 459,
        features: ['Palace View', 'Japanese Bath', 'Work Desk', 'Premium Amenities'],
        images: ['/images/hotels/rooms/grand-luxury-deluxe-room.jpg']
      }
    ],
    rating: 4.9,
    reviewCount: 1654,
    priceFrom: 459,
    freeCancellation: false,
    bookingDeadline: 48
  },
  // Singapore Hotels
  {
    id: 22,
    name: 'Marina Bay Skyline Hotel',
    starRating: 5,
    address: '10 Bayfront Avenue, Marina Bay, Singapore, 018956',
    city: 'Singapore',
    country: 'Singapore',
    location: {
      latitude: 1.2840,
      longitude: 103.8607,
      district: 'Marina Bay',
      nearbyLandmarks: ['Marina Bay Sands', 'Gardens by the Bay', 'Singapore Flyer']
    },
    description: 'Ultra-modern hotel in Marina Bay with breathtaking skyline views and world-class amenities.',
    images: [
      '/images/hotels/hotels/marina-bay-luxury-1.jpg',
      '/images/hotels/hotels/marina-bay-luxury-2.jpg',
      '/images/hotels/hotels/marina-bay-luxury-3.jpg',
      '/images/hotels/hotels/marina-bay-luxury-4.jpg'
    ],
    amenities: [
      'Free WiFi',
      'Swimming Pool',
      'Fitness Center',
      'Restaurant',
      'Bar',
      'Spa & Wellness Center',
      'Business Center',
      'Concierge Service',
      '24-hour Room Service'
    ],
    roomTypes: [
      {
        id: 'skyline-deluxe',
        name: 'Skyline Deluxe Room',
        description: 'Modern room with spectacular city skyline views',
        size: 350,
        maxGuests: 2,
        bedType: 'King Bed',
        price: 329,
        features: ['Skyline View', 'Floor-to-Ceiling Windows', 'Rain Shower', 'Work Desk'],
        images: ['/images/hotels/rooms/grand-luxury-deluxe-room.jpg']
      }
    ],
    rating: 4.7,
    reviewCount: 2876,
    priceFrom: 329,
    freeCancellation: true,
    bookingDeadline: 24
  },
  // Sydney Hotels
  {
    id: 23,
    name: 'Sydney Harbour Bridge Hotel',
    starRating: 4,
    address: '176 Cumberland Street, The Rocks, Sydney, NSW 2000',
    city: 'Sydney',
    country: 'Australia',
    location: {
      latitude: -33.8688,
      longitude: 151.2093,
      district: 'The Rocks',
      nearbyLandmarks: ['Sydney Harbour Bridge', 'Opera House', 'Circular Quay']
    },
    description: 'Historic hotel in The Rocks with stunning harbour views and easy access to Sydney\'s top attractions.',
    images: [
      '/images/hotels/destinations/sydney.jpg',
      '/images/hotels/hotels/boutique-garden-2.jpg',
      '/images/hotels/hotels/boutique-garden-3.jpg',
      '/images/hotels/hotels/boutique-garden-4.jpg'
    ],
    amenities: [
      'Free WiFi',
      'Restaurant',
      'Bar',
      'Fitness Center',
      'Business Center',
      'Concierge Service'
    ],
    roomTypes: [
      {
        id: 'harbour-view',
        name: 'Harbour View Room',
        description: 'Comfortable room with beautiful views of Sydney Harbour',
        size: 280,
        maxGuests: 2,
        bedType: 'Queen Bed',
        price: 239,
        features: ['Harbour View', 'Mini Bar', 'Work Desk', 'Air Conditioning'],
        images: ['/images/hotels/rooms/boutique-garden-standard-room.jpg']
      }
    ],
    rating: 4.5,
    reviewCount: 1987,
    priceFrom: 239,
    freeCancellation: true,
    bookingDeadline: 12
  },
  // Dubai Hotels
  {
    id: 24,
    name: 'Burj Al Arab Luxury Resort',
    starRating: 5,
    address: 'Jumeirah Street, Dubai, UAE',
    city: 'Dubai',
    country: 'United Arab Emirates',
    location: {
      latitude: 25.1413,
      longitude: 55.1853,
      district: 'Jumeirah',
      nearbyLandmarks: ['Burj Khalifa', 'Dubai Mall', 'Palm Jumeirah']
    },
    description: 'Iconic sail-shaped hotel offering the pinnacle of luxury with breathtaking views of the Arabian Gulf.',
    images: [
      '/images/hotels/hotels/burj-al-arab-1.jpg',
      '/images/hotels/hotels/burj-al-arab-2.jpg',
      '/images/hotels/hotels/burj-al-arab-3.jpg',
      '/images/hotels/hotels/burj-al-arab-4.jpg'
    ],
    amenities: [
      'Free WiFi',
      'Swimming Pool',
      'Fitness Center',
      'Restaurant',
      'Bar',
      'Spa & Wellness Center',
      'Business Center',
      'Concierge Service',
      'Valet Parking',
      '24-hour Room Service',
      'Beach Access'
    ],
    roomTypes: [
      {
        id: 'panoramic-suite',
        name: 'Panoramic Suite',
        description: 'Opulent suite with panoramic views of the Arabian Gulf',
        size: 650,
        maxGuests: 4,
        bedType: 'King Bed',
        price: 899,
        features: ['Ocean View', 'Separate Living Area', 'Butler Service', 'Premium Amenities'],
        images: ['/images/hotels/rooms/grand-luxury-executive-suite.jpg']
      }
    ],
    rating: 4.9,
    reviewCount: 1342,
    priceFrom: 899,
    freeCancellation: false,
    bookingDeadline: 72
  },
  // Bangkok Hotels
  {
    id: 25,
    name: 'Bangkok Royal Palace Hotel',
    starRating: 5,
    address: '123 Siam Road, Pathum Wan, Bangkok, 10330',
    city: 'Bangkok',
    country: 'Thailand',
    location: {
      latitude: 13.7563,
      longitude: 100.5018,
      district: 'Pathum Wan',
      nearbyLandmarks: ['Grand Palace', 'Wat Pho', 'Chatuchak Market']
    },
    description: 'Elegant hotel combining traditional Thai hospitality with modern luxury, near the Grand Palace.',
    images: [
      '/images/hotels/hotels/thai-palace-1.jpg',
      '/images/hotels/hotels/thai-palace-2.jpg',
      '/images/hotels/hotels/thai-palace-3.jpg',
      '/images/hotels/hotels/thai-palace-4.jpg'
    ],
    amenities: [
      'Free WiFi',
      'Swimming Pool',
      'Fitness Center',
      'Restaurant',
      'Bar',
      'Spa & Wellness Center',
      'Business Center',
      'Concierge Service',
      'Airport Shuttle'
    ],
    roomTypes: [
      {
        id: 'thai-deluxe',
        name: 'Thai Deluxe Room',
        description: 'Beautifully decorated room with traditional Thai elements',
        size: 320,
        maxGuests: 2,
        bedType: 'King Bed',
        price: 189,
        features: ['Garden View', 'Thai Decor', 'Mini Bar', 'Work Desk'],
        images: ['/images/hotels/rooms/boutique-garden-standard-room.jpg']
      }
    ],
    rating: 4.6,
    reviewCount: 2543,
    priceFrom: 189,
    freeCancellation: true,
    bookingDeadline: 24
  },
  // =================== SECOND WAVE EXPANSION ===================
  // More New York Hotels with diverse ratings and amenities
  {
    id: 26,
    name: 'Brooklyn Heights Inn',
    starRating: 3,
    address: '60 Remsen Street, Brooklyn Heights, Brooklyn, NY 11201',
    city: 'New York',
    country: 'United States',
    location: {
      latitude: 40.6955,
      longitude: -73.9937,
      district: 'Brooklyn Heights',
      nearbyLandmarks: ['Brooklyn Bridge', 'Brooklyn Heights Promenade', 'Dumbo']
    },
    description: 'Charming boutique inn in historic Brooklyn Heights with classic New York charm and budget-friendly rates.',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80'
    ],
    amenities: [
      'Restaurant',
      'Business Center',
      'Concierge Service'
      // Note: No WiFi, No Parking - adding diversity
    ],
    roomTypes: [
      {
        id: 'brooklyn-standard',
        name: 'Standard Room',
        description: 'Cozy room with classic Brooklyn decor and city views',
        size: 200,
        maxGuests: 2,
        bedType: 'Queen Bed',
        price: 129,
        features: ['City View', 'Air Conditioning', 'Cable TV'],
        images: ['https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80']
      }
    ],
    rating: 3.4,
    reviewCount: 892,
    priceFrom: 129,
    freeCancellation: false,
    bookingDeadline: 6
  },
  {
    id: 27,
    name: 'Queens Business Hotel',
    starRating: 3,
    address: '144-15 Northern Boulevard, Flushing, Queens, NY 11354',
    city: 'New York',
    country: 'United States',
    location: {
      latitude: 40.7614,
      longitude: -73.8370,
      district: 'Flushing',
      nearbyLandmarks: ['Flushing Meadows Park', 'Citi Field', 'JFK Airport']
    },
    description: 'Practical business hotel near JFK Airport with essential amenities for budget-conscious travelers.',
    images: [
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    ],
    amenities: [
      'Free WiFi',
      'Free Parking',
      'Airport Shuttle',
      'Business Center'
      // Note: No pool, no spa - basic amenities only
    ],
    roomTypes: [
      {
        id: 'business-standard',
        name: 'Business Standard Room',
        description: 'Functional room with work desk and fast internet',
        size: 220,
        maxGuests: 2,
        bedType: 'Twin Beds',
        price: 89,
        features: ['Work Desk', 'High-Speed Internet', 'Coffee Maker'],
        images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1958&q=80']
      }
    ],
    rating: 3.1,
    reviewCount: 1247,
    priceFrom: 89,
    freeCancellation: true,
    bookingDeadline: 24
  },
  // Los Angeles diverse hotels
  {
    id: 28,
    name: 'Santa Monica Beach Resort',
    starRating: 4,
    address: '1515 Ocean Avenue, Santa Monica, Los Angeles, CA 90401',
    city: 'Los Angeles',
    country: 'United States',
    location: {
      latitude: 34.0195,
      longitude: -118.4912,
      district: 'Santa Monica',
      nearbyLandmarks: ['Santa Monica Pier', 'Venice Beach', 'Third Street Promenade']
    },
    description: 'Beachfront resort with direct ocean access and California coastal vibes.',
    images: [
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2049&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    ],
    amenities: [
      'Free WiFi',
      'Swimming Pool',
      'Beach Access',
      'Restaurant',
      'Bar',
      'Fitness Center',
      'Spa & Wellness Center'
      // Note: No parking (expensive area)
    ],
    roomTypes: [
      {
        id: 'ocean-view',
        name: 'Ocean View Room',
        description: 'Spacious room with stunning Pacific Ocean views',
        size: 350,
        maxGuests: 3,
        bedType: 'King Bed',
        price: 289,
        features: ['Ocean View', 'Balcony', 'Mini Fridge', 'Beach Access'],
        images: ['https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1957&q=80']
      }
    ],
    rating: 4.2,
    reviewCount: 3456,
    priceFrom: 289,
    freeCancellation: true,
    bookingDeadline: 12
  },
  {
    id: 29,
    name: 'Downtown LA Budget Inn',
    starRating: 2,
    address: '711 South Hope Street, Downtown, Los Angeles, CA 90017',
    city: 'Los Angeles',
    country: 'United States',
    location: {
      latitude: 34.0522,
      longitude: -118.2437,
      district: 'Downtown',
      nearbyLandmarks: ['Staples Center', 'Walt Disney Concert Hall', 'Grand Central Market']
    },
    description: 'No-frills budget accommodation in the heart of downtown LA, perfect for short stays.',
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
      'https://images.unsplash.com/photo-1429117257-3ac88c62ce7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1590073844006-4fe1043d4dfa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1821&q=80'
    ],
    amenities: [
      'Free WiFi',
      'Vending Machines'
      // Note: Very basic amenities, no pool, no restaurant, no parking
    ],
    roomTypes: [
      {
        id: 'budget-standard',
        name: 'Standard Room',
        description: 'Basic room with essential amenities for budget travelers',
        size: 150,
        maxGuests: 2,
        bedType: 'Double Bed',
        price: 65,
        features: ['Air Conditioning', 'Cable TV', 'Private Bathroom'],
        images: ['https://images.unsplash.com/photo-1631049035182-249067d7618e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80']
      }
    ],
    rating: 3.0,
    reviewCount: 654,
    priceFrom: 65,
    freeCancellation: false,
    bookingDeadline: 3
  },
  // London diverse hotels
  {
    id: 30,
    name: 'Camden Market Hostel & Hotel',
    starRating: 3,
    address: '45 Camden High Street, Camden, London, NW1 7JH',
    city: 'London',
    country: 'United Kingdom',
    location: {
      latitude: 51.5392,
      longitude: -0.1426,
      district: 'Camden',
      nearbyLandmarks: ['Camden Market', 'Regent\'s Park', 'London Zoo']
    },
    description: 'Trendy hotel in vibrant Camden with a mix of private rooms and shared accommodations.',
    images: [
      'https://images.unsplash.com/photo-1529290130-4c1dc6973d75?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1578774204375-8ecb08afb7e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    ],
    amenities: [
      'Free WiFi',
      'Restaurant',
      'Bar',
      'Common Kitchen',
      'Luggage Storage'
      // Note: No parking, no pool, no spa (budget-focused)
    ],
    roomTypes: [
      {
        id: 'camden-private',
        name: 'Private Room',
        description: 'Compact private room with modern amenities in trendy Camden',
        size: 180,
        maxGuests: 2,
        bedType: 'Double Bed',
        price: 95,
        features: ['Private Bathroom', 'Desk', 'Storage Lockers'],
        images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1958&q=80']
      }
    ],
    rating: 3.7,
    reviewCount: 1834,
    priceFrom: 95,
    freeCancellation: true,
    bookingDeadline: 24
  },
  {
    id: 31,
    name: 'Canary Wharf Business Center',
    starRating: 4,
    address: '25 Bank Street, Canary Wharf, London, E14 5JP',
    city: 'London',
    country: 'United Kingdom',
    location: {
      latitude: 51.5050,
      longitude: -0.0209,
      district: 'Canary Wharf',
      nearbyLandmarks: ['Canary Wharf', 'The O2', 'Greenwich']
    },
    description: 'Modern business hotel in London\'s financial district with excellent transport links.',
    images: [
      'https://images.unsplash.com/photo-1455587734955-081b22074882?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1549294413-26f195200c16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    ],
    amenities: [
      'Free WiFi',
      'Fitness Center',
      'Business Center',
      'Restaurant',
      'Bar',
      'Concierge Service'
      // Note: No pool, No parking (urban location)
    ],
    roomTypes: [
      {
        id: 'executive-room',
        name: 'Executive Room',
        description: 'Sophisticated business room with city skyline views',
        size: 300,
        maxGuests: 2,
        bedType: 'King Bed',
        price: 195,
        features: ['City View', 'Executive Lounge Access', 'Work Station', 'High-Speed Internet'],
        images: ['https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80']
      }
    ],
    rating: 4.1,
    reviewCount: 2876,
    priceFrom: 195,
    freeCancellation: true,
    bookingDeadline: 48
  },
  // Paris diverse hotels
  {
    id: 32,
    name: 'Montmartre Artists Quarter',
    starRating: 3,
    address: '15 Rue Lepic, Montmartre, Paris, 75018',
    city: 'Paris',
    country: 'France',
    location: {
      latitude: 48.8867,
      longitude: 2.3431,
      district: 'Montmartre',
      nearbyLandmarks: ['Sacré-Cœur', 'Moulin Rouge', 'Place du Tertre']
    },
    description: 'Charming boutique hotel in historic Montmartre with artistic heritage and bohemian atmosphere.',
    images: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1587985064135-0366536eab42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    ],
    amenities: [
      'Restaurant',
      'Bar',
      'Concierge Service',
      'Art Gallery'
      // Note: No WiFi, No parking (old building limitations)
    ],
    roomTypes: [
      {
        id: 'artist-room',
        name: 'Artist Room',
        description: 'Uniquely decorated room with local art and Montmartre views',
        size: 220,
        maxGuests: 2,
        bedType: 'Double Bed',
        price: 145,
        features: ['Montmartre View', 'Local Artwork', 'Antique Furniture'],
        images: ['https://images.unsplash.com/photo-1631049035182-249067d7618e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80']
      }
    ],
    rating: 3.8,
    reviewCount: 1456,
    priceFrom: 145,
    freeCancellation: false,
    bookingDeadline: 12
  },
  // Tokyo diverse hotels
  {
    id: 33,
    name: 'Shibuya Capsule Hotel',
    starRating: 2,
    address: '31-2 Udagawacho, Shibuya, Tokyo, 150-0042',
    city: 'Tokyo',
    country: 'Japan',
    location: {
      latitude: 35.6598,
      longitude: 139.7006,
      district: 'Shibuya',
      nearbyLandmarks: ['Shibuya Crossing', 'Hachiko Statue', 'Center Gai']
    },
    description: 'Modern capsule hotel experience in the heart of Shibuya with high-tech amenities.',
    images: [
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1994&q=80',
      'https://images.unsplash.com/photo-1495365200479-c4ed1d35e1aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1615460549969-36fa19521a4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80'
    ],
    amenities: [
      'Free WiFi',
      'Shared Bathroom',
      'Luggage Storage',
      'Vending Machines',
      'Common Area'
      // Note: No restaurant, no parking, capsule-style accommodation
    ],
    roomTypes: [
      {
        id: 'capsule-pod',
        name: 'Capsule Pod',
        description: 'High-tech sleeping pod with personal entertainment system',
        size: 8,
        maxGuests: 1,
        bedType: 'Single Pod',
        price: 45,
        features: ['Personal TV', 'Climate Control', 'Reading Light', 'Power Outlets'],
        images: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80']
      }
    ],
    rating: 3.5,
    reviewCount: 3421,
    priceFrom: 45,
    freeCancellation: true,
    bookingDeadline: 24
  },
  {
    id: 34,
    name: 'Harajuku Style Hotel',
    starRating: 4,
    address: '6-15-14 Jingumae, Shibuya, Tokyo, 150-0001',
    city: 'Tokyo',
    country: 'Japan',
    location: {
      latitude: 35.6690,
      longitude: 139.7036,
      district: 'Harajuku',
      nearbyLandmarks: ['Takeshita Street', 'Meiji Shrine', 'Omotesando']
    },
    description: 'Stylish boutique hotel celebrating Japanese pop culture and fashion in trendy Harajuku.',
    images: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
      'https://images.unsplash.com/photo-1578774204375-8ecb08afb7e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1958&q=80'
    ],
    amenities: [
      'Free WiFi',
      'Restaurant',
      'Bar',
      'Fitness Center',
      'Business Center',
      'Fashion Boutique'
      // Note: No parking, no pool (urban Tokyo style)
    ],
    roomTypes: [
      {
        id: 'harajuku-deluxe',
        name: 'Harajuku Deluxe Room',
        description: 'Colorful and modern room with Japanese pop culture themes',
        size: 280,
        maxGuests: 2,
        bedType: 'Queen Bed',
        price: 195,
        features: ['Fashion District View', 'Modern Japanese Design', 'Mini Bar', 'Smart TV'],
        images: ['https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80']
      }
    ],
    rating: 4.3,
    reviewCount: 2187,
    priceFrom: 195,
    freeCancellation: true,
    bookingDeadline: 36
  },
  // Singapore diverse hotels
  {
    id: 35,
    name: 'Little India Heritage Hotel',
    starRating: 3,
    address: '48 Serangoon Road, Little India, Singapore, 217959',
    city: 'Singapore',
    country: 'Singapore',
    location: {
      latitude: 1.3067,
      longitude: 103.8518,
      district: 'Little India',
      nearbyLandmarks: ['Sri Veeramakaliamman Temple', 'Tekka Centre', 'Mustafa Centre']
    },
    description: 'Cultural heritage hotel in vibrant Little India with traditional architecture and modern comforts.',
    images: [
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    ],
    amenities: [
      'Free WiFi',
      'Restaurant',
      'Cultural Tours',
      'Heritage Library'
      // Note: No pool, no spa, no parking (heritage building)
    ],
    roomTypes: [
      {
        id: 'heritage-room',
        name: 'Heritage Room',
        description: 'Traditional room with Indian cultural elements and modern amenities',
        size: 240,
        maxGuests: 2,
        bedType: 'King Bed',
        price: 135,
        features: ['Cultural Decor', 'Balcony', 'Mini Fridge', 'Traditional Furniture'],
        images: ['https://images.unsplash.com/photo-1631049035182-249067d7618e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80']
      }
    ],
    rating: 3.9,
    reviewCount: 1543,
    priceFrom: 135,
    freeCancellation: true,
    bookingDeadline: 18
  },
  // =================== THIRD WAVE EXPANSION ===================
  // More Sydney & Dubai hotels
  {
    id: 36,
    name: 'Bondi Beach Backpackers',
    starRating: 2,
    address: '63 Fletcher Street, Bondi Beach, Sydney, NSW 2026',
    city: 'Sydney',
    country: 'Australia',
    location: {
      latitude: -33.8915,
      longitude: 151.2767,
      district: 'Bondi Beach',
      nearbyLandmarks: ['Bondi Beach', 'Bondi to Coogee Walk', 'Icebergs Pool']
    },
    description: 'Budget-friendly hostel just steps from famous Bondi Beach, perfect for surfers and beach lovers.',
    images: [
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2049&q=80',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1429117257-3ac88c62ce7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1590073844006-4fe1043d4dfa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1821&q=80'
    ],
    amenities: [
      'Shared Kitchen',
      'Common Room',
      'Luggage Storage',
      'Beach Access'
      // Note: No WiFi, No parking, No air conditioning - basic backpacker accommodation
    ],
    roomTypes: [
      {
        id: 'dorm-bed',
        name: 'Dorm Bed',
        description: 'Shared dormitory with bunk beds and lockers',
        size: 20,
        maxGuests: 1,
        bedType: 'Bunk Bed',
        price: 35,
        features: ['Shared Bathroom', 'Personal Locker', 'Beach Access'],
        images: ['https://images.unsplash.com/photo-1631049035182-249067d7618e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80']
      }
    ],
    rating: 3.2,
    reviewCount: 782,
    priceFrom: 35,
    freeCancellation: false,
    bookingDeadline: 2
  },
  {
    id: 37,
    name: 'Dubai Marina Heights',
    starRating: 4,
    address: 'The Walk, Dubai Marina, Dubai, UAE',
    city: 'Dubai',
    country: 'United Arab Emirates',
    location: {
      latitude: 25.0657,
      longitude: 55.1713,
      district: 'Dubai Marina',
      nearbyLandmarks: ['Dubai Marina Walk', 'JBR Beach', 'Ain Dubai']
    },
    description: 'Modern apartment-style hotel in Dubai Marina with stunning waterfront views.',
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2049&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    ],
    amenities: [
      'Free WiFi',
      'Swimming Pool',
      'Fitness Center',
      'Restaurant',
      'Marina Access',
      'Balcony'
      // Note: No parking (valet only), no spa
    ],
    roomTypes: [
      {
        id: 'marina-studio',
        name: 'Marina Studio',
        description: 'Modern studio apartment with marina views and kitchenette',
        size: 450,
        maxGuests: 2,
        bedType: 'Queen Bed',
        price: 285,
        features: ['Marina View', 'Kitchenette', 'Balcony', 'Modern Furnishing'],
        images: ['https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80']
      }
    ],
    rating: 4.0,
    reviewCount: 1892,
    priceFrom: 285,
    freeCancellation: true,
    bookingDeadline: 24
  },
  // More Bangkok hotels
  {
    id: 38,
    name: 'Khao San Road Hostel',
    starRating: 2,
    address: '139 Khao San Road, Phra Nakhon, Bangkok, 10200',
    city: 'Bangkok',
    country: 'Thailand',
    location: {
      latitude: 13.7590,
      longitude: 100.4977,
      district: 'Khao San Road',
      nearbyLandmarks: ['Khao San Road', 'Grand Palace', 'Wat Pho']
    },
    description: 'Legendary backpacker hostel in the heart of Bangkok\'s backpacker district.',
    images: [
      'https://images.unsplash.com/photo-1590073844006-4fe1043d4dfa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1821&q=80',
      'https://images.unsplash.com/photo-1429117257-3ac88c62ce7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80'
    ],
    amenities: [
      'Common Area',
      'Tour Desk',
      'Luggage Storage'
      // Note: No WiFi, No air conditioning, No parking - ultra budget
    ],
    roomTypes: [
      {
        id: 'basic-dorm',
        name: 'Basic Dorm',
        description: 'Simple shared dormitory in the heart of backpacker Bangkok',
        size: 15,
        maxGuests: 1,
        bedType: 'Bunk Bed',
        price: 12,
        features: ['Fan Only', 'Shared Bathroom', 'Mosquito Net'],
        images: ['https://images.unsplash.com/photo-1631049035182-249067d7618e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80']
      }
    ],
    rating: 3.1,
    reviewCount: 4356,
    priceFrom: 12,
    freeCancellation: false,
    bookingDeadline: 1
  },
  {
    id: 39,
    name: 'Sukhumvit Business Hotel',
    starRating: 4,
    address: '999 Sukhumvit Road, Watthana, Bangkok, 10110',
    city: 'Bangkok',
    country: 'Thailand',
    location: {
      latitude: 13.7307,
      longitude: 100.5418,
      district: 'Sukhumvit',
      nearbyLandmarks: ['Terminal 21', 'Asok BTS', 'Nana Plaza']
    },
    description: 'Contemporary business hotel on bustling Sukhumvit Road with excellent transport connections.',
    images: [
      'https://images.unsplash.com/photo-1455587734955-081b22074882?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1549294413-26f195200c16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80'
    ],
    amenities: [
      'Free WiFi',
      'Swimming Pool',
      'Fitness Center',
      'Restaurant',
      'Bar',
      'Business Center',
      'BTS Access'
      // Note: No parking (urban area)
    ],
    roomTypes: [
      {
        id: 'sukhumvit-superior',
        name: 'Superior Room',
        description: 'Modern business room with city views and work facilities',
        size: 320,
        maxGuests: 2,
        bedType: 'King Bed',
        price: 156,
        features: ['City View', 'Work Desk', 'Mini Bar', 'High-Speed Internet'],
        images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1958&q=80']
      }
    ],
    rating: 4.1,
    reviewCount: 2134,
    priceFrom: 156,
    freeCancellation: true,
    bookingDeadline: 36
  },
  // Chicago hotels
  {
    id: 40,
    name: 'Chicago Loop Economy Inn',
    starRating: 2,
    address: '640 North Wabash Avenue, Near North Side, Chicago, IL 60611',
    city: 'Chicago',
    country: 'United States',
    location: {
      latitude: 41.8781,
      longitude: -87.6298,
      district: 'Near North Side',
      nearbyLandmarks: ['Millennium Park', 'Navy Pier', 'The Loop']
    },
    description: 'Basic downtown accommodation near Chicago\'s main attractions, ideal for budget travelers.',
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80',
      'https://images.unsplash.com/photo-1590073844006-4fe1043d4dfa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1821&q=80',
      'https://images.unsplash.com/photo-1429117257-3ac88c62ce7a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    ],
    amenities: [
      'Free WiFi',
      '24-hour Front Desk'
      // Note: No parking, no restaurant, no pool - minimal amenities
    ],
    roomTypes: [
      {
        id: 'economy-single',
        name: 'Economy Single',
        description: 'Compact single room with basic amenities in downtown Chicago',
        size: 140,
        maxGuests: 1,
        bedType: 'Single Bed',
        price: 78,
        features: ['City View', 'Private Bathroom', 'Cable TV'],
        images: ['https://images.unsplash.com/photo-1631049035182-249067d7618e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80']
      }
    ],
    rating: 3.0,
    reviewCount: 1456,
    priceFrom: 78,
    freeCancellation: false,
    bookingDeadline: 6
  },
  {
    id: 41,
    name: 'River North Boutique Hotel',
    starRating: 4,
    address: '166 East Superior Street, River North, Chicago, IL 60611',
    city: 'Chicago',
    country: 'United States',
    location: {
      latitude: 41.8955,
      longitude: -87.6214,
      district: 'River North',
      nearbyLandmarks: ['Magnificent Mile', 'Chicago River', 'House of Blues']
    },
    description: 'Stylish boutique hotel in trendy River North with modern amenities and artistic flair.',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1587985064135-0366536eab42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    ],
    amenities: [
      'Free WiFi',
      'Fitness Center',
      'Restaurant',
      'Bar',
      'Business Center',
      'Art Gallery'
      // Note: No pool, No parking (downtown location)
    ],
    roomTypes: [
      {
        id: 'river-view-room',
        name: 'River View Room',
        description: 'Artistic room with Chicago River views and contemporary design',
        size: 290,
        maxGuests: 2,
        bedType: 'Queen Bed',
        price: 198,
        features: ['River View', 'Modern Art', 'Mini Bar', 'Work Station'],
        images: ['https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80']
      }
    ],
    rating: 4.4,
    reviewCount: 1789,
    priceFrom: 198,
    freeCancellation: true,
    bookingDeadline: 48
  },
  // Amsterdam hotels
  {
    id: 42,
    name: 'Amsterdam Canal House',
    starRating: 3,
    address: '148 Prinsengracht, Amsterdam Center, Amsterdam, 1015 EA',
    city: 'Amsterdam',
    country: 'Netherlands',
    location: {
      latitude: 52.3676,
      longitude: 4.8830,
      district: 'Amsterdam Center',
      nearbyLandmarks: ['Anne Frank House', 'Jordaan District', 'Dam Square']
    },
    description: 'Historic canal house hotel with traditional Dutch charm and canal views.',
    images: [
      'https://images.unsplash.com/photo-1587985064135-0366536eab42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    ],
    amenities: [
      'Restaurant',
      'Bar',
      'Bicycle Rental',
      'Concierge Service'
      // Note: No WiFi (old building), No parking (canal location), No elevator
    ],
    roomTypes: [
      {
        id: 'canal-view',
        name: 'Canal View Room',
        description: 'Traditional Dutch room with authentic canal views',
        size: 200,
        maxGuests: 2,
        bedType: 'Double Bed',
        price: 175,
        features: ['Canal View', 'Historic Architecture', 'Traditional Furnishing'],
        images: ['https://images.unsplash.com/photo-1631049035182-249067d7618e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80']
      }
    ],
    rating: 3.6,
    reviewCount: 2145,
    priceFrom: 175,
    freeCancellation: false,
    bookingDeadline: 14
  }
];

// Hotel chains/brands
export const hotelChains = [
  { code: 'MARRIOTT', name: 'Marriott Hotels' },
  { code: 'HILTON', name: 'Hilton Hotels' },
  { code: 'HYATT', name: 'Hyatt Hotels' },
  { code: 'IHG', name: 'InterContinental Hotels Group' },
  { code: 'ACCOR', name: 'Accor Hotels' },
  { code: 'INDEPENDENT', name: 'Independent Hotels' }
];

// Popular destinations
export const destinations = [
  { 
    code: 'NYC', 
    name: 'New York City', 
    country: 'United States',
    hotels: staticHotelData.filter(h => h.city === 'New York').length 
  },
  { 
    code: 'SFO', 
    name: 'San Francisco', 
    country: 'United States',
    hotels: staticHotelData.filter(h => h.city === 'San Francisco').length 
  },
  { 
    code: 'MIA', 
    name: 'Miami', 
    country: 'United States',
    hotels: staticHotelData.filter(h => h.city === 'Miami').length 
  },
  { 
    code: 'BOS', 
    name: 'Boston', 
    country: 'United States',
    hotels: staticHotelData.filter(h => h.city === 'Boston').length 
  },
  { 
    code: 'ASE', 
    name: 'Aspen', 
    country: 'United States',
    hotels: staticHotelData.filter(h => h.city === 'Aspen').length 
  },
  { 
    code: 'CHI', 
    name: 'Chicago', 
    country: 'United States',
    hotels: staticHotelData.filter(h => h.city === 'Chicago').length 
  },
  { 
    code: 'LAX', 
    name: 'Los Angeles', 
    country: 'United States',
    hotels: staticHotelData.filter(h => h.city === 'Los Angeles').length 
  },
  { 
    code: 'LAS', 
    name: 'Las Vegas', 
    country: 'United States',
    hotels: staticHotelData.filter(h => h.city === 'Las Vegas').length 
  },
  { 
    code: 'SEA', 
    name: 'Seattle', 
    country: 'United States',
    hotels: staticHotelData.filter(h => h.city === 'Seattle').length 
  },
  // New expanded destinations
  { 
    code: 'LAX', 
    name: 'Los Angeles', 
    country: 'United States',
    hotels: staticHotelData.filter(h => h.city === 'Los Angeles').length 
  },
  { 
    code: 'LON', 
    name: 'London', 
    country: 'United Kingdom',
    hotels: staticHotelData.filter(h => h.city === 'London').length 
  },
  { 
    code: 'PAR', 
    name: 'Paris', 
    country: 'France',
    hotels: staticHotelData.filter(h => h.city === 'Paris').length 
  },
  { 
    code: 'TYO', 
    name: 'Tokyo', 
    country: 'Japan',
    hotels: staticHotelData.filter(h => h.city === 'Tokyo').length 
  },
  { 
    code: 'SIN', 
    name: 'Singapore', 
    country: 'Singapore',
    hotels: staticHotelData.filter(h => h.city === 'Singapore').length 
  },
  { 
    code: 'SYD', 
    name: 'Sydney', 
    country: 'Australia',
    hotels: staticHotelData.filter(h => h.city === 'Sydney').length 
  },
  { 
    code: 'DXB', 
    name: 'Dubai', 
    country: 'United Arab Emirates',
    hotels: staticHotelData.filter(h => h.city === 'Dubai').length 
  },
  { 
    code: 'BKK', 
    name: 'Bangkok', 
    country: 'Thailand',
    hotels: staticHotelData.filter(h => h.city === 'Bangkok').length 
  },
  { 
    code: 'CHI', 
    name: 'Chicago', 
    country: 'United States',
    hotels: staticHotelData.filter(h => h.city === 'Chicago').length 
  },
  { 
    code: 'AMS', 
    name: 'Amsterdam', 
    country: 'Netherlands',
    hotels: staticHotelData.filter(h => h.city === 'Amsterdam').length 
  }
];

// Room types
export const roomTypes = [
  { id: 'standard', name: 'Standard Room' },
  { id: 'deluxe', name: 'Deluxe Room' },
  { id: 'suite', name: 'Suite' },
  { id: 'executive', name: 'Executive Room' },
  { id: 'presidential', name: 'Presidential Suite' }
];

// Amenities
export const amenities = [
  'Free WiFi',
  'Swimming Pool',
  'Fitness Center',
  'Spa & Wellness Center',
  'Restaurant',
  'Bar',
  '24-hour Room Service',
  'Business Center',
  'Concierge Service',
  'Valet Parking',
  'Airport Shuttle',
  'Pet Friendly',
  'Beach Access',
  'Ski Access',
  'Kids Club',
  'Meeting Rooms'
];

// Star ratings
export const starRatings = [
  { value: 1, label: '1 Star' },
  { value: 2, label: '2 Stars' },
  { value: 3, label: '3 Stars' },
  { value: 4, label: '4 Stars' },
  { value: 5, label: '5 Stars' }
];

export default staticHotelData; 