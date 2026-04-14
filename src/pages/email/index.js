import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import EmailHeader from '../../components/email/EmailHeader';
import EmailSidebar from '../../components/email/EmailSidebar';
import EmailList from '../../components/email/EmailList';
import EmailCompose from '../../components/email/EmailCompose';
import { 
  getEmailsByFolder, 
  getFilteredEmails,
  searchEmails,
  advancedSearch,
  toggleStar,
  bulkOperations
} from '../../utils/emailData';

const EmailHomePage = () => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [composeOpen, setComposeOpen] = useState(false);
  const [emails, setEmails] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState(null);
  const [currentFolder] = useState('inbox');

  // Load emails
  useEffect(() => {
    loadEmails();
  }, [currentFolder]);

  const loadEmails = async () => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const folderEmails = getEmailsByFolder(currentFolder);
      setEmails(folderEmails);
      setSearchResults(null);
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
        // Basic search
        results = searchEmails(searchParams.query);
      } else {
        // Advanced search
        results = advancedSearch(searchParams);
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
      default:
        break;
    }
    
    // Clear selection and refresh
    setSelectedEmails([]);
    loadEmails();
  };

  const displayEmails = searchResults || emails;

  return (
    <>
      <Head>
        <title>Gmail - Inbox</title>
        <meta name="description" content="Gmail clone - manage your emails efficiently" />
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
          currentFolder={currentFolder}
        />

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          <div className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 transition-transform duration-300 ease-in-out lg:static absolute inset-y-0 left-0 z-50 w-64 bg-white`}>
            <EmailSidebar
              currentFolder={currentFolder}
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
            {searchResults && (
              <div className="bg-blue-50 border-b border-blue-200 px-4 py-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-700">
                    {searchResults.length} search results
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
              emptyMessage={
                searchResults 
                  ? "No emails match your search criteria" 
                  : currentFolder === 'inbox'
                    ? "Your inbox is empty"
                    : `No emails in ${currentFolder}`
              }
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

export default EmailHomePage;
