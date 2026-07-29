import './DailyYogaBanner.css';
import React from 'react';
import yogaBannerImg from '../../assets/banner_yoga.jpg';

export default function DailyYogaBanner() {
  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="daily-yoga-section">
      {/* SVG Wave Divider for down-up-down-up wave transition */}
      <div className="daily-yoga-wave-divider">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="wave-svg">
          <path d="M0,40 C200,40 350,90 500,80 C650,70 850,25 1000,35 C1100,42 1150,52 1200,60 L1200,120 L0,120 Z" fill="currentColor" />
        </svg>
      </div>
      <div className="daily-yoga-container">
        {/* Top Header Content */}
        <div className="daily-yoga-top-content">
          <h2 className="top-banner-title">Step into a Better Tomorrow, Starting Today</h2>
          <div className="top-banner-sub">Breath — Science — Awakening</div>
          <p className="top-banner-desc">
            Master your potential. From raising your consciousness and climbing the professional ladder to making powerful relationships and increasing your well being, your path to holistic growth begins now. Define your goals, and let us help you become an even better version of yourself
          </p>
        </div>

        <div className="daily-yoga-card">
          <div className="daily-yoga-image-wrapper">
            <img loading="lazy"
              src={yogaBannerImg}
              alt="Start Your 5 Days Online Free Yoga"
              className="daily-yoga-img"
            />

            {/* Register for Free Pill Button Overlay on Image */}
            <div className="daily-yoga-overlay-content">
              <button className="btn-register-free" onClick={() => handleScrollTo('workshops')}>
                <span className="btn-text">Register for Free</span>
                <span className="btn-arrow-circle">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="7 17 12 12 7 7" />
                    <polyline points="13 17 18 12 13 7" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
