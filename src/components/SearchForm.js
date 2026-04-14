import { useState } from 'react';
import { useRouter } from 'next/router';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaPlane, FaExchangeAlt, FaCalendarAlt, FaUser } from 'react-icons/fa';
import { airports } from '../utils/flightData';
import { FIXED_AVAILABLE_DATES } from '../data/staticFlightData';

const SearchForm = () => {
  const router = useRouter();
  const [tripType, setTripType] = useState('round');
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  // Use fixed dates for reproducible tasks
  const [departDate, setDepartDate] = useState(new Date('2024-03-15'));
  const [returnDate, setReturnDate] = useState(new Date('2024-03-22'));
  const [passengers, setPassengers] = useState({ adults: 1, children: 0, infants: 0 });
  const [cabinClass, setCabinClass] = useState('economy');
  const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);

  const handleSwapCities = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  // Format date as YYYY-MM-DD in local timezone to avoid timezone issues
  const formatLocalDate = (date) => {
    if (!date) return null;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchParams = {
      tripType,
      from: fromCity,
      to: toCity,
      depart: formatLocalDate(departDate),
      return: returnDate ? formatLocalDate(returnDate) : null,
      adults: passengers.adults,
      children: passengers.children,
      infants: passengers.infants,
      cabin: cabinClass
    };
    
    router.push({
      pathname: '/flights/search',
      query: searchParams
    });
  };

  const totalPassengers = passengers.adults + passengers.children + passengers.infants;

  // Fixed date filtering function - only allow dates from our fixed list
  const isDateAvailable = (date) => {
    const dateString = date.toISOString().split('T')[0];
    return FIXED_AVAILABLE_DATES.includes(dateString);
  };

  // Use airport information from static data
  const originCities = airports.origins.map(airport => 
    `${airport.city} (${airport.code})`
  );
  
  const destinationCities = airports.destinations.map(airport => 
    `${airport.city} (${airport.code})`
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex flex-wrap mb-4">
        <div className="flex mr-6 mb-2">
          <label className="inline-flex items-center mr-4">
            <input
              type="radio"
              className="form-radio text-booking-blue"
              name="tripType"
              value="round"
              checked={tripType === 'round'}
              onChange={() => setTripType('round')}
            />
            <span className="ml-2">Round Trip</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio text-booking-blue"
              name="tripType"
              value="oneway"
              checked={tripType === 'oneway'}
              onChange={() => setTripType('oneway')}
            />
            <span className="ml-2">One Way</span>
          </label>
        </div>
      </div>

      <form onSubmit={handleSearch} data-testid="search-form">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Origin</label>
            <div className="relative">
              <input
                list="fromCities"
                type="text"
                name="origin"
                className="input-field pl-[60px]"
                placeholder="From"
                value={fromCity}
                onChange={(e) => setFromCity(e.target.value)}
                required
              />
              <FaPlane className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <datalist id="fromCities">
                {originCities.map((city, idx) => (
                  <option key={`from-${idx}`} value={city} />
                ))}
              </datalist>
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
            <div className="relative">
              <input
                list="toCities"
                type="text"
                name="destination"
                className="input-field pl-10"
                placeholder="To"
                value={toCity}
                onChange={(e) => setToCity(e.target.value)}
                required
              />
              <FaPlane className="absolute left-3 top-1/2 transform -translate-y-1/2 rotate-90 text-gray-400" />
              <button
                type="button"
                className="absolute right-12 top-1/2 transform -translate-y-1/2 bg-booking-light-bg p-2 rounded-full"
                onClick={handleSwapCities}
              >
                <FaExchangeAlt className="text-booking-blue" />
              </button>
              <datalist id="toCities">
                {destinationCities.map((city, idx) => (
                  <option key={`to-${idx}`} value={city} />
                ))}
              </datalist>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Departure Date</label>
            <div className="relative">
              <DatePicker
                selected={departDate}
                onChange={date => setDepartDate(date)}
                filterDate={isDateAvailable}
                minDate={new Date('2024-03-15')}
                maxDate={new Date('2024-06-12')}
                className="input-field pl-10"
                dateFormat="yyyy-MM-dd"
                name="departureDate"
                required
                placeholderText="Select departure date"
              />
              <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {tripType === 'round' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Return Date</label>
              <div className="relative">
                <DatePicker
                  selected={returnDate}
                  onChange={date => setReturnDate(date)}
                  filterDate={isDateAvailable}
                  minDate={departDate}
                  maxDate={new Date('2024-06-12')}
                  className="input-field pl-10"
                  dateFormat="yyyy-MM-dd"
                  required={tripType === 'round'}
                  placeholderText="Select return date"
                />
                <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Passengers & Cabin</label>
            <div className="relative">
              <button
                type="button"
                className="input-field pl-10 text-left"
                onClick={() => setShowPassengerDropdown(!showPassengerDropdown)}
              >
                {totalPassengers} Passenger(s), {cabinClass === 'economy' ? 'Economy' : 
                  cabinClass === 'premium' ? 'Premium Economy' : 
                  cabinClass === 'business' ? 'Business' : 'First Class'}
              </button>
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              
              {showPassengerDropdown && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 p-4">
                  <div className="mb-4">
                    <div className="font-medium mb-2">Passengers</div>
                    
                    <div className="flex justify-between items-center mb-2">
                      <label>Adults</label>
                      <div className="flex items-center">
                        <button
                          type="button"
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md"
                          onClick={() => setPassengers({...passengers, adults: Math.max(1, passengers.adults - 1)})}
                        >
                          -
                        </button>
                        <span className="mx-2 w-6 text-center">{passengers.adults}</span>
                        <button
                          type="button"
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md"
                          onClick={() => setPassengers({...passengers, adults: Math.min(9, passengers.adults + 1)})}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mb-2">
                      <label>Children (2-11 years)</label>
                      <div className="flex items-center">
                        <button
                          type="button"
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md"
                          onClick={() => setPassengers({...passengers, children: Math.max(0, passengers.children - 1)})}
                        >
                          -
                        </button>
                        <span className="mx-2 w-6 text-center">{passengers.children}</span>
                        <button
                          type="button"
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md"
                          onClick={() => setPassengers({...passengers, children: Math.min(6, passengers.children + 1)})}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <label>Infants (0-2 years)</label>
                      <div className="flex items-center">
                        <button
                          type="button"
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md"
                          onClick={() => setPassengers({...passengers, infants: Math.max(0, passengers.infants - 1)})}
                        >
                          -
                        </button>
                        <span className="mx-2 w-6 text-center">{passengers.infants}</span>
                        <button
                          type="button"
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md"
                          onClick={() => setPassengers({...passengers, infants: Math.min(passengers.adults, passengers.infants + 1)})}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="font-medium mb-2">Cabin Class</div>
                    <div className="grid grid-cols-2 gap-2">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          className="form-radio text-booking-blue"
                          name="cabinClass"
                          value="economy"
                          checked={cabinClass === 'economy'}
                          onChange={() => setCabinClass('economy')}
                        />
                        <span className="ml-2">Economy</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          className="form-radio text-booking-blue"
                          name="cabinClass"
                          value="premium"
                          checked={cabinClass === 'premium'}
                          onChange={() => setCabinClass('premium')}
                        />
                        <span className="ml-2">Premium Economy</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          className="form-radio text-booking-blue"
                          name="cabinClass"
                          value="business"
                          checked={cabinClass === 'business'}
                          onChange={() => setCabinClass('business')}
                        />
                        <span className="ml-2">Business</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          className="form-radio text-booking-blue"
                          name="cabinClass"
                          value="first"
                          checked={cabinClass === 'first'}
                          onChange={() => setCabinClass('first')}
                        />
                        <span className="ml-2">First Class</span>
                      </label>
                    </div>
                  </div>
                  
                  <button
                    type="button"
                    className="btn-primary w-full mt-4"
                    onClick={() => setShowPassengerDropdown(false)}
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-end">
            <button type="submit" className="btn-primary w-full md:w-auto search-button">
              Search Flights
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchForm; 