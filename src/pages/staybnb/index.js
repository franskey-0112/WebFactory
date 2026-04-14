import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import StaybnbHeader from '../../components/staybnb/StaybnbHeader';
import PropertyCard from '../../components/staybnb/PropertyCard';
import CategoryFilter from '../../components/staybnb/CategoryFilter';
import SearchForm from '../../components/staybnb/SearchForm';
import Footer from '../../components/Footer';
import {
  getFeaturedProperties,
  getPropertiesByCategory,
  getPopularDestinations,
  getFilterOptions,
  staybnbDestinations
} from '../../utils/staybnbData';
import { FaArrowRight, FaTimes, FaFilter } from 'react-icons/fa';

const StaybnbHomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [displayProperties, setDisplayProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [filterOptions] = useState(() => getFilterOptions());
  const [activeFilters, setActiveFilters] = useState({
    priceRange: null,
    amenities: []
  });

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      if (selectedCategory) {
        setDisplayProperties(getPropertiesByCategory(selectedCategory, 12));
      } else {
        setDisplayProperties(getFeaturedProperties(12));
      }
      setIsLoading(false);
    }, 300);
  }, [selectedCategory]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const popularDestinations = getPopularDestinations();

  return (
    <>
      <Head>
        <title>StayBnB - Vacation Rentals, Cabins, Beach Houses & More</title>
        <meta name="description" content="Find unique places to stay with local hosts in 191+ countries. Belong anywhere with StayBnB." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <StaybnbHeader />

        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-rose-500 to-pink-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Not sure where to go?
              </h1>
              <p className="text-xl md:text-2xl text-rose-100">
                Perfect. We'll help you find your next adventure.
              </p>
            </div>

            {/* Search Form */}
            <div className="max-w-4xl mx-auto">
              <SearchForm />
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          onFiltersClick={() => setShowFiltersModal(true)}
        />

        {/* Filters Modal */}
        {showFiltersModal && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
            <div className="absolute inset-0 bg-black bg-opacity-40" onClick={() => setShowFiltersModal(false)} />
            <div className="relative bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg max-h-[85vh] overflow-y-auto shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
                <div className="flex items-center gap-2">
                  <FaFilter className="text-rose-500" size={14} />
                  <h2 className="font-semibold text-gray-900">Filters</h2>
                  {(activeFilters.priceRange || activeFilters.amenities.length > 0) && (
                    <span className="bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {(activeFilters.priceRange ? 1 : 0) + activeFilters.amenities.length}
                    </span>
                  )}
                </div>
                <button onClick={() => setShowFiltersModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <FaTimes size={16} className="text-gray-600" />
                </button>
              </div>

              <div className="px-6 py-4 space-y-6">
                {/* Price Range */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Price range</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {filterOptions.priceRanges.map((range, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveFilters(prev => ({
                          ...prev,
                          priceRange: prev.priceRange?.label === range.label ? null : range
                        }))}
                        className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                          activeFilters.priceRange?.label === range.label
                            ? 'border-rose-500 bg-rose-50 text-rose-700'
                            : 'border-gray-200 text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Amenities</h3>
                  <div className="flex flex-wrap gap-2">
                    {filterOptions.popularAmenities.map(amenity => (
                      <button
                        key={amenity}
                        onClick={() => setActiveFilters(prev => ({
                          ...prev,
                          amenities: prev.amenities.includes(amenity)
                            ? prev.amenities.filter(a => a !== amenity)
                            : [...prev.amenities, amenity]
                        }))}
                        className={`px-3 py-1.5 rounded-full border text-sm transition-colors ${
                          activeFilters.amenities.includes(amenity)
                            ? 'border-rose-500 bg-rose-50 text-rose-700'
                            : 'border-gray-200 text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        {amenity}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-gray-200 flex gap-3 sticky bottom-0 bg-white">
                <button
                  onClick={() => setActiveFilters({ priceRange: null, amenities: [] })}
                  className="flex-1 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Clear all
                </button>
                <button
                  onClick={() => setShowFiltersModal(false)}
                  className="flex-2 flex-1 py-2.5 bg-rose-500 text-white rounded-lg text-sm font-semibold hover:bg-rose-600 transition-colors"
                >
                  Show results
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Section Title */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
              {selectedCategory 
                ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1).replace('-', ' ')} properties`
                : 'Featured stays'
              }
            </h2>
            <p className="text-gray-600 mt-2">
              {selectedCategory 
                ? `Discover amazing ${selectedCategory.replace('-', ' ')} properties`
                : 'Handpicked by our team for exceptional quality and experience'
              }
            </p>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(12)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-300 rounded-xl aspect-square mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Properties Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayProperties.map((property) => (
                <PropertyCard 
                  key={property.id} 
                  property={property}
                />
              ))}
            </div>
          )}

          {/* Show More Button */}
          {!isLoading && displayProperties.length > 0 && (
            <div className="text-center mt-12">
              <Link 
                href="/staybnb/search"
                className="inline-flex items-center space-x-2 px-8 py-3 bg-white border border-gray-300 rounded-lg hover:shadow-md transition-shadow text-gray-700 font-medium"
              >
                <span>Show more</span>
                <FaArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}

          {/* Popular Destinations */}
          <section className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
                Popular destinations
              </h2>
              <Link 
                href="/staybnb/destinations"
                className="text-rose-500 hover:text-rose-600 font-medium"
              >
                See all
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {popularDestinations.map((destination) => (
                <Link
                  key={destination.id}
                  href={`/staybnb/search?destination=${encodeURIComponent(destination.name)}`}
                  className="group block"
                >
                  <div className="relative aspect-square rounded-xl overflow-hidden mb-3">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-opacity"></div>
                  </div>
                  <h3 className="font-medium text-gray-900 group-hover:text-rose-500 transition-colors">
                    {destination.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {destination.propertyCount.toLocaleString()} properties
                  </p>
                </Link>
              ))}
            </div>
          </section>

          {/* Host Section */}
          <section className="mt-16 bg-white rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
                  Try hosting
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Earn extra income and unlock new opportunities by sharing your space.
                </p>
                <Link
                  href="/staybnb/host"
                  className="inline-block bg-rose-500 text-white px-8 py-3 rounded-lg hover:bg-rose-600 transition-colors font-medium"
                >
                  Learn more
                </Link>
              </div>
              <div className="relative aspect-video rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop"
                  alt="Try hosting"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </section>

          {/* Experience Section */}
          <section className="mt-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-8">
              Inspiration for future getaways
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="group cursor-pointer">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop"
                    alt="Beach getaways"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <h3 className="font-medium text-gray-900 mb-1">Beach getaways</h3>
                <p className="text-gray-500">Perfect for sun and relaxation</p>
              </div>

              <div className="group cursor-pointer">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
                    alt="Mountain escapes"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <h3 className="font-medium text-gray-900 mb-1">Mountain escapes</h3>
                <p className="text-gray-500">Fresh air and stunning views</p>
              </div>

              <div className="group cursor-pointer">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop"
                    alt="Unique stays"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <h3 className="font-medium text-gray-900 mb-1">Unique stays</h3>
                <p className="text-gray-500">Extraordinary experiences</p>
              </div>

              <div className="group cursor-pointer">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop"
                    alt="City breaks"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <h3 className="font-medium text-gray-900 mb-1">City breaks</h3>
                <p className="text-gray-500">Urban adventures await</p>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default StaybnbHomePage;
