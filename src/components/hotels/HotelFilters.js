import React, { useState, useEffect } from 'react';
import { FaFilter, FaTimes, FaCheck, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { starRatings, amenities } from '../../utils/hotelData';

const HotelFilters = ({ 
  onFiltersChange, 
  initialFilters = {}, 
  hotelData = [], 
  className = '' 
}) => {
  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 1000 },
    starRating: [],
    guestRating: 0,
    amenities: [],
    freeCancellation: false,
    ...initialFilters
  });

  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    stars: true,
    rating: true,
    amenities: false,
    policies: false
  });

  // Calculate price range from hotel data
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

  useEffect(() => {
    if (hotelData.length > 0) {
      const prices = hotelData.map(hotel => hotel.priceFrom);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      setPriceRange({ min: minPrice, max: maxPrice });
      
      // Update filters if they haven't been set
      if (filters.priceRange.min === 0 && filters.priceRange.max === 1000) {
        setFilters(prev => ({
          ...prev,
          priceRange: { min: minPrice, max: maxPrice }
        }));
      }
    }
  }, [hotelData]);

  // Update parent component when filters change
  useEffect(() => {
    onFiltersChange?.(filters);
  }, [filters, onFiltersChange]);

  // Handle filter changes
  const updateFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Handle array filters (star rating, amenities)
  const toggleArrayFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter(item => item !== value)
        : [...prev[key], value]
    }));
  };

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({
      priceRange: { min: priceRange.min, max: priceRange.max },
      starRating: [],
      guestRating: 0,
      amenities: [],
      freeCancellation: false
    });
  };

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Count active filters
  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.starRating.length > 0) count++;
    if (filters.guestRating > 0) count++;
    if (filters.amenities.length > 0) count++;
    if (filters.freeCancellation) count++;
    if (filters.priceRange.min > priceRange.min || filters.priceRange.max < priceRange.max) count++;
    return count;
  };

  const FilterSection = ({ title, isExpanded, onToggle, children }) => (
    <div className="border-b border-gray-200 pb-4 mb-4 last:border-b-0">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left text-lg font-medium text-gray-900 mb-3 hover:text-blue-600 transition-colors"
        data-testid={`filter-section-${title.toLowerCase().replace(/\s+/g, '-')}`}
      >
        {title}
        {isExpanded ? (
          <FaChevronUp className="h-4 w-4 text-gray-500" />
        ) : (
          <FaChevronDown className="h-4 w-4 text-gray-500" />
        )}
      </button>
      {isExpanded && children}
    </div>
  );

  const filtersContent = (
    <div className="space-y-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <FaFilter className="mr-2 text-blue-600" />
          Filters
          {getActiveFilterCount() > 0 && (
            <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
              {getActiveFilterCount()}
            </span>
          )}
        </h3>
        {getActiveFilterCount() > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            data-testid="clear-all-filters"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Price Range */}
      <FilterSection
        title="Price per night"
        isExpanded={expandedSections.price}
        onToggle={() => toggleSection('price')}
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-600 mb-1">Min</label>
              <input
                type="number"
                value={filters.priceRange.min}
                onChange={(e) => updateFilter('priceRange', {
                  ...filters.priceRange,
                  min: Math.max(0, parseInt(e.target.value) || 0)
                })}
                className="w-full p-2 border border-gray-300 rounded text-sm bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                data-testid="price-min-input"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-600 mb-1">Max</label>
              <input
                type="number"
                value={filters.priceRange.max}
                onChange={(e) => updateFilter('priceRange', {
                  ...filters.priceRange,
                  max: parseInt(e.target.value) || priceRange.max
                })}
                className="w-full p-2 border border-gray-300 rounded text-sm bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                data-testid="price-max-input"
              />
            </div>
          </div>
          <div className="text-xs text-gray-500">
            Range: ${priceRange.min} - ${priceRange.max}
          </div>
        </div>
      </FilterSection>

      {/* Star Rating */}
      <FilterSection
        title="Star rating"
        isExpanded={expandedSections.stars}
        onToggle={() => toggleSection('stars')}
      >
        <div className="space-y-2">
          {starRatings.map((rating) => (
            <label key={rating.value} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
              <input
                type="checkbox"
                checked={filters.starRating.includes(rating.value)}
                onChange={() => toggleArrayFilter('starRating', rating.value)}
                className="mr-3 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                data-testid={`star-rating-${rating.value}`}
              />
              <span className="text-sm text-gray-700">{rating.label}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Guest Rating */}
      <FilterSection
        title="Guest rating"
        isExpanded={expandedSections.rating}
        onToggle={() => toggleSection('rating')}
      >
        <div className="space-y-2">
          {[4.5, 4.0, 3.5, 3.0].map((rating) => (
            <label key={rating} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
              <input
                type="radio"
                name="guestRating"
                value={rating}
                checked={filters.guestRating === rating}
                onChange={(e) => updateFilter('guestRating', parseFloat(e.target.value))}
                className="mr-3 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                data-testid={`guest-rating-${rating}`}
              />
              <span className="text-sm text-gray-700">{rating}+ stars</span>
            </label>
          ))}
          <label className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
            <input
              type="radio"
              name="guestRating"
              value={0}
              checked={filters.guestRating === 0}
              onChange={(e) => updateFilter('guestRating', parseFloat(e.target.value))}
              className="mr-3 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              data-testid="guest-rating-any"
            />
            <span className="text-sm text-gray-700">Any rating</span>
          </label>
        </div>
      </FilterSection>

      {/* Amenities */}
      <FilterSection
        title="Amenities"
        isExpanded={expandedSections.amenities}
        onToggle={() => toggleSection('amenities')}
      >
        <div className="space-y-2">
          {amenities.slice(0, 8).map((amenity) => (
            <label key={amenity} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
              <input
                type="checkbox"
                checked={filters.amenities.includes(amenity)}
                onChange={() => toggleArrayFilter('amenities', amenity)}
                className="mr-3 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                data-testid={`amenity-${amenity.toLowerCase().replace(/\s+/g, '-')}`}
              />
              <span className="text-sm text-gray-700">{amenity}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Booking Policies */}
      <FilterSection
        title="Booking policies"
        isExpanded={expandedSections.policies}
        onToggle={() => toggleSection('policies')}
      >
        <div className="space-y-2">
          <label className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded">
            <input
              type="checkbox"
              checked={filters.freeCancellation}
              onChange={(e) => updateFilter('freeCancellation', e.target.checked)}
              className="mr-3 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              data-testid="free-cancellation-filter"
            />
            <span className="text-sm text-gray-700">Free cancellation</span>
          </label>
        </div>
      </FilterSection>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setShowMobileFilters(true)}
          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors"
          data-testid="mobile-filters-button"
        >
          <FaFilter className="h-4 w-4 text-gray-600" />
          <span className="text-gray-700 font-medium">Filters</span>
          {getActiveFilterCount() > 0 && (
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
              {getActiveFilterCount()}
            </span>
          )}
        </button>
      </div>

      {/* Desktop Filters */}
      <div className={`hidden lg:block bg-white rounded-lg shadow-sm p-6 ${className}`} data-testid="hotel-filters">
        {filtersContent}
      </div>

      {/* Mobile Filters Modal */}
      {showMobileFilters && (
        <div className="lg:hidden fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-50" 
              onClick={() => setShowMobileFilters(false)}
            />
            
            {/* Modal */}
            <div className="relative bg-white w-full max-w-sm ml-auto min-h-screen flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  data-testid="close-mobile-filters"
                >
                  <FaTimes className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              
              {/* Content */}
              <div className="flex-1 p-6 overflow-y-auto">
                {filtersContent}
              </div>
              
              {/* Footer */}
              <div className="border-t border-gray-200 p-6">
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                  data-testid="apply-mobile-filters"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HotelFilters; 