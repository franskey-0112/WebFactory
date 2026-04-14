import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import MealDashHeader from '../../components/mealdash/MealDashHeader';
import { 
  formatPrice, 
  getRestaurantById,
  createOrder 
} from '../../utils/mealDashData';
import { 
  FaCreditCard,
  FaMapMarkerAlt,
  FaClock,
  FaShieldAlt,
  FaEdit,
  FaCheck,
  FaArrowLeft
} from 'react-icons/fa';

const CheckoutPage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [orderData, setOrderData] = useState({
    items: [],
    deliveryAddress: null,
    paymentMethod: null,
    deliveryInstructions: '',
    phone: '',
    subtotal: 0,
    deliveryFee: 0,
    tax: 0,
    total: 0
  });
  
  const [addresses, setAddresses] = useState([
    {
      id: 'addr-1',
      type: 'Home',
      street: '123 Main St',
      apt: 'Apt 4B',
      city: 'Downtown',
      state: 'CA',
      zipCode: '90210',
      isDefault: true
    },
    {
      id: 'addr-2',
      type: 'Work',
      street: '456 Office Blvd',
      apt: 'Suite 200',
      city: 'Financial District',
      state: 'CA',
      zipCode: '90211',
      isDefault: false
    }
  ]);

  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 'card-1',
      type: 'Credit Card',
      brand: 'Visa',
      last4: '1234',
      expiryMonth: '12',
      expiryYear: '25',
      isDefault: true
    },
    {
      id: 'card-2',
      type: 'Credit Card',
      brand: 'Mastercard',
      last4: '5678',
      expiryMonth: '08',
      expiryYear: '26',
      isDefault: false
    }
  ]);

  const [newAddress, setNewAddress] = useState({
    type: 'Home',
    street: '',
    apt: '',
    city: '',
    state: 'CA',
    zipCode: ''
  });

  const [newCard, setNewCard] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    nameOnCard: '',
    zipCode: ''
  });

  const [showAddAddress, setShowAddAddress] = useState(false);
  const [showAddCard, setShowAddCard] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  useEffect(() => {
    loadCheckoutData();
  }, []);

  const loadCheckoutData = () => {
    // Load cart data (in a real app, this would come from state management)
    const sampleCartItems = [
      {
        id: 'cart-1',
        restaurantId: 'burger-den',
        name: 'Classic Cheeseburger',
        price: 12.99,
        quantity: 2,
        image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?w=400&h=300&fit=crop'
      },
      {
        id: 'cart-2',
        restaurantId: 'burger-den',
        name: 'Crispy French Fries',
        price: 4.99,
        quantity: 1,
        image: 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?w=400&h=300&fit=crop'
      }
    ];

    const subtotal = sampleCartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const deliveryFee = 2.99;
    const tax = subtotal * 0.09;
    const total = subtotal + deliveryFee + tax;

    setOrderData({
      items: sampleCartItems,
      deliveryAddress: addresses.find(addr => addr.isDefault),
      paymentMethod: paymentMethods.find(method => method.isDefault),
      deliveryInstructions: '',
      phone: '',
      subtotal,
      deliveryFee,
      tax,
      total
    });
  };

  const handleAddressSelect = (address) => {
    setOrderData(prev => ({ ...prev, deliveryAddress: address }));
  };

  const handlePaymentSelect = (payment) => {
    setOrderData(prev => ({ ...prev, paymentMethod: payment }));
  };

  const addNewAddress = () => {
    if (!newAddress.street || !newAddress.city || !newAddress.zipCode) {
      alert('Please fill in all required fields');
      return;
    }

    const address = {
      id: `addr-${Date.now()}`,
      ...newAddress,
      isDefault: false
    };

    setAddresses(prev => [...prev, address]);
    setOrderData(prev => ({ ...prev, deliveryAddress: address }));
    setNewAddress({
      type: 'Home',
      street: '',
      apt: '',
      city: '',
      state: 'CA',
      zipCode: ''
    });
    setShowAddAddress(false);
  };

  const addNewCard = () => {
    if (!newCard.cardNumber || !newCard.expiryMonth || !newCard.expiryYear || !newCard.cvv || !newCard.nameOnCard) {
      alert('Please fill in all required fields');
      return;
    }

    const card = {
      id: `card-${Date.now()}`,
      type: 'Credit Card',
      brand: 'Visa', // In real app, detect from card number
      last4: newCard.cardNumber.slice(-4),
      expiryMonth: newCard.expiryMonth,
      expiryYear: newCard.expiryYear,
      isDefault: false
    };

    setPaymentMethods(prev => [...prev, card]);
    setOrderData(prev => ({ ...prev, paymentMethod: card }));
    setNewCard({
      cardNumber: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      nameOnCard: '',
      zipCode: ''
    });
    setShowAddCard(false);
  };

  const placeOrder = async () => {
    if (!orderData.deliveryAddress || !orderData.paymentMethod) {
      alert('Please select delivery address and payment method');
      return;
    }

    setIsPlacingOrder(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const order = createOrder({
        items: orderData.items,
        deliveryAddress: orderData.deliveryAddress,
        paymentMethod: orderData.paymentMethod,
        deliveryInstructions: orderData.deliveryInstructions,
        phone: orderData.phone,
        subtotal: orderData.subtotal,
        deliveryFee: orderData.deliveryFee,
        tax: orderData.tax,
        total: orderData.total
      });

      // Redirect to order confirmation
      router.push(`/mealdash/order-confirmation?orderId=${order.id}`);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const formatAddress = (address) => {
    return `${address.street}${address.apt ? `, ${address.apt}` : ''}, ${address.city}, ${address.state} ${address.zipCode}`;
  };

  const steps = [
    { id: 1, name: 'Delivery', icon: FaMapMarkerAlt },
    { id: 2, name: 'Payment', icon: FaCreditCard },
    { id: 3, name: 'Review', icon: FaCheck }
  ];

  return (
    <>
      <Head>
        <title>Checkout - MealDash</title>
        <meta httpEquiv="Content-Language" content="en-US" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <MealDashHeader cartItemCount={orderData.items.length} />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Header */}
          <div className="flex items-center space-x-4 mb-8">
            <Link href="/mealdash/cart">
              <button className="text-gray-600 hover:text-gray-900 p-2">
                <FaArrowLeft />
              </button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`
                    flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors
                    ${isActive ? 'border-red-500 bg-red-500 text-white' : 
                      isCompleted ? 'border-green-500 bg-green-500 text-white' : 
                      'border-gray-300 bg-white text-gray-400'}
                  `}>
                    {isCompleted ? <FaCheck size={14} /> : <IconComponent size={14} />}
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    isActive ? 'text-red-600' : isCompleted ? 'text-green-600' : 'text-gray-400'
                  }`}>
                    {step.name}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-px mx-4 ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>

          <div className="lg:flex lg:space-x-8">
            {/* Main Content */}
            <div className="lg:flex-1">
              {/* Step 1: Delivery Address */}
              {currentStep === 1 && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">Delivery Address</h2>
                  
                  <div className="space-y-4 mb-6">
                    {addresses.map(address => (
                      <div
                        key={address.id}
                        onClick={() => handleAddressSelect(address)}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          orderData.deliveryAddress?.id === address.id
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium text-gray-900">{address.type}</span>
                              {address.isDefault && (
                                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-gray-600">{formatAddress(address)}</p>
                          </div>
                          <button className="text-gray-400 hover:text-gray-600">
                            <FaEdit />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add New Address */}
                  {!showAddAddress ? (
                    <button
                      onClick={() => setShowAddAddress(true)}
                      className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors"
                    >
                      + Add new address
                    </button>
                  ) : (
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-4">Add New Address</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Address Type
                          </label>
                          <select
                            value={newAddress.type}
                            onChange={(e) => setNewAddress(prev => ({ ...prev, type: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          >
                            <option value="Home">Home</option>
                            <option value="Work">Work</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Street Address *
                          </label>
                          <input
                            type="text"
                            value={newAddress.street}
                            onChange={(e) => setNewAddress(prev => ({ ...prev, street: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            placeholder="123 Main St"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Apt/Suite
                          </label>
                          <input
                            type="text"
                            value={newAddress.apt}
                            onChange={(e) => setNewAddress(prev => ({ ...prev, apt: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            placeholder="Apt 4B"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            City *
                          </label>
                          <input
                            type="text"
                            value={newAddress.city}
                            onChange={(e) => setNewAddress(prev => ({ ...prev, city: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            placeholder="Downtown"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            State
                          </label>
                          <select
                            value={newAddress.state}
                            onChange={(e) => setNewAddress(prev => ({ ...prev, state: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          >
                            <option value="CA">California</option>
                            <option value="NY">New York</option>
                            <option value="TX">Texas</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            ZIP Code *
                          </label>
                          <input
                            type="text"
                            value={newAddress.zipCode}
                            onChange={(e) => setNewAddress(prev => ({ ...prev, zipCode: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            placeholder="90210"
                          />
                        </div>
                      </div>
                      <div className="flex space-x-3 mt-4">
                        <button
                          onClick={addNewAddress}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                        >
                          Add Address
                        </button>
                        <button
                          onClick={() => setShowAddAddress(false)}
                          className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end mt-6">
                    <button
                      onClick={() => setCurrentStep(2)}
                      disabled={!orderData.deliveryAddress}
                      className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Payment Method */}
              {currentStep === 2 && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">Payment Method</h2>
                  
                  <div className="space-y-4 mb-6">
                    {paymentMethods.map(method => (
                      <div
                        key={method.id}
                        onClick={() => handlePaymentSelect(method)}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          orderData.paymentMethod?.id === method.id
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <FaCreditCard className="text-gray-400" />
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="font-medium text-gray-900">
                                  {method.brand} •••• {method.last4}
                                </span>
                                {method.isDefault && (
                                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                    Default
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600">
                                Expires {method.expiryMonth}/{method.expiryYear}
                              </p>
                            </div>
                          </div>
                          <button className="text-gray-400 hover:text-gray-600">
                            <FaEdit />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add New Card */}
                  {!showAddCard ? (
                    <button
                      onClick={() => setShowAddCard(true)}
                      className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors"
                    >
                      + Add new payment method
                    </button>
                  ) : (
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-4">Add New Card</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Card Number *
                          </label>
                          <input
                            type="text"
                            value={newCard.cardNumber}
                            onChange={(e) => setNewCard(prev => ({ ...prev, cardNumber: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry Month *
                          </label>
                          <select
                            value={newCard.expiryMonth}
                            onChange={(e) => setNewCard(prev => ({ ...prev, expiryMonth: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          >
                            <option value="">Month</option>
                            {Array.from({length: 12}, (_, i) => (
                              <option key={i} value={String(i + 1).padStart(2, '0')}>
                                {String(i + 1).padStart(2, '0')}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry Year *
                          </label>
                          <select
                            value={newCard.expiryYear}
                            onChange={(e) => setNewCard(prev => ({ ...prev, expiryYear: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          >
                            <option value="">Year</option>
                            {Array.from({length: 10}, (_, i) => (
                              <option key={i} value={String(new Date().getFullYear() + i).slice(-2)}>
                                {new Date().getFullYear() + i}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            CVV *
                          </label>
                          <input
                            type="text"
                            value={newCard.cvv}
                            onChange={(e) => setNewCard(prev => ({ ...prev, cvv: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            placeholder="123"
                            maxLength="4"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Name on Card *
                          </label>
                          <input
                            type="text"
                            value={newCard.nameOnCard}
                            onChange={(e) => setNewCard(prev => ({ ...prev, nameOnCard: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            placeholder="John Doe"
                          />
                        </div>
                      </div>
                      <div className="flex space-x-3 mt-4">
                        <button
                          onClick={addNewCard}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                        >
                          Add Card
                        </button>
                        <button
                          onClick={() => setShowAddCard(false)}
                          className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between mt-6">
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setCurrentStep(3)}
                      disabled={!orderData.paymentMethod}
                      className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      Review Order
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Review Order */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  {/* Order Items */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h2>
                    <div className="space-y-4">
                      {orderData.items.map(item => (
                        <div key={item.id} className="flex items-center space-x-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{item.name}</h4>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          </div>
                          <span className="font-semibold text-gray-900">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery Details */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Delivery Details</h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium text-gray-900">Delivery Address</h3>
                        <p className="text-gray-600">{formatAddress(orderData.deliveryAddress)}</p>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Estimated Delivery Time</h3>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <FaClock />
                          <span>25-40 minutes</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Delivery Instructions (Optional)
                        </label>
                        <textarea
                          value={orderData.deliveryInstructions}
                          onChange={(e) => setOrderData(prev => ({ ...prev, deliveryInstructions: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          rows="3"
                          placeholder="Please ring doorbell, leave at door, etc."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={orderData.phone}
                          onChange={(e) => setOrderData(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Details */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h2>
                    <div className="flex items-center space-x-3">
                      <FaCreditCard className="text-gray-400" />
                      <span className="font-medium text-gray-900">
                        {orderData.paymentMethod?.brand} •••• {orderData.paymentMethod?.last4}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={placeOrder}
                      disabled={isPlacingOrder}
                      className="bg-red-500 text-white px-8 py-2 rounded-lg hover:bg-red-600 transition-colors disabled:bg-red-300 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                      {isPlacingOrder ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Placing Order...</span>
                        </>
                      ) : (
                        <span>Place Order</span>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:w-80 mt-6 lg:mt-0">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{formatPrice(orderData.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery fee</span>
                    <span className="font-medium">{formatPrice(orderData.deliveryFee)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">{formatPrice(orderData.tax)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold">Total</span>
                      <span className="text-lg font-bold text-red-600">{formatPrice(orderData.total)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <FaShieldAlt className="text-green-500" />
                  <span>Your payment information is secure</span>
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
