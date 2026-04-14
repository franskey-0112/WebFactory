import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import CarRentalHeader from '../../components/carrental/CarRentalHeader';
import {
  FaCheckCircle,
  FaCar,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaShieldAlt,
  FaUser,
  FaCreditCard,
  FaSpinner,
  FaArrowLeft,
  FaLock,
  FaCheck,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';
import {
  getVehicleById,
  getLocationById,
  calculateDays,
  formatDateTime,
  generateBookingReference,
  addOns as allAddOns,
  insuranceOptions,
  calculateRentalCost,
  formatCurrency
} from '../../utils/carRentalData';

const steps = ['Review', 'Driver Info', 'Payment', 'Confirmation'];

const BookingPage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [vehicle, setVehicle] = useState(null);
  const [pickupLocation, setPickupLocation] = useState(null);
  const [returnLocation, setReturnLocation] = useState(null);
  const [rentalDays, setRentalDays] = useState(1);
  const [rentalCost, setRentalCost] = useState(null);
  const [bookingRef, setBookingRef] = useState('');
  const [loading, setLoading] = useState(true);
  const [showCostBreakdown, setShowCostBreakdown] = useState(false);

  const [searchParams, setSearchParams] = useState({
    pickupDate: '',
    pickupTime: '10:00',
    returnDate: '',
    returnTime: '10:00',
    pickupLocation: '',
    returnLocation: '',
    addOns: [],
    insurance: 'basic'
  });

  const [driverInfo, setDriverInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    licenseNumber: '',
    licenseCountry: 'US',
    age: '25+'
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    billingZip: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!router.isReady) return;
    const query = router.query;

    const vehicleId = query.vehicleId;
    const addOnsParam = query.addOns ? query.addOns.split(',').filter(Boolean) : [];

    const params = {
      pickupDate: query.pickupDate || '',
      pickupTime: query.pickupTime || '10:00',
      returnDate: query.returnDate || '',
      returnTime: query.returnTime || '10:00',
      pickupLocation: query.pickupLocation || '',
      returnLocation: query.returnLocation || query.pickupLocation || '',
      addOns: addOnsParam,
      insurance: query.insurance || 'basic'
    };
    setSearchParams(params);

    if (!vehicleId) {
      router.push('/carrental/search');
      return;
    }

    const v = getVehicleById(vehicleId);
    if (!v) {
      router.push('/carrental/search');
      return;
    }
    setVehicle(v);

    const pLoc = getLocationById(params.pickupLocation);
    const rLoc = getLocationById(params.returnLocation);
    setPickupLocation(pLoc);
    setReturnLocation(rLoc);

    if (params.pickupDate && params.returnDate) {
      const days = calculateDays(
        `${params.pickupDate}T${params.pickupTime}:00`,
        `${params.returnDate}T${params.returnTime}:00`
      );
      setRentalDays(days || 1);
      const cost = calculateRentalCost(vehicleId, days || 1, addOnsParam, params.insurance);
      setRentalCost(cost);
    }

    setLoading(false);
  }, [router.isReady, router.query]);

  const validateDriverInfo = () => {
    const errs = {};
    if (!driverInfo.firstName.trim()) errs.firstName = 'Required';
    if (!driverInfo.lastName.trim()) errs.lastName = 'Required';
    if (!driverInfo.email.trim() || !/\S+@\S+\.\S+/.test(driverInfo.email)) errs.email = 'Valid email required';
    if (!driverInfo.phone.trim()) errs.phone = 'Required';
    if (!driverInfo.licenseNumber.trim()) errs.licenseNumber = 'Required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validatePayment = () => {
    const errs = {};
    const cardNum = paymentInfo.cardNumber.replace(/\s/g, '');
    if (cardNum.length < 15) errs.cardNumber = 'Invalid card number';
    if (!paymentInfo.cardHolder.trim()) errs.cardHolder = 'Required';
    if (!paymentInfo.expiryMonth || !paymentInfo.expiryYear) errs.expiry = 'Required';
    if (!paymentInfo.cvv || paymentInfo.cvv.length < 3) errs.cvv = 'Invalid CVV';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && !validateDriverInfo()) return;
    if (currentStep === 2) {
      if (!validatePayment()) return;
      setBookingRef(generateBookingReference());
    }
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    window.scrollTo(0, 0);
  };

  const formatCardNumber = (val) => {
    return val.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
  };

  const selectedInsurance = insuranceOptions.find(i => i.id === searchParams.insurance);
  const selectedAddOnDetails = allAddOns.filter(a => searchParams.addOns.includes(a.id));

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <CarRentalHeader />
        <div className="flex items-center justify-center py-24">
          <div className="text-center">
            <FaSpinner className="animate-spin text-4xl text-orange-500 mb-4 mx-auto" />
            <p className="text-gray-600">Loading booking details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Book {vehicle?.name} - CarRental</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <CarRentalHeader />

        {/* Progress Steps */}
        <div className="bg-white border-b border-gray-200 sticky top-0 lg:top-20 z-40">
          <div className="max-w-5xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {steps.map((step, idx) => (
                <React.Fragment key={step}>
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                      idx < currentStep ? 'bg-green-500 text-white' :
                      idx === currentStep ? 'bg-orange-500 text-white' :
                      'bg-gray-200 text-gray-500'
                    }`}>
                      {idx < currentStep ? <FaCheck size={12} /> : idx + 1}
                    </div>
                    <span className={`ml-2 text-sm font-medium hidden sm:block ${
                      idx === currentStep ? 'text-orange-600' : idx < currentStep ? 'text-green-600' : 'text-gray-400'
                    }`}>{step}</span>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-3 ${idx < currentStep ? 'bg-green-400' : 'bg-gray-200'}`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Main Content */}
            <div className="lg:col-span-2">

              {/* Step 0: Review */}
              {currentStep === 0 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">Review Your Booking</h2>

                  {/* Vehicle Card */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-48 h-36 flex-shrink-0">
                        <img
                          src={vehicle?.images?.[0] || 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400'}
                          alt={vehicle?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-5 flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-xs font-semibold text-orange-500 uppercase tracking-wide">{vehicle?.category}</p>
                            <h3 className="text-xl font-bold text-gray-900">{vehicle?.name}</h3>
                            <p className="text-sm text-gray-500">{vehicle?.year} · {vehicle?.transmission} · {vehicle?.seats} seats</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-orange-600">{formatCurrency(vehicle?.pricing?.dailyRate)}</p>
                            <p className="text-xs text-gray-500">per day</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {vehicle?.features?.slice(0, 3).map(f => (
                            <span key={f} className="inline-flex items-center gap-1 text-xs text-gray-600 bg-gray-100 rounded-full px-2 py-1">
                              <FaCheck size={9} className="text-green-500" /> {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Rental Details */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-4">
                    <h3 className="font-semibold text-gray-900">Rental Details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <FaMapMarkerAlt className="text-orange-500 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500">Pick-up Location</p>
                          <p className="text-sm font-medium text-gray-900">{pickupLocation?.name || searchParams.pickupLocation || 'Not specified'}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <FaMapMarkerAlt className="text-red-500 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500">Return Location</p>
                          <p className="text-sm font-medium text-gray-900">{returnLocation?.name || searchParams.returnLocation || pickupLocation?.name || 'Same as pick-up'}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <FaCalendarAlt className="text-orange-500 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500">Pick-up Date & Time</p>
                          <p className="text-sm font-medium text-gray-900">{searchParams.pickupDate || 'Not set'} at {searchParams.pickupTime}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <FaCalendarAlt className="text-red-500 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500">Return Date & Time</p>
                          <p className="text-sm font-medium text-gray-900">{searchParams.returnDate || 'Not set'} at {searchParams.returnTime}</p>
                        </div>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-gray-100 flex items-center gap-2 text-sm text-gray-600">
                      <FaClock className="text-orange-400" />
                      <span><strong>{rentalDays}</strong> day{rentalDays !== 1 ? 's' : ''} rental</span>
                    </div>
                  </div>

                  {/* Insurance */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                    <h3 className="font-semibold text-gray-900 mb-3">Insurance</h3>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <FaShieldAlt className="text-blue-600 text-xl flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{selectedInsurance?.name || 'Basic Coverage'}</p>
                        <p className="text-sm text-gray-600">{selectedInsurance?.description || 'Third party liability included'}</p>
                      </div>
                      <p className="font-semibold text-blue-600">
                        {selectedInsurance ? formatCurrency(selectedInsurance.dailyRate) + '/day' : 'Included'}
                      </p>
                    </div>
                  </div>

                  {/* Add-ons */}
                  {selectedAddOnDetails.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                      <h3 className="font-semibold text-gray-900 mb-3">Selected Add-ons</h3>
                      <div className="space-y-2">
                        {selectedAddOnDetails.map(addOn => (
                          <div key={addOn.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                            <div className="flex items-center gap-2">
                              <FaCheck className="text-green-500" size={12} />
                              <span className="text-sm text-gray-800">{addOn.name}</span>
                            </div>
                            <span className="text-sm font-medium text-gray-700">{formatCurrency(addOn.dailyRate)}/day</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 1: Driver Info */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">Driver Information</h2>
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center gap-2 mb-5 text-sm text-blue-700 bg-blue-50 rounded-lg p-3">
                      <FaUser className="flex-shrink-0" />
                      <span>The primary driver must be present at pick-up with a valid license.</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                        <input
                          type="text"
                          value={driverInfo.firstName}
                          onChange={e => setDriverInfo(p => ({ ...p, firstName: e.target.value }))}
                          className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none ${errors.firstName ? 'border-red-400' : 'border-gray-300'}`}
                          placeholder="John"
                        />
                        {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                        <input
                          type="text"
                          value={driverInfo.lastName}
                          onChange={e => setDriverInfo(p => ({ ...p, lastName: e.target.value }))}
                          className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none ${errors.lastName ? 'border-red-400' : 'border-gray-300'}`}
                          placeholder="Smith"
                        />
                        {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                        <input
                          type="email"
                          value={driverInfo.email}
                          onChange={e => setDriverInfo(p => ({ ...p, email: e.target.value }))}
                          className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none ${errors.email ? 'border-red-400' : 'border-gray-300'}`}
                          placeholder="john@example.com"
                        />
                        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                        <input
                          type="tel"
                          value={driverInfo.phone}
                          onChange={e => setDriverInfo(p => ({ ...p, phone: e.target.value }))}
                          className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none ${errors.phone ? 'border-red-400' : 'border-gray-300'}`}
                          placeholder="+1 (555) 000-0000"
                        />
                        {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Driver's License Number *</label>
                        <input
                          type="text"
                          value={driverInfo.licenseNumber}
                          onChange={e => setDriverInfo(p => ({ ...p, licenseNumber: e.target.value.toUpperCase() }))}
                          className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none ${errors.licenseNumber ? 'border-red-400' : 'border-gray-300'}`}
                          placeholder="D1234567"
                        />
                        {errors.licenseNumber && <p className="text-xs text-red-500 mt-1">{errors.licenseNumber}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">License Country</label>
                        <select
                          value={driverInfo.licenseCountry}
                          onChange={e => setDriverInfo(p => ({ ...p, licenseCountry: e.target.value }))}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none"
                        >
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="GB">United Kingdom</option>
                          <option value="AU">Australia</option>
                          <option value="DE">Germany</option>
                          <option value="FR">France</option>
                          <option value="JP">Japan</option>
                          <option value="OTHER">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Payment */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">Payment</h2>
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center gap-2 mb-5 text-sm text-green-700 bg-green-50 rounded-lg p-3">
                      <FaLock className="flex-shrink-0" />
                      <span>Your payment information is encrypted and secure.</span>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Card Number *</label>
                        <div className="relative">
                          <FaCreditCard className="absolute left-3 top-3 text-gray-400" />
                          <input
                            type="text"
                            value={paymentInfo.cardNumber}
                            onChange={e => setPaymentInfo(p => ({ ...p, cardNumber: formatCardNumber(e.target.value) }))}
                            className={`w-full border rounded-lg pl-9 pr-3 py-2.5 text-sm focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none ${errors.cardNumber ? 'border-red-400' : 'border-gray-300'}`}
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                          />
                        </div>
                        {errors.cardNumber && <p className="text-xs text-red-500 mt-1">{errors.cardNumber}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name *</label>
                        <input
                          type="text"
                          value={paymentInfo.cardHolder}
                          onChange={e => setPaymentInfo(p => ({ ...p, cardHolder: e.target.value }))}
                          className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none ${errors.cardHolder ? 'border-red-400' : 'border-gray-300'}`}
                          placeholder="John Smith"
                        />
                        {errors.cardHolder && <p className="text-xs text-red-500 mt-1">{errors.cardHolder}</p>}
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Month *</label>
                          <select
                            value={paymentInfo.expiryMonth}
                            onChange={e => setPaymentInfo(p => ({ ...p, expiryMonth: e.target.value }))}
                            className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-orange-400 outline-none ${errors.expiry ? 'border-red-400' : 'border-gray-300'}`}
                          >
                            <option value="">MM</option>
                            {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map(m => (
                              <option key={m} value={m}>{m}</option>
                            ))}
                          </select>
                        </div>
                        <div className="col-span-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Year *</label>
                          <select
                            value={paymentInfo.expiryYear}
                            onChange={e => setPaymentInfo(p => ({ ...p, expiryYear: e.target.value }))}
                            className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-orange-400 outline-none ${errors.expiry ? 'border-red-400' : 'border-gray-300'}`}
                          >
                            <option value="">YY</option>
                            {Array.from({ length: 10 }, (_, i) => String(new Date().getFullYear() + i).slice(-2)).map(y => (
                              <option key={y} value={y}>{y}</option>
                            ))}
                          </select>
                          {errors.expiry && <p className="text-xs text-red-500 mt-1">{errors.expiry}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">CVV *</label>
                          <input
                            type="text"
                            value={paymentInfo.cvv}
                            onChange={e => setPaymentInfo(p => ({ ...p, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                            className={`w-full border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-orange-400 outline-none ${errors.cvv ? 'border-red-400' : 'border-gray-300'}`}
                            placeholder="123"
                          />
                          {errors.cvv && <p className="text-xs text-red-500 mt-1">{errors.cvv}</p>}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Billing ZIP Code</label>
                        <input
                          type="text"
                          value={paymentInfo.billingZip}
                          onChange={e => setPaymentInfo(p => ({ ...p, billingZip: e.target.value.replace(/\D/g, '').slice(0, 5) }))}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-orange-400 outline-none"
                          placeholder="90210"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Confirmation */}
              {currentStep === 3 && (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaCheckCircle className="text-green-500 text-4xl" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
                  <p className="text-gray-600 mb-6">Your reservation has been successfully placed.</p>

                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-6 text-left max-w-md mx-auto">
                    <p className="text-sm text-gray-500 mb-1">Booking Reference</p>
                    <p className="text-2xl font-bold text-orange-600 tracking-widest">{bookingRef}</p>
                    <p className="text-xs text-gray-500 mt-2">Save this reference number for your records.</p>
                  </div>

                  <div className="bg-white rounded-xl border border-gray-200 p-5 text-left max-w-md mx-auto mb-6 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Vehicle</span>
                      <span className="font-medium">{vehicle?.name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Driver</span>
                      <span className="font-medium">{driverInfo.firstName} {driverInfo.lastName}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Pick-up</span>
                      <span className="font-medium">{searchParams.pickupDate} · {searchParams.pickupTime}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Return</span>
                      <span className="font-medium">{searchParams.returnDate} · {searchParams.returnTime}</span>
                    </div>
                    <div className="flex justify-between text-sm border-t pt-3">
                      <span className="font-semibold">Total Charged</span>
                      <span className="font-bold text-orange-600">{rentalCost ? formatCurrency(rentalCost.total) : '—'}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 mb-6">A confirmation email has been sent to <strong>{driverInfo.email}</strong></p>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link href="/carrental" className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-3 rounded-lg transition-colors">
                      <FaCar /> Back to Home
                    </Link>
                    <Link href="/carrental/search" className="inline-flex items-center justify-center gap-2 border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium px-6 py-3 rounded-lg transition-colors">
                      Search More Vehicles
                    </Link>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              {currentStep < 3 && (
                <div className="flex items-center justify-between mt-8">
                  {currentStep > 0 ? (
                    <button
                      onClick={() => { setCurrentStep(prev => prev - 1); window.scrollTo(0, 0); }}
                      className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
                    >
                      <FaArrowLeft size={14} /> Back
                    </button>
                  ) : (
                    <Link href={`/carrental/vehicle/${vehicle?.id}`} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium">
                      <FaArrowLeft size={14} /> Back to Vehicle
                    </Link>
                  )}
                  <button
                    onClick={handleNext}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors flex items-center gap-2"
                  >
                    {currentStep === 2 ? (
                      <><FaLock size={14} /> Confirm & Pay {rentalCost ? formatCurrency(rentalCost.total) : ''}</>
                    ) : (
                      'Continue'
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar - Price Summary */}
            {currentStep < 3 && (
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sticky top-32">
                  <h3 className="font-semibold text-gray-900 mb-4">Price Summary</h3>

                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                    <img
                      src={vehicle?.images?.[0]}
                      alt={vehicle?.name}
                      className="w-16 h-12 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium text-sm text-gray-900">{vehicle?.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{vehicle?.category}</p>
                    </div>
                  </div>

                  {rentalCost ? (
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-gray-600">
                        <span>{formatCurrency(vehicle?.pricing?.dailyRate)} × {rentalDays} day{rentalDays !== 1 ? 's' : ''}</span>
                        <span>{formatCurrency(rentalCost.basePrice)}</span>
                      </div>
                      {rentalCost.insuranceCost > 0 && (
                        <div className="flex justify-between text-gray-600">
                          <span>Insurance</span>
                          <span>{formatCurrency(rentalCost.insuranceCost)}</span>
                        </div>
                      )}
                      {rentalCost.addOnsCost > 0 && (
                        <div className="flex justify-between text-gray-600">
                          <span>Add-ons</span>
                          <span>{formatCurrency(rentalCost.addOnsCost)}</span>
                        </div>
                      )}
                      {rentalCost.taxes > 0 && (
                        <div className="flex justify-between text-gray-600">
                          <span>Taxes & fees</span>
                          <span>{formatCurrency(rentalCost.taxes)}</span>
                        </div>
                      )}
                      <button
                        onClick={() => setShowCostBreakdown(!showCostBreakdown)}
                        className="flex items-center gap-1 text-xs text-orange-600 hover:text-orange-700"
                      >
                        {showCostBreakdown ? <FaChevronUp size={10} /> : <FaChevronDown size={10} />}
                        {showCostBreakdown ? 'Hide' : 'Show'} breakdown
                      </button>
                      {showCostBreakdown && rentalCost.breakdown && (
                        <div className="bg-gray-50 rounded-lg p-3 space-y-1 text-xs text-gray-500">
                          {rentalCost.breakdown.map((item, i) => (
                            <div key={i} className="flex justify-between">
                              <span>{item.label}</span>
                              <span>{formatCurrency(item.amount)}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="flex justify-between font-bold text-base border-t pt-3 text-gray-900">
                        <span>Total</span>
                        <span className="text-orange-600">{formatCurrency(rentalCost.total)}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-gray-600">
                        <span>{formatCurrency(vehicle?.pricing?.dailyRate)} × {rentalDays} day{rentalDays !== 1 ? 's' : ''}</span>
                        <span>{formatCurrency((vehicle?.pricing?.dailyRate || 0) * rentalDays)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-base border-t pt-3 text-gray-900">
                        <span>Estimated Total</span>
                        <span className="text-orange-600">{formatCurrency((vehicle?.pricing?.dailyRate || 0) * rentalDays)}</span>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <FaShieldAlt className="text-green-500" />
                      <span>Free cancellation up to 24h before pick-up</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingPage;
