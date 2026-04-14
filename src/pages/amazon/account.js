import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { FaBoxOpen, FaCreditCard, FaHeart, FaLock, FaMapMarkerAlt, FaUserCircle } from 'react-icons/fa';
import AmazonPageShell from '../../components/amazon/AmazonPageShell';

const accountCards = [
  {
    id: 'orders',
    title: 'Your Orders',
    description: 'Track, return, or buy things again',
    href: '/amazon/orders',
    icon: FaBoxOpen
  },
  {
    id: 'security',
    title: 'Login & Security',
    description: 'Edit login, name, and mobile number',
    href: '/amazon/signin',
    icon: FaLock
  },
  {
    id: 'addresses',
    title: 'Your Addresses',
    description: 'Edit addresses for orders and gifts',
    href: '/amazon/account',
    icon: FaMapMarkerAlt
  },
  {
    id: 'payments',
    title: 'Payment Options',
    description: 'Manage cards and gift card balance',
    href: '/amazon/gift-cards',
    icon: FaCreditCard
  }
];

const starterLists = [
  { id: 'list-1', name: 'Home Office Upgrades', items: 14, visibility: 'Private' },
  { id: 'list-2', name: 'Summer Travel Essentials', items: 9, visibility: 'Shared' }
];

const AmazonAccountPage = () => {
  const [lists, setLists] = useState(starterLists);
  const [newListName, setNewListName] = useState('');
  const [listVisibility, setListVisibility] = useState('Private');
  const [statusMessage, setStatusMessage] = useState('');

  const totalSavedItems = useMemo(() => {
    return lists.reduce((sum, list) => sum + list.items, 0);
  }, [lists]);

  const createList = (event) => {
    event.preventDefault();
    if (!newListName.trim()) {
      setStatusMessage('Enter a list name to create a new shopping list.');
      return;
    }

    const newList = {
      id: `list-${Date.now()}`,
      name: newListName.trim(),
      items: 0,
      visibility: listVisibility
    };

    setLists((prev) => [newList, ...prev]);
    setNewListName('');
    setStatusMessage(`List created: ${newList.name}`);
  };

  return (
    <AmazonPageShell
      title="Your Account - Amazon.com"
      description="Manage your Amazon account settings, orders, addresses, and shopping lists."
      breadcrumb="Account & Lists"
    >
      <section style={{ backgroundColor: 'white', borderRadius: '8px', padding: '22px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ fontSize: '32px', marginBottom: '6px' }}>Your Account</h1>
            <p style={{ margin: 0, color: '#565959' }}>
              Review orders, manage your profile, and organize everything in one place.
            </p>
          </div>
          <Link
            href="/amazon/signin"
            style={{
              border: '1px solid #d5d9d9',
              backgroundColor: 'white',
              borderRadius: '999px',
              padding: '9px 14px',
              textDecoration: 'none',
              color: '#0f1111',
              fontSize: '14px'
            }}
          >
            <FaUserCircle style={{ marginRight: '6px' }} /> Manage Sign-In
          </Link>
        </div>
      </section>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
          gap: '14px',
          marginTop: '18px'
        }}
        className="amazon-account-cards"
      >
        {accountCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.id}
              href={card.href}
              style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                border: '1px solid #d5d9d9',
                textDecoration: 'none',
                color: '#0f1111',
                padding: '16px'
              }}
            >
              <Icon style={{ color: '#007185', fontSize: '20px', marginBottom: '8px' }} />
              <h2 style={{ margin: '0 0 6px', fontSize: '19px' }}>{card.title}</h2>
              <p style={{ margin: 0, color: '#565959', fontSize: '13px' }}>{card.description}</p>
            </Link>
          );
        })}
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '18px', marginTop: '18px' }} className="amazon-account-layout">
        <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '8px' }}>
            <FaHeart style={{ color: '#e47911', marginRight: '6px' }} /> Your Lists
          </h2>
          <p style={{ marginTop: 0, color: '#565959', fontSize: '14px' }}>
            You currently have <strong>{lists.length}</strong> lists with <strong>{totalSavedItems}</strong> saved items.
          </p>

          <div style={{ display: 'grid', gap: '10px', marginTop: '12px' }}>
            {lists.map((list) => (
              <article key={list.id} style={{ border: '1px solid #d5d9d9', borderRadius: '8px', padding: '12px' }}>
                <p style={{ margin: '0 0 4px', fontSize: '16px', fontWeight: 700 }}>{list.name}</p>
                <p style={{ margin: 0, color: '#565959', fontSize: '13px' }}>
                  {list.items} items · {list.visibility}
                </p>
              </article>
            ))}
          </div>
        </div>

        <form onSubmit={createList} style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', alignSelf: 'start' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>Create a List</h2>

          <label style={{ display: 'block', fontSize: '13px', color: '#565959', marginBottom: '10px' }}>
            List name
            <input
              type="text"
              value={newListName}
              onChange={(event) => setNewListName(event.target.value)}
              placeholder="e.g. Birthday Ideas"
              style={{ width: '100%', height: '40px', marginTop: '6px', border: '1px solid #d5d9d9', borderRadius: '8px', padding: '0 10px' }}
            />
          </label>

          <label style={{ display: 'block', fontSize: '13px', color: '#565959', marginBottom: '12px' }}>
            Visibility
            <select
              value={listVisibility}
              onChange={(event) => setListVisibility(event.target.value)}
              style={{ width: '100%', height: '40px', marginTop: '6px', border: '1px solid #d5d9d9', borderRadius: '8px', padding: '0 10px' }}
            >
              <option value="Private">Private</option>
              <option value="Shared">Shared</option>
              <option value="Public">Public</option>
            </select>
          </label>

          <button
            type="submit"
            style={{
              width: '100%',
              height: '40px',
              borderRadius: '999px',
              border: '1px solid #d5d9d9',
              backgroundColor: 'white',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Create List
          </button>

          {statusMessage && (
            <p style={{ marginTop: '10px', marginBottom: 0, fontSize: '13px', color: '#067d62' }}>{statusMessage}</p>
          )}
        </form>
      </section>

      <style jsx global>{`
        @media (max-width: 1100px) {
          .amazon-account-cards {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }

          .amazon-account-layout {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 620px) {
          .amazon-account-cards {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </AmazonPageShell>
  );
};

export default AmazonAccountPage;
