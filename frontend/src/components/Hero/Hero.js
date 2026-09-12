import './Hero.css';
import React, { useState, useEffect, useRef } from 'react';
import heroVideo from '../../assets/hero/yoga_hero.mp4';
import heroBanner from '../../assets/hero/hero_banner.jpg';
import heroDesktop from '../../assets/hero/hero_desktop1.jpg';
import hero1 from '../../assets/hero/hero1.jpg';
import hero2 from '../../assets/hero/hero2.jpg';
import hero3 from '../../assets/hero/hero3.jpg';
import hero4 from '../../assets/hero/hero4.jpg';
import hero5 from '../../assets/hero/hero5.jpg';
import hero6 from '../../assets/hero/hero6.jpg';
import hero7 from '../../assets/hero/hero7.jpg';
import { useApp } from '../../hooks/useApp';

const HERO_PHONE_SLIDES = [
  { id: 1, img: hero1, alt: 'Yoga Healers - Awaken Your True Potential (Slide 1)' },
  { id: 2, img: hero2, alt: 'Yoga Healers - Awaken Your True Potential (Slide 2)' },
  { id: 3, img: hero3, alt: 'Yoga Healers - Awaken Your True Potential (Slide 3)' },
  { id: 4, img: hero4, alt: 'Yoga Healers - Awaken Your True Potential (Slide 4)' },
  { id: 5, img: hero5, alt: 'Yoga Healers - Awaken Your True Potential (Slide 5)' },
  { id: 6, img: hero6, alt: 'Yoga Healers - Awaken Your True Potential (Slide 6)' },
  { id: 7, img: hero7, alt: 'Yoga Healers - Awaken Your True Potential (Slide 7)' },
];

export default function Hero() {
  const { setView } = useApp();
  const [views, setViews] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [graduates, setGraduates] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const [isBtnHovered, setIsBtnHovered] = useState(false);

  // Phone view slider state (runs automatically)
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);
  const pauseTimeoutRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Automatic slide rotation (every 3.5s) on phone view
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_PHONE_SLIDES.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [isPaused]);

  const pauseTemporarily = () => {
    setIsPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 5000);
  };

  const handleNextSlide = () => {
    pauseTemporarily();
    setCurrentSlide((prev) => (prev + 1) % HERO_PHONE_SLIDES.length);
  };

  const handlePrevSlide = () => {
    pauseTemporarily();
    setCurrentSlide((prev) => (prev - 1 + HERO_PHONE_SLIDES.length) % HERO_PHONE_SLIDES.length);
  };

  const handleTouchStart = (e) => {
    if (e.touches && e.touches.length > 0) {
      touchStartXRef.current = e.touches[0].clientX;
      touchEndXRef.current = e.touches[0].clientX;
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches.length > 0) {
      touchEndXRef.current = e.touches[0].clientX;
    }
  };

  const handleTouchEnd = () => {
    const diff = touchStartXRef.current - touchEndXRef.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNextSlide();
      } else {
        handlePrevSlide();
      }
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
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Phone-Only Automatic Full-Width Background Slider (Hero 1 to 7) */}
      <div className="hero-phone-slider" aria-label="Hero mobile slider">
        <div
          className="hero-phone-slider-track"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {HERO_PHONE_SLIDES.map((slide, idx) => (
            <div
              key={slide.id}
              className={`hero-phone-slide ${idx === currentSlide ? 'active' : ''}`}
            >
              <img
                src={slide.img}
                alt={slide.alt}
                className="hero-phone-slide-img"
                loading={idx <= 1 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
        </div>
        {/* Slider Dot Indicators */}
        <div className="hero-phone-slider-dots">
          {HERO_PHONE_SLIDES.map((_, idx) => (
            <button
              key={idx}
              className={`hero-phone-dot ${idx === currentSlide ? 'active' : ''}`}
              onClick={() => { pauseTemporarily(); setCurrentSlide(idx); }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Centered Top Header Block (Desktop/Tablet) */}
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

          {/* Subtitle and Tagline (Shown on phone view right below the cursive text) */}
          <div className="hero-sage-phone-text-block hero-animate-item stagger-2">
            <p className="hero-sage-subtitle-phone">
              Your Powerhouse for the real world<br />
              Transformation
            </p>
            <p className="hero-sage-tagline-phone">
              Breathe - Thrive - Heal
            </p>
          </div>

          {/* Metric Chips Marquee Slider (White rounded rectangular cards) */}
          <div className="hero-sage-metrics-marquee-wrapper hero-animate-item stagger-3">
            <div className="hero-sage-metrics-marquee-track">
              {/* Group 1 */}
              <div className="hero-sage-metrics-group">
                {metricItems.map((item, idx) => (
                  <div key={`g1-${idx}`} className="hero-sage-metric-pill">
                    <strong>{item.text}</strong> {item.label}
                  </div>
                ))}
              </div>
              {/* Group 2 */}
              <div className="hero-sage-metrics-group">
                {metricItems.map((item, idx) => (
                  <div key={`g2-${idx}`} className="hero-sage-metric-pill">
                    <strong>{item.text}</strong> {item.label}
                  </div>
                ))}
              </div>
              {/* Group 3 */}
              <div className="hero-sage-metrics-group">
                {metricItems.map((item, idx) => (
                  <div key={`g3-${idx}`} className="hero-sage-metric-pill">
                    <strong>{item.text}</strong> {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Highlight Banner */}
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

          {/* Phone Workshop Title: "5 Days Free Online Wellness workshop" */}
          <h2 className="hero-sage-phone-workshop-title hero-animate-item stagger-4">
            5 Days Free Online Wellness workshop
          </h2>

          <button
            className={`hero-sage-register-btn hero-animate-item stagger-5${isBtnHovered ? ' btn-shaking' : ''}`}
            onMouseEnter={() => setIsBtnHovered(true)}
            onMouseLeave={() => setIsBtnHovered(false)}
            onClick={() => {
              setView('register-free');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span className="hero-sage-btn-text">Explore More</span>
            <span className="hero-sage-arrow-circle">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
          </button>
        </div>

        {/* Video Content Container in Cream (#f5f0e8) Card Frame with Purple Glow */}
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
