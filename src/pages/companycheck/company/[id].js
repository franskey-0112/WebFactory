import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FaStar, FaMapMarkerAlt, FaUsers, FaBuilding, FaGlobe, FaCalendarAlt, FaThumbsUp, FaChartLine, FaDollarSign, FaBriefcase } from 'react-icons/fa';
import CompanyCheckHeader from '../../../components/companycheck/CompanyCheckHeader';
import ReviewCard from '../../../components/companycheck/ReviewCard';
import SalaryCard from '../../../components/companycheck/SalaryCard';
import InterviewCard from '../../../components/companycheck/InterviewCard';
import JobCard from '../../../components/companycheck/JobCard';
import JobFilters from '../../../components/companycheck/JobFilters';
import JobApplyModal from '../../../components/companycheck/JobApplyModal';
import { 
  getCompanyById, 
  getReviewsByCompany, 
  getSalariesByCompany, 
  getInterviewsByCompany,
  getReviewStats,
  getAverageSalaryByCompany,
  getInterviewStats,
  formatSalary,
  getJobsByCompany,
  applyForJob
} from '../../../utils/companyCheckData';

const CompanyDetailPage = () => {
  const router = useRouter();
  const { id, tab } = router.query;
  const [activeTab, setActiveTab] = useState('overview');
  const [jobFilters, setJobFilters] = useState({});
  const [applyOpen, setApplyOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const company = getCompanyById(id);
  const reviews = getReviewsByCompany(id);
  const salaries = getSalariesByCompany(id);
  const interviews = getInterviewsByCompany(id);
  const reviewStats = getReviewStats(id);
  const averageSalary = getAverageSalaryByCompany(id);
  const interviewStats = getInterviewStats(id);
  const jobs = getJobsByCompany(id, jobFilters);

  // Set tab from URL parameter
  React.useEffect(() => {
    if (tab && ['overview', 'reviews', 'salaries', 'interviews', 'jobs'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [tab]);

  if (!company) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Company Not Found</h1>
          <button
            onClick={() => router.push('/companycheck')}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<FaStar key="half" className="text-yellow-400 opacity-50" />);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="text-gray-300" />);
    }
    
    return stars;
  };

  const tabs = [
    { id: 'overview', name: 'Overview', count: null },
    { id: 'reviews', name: 'Reviews', count: reviews.length },
    { id: 'salaries', name: 'Salaries', count: salaries.length },
    { id: 'interviews', name: 'Interviews', count: interviews.length },
    { id: 'jobs', name: 'Jobs', count: getJobsByCompany(id).length }
  ];

  return (
    <>
      <Head>
        <title>{company.name} - Reviews, Salaries & Interview Questions | CompanyCheck</title>
        <meta name="description" content={`Read employee reviews, salary information, and interview questions for ${company.name}. ${company.description}`} />
        <meta httpEquiv="Content-Language" content="en-US" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <CompanyCheckHeader />

        {/* Company Header */}
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
              {/* Company Info */}
              <div className="flex-1 mb-6 lg:mb-0">
                <div className="flex items-start space-x-6 mb-6">
                  <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center">
                    <FaBuilding className="text-3xl text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{company.name}</h1>
                    <p className="text-lg text-gray-600 mb-4">{company.description}</p>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="mr-2 text-gray-400" />
                        <span>{company.headquarters}</span>
                      </div>
                      <div className="flex items-center">
                        <FaUsers className="mr-2 text-gray-400" />
                        <span>{company.size}</span>
                      </div>
                      <div className="flex items-center">
                        <FaBuilding className="mr-2 text-gray-400" />
                        <span>{company.type}</span>
                      </div>
                      <div className="flex items-center">
                        <FaCalendarAlt className="mr-2 text-gray-400" />
                        <span>Founded {company.founded}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Stats */}
              <div className="lg:w-80">
                <div className="bg-gray-50 rounded-xl p-6">
                  {/* Rating */}
                  <div className="text-center mb-6">
                    <div className="flex justify-center items-center space-x-2 mb-2">
                      <div className="flex space-x-1">
                        {renderStars(company.rating)}
                      </div>
                      <span className="text-2xl font-bold text-gray-900">{company.rating}</span>
                    </div>
                    <p className="text-gray-600">{company.totalReviews.toLocaleString()} reviews</p>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{company.ceoApproval}%</div>
                      <div className="text-sm text-gray-600">CEO Approval</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{company.wouldRecommend}%</div>
                      <div className="text-sm text-gray-600">Recommend</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {averageSalary ? formatSalary(averageSalary) : 'N/A'}
                      </div>
                      <div className="text-sm text-gray-600">Avg. Salary</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">{company.totalInterviews.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Interviews</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                      Write a Review
                    </button>
                    <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors">
                      Add Salary
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="bg-white border-b border-gray-200 sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.name}
                  {tab.count && (
                    <span className="ml-2 bg-gray-100 text-gray-900 py-1 px-2 rounded-full text-xs">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </section>

        {/* Tab Content */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Company Overview */}
                <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Company Overview</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">About {company.name}</h3>
                      <p className="text-gray-700 mb-6">{company.description}</p>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Industry:</span>
                          <span className="font-medium text-gray-900">{company.industry}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Company Size:</span>
                          <span className="font-medium text-gray-900">{company.size}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Founded:</span>
                          <span className="font-medium text-gray-900">{company.founded}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">CEO:</span>
                          <span className="font-medium text-gray-900">{company.ceoName}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Locations</h3>
                      <div className="space-y-2 mb-6">
                        {company.locations.map((location, index) => (
                          <div key={index} className="flex items-center text-gray-700">
                            <FaMapMarkerAlt className="mr-2 text-gray-400" />
                            {location}
                          </div>
                        ))}
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Benefits</h3>
                      <div className="space-y-2">
                        {company.benefits.slice(0, 5).map((benefit, index) => (
                          <div key={index} className="flex items-center text-gray-700">
                            <FaThumbsUp className="mr-2 text-green-500" />
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rating Breakdown */}
                <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Rating Breakdown</h2>
                  <div className="space-y-4">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center">
                        <span className="w-8 text-sm text-gray-600">{rating}</span>
                        <FaStar className="text-yellow-400 mx-2" />
                        <div className="flex-1 bg-gray-200 rounded-full h-2 mx-4">
                          <div
                            className="bg-yellow-400 h-2 rounded-full"
                            style={{ width: `${reviewStats[rating] || 0}%` }}
                          ></div>
                        </div>
                        <span className="w-12 text-sm text-gray-600 text-right">
                          {reviewStats[rating] || 0}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Reviews Preview */}
                <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Recent Reviews</h2>
                    <button
                      onClick={() => setActiveTab('reviews')}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View All Reviews
                    </button>
                  </div>
                  <div className="space-y-6">
                    {reviews.slice(0, 2).map((review) => (
                      <ReviewCard key={review.id} review={review} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Employee Reviews</h2>
                  <p className="text-gray-600">{reviews.length} reviews from current and former employees</p>
                </div>
                {reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            )}

            {activeTab === 'salaries' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Salary Information</h2>
                  <p className="text-gray-600">{salaries.length} salary reports from employees</p>
                </div>
                {salaries.map((salary) => (
                  <SalaryCard key={salary.id} salary={salary} />
                ))}
              </div>
            )}

            {activeTab === 'interviews' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Interview Questions & Process</h2>
                      <p className="text-gray-600">{interviews.length} interview experiences</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">{interviewStats.offerRate}%</div>
                      <div className="text-sm text-gray-600">Offer Rate</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">{interviewStats.positive}%</div>
                      <div className="text-sm text-gray-600">Positive</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-600">{interviewStats.neutral}%</div>
                      <div className="text-sm text-gray-600">Neutral</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-red-600">{interviewStats.negative}%</div>
                      <div className="text-sm text-gray-600">Negative</div>
                    </div>
                  </div>
                </div>
                {interviews.map((interview) => (
                  <InterviewCard key={interview.id} interview={interview} />
                ))}
              </div>
            )}

            {activeTab === 'jobs' && (
              <div className="space-y-6">
                {/* Header and Filters */}
                <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Open Positions</h2>
                      <p className="text-gray-600">Current job openings at {company.name}</p>
                    </div>
                    <div className="text-sm text-gray-600">{jobs.length} job{jobs.length === 1 ? '' : 's'} found</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Filters */}
                  <div className="lg:col-span-1">
                    <JobFilters
                      filters={jobFilters}
                      onChange={setJobFilters}
                      onClear={() => setJobFilters({})}
                    />
                  </div>

                  {/* Jobs List */}
                  <div className="lg:col-span-2">
                    {jobs.length > 0 ? (
                      <div className="space-y-4">
                        {jobs.map(job => (
                          <JobCard
                            key={job.id}
                            job={job}
                            onApply={(j) => { setSelectedJob(j); setApplyOpen(true); }}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-12 text-center text-gray-500">
                        No open positions match your filters.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
      <JobApplyModal
        open={applyOpen}
        job={selectedJob}
        onClose={() => setApplyOpen(false)}
        onSubmit={applyForJob}
      />
    </>
  );
};

export default CompanyDetailPage;
