import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import MealDashHeader from '../../components/mealdash/MealDashHeader';
import { 
  formatPrice, 
  calculateSubtotal, 
  calculateTax, 
  calculateTotal,
  getRestaurantById 
} from '../../utils/mealDashData';
import { 
  FaPlus, 
  FaMinus, 
  FaTrash, 
  FaShoppingCart,
  FaArrowRight,
  FaClock,
  FaMapMarkerAlt,
  FaTag
} from 'react-icons/fa';

const CartPage = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);

  // Sample cart data (in a real app, this would come from state management or local storage)
  useEffect(() => {
    loadCartData();
  }, []);

  const loadCartData = () => {
    // Sample cart items for demonstration
    const sampleCartItems = [
      {
        id: 'cart-1',
        restaurantId: 'burger-den',
        menuItemId: 'classic-burger',
        name: 'Classic Cheeseburger',
        price: 12.99,
        quantity: 2,
        image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?w=400&h=300&fit=crop',
        customizations: {
          'Cheese': { option: 'Cheddar', price: 0 },
          'Add Bacon': { option: true, price: 2.00 }
        },
        specialInstructions: 'No pickles please'
      },
      {
        id: 'cart-2',
        restaurantId: 'burger-den',
        menuItemId: 'crispy-fries',
        name: 'Crispy French Fries',
        price: 4.99,
        quantity: 1,
        image: 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?w=400&h=300&fit=crop',
        customizations: {},
        specialInstructions: ''
      },
      {
        id: 'cart-3',
        restaurantId: 'pizza-palace',
        menuItemId: 'margherita-pizza',
        name: 'Margherita Pizza',
        price: 16.99,
        quantity: 1,
        image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?w=400&h=300&fit=crop',
        customizations: {
          'Size': { option: 'Medium (12")', price: 3.00 }
        },
        specialInstructions: 'Extra crispy crust'
      }
    ];
    
    setCartItems(sampleCartItems);
    setLoading(false);
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
      return;
    }
    
    setCartItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeItem = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const applyPromoCode = () => {
    // Sample promo codes
    const promoCodes = {
      'SAVE10': { discount: 0.10, type: 'percentage', description: '10% off your order' },
      'FREEDELIV': { discount: 2.99, type: 'fixed', description: 'Free delivery' },
      'WELCOME20': { discount: 0.20, type: 'percentage', description: '20% off first order' }
    };

    if (promoCodes[promoCode.toUpperCase()]) {
      setAppliedPromo(promoCodes[promoCode.toUpperCase()]);
      setPromoCode('');
    } else {
      alert('Invalid promo code');
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  const getItemTotal = (item) => {
    let total = item.price * item.quantity;
    
    // Add customization costs
    Object.values(item.customizations).forEach(custom => {
      if (custom.price > 0) {
        total += custom.price * item.quantity;
      }
    });
    
    return total;
  };

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + getItemTotal(item), 0);
  };

  const getDeliveryFee = () => {
    // Get delivery fee from the first restaurant (in reality, you'd group by restaurant)
    if (cartItems.length === 0) return 0;
    const restaurant = getRestaurantById(cartItems[0].restaurantId);
    return restaurant ? restaurant.deliveryFee : 2.99;
  };

  const getDiscount = () => {
    if (!appliedPromo) return 0;
    
    const subtotal = getSubtotal();
    if (appliedPromo.type === 'percentage') {
      return subtotal * appliedPromo.discount;
    } else {
      return appliedPromo.discount;
    }
  };

  const getTax = () => {
    const subtotal = getSubtotal();
    const discount = getDiscount();
    return calculateTax(subtotal - discount);
  };

  const getTotal = () => {
    const subtotal = getSubtotal();
    const deliveryFee = getDeliveryFee();
    const discount = getDiscount();
    const tax = getTax();
    
    return subtotal + deliveryFee - discount + tax;
  };

  const groupItemsByRestaurant = () => {
    const grouped = {};
    cartItems.forEach(item => {
      if (!grouped[item.restaurantId]) {
        grouped[item.restaurantId] = [];
      }
      grouped[item.restaurantId].push(item);
    });
    return grouped;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Head>
          <title>Cart - MealDash</title>
        </Head>
        <MealDashHeader cartItemCount={cartItems.length} />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600"></div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <>
        <Head>
          <title>Cart - MealDash</title>
          <meta httpEquiv="Content-Language" content="en-US" />
        </Head>
        
        <div className="min-h-screen bg-gray-50">
          <MealDashHeader cartItemCount={0} />
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <FaShoppingCart className="mx-auto text-gray-300 text-6xl mb-6" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
              <p className="text-gray-600 mb-8">
                Looks like you haven't added anything to your cart yet. Start browsing to find something delicious!
              </p>
              <Link href="/mealdash">
                <button className="bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 transition-colors font-medium">
                  Start Shopping
                </button>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Cart ({cartItems.length}) - MealDash</title>
        <meta httpEquiv="Content-Language" content="en-US" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <MealDashHeader cartItemCount={cartItems.length} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="lg:flex lg:space-x-8">
            {/* Cart Items */}
            <div className="lg:flex-1">
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-bold text-gray-900">
                    Your Cart ({cartItems.length} items)
                  </h1>
                  <button
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Clear all
                  </button>
                </div>

                {/* Group items by restaurant */}
                {Object.entries(groupItemsByRestaurant()).map(([restaurantId, items]) => {
                  const restaurant = getRestaurantById(restaurantId);
                  return (
                    <div key={restaurantId} className="mb-8">
                      {/* Restaurant Header */}
                      <div className="flex items-center space-x-3 mb-4 pb-3 border-b border-gray-200">
                        <img
                          src={restaurant?.logo}
                          alt={restaurant?.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{restaurant?.name}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <FaClock className="text-xs" />
                              <span>{restaurant?.deliveryTime}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <FaMapMarkerAlt className="text-xs" />
                              <span>{formatPrice(restaurant?.deliveryFee || 0)} delivery</span>
                            </div>
                          </div>
                        </div>
                        <Link href={`/mealdash/restaurant/${restaurantId}`}>
                          <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                            Add more items
                          </button>
                        </Link>
                      </div>

                      {/* Restaurant Items */}
                      <div className="space-y-4">
                        {items.map(item => (
                          <div key={item.id} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                            />
                            
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-900 mb-1">{item.name}</h4>
                              
                              {/* Customizations */}
                              {Object.keys(item.customizations).length > 0 && (
                                <div className="mb-2">
                                  {Object.entries(item.customizations).map(([key, value]) => (
                                    <div key={key} className="text-sm text-gray-600">
                                      {key}: {typeof value.option === 'boolean' ? (value.option ? 'Yes' : 'No') : value.option}
                                      {value.price > 0 && ` (+${formatPrice(value.price)})`}
                                    </div>
                                  ))}
                                </div>
                              )}
                              
                              {/* Special Instructions */}
                              {item.specialInstructions && (
                                <div className="text-sm text-gray-600 mb-2">
                                  Note: {item.specialInstructions}
                                </div>
                              )}
                              
                              <div className="flex items-center justify-between">
                                <span className="font-semibold text-gray-900">
                                  {formatPrice(getItemTotal(item))}
                                </span>
                                
                                {/* Quantity Controls */}
                                <div className="flex items-center space-x-3">
                                  <div className="flex items-center space-x-2">
                                    <button
                                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                      className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50"
                                    >
                                      <FaMinus size={12} />
                                    </button>
                                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                                    <button
                                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                      className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
                                    >
                                      <FaPlus size={12} />
                                    </button>
                                  </div>
                                  
                                  <button
                                    onClick={() => removeItem(item.id)}
                                    className="text-red-600 hover:text-red-700 p-1"
                                  >
                                    <FaTrash size={14} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-96">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
                
                {/* Promo Code */}
                <div className="mb-4">
                  <div className="flex space-x-2 mb-2">
                    <input
                      type="text"
                      placeholder="Promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                    <button
                      onClick={applyPromoCode}
                      className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                    >
                      Apply
                    </button>
                  </div>
                  
                  {appliedPromo && (
                    <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <FaTag className="text-green-600" />
                        <span className="text-sm text-green-800">{appliedPromo.description}</span>
                      </div>
                      <button
                        onClick={removePromoCode}
                        className="text-green-600 hover:text-green-700"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{formatPrice(getSubtotal())}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery fee</span>
                    <span className="font-medium">{formatPrice(getDeliveryFee())}</span>
                  </div>
                  
                  {appliedPromo && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-{formatPrice(getDiscount())}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">{formatPrice(getTax())}</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold">Total</span>
                      <span className="text-lg font-bold text-red-600">{formatPrice(getTotal())}</span>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <Link href="/mealdash/checkout">
                  <button className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors font-medium flex items-center justify-center space-x-2">
                    <span>Go to Checkout</span>
                    <FaArrowRight />
                  </button>
                </Link>

                {/* Continue Shopping */}
                <Link href="/mealdash">
                  <button className="w-full mt-3 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                    Continue Shopping
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
