import './Hero.css';
import React, { useState, useEffect, useRef } from 'react';
import heroVideo from '../../assets/hero/yoga_hero.mp4';
import heroBanner from '../../assets/hero/hero_banner.jpg';
import heroDesktop from '../../assets/hero/hero_desktop.jpg';
import { useApp } from '../../hooks/useApp';
// Trigger fresh Vercel build

export default function Hero() {
  const { setView } = useApp();
  const [views, setViews] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [graduates, setGraduates] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const [isBtnHovered, setIsBtnHovered] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    let startTimestamp = null;
    const duration = 2000;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      setViews((progress * 1.0).toFixed(1));
      setFollowers((progress * 8.0).toFixed(1));
      setGraduates(Math.floor(progress * 500));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setViews("1");
        setFollowers("8");
        setGraduates("500");
      }
    };

    window.requestAnimationFrame(step);
  }, []);

  const metricItems = [
    { text: "20+ Million", label: "connects" },
    { text: `${views} Billion+`, label: "Total Views" },
    { text: `${followers} Million+`, label: "Total Followers" },
    { text: `${graduates} k+`, label: "Graduates" },
  ];

  return (
    <header
      id="home"
      ref={sectionRef}
      className={`hero-sage ${isVisible ? 'in-view' : ''}`}
      style={{
        '--hero-desktop-bg': `url(${heroDesktop})`,
        '--hero-mobile-bg': `url(${heroBanner})`
      }}
    >

      {/* Centered Top Header Block */}
      <div className="hero-sage-top-header hero-animate-item stagger-1">
        <h1 className="hero-sage-title">
          <span className="hero-title-top">Awaken</span>
          <span className="hero-title-bottom">Your True Potential</span>
        </h1>

        <p className="hero-sage-subtitle">
          Your powerhouse for the real-world<br />
          Transformation
        </p>

        <p className="hero-sage-tagline breathe-pulse-anim">
          Breathe - Thrive - Heal
        </p>
      </div>

      <div className="hero-sage-container">
        {/* Header Text Block */}
        <div className="hero-sage-header-block">

          <div className="hero-sage-highlight-banner hero-animate-item stagger-4">
            <span className="hero-sage-highlight-start">Start your</span>
            <div className="hero-sage-highlight-boxes">
              <div className="hero-sage-free-tag">
                <span className="hero-sage-free-text">Free</span>
              </div>
              <div className="hero-sage-yellow-box">
                <span className="hero-sage-num-5">5</span>
                <span className="hero-sage-box-text">DAYS ONLINE YOGA WORKSHOP</span>
              </div>
            </div>
          </div>

          <button
            className={`hero-sage-register-btn hero-animate-item stagger-5${isBtnHovered ? ' btn-shaking' : ''}`}
            onMouseEnter={() => setIsBtnHovered(true)}
            onMouseLeave={() => setIsBtnHovered(false)}
            onClick={() => {
              setView('register-free');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span>Explore More</span>
            <span className="hero-sage-arrow-circle">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
          </button>

          {/* Metric Chips Marquee Slider (Cream #f5f0e8 Cards, Dark Green #134400 Text) */}
          <div className="hero-sage-metrics-marquee-wrapper hero-animate-item stagger-5">
            <div className="hero-sage-metrics-marquee-track">
              {/* Group 1 */}
              <div className="hero-sage-metrics-group">
                {metricItems.map((item, idx) => (
                  <div key={`g1-${idx}`} className="hero-sage-metric-pill">
                    <strong>{item.text}</strong> {item.label}
                  </div>
                ))}
              </div>
              {/* Group 2 (Clone for infinite seamless loop) */}
              <div className="hero-sage-metrics-group">
                {metricItems.map((item, idx) => (
                  <div key={`g2-${idx}`} className="hero-sage-metric-pill">
                    <strong>{item.text}</strong> {item.label}
                  </div>
                ))}
              </div>
              {/* Group 3 (Extra clone for wide screen coverage) */}
              <div className="hero-sage-metrics-group">
                {metricItems.map((item, idx) => (
                  <div key={`g3-${idx}`} className="hero-sage-metric-pill">
                    <strong>{item.text}</strong> {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Video Content Container in Cream (#f5f0e8) Card Frame */}
        <div className="hero-sage-video-container hero-animate-item stagger-6">
          <div className="hero-video-aura-wrapper">
            <div className="hero-video-aura-halo"></div>
            <div className="hero-sage-video-card">
              <video
                src={heroVideo}
                autoPlay
                loop
                muted
                playsInline
                controls
                preload="metadata"
                className="hero-sage-video-el"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
