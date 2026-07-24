import './Hero.css';
import React, { useState, useEffect, useRef } from 'react';
import heroVideo from '../../assets/yoga-healers-video.mp4';

export default function Hero() {
  const [views, setViews] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [graduates, setGraduates] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const node = sectionRef.current;
    // Section scroll transition triggered at 20% viewport visibility
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
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
    >
      {/* Forest Green (#186000) to Lime Green (#78a830) Background Liquid Waves */}
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
          <h1 className="hero-sage-title hero-animate-item stagger-1">
            Awaken your<br />True Potential
          </h1>

          <p className="hero-sage-subtitle hero-animate-item stagger-2">
            Your powerhouse for the real-world Transformation
          </p>

          <p className="hero-sage-tagline hero-animate-item stagger-3">
            Breathe - Thrive - Heal
          </p>

          {/* Search Pill Bar (Cream Card #f5f0e8, Warm Orange #f0812e CTA Button) */}
          <form className="hero-sage-search-pill hero-animate-item stagger-4" onSubmit={(e) => { e.preventDefault(); handleScrollTo('workshops'); }}>
            <input
              type="text"
              className="hero-sage-search-input"
              placeholder="Start your journey"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="hero-sage-search-btn" aria-label="Start your journey">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </form>

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
