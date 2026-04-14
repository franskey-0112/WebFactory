import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FaFilter, FaSortAmountDown, FaBuilding, FaComments, FaBriefcase } from 'react-icons/fa';
import CompanyCheckHeader from '../../components/companycheck/CompanyCheckHeader';
import InterviewCard from '../../components/companycheck/InterviewCard';
import {
  getInterviews,
  getCompanies,
  getCompanyById,
  getTopRatedCompanies
} from '../../utils/companyCheckData';

const InterviewsPage = () => {
  const [sortBy, setSortBy] = useState('date');
  const [filterCompany, setFilterCompany] = useState('');
  const [filterPosition, setFilterPosition] = useState('');
  const [filterOutcome, setFilterOutcome] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('');

  const allInterviews = getInterviews();
  const companies = getCompanies();
  const topRated = getTopRatedCompanies(5);

  const filtered = allInterviews.filter(i => {
    return (
      (!filterCompany || i.companyId.includes(filterCompany.toLowerCase())) &&
      (!filterPosition || i.position.toLowerCase().includes(filterPosition.toLowerCase())) &&
      (!filterOutcome || i.outcome === filterOutcome) &&
      (!filterDifficulty || i.difficulty === filterDifficulty)
    );
  }).sort((a, b) => {
    switch (sortBy) {
      case 'date': return new Date(b.date) - new Date(a.date);
      case 'helpful': return b.helpful - a.helpful;
      case 'difficulty-hard': return ['Easy','Medium','Hard'].indexOf(b.difficulty) - ['Easy','Medium','Hard'].indexOf(a.difficulty);
      case 'difficulty-easy': return ['Easy','Medium','Hard'].indexOf(a.difficulty) - ['Easy','Medium','Hard'].indexOf(b.difficulty);
      default: return 0;
    }
  });

  const outcomeCounts = ['Offer', 'Rejected', 'No Response', 'Pending'].map(o => ({
    outcome: o,
    count: allInterviews.filter(i => i.outcome === o).length
  }));

  const difficultyCounts = ['Easy', 'Medium', 'Hard'].map(d => ({
    difficulty: d,
    count: allInterviews.filter(i => i.difficulty === d).length
  }));

  const offerRate = allInterviews.length
    ? Math.round((allInterviews.filter(i => i.outcome === 'Offer').length / allInterviews.length) * 100)
    : 0;

  const clearFilters = () => {
    setFilterCompany('');
    setFilterPosition('');
    setFilterOutcome('');
    setFilterDifficulty('');
  };

  const hasFilters = filterCompany || filterPosition || filterOutcome || filterDifficulty;

  const outcomeColor = {
    Offer: 'text-green-600 bg-green-100',
    Rejected: 'text-red-600 bg-red-100',
    'No Response': 'text-gray-600 bg-gray-100',
    Pending: 'text-yellow-600 bg-yellow-100'
  };

  const difficultyColor = {
    Easy: 'text-green-600 bg-green-100',
    Medium: 'text-yellow-600 bg-yellow-100',
    Hard: 'text-red-600 bg-red-100'
  };

  return (
    <>
      <Head>
        <title>Interview Experiences - CompanyCheck</title>
        <meta name="description" content="Prepare for your interviews with real experiences from candidates at top companies." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <CompanyCheckHeader />

        {/* Hero */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-600 text-white py-10">
          <div className="max-w-6xl mx-auto px-4">
            <h1 className="text-3xl font-bold mb-1">Interview Experiences</h1>
            <p className="text-blue-100">Real interview questions and tips from candidates at top companies</p>
            <div className="flex items-center gap-6 mt-4 flex-wrap">
              <div className="text-center">
                <div className="text-2xl font-bold">{allInterviews.length.toLocaleString()}</div>
                <div className="text-blue-200 text-sm">Interviews</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{offerRate}%</div>
                <div className="text-blue-200 text-sm">Offer Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{companies.length}</div>
                <div className="text-blue-200 text-sm">Companies</div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-5">

              {/* Outcome Stats */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="font-semibold text-gray-900 mb-4">Outcomes</h3>
                <div className="space-y-2">
                  {outcomeCounts.filter(o => o.count > 0).map(({ outcome, count }) => (
                    <button
                      key={outcome}
                      onClick={() => setFilterOutcome(filterOutcome === outcome ? '' : outcome)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                        filterOutcome === outcome ? 'ring-2 ring-blue-400' : 'hover:bg-gray-50'
                      }`}
                    >
                      <span className={`px-2 py-0.5 rounded-full font-medium text-xs ${outcomeColor[outcome] || 'text-gray-600 bg-gray-100'}`}>
                        {outcome}
                      </span>
                      <span className="text-gray-500">{count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty Stats */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="font-semibold text-gray-900 mb-4">Difficulty</h3>
                <div className="space-y-2">
                  {difficultyCounts.filter(d => d.count > 0).map(({ difficulty, count }) => (
                    <button
                      key={difficulty}
                      onClick={() => setFilterDifficulty(filterDifficulty === difficulty ? '' : difficulty)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                        filterDifficulty === difficulty ? 'ring-2 ring-blue-400' : 'hover:bg-gray-50'
                      }`}
                    >
                      <span className={`px-2 py-0.5 rounded-full font-medium text-xs ${difficultyColor[difficulty] || 'text-gray-600 bg-gray-100'}`}>
                        {difficulty}
                      </span>
                      <span className="text-gray-500">{count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Filters */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2"><FaFilter size={12} /> Filters</h3>
                  {hasFilters && <button onClick={clearFilters} className="text-xs text-blue-600 hover:underline">Clear</button>}
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Company</label>
                    <input
                      type="text"
                      placeholder="e.g. amazon"
                      value={filterCompany}
                      onChange={e => setFilterCompany(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Role / Position</label>
                    <input
                      type="text"
                      placeholder="e.g. Engineer"
                      value={filterPosition}
                      onChange={e => setFilterPosition(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Top Companies */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="font-semibold text-gray-900 mb-3">Top Companies</h3>
                <div className="space-y-3">
                  {topRated.map(company => (
                    <Link
                      key={company.id}
                      href={`/companycheck/company/${company.id}?tab=interviews`}
                      className="flex items-center gap-3 group"
                    >
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FaBuilding className="text-gray-400" size={14} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 truncate">{company.name}</p>
                        <p className="text-xs text-gray-500">{(company.totalInterviews || 0).toLocaleString()} interviews</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-5">
                <p className="text-gray-600 text-sm">
                  <strong>{filtered.length}</strong> interview experience{filtered.length !== 1 ? 's' : ''}
                  {hasFilters && ' (filtered)'}
                </p>
                <div className="flex items-center gap-2">
                  <FaSortAmountDown className="text-gray-400" size={14} />
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                  >
                    <option value="date">Most Recent</option>
                    <option value="helpful">Most Helpful</option>
                    <option value="difficulty-hard">Hardest First</option>
                    <option value="difficulty-easy">Easiest First</option>
                  </select>
                </div>
              </div>

              {filtered.length === 0 ? (
                <div className="text-center py-16 text-gray-500">
                  <FaComments className="text-5xl mx-auto mb-3 text-gray-200" />
                  <p className="text-lg font-medium">No interviews found</p>
                  <button onClick={clearFilters} className="mt-3 text-blue-600 hover:underline text-sm">Clear filters</button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filtered.map(interview => {
                    const company = getCompanyById(interview.companyId);
                    return (
                      <div key={interview.id}>
                        {company && (
                          <div className="flex items-center gap-2 mb-2 text-sm">
                            <FaBuilding className="text-gray-400" size={12} />
                            <Link href={`/companycheck/company/${company.id}?tab=interviews`} className="text-blue-600 hover:underline font-medium">
                              {company.name}
                            </Link>
                            <span className="text-gray-400">·</span>
                            <span className="text-gray-500">{interview.position}</span>
                          </div>
                        )}
                        <InterviewCard interview={interview} showCompanyName={false} />
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

export default InterviewsPage;
