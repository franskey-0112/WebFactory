import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  FaSearch, 
  FaUserCircle, 
  FaBars, 
  FaGlobe,
  FaHeart,
  FaUser,
  FaSignOutAlt,
  FaHome
} from 'react-icons/fa';

const StaybnbHeader = ({ isSearchPage = false }) => {
  const router = useRouter();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchData, setSearchData] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 1
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchData.destination) params.set('destination', searchData.destination);
    if (searchData.checkIn) params.set('checkIn', searchData.checkIn);
    if (searchData.checkOut) params.set('checkOut', searchData.checkOut);
    if (searchData.guests > 1) params.set('guests', searchData.guests.toString());
    
    router.push(`/staybnb/search?${params.toString()}`);
  };

  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/staybnb" className="flex items-center space-x-2">
            <div className="text-2xl md:text-3xl font-bold text-rose-500">
              🏠 StayBnB
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          {!isSearchPage && (
            <div className="hidden md:flex items-center flex-1 max-w-2xl mx-8">
              <form onSubmit={handleSearch} className="w-full">
                <div className="flex items-center bg-white border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex-1 min-w-0">
                    <div className="flex">
                      {/* Where */}
                      <div className="flex-1 min-w-0">
                        <input
                          type="text"
                          placeholder="Where are you going?"
                          value={searchData.destination}
                          onChange={(e) => setSearchData({...searchData, destination: e.target.value})}
                          className="w-full px-4 py-3 text-sm font-medium text-gray-900 placeholder-gray-500 border-0 rounded-l-full focus:outline-none focus:ring-0"
                        />
                      </div>
                      
                      {/* Check in */}
                      <div className="border-l border-gray-300 flex-1 min-w-0">
                        <input
                          type="date"
                          value={searchData.checkIn}
                          min={today}
                          onChange={(e) => setSearchData({...searchData, checkIn: e.target.value})}
                          className="w-full px-4 py-3 text-sm font-medium text-gray-900 border-0 focus:outline-none focus:ring-0"
                        />
                      </div>
                      
                      {/* Check out */}
                      <div className="border-l border-gray-300 flex-1 min-w-0">
                        <input
                          type="date"
                          value={searchData.checkOut}
                          min={searchData.checkIn || tomorrow}
                          onChange={(e) => setSearchData({...searchData, checkOut: e.target.value})}
                          className="w-full px-4 py-3 text-sm font-medium text-gray-900 border-0 focus:outline-none focus:ring-0"
                        />
                      </div>
                      
                      {/* Guests */}
                      <div className="border-l border-gray-300 flex-1 min-w-0">
                        <select
                          value={searchData.guests}
                          onChange={(e) => setSearchData({...searchData, guests: parseInt(e.target.value)})}
                          className="w-full px-4 py-3 text-sm font-medium text-gray-900 border-0 focus:outline-none focus:ring-0"
                        >
                          {[...Array(16)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1} guest{i !== 0 ? 's' : ''}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  {/* Search Button */}
                  <button
                    type="submit"
                    className="p-2 m-2 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors"
                  >
                    <FaSearch className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Mobile Search Button */}
          {!isSearchPage && (
            <Link href="/staybnb/search" className="md:hidden flex items-center space-x-2 bg-white border border-gray-300 rounded-full px-4 py-2 shadow-sm">
              <FaSearch className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-500">Where to?</span>
            </Link>
          )}

          {/* Right side - Navigation */}
          <div className="flex items-center space-x-4">
            {/* Become a Host */}
            <Link 
              href="/staybnb/host" 
              className="hidden md:block text-sm font-medium text-gray-700 hover:text-gray-900 px-3 py-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              Become a Host
            </Link>

            {/* Language */}
            <Link
              href="/staybnb"
              title="Language & currency"
              className="hidden md:block p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FaGlobe className="h-4 w-4" />
            </Link>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 border border-gray-300 rounded-full px-3 py-2 hover:shadow-md transition-shadow"
              >
                <FaBars className="h-4 w-4 text-gray-600" />
                <FaUserCircle className="h-6 w-6 text-gray-600" />
              </button>

              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                  <Link 
                    href="/staybnb/account" 
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <FaUser className="h-4 w-4 mr-3" />
                    Account
                  </Link>
                  <Link 
                    href="/staybnb/trips" 
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <FaHome className="h-4 w-4 mr-3" />
                    Your trips
                  </Link>
                  <Link 
                    href="/staybnb/favorites" 
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <FaHeart className="h-4 w-4 mr-3" />
                    Wishlists
                  </Link>
                  <hr className="my-2" />
                  <Link 
                    href="/staybnb/host" 
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <FaHome className="h-4 w-4 mr-3" />
                    Become a Host
                  </Link>
                  <hr className="my-2" />
                  <button className="flex items-center w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50">
                    <FaSignOutAlt className="h-4 w-4 mr-3" />
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {!isSearchPage && (
        <div className="md:hidden px-4 pb-4">
          <form onSubmit={handleSearch}>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Where are you going?"
                value={searchData.destination}
                onChange={(e) => setSearchData({...searchData, destination: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
              />
              
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="date"
                  value={searchData.checkIn}
                  min={today}
                  onChange={(e) => setSearchData({...searchData, checkIn: e.target.value})}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                />
                <input
                  type="date"
                  value={searchData.checkOut}
                  min={searchData.checkIn || tomorrow}
                  onChange={(e) => setSearchData({...searchData, checkOut: e.target.value})}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                />
              </div>
              
              <select
                value={searchData.guests}
                onChange={(e) => setSearchData({...searchData, guests: parseInt(e.target.value)})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
              >
                {[...Array(16)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} guest{i !== 0 ? 's' : ''}
                  </option>
                ))}
              </select>
              
              <button
                type="submit"
                className="w-full bg-rose-500 text-white py-3 rounded-lg hover:bg-rose-600 transition-colors font-medium"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      )}
    </header>
  );
};

export default StaybnbHeader;
