import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import AmazonHeader from '../../components/amazon/AmazonHeader';
import { 
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaChevronLeft,
  FaChevronRight,
  FaHeart,
  FaRegHeart,
  FaBars
} from 'react-icons/fa';
import { 
  products, 
  categories, 
  searchProducts, 
  getProductsByCategory
} from '../../data/amazonData';

const AmazonSearchPage = () => {
  const router = useRouter();
  const { q: query, category: categoryFilter } = router.query;

  const [searchResults, setSearchResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(16);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // 筛选器状态
  const [filters, setFilters] = useState({
    priceRange: { min: '', max: '' },
    brands: [],
    rating: 0,
    primeOnly: false,
    freeShipping: false
  });

  // 排序选项
  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Avg. Customer Review' },
    { value: 'newest', label: 'Newest Arrivals' }
  ];

  // 快速价格选项
  const priceRanges = [
    { label: 'Under $25', min: '', max: '25' },
    { label: '$25 to $50', min: '25', max: '50' },
    { label: '$50 to $100', min: '50', max: '100' },
    { label: '$100 to $200', min: '100', max: '200' },
    { label: '$200 & Above', min: '200', max: '' }
  ];

  useEffect(() => {
    performSearch();
  }, [query, categoryFilter]);

  useEffect(() => {
    applyFiltersAndSort();
  }, [searchResults, filters, sortBy]);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('amazon-cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  }, []);

  const performSearch = () => {
    setLoading(true);
    
    let results = [];
    
    if (query) {
      results = searchProducts(query);
    } else if (categoryFilter && categoryFilter !== 'all') {
      results = getProductsByCategory(categoryFilter);
    } else {
      results = [...products];
    }

    setSearchResults(results);
    setCurrentPage(1);
    setLoading(false);
  };

  const applyFiltersAndSort = () => {
    let filtered = [...searchResults];

    // Price filter
    if (filters.priceRange.min !== '') {
      filtered = filtered.filter(product => product.price >= parseFloat(filters.priceRange.min));
    }
    if (filters.priceRange.max !== '') {
      filtered = filtered.filter(product => product.price <= parseFloat(filters.priceRange.max));
    }

    // Brand filter
    if (filters.brands.length > 0) {
      filtered = filtered.filter(product => filters.brands.includes(product.brand));
    }

    // Rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter(product => product.rating >= filters.rating);
    }

    // Prime filter
    if (filters.primeOnly) {
      filtered = filtered.filter(product => product.delivery?.prime);
    }

    // Free shipping filter
    if (filters.freeShipping) {
      filtered = filtered.filter(product => product.delivery?.freeShipping);
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id.localeCompare(a.id));
        break;
      default:
        break;
    }

    setFilteredResults(filtered);
  };

  const updateFilter = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    setCurrentPage(1);
  };

  const toggleBrand = (brand) => {
    setFilters(prev => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand]
    }));
    setCurrentPage(1);
  };

  const handleAddToCart = (product) => {
    try {
      const savedCart = localStorage.getItem('amazon-cart');
      let currentCart = savedCart ? JSON.parse(savedCart) : [];
      
      const existingItemIndex = currentCart.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        currentCart[existingItemIndex].quantity += 1;
      } else {
        currentCart.push({
          id: product.id,
          title: product.title,
          price: product.price,
          originalPrice: product.originalPrice,
          quantity: 1,
          image: product.images?.[0] || product.image,
          inStock: product.inStock,
          prime: product.delivery?.prime || false,
          seller: product.seller?.name || 'Amazon.com'
        });
      }
      
      localStorage.setItem('amazon-cart', JSON.stringify(currentCart));
      setCartItems(currentCart);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const toggleWishlist = (product) => {
    setWishlistItems(prev => {
      const isInWishlist = prev.some(item => item.id === product.id);
      if (isInWishlist) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  // Render stars
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} />);
    }
    if (hasHalf) {
      stars.push(<FaStarHalfAlt key="half" />);
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} />);
    }
    return stars;
  };

  // Format price
  const formatPrice = (price) => {
    const [whole, fraction] = price.toFixed(2).split('.');
    return { whole, fraction };
  };

  // Pagination
  const totalPages = Math.ceil(filteredResults.length / resultsPerPage);
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const currentResults = filteredResults.slice(startIndex, endIndex);

  // Get available brands
  const availableBrands = [...new Set(searchResults.map(product => product.brand).filter(Boolean))];

  // Get current category name
  const currentCategory = categories.find(cat => cat.id === categoryFilter);

  return (
    <>
      <Head>
        <title>
          {query ? `Amazon.com : ${query}` : currentCategory ? `${currentCategory.name} - Amazon.com` : 'Amazon.com'}
        </title>
        <meta name="description" content="Search results on Amazon.com" />
      </Head>

      <div className="amazon-search-page">
        <AmazonHeader cartItemCount={cartItems.reduce((total, item) => total + (item.quantity || 1), 0)} />

        <div className="amazon-search-container">
          {/* Results Header Bar */}
          <div className="amazon-search-results-bar">
            <div className="amazon-search-results-info">
              {loading ? 'Searching...' : (
                <>
                  {startIndex + 1}-{Math.min(endIndex, filteredResults.length)} of over {filteredResults.length} results
                  {query && (
                    <> for <span className="amazon-search-keyword">"{query}"</span></>
                  )}
                </>
              )}
              </div>

            <div className="amazon-search-sort">
              {/* Mobile filter toggle */}
                <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="lg:hidden amazon-search-pagination-btn"
                style={{ marginRight: '8px' }}
                >
                <FaBars /> Filters
                </button>

              <span className="amazon-search-sort-label">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                className="amazon-search-sort-select"
                  data-testid="sort-select"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
            </div>
          </div>

          <div className="amazon-search-layout">
            {/* Left Sidebar - Filters */}
            <aside className={`amazon-search-sidebar ${showMobileFilters ? 'show' : ''}`}>
              {/* Department */}
              <div className="amazon-search-filter-section">
                <h3 className="amazon-search-filter-title-large">Department</h3>
                <ul className="amazon-search-dept-list">
                  <li className="amazon-search-dept-item">
                    <Link href="/amazon/search" className="amazon-search-dept-link">
                      All Departments
                    </Link>
                  </li>
                  {categories.slice(0, 8).map(cat => (
                    <li key={cat.id} className="amazon-search-dept-item">
                      <Link
                        href={`/amazon/search?category=${cat.id}`}
                        className={`amazon-search-dept-link ${categoryFilter === cat.id ? 'active' : ''}`}
                      >
                        {cat.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                </div>

              {/* Customer Reviews */}
              <div className="amazon-search-filter-section">
                <h3 className="amazon-search-filter-title">Customer Reviews</h3>
                {[4, 3, 2, 1].map(rating => (
                  <div
                    key={rating}
                    className="amazon-search-rating-option"
                    onClick={() => updateFilter('rating', filters.rating === rating ? 0 : rating)}
                    data-testid={`rating-filter-${rating}`}
                  >
                    <div className="amazon-search-rating-stars">
                      {[1, 2, 3, 4, 5].map(star => (
                        <FaStar
                          key={star}
                          style={{ color: star <= rating ? '#de7921' : '#ddd' }}
                        />
                      ))}
                    </div>
                    <span className="amazon-search-rating-text">& Up</span>
                  </div>
                ))}
                </div>

              {/* Brand */}
              {availableBrands.length > 0 && (
                <div className="amazon-search-filter-section">
                  <h3 className="amazon-search-filter-title">Brand</h3>
                  <div className="amazon-search-brand-list">
                    {availableBrands.slice(0, 10).map(brand => (
                      <label key={brand} className="amazon-search-brand-item">
                          <input
                            type="checkbox"
                            checked={filters.brands.includes(brand)}
                          onChange={() => toggleBrand(brand)}
                          className="amazon-search-brand-checkbox"
                          />
                        <span className="amazon-search-brand-label">{brand}</span>
                        </label>
                      ))}
                    </div>
                </div>
              )}

              {/* Price */}
              <div className="amazon-search-filter-section">
                <h3 className="amazon-search-filter-title">Price</h3>
                <ul className="amazon-search-price-list">
                  {priceRanges.map((range, idx) => (
                    <li key={idx} className="amazon-search-price-item">
                  <button
                        onClick={() => updateFilter('priceRange', { min: range.min, max: range.max })}
                        className="amazon-search-price-link"
                        style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: '2px 0' }}
                      >
                        {range.label}
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="amazon-search-price-inputs">
                  <input
                    type="number"
                    placeholder="$ Min"
                    value={filters.priceRange.min}
                    onChange={(e) => updateFilter('priceRange', { ...filters.priceRange, min: e.target.value })}
                    className="amazon-search-price-input"
                    data-testid="price-min-input"
                  />
                  <span className="amazon-search-price-dash">-</span>
                  <input
                    type="number"
                    placeholder="$ Max"
                    value={filters.priceRange.max}
                    onChange={(e) => updateFilter('priceRange', { ...filters.priceRange, max: e.target.value })}
                    className="amazon-search-price-input"
                    data-testid="price-max-input"
                  />
                  <button onClick={() => applyFiltersAndSort()} className="amazon-search-price-go">
                    Go
                  </button>
                    </div>
                </div>

              {/* Prime & Shipping */}
              <div className="amazon-search-filter-section">
                <h3 className="amazon-search-filter-title">Delivery</h3>
                <label className="amazon-search-prime-option">
                        <input
                          type="checkbox"
                          checked={filters.primeOnly}
                          onChange={(e) => updateFilter('primeOnly', e.target.checked)}
                    className="amazon-search-brand-checkbox"
                          data-testid="prime-filter"
                        />
                  <span className="amazon-search-prime-logo">prime</span>
                      </label>
                <label className="amazon-search-prime-option">
                        <input
                          type="checkbox"
                          checked={filters.freeShipping}
                          onChange={(e) => updateFilter('freeShipping', e.target.checked)}
                    className="amazon-search-brand-checkbox"
                          data-testid="free-shipping-filter"
                        />
                  <span className="amazon-search-brand-label">Free Shipping by Amazon</span>
                      </label>
              </div>
            </aside>

            {/* Main Content - Results */}
            <div className="amazon-search-main">
              {loading ? (
                <div style={{ textAlign: 'center', padding: '60px 0', color: '#565959' }}>
                  Loading...
                </div>
              ) : currentResults.length === 0 ? (
                <div className="amazon-search-no-results">
                  <h2 className="amazon-search-no-results-title">
                    No results for "{query || 'your search'}"
                  </h2>
                  <p className="amazon-search-no-results-text">
                    Try checking your spelling or use more general terms
                  </p>
                  <div className="amazon-search-no-results-suggestions">
                    <h3>Need help?</h3>
                    <ul>
                      <li>Check the spelling of your keywords</li>
                      <li>Try using fewer or more general keywords</li>
                      <li>Try browsing categories above</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <>
                  {/* Results Grid */}
                  <div className="amazon-search-results-grid">
                    {currentResults.map((product, index) => {
                      const price = formatPrice(product.price);
                      const discountPercent = product.originalPrice 
                        ? Math.round((1 - product.price / product.originalPrice) * 100)
                        : 0;

                      return (
                        <div key={product.id} className="amazon-search-result-card">
                          {/* Image Container */}
                          <Link href={`/amazon/product/${product.id}`}>
                            <div className="amazon-search-result-image-container">
                              <img
                                src={product.images?.[0] || '/images/placeholder-product.jpg'}
                                alt={product.title}
                                className="amazon-search-result-image"
                                onError={(e) => {
                                  e.target.src = '/images/placeholder-product.jpg';
                                }}
                              />
                              
                              {/* Discount Badge */}
                              {discountPercent > 0 && (
                                <span className="amazon-search-result-badge">
                                  {discountPercent}% off
                                </span>
                              )}
                            </div>
                          </Link>

                          {/* Wishlist Button */}
                          <button
                            onClick={() => toggleWishlist(product)}
                            className="amazon-search-result-wishlist"
                            title={isInWishlist(product.id) ? "Remove from list" : "Add to list"}
                          >
                            {isInWishlist(product.id) ? (
                              <FaHeart style={{ color: '#cc0c39' }} />
                            ) : (
                              <FaRegHeart style={{ color: '#565959' }} />
                            )}
                          </button>

                          {/* Product Info */}
                          <div>
                            {/* Brand */}
                            {product.brand && (
                              <div className="amazon-search-result-brand">{product.brand}</div>
                            )}

                            {/* Title */}
                            <Link href={`/amazon/product/${product.id}`} className="amazon-search-result-title">
                              {product.title}
                            </Link>

                            {/* Rating */}
                            <div className="amazon-search-result-rating">
                              <div className="amazon-search-result-rating-stars">
                                {renderStars(product.rating || 0)}
                              </div>
                              <span className="amazon-search-result-rating-count">
                                {product.reviewCount?.toLocaleString() || 0}
                              </span>
                            </div>

                            {/* Bought count */}
                            {product.boughtInPastMonth && (
                              <div className="amazon-search-result-bought">
                                {product.boughtInPastMonth}+ bought in past month
                              </div>
                            )}

                            {/* Price */}
                            <div className="amazon-search-result-price">
                              <div className="amazon-search-result-price-current">
                                <span className="amazon-search-result-price-symbol">$</span>
                                <span className="amazon-search-result-price-whole">{price.whole}</span>
                                <span className="amazon-search-result-price-fraction">{price.fraction}</span>
                              </div>
                              
                              {product.originalPrice && product.originalPrice > product.price && (
                                <div className="amazon-search-result-list-price">
                                  List: <span className="amazon-search-result-list-price-value">
                                    ${product.originalPrice.toFixed(2)}
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Delivery */}
                            <div className="amazon-search-result-delivery">
                              {product.delivery?.prime && (
                                <span className="amazon-search-result-delivery-prime">
                                  <span className="amazon-search-result-delivery-prime-logo">prime</span>
                                </span>
                              )}
                              {product.delivery?.freeShipping && (
                                <span className="amazon-search-result-delivery-free">
                                  FREE delivery <span className="amazon-search-result-delivery-date">
                                    {product.delivery?.prime ? 'Tomorrow' : 'Wed, Jan 22'}
                                  </span>
                                </span>
                              )}
                            </div>

                            {/* Low stock warning */}
                            {product.stockCount && product.stockCount <= 10 && (
                              <div className="amazon-search-result-stock">
                                Only {product.stockCount} left in stock - order soon.
                              </div>
                            )}
                          </div>

                          {/* Add to Cart */}
                          <div className="amazon-search-result-add-btn">
                            <button
                              onClick={() => handleAddToCart(product)}
                              className="amazon-search-add-to-cart-btn"
                              data-testid={`add-to-cart-${product.id}`}
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="amazon-search-pagination">
                      <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="amazon-search-pagination-btn"
                      >
                        <FaChevronLeft size={12} /> Previous
                      </button>
                      
                      {[...Array(Math.min(totalPages, 7))].map((_, index) => {
                        let pageNumber;
                        if (totalPages <= 7) {
                          pageNumber = index + 1;
                        } else if (currentPage <= 4) {
                          pageNumber = index + 1;
                        } else if (currentPage >= totalPages - 3) {
                          pageNumber = totalPages - 6 + index;
                        } else {
                          pageNumber = currentPage - 3 + index;
                        }

                        return (
                          <button
                            key={pageNumber}
                            onClick={() => setCurrentPage(pageNumber)}
                            className={`amazon-search-pagination-btn ${currentPage === pageNumber ? 'active' : ''}`}
                          >
                            {pageNumber}
                          </button>
                        );
                      })}

                      <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="amazon-search-pagination-btn"
                      >
                        Next <FaChevronRight size={12} />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AmazonSearchPage; 
