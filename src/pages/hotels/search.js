import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import HotelHeader from '../../components/hotels/HotelHeader';
import Footer from '../../components/Footer';
import HotelSearchForm from '../../components/hotels/HotelSearchForm';
import HotelCard from '../../components/hotels/HotelCard';
import HotelFilters from '../../components/hotels/HotelFilters';
import { 
  FaSort, 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaUsers, 
  FaFilter,
  FaTh,
  FaList,
  FaArrowLeft
} from 'react-icons/fa';
import { 
  hotelData, 
  searchHotelsByDestination, 
  filterHotels, 
  sortHotels 
} from '../../utils/hotelData';

const HotelSearchPage = () => {
  const router = useRouter();
  const { destination, checkIn, checkOut, guests, rooms } = router.query;

  // State management
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('recommended');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  const [appliedFilters, setAppliedFilters] = useState({});
  const [wishlist, setWishlist] = useState([]);

  // 默认固定日期，避免时间变化导致搜索不到数据
  const getDefaultDates = () => {
    return {
      checkIn: checkIn || '2024-12-20',
      checkOut: checkOut || '2024-12-22'
    };
  };

  // Search parameters
  const searchParams = {
    destination: destination || '',
    checkIn: getDefaultDates().checkIn,
    checkOut: getDefaultDates().checkOut,
    guests: parseInt(guests) || 2,
    rooms: parseInt(rooms) || 1
  };

  // Sort options
  const sortOptions = [
    { value: 'recommended', label: 'Recommended' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Guest Rating' },
    { value: 'stars', label: 'Star Rating' },
    { value: 'name', label: 'Hotel Name' }
  ];

  // Load hotels when route parameters change
  useEffect(() => {
    if (!router.isReady) return;
    loadHotels();
  }, [router.isReady, destination, checkIn, checkOut, guests, rooms]);

  // Apply filters and sorting when data changes
  useEffect(() => {
    applyFiltersAndSort();
  }, [hotels, appliedFilters, sortOption]);

  const loadHotels = () => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      let results = [];
      
      if (destination) {
        // Search hotels by destination
        results = searchHotelsByDestination(destination);
      } else {
        // Show all hotels if no destination specified
        results = [...hotelData];
      }
      
      setHotels(results);
      setLoading(false);
    }, 500);
  };

  const applyFiltersAndSort = () => {
    let results = [...hotels];
    
    // Apply filters
    if (Object.keys(appliedFilters).length > 0) {
      results = filterHotels(results, appliedFilters);
    }
    
    // Apply sorting
    results = sortHotels(results, sortOption);
    
    setFilteredHotels(results);
  };

  const handleFiltersChange = (filters) => {
    setAppliedFilters(filters);
  };

  const handleSortChange = (newSortOption) => {
    setSortOption(newSortOption);
  };

  const handleSearch = (newSearchData) => {
    // Update URL with new search parameters
    const query = new URLSearchParams({
      destination: newSearchData.destination,
      checkIn: newSearchData.checkIn,
      checkOut: newSearchData.checkOut,
      guests: newSearchData.guests.toString(),
      rooms: newSearchData.rooms.toString()
    });
    
    router.push(`/hotels/search?${query.toString()}`);
  };

  const toggleWishlist = (hotel) => {
    setWishlist(prev => {
      const isInWishlist = prev.some(item => item.id === hotel.id);
      if (isInWishlist) {
        return prev.filter(item => item.id !== hotel.id);
      } else {
        return [...prev, hotel];
      }
    });
  };

  const isInWishlist = (hotel) => {
    return wishlist.some(item => item.id === hotel.id);
  };

  // Calculate search summary
  const calculateNights = () => {
    if (searchParams.checkIn && searchParams.checkOut) {
      const checkInDate = new Date(searchParams.checkIn);
      const checkOutDate = new Date(searchParams.checkOut);
      const diffTime = checkOutDate - checkInDate;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 1;
    }
    return 1;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <HotelHeader />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600 text-lg">Searching for hotels...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>
          {destination 
            ? `Hotels in ${destination} - Hotel Search Results`
            : 'Hotel Search Results'
          }
        </title>
        <meta name="description" content={`Find and book hotels${destination ? ` in ${destination}` : ''}. Compare prices and read reviews.`} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <HotelHeader />

        {/* Search Form Header */}
        <section className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <HotelSearchForm 
              initialValues={searchParams}
              onSearch={handleSearch}
              className="shadow-none border border-gray-200"
            />
          </div>
        </section>

        {/* Search Summary */}
        <section className="bg-white border-b">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center space-x-6">
                <button
                  onClick={() => router.back()}
                  className="flex items-center text-blue-600 hover:text-blue-800"
                  data-testid="back-button"
                >
                  <FaArrowLeft className="mr-2" />
                  Back
                </button>
                
                <div className="flex items-center space-x-4 text-gray-600">
                  {destination && (
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="mr-1" />
                      <span className="font-medium">{destination}</span>
                    </div>
                  )}
                  
                  {searchParams.checkIn && searchParams.checkOut && (
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-1" />
                      <span>{formatDate(searchParams.checkIn)} - {formatDate(searchParams.checkOut)}</span>
                      <span className="ml-2 text-sm">({calculateNights()} nights)</span>
                    </div>
                  )}
                  
                  <div className="flex items-center">
                    <FaUsers className="mr-1" />
                    <span>{searchParams.guests} guests, {searchParams.rooms} room{searchParams.rooms > 1 ? 's' : ''}</span>
                  </div>
                </div>
              </div>

              <div className="text-sm text-gray-600">
                {filteredHotels.length} of {hotels.length} hotels found
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters Sidebar */}
            <div className="lg:w-80 flex-shrink-0">
              <HotelFilters
                onFiltersChange={handleFiltersChange}
                hotelData={hotels}
                initialFilters={appliedFilters}
              />
            </div>

            {/* Search Results */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center space-x-4">
                    <h1 className="text-xl font-semibold text-gray-900" data-testid="results-title">
                      {destination ? `Hotels in ${destination}` : 'Hotel Search Results'}
                    </h1>
                    
                    <div className="text-sm text-gray-500">
                      {filteredHotels.length} results
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    {/* View Mode Toggle */}
                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                        data-testid="list-view-button"
                      >
                        <FaList className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                        data-testid="grid-view-button"
                      >
                        <FaTh className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Sort Options */}
                    <div className="flex items-center space-x-2">
                      <FaSort className="h-4 w-4 text-gray-400" />
                      <select
                        value={sortOption}
                        onChange={(e) => handleSortChange(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                        data-testid="sort-select"
                      >
                        {sortOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results List/Grid */}
              {filteredHotels.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                  <div className="text-gray-400 mb-4">
                    <FaMapMarkerAlt className="h-16 w-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No hotels found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search criteria or filters to find more options.
                  </p>
                  <button
                    onClick={() => setAppliedFilters({})}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    data-testid="clear-filters-button"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <div className={`space-y-6 ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6 space-y-0' : ''}`}>
                  {filteredHotels.map((hotel) => (
                    <HotelCard
                      key={hotel.id}
                      hotel={hotel}
                      searchParams={searchParams}
                      onToggleWishlist={toggleWishlist}
                      isInWishlist={isInWishlist(hotel)}
                    />
                  ))}
                </div>
              )}

              {/* Load More Button (if needed) */}
              {filteredHotels.length > 0 && filteredHotels.length >= 20 && (
                <div className="mt-8 text-center">
                  <button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-lg font-medium transition-colors">
                    Load More Hotels
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default HotelSearchPage; 