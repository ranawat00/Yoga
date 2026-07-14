import React from 'react';
import './Logo.css';

export default function Logo({ variant = 'full', size = 42, iconColor = 'currentColor', textColor = 'currentColor' }) {
  // Brand Logo Icon: Globe Wireframe + Stylized Lotus + YHO
  const icon = (
    <svg 
      className="brand-logo-svg" 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ color: iconColor, flexShrink: 0 }}
    >
      {/* Globe Wireframe Background */}
      <circle cx="50" cy="42" r="32" stroke="currentColor" strokeWidth="1.2" fill="none" />
      
      {/* Globe grid curves (Longitude) */}
      <path d="M50 10 A22 32 0 0 0 50 74" stroke="currentColor" strokeWidth="0.8" opacity="0.45" fill="none" />
      <path d="M50 10 A9 32 0 0 0 50 74" stroke="currentColor" strokeWidth="0.8" opacity="0.45" fill="none" />
      <path d="M50 10 L50 74" stroke="currentColor" strokeWidth="0.8" opacity="0.45" fill="none" />
      <path d="M50 10 A9 32 0 0 1 50 74" stroke="currentColor" strokeWidth="0.8" opacity="0.45" fill="none" />
      <path d="M50 10 A22 32 0 0 1 50 74" stroke="currentColor" strokeWidth="0.8" opacity="0.45" fill="none" />
      
      {/* Globe grid curves (Latitude) */}
      <path d="M18 42 A32 18 0 0 0 82 42" stroke="currentColor" strokeWidth="0.8" opacity="0.45" fill="none" />
      <path d="M18 42 A32 8 0 0 0 82 42" stroke="currentColor" strokeWidth="0.8" opacity="0.45" fill="none" />
      <path d="M18 42 L82 42" stroke="currentColor" strokeWidth="0.8" opacity="0.45" fill="none" />
      <path d="M18 42 A32 8 0 0 1 82 42" stroke="currentColor" strokeWidth="0.8" opacity="0.45" fill="none" />
      <path d="M18 42 A32 18 0 0 1 82 42" stroke="currentColor" strokeWidth="0.8" opacity="0.45" fill="none" />
      
      {/* Lotus Flower in Foreground */}
      <g className="lotus-petals">
        {/* Left Petal - Solid filled leaf */}
        <path 
          d="M48 50 C32 51, 23 44, 25 36 C29 30, 39 37, 48 50 Z" 
          fill="currentColor" 
        />
        {/* Right Petal - Solid filled leaf */}
        <path 
          d="M52 50 C68 51, 77 44, 75 36 C71 30, 61 37, 52 50 Z" 
          fill="currentColor" 
        />
        {/* Center Petal - Solid filled leaf with even-odd cutout */}
        <path 
          d="M50 16 C45 28, 44 38, 50 49 C56 38, 55 28, 50 16 Z M50 24 C47.5 30, 47.5 36, 50 42 C52.5 36, 52.5 30, 50 24 Z" 
          fill="currentColor" 
          fillRule="evenodd"
        />
      </g>
      
      {/* Y H O Text */}
      <text 
        x="50" 
        y="64" 
        textAnchor="middle" 
        fill="currentColor" 
        fontSize="6.5" 
        fontWeight="800" 
        letterSpacing="2.5"
        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
      >
        YHO
      </text>
    </svg>
  );

  if (variant === 'icon') {
    return icon;
  }

  return (
    <div className={`brand-logo-container brand-logo-${variant}`} style={{ color: textColor }}>
      {icon}
      <div className="brand-logo-text-wrapper">
        <div className="brand-logo-title">YOGA HEALERS</div>
        <div className="brand-logo-subtitle">ORGANIZATION</div>
        <div className="brand-logo-tagline">Empowering Global Peace</div>
      </div>
    </div>
  );
}
