// StayBnB data utility functions
import staticStaybnbData from '../data/staticStaybnbData';

const {
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
} = staticStaybnbData;

// Export all data and functions
export {
  properties as staybnbProperties,
  hosts as staybnbHosts,
  reviews as staybnbReviews,
  destinations as staybnbDestinations,
  propertyTypes,
  categories,
  getPropertyById,
  getHostById,
  getReviewsByPropertyId,
  searchProperties,
  calculateTotalPrice
};

// Additional utility functions
export const getFeaturedProperties = (limit = 8) => {
  // Return properties with high ratings and good reviews
  return properties
    .filter(property => property.rating >= 4.7 && property.reviewCount >= 50)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
};

export const getPropertiesByCategory = (category, limit = 12) => {
  return properties
    .filter(property => property.category === category)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
};

export const getPropertiesByHost = (hostId) => {
  return properties.filter(property => property.hostId === hostId);
};

export const getAvailableDates = (propertyId, startDate, endDate) => {
  // Simplified availability check - in a real app this would check actual bookings
  const property = getPropertyById(propertyId);
  if (!property) return false;
  
  // For demo purposes, assume all properties are available
  // except for some random blackout dates
  const start = new Date(startDate);
  const end = new Date(endDate);
  const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  
  // Check minimum and maximum night requirements
  if (nights < property.availability.minNights || nights > property.availability.maxNights) {
    return false;
  }
  
  return true;
};

export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export const calculateNights = (checkIn, checkOut) => {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
};

export const getRandomProperties = (count = 3, excludeId = null) => {
  let availableProperties = properties;
  if (excludeId) {
    availableProperties = properties.filter(p => p.id !== excludeId);
  }
  
  const shuffled = [...availableProperties].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getPropertyAverageRating = (propertyId) => {
  const property = getPropertyById(propertyId);
  return property ? property.rating : 0;
};

export const getPropertyReviewStats = (propertyId) => {
  const propertyReviews = getReviewsByPropertyId(propertyId);
  const property = getPropertyById(propertyId);
  
  if (!propertyReviews.length || !property) {
    return {
      averageRating: property?.rating || 0,
      totalReviews: property?.reviewCount || 0,
      ratingBreakdown: {
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0
      }
    };
  }
  
  const ratingBreakdown = propertyReviews.reduce((acc, review) => {
    acc[review.rating] = (acc[review.rating] || 0) + 1;
    return acc;
  }, { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });
  
  const totalReviews = propertyReviews.length;
  const averageRating = propertyReviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;
  
  return {
    averageRating: Number(averageRating.toFixed(1)),
    totalReviews,
    ratingBreakdown
  };
};

// Search and filter functions
export const getPopularDestinations = () => {
  return destinations.slice(0, 6);
};

export const searchPropertiesAdvanced = (filters) => {
  let results = searchProperties(filters);
  
  // Sort results
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'price-low':
        results.sort((a, b) => a.pricePerNight - b.pricePerNight);
        break;
      case 'price-high':
        results.sort((a, b) => b.pricePerNight - a.pricePerNight);
        break;
      case 'rating':
        results.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        results.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        // Default sorting by relevance (rating + review count)
        results.sort((a, b) => {
          const scoreA = a.rating * Math.log(a.reviewCount + 1);
          const scoreB = b.rating * Math.log(b.reviewCount + 1);
          return scoreB - scoreA;
        });
    }
  }
  
  return results;
};

export const getFilterOptions = () => {
  return {
    priceRanges: [
      { min: 0, max: 50, label: 'Under $50' },
      { min: 50, max: 100, label: '$50 - $100' },
      { min: 100, max: 200, label: '$100 - $200' },
      { min: 200, max: 500, label: '$200 - $500' },
      { min: 500, max: null, label: '$500+' }
    ],
    popularAmenities: [
      'WiFi',
      'Kitchen',
      'Washer',
      'Dryer',
      'Air conditioning',
      'Heating',
      'Pool',
      'Hot tub',
      'Parking',
      'Gym',
      'Elevator',
      'Fireplace',
      'BBQ grill',
      'Workspace'
    ],
    sortOptions: [
      { value: 'relevance', label: 'Relevance' },
      { value: 'price-low', label: 'Price: Low to High' },
      { value: 'price-high', label: 'Price: High to Low' },
      { value: 'rating', label: 'Highest Rated' },
      { value: 'reviews', label: 'Most Reviews' }
    ]
  };
};

const staybnbDataUtils = {
  staybnbProperties: properties,
  staybnbHosts: hosts,
  staybnbReviews: reviews,
  staybnbDestinations: destinations,
  propertyTypes,
  categories,
  getPropertyById,
  getHostById,
  getReviewsByPropertyId,
  searchProperties,
  calculateTotalPrice,
  getFeaturedProperties,
  getPropertiesByCategory,
  getPropertiesByHost,
  getAvailableDates,
  formatCurrency,
  formatDate,
  calculateNights,
  getRandomProperties,
  getPropertyAverageRating,
  getPropertyReviewStats,
  getPopularDestinations,
  searchPropertiesAdvanced,
  getFilterOptions
};

export default staybnbDataUtils;
