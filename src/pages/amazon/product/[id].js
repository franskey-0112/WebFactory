import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import AmazonHeader from '../../../components/amazon/AmazonHeader';
import ProductCard from '../../../components/amazon/ProductCard';
import { 
  FaStar, 
  FaStarHalfAlt, 
  FaRegStar, 
  FaMapMarkerAlt,
  FaChevronDown,
  FaChevronUp,
  FaCheck,
  FaLock
} from 'react-icons/fa';
import { getProductById, getRecommendedProducts, products } from '../../../data/amazonData';

const ProductDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  
  const [product, setProduct] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [showAllFeatures, setShowAllFeatures] = useState(false);

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  useEffect(() => {
    // Load cart from localStorage
    try {
      const savedCart = localStorage.getItem('amazon-cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  }, []);

  const loadProduct = () => {
    setLoading(true);
    
      const productData = getProductById(id);
      
      if (productData) {
        setProduct(productData);
        
      // Load recommendations
      try {
        const recommended = getRecommendedProducts(id, 'customers-who-viewed');
        setRecommendations(recommended || []);
      } catch (e) {
        setRecommendations(products.filter(p => p.id !== id).slice(0, 6));
        }
      }
      
      setLoading(false);
  };

  // Render rating stars - Amazon style
  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.3 && rating % 1 <= 0.7;
    const almostFull = rating % 1 > 0.7;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars || (i === fullStars && almostFull)) {
        stars.push(<FaStar key={i} style={{ color: '#de7921' }} />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} style={{ color: '#de7921' }} />);
      } else {
        stars.push(<FaRegStar key={i} style={{ color: '#de7921' }} />);
      }
    }

    return stars;
  };

  // Add to cart
  const handleAddToCart = () => {
    try {
      const savedCart = localStorage.getItem('amazon-cart');
      let currentCart = savedCart ? JSON.parse(savedCart) : [];
      
      const existingItemIndex = currentCart.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        currentCart[existingItemIndex].quantity += quantity;
      } else {
        currentCart.push({
          id: product.id,
          title: product.title,
          price: product.price,
          originalPrice: product.originalPrice,
          quantity: quantity,
          image: product.images?.[0] || product.image,
          inStock: product.inStock,
          prime: product.delivery?.prime || false,
          seller: product.seller?.name || 'Amazon.com'
        });
      }
      
      localStorage.setItem('amazon-cart', JSON.stringify(currentCart));
      setCartItems(currentCart);
      
      alert(`${product.title} added to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  // Buy now
  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/amazon/checkout');
  };

  if (loading) {
    return (
      <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
        <AmazonHeader cartItemCount={cartItems.reduce((total, item) => total + (item.quantity || 1), 0)} />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px', color: '#565959' }}>
          Loading product details...
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
        <AmazonHeader cartItemCount={cartItems.reduce((total, item) => total + (item.quantity || 1), 0)} />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px', color: '#565959' }}>
          Product not found
        </div>
      </div>
    );
  }

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const priceWhole = Math.floor(product.price);
  const priceFraction = Math.round((product.price % 1) * 100).toString().padStart(2, '0');

  // Delivery date
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + (product.delivery?.estimatedDays || 3));
  const deliveryDateStr = deliveryDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <>
      <Head>
        <title>{product.title} - Amazon.com</title>
        <meta name="description" content={product.description} />
      </Head>

      <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
        <AmazonHeader cartItemCount={cartItems.reduce((total, item) => total + (item.quantity || 1), 0)} />

        <main style={{ maxWidth: '1500px', margin: '0 auto', padding: '20px' }}>
        {/* Breadcrumb */}
          <div style={{ marginBottom: '16px' }}>
            <Link href="/amazon" style={{ color: '#007185', fontSize: '14px', textDecoration: 'none' }}>
              ‹ Back to results
              </Link>
        </div>

          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            {/* Left Column - Images */}
            <div style={{ width: '400px', flexShrink: 0 }}>
              <div style={{ position: 'sticky', top: '80px' }}>
                {/* Thumbnails on left */}
                <div style={{ display: 'flex', gap: '16px' }}>
                {product.images && product.images.length > 1 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '50px' }}>
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                          onMouseEnter={() => setSelectedImageIndex(index)}
                          style={{
                            width: '50px',
                            height: '50px',
                            border: index === selectedImageIndex ? '2px solid #007185' : '1px solid #ddd',
                            borderRadius: '4px',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            padding: '2px',
                            backgroundColor: 'white'
                          }}
                      >
                        <img
                          src={image}
                          alt={`${product.title} ${index + 1}`}
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                      </button>
                    ))}
                  </div>
                )}

                  {/* Main Image */}
                  <div style={{
                    flex: 1,
                    aspectRatio: '1',
                    backgroundColor: '#fff',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    border: '1px solid #ddd'
                  }}>
                    <img
                      src={product.images?.[selectedImageIndex] || '/images/placeholder-product.jpg'}
                      alt={product.title}
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                      data-testid="main-product-image"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Column - Product Details */}
            <div style={{ flex: 1, minWidth: '300px', maxWidth: '600px' }}>
              {/* Title */}
              <h1 style={{
                fontSize: '24px',
                fontWeight: 400,
                color: '#0f1111',
                lineHeight: '1.3',
                marginBottom: '8px'
              }} data-testid="product-title">
                {product.title}
              </h1>

              {/* Brand Link */}
                {product.brand && (
                <div style={{ marginBottom: '8px' }}>
                  <Link
                    href={`/amazon/search?q=${product.brand}`}
                    style={{ color: '#007185', fontSize: '14px', textDecoration: 'none' }}
                  >
                      Visit the {product.brand} Store
                    </Link>
                  </div>
                )}

                {/* Rating */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span style={{ fontSize: '14px', color: '#007185' }}>{product.rating}</span>
                <div style={{ display: 'flex' }}>
                    {renderRating(product.rating)}
                </div>
                <Link
                  href="#reviews"
                  style={{ color: '#007185', fontSize: '14px', textDecoration: 'none' }}
                >
                  {product.reviewCount?.toLocaleString()} ratings
                </Link>
                    </div>

              {/* Divider */}
              <hr style={{ border: 'none', borderTop: '1px solid #ddd', margin: '16px 0' }} />

              {/* Price */}
              <div style={{ marginBottom: '16px' }}>
                {discountPercent > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{
                      backgroundColor: '#cc0c39',
                      color: 'white',
                      padding: '4px 8px',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      borderRadius: '2px'
                    }}>
                      -{discountPercent}%
                    </span>
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '4px' }}>
                  <span style={{ fontSize: '14px', color: '#0f1111', position: 'relative', top: '4px' }}>$</span>
                  <span style={{ fontSize: '28px', color: '#0f1111' }}>{priceWhole}</span>
                  <span style={{ fontSize: '14px', color: '#0f1111', position: 'relative', top: '4px' }}>{priceFraction}</span>
                    </div>
                  
                    {product.originalPrice && product.originalPrice > product.price && (
                  <div style={{ fontSize: '14px', color: '#565959' }}>
                    List Price: <span style={{ textDecoration: 'line-through' }}>${product.originalPrice.toFixed(2)}</span>
                  </div>
                )}
                </div>

              {/* Prime */}
              {product.delivery?.prime && (
                <div style={{ marginBottom: '16px' }}>
                  <span style={{ color: '#1b94c2', fontWeight: 'bold', fontStyle: 'italic', fontSize: '14px' }}>
                    prime
                  </span>
                  <span style={{ fontSize: '14px', color: '#565959', marginLeft: '4px' }}>
                    FREE delivery
                  </span>
                      </div>
                    )}

              {/* Delivery */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '14px', color: '#0f1111' }}>
                  <span style={{ color: '#565959' }}>FREE delivery </span>
                  <span style={{ fontWeight: 'bold' }}>{deliveryDateStr}</span>
                </div>
                <div style={{ fontSize: '14px', color: '#0f1111', marginTop: '4px' }}>
                  Or fastest delivery <span style={{ fontWeight: 'bold' }}>Tomorrow</span>
                        </div>
                      </div>

              {/* Divider */}
              <hr style={{ border: 'none', borderTop: '1px solid #ddd', margin: '16px 0' }} />

                {/* About this item */}
                <div>
                <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#0f1111', marginBottom: '12px' }}>
                  About this item
                </h2>
                <ul style={{ margin: 0, padding: 0, paddingLeft: '20px' }}>
                    {product.features?.slice(0, showAllFeatures ? product.features.length : 5).map((feature, index) => (
                    <li key={index} style={{ fontSize: '14px', color: '#0f1111', marginBottom: '8px', lineHeight: '1.4' }}>
                      {feature}
                      </li>
                    ))}
                  </ul>
                  {product.features?.length > 5 && (
                    <button
                      onClick={() => setShowAllFeatures(!showAllFeatures)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#007185',
                      fontSize: '14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      marginTop: '8px'
                    }}
                  >
                    {showAllFeatures ? 'Show less' : 'See more'}
                    {showAllFeatures ? <FaChevronUp style={{ marginLeft: '4px' }} /> : <FaChevronDown style={{ marginLeft: '4px' }} />}
                      </button>
                )}
              </div>
            </div>

            {/* Right Column - Buy Box */}
            <div style={{ width: '280px', flexShrink: 0 }}>
              <div style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '20px',
                backgroundColor: '#fff'
              }}>
                {/* Price in buy box */}
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '14px', color: '#0f1111', position: 'relative', top: '4px' }}>$</span>
                    <span style={{ fontSize: '28px', color: '#0f1111' }}>{priceWhole}</span>
                    <span style={{ fontSize: '14px', color: '#0f1111', position: 'relative', top: '4px' }}>{priceFraction}</span>
                    </div>
                      </div>

                {/* Prime Free Delivery */}
                {product.delivery?.prime && (
                  <div style={{ fontSize: '14px', marginBottom: '8px' }}>
                    <span style={{ color: '#1b94c2', fontWeight: 'bold', fontStyle: 'italic' }}>prime</span>
                    <span style={{ color: '#565959' }}> FREE Delivery</span>
                  </div>
                )}

                {/* Delivery info */}
                <div style={{ fontSize: '14px', color: '#0f1111', marginBottom: '12px' }}>
                  FREE delivery <span style={{ fontWeight: 'bold' }}>{deliveryDateStr}</span>
                </div>

                {/* Delivery location */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '16px' }}>
                  <FaMapMarkerAlt style={{ color: '#007185', fontSize: '14px' }} />
                  <span style={{ fontSize: '12px', color: '#007185' }}>Deliver to New York 10001</span>
                  </div>

                  {/* Stock status */}
                <div style={{ marginBottom: '16px' }}>
                    {product.inStock ? (
                    product.stockCount && product.stockCount <= 10 ? (
                      <span style={{ fontSize: '18px', color: '#cc0c39' }}>
                        Only {product.stockCount} left in stock.
                      </span>
                      ) : (
                      <span style={{ fontSize: '18px', color: '#007600' }}>In Stock</span>
                      )
                    ) : (
                    <span style={{ fontSize: '18px', color: '#cc0c39' }}>Currently unavailable</span>
                    )}
                  </div>

                {/* Quantity selector */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '14px', color: '#0f1111' }}>Qty: </label>
                  <select
                        value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    style={{
                      padding: '4px 24px 4px 8px',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      backgroundColor: '#f0f2f2',
                      fontSize: '14px',
                      cursor: 'pointer',
                      boxShadow: '0 1px 2px rgba(0,0,0,.1)'
                    }}
                    data-testid="quantity-select"
                      >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                  </div>

                {/* Add to Cart Button */}
                    <button
                      onClick={handleAddToCart}
                      disabled={!product.inStock}
                  style={{
                    width: '100%',
                    padding: '10px',
                    marginBottom: '8px',
                    background: product.inStock ? 'linear-gradient(to bottom, #f7dfa5, #f0c14b)' : '#e0e0e0',
                    border: '1px solid #a88734',
                    borderRadius: '20px',
                    fontSize: '14px',
                    cursor: product.inStock ? 'pointer' : 'not-allowed',
                    color: '#0f1111'
                  }}
                      data-testid="add-to-cart-button"
                    >
                      Add to Cart
                    </button>

                {/* Buy Now Button */}
                    <button
                      onClick={handleBuyNow}
                      disabled={!product.inStock}
                  style={{
                    width: '100%',
                    padding: '10px',
                    marginBottom: '16px',
                    background: product.inStock ? 'linear-gradient(to bottom, #ffb44f, #ff8f00)' : '#e0e0e0',
                    border: '1px solid #c77600',
                    borderRadius: '20px',
                    fontSize: '14px',
                    cursor: product.inStock ? 'pointer' : 'not-allowed',
                    color: '#0f1111'
                  }}
                      data-testid="buy-now-button"
                    >
                      Buy Now
                    </button>

                {/* Secure transaction */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <FaLock style={{ color: '#565959', fontSize: '12px' }} />
                  <span style={{ fontSize: '12px', color: '#565959' }}>Secure transaction</span>
                  </div>

                {/* Ships from / Sold by */}
                <div style={{ fontSize: '12px', color: '#565959', marginBottom: '4px' }}>
                  <span style={{ color: '#565959' }}>Ships from </span>
                  <span style={{ color: '#0f1111' }}>Amazon.com</span>
                    </div>
                <div style={{ fontSize: '12px', color: '#565959' }}>
                  <span style={{ color: '#565959' }}>Sold by </span>
                  <span style={{ color: '#0f1111' }}>{product.seller?.name || 'Amazon.com'}</span>
                </div>

                {/* Divider */}
                <hr style={{ border: 'none', borderTop: '1px solid #ddd', margin: '16px 0' }} />

                {/* Add to List */}
                <button
                  style={{
                    width: '100%',
                    padding: '8px',
                    background: '#fff',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '13px',
                    cursor: 'pointer',
                    color: '#0f1111'
                  }}
                >
                  Add to List
                </button>
              </div>
            </div>
          </div>

          {/* Product Details Section */}
          {product.specifications && (
            <div style={{ marginTop: '40px', borderTop: '1px solid #ddd', paddingTop: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f1111', marginBottom: '16px' }}>
                Product Details
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '12px'
              }}>
                  {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} style={{ display: 'flex' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '14px', color: '#0f1111', width: '150px', flexShrink: 0 }}>
                      {key}
                      </span>
                    <span style={{ fontSize: '14px', color: '#0f1111' }}>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

          {/* Customers also viewed */}
          {recommendations.length > 0 && (
            <div style={{ marginTop: '40px', borderTop: '1px solid #ddd', paddingTop: '24px' }}>
              <h2 style={{ fontSize: '21px', fontWeight: 'bold', color: '#0f1111', marginBottom: '16px' }}>
                Customers who viewed this item also viewed
              </h2>
              <div style={{
                display: 'flex',
                overflowX: 'auto',
                gap: '16px',
                paddingBottom: '16px'
              }}>
                {recommendations.map(item => (
                  <Link
                    key={item.id}
                    href={`/amazon/product/${item.id}`}
                    style={{ flexShrink: 0, width: '200px', textDecoration: 'none' }}
                  >
                    <div style={{
                      backgroundColor: '#fff',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: '200px',
                        height: '200px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#f7f7f7'
                      }}>
                      <img
                        src={item.images?.[0] || '/images/placeholder-product.jpg'}
                        alt={item.title}
                          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                        />
                      </div>
                      <div style={{ padding: '8px 0' }}>
                        <h3 style={{
                          fontSize: '14px',
                          color: '#0f1111',
                          marginBottom: '4px',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}>
                        {item.title}
                      </h3>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                          <div style={{ display: 'flex', color: '#de7921', fontSize: '12px' }}>
                          {renderRating(item.rating)}
                          </div>
                          <span style={{ fontSize: '12px', color: '#007185', marginLeft: '4px' }}>
                            {item.reviewCount?.toLocaleString()}
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                          <span style={{ fontSize: '12px', color: '#0f1111' }}>$</span>
                          <span style={{ fontSize: '21px', color: '#0f1111' }}>{Math.floor(item.price)}</span>
                          <span style={{ fontSize: '12px', color: '#0f1111' }}>
                            {Math.round((item.price % 1) * 100).toString().padStart(2, '0')}
                        </span>
                      </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default ProductDetailPage; 
