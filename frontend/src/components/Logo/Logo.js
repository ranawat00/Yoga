import React from 'react';
import './Logo.css';
import logoImg from '../../assets/logo.png';

export default function Logo({ size = 100, width, height }) {
  const logoWidth = width || size;
  const logoHeight = height || size;

  return (
    <div className="brand-logo-wrapper">
      <img
        src={logoImg}
        alt="Yoga Healers Logo"
        className="brand-logo-img brand-logo-svg"
        style={{ width: logoWidth, height: logoHeight, objectFit: 'contain' }}
      />
    </div>
  );
}
