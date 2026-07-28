import React, { useEffect, useState } from 'react';
import './Preloader.css';
import Logo from '../Logo/Logo';

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // Lock scrolling while preloader is active
    document.body.style.overflow = 'hidden';

    // Show preloader animation, then start smooth fade out at 650ms
    const fadeTimer = setTimeout(() => {
      setFade(true);
    }, 650);

    // Remove preloader overlay and restore scroll at 1100ms (1.1s total)
    const removeTimer = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = '';
    }, 1100);

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

      <div className="preloader-content preloader-brand-animate">
        <Logo size={100} />
      </div>
    </div>
  );
}
