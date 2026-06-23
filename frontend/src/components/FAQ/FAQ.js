import './FAQ.css';
import React, { useState } from 'react';

const FAQ_DATA = [
  {
    question: 'What is a Yoga Healers lifestyle?',
    answer: 'A Yoga Healers lifestyle is based on ancient yogic scriptures and natural laws. It involves eating living, water-rich, plant-based foods (free from oil, dairy, refined sugar, and chemicals), practicing daily yoga and pranayama, sleeping in alignment with the sun, and keeping a positive, peaceful state of mind. It allows the body to maintain its natural state of health.'
  },
  {
    question: 'Can lifestyle changes really reverse chronic diseases like Thyroid & Diabetes?',
    answer: 'Yes! Most chronic disorders like Thyroid, Diabetes (Type 2), High Blood Pressure, Acidity, Migraine, and Eczema are lifestyle diseases, not genetic sentences. When you detoxify your body (via enemas and fasting) and feed it living, nutrient-dense organic food, the body naturally cleanses congested organs and starts self-healing, often allowing doctors to stop medications.'
  },
  {
    question: 'Is using the enema kit safe?',
    answer: 'Absolutely. Using our medical-grade silicone enema kit with plain lukewarm water is completely safe and non-habit forming when done as directed. Unlike chemical laxatives, it simply flushes out accumulated toxins from the lower colon, providing instant relief from bloating and acidity, and accelerating systemic healing.'
  },
  {
    question: 'Do you offer personalized medicine or consultations?',
    answer: 'We do not prescribe medicines. We believe the body is its own doctor, and nature is the medicine. Our coaches teach you self-healing protocols in our workshops. If you have severe medical conditions, we guide you on how to naturally correct your lifestyle in alignment with your physician\'s monitoring.'
  },
  {
    question: 'How do I access the workshops after registration?',
    answer: 'Once your registration payment is successful, you will receive a WhatsApp message and email confirmation immediately. We will send you the Zoom meeting links, prep checklist, and ingredient sourcing list 24 hours prior to the workshop starting date. All live sessions are recorded and made available for 30 days.'
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (idx) => {
    setActiveIndex(activeIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="faq">
      <div className="section-container">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <p className="section-subtitle">
          Have questions about starting your natural healing journey? Find detailed answers below or contact our support team.
        </p>

        <div className="faq-container">
          {FAQ_DATA.map((faq, idx) => (
            <div 
              key={idx} 
              className={`faq-item ${activeIndex === idx ? 'active' : ''}`}
            >
              <div className="faq-question" onClick={() => toggleFAQ(idx)}>
                <span>{faq.question}</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
