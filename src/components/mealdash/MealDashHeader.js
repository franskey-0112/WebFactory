import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  FaSearch, 
  FaMapMarkerAlt, 
  FaShoppingCart, 
  FaUser, 
  FaBars,
  FaTimes,
  FaHome,
  FaUtensils,
  FaHistory,
  FaHeart
} from 'react-icons/fa';

const MealDashHeader = ({ cartItemCount = 0 }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [orderMode, setOrderMode] = useState('delivery');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/mealdash/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const currentAddress = "2109 NE Wyoming St"; // This would come from user's selected address

  const navItems = [
    { 
      id: 'home', 
      name: 'Home', 
      href: '/mealdash', 
      icon: FaHome,
      active: router.pathname === '/mealdash'
    },
    {
      id: 'grocery',
      name: 'Grocery',
      href: '/mealdash/search?q=grocery',
      icon: FaUtensils,
      active: false
    }
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <Link href="/mealdash">
              <div className="flex items-center cursor-pointer">
                <div className="text-2xl font-bold text-red-500">
                  MealDash
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link key={item.id} href={item.href}>
                    <div className={`
                      flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer
                      ${item.active 
                        ? 'text-red-600 bg-red-50' 
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                      }
                    `}>
                      <IconComponent className="text-sm" />
                      <span>{item.name}</span>
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Search and Location */}
          <div className="hidden md:flex items-center space-x-4 flex-1 max-w-3xl mx-6">
            {/* Location Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
                className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <FaMapMarkerAlt className="text-red-500" />
                <span className="text-sm font-medium text-gray-900 truncate max-w-40">
                  {currentAddress}
                </span>
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isLocationDropdownOpen && (
                <div className="absolute top-full mt-1 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Choose a delivery address</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                        <FaMapMarkerAlt className="text-red-500" />
                        <div>
                          <div className="font-medium">2109 NE Wyoming St</div>
                          <div className="text-sm text-gray-600">Current location</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                        <FaHome className="text-gray-400" />
                        <div>
                          <div className="font-medium">Add a new address</div>
                          <div className="text-sm text-gray-600">Get food delivered to you</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex-1 min-w-0">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search restaurants, cuisines, or dishes"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent min-w-0"
                />
              </div>
            </form>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Delivery/Pickup Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setOrderMode('delivery')}
                  className={`px-3 py-1 text-sm font-medium rounded transition-colors ${orderMode === 'delivery' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  Delivery
                </button>
                <button
                  onClick={() => setOrderMode('pickup')}
                  className={`px-3 py-1 text-sm font-medium rounded transition-colors ${orderMode === 'pickup' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  Pickup
                </button>
              </div>

              {/* Cart */}
              <Link href="/mealdash/cart">
                <div className="relative cursor-pointer p-2 hover:bg-gray-50 rounded-lg">
                  <FaShoppingCart className="text-xl text-gray-700" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </div>
              </Link>

              {/* Sign In */}
              <Link href="/mealdash/signin">
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium">
                  Sign In
                </button>
              </Link>

              {/* Sign Up */}
              <Link href="/mealdash/signup">
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                  Sign Up
                </button>
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

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch} className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search MealDash"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </form>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white py-4">
            {/* Mobile Navigation */}
            <div className="space-y-2 mb-4">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link key={item.id} href={item.href}>
                    <div className={`
                      flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-colors cursor-pointer
                      ${item.active 
                        ? 'text-red-600 bg-red-50' 
                        : 'text-gray-700 hover:bg-gray-50'
                      }
                    `}>
                      <IconComponent className="text-lg" />
                      <span>{item.name}</span>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Mobile Actions */}
            <div className="space-y-3 px-4 border-t border-gray-200 pt-4">
              <Link href="/mealdash/cart">
                <div className="flex items-center space-x-3 py-2 text-gray-700 hover:text-gray-900">
                  <FaShoppingCart />
                  <span>Cart ({cartItemCount})</span>
                </div>
              </Link>
              <Link href="/mealdash/orders">
                <div className="flex items-center space-x-3 py-2 text-gray-700 hover:text-gray-900">
                  <FaHistory />
                  <span>Orders</span>
                </div>
              </Link>
              <Link href="/mealdash/favorites">
                <div className="flex items-center space-x-3 py-2 text-gray-700 hover:text-gray-900">
                  <FaHeart />
                  <span>Favorites</span>
                </div>
              </Link>
              <Link href="/mealdash/signin">
                <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors font-medium">
                  Sign In
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default MealDashHeader;
