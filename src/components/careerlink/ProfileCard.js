import React, { useState } from 'react';
import Link from 'next/link';
import { 
  FaUserPlus, 
  FaUserCheck, 
  FaEnvelope, 
  FaEllipsisH,
  FaMapMarkerAlt,
  FaBuilding,
  FaGraduationCap,
  FaCheckCircle
} from 'react-icons/fa';
import careerLinkDataUtils from '../../utils/careerLinkData';

const ProfileCard = ({ user, connectionStatus = 'none', onConnect, onMessage, compact = false }) => {
  const [isConnected, setIsConnected] = useState(connectionStatus === 'connected');
  const [isPending, setIsPending] = useState(connectionStatus === 'pending');
  const { formatNumber, getCompanyById } = careerLinkDataUtils;

  const company = user.currentCompany ? getCompanyById(user.currentCompany) : null;

  const handleConnect = () => {
    if (isConnected) return;
    
    setIsPending(true);
    if (onConnect) onConnect(user.id);
    
    // Simulate connection request
    setTimeout(() => {
      setIsPending(false);
      setIsConnected(true);
    }, 1000);
  };

  const handleMessage = () => {
    if (onMessage) onMessage(user.id);
  };

  if (compact) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
        <div className="flex items-center space-x-3">
          <Link href={`/careerlink/profile/${user.id}`}>
            <img
              src={user.profilePicture}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-16 h-16 rounded-full cursor-pointer hover:opacity-90"
            />
          </Link>
          
          <div className="flex-1 min-w-0">
            <Link href={`/careerlink/profile/${user.id}`}>
              <h3 className="text-base font-semibold text-gray-900 hover:text-blue-600 cursor-pointer mb-1">
                {user.firstName} {user.lastName}
                {user.isVerified && (
                  <FaCheckCircle className="inline ml-1 text-blue-600" size={14} />
                )}
              </h3>
            </Link>
            <p className="text-sm text-gray-600 line-clamp-2 mb-2">{user.headline}</p>
            <p className="text-xs text-gray-500">{user.location}</p>
          </div>
          
          <div className="flex flex-col space-y-2">
            <button
              onClick={handleConnect}
              disabled={isConnected || isPending}
              className={`
                flex items-center space-x-1 px-3 py-1 rounded text-xs font-medium transition-colors
                ${isConnected 
                  ? 'bg-gray-100 text-gray-600 cursor-default'
                  : isPending
                  ? 'bg-gray-100 text-gray-600 cursor-default'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
                }
              `}
            >
              {isConnected ? (
                <>
                  <FaUserCheck size={12} />
                  <span>Connected</span>
                </>
              ) : isPending ? (
                <>
                  <FaUserPlus size={12} />
                  <span>Pending</span>
                </>
              ) : (
                <>
                  <FaUserPlus size={12} />
                  <span>Connect</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      {/* Background Image */}
      <div className="h-20 bg-gradient-to-r from-blue-500 to-purple-600 relative">
        <img
          src={user.backgroundImage}
          alt="Background"
          className="w-full h-full object-cover opacity-80"
        />
      </div>

      {/* Profile Content */}
      <div className="px-4 pb-4">
        {/* Profile Picture */}
        <div className="flex justify-center -mt-8 mb-4">
          <Link href={`/careerlink/profile/${user.id}`}>
            <img
              src={user.profilePicture}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-16 h-16 rounded-full border-4 border-white cursor-pointer hover:opacity-90"
            />
          </Link>
        </div>

        {/* Name and Headline */}
        <div className="text-center mb-4">
          <Link href={`/careerlink/profile/${user.id}`}>
            <h2 className="text-lg font-semibold text-gray-900 hover:text-blue-600 cursor-pointer mb-1">
              {user.firstName} {user.lastName}
              {user.isVerified && (
                <FaCheckCircle className="inline ml-1 text-blue-600" size={16} />
              )}
            </h2>
          </Link>
          <p className="text-sm text-gray-600 line-clamp-2 mb-2">{user.headline}</p>
          
          {/* Location */}
          <div className="flex items-center justify-center space-x-1 text-gray-500 mb-2">
            <FaMapMarkerAlt size={12} />
            <span className="text-sm">{user.location}</span>
          </div>

          {/* Current Company */}
          {company && (
            <Link href={`/careerlink/company/${user.currentCompany}`}>
              <div className="flex items-center justify-center space-x-1 text-blue-600 hover:text-blue-800 cursor-pointer">
                <FaBuilding size={12} />
                <span className="text-sm">{company.name}</span>
              </div>
            </Link>
          )}
        </div>

        {/* Stats */}
        <div className="flex justify-center space-x-4 mb-4 text-center">
          <div>
            <div className="font-semibold text-gray-900">{formatNumber(user.connections)}</div>
            <div className="text-xs text-gray-500">connections</div>
          </div>
          {user.followers > 0 && (
            <div>
              <div className="font-semibold text-gray-900">{formatNumber(user.followers)}</div>
              <div className="text-xs text-gray-500">followers</div>
            </div>
          )}
        </div>

        {/* Skills Preview */}
        {user.skills && user.skills.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1 justify-center">
              {user.skills.slice(0, 3).map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs"
                >
                  {skill}
                </span>
              ))}
              {user.skills.length > 3 && (
                <span className="text-gray-500 text-xs">
                  +{user.skills.length - 3} skills
                </span>
              )}
            </div>
          </div>
        )}

        {/* Education */}
        {user.education && user.education.length > 0 && (
          <div className="mb-4 text-center">
            <div className="flex items-center justify-center space-x-1 text-gray-600">
              <FaGraduationCap size={12} />
              <span className="text-sm">{user.education[0].school}</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <button
            onClick={handleConnect}
            disabled={isConnected || isPending}
            className={`
              flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded text-sm font-medium transition-colors
              ${isConnected 
                ? 'bg-gray-100 text-gray-600 cursor-default'
                : isPending
                ? 'bg-gray-100 text-gray-600 cursor-default'
                : 'bg-blue-600 text-white hover:bg-blue-700'
              }
            `}
          >
            {isConnected ? (
              <>
                <FaUserCheck size={14} />
                <span>Connected</span>
              </>
            ) : isPending ? (
              <>
                <FaUserPlus size={14} />
                <span>Pending</span>
              </>
            ) : (
              <>
                <FaUserPlus size={14} />
                <span>Connect</span>
              </>
            )}
          </button>

          <button
            onClick={handleMessage}
            className="border border-blue-600 text-blue-600 px-3 py-2 rounded text-sm font-medium hover:bg-blue-50 transition-colors"
          >
            <FaEnvelope size={14} />
          </button>

          <button className="border border-gray-300 text-gray-600 px-3 py-2 rounded text-sm font-medium hover:bg-gray-50 transition-colors">
            <FaEllipsisH size={14} />
          </button>
        </div>

        {/* Mutual Connections */}
        {user.connections > 0 && (
          <div className="mt-3 text-center">
            <span className="text-xs text-gray-500">
              You have {Math.min(5, Math.floor(user.connections * 0.1))} mutual connections
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
