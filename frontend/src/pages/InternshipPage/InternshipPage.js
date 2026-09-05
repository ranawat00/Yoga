import React, { useState } from 'react';
import bannerImg from '../../assets/internship/banner.jpg';
import MediaLogos from '../../components/MediaLogos/MediaLogos';
import logo0 from '../../assets/internship/Green and Gold Minimalist Luxury Fashion Logo_20260814_101257_0000.png';
import logo1 from '../../assets/internship/Green and Gold Minimalist Luxury Fashion Logo_20260814_101257_0001.png';
import logo2 from '../../assets/internship/Green and Gold Minimalist Luxury Fashion Logo_20260814_101257_0002.png';
import logo3 from '../../assets/internship/Green and Gold Minimalist Luxury Fashion Logo_20260814_101257_0003.png';
import logo4 from '../../assets/internship/Green and Gold Minimalist Luxury Fashion Logo_20260814_101257_0004.png';
import logo5 from '../../assets/internship/Green and Gold Minimalist Luxury Fashion Logo_20260814_101257_0005.png';
import logo6 from '../../assets/internship/Green and Gold Minimalist Luxury Fashion Logo_20260814_101257_0006.png';
import './InternshipPage.css';

const WHY_ENROLL_ITEMS = [
  {
    id: 1,
    icon: logo0,
    title: 'Bridging Theory to Practice:',
    description: 'Understand how to apply psychological assessments, rapport-building techniques, and holistic therapeutic frameworks in actual client scenarios.'
  },
  {
    id: 2,
    icon: logo1,
    title: 'Direct Professional Mentorship:',
    description: 'Work under the guidance of seasoned mental health professionals and holistic wellness experts who provide constructive feedback on your approach.'
  },
  {
    id: 3,
    icon: logo2,
    title: 'Structured Learning Modules:',
    description: 'Move beyond observational learning with active, skill-building workshops, simulated case studies, and ethics training.'
  },
  {
    id: 4,
    icon: logo3,
    title: 'Network & Community:',
    description: 'Connect with a peer network of committed, like-minded future psychologists and healthcare facilitators.'
  }
];

const WHAT_YOU_RECEIVE_ITEMS = [
  {
    id: 1,
    icon: logo4,
    title: 'Practical Experience',
    description: 'Simulated case intake, psychological screening basics, and case formulation exercises.'
  },
  {
    id: 2,
    icon: logo5,
    title: 'Skill Mastery',
    description: 'Active listening training, counseling ethics, crisis intervention protocols, and stress-management techniques.'
  },
  {
    id: 3,
    icon: logo6,
    title: 'Career Credentials',
    description: 'Official Certificate of Completion and personalized Letter of Recommendation (based on performance).'
  }
];

const INTERNSHIP_FAQS = [
  {
    id: 1,
    question: 'Who is this internship program designed for?',
    answer: 'This program is open to both Undergraduate (UG) and Postgraduate (PG) students pursuing degrees in Psychology or related behavioral sciences who wish to gain practical insights and real-world application of psychological concepts.'
  },
  {
    id: 2,
    question: 'Do I need prior practical experience to apply?',
    answer: 'No prior experience is required! Whether you are just beginning your psychology journey or looking to build on your existing academic knowledge, our mentors will guide you step-by-step.'
  },
  {
    id: 3,
    question: 'What is the daily time commitment?',
    answer: 'The program requires just 1 hour per day, making it easy to balance alongside your regular college workload and exams.'
  },
  {
    id: 4,
    question: 'When will the daily sessions take place?',
    answer: 'All sessions and tasks are scheduled after college hours. Additionally, timing is flexible, allowing you to complete your daily tasks and check-ins at a time that best suits your routine.'
  },
  {
    id: 5,
    question: 'What kind of support and guidance will I receive?',
    answer: 'You will be assigned experienced mentors who will provide regular feedback, answer your queries, and guide you through practical assignments.'
  },
  {
    id: 6,
    question: 'Are study materials and resources provided?',
    answer: 'Yes! You will get full access to essential learning resources, case studies, reference materials, and frameworks required to complete your internship tasks effectively.'
  },
  {
    id: 7,
    question: 'Why is there a fee for this internship?',
    answer: 'We charge a nominal fee strictly to ensure active commitment, seriousness, and accountability from participating students. This helps maintain a high-quality cohort where every participant is genuinely invested in their professional growth.'
  },
  {
    id: 8,
    question: 'Will I receive a certificate upon completion?',
    answer: 'Yes, upon successfully fulfilling the daily program requirements, you will receive an Internship Completion Certificate to enhance your academic portfolio and CV.'
  }
];

export default function InternshipPage() {
  const [openFaq, setOpenFaq] = useState(null);

  // Apply Now Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    applyFor: 'Yoga Instructor Intern',
    resume: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [resumeFileName, setResumeFileName] = useState('');

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitError) setSubmitError('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check size limit (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setSubmitError('File size exceeds 5MB limit. Please upload a smaller file.');
      return;
    }

    setResumeFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({
        ...prev,
        resume: {
          fileName: file.name,
          fileType: file.type,
          fileData: reader.result
        }
      }));
      setSubmitError('');
    };
    reader.onerror = () => {
      setSubmitError('Failed to read file. Please try selecting another resume file.');
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.city.trim() || !formData.applyFor.trim()) {
      setSubmitError('Please fill out all required fields (Name, Phone, City, Position).');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/internships/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitSuccess(true);
        setFormData({
          name: '',
          phone: '',
          city: '',
          applyFor: 'Yoga Instructor Intern',
          resume: null
        });
        setResumeFileName('');
        setTimeout(() => setSubmitSuccess(false), 6000);
      } else {
        setSubmitError(data.message || 'Failed to submit application. Please try again.');
      }
    } catch (err) {
      console.error('Internship application error:', err);
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="internship-page animate-fade-in">
      {/* Hero Banner Header Section using banner.jpg */}
      <section className="internship-banner-hero">
        <div className="internship-banner-container">
          <div className="internship-banner-card">
            <img
              src={bannerImg}
              alt="Unlock the Power of Applied Psychology - Immersive Internship Program"
              className="internship-banner-img"
            />
          </div>
        </div>
      </section>

      {/* Featured In / Media Logos Section */}
      <MediaLogos />

      {/* Apply Now Form Section */}
      <section className="internship-apply-section" id="apply-now">
        <div className="internship-container">
          <div className="internship-apply-card">
            <div className="card-top-accent"></div>
            <div className="apply-header">
              <div className="apply-badge">
                <span className="badge-dot"></span>
                <span>JOIN OUR TEAM</span>
              </div>
              <h2 className="apply-title">Apply For <span className="title-accent">Internship</span></h2>
              <p className="apply-subtitle">Take your first step toward real-world hands-on experience and professional growth.</p>
            </div>

            {submitSuccess && (
              <div className="apply-alert apply-alert-success">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>Thank you! Your application has been submitted successfully. Our team will review your resume and contact you soon.</span>
              </div>
            )}

            {submitError && (
              <div className="apply-alert apply-alert-error">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <span>{submitError}</span>
              </div>
            )}

            <form className="internship-apply-form" onSubmit={handleSubmit}>
              <div className="apply-form-grid">
                {/* Full Name */}
                <div className="apply-field-group">
                  <label htmlFor="apply-name">Full Name <span className="req">*</span></label>
                  <div className="input-with-icon">
                    <svg className="field-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <input
                      type="text"
                      id="apply-name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                {/* Contact Number */}
                <div className="apply-field-group">
                  <label htmlFor="apply-phone">Contact Number <span className="req">*</span></label>
                  <div className="input-with-icon">
                    <svg className="field-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <input
                      type="tel"
                      id="apply-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>
                </div>

                {/* City */}
                <div className="apply-field-group">
                  <label htmlFor="apply-city">City <span className="req">*</span></label>
                  <div className="input-with-icon">
                    <svg className="field-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <input
                      type="text"
                      id="apply-city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Enter your city"
                      required
                    />
                  </div>
                </div>

                {/* Apply For */}
                <div className="apply-field-group">
                  <label htmlFor="apply-position">Apply For <span className="req">*</span></label>
                  <div className="input-with-icon">
                    <svg className="field-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                    <select
                      id="apply-position"
                      name="applyFor"
                      value={formData.applyFor}
                      onChange={handleInputChange}
                      className="apply-select"
                      required
                    >
                      <option value="Yoga Instructor Intern">Yoga Instructor Intern</option>
                      <option value="Psychology & Behavioral Health Intern">Psychology & Behavioral Health Intern</option>
                      <option value="Wellness & Nutrition Coach Intern">Wellness & Nutrition Coach Intern</option>
                      <option value="Digital Marketing & Growth Intern">Digital Marketing & Growth Intern</option>
                      <option value="Content Creator & Media Intern">Content Creator & Media Intern</option>
                      <option value="Operations & Community Intern">Operations & Community Intern</option>
                    </select>
                  </div>
                </div>

                {/* Resume Upload */}
                <div className="apply-field-group apply-field-full">
                  <label htmlFor="apply-resume">Upload Resume (PDF, DOC, DOCX, Max 5MB)</label>
                  <div className={`apply-file-dropzone ${resumeFileName ? 'file-active' : ''}`}>
                    <input
                      type="file"
                      id="apply-resume"
                      accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                      onChange={handleFileChange}
                      className="apply-file-input"
                    />
                    <div className="apply-file-content">
                      {resumeFileName ? (
                        <div className="apply-file-selected">
                          <div className="file-success-badge">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                              <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                          </div>
                          <span className="file-name">{resumeFileName}</span>
                          <span className="change-file">Click or drag to replace file</span>
                        </div>
                      ) : (
                        <div className="file-empty-state">
                          <div className="upload-icon-circle">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                              <polyline points="17 8 12 3 7 8"></polyline>
                              <line x1="12" y1="3" x2="12" y2="15"></line>
                            </svg>
                          </div>
                          <p className="file-prompt"><strong>Click to upload your resume</strong> or drag & drop</p>
                          <span className="file-hint">Supported formats: PDF, DOC, DOCX, PNG, JPG (Up to 5MB)</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="apply-submit-wrapper">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`apply-submit-btn ${isSubmitting ? 'submitting' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <span className="apply-spinner"></span>
                      Submitting Application...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Why Should You Enroll Section */}
      <section className="internship-why-enroll">
        <div className="internship-container">
          <h2 className="why-enroll-heading">Why should you enroll</h2>
          <div className="why-enroll-list">
            {WHY_ENROLL_ITEMS.map((item) => (
              <div key={item.id} className="why-enroll-item">
                <div className="why-enroll-icon-wrapper">
                  <img src={item.icon} alt={item.title} className="why-enroll-icon" />
                </div>
                <p className="why-enroll-text">
                  <strong>{item.title}</strong> {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Will Receive Section */}
      <section className="internship-what-receive">
        <div className="internship-container">
          <h2 className="what-receive-heading">What you will receive</h2>
          <div className="what-receive-list">
            {WHAT_YOU_RECEIVE_ITEMS.map((item) => (
              <div key={item.id} className="what-receive-item">
                <div className="what-receive-icon-wrapper">
                  <img src={item.icon} alt={item.title} className="what-receive-icon" />
                </div>
                <h3 className="what-receive-title">{item.title}</h3>
                <p className="what-receive-desc">{item.description}</p>
              </div>
            ))}
          </div>
          <p className="what-receive-footer-text">
            Access to standardized assessment guides, session frameworks, and recommended reading materials.
          </p>
        </div>
      </section>

      {/* Understanding Our Commitment Fee Section */}
      <section className="internship-commitment-fee">
        <div className="internship-container">
          <h2 className="commitment-fee-heading">Understanding Our Commitment Fee</h2>
          <div className="commitment-fee-content">
            <p className="commitment-fee-lead">
              To maintain a high standard of education and dedicated mentorship, this program includes a nominal enrollment fee.
            </p>
            <p className="commitment-fee-body">
              We view this internship as an intensive investment in your professional growth. Charging a program fee ensures that every participant enters with genuine dedication, accountability, and a serious commitment to their own learning journey. It allows us to keep class sizes small, provide personalized mentor feedback, and deliver structured, high-value training rather than passive observation.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="internship-faq-section">
        <div className="internship-container">
          <div className="faq-header-wrapper-custom">
            <span className="faq-small-title">FAQ</span>
            <h2 className="faq-large-title">FREQUENTLY ASKED QUESTIONS</h2>
          </div>
          <div className="faq-list">
            {INTERNSHIP_FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={faq.id}
                  className={`faq-item-box ${isOpen ? 'active' : ''}`}
                  onClick={() => toggleFaq(index)}
                >
                  <div className="faq-item-header">
                    <h3 className="faq-question-title">{faq.question}</h3>
                    <div className={`faq-chevron ${isOpen ? 'rotate' : ''}`}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </div>
                  <div className={`faq-item-body ${isOpen ? 'show' : ''}`}>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
