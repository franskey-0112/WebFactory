import React from 'react';
import { FaMapMarkerAlt, FaBriefcase, FaMoneyBillWave, FaCalendarAlt, FaUserTie } from 'react-icons/fa';
import { formatSalary } from '../../utils/companyCheckData';

const JobCard = ({ job, onApply }) => {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
        <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">{job.type}</span>
      </div>
      <p className="text-gray-600 text-sm mb-4">{job.department} • {job.level}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mb-4">
        <div className="flex items-center text-gray-700">
          <FaMapMarkerAlt className="mr-2 text-gray-400" /> {job.location}
        </div>
        <div className="flex items-center text-gray-700">
          <FaMoneyBillWave className="mr-2 text-gray-400" /> {formatSalary(job.salaryRange.min)} - {formatSalary(job.salaryRange.max)}
        </div>
        <div className="flex items-center text-gray-700">
          <FaUserTie className="mr-2 text-gray-400" /> {job.minExperience}+ yrs exp
        </div>
        <div className="flex items-center text-gray-700">
          <FaCalendarAlt className="mr-2 text-gray-400" /> Posted {new Date(job.postedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </div>
      </div>

      <p className="text-gray-700 text-sm mb-4 line-clamp-2">{job.description}</p>

      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-500">Job ID: {job.id}</div>
        <button onClick={() => onApply(job)} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium">Apply</button>
      </div>
    </div>
  );
};

export default JobCard;


