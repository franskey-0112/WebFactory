import React, { useState, useRef, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaFilter } from 'react-icons/fa';
import { categories } from '../../data/staticStaybnbData';

const CategoryFilter = ({ selectedCategory, onCategoryChange, onFiltersClick }) => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollContainerRef = useRef(null);

  const checkScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 1
      );
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollButtons);
      return () => container.removeEventListener('scroll', checkScrollButtons);
    }
  }, []);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 200;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 sticky top-16 md:top-20 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center py-4">
          {/* Left Scroll Button */}
          <button
            onClick={() => scroll('left')}
            className={`absolute left-4 z-10 p-2 rounded-full bg-white border border-gray-300 shadow-sm transition-opacity ${
              canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <FaChevronLeft className="h-3 w-3 text-gray-600" />
          </button>

          {/* Categories Container */}
          <div
            ref={scrollContainerRef}
            className="flex space-x-8 overflow-x-auto scrollbar-hide mx-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* All Categories */}
            <button
              onClick={() => onCategoryChange(null)}
              className={`flex flex-col items-center space-y-2 pb-2 border-b-2 transition-colors whitespace-nowrap ${
                selectedCategory === null
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="text-2xl">🏠</div>
              <span className="text-xs font-medium">All</span>
            </button>

            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`flex flex-col items-center space-y-2 pb-2 border-b-2 transition-colors whitespace-nowrap ${
                  selectedCategory === category.id
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="text-2xl">{category.icon}</div>
                <span className="text-xs font-medium">{category.name}</span>
              </button>
            ))}
          </div>

          {/* Right Scroll Button */}
          <button
            onClick={() => scroll('right')}
            className={`absolute right-16 z-10 p-2 rounded-full bg-white border border-gray-300 shadow-sm transition-opacity ${
              canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <FaChevronRight className="h-3 w-3 text-gray-600" />
          </button>

          {/* Filters Button */}
          <div className="absolute right-4">
            <button
              onClick={onFiltersClick}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
            >
              <FaFilter className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Filters</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
