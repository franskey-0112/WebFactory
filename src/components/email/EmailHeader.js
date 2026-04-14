import React, { useState } from 'react';
import { 
  FaSearch, 
  FaCog, 
  FaQuestionCircle, 
  FaUser, 
  FaBars,
  FaFilter,
  FaArrowLeft,
  FaSyncAlt,
  FaEllipsisV,
  FaCheckSquare,
  FaSquare
} from 'react-icons/fa';
import { currentUser, getEmailStats, advancedSearch } from '../../utils/emailData';

const EmailHeader = ({ 
  onMenuToggle, 
  onSearch, 
  onRefresh,
  selectedCount = 0,
  onSelectAll,
  onBulkAction,
  currentFolder = 'inbox',
  showBackButton = false,
  onBack
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({
    from: '',
    to: '',
    subject: '',
    hasAttachment: false,
    isStarred: false,
    isUnread: false,
    dateRange: { start: '', end: '' }
  });

  const stats = getEmailStats();

  const handleBasicSearch = (e) => {
    e.preventDefault();
    onSearch({ query: searchQuery });
  };

  const handleAdvancedSearch = (e) => {
    e.preventDefault();
    const searchParams = {
      query: searchQuery,
      ...advancedFilters
    };
    onSearch(searchParams);
    setShowAdvancedSearch(false);
  };

  const handleFilterChange = (field, value) => {
    setAdvancedFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getFolderTitle = (folder) => {
    const titles = {
      'inbox': 'Inbox',
      'starred': 'Starred',
      'sent': 'Sent',
      'drafts': 'Drafts',
      'spam': 'Spam',
      'trash': 'Trash',
      'archive': 'Archive'
    };
    return titles[folder] || folder.charAt(0).toUpperCase() + folder.slice(1);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      {/* Main Header */}
      <div className="flex items-center justify-between h-16 px-4">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Menu Button */}
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
          >
            <FaBars />
          </button>

          {/* Back Button */}
          {showBackButton && (
            <button
              onClick={onBack}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
            >
              <FaArrowLeft />
            </button>
          )}

          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <span className="text-xl font-semibold text-gray-900 hidden sm:block">Gmail</span>
          </div>

          {/* Folder Title */}
          <div className="hidden md:block">
            <h1 className="text-lg font-medium text-gray-900">
              {getFolderTitle(currentFolder)}
              {currentFolder === 'inbox' && stats.unread > 0 && (
                <span className="ml-2 text-sm text-gray-500">({stats.unread} unread)</span>
              )}
            </h1>
          </div>
        </div>

        {/* Search Section */}
        <div className="flex-1 max-w-2xl mx-8">
          <form onSubmit={handleBasicSearch} className="relative">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search mail"
                className="w-full pl-10 pr-12 py-2 bg-gray-100 border border-transparent rounded-full focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                title="Advanced search"
              >
                <FaFilter />
              </button>
            </div>

            {/* Advanced Search Panel */}
            {showAdvancedSearch && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-xl z-50 p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                    <input
                      type="text"
                      value={advancedFilters.from}
                      onChange={(e) => handleFilterChange('from', e.target.value)}
                      placeholder="Sender email or name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                    <input
                      type="text"
                      value={advancedFilters.to}
                      onChange={(e) => handleFilterChange('to', e.target.value)}
                      placeholder="Recipient email or name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <input
                      type="text"
                      value={advancedFilters.subject}
                      onChange={(e) => handleFilterChange('subject', e.target.value)}
                      placeholder="Email subject"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                    <div className="flex space-x-2">
                      <input
                        type="date"
                        value={advancedFilters.dateRange.start}
                        onChange={(e) => handleFilterChange('dateRange', { 
                          ...advancedFilters.dateRange, 
                          start: e.target.value 
                        })}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="date"
                        value={advancedFilters.dateRange.end}
                        onChange={(e) => handleFilterChange('dateRange', { 
                          ...advancedFilters.dateRange, 
                          end: e.target.value 
                        })}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Filters</label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={advancedFilters.hasAttachment}
                          onChange={(e) => handleFilterChange('hasAttachment', e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Has attachment</span>
                      </label>
                      
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={advancedFilters.isStarred}
                          onChange={(e) => handleFilterChange('isStarred', e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Is starred</span>
                      </label>
                      
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={advancedFilters.isUnread}
                          onChange={(e) => handleFilterChange('isUnread', e.target.checked)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Is unread</span>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      setAdvancedFilters({
                        from: '',
                        to: '',
                        subject: '',
                        hasAttachment: false,
                        isStarred: false,
                        isUnread: false,
                        dateRange: { start: '', end: '' }
                      });
                    }}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    Clear filters
                  </button>
                  
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={() => setShowAdvancedSearch(false)}
                      className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAdvancedSearch}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
            title="Refresh"
          >
            <FaSyncAlt />
          </button>

          {/* Settings */}
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
            <FaCog />
          </button>

          {/* Help */}
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
            <FaQuestionCircle />
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full"
              />
            </button>

            {showUserMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowUserMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-xl z-20">
                  {/* User Info */}
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      <img
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{currentUser.name}</p>
                        <p className="text-sm text-gray-500">{currentUser.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Email Statistics</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Total emails</p>
                        <p className="font-medium">{stats.total}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Unread</p>
                        <p className="font-medium">{stats.unread}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Starred</p>
                        <p className="font-medium">{stats.starred}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Today</p>
                        <p className="font-medium">{stats.today}</p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                      Account settings
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                      Privacy & Security
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                      Manage your account
                    </button>
                    <hr className="my-2" />
                    <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                      Sign out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedCount > 0 && (
        <div className="bg-blue-50 border-t border-blue-200 px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-blue-700 font-medium">
                {selectedCount} selected
              </span>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onBulkAction('markRead')}
                  className="text-sm text-blue-700 hover:text-blue-900"
                >
                  Mark as read
                </button>
                <button
                  onClick={() => onBulkAction('markUnread')}
                  className="text-sm text-blue-700 hover:text-blue-900"
                >
                  Mark as unread
                </button>
                <button
                  onClick={() => onBulkAction('star')}
                  className="text-sm text-blue-700 hover:text-blue-900"
                >
                  Add star
                </button>
                <button
                  onClick={() => onBulkAction('archive')}
                  className="text-sm text-blue-700 hover:text-blue-900"
                >
                  Archive
                </button>
                <button
                  onClick={() => onBulkAction('delete')}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
            
            <button
              onClick={() => onSelectAll(false)}
              className="text-sm text-blue-700 hover:text-blue-900"
            >
              Clear selection
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default EmailHeader;
