import staticCareerLinkData from '../data/staticCareerLinkData';

const {
  industries,
  companies,
  jobFunctions,
  skills,
  users,
  jobs,
  posts,
  notifications,
  conversations,
  courses,
  events
} = staticCareerLinkData;

// User-related functions
export const getUsers = () => {
  return users;
};

export const getUserById = (id) => {
  return users.find(user => user.id === id);
};

export const searchUsers = (query, filters = {}) => {
  let filteredUsers = users;

  // Text search
  if (query && query.trim()) {
    const searchTerm = query.toLowerCase();
    filteredUsers = filteredUsers.filter(user =>
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm) ||
      user.headline.toLowerCase().includes(searchTerm) ||
      user.currentPosition?.toLowerCase().includes(searchTerm) ||
      user.skills?.some(skill => skill.toLowerCase().includes(searchTerm))
    );
  }

  // Industry filter
  if (filters.industry && filters.industry !== 'all') {
    filteredUsers = filteredUsers.filter(user => user.industry === filters.industry);
  }

  // Location filter
  if (filters.location && filters.location !== 'all') {
    filteredUsers = filteredUsers.filter(user => 
      user.location.toLowerCase().includes(filters.location.toLowerCase())
    );
  }

  // Company filter
  if (filters.company && filters.company !== 'all') {
    filteredUsers = filteredUsers.filter(user => user.currentCompany === filters.company);
  }

  return filteredUsers;
};

export const getUserConnections = (userId) => {
  // In a real app, this would fetch from a database
  // For now, return a subset of users as connections
  const user = getUserById(userId);
  if (!user) return [];
  
  return users.filter(u => u.id !== userId).slice(0, Math.min(user.connections, 20));
};

export const suggestConnections = (userId) => {
  const user = getUserById(userId);
  if (!user) return [];
  
  // Suggest users from same industry or company
  return users.filter(u => 
    u.id !== userId && 
    (u.industry === user.industry || u.currentCompany === user.currentCompany)
  ).slice(0, 10);
};

// Company-related functions
export const getCompanies = () => {
  return companies;
};

export const getCompanyById = (id) => {
  return companies.find(company => company.id === id);
};

export const searchCompanies = (query, filters = {}) => {
  let filteredCompanies = companies;

  // Text search
  if (query && query.trim()) {
    const searchTerm = query.toLowerCase();
    filteredCompanies = filteredCompanies.filter(company =>
      company.name.toLowerCase().includes(searchTerm) ||
      company.description.toLowerCase().includes(searchTerm) ||
      company.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm))
    );
  }

  // Industry filter
  if (filters.industry && filters.industry !== 'all') {
    filteredCompanies = filteredCompanies.filter(company => company.industry === filters.industry);
  }

  // Size filter
  if (filters.size && filters.size !== 'all') {
    filteredCompanies = filteredCompanies.filter(company => company.size === filters.size);
  }

  return filteredCompanies;
};

export const getCompanyEmployees = (companyId) => {
  return users.filter(user => user.currentCompany === companyId);
};

// Job-related functions
export const getJobs = () => {
  return jobs;
};

export const getJobById = (id) => {
  return jobs.find(job => job.id === id);
};

export const searchJobs = (query, filters = {}) => {
  let filteredJobs = jobs;

  // Text search
  if (query && query.trim()) {
    const searchTerm = query.toLowerCase();
    filteredJobs = filteredJobs.filter(job =>
      job.title.toLowerCase().includes(searchTerm) ||
      job.description.toLowerCase().includes(searchTerm) ||
      job.skills.some(skill => skill.toLowerCase().includes(searchTerm)) ||
      job.company.toLowerCase().includes(searchTerm)
    );
  }

  // Location filter
  if (filters.location && filters.location !== 'all') {
    filteredJobs = filteredJobs.filter(job => 
      job.location.toLowerCase().includes(filters.location.toLowerCase())
    );
  }

  // Company filter
  if (filters.company && filters.company !== 'all') {
    filteredJobs = filteredJobs.filter(job => job.companyId === filters.company);
  }

  // Function filter
  if (filters.function && filters.function !== 'all') {
    filteredJobs = filteredJobs.filter(job => job.function === filters.function);
  }

  // Level filter
  if (filters.level && filters.level !== 'all') {
    filteredJobs = filteredJobs.filter(job => job.level === filters.level);
  }

  // Type filter
  if (filters.type && filters.type !== 'all') {
    filteredJobs = filteredJobs.filter(job => job.type === filters.type);
  }

  // Remote filter
  if (filters.remote === true) {
    filteredJobs = filteredJobs.filter(job => job.remote === true);
  }

  // Salary filter
  if (filters.minSalary) {
    filteredJobs = filteredJobs.filter(job => 
      job.salary && job.salary.min >= parseInt(filters.minSalary)
    );
  }

  // Sort by posted date (newest first)
  filteredJobs.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));

  return filteredJobs;
};

export const getJobsByCompany = (companyId) => {
  return jobs.filter(job => job.companyId === companyId);
};

export const getRecommendedJobs = (userId) => {
  const user = getUserById(userId);
  if (!user) return [];

  // Recommend jobs based on user's skills and industry
  return jobs.filter(job => 
    job.industry === user.industry ||
    job.skills.some(skill => user.skills?.includes(skill))
  ).slice(0, 10);
};

export const applyToJob = (jobId, userId, applicationData) => {
  // Simulate job application
  const applicationId = 'app-' + Date.now();
  return {
    id: applicationId,
    jobId,
    userId,
    status: 'submitted',
    submittedAt: new Date().toISOString(),
    ...applicationData
  };
};

// Feed/Posts functions
export const getPosts = () => {
  return posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
};

export const getPostById = (id) => {
  return posts.find(post => post.id === id);
};

export const getPostsByUser = (userId) => {
  return posts.filter(post => post.author === userId);
};

export const getFeedForUser = (userId) => {
  // In a real app, this would return posts from connections and followed companies
  // For demo, return all posts
  return getPosts();
};

export const createPost = (userId, postData) => {
  const user = getUserById(userId);
  if (!user) return null;

  const newPost = {
    id: 'post-' + Date.now(),
    author: userId,
    authorName: `${user.firstName} ${user.lastName}`,
    authorHeadline: user.headline,
    authorPicture: user.profilePicture,
    timestamp: new Date().toISOString(),
    likes: 0,
    comments: 0,
    shares: 0,
    isLiked: false,
    engagement: { reactions: [] },
    ...postData
  };

  // In a real app, this would save to database
  return newPost;
};

export const likePost = (postId, userId) => {
  const post = getPostById(postId);
  if (!post) return null;

  // Toggle like status
  post.isLiked = !post.isLiked;
  post.likes += post.isLiked ? 1 : -1;

  return post;
};

// Notification functions
export const getNotifications = (userId) => {
  return notifications.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
};

export const markNotificationAsRead = (notificationId) => {
  const notification = notifications.find(n => n.id === notificationId);
  if (notification) {
    notification.read = true;
  }
  return notification;
};

export const getUnreadNotificationCount = (userId) => {
  return notifications.filter(n => !n.read).length;
};

// Messaging functions
export const getConversations = (userId) => {
  return conversations.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
};

export const getConversationById = (conversationId) => {
  return conversations.find(conv => conv.id === conversationId);
};

export const sendMessage = (conversationId, senderId, content) => {
  const conversation = getConversationById(conversationId);
  if (!conversation) return null;

  const newMessage = {
    id: 'msg-' + Date.now(),
    sender: senderId,
    content,
    timestamp: new Date().toISOString()
  };

  conversation.messages.push(newMessage);
  conversation.lastMessage = content;
  conversation.timestamp = newMessage.timestamp;
  conversation.unread = true;

  return newMessage;
};

// Learning functions
export const getCourses = () => {
  return courses;
};

export const getCourseById = (id) => {
  return courses.find(course => course.id === id);
};

export const searchCourses = (query, filters = {}) => {
  let filteredCourses = courses;

  if (query && query.trim()) {
    const searchTerm = query.toLowerCase();
    filteredCourses = filteredCourses.filter(course =>
      course.title.toLowerCase().includes(searchTerm) ||
      course.description.toLowerCase().includes(searchTerm) ||
      course.skills.some(skill => skill.toLowerCase().includes(searchTerm))
    );
  }

  if (filters.level && filters.level !== 'all') {
    filteredCourses = filteredCourses.filter(course => course.level === filters.level);
  }

  return filteredCourses;
};

export const getRecommendedCourses = (userId) => {
  const user = getUserById(userId);
  if (!user) return [];

  // Recommend courses based on user's skills gap
  return courses.filter(course => 
    course.skills.some(skill => !user.skills?.includes(skill))
  );
};

// Event functions
export const getEvents = () => {
  return events;
};

export const getEventById = (id) => {
  return events.find(event => event.id === id);
};

export const searchEvents = (query, filters = {}) => {
  let filteredEvents = events;

  if (query && query.trim()) {
    const searchTerm = query.toLowerCase();
    filteredEvents = filteredEvents.filter(event =>
      event.title.toLowerCase().includes(searchTerm) ||
      event.description.toLowerCase().includes(searchTerm) ||
      event.topics?.some(topic => topic.toLowerCase().includes(searchTerm))
    );
  }

  if (filters.type && filters.type !== 'all') {
    filteredEvents = filteredEvents.filter(event => event.type === filters.type);
  }

  if (filters.virtual !== undefined) {
    filteredEvents = filteredEvents.filter(event => event.virtual === filters.virtual);
  }

  return filteredEvents;
};

// Industry and Skills functions
export const getIndustries = () => {
  return industries;
};

export const getJobFunctions = () => {
  return jobFunctions;
};

export const getSkills = () => {
  return skills;
};

export const getIndustryById = (id) => {
  return industries.find(industry => industry.id === id);
};

export const getJobFunctionById = (id) => {
  return jobFunctions.find(func => func.id === id);
};

// Utility functions
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = now - date;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffTime / (1000 * 60));

  if (diffMinutes < 60) {
    return `${diffMinutes}m ago`;
  } else if (diffHours < 24) {
    return `${diffHours}h ago`;
  } else if (diffDays < 7) {
    return `${diffDays}d ago`;
  } else {
    return date.toLocaleDateString();
  }
};

export const formatSalary = (salary) => {
  if (!salary) return 'Salary not disclosed';
  
  const { min, max, currency, period } = salary;
  const formatNumber = (num) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}k`;
    }
    return num.toString();
  };

  if (min && max) {
    return `$${formatNumber(min)} - $${formatNumber(max)} ${period}`;
  } else if (min) {
    return `$${formatNumber(min)}+ ${period}`;
  }
  
  return 'Salary not disclosed';
};

export const formatNumber = (num) => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`;
  }
  return num.toString();
};

export const getConnectionDegree = (userId, targetUserId) => {
  // Simplified connection degree calculation
  if (userId === targetUserId) return 0;
  
  const userConnections = getUserConnections(userId);
  if (userConnections.some(conn => conn.id === targetUserId)) {
    return 1; // Direct connection
  }
  
  return 2; // 2nd degree connection (simplified)
};

const careerLinkDataUtils = {
  getUsers,
  getUserById,
  searchUsers,
  getUserConnections,
  suggestConnections,
  getCompanies,
  getCompanyById,
  searchCompanies,
  getCompanyEmployees,
  getJobs,
  getJobById,
  searchJobs,
  getJobsByCompany,
  getRecommendedJobs,
  applyToJob,
  getPosts,
  getPostById,
  getPostsByUser,
  getFeedForUser,
  createPost,
  likePost,
  getNotifications,
  markNotificationAsRead,
  getUnreadNotificationCount,
  getConversations,
  getConversationById,
  sendMessage,
  getCourses,
  getCourseById,
  searchCourses,
  getRecommendedCourses,
  getEvents,
  getEventById,
  searchEvents,
  getIndustries,
  getJobFunctions,
  getSkills,
  getIndustryById,
  getJobFunctionById,
  formatDate,
  formatSalary,
  formatNumber,
  getConnectionDegree
};

export default careerLinkDataUtils;
