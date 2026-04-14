import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import CarRentalHeader from '../../components/carrental/CarRentalHeader';
import {
  FaMapMarkerAlt,
  FaPhone,
  FaClock,
  FaPlane,
  FaCity,
  FaSearch,
  FaChevronRight
} from 'react-icons/fa';
import { rentalLocations } from '../../utils/carRentalData';

const LocationsPage = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = rentalLocations.filter(loc => {
    const matchesSearch = !search ||
      loc.name.toLowerCase().includes(search.toLowerCase()) ||
      loc.address.toLowerCase().includes(search.toLowerCase());
    const matchesType = filter === 'all' || loc.type === filter;
    return matchesSearch && matchesType;
  });

  const airports = rentalLocations.filter(l => l.type === 'airport');
  const cities = rentalLocations.filter(l => l.type === 'city');

  return (
    <>
      <Head>
        <title>Locations - CarRental</title>
        <meta name="description" content="Find CarRental locations near airports and city centers." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <CarRentalHeader currentPage="locations" />

        {/* Hero */}
        <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-14">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <FaMapMarkerAlt className="text-5xl mx-auto mb-4 text-orange-200" />
            <h1 className="text-4xl font-bold mb-3">Our Locations</h1>
            <p className="text-orange-100 text-lg mb-8 max-w-xl mx-auto">
              Conveniently located at major airports and city centers worldwide.
            </p>

            {/* Stats */}
            <div className="flex justify-center gap-8 flex-wrap">
              <div className="text-center">
                <div className="text-3xl font-bold">{airports.length}+</div>
                <div className="text-orange-200 text-sm">Airport Locations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{cities.length}+</div>
                <div className="text-orange-200 text-sm">City Locations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-orange-200 text-sm">Airport Support</div>
              </div>
            </div>
          </div>
        </section>

        {/* Search & Filter */}
        <div className="bg-white border-b border-gray-200 sticky top-20 z-30">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row gap-3 items-center">
            <div className="relative flex-1 w-full">
              <FaSearch className="absolute left-3 top-3 text-gray-400" size={14} />
              <input
                type="text"
                placeholder="Search by city or airport..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2.5 text-sm focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none"
              />
            </div>
            <div className="flex gap-2">
              {['all', 'airport', 'city'].map(type => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    filter === type ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type === 'airport' ? <><FaPlane className="inline mr-1" size={12} />Airports</> :
                   type === 'city' ? <><FaCity className="inline mr-1" size={12} />Cities</> :
                   'All'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Locations Grid */}
        <div className="max-w-7xl mx-auto px-4 py-10">
          <p className="text-gray-600 mb-6">{filtered.length} location{filtered.length !== 1 ? 's' : ''} found</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(loc => (
              <div key={loc.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className={`h-2 ${loc.type === 'airport' ? 'bg-blue-500' : 'bg-orange-500'}`} />
                <div className="p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`p-2 rounded-lg flex-shrink-0 ${loc.type === 'airport' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>
                      {loc.type === 'airport' ? <FaPlane /> : <FaCity />}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm leading-tight">{loc.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        loc.type === 'airport' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {loc.type === 'airport' ? 'Airport' : 'City Center'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-start gap-2">
                      <FaMapMarkerAlt className="text-gray-400 mt-0.5 flex-shrink-0" size={12} />
                      <span>{loc.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaPhone className="text-gray-400 flex-shrink-0" size={12} />
                      <a href={`tel:${loc.phone}`} className="text-orange-600 hover:underline">{loc.phone}</a>
                    </div>
                    <div className="flex items-start gap-2">
                      <FaClock className="text-gray-400 mt-0.5 flex-shrink-0" size={12} />
                      <div>
                        <span className="text-gray-500">Weekdays: </span>{loc.hours?.weekdays || 'See location'}
                        {loc.hours?.weekends && (
                          <div><span className="text-gray-500">Weekends: </span>{loc.hours.weekends}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  {loc.amenities && loc.amenities.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t border-gray-100">
                      {loc.amenities.slice(0, 3).map(a => (
                        <span key={a} className="text-xs bg-gray-100 text-gray-600 rounded-full px-2 py-0.5">{a}</span>
                      ))}
                    </div>
                  )}

                  <Link
                    href={`/carrental/search?pickupLocation=${loc.id}`}
                    className="mt-4 flex items-center justify-center gap-2 w-full bg-orange-50 hover:bg-orange-100 text-orange-600 font-medium text-sm py-2.5 rounded-lg transition-colors"
                  >
                    Find Vehicles Here <FaChevronRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-500">
              <FaMapMarkerAlt className="text-4xl mx-auto mb-3 text-gray-300" />
              <p className="text-lg font-medium">No locations found</p>
              <p className="text-sm mt-1">Try a different search term</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-400 py-8 text-center text-sm mt-8">
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

export default LocationsPage;
