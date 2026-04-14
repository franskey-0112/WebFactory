import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  FaUserPlus,
  FaUserCheck,
  FaEnvelope,
  FaEllipsisH,
  FaMapMarkerAlt,
  FaBuilding,
  FaGraduationCap,
  FaAward,
  FaLanguage,
  FaHeart,
  FaEdit,
  FaExternalLinkAlt,
  FaCheckCircle,
  FaPlus,
  FaTimes
} from 'react-icons/fa';
import CareerLinkHeader from '../../../components/careerlink/CareerLinkHeader';
import PostCard from '../../../components/careerlink/PostCard';
import careerLinkDataUtils from '../../../utils/careerLinkData';

const ProfilePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [activeSection, setActiveSection] = useState('about');
  const [connectionStatus, setConnectionStatus] = useState('none');
  const [loading, setLoading] = useState(true);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showAddSection, setShowAddSection] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [editSaved, setEditSaved] = useState(false);

  const {
    getUserById,
    getPostsByUser,
    getCompanyById,
    formatDate
  } = careerLinkDataUtils;

  useEffect(() => {
    if (id) {
      loadUserData();
    }
  }, [id]);

  const loadUserData = async () => {
    try {
      setLoading(true);
      const userData = getUserById(id);
      if (!userData) {
        router.push('/careerlink/404');
        return;
      }
      
      setUser(userData);
      
      const posts = getPostsByUser(id);
      setUserPosts(posts);
      
      // Simulate connection status (in real app, this would come from backend)
      if (id === 'sarah-chen') {
        setConnectionStatus('self');
      } else {
        setConnectionStatus(Math.random() > 0.5 ? 'connected' : 'none');
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = () => {
    if (connectionStatus === 'connected') return;
    setConnectionStatus('pending');
    
    // Simulate connection request
    setTimeout(() => {
      setConnectionStatus('connected');
    }, 1000);
  };

  const handleMessage = () => {
    router.push('/careerlink/messaging');
  };

  const handleEditProfile = () => {
    if (user) setEditForm({ headline: user.headline, summary: user.summary || '', location: user.location });
    setShowEditProfile(true);
  };

  const handleSaveProfile = () => {
    setEditSaved(true);
    setTimeout(() => { setShowEditProfile(false); setEditSaved(false); }, 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <CareerLinkHeader />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <CareerLinkHeader />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Profile not found</h1>
            <p className="text-gray-600 mb-8">The profile you're looking for doesn't exist.</p>
            <Link href="/careerlink">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Back to Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const company = user.currentCompany ? getCompanyById(user.currentCompany) : null;
  const isOwnProfile = connectionStatus === 'self';

  return (
    <>
      <Head>
        <title>{user.firstName} {user.lastName} - CareerLink</title>
        <meta name="description" content={user.headline} />
        <meta httpEquiv="Content-Language" content="en-US" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <CareerLinkHeader />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Profile Header */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
            {/* Cover Image */}
            <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative">
              <img
                src={user.backgroundImage}
                alt="Cover"
                className="w-full h-full object-cover opacity-80"
              />
              {isOwnProfile && (
                <button className="absolute top-4 right-4 bg-white bg-opacity-20 text-white p-2 rounded-lg hover:bg-opacity-30 transition-colors z-10">
                  <FaEdit size={16} />
                </button>
              )}
            </div>

            {/* Profile Info */}
            <div className="px-6 pb-6 relative bg-white">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between -mt-16 mb-4">
                <div className="flex flex-col lg:flex-row lg:items-end lg:space-x-6">
                  {/* Profile Picture */}
                  <div className="relative mb-4 lg:mb-0 z-10">
                    <img
                      src={user.profilePicture}
                      alt={`${user.firstName} ${user.lastName}`}
                      className="w-32 h-32 rounded-full border-6 border-white object-cover"
                    />
                    {isOwnProfile && (
                      <button className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors z-20">
                        <FaEdit size={12} />
                      </button>
                    )}
                  </div>

                  {/* Name and Basic Info */}
                  <div className="lg:mb-4 relative z-10">
                    <div className="flex items-center space-x-2 mb-2">
                      <h1 className="text-3xl font-bold text-gray-900">
                        {user.firstName} {user.lastName}
                      </h1>
                      {user.isVerified && (
                        <FaCheckCircle className="text-blue-600" size={20} />
                      )}
                    </div>
                    <p className="text-lg text-gray-700 mb-2">{user.headline}</p>
                    <div className="flex flex-wrap items-center gap-4 text-gray-600">
                      <div className="flex items-center space-x-1">
                        <FaMapMarkerAlt size={14} />
                        <span>{user.location}</span>
                      </div>
                      {company && (
                        <Link href={`/careerlink/company/${user.currentCompany}`}>
                          <div className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 cursor-pointer">
                            <FaBuilding size={14} />
                            <span>{company.name}</span>
                          </div>
                        </Link>
                      )}
                      <div className="text-blue-600 cursor-pointer hover:text-blue-800">
                        {user.connections.toLocaleString()} connections
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                {!isOwnProfile && (
                  <div className="flex items-center space-x-3 mt-4 lg:mt-0 relative z-10">
                    <button
                      onClick={handleConnect}
                      disabled={connectionStatus === 'connected' || connectionStatus === 'pending'}
                      className={`
                        flex items-center space-x-2 px-6 py-3 rounded-lg text-sm font-medium transition-colors
                        ${connectionStatus === 'connected' 
                          ? 'bg-gray-100 text-gray-600 cursor-default'
                          : connectionStatus === 'pending'
                          ? 'bg-gray-100 text-gray-600 cursor-default'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                        }
                      `}
                    >
                      {connectionStatus === 'connected' ? (
                        <>
                          <FaUserCheck size={16} />
                          <span>Connected</span>
                        </>
                      ) : connectionStatus === 'pending' ? (
                        <>
                          <FaUserPlus size={16} />
                          <span>Pending</span>
                        </>
                      ) : (
                        <>
                          <FaUserPlus size={16} />
                          <span>Connect</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleMessage}
                      className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors flex items-center space-x-2"
                    >
                      <FaEnvelope size={16} />
                      <span>Message</span>
                    </button>

                    <div className="relative">
                      <button
                        onClick={() => setShowMoreOptions(!showMoreOptions)}
                        className="border border-gray-300 text-gray-600 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <FaEllipsisH size={16} />
                      </button>
                      {showMoreOptions && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-10">
                          <button onClick={() => { navigator.clipboard?.writeText(window.location.href); setShowMoreOptions(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Copy profile link</button>
                          <button onClick={() => setShowMoreOptions(false)} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Report profile</button>
                          <button onClick={() => setShowMoreOptions(false)} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Block member</button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {isOwnProfile && (
                  <div className="flex items-center space-x-3 mt-4 lg:mt-0 relative z-10">
                    <button
                      onClick={handleEditProfile}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <FaEdit size={16} />
                      <span>Edit profile</span>
                    </button>
                    <div className="relative">
                      <button
                        onClick={() => setShowAddSection(!showAddSection)}
                        className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors"
                      >
                        Add section
                      </button>
                      {showAddSection && (
                        <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-10">
                          {['Experience', 'Education', 'Skills', 'Certifications', 'Languages', 'Volunteer'].map(section => (
                            <button key={section} onClick={() => setShowAddSection(false)} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                              <FaPlus size={10} className="text-blue-600" /> Add {section}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Summary */}
              {user.summary && (
                <div className="mt-6">
                  <p className="text-gray-700 leading-relaxed">{user.summary}</p>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Experience */}
              {user.experience && user.experience.length > 0 && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Experience</h2>
                    {isOwnProfile && (
                      <button className="text-gray-600 hover:text-blue-600">
                        <FaPlus size={16} />
                      </button>
                    )}
                  </div>
                  <div className="space-y-6">
                    {user.experience.map((exp) => (
                      <div key={exp.id} className="relative">
                        <div className="flex items-start space-x-4">
                          {exp.companyId && (
                            <img
                              src={getCompanyById(exp.companyId)?.logo || 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=100&h=100&fit=crop'}
                              alt={exp.company}
                              className="w-12 h-12 rounded object-cover flex-shrink-0"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-gray-900">{exp.title}</h3>
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="text-blue-600 font-medium">{exp.company}</span>
                              {exp.current && (
                                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                  Current
                                </span>
                              )}
                            </div>
                            <p className="text-gray-600 text-sm mb-2">
                              {exp.startDate} - {exp.current ? 'Present' : exp.endDate} • {exp.location}
                            </p>
                            {exp.description && (
                              <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                            )}
                          </div>
                          {isOwnProfile && (
                            <button className="text-gray-400 hover:text-gray-600">
                              <FaEdit size={14} />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {user.education && user.education.length > 0 && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Education</h2>
                    {isOwnProfile && (
                      <button className="text-gray-600 hover:text-blue-600">
                        <FaPlus size={16} />
                      </button>
                    )}
                  </div>
                  <div className="space-y-6">
                    {user.education.map((edu) => (
                      <div key={edu.id} className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                          <FaGraduationCap className="text-blue-600" size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900">{edu.school}</h3>
                          <p className="text-gray-700 mb-1">{edu.degree} in {edu.field}</p>
                          <p className="text-gray-600 text-sm">
                            {edu.startDate} - {edu.endDate}
                          </p>
                          {edu.grade && (
                            <p className="text-gray-600 text-sm">Grade: {edu.grade}</p>
                          )}
                        </div>
                        {isOwnProfile && (
                          <button className="text-gray-400 hover:text-gray-600">
                            <FaEdit size={14} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Activity/Posts */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Activity</h2>
                {userPosts.length > 0 ? (
                  <div className="space-y-4">
                    {userPosts.map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-600">No recent activity</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Skills */}
              {user.skills && user.skills.length > 0 && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
                    {isOwnProfile && (
                      <button className="text-gray-600 hover:text-blue-600">
                        <FaPlus size={16} />
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {user.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Languages */}
              {user.languages && user.languages.length > 0 && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Languages</h3>
                    {isOwnProfile && (
                      <button className="text-gray-600 hover:text-blue-600">
                        <FaPlus size={16} />
                      </button>
                    )}
                  </div>
                  <div className="space-y-3">
                    {user.languages.map((lang, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <FaLanguage className="text-gray-400" size={16} />
                          <span className="text-gray-900">{lang.name}</span>
                        </div>
                        <span className="text-gray-600 text-sm">{lang.proficiency}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications */}
              {user.certifications && user.certifications.length > 0 && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Certifications</h3>
                    {isOwnProfile && (
                      <button className="text-gray-600 hover:text-blue-600">
                        <FaPlus size={16} />
                      </button>
                    )}
                  </div>
                  <div className="space-y-3">
                    {user.certifications.map((cert, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <FaAward className="text-yellow-500 mt-1" size={16} />
                        <div>
                          <h4 className="font-medium text-gray-900">{cert.name}</h4>
                          <p className="text-gray-600 text-sm">{cert.issuer}</p>
                          <p className="text-gray-500 text-xs">{formatDate(cert.date)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Volunteer Experience */}
              {user.volunteer && user.volunteer.length > 0 && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Volunteer Experience</h3>
                    {isOwnProfile && (
                      <button className="text-gray-600 hover:text-blue-600">
                        <FaPlus size={16} />
                      </button>
                    )}
                  </div>
                  <div className="space-y-3">
                    {user.volunteer.map((vol, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <FaHeart className="text-red-500 mt-1" size={16} />
                        <div>
                          <h4 className="font-medium text-gray-900">{vol.role}</h4>
                          <p className="text-blue-600 text-sm">{vol.organization}</p>
                          <p className="text-gray-600 text-sm">{vol.startDate} - Present</p>
                          {vol.description && (
                            <p className="text-gray-700 text-sm mt-1">{vol.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowEditProfile(false)} />
            <div className="relative bg-white rounded-2xl max-w-lg w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Edit profile</h2>
                <button onClick={() => setShowEditProfile(false)} className="p-2 hover:bg-gray-100 rounded-full">
                  <FaTimes size={18} className="text-gray-500" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Headline</label>
                  <input
                    type="text"
                    value={editForm.headline || ''}
                    onChange={e => setEditForm(f => ({ ...f, headline: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={editForm.location || ''}
                    onChange={e => setEditForm(f => ({ ...f, location: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">About</label>
                  <textarea
                    value={editForm.summary || ''}
                    onChange={e => setEditForm(f => ({ ...f, summary: e.target.value }))}
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setShowEditProfile(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:border-gray-400 transition-colors">Cancel</button>
                <button
                  onClick={handleSaveProfile}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  {editSaved ? 'Saved!' : 'Save changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
