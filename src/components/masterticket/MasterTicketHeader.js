import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaSearch, FaTicketAlt, FaUser, FaHeart, FaBars, FaTimes } from 'react-icons/fa';

const MasterTicketHeader = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/masterticket/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const navItems = [
    { name: 'Concerts', href: '/masterticket/search?category=concerts' },
    { name: 'Sports', href: '/masterticket/search?category=sports' },
    { name: 'Theater', href: '/masterticket/search?category=theater' },
    { name: 'Comedy', href: '/masterticket/search?category=comedy' },
    { name: 'Family', href: '/masterticket/search?category=family' },
    { name: 'More', href: '/masterticket/search' }
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-blue-900 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex space-x-4">
              <span>📱 Download the MasterTicket App</span>
              <span>🎫 Gift Cards Available</span>
            </div>
            <div className="flex space-x-4">
              <Link href="/amazon/customer-service" className="hover:text-blue-200">Help</Link>
              <Link href="/masterticket/search" className="hover:text-blue-200">Sell</Link>
              <Link href="/careerlink/profile/sarah-chen" className="hover:text-blue-200">Sign In</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/masterticket">
              <div className="flex items-center cursor-pointer">
                <FaTicketAlt className="text-blue-600 text-2xl mr-2" />
                <span className="text-2xl font-bold text-blue-600">MasterTicket</span>
              </div>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search for artists, events, venues, or sports teams"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 pr-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
              >
                Search
              </button>
            </form>
          </div>

          {/* Right Menu */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link href="/masterticket/search" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
              <FaHeart />
              <span>Favorites</span>
            </Link>
            <Link href="/careerlink/profile/sarah-chen" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
              <FaUser />
              <span>Account</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex border-t border-gray-200">
          <div className="flex space-x-8">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <span className="py-4 px-1 border-b-2 border-transparent text-gray-700 hover:text-blue-600 hover:border-blue-600 transition-colors cursor-pointer">
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </form>

            {/* Mobile Navigation */}
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link key={item.name} href={item.href}>
                  <span className="block py-2 text-gray-700 hover:text-blue-600 cursor-pointer">
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>

            {/* Mobile Account Links */}
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
                <FaHeart />
                <span>Favorites</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
                <FaUser />
                <span>Account</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default MasterTicketHeader;
