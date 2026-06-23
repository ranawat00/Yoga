import './DailyYogaBanner.css';
import React from 'react';
import dailyYogaBannerImg from '../../assets/daily_yoga_banner.png';

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
        <div className="daily-yoga-card">
          {/* Left Column: Text & Content */}
          <div className="daily-yoga-content">
            <div className="satvic-brand">
              <svg className="satvic-logo-icon" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6">
                <path d="M50 15 C32 15, 32 50, 50 50 C68 50, 68 85, 50 85 C32 85, 32 50, 50 50 C68 50, 68 15, 50 15 Z" />
                <circle cx="50" cy="15" r="4" fill="currentColor" />
                <circle cx="50" cy="85" r="4" fill="currentColor" />
              </svg>
              <div className="satvic-brand-text">
                <span className="satvic-brand-name">yoga</span>
                <span className="satvic-brand-sub">healers</span>
              </div>
            </div>

            <h2 className="daily-yoga-title">Practice Yoga Daily with us!</h2>
            <p className="daily-yoga-tagline">
              Practice anytime for your physical & mental health from the comfort of your home!
            </p>
            <button className="btn btn-join-now" onClick={() => handleScrollTo('workshops')}>
              Join Now
            </button>
          </div>

          {/* Right Column: Image */}
          <div className="daily-yoga-image-container">
            <img 
              src={dailyYogaBannerImg} 
              alt="Daily Yoga Classes" 
              className="daily-yoga-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
