import React, { useState, useRef, useEffect } from 'react';
import { 
  FaTimes, 
  FaPaperclip, 
  FaImage, 
  FaLink, 
  FaSmile, 
  FaBold, 
  FaItalic, 
  FaUnderline,
  FaListUl,
  FaListOl,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaFont,
  FaTrash,
  FaEye,
  FaExpand,
  FaCompress,
  FaCheck,
  FaClock
} from 'react-icons/fa';
import { 
  currentUser, 
  parseEmailAddresses, 
  validateEmailAddress,
  saveDraft,
  sendEmail,
  deleteDraft,
  contacts
} from '../../utils/emailData';

const EmailCompose = ({ 
  isOpen, 
  onClose, 
  replyTo = null, 
  mode = 'new', // 'new', 'reply', 'replyAll', 'forward'
  draftId = null 
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [formData, setFormData] = useState({
    to: '',
    cc: '',
    bcc: '',
    subject: '',
    body: ''
  });
  const [attachments, setAttachments] = useState([]);
  const [showCc, setShowCc] = useState(false);
  const [showBcc, setShowBcc] = useState(false);
  const [sending, setSending] = useState(false);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestionField, setActiveSuggestionField] = useState(null);

  const fileInputRef = useRef(null);
  const bodyRef = useRef(null);

  // Auto-save draft every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (formData.to || formData.subject || formData.body) {
        handleSaveDraft();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [formData]);

  // Initialize form data based on mode
  useEffect(() => {
    if (replyTo && mode !== 'new') {
      let toAddresses = '';
      let subject = replyTo.subject;
      let body = '';

      switch (mode) {
        case 'reply':
          toAddresses = replyTo.from.email;
          subject = subject.startsWith('Re:') ? subject : `Re: ${subject}`;
          body = `\n\n<div style="border-left: 4px solid #ccc; padding-left: 16px; margin: 16px 0; color: #666;">
            <p><strong>On ${new Date(replyTo.timestamp).toLocaleString()}, ${replyTo.from.name} &lt;${replyTo.from.email}&gt; wrote:</strong></p>
            ${replyTo.body}
          </div>`;
          break;
        
        case 'replyAll':
          const allRecipients = [replyTo.from.email, ...replyTo.to.map(r => r.email)];
          toAddresses = allRecipients.filter(email => email !== currentUser.email).join(', ');
          subject = subject.startsWith('Re:') ? subject : `Re: ${subject}`;
          body = `\n\n<div style="border-left: 4px solid #ccc; padding-left: 16px; margin: 16px 0; color: #666;">
            <p><strong>On ${new Date(replyTo.timestamp).toLocaleString()}, ${replyTo.from.name} &lt;${replyTo.from.email}&gt; wrote:</strong></p>
            ${replyTo.body}
          </div>`;
          break;
        
        case 'forward':
          subject = subject.startsWith('Fwd:') ? subject : `Fwd: ${subject}`;
          body = `\n\n<div style="border-left: 4px solid #ccc; padding-left: 16px; margin: 16px 0; color: #666;">
            <p><strong>---------- Forwarded message ----------</strong></p>
            <p><strong>From:</strong> ${replyTo.from.name} &lt;${replyTo.from.email}&gt;</p>
            <p><strong>Date:</strong> ${new Date(replyTo.timestamp).toLocaleString()}</p>
            <p><strong>Subject:</strong> ${replyTo.subject}</p>
            <p><strong>To:</strong> ${replyTo.to.map(r => `${r.name} <${r.email}>`).join(', ')}</p>
            <br/>
            ${replyTo.body}
          </div>`;
          break;
      }

      setFormData({
        to: toAddresses,
        cc: '',
        bcc: '',
        subject,
        body
      });
    }
  }, [replyTo, mode]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Show email suggestions for recipient fields
    if (['to', 'cc', 'bcc'].includes(field) && value) {
      const query = value.toLowerCase();
      const matches = contacts.filter(contact => 
        contact.name.toLowerCase().includes(query) || 
        contact.email.toLowerCase().includes(query)
      ).slice(0, 5);
      
      setSuggestions(matches);
      setActiveSuggestionField(field);
    } else {
      setSuggestions([]);
      setActiveSuggestionField(null);
    }
  };

  const handleSuggestionClick = (contact) => {
    const currentValue = formData[activeSuggestionField];
    const newValue = currentValue 
      ? `${currentValue}, ${contact.name} <${contact.email}>`
      : `${contact.name} <${contact.email}>`;
    
    setFormData(prev => ({ ...prev, [activeSuggestionField]: newValue }));
    setSuggestions([]);
    setActiveSuggestionField(null);
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newAttachments = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      file: file
    }));
    
    setAttachments(prev => [...prev, ...newAttachments]);
  };

  const removeAttachment = (attachmentId) => {
    setAttachments(prev => prev.filter(att => att.id !== attachmentId));
  };

  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
    bodyRef.current?.focus();
  };

  const handleSaveDraft = async () => {
    setSaving(true);
    try {
      const draftData = {
        id: draftId,
        to: parseEmailAddresses(formData.to),
        cc: parseEmailAddresses(formData.cc),
        bcc: parseEmailAddresses(formData.bcc),
        subject: formData.subject,
        body: formData.body,
        attachments: attachments
      };
      
      saveDraft(draftData);
      setLastSaved(new Date());
    } catch (error) {
      console.error('Failed to save draft:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleSend = async () => {
    // Validate recipients
    const toAddresses = parseEmailAddresses(formData.to);
    if (toAddresses.length === 0) {
      alert('Please enter at least one recipient.');
      return;
    }

    // Validate all email addresses
    const allAddresses = [
      ...toAddresses,
      ...parseEmailAddresses(formData.cc),
      ...parseEmailAddresses(formData.bcc)
    ];
    
    const invalidAddresses = allAddresses.filter(addr => !validateEmailAddress(addr.email));
    if (invalidAddresses.length > 0) {
      alert(`Invalid email addresses: ${invalidAddresses.map(a => a.email).join(', ')}`);
      return;
    }

    setSending(true);
    try {
      const emailData = {
        to: toAddresses,
        cc: parseEmailAddresses(formData.cc),
        bcc: parseEmailAddresses(formData.bcc),
        subject: formData.subject || '(no subject)',
        body: formData.body + (currentUser.signature || ''),
        attachments: attachments,
        draftId: draftId
      };
      
      sendEmail(emailData);
      
      // Delete draft if it exists
      if (draftId) {
        deleteDraft(draftId);
      }
      
      onClose();
    } catch (error) {
      console.error('Failed to send email:', error);
      alert('Failed to send email. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const handleClose = () => {
    if (formData.to || formData.subject || formData.body) {
      if (confirm('Save draft before closing?')) {
        handleSaveDraft();
      }
    }
    onClose();
  };

  if (!isOpen) return null;

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={`fixed bg-white border border-gray-300 rounded-lg shadow-2xl z-50 ${
      isFullscreen 
        ? 'inset-4' 
        : isMinimized 
          ? 'bottom-4 right-4 w-80 h-12'
          : 'bottom-4 right-4 w-[600px] h-[700px]'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-900">
          {mode === 'new' ? 'New Message' : 
           mode === 'reply' ? 'Reply' :
           mode === 'replyAll' ? 'Reply All' :
           mode === 'forward' ? 'Forward' : 'New Message'}
        </h3>
        
        <div className="flex items-center space-x-2">
          {/* Status indicators */}
          {saving && (
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <FaClock className="animate-spin" />
              <span>Saving...</span>
            </div>
          )}
          
          {lastSaved && !saving && (
            <span className="text-xs text-gray-500">
              Saved {lastSaved.toLocaleTimeString()}
            </span>
          )}
          
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 text-gray-400 hover:text-gray-600"
          >
            {isMinimized ? <FaExpand /> : <FaCompress />}
          </button>
          
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1 text-gray-400 hover:text-gray-600"
          >
            {isFullscreen ? <FaCompress /> : <FaExpand />}
          </button>
          
          <button
            onClick={handleClose}
            className="p-1 text-gray-400 hover:text-gray-600"
          >
            <FaTimes />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Compose Form */}
          <div className="flex-1 flex flex-col overflow-y-auto">
            {/* Recipients */}
            <div className="p-4 space-y-3 border-b border-gray-200">
              {/* To Field */}
              <div className="flex items-center space-x-3">
                <label className="text-sm text-gray-700 w-12">To</label>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={formData.to}
                    onChange={(e) => handleInputChange('to', e.target.value)}
                    placeholder="Recipients"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  
                  {/* Email suggestions */}
                  {suggestions.length > 0 && activeSuggestionField === 'to' && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-10 mt-1">
                      {suggestions.map((contact) => (
                        <button
                          key={contact.id}
                          onClick={() => handleSuggestionClick(contact)}
                          className="w-full px-3 py-2 text-left hover:bg-gray-100 flex items-center space-x-3"
                        >
                          <img
                            src={contact.avatar}
                            alt={contact.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <p className="font-medium">{contact.name}</p>
                            <p className="text-sm text-gray-500">{contact.email}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  {!showCc && (
                    <button
                      onClick={() => setShowCc(true)}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Cc
                    </button>
                  )}
                  {!showBcc && (
                    <button
                      onClick={() => setShowBcc(true)}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Bcc
                    </button>
                  )}
                </div>
              </div>

              {/* CC Field */}
              {showCc && (
                <div className="flex items-center space-x-3">
                  <label className="text-sm text-gray-700 w-12">Cc</label>
                  <input
                    type="text"
                    value={formData.cc}
                    onChange={(e) => handleInputChange('cc', e.target.value)}
                    placeholder="Carbon copy recipients"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={() => setShowCc(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FaTimes />
                  </button>
                </div>
              )}

              {/* BCC Field */}
              {showBcc && (
                <div className="flex items-center space-x-3">
                  <label className="text-sm text-gray-700 w-12">Bcc</label>
                  <input
                    type="text"
                    value={formData.bcc}
                    onChange={(e) => handleInputChange('bcc', e.target.value)}
                    placeholder="Blind carbon copy recipients"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={() => setShowBcc(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FaTimes />
                  </button>
                </div>
              )}

              {/* Subject Field */}
              <div className="flex items-center space-x-3">
                <label className="text-sm text-gray-700 w-12">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  placeholder="Subject"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Formatting Toolbar */}
            <div className="px-4 py-2 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => formatText('bold')}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded"
                  title="Bold"
                >
                  <FaBold />
                </button>
                <button
                  onClick={() => formatText('italic')}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded"
                  title="Italic"
                >
                  <FaItalic />
                </button>
                <button
                  onClick={() => formatText('underline')}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded"
                  title="Underline"
                >
                  <FaUnderline />
                </button>
                
                <div className="w-px h-6 bg-gray-300 mx-2" />
                
                <button
                  onClick={() => formatText('insertUnorderedList')}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded"
                  title="Bullet List"
                >
                  <FaListUl />
                </button>
                <button
                  onClick={() => formatText('insertOrderedList')}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded"
                  title="Numbered List"
                >
                  <FaListOl />
                </button>
                
                <div className="w-px h-6 bg-gray-300 mx-2" />
                
                <button
                  onClick={() => formatText('justifyLeft')}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded"
                  title="Align Left"
                >
                  <FaAlignLeft />
                </button>
                <button
                  onClick={() => formatText('justifyCenter')}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded"
                  title="Align Center"
                >
                  <FaAlignCenter />
                </button>
                <button
                  onClick={() => formatText('justifyRight')}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded"
                  title="Align Right"
                >
                  <FaAlignRight />
                </button>
              </div>
            </div>

            {/* Message Body */}
            <div className="flex-1 p-4">
              <div
                ref={bodyRef}
                contentEditable
                className="w-full h-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{ minHeight: '200px' }}
                onInput={(e) => handleInputChange('body', e.target.innerHTML)}
                dangerouslySetInnerHTML={{ __html: formData.body }}
              />
            </div>

            {/* Attachments */}
            {attachments.length > 0 && (
              <div className="px-4 py-3 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Attachments</h4>
                <div className="space-y-2">
                  {attachments.map((attachment) => (
                    <div key={attachment.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-2">
                      <div className="flex items-center space-x-2">
                        <FaPaperclip className="text-gray-400" />
                        <span className="text-sm text-gray-700">{attachment.name}</span>
                        <span className="text-xs text-gray-500">({formatFileSize(attachment.size)})</span>
                      </div>
                      <button
                        onClick={() => removeAttachment(attachment.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash className="text-sm" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleSend}
                  disabled={sending}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <FaCheck />
                      <span>Send</span>
                    </>
                  )}
                </button>
                
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded"
                  title="Attach files"
                >
                  <FaPaperclip />
                </button>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleSaveDraft}
                  disabled={saving}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Save draft
                </button>
                
                <button
                  onClick={handleClose}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Discard
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EmailCompose;
