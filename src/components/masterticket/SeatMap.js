import React, { useState } from 'react';
import { FaInfoCircle, FaCheck, FaTimes } from 'react-icons/fa';
import masterTicketDataUtils from '../../utils/masterTicketData';

const SeatMap = ({ event, onSeatSelect, selectedSeats = [] }) => {
  const { formatPrice, generateSeatMap } = masterTicketDataUtils;
  const [selectedSection, setSelectedSection] = useState('');
  const [showSectionDetails, setShowSectionDetails] = useState(false);
  
  const seatMap = generateSeatMap(event);
  
  if (!seatMap) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Seat map not available for this event.</p>
      </div>
    );
  }

  const handleSectionClick = (sectionKey, sectionData) => {
    setSelectedSection(sectionKey);
    setShowSectionDetails(true);
    
    // Auto-select first available seat type for quick booking
    if (sectionData.available > 0) {
      onSeatSelect({
        section: sectionKey,
        sectionName: sectionData.name,
        price: sectionData.price,
        quantity: 1
      });
    }
  };

  const getSectionColor = (sectionKey, sectionData) => {
    if (selectedSeats.some(seat => seat.section === sectionKey)) {
      return 'bg-blue-600 hover:bg-blue-700';
    }
    if (sectionData.available === 0) {
      return 'bg-gray-400 cursor-not-allowed';
    }
    if (sectionData.available < 50) {
      return 'bg-red-500 hover:bg-red-600';
    }
    if (sectionData.available < 200) {
      return 'bg-yellow-500 hover:bg-yellow-600';
    }
    return 'bg-green-500 hover:bg-green-600';
  };

  const getAvailabilityText = (available, total) => {
    if (available === 0) return 'Sold Out';
    if (available < 50) return 'Few Left';
    if (available < 200) return 'Limited';
    return 'Available';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Venue Name and Stage */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{event.venueName}</h3>
        <div className="bg-gray-800 text-white px-8 py-2 rounded-lg inline-block mb-4">
          STAGE
        </div>
      </div>

      {/* Interactive Seat Map */}
      <div className="relative bg-gray-50 rounded-lg p-8 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(seatMap).map(([sectionKey, sectionData]) => (
            <div
              key={sectionKey}
              onClick={() => handleSectionClick(sectionKey, sectionData)}
              className={`
                ${getSectionColor(sectionKey, sectionData)}
                text-white p-4 rounded-lg cursor-pointer transition-all duration-200 transform hover:scale-105
                ${sectionData.available === 0 ? 'opacity-50' : ''}
              `}
            >
              <div className="text-center">
                <h4 className="font-bold text-sm mb-1">{sectionData.name}</h4>
                <p className="text-xs opacity-90">{formatPrice(sectionData.price)}</p>
                <p className="text-xs opacity-75 mt-1">
                  {getAvailabilityText(sectionData.available, sectionData.total)}
                </p>
                {sectionData.rows !== 'GA' && (
                  <p className="text-xs opacity-75">
                    Rows {sectionData.rows}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span className="text-sm text-gray-600">Available</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <span className="text-sm text-gray-600">Limited</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span className="text-sm text-gray-600">Few Left</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-600 rounded"></div>
          <span className="text-sm text-gray-600">Selected</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-400 rounded"></div>
          <span className="text-sm text-gray-600">Sold Out</span>
        </div>
      </div>

      {/* Section Details */}
      {showSectionDetails && selectedSection && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-bold text-blue-900 mb-2">
                {seatMap[selectedSection].name} Section
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Price per ticket:</span>
                  <p className="font-semibold text-blue-900">
                    {formatPrice(seatMap[selectedSection].price)}
                  </p>
                </div>
                <div>
                  <span className="text-gray-600">Availability:</span>
                  <p className="font-semibold text-blue-900">
                    {seatMap[selectedSection].available} of {seatMap[selectedSection].total} seats
                  </p>
                </div>
                {seatMap[selectedSection].rows !== 'GA' && (
                  <>
                    <div>
                      <span className="text-gray-600">Rows:</span>
                      <p className="font-semibold text-blue-900">
                        {seatMap[selectedSection].rows}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600">Seats per row:</span>
                      <p className="font-semibold text-blue-900">
                        {seatMap[selectedSection].seats}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
            <button
              onClick={() => setShowSectionDetails(false)}
              className="text-blue-600 hover:text-blue-800"
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}

      {/* Selected Seats Summary */}
      {selectedSeats.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="font-bold text-gray-900 mb-3">Selected Seats</h4>
          <div className="space-y-2">
            {selectedSeats.map((seat, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                <div>
                  <span className="font-medium">{seat.sectionName}</span>
                  <span className="text-gray-600 ml-2">x{seat.quantity}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-blue-600">
                    {formatPrice(seat.price * seat.quantity)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info Notice */}
      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <FaInfoCircle className="text-yellow-600 mt-1 flex-shrink-0" />
          <div className="text-sm text-yellow-800">
            <p className="font-medium mb-1">Important Information:</p>
            <ul className="space-y-1 text-xs">
              <li>• Seat selections are held for 10 minutes during checkout</li>
              <li>• Prices may include facility fees and taxes</li>
              <li>• Best available seats will be automatically assigned within your selected section</li>
              <li>• Mobile tickets will be delivered via email or app</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatMap;
