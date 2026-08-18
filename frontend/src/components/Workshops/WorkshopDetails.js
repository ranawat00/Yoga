import React, { useState, useEffect } from 'react';
import './WorkshopDetails.css';
import placeholderImg from '../../assets/workshops/workshop_1.jpg';
import heroImg from '../../assets/workshops/wrokshopDetails1.jpg';
import expImg1 from '../../assets/workshops/workshop_detail_exp_1.jpg';
import expImg2 from '../../assets/workshops/workshop_detail_exp_2.jpg';
import expImg3 from '../../assets/workshops/workshop_detail_exp_3.jpg';
import expImg4 from '../../assets/workshops/workshop_detail_exp_4.jpg';
import whatYouGainImg from '../../assets/workshops/workshop_details_gain1.jpg';
import habitsUnlockImg from '../../assets/workshops/workshopdetails_gain2.jpg';

const AWAKEN_FAQS = [
  {
    id: 1,
    question: 'What is the Awaken Plus Program?',
    answer: 'Awaken Plus is a 7-day online complete health challenge designed to help you break free from daily hustle, reconnect with your inner potential, and cultivate conscious living. Through daily actionable practices, guided sessions, and holistic health routines, it focuses on reducing stress, boosting mental clarity, and nurturing peace of mind.'
  },
  {
    id: 2,
    question: 'Who is this program for?',
    answer: 'This program is for anyone feeling overwhelmed by daily work and routine, experiencing chronic stress, or feeling disconnected from their true potential. Whether you want to improve your mental wellbeing, adopt healthier daily habits, or find deep inner peace, Awaken Plus is built to guide you step-by-step.'
  },
  {
    id: 3,
    question: 'How is the 7-day challenge delivered?',
    answer: 'The program is 100% online. Upon enrolling, you receive access to daily structured modules, guided exercises, mental wellbeing practices, and habit-building action steps that you can complete from the comfort of your home.'
  },
  {
    id: 4,
    question: 'How much time do I need to commit each day?',
    answer: 'You will need approximately 60 minutes per day. The practices are intentionally designed to fit seamlessly into a busy schedule without causing additional stress or overwhelm.'
  },
  {
    id: 5,
    question: 'What if I miss a day during the 7-day challenge?',
    answer: 'Life happens! All daily sessions, guides, and resources remain accessible to you, allowing you to catch up at your own pace or revisit any practice whenever you need a refresh.'
  },
  {
    id: 6,
    question: 'What key benefits can I expect after completing 7 days?',
    intro: 'By the end of the program, you can expect:',
    list: [
      'Reduced stress and anxiety through proven mindfulness and grounding practices.',
      'Greater mental clarity and focus to excel in work and daily decisions.',
      'A sense of inner peace and wisdom by shifting from reactive living to conscious living.',
      'Enhanced physical vitality through light, holistic health habits.',
      'Reconnection with your true potential and a clearer direction for your life.'
    ]
  },
  {
    id: 7,
    question: 'Do I need prior experience in yoga or meditation?',
    answer: 'Not at all. Awaken Plus is beginner-friendly. Every technique, practice, and exercise is introduced with clear, step-by-step guidance suitable for all experience levels.'
  },
  {
    id: 8,
    question: 'How do I join the Awaken Plus Program?',
    answer: 'You can sign up directly on our website by clicking the "Enroll Now" button. Once registered, you will receive an instant confirmation email with login details to access the program portal.'
  },
  {
    id: 9,
    question: 'What equipment or tools do I need?',
    answer: 'All you need is a stable internet connection, a smartphone or computer, a notebook or journal, and a quiet space for your daily sessions.'
  }
];

export default function WorkshopDetails({ workshop, onBack, onRegister }) {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

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

      {/* FAQ Accordion Section */}
      <section className="faq-details-section">
        <div className="faq-header-wrapper-custom">
          <span className="faq-small-title">FAQ</span>
          <h2 className="faq-large-title">AWAKEN + PROGRAM</h2>
        </div>

        <div className="faq-accordion-container">
          {AWAKEN_FAQS.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={faq.id}
                className={`faq-accordion-item ${isOpen ? 'active' : ''}`}
                onClick={() => toggleFaq(index)}
              >
                <div className="faq-accordion-header">
                  <h3 className="faq-question-text">{faq.question}</h3>
                  <div className={`faq-chevron-icon ${isOpen ? 'rotate' : ''}`}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>
                <div className={`faq-accordion-body ${isOpen ? 'show' : ''}`}>
                  {faq.list ? (
                    <div className="faq-answer-content">
                      <p className="faq-intro-text">{faq.intro}</p>
                      <ul className="faq-bullet-list">
                        {faq.list.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p>{faq.answer}</p>
                  )}
                </div>
              </div>
            );
          })}
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
