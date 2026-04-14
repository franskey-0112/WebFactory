import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaSearch, FaBuilding, FaBars, FaTimes } from 'react-icons/fa';
import { getSearchSuggestions } from '../../utils/companyCheckData';

const CompanyCheckHeader = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.length >= 2) {
      const searchSuggestions = getSearchSuggestions(query);
      setSuggestions(searchSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/companycheck/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (suggestion.type === 'company') {
      router.push(`/companycheck/company/${suggestion.id}`);
    } else if (suggestion.type === 'position') {
      router.push(`/companycheck/search?q=${encodeURIComponent(suggestion.value)}`);
    }
    setSearchQuery('');
    setShowSuggestions(false);
  };

  const navItems = [
    { name: 'Companies', href: '/companycheck' },
    { name: 'Salaries', href: '/companycheck/salaries' },
    { name: 'Reviews', href: '/companycheck/reviews' },
    { name: 'Interviews', href: '/companycheck/interviews' },
    { name: 'Jobs', href: '/companycheck/jobs' }
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/companycheck">
              <div className="flex items-center space-x-2 cursor-pointer">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <FaBuilding className="text-white text-xl" />
                </div>
                <span className="text-2xl font-bold text-gray-900">CompanyCheck</span>
              </div>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8 relative">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search companies, jobs, or salaries..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                  className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md"
                >
                  <FaSearch className="text-sm" />
                </button>
              </div>
            </form>

            {/* Search Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        suggestion.type === 'company' ? 'bg-blue-500' : 'bg-green-500'
                      }`}></div>
                      <div>
                        <div className="font-medium text-gray-900">{suggestion.value}</div>
                        <div className="text-sm text-gray-500">{suggestion.subtitle}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <span className={`text-gray-700 hover:text-blue-600 font-medium cursor-pointer ${
                  router.pathname === item.href ? 'text-blue-600' : ''
                }`}>
                  {item.name}
                </span>
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-blue-600 p-2"
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link key={item.name} href={item.href}>
                  <span
                    className={`text-gray-700 hover:text-blue-600 font-medium cursor-pointer block px-4 py-2 ${
                      router.pathname === item.href ? 'text-blue-600 bg-blue-50' : ''
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default CompanyCheckHeader;
