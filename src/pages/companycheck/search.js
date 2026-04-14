import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FaSearch, FaFilter, FaSortAmountDown } from 'react-icons/fa';
import CompanyCheckHeader from '../../components/companycheck/CompanyCheckHeader';
import CompanyCard from '../../components/companycheck/CompanyCard';
import SearchFilters from '../../components/companycheck/SearchFilters';
import { searchCompanies } from '../../utils/companyCheckData';

const CompanyCheckSearch = () => {
  const router = useRouter();
  const { q } = router.query;
  
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    industry: '',
    size: '',
    minRating: '',
    location: ''
  });
  const [sortBy, setSortBy] = useState('rating');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Update search query when URL parameter changes
  useEffect(() => {
    if (q) {
      setSearchQuery(q);
    }
  }, [q]);

  // Perform search when query or filters change
  useEffect(() => {
    performSearch();
  }, [searchQuery, filters, sortBy]);

  const performSearch = () => {
    setLoading(true);
    try {
      let results = searchCompanies(searchQuery, filters);
      
      // Sort results
      switch (sortBy) {
        case 'rating':
          results.sort((a, b) => b.rating - a.rating);
          break;
        case 'reviews':
          results.sort((a, b) => b.totalReviews - a.totalReviews);
          break;
        case 'name':
          results.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'size':
          results.sort((a, b) => {
            const sizeOrder = {
              '1-50 employees': 1,
              '51-200 employees': 2,
              '201-500 employees': 3,
              '501-1000 employees': 4,
              '1001-5000 employees': 5,
              '5001-10000 employees': 6,
              '10000+ employees': 7
            };
            return (sizeOrder[b.size] || 0) - (sizeOrder[a.size] || 0);
          });
          break;
        default:
          break;
      }
      
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/companycheck/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      industry: '',
      size: '',
      minRating: '',
      location: ''
    });
  };

  const sortOptions = [
    { value: 'rating', label: 'Highest Rated' },
    { value: 'reviews', label: 'Most Reviews' },
    { value: 'name', label: 'Company Name' },
    { value: 'size', label: 'Company Size' }
  ];

  return (
    <>
      <Head>
        <title>{q ? `"${q}" - Search Results` : 'Search Companies'} | CompanyCheck</title>
        <meta name="description" content="Search for company reviews, salaries, and interview questions." />
        <meta httpEquiv="Content-Language" content="en-US" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <CompanyCheckHeader />

        {/* Search Header */}
        <section className="bg-white border-b border-gray-200 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Search Form */}
              <div className="flex-1 max-w-2xl">
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    placeholder="Search companies, jobs, or salaries..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md"
                  >
                    <FaSearch className="text-sm" />
                  </button>
                </form>
              </div>

              {/* Controls */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
                >
                  <FaFilter />
                  <span>Filters</span>
                </button>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Search Results Summary */}
            <div className="mt-4">
              <p className="text-gray-600">
                {loading ? (
                  'Searching...'
                ) : (
                  <>
                    {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'}
                    {searchQuery && ` for "${searchQuery}"`}
                  </>
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters Sidebar */}
              <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                <SearchFilters
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  onClearFilters={handleClearFilters}
                />
              </div>

              {/* Search Results */}
              <div className="flex-1">
                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, index) => (
                      <div key={index} className="bg-white rounded-lg shadow-md border border-gray-200 p-6 animate-pulse">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                          <div className="flex-1">
                            <div className="h-6 bg-gray-200 rounded mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="h-4 bg-gray-200 rounded"></div>
                          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {searchResults.map((company) => (
                      <CompanyCard key={company.id} company={company} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl text-gray-300 mb-4">🔍</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No companies found</h3>
                    <p className="text-gray-600 mb-6">
                      {searchQuery ? (
                        <>No results for "{searchQuery}". Try adjusting your search or filters.</>
                      ) : (
                        'Enter a search term to find companies.'
                      )}
                    </p>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">Suggestions:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Try different keywords</li>
                        <li>• Check your spelling</li>
                        <li>• Remove filters to broaden your search</li>
                        <li>• Search for company names, industries, or job titles</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CompanyCheckSearch;
