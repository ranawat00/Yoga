import React from 'react';
import './BlogPage.css';
import { useApp } from '../../hooks/useApp';
import { BLOGS_DATA } from '../../data/blogsData';
import Blog1 from './Blog1';
import Blog2 from './Blog2';
import Blog3 from './Blog3';
import Blog4 from './Blog4';
import Blog5 from './Blog5';
import Blog6 from './Blog6';
import Blog7 from './Blog7';
import Blog8 from './Blog8';
import Blog9 from './Blog9';

export default function BlogPage() {
  const { viewingBlog } = useApp();

  // Find the selected blog, defaulting to Blog 9 or fallback
  const currentBlog = BLOGS_DATA.find((b) => b.id === viewingBlog) || BLOGS_DATA[8] || BLOGS_DATA[7];

  return (
    <div className="blog-page">
      {/* Blog Hero Banner - Original Full Width Top Frame */}
      <div className="blog-banner-hero-wrapper">
        <div className="blog-banner-frame">
          <img
            src={currentBlog.image}
            alt={currentBlog.title}
            className="blog-banner-img"
          />
        </div>
      </div>

      {/* Main Blog Content Container */}
      <main className="blog-content-wrapper">
        <div className="blog-container">
          {currentBlog.type === 'india-yoga-capital' || currentBlog.id === 'sacred-breath-world-india-capital-yoga' ? (
            <Blog9 blog={currentBlog} />
          ) : currentBlog.type === 'nourishment-fitness' || currentBlog.id === 'nourishment-movement-complete-fitness-yoga' ? (
            <Blog8 blog={currentBlog} />
          ) : currentBlog.type === 'parental-mental-health' || currentBlog.id === 'parental-mental-health-matters-yho' ? (
            <Blog7 blog={currentBlog} />
          ) : currentBlog.type === 'diabetes-yoga' || currentBlog.id === 'reclaiming-health-diabetes-surge-yoga' ? (
            <Blog6 blog={currentBlog} />
          ) : currentBlog.type === 'soil-preservation' || currentBlog.id === 'sustainable-soil-management-global-peace' ? (
            <Blog5 blog={currentBlog} />
          ) : currentBlog.type === 'pcos-pmos' || currentBlog.id === 'pcos-is-now-pmos-polyendocrine-metabolic-ovarian-syndrome' ? (
            <Blog4 blog={currentBlog} />
          ) : currentBlog.type === 'youth-substance' || currentBlog.id === 'youth-substance-abuse-silent-epidemic' ? (
            <Blog3 blog={currentBlog} />
          ) : currentBlog.type === 'climate-change' || currentBlog.id === 'climate-change-collective-action' ? (
            <Blog2 blog={currentBlog} />
          ) : (
            <Blog1 blog={currentBlog} />
          )}
        </div>
      </main>
    </div>
  );
}
