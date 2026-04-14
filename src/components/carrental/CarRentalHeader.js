import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  FaCar, 
  FaUser, 
  FaPhone, 
  FaQuestionCircle,
  FaBars,
  FaTimes,
  FaMapMarkerAlt,
  FaCog
} from 'react-icons/fa';

const CarRentalHeader = ({ currentPage = 'home' }) => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const navigationItems = [
    { label: 'Home', href: '/carrental', id: 'home' },
    { label: 'Vehicle Fleet', href: '/carrental/fleet', id: 'fleet' },
    { label: 'Locations', href: '/carrental/locations', id: 'locations' },
    { label: 'Offers', href: '/carrental/offers', id: 'offers' }
  ];

  return (
    <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          
          {/* Logo */}
          <Link href="/carrental" className="flex items-center space-x-3">
            <div className="bg-orange-500 p-2 rounded-lg">
              <FaCar className="text-white text-2xl" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">CarRental</div>
              <div className="text-xs text-gray-500 hidden sm:block">Your Journey Starts Here</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`text-sm font-medium transition-colors relative ${
                  currentPage === item.id
                    ? 'text-orange-600 border-b-2 border-orange-600'
                    : 'text-gray-700 hover:text-orange-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            
            {/* Help & Support */}
            <div className="hidden md:flex items-center space-x-4">
              <a
                href="tel:1-800-CAR-RENT"
                className="flex items-center space-x-2 text-sm text-gray-600 hover:text-orange-600 transition-colors"
              >
                <FaPhone className="text-xs" />
                <span>1-800-CAR-RENT</span>
              </a>
              
              <Link href="/amazon/customer-service" className="flex items-center space-x-1 text-sm text-gray-600 hover:text-orange-600 transition-colors">
                <FaQuestionCircle className="text-xs" />
                <span>Help</span>
              </Link>
            </div>

            {/* User Account */}
            <div className="relative">
              <button
                onClick={toggleUserMenu}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <FaUser className="text-gray-600 text-sm" />
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-xs text-gray-500">Hello, Guest</div>
                  <div className="text-sm font-medium text-gray-900">My Account</div>
                </div>
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsUserMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                    <div className="p-4 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">Account</p>
                      <p className="text-xs text-gray-500">Sign in to access your bookings</p>
                    </div>
                    
                    <div className="py-2">
                      <Link
                        href="/carrental/search"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/carrental/search"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Create Account
                      </Link>
                      <hr className="my-2" />
                      <Link
                        href="/carrental/booking"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        My Bookings
                      </Link>
                      <Link
                        href="/carrental"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Profile Settings
                      </Link>
                      <hr className="my-2" />
                      <Link
                        href="/amazon/customer-service"
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Customer Support
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="text-gray-600 text-lg" />
              ) : (
                <FaBars className="text-gray-600 text-lg" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <nav className="space-y-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`block text-sm font-medium py-2 transition-colors ${
                    currentPage === item.id
                      ? 'text-orange-600 font-semibold'
                      : 'text-gray-700 hover:text-orange-600'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              <hr className="my-4" />
              
              <div className="space-y-4">
                <a
                  href="tel:1-800-CAR-RENT"
                  className="flex items-center space-x-3 text-sm text-gray-600 hover:text-orange-600 transition-colors"
                >
                  <FaPhone />
                  <span>1-800-CAR-RENT</span>
                </a>
                
                <button className="flex items-center space-x-3 text-sm text-gray-600 hover:text-orange-600 transition-colors">
                  <FaQuestionCircle />
                  <span>Help & Support</span>
                </button>
                
                <Link
                  href="/carrental/locations"
                  className="flex items-center space-x-3 text-sm text-gray-600 hover:text-orange-600 transition-colors"
                >
                  <FaMapMarkerAlt />
                  <span>Find Locations</span>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Quick Info Bar */}
      <div className="bg-orange-50 border-t border-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-2 text-sm">
            <div className="flex items-center space-x-6 text-orange-800">
              <span className="flex items-center">
                ✅ <span className="ml-1">Free Cancellation</span>
              </span>
              <span className="flex items-center">
                🚗 <span className="ml-1">Over 50+ Locations</span>
              </span>
              <span className="flex items-center">
                ⭐ <span className="ml-1">4.8/5 Customer Rating</span>
              </span>
              <span className="flex items-center">
                📞 <span className="ml-1">24/7 Support</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CarRentalHeader;
