import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import EmailHeader from '../../../components/email/EmailHeader';
import EmailSidebar from '../../../components/email/EmailSidebar';
import EmailDetail from '../../../components/email/EmailDetail';
import EmailCompose from '../../../components/email/EmailCompose';
import { 
  getEmailById, 
  getEmailThread,
  markAsRead,
  moveToFolder,
  toggleStar
} from '../../../utils/emailData';

const EmailThreadPage = () => {
  const router = useRouter();
  const { id } = router.query;
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [composeOpen, setComposeOpen] = useState(false);
  const [composeMode, setComposeMode] = useState('new');
  const [replyToEmail, setReplyToEmail] = useState(null);
  const [email, setEmail] = useState(null);
  const [threadEmails, setThreadEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeEmailId, setActiveEmailId] = useState(null);

  useEffect(() => {
    if (id) {
      loadEmailThread();
    }
  }, [id]);

  const loadEmailThread = async () => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const emailData = getEmailById(id);
      if (!emailData) {
        // Email not found
        setEmail(null);
        setThreadEmails([]);
        return;
      }
      
      // Mark as read if not already read
      if (!emailData.read) {
        markAsRead(id);
        emailData.read = true;
      }
      
      setEmail(emailData);
      setActiveEmailId(id);
      
      // Load thread emails
      const thread = getEmailThread(id);
      setThreadEmails(thread);
      
    } catch (error) {
      console.error('Failed to load email:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAction = (action, emailId) => {
    const targetEmail = getEmailById(emailId);
    if (!targetEmail) return;

    switch (action) {
      case 'reply':
        setReplyToEmail(targetEmail);
        setComposeMode('reply');
        setComposeOpen(true);
        break;
        
      case 'replyAll':
        setReplyToEmail(targetEmail);
        setComposeMode('replyAll');
        setComposeOpen(true);
        break;
        
      case 'forward':
        setReplyToEmail(targetEmail);
        setComposeMode('forward');
        setComposeOpen(true);
        break;
        
      case 'star':
        toggleStar(emailId);
        // Update the local state
        if (email && email.id === emailId) {
          setEmail({ ...email, starred: !email.starred });
        }
        setThreadEmails(prev => 
          prev.map(e => e.id === emailId ? { ...e, starred: !e.starred } : e)
        );
        break;
        
      case 'archive':
        moveToFolder(emailId, 'archive');
        router.back();
        break;
        
      case 'delete':
        moveToFolder(emailId, 'trash');
        router.back();
        break;
        
      case 'label':
        // Label action - refresh thread
        loadEmailThread();
        break;
        
      default:
        break;
    }
  };

  const handleNavigation = (direction) => {
    // In a real app, this would navigate to next/previous email
    console.log(`Navigate ${direction}`);
  };

  const handleBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <>
        <Head>
          <title>Gmail - Loading...</title>
        </Head>
        
        <div className="h-screen flex flex-col bg-gray-50">
          <EmailHeader
            onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
            onSearch={() => {}}
            onRefresh={loadEmailThread}
            showBackButton={true}
            onBack={handleBack}
          />
          
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-500">Loading email...</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!email) {
    return (
      <>
        <Head>
          <title>Gmail - Email Not Found</title>
        </Head>
        
        <div className="h-screen flex flex-col bg-gray-50">
          <EmailHeader
            onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
            onSearch={() => {}}
            onRefresh={loadEmailThread}
            showBackButton={true}
            onBack={handleBack}
          />
          
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl text-gray-300 mb-4">📧</div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Email Not Found</h1>
              <p className="text-gray-600 mb-4">The email you're looking for doesn't exist or has been deleted.</p>
              <button
                onClick={() => router.push('/email')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Go to Inbox
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{`Gmail - ${email.subject}`}</title>
        <meta name="description" content={`Email from ${email.from?.name || 'Draft'}: ${email.subject}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-screen flex flex-col bg-gray-50">
        {/* Header */}
        <EmailHeader
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          onSearch={() => {}}
          onRefresh={loadEmailThread}
          showBackButton={true}
          onBack={handleBack}
          currentFolder={email.folder}
        />

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          <div className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 transition-transform duration-300 ease-in-out lg:static absolute inset-y-0 left-0 z-50 w-64 bg-white`}>
            <EmailSidebar
              currentFolder={email.folder}
              onCompose={() => {
                setReplyToEmail(null);
                setComposeMode('new');
                setComposeOpen(true);
              }}
            />
          </div>

          {/* Overlay for mobile */}
          {sidebarOpen && (
            <div
              className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-25"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Email Content */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Thread Navigation */}
            {threadEmails.length > 1 && (
              <div className="bg-white border-b border-gray-200 px-6 py-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {threadEmails.length} messages in this conversation
                  </span>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleNavigation('previous')}
                      className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
                    >
                      ← Previous
                    </button>
                    <button
                      onClick={() => handleNavigation('next')}
                      className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
                    >
                      Next →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Thread View */}
            {threadEmails.length > 1 ? (
              <div className="flex-1 overflow-y-auto">
                {threadEmails.map((threadEmail, index) => (
                  <div key={threadEmail.id} className="border-b border-gray-200 last:border-b-0">
                    <div 
                      className={`cursor-pointer ${
                        activeEmailId === threadEmail.id ? 'bg-blue-50' : 'bg-white hover:bg-gray-50'
                      }`}
                      onClick={() => setActiveEmailId(threadEmail.id)}
                    >
                      {activeEmailId === threadEmail.id ? (
                        <EmailDetail 
                          email={threadEmail} 
                          onAction={handleEmailAction}
                        />
                      ) : (
                        // Collapsed thread item
                        <div className="px-6 py-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              {threadEmail.from?.avatar && (
                                <img
                                  src={threadEmail.from.avatar}
                                  alt={threadEmail.from.name}
                                  className="w-8 h-8 rounded-full"
                                />
                              )}
                              <div>
                                <p className="font-medium text-gray-900">{threadEmail.from?.name || 'Draft'}</p>
                                <p className="text-sm text-gray-500">
                                  {new Date(threadEmail.timestamp).toLocaleString()}
                                </p>
                              </div>
                            </div>
                            
                            <div className="text-sm text-gray-500">
                              Click to expand
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Single email view
              <div className="flex-1 overflow-y-auto">
                <EmailDetail 
                  email={email} 
                  onAction={handleEmailAction}
                />
              </div>
            )}
          </div>
        </div>

        {/* Compose Modal */}
        <EmailCompose
          isOpen={composeOpen}
          onClose={() => {
            setComposeOpen(false);
            setReplyToEmail(null);
            setComposeMode('new');
          }}
          mode={composeMode}
          replyTo={replyToEmail}
        />
      </div>
    </>
  );
};

export default EmailThreadPage;
