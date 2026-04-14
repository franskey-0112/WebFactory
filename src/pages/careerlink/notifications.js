import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import CareerLinkHeader from '../../components/careerlink/CareerLinkHeader';
import { getNotifications, getUsers } from '../../utils/careerLinkData';
import { 
  FaBell,
  FaUserPlus,
  FaBriefcase,
  FaThumbsUp,
  FaComment,
  FaShare,
  FaEye,
  FaGraduationCap,
  FaBuilding,
  FaEllipsisH,
  FaCheck,
  FaTimes
} from 'react-icons/fa';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const notificationData = getNotifications();
      const users = getUsers();
      
      // Enhanced notifications with more variety
      const enhancedNotifications = [
        ...notificationData,
        // Connection requests
        {
          id: 'notif-conn-1',
          type: 'connection_request',
          actor: users.find(u => u.id === 'alex-thompson'),
          timestamp: '2024-03-15T10:30:00Z',
          read: false,
          message: 'wants to connect with you'
        },
        {
          id: 'notif-conn-2',
          type: 'connection_accepted',
          actor: users.find(u => u.id === 'priya-patel'),
          timestamp: '2024-03-15T09:15:00Z',
          read: false,
          message: 'accepted your connection request'
        },
        // Job alerts
        {
          id: 'notif-job-1',
          type: 'job_alert',
          actor: 'system',
          timestamp: '2024-03-15T08:00:00Z',
          read: true,
          message: '12 new jobs matching your preferences',
          jobCount: 12
        },
        {
          id: 'notif-job-2',
          type: 'job_application',
          actor: 'system',
          timestamp: '2024-03-14T16:30:00Z',
          read: false,
          message: 'Your application for Senior Data Scientist at Google has been viewed',
          company: 'Google'
        },
        // Post interactions
        {
          id: 'notif-like-1',
          type: 'post_like',
          actor: users.find(u => u.id === 'michael-brown'),
          timestamp: '2024-03-15T14:20:00Z',
          read: false,
          message: 'liked your post about machine learning trends'
        },
        {
          id: 'notif-comment-1',
          type: 'post_comment',
          actor: users.find(u => u.id === 'lisa-wang'),
          timestamp: '2024-03-15T13:45:00Z',
          read: false,
          message: 'commented on your post about market analysis'
        },
        // Profile views
        {
          id: 'notif-view-1',
          type: 'profile_view',
          actor: users.find(u => u.id === 'robert-davis'),
          timestamp: '2024-03-15T11:10:00Z',
          read: true,
          message: 'viewed your profile'
        },
        // Company updates
        {
          id: 'notif-company-1',
          type: 'company_update',
          actor: 'system',
          timestamp: '2024-03-14T14:00:00Z',
          read: true,
          message: 'Google posted 5 new job openings',
          company: 'Google'
        },
        // Industry news
        {
          id: 'notif-news-1',
          type: 'industry_news',
          actor: 'system',
          timestamp: '2024-03-14T12:00:00Z',
          read: true,
          message: 'New article: "The Future of AI in Healthcare" trending in your industry'
        }
      ];

      setNotifications(enhancedNotifications.sort((a, b) => 
        new Date(b.timestamp) - new Date(a.timestamp)
      ));
    } catch (error) {
      console.error('Error loading notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (notificationId) => {
    setNotifications(prev =>
      prev.filter(notif => notif.id !== notificationId)
    );
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'connection_request':
      case 'connection_accepted':
        return FaUserPlus;
      case 'job_alert':
      case 'job_application':
        return FaBriefcase;
      case 'post_like':
        return FaThumbsUp;
      case 'post_comment':
        return FaComment;
      case 'post_share':
        return FaShare;
      case 'profile_view':
        return FaEye;
      case 'company_update':
        return FaBuilding;
      case 'industry_news':
        return FaGraduationCap;
      default:
        return FaBell;
    }
  };

  const getNotificationIconColor = (type) => {
    switch (type) {
      case 'connection_request':
      case 'connection_accepted':
        return 'text-blue-500 bg-blue-100';
      case 'job_alert':
      case 'job_application':
        return 'text-green-500 bg-green-100';
      case 'post_like':
        return 'text-red-500 bg-red-100';
      case 'post_comment':
        return 'text-purple-500 bg-purple-100';
      case 'post_share':
        return 'text-orange-500 bg-orange-100';
      case 'profile_view':
        return 'text-indigo-500 bg-indigo-100';
      case 'company_update':
        return 'text-gray-500 bg-gray-100';
      case 'industry_news':
        return 'text-yellow-500 bg-yellow-100';
      default:
        return 'text-gray-500 bg-gray-100';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInSeconds = Math.floor((now - time) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
    return `${Math.floor(diffInSeconds / 86400)}d`;
  };

  const filteredNotifications = notifications.filter(notif => {
    switch (activeTab) {
      case 'connections':
        return ['connection_request', 'connection_accepted'].includes(notif.type);
      case 'jobs':
        return ['job_alert', 'job_application'].includes(notif.type);
      case 'posts':
        return ['post_like', 'post_comment', 'post_share'].includes(notif.type);
      case 'all':
      default:
        return true;
    }
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const tabs = [
    { id: 'all', name: 'All', count: notifications.length },
    { id: 'connections', name: 'Connections', count: notifications.filter(n => ['connection_request', 'connection_accepted'].includes(n.type)).length },
    { id: 'jobs', name: 'Jobs', count: notifications.filter(n => ['job_alert', 'job_application'].includes(n.type)).length },
    { id: 'posts', name: 'Posts', count: notifications.filter(n => ['post_like', 'post_comment', 'post_share'].includes(n.type)).length }
  ];

  const NotificationItem = ({ notification }) => {
    const IconComponent = getNotificationIcon(notification.type);
    const iconColor = getNotificationIconColor(notification.type);
    
    return (
      <div
        className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
          !notification.read ? 'bg-blue-50' : 'bg-white'
        }`}
        onClick={() => markAsRead(notification.id)}
      >
        <div className="flex items-start space-x-3">
          {/* Icon or Profile Picture */}
          <div className="flex-shrink-0">
            {notification.actor && typeof notification.actor === 'object' ? (
              <div className="relative">
                <img
                  src={notification.actor.profilePicture}
                  alt={notification.actor.firstName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center ${iconColor}`}>
                  <IconComponent size={12} />
                </div>
              </div>
            ) : (
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${iconColor}`}>
                <IconComponent size={20} />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-900">
                  {notification.actor && typeof notification.actor === 'object' ? (
                    <span className="font-semibold">
                      {notification.actor.firstName} {notification.actor.lastName}
                    </span>
                  ) : null}
                  {' '}{notification.message}
                </p>
                <div className="flex items-center mt-1 space-x-2">
                  <span className="text-xs text-gray-500">
                    {formatTimeAgo(notification.timestamp)}
                  </span>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  )}
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex items-center space-x-2 ml-4">
                {notification.type === 'connection_request' && (
                  <>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700">
                      Accept
                    </button>
                    <button className="border border-gray-300 text-gray-700 px-3 py-1 rounded text-xs hover:bg-gray-50">
                      Decline
                    </button>
                  </>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(notification.id);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes size={12} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Head>
          <title>Notifications - CareerLink</title>
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
        <title>Notifications - CareerLink</title>
        <meta name="description" content="Stay updated with your professional network" />
      </Head>

      <CareerLinkHeader />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
            {unreadCount > 0 && (
              <p className="text-gray-600 mt-2">
                You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
              </p>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              Mark all as read
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
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
                {tab.count > 0 && (
                  <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full text-xs">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Notifications List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map(notification => (
              <NotificationItem key={notification.id} notification={notification} />
            ))
          ) : (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaBell className="text-gray-400 text-2xl" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
              <p className="text-gray-600">
                You're all caught up! Check back later for new updates.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
