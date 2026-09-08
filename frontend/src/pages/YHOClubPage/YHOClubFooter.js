import React, { useState } from 'react';
import './YHOClubFooter.css';
import Logo from '../../common/Logo/Logo';
import { useApp } from '../../hooks/useApp';

export default function YHOClubFooter() {
  const { addNotification, setIsRegisterModalOpen } = useApp();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    if (addNotification) {
      addNotification(`Subscribed! Weekly student wellness guide sent to ${email}`, 'success');
    }
    setEmail('');
  };

  const scrollToSupport = () => {
    const el = document.querySelector('.yho-support-section') || document.querySelector('.yho-platform-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="yhof-footer" id="yho-club-footer">
      {/* Soft Glow at Top */}
      <div className="yhof-top-glow" />

      {/* Atmospheric Starfield */}
      <div className="yhof-stars-container">
        <div className="yhof-star yhof-star-1" />
        <div className="yhof-star yhof-star-2" />
        <div className="yhof-star yhof-star-3" />
        <div className="yhof-star yhof-star-4" />
        <div className="yhof-star yhof-star-5" />
        <div className="yhof-star yhof-star-6" />
      </div>

      <div className="yhof-container">
        {/* Brand Header with Glass Logo Badge & Gradient Divider */}
        <div className="yhof-brand-header">
          <div className="yhof-brand-left" onClick={scrollToTop}>
            <div className="yhof-logo-badge">
              <Logo size={42} />
            </div>
            <div className="yhof-brand-text">
              <span className="yhof-domain-title">yhocrew.org</span>
              <span className="yhof-tagline-sub">STUDENT WELLBEING PORTAL</span>
            </div>
          </div>
          <div className="yhof-divider-line" />
        </div>

        {/* Content Grid: Side-by-Side Links on Left, Newsletter & Socials on Right */}
        <div className="yhof-content-grid">
          {/* Side-by-Side Links Group (Quick Links + Safe Space in 1 Line) */}
          <div className="yhof-nav-group">
            {/* Quick Links Column */}
            <div className="yhof-col yhof-nav-col">
              <h4 className="yhof-col-title">Student Care</h4>
              <ul className="yhof-nav-list">
                <li>
                  <button type="button" onClick={scrollToSupport} className="yhof-nav-btn">
                    Talk to a Coach
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setIsRegisterModalOpen && setIsRegisterModalOpen(true)}
                    className="yhof-nav-btn"
                  >
                    5 Days Free Wellness
                  </button>
                </li>
                <li>
                  <button type="button" onClick={scrollToTop} className="yhof-nav-btn">
                    Peer Support 24/7
                  </button>
                </li>
              </ul>
            </div>

            {/* Safe Space Column */}
            <div className="yhof-col yhof-nav-col">
              <h4 className="yhof-col-title">Safe Space</h4>
              <ul className="yhof-nav-list">
                <li><span className="yhof-static-badge">🛡️ 100% Confidential</span></li>
                <li><span className="yhof-static-badge">🔒 Encrypted Network</span></li>
                <li><span className="yhof-static-badge">🎓 Verified Mentors</span></li>
              </ul>
            </div>
          </div>

          {/* Newsletter Column + Connect Underneath */}
          <div className="yhof-col yhof-newsletter-col">
            <h4 className="yhof-col-title">Student Wellness Bulletin</h4>
            <form className="yhof-newsletter-form" onSubmit={handleSubscribe}>
              <div className="yhof-input-wrap">
                <input
                  type="email"
                  className="yhof-field"
                  placeholder="Enter your student email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="yhof-btn-subscribe">
                <span>Subscribe</span>
                <span className="yhof-arrow">➔</span>
              </button>
            </form>

            {/* Connect / Socials Subblock */}
            <div className="yhof-social-subblock">
              <a href="mailto:support@yhocrew.org" className="yhof-helpline-pill">
                <span className="yhof-pulse-dot" />
                <span>support@yhocrew.org</span>
              </a>

              <div className="yhof-social-row">
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="yhof-social-btn" aria-label="YouTube">
                  <svg viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.507 9.388.507 9.388.507s7.517 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                </a>
                <a href="https://www.instagram.com/yoga_healers?igsi=OWU5Zm42dmV5MW4x" target="_blank" rel="noreferrer" className="yhof-social-btn" aria-label="Instagram">
                  <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" /></svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="yhof-social-btn" aria-label="Facebook">
                  <svg viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Notice */}
        <div className="yhof-bottom">
          <p className="yhof-copyright">
            &copy; {new Date().getFullYear()} YHO Club · Student Wellbeing Initiative. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
