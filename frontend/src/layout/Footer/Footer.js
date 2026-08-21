import './Footer.css';
import React, { useState } from 'react';
import { useApp } from '../../hooks/useApp';

export default function Footer() {
  const { addNotification, setView } = useApp();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;

    setTimeout(() => {
      addNotification(`Thank you for subscribing! We've sent a welcome guide to ${email}.`, 'success');
      setEmail('');
    }, 500);
  };

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer" id="main-footer">
      {/* Top Intense White Radial Light Glow (Matches Reference Image) */}
      <div className="footer-top-glow"></div>

      {/* Atmospheric Twinkling Starfield */}
      <div className="footer-stars-container">
        <div className="star star-1"></div>
        <div className="star star-2"></div>
        <div className="star star-3"></div>
        <div className="star star-4"></div>
        <div className="star star-5"></div>
        <div className="star star-6"></div>
        <div className="star star-7"></div>
        <div className="star star-8"></div>
        <div className="star star-9"></div>
        <div className="star star-10"></div>
        <div className="star star-11"></div>
        <div className="star star-12"></div>
      </div>

      {/* Realistic Floating Purple Cloud Silhouettes */}
      <div className="footer-clouds-layer">
        <svg className="cloud cloud-top" viewBox="0 0 1200 200" preserveAspectRatio="none">
          <path d="M 0 160 C 150 100, 300 170, 450 120 C 600 70, 750 150, 900 110 C 1050 70, 1150 130, 1200 150 L 1200 200 L 0 200 Z" fill="rgba(35, 12, 90, 0.45)" />
        </svg>
        <svg className="cloud cloud-mid" viewBox="0 0 1200 220" preserveAspectRatio="none">
          <path d="M 0 140 C 200 80, 400 160, 650 100 C 850 40, 1050 130, 1200 90 L 1200 220 L 0 220 Z" fill="rgba(20, 5, 60, 0.6)" />
        </svg>
      </div>

      <div className="footer-container">
        {/* Recreated Branding Artwork Header - Matches Reference Image Exactly */}
        <div className="footer-brand-artwork">
          <span className="artwork-tagline">AWAKEN YOUR TRUE POTENTIAL</span>
          <h2 className="artwork-title">YOGA HEALERS .ORG</h2>
          <div className="artwork-divider-line"></div>
          <div className="artwork-crescent-moon">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-5.4-5.4c0-1.81.89-3.42 2.26-4.4C12.92 3.04 12.46 3 12 3z"
                fill="#fde047"
                filter="drop-shadow(0 0 10px rgba(253, 224, 71, 0.85))"
              />
            </svg>
          </div>
        </div>

        {/* Content Format: Quick Links & Explore on Left, Newsletter & Socials on Right */}
        <div className="footer-content-grid">
          {/* Side-by-Side Links Group (Quick Links + Explore in 1 Line) */}
          <div className="footer-nav-group">
            {/* Quick Links Column */}
            <div className="footer-col nav-col">
              <h4 className="footer-col-title">Quick Links</h4>
              <ul className="footer-nav-list">
                <li><a href="/about" onClick={(e) => { e.preventDefault(); setView('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>About Us</a></li>
                <li><a href="/workshops" onClick={(e) => { e.preventDefault(); setView('workshops'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Workshops</a></li>
                <li><a href="/" onClick={(e) => { e.preventDefault(); setView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Satvic Yoga</a></li>
              </ul>
            </div>

            {/* Explore Column */}
            <div className="footer-col nav-col">
              <h4 className="footer-col-title">Explore</h4>
              <ul className="footer-nav-list">
                <li><a href="/internship" onClick={(e) => { e.preventDefault(); setView('internship'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Internship</a></li>
                <li><a href="/" onClick={(e) => { e.preventDefault(); handleScrollTo('home'); }}>Meet The Team</a></li>
                <li><a href="/blog" onClick={(e) => { e.preventDefault(); setView('blog'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Blogs</a></li>
                <li><a href="/contact" onClick={(e) => { e.preventDefault(); setView('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Contact Us</a></li>
              </ul>
            </div>
          </div>

          {/* Newsletter Column + Connect With Us Underneath */}
          <div className="footer-col newsletter-col">
            <h4 className="footer-col-title">Join our Newsletter</h4>
            <form className="newsletter-purple-form" onSubmit={handleSubscribe}>
              <div className="purple-input-wrap">
                <input
                  type="email"
                  className="purple-field"
                  placeholder="Enter your e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn-purple-subscribe">
                <span>Subscribe</span>
                <span className="arrow-icon">➔</span>
              </button>
            </form>

            {/* Connect With Us Section Under Newsletter */}
            <div className="social-subblock">
              <h4 className="footer-col-title social-title-under">Connect With Us</h4>
              <div className="social-buttons-row">
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-pill-btn" aria-label="YouTube">
                  <svg viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.507 9.388.507 9.388.507s7.517 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-pill-btn" aria-label="Instagram">
                  <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" /></svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-pill-btn" aria-label="Facebook">
                  <svg viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Notice */}
        <div className="footer-bottom">
          <p className="copyright-text">
            &copy; {new Date().getFullYear()} Yoga Healers Organisation (YHO). All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
