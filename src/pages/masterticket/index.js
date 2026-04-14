import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FaFire, FaMusic, FaFootballBall, FaTheaterMasks, FaLaugh, FaUsers, FaArrowRight, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import MasterTicketHeader from '../../components/masterticket/MasterTicketHeader';
import EventCard from '../../components/masterticket/EventCard';
import masterTicketDataUtils from '../../utils/masterTicketData';

const MasterTicketHome = () => {
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [trendingEvents, setTrendingEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [topCities, setTopCities] = useState([]);

  const {
    getFeaturedEvents,
    getTrendingEvents,
    getCategories,
    getCities,
    formatDate,
    formatTime
  } = masterTicketDataUtils;

  useEffect(() => {
    setFeaturedEvents(getFeaturedEvents());
    setTrendingEvents(getTrendingEvents());
    setCategories(getCategories());
    setTopCities(getCities().slice(0, 6));
  }, []);

  const categoryIcons = {
    concerts: FaMusic,
    sports: FaFootballBall,
    theater: FaTheaterMasks,
    comedy: FaLaugh,
    family: FaUsers,
    festivals: FaFire
  };

  return (
    <>
      <Head>
        <title>MasterTicket - Buy Tickets for Concerts, Sports, Theater & More</title>
        <meta name="description" content="Find and buy tickets for concerts, sports, theater shows, comedy events, and more. Best prices and selection on MasterTicket." />
        <meta httpEquiv="Content-Language" content="en-US" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <MasterTicketHeader />

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Live Events.
                <br />
                <span className="text-blue-300">Unforgettable Moments.</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
                Discover and book tickets for the best concerts, sports, theater shows, and events near you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/masterticket/search">
                  <button className="bg-white text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors">
                    Explore Events
                  </button>
                </Link>
                <Link href="/masterticket/search?category=concerts">
                  <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-blue-900 transition-colors">
                    Browse Concerts
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Search Categories */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              What are you looking for?
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category) => {
                const IconComponent = categoryIcons[category.id] || FaMusic;
                return (
                  <Link key={category.id} href={`/masterticket/search?category=${category.id}`}>
                    <div className="group bg-gray-50 hover:bg-blue-50 p-6 rounded-xl text-center transition-all duration-300 border-2 border-transparent hover:border-blue-200 cursor-pointer">
                      <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                        <IconComponent className="mx-auto text-blue-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-900">
                        {category.name}
                      </h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured Events */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Events</h2>
                <p className="text-gray-600">Don't miss these spectacular shows</p>
              </div>
              <Link href="/masterticket/search">
                <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                  View All <FaArrowRight className="ml-2" />
                </button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>

        {/* Trending Events */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <FaFire className="text-red-500 text-2xl mr-3" />
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Trending Now</h2>
                  <p className="text-gray-600">Popular events everyone's talking about</p>
                </div>
              </div>
              <Link href="/masterticket/search">
                <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                  View All <FaArrowRight className="ml-2" />
                </button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>

        {/* Browse by City */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse by City</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Find events in your city or plan your next trip around amazing live experiences
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topCities.map((city) => (
                <Link key={city.id} href={`/masterticket/search?city=${city.id}`}>
                  <div className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer">
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-6 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold mb-1">{city.name}</h3>
                          <p className="text-blue-100">{city.state}, {city.country}</p>
                        </div>
                        <FaMapMarkerAlt className="text-2xl opacity-75" />
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">{city.eventCount} events</span>
                        <FaArrowRight className="text-blue-600 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 bg-blue-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Never Miss Out</h2>
            <p className="text-xl text-blue-100 mb-8">
              Get notified about new events, exclusive presales, and special offers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-300"
              />
              <button className="bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-blue-200 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center mb-4">
                  <span className="text-2xl font-bold text-blue-400">MasterTicket</span>
                </div>
                <p className="text-gray-400 mb-4">
                  Your gateway to live entertainment. Find and book tickets for the best events worldwide.
                </p>
                <div className="flex space-x-4">
                  <span className="text-gray-400">📱 Download our app</span>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Popular Categories</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/masterticket/search?category=concerts" className="hover:text-white">Concerts</Link></li>
                  <li><Link href="/masterticket/search?category=sports" className="hover:text-white">Sports</Link></li>
                  <li><Link href="/masterticket/search?category=theater" className="hover:text-white">Theater</Link></li>
                  <li><Link href="/masterticket/search?category=comedy" className="hover:text-white">Comedy</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Popular Cities</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/masterticket/search?city=new-york" className="hover:text-white">New York</Link></li>
                  <li><Link href="/masterticket/search?city=los-angeles" className="hover:text-white">Los Angeles</Link></li>
                  <li><Link href="/masterticket/search?city=london" className="hover:text-white">London</Link></li>
                  <li><Link href="/masterticket/search?city=chicago" className="hover:text-white">Chicago</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Support</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="/amazon/customer-service" className="hover:text-white">Help Center</a></li>
                  <li><a href="/amazon/customer-service" className="hover:text-white">Contact Us</a></li>
                  <li><a href="/masterticket/search" className="hover:text-white">Sell Tickets</a></li>
                  <li><a href="/amazon/gift-cards" className="hover:text-white">Gift Cards</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 MasterTicket. All rights reserved. | Privacy Policy | Terms of Service</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default MasterTicketHome;
