import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import MealDashHeader from '../../../components/mealdash/MealDashHeader';
import RestaurantCard from '../../../components/mealdash/RestaurantCard';
import { 
  getRestaurantsByCategory, 
  getCategoryById,
  getSortOptions 
} from '../../../utils/mealDashData';
import { 
  FaFilter, 
  FaSort, 
  FaTimes,
  FaMapMarkerAlt
} from 'react-icons/fa';

const CategoryPage = () => {
  const router = useRouter();
  const { id } = router.query;
  
  const [category, setCategory] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [filters, setFilters] = useState({
    sortBy: 'featured',
    minRating: null,
    maxDeliveryTime: null,
    maxDeliveryFee: null,
    priceRange: null,
    openNow: false
  });

  useEffect(() => {
    if (id) {
      loadCategoryData();
    }
  }, [id]);

  useEffect(() => {
    applyFilters();
  }, [restaurants, filters]);

  const loadCategoryData = async () => {
    try {
      setLoading(true);
      
      const categoryData = getCategoryById(id);
      const restaurantData = getRestaurantsByCategory(id);
      
      if (!categoryData) {
        router.push('/mealdash');
        return;
      }
      
      setCategory(categoryData);
      setRestaurants(restaurantData);
    } catch (error) {
      console.error('Error loading category data:', error);
      router.push('/mealdash');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...restaurants];

    // Open now filter
    if (filters.openNow) {
      filtered = filtered.filter(restaurant => restaurant.isOpen);
    }

    // Rating filter
    if (filters.minRating) {
      filtered = filtered.filter(restaurant => restaurant.rating >= filters.minRating);
    }

    // Delivery time filter
    if (filters.maxDeliveryTime) {
      filtered = filtered.filter(restaurant => {
        const maxTime = parseInt(restaurant.deliveryTime.split('-')[1]);
        return maxTime <= filters.maxDeliveryTime;
      });
    }

    // Delivery fee filter
    if (filters.maxDeliveryFee !== null) {
      filtered = filtered.filter(restaurant => restaurant.deliveryFee <= filters.maxDeliveryFee);
    }

    // Sort
    switch (filters.sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'deliveryTime':
        filtered.sort((a, b) => {
          const aTime = parseInt(a.deliveryTime.split('-')[0]);
          const bTime = parseInt(b.deliveryTime.split('-')[0]);
          return aTime - bTime;
        });
        break;
      case 'deliveryFee':
        filtered.sort((a, b) => a.deliveryFee - b.deliveryFee);
        break;
      case 'popularity':
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.rating - a.rating;
        });
        break;
    }

    setFilteredRestaurants(filtered);
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
      priceRange: null,
      openNow: false
    });
  };

  const getActiveFilterCount = () => {
    return Object.entries(filters).filter(([key, value]) => {
      if (key === 'sortBy' && value === 'featured') return false;
      return value !== null && value !== false;
    }).length;
  };

  const sortOptions = getSortOptions();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Head>
          <title>Loading... - MealDash</title>
        </Head>
        <MealDashHeader />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600"></div>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Head>
          <title>Category Not Found - MealDash</title>
        </Head>
        <MealDashHeader />
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <button
            onClick={() => router.push('/mealdash')}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{category.name} Restaurants - MealDash</title>
        <meta name="description" content={`Find the best ${category.name.toLowerCase()} restaurants near you`} />
        <meta httpEquiv="Content-Language" content="en-US" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <MealDashHeader />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Category Header */}
          <div className="text-center mb-8">
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${category.color} mb-4`}>
              <span className="text-4xl">{category.icon}</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.name}</h1>
            <p className="text-gray-600">
              {filteredRestaurants.length} restaurant{filteredRestaurants.length !== 1 ? 's' : ''} available
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-gray-500" />
              <span className="text-sm text-gray-600">Delivering to Downtown</span>
            </div>

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
            <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
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
                {/* Open Now Filter */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Availability</h3>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.openNow}
                      onChange={(e) => handleFilterChange('openNow', e.target.checked)}
                      className="text-red-500 rounded"
                    />
                    <span className="text-sm">Open now</span>
                  </label>
                </div>

                {/* Rating Filter */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Rating</h3>
                  <div className="space-y-2">
                    {[4.5, 4.0, 3.5].map(rating => (
                      <label key={rating} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="rating"
                          value={rating}
                          checked={filters.minRating === rating}
                          onChange={(e) => handleFilterChange('minRating', parseFloat(e.target.value))}
                          className="text-red-500"
                        />
                        <span className="text-sm">{rating}+ stars</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Delivery Time Filter */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Delivery Time</h3>
                  <div className="space-y-2">
                    {[30, 45, 60].map(time => (
                      <label key={time} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="deliveryTime"
                          value={time}
                          checked={filters.maxDeliveryTime === time}
                          onChange={(e) => handleFilterChange('maxDeliveryTime', parseInt(e.target.value))}
                          className="text-red-500"
                        />
                        <span className="text-sm">Under {time} min</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Delivery Fee Filter */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Delivery Fee</h3>
                  <div className="space-y-2">
                    {[
                      { value: 0, label: 'Free delivery' },
                      { value: 2, label: 'Under $2' },
                      { value: 3, label: 'Under $3' }
                    ].map(option => (
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
              </div>
            </div>
          )}

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-3 mb-8">
            {[
              { key: 'openNow', label: 'Open now', active: filters.openNow },
              { key: 'freeDelivery', label: 'Free delivery', active: filters.maxDeliveryFee === 0 },
              { key: 'fastDelivery', label: 'Under 30 min', active: filters.maxDeliveryTime === 30 },
              { key: 'topRated', label: '4.5+ rating', active: filters.minRating === 4.5 }
            ].map(filter => (
              <button
                key={filter.key}
                onClick={() => {
                  if (filter.key === 'openNow') {
                    handleFilterChange('openNow', !filter.active);
                  } else if (filter.key === 'freeDelivery') {
                    handleFilterChange('maxDeliveryFee', filter.active ? null : 0);
                  } else if (filter.key === 'fastDelivery') {
                    handleFilterChange('maxDeliveryTime', filter.active ? null : 30);
                  } else if (filter.key === 'topRated') {
                    handleFilterChange('minRating', filter.active ? null : 4.5);
                  }
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter.active
                    ? 'bg-red-500 text-white'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Results */}
          {filteredRestaurants.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRestaurants.map(restaurant => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${category.color} mb-4`}>
                  <span className="text-3xl">{category.icon}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">No restaurants found</h2>
                <p className="text-gray-600 mb-6">
                  We couldn't find any {category.name.toLowerCase()} restaurants matching your criteria.
                </p>
                <div className="space-y-2 text-sm text-gray-600 mb-6">
                  <p>Try:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Removing some filters</li>
                    <li>Expanding your delivery area</li>
                    <li>Checking back later for new restaurants</li>
                  </ul>
                </div>
                <button
                  onClick={clearFilters}
                  className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
