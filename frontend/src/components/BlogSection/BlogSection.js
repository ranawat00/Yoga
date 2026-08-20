import React, { useRef } from 'react';
import './BlogSection.css';
import { useApp } from '../../hooks/useApp';
import { BLOGS_DATA } from '../../data/blogsData';

// Central export of blogs data collection (Blogs 1 to 9 inclusive) - Active Home Slider
export { BLOGS_DATA };

export default function BlogSection() {
  const { setView, setViewingBlog } = useApp();
  const sliderRef = useRef(null);

  const handleCardClick = (blogId) => {
    if (setViewingBlog) {
      setViewingBlog(blogId);
    }
    setView('blog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="home-blog-section" id="blog-section">
      <div className="home-blog-container">

        {/* Section Header */}
        <div className="home-blog-header-row">
          <div className="home-blog-header-center">
            <h2 className="home-blog-title">DID YOU REALISE ?</h2>
            <p className="home-blog-subtitle">Don't wait- We must Act Now</p>
          </div>
        </div>

        {/* Horizontal Slider Track */}
        <div className="home-blog-slider-wrapper">
          <div className="home-blog-slider-track" ref={sliderRef}>
            {BLOGS_DATA.map((blog) => (
              <article
                key={blog.id}
                className="home-blog-card"
                onClick={() => handleCardClick(blog.id)}
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
