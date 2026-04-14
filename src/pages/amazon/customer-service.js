import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { FaChevronDown, FaChevronUp, FaCommentAlt, FaHeadset, FaMapMarkerAlt, FaUndoAlt, FaBoxOpen } from 'react-icons/fa';
import AmazonPageShell from '../../components/amazon/AmazonPageShell';

const supportCards = [
  {
    id: 'orders',
    title: 'A delivery, order, or return',
    description: 'Track your package, cancel items, start returns, or print labels.',
    icon: FaBoxOpen,
    href: '/amazon/cart'
  },
  {
    id: 'refund',
    title: 'Refund and replacement help',
    description: 'Check refund status and replacement eligibility by order date.',
    icon: FaUndoAlt,
    href: '/amazon/customer-service#faqs'
  },
  {
    id: 'account',
    title: 'Account settings support',
    description: 'Update login details, language settings, and communication preferences.',
    icon: FaMapMarkerAlt,
    href: '/amazon/customer-service#quick-actions'
  },
  {
    id: 'contact',
    title: 'Contact customer support',
    description: 'Open chat or request a callback with a specialist agent.',
    icon: FaHeadset,
    href: '/amazon/customer-service#contact'
  }
];

const faqItems = [
  {
    question: 'How do I start a return for an item from my order?',
    answer:
      'Go to Your Orders, choose the item, and select Return or Replace Items. Select the reason, preferred refund method, and label option. Most eligible returns can be dropped off at no cost within 30 days.'
  },
  {
    question: 'When will I receive my refund?',
    answer:
      'After your return is scanned, refunds are usually completed within 3 to 5 business days to your original payment method. Gift card refunds generally appear faster.'
  },
  {
    question: 'Can I change my delivery address after placing an order?',
    answer:
      'Address changes are available before shipment on eligible orders. Open your order details and choose Change shipping address. Once dispatched, delivery changes depend on carrier support.'
  },
  {
    question: 'How can I talk to a live customer service associate?',
    answer:
      'Use the Contact Us area on this page to start a live chat or request a callback. Support agents are available 24/7 for account, order, and payment questions.'
  }
];

const quickActions = [
  'Track package status',
  'Cancel an unshipped item',
  'Start return or replacement',
  'Report a missing package',
  'Update communication preferences',
  'Manage saved addresses'
];

const AmazonCustomerServicePage = () => {
  const [keyword, setKeyword] = useState('');
  const [openIndex, setOpenIndex] = useState(0);

  const filteredCards = useMemo(() => {
    if (!keyword.trim()) {
      return supportCards;
    }

    const normalized = keyword.toLowerCase();
    return supportCards.filter(
      (item) =>
        item.title.toLowerCase().includes(normalized) ||
        item.description.toLowerCase().includes(normalized)
    );
  }, [keyword]);

  return (
    <AmazonPageShell
      title="Customer Service - Amazon.com"
      description="Get help with orders, returns, account settings, and support contact options."
      breadcrumb="Customer Service"
    >
      <section
        style={{
          background: 'linear-gradient(90deg, #232f3e 0%, #1f3f61 70%, #0e5f7e 100%)',
          borderRadius: '8px',
          padding: '26px',
          color: 'white'
        }}
      >
        <h1 style={{ fontSize: '34px', marginBottom: '8px' }}>Welcome to Amazon Customer Service</h1>
        <p style={{ margin: 0, color: '#d8e9f3', maxWidth: '820px' }}>
          Select a support topic to resolve your issue quickly. You can handle most order, delivery, and return requests
          in just a few steps.
        </p>
      </section>

      <section style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', marginTop: '20px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>Search help topics</h2>
        <input
          type="text"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          placeholder="Type keywords such as return, refund, delivery, account..."
          style={{
            width: '100%',
            height: '42px',
            borderRadius: '999px',
            border: '1px solid #d5d9d9',
            padding: '0 16px',
            fontSize: '14px'
          }}
        />
      </section>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
          gap: '14px',
          marginTop: '20px'
        }}
        className="amazon-support-grid"
      >
        {filteredCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.id}
              href={card.href}
              style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                border: '1px solid #d5d9d9',
                padding: '18px',
                textDecoration: 'none',
                color: '#0f1111'
              }}
            >
              <Icon style={{ color: '#007185', fontSize: '20px', marginBottom: '8px' }} />
              <h3 style={{ fontSize: '17px', margin: '0 0 8px' }}>{card.title}</h3>
              <p style={{ margin: 0, fontSize: '13px', color: '#565959', lineHeight: 1.45 }}>{card.description}</p>
            </Link>
          );
        })}

        {filteredCards.length === 0 && (
          <p style={{ gridColumn: '1 / -1', backgroundColor: 'white', borderRadius: '8px', padding: '18px', margin: 0 }}>
            No direct match found. Try keywords like <strong>delivery</strong>, <strong>return</strong>, or <strong>refund</strong>.
          </p>
        )}
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', marginTop: '20px' }} className="amazon-support-sections">
        <div id="faqs" style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '14px' }}>Frequently Asked Questions</h2>
          <div style={{ display: 'grid', gap: '10px' }}>
            {faqItems.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={faq.question} style={{ border: '1px solid #d5d9d9', borderRadius: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      background: 'white',
                      border: 'none',
                      padding: '14px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '15px',
                      cursor: 'pointer'
                    }}
                  >
                    <span>{faq.question}</span>
                    {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                  {isOpen && (
                    <p style={{ margin: 0, padding: '0 14px 14px', color: '#565959', fontSize: '14px', lineHeight: 1.55 }}>
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ display: 'grid', gap: '14px', alignContent: 'start' }}>
          <div id="quick-actions" style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>Quick Actions</h2>
            <div style={{ display: 'grid', gap: '8px' }}>
              {quickActions.map((action) => (
                <button
                  key={action}
                  type="button"
                  style={{
                    backgroundColor: '#f7fafa',
                    border: '1px solid #d5d9d9',
                    borderRadius: '8px',
                    padding: '10px 12px',
                    textAlign: 'left',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  {action}
                </button>
              ))}
            </div>
          </div>

          <div id="contact" style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>Contact Us</h2>
            <p style={{ marginTop: 0, marginBottom: '12px', color: '#565959', fontSize: '14px' }}>
              Need help from a specialist? Start live chat or request a callback.
            </p>
            <div style={{ display: 'grid', gap: '10px' }}>
              <button
                type="button"
                style={{
                  backgroundColor: '#ffd814',
                  border: '1px solid #fcd200',
                  borderRadius: '999px',
                  padding: '10px 14px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                <FaCommentAlt style={{ marginRight: '6px' }} /> Start Live Chat
              </button>
              <button
                type="button"
                style={{
                  backgroundColor: 'white',
                  border: '1px solid #d5d9d9',
                  borderRadius: '999px',
                  padding: '10px 14px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                <FaHeadset style={{ marginRight: '6px' }} /> Request a Callback
              </button>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @media (max-width: 1100px) {
          .amazon-support-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }

          .amazon-support-sections {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 620px) {
          .amazon-support-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </AmazonPageShell>
  );
};

export default AmazonCustomerServicePage;
