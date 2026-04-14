import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const CategoryScroll = ({ categories, activeCategory = null, onCategorySelect = null }) => {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 300;
    const newScrollLeft = direction === 'left' 
      ? container.scrollLeft - scrollAmount 
      : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  };

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setShowLeftArrow(container.scrollLeft > 0);
    setShowRightArrow(
      container.scrollLeft < container.scrollWidth - container.clientWidth
    );
  };

  const handleCategoryClick = (category) => {
    if (onCategorySelect) {
      onCategorySelect(category.id);
    }
  };

  return (
    <div className="relative">
      {/* Left Arrow */}
      {showLeftArrow && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 border border-gray-200"
        >
          <FaChevronLeft className="text-gray-600" />
        </button>
      )}

      {/* Categories Container */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex space-x-6 overflow-x-auto scrollbar-hide px-4 py-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((category) => {
          const isActive = activeCategory === category.id;
          const CategoryContent = (
            <div className={`
              flex flex-col items-center space-y-2 min-w-max cursor-pointer p-3 rounded-lg transition-colors
              ${isActive 
                ? 'bg-red-50 text-red-600' 
                : 'hover:bg-gray-50 text-gray-700'
              }
            `}>
              {/* Category Icon */}
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center text-2xl
                ${isActive 
                  ? 'bg-red-100' 
                  : `${category.color} hover:scale-105 transition-transform`
                }
              `}>
                {category.icon}
              </div>
              
              {/* Category Name */}
              <span className={`
                text-sm font-medium text-center
                ${isActive ? 'text-red-600' : 'text-gray-900'}
              `}>
                {category.name}
              </span>
            </div>
          );

          return onCategorySelect ? (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category)}
            >
              {CategoryContent}
            </div>
          ) : (
            <Link key={category.id} href={`/mealdash/category/${category.id}`}>
              {CategoryContent}
            </Link>
          );
        })}
      </div>

      {/* Right Arrow */}
      {showRightArrow && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 border border-gray-200"
        >
          <FaChevronRight className="text-gray-600" />
        </button>
      )}

      {/* Custom CSS to hide scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default CategoryScroll;
