import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import StaybnbHeader from '../../components/staybnb/StaybnbHeader';
import { getFeaturedProperties } from '../../utils/staybnbData';
import { FaHeart, FaStar, FaMapMarkerAlt, FaSearch, FaTimes } from 'react-icons/fa';

// Mock saved properties using the first 6 featured properties
const getSavedProperties = () => getFeaturedProperties(6);

const FavoritesPage = () => {
  const [saved, setSaved] = useState(() => getSavedProperties());

  const remove = (id) => setSaved(prev => prev.filter(p => p.id !== id));

  return (
    <>
      <Head>
        <title>Saved - StayBnB</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <StaybnbHeader />

        <div className="max-w-5xl mx-auto px-4 py-10">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold text-gray-900">Saved</h1>
            {saved.length > 0 && (
              <span className="text-sm text-gray-500">{saved.length} propert{saved.length !== 1 ? 'ies' : 'y'}</span>
            )}
          </div>
          <p className="text-gray-500 mb-8">Properties you've wishlisted</p>

          {saved.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <FaHeart className="text-5xl mx-auto mb-4 text-gray-200" />
              <p className="text-lg font-medium mb-2">No saved properties yet</p>
              <p className="text-sm text-gray-400 mb-6">Tap the heart on any property to save it here.</p>
              <Link
                href="/staybnb/search"
                className="inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-medium px-5 py-2.5 rounded-xl transition-colors text-sm"
              >
                <FaSearch size={12} /> Explore stays
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {saved.map(property => {
                const image = property?.images?.[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop';
                const location = property.location
                  ? `${property.location.city}, ${property.location.state || property.location.country}`
                  : '';

                return (
                  <div key={property.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group relative">
                    {/* Remove button */}
                    <button
                      onClick={() => remove(property.id)}
                      className="absolute top-3 right-3 z-10 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
                      title="Remove from saved"
                    >
                      <FaTimes size={12} className="text-gray-500" />
                    </button>

                    <Link href={`/staybnb/property/${property.id}`} className="block">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={image}
                          alt={property.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute bottom-3 left-3">
                          <span className="bg-white bg-opacity-90 text-xs font-medium text-gray-700 px-2 py-1 rounded-full capitalize">
                            {property.type || property.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 group-hover:text-rose-500 transition-colors">
                            {property.title}
                          </h3>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <FaStar className="text-yellow-400" size={12} />
                            <span className="text-sm font-medium text-gray-900">{property.rating}</span>
                          </div>
                        </div>
                        {location && (
                          <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                            <FaMapMarkerAlt size={10} /> {location}
                          </p>
                        )}
                        <p className="mt-3 text-sm text-gray-900">
                          <span className="font-semibold">${property.pricePerNight}</span>
                          <span className="text-gray-500"> / night</span>
                        </p>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}

          {saved.length > 0 && (
            <div className="mt-10 bg-rose-50 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-gray-900">Discover more places</p>
                <p className="text-sm text-gray-500 mt-0.5">Find your next perfect stay.</p>
              </div>
              <Link
                href="/staybnb/search"
                className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white font-medium px-5 py-2.5 rounded-xl transition-colors text-sm whitespace-nowrap"
              >
                <FaSearch size={12} /> Explore stays
              </Link>
            </div>
          )}
        </div>

        <footer className="bg-white border-t border-gray-200 py-8 text-center text-sm text-gray-500 mt-4">
          <div className="flex justify-center gap-6">
            <Link href="/staybnb" className="hover:text-rose-500">Home</Link>
            <Link href="/staybnb/trips" className="hover:text-rose-500">Trips</Link>
            <Link href="/staybnb/favorites" className="text-rose-500 font-medium">Saved</Link>
          </div>
          <p className="mt-3">© 2024 StayBnB, Inc.</p>
        </footer>
      </div>
    </>
  );
};

export default FavoritesPage;
