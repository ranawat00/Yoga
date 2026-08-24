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

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
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
