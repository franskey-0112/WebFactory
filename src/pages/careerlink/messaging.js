import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import CareerLinkHeader from '../../components/careerlink/CareerLinkHeader';
import { getConversations, getUsers } from '../../utils/careerLinkData';
import { 
  FaSearch, 
  FaPaperPlane, 
  FaEllipsisV, 
  FaPaperclip, 
  FaSmile,
  FaPhone,
  FaVideo,
  FaInfoCircle,
  FaCommentDots
} from 'react-icons/fa';

const MessagingPage = () => {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMessagingData();
  }, []);

  const loadMessagingData = async () => {
    try {
      setLoading(true);
      const messages = getConversations();
      const users = getUsers();
      
      // Create conversation objects with user details
      const conversationsWithDetails = messages.map(conv => {
        const otherUser = users.find(user => 
          user.id === conv.participant
        );
        
        return {
          ...conv,
          otherUser: otherUser || {
            id: conv.participant,
            firstName: conv.participantName?.split(' ')[0] || 'Unknown',
            lastName: conv.participantName?.split(' ')[1] || 'User',
            profilePicture: conv.participantPicture || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=100&h=100&fit=crop'
          },
          lastMessage: conv.messages && conv.messages.length > 0 ? 
            conv.messages[conv.messages.length - 1] : 
            { content: conv.lastMessage, timestamp: conv.timestamp },
          unreadCount: conv.unread ? Math.floor(Math.random() * 3) + 1 : 0
        };
      });

      setConversations(conversationsWithDetails);
      if (conversationsWithDetails.length > 0) {
        setActiveConversation(conversationsWithDetails[0]);
      }
    } catch (error) {
      console.error('Error loading messaging data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeConversation) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: 'sarah-chen',
      content: newMessage,
      timestamp: new Date().toISOString()
    };

    // Add message to active conversation
    const updatedConversation = {
      ...activeConversation,
      messages: [...activeConversation.messages, newMsg],
      lastMessage: newMsg
    };

    // Update conversations list
    const updatedConversations = conversations.map(conv =>
      conv.id === activeConversation.id ? updatedConversation : conv
    );

    setConversations(updatedConversations);
    setActiveConversation(updatedConversation);
    setNewMessage('');
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const ConversationItem = ({ conversation }) => (
    <div
      onClick={() => setActiveConversation(conversation)}
      className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 border-b border-gray-100 ${
        activeConversation?.id === conversation.id ? 'bg-blue-50 border-blue-200' : ''
      }`}
    >
      <div className="relative">
        <img
          src={conversation.otherUser?.profilePicture}
          alt={conversation.otherUser?.firstName}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
      </div>
      <div className="ml-3 flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900 truncate">
            {conversation.otherUser?.firstName} {conversation.otherUser?.lastName}
          </h3>
          <span className="text-xs text-gray-500">
            {formatTime(conversation.lastMessage?.timestamp)}
          </span>
        </div>
        <p className="text-sm text-gray-600 truncate mt-1">
          {conversation.lastMessage?.content}
        </p>
      </div>
      {conversation.unreadCount > 0 && (
        <div className="ml-2 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
          {conversation.unreadCount}
        </div>
      )}
    </div>
  );

  const MessageBubble = ({ message, isOwn }) => (
    <div className={`flex mb-4 ${isOwn ? 'justify-end' : 'justify-start'}`}>
      {!isOwn && (
        <img
          src={activeConversation?.otherUser?.profilePicture}
          alt="Profile"
          className="w-8 h-8 rounded-full mr-2"
        />
      )}
      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
        isOwn 
          ? 'bg-blue-600 text-white' 
          : 'bg-gray-200 text-gray-900'
      }`}>
        <p className="text-sm">{message.content}</p>
        <p className={`text-xs mt-1 ${isOwn ? 'text-blue-100' : 'text-gray-500'}`}>
          {formatTime(message.timestamp)}
        </p>
      </div>
      {isOwn && (
        <img
          src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=400&h=400&fit=crop"
          alt="Profile"
          className="w-8 h-8 rounded-full ml-2"
        />
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Head>
          <title>Messaging - CareerLink</title>
        </Head>
        <CareerLinkHeader />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Messaging - CareerLink</title>
        <meta name="description" content="Stay connected with your professional network" />
      </Head>

      <CareerLinkHeader />

      <div className="h-screen flex">
        {/* Conversations Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-xl font-semibold text-gray-900 mb-4">Messaging</h1>
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {conversations
              .filter(conv => 
                searchQuery === '' || 
                `${conv.otherUser?.firstName} ${conv.otherUser?.lastName}`
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
              )
              .map(conversation => (
                <ConversationItem key={conversation.id} conversation={conversation} />
              ))
            }
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {activeConversation ? (
            <>
              {/* Chat Header */}
              <div className="bg-white px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={activeConversation.otherUser?.profilePicture}
                    alt="Profile"
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {activeConversation.otherUser?.firstName} {activeConversation.otherUser?.lastName}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {activeConversation.otherUser?.headline}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="text-gray-500 hover:text-gray-700">
                    <FaPhone size={18} />
                  </button>
                  <button className="text-gray-500 hover:text-gray-700">
                    <FaVideo size={18} />
                  </button>
                  <button className="text-gray-500 hover:text-gray-700">
                    <FaInfoCircle size={18} />
                  </button>
                  <button className="text-gray-500 hover:text-gray-700">
                    <FaEllipsisV size={18} />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
                {activeConversation.messages.map(message => (
                  <MessageBubble
                    key={message.id}
                    message={message}
                    isOwn={message.sender === 'sarah-chen'}
                  />
                ))}
              </div>

              {/* Message Input */}
              <div className="bg-white px-6 py-4 border-t border-gray-200">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-4">
                  <button
                    type="button"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FaPaperclip size={18} />
                  </button>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Write a message..."
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button
                    type="button"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FaSmile size={18} />
                  </button>
                  <button
                    type="submit"
                    disabled={!newMessage.trim()}
                    className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <FaPaperPlane size={16} />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCommentDots className="text-gray-500 text-2xl" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No conversation selected</h3>
                <p className="text-gray-600">Choose a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagingPage;
