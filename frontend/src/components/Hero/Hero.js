import './Hero.css';
import React, { useState, useEffect } from 'react';
import heroVideo from '../../assets/yoga-healers-video.mp4';

export default function Hero() {
  const [views, setViews] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [graduates, setGraduates] = useState(0);

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
    { text: `${graduates} k+`, label: "Workshop Graduates" },
  ];

  return (
    <header id="home" className="hero-sage">
      {/* Bold Diagonal Liquid Silk Wave Background */}
      <div className="hero-liquid-wave-bg" aria-hidden="true">
        <div className="liquid-wave liquid-wave-1"></div>
        <div className="liquid-wave liquid-wave-2"></div>
        <div className="liquid-wave liquid-wave-3"></div>
        <div className="liquid-wave liquid-wave-4"></div>
        <div className="liquid-wave liquid-wave-highlight"></div>
      </div>

      <div className="hero-sage-container">
        {/* Header Text Block */}
        <div className="hero-sage-header-block">
          <h1 className="hero-sage-title">
            Awaken your<br />True Potential
          </h1>

          <p className="hero-sage-subtitle">
            Your powerhouse for the real-world Transformation
          </p>

          <p className="hero-sage-tagline">
            Breathe - Thrive - Heal
          </p>

          {/* Call-to-Action Pill Button with Arrow Circle */}
          <div className="hero-sage-cta-wrapper">
            <button className="hero-sage-btn" onClick={() => handleScrollTo('workshops')}>
              <span>Start your Journey</span>
              <span className="hero-sage-btn-arrow">➔</span>
            </button>
          </div>

          {/* Automatic Continuous Infinite Slider for Metric Chips */}
          <div className="hero-sage-metrics-marquee-wrapper">
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

        {/* Video Content Container with Aura Halo */}
        <div className="hero-sage-video-container">
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
