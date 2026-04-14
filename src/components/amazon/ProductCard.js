import React, { useState } from 'react';
import Link from 'next/link';
import { 
  FaStar, 
  FaStarHalfAlt, 
  FaRegStar, 
  FaCheck
} from 'react-icons/fa';
import { getPicsumImage } from '../../utils/imageHelper';

const ProductCard = ({ 
  product, 
  layout = 'grid', // 'grid' or 'list'
  onAddToCart,
  showQuickView = false,
  className = ''
}) => {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // 渲染星级评分 - Amazon 风格
  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.3 && rating % 1 <= 0.7;
    const almostFull = rating % 1 > 0.7;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars || (i === fullStars && almostFull)) {
        stars.push(<FaStar key={i} />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} />);
      } else {
        stars.push(<FaRegStar key={i} />);
      }
    }

    return stars;
  };

  // 计算折扣百分比
  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // 分离价格的整数和小数部分
  const priceWhole = Math.floor(product.price);
  const priceFraction = Math.round((product.price % 1) * 100).toString().padStart(2, '0');

  // 处理添加到购物车
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart && product.inStock) {
      onAddToCart(product);
    }
  };

  // Grid布局 - Amazon 风格
  if (layout === 'grid') {
    return (
      <div 
        className={className}
        style={{
          backgroundColor: 'white',
          padding: '14px',
          borderRadius: '4px',
          position: 'relative',
          transition: 'box-shadow 0.2s',
          boxShadow: isHovered ? '0 0 0 1px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.1)' : 'none'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link 
          href={`/amazon/product/${product.id}`} 
          style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
          data-testid={`product-link-${product.id}`}
        >
          {/* Deal Badge */}
          {discountPercent >= 10 && (
            <div style={{
              position: 'absolute',
              top: '8px',
              left: '8px',
              backgroundColor: '#cc0c39',
              color: 'white',
              padding: '4px 8px',
              fontSize: '12px',
              fontWeight: 'bold',
              borderRadius: '2px',
              zIndex: 1
            }}>
              {discountPercent}% off
                </div>
              )}
              
          {/* Product Image */}
          <div style={{
            position: 'relative',
            paddingTop: '100%',
            marginBottom: '12px',
            backgroundColor: '#f7f7f7',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <img
              src={!imageError 
                ? (product.images?.[0] || getPicsumImage(product.id, 400, 400))
                : getPicsumImage(product.id, 400, 400)
              }
              alt={product.title}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                padding: '10px'
              }}
              onError={(e) => {
                if (!imageError) {
                  setImageError(true);
                  e.target.src = getPicsumImage(product.id, 400, 400);
                }
              }}
            />
          </div>

          {/* Product Title */}
          <h3 style={{
            fontSize: '14px',
            lineHeight: '1.4',
            color: '#0f1111',
            marginBottom: '4px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            fontWeight: 400
          }}>
            {product.title}
          </h3>

          {/* Rating */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '4px'
          }}>
            <div style={{
              display: 'flex',
              color: '#de7921',
              fontSize: '14px',
              marginRight: '4px'
            }}>
              {renderRating(product.rating)}
            </div>
            <span style={{
              fontSize: '12px',
              color: '#007185'
            }}>
              {product.reviewCount?.toLocaleString()}
            </span>
                </div>

          {/* Bought count */}
          {product.reviewCount > 1000 && (
            <div style={{
              fontSize: '12px',
              color: '#565959',
              marginBottom: '4px'
            }}>
              {product.reviewCount > 10000 ? '10K+' : `${Math.floor(product.reviewCount / 1000)}K+`} bought in past month
                </div>
              )}

          {/* Price */}
          <div style={{ marginBottom: '8px' }}>
            {/* Current Price */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-start'
            }}>
              <span style={{
                fontSize: '13px',
                color: '#0f1111',
                position: 'relative',
                top: '2px'
              }}>$</span>
              <span style={{
                fontSize: '28px',
                fontWeight: 400,
                color: '#0f1111',
                lineHeight: 1
              }}>{priceWhole}</span>
              <span style={{
                fontSize: '13px',
                color: '#0f1111',
                position: 'relative',
                top: '2px'
              }}>{priceFraction}</span>
            </div>

            {/* Original Price */}
            {product.originalPrice && product.originalPrice > product.price && (
              <div style={{
                fontSize: '12px',
                color: '#565959'
              }}>
                List: <span style={{ textDecoration: 'line-through' }}>${product.originalPrice.toFixed(2)}</span>
              </div>
            )}
          </div>

          {/* Prime / Delivery */}
          {product.delivery?.prime && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '12px',
              color: '#565959',
              marginBottom: '4px'
            }}>
              <span style={{
                color: '#1b94c2',
                fontWeight: 'bold',
                fontStyle: 'italic',
                marginRight: '4px'
              }}>prime</span>
            </div>
          )}

          {/* Free Delivery */}
          {product.delivery?.freeShipping && (
            <div style={{
              fontSize: '12px',
              color: '#0f1111'
            }}>
              FREE delivery <span style={{ fontWeight: 'bold' }}>
                {product.delivery?.prime ? 'Tomorrow' : `in ${product.delivery?.estimatedDays || 3}-${(product.delivery?.estimatedDays || 3) + 2} days`}
              </span>
            </div>
          )}

          {/* In Stock */}
          {product.inStock ? (
            product.stockCount && product.stockCount <= 10 ? (
              <div style={{
                fontSize: '12px',
                color: '#cc0c39',
                marginTop: '4px'
              }}>
                Only {product.stockCount} left in stock - order soon.
              </div>
            ) : (
              <div style={{
                fontSize: '12px',
                color: '#007600',
                marginTop: '4px',
                display: 'flex',
                alignItems: 'center'
              }}>
                <FaCheck style={{ marginRight: '4px', fontSize: '10px' }} />
                In Stock
                </div>
              )
            ) : (
            <div style={{
              fontSize: '12px',
              color: '#cc0c39',
              marginTop: '4px'
            }}>
              Currently unavailable
            </div>
            )}
        </Link>

        {/* Add to Cart Button - shows on hover */}
        {isHovered && product.inStock && (
          <button
            onClick={handleAddToCart}
            style={{
              marginTop: '12px',
              width: '100%',
              background: 'linear-gradient(to bottom, #f7dfa5, #f0c14b)',
              border: '1px solid #a88734',
              borderRadius: '20px',
              padding: '8px 16px',
              fontSize: '13px',
              cursor: 'pointer',
              color: '#0f1111',
              boxShadow: '0 1px 0 rgba(255,255,255,.6) inset'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'linear-gradient(to bottom, #f5d78e, #eeb933)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'linear-gradient(to bottom, #f7dfa5, #f0c14b)'}
            data-testid={`add-to-cart-${product.id}`}
          >
            Add to Cart
          </button>
        )}
      </div>
    );
  }

  // List布局 - Amazon 搜索结果风格
  return (
    <div 
      className={className}
      style={{
        backgroundColor: 'white',
        padding: '16px',
        borderBottom: '1px solid #ddd',
        display: 'flex',
        gap: '16px'
      }}
    >
      <Link 
        href={`/amazon/product/${product.id}`}
        style={{ flexShrink: 0 }}
        data-testid={`product-link-${product.id}`}
      >
        {/* Product Image */}
        <div style={{
          width: '200px',
          height: '200px',
          backgroundColor: '#f7f7f7',
          borderRadius: '4px',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <img
            src={!imageError 
              ? (product.images?.[0] || getPicsumImage(product.id, 400, 400))
              : getPicsumImage(product.id, 400, 400)
            }
                alt={product.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              padding: '10px'
            }}
            onError={(e) => {
              if (!imageError) {
                setImageError(true);
                e.target.src = getPicsumImage(product.id, 400, 400);
              }
            }}
          />

          {/* Deal Badge */}
          {discountPercent >= 10 && (
            <div style={{
              position: 'absolute',
              top: '8px',
              left: '8px',
              backgroundColor: '#cc0c39',
              color: 'white',
              padding: '4px 8px',
              fontSize: '12px',
              fontWeight: 'bold',
              borderRadius: '2px'
            }}>
              {discountPercent}% off
              </div>
            )}
        </div>
      </Link>

      {/* Product Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <Link 
          href={`/amazon/product/${product.id}`}
          style={{ textDecoration: 'none' }}
        >
          {/* Title */}
          <h3 style={{
            fontSize: '16px',
            lineHeight: '1.4',
            color: '#0f1111',
            marginBottom: '4px',
            fontWeight: 400,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#c7511f'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#0f1111'}
          >
              {product.title}
            </h3>
        </Link>

        {/* Brand */}
        {product.brand && (
          <div style={{
            fontSize: '12px',
            color: '#565959',
            marginBottom: '4px'
          }}>
            by {product.brand}
          </div>
        )}

        {/* Rating */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '4px'
        }}>
          <div style={{
            display: 'flex',
            color: '#de7921',
            fontSize: '14px',
            marginRight: '4px'
          }}>
              {renderRating(product.rating)}
            </div>
          <span style={{
            fontSize: '12px',
            color: '#007185',
            marginRight: '8px'
          }}>
            {product.reviewCount?.toLocaleString()}
          </span>
          {product.reviewCount > 1000 && (
            <span style={{
              fontSize: '12px',
              color: '#565959'
            }}>
              {product.reviewCount > 10000 ? '10K+' : `${Math.floor(product.reviewCount / 1000)}K+`} bought in past month
            </span>
          )}
        </div>

        {/* Price */}
        <div style={{ marginBottom: '8px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'flex-start'
          }}>
            <span style={{
              fontSize: '14px',
              color: '#0f1111',
              position: 'relative',
              top: '2px'
            }}>$</span>
            <span style={{
              fontSize: '28px',
              fontWeight: 400,
              color: '#0f1111',
              lineHeight: 1
            }}>{priceWhole}</span>
            <span style={{
              fontSize: '14px',
              color: '#0f1111',
              position: 'relative',
              top: '2px'
            }}>{priceFraction}</span>
          </div>

          {product.originalPrice && product.originalPrice > product.price && (
            <div style={{
              fontSize: '14px',
              color: '#565959'
            }}>
              List: <span style={{ textDecoration: 'line-through' }}>${product.originalPrice.toFixed(2)}</span>
              <span style={{
                color: '#cc0c39',
                marginLeft: '8px',
                fontWeight: 'bold'
              }}>
                ({discountPercent}% off)
              </span>
            </div>
          )}
        </div>

        {/* Prime & Delivery */}
        {product.delivery?.prime && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '12px',
            marginBottom: '4px'
          }}>
            <span style={{
              color: '#1b94c2',
              fontWeight: 'bold',
              fontStyle: 'italic',
              marginRight: '4px'
            }}>prime</span>
            <span style={{ color: '#565959' }}>
              FREE delivery
            </span>
              </div>
            )}

        {product.delivery?.freeShipping && (
          <div style={{
            fontSize: '12px',
            color: '#0f1111',
            marginBottom: '4px'
          }}>
            FREE delivery <span style={{ fontWeight: 'bold' }}>
              {product.delivery?.prime ? 'Tomorrow' : `${new Date(Date.now() + (product.delivery?.estimatedDays || 3) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}`}
            </span>
          </div>
        )}

        {/* Stock Status */}
        {product.inStock ? (
          product.stockCount && product.stockCount <= 10 ? (
            <div style={{
              fontSize: '12px',
              color: '#cc0c39',
              marginBottom: '8px'
            }}>
              Only {product.stockCount} left in stock - order soon.
            </div>
          ) : (
            <div style={{
              fontSize: '12px',
              color: '#007600',
              marginBottom: '8px'
            }}>
              In Stock
              </div>
            )
          ) : (
          <div style={{
            fontSize: '12px',
            color: '#cc0c39',
            marginBottom: '8px'
          }}>
            Currently unavailable
          </div>
          )}

        {/* Features */}
        {product.features && product.features.length > 0 && (
          <ul style={{
            margin: 0,
            padding: 0,
            paddingLeft: '20px',
            fontSize: '14px',
            color: '#0f1111'
          }}>
            {product.features.slice(0, 3).map((feature, index) => (
              <li key={index} style={{ marginBottom: '2px' }}>
                {feature}
              </li>
            ))}
          </ul>
        )}

        {/* Add to Cart Button */}
        {product.inStock && (
            <button
              onClick={handleAddToCart}
            style={{
              marginTop: '12px',
              background: 'linear-gradient(to bottom, #f7dfa5, #f0c14b)',
              border: '1px solid #a88734',
              borderRadius: '20px',
              padding: '8px 24px',
              fontSize: '13px',
              cursor: 'pointer',
              color: '#0f1111',
              boxShadow: '0 1px 0 rgba(255,255,255,.6) inset'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'linear-gradient(to bottom, #f5d78e, #eeb933)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'linear-gradient(to bottom, #f7dfa5, #f0c14b)'}
              data-testid={`add-to-cart-${product.id}`}
            >
              Add to Cart
            </button>
        )}
        </div>
    </div>
  );
};

export default ProductCard; 
