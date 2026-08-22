import './DailyYogaBanner.css';
import React from 'react';
import yogaBannerImg from '../../assets/banners/banner_yoga.jpg';
import { useApp } from '../../hooks/useApp';

export default function DailyYogaBanner() {
  const { setView } = useApp();

  return (
    <section className="daily-yoga-section">
      <div className="daily-yoga-container">
        {/* Top Header Content */}
        <div className="daily-yoga-header-content">
          <div className="top-banner-sub">Breath — Science — Awakening</div>
          <p className="top-banner-desc">
            Master your potential. From raising your consciousness and climbing the professional ladder to making powerful relationships and increasing your well being, your path to holistic growth begins now.
          </p>
        </div>

        {/* Right Side / Middle: Image Banner Card */}
        <div className="daily-yoga-right-banner">
          <div className="daily-yoga-card">
            <div className="daily-yoga-image-wrapper">
              <img loading="lazy"
                src={yogaBannerImg}
                alt="Start Your 5 Days Online Free Yoga"
                className="daily-yoga-img"
              />

              {/* Register Now Pill Button Overlay on Image */}
              <div className="daily-yoga-overlay-content">
                <button className="btn-register-free" onClick={() => setView('register-free')}>
                  <span className="btn-arrow-circle">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </span>
                  <span className="btn-text">REGISTER NOW</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tagline directly below banner */}
        <div className="daily-yoga-bottom-tagline">
          One decision - Five days - Life long clarity
        </div>
      </div>
    </section>
  );
}
