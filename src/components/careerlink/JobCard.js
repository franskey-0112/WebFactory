import React, { useState } from 'react';
import Link from 'next/link';
import { 
  FaMapMarkerAlt, 
  FaClock, 
  FaUsers, 
  FaBookmark, 
  FaRegBookmark,
  FaExternalLinkAlt,
  FaBuilding
} from 'react-icons/fa';
import careerLinkDataUtils from '../../utils/careerLinkData';

const JobCard = ({ job, saved = false, onSave, onApply, compact = false }) => {
  const [isSaved, setIsSaved] = useState(saved);
  const { formatDate, formatSalary, getCompanyById } = careerLinkDataUtils;
  
  const company = getCompanyById(job.companyId);

  const handleSave = () => {
    setIsSaved(!isSaved);
    if (onSave) onSave(job.id, !isSaved);
  };

  const handleApply = () => {
    if (onApply) onApply(job.id);
  };

  if (compact) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1 min-w-0">
            {company && (
              <img
                src={company.logo}
                alt={company.name}
                className="w-12 h-12 rounded object-cover flex-shrink-0"
              />
            )}
            <div className="flex-1 min-w-0">
              <Link href={`/careerlink/jobs/${job.id}`}>
                <h3 className="text-sm font-semibold text-gray-900 hover:text-blue-600 cursor-pointer line-clamp-2">
                  {job.title}
                </h3>
              </Link>
              <p className="text-sm text-gray-600 mb-1">{job.company}</p>
              <p className="text-xs text-gray-500">{job.location} • {job.type}</p>
              {job.salary && (
                <p className="text-xs text-green-600 font-medium mt-1">
                  {formatSalary(job.salary)}
                </p>
              )}
            </div>
          </div>
          
          <button
            onClick={handleSave}
            className="text-gray-400 hover:text-blue-600 ml-2 flex-shrink-0"
          >
            {isSaved ? <FaBookmark size={16} /> : <FaRegBookmark size={16} />}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-4 flex-1 min-w-0">
          {company && (
            <img
              src={company.logo}
              alt={company.name}
              className="w-16 h-16 rounded object-cover flex-shrink-0"
            />
          )}
          <div className="flex-1 min-w-0">
            <Link href={`/careerlink/jobs/${job.id}`}>
              <h2 className="text-lg font-semibold text-gray-900 hover:text-blue-600 cursor-pointer mb-1">
                {job.title}
              </h2>
            </Link>
            <Link href={`/careerlink/company/${job.companyId}`}>
              <p className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer mb-1">
                {job.company}
              </p>
            </Link>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <FaMapMarkerAlt size={12} />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <FaClock size={12} />
                <span>{formatDate(job.postedDate)}</span>
              </div>
              {job.applicants && (
                <div className="flex items-center space-x-1">
                  <FaUsers size={12} />
                  <span>{job.applicants} applicants</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <button
          onClick={handleSave}
          className="text-gray-400 hover:text-blue-600 ml-4 flex-shrink-0"
        >
          {isSaved ? <FaBookmark size={20} /> : <FaRegBookmark size={20} />}
        </button>
      </div>

      {/* Job Details */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
          <span className="bg-gray-100 px-2 py-1 rounded">{job.type}</span>
          <span className="bg-gray-100 px-2 py-1 rounded">{job.level}</span>
          {job.remote && (
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded">Remote</span>
          )}
          {job.urgent && (
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded">Urgent</span>
          )}
        </div>

        {job.salary && (
          <div className="mb-3">
            <span className="text-green-600 font-semibold text-lg">
              {formatSalary(job.salary)}
            </span>
          </div>
        )}

        <p className="text-gray-700 text-sm line-clamp-3 mb-3">
          {job.description}
        </p>

        {/* Skills */}
        {job.skills && job.skills.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {job.skills.slice(0, 6).map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
              {job.skills.length > 6 && (
                <span className="text-gray-500 text-xs">
                  +{job.skills.length - 6} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={handleApply}
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Apply
          </button>
          <Link href={`/careerlink/jobs/${job.id}`}>
            <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-50 transition-colors flex items-center space-x-1">
              <span>View Details</span>
              <FaExternalLinkAlt size={12} />
            </button>
          </Link>
        </div>

        {/* Company Link */}
        {company && (
          <Link href={`/careerlink/company/${job.companyId}`}>
            <div className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 cursor-pointer">
              <FaBuilding size={12} />
              <span className="text-sm">View Company</span>
            </div>
          </Link>
        )}
      </div>

      {/* Benefits Preview */}
      {job.benefits && job.benefits.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Benefits</h4>
          <div className="flex flex-wrap gap-2">
            {job.benefits.slice(0, 3).map((benefit, index) => (
              <span
                key={index}
                className="bg-green-50 text-green-700 px-2 py-1 rounded text-xs"
              >
                {benefit}
              </span>
            ))}
            {job.benefits.length > 3 && (
              <span className="text-gray-500 text-xs">
                +{job.benefits.length - 3} more benefits
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobCard;
