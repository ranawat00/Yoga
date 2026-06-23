import './Books.css';
import React from 'react';
import { useApp } from '../../context/AppContext';
import bookQuickEasyImg from '../../assets/book_quick_easy.png';
import bookCombo4Img from '../../assets/book_combo_4.png';
import bookCombo3Img from '../../assets/book_combo_3.png';
import bookSatvic1Img from '../../assets/book_satvic_1.png';

export const BOOKS_PREVIEW = [
  {
    id: 'book-quick-easy',
    title: 'Quick & Easy Food Book',
    rating: 4.9,
    reviews: 840,
    price: 590,
    formats: ['Hardcover'],
    badge: 'Best Seller',
    description: '70+ Satvic recipes that you can prepare in under 30 minutes. Perfect for busy lives!',
    image: bookQuickEasyImg
  },
  {
    id: 'book-combo-4',
    title: 'Combo Pack of 4',
    rating: 5.0,
    reviews: 1420,
    price: 1490,
    formats: ['Hardcover'],
    badge: 'Best Value',
    description: 'Get the complete collection of all 4 Satvic books at an unbeatable price.',
    image: bookCombo4Img
  },
  {
    id: 'book-combo-3',
    title: 'Combo Pack of 3',
    rating: 5.0,
    reviews: 930,
    price: 1190,
    formats: ['Hardcover'],
    badge: 'Pack of 3',
    description: 'A curated bundle of 3 essential books for your daily wellness and recipes journey.',
    image: bookCombo3Img
  },
  {
    id: 'book-satvic-1',
    title: 'Satvic Food Book 1',
    rating: 4.8,
    reviews: 3100,
    price: 490,
    formats: ['Hardcover', 'eBook'],
    description: '45 healing recipes and the complete guide to the Satvic lifestyle to reverse chronic diseases.',
    image: bookSatvic1Img
  }
];

export default function Books() {
  const { setView } = useApp();

  const renderStars = (rating) => {
    const stars = [];
    const floor = Math.floor(rating);
    for (let i = 1; i <= 5; i++) {
      if (i <= floor) {
        stars.push(<span key={i}>★</span>);
      } else if (i - 0.5 === rating) {
        stars.push(<span key={i} style={{ position: 'relative', display: 'inline-block' }}><span style={{ color: 'var(--color-text-muted)' }}>★</span><span style={{ position: 'absolute', top: 0, left: 0, width: '50%', overflow: 'hidden', color: '#F59E0B' }}>★</span></span>);
      } else {
        stars.push(<span key={i} style={{ color: 'var(--color-text-muted)' }}>★</span>);
      }
    }
    return stars;
  };

  return (
    <section id="books" className="books-section">
      <div className="section-container">
        <h2 className="section-title">Books</h2>
        <p className="section-subtitle">From deep philosophy to delicious recipes</p>

        <div className="books-grid">
          {BOOKS_PREVIEW.map((book) => (
            <div key={book.id} className="book-card">
              <div className="book-image-container">
                {book.badge && <span className="book-badge">{book.badge}</span>}
                <img src={book.image} alt={book.title} className="book-img" />
              </div>
              <div className="book-details">
                <h3 className="book-title">{book.title}</h3>
                
                <div className="book-formats">
                  {book.formats.map((f, i) => (
                    <span key={i} className="book-format-tag">{f}</span>
                  ))}
                </div>

                <div className="book-rating">
                  {renderStars(book.rating)}
                  <span className="book-reviews">({book.reviews} reviews)</span>
                </div>

                <p className="book-desc">{book.description}</p>

                <div className="book-price-action">
                  <span className="book-price">₹{book.price}</span>
                  <button className="btn btn-green-outline" onClick={() => setView('books')}>
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="view-more-container">
          <button className="btn btn-view-more" onClick={() => {
            setView('books');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}>
            <span>View More Books</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
