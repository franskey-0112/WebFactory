import React, { useState } from 'react';
import Link from 'next/link';
import { 
  FaStar, 
  FaRegStar, 
  FaArchive, 
  FaTrash, 
  FaTag, 
  FaReply,
  FaForward,
  FaPaperclip,
  FaCheckSquare,
  FaSquare,
  FaEllipsisV,
  FaExclamationCircle
} from 'react-icons/fa';
import { 
  formatEmailDate, 
  getEmailPreview, 
  getAttachmentIcon,
  toggleStar,
  markAsRead,
  markAsUnread,
  moveToFolder,
  addLabel,
  removeLabel
} from '../../utils/emailData';

const EmailListItem = ({ email, isSelected, onSelect, onToggleStar, onContextMenu }) => {
  const [showActions, setShowActions] = useState(false);
  
  const handleClick = (e) => {
    if (e.target.type === 'checkbox') return;
    if (!email.read) {
      markAsRead(email.id);
    }
  };

  const handleStarClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleStar(email.id);
  };

  const handleCheckboxChange = (e) => {
    e.stopPropagation();
    onSelect(email.id, e.target.checked);
  };

  const getPriorityIcon = (priority) => {
    if (priority === 'high') {
      return <FaExclamationCircle className="text-red-500 text-sm" />;
    }
    return null;
  };

  const preview = getEmailPreview(email, 120);
  const hasAttachments = email.attachments && email.attachments.length > 0;

  return (
    <div
      className={`border-b border-gray-200 hover:shadow-sm transition-all ${
        email.read ? 'bg-white' : 'bg-blue-50'
      } ${isSelected ? 'bg-blue-100' : ''}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="flex items-center px-4 py-3">
        {/* Checkbox */}
        <div className="flex-shrink-0 mr-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={handleCheckboxChange}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
        </div>

        {/* Star */}
        <div className="flex-shrink-0 mr-3">
          <button
            onClick={handleStarClick}
            className="text-gray-400 hover:text-yellow-500 transition-colors"
          >
            {email.starred ? (
              <FaStar className="text-yellow-500" />
            ) : (
              <FaRegStar />
            )}
          </button>
        </div>

        {/* Clickable content area */}
        <Link href={`/email/thread/${email.id}`}>
          <div className="flex-1 flex items-center cursor-pointer" onClick={handleClick}>

          {/* Sender Info */}
          <div className="flex-shrink-0 w-48 mr-4">
            <div className="flex items-center">
              {email.from?.avatar && (
                <img
                  src={email.from.avatar}
                  alt={email.from.name}
                  className="w-8 h-8 rounded-full mr-3"
                />
              )}
              <div className="min-w-0 flex-1">
                <p className={`text-sm truncate ${
                  email.read ? 'text-gray-700' : 'text-gray-900 font-semibold'
                }`}>
                  {email.from?.name || 'Draft'}
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 mr-4">
            <div className="flex items-center space-x-2">
              {/* Priority */}
              {getPriorityIcon(email.priority)}
              
              {/* Subject and Preview */}
              <div className="min-w-0 flex-1">
                <p className={`text-sm truncate ${
                  email.read ? 'text-gray-700' : 'text-gray-900 font-semibold'
                }`}>
                  <span className="mr-2">{email.subject}</span>
                  <span className="text-gray-500 font-normal">- {preview}</span>
                </p>
              </div>

              {/* Attachments */}
              {hasAttachments && (
                <FaPaperclip className="text-gray-400 text-sm flex-shrink-0" />
              )}
            </div>

            {/* Labels */}
            {email.labels && email.labels.length > 0 && (
              <div className="flex items-center space-x-1 mt-1">
                {email.labels.slice(0, 3).map((labelId) => (
                  <span
                    key={labelId}
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {labelId}
                  </span>
                ))}
                {email.labels.length > 3 && (
                  <span className="text-xs text-gray-500">+{email.labels.length - 3} more</span>
                )}
              </div>
            )}
          </div>

          {/* Timestamp and Actions */}
          <div className="flex-shrink-0 flex items-center space-x-2">
            {/* Quick Actions (show on hover) */}
            {showActions && (
              <div className="flex items-center space-x-1">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    moveToFolder(email.id, 'archive');
                  }}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded"
                  title="Archive"
                >
                  <FaArchive className="text-sm" />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    moveToFolder(email.id, 'trash');
                  }}
                  className="p-1 text-gray-400 hover:text-red-600 rounded"
                  title="Delete"
                >
                  <FaTrash className="text-sm" />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onContextMenu(e, email);
                  }}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded"
                  title="More"
                >
                  <FaEllipsisV className="text-sm" />
                </button>
              </div>
            )}

            {/* Timestamp */}
            <span className="text-xs text-gray-500 min-w-max">
              {formatEmailDate(email.timestamp)}
            </span>
          </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

const EmailList = ({ 
  emails = [], 
  selectedEmails = [], 
  onSelectEmail, 
  onSelectAll,
  onToggleStar,
  onBulkAction,
  loading = false,
  emptyMessage = "No emails found"
}) => {
  const [contextMenu, setContextMenu] = useState(null);

  const handleContextMenu = (e, email) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Calculate position with boundary detection
    const menuWidth = 160;
    const menuHeight = 200; // Approximate height
    const x = e.clientX + menuWidth > window.innerWidth 
      ? e.clientX - menuWidth 
      : e.clientX;
    const y = e.clientY + menuHeight > window.innerHeight 
      ? e.clientY - menuHeight 
      : e.clientY;
    
    setContextMenu({
      x: Math.max(0, x),
      y: Math.max(0, y),
      email: email
    });
  };

  const closeContextMenu = () => {
    setContextMenu(null);
  };

  const handleContextAction = (action, email) => {
    switch (action) {
      case 'reply':
        // Handle reply
        break;
      case 'forward':
        // Handle forward
        break;
      case 'archive':
        moveToFolder(email.id, 'archive');
        break;
      case 'delete':
        moveToFolder(email.id, 'trash');
        break;
      case 'markUnread':
        markAsUnread(email.id);
        break;
      case 'markRead':
        markAsRead(email.id);
        break;
      default:
        break;
    }
    closeContextMenu();
  };

  const allSelected = emails.length > 0 && selectedEmails.length === emails.length;
  const someSelected = selectedEmails.length > 0 && selectedEmails.length < emails.length;

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading emails...</p>
        </div>
      </div>
    );
  }

  if (emails.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl text-gray-300 mb-4">📭</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No emails here</h3>
          <p className="text-gray-500">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white">
      {/* Email List Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center space-x-4">
          {/* Select All Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={allSelected}
              ref={(input) => {
                if (input) input.indeterminate = someSelected;
              }}
              onChange={(e) => onSelectAll(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>

          {/* Bulk Actions */}
          {selectedEmails.length > 0 && (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onBulkAction('archive', selectedEmails)}
                className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 rounded hover:bg-gray-100"
              >
                <FaArchive />
                <span>Archive</span>
              </button>
              <button
                onClick={() => onBulkAction('delete', selectedEmails)}
                className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-red-600 rounded hover:bg-gray-100"
              >
                <FaTrash />
                <span>Delete</span>
              </button>
              <button
                onClick={() => onBulkAction('markRead', selectedEmails)}
                className="flex items-center space-x-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 rounded hover:bg-gray-100"
              >
                <span>Mark as read</span>
              </button>
            </div>
          )}

          {/* Email Count */}
          <div className="flex-1 text-right">
            <span className="text-sm text-gray-500">
              {selectedEmails.length > 0 
                ? `${selectedEmails.length} selected` 
                : `${emails.length} emails`
              }
            </span>
          </div>
        </div>
      </div>

      {/* Email List */}
      <div className="overflow-y-auto">
        {emails.map((email) => (
          <EmailListItem
            key={email.id}
            email={email}
            isSelected={selectedEmails.includes(email.id)}
            onSelect={onSelectEmail}
            onToggleStar={onToggleStar}
            onContextMenu={handleContextMenu}
          />
        ))}
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={closeContextMenu}
          />
          <div
            className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[160px]"
            style={{
              top: contextMenu.y,
              left: contextMenu.x
            }}
          >
            <button
              onClick={() => handleContextAction('reply', contextMenu.email)}
              className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <FaReply />
              <span>Reply</span>
            </button>
            <button
              onClick={() => handleContextAction('forward', contextMenu.email)}
              className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <FaForward />
              <span>Forward</span>
            </button>
            <hr className="my-1" />
            <button
              onClick={() => handleContextAction('archive', contextMenu.email)}
              className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <FaArchive />
              <span>Archive</span>
            </button>
            <button
              onClick={() => handleContextAction('delete', contextMenu.email)}
              className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              <FaTrash />
              <span>Delete</span>
            </button>
            <hr className="my-1" />
            {contextMenu.email.read ? (
              <button
                onClick={() => handleContextAction('markUnread', contextMenu.email)}
                className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <span>Mark as unread</span>
              </button>
            ) : (
              <button
                onClick={() => handleContextAction('markRead', contextMenu.email)}
                className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <span>Mark as read</span>
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default EmailList;
