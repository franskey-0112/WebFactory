import { FaPlane, FaClock, FaArrowRight, FaSuitcase, FaUtensils, FaWifi } from 'react-icons/fa';

const FlightDetails = ({ flight }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center mr-3">
            {flight.airlineCode}
          </div>
          <div>
            <div className="font-medium">{flight.airlineName}</div>
            <div className="text-sm text-gray-500">{flight.flightNumber}</div>
          </div>
        </div>
        <div>
          <span className="bg-booking-blue text-white text-xs font-bold py-1 px-2 rounded">Confirmed</span>
        </div>
      </div>

      {/* Flight Route */}
      <div className="mb-6">
        <h3 className="font-bold mb-4 text-gray-700">Flight Route</h3>
        
        {/* Departure Info */}
        <div className="flex mb-4">
          <div className="mr-4">
            <div className="w-8 h-8 bg-booking-blue rounded-full flex items-center justify-center text-white">
              <FaPlane size={16} />
            </div>
            <div className="w-px h-full bg-gray-300 ml-4"></div>
          </div>
          <div>
            <div className="font-medium">{flight.departureTime} - {flight.originCity} ({flight.originAirportCode})</div>
            <div className="text-sm text-gray-600">{flight.originAirport}</div>
            <div className="text-sm text-gray-500 mb-6">Departure Date: {flight.departureDate}</div>
            
            <div className="flex items-center text-gray-600 text-sm mb-2">
              <FaClock className="mr-2" />
              <span>Flight Time: {flight.duration}</span>
            </div>
            
            {flight.stops > 0 && flight.stopInfo && (
              <div className="border-l-2 border-dashed border-gray-300 pl-4 ml-2 my-3">
                <div className="text-sm font-medium">{flight.stopInfo.airport} - {flight.stopInfo.city}</div>
                <div className="text-xs text-gray-600">Layover: {flight.stopInfo.duration}</div>
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
            <div className="font-medium">{flight.arrivalTime} - {flight.destinationCity} ({flight.destinationAirportCode})</div>
            <div className="text-sm text-gray-600">{flight.destinationAirport}</div>
            <div className="text-sm text-gray-500">Arrival Date: {flight.arrivalDate}</div>
          </div>
        </div>
      </div>
      
      {/* Fare Details */}
      <div className="mb-6">
        <h3 className="font-bold mb-4 text-gray-700">Fare Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-600">Cabin</div>
            <div>{flight.cabinClass}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Fare Type</div>
            <div>Standard Fare</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Refund Policy</div>
            <div className="text-sm text-green-600">Refundable</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Change Policy</div>
            <div className="text-sm text-green-600">Changes allowed with fee</div>
          </div>
        </div>
      </div>
      
      {/* Services */}
      <div>
        <h3 className="font-bold mb-4 text-gray-700">Included Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center">
            <FaSuitcase className="text-gray-500 mr-2" />
            <div>
              <div className="text-sm">Checked Baggage</div>
              <div className="text-xs text-gray-600">20kg</div>
            </div>
          </div>
          <div className="flex items-center">
            <FaUtensils className="text-gray-500 mr-2" />
            <div>
              <div className="text-sm">Meal Service</div>
              <div className="text-xs text-gray-600">Included</div>
            </div>
          </div>
          <div className="flex items-center">
            <FaWifi className="text-gray-500 mr-2" />
            <div>
              <div className="text-sm">In-flight Wi-Fi</div>
              <div className="text-xs text-gray-600">Available on selected routes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightDetails;