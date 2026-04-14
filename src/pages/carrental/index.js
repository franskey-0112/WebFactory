import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import CarRentalHeader from '../../components/carrental/CarRentalHeader';
import CarRentalSearchForm from '../../components/carrental/CarRentalSearchForm';
import VehicleCard from '../../components/carrental/VehicleCard';
import { 
  FaStar, 
  FaShieldAlt, 
  FaMapMarkerAlt, 
  FaHeadset,
  FaArrowRight,
  FaCheckCircle,
  FaUsers,
  FaCar,
  FaGlobe
} from 'react-icons/fa';
import { 
  vehicleCategories, 
  getFeaturedVehicles, 
  getLocationStats,
  rentalLocations 
} from '../../utils/carRentalData';

const CarRentalHomePage = () => {
  const featuredVehicles = getFeaturedVehicles(6);
  const locationStats = getLocationStats();
  const popularLocations = rentalLocations.slice(0, 6);

  return (
    <>
      <Head>
        <title>CarRental - Premium Car Rental Service | Book Now</title>
        <meta name="description" content="Rent premium vehicles with CarRental. Choose from economy to luxury cars at competitive rates. Free cancellation and 24/7 support." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Language" content="en-US" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <CarRentalHeader currentPage="home" />

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Hero Content */}
              <div>
                <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                  Your Journey
                  <span className="block text-yellow-300">Starts Here</span>
                </h1>
                
                <p className="text-xl mb-8 text-orange-100">
                  Discover freedom with our premium car rental service. 
                  From economy to luxury vehicles, we have the perfect car for every journey.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <div className="flex items-center space-x-2">
                    <FaCheckCircle className="text-yellow-300" />
                    <span>Free cancellation up to 24 hours</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaCheckCircle className="text-yellow-300" />
                    <span>No hidden fees</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaCheckCircle className="text-yellow-300" />
                    <span>24/7 customer support</span>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-300">50+</div>
                    <div className="text-sm text-orange-100">Locations</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-300">500+</div>
                    <div className="text-sm text-orange-100">Vehicles</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-300">4.8★</div>
                    <div className="text-sm text-orange-100">Rating</div>
                  </div>
                </div>
              </div>

              {/* Search Form */}
              <div>
                <CarRentalSearchForm className="bg-white/95 backdrop-blur-sm" />
              </div>
            </div>
          </div>
        </section>

        {/* Vehicle Categories */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Choose Your Perfect Vehicle
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From compact cars for city exploration to spacious SUVs for family adventures, 
                we have the right vehicle for every journey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {vehicleCategories.map((category) => (
                <Link
                  key={category.id}
                  href={`/carrental/search?category=${category.id}`}
                  className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-orange-300 transition-all duration-300"
                >
                  <div className="text-center">
                    <div className="text-4xl mb-4">{category.icon}</div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {category.description}
                    </p>
                    
                    <div className="space-y-1 text-xs text-gray-500">
                      {category.features.slice(0, 2).map((feature, index) => (
                        <div key={index} className="flex items-center justify-center">
                          <FaCheckCircle className="mr-1 text-green-500" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 text-orange-600 font-semibold flex items-center justify-center">
                      <span>View Vehicles</span>
                      <FaArrowRight className="ml-2 text-sm group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Vehicles */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Featured Vehicles
              </h2>
              <p className="text-xl text-gray-600">
                Discover our most popular and highly-rated vehicles
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredVehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  showQuickView={false}
                />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/carrental/search"
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-lg transition-colors inline-flex items-center space-x-2"
              >
                <span>View All Vehicles</span>
                <FaArrowRight />
              </Link>
            </div>
          </div>
        </section>

        {/* Popular Locations */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Popular Rental Locations
              </h2>
              <p className="text-xl text-gray-600">
                Pick up your rental car from our convenient locations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularLocations.map((location) => (
                <div
                  key={location.id}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="aspect-w-16 aspect-h-9">
                    <div className="bg-gradient-to-r from-orange-400 to-red-500 h-48 flex items-center justify-center">
                      <div className="text-center text-white">
                        <FaMapMarkerAlt className="text-4xl mb-2 mx-auto" />
                        <div className="text-lg font-semibold">{location.type === 'airport' ? '✈️ Airport' : '🏙️ City'}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {location.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {location.address}
                    </p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-gray-600">
                        <FaMapMarkerAlt className="mr-2 text-orange-500" />
                        <span>{location.hours.weekdays}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FaCar className="mr-2 text-orange-500" />
                        <span>{location.vehicles.length} vehicle types</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                      {location.amenities.slice(0, 2).map((amenity, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/carrental/locations"
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors inline-flex items-center space-x-2"
              >
                <span>View All Locations</span>
                <FaArrowRight />
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Why Choose CarRental?
              </h2>
              <p className="text-xl text-gray-300">
                Experience the difference with our premium service and commitment to excellence
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaShieldAlt className="text-2xl" />
                </div>
                <h3 className="text-xl font-bold mb-2">Safety First</h3>
                <p className="text-gray-300">
                  All our vehicles undergo rigorous safety inspections and are equipped with the latest safety features.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaHeadset className="text-2xl" />
                </div>
                <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
                <p className="text-gray-300">
                  Our customer support team is available around the clock to assist you with any questions or concerns.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaGlobe className="text-2xl" />
                </div>
                <h3 className="text-xl font-bold mb-2">Global Network</h3>
                <p className="text-gray-300">
                  With locations worldwide, you can count on us wherever your journey takes you.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaUsers className="text-2xl" />
                </div>
                <h3 className="text-xl font-bold mb-2">Trusted by Millions</h3>
                <p className="text-gray-300">
                  Join millions of satisfied customers who choose us for their car rental needs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-orange-500 to-red-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Hit the Road?
            </h2>
            <p className="text-xl mb-8 text-orange-100">
              Book your perfect rental car today and start your adventure with confidence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/carrental/search"
                className="bg-white text-orange-600 font-semibold py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Find Your Car
              </Link>
              <a
                href="tel:1-800-CAR-RENT"
                className="border-2 border-white text-white font-semibold py-4 px-8 rounded-lg hover:bg-white hover:text-orange-600 transition-colors"
              >
                Call: 1-800-CAR-RENT
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              
              <div className="md:col-span-2">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-orange-500 p-2 rounded-lg">
                    <FaCar className="text-white text-xl" />
                  </div>
                  <div className="text-2xl font-bold">CarRental</div>
                </div>
                <p className="text-gray-400 mb-4">
                  Your trusted partner for premium car rental services worldwide. 
                  Experience freedom, comfort, and reliability with every journey.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Services</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/carrental/search" className="hover:text-white transition-colors">Car Rental</Link></li>
                  <li><Link href="/carrental/fleet" className="hover:text-white transition-colors">Vehicle Fleet</Link></li>
                  <li><Link href="/carrental/locations" className="hover:text-white transition-colors">Locations</Link></li>
                  <li><Link href="/carrental/offers" className="hover:text-white transition-colors">Special Offers</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="/amazon/customer-service" className="hover:text-white transition-colors">Customer Service</a></li>
                  <li><a href="/amazon/customer-service" className="hover:text-white transition-colors">Help Center</a></li>
                  <li><a href="/amazon/customer-service" className="hover:text-white transition-colors">Contact Us</a></li>
                  <li><a href="tel:1-800-CAR-RENT" className="hover:text-white transition-colors">1-800-CAR-RENT</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 CarRental. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default CarRentalHomePage;
