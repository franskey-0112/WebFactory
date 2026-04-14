import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  FaSearch, 
  FaShoppingCart, 
  FaBars, 
  FaMapMarkerAlt,
  FaCaretDown
} from 'react-icons/fa';
import { categories, searchSuggestions } from '../../data/amazonData';

const AmazonHeader = ({ cartItemCount = 0 }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);

  // 处理搜索建议
  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = searchSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 10);
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  // 点击外部关闭搜索建议
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 处理搜索提交
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/amazon/search?q=${encodeURIComponent(searchQuery.trim())}&category=${selectedCategory}`);
      setShowSuggestions(false);
      searchInputRef.current?.blur();
    }
  };

  // 处理建议点击
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    router.push(`/amazon/search?q=${encodeURIComponent(suggestion)}&category=${selectedCategory}`);
  };

  return (
    <header className="amazon-header">
      {/* Main Header Bar */}
      <div style={{ backgroundColor: '#131921' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          padding: '8px 12px',
          maxWidth: '1500px',
          margin: '0 auto'
        }}>
            {/* Logo */}
          <Link 
            href="/amazon" 
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px 8px',
              border: '1px solid transparent',
              borderRadius: '2px',
              marginRight: '12px',
              textDecoration: 'none'
            }}
            className="amazon-logo-link"
          >
            <span style={{
              fontFamily: 'Amazon Ember, Arial, sans-serif',
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'white',
              letterSpacing: '-0.5px'
            }}>
              amazon<span style={{ color: '#ff9900' }}>.com</span>
            </span>
            </Link>

          {/* Delivery Location */}
          <div 
            className="hidden lg:flex"
            style={{
              display: 'none',
              alignItems: 'flex-end',
              padding: '8px 10px',
              border: '1px solid transparent',
              borderRadius: '2px',
              cursor: 'pointer',
              marginRight: '12px',
            }}
            onMouseEnter={(e) => e.currentTarget.style.border = '1px solid white'}
            onMouseLeave={(e) => e.currentTarget.style.border = '1px solid transparent'}
          >
            <FaMapMarkerAlt style={{ color: 'white', fontSize: '16px', marginRight: '2px' }} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '12px', color: '#ccc', lineHeight: 1 }}>Deliver to</span>
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: 'white', lineHeight: 1.2 }}>New York 10001</span>
              </div>
            </div>

          {/* Search Bar */}
          <div 
            ref={searchContainerRef}
            style={{ 
              flex: 1, 
              display: 'flex', 
              maxWidth: '800px',
              margin: '0 8px',
              position: 'relative'
            }}
          >
            <form onSubmit={handleSearch} style={{ display: 'flex', width: '100%' }}>
              {/* Category Dropdown */}
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  backgroundColor: '#e6e6e6',
                  border: 'none',
                  borderRadius: '4px 0 0 4px',
                  padding: '0 8px',
                  fontSize: '12px',
                  color: '#555',
                  cursor: 'pointer',
                  minWidth: '55px',
                  outline: 'none',
                  height: '40px'
                }}
                    data-testid="category-selector"
                  >
                <option value="all">All</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>

              {/* Search Input */}
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => searchQuery && setShowSuggestions(true)}
                    placeholder="Search Amazon"
                style={{
                  flex: 1,
                  border: 'none',
                  padding: '0 12px',
                  fontSize: '15px',
                  outline: 'none',
                  height: '40px',
                  minWidth: '200px'
                }}
                    data-testid="search-input"
                  />

              {/* Search Button */}
              <button
                type="submit"
                style={{
                  backgroundColor: '#febd69',
                  border: 'none',
                  borderRadius: '0 4px 4px 0',
                  padding: '0 12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '40px'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3a847'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#febd69'}
                data-testid="search-button"
              >
                <FaSearch style={{ fontSize: '20px', color: '#131921' }} />
              </button>
            </form>

            {/* Search Suggestions */}
                  {showSuggestions && filteredSuggestions.length > 0 && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: '55px',
                right: 0,
                backgroundColor: 'white',
                border: '1px solid #ddd',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                zIndex: 100,
                maxHeight: '400px',
                overflowY: 'auto'
              }}>
                      {filteredSuggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                    style={{
                      padding: '10px 12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: '14px',
                      color: '#0f1111',
                      borderBottom: '1px solid #f0f0f0'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f3f3'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                        >
                    <FaSearch style={{ marginRight: '12px', color: '#767676', fontSize: '12px' }} />
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

          {/* Right Side Items */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* Language Selector */}
            <Link
              href="/amazon/language"
              className="hidden lg:flex"
              style={{
                display: 'none',
                alignItems: 'center',
                padding: '10px 8px',
                border: '1px solid transparent',
                borderRadius: '2px',
                cursor: 'pointer',
                marginRight: '4px',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => e.currentTarget.style.border = '1px solid white'}
              onMouseLeave={(e) => e.currentTarget.style.border = '1px solid transparent'}
            >
              <span style={{ fontSize: '13px', fontWeight: 'bold', color: 'white' }}>EN</span>
              <FaCaretDown style={{ fontSize: '10px', color: '#ccc', marginLeft: '2px' }} />
            </Link>

            {/* Account & Lists */}
            <div
              className="hidden lg:flex"
              style={{
                flexDirection: 'column',
                padding: '10px 8px',
                border: '1px solid transparent',
                borderRadius: '2px',
                cursor: 'pointer',
                lineHeight: 1
              }}
              onMouseEnter={(e) => e.currentTarget.style.border = '1px solid white'}
              onMouseLeave={(e) => e.currentTarget.style.border = '1px solid transparent'}
            >
              <Link href="/amazon/signin" style={{ fontSize: '12px', color: '#ccc', textDecoration: 'none' }}>
                Hello, sign in
              </Link>
              <Link
                href="/amazon/account"
                style={{ fontSize: '14px', fontWeight: 'bold', color: 'white', display: 'flex', alignItems: 'center', textDecoration: 'none' }}
              >
                  Account & Lists
                <FaCaretDown style={{ fontSize: '10px', marginLeft: '2px' }} />
              </Link>
            </div>

            {/* Returns & Orders */}
            <Link
              href="/amazon/orders"
              className="hidden lg:flex"
              style={{
                flexDirection: 'column',
                padding: '10px 8px',
                border: '1px solid transparent',
                borderRadius: '2px',
                cursor: 'pointer',
                textDecoration: 'none',
                lineHeight: 1
              }}
              onMouseEnter={(e) => e.currentTarget.style.border = '1px solid white'}
              onMouseLeave={(e) => e.currentTarget.style.border = '1px solid transparent'}
            >
              <span style={{ fontSize: '12px', color: '#ccc' }}>Returns</span>
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: 'white' }}>& Orders</span>
              </Link>

              {/* Cart */}
            <Link
              href="/amazon/cart"
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                padding: '10px 8px',
                border: '1px solid transparent',
                borderRadius: '2px',
                cursor: 'pointer',
                textDecoration: 'none',
                position: 'relative'
              }}
              onMouseEnter={(e) => e.currentTarget.style.border = '1px solid white'}
              onMouseLeave={(e) => e.currentTarget.style.border = '1px solid transparent'}
            >
              <div style={{ position: 'relative' }}>
                <FaShoppingCart style={{ fontSize: '28px', color: 'white' }} />
                <span style={{
                  position: 'absolute',
                  top: '-2px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: '#f08804',
                  color: '#131921',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  minWidth: '18px',
                  height: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '10px'
                }}>
                  {cartItemCount}
                    </span>
                </div>
              <span style={{ 
                fontSize: '14px', 
                fontWeight: 'bold', 
                color: 'white',
                marginLeft: '4px'
              }} className="hidden lg:inline">
                Cart
              </span>
              </Link>
          </div>
        </div>
      </div>

      {/* Secondary Navigation */}
      <div style={{ backgroundColor: '#232f3e' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0 12px',
          maxWidth: '1500px',
          margin: '0 auto'
        }}>
          {/* All Menu Button */}
          <Link
            href="/amazon/all"
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 10px',
              border: '1px solid transparent',
              borderRadius: '2px',
              background: 'transparent',
              color: 'white',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: 'pointer',
              textDecoration: 'none'
            }}
            onMouseEnter={(e) => e.currentTarget.style.border = '1px solid white'}
            onMouseLeave={(e) => e.currentTarget.style.border = '1px solid transparent'}
          >
            <FaBars style={{ marginRight: '6px', fontSize: '16px' }} />
              All
          </Link>
            
          {/* Navigation Links */}
          <nav style={{ display: 'flex', alignItems: 'center' }} className="hidden lg:flex">
            {[
              { label: "Today's Deals", href: '/amazon/todays-deals' },
              { label: 'Customer Service', href: '/amazon/customer-service' },
              { label: 'Registry', href: '/amazon/registry' },
              { label: 'Gift Cards', href: '/amazon/gift-cards' },
              { label: 'Sell', href: '/amazon/sell' }
            ].map((item, index) => (
              <Link
                key={index}
                href={item.href}
                style={{
                  padding: '8px 10px',
                  border: '1px solid transparent',
                  borderRadius: '2px',
                  color: 'white',
                  fontSize: '14px',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => e.currentTarget.style.border = '1px solid white'}
                onMouseLeave={(e) => e.currentTarget.style.border = '1px solid transparent'}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Promo Link */}
          <div style={{ marginLeft: 'auto' }} className="hidden lg:block">
            <Link
              href="/amazon/todays-deals?category=electronics"
              style={{
                color: 'white',
                fontSize: '13px',
                textDecoration: 'none',
                fontWeight: 'bold'
              }}
            >
              Shop deals in Electronics
            </Link>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .amazon-logo-link:hover {
          border: 1px solid white !important;
        }
        @media (min-width: 1024px) {
          .hidden.lg\\:flex {
            display: flex !important;
          }
          .hidden.lg\\:block {
            display: block !important;
          }
          .hidden.lg\\:inline {
            display: inline !important;
          }
        }
      `}</style>
    </header>
  );
};

export default AmazonHeader; 
