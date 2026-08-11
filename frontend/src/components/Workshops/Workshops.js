import './Workshops.css';
import React, { useState, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useApp } from '../../hooks/useApp';
import detoxImg from '../../assets/workshops/workshop_1.jpg';
import meditationImg from '../../assets/workshops/third_wordshop.jpg';
import cookingImg from '../../assets/workshops/second_workshop.jpg';
import { createOrder, verifyPayment } from '../../api/payment';
import { createOrderRecord } from '../../api/orders';
import { fetchWorkshopReviews, createWorkshopReview } from '../../api/reviews';
import WorkshopDetails from './WorkshopDetails';
import LungsDetoxDetails from './LungsDetoxDetails';
import HarmonalBalanceDetails from './HarmonalBalanceDetails';
// Dynamic script loader for Razorpay Checkout
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const WORKSHOPS_DATA = [
  {
    id: 'detox-21',
    title: 'Awaken+ program',
    subtitle: '7 Days Ultimate Health Challenge',
    rating: 4.9,
    reviews: 144,
    date: '18 August',
    duration: '7 Days',
    language: 'English',
    price: 149,
    startInDays: '3 Days',
    description: 'Master your breath with the Ultimate Clear Lung Challenge—backed by 14+ years of proven expert guidance.',
    image: detoxImg
  },
  {
    id: 'mind-7',
    title: 'Lungs Detox Program',
    subtitle: '53 Days The Ultimate Lungs Detox Challenge',
    rating: 4.8,
    reviews: 144,
    date: '1 September ',
    duration: '53 Days  ',
    language: 'English',
    price: 299,
    startInDays: '5 Days',
    description: 'Master your breath with the Ultimate Clear Lung Challenge—backed by 14+ years of proven expert guidance. ',
    image: cookingImg
  },
  {
    id: 'cook-3',
    title: 'Harmonal Wellness Program',
    subtitle: 'The Ultimate Harmonal Balance Challenge',
    rating: 4.9,
    reviews: 144,
    date: '1 September',
    duration: '3 Months',
    language: 'English',
    price: 499,
    startInDays: '11 Days',
    description: 'Tackle PMOS at the root with 14+ years of proven expertise from leading doctors, psychologists, and wellness coaches ',
    image: meditationImg
  }
];

const getMeetLink = (batchName) => {
  if (batchName.includes('Morning Batch') || batchName.includes('6:00 AM')) {
    return 'https://meet.google.com/yga-morn-slot';
  } else if (batchName.includes('Evening Batch') || batchName.includes('6:00 PM')) {
    return 'https://meet.google.com/yga-even-slot';
  } else if (batchName.includes('Morning Live') || batchName.includes('10:30 AM')) {
    return 'https://meet.google.com/yga-cook-slot';
  }
  return 'https://meet.google.com/yga-healers-live';
};

export default function Workshops({ isStandalone = false }) {
  const { addNotification, setView, viewingWorkshop, setViewingWorkshop } = useApp();
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    batch: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef(null);

  // Track active slide on scroll
  const handleSliderScroll = useCallback(() => {
    const container = sliderRef.current;
    if (!container) return;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.querySelector('.workshop-card-horizontal')?.offsetWidth || 1;
    const gap = 20; // matches CSS gap
    const index = Math.round(scrollLeft / (cardWidth + gap));
    setActiveSlide(Math.min(index, WORKSHOPS_DATA.length - 1));
  }, []);

  // Scroll to a specific slide when dot is clicked
  const scrollToSlide = useCallback((index) => {
    const container = sliderRef.current;
    if (!container) return;
    const cardWidth = container.querySelector('.workshop-card-horizontal')?.offsetWidth || 0;
    const gap = 20;
    container.scrollTo({ left: index * (cardWidth + gap), behavior: 'smooth' });
  }, []);

  // Scroll slider using arrow buttons
  const scrollSlider = useCallback((direction) => {
    const container = sliderRef.current;
    if (!container) return;
    const cardWidth = container.querySelector('.workshop-card-horizontal')?.offsetWidth || 0;
    const gap = 20;
    const scrollAmount = direction === 'left' ? -(cardWidth + gap) : (cardWidth + gap);
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }, []); const displayedWorkshops = WORKSHOPS_DATA;

  // Reviews Modal States
  const [selectedWorkshopReviews, setSelectedWorkshopReviews] = useState(null);
  const [reviewsList, setReviewsList] = useState([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  const [reviewForm, setReviewForm] = useState({ name: '', rating: 5, comment: '' });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewError, setReviewError] = useState('');
  const [reviewRatingHover, setReviewRatingHover] = useState(0);

  const handleOpenReviewsModal = async (workshop) => {
    setSelectedWorkshopReviews(workshop);
    setIsLoadingReviews(true);
    setReviewError('');
    setReviewForm({ name: '', rating: 5, comment: '' });
    try {
      const res = await fetchWorkshopReviews(workshop.id);
      if (res && res.success) {
        setReviewsList(res.data || []);
      } else {
        setReviewsList([]);
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setReviewError('Failed to load reviews. Please try again.');
    } finally {
      setIsLoadingReviews(false);
    }
  };

  const handleCloseReviewsModal = () => {
    setSelectedWorkshopReviews(null);
    setReviewsList([]);
    setReviewError('');
  };

  const handleReviewInputChange = (e) => {
    const { name, value } = e.target;
    setReviewForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleReviewRatingSelect = (rating) => {
    setReviewForm((prev) => ({ ...prev, rating }));
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewForm.name.trim() || !reviewForm.comment.trim()) {
      setReviewError('Please fill out all fields.');
      return;
    }
    setIsSubmittingReview(true);
    setReviewError('');
    try {
      const res = await createWorkshopReview({
        workshopId: selectedWorkshopReviews.id,
        name: reviewForm.name,
        rating: reviewForm.rating,
        comment: reviewForm.comment
      });
      if (res && res.success) {
        // Prepend the new review to the local reviews list
        setReviewsList((prev) => [res.data, ...prev]);
        // Reset comment & name
        setReviewForm({ name: '', rating: 5, comment: '' });
        addNotification('Review submitted successfully!', 'success');
      } else {
        setReviewError(res.message || 'Failed to submit review.');
      }
    } catch (err) {
      console.error('Error submitting review:', err);
      setReviewError('An error occurred. Please try again.');
    } finally {
      setIsSubmittingReview(false);
    }
  };

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
    setSuccessData(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      addNotification('Please fill in all details.', 'error');
      return;
    }
    setIsSubmitting(true);

    const price = selectedWorkshop.price;
    const orderPayload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: 'Online Class / Live Workshop',
      city: 'Virtual',
      pincode: '000000',
      items: [
        {
          product: {
            id: selectedWorkshop.id,
            title: `${selectedWorkshop.title} (${formData.batch})`,
            price: selectedWorkshop.price,
            image: ''
          },
          quantity: 1
        }
      ],
      subtotal: price,
      shipping: 0,
      gst: 0,
      total: price
    };

    try {
      const res = await createOrder(price);
      if (!res.success) {
        addNotification(res.message || 'Failed to create payment order', 'error');
        setIsSubmitting(false);
        return;
      }

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        addNotification('Failed to load payment gateway. Please check your internet connection.', 'error');
        setIsSubmitting(false);
        return;
      }

      const options = {
        key: 'rzp_test_T4Zv42O4gEwCJD',
        amount: res.amount,
        currency: res.currency,
        name: 'Yoga Healers',
        description: `Register for ${selectedWorkshop.title}`,
        order_id: res.orderId,
        handler: async function (response) {
          try {
            // Verify payment on the backend
            const verification = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });

            if (verification.success) {
              const orderRes = await createOrderRecord({
                ...orderPayload,
                paymentMethod: 'CARD', // Mark card/online payments as CARD/UPI
                paymentId: response.razorpay_payment_id
              });

              if (orderRes.success) {
                const link = getMeetLink(formData.batch);
                setSuccessData({
                  workshopTitle: selectedWorkshop.title,
                  batch: formData.batch,
                  meetLink: link,
                  email: formData.email
                });
                addNotification(`Successfully registered for ${selectedWorkshop.title}!`, 'success');
              } else {
                addNotification(orderRes.message || 'Payment verified but failed to save registration details.', 'error');
              }
            } else {
              addNotification(verification.message || 'Payment verification failed. Please contact support.', 'error');
            }
          } catch (err) {
            console.error(err);
            addNotification(err.message || 'Error verifying payment.', 'error');
          } finally {
            setIsSubmitting(false);
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: '#001a9c', // official brand deep blue
        },
        modal: {
          ondismiss: function () {
            setIsSubmitting(false);
            addNotification('Registration payment cancelled.', 'info');
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment initialization failed:', error);
      addNotification('Could not initialize payment gateway. Please try again.', 'error');
      setIsSubmitting(false);
    }
  };

  return (
    <section id="workshops" className={`workshops ${isStandalone ? 'is-standalone' : ''} ${viewingWorkshop ? 'viewing-details' : ''}`}>
      {!viewingWorkshop ? (
        <div className="section-container" style={{ display: 'flex', flexDirection: 'column' }}>
          {isStandalone && (
            <button className="back-btn" style={{ marginBottom: '2rem', alignSelf: 'flex-start' }} onClick={() => {
              setViewingWorkshop(null);
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
          <p className="section-pretitle">One decision - Three days - Life long clarity</p>
          <h2 className="section-title">Upcoming Workshops</h2>
          <p className="section-subtitle">
            Learn and grow from anywhere—attend our online workshop right from the comfort of your home
          </p>
          <div className="slider-wrapper">
            <button className="slider-arrow prev" onClick={() => scrollSlider('left')} aria-label="Previous workshop">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>

            <div className="workshops-list" ref={sliderRef} onScroll={handleSliderScroll}>
              {displayedWorkshops.map((w) => (
                <div key={w.id} className="workshop-card-horizontal">
                  <div className="workshop-img-container">
                    <img loading="lazy" src={w.image} alt={w.title} className="workshop-img" />
                  </div>
                  <div className="workshop-content-horizontal">
                    <h3 className="workshop-title">{w.title}</h3>
                    {w.subtitle && <p className="workshop-card-subtitle">{w.subtitle}</p>}

                    <div className="workshop-rating-row">
                      <div className="stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} width="12" height="12" viewBox="0 0 24 24" fill="#F5A623" stroke="#F5A623" strokeWidth="1">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                      </div>
                      <span className="rating-score">({w.rating.toFixed(1)})</span>
                      <span className="rating-divider">|</span>
                      <span className="review-count">
                        <button className="reviews-link-btn" onClick={() => handleOpenReviewsModal(w)}>
                          {w.reviews} Reviews
                        </button>
                      </span>
                    </div>

                    <div className="workshop-pills-bar">
                      <div className="pill-section">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        <span>{w.date}</span>
                      </div>
                      <div className="pill-divider"></div>
                      <div className="pill-section">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>
                        <span>{w.duration}</span>
                      </div>
                      <div className="pill-divider"></div>
                      <div className="pill-section">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                        <span>{w.language}</span>
                      </div>
                    </div>

                    <p className="workshop-desc-horizontal">{w.description}</p>

                    <div className="workshop-footer-row">
                      <button className="view-details-link-btn" onClick={() => {
                        setViewingWorkshop(w);
                        setView('workshops');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}>
                        View Details
                      </button>
                      <button className="btn-register-green" onClick={() => {
                        setViewingWorkshop(w);
                        setView('workshops');
                        handleOpenModal(w);
                      }}>
                        Register Now &nbsp;{w.price} $
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="slider-arrow next" onClick={() => scrollSlider('right')} aria-label="Next workshop">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>

          <div className="workshop-slider-dots">
            {WORKSHOPS_DATA.map((_, i) => (
              <button
                key={i}
                className={`slider-dot ${activeSlide === i ? 'active' : ''}`}
                onClick={() => scrollToSlide(i)}
                aria-label={`Go to workshop ${i + 1}`}
              />
            ))}
          </div>
        </div>
      ) : (
        viewingWorkshop.id === 'mind-7' ? (
          <LungsDetoxDetails
            workshop={viewingWorkshop}
            onBack={() => {
              setViewingWorkshop(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onRegister={() => handleOpenModal(viewingWorkshop)}
          />
        ) : viewingWorkshop.id === 'cook-3' ? (
          <HarmonalBalanceDetails
            workshop={viewingWorkshop}
            onBack={() => {
              setViewingWorkshop(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onRegister={() => handleOpenModal(viewingWorkshop)}
          />
        ) : (
          <WorkshopDetails
            workshop={viewingWorkshop}
            onBack={() => {
              setViewingWorkshop(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onRegister={() => handleOpenModal(viewingWorkshop)}
          />
        )
      )}

      {/* Registration Modal */}
      {selectedWorkshop && createPortal(
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={handleCloseModal} aria-label="Close modal">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            {successData ? (
              <div className="modal-body success-view" style={{ textAlign: 'center', padding: '2rem 1.5rem' }}>
                <div className="success-icon-wrapper" style={{ marginBottom: '1.5rem' }}>
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="32" r="30" fill="var(--color-blue)" opacity="0.1" />
                    <circle cx="32" cy="32" r="26" fill="var(--color-blue)" opacity="0.2" />
                    <path d="M22 32 L29 39 L44 24" stroke="var(--color-blue)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h2 style={{ color: 'var(--color-text)', marginBottom: '0.5rem', fontFamily: 'var(--font-display)', fontSize: '1.8rem' }}>Registration Confirmed!</h2>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                  You are successfully registered for <strong>{successData.workshopTitle}</strong>.
                </p>

                <div style={{ backgroundColor: 'var(--color-sand-dark)', padding: '1.25rem', borderRadius: 'var(--border-radius-md)', textAlign: 'left', marginBottom: '1.5rem', border: '1px solid var(--color-border)' }}>
                  <div style={{ marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                    <strong>Selected Batch:</strong> <span style={{ color: 'var(--color-blue)', fontWeight: '600' }}>{successData.batch}</span>
                  </div>
                  <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                    <strong>Google Meet Link:</strong>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      type="text"
                      className="form-control"
                      value={successData.meetLink}
                      readOnly
                      style={{ flex: 1, fontFamily: 'monospace', fontSize: '0.85rem', backgroundColor: 'var(--color-sand)', border: '1px solid var(--color-border)', borderRadius: 'var(--border-radius-sm)', padding: '0.5rem' }}
                    />
                    <button
                      type="button"
                      className="btn btn-blue"
                      style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                      onClick={() => {
                        navigator.clipboard.writeText(successData.meetLink);
                        addNotification('Link copied to clipboard!', 'success');
                      }}
                    >
                      Copy
                    </button>
                  </div>
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                  We have also sent the Google Meet details and calendar invite to <strong>{successData.email}</strong>.
                </p>

                <button className="btn btn-blue" onClick={handleCloseModal} style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--border-radius-sm)' }}>
                  Got it, Thanks!
                </button>
              </div>
            ) : (
              <>
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

                    {formData.batch && (
                      <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'var(--color-sand-dark)', borderRadius: 'var(--border-radius-sm)', fontSize: '0.85rem', border: '1px dashed var(--color-blue)' }}>
                        <div style={{ fontWeight: 'bold', color: 'var(--color-blue)', marginBottom: '0.25rem' }}>
                          Assigned Google Meet Link:
                        </div>
                        <div style={{ fontFamily: 'monospace', color: 'var(--color-text)', wordBreak: 'break-all' }}>
                          {getMeetLink(formData.batch)}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.4rem' }}>
                          * The Meet link will activate automatically at class time and has been synced with this batch.
                        </div>
                      </div>
                    )}
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
              </>
            )}
          </div>
        </div>,
        document.body
      )}

      {/* Reviews Modal */}
      {selectedWorkshopReviews && createPortal(
        <div className="modal-overlay" onClick={handleCloseReviewsModal}>
          <div className="modal-content reviews-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={handleCloseReviewsModal} aria-label="Close modal">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="modal-header">
              <h2>Customer Reviews</h2>
              <p style={{ color: 'var(--color-green)', fontWeight: 'bold' }}>{selectedWorkshopReviews.title}</p>
            </div>

            <div className="modal-body reviews-modal-body">
              {isLoadingReviews ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 0', gap: '1rem' }}>
                  <div className="spinner" style={{ width: '40px', height: '40px', border: '3px solid #EBE6DB', borderTopColor: '#748B6F', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                  <p style={{ color: 'var(--color-text-secondary)' }}>Loading reviews...</p>
                </div>
              ) : (
                <div className="reviews-layout">
                  {/* Reviews List */}
                  <div className="reviews-list-container">
                    <h3>Recent Reviews ({reviewsList.length})</h3>
                    {reviewError && <div style={{ color: 'red', marginBottom: '1rem', fontSize: '0.9rem' }}>{reviewError}</div>}

                    {reviewsList.length === 0 ? (
                      <p style={{ color: 'var(--color-text-secondary)', fontStyle: 'italic', padding: '1.5rem 0' }}>No reviews yet. Be the first to review this workshop!</p>
                    ) : (
                      <div className="reviews-scroller">
                        {reviewsList.map((review, index) => (
                          <div key={review._id || index} className="review-item">
                            <div className="review-item-header">
                              <span className="review-item-author">{review.name}</span>
                              <span className="review-item-date">
                                {new Date(review.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                              </span>
                            </div>
                            <div className="review-item-stars" style={{ margin: '0.25rem 0' }}>
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg key={star} width="12" height="12" viewBox="0 0 24 24" fill={star <= review.rating ? '#F5A623' : '#E2DDD5'} stroke={star <= review.rating ? '#F5A623' : '#E2DDD5'} strokeWidth="1">
                                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>
                              ))}
                            </div>
                            <p className="review-item-comment">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Review Submit Form */}
                  <div className="reviews-form-container">
                    <h3>Write a Review</h3>
                    <form onSubmit={handleReviewSubmit}>
                      <div className="form-group">
                        <label className="form-label" htmlFor="rev-name">Your Name</label>
                        <input
                          id="rev-name"
                          type="text"
                          name="name"
                          className="form-control"
                          placeholder="Enter your name"
                          value={reviewForm.name}
                          onChange={handleReviewInputChange}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Your Rating</label>
                        <div className="review-rating-select-stars" style={{ display: 'flex', gap: '0.4rem', cursor: 'pointer', margin: '0.5rem 0' }}>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              width="26"
                              height="26"
                              viewBox="0 0 24 24"
                              fill={(reviewRatingHover || reviewForm.rating) >= star ? '#F5A623' : '#E2DDD5'}
                              stroke={(reviewRatingHover || reviewForm.rating) >= star ? '#F5A623' : '#E2DDD5'}
                              strokeWidth="1.5"
                              onMouseEnter={() => setReviewRatingHover(star)}
                              onMouseLeave={() => setReviewRatingHover(0)}
                              onClick={() => handleReviewRatingSelect(star)}
                            >
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                          ))}
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label" htmlFor="rev-comment">Review Comments</label>
                        <textarea
                          id="rev-comment"
                          name="comment"
                          className="form-control"
                          rows="4"
                          placeholder="Tell us what you think about this workshop..."
                          value={reviewForm.comment}
                          onChange={handleReviewInputChange}
                          style={{ resize: 'vertical' }}
                          required
                        ></textarea>
                      </div>

                      <button type="submit" className="btn btn-blue" disabled={isSubmittingReview} style={{ width: '100%', marginTop: '0.5rem', padding: '0.7rem' }}>
                        {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-outline" onClick={handleCloseReviewsModal} style={{ padding: '0.6rem 1.2rem' }}>
                Close
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}

