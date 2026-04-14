// Static dataset for mealdash_gpt (DoorDash-like) built from scratch UI-wise
// Data structures are independent but may reuse existing public images if available

export const cuisines = [
  { id: 'american', name: 'American' },
  { id: 'italian', name: 'Italian' },
  { id: 'mexican', name: 'Mexican' },
  { id: 'japanese', name: 'Japanese' },
  { id: 'chinese', name: 'Chinese' },
  { id: 'indian', name: 'Indian' },
  { id: 'thai', name: 'Thai' },
  { id: 'mediterranean', name: 'Mediterranean' },
  { id: 'vegan', name: 'Vegan' },
  { id: 'desserts', name: 'Desserts' },
];

export const tags = [
  'Fast delivery',
  'Under $10',
  'Pickup',
  'New on Mealdash',
  'Top rated',
  'Family style',
  'Healthy',
  'Late night',
];

export const restaurants = [
  {
    id: 'md-burger-hub',
    name: 'Burger Hub',
    rating: 4.6,
    reviewCount: 1340,
    priceLevel: '$$',
    cuisine: 'american',
    eta: { min: 20, max: 30 },
    deliveryFee: 2.99,
    image: '/images/hotels/restaurant_01.jpg',
    address: '123 King St, San Francisco, CA',
    isPickupAvailable: true,
    popularTags: ['Fast delivery', 'Under $10'],
    menuSections: [
      {
        id: 'burgers',
        name: 'Burgers',
        items: [
          { id: 'classic-burger', name: 'Classic Burger', description: 'Beef patty, lettuce, tomato, onion, house sauce', price: 8.99 },
          { id: 'cheese-burger', name: 'Cheeseburger', description: 'Beef, cheddar, pickles, ketchup, mustard', price: 9.49 },
          { id: 'bacon-bbq-burger', name: 'Bacon BBQ Burger', description: 'Smoky bacon, cheddar, crispy onion, BBQ sauce', price: 10.99 },
        ],
      },
      {
        id: 'sides',
        name: 'Sides',
        items: [
          { id: 'fries', name: 'Fries', description: 'Crispy shoestring fries', price: 3.49 },
          { id: 'onion-rings', name: 'Onion Rings', description: 'Beer-battered rings', price: 4.49 },
        ],
      },
      {
        id: 'drinks',
        name: 'Drinks',
        items: [
          { id: 'cola', name: 'Cola', description: '12 oz can', price: 1.99 },
          { id: 'lemonade', name: 'Lemonade', description: 'House-made lemonade', price: 2.49 },
        ],
      },
    ],
  },
  {
    id: 'md-pasta-palace',
    name: 'Pasta Palace',
    rating: 4.7,
    reviewCount: 820,
    priceLevel: '$$'
    ,
    cuisine: 'italian',
    eta: { min: 25, max: 35 },
    deliveryFee: 0,
    image: '/images/hotels/restaurant_02.jpg',
    address: '456 Olive Ave, San Jose, CA',
    isPickupAvailable: true,
    popularTags: ['Top rated', 'Family style'],
    menuSections: [
      {
        id: 'pastas',
        name: 'Pastas',
        items: [
          { id: 'spaghetti-bolognese', name: 'Spaghetti Bolognese', description: 'Slow-cooked meat sauce', price: 12.99 },
          { id: 'fettuccine-alfredo', name: 'Fettuccine Alfredo', description: 'Creamy parmesan sauce', price: 13.49 },
          { id: 'penne-arrabbiata', name: 'Penne Arrabbiata', description: 'Spicy tomato sauce', price: 11.99 },
        ],
      },
      {
        id: 'salads',
        name: 'Salads',
        items: [
          { id: 'caesar-salad', name: 'Caesar Salad', description: 'Romaine, parmesan, croutons', price: 7.99 },
          { id: 'caprese-salad', name: 'Caprese Salad', description: 'Fresh mozzarella, tomato, basil', price: 8.49 },
        ],
      },
      {
        id: 'desserts',
        name: 'Desserts',
        items: [
          { id: 'tiramisu', name: 'Tiramisu', description: 'Classic Italian dessert', price: 5.99 },
          { id: 'panna-cotta', name: 'Panna Cotta', description: 'Vanilla cream, berry coulis', price: 5.49 },
        ],
      },
    ],
  },
  {
    id: 'md-sushi-garden',
    name: 'Sushi Garden',
    rating: 4.5,
    reviewCount: 560,
    priceLevel: '$$$',
    cuisine: 'japanese',
    eta: { min: 35, max: 50 },
    deliveryFee: 4.99,
    image: '/images/hotels/restaurant_03.jpg',
    address: '789 Sakura Ln, Mountain View, CA',
    isPickupAvailable: false,
    popularTags: ['Healthy'],
    menuSections: [
      {
        id: 'rolls',
        name: 'Rolls',
        items: [
          { id: 'california-roll', name: 'California Roll', description: 'Crab, avocado, cucumber', price: 7.99 },
          { id: 'spicy-tuna', name: 'Spicy Tuna Roll', description: 'Tuna, spicy mayo', price: 8.99 },
          { id: 'dragon-roll', name: 'Dragon Roll', description: 'Eel, avocado, cucumber, tobiko', price: 12.49 },
        ],
      },
      {
        id: 'nigiri',
        name: 'Nigiri',
        items: [
          { id: 'salmon-nigiri', name: 'Salmon Nigiri', description: '2 pcs', price: 5.99 },
          { id: 'tuna-nigiri', name: 'Tuna Nigiri', description: '2 pcs', price: 6.49 },
        ],
      },
      {
        id: 'sides',
        name: 'Sides',
        items: [
          { id: 'miso-soup', name: 'Miso Soup', description: 'Tofu, wakame, scallions', price: 2.49 },
          { id: 'edamame', name: 'Edamame', description: 'Sea salted soybeans', price: 3.49 },
        ],
      },
    ],
  },
];

export function listRestaurants({ cuisine, tag, query } = {}) {
  let results = restaurants.slice();
  if (cuisine) {
    results = results.filter((r) => r.cuisine === cuisine);
  }
  if (tag) {
    results = results.filter((r) => r.popularTags?.includes(tag));
  }
  if (query) {
    const q = query.toLowerCase();
    results = results.filter((r) =>
      r.name.toLowerCase().includes(q) || r.address.toLowerCase().includes(q)
    );
  }
  return results;
}

export function getRestaurantById(id) {
  return restaurants.find((r) => r.id === id) || null;
}

export function getMenuSection(restaurant, sectionId) {
  return restaurant?.menuSections?.find((s) => s.id === sectionId) || null;
}


