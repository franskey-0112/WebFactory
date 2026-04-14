import React from 'react';
import Link from 'next/link';
import { FaStar, FaClock, FaMotorcycle } from 'react-icons/fa';

const RestaurantCard = ({ restaurant, showPromo = true }) => {
  const formatDeliveryFee = (fee) => {
    return fee === 0 ? 'Free delivery' : `$${fee.toFixed(2)} delivery`;
  };

  const getTodaysHours = () => {
    const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const todayKey = days[today];
    return restaurant.hours && restaurant.hours[todayKey] ? restaurant.hours[todayKey] : null;
  };

  const todaysHours = getTodaysHours();

  return (
    <Link href={`/mealdash/restaurant/${restaurant.id}`}>
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100 overflow-hidden">
        {/* Restaurant Image */}
        <div className="relative h-40 w-full">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          
          {/* Promo Badge */}
          {showPromo && restaurant.promo && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
              {restaurant.promo}
            </div>
          )}

          {/* Delivery Time Badge */}
          <div className="absolute bottom-2 right-2 bg-white bg-opacity-90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-gray-800">
            {restaurant.deliveryTime}
          </div>
        </div>

        {/* Restaurant Info */}
        <div className="p-4">
          {/* Name and Rating */}
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-gray-900 text-lg truncate flex-1 mr-2">
              {restaurant.name}
            </h3>
            <div className="flex items-center space-x-1 flex-shrink-0">
              <FaStar className="text-yellow-400 text-sm" />
              <span className="text-sm font-medium text-gray-700">
                {restaurant.rating}
              </span>
              <span className="text-sm text-gray-500">
                ({restaurant.reviewCount})
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {restaurant.description}
          </p>

          {/* Delivery Info */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4 text-gray-600">
              <div className="flex items-center space-x-1">
                <FaClock className="text-xs" />
                <span>{restaurant.deliveryTime}</span>
              </div>
              <div className="flex items-center space-x-1">
                <FaMotorcycle className="text-xs" />
                <span>{formatDeliveryFee(restaurant.deliveryFee)}</span>
              </div>
            </div>
            
            {/* Status and Hours */}
            <div className="flex flex-col items-end">
              <div className={`text-xs font-medium ${
                restaurant.isOpen ? 'text-green-600' : 'text-red-600'
              }`}>
                {restaurant.isOpen ? 'Open' : 'Closed'}
              </div>
              {todaysHours && (
                <div className="text-xs text-gray-500 mt-0.5">
                  {todaysHours}
                </div>
              )}
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-1 mt-3">
            {restaurant.categories.slice(0, 3).map((category, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </span>
            ))}
            {restaurant.categories.length > 3 && (
              <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                +{restaurant.categories.length - 3} more
              </span>
            )}
          </div>

          {/* Minimum Order */}
          {restaurant.minimumOrder > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <span className="text-xs text-gray-600">
                Minimum order: ${restaurant.minimumOrder.toFixed(2)}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
