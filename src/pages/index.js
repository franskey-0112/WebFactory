import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  FaPlane, 
  FaHotel, 
  FaHome, 
  FaShoppingCart, 
  FaEnvelope,
  FaCar,
  FaBuilding,
  FaTicketAlt,
  FaLinkedin,
  FaUtensils,
  FaArrowRight,
  FaStar,
  FaGlobe,
  FaUsers,
  FaShieldAlt
} from 'react-icons/fa';

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Travel & Services Hub - Your Complete Solution</title>
        <meta name="description" content="Access flights, hotels, vacation rentals, shopping, and email services all in one place." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <FaGlobe className="text-white text-xl" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Travel & Services Hub</h1>
              </div>
              
              <nav className="hidden md:flex space-x-8">
                <a href="#services" className="text-gray-600 hover:text-gray-900 transition-colors">Services</a>
                <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
                <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">About</a>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Everything You Need,
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> All in One Place</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Streamline your digital life with our comprehensive platform. Book travel, shop online, manage emails, 
              and find accommodations - all with seamless integration and beautiful design.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/flights" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                <FaPlane />
                <span>Start with Flights</span>
              </Link>
              <Link href="/hotels" className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                <FaHotel />
                <span>Explore Hotels</span>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Services Grid */}
        <section id="services" className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Comprehensive solutions for all your travel, shopping, and communication needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
              {/* Flights */}
              <Link href="/flights" className="group">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
                    <FaPlane className="text-blue-600 text-2xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Flight Booking</h3>
                  <p className="text-gray-600 mb-6">
                    Search and compare flights from hundreds of airlines worldwide. 
                    Find the best deals and book with confidence.
                  </p>
                  <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                    <span>Book Flights</span>
                    <FaArrowRight className="ml-2 text-sm" />
                  </div>
                </div>
              </Link>

              {/* Hotels */}
              <Link href="/hotels" className="group">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-200">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors">
                    <FaHotel className="text-green-600 text-2xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Hotel Reservations</h3>
                  <p className="text-gray-600 mb-6">
                    Discover and book the perfect accommodation for your stay. 
                    From luxury resorts to budget-friendly options.
                  </p>
                  <div className="flex items-center text-green-600 font-semibold group-hover:text-green-700">
                    <span>Find Hotels</span>
                    <FaArrowRight className="ml-2 text-sm" />
                  </div>
                </div>
              </Link>

              {/* StayBnB */}
              <Link href="/staybnb" className="group">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-rose-200">
                  <div className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-rose-200 transition-colors">
                    <FaHome className="text-rose-600 text-2xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Vacation Rentals</h3>
                  <p className="text-gray-600 mb-6">
                    Discover unique stays and experiences with local hosts. 
                    Perfect for longer trips and authentic experiences.
                  </p>
                  <div className="flex items-center text-rose-600 font-semibold group-hover:text-rose-700">
                    <span>Explore Stays</span>
                    <FaArrowRight className="ml-2 text-sm" />
                  </div>
                </div>
              </Link>

              {/* Car Rental */}
              <Link href="/carrental" className="group">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-amber-200">
                  <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-200 transition-colors">
                    <FaCar className="text-amber-600 text-2xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Car Rental</h3>
                  <p className="text-gray-600 mb-6">
                    Rent premium vehicles from economy to luxury cars. 
                    Perfect for business trips, vacations, or daily transportation.
                  </p>
                  <div className="flex items-center text-amber-600 font-semibold group-hover:text-amber-700">
                    <span>Rent a Car</span>
                    <FaArrowRight className="ml-2 text-sm" />
                  </div>
                </div>
              </Link>

              {/* MasterTicket */}
              <Link href="/masterticket" className="group">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200">
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-200 transition-colors">
                    <FaTicketAlt className="text-purple-600 text-2xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Event Tickets</h3>
                  <p className="text-gray-600 mb-6">
                    Find and buy tickets for concerts, sports, theater shows, and events. 
                    Best prices and selection for live entertainment.
                  </p>
                  <div className="flex items-center text-purple-600 font-semibold group-hover:text-purple-700">
                    <span>Get Tickets</span>
                    <FaArrowRight className="ml-2 text-sm" />
                  </div>
                </div>
              </Link>

              {/* CareerLink */}
              <Link href="/careerlink" className="group">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
                    <FaLinkedin className="text-blue-600 text-2xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Professional Network</h3>
                  <p className="text-gray-600 mb-6">
                    Connect with professionals and grow your career. 
                    Build your professional network.
                  </p>
                  <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                    <span>Join Network</span>
                    <FaArrowRight className="ml-2 text-sm" />
                  </div>
                </div>
              </Link>

              {/* MealDash */}
              <Link href="/mealdash" className="group">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-red-200">
                  <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-200 transition-colors">
                    <FaUtensils className="text-red-600 text-2xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Food Delivery</h3>
                  <p className="text-gray-600 mb-6">
                    Get your favorite food delivered fast from local restaurants. 
                    Browse menus and enjoy delicious meals at home.
                  </p>
                  <div className="flex items-center text-red-600 font-semibold group-hover:text-red-700">
                    <span>Order Food</span>
                    <FaArrowRight className="ml-2 text-sm" />
                  </div>
                </div>
              </Link>

              {/* Amazon Shopping */}
              <Link href="/amazon" className="group">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange-200">
                  <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-200 transition-colors">
                    <FaShoppingCart className="text-orange-600 text-2xl" />
                    </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Online Shopping</h3>
                  <p className="text-gray-600 mb-6">
                    Browse millions of products with competitive prices. 
                    From electronics to fashion, find everything you need.
                  </p>
                  <div className="flex items-center text-orange-600 font-semibold group-hover:text-orange-700">
                    <span>Start Shopping</span>
                    <FaArrowRight className="ml-2 text-sm" />
                  </div>
                </div>
              </Link>

              {/* Email System */}
              <Link href="/email" className="group">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200">
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-200 transition-colors">
                    <FaEnvelope className="text-purple-600 text-2xl" />
                    </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Email Management</h3>
                  <p className="text-gray-600 mb-6">
                    Professional email system with advanced features. 
                    Organize, search, and manage your communications efficiently.
                  </p>
                  <div className="flex items-center text-purple-600 font-semibold group-hover:text-purple-700">
                    <span>Check Email</span>
                    <FaArrowRight className="ml-2 text-sm" />
                  </div>
                </div>
              </Link>

              {/* CompanyCheck */}
              <Link href="/companycheck" className="group">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-cyan-200">
                  <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-cyan-200 transition-colors">
                    <FaBuilding className="text-cyan-600 text-2xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Company Reviews</h3>
                  <p className="text-gray-600 mb-6">
                    Get inside information on companies. 
                    Make informed career decisions with employee insights.
                  </p>
                  <div className="flex items-center text-cyan-600 font-semibold group-hover:text-cyan-700">
                    <span>Explore Companies</span>
                    <FaArrowRight className="ml-2 text-sm" />
                  </div>
            </div>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section id="features" className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Our Platform?</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Built with modern technology and user experience in mind
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <FaShieldAlt className="text-blue-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Secure & Reliable</h3>
                <p className="text-gray-600">
                  Your data is protected with enterprise-grade security measures. 
                  Trust our platform with your important information.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <FaUsers className="text-green-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">User-Friendly</h3>
                <p className="text-gray-600">
                  Intuitive design and seamless navigation make it easy for anyone 
                  to use our services effectively.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <FaGlobe className="text-purple-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Global Reach</h3>
                <p className="text-gray-600">
                  Access services worldwide with comprehensive coverage 
                  and international support.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of satisfied users who trust our platform for their daily needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/flights" className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                Explore Services
              </Link>
              <a href="#services" className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Learn More
              </a>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <FaGlobe className="text-white text-sm" />
                  </div>
                  <h3 className="text-xl font-bold">Travel & Services Hub</h3>
                </div>
                <p className="text-gray-400 mb-4">
                  Your complete solution for travel, shopping, and communication needs. 
                  Built with modern technology and designed for the future.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Services</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/flights" className="hover:text-white transition-colors">Flight Booking</Link></li>
                  <li><Link href="/hotels" className="hover:text-white transition-colors">Hotel Reservations</Link></li>
                  <li><Link href="/staybnb" className="hover:text-white transition-colors">Vacation Rentals</Link></li>
                  <li><Link href="/carrental" className="hover:text-white transition-colors">Car Rental</Link></li>
                  <li><Link href="/masterticket" className="hover:text-white transition-colors">Event Tickets</Link></li>
                  <li><Link href="/careerlink" className="hover:text-white transition-colors">Professional Network</Link></li>
                  <li><Link href="/mealdash" className="hover:text-white transition-colors">Food Delivery</Link></li>
                  <li><Link href="/amazon" className="hover:text-white transition-colors">Online Shopping</Link></li>
                  <li><Link href="/email" className="hover:text-white transition-colors">Email Management</Link></li>
                  <li><Link href="/companycheck" className="hover:text-white transition-colors">Company Reviews</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                  <li><a href="/amazon/customer-service" className="hover:text-white transition-colors">Contact</a></li>
                  <li><a href="/" className="hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="/" className="hover:text-white transition-colors">Terms of Service</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 Travel & Services Hub. All rights reserved.</p>
            </div>
          </div>
        </footer>
    </div>
    </>
  );
};

export default HomePage;