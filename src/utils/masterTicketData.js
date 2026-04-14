import staticMasterTicketData from '../data/staticMasterTicketData';

const { 
  fixedDates,
  artists, 
  venues, 
  categories, 
  events, 
  cities, 
  featuredEvents, 
  trendingEvents, 
  seatTypes, 
  filters 
} = staticMasterTicketData;

// Get all events
export const getEvents = () => {
  return events;
};

// Get event by ID
export const getEventById = (id) => {
  return events.find(event => event.id === id);
};

// Search events
export const searchEvents = (query, filters = {}) => {
  let filteredEvents = events;

  // Text search
  if (query && query.trim()) {
    const searchTerm = query.toLowerCase();
    filteredEvents = filteredEvents.filter(event =>
      event.title.toLowerCase().includes(searchTerm) ||
      event.artistName?.toLowerCase().includes(searchTerm) ||
      event.teamHome?.toLowerCase().includes(searchTerm) ||
      event.teamAway?.toLowerCase().includes(searchTerm) ||
      event.city.toLowerCase().includes(searchTerm) ||
      event.venueName.toLowerCase().includes(searchTerm) ||
      event.category.toLowerCase().includes(searchTerm)
    );
  }

  // Category filter
  if (filters.category && filters.category !== 'all') {
    filteredEvents = filteredEvents.filter(event => event.category === filters.category);
  }

  // City filter
  if (filters.city && filters.city !== 'all') {
    filteredEvents = filteredEvents.filter(event => 
      event.city.toLowerCase().replace(/\s+/g, '-') === filters.city
    );
  }

  // Date filter
  if (filters.date && filters.date !== 'all') {
    const dateFilter = getDateFilter(filters.date);
    if (dateFilter && dateFilter.dates) {
      filteredEvents = filteredEvents.filter(event => 
        dateFilter.dates.includes(event.date)
      );
    }
  }

  // Price filter
  if (filters.priceRange && filters.priceRange !== 'all') {
    const priceFilter = getPriceFilter(filters.priceRange);
    if (priceFilter) {
      filteredEvents = filteredEvents.filter(event => 
        event.basePrice >= priceFilter.min && event.basePrice <= priceFilter.max
      );
    }
  }

  // Venue filter
  if (filters.venue && filters.venue !== 'all') {
    filteredEvents = filteredEvents.filter(event => event.venue === filters.venue);
  }

  // Sort by date
  filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

  return filteredEvents;
};

// Get events by category
export const getEventsByCategory = (categoryId) => {
  return events.filter(event => event.category === categoryId);
};

// Get events by artist
export const getEventsByArtist = (artistId) => {
  return events.filter(event => event.artist === artistId);
};

// Get events by venue
export const getEventsByVenue = (venueId) => {
  return events.filter(event => event.venue === venueId);
};

// Get events by city
export const getEventsByCity = (city) => {
  return events.filter(event => 
    event.city.toLowerCase().replace(/\s+/g, '-') === city.toLowerCase()
  );
};

// Get featured events
export const getFeaturedEvents = () => {
  return events.filter(event => featuredEvents.includes(event.id));
};

// Get trending events
export const getTrendingEvents = () => {
  return events.filter(event => trendingEvents.includes(event.id));
};

// Get all artists
export const getArtists = () => {
  return artists;
};

// Get artist by ID
export const getArtistById = (id) => {
  return artists.find(artist => artist.id === id);
};

// Get all venues
export const getVenues = () => {
  return venues;
};

// Get venue by ID
export const getVenueById = (id) => {
  return venues.find(venue => venue.id === id);
};

// Get all categories
export const getCategories = () => {
  return categories;
};

// Get category by ID
export const getCategoryById = (id) => {
  return categories.find(category => category.id === id);
};

// Get all cities
export const getCities = () => {
  return cities;
};

// Get city by ID
export const getCityById = (id) => {
  return cities.find(city => city.id === id);
};

// Get filters
export const getFilters = () => {
  return filters;
};

// Get date filter by ID
export const getDateFilter = (id) => {
  return filters.dates.find(filter => filter.id === id);
};

// Get price filter by ID
export const getPriceFilter = (id) => {
  return filters.priceRanges.find(filter => filter.id === id);
};

// Get seat types
export const getSeatTypes = () => {
  return seatTypes;
};

// Format date
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return date.toLocaleDateString('en-US', options);
};

// Format time
export const formatTime = (timeString) => {
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
};

// Format price
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);
};

// Calculate fees
export const calculateFees = (price, quantity = 1) => {
  const subtotal = price * quantity;
  const serviceFee = subtotal * 0.15; // 15% service fee
  const processingFee = 2.95; // Flat processing fee
  const total = subtotal + serviceFee + processingFee;
  
  return {
    subtotal,
    serviceFee,
    processingFee,
    total
  };
};

// Get available dates (fixed dates for reproducibility)
export const getAvailableDates = () => {
  return fixedDates;
};

// Check if date is in future (based on fixed today date)
export const isFutureDate = (dateString) => {
  const eventDate = new Date(dateString);
  const today = new Date(fixedDates.today);
  return eventDate >= today;
};

// Get events happening today
export const getTodayEvents = () => {
  return events.filter(event => event.date === fixedDates.today);
};

// Get events this week
export const getThisWeekEvents = () => {
  return events.filter(event => fixedDates.thisWeek.includes(event.date));
};

// Get events this month
export const getThisMonthEvents = () => {
  return events.filter(event => fixedDates.thisMonth.includes(event.date));
};

// Generate seat map data
export const generateSeatMap = (event) => {
  const venue = getVenueById(event.venue);
  if (!venue || !venue.sections) return null;

  const seatMap = {};
  
  Object.keys(venue.sections).forEach(sectionKey => {
    const section = venue.sections[sectionKey];
    const eventSeatData = event.seatMap && event.seatMap[sectionKey];
    
    seatMap[sectionKey] = {
      name: section.name,
      rows: section.rows,
      seats: section.seats,
      price: eventSeatData ? eventSeatData.price : event.basePrice * section.priceMultiplier,
      available: eventSeatData ? eventSeatData.available : Math.floor(Math.random() * 500) + 50,
      total: eventSeatData ? eventSeatData.total : Math.floor(Math.random() * 800) + 200,
      priceMultiplier: section.priceMultiplier
    };
  });

  return seatMap;
};

// Book tickets (simulation)
export const bookTickets = (eventId, tickets, customerInfo) => {
  // Simulate booking process
  const bookingId = 'BK' + Date.now() + Math.random().toString(36).substr(2, 6).toUpperCase();
  const event = getEventById(eventId);
  
  if (!event) {
    throw new Error('Event not found');
  }

  const booking = {
    id: bookingId,
    eventId,
    event: {
      title: event.title,
      date: event.date,
      time: event.time,
      venue: event.venueName,
      city: event.city,
      state: event.state
    },
    tickets,
    customerInfo,
    bookingDate: new Date().toISOString(),
    status: 'confirmed',
    total: tickets.reduce((sum, ticket) => sum + (ticket.price * ticket.quantity), 0)
  };

  // In a real app, this would save to database
  return booking;
};

// Search suggestions
export const getSearchSuggestions = (query) => {
  if (!query || query.length < 2) return [];

  const suggestions = [];
  const searchTerm = query.toLowerCase();

  // Artist suggestions
  artists.forEach(artist => {
    if (artist.name.toLowerCase().includes(searchTerm)) {
      suggestions.push({
        type: 'artist',
        id: artist.id,
        name: artist.name,
        image: artist.image
      });
    }
  });

  // Event suggestions
  events.forEach(event => {
    if (event.title.toLowerCase().includes(searchTerm)) {
      suggestions.push({
        type: 'event',
        id: event.id,
        name: event.title,
        date: event.date,
        venue: event.venueName
      });
    }
  });

  // Venue suggestions
  venues.forEach(venue => {
    if (venue.name.toLowerCase().includes(searchTerm)) {
      suggestions.push({
        type: 'venue',
        id: venue.id,
        name: venue.name,
        city: venue.city
      });
    }
  });

  // City suggestions
  cities.forEach(city => {
    if (city.name.toLowerCase().includes(searchTerm)) {
      suggestions.push({
        type: 'city',
        id: city.id,
        name: city.name,
        eventCount: city.eventCount
      });
    }
  });

  return suggestions.slice(0, 8); // Limit to 8 suggestions
};

const masterTicketDataUtils = {
  getEvents,
  getEventById,
  searchEvents,
  getEventsByCategory,
  getEventsByArtist,
  getEventsByVenue,
  getEventsByCity,
  getFeaturedEvents,
  getTrendingEvents,
  getArtists,
  getArtistById,
  getVenues,
  getVenueById,
  getCategories,
  getCategoryById,
  getCities,
  getCityById,
  getFilters,
  getDateFilter,
  getPriceFilter,
  getSeatTypes,
  formatDate,
  formatTime,
  formatPrice,
  calculateFees,
  getAvailableDates,
  isFutureDate,
  getTodayEvents,
  getThisWeekEvents,
  getThisMonthEvents,
  generateSeatMap,
  bookTickets,
  getSearchSuggestions
};

export default masterTicketDataUtils;
