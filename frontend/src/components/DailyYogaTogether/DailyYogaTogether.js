import React from 'react';
import './DailyYogaTogether.css';
import yogaBannerImg from '../../assets/daily_yoga_together/yoga_banner.jpg';
import { useApp } from '../../hooks/useApp';

export default function DailyYogaTogether() {
  const { setView } = useApp();

  const handleRegisterClick = () => {
    setView('daily-yoga-together-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="daily-yoga-together-section">
      <div
        className="daily-yoga-together-container"
        onClick={handleRegisterClick}
        style={{ cursor: 'pointer' }}
        role="button"
        tabIndex="0"
        aria-label="View Daily Yoga Together details"
      >
        <div className="daily-yoga-together-image-wrapper">
          {/* Full Uncropped Banner Image */}
          <img
            src={yogaBannerImg}
            alt="Daily Yoga Together - Join The Movement"
            className="daily-yoga-together-img"
            loading="lazy"
          />
          <div className="daily-yoga-together-overlay-content">
            <button
              className="revolution-register-btn"
              onClick={handleRegisterClick}
              aria-label="Register Now"
            >
              <div className="btn-navy-block">
                <span className="btn-navy-text">REGISTER NOW</span>
              </div>
              <div className="btn-arrow-block">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
              <div className="btn-white-fill" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
