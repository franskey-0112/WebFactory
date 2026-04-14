import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import FlightDetails from '../../../components/FlightDetails';
import { flightData } from '../../../utils/flightData';
import Link from 'next/link';
import { FaCreditCard, FaUserCircle, FaCheck, FaPhone, FaEnvelope } from 'react-icons/fa';

// Booking steps
const STEPS = {
  PASSENGER_INFO: 'passenger_info',
  PAYMENT: 'payment',
  CONFIRMATION: 'confirmation'
};

const BookFlight = () => {
  const router = useRouter();
  const { id } = router.query;

  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(STEPS.PASSENGER_INFO);
  const [passengerInfo, setPassengerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    nationality: 'China',
    idType: 'ID Card',
    idNumber: '',
    specialRequests: ''
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
    saveCard: false
  });
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingReference, setBookingReference] = useState('');

  // Get flight details
  useEffect(() => {
    if (!router.isReady) return;
    
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const flightDetails = flightData.find(f => f.id === parseInt(id));
      
      if (flightDetails) {
        setFlight(flightDetails);
      } else {
        // If flight not found, redirect to search page
        router.push('/flights/search');
      }
      
      setLoading(false);
    }, 500);
  }, [router.isReady, id, router]);

  // Handle form input changes
  const handlePassengerInputChange = (e) => {
    const { name, value } = e.target;
    setPassengerInfo(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPaymentInfo(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  // Handle next step button
  const handleNextStep = () => {
    if (currentStep === STEPS.PASSENGER_INFO) {
      setCurrentStep(STEPS.PAYMENT);
    } else if (currentStep === STEPS.PAYMENT) {
      // Simulate booking process
      setCurrentStep(STEPS.CONFIRMATION);
      processBooking();
    }
  };

  // Handle previous step button
  const handlePreviousStep = () => {
    if (currentStep === STEPS.PAYMENT) {
      setCurrentStep(STEPS.PASSENGER_INFO);
    }
  };

  // Process booking
  const processBooking = () => {
    // Simulate API call delay
    setTimeout(() => {
      // Generate random booking reference
      const bookingRef = Math.random().toString(36).substring(2, 10).toUpperCase();
      setBookingReference(bookingRef);
      setBookingComplete(true);
    }, 2000);
  };

  // Render passenger information form
  const renderPassengerInfoForm = () => (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Passenger Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            className="input-field"
            value={passengerInfo.lastName}
            onChange={handlePassengerInputChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            className="input-field"
            value={passengerInfo.firstName}
            onChange={handlePassengerInputChange}
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <div className="relative">
            <input
              type="email"
              name="email"
              className="input-field pl-10"
              value={passengerInfo.email}
              onChange={handlePassengerInputChange}
              required
            />
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <div className="relative">
            <input
              type="tel"
              name="phone"
              className="input-field pl-10"
              value={passengerInfo.phone}
              onChange={handlePassengerInputChange}
              required
            />
            <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
          <select
            name="nationality"
            className="input-field"
            value={passengerInfo.nationality}
            onChange={handlePassengerInputChange}
            required
          >
            <option value="China">China</option>
            <option value="United States">United States</option>
            <option value="Japan">Japan</option>
            <option value="South Korea">South Korea</option>
            <option value="Singapore">Singapore</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ID Type</label>
          <select
            name="idType"
            className="input-field"
            value={passengerInfo.idType}
            onChange={handlePassengerInputChange}
            required
          >
            <option value="ID Card">ID Card</option>
            <option value="Passport">Passport</option>
            <option value="Military ID">Military ID</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">ID Number</label>
        <input
          type="text"
          name="idNumber"
          className="input-field"
          value={passengerInfo.idNumber}
          onChange={handlePassengerInputChange}
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests (Optional)</label>
        <textarea
          name="specialRequests"
          className="input-field h-24"
          value={passengerInfo.specialRequests}
          onChange={handlePassengerInputChange}
          placeholder="Please specify if you need wheelchair, special meals, or other assistance"
        ></textarea>
      </div>
    </div>
  );

  // Render payment form
  const renderPaymentForm = () => (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Payment Information</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
        <input
          type="text"
          name="cardName"
          className="input-field"
          value={paymentInfo.cardName}
          onChange={handlePaymentInputChange}
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
        <div className="relative">
          <input
            type="text"
            name="cardNumber"
            className="input-field pl-10"
            placeholder="XXXX XXXX XXXX XXXX"
            value={paymentInfo.cardNumber}
            onChange={handlePaymentInputChange}
            required
          />
          <FaCreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date (MM/YY)</label>
          <input
            type="text"
            name="expiry"
            className="input-field"
            placeholder="MM/YY"
            value={paymentInfo.expiry}
            onChange={handlePaymentInputChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Security Code (CVV)</label>
          <input
            type="text"
            name="cvv"
            className="input-field"
            placeholder="XXX"
            value={paymentInfo.cvv}
            onChange={handlePaymentInputChange}
            required
          />
        </div>
      </div>
      
      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="saveCard"
            className="form-checkbox h-5 w-5 text-booking-blue"
            checked={paymentInfo.saveCard}
            onChange={handlePaymentInputChange}
          />
          <span className="ml-2 text-sm text-gray-600">Save this card for future use</span>
        </label>
      </div>
    </div>
  );

  // Render confirmation page
  const renderConfirmation = () => (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-center">
      {!bookingComplete ? (
        <div className="py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-booking-blue mx-auto mb-4"></div>
          <h2 className="text-xl font-bold mb-2">Processing your booking</h2>
          <p className="text-gray-600">Please wait and do not close this page...</p>
        </div>
      ) : (
        <div className="py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaCheck className="text-green-600 text-2xl" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Booking Successful!</h2>
          <p className="text-gray-600 mb-4">Your booking has been confirmed. Booking reference: <span className="font-bold">{bookingReference}</span></p>
          <p className="text-gray-600 mb-6">Booking confirmation has been sent to your email</p>
          
          <div className="flex justify-center space-x-4">
            <Link href="/" className="btn-primary">
              Return to Home
            </Link>
            <Link href="/flights/search" className="btn-secondary">
              Continue Searching
            </Link>
          </div>
        </div>
      )}
    </div>
  );

  // Price summary
  const renderPriceSummary = () => (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
      <h2 className="text-xl font-bold mb-4">Price Summary</h2>
      
      <div className="border-b border-gray-200 pb-4 mb-4">
        <div className="flex justify-between mb-2">
          <span>Adult x 1</span>
          <span>¥{flight.price}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Taxes</span>
          <span>Included</span>
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span>Service Fee</span>
          <span>¥0</span>
        </div>
      </div>
      
      <div className="flex justify-between font-bold text-lg mb-6">
        <span>Total</span>
        <span>¥{flight.price}</span>
      </div>
      
      {currentStep === STEPS.PASSENGER_INFO && (
        <button
          className="btn-primary w-full"
          onClick={handleNextStep}
        >
          Continue to Payment
        </button>
      )}
      
      {currentStep === STEPS.PAYMENT && (
        <div className="space-y-3">
          <button
            className="btn-primary w-full"
            onClick={handleNextStep}
          >
            Confirm Payment
          </button>
          <button
            className="w-full py-2 px-4 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50"
            onClick={handlePreviousStep}
          >
            Back
          </button>
        </div>
      )}
    </div>
  );

  // Render step indicator
  const renderStepIndicator = () => (
    <div className="flex items-center mb-6">
      <div className={`flex items-center relative ${currentStep === STEPS.PASSENGER_INFO ? 'text-booking-blue font-medium' : 'text-gray-500'}`}>
        <div className={`w-8 h-8 flex items-center justify-center rounded-full mr-2 ${currentStep === STEPS.PASSENGER_INFO ? 'bg-booking-blue text-white' : 'bg-gray-200'}`}>
          1
        </div>
        <span className="hidden sm:inline">Passenger Info</span>
      </div>
      <div className="w-12 sm:w-24 h-px bg-gray-300 mx-2"></div>
      <div className={`flex items-center relative ${currentStep === STEPS.PAYMENT ? 'text-booking-blue font-medium' : 'text-gray-500'}`}>
        <div className={`w-8 h-8 flex items-center justify-center rounded-full mr-2 ${currentStep === STEPS.PAYMENT ? 'bg-booking-blue text-white' : 'bg-gray-200'}`}>
          2
        </div>
        <span className="hidden sm:inline">Payment</span>
      </div>
      <div className="w-12 sm:w-24 h-px bg-gray-300 mx-2"></div>
      <div className={`flex items-center relative ${currentStep === STEPS.CONFIRMATION ? 'text-booking-blue font-medium' : 'text-gray-500'}`}>
        <div className={`w-8 h-8 flex items-center justify-center rounded-full mr-2 ${currentStep === STEPS.CONFIRMATION ? 'bg-booking-blue text-white' : 'bg-gray-200'}`}>
          3
        </div>
        <span className="hidden sm:inline">Confirmation</span>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow bg-booking-light-bg py-6">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-booking-blue"></div>
            </div>
          ) : flight ? (
            <>
              <h1 className="text-2xl font-bold mb-6">Book Flight</h1>
              
              {renderStepIndicator()}
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  {/* Flight details */}
                  <FlightDetails flight={flight} />
                  
                  {/* Current step form */}
                  {currentStep === STEPS.PASSENGER_INFO && renderPassengerInfoForm()}
                  {currentStep === STEPS.PAYMENT && renderPaymentForm()}
                  {currentStep === STEPS.CONFIRMATION && renderConfirmation()}
                </div>
                
                <div>
                  {/* Price summary */}
                  {renderPriceSummary()}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-xl font-bold mb-2">Flight Not Found</h2>
              <p className="text-gray-600 mb-4">Sorry, we couldn't find the flight you requested.</p>
              <Link href="/flights/search" className="btn-primary">
                Return to Search
              </Link>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookFlight;