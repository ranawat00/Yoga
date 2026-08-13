import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './DailyYogaTogetherDetails.css';
import yogaBannerImg from '../../assets/Daily_yoga_together_details/banner.jpg';
import thirdImg from '../../assets/Daily_yoga_together_details/third_image.jpg';
import details1 from '../../assets/Daily_yoga_together_details/details1.png';
import details2 from '../../assets/Daily_yoga_together_details/details2.png';
import details3 from '../../assets/Daily_yoga_together_details/details3.png';
import details4 from '../../assets/Daily_yoga_together_details/details4.png';
import details5 from '../../assets/Daily_yoga_together_details/details5.png';
import details6 from '../../assets/Daily_yoga_together_details/details6.jpg';
import details7 from '../../assets/Daily_yoga_together_details/details7.jpg';
import { useApp } from '../../hooks/useApp';
import { createOrder, verifyPayment } from '../../api/payment';
import { createOrderRecord } from '../../api/orders';

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

// eslint-disable-next-line no-unused-vars
const getMeetLink = (batchName) => {
  if (batchName.includes('Morning')) {
    return 'https://meet.google.com/yga-daily-morn';
  } else if (batchName.includes('Evening')) {
    return 'https://meet.google.com/yga-daily-even';
  }
  return 'https://meet.google.com/yga-daily-live';
};

export default function DailyYogaTogetherDetails() {
  // eslint-disable-next-line no-unused-vars
  const { setView, addNotification } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState('3months');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    batch: 'Morning Batch (6:00 AM - 7:15 AM IST)'
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setSuccessData(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSuccessData(null);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      addNotification('Please complete all required fields.', 'error');
      return;
    }

    setIsSubmitting(true);
    const price = selectedPlan === 'monthly' ? 149 : selectedPlan === '3months' ? 399 : 1500;
    const planLabel = selectedPlan === 'monthly' ? 'Monthly Plan' : selectedPlan === '3months' ? '3 Months Plan' : 'Annual Plan';
    const orderPayload = {
      name: formData.name,
      email: formData.email || `${formData.name.toLowerCase().replace(/\s+/g, '')}@yogahealers.org`, // fallback email if not asked
      phone: formData.phone,
      address: `Daily Yoga Together - ${planLabel}`,
      city: 'Virtual',
      pincode: '000000',
      items: [
        {
          product: {
            id: `daily-yoga-${selectedPlan}`,
            title: `Daily Yoga Together - ${planLabel}`,
            price: price,
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
      if (price > 0) {
        const res = await createOrder(price);
        if (!res.success) {
          addNotification(res.message || 'Failed to initialize payment', 'error');
          setIsSubmitting(false);
          return;
        }

        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
          addNotification('Failed to load payment gateway.', 'error');
          setIsSubmitting(false);
          return;
        }

        const options = {
          key: 'rzp_test_T4Zv42O4gEwCJD',
          amount: res.amount,
          currency: res.currency,
          name: 'Yoga Healers',
          description: `Daily Yoga Together - ${planLabel}`,
          order_id: res.orderId,
          handler: async function (response) {
            const verification = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });

            if (verification.success) {
              await createOrderRecord({
                ...orderPayload,
                paymentMethod: 'CARD',
                paymentId: response.razorpay_payment_id
              });
              setSuccessData({
                batch: planLabel,
                meetLink: 'https://meet.google.com/yhb-yoga-live',
                email: orderPayload.email
              });
              addNotification(`Successfully joined the ${planLabel}!`, 'success');
            } else {
              addNotification('Payment verification failed.', 'error');
            }
            setIsSubmitting(false);
          },
          prefill: { name: formData.name, email: orderPayload.email, contact: formData.phone }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        // Free Registration Direct Confirmation (should not occur since prices > 0, but good fallback)
        const orderRes = await createOrderRecord({
          ...orderPayload,
          paymentMethod: 'FREE_REGISTRATION',
          paymentId: 'REG_' + Date.now()
        });

        if (orderRes.success || true) {
          setSuccessData({
            batch: planLabel,
            meetLink: 'https://meet.google.com/yhb-yoga-live',
            email: orderPayload.email
          });
          addNotification(`Successfully registered for the ${planLabel}!`, 'success');
        } else {
          addNotification('Registration failed. Please try again.', 'error');
        }
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error('Registration Error:', err);
      addNotification('An unexpected error occurred.', 'error');
      setIsSubmitting(false);
    }
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const FAQS = [
    {
      q: 'What are the Daily Online Wellness Classes?',
      a: 'Our daily online wellness classes offer a complete, holistic approach to daily mind-body practice. Rather than just ending when live sessions finish, this program integrates guided physical movement, deep breathwork, actionable daily habits, and ongoing mindful counseling to help you stay grounded, resilient, and energized all day long.'
    },
    {
      q: 'How do these classes differ from standard online yoga sessions?',
      a: 'Most online classes end the moment the video stream turns off. Our program goes beyond the mat by combining physical practices (asanas and kriyas) with daily mindful counseling and off-the-mat habit building. We provide continuous support so you can bring stillness, clarity, and strength into your regular daily routine.'
    },
    {
      q: 'What can I expect during the Guided Asana practice?',
      a: 'The guided asana sequences are designed to build functional strength, increase flexibility, improve balance, and enhance joint mobility. The goal is to cultivate an agile, high-energy body that feels light, resilient, and free from chronic tightness.'
    },
    {
      q: 'What is the role of Breathwork & Kriya in the sessions?',
      a: 'Through targeted pranayama and breath-focused kriyas, you learn to actively regulate your nervous system. These practices quiet a hyperactive mind, heighten mental focus, clear sluggish energy, and build deep inner balance to handle daily stressors.'
    },
    {
      q: 'How do the Daily Mindful Habits work?',
      a: 'True transformation happens in how you move through your normal day. We provide simple, actionable habit frameworks that help you translate what you practice on the mat—such as conscious breathing, emotional grounding, and presence—into your everyday work, relationships, and decision-making.'
    },
    {
      q: 'What does Mindful Counseling cover, and how does it help?',
      a: 'Daily mindful counseling provides targeted psychological support to help you build mental strength, lower stress, and regulate emotions. It equips you with practical, evidence-informed tools to quiet overthinking, navigate challenging emotions, manage conditions like PMOS (Post-Mental Overload Syndrome), and build long-term psychological resilience.'
    },
    {
      q: 'Is this program suitable for beginners?',
      a: 'Yes. Whether you are completely new to yoga and breathwork or have years of experience, every session offers progressive variations. Movements and breath practices are taught step-by-step so you can safely practice at your own comfort level.'
    },
    {
      q: 'How are the daily sessions delivered?',
      a: 'Classes are delivered live online daily, allowing you to join a collective space from home. You will receive structured daily guidance, interactive instruction, and clear tools to implement throughout your day.'
    },
    {
      q: 'What do I need to participate?',
      a: 'You need a stable internet connection, a comfortable yoga mat or floor space, a quiet environment for breathwork and counseling, and a commitment to showing up for your daily well-being.'
    }
  ];

  return (
    <div className="daily-yoga-details-page">
      {/* Hero Banner Header Section using yoga_banner.jpg */}
      <section className="daily-yoga-details-hero">
        <div className="daily-yoga-details-hero-container">
          <div className="daily-yoga-details-hero-card">
            <img
              src={yogaBannerImg}
              alt="Daily Yoga Together Banner"
              className="daily-yoga-details-hero-img"
            />
            <div className="daily-yoga-details-hero-overlay">
              <button
                className="revolution-register-btn"
                onClick={handleOpenModal}
                aria-label="Register Now"
              >
                <div className="btn-navy-block">
                  <span className="btn-navy-text">REGISTER NOW</span>
                </div>
                <div className="btn-arrow-block">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>
                <div className="btn-white-fill" />
              </button>
            </div>
          </div>
        </div>
      </section>



      {/* Main Program Overview */}
      <section className="daily-yoga-details-content">
        <div className="daily-yoga-details-container">

          {/* Your Daily Rituals Section */}
          <div className="daily-yoga-rituals-section">
            <h2 className="rituals-section-heading">YOUR DAILY RITUALS</h2>
            <div className="rituals-grid">

              <div className="ritual-card">
                <div className="ritual-image-container">
                  <img src={details1} alt="Guided Asanas" className="ritual-icon-img" />
                </div>
                <h3>GUIDED ASANAS</h3>
                <p>A guided sequence focusing on strength, flexibility, balance, and mobility for an agile, high-energy body</p>
              </div>

              <div className="ritual-card">
                <div className="ritual-image-container">
                  <img src={details2} alt="Breathwork & Kriya" className="ritual-icon-img" />
                </div>
                <h3>BREATHWORK & KRIYA</h3>
                <p>Regulate your nervous system and cultivate mental resilience through breath-focused kriyas and pranayama. Designed to quiet the mind, heighten focus, and bring deep inner balance.</p>
              </div>

              <div className="ritual-card">
                <div className="ritual-image-container">
                  <img src={details3} alt="Mindful Counselling" className="ritual-icon-img" />
                </div>
                <h3>MINDFUL COUNSELLING</h3>
                <p>Daily mindful counseling builds psychological strength, reduces stress, and strengthens mental resilience. Gain practical tools to manage PMOS, quiet the mind, and restore lasting emotional balance every day.</p>
              </div>

              <div className="ritual-card">
                <div className="ritual-image-container">
                  <img src={details4} alt="Daily Mindful Habits" className="ritual-icon-img" />
                </div>
                <h3>DAILY MINDFUL HABITS</h3>
                <p>Yoga doesn't end when you leave the mat. Discover easy-to-implement habits that help you navigate daily life with greater awareness, calm, and grounded focus.</p>
              </div>

            </div>
          </div>

          {/* Unlocking a New Level of You Section */}
          <div className="unlock-level-section">
            <h2 className="unlock-heading">UNLOCKING A NEW LEVEL OF YOU</h2>
            <div className="unlock-image-container">
              <img src={thirdImg} alt="Unlocking a New Level of You" className="unlock-img" />
            </div>
            <p className="unlock-description">
              Unlock a new level of yourself through daily consistency—achieving physical strength, optimal weight, lower stress, vibrant energy, better immunity, and deep listening skills.
              Your mental health is the foundation of this transformation; it fuels every aspect of your well-being. At Yoga Healers Organisation, we are committed to guiding your conscious journey within. Your journey is precious—we care for you
            </p>
          </div>

          {/* Registration CTA Callout Card */}
          <div className="details-cta-card">
            <div className="cta-text-wrapper">
              <span className="cta-eyebrow">Start Your Wellness Journey</span>
              <h2 className="cta-main-heading">Your Transformation Starts Here</h2>
              <p className="cta-description">Take the first step towards a healthier, balanced you</p>
            </div>
            <button className="cta-register-btn animated-register-btn" onClick={handleOpenModal}>
              <span className="btn-text">REGISTER NOW</span>
              <span className="btn-separator"></span>
              <span className="btn-arrow">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </span>
            </button>
          </div>

          {/* Details 5 Section */}
          <div className="details-five-section">
            <div className="details-five-image-container">
              <img src={details5} alt="Daily Yoga Program Schedule" className="details-five-img" />
            </div>
          </div>

          {/* What You Will Gain Section (Details 6 & 7) */}
          <div className="gain-images-section">
            <h2 className="gain-images-heading">what you will gain</h2>
            <div className="gain-images-grid">
              <div className="gain-image-wrapper">
                <img src={details6} alt="What you will gain details 1" className="gain-detail-img" />
              </div>
              <div className="gain-image-wrapper">
                <img src={details7} alt="What you will gain details 2" className="gain-detail-img" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ Section with Smooth Accordion Animation */}
      <section className="faq-details-section">
        <div className="faq-header-wrapper-custom">
          <span className="faq-small-title">FAQ</span>
          <h2 className="faq-large-title">DONT JUST EXIST, LIVE</h2>
        </div>

        <div className="faq-accordion-container">
          {FAQS.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div
                key={index}
                className={`faq-accordion-item ${isOpen ? 'active' : ''}`}
                onClick={() => toggleFaq(index)}
              >
                <div className="faq-accordion-header">
                  <h3 className="faq-question-text">{faq.q}</h3>
                  <div className={`faq-chevron-icon ${isOpen ? 'rotate' : ''}`}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>

                <div className={`faq-accordion-body ${isOpen ? 'show' : ''}`}>
                  <p>{faq.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Registration Modal */}
      {isModalOpen && createPortal(
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content daily-yoga-modal" onClick={(e) => e.stopPropagation()}>
            {successData ? (
              <div className="modal-body success-view" style={{ textAlign: 'center', padding: '2rem 1.5rem', color: '#FFFFFF' }}>
                <div className="success-icon-wrapper" style={{ marginBottom: '1.5rem' }}>
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="32" r="30" fill="#FFFFFF" opacity="0.15" />
                    <circle cx="32" cy="32" r="24" fill="#FFFFFF" opacity="0.25" />
                    <path d="M22 32 L29 39 L44 24" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h2 style={{ color: '#FFFFFF', marginBottom: '0.5rem', fontSize: '1.8rem', fontWeight: '800' }}>Registration Confirmed!</h2>
                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                  You are registered for <strong>Daily Yoga Together</strong>.
                </p>

                <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '1.25rem', borderRadius: '12px', textAlign: 'left', marginBottom: '1.5rem', border: '1px dashed rgba(255,255,255,0.2)' }}>
                  <div style={{ marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                    <strong>Selected Plan:</strong> <span style={{ color: '#FFD066', fontWeight: '700' }}>{successData.batch}</span>
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
                      style={{ flex: 1, fontFamily: 'monospace', fontSize: '0.85rem', backgroundColor: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '6px', padding: '0.5rem', color: '#FFFFFF' }}
                    />
                    <button
                      type="button"
                      className="btn"
                      style={{ backgroundColor: '#FFD066', color: '#1E5E4E', padding: '0.5rem 1rem', fontSize: '0.85rem', borderRadius: '6px', fontWeight: '700', border: 'none', cursor: 'pointer' }}
                      onClick={() => {
                        navigator.clipboard.writeText(successData.meetLink);
                        addNotification('Meet link copied to clipboard!', 'success');
                      }}
                    >
                      Copy
                    </button>
                  </div>
                </div>

                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', marginBottom: '1.5rem' }}>
                  We have sent your session details to <strong>{successData.email}</strong>.
                </p>

                <button className="practice-join-btn" onClick={handleCloseModal}>
                  Got it, Thanks!
                </button>
              </div>
            ) : (
              <>
                <button className="modal-close-btn-custom" onClick={handleCloseModal} aria-label="Close modal">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
                <div className="practice-modal-header">
                  <h2 className="practice-modal-title">Begin your practice</h2>
                </div>

                <form onSubmit={handleFormSubmit}>
                  <div className="practice-modal-body">
                    {/* Name Input */}
                    <div className="practice-input-wrapper">
                      <input
                        type="text"
                        name="name"
                        placeholder="Name*"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    {/* WhatsApp Phone Input */}
                    <div className="practice-phone-input-wrapper">
                      <div className="practice-country-select">
                        <span className="practice-flag">🇮🇳</span>
                        <span className="practice-code">+91</span>
                        <span className="practice-arrow">▼</span>
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="WhatsApp Number*"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    {/* Translucent empty box */}
                    <div className="practice-translucent-placeholder"></div>

                    {/* Plan Options */}
                    <div className="practice-plans-container">
                      {/* Monthly Plan */}
                      <div
                        className={`practice-plan-card ${selectedPlan === 'monthly' ? 'is-selected' : ''}`}
                        onClick={() => setSelectedPlan('monthly')}
                      >
                        <div className="practice-plan-left">
                          <span className="practice-radio-circle">
                            {selectedPlan === 'monthly' && (
                              <svg className="practice-check-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1E5E4E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            )}
                          </span>
                          <span className="practice-plan-name">Monthly Plan</span>
                        </div>
                        <div className="practice-plan-price-pill">
                          <span>149 $</span>
                        </div>
                      </div>

                      {/* 3 Months Plan (Selected / Most Popular) */}
                      <div
                        className={`practice-plan-card ${selectedPlan === '3months' ? 'is-selected' : ''}`}
                        onClick={() => setSelectedPlan('3months')}
                      >
                        <span className="practice-popular-badge">Most Popular</span>
                        <div className="practice-plan-left">
                          <span className="practice-radio-circle">
                            {selectedPlan === '3months' && (
                              <svg className="practice-check-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1E5E4E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            )}
                          </span>
                          <span className="practice-plan-name">3 Months Plan</span>
                        </div>
                        <div className="practice-plan-price-text">
                          <span>399$</span>
                        </div>
                      </div>

                      {/* Annual Plan */}
                      <div
                        className={`practice-plan-card ${selectedPlan === 'annual' ? 'is-selected' : ''}`}
                        onClick={() => setSelectedPlan('annual')}
                      >
                        <div className="practice-plan-left">
                          <span className="practice-radio-circle">
                            {selectedPlan === 'annual' && (
                              <svg className="practice-check-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1E5E4E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            )}
                          </span>
                          <span className="practice-plan-name">Annual Plan</span>
                        </div>
                        <div className="practice-plan-price-pill">
                          <span>1500$</span>
                        </div>
                      </div>
                    </div>

                    {/* Join Now Button */}
                    <button type="submit" className="practice-join-btn" disabled={isSubmitting}>
                      {isSubmitting ? 'Processing...' : 'Join Now'}
                    </button>

                    {/* Note Footer */}
                    <p className="practice-modal-note">
                      Note: It will be a recurring payment. Cancel anytime easily.
                    </p>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>,
        document.body
      )}

    </div>
  );
}
