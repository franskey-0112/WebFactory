import React from 'react';
import Link from 'next/link';
import { FaStar, FaWifi, FaSwimmingPool, FaDumbbell, FaSpa, FaCar, FaMapMarkerAlt, FaHeart, FaRegHeart, FaCheckCircle } from 'react-icons/fa';

const HotelCard = ({ hotel, searchParams = {}, onToggleWishlist, isInWishlist = false }) => {
  
  // Render star rating
  const renderStarRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={i <= rating ? 'text-yellow-400' : 'text-gray-300'}
          size={14}
        />
      );
    }
    return stars;
  };

  // Render guest rating
  const renderGuestRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={i <= fullStars ? 'text-blue-500' : 'text-gray-300'}
          size={12}
        />
      );
    }
    
    return stars;
  };

  // Get amenity icons
  const getAmenityIcon = (amenity) => {
    switch (amenity.toLowerCase()) {
      case 'free wifi':
        return <FaWifi className="h-4 w-4" />;
      case 'swimming pool':
        return <FaSwimmingPool className="h-4 w-4" />;
      case 'fitness center':
        return <FaDumbbell className="h-4 w-4" />;
      case 'spa & wellness center':
        return <FaSpa className="h-4 w-4" />;
      case 'valet parking':
        return <FaCar className="h-4 w-4" />;
      default:
        return <FaCheckCircle className="h-4 w-4" />;
    }
  };

  // Calculate nights for pricing
  const calculateNights = () => {
    if (searchParams.checkIn && searchParams.checkOut) {
      const checkInDate = new Date(searchParams.checkIn);
      const checkOutDate = new Date(searchParams.checkOut);
      const diffTime = checkOutDate - checkInDate;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 1;
    }
    return 1;
  };

  // Build link URL with search parameters
  const buildHotelLink = () => {
    const params = new URLSearchParams();
    if (searchParams.checkIn) params.set('checkIn', searchParams.checkIn);
    if (searchParams.checkOut) params.set('checkOut', searchParams.checkOut);
    if (searchParams.guests) params.set('guests', searchParams.guests);
    if (searchParams.rooms) params.set('rooms', searchParams.rooms);
    
    return `/hotels/${hotel.id}${params.toString() ? `?${params.toString()}` : ''}`;
  };

  const nights = calculateNights();
  const totalPrice = hotel.priceFrom * nights;

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden mb-6">
      <div className="flex flex-col md:flex-row min-h-[240px]">
        {/* Hotel Image */}
        <div className="md:w-80 md:flex-shrink-0 w-full">
          <Link href={buildHotelLink()}>
            <div className="relative h-48 md:h-full min-h-[200px] cursor-pointer group overflow-hidden">
              <img
                src={hotel.images?.[0] || '/images/placeholder-hotel.jpg'}
                alt={hotel.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                data-testid={`hotel-image-${hotel.id}`}
                onError={(e) => {
                  e.target.src = '/images/hotels/default-hotel.jpg';
                }}
              />
              
              {/* Star rating overlay */}
              <div className="absolute top-3 left-3 bg-white bg-opacity-95 px-2 py-1 rounded shadow-sm z-10">
                <div className="flex items-center space-x-1">
                  {renderStarRating(hotel.starRating)}
                </div>
              </div>

              {/* Wishlist button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onToggleWishlist?.(hotel);
                }}
                className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors"
                data-testid={`wishlist-button-${hotel.id}`}
              >
                {isInWishlist ? (
                  <FaHeart className="h-4 w-4 text-red-500" />
                ) : (
                  <FaRegHeart className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
          </Link>
        </div>

        {/* Hotel Details */}
        <div className="flex-1 p-6 min-h-[200px] flex flex-col justify-between">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start">
            <div className="flex-1 lg:mr-6 mb-4 lg:mb-0">
              {/* Hotel Name */}
              <Link href={buildHotelLink()}>
                <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 cursor-pointer mb-2" data-testid={`hotel-name-${hotel.id}`}>
                  {hotel.name}
                </h3>
              </Link>

              {/* Location */}
              <div className="flex items-center text-gray-600 mb-3">
                <FaMapMarkerAlt className="h-4 w-4 mr-1" />
                <span className="text-sm">
                  {hotel.location.district}, {hotel.city}
                </span>
              </div>

              {/* Guest Rating */}
              <div className="flex items-center space-x-2 mb-3">
                <div className="flex items-center">
                  {renderGuestRating(hotel.rating)}
                </div>
                <span className="text-sm font-medium text-gray-900">{hotel.rating}</span>
                <span className="text-sm text-gray-500">
                  ({hotel.reviewCount?.toLocaleString()} reviews)
                </span>
              </div>

              {/* Amenities */}
              <div className="flex flex-wrap gap-3 mb-4">
                {hotel.amenities.slice(0, 6).map((amenity, index) => (
                  <div key={index} className="flex items-center text-xs text-gray-600">
                    {getAmenityIcon(amenity)}
                    <span className="ml-1">{amenity}</span>
                  </div>
                ))}
                {hotel.amenities.length > 6 && (
                  <span className="text-xs text-gray-500">
                    +{hotel.amenities.length - 6} more
                  </span>
                )}
              </div>

              {/* Room Types Preview */}
              <div className="text-sm text-gray-600">
                <span className="font-medium">Available rooms:</span>
                {hotel.roomTypes.slice(0, 2).map((room, index) => (
                  <span key={room.id}>
                    {index > 0 && ', '}
                    {room.name}
                  </span>
                ))}
                {hotel.roomTypes.length > 2 && (
                  <span> +{hotel.roomTypes.length - 2} more</span>
                )}
              </div>
            </div>

            {/* Pricing and Booking */}
            <div className="flex flex-col items-end lg:text-right lg:min-w-[180px] w-full lg:w-auto mt-4 lg:mt-0">
              {/* Free Cancellation */}
              {hotel.freeCancellation && (
                <div className="text-xs text-green-600 font-medium mb-2 flex items-center">
                  <FaCheckCircle className="h-3 w-3 mr-1" />
                  Free cancellation
                </div>
              )}

              {/* Price */}
              <div className="mb-4 text-right">
                <div className="text-2xl font-bold text-gray-900" data-testid={`hotel-price-${hotel.id}`}>
                  ${hotel.priceFrom}
                </div>
                <div className="text-xs text-gray-500">per night</div>
                {nights > 1 && (
                  <div className="text-sm text-gray-600 mt-1">
                    ${totalPrice} total ({nights} nights)
                  </div>
                )}
              </div>

              {/* Booking deadline */}
              {hotel.bookingDeadline && (
                <div className="text-xs text-orange-600 mb-3 text-center lg:text-right">
                  Book within {hotel.bookingDeadline} hours
                </div>
              )}

              {/* View Details Button */}
              <Link href={buildHotelLink()} className="w-full lg:w-auto">
                <button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
                  data-testid={`view-hotel-button-${hotel.id}`}
                >
                  View Details
                </button>
              </Link>

              {/* Quick Book Button */}
              <Link href={`${buildHotelLink()}&quickbook=true`}>
                <button className="w-full mt-2 border border-blue-600 text-blue-600 hover:bg-blue-50 py-2 px-4 rounded-lg font-medium transition-colors duration-200">
                  Quick Book
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCard; 