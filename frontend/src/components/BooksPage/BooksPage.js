import './BooksPage.css';
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import bookQuickEasyImg from '../../assets/book_quick_easy.png';
import bookCombo4Img from '../../assets/book_combo_4.png';
import bookCombo3Img from '../../assets/book_combo_3.png';
import bookSatvic1Img from '../../assets/book_satvic_1.png';
import bookSatvic2Img from '../../assets/book_satvic_2.png';

const ALL_BOOKS = [
  {
    id: 'book-quick-easy',
    title: 'Quick & Easy Food Book',
    rating: 4.9,
    reviews: 840,
    priceHardcover: 590,
    priceEbook: null,
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
    priceHardcover: 1490,
    priceEbook: null,
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
    priceHardcover: 1190,
    priceEbook: null,
    formats: ['Hardcover'],
    badge: 'Pack of 3',
    description: 'A curated bundle of 3 essential books for your daily wellness and recipes journey.',
    image: bookCombo3Img
  },
  {
    id: 'book-combo-2',
    title: 'Combo Pack of 2',
    rating: 4.9,
    reviews: 580,
    priceHardcover: 890,
    priceEbook: null,
    formats: ['Hardcover'],
    badge: 'Pack of 2',
    description: 'Includes Satvic Food Book 1 & 2. The perfect starting set for healing.',
    image: bookCombo3Img // fallback using combo 3
  },
  {
    id: 'book-satvic-1',
    title: 'Satvic Food Book 1',
    rating: 4.8,
    reviews: 3100,
    priceHardcover: 490,
    priceEbook: 290,
    formats: ['Hardcover', 'eBook'],
    description: '45 healing recipes and the complete guide to the Satvic lifestyle to reverse chronic diseases.',
    image: bookSatvic1Img
  },
  {
    id: 'book-satvic-2',
    title: 'Satvic Food Book 2',
    rating: 4.9,
    reviews: 1850,
    priceHardcover: 490,
    priceEbook: 290,
    formats: ['Hardcover', 'eBook'],
    description: '70 new delicious recipes including healing soups, salads, and main courses.',
    image: bookSatvic2Img
  }
];

export default function BooksPage() {
  const { setView, handleAddToCart } = useApp();
  // State to track selected formats for each book
  const [selectedFormats, setSelectedFormats] = useState(
    ALL_BOOKS.reduce((acc, book) => {
      acc[book.id] = book.formats[0]; // default to first format
      return acc;
    }, {})
  );

  const handleFormatChange = (bookId, format) => {
    setSelectedFormats((prev) => ({
      ...prev,
      [bookId]: format
    }));
  };

  const onAddBookToCart = (book) => {
    const format = selectedFormats[book.id];
    const price = format === 'eBook' ? book.priceEbook : book.priceHardcover;
    
    // Construct cart item
    const cartItem = {
      id: `${book.id}-${format.toLowerCase()}`,
      title: `${book.title} (${format})`,
      price: price,
      image: book.image
    };

    handleAddToCart(cartItem);
  };

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
    <div className="books-page">
      <div className="books-page-header">
        <div className="books-page-header-container">
          <button className="back-btn" onClick={() => {
            setView('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Home
          </button>
          <h1>Yoga Healers Bookstore</h1>
          <p>Guidebooks, combos, and recipe manuals to help you transition into a natural, healing lifestyle.</p>
        </div>
      </div>

      <div className="books-page-body">
        <div className="section-container">
          <div className="books-page-grid">
            {ALL_BOOKS.map((book) => {
              const currentFormat = selectedFormats[book.id];
              const currentPrice = currentFormat === 'eBook' ? book.priceEbook : book.priceHardcover;
              
              return (
                <div key={book.id} className="book-page-card">
                  <div className="book-page-img-container">
                    {book.badge && <span className="book-page-badge">{book.badge}</span>}
                    <img src={book.image} alt={book.title} className="book-page-img" />
                  </div>

                  <div className="book-page-info">
                    <h2 className="book-page-title">{book.title}</h2>
                    
                    <div className="book-page-rating">
                      {renderStars(book.rating)}
                      <span className="book-page-reviews">({book.reviews} reviews)</span>
                    </div>

                    <p className="book-page-desc">{book.description}</p>

                    {/* Format Selector */}
                    {book.formats.length > 1 && (
                      <div className="format-selector">
                        <span className="format-label">Select Format:</span>
                        <div className="format-options">
                          {book.formats.map((f) => (
                            <button
                              key={f}
                              type="button"
                              className={`format-opt-btn ${currentFormat === f ? 'active' : ''}`}
                              onClick={() => handleFormatChange(book.id, f)}
                            >
                              {f}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="book-page-price-action">
                      <div className="price-display">
                        <span className="price-label">Price:</span>
                        <span className="price-amt">₹{currentPrice}</span>
                      </div>
                      
                      <button className="btn btn-green" onClick={() => onAddBookToCart(book)}>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
