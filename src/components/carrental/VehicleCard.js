import React, { useState } from 'react';
import Link from 'next/link';
import { 
  FaStar, 
  FaUsers, 
  FaSuitcase, 
  FaCog, 
  FaGasPump, 
  FaSnowflake,
  FaWifi,
  FaMapMarkerAlt,
  FaHeart,
  FaRegHeart,
  FaInfo
} from 'react-icons/fa';
import { formatCurrency, getVehicleAvailabilityCount } from '../../utils/carRentalData';

const VehicleCard = ({ 
  vehicle, 
  searchParams, 
  onSelect, 
  showQuickView = true,
  className = ''
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!vehicle) {
    return null;
  }

  const {
    id,
    name,
    category,
    brand,
    year,
    transmission,
    fuelType,
    seats,
    doors,
    luggage,
    airConditioning,
    images,
    features,
    specifications,
    pricing,
    availability,
    reviews
  } = vehicle;

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const getAvailabilityText = () => {
    if (!searchParams?.pickupLocation) return '';
    
    const count = getVehicleAvailabilityCount(id, searchParams.pickupLocation);
    if (count === 0) return 'Not available';
    if (count <= 3) return `Only ${count} left!`;
    return `${count} available`;
  };

  const getAvailabilityColor = () => {
    if (!searchParams?.pickupLocation) return 'text-gray-500';
    
    const count = getVehicleAvailabilityCount(id, searchParams.pickupLocation);
    if (count === 0) return 'text-red-500';
    if (count <= 3) return 'text-orange-500';
    return 'text-green-500';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'economy': '💰',
      'compact': '🚗',
      'midsize': '🚙',
      'fullsize': '🚘',
      'premium': '✨',
      'luxury': '👑',
      'suv': '🚐',
      'convertible': '🏎️'
    };
    return icons[category] || '🚗';
  };

  const keyFeatures = features.slice(0, 4);
  const currentImage = images[currentImageIndex] || images[0];

  return (
    <div className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden ${className}`}>
      {/* Image Section */}
      <div className="relative">
        <div className="aspect-w-16 aspect-h-10 bg-gray-100">
          <img
            src={currentImage}
            alt={name}
            className="w-full h-48 object-cover"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop';
            }}
          />
        </div>

        {/* Image Navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
            >
              ←
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
            >
              →
            </button>
            
            {/* Image Indicators */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
          {getCategoryIcon(category)} {category.charAt(0).toUpperCase() + category.slice(1)}
        </div>

        {/* Favorite Button */}
        <button
          onClick={toggleFavorite}
          className="absolute top-3 right-3 bg-white bg-opacity-90 p-2 rounded-full hover:bg-opacity-100 transition-opacity"
        >
          {isFavorite ? (
            <FaHeart className="text-red-500 text-lg" />
          ) : (
            <FaRegHeart className="text-gray-600 text-lg" />
          )}
        </button>

        {/* Year Badge */}
        <div className="absolute bottom-3 right-3 bg-white bg-opacity-90 px-2 py-1 rounded text-xs font-semibold text-gray-800">
          {year}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Vehicle Name and Brand */}
        <div className="mb-3">
          <h3 className="text-xl font-bold text-gray-900 mb-1">{name}</h3>
          <p className="text-sm text-gray-600">{brand} • {category.charAt(0).toUpperCase() + category.slice(1)}</p>
        </div>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`text-sm ${
                  i < Math.floor(reviews.rating) ? 'text-yellow-400' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm font-medium text-gray-700">{reviews.rating}</span>
          <span className="ml-1 text-sm text-gray-500">({reviews.count} reviews)</span>
        </div>

        {/* Vehicle Specs */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <FaUsers className="mr-2 text-blue-500" />
            <span>{seats} seats</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <FaSuitcase className="mr-2 text-blue-500" />
            <span>{luggage} bags</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <FaCog className="mr-2 text-blue-500" />
            <span>{transmission}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <FaGasPump className="mr-2 text-blue-500" />
            <span>{fuelType}</span>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {keyFeatures.map((feature, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
              >
                {feature}
              </span>
            ))}
            {features.length > 4 && (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                +{features.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Availability */}
        {searchParams?.pickupLocation && (
          <div className="mb-4">
            <p className={`text-sm font-medium ${getAvailabilityColor()}`}>
              <FaMapMarkerAlt className="inline mr-1" />
              {getAvailabilityText()}
            </p>
          </div>
        )}

        {/* Pricing */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-2xl font-bold text-orange-600">
              {formatCurrency(pricing.dailyRate)}
            </div>
            <div className="text-sm text-gray-500">per day</div>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-gray-600">Weekly from</div>
            <div className="text-lg font-semibold text-gray-800">
              {formatCurrency(pricing.weeklyRate)}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Link
            href={`/carrental/vehicle/${id}${searchParams ? `?${new URLSearchParams(searchParams).toString()}` : ''}`}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-center py-3 px-4 rounded-lg font-semibold transition-colors"
          >
            Select Vehicle
          </Link>
          
          {showQuickView && (
            <button
              onClick={(e) => {
                e.preventDefault();
                // Open quick view modal
                if (onSelect) onSelect(vehicle);
              }}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-3 rounded-lg transition-colors"
              title="Quick View"
            >
              <FaInfo />
            </button>
          )}
        </div>

        {/* Additional Info */}
        <div className="mt-3 text-center">
          <p className="text-xs text-gray-500">
            Free cancellation • No hidden fees • Instant confirmation
          </p>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
