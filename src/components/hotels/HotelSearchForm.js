import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaSearch, FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaExchangeAlt } from 'react-icons/fa';
import { destinations } from '../../utils/hotelData';

const HotelSearchForm = ({ initialValues = {}, onSearch, className = '' }) => {
  const router = useRouter();
  
  // 固定默认日期
  const getDefaultDates = () => {
    const tomorrow = new Date('2024-12-20');
    const dayAfterTomorrow = new Date('2024-12-22');
    return {
      checkIn: tomorrow.toISOString().split('T')[0],
      checkOut: dayAfterTomorrow.toISOString().split('T')[0]
    };
  };

  // Form state
  const [formData, setFormData] = useState({
    destination: initialValues.destination || '',
    checkIn: initialValues.checkIn || getDefaultDates().checkIn,
    checkOut: initialValues.checkOut || getDefaultDates().checkOut,
    guests: initialValues.guests || 2,
    rooms: initialValues.rooms || 1
  });

  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);

  // Initialize with default dates if not provided
  useEffect(() => {
    if (!formData.checkIn) {
      setFormData(prev => ({
        ...prev,
        checkIn: getDefaultDates().checkIn
      }));
    }
    
    if (!formData.checkOut) {
      setFormData(prev => ({
        ...prev,
        checkOut: getDefaultDates().checkOut
      }));
    }
  }, []);

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle destination input
  const handleDestinationChange = (value) => {
    handleInputChange('destination', value);
    
    if (value.length > 1) {
      const suggestions = destinations.filter(dest =>
        dest.name.toLowerCase().includes(value.toLowerCase()) ||
        dest.country.toLowerCase().includes(value.toLowerCase())
      );
      setDestinationSuggestions(suggestions);
      setShowDestinationSuggestions(true);
    } else {
      setShowDestinationSuggestions(false);
    }
  };

  // Select destination suggestion
  const selectDestination = (destination) => {
    handleInputChange('destination', destination.name);
    setShowDestinationSuggestions(false);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.destination || !formData.checkIn || !formData.checkOut) {
      alert('Please fill in all required fields');
      return;
    }

    // Validate dates
    const checkInDate = new Date(formData.checkIn);
    const checkOutDate = new Date(formData.checkOut);

    if (checkOutDate <= checkInDate) {
      alert('Check-out date must be after check-in date');
      return;
    }

    // Call onSearch callback if provided
    if (onSearch) {
      onSearch(formData);
    } else {
      // Navigate to search results
      const query = new URLSearchParams({
        destination: formData.destination,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        guests: formData.guests.toString(),
        rooms: formData.rooms.toString()
      });
      
      router.push(`/hotels/search?${query.toString()}`);
    }
  };

  // Calculate nights
  const calculateNights = () => {
    if (formData.checkIn && formData.checkOut) {
      const checkInDate = new Date(formData.checkIn);
      const checkOutDate = new Date(formData.checkOut);
      const diffTime = checkOutDate - checkInDate;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 1;
    }
    return 1;
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <form onSubmit={handleSubmit} data-testid="hotel-search-form">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
          {/* Destination */}
          <div className="lg:col-span-2 relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Destination
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaMapMarkerAlt className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                value={formData.destination}
                onChange={(e) => handleDestinationChange(e.target.value)}
                onFocus={() => formData.destination.length > 1 && setShowDestinationSuggestions(true)}
                onBlur={() => setTimeout(() => setShowDestinationSuggestions(false), 200)}
                placeholder="Where are you going?"
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500"
                data-testid="destination-input"
                required
              />
              
              {/* Destination suggestions */}
              {showDestinationSuggestions && destinationSuggestions.length > 0 && (
                <div className="absolute z-50 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
                  {destinationSuggestions.map((destination) => (
                    <button
                      key={destination.code}
                      type="button"
                      onClick={() => selectDestination(destination)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 border-b border-gray-100 last:border-b-0"
                      data-testid={`destination-suggestion-${destination.code}`}
                    >
                      <FaMapMarkerAlt className="h-4 w-4 text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-900">{destination.name}</div>
                        <div className="text-sm text-gray-500">
                          {destination.country} • {destination.hotels} hotels
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Check-in Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Check-in
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaCalendarAlt className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="date"
                value={formData.checkIn}
                onChange={(e) => handleInputChange('checkIn', e.target.value)}
                min="2024-01-01"
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                data-testid="checkin-date"
                required
              />
            </div>
          </div>

          {/* Check-out Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Check-out
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaCalendarAlt className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="date"
                value={formData.checkOut}
                onChange={(e) => handleInputChange('checkOut', e.target.value)}
                min={formData.checkIn || "2024-01-01"}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                data-testid="checkout-date"
                required
              />
            </div>
          </div>

          {/* Guests & Rooms */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Guests & Rooms
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUsers className="h-4 w-4 text-gray-400" />
                </div>
                <select
                  value={formData.guests}
                  onChange={(e) => handleInputChange('guests', parseInt(e.target.value))}
                  className="w-full pl-10 pr-2 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white text-gray-900"
                  data-testid="guests-select"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <option key={num} value={num}>
                      {num} guest{num !== 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <select
                  value={formData.rooms}
                  onChange={(e) => handleInputChange('rooms', parseInt(e.target.value))}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white text-gray-900"
                  data-testid="rooms-select"
                >
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>
                      {num} room{num !== 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Search Summary */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-600">
            {formData.checkIn && formData.checkOut && (
              <span>
                {calculateNights()} night{calculateNights() !== 1 ? 's' : ''} • {formData.guests} guest{formData.guests !== 1 ? 's' : ''} • {formData.rooms} room{formData.rooms !== 1 ? 's' : ''}
              </span>
            )}
          </div>
          
          {/* Search Button */}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
            data-testid="search-hotels-button"
          >
            <FaSearch className="h-4 w-4" />
            <span>Search Hotels</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default HotelSearchForm; 