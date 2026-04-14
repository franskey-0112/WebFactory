import React from 'react';

const footerColumns = [
  {
    title: 'Get to Know Us',
    links: [
      { label: 'Careers', href: '/careerlink/jobs' },
      { label: 'Blog', href: '/amazon' },
      { label: 'About Amazon', href: '/amazon' },
      { label: 'Investor Relations', href: '/amazon' },
      { label: 'Amazon Devices', href: '/amazon/category/electronics' },
      { label: 'Amazon Science', href: '/amazon' }
    ]
  },
  {
    title: 'Make Money with Us',
    links: [
      { label: 'Sell products on Amazon', href: '/amazon/sell' },
      { label: 'Sell on Amazon Business', href: '/amazon/sell' },
      { label: 'Sell apps on Amazon', href: '/amazon/sell' },
      { label: 'Become an Affiliate', href: '/amazon/sell' },
      { label: 'Advertise Your Products', href: '/amazon/sell' },
      { label: 'Self-Publish with Us', href: '/amazon/sell' }
    ]
  },
  {
    title: 'Amazon Payment Products',
    links: [
      { label: 'Amazon Business Card', href: '/amazon/gift-cards' },
      { label: 'Shop with Points', href: '/amazon/gift-cards' },
      { label: 'Reload Your Balance', href: '/amazon/gift-cards' },
      { label: 'Amazon Currency Converter', href: '/amazon/gift-cards' }
    ]
  },
  {
    title: 'Let Us Help You',
    links: [
      { label: 'Amazon and COVID-19', href: '/amazon/customer-service' },
      { label: 'Your Account', href: '/amazon/account' },
      { label: 'Your Orders', href: '/amazon/orders' },
      { label: 'Shipping Rates & Policies', href: '/amazon/customer-service' },
      { label: 'Returns & Replacements', href: '/amazon/customer-service' },
      { label: 'Help', href: '/amazon/customer-service' }
    ]
  }
];

const legalLinks = [
  { label: 'Conditions of Use', href: '/amazon/customer-service' },
  { label: 'Privacy Notice', href: '/amazon/customer-service' },
  { label: 'Consumer Health Data Privacy Disclosure', href: '/amazon/customer-service' },
  { label: 'Your Ads Privacy Choices', href: '/amazon/customer-service' }
];

const AmazonFooter = () => {
  return (
    <footer>
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
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#485769';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#37475a';
        }}
      >
        Back to top
      </button>

      <div style={{ backgroundColor: '#232f3e', padding: '40px 20px' }}>
        <div
          style={{
            maxWidth: '1000px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '40px'
          }}
          className="footer-grid-responsive"
        >
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 style={{ color: 'white', fontSize: '16px', fontWeight: 'bold', marginBottom: '12px' }}>
                {column.title}
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {column.links.map((item) => (
                  <li key={item.label} style={{ marginBottom: '8px' }}>
                    <a href={item.href} style={{ color: '#ddd', fontSize: '14px', textDecoration: 'none' }}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          backgroundColor: '#131921',
          padding: '30px 20px',
          textAlign: 'center'
        }}
      >
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>
          amazon<span style={{ color: '#ff9900' }}>.com</span>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '16px'
          }}
        >
          {legalLinks.map((item) => (
            <a key={item.label} href={item.href} style={{ color: '#ddd', fontSize: '12px', textDecoration: 'none' }}>
              {item.label}
            </a>
          ))}
        </div>

        <p style={{ color: '#999', fontSize: '12px' }}>© 1996-2026, Amazon.com, Inc. or its affiliates</p>
      </div>

      <style jsx global>{`
        @media (max-width: 1200px) {
          .footer-grid-responsive {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 600px) {
          .footer-grid-responsive {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default AmazonFooter;
