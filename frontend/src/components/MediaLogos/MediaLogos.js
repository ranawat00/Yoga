import React from 'react';
import './MediaLogos.css';

// SVG-based newspaper brand logos
const mediaLogos = [
  {
    id: 'hindustan-times',
    name: 'Hindustan Times',
    svg: (
      <svg viewBox="0 0 220 60" xmlns="http://www.w3.org/2000/svg" className="media-logo-svg">
        {/* HT circle badge */}
        <circle cx="26" cy="30" r="24" fill="#00A9CE" />
        <text x="26" y="37" textAnchor="middle" fontFamily="Georgia, serif" fontWeight="bold" fontSize="18" fill="#fff">HT</text>
        {/* Hindustan Times text */}
        <text x="58" y="24" fontFamily="'Times New Roman', serif" fontWeight="bold" fontSize="15" fill="#1a1a1a" fontStyle="italic">Hindustan</text>
        <text x="58" y="44" fontFamily="'Times New Roman', serif" fontWeight="bold" fontSize="15" fill="#1a1a1a" fontStyle="italic">Times</text>
      </svg>
    ),
  },
  {
    id: 'dainik-bhaskar',
    name: 'Dainik Bhaskar',
    svg: (
      <svg viewBox="0 0 180 60" xmlns="http://www.w3.org/2000/svg" className="media-logo-svg">
        {/* Sun icon */}
        <circle cx="90" cy="14" r="9" fill="#F5A623" />
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
          <line
            key={i}
            x1={90 + Math.cos((angle * Math.PI) / 180) * 10}
            y1={14 + Math.sin((angle * Math.PI) / 180) * 10}
            x2={90 + Math.cos((angle * Math.PI) / 180) * 14}
            y2={14 + Math.sin((angle * Math.PI) / 180) * 14}
            stroke="#F5A623"
            strokeWidth="2"
            strokeLinecap="round"
          />
        ))}
        {/* Dainik Bhaskar text */}
        <text x="90" y="48" textAnchor="middle" fontFamily="'Noto Sans Devanagari', Arial, sans-serif" fontWeight="900" fontSize="20" fill="#1a1a1a">दैनिक भास्कर</text>
      </svg>
    ),
  },
  {
    id: 'dainik-jagran',
    name: 'Dainik Jagran',
    svg: (
      <svg viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg" className="media-logo-svg">
        {/* Sunrise semicircle */}
        <path d="M 60 30 A 30 30 0 0 1 120 30" fill="#F5A623" />
        <path d="M 55 30 A 35 35 0 0 1 125 30" fill="none" stroke="#F27820" strokeWidth="5" />
        <path d="M 50 30 A 40 40 0 0 1 130 30" fill="none" stroke="#E84A2B" strokeWidth="5" />
        <circle cx="90" cy="30" r="14" fill="#FFD700" />
        {/* Dainik Jagran text */}
        <text x="90" y="56" textAnchor="middle" fontFamily="'Plus Jakarta Sans', Arial, sans-serif" fontWeight="800" fontSize="16" fill="#1a1a1a">Dainik Jagran</text>
      </svg>
    ),
  },
  {
    id: 'hindustan',
    name: 'Hindustan',
    svg: (
      <svg viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg" className="media-logo-svg">
        <text x="100" y="44" textAnchor="middle" fontFamily="'Noto Sans Devanagari', Arial, sans-serif" fontWeight="900" fontSize="30" fill="#C0392B" stroke="#fff" strokeWidth="1" paintOrder="stroke">हिन्दुस्तान</text>
      </svg>
    ),
  },
  {
    id: 'amar-ujala',
    name: 'Amar Ujala',
    svg: (
      <svg viewBox="0 0 190 60" xmlns="http://www.w3.org/2000/svg" className="media-logo-svg">
        <rect x="0" y="0" width="190" height="60" rx="4" fill="#003087" />
        <text x="95" y="38" textAnchor="middle" fontFamily="'Noto Sans Devanagari', Arial, sans-serif" fontWeight="800" fontSize="22" fill="#FFFFFF">अमर उजाला</text>
      </svg>
    ),
  },
  {
    id: 'navbharat-times',
    name: 'Navbharat Times',
    svg: (
      <svg viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg" className="media-logo-svg">
        <text x="100" y="30" textAnchor="middle" fontFamily="'Noto Sans Devanagari', Arial, sans-serif" fontWeight="800" fontSize="18" fill="#E84A2B">नवभारत</text>
        <text x="100" y="52" textAnchor="middle" fontFamily="'Noto Sans Devanagari', Arial, sans-serif" fontWeight="800" fontSize="18" fill="#1a1a1a">टाइम्स</text>
      </svg>
    ),
  },
  {
    id: 'the-hindu',
    name: 'The Hindu',
    svg: (
      <svg viewBox="0 0 180 60" xmlns="http://www.w3.org/2000/svg" className="media-logo-svg">
        <text x="90" y="28" textAnchor="middle" fontFamily="'Times New Roman', serif" fontWeight="normal" fontSize="13" fill="#555" letterSpacing="3">THE</text>
        <text x="90" y="52" textAnchor="middle" fontFamily="'Times New Roman', serif" fontWeight="bold" fontSize="26" fill="#1a1a1a" letterSpacing="1">Hindu</text>
      </svg>
    ),
  },
  {
    id: 'times-of-india',
    name: 'Times of India',
    svg: (
      <svg viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg" className="media-logo-svg">
        <text x="100" y="28" textAnchor="middle" fontFamily="'Times New Roman', serif" fontWeight="normal" fontSize="11" fill="#555" letterSpacing="2">TIMES OF INDIA</text>
        <line x1="10" y1="32" x2="190" y2="32" stroke="#C0392B" strokeWidth="1.5" />
        <text x="100" y="52" textAnchor="middle" fontFamily="'Times New Roman', serif" fontWeight="bold" fontStyle="italic" fontSize="20" fill="#1a1a1a">Times of India</text>
      </svg>
    ),
  },
];

export default function MediaLogos() {
  // Triple the logos for a seamless infinite loop
  const tripled = [...mediaLogos, ...mediaLogos, ...mediaLogos];

  return (
    <section className="media-logos-section">
      <p className="media-logos-label">As Featured In</p>

      <div className="media-logos-marquee-outer">
        <div className="media-logos-marquee-track">
          {tripled.map((logo, idx) => (
            <div key={`${logo.id}-${idx}`} className="media-logo-card">
              {logo.svg}
              <span className="media-logo-name">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
