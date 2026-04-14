import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { 
  FaStar, 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaUsers,
  FaChevronLeft,
  FaChevronRight,
  FaCheck,
  FaExclamationTriangle,
  FaCreditCard,
  FaLock,
  FaShieldAlt
} from 'react-icons/fa';
import { getHotelById, calculateRoomPrice } from '../../../utils/hotelData';

const HotelBookingPage = () => {
  const router = useRouter();
  const { id, checkIn, checkOut, guests, rooms, roomType } = router.query;
  
  const [hotel, setHotel] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    guestInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      specialRequests: ''
    },
    paymentInfo: {
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardholderName: '',
      billingAddress: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States'
      }
    }
  });

  // Search parameters
  const searchParams = {
    checkIn: checkIn || '2024-12-20',
    checkOut: checkOut || '2024-12-23',
    guests: parseInt(guests) || 2,
    rooms: parseInt(rooms) || 1
  };

  useEffect(() => {
    if (id) {
      loadHotelData();
    }
  }, [id, roomType]);

  const loadHotelData = () => {
    setLoading(true);
    
    setTimeout(() => {
      const hotelData = getHotelById(id);
      if (hotelData) {
        setHotel(hotelData);
        const room = hotelData.roomTypes.find(r => r.id === roomType) || hotelData.roomTypes[0];
        setSelectedRoom(room);
      }
      setLoading(false);
    }, 500);
  };

  const calculateNights = () => {
    const checkInDate = new Date(searchParams.checkIn);
    const checkOutDate = new Date(searchParams.checkOut);
    const diffTime = checkOutDate - checkInDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric',
      month: 'long', 
      day: 'numeric' 
    });
  };

  const renderStarRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={i <= rating ? 'text-yellow-400' : 'text-gray-300'}
          size={12}
        />
      );
    }
    return stars;
  };

  const handleInputChange = (section, field, value) => {
    setBookingData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleBillingAddressChange = (field, value) => {
    setBookingData(prev => ({
      ...prev,
      paymentInfo: {
        ...prev.paymentInfo,
        billingAddress: {
          ...prev.paymentInfo.billingAddress,
          [field]: value
        }
      }
    }));
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        const { firstName, lastName, email, phone } = bookingData.guestInfo;
        return firstName && lastName && email && phone;
      case 2:
        const { cardNumber, expiryDate, cvv, cardholderName } = bookingData.paymentInfo;
        const { street, city, state, zipCode } = bookingData.paymentInfo.billingAddress;
        return cardNumber && expiryDate && cvv && cardholderName && street && city && state && zipCode;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    } else {
      alert('Please fill in all required fields');
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleBookingSubmit = () => {
    if (validateStep(2)) {
      // Simulate booking process
      setCurrentStep(4);
      
      // Generate booking confirmation
      const bookingId = 'HTL' + Math.random().toString(36).substr(2, 9).toUpperCase();
      setBookingData(prev => ({
        ...prev,
        confirmationNumber: bookingId
      }));
    } else {
      alert('Please fill in all required fields');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading booking information...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!hotel || !selectedRoom) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <FaExclamationTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Booking Information Not Found</h1>
          <p className="text-gray-600 mb-6">Unable to load hotel or room information.</p>
          <Link href="/hotels" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Browse All Hotels
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const nights = calculateNights();
  const roomTotal = calculateRoomPrice(selectedRoom.price, searchParams.checkIn, searchParams.checkOut);
  const taxes = Math.round(roomTotal * 0.14); // 14% tax
  const fees = 25; // Resort/service fee
  const totalPrice = roomTotal + taxes + fees;

  return (
    <>
      <Head>
        <title>Book {hotel.name} - Hotel Booking</title>
        <meta name="description" content={`Complete your booking at ${hotel.name}`} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Header />

        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/hotels" className="hover:text-blue-600">Hotels</Link>
              <FaChevronRight className="h-3 w-3" />
              <Link href={`/hotels/${id}`} className="hover:text-blue-600">{hotel.name}</Link>
              <FaChevronRight className="h-3 w-3" />
              <span className="text-gray-900">Book Now</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-center space-x-8">
              {[
                { step: 1, label: 'Guest Details' },
                { step: 2, label: 'Payment' },
                { step: 3, label: 'Review' },
                { step: 4, label: 'Confirmation' }
              ].map((item) => (
                <div key={item.step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= item.step 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {currentStep > item.step ? <FaCheck className="h-4 w-4" /> : item.step}
                  </div>
                  <span className={`ml-2 text-sm ${
                    currentStep >= item.step ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {item.label}
                  </span>
                  {item.step < 4 && (
                    <div className={`w-16 h-0.5 ml-4 ${
                      currentStep > item.step ? 'bg-blue-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                
                {/* Step 1: Guest Details */}
                {currentStep === 1 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Guest Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          value={bookingData.guestInfo.firstName}
                          onChange={(e) => handleInputChange('guestInfo', 'firstName', e.target.value)}
                          className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter your first name"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          value={bookingData.guestInfo.lastName}
                          onChange={(e) => handleInputChange('guestInfo', 'lastName', e.target.value)}
                          className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter your last name"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={bookingData.guestInfo.email}
                          onChange={(e) => handleInputChange('guestInfo', 'email', e.target.value)}
                          className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          value={bookingData.guestInfo.phone}
                          onChange={(e) => handleInputChange('guestInfo', 'phone', e.target.value)}
                          className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter your phone number"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Special Requests (Optional)
                      </label>
                      <textarea
                        value={bookingData.guestInfo.specialRequests}
                        onChange={(e) => handleInputChange('guestInfo', 'specialRequests', e.target.value)}
                        rows={4}
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Any special requests or preferences..."
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Payment Information */}
                {currentStep === 2 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Information</h2>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                      <div className="flex items-center">
                        <FaShieldAlt className="h-5 w-5 text-blue-600 mr-2" />
                        <span className="text-blue-800 text-sm font-medium">
                          Your payment information is secure and encrypted
                        </span>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Card Number *
                        </label>
                        <div className="relative">
                          <FaCreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            value={bookingData.paymentInfo.cardNumber}
                            onChange={(e) => handleInputChange('paymentInfo', 'cardNumber', e.target.value)}
                            className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="1234 5678 9012 3456"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Expiry Date *
                          </label>
                          <input
                            type="text"
                            value={bookingData.paymentInfo.expiryDate}
                            onChange={(e) => handleInputChange('paymentInfo', 'expiryDate', e.target.value)}
                            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="MM/YY"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            CVV *
                          </label>
                          <input
                            type="text"
                            value={bookingData.paymentInfo.cvv}
                            onChange={(e) => handleInputChange('paymentInfo', 'cvv', e.target.value)}
                            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="123"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cardholder Name *
                        </label>
                        <input
                          type="text"
                          value={bookingData.paymentInfo.cardholderName}
                          onChange={(e) => handleInputChange('paymentInfo', 'cardholderName', e.target.value)}
                          className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Name as it appears on card"
                          required
                        />
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing Address</h3>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Street Address *
                            </label>
                            <input
                              type="text"
                              value={bookingData.paymentInfo.billingAddress.street}
                              onChange={(e) => handleBillingAddressChange('street', e.target.value)}
                              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="123 Main Street"
                              required
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                City *
                              </label>
                              <input
                                type="text"
                                value={bookingData.paymentInfo.billingAddress.city}
                                onChange={(e) => handleBillingAddressChange('city', e.target.value)}
                                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="City"
                                required
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                State *
                              </label>
                              <input
                                type="text"
                                value={bookingData.paymentInfo.billingAddress.state}
                                onChange={(e) => handleBillingAddressChange('state', e.target.value)}
                                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="State"
                                required
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                ZIP Code *
                              </label>
                              <input
                                type="text"
                                value={bookingData.paymentInfo.billingAddress.zipCode}
                                onChange={(e) => handleBillingAddressChange('zipCode', e.target.value)}
                                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="12345"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Review Booking */}
                {currentStep === 3 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Your Booking</h2>
                    
                    <div className="space-y-6">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Guest Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div><span className="font-medium">Name:</span> {bookingData.guestInfo.firstName} {bookingData.guestInfo.lastName}</div>
                          <div><span className="font-medium">Email:</span> {bookingData.guestInfo.email}</div>
                          <div><span className="font-medium">Phone:</span> {bookingData.guestInfo.phone}</div>
                        </div>
                        {bookingData.guestInfo.specialRequests && (
                          <div className="mt-3 text-sm">
                            <span className="font-medium">Special Requests:</span> {bookingData.guestInfo.specialRequests}
                          </div>
                        )}
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Payment Information</h3>
                        <div className="text-sm">
                          <div className="mb-2">
                            <span className="font-medium">Card:</span> **** **** **** {bookingData.paymentInfo.cardNumber.slice(-4)}
                          </div>
                          <div>
                            <span className="font-medium">Billing Address:</span> {bookingData.paymentInfo.billingAddress.street}, {bookingData.paymentInfo.billingAddress.city}, {bookingData.paymentInfo.billingAddress.state} {bookingData.paymentInfo.billingAddress.zipCode}
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Cancellation Policy</h3>
                        <p className="text-sm text-gray-700">
                          {hotel.freeCancellation 
                            ? `Free cancellation until ${hotel.bookingDeadline} hours before check-in. After that, cancellation fees may apply.`
                            : 'This booking is non-refundable. Please review your dates carefully before confirming.'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Confirmation */}
                {currentStep === 4 && (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaCheck className="h-8 w-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking Confirmed!</h2>
                    <p className="text-gray-600 mb-6">
                      Your reservation has been successfully confirmed. You will receive a confirmation email shortly.
                    </p>
                    
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirmation Number</h3>
                      <div className="text-2xl font-bold text-green-600">{bookingData.confirmationNumber}</div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button 
                        onClick={() => window.print()}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                      >
                        Print Confirmation
                      </button>
                      <Link 
                        href="/hotels"
                        className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                      >
                        Book Another Hotel
                      </Link>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                {currentStep < 4 && (
                  <div className="flex justify-between mt-8 pt-6 border-t">
                    <button
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <FaChevronLeft className="h-4 w-4" />
                      <span>Previous</span>
                    </button>
                    
                    {currentStep === 3 ? (
                      <button
                        onClick={handleBookingSubmit}
                        className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                      >
                        <FaLock className="h-4 w-4" />
                        <span>Confirm Booking</span>
                      </button>
                    ) : (
                      <button
                        onClick={nextStep}
                        className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                      >
                        <span>Continue</span>
                        <FaChevronRight className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Booking Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
                
                {/* Hotel Info */}
                <div className="border-b pb-4 mb-4">
                  <div className="flex items-center mb-2">
                    {renderStarRating(hotel.starRating)}
                    <span className="ml-2 text-sm text-gray-600">{hotel.starRating}-Star</span>
                  </div>
                  <h4 className="font-semibold text-gray-900">{hotel.name}</h4>
                  <div className="flex items-center text-gray-600 text-sm mt-1">
                    <FaMapMarkerAlt className="h-3 w-3 mr-1" />
                    <span>{hotel.location.district}, {hotel.city}</span>
                  </div>
                </div>
                
                {/* Stay Details */}
                <div className="border-b pb-4 mb-4 space-y-3">
                  <div className="flex items-center text-sm">
                    <FaCalendarAlt className="h-4 w-4 text-gray-400 mr-2" />
                    <div>
                      <div className="font-medium">Check-in: {formatDate(searchParams.checkIn)}</div>
                      <div className="font-medium">Check-out: {formatDate(searchParams.checkOut)}</div>
                      <div className="text-gray-600">{nights} night{nights !== 1 ? 's' : ''}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <FaUsers className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{searchParams.guests} guest{searchParams.guests !== 1 ? 's' : ''}, {searchParams.rooms} room{searchParams.rooms !== 1 ? 's' : ''}</span>
                  </div>
                </div>
                
                {/* Room Details */}
                {selectedRoom && (
                  <div className="border-b pb-4 mb-4">
                    <h5 className="font-medium text-gray-900 mb-2">{selectedRoom.name}</h5>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>Up to {selectedRoom.maxGuests} guests</div>
                      <div>{selectedRoom.size} sq ft</div>
                      <div>{selectedRoom.bedType}</div>
                    </div>
                  </div>
                )}
                
                {/* Price Breakdown */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>${selectedRoom?.price}/night × {nights} nights</span>
                    <span>${roomTotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes & fees</span>
                    <span>${taxes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service fee</span>
                    <span>${fees}</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${totalPrice}</span>
                    </div>
                  </div>
                </div>
                
                {hotel.freeCancellation && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="text-xs text-green-700 font-medium">
                      Free cancellation until {hotel.bookingDeadline} hours before check-in
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default HotelBookingPage; 