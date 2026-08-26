import React from 'react';
import './DailyYogaTogether.css';
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
      <div className="daily-yoga-together-container">
        <h2 className="daily-yoga-together-title">
          ONE MEMBERSHIP ULTIMATE REWARDS
        </h2>

        <p className="daily-yoga-together-description">
          Step into an extraordinary realm of privilege reserved for the discerning few. As a member, you unlock exclusive access to bespoke experiences, private invitations, and unparalleled personalization. Indulge in a world where luxury knows no bounds and every moment is curated to perfection.
        </p>

        <div className="daily-yoga-together-btn-wrapper">
          <button
            className="daily-yoga-together-join-btn"
            onClick={handleRegisterClick}
            aria-label="Join Now"
          >
            <span>JOIN NOW</span>
            <span className="daily-yoga-together-btn-arrow">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </span>
          </button>
        </div>

        <p className="daily-yoga-together-tagline">
          Elevate your lifestyle — your exceptional journey begins now.
        </p>
      </div>
    </section>
  );
}
