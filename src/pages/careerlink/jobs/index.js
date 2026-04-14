import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { 
  FaSearch, 
  FaMapMarkerAlt, 
  FaFilter, 
  FaBookmark,
  FaSortAmountDown,
  FaBriefcase,
  FaBuilding,
  FaClock,
  FaDollarSign
} from 'react-icons/fa';
import CareerLinkHeader from '../../../components/careerlink/CareerLinkHeader';
import JobCard from '../../../components/careerlink/JobCard';
import careerLinkDataUtils from '../../../utils/careerLinkData';

const JobsPage = () => {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [functionFilter, setFunctionFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [remoteFilter, setRemoteFilter] = useState(false);
  const [minSalary, setMinSalary] = useState('');
  const [sortBy, setSortBy] = useState('date');

  const {
    searchJobs,
    getJobs,
    getJobFunctions,
    getCompanies
  } = careerLinkDataUtils;

  const jobFunctions = getJobFunctions();
  const companies = getCompanies();

  useEffect(() => {
    // Get initial search query from URL
    const { q, location, function: func, level, type, remote } = router.query;
    
    if (q) setSearchQuery(q);
    if (location) setLocationFilter(location);
    if (func) setFunctionFilter(func);
    if (level) setLevelFilter(level);
    if (type) setTypeFilter(type);
    if (remote === 'true') setRemoteFilter(true);

    loadJobs();
  }, [router.query]);

  useEffect(() => {
    filterJobs();
  }, [jobs, searchQuery, locationFilter, functionFilter, levelFilter, typeFilter, remoteFilter, minSalary, sortBy]);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const allJobs = getJobs();
      setJobs(allJobs);
    } catch (error) {
      console.error('Error loading jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterJobs = () => {
    const filters = {
      location: locationFilter,
      function: functionFilter,
      level: levelFilter,
      type: typeFilter,
      remote: remoteFilter,
      minSalary: minSalary
    };

    let filtered = searchJobs(searchQuery, filters);

    // Sort jobs
    if (sortBy === 'date') {
      filtered.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
    } else if (sortBy === 'salary') {
      filtered.sort((a, b) => (b.salary?.min || 0) - (a.salary?.min || 0));
    } else if (sortBy === 'applicants') {
      filtered.sort((a, b) => (a.applicants || 0) - (b.applicants || 0));
    }

    setFilteredJobs(filtered);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    filterJobs();
  };

  const handleSaveJob = (jobId, saved) => {
    const newSavedJobs = new Set(savedJobs);
    if (saved) {
      newSavedJobs.add(jobId);
    } else {
      newSavedJobs.delete(jobId);
    }
    setSavedJobs(newSavedJobs);
  };

  const handleApplyJob = (jobId) => {
    router.push(`/careerlink/jobs/${jobId}`);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setLocationFilter('all');
    setFunctionFilter('all');
    setLevelFilter('all');
    setTypeFilter('all');
    setRemoteFilter(false);
    setMinSalary('');
    setSortBy('date');
  };

  // Get unique locations from jobs
  const locations = [...new Set(jobs.map(job => job.location))].sort();

  const activeFiltersCount = [
    locationFilter !== 'all',
    functionFilter !== 'all',
    levelFilter !== 'all',
    typeFilter !== 'all',
    remoteFilter,
    minSalary !== ''
  ].filter(Boolean).length;

  return (
    <>
      <Head>
        <title>Jobs - CareerLink</title>
        <meta name="description" content="Find your next career opportunity" />
        <meta httpEquiv="Content-Language" content="en-US" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <CareerLinkHeader />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Search Bar */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search jobs"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 appearance-none"
                  >
                    <option value="all">All locations</option>
                    {locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Search jobs
                </button>
              </div>
            </form>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-gray-200 p-4 sticky top-20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Filters</h3>
                  <div className="flex items-center space-x-2">
                    {activeFiltersCount > 0 && (
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {activeFiltersCount}
                      </span>
                    )}
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="lg:hidden text-gray-600 hover:text-gray-900"
                    >
                      <FaFilter />
                    </button>
                  </div>
                </div>

                <div className={`space-y-4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                  {/* Job Function */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Function
                    </label>
                    <select
                      value={functionFilter}
                      onChange={(e) => setFunctionFilter(e.target.value)}
                      className="w-full p-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                    >
                      <option value="all">All functions</option>
                      {jobFunctions.map(func => (
                        <option key={func.id} value={func.id}>{func.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Experience Level */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Experience Level
                    </label>
                    <select
                      value={levelFilter}
                      onChange={(e) => setLevelFilter(e.target.value)}
                      className="w-full p-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                    >
                      <option value="all">All levels</option>
                      <option value="Entry level">Entry level</option>
                      <option value="Mid-Senior level">Mid-Senior level</option>
                      <option value="Senior level">Senior level</option>
                      <option value="Executive">Executive</option>
                    </select>
                  </div>

                  {/* Job Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Type
                    </label>
                    <select
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                      className="w-full p-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                    >
                      <option value="all">All types</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>

                  {/* Remote Work */}
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={remoteFilter}
                        onChange={(e) => setRemoteFilter(e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Remote jobs only</span>
                    </label>
                  </div>

                  {/* Salary Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Minimum Salary
                    </label>
                    <select
                      value={minSalary}
                      onChange={(e) => setMinSalary(e.target.value)}
                      className="w-full p-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                    >
                      <option value="">Any salary</option>
                      <option value="50000">$50,000+</option>
                      <option value="75000">$75,000+</option>
                      <option value="100000">$100,000+</option>
                      <option value="150000">$150,000+</option>
                      <option value="200000">$200,000+</option>
                    </select>
                  </div>

                  {/* Clear Filters */}
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="w-full text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Clear all filters
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Jobs List */}
            <div className="lg:col-span-3">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {searchQuery ? `Jobs for "${searchQuery}"` : 'All Jobs'}
                  </h1>
                  <p className="text-gray-600 mt-1">
                    {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} found
                  </p>
                </div>

                {/* Sort Options */}
                <div className="flex items-center space-x-2">
                  <FaSortAmountDown className="text-gray-400" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-200 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900"
                  >
                    <option value="date">Most recent</option>
                    <option value="salary">Highest salary</option>
                    <option value="applicants">Fewest applicants</option>
                  </select>
                </div>
              </div>

              {/* Quick Filters */}
              <div className="flex flex-wrap gap-2 mb-6">
                <button
                  onClick={() => setRemoteFilter(!remoteFilter)}
                  className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                    remoteFilter
                      ? 'bg-blue-100 border-blue-300 text-blue-800'
                      : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Remote
                </button>
                <button
                  onClick={() => setTypeFilter(typeFilter === 'Full-time' ? 'all' : 'Full-time')}
                  className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                    typeFilter === 'Full-time'
                      ? 'bg-blue-100 border-blue-300 text-blue-800'
                      : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Full-time
                </button>
                <button
                  onClick={() => setLevelFilter(levelFilter === 'Senior level' ? 'all' : 'Senior level')}
                  className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                    levelFilter === 'Senior level'
                      ? 'bg-blue-100 border-blue-300 text-blue-800'
                      : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Senior
                </button>
              </div>

              {/* Loading State */}
              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading jobs...</p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Jobs List */}
                  {filteredJobs.length > 0 ? (
                    <div className="space-y-4">
                      {filteredJobs.map((job) => (
                        <JobCard
                          key={job.id}
                          job={job}
                          saved={savedJobs.has(job.id)}
                          onSave={handleSaveJob}
                          onApply={handleApplyJob}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <FaBriefcase className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                      <p className="text-gray-600 mb-4">
                        Try adjusting your search criteria or filters
                      </p>
                      <button
                        onClick={clearFilters}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Clear all filters
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobsPage;
