import React, { useState, useEffect } from 'react';
import './LungsDetoxDetails.css';

import heroImg from '../../assets/workshops/lungs1.jpg';
import expImg1 from '../../assets/workshops/lungs2.jpg';
import expImg2 from '../../assets/workshops/lungs3.jpg';
import expImg3 from '../../assets/workshops/lungs4.png';
import expImg4 from '../../assets/workshops/lungs5.jpg';
import whatYouGainImg from '../../assets/workshops/lungs6.jpg';
import habitsUnlockImg from '../../assets/workshops/lungs7.jpg';
import banner from '../../assets/workshops/second_workshop_details_1.jpg';

export default function LungsDetoxDetails({ workshop, onBack, onRegister }) {
  // Real-time Countdown Timer State
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  useEffect(() => {
    // Parse workshop date (e.g. "1 September" or similar)
    let dateStr = workshop.date || '';
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

  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const LUNGS_FAQS = [
    {
      q: 'What is the Ultimate Lungs Detox Challenge?',
      a: 'The Ultimate Lungs Detox Challenge is a structured 53-day online workshop powered by YHO\'s modern breathwork and transformation methodology. It is designed to deep-cleanse and reset your respiratory system, release stored emotional pressure, and activate mental clarity through a blend of natural healing science and guided daily practice.'
    },
    {
      q: 'Who is this workshop for?',
      a: 'This program is ideal for anyone looking to optimize their lung capacity, clear physical or emotional congestion, improve posture, and build unshakeable daily health habits. Whether you suffer from shallow breathing, stiffness from long hours of sitting, or stress-related chest tension, this workshop provides a complete reset.'
    },
    {
      q: 'When and where do the sessions take place?',
      a: 'The challenge is held 100% live online. Participants meet for 1 hour daily in live interactive sessions where you will be guided through breathwork, postural alignment, and habit-building exercises.'
    },
    {
      q: 'What if I miss a live session?',
      a: 'While live attendance is encouraged to maintain momentum and community energy, session resources, guidance notes, and recordings (where applicable) are made available so you never fall behind on your 53-day streak.'
    },
    {
      q: 'Why is the challenge 53 days long?',
      a: 'Real transformation requires time to rewrite neural pathways and replace ingrained patterns. Over 53 days, you transition from temporary short-term effort to permanent, mindful discipline—ensuring your new health practices become second nature for life.'
    },
    {
      q: 'What is YHO\'s breathwork and transformation methodology?',
      a: 'YHO\'s methodology combines modern respiratory science with ancient breath practices. It focuses on functional breath re-education, nervous system regulation, and emotional release to help you break free from stress patterns and optimize oxygen delivery throughout your body.'
    },
    {
      q: 'How does Guided Postural Alignment help with lung detox?',
      a: 'Prolonged sitting and slouching collapse the thoracic cavity, limiting your diaphragm\'s range of motion. Our targeted yoga postures (asanas) focus on chest expansion, reversing upper-body stiffness, strengthening intercostal muscles, and opening up physical space for deeper, natural airflow.'
    },
    {
      q: 'How does lung detox help release emotional pressure?',
      a: 'The respiratory system tightly mirrors your emotional state—stress and unspoken tension often physically lodge in the chest and diaphragm as shallow breathing patterns. Through systematic breathwork and movement, you release these physical blockages, creating deep mental clarity and emotional relief.'
    }
  ];

  return (
    <div className="workshop-details-page">
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
              <img src={heroImg} alt="Daily Live Online Session" />
            </div>
            <h3>1 hour Daily Live Online session</h3>
            <p>Every session is a fresh and inspiring experience. It combines deep wisdom, hands-on activities, engaging stories, and practical daily practices. Experience 1 hour of daily, step-by-step guided practice from the comfort of your home. The impact: Eliminates travel hassle and fits seamlessly into your morning or evening routine, making it effortless to stay consistent.</p>
          </div>

          <div className="experience-item-card">
            <div className="experience-img-container">
              <img src={expImg1} alt="Natural Healing Science" />
            </div>
            <h3>Natural Healing Science</h3>
            <p>This course is designed to transform every aspect of your health, including your physical body, nutrition, sleep quality, movement, sense of purpose, relationships, and your ability to serve others. It offers a holistic approach that helps you build lasting habits and improve your overall well-being. Dedicated training in powerful breathwork techniques (Pranayama) designed to expand lung capacity, clear bronchial congestion, and improve oxygen saturation. Helps flush out lingering toxins, reduces breathlessness, and significantly boosts overall vital energy (Prana).</p>
          </div>

          <div className="experience-item-card">
            <div className="experience-img-container">
              <img src={expImg2} alt="Habit-Building & Consistency Support" />
            </div>
            <h3>Habit-Building & Consistency Support</h3>
            <p>A structured 53-day journey designed to transform health practices from short-term efforts into lifelong, mindful habits. Guided accountability helps you stay motivated, overcome resistance, and build resilient daily discipline.</p>
          </div>

          <div className="experience-item-card">
            <div className="experience-img-container">
              <img src={expImg3} alt="Guided Postural Alignment for Chest Expansion" />
            </div>
            <h3>Guided Postural Alignment for Chest Expansion</h3>
            <p>Targeted Asana (yoga postures) focused on opening the thoracic cavity, improving posture, and strengthening respiratory muscles (diaphragm and intercostals). Reverses stiffness from prolonged sitting, enhances airflow, and promotes deeper, natural breathing throughout the day.</p>
          </div>

          <div className="experience-item-card">
            <div className="experience-img-container">
              <img src={expImg4} alt="Global Community" />
            </div>
            <h3>Global Community</h3>
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

      {/* FAQ Section with Smooth Accordion Animation */}
      <section className="faq-details-section">
        <div className="faq-header-wrapper-custom">
          <span className="faq-small-title">FAQ</span>
          <h2 className="faq-large-title">LUNGS DETOX PROGRAM</h2>
        </div>

        <div className="faq-accordion-container">
          {LUNGS_FAQS.map((faq, index) => {
            const isOpen = activeFaq === index;
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
