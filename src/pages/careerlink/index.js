import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  FaPlus, 
  FaImage, 
  FaVideo, 
  FaCalendarAlt, 
  FaNewspaper,
  FaUsers,
  FaBriefcase,
  FaGraduationCap,
  FaArrowRight,
  FaEye,
  FaSearch
} from 'react-icons/fa';
import CareerLinkHeader from '../../components/careerlink/CareerLinkHeader';
import PostCard from '../../components/careerlink/PostCard';
import JobCard from '../../components/careerlink/JobCard';
import ProfileCard from '../../components/careerlink/ProfileCard';
import careerLinkDataUtils from '../../utils/careerLinkData';

const CareerLinkHome = () => {
  const [posts, setPosts] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [suggestedConnections, setSuggestedConnections] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [postText, setPostText] = useState('');
  const [showPostDialog, setShowPostDialog] = useState(false);
  const [showMediaDialog, setShowMediaDialog] = useState(false);
  const [showEventDialog, setShowEventDialog] = useState(false);
  const [showArticleDialog, setShowArticleDialog] = useState(false);
  const [commentedPosts, setCommentedPosts] = useState(new Set());
  const [sharedPosts, setSharedPosts] = useState(new Set());

  const {
    getFeedForUser,
    getRecommendedJobs,
    suggestConnections,
    getUserById,
    likePost,
    createPost
  } = careerLinkDataUtils;

  useEffect(() => {
    // Get current user (in real app, this would come from auth)
    const user = getUserById('sarah-chen');
    setCurrentUser(user);

    // Load feed data
    const feedPosts = getFeedForUser('sarah-chen');
    setPosts(feedPosts);

    // Load recommended jobs
    const jobs = getRecommendedJobs('sarah-chen');
    setRecommendedJobs(jobs.slice(0, 3));

    // Load suggested connections
    const connections = suggestConnections('sarah-chen');
    setSuggestedConnections(connections.slice(0, 4));
  }, []);

  const handleLikePost = (postId, reactionType = 'like') => {
    likePost(postId, 'sarah-chen');
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleCreatePost = () => {
    if (!postText.trim()) return;

    const newPost = createPost('sarah-chen', {
      content: postText,
      type: 'text',
      tags: []
    });

    if (newPost) {
      setPosts([newPost, ...posts]);
      setPostText('');
      setShowPostDialog(false);
    }
  };

  const handleMediaClick = () => {
    setShowMediaDialog(true);
  };

  const handleEventClick = () => {
    setShowEventDialog(true);
  };

  const handleArticleClick = () => {
    setShowArticleDialog(true);
  };

  const handleCommentClick = (postId) => {
    setCommentedPosts(prev => new Set([...prev, postId]));
  };

  const handleShareClick = (postId) => {
    setSharedPosts(prev => new Set([...prev, postId]));
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50">
        <CareerLinkHeader />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>CareerLink - Professional Network</title>
        <meta name="description" content="Connect with professionals, find jobs, and grow your career" />
        <meta httpEquiv="Content-Language" content="en-US" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <CareerLinkHeader />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Sidebar */}
            <div className="lg:col-span-1 space-y-4">
              {/* Profile Card */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                {/* Cover Image */}
                <div className="h-16 bg-gradient-to-r from-blue-500 to-purple-600 relative">
                  <img
                    src={currentUser.backgroundImage}
                    alt="Cover"
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>

                {/* Profile Info */}
                <div className="px-4 pb-4 relative bg-white">
                  <div className="flex justify-center -mt-8 mb-3 relative z-10">
                    <Link href={`/careerlink/profile/${currentUser.id}`}>
                      <img
                        src={currentUser.profilePicture}
                        alt={`${currentUser.firstName} ${currentUser.lastName}`}
                        className="w-16 h-16 rounded-full border-4 border-white cursor-pointer hover:opacity-90 object-cover"
                      />
                    </Link>
                  </div>

                  <div className="text-center relative z-10">
                    <Link href={`/careerlink/profile/${currentUser.id}`}>
                      <h3 className="font-semibold text-gray-900 hover:text-blue-600 cursor-pointer mb-1">
                        {currentUser.firstName} {currentUser.lastName}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{currentUser.headline}</p>
                  </div>

                  <div className="border-t border-gray-100 pt-3 relative z-10">
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>Profile viewers</span>
                      <span className="text-blue-600 font-medium">28</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600 mt-1">
                      <span>Post impressions</span>
                      <span className="text-blue-600 font-medium">156</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-3 mt-3 relative z-10">
                    <p className="text-xs text-gray-600 mb-2">Grow your network</p>
                    <Link href="/careerlink/network">
                      <div className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 cursor-pointer">
                        <FaUsers size={12} />
                        <span className="text-sm font-medium">My network</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Recent</h3>
                <div className="space-y-2">
                  <Link href="/careerlink/company/google">
                    <div className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-600 cursor-pointer">
                      <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                        <FaUsers size={10} />
                      </div>
                      <span>Google</span>
                    </div>
                  </Link>
                  <Link href="/careerlink/jobs?function=engineering">
                    <div className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-600 cursor-pointer">
                      <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                        <FaBriefcase size={10} />
                      </div>
                      <span>Software Engineering Jobs</span>
                    </div>
                  </Link>
                  <Link href="/careerlink/learning">
                    <div className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-600 cursor-pointer">
                      <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                        <FaGraduationCap size={10} />
                      </div>
                      <span>Machine Learning Course</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Main Feed */}
            <div className="lg:col-span-2">
              {/* Create Post */}
              <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={currentUser.profilePicture}
                    alt="Profile"
                    className="w-12 h-12 rounded-full"
                  />
                  <button
                    onClick={() => setShowPostDialog(true)}
                    className="flex-1 text-left px-4 py-3 bg-gray-50 border border-gray-200 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    Start a post...
                  </button>
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                  <button 
                    onClick={handleMediaClick}
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 px-3 py-2 rounded hover:bg-blue-50 transition-colors"
                  >
                    <FaImage className="text-blue-500" />
                    <span className="text-sm font-medium">Media</span>
                  </button>
                  <button 
                    onClick={handleEventClick}
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 px-3 py-2 rounded hover:bg-blue-50 transition-colors"
                  >
                    <FaCalendarAlt className="text-yellow-500" />
                    <span className="text-sm font-medium">Event</span>
                  </button>
                  <button 
                    onClick={handleArticleClick}
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 px-3 py-2 rounded hover:bg-blue-50 transition-colors"
                  >
                    <FaNewspaper className="text-red-500" />
                    <span className="text-sm font-medium">Article</span>
                  </button>
                </div>
              </div>

              {/* Post Creation Dialog */}
              {showPostDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-lg max-w-lg w-full p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Create a post</h3>
                      <button
                        onClick={() => setShowPostDialog(false)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        ×
                      </button>
                    </div>

                    <div className="flex items-start space-x-3 mb-4">
                      <img
                        src={currentUser.profilePicture}
                        alt="Profile"
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <h4 className="font-medium">{currentUser.firstName} {currentUser.lastName}</h4>
                        <p className="text-sm text-gray-600">Post to anyone</p>
                      </div>
                    </div>

                    <textarea
                      value={postText}
                      onChange={(e) => setPostText(e.target.value)}
                      placeholder="What do you want to talk about?"
                      className="w-full h-32 p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />

                    <div className="flex justify-end mt-4">
                      <button
                        onClick={handleCreatePost}
                        disabled={!postText.trim()}
                        className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Media Upload Dialog */}
              {showMediaDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-lg max-w-md w-full p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Add Media</h3>
                      <button
                        onClick={() => setShowMediaDialog(false)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        ×
                      </button>
                    </div>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <FaImage className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-gray-600 mb-4">Upload photos, videos, or documents</p>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Choose Files
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Event Creation Dialog */}
              {showEventDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-lg max-w-md w-full p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Create Event</h3>
                      <button
                        onClick={() => setShowEventDialog(false)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        ×
                      </button>
                    </div>
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Event title"
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <textarea
                        placeholder="Event description"
                        className="w-full h-24 p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="datetime-local"
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                        Create Event
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Article Creation Dialog */}
              {showArticleDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-lg max-w-2xl w-full p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Write Article</h3>
                      <button
                        onClick={() => setShowArticleDialog(false)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        ×
                      </button>
                    </div>
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Article title"
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <textarea
                        placeholder="Write your article content..."
                        className="w-full h-48 p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <div className="flex justify-end space-x-3">
                        <button
                          onClick={() => setShowArticleDialog(false)}
                          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                          Publish Article
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Feed Posts */}
              <div className="space-y-4">
                {posts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onLike={handleLikePost}
                    onComment={handleCommentClick}
                    onShare={handleShareClick}
                    isCommented={commentedPosts.has(post.id)}
                    isShared={sharedPosts.has(post.id)}
                  />
                ))}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1 space-y-4">
              {/* News/Trending */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">CareerLink News</h3>
                  <FaNewspaper className="text-gray-400" />
                </div>
                <div className="space-y-3">
                  <div className="cursor-pointer hover:bg-gray-50 p-2 rounded">
                    <h4 className="text-sm font-medium text-gray-900 mb-1">
                      Tech layoffs continue across Silicon Valley
                    </h4>
                    <p className="text-xs text-gray-600">2 hours ago • 1,234 readers</p>
                  </div>
                  <div className="cursor-pointer hover:bg-gray-50 p-2 rounded">
                    <h4 className="text-sm font-medium text-gray-900 mb-1">
                      Remote work policies evolving in 2024
                    </h4>
                    <p className="text-xs text-gray-600">4 hours ago • 892 readers</p>
                  </div>
                  <div className="cursor-pointer hover:bg-gray-50 p-2 rounded">
                    <h4 className="text-sm font-medium text-gray-900 mb-1">
                      AI skills in highest demand for developers
                    </h4>
                    <p className="text-xs text-gray-600">6 hours ago • 2,156 readers</p>
                  </div>
                </div>
              </div>

              {/* Recommended Jobs */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">Recommended for you</h3>
                  <Link href="/careerlink/jobs">
                    <FaEye className="text-gray-400 hover:text-blue-600 cursor-pointer" />
                  </Link>
                </div>
                <div className="space-y-3">
                  {recommendedJobs.map((job) => (
                    <JobCard key={job.id} job={job} compact={true} />
                  ))}
                </div>
                <Link href="/careerlink/jobs">
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-center text-blue-600 hover:text-blue-800 cursor-pointer">
                      <span className="text-sm font-medium">Show all jobs</span>
                      <FaArrowRight className="ml-2" size={12} />
                    </div>
                  </div>
                </Link>
              </div>

              {/* People You May Know */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">People you may know</h3>
                  <Link href="/careerlink/network">
                    <FaEye className="text-gray-400 hover:text-blue-600 cursor-pointer" />
                  </Link>
                </div>
                <div className="space-y-3">
                  {suggestedConnections.map((user) => (
                    <ProfileCard 
                      key={user.id} 
                      user={user} 
                      compact={true}
                      connectionStatus="none"
                    />
                  ))}
                </div>
                <Link href="/careerlink/network">
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-center text-blue-600 hover:text-blue-800 cursor-pointer">
                      <span className="text-sm font-medium">Show all</span>
                      <FaArrowRight className="ml-2" size={12} />
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CareerLinkHome;
