import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  FaSearch, 
  FaHome, 
  FaUsers, 
  FaBriefcase, 
  FaCommentDots, 
  FaBell, 
  FaUser,
  FaBars,
  FaTimes
} from 'react-icons/fa';

const CareerLinkHeader = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/careerlink/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const navItems = [
    { 
      id: 'home', 
      name: 'Home', 
      href: '/careerlink', 
      icon: FaHome,
      active: router.pathname === '/careerlink'
    },
    { 
      id: 'network', 
      name: 'My Network', 
      href: '/careerlink/network', 
      icon: FaUsers,
      active: router.pathname.startsWith('/careerlink/network')
    },
    { 
      id: 'jobs', 
      name: 'Jobs', 
      href: '/careerlink/jobs', 
      icon: FaBriefcase,
      active: router.pathname.startsWith('/careerlink/jobs')
    },
    { 
      id: 'messaging', 
      name: 'Messaging', 
      href: '/careerlink/messaging', 
      icon: FaCommentDots,
      active: router.pathname.startsWith('/careerlink/messaging')
    },
    { 
      id: 'notifications', 
      name: 'Notifications', 
      href: '/careerlink/notifications', 
      icon: FaBell,
      active: router.pathname.startsWith('/careerlink/notifications')
    }
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo and Search */}
          <div className="flex items-center space-x-4">
            {/* Logo */}
            <Link href="/careerlink">
              <div className="flex items-center cursor-pointer">
                <div className="w-8 h-8 bg-blue-600 rounded text-white flex items-center justify-center font-bold text-sm">
                  CL
                </div>
              </div>
            </Link>

            {/* Search Bar */}
            <div className="hidden md:block">
              <form onSubmit={handleSearch} className="relative">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-md focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </form>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link key={item.id} href={item.href}>
                  <div className={`
                    flex flex-col items-center px-3 py-2 text-xs font-medium transition-colors cursor-pointer
                    ${item.active 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-600 hover:text-gray-900'
                    }
                  `}>
                    <IconComponent className="text-lg mb-1" />
                    <span>{item.name}</span>
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Profile Menu */}
            <div className="hidden md:flex items-center space-x-2">
              <Link href="/careerlink/profile/sarah-chen">
                <div className="flex items-center space-x-2 cursor-pointer group">
                  <img
                    src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=32&h=32&fit=crop"
                    alt="Profile"
                    className="w-6 h-6 rounded-full"
                  />
                  <div className="flex flex-col items-center">
                    <FaUser className="text-xs text-gray-600 group-hover:text-gray-900" />
                    <span className="text-xs font-medium text-gray-600 group-hover:text-gray-900">Me</span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 hover:text-gray-900 p-2"
              >
                {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            {/* Mobile Search */}
            <div className="px-4 py-3 border-b border-gray-200">
              <form onSubmit={handleSearch} className="relative">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-md focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </form>
            </div>

            {/* Mobile Navigation */}
            <div className="py-2">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link key={item.id} href={item.href}>
                    <div className={`
                      flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-colors cursor-pointer
                      ${item.active 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-gray-700 hover:bg-gray-50'
                      }
                    `}>
                      <IconComponent className="text-lg" />
                      <span>{item.name}</span>
                    </div>
                  </Link>
                );
              })}
              
              {/* Mobile Profile */}
              <Link href="/careerlink/profile/sarah-chen">
                <div className="flex items-center space-x-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer border-t border-gray-200">
                  <img
                    src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=32&h=32&fit=crop"
                    alt="Profile"
                    className="w-6 h-6 rounded-full"
                  />
                  <span>My Profile</span>
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default CareerLinkHeader;
