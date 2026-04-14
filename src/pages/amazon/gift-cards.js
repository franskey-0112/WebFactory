import React, { useMemo, useState } from 'react';
import { FaCheckCircle, FaCreditCard, FaEnvelope, FaGift, FaPrint, FaQrcode } from 'react-icons/fa';
import AmazonPageShell from '../../components/amazon/AmazonPageShell';

const cardTemplates = [
  { id: 'birthday', title: 'Birthday Balloons', image: '/images/amazon/banners/books-sale.jpg' },
  { id: 'thank-you', title: 'Thank You', image: '/images/amazon/banners/electronics-sale.jpg' },
  { id: 'congrats', title: 'Congratulations', image: '/images/amazon/banners/prime-day.jpg' },
  { id: 'classic', title: 'Classic Amazon', image: '/images/amazon/products/electronics/smartphones/iphone-15-pro-1.jpg' }
];

const amountOptions = [25, 50, 75, 100, 150, 200];

const AmazonGiftCardsPage = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(cardTemplates[0].id);
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [deliveryType, setDeliveryType] = useState('email');
  const [recipient, setRecipient] = useState('');
  const [sender, setSender] = useState('');
  const [message, setMessage] = useState('Enjoy your gift!');
  const [deliveryDate, setDeliveryDate] = useState('2026-04-20');
  const [confirmation, setConfirmation] = useState('');
  const [claimCode, setClaimCode] = useState('');
  const [claimStatus, setClaimStatus] = useState('');

  const previewTemplate = useMemo(() => {
    return cardTemplates.find((item) => item.id === selectedTemplate) || cardTemplates[0];
  }, [selectedTemplate]);

  const addGiftCardToCart = () => {
    const itemId = `gift-card-${selectedTemplate}-${deliveryType}-${selectedAmount}`;

    try {
      const saved = localStorage.getItem('amazon-cart');
      const current = saved ? JSON.parse(saved) : [];
      const existing = current.findIndex((item) => item.id === itemId);

      const giftCardItem = {
        id: itemId,
        title: `Amazon Gift Card (${previewTemplate.title})`,
        price: selectedAmount,
        quantity: 1,
        image: previewTemplate.image,
        inStock: true,
        prime: false,
        seller: 'Amazon Gift Cards',
        giftCardDetails: {
          deliveryType,
          recipient,
          sender,
          message,
          deliveryDate
        }
      };

      if (existing >= 0) {
        current[existing].quantity += 1;
      } else {
        current.push(giftCardItem);
      }

      localStorage.setItem('amazon-cart', JSON.stringify(current));
      setConfirmation('Gift card added to cart successfully.');
    } catch (error) {
      console.error('Error adding gift card to cart:', error);
      setConfirmation('Unable to add gift card right now. Please try again.');
    }
  };

  const handleClaimCheck = (event) => {
    event.preventDefault();

    if (!claimCode.trim()) {
      setClaimStatus('Enter a claim code to check your balance.');
      return;
    }

    if (claimCode.trim().toUpperCase().startsWith('AMZ')) {
      setClaimStatus('This gift card is valid. Available balance: $75.00');
      return;
    }

    setClaimStatus('Code not recognized in this offline environment. Try a code that starts with AMZ.');
  };

  return (
    <AmazonPageShell
      title="Gift Cards - Amazon.com"
      description="Browse and customize Amazon gift cards with digital, printable, and physical delivery options."
      breadcrumb="Gift Cards"
    >
      <section
        style={{
          background: 'linear-gradient(95deg, #232f3e 0%, #29394d 45%, #3d4f67 100%)',
          color: 'white',
          borderRadius: '8px',
          padding: '26px'
        }}
      >
        <h1 style={{ fontSize: '34px', marginBottom: '8px' }}>Amazon Gift Cards</h1>
        <p style={{ margin: 0, color: '#d8e0ea', maxWidth: '860px' }}>
          Send gift cards by email, print-at-home, or physical mail. Choose a design, amount, and delivery date to make
          every gift personal.
        </p>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', marginTop: '20px' }} className="amazon-gift-main">
        <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '14px' }}>1. Select a design</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '10px' }} className="amazon-gift-templates">
            {cardTemplates.map((template) => (
              <button
                key={template.id}
                type="button"
                onClick={() => setSelectedTemplate(template.id)}
                style={{
                  border: selectedTemplate === template.id ? '2px solid #e47911' : '1px solid #d5d9d9',
                  borderRadius: '8px',
                  padding: '6px',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <img src={template.image} alt={template.title} style={{ width: '100%', height: '90px', objectFit: 'cover', borderRadius: '4px' }} />
                <span style={{ display: 'block', marginTop: '6px', fontSize: '12px' }}>{template.title}</span>
              </button>
            ))}
          </div>

          <h2 style={{ fontSize: '24px', margin: '20px 0 10px' }}>2. Choose amount</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {amountOptions.map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => setSelectedAmount(amount)}
                style={{
                  border: selectedAmount === amount ? '1px solid #e47911' : '1px solid #d5d9d9',
                  backgroundColor: selectedAmount === amount ? '#fff7ec' : 'white',
                  borderRadius: '999px',
                  padding: '8px 14px',
                  cursor: 'pointer'
                }}
              >
                ${amount}
              </button>
            ))}
          </div>

          <h2 style={{ fontSize: '24px', margin: '20px 0 10px' }}>3. Delivery details</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '8px', marginBottom: '12px' }}>
            {[
              { id: 'email', label: 'Email', icon: FaEnvelope },
              { id: 'print', label: 'Print at Home', icon: FaPrint },
              { id: 'mail', label: 'Physical Mail', icon: FaCreditCard }
            ].map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setDeliveryType(option.id)}
                  style={{
                    border: deliveryType === option.id ? '1px solid #e47911' : '1px solid #d5d9d9',
                    backgroundColor: deliveryType === option.id ? '#fff7ec' : 'white',
                    borderRadius: '8px',
                    padding: '10px',
                    cursor: 'pointer'
                  }}
                >
                  <Icon style={{ marginRight: '6px' }} />
                  {option.label}
                </button>
              );
            })}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }} className="amazon-gift-form-grid">
            <input
              type="text"
              value={recipient}
              onChange={(event) => setRecipient(event.target.value)}
              placeholder={deliveryType === 'email' ? 'Recipient email' : 'Recipient name'}
              style={{ height: '40px', borderRadius: '8px', border: '1px solid #d5d9d9', padding: '0 10px' }}
            />
            <input
              type="text"
              value={sender}
              onChange={(event) => setSender(event.target.value)}
              placeholder="From"
              style={{ height: '40px', borderRadius: '8px', border: '1px solid #d5d9d9', padding: '0 10px' }}
            />
            <input
              type="date"
              value={deliveryDate}
              onChange={(event) => setDeliveryDate(event.target.value)}
              style={{ height: '40px', borderRadius: '8px', border: '1px solid #d5d9d9', padding: '0 10px' }}
            />
            <input
              type="text"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              maxLength={120}
              placeholder="Message"
              style={{ height: '40px', borderRadius: '8px', border: '1px solid #d5d9d9', padding: '0 10px' }}
            />
          </div>

          <button
            type="button"
            onClick={addGiftCardToCart}
            style={{
              marginTop: '14px',
              borderRadius: '999px',
              border: '1px solid #fcd200',
              backgroundColor: '#ffd814',
              padding: '10px 18px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Add to Cart
          </button>

          {confirmation && (
            <p style={{ marginTop: '12px', marginBottom: 0, color: '#067d62', fontSize: '14px' }}>
              <FaCheckCircle style={{ marginRight: '6px' }} />
              {confirmation}
            </p>
          )}
        </div>

        <div style={{ display: 'grid', gap: '14px', alignContent: 'start' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden' }}>
            <img src={previewTemplate.image} alt={previewTemplate.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
            <div style={{ padding: '16px' }}>
              <h3 style={{ margin: '0 0 8px', fontSize: '21px' }}>Gift Card Preview</h3>
              <p style={{ margin: '0 0 4px', color: '#565959', fontSize: '14px' }}>Design: {previewTemplate.title}</p>
              <p style={{ margin: '0 0 4px', color: '#565959', fontSize: '14px' }}>Amount: ${selectedAmount.toFixed(2)}</p>
              <p style={{ margin: 0, color: '#565959', fontSize: '14px' }}>Delivery: {deliveryType}</p>
            </div>
          </div>

          <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '16px' }}>
            <h3 style={{ margin: '0 0 10px', fontSize: '21px' }}>Check Gift Card Balance</h3>
            <form onSubmit={handleClaimCheck}>
              <input
                type="text"
                value={claimCode}
                onChange={(event) => setClaimCode(event.target.value)}
                placeholder="Enter claim code"
                style={{ width: '100%', height: '40px', border: '1px solid #d5d9d9', borderRadius: '8px', padding: '0 10px' }}
              />
              <button
                type="submit"
                style={{
                  marginTop: '10px',
                  borderRadius: '999px',
                  border: '1px solid #d5d9d9',
                  backgroundColor: 'white',
                  padding: '9px 14px',
                  cursor: 'pointer'
                }}
              >
                <FaQrcode style={{ marginRight: '6px' }} /> Check Balance
              </button>
            </form>
            {claimStatus && <p style={{ marginTop: '10px', marginBottom: 0, color: '#565959', fontSize: '13px' }}>{claimStatus}</p>}
          </div>

          <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '16px' }}>
            <h3 style={{ margin: '0 0 10px', fontSize: '21px' }}>Corporate Gift Cards</h3>
            <p style={{ margin: '0 0 10px', color: '#565959', fontSize: '14px' }}>
              Reward employees, thank clients, and run team incentives with digital bulk purchases.
            </p>
            <button
              type="button"
              style={{
                borderRadius: '999px',
                border: '1px solid #d5d9d9',
                backgroundColor: 'white',
                padding: '9px 14px',
                cursor: 'pointer'
              }}
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @media (max-width: 1020px) {
          .amazon-gift-main {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 760px) {
          .amazon-gift-templates {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }

          .amazon-gift-form-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </AmazonPageShell>
  );
};

export default AmazonGiftCardsPage;
