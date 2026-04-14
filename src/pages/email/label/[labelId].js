import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import EmailHeader from '../../../components/email/EmailHeader';
import EmailSidebar from '../../../components/email/EmailSidebar';
import EmailList from '../../../components/email/EmailList';
import EmailCompose from '../../../components/email/EmailCompose';
import { 
  getEmailsByLabel, 
  getLabelById,
  searchEmails,
  advancedSearch,
  toggleStar,
  bulkOperations,
  labels
} from '../../../utils/emailData';

const EmailLabelPage = () => {
  const router = useRouter();
  const { labelId } = router.query;
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [composeOpen, setComposeOpen] = useState(false);
  const [emails, setEmails] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState(null);
  const [label, setLabel] = useState(null);

  // Validate label
  const isValidLabel = labelId && labels.some(l => l.id === labelId);

  // Load emails when label changes
  useEffect(() => {
    if (isValidLabel) {
      const labelData = getLabelById(labelId);
      setLabel(labelData);
      loadEmails();
    }
  }, [labelId, isValidLabel]);

  const loadEmails = async () => {
    if (!labelId) return;
    
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const labelEmails = getEmailsByLabel(labelId);
      setEmails(labelEmails);
      setSearchResults(null);
      setSelectedEmails([]);
    } catch (error) {
      console.error('Failed to load emails:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (searchParams) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      let results;
      if (searchParams.query && Object.keys(searchParams).length === 1) {
        // Basic search - filter within current label
        results = searchEmails(searchParams.query).filter(email =>
          email.labels && email.labels.includes(labelId)
        );
      } else {
        // Advanced search with label filter
        const advancedResults = advancedSearch(searchParams);
        results = advancedResults.filter(email =>
          email.labels && email.labels.includes(labelId)
        );
      }
      
      setSearchResults(results);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    loadEmails();
  };

  const handleSelectEmail = (emailId, isSelected) => {
    setSelectedEmails(prev => 
      isSelected 
        ? [...prev, emailId]
        : prev.filter(id => id !== emailId)
    );
  };

  const handleSelectAll = (selectAll) => {
    const displayEmails = searchResults || emails;
    setSelectedEmails(selectAll ? displayEmails.map(e => e.id) : []);
  };

  const handleToggleStar = (emailId) => {
    toggleStar(emailId);
    // Refresh the current view
    if (searchResults) {
      const updatedResults = searchResults.map(email => 
        email.id === emailId ? { ...email, starred: !email.starred } : email
      );
      setSearchResults(updatedResults);
    } else {
      const updatedEmails = emails.map(email => 
        email.id === emailId ? { ...email, starred: !email.starred } : email
      );
      setEmails(updatedEmails);
    }
  };

  const handleBulkAction = (action, emailIds = selectedEmails) => {
    switch (action) {
      case 'markRead':
        bulkOperations.markAllAsRead(emailIds);
        break;
      case 'markUnread':
        bulkOperations.markAllAsUnread(emailIds);
        break;
      case 'star':
        bulkOperations.starMultiple(emailIds);
        break;
      case 'unstar':
        bulkOperations.unstarMultiple(emailIds);
        break;
      case 'archive':
        bulkOperations.moveMultipleToFolder(emailIds, 'archive');
        break;
      case 'delete':
        bulkOperations.moveMultipleToFolder(emailIds, 'trash');
        break;
      case 'removeLabel':
        bulkOperations.removeLabelFromMultiple(emailIds, labelId);
        break;
      default:
        break;
    }
    
    // Clear selection and refresh
    setSelectedEmails([]);
    loadEmails();
  };

  // Handle invalid label
  if (!isValidLabel && labelId) {
    return (
      <>
        <Head>
          <title>Gmail - Label Not Found</title>
        </Head>
        
        <div className="h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="text-6xl text-gray-300 mb-4">🏷️</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Label Not Found</h1>
            <p className="text-gray-600 mb-4">The label "{labelId}" does not exist.</p>
            <button
              onClick={() => router.push('/email')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Go to Inbox
            </button>
          </div>
        </div>
      </>
    );
  }

  if (!labelId || !label) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const displayEmails = searchResults || emails;
  const emptyMessage = searchResults 
    ? "No emails match your search criteria"
    : `No emails with label "${label.name}"`;

  return (
    <>
      <Head>
        <title>{`Gmail - ${label.name}`}</title>
        <meta name="description" content={`Gmail clone - ${label.name} label`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-screen flex flex-col bg-gray-50">
        {/* Header */}
        <EmailHeader
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          onSearch={handleSearch}
          onRefresh={handleRefresh}
          selectedCount={selectedEmails.length}
          onSelectAll={handleSelectAll}
          onBulkAction={handleBulkAction}
          currentFolder={`label-${labelId}`}
        />

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          <div className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 transition-transform duration-300 ease-in-out lg:static absolute inset-y-0 left-0 z-50 w-64 bg-white`}>
            <EmailSidebar
              currentFolder={`label-${labelId}`}
              onCompose={() => setComposeOpen(true)}
            />
          </div>

          {/* Overlay for mobile */}
          {sidebarOpen && (
            <div
              className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-25"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Email List */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Label Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: label.color }}
                  />
                  <h1 className="text-xl font-semibold text-gray-900">{label.name}</h1>
                  <span className="text-sm text-gray-500">
                    ({displayEmails.length} email{displayEmails.length !== 1 ? 's' : ''})
                  </span>
                </div>

                {/* Label Actions */}
                {selectedEmails.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleBulkAction('removeLabel')}
                      className="text-sm text-red-600 hover:text-red-800 font-medium"
                    >
                      Remove label from selected
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Search Results Banner */}
            {searchResults && (
              <div className="bg-blue-50 border-b border-blue-200 px-4 py-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-700">
                    {searchResults.length} search results in {label.name}
                  </span>
                  <button
                    onClick={() => {
                      setSearchResults(null);
                      loadEmails();
                    }}
                    className="text-sm text-blue-700 hover:text-blue-900"
                  >
                    Clear search
                  </button>
                </div>
              </div>
            )}

            <EmailList
              emails={displayEmails}
              selectedEmails={selectedEmails}
              onSelectEmail={handleSelectEmail}
              onSelectAll={handleSelectAll}
              onToggleStar={handleToggleStar}
              onBulkAction={handleBulkAction}
              loading={loading}
              emptyMessage={emptyMessage}
            />
          </div>
        </div>

        {/* Compose Modal */}
        <EmailCompose
          isOpen={composeOpen}
          onClose={() => setComposeOpen(false)}
          mode="new"
        />
      </div>
    </>
  );
};

export default EmailLabelPage;
