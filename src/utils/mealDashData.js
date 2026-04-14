import staticMealDashData from '../data/staticMealDashData';

const {
  categories,
  deliveryAreas,
  restaurants,
  menuItems,
  promotions,
  users,
  orderStatuses,
  orders
} = staticMealDashData;

// Restaurant functions
export const getRestaurants = () => {
  return restaurants;
};

export const getRestaurantById = (id) => {
  return restaurants.find(restaurant => restaurant.id === id);
};

export const getFeaturedRestaurants = () => {
  return restaurants.filter(restaurant => restaurant.featured);
};

export const getRestaurantsByCategory = (categoryId) => {
  if (categoryId === 'all') return restaurants;
  return restaurants.filter(restaurant => 
    restaurant.categories.includes(categoryId)
  );
};

export const searchRestaurants = (query, filters = {}) => {
  let filteredRestaurants = restaurants;

  // Text search
  if (query) {
    const searchTerm = query.toLowerCase();
    filteredRestaurants = filteredRestaurants.filter(restaurant =>
      restaurant.name.toLowerCase().includes(searchTerm) ||
      restaurant.description.toLowerCase().includes(searchTerm) ||
      restaurant.categories.some(cat => cat.toLowerCase().includes(searchTerm))
    );
  }

  // Category filter
  if (filters.category && filters.category !== 'all') {
    filteredRestaurants = filteredRestaurants.filter(restaurant =>
      restaurant.categories.includes(filters.category)
    );
  }

  // Rating filter
  if (filters.minRating) {
    filteredRestaurants = filteredRestaurants.filter(restaurant =>
      restaurant.rating >= filters.minRating
    );
  }

  // Delivery time filter
  if (filters.maxDeliveryTime) {
    filteredRestaurants = filteredRestaurants.filter(restaurant => {
      const maxTime = parseInt(restaurant.deliveryTime.split('-')[1]);
      return maxTime <= filters.maxDeliveryTime;
    });
  }

  // Delivery fee filter
  if (filters.maxDeliveryFee) {
    filteredRestaurants = filteredRestaurants.filter(restaurant =>
      restaurant.deliveryFee <= filters.maxDeliveryFee
    );
  }

  // Sort options
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'rating':
        filteredRestaurants.sort((a, b) => b.rating - a.rating);
        break;
      case 'deliveryTime':
        filteredRestaurants.sort((a, b) => {
          const aTime = parseInt(a.deliveryTime.split('-')[0]);
          const bTime = parseInt(b.deliveryTime.split('-')[0]);
          return aTime - bTime;
        });
        break;
      case 'deliveryFee':
        filteredRestaurants.sort((a, b) => a.deliveryFee - b.deliveryFee);
        break;
      case 'popularity':
        filteredRestaurants.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        break;
    }
  }

  return filteredRestaurants;
};

// Menu functions
export const getMenuItems = (restaurantId) => {
  return menuItems[restaurantId] || [];
};

export const getMenuItemById = (restaurantId, itemId) => {
  const items = menuItems[restaurantId] || [];
  return items.find(item => item.id === itemId);
};

export const getPopularItems = (restaurantId) => {
  const items = menuItems[restaurantId] || [];
  return items.filter(item => item.popular);
};

export const getMenuItemsByCategory = (restaurantId, category) => {
  const items = menuItems[restaurantId] || [];
  if (category === 'all') return items;
  return items.filter(item => item.category === category);
};

export const searchMenuItems = (restaurantId, query) => {
  const items = menuItems[restaurantId] || [];
  if (!query) return items;
  
  const searchTerm = query.toLowerCase();
  return items.filter(item =>
    item.name.toLowerCase().includes(searchTerm) ||
    item.description.toLowerCase().includes(searchTerm) ||
    item.category.toLowerCase().includes(searchTerm)
  );
};

// Category functions
export const getCategories = () => {
  return categories;
};

export const getCategoryById = (id) => {
  return categories.find(category => category.id === id);
};

// Promotion functions
export const getPromotions = () => {
  return promotions;
};

export const getActivePromotions = () => {
  // In a real app, this would check dates
  return promotions;
};

// User functions
export const getUserById = (id) => {
  return users.find(user => user.id === id);
};

export const getUserAddresses = (userId) => {
  const user = getUserById(userId);
  return user ? user.addresses : [];
};

export const getDefaultAddress = (userId) => {
  const addresses = getUserAddresses(userId);
  return addresses.find(addr => addr.isDefault) || addresses[0];
};

export const getUserPaymentMethods = (userId) => {
  const user = getUserById(userId);
  return user ? user.paymentMethods : [];
};

export const getDefaultPaymentMethod = (userId) => {
  const paymentMethods = getUserPaymentMethods(userId);
  return paymentMethods.find(method => method.isDefault) || paymentMethods[0];
};

// Order functions
export const getOrders = (userId) => {
  return orders.filter(order => order.userId === userId);
};

export const getOrderById = (orderId) => {
  return orders.find(order => order.id === orderId);
};

export const createOrder = (orderData) => {
  const newOrder = {
    id: `order-${Date.now()}`,
    ...orderData,
    orderTime: new Date().toISOString(),
    status: 'Placed'
  };
  
  orders.push(newOrder);
  return newOrder;
};

export const updateOrderStatus = (orderId, status) => {
  const order = getOrderById(orderId);
  if (order) {
    order.status = status;
    if (status === 'Delivered') {
      order.actualDelivery = new Date().toISOString();
    }
  }
  return order;
};

// Cart functions
export const calculateSubtotal = (cartItems) => {
  return cartItems.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
};

export const calculateTax = (subtotal, taxRate = 0.09) => {
  return subtotal * taxRate;
};

export const calculateTotal = (subtotal, deliveryFee, tax, tip = 0) => {
  return subtotal + deliveryFee + tax + tip;
};

// Delivery functions
export const getDeliveryAreas = () => {
  return deliveryAreas;
};

export const isDeliveryAvailable = (address) => {
  // In a real app, this would check actual delivery zones
  return deliveryAreas.includes(address.city);
};

export const estimateDeliveryTime = (restaurantId, deliveryAddress) => {
  const restaurant = getRestaurantById(restaurantId);
  if (!restaurant) return null;
  
  // In a real app, this would consider distance, traffic, etc.
  const baseTime = parseInt(restaurant.deliveryTime.split('-')[0]);
  const maxTime = parseInt(restaurant.deliveryTime.split('-')[1]);
  
  return {
    min: baseTime,
    max: maxTime,
    formatted: restaurant.deliveryTime
  };
};

// Utility functions
export const formatPrice = (price) => {
  return `$${price.toFixed(2)}`;
};

export const formatDeliveryTime = (minutes) => {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
};

export const formatAddress = (address) => {
  return `${address.street}, ${address.city}, ${address.state} ${address.zipCode}`;
};

export const formatOrderTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export const getRestaurantStatus = (restaurant) => {
  // In a real app, this would check actual hours
  return restaurant.isOpen ? 'Open' : 'Closed';
};

export const getDeliveryFeeText = (fee) => {
  return fee === 0 ? 'Free delivery' : `$${fee.toFixed(2)} delivery`;
};

// Filter and sort options
export const getSortOptions = () => [
  { value: 'featured', label: 'Featured' },
  { value: 'rating', label: 'Rating' },
  { value: 'deliveryTime', label: 'Delivery time' },
  { value: 'deliveryFee', label: 'Delivery fee' },
  { value: 'popularity', label: 'Most popular' }
];

export const getFilterOptions = () => ({
  ratings: [
    { value: 4.5, label: '4.5+ stars' },
    { value: 4.0, label: '4.0+ stars' },
    { value: 3.5, label: '3.5+ stars' }
  ],
  deliveryTimes: [
    { value: 30, label: 'Under 30 min' },
    { value: 45, label: 'Under 45 min' },
    { value: 60, label: 'Under 1 hour' }
  ],
  deliveryFees: [
    { value: 0, label: 'Free delivery' },
    { value: 2, label: 'Under $2' },
    { value: 3, label: 'Under $3' }
  ],
  prices: [
    { value: '$', label: '$' },
    { value: '$$', label: '$$' },
    { value: '$$$', label: '$$$' },
    { value: '$$$$', label: '$$$$' }
  ]
});

export default {
  getRestaurants,
  getRestaurantById,
  getFeaturedRestaurants,
  getRestaurantsByCategory,
  searchRestaurants,
  getMenuItems,
  getMenuItemById,
  getPopularItems,
  getMenuItemsByCategory,
  searchMenuItems,
  getCategories,
  getCategoryById,
  getPromotions,
  getActivePromotions,
  getUserById,
  getUserAddresses,
  getDefaultAddress,
  getUserPaymentMethods,
  getDefaultPaymentMethod,
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  calculateSubtotal,
  calculateTax,
  calculateTotal,
  getDeliveryAreas,
  isDeliveryAvailable,
  estimateDeliveryTime,
  formatPrice,
  formatDeliveryTime,
  formatAddress,
  formatOrderTime,
  getRestaurantStatus,
  getDeliveryFeeText,
  getSortOptions,
  getFilterOptions
};
