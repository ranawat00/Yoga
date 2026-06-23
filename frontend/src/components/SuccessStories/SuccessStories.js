import React, { useState, useEffect } from 'react';
import './SuccessStories.css';
import imgSleeplessness from '../../assets/success_sleeplessness_1781259684918.png';
import imgEczema from '../../assets/success_eczema_1781259707181.png';
import imgDebjani from '../../assets/success_debjani_1781259727411.png';
import imgSangeeta from '../../assets/success_sangeeta_1781259751051.png';
import imgVedant from '../../assets/success_vedant_1781259770410.png';

const SUCCESS_DATA = [
  {
    id: 'success-1',
    image: imgSleeplessness,
    title: 'Sleeplessness of 8 years, gone in 3 weeks',
    date: '14 Oct, 2021',
    readTime: '6 min read'
  },
  {
    id: 'success-2',
    image: imgEczema,
    title: 'Severe eczema gone, new skin with glow on!',
    date: '14 Oct, 2021',
    readTime: '6 min read'
  },
  {
    id: 'success-3',
    image: imgDebjani,
    title: 'How 50 year old Debjani lost 25 kilos in 8 months',
    date: '08 Mar, 2021',
    readTime: '7 min read'
  },
  {
    id: 'success-4',
    image: imgSangeeta,
    title: '60-year-old Sangeeta reverses her diabetes...',
    date: '6 Mar, 2021',
    readTime: '6 min read'
  },
  {
    id: 'success-5',
    image: imgVedant,
    title: 'Vedant reverses high cholesterol....',
    date: '6 Mar, 2021',
    readTime: '6 min read'
  }
];

export default function SuccessStories() {
  const [activeDot, setActiveDot] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Reset active dot if screen changes to avoid out-of-bounds translation
      setActiveDot(0);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalDots = isMobile ? SUCCESS_DATA.length : 2;

  const getTranslateX = () => {
    if (isMobile) {
      return `-${activeDot * 100}%`;
    }
    // Desktop: Shift by exactly 2 cards (each card is 360px + 40px gap = 400px. 2 cards = 800px)
    return `-${activeDot * 800}px`;
  };

  return (
    <section id="success-stories" className="success-stories-section">
      <div className="section-container">
        
        {/* Header */}
        <div className="success-header">
          <h2 className="section-title">Stories of Success</h2>
          <p className="section-subtitle">See how Satvic living has transformed lives</p>
        </div>

        {/* Carousel Slider Outer Wrapper */}
        <div className="success-slider-outer">
          <div 
            className="success-slider-track"
            style={{ transform: `translateX(${getTranslateX()})` }}
          >
            {SUCCESS_DATA.map((item) => (
              <div key={item.id} className="success-card">
                {/* Image Wrapper */}
                <div className="success-card-img-container">
                  <img src={item.image} alt={item.title} className="success-card-img" />
                </div>
                
                {/* Card Info Content */}
                <div className="success-card-body">
                  <h3 className="success-card-title">{item.title}</h3>
                  <div className="success-card-meta">
                    {item.date} <span className="meta-separator">|</span> {item.readTime}
                  </div>
                  <a href="#stories" className="success-card-link" onClick={(e) => e.preventDefault()}>
                    Read more <span className="arrow-icon">›</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slider Dots */}
        <div className="success-slider-dots">
          {Array.from({ length: totalDots }).map((_, index) => (
            <button
              key={index}
              className={`success-dot ${activeDot === index ? 'active' : ''}`}
              onClick={() => setActiveDot(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Bottom Terracotta Button */}
        <div className="success-actions">
          <button className="btn btn-terracotta">
            Read Stories
          </button>
        </div>

      </div>
    </section>
  );
}
