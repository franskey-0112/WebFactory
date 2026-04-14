import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import MealDashHeader from '../../../components/mealdash/MealDashHeader';
import MenuItemCard from '../../../components/mealdash/MenuItemCard';
import { 
  getRestaurantById, 
  getMenuItems,
  getMenuItemsByCategory,
  formatPrice 
} from '../../../utils/mealDashData';
import { 
  FaStar, 
  FaClock, 
  FaMotorcycle, 
  FaMapMarkerAlt, 
  FaPhone,
  FaHeart,
  FaShare,
  FaSearch,
  FaInfo
} from 'react-icons/fa';

const RestaurantDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadRestaurantData();
    }
  }, [id]);

  useEffect(() => {
    filterMenuItems();
  }, [menuItems, activeCategory, searchQuery]);

  const loadRestaurantData = async () => {
    try {
      setLoading(true);
      const restaurantData = getRestaurantById(id);
      const menuData = getMenuItems(id);
      
      if (!restaurantData) {
        router.push('/mealdash');
        return;
      }
      
      setRestaurant(restaurantData);
      setMenuItems(menuData);
    } catch (error) {
      console.error('Error loading restaurant data:', error);
      router.push('/mealdash');
    } finally {
      setLoading(false);
    }
  };

  const filterMenuItems = () => {
    let filtered = menuItems;

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(item => item.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      );
    }

    setFilteredItems(filtered);
  };

  const handleAddToCart = (item, customizations = {}) => {
    const selectedSize = customizations.selectedSize;
    const finalPrice = selectedSize ? selectedSize.price : item.price;
    const itemName = selectedSize ? `${item.name} (${selectedSize.name})` : item.name;
    
    const cartItem = {
      id: `${item.id}_${Date.now()}`,
      menuItemId: item.id,
      name: itemName,
      price: finalPrice,
      image: item.image,
      customizations,
      quantity: 1
    };
    
    setCart(prev => [...prev, cartItem]);
  };

  const handleUpdateQuantity = (menuItemId, newQuantity) => {
    // Find cart items with this menu item
    const existingItems = cart.filter(item => item.menuItemId === menuItemId);
    
    if (existingItems.length === 0 && newQuantity > 0) {
      // Add new item
      const menuItem = menuItems.find(item => item.id === menuItemId);
      if (menuItem) {
        handleAddToCart(menuItem);
      }
    } else if (existingItems.length > 0) {
      // Update existing items
      setCart(prev => {
        const newCart = [...prev];
        const totalCurrentQuantity = existingItems.length;
        
        if (newQuantity > totalCurrentQuantity) {
          // Add more items
          const menuItem = menuItems.find(item => item.id === menuItemId);
          if (menuItem) {
            for (let i = 0; i < newQuantity - totalCurrentQuantity; i++) {
              newCart.push({
                id: `${menuItem.id}_${Date.now()}_${i}`,
                menuItemId: menuItem.id,
                name: menuItem.name,
                price: menuItem.price,
                image: menuItem.image,
                customizations: {},
                quantity: 1
              });
            }
          }
        } else if (newQuantity < totalCurrentQuantity) {
          // Remove items
          const itemsToRemove = totalCurrentQuantity - newQuantity;
          for (let i = 0; i < itemsToRemove; i++) {
            const indexToRemove = newCart.findIndex(item => item.menuItemId === menuItemId);
            if (indexToRemove !== -1) {
              newCart.splice(indexToRemove, 1);
            }
          }
        }
        
        return newCart;
      });
    }
  };

  const getCartQuantity = (menuItemId) => {
    return cart.filter(item => item.menuItemId === menuItemId).length;
  };

  const getMenuCategories = () => {
    const categories = [...new Set(menuItems.map(item => item.category))];
    return ['all', ...categories];
  };

  const formatDeliveryFee = (fee) => {
    return fee === 0 ? 'Free delivery' : `$${fee.toFixed(2)} delivery`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Head>
          <title>Loading... - MealDash</title>
        </Head>
        <MealDashHeader cartItemCount={cart.length} />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600"></div>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Head>
          <title>Restaurant Not Found - MealDash</title>
        </Head>
        <MealDashHeader cartItemCount={cart.length} />
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Restaurant Not Found</h1>
          <button
            onClick={() => router.push('/mealdash')}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{restaurant.name} - MealDash</title>
        <meta name="description" content={restaurant.description} />
        <meta httpEquiv="Content-Language" content="en-US" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <MealDashHeader cartItemCount={cart.length} />

        {/* Restaurant Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
              {/* Restaurant Image */}
              <div className="flex-shrink-0 mb-4 lg:mb-0">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full lg:w-48 h-48 object-cover rounded-lg"
                />
              </div>

              {/* Restaurant Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {restaurant.name}
                    </h1>
                    <p className="text-gray-600 mb-3">{restaurant.description}</p>
                    
                    {/* Rating and Reviews */}
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center space-x-1">
                        <FaStar className="text-yellow-400" />
                        <span className="font-semibold">{restaurant.rating}</span>
                        <span className="text-gray-600">({restaurant.reviewCount} reviews)</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-600">
                        <FaClock className="text-sm" />
                        <span>{restaurant.deliveryTime}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-600">
                        <FaMotorcycle className="text-sm" />
                        <span>{formatDeliveryFee(restaurant.deliveryFee)}</span>
                      </div>
                    </div>

                    {/* Categories */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {restaurant.categories.map((category, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                        >
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </span>
                      ))}
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 text-sm text-gray-600">
                      <div className="flex items-center space-x-2 mb-2 sm:mb-0">
                        <FaMapMarkerAlt />
                        <span>{restaurant.address}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FaPhone />
                        <span>{restaurant.phone}</span>
                      </div>
                    </div>

                    {/* Operating Hours */}
                    {restaurant.hours && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                          <FaClock className="mr-2" />
                          Operating Hours
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                          {Object.entries(restaurant.hours).map(([day, hours]) => (
                            <div key={day} className="flex justify-between">
                              <span className="text-gray-700 capitalize font-medium">
                                {day}:
                              </span>
                              <span className="text-gray-600">{hours}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-600 hover:text-red-600 border border-gray-300 rounded-lg hover:border-red-300">
                      <FaHeart />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:border-gray-400">
                      <FaShare />
                    </button>
                  </div>
                </div>

                {/* Promo */}
                {restaurant.promo && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                    <div className="flex items-center space-x-2">
                      <FaInfo className="text-red-600" />
                      <span className="text-red-800 font-medium">{restaurant.promo}</span>
                    </div>
                  </div>
                )}

                {/* Status and Minimum Order */}
                <div className="flex items-center justify-between">
                  <div className={`text-sm font-medium ${
                    restaurant.isOpen ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {restaurant.isOpen ? 'Open now' : 'Closed'}
                  </div>
                  {restaurant.minimumOrder > 0 && (
                    <div className="text-sm text-gray-600">
                      Minimum order: {formatPrice(restaurant.minimumOrder)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="lg:flex lg:space-x-8">
            {/* Menu Content */}
            <div className="lg:flex-1">
              {/* Search and Filters */}
              <div className="bg-white rounded-lg p-4 mb-6">
                {/* Search Bar */}
                <div className="relative mb-4">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search menu items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap gap-2">
                  {getMenuCategories().map(category => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeCategory === category
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category === 'all' ? 'All Items' : category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Menu Items */}
              <div className="space-y-4">
                {filteredItems.length > 0 ? (
                  filteredItems.map(item => (
                    <MenuItemCard
                      key={item.id}
                      item={item}
                      onAddToCart={handleAddToCart}
                      onUpdateQuantity={handleUpdateQuantity}
                      cartQuantity={getCartQuantity(item.id)}
                    />
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-600">No menu items found.</p>
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="text-red-600 hover:text-red-700 mt-2"
                      >
                        Clear search
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Cart Sidebar */}
            {cart.length > 0 && (
              <div className="lg:w-80 mt-6 lg:mt-0">
                <div className="bg-white rounded-lg p-4 sticky top-20">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Your Order ({cart.length} items)
                  </h3>
                  
                  <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                    {cart.map(item => (
                      <div key={item.id} className="flex items-center space-x-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{item.name}</h4>
                          <p className="text-sm text-gray-600">{formatPrice(item.price)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-semibold">Subtotal:</span>
                      <span className="font-semibold">
                        {formatPrice(cart.reduce((total, item) => total + item.price, 0))}
                      </span>
                    </div>
                    
                    <button className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors font-medium">
                      Go to Checkout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RestaurantDetail;
