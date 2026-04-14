import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import MealDashHeader from '../../components/mealdash/MealDashHeader';
import CategoryScroll from '../../components/mealdash/CategoryScroll';
import PromoCarousel from '../../components/mealdash/PromoCarousel';
import RestaurantCard from '../../components/mealdash/RestaurantCard';
import { 
  getCategories, 
  getPromotions, 
  getFeaturedRestaurants,
  getRestaurantsByCategory,
  formatPrice 
} from '../../utils/mealDashData';
import Link from 'next/link';
import { FaArrowRight, FaClock, FaFire } from 'react-icons/fa';

const MealDashHome = () => {
  const [categories, setCategories] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [featuredRestaurants, setFeaturedRestaurants] = useState([]);
  const [lateNightRestaurants, setLateNightRestaurants] = useState([]);
  const [nationalFavorites, setNationalFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHomeData();
  }, []);

  const loadHomeData = async () => {
    try {
      setLoading(true);
      
      // Load all data
      const categoriesData = getCategories();
      const promotionsData = getPromotions();
      const featuredData = getFeaturedRestaurants();
      
      // Get restaurants by category for different sections
      const burgerRestaurants = getRestaurantsByCategory('burgers');
      const pizzaRestaurants = getRestaurantsByCategory('pizza');
      
      setCategories(categoriesData);
      setPromotions(promotionsData);
      setFeaturedRestaurants(featuredData);
      setLateNightRestaurants([...burgerRestaurants, ...pizzaRestaurants].slice(0, 4));
      setNationalFavorites(featuredData.slice(0, 4));
    } catch (error) {
      console.error('Error loading home data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Head>
          <title>MealDash - Food Delivery</title>
        </Head>
        <MealDashHeader />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading delicious options...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>MealDash - Food Delivery</title>
        <meta name="description" content="Get your favorite food delivered fast with MealDash" />
        <meta httpEquiv="Content-Language" content="en-US" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <MealDashHeader />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Promotional Banners */}
          <PromoCarousel promotions={promotions} />

          {/* Categories Section */}
          <div className="mb-8">
            <CategoryScroll categories={categories} />
          </div>

          {/* Late Night Cravings Section */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <FaClock className="text-purple-600" />
                <h2 className="text-2xl font-bold text-gray-900">Late night cravings</h2>
              </div>
              <Link href="/mealdash/search?filter=late-night" className="flex items-center space-x-1 text-red-600 hover:text-red-700 font-medium">
                <span>See All</span>
                <FaArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {lateNightRestaurants.slice(0, 2).map(restaurant => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          </div>

          {/* National Favorites Section */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <FaFire className="text-orange-600" />
                <h2 className="text-2xl font-bold text-gray-900">National favorites</h2>
              </div>
              <Link href="/mealdash/search?filter=national" className="flex items-center space-x-1 text-red-600 hover:text-red-700 font-medium">
                <span>See All</span>
                <FaArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {nationalFavorites.slice(0, 2).map(restaurant => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          </div>

          {/* All Featured Restaurants */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Featured restaurants</h2>
              <Link href="/mealdash/search" className="flex items-center space-x-1 text-red-600 hover:text-red-700 font-medium">
                <span>See All</span>
                <FaArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredRestaurants.map(restaurant => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          </div>

          {/* Quick Filters */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick filters</h3>
            <div className="flex flex-wrap gap-3">
              {[
                'Free delivery',
                'Under 30 min',
                '4.5+ rating',
                'New on MealDash',
                'Deals',
                'Healthy options'
              ].map((filter, index) => (
                <button
                  key={index}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Footer Info */}
          <div className="bg-white rounded-lg p-6 mt-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Get to know us</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><a href="/mealdash" className="hover:text-gray-900">About Us</a></li>
                  <li><a href="/careerlink/jobs" className="hover:text-gray-900">Careers</a></li>
                  <li><a href="/mealdash" className="hover:text-gray-900">Investors</a></li>
                  <li><a href="/mealdash" className="hover:text-gray-900">Company Blog</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Let us help you</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><a href="/mealdash/signin" className="hover:text-gray-900">Account Details</a></li>
                  <li><a href="/mealdash/orders" className="hover:text-gray-900">Order History</a></li>
                  <li><a href="/amazon/customer-service" className="hover:text-gray-900">Help</a></li>
                  <li><a href="/amazon/customer-service" className="hover:text-gray-900">Contact</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Doing business</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><a href="/mealdash" className="hover:text-gray-900">Become a Dasher</a></li>
                  <li><a href="/mealdash" className="hover:text-gray-900">List Your Business</a></li>
                  <li><a href="/mealdash" className="hover:text-gray-900">Get DashPass</a></li>
                  <li><a href="/mealdash" className="hover:text-gray-900">Business Portal</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200 mt-8 pt-6">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="text-sm text-gray-600">
                  © 2024 MealDash. All rights reserved.
                </div>
                <div className="flex space-x-6 text-sm text-gray-600">
                  <a href="/mealdash" className="hover:text-gray-900">Privacy Policy</a>
                  <a href="/mealdash" className="hover:text-gray-900">Terms of Service</a>
                  <a href="/mealdash" className="hover:text-gray-900">Accessibility</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MealDashHome;
