// Car Rental utility functions
import staticCarRentalData from '../data/staticCarRentalData';

const {
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
} = staticCarRentalData;

// Export all data and functions
export {
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

// Additional utility functions

export const getPopularVehicles = (limit = 6) => {
  return vehicles
    .sort((a, b) => b.reviews.rating - a.reviews.rating)
    .slice(0, limit);
};

export const getFeaturedVehicles = (limit = 4) => {
  return vehicles
    .filter(vehicle => vehicle.reviews.rating >= 4.5)
    .sort((a, b) => b.reviews.count - a.reviews.count)
    .slice(0, limit);
};

export const getVehiclesByLocation = (locationId) => {
  return vehicles.filter(vehicle => 
    vehicle.availability[locationId] && vehicle.availability[locationId] > 0
  );
};

export const getLocationsByType = (type) => {
  return rentalLocations.filter(location => location.type === type);
};

export const getAirportLocations = () => {
  return getLocationsByType('airport');
};

export const getCityLocations = () => {
  return getLocationsByType('city');
};

export const searchLocations = (query) => {
  const searchTerm = query.toLowerCase();
  return rentalLocations.filter(location =>
    location.name.toLowerCase().includes(searchTerm) ||
    location.address.toLowerCase().includes(searchTerm)
  );
};

export const getVehicleFeatures = (vehicleId) => {
  const vehicle = getVehicleById(vehicleId);
  return vehicle ? vehicle.features : [];
};

export const getVehicleSpecifications = (vehicleId) => {
  const vehicle = getVehicleById(vehicleId);
  return vehicle ? vehicle.specifications : {};
};

export const isVehicleAvailable = (vehicleId, locationId) => {
  const vehicle = getVehicleById(vehicleId);
  return vehicle && 
         vehicle.availability[locationId] && 
         vehicle.availability[locationId] > 0;
};

export const getVehicleAvailabilityCount = (vehicleId, locationId) => {
  const vehicle = getVehicleById(vehicleId);
  return vehicle && vehicle.availability[locationId] ? vehicle.availability[locationId] : 0;
};

export const calculateDays = (pickupDate, returnDate) => {
  const pickup = new Date(pickupDate);
  const returnD = new Date(returnDate);
  const diffTime = Math.abs(returnD - pickup);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(1, diffDays); // Minimum 1 day
};

export const getRecommendedVehicles = (category, excludeId, limit = 3) => {
  return vehicles
    .filter(vehicle => 
      vehicle.category === category && 
      vehicle.id !== excludeId
    )
    .sort((a, b) => b.reviews.rating - a.reviews.rating)
    .slice(0, limit);
};

export const getVehiclesByPriceRange = (minPrice, maxPrice) => {
  return vehicles.filter(vehicle => 
    vehicle.pricing.dailyRate >= minPrice && 
    vehicle.pricing.dailyRate <= maxPrice
  );
};

export const getVehiclesBySeats = (minSeats) => {
  return vehicles.filter(vehicle => vehicle.seats >= minSeats);
};

export const getVehiclesByTransmission = (transmission) => {
  return vehicles.filter(vehicle => 
    vehicle.transmission.toLowerCase() === transmission.toLowerCase()
  );
};

export const getVehiclesByFuelType = (fuelType) => {
  return vehicles.filter(vehicle => 
    vehicle.fuelType.toLowerCase() === fuelType.toLowerCase()
  );
};

export const sortVehicles = (vehicleList, sortBy) => {
  switch (sortBy) {
    case 'price-low':
      return [...vehicleList].sort((a, b) => a.pricing.dailyRate - b.pricing.dailyRate);
    case 'price-high':
      return [...vehicleList].sort((a, b) => b.pricing.dailyRate - a.pricing.dailyRate);
    case 'rating':
      return [...vehicleList].sort((a, b) => b.reviews.rating - a.reviews.rating);
    case 'name':
      return [...vehicleList].sort((a, b) => a.name.localeCompare(b.name));
    case 'fuel-economy':
      return [...vehicleList].sort((a, b) => {
        const aEconomy = parseInt(a.specifications.fuelEconomy.split('/')[1]);
        const bEconomy = parseInt(b.specifications.fuelEconomy.split('/')[1]);
        return bEconomy - aEconomy;
      });
    default:
      return vehicleList;
  }
};

export const getAddOnById = (addOnId) => {
  return addOns.find(addOn => addOn.id === addOnId);
};

export const getInsuranceById = (insuranceId) => {
  return insuranceOptions.find(insurance => insurance.id === insuranceId);
};

export const getPackageById = (packageId) => {
  return rentalPackages.find(pkg => pkg.id === packageId);
};

export const isPackageApplicable = (packageId, category, days, pickupDate) => {
  const pkg = getPackageById(packageId);
  if (!pkg) return false;

  // Check minimum days
  if (days < pkg.minDays) return false;

  // Check category
  if (!pkg.categories.includes(category)) return false;

  // Check valid days
  if (pkg.validDays[0] !== 'all') {
    const dayOfWeek = new Date(pickupDate).toLocaleDateString('en-US', { weekday: 'long' });
    if (!pkg.validDays.includes(dayOfWeek)) return false;
  }

  return true;
};

export const calculateDiscountedPrice = (originalPrice, packageId, category, days, pickupDate) => {
  if (!isPackageApplicable(packageId, category, days, pickupDate)) {
    return originalPrice;
  }

  const pkg = getPackageById(packageId);
  const discount = pkg ? pkg.discount : 0;
  return originalPrice * (1 - discount);
};

export const getAvailablePackages = (category, days, pickupDate) => {
  return rentalPackages.filter(pkg => 
    isPackageApplicable(pkg.id, category, days, pickupDate)
  );
};

export const generateBookingReference = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const validateRentalDates = (pickupDate, returnDate) => {
  const pickup = new Date(pickupDate);
  const returnD = new Date(returnDate);
  const today = new Date();
  
  // Remove time component for comparison
  today.setHours(0, 0, 0, 0);
  pickup.setHours(0, 0, 0, 0);
  returnD.setHours(0, 0, 0, 0);

  const errors = [];

  if (pickup < today) {
    errors.push('Pickup date cannot be in the past');
  }

  if (returnD <= pickup) {
    errors.push('Return date must be after pickup date');
  }

  const maxAdvanceDays = 365; // 1 year in advance
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + maxAdvanceDays);

  if (pickup > maxDate) {
    errors.push('Pickup date cannot be more than 1 year in advance');
  }

  const maxRentalDays = 90; // Maximum 90 days rental
  const rentalDays = calculateDays(pickupDate, returnDate);
  if (rentalDays > maxRentalDays) {
    errors.push('Rental period cannot exceed 90 days');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const formatDateTime = (date, includeTime = false) => {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };

  if (includeTime) {
    options.hour = '2-digit';
    options.minute = '2-digit';
  }

  return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
};

export const getBusinessHours = (locationId) => {
  const location = getLocationById(locationId);
  return location ? location.hours : null;
};

export const isLocationOpen = (locationId, dateTime = new Date()) => {
  const location = getLocationById(locationId);
  if (!location) return false;

  const hours = location.hours;
  if (hours.weekdays === '24/7' && hours.weekends === '24/7') {
    return true;
  }

  // For simplicity, assume all days follow weekday hours unless it's weekend
  const dayOfWeek = dateTime.getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  
  if (isWeekend && hours.weekends === '24/7') {
    return true;
  }
  
  if (!isWeekend && hours.weekdays === '24/7') {
    return true;
  }

  // For detailed hour checking, you would parse the time strings
  // This is simplified for the demo
  return true;
};

export const getDistanceToLocation = (userLat, userLng, locationId) => {
  const location = getLocationById(locationId);
  if (!location || !location.coordinates) return null;

  // Haversine formula for distance calculation
  const R = 3959; // Earth's radius in miles
  const dLat = (location.coordinates.lat - userLat) * Math.PI / 180;
  const dLng = (location.coordinates.lng - userLng) * Math.PI / 180;
  
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(userLat * Math.PI / 180) * Math.cos(location.coordinates.lat * Math.PI / 180) *
            Math.sin(dLng/2) * Math.sin(dLng/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;

  return Math.round(distance * 10) / 10; // Round to 1 decimal place
};

export const getVehicleStats = () => {
  const totalVehicles = vehicles.length;
  const categoryCounts = {};
  const brandCounts = {};
  
  vehicles.forEach(vehicle => {
    categoryCounts[vehicle.category] = (categoryCounts[vehicle.category] || 0) + 1;
    brandCounts[vehicle.brand] = (brandCounts[vehicle.brand] || 0) + 1;
  });

  const averageRating = vehicles.reduce((sum, v) => sum + v.reviews.rating, 0) / totalVehicles;
  const averagePrice = vehicles.reduce((sum, v) => sum + v.pricing.dailyRate, 0) / totalVehicles;

  return {
    totalVehicles,
    categoryCounts,
    brandCounts,
    averageRating: Math.round(averageRating * 10) / 10,
    averagePrice: Math.round(averagePrice * 100) / 100
  };
};

export const getLocationStats = () => {
  const totalLocations = rentalLocations.length;
  const airportCount = getAirportLocations().length;
  const cityCount = getCityLocations().length;

  return {
    totalLocations,
    airportCount,
    cityCount
  };
};

export const searchAdvanced = (filters) => {
  let results = [...vehicles];

  // Location filter
  if (filters.location) {
    results = results.filter(vehicle => 
      isVehicleAvailable(vehicle.id, filters.location)
    );
  }

  // Category filter
  if (filters.category && filters.category !== 'all') {
    results = results.filter(vehicle => vehicle.category === filters.category);
  }

  // Price range filter
  if (filters.priceRange) {
    const { min, max } = filters.priceRange;
    results = results.filter(vehicle => 
      vehicle.pricing.dailyRate >= min && vehicle.pricing.dailyRate <= max
    );
  }

  // Seats filter
  if (filters.seats) {
    results = results.filter(vehicle => vehicle.seats >= filters.seats);
  }

  // Transmission filter
  if (filters.transmission && filters.transmission !== 'all') {
    results = results.filter(vehicle => 
      vehicle.transmission.toLowerCase() === filters.transmission.toLowerCase()
    );
  }

  // Fuel type filter
  if (filters.fuelType && filters.fuelType !== 'all') {
    results = results.filter(vehicle => 
      vehicle.fuelType.toLowerCase() === filters.fuelType.toLowerCase()
    );
  }

  // Brand filter
  if (filters.brand && filters.brand !== 'all') {
    results = results.filter(vehicle => vehicle.brand === filters.brand);
  }

  // Features filter
  if (filters.features && filters.features.length > 0) {
    results = results.filter(vehicle =>
      filters.features.every(feature =>
        vehicle.features.some(vehicleFeature =>
          vehicleFeature.toLowerCase().includes(feature.toLowerCase())
        )
      )
    );
  }

  // Rating filter
  if (filters.minRating) {
    results = results.filter(vehicle => vehicle.reviews.rating >= filters.minRating);
  }

  // Sort results
  if (filters.sortBy) {
    results = sortVehicles(results, filters.sortBy);
  }

  return results;
};

const carRentalDataUtils = {
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
  formatDate,
  getPopularVehicles,
  getFeaturedVehicles,
  getVehiclesByLocation,
  getLocationsByType,
  getAirportLocations,
  getCityLocations,
  searchLocations,
  getVehicleFeatures,
  getVehicleSpecifications,
  isVehicleAvailable,
  getVehicleAvailabilityCount,
  calculateDays,
  getRecommendedVehicles,
  getVehiclesByPriceRange,
  getVehiclesBySeats,
  getVehiclesByTransmission,
  getVehiclesByFuelType,
  sortVehicles,
  getAddOnById,
  getInsuranceById,
  getPackageById,
  isPackageApplicable,
  calculateDiscountedPrice,
  getAvailablePackages,
  generateBookingReference,
  validateRentalDates,
  formatDateTime,
  getBusinessHours,
  isLocationOpen,
  getDistanceToLocation,
  getVehicleStats,
  getLocationStats,
  searchAdvanced
};

export default carRentalDataUtils;
