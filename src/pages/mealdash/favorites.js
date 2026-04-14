import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import MealDashHeader from '../../components/mealdash/MealDashHeader';
import RestaurantCard from '../../components/mealdash/RestaurantCard';
import { getRestaurants } from '../../utils/mealDashData';
import { FaHeart, FaHeartBroken } from 'react-icons/fa';

const FavoritesPage = () => {
  const [favoriteRestaurants, setFavoriteRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    // In a real app, this would fetch user's favorites from backend
    // For demo, we'll show some sample favorites
    const allRestaurants = getRestaurants();
    const sampleFavorites = allRestaurants.slice(0, 4); // First 4 restaurants as favorites
    
    setFavoriteRestaurants(sampleFavorites);
    setLoading(false);
  };

  const removeFavorite = (restaurantId) => {
    setFavoriteRestaurants(prev => 
      prev.filter(restaurant => restaurant.id !== restaurantId)
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Head>
          <title>Favorites - MealDash</title>
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
        <title>Your Favorites - MealDash</title>
        <meta name="description" content="Your favorite restaurants on MealDash" />
        <meta httpEquiv="Content-Language" content="en-US" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <MealDashHeader />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <FaHeart className="text-red-500 text-2xl" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Favorites</h1>
            <p className="text-gray-600">
              {favoriteRestaurants.length} favorite restaurant{favoriteRestaurants.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Favorites Grid */}
          {favoriteRestaurants.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteRestaurants.map(restaurant => (
                <div key={restaurant.id} className="relative">
                  <RestaurantCard restaurant={restaurant} />
                  
                  {/* Remove from Favorites Button */}
                  <button
                    onClick={() => removeFavorite(restaurant.id)}
                    className="absolute top-3 right-3 bg-white bg-opacity-90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-opacity-100 transition-all"
                    title="Remove from favorites"
                  >
                    <FaHeart className="text-red-500 hover:text-red-600" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <FaHeartBroken className="mx-auto text-gray-300 text-6xl mb-6" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">No favorites yet</h2>
                <p className="text-gray-600 mb-8">
                  Start adding restaurants to your favorites by clicking the heart icon on restaurant cards.
                </p>
                <Link href="/mealdash">
                  <button className="bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 transition-colors font-medium">
                    Explore Restaurants
                  </button>
                </Link>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          {favoriteRestaurants.length > 0 && (
            <div className="mt-12 text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/mealdash/search?category=pizza">
                  <button className="bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                    🍕 Find More Pizza
                  </button>
                </Link>
                <Link href="/mealdash/search?category=burgers">
                  <button className="bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                    🍔 More Burgers
                  </button>
                </Link>
                <Link href="/mealdash/search?sortBy=rating">
                  <button className="bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                    ⭐ Top Rated
                  </button>
                </Link>
                <Link href="/mealdash/search?maxDeliveryFee=0">
                  <button className="bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                    🚚 Free Delivery
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

export default FavoritesPage;
