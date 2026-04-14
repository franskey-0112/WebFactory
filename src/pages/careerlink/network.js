import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import CareerLinkHeader from '../../components/careerlink/CareerLinkHeader';
import { getUsers, getCompanies } from '../../utils/careerLinkData';
import { FaPlus, FaUserCheck, FaBuilding, FaMapMarkerAlt, FaUsers, FaCheck } from 'react-icons/fa';

const NetworkPage = () => {
  const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [activeTab, setActiveTab] = useState('connections');
  const [loading, setLoading] = useState(true);
  const [connectedUsers, setConnectedUsers] = useState(new Set());
  const [followedCompanies, setFollowedCompanies] = useState(new Set());
  const [messagedUsers, setMessagedUsers] = useState(new Set());
  const [processedInvitations, setProcessedInvitations] = useState(new Set());

  useEffect(() => {
    loadNetworkData();
  }, []);

  const loadNetworkData = async () => {
    try {
      setLoading(true);
      const allUsers = getUsers();
      const allCompanies = getCompanies();
      
      // Filter out current user and show others as potential connections
      const otherUsers = allUsers.filter(user => user.id !== 'sarah-chen');
      
      setUsers(otherUsers);
      setCompanies(allCompanies);
    } catch (error) {
      console.error('Error loading network data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handler functions
  const handleConnect = (userId) => {
    setConnectedUsers(prev => new Set([...prev, userId]));
  };

  const handleMessage = (userId) => {
    setMessagedUsers(prev => new Set([...prev, userId]));
  };

  const handleFollowCompany = (companyId) => {
    setFollowedCompanies(prev => new Set([...prev, companyId]));
  };

  const handleAcceptInvitation = (invitationId) => {
    setProcessedInvitations(prev => new Set([...prev, `accepted-${invitationId}`]));
  };

  const handleIgnoreInvitation = (invitationId) => {
    setProcessedInvitations(prev => new Set([...prev, `ignored-${invitationId}`]));
  };

  const tabs = [
    { id: 'connections', name: 'My Network', count: users.length },
    { id: 'invitations', name: 'Invitations', count: 5 },
    { id: 'companies', name: 'Companies', count: companies.length },
    { id: 'people', name: 'People You May Know', count: users.length }
  ];

  const ConnectionCard = ({ user }) => {
    const isConnected = connectedUsers.has(user.id);
    const isMessaged = messagedUsers.has(user.id);
    
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
        <div className="flex items-start space-x-4">
          <img
            src={user.profilePicture}
            alt={`${user.firstName} ${user.lastName}`}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {user.firstName} {user.lastName}
            </h3>
            <p className="text-sm text-gray-600 mb-2">{user.headline}</p>
            <div className="flex items-center text-sm text-gray-500 mb-3">
              <FaMapMarkerAlt className="mr-1" />
              <span>{user.location}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <FaUsers className="mr-1" />
              <span>{user.connections.toLocaleString()} connections</span>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => handleConnect(user.id)}
                disabled={isConnected}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isConnected 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isConnected ? (
                  <>
                    <FaUserCheck className="mr-2" />
                    Connected
                  </>
                ) : (
                  <>
                    <FaPlus className="mr-2" />
                    Connect
                  </>
                )}
              </button>
              <button 
                onClick={() => handleMessage(user.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isMessaged
                    ? 'bg-blue-100 text-blue-800 border border-blue-200'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {isMessaged ? 'Message Sent' : 'Message'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CompanyCard = ({ company }) => {
    const isFollowed = followedCompanies.has(company.id);
    
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
        <div className="flex items-start space-x-4">
          <img
            src={company.logo}
            alt={company.name}
            className="w-16 h-16 rounded object-cover"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {company.name}
            </h3>
            <p className="text-sm text-gray-600 mb-2">{company.description}</p>
            <div className="flex items-center text-sm text-gray-500 mb-3">
              <FaBuilding className="mr-1" />
              <span>{company.industry}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <FaUsers className="mr-1" />
              <span>{company.employees.toLocaleString()} employees</span>
            </div>
            <button 
              onClick={() => handleFollowCompany(company.id)}
              disabled={isFollowed}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isFollowed
                  ? 'bg-green-100 text-green-800 border border-green-200'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isFollowed ? (
                <>
                  <FaUserCheck className="mr-2" />
                  Following
                </>
              ) : (
                <>
                  <FaPlus className="mr-2" />
                  Follow
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const InvitationCard = ({ invitation }) => {
    const isAccepted = processedInvitations.has(`accepted-${invitation.id}`);
    const isIgnored = processedInvitations.has(`ignored-${invitation.id}`);
    const isProcessed = isAccepted || isIgnored;
    
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-start space-x-4">
          <img
            src={invitation.profilePicture}
            alt={invitation.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900">
              {invitation.name}
            </h3>
            <p className="text-sm text-gray-600 mb-2">{invitation.headline}</p>
            <p className="text-sm text-gray-500 mb-4">{invitation.message}</p>
            
            {isProcessed ? (
              <div className={`px-4 py-2 rounded-md text-sm font-medium ${
                isAccepted 
                  ? 'bg-green-100 text-green-800 border border-green-200' 
                  : 'bg-gray-100 text-gray-600 border border-gray-200'
              }`}>
                {isAccepted ? (
                  <>
                    <FaUserCheck className="inline mr-2" />
                    Invitation Accepted
                  </>
                ) : (
                  'Invitation Ignored'
                )}
              </div>
            ) : (
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleAcceptInvitation(invitation.id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Accept
                </button>
                <button 
                  onClick={() => handleIgnoreInvitation(invitation.id)}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  Ignore
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Sample invitation data
  const invitations = [
    {
      id: 1,
      name: 'Alex Thompson',
      headline: 'Lead Data Scientist at Microsoft',
      profilePicture: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?w=400&h=400&fit=crop',
      message: 'I\'d like to connect with you on CareerLink.'
    },
    {
      id: 2,
      name: 'Priya Patel',
      headline: 'UX Design Director at Apple',
      profilePicture: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?w=400&h=400&fit=crop',
      message: 'Great meeting you at the design conference!'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'connections':
        return (
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {users.slice(0, 8).map(user => (
                <ConnectionCard key={user.id} user={user} />
              ))}
            </div>
          </div>
        );
      
      case 'invitations':
        return (
          <div className="space-y-6">
            {invitations.map(invitation => (
              <InvitationCard key={invitation.id} invitation={invitation} />
            ))}
          </div>
        );
      
      case 'companies':
        return (
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {companies.map(company => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
          </div>
        );
      
      case 'people':
        return (
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {users.map(user => (
                <ConnectionCard key={user.id} user={user} />
              ))}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Head>
          <title>My Network - CareerLink</title>
        </Head>
        <CareerLinkHeader />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>My Network - CareerLink</title>
        <meta name="description" content="Grow your professional network on CareerLink" />
      </Head>

      <CareerLinkHeader />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Network</h1>
          <p className="text-gray-600 mt-2">
            Grow your professional network and stay connected with colleagues
          </p>
        </div>

        {/* Tabs */}
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
                {tab.name}
                <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
};

export default NetworkPage;
