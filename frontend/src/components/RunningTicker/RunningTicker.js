import React from 'react';
import './RunningTicker.css';

export default function RunningTicker() {
  const message = [
    "I am grounded in the present moment, open to growth, and vibrant with natural energy.",
    "YHO",
    "One Earth - One Family - One Future"
  ];

  // Repeat items 6 times for smooth infinite scroll loop
  const tickerItems = Array(6).fill(message).flat();

  return (
    <div className="running-ticker-wrapper">
      <div className="running-ticker-bar">
        <div className="running-ticker-track">
          {tickerItems.map((item, idx) => (
            <span key={idx} className={`ticker-item ${item === 'YHO' ? 'ticker-brand' : ''}`}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
