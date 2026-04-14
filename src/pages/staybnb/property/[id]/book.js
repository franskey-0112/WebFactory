import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import StaybnbHeader from '../../../../components/staybnb/StaybnbHeader';
import Footer from '../../../../components/Footer';
import { 
  getPropertyById, 
  getHostById,
  calculateTotalPrice,
  calculateNights,
  formatCurrency,
  formatDate
} from '../../../../utils/staybnbData';
import { 
  FaStar, 
  FaArrowLeft,
  FaCreditCard,
  FaPaypal,
  FaApplePay,
  FaShieldAlt,
  FaExclamationTriangle,
  FaCheck,
  FaTimes
} from 'react-icons/fa';

const BookingPage = () => {
  const router = useRouter();
  const { id } = router.query;
  
  const [property, setProperty] = useState(null);
  const [host, setHost] = useState(null);
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1
  });
  const [guestDetails, setGuestDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (id) {
      const propertyData = getPropertyById(id);
      if (propertyData) {
        setProperty(propertyData);
        setHost(getHostById(propertyData.hostId));
      }
    }

    // Get booking data from URL parameters
    const { checkIn, checkOut, guests } = router.query;
    if (checkIn && checkOut && guests) {
      setBookingData({
        checkIn,
        checkOut,
        guests: parseInt(guests)
      });
    }
  }, [id, router.query]);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏠</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Property not found</h2>
          <p className="text-gray-600 mb-4">The property you're trying to book doesn't exist.</p>
          <Link href="/staybnb" className="text-rose-500 hover:text-rose-600 font-medium">
            Back to search
          </Link>
        </div>
      </div>
    );
  }

  const calculateBookingTotal = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return null;
    const nights = calculateNights(bookingData.checkIn, bookingData.checkOut);
    return calculateTotalPrice(property, nights);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!guestDetails.firstName || !guestDetails.lastName || !guestDetails.email) {
      alert('Please fill in all required fields');
      return;
    }

    if (paymentMethod === 'card' && (!paymentDetails.cardNumber || !paymentDetails.expiryDate || !paymentDetails.cvv)) {
      alert('Please fill in all payment details');
      return;
    }

    setIsProcessing(true);

    // Simulate booking process
    setTimeout(() => {
      setIsProcessing(false);
      setShowConfirmation(true);
    }, 2000);
  };

  const bookingTotal = calculateBookingTotal();

  if (!bookingTotal) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📅</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Invalid booking dates</h2>
          <p className="text-gray-600 mb-4">Please select valid check-in and check-out dates.</p>
          <Link href={`/staybnb/property/${id}`} className="text-rose-500 hover:text-rose-600 font-medium">
            Back to property
          </Link>
        </div>
      </div>
    );
  }

  if (showConfirmation) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-2xl p-8 text-center shadow-lg">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCheck className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">
              Booking Confirmed!
            </h1>
            <p className="text-gray-600 mb-8">
              Your reservation has been confirmed. You'll receive a confirmation email shortly with all the details.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="text-left">
                <h3 className="font-medium text-gray-900 mb-2">{property.title}</h3>
                <p className="text-sm text-gray-600">
                  {formatDate(bookingData.checkIn)} - {formatDate(bookingData.checkOut)}
                </p>
                <p className="text-sm text-gray-600">
                  {bookingData.guests} guest{bookingData.guests !== 1 ? 's' : ''}
                </p>
                <p className="text-lg font-semibold text-gray-900 mt-2">
                  Total: {formatCurrency(bookingTotal.total)}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <Link 
                href="/staybnb/trips"
                className="w-full bg-rose-500 text-white py-3 rounded-lg hover:bg-rose-600 transition-colors font-medium block text-center"
              >
                View Your Trips
              </Link>
              <Link 
                href="/staybnb"
                className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:border-gray-400 transition-colors font-medium block text-center"
              >
                Continue Browsing
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Book {property.title} | StayBnB</title>
        <meta name="description" content={`Complete your booking for ${property.title}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <StaybnbHeader isSearchPage={true} />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <Link 
            href={`/staybnb/property/${id}`}
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-8"
          >
            <FaArrowLeft className="h-4 w-4" />
            <span>Back to property</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Form */}
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                  Complete your booking
                </h1>
                <p className="text-gray-600">
                  Just a few more details and you're all set!
                </p>
              </div>

              <form onSubmit={handleBookingSubmit} className="space-y-8">
                {/* Guest Information */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Guest information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First name *
                      </label>
                      <input
                        type="text"
                        required
                        value={guestDetails.firstName}
                        onChange={(e) => setGuestDetails({...guestDetails, firstName: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last name *
                      </label>
                      <input
                        type="text"
                        required
                        value={guestDetails.lastName}
                        onChange={(e) => setGuestDetails({...guestDetails, lastName: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email address *
                    </label>
                    <input
                      type="email"
                      required
                      value={guestDetails.email}
                      onChange={(e) => setGuestDetails({...guestDetails, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone number
                    </label>
                    <input
                      type="tel"
                      value={guestDetails.phone}
                      onChange={(e) => setGuestDetails({...guestDetails, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message to host (optional)
                    </label>
                    <textarea
                      rows={3}
                      value={guestDetails.message}
                      onChange={(e) => setGuestDetails({...guestDetails, message: e.target.value})}
                      placeholder="Tell your host a little about yourself and why you're traveling..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                    />
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment method</h2>
                  
                  <div className="space-y-4 mb-6">
                    <label className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="h-4 w-4 text-rose-500 focus:ring-rose-500"
                      />
                      <FaCreditCard className="h-5 w-5 text-gray-600" />
                      <span className="font-medium text-gray-900">Credit or debit card</span>
                    </label>

                    <label className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={paymentMethod === 'paypal'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="h-4 w-4 text-rose-500 focus:ring-rose-500"
                      />
                      <FaPaypal className="h-5 w-5 text-blue-600" />
                      <span className="font-medium text-gray-900">PayPal</span>
                    </label>

                    <label className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="apple"
                        checked={paymentMethod === 'apple'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="h-4 w-4 text-rose-500 focus:ring-rose-500"
                      />
                      <FaApplePay className="h-5 w-5 text-gray-900" />
                      <span className="font-medium text-gray-900">Apple Pay</span>
                    </label>
                  </div>

                  {/* Card Details */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Card number *
                        </label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          value={paymentDetails.cardNumber}
                          onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Expiry date *
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={paymentDetails.expiryDate}
                            onChange={(e) => setPaymentDetails({...paymentDetails, expiryDate: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            CVV *
                          </label>
                          <input
                            type="text"
                            placeholder="123"
                            value={paymentDetails.cvv}
                            onChange={(e) => setPaymentDetails({...paymentDetails, cvv: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cardholder name *
                        </label>
                        <input
                          type="text"
                          value={paymentDetails.cardholderName}
                          onChange={(e) => setPaymentDetails({...paymentDetails, cardholderName: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                        />
                      </div>
                    </div>
                  )}

                  {/* Demo Notice */}
                  <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <FaExclamationTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-yellow-800">
                        <p className="font-medium mb-1">Demo Mode</p>
                        <p>This is a demonstration booking. No actual payment will be processed.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <FaShieldAlt className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">Your booking is protected</p>
                      <p>StayBnB provides 24/7 customer support and secure payment processing.</p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-rose-500 text-white py-4 rounded-lg hover:bg-rose-600 transition-colors font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'Processing...' : 'Confirm and pay'}
                </button>
              </form>
            </div>

            {/* Right Column - Booking Summary */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Booking summary</h2>

                {/* Property Info */}
                <div className="flex space-x-4 mb-6 pb-6 border-b border-gray-200">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">{property.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{property.shortDescription}</p>
                    <div className="flex items-center space-x-1">
                      <FaStar className="h-3 w-3 text-gray-900 fill-current" />
                      <span className="text-sm font-medium text-gray-900">{property.rating}</span>
                      <span className="text-sm text-gray-500">({property.reviewCount})</span>
                    </div>
                  </div>
                </div>

                {/* Booking Details */}
                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Your trip</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Dates</span>
                        <span className="text-gray-900">
                          {formatDate(bookingData.checkIn)} - {formatDate(bookingData.checkOut)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Guests</span>
                        <span className="text-gray-900">
                          {bookingData.guests} guest{bookingData.guests !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 pt-6 border-t border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-4">Price details</h4>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {formatCurrency(property.pricePerNight)} x {bookingTotal.nights} night{bookingTotal.nights !== 1 ? 's' : ''}
                    </span>
                    <span className="text-gray-900">{formatCurrency(bookingTotal.subtotal)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Cleaning fee</span>
                    <span className="text-gray-900">{formatCurrency(bookingTotal.cleaningFee)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Service fee</span>
                    <span className="text-gray-900">{formatCurrency(bookingTotal.serviceFee)}</span>
                  </div>
                  
                  <div className="flex justify-between font-semibold text-lg pt-3 border-t border-gray-200">
                    <span className="text-gray-900">Total (USD)</span>
                    <span className="text-gray-900">{formatCurrency(bookingTotal.total)}</span>
                  </div>
                </div>

                {/* Cancellation Policy */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Cancellation policy:</span> {property.availability.cancellationPolicy}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BookingPage;
