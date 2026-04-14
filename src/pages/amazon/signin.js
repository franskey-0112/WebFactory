import React, { useState } from 'react';
import Link from 'next/link';
import AmazonPageShell from '../../components/amazon/AmazonPageShell';

const AmazonSignInPage = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!identifier.trim() || !password.trim()) {
      setMessage('Enter your email or mobile number and password to continue.');
      return;
    }

    setMessage('Sign-in request captured in this offline environment. Continue to your account dashboard.');
  };

  return (
    <AmazonPageShell
      title="Amazon Sign-In"
      description="Sign in to your Amazon account to access orders, addresses, payment methods, and lists."
      breadcrumb="Sign in"
    >
      <section style={{ maxWidth: '980px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }} className="amazon-signin-grid">
        <div style={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #d5d9d9', padding: '24px' }}>
          <h1 style={{ fontSize: '30px', marginBottom: '14px' }}>Sign in</h1>

          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '12px' }}>
            <label style={{ fontSize: '13px', fontWeight: 700, color: '#0f1111' }}>
              Email or mobile phone number
              <input
                type="text"
                value={identifier}
                onChange={(event) => setIdentifier(event.target.value)}
                style={{ width: '100%', height: '40px', marginTop: '6px', borderRadius: '8px', border: '1px solid #888c8c', padding: '0 10px' }}
              />
            </label>

            <label style={{ fontSize: '13px', fontWeight: 700, color: '#0f1111' }}>
              Password
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                style={{ width: '100%', height: '40px', marginTop: '6px', borderRadius: '8px', border: '1px solid #888c8c', padding: '0 10px' }}
              />
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#0f1111' }}>
              <input
                type="checkbox"
                checked={keepSignedIn}
                onChange={(event) => setKeepSignedIn(event.target.checked)}
              />
              Keep me signed in on this browser
            </label>

            <button
              type="submit"
              style={{
                width: '100%',
                height: '40px',
                borderRadius: '999px',
                border: '1px solid #fcd200',
                backgroundColor: '#ffd814',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Sign-In
            </button>
          </form>

          <p style={{ marginTop: '12px', marginBottom: 0, fontSize: '12px', color: '#565959', lineHeight: 1.45 }}>
            By continuing, you agree to Amazon&apos;s Conditions of Use and Privacy Notice.
          </p>

          {message && (
            <p style={{ marginTop: '12px', marginBottom: 0, fontSize: '13px', color: '#067d62' }}>
              {message}
            </p>
          )}

          <div style={{ marginTop: '18px', borderTop: '1px solid #e7e7e7', paddingTop: '14px' }}>
            <p style={{ margin: 0, fontSize: '13px', color: '#565959' }}>Need help?</p>
            <div style={{ marginTop: '8px', display: 'grid', gap: '6px' }}>
              <Link href="/amazon/customer-service" style={{ color: '#007185', fontSize: '13px', textDecoration: 'none' }}>
                Forgot password
              </Link>
              <Link href="/amazon/customer-service" style={{ color: '#007185', fontSize: '13px', textDecoration: 'none' }}>
                Other issues with Sign-In
              </Link>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #d5d9d9', padding: '24px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>New to Amazon?</h2>
          <p style={{ marginTop: 0, color: '#565959', fontSize: '14px', lineHeight: 1.5 }}>
            Create an account to track orders, save addresses, manage payment methods, and build shopping lists.
          </p>

          <button
            type="button"
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
            Create your Amazon account
          </button>

          <div style={{ marginTop: '18px' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Account benefits</h3>
            <ul style={{ margin: 0, paddingLeft: '18px', color: '#565959', lineHeight: 1.7 }}>
              <li>Faster checkout with saved details</li>
              <li>Easy returns and order tracking</li>
              <li>Personalized recommendations and lists</li>
              <li>Optional Prime delivery benefits</li>
            </ul>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @media (max-width: 900px) {
          .amazon-signin-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </AmazonPageShell>
  );
};

export default AmazonSignInPage;
