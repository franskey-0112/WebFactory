import React from 'react';
import { FaFilter, FaTimes } from 'react-icons/fa';
import masterTicketDataUtils from '../../utils/masterTicketData';

const SearchFilters = ({ filters, onFilterChange, onClearFilters, isOpen, onToggle }) => {
  const { getCategories, getCities, getFilters } = masterTicketDataUtils;
  
  const categories = getCategories();
  const cities = getCities();
  const filterOptions = getFilters();

  const handleFilterChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const activeFiltersCount = Object.values(filters).filter(value => value && value !== 'all').length;

  return (
    <div className="bg-white border-b border-gray-200 sticky top-20 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter Toggle Button (Mobile) */}
        <div className="lg:hidden py-4">
          <button
            onClick={onToggle}
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
          >
            <FaFilter />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {/* Filter Options */}
        <div className={`${isOpen ? 'block' : 'hidden'} lg:block py-4`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={filters.category || 'all'}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.icon} {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* City Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <select
                value={filters.city || 'all'}
                onChange={(e) => handleFilterChange('city', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Cities</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}, {city.state} ({city.eventCount})
                  </option>
                ))}
              </select>
            </div>

            {/* Date Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <select
                value={filters.date || 'all'}
                onChange={(e) => handleFilterChange('date', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Dates</option>
                {filterOptions.dates.map((dateFilter) => (
                  <option key={dateFilter.id} value={dateFilter.id}>
                    {dateFilter.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price Range
              </label>
              <select
                value={filters.priceRange || 'all'}
                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Prices</option>
                {filterOptions.priceRanges.map((priceRange) => (
                  <option key={priceRange.id} value={priceRange.id}>
                    {priceRange.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Venue Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Venue
              </label>
              <select
                value={filters.venue || 'all'}
                onChange={(e) => handleFilterChange('venue', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Venues</option>
                {filterOptions.venues.map((venue) => (
                  <option key={venue.id} value={venue.id}>
                    {venue.name} - {venue.city}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <button
                onClick={onClearFilters}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <FaTimes />
                <span>Clear All</span>
              </button>
            </div>
          </div>

          {/* Active Filters Display */}
          {activeFiltersCount > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-gray-600">Active filters:</span>
                {Object.entries(filters).map(([key, value]) => {
                  if (!value || value === 'all') return null;
                  
                  let displayValue = value;
                  if (key === 'category') {
                    const category = categories.find(c => c.id === value);
                    displayValue = category ? `${category.icon} ${category.name}` : value;
                  } else if (key === 'city') {
                    const city = cities.find(c => c.id === value);
                    displayValue = city ? `${city.name}, ${city.state}` : value;
                  } else if (key === 'date') {
                    const dateFilter = filterOptions.dates.find(d => d.id === value);
                    displayValue = dateFilter ? dateFilter.name : value;
                  } else if (key === 'priceRange') {
                    const priceFilter = filterOptions.priceRanges.find(p => p.id === value);
                    displayValue = priceFilter ? priceFilter.name : value;
                  } else if (key === 'venue') {
                    const venue = filterOptions.venues.find(v => v.id === value);
                    displayValue = venue ? venue.name : value;
                  }

                  return (
                    <span
                      key={key}
                      className="inline-flex items-center space-x-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                    >
                      <span>{displayValue}</span>
                      <button
                        onClick={() => handleFilterChange(key, 'all')}
                        className="hover:text-blue-600"
                      >
                        <FaTimes size={12} />
                      </button>
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
