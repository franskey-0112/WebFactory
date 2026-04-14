import { useState, useEffect } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { FaFilter } from 'react-icons/fa';
import { airlines, cabinClasses } from '../utils/flightData';

const FlightFilters = ({ onFilterChange, maxPrice = 10000 }) => {
  // Initialize selectedAirlines, all airlines selected by default
  const initialSelectedAirlines = Object.fromEntries(
    airlines.map(airline => [airline.code, true])
  );

  const [priceRange, setPriceRange] = useState([0, maxPrice]);
  const [stopOptions, setStopOptions] = useState({ direct: true, oneStop: true, multiStop: true });
  const [timeOptions, setTimeOptions] = useState({
    departureTime: {
      earlyMorning: true, // 00:00 - 06:00
      morning: true,      // 06:00 - 12:00
      afternoon: true,    // 12:00 - 18:00
      evening: true       // 18:00 - 24:00
    },
    arrivalTime: {
      earlyMorning: true,
      morning: true,
      afternoon: true,
      evening: true
    }
  });
  const [selectedAirlines, setSelectedAirlines] = useState(initialSelectedAirlines);
  const [cabinClass, setCabinClass] = useState('all');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Update price range when max price changes
  useEffect(() => {
    setPriceRange([0, maxPrice]);
  }, [maxPrice]);

  const handlePriceChange = (newRange) => {
    setPriceRange(newRange);
    applyFilters({ priceRange: newRange });
  };

  const handleStopOptionsChange = (option) => {
    const newStopOptions = { ...stopOptions, [option]: !stopOptions[option] };
    setStopOptions(newStopOptions);
    applyFilters({ stopOptions: newStopOptions });
  };

  const handleTimeOptionsChange = (timeType, option) => {
    const newTimeOptions = { 
      ...timeOptions,
      [timeType]: {
        ...timeOptions[timeType],
        [option]: !timeOptions[timeType][option]
      }
    };
    setTimeOptions(newTimeOptions);
    applyFilters({ timeOptions: newTimeOptions });
  };

  const handleAirlineChange = (airline) => {
    const newSelectedAirlines = { ...selectedAirlines, [airline]: !selectedAirlines[airline] };
    setSelectedAirlines(newSelectedAirlines);
    applyFilters({ selectedAirlines: newSelectedAirlines });
  };

  const handleCabinClassChange = (newClass) => {
    setCabinClass(newClass);
    applyFilters({ cabinClass: newClass });
  };

  // Select or deselect all airlines
  const handleSelectAllAirlines = (selectAll) => {
    const newSelectedAirlines = Object.fromEntries(
      airlines.map(airline => [airline.code, selectAll])
    );
    setSelectedAirlines(newSelectedAirlines);
    applyFilters({ selectedAirlines: newSelectedAirlines });
  };

  const applyFilters = (changedFilters) => {
    const currentFilters = {
      priceRange,
      stopOptions,
      timeOptions,
      selectedAirlines,
      cabinClass,
      ...changedFilters
    };
    
    onFilterChange && onFilterChange(currentFilters);
  };

  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };

  // Calculate selected airlines count
  const selectedAirlinesCount = Object.values(selectedAirlines).filter(Boolean).length;
  const allAirlinesSelected = selectedAirlinesCount === airlines.length;
  const noAirlinesSelected = selectedAirlinesCount === 0;

  return (
    <>
      {/* Mobile Filter Toggle Button */}
      <div className="block md:hidden mb-4">
        <button 
          className="w-full py-2 px-4 bg-booking-blue text-white rounded-md flex items-center justify-center"
          onClick={toggleMobileFilters}
        >
          <FaFilter className="mr-2" />
          {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {/* Filter Container */}
      <div className={`${showMobileFilters ? 'block' : 'hidden'} md:block`}>
        {/* Price Range Filter */}
        <div className="bg-white p-4 rounded-md shadow-md mb-4">
          <h3 className="font-bold text-lg mb-4">Price Range</h3>
          <div className="px-2">
            <Slider
              range
              min={0}
              max={maxPrice}
              value={priceRange}
              onChange={handlePriceChange}
              trackStyle={[{ backgroundColor: '#006ce4' }]}
              handleStyle={[
                { borderColor: '#006ce4', backgroundColor: '#006ce4' },
                { borderColor: '#006ce4', backgroundColor: '#006ce4' }
              ]}
              railStyle={{ backgroundColor: '#e4e4e4' }}
            />
            <div className="flex justify-between mt-2">
              <span>¥{priceRange[0]}</span>
              <span>¥{priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Stops Filter */}
        <div className="bg-white p-4 rounded-md shadow-md mb-4">
          <h3 className="font-bold text-lg mb-4">Stops</h3>
          <div className="space-y-2">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-booking-blue"
                checked={stopOptions.direct}
                onChange={() => handleStopOptionsChange('direct')}
              />
              <span className="ml-2">Direct</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-booking-blue"
                checked={stopOptions.oneStop}
                onChange={() => handleStopOptionsChange('oneStop')}
              />
              <span className="ml-2">1 Stop</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-booking-blue"
                checked={stopOptions.multiStop}
                onChange={() => handleStopOptionsChange('multiStop')}
              />
              <span className="ml-2">2+ Stops</span>
            </label>
          </div>
        </div>

        {/* Departure Time Filter */}
        <div className="bg-white p-4 rounded-md shadow-md mb-4">
          <h3 className="font-bold text-lg mb-4">Departure Time</h3>
          <div className="space-y-2">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-booking-blue"
                checked={timeOptions.departureTime.earlyMorning}
                onChange={() => handleTimeOptionsChange('departureTime', 'earlyMorning')}
              />
              <span className="ml-2">Early Morning (00:00 - 06:00)</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-booking-blue"
                checked={timeOptions.departureTime.morning}
                onChange={() => handleTimeOptionsChange('departureTime', 'morning')}
              />
              <span className="ml-2">Morning (06:00 - 12:00)</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-booking-blue"
                checked={timeOptions.departureTime.afternoon}
                onChange={() => handleTimeOptionsChange('departureTime', 'afternoon')}
              />
              <span className="ml-2">Afternoon (12:00 - 18:00)</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-booking-blue"
                checked={timeOptions.departureTime.evening}
                onChange={() => handleTimeOptionsChange('departureTime', 'evening')}
              />
              <span className="ml-2">Evening (18:00 - 24:00)</span>
            </label>
          </div>
        </div>

        {/* Arrival Time Filter */}
        <div className="bg-white p-4 rounded-md shadow-md mb-4">
          <h3 className="font-bold text-lg mb-4">Arrival Time</h3>
          <div className="space-y-2">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-booking-blue"
                checked={timeOptions.arrivalTime.earlyMorning}
                onChange={() => handleTimeOptionsChange('arrivalTime', 'earlyMorning')}
              />
              <span className="ml-2">Early Morning (00:00 - 06:00)</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-booking-blue"
                checked={timeOptions.arrivalTime.morning}
                onChange={() => handleTimeOptionsChange('arrivalTime', 'morning')}
              />
              <span className="ml-2">Morning (06:00 - 12:00)</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-booking-blue"
                checked={timeOptions.arrivalTime.afternoon}
                onChange={() => handleTimeOptionsChange('arrivalTime', 'afternoon')}
              />
              <span className="ml-2">Afternoon (12:00 - 18:00)</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-booking-blue"
                checked={timeOptions.arrivalTime.evening}
                onChange={() => handleTimeOptionsChange('arrivalTime', 'evening')}
              />
              <span className="ml-2">Evening (18:00 - 24:00)</span>
            </label>
          </div>
        </div>

        {/* Airlines Filter */}
        <div className="bg-white p-4 rounded-md shadow-md mb-4">
          <h3 className="font-bold text-lg mb-4">Airlines</h3>
          <div className="mb-2 flex justify-between">
            <button 
              className={`text-sm ${allAirlinesSelected ? 'text-gray-400' : 'text-booking-blue'}`}
              onClick={() => handleSelectAllAirlines(true)}
              disabled={allAirlinesSelected}
            >
              Select All
            </button>
            <button 
              className={`text-sm ${noAirlinesSelected ? 'text-gray-400' : 'text-booking-blue'}`}
              onClick={() => handleSelectAllAirlines(false)}
              disabled={noAirlinesSelected}
            >
              Clear
            </button>
          </div>
          <div className="space-y-2">
            {airlines.map(airline => (
              <label key={airline.code} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-booking-blue"
                  checked={selectedAirlines[airline.code]}
                  onChange={() => handleAirlineChange(airline.code)}
                />
                <span className="ml-2">{airline.name} ({airline.code})</span>
              </label>
            ))}
          </div>
        </div>

        {/* Cabin Class Filter */}
        <div className="bg-white p-4 rounded-md shadow-md mb-4">
          <h3 className="font-bold text-lg mb-4">Cabin Class</h3>
          <div className="space-y-2">
            {cabinClasses.map(cabinClassOption => (
              <label key={cabinClassOption.value} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  className="form-radio h-5 w-5 text-booking-blue"
                  name="cabinClass"
                  value={cabinClassOption.value}
                  checked={cabinClass === cabinClassOption.value}
                  onChange={() => handleCabinClassChange(cabinClassOption.value)}
                />
                <span className="ml-2">{cabinClassOption.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FlightFilters;