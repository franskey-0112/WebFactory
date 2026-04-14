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
  bulkOperations,
  folders
} from '../../utils/emailData';

const EmailFolderPage = () => {
  const router = useRouter();
  const { folder } = router.query;
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [composeOpen, setComposeOpen] = useState(false);
  const [emails, setEmails] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState(null);

  // Validate folder
  const isValidFolder = folder && folders.some(f => f.id === folder);

  // Load emails when folder changes
  useEffect(() => {
    if (isValidFolder) {
      loadEmails();
    }
  }, [folder, isValidFolder]);

  const loadEmails = async () => {
    if (!folder) return;
    
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const folderEmails = getEmailsByFolder(folder);
      setEmails(folderEmails);
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
        // Basic search - filter within current folder
        results = searchEmails(searchParams.query).filter(email => {
          switch (folder) {
            case 'inbox':
              return email.folder === 'inbox' && !email.archived;
            case 'starred':
              return email.starred;
            case 'sent':
              return email.folder === 'sent';
            case 'drafts':
              return email.folder === 'drafts';
            case 'trash':
              return email.folder === 'trash';
            case 'spam':
              return email.folder === 'spam';
            case 'archive':
              return email.archived;
            default:
              return false;
          }
        });
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
        if (folder === 'trash') {
          // Permanent delete from trash
          if (confirm('Permanently delete selected emails? This action cannot be undone.')) {
            // In a real app, this would permanently delete the emails
            console.log('Permanently deleting emails:', emailIds);
          }
        } else {
          bulkOperations.moveMultipleToFolder(emailIds, 'trash');
        }
        break;
      case 'restore':
        if (folder === 'trash') {
          bulkOperations.moveMultipleToFolder(emailIds, 'inbox');
        }
        break;
      default:
        break;
    }
    
    // Clear selection and refresh
    setSelectedEmails([]);
    loadEmails();
  };

  const getFolderInfo = (folderId) => {
    const folderData = folders.find(f => f.id === folderId);
    if (!folderData) return { name: 'Unknown', title: 'Unknown Folder' };
    
    const titles = {
      'inbox': 'Inbox',
      'starred': 'Starred',
      'sent': 'Sent Mail',
      'drafts': 'Drafts',
      'spam': 'Spam',
      'trash': 'Trash',
      'archive': 'All Mail'
    };
    
    return {
      name: folderData.name,
      title: titles[folderId] || folderData.name
    };
  };

  const getEmptyMessage = (folderId) => {
    const messages = {
      'inbox': 'Your inbox is empty! 🎉',
      'starred': 'No starred messages',
      'sent': 'No sent messages',
      'drafts': 'No drafts saved',
      'spam': 'No spam messages',
      'trash': 'Trash is empty',
      'archive': 'No archived messages'
    };
    
    return searchResults 
      ? "No emails match your search criteria"
      : messages[folderId] || 'No emails found';
  };

  // Handle invalid folder
  if (!isValidFolder && folder) {
    return (
      <>
        <Head>
          <title>Gmail - Folder Not Found</title>
        </Head>
        
        <div className="h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="text-6xl text-gray-300 mb-4">📁</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Folder Not Found</h1>
            <p className="text-gray-600 mb-4">The folder "{folder}" does not exist.</p>
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

  if (!folder) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const folderInfo = getFolderInfo(folder);
  const displayEmails = searchResults || emails;

  return (
    <>
      <Head>
        <title>{`Gmail - ${folderInfo.title}`}</title>
        <meta name="description" content={`Gmail clone - ${folderInfo.title} folder`} />
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
          currentFolder={folder}
        />

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          <div className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 transition-transform duration-300 ease-in-out lg:static absolute inset-y-0 left-0 z-50 w-64 bg-white`}>
            <EmailSidebar
              currentFolder={folder}
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
            {/* Search Results Banner */}
            {searchResults && (
              <div className="bg-blue-50 border-b border-blue-200 px-4 py-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-700">
                    {searchResults.length} search results in {folderInfo.title}
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

            {/* Special Actions for Trash */}
            {folder === 'trash' && selectedEmails.length > 0 && (
              <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-2">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleBulkAction('restore')}
                    className="text-sm text-yellow-700 hover:text-yellow-900 font-medium"
                  >
                    Restore selected emails
                  </button>
                  <button
                    onClick={() => handleBulkAction('delete')}
                    className="text-sm text-red-600 hover:text-red-800 font-medium"
                  >
                    Delete permanently
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
              emptyMessage={getEmptyMessage(folder)}
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

export default EmailFolderPage;
