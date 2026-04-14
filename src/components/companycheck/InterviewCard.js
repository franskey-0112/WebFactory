import React, { useState } from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaThumbsUp, FaUser, FaCheckCircle, FaTimesCircle, FaQuestionCircle } from 'react-icons/fa';
import { getTimeAgo } from '../../utils/companyCheckData';

const InterviewCard = ({ interview, showCompanyName = false }) => {
  const [showQuestions, setShowQuestions] = useState(false);

  const getOutcomeColor = (outcome) => {
    switch (outcome) {
      case 'Offer':
        return 'text-green-600 bg-green-100';
      case 'Rejected':
        return 'text-red-600 bg-red-100';
      case 'No Response':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-yellow-600 bg-yellow-100';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-600 bg-green-100';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'Hard':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getExperienceColor = (experience) => {
    switch (experience) {
      case 'Positive':
        return 'text-green-600 bg-green-100';
      case 'Negative':
        return 'text-red-600 bg-red-100';
      case 'Neutral':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getOutcomeIcon = (outcome) => {
    switch (outcome) {
      case 'Offer':
        return <FaCheckCircle className="text-green-600" />;
      case 'Rejected':
        return <FaTimesCircle className="text-red-600" />;
      default:
        return <FaQuestionCircle className="text-gray-600" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      {/* Interview Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {interview.position}
          </h3>
          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-1 text-gray-400" />
              {interview.location}
            </div>
            <div className="flex items-center">
              <FaUser className="mr-1 text-gray-400" />
              {interview.anonymous ? 'Anonymous' : interview.authorName || 'Candidate'}
            </div>
            <div className="flex items-center">
              <FaCalendarAlt className="mr-1 text-gray-400" />
              {getTimeAgo(interview.date)}
            </div>
          </div>
        </div>
      </div>

      {/* Status Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${getOutcomeColor(interview.outcome)}`}>
          {getOutcomeIcon(interview.outcome)}
          <span className="ml-1">{interview.outcome}</span>
        </span>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(interview.difficulty)}`}>
          {interview.difficulty}
        </span>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getExperienceColor(interview.experience)}`}>
          {interview.experience} Experience
        </span>
      </div>

      {/* Interview Process */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-900 mb-2">Interview Process</h4>
        <p className="text-gray-700 text-sm">{interview.process}</p>
      </div>

      {/* Duration */}
      <div className="mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <FaClock className="mr-2 text-gray-400" />
          <span>Process Duration: <span className="font-medium">{interview.duration}</span></span>
        </div>
      </div>

      {/* Interview Questions */}
      {interview.questions && interview.questions.length > 0 && (
        <div className="mb-4">
          <button
            onClick={() => setShowQuestions(!showQuestions)}
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm mb-2"
          >
            <FaQuestionCircle className="mr-2" />
            Interview Questions ({interview.questions.length})
          </button>
          
          {showQuestions && (
            <div className="space-y-2">
              {interview.questions.map((question, index) => (
                <div key={index} className="bg-gray-50 rounded p-3">
                  <p className="text-sm text-gray-700">"{question}"</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tips and Advice */}
      {interview.tips && (
        <div className="mb-4">
          <h4 className="font-medium text-gray-900 mb-2">Tips & Advice</h4>
          <p className="text-gray-700 text-sm bg-blue-50 p-3 rounded">{interview.tips}</p>
        </div>
      )}

      {/* Helpful Counter */}
      <div className="pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Interview Experience
          </div>
          <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 text-sm">
            <FaThumbsUp className="text-xs" />
            <span>Helpful ({interview.helpful})</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
