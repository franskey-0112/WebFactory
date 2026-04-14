import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import MealDashHeader from '../../components/mealdash/MealDashHeader';
import RestaurantCard from '../../components/mealdash/RestaurantCard';
import CategoryScroll from '../../components/mealdash/CategoryScroll';
import { 
  searchRestaurants, 
  getCategories,
  getSortOptions,
  getFilterOptions
} from '../../utils/mealDashData';
import { 
  FaFilter, 
  FaSort, 
  FaTimes,
  FaSearch,
  FaMapMarkerAlt
} from 'react-icons/fa';

const SearchPage = () => {
  const router = useRouter();
  const { q, category } = router.query;
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [restaurants, setRestaurants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [filters, setFilters] = useState({
    sortBy: 'featured',
    minRating: null,
    maxDeliveryTime: null,
    maxDeliveryFee: null,
    priceRange: null
  });

  useEffect(() => {
    // Initialize from URL params
    if (q) setSearchQuery(q);
    if (category) setSelectedCategory(category);
    
    // Load categories
    setCategories(getCategories());
  }, [q, category]);

  useEffect(() => {
    loadRestaurants();
  }, [searchQuery, selectedCategory, filters]);

  const loadRestaurants = async () => {
    try {
      setLoading(true);
      
      const searchFilters = {
        category: selectedCategory,
        ...filters
      };
      
      const results = searchRestaurants(searchQuery, searchFilters);
      setRestaurants(results);
    } catch (error) {
      console.error('Error loading restaurants:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/mealdash/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (categoryId !== 'all') params.set('category', categoryId);
    
    const queryString = params.toString();
    router.push(`/mealdash/search${queryString ? `?${queryString}` : ''}`);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      sortBy: 'featured',
      minRating: null,
      maxDeliveryTime: null,
      maxDeliveryFee: null,
      priceRange: null
    });
  };

  const getActiveFilterCount = () => {
    return Object.values(filters).filter(value => 
      value !== null && value !== 'featured'
    ).length;
  };

  const sortOptions = getSortOptions();
  const filterOptions = getFilterOptions();

  return (
    <>
      <Head>
        <title>{searchQuery ? `"${searchQuery}" - Search Results` : 'Search'} - MealDash</title>
        <meta name="description" content="Search for restaurants and food on MealDash" />
        <meta httpEquiv="Content-Language" content="en-US" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <MealDashHeader />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Search Header */}
          <div className="bg-white rounded-lg p-6 mb-6">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for restaurants or food..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg"
                />
              </div>
            </form>

            {/* Categories */}
            <CategoryScroll 
              categories={categories} 
              activeCategory={selectedCategory}
              onCategorySelect={handleCategorySelect}
            />
          </div>

          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {searchQuery ? `Results for "${searchQuery}"` : 'All Restaurants'}
              </h1>
              <p className="text-gray-600 mt-1">
                {restaurants.length} restaurant{restaurants.length !== 1 ? 's' : ''} available
              </p>
            </div>

            {/* Sort and Filter Controls */}
            <div className="flex items-center space-x-3">
              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <FaSort className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center space-x-2 px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                  showFilters || getActiveFilterCount() > 0
                    ? 'border-red-500 text-red-600 bg-red-50'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <FaFilter />
                <span>Filters</span>
                {getActiveFilterCount() > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getActiveFilterCount()}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="bg-white rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={clearFilters}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    Clear all
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Rating Filter */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Rating</h3>
                  <div className="space-y-2">
                    {filterOptions.ratings.map(option => (
                      <label key={option.value} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="rating"
                          value={option.value}
                          checked={filters.minRating === option.value}
                          onChange={(e) => handleFilterChange('minRating', parseFloat(e.target.value))}
                          className="text-red-500"
                        />
                        <span className="text-sm">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Delivery Time Filter */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Delivery Time</h3>
                  <div className="space-y-2">
                    {filterOptions.deliveryTimes.map(option => (
                      <label key={option.value} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="deliveryTime"
                          value={option.value}
                          checked={filters.maxDeliveryTime === option.value}
                          onChange={(e) => handleFilterChange('maxDeliveryTime', parseInt(e.target.value))}
                          className="text-red-500"
                        />
                        <span className="text-sm">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Delivery Fee Filter */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Delivery Fee</h3>
                  <div className="space-y-2">
                    {filterOptions.deliveryFees.map(option => (
                      <label key={option.value} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="deliveryFee"
                          value={option.value}
                          checked={filters.maxDeliveryFee === option.value}
                          onChange={(e) => handleFilterChange('maxDeliveryFee', parseFloat(e.target.value))}
                          className="text-red-500"
                        />
                        <span className="text-sm">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
                  <div className="space-y-2">
                    {filterOptions.prices.map(option => (
                      <label key={option.value} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="priceRange"
                          value={option.value}
                          checked={filters.priceRange === option.value}
                          onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                          className="text-red-500"
                        />
                        <span className="text-sm">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Searching restaurants...</p>
              </div>
            </div>
          )}

          {/* Results Grid */}
          {!loading && (
            <>
              {restaurants.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {restaurants.map(restaurant => (
                    <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="max-w-md mx-auto">
                    <FaSearch className="mx-auto text-gray-300 text-6xl mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">No restaurants found</h2>
                    <p className="text-gray-600 mb-6">
                      We couldn't find any restaurants matching your criteria. Try adjusting your search or filters.
                    </p>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>Suggestions:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Try different keywords</li>
                        <li>Check your spelling</li>
                        <li>Remove filters to broaden your search</li>
                        <li>Search for cuisine types or restaurant names</li>
                      </ul>
                    </div>
                    {(searchQuery || getActiveFilterCount() > 0) && (
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedCategory('all');
                          clearFilters();
                          router.push('/mealdash/search');
                        }}
                        className="mt-6 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
                      >
                        Clear search and filters
                      </button>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchPage;
