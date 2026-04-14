import React, { useMemo, useState } from 'react';
import { FaGift, FaHeart, FaHome, FaBaby, FaSearch } from 'react-icons/fa';
import AmazonPageShell from '../../components/amazon/AmazonPageShell';

const registryTypes = [
  {
    id: 'wedding',
    title: 'Wedding Registry',
    description: 'Build your dream wishlist for the big day and beyond.',
    icon: FaHeart,
    image: '/images/amazon/banners/prime-day.jpg'
  },
  {
    id: 'baby',
    title: 'Baby Registry',
    description: 'Prepare essentials from newborn basics to nursery setup.',
    icon: FaBaby,
    image: '/images/amazon/banners/books-sale.jpg'
  },
  {
    id: 'housewarming',
    title: 'Housewarming Registry',
    description: 'Share what you need for your new home, kitchen, and decor.',
    icon: FaHome,
    image: '/images/amazon/banners/electronics-sale.jpg'
  }
];

const sampleRegistries = [
  {
    id: 'reg-001',
    owner: 'Ava & Liam Carter',
    type: 'wedding',
    date: 'May 18, 2026',
    location: 'Austin, TX',
    completion: 68,
    itemsRemaining: 27
  },
  {
    id: 'reg-002',
    owner: 'Sophia Martinez',
    type: 'baby',
    date: 'Jun 03, 2026',
    location: 'San Diego, CA',
    completion: 44,
    itemsRemaining: 39
  },
  {
    id: 'reg-003',
    owner: 'Noah Johnson',
    type: 'housewarming',
    date: 'Apr 28, 2026',
    location: 'Seattle, WA',
    completion: 81,
    itemsRemaining: 12
  },
  {
    id: 'reg-004',
    owner: 'Emma Wilson',
    type: 'baby',
    date: 'Jul 12, 2026',
    location: 'Denver, CO',
    completion: 26,
    itemsRemaining: 58
  }
];

const AmazonRegistryPage = () => {
  const [searchText, setSearchText] = useState('');
  const [eventType, setEventType] = useState('all');

  const filteredRegistries = useMemo(() => {
    const normalized = searchText.trim().toLowerCase();

    return sampleRegistries.filter((registry) => {
      const matchType = eventType === 'all' || registry.type === eventType;
      const matchText =
        normalized.length === 0 ||
        registry.owner.toLowerCase().includes(normalized) ||
        registry.location.toLowerCase().includes(normalized);
      return matchType && matchText;
    });
  }, [eventType, searchText]);

  return (
    <AmazonPageShell
      title="Amazon Registry & Gift Lists"
      description="Create and find wedding, baby, and housewarming registries on Amazon."
      breadcrumb="Registry"
    >
      <section
        style={{
          background: 'linear-gradient(95deg, #f7f4f9 0%, #f3f7fb 50%, #eef5ff 100%)',
          borderRadius: '8px',
          padding: '26px',
          border: '1px solid #dde8f5'
        }}
      >
        <h1 style={{ fontSize: '34px', marginBottom: '8px', color: '#131921' }}>Amazon Registry & Gift Lists</h1>
        <p style={{ margin: 0, color: '#4d5a68', maxWidth: '780px', fontSize: '15px' }}>
          Create registries for every milestone and make gifting simple for family and friends. Organize your must-have
          items, share your list, and track gifts in one place.
        </p>
      </section>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          gap: '16px',
          marginTop: '20px'
        }}
        className="amazon-registry-types"
      >
        {registryTypes.map((type) => {
          const Icon = type.icon;
          return (
            <article key={type.id} style={{ backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden' }}>
              <img src={type.image} alt={type.title} style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
              <div style={{ padding: '16px' }}>
                <Icon style={{ color: '#e47911', fontSize: '20px', marginBottom: '8px' }} />
                <h2 style={{ margin: '0 0 8px', fontSize: '20px' }}>{type.title}</h2>
                <p style={{ margin: 0, color: '#565959', fontSize: '14px', lineHeight: 1.45 }}>{type.description}</p>
                <button
                  type="button"
                  style={{
                    marginTop: '12px',
                    borderRadius: '999px',
                    border: '1px solid #d5d9d9',
                    backgroundColor: 'white',
                    padding: '8px 14px',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  Create {type.title}
                </button>
              </div>
            </article>
          );
        })}
      </section>

      <section style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', marginTop: '20px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>Find a Registry</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }} className="amazon-registry-filters">
          <div style={{ position: 'relative' }}>
            <FaSearch style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#565959' }} />
            <input
              type="text"
              placeholder="Search by registrant name or city"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              style={{
                width: '100%',
                height: '40px',
                border: '1px solid #d5d9d9',
                borderRadius: '999px',
                padding: '0 12px 0 36px'
              }}
            />
          </div>
          <select
            value={eventType}
            onChange={(event) => setEventType(event.target.value)}
            style={{
              width: '100%',
              height: '40px',
              border: '1px solid #d5d9d9',
              borderRadius: '999px',
              padding: '0 12px'
            }}
          >
            <option value="all">All event types</option>
            <option value="wedding">Wedding</option>
            <option value="baby">Baby</option>
            <option value="housewarming">Housewarming</option>
          </select>
        </div>

        <div style={{ marginTop: '16px', display: 'grid', gap: '12px' }}>
          {filteredRegistries.map((registry) => (
            <article
              key={registry.id}
              style={{
                border: '1px solid #d5d9d9',
                borderRadius: '8px',
                padding: '14px',
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: '14px'
              }}
            >
              <div>
                <p style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>{registry.owner}</p>
                <p style={{ margin: '4px 0', color: '#565959', fontSize: '13px' }}>
                  {registry.type.charAt(0).toUpperCase() + registry.type.slice(1)} registry · {registry.location} · Event date {registry.date}
                </p>
                <div style={{ marginTop: '8px' }}>
                  <div style={{ height: '8px', backgroundColor: '#f1f3f3', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{ width: `${registry.completion}%`, height: '100%', backgroundColor: '#e47911' }} />
                  </div>
                  <p style={{ margin: '6px 0 0', fontSize: '12px', color: '#565959' }}>
                    {registry.completion}% fulfilled · {registry.itemsRemaining} items remaining
                  </p>
                </div>
              </div>
              <button
                type="button"
                style={{
                  alignSelf: 'center',
                  border: '1px solid #d5d9d9',
                  borderRadius: '999px',
                  backgroundColor: 'white',
                  padding: '8px 14px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                View Registry
              </button>
            </article>
          ))}

          {filteredRegistries.length === 0 && (
            <p style={{ margin: 0, padding: '14px', border: '1px solid #d5d9d9', borderRadius: '8px' }}>
              No registries match your search. Try a different name or event type.
            </p>
          )}
        </div>
      </section>

      <section
        style={{
          marginTop: '20px',
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '20px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px'
        }}
        className="amazon-registry-bottom"
      >
        <div>
          <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>Benefits for You</h2>
          <ul style={{ margin: 0, paddingLeft: '18px', color: '#565959', lineHeight: 1.7 }}>
            <li>Easy sharing with one registry link</li>
            <li>Checklist recommendations by life event</li>
            <li>Thank-you list and purchase tracking</li>
            <li>Group gifting and surprise protection options</li>
          </ul>
        </div>

        <div>
          <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>Benefits for Guests</h2>
          <ul style={{ margin: 0, paddingLeft: '18px', color: '#565959', lineHeight: 1.7 }}>
            <li>Fast filters by price, shipping speed, and category</li>
            <li>Gift wrap and message options at checkout</li>
            <li>Address privacy with secure shipping</li>
            <li>Convenient mobile checkout experience</li>
          </ul>
          <p style={{ marginTop: '12px', marginBottom: 0, color: '#565959', fontSize: '13px' }}>
            <FaGift style={{ marginRight: '6px', color: '#e47911' }} />
            Registry support is available daily through Customer Service.
          </p>
        </div>
      </section>

      <style jsx global>{`
        @media (max-width: 1050px) {
          .amazon-registry-types,
          .amazon-registry-bottom {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 720px) {
          .amazon-registry-filters {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </AmazonPageShell>
  );
};

export default AmazonRegistryPage;
