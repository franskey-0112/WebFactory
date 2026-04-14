import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FaStar, FaFilter, FaSortAmountDown, FaSearch, FaBuilding } from 'react-icons/fa';
import CompanyCheckHeader from '../../components/companycheck/CompanyCheckHeader';
import ReviewCard from '../../components/companycheck/ReviewCard';
import {
  getReviews,
  getRecentReviews,
  getCompanies,
  getCompanyById,
  getTopRatedCompanies,
  formatDate
} from '../../utils/companyCheckData';

const ReviewsPage = () => {
  const [sortBy, setSortBy] = useState('date');
  const [filterCompany, setFilterCompany] = useState('');
  const [filterPosition, setFilterPosition] = useState('');
  const [filterRating, setFilterRating] = useState('');
  const [filterEmployment, setFilterEmployment] = useState('');

  const allReviews = getReviews();
  const companies = getCompanies();
  const topRated = getTopRatedCompanies(5);

  const filtered = allReviews.filter(r => {
    return (
      (!filterCompany || r.companyId.includes(filterCompany.toLowerCase())) &&
      (!filterPosition || r.position.toLowerCase().includes(filterPosition.toLowerCase())) &&
      (!filterRating || r.rating >= parseInt(filterRating)) &&
      (!filterEmployment || r.employment === filterEmployment)
    );
  }).sort((a, b) => {
    switch (sortBy) {
      case 'date': return new Date(b.date) - new Date(a.date);
      case 'rating-high': return b.rating - a.rating;
      case 'rating-low': return a.rating - b.rating;
      case 'helpful': return b.helpful - a.helpful;
      default: return 0;
    }
  });

  const avgRating = allReviews.length
    ? (allReviews.reduce((s, r) => s + r.rating, 0) / allReviews.length).toFixed(1)
    : 0;

  const ratingDist = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: allReviews.filter(r => r.rating === star).length,
    pct: Math.round((allReviews.filter(r => r.rating === star).length / allReviews.length) * 100)
  }));

  const clearFilters = () => {
    setFilterCompany('');
    setFilterPosition('');
    setFilterRating('');
    setFilterEmployment('');
  };

  const hasFilters = filterCompany || filterPosition || filterRating || filterEmployment;

  return (
    <>
      <Head>
        <title>Company Reviews - CompanyCheck</title>
        <meta name="description" content="Read authentic employee reviews for top companies. Find out what it's really like to work there." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <CompanyCheckHeader />

        {/* Hero */}
        <div className="bg-gradient-to-r from-green-700 to-teal-600 text-white py-10">
          <div className="max-w-6xl mx-auto px-4">
            <h1 className="text-3xl font-bold mb-1">Employee Reviews</h1>
            <p className="text-green-100">Real insights from real employees at top companies</p>
            <div className="flex items-center gap-6 mt-4 flex-wrap">
              <div className="text-center">
                <div className="text-2xl font-bold">{allReviews.length.toLocaleString()}</div>
                <div className="text-green-200 text-sm">Reviews</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{avgRating}</div>
                <div className="text-green-200 text-sm">Avg Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{companies.length}</div>
                <div className="text-green-200 text-sm">Companies</div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-5">
              {/* Rating Distribution */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="font-semibold text-gray-900 mb-4">Overall Rating</h3>
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-gray-900">{avgRating}</div>
                  <div className="flex justify-center gap-1 my-1">
                    {[1,2,3,4,5].map(s => (
                      <FaStar key={s} className={s <= Math.round(avgRating) ? 'text-yellow-400' : 'text-gray-200'} size={16} />
                    ))}
                  </div>
                  <div className="text-sm text-gray-500">{allReviews.length} reviews</div>
                </div>
                <div className="space-y-2">
                  {ratingDist.map(({ star, count, pct }) => (
                    <button
                      key={star}
                      onClick={() => setFilterRating(filterRating === String(star) ? '' : String(star))}
                      className={`w-full flex items-center gap-2 text-sm rounded px-1 py-0.5 transition-colors ${filterRating === String(star) ? 'bg-green-50' : 'hover:bg-gray-50'}`}
                    >
                      <span className="w-3 text-gray-600">{star}</span>
                      <FaStar className="text-yellow-400" size={11} />
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-gray-500 w-8 text-right">{count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Filters */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2"><FaFilter size={12} /> Filters</h3>
                  {hasFilters && (
                    <button onClick={clearFilters} className="text-xs text-green-600 hover:underline">Clear</button>
                  )}
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Company</label>
                    <input
                      type="text"
                      placeholder="e.g. google"
                      value={filterCompany}
                      onChange={e => setFilterCompany(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-400 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Job Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Engineer"
                      value={filterPosition}
                      onChange={e => setFilterPosition(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-400 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Employment Status</label>
                    <select
                      value={filterEmployment}
                      onChange={e => setFilterEmployment(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-400 outline-none"
                    >
                      <option value="">All</option>
                      <option value="Current Employee">Current Employee</option>
                      <option value="Former Employee">Former Employee</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Top Rated */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="font-semibold text-gray-900 mb-3">Top Rated Companies</h3>
                <div className="space-y-3">
                  {topRated.map(company => (
                    <Link
                      key={company.id}
                      href={`/companycheck/company/${company.id}?tab=reviews`}
                      className="flex items-center gap-3 group"
                    >
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FaBuilding className="text-gray-400" size={14} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 group-hover:text-green-600 truncate">{company.name}</p>
                        <div className="flex items-center gap-1">
                          <FaStar className="text-yellow-400" size={10} />
                          <span className="text-xs text-gray-500">{company.overallRating}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Sort + Count Bar */}
              <div className="flex items-center justify-between mb-5">
                <p className="text-gray-600 text-sm">
                  <strong>{filtered.length}</strong> review{filtered.length !== 1 ? 's' : ''}
                  {hasFilters && ' (filtered)'}
                </p>
                <div className="flex items-center gap-2">
                  <FaSortAmountDown className="text-gray-400" size={14} />
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-400 outline-none"
                  >
                    <option value="date">Most Recent</option>
                    <option value="rating-high">Highest Rating</option>
                    <option value="rating-low">Lowest Rating</option>
                    <option value="helpful">Most Helpful</option>
                  </select>
                </div>
              </div>

              {filtered.length === 0 ? (
                <div className="text-center py-16 text-gray-500">
                  <FaStar className="text-5xl mx-auto mb-3 text-gray-200" />
                  <p className="text-lg font-medium">No reviews found</p>
                  <button onClick={clearFilters} className="mt-3 text-green-600 hover:underline text-sm">Clear filters</button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filtered.map(review => {
                    const company = getCompanyById(review.companyId);
                    return (
                      <div key={review.id}>
                        {company && (
                          <div className="flex items-center gap-2 mb-2 text-sm">
                            <FaBuilding className="text-gray-400" size={12} />
                            <Link href={`/companycheck/company/${company.id}`} className="text-green-600 hover:underline font-medium">
                              {company.name}
                            </Link>
                          </div>
                        )}
                        <ReviewCard review={review} showCompanyName={false} />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewsPage;
