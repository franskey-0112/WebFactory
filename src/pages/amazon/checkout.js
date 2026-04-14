import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  FaLock, 
  FaShieldAlt, 
  FaTruck, 
  FaCheckCircle,
  FaCheck,
  FaPlus,
  FaCreditCard,
  FaGift
} from 'react-icons/fa';
import { users } from '../../data/amazonData';

const CheckoutPage = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [isGiftOrder, setIsGiftOrder] = useState(false);

  // Demo user data
  const demoUser = users?.[0] || {
    addresses: [
      {
        id: 'addr-1',
        name: 'John Doe',
        addressLine1: '123 Main Street',
        addressLine2: 'Apt 4B',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'United States',
        phone: '(555) 123-4567',
        isDefault: true
      },
      {
        id: 'addr-2',
        name: 'John Doe',
        addressLine1: '456 Oak Avenue',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90001',
        country: 'United States',
        phone: '(555) 987-6543',
        isDefault: false
      }
    ],
    paymentMethods: [
      {
        id: 'card-1',
        brand: 'Visa',
        cardNumber: '************4242',
        expiryMonth: '12',
        expiryYear: '2026',
        cardholderName: 'John Doe',
        isDefault: true
      },
      {
        id: 'card-2',
        brand: 'Mastercard',
        cardNumber: '************8888',
        expiryMonth: '06',
        expiryYear: '2025',
        cardholderName: 'John Doe',
        isDefault: false
      }
    ]
  };

  const [deliveryOptions] = useState([
    {
      id: 'prime',
      name: 'FREE Prime Delivery',
      date: 'Tomorrow, by 9 PM',
      price: 0,
      days: 1,
      prime: true
    },
    {
      id: 'standard',
      name: 'FREE Standard Delivery',
      date: 'Wednesday, January 22',
      price: 0,
      days: 3
    },
    {
      id: 'fast',
      name: 'Fastest Delivery',
      date: 'Today, by 7 PM',
      price: 9.99,
      days: 0
    }
  ]);

  const [selectedDelivery, setSelectedDelivery] = useState('prime');

  useEffect(() => {
    loadCheckoutData();
  }, []);

  const loadCheckoutData = () => {
    try {
      const savedCart = localStorage.getItem('amazon-cart');
      if (savedCart) {
        const items = JSON.parse(savedCart);
        if (items.length === 0) {
          router.push('/amazon/cart');
          return;
        }
        setCartItems(items.map(item => ({
          ...item,
          price: parseFloat(item.price) || 0,
          quantity: parseInt(item.quantity) || 1
        })));
      } else {
        // Redirect to cart if empty
        router.push('/amazon/cart');
        return;
      }

      // Set default selections
      const addresses = demoUser.addresses || [];
      const payments = demoUser.paymentMethods || [];
      
      if (addresses.length > 0) {
        setSelectedAddress(addresses.find(addr => addr.isDefault) || addresses[0]);
      }
      if (payments.length > 0) {
        setSelectedPayment(payments.find(payment => payment.isDefault) || payments[0]);
      }
    } catch (error) {
      console.error('Error loading checkout data:', error);
      router.push('/amazon/cart');
    }
    setLoading(false);
  };

  // Price calculations
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const deliveryOption = deliveryOptions.find(option => option.id === selectedDelivery);
  const shipping = deliveryOption?.price || 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      const newOrderId = `111-${Math.floor(Math.random() * 10000000)}-${Math.floor(Math.random() * 10000000)}`;
      setOrderId(newOrderId);
      setOrderComplete(true);
      setIsProcessing(false);
      
      // Clear cart
      localStorage.removeItem('amazon-cart');
    }, 2000);
  };

  if (loading) {
    return (
      <div className="amazon-checkout-page">
        <div className="amazon-checkout-header">
          <div className="amazon-checkout-header-content">
            <Link href="/amazon" className="amazon-checkout-logo">
              <span className="amazon-checkout-logo-text">amazon<span>.com</span></span>
            </Link>
          </div>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Loading checkout...</div>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="amazon-checkout-page">
        <div className="amazon-checkout-header">
          <div className="amazon-checkout-header-content">
            <Link href="/amazon" className="amazon-checkout-logo">
              <span className="amazon-checkout-logo-text">amazon<span>.com</span></span>
            </Link>
          </div>
        </div>
        
        <div className="amazon-checkout-complete">
          <FaCheckCircle className="amazon-checkout-complete-icon" />
          <h1 className="amazon-checkout-complete-title">
            Order placed, thanks!
          </h1>
          <p className="amazon-checkout-complete-order-id">
            Order #{orderId}
          </p>
          <p className="amazon-checkout-complete-message">
            Confirmation will be sent to your email.<br />
            {selectedAddress && (
              <>Shipping to {selectedAddress.name}, {selectedAddress.city}, {selectedAddress.state} {selectedAddress.zipCode}</>
            )}
          </p>
          
          <div className="amazon-checkout-complete-delivery">
            <div className="amazon-checkout-complete-delivery-title">
              Estimated delivery
            </div>
            <div className="amazon-checkout-complete-delivery-text">
              {deliveryOption?.date || 'Within 3-5 business days'}
            </div>
          </div>

          <div className="amazon-checkout-complete-actions">
            <Link href="/amazon/orders" className="amazon-checkout-complete-track-btn">
              Review or edit your orders
            </Link>
            <Link href="/amazon" className="amazon-checkout-complete-continue">
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Amazon.com Checkout ({itemCount} {itemCount === 1 ? 'item' : 'items'})</title>
        <meta name="description" content="Complete your Amazon order" />
      </Head>

      <div className="amazon-checkout-page">
        {/* Checkout Header */}
        <div className="amazon-checkout-header">
          <div className="amazon-checkout-header-content">
            <div className="flex items-baseline">
              <Link href="/amazon" className="amazon-checkout-logo">
                <span className="amazon-checkout-logo-text">amazon<span>.com</span></span>
              </Link>
              <span className="amazon-checkout-title">Checkout</span>
            </div>
            <div className="amazon-checkout-secure">
              <FaLock />
              <span>Checkout ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="amazon-checkout-container">
          <div className="amazon-checkout-layout">
            {/* Left Column - Checkout Steps */}
            <div className="amazon-checkout-main">
              
              {/* Step 1: Shipping Address */}
              <div className="amazon-checkout-section">
                <div className="amazon-checkout-section-header">
                  <div className="flex items-center">
                    <span className={`amazon-checkout-section-number ${currentStep > 1 ? 'completed' : ''}`}>
                      {currentStep > 1 ? <FaCheck size={12} /> : '1'}
                    </span>
                    <span className="amazon-checkout-section-title">Shipping address</span>
                  </div>
                    {currentStep > 1 && (
                      <button
                        onClick={() => setCurrentStep(1)}
                      className="amazon-checkout-section-change"
                      >
                        Change
                      </button>
                    )}
                  </div>

                  {currentStep === 1 ? (
                  <div className="amazon-checkout-section-body">
                    <div className="amazon-checkout-address-list">
                      {(demoUser.addresses || []).map((address) => (
                        <div 
                          key={address.id}
                          className={`amazon-checkout-address-item ${selectedAddress?.id === address.id ? 'selected' : ''}`}
                          onClick={() => setSelectedAddress(address)}
                        >
                              <input
                                type="radio"
                                name="address"
                                checked={selectedAddress?.id === address.id}
                                onChange={() => setSelectedAddress(address)}
                            className="amazon-checkout-address-radio"
                                data-testid={`address-${address.id}`}
                              />
                          <div className="amazon-checkout-address-details">
                            <div className="amazon-checkout-address-name">
                              {address.name}
                              {address.isDefault && (
                                <span className="amazon-checkout-address-default">Default</span>
                              )}
                            </div>
                            <div className="amazon-checkout-address-line">
                                    {address.addressLine1}
                              {address.addressLine2 && `, ${address.addressLine2}`}
                                  </div>
                            <div className="amazon-checkout-address-line">
                                    {address.city}, {address.state} {address.zipCode}
                                  </div>
                            <div className="amazon-checkout-address-line">{address.country}</div>
                            {address.phone && (
                              <div className="amazon-checkout-address-line" style={{ marginTop: '4px' }}>
                                Phone: {address.phone}
                              </div>
                                )}
                              </div>
                            </div>
                        ))}
                      </div>

                    <div className="amazon-checkout-add-new">
                      <FaPlus />
                      <span>Add a new address</span>
                    </div>

                    {/* Delivery Options */}
                    <div className="amazon-checkout-delivery-title">
                      Choose a delivery option:
                    </div>
                    <div className="amazon-checkout-delivery-list">
                          {deliveryOptions.map((option) => (
                        <div
                          key={option.id}
                          className={`amazon-checkout-delivery-item ${selectedDelivery === option.id ? 'selected' : ''}`}
                          onClick={() => setSelectedDelivery(option.id)}
                        >
                                <input
                                  type="radio"
                                  name="delivery"
                                  checked={selectedDelivery === option.id}
                                  onChange={() => setSelectedDelivery(option.id)}
                            className="amazon-checkout-delivery-radio"
                                  data-testid={`delivery-${option.id}`}
                                />
                          <div className="amazon-checkout-delivery-details">
                            <div className="amazon-checkout-delivery-date">
                              {option.date}
                            </div>
                            <div className="amazon-checkout-delivery-name">
                                      {option.name}
                                      {option.prime && (
                                <span className="amazon-checkout-delivery-prime-badge">prime</span>
                                      )}
                                    </div>
                                  </div>
                          <div className={`amazon-checkout-delivery-price ${option.price === 0 ? 'amazon-checkout-delivery-free' : ''}`}>
                                      {option.price === 0 ? 'FREE' : `$${option.price.toFixed(2)}`}
                                    </div>
                                  </div>
                          ))}
                      </div>

                      <button
                        onClick={() => setCurrentStep(2)}
                        disabled={!selectedAddress}
                      className="amazon-checkout-continue-btn"
                        data-testid="continue-to-payment"
                      >
                      Use this address
                      </button>
                    </div>
                  ) : (
                  <div className="amazon-checkout-section-collapsed">
                    <strong>{selectedAddress?.name}</strong><br />
                        {selectedAddress?.addressLine1}
                    {selectedAddress?.addressLine2 && `, ${selectedAddress.addressLine2}`}<br />
                    {selectedAddress?.city}, {selectedAddress?.state} {selectedAddress?.zipCode}<br />
                    <span style={{ color: '#067d62', marginTop: '4px', display: 'inline-block' }}>
                      {deliveryOption?.name} - {deliveryOption?.date}
                    </span>
                    </div>
                  )}
                </div>

              {/* Step 2: Payment Method */}
              <div className="amazon-checkout-section" style={{ opacity: currentStep >= 2 ? 1 : 0.5 }}>
                <div className="amazon-checkout-section-header">
                  <div className="flex items-center">
                    <span className={`amazon-checkout-section-number ${currentStep > 2 ? 'completed' : ''}`}>
                      {currentStep > 2 ? <FaCheck size={12} /> : '2'}
                    </span>
                    <span className="amazon-checkout-section-title">Payment method</span>
                  </div>
                    {currentStep > 2 && (
                      <button
                        onClick={() => setCurrentStep(2)}
                      className="amazon-checkout-section-change"
                      >
                        Change
                      </button>
                    )}
                  </div>

                  {currentStep === 2 ? (
                  <div className="amazon-checkout-section-body">
                    <div className="amazon-checkout-payment-list">
                      {(demoUser.paymentMethods || []).map((payment) => (
                        <div
                          key={payment.id}
                          className={`amazon-checkout-payment-item ${selectedPayment?.id === payment.id ? 'selected' : ''}`}
                          onClick={() => setSelectedPayment(payment)}
                        >
                              <input
                                type="radio"
                                name="payment"
                                checked={selectedPayment?.id === payment.id}
                                onChange={() => setSelectedPayment(payment)}
                            className="amazon-checkout-payment-radio"
                                data-testid={`payment-${payment.id}`}
                              />
                          <div className="amazon-checkout-payment-details">
                            <div className="amazon-checkout-payment-card">
                              <div className="amazon-checkout-payment-icon">
                                <FaCreditCard />
                              </div>
                                <div>
                                <div className="amazon-checkout-payment-name">
                                  {payment.brand}
                                </div>
                                <div className="amazon-checkout-payment-ending">
                                  ending in {payment.cardNumber.slice(-4)}
                                  </div>
                                <div className="amazon-checkout-payment-expiry">
                                    Expires {payment.expiryMonth}/{payment.expiryYear}
                                </div>
                              </div>
                            </div>
                          </div>
                          {payment.isDefault && (
                            <span className="amazon-checkout-address-default" style={{ marginLeft: 'auto' }}>Default</span>
                          )}
                        </div>
                        ))}
                      </div>

                    <div className="amazon-checkout-add-new">
                      <FaPlus />
                      <span>Add a credit or debit card</span>
                    </div>

                      <button
                        onClick={() => setCurrentStep(3)}
                        disabled={!selectedPayment}
                      className="amazon-checkout-continue-btn"
                        data-testid="continue-to-review"
                      >
                      Use this payment method
                      </button>
                    </div>
                ) : currentStep > 2 ? (
                  <div className="amazon-checkout-section-collapsed">
                      <div className="flex items-center">
                      <FaCreditCard style={{ marginRight: '8px', color: '#888' }} />
                        <span>
                          {selectedPayment?.brand} ending in {selectedPayment?.cardNumber.slice(-4)}
                        </span>
                      </div>
                    <div style={{ color: '#565959', fontSize: '12px', marginTop: '4px' }}>
                      Billing address: Same as shipping address
                    </div>
                  </div>
                ) : null}
              </div>

              {/* Step 3: Review & Place Order */}
              <div className="amazon-checkout-section" style={{ opacity: currentStep >= 3 ? 1 : 0.5 }}>
                <div className="amazon-checkout-section-header">
                  <div className="flex items-center">
                    <span className="amazon-checkout-section-number">3</span>
                    <span className="amazon-checkout-section-title">Review items and shipping</span>
                  </div>
                </div>

                {currentStep === 3 && (
                  <div className="amazon-checkout-section-body">
                    {/* Delivery Info */}
                    <div style={{ 
                      background: '#f0fff4', 
                      border: '1px solid #c6f6d5', 
                      borderRadius: '8px', 
                      padding: '12px',
                      marginBottom: '16px'
                    }}>
                      <div style={{ color: '#067d62', fontWeight: '700', fontSize: '14px' }}>
                        Arriving {deliveryOption?.date}
                      </div>
                      <div style={{ fontSize: '13px', color: '#0f1111' }}>
                        Items shipped from Amazon.com
                      </div>
                    </div>

                    {/* Review Items */}
                    <div className="amazon-checkout-review-items">
                        {cartItems.map((item, index) => (
                        <div key={item.id} className="amazon-checkout-review-item">
                          <div className="amazon-checkout-review-item-image">
                            <img
                              src={item.image || item.images?.[0] || '/images/placeholder-product.jpg'}
                              alt={item.title}
                              onError={(e) => {
                                e.target.src = '/images/placeholder-product.jpg';
                              }}
                            />
                          </div>
                          <div className="amazon-checkout-review-item-details">
                            <Link href={`/amazon/product/${item.id}`} className="amazon-checkout-review-item-title">
                              {item.title}
                            </Link>
                            <div className="amazon-checkout-review-item-qty">
                              Qty: {item.quantity}
                            </div>
                            <div className="amazon-checkout-review-item-price">
                                ${(item.price * item.quantity).toFixed(2)}
                            </div>
                            {item.prime && (
                              <div style={{ marginTop: '4px' }}>
                                <span style={{ 
                                  color: '#1b94c2', 
                                  fontWeight: 'bold', 
                                  fontStyle: 'italic',
                                  fontSize: '12px'
                                }}>prime</span>
                              </div>
                            )}
                            </div>
                          </div>
                        ))}
                    </div>

                    {/* Gift Option */}
                    <div className="amazon-checkout-gift-option">
                      <input 
                        type="checkbox" 
                        id="gift-order"
                        checked={isGiftOrder}
                        onChange={(e) => setIsGiftOrder(e.target.checked)}
                      />
                      <label htmlFor="gift-order">
                        <FaGift />
                          This order contains a gift
                      </label>
                    </div>

                    {/* Place Order Button */}
                    <button
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                      className="amazon-checkout-place-order-btn"
                      data-testid="place-order"
                    >
                      {isProcessing ? (
                        <span>Processing order...</span>
                      ) : (
                        `Place your order`
                      )}
                    </button>

                    <div className="amazon-checkout-terms">
                      By placing your order, you agree to Amazon's{' '}
                      <a href="/amazon/customer-service">privacy notice</a> and{' '}
                      <a href="/amazon/customer-service">conditions of use</a>.
                    </div>
                  </div>
                )}
                </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="amazon-checkout-sidebar">
              <div className="amazon-checkout-summary">
                {/* Place Order Button in Sidebar */}
                {currentStep === 3 && (
                  <div className="amazon-checkout-summary-header">
                    <button
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                      className="amazon-checkout-summary-place-btn"
                      data-testid="place-order-sidebar"
                    >
                      {isProcessing ? 'Processing...' : 'Place your order'}
                    </button>
                    <div className="amazon-checkout-summary-terms">
                      By placing your order, you agree to Amazon's <a href="/amazon/customer-service">privacy notice</a> and <a href="/amazon/customer-service">conditions of use</a>.
                    </div>
                  </div>
                )}

                <h3 className="amazon-checkout-summary-title">Order Summary</h3>
                
                <div className="amazon-checkout-summary-body">
                  <div className="amazon-checkout-summary-row">
                    <span>Items ({itemCount}):</span>
                    <span>${subtotal.toFixed(2)}</span>
                    </div>
                    
                  <div className="amazon-checkout-summary-row">
                    <span>Shipping & handling:</span>
                    <span className={shipping === 0 ? 'free' : ''}>
                        {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    
                  <div className="amazon-checkout-summary-row">
                    <span>Total before tax:</span>
                    <span>${(subtotal + shipping).toFixed(2)}</span>
                    </div>
                    
                  <div className="amazon-checkout-summary-row">
                    <span>Estimated tax to be collected:</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>

                  <div className="amazon-checkout-summary-row total">
                    <span>Order total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  {/* Delivery Estimate */}
                  {selectedDelivery && (
                    <div className="amazon-checkout-summary-delivery">
                      <div className="amazon-checkout-summary-delivery-title">
                        <FaTruck style={{ display: 'inline', marginRight: '6px' }} />
                        Delivery Estimate
                      </div>
                      <div className="amazon-checkout-summary-delivery-text">
                        {deliveryOption?.date}
                      </div>
                    </div>
                  )}

                  {/* Security Notice */}
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    marginTop: '16px', 
                    fontSize: '12px', 
                    color: '#565959' 
                  }}>
                    <FaShieldAlt style={{ marginRight: '6px', color: '#067d62' }} />
                    <span>Safe and secure checkout</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage; 
