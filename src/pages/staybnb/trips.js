import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import StaybnbHeader from '../../components/staybnb/StaybnbHeader';
import { getPropertyById, formatDate, calculateNights } from '../../utils/staybnbData';
import { FaCalendarAlt, FaMapMarkerAlt, FaStar, FaSearch, FaChevronRight } from 'react-icons/fa';

const mockTrips = [
  {
    id: 't1',
    propertyId: 'property-1',
    checkIn: '2024-11-10',
    checkOut: '2024-11-15',
    guests: 2,
    totalPrice: 745,
    status: 'completed',
    rating: 5
  },
  {
    id: 't2',
    propertyId: 'property-2',
    checkIn: '2024-08-20',
    checkOut: '2024-08-25',
    guests: 3,
    totalPrice: 1290,
    status: 'completed',
    rating: 4
  },
  {
    id: 't3',
    propertyId: 'property-3',
    checkIn: '2025-03-01',
    checkOut: '2025-03-05',
    guests: 2,
    totalPrice: 560,
    status: 'upcoming',
    rating: null
  },
  {
    id: 't4',
    propertyId: 'property-4',
    checkIn: '2024-06-12',
    checkOut: '2024-06-16',
    guests: 4,
    totalPrice: 920,
    status: 'completed',
    rating: 5
  },
  {
    id: 't5',
    propertyId: 'property-5',
    checkIn: '2025-05-18',
    checkOut: '2025-05-22',
    guests: 2,
    totalPrice: 680,
    status: 'upcoming',
    rating: null
  }
];

const statusConfig = {
  upcoming: { label: 'Upcoming', className: 'bg-blue-100 text-blue-700' },
  completed: { label: 'Completed', className: 'bg-green-100 text-green-700' },
  cancelled: { label: 'Cancelled', className: 'bg-gray-100 text-gray-600' }
};

const TripsPage = () => {
  const [tab, setTab] = useState('all');

  const filtered = tab === 'all'
    ? mockTrips
    : mockTrips.filter(t => t.status === tab);

  return (
    <>
      <Head>
        <title>My Trips - StayBnB</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <StaybnbHeader />

        <div className="max-w-4xl mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Trips</h1>
          <p className="text-gray-500 mb-8">Your travel history and upcoming stays</p>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b border-gray-200">
            {[
              { key: 'all', label: 'All trips' },
              { key: 'upcoming', label: 'Upcoming' },
              { key: 'completed', label: 'Completed' }
            ].map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                  tab === t.key
                    ? 'border-rose-500 text-rose-500'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <FaCalendarAlt className="text-5xl mx-auto mb-4 text-gray-200" />
              <p className="text-lg font-medium mb-2">No trips found</p>
              <Link href="/staybnb/search" className="text-rose-500 hover:underline text-sm">
                Start searching for places to stay
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map(trip => {
                const property = getPropertyById(trip.propertyId);
                const nights = calculateNights(trip.checkIn, trip.checkOut);
                const status = statusConfig[trip.status] || statusConfig.completed;
                const image = property?.images?.[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop';
                const title = property?.title || 'StayBnB Property';
                const city = property ? `${property.location.city}, ${property.location.state || property.location.country}` : '';

                return (
                  <div key={trip.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-48 h-40 sm:h-auto flex-shrink-0">
                        <img src={image} alt={title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 p-5 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <h3 className="font-semibold text-gray-900 text-lg leading-tight">{title}</h3>
                            <span className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${status.className}`}>
                              {status.label}
                            </span>
                          </div>
                          {city && (
                            <p className="text-sm text-gray-500 flex items-center gap-1 mb-3">
                              <FaMapMarkerAlt size={11} /> {city}
                            </p>
                          )}
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1.5">
                              <FaCalendarAlt size={12} className="text-gray-400" />
                              {formatDate(trip.checkIn)} – {formatDate(trip.checkOut)}
                            </div>
                            <span>{nights} night{nights !== 1 ? 's' : ''} · {trip.guests} guest{trip.guests !== 1 ? 's' : ''}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-3">
                            <span className="font-semibold text-gray-900">${trip.totalPrice.toLocaleString()} total</span>
                            {trip.status === 'completed' && trip.rating && (
                              <span className="flex items-center gap-1 text-sm text-gray-500">
                                <FaStar className="text-yellow-400" size={12} />
                                {trip.rating}
                              </span>
                            )}
                          </div>
                          <Link
                            href={`/staybnb/property/${trip.propertyId}`}
                            className="flex items-center gap-1 text-sm text-rose-500 hover:text-rose-600 font-medium"
                          >
                            View details <FaChevronRight size={11} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Search CTA */}
          <div className="mt-10 bg-rose-50 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-gray-900">Ready for your next adventure?</p>
              <p className="text-sm text-gray-500 mt-0.5">Discover thousands of unique stays worldwide.</p>
            </div>
            <Link
              href="/staybnb/search"
              className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-medium px-5 py-2.5 rounded-xl transition-colors text-sm whitespace-nowrap"
            >
              <FaSearch size={12} /> Explore stays
            </Link>
          </div>
        </div>

        <footer className="bg-white border-t border-gray-200 py-8 text-center text-sm text-gray-500 mt-4">
          <div className="flex justify-center gap-6">
            <Link href="/staybnb" className="hover:text-rose-500">Home</Link>
            <Link href="/staybnb/trips" className="text-rose-500 font-medium">Trips</Link>
            <Link href="/staybnb/favorites" className="hover:text-rose-500">Saved</Link>
          </div>
          <p className="mt-3">© 2024 StayBnB, Inc.</p>
        </footer>
      </div>
    </>
  );
};

export default TripsPage;
