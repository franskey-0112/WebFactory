import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import StaybnbHeader from '../../components/staybnb/StaybnbHeader';
import {
  FaHome,
  FaDollarSign,
  FaShieldAlt,
  FaHeadset,
  FaCheckCircle,
  FaStar,
  FaArrowRight,
  FaCamera,
  FaCalendarAlt,
  FaUsers
} from 'react-icons/fa';

const steps = [
  {
    number: '1',
    title: 'Tell us about your place',
    description: 'Share basic info like location, type of space, and how many guests can stay.',
    icon: <FaHome className="text-rose-500 text-2xl" />
  },
  {
    number: '2',
    title: 'Make it stand out',
    description: 'Add 5 or more photos plus a title and description — we\'ll help you out.',
    icon: <FaCamera className="text-rose-500 text-2xl" />
  },
  {
    number: '3',
    title: 'Set your price & availability',
    description: 'Choose a starting price and open your calendar to guests.',
    icon: <FaCalendarAlt className="text-rose-500 text-2xl" />
  }
];

const benefits = [
  {
    icon: <FaDollarSign className="text-3xl text-green-500" />,
    title: 'Earn extra income',
    description: 'Turn your spare room or property into a source of income. Hosts in our top cities earn thousands per month.'
  },
  {
    icon: <FaShieldAlt className="text-3xl text-blue-500" />,
    title: 'Host protection',
    description: 'AirCover for Hosts includes $3M damage protection, liability insurance, and 24/7 support.'
  },
  {
    icon: <FaHeadset className="text-3xl text-purple-500" />,
    title: '24/7 support',
    description: 'Our dedicated Host support team is always ready to help with anything you need.'
  },
  {
    icon: <FaUsers className="text-3xl text-orange-500" />,
    title: 'You\'re in control',
    description: 'Choose who stays, set your own rules, and decide when to host — your space, your terms.'
  }
];

const HostPage = () => {
  const router = useRouter();
  const [estimatedNights, setEstimatedNights] = useState(10);
  const [pricePerNight, setPricePerNight] = useState(80);
  const estimatedEarnings = estimatedNights * pricePerNight * 0.97;
  const [showListingModal, setShowListingModal] = useState(false);
  const [listingStep, setListingStep] = useState(1);
  const [listingForm, setListingForm] = useState({ type: '', address: '', title: '', price: '' });
  const [listingSubmitted, setListingSubmitted] = useState(false);

  const handleStartListing = () => setShowListingModal(true);

  const handleListingNext = () => {
    if (listingStep < 3) setListingStep(s => s + 1);
    else { setListingSubmitted(true); }
  };

  return (
    <>
      <Head>
        <title>Become a Host - StayBnB</title>
        <meta name="description" content="Share your space and earn money as a StayBnB host. It's easy to get started." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-white">
        <StaybnbHeader />

        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[70vh]">
            <div className="flex items-center px-8 py-16 lg:px-16 bg-white order-2 lg:order-1">
              <div className="max-w-lg">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                  Earn money as a
                  <span className="text-rose-500"> StayBnB host</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Share your space with travelers from around the world. Set your own schedule, prices, and house rules.
                </p>

                {/* Earnings Estimator */}
                <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4">Estimate your earnings</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Nights per month</span>
                        <span className="font-medium">{estimatedNights} nights</span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={30}
                        value={estimatedNights}
                        onChange={e => setEstimatedNights(Number(e.target.value))}
                        className="w-full accent-rose-500"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Price per night</span>
                        <span className="font-medium">${pricePerNight}</span>
                      </div>
                      <input
                        type="range"
                        min={20}
                        max={500}
                        step={5}
                        value={pricePerNight}
                        onChange={e => setPricePerNight(Number(e.target.value))}
                        className="w-full accent-rose-500"
                      />
                    </div>
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-medium">Estimated monthly earnings</span>
                        <span className="text-2xl font-bold text-rose-500">
                          ${Math.round(estimatedEarnings).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">After StayBnB service fee (3%)</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleStartListing}
                  className="w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold py-4 rounded-xl text-lg transition-colors"
                >
                  Get started
                </button>
              </div>
            </div>

            <div className="order-1 lg:order-2 h-64 lg:h-auto">
              <img
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop"
                alt="Hosting a home"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How to get started</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step) => (
                <div key={step.number} className="text-center">
                  <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center mx-auto mb-4 border border-gray-200">
                    {step.icon}
                  </div>
                  <div className="text-4xl font-bold text-gray-200 mb-2">{step.number}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why host on StayBnB?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits.map(benefit => (
                <div key={benefit.title} className="flex gap-5 p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex-shrink-0">{benefit.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-rose-50">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Hear from hosts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: 'Maria S.',
                  location: 'Barcelona, Spain',
                  quote: 'I started hosting to cover my rent. Now I earn more from hosting than my full-time job!',
                  rating: 5,
                  image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop'
                },
                {
                  name: 'James T.',
                  location: 'New York, USA',
                  quote: 'The support team is amazing. Whenever I have questions, they respond within minutes.',
                  rating: 5,
                  image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop'
                },
                {
                  name: 'Yuki K.',
                  location: 'Tokyo, Japan',
                  quote: 'I love meeting travelers from around the world. It\'s been a wonderful cultural exchange.',
                  rating: 5,
                  image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop'
                }
              ].map(host => (
                <div key={host.name} className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center gap-1 text-yellow-400 mb-3">
                    {[...Array(host.rating)].map((_, i) => <FaStar key={i} size={14} />)}
                  </div>
                  <p className="text-gray-700 italic mb-4">"{host.quote}"</p>
                  <div className="flex items-center gap-3">
                    <img src={host.image} alt={host.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{host.name}</p>
                      <p className="text-gray-500 text-xs">{host.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-rose-500 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to start hosting?</h2>
          <p className="text-rose-100 text-lg mb-8 max-w-xl mx-auto">
            Join millions of hosts sharing their spaces and earning extra income.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleStartListing}
              className="bg-white text-rose-600 font-semibold px-8 py-3 rounded-xl hover:bg-rose-50 transition-colors flex items-center justify-center gap-2"
            >
              Start your listing <FaArrowRight />
            </button>
            <Link href="/staybnb" className="border border-white text-white font-semibold px-8 py-3 rounded-xl hover:bg-rose-600 transition-colors">
              Back to StayBnB
            </Link>
          </div>
        </section>

        {/* Start Listing Modal */}
        {showListingModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
              <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => { setShowListingModal(false); setListingStep(1); setListingSubmitted(false); }} />
              <div className="relative bg-white rounded-2xl max-w-md w-full p-6">
                {listingSubmitted ? (
                  <div className="text-center py-6">
                    <div className="text-5xl mb-4">🎉</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">You're all set!</h2>
                    <p className="text-gray-500 mb-6">Your listing has been submitted for review. We'll notify you once it's live.</p>
                    <button
                      onClick={() => { setShowListingModal(false); setListingStep(1); setListingSubmitted(false); setListingForm({ type: '', address: '', title: '', price: '' }); }}
                      className="bg-rose-500 text-white px-6 py-3 rounded-xl hover:bg-rose-600 font-medium"
                    >
                      Done
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <p className="text-xs text-gray-400 mb-0.5">Step {listingStep} of 3</p>
                        <h2 className="text-lg font-bold text-gray-900">
                          {listingStep === 1 ? 'About your place' : listingStep === 2 ? 'Make it stand out' : 'Set your price'}
                        </h2>
                      </div>
                      <button onClick={() => { setShowListingModal(false); setListingStep(1); }} className="p-2 hover:bg-gray-100 rounded-full">
                        <FaArrowRight className="rotate-180 text-gray-400" size={14} />
                      </button>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mb-6">
                      <div className="bg-rose-500 h-1.5 rounded-full transition-all" style={{ width: `${(listingStep / 3) * 100}%` }} />
                    </div>

                    {listingStep === 1 && (
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-700 block mb-1">Property type</label>
                          <select
                            value={listingForm.type}
                            onChange={e => setListingForm(f => ({ ...f, type: e.target.value }))}
                            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-rose-400 outline-none"
                          >
                            <option value="">Select type</option>
                            {['Entire house', 'Apartment', 'Private room', 'Shared room', 'Cabin', 'Villa'].map(t => <option key={t} value={t}>{t}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700 block mb-1">Address</label>
                          <input
                            type="text"
                            value={listingForm.address}
                            onChange={e => setListingForm(f => ({ ...f, address: e.target.value }))}
                            placeholder="City, Country"
                            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-rose-400 outline-none"
                          />
                        </div>
                      </div>
                    )}

                    {listingStep === 2 && (
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-700 block mb-1">Listing title</label>
                          <input
                            type="text"
                            value={listingForm.title}
                            onChange={e => setListingForm(f => ({ ...f, title: e.target.value }))}
                            placeholder="e.g. Cozy apartment in city center"
                            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-rose-400 outline-none"
                          />
                        </div>
                        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-rose-400 transition-colors">
                          <div className="text-3xl mb-2">📸</div>
                          <p className="text-sm text-gray-600">Click to add photos</p>
                          <p className="text-xs text-gray-400 mt-1">Add at least 5 photos</p>
                        </div>
                      </div>
                    )}

                    {listingStep === 3 && (
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-700 block mb-1">Price per night (USD)</label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                            <input
                              type="number"
                              value={listingForm.price}
                              onChange={e => setListingForm(f => ({ ...f, price: e.target.value }))}
                              placeholder="80"
                              min="10"
                              className="w-full border border-gray-300 rounded-xl pl-8 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-rose-400 outline-none"
                            />
                          </div>
                        </div>
                        <div className="p-4 bg-rose-50 rounded-xl text-sm text-gray-600">
                          <p className="font-medium text-gray-900 mb-1">Estimated monthly earnings</p>
                          <p className="text-2xl font-bold text-rose-500">
                            ${listingForm.price ? Math.round(Number(listingForm.price) * 0.97 * 15).toLocaleString() : '—'}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">Based on 15 nights/month after 3% fee</p>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3 mt-6">
                      {listingStep > 1 && (
                        <button onClick={() => setListingStep(s => s - 1)} className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-sm hover:border-gray-400 transition-colors">
                          Back
                        </button>
                      )}
                      <button
                        onClick={handleListingNext}
                        className="flex-1 bg-rose-500 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-rose-600 transition-colors"
                      >
                        {listingStep === 3 ? 'Submit listing' : 'Next'}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        <footer className="bg-white border-t border-gray-200 py-8 text-center text-sm text-gray-500">
          <div className="flex justify-center gap-6">
            <Link href="/staybnb" className="hover:text-rose-500">Home</Link>
            <Link href="/staybnb/search" className="hover:text-rose-500">Search</Link>
            <Link href="/staybnb/destinations" className="hover:text-rose-500">Destinations</Link>
          </div>
          <p className="mt-3">© 2024 StayBnB, Inc.</p>
        </footer>
      </div>
    </>
  );
};

export default HostPage;
