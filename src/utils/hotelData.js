// Import static hotel data
import staticHotelData, { 
  hotelChains, 
  destinations, 
  roomTypes, 
  amenities, 
  starRatings 
} from '../data/staticHotelData.js';

// Directly export static hotel data
export const hotelData = staticHotelData;

// Export other related data
export { hotelChains, destinations, roomTypes, amenities, starRatings };

// Helper function to get hotel by ID
export const getHotelById = (id) => {
  return hotelData.find(hotel => hotel.id === parseInt(id));
};

// Helper function to search hotels by destination
export const searchHotelsByDestination = (destination) => {
  const searchTerm = destination.toLowerCase();
  return hotelData.filter(hotel => 
    hotel.city.toLowerCase().includes(searchTerm) ||
    hotel.country.toLowerCase().includes(searchTerm) ||
    hotel.location.district.toLowerCase().includes(searchTerm)
  );
};

// Helper function to filter hotels by criteria
export const filterHotels = (hotels, filters) => {
  return hotels.filter(hotel => {
    // Filter by star rating
    if (filters.starRating && filters.starRating.length > 0) {
      if (!filters.starRating.includes(hotel.starRating)) {
        return false;
      }
    }

    // Filter by price range
    if (filters.priceRange) {
      if (hotel.priceFrom < filters.priceRange.min || hotel.priceFrom > filters.priceRange.max) {
        return false;
      }
    }

    // Filter by guest rating
    if (filters.guestRating) {
      if (hotel.rating < filters.guestRating) {
        return false;
      }
    }

    // Filter by amenities
    if (filters.amenities && filters.amenities.length > 0) {
      const hasRequiredAmenities = filters.amenities.every(requiredAmenity =>
        hotel.amenities.includes(requiredAmenity)
      );
      if (!hasRequiredAmenities) {
        return false;
      }
    }

    // Filter by room type
    if (filters.roomType) {
      const hasRoomType = hotel.roomTypes.some(room =>
        room.id.includes(filters.roomType) || room.name.toLowerCase().includes(filters.roomType.toLowerCase())
      );
      if (!hasRoomType) {
        return false;
      }
    }

    // Filter by free cancellation
    if (filters.freeCancellation && !hotel.freeCancellation) {
      return false;
    }

    return true;
  });
};

// Helper function to sort hotels
export const sortHotels = (hotels, sortBy) => {
  return [...hotels].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.priceFrom - b.priceFrom;
      case 'price-high':
        return b.priceFrom - a.priceFrom;
      case 'rating':
        return b.rating - a.rating;
      case 'stars':
        return b.starRating - a.starRating;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'recommended':
      default:
        // Recommended sorting: combination of rating, star rating, and review count
        const aScore = (a.rating * 0.4) + (a.starRating * 0.3) + (Math.log(a.reviewCount) * 0.3);
        const bScore = (b.rating * 0.4) + (b.starRating * 0.3) + (Math.log(b.reviewCount) * 0.3);
        return bScore - aScore;
    }
  });
};

// Helper function to get available room types for a hotel
export const getAvailableRoomTypes = (hotelId, checkIn, checkOut, guests) => {
  const hotel = getHotelById(hotelId);
  if (!hotel) return [];

  // Simulate availability check (in real system, this would check against bookings)
  return hotel.roomTypes.filter(room => {
    // Check if room can accommodate the number of guests
    return room.maxGuests >= guests;
  }).map((room, index) => ({
    ...room,
    // Fixed availability based on room type for consistent demo results
    available: getFixedAvailability(room.id, hotelId, index),
    totalPrice: calculateRoomPrice(room.price, checkIn, checkOut)
  }));
};

// Helper function to get fixed availability based on room characteristics
const getFixedAvailability = (roomId, hotelId, roomIndex) => {
  // Create a simple hash from roomId and hotelId to get consistent availability
  const hash = (roomId + hotelId.toString()).split('').reduce((acc, char) => {
    return acc + char.charCodeAt(0);
  }, 0);
  
  // Map to availability ranges based on room type
  const roomType = roomId.toLowerCase();
  
  if (roomType.includes('presidential') || roomType.includes('penthouse')) {
    // Luxury suites: 1-2 available
    return (hash % 2) + 1;
  } else if (roomType.includes('suite') || roomType.includes('executive')) {
    // Suites: 2-4 available
    return (hash % 3) + 2;
  } else if (roomType.includes('deluxe') || roomType.includes('superior')) {
    // Premium rooms: 3-5 available
    return (hash % 3) + 3;
  } else {
    // Standard rooms: 4-8 available
    return (hash % 5) + 4;
  }
};

// Helper function to calculate room price for date range
export const calculateRoomPrice = (basePrice, checkIn, checkOut) => {
  if (!checkIn || !checkOut) return basePrice;
  
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
  
  return basePrice * Math.max(1, nights);
};

// Helper function to get hotels near a location
export const getHotelsNearLocation = (latitude, longitude, radiusKm = 50) => {
  return hotelData.filter(hotel => {
    const distance = calculateDistance(
      latitude, longitude,
      hotel.location.latitude, hotel.location.longitude
    );
    return distance <= radiusKm;
  });
};

// Helper function to calculate distance between two coordinates
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const d = R * c; // Distance in kilometers
  return d;
};

const deg2rad = (deg) => {
  return deg * (Math.PI/180);
};

// Helper function to generate sample reviews
export const generateSampleReviews = (hotelId, count = 10) => {
  const reviewTexts = [
    "Excellent service and beautiful rooms. Highly recommended!",
    "Great location and friendly staff. Will definitely stay again.",
    "Amazing amenities and comfortable beds. Perfect for business trips.",
    "Beautiful hotel with stunning views. The spa was incredible.",
    "Good value for money. Clean rooms and helpful staff.",
    "Perfect location for exploring the city. Great restaurants nearby.",
    "Outstanding customer service and luxurious accommodations.",
    "Wonderful experience overall. The pool area was fantastic.",
    "Very comfortable stay with excellent breakfast options.",
    "Modern hotel with all the amenities you need for a great stay."
  ];

  const reviewerNames = [
    "John D.", "Sarah M.", "Michael R.", "Emily K.", "David L.",
    "Jessica T.", "Robert W.", "Amanda B.", "Chris P.", "Lisa H."
  ];

  return Array.from({ length: count }, (_, index) => ({
    id: `${hotelId}-review-${index + 1}`,
    author: reviewerNames[index % reviewerNames.length],
    rating: Math.floor(Math.random() * 2) + 4, // Random rating between 4-5
    date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    title: `Review ${index + 1}`,
    content: reviewTexts[index % reviewTexts.length],
    helpful: Math.floor(Math.random() * 50) + 1,
    verified: Math.random() > 0.3 // 70% are verified stays
  }));
}; 