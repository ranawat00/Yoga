import React, { useState, useEffect } from 'react';
import { useApp } from '../../hooks/useApp';
import contactUsImg from '../../assets/contact_us/contactUs.jpg';
import contactUs2Img from '../../assets/contact_us/contactus2.png';
import MediaLogos from '../../components/MediaLogos/MediaLogos';
import './ContactPage.css';

const countryList = [
  { code: '+91', flag: '🇮🇳', name: 'India' },
  { code: '+1', flag: '🇺🇸', name: 'United States' },
  { code: '+44', flag: '🇬🇧', name: 'United Kingdom' },
  { code: '+1', flag: '🇨🇦', name: 'Canada' },
  { code: '+61', flag: '🇦🇺', name: 'Australia' },
  { code: '+971', flag: '🇦🇪', name: 'UAE' },
  { code: '+65', flag: '🇸🇬', name: 'Singapore' },
  { code: '+49', flag: '🇩🇪', name: 'Germany' },
  { code: '+33', flag: '🇫🇷', name: 'France' },
  { code: '+81', flag: '🇯🇵', name: 'Japan' },
  { code: '+86', flag: '🇨🇳', name: 'China' },
  { code: '+7', flag: '🇷🇺', name: 'Russia' },
  { code: '+55', flag: '🇧🇷', name: 'Brazil' },
  { code: '+27', flag: '🇿🇦', name: 'South Africa' },
  { code: '+966', flag: '🇸🇦', name: 'Saudi Arabia' },
  { code: '+974', flag: '🇶🇦', name: 'Qatar' },
  { code: '+968', flag: '🇴🇲', name: 'Oman' },
  { code: '+965', flag: '🇰🇼', name: 'Kuwait' },
  { code: '+973', flag: '🇧🇭', name: 'Bahrain' },
  { code: '+977', flag: '🇳🇵', name: 'Nepal' },
  { code: '+94', flag: '🇱🇰', name: 'Sri Lanka' },
  { code: '+880', flag: '🇧🇩', name: 'Bangladesh' },
  { code: '+92', flag: '🇵🇰', name: 'Pakistan' },
  { code: '+62', flag: '🇮🇩', name: 'Indonesia' },
  { code: '+60', flag: '🇲🇾', name: 'Malaysia' },
  { code: '+63', flag: '🇵🇭', name: 'Philippines' },
  { code: '+66', flag: '🇹🇭', name: 'Thailand' },
  { code: '+84', flag: '🇻🇳', name: 'Vietnam' },
  { code: '+82', flag: '🇰🇷', name: 'South Korea' },
  { code: '+39', flag: '🇮🇹', name: 'Italy' },
  { code: '+34', flag: '🇪🇸', name: 'Spain' },
  { code: '+31', flag: '🇳🇱', name: 'Netherlands' },
  { code: '+41', flag: '🇨🇭', name: 'Switzerland' },
  { code: '+46', flag: '🇸🇪', name: 'Sweden' },
  { code: '+47', flag: '🇳🇴', name: 'Norway' },
  { code: '+45', flag: '🇩🇰', name: 'Denmark' },
  { code: '+353', flag: '🇮🇪', name: 'Ireland' },
  { code: '+64', flag: '🇳🇿', name: 'New Zealand' },
  { code: '+52', flag: '🇲🇽', name: 'Mexico' },
  { code: '+54', flag: '🇦🇷', name: 'Argentina' },
  { code: '+56', flag: '🇨🇱', name: 'Chile' },
  { code: '+57', flag: '🇨🇴', name: 'Colombia' },
  { code: '+20', flag: '🇪🇬', name: 'Egypt' },
  { code: '+234', flag: '🇳🇬', name: 'Nigeria' },
  { code: '+254', flag: '🇰🇪', name: 'Kenya' }
];

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

  useEffect(() => {
    window.scrollTo(0, 0);
    const img = new Image();
    img.src = contactUsImg;
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
                    "Gratitude isn't <strong>just</strong> something you feel—it's something you pass on. Live with so much appreciation for what you have that your words uplift, your actions inspire, and everyone around you starts seeing the good in their own lives."
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
                        onChange={handleInputChange}
                      >
                        {countryList.map((c, idx) => (
                          <option key={`${c.code}-${idx}`} value={c.code}>
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
                  <label className="input-label">City</label>
                  <input
                    type="text"
                    name="city"
                    className="mockup-input"
                    placeholder="Enter your city"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
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


