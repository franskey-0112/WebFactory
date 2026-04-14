import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { 
  FaMapMarkerAlt, 
  FaClock, 
  FaUsers, 
  FaBookmark, 
  FaRegBookmark,
  FaBuilding,
  FaDollarSign,
  FaArrowLeft,
  FaExternalLinkAlt,
  FaShare,
  FaFlag
} from 'react-icons/fa';
import CareerLinkHeader from '../../../components/careerlink/CareerLinkHeader';
import careerLinkDataUtils from '../../../utils/careerLinkData';

const JobDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [job, setJob] = useState(null);
  const [company, setCompany] = useState(null);
  const [isApplied, setIsApplied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  const { getJobById, getCompanyById, formatDate, formatSalary } = careerLinkDataUtils;

  useEffect(() => {
    if (id) {
      loadJobData();
    }
  }, [id]);

  const loadJobData = async () => {
    try {
      setLoading(true);
      const jobData = getJobById(id);
      if (!jobData) {
        router.push('/careerlink/jobs');
        return;
      }
      
      setJob(jobData);
      
      if (jobData.companyId) {
        const companyData = getCompanyById(jobData.companyId);
        setCompany(companyData);
      }
      
      // Simulate saved/applied status
      setIsSaved(Math.random() > 0.7);
      setIsApplied(Math.random() > 0.8);
    } catch (error) {
      console.error('Error loading job data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    setIsApplied(true);
    // In a real app, this would submit the application
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleShare = () => {
    // In a real app, this would open a share modal
    navigator.clipboard?.writeText(window.location.href);
    alert('Job link copied to clipboard!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <CareerLinkHeader />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading job details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50">
        <CareerLinkHeader />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Job not found</h1>
            <p className="text-gray-600 mb-8">The job you're looking for doesn't exist.</p>
            <Link href="/careerlink/jobs">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Back to Jobs
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
        <title>{job.title} at {job.company} - CareerLink</title>
        <meta name="description" content={job.description} />
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
              <span>Back to Jobs</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                {/* Job Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start space-x-4 flex-1">
                    {company && (
                      <img
                        src={company.logo}
                        alt={company.name}
                        className="w-16 h-16 rounded object-cover flex-shrink-0"
                      />
                    )}
                    <div className="flex-1">
                      <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        {job.title}
                      </h1>
                      <Link href={`/careerlink/company/${job.companyId}`}>
                        <p className="text-lg text-blue-600 hover:text-blue-800 font-medium cursor-pointer mb-3">
                          {job.company}
                        </p>
                      </Link>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <FaMapMarkerAlt size={14} />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FaClock size={14} />
                          <span>Posted {formatDate(job.postedDate)}</span>
                        </div>
                        {job.applicants && (
                          <div className="flex items-center space-x-1">
                            <FaUsers size={14} />
                            <span>{job.applicants} applicants</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleSave}
                      className="text-gray-400 hover:text-blue-600 p-2"
                    >
                      {isSaved ? <FaBookmark size={20} /> : <FaRegBookmark size={20} />}
                    </button>
                    <button
                      onClick={handleShare}
                      className="text-gray-400 hover:text-blue-600 p-2"
                    >
                      <FaShare size={20} />
                    </button>
                  </div>
                </div>

                {/* Job Details */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {job.type}
                    </span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {job.level}
                    </span>
                    {job.remote && (
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        Remote
                      </span>
                    )}
                    {job.urgent && (
                      <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                        Urgent
                      </span>
                    )}
                  </div>

                  {job.salary && (
                    <div className="mb-4">
                      <div className="flex items-center space-x-2">
                        <FaDollarSign className="text-green-600" size={16} />
                        <span className="text-green-600 font-semibold text-lg">
                          {formatSalary(job.salary)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Job Description */}
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h2>
                  <div className="prose prose-sm max-w-none text-gray-700">
                    <p className="mb-4">{job.description}</p>
                  </div>
                </div>

                {/* Requirements */}
                {job.requirements && job.requirements.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      {job.requirements.map((requirement, index) => (
                        <li key={index}>{requirement}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Responsibilities */}
                {job.responsibilities && job.responsibilities.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Responsibilities</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      {job.responsibilities.map((responsibility, index) => (
                        <li key={index}>{responsibility}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Skills */}
                {job.skills && job.skills.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Required Skills</h2>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Benefits */}
                {job.benefits && job.benefits.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Benefits</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      {job.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Apply Card */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 sticky top-20">
                <div className="text-center mb-6">
                  {isApplied ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="text-green-800 font-medium mb-2">
                        ✓ Application Submitted
                      </div>
                      <p className="text-green-600 text-sm">
                        Your application has been sent to {job.company}
                      </p>
                    </div>
                  ) : (
                    <button
                      onClick={handleApply}
                      className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      Apply Now
                    </button>
                  )}
                </div>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Job Type:</span>
                    <span className="font-medium">{job.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Experience:</span>
                    <span className="font-medium">{job.level}</span>
                  </div>
                  {job.salary && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Salary:</span>
                      <span className="font-medium text-green-600">
                        {formatSalary(job.salary)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium">{job.location}</span>
                  </div>
                </div>
              </div>

              {/* Company Info */}
              {company && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">About {company.name}</h3>
                  <div className="flex items-center space-x-3 mb-4">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900">{company.name}</h4>
                      <p className="text-sm text-gray-600">{company.industry}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 text-sm mb-4">{company.description}</p>
                  
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Industry:</span>
                      <span className="font-medium">{company.industry}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Size:</span>
                      <span className="font-medium">{company.employees?.toLocaleString()} employees</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Founded:</span>
                      <span className="font-medium">{company.founded}</span>
                    </div>
                  </div>

                  <Link href={`/careerlink/company/${company.id}`}>
                    <button className="w-full border border-blue-600 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2">
                      <FaBuilding size={14} />
                      <span>View Company</span>
                      <FaExternalLinkAlt size={12} />
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetailPage;
