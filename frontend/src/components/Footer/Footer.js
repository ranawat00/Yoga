import './Footer.css';
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export default function Footer() {
  const { addNotification, setView } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;

    // Simulate API subscribe
    setTimeout(() => {
      addNotification(`Thank you for subscribing, ${name || 'there'}! We've sent a welcome guide to ${email}.`, 'success');
      setEmail('');
      setName('');
      setPhone('');
    }, 500);
  };

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      {/* Live Animated Parallax Waves */}
      <div className="footer-wave-container">
        <svg className="footer-wave-svg wave-layer-1" viewBox="0 0 1440 160" preserveAspectRatio="none">
          <g transform="translate(0, 0)">
            <path d="M0 80 C 120 120, 240 120, 360 80 C 480 40, 600 40, 720 80 C 840 120, 960 120, 1080 80 C 1200 40, 1320 40, 1440 80 C 1560 120, 1680 120, 1800 80 C 1920 40, 2040 40, 2160 80 C 2280 120, 2400 120, 2520 80 C 2640 40, 2760 40, 2880 80 L 2880 160 L 0 160 Z" fill="rgba(31, 58, 82, 0.15)" />
          </g>
        </svg>
        <svg className="footer-wave-svg wave-layer-2" viewBox="0 0 1440 160" preserveAspectRatio="none">
          <g transform="translate(-180, 4)">
            <path d="M0 80 C 120 120, 240 120, 360 80 C 480 40, 600 40, 720 80 C 840 120, 960 120, 1080 80 C 1200 40, 1320 40, 1440 80 C 1560 120, 1680 120, 1800 80 C 1920 40, 2040 40, 2160 80 C 2280 120, 2400 120, 2520 80 C 2640 40, 2760 40, 2880 80 L 2880 160 L 0 160 Z" fill="rgba(31, 58, 82, 0.35)" />
          </g>
        </svg>
        <svg className="footer-wave-svg wave-layer-3" viewBox="0 0 1440 160" preserveAspectRatio="none">
          <g transform="translate(-360, 8)">
            <path d="M0 80 C 120 120, 240 120, 360 80 C 480 40, 600 40, 720 80 C 840 120, 960 120, 1080 80 C 1200 40, 1320 40, 1440 80 C 1560 120, 1680 120, 1800 80 C 1920 40, 2040 40, 2160 80 C 2280 120, 2400 120, 2520 80 C 2640 40, 2760 40, 2880 80 L 2880 160 L 0 160 Z" fill="rgba(31, 58, 82, 0.55)" />
          </g>
        </svg>
        <svg className="footer-wave-svg wave-layer-4" viewBox="0 0 1440 160" preserveAspectRatio="none">
          <g transform="translate(-540, 12)">
            <path d="M0 80 C 120 120, 240 120, 360 80 C 480 40, 600 40, 720 80 C 840 120, 960 120, 1080 80 C 1200 40, 1320 40, 1440 80 C 1560 120, 1680 120, 1800 80 C 1920 40, 2040 40, 2160 80 C 2280 120, 2400 120, 2520 80 C 2640 40, 2760 40, 2880 80 L 2880 160 L 0 160 Z" fill="var(--color-blue)" />
          </g>
        </svg>
      </div>

      <div className="footer-grid">
        {/* Brand Column */}
        <div className="footer-col brand-col">
          <div className="footer-logo-block">
            <svg className="footer-logo-icon" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6">
              <path d="M50 15 C32 15, 32 50, 50 50 C68 50, 68 85, 50 85 C32 85, 32 50, 50 50 C68 50, 68 15, 50 15 Z" />
              <circle cx="50" cy="15" r="4" fill="currentColor" />
              <circle cx="50" cy="85" r="4" fill="currentColor" />
            </svg>
            <div className="footer-logo-text">
              <span className="logo-bold">yoga</span>
              <span className="logo-light">healers</span>
            </div>
          </div>
          <div className="footer-divider-line"></div>
          <div className="social-links">
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-btn" aria-label="YouTube">
              <svg viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.507 9.388.507 9.388.507s7.517 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-btn" aria-label="Instagram">
              <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" /></svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-btn" aria-label="Facebook">
              <svg viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-col link-col">
          <ul className="footer-links">
            <li><a href="#about" onClick={(e) => { e.preventDefault(); setView('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>About Us</a></li>
            <li><a href="#workshops" onClick={(e) => { e.preventDefault(); setView('workshops'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Workshops</a></li>
            <li><a href="#books" onClick={(e) => { e.preventDefault(); setView('books'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Books</a></li>
            <li><a href="#products" onClick={(e) => { e.preventDefault(); setView('products'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Shop</a></li>
            <li><a href="#yoga" onClick={(e) => { e.preventDefault(); setView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Satvic Yoga</a></li>
          </ul>
        </div>

        {/* Column 3: Secondary Links */}
        <div className="footer-col link-col">
          <ul className="footer-links">
            <li><a href="#youth" onClick={(e) => { e.preventDefault(); handleScrollTo('home'); }}>Satvic Youth</a></li>
            <li><a href="#team" onClick={(e) => { e.preventDefault(); handleScrollTo('home'); }}>Meet The Team</a></li>
            <li><a href="#stories" onClick={(e) => { e.preventDefault(); handleScrollTo('success-stories'); }}>Satvic Stories</a></li>
            <li><a href="#blogs" onClick={(e) => { e.preventDefault(); handleScrollTo('home'); }}>Blogs</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); setView('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Contact Us</a></li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div className="footer-col newsletter-col">
          <div className="newsletter-title">Join our Newsletter</div>
          <form className="newsletter-form-modern" onSubmit={handleSubscribe}>
            <div className="newsletter-input-group">
              <input
                type="text"
                className="newsletter-field"
                placeholder="Enter Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="newsletter-input-group phone-group">
              <div className="flag-select">
                <span className="flag-icon">🇮🇳</span>
                <span className="arrow-down">▼</span>
              </div>
              <input
                type="tel"
                className="newsletter-field phone-field"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="newsletter-row-submit">
              <input
                type="email"
                className="newsletter-field email-field"
                placeholder="Enter your e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn-newsletter-submit">
                Subscribe <span className="btn-arrow">➔</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-disclaimer">
          <strong>Medical Disclaimer:</strong> The information, recipes, workshops, and products provided on this website are for educational and lifestyle purposes only and do not constitute professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider before starting a detox routine, yoga program, or changing your diet.
        </div>
        <div>
          &copy; {new Date().getFullYear()} Yoga Healers. All rights reserved. Made in harmony with Nature.
        </div>
      </div>
    </footer>
  );
}
