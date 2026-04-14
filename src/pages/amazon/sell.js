import React, { useMemo, useState } from 'react';
import { FaChartLine, FaCheckCircle, FaStore, FaTruck, FaUsers } from 'react-icons/fa';
import AmazonPageShell from '../../components/amazon/AmazonPageShell';

const onboardingSteps = [
  {
    title: 'Create your seller account',
    description: 'Provide business details, identity verification, and payout information.'
  },
  {
    title: 'List your products',
    description: 'Upload catalog details, pricing, inventory, and high-quality images.'
  },
  {
    title: 'Ship and fulfill orders',
    description: 'Use Fulfillment by Amazon or ship directly to customers from your warehouse.'
  },
  {
    title: 'Grow with analytics',
    description: 'Use sponsored ads, promotions, and performance dashboards to scale.'
  }
];

const AmazonSellPage = () => {
  const [unitPrice, setUnitPrice] = useState(40);
  const [monthlyOrders, setMonthlyOrders] = useState(250);
  const [shippingModel, setShippingModel] = useState('fba');
  const [businessName, setBusinessName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('electronics');
  const [submitted, setSubmitted] = useState(false);

  const estimate = useMemo(() => {
    const revenue = unitPrice * monthlyOrders;
    const referralFee = revenue * 0.15;
    const fulfillmentFee = shippingModel === 'fba' ? monthlyOrders * 4.8 : monthlyOrders * 2.2;
    const subscriptionFee = 39.99;
    const net = revenue - referralFee - fulfillmentFee - subscriptionFee;

    return {
      revenue,
      fees: referralFee + fulfillmentFee + subscriptionFee,
      net: Math.max(net, 0)
    };
  }, [monthlyOrders, shippingModel, unitPrice]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!businessName.trim() || !contactName.trim() || !email.trim()) {
      setSubmitted(false);
      return;
    }
    setSubmitted(true);
  };

  return (
    <AmazonPageShell
      title="Sell on Amazon"
      description="Launch and grow your ecommerce business by selling products on Amazon."
      breadcrumb="Sell"
    >
      <section
        style={{
          borderRadius: '8px',
          background: 'linear-gradient(90deg, #131921 0%, #1d3557 45%, #0f6292 100%)',
          color: 'white',
          padding: '26px'
        }}
      >
        <h1 style={{ fontSize: '34px', marginBottom: '8px' }}>Sell on Amazon</h1>
        <p style={{ margin: 0, color: '#dce8f4', maxWidth: '820px', fontSize: '15px' }}>
          Reach millions of customers, build your brand, and grow with powerful fulfillment and advertising tools.
          Start selling with flexible plans designed for businesses of every size.
        </p>
      </section>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
          gap: '14px',
          marginTop: '20px'
        }}
        className="amazon-sell-stats"
      >
        {[
          { icon: FaUsers, title: '300M+', subtitle: 'Active customer accounts' },
          { icon: FaStore, title: '200+', subtitle: 'Countries and territories reached' },
          { icon: FaTruck, title: 'Fast Delivery', subtitle: 'Fulfillment by Amazon network' },
          { icon: FaChartLine, title: 'Powerful Insights', subtitle: 'Business reports and analytics' }
        ].map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.title} style={{ backgroundColor: 'white', borderRadius: '8px', padding: '16px' }}>
              <Icon style={{ color: '#e47911', fontSize: '22px', marginBottom: '8px' }} />
              <h2 style={{ margin: '0 0 4px', fontSize: '22px' }}>{item.title}</h2>
              <p style={{ margin: 0, color: '#565959', fontSize: '13px' }}>{item.subtitle}</p>
            </article>
          );
        })}
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', marginTop: '20px' }} className="amazon-sell-main">
        <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '12px' }}>How to Start</h2>
          <div style={{ display: 'grid', gap: '12px' }}>
            {onboardingSteps.map((step, index) => (
              <div key={step.title} style={{ border: '1px solid #d5d9d9', borderRadius: '8px', padding: '14px' }}>
                <p style={{ margin: '0 0 6px', fontWeight: 700, fontSize: '16px' }}>
                  Step {index + 1}: {step.title}
                </p>
                <p style={{ margin: 0, color: '#565959', fontSize: '14px', lineHeight: 1.45 }}>{step.description}</p>
              </div>
            ))}
          </div>

          <h2 style={{ fontSize: '24px', margin: '20px 0 10px' }}>Profit Estimator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }} className="amazon-sell-estimator-form">
            <label style={{ fontSize: '13px', color: '#565959' }}>
              Average selling price (USD)
              <input
                type="number"
                min="1"
                value={unitPrice}
                onChange={(event) => setUnitPrice(Number(event.target.value) || 0)}
                style={{ width: '100%', height: '40px', marginTop: '6px', border: '1px solid #d5d9d9', borderRadius: '8px', padding: '0 10px' }}
              />
            </label>
            <label style={{ fontSize: '13px', color: '#565959' }}>
              Estimated orders / month
              <input
                type="number"
                min="1"
                value={monthlyOrders}
                onChange={(event) => setMonthlyOrders(Number(event.target.value) || 0)}
                style={{ width: '100%', height: '40px', marginTop: '6px', border: '1px solid #d5d9d9', borderRadius: '8px', padding: '0 10px' }}
              />
            </label>
          </div>

          <div style={{ marginTop: '10px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {[
              { id: 'fba', label: 'Fulfillment by Amazon' },
              { id: 'fbm', label: 'Merchant Fulfilled' }
            ].map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setShippingModel(option.id)}
                style={{
                  border: shippingModel === option.id ? '1px solid #e47911' : '1px solid #d5d9d9',
                  backgroundColor: shippingModel === option.id ? '#fff7ec' : 'white',
                  borderRadius: '999px',
                  padding: '8px 12px',
                  cursor: 'pointer'
                }}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div
            style={{
              marginTop: '14px',
              border: '1px solid #d5d9d9',
              borderRadius: '8px',
              padding: '14px',
              backgroundColor: '#f7fafa'
            }}
          >
            <p style={{ margin: '0 0 6px', fontSize: '14px' }}>Projected monthly revenue: <strong>${estimate.revenue.toFixed(2)}</strong></p>
            <p style={{ margin: '0 0 6px', fontSize: '14px' }}>Estimated fees: <strong>${estimate.fees.toFixed(2)}</strong></p>
            <p style={{ margin: 0, fontSize: '16px' }}>Estimated net proceeds: <strong>${estimate.net.toFixed(2)}</strong></p>
          </div>
        </div>

        <div style={{ display: 'grid', gap: '14px', alignContent: 'start' }}>
          <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>Start Selling</h2>

            <label style={{ display: 'block', fontSize: '13px', color: '#565959', marginBottom: '10px' }}>
              Business name
              <input
                type="text"
                value={businessName}
                onChange={(event) => setBusinessName(event.target.value)}
                style={{ width: '100%', height: '40px', marginTop: '6px', border: '1px solid #d5d9d9', borderRadius: '8px', padding: '0 10px' }}
              />
            </label>

            <label style={{ display: 'block', fontSize: '13px', color: '#565959', marginBottom: '10px' }}>
              Contact name
              <input
                type="text"
                value={contactName}
                onChange={(event) => setContactName(event.target.value)}
                style={{ width: '100%', height: '40px', marginTop: '6px', border: '1px solid #d5d9d9', borderRadius: '8px', padding: '0 10px' }}
              />
            </label>

            <label style={{ display: 'block', fontSize: '13px', color: '#565959', marginBottom: '10px' }}>
              Email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                style={{ width: '100%', height: '40px', marginTop: '6px', border: '1px solid #d5d9d9', borderRadius: '8px', padding: '0 10px' }}
              />
            </label>

            <label style={{ display: 'block', fontSize: '13px', color: '#565959', marginBottom: '12px' }}>
              Primary category
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                style={{ width: '100%', height: '40px', marginTop: '6px', border: '1px solid #d5d9d9', borderRadius: '8px', padding: '0 10px' }}
              >
                <option value="electronics">Electronics</option>
                <option value="home-garden">Home & Kitchen</option>
                <option value="books">Books</option>
                <option value="sports">Sports & Outdoors</option>
                <option value="clothing">Clothing</option>
              </select>
            </label>

            <button
              type="submit"
              style={{
                width: '100%',
                height: '42px',
                borderRadius: '999px',
                border: '1px solid #fcd200',
                backgroundColor: '#ffd814',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Create Seller Account
            </button>

            {submitted && (
              <p style={{ marginTop: '12px', marginBottom: 0, color: '#067d62', fontSize: '14px' }}>
                <FaCheckCircle style={{ marginRight: '6px' }} />
                Thanks {contactName || 'seller'}! Your onboarding request has been captured.
              </p>
            )}
          </form>

          <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>Seller Resources</h2>
            <ul style={{ margin: 0, paddingLeft: '18px', color: '#565959', lineHeight: 1.7 }}>
              <li>Seller University learning guides</li>
              <li>Brand registry and protection tools</li>
              <li>Advertising and sponsored products</li>
              <li>Global selling expansion support</li>
            </ul>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @media (max-width: 1100px) {
          .amazon-sell-stats {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }

          .amazon-sell-main {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 700px) {
          .amazon-sell-stats,
          .amazon-sell-estimator-form {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </AmazonPageShell>
  );
};

export default AmazonSellPage;
