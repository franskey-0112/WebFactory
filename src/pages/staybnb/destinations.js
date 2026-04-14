import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import StaybnbHeader from '../../components/staybnb/StaybnbHeader';
import { FaSearch, FaMapMarkerAlt, FaHome } from 'react-icons/fa';
import { getPopularDestinations } from '../../utils/staybnbData';
import { staybnbDestinations } from '../../utils/staybnbData';

const allDestinations = [
  { id: 'paris', name: 'Paris, France', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop', propertyCount: 4820, region: 'Europe' },
  { id: 'new-york', name: 'New York, USA', image: 'https://images.unsplash.com/photo-1538970272646-f61fabb3a8a2?w=400&h=300&fit=crop', propertyCount: 6240, region: 'North America' },
  { id: 'tokyo', name: 'Tokyo, Japan', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop', propertyCount: 3190, region: 'Asia' },
  { id: 'london', name: 'London, UK', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop', propertyCount: 5380, region: 'Europe' },
  { id: 'bali', name: 'Bali, Indonesia', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=300&fit=crop', propertyCount: 2840, region: 'Asia' },
  { id: 'barcelona', name: 'Barcelona, Spain', image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&h=300&fit=crop', propertyCount: 3670, region: 'Europe' },
  { id: 'sydney', name: 'Sydney, Australia', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', propertyCount: 2960, region: 'Oceania' },
  { id: 'rome', name: 'Rome, Italy', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=300&fit=crop', propertyCount: 2450, region: 'Europe' },
  { id: 'amsterdam', name: 'Amsterdam, Netherlands', image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=400&h=300&fit=crop', propertyCount: 1980, region: 'Europe' },
  { id: 'miami', name: 'Miami, USA', image: 'https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?w=400&h=300&fit=crop', propertyCount: 3120, region: 'North America' },
  { id: 'dubai', name: 'Dubai, UAE', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop', propertyCount: 2280, region: 'Middle East' },
  { id: 'cape-town', name: 'Cape Town, South Africa', image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=400&h=300&fit=crop', propertyCount: 1640, region: 'Africa' },
  { id: 'lisbon', name: 'Lisbon, Portugal', image: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=400&h=300&fit=crop', propertyCount: 2180, region: 'Europe' },
  { id: 'bangkok', name: 'Bangkok, Thailand', image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=400&h=300&fit=crop', propertyCount: 2590, region: 'Asia' },
  { id: 'san-francisco', name: 'San Francisco, USA', image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop', propertyCount: 2870, region: 'North America' },
  { id: 'singapore', name: 'Singapore', image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=400&h=300&fit=crop', propertyCount: 1420, region: 'Asia' },
  { id: 'mexico-city', name: 'Mexico City, Mexico', image: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=400&h=300&fit=crop', propertyCount: 1830, region: 'Latin America' },
  { id: 'istanbul', name: 'Istanbul, Turkey', image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400&h=300&fit=crop', propertyCount: 2040, region: 'Europe/Asia' },
];

const regions = ['All', 'Europe', 'North America', 'Asia', 'Oceania', 'Latin America', 'Africa', 'Middle East', 'Europe/Asia'];

const DestinationsPage = () => {
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('All');

  const filtered = allDestinations.filter(d => {
    const matchSearch = !search || d.name.toLowerCase().includes(search.toLowerCase());
    const matchRegion = region === 'All' || d.region === region;
    return matchSearch && matchRegion;
  });

  return (
    <>
      <Head>
        <title>All Destinations - StayBnB</title>
        <meta name="description" content="Explore StayBnB destinations worldwide. Find stays in cities, beaches, mountains and more." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <StaybnbHeader />

        {/* Hero */}
        <section className="bg-gradient-to-r from-rose-500 to-pink-600 text-white py-14">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <FaMapMarkerAlt className="text-5xl mx-auto mb-4 text-rose-200" />
            <h1 className="text-4xl font-bold mb-3">Explore Destinations</h1>
            <p className="text-rose-100 text-lg mb-8 max-w-xl mx-auto">
              Discover amazing places to stay around the world.
            </p>
            <div className="max-w-md mx-auto relative">
              <FaSearch className="absolute left-4 top-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search destinations..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full border-0 rounded-xl pl-11 pr-4 py-3.5 text-gray-900 shadow-lg focus:ring-2 focus:ring-rose-300 outline-none"
              />
            </div>
          </div>
        </section>

        {/* Region Filter */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-30 overflow-x-auto">
          <div className="max-w-6xl mx-auto px-4 py-3 flex gap-2 min-w-max">
            {regions.filter((r, i, arr) => allDestinations.some(d => d.region === r) || r === 'All').map(r => (
              <button
                key={r}
                onClick={() => setRegion(r)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  region === r ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Destinations Grid */}
        <div className="max-w-6xl mx-auto px-4 py-10">
          <p className="text-gray-600 mb-6">{filtered.length} destination{filtered.length !== 1 ? 's' : ''}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map(dest => (
              <Link
                key={dest.id}
                href={`/staybnb/search?destination=${encodeURIComponent(dest.name)}`}
                className="group block rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-200 bg-white"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-0 transition-opacity" />
                  <span className="absolute top-3 right-3 bg-white bg-opacity-90 text-xs font-medium text-gray-700 px-2 py-1 rounded-full">
                    {dest.region}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 group-hover:text-rose-500 transition-colors">{dest.name}</h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                    <FaHome size={12} /> {dest.propertyCount.toLocaleString()} stays
                  </p>
                </div>
              </Link>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-500">
              <FaMapMarkerAlt className="text-5xl mx-auto mb-3 text-gray-300" />
              <p className="text-lg font-medium">No destinations found</p>
            </div>
          )}
        </div>

        <footer className="bg-white border-t border-gray-200 py-8 text-center text-sm text-gray-500 mt-4">
          <div className="flex justify-center gap-6">
            <Link href="/staybnb" className="hover:text-rose-500">Home</Link>
            <Link href="/staybnb/search" className="hover:text-rose-500">Search</Link>
            <Link href="/staybnb/destinations" className="text-rose-500 font-medium">Destinations</Link>
          </div>
          <p className="mt-3">© 2024 StayBnB, Inc.</p>
        </footer>
      </div>
    </>
  );
};

export default DestinationsPage;
