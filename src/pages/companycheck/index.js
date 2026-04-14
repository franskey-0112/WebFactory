import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FaSearch, FaBuilding, FaStar, FaDollarSign, FaUsers, FaChartLine, FaArrowRight } from 'react-icons/fa';
import CompanyCheckHeader from '../../components/companycheck/CompanyCheckHeader';
import CompanyCard from '../../components/companycheck/CompanyCard';
import ReviewCard from '../../components/companycheck/ReviewCard';
import { 
  getTrendingCompanies, 
  getRecentReviews, 
  getTrendingPositions,
  formatSalary,
  getSearchSuggestions
} from '../../utils/companyCheckData';

const CompanyCheckHome = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const trendingCompanies = getTrendingCompanies(6);
  const recentReviews = getRecentReviews(3);
  const trendingPositions = getTrendingPositions(6);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.length >= 2) {
      const searchSuggestions = getSearchSuggestions(query);
      setSuggestions(searchSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/companycheck/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (suggestion.type === 'company') {
      router.push(`/companycheck/company/${suggestion.id}`);
    } else if (suggestion.type === 'position') {
      router.push(`/companycheck/search?q=${encodeURIComponent(suggestion.value)}`);
    }
    setSearchQuery('');
    setShowSuggestions(false);
  };

  const stats = [
    { icon: FaBuilding, label: 'Companies', value: '50K+', color: 'blue' },
    { icon: FaStar, label: 'Reviews', value: '500K+', color: 'yellow' },
    { icon: FaDollarSign, label: 'Salaries', value: '100K+', color: 'green' },
    { icon: FaUsers, label: 'Interviews', value: '75K+', color: 'purple' }
  ];

  return (
    <>
      <Head>
        <title>CompanyCheck - Company Reviews, Salaries & Interview Questions</title>
        <meta name="description" content="Find company reviews, salaries, and interview questions from current and former employees." />
        <meta httpEquiv="Content-Language" content="en-US" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <CompanyCheckHeader />

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Get the inside scoop on jobs and companies
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
                Anonymous reviews and salary insights from current and former employees
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto relative">
                <form onSubmit={handleSearchSubmit}>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search companies, jobs, or salaries..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                      onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                      className="w-full pl-6 pr-16 py-4 text-lg border-0 rounded-xl focus:ring-4 focus:ring-blue-300 text-gray-900 bg-white placeholder-gray-500"
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                      <FaSearch className="text-lg" />
                    </button>
                  </div>
                </form>

                {/* Search Suggestions */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg mt-2 z-50">
                    {suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="px-6 py-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 first:rounded-t-xl last:rounded-b-xl"
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${
                            suggestion.type === 'company' ? 'bg-blue-500' : 'bg-green-500'
                          }`}></div>
                          <div>
                            <div className="font-medium text-gray-900">{suggestion.value}</div>
                            <div className="text-sm text-gray-500">{suggestion.subtitle}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-${stat.color}-100 mb-4`}>
                    <stat.icon className={`text-2xl text-${stat.color}-600`} />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trending Companies */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Trending Companies</h2>
                <p className="text-gray-600">Popular companies with high ratings and recent activity</p>
              </div>
              <button
                onClick={() => router.push('/companycheck/companies')}
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
              >
                View All <FaArrowRight className="ml-2" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingCompanies.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
          </div>
        </section>

        {/* Top Paying Jobs */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Top Paying Jobs</h2>
                <p className="text-gray-600">Highest salary positions across all companies</p>
              </div>
              <button
                onClick={() => router.push('/companycheck/salaries')}
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
              >
                View All <FaArrowRight className="ml-2" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingPositions.map((position) => (
                <div key={position.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{position.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{position.category}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        {formatSalary(position.averageSalary)}
                      </div>
                      <div className="text-sm text-gray-500">Average Salary</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">
                        {formatSalary(position.salaryRange.min)} - {formatSalary(position.salaryRange.max)}
                      </div>
                      <div className="text-xs text-gray-500">Salary Range</div>
                    </div>
                  </div>
                  <button
                    onClick={() => router.push(`/companycheck/jobs?position=${encodeURIComponent(position.title)}`)}
                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                  >
                    View Jobs
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Reviews */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Recent Reviews</h2>
                <p className="text-gray-600">Latest employee reviews and insights</p>
              </div>
              <button
                onClick={() => router.push('/companycheck/reviews')}
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
              >
                View All <FaArrowRight className="ml-2" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {recentReviews.map((review) => (
                <ReviewCard key={review.id} review={review} showCompanyName={true} />
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-blue-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Help others by sharing your experience
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Write an anonymous review, share salary information, or add interview questions to help job seekers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-colors">
                Write a Review
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-3 px-6 rounded-lg transition-colors">
                Add Salary
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-3 px-6 rounded-lg transition-colors">
                Share Interview
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CompanyCheckHome;
