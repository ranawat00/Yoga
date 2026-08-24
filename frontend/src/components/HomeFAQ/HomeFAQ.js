import React, { useState } from 'react';
import './HomeFAQ.css';

const HOME_FAQS = [
  {
    id: 1,
    question: 'What is Yoga Healers Organisation (YHO)?',
    answer: 'Yoga Healers Organisation (YHO) is an elite, international wellness brand and global movement with a thriving community of over 20+ million individuals worldwide. We are dedicated to holistic wellness, mental health advocacy, community upliftment, and empowering the next generation of global leaders through transformational experiences.'
  },
  {
    id: 2,
    question: 'How are YHO workshops conducted?',
    answer: 'To ensure our transformative programs are accessible across the globe, all YHO workshops are conducted 100% online. You can seamlessly join our high-impact sessions from the comfort of your home, office, or anywhere in the world.'
  },
  {
    id: 3,
    question: 'Who can join YHO workshops?',
    answer: 'Our programs are thoughtfully designed for people from all walks of life. Whether you are a student, corporate executive, young entrepreneur, homemaker, or seasoned professional, YHO welcomes anyone seeking deep personal growth, mental clarity, and holistic wellness.'
  },
  {
    id: 4,
    question: 'What can I expect when I enroll in a YHO workshop?',
    answer: 'Get ready for real-time transformation. Our online workshops are not merely informational; they are deeply experiential. Through guided practice, mental health strategies, personal empowerment tools, and community interaction, you will experience visible shifts in your mindset, energy, and overall well-being right from the very first session.'
  },
  {
    id: 5,
    question: 'What makes YHO a luxury wellness brand?',
    answer: 'At YHO, luxury is defined by the quality, depth, and exclusivity of the experience. We offer world-class facilitation, cutting-edge holistic wellness practices, tailored mentorship for youth leaders, and access to a prestigious, supportive global community of over 20 million like-minded individuals.'
  },
  {
    id: 6,
    question: 'How does YHO empower youth and young leaders?',
    answer: 'YHO is deeply committed to nurturing the next generation. Our leadership programs integrate mental resilience, emotional intelligence, mindfulness, and community-building skills to prepare young leaders to create positive, lasting impacts in their communities and careers.'
  },
  {
    id: 7,
    question: 'How does YHO contribute to community upliftment?',
    answer: 'Community is at the core of everything we do. Beyond individual transformation, YHO drives social impact by promoting global mental health awareness, fostering inclusive wellness spaces, and executing grassroots community upliftment initiatives across continents.'
  },
  {
    id: 8,
    question: 'How do I enroll in an upcoming YHO workshop?',
    answer: 'Enrolling is simple! Visit our official website\'s Workshops page, browse our upcoming online programs, and select the course that aligns with your goals. Once registered, you will receive instant access to your workshop portal and live session links.'
  }
];

export default function HomeFAQ() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section className="home-faq-section">
      <div className="home-faq-container">
        <div className="faq-header-wrapper-custom">
          <span className="faq-small-title">FAQ</span>
          <h2 className="faq-large-title">Frequently Asked Questions</h2>
        </div>
        <div className="faq-list">
          {HOME_FAQS.map((faq, index) => {
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
  );
}
