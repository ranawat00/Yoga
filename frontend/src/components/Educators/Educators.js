import React, { useState, useRef } from 'react';
import './Educators.css';
import imgSubah from '../../assets/educator_subah_1781260620713.webp';
import imgHarsh from '../../assets/educator_harsh_1781260639265.webp';
import imgRadhika from '../../assets/educator_radhika_1781260661670.webp';
import imgAkshay from '../../assets/educator_akshay_1781260683443.webp';
import imgRajat from '../../assets/educator_rajat_1781260812515.webp';
import imgHimadri from '../../assets/educator_himadri_1781260833983.webp';

const EDUCATOR_DATA = [
  { id: 'ed-1', name: 'Subah Saraf',         role: 'Co-founder',                                          image: imgSubah   },
  { id: 'ed-2', name: 'Harshvardhan Saraf',  role: 'Co-founder',                                          image: imgHarsh   },
  { id: 'ed-3', name: 'Radhika Gupta',       role: 'Co-Leader of Yoga Wing',                              image: imgRadhika },
  { id: 'ed-4', name: 'Akshay Jain',         role: 'Co-Leader of Yoga Wing',                              image: imgAkshay  },
  { id: 'ed-5', name: 'Rajat Jadon',         role: 'Host of 5AM Challenge & Co-Leader of the Youth Wing', image: imgRajat   },
  { id: 'ed-6', name: 'Himadri Pareek',      role: 'Co-Leader of the Youth Wing',                         image: imgHimadri },
];

/* ── Educator Card (shared) ─────────────────────────────────────── */
function EducatorCard({ ed }) {
  return (
    <div className="educator-card">
      <div className="educator-img-container">
        <img loading="lazy" src={ed.image} alt={ed.name} className="educator-img" />
      </div>
      <div className="educator-info">
        <h3 className="educator-name">{ed.name}</h3>
        <p className="educator-role">{ed.role}</p>
      </div>
    </div>
  );
}

/* ── Mobile Slider ──────────────────────────────────────────────── */
function EducatorsSlider() {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(null);
  const total = EDUCATOR_DATA.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { diff > 0 ? next() : prev(); }
    touchStartX.current = null;
  };

  return (
    <div className="educators-slider-wrapper"
         onTouchStart={onTouchStart}
         onTouchEnd={onTouchEnd}>

      {/* Track */}
      <div className="educators-slider-track"
           style={{ transform: `translateX(-${current * 100}%)` }}>
        {EDUCATOR_DATA.map((ed) => (
          <div key={ed.id} className="educators-slide">
            <EducatorCard ed={ed} />
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button className="slider-arrow slider-arrow-prev" onClick={prev} aria-label="Previous educator">
        ‹
      </button>
      <button className="slider-arrow slider-arrow-next" onClick={next} aria-label="Next educator">
        ›
      </button>

      {/* Dots */}
      <div className="slider-dots">
        {EDUCATOR_DATA.map((_, i) => (
          <button
            key={i}
            className={`slider-dot${i === current ? ' active' : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Go to educator ${i + 1}`}
          />
        ))}
      </div>

      {/* Counter */}
      <div className="slider-counter">{current + 1} / {total}</div>
    </div>
  );
}

/* ── Main Component ─────────────────────────────────────────────── */
export default function Educators() {
  return (
    <section id="educators" className="educators-section">
      <div className="section-container">

        {/* Header */}
        <div className="educators-header">
          <h2 className="section-title">Meet the Educators</h2>
          <p className="section-subtitle">The force behind the Yoga Healers Movement</p>
        </div>

        {/* Desktop Grid */}
        <div className="educators-grid educators-grid-desktop">
          {EDUCATOR_DATA.map((ed) => <EducatorCard key={ed.id} ed={ed} />)}
        </div>

        {/* Mobile Slider */}
        <div className="educators-grid-mobile">
          <EducatorsSlider />
        </div>

        {/* View Entire Team Button */}
        <div className="educators-actions">
          <button className="btn btn-terracotta btn-team">
            View Entire Team
          </button>
        </div>

      </div>
    </section>
  );
}
