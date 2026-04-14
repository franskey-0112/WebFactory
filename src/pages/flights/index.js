import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SearchForm from '../../components/SearchForm';
import Link from 'next/link';
import { FaStar, FaShieldAlt, FaMoneyBillWave, FaPlane } from 'react-icons/fa';

const popularDestinations = [
  { 
    name: 'Tokyo', 
    image: '/images/tokyo.jpg', 
    code: 'HND',
    desc: 'Where Japanese culture meets modern technology',
    price: '¥1,800'
  },
  { 
    name: 'London', 
    image: '/images/london.jpg', 
    code: 'LHR',
    desc: 'European metropolis with historical and modern charm',
    price: '¥5,500'
  },
  { 
    name: 'New York', 
    image: '/images/newyork.jpg', 
    code: 'JFK',
    desc: 'The city that never sleeps, global financial center',
    price: '¥6,200'
  },
  { 
    name: 'Paris', 
    image: '/images/paris.jpg', 
    code: 'CDG',
    desc: 'City of romance, art and fashion',
    price: '¥5,100'
  }
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-booking-dark-blue pt-8 pb-16 px-4">
          <div className="container mx-auto mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Find Your Next Flight</h1>
            <p className="text-lg text-white mb-8">Compare thousands of options from airlines and travel sites to find your ideal flight</p>
            
            <SearchForm />
          </div>
        </section>
        
        {/* Popular Destinations */}
        <section className="py-12 px-4 bg-white">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-8">Popular Destinations</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularDestinations.map((destination, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="h-48 bg-gray-300 relative">
                    <img 
                      src={destination.image} 
                      alt={destination.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gray-800 opacity-30"></div>
                    <div className="absolute bottom-0 left-0 p-4 text-white">
                      <h3 className="text-xl font-bold">{destination.name}</h3>
                      <p>{destination.code}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600 mb-2">{destination.desc}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">From</span>
                      <span className="text-booking-blue font-bold">{destination.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/flights/search" className="btn-primary inline-block">
                View All Destinations
              </Link>
            </div>
          </div>
        </section>
        
        {/* Services Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">Explore Our Travel Services</h2>
            <p className="text-gray-600 text-center mb-12">Everything you need for your perfect trip</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <Link href="/flights/search" className="group">
                <div className="bg-white rounded-xl p-8 text-center hover:shadow-lg transition-shadow border border-gray-200">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-colors">
                    <FaPlane className="text-white text-2xl" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Flights</h3>
                  <p className="text-gray-600">Compare and book flights from hundreds of airlines worldwide</p>
                </div>
              </Link>
              
              <Link href="/hotels" className="group">
                <div className="bg-white rounded-xl p-8 text-center hover:shadow-lg transition-shadow border border-gray-200">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-600 transition-colors">
                    <span className="text-white text-2xl">🏨</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Hotels</h3>
                  <p className="text-gray-600">Find and book the perfect accommodation for your stay</p>
                </div>
              </Link>
              
              <Link href="/staybnb" className="group">
                <div className="bg-white rounded-xl p-8 text-center hover:shadow-lg transition-shadow border border-gray-200">
                  <div className="w-16 h-16 bg-rose-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-rose-600 transition-colors">
                    <span className="text-white text-2xl">🏠</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">StayBnB</h3>
                  <p className="text-gray-600">Discover unique stays and experiences with local hosts</p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-12 px-4 bg-booking-light-bg">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Why Choose Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-booking-blue text-4xl mb-4 flex justify-center">
                  <FaPlane />
                </div>
                <h3 className="text-xl font-bold mb-2">Extensive Flight Options</h3>
                <p className="text-gray-600">
                  Compare prices from hundreds of airlines worldwide to find the best itinerary for you
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-booking-blue text-4xl mb-4 flex justify-center">
                  <FaMoneyBillWave />
                </div>
                <h3 className="text-xl font-bold mb-2">No Hidden Fees</h3>
                <p className="text-gray-600">
                  Our prices include all taxes and fees, with no hidden charges or extra costs
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-booking-blue text-4xl mb-4 flex justify-center">
                  <FaShieldAlt />
                </div>
                <h3 className="text-xl font-bold mb-2">Secure Booking</h3>
                <p className="text-gray-600">
                  Millions of travelers trust us with secure and reliable booking systems that protect your information
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-12 px-4 bg-white">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Traveler Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="flex text-booking-yellow mb-2">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                <p className="text-gray-600 mb-4">
                  "Booking flights on this website is incredibly convenient and the prices are very reasonable. I've used it multiple times and have always been satisfied."
                </p>
                <div className="font-medium">Mr. Li, Shanghai</div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="flex text-booking-yellow mb-2">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                <p className="text-gray-600 mb-4">
                  "The interface is clear and easy to use, making it simple to find the most affordable flights. Customer service is also very helpful and resolved all my questions."
                </p>
                <div className="font-medium">Ms. Wang, Beijing</div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="flex text-booking-yellow mb-2">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
                <p className="text-gray-600 mb-4">
                  "The filtering features are extremely powerful, allowing me to find flights that perfectly match my needs. The price comparison tool is also very useful."
                </p>
                <div className="font-medium">Ms. Zhang, Guangzhou</div>
              </div>
            </div>
          </div>
        </section>
        
        {/* App Download */}
        <section className="py-12 px-4 bg-booking-dark-blue text-white">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h2 className="text-2xl font-bold mb-4">Download Our App</h2>
                <p className="mb-4">Search and book flights anytime, anywhere, and get real-time flight updates and notifications</p>
                <div className="flex space-x-4">
                  <button className="bg-black text-white py-2 px-4 rounded-lg flex items-center">
                    <span className="mr-2">App Store</span>
                  </button>
                  <button className="bg-black text-white py-2 px-4 rounded-lg flex items-center">
                    <span className="mr-2">Google Play</span>
                  </button>
                </div>
              </div>
              <div className="w-full md:w-1/3">
                <div className="bg-white h-64 w-32 mx-auto rounded-xl"></div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
} 