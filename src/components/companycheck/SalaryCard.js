import React from 'react';
import { FaDollarSign, FaMapMarkerAlt, FaCalendarAlt, FaCheckCircle, FaBriefcase, FaCertificate } from 'react-icons/fa';
import { formatSalary, getTimeAgo } from '../../utils/companyCheckData';

const SalaryCard = ({ salary, showCompanyName = false }) => {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      {/* Salary Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {salary.position}
          </h3>
          {salary.level && (
            <p className="text-sm text-gray-600 mb-2">
              Level: {salary.level}
            </p>
          )}
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-1 text-gray-400" />
              {salary.location}
            </div>
            <div className="flex items-center">
              <FaBriefcase className="mr-1 text-gray-400" />
              {salary.experience}
            </div>
            {salary.verified && (
              <div className="flex items-center text-green-600">
                <FaCheckCircle className="mr-1" />
                Verified
              </div>
            )}
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500 flex items-center">
            <FaCalendarAlt className="mr-1" />
            {getTimeAgo(salary.date)}
          </div>
        </div>
      </div>

      {/* Total Compensation */}
      <div className="bg-green-50 rounded-lg p-4 mb-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-green-700 mb-1">
            {formatSalary(salary.totalComp)}
          </div>
          <div className="text-sm text-green-600 font-medium">
            Total Compensation
          </div>
        </div>
      </div>

      {/* Compensation Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-xl font-bold text-blue-700">
            {formatSalary(salary.baseSalary)}
          </div>
          <div className="text-xs text-blue-600">Base Salary</div>
        </div>
        
        {salary.bonus > 0 && (
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="text-xl font-bold text-purple-700">
              {formatSalary(salary.bonus)}
            </div>
            <div className="text-xs text-purple-600">Bonus</div>
          </div>
        )}
        
        {salary.equity > 0 && (
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <div className="text-xl font-bold text-orange-700">
              {formatSalary(salary.equity)}
            </div>
            <div className="text-xs text-orange-600">Equity</div>
          </div>
        )}
      </div>

      {/* Additional Info */}
      <div className="pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            {salary.anonymous && (
              <span className="text-gray-500">Anonymous</span>
            )}
            {salary.verified && (
              <div className="flex items-center text-green-600">
                <FaCertificate className="mr-1 text-xs" />
                <span>Verified Salary</span>
              </div>
            )}
          </div>
          <div className="text-gray-500">
            #{salary.id.split('_')[1]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryCard;
