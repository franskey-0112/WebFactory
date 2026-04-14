import React from 'react';
import Link from 'next/link';
import { FaStar, FaMapMarkerAlt, FaUsers, FaBuilding } from 'react-icons/fa';

const CompanyCard = ({ company, showDetails = true }) => {
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

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
      <div className="p-6">
        {/* Company Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
              <FaBuilding className="text-2xl text-gray-400" />
            </div>
            <div>
              <Link href={`/companycheck/company/${company.id}`}>
                <h3 className="text-xl font-bold text-gray-900 hover:text-blue-600 cursor-pointer">
                  {company.name}
                </h3>
              </Link>
              <p className="text-gray-600 text-sm">{company.industry}</p>
            </div>
          </div>
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              {renderStars(company.rating)}
            </div>
            <span className="font-semibold text-gray-900">{company.rating}</span>
          </div>
          <span className="text-gray-500 text-sm">
            {company.totalReviews.toLocaleString()} reviews
          </span>
        </div>

        {/* Company Details */}
        {showDetails && (
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <FaMapMarkerAlt className="mr-2 text-gray-400" />
              <span>{company.headquarters}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <FaUsers className="mr-2 text-gray-400" />
              <span>{company.size}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <FaBuilding className="mr-2 text-gray-400" />
              <span>{company.type}</span>
            </div>
          </div>
        )}

        {/* Description */}
        <p className="text-gray-700 text-sm mb-4 line-clamp-2">
          {company.description}
        </p>

        {/* Key Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">
              {company.ceoApproval}%
            </div>
            <div className="text-xs text-gray-500">CEO Approval</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">
              {company.wouldRecommend}%
            </div>
            <div className="text-xs text-gray-500">Recommend</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">
              {company.totalSalaries.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500">Salaries</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Link href={`/companycheck/company/${company.id}`}>
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
              View Company
            </button>
          </Link>
          <Link href={`/companycheck/company/${company.id}?tab=reviews`}>
            <button className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium transition-colors">
              Read Reviews
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
