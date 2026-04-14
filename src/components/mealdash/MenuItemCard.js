import React, { useState } from 'react';
import { FaPlus, FaMinus, FaStar } from 'react-icons/fa';

const MenuItemCard = ({ 
  item, 
  onAddToCart, 
  onUpdateQuantity, 
  cartQuantity = 0,
  showAddButton = true 
}) => {
  const [isCustomizationOpen, setIsCustomizationOpen] = useState(false);
  const [selectedCustomizations, setSelectedCustomizations] = useState({});
  const [selectedSize, setSelectedSize] = useState(item.sizes ? item.sizes[0] : null);

  const handleAddToCart = () => {
    if (item.customizations && item.customizations.length > 0 && !isCustomizationOpen) {
      setIsCustomizationOpen(true);
      return;
    }

    if (onAddToCart) {
      const customizations = {
        ...selectedCustomizations,
        ...(selectedSize && { selectedSize })
      };
      onAddToCart(item, customizations);
    }
  };

  const handleUpdateQuantity = (newQuantity) => {
    if (onUpdateQuantity) {
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  const handleCustomizationChange = (customizationName, option, price = 0) => {
    setSelectedCustomizations(prev => ({
      ...prev,
      [customizationName]: { option, price }
    }));
  };

  const calculateTotalPrice = () => {
    let total = selectedSize ? selectedSize.price : item.price;
    Object.values(selectedCustomizations).forEach(custom => {
      total += custom.price || 0;
    });
    return total;
  };

  const formatPrice = (price) => `$${price.toFixed(2)}`;

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
        <div className="flex items-start space-x-4">
          {/* Item Image */}
          <div className="flex-shrink-0">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
          </div>

          {/* Item Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {/* Name and Popular Badge */}
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {item.name}
                  </h3>
                  {item.popular && (
                    <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
                      Popular
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                  {item.description}
                </p>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-900">
                    {formatPrice(selectedSize ? selectedSize.price : item.price)}
                  </span>

                  {/* Add to Cart / Quantity Controls */}
                  {showAddButton && (
                    <div className="flex items-center space-x-2">
                      {cartQuantity > 0 ? (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleUpdateQuantity(cartQuantity - 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-full border border-red-500 text-red-500 hover:bg-red-50"
                          >
                            <FaMinus size={12} />
                          </button>
                          <span className="w-8 text-center font-medium">
                            {cartQuantity}
                          </span>
                          <button
                            onClick={() => handleUpdateQuantity(cartQuantity + 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
                          >
                            <FaPlus size={12} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={handleAddToCart}
                          className="flex items-center space-x-1 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-colors"
                        >
                          <FaPlus size={12} />
                          <span className="text-sm font-medium">Add</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sizes (for items like pizza) */}
        {item.sizes && item.sizes.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-sm font-medium text-gray-700 mb-2">Choose size:</p>
            <div className="space-y-1">
              {item.sizes.map((size, index) => (
                <label key={index} className="flex items-center justify-between text-sm cursor-pointer hover:bg-gray-50 p-1 rounded">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`size-${item.id}`}
                      value={size.name}
                      checked={selectedSize && selectedSize.name === size.name}
                      onChange={() => setSelectedSize(size)}
                      className="text-red-500 focus:ring-red-500"
                    />
                    <span className={`${selectedSize && selectedSize.name === size.name ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                      {size.name}
                    </span>
                  </div>
                  <span className={`font-medium ${selectedSize && selectedSize.name === size.name ? 'text-red-600' : 'text-gray-700'}`}>
                    {formatPrice(size.price)}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Customization Modal */}
      {isCustomizationOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  Customize {item.name}
                </h2>
                <button
                  onClick={() => setIsCustomizationOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Item Info */}
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>

              {/* Customizations */}
              {item.customizations && item.customizations.map((customization, index) => (
                <div key={index} className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">
                    {customization.name}
                  </h4>
                  
                  {customization.options ? (
                    // Multiple choice options
                    <div className="space-y-2">
                      {customization.options.map((option, optionIndex) => (
                        <label key={optionIndex} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name={customization.name}
                            value={option}
                            onChange={() => handleCustomizationChange(customization.name, option, customization.extra || 0)}
                            className="text-red-500"
                          />
                          <span className="text-sm">{option}</span>
                          {customization.extra > 0 && (
                            <span className="text-sm text-gray-600">
                              (+{formatPrice(customization.extra)})
                            </span>
                          )}
                        </label>
                      ))}
                    </div>
                  ) : (
                    // Single add-on
                    <label className="flex items-center justify-between">
                      <span className="text-sm">{customization.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">
                          +{formatPrice(customization.price)}
                        </span>
                        <input
                          type="checkbox"
                          onChange={(e) => 
                            handleCustomizationChange(
                              customization.name, 
                              e.target.checked, 
                              e.target.checked ? customization.price : 0
                            )
                          }
                          className="text-red-500"
                        />
                      </div>
                    </label>
                  )}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold">Total:</span>
                <span className="text-lg font-bold text-red-600">
                  {formatPrice(calculateTotalPrice())}
                </span>
              </div>
              <button
                onClick={() => {
                  handleAddToCart();
                  setIsCustomizationOpen(false);
                }}
                className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors font-medium"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MenuItemCard;
