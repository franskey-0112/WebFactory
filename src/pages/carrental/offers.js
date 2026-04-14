import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import CarRentalHeader from '../../components/carrental/CarRentalHeader';
import {
  FaTag,
  FaPercent,
  FaCalendarAlt,
  FaCar,
  FaArrowRight,
  FaCheck,
  FaClock,
  FaStar
} from 'react-icons/fa';
import { rentalPackages } from '../../data/staticCarRentalData';
import { vehicleCategories } from '../../utils/carRentalData';

const categoryColors = {
  'economy': 'green',
  'compact': 'blue',
  'midsize': 'indigo',
  'suv': 'orange',
  'premium': 'purple',
  'luxury': 'yellow',
};

const packageIcons = {
  'weekend-special': '🏖️',
  'business-traveler': '💼',
  'family-vacation': '👨‍👩‍👧‍👦',
};

const earlyBirdOffers = [
  {
    id: 'early-bird-7',
    title: 'Book 7 Days Early',
    discount: '10% off',
    description: 'Reserve your vehicle at least 7 days before pick-up and save.',
    code: 'EARLY10',
    validUntil: 'Dec 31, 2024',
    categories: 'All vehicles'
  },
  {
    id: 'early-bird-30',
    title: 'Book 30 Days Early',
    discount: '20% off',
    description: 'Plan ahead and save big! Book 30+ days in advance for maximum savings.',
    code: 'PLAN20',
    validUntil: 'Dec 31, 2024',
    categories: 'All vehicles'
  },
  {
    id: 'weekly-deal',
    title: 'Weekly Rental Deal',
    discount: '15% off',
    description: 'Rent for 7+ days and enjoy a 15% discount on the total rental price.',
    code: 'WEEK15',
    validUntil: 'Ongoing',
    categories: 'Economy, Compact, Midsize'
  },
];

const OffersPage = () => {
  return (
    <>
      <Head>
        <title>Special Offers - CarRental</title>
        <meta name="description" content="Exclusive car rental deals and discounts. Save on weekend rentals, business travel, and family vacations." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <CarRentalHeader currentPage="offers" />

        {/* Hero */}
        <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-14">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <FaTag className="text-5xl mx-auto mb-4 text-orange-200" />
            <h1 className="text-4xl font-bold mb-3">Special Offers</h1>
            <p className="text-orange-100 text-lg max-w-xl mx-auto">
              Exclusive deals to help you save on your next rental. More savings, more adventures.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-12 space-y-14">

          {/* Featured Packages */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <FaStar className="text-orange-500 text-2xl" />
              <h2 className="text-2xl font-bold text-gray-900">Featured Packages</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {rentalPackages.map(pkg => {
                const discountPct = Math.round(pkg.discount * 100);
                const icon = packageIcons[pkg.id] || '🚗';
                return (
                  <div key={pkg.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 p-5 text-white">
                      <div className="text-4xl mb-2">{icon}</div>
                      <h3 className="text-xl font-bold">{pkg.name}</h3>
                      <div className="flex items-center gap-1 mt-1">
                        <FaPercent size={14} />
                        <span className="text-2xl font-bold">{discountPct}% OFF</span>
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>
                      <ul className="space-y-2 mb-5">
                        {pkg.minDays > 1 && (
                          <li className="flex items-center gap-2 text-sm text-gray-600">
                            <FaCheck className="text-green-500" size={12} />
                            Minimum {pkg.minDays} day{pkg.minDays > 1 ? 's' : ''} rental
                          </li>
                        )}
                        <li className="flex items-center gap-2 text-sm text-gray-600">
                          <FaCheck className="text-green-500" size={12} />
                          Valid: {pkg.validDays.join(', ')}
                        </li>
                        <li className="flex items-center gap-2 text-sm text-gray-600">
                          <FaCheck className="text-green-500" size={12} />
                          Categories: {pkg.categories.join(', ')}
                        </li>
                      </ul>
                      <Link
                        href={`/carrental/search?category=${pkg.categories[0]}`}
                        className="flex items-center justify-center gap-2 w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 rounded-lg transition-colors text-sm"
                      >
                        Book with this deal <FaArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Early Bird & Promo Codes */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <FaTag className="text-orange-500 text-2xl" />
              <h2 className="text-2xl font-bold text-gray-900">Promo Codes</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {earlyBirdOffers.map(offer => (
                <div key={offer.id} className="bg-white rounded-xl border-2 border-dashed border-orange-300 p-5 hover:border-orange-500 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-gray-900">{offer.title}</h3>
                    <span className="bg-orange-100 text-orange-700 text-sm font-bold px-2 py-1 rounded">{offer.discount}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{offer.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span><FaCalendarAlt className="inline mr-1" />Valid until: {offer.validUntil}</span>
                    <span><FaCar className="inline mr-1" />{offer.categories}</span>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 flex items-center justify-between">
                    <span className="font-mono font-bold text-orange-600 tracking-widest">{offer.code}</span>
                    <button
                      onClick={() => {
                        navigator.clipboard?.writeText(offer.code);
                      }}
                      className="text-xs text-gray-500 hover:text-gray-700 border border-gray-300 px-2 py-1 rounded"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Category Deals */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <FaPercent className="text-orange-500 text-2xl" />
              <h2 className="text-2xl font-bold text-gray-900">Deals by Vehicle Type</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {vehicleCategories.slice(0, 8).map((cat, idx) => {
                const discounts = [5, 10, 12, 15, 8, 20, 10, 18];
                return (
                  <Link
                    key={cat.id}
                    href={`/carrental/search?category=${cat.id}`}
                    className="bg-white rounded-xl border border-gray-200 p-4 text-center hover:shadow-md transition-shadow hover:border-orange-300 group"
                  >
                    <div className="text-3xl mb-2">{cat.icon}</div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">{cat.name}</h3>
                    <div className="text-orange-600 font-bold text-sm">Up to {discounts[idx]}% off</div>
                    <div className="mt-2 text-xs text-gray-500 group-hover:text-orange-600 flex items-center justify-center gap-1">
                      Browse <FaArrowRight size={10} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* CTA Banner */}
          <section className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-white text-center">
            <FaClock className="text-4xl mx-auto mb-3 text-orange-200" />
            <h2 className="text-2xl font-bold mb-2">Limited Time Offers</h2>
            <p className="text-orange-100 mb-6 max-w-md mx-auto">
              Don't miss out on our best deals. Book now and lock in today's prices for your next adventure.
            </p>
            <Link
              href="/carrental/search"
              className="inline-flex items-center gap-2 bg-white text-orange-600 font-semibold px-8 py-3 rounded-lg hover:bg-orange-50 transition-colors"
            >
              Search Available Vehicles <FaArrowRight />
            </Link>
          </section>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-400 py-8 text-center text-sm mt-4">
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

export default OffersPage;
