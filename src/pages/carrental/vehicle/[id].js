import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import CarRentalHeader from '../../../components/carrental/CarRentalHeader';
import VehicleCard from '../../../components/carrental/VehicleCard';
import { 
  FaStar, 
  FaUsers, 
  FaSuitcase, 
  FaCog, 
  FaGasPump,
  FaShieldAlt,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
  FaHeart,
  FaRegHeart,
  FaShare,
  FaCheckCircle,
  FaPhone,
  FaInfoCircle,
  FaSpinner
} from 'react-icons/fa';
import { 
  getVehicleById, 
  getLocationById,
  getRecommendedVehicles,
  calculateRentalCost,
  calculateDays,
  formatCurrency,
  addOns,
  insuranceOptions
} from '../../../utils/carRentalData';

const VehicleDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  
  const [vehicle, setVehicle] = useState(null);
  const [recommendedVehicles, setRecommendedVehicles] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [selectedInsurance, setSelectedInsurance] = useState('basic');
  const [rentalCost, setRentalCost] = useState(null);

  const [searchParams, setSearchParams] = useState({
    pickupLocation: '',
    returnLocation: '',
    pickupDate: '',
    pickupTime: '10:00',
    returnDate: '',
    returnTime: '10:00',
    age: '25'
  });

  // Load vehicle data and search parameters
  useEffect(() => {
    if (!router.isReady || !id) return;

    const vehicleData = getVehicleById(id);
    if (!vehicleData) {
      router.push('/carrental/search');
      return;
    }

    setVehicle(vehicleData);
    
    // Get recommended vehicles
    const recommended = getRecommendedVehicles(vehicleData.category, id, 3);
    setRecommendedVehicles(recommended);

    // Load search parameters from URL
    const params = router.query;
    const searchData = {
      pickupLocation: params.pickupLocation || '',
      returnLocation: params.returnLocation || '',
      pickupDate: params.pickupDate || '',
      pickupTime: params.pickupTime || '10:00',
      returnDate: params.returnDate || '',
      returnTime: params.returnTime || '10:00',
      age: params.age || '25'
    };
    setSearchParams(searchData);

    setLoading(false);
  }, [router.isReady, id, router.query]);

  // Calculate rental cost when parameters change
  useEffect(() => {
    if (!vehicle || !searchParams.pickupDate || !searchParams.returnDate) return;

    const days = calculateDays(
      `${searchParams.pickupDate}T${searchParams.pickupTime}:00`,
      `${searchParams.returnDate}T${searchParams.returnTime}:00`
    );

    const cost = calculateRentalCost(vehicle.id, days, selectedAddOns, selectedInsurance);
    setRentalCost(cost);
  }, [vehicle, searchParams, selectedAddOns, selectedInsurance]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const nextImage = () => {
    if (vehicle && vehicle.images) {
      setCurrentImageIndex((prev) => (prev + 1) % vehicle.images.length);
    }
  };

  const prevImage = () => {
    if (vehicle && vehicle.images) {
      setCurrentImageIndex((prev) => (prev - 1 + vehicle.images.length) % vehicle.images.length);
    }
  };

  const handleAddOnToggle = (addOnId) => {
    setSelectedAddOns(prev => 
      prev.includes(addOnId) 
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  const handleBookNow = () => {
    if (!searchParams.pickupDate || !searchParams.returnDate) {
      alert('Please select pickup and return dates to proceed with booking.');
      return;
    }

    const bookingParams = new URLSearchParams({
      vehicleId: vehicle.id,
      ...searchParams,
      addOns: selectedAddOns.join(','),
      insurance: selectedInsurance
    });

    router.push(`/carrental/booking?${bookingParams.toString()}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <CarRentalHeader />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <FaSpinner className="animate-spin text-4xl text-orange-500 mb-4 mx-auto" />
            <p className="text-gray-600">Loading vehicle details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-gray-50">
        <CarRentalHeader />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Vehicle not found</p>
            <Link
              href="/carrental/search"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              Back to Search
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentImage = vehicle.images[currentImageIndex];
  const pickupLocation = getLocationById(searchParams.pickupLocation);

  return (
    <>
      <Head>
        <title>{vehicle.name} - CarRental | {vehicle.brand} {vehicle.category}</title>
        <meta name="description" content={`Rent the ${vehicle.name} from CarRental. ${vehicle.year} ${vehicle.brand} with ${vehicle.features.join(', ')}.`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Language" content="en-US" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <CarRentalHeader />

        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/carrental" className="text-gray-500 hover:text-gray-700">Home</Link>
              <span className="text-gray-400">›</span>
              <Link href="/carrental/search" className="text-gray-500 hover:text-gray-700">Search</Link>
              <span className="text-gray-400">›</span>
              <span className="text-gray-900 font-medium">{vehicle.name}</span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Content */}
            <div className="lg:col-span-2">
              
              {/* Vehicle Header */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
                
                {/* Image Gallery */}
                <div className="relative">
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={currentImage}
                      alt={vehicle.name}
                      className="w-full h-64 lg:h-80 object-cover"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop';
                      }}
                    />
                  </div>

                  {/* Image Navigation */}
                  {vehicle.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-opacity"
                      >
                        <FaChevronLeft />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-opacity"
                      >
                        <FaChevronRight />
                      </button>
                      
                      {/* Image Indicators */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {vehicle.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-3 h-3 rounded-full ${
                              index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}

                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button
                      onClick={toggleFavorite}
                      className="bg-white bg-opacity-90 p-3 rounded-full hover:bg-opacity-100 transition-opacity"
                    >
                      {isFavorite ? (
                        <FaHeart className="text-red-500 text-lg" />
                      ) : (
                        <FaRegHeart className="text-gray-600 text-lg" />
                      )}
                    </button>
                    <button className="bg-white bg-opacity-90 p-3 rounded-full hover:bg-opacity-100 transition-opacity">
                      <FaShare className="text-gray-600 text-lg" />
                    </button>
                  </div>
                </div>

                {/* Vehicle Info */}
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">{vehicle.name}</h1>
                      <p className="text-lg text-gray-600">{vehicle.brand} • {vehicle.year} • {vehicle.category.charAt(0).toUpperCase() + vehicle.category.slice(1)}</p>
                    </div>
                    
                    <div className="mt-4 sm:mt-0 text-right">
                      <div className="text-3xl font-bold text-orange-600">
                        {formatCurrency(vehicle.pricing.dailyRate)}
                      </div>
                      <div className="text-sm text-gray-500">per day</div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-6">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`text-lg ${
                            i < Math.floor(vehicle.reviews.rating) ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-3 text-lg font-medium text-gray-700">{vehicle.reviews.rating}</span>
                    <span className="ml-2 text-gray-500">({vehicle.reviews.count} reviews)</span>
                  </div>

                  {/* Quick Specs */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <FaUsers className="text-orange-500" />
                      <span>{vehicle.seats} seats</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <FaSuitcase className="text-orange-500" />
                      <span>{vehicle.luggage} bags</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <FaCog className="text-orange-500" />
                      <span>{vehicle.transmission}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <FaGasPump className="text-orange-500" />
                      <span>{vehicle.fuelType}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Details Tabs */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="border-b border-gray-200">
                  <nav className="flex space-x-8 px-6" aria-label="Tabs">
                    {[
                      { id: 'overview', label: 'Overview' },
                      { id: 'features', label: 'Features' },
                      { id: 'specifications', label: 'Specifications' },
                      { id: 'reviews', label: 'Reviews' }
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${
                          activeTab === tab.id
                            ? 'border-orange-500 text-orange-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </nav>
                </div>

                <div className="p-6">
                  {activeTab === 'overview' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">About this vehicle</h3>
                        <p className="text-gray-600">
                          The {vehicle.name} is a {vehicle.category} vehicle perfect for your travel needs. 
                          With {vehicle.seats} seats and {vehicle.luggage} bag capacity, it offers both comfort and practicality. 
                          This {vehicle.year} {vehicle.brand} comes equipped with {vehicle.transmission} transmission and 
                          modern amenities to ensure a pleasant driving experience.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Included in your rental:</h4>
                        <ul className="space-y-1 text-gray-600">
                          <li className="flex items-center"><FaCheckCircle className="text-green-500 mr-2" />Unlimited mileage</li>
                          <li className="flex items-center"><FaCheckCircle className="text-green-500 mr-2" />Basic insurance coverage</li>
                          <li className="flex items-center"><FaCheckCircle className="text-green-500 mr-2" />24/7 roadside assistance</li>
                          <li className="flex items-center"><FaCheckCircle className="text-green-500 mr-2" />Free cancellation up to 24 hours</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {activeTab === 'features' && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Features</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {vehicle.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <FaCheckCircle className="text-green-500" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'specifications' && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Specifications</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Object.entries(vehicle.specifications).map(([key, value]) => (
                          <div key={key} className="flex justify-between py-2 border-b border-gray-200">
                            <span className="font-medium text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                            <span className="text-gray-600">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'reviews' && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Reviews</h3>
                      <div className="space-y-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <FaStar key={i} className="text-yellow-400" />
                                ))}
                              </div>
                              <span className="ml-2 font-medium">John D.</span>
                            </div>
                            <span className="text-sm text-gray-500">2 weeks ago</span>
                          </div>
                          <p className="text-gray-600">
                            "Excellent vehicle! Clean, comfortable, and great fuel economy. 
                            The pickup process was smooth and the car exceeded my expectations."
                          </p>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <div className="flex">
                                {[...Array(4)].map((_, i) => (
                                  <FaStar key={i} className="text-yellow-400" />
                                ))}
                                <FaStar className="text-gray-300" />
                              </div>
                              <span className="ml-2 font-medium">Sarah M.</span>
                            </div>
                            <span className="text-sm text-gray-500">1 month ago</span>
                          </div>
                          <p className="text-gray-600">
                            "Good car for the price. Had everything I needed for my business trip. 
                            Would rent again."
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                
                {/* Booking Card */}
                <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Complete Your Booking</h3>
                  
                  {/* Rental Summary */}
                  {searchParams.pickupDate && searchParams.returnDate && (
                    <div className="mb-6 p-4 bg-orange-50 rounded-lg">
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Pickup:</span>
                          <span className="font-medium">{searchParams.pickupDate}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Return:</span>
                          <span className="font-medium">{searchParams.returnDate}</span>
                        </div>
                        {pickupLocation && (
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Location:</span>
                            <span className="font-medium">{pickupLocation.name}</span>
                          </div>
                        )}
                        {rentalCost && (
                          <div className="flex items-center justify-between border-t border-orange-200 pt-2">
                            <span className="text-gray-600">Duration:</span>
                            <span className="font-medium">{rentalCost.days} day{rentalCost.days > 1 ? 's' : ''}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Add-ons */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Add-ons & Extras</h4>
                    <div className="space-y-2">
                      {addOns.slice(0, 3).map(addOn => (
                        <label key={addOn.id} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={selectedAddOns.includes(addOn.id)}
                              onChange={() => handleAddOnToggle(addOn.id)}
                              className="mr-3 text-orange-600 focus:ring-orange-500 rounded"
                            />
                            <div>
                              <span className="text-sm font-medium text-gray-900">{addOn.name}</span>
                              <p className="text-xs text-gray-600">{addOn.description}</p>
                            </div>
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            {formatCurrency(addOn.dailyRate)}/day
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Insurance */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Insurance Protection</h4>
                    <div className="space-y-2">
                      {insuranceOptions.map(insurance => (
                        <label key={insurance.id} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <input
                              type="radio"
                              name="insurance"
                              value={insurance.id}
                              checked={selectedInsurance === insurance.id}
                              onChange={() => setSelectedInsurance(insurance.id)}
                              className="mr-3 text-orange-600 focus:ring-orange-500"
                            />
                            <div>
                              <span className="text-sm font-medium text-gray-900">{insurance.name}</span>
                              <p className="text-xs text-gray-600">{insurance.description}</p>
                            </div>
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            {formatCurrency(insurance.dailyRate)}/day
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  {rentalCost && (
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-3">Price Breakdown</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Vehicle rental ({rentalCost.days} days)</span>
                          <span>{formatCurrency(rentalCost.baseCost)}</span>
                        </div>
                        {rentalCost.addOnsCost > 0 && (
                          <div className="flex justify-between">
                            <span>Add-ons</span>
                            <span>{formatCurrency(rentalCost.addOnsCost)}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span>Insurance</span>
                          <span>{formatCurrency(rentalCost.insuranceCost)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Taxes & fees</span>
                          <span>{formatCurrency(rentalCost.taxes)}</span>
                        </div>
                        <div className="flex justify-between font-semibold text-lg border-t border-gray-300 pt-2">
                          <span>Total</span>
                          <span>{formatCurrency(rentalCost.total)}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Book Now Button */}
                  <button
                    onClick={handleBookNow}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>Book This Vehicle</span>
                  </button>

                  {/* Support */}
                  <div className="mt-4 text-center">
                    <p className="text-xs text-gray-500 mb-2">
                      Need help? Call our support team
                    </p>
                    <a
                      href="tel:1-800-CAR-RENT"
                      className="text-orange-600 font-semibold flex items-center justify-center space-x-2"
                    >
                      <FaPhone />
                      <span>1-800-CAR-RENT</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Vehicles */}
          {recommendedVehicles.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Vehicles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedVehicles.map(recVehicle => (
                  <VehicleCard
                    key={recVehicle.id}
                    vehicle={recVehicle}
                    searchParams={searchParams}
                    showQuickView={false}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default VehicleDetailPage;
