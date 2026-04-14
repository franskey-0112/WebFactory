// Food categories
const categories = [
  { id: 'breakfast', name: 'Breakfast', icon: '🥞', color: 'bg-yellow-100' },
  { id: 'coffee', name: 'Coffee', icon: '☕', color: 'bg-amber-100' },
  { id: 'fast-food', name: 'Fast Food', icon: '🍟', color: 'bg-red-100' },
  { id: 'burgers', name: 'Burgers', icon: '🍔', color: 'bg-orange-100' },
  { id: 'mexican', name: 'Mexican', icon: '🌮', color: 'bg-green-100' },
  { id: 'sandwiches', name: 'Sandwiches', icon: '🥪', color: 'bg-blue-100' },
  { id: 'pizza', name: 'Pizza', icon: '🍕', color: 'bg-red-100' },
  { id: 'healthy', name: 'Healthy', icon: '🥗', color: 'bg-green-100' },
  { id: 'asian', name: 'Asian', icon: '🍜', color: 'bg-yellow-100' },
  { id: 'chicken', name: 'Chicken', icon: '🍗', color: 'bg-orange-100' },
  { id: 'desserts', name: 'Desserts', icon: '🍰', color: 'bg-pink-100' },
  { id: 'salad', name: 'Salad', icon: '🥬', color: 'bg-green-100' },
  { id: 'soup', name: 'Soup', icon: '🍲', color: 'bg-orange-100' },
  { id: 'chinese', name: 'Chinese', icon: '🥡', color: 'bg-red-100' },
  { id: 'smoothies', name: 'Smoothies', icon: '🥤', color: 'bg-purple-100' },
  { id: 'italian', name: 'Italian', icon: '🍝', color: 'bg-red-100' },
  { id: 'sushi', name: 'Sushi', icon: '🍣', color: 'bg-blue-100' },
  { id: 'bbq', name: 'BBQ', icon: '🍖', color: 'bg-red-100' },
  { id: 'thai', name: 'Thai', icon: '🌶️', color: 'bg-orange-100' },
  { id: 'greek', name: 'Greek', icon: '🫒', color: 'bg-blue-100' },
  { id: 'french', name: 'French', icon: '🥐', color: 'bg-yellow-100' },
  { id: 'indian', name: 'Indian', icon: '🍛', color: 'bg-orange-100' },
  { id: 'vegan', name: 'Vegan', icon: '🌱', color: 'bg-green-100' },
  { id: 'steakhouse', name: 'Steakhouse', icon: '🥩', color: 'bg-red-100' },
  { id: 'korean', name: 'Korean', icon: '🥢', color: 'bg-purple-100' }
];

// Delivery areas
const deliveryAreas = [
  'Downtown', 'Midtown', 'Uptown', 'East Side', 'West Side', 'North End', 'South Bay',
  'Financial District', 'Arts District', 'University Area', 'Medical Center',
  'Airport Area', 'Marina District', 'Historic District', 'Tech Campus'
];

// Restaurants
const restaurants = [
  {
    id: 'burger-den',
    name: 'The Burger Den',
    image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?w=600&h=400&fit=crop',
    logo: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?w=100&h=100&fit=crop',
    rating: 4.5,
    reviewCount: 1200,
    categories: ['burgers', 'fast-food'],
    deliveryTime: '25-40 min',
    deliveryFee: 2.99,
    minimumOrder: 15.00,
    description: 'Gourmet burgers made with premium ingredients and served with crispy fries.',
    address: '123 Main St, Downtown',
    phone: '(555) 123-4567',
    isOpen: true,
    hours: {
      monday: '11:00 AM - 10:00 PM',
      tuesday: '11:00 AM - 10:00 PM',
      wednesday: '11:00 AM - 10:00 PM',
      thursday: '11:00 AM - 10:00 PM',
      friday: '11:00 AM - 11:00 PM',
      saturday: '11:00 AM - 11:00 PM',
      sunday: '12:00 PM - 9:00 PM'
    },
    promo: null,
    featured: true
  },
  {
    id: 'pizza-palace',
    name: 'Pizza Palace',
    image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?w=600&h=400&fit=crop',
    logo: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?w=100&h=100&fit=crop',
    rating: 4.7,
    reviewCount: 2100,
    categories: ['pizza', 'italian'],
    deliveryTime: '20-35 min',
    deliveryFee: 1.99,
    minimumOrder: 12.00,
    description: 'Authentic wood-fired pizzas with fresh ingredients and traditional recipes.',
    address: '456 Oak Ave, Midtown',
    phone: '(555) 234-5678',
    isOpen: true,
    hours: {
      monday: '11:00 AM - 11:00 PM',
      tuesday: '11:00 AM - 11:00 PM',
      wednesday: '11:00 AM - 11:00 PM',
      thursday: '11:00 AM - 11:00 PM',
      friday: '11:00 AM - 12:00 AM',
      saturday: '11:00 AM - 12:00 AM',
      sunday: '12:00 PM - 10:00 PM'
    },
    promo: '25% off $25+',
    featured: true
  },
  {
    id: 'taco-fiesta',
    name: 'Taco Fiesta',
    image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?w=600&h=400&fit=crop',
    logo: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?w=100&h=100&fit=crop',
    rating: 4.3,
    reviewCount: 850,
    categories: ['mexican', 'fast-food'],
    deliveryTime: '15-30 min',
    deliveryFee: 2.49,
    minimumOrder: 10.00,
    description: 'Fresh Mexican cuisine with authentic flavors and generous portions.',
    address: '789 Elm St, East Side',
    phone: '(555) 345-6789',
    isOpen: true,
    hours: {
      monday: '10:00 AM - 10:00 PM',
      tuesday: '10:00 AM - 10:00 PM',
      wednesday: '10:00 AM - 10:00 PM',
      thursday: '10:00 AM - 10:00 PM',
      friday: '10:00 AM - 11:00 PM',
      saturday: '10:00 AM - 11:00 PM',
      sunday: '11:00 AM - 9:00 PM'
    },
    promo: null,
    featured: false
  },
  {
    id: 'healthy-bowls',
    name: 'Healthy Bowls Co.',
    image: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?w=600&h=400&fit=crop',
    logo: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?w=100&h=100&fit=crop',
    rating: 4.6,
    reviewCount: 950,
    categories: ['healthy', 'salad'],
    deliveryTime: '20-35 min',
    deliveryFee: 2.99,
    minimumOrder: 15.00,
    description: 'Nutritious bowls packed with fresh vegetables, proteins, and superfoods.',
    address: '321 Pine St, University Area',
    phone: '(555) 456-7890',
    isOpen: true,
    hours: {
      monday: '8:00 AM - 9:00 PM',
      tuesday: '8:00 AM - 9:00 PM',
      wednesday: '8:00 AM - 9:00 PM',
      thursday: '8:00 AM - 9:00 PM',
      friday: '8:00 AM - 9:00 PM',
      saturday: '9:00 AM - 9:00 PM',
      sunday: '9:00 AM - 8:00 PM'
    },
    promo: null,
    featured: true
  },
  {
    id: 'coffee-corner',
    name: 'Coffee Corner',
    image: 'https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg?w=600&h=400&fit=crop',
    logo: 'https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg?w=100&h=100&fit=crop',
    rating: 4.4,
    reviewCount: 650,
    categories: ['coffee', 'breakfast'],
    deliveryTime: '10-25 min',
    deliveryFee: 1.49,
    minimumOrder: 8.00,
    description: 'Artisan coffee and fresh pastries for your morning boost.',
    address: '654 Maple Ave, Downtown',
    phone: '(555) 567-8901',
    isOpen: true,
    hours: {
      monday: '6:00 AM - 6:00 PM',
      tuesday: '6:00 AM - 6:00 PM',
      wednesday: '6:00 AM - 6:00 PM',
      thursday: '6:00 AM - 6:00 PM',
      friday: '6:00 AM - 7:00 PM',
      saturday: '7:00 AM - 7:00 PM',
      sunday: '7:00 AM - 5:00 PM'
    },
    promo: '$3 off $22+',
    featured: false
  },
  {
    id: 'asian-express',
    name: 'Asian Express',
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?w=600&h=400&fit=crop',
    logo: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?w=100&h=100&fit=crop',
    rating: 4.2,
    reviewCount: 1100,
    categories: ['asian', 'chinese'],
    deliveryTime: '25-40 min',
    deliveryFee: 2.49,
    minimumOrder: 18.00,
    description: 'Authentic Asian cuisine with a modern twist and bold flavors.',
    address: '987 Cedar Blvd, West Side',
    phone: '(555) 678-9012',
    isOpen: true,
    hours: {
      monday: '11:30 AM - 9:30 PM',
      tuesday: '11:30 AM - 9:30 PM',
      wednesday: '11:30 AM - 9:30 PM',
      thursday: '11:30 AM - 9:30 PM',
      friday: '11:30 AM - 10:00 PM',
      saturday: '11:30 AM - 10:00 PM',
      sunday: '12:00 PM - 9:00 PM'
    },
    promo: null,
    featured: true
  },
  {
    id: 'sandwich-shop',
    name: 'The Sandwich Shop',
    image: 'https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?w=600&h=400&fit=crop',
    logo: 'https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?w=100&h=100&fit=crop',
    rating: 4.1,
    reviewCount: 750,
    categories: ['sandwiches', 'fast-food'],
    deliveryTime: '15-30 min',
    deliveryFee: 1.99,
    minimumOrder: 12.00,
    description: 'Gourmet sandwiches made with premium meats and fresh ingredients.',
    address: '159 Birch St, North End',
    phone: '(555) 789-0123',
    isOpen: true,
    hours: {
      monday: '10:00 AM - 8:00 PM',
      tuesday: '10:00 AM - 8:00 PM',
      wednesday: '10:00 AM - 8:00 PM',
      thursday: '10:00 AM - 8:00 PM',
      friday: '10:00 AM - 9:00 PM',
      saturday: '10:00 AM - 9:00 PM',
      sunday: '11:00 AM - 7:00 PM'
    },
    promo: null,
    featured: false
  },
  {
    id: 'chicken-coop',
    name: 'The Chicken Coop',
    image: 'https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?w=600&h=400&fit=crop',
    logo: 'https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?w=100&h=100&fit=crop',
    rating: 4.5,
    reviewCount: 1350,
    categories: ['chicken', 'fast-food'],
    deliveryTime: '20-35 min',
    deliveryFee: 2.99,
    minimumOrder: 15.00,
    description: 'Crispy fried chicken and southern comfort food favorites.',
    address: '753 Spruce Ave, South Bay',
    phone: '(555) 890-1234',
    isOpen: true,
    hours: {
      monday: '11:00 AM - 10:00 PM',
      tuesday: '11:00 AM - 10:00 PM',
      wednesday: '11:00 AM - 10:00 PM',
      thursday: '11:00 AM - 10:00 PM',
      friday: '11:00 AM - 11:00 PM',
      saturday: '11:00 AM - 11:00 PM',
      sunday: '12:00 PM - 9:00 PM'
    },
    promo: null,
    featured: true
  },
  {
    id: 'sweet-treats',
    name: 'Sweet Treats Bakery',
    image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?w=600&h=400&fit=crop',
    logo: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?w=100&h=100&fit=crop',
    rating: 4.8,
    reviewCount: 480,
    categories: ['desserts'],
    deliveryTime: '15-30 min',
    deliveryFee: 1.99,
    minimumOrder: 10.00,
    description: 'Artisan pastries, cakes, and desserts made fresh daily.',
    address: '852 Willow Dr, Arts District',
    phone: '(555) 901-2345',
    isOpen: true,
    hours: {
      monday: '7:00 AM - 8:00 PM',
      tuesday: '7:00 AM - 8:00 PM',
      wednesday: '7:00 AM - 8:00 PM',
      thursday: '7:00 AM - 8:00 PM',
      friday: '7:00 AM - 9:00 PM',
      saturday: '7:00 AM - 9:00 PM',
      sunday: '8:00 AM - 7:00 PM'
    },
    promo: null,
    featured: false
  },
  {
    id: 'smoothie-bar',
    name: 'Green Smoothie Bar',
    image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=600&h=400&fit=crop',
    logo: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=100&h=100&fit=crop',
    rating: 4.3,
    reviewCount: 320,
    categories: ['smoothies', 'healthy'],
    deliveryTime: '10-20 min',
    deliveryFee: 1.99,
    minimumOrder: 8.00,
    description: 'Fresh fruit smoothies, protein shakes, and healthy beverages.',
    address: '951 Poplar St, Medical Center',
    phone: '(555) 012-3456',
    isOpen: true,
    hours: {
      monday: '6:00 AM - 7:00 PM',
      tuesday: '6:00 AM - 7:00 PM',
      wednesday: '6:00 AM - 7:00 PM',
      thursday: '6:00 AM - 7:00 PM',
      friday: '6:00 AM - 8:00 PM',
      saturday: '7:00 AM - 8:00 PM',
      sunday: '7:00 AM - 6:00 PM'
    },
    promo: null,
    featured: false
  },
  {
    id: 'italian-corner',
    name: 'Italian Corner',
    image: 'https://images.pexels.com/photos/410648/pexels-photo-410648.jpeg?w=600&h=400&fit=crop',
    logo: 'https://images.pexels.com/photos/410648/pexels-photo-410648.jpeg?w=100&h=100&fit=crop',
    rating: 4.6,
    reviewCount: 890,
    categories: ['italian', 'pasta'],
    deliveryTime: '30-45 min',
    deliveryFee: 3.49,
    minimumOrder: 20.00,
    description: 'Authentic Italian cuisine with handmade pasta and traditional recipes.',
    address: '741 Vine St, Little Italy',
    phone: '(555) 123-4567',
    isOpen: true,
    hours: {
      monday: '11:00 AM - 10:00 PM',
      tuesday: '11:00 AM - 10:00 PM',
      wednesday: '11:00 AM - 10:00 PM',
      thursday: '11:00 AM - 10:00 PM',
      friday: '11:00 AM - 11:00 PM',
      saturday: '11:00 AM - 11:00 PM',
      sunday: '12:00 PM - 9:00 PM'
    },
    promo: '20% off $30+',
    featured: true
  },
  {
    id: 'sushi-zen',
    name: 'Sushi Zen',
    image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?w=600&h=400&fit=crop',
    logo: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?w=100&h=100&fit=crop',
    rating: 4.8,
    reviewCount: 1200,
    categories: ['sushi', 'japanese'],
    deliveryTime: '35-50 min',
    deliveryFee: 4.99,
    minimumOrder: 25.00,
    description: 'Fresh sushi and Japanese cuisine prepared by master chefs.',
    address: '852 Ocean Ave, Japantown',
    phone: '(555) 234-5678',
    isOpen: true,
    hours: {
      monday: '5:00 PM - 10:00 PM',
      tuesday: '5:00 PM - 10:00 PM',
      wednesday: '5:00 PM - 10:00 PM',
      thursday: '5:00 PM - 10:00 PM',
      friday: '5:00 PM - 11:00 PM',
      saturday: '12:00 PM - 11:00 PM',
      sunday: '12:00 PM - 9:00 PM'
    },
    promo: null,
    featured: true
  },
  {
    id: 'bbq-smokehouse',
    name: 'BBQ Smokehouse',
    image: 'https://images.pexels.com/photos/323682/pexels-photo-323682.jpeg?w=600&h=400&fit=crop',
    logo: 'https://images.pexels.com/photos/323682/pexels-photo-323682.jpeg?w=100&h=100&fit=crop',
    rating: 4.4,
    reviewCount: 750,
    categories: ['bbq', 'american'],
    deliveryTime: '25-40 min',
    deliveryFee: 2.99,
    minimumOrder: 18.00,
    description: 'Slow-smoked BBQ with authentic Southern flavors and homemade sauces.',
    address: '963 Smoke Trail, BBQ District',
    phone: '(555) 345-6789',
    isOpen: true,
    hours: {
      monday: '11:00 AM - 9:00 PM',
      tuesday: '11:00 AM - 9:00 PM',
      wednesday: '11:00 AM - 9:00 PM',
      thursday: '11:00 AM - 9:00 PM',
      friday: '11:00 AM - 10:00 PM',
      saturday: '11:00 AM - 10:00 PM',
      sunday: '12:00 PM - 8:00 PM'
    },
    promo: null,
    featured: false
  },
  {
    id: 'thai-spice',
    name: 'Thai Spice Garden',
    image: 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?w=600&h=400&fit=crop',
    logo: 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?w=100&h=100&fit=crop',
    rating: 4.5,
    reviewCount: 680,
    categories: ['thai', 'asian'],
    deliveryTime: '20-35 min',
    deliveryFee: 2.49,
    minimumOrder: 16.00,
    description: 'Authentic Thai cuisine with traditional spices and fresh ingredients.',
    address: '147 Spice Rd, Thai Village',
    phone: '(555) 456-7890',
    isOpen: true,
    hours: {
      monday: '11:30 AM - 9:30 PM',
      tuesday: '11:30 AM - 9:30 PM',
      wednesday: '11:30 AM - 9:30 PM',
      thursday: '11:30 AM - 9:30 PM',
      friday: '11:30 AM - 10:00 PM',
      saturday: '11:30 AM - 10:00 PM',
      sunday: '12:00 PM - 9:00 PM'
    },
    promo: '15% off $35+',
    featured: true
  },
  {
    id: 'greek-corner',
    name: 'Mediterranean Greek',
    image: 'https://images.pexels.com/photos/1213710/pexels-photo-1213710.jpeg?w=600&h=400&fit=crop',
    logo: 'https://images.pexels.com/photos/1213710/pexels-photo-1213710.jpeg?w=100&h=100&fit=crop',
    rating: 4.3,
    reviewCount: 540,
    categories: ['greek', 'mediterranean'],
    deliveryTime: '25-40 min',
    deliveryFee: 3.49,
    minimumOrder: 17.00,
    description: 'Fresh Mediterranean cuisine with authentic Greek flavors and ingredients.',
    address: '258 Olive St, Greek Quarter',
    phone: '(555) 567-8901',
    isOpen: true,
    hours: {
      monday: '11:00 AM - 9:00 PM',
      tuesday: '11:00 AM - 9:00 PM',
      wednesday: '11:00 AM - 9:00 PM',
      thursday: '11:00 AM - 9:00 PM',
      friday: '11:00 AM - 10:00 PM',
      saturday: '11:00 AM - 10:00 PM',
      sunday: '12:00 PM - 8:00 PM'
    },
    promo: null,
    featured: false
  },
  {
    id: 'french-bistro',
    name: 'Le Petit Bistro',
    image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?w=600&h=400&fit=crop',
    logo: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?w=100&h=100&fit=crop',
    rating: 4.7,
    reviewCount: 430,
    categories: ['french', 'european'],
    deliveryTime: '40-55 min',
    deliveryFee: 4.99,
    minimumOrder: 30.00,
    description: 'Elegant French cuisine with traditional recipes and fine dining experience.',
    address: '369 Rue de Paris, French Quarter',
    phone: '(555) 678-9012',
    isOpen: true,
    hours: {
      monday: 'Closed',
      tuesday: '5:00 PM - 10:00 PM',
      wednesday: '5:00 PM - 10:00 PM',
      thursday: '5:00 PM - 10:00 PM',
      friday: '5:00 PM - 11:00 PM',
      saturday: '5:00 PM - 11:00 PM',
      sunday: '5:00 PM - 9:00 PM'
    },
    promo: null,
    featured: true
  },
  {
    id: 'indian-palace',
    name: 'Spice Palace Indian',
    image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?w=600&h=400&fit=crop',
    logo: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?w=100&h=100&fit=crop',
    rating: 4.4,
    reviewCount: 920,
    categories: ['indian', 'curry'],
    deliveryTime: '30-45 min',
    deliveryFee: 2.99,
    minimumOrder: 19.00,
    description: 'Authentic Indian cuisine with aromatic spices and traditional cooking methods.',
    address: '741 Curry Lane, Little India',
    phone: '(555) 789-0123',
    isOpen: true,
    hours: {
      monday: '11:30 AM - 9:30 PM',
      tuesday: '11:30 AM - 9:30 PM',
      wednesday: '11:30 AM - 9:30 PM',
      thursday: '11:30 AM - 9:30 PM',
      friday: '11:30 AM - 10:00 PM',
      saturday: '11:30 AM - 10:00 PM',
      sunday: '12:00 PM - 9:00 PM'
    },
    promo: '25% off $40+',
    featured: false
  },
  {
    id: 'vegan-garden',
    name: 'Green Vegan Garden',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?w=600&h=400&fit=crop',
    logo: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?w=100&h=100&fit=crop',
    rating: 4.6,
    reviewCount: 380,
    categories: ['vegan', 'healthy'],
    deliveryTime: '20-35 min',
    deliveryFee: 2.49,
    minimumOrder: 14.00,
    description: 'Plant-based cuisine with organic ingredients and creative vegan alternatives.',
    address: '456 Green St, Eco District',
    phone: '(555) 890-1234',
    isOpen: true,
    hours: {
      monday: '8:00 AM - 8:00 PM',
      tuesday: '8:00 AM - 8:00 PM',
      wednesday: '8:00 AM - 8:00 PM',
      thursday: '8:00 AM - 8:00 PM',
      friday: '8:00 AM - 9:00 PM',
      saturday: '8:00 AM - 9:00 PM',
      sunday: '9:00 AM - 7:00 PM'
    },
    promo: null,
    featured: true
  },
  {
    id: 'steakhouse-prime',
    name: 'Prime Cut Steakhouse',
    image: 'https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg?w=600&h=400&fit=crop',
    logo: 'https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg?w=100&h=100&fit=crop',
    rating: 4.8,
    reviewCount: 650,
    categories: ['steakhouse', 'american'],
    deliveryTime: '35-50 min',
    deliveryFee: 5.99,
    minimumOrder: 35.00,
    description: 'Premium steaks and fine dining experience with aged beef and classic sides.',
    address: '789 Prime Ave, Steakhouse Row',
    phone: '(555) 901-2345',
    isOpen: true,
    hours: {
      monday: '5:00 PM - 10:00 PM',
      tuesday: '5:00 PM - 10:00 PM',
      wednesday: '5:00 PM - 10:00 PM',
      thursday: '5:00 PM - 10:00 PM',
      friday: '5:00 PM - 11:00 PM',
      saturday: '5:00 PM - 11:00 PM',
      sunday: '5:00 PM - 9:00 PM'
    },
    promo: null,
    featured: false
  },
  {
    id: 'korean-bbq',
    name: 'Seoul Korean BBQ',
    image: 'https://images.pexels.com/photos/2313686/pexels-photo-2313686.jpeg?w=600&h=400&fit=crop',
    logo: 'https://images.pexels.com/photos/2313686/pexels-photo-2313686.jpeg?w=100&h=100&fit=crop',
    rating: 4.5,
    reviewCount: 780,
    categories: ['korean', 'bbq'],
    deliveryTime: '25-40 min',
    deliveryFee: 3.49,
    minimumOrder: 22.00,
    description: 'Authentic Korean BBQ with marinated meats and traditional side dishes.',
    address: '159 Seoul St, Koreatown',
    phone: '(555) 012-3456',
    isOpen: true,
    hours: {
      monday: '11:30 AM - 9:30 PM',
      tuesday: '11:30 AM - 9:30 PM',
      wednesday: '11:30 AM - 9:30 PM',
      thursday: '11:30 AM - 9:30 PM',
      friday: '11:30 AM - 10:30 PM',
      saturday: '11:30 AM - 10:30 PM',
      sunday: '12:00 PM - 9:00 PM'
    },
    promo: '30% off $50+',
    featured: true
  }
];

// Menu items for each restaurant
const menuItems = {
  'burger-den': [
    {
      id: 'classic-burger',
      name: 'Classic Cheeseburger',
      description: 'Juicy beef patty with cheese, lettuce, tomato, and special sauce',
      price: 12.99,
      image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?w=400&h=300&fit=crop',
      category: 'Burgers',
      popular: true,
      customizations: [
        { name: 'Cheese', options: ['American', 'Cheddar', 'Swiss'], extra: 0 },
        { name: 'Add Bacon', price: 2.00 },
        { name: 'Extra Patty', price: 4.00 }
      ]
    },
    {
      id: 'bbq-burger',
      name: 'BBQ Bacon Burger',
      description: 'Beef patty with BBQ sauce, bacon, onion rings, and cheddar cheese',
      price: 14.99,
      image: 'https://images.pexels.com/photos/552056/pexels-photo-552056.jpeg?w=400&h=300&fit=crop',
      category: 'Burgers',
      popular: false
    },
    {
      id: 'crispy-fries',
      name: 'Crispy French Fries',
      description: 'Golden crispy fries seasoned with sea salt',
      price: 4.99,
      image: 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?w=400&h=300&fit=crop',
      category: 'Sides'
    },
    {
      id: 'chocolate-shake',
      name: 'Chocolate Milkshake',
      description: 'Thick and creamy chocolate milkshake topped with whipped cream',
      price: 5.99,
      image: 'https://images.pexels.com/photos/1337825/pexels-photo-1337825.jpeg?w=400&h=300&fit=crop',
      category: 'Beverages',
      sizes: [
        { name: 'Small (12 oz)', price: 5.99 },
        { name: 'Medium (16 oz)', price: 6.99 },
        { name: 'Large (20 oz)', price: 7.99 }
      ]
    }
  ],
  'pizza-palace': [
    {
      id: 'margherita-pizza',
      name: 'Margherita Pizza',
      description: 'Fresh mozzarella, tomato sauce, and basil on wood-fired crust',
      price: 16.99,
      image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?w=400&h=300&fit=crop',
      category: 'Pizza',
      popular: true,
      sizes: [
        { name: 'Small (10")', price: 16.99 },
        { name: 'Medium (12")', price: 19.99 },
        { name: 'Large (14")', price: 22.99 }
      ]
    },
    {
      id: 'pepperoni-pizza',
      name: 'Pepperoni Pizza',
      description: 'Classic pepperoni with mozzarella cheese and tomato sauce',
      price: 18.99,
      image: 'https://images.pexels.com/photos/263041/pexels-photo-263041.jpeg?w=400&h=300&fit=crop',
      category: 'Pizza',
      popular: true,
      sizes: [
        { name: 'Small (10")', price: 18.99 },
        { name: 'Medium (12")', price: 21.99 },
        { name: 'Large (14")', price: 24.99 }
      ]
    },
    {
      id: 'caesar-salad',
      name: 'Caesar Salad',
      description: 'Crisp romaine lettuce with parmesan cheese and croutons',
      price: 8.99,
      image: 'https://images.pexels.com/photos/257816/pexels-photo-257816.jpeg?w=400&h=300&fit=crop',
      category: 'Salads'
    },
    {
      id: 'garlic-bread',
      name: 'Garlic Bread',
      description: 'Fresh baked bread with garlic butter and herbs',
      price: 6.99,
      image: 'https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?w=400&h=300&fit=crop',
      category: 'Appetizers'
    }
  ],
  'taco-fiesta': [
    {
      id: 'chicken-tacos',
      name: 'Grilled Chicken Tacos',
      description: 'Three soft tacos with grilled chicken, onions, and cilantro',
      price: 9.99,
      image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?w=400&h=300&fit=crop',
      category: 'Tacos',
      popular: true
    },
    {
      id: 'beef-burrito',
      name: 'Beef Burrito',
      description: 'Large flour tortilla filled with seasoned beef, rice, and beans',
      price: 11.99,
      image: 'https://images.pexels.com/photos/7613568/pexels-photo-7613568.jpeg?w=400&h=300&fit=crop',
      category: 'Burritos',
      popular: false
    },
    {
      id: 'guacamole',
      name: 'Fresh Guacamole',
      description: 'House-made guacamole with tortilla chips',
      price: 6.99,
      image: 'https://images.pexels.com/photos/2871757/pexels-photo-2871757.jpeg?w=400&h=300&fit=crop',
      category: 'Appetizers'
    },
    {
      id: 'carnitas-tacos',
      name: 'Carnitas Tacos',
      description: 'Three soft tacos with slow-cooked pork, onions, and cilantro',
      price: 11.99,
      image: 'https://images.pexels.com/photos/7613568/pexels-photo-7613568.jpeg?w=400&h=300&fit=crop',
      category: 'Tacos',
      popular: false
    },
    {
      id: 'quesadilla',
      name: 'Cheese Quesadilla',
      description: 'Grilled flour tortilla filled with melted cheese and served with salsa',
      price: 8.99,
      image: 'https://images.pexels.com/photos/6192497/pexels-photo-6192497.jpeg?w=400&h=300&fit=crop',
      category: 'Appetizers'
    },
    {
      id: 'mexican-rice',
      name: 'Mexican Rice',
      description: 'Traditional seasoned rice with vegetables and spices',
      price: 3.99,
      image: 'https://images.pexels.com/photos/2456435/pexels-photo-2456435.jpeg?w=400&h=300&fit=crop',
      category: 'Sides'
    }
  ],
  'healthy-bowls': [
    {
      id: 'power-bowl',
      name: 'Power Bowl',
      description: 'Quinoa, grilled chicken, avocado, sweet potato, and tahini dressing',
      price: 14.99,
      image: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?w=400&h=300&fit=crop',
      category: 'Bowls',
      popular: true
    },
    {
      id: 'acai-bowl',
      name: 'Acai Bowl',
      description: 'Acai berries, granola, fresh fruits, and honey',
      price: 12.99,
      image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=400&h=300&fit=crop',
      category: 'Bowls',
      popular: true
    },
    {
      id: 'green-salad',
      name: 'Green Goddess Salad',
      description: 'Mixed greens, cucumber, cherry tomatoes, and green goddess dressing',
      price: 10.99,
      image: 'https://images.pexels.com/photos/257816/pexels-photo-257816.jpeg?w=400&h=300&fit=crop',
      category: 'Salads'
    },
    {
      id: 'protein-smoothie',
      name: 'Protein Power Smoothie',
      description: 'Banana, peanut butter, protein powder, and almond milk',
      price: 7.99,
      image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=400&h=300&fit=crop',
      category: 'Smoothies'
    }
  ],
  'coffee-corner': [
    {
      id: 'espresso',
      name: 'Espresso',
      description: 'Rich and bold espresso shot',
      price: 2.99,
      image: 'https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg?w=400&h=300&fit=crop',
      category: 'Coffee',
      popular: true
    },
    {
      id: 'cappuccino',
      name: 'Cappuccino',
      description: 'Espresso with steamed milk and foam',
      price: 4.99,
      image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?w=400&h=300&fit=crop',
      category: 'Coffee',
      popular: true
    },
    {
      id: 'croissant',
      name: 'Butter Croissant',
      description: 'Flaky, buttery French croissant',
      price: 3.99,
      image: 'https://images.pexels.com/photos/205961/pexels-photo-205961.jpeg?w=400&h=300&fit=crop',
      category: 'Pastries'
    },
    {
      id: 'avocado-toast',
      name: 'Avocado Toast',
      description: 'Multigrain bread topped with smashed avocado and everything seasoning',
      price: 8.99,
      image: 'https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg?w=400&h=300&fit=crop',
      category: 'Breakfast'
    }
  ],
  'asian-express': [
    {
      id: 'pad-thai',
      name: 'Pad Thai',
      description: 'Stir-fried rice noodles with shrimp, tofu, and peanuts',
      price: 13.99,
      image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?w=400&h=300&fit=crop',
      category: 'Noodles',
      popular: true
    },
    {
      id: 'fried-rice',
      name: 'Chicken Fried Rice',
      description: 'Wok-fried rice with chicken, vegetables, and soy sauce',
      price: 11.99,
      image: 'https://images.pexels.com/photos/2456435/pexels-photo-2456435.jpeg?w=400&h=300&fit=crop',
      category: 'Rice',
      popular: false
    },
    {
      id: 'spring-rolls',
      name: 'Fresh Spring Rolls',
      description: 'Rice paper rolls with shrimp, vegetables, and peanut sauce',
      price: 7.99,
      image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?w=400&h=300&fit=crop',
      category: 'Appetizers'
    },
    {
      id: 'tom-yum',
      name: 'Tom Yum Soup',
      description: 'Spicy and sour Thai soup with shrimp and mushrooms',
      price: 9.99,
      image: 'https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg?w=400&h=300&fit=crop',
      category: 'Soups'
    }
  ],
  'sandwich-shop': [
    {
      id: 'club-sandwich',
      name: 'Club Sandwich',
      description: 'Turkey, bacon, lettuce, tomato, and mayo on toasted bread',
      price: 10.99,
      image: 'https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?w=400&h=300&fit=crop',
      category: 'Sandwiches',
      popular: true
    },
    {
      id: 'philly-cheesesteak',
      name: 'Philly Cheesesteak',
      description: 'Sliced steak with melted cheese and peppers on a hoagie roll',
      price: 12.99,
      image: 'https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?w=400&h=300&fit=crop',
      category: 'Sandwiches',
      popular: true
    },
    {
      id: 'italian-sub',
      name: 'Italian Sub',
      description: 'Ham, salami, provolone, lettuce, tomato, and Italian dressing',
      price: 9.99,
      image: 'https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?w=400&h=300&fit=crop',
      category: 'Sandwiches'
    },
    {
      id: 'soup-of-day',
      name: 'Soup of the Day',
      description: 'Ask about today\'s fresh soup selection',
      price: 5.99,
      image: 'https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg?w=400&h=300&fit=crop',
      category: 'Soups'
    }
  ],
  'chicken-coop': [
    {
      id: 'fried-chicken',
      name: 'Fried Chicken (8 pieces)',
      description: 'Crispy fried chicken pieces with secret spice blend',
      price: 16.99,
      image: 'https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?w=400&h=300&fit=crop',
      category: 'Chicken',
      popular: true
    },
    {
      id: 'buffalo-wings',
      name: 'Buffalo Wings',
      description: 'Spicy buffalo wings with ranch dipping sauce',
      price: 11.99,
      image: 'https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?w=400&h=300&fit=crop',
      category: 'Wings',
      popular: true
    },
    {
      id: 'chicken-tenders',
      name: 'Chicken Tenders',
      description: 'Breaded chicken tenders with honey mustard sauce',
      price: 9.99,
      image: 'https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?w=400&h=300&fit=crop',
      category: 'Chicken'
    },
    {
      id: 'mac-cheese',
      name: 'Mac & Cheese',
      description: 'Creamy macaroni and cheese with breadcrumb topping',
      price: 6.99,
      image: 'https://images.pexels.com/photos/806357/pexels-photo-806357.jpeg?w=400&h=300&fit=crop',
      category: 'Sides'
    }
  ],
  'sweet-treats': [
    {
      id: 'chocolate-cake',
      name: 'Chocolate Cake',
      description: 'Rich chocolate cake with chocolate frosting',
      price: 6.99,
      image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?w=400&h=300&fit=crop',
      category: 'Cakes',
      popular: true
    },
    {
      id: 'cheesecake',
      name: 'New York Cheesecake',
      description: 'Classic creamy cheesecake with graham cracker crust',
      price: 7.99,
      image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?w=400&h=300&fit=crop',
      category: 'Cakes',
      popular: true
    },
    {
      id: 'cookies',
      name: 'Chocolate Chip Cookies (6)',
      description: 'Fresh baked chocolate chip cookies',
      price: 4.99,
      image: 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?w=400&h=300&fit=crop',
      category: 'Cookies'
    },
    {
      id: 'apple-pie',
      name: 'Apple Pie Slice',
      description: 'Traditional apple pie with cinnamon and flaky crust',
      price: 5.99,
      image: 'https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg?w=400&h=300&fit=crop',
      category: 'Pies'
    }
  ],
  'smoothie-bar': [
    {
      id: 'green-smoothie',
      name: 'Green Machine',
      description: 'Spinach, banana, mango, and coconut water',
      price: 7.99,
      image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=400&h=300&fit=crop',
      category: 'Smoothies',
      popular: true
    },
    {
      id: 'berry-blast',
      name: 'Berry Blast',
      description: 'Mixed berries, yogurt, and honey',
      price: 6.99,
      image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=400&h=300&fit=crop',
      category: 'Smoothies',
      popular: true
    },
    {
      id: 'tropical-paradise',
      name: 'Tropical Paradise',
      description: 'Pineapple, mango, coconut, and orange juice',
      price: 7.49,
      image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=400&h=300&fit=crop',
      category: 'Smoothies'
    },
    {
      id: 'protein-shake',
      name: 'Chocolate Protein Shake',
      description: 'Chocolate protein powder, banana, and almond milk',
      price: 8.99,
      image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=400&h=300&fit=crop',
      category: 'Protein Shakes'
    }
  ],
  'italian-corner': [
    {
      id: 'spaghetti-carbonara',
      name: 'Spaghetti Carbonara',
      description: 'Classic carbonara with pancetta, eggs, and parmesan',
      price: 16.99,
      image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?w=400&h=300&fit=crop',
      category: 'Pasta',
      popular: true
    },
    {
      id: 'chicken-parmigiana',
      name: 'Chicken Parmigiana',
      description: 'Breaded chicken with marinara sauce and mozzarella',
      price: 18.99,
      image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?w=400&h=300&fit=crop',
      category: 'Main Dishes',
      popular: true
    },
    {
      id: 'tiramisu',
      name: 'Tiramisu',
      description: 'Classic Italian dessert with coffee and mascarpone',
      price: 8.99,
      image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?w=400&h=300&fit=crop',
      category: 'Desserts'
    },
    {
      id: 'bruschetta',
      name: 'Bruschetta',
      description: 'Toasted bread with tomatoes, basil, and garlic',
      price: 7.99,
      image: 'https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?w=400&h=300&fit=crop',
      category: 'Appetizers'
    }
  ],
  'sushi-zen': [
    {
      id: 'salmon-roll',
      name: 'Salmon Roll',
      description: 'Fresh salmon with cucumber and avocado',
      price: 12.99,
      image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?w=400&h=300&fit=crop',
      category: 'Sushi Rolls',
      popular: true
    },
    {
      id: 'tuna-sashimi',
      name: 'Tuna Sashimi',
      description: 'Fresh tuna slices (6 pieces)',
      price: 14.99,
      image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?w=400&h=300&fit=crop',
      category: 'Sashimi',
      popular: true
    },
    {
      id: 'miso-soup',
      name: 'Miso Soup',
      description: 'Traditional soybean soup with tofu and seaweed',
      price: 4.99,
      image: 'https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg?w=400&h=300&fit=crop',
      category: 'Soups'
    },
    {
      id: 'dragon-roll',
      name: 'Dragon Roll',
      description: 'Shrimp tempura with eel and avocado on top',
      price: 16.99,
      image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?w=400&h=300&fit=crop',
      category: 'Specialty Rolls'
    }
  ],
  'bbq-smokehouse': [
    {
      id: 'brisket-platter',
      name: 'BBQ Brisket Platter',
      description: 'Slow-smoked brisket with two sides',
      price: 19.99,
      image: 'https://images.pexels.com/photos/323682/pexels-photo-323682.jpeg?w=400&h=300&fit=crop',
      category: 'BBQ Platters',
      popular: true
    },
    {
      id: 'ribs-half-rack',
      name: 'Half Rack Ribs',
      description: 'Fall-off-the-bone pork ribs with BBQ sauce',
      price: 16.99,
      image: 'https://images.pexels.com/photos/323682/pexels-photo-323682.jpeg?w=400&h=300&fit=crop',
      category: 'BBQ Platters',
      popular: true
    },
    {
      id: 'pulled-pork',
      name: 'Pulled Pork Sandwich',
      description: 'Smoked pulled pork with coleslaw on brioche bun',
      price: 11.99,
      image: 'https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?w=400&h=300&fit=crop',
      category: 'Sandwiches'
    },
    {
      id: 'cornbread',
      name: 'Cornbread',
      description: 'Sweet cornbread with honey butter',
      price: 4.99,
      image: 'https://images.pexels.com/photos/205961/pexels-photo-205961.jpeg?w=400&h=300&fit=crop',
      category: 'Sides'
    }
  ],
  'thai-spice': [
    {
      id: 'green-curry',
      name: 'Green Curry Chicken',
      description: 'Spicy green curry with chicken and Thai basil',
      price: 14.99,
      image: 'https://images.pexels.com/photos/1410235/pexels-photo-1410235.jpeg?w=400&h=300&fit=crop',
      category: 'Curries',
      popular: true
    },
    {
      id: 'pad-see-ew',
      name: 'Pad See Ew',
      description: 'Stir-fried flat noodles with beef and Chinese broccoli',
      price: 12.99,
      image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?w=400&h=300&fit=crop',
      category: 'Noodles',
      popular: true
    },
    {
      id: 'mango-sticky-rice',
      name: 'Mango Sticky Rice',
      description: 'Sweet sticky rice with fresh mango and coconut milk',
      price: 7.99,
      image: 'https://images.pexels.com/photos/2456435/pexels-photo-2456435.jpeg?w=400&h=300&fit=crop',
      category: 'Desserts'
    },
    {
      id: 'som-tam',
      name: 'Som Tam (Papaya Salad)',
      description: 'Spicy green papaya salad with lime and peanuts',
      price: 8.99,
      image: 'https://images.pexels.com/photos/257816/pexels-photo-257816.jpeg?w=400&h=300&fit=crop',
      category: 'Salads'
    }
  ],
  'greek-corner': [
    {
      id: 'gyro-platter',
      name: 'Gyro Platter',
      description: 'Sliced gyro meat with pita, tzatziki, and Greek salad',
      price: 15.99,
      image: 'https://images.pexels.com/photos/1213710/pexels-photo-1213710.jpeg?w=400&h=300&fit=crop',
      category: 'Platters',
      popular: true
    },
    {
      id: 'moussaka',
      name: 'Moussaka',
      description: 'Layered eggplant casserole with meat sauce and béchamel',
      price: 17.99,
      image: 'https://images.pexels.com/photos/1213710/pexels-photo-1213710.jpeg?w=400&h=300&fit=crop',
      category: 'Main Dishes',
      popular: true
    },
    {
      id: 'dolmades',
      name: 'Dolmades',
      description: 'Grape leaves stuffed with rice and herbs',
      price: 7.99,
      image: 'https://images.pexels.com/photos/1213710/pexels-photo-1213710.jpeg?w=400&h=300&fit=crop',
      category: 'Appetizers'
    },
    {
      id: 'baklava',
      name: 'Baklava',
      description: 'Sweet pastry with nuts and honey syrup',
      price: 5.99,
      image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?w=400&h=300&fit=crop',
      category: 'Desserts'
    }
  ],
  'french-bistro': [
    {
      id: 'coq-au-vin',
      name: 'Coq au Vin',
      description: 'Braised chicken in red wine with mushrooms and pearl onions',
      price: 24.99,
      image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?w=400&h=300&fit=crop',
      category: 'Main Dishes',
      popular: true
    },
    {
      id: 'beef-bourguignon',
      name: 'Beef Bourguignon',
      description: 'Slow-braised beef in burgundy wine with vegetables',
      price: 26.99,
      image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?w=400&h=300&fit=crop',
      category: 'Main Dishes',
      popular: true
    },
    {
      id: 'french-onion-soup',
      name: 'French Onion Soup',
      description: 'Classic onion soup with gruyere cheese and croutons',
      price: 8.99,
      image: 'https://images.pexels.com/photos/539451/pexels-photo-539451.jpeg?w=400&h=300&fit=crop',
      category: 'Soups'
    },
    {
      id: 'creme-brulee',
      name: 'Crème Brûlée',
      description: 'Classic vanilla custard with caramelized sugar top',
      price: 9.99,
      image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?w=400&h=300&fit=crop',
      category: 'Desserts'
    }
  ],
  'indian-palace': [
    {
      id: 'chicken-tikka-masala',
      name: 'Chicken Tikka Masala',
      description: 'Tender chicken in creamy tomato curry sauce',
      price: 16.99,
      image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?w=400&h=300&fit=crop',
      category: 'Curries',
      popular: true
    },
    {
      id: 'lamb-biryani',
      name: 'Lamb Biryani',
      description: 'Fragrant basmati rice with spiced lamb and saffron',
      price: 19.99,
      image: 'https://images.pexels.com/photos/2456435/pexels-photo-2456435.jpeg?w=400&h=300&fit=crop',
      category: 'Rice Dishes',
      popular: true
    },
    {
      id: 'naan-bread',
      name: 'Garlic Naan',
      description: 'Fresh baked naan bread with garlic and cilantro',
      price: 4.99,
      image: 'https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?w=400&h=300&fit=crop',
      category: 'Breads'
    },
    {
      id: 'samosas',
      name: 'Vegetable Samosas (4)',
      description: 'Crispy pastries filled with spiced potatoes and peas',
      price: 6.99,
      image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?w=400&h=300&fit=crop',
      category: 'Appetizers'
    }
  ],
  'vegan-garden': [
    {
      id: 'beyond-burger',
      name: 'Beyond Burger',
      description: 'Plant-based burger with vegan cheese and avocado',
      price: 14.99,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?w=400&h=300&fit=crop',
      category: 'Burgers',
      popular: true
    },
    {
      id: 'quinoa-bowl',
      name: 'Rainbow Quinoa Bowl',
      description: 'Quinoa with roasted vegetables and tahini dressing',
      price: 13.99,
      image: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?w=400&h=300&fit=crop',
      category: 'Bowls',
      popular: true
    },
    {
      id: 'vegan-pizza',
      name: 'Vegan Mediterranean Pizza',
      description: 'Pizza with vegan cheese, olives, tomatoes, and herbs',
      price: 16.99,
      image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?w=400&h=300&fit=crop',
      category: 'Pizza'
    },
    {
      id: 'chia-pudding',
      name: 'Chia Seed Pudding',
      description: 'Chia seeds with coconut milk and fresh berries',
      price: 7.99,
      image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?w=400&h=300&fit=crop',
      category: 'Desserts'
    }
  ],
  'steakhouse-prime': [
    {
      id: 'ribeye-steak',
      name: 'Ribeye Steak (12oz)',
      description: 'Prime ribeye steak grilled to perfection',
      price: 32.99,
      image: 'https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg?w=400&h=300&fit=crop',
      category: 'Steaks',
      popular: true
    },
    {
      id: 'filet-mignon',
      name: 'Filet Mignon (8oz)',
      description: 'Tender filet mignon with herb butter',
      price: 36.99,
      image: 'https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg?w=400&h=300&fit=crop',
      category: 'Steaks',
      popular: true
    },
    {
      id: 'lobster-tail',
      name: 'Lobster Tail',
      description: 'Fresh lobster tail with drawn butter',
      price: 28.99,
      image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?w=400&h=300&fit=crop',
      category: 'Seafood'
    },
    {
      id: 'truffle-fries',
      name: 'Truffle Fries',
      description: 'Hand-cut fries with truffle oil and parmesan',
      price: 12.99,
      image: 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?w=400&h=300&fit=crop',
      category: 'Sides'
    }
  ],
  'korean-bbq': [
    {
      id: 'bulgogi',
      name: 'Bulgogi',
      description: 'Marinated beef with Korean pear and soy sauce',
      price: 18.99,
      image: 'https://images.pexels.com/photos/2313686/pexels-photo-2313686.jpeg?w=400&h=300&fit=crop',
      category: 'BBQ',
      popular: true
    },
    {
      id: 'galbi',
      name: 'Galbi (Short Ribs)',
      description: 'Marinated short ribs grilled to perfection',
      price: 22.99,
      image: 'https://images.pexels.com/photos/2313686/pexels-photo-2313686.jpeg?w=400&h=300&fit=crop',
      category: 'BBQ',
      popular: true
    },
    {
      id: 'kimchi',
      name: 'Kimchi',
      description: 'Fermented cabbage with Korean spices',
      price: 5.99,
      image: 'https://images.pexels.com/photos/2456435/pexels-photo-2456435.jpeg?w=400&h=300&fit=crop',
      category: 'Sides'
    },
    {
      id: 'bibimbap',
      name: 'Bibimbap',
      description: 'Mixed rice bowl with vegetables and gochujang',
      price: 15.99,
      image: 'https://images.pexels.com/photos/2456435/pexels-photo-2456435.jpeg?w=400&h=300&fit=crop',
      category: 'Rice Bowls'
    }
  ]
};

// Promotional banners
const promotions = [
  {
    id: 'mountain-dew-promo',
    title: '$3 off $22+ with Regular Mountain Dew Baja Midnight™ Freeze',
    subtitle: 'Available select dates. Terms apply.',
    image: 'https://images.pexels.com/photos/2775860/pexels-photo-2775860.jpeg?w=800&h=400&fit=crop',
    backgroundColor: 'bg-purple-600',
    textColor: 'text-white',
    buttonText: 'Order now',
    code: 'BAJAMIDNIGHT'
  },
  {
    id: 'seven-eleven-promo',
    title: 'Get 25% off $25+ from 7-Eleven.',
    subtitle: 'Up to $7.25 off',
    description: 'Code: 7E25OFF. Now - 9/28',
    image: 'https://images.pexels.com/photos/4349868/pexels-photo-4349868.jpeg?w=800&h=400&fit=crop',
    backgroundColor: 'bg-red-500',
    textColor: 'text-white',
    buttonText: 'Order now',
    code: '7E25OFF'
  }
];

// User data
const users = [
  {
    id: 'user-1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    phone: '(555) 123-4567',
    addresses: [
      {
        id: 'addr-1',
        type: 'Home',
        street: '123 Main St',
        city: 'Downtown',
        state: 'CA',
        zipCode: '90210',
        isDefault: true
      },
      {
        id: 'addr-2',
        type: 'Work',
        street: '456 Office Blvd',
        city: 'Financial District',
        state: 'CA',
        zipCode: '90211',
        isDefault: false
      }
    ],
    paymentMethods: [
      {
        id: 'card-1',
        type: 'Credit Card',
        last4: '1234',
        brand: 'Visa',
        isDefault: true
      }
    ],
    orderHistory: [],
    favorites: ['burger-den', 'pizza-palace'],
    dietaryPreferences: ['Vegetarian options'],
    memberSince: '2023-01-15'
  }
];

// Order statuses
const orderStatuses = [
  'Placed',
  'Confirmed',
  'Preparing',
  'Out for delivery',
  'Delivered'
];

// Sample orders
const orders = [
  {
    id: 'order-1',
    userId: 'user-1',
    restaurantId: 'burger-den',
    status: 'Delivered',
    items: [
      { menuItemId: 'classic-burger', quantity: 2, price: 12.99 },
      { menuItemId: 'crispy-fries', quantity: 1, price: 4.99 }
    ],
    subtotal: 30.97,
    deliveryFee: 2.99,
    tax: 2.79,
    tip: 5.00,
    total: 41.75,
    orderTime: '2024-03-15T18:30:00Z',
    estimatedDelivery: '2024-03-15T19:15:00Z',
    actualDelivery: '2024-03-15T19:12:00Z',
    deliveryAddress: {
      street: '123 Main St',
      city: 'Downtown',
      state: 'CA',
      zipCode: '90210'
    },
    paymentMethod: 'Visa ending in 1234',
    specialInstructions: 'Please ring doorbell'
  }
];

// Export all data
const staticMealDashData = {
  categories,
  deliveryAreas,
  restaurants,
  menuItems,
  promotions,
  users,
  orderStatuses,
  orders
};

export default staticMealDashData;
