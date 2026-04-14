import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import HotelHeader from '../../components/hotels/HotelHeader';
import Footer from '../../components/Footer';
import { 
  FaStar, 
  FaWifi, 
  FaSwimmingPool, 
  FaDumbbell, 
  FaSpa, 
  FaCar, 
  FaMapMarkerAlt, 
  FaHeart, 
  FaRegHeart, 
  FaCheckCircle,
  FaArrowLeft,
  FaCalendarAlt,
  FaUsers,
  FaPhone,
  FaEnvelope,
  FaShareAlt,
  FaImages,
  FaChevronLeft,
  FaChevronRight,
  FaQuoteLeft
} from 'react-icons/fa';
import { getHotelById, generateSampleReviews, getAvailableRoomTypes } from '../../utils/hotelData';

const HotelDetailPage = () => {
  const router = useRouter();
  const { id, checkIn, checkOut, guests, rooms } = router.query;

  // State management
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Search parameters with defaults
  const searchParams = {
    checkIn: checkIn || '2024-12-20',
    checkOut: checkOut || '2024-12-22',
    guests: parseInt(guests) || 2,
    rooms: parseInt(rooms) || 1
  };

  // Load hotel data
  useEffect(() => {
    if (id) {
      loadHotelData();
    }
  }, [id]);

  const loadHotelData = () => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const hotelData = getHotelById(id);
      if (hotelData) {
        setHotel(hotelData);
        setAvailableRooms(getAvailableRoomTypes(id, searchParams.checkIn, searchParams.checkOut, searchParams.guests));
        setReviews(generateSampleReviews(id, 6));
      }
      setLoading(false);
    }, 500);
  };

  // Render star rating
  const renderStarRating = (rating, size = 'h-4 w-4') => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={`${size} ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
        />
      );
    }
    return stars;
  };

  // Render guest rating
  const renderGuestRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={`h-3 w-3 ${i <= fullStars ? 'text-blue-500' : 'text-gray-300'}`}
        />
      );
    }
    
    return stars;
  };

  // Get amenity icon
  const getAmenityIcon = (amenity) => {
    switch (amenity.toLowerCase()) {
      case 'free wifi':
        return <FaWifi className="h-5 w-5 text-blue-600" />;
      case 'swimming pool':
        return <FaSwimmingPool className="h-5 w-5 text-blue-600" />;
      case 'fitness center':
        return <FaDumbbell className="h-5 w-5 text-blue-600" />;
      case 'spa & wellness center':
        return <FaSpa className="h-5 w-5 text-blue-600" />;
      case 'valet parking':
        return <FaCar className="h-5 w-5 text-blue-600" />;
      default:
        return <FaCheckCircle className="h-5 w-5 text-green-600" />;
    }
  };

  // Calculate nights
  const calculateNights = () => {
    const checkInDate = new Date(searchParams.checkIn);
    const checkOutDate = new Date(searchParams.checkOut);
    const diffTime = checkOutDate - checkInDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  // Handle room booking
  const handleBookRoom = (room) => {
    const bookingParams = new URLSearchParams({
      hotelId: hotel.id,
      roomId: room.id,
      checkIn: searchParams.checkIn,
      checkOut: searchParams.checkOut,
      guests: searchParams.guests.toString(),
      rooms: searchParams.rooms.toString()
    });
    
    router.push(`/hotels/${hotel.id}/book?${bookingParams.toString()}`);
  };

  // Toggle wishlist
  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <HotelHeader />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading hotel details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="min-h-screen bg-gray-50">
        <HotelHeader />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Hotel Not Found</h1>
          <p className="text-gray-600 mb-8">The hotel you're looking for doesn't exist.</p>
          <Link href="/hotels" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Back to Hotels
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{hotel.name} - Hotel Details</title>
        <meta name="description" content={hotel.description} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <HotelHeader />

        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/hotels" className="hover:text-blue-600">Hotels</Link>
              <span>/</span>
              <Link href="/hotels/search" className="hover:text-blue-600">Search Results</Link>
              <span>/</span>
              <span className="text-gray-900">{hotel.name}</span>
            </div>
          </div>
        </div>

        {/* Hotel Header */}
        <div className="bg-white">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="flex items-center">
                    {renderStarRating(hotel.starRating)}
                  </div>
                  <span className="text-sm text-gray-600">{hotel.starRating}-star hotel</span>
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-2" data-testid="hotel-name">
                  {hotel.name}
                </h1>
                
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center text-gray-600">
                    <FaMapMarkerAlt className="h-4 w-4 mr-1" />
                    <span className="text-sm">{hotel.location.district}, {hotel.city}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <div className="flex items-center">
                      {renderGuestRating(hotel.rating)}
                    </div>
                    <span className="text-sm font-medium text-gray-900">{hotel.rating}</span>
                    <span className="text-sm text-gray-500">({hotel.reviewCount?.toLocaleString()} reviews)</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 px-3 py-2 rounded-lg transition-colors">
                  <FaShareAlt className="h-4 w-4" />
                  <span>Share</span>
                </button>
                
                <button
                  onClick={toggleWishlist}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                    isWishlisted 
                      ? 'border-red-300 bg-red-50 text-red-600' 
                      : 'border-gray-300 hover:bg-gray-50 text-gray-600'
                  }`}
                  data-testid="wishlist-toggle"
                >
                  {isWishlisted ? <FaHeart className="h-4 w-4" /> : <FaRegHeart className="h-4 w-4" />}
                  <span>{isWishlisted ? 'Saved' : 'Save'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Photo Gallery */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 pb-6">
            <div className="grid grid-cols-4 gap-4 h-96">
              {/* Main Image */}
              <div className="col-span-3 relative overflow-hidden rounded-lg">
                <img
                  src={hotel.images?.[selectedImageIndex] || '/images/placeholder-hotel.jpg'}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Image Navigation */}
                {hotel.images && hotel.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImageIndex(Math.max(0, selectedImageIndex - 1))}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
                      disabled={selectedImageIndex === 0}
                    >
                      <FaChevronLeft className="h-4 w-4" />
                    </button>
                    
                    <button
                      onClick={() => setSelectedImageIndex(Math.min(hotel.images.length - 1, selectedImageIndex + 1))}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-opacity"
                      disabled={selectedImageIndex === hotel.images.length - 1}
                    >
                      <FaChevronRight className="h-4 w-4" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Grid */}
              <div className="space-y-4">
                {hotel.images?.slice(0, 3).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-full h-28 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === index ? 'border-blue-500' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${hotel.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
                
                {hotel.images && hotel.images.length > 4 && (
                  <button className="w-full h-28 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors">
                    <FaImages className="h-6 w-6 mb-1" />
                    <span className="text-xs">+{hotel.images.length - 3} more</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Tabs */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="border-b border-gray-200">
                  <nav className="flex space-x-8 px-6">
                    {[
                      { id: 'overview', label: 'Overview' },
                      { id: 'amenities', label: 'Amenities' },
                      { id: 'rooms', label: 'Rooms' },
                      { id: 'reviews', label: 'Reviews' },
                      { id: 'location', label: 'Location' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                          activeTab === tab.id
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                        data-testid={`tab-${tab.id}`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </nav>
                </div>

                <div className="p-6">
                  {/* Overview Tab */}
                  {activeTab === 'overview' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">About this hotel</h3>
                        <p className="text-gray-600 leading-relaxed">{hotel.description}</p>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Nearby Landmarks</h4>
                        <ul className="space-y-2">
                          {hotel.location.nearbyLandmarks.map((landmark, index) => (
                            <li key={index} className="flex items-center text-gray-600">
                              <FaMapMarkerAlt className="h-3 w-3 mr-2 text-gray-400" />
                              {landmark}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Amenities Tab */}
                  {activeTab === 'amenities' && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Hotel Amenities</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {hotel.amenities.map((amenity, index) => (
                          <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            {getAmenityIcon(amenity)}
                            <span className="text-gray-700">{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Rooms Tab */}
                  {activeTab === 'rooms' && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-gray-900">Available Rooms</h3>
                      {availableRooms.map((room) => (
                        <div key={room.id} className="border border-gray-200 rounded-lg p-6">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="text-lg font-semibold text-gray-900 mb-2">{room.name}</h4>
                              <p className="text-gray-600 mb-3">{room.description}</p>
                              
                              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                                <span>• {room.size} sq ft</span>
                                <span>• {room.bedType}</span>
                                <span>• Up to {room.maxGuests} guests</span>
                              </div>

                              <div className="flex flex-wrap gap-2">
                                {room.features.map((feature, idx) => (
                                  <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                    {feature}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="text-right ml-6">
                              <div className="text-2xl font-bold text-gray-900 mb-1">
                                ${room.totalPrice}
                              </div>
                              <div className="text-sm text-gray-500 mb-1">
                                ${room.price} per night
                              </div>
                              <div className="text-xs text-gray-500 mb-4">
                                {calculateNights()} nights total
                              </div>
                              
                              <button
                                onClick={() => handleBookRoom(room)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                                data-testid={`book-room-${room.id}`}
                              >
                                Book Now
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Reviews Tab */}
                  {activeTab === 'reviews' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">Guest Reviews</h3>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            {renderGuestRating(hotel.rating)}
                          </div>
                          <span className="font-medium">{hotel.rating}</span>
                          <span className="text-gray-500">({hotel.reviewCount} reviews)</span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {reviews.map((review) => (
                          <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <div className="font-medium text-gray-900">{review.author}</div>
                                <div className="flex items-center space-x-2 mt-1">
                                  <div className="flex items-center">
                                    {renderGuestRating(review.rating)}
                                  </div>
                                  <span className="text-xs text-gray-500">{review.date}</span>
                                  {review.verified && (
                                    <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                                      Verified Stay
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            <p className="text-gray-600 mb-2">{review.content}</p>
                            
                            <div className="text-xs text-gray-500">
                              {review.helpful} people found this helpful
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Location Tab */}
                  {activeTab === 'location' && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-gray-900">Location</h3>
                      
                      <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
                        <div className="text-center text-gray-500">
                          <FaMapMarkerAlt className="h-8 w-8 mx-auto mb-2" />
                          <p>Interactive map would be displayed here</p>
                          <p className="text-sm">{hotel.address}</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Address</h4>
                        <p className="text-gray-600">{hotel.address}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Booking Widget */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    From ${hotel.priceFrom}
                  </div>
                  <div className="text-sm text-gray-500">per night</div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                      <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                        <FaCalendarAlt className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{searchParams.checkIn}</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                      <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                        <FaCalendarAlt className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{searchParams.checkOut}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                    <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                      <FaUsers className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">
                        {searchParams.guests} guests, {searchParams.rooms} room{searchParams.rooms > 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('rooms')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors mb-4"
                  data-testid="check-availability"
                >
                  Check Availability
                </button>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>Free cancellation</span>
                    <FaCheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <FaPhone className="h-4 w-4" />
                    <span>24/7 customer support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default HotelDetailPage; 