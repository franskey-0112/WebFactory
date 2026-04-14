import React, { useState, useEffect, useRef } from 'react';
import { 
  FaStar, 
  FaRegStar, 
  FaReply, 
  FaReplyAll, 
  FaForward, 
  FaArchive, 
  FaTrash, 
  FaTag, 
  FaPrint,
  FaDownload,
  FaEllipsisV,
  FaPaperclip,
  FaChevronDown,
  FaChevronUp,
  FaExternalLinkAlt,
  FaCheck
} from 'react-icons/fa';
import { 
  formatEmailDate, 
  getAttachmentIcon, 
  formatFileSize,
  toggleStar,
  moveToFolder,
  addLabel,
  removeLabel,
  labels
} from '../../utils/emailData';

const AttachmentItem = ({ attachment }) => {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const icon = getAttachmentIcon(attachment.type);
  
  const handleDownload = () => {
    setDownloading(true);
    
    // Simulate download process
    setTimeout(() => {
      setDownloading(false);
      setDownloaded(true);
      
      // Reset downloaded state after 3 seconds
      setTimeout(() => {
        setDownloaded(false);
      }, 3000);
    }, 1000);
  };

  const handleView = () => {
    // For demo purposes, show a message
    alert(`Viewing ${attachment.name} - This is a demo attachment`);
  };
  
  return (
    <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
      <div className="text-2xl">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{attachment.name}</p>
        <p className="text-xs text-gray-500">{attachment.size}</p>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={handleView}
          className="p-2 text-gray-400 hover:text-blue-600 rounded transition-colors"
          title="View"
        >
          <FaExternalLinkAlt className="text-sm" />
        </button>
        <button
          onClick={handleDownload}
          disabled={downloading}
          className={`p-2 rounded transition-colors ${
            downloaded 
              ? 'text-green-600 bg-green-50' 
              : downloading 
                ? 'text-gray-400 cursor-wait'
                : 'text-gray-400 hover:text-green-600'
          }`}
          title={downloaded ? 'Downloaded!' : downloading ? 'Downloading...' : 'Download'}
        >
          {downloading ? (
            <div className="animate-spin w-3 h-3 border border-gray-400 border-t-transparent rounded-full"></div>
          ) : downloaded ? (
            <FaCheck className="text-sm" />
          ) : (
            <FaDownload className="text-sm" />
          )}
        </button>
      </div>
    </div>
  );
};

const EmailHeader = ({ email, onAction, showDetails, onToggleDetails }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLabelMenu, setShowLabelMenu] = useState(false);

  const handleStarToggle = () => {
    toggleStar(email.id);
    onAction('star', email.id);
  };

  const handleLabelToggle = (labelId) => {
    if (email.labels && email.labels.includes(labelId)) {
      removeLabel(email.id, labelId);
    } else {
      addLabel(email.id, labelId);
    }
    onAction('label', email.id);
  };

  return (
    <div className="border-b border-gray-200 bg-white">
      {/* Main Header */}
      <div className="px-6 py-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">{email.subject}</h1>
            
            {/* Sender Info */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                {email.from?.avatar && (
                  <img
                    src={email.from.avatar}
                    alt={email.from.name}
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <div>
                  <p className="text-sm font-medium text-gray-900">{email.from?.name || 'Draft'}</p>
                  <p className="text-xs text-gray-500">&lt;{email.from?.email || 'Saved Draft'}&gt;</p>
                </div>
              </div>
              
              <span className="text-sm text-gray-500">
                {formatEmailDate(email.timestamp)}
              </span>
              
              {email.priority === 'high' && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  High Priority
                </span>
              )}
            </div>

            {/* Recipients (collapsed by default) */}
            {!showDetails && email.to.length > 1 && (
              <button
                onClick={onToggleDetails}
                className="text-xs text-gray-500 hover:text-gray-700 mt-2"
              >
                to me and {email.to.length - 1} others
              </button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 ml-4">
            <button
              onClick={handleStarToggle}
              className="p-2 text-gray-400 hover:text-yellow-500 rounded"
            >
              {email.starred ? (
                <FaStar className="text-yellow-500" />
              ) : (
                <FaRegStar />
              )}
            </button>

            <button
              onClick={() => onAction('reply', email.id)}
              className="p-2 text-gray-400 hover:text-blue-600 rounded"
              title="Reply"
            >
              <FaReply />
            </button>

            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded"
              >
                <FaEllipsisV />
              </button>

              {showDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowDropdown(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                    <button
                      onClick={() => {
                        onAction('replyAll', email.id);
                        setShowDropdown(false);
                      }}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FaReplyAll />
                      <span>Reply all</span>
                    </button>
                    <button
                      onClick={() => {
                        onAction('forward', email.id);
                        setShowDropdown(false);
                      }}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FaForward />
                      <span>Forward</span>
                    </button>
                    <hr className="my-1" />
                    <button
                      onClick={() => {
                        moveToFolder(email.id, 'archive');
                        onAction('archive', email.id);
                        setShowDropdown(false);
                      }}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FaArchive />
                      <span>Archive</span>
                    </button>
                    <button
                      onClick={() => {
                        moveToFolder(email.id, 'trash');
                        onAction('delete', email.id);
                        setShowDropdown(false);
                      }}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <FaTrash />
                      <span>Delete</span>
                    </button>
                    <hr className="my-1" />
                    <div className="relative">
                      <button
                        onClick={() => setShowLabelMenu(!showLabelMenu)}
                        className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <div className="flex items-center space-x-2">
                          <FaTag />
                          <span>Labels</span>
                        </div>
                        <FaChevronDown className="text-xs" />
                      </button>
                      
                      {showLabelMenu && (
                        <div className="absolute left-full top-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg ml-1">
                          {labels.map((label) => (
                            <button
                              key={label.id}
                              onClick={() => handleLabelToggle(label.id)}
                              className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <div className="flex items-center space-x-2">
                                <div 
                                  className="w-3 h-3 rounded-full" 
                                  style={{ backgroundColor: label.color }}
                                />
                                <span>{label.name}</span>
                              </div>
                              {email.labels && email.labels.includes(label.id) && (
                                <span className="text-blue-600">✓</span>
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <hr className="my-1" />
                    <button
                      onClick={() => {
                        window.print();
                        setShowDropdown(false);
                      }}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FaPrint />
                      <span>Print</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Detailed Recipients */}
        {showDetails && (
          <div className="mt-4 space-y-2 text-sm">
            <div>
              <span className="text-gray-500">to </span>
              {email.to.map((recipient, index) => (
                <span key={index} className="text-gray-700">
                  {recipient.name} &lt;{recipient.email}&gt;
                  {index < email.to.length - 1 && ', '}
                </span>
              ))}
            </div>
            
            {email.cc && email.cc.length > 0 && (
              <div>
                <span className="text-gray-500">cc </span>
                {email.cc.map((recipient, index) => (
                  <span key={index} className="text-gray-700">
                    {recipient.name} &lt;{recipient.email}&gt;
                    {index < email.cc.length - 1 && ', '}
                  </span>
                ))}
              </div>
            )}
            
            <button
              onClick={onToggleDetails}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaChevronUp className="text-xs" />
            </button>
          </div>
        )}

        {/* Labels */}
        {email.labels && email.labels.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {email.labels.map((labelId) => {
              const label = labels.find(l => l.id === labelId);
              return label ? (
                <span
                  key={labelId}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                  style={{ 
                    backgroundColor: label.color + '20', 
                    color: label.color,
                    border: `1px solid ${label.color}40`
                  }}
                >
                  {label.name}
                </span>
              ) : null;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

const EmailDetail = ({ email, onAction }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [buttonFeedback, setButtonFeedback] = useState({});
  const emailBodyRef = useRef(null);

  // Handle clicks on email content buttons
  useEffect(() => {
    if (!emailBodyRef.current || !email) return;

    const handleEmailButtonClick = (e) => {
      const target = e.target;
      if (target.tagName === 'A' && target.href === '#') {
        e.preventDefault();
        const buttonText = target.textContent.trim();
        
        // Show feedback
        setButtonFeedback(prev => ({ ...prev, [buttonText]: true }));
        
        // Reset feedback after 2 seconds
        setTimeout(() => {
          setButtonFeedback(prev => ({ ...prev, [buttonText]: false }));
        }, 2000);
        
        // Show action message
        const messages = {
          'View Full Itinerary': 'Opening full itinerary...',
          'Check-in Online': 'Redirecting to check-in...',
          'Watch Now': 'Opening Netflix...',
          'Track Package': 'Opening package tracking...',
          'Leave Feedback': 'Opening feedback form...',
          'View Full Statement': 'Opening full statement...',
          'View Full Analytics': 'Opening analytics dashboard...',
          'Help Center': 'Opening help center...',
          'Unsubscribe': 'Processing unsubscribe...',
          'Update Preferences': 'Opening preferences...'
        };
        
        const message = messages[buttonText] || `Clicked: ${buttonText}`;
        alert(message);
      }
    };

    emailBodyRef.current.addEventListener('click', handleEmailButtonClick);
    
    return () => {
      if (emailBodyRef.current) {
        emailBodyRef.current.removeEventListener('click', handleEmailButtonClick);
      }
    };
  }, [email]);

  if (!email) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="text-6xl text-gray-300 mb-4">📧</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Select an email</h3>
          <p className="text-gray-500">Choose an email from the list to view its contents</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Email Header */}
      <EmailHeader 
        email={email}
        onAction={onAction}
        showDetails={showDetails}
        onToggleDetails={() => setShowDetails(!showDetails)}
      />

      {/* Email Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-6">
          {/* Email Body */}
          <div 
            ref={emailBodyRef}
            className="prose prose-sm max-w-none text-gray-900 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: email.body }}
          />

          {/* Attachments */}
          {email.attachments && email.attachments.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <FaPaperclip className="mr-2" />
                {email.attachments.length} attachment{email.attachments.length !== 1 ? 's' : ''}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {email.attachments.map((attachment) => (
                  <AttachmentItem key={attachment.id} attachment={attachment} />
                ))}
              </div>
            </div>
          )}

          {/* Reply Actions */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => onAction('reply', email.id)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaReply />
                <span>Reply</span>
              </button>
              
              <button
                onClick={() => onAction('replyAll', email.id)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FaReplyAll />
                <span>Reply all</span>
              </button>
              
              <button
                onClick={() => onAction('forward', email.id)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FaForward />
                <span>Forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailDetail;
