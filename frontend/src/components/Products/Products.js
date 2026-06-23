import './Products.css';
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
    image: enemaImg,
    icon: (
      <svg viewBox="0 0 100 100">
        <path d="M50 15 C35 15, 30 35, 30 55 C30 75, 40 85, 50 85 C60 85, 70 75, 70 55 C70 35, 65 15, 50 15 Z" fill="none" stroke="currentColor" strokeWidth="4" />
        <path d="M50 85 L50 95 L40 95" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
        <line x1="50" y1="15" x2="50" y2="5" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
        <circle cx="50" cy="55" r="10" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="3 3"/>
      </svg>
    )
  },
  {
    id: 'sprout-kit',
    title: 'Sprouted Moong Sprouting Kit',
    price: 189,
    rating: 4.9,
    reviews: 820,
    description: 'High-grade organic moong seeds paired with an authentic terracotta sprouting pot to maintain ideal moisture and vital enzyme levels.',
    image: sproutImg,
    icon: (
      <svg viewBox="0 0 100 100">
        <path d="M20 75 C20 50, 80 50, 80 75 Z" fill="none" stroke="currentColor" strokeWidth="4"/>
        <line x1="15" y1="75" x2="85" y2="75" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
        <path d="M40 50 C40 30, 48 35, 48 25 C48 35, 45 42, 45 48" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        <path d="M60 52 C60 35, 66 38, 66 28 C66 38, 64 45, 64 50" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        <path d="M48 25 C50 21, 55 21, 54 25 C52 28, 49 28, 48 25 Z" fill="currentColor"/>
        <path d="M66 28 C68 24, 73 24, 72 28 C70 31, 67 31, 66 28 Z" fill="currentColor"/>
      </svg>
    )
  },
  {
    id: 'neem-comb',
    title: 'Handcrafted Neem Wood Comb',
    price: 149,
    rating: 4.7,
    reviews: 540,
    description: 'Pure, organic neem wood comb for regular scalp massaging. Improves blood circulation and acts as a natural antibacterial barrier for hair roots.',
    image: neemCombImg,
    icon: (
      <svg viewBox="0 0 100 100">
        <rect x="20" y="25" width="60" height="50" rx="6" fill="none" stroke="currentColor" strokeWidth="4"/>
        <line x1="20" y1="45" x2="80" y2="45" stroke="currentColor" strokeWidth="4"/>
        <line x1="26" y1="45" x2="26" y2="70" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        <line x1="32" y1="45" x2="32" y2="70" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        <line x1="38" y1="45" x2="38" y2="70" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        <line x1="44" y1="45" x2="44" y2="70" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        <line x1="50" y1="45" x2="50" y2="70" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        <line x1="56" y1="45" x2="56" y2="70" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        <line x1="62" y1="45" x2="62" y2="70" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        <line x1="68" y1="45" x2="68" y2="70" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        <line x1="74" y1="45" x2="74" y2="70" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    id: 'copper-bottle',
    title: 'Holistic Copper Water Bottle',
    price: 699,
    rating: 4.8,
    reviews: 2100,
    description: '100% heavy-gauge copper water bottle. Store water overnight to charge it with positive alkaline ions that balance physical acidity.',
    image: copperBottleImg,
    icon: (
      <svg viewBox="0 0 100 100">
        <rect x="35" y="30" width="30" height="55" rx="8" fill="none" stroke="currentColor" strokeWidth="4"/>
        <rect x="42" y="15" width="16" height="15" fill="none" stroke="currentColor" strokeWidth="4"/>
        <line x1="35" y1="42" x2="65" y2="42" stroke="currentColor" strokeWidth="3"/>
        <line x1="35" y1="68" x2="65" y2="68" stroke="currentColor" strokeWidth="3"/>
      </svg>
    )
  },
  {
    id: 'herbal-tea',
    title: 'Detox Herbal Tea Infusion',
    price: 249,
    rating: 4.6,
    reviews: 410,
    description: 'Dry blend of natural lemongrass, dry ginger, mint, and Rama Tulsi leaves. 100% caffeine-free, full of soothing antioxidants.',
    image: teaImg,
    icon: (
      <svg viewBox="0 0 100 100">
        <path d="M30 40 C30 70, 70 70, 70 40 Z" fill="none" stroke="currentColor" strokeWidth="4"/>
        <path d="M70 45 C80 45, 85 50, 85 55 C85 60, 80 65, 70 65" fill="none" stroke="currentColor" strokeWidth="4"/>
        <line x1="20" y1="75" x2="80" y2="75" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
        <path d="M42 35 C42 25, 45 28, 48 20 C45 28, 46 32, 45 35" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M52 35 C52 23, 56 26, 58 18 C55 26, 57 32, 55 35" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
  }
];

export default function Products() {
  const { handleAddToCart, setView } = useApp();
  const renderStars = (rating) => {
    const stars = [];
    const floor = Math.floor(rating);
    for (let i = 1; i <= 5; i++) {
      if (i <= floor) {
        stars.push(
          <span key={i} style={{ color: '#F59E0B' }}>★</span>
        );
      } else {
        stars.push(
          <span key={i} style={{ color: '#D1D5DB' }}>★</span>
        );
      }
    }
    return stars;
  };

  return (
    <section id="products" className="products">
      <div className="section-container">
        <h2 className="section-title">Yoga Healers Organic Shop</h2>
        <p className="section-subtitle">
          Pure, organic materials and tools curated by our health experts to support your daily detoxification and yoga practices.
        </p>

        <div className="products-grid">
          {PRODUCTS_DATA.slice(0, 4).map((p) => (
            <div key={p.id} className="product-card">
              <div className="product-image-container">
                {p.image ? (
                  <img src={p.image} alt={p.title} className="product-img" />
                ) : (
                  p.icon
                )}
              </div>
              
              <div className="product-details">
                <h3 className="product-title">{p.title}</h3>
                
                <div className="product-rating">
                  {renderStars(p.rating)}
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginLeft: '0.3rem' }}>
                    ({p.reviews} reviews)
                  </span>
                </div>

                <p className="product-description">{p.description}</p>
                
                <div className="product-price-action">
                  <span className="product-price">₹{p.price}</span>
                  <button 
                    className="btn btn-cart" 
                    onClick={() => handleAddToCart(p)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="view-more-container">
          <button className="btn btn-view-more" onClick={() => {
            setView('products');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}>
            <span>View More Products</span>
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
