import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { FaBolt, FaTag } from 'react-icons/fa';
import AmazonPageShell from '../../components/amazon/AmazonPageShell';
import ProductCard from '../../components/amazon/ProductCard';
import { categories, products } from '../../data/amazonData';

const promoWindows = [
  { label: 'Ends tonight', date: 'Apr 12, 2026, 11:59 PM ET' },
  { label: 'Weeklong deal', date: 'Apr 18, 2026, 11:59 PM ET' },
  { label: 'Prime member offer', date: 'Apr 30, 2026, 11:59 PM ET' }
];

// Only keep deals where image-to-title mapping has been manually verified.
const verifiedDealProductIds = new Set([
  'iphone-15-pro',
  'samsung-galaxy-s24',
  'samsung-galaxy-s24-plus',
  'macbook-air-m3',
  'dell-xps-13',
  'atomic-habits',
  'fourth-wing',
  'instant-pot-duo',
  'levi-501-jeans',
  'yeti-tumbler',
  'apple-case-iphone-15',
  'apple-charger-usbc'
]);

const hasTrustedDealImage = (product) => {
  const primaryImage = product.images?.[0] || '';
  if (!primaryImage) return false;
  if (primaryImage.includes('/images/amazon/brands/')) return false;
  if (primaryImage.includes('/images/amazon/banners/')) return false;
  if (primaryImage.includes('placeholder')) return false;
  return true;
};

const AmazonTodaysDealsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [discountTier, setDiscountTier] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [refreshMarker, setRefreshMarker] = useState(0);

  const dealProducts = useMemo(() => {
    return products
      .filter((product) => verifiedDealProductIds.has(product.id))
      .filter((product) => hasTrustedDealImage(product))
      .filter((product) => Number.isFinite(product.originalPrice) && product.originalPrice > product.price)
      .map((product, index) => {
        const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
        return {
          ...product,
          dealId: `deal-${product.id}`,
          discountPercent,
          promoWindow: promoWindows[index % promoWindows.length]
        };
      });
  }, []);

  const filteredDeals = useMemo(() => {
    const tierFilter = {
      all: () => true,
      '10': (product) => product.discountPercent >= 10,
      '20': (product) => product.discountPercent >= 20,
      '30': (product) => product.discountPercent >= 30,
      '40': (product) => product.discountPercent >= 40
    };

    const selectedTierFilter = tierFilter[discountTier] || tierFilter.all;

    const output = dealProducts
      .filter((product) => activeCategory === 'all' || product.category === activeCategory)
      .filter((product) => selectedTierFilter(product));

    switch (sortBy) {
      case 'discount':
        output.sort((a, b) => b.discountPercent - a.discountPercent);
        break;
      case 'price-low':
        output.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        output.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        output.sort((a, b) => b.rating - a.rating);
        break;
      default:
        output.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return output;
  }, [activeCategory, dealProducts, discountTier, sortBy]);

  const featuredDeal = filteredDeals[0] || null;

  const addToCart = (product) => {
    try {
      const saved = localStorage.getItem('amazon-cart');
      const current = saved ? JSON.parse(saved) : [];
      const index = current.findIndex((item) => item.id === product.id);

      if (index >= 0) {
        current[index].quantity += 1;
      } else {
        current.push({
          id: product.id,
          title: product.title,
          price: product.price,
          originalPrice: product.originalPrice,
          quantity: 1,
          image: product.images?.[0] || '',
          inStock: product.inStock,
          prime: product.delivery?.prime || false,
          seller: product.seller?.name || 'Amazon.com'
        });
      }

      localStorage.setItem('amazon-cart', JSON.stringify(current));
      setRefreshMarker((count) => count + 1);
    } catch (error) {
      console.error('Error adding deal item to cart:', error);
    }
  };

  return (
    <AmazonPageShell
      title="Today's Deals - Amazon.com"
      description="Browse limited-time discounts, lightning deals, and featured savings across Amazon categories."
      breadcrumb="Today's Deals"
    >
      <section
        style={{
          borderRadius: '8px',
          overflow: 'hidden',
          background: 'linear-gradient(92deg, #b51739 0%, #cc0c39 60%, #7d0f2f 100%)',
          color: 'white'
        }}
      >
        <div style={{ padding: '26px' }}>
          <h1 style={{ fontSize: '34px', marginBottom: '8px' }}>Today&apos;s Deals</h1>
          <p style={{ margin: 0, fontSize: '15px', color: '#ffe8ee' }}>
            Fresh markdowns, lightning deals, and limited-time coupons updated for this offline experience.
          </p>
          <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#ffd8e3' }}>
            Showing verified deals with image-title consistency.
          </p>
        </div>
      </section>

      <section style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '20px' }} className="amazon-deals-hero">
        <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>Featured Deal Spotlight</h2>
          {!featuredDeal && <p style={{ color: '#565959' }}>No deals match the selected filters.</p>}
          {featuredDeal && (
            <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: '18px' }} className="amazon-deals-featured">
              <img
                src={featuredDeal.images?.[0] || '/images/amazon/products/electronics/smartphones/iphone-15-pro-1.jpg'}
                alt={featuredDeal.title}
                style={{ width: '100%', height: '180px', objectFit: 'contain', backgroundColor: '#f7f7f7', borderRadius: '6px' }}
              />
              <div>
                <span
                  style={{
                    display: 'inline-block',
                    backgroundColor: '#cc0c39',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '12px',
                    padding: '4px 8px',
                    borderRadius: '4px'
                  }}
                >
                  Up to {featuredDeal.discountPercent}% off
                </span>
                <h3 style={{ marginTop: '12px', marginBottom: '8px', fontSize: '20px' }}>{featuredDeal.title}</h3>
                <p style={{ marginTop: 0, marginBottom: '6px', color: '#0f1111', fontSize: '15px' }}>
                  Deal price <strong>${featuredDeal.price.toFixed(2)}</strong> · List ${featuredDeal.originalPrice.toFixed(2)}
                </p>
                <p style={{ marginTop: 0, marginBottom: '10px', color: '#565959', fontSize: '13px' }}>
                  <FaBolt style={{ marginRight: '6px', color: '#ff9900' }} />
                  {featuredDeal.promoWindow.label}: {featuredDeal.promoWindow.date}
                </p>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={() => addToCart(featuredDeal)}
                    style={{
                      backgroundColor: '#ffd814',
                      border: '1px solid #fcd200',
                      borderRadius: '999px',
                      padding: '8px 16px',
                      fontSize: '14px',
                      cursor: 'pointer'
                    }}
                  >
                    Add to Cart
                  </button>
                  <Link
                    href={`/amazon/product/${featuredDeal.id}`}
                    style={{
                      border: '1px solid #d5d9d9',
                      borderRadius: '999px',
                      padding: '8px 16px',
                      fontSize: '14px',
                      color: '#0f1111',
                      textDecoration: 'none'
                    }}
                  >
                    View Product
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>Filter Deals</h2>

          <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: '#565959' }}>Department</label>
          <select
            value={activeCategory}
            onChange={(event) => setActiveCategory(event.target.value)}
            style={{ width: '100%', height: '38px', border: '1px solid #d5d9d9', borderRadius: '8px', padding: '0 10px', marginBottom: '14px' }}
          >
            <option value="all">All departments</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: '#565959' }}>Discount level</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '8px' }}>
            {[
              { key: 'all', label: 'Any' },
              { key: '10', label: '10%+' },
              { key: '20', label: '20%+' },
              { key: '30', label: '30%+' },
              { key: '40', label: '40%+' }
            ].map((tier) => (
              <button
                key={tier.key}
                type="button"
                onClick={() => setDiscountTier(tier.key)}
                style={{
                  border: discountTier === tier.key ? '1px solid #e47911' : '1px solid #d5d9d9',
                  backgroundColor: discountTier === tier.key ? '#fff7ec' : 'white',
                  borderRadius: '999px',
                  padding: '8px 10px',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                {tier.label}
              </button>
            ))}
          </div>

          <label style={{ display: 'block', marginTop: '14px', marginBottom: '8px', fontSize: '13px', color: '#565959' }}>Sort by</label>
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            style={{ width: '100%', height: '38px', border: '1px solid #d5d9d9', borderRadius: '8px', padding: '0 10px' }}
          >
            <option value="featured">Featured</option>
            <option value="discount">Biggest discount</option>
            <option value="price-low">Price: Low to high</option>
            <option value="price-high">Price: High to low</option>
            <option value="rating">Top rated</option>
          </select>
        </div>
      </section>

      <section style={{ marginTop: '20px' }} key={refreshMarker}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <h2 style={{ fontSize: '24px', margin: 0 }}>All Deal Results</h2>
          <p style={{ margin: 0, color: '#565959', fontSize: '13px' }}>{filteredDeals.length} items</p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            gap: '16px'
          }}
          className="amazon-deals-grid"
        >
          {filteredDeals.map((product) => (
            <div key={product.dealId}>
              <ProductCard product={product} onAddToCart={addToCart} />
              <p style={{ marginTop: '8px', fontSize: '12px', color: '#565959' }}>
                <FaTag style={{ marginRight: '4px', color: '#cc0c39' }} />
                {product.promoWindow.label}: {product.promoWindow.date}
              </p>
            </div>
          ))}
        </div>
      </section>

      <style jsx global>{`
        @media (max-width: 1250px) {
          .amazon-deals-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          }
        }

        @media (max-width: 1020px) {
          .amazon-deals-hero {
            grid-template-columns: 1fr !important;
          }

          .amazon-deals-featured {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 840px) {
          .amazon-deals-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }

        @media (max-width: 560px) {
          .amazon-deals-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </AmazonPageShell>
  );
};

export default AmazonTodaysDealsPage;
