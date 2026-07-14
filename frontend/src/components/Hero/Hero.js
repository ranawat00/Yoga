import './Hero.css';
import React, { useState, useEffect } from 'react';
import Logo from '../Logo/Logo';
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
    const duration = 2000; // 2 seconds counting animation

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      // Views: 0 to 1.0 Billion
      setViews((progress * 1.0).toFixed(1));
      
      // Followers: 0 to 8.0 Million
      setFollowers((progress * 8.0).toFixed(1));

      // Graduates: 0 to 500 k
      setGraduates(Math.floor(progress * 500));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        // Ensure final values are exactly match the design
        setViews("1");
        setFollowers("8");
        setGraduates("500");
      }
    };

    window.requestAnimationFrame(step);
  }, []);

  return (
    <header id="home" className="hero">
      {/* Ambient background video */}
      <div className="hero-video-bg-container">
        <video 
          src={heroVideo} 
          autoPlay 
          loop 
          muted 
          playsInline
          className="hero-video-bg-el"
        />
        <div className="hero-video-bg-overlay"></div>
      </div>

      <div className="hero-grid">
        {/* Left Side Text Content */}
        <div className="hero-text-block">
          <div className="hero-brand-logo">
            <Logo variant="full" size={32} />
          </div>
          
          <p className="hero-tagline">
            is a community-driven health revolution to help you reach the peak of your physical, mental, and spiritual well-being
          </p>

          <div className="hero-buttons">
            <button className="btn btn-blue btn-explore" onClick={() => handleScrollTo('workshops')}>
              Explore Workshops
            </button>
          </div>
        </div>

        {/* Left Side Stats */}
        <div className="hero-stats-container">
          <div className="hero-stats-row marquee-track">
            {/* First Set */}
            <div className="hero-stats-group">
              <div className="hero-stat-card">
                <span className="hero-stat-number">{views} Billion+</span>
                <span className="hero-stat-label">Total Views</span>
              </div>
              <div className="hero-stat-card">
                <span className="hero-stat-number">{followers} Million+</span>
                <span className="hero-stat-label">Total Followers</span>
              </div>
              <div className="hero-stat-card">
                <span className="hero-stat-number">{graduates} k+</span>
                <span className="hero-stat-label">Workshop Graduates</span>
              </div>
            </div>
            {/* Second Cloned Set for seamless marquee */}
            <div className="hero-stats-group cloned-group">
              <div className="hero-stat-card">
                <span className="hero-stat-number">{views} Billion+</span>
                <span className="hero-stat-label">Total Views</span>
              </div>
              <div className="hero-stat-card">
                <span className="hero-stat-number">{followers} Million+</span>
                <span className="hero-stat-label">Total Followers</span>
              </div>
              <div className="hero-stat-card">
                <span className="hero-stat-number">{graduates} k+</span>
                <span className="hero-stat-label">Workshop Graduates</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Video */}
        <div className="hero-image-container">
          <div className="hero-illustration-card">
            <video 
              src={heroVideo} 
              autoPlay 
              loop 
              muted 
              playsInline
              className="hero-illustration-video"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
