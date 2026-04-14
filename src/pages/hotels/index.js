import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import HotelHeader from '../../components/hotels/HotelHeader';
import Footer from '../../components/Footer';
import HotelSearchForm from '../../components/hotels/HotelSearchForm';
import HotelCard from '../../components/hotels/HotelCard';
import { 
  FaHotel, 
  FaMapMarkerAlt, 
  FaStar, 
  FaSwimmingPool, 
  FaWifi, 
  FaConciergeBell,
  FaUmbrellaBeach,
  FaMountain,
  FaBuilding,
  FaTree
} from 'react-icons/fa';
import { hotelData, destinations, searchHotelsByDestination } from '../../utils/hotelData';

const HotelsHomePage = () => {
  const router = useRouter();
  const [featuredHotels, setFeaturedHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  // 使用固定日期，避免时间变化导致搜索不到数据
  const getFixedDates = () => {
    return {
      tomorrow: '2024-12-20',
      dayAfterTomorrow: '2024-12-22'
    };
  };

  // Popular destinations with images and descriptions
  const popularDestinations = [
    {
      code: 'NYC',
      name: 'New York City',
      description: 'The city that never sleeps',
      image: '/images/destinations/nyc.jpg',
      icon: <FaBuilding className="h-8 w-8" />,
      hotels: destinations.find(d => d.code === 'NYC')?.hotels || 0
    },
    {
      code: 'MIA',
      name: 'Miami',
      description: 'Beautiful beaches and nightlife',
      image: '/images/destinations/miami.jpg',
      icon: <FaUmbrellaBeach className="h-8 w-8" />,
      hotels: destinations.find(d => d.code === 'MIA')?.hotels || 0
    },
    {
      code: 'ASE',
      name: 'Aspen',
      description: 'Mountain retreat paradise',
      image: '/images/destinations/aspen.jpg',
      icon: <FaMountain className="h-8 w-8" />,
      hotels: destinations.find(d => d.code === 'ASE')?.hotels || 0
    },
    {
      code: 'SFO',
      name: 'San Francisco',
      description: 'Golden Gate and beyond',
      image: '/images/destinations/sf.jpg',
      icon: <FaTree className="h-8 w-8" />,
      hotels: destinations.find(d => d.code === 'SFO')?.hotels || 0
    }
  ];

  // Hotel categories
  const hotelCategories = [
    {
      title: 'Luxury Hotels',
      description: 'Experience ultimate comfort and service',
      icon: <FaStar className="h-12 w-12 text-yellow-500" />,
      href: '/hotels/search?type=luxury',
      filter: (hotel) => hotel.starRating >= 5
    },
    {
      title: 'Resort Hotels',
      description: 'All-inclusive vacation experiences',
      icon: <FaSwimmingPool className="h-12 w-12 text-blue-500" />,
      href: '/hotels/search?type=resort',
      filter: (hotel) => hotel.amenities.includes('Swimming Pool') && hotel.amenities.includes('Spa & Wellness Center')
    },
    {
      title: 'Business Hotels',
      description: 'Perfect for corporate travelers',
      icon: <FaBuilding className="h-12 w-12 text-gray-600" />,
      href: '/hotels/search?type=business',
      filter: (hotel) => hotel.amenities.includes('Business Center') && hotel.amenities.includes('Meeting Rooms')
    },
    {
      title: 'Boutique Hotels',
      description: 'Unique character and charm',
      icon: <FaConciergeBell className="h-12 w-12 text-purple-500" />,
      href: '/hotels/search?type=boutique',
      filter: (hotel) => hotel.name.toLowerCase().includes('boutique') || hotel.starRating === 4
    }
  ];

  useEffect(() => {
    loadFeaturedHotels();
  }, []);

  const loadFeaturedHotels = () => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Get top-rated hotels
      const topHotels = hotelData
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 4);
      
      setFeaturedHotels(topHotels);
      setLoading(false);
    }, 500);
  };

  const handleSearch = (searchData) => {
    // Navigate to search results with parameters
    const query = new URLSearchParams({
      destination: searchData.destination,
      checkIn: searchData.checkIn,
      checkOut: searchData.checkOut,
      guests: searchData.guests.toString(),
      rooms: searchData.rooms.toString()
    });
    
    router.push(`/hotels/search?${query.toString()}`);
  };

  const handleDestinationClick = (destination) => {
    // 使用固定日期导航到搜索结果
    const { tomorrow, dayAfterTomorrow } = getFixedDates();
    
    const query = new URLSearchParams({
      destination: destination.name,
      checkIn: tomorrow,
      checkOut: dayAfterTomorrow,
      guests: '2',
      rooms: '1'
    });
    
    router.push(`/hotels/search?${query.toString()}`);
  };

  return (
    <>
      <Head>
        <title>HotelBooker - Find and Book the Perfect Hotel</title>
        <meta name="description" content="Search and book hotels worldwide. Compare prices, read reviews, and find the perfect accommodation for your next trip." />
        <meta name="keywords" content="hotels, hotel booking, accommodation, travel, vacation, business travel" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <HotelHeader />

        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <FaHotel className="h-16 w-16 mx-auto mb-6 text-white" />
              <h1 className="text-4xl md:text-6xl font-bold mb-6" data-testid="hero-title">
                Find Your Perfect Hotel
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Search and compare millions of hotels worldwide. Book with confidence.
              </p>
              
              {/* Search Form */}
              <div className="max-w-6xl mx-auto">
                <HotelSearchForm 
                  onSearch={handleSearch}
                  initialValues={{
                    checkIn: getFixedDates().tomorrow,
                    checkOut: getFixedDates().dayAfterTomorrow
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Popular Destinations */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Popular Destinations
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore our most sought-after destinations and discover amazing hotels
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularDestinations.map((destination) => (
                <div
                  key={destination.code}
                  onClick={() => handleDestinationClick(destination)}
                  className="group relative bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden cursor-pointer"
                  data-testid={`destination-${destination.code}`}
                >
                  <div className="relative h-48 bg-gradient-to-br from-blue-500 to-blue-700">
                    <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-10 transition-opacity"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white">
                        {destination.icon}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {destination.name}
                    </h3>
                    <p className="text-gray-600 mb-3">
                      {destination.description}
                    </p>
                    <div className="flex items-center text-blue-600">
                      <FaMapMarkerAlt className="h-4 w-4 mr-1" />
                      <span className="text-sm font-medium">
                        {destination.hotels} hotels available
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hotel Categories */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Hotel Categories
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Find the perfect type of accommodation for your travel style
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {hotelCategories.map((category, index) => (
                <Link
                  key={index}
                  href={category.href}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-8 text-center cursor-pointer group block"
                  data-testid={`category-${index}`}
                >
                  <div className="mb-6 group-hover:scale-110 transition-transform duration-200">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {category.title}
                  </h3>
                  <p className="text-gray-600">
                    {category.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Hotels */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured Hotels
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Handpicked hotels offering exceptional experiences
              </p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600">Loading featured hotels...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredHotels.map((hotel) => (
                  <HotelCard
                    key={hotel.id}
                    hotel={hotel}
                    searchParams={{
                      checkIn: getFixedDates().tomorrow,
                      checkOut: getFixedDates().dayAfterTomorrow,
                      guests: 2,
                      rooms: 1
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose HotelBooker?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-white rounded-full p-6 w-20 h-20 mx-auto mb-6 shadow-lg">
                  <FaHotel className="h-8 w-8 text-blue-600 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Best Price Guarantee
                </h3>
                <p className="text-gray-600">
                  We'll match any lower price you find for the same hotel and dates
                </p>
              </div>

              <div className="text-center">
                <div className="bg-white rounded-full p-6 w-20 h-20 mx-auto mb-6 shadow-lg">
                  <FaWifi className="h-8 w-8 text-blue-600 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Instant Confirmation
                </h3>
                <p className="text-gray-600">
                  Get immediate booking confirmation and enjoy peace of mind
                </p>
              </div>

              <div className="text-center">
                <div className="bg-white rounded-full p-6 w-20 h-20 mx-auto mb-6 shadow-lg">
                  <FaConciergeBell className="h-8 w-8 text-blue-600 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  24/7 Customer Support
                </h3>
                <p className="text-gray-600">
                  Our dedicated team is here to help you anytime, anywhere
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stay Updated with the Best Deals
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and be the first to know about exclusive offers and discounts
            </p>
            
            <div className="max-w-md mx-auto">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-l-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  data-testid="newsletter-email"
                />
                <button
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-r-lg font-medium transition-colors duration-200"
                  data-testid="newsletter-subscribe"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default HotelsHomePage; 