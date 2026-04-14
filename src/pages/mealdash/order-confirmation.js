import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import MealDashHeader from '../../components/mealdash/MealDashHeader';
import { formatPrice, getOrderById } from '../../utils/mealDashData';
import { 
  FaCheckCircle,
  FaClock,
  FaMapMarkerAlt,
  FaPhone,
  FaReceipt,
  FaMotorcycle,
  FaArrowRight
} from 'react-icons/fa';

const OrderConfirmationPage = () => {
  const router = useRouter();
  const { orderId } = router.query;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trackingStatus, setTrackingStatus] = useState('confirmed');

  useEffect(() => {
    if (orderId) {
      loadOrderData();
    }
  }, [orderId]);

  const loadOrderData = () => {
    // Sample order data (in a real app, this would come from the database)
    const sampleOrder = {
      id: orderId || 'ORD-' + Date.now(),
      orderNumber: '#MD' + Math.floor(Math.random() * 1000000),
      status: 'Confirmed',
      estimatedDelivery: new Date(Date.now() + 35 * 60 * 1000), // 35 minutes from now
      placedAt: new Date(),
      restaurant: {
        id: 'burger-den',
        name: 'The Burger Den',
        phone: '(555) 123-4567',
        address: '123 Main St, Downtown'
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
      paymentMethod: {
        brand: 'Visa',
        last4: '1234'
      },
      pricing: {
        subtotal: 30.97,
        deliveryFee: 2.99,
        tax: 2.79,
        total: 36.75
      },
      deliveryInstructions: 'Please ring doorbell',
      phone: '(555) 987-6543'
    };

    setOrder(sampleOrder);
    setLoading(false);

    // Simulate order status updates
    setTimeout(() => setTrackingStatus('preparing'), 3000);
    setTimeout(() => setTrackingStatus('ready'), 8000);
    setTimeout(() => setTrackingStatus('picked_up'), 12000);
    setTimeout(() => setTrackingStatus('on_the_way'), 15000);
  };

  const formatAddress = (address) => {
    return `${address.street}${address.apt ? `, ${address.apt}` : ''}, ${address.city}, ${address.state} ${address.zipCode}`;
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusInfo = () => {
    const statuses = {
      confirmed: {
        title: 'Order Confirmed',
        description: 'We\'ve received your order and sent it to the restaurant',
        color: 'text-blue-600',
        bgColor: 'bg-blue-100',
        progress: 20
      },
      preparing: {
        title: 'Preparing Your Food',
        description: 'The restaurant is preparing your delicious meal',
        color: 'text-orange-600',
        bgColor: 'bg-orange-100',
        progress: 40
      },
      ready: {
        title: 'Order Ready',
        description: 'Your food is ready and waiting for pickup',
        color: 'text-purple-600',
        bgColor: 'bg-purple-100',
        progress: 60
      },
      picked_up: {
        title: 'Order Picked Up',
        description: 'A driver has picked up your order',
        color: 'text-indigo-600',
        bgColor: 'bg-indigo-100',
        progress: 80
      },
      on_the_way: {
        title: 'On the Way',
        description: 'Your order is on its way to you!',
        color: 'text-green-600',
        bgColor: 'bg-green-100',
        progress: 90
      },
      delivered: {
        title: 'Delivered',
        description: 'Your order has been delivered. Enjoy your meal!',
        color: 'text-green-600',
        bgColor: 'bg-green-100',
        progress: 100
      }
    };

    return statuses[trackingStatus] || statuses.confirmed;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Head>
          <title>Order Confirmation - MealDash</title>
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

  const statusInfo = getStatusInfo();

  return (
    <>
      <Head>
        <title>Order {order.orderNumber} - MealDash</title>
        <meta httpEquiv="Content-Language" content="en-US" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <MealDashHeader />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <FaCheckCircle className="text-green-600 text-2xl" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
            <p className="text-gray-600">
              Your order {order.orderNumber} has been placed successfully
            </p>
          </div>

          <div className="lg:flex lg:space-x-8">
            {/* Order Tracking */}
            <div className="lg:flex-1">
              {/* Status Card */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Order Status</h2>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusInfo.bgColor} ${statusInfo.color}`}>
                    {statusInfo.title}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${statusInfo.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600">{statusInfo.description}</p>
                </div>

                {/* Estimated Delivery */}
                <div className="flex items-center space-x-2 text-gray-600">
                  <FaClock />
                  <span>Estimated delivery: {formatTime(order.estimatedDelivery)}</span>
                </div>
              </div>

              {/* Delivery Details */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Delivery Details</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <FaMapMarkerAlt className="text-red-500 mt-1" />
                    <div>
                      <h3 className="font-medium text-gray-900">Delivery Address</h3>
                      <p className="text-gray-600">{formatAddress(order.deliveryAddress)}</p>
                    </div>
                  </div>

                  {order.deliveryInstructions && (
                    <div className="flex items-start space-x-3">
                      <FaReceipt className="text-gray-400 mt-1" />
                      <div>
                        <h3 className="font-medium text-gray-900">Delivery Instructions</h3>
                        <p className="text-gray-600">{order.deliveryInstructions}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start space-x-3">
                    <FaPhone className="text-gray-400 mt-1" />
                    <div>
                      <h3 className="font-medium text-gray-900">Contact Number</h3>
                      <p className="text-gray-600">{order.phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Restaurant Info */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Restaurant</h2>
                
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <FaMotorcycle className="text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{order.restaurant.name}</h3>
                    <p className="text-sm text-gray-600">{order.restaurant.address}</p>
                    <p className="text-sm text-gray-600">{order.restaurant.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-80">
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

                {/* Payment Info */}
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-2">Payment Method</h3>
                  <div className="flex items-center space-x-2">
                    <FaReceipt className="text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {order.paymentMethod.brand} •••• {order.paymentMethod.last4}
                    </span>
                  </div>
                </div>

                {/* Order Details */}
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Order Number:</strong> {order.orderNumber}</p>
                  <p><strong>Order Time:</strong> {order.placedAt.toLocaleString()}</p>
                </div>

                {/* Actions */}
                <div className="mt-6 space-y-3">
                  <Link href={`/mealdash/order-tracking?orderId=${order.id}`}>
                    <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors font-medium flex items-center justify-center space-x-2">
                      <span>Track Order</span>
                      <FaArrowRight />
                    </button>
                  </Link>
                  
                  <Link href="/mealdash">
                    <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                      Order Again
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderConfirmationPage;
