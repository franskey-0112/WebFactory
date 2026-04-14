import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import CarRentalHeader from '../../components/carrental/CarRentalHeader';
import CarRentalSearchForm from '../../components/carrental/CarRentalSearchForm';
import VehicleCard from '../../components/carrental/VehicleCard';
import VehicleFilters from '../../components/carrental/VehicleFilters';
import { 
  FaSort, 
  FaList, 
  FaTh, 
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaSpinner,
  FaExclamationTriangle
} from 'react-icons/fa';
import { 
  searchAdvanced, 
  sortVehicles, 
  getLocationById,
  calculateDays,
  formatDateTime 
} from '../../utils/carRentalData';

const CarRentalSearchPage = () => {
  const router = useRouter();
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('recommended');
  const [showFilters, setShowFilters] = useState(false);
  
  const [searchParams, setSearchParams] = useState({
    pickupLocation: '',
    returnLocation: '',
    pickupDate: '',
    pickupTime: '10:00',
    returnDate: '',
    returnTime: '10:00',
    age: '25'
  });

  const [filters, setFilters] = useState({
    category: null,
    priceRange: null,
    seats: null,
    transmission: null,
    fuelType: null,
    brand: null,
    features: [],
    minRating: null
  });

  // Load search parameters from URL
  useEffect(() => {
    if (!router.isReady) return;

    const params = router.query;
    setSearchParams({
      pickupLocation: params.pickupLocation || '',
      returnLocation: params.returnLocation || '',
      pickupDate: params.pickupDate || '',
      pickupTime: params.pickupTime || '10:00',
      returnDate: params.returnDate || '',
      returnTime: params.returnTime || '10:00',
      age: params.age || '25'
    });

    // Set initial category filter if provided
    if (params.category) {
      setFilters(prev => ({ ...prev, category: params.category }));
    }

    setLoading(false);
  }, [router.isReady, router.query]);

  // Search and filter vehicles
  useEffect(() => {
    if (loading) return;

    const searchFilters = {
      ...filters,
      location: searchParams.pickupLocation,
      sortBy: sortBy
    };

    const results = searchAdvanced(searchFilters);
    setVehicles(results);
    setFilteredVehicles(results);
  }, [searchParams, filters, sortBy, loading]);

  const handleSearch = (newSearchParams) => {
    setSearchParams(newSearchParams);
    
    // Update URL with new search parameters
    const params = new URLSearchParams(newSearchParams);
    router.push(`/carrental/search?${params.toString()}`, undefined, { shallow: true });
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      category: null,
      priceRange: null,
      seats: null,
      transmission: null,
      fuelType: null,
      brand: null,
      features: [],
      minRating: null
    });
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
  };

  const getSearchSummary = () => {
    if (!searchParams.pickupLocation) return 'All Vehicles';

    const location = getLocationById(searchParams.pickupLocation);
    const locationName = location ? location.name : 'Selected Location';
    
    if (searchParams.pickupDate && searchParams.returnDate) {
      const days = calculateDays(
        `${searchParams.pickupDate}T${searchParams.pickupTime}:00`,
        `${searchParams.returnDate}T${searchParams.returnTime}:00`
      );
      return `${locationName} • ${days} day${days > 1 ? 's' : ''}`;
    }
    
    return locationName;
  };

  const getSortOptions = () => [
    { value: 'recommended', label: 'Recommended' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Customer Rating' },
    { value: 'name', label: 'Vehicle Name' },
    { value: 'fuel-economy', label: 'Fuel Economy' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <CarRentalHeader />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <FaSpinner className="animate-spin text-4xl text-orange-500 mb-4 mx-auto" />
            <p className="text-gray-600">Loading vehicles...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Search Results - CarRental | Find Your Perfect Vehicle</title>
        <meta name="description" content="Browse and compare rental vehicles. Filter by category, price, features and more to find your perfect car." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Language" content="en-US" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <CarRentalHeader />

        {/* Search Form */}
        <section className="bg-white border-b border-gray-200 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CarRentalSearchForm 
              initialData={searchParams}
              onSearch={handleSearch}
              className="shadow-md"
            />
          </div>
        </section>

        {/* Search Summary */}
        <section className="bg-orange-50 border-b border-orange-200 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <FaMapMarkerAlt className="text-orange-600" />
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {getSearchSummary()}
                  </h2>
                  {searchParams.pickupDate && (
                    <p className="text-sm text-gray-600">
                      {formatDateTime(searchParams.pickupDate)} - {formatDateTime(searchParams.returnDate)}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900">
                  {filteredVehicles.length} vehicles found
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Filters Sidebar */}
            <div className="lg:w-80">
              <div className="lg:sticky lg:top-24">
                <VehicleFilters
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  onClearFilters={handleClearFilters}
                  vehicleCount={filteredVehicles.length}
                />
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              
              {/* Toolbar */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  
                  {/* Results Count */}
                  <div className="flex items-center space-x-4">
                    <p className="text-sm text-gray-600">
                      Showing {filteredVehicles.length} of {vehicles.length} vehicles
                    </p>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center space-x-4">
                    
                    {/* Sort Dropdown */}
                    <div className="flex items-center space-x-2">
                      <FaSort className="text-gray-400" />
                      <select
                        value={sortBy}
                        onChange={(e) => handleSortChange(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        {getSortOptions().map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* View Mode Toggle */}
                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 ${viewMode === 'grid' ? 'bg-orange-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'} transition-colors`}
                      >
                        <FaTh />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 ${viewMode === 'list' ? 'bg-orange-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'} transition-colors`}
                      >
                        <FaList />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vehicle Results */}
              {filteredVehicles.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                  <FaExclamationTriangle className="text-4xl text-gray-400 mb-4 mx-auto" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No vehicles found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search criteria or filters to find more vehicles.
                  </p>
                  <button
                    onClick={handleClearFilters}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                    : 'grid-cols-1'
                }`}>
                  {filteredVehicles.map((vehicle) => (
                    <VehicleCard
                      key={vehicle.id}
                      vehicle={vehicle}
                      searchParams={searchParams}
                      className={viewMode === 'list' ? 'md:flex md:items-center' : ''}
                    />
                  ))}
                </div>
              )}

              {/* Load More */}
              {filteredVehicles.length >= 20 && (
                <div className="text-center mt-12">
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-8 rounded-lg transition-colors">
                    Load More Vehicles
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarRentalSearchPage;
