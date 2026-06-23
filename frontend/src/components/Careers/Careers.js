import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import './Careers.css';

const OPEN_POSITIONS = [
  {
    id: 'health-coach',
    title: 'Wellness Consultant & Health Coach',
    department: 'Healing & Consultations',
    type: 'Full Time',
    location: 'Noida (On-site)',
    experience: '2+ Years in Nutrition/Naturopathy',
    description: 'Guide individuals through our natural healing protocols, review health score reports, and provide daily dietary counseling.'
  },
  {
    id: 'yoga-instructor',
    title: 'Yoga & Meditation Instructor',
    department: 'Workshops & Events',
    type: 'Part Time / Full Time',
    location: 'Noida (On-site)',
    experience: 'Certified Hatha/Ashtanga Yoga teacher',
    description: 'Lead live morning asana sessions, design pranayama workshops, and guide students through mindfulness meditations.'
  },
  {
    id: 'video-editor',
    title: 'Content Creator & Video Editor',
    department: 'Marketing & Media',
    type: 'Full Time',
    location: 'Noida (On-site)',
    experience: 'Portfolio of wellness/lifestyle video content',
    description: 'Produce and edit highly engaging video content for YouTube, Instagram, and daily workshop recap videos.'
  },
  {
    id: 'customer-success',
    title: 'Customer Success Specialist',
    department: 'Support & Operations',
    type: 'Full Time',
    location: 'Remote',
    experience: '1+ Year in customer support roles',
    description: 'Help students with workshop registrations, resolve order queries, and manage WhatsApp support channels.'
  }
];

export default function Careers() {
  const { addNotification } = useApp();
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    portfolio: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setFormData({
      name: '',
      email: '',
      phone: '',
      portfolio: '',
      message: ''
    });
    // Scroll to the application form section
    setTimeout(() => {
      document.getElementById('application-form-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      addNotification('Please fill in all required fields.', 'error');
      return;
    }

    setIsSubmitting(true);

    // Simulate application submission
    setTimeout(() => {
      setIsSubmitting(false);
      addNotification(`Application for ${selectedJob.title} submitted successfully! Our HR team will reach out.`, 'success');
      setSelectedJob(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        portfolio: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <div className="careers-page animate-fade-in">
      {/* Hero Header */}
      <section className="careers-hero">
        <div className="careers-hero-content">
          <span className="careers-tag">WE ARE HIRING</span>
          <h1 className="careers-title">Join the Wellness Movement</h1>
          <p className="careers-subtitle">
            Help us guide the world back to nature. We're looking for passionate individuals who live by natural principles and want to make a real difference in people's lives.
          </p>
        </div>
      </section>

      {/* Core Culture Values */}
      <section className="careers-culture">
        <div className="careers-container">
          <h2 className="section-title">Why Work With Us?</h2>
          <div className="culture-grid">
            <div className="culture-card">
              <div className="culture-icon">🌿</div>
              <h3>Live the Lifestyle</h3>
              <p>We believe in teaching only what we practice. Enjoy organic meals at the office, daily morning yoga, and natural detox sessions.</p>
            </div>
            <div className="culture-card">
              <div className="culture-icon">🤝</div>
              <h3>Impactful Work</h3>
              <p>Every single day, you will read and hear stories of individuals reversing chronic illnesses and reclaiming their health and joy.</p>
            </div>
            <div className="culture-card">
              <div className="culture-icon">📈</div>
              <h3>Growth & Learning</h3>
              <p>Participate in workshops, learn directly from expert educators, and upgrade your skills with structured mentorship.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Job Openings List */}
      <section className="careers-jobs">
        <div className="careers-container">
          <h2 className="section-title">Open Positions</h2>
          <p className="section-subtitle">Find a role that matches your passion and skills</p>

          <div className="jobs-list">
            {OPEN_POSITIONS.map((job) => (
              <div key={job.id} className="job-card">
                <div className="job-header">
                  <div>
                    <span className="job-dept">{job.department}</span>
                    <h3 className="job-title-text">{job.title}</h3>
                  </div>
                  <span className="job-type">{job.type}</span>
                </div>
                
                <div className="job-details-row">
                  <span className="job-detail">📍 {job.location}</span>
                  <span className="job-detail">💼 {job.experience}</span>
                </div>

                <p className="job-desc">{job.description}</p>
                
                <button 
                  className={`btn ${selectedJob?.id === job.id ? 'btn-green' : 'btn-outline'} btn-apply`}
                  onClick={() => handleApplyClick(job)}
                >
                  {selectedJob?.id === job.id ? 'Apply Below' : 'Apply Now'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      {selectedJob && (
        <section id="application-form-section" className="careers-application-section">
          <div className="careers-container form-container-box">
            <div className="form-header-box">
              <h2>Apply for Position</h2>
              <p className="selected-job-indicator">Role: <strong>{selectedJob.title}</strong> ({selectedJob.location})</p>
            </div>

            <form onSubmit={handleSubmit} className="application-form">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="app-name">Full Name *</label>
                  <input
                    id="app-name"
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="app-email">Email Address *</label>
                  <input
                    id="app-email"
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="app-phone">Phone Number *</label>
                  <input
                    id="app-phone"
                    type="tel"
                    name="phone"
                    className="form-control"
                    placeholder="Enter mobile number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="app-portfolio">Resume / Portfolio Link</label>
                  <input
                    id="app-portfolio"
                    type="url"
                    name="portfolio"
                    className="form-control"
                    placeholder="Google Drive, LinkedIn, or Website link"
                    value={formData.portfolio}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="app-message">Why do you want to join Yoga Healers? *</label>
                <textarea
                  id="app-message"
                  name="message"
                  rows="5"
                  className="form-control app-textarea"
                  placeholder="Tell us about your personal wellness journey and why you want to work with us..."
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>

              <div className="form-buttons">
                <button type="button" className="btn btn-outline" onClick={() => setSelectedJob(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-green" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        </section>
      )}
    </div>
  );
}
