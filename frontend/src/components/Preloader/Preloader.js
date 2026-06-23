import React, { useEffect, useState } from 'react';
import './Preloader.css';

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // Disable scrolling while loading
    document.body.style.overflow = 'hidden';

    // Start fade out animation
    const fadeTimer = setTimeout(() => {
      setFade(true);
    }, 2200);

    // Completely remove from DOM
    const removeTimer = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = '';
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
      document.body.style.overflow = '';
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`preloader-overlay ${fade ? 'preloader-fade-out' : ''}`}>
      <div className="preloader-backdrop-glow"></div>
      
      {/* Meditative pulsing rings */}
      <div className="preloader-rings-container">
        <div className="preloader-ring ring-1"></div>
        <div className="preloader-ring ring-2"></div>
        <div className="preloader-ring ring-3"></div>
      </div>

      <div className="preloader-content">
        {/* Animated Yoga Healers Brand SVG */}
        <div className="preloader-logo-wrapper">
          <svg 
            className="preloader-logo-svg" 
            viewBox="0 0 100 100" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* The infinite flow loop representing balance & healing */}
            <path 
              className="logo-path-draw" 
              d="M50 15 C32 15, 32 50, 50 50 C68 50, 68 85, 50 85 C32 85, 32 50, 50 50 C68 50, 68 15, 50 15 Z" 
            />
            {/* Pulsing circles representing energy centers */}
            <circle className="logo-dot top-dot" cx="50" cy="15" r="4.5" />
            <circle className="logo-dot bottom-dot" cx="50" cy="85" r="4.5" />
          </svg>
        </div>

        {/* Ethereal Brand Name */}
        <div className="preloader-brand">
          <span className="brand-bold">yoga</span>
          <span className="brand-light">healers</span>
        </div>
        
        {/* Subtitle / Mantra */}
        <div className="preloader-subtitle">Heal Yourself • Live Satvic</div>
      </div>
    </div>
  );
}
