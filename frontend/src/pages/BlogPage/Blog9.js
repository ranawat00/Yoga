import React from 'react';
import './BlogPage.css';
import { useApp } from '../../hooks/useApp';
import blog9Content1Img from '../../assets/blog/blog9_content1.jpg';
import blog9Content2Img from '../../assets/blog/blog9_content2.jpg';
import blog9WorkshopBannerImg from '../../assets/blog/blog9_contetn.jpg';

export default function Blog9({ blog }) {
  const { setView } = useApp();

  const handleRegisterClick = () => {
    if (setView) {
      setView('workshops');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="blog-article-container">
      {/* Article Body */}
      <article className="blog-article-body blog-yoga-capital-article">
        {/* Main Title */}
        <h1 className="blog-yoga-capital-main-title">
          The Sacred Breath of the World: Why India Remains the Global Capital of Yoga and Holistic Healing
        </h1>

        {/* Lead Paragraphs */}
        <p className="blog-paragraph blog-yoga-capital-paragraph blog-yoga-capital-lead">
          Across geography, culture, and background, human beings share the exact same fundamental core: the desire for inner peace, health, and connection. Long before modern science began mapping the mind-body connection, an ancient wisdom tradition was born in India—one that viewed the human experience not as isolated parts, but as a unified whole.
        </p>

        <p className="blog-paragraph blog-yoga-capital-paragraph">
          Today, India stands globally recognized as the Yoga Capital of the World. Yet, this title isn't merely about physical postures or wellness retreats. It stems from a deep, living heritage rooted in sacred reverence for life, nature, and human consciousness.
        </p>

        {/* Content Image 1 (Breathe. Thrive. Heal. Banner) */}
        <div className="blog9-content-img-box">
          <div className="blog9-content-img-wrapper">
            <img
              src={blog9Content1Img}
              alt="YHO Breathe. Thrive. Heal."
              className="blog9-content-img"
            />
          </div>
        </div>

        {/* Section 1 Heading */}
        <h2 className="blog-yoga-capital-section-heading">
          Beyond the Mat: The True Essence of Universal Spirituality
        </h2>

        <p className="blog-paragraph blog-yoga-capital-paragraph">
          To understand why India is the heart of global wellness, one must look past physical movement. At its core, yoga is a secular, universal technology for inner transformation. The word Yoga itself means "to unite"—bridging body, mind, breath, and the natural world.
        </p>

        <p className="blog-paragraph blog-yoga-capital-paragraph">
          The spirituality embedded in this land is not bound by dogma or creed; it is an open invitation to experience presence. It is the sacred understanding that every breath we draw connects us to the atmosphere shared by billions of others. In this view, holiness is found in quiet self-awareness, compassion for living beings, and harmony with the Earth.
        </p>

        {/* Section 2 Heading */}
        <h2 className="blog-yoga-capital-section-heading">
          One Earth, One Family, One Future: The YHO Vision
        </h2>

        <p className="blog-paragraph blog-yoga-capital-paragraph">
          In a fast-paced world marked by stress and separation, the Yoga Healers Organisation (YHO) is leading a global movement to bring these ancient universal truths into modern daily life.
        </p>

        {/* Content Image 2 (One Earth - One Family - One Future Banner) */}
        <div className="blog9-content-img-box">
          <div className="blog9-content-img-wrapper">
            <img
              src={blog9Content2Img}
              alt="YHO One Earth - One Family - One Future"
              className="blog9-content-img"
            />
          </div>
        </div>

        <p className="blog-paragraph blog-yoga-capital-paragraph">
          Guided by the timeless ethos of "One Earth, One Family, One Future," YHO serves as a bridge between age-old mindful practices and humanity's collective need for holistic healing. We believe that global peace cannot be achieved through policy alone—it begins within the quiet heart of every individual.
        </p>

        <p className="blog-paragraph blog-yoga-capital-paragraph">
          When we heal the individual, we heal the collective. By fostering inner tranquility, YHO empowers people worldwide to become active ambassadors for unity, environmental respect, and global goodwill.
        </p>

        {/* Section 3 Heading */}
        <h2 className="blog-yoga-capital-section-heading">
          Breathe – Thrive – Heal: Join the Revolution for Mother Earth
        </h2>

        <p className="blog-paragraph blog-yoga-capital-paragraph">
          Our global anthem and daily invitation is simple yet transformative: Breathe – Thrive – Heal.
        </p>

        <ul className="blog-yoga-capital-list">
          <li><strong>Breathe:</strong> Reconnect with your anchor. Conscious breathing restores physical balance, calms the central nervous system, and clears mental noise.</li>
          <li><strong>Thrive:</strong> Move beyond mere survival. Align your mind and body to unlock vital energy, resilience, and creative purpose.</li>
          <li><strong>Heal:</strong> Extend wellness outward. A healthy individual naturally radiates kindness, reduces environmental harm, and contributes positively to society.</li>
        </ul>

        <p className="blog-paragraph blog-yoga-capital-paragraph">
          By joining the YHO revolution, you are not simply adopting a fitness routine—you are making a noble contribution toward making Mother Earth a peaceful, vibrant, and sustainable home for generations to come.
        </p>

        {/* Section 4 Heading */}
        <h2 className="blog-yoga-capital-section-heading">
          Step Into Your Purpose
        </h2>

        <p className="blog-paragraph blog-yoga-capital-paragraph blog-yoga-capital-conclusion">
          Global change begins with a single conscious breath. Whether you are seeking personal vitality or wish to contribute to global peace, your journey starts here.
        </p>

        {/* Workshop Banner & Register CTA Card */}
        <div className="blog9-cta-box">
          <div className="blog9-content-img-wrapper">
            <img src={blog9WorkshopBannerImg} alt="Start your Free 5 DAYS ONLINE YOGA WORKSHOP" className="blog9-content-img" />
          </div>
          <button className="blog9-register-btn" onClick={handleRegisterClick}>
            <span>Register Now</span>
            <div className="blog9-btn-arrow">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          </button>
        </div>
      </article>
    </div>
  );
}
