import React, { useState, useEffect, useCallback } from 'react';
import './ScienceBackedBenefits.css';

const BENEFITS_DATA = [
  {
    id: 1,
    title: "Holistic Stress Management & Mental Clarity",
    description: "Integrates targeted pranayama (breathwork) and guided meditation techniques to reduce cortisol levels, ease anxiety, and cultivate long-term emotional resilience.",
  },
  {
    id: 2,
    title: "Customized Inner Healing & Energy Balance",
    description: "Incorporates traditional yogic healing practices that focus on balancing the body's energy centers (chakras), boosting natural immunity, and restoring internal vital energy (prana).",
  },
  {
    id: 3,
    title: "Flexible, Remote-First Well-Being",
    description: "Allows participants to experience expert-led guidance and structured wellness practices from the comfort of home, making self-care easy to integrate into busy schedules without travel demands.",
  },
  {
    id: 4,
    title: "Supportive Global Community & Ongoing Guidance",
    description: "Connects attendees with like-minded individuals and professional instructors, fostering a sense of accountability, shared growth, and ongoing wellness support.",
  },
  {
    id: 5,
    title: "Complete Well-Being Integration",
    description: "Combines physical movement, emotional grounding, nutrition awareness, and energetic alignment into a single cohesive framework for total mind-body health.",
  },
  {
    id: 6,
    title: "Greater Resilience & Cellular Vitality",
    description: "Utilizes restorative yogic techniques and deep pranayama to stimulate cellular repair, boost metabolic functions, and build adaptive physical and mental strength against daily stressors.",
  },
  {
    id: 7,
    title: "Better Quality of Life",
    description: "Translates foundational wellness practices into sustainable daily habits, resulting in higher daily energy, improved sleep patterns, and an overall elevated sense of daily fulfillment and joy.",
  }
];

export default function ScienceBackedBenefits() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = BENEFITS_DATA.length;

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-play every 4 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(goNext, 4000);
    return () => clearInterval(timer);
  }, [isPaused, goNext]);

  const benefit = BENEFITS_DATA[currentIndex];

  return (
    <section className="sbb-section" id="science-benefits-section">
      <div className="sbb-container">

        {/* Header — title only, centered */}
        <div className="sbb-header">
          <h2 className="sbb-main-title">SCIENCE-BACKED BENEFITS OF THE YHO WELLNESS WORKSHOP</h2>
        </div>

        {/* Greige Box — slide content + arrows centered below */}
        <div
          className="sbb-box"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Slide Content */}
          <div className="sbb-content" key={benefit.id}>
            <h3 className="sbb-title">{benefit.title}</h3>
            <p className="sbb-description">{benefit.description}</p>
          </div>

          {/* Progress Dots */}
          <div className="sbb-dots">
            {BENEFITS_DATA.map((_, i) => (
              <button
                key={i}
                className={`sbb-dot ${i === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to benefit ${i + 1}`}
              />
            ))}
          </div>

          {/* Arrow Buttons — centered below content */}
          <div className="sbb-arrows-center">
            <button className="sbb-arrow-btn" onClick={goPrev} aria-label="Previous">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="sbb-arrow-btn" onClick={goNext} aria-label="Next">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
