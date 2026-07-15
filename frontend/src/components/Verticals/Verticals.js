import React, { useState } from 'react';
import './Verticals.css';
import yogaBg from '../../assets/vertical_yoga.webp';
import youthBg from '../../assets/vertical_youth.webp';

const VERTICALS_DATA = [
  {
    id: 'yoga',
    title: 'Yoga Healers',
    subtitle: 'Bringing ancient yoga wisdom to modern living, through asanas, breathwork, chanting, and dhyana',
    image: yogaBg,
    modalTitle: 'Yoga Healers Reimagined',
    modalContent: (
      <>
        <p>Yoga Healers is not just a physical workout; it is a holistic spiritual practice designed to align your body, breath, and mind. Our programs are crafted for the modern lifestyle, helping you restore natural balance and inner stillness.</p>
        <h4>Key Program Features:</h4>
        <ul>
          <li><strong>Daily Live Practice:</strong> Interactive online morning yoga sessions focusing on alignment and breath coordination.</li>
          <li><strong>Pranayama & Breathwork:</strong> Specialized breathing techniques to detoxify the lungs and calm the nervous system.</li>
          <li><strong>Meditation & Dhyana:</strong> Guided mindfulness sessions to reduce cortisol, stress, and anxiety.</li>
          <li><strong>Chanting & Nada Yoga:</strong> Incorporating sound vibrations to elevate consciousness and build mental focus.</li>
        </ul>
        <p className="modal-note">Suitable for all age groups and experience levels, from beginners to advanced practitioners.</p>
      </>
    )
  },
  {
    id: 'youth',
    title: 'Satvic Youth',
    subtitle: 'Crafting a healthier future for our youth, one school at a time',
    image: youthBg,
    modalTitle: 'Satvic Youth Movement',
    modalContent: (
      <>
        <p>We believe that healthy habits start early. The Satvic Youth initiative is a community-driven movement that partners with schools to introduce natural living, physical fitness, and mindful food choices to children and teenagers.</p>
        <h4>Initiative Pillars:</h4>
        <ul>
          <li><strong>School Outreach Programs:</strong> Conducting engaging, interactive workshops for students on nutrition and digestion.</li>
          <li><strong>No-Packaged-Food Challenges:</strong> Encouraging children to swap processed snacks with fresh, live fruits, seeds, and sprouts.</li>
          <li><strong>Mindful Screen-Time Limits:</strong> Workshops and trackers to build healthy digital boundaries and reconnect with nature.</li>
          <li><strong>Physical Culture:</strong> Fun, outdoor-based yoga games and movement practices to build strength and coordination.</li>
        </ul>
        <p className="modal-note">Over 50 schools and 25,000 students have participated in our Satvic Youth challenges to date.</p>
      </>
    )
  }
];

export default function Verticals() {
  const [selectedVertical, setSelectedVertical] = useState(null);

  return (
    <section id="verticals" className="verticals-section">
      <div className="section-container">
        
        {/* Section Header */}
        <div className="verticals-header">
          <h2 className="section-title">Satvic Verticals</h2>
          <p className="section-subtitle">The extensions of our health revolution</p>
        </div>

        {/* Verticals Cards Grid */}
        <div className="verticals-grid">
          {VERTICALS_DATA.map((item) => (
            <div 
              key={item.id} 
              className="vertical-card"
              onClick={() => setSelectedVertical(item)}
            >
              {/* Background Image with Zoom Effect */}
              <div className="vertical-card-bg-wrapper">
                <img loading="lazy" src={item.image} alt={item.title} className="vertical-card-bg" />
              </div>
              
              {/* Dark Gradient Overlay */}
              <div className="vertical-card-overlay"></div>

              {/* Text & Button content */}
              <div className="vertical-card-content">
                <h3 className="vertical-card-title">{item.title}</h3>
                <p className="vertical-card-desc">{item.subtitle}</p>
                <button className="vertical-card-btn">Learn More</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Detail Modal */}
      {selectedVertical && (
        <div className="vertical-modal-overlay" onClick={() => setSelectedVertical(null)}>
          <div className="vertical-modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button 
              className="vertical-modal-close" 
              onClick={() => setSelectedVertical(null)}
              aria-label="Close details"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Modal Header Image */}
            <div className="vertical-modal-image-container">
              <img loading="lazy" src={selectedVertical.image} alt={selectedVertical.title} className="vertical-modal-image" />
              <div className="vertical-modal-img-overlay"></div>
              <h2 className="vertical-modal-header-title">{selectedVertical.title}</h2>
            </div>

            {/* Modal Text Body */}
            <div className="vertical-modal-body">
              {selectedVertical.modalContent}
            </div>

            {/* Modal Footer */}
            <div className="vertical-modal-footer">
              <button className="btn btn-blue" onClick={() => setSelectedVertical(null)}>
                Got it, Thanks!
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
