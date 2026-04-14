import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import CompanyCheckHeader from '../../components/companycheck/CompanyCheckHeader';
import JobCard from '../../components/companycheck/JobCard';
import JobFilters from '../../components/companycheck/JobFilters';
import JobApplyModal from '../../components/companycheck/JobApplyModal';
import { 
  getJobs, 
  applyForJob, 
  getCompanyById,
  formatSalary 
} from '../../utils/companyCheckData';

const JobsPage = () => {
  const router = useRouter();
  const { q, position } = router.query;
  
  const [jobFilters, setJobFilters] = useState({});
  const [applyOpen, setApplyOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [filteredJobs, setFilteredJobs] = useState([]);

  const allJobs = getJobs();

  // Filter jobs based on query and filters
  useEffect(() => {
    let result = allJobs;

    // Search by query or position from URL
    const searchTerm = q || position || jobFilters.query;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(job =>
        job.title.toLowerCase().includes(term) ||
        job.department.toLowerCase().includes(term) ||
        job.description.toLowerCase().includes(term)
      );
    }

    // Apply additional filters
    if (jobFilters.location) {
      const loc = jobFilters.location.toLowerCase();
      result = result.filter(job => job.location.toLowerCase().includes(loc));
    }

    if (jobFilters.type) {
      result = result.filter(job => job.type === jobFilters.type);
    }

    if (jobFilters.level) {
      result = result.filter(job => job.level === jobFilters.level);
    }

    // Sort by posted date (newest first)
    result.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));

    setFilteredJobs(result);
  }, [allJobs, q, position, jobFilters]);

  // Set initial search if coming from URL
  useEffect(() => {
    if (q || position) {
      setJobFilters(prev => ({ ...prev, query: q || position || '' }));
    }
  }, [q, position]);

  return (
    <>
      <Head>
        <title>Job Openings - Find Your Next Career | CompanyCheck</title>
        <meta name="description" content="Browse job openings at top companies. Find positions that match your skills and career goals." />
        <meta httpEquiv="Content-Language" content="en-US" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <CompanyCheckHeader />

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Find Your Next Career
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto">
                Discover opportunities at top companies across all industries
              </p>
              {(q || position) && (
                <div className="bg-green-500 bg-opacity-30 rounded-lg p-4 max-w-2xl mx-auto">
                  <p className="text-green-100">
                    Showing results for: <strong>"{q || position}"</strong>
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Jobs Content */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">All Job Openings</h2>
                  <p className="text-gray-600">Latest opportunities from top companies</p>
                </div>
                <div className="text-sm text-gray-600">
                  {filteredJobs.length} job{filteredJobs.length === 1 ? '' : 's'} found
                </div>
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
                {filteredJobs.length > 0 ? (
                  <div className="space-y-4">
                    {filteredJobs.map(job => {
                      const company = getCompanyById(job.companyId);
                      return (
                        <div key={job.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                          {/* Company Info */}
                          <div className="flex items-center mb-3">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                              <span className="text-gray-600 font-bold text-sm">
                                {company?.name?.charAt(0) || 'C'}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{company?.name || 'Company'}</h4>
                              <p className="text-sm text-gray-500">{company?.industry || 'Technology'}</p>
                            </div>
                          </div>

                          {/* Job Details */}
                          <JobCard job={job} onApply={(j) => { setSelectedJob(j); setApplyOpen(true); }} />
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-md border border-gray-200 p-12 text-center text-gray-500">
                    <div className="text-6xl mb-4">💼</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
                    <p className="text-gray-600 mb-6">
                      No positions match your search criteria. Try adjusting your filters.
                    </p>
                    <button
                      onClick={() => setJobFilters({})}
                      className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
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

export default JobsPage;
