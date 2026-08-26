import React, { useState, useRef, useCallback, useEffect } from 'react';
import './HomeVideoSlider.css';
import video1 from '../../assets/homeVideo/video1.mp4';
import video2 from '../../assets/homeVideo/video2.mp4';
import video3 from '../../assets/homeVideo/video3.mp4';

const VIDEOS_DATA = [
  {
    id: 1,
    title: 'Be Positive',
    video: video1
  },
  {
    id: 2,
    title: 'Believe In Yourself',
    video: video2
  },
  {
    id: 3,
    title: 'Inner Peace',
    video: video3
  }
];

export default function HomeVideoSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef(null);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % VIDEOS_DATA.length);
  }, []);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + VIDEOS_DATA.length) % VIDEOS_DATA.length);
  }, []);

  // Automatic slide transition every 4.5 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(goNext, 4500);
    return () => clearInterval(interval);
  }, [isPaused, goNext]);

  // Synchronize scroll position with currentIndex
  useEffect(() => {
    const container = sliderRef.current;
    if (!container) return;
    const card = container.querySelector('.home-video-card');
    if (!card) return;
    const cardWidth = card.offsetWidth;
    const gap = 20;
    container.scrollTo({
      left: currentIndex * (cardWidth + gap),
      behavior: 'smooth'
    });
  }, [currentIndex]);

  const handleManualScroll = useCallback(() => {
    const container = sliderRef.current;
    if (!container) return;
    window.requestAnimationFrame(() => {
      if (!container) return;
      const scrollLeft = container.scrollLeft;
      const card = container.querySelector('.home-video-card');
      if (!card) return;
      const cardWidth = card.offsetWidth;
      const gap = 20;
      const index = Math.round(scrollLeft / (cardWidth + gap));
      setCurrentIndex(Math.min(Math.max(0, index), VIDEOS_DATA.length - 1));
    });
  }, []);

  return (
    <section className="home-video-section" id="home-video-slider">
      <div className="home-video-container">
        <div className="home-video-header">
          <span className="home-video-badge">OUR WELLNESS JOURNEY</span>
          <h2 className="home-video-main-title">EXPLORE OUR WELLNESS VIDEOS</h2>
        </div>

        <div
          className="home-video-slider-wrapper"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <button
            className="home-video-arrow prev"
            onClick={goPrev}
            aria-label="Previous video"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <div
            className="home-video-list"
            ref={sliderRef}
            onScroll={handleManualScroll}
          >
            {VIDEOS_DATA.map((item) => (
              <div key={item.id} className="home-video-card">
                <div className="home-video-media-wrapper">
                  <video
                    className="home-video-player"
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                    preload="auto"
                    ref={(el) => {
                      if (el) {
                        el.muted = true;
                        const playPromise = el.play();
                        if (playPromise !== undefined) {
                          playPromise.catch(() => {});
                        }
                      }
                    }}
                  >
                    <source src={item.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="home-video-card-content">
                  <h3 className="home-video-card-title">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>

          <button
            className="home-video-arrow next"
            onClick={goNext}
            aria-label="Next video"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>

        <div className="home-video-slider-dots">
          {VIDEOS_DATA.map((_, i) => (
            <button
              key={i}
              className={`home-video-dot ${currentIndex === i ? 'active' : ''}`}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to video slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
