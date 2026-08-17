import React from 'react';
import { useApp } from '../../hooks/useApp';
import './AboutUsPage.css';
import '../RegisterFreePage/RegisterFreePage.css';
import bannerImg from '../../assets/about_us/banner.jpg';
import secondImg from '../../assets/about_us/second.jpg';
import thirdImg from '../../assets/about_us/third.jpg';
import aboutVideo from '../../assets/about_us/about.mp4';
import { MentorSlider, SuccessStories } from '../RegisterFreePage/RegisterFreePage';

function CounterNumber({ end, duration = 1800, suffix = "" }) {
  const [count, setCount] = React.useState(0);
  const countRef = React.useRef(null);
  const [hasAnimated, setHasAnimated] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const stepTime = Math.max(Math.floor(duration / Math.max(end, 1)), 35);
          const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start >= end) {
              clearInterval(timer);
            }
          }, stepTime);
        }
      },
      { threshold: 0.2 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return <span ref={countRef}>{count}{suffix}</span>;
}

export default function AboutUsPage() {
  const { setView } = useApp();

  return (
    <div className="about-us-page">
      {/* Hero Banner Section using about_us/banner.jpg */}
      <section className="about-banner-hero">
        <div className="about-banner-container">
          <div className="about-banner-card">
            <img
              src={bannerImg}
              alt="Teaching the World the Art of Conscious Living"
              className="about-banner-img"
            />
          </div>
        </div>
      </section>

      {/* Second Section: Global Movement Statement & Image */}
      <section className="about-movement-section">
        <div className="about-movement-text-wrapper">
          <p className="about-movement-text">
            The Yoga Healers Organisation (YHO) fills the vital gap. YHO is a transformative global movement dedicated to teaching the skills, mindsets, and conscious practices that matter most.
          </p>
        </div>
        <div className="about-movement-img-wrapper">
          <img 
            src={secondImg} 
            alt="Yoga Healers Transformative Movement" 
            className="about-movement-img" 
          />
        </div>
      </section>

      {/* Third Section: Core Mission & Philosophy */}
      <section className="about-mission-philosophy">
        <div className="about-container">
          <h2 className="about-mission-heading">THE YHO CORE MISSION & PHILOSOPHY</h2>
          <div className="about-mission-content">
            <p className="about-mission-lead">
              At YHO, learning is designed as a lifelong adventure that unleashes the fullest potential of your mind, body, and spirit. The organization operates on a simple premise: personal growth and collective well-being are deeply interconnected.
            </p>
            <ul className="about-mission-list">
              <li>
                <strong>Conscious Living:</strong> Moving beyond mere survival to cultivate high energy, unbreakable joy, and deep self-awareness.
              </li>
              <li>
                <strong>Peak Performance & Vitality:</strong> Helping individuals thrive at work while maintaining a youthful, vibrant, and healthy body.
              </li>
              <li>
                <strong>State-of-the-art Learning:</strong> Integrating traditional wisdom with modern transformational techniques, expert educators, and a world-class digital learning platform.
              </li>
            </ul>
            <div className="about-philosophy-img-wrapper">
              <img 
                src={thirdImg} 
                alt="State-of-the-art Learning, Your True Potential, Conscious Living Diagram" 
                className="about-philosophy-img" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Fourth Section: Key Areas of Impact & Stats */}
      <section className="about-impact-section">
        <div className="about-container">
          {/* Stats Cards */}
          <div className="about-stats-cards-wrapper">
            <div className="about-stat-card full-card">
              <div className="stat-card-number">
                <CounterNumber end={20} suffix="+" /> <span className="stat-card-unit">Million</span>
              </div>
              <div className="stat-card-label">GLOBAL CONNECTS</div>
            </div>
            <div className="about-stats-split-row">
              <div className="about-stat-card half-card">
                <div className="stat-card-number">
                  <CounterNumber end={14} suffix="+" />
                </div>
                <div className="stat-card-label">YEARS OF EXPERIENCED MENTORS</div>
              </div>
              <div className="about-stat-card half-card star-card">
                <div className="stat-card-title">Globally Recognised</div>
                <div className="stat-card-stars">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Areas of Impact Content */}
          <div className="about-impact-content-wrapper">
            <h2 className="about-impact-heading">KEY AREAS OF IMPACT & COMMUNITY INITIATIVES</h2>
            <p className="about-impact-intro">
              <strong>YHO</strong> reaches every corner of society, ensuring that conscious living and mental health support are accessible to all walks of life.
            </p>

            <div className="about-impact-items-list">
              <div className="about-impact-item">
                <h3 className="impact-item-title">Youth & Student Empowerment</h3>
                <p className="impact-item-desc">
                  Training the next generation of resilient, conscious leaders equipped for personal success and social responsibility.
                </p>
              </div>

              <div className="about-impact-item">
                <h3 className="impact-item-title">Corporate & Workplace Health</h3>
                <p className="impact-item-desc">
                  Addressing burnout, mental health, and stress management to foster healthy corporate environments.
                </p>
              </div>

              <div className="about-impact-item">
                <h3 className="impact-item-title">Global NGO & Community Outreach</h3>
                <p className="impact-item-desc">
                  Collaborating internationally to uplift underserved populations, with a focused effort on women and children.
                </p>
              </div>

              <div className="about-impact-item">
                <h3 className="impact-item-title">Sustainable Development & Peace</h3>
                <p className="impact-item-desc">
                  Running public awareness campaigns and sustainable camps aimed at fostering global harmony and social unity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fifth Section: Driven Global Community & Video */}
      <section className="about-community-section">
        <div className="about-community-full-wrapper">
          <div className="hero-video-aura-wrapper about-video-aura">
            <div className="hero-video-aura-halo"></div>
            <div className="hero-sage-video-card about-sage-video-card">
              <video
                src={aboutVideo}
                autoPlay
                muted
                loop
                playsInline
                controls
                preload="auto"
                className="hero-sage-video-el about-community-video"
              />
            </div>
          </div>

          <div className="about-community-content">
            <h2 className="about-community-heading">A DRIVEN GLOBAL COMMUNITY</h2>
            <p className="about-community-text">
              Beyond its programs and curricula, YHO is a dynamic global movement. It unites the dedicated educators, passionate team members, and a vibrant community, all driven by a shared purpose: to support personal transformation for themselves and others while fostering global peace.
            </p>
          </div>
        </div>
      </section>

      {/* Sixth Section: Mentors */}
      <MentorSlider />

      {/* Seventh Section: Success Stories */}
      <SuccessStories showFaqTitle={false} />
    </div>
  );
}
