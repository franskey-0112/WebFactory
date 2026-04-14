import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FaSearch, FaFilter, FaSort, FaList, FaTh } from 'react-icons/fa';
import MasterTicketHeader from '../../components/masterticket/MasterTicketHeader';
import EventCard from '../../components/masterticket/EventCard';
import SearchFilters from '../../components/masterticket/SearchFilters';
import masterTicketDataUtils from '../../utils/masterTicketData';

const SearchPage = () => {
  const router = useRouter();
  const { q, category, city, date, priceRange, venue } = router.query;

  const [searchQuery, setSearchQuery] = useState(q || '');
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filters, setFilters] = useState({
    category: category || 'all',
    city: city || 'all',
    date: date || 'all',
    priceRange: priceRange || 'all',
    venue: venue || 'all'
  });
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState('date');
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(true);

  const { searchEvents, getEvents } = masterTicketDataUtils;

  useEffect(() => {
    const allEvents = getEvents();
    setEvents(allEvents);
    
    // Apply search and filters
    const results = searchEvents(searchQuery, filters);
    
    // Apply sorting
    const sortedResults = sortEvents(results, sortBy);
    setFilteredEvents(sortedResults);
    
    setLoading(false);
  }, [searchQuery, filters, sortBy]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (searchQuery) params.set('q', searchQuery);
    if (filters.category !== 'all') params.set('category', filters.category);
    if (filters.city !== 'all') params.set('city', filters.city);
    if (filters.date !== 'all') params.set('date', filters.date);
    if (filters.priceRange !== 'all') params.set('priceRange', filters.priceRange);
    if (filters.venue !== 'all') params.set('venue', filters.venue);

    const queryString = params.toString();
    const newUrl = queryString ? `/masterticket/search?${queryString}` : '/masterticket/search';
    
    if (router.asPath !== newUrl) {
      router.replace(newUrl, undefined, { shallow: true });
    }
  }, [searchQuery, filters]);

  const sortEvents = (eventsToSort, sortOption) => {
    const sorted = [...eventsToSort];
    
    switch (sortOption) {
      case 'date':
        return sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
      case 'price-low':
        return sorted.sort((a, b) => a.basePrice - b.basePrice);
      case 'price-high':
        return sorted.sort((a, b) => b.basePrice - a.basePrice);
      case 'name':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case 'popularity':
        // Sort by some popularity metric (for demo, using availability as proxy)
        return sorted.sort((a, b) => {
          const aAvailable = a.ticketTypes?.reduce((sum, t) => sum + t.available, 0) || 0;
          const bAvailable = b.ticketTypes?.reduce((sum, t) => sum + t.available, 0) || 0;
          return bAvailable - aAvailable;
        });
      default:
        return sorted;
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Search will be triggered by useEffect when searchQuery changes
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      category: 'all',
      city: 'all',
      date: 'all',
      priceRange: 'all',
      venue: 'all'
    });
    setSearchQuery('');
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <MasterTicketHeader />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading events...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>
          {searchQuery 
            ? `Search Results for "${searchQuery}" - MasterTicket`
            : 'Search Events - MasterTicket'
          }
        </title>
        <meta name="description" content="Search and find tickets for concerts, sports, theater shows, and more events." />
        <meta httpEquiv="Content-Language" content="en-US" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <MasterTicketHeader />

        {/* Search Bar */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <form onSubmit={handleSearch} className="relative max-w-2xl">
              <input
                type="text"
                placeholder="Search for artists, events, venues, or sports teams"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        </div>

        {/* Filters */}
        <SearchFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          isOpen={isFiltersOpen}
          onToggle={() => setIsFiltersOpen(!isFiltersOpen)}
        />

        {/* Results Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {searchQuery ? `Search Results for "${searchQuery}"` : 'All Events'}
              </h1>
              <p className="text-gray-600">
                {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} found
              </p>
            </div>

            <div className="flex items-center space-x-4">
              {/* Sort Options */}
              <div className="flex items-center space-x-2">
                <FaSort className="text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="date">Sort by Date</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name A-Z</option>
                  <option value="popularity">Popularity</option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex border border-gray-300 rounded-md">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <FaTh />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <FaList />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <div className="mb-4">
                <FaSearch className="mx-auto text-gray-400 text-6xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria or filters to find more events.
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                <p>• Try different keywords</p>
                <p>• Check your spelling</p>
                <p>• Remove some filters</p>
                <p>• Search for artist names, venue names, or event types</p>
              </div>
              <button
                onClick={handleClearFilters}
                className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-6'
            }>
              {filteredEvents.map((event) => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  showFullDetails={viewMode === 'list'}
                />
              ))}
            </div>
          )}
        </div>

        {/* Load More Button (if needed) */}
        {filteredEvents.length > 0 && filteredEvents.length >= 20 && (
          <div className="text-center pb-12">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Load More Events
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchPage;
