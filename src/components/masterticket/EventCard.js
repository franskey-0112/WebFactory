import React from 'react';
import Link from 'next/link';
import { FaMapMarkerAlt, FaClock, FaTicketAlt, FaHeart } from 'react-icons/fa';
import masterTicketDataUtils from '../../utils/masterTicketData';

const EventCard = ({ event, showFullDetails = false }) => {
  const { formatDate, formatTime, formatPrice } = masterTicketDataUtils;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
      {/* Event Image */}
      <div className="relative overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <button className="bg-white bg-opacity-90 p-2 rounded-full hover:bg-opacity-100 transition-all">
            <FaHeart className="text-gray-600 hover:text-red-500 transition-colors" />
          </button>
        </div>
        
        {/* Status Badge */}
        {event.status === 'on-sale' && (
          <div className="absolute top-3 left-3">
            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              On Sale
            </span>
          </div>
        )}
        
        {event.status === 'sold-out' && (
          <div className="absolute top-3 left-3">
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Event Details */}
      <div className="p-4">
        {/* Date and Time */}
        <div className="flex items-center text-sm text-blue-600 font-medium mb-2">
          <FaClock className="mr-2" />
          <span>{formatDate(event.date)} • {formatTime(event.time)}</span>
        </div>

        {/* Event Title */}
        <Link href={`/masterticket/event/${event.id}`}>
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 cursor-pointer">
            {event.title}
          </h3>
        </Link>

        {/* Artist/Team Info */}
        {event.artistName && (
          <p className="text-gray-600 mb-2 font-medium">{event.artistName}</p>
        )}
        
        {event.teamHome && event.teamAway && (
          <p className="text-gray-600 mb-2 font-medium">
            {event.teamHome} vs {event.teamAway}
          </p>
        )}

        {/* Venue and Location */}
        <div className="flex items-center text-gray-600 mb-3">
          <FaMapMarkerAlt className="mr-2 text-gray-400" />
          <span className="text-sm">
            {event.venueName} • {event.city}, {event.state}
          </span>
        </div>

        {/* Category Badge */}
        <div className="mb-3">
          <span className="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium capitalize">
            {event.category}
          </span>
        </div>

        {/* Additional Info for Full Details */}
        {showFullDetails && (
          <div className="mb-3 space-y-1">
            {event.duration && (
              <p className="text-sm text-gray-600">Duration: {event.duration}</p>
            )}
            {event.ageRestriction && (
              <p className="text-sm text-gray-600">Age: {event.ageRestriction}</p>
            )}
            {event.sport && (
              <p className="text-sm text-gray-600">Sport: {event.sport} ({event.league})</p>
            )}
          </div>
        )}

        {/* Pricing and CTA */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-gray-500">Starting at</span>
            <div className="text-xl font-bold text-green-600">
              {formatPrice(event.basePrice)}
            </div>
          </div>
          
          <Link href={`/masterticket/event/${event.id}`}>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-1">
              <FaTicketAlt />
              <span>Get Tickets</span>
            </button>
          </Link>
        </div>

        {/* Ticket Availability */}
        {event.ticketTypes && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex flex-wrap gap-1">
              {event.ticketTypes.slice(0, 2).map((ticket) => (
                <span
                  key={ticket.id}
                  className={`text-xs px-2 py-1 rounded ${
                    ticket.available > 0
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {ticket.name}: {ticket.available > 0 ? `${ticket.available} left` : 'Sold out'}
                </span>
              ))}
              {event.ticketTypes.length > 2 && (
                <span className="text-xs text-gray-500">
                  +{event.ticketTypes.length - 2} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;
