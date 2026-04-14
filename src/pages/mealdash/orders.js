import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import MealDashHeader from '../../components/mealdash/MealDashHeader';
import { formatPrice, getRestaurantById } from '../../utils/mealDashData';
import { 
  FaReceipt, 
  FaClock, 
  FaCheckCircle, 
  FaArrowRight,
  FaMotorcycle,
  FaStar,
  FaRedo
} from 'react-icons/fa';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    // Sample order history (in a real app, this would come from backend)
    const sampleOrders = [
      {
        id: 'order-1',
        orderNumber: '#MD123456',
        restaurantId: 'burger-den',
        restaurantName: 'The Burger Den',
        restaurantLogo: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?w=100&h=100&fit=crop',
        status: 'delivered',
        statusText: 'Delivered',
        orderDate: new Date('2024-03-14T19:30:00'),
        deliveryTime: new Date('2024-03-14T20:15:00'),
        items: [
          { name: 'Classic Cheeseburger', quantity: 2, price: 12.99 },
          { name: 'Crispy French Fries', quantity: 1, price: 4.99 }
        ],
        total: 36.75,
        rating: null
      },
      {
        id: 'order-2',
        orderNumber: '#MD123455',
        restaurantId: 'pizza-palace',
        restaurantName: 'Pizza Palace',
        restaurantLogo: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?w=100&h=100&fit=crop',
        status: 'delivered',
        statusText: 'Delivered',
        orderDate: new Date('2024-03-13T18:45:00'),
        deliveryTime: new Date('2024-03-13T19:25:00'),
        items: [
          { name: 'Margherita Pizza', quantity: 1, price: 16.99 },
          { name: 'Caesar Salad', quantity: 1, price: 8.99 }
        ],
        total: 29.47,
        rating: 5
      },
      {
        id: 'order-3',
        orderNumber: '#MD123454',
        restaurantId: 'taco-fiesta',
        restaurantName: 'Taco Fiesta',
        restaurantLogo: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?w=100&h=100&fit=crop',
        status: 'on_the_way',
        statusText: 'On the way',
        orderDate: new Date('2024-03-15T12:15:00'),
        estimatedDelivery: new Date('2024-03-15T13:00:00'),
        items: [
          { name: 'Grilled Chicken Tacos', quantity: 1, price: 9.99 },
          { name: 'Beef Burrito', quantity: 1, price: 11.99 }
        ],
        total: 25.47,
        rating: null
      },
      {
        id: 'order-4',
        orderNumber: '#MD123453',
        restaurantId: 'healthy-bowls',
        restaurantName: 'Healthy Bowls Co.',
        restaurantLogo: 'https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?w=100&h=100&fit=crop',
        status: 'cancelled',
        statusText: 'Cancelled',
        orderDate: new Date('2024-03-12T14:20:00'),
        items: [
          { name: 'Power Bowl', quantity: 1, price: 14.99 }
        ],
        total: 18.98,
        rating: null,
        cancelReason: 'Restaurant was closed'
      },
      {
        id: 'order-5',
        orderNumber: '#MD123452',
        restaurantId: 'coffee-corner',
        restaurantName: 'Coffee Corner',
        restaurantLogo: 'https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg?w=100&h=100&fit=crop',
        status: 'delivered',
        statusText: 'Delivered',
        orderDate: new Date('2024-03-11T08:30:00'),
        deliveryTime: new Date('2024-03-11T08:50:00'),
        items: [
          { name: 'Cappuccino', quantity: 2, price: 4.99 },
          { name: 'Avocado Toast', quantity: 1, price: 8.99 }
        ],
        total: 21.46,
        rating: 4
      }
    ];

    setOrders(sampleOrders);
    setLoading(false);
  };

  const getFilteredOrders = () => {
    switch (activeTab) {
      case 'active':
        return orders.filter(order => ['preparing', 'on_the_way', 'confirmed'].includes(order.status));
      case 'delivered':
        return orders.filter(order => order.status === 'delivered');
      case 'cancelled':
        return orders.filter(order => order.status === 'cancelled');
      default:
        return orders;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <FaCheckCircle className="text-green-500" />;
      case 'on_the_way':
        return <FaMotorcycle className="text-blue-500" />;
      case 'cancelled':
        return <FaClock className="text-red-500" />;
      default:
        return <FaClock className="text-orange-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'text-green-600 bg-green-100';
      case 'on_the_way':
        return 'text-blue-600 bg-blue-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-orange-600 bg-orange-100';
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const reorderItems = (order) => {
    console.log('Reordering:', order);
    // In a real app, this would add items to cart and redirect to restaurant
    alert(`Added ${order.items.length} items to cart from ${order.restaurantName}`);
  };

  const rateOrder = (orderId, rating) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId 
          ? { ...order, rating }
          : order
      )
    );
  };

  const filteredOrders = getFilteredOrders();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Head>
          <title>Orders - MealDash</title>
        </Head>
        <MealDashHeader />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Your Orders - MealDash</title>
        <meta name="description" content="View your order history on MealDash" />
        <meta httpEquiv="Content-Language" content="en-US" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <MealDashHeader />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <FaReceipt className="text-red-500 text-2xl" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Orders</h1>
            <p className="text-gray-600">Track your order history and reorder your favorites</p>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'all', label: 'All Orders', count: orders.length },
                { id: 'active', label: 'Active', count: orders.filter(o => ['preparing', 'on_the_way', 'confirmed'].includes(o.status)).length },
                { id: 'delivered', label: 'Delivered', count: orders.filter(o => o.status === 'delivered').length },
                { id: 'cancelled', label: 'Cancelled', count: orders.filter(o => o.status === 'cancelled').length }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </nav>
          </div>

          {/* Orders List */}
          {filteredOrders.length > 0 ? (
            <div className="space-y-6">
              {filteredOrders.map(order => (
                <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  {/* Order Header */}
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img
                          src={order.restaurantLogo}
                          alt={order.restaurantName}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900">{order.restaurantName}</h3>
                          <div className="flex items-center space-x-3 text-sm text-gray-600">
                            <span>{order.orderNumber}</span>
                            <span>•</span>
                            <span>{formatDate(order.orderDate)}</span>
                            <span>•</span>
                            <span>{formatTime(order.orderDate)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          <span>{order.statusText}</span>
                        </div>
                        <span className="font-semibold text-lg">{formatPrice(order.total)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-6">
                    <div className="space-y-2 mb-4">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            {item.quantity}x {item.name}
                          </span>
                          <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>

                    {/* Order Status Info */}
                    {order.status === 'delivered' && order.deliveryTime && (
                      <div className="text-sm text-gray-600 mb-4">
                        Delivered at {formatTime(order.deliveryTime)}
                      </div>
                    )}
                    
                    {order.status === 'on_the_way' && order.estimatedDelivery && (
                      <div className="text-sm text-green-600 mb-4">
                        Estimated delivery: {formatTime(order.estimatedDelivery)}
                      </div>
                    )}
                    
                    {order.status === 'cancelled' && order.cancelReason && (
                      <div className="text-sm text-red-600 mb-4">
                        Cancelled: {order.cancelReason}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {/* Rating for delivered orders */}
                        {order.status === 'delivered' && (
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">Rate:</span>
                            <div className="flex space-x-1">
                              {[1, 2, 3, 4, 5].map(star => (
                                <button
                                  key={star}
                                  onClick={() => rateOrder(order.id, star)}
                                  className={`text-lg ${
                                    order.rating && star <= order.rating
                                      ? 'text-yellow-400'
                                      : 'text-gray-300 hover:text-yellow-400'
                                  }`}
                                >
                                  <FaStar />
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Track active orders */}
                        {['on_the_way', 'preparing', 'confirmed'].includes(order.status) && (
                          <Link href={`/mealdash/order-tracking?orderId=${order.id}`}>
                            <button className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center space-x-1">
                              <span>Track Order</span>
                              <FaArrowRight size={12} />
                            </button>
                          </Link>
                        )}
                      </div>

                      <div className="flex space-x-3">
                        {/* Reorder button */}
                        <button
                          onClick={() => reorderItems(order)}
                          className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 font-medium"
                        >
                          <FaRedo size={12} />
                          <span>Reorder</span>
                        </button>

                        {/* View restaurant */}
                        <Link href={`/mealdash/restaurant/${order.restaurantId}`}>
                          <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                            View Restaurant
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <FaReceipt className="mx-auto text-gray-300 text-6xl mb-6" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {activeTab === 'all' ? 'No orders yet' : `No ${activeTab} orders`}
                </h2>
                <p className="text-gray-600 mb-8">
                  {activeTab === 'all' 
                    ? "You haven't placed any orders yet. Start browsing to find something delicious!"
                    : `You don't have any ${activeTab} orders at the moment.`
                  }
                </p>
                <Link href="/mealdash">
                  <button className="bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 transition-colors font-medium">
                    Start Ordering
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OrdersPage;
