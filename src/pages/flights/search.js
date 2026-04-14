import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FlightFilters from '../../components/FlightFilters';
import FlightCard from '../../components/FlightCard';
import SearchForm from '../../components/SearchForm';
import { flightData, airlines, airports } from '../../utils/flightData';
import { FaExchangeAlt, FaSortAmountDown, FaSortAmountUp, FaFilter } from 'react-icons/fa';

const Flights = () => {
  const router = useRouter();
  const { tripType, from, to, depart, return: returnDate, adults, children, infants, cabin } = router.query;
  
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [maxPrice, setMaxPrice] = useState(30000);
  const [sortOption, setSortOption] = useState('recommended');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [appliedFilters, setAppliedFilters] = useState(null);

  // Load flight data when route parameters change
  useEffect(() => {
    if (!router.isReady) return;
    
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      let initialFlights = [];
      
      // Search for outbound flights
      const outboundFlights = flightData.filter(flight => {
        // Origin filter
        if (from && !matchesAirport(flight.originAirportCode, flight.originCity, from)) {
          return false;
        }
        
        // Destination filter
        if (to && !matchesAirport(flight.destinationAirportCode, flight.destinationCity, to)) {
          return false;
        }
        
        // Date filter (compare date strings)
        if (depart && flight.departureDate !== depart) {
          return false;
        }
        
        // Cabin class filter
        if (cabin && cabin !== 'all') {
          const cabinMapping = {
            'economy': 'Economy',
            'premium': 'Premium Economy',
            'business': 'Business',
            'first': 'First Class'
          };
          if (flight.cabinClass !== cabinMapping[cabin]) {
            return false;
          }
        }
        
        return true;
      });
      
      initialFlights = [...outboundFlights];
      
      // For round trip, also search for return flights
      if (tripType === 'round' && returnDate) {
        const returnFlights = flightData.filter(flight => {
          // Return flights: destination becomes origin, origin becomes destination
          if (to && !matchesAirport(flight.originAirportCode, flight.originCity, to)) {
            return false;
          }
          
          if (from && !matchesAirport(flight.destinationAirportCode, flight.destinationCity, from)) {
            return false;
          }
          
          // Return date filter
          if (flight.departureDate !== returnDate) {
            return false;
          }
          
          // Cabin class filter
          if (cabin && cabin !== 'all') {
            const cabinMapping = {
              'economy': 'Economy',
              'premium': 'Premium Economy',
              'business': 'Business',
              'first': 'First Class'
            };
            if (flight.cabinClass !== cabinMapping[cabin]) {
              return false;
            }
          }
          
          return true;
        });
        
        // Mark return flights for UI distinction
        const markedReturnFlights = returnFlights.map(flight => ({
          ...flight,
          isReturnFlight: true
        }));
        
        initialFlights = [...initialFlights, ...markedReturnFlights];
      }
      
      setFlights(initialFlights);
      setFilteredFlights(initialFlights);
      
      // Find highest price for price filter
      const highestPrice = Math.max(...initialFlights.map(flight => flight.price), 30000);
      setMaxPrice(highestPrice);
      
      setLoading(false);
    }, 1000);
  }, [router.isReady, router.query]);

  // Enhanced airport code or city matching logic
  const matchesAirport = (airportCode, city, query) => {
    if (!query) return true;
    
    // Extract city name and possible airport code from query
    // e.g., "Beijing (PEK)" will extract "Beijing" and "PEK"
    const match = query.match(/^(.*?)(?:\s*\(([A-Z]{3})\))?$/i);
    
    if (match) {
      const cityName = match[1] ? match[1].trim().toLowerCase() : '';
      const code = match[2] ? match[2].trim().toUpperCase() : '';
      
      // Check airport code match
      if (code && airportCode === code) {
        return true;
      }
      
      // Check city name match
      if (cityName && city.toLowerCase().includes(cityName)) {
        return true;
      }
    }
    
    // If no specific format, do simple matching
    const normalizedQuery = query.toLowerCase();
    return airportCode.toLowerCase() === normalizedQuery || 
           city.toLowerCase().includes(normalizedQuery);
  };

  // Handle filter changes
  const handleFilterChange = (filters) => {
    const { priceRange, stopOptions, timeOptions, selectedAirlines, cabinClass } = filters;
    
    // Save applied filters for later use when adding more flights
    setAppliedFilters(filters);
    
    const newFilteredFlights = flights.filter(flight => {
      // Price filter
      if (flight.price < priceRange[0] || flight.price > priceRange[1]) {
        return false;
      }
      
      // Stops filter
      if (
        (flight.stops === 0 && !stopOptions.direct) ||
        (flight.stops === 1 && !stopOptions.oneStop) ||
        (flight.stops > 1 && !stopOptions.multiStop)
      ) {
        return false;
      }
      
      // Airline filter
      if (!selectedAirlines[flight.airlineCode]) {
        return false;
      }
      
      // Cabin class filter
      if (cabinClass !== 'all') {
        const cabinMapping = {
          'economy': 'Economy',
          'premium': 'Premium Economy',
          'business': 'Business',
          'first': 'First Class'
        };
        if (flight.cabinClass !== cabinMapping[cabinClass]) {
          return false;
        }
      }
      
      // Departure time filter
      const departHour = parseInt(flight.departureTime.split(':')[0]);
      const departureTimeMatch = (
        (departHour >= 0 && departHour < 6 && timeOptions.departureTime.earlyMorning) ||
        (departHour >= 6 && departHour < 12 && timeOptions.departureTime.morning) ||
        (departHour >= 12 && departHour < 18 && timeOptions.departureTime.afternoon) ||
        (departHour >= 18 && departHour < 24 && timeOptions.departureTime.evening)
      );
      if (!departureTimeMatch) {
        return false;
      }
      
      // Arrival time filter
      const arrivalHour = parseInt(flight.arrivalTime.split(':')[0]);
      const arrivalTimeMatch = (
        (arrivalHour >= 0 && arrivalHour < 6 && timeOptions.arrivalTime.earlyMorning) ||
        (arrivalHour >= 6 && arrivalHour < 12 && timeOptions.arrivalTime.morning) ||
        (arrivalHour >= 12 && arrivalHour < 18 && timeOptions.arrivalTime.afternoon) ||
        (arrivalHour >= 18 && arrivalHour < 24 && timeOptions.arrivalTime.evening)
      );
      if (!arrivalTimeMatch) {
        return false;
      }
      
      return true;
    });
    
    setFilteredFlights(newFilteredFlights);
  };

  // Sort flights
  const handleSortChange = (option) => {
    setSortOption(option);
    
    const sortedFlights = [...filteredFlights];
    
    switch (option) {
      case 'price_asc':
        sortedFlights.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        sortedFlights.sort((a, b) => b.price - a.price);
        break;
      case 'duration_asc':
        // Compare flight duration
        sortedFlights.sort((a, b) => {
          const durationA = parseInt(a.duration.split('h')[0]);
          const durationB = parseInt(b.duration.split('h')[0]);
          return durationA - durationB;
        });
        break;
      case 'depart_asc':
        sortedFlights.sort((a, b) => {
          const timeA = a.departureTime.split(':').map(Number);
          const timeB = b.departureTime.split(':').map(Number);
          return (timeA[0] * 60 + timeA[1]) - (timeB[0] * 60 + timeB[1]);
        });
        break;
      case 'depart_desc':
        sortedFlights.sort((a, b) => {
          const timeA = a.departureTime.split(':').map(Number);
          const timeB = b.departureTime.split(':').map(Number);
          return (timeB[0] * 60 + timeB[1]) - (timeA[0] * 60 + timeA[1]);
        });
        break;
      default:
        // Recommended sorting, considering price, time and other factors
        sortedFlights.sort((a, b) => {
          const priceWeight = 0.6;
          const durationWeight = 0.4;
          
          // Normalize price (lower is better)
          const maxPrice = Math.max(...sortedFlights.map(f => f.price));
          const minPrice = Math.min(...sortedFlights.map(f => f.price));
          const priceScoreA = (maxPrice - a.price) / (maxPrice - minPrice || 1);
          const priceScoreB = (maxPrice - b.price) / (maxPrice - minPrice || 1);
          
          // Normalize duration (shorter is better)
          const durationA = parseInt(a.duration.split('h')[0]);
          const durationB = parseInt(b.duration.split('h')[0]);
          const maxDuration = Math.max(...sortedFlights.map(f => parseInt(f.duration.split('h')[0])));
          const minDuration = Math.min(...sortedFlights.map(f => parseInt(f.duration.split('h')[0])));
          const durationScoreA = (maxDuration - durationA) / (maxDuration - minDuration || 1);
          const durationScoreB = (maxDuration - durationB) / (maxDuration - minDuration || 1);
          
          // Combined score
          const scoreA = priceWeight * priceScoreA + durationWeight * durationScoreA;
          const scoreB = priceWeight * priceScoreB + durationWeight * durationScoreB;
          
          return scoreB - scoreA; // Higher score comes first
        });
        break;
    }
    
    setFilteredFlights(sortedFlights);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Search Summary & Modify Search Section */}
        <section className="bg-booking-dark-blue py-6">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                <div className="mb-4 md:mb-0">
                  <h1 className="text-xl font-bold">{from} → {to}</h1>
                  <p className="text-gray-600">
                    {depart}{tripType === 'round' ? ` - ${returnDate}` : ''} · {adults} Adult(s)
                    {children > 0 ? ` · ${children} Child(ren)` : ''}
                    {infants > 0 ? ` · ${infants} Infant(s)` : ''}
                  </p>
                </div>
                <button 
                  className="flex items-center text-booking-blue"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <FaExchangeAlt className="mr-1" />
                  Modify Search
                </button>
              </div>
              
              {showFilters && (
                <div className="pt-4 border-t border-gray-200">
                  <SearchForm />
                </div>
              )}
            </div>
          </div>
        </section>
        

        
        {/* Filters and Results */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row">
              {/* Sidebar Filters (desktop) */}
              <div className="hidden md:block md:w-1/4 pr-6">
                <FlightFilters onFilterChange={handleFilterChange} maxPrice={maxPrice} />
              </div>
              
              {/* Mobile Filters Toggle */}
              <div className="md:hidden mb-4">
                <button 
                  className="w-full py-2 px-4 bg-booking-blue text-white rounded-md flex items-center justify-center"
                  onClick={toggleFilters}
                >
                  <FaFilter className="mr-2" />
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>
              </div>
              
              {/* Mobile Filters */}
              {showFilters && (
                <div className="md:hidden mb-4">
                  <FlightFilters onFilterChange={handleFilterChange} maxPrice={maxPrice} />
                </div>
              )}
              
              {/* Results */}
              <div className="md:w-3/4">
                {/* Sort Options */}
                <div className="bg-white p-4 rounded-md shadow-md mb-4">
                  <div className="flex flex-wrap justify-between items-center">
                    <div className="mb-2 md:mb-0">
                      <span className="font-bold">
                        {tripType === 'round' ? '↔️' : '→'} {filteredFlights.length} flights
                        {tripType === 'round' && returnDate && (
                          <span className="text-blue-600 font-normal ml-2">
                            (Outbound + Return)
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <select
                        className="border border-gray-300 rounded-md px-3 py-1.5 bg-white"
                        value={sortOption}
                        onChange={e => handleSortChange(e.target.value)}
                      >
                        <option value="recommended">Recommended</option>
                        <option value="price_asc">Price (lowest first)</option>
                        <option value="price_desc">Price (highest first)</option>
                        <option value="duration_asc">Shortest flight</option>
                        <option value="depart_asc">Earliest departure</option>
                        <option value="depart_desc">Latest departure</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                {/* Loading State */}
                {loading ? (
                  <div className="bg-white p-8 rounded-md shadow-md text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-booking-blue mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading flights...</p>
                  </div>
                ) : filteredFlights.length === 0 ? (
                  // No results state
                  <div className="bg-white p-8 rounded-md shadow-md text-center">
                    <p className="text-xl font-bold mb-2">No flights found</p>
                    <p className="text-gray-600 mb-4">Try adjusting your search criteria or choose a different date</p>
                    <button
                      className="bg-booking-blue text-white py-2 px-4 rounded-md"
                      onClick={() => {
                        // Reset all filters
                        if (appliedFilters) {
                          const resetFilters = {
                            ...appliedFilters,
                            priceRange: [0, maxPrice],
                            stopOptions: { direct: true, oneStop: true, multiStop: true },
                            timeOptions: {
                              departureTime: { earlyMorning: true, morning: true, afternoon: true, evening: true },
                              arrivalTime: { earlyMorning: true, morning: true, afternoon: true, evening: true }
                            },
                            selectedAirlines: Object.fromEntries(airlines.map(airline => [airline.code, true])),
                            cabinClass: 'all'
                          };
                          handleFilterChange(resetFilters);
                        }
                      }}
                    >
                      Reset Filters
                    </button>
                  </div>
                ) : (
                  // Results list
                  <div className="space-y-4">
                    {filteredFlights.map(flight => (
                      <FlightCard key={flight.id} flight={flight} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Flights; 