import { useState } from 'react';
import Link from 'next/link';
import { FaPlane, FaClock, FaArrowRight, FaInfoCircle, FaWifi, FaUtensils, FaLuggageCart, FaAngleDown, FaAngleUp } from 'react-icons/fa';

const FlightCard = ({ flight }) => {
  const [expanded, setExpanded] = useState(false);

  const formatTime = (time) => {
    return time;
  };

  const formatDuration = (duration) => {
    // Convert Chinese duration format to English
    return duration.replace('小时', 'h ').replace('分', 'm');
  };

  const formatLayoverDuration = (duration) => {
    // Convert Chinese layover duration format to English
    return duration.replace('小时', 'h ').replace('分钟', 'm');
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4 hover:shadow-lg transition-shadow duration-300">
      {/* Return Flight Indicator */}
      {flight.isReturnFlight && (
        <div className="bg-blue-100 text-blue-800 px-4 py-2 text-sm font-medium">
          ✈️ Return Flight
        </div>
      )}
      {/* Main Flight Info */}
      <div className="p-4">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Airline Info */}
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center mr-3">
              {flight.airlineCode}
            </div>
            <div>
              <div className="font-medium">{flight.airlineName}</div>
              <div className="text-sm text-gray-500">{flight.flightNumber}</div>
            </div>
          </div>
          
          {/* Flight Details */}
          <div className="flex flex-col md:flex-row items-start md:items-center">
            {/* Departure */}
            <div className="text-center mb-3 md:mb-0 md:mr-6">
              <div className="text-xl font-bold">{formatTime(flight.departureTime)}</div>
              <div className="text-gray-600">{flight.originAirportCode}</div>
            </div>
            
            {/* Flight Duration */}
            <div className="flex flex-col items-center mb-3 md:mb-0 md:mx-4">
              <div className="text-xs text-gray-500">{formatDuration(flight.duration)}</div>
              <div className="w-24 md:w-32 h-px bg-gray-300 my-1 relative">
                {flight.stops > 0 && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gray-400 rounded-full" />
                )}
              </div>
              <div className="text-xs text-gray-500">
                {flight.stops === 0 ? 'Direct' : 
                 flight.stops === 1 ? '1 Stop' : 
                 `${flight.stops} Stops`}
              </div>
            </div>
            
            {/* Arrival */}
            <div className="text-center mb-3 md:mb-0 md:ml-6">
              <div className="text-xl font-bold">{formatTime(flight.arrivalTime)}</div>
              <div className="text-gray-600">{flight.destinationAirportCode}</div>
            </div>
          </div>
          
          {/* Price */}
          <div className="flex flex-col items-end">
            <div className="text-2xl font-bold text-booking-blue">¥{flight.price}</div>
            <div className="text-sm text-gray-500">{flight.cabinClass}</div>
          </div>
        </div>
        
        {/* Bottom Actions */}
        <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200">
          <button 
            className="text-booking-blue flex items-center text-sm font-medium"
            onClick={toggleExpand}
          >
            {expanded ? <FaAngleUp className="mr-1" /> : <FaAngleDown className="mr-1" />}
            {expanded ? 'Hide Details' : 'View Details'}
          </button>
          
          <Link 
            href={`/flights/${flight.id}/book`}
            className="btn-primary text-sm py-2 select-button"
          >
            Select
          </Link>
        </div>
      </div>
      
      {/* Expanded Details */}
      {expanded && (
        <div className="bg-gray-50 p-4 border-t border-gray-200">
          {/* Flight Route */}
          <div className="mb-6">
            <h3 className="font-bold mb-3 text-gray-700">Flight Route</h3>
            
            {/* Departure Info */}
            <div className="flex mb-4">
              <div className="mr-4">
                <div className="w-8 h-8 bg-booking-blue rounded-full flex items-center justify-center text-white">
                  <FaPlane size={16} />
                </div>
                <div className="w-px h-full bg-gray-300 ml-4"></div>
              </div>
              <div>
                <div className="font-medium">{formatTime(flight.departureTime)} - {flight.originCity} ({flight.originAirportCode})</div>
                <div className="text-sm text-gray-600">{flight.originAirport}</div>
                <div className="text-sm text-gray-500 mb-6">Departure Date: {flight.departureDate}</div>
                
                <div className="flex items-center text-gray-600 text-sm mb-2">
                  <FaClock className="mr-2" />
                  <span>Flight Time: {formatDuration(flight.duration)}</span>
                </div>
                
                {flight.stops > 0 && flight.stopInfo && (
                  <div className="border-l-2 border-dashed border-gray-300 pl-4 ml-2 my-3">
                    <div className="text-sm font-medium">{flight.stopInfo.airport} - {flight.stopInfo.city}</div>
                    <div className="text-xs text-gray-600">Layover: {formatLayoverDuration(flight.stopInfo.duration)}</div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Arrival Info */}
            <div className="flex">
              <div className="mr-4">
                <div className="w-8 h-8 bg-booking-blue rounded-full flex items-center justify-center text-white">
                  <FaArrowRight size={16} />
                </div>
              </div>
              <div>
                <div className="font-medium">{formatTime(flight.arrivalTime)} - {flight.destinationCity} ({flight.destinationAirportCode})</div>
                <div className="text-sm text-gray-600">{flight.destinationAirport}</div>
                <div className="text-sm text-gray-500">Arrival Date: {flight.arrivalDate}</div>
              </div>
            </div>
          </div>
          
          {/* Flight Details */}
          <div className="mb-6">
            <h3 className="font-bold mb-3 text-gray-700">Flight Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-gray-600">Flight Number</div>
                <div>{flight.airlineName} {flight.flightNumber}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Aircraft</div>
                <div>{flight.aircraft || 'Boeing 737'}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Cabin Class</div>
                <div>{flight.cabinClass}</div>
              </div>
            </div>
          </div>
          
          {/* Amenities */}
          <div>
            <h3 className="font-bold mb-3 text-gray-700">Onboard Services</h3>
            <div className="flex flex-wrap">
              <div className="flex items-center mr-6 mb-2">
                <FaWifi className="text-gray-500 mr-2" />
                <span className="text-sm">Wi-Fi</span>
              </div>
              <div className="flex items-center mr-6 mb-2">
                <FaUtensils className="text-gray-500 mr-2" />
                <span className="text-sm">Meal Service</span>
              </div>
              <div className="flex items-center mr-6 mb-2">
                <FaLuggageCart className="text-gray-500 mr-2" />
                <span className="text-sm">Baggage Allowance 20kg</span>
              </div>
              <div className="flex items-center mr-6 mb-2">
                <FaInfoCircle className="text-gray-500 mr-2" />
                <span className="text-sm">Refundable</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightCard; 