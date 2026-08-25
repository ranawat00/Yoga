import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useApp } from '../../hooks/useApp';
import { submitRegistration } from '../../api/registrations';
import './RegisterModal.css';

export default function RegisterModal() {
  const { isRegisterModalOpen, setIsRegisterModalOpen, addNotification } = useApp();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(null);
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);

  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    setIsValidatingCoupon(true);
    try {
      const response = await fetch('http://localhost:5000/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponCode, amount: 499, workshopTitle: '5 Days Online Live Yoga Workshop' })
      });
      const json = await response.json();
      if (json.success) {
        setCouponDiscount(json);
        if (addNotification) addNotification(json.message, 'success');
      } else {
        setCouponDiscount(null);
        if (addNotification) addNotification(json.message || 'Invalid coupon code', 'error');
      }
    } catch (err) {
      if (addNotification) addNotification('Error validating coupon code', 'error');
    } finally {
      setIsValidatingCoupon(false);
    }
  };
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    batch: 'Morning Batch (6:00 AM - 7:15 AM IST)'
  });

  if (!isRegisterModalOpen) return null;

  const handleCloseModal = () => {
    setIsRegisterModalOpen(false);
    setSuccessData(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      if (addNotification) addNotification('Please enter your name and phone number.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitRegistration({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        batch: formData.batch,
        couponCode: couponDiscount ? couponCode : '',
        source: 'Website Free Registration Modal'
      });

      if (res.success) {
        setSuccessData({
          name: formData.name,
          email: res.data?.email || formData.email || `${formData.name.toLowerCase().replace(/\s+/g, '')}@yogahealers.org`,
          batch: formData.batch
        });
        if (addNotification) addNotification('Registration saved! Welcome to Yoga Healers.', 'success');
      } else {
        if (addNotification) addNotification(res.message || 'Registration failed. Please try again.', 'error');
      }
    } catch (err) {
      if (addNotification) addNotification('Failed to connect to server. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={handleCloseModal}>
      <div className="daily-yoga-modal animate-checkout-scale" onClick={(e) => e.stopPropagation()}>
        {successData ? (
          <div className="practice-success-view" style={{ textAlign: 'center', color: '#FFFFFF', padding: '1rem 0' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem', color: '#FFFFFF' }}>Registration Successful!</h3>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.9)', marginBottom: '0.5rem' }}>
              Thank you, <strong>{successData.name}</strong>! You are registered for the <strong>5 Days Free Yoga Workshop</strong>.
            </p>
            <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.8)', marginBottom: '1.5rem' }}>
              Selected Batch: <strong>{successData.batch}</strong>.<br />
              Confirmation details sent to <strong>{successData.email}</strong>.
            </p>
            <button className="practice-join-btn" onClick={handleCloseModal}>
              Got it, Thanks!
            </button>
          </div>
        ) : (
          <>
            <button className="modal-close-btn-custom" onClick={handleCloseModal} aria-label="Close modal">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="practice-modal-header">
              <h2 className="practice-modal-title">Register for Free Workshop</h2>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', marginTop: '0.35rem', marginBottom: 0 }}>5 Days Online Live Yoga Workshop</p>
            </div>

            <form onSubmit={handleFormSubmit}>
              <div className="practice-modal-body">
                {/* Name Input */}
                <div className="practice-input-wrapper">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name*"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* WhatsApp Phone Input */}
                <div className="practice-phone-input-wrapper">
                  <div className="practice-country-select">
                    <span className="practice-flag">🇮🇳</span>
                    <span className="practice-code">+91</span>
                    <span className="practice-arrow">▼</span>
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="WhatsApp Number*"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Email Input */}
                <div className="practice-input-wrapper" style={{ marginTop: '1.25rem' }}>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address (Optional)"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Coupon Code Input */}
                <div className="practice-input-wrapper" style={{ marginTop: '0.75rem', display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    placeholder="Coupon Code (e.g. YOGA20)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    style={{ textTransform: 'uppercase', flex: 1 }}
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    disabled={isValidatingCoupon || !couponCode}
                    style={{
                      background: 'rgba(255, 255, 255, 0.25)',
                      border: '1.2px solid rgba(255, 255, 255, 0.4)',
                      color: '#ffffff',
                      borderRadius: '50px',
                      padding: '0 18px',
                      fontSize: '0.85rem',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    {isValidatingCoupon ? '...' : 'APPLY'}
                  </button>
                </div>

                {couponDiscount && (
                  <div style={{ background: 'rgba(255, 255, 255, 0.2)', padding: '8px 14px', borderRadius: '12px', color: '#ffffff', fontSize: '0.82rem', textAlign: 'center', marginTop: '6px' }}>
                    ✨ {couponDiscount.message}
                  </div>
                )}

                {/* Select Batch */}
                <div className="practice-input-wrapper" style={{ marginTop: '0.25rem' }}>
                  <select
                    name="batch"
                    value={formData.batch}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1.5rem',
                      background: 'rgba(255, 255, 255, 0.15)',
                      border: '1.2px solid rgba(255, 255, 255, 0.35)',
                      borderRadius: '50px',
                      color: '#FFFFFF',
                      fontSize: '0.95rem',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="Morning Batch (6:00 AM - 7:15 AM IST)" style={{ color: '#333' }}>Morning Batch (6:00 AM - 7:15 AM IST)</option>
                    <option value="Evening Batch (6:00 PM - 7:15 PM IST)" style={{ color: '#333' }}>Evening Batch (6:00 PM - 7:15 PM IST)</option>
                  </select>
                </div>

                {/* Join Now Button */}
                <button type="submit" className="practice-join-btn" disabled={isSubmitting} style={{ marginTop: '1rem' }}>
                  <span style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '0.6rem',
                    flexShrink: 0
                  }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1e4228" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </span>
                  <span>{isSubmitting ? 'REGISTERING...' : 'REGISTER FREE NOW'}</span>
                </button>

                <p className="practice-modal-note" style={{ textAlign: 'center', fontSize: '0.8rem', color: 'rgba(255,255,255,0.75)', marginTop: '0.75rem', marginBottom: 0 }}>
                  100% Free • No Credit Card Required
                </p>
              </div>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}
