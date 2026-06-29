import './Workshops.css';
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import detoxImg from '../../assets/workshop_detox.png';
import meditationImg from '../../assets/workshop_meditation.png';
import cookingImg from '../../assets/workshop_cooking.png';

const WORKSHOPS_DATA = [
  {
    id: 'detox-21',
    title: 'Heal Yourself Challenge',
    rating: 5.0,
    reviews: 20,
    date: '15th Jun',
    duration: '7 Days',
    language: 'English',
    price: 990,
    startInDays: '3 Days',
    description: 'Learn 9 steps to heal your chronic lifestyle diseases following the Satvic Healing Plan.',
    image: detoxImg
  },
  {
    id: 'mind-7',
    title: 'Yoga Sadhana Beginner',
    rating: 5.0,
    reviews: 23,
    date: '22nd Jun',
    duration: '21 Days',
    language: 'Multiple',
    price: 590,
    startInDays: '11 Days',
    badge: 'Highly Recommended',
    description: 'Learn yoga philosophy, asanas and meditations to take charge of your joy!',
    image: meditationImg
  },
  {
    id: 'cook-3',
    title: 'Cooking Masterclass',
    rating: 4.9,
    reviews: 18,
    date: '5th Jul',
    duration: '3 Days',
    language: 'English',
    price: 490,
    startInDays: '24 Days',
    description: 'Learn to cook delicious plant-based meals without oil, dairy, refined sugar, and processed items.',
    image: cookingImg
  }
];

export default function Workshops({ isStandalone = false }) {
  const { addNotification, setView } = useApp();
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    batch: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const displayedWorkshops = (isStandalone || showAll) ? WORKSHOPS_DATA : WORKSHOPS_DATA.slice(0, 2);


  const handleOpenModal = (workshop) => {
    setSelectedWorkshop(workshop);
    setFormData({
      name: '',
      email: '',
      phone: '',
      batch: workshop.id === 'cook-3' ? 'Morning Live (10:30 AM)' : 'Morning Batch (6:00 AM)'
    });
  };

  const handleCloseModal = () => {
    setSelectedWorkshop(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      addNotification('Please fill in all details.', 'error');
      return;
    }
    setIsSubmitting(true);

    // Simulate API registration
    setTimeout(() => {
      setIsSubmitting(false);
      addNotification(`Successfully registered for ${selectedWorkshop.title}! Batch: ${formData.batch}`, 'success');
      handleCloseModal();
    }, 1200);
  };

  return (
    <section id="workshops" className={`workshops ${isStandalone ? 'is-standalone' : ''}`}>
      <div className="section-container" style={{ display: 'flex', flexDirection: 'column' }}>
        {isStandalone && (
          <button className="back-btn" style={{ marginBottom: '2rem', alignSelf: 'flex-start' }} onClick={() => {
            setView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Home
          </button>
        )}
        <h2 className="section-title">Upcoming Workshops</h2>
        <p className="section-subtitle" style={{ marginBottom: '3rem' }}>
          Attend from the comfort of your home
        </p>

        <div className="workshops-list">
          {displayedWorkshops.map((w) => (
            <div key={w.id} className="workshop-card-horizontal">
              <div className="workshop-img-container">
                <img src={w.image} alt={w.title} className="workshop-img" />
                <div className="workshop-starts-badge">
                  <span className="starts-label">Starts in</span>
                  <span className="starts-value">{w.startInDays}</span>
                </div>
              </div>
              <div className="workshop-content-horizontal">
                <div className="workshop-header-horizontal">
                  <h3 className="workshop-title">{w.title}</h3>
                  {w.badge && (
                    <div className="workshop-recommended-badge">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="#CA7D56" stroke="none">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                      {w.badge}
                    </div>
                  )}
                </div>
                
                <div className="workshop-rating-row">
                  <div className="stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} width="12" height="12" viewBox="0 0 24 24" fill="#F5A623" stroke="#F5A623" strokeWidth="1">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <span className="rating-score">({w.rating.toFixed(1)})</span>
                  <span className="review-count"><a href="#reviews">{w.reviews} Reviews</a></span>
                </div>
                
                <p className="workshop-desc-horizontal">{w.description}</p>
                
                <div className="workshop-pills">
                  <div className="pill">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    {w.date}
                  </div>
                  <div className="pill">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>
                    {w.duration}
                  </div>
                  <div className="pill">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                    {w.language}
                  </div>
                </div>
                
                <button className="btn btn-blue btn-register-horizontal" onClick={() => handleOpenModal(w)}>
                  Register Now ₹{w.price}
                </button>
              </div>
            </div>
          ))}
        </div>

        {!isStandalone && WORKSHOPS_DATA.length > 2 && (
          <div className="view-more-container">
            <button className="btn btn-outline view-more-btn" onClick={() => setShowAll(!showAll)}>
              {showAll ? 'View Less' : 'View More'}
            </button>
          </div>
        )}
      </div>

      {/* Registration Modal */}
      {selectedWorkshop && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={handleCloseModal} aria-label="Close modal">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className="modal-header">
              <h2>Register for Workshop</h2>
              <p style={{ color: 'var(--color-green)', fontWeight: 'bold' }}>{selectedWorkshop.title}</p>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label" htmlFor="reg-name">Full Name</label>
                  <input
                    id="reg-name"
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="reg-email">Email Address</label>
                  <input
                    id="reg-email"
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="reg-phone">Phone Number</label>
                  <input
                    id="reg-phone"
                    type="tel"
                    name="phone"
                    className="form-control"
                    placeholder="Enter 10-digit mobile number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {selectedWorkshop.id !== 'cook-3' ? (
                  <div className="form-group">
                    <label className="form-label" htmlFor="reg-batch">Preferred Live Batch</label>
                    <select
                      id="reg-batch"
                      name="batch"
                      className="form-control"
                      value={formData.batch}
                      onChange={handleInputChange}
                    >
                      <option value="Morning Batch (6:00 AM)">Morning Batch (6:00 AM - 7:30 AM IST)</option>
                      <option value="Evening Batch (6:00 PM)">Evening Batch (6:00 PM - 7:30 PM IST)</option>
                    </select>
                  </div>
                ) : (
                  <div className="form-group">
                    <label className="form-label" htmlFor="reg-time">Batch Time</label>
                    <input
                      id="reg-time"
                      type="text"
                      name="batch"
                      className="form-control"
                      value={formData.batch}
                      disabled
                    />
                  </div>
                )}
                
                <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'var(--color-sand-dark)', borderRadius: 'var(--border-radius-sm)', fontSize: '0.85rem' }}>
                  <strong>Important:</strong> Zoom link and daily recipe sheets will be shared on your registered Email and WhatsApp number 24 hours before the program starts.
                </div>
              </div>
              
              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={handleCloseModal} style={{ padding: '0.6rem 1.2rem' }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-blue" disabled={isSubmitting} style={{ padding: '0.6rem 1.5rem' }}>
                  {isSubmitting ? 'Registering...' : `Pay & Register (₹${selectedWorkshop.price})`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
