import React from 'react';
import { useApp } from '../../context/AppContext';
import './AboutUs.css';
import aboutHeroImg from '../../assets/yoga-hero.png';
import storyImg from '../../assets/daily_yoga_banner.png';

export default function AboutUs() {
  const { setView } = useApp();

  return (
    <div className="about-us-page">
      {/* Hero Banner Section */}
      <section className="about-hero">
        <div className="about-hero-overlay"></div>
        <img src={aboutHeroImg} alt="Serene Yoga Practice" className="about-hero-bg" />
        <div className="about-hero-content">
          <span className="about-tagline">OUR MISSION</span>
          <h1 className="about-title">Building a Drug-Free World</h1>
          <p className="about-subtitle">
            We are on a journey to guide individuals back to nature's design, helping reverse chronic lifestyle diseases using ancient yoga philosophy and natural healing.
          </p>
        </div>
      </section>

      {/* Core Philosophy (Three Pillars) */}
      <section className="about-pillars">
        <div className="about-container">
          <h2 className="section-title">The Three Pillars of Healing</h2>
          <p className="section-subtitle">Living in harmony with your body's inherent intelligence</p>

          <div className="pillars-grid">
            <div className="pillar-card">
              <div className="pillar-icon-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3>Natural Diet (Ahar)</h3>
              <p>Rejuvenating the body with live, organic, plant-based food. Consuming living water and enzyme-rich meals to activate healing.</p>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4l3 3" />
                </svg>
              </div>
              <h3>Active Practice (Vihar)</h3>
              <p>Unlocking physical energy through daily yogic asanas, rhythmic pranayama, cold water therapies, and sunlight exposure.</p>
            </div>

            <div className="pillar-card">
              <div className="pillar-icon-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <h3>Mental Stillness (Chichar)</h3>
              <p>Cultivating peace using deep mindfulness practices, daily meditation, active gratitude, and dedicating service to others.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story / Founder Note */}
      <section className="about-story">
        <div className="about-container story-flex">
          <div className="story-img-container">
            <img src={storyImg} alt="Spreading Satvic Wellness" className="story-img" />
          </div>
          <div className="story-content">
            <span className="story-tag">HOW WE STARTED</span>
            <h2>Our Story</h2>
            <p>
              Founded in 2021, Yoga Healers began with a simple observation: modern healthcare manages symptoms, but nature cures the root cause. What started as online community healing sessions soon transformed into a global wellness movement.
            </p>
            <p>
              Today, we have guided over 50,000+ individuals to reverse lifestyle ailments including thyroid imbalance, type-2 diabetes, hypertension, eczema, and insomnia. We don't prescribe medicines; we simply teach you how to build the right internal climate for your body to heal itself.
            </p>
            <div className="about-stats-row">
              <div className="stat-box">
                <span className="stat-num">50K+</span>
                <span className="stat-label">Healed Minds</span>
              </div>
              <div className="stat-box">
                <span className="stat-num">98%</span>
                <span className="stat-label">Success Rate</span>
              </div>
              <div className="stat-box">
                <span className="stat-num">12+</span>
                <span className="stat-label">Countries Reach</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="about-values">
        <div className="about-container">
          <h2 className="section-title">Values We Stand By</h2>
          <div className="values-grid">
            <div className="value-item">
              <h4>Scriptural Authenticity</h4>
              <p>We respect timeless wisdom. All our protocols are directly aligned with classical Hatha Yoga and natural laws.</p>
            </div>
            <div className="value-item">
              <h4>Scientific Simplicity</h4>
              <p>Health should not be complicated. We break down complex metabolic concepts into easy, daily rituals.</p>
            </div>
            <div className="value-item">
              <h4>Unconditional Seva</h4>
              <p>Healing is a service. We dedicate a portion of our work to community outreach programs and free education.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Action / CTA */}
      <section className="about-cta">
        <div className="about-container">
          <h2>Take Your First Step Towards Healing</h2>
          <p>Join our upcoming 7-Day Heal Yourself Challenge to experience the power of natural detoxification.</p>
          <button className="btn btn-blue btn-cta-about" onClick={() => { setView('home'); setTimeout(() => { document.getElementById('workshops')?.scrollIntoView({ behavior: 'smooth' }); }, 200); }}>
            Explore Workshops
          </button>
        </div>
      </section>
    </div>
  );
}
