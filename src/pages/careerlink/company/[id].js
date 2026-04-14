import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { 
  FaMapMarkerAlt, 
  FaUsers, 
  FaBuilding,
  FaExternalLinkAlt,
  FaArrowLeft,
  FaPlus,
  FaUserCheck,
  FaBriefcase,
  FaGlobe,
  FaCalendarAlt
} from 'react-icons/fa';
import CareerLinkHeader from '../../../components/careerlink/CareerLinkHeader';
import JobCard from '../../../components/careerlink/JobCard';
import careerLinkDataUtils from '../../../utils/careerLinkData';

const CompanyPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [company, setCompany] = useState(null);
  const [companyJobs, setCompanyJobs] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('about');

  const { getCompanyById, getJobsByCompany, formatNumber } = careerLinkDataUtils;

  useEffect(() => {
    if (id) {
      loadCompanyData();
    }
  }, [id]);

  const loadCompanyData = async () => {
    try {
      setLoading(true);
      const companyData = getCompanyById(id);
      if (!companyData) {
        router.push('/careerlink/search');
        return;
      }
      
      setCompany(companyData);
      
      const jobs = getJobsByCompany(id);
      setCompanyJobs(jobs);
      
      // Simulate following status
      setIsFollowing(Math.random() > 0.6);
    } catch (error) {
      console.error('Error loading company data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const tabs = [
    { id: 'about', name: 'About', count: null },
    { id: 'jobs', name: 'Jobs', count: companyJobs.length },
    { id: 'people', name: 'People', count: company?.employees || 0 }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <CareerLinkHeader />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading company details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="min-h-screen bg-gray-50">
        <CareerLinkHeader />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Company not found</h1>
            <p className="text-gray-600 mb-8">The company you're looking for doesn't exist.</p>
            <Link href="/careerlink/search">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Back to Search
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{company.name} - CareerLink</title>
        <meta name="description" content={company.description} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <CareerLinkHeader />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Back Button */}
          <div className="mb-6">
            <button
              onClick={() => router.back()}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <FaArrowLeft size={16} />
              <span>Back</span>
            </button>
          </div>

          {/* Company Header */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
            {/* Cover Image */}
            <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative">
              <img
                src={company.coverImage}
                alt="Cover"
                className="w-full h-full object-cover opacity-80"
              />
            </div>

            {/* Company Info */}
            <div className="px-6 pb-6 relative bg-white">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between -mt-16 mb-4">
                <div className="flex flex-col lg:flex-row lg:items-end lg:space-x-6">
                  {/* Company Logo */}
                  <div className="relative mb-4 lg:mb-0 z-10">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="w-32 h-32 rounded-lg border-6 border-white object-cover bg-white"
                    />
                  </div>

                  {/* Company Basic Info */}
                  <div className="lg:mb-4 relative z-10">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {company.name}
                    </h1>
                    <p className="text-lg text-gray-700 mb-3">{company.description}</p>
                    <div className="flex flex-wrap items-center gap-4 text-gray-600">
                      <div className="flex items-center space-x-1">
                        <FaBuilding size={14} />
                        <span>{company.industry}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaMapMarkerAlt size={14} />
                        <span>{company.headquarters}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaUsers size={14} />
                        <span>{formatNumber(company.employees)} employees</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaCalendarAlt size={14} />
                        <span>Founded {company.founded}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-3 mt-4 lg:mt-0 relative z-10">
                  <button
                    onClick={handleFollow}
                    className={`
                      flex items-center space-x-2 px-6 py-3 rounded-lg text-sm font-medium transition-colors
                      ${isFollowing 
                        ? 'bg-gray-100 text-gray-600 border border-gray-300'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                      }
                    `}
                  >
                    {isFollowing ? (
                      <>
                        <FaUserCheck size={16} />
                        <span>Following</span>
                      </>
                    ) : (
                      <>
                        <FaPlus size={16} />
                        <span>Follow</span>
                      </>
                    )}
                  </button>

                  {company.website && (
                    <a
                      href={`https://${company.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors flex items-center space-x-2"
                    >
                      <FaGlobe size={16} />
                      <span>Website</span>
                      <FaExternalLinkAlt size={12} />
                    </a>
                  )}
                </div>
              </div>

              {/* Company Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {formatNumber(company.followers)}
                  </div>
                  <div className="text-sm text-gray-600">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {formatNumber(company.employees)}
                  </div>
                  <div className="text-sm text-gray-600">Employees</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {company.jobOpenings?.toLocaleString() || '0'}
                  </div>
                  <div className="text-sm text-gray-600">Open Jobs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {company.founded}
                  </div>
                  <div className="text-sm text-gray-600">Founded</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-8">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.name}
                  {tab.count !== null && (
                    <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {activeTab === 'about' && (
                <div className="space-y-6">
                  {/* About Section */}
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">About {company.name}</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {company.about}
                    </p>

                    {/* Specialties */}
                    {company.specialties && company.specialties.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-3">Specialties</h3>
                        <div className="flex flex-wrap gap-2">
                          {company.specialties.map((specialty, index) => (
                            <span
                              key={index}
                              className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Culture */}
                    {company.culture && company.culture.length > 0 && (
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-3">Our Culture</h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                          {company.culture.map((value, index) => (
                            <li key={index}>{value}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'jobs' && (
                <div className="space-y-4">
                  {companyJobs.length > 0 ? (
                    companyJobs.map((job) => (
                      <JobCard key={job.id} job={job} />
                    ))
                  ) : (
                    <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                      <FaBriefcase className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No open positions</h3>
                      <p className="text-gray-600">
                        {company.name} doesn't have any open positions at the moment.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'people' && (
                <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                  <FaUsers className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">People at {company.name}</h3>
                  <p className="text-gray-600 mb-4">
                    Connect with {formatNumber(company.employees)} professionals working at {company.name}.
                  </p>
                  <Link href={`/careerlink/search?q=${encodeURIComponent(company.name)}`}>
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                      Find People
                    </button>
                  </Link>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Company Info Card */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Details</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-600">Industry</div>
                    <div className="font-medium">{company.industry}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Company Size</div>
                    <div className="font-medium">{company.size}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Headquarters</div>
                    <div className="font-medium">{company.headquarters}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Founded</div>
                    <div className="font-medium">{company.founded}</div>
                  </div>
                  {company.website && (
                    <div>
                      <div className="text-sm text-gray-600">Website</div>
                      <a
                        href={`https://${company.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-blue-600 hover:text-blue-800"
                      >
                        {company.website}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Similar Companies */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Similar Companies</h3>
                <p className="text-gray-600 text-sm">
                  Discover other companies in the {company.industry} industry.
                </p>
                <Link href={`/careerlink/search?q=${encodeURIComponent(company.industry)}`}>
                  <button className="mt-3 w-full border border-blue-600 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors">
                    Explore Similar Companies
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyPage;
