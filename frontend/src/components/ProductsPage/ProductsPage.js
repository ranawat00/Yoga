import './ProductsPage.css';
import React from 'react';
import { useApp } from '../../context/AppContext';
import enemaImg from '../../assets/product_enema.png';
import sproutImg from '../../assets/product_sprout.png';
import neemCombImg from '../../assets/product_neem_comb.png';
import copperBottleImg from '../../assets/product_copper_bottle.png';
import teaImg from '../../assets/product_tea.png';

const PRODUCTS_DATA = [
  {
    id: 'enema-kit',
    title: 'Premium Organic Enema Kit',
    price: 399,
    rating: 4.8,
    reviews: 1240,
    description: 'Medical-grade, BPA-free silicone container with soft tips. Essential for colon cleansing and physical detoxification as per ancient yoga routines.',
    image: enemaImg
  },
  {
    id: 'sprout-kit',
    title: 'Sprouted Moong Sprouting Kit',
    price: 189,
    rating: 4.9,
    reviews: 820,
    description: 'High-grade organic moong seeds paired with an authentic terracotta sprouting pot to maintain ideal moisture and vital enzyme levels.',
    image: sproutImg
  },
  {
    id: 'neem-comb',
    title: 'Handcrafted Neem Wood Comb',
    price: 149,
    rating: 4.7,
    reviews: 540,
    description: 'Pure, organic neem wood comb for regular scalp massaging. Improves blood circulation and acts as a natural antibacterial barrier for hair roots.',
    image: neemCombImg
  },
  {
    id: 'copper-bottle',
    title: 'Holistic Copper Water Bottle',
    price: 699,
    rating: 4.8,
    reviews: 2100,
    description: '100% heavy-gauge copper water bottle. Store water overnight to charge it with positive alkaline ions that balance physical acidity.',
    image: copperBottleImg
  },
  {
    id: 'herbal-tea',
    title: 'Detox Herbal Tea Infusion',
    price: 249,
    rating: 4.6,
    reviews: 410,
    description: 'Dry blend of natural lemongrass, dry ginger, mint, and Rama Tulsi leaves. 100% caffeine-free, full of soothing antioxidants.',
    image: teaImg
  }
];

export default function ProductsPage() {
  const { setView, handleAddToCart } = useApp();

  const renderStars = (rating) => {
    const stars = [];
    const floor = Math.floor(rating);
    for (let i = 1; i <= 5; i++) {
      if (i <= floor) {
        stars.push(<span key={i}>★</span>);
      } else {
        stars.push(<span key={i} style={{ color: '#D1D5DB' }}>★</span>);
      }
    }
    return stars;
  };

  return (
    <div className="products-page">
      <div className="products-page-header">
        <div className="products-page-header-container">
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
          <h1>Yoga Healers Organic Shop</h1>
          <p>Pure, organic materials and tools curated by our health experts to support your daily detoxification and yoga practices.</p>
        </div>
      </div>

      <div className="products-page-body">
        <div className="section-container">
          <div className="products-page-grid">
            {PRODUCTS_DATA.map((p) => (
              <div key={p.id} className="product-page-card">
                <div className="product-page-img-container">
                  <img src={p.image} alt={p.title} className="product-page-img" />
                </div>

                <div className="product-page-info">
                  <h2 className="product-page-title">{p.title}</h2>
                  
                  <div className="product-page-rating">
                    {renderStars(p.rating)}
                    <span className="product-page-reviews">({p.reviews} reviews)</span>
                  </div>

                  <p className="product-page-desc">{p.description}</p>

                  <div className="product-page-price-action">
                    <div className="price-display">
                      <span className="price-label">Price:</span>
                      <span className="price-amt">₹{p.price}</span>
                    </div>
                    
                    <button className="btn btn-blue" onClick={() => handleAddToCart(p)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
