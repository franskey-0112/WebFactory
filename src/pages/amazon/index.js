import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import AmazonHeader from '../../components/amazon/AmazonHeader';
import { 
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';
import { 
  categories, 
  products 
} from '../../data/amazonData';

const AmazonHomePage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Hero banner slides
  const heroSlides = [
    {
    id: 1,
      image: '/images/amazon/banners/electronics-sale.jpg',
      alt: 'Shop Electronics',
      bgColor: '#4a90a4'
    },
    {
      id: 2,
      image: '/images/amazon/banners/books-sale.jpg',
      alt: 'Shop Books',
      bgColor: '#a48d52'
    },
    {
      id: 3,
      image: '/images/amazon/banners/prime-day.jpg',
      alt: 'Prime Day',
      bgColor: '#2d5a7b'
    }
  ];

  // Category cards data - matching Amazon homepage layout (使用唯一图片，无重复)
  const categoryCards = [
    {
      title: 'Gaming accessories',
      items: [
        { name: 'Headsets', image: '/images/amazon/products/electronics/laptops/dell-xps-13-1.jpg', link: '/amazon/category/electronics?sub=gaming' },
        { name: 'Keyboards', image: '/images/amazon/products/electronics/laptops/dell-xps-13-2.jpg', link: '/amazon/category/electronics?sub=gaming' },
        { name: 'Computer mice', image: 'https://cdn.dummyjson.com/product-images/laptops/lenovo-yoga-920/1.webp', link: '/amazon/category/electronics?sub=gaming' },
        { name: 'Chairs', image: 'https://cdn.dummyjson.com/product-images/laptops/huawei-matebook-x-pro/1.webp', link: '/amazon/category/electronics?sub=gaming' }
      ],
      link: '/amazon/category/electronics',
      linkText: 'See more'
    },
    {
      title: 'Shop home essentials',
      items: [
        { name: 'Cleaning Tools', image: 'https://cdn.dummyjson.com/product-images/kitchen-accessories/chopping-board/1.webp', link: '/amazon/category/home-garden' },
        { name: 'Home Storage', image: 'https://cdn.dummyjson.com/product-images/kitchen-accessories/lunch-box/1.webp', link: '/amazon/category/home-garden' },
        { name: 'Home Decor', image: 'https://cdn.dummyjson.com/product-images/kitchen-accessories/black-aluminium-cup/1.webp', link: '/amazon/category/home-garden' },
        { name: 'Bedding', image: 'https://cdn.dummyjson.com/product-images/kitchen-accessories/glass/1.webp', link: '/amazon/category/home-garden' }
      ],
      link: '/amazon/category/home-garden',
      linkText: 'Discover more in Home'
    },
    {
      title: 'Kitchen & Dining',
      items: [
        { name: 'Blenders', image: 'https://cdn.dummyjson.com/product-images/kitchen-accessories/boxed-blender/1.webp', link: '/amazon/category/home-garden?sub=kitchen' },
        { name: 'Cookware', image: 'https://cdn.dummyjson.com/product-images/kitchen-accessories/carbon-steel-wok/1.webp', link: '/amazon/category/home-garden?sub=kitchen' },
        { name: 'Appliances', image: 'https://cdn.dummyjson.com/product-images/kitchen-accessories/microwave-oven/1.webp', link: '/amazon/category/home-garden?sub=kitchen' },
        { name: 'Cutlery', image: 'https://cdn.dummyjson.com/product-images/kitchen-accessories/knife/1.webp', link: '/amazon/category/home-garden?sub=kitchen' }
      ],
      link: '/amazon/category/home-garden?sub=kitchen',
      linkText: 'Shop Kitchen'
    },
    {
      title: 'Deals in Electronics',
      items: [
        { name: 'Smartphones', image: '/images/amazon/products/electronics/smartphones/iphone-15-pro-1.jpg', link: '/amazon/category/electronics?sub=smartphones' },
        { name: 'Laptops', image: '/images/amazon/products/electronics/laptops/macbook-air-m3-1.jpg', link: '/amazon/category/electronics?sub=laptops' },
        { name: 'Tablets', image: '/images/amazon/products/electronics/laptops/Apple iPad Air.jpg', link: '/amazon/category/electronics?sub=tablets' },
        { name: 'Accessories', image: '/images/amazon/accessories/charger.jpg', link: '/amazon/category/electronics?sub=accessories' }
      ],
    link: '/amazon/category/electronics',
      linkText: 'See all deals'
    }
  ];

  // Single image cards (使用唯一图片)
  const singleCards = [
    {
      title: 'Get fit at home',
      image: '/images/amazon/products/sports/outdoor-recreation/yeti-tumbler-1.jpg',
      link: '/amazon/category/sports',
      linkText: 'Explore now'
    },
    {
      title: 'Top Rated Books',
      image: '/images/amazon/products/books/non-fiction/atomic-habits-1.jpg',
      link: '/amazon/category/books',
      linkText: 'Shop now'
    }
  ];

  useEffect(() => {
    // Load cart from localStorage
    try {
      const savedCart = localStorage.getItem('amazon-cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }

    // Auto-slide hero banner
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  // Get best sellers
  const bestSellers = products.slice(0, 20);

  return (
    <>
      <Head>
        <title>Amazon.com. Spend less. Smile more.</title>
        <meta name="description" content="Free shipping on millions of items. Get the best of Shopping and Entertainment with Prime." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{ backgroundColor: '#eaeded', minHeight: '100vh' }}>
        {/* Header */}
        <AmazonHeader cartItemCount={cartItems.reduce((total, item) => total + (item.quantity || 1), 0)} />

        {/* Main Content */}
        <main>
          {/* Hero Banner with Carousel */}
          <div style={{ 
            position: 'relative', 
            height: '600px',
            overflow: 'hidden'
          }}>
            {/* Background Image */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: heroSlides[currentSlide].bgColor,
              backgroundImage: `url(${heroSlides[currentSlide].image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center top',
              transition: 'background-color 0.5s ease'
            }} />

            {/* Gradient Overlay */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '300px',
              background: 'linear-gradient(to bottom, transparent, #eaeded)'
            }} />

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              style={{
                position: 'absolute',
                left: 0,
                top: '40%',
                transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.8)',
                border: 'none',
                padding: '40px 18px',
                cursor: 'pointer',
                zIndex: 10,
                borderRadius: '0 4px 4px 0'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,1)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.8)'}
            >
              <FaChevronLeft style={{ fontSize: '20px', color: '#484848' }} />
            </button>

            <button
              onClick={nextSlide}
              style={{
                position: 'absolute',
                right: 0,
                top: '40%',
                transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.8)',
                border: 'none',
                padding: '40px 18px',
                cursor: 'pointer',
                zIndex: 10,
                borderRadius: '4px 0 0 4px'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,1)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.8)'}
            >
              <FaChevronRight style={{ fontSize: '20px', color: '#484848' }} />
            </button>
          </div>

          {/* Category Cards Grid - Overlapping Hero */}
          <div style={{
            position: 'relative',
            marginTop: '-300px',
            zIndex: 20,
            padding: '0 20px 20px',
            maxWidth: '1500px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '20px'
            }} className="amazon-grid-responsive">
              {/* Category Cards with 4 images */}
              {categoryCards.map((card, index) => (
                <div 
                  key={index}
                  style={{
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '4px',
                    height: '420px',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <h2 style={{
                    fontSize: '21px',
                    fontWeight: 'bold',
                    color: '#0f1111',
                    marginBottom: '15px',
                    lineHeight: '1.3'
                  }}>
                    {card.title}
                  </h2>
                  
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '10px',
                    flex: 1
                  }}>
                    {card.items.map((item, itemIndex) => (
                      <Link
                        key={itemIndex}
                        href={item.link}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          textDecoration: 'none'
                        }}
                      >
                        <div style={{
                          width: '100%',
                          height: '120px',
                          backgroundColor: '#f7f7f7',
                          borderRadius: '4px',
                          overflow: 'hidden'
                        }}>
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover'
                            }}
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                        <span style={{
                          fontSize: '12px',
                          color: '#0f1111',
                          marginTop: '6px',
                          lineHeight: '1.3'
                        }}>
                          {item.name}
                        </span>
                      </Link>
                    ))}
                  </div>

                  <Link
                    href={card.link}
                    style={{
                      fontSize: '13px',
                      color: '#007185',
                      textDecoration: 'none',
                      marginTop: '12px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#c7511f';
                      e.currentTarget.style.textDecoration = 'underline';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#007185';
                      e.currentTarget.style.textDecoration = 'none';
                    }}
                  >
                    {card.linkText}
                  </Link>
                </div>
              ))}

              {/* Sign In Card */}
              <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '4px',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <h2 style={{
                  fontSize: '21px',
                  fontWeight: 'bold',
                  color: '#0f1111',
                  marginBottom: '10px'
                }}>
                  Sign in for the best experience
                </h2>
                <p style={{
                  fontSize: '14px',
                  color: '#0f1111',
                  marginBottom: '15px'
                }}>
                  Sign in securely
                </p>
                <button
                  style={{
                    background: 'linear-gradient(to bottom, #f7dfa5, #f0c14b)',
                    border: '1px solid #a88734',
                    borderRadius: '3px',
                    padding: '8px 16px',
                    fontSize: '13px',
                    cursor: 'pointer',
                    width: '100%',
                    marginBottom: '12px',
                    color: '#0f1111',
                    boxShadow: '0 1px 0 rgba(255,255,255,.6) inset'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'linear-gradient(to bottom, #f5d78e, #eeb933)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'linear-gradient(to bottom, #f7dfa5, #f0c14b)'}
                >
                  Sign in securely
                </button>
                <p style={{
                  fontSize: '12px',
                  color: '#0f1111'
                }}>
                  New customer?{' '}
                  <Link
                    href="/amazon/signin"
                    style={{
                      color: '#007185',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#c7511f';
                      e.currentTarget.style.textDecoration = 'underline';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#007185';
                      e.currentTarget.style.textDecoration = 'none';
                    }}
                  >
                    Start here
                  </Link>
                </p>
              </div>

              {/* Single Image Cards */}
              {singleCards.map((card, index) => (
                <div 
                  key={`single-${index}`}
                  style={{
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '4px',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <h2 style={{
                    fontSize: '21px',
                    fontWeight: 'bold',
                    color: '#0f1111',
                    marginBottom: '15px'
                  }}>
                    {card.title}
                  </h2>
                  
                  <Link href={card.link} style={{ flex: 1 }}>
                    <div style={{
                      width: '100%',
                      height: '280px',
                      backgroundColor: '#f7f7f7',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <img
                        src={card.image}
                        alt={card.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
            </div>
                  </Link>

                  <Link
                    href={card.link}
                    style={{
                      fontSize: '13px',
                      color: '#007185',
                      textDecoration: 'none',
                      marginTop: '12px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#c7511f';
                      e.currentTarget.style.textDecoration = 'underline';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#007185';
                      e.currentTarget.style.textDecoration = 'none';
                    }}
                  >
                    {card.linkText}
                  </Link>
                </div>
                ))}
              </div>
            </div>

          {/* Best Sellers Section */}
          <div style={{
            backgroundColor: 'white',
            margin: '20px',
            padding: '20px',
            borderRadius: '4px',
            maxWidth: '1460px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            <h2 style={{
              fontSize: '21px',
              fontWeight: 'bold',
              color: '#0f1111',
              marginBottom: '16px'
            }}>
              Best Sellers in Home, Kitchen & Garden
            </h2>
            
            <div style={{
              display: 'flex',
              overflowX: 'auto',
              gap: '12px',
              paddingBottom: '10px'
            }}>
              {bestSellers.slice(0, 12).map((product) => (
                <Link
                  key={product.id}
                  href={`/amazon/product/${product.id}`}
                  style={{
                    flex: '0 0 180px',
                    textDecoration: 'none'
                  }}
                >
                  <div style={{
                    width: '180px',
                    height: '180px',
                    backgroundColor: '#f7f7f7',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    marginBottom: '8px'
                  }}>
                    <img
                      src={product.images?.[0] || '/images/placeholder-product.jpg'}
                      alt={product.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain'
                      }}
                      onError={(e) => {
                        e.target.src = '/images/placeholder-product.jpg';
                      }}
                    />
                  </div>
                </Link>
                ))}
              </div>
            </div>

          {/* More Product Sections */}
          <div style={{
            padding: '0 20px 40px',
            maxWidth: '1500px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '20px'
            }} className="amazon-grid-responsive">
              {/* Kitchen Appliances */}
              <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '4px'
              }}>
                <h2 style={{
                  fontSize: '21px',
                  fontWeight: 'bold',
                  color: '#0f1111',
                  marginBottom: '15px'
                }}>
                  Top categories in Kitchen
                </h2>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '10px'
                }}>
                  {['Cookers', 'Coffee', 'Pots & Pans', 'Kettles'].map((item, idx) => (
                    <Link
                      key={idx}
                      href="/amazon/category/home-garden?sub=kitchen"
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        textDecoration: 'none'
                      }}
                    >
                      <div style={{
                        width: '100%',
                        height: '100px',
                        backgroundColor: '#f7f7f7',
                        borderRadius: '4px'
                      }} />
                      <span style={{
                        fontSize: '12px',
                        color: '#0f1111',
                        marginTop: '6px'
                      }}>
                        {item}
                      </span>
                    </Link>
                  ))}
                </div>
                <Link
                  href="/amazon/category/home-garden"
                  style={{
                    fontSize: '13px',
                    color: '#007185',
                    textDecoration: 'none',
                    display: 'block',
                    marginTop: '12px'
                  }}
                >
                  See all kitchen products
                </Link>
              </div>

              {/* Fashion */}
              <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '4px'
              }}>
                <h2 style={{
                  fontSize: '21px',
                  fontWeight: 'bold',
                  color: '#0f1111',
                  marginBottom: '15px'
                }}>
                  Explore clothing & shoes
                </h2>
                <Link href="/amazon/category/clothing" style={{ display: 'block' }}>
                  <div style={{
                    width: '100%',
                    height: '260px',
                    backgroundColor: '#f7f7f7',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <img
                      src="/images/amazon/products/clothing/mens-clothing/levi-501-1.jpg"
                      alt="Fashion"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                  />
              </div>
                </Link>
                <Link
                  href="/amazon/category/clothing"
                  style={{
                    fontSize: '13px',
                    color: '#007185',
                    textDecoration: 'none',
                    display: 'block',
                    marginTop: '12px'
                  }}
                >
                  Shop now
                </Link>
              </div>

              {/* Books */}
              <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '4px'
              }}>
                <h2 style={{
                  fontSize: '21px',
                  fontWeight: 'bold',
                  color: '#0f1111',
                  marginBottom: '15px'
                }}>
                  Popular in Books
                </h2>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '10px'
                }}>
                  {['Fiction', 'Non-Fiction', "Children's", 'Textbooks'].map((item, idx) => (
                    <Link
                      key={idx}
                      href="/amazon/category/books"
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        textDecoration: 'none'
                      }}
                    >
                      <div style={{
                        width: '100%',
                        height: '100px',
                        backgroundColor: '#f7f7f7',
                        borderRadius: '4px',
                        overflow: 'hidden'
                      }}>
                        <img
                          src={idx % 2 === 0 ? '/images/amazon/products/books/fiction/fourth-wing-1.jpg' : '/images/amazon/products/books/non-fiction/atomic-habits-1.jpg'}
                          alt={item}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                </div>
                      <span style={{
                        fontSize: '12px',
                        color: '#0f1111',
                        marginTop: '6px'
                      }}>
                        {item}
                      </span>
                    </Link>
                  ))}
                </div>
                <Link
                  href="/amazon/category/books"
                  style={{
                    fontSize: '13px',
                    color: '#007185',
                    textDecoration: 'none',
                    display: 'block',
                    marginTop: '12px'
                  }}
                >
                  Explore all books
                </Link>
              </div>

              {/* Sports */}
              <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '4px'
              }}>
                <h2 style={{
                  fontSize: '21px',
                  fontWeight: 'bold',
                  color: '#0f1111',
                  marginBottom: '15px'
                }}>
                  Sports & Outdoors
                </h2>
                <Link href="/amazon/category/sports" style={{ display: 'block' }}>
                  <div style={{
                    width: '100%',
                    height: '260px',
                    backgroundColor: '#f7f7f7',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <img
                      src="/images/amazon/products/sports/outdoor-recreation/yeti-tumbler-1.jpg"
                      alt="Sports"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                </Link>
                <Link
                  href="/amazon/category/sports"
                  style={{
                    fontSize: '13px',
                    color: '#007185',
                    textDecoration: 'none',
                    display: 'block',
                    marginTop: '12px'
                  }}
                >
                  Explore now
                </Link>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer>
          {/* Back to Top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              width: '100%',
              backgroundColor: '#37475a',
              color: 'white',
              border: 'none',
              padding: '15px',
              fontSize: '13px',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#485769'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#37475a'}
          >
            Back to top
          </button>

          {/* Footer Links */}
          <div style={{
            backgroundColor: '#232f3e',
            padding: '40px 20px'
          }}>
            <div style={{
              maxWidth: '1000px',
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '40px'
            }} className="footer-grid-responsive">
              <div>
                <h3 style={{ color: 'white', fontSize: '16px', fontWeight: 'bold', marginBottom: '12px' }}>
                  Get to Know Us
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {[
                    { label: 'Careers', href: '/careerlink/jobs' },
                    { label: 'Blog', href: '/amazon' },
                    { label: 'About Amazon', href: '/amazon' },
                    { label: 'Investor Relations', href: '/amazon' },
                    { label: 'Amazon Devices', href: '/amazon/category/electronics' },
                    { label: 'Amazon Science', href: '/amazon' }
                  ].map((item, idx) => (
                    <li key={idx} style={{ marginBottom: '8px' }}>
                      <a href={item.href} style={{ color: '#ddd', fontSize: '14px', textDecoration: 'none' }}>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 style={{ color: 'white', fontSize: '16px', fontWeight: 'bold', marginBottom: '12px' }}>
                  Make Money with Us
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {['Sell products on Amazon', 'Sell on Amazon Business', 'Sell apps on Amazon', 'Become an Affiliate', 'Advertise Your Products', 'Self-Publish with Us'].map((item, idx) => (
                    <li key={idx} style={{ marginBottom: '8px' }}>
                      <a href="/amazon/sell" style={{ color: '#ddd', fontSize: '14px', textDecoration: 'none' }}>
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 style={{ color: 'white', fontSize: '16px', fontWeight: 'bold', marginBottom: '12px' }}>
                  Amazon Payment Products
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {['Amazon Business Card', 'Shop with Points', 'Reload Your Balance', 'Amazon Currency Converter'].map((item, idx) => (
                    <li key={idx} style={{ marginBottom: '8px' }}>
                      <a href="/amazon/gift-cards" style={{ color: '#ddd', fontSize: '14px', textDecoration: 'none' }}>
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 style={{ color: 'white', fontSize: '16px', fontWeight: 'bold', marginBottom: '12px' }}>
                  Let Us Help You
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {[
                    { label: 'Amazon and COVID-19', href: '/amazon/customer-service' },
                    { label: 'Your Account', href: '/amazon/account' },
                    { label: 'Your Orders', href: '/amazon/orders' },
                    { label: 'Shipping Rates & Policies', href: '/amazon/customer-service' },
                    { label: 'Returns & Replacements', href: '/amazon/customer-service' },
                    { label: 'Help', href: '/amazon/customer-service' }
                  ].map((item, idx) => (
                    <li key={idx} style={{ marginBottom: '8px' }}>
                      <a href={item.href} style={{ color: '#ddd', fontSize: '14px', textDecoration: 'none' }}>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              </div>
            </div>

          {/* Footer Bottom */}
          <div style={{
            backgroundColor: '#131921',
            padding: '30px 20px',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '16px'
            }}>
              amazon<span style={{ color: '#ff9900' }}>.com</span>
              </div>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '16px'
            }}>
              {['Conditions of Use', 'Privacy Notice', 'Consumer Health Data Privacy Disclosure', 'Your Ads Privacy Choices'].map((item, idx) => (
                <a key={idx} href="/amazon/customer-service" style={{ color: '#ddd', fontSize: '12px', textDecoration: 'none' }}>
                  {item}
                </a>
              ))}
            </div>
            <p style={{ color: '#999', fontSize: '12px' }}>
              © 1996-2024, Amazon.com, Inc. or its affiliates
            </p>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        @media (max-width: 1200px) {
          .amazon-grid-responsive {
            grid-template-columns: repeat(3, 1fr) !important;
          }
          .footer-grid-responsive {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 900px) {
          .amazon-grid-responsive {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .amazon-grid-responsive {
            grid-template-columns: 1fr !important;
          }
          .footer-grid-responsive {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
};

export default AmazonHomePage; 
