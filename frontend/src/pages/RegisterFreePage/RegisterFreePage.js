import React, { useEffect, useRef, useState } from 'react';
import yogaWomanImg from '../../assets/register_hero.jpg';
import sunsetImg from '../../assets/register_free_second.jpg';
import logoImg from '../../assets/logo.png';
import registerBenefitsImg from '../../assets/register_2.png';

// Mentor images from educators
import mentor_1 from '../../assets/mentor_1.png';
import mentor_2 from '../../assets/mentor_2.png';
import mentor_3 from '../../assets/mentor_3.png';
import mentor_4 from '../../assets/mentor_4.png';
import mentor_5 from '../../assets/mentor_5.png';
import mentor_6 from '../../assets/mentor_6.png';

// Success story images
import success_1 from '../../assets/success_sangeeta_1781259751051.webp';
import success_2 from '../../assets/success_debjani_1781259727411.webp';
import success_3 from '../../assets/success_vedant_1781259770410.webp';
import success_4 from '../../assets/success_eczema_1781259707181.webp';

import MediaLogos from '../../components/MediaLogos/MediaLogos';
import './RegisterFreePage.css';

/* ── Animated counter hook ────────────────────────────────── */
function useCountUp(target, duration = 1800, started = false, delay = 0) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) {
      setCount(0);
      return;
    }
    const timer = setTimeout(() => {
      let startTime = null;
      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(eased * target));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay);
    return () => clearTimeout(timer);
  }, [target, duration, started, delay]);
  return count;
}

/* ── Stats Section ────────────────────────────────────────── */
function StatsSection() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const connects = useCountUp(20, 1600, visible, 200); // 0.2s delay
  const years = useCountUp(14, 1400, visible, 500); // 0.5s delay

  return (
    <section className="register-stats-section" ref={ref}>
      <div className={`stats-card stats-card--wide${visible ? ' stats-visible' : ''}`} style={{ animationDelay: '0.2s' }}>
        <div className="stats-number">
          <span className="stats-count">{connects}</span>
          <span className="stats-plus">+</span>
          <span className="stats-unit"> Million</span>
        </div>
        <p className="stats-label">GLOBAL CONNECTS</p>
      </div>
      <div className="stats-row">
        <div className={`stats-card stats-card--half${visible ? ' stats-visible' : ''}`} style={{ animationDelay: '0.5s' }}>
          <div className="stats-number">
            <span className="stats-count">{years}</span>
            <span className="stats-plus">+</span>
          </div>
          <p className="stats-label">YEARS OF EXPERIENCED<br />MENTORS</p>
        </div>
        <div className={`stats-card stats-card--half stats-card--highlight${visible ? ' stats-visible' : ''}`} style={{ animationDelay: '0.8s' }}>
          <p className="stats-recognised">Globally<br />Recognised</p>
          <div className="stats-stars">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className={`star-icon${visible ? ' star-pop' : ''}`}
                style={{ animationDelay: `${1.1 + i * 0.15}s` }}
                viewBox="0 0 24 24" width="22" height="22">
                <polygon
                  points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                  fill="#f5a623" stroke="#f5a623" strokeWidth="1"
                />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Mentor data ──────────────────────────────────────────── */
const MENTORS = [
  { img: mentor_1, name: 'DR.RIYA BARLA', role: 'Gynaecologist & Life Coach' },
  { img: mentor_2, name: 'VIKRAM CHATURVEDI', role: 'Wellness coach' },
  { img: mentor_3, name: 'GAYATHRI BL', role: 'Wellness coach' },
  { img: mentor_4, name: 'DAVID JOHN', role: 'HR Head ' },
  { img: mentor_5, name: 'KANCHAN MEHTA', role: 'Life Coach & Nutritionist ' },
  { img: mentor_6, name: 'BENSON JOHNSON', role: 'Relationship Manager' },
];

/* ── Success Stories data ─────────────────────────────────── */
const STORIES = [
  {
    id: 1,
    name: 'Smita Lath',
    subtitle: '53 years | 93 Yoga Days',
    rating: '4.5',
    text: "Yoga has become a natural part of my life. I've lost 2 kg and am aiming to lose 3 more, confident that I will achieve it with continued effort. The changes in my nutrition have also been significant. Habuild has helped me change my lifestyle, which seem difficult earlier.",
    img: success_1
  },
  {
    id: 2,
    name: 'Debjani',
    subtitle: '42 years | 120 Yoga Days',
    rating: '5.0',
    text: "I used to suffer from severe back pain, but regular yoga practice has completely transformed my posture and strength. I feel more energetic and my digestion has improved immensely. This program has been a lifesaver.",
    img: success_2
  },
  {
    id: 3,
    name: 'Vedant Sharma',
    subtitle: '35 years | 60 Yoga Days',
    rating: '4.8',
    text: "The meditation and breathing exercises have significantly reduced my stress and anxiety levels. I sleep better now and wake up feeling refreshed. The mentors are incredibly supportive and knowledgeable.",
    img: success_3
  },
  {
    id: 4,
    name: 'Aarti Desai',
    subtitle: '29 years | 45 Yoga Days',
    rating: '4.9',
    text: "My flexibility has increased dramatically. I started as a complete beginner and was intimidated, but the classes are designed so well. I have noticed a huge difference in my overall well-being and focus.",
    img: success_4
  }
];

/* ── Success Stories Slider ───────────────────────────────── */
function SuccessStories() {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let isDown = false;

    const interval = setInterval(() => {
      if (slider.matches(':hover') || isDown) return; // Pause on hover or touch
      if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 20) {
        slider.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        slider.scrollBy({ left: 350, behavior: 'smooth' }); // scroll by one card (340px + gap)
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="register-success-section">
      <h2 className="register-success-title">OUR SUCCESS STORIES</h2>
      <div
        className="register-success-slider"
        ref={sliderRef}
      >
        {STORIES.map(story => (
          <div key={story.id} className="register-success-card">
            <div className="register-success-header">
              <img src={story.img} alt={story.name} className="register-success-img" />
              <div className="register-success-info">
                <h4 className="register-success-name">{story.name}</h4>
                <p className="register-success-subtitle">{story.subtitle}</p>
                <div className="register-success-rating-row">
                  <span className="register-success-rating">{story.rating}</span>
                  <svg viewBox="0 0 24 24" width="14" height="14" className="register-success-star">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill="#fce205" />
                  </svg>
                  <div className="register-success-google">
                    <svg viewBox="0 0 24 24" width="16" height="16">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <hr className="register-success-divider" />
            <p className="register-success-text">{story.text}</p>
          </div>
        ))}
      </div>
      <h2 className="register-success-title register-faq-title">FREQUENTLY ASKED QUESTIONS</h2>
    </section>
  );
}

/* ── Mentor Slider ────────────────────────────────────────── */
function MentorSlider() {
  const [current, setCurrent] = useState(0);
  const trackRef = useRef(null);
  const touchStart = useRef(null);
  const timerRef = useRef(null);

  const total = MENTORS.length;


  const goTo = (idx) => {
    const next = (idx + total) % total;
    setCurrent(next);
  };

  // Auto-advance every 3.5s
  useEffect(() => {
    timerRef.current = setInterval(() => setCurrent(c => (c + 1) % total), 3500);
    return () => clearInterval(timerRef.current);
  }, [total]);

  // Touch swipe
  const onTouchStart = (e) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { diff > 0 ? goTo(current + 1) : goTo(current - 1); }
    touchStart.current = null;
    // Reset auto-timer on manual swipe
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setCurrent(c => (c + 1) % total), 3500);
  };

  // Show 3 cards: prev, current, next — circular
  const visible = [
    MENTORS[(current - 1 + total) % total],
    MENTORS[current],
    MENTORS[(current + 1) % total],
  ];

  return (
    <section className="mentor-slider-section">
      <h2 className="mentor-slider-title">YOUR MENTORS</h2>

      <div
        className="mentor-track"
        ref={trackRef}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {visible.map((mentor, i) => (
          <div
            key={mentor.name + i}
            className={`mentor-card${i === 1 ? ' mentor-card--active' : ''}`}
          >
            <div className="mentor-img-wrap">
              <img src={mentor.img} alt={mentor.name} className="mentor-img" />
            </div>
            <p className="mentor-name">{mentor.name.toUpperCase()}</p>
            <p className="mentor-role">{mentor.role}</p>
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="mentor-dots">
        {MENTORS.map((_, i) => (
          <button
            key={i}
            className={`mentor-dot${i === current ? ' mentor-dot--active' : ''}`}
            onClick={() => { goTo(i); clearInterval(timerRef.current); timerRef.current = setInterval(() => setCurrent(c => (c + 1) % total), 3500); }}
            aria-label={`Go to mentor ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

/* ── Main Page ────────────────────────────────────────────── */
export default function RegisterFreePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="register-free-page">

      {/* Hero Section (First View) */}
      <section className="register-hero-section">
        <img src={yogaWomanImg} alt="Yoga pose" className="register-hero-img reveal-on-load stagger-1" />
        <div className="register-hero-content">
          <span className="register-cta-overline reveal-on-load stagger-1">START YOUR WELLNESS JOURNEY</span>
          <h2 className="register-cta-title reveal-on-load stagger-2">Your Transformation<br />Starts here</h2>
          <p className="register-cta-subtitle reveal-on-load stagger-3">Take the first step towards<br />a healthier, balanced you</p>

          <p className="register-commitment-text reveal-on-load stagger-3">
            We are committed to guiding you on a transformative journey towards self-discovery, empowerment, and holistic well-being
          </p>

          <div className="register-highlight-banner reveal-on-load stagger-4">
            <span className="register-highlight-start">Start your</span>
            <div className="register-highlight-boxes">
              <span className="register-green-box">5 Days Online</span>
              <span className="register-highlight-divider">|</span>
              <span className="register-green-box">Free Yoga Workshop</span>
            </div>
          </div>
        </div>
      </section>

      {/* Media Logos */}
      <section className="register-logos-section reveal-on-load stagger-2">
        <MediaLogos />
      </section>

      {/* Welcome Section */}
      <section className="register-welcome-section">
        <img src={sunsetImg} alt="Welcome to Yoga Healers Organisation" className="register-welcome-img reveal-on-load stagger-2" />
        <div className="register-welcome-content">
          <h2 className="register-welcome-title reveal-on-load stagger-3">
            <span className="register-welcome-title-top">Welcome to</span>
            <span className="register-welcome-title-bottom">Yoga Healers Organisation</span>
          </h2>
          <div className="register-welcome-badge reveal-on-load stagger-4">
            <img src={logoImg} alt="Yoga Healers Organisation Logo" className="register-welcome-logo" />
          </div>
          <h3 className="register-welcome-subtitle reveal-on-load stagger-4">
            Connecting a Global Family of<br />Wellness Seekers
          </h3>
          <p className="register-welcome-desc reveal-on-load stagger-5">
            Rooted in the ancient wisdom of India—the world capital of yoga—our wellness
            experts nurture your health from its foundation. By blending time-tested
            traditions with personalized guidance, they cultivate deep inner balance,
            enrich your daily routine, and empower you with lasting vitality, clarity,
            and purpose for a truly meaningful life.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Benefits Image Section (register_2.png) */}
      <section className="register-benefits-section">
        <img
          src={registerBenefitsImg}
          alt="Benefits of Yoga"
          className="register-benefits-img reveal-on-load stagger-3"
        />
      </section>

      {/* Bottom CTA — Image as background, text overlaid on top */}

      <MentorSlider />

      {/* Success Stories Section */}
      <SuccessStories />

    </div>
  );
}
