import React, { useState, useEffect } from 'react';
import { 
  FaFilter, 
  FaChevronDown, 
  FaChevronUp, 
  FaTimes,
  FaStar,
  FaUsers,
  FaCog,
  FaGasPump,
  FaDollarSign
} from 'react-icons/fa';
import { vehicleCategories, vehicles, formatCurrency } from '../../utils/carRentalData';

const VehicleFilters = ({ 
  filters, 
  onFiltersChange, 
  onClearFilters,
  vehicleCount = 0,
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    seats: true,
    transmission: true,
    features: false,
    rating: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFilterChange = (filterType, value, checked = null) => {
    const newFilters = { ...filters };

    switch (filterType) {
      case 'category':
        newFilters.category = value;
        break;
      
      case 'priceRange':
        newFilters.priceRange = value;
        break;
      
      case 'seats':
        newFilters.seats = value;
        break;
      
      case 'transmission':
        newFilters.transmission = value;
        break;
      
      case 'fuelType':
        newFilters.fuelType = value;
        break;
      
      case 'brand':
        newFilters.brand = value;
        break;
      
      case 'minRating':
        newFilters.minRating = value;
        break;
      
      case 'features':
        if (!newFilters.features) newFilters.features = [];
        if (checked) {
          newFilters.features = [...newFilters.features, value];
        } else {
          newFilters.features = newFilters.features.filter(f => f !== value);
        }
        break;
      
      default:
        break;
    }

    onFiltersChange(newFilters);
  };

  // Get available brands from vehicles
  const availableBrands = [...new Set(vehicles.map(v => v.brand))].sort();
  
  // Get price range
  const prices = vehicles.map(v => v.pricing.dailyRate);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  // Common features
  const commonFeatures = [
    'Air conditioning',
    'Automatic transmission',
    'GPS navigation',
    'Bluetooth',
    'Cruise control',
    'Backup camera',
    'Heated seats',
    'Leather seats',
    'Premium audio',
    'Apple CarPlay'
  ];

  const FilterSection = ({ title, isOpen, onToggle, children, icon }) => (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center space-x-2">
          {icon}
          <span className="font-semibold text-gray-900">{title}</span>
        </div>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      {isOpen && (
        <div className="pb-4">
          {children}
        </div>
      )}
    </div>
  );

  const hasActiveFilters = () => {
    return Object.values(filters).some(value => {
      if (Array.isArray(value)) return value.length > 0;
      return value !== null && value !== undefined && value !== '' && value !== 'all';
    });
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg ${className}`}>
      {/* Filter Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FaFilter className="text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
            {vehicleCount > 0 && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
                {vehicleCount} vehicles
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {hasActiveFilters() && (
              <button
                onClick={onClearFilters}
                className="text-sm text-red-600 hover:text-red-800 font-medium"
              >
                Clear all
              </button>
            )}
            
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="lg:hidden p-1 rounded hover:bg-gray-100"
            >
              {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>
        </div>
      </div>

      {/* Filter Content */}
      <div className={`${isExpanded ? 'block' : 'hidden lg:block'}`}>
        <div className="p-4 space-y-0">
          
          {/* Vehicle Category */}
          <FilterSection
            title="Vehicle Category"
            isOpen={expandedSections.category}
            onToggle={() => toggleSection('category')}
            icon={<FaCog className="text-gray-500" />}
          >
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  value="all"
                  checked={!filters.category || filters.category === 'all'}
                  onChange={(e) => handleFilterChange('category', 'all')}
                  className="mr-3 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">All Categories</span>
              </label>
              
              {vehicleCategories.map(category => (
                <label key={category.id} className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    value={category.id}
                    checked={filters.category === category.id}
                    onChange={(e) => handleFilterChange('category', category.id)}
                    className="mr-3 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 flex items-center">
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                  </span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Price Range */}
          <FilterSection
            title="Daily Rate"
            isOpen={expandedSections.price}
            onToggle={() => toggleSection('price')}
            icon={<FaDollarSign className="text-gray-500" />}
          >
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="priceRange"
                  value=""
                  checked={!filters.priceRange}
                  onChange={(e) => handleFilterChange('priceRange', null)}
                  className="mr-3 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Any Price</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="radio"
                  name="priceRange"
                  value="budget"
                  checked={filters.priceRange === 'budget'}
                  onChange={(e) => handleFilterChange('priceRange', { min: 0, max: 50 })}
                  className="mr-3 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Budget (Under $50/day)</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="radio"
                  name="priceRange"
                  value="mid"
                  checked={filters.priceRange === 'mid'}
                  onChange={(e) => handleFilterChange('priceRange', { min: 50, max: 100 })}
                  className="mr-3 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Mid-range ($50-$100/day)</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="radio"
                  name="priceRange"
                  value="premium"
                  checked={filters.priceRange === 'premium'}
                  onChange={(e) => handleFilterChange('priceRange', { min: 100, max: 999 })}
                  className="mr-3 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Premium ($100+/day)</span>
              </label>
            </div>
          </FilterSection>

          {/* Number of Seats */}
          <FilterSection
            title="Number of Seats"
            isOpen={expandedSections.seats}
            onToggle={() => toggleSection('seats')}
            icon={<FaUsers className="text-gray-500" />}
          >
            <div className="space-y-2">
              {[2, 4, 5, 7, 8].map(seatCount => (
                <label key={seatCount} className="flex items-center">
                  <input
                    type="radio"
                    name="seats"
                    value={seatCount}
                    checked={filters.seats === seatCount}
                    onChange={(e) => handleFilterChange('seats', seatCount)}
                    className="mr-3 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    {seatCount}+ seats
                  </span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Transmission */}
          <FilterSection
            title="Transmission"
            isOpen={expandedSections.transmission}
            onToggle={() => toggleSection('transmission')}
            icon={<FaCog className="text-gray-500" />}
          >
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="transmission"
                  value="all"
                  checked={!filters.transmission || filters.transmission === 'all'}
                  onChange={(e) => handleFilterChange('transmission', 'all')}
                  className="mr-3 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Any Transmission</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="radio"
                  name="transmission"
                  value="automatic"
                  checked={filters.transmission === 'automatic'}
                  onChange={(e) => handleFilterChange('transmission', 'automatic')}
                  className="mr-3 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Automatic</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="radio"
                  name="transmission"
                  value="manual"
                  checked={filters.transmission === 'manual'}
                  onChange={(e) => handleFilterChange('transmission', 'manual')}
                  className="mr-3 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Manual</span>
              </label>
            </div>
          </FilterSection>

          {/* Customer Rating */}
          <FilterSection
            title="Customer Rating"
            isOpen={expandedSections.rating}
            onToggle={() => toggleSection('rating')}
            icon={<FaStar className="text-gray-500" />}
          >
            <div className="space-y-2">
              {[4.5, 4.0, 3.5, 3.0].map(rating => (
                <label key={rating} className="flex items-center">
                  <input
                    type="radio"
                    name="rating"
                    value={rating}
                    checked={filters.minRating === rating}
                    onChange={(e) => handleFilterChange('minRating', rating)}
                    className="mr-3 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`text-xs ${
                            i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-700">{rating}+ stars</span>
                  </div>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Features */}
          <FilterSection
            title="Features"
            isOpen={expandedSections.features}
            onToggle={() => toggleSection('features')}
            icon={<FaGasPump className="text-gray-500" />}
          >
            <div className="space-y-2">
              {commonFeatures.map(feature => (
                <label key={feature} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.features && filters.features.includes(feature)}
                    onChange={(e) => handleFilterChange('features', feature, e.target.checked)}
                    className="mr-3 text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <span className="text-sm text-gray-700">{feature}</span>
                </label>
              ))}
            </div>
          </FilterSection>

        </div>
      </div>
    </div>
  );
};

export default VehicleFilters;
