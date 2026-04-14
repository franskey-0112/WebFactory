import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import CareerLinkHeader from '../../components/careerlink/CareerLinkHeader';
import { getUsers, getCompanies, getJobs } from '../../utils/careerLinkData';
import { 
  FaUser, 
  FaBuilding, 
  FaBriefcase, 
  FaMapMarkerAlt, 
  FaUsers,
  FaPlus,
  FaSearch
} from 'react-icons/fa';

const SearchPage = () => {
  const router = useRouter();
  const { q } = router.query;
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [searchResults, setSearchResults] = useState({
    people: [],
    companies: [],
    jobs: []
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (q) {
      setSearchQuery(q);
      performSearch(q);
    }
  }, [q]);

  const performSearch = async (query) => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const users = getUsers();
      const companies = getCompanies();
      const jobs = getJobs();

      const searchTerm = query.toLowerCase();

      // Search people
      const peopleResults = users.filter(user =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm) ||
        user.headline.toLowerCase().includes(searchTerm) ||
        user.industry.toLowerCase().includes(searchTerm) ||
        user.skills.some(skill => skill.toLowerCase().includes(searchTerm))
      );

      // Search companies
      const companyResults = companies.filter(company =>
        company.name.toLowerCase().includes(searchTerm) ||
        company.industry.toLowerCase().includes(searchTerm) ||
        company.description.toLowerCase().includes(searchTerm) ||
        company.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm))
      );

      // Search jobs
      const jobResults = jobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm) ||
        job.company.toLowerCase().includes(searchTerm) ||
        job.description.toLowerCase().includes(searchTerm) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchTerm)) ||
        job.requirements.some(req => req.toLowerCase().includes(searchTerm))
      );

      setSearchResults({
        people: peopleResults,
        companies: companyResults,
        jobs: jobResults
      });
    } catch (error) {
      console.error('Error performing search:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/careerlink/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const getTotalResults = () => {
    return searchResults.people.length + searchResults.companies.length + searchResults.jobs.length;
  };

  const tabs = [
    { 
      id: 'all', 
      name: 'All', 
      count: getTotalResults()
    },
    { 
      id: 'people', 
      name: 'People', 
      count: searchResults.people.length,
      icon: FaUser
    },
    { 
      id: 'companies', 
      name: 'Companies', 
      count: searchResults.companies.length,
      icon: FaBuilding
    },
    { 
      id: 'jobs', 
      name: 'Jobs', 
      count: searchResults.jobs.length,
      icon: FaBriefcase
    }
  ];

  const PersonCard = ({ person }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-4">
        <img
          src={person.profilePicture}
          alt={`${person.firstName} ${person.lastName}`}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
            {person.firstName} {person.lastName}
          </h3>
          <p className="text-sm text-gray-600 mb-2">{person.headline}</p>
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <FaMapMarkerAlt className="mr-1" />
            <span>{person.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <FaUsers className="mr-1" />
            <span>{person.connections?.toLocaleString()} connections</span>
          </div>
          <div className="flex space-x-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
              <FaPlus className="mr-2" />
              Connect
            </button>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
              Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const CompanyCard = ({ company }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-4">
        <img
          src={company.logo}
          alt={company.name}
          className="w-16 h-16 rounded object-cover"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
            {company.name}
          </h3>
          <p className="text-sm text-gray-600 mb-2">{company.description}</p>
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <FaBuilding className="mr-1" />
            <span>{company.industry}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <FaMapMarkerAlt className="mr-1" />
            <span>{company.headquarters}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <FaUsers className="mr-1" />
            <span>{company.employees?.toLocaleString()} employees</span>
          </div>
          <div className="flex space-x-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
              <FaPlus className="mr-2" />
              Follow
            </button>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
              View Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const JobCard = ({ job }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 cursor-pointer mb-2">
            {job.title}
          </h3>
          <p className="text-sm text-gray-600 mb-2">{job.company}</p>
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <FaMapMarkerAlt className="mr-1" />
            <span>{job.location}</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {job.skills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
              >
                {skill}
              </span>
            ))}
            {job.skills.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                +{job.skills.length - 3} more
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {job.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              {job.applicants} applicants
            </div>
            <div className="text-sm font-medium text-green-600">
              {job.salary && `$${job.salary.min?.toLocaleString()} - $${job.salary.max?.toLocaleString()}`}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex space-x-2">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
          Apply
        </button>
        <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
          Save
        </button>
      </div>
    </div>
  );

  const renderResults = () => {
    if (loading) {
      return (
        <div className="text-center py-12">
          <div className="text-gray-500">Searching...</div>
        </div>
      );
    }

    if (!q || !q.trim()) {
      return (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaSearch className="text-gray-400 text-2xl" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Start your search</h3>
          <p className="text-gray-600">Enter keywords to find people, companies, and jobs</p>
        </div>
      );
    }

    if (getTotalResults() === 0) {
      return (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaSearch className="text-gray-400 text-2xl" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
          <p className="text-gray-600">
            Try different keywords or check your spelling
          </p>
        </div>
      );
    }

    switch (activeTab) {
      case 'people':
        return (
          <div className="space-y-6">
            {searchResults.people.map(person => (
              <PersonCard key={person.id} person={person} />
            ))}
          </div>
        );
      
      case 'companies':
        return (
          <div className="space-y-6">
            {searchResults.companies.map(company => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        );
      
      case 'jobs':
        return (
          <div className="space-y-6">
            {searchResults.jobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        );
      
      case 'all':
      default:
        return (
          <div className="space-y-8">
            {searchResults.people.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">People</h2>
                <div className="space-y-4">
                  {searchResults.people.slice(0, 3).map(person => (
                    <PersonCard key={person.id} person={person} />
                  ))}
                </div>
                {searchResults.people.length > 3 && (
                  <button
                    onClick={() => setActiveTab('people')}
                    className="mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    View all {searchResults.people.length} people results
                  </button>
                )}
              </div>
            )}

            {searchResults.companies.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Companies</h2>
                <div className="space-y-4">
                  {searchResults.companies.slice(0, 3).map(company => (
                    <CompanyCard key={company.id} company={company} />
                  ))}
                </div>
                {searchResults.companies.length > 3 && (
                  <button
                    onClick={() => setActiveTab('companies')}
                    className="mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    View all {searchResults.companies.length} company results
                  </button>
                )}
              </div>
            )}

            {searchResults.jobs.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Jobs</h2>
                <div className="space-y-4">
                  {searchResults.jobs.slice(0, 3).map(job => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
                {searchResults.jobs.length > 3 && (
                  <button
                    onClick={() => setActiveTab('jobs')}
                    className="mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    View all {searchResults.jobs.length} job results
                  </button>
                )}
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{q ? `Search results for "${q}"` : 'Search'} - CareerLink</title>
        <meta name="description" content="Search for people, companies, and jobs on CareerLink" />
      </Head>

      <CareerLinkHeader />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="max-w-2xl">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for people, companies, and jobs"
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
            </div>
          </form>
          
          {q && (
            <div className="mt-4">
              <p className="text-gray-600">
                Search results for <span className="font-semibold">"{q}"</span>
                {getTotalResults() > 0 && (
                  <span className="ml-2">({getTotalResults().toLocaleString()} results)</span>
                )}
              </p>
            </div>
          )}
        </div>

        {/* Tabs */}
        {q && getTotalResults() > 0 && (
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
                  <div className="flex items-center space-x-2">
                    {tab.icon && <tab.icon className="text-sm" />}
                    <span>{tab.name}</span>
                    {tab.count > 0 && (
                      <span className="bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                        {tab.count}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </nav>
          </div>
        )}

        {/* Results */}
        {renderResults()}
      </div>
    </div>
  );
};

export default SearchPage;
