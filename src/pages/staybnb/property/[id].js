import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import StaybnbHeader from '../../../components/staybnb/StaybnbHeader';
import PropertyCard from '../../../components/staybnb/PropertyCard';
import Footer from '../../../components/Footer';
import { 
  getPropertyById, 
  getHostById, 
  getReviewsByPropertyId,
  calculateTotalPrice,
  calculateNights,
  getRandomProperties,
  formatCurrency,
  formatDate
} from '../../../utils/staybnbData';
import {
  FaStar,
  FaHeart,
  FaShare,
  FaChevronLeft,
  FaChevronRight,
  FaCheck,
  FaTimes,
  FaEnvelope
} from 'react-icons/fa';

const PropertyDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  
  const [property, setProperty] = useState(null);
  const [host, setHost] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [similarProperties, setSimilarProperties] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1
  });
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactMessage, setContactMessage] = useState('');
  const [contactSent, setContactSent] = useState(false);

  useEffect(() => {
    if (id) {
      try {
        const propertyData = getPropertyById(id);
        if (propertyData) {
          setProperty(propertyData);
          setHost(getHostById(propertyData.hostId));
          setReviews(getReviewsByPropertyId(id));
          setSimilarProperties(getRandomProperties(3, id));
        }
      } catch (error) {
        console.error('Error loading property data:', error);
      }
    }
  }, [id]);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏠</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Property not found</h2>
          <p className="text-gray-600 mb-4">The property you're looking for doesn't exist.</p>
          <Link href="/staybnb" className="text-rose-500 hover:text-rose-600 font-medium">
            Back to search
          </Link>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleBooking = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) {
      alert('Please select check-in and check-out dates');
      return;
    }
    setShowBookingModal(true);
  };

  const confirmBooking = () => {
    // In a real app, this would send data to a server
    alert('Booking confirmed! You will receive a confirmation email shortly.');
    setShowBookingModal(false);
  };

  const getAmenityIcon = (amenity) => {
    // 简化图标映射，使用通用的checkmark
    return <FaCheck className="text-green-500" />;
  };

  const calculateBookingTotal = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return null;
    const nights = calculateNights(bookingData.checkIn, bookingData.checkOut);
    return calculateTotalPrice(property, nights);
  };

  const bookingTotal = calculateBookingTotal();

  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      <Head>
        <title>{property.title} | StayBnB</title>
        <meta name="description" content={property.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-white">
        <StaybnbHeader isSearchPage={true} />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
              {property.title}
            </h1>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <FaStar className="h-4 w-4 text-gray-900 fill-current" />
                  <span className="font-medium">{property.rating}</span>
                  <span className="text-gray-500">
                    ({property.reviewCount} review{property.reviewCount !== 1 ? 's' : ''})
                  </span>
                </div>
                <span className="text-gray-500">·</span>
                <span className="text-gray-600 underline">
                  {property.location.neighborhood}, {property.location.city}, {property.location.country}
                </span>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => navigator.share?.({ url: window.location.href, title: property.title })}
                  className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FaShare className="h-4 w-4" />
                  <span className="text-sm font-medium">Share</span>
                </button>
                <button
                  onClick={toggleFavorite}
                  className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FaHeart className={`h-4 w-4 ${isFavorite ? 'text-rose-500 fill-current' : ''}`} />
                  <span className="text-sm font-medium">Save</span>
                </button>
              </div>
            </div>
          </div>

          {/* Photo Gallery */}
          <div className="mb-8">
            <div className="hidden md:grid grid-cols-4 gap-2 h-[500px] rounded-xl overflow-hidden">
              <div className="col-span-2 row-span-2">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                  onClick={() => setShowAllPhotos(true)}
                />
              </div>
              {property.images.slice(1, 5).map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={property.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                    onClick={() => setShowAllPhotos(true)}
                  />
                  {index === 3 && property.images.length > 5 && (
                    <div 
                      className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer"
                      onClick={() => setShowAllPhotos(true)}
                    >
                      <span className="text-white font-medium">
                        +{property.images.length - 5} more
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Gallery */}
            <div className="md:hidden relative aspect-square rounded-xl overflow-hidden">
              <img
                src={property.images[currentImageIndex]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              
              {property.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                  >
                    <FaChevronLeft className="h-4 w-4 text-gray-700" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                  >
                    <FaChevronRight className="h-4 w-4 text-gray-700" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-1">
                    {property.images.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            <button
              onClick={() => setShowAllPhotos(true)}
              className="md:hidden mt-4 w-full bg-white border border-gray-300 py-3 rounded-lg text-gray-700 font-medium hover:border-gray-400 transition-colors"
            >
              Show all {property.images.length} photos
            </button>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Property Info */}
              <div className="border-b border-gray-200 pb-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {property.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} hosted by {host?.name}
                    </h2>
                    <div className="flex items-center space-x-1 text-gray-600 mt-1">
                      <span>{property.maxGuests} guest{property.maxGuests !== 1 ? 's' : ''}</span>
                      <span>·</span>
                      <span>
                        {property.bedrooms > 0 ? `${property.bedrooms} bedroom${property.bedrooms !== 1 ? 's' : ''}` : 'Studio'}
                      </span>
                      <span>·</span>
                      <span>{property.beds} bed{property.beds !== 1 ? 's' : ''}</span>
                      <span>·</span>
                      <span>{property.bathrooms} bathroom{property.bathrooms !== 1 ? 's' : ''}</span>
                    </div>
                  </div>
                  {host && (
                    <div className="flex-shrink-0">
                      <img
                        src={host.avatar}
                        alt={host.name}
                        className="w-12 h-12 rounded-full"
                      />
                    </div>
                  )}
                </div>

                {/* Host badges */}
                {host?.isSuperhost && (
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex items-center space-x-1 bg-gray-100 px-3 py-1 rounded-full">
                      <span className="text-sm font-medium text-gray-700">⭐ Superhost</span>
                    </div>
                  </div>
                )}

                <p className="text-gray-600 leading-relaxed">
                  {property.description}
                </p>
              </div>

              {/* Amenities */}
              <div className="border-b border-gray-200 pb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">What this place offers</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {property.amenities.slice(0, 10).map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-6 h-6 flex items-center justify-center text-gray-600">
                        {getAmenityIcon(amenity)}
                      </div>
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
                {property.amenities.length > 10 && (
                  <button
                    onClick={() => setShowAllAmenities(true)}
                    className="mt-6 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:border-gray-400 transition-colors"
                  >
                    Show all {property.amenities.length} amenities
                  </button>
                )}
              </div>

              {/* Reviews */}
              <div className="border-b border-gray-200 pb-8">
                <div className="flex items-center space-x-2 mb-6">
                  <FaStar className="h-5 w-5 text-gray-900 fill-current" />
                  <span className="text-xl font-semibold text-gray-900">
                    {property.rating} · {property.reviewCount} review{property.reviewCount !== 1 ? 's' : ''}
                  </span>
                </div>
                
                {reviews.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(showAllReviews ? reviews : reviews.slice(0, 6)).map((review) => (
                      <div key={review.id} className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <img
                            src={review.guestAvatar}
                            alt={review.guestName}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <div className="font-medium text-gray-900">{review.guestName}</div>
                            <div className="text-sm text-gray-500">{formatDate(review.date)}</div>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {review.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No reviews yet</p>
                )}
                
                {reviews.length > 6 && (
                  <button
                    onClick={() => setShowAllReviews(!showAllReviews)}
                    className="mt-6 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:border-gray-400 transition-colors"
                  >
                    {showAllReviews ? 'Show fewer reviews' : `Show all ${reviews.length} reviews`}
                  </button>
                )}
              </div>

              {/* Location */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Where you'll be</h3>
                <p className="text-gray-600 mb-4">
                  {property.location.city}, {property.location.state || property.location.country}
                </p>
                <div className="bg-gray-200 rounded-xl h-64 flex items-center justify-center">
                  <span className="text-gray-500">Map would be displayed here</span>
                </div>
              </div>

              {/* Host Info */}
              {host && (
                <div className="border-t border-gray-200 pt-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <img
                      src={host.avatar}
                      alt={host.name}
                      className="w-16 h-16 rounded-full"
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        Hosted by {host.name}
                      </h3>
                      <p className="text-gray-500">
                        Joined {new Date(host.joinedDate).getFullYear()}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <FaStar className="h-4 w-4 text-gray-600" />
                      <span className="text-sm text-gray-600">
                        {host.responseRate}% response rate
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">
                        📅 Responds {host.responseTime}
                      </span>
                    </div>
                    {host.isSuperhost && (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">🛡️ Superhost</span>
                      </div>
                    )}
                  </div>

                  <p className="text-gray-600 mb-6">{host.about}</p>

                  <button
                    onClick={() => setShowContactModal(true)}
                    className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:border-gray-400 transition-colors"
                  >
                    Contact Host
                  </button>
                </div>
              )}

              {/* House Rules */}
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Things to know</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">House rules</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      {property.houseRules.map((rule, index) => (
                        <li key={index}>{rule}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Safety & property</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      {property.safetyFeatures.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Cancellation policy</h4>
                    <p className="text-sm text-gray-600">
                      {property.availability.cancellationPolicy} cancellation policy
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Booking Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white border border-gray-300 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-baseline space-x-1">
                      <span className="text-2xl font-semibold text-gray-900">
                        {formatCurrency(property.pricePerNight)}
                      </span>
                      <span className="text-gray-600">/ night</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FaStar className="h-4 w-4 text-gray-900 fill-current" />
                      <span className="font-medium">{property.rating}</span>
                      <span className="text-gray-500 text-sm">
                        ({property.reviewCount})
                      </span>
                    </div>
                  </div>

                  {/* Booking Form */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2 border border-gray-300 rounded-lg overflow-hidden">
                      <div className="p-3 border-r border-gray-300">
                        <label className="block text-xs font-semibold text-gray-900 mb-1">
                          CHECK-IN
                        </label>
                        <input
                          type="date"
                          value={bookingData.checkIn}
                          min={today}
                          onChange={(e) => setBookingData({...bookingData, checkIn: e.target.value})}
                          className="w-full text-sm text-gray-700 border-0 p-0 focus:outline-none focus:ring-0"
                        />
                      </div>
                      <div className="p-3">
                        <label className="block text-xs font-semibold text-gray-900 mb-1">
                          CHECKOUT
                        </label>
                        <input
                          type="date"
                          value={bookingData.checkOut}
                          min={bookingData.checkIn || today}
                          onChange={(e) => setBookingData({...bookingData, checkOut: e.target.value})}
                          className="w-full text-sm text-gray-700 border-0 p-0 focus:outline-none focus:ring-0"
                        />
                      </div>
                    </div>

                    <div className="border border-gray-300 rounded-lg p-3">
                      <label className="block text-xs font-semibold text-gray-900 mb-1">
                        GUESTS
                      </label>
                      <select
                        value={bookingData.guests}
                        onChange={(e) => setBookingData({...bookingData, guests: parseInt(e.target.value)})}
                        className="w-full text-sm text-gray-700 border-0 p-0 focus:outline-none focus:ring-0"
                      >
                        {[...Array(property.maxGuests)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1} guest{i !== 0 ? 's' : ''}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      onClick={handleBooking}
                      className="w-full bg-rose-500 text-white py-3 rounded-lg hover:bg-rose-600 transition-colors font-medium"
                    >
                      {property.availability.instantBook ? 'Reserve' : 'Request to book'}
                    </button>

                    <p className="text-center text-sm text-gray-500">
                      {property.availability.instantBook ? 'You won\'t be charged yet' : 'Host will respond within 24 hours'}
                    </p>

                    {/* Price Breakdown */}
                    {bookingTotal && (
                      <div className="space-y-3 pt-4 border-t border-gray-200">
                        <div className="flex justify-between text-sm">
                          <span>{formatCurrency(property.pricePerNight)} x {bookingTotal.nights} night{bookingTotal.nights !== 1 ? 's' : ''}</span>
                          <span>{formatCurrency(bookingTotal.subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Cleaning fee</span>
                          <span>{formatCurrency(bookingTotal.cleaningFee)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Service fee</span>
                          <span>{formatCurrency(bookingTotal.serviceFee)}</span>
                        </div>
                        <div className="flex justify-between font-semibold text-gray-900 pt-3 border-t border-gray-200">
                          <span>Total</span>
                          <span>{formatCurrency(bookingTotal.total)}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Similar Properties */}
          {similarProperties.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-semibold text-gray-900 mb-8">
                Similar places you might like
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {similarProperties.map((similarProperty) => (
                  <PropertyCard 
                    key={similarProperty.id} 
                    property={similarProperty}
                  />
                ))}
              </div>
            </section>
          )}
        </main>

        {/* All Photos Modal */}
        {showAllPhotos && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-90">
            <div className="flex items-center justify-center min-h-screen p-4">
              <button
                onClick={() => setShowAllPhotos(false)}
                className="absolute top-4 right-4 text-white p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <FaTimes className="h-6 w-6" />
              </button>
              
              <div className="max-w-4xl w-full">
                <div className="grid grid-cols-1 gap-4 max-h-[80vh] overflow-y-auto">
                  {property.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={property.title}
                      className="w-full rounded-lg"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Booking Confirmation Modal */}
        {showBookingModal && bookingTotal && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
              <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowBookingModal(false)} />
              
              <div className="relative bg-white rounded-2xl max-w-md w-full p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Confirm booking</h2>
                  <button
                    onClick={() => setShowBookingModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <FaTimes className="h-5 w-5 text-gray-500" />
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dates</span>
                    <span className="text-gray-900">
                      {formatDate(bookingData.checkIn)} - {formatDate(bookingData.checkOut)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Guests</span>
                    <span className="text-gray-900">{bookingData.guests}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between font-semibold text-gray-900">
                      <span>Total</span>
                      <span>{formatCurrency(bookingTotal.total)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-2 mb-6 p-4 bg-yellow-50 rounded-lg">
                  <span className="text-yellow-600 text-lg">⚠️</span>
                  <div className="text-sm text-yellow-800">
                    <p className="font-medium mb-1">This is a demo booking</p>
                    <p>No actual payment will be processed. This is for demonstration purposes only.</p>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowBookingModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmBooking}
                    className="flex-1 px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* All Amenities Modal */}
        {showAllAmenities && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
              <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowAllAmenities(false)} />
              <div className="relative bg-white rounded-2xl max-w-xl w-full p-6 max-h-[80vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">What this place offers</h2>
                  <button onClick={() => setShowAllAmenities(false)} className="p-2 hover:bg-gray-100 rounded-full">
                    <FaTimes className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <FaCheck className="text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Host Modal */}
        {showContactModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
              <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowContactModal(false)} />
              <div className="relative bg-white rounded-2xl max-w-md w-full p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Contact Host</h2>
                  <button onClick={() => { setShowContactModal(false); setContactSent(false); setContactMessage(''); }} className="p-2 hover:bg-gray-100 rounded-full">
                    <FaTimes className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
                {contactSent ? (
                  <div className="text-center py-6">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FaCheck className="text-green-600" />
                    </div>
                    <p className="font-medium text-gray-900 mb-1">Message sent!</p>
                    <p className="text-sm text-gray-500">{host?.name} will respond within {host?.responseTime || '24 hours'}.</p>
                    <button onClick={() => { setShowContactModal(false); setContactSent(false); setContactMessage(''); }} className="mt-4 text-rose-500 hover:text-rose-600 text-sm font-medium">Close</button>
                  </div>
                ) : (
                  <>
                    {host && (
                      <div className="flex items-center space-x-3 mb-5 p-3 bg-gray-50 rounded-xl">
                        <img src={host.avatar} alt={host.name} className="w-10 h-10 rounded-full" />
                        <div>
                          <p className="font-medium text-gray-900">{host.name}</p>
                          <p className="text-xs text-gray-500">Responds {host.responseTime}</p>
                        </div>
                      </div>
                    )}
                    <textarea
                      value={contactMessage}
                      onChange={e => setContactMessage(e.target.value)}
                      placeholder="Hi! I'm interested in your property. Could you tell me more about..."
                      rows={5}
                      className="w-full border border-gray-300 rounded-xl p-3 text-sm text-gray-700 focus:ring-2 focus:ring-rose-400 outline-none resize-none mb-4"
                    />
                    <div className="flex space-x-3">
                      <button onClick={() => setShowContactModal(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors text-sm">Cancel</button>
                      <button
                        onClick={() => { if (contactMessage.trim()) setContactSent(true); }}
                        disabled={!contactMessage.trim()}
                        className="flex-1 px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        <FaEnvelope size={12} /> Send message
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        <Footer />
      </div>
    </>
  );
};

export default PropertyDetailPage;
