import React, { useState } from 'react';
import { FaFilter, FaTimes, FaChevronDown } from 'react-icons/fa';
import { getFilterOptions } from '../../utils/companyCheckData';

const SearchFilters = ({ filters, onFiltersChange, onClearFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    industry: true,
    size: false,
    rating: false,
    location: false
  });

  const filterOptions = getFilterOptions();

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFilterChange = (filterType, value) => {
    onFiltersChange({
      ...filters,
      [filterType]: value
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value && value !== '');

  const clearAllFilters = () => {
    onClearFilters();
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200">
      {/* Filter Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FaFilter className="text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
            {hasActiveFilters && (
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                Active
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear All
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gray-600 hover:text-gray-800"
            >
              {isOpen ? <FaTimes /> : <FaChevronDown />}
            </button>
          </div>
        </div>
      </div>

      {/* Filter Content */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:block`}>
        <div className="p-4 space-y-6">
          {/* Industry Filter */}
          <div>
            <button
              onClick={() => toggleSection('industry')}
              className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
            >
              <span>Industry</span>
              <FaChevronDown 
                className={`transform transition-transform ${
                  expandedSections.industry ? 'rotate-180' : ''
                }`} 
              />
            </button>
            {expandedSections.industry && (
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="industry"
                    value=""
                    checked={!filters.industry}
                    onChange={(e) => handleFilterChange('industry', e.target.value)}
                    className="mr-2 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">All Industries</span>
                </label>
                {filterOptions.industries.map((industry) => (
                  <label key={industry} className="flex items-center">
                    <input
                      type="radio"
                      name="industry"
                      value={industry}
                      checked={filters.industry === industry}
                      onChange={(e) => handleFilterChange('industry', e.target.value)}
                      className="mr-2 text-blue-600"
                    />
                    <span className="text-sm text-gray-700">{industry}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Company Size Filter */}
          <div>
            <button
              onClick={() => toggleSection('size')}
              className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
            >
              <span>Company Size</span>
              <FaChevronDown 
                className={`transform transition-transform ${
                  expandedSections.size ? 'rotate-180' : ''
                }`} 
              />
            </button>
            {expandedSections.size && (
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="size"
                    value=""
                    checked={!filters.size}
                    onChange={(e) => handleFilterChange('size', e.target.value)}
                    className="mr-2 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">All Sizes</span>
                </label>
                {filterOptions.companySizes.map((size) => (
                  <label key={size} className="flex items-center">
                    <input
                      type="radio"
                      name="size"
                      value={size}
                      checked={filters.size === size}
                      onChange={(e) => handleFilterChange('size', e.target.value)}
                      className="mr-2 text-blue-600"
                    />
                    <span className="text-sm text-gray-700">{size}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Rating Filter */}
          <div>
            <button
              onClick={() => toggleSection('rating')}
              className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
            >
              <span>Minimum Rating</span>
              <FaChevronDown 
                className={`transform transition-transform ${
                  expandedSections.rating ? 'rotate-180' : ''
                }`} 
              />
            </button>
            {expandedSections.rating && (
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="rating"
                    value=""
                    checked={!filters.minRating}
                    onChange={(e) => handleFilterChange('minRating', '')}
                    className="mr-2 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">All Ratings</span>
                </label>
                {filterOptions.ratings.map((rating) => (
                  <label key={rating.value} className="flex items-center">
                    <input
                      type="radio"
                      name="rating"
                      value={rating.value}
                      checked={filters.minRating === rating.value}
                      onChange={(e) => handleFilterChange('minRating', parseFloat(e.target.value))}
                      className="mr-2 text-blue-600"
                    />
                    <span className="text-sm text-gray-700">{rating.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Location Filter */}
          <div>
            <button
              onClick={() => toggleSection('location')}
              className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
            >
              <span>Location</span>
              <FaChevronDown 
                className={`transform transition-transform ${
                  expandedSections.location ? 'rotate-180' : ''
                }`} 
              />
            </button>
            {expandedSections.location && (
              <div>
                <input
                  type="text"
                  placeholder="Enter city, state, or country"
                  value={filters.location || ''}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Filter companies by location
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
