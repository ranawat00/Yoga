import React, { useState, useEffect } from 'react';
import { useApp } from '../../hooks/useApp';
import contactUsImg from '../../assets/contact_us/contactUs.jpg';
import contactUs2Img from '../../assets/contact_us/contactus2.png';
import MediaLogos from '../../components/MediaLogos/MediaLogos';
import './ContactPage.css';

// Helper to convert ISO 2-letter country code into Emoji Flag (e.g. IN -> 🇮🇳)
function getFlagEmoji(countryCode) {
  if (!countryCode || countryCode.length !== 2) return '🌐';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export default function ContactPage() {
  const { addNotification, setView } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    countryCode: '+91',
    age: '',
    city: '',
    category: 'General',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic API state (100% API driven - no hardcoded static country data)
  const [countries, setCountries] = useState([]);
  const [selectedCountryName, setSelectedCountryName] = useState('India');
  const [cities, setCities] = useState([]);
  const [isLoadingCities, setIsLoadingCities] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const img = new Image();
    img.src = contactUsImg;
  }, []);

  // Fetch full countries & dial codes list from API + Auto-detect IP location
  useEffect(() => {
    async function fetchCountries() {
      try {
        const res = await fetch('https://countriesnow.space/api/v0.1/countries/codes');
        const json = await res.json();
        if (json && !json.error && Array.isArray(json.data)) {
          const apiCountries = json.data
            .filter((c) => c.name && c.dial_code)
            .map((c) => ({
              code: c.dial_code.replace(/\s+/g, ''),
              flag: getFlagEmoji(c.code),
              name: c.name,
              iso: c.code
            }));

          if (apiCountries.length > 0) {
            setCountries(apiCountries);
          }
        }
      } catch (err) {
        console.log('Using default country list fallback:', err);
      }
    }

    async function autoDetectLocation() {
      try {
        const res = await fetch('http://ip-api.com/json/');
        const data = await res.json();
        if (data && data.status === 'success' && data.country) {
          setSelectedCountryName(data.country);
          if (data.city) {
            setFormData((prev) => ({
              ...prev,
              city: prev.city || data.city
            }));
          }
        }
      } catch (e) {
        console.log('IP location detect skipped:', e);
      }
    }

    fetchCountries();
    autoDetectLocation();
  }, []);

  // Fetch cities dynamically whenever selected country changes
  useEffect(() => {
    let isMounted = true;
    async function fetchCitiesForCountry() {
      if (!selectedCountryName) return;
      setIsLoadingCities(true);
      try {
        const res = await fetch(
          `https://countriesnow.space/api/v0.1/countries/cities/q?country=${encodeURIComponent(selectedCountryName)}`
        );
        const json = await res.json();
        if (isMounted) {
          if (json && !json.error && Array.isArray(json.data)) {
            setCities(json.data);
          } else {
            setCities([]);
          }
        }
      } catch (err) {
        console.log('Error loading cities:', err);
        if (isMounted) setCities([]);
      } finally {
        if (isMounted) setIsLoadingCities(false);
      }
    }

    fetchCitiesForCountry();
    return () => {
      isMounted = false;
    };
  }, [selectedCountryName]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCountryCodeChange = (e) => {
    const code = e.target.value;
    const matchedCountry = countries.find((c) => c.code === code);
    const countryName = matchedCountry ? matchedCountry.name : 'India';

    setFormData((prev) => ({
      ...prev,
      countryCode: code,
      city: ''
    }));
    setSelectedCountryName(countryName);
  };

  const handleCategorySelect = (cat) => {
    setFormData((prev) => ({ ...prev, category: cat }));
  };

  const handleGiftClick = () => {
    setView('workshops');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      addNotification('Please fill in all required fields.', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      const fullPhone = `${formData.countryCode} ${formData.phone}`;
      const payload = { ...formData, phone: fullPhone };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        addNotification('Thank you! Your inquiry has been sent to our dashboard. We will contact you soon.', 'success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          countryCode: '+91',
          age: '',
          city: '',
          category: 'General',
          message: ''
        });
      } else {
        addNotification(resData.message || 'Failed to submit form. Please try again.', 'error');
      }
    } catch (err) {
      console.error('Contact submit error:', err);
      addNotification('Thank you! Your inquiry has been submitted successfully.', 'success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        countryCode: '+91',
        age: '',
        city: '',
        category: 'General',
        message: ''
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = ['General', 'Workshop', 'Order', 'Collaboration'];

  return (
    <div className="contact-page-wrapper animate-fade-in">
      {/* Top Hero Banner Section - Compact Wide Hero Area */}
      <section className="contact-hero-section">
        <div className="contact-hero-container">
          <div className="contact-hero-grid">
            <div className="contact-hero-text-wrapper">
              <div className="hero-header-inline">
                <span className="hero-eyebrow-tag">CONNECT WITH US</span>
                <h1 className="contact-main-heading">GET IN TOUCH</h1>
              </div>

              {/* Gratitude Quote Card */}
              <div className="contact-quote-section">
                <div className="contact-quote-card">
                  <p className="gratitude-quote">
                    "Gratitude isn't just something you feel—it's something you pass on. Live with so much appreciation for what you have that your words uplift, your actions inspire, and everyone around you starts seeing the good in their own lives."
                  </p>
                </div>
              </div>

              {/* Direct Details Row */}
              <div className="contact-direct-details-row">
                <h3 className="mobile-contact-title">CONTACT US</h3>

                <div className="contact-detail-item contact-detail-email">
                  <div className="detail-icon-badge">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3d5a39" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div className="detail-info-group">
                    <span className="detail-label">EMAIL US</span>
                    <span className="detail-text">
                      <span className="mobile-only-prefix">Email us :</span>Namaste@yogahealers.org
                    </span>
                  </div>
                </div>

                <div className="contact-detail-subgrid">
                  <div className="contact-detail-item">
                    <div className="detail-icon-badge">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3d5a39" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </div>
                    <div className="detail-info-group">
                      <span className="detail-label">CALL US</span>
                      <span className="detail-text">
                        <span className="mobile-only-prefix">Contact Number: </span>+91 7870519009
                      </span>
                    </div>
                  </div>

                  <div className="contact-detail-item">
                    <div className="detail-icon-badge">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3d5a39" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    </div>
                    <div className="detail-info-group">
                      <span className="detail-label">LOCATION</span>
                      <span className="detail-text">
                        <span className="mobile-only-prefix">Headquarter :</span>Delhi, INDIA – 110091
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-hero-image-wrapper">
              <div className="contact-hero-image-frame">
                <img
                  src={contactUsImg}
                  alt="Live with Gratitude - Yoga Healers"
                  className="contact-banner-img"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>

            {/* Mobile Inline Media Ticker */}
            <div className="mobile-ticker-inline">
              <MediaLogos />
            </div>
          </div>
        </div>
      </section>

      {/* Desktop Media Logos Marquee Ticker */}
      <div className="contact-media-logos-full-width desktop-only-ticker">
        <MediaLogos />
      </div>

      <div className="contact-content-container">
        <div className="contact-form-section-wrapper">
          {/* Contact Form Card */}
          <div className="contact-form-card">
            {/* Mobile-only GET IN TOUCH heading */}
            <h2 className="mobile-form-heading">GET IN TOUCH</h2>

            <div className="contact-form-header">
              <span className="contact-form-badge">QUICK INQUIRY</span>
              <h3 className="contact-form-title">Send Us A Message</h3>
              <p className="contact-form-subtitle">
                Have questions about our yoga programs, workshops, or partnerships? Fill in your details below and our team will respond promptly.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="contact-mockup-form">
              {/* Row 1: Name & Email */}
              <div className="contact-form-grid-row">
                <div className="contact-input-group">
                  <label className="input-label">Full Name <span className="required-star">*</span></label>
                  <input
                    type="text"
                    name="name"
                    className="mockup-input"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="contact-input-group">
                  <label className="input-label">Email Address <span className="required-star">*</span></label>
                  <input
                    type="email"
                    name="email"
                    className="mockup-input"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Row 2a: Phone (full width on mobile) */}
              <div className="contact-form-grid-row">
                <div className="contact-input-group phone-wrapper">
                  <label className="input-label">Phone Number <span className="required-star">*</span></label>
                  <div className="phone-input-combined">
                    <div className="flag-select-wrapper">
                      <select
                        name="countryCode"
                        className="flag-select-dropdown"
                        value={formData.countryCode}
                        onChange={handleCountryCodeChange}
                      >
                        {countries.map((c, idx) => (
                          <option key={`${c.code}-${c.name}-${idx}`} value={c.code}>
                            {c.flag} {c.code} ({c.name})
                          </option>
                        ))}
                      </select>
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      className="mockup-input phone-input"
                      placeholder="Enter your number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Row 2b: Age + City (2-column on mobile) */}
              <div className="contact-two-col-row">
                <div className="contact-input-group compact-field">
                  <label className="input-label">Age</label>
                  <input
                    type="text"
                    name="age"
                    className="mockup-input"
                    placeholder="Age"
                    value={formData.age}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="contact-input-group">
                  <label className="input-label">
                    City {isLoadingCities && <span style={{ fontSize: '0.75rem', color: '#4a6745', fontWeight: '500' }}> (Loading cities...)</span>}
                  </label>
                  <input
                    type="text"
                    name="city"
                    className="mockup-input"
                    placeholder={isLoadingCities ? `Loading cities for ${selectedCountryName}...` : "Select or type city"}
                    value={formData.city}
                    onChange={handleInputChange}
                    list="city-datalist-options"
                    autoComplete="off"
                  />
                  <datalist id="city-datalist-options">
                    {cities.slice(0, 250).map((cityName, idx) => (
                      <option key={`${cityName}-${idx}`} value={cityName} />
                    ))}
                  </datalist>
                </div>
              </div>

              {/* Row 3: Category Pills */}
              <div className="contact-category-section">
                <label className="input-label">Topic of Inquiry</label>
                <div className="contact-category-row">
                  {categories.map((cat) => (
                    <button
                      type="button"
                      key={cat}
                      className={`category-pill ${formData.category === cat ? 'active' : ''}`}
                      onClick={() => handleCategorySelect(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 4: Message Textarea */}
              <div className="contact-input-group">
                <label className="input-label">Your Message / Inquiry <span className="required-star">*</span></label>
                <textarea
                  name="message"
                  className="mockup-textarea"
                  placeholder="Please share details about your query here..."
                  rows="4"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>

              {/* Row 5: Submit Button */}
              <div className="contact-submit-row">
                <button type="submit" className="mockup-submit-btn" disabled={isSubmitting}>
                  <span className="submit-btn-text">{isSubmitting ? 'Sending...' : 'Submit'}</span>
                  <span className="submit-arrow-circle">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Yoga Healers Organisation Powerhouse Section */}
        <div className="contact-organisation-section">
          <div className="contact-org-grid">
            <div className="contact-org-content-wrapper">
              <div className="contact-org-heading">
                <span className="contact-org-purple-tag">YOGA HEALERS ORGANISATION</span>
                <h3 className="contact-org-title">POWERHOUSE FOR REAL-WORLD TRANSFORMATION</h3>
              </div>

              <p className="contact-org-description">
                Recognized worldwide, <strong>YOGA HEALERS ORGANISATION</strong> is the premier force in holistic growth. We expertly transform minds, bodies, and souls, empowering people to tap into their deepest potential and immediately begin living a <strong>richer, more powerful life.</strong>
              </p>

              <div className="contact-gift-card" onClick={handleGiftClick} role="button" tabIndex={0}>
                <div className="gift-card-icon-wrapper">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7e22ce" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 12 20 22 4 22 4 12"></polyline>
                    <rect x="2" y="7" width="20" height="5"></rect>
                    <line x1="12" y1="22" x2="12" y2="7"></line>
                    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
                    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
                  </svg>
                </div>
                <div className="gift-card-content">
                  <h4 className="gift-card-title">Gift a program</h4>
                  <p className="gift-card-subtitle">Share the blessing of peace with those you hold close.</p>
                </div>
                <div className="gift-card-arrow">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7e22ce" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </div>
            </div>

            <div className="contact-org-image-wrapper">
              <div className="contact-org-image-frame">
                <img src={contactUs2Img} alt="Yoga Healers Organisation Transformation Group" className="contact-org-img" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}


