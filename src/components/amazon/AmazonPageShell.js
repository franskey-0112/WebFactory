import React, { useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import AmazonHeader from './AmazonHeader';
import AmazonFooter from './AmazonFooter';

const AmazonPageShell = ({ title, description, breadcrumb, children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('amazon-cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  }, []);

  const cartCount = useMemo(() => {
    return cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
  }, [cartItems]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={{ backgroundColor: '#eaeded', minHeight: '100vh' }}>
        <AmazonHeader cartItemCount={cartCount} />

        <main style={{ maxWidth: '1500px', margin: '0 auto', padding: '20px 16px 40px' }}>
          {breadcrumb && (
            <div style={{ fontSize: '12px', marginBottom: '16px', color: '#565959' }}>
              <Link href="/amazon" style={{ color: '#007185', textDecoration: 'none' }}>
                Amazon Home
              </Link>
              <span> / </span>
              <span>{breadcrumb}</span>
            </div>
          )}
          {children}
        </main>

        <AmazonFooter />
      </div>
    </>
  );
};

export default AmazonPageShell;
