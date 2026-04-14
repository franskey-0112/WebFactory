import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  FaHotel, 
  FaUser, 
  FaGlobe, 
  FaBars, 
  FaTimes,
  FaHeart,
  FaCar,
  FaPlane,
  FaUmbrellaBeach,
  FaSearch
} from 'react-icons/fa';

const HotelHeader = () => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navigationItems = [
    { 
      label: 'Hotels', 
      href: '/hotels', 
      icon: <FaHotel className="h-4 w-4" />,
      active: router.pathname.startsWith('/hotels')
    },
    {
      label: 'Flights',
      href: '/flights',
      icon: <FaPlane className="h-4 w-4" />,
      active: router.pathname.startsWith('/flights')
    },
    {
      label: 'Cars',
      href: '/carrental',
      icon: <FaCar className="h-4 w-4" />,
      active: router.pathname.startsWith('/carrental')
    },
    {
      label: 'Attractions',
      href: '/masterticket',
      icon: <FaUmbrellaBeach className="h-4 w-4" />,
      active: router.pathname.startsWith('/masterticket')
    }
  ];

  return (
    <header className="bg-blue-800 shadow-lg relative z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/hotels" className="flex items-center space-x-3">
            <div className="bg-white rounded-lg p-2">
              <FaHotel className="h-8 w-8 text-blue-800" />
            </div>
            <div className="text-white">
              <h1 className="text-2xl font-bold">HotelBooker</h1>
              <p className="text-xs text-blue-100">Find Your Perfect Stay</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                  item.active
                    ? 'bg-blue-700 text-white'
                    : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                }`}
                data-testid={`nav-${item.label.toLowerCase()}`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Currency/Language */}
            <Link href="/hotels" className="flex items-center space-x-1 text-blue-100 hover:text-white transition-colors">
              <FaGlobe className="h-4 w-4" />
              <span className="text-sm">USD</span>
            </Link>

            {/* Wishlist */}
            <Link
              href="/hotels/search"
              className="flex items-center space-x-1 text-blue-100 hover:text-white transition-colors"
              data-testid="wishlist-link"
            >
              <FaHeart className="h-4 w-4" />
              <span className="text-sm">Wishlist</span>
            </Link>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                data-testid="user-menu-button"
              >
                <FaUser className="h-4 w-4" />
                <span className="font-medium">Account</span>
              </button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border">
                  <Link
                    href="/staybnb/account"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                    data-testid="login-link"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/staybnb/account"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                    data-testid="register-link"
                  >
                    Create Account
                  </Link>
                  <hr className="my-2" />
                  <Link
                    href="/staybnb/trips"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                  >
                    My Bookings
                  </Link>
                  <Link
                    href="/careerlink/profile/sarah-chen"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                  >
                    My Profile
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2"
            data-testid="mobile-menu-button"
          >
            {isMobileMenuOpen ? (
              <FaTimes className="h-6 w-6" />
            ) : (
              <FaBars className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-blue-700">
            {/* Mobile Navigation */}
            <nav className="space-y-2 mb-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    item.active
                      ? 'bg-blue-700 text-white'
                      : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Mobile Account */}
            <div className="border-t border-blue-700 pt-4 space-y-2">
              <Link
                href="/login"
                className="flex items-center space-x-3 px-4 py-3 text-blue-100 hover:bg-blue-700 hover:text-white rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FaUser className="h-4 w-4" />
                <span>Sign In</span>
              </Link>
              <Link
                href="/hotels/wishlist"
                className="flex items-center space-x-3 px-4 py-3 text-blue-100 hover:bg-blue-700 hover:text-white rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FaHeart className="h-4 w-4" />
                <span>Wishlist</span>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Search Bar for Hotel Pages */}
      {router.pathname.startsWith('/hotels') && router.pathname !== '/hotels' && (
        <div className="bg-blue-700 border-t border-blue-600">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center max-w-md">
              <div className="relative flex-1">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search hotels..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border-0 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                  data-testid="header-search-input"
                />
              </div>
              <button
                className="ml-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                data-testid="header-search-button"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default HotelHeader; 