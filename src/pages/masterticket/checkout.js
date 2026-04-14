import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FaLock, FaCreditCard, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaArrowLeft, FaCheck } from 'react-icons/fa';
import MasterTicketHeader from '../../components/masterticket/MasterTicketHeader';
import masterTicketDataUtils from '../../utils/masterTicketData';

const CheckoutPage = () => {
  const router = useRouter();
  const [ticketData, setTicketData] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  const { formatPrice, formatDate, formatTime, calculateFees } = masterTicketDataUtils;

  useEffect(() => {
    // Get ticket data from sessionStorage
    const storedTicketData = sessionStorage.getItem('ticketPurchase');
    if (storedTicketData) {
      setTicketData(JSON.parse(storedTicketData));
    } else {
      // Redirect to search if no ticket data
      router.push('/masterticket/search');
    }
  }, []);

  const handleCustomerInfoChange = (field, value) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePaymentInfoChange = (field, value) => {
    setPaymentInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    const requiredCustomerFields = ['firstName', 'lastName', 'email', 'phone'];
    const requiredPaymentFields = ['cardNumber', 'expiryDate', 'cvv', 'cardholderName'];
    
    for (const field of requiredCustomerFields) {
      if (!customerInfo[field].trim()) {
        alert(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }
    
    for (const field of requiredPaymentFields) {
      if (!paymentInfo[field].trim()) {
        alert(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerInfo.email)) {
      alert('Please enter a valid email address');
      return false;
    }
    
    return true;
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const newOrderId = 'MT' + Date.now().toString().slice(-8);
      setOrderId(newOrderId);
      setOrderComplete(true);
      setIsProcessing(false);
      
      // Clear ticket data from sessionStorage
      sessionStorage.removeItem('ticketPurchase');
    }, 3000);
  };

  if (!ticketData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <MasterTicketHeader />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading checkout...</p>
          </div>
        </div>
      </div>
    );
  }

  const fees = calculateFees(ticketData.ticketType.price, ticketData.quantity);

  if (orderComplete) {
    return (
      <>
        <Head>
          <title>Order Confirmation - MasterTicket</title>
          <meta httpEquiv="Content-Language" content="en-US" />
        </Head>

        <div className="min-h-screen bg-gray-50">
          <MasterTicketHeader />
          
          <div className="max-w-2xl mx-auto px-4 py-16">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCheck className="text-white text-2xl" />
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
              <p className="text-gray-600 mb-6">
                Thank you for your purchase. Your tickets have been confirmed and will be delivered to your email.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <div className="text-left space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-bold">{orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Event:</span>
                    <span className="font-medium">{ticketData.eventTitle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span>{formatDate(ticketData.date)} at {formatTime(ticketData.time)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Venue:</span>
                    <span>{ticketData.venue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tickets:</span>
                    <span>{ticketData.quantity}x {ticketData.ticketType.name}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-3">
                    <span>Total Paid:</span>
                    <span className="text-green-600">{formatPrice(fees.total)}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  📧 E-tickets will be sent to <strong>{customerInfo.email}</strong>
                </p>
                <p className="text-sm text-gray-600">
                  📱 You can also access your tickets in the MasterTicket mobile app
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link href="/masterticket">
                  <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                    Back to Home
                  </button>
                </Link>
                <button
                  onClick={() => window.print()}
                  className="flex-1 border border-blue-600 text-blue-600 py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Print Confirmation
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Checkout - {ticketData.eventTitle} | MasterTicket</title>
        <meta name="description" content="Complete your ticket purchase securely" />
        <meta httpEquiv="Content-Language" content="en-US" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <MasterTicketHeader />

        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center space-x-2 text-sm">
              <Link href="/masterticket" className="text-blue-600 hover:text-blue-800">Home</Link>
              <span className="text-gray-400">/</span>
              <Link href={`/masterticket/event/${ticketData.eventId}`} className="text-blue-600 hover:text-blue-800">
                {ticketData.eventTitle}
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600">Checkout</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-8">
              <div className="flex items-center space-x-2 mb-6">
                <Link href={`/masterticket/event/${ticketData.eventId}`}>
                  <button className="text-blue-600 hover:text-blue-800">
                    <FaArrowLeft />
                  </button>
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Secure Checkout</h1>
                <FaLock className="text-green-600" />
              </div>

              {/* Customer Information */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <FaUser className="mr-2 text-blue-600" />
                  Customer Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={customerInfo.firstName}
                      onChange={(e) => handleCustomerInfoChange('firstName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={customerInfo.lastName}
                      onChange={(e) => handleCustomerInfoChange('lastName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => handleCustomerInfoChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) => handleCustomerInfoChange('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <FaCreditCard className="mr-2 text-blue-600" />
                  Payment Information
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cardholder Name *
                    </label>
                    <input
                      type="text"
                      value={paymentInfo.cardholderName}
                      onChange={(e) => handlePaymentInfoChange('cardholderName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={paymentInfo.cardNumber}
                      onChange={(e) => handlePaymentInfoChange('cardNumber', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={paymentInfo.expiryDate}
                        onChange={(e) => handlePaymentInfoChange('expiryDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CVV *
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        value={paymentInfo.cvv}
                        onChange={(e) => handlePaymentInfoChange('cvv', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800 flex items-center">
                    <FaLock className="mr-2" />
                    Your payment information is secure and encrypted
                  </p>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="border-b border-gray-200 pb-4">
                    <h3 className="font-semibold text-gray-900">{ticketData.eventTitle}</h3>
                    <p className="text-sm text-gray-600">{formatDate(ticketData.date)} at {formatTime(ticketData.time)}</p>
                    <p className="text-sm text-gray-600">{ticketData.venue}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ticket Type:</span>
                      <span className="font-medium">{ticketData.ticketType.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Quantity:</span>
                      <span className="font-medium">{ticketData.quantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price per ticket:</span>
                      <span className="font-medium">{formatPrice(ticketData.ticketType.price)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-6 pb-4 border-b border-gray-200">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span>{formatPrice(fees.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service Fee:</span>
                    <span>{formatPrice(fees.serviceFee)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Processing Fee:</span>
                    <span>{formatPrice(fees.processingFee)}</span>
                  </div>
                </div>

                <div className="flex justify-between text-lg font-bold mb-6">
                  <span>Total:</span>
                  <span className="text-blue-600">{formatPrice(fees.total)}</span>
                </div>

                <button
                  onClick={handleSubmitOrder}
                  disabled={isProcessing}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <FaLock className="mr-2" />
                      Complete Purchase
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center mt-3">
                  By completing this purchase, you agree to our Terms & Conditions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
