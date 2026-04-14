import React, { useState } from 'react';
import Head from 'next/head';
import { FaDollarSign, FaChartLine, FaFilter, FaSortAmountDown } from 'react-icons/fa';
import CompanyCheckHeader from '../../components/companycheck/CompanyCheckHeader';
import SalaryCard from '../../components/companycheck/SalaryCard';
import { 
  getSalaries, 
  getTrendingPositions, 
  formatSalary,
  getCompanies 
} from '../../utils/companyCheckData';

const SalariesPage = () => {
  const [sortBy, setSortBy] = useState('totalComp');
  const [filterCompany, setFilterCompany] = useState('');
  const [filterPosition, setFilterPosition] = useState('');
  const [filterLocation, setFilterLocation] = useState('');

  const allSalaries = getSalaries();
  const trendingPositions = getTrendingPositions(8);
  const companies = getCompanies();

  // Filter and sort salaries
  const filteredSalaries = allSalaries.filter(salary => {
    return (
      (!filterCompany || salary.companyId.includes(filterCompany.toLowerCase())) &&
      (!filterPosition || salary.position.toLowerCase().includes(filterPosition.toLowerCase())) &&
      (!filterLocation || salary.location.toLowerCase().includes(filterLocation.toLowerCase()))
    );
  });

  const sortedSalaries = [...filteredSalaries].sort((a, b) => {
    switch (sortBy) {
      case 'totalComp':
        return b.totalComp - a.totalComp;
      case 'baseSalary':
        return b.baseSalary - a.baseSalary;
      case 'experience':
        const expA = parseInt(a.experience) || 0;
        const expB = parseInt(b.experience) || 0;
        return expB - expA;
      case 'date':
        return new Date(b.date) - new Date(a.date);
      default:
        return 0;
    }
  });

  const sortOptions = [
    { value: 'totalComp', label: 'Total Compensation' },
    { value: 'baseSalary', label: 'Base Salary' },
    { value: 'experience', label: 'Experience Level' },
    { value: 'date', label: 'Most Recent' }
  ];

  const clearFilters = () => {
    setFilterCompany('');
    setFilterPosition('');
    setFilterLocation('');
  };

  const hasActiveFilters = filterCompany || filterPosition || filterLocation;

  return (
    <>
      <Head>
        <title>Salaries - Anonymous Salary Information | CompanyCheck</title>
        <meta name="description" content="Compare salaries across companies and positions. Anonymous salary data from real employees." />
        <meta httpEquiv="Content-Language" content="en-US" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <CompanyCheckHeader />

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Know Your Worth
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto">
                Anonymous salary information from real employees across top companies
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-green-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-colors">
                  Add Your Salary
                </button>
                <button className="border-2 border-white text-white hover:bg-white hover:text-green-600 font-semibold py-3 px-6 rounded-lg transition-colors">
                  Salary Calculator
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Top Paying Positions */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Highest Paying Positions</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore top-paying roles across the industry based on real salary data
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingPositions.map((position) => (
                <div key={position.id} className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{position.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{position.category}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Average:</span>
                      <span className="text-xl font-bold text-green-600">
                        {formatSalary(position.averageSalary)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Range:</span>
                      <span className="text-sm text-gray-900">
                        {formatSalary(position.salaryRange.min)} - {formatSalary(position.salaryRange.max)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Filters and Controls */}
        <section className="bg-gray-100 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                <h2 className="text-2xl font-bold text-gray-900">All Salary Reports</h2>
                <div className="flex items-center space-x-4">
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                      Clear Filters
                    </button>
                  )}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Filter Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company
                  </label>
                  <select
                    value={filterCompany}
                    onChange={(e) => setFilterCompany(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white"
                  >
                    <option value="">All Companies</option>
                    {companies.map((company) => (
                      <option key={company.id} value={company.id}>
                        {company.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Position
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Software Engineer"
                    value={filterPosition}
                    onChange={(e) => setFilterPosition(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. San Francisco, CA"
                    value={filterLocation}
                    onChange={(e) => setFilterLocation(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white"
                  />
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-600">
                Showing {sortedSalaries.length} salary {sortedSalaries.length === 1 ? 'report' : 'reports'}
              </div>
            </div>
          </div>
        </section>

        {/* Salary Reports */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {sortedSalaries.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {sortedSalaries.map((salary) => (
                  <SalaryCard key={salary.id} salary={salary} showCompanyName={true} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl text-gray-300 mb-4">💰</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No salary reports found</h3>
                <p className="text-gray-600 mb-6">
                  No salary data matches your current filters. Try adjusting your search criteria.
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-green-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Help others know their worth
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Share your salary information anonymously to help build a more transparent job market
            </p>
            <button className="bg-white text-green-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-colors">
              Add Your Salary
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default SalariesPage;
