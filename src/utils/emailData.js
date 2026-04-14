// Email utility functions for Gmail clone
import staticEmailData from '../data/staticEmailData';

const {
  currentUser,
  contacts,
  labels,
  folders,
  emails,
  drafts,
  sentEmails,
  getEmailById,
  getEmailsByFolder,
  getEmailsByLabel,
  searchEmails,
  getUnreadCount,
  getStarredCount,
  markAsRead,
  markAsUnread,
  toggleStar,
  moveToFolder,
  addLabel,
  removeLabel,
  getRecentContacts,
  formatEmailDate
} = staticEmailData;

// Export all data and functions
export {
  currentUser,
  contacts,
  labels,
  folders,
  emails,
  drafts,
  sentEmails,
  getEmailById,
  getEmailsByFolder,
  getEmailsByLabel,
  searchEmails,
  getUnreadCount,
  getStarredCount,
  markAsRead,
  markAsUnread,
  toggleStar,
  moveToFolder,
  addLabel,
  removeLabel,
  getRecentContacts,
  formatEmailDate
};

// Additional utility functions for email management

export const getFilteredEmails = (folderId, filters = {}) => {
  let emailList = getEmailsByFolder(folderId);
  
  // Apply filters
  if (filters.isRead !== undefined) {
    emailList = emailList.filter(email => email.read === filters.isRead);
  }
  
  if (filters.hasAttachment) {
    emailList = emailList.filter(email => email.attachments && email.attachments.length > 0);
  }
  
  if (filters.priority) {
    emailList = emailList.filter(email => email.priority === filters.priority);
  }
  
  if (filters.labelId) {
    emailList = emailList.filter(email => email.labels && email.labels.includes(filters.labelId));
  }
  
  if (filters.fromDate) {
    const fromDate = new Date(filters.fromDate);
    emailList = emailList.filter(email => new Date(email.timestamp) >= fromDate);
  }
  
  if (filters.toDate) {
    const toDate = new Date(filters.toDate);
    emailList = emailList.filter(email => new Date(email.timestamp) <= toDate);
  }
  
  // Sort by timestamp (newest first)
  return emailList.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
};

export const getEmailThread = (emailId) => {
  const email = getEmailById(emailId);
  if (!email || !email.thread) return [email];
  
  return email.thread.map(id => getEmailById(id)).filter(Boolean)
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
};

export const getEmailStats = () => {
  const totalEmails = emails.length;
  const unreadEmails = emails.filter(email => !email.read).length;
  const starredEmails = emails.filter(email => email.starred).length;
  const todaysEmails = emails.filter(email => {
    const today = new Date();
    const emailDate = new Date(email.timestamp);
    return emailDate.toDateString() === today.toDateString();
  }).length;
  
  return {
    total: totalEmails,
    unread: unreadEmails,
    starred: starredEmails,
    today: todaysEmails,
    drafts: drafts.length,
    sent: sentEmails.length
  };
};

export const getEmailsByPriority = (priority) => {
  return emails.filter(email => email.priority === priority);
};

export const getRecentEmailActivity = (days = 7) => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  return emails.filter(email => new Date(email.timestamp) >= cutoffDate)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
};

export const getContactByEmail = (emailAddress) => {
  return contacts.find(contact => contact.email === emailAddress);
};

export const addNewContact = (contactData) => {
  const newContact = {
    id: `contact-${Date.now()}`,
    name: contactData.name,
    email: contactData.email,
    avatar: contactData.avatar || '',
    company: contactData.company || '',
    position: contactData.position || '',
    notes: contactData.notes || '',
    lastContactDate: new Date().toISOString().split('T')[0],
    frequency: 'unknown'
  };
  
  contacts.push(newContact);
  return newContact;
};

export const updateContact = (contactId, updates) => {
  const contactIndex = contacts.findIndex(contact => contact.id === contactId);
  if (contactIndex !== -1) {
    contacts[contactIndex] = { ...contacts[contactIndex], ...updates };
    return contacts[contactIndex];
  }
  return null;
};

export const deleteContact = (contactId) => {
  const contactIndex = contacts.findIndex(contact => contact.id === contactId);
  if (contactIndex !== -1) {
    contacts.splice(contactIndex, 1);
    return true;
  }
  return false;
};

export const getLabelById = (labelId) => {
  return labels.find(label => label.id === labelId);
};

export const createNewLabel = (labelData) => {
  const newLabel = {
    id: labelData.id || `label-${Date.now()}`,
    name: labelData.name,
    color: labelData.color || '#1a73e8',
    type: 'custom'
  };
  
  labels.push(newLabel);
  return newLabel;
};

export const updateLabel = (labelId, updates) => {
  const labelIndex = labels.findIndex(label => label.id === labelId);
  if (labelIndex !== -1) {
    labels[labelIndex] = { ...labels[labelIndex], ...updates };
    return labels[labelIndex];
  }
  return null;
};

export const deleteLabel = (labelId) => {
  const labelIndex = labels.findIndex(label => label.id === labelId);
  if (labelIndex !== -1 && labels[labelIndex].type === 'custom') {
    // Remove label from all emails
    emails.forEach(email => {
      if (email.labels) {
        email.labels = email.labels.filter(l => l !== labelId);
      }
    });
    
    labels.splice(labelIndex, 1);
    return true;
  }
  return false;
};

export const saveDraft = (draftData) => {
  const draft = {
    id: draftData.id || `draft-${Date.now()}`,
    to: draftData.to || [],
    cc: draftData.cc || [],
    bcc: draftData.bcc || [],
    subject: draftData.subject || '',
    body: draftData.body || '',
    timestamp: new Date(),
    labels: draftData.labels || []
  };
  
  if (draftData.id) {
    // Update existing draft
    const draftIndex = drafts.findIndex(d => d.id === draftData.id);
    if (draftIndex !== -1) {
      drafts[draftIndex] = draft;
    }
  } else {
    // Create new draft
    drafts.push(draft);
  }
  
  return draft;
};

export const deleteDraft = (draftId) => {
  const draftIndex = drafts.findIndex(draft => draft.id === draftId);
  if (draftIndex !== -1) {
    drafts.splice(draftIndex, 1);
    return true;
  }
  return false;
};

export const sendEmail = (emailData) => {
  const sentEmail = {
    id: `sent-${Date.now()}`,
    from: currentUser,
    to: emailData.to || [],
    cc: emailData.cc || [],
    bcc: emailData.bcc || [],
    subject: emailData.subject || '',
    body: emailData.body || '',
    timestamp: new Date(),
    read: true,
    starred: false,
    archived: false,
    labels: emailData.labels || [],
    folder: 'sent',
    attachments: emailData.attachments || [],
    priority: emailData.priority || 'medium',
    thread: emailData.thread || [`sent-${Date.now()}`]
  };
  
  sentEmails.push(sentEmail);
  
  // If this is a reply to a draft, delete the draft
  if (emailData.draftId) {
    deleteDraft(emailData.draftId);
  }
  
  return sentEmail;
};

export const bulkOperations = {
  markAllAsRead: (emailIds) => {
    emailIds.forEach(id => markAsRead(id));
  },
  
  markAllAsUnread: (emailIds) => {
    emailIds.forEach(id => markAsUnread(id));
  },
  
  addLabelToMultiple: (emailIds, labelId) => {
    emailIds.forEach(id => addLabel(id, labelId));
  },
  
  removeLabelFromMultiple: (emailIds, labelId) => {
    emailIds.forEach(id => removeLabel(id, labelId));
  },
  
  moveMultipleToFolder: (emailIds, folderId) => {
    emailIds.forEach(id => moveToFolder(id, folderId));
  },
  
  starMultiple: (emailIds) => {
    emailIds.forEach(id => {
      const email = emails.find(e => e.id === id);
      if (email) email.starred = true;
    });
  },
  
  unstarMultiple: (emailIds) => {
    emailIds.forEach(id => {
      const email = emails.find(e => e.id === id);
      if (email) email.starred = false;
    });
  }
};

export const advancedSearch = (searchParams) => {
  let results = [...emails];
  
  if (searchParams.query) {
    const query = searchParams.query.toLowerCase();
    results = results.filter(email =>
      email.subject.toLowerCase().includes(query) ||
      email.body.toLowerCase().includes(query) ||
      email.from.name.toLowerCase().includes(query) ||
      email.from.email.toLowerCase().includes(query)
    );
  }
  
  if (searchParams.from) {
    results = results.filter(email =>
      email.from.email.toLowerCase().includes(searchParams.from.toLowerCase()) ||
      email.from.name.toLowerCase().includes(searchParams.from.toLowerCase())
    );
  }
  
  if (searchParams.to) {
    results = results.filter(email =>
      email.to.some(recipient =>
        recipient.email.toLowerCase().includes(searchParams.to.toLowerCase()) ||
        recipient.name.toLowerCase().includes(searchParams.to.toLowerCase())
      )
    );
  }
  
  if (searchParams.subject) {
    results = results.filter(email =>
      email.subject.toLowerCase().includes(searchParams.subject.toLowerCase())
    );
  }
  
  if (searchParams.hasAttachment) {
    results = results.filter(email => email.attachments && email.attachments.length > 0);
  }
  
  if (searchParams.isStarred) {
    results = results.filter(email => email.starred);
  }
  
  if (searchParams.isUnread) {
    results = results.filter(email => !email.read);
  }
  
  if (searchParams.dateRange) {
    const { start, end } = searchParams.dateRange;
    if (start) {
      results = results.filter(email => new Date(email.timestamp) >= new Date(start));
    }
    if (end) {
      results = results.filter(email => new Date(email.timestamp) <= new Date(end));
    }
  }
  
  if (searchParams.labels && searchParams.labels.length > 0) {
    results = results.filter(email =>
      email.labels && searchParams.labels.some(label => email.labels.includes(label))
    );
  }
  
  return results.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
};

export const getEmailPreview = (email, maxLength = 150) => {
  // Strip HTML tags and get plain text preview
  const plainText = email.body.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  return plainText.length > maxLength 
    ? plainText.substring(0, maxLength) + '...'
    : plainText;
};

export const getAttachmentIcon = (fileType) => {
  const iconMap = {
    'application/pdf': '📄',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '📝',
    'application/vnd.ms-excel': '📊',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '📊',
    'application/vnd.ms-powerpoint': '📊',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': '📊',
    'application/zip': '📦',
    'application/x-rar-compressed': '📦',
    'image/jpeg': '🖼️',
    'image/png': '🖼️',
    'image/gif': '🖼️',
    'text/plain': '📄',
    'text/csv': '📊'
  };
  
  return iconMap[fileType] || '📎';
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const generateEmailId = () => {
  return `email-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const validateEmailAddress = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const parseEmailAddresses = (addressString) => {
  if (!addressString) return [];
  
  return addressString.split(',').map(addr => {
    const trimmed = addr.trim();
    const match = trimmed.match(/^(.+?)\s*<(.+?)>$/);
    
    if (match) {
      return {
        name: match[1].replace(/['"]/g, '').trim(),
        email: match[2].trim()
      };
    } else {
      return {
        name: trimmed,
        email: trimmed
      };
    }
  }).filter(addr => validateEmailAddress(addr.email));
};

const emailDataUtils = {
  currentUser,
  contacts,
  labels,
  folders,
  emails,
  drafts,
  sentEmails,
  getEmailById,
  getEmailsByFolder,
  getEmailsByLabel,
  searchEmails,
  getUnreadCount,
  getStarredCount,
  markAsRead,
  markAsUnread,
  toggleStar,
  moveToFolder,
  addLabel,
  removeLabel,
  getRecentContacts,
  formatEmailDate,
  getFilteredEmails,
  getEmailThread,
  getEmailStats,
  getEmailsByPriority,
  getRecentEmailActivity,
  getContactByEmail,
  addNewContact,
  updateContact,
  deleteContact,
  getLabelById,
  createNewLabel,
  updateLabel,
  deleteLabel,
  saveDraft,
  deleteDraft,
  sendEmail,
  bulkOperations,
  advancedSearch,
  getEmailPreview,
  getAttachmentIcon,
  formatFileSize,
  generateEmailId,
  validateEmailAddress,
  parseEmailAddresses
};

export default emailDataUtils;
