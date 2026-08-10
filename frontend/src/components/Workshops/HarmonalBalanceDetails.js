import React, { useState, useEffect } from 'react';
import './HarmonalBalanceDetails.css';

import banner from '../../assets/workshops/hero_image_hermonal.jpg';
import expImg1 from '../../assets/workshops/workshop_detail_exp_1.jpg';
import expImg2 from '../../assets/workshops/workshop_detail_exp_2.jpg';
import expImg3 from '../../assets/workshops/workshop_detail_exp_3.jpg';
import expImg4 from '../../assets/workshops/workshop_detail_exp_4.jpg';
import hermonal3 from '../../assets/workshops/hermonal3.jpg';
import whatYouGainImg from '../../assets/workshops/workshop_details_gain1.jpg';
import habitsUnlockImg from '../../assets/workshops/workshopdetails_gain2.jpg';

export default function HarmonalBalanceDetails({ workshop, onBack, onRegister }) {
  // Real-time Countdown Timer State
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  useEffect(() => {
    // Parse workshop date (e.g. "22nd August" or similar)
    let dateStr = workshop.date || '';
    // Clean up suffix like "nd", "th" if present
    dateStr = dateStr.replace(/(st|nd|rd|th)/g, '');
    if (dateStr && !dateStr.includes('2026')) {
      dateStr = `${dateStr.trim()} 2026 06:00:00`;
    }
    let targetDate = new Date(dateStr);
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

  return (
    <div className="workshop-details-page harmonal-balance-details">
      {/* Hero Header Section */}
      <div className="details-banner-card-container">
        <div className="hero-banner-wrapper">
          <img src={banner} className="details-hero-banner-img" alt={workshop.title} />
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
      </div>

      {/* Info Grid and Countdown Timer */}
      <section className="details-info-section">
        <div className="info-layout-container">
          <div className="info-cards-list">
            <div className="info-detail-card">
              <div className="info-card-icon">📅</div>
              <div className="info-card-content">
                <h4>Start Date</h4>
                <p>{workshop.date ? workshop.date.toUpperCase() : ''}</p>
              </div>
            </div>

            <div className="info-detail-card">
              <div className="info-card-icon">⏱️</div>
              <div className="info-card-content">
                <h4>Duration</h4>
                <p>{workshop.duration ? workshop.duration.toUpperCase() : ''} (60 minutes per-day)</p>
              </div>
            </div>

            <div className="info-detail-card">
              <div className="info-card-icon">⏰</div>
              <div className="info-card-content">
                <h4>Choose Time Slot (ET)</h4>
                <div className="time-slots-grid">
                  <span>6:00–7:00 am</span>
                  <span>7:00–8:00 am</span>
                  <span>4:00–5:00 pm</span>
                  <span>5:00–6:00 pm</span>
                  <span>6:00–7:00 pm</span>
                  <span>7:00–8:00 pm</span>
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

      {/* PCOS / PMOS Infographic Section */}
      <section className="infographic-section">
        <div className="infographic-text-block">
          <h2 className="info-title">Sound like something you've experienced?</h2>
          <p className="info-description">
            PCOS was renamed Polyendocrine Metabolic Ovarian Syndrome (PMOS) since the previous moniker was misleading: ovarian cysts do not appear in all instances. The new title correctly reflects its complicated, all-encompassing character, which includes several hormone systems, metabolic health, and reproductive concerns.
          </p>
          <div className="pmos-concept">
            <p className="pmos-heading">PCOS is now PMOS</p>
            <p className="pmos-sub">A name that validates the human reality of the condition.</p>
            <p className="pmos-full">(Polyendocrine Metabolic Ovarian Syndrome)</p>
          </div>
        </div>
        <div className="infographic-image-side">
          <img src={hermonal3} alt="PCOS vs PMOS Infographic" className="infographic-img" />
        </div>
      </section>

      {/* You Are Not Alone Section */}
      <section className="not-alone-section">
        <p className="not-alone-eyebrow">You are not Alone.</p>
        <h2 className="not-alone-heading">What if the problem isn't what we think it is?</h2>
        <p className="not-alone-body">
          Women are often trained to accept exhaustion, painful periods, and emotional ups and downs as typical life experiences, to be endured or hidden.
        </p>
        <p className="not-alone-emphasis">
          <strong>But what if your symptoms do not indicate a defect?</strong><br />
          What if your body isn't working against you, but rather trying to communicate something important?
        </p>
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
            <p>Experience 1 hour of daily, step-by-step guided practice from the comfort of your home. Eliminates travel hassle and fits seamlessly into your daily routine.</p>
          </div>

          <div className="experience-item-card">
            <div className="experience-img-container">
              <img src={expImg2} alt="Natural Hormone Healing Science" />
            </div>
            <h3>Natural Hormone Healing Science</h3>
            <p>Targeting the root cause of thyroid issues, PCOS/PMOS, hormonal imbalances, and chronic fatigue. Learn dietary shifts, detoxification, and natural lifestyle corrections to restore balance.</p>
          </div>

          <div className="experience-item-card">
            <div className="experience-img-container">
              <img src={expImg3} alt="Therapeutic Yoga & Breathwork" />
            </div>
            <h3>Therapeutic Yoga & Breathwork</h3>
            <p>Dedicated practice of specialized endocrine-stimulating Asanas (yoga postures) and Pranayamas (breathing techniques) designed to regulate glands and boost vital energy.</p>
          </div>

          <div className="experience-item-card">
            <div className="experience-img-container">
              <img src={expImg4} alt="Stress & Sleep Synchronization" />
            </div>
            <h3>Stress & Sleep Synchronization</h3>
            <p>Address the nervous system's connection to hormones. Learn deep relaxation practices and circadian rhythm rules to keep cortisol low and progesterone/melatonin balanced.</p>
          </div>

          <div className="experience-item-card">
            <div className="experience-img-container">
              <img src={expImg1} alt="Global Healing Community" />
            </div>
            <h3>Global Healing Community</h3>
            <p>You’ll join a beautiful community of like-minded people from around the world taking the challenge with you, keeping you motivated every step of the way.</p>
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
