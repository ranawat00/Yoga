import React from 'react';
import './DailyYogaTogether.css';
import yogaBannerImg from '../../assets/daily_yoga_together/yoga_banner.jpg';
import { useApp } from '../../hooks/useApp';

export default function DailyYogaTogether() {
  const { setView } = useApp();

  const handleRegisterClick = (e) => {
    if (e) e.stopPropagation();
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
              className="daily-yoga-together-btn"
              onClick={handleRegisterClick}
              aria-label="Register Now"
            >
              <span className="btn-label-text">REGISTER NOW</span>
              <div className="btn-icon-wrapper">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
