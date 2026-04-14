import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { FaSearch, FaMinus, FaPlus } from 'react-icons/fa';

const SearchForm = ({ initialData = {}, onSearch, className = '' }) => {
  const router = useRouter();
  const [searchData, setSearchData] = useState({
    destination: initialData.destination || '',
    checkIn: initialData.checkIn || '',
    checkOut: initialData.checkOut || '',
    adults: initialData.adults || 1,
    children: initialData.children || 0,
    infants: initialData.infants || 0,
    pets: initialData.pets || 0
  });

  const [isGuestMenuOpen, setIsGuestMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    if (searchData.destination) params.set('destination', searchData.destination);
    if (searchData.checkIn) params.set('checkIn', searchData.checkIn);
    if (searchData.checkOut) params.set('checkOut', searchData.checkOut);
    
    const totalGuests = searchData.adults + searchData.children;
    if (totalGuests > 1) params.set('guests', totalGuests.toString());
    
    if (onSearch) {
      onSearch(searchData);
    } else {
      router.push(`/staybnb/search?${params.toString()}`);
    }
  };

  const updateGuests = (type, operation) => {
    setSearchData(prev => {
      const newValue = operation === 'increase' 
        ? prev[type] + 1 
        : Math.max(0, prev[type] - 1);
      
      // Ensure at least 1 adult
      if (type === 'adults' && newValue < 1) return prev;
      
      return { ...prev, [type]: newValue };
    });
  };

  const getTotalGuests = () => {
    return searchData.adults + searchData.children;
  };

  const getGuestSummary = () => {
    const total = getTotalGuests();
    if (total === 1) return '1 guest';
    
    let summary = `${total} guests`;
    if (searchData.infants > 0) {
      summary += `, ${searchData.infants} infant${searchData.infants !== 1 ? 's' : ''}`;
    }
    if (searchData.pets > 0) {
      summary += `, ${searchData.pets} pet${searchData.pets !== 1 ? 's' : ''}`;
    }
    return summary;
  };

  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  return (
    <form onSubmit={handleSearch} className={`relative ${className}`}>
      <div className="bg-white rounded-2xl border border-gray-300 shadow-lg overflow-visible">
        <div className="grid grid-cols-1 md:grid-cols-4">
          {/* Where */}
          <div className="border-b md:border-b-0 md:border-r border-gray-300 p-4">
            <label className="block text-xs font-semibold text-gray-900 mb-1">
              Where
            </label>
            <input
              type="text"
              placeholder="Search destinations"
              value={searchData.destination}
              onChange={(e) => setSearchData({...searchData, destination: e.target.value})}
              className="w-full text-sm text-gray-700 placeholder-gray-400 border-0 p-0 focus:outline-none focus:ring-0"
            />
          </div>

          {/* Check in */}
          <div className="border-b md:border-b-0 md:border-r border-gray-300 p-4">
            <label className="block text-xs font-semibold text-gray-900 mb-1">
              Check in
            </label>
            <input
              type="date"
              value={searchData.checkIn}
              min={today}
              onChange={(e) => setSearchData({...searchData, checkIn: e.target.value})}
              className="w-full text-sm text-gray-700 border-0 p-0 focus:outline-none focus:ring-0"
            />
          </div>

          {/* Check out */}
          <div className="border-b md:border-b-0 md:border-r border-gray-300 p-4">
            <label className="block text-xs font-semibold text-gray-900 mb-1">
              Check out
            </label>
            <input
              type="date"
              value={searchData.checkOut}
              min={searchData.checkIn || tomorrow}
              onChange={(e) => setSearchData({...searchData, checkOut: e.target.value})}
              className="w-full text-sm text-gray-700 border-0 p-0 focus:outline-none focus:ring-0"
            />
          </div>

          {/* Who */}
          <div className="p-4 relative">
            <label className="block text-xs font-semibold text-gray-900 mb-1">
              Who
            </label>
            <button
              type="button"
              onClick={() => setIsGuestMenuOpen(!isGuestMenuOpen)}
              className="w-full text-left text-sm text-gray-700 focus:outline-none"
            >
              {getGuestSummary()}
            </button>

            {/* Guest Selection Dropdown */}
            {isGuestMenuOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-xl shadow-xl z-[9999] p-4 min-w-[320px]">
                {/* Adults */}
                <div className="flex items-center justify-between py-3">
                  <div>
                    <div className="font-medium text-gray-900">Adults</div>
                    <div className="text-sm text-gray-500">Ages 13 or above</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={() => updateGuests('adults', 'decrease')}
                      disabled={searchData.adults <= 1}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:border-gray-400"
                    >
                      <FaMinus className="h-3 w-3 text-gray-600" />
                    </button>
                    <span className="w-8 text-center font-medium text-gray-900">{searchData.adults}</span>
                    <button
                      type="button"
                      onClick={() => updateGuests('adults', 'increase')}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400"
                    >
                      <FaPlus className="h-3 w-3 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div className="flex items-center justify-between py-3 border-t border-gray-200">
                  <div>
                    <div className="font-medium text-gray-900">Children</div>
                    <div className="text-sm text-gray-500">Ages 2-12</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={() => updateGuests('children', 'decrease')}
                      disabled={searchData.children <= 0}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:border-gray-400"
                    >
                      <FaMinus className="h-3 w-3 text-gray-600" />
                    </button>
                    <span className="w-8 text-center font-medium text-gray-900">{searchData.children}</span>
                    <button
                      type="button"
                      onClick={() => updateGuests('children', 'increase')}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400"
                    >
                      <FaPlus className="h-3 w-3 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Infants */}
                <div className="flex items-center justify-between py-3 border-t border-gray-200">
                  <div>
                    <div className="font-medium text-gray-900">Infants</div>
                    <div className="text-sm text-gray-500">Under 2</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={() => updateGuests('infants', 'decrease')}
                      disabled={searchData.infants <= 0}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:border-gray-400"
                    >
                      <FaMinus className="h-3 w-3 text-gray-600" />
                    </button>
                    <span className="w-8 text-center font-medium text-gray-900">{searchData.infants}</span>
                    <button
                      type="button"
                      onClick={() => updateGuests('infants', 'increase')}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400"
                    >
                      <FaPlus className="h-3 w-3 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Pets */}
                <div className="flex items-center justify-between py-3 border-t border-gray-200">
                  <div>
                    <div className="font-medium text-gray-900">Pets</div>
                    <div className="text-sm text-gray-500">Bringing a service animal?</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={() => updateGuests('pets', 'decrease')}
                      disabled={searchData.pets <= 0}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:border-gray-400"
                    >
                      <FaMinus className="h-3 w-3 text-gray-600" />
                    </button>
                    <span className="w-8 text-center font-medium text-gray-900">{searchData.pets}</span>
                    <button
                      type="button"
                      onClick={() => updateGuests('pets', 'increase')}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400"
                    >
                      <FaPlus className="h-3 w-3 text-gray-600" />
                    </button>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setIsGuestMenuOpen(false)}
                    className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Search Button */}
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <button
            type="submit"
            className="w-full bg-rose-500 text-white py-3 rounded-lg hover:bg-rose-600 transition-colors font-medium flex items-center justify-center space-x-2"
          >
            <FaSearch className="h-4 w-4" />
            <span>Search</span>
          </button>
        </div>
      </div>

      {/* Overlay to close guest menu */}
      {isGuestMenuOpen && (
        <div 
          className="fixed inset-0 z-[9998] bg-black bg-opacity-20"
          onClick={() => setIsGuestMenuOpen(false)}
        />
      )}
    </form>
  );
};

export default SearchForm;
