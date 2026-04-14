import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import StaybnbHeader from '../../components/staybnb/StaybnbHeader';
import PropertyCard from '../../components/staybnb/PropertyCard';
import CategoryFilter from '../../components/staybnb/CategoryFilter';
import Footer from '../../components/Footer';
import { 
  searchPropertiesAdvanced, 
  getFilterOptions,
  formatCurrency
} from '../../utils/staybnbData';
import { 
  FaFilter, 
  FaTimes, 
  FaSort, 
  FaMapMarkerAlt,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';

const StaybnbSearchPage = () => {
  const router = useRouter();
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  
  // Filter states
  const [filters, setFilters] = useState({
    priceMin: '',
    priceMax: '',
    type: 'any',
    instantBook: false,
    amenities: [],
    minRating: 0
  });

  const { priceRanges, popularAmenities, sortOptions } = getFilterOptions();

  // Extract search parameters from URL
  const searchParams = {
    destination: router.query.destination || '',
    checkIn: router.query.checkIn || '',
    checkOut: router.query.checkOut || '',
    guests: parseInt(router.query.guests) || 1
  };

  // Perform search when parameters change
  useEffect(() => {
    performSearch();
  }, [router.query, selectedCategory, filters, sortBy]);

  const performSearch = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const searchFilters = {
        destination: searchParams.destination,
        guests: searchParams.guests,
        category: selectedCategory,
        type: filters.type !== 'any' ? filters.type : null,
        minPrice: filters.priceMin,
        maxPrice: filters.priceMax,
        instantBook: filters.instantBook,
        amenities: filters.amenities,
        sortBy: sortBy
      };

      const results = searchPropertiesAdvanced(searchFilters);
      
      // Filter by rating if specified
      const filteredResults = filters.minRating > 0 
        ? results.filter(property => property.rating >= filters.minRating)
        : results;
      
      setSearchResults(filteredResults);
      setIsLoading(false);
    }, 300);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleAmenityToggle = (amenity) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const clearFilters = () => {
    setFilters({
      priceMin: '',
      priceMax: '',
      type: 'any',
      instantBook: false,
      amenities: [],
      minRating: 0
    });
    setSortBy('relevance');
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.priceMin || filters.priceMax) count++;
    if (filters.type !== 'any') count++;
    if (filters.instantBook) count++;
    if (filters.amenities.length > 0) count++;
    if (filters.minRating > 0) count++;
    return count;
  };

  const formatSearchTitle = () => {
    if (searchParams.destination) {
      return `Stays in ${searchParams.destination}`;
    }
    if (selectedCategory) {
      return `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1).replace('-', ' ')} stays`;
    }
    return 'Search results';
  };

  return (
    <>
      <Head>
        <title>{formatSearchTitle()} | StayBnB</title>
        <meta name="description" content="Find the perfect accommodation for your trip." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <StaybnbHeader isSearchPage={true} />
        <CategoryFilter 
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          onFiltersClick={() => setIsFiltersOpen(true)}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search Info and Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
                {formatSearchTitle()}
              </h1>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                {searchParams.destination && (
                  <div className="flex items-center space-x-1">
                    <FaMapMarkerAlt className="h-3 w-3" />
                    <span>{searchParams.destination}</span>
                  </div>
                )}
                {searchParams.checkIn && searchParams.checkOut && (
                  <span>
                    {new Date(searchParams.checkIn).toLocaleDateString()} - {new Date(searchParams.checkOut).toLocaleDateString()}
                  </span>
                )}
                <span>{searchParams.guests} guest{searchParams.guests !== 1 ? 's' : ''}</span>
              </div>
              <p className="text-gray-600 mt-1">
                {isLoading ? 'Searching...' : `${searchResults.length} result${searchResults.length !== 1 ? 's' : ''}`}
              </p>
            </div>

            {/* Sort and Filter Controls */}
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <FaSort className="absolute right-3 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-400 pointer-events-none" />
              </div>

              {/* Filters Button */}
              <button
                onClick={() => setIsFiltersOpen(true)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
              >
                <FaFilter className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  Filters
                  {getActiveFilterCount() > 0 && (
                    <span className="ml-1 bg-rose-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                      {getActiveFilterCount()}
                    </span>
                  )}
                </span>
              </button>
            </div>
          </div>

          {/* Results Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(12)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-300 rounded-xl aspect-square mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : searchResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {searchResults.map((property) => (
                <PropertyCard 
                  key={property.id} 
                  property={property}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🏠</div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <button
                onClick={clearFilters}
                className="bg-rose-500 text-white px-6 py-2 rounded-lg hover:bg-rose-600 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </main>

        {/* Filters Modal */}
        {isFiltersOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
              <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsFiltersOpen(false)} />
              
              <div className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
                  <button
                    onClick={() => setIsFiltersOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <FaTimes className="h-5 w-5 text-gray-500" />
                  </button>
                </div>

                {/* Filter Content */}
                <div className="p-6 space-y-8">
                  {/* Price Range */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Price range</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Minimum
                        </label>
                        <input
                          type="number"
                          placeholder="$0"
                          value={filters.priceMin}
                          onChange={(e) => handleFilterChange('priceMin', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Maximum
                        </label>
                        <input
                          type="number"
                          placeholder="$1000+"
                          value={filters.priceMax}
                          onChange={(e) => handleFilterChange('priceMax', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Property Type */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Type of place</h3>
                    <div className="space-y-3">
                      {[
                        { value: 'any', label: 'Any type' },
                        { value: 'entire-place', label: 'Entire place' },
                        { value: 'private-room', label: 'Private room' },
                        { value: 'shared-room', label: 'Shared room' },
                        { value: 'hotel', label: 'Hotel' }
                      ].map((type) => (
                        <label key={type.value} className="flex items-center">
                          <input
                            type="radio"
                            name="propertyType"
                            value={type.value}
                            checked={filters.type === type.value}
                            onChange={(e) => handleFilterChange('type', e.target.value)}
                            className="h-4 w-4 text-rose-500 focus:ring-rose-500 border-gray-300"
                          />
                          <span className="ml-3 text-gray-700">{type.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Amenities */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Amenities</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {popularAmenities.map((amenity) => (
                        <label key={amenity} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={filters.amenities.includes(amenity)}
                            onChange={() => handleAmenityToggle(amenity)}
                            className="h-4 w-4 text-rose-500 focus:ring-rose-500 border-gray-300 rounded"
                          />
                          <span className="ml-3 text-gray-700">{amenity}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Instant Book */}
                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.instantBook}
                        onChange={(e) => handleFilterChange('instantBook', e.target.checked)}
                        className="h-4 w-4 text-rose-500 focus:ring-rose-500 border-gray-300 rounded"
                      />
                      <span className="ml-3 text-gray-700">Instant Book</span>
                    </label>
                    <p className="text-sm text-gray-500 mt-1 ml-7">
                      Listings you can book without waiting for Host approval
                    </p>
                  </div>

                  {/* Minimum Rating */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Minimum rating</h3>
                    <div className="space-y-2">
                      {[0, 3, 4, 4.5].map((rating) => (
                        <label key={rating} className="flex items-center">
                          <input
                            type="radio"
                            name="minRating"
                            value={rating}
                            checked={filters.minRating === rating}
                            onChange={(e) => handleFilterChange('minRating', parseFloat(e.target.value))}
                            className="h-4 w-4 text-rose-500 focus:ring-rose-500 border-gray-300"
                          />
                          <span className="ml-3 text-gray-700">
                            {rating === 0 ? 'Any rating' : `${rating}+ stars`}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between p-6 border-t border-gray-200">
                  <button
                    onClick={clearFilters}
                    className="text-gray-700 font-medium hover:text-gray-900 underline"
                  >
                    Clear all
                  </button>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setIsFiltersOpen(false)}
                      className="px-6 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => setIsFiltersOpen(false)}
                      className="px-6 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
                    >
                      Show {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </>
  );
};

export default StaybnbSearchPage;
