import React from 'react';
import './Logo.css';

export default function Logo({ size = 54 }) {
  // Official YHO Brand Logo Badge (Deep Royal Blue Circle with YHO emblem)
  return (
    <div className="brand-logo-wrapper">
      <svg 
        className="brand-logo-svg" 
        width={size} 
        height={size} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Deep Royal Blue Circle Badge */}
        <circle cx="50" cy="50" r="49" fill="#00019c" />

        {/* YHO Emblem Group */}
        <g fill="#FFFFFF">
          {/* Bold White Letter 'Y' */}
          <path d="M 16 36 L 22.5 36 L 26.5 45.5 L 30.5 36 L 37 36 L 29 47.5 L 29 64 L 24 64 L 24 47.5 Z" />

          {/* Bold White Letter 'H' */}
          <path d="M 39 36 L 44 36 L 44 46.5 L 52 46.5 L 52 36 L 57 36 L 57 64 L 52 64 L 52 52.5 L 44 52.5 L 44 64 L 39 64 Z" />

          {/* Concentric Target 'O' Ring */}
          <path 
            fillRule="evenodd" 
            clipRule="evenodd" 
            d="M 85 50 C 85 57.18 79.18 63 72 63 C 64.82 63 59 57.18 59 50 C 59 42.82 64.82 37 72 37 C 79.18 37 85 42.82 85 50 Z M 80.8 50 C 80.8 54.86 76.86 58.8 72 58.8 C 67.14 58.8 63.2 54.86 63.2 50 C 63.2 45.14 67.14 41.2 72 41.2 C 76.86 41.2 80.8 45.14 80.8 50 Z" 
          />
          
          {/* Inner Solid White Circle */}
          <circle cx="72" cy="50" r="4.2" fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  );
}
