import React, { useEffect, useState } from 'react';
import AmazonPageShell from '../../components/amazon/AmazonPageShell';

const languages = [
  { code: 'en_US', label: 'English - EN' },
  { code: 'es_US', label: 'Espanol - ES' },
  { code: 'zh_CN', label: 'Chinese - 中文' },
  { code: 'fr_FR', label: 'French - FR' },
  { code: 'de_DE', label: 'German - DE' }
];

const regions = [
  { code: 'US', label: 'United States', currency: 'USD - U.S. Dollar' },
  { code: 'CA', label: 'Canada', currency: 'CAD - Canadian Dollar' },
  { code: 'UK', label: 'United Kingdom', currency: 'GBP - British Pound' },
  { code: 'JP', label: 'Japan', currency: 'JPY - Japanese Yen' }
];

const AmazonLanguagePage = () => {
  const [language, setLanguage] = useState('en_US');
  const [region, setRegion] = useState('US');
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    try {
      const savedLanguage = localStorage.getItem('amazon-language');
      const savedRegion = localStorage.getItem('amazon-region');

      if (savedLanguage) {
        setLanguage(savedLanguage);
      }

      if (savedRegion) {
        setRegion(savedRegion);
      }
    } catch (error) {
      console.error('Error loading language preferences:', error);
    }
  }, []);

  const applySettings = () => {
    try {
      localStorage.setItem('amazon-language', language);
      localStorage.setItem('amazon-region', region);
      setStatusMessage('Language and country/region settings saved for this browser.');
    } catch (error) {
      console.error('Error saving language preferences:', error);
      setStatusMessage('Unable to save settings right now.');
    }
  };

  const selectedRegion = regions.find((entry) => entry.code === region);

  return (
    <AmazonPageShell
      title="Language & Region Settings - Amazon"
      description="Update your language and regional shopping preferences for Amazon."
      breadcrumb="Language & Region"
    >
      <section style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gap: '16px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #d5d9d9', padding: '22px' }}>
          <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>Language & Region</h1>
          <p style={{ margin: 0, color: '#565959', fontSize: '14px', lineHeight: 1.5 }}>
            Choose your preferred language and country/region for shopping, recommendations, and checkout defaults.
          </p>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #d5d9d9', padding: '22px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '12px' }}>Select language</h2>
          <div style={{ display: 'grid', gap: '8px' }}>
            {languages.map((entry) => (
              <label key={entry.code} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                <input
                  type="radio"
                  name="language"
                  value={entry.code}
                  checked={language === entry.code}
                  onChange={(event) => setLanguage(event.target.value)}
                />
                {entry.label}
              </label>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #d5d9d9', padding: '22px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '12px' }}>Select your country/region</h2>
          <select
            value={region}
            onChange={(event) => setRegion(event.target.value)}
            style={{ width: '100%', height: '40px', border: '1px solid #d5d9d9', borderRadius: '8px', padding: '0 10px' }}
          >
            {regions.map((entry) => (
              <option key={entry.code} value={entry.code}>
                {entry.label}
              </option>
            ))}
          </select>

          <p style={{ margin: '10px 0 0', fontSize: '13px', color: '#565959' }}>
            Currency preview: {selectedRegion?.currency}
          </p>

          <button
            type="button"
            onClick={applySettings}
            style={{
              marginTop: '14px',
              borderRadius: '999px',
              border: '1px solid #fcd200',
              backgroundColor: '#ffd814',
              padding: '10px 18px',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            Save Changes
          </button>

          {statusMessage && (
            <p style={{ marginTop: '10px', marginBottom: 0, color: '#067d62', fontSize: '13px' }}>{statusMessage}</p>
          )}
        </div>
      </section>
    </AmazonPageShell>
  );
};

export default AmazonLanguagePage;
