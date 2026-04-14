import React, { useState } from 'react';
import { FaStar, FaThumbsUp, FaUser, FaMapMarkerAlt, FaCalendarAlt, FaCheck, FaTimes } from 'react-icons/fa';
import { getTimeAgo } from '../../utils/companyCheckData';

const ReviewCard = ({ review, showCompanyName = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar 
          key={i} 
          className={i <= rating ? 'text-yellow-400' : 'text-gray-300'} 
        />
      );
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      {/* Review Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {review.title}
          </h3>
          <div className="flex items-center space-x-1 mb-2">
            {renderStars(review.rating)}
            <span className="ml-2 font-medium text-gray-900">{review.rating}.0</span>
          </div>
        </div>
        <div className="text-right text-sm text-gray-500">
          <div className="flex items-center">
            <FaCalendarAlt className="mr-1" />
            {getTimeAgo(review.date)}
          </div>
        </div>
      </div>

      {/* Reviewer Info */}
      <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
        <div className="flex items-center">
          <FaUser className="mr-2 text-gray-400" />
          {review.anonymous ? 'Anonymous Employee' : review.authorName || 'Employee'}
        </div>
        <div className="flex items-center">
          <span className="font-medium">{review.position}</span>
        </div>
        <div className="flex items-center">
          <FaMapMarkerAlt className="mr-1 text-gray-400" />
          {review.location}
        </div>
        <div className="flex items-center">
          <span className={`px-2 py-1 rounded-full text-xs ${
            review.employment === 'Current Employee' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {review.employment}
          </span>
        </div>
      </div>

      {/* Review Content */}
      <div className="space-y-4">
        {/* Pros */}
        <div>
          <h4 className="font-medium text-green-700 mb-2 flex items-center">
            <FaCheck className="mr-2 text-green-600" />
            Pros
          </h4>
          <p className={`text-gray-700 ${!isExpanded && review.pros.length > 200 ? 'line-clamp-3' : ''}`}>
            {review.pros}
          </p>
        </div>

        {/* Cons */}
        <div>
          <h4 className="font-medium text-red-700 mb-2 flex items-center">
            <FaTimes className="mr-2 text-red-600" />
            Cons
          </h4>
          <p className={`text-gray-700 ${!isExpanded && review.cons.length > 200 ? 'line-clamp-3' : ''}`}>
            {review.cons}
          </p>
        </div>

        {/* Advice */}
        {review.advice && (
          <div>
            <h4 className="font-medium text-blue-700 mb-2">
              Advice to Management
            </h4>
            <p className={`text-gray-700 ${!isExpanded && review.advice.length > 200 ? 'line-clamp-3' : ''}`}>
              {review.advice}
            </p>
          </div>
        )}

        {/* Expand/Collapse Button */}
        {(review.pros.length > 200 || review.cons.length > 200 || (review.advice && review.advice.length > 200)) && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            {isExpanded ? 'Show Less' : 'Show More'}
          </button>
        )}
      </div>

      {/* Review Footer */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            {/* CEO Approval */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">CEO Approval:</span>
              <span className={`text-sm font-medium ${
                review.ceoApproval ? 'text-green-600' : 'text-red-600'
              }`}>
                {review.ceoApproval ? 'Approve' : 'Disapprove'}
              </span>
            </div>

            {/* Would Recommend */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Recommend:</span>
              <span className={`text-sm font-medium ${
                review.wouldRecommend ? 'text-green-600' : 'text-red-600'
              }`}>
                {review.wouldRecommend ? 'Yes' : 'No'}
              </span>
            </div>
          </div>

          {/* Helpful Count */}
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 text-sm">
              <FaThumbsUp className="text-xs" />
              <span>Helpful ({review.helpful})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
