import './Navbar.css';
import React, { useState, useEffect } from 'react';
import Logo from '../Logo/Logo';
import { useApp } from '../../context/AppContext';
import detoxImg from '../../assets/workshop_detox.webp';
import meditationImg from '../../assets/workshop_meditation.webp';
import cookingImg from '../../assets/workshop_cooking.webp';
import bookQuickEasyImg from '../../assets/book_quick_easy.webp';
import bookCombo4Img from '../../assets/book_combo_4.webp';
import bookCombo3Img from '../../assets/book_combo_3.webp';
import bookSatvic1Img from '../../assets/book_satvic_1.webp';
import enemaImg from '../../assets/product_enema.webp';
import sproutImg from '../../assets/product_sprout.webp';
import neemCombImg from '../../assets/product_neem_comb.webp';
import copperBottleImg from '../../assets/product_copper_bottle.webp';

export default function Navbar() {
  const { totalCartCount, setIsCartOpen, setView, user, setIsAuthOpen, handleLogout, setIsProfileOpen } = useApp();
  const [activeLink, setActiveLink] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'workshops', 'products', 'health-score', 'verticals', 'success-stories', 'educators', 'faq'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveLink(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id, e) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (id === 'books') {
      setView('books');
      setActiveLink('books');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (id === 'products') {
      setView('products');
      setActiveLink('products');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (id === 'about') {
      setView('about');
      setActiveLink('about');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (id === 'contact') {
      setView('contact');
      setActiveLink('contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (id === 'careers') {
      setView('careers');
      setActiveLink('careers');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (id === 'workshops') {
      setView('workshops');
      setActiveLink('workshops');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (id === 'health-score') {
      setView('health-score');
      setActiveLink('health-score');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setView('home');
    setActiveLink(id);

    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleDropdownClick = (sectionId, itemId, e) => {
    e.preventDefault();
    e.stopPropagation();

    if (sectionId === 'books') {
      setView('books');
      setActiveLink('books');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (sectionId === 'workshops') {
      setView('workshops');
      setActiveLink('workshops');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setView('home');
    setActiveLink(sectionId);

    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const renderChevron = () => (
    <svg className="nav-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: '6px', transition: 'transform 0.2s', display: 'inline-block', verticalAlign: 'middle' }}>
      <path d="M1 1L5 5L9 1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo Section */}
        <div className="logo-container" onClick={(e) => handleLinkClick('home', e)}>
          <Logo size={52} />
        </div>

        {/* Desktop Navigation Links */}
        <ul className="nav-links">
          <li>
            <a href="#home" className={activeLink === 'home' ? 'active' : ''} onClick={(e) => handleLinkClick('home', e)}>
              Home
            </a>
          </li>
          <li>
            <a href="#about" className={activeLink === 'about' ? 'active' : ''} onClick={(e) => handleLinkClick('about', e)}>
              About Us
            </a>
          </li>
          <li className="has-dropdown">
            <a href="#workshops" className={activeLink === 'workshops' ? 'active' : ''} onClick={(e) => handleLinkClick('workshops', e)}>
              Workshops {renderChevron()}
            </a>
            <div className="nav-dropdown workshops-mega">
              <div className="mega-dropdown-card" onClick={(e) => handleDropdownClick('workshops', 'detox-21', e)}>
                <div className="mega-card-img-wrapper">
                  <img loading="lazy" src={detoxImg} alt="Heal Yourself Challenge" className="mega-card-img" />
                </div>
                <div className="mega-card-body">
                  <span className="mega-card-title">Heal Yourself Challenge</span>
                  <span className="mega-card-desc">7 Days • 15th Jun • ₹990</span>
                </div>
              </div>
              <div className="mega-dropdown-card" onClick={(e) => handleDropdownClick('workshops', 'mind-7', e)}>
                <div className="mega-card-img-wrapper">
                  <img loading="lazy" src={meditationImg} alt="Yoga Sadhana Beginner" className="mega-card-img" />
                </div>
                <div className="mega-card-body">
                  <span className="mega-card-title">Yoga Sadhana Beginner</span>
                  <span className="mega-card-desc">21 Days • 22nd Jun • ₹590</span>
                </div>
              </div>
              <div className="mega-dropdown-card" onClick={(e) => handleDropdownClick('workshops', 'cook-3', e)}>
                <div className="mega-card-img-wrapper">
                  <img loading="lazy" src={cookingImg} alt="Cooking Masterclass" className="mega-card-img" />
                </div>
                <div className="mega-card-body">
                  <span className="mega-card-title">Cooking Masterclass</span>
                  <span className="mega-card-desc">3 Days • 5th Jul • ₹490</span>
                </div>
              </div>
            </div>
          </li>
          <li className="has-dropdown">
            <a href="#books" className={activeLink === 'books' ? 'active' : ''} onClick={(e) => handleLinkClick('books', e)}>
              Books {renderChevron()}
            </a>
            <div className="nav-dropdown books-mega">
              <div className="mega-dropdown-card" onClick={(e) => handleDropdownClick('books', 'book-quick-easy', e)}>
                <div className="mega-card-img-wrapper">
                  <img loading="lazy" src={bookQuickEasyImg} alt="Quick & Easy Food Book" className="mega-card-img" />
                </div>
                <div className="mega-card-body">
                  <span className="mega-card-title">Quick & Easy Food Book</span>
                  <span className="mega-card-desc">70+ Satvic recipes in 30 mins • ₹590</span>
                </div>
              </div>
              <div className="mega-dropdown-card" onClick={(e) => handleDropdownClick('books', 'book-combo-4', e)}>
                <div className="mega-card-img-wrapper">
                  <img loading="lazy" src={bookCombo4Img} alt="Combo Pack of 4" className="mega-card-img" />
                </div>
                <div className="mega-card-body">
                  <span className="mega-card-title">Combo Pack of 4</span>
                  <span className="mega-card-desc">Complete Satvic book set • ₹1490</span>
                </div>
              </div>
              <div className="mega-dropdown-card" onClick={(e) => handleDropdownClick('books', 'book-combo-3', e)}>
                <div className="mega-card-img-wrapper">
                  <img loading="lazy" src={bookCombo3Img} alt="Combo Pack of 3" className="mega-card-img" />
                </div>
                <div className="mega-card-body">
                  <span className="mega-card-title">Combo Pack of 3</span>
                  <span className="mega-card-desc">Curated bundle of 3 books • ₹1190</span>
                </div>
              </div>
              <div className="mega-dropdown-card" onClick={(e) => handleDropdownClick('books', 'book-satvic-1', e)}>
                <div className="mega-card-img-wrapper">
                  <img loading="lazy" src={bookSatvic1Img} alt="Satvic Food Book 1" className="mega-card-img" />
                </div>
                <div className="mega-card-body">
                  <span className="mega-card-title">Satvic Food Book 1</span>
                  <span className="mega-card-desc">45 healing recipes & guide • ₹490</span>
                </div>
              </div>
            </div>
          </li>
          <li className="has-dropdown">
            <a href="#products" className={activeLink === 'products' ? 'active' : ''} onClick={(e) => handleLinkClick('products', e)}>
              Shop {renderChevron()}
            </a>
            <div className="nav-dropdown products-mega">
              <div className="mega-dropdown-card" onClick={(e) => handleDropdownClick('products', 'enema-kit', e)}>
                <div className="mega-card-img-wrapper">
                  <img loading="lazy" src={enemaImg} alt="Premium Organic Enema Kit" className="mega-card-img" />
                </div>
                <div className="mega-card-body">
                  <span className="mega-card-title">Organic Enema Kit</span>
                  <span className="mega-card-desc">BPA-free silicone • ₹399</span>
                </div>
              </div>
              <div className="mega-dropdown-card" onClick={(e) => handleDropdownClick('products', 'sprout-kit', e)}>
                <div className="mega-card-img-wrapper">
                  <img loading="lazy" src={sproutImg} alt="Sprouted Moong Sprouting Kit" className="mega-card-img" />
                </div>
                <div className="mega-card-body">
                  <span className="mega-card-title">Terracotta Sprouting Kit</span>
                  <span className="mega-card-desc">Organic moong pot • ₹189</span>
                </div>
              </div>
              <div className="mega-dropdown-card" onClick={(e) => handleDropdownClick('products', 'neem-comb', e)}>
                <div className="mega-card-img-wrapper">
                  <img loading="lazy" src={neemCombImg} alt="Handcrafted Neem Wood Comb" className="mega-card-img" />
                </div>
                <div className="mega-card-body">
                  <span className="mega-card-title">Neem Wood Comb</span>
                  <span className="mega-card-desc">Handcrafted neem comb • ₹149</span>
                </div>
              </div>
              <div className="mega-dropdown-card" onClick={(e) => handleDropdownClick('products', 'copper-bottle', e)}>
                <div className="mega-card-img-wrapper">
                  <img loading="lazy" src={copperBottleImg} alt="Holistic Copper Water Bottle" className="mega-card-img" />
                </div>
                <div className="mega-card-body">
                  <span className="mega-card-title">Copper Water Bottle</span>
                  <span className="mega-card-desc">Pure alkaline charger • ₹699</span>
                </div>
              </div>
            </div>
          </li>
          <li>
            <a href="#health-score" className={activeLink === 'health-score' ? 'active' : ''} onClick={(e) => handleLinkClick('health-score', e)}>
              Health Score
            </a>
          </li>
          <li>
            <a href="#careers" className={activeLink === 'careers' ? 'active' : ''} onClick={(e) => handleLinkClick('careers', e)}>
              Careers
            </a>
          </li>
        </ul>

        {/* Right Side Actions */}
        <div className="nav-actions">
          {/* Cart Drawer Trigger */}
          <button className="cart-icon-btn" onClick={() => setIsCartOpen(true)} aria-label="Open Shopping Cart">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {totalCartCount > 0 && <span className="cart-badge">{totalCartCount}</span>}
          </button>

          {/* User Profile / Auth Trigger */}
          <div className="user-profile-container" style={{ position: 'relative' }}>
            {user ? (
              <div className="profile-wrapper">
                <button className="profile-btn" onClick={() => setIsProfileOpen(true)} aria-label="User Profile">
                  <span className="profile-name-bubble">{user.name.charAt(0).toUpperCase()}</span>
                </button>
              </div>
            ) : (
              <button className="auth-trigger-btn" onClick={() => setIsAuthOpen(true)} aria-label="Sign In">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </button>
            )}
          </div>

          {/* Contact Us Pill Button */}
          <button className="contact-btn" onClick={(e) => handleLinkClick('contact', e)}>
            Contact Us
          </button>

          {/* Mobile Menu Icon */}
          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(true)} aria-label="Open Menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay Background */}
      {mobileMenuOpen && <div className="mobile-drawer-backdrop" onClick={() => setMobileMenuOpen(false)}></div>}

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <div className="mobile-drawer-header">
            {/* Logo */}
            <div className="mobile-drawer-logo" onClick={(e) => handleLinkClick('home', e)}>
              <Logo size={45} />
            </div>
            {/* Close button */}
            <button className="mobile-drawer-close" onClick={() => setMobileMenuOpen(false)} aria-label="Close Menu">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Drawer Menu Items */}
          <ul className="mobile-drawer-links">
            <li>
              <a href="#home" className={activeLink === 'home' ? 'active-pill' : ''} onClick={(e) => handleLinkClick('home', e)}>
                Home
              </a>
            </li>
            <li>
              <a href="#about" className={activeLink === 'about' ? 'active-pill' : ''} onClick={(e) => handleLinkClick('about', e)}>
                About Us
              </a>
            </li>
            <li>
              <a href="#workshops" className={activeLink === 'workshops' ? 'active-pill' : ''} onClick={(e) => handleLinkClick('workshops', e)}>
                Workshops
              </a>
            </li>
            <li>
              <a href="#books" className={activeLink === 'books' ? 'active-pill' : ''} onClick={(e) => handleLinkClick('books', e)}>
                Books
              </a>
            </li>
            <li>
              <a href="#products" className={activeLink === 'products' ? 'active-pill' : ''} onClick={(e) => handleLinkClick('products', e)}>
                Shop
              </a>
            </li>
            <li>
              <a href="#health-score" onClick={(e) => handleLinkClick('health-score', e)}>
                Health Score
              </a>
            </li>
            <li>
              <a href="#careers" className={activeLink === 'careers' ? 'active-pill' : ''} onClick={(e) => handleLinkClick('careers', e)}>
                Careers
              </a>
            </li>
            <li>
              <a href="#contact" className={activeLink === 'contact' ? 'active-pill' : ''} onClick={(e) => handleLinkClick('contact', e)}>
                Contact Us
              </a>
            </li>
            <li className="mobile-drawer-divider"></li>
            {user ? (
              <>
                <li>
                  <a href="#profile" onClick={(e) => { e.preventDefault(); setIsProfileOpen(true); setMobileMenuOpen(false); }}>
                    My Profile
                  </a>
                </li>
                <li>
                  <a href="#logout" onClick={(e) => { e.preventDefault(); handleLogout(); setMobileMenuOpen(false); }}>
                    Log Out
                  </a>
                </li>
              </>
            ) : (
              <li>
                <a href="#login" onClick={(e) => { e.preventDefault(); setIsAuthOpen(true); setMobileMenuOpen(false); }}>
                  Log In / Sign Up
                </a>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
