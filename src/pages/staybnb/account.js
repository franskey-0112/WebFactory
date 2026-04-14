import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import StaybnbHeader from '../../components/staybnb/StaybnbHeader';
import {
  FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaShieldAlt, FaStar, FaHome, FaHeart,
  FaEdit, FaCamera, FaCheck, FaTimes
} from 'react-icons/fa';

const mockUser = {
  name: 'Alex Johnson',
  email: 'alex.johnson@email.com',
  phone: '+1 (555) 234-5678',
  location: 'San Francisco, CA',
  joinDate: 'January 2021',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop',
  bio: 'Travel enthusiast and outdoor lover. I enjoy discovering hidden gems around the world.',
  verified: true,
  identityVerified: true,
  responseRate: 98,
  responseTime: 'Within an hour',
  tripsCompleted: 12,
  reviewsReceived: 8,
  superhost: false
};

const AccountPage = () => {
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    name: mockUser.name,
    email: mockUser.email,
    phone: mockUser.phone,
    location: mockUser.location,
    bio: mockUser.bio
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setEditMode(false);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <>
      <Head>
        <title>Account - StayBnB</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <StaybnbHeader />

        <div className="max-w-4xl mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Account</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center sticky top-24">
                <div className="relative inline-block mb-4">
                  <img src={mockUser.avatar} alt={mockUser.name} className="w-24 h-24 rounded-full object-cover mx-auto" />
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center shadow-sm hover:bg-gray-50">
                    <FaCamera size={12} className="text-gray-600" />
                  </button>
                </div>
                <h2 className="text-xl font-bold text-gray-900">{form.name}</h2>
                <p className="text-gray-500 text-sm mt-1">Member since {mockUser.joinDate}</p>

                {saved && (
                  <div className="mt-3 flex items-center justify-center gap-2 text-green-600 text-sm font-medium">
                    <FaCheck size={12} /> Changes saved!
                  </div>
                )}

                <div className="mt-5 space-y-3 text-sm">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="text-center flex-1">
                      <p className="font-bold text-gray-900 text-lg">{mockUser.tripsCompleted}</p>
                      <p className="text-gray-500">Trips</p>
                    </div>
                    <div className="w-px h-8 bg-gray-200" />
                    <div className="text-center flex-1">
                      <p className="font-bold text-gray-900 text-lg">{mockUser.reviewsReceived}</p>
                      <p className="text-gray-500">Reviews</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-left">
                  {mockUser.verified && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FaCheck className="text-green-500" size={12} /> Email verified
                    </div>
                  )}
                  {mockUser.identityVerified && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FaShieldAlt className="text-blue-500" size={12} /> Identity verified
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Profile Form */}
            <div className="md:col-span-2 space-y-6">
              {/* Personal Info */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-lg font-semibold text-gray-900">Personal info</h3>
                  {!editMode ? (
                    <button
                      onClick={() => setEditMode(true)}
                      className="flex items-center gap-2 text-sm text-rose-500 hover:text-rose-600 font-medium"
                    >
                      <FaEdit size={13} /> Edit
                    </button>
                  ) : (
                    <div className="flex gap-3">
                      <button
                        onClick={() => { setEditMode(false); setForm({ name: mockUser.name, email: mockUser.email, phone: mockUser.phone, location: mockUser.location, bio: mockUser.bio }); }}
                        className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
                      >
                        <FaTimes size={12} /> Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        className="text-sm bg-rose-500 text-white px-4 py-1.5 rounded-lg hover:bg-rose-600 flex items-center gap-1"
                      >
                        <FaCheck size={12} /> Save
                      </button>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Full name', key: 'name', icon: <FaUser size={13} /> },
                    { label: 'Email', key: 'email', icon: <FaEnvelope size={13} />, type: 'email' },
                    { label: 'Phone', key: 'phone', icon: <FaPhone size={13} />, type: 'tel' },
                    { label: 'Location', key: 'location', icon: <FaMapMarkerAlt size={13} /> }
                  ].map(field => (
                    <div key={field.key}>
                      <label className="text-xs text-gray-500 mb-1 block">{field.label}</label>
                      {editMode ? (
                        <input
                          type={field.type || 'text'}
                          value={form[field.key]}
                          onChange={e => setForm(p => ({ ...p, [field.key]: e.target.value }))}
                          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-rose-400 outline-none"
                        />
                      ) : (
                        <div className="flex items-center gap-2 text-sm text-gray-800 py-2.5 px-4 bg-gray-50 rounded-xl">
                          <span className="text-gray-400">{field.icon}</span>
                          {form[field.key]}
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="sm:col-span-2">
                    <label className="text-xs text-gray-500 mb-1 block">About you</label>
                    {editMode ? (
                      <textarea
                        value={form.bio}
                        onChange={e => setForm(p => ({ ...p, bio: e.target.value }))}
                        rows={3}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-rose-400 outline-none resize-none"
                      />
                    ) : (
                      <div className="text-sm text-gray-800 py-2.5 px-4 bg-gray-50 rounded-xl">{form.bio}</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick access</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { href: '/staybnb/trips', icon: <FaHome className="text-rose-500 text-xl" />, label: 'My Trips', sub: `${mockUser.tripsCompleted} completed` },
                    { href: '/staybnb/favorites', icon: <FaHeart className="text-rose-500 text-xl" />, label: 'Saved', sub: 'Wishlisted properties' },
                    { href: '/staybnb/host', icon: <FaStar className="text-rose-500 text-xl" />, label: 'Become a Host', sub: 'Earn extra income' }
                  ].map(item => (
                    <Link key={item.href} href={item.href} className="flex flex-col items-center p-4 border border-gray-200 rounded-xl hover:border-rose-300 hover:shadow-sm transition-all text-center">
                      {item.icon}
                      <p className="font-medium text-gray-900 text-sm mt-2">{item.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.sub}</p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Security */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Security</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Password', value: '••••••••••', action: 'Update' },
                    { label: 'Two-factor authentication', value: 'Not enabled', action: 'Enable' }
                  ].map(item => (
                    <div key={item.label} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.label}</p>
                        <p className="text-xs text-gray-500">{item.value}</p>
                      </div>
                      <button className="text-sm text-rose-500 hover:text-rose-600 font-medium">{item.action}</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="bg-white border-t border-gray-200 py-8 text-center text-sm text-gray-500 mt-8">
          <div className="flex justify-center gap-6">
            <Link href="/staybnb" className="hover:text-rose-500">Home</Link>
            <Link href="/staybnb/trips" className="hover:text-rose-500">Trips</Link>
            <Link href="/staybnb/favorites" className="hover:text-rose-500">Saved</Link>
          </div>
          <p className="mt-3">© 2024 StayBnB, Inc.</p>
        </footer>
      </div>
    </>
  );
};

export default AccountPage;
