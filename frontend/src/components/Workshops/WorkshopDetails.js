import React, { useState, useEffect } from 'react';
import './WorkshopDetails.css';
import placeholderImg from '../../assets/workshop_1.jpg';
import heroImg from '../../assets/wrokshopDetails1.jpg';
import expImg1 from '../../assets/workshop_detail_exp_1.jpg';
import expImg2 from '../../assets/workshop_detail_exp_2.jpg';
import expImg3 from '../../assets/workshop_detail_exp_3.jpg';
import expImg4 from '../../assets/workshop_detail_exp_4.jpg';
import whatYouGainImg from '../../assets/workshop_details_gain1.jpg';
import habitsUnlockImg from '../../assets/workshopdetails_gain2.jpg';

export default function WorkshopDetails({ workshop, onBack, onRegister }) {
  // Real-time Countdown Timer State
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  useEffect(() => {
    // Parse workshop date (e.g. "18 Aug 2026" or similar)
    // For safety, let's target August 18, 2026 or fallback to a date 7 days from now if past
    let targetDate = new Date('August 18, 2026 06:00:00');
    if (isNaN(targetDate.getTime()) || targetDate.getTime() < Date.now()) {
      targetDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    }

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days: d.toString().padStart(2, '0'),
        hours: h.toString().padStart(2, '0'),
        minutes: m.toString().padStart(2, '0'),
        seconds: s.toString().padStart(2, '0')
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [workshop]);

  const renderHeroTitle = () => {
    const title = workshop.title || "";
    if (title.toLowerCase().includes("awaken")) {
      return (
        <h1 className="hero-workshop-title">
          <span className="title-highlight">AWAKEN+</span> <span className="title-outline">PROGRAM</span>
        </h1>
      );
    }
    const parts = title.split(' ');
    const first = parts[0] || "";
    const rest = parts.slice(1).join(' ') || "";
    return (
      <h1 className="hero-workshop-title">
        <span className="title-highlight">{first.toUpperCase()}</span>{' '}
        <span className="title-outline">{rest.toUpperCase()}</span>
      </h1>
    );
  };

  return (
    <div className="workshop-details-page">
      {/* Hero Header Section */}
      {workshop.title && workshop.title.toLowerCase().includes("awaken") ? (
        <div className="details-banner-card-container">
          <div className="hero-banner-wrapper">
            <img src={heroImg} className="details-hero-banner-img" alt={workshop.title} />
            <button className="details-register-btn banner-overlay-btn" onClick={onRegister}>
              <span>Register now</span>
              <div className="btn-arrow-circle">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </button>
          </div>

          {/* Curved Track Features Section */}


        </div>
      ) : (
        <section className="details-hero">
          <div className="details-hero-container">
            <div className="details-hero-text">
              <span className="join-movement-badge">JOIN THE MOVEMENT</span>
              {renderHeroTitle()}
              <p className="hero-workshop-subtitle"><span className="subtitle-highlight">7 DAYS</span> ULTIMATE HEALTH CHALLENGE</p>

              <button className="details-register-btn" onClick={onRegister}>
                <span>Register now</span>
                <div className="btn-arrow-circle">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </button>
            </div>

            <div className="details-hero-image-wrapper">
              <img src={placeholderImg} alt={workshop.title} className="details-hero-img" />
            </div>
          </div>
        </section>
      )}

      {/* Info Grid and Countdown Timer */}
      <section className="details-info-section">
        <div className="info-layout-container">
          <div className="info-cards-list">
            <div className="info-detail-card">
              <div className="info-card-icon">📅</div>
              <div className="info-card-content">
                <h4>Start Date</h4>
                <p>{workshop.date}</p>
              </div>
            </div>

            <div className="info-detail-card">
              <div className="info-card-icon">⏱️</div>
              <div className="info-card-content">
                <h4>Duration</h4>
                <p>{workshop.duration} (60 minutes per-day)</p>
              </div>
            </div>

            <div className="info-detail-card">
              <div className="info-card-icon">⏰</div>
              <div className="info-card-content">
                <h4>Choose Time Slot (ET)</h4>
                <div className="time-slots-grid">
                  <span>6:00-7:00 am</span>
                  <span>7:00-8:00 am</span>
                  <span>4:00-5:00 pm</span>
                  <span>5:00-6:00 pm</span>
                  <span>6:00-7:00 pm</span>
                  <span>7:00-8:00 pm</span>
                </div>
              </div>
            </div>

            <div className="info-detail-card">
              <div className="info-card-icon">🌐</div>
              <div className="info-card-content">
                <h4>Language</h4>
                <p>{workshop.language}</p>
              </div>
            </div>

            <div className="info-detail-card">
              <div className="info-card-icon">💵</div>
              <div className="info-card-content">
                <h4>Contribution</h4>
                <p>{workshop.price} $</p>
              </div>
            </div>
          </div>

          {/* Countdown Clock Container */}
          <div className="countdown-timer-box">
            <h3>Workshop Starting In</h3>
            <div className="countdown-grid">
              <div className="countdown-digit-block">
                <span className="digit">{timeLeft.days}</span>
                <span className="unit">days</span>
              </div>
              <div className="countdown-digit-block">
                <span className="digit">{timeLeft.hours}</span>
                <span className="unit">hours</span>
              </div>
              <div className="countdown-digit-block">
                <span className="digit">{timeLeft.minutes}</span>
                <span className="unit">mins</span>
              </div>
              <div className="countdown-digit-block">
                <span className="digit">{timeLeft.seconds}</span>
                <span className="unit">secs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Your Experience Includes Section */}
      <section className="experience-includes">
        <h2 className="section-details-heading">Your Experience Includes</h2>

        <div className="experience-items-grid">
          <div className="experience-item-card">
            <div className="experience-img-container">
              <img src={expImg1} alt="Daily Live Online Session" />
            </div>
            <h3>1 hour Daily Live Online session</h3>
            <p>Every session is a fresh and inspiring experience. It combines deep wisdom, hands-on activities, engaging stories, and practical daily practices.</p>
          </div>

          <div className="experience-item-card">
            <div className="experience-img-container">
              <img src={expImg2} alt="Natural Healing Science" />
            </div>
            <h3>Natural Healing Science</h3>
            <p>This course is designed to transform every aspect of your health, including your physical body, nutrition, sleep quality, movement, sense of purpose, relationships, and your ability to serve others. It offers a holistic approach that helps you build lasting habits and improve your overall well-being. By focusing on these interconnected areas, you will experience a comprehensive transformation that supports a healthier, more balanced life.</p>
          </div>

          <div className="experience-item-card">
            <div className="experience-img-container">
              <img src={expImg3} alt="Practice in Action" />
            </div>
            <h3>Practice in Action, Not Just Concepts</h3>
            <p>This course is different from the hundreds of health videos you've seen before, where applying what you learned was a struggle. Here, you'll actually practice what you learn to make real progress.</p>
          </div>

          <div className="experience-item-card">
            <div className="experience-img-container">
              <img src={expImg4} alt="Global Community" />
            </div>
            <h3>Global Community</h3>
            <p>You'll join a beautiful community of like-minded people from around the world taking the challenge with you, keeping you motivated every step of the way.</p>
          </div>
        </div>
      </section>

      {/* What You'll Gain Section */}
      <section className="what-you-gain">
        <h2 className="section-details-heading">What you'll Gain</h2>
        <div className="composite-image-container">
          <img src={whatYouGainImg} alt="What you'll Gain" className="composite-section-image" />
        </div>
      </section>

      {/* 7 Lifelong Habits Section */}
      <section className="habits-unlock">
        <h2 className="section-details-heading">7 Lifelong Habits You Will Unlock</h2>
        <div className="composite-image-container">
          <img src={habitsUnlockImg} alt="7 Lifelong Habits You Will Unlock" className="composite-section-image" />
        </div>
      </section>

      {/* Sticky Bottom Bar for Mobile Register */}
      <div className="sticky-details-footer">
        <div className="sticky-footer-content">
          <div className="sticky-price-info">
            <span className="sticky-title">{workshop.title}</span>
            <span className="sticky-price">{workshop.price} $</span>
          </div>
          <button className="sticky-register-btn" onClick={onRegister}>
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
}
