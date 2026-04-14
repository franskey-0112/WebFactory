import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  FaPlus, 
  FaInbox, 
  FaStar, 
  FaPaperPlane, 
  FaEdit, 
  FaTrash, 
  FaArchive,
  FaExclamationTriangle,
  FaTag,
  FaChevronDown,
  FaChevronRight,
  FaCog,
  FaUser
} from 'react-icons/fa';
import { folders, labels, getUnreadCount, getStarredCount, getEmailsByFolder } from '../../utils/emailData';

const EmailSidebar = ({ currentFolder = 'inbox', onCompose }) => {
  const router = useRouter();
  const [labelsExpanded, setLabelsExpanded] = useState(true);
  const [moreExpanded, setMoreExpanded] = useState(false);

  const unreadCount = getUnreadCount();
  const starredCount = getStarredCount();

  const getFolderIcon = (folderId) => {
    const iconMap = {
      'inbox': <FaInbox />,
      'starred': <FaStar />,
      'sent': <FaPaperPlane />,
      'drafts': <FaEdit />,
      'spam': <FaExclamationTriangle />,
      'trash': <FaTrash />,
      'archive': <FaArchive />
    };
    return iconMap[folderId] || <FaInbox />;
  };

  const getFolderCount = (folderId) => {
    if (folderId === 'inbox') return unreadCount;
    if (folderId === 'starred') return starredCount;
    
    // For other folders, calculate the actual count
    const folderEmails = getEmailsByFolder(folderId);
    const count = folderEmails.length;
    
    // Format large counts
    if (count > 99) return '99+';
    return count;
  };

  const mainFolders = folders.filter(f => 
    ['inbox', 'starred', 'sent', 'drafts'].includes(f.id)
  );
  
  const otherFolders = folders.filter(f => 
    !['inbox', 'starred', 'sent', 'drafts'].includes(f.id)
  );

  const customLabels = labels.filter(l => l.type === 'custom');
  const systemLabels = labels.filter(l => l.type === 'system');

  return (
    <div className="h-full bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">G</span>
          </div>
          <span className="text-xl font-semibold text-gray-900">Gmail</span>
        </div>
        
        {/* Compose Button */}
        <button
          onClick={onCompose}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <FaPlus className="h-4 w-4" />
          <span className="font-medium">Compose</span>
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-2">
        {/* Main Folders */}
        <div className="px-2">
          {mainFolders.map((folder) => {
            const count = getFolderCount(folder.id);
            const isActive = currentFolder === folder.id;
            
            return (
              <Link
                key={folder.id}
                href={`/email/${folder.id}`}
                className={`flex items-center justify-between px-3 py-2 rounded-lg mb-1 transition-colors group ${
                  isActive 
                    ? 'bg-red-100 text-red-700 font-medium' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className={`text-lg ${isActive ? 'text-red-600' : 'text-gray-500'}`}>
                    {getFolderIcon(folder.id)}
                  </span>
                  <span className="text-sm">{folder.name}</span>
                </div>
                
                {count > 0 && (
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    isActive 
                      ? 'bg-red-200 text-red-800' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {count > 99 ? '99+' : count}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Labels Section */}
        <div className="mt-4 px-2">
          <button
            onClick={() => setLabelsExpanded(!labelsExpanded)}
            className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 w-full text-left"
          >
            {labelsExpanded ? <FaChevronDown /> : <FaChevronRight />}
            <span>Labels</span>
          </button>
          
          {labelsExpanded && (
            <div className="ml-2">
              {/* System Labels */}
              {systemLabels.map((label) => (
                <Link
                  key={label.id}
                  href={`/email/label/${label.id}`}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg mb-1 text-sm transition-colors ${
                    router.query.labelId === label.id
                      ? 'bg-red-100 text-red-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FaTag className="text-xs" style={{ color: label.color }} />
                  <span>{label.name}</span>
                </Link>
              ))}
              
              {/* Custom Labels */}
              {customLabels.map((label) => (
                <Link
                  key={label.id}
                  href={`/email/label/${label.id}`}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg mb-1 text-sm transition-colors ${
                    router.query.labelId === label.id
                      ? 'bg-red-100 text-red-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: label.color }}
                  />
                  <span>{label.name}</span>
                </Link>
              ))}
              
              {/* Create Label */}
              <button className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-50 w-full text-left">
                <FaPlus className="text-xs" />
                <span>Create label</span>
              </button>
            </div>
          )}
        </div>

        {/* More Section */}
        <div className="mt-4 px-2">
          <button
            onClick={() => setMoreExpanded(!moreExpanded)}
            className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 w-full text-left"
          >
            {moreExpanded ? <FaChevronDown /> : <FaChevronRight />}
            <span>More</span>
          </button>
          
          {moreExpanded && (
            <div className="ml-2">
              {otherFolders.map((folder) => {
                const count = getFolderCount(folder.id);
                const isActive = currentFolder === folder.id;
                
                return (
                  <Link
                    key={folder.id}
                    href={`/email/${folder.id}`}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg mb-1 text-sm transition-colors ${
                      isActive 
                        ? 'bg-red-100 text-red-700 font-medium' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className={`text-sm ${isActive ? 'text-red-600' : 'text-gray-500'}`}>
                        {getFolderIcon(folder.id)}
                      </span>
                      <span>{folder.name}</span>
                    </div>
                    
                    {count > 0 && (
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        isActive 
                          ? 'bg-red-200 text-red-800' 
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {count > 99 ? '99+' : count}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900">
            <FaCog className="h-4 w-4" />
            <span>Settings</span>
          </button>
          
          <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900">
            <FaUser className="h-4 w-4" />
            <span>Account</span>
          </button>
        </div>
        
        {/* Storage Indicator */}
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>2.1 GB of 15 GB used</span>
            <span>86% full</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div className="bg-blue-500 h-1 rounded-full" style={{ width: '86%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailSidebar;
