import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AmazonHeader from '../../components/amazon/AmazonHeader';
import { 
  FaTrash, 
  FaHeart, 
  FaCheck,
  FaTruck, 
  FaGift,
  FaPlus,
  FaMinus,
  FaChevronDown,
  FaShoppingCart
} from 'react-icons/fa';
import { products } from '../../data/amazonData';

const CartPage = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedForLater, setSavedForLater] = useState([]);
  const [selectedItems, setSelectedItems] = useState(new Set());
  
  // 推荐商品 - 使用现有产品数据
  const recommendedItems = products.slice(0, 6).map(product => ({
    id: product.id,
    title: product.title,
    price: product.price,
    image: product.images?.[0] || '/images/placeholder-product.jpg',
    rating: product.rating,
    reviewCount: product.reviewCount
  }));

  // 清理购物车数据格式
  const cleanCartData = (cartData) => {
    if (!Array.isArray(cartData)) {
      return [];
    }
    
    return cartData.map(item => {
      if (!item || typeof item !== 'object') {
        return null;
      }
      
      return {
        ...item,
        seller: typeof item.seller === 'object' ? item.seller?.name || 'Amazon.com' : item.seller || 'Amazon.com',
        prime: typeof item.prime === 'object' ? item.prime?.status || false : Boolean(item.prime),
        quantity: parseInt(item.quantity) || 1,
        price: parseFloat(item.price) || 0,
        originalPrice: parseFloat(item.originalPrice) || parseFloat(item.price) || 0,
        selectedVariant: (item.selectedVariant && typeof item.selectedVariant === 'object') ? item.selectedVariant : {},
        inStock: item.inStock !== false
      };
    }).filter(Boolean);
  };

  // 从localStorage加载购物车数据
  useEffect(() => {
    const loadCartData = () => {
      try {
        const savedCart = localStorage.getItem('amazon-cart');
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          const cleanedCart = cleanCartData(parsedCart);
          setCartItems(cleanedCart);
          // 默认选中所有商品
          setSelectedItems(new Set(cleanedCart.map(item => item.id)));
          localStorage.setItem('amazon-cart', JSON.stringify(cleanedCart));
        } else {
          setCartItems([]);
        }
      } catch (error) {
        console.error('Error loading cart data:', error);
        setCartItems([]);
      }
      setLoading(false);
    };

    loadCartData();
  }, []);

  // 保存购物车到localStorage
  const saveCartToStorage = (items) => {
    try {
      const cleanedItems = cleanCartData(items);
      localStorage.setItem('amazon-cart', JSON.stringify(cleanedItems));
    } catch (error) {
      console.error('Error saving cart data:', error);
    }
  };

  // 切换选中状态
  const toggleItemSelection = (itemId) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelectedItems(newSelected);
  };

  // 全选/取消全选
  const toggleSelectAll = () => {
    if (selectedItems.size === cartItems.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(cartItems.map(item => item.id)));
    }
  };

  // 更新商品数量
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedItems = cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
    saveCartToStorage(updatedItems);
  };

  // 删除商品
  const removeItem = (itemId) => {
    const updatedItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedItems);
    saveCartToStorage(updatedItems);
    // 从选中列表中移除
    const newSelected = new Set(selectedItems);
    newSelected.delete(itemId);
    setSelectedItems(newSelected);
  };

  // 移动到稍后购买
  const moveToSaveForLater = (item) => {
    setSavedForLater(prev => [...prev, item]);
    removeItem(item.id);
  };

  // 从稍后购买移回购物车
  const moveToCart = (item) => {
    const updatedItems = [...cartItems, { ...item, quantity: 1 }];
    setCartItems(updatedItems);
    saveCartToStorage(updatedItems);
    setSelectedItems(prev => new Set([...prev, item.id]));
    setSavedForLater(prev => prev.filter(savedItem => savedItem.id !== item.id));
  };

  // 从稍后购买中删除
  const removeFromSavedForLater = (itemId) => {
    setSavedForLater(prev => prev.filter(item => item.id !== itemId));
  };

  // 添加推荐商品到购物车
  const addRecommendedToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      updateQuantity(item.id, existingItem.quantity + 1);
    } else {
      const newItem = {
        ...item,
        quantity: 1,
        inStock: true,
        prime: true,
        seller: 'Amazon.com'
      };
      const updatedItems = [...cartItems, newItem];
      setCartItems(updatedItems);
      saveCartToStorage(updatedItems);
      setSelectedItems(prev => new Set([...prev, item.id]));
    }
  };

  // 计算选中商品的价格
  const calculateSubtotal = () => {
    return cartItems
      .filter(item => selectedItems.has(item.id))
      .reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTotalItems = () => {
    return cartItems
      .filter(item => selectedItems.has(item.id))
      .reduce((total, item) => total + item.quantity, 0);
  };

  const subtotal = calculateSubtotal();
  const totalItems = calculateTotalItems();
  const freeShippingThreshold = 35;
  const qualifiesForFreeShipping = subtotal >= freeShippingThreshold;

  // 渲染星级评分
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<span key={i} className="text-amazon-star-yellow">★</span>);
      } else {
        stars.push(<span key={i} className="text-gray-300">★</span>);
      }
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="amazon-cart-page">
        <AmazonHeader cartItemCount={0} />
        <div className="amazon-cart-container">
        <div className="flex justify-center items-center h-64">
            <div className="text-lg text-gray-600">Loading your cart...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Amazon.com Shopping Cart</title>
        <meta name="description" content="View items in your Amazon shopping cart" />
      </Head>

      <div className="amazon-cart-page">
        <AmazonHeader cartItemCount={cartItems.reduce((total, item) => total + item.quantity, 0)} />

        <div className="amazon-cart-container">
          {cartItems.length === 0 ? (
            // 空购物车
            <div className="amazon-cart-empty">
              <div className="amazon-cart-empty-image">
                <img 
                  src="/images/amazon/empty-cart.svg" 
                  alt="Empty cart"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <FaShoppingCart 
                  style={{ display: 'none', fontSize: '120px', color: '#ddd' }}
                />
              </div>
              <div className="amazon-cart-empty-content">
                <h1>Your Amazon Cart is empty</h1>
                <p>
                  Your Shopping Cart lives to serve. Give it purpose — fill it with groceries, clothing, household supplies, electronics, and more.
                  <br />
                  Continue shopping on the <Link href="/amazon" className="text-[#007185] hover:text-[#c7511f] hover:underline">Amazon.com homepage</Link>, learn about <Link href="/amazon/deals" className="text-[#007185] hover:text-[#c7511f] hover:underline">today's deals</Link>, or visit your <Link href="/amazon/wishlist" className="text-[#007185] hover:text-[#c7511f] hover:underline">Wish List</Link>.
                </p>
                <div>
                  <Link href="/amazon/signin" className="amazon-cart-empty-signin">
                    Sign in to your account
                  </Link>
                  <Link href="/amazon/register" className="amazon-cart-empty-signup">
                    Sign up now
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            // 购物车有商品
            <div className="amazon-cart-layout">
              {/* 主要内容区域 */}
              <div className="amazon-cart-main">
                {/* 购物车头部 */}
                <div className="amazon-cart-header">
                  <div className="flex justify-between items-end">
                    <div>
                      <h1 className="amazon-cart-title" data-testid="cart-title">Shopping Cart</h1>
                      <div className="amazon-cart-deselect" onClick={toggleSelectAll}>
                        {selectedItems.size === cartItems.length ? 'Deselect all items' : 'Select all items'}
                      </div>
                    </div>
                    <div className="amazon-cart-price-header">Price</div>
                  </div>
                </div>

                {/* 购物车商品列表 */}
                <div className="amazon-cart-items">
                  {cartItems.map((item, index) => (
                    <div key={item.id} className="amazon-cart-item">
                      <div className="amazon-cart-item-layout">
                        {/* 复选框 */}
                        <input
                          type="checkbox"
                          className="amazon-cart-item-checkbox"
                          checked={selectedItems.has(item.id)}
                          onChange={() => toggleItemSelection(item.id)}
                          data-testid={`cart-item-checkbox-${index}`}
                        />

                        {/* 商品图片 */}
                        <Link href={`/amazon/product/${item.id}`} className="amazon-cart-item-image">
                            <img
                            src={item.image || item.images?.[0] || '/images/placeholder-product.jpg'}
                              alt={item.title}
                              data-testid={`cart-item-image-${index}`}
                            />
                          </Link>

                        {/* 商品详情 */}
                        <div className="amazon-cart-item-details">
                              <Link 
                                href={`/amazon/product/${item.id}`}
                            className="amazon-cart-item-title"
                                data-testid={`cart-item-title-${index}`}
                              >
                                {item.title}
                              </Link>
                              
                          {item.inStock !== false ? (
                            <div className="amazon-cart-item-stock">In Stock</div>
                              ) : (
                            <div className="amazon-cart-item-stock out-of-stock">
                              Currently unavailable
                                </div>
                              )}

                          {/* 变体信息 */}
                          {item.selectedVariant && Object.keys(item.selectedVariant).length > 0 && (
                            <div className="amazon-cart-item-variant">
                                  {Object.entries(item.selectedVariant).map(([key, value]) => (
                                <span key={key} className="mr-3">
                                  <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                                    </span>
                                  ))}
                                </div>
                              )}

                          <div className="amazon-cart-item-seller">
                            Sold by: <a href="/amazon/sell">{item.seller || 'Amazon.com'}</a>
                          </div>

                          {/* Prime 配送 */}
                          {item.prime && (
                            <div className="amazon-cart-item-prime">
                              <span className="amazon-cart-item-prime-logo">prime</span>
                              <span className="amazon-cart-item-prime-delivery">
                                FREE delivery <strong>Tomorrow</strong>
                              </span>
                            </div>
                          )}

                          {/* 礼品选项 */}
                          <div className="amazon-cart-item-gift">
                            <input type="checkbox" id={`gift-${item.id}`} />
                            <label htmlFor={`gift-${item.id}`}>This is a gift</label>
                            <a href="/amazon/gift-cards" className="text-[#007185] hover:text-[#c7511f] hover:underline text-xs ml-2">
                              Learn more
                            </a>
                              </div>

                          {/* 操作按钮 */}
                          <div className="amazon-cart-item-actions">
                            {/* 数量选择器 */}
                            <div className="amazon-cart-quantity">
                                    <button
                                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                      data-testid={`decrease-quantity-${index}`}
                                    >
                                      <FaMinus size={10} />
                                    </button>
                              <span>{item.quantity}</span>
                                    <button
                                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                      data-testid={`increase-quantity-${index}`}
                                    >
                                      <FaPlus size={10} />
                                    </button>
                                  </div>

                            <span className="amazon-cart-item-actions-divider">|</span>

                                <button
                                  onClick={() => removeItem(item.id)}
                              className="amazon-cart-action-btn"
                                  data-testid={`delete-item-${index}`}
                                >
                                  Delete
                                </button>

                            <span className="amazon-cart-item-actions-divider">|</span>

                                <button
                                  onClick={() => moveToSaveForLater(item)}
                              className="amazon-cart-action-btn"
                                  data-testid={`save-for-later-${index}`}
                                >
                                  Save for later
                                </button>

                            <span className="amazon-cart-item-actions-divider">|</span>

                            <button className="amazon-cart-action-btn">
                              Compare with similar items
                            </button>

                            <span className="amazon-cart-item-actions-divider">|</span>

                            <button className="amazon-cart-action-btn">
                              Share
                                </button>
                              </div>
                            </div>

                        {/* 价格 */}
                        <div className="amazon-cart-item-price">
                          <div className="amazon-cart-item-price-value">
                                ${(item.price * item.quantity).toFixed(2)}
                              </div>
                              {item.originalPrice && item.originalPrice > item.price && (
                            <div className="amazon-cart-item-price-original">
                                  ${(item.originalPrice * item.quantity).toFixed(2)}
                                </div>
                              )}
                          {item.quantity > 1 && (
                            <div className="amazon-cart-item-price-each">
                                ${item.price.toFixed(2)} each
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 小计 */}
                <div className="amazon-cart-subtotal">
                  Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'}): 
                  <span className="amazon-cart-subtotal-amount"> ${subtotal.toFixed(2)}</span>
                </div>

                {/* 稍后购买 */}
                {savedForLater.length > 0 && (
                  <div className="amazon-saved-later">
                    <h2 className="amazon-saved-later-title">
                      Saved for later ({savedForLater.length} {savedForLater.length === 1 ? 'item' : 'items'})
                    </h2>
                      {savedForLater.map((item, index) => (
                      <div key={item.id} className="amazon-saved-later-item">
                        <Link href={`/amazon/product/${item.id}`} className="amazon-saved-later-image">
                            <img
                            src={item.image || item.images?.[0] || '/images/placeholder-product.jpg'}
                              alt={item.title}
                          />
                        </Link>
                        <div className="amazon-saved-later-details">
                          <Link href={`/amazon/product/${item.id}`} className="amazon-saved-later-title-link">
                            {item.title}
                          </Link>
                          <div className="amazon-saved-later-price">
                            ${item.price.toFixed(2)}
                          </div>
                          <div className={item.inStock !== false ? "amazon-cart-item-stock" : "amazon-cart-item-stock out-of-stock"}>
                            {item.inStock !== false ? 'In Stock' : 'Currently unavailable'}
                          </div>
                          <div className="amazon-saved-later-actions">
                              <button
                                onClick={() => moveToCart(item)}
                              className="amazon-cart-action-btn"
                              >
                                Move to Cart
                              </button>
                            <span className="amazon-cart-item-actions-divider">|</span>
                            <button
                              onClick={() => removeFromSavedForLater(item.id)}
                              className="amazon-cart-action-btn"
                            >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}

                {/* 推荐商品 */}
                <div className="amazon-cart-recommendations">
                  <h2 className="amazon-cart-recommendations-title">
                    Customers who bought items in your cart also bought
                    </h2>
                  <div className="amazon-cart-recommendations-grid">
                    {recommendedItems.map((item) => (
                      <div key={item.id} className="amazon-cart-recommendations-item">
                        <Link href={`/amazon/product/${item.id}`} className="amazon-cart-recommendations-item-image">
                          <img
                            src={item.image}
                            alt={item.title}
                            onError={(e) => {
                              e.target.src = '/images/placeholder-product.jpg';
                            }}
                          />
                        </Link>
                        <Link href={`/amazon/product/${item.id}`} className="amazon-cart-recommendations-item-title">
                            {item.title}
                        </Link>
                        <div className="amazon-cart-recommendations-item-rating">
                          <span style={{ color: '#ffa41c' }}>{renderStars(item.rating || 4)}</span>
                          <span className="text-xs text-[#007185]">
                            ({item.reviewCount?.toLocaleString() || '0'})
                          </span>
                          </div>
                        <div className="amazon-cart-recommendations-item-price">
                            ${item.price.toFixed(2)}
                          </div>
                        <button
                          onClick={() => addRecommendedToCart(item)}
                          className="amazon-cart-recommendations-add-btn"
                        >
                            Add to Cart
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
              </div>

              {/* 侧边栏 - 结算区域 */}
              <div className="amazon-cart-sidebar">
                <div className="amazon-cart-checkout-box">
                  {/* 免运费提示 */}
                  {qualifiesForFreeShipping ? (
                    <div className="amazon-cart-free-shipping">
                      <FaCheck className="amazon-cart-free-shipping-icon" />
                      <div className="amazon-cart-free-shipping-text">
                        <span className="amazon-cart-free-shipping-eligible">
                          Your order qualifies for FREE Shipping.
                        </span>
                        {' '}Choose this option at checkout.{' '}
                        <a href="/amazon/customer-service" className="text-[#007185] hover:text-[#c7511f] hover:underline">
                          See details
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="amazon-cart-free-shipping" style={{ background: '#fff3cd' }}>
                      <FaTruck className="amazon-cart-free-shipping-icon" style={{ color: '#856404' }} />
                      <div className="amazon-cart-free-shipping-text">
                        Add <strong>${(freeShippingThreshold - subtotal).toFixed(2)}</strong> of eligible items to your order to qualify for FREE Shipping.
                      </div>
                    </div>
                  )}

                  {/* 小计 */}
                  <div className="amazon-cart-subtotal-line">
                    Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'}): 
                    <strong> ${subtotal.toFixed(2)}</strong>
                  </div>

                  {/* 礼品选项 */}
                  <div className="amazon-cart-gift-option">
                    <input type="checkbox" id="gift-order" />
                    <label htmlFor="gift-order">This order contains a gift</label>
                  </div>

                  {/* 结算按钮 */}
                      <button
                        onClick={() => router.push('/amazon/checkout')}
                    className="amazon-cart-checkout-btn"
                        data-testid="proceed-to-checkout"
                    disabled={selectedItems.size === 0}
                    style={selectedItems.size === 0 ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                      >
                        Proceed to checkout
                      </button>

                  {/* 安全购物信息 */}
                  <div className="text-xs text-center text-gray-500 mt-2">
                    <span className="text-green-600">🔒</span> Secure transaction
                        </div>
                      </div>

                {/* Prime 会员提示 */}
                <div className="bg-white rounded-lg p-4 mt-4 border border-gray-200">
                  <div className="flex items-start gap-3">
                    <img 
                      src="/images/amazon/prime-badge.png" 
                      alt="Prime"
                      className="w-12 h-auto"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                      <div>
                      <div className="text-sm font-bold text-gray-900 mb-1">
                        Get fast, free delivery with Prime
                      </div>
                      <div className="text-xs text-gray-600">
                        Prime members get unlimited FREE One-Day Delivery on millions of items
                      </div>
                      <button className="mt-2 text-xs bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-1 rounded">
                        Try Prime FREE
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 继续购物链接 */}
          <div className="mt-6 mb-8">
            <Link
              href="/amazon"
              className="text-[#007185] hover:text-[#c7511f] hover:underline text-sm"
            >
              ← Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage; 
