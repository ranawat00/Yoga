import React from 'react';
import './YHOClubHome.css';
import { useApp } from '../../hooks/useApp';
import yhoBannerImg from '../../assets/yho_club/banner.png';
import yhoPlatformBannerImg from '../../assets/yho_club/banner2.jpg';
import MediaLogos from '../../components/MediaLogos/MediaLogos';
import coachDoctorImg from '../../assets/yho_club/coach_doctor.png';
import coachTrainerImg from '../../assets/yho_club/coach_trainer.png';
import coachYogaImg from '../../assets/yho_club/coach_yoga.png';
import YHOClubFooter from './YHOClubFooter';

export default function YHOClubHome() {
  const { user, setIsRegisterModalOpen, setView } = useApp();

  const handleExplore = () => {
    if (setIsRegisterModalOpen) {
      setIsRegisterModalOpen(true);
    } else {
      setView('register-free');
    }
  };

  const stats = [
    { value: '20+', label: 'Students' },
    { value: '50+', label: 'Expert Coaches' },
    { value: '5', label: 'Days Free' },
    { value: '24/7', label: 'Peer Support' },
  ];

  const coachesGrid = [
    { id: 'c1', img: coachDoctorImg, alt: 'Doctor Consultant' },
    { id: 'c2', img: coachDoctorImg, alt: 'Doctor Consultant' },
    { id: 'c3', img: coachDoctorImg, alt: 'Doctor Consultant' },
    { id: 'c4', img: coachTrainerImg, alt: 'Fitness Coach' },
    { id: 'c5', img: coachTrainerImg, alt: 'Fitness Coach' },
    { id: 'c6', img: coachTrainerImg, alt: 'Fitness Coach' },
    { id: 'c7', img: coachYogaImg, alt: 'Yoga Mentor' },
    { id: 'c8', img: coachYogaImg, alt: 'Yoga Mentor' },
    { id: 'c9', img: coachYogaImg, alt: 'Yoga Mentor' },
  ];

  const quickActions = [
    {
      id: 'wellness-workshops',
      title: 'Wellness Workshops',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" fill="#374151" stroke="none" />
          <path d="M3.5 12h3l2-4 3 8 2-5 1.5 1h3.5" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      ),
      onClick: handleExplore,
    },
    {
      id: 'mindfulness',
      title: 'Mindfulness',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="#374151">
          <path d="M12 4C10.5 7.5 10.5 12 12 15C13.5 12 13.5 7.5 12 4Z" />
          <path d="M11 7.5C8 9 6.5 12 8 15C9.8 13.5 11 11 11 7.5Z" />
          <path d="M13 7.5C16 9 17.5 12 16 15C14.2 13.5 13 11 13 7.5Z" />
          <path d="M6.5 12.5C4 13.5 3.5 16 5.5 17.5C7.5 17 9 15.5 9.5 14C8 13 7 12.5 6.5 12.5Z" />
          <path d="M17.5 12.5C20 13.5 20.5 16 18.5 17.5C16.5 17 15 15.5 14.5 14C16 13 17 12.5 17.5 12.5Z" />
          <path d="M6 18C9 19.5 15 19.5 18 18C16 19 14 19.5 12 19.5C10 19.5 8 19 6 18Z" />
        </svg>
      ),
      onClick: handleExplore,
    },
    {
      id: 'leadership-programs',
      title: 'Leadership Development Programs',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="#374151">
          <path d="M12 4L3 20H21L12 4Z" />
        </svg>
      ),
      onClick: handleExplore,
    },
    {
      id: 'counseling',
      title: 'Counseling',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="#374151">
          <path d="M12 2C8.7 2 6 4.3 6 7.2c0 1.6.8 3.1 2.2 4.1L7.5 14l2.8-1.4c.5.2 1.1.3 1.7.3 3.3 0 6-2.3 6-5.2C18 4.3 15.3 2 12 2zm-3 5.7a.8.8 0 1 1 0-1.6.8.8 0 0 1 0 1.6zm3 0a.8.8 0 1 1 0-1.6.8.8 0 0 1 0 1.6zm3 0a.8.8 0 1 1 0-1.6.8.8 0 0 1 0 1.6z"/>
          <path d="M4 15.5c2.2 0 4.2.8 5.8 2.2l2.2 1.9c1 .9 2.4 1 3.5.3l5-3.2c.7-.4 1.5.1 1.5.9 0 .4-.2.8-.5 1l-5.2 3.3c-1.6 1-3.6.9-5.1-.3l-2.2-1.9c-1.4-1.2-3.1-1.8-4.9-1.8H3v-2.4h1z"/>
        </svg>
      ),
      onClick: handleExplore,
    },
    {
      id: 'doctor',
      title: 'Doctor',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="#374151">
          <path d="M18 10h-2V8a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v2h-2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h2v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2h2a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1z" />
          <path d="M7 11H5.5V9.5a.7.7 0 0 0-.7-.7h-1a.7.7 0 0 0-.7.7V11H1.6a.7.7 0 0 0-.7.7v1c0 .4.3.7.7.7h1.5v1.5c0 .4.3.7.7.7h1a.7.7 0 0 0 .7-.7V13.4H7a.7.7 0 0 0 .7-.7v-1a.7.7 0 0 0-.7-.7z" opacity="0.6" />
          <path d="M11 5H9.8V3.8a.6.6 0 0 0-.6-.6h-.8a.6.6 0 0 0-.6.6V5H6.6a.6.6 0 0 0-.6.6v.8c0 .3.3.6.6.6H7.8v1.2c0 .3.3.6.6.6h.8a.6.6 0 0 0 .6-.6V7H11a.6.6 0 0 0 .6-.6v-.8a.6.6 0 0 0-.6-.6z" opacity="0.6" />
          <path d="M21 5h-1.2V3.8a.6.6 0 0 0-.6-.6h-.8a.6.6 0 0 0-.6.6V5h-1.2a.6.6 0 0 0-.6.6v.8c0 .3.3.6.6.6h1.2v1.2c0 .3.3.6.6.6h.8a.6.6 0 0 0 .6-.6V7H21a.6.6 0 0 0 .6-.6v-.8a.6.6 0 0 0-.6-.6z" opacity="0.6" />
        </svg>
      ),
      onClick: handleExplore,
    },
    {
      id: 'upcoming-events',
      title: 'Upcoming Events',
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="3" ry="3" />
          <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2" />
          <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2" />
          <line x1="3" y1="10" x2="21" y2="10" strokeWidth="1.5" />
          <polygon points="12 12.5 13.2 15 16 15.3 14 17.2 14.6 20 12 18.5 9.4 20 10 17.2 8 15.3 10.8 15" fill="#374151" stroke="none" />
        </svg>
      ),
      onClick: handleExplore,
    },
  ];

  return (
    <div className="yho-home-root">

      {/* ── HERO BANNER SECTION ── */}
      <section className="yho-hero-section">
        {/* Full-width banner image */}
        <div className="yho-hero-image-wrap">
          <img
            src={yhoBannerImg}
            alt="YHO Club — Students in graduation"
            className="yho-hero-img"
          />
          {/* Dark gradient overlay so text is readable */}
          <div className="yho-hero-overlay" />
        </div>
      </section>

      {/* ── CONTENT SECTION (below image) ── */}
      <section className="yho-content-section">

        {/* Pill badge */}
        <div className="yho-support-pill">
          <span className="yho-pill-icon">🌐</span>
          <span>Supporting 20+ million students globally</span>
        </div>

        {/* Main headline */}
        <h1 className="yho-main-headline">
          24/7 SUPPORT<br />STUDENTS WELL-BEING
        </h1>
        <p className="yho-sub-headline">Safe Campus Commitment</p>

        {/* Description */}
        <p className="yho-description">
          Connects students, teachers &amp; parents with trained peers 24/7,
          providing a safe space to share and heal.
        </p>

        {/* Welcome pill (if user logged in) */}
        {user && (
          <div className="yho-welcome-chip">
            <span className="yho-welcome-avatar">
              {user.name ? user.name.charAt(0).toUpperCase() : 'S'}
            </span>
            <span>Welcome, <strong>{user.name}</strong></span>
            {user.schoolName && <span className="yho-school-tag">🏛 {user.schoolName}</span>}
          </div>
        )}

        {/* Stats Slider — infinite marquee */}
        <div className="yho-stats-slider-wrap" aria-label="Statistics">
          <div className="yho-stats-track">
            {/* Duplicate items for seamless loop */}
            {[...stats, ...stats].map((s, i) => (
              <div className="yho-stat-slide" key={i}>
                <span className="yho-stat-value">{s.value}</span>
                <span className="yho-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>



        {/* Workshop CTA */}
        <div className="yho-workshop-card">
          <p className="yho-workshop-label">5 Days Free Online Wellness workshop</p>
          <button
            type="button"
            className="yho-explore-btn"
            onClick={handleExplore}
          >
            Explore More
          </button>
        </div>

      </section>

      {/* ── LOWER CREAM SECTION (Media Logos, Quick Actions, Features) ── */}
      <section className="yho-cream-section">
        <div className="yho-cream-inner">
          {/* ── AS FEATURED ON ── */}
          <div className="yho-media-logos-wrap">
            <MediaLogos />
          </div>

          {/* ── QUICK ACTIONS SECTION ── */}
          <div className="yho-quick-actions-wrap">
            <h2 className="yho-quick-actions-heading">Quick Actions</h2>
            <div className="yho-quick-actions-grid">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  type="button"
                  className="yho-quick-action-card"
                  onClick={action.onClick}
                >
                  <div className="yho-quick-action-icon">{action.icon}</div>
                  <span className="yho-quick-action-title">{action.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── NEED SUPPORT SECTION (White Background) ── */}
      <section className="yho-support-section">
        <div className="yho-support-inner">
          <h2 className="yho-support-heading">Need Support ?</h2>
          <button
            type="button"
            className="yho-coach-cta-btn"
            onClick={handleExplore}
          >
            Talk to a Life Coach
          </button>

          <div className="yho-coaches-grid">
            {coachesGrid.map((coach) => (
              <div key={coach.id} className="yho-coach-card">
                <img src={coach.img} alt={coach.alt} className="yho-coach-avatar-img" />
              </div>
            ))}
          </div>

          <div className="yho-programs-pill">
            <span>Science backed YHO programs by our visionary Expert's</span>
          </div>
        </div>
      </section>

      {/* ── PLATFORM BANNER SECTION (The Complete Student Wellbeing Platform) ── */}
      <section className="yho-platform-section">
        <div className="yho-platform-inner">
          <div className="yho-platform-card">
            <img
              src={yhoPlatformBannerImg}
              alt="The Complete Student Wellbeing Platform"
              className="yho-platform-banner-img"
            />
            <button
              type="button"
              className="yho-platform-cta-btn"
              onClick={handleExplore}
            >
              YHO CLUB EXCLUSIVE MEMBERSHIP PLANS
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER (Dedicated YHO Club Portal Footer) ── */}
      <YHOClubFooter />
    </div>
  );
}
