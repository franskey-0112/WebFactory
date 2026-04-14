import React from 'react';
import Link from 'next/link';
import { FaChevronRight, FaFire, FaGift, FaHeadset, FaTags, FaStore } from 'react-icons/fa';
import AmazonPageShell from '../../components/amazon/AmazonPageShell';
import { categories } from '../../data/amazonData';

const quickLinks = [
  {
    title: "Today's Deals",
    description: 'Save big on limited-time markdowns and coupons.',
    href: '/amazon/todays-deals',
    icon: FaFire
  },
  {
    title: 'Customer Service',
    description: 'Track orders, return items, and contact support teams.',
    href: '/amazon/customer-service',
    icon: FaHeadset
  },
  {
    title: 'Registry',
    description: 'Create wedding, baby, and celebration registries.',
    href: '/amazon/registry',
    icon: FaGift
  },
  {
    title: 'Gift Cards',
    description: 'Choose print, email, and custom gift card designs.',
    href: '/amazon/gift-cards',
    icon: FaTags
  },
  {
    title: 'Sell',
    description: 'Launch your Amazon storefront and reach new buyers.',
    href: '/amazon/sell',
    icon: FaStore
  }
];

const AmazonAllPage = () => {
  return (
    <AmazonPageShell
      title="All Departments & Programs - Amazon.com"
      description="Browse all Amazon departments, featured programs, and shopping shortcuts."
      breadcrumb="All"
    >
      <section
        style={{
          background: 'linear-gradient(90deg, #131921 0%, #232f3e 65%, #1f3f61 100%)',
          borderRadius: '8px',
          color: 'white',
          padding: '28px'
        }}
      >
        <h1 style={{ fontSize: '34px', marginBottom: '8px' }}>Shop by Department</h1>
        <p style={{ fontSize: '15px', maxWidth: '760px', color: '#d5dee7', margin: 0 }}>
          Explore the complete Amazon directory. Use department shortcuts, discover category collections,
          and jump directly into featured services.
        </p>
      </section>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '20px',
          marginTop: '20px'
        }}
        className="amazon-all-layout"
      >
        <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>All Departments</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: '16px'
            }}
            className="amazon-all-categories"
          >
            {categories.map((category) => (
              <div
                key={category.id}
                style={{
                  border: '1px solid #d5d9d9',
                  borderRadius: '8px',
                  padding: '14px'
                }}
              >
                <Link
                  href={`/amazon/category/${category.id}`}
                  style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#0f1111',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '10px'
                  }}
                >
                  {category.name}
                  <FaChevronRight style={{ fontSize: '12px', color: '#565959' }} />
                </Link>

                <div style={{ display: 'grid', gap: '8px' }}>
                  {category.subcategories.slice(0, 6).map((subcategory) => (
                    <Link
                      key={subcategory.id}
                      href={`/amazon/category/${category.id}?sub=${subcategory.id}`}
                      style={{
                        fontSize: '14px',
                        color: '#007185',
                        textDecoration: 'none'
                      }}
                    >
                      {subcategory.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gap: '16px', alignContent: 'start' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px' }}>
            <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>Programs & Features</h3>
            <div style={{ display: 'grid', gap: '10px' }}>
              {quickLinks.map((linkItem) => {
                const Icon = linkItem.icon;
                return (
                  <Link
                    key={linkItem.href}
                    href={linkItem.href}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '18px 1fr',
                      gap: '10px',
                      alignItems: 'start',
                      textDecoration: 'none',
                      border: '1px solid #d5d9d9',
                      borderRadius: '8px',
                      padding: '10px'
                    }}
                  >
                    <Icon style={{ color: '#ff9900', marginTop: '3px' }} />
                    <span>
                      <span style={{ display: 'block', color: '#0f1111', fontWeight: 700, fontSize: '14px' }}>
                        {linkItem.title}
                      </span>
                      <span style={{ display: 'block', color: '#565959', fontSize: '12px', marginTop: '2px' }}>
                        {linkItem.description}
                      </span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px' }}>
            <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>Shopping Shortcuts</h3>
            <div style={{ display: 'grid', gap: '8px' }}>
              <Link href="/amazon/search?category=all" style={{ color: '#007185', textDecoration: 'none', fontSize: '14px' }}>
                View all products
              </Link>
              <Link href="/amazon/cart" style={{ color: '#007185', textDecoration: 'none', fontSize: '14px' }}>
                Go to cart and checkout
              </Link>
              <Link href="/amazon/category/electronics" style={{ color: '#007185', textDecoration: 'none', fontSize: '14px' }}>
                Shop Electronics
              </Link>
              <Link href="/amazon/category/home-garden" style={{ color: '#007185', textDecoration: 'none', fontSize: '14px' }}>
                Shop Home & Kitchen
              </Link>
              <Link href="/amazon/category/books" style={{ color: '#007185', textDecoration: 'none', fontSize: '14px' }}>
                Shop Books
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @media (max-width: 1000px) {
          .amazon-all-layout {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 760px) {
          .amazon-all-categories {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </AmazonPageShell>
  );
};

export default AmazonAllPage;
