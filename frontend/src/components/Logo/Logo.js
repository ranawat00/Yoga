import React from 'react';
import './Logo.css';
import logoImg from '../../assets/logo.png';

export default function Logo({ size = 54 }) {
  return (
    <div className="brand-logo-wrapper">
      <img
        src={logoImg}
        alt="Yoga Healers Logo"
        className="brand-logo-img brand-logo-svg"
        style={{ width: size, height: 'auto', maxHeight: size, objectFit: 'contain' }}
      />
    </div>
  );
}
