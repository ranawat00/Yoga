import React from 'react';
import './Educators.css';
import imgSubah from '../../assets/educator_subah_1781260620713.png';
import imgHarsh from '../../assets/educator_harsh_1781260639265.png';
import imgRadhika from '../../assets/educator_radhika_1781260661670.png';
import imgAkshay from '../../assets/educator_akshay_1781260683443.png';
import imgRajat from '../../assets/educator_rajat_1781260812515.png';
import imgHimadri from '../../assets/educator_himadri_1781260833983.png';

const EDUCATOR_DATA = [
  {
    id: 'ed-1',
    name: 'Subah Saraf',
    role: 'Co-founder',
    image: imgSubah
  },
  {
    id: 'ed-2',
    name: 'Harshvardhan Saraf',
    role: 'Co-founder',
    image: imgHarsh
  },
  {
    id: 'ed-3',
    name: 'Radhika Gupta',
    role: 'Co-Leader of Yoga Wing',
    image: imgRadhika
  },
  {
    id: 'ed-4',
    name: 'Akshay Jain',
    role: 'Co-Leader of Yoga Wing',
    image: imgAkshay
  },
  {
    id: 'ed-5',
    name: 'Rajat Jadon',
    role: 'Host of 5AM Challenge & Co-Leader of the Youth Wing',
    image: imgRajat
  },
  {
    id: 'ed-6',
    name: 'Himadri Pareek',
    role: 'Co-Leader of the Youth Wing',
    image: imgHimadri
  }
];

export default function Educators() {
  return (
    <section id="educators" className="educators-section">
      <div className="section-container">
        
        {/* Header */}
        <div className="educators-header">
          <h2 className="section-title">Meet the Educators</h2>
          <p className="section-subtitle">The force behind the Yoga Healers Movement</p>
        </div>

        {/* Educators Grid */}
        <div className="educators-grid">
          {EDUCATOR_DATA.map((ed) => (
            <div key={ed.id} className="educator-card">
              {/* Image with rounded background card */}
              <div className="educator-img-container">
                <img src={ed.image} alt={ed.name} className="educator-img" />
              </div>
              
              {/* Info */}
              <div className="educator-info">
                <h3 className="educator-name">{ed.name}</h3>
                <p className="educator-role">{ed.role}</p>
              </div>
            </div>
          ))}
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
