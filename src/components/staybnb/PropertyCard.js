import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaHeart, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { formatCurrency } from '../../utils/staybnbData';

const PropertyCard = ({ property, showHost = false }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(property.isFavorite || false);

  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    // In a real app, this would make an API call to save the favorite status
  };

  const formatLocation = () => {
    return `${property.location.city}, ${property.location.state || property.location.country}`;
  };

  return (
    <Link href={`/staybnb/property/${property.id}`} className="block group">
      <div className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-200">
        {/* Image Carousel */}
        <div className="relative aspect-square overflow-hidden bg-gray-200">
          <img
            src={property.images[currentImageIndex]}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
          
          {/* Favorite Button */}
          <button
            onClick={toggleFavorite}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors group"
          >
            <FaHeart 
              className={`h-4 w-4 ${
                isFavorite ? 'text-rose-500 fill-current' : 'text-gray-600'
              }`} 
            />
          </button>

          {/* Navigation Arrows */}
          {property.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors opacity-0 group-hover:opacity-100 duration-200"
              >
                <FaChevronLeft className="h-3 w-3 text-gray-700" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors opacity-0 group-hover:opacity-100 duration-200"
              >
                <FaChevronRight className="h-3 w-3 text-gray-700" />
              </button>
            </>
          )}

          {/* Image Indicators */}
          {property.images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1">
              {property.images.map((_, index) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Property Type Badge */}
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 bg-black/60 text-white text-xs font-medium rounded">
              {property.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </span>
          </div>

          {/* New Listing Badge */}
          {property.isNewListing && (
            <div className="absolute bottom-3 left-3">
              <span className="px-2 py-1 bg-rose-500 text-white text-xs font-medium rounded">
                New
              </span>
            </div>
          )}
        </div>

        {/* Property Details */}
        <div className="p-4">
          {/* Location and Rating */}
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-medium text-gray-900 truncate">
              {formatLocation()}
            </h3>
            <div className="flex items-center space-x-1 flex-shrink-0">
              <FaStar className="h-3 w-3 text-gray-900 fill-current" />
              <span className="text-sm font-medium text-gray-900">
                {property.rating}
              </span>
              {property.reviewCount > 0 && (
                <span className="text-sm text-gray-500">
                  ({property.reviewCount})
                </span>
              )}
            </div>
          </div>

          {/* Property Title */}
          <p className="text-gray-600 text-sm mb-2 overflow-hidden" style={{display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'}}>
            {property.shortDescription || property.title}
          </p>

          {/* Dates or Host */}
          {showHost ? (
            <p className="text-gray-500 text-sm mb-2">
              Hosted by {property.hostId}
            </p>
          ) : (
            <p className="text-gray-500 text-sm mb-2">
              Available now
            </p>
          )}

          {/* Property Details */}
          <div className="flex items-center space-x-1 text-gray-500 text-sm mb-3">
            <span>{property.maxGuests} guest{property.maxGuests !== 1 ? 's' : ''}</span>
            <span>·</span>
            <span>
              {property.bedrooms > 0 ? `${property.bedrooms} bedroom${property.bedrooms !== 1 ? 's' : ''}` : 'Studio'}
            </span>
            <span>·</span>
            <span>{property.bathrooms} bath{property.bathrooms !== 1 ? 's' : ''}</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline space-x-1">
            <span className="text-lg font-semibold text-gray-900">
              {formatCurrency(property.pricePerNight)}
            </span>
            <span className="text-gray-500 text-sm">/ night</span>
          </div>

          {/* Instant Book */}
          {property.availability?.instantBook && (
            <div className="mt-2">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                ⚡ Instant Book
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
