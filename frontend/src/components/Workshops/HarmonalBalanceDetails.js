import React, { useState, useEffect } from 'react';
import './HarmonalBalanceDetails.css';

import banner from '../../assets/workshops/hermona_banner.jpg';
import hermonal3 from '../../assets/workshops/hermonal3.jpg';
import brainHeadImg from '../../assets/workshops/brain_head_icon.png';
import growthArrowsImg from '../../assets/workshops/growth_arrows_icon.png';
import greenPointerImg from '../../assets/workshops/green_pointer_icon.png';
import blueArrowImg from '../../assets/workshops/blue_arrow_icon.png';
import sunHandsImg from '../../assets/workshops/sun_hands_icon.png';
import hermonal2 from '../../assets/workshops/hermonal2.jpg';
import hermonal4 from '../../assets/workshops/hermonal4.jpg';

export default function HarmonalBalanceDetails({ workshop, onBack, onRegister }) {
  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqList = [
    {
      q: "Who is this workshop for?",
      a: "Women aged 21–55 dealing with hormonal shifts, irregular cycles, fatigue, sleep disruptions, or mood changes—regardless of whether you have an official perimenopause or menopause diagnosis."
    },
    {
      q: "What if I'm still having regular periods?",
      a: "You're welcome. Many women experience subtle hormonal changes despite having a regular cycle. This workshop will guide you in understanding and responding to your body's early signals."
    },
    {
      q: "Can I ask questions live?",
      a: "Definitely! There will be time reserved at the end for a live Q&A where you can ask your wellness coach/counselor your questions directly."
    },
    {
      q: "Why you should join our online Ultimate Harmonal Balance program ?",
      a: "Designed by a team of wellness coaches, doctors, and psychologists, the Ultimate Hormonal Balance Program offers a transformative approach to correcting hormonal imbalances. Delivered entirely online from the comfort of your home, it connects you with a global community all working toward a shared goal: reclaiming and elevating your ultimate health."
    },
    {
      q: "Why this ultimate harmonal balance program is for 3 months ?",
      a: "Real hormonal balance doesn't happen overnight. Three months allow us to address root causes, track full cycle shifts, and build lasting habits from the comfort of your home."
    },
    {
      q: "When shall I receive the confirmation message?",
      a: "Once you register, we’ll instantly send your confirmation details straight to your WhatsApp or email."
    },
    {
      q: "Why We Charge a Fee ?",
      a: "We charge a program fee to ensure your full commitment, maintain high standards of comfort, and deliver tangible, result-oriented outcomes. Additionally, 5% of every fee is directly invested in our charity initiatives—empowering women through education and supporting local projects to build stronger, resilient communities."
    }
  ];

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
      <section className="experience-includes-section">
        <h2 className="experience-main-title">Your Experience Includes</h2>

        <div className="experience-cards-wrapper">
          {/* Card 1: 1 hour Daily Live Online session */}
          <div className="experience-card-box">
            <div className="live-status-pill">
              <span className="live-status-dot"></span>
              <span className="live-status-text">LIVE</span>
            </div>

            <h3 className="exp-card-heading">1 hour Daily Live Online session</h3>

            <div className="exp-card-body-text">
              <p>
                Every session is a fresh and inspiring experience. It combines deep wisdom, hands-on activities, engaging stories, and practical daily practices.
              </p>
              <p>
                Experience <strong>1 hour of daily, step-by-step guided practice</strong> from the comfort of your home.
              </p>
              <p>
                <strong>The impact:</strong> Eliminates travel hassle and fits seamlessly into your morning or evening routine, making it effortless to stay consistent.
              </p>
            </div>

            <div className="exp-card-top-icon" style={{ marginTop: '1.2rem', marginBottom: 0 }}>
              <img src={brainHeadImg} alt="Brain Head Logo" className="exp-card-icon-img" />
            </div>
          </div>

          {/* Card 2: A Clear Understanding of Your Body (Separate Card) */}
          <div className="experience-card-box">
            <h3 className="exp-card-heading" style={{ textAlign: 'center' }}>A Clear Understanding of Your Body</h3>

            <div className="exp-card-body-text text-center">
              <p>
                You will learn to decode fatigue, mood shifts, and cycle irregularities, shifting from simply managing discomfort to understanding what your body truly needs.
              </p>
            </div>

            <div className="exp-card-top-icon" style={{ marginTop: '1.2rem', marginBottom: 0 }}>
              <img src={growthArrowsImg} alt="Growth Arrows Logo" className="exp-card-icon-img" />
            </div>
          </div>

          {/* Card 3: A Personalized Food & Lifestyle Framework */}
          <div className="experience-card-box">
            <h3 className="exp-card-heading" style={{ textAlign: 'center' }}>A Personalized Food & Lifestyle Framework</h3>

            <div className="exp-card-body-text text-center">
              <p>
                No rigid diets or unsustainable routines. You'll receive practical, nourishment-first principles and daily habits designed to support your hormone health naturally and fit seamlessly into your life.
              </p>
            </div>

            <div className="exp-card-top-icon" style={{ marginTop: '1.2rem', marginBottom: 0 }}>
              <img src={greenPointerImg} alt="Personalized Framework Pointer" className="exp-card-icon-img" />
            </div>
          </div>

          {/* Card 4: Step-by-Step Action Plans & Roadmap */}
          <div className="experience-card-box">
            <h3 className="exp-card-heading" style={{ textAlign: 'center' }}>Step-by-Step Action Plans & Roadmap</h3>

            <div className="exp-card-body-text text-center">
              <p>
                Eliminate the guesswork entirely. Each month brings clear, actionable strategies that guide your transition from identifying root causes to establishing lasting hormonal harmony.
              </p>
            </div>

            <div className="exp-card-top-icon" style={{ marginTop: '1.2rem', marginBottom: 0 }}>
              <img src={blueArrowImg} alt="Action Plans Arrow Roadmap" className="exp-card-icon-img" />
            </div>
          </div>

          {/* Card 5: Dedicated Guidance & Accountable Support */}
          <div className="experience-card-box">
            <h3 className="exp-card-heading" style={{ textAlign: 'center' }}>Dedicated Guidance & Accountable Support</h3>

            <div className="exp-card-body-text text-center">
              <p>
                You won't navigate this transition alone. Through regular check-ins and expert support, you'll receive the encouragement, adjustments, and answers needed to keep you moving forward with confidence.
              </p>
            </div>

            <div className="exp-card-top-icon" style={{ marginTop: '1.2rem', marginBottom: 0 }}>
              <img src={sunHandsImg} alt="Dedicated Guidance Sun Hands" className="exp-card-icon-img" />
            </div>
          </div>

          {/* Card 6: Unshakable Clarity for Your Next Chapter */}
          <div className="experience-card-box">
            <h3 className="exp-card-heading" style={{ textAlign: 'center' }}>Unshakable Clarity for Your Next Chapter</h3>

            <div className="exp-card-body-text text-center">
              <p>
                Walk away feeling grounded, energized, and self-assured in your body. You will leave the program with sustainable tools and a clear path to maintain long-term balance, vitality, and peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What You Will Unlock Section */}
      <section className="session-unlock-section">
        <h2 className="session-unlock-title">What you will unlock during this session !</h2>

        <div className="session-unlock-bars">
          <div className="unlock-gradient-bar">
            <span>Navigating life’s transitions with grace and clarity</span>
          </div>

          <div className="unlock-gradient-bar">
            <span>Understanding the natural wisdom of your body</span>
          </div>

          <div className="unlock-gradient-bar">
            <span>Moving forward with purpose and direction</span>
          </div>

          <div className="unlock-gradient-bar">
            <span>Everyday guidance for nourishment and well-being</span>
          </div>
        </div>
      </section>

      {/* What You Will Gain Section */}
      <section className="what-you-will-gain-section">
        <h2 className="what-you-will-gain-title">what you will gain</h2>
        <div className="gain-image-wrapper">
          <img src={hermonal2} alt="what you will gain" className="gain-section-image" />
        </div>
      </section>

      {/* 7 Lifelong Habits Section */}
      <section className="habits-unlock-section">
        <h2 className="habits-unlock-title">7 Lifelong Habits You Will Unlock</h2>
        <div className="habits-image-wrapper">
          <img src={hermonal4} alt="7 Lifelong Habits You Will Unlock" className="habits-section-image" />
        </div>
      </section>

      {/* FAQ Section with Smooth Accordion Animation */}
      <section className="faq-details-section">
        <h2 className="faq-section-title">FAQ</h2>

        <div className="faq-accordion-container">
          {faqList.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className={`faq-accordion-item ${isOpen ? 'active' : ''}`}
                onClick={() => toggleFaq(index)}
              >
                <div className="faq-accordion-header">
                  <h3 className="faq-question-text">{faq.q}</h3>
                  <div className={`faq-chevron-icon ${isOpen ? 'rotate' : ''}`}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>

                <div className={`faq-accordion-body ${isOpen ? 'show' : ''}`}>
                  <p>{faq.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
