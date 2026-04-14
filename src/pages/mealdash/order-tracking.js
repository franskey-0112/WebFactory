import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import MealDashHeader from '../../components/mealdash/MealDashHeader';
import { formatPrice } from '../../utils/mealDashData';
import { 
  FaCheckCircle,
  FaClock,
  FaMapMarkerAlt,
  FaPhone,
  FaMotorcycle,
  FaArrowLeft,
  FaStore,
  FaUtensils,
  FaBoxOpen,
  FaTruck
} from 'react-icons/fa';

const OrderTrackingPage = () => {
  const router = useRouter();
  const { orderId } = router.query;
  const [order, setOrder] = useState(null);
  const [currentStatus, setCurrentStatus] = useState('confirmed');
  const [loading, setLoading] = useState(true);
  const [driver, setDriver] = useState(null);

  useEffect(() => {
    if (orderId) {
      loadOrderData();
    }
  }, [orderId]);

  const loadOrderData = () => {
    // Sample order data
    const sampleOrder = {
      id: orderId || 'ORD-' + Date.now(),
      orderNumber: '#MD' + Math.floor(Math.random() * 1000000),
      status: 'On the way',
      estimatedDelivery: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes from now
      placedAt: new Date(Date.now() - 20 * 60 * 1000), // 20 minutes ago
      restaurant: {
        id: 'burger-den',
        name: 'The Burger Den',
        phone: '(555) 123-4567',
        address: '123 Main St, Downtown',
        logo: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?w=100&h=100&fit=crop'
      },
      items: [
        {
          id: 'item-1',
          name: 'Classic Cheeseburger',
          price: 12.99,
          quantity: 2,
          image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?w=400&h=300&fit=crop'
        },
        {
          id: 'item-2',
          name: 'Crispy French Fries',
          price: 4.99,
          quantity: 1,
          image: 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?w=400&h=300&fit=crop'
        }
      ],
      deliveryAddress: {
        street: '123 Main St',
        apt: 'Apt 4B',
        city: 'Downtown',
        state: 'CA',
        zipCode: '90210'
      },
      pricing: {
        subtotal: 30.97,
        deliveryFee: 2.99,
        tax: 2.79,
        total: 36.75
      }
    };

    const sampleDriver = {
      id: 'driver-1',
      name: 'Alex Johnson',
      photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=100&h=100&fit=crop',
      phone: '(555) 987-6543',
      rating: 4.9,
      vehicle: 'Toyota Prius - ABC 123',
      eta: '12 minutes away'
    };

    setOrder(sampleOrder);
    setDriver(sampleDriver);
    setCurrentStatus('on_the_way');
    setLoading(false);

    // Simulate real-time updates
    setTimeout(() => setCurrentStatus('delivered'), 10000);
  };

  const getOrderStatuses = () => [
    {
      id: 'confirmed',
      title: 'Order Confirmed',
      description: 'We received your order',
      icon: FaCheckCircle,
      time: new Date(Date.now() - 20 * 60 * 1000),
      completed: true
    },
    {
      id: 'preparing',
      title: 'Preparing',
      description: 'Restaurant is preparing your food',
      icon: FaUtensils,
      time: new Date(Date.now() - 15 * 60 * 1000),
      completed: ['preparing', 'ready', 'picked_up', 'on_the_way', 'delivered'].includes(currentStatus)
    },
    {
      id: 'ready',
      title: 'Ready for Pickup',
      description: 'Your order is ready',
      icon: FaBoxOpen,
      time: new Date(Date.now() - 8 * 60 * 1000),
      completed: ['ready', 'picked_up', 'on_the_way', 'delivered'].includes(currentStatus)
    },
    {
      id: 'picked_up',
      title: 'Picked Up',
      description: 'Driver picked up your order',
      icon: FaTruck,
      time: new Date(Date.now() - 5 * 60 * 1000),
      completed: ['picked_up', 'on_the_way', 'delivered'].includes(currentStatus)
    },
    {
      id: 'on_the_way',
      title: 'On the Way',
      description: 'Your order is on its way',
      icon: FaMotorcycle,
      time: currentStatus === 'on_the_way' ? new Date() : null,
      completed: ['on_the_way', 'delivered'].includes(currentStatus),
      active: currentStatus === 'on_the_way'
    },
    {
      id: 'delivered',
      title: 'Delivered',
      description: 'Order delivered successfully',
      icon: FaCheckCircle,
      time: currentStatus === 'delivered' ? new Date() : null,
      completed: currentStatus === 'delivered',
      active: currentStatus === 'delivered'
    }
  ];

  const formatTime = (date) => {
    if (!date) return '';
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatAddress = (address) => {
    return `${address.street}${address.apt ? `, ${address.apt}` : ''}, ${address.city}, ${address.state} ${address.zipCode}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Head>
          <title>Order Tracking - MealDash</title>
        </Head>
        <MealDashHeader />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600"></div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <>
        <Head>
          <title>Order Not Found - MealDash</title>
        </Head>
        <div className="min-h-screen bg-gray-50">
          <MealDashHeader />
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h1>
            <Link href="/mealdash">
              <button className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600">
                Back to Home
              </button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  const orderStatuses = getOrderStatuses();

  return (
    <>
      <Head>
        <title>Track Order {order.orderNumber} - MealDash</title>
        <meta httpEquiv="Content-Language" content="en-US" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <MealDashHeader />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Header */}
          <div className="flex items-center space-x-4 mb-8">
            <Link href="/mealdash">
              <button className="text-gray-600 hover:text-gray-900 p-2">
                <FaArrowLeft />
              </button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Track Your Order</h1>
              <p className="text-gray-600">{order.orderNumber}</p>
            </div>
          </div>

          <div className="lg:flex lg:space-x-8">
            {/* Main Content */}
            <div className="lg:flex-1">
              {/* Current Status */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Order Status</h2>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <FaClock />
                    <span>ETA: {formatTime(order.estimatedDelivery)}</span>
                  </div>
                </div>

                {/* Progress Timeline */}
                <div className="space-y-6">
                  {orderStatuses.map((status, index) => {
                    const IconComponent = status.icon;
                    const isLast = index === orderStatuses.length - 1;
                    
                    return (
                      <div key={status.id} className="flex items-start space-x-4">
                        {/* Icon */}
                        <div className={`
                          flex items-center justify-center w-10 h-10 rounded-full border-2 flex-shrink-0
                          ${status.completed 
                            ? 'bg-green-500 border-green-500 text-white' 
                            : status.active
                            ? 'bg-red-500 border-red-500 text-white animate-pulse'
                            : 'bg-gray-100 border-gray-300 text-gray-400'
                          }
                        `}>
                          <IconComponent size={16} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className={`font-medium ${
                              status.completed || status.active ? 'text-gray-900' : 'text-gray-500'
                            }`}>
                              {status.title}
                            </h3>
                            {status.time && (
                              <span className="text-sm text-gray-500">
                                {formatTime(status.time)}
                              </span>
                            )}
                          </div>
                          <p className={`text-sm ${
                            status.completed || status.active ? 'text-gray-600' : 'text-gray-400'
                          }`}>
                            {status.description}
                          </p>
                        </div>

                        {/* Connector Line */}
                        {!isLast && (
                          <div className={`
                            absolute left-9 w-px h-6 mt-10
                            ${status.completed ? 'bg-green-500' : 'bg-gray-300'}
                          `} style={{ marginLeft: '1.25rem' }} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Driver Info */}
              {(currentStatus === 'on_the_way' || currentStatus === 'picked_up') && driver && (
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Driver</h2>
                  
                  <div className="flex items-center space-x-4">
                    <img
                      src={driver.photo}
                      alt={driver.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{driver.name}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <span>⭐ {driver.rating}</span>
                        <span>•</span>
                        <span>{driver.vehicle}</span>
                      </div>
                      <p className="text-sm text-green-600 font-medium">{driver.eta}</p>
                    </div>
                    <div className="flex space-x-2">
                      <a
                        href={`tel:${driver.phone}`}
                        className="bg-gray-100 text-gray-700 p-3 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <FaPhone />
                      </a>
                      <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm font-medium">
                        Message
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Restaurant Info */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Restaurant</h2>
                
                <div className="flex items-center space-x-4">
                  <img
                    src={order.restaurant.logo}
                    alt={order.restaurant.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{order.restaurant.name}</h3>
                    <p className="text-sm text-gray-600">{order.restaurant.address}</p>
                  </div>
                  <a
                    href={`tel:${order.restaurant.phone}`}
                    className="bg-gray-100 text-gray-700 p-3 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <FaPhone />
                  </a>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Delivery Address</h2>
                
                <div className="flex items-start space-x-3">
                  <FaMapMarkerAlt className="text-red-500 mt-1" />
                  <div>
                    <p className="text-gray-900">{formatAddress(order.deliveryAddress)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:w-80 mt-6 lg:mt-0">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
                
                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  {order.items.map(item => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 text-sm truncate">{item.name}</h4>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-medium text-gray-900 text-sm">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{formatPrice(order.pricing.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivery fee</span>
                    <span className="font-medium">{formatPrice(order.pricing.deliveryFee)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">{formatPrice(order.pricing.tax)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="font-bold text-red-600">{formatPrice(order.pricing.total)}</span>
                    </div>
                  </div>
                </div>

                {/* Order Info */}
                <div className="text-sm text-gray-600 space-y-1 mb-6">
                  <p><strong>Order Number:</strong> {order.orderNumber}</p>
                  <p><strong>Order Time:</strong> {formatTime(order.placedAt)}</p>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  {currentStatus === 'delivered' && (
                    <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors font-medium">
                      Rate Your Order
                    </button>
                  )}
                  
                  <Link href="/mealdash">
                    <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                      Order Again
                    </button>
                  </Link>

                  <button className="w-full text-red-600 py-2 rounded-lg hover:bg-red-50 transition-colors font-medium text-sm">
                    Need Help?
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderTrackingPage;
