import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { 
  FaMapMarkerAlt, 
  FaClock, 
  FaCalendarAlt, 
  FaTicketAlt, 
  FaHeart, 
  FaShare, 
  FaInfoCircle,
  FaUsers,
  FaMusic,
  FaStar,
  FaArrowLeft
} from 'react-icons/fa';
import MasterTicketHeader from '../../../components/masterticket/MasterTicketHeader';
import SeatMap from '../../../components/masterticket/SeatMap';
import masterTicketDataUtils from '../../../utils/masterTicketData';

const EventDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  
  const [event, setEvent] = useState(null);
  const [venue, setVenue] = useState(null);
  const [artist, setArtist] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [activeTab, setActiveTab] = useState('tickets');
  const [quantity, setQuantity] = useState(1);
  const [selectedTicketType, setSelectedTicketType] = useState(null);
  const [loading, setLoading] = useState(true);

  const {
    getEventById,
    getVenueById,
    getArtistById,
    formatDate,
    formatTime,
    formatPrice,
    calculateFees
  } = masterTicketDataUtils;

  useEffect(() => {
    if (id) {
      const eventData = getEventById(id);
      if (eventData) {
        setEvent(eventData);
        setVenue(getVenueById(eventData.venue));
        if (eventData.artist) {
          setArtist(getArtistById(eventData.artist));
        }
        if (eventData.ticketTypes && eventData.ticketTypes.length > 0) {
          setSelectedTicketType(eventData.ticketTypes[0]);
        }
      }
      setLoading(false);
    }
  }, [id]);

  const handleSeatSelect = (seatInfo) => {
    setSelectedSeats([seatInfo]);
    setSelectedTicketType({
      id: seatInfo.section,
      name: seatInfo.sectionName,
      price: seatInfo.price,
      available: 999 // Assume available for demo
    });
    setQuantity(seatInfo.quantity);
  };

  const handleTicketTypeSelect = (ticketType) => {
    setSelectedTicketType(ticketType);
    setSelectedSeats([]);
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= 8) {
      setQuantity(newQuantity);
      if (selectedSeats.length > 0) {
        const updatedSeats = selectedSeats.map(seat => ({
          ...seat,
          quantity: newQuantity
        }));
        setSelectedSeats(updatedSeats);
      }
    }
  };

  const handleProceedToCheckout = () => {
    if (!selectedTicketType) {
      alert('Please select a ticket type');
      return;
    }

    const ticketData = {
      eventId: event.id,
      eventTitle: event.title,
      date: event.date,
      time: event.time,
      venue: event.venueName,
      ticketType: selectedTicketType,
      quantity: quantity,
      seats: selectedSeats
    };

    // Store in sessionStorage for checkout page
    sessionStorage.setItem('ticketPurchase', JSON.stringify(ticketData));
    
    // Navigate to checkout
    router.push('/masterticket/checkout');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <MasterTicketHeader />
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading event details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50">
        <MasterTicketHeader />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h1>
          <p className="text-gray-600 mb-8">The event you're looking for doesn't exist or has been removed.</p>
          <Link href="/masterticket">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = selectedTicketType ? selectedTicketType.price * quantity : 0;
  const fees = calculateFees(selectedTicketType?.price || 0, quantity);

  return (
    <>
      <Head>
        <title>{event.title} - {formatDate(event.date)} | MasterTicket</title>
        <meta name="description" content={`Buy tickets for ${event.title} at ${event.venueName} on ${formatDate(event.date)}. ${event.description}`} />
        <meta httpEquiv="Content-Language" content="en-US" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <MasterTicketHeader />

        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center space-x-2 text-sm">
              <Link href="/masterticket" className="text-blue-600 hover:text-blue-800">Home</Link>
              <span className="text-gray-400">/</span>
              <Link href="/masterticket/search" className="text-blue-600 hover:text-blue-800">Events</Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600">{event.title}</span>
            </div>
          </div>
        </div>

        {/* Event Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Event Image */}
              <div className="lg:w-1/3">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-64 lg:h-80 object-cover rounded-lg shadow-md"
                />
              </div>

              {/* Event Info */}
              <div className="lg:w-2/3">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                      {event.title}
                    </h1>
                    {artist && (
                      <p className="text-xl text-blue-600 font-medium mb-4">
                        {artist.name}
                      </p>
                    )}
                    {event.teamHome && event.teamAway && (
                      <p className="text-xl text-gray-700 font-medium mb-4">
                        {event.teamHome} vs {event.teamAway}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <FaHeart className="text-gray-600" />
                    </button>
                    <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <FaShare className="text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Event Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <FaCalendarAlt className="text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900">{formatDate(event.date)}</p>
                        <p className="text-sm text-gray-600">{formatTime(event.time)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <FaMapMarkerAlt className="text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900">{event.venueName}</p>
                        <p className="text-sm text-gray-600">{event.city}, {event.state}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {event.duration && (
                      <div className="flex items-center space-x-3">
                        <FaClock className="text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-900">Duration</p>
                          <p className="text-sm text-gray-600">{event.duration}</p>
                        </div>
                      </div>
                    )}
                    
                    {event.ageRestriction && (
                      <div className="flex items-center space-x-3">
                        <FaUsers className="text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-900">Age Restriction</p>
                          <p className="text-sm text-gray-600">{event.ageRestriction}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Purchase */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-800 font-medium">Tickets starting at</p>
                      <p className="text-2xl font-bold text-blue-900">{formatPrice(event.basePrice)}</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('tickets')}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Get Tickets
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white border-b sticky top-20 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8">
              {[
                { id: 'tickets', name: 'Tickets', icon: FaTicketAlt },
                { id: 'details', name: 'Event Details', icon: FaInfoCircle },
                { id: 'venue', name: 'Venue Info', icon: FaMapMarkerAlt }
              ].map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 border-b-2 font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    <IconComponent />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'tickets' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Ticket Selection */}
              <div className="lg:col-span-2 space-y-6">
                {/* Seat Map */}
                <SeatMap 
                  event={event} 
                  onSeatSelect={handleSeatSelect}
                  selectedSeats={selectedSeats}
                />

                {/* Ticket Types */}
                {event.ticketTypes && event.ticketTypes.length > 0 && (
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Select Ticket Type</h3>
                    <div className="space-y-3">
                      {event.ticketTypes.map((ticketType) => (
                        <div
                          key={ticketType.id}
                          onClick={() => handleTicketTypeSelect(ticketType)}
                          className={`
                            border-2 rounded-lg p-4 cursor-pointer transition-all
                            ${selectedTicketType?.id === ticketType.id
                              ? 'border-blue-600 bg-blue-50'
                              : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                            }
                            ${ticketType.available === 0 ? 'opacity-50 cursor-not-allowed' : ''}
                          `}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold text-gray-900">{ticketType.name}</h4>
                              <p className="text-sm text-gray-600">
                                {ticketType.available > 0 
                                  ? `${ticketType.available} tickets available`
                                  : 'Sold out'
                                }
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-blue-600">
                                {formatPrice(ticketType.price)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Purchase Summary */}
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-lg p-6 sticky top-32">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Purchase Summary</h3>
                  
                  {selectedTicketType ? (
                    <>
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Ticket Type:</span>
                          <span className="font-medium">{selectedTicketType.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Price per ticket:</span>
                          <span className="font-medium">{formatPrice(selectedTicketType.price)}</span>
                        </div>
                      </div>

                      {/* Quantity Selector */}
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Quantity (max 8)
                        </label>
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => handleQuantityChange(quantity - 1)}
                            className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                            disabled={quantity <= 1}
                          >
                            -
                          </button>
                          <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(quantity + 1)}
                            className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                            disabled={quantity >= 8 || quantity >= selectedTicketType.available}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Price Breakdown */}
                      <div className="space-y-2 mb-6 pb-4 border-b border-gray-200">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Subtotal:</span>
                          <span>{formatPrice(fees.subtotal)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Service Fee:</span>
                          <span>{formatPrice(fees.serviceFee)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Processing Fee:</span>
                          <span>{formatPrice(fees.processingFee)}</span>
                        </div>
                      </div>

                      <div className="flex justify-between text-lg font-bold mb-6">
                        <span>Total:</span>
                        <span className="text-blue-600">{formatPrice(fees.total)}</span>
                      </div>

                      <button
                        onClick={handleProceedToCheckout}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                        disabled={selectedTicketType.available === 0}
                      >
                        Proceed to Checkout
                      </button>

                      <p className="text-xs text-gray-500 text-center mt-3">
                        Tickets will be held for 10 minutes during checkout
                      </p>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <FaTicketAlt className="mx-auto text-gray-400 text-3xl mb-4" />
                      <p className="text-gray-600">Select a ticket type to continue</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'details' && (
            <div className="max-w-4xl space-y-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">About This Event</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">{event.description}</p>
                
                {event.highlights && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Event Highlights</h4>
                    <ul className="space-y-2">
                      {event.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <FaStar className="text-yellow-500 text-sm" />
                          <span className="text-gray-700">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {artist && (
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">About {artist.name}</h3>
                  <div className="flex items-start space-x-4">
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-gray-700 mb-2">{artist.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>Genre: {artist.genre}</span>
                        <span>Followers: {(artist.followers / 1000000).toFixed(1)}M</span>
                        {artist.verified && (
                          <span className="flex items-center space-x-1 text-blue-600">
                            <span>✓ Verified</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'venue' && venue && (
            <div className="max-w-4xl space-y-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{venue.name}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <img
                      src={venue.image}
                      alt={venue.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  <div className="space-y-4">
                    <p className="text-gray-700">{venue.description}</p>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Venue Details</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p><strong>Address:</strong> {venue.address}</p>
                        <p><strong>Capacity:</strong> {venue.capacity.toLocaleString()}</p>
                        <p><strong>Type:</strong> {venue.type}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {venue.amenities && (
                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Amenities</h4>
                    <div className="flex flex-wrap gap-2">
                      {venue.amenities.map((amenity, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EventDetailPage;
