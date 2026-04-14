import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { FaCheckCircle, FaSearch, FaTruck } from 'react-icons/fa';
import AmazonPageShell from '../../components/amazon/AmazonPageShell';

const mockOrders = [
  {
    id: '114-6723519-1884214',
    date: 'April 8, 2026',
    total: 129.99,
    status: 'Shipped',
    eta: 'Arriving Apr 13',
    items: [
      { id: 'iphone-15-pro', title: 'iPhone 15 Pro 128GB - Natural Titanium', image: '/images/amazon/products/electronics/smartphones/iphone-15-pro-1.jpg' }
    ]
  },
  {
    id: '114-5028812-4457310',
    date: 'March 29, 2026',
    total: 36.42,
    status: 'Delivered',
    eta: 'Delivered Apr 2',
    items: [
      { id: 'atomic-habits', title: 'Atomic Habits', image: '/images/amazon/products/books/non-fiction/atomic-habits-1.jpg' },
      { id: 'instant-pot-duo', title: 'Instant Pot Duo 7-in-1', image: '/images/amazon/products/home-garden/kitchen/instant-pot-duo-1.jpg' }
    ]
  },
  {
    id: '114-9812270-5512907',
    date: 'February 14, 2026',
    total: 79.0,
    status: 'Delivered',
    eta: 'Delivered Feb 18',
    items: [
      { id: 'yeti-rambler', title: 'YETI Rambler Tumbler', image: '/images/amazon/products/sports/outdoor-recreation/yeti-tumbler-1.jpg' }
    ]
  }
];

const tabs = [
  { id: 'orders', label: 'Your Orders' },
  { id: 'returns', label: 'Returns' },
  { id: 'buy-again', label: 'Buy Again' }
];

const AmazonOrdersPage = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [query, setQuery] = useState('');
  const [year, setYear] = useState('2026');
  const [notice, setNotice] = useState('');

  const visibleOrders = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return mockOrders.filter((order) => {
      const matchYear = year === 'all' || order.date.includes(year);
      const matchQuery =
        normalized.length === 0 ||
        order.id.toLowerCase().includes(normalized) ||
        order.items.some((item) => item.title.toLowerCase().includes(normalized));

      if (activeTab === 'returns') {
        return matchYear && matchQuery && order.status === 'Delivered';
      }

      if (activeTab === 'buy-again') {
        return matchYear && matchQuery && order.status === 'Delivered';
      }

      return matchYear && matchQuery;
    });
  }, [activeTab, query, year]);

  return (
    <AmazonPageShell
      title="Your Orders"
      description="View your order history, track packages, and start returns."
      breadcrumb="Returns & Orders"
    >
      <section style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '12px' }}>Your Orders</h1>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '14px' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              style={{
                border: activeTab === tab.id ? '1px solid #e47911' : '1px solid #d5d9d9',
                backgroundColor: activeTab === tab.id ? '#fff7ec' : 'white',
                borderRadius: '999px',
                padding: '8px 14px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 220px', gap: '10px' }} className="amazon-orders-filters">
          <div style={{ position: 'relative' }}>
            <FaSearch style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#565959' }} />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by order ID or product name"
              style={{ width: '100%', height: '40px', border: '1px solid #d5d9d9', borderRadius: '999px', padding: '0 12px 0 36px' }}
            />
          </div>

          <select
            value={year}
            onChange={(event) => setYear(event.target.value)}
            style={{ width: '100%', height: '40px', border: '1px solid #d5d9d9', borderRadius: '999px', padding: '0 10px' }}
          >
            <option value="2026">2026</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="all">All years</option>
          </select>
        </div>
      </section>

      <section style={{ marginTop: '16px', display: 'grid', gap: '12px' }}>
        {visibleOrders.map((order) => (
          <article key={order.id} style={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #d5d9d9', overflow: 'hidden' }}>
            <div style={{ backgroundColor: '#f0f2f2', padding: '12px 16px', display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '10px' }} className="amazon-order-meta">
              <div>
                <p style={{ margin: 0, fontSize: '11px', color: '#565959' }}>ORDER PLACED</p>
                <p style={{ margin: 0, fontSize: '13px' }}>{order.date}</p>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '11px', color: '#565959' }}>TOTAL</p>
                <p style={{ margin: 0, fontSize: '13px' }}>${order.total.toFixed(2)}</p>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '11px', color: '#565959' }}>STATUS</p>
                <p style={{ margin: 0, fontSize: '13px' }}>{order.status}</p>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '11px', color: '#565959' }}>ORDER #</p>
                <p style={{ margin: 0, fontSize: '13px' }}>{order.id}</p>
              </div>
            </div>

            <div style={{ padding: '14px 16px' }}>
              <p style={{ marginTop: 0, marginBottom: '10px', color: '#067d62', fontSize: '14px' }}>
                <FaTruck style={{ marginRight: '6px' }} /> {order.eta}
              </p>

              <div style={{ display: 'grid', gap: '10px' }}>
                {order.items.map((item) => (
                  <div key={`${order.id}-${item.id}`} style={{ display: 'grid', gridTemplateColumns: '80px 1fr auto', gap: '12px', alignItems: 'center' }} className="amazon-order-item-row">
                    <img src={item.image} alt={item.title} style={{ width: '80px', height: '80px', objectFit: 'contain', backgroundColor: '#f7f7f7', borderRadius: '6px' }} />
                    <div>
                      <p style={{ margin: '0 0 6px', fontSize: '14px', color: '#007185' }}>{item.title}</p>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <Link
                          href={`/amazon/product/${item.id}`}
                          style={{ border: '1px solid #d5d9d9', borderRadius: '999px', padding: '6px 10px', textDecoration: 'none', color: '#0f1111', fontSize: '12px' }}
                        >
                          View item
                        </Link>
                        <button
                          type="button"
                          style={{ border: '1px solid #d5d9d9', borderRadius: '999px', padding: '6px 10px', backgroundColor: 'white', cursor: 'pointer', fontSize: '12px' }}
                          onClick={() => setNotice(`Tracking details opened for order ${order.id}`)}
                        >
                          Track package
                        </button>
                      </div>
                    </div>

                    {order.status === 'Delivered' ? (
                      <button
                        type="button"
                        style={{ border: '1px solid #d5d9d9', borderRadius: '999px', padding: '8px 12px', backgroundColor: 'white', cursor: 'pointer', fontSize: '12px', whiteSpace: 'nowrap' }}
                        onClick={() => setNotice(`Return flow started for ${item.title}`)}
                      >
                        Return or replace items
                      </button>
                    ) : (
                      <span style={{ fontSize: '12px', color: '#565959' }}>Preparing shipment</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </article>
        ))}

        {visibleOrders.length === 0 && (
          <p style={{ margin: 0, backgroundColor: 'white', borderRadius: '8px', border: '1px solid #d5d9d9', padding: '14px' }}>
            No orders found for the selected filters.
          </p>
        )}

        {notice && (
          <p style={{ margin: 0, backgroundColor: 'white', borderRadius: '8px', border: '1px solid #d5d9d9', padding: '12px', color: '#067d62', fontSize: '13px' }}>
            <FaCheckCircle style={{ marginRight: '6px' }} />
            {notice}
          </p>
        )}
      </section>

      <style jsx global>{`
        @media (max-width: 900px) {
          .amazon-orders-filters {
            grid-template-columns: 1fr !important;
          }

          .amazon-order-meta {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }

          .amazon-order-item-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </AmazonPageShell>
  );
};

export default AmazonOrdersPage;
