import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const PromoCarousel = ({ promotions }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promotions.length);
    }, 5000); // Auto-slide every 5 seconds

    return () => clearInterval(timer);
  }, [promotions.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % promotions.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + promotions.length) % promotions.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  if (!promotions || promotions.length === 0) {
    return null;
  }

  return (
    <div className="relative overflow-hidden rounded-lg mb-8">
      {/* Slides Container */}
      <div className="relative h-48 md:h-64">
        {promotions.map((promo, index) => (
          <div
            key={promo.id}
            className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
              index === currentSlide ? 'translate-x-0' : 
              index < currentSlide ? '-translate-x-full' : 'translate-x-full'
            }`}
          >
            <div className={`
              relative h-full w-full ${promo.backgroundColor} ${promo.textColor} 
              flex items-center justify-between px-6 md:px-12
            `}>
              {/* Content */}
              <div className="flex-1 max-w-md">
                <h2 className="text-lg md:text-2xl font-bold mb-2">
                  {promo.title}
                </h2>
                {promo.subtitle && (
                  <p className="text-sm md:text-base mb-1 opacity-90">
                    {promo.subtitle}
                  </p>
                )}
                {promo.description && (
                  <p className="text-xs md:text-sm mb-4 opacity-80">
                    {promo.description}
                  </p>
                )}
                <button className="bg-white text-gray-900 px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium text-sm md:text-base hover:bg-gray-100 transition-colors">
                  {promo.buttonText}
                </button>
              </div>

              {/* Image */}
              {promo.image && (
                <div className="hidden md:block flex-shrink-0 ml-8">
                  <img
                    src={promo.image}
                    alt={promo.title}
                    className="h-32 w-32 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {promotions.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all"
          >
            <FaChevronLeft className="text-gray-700" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all"
          >
            <FaChevronRight className="text-gray-700" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {promotions.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {promotions.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide 
                  ? 'bg-white' 
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PromoCarousel;
