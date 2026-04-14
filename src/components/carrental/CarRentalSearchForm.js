import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaSearch } from 'react-icons/fa';
import { rentalLocations, validateRentalDates } from '../../utils/carRentalData';

const CarRentalSearchForm = ({ initialData = {}, onSearch, className = '' }) => {
  const router = useRouter();
  const [searchData, setSearchData] = useState({
    pickupLocation: initialData.pickupLocation || '',
    returnLocation: initialData.returnLocation || '',
    pickupDate: initialData.pickupDate || '',
    pickupTime: initialData.pickupTime || '10:00',
    returnDate: initialData.returnDate || '',
    returnTime: initialData.returnTime || '10:00',
    age: initialData.age || '25'
  });

  const [errors, setErrors] = useState({});
  const [sameLocation, setSameLocation] = useState(true);

  // Ensure English locale for date inputs
  useEffect(() => {
    // Set the HTML document language to English
    if (typeof document !== 'undefined') {
      document.documentElement.lang = 'en-US';
    }
  }, []);

  const handleInputChange = (field, value) => {
    setSearchData(prev => ({ ...prev, [field]: value }));
    
    // Clear related errors when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }

    // Auto-set return location to pickup location if same location is checked
    if (field === 'pickupLocation' && sameLocation) {
      setSearchData(prev => ({ ...prev, returnLocation: value }));
    }
  };

  const handleSameLocationChange = (checked) => {
    setSameLocation(checked);
    if (checked) {
      setSearchData(prev => ({ ...prev, returnLocation: prev.pickupLocation }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!searchData.pickupLocation) {
      newErrors.pickupLocation = 'Please select a pickup location';
    }

    if (!searchData.returnLocation) {
      newErrors.returnLocation = 'Please select a return location';
    }

    if (!searchData.pickupDate) {
      newErrors.pickupDate = 'Please select a pickup date';
    }

    if (!searchData.returnDate) {
      newErrors.returnDate = 'Please select a return date';
    }

    if (searchData.pickupDate && searchData.returnDate) {
      const validation = validateRentalDates(
        `${searchData.pickupDate}T${searchData.pickupTime}:00`,
        `${searchData.returnDate}T${searchData.returnTime}:00`
      );
      
      if (!validation.isValid) {
        validation.errors.forEach(error => {
          if (error.includes('pickup')) {
            newErrors.pickupDate = error;
          } else if (error.includes('return')) {
            newErrors.returnDate = error;
          } else {
            newErrors.general = error;
          }
        });
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const searchParams = {
      pickupLocation: searchData.pickupLocation,
      returnLocation: searchData.returnLocation,
      pickupDate: searchData.pickupDate,
      pickupTime: searchData.pickupTime,
      returnDate: searchData.returnDate,
      returnTime: searchData.returnTime,
      age: searchData.age
    };

    if (onSearch) {
      onSearch(searchParams);
    } else {
      const params = new URLSearchParams(searchParams);
      router.push(`/carrental/search?${params.toString()}`);
    }
  };

  const getMinDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const getMinReturnDate = () => {
    return searchData.pickupDate || getMinDate();
  };

  const locationOptions = rentalLocations.map(location => ({
    value: location.id,
    label: location.name,
    type: location.type
  }));

  const airportLocations = locationOptions.filter(loc => loc.type === 'airport');
  const cityLocations = locationOptions.filter(loc => loc.type === 'city');

  return (
    <form onSubmit={handleSearch} className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Pickup Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FaMapMarkerAlt className="inline mr-2 text-blue-600" />
            Pickup Location
          </label>
          <select
            value={searchData.pickupLocation}
            onChange={(e) => handleInputChange('pickupLocation', e.target.value)}
            className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white ${
              errors.pickupLocation ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select pickup location</option>
            
            <optgroup label="🛫 Airport Locations">
              {airportLocations.map(location => (
                <option key={location.value} value={location.value}>
                  {location.label}
                </option>
              ))}
            </optgroup>
            
            <optgroup label="🏙️ City Locations">
              {cityLocations.map(location => (
                <option key={location.value} value={location.value}>
                  {location.label}
                </option>
              ))}
            </optgroup>
          </select>
          {errors.pickupLocation && (
            <p className="text-red-500 text-sm mt-1">{errors.pickupLocation}</p>
          )}
        </div>

        {/* Return Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FaMapMarkerAlt className="inline mr-2 text-green-600" />
            Return Location
          </label>
          
          <div className="mb-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={sameLocation}
                onChange={(e) => handleSameLocationChange(e.target.checked)}
                className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600">Return to same location</span>
            </label>
          </div>

          <select
            value={searchData.returnLocation}
            onChange={(e) => handleInputChange('returnLocation', e.target.value)}
            disabled={sameLocation}
            className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 ${
              sameLocation ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
            } ${errors.returnLocation ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Select return location</option>
            
            <optgroup label="🛫 Airport Locations">
              {airportLocations.map(location => (
                <option key={location.value} value={location.value}>
                  {location.label}
                </option>
              ))}
            </optgroup>
            
            <optgroup label="🏙️ City Locations">
              {cityLocations.map(location => (
                <option key={location.value} value={location.value}>
                  {location.label}
                </option>
              ))}
            </optgroup>
          </select>
          {errors.returnLocation && (
            <p className="text-red-500 text-sm mt-1">{errors.returnLocation}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Pickup Date & Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FaCalendarAlt className="inline mr-2 text-blue-600" />
            Pickup Date & Time
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="date"
              value={searchData.pickupDate}
              min={getMinDate()}
              onChange={(e) => handleInputChange('pickupDate', e.target.value)}
              lang="en-US"
              data-date-format="MM/DD/YYYY"
              placeholder="MM/DD/YYYY"
              className={`px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white ${
                errors.pickupDate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <input
              type="time"
              value={searchData.pickupTime}
              onChange={(e) => handleInputChange('pickupTime', e.target.value)}
              className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
            />
          </div>
          {errors.pickupDate && (
            <p className="text-red-500 text-sm mt-1">{errors.pickupDate}</p>
          )}
        </div>

        {/* Return Date & Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FaCalendarAlt className="inline mr-2 text-green-600" />
            Return Date & Time
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="date"
              value={searchData.returnDate}
              min={getMinReturnDate()}
              onChange={(e) => handleInputChange('returnDate', e.target.value)}
              lang="en-US"
              data-date-format="MM/DD/YYYY"
              placeholder="MM/DD/YYYY"
              className={`px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white ${
                errors.returnDate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <input
              type="time"
              value={searchData.returnTime}
              onChange={(e) => handleInputChange('returnTime', e.target.value)}
              className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
            />
          </div>
          {errors.returnDate && (
            <p className="text-red-500 text-sm mt-1">{errors.returnDate}</p>
          )}
        </div>

        {/* Driver Age */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Driver's Age
          </label>
          <select
            value={searchData.age}
            onChange={(e) => handleInputChange('age', e.target.value)}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
          >
            <option value="18">18-24 years</option>
            <option value="25">25-64 years</option>
            <option value="65">65+ years</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Age restrictions may apply for certain vehicles
          </p>
        </div>
      </div>

      {/* General Errors */}
      {errors.general && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{errors.general}</p>
        </div>
      )}

      {/* Search Button */}
      <button
        type="submit"
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
      >
        <FaSearch className="text-lg" />
        <span className="text-lg">Search Vehicles</span>
      </button>

      {/* Additional Info */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          🚗 Over {rentalLocations.length} locations worldwide • 
          ⭐ Rated 4.5/5 by customers • 
          🔒 Secure booking guaranteed
        </p>
      </div>
    </form>
  );
};

export default CarRentalSearchForm;
