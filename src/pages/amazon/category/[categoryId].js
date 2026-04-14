import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AmazonHeader from '../../../components/amazon/AmazonHeader';
import { 
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaChevronLeft,
  FaChevronRight,
  FaHeart,
  FaRegHeart,
  FaBars,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';
import { 
  categories, 
  products, 
  getProductsByCategory 
} from '../../../data/amazonData';

const CategoryPage = () => {
  const router = useRouter();
  const { categoryId, sub } = router.query;
  
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
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
    freeShipping: false,
    subcategory: sub || ''
  });

  const [expandedSections, setExpandedSections] = useState({
    brand: true,
    subcategory: true
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
    if (router.isReady && categoryId) {
      const category = categories.find(cat => cat.id === categoryId);
      setCurrentCategory(category);

      const prods = getProductsByCategory(categoryId);
      setCategoryProducts(prods);

      try {
        const savedCart = localStorage.getItem('amazon-cart');
        if (savedCart) {
          setCartItems(JSON.parse(savedCart));
        }
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }
  }, [router.isReady, categoryId]);

  // 如果URL中有sub参数，更新筛选器
  useEffect(() => {
    if (sub) {
      setFilters(prev => ({ ...prev, subcategory: sub }));
    }
  }, [sub]);

  // 应用筛选和排序
  useEffect(() => {
    let filtered = [...categoryProducts];

    // Subcategory filter
    if (filters.subcategory) {
      filtered = filtered.filter(product => 
        product.subcategory === filters.subcategory || 
        product.category === filters.subcategory
      );
    }

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

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [categoryProducts, filters, sortBy]);

  const updateFilter = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const toggleBrand = (brand) => {
    setFilters(prev => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand]
    }));
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
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
  const totalPages = Math.ceil(filteredProducts.length / resultsPerPage);
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const currentResults = filteredProducts.slice(startIndex, endIndex);

  // Get available brands
  const availableBrands = [...new Set(categoryProducts.map(product => product.brand).filter(Boolean))];

  // Get subcategories
  const subcategories = currentCategory?.subcategories || [];

  // Loading state
  if (!router.isReady) {
    return (
      <div className="amazon-search-page">
        <AmazonHeader cartItemCount={0} />
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#565959' }}>
          Loading...
        </div>
      </div>
    );
  }

  // 404 if category not found
  if (router.isReady && categoryId && !currentCategory) {
    return (
      <div className="amazon-search-page">
        <AmazonHeader cartItemCount={0} />
        <div className="amazon-search-container">
          <div className="amazon-search-no-results">
            <h2 className="amazon-search-no-results-title">
              Category Not Found
            </h2>
            <p className="amazon-search-no-results-text">
              The category you're looking for doesn't exist.
            </p>
            <Link
            href="/amazon"
              style={{
                display: 'inline-block',
                background: 'linear-gradient(to bottom, #f7dfa5, #f0c14b)',
                border: '1px solid #a88734',
                borderRadius: '20px',
                padding: '10px 24px',
                fontSize: '14px',
                color: '#0f1111',
                textDecoration: 'none',
                marginTop: '16px'
              }}
          >
            Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{currentCategory?.name || 'Category'} - Amazon.com</title>
        <meta name="description" content={`Shop ${currentCategory?.name} on Amazon.com`} />
      </Head>

      <div className="amazon-search-page">
        <AmazonHeader cartItemCount={cartItems.reduce((total, item) => total + (item.quantity || 1), 0)} />

        <div className="amazon-search-container">
          {/* Breadcrumb */}
          <nav style={{ 
            padding: '12px 0', 
            fontSize: '14px', 
            color: '#565959',
            borderBottom: '1px solid #e7e7e7'
          }}>
            <Link href="/amazon" style={{ color: '#007185', textDecoration: 'none' }}>
              Amazon
            </Link>
            <span style={{ margin: '0 8px' }}>›</span>
            <span style={{ color: '#0f1111' }}>{currentCategory?.name}</span>
            {sub && (
              <>
                <span style={{ margin: '0 8px' }}>›</span>
                <span style={{ color: '#0f1111', textTransform: 'capitalize' }}>{sub.replace(/-/g, ' ')}</span>
              </>
            )}
          </nav>

          {/* Results Header Bar */}
          <div className="amazon-search-results-bar">
            <div className="amazon-search-results-info">
              {filteredProducts.length === 0 
                ? 'No results'
                : `${startIndex + 1}-${Math.min(endIndex, filteredProducts.length)} of ${filteredProducts.length} results for "${currentCategory?.name}"`
              }
            </div>

            <div className="amazon-search-sort">
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
                    <Link href="/amazon/search" className="amazon-search-dept-back">
                      ‹ Any Department
                    </Link>
                  </li>
                  <li className="amazon-search-dept-item">
                    <span className="amazon-search-dept-link active" style={{ fontWeight: 700 }}>
                      {currentCategory?.name}
                    </span>
                  </li>
                  {subcategories.map(subcat => (
                    <li key={subcat.id} className="amazon-search-dept-item">
                      <Link
                        href={`/amazon/category/${categoryId}?sub=${subcat.id}`}
                        className={`amazon-search-dept-link indent ${filters.subcategory === subcat.id ? 'active' : ''}`}
                      >
                        {subcat.name}
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
                  <button
                    onClick={() => toggleSection('brand')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      marginBottom: '8px'
                    }}
                  >
                    <h3 className="amazon-search-filter-title" style={{ margin: 0 }}>Brand</h3>
                    {expandedSections.brand ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
                  </button>
                  
                  {expandedSections.brand && (
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
                  )}
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
                  />
                  <span className="amazon-search-price-dash">-</span>
                  <input
                    type="number"
                    placeholder="$ Max"
                    value={filters.priceRange.max}
                    onChange={(e) => updateFilter('priceRange', { ...filters.priceRange, max: e.target.value })}
                    className="amazon-search-price-input"
                  />
                  <button className="amazon-search-price-go">Go</button>
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
                  />
                  <span className="amazon-search-prime-logo">prime</span>
                </label>
                <label className="amazon-search-prime-option">
                  <input
                    type="checkbox"
                    checked={filters.freeShipping}
                    onChange={(e) => updateFilter('freeShipping', e.target.checked)}
                    className="amazon-search-brand-checkbox"
                  />
                  <span className="amazon-search-brand-label">Free Shipping by Amazon</span>
                </label>
              </div>
            </aside>

            {/* Main Content - Results */}
            <div className="amazon-search-main">
              {currentResults.length === 0 ? (
                <div className="amazon-search-no-results">
                  <h2 className="amazon-search-no-results-title">
                    No results found
                  </h2>
                  <p className="amazon-search-no-results-text">
                    Try adjusting your filters or browse other categories
                  </p>
                  <button
                    onClick={() => setFilters({
                      priceRange: { min: '', max: '' },
                      brands: [],
                      rating: 0,
                      primeOnly: false,
                      freeShipping: false,
                      subcategory: ''
                    })}
                    style={{
                      background: 'linear-gradient(to bottom, #f7dfa5, #f0c14b)',
                      border: '1px solid #a88734',
                      borderRadius: '20px',
                      padding: '10px 24px',
                      fontSize: '14px',
                      color: '#0f1111',
                      cursor: 'pointer',
                      marginTop: '16px'
                    }}
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <>
                  {/* Results Grid */}
                  <div className="amazon-search-results-grid">
                    {currentResults.map((product) => {
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
                            {product.brand && (
                              <div className="amazon-search-result-brand">{product.brand}</div>
                            )}

                            <Link href={`/amazon/product/${product.id}`} className="amazon-search-result-title">
                              {product.title}
                            </Link>

                            <div className="amazon-search-result-rating">
                              <div className="amazon-search-result-rating-stars">
                                {renderStars(product.rating || 0)}
                              </div>
                              <span className="amazon-search-result-rating-count">
                                {product.reviewCount?.toLocaleString() || 0}
                              </span>
                            </div>

                            {product.boughtInPastMonth && (
                              <div className="amazon-search-result-bought">
                                {product.boughtInPastMonth}+ bought in past month
                              </div>
                            )}

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

                            {product.stockCount && product.stockCount <= 10 && (
                              <div className="amazon-search-result-stock">
                                Only {product.stockCount} left in stock - order soon.
                              </div>
                            )}
                          </div>

                          <div className="amazon-search-result-add-btn">
                            <button
                              onClick={() => handleAddToCart(product)}
                              className="amazon-search-add-to-cart-btn"
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

export default CategoryPage;
