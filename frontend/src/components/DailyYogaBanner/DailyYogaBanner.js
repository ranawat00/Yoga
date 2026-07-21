import './DailyYogaBanner.css';
import React from 'react';
import Logo from '../Logo/Logo';
import awakenBannerImg from '../../assets/awaken_program_banner.jpg';

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
              <Logo size={46} />
            </div>

            <h2 className="daily-yoga-title">Practice Yoga Daily with us!</h2>
            <p className="daily-yoga-tagline">
              Practice anytime for your physical & mental health from the comfort of your home!
            </p>
            <button className="btn btn-join-now" onClick={() => handleScrollTo('workshops')}>
              Become a Member
            </button>
          </div>

          {/* Right Column: Image */}
          <div className="daily-yoga-image-container">
            <img loading="lazy"
              src={awakenBannerImg}
              alt="Awaken+ Program - 3 Day Mind-body-spirit Transformation"
              className="daily-yoga-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
