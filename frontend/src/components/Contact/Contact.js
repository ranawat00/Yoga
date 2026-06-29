import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import './Contact.css';

export default function Contact() {
  const { addNotification } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      addNotification('Please fill in all required fields.', 'error');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API form submission
    setTimeout(() => {
      setIsSubmitting(false);
      addNotification('Thank you! Your message has been sent successfully. Our team will get back to you shortly.', 'success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 1200);
  };

  return (
    <div className="contact-page animate-fade-in">
      <div className="contact-header">
        <h1 className="contact-title">Contact Us</h1>
        <p className="contact-subtitle">We are here to support your journey back to nature's design</p>
      </div>

      <div className="contact-container">
        <div className="contact-grid">
          {/* Left Column: Get in Touch Form */}
          <div className="contact-form-section">
            <h2 className="info-title">Send a Message</h2>
            <p className="info-intro">
              Have questions about our upcoming workshops, organic products, or your health score report? Reach out to our dedicated support team.
            </p>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label className="form-label" htmlFor="contact-name">Full Name *</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-email">Email Address *</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-phone">Phone Number *</label>
                  <input
                    id="contact-phone"
                    type="tel"
                    name="phone"
                    className="form-control"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-subject">Subject</label>
                <select
                  id="contact-subject"
                  name="subject"
                  className="form-control"
                  value={formData.subject}
                  onChange={handleInputChange}
                >
                  <option value="">Select a topic</option>
                  <option value="Workshops">Workshops Inquiry</option>
                  <option value="Products">Products & Shop</option>
                  <option value="Health Score">Health Score & Consultations</option>
                  <option value="General">General Inquiry</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-message">Message *</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="5"
                  className="form-control contact-textarea"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-blue btn-submit-contact" disabled={isSubmitting}>
                {isSubmitting ? 'Sending Message...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Right Column: Contact Details + Google Map */}
          <div className="contact-details-map-section">
            <div className="compact-info-items">
              <div className="compact-info-item">
                <div className="compact-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div className="compact-details">
                  <h4>Email Us</h4>
                  <a href="mailto:support@yogahealers.com">support@yogahealers.com</a>
                </div>
              </div>

              <div className="compact-info-item">
                <div className="compact-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div className="compact-details">
                  <h4>Call Us</h4>
                  <a href="tel:+919876543210">+91 98765 43210</a>
                </div>
              </div>

              <div className="compact-info-item">
                <div className="compact-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div className="compact-details">
                  <h4>Sanctuary</h4>
                  <span>Sector 62, Noida, India</span>
                </div>
              </div>
            </div>

            <div className="contact-map-section">
              <div className="map-wrapper">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.5620638517203!2d77.35985837628867!3d28.612911775674718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce54460775d7b%3A0xe54b1f6db2be611e!2sSector%2062%2C%20Noida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1718530000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Yoga Healers Location Map"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
