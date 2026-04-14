import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import CarRentalHeader from '../../components/carrental/CarRentalHeader';
import VehicleCard from '../../components/carrental/VehicleCard';
import { FaCar, FaFilter, FaTimes } from 'react-icons/fa';
import { vehicleCategories, getFeaturedVehicles } from '../../utils/carRentalData';
import { vehicles } from '../../data/staticCarRentalData';

const FleetPage = () => {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? vehicles
    : vehicles.filter(v => v.category === activeCategory);

  const handleVehicleSelect = (vehicle) => {
    router.push(`/carrental/vehicle/${vehicle.id}`);
  };

  return (
    <>
      <Head>
        <title>Vehicle Fleet - CarRental</title>
        <meta name="description" content="Browse our full fleet of vehicles. Economy, compact, midsize, SUVs, luxury and more." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <CarRentalHeader currentPage="fleet" />

        {/* Hero */}
        <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-14">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <FaCar className="text-5xl mx-auto mb-4 text-orange-200" />
            <h1 className="text-4xl font-bold mb-3">Our Vehicle Fleet</h1>
            <p className="text-orange-100 text-lg max-w-xl mx-auto">
              From economy to luxury, find the perfect vehicle for every journey and budget.
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <div className="bg-white border-b border-gray-200 sticky top-20 z-30">
          <div className="max-w-7xl mx-auto px-4 py-3 overflow-x-auto">
            <div className="flex items-center gap-2 min-w-max">
              <FaFilter className="text-gray-400 mr-1 flex-shrink-0" size={14} />
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  activeCategory === 'all'
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Vehicles
              </button>
              {vehicleCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                    activeCategory === cat.id
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Fleet Grid */}
        <div className="max-w-7xl mx-auto px-4 py-10">
          {activeCategory !== 'all' && (
            <div className="mb-8">
              {vehicleCategories.filter(c => c.id === activeCategory).map(cat => (
                <div key={cat.id} className="bg-white rounded-xl p-6 border border-gray-200 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="text-4xl">{cat.icon}</div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{cat.name} Cars</h2>
                    <p className="text-gray-600">{cat.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {filtered.length} vehicle{filtered.length !== 1 ? 's' : ''} available
            </h2>
            {activeCategory !== 'all' && (
              <button
                onClick={() => setActiveCategory('all')}
                className="flex items-center gap-1 text-sm text-orange-600 hover:text-orange-700"
              >
                <FaTimes size={12} /> Clear filter
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(vehicle => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                onSelect={handleVehicleSelect}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <section className="bg-orange-600 text-white py-12 mt-8">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-3">Ready to Hit the Road?</h2>
            <p className="text-orange-100 mb-6">Search availability for your travel dates and location.</p>
            <Link
              href="/carrental/search"
              className="inline-block bg-white text-orange-600 font-semibold px-8 py-3 rounded-lg hover:bg-orange-50 transition-colors"
            >
              Search Available Vehicles
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-400 py-8 text-center text-sm">
          <p>© 2024 CarRental. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-3">
            <Link href="/carrental" className="hover:text-white transition-colors">Home</Link>
            <Link href="/carrental/fleet" className="hover:text-white transition-colors">Fleet</Link>
            <Link href="/carrental/locations" className="hover:text-white transition-colors">Locations</Link>
            <Link href="/carrental/offers" className="hover:text-white transition-colors">Offers</Link>
          </div>
        </footer>
      </div>
    </>
  );
};

export default FleetPage;
