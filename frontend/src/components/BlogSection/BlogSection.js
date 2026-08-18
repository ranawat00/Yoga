import React, { useRef } from 'react';
import './BlogSection.css';
import blogBannerImg from '../../assets/blog/blog_banner.jpg';
import { useApp } from '../../hooks/useApp';

export const BLOGS_DATA = [
  {
    id: 'mental-health-silent-pandemic',
    title: 'Mental Health - A Silent Pandemic',
    excerpt: 'We live in an era defined by extraordinary innovation. Artificial Intelligence speeds up our tasks, digital transformation connects us globally in milliseconds, and opportunities to learn and grow are everywhere. Yet, alongside this fast-paced shift to put speed and achievement first, a quiet phenomenon has emerged: the silent pandemic of neglected mental health.',
    image: blogBannerImg
  },
  {
    id: 'holistic-living-mindful-wellness',
    title: 'Holistic Living & Mindful Wellness',
    excerpt: 'Digital advancements offer powerful tools to streamline our daily routines, opening up space to focus on holistic health. Prioritizing mental strength transforms how we navigate high-speed environments and fosters creative problem-solving and intentional decision-making.',
    image: blogBannerImg
  },
  {
    id: 'yoga-breathwork-stress-resilience',
    title: 'Yoga & Breathwork for Stress Resilience',
    excerpt: 'Ancient yoga and pranayama practices provide a scientifically backed foundation to restore nervous system balance, improve focus, boost physical immunity, and cultivate inner peace in high-pressure daily life.',
    image: blogBannerImg
  },
  {
    id: 'nurturing-mental-strength-youth',
    title: 'Nurturing Mental Strength in Youth',
    excerpt: 'Academic competition and continuous screen time put unprecedented pressure on children and young adults. Proactive mindfulness habits build emotional stability, long-term focus, and healthy social connections.',
    image: blogBannerImg
  }
];

export default function BlogSection() {
  const { setView } = useApp();
  const sliderRef = useRef(null);

  const handleCardClick = () => {
    setView('blog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollSlider = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="home-blog-section" id="blog-section">
      <div className="home-blog-container">

        {/* Section Header */}
        <div className="home-blog-header-row">
          <div>
            <p className="home-blog-pretitle">OUR LATEST INSIGHTS & ARTICLES</p>
            <h2 className="home-blog-title">Yoga & Mental Wellness Blogs</h2>
          </div>

          {/* Navigation Arrows */}
          <div className="home-blog-arrow-group">
            <button
              className="blog-slider-arrow prev"
              onClick={() => scrollSlider('left')}
              aria-label="Previous article"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button
              className="blog-slider-arrow next"
              onClick={() => scrollSlider('right')}
              aria-label="Next article"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>

        {/* Horizontal Slider Track */}
        <div className="home-blog-slider-wrapper">
          <div className="home-blog-slider-track" ref={sliderRef}>
            {BLOGS_DATA.map((blog) => (
              <article
                key={blog.id}
                className="home-blog-card"
                onClick={handleCardClick}
                role="button"
                tabIndex="0"
                aria-label={`Read article: ${blog.title}`}
              >
                {/* Top Banner Image Box */}
                <div className="home-blog-banner-box">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="home-blog-banner-img"
                    loading="lazy"
                  />
                </div>

                {/* Card Content & Excerpt */}
                <div className="home-blog-card-body">
                  <p className="home-blog-excerpt">
                    <strong>{blog.excerpt.split(' ').slice(0, 4).join(' ')}</strong>{' '}
                    {blog.excerpt.split(' ').slice(4).join(' ')}
                  </p>

                  <div className="home-blog-action">
                    <span className="home-blog-read-more">
                      <span className="read-more-text">read more</span>
                      <svg className="read-more-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
