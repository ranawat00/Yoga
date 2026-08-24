import './Navbar.css';
import React, { useState, useEffect } from 'react';
import Logo from '../../common/Logo/Logo';
import { useApp } from '../../hooks/useApp';
import { WORKSHOPS_DATA } from '../../components/Workshops/Workshops';

export default function Navbar() {
  const { setView, user, handleLogout, setIsProfileOpen, view, setViewingWorkshop } = useApp();
  const [activeLink, setActiveLink] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);


  useEffect(() => {
    setActiveLink(view);
  }, [view]);

  useEffect(() => {
    const handleScroll = () => {
      if (view !== 'home') return;
      const sections = ['home', 'workshops', 'health-score', 'educators', 'faq'];
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

      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [view]);

  const handleLinkClick = (id, e) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (id !== 'workshops') {
      setViewingWorkshop(null);
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

    if (id === 'internship' || id === 'careers') {
      setView('internship');
      setActiveLink('internship');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (id === 'workshops') {
      setViewingWorkshop(null);
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

    if (id === 'blog') {
      setView('blog');
      setActiveLink('blog');
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

    if (sectionId !== 'workshops') {
      setViewingWorkshop(null);
    }

    if (sectionId === 'workshops') {
      const selected = WORKSHOPS_DATA.find(w => w.id === itemId);
      setViewingWorkshop(selected || null);
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
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${view !== 'home' ? 'not-home' : ''}`}>
      <div className="navbar-container">
        {/* Logo Section */}
        <div className="logo-container" onClick={(e) => handleLinkClick('home', e)}>
          <Logo size={80} />
        </div>

        {/* Desktop Navigation Links */}
        <ul className="nav-links">
          <li>
            <a href="/" className={activeLink === 'home' ? 'active' : ''} onClick={(e) => handleLinkClick('home', e)}>
              Home
            </a>
          </li>
          <li>
            <a href="/about" className={activeLink === 'about' ? 'active' : ''} onClick={(e) => handleLinkClick('about', e)}>
              About Us
            </a>
          </li>
          <li className="has-dropdown">
            <a href="/workshops" className={activeLink === 'workshops' ? 'active' : ''} onClick={(e) => handleLinkClick('workshops', e)}>
              Workshops {renderChevron()}
            </a>
            <div className="nav-dropdown workshops-mega">
              {WORKSHOPS_DATA.map((w) => (
                <div key={w.id} className="mega-dropdown-card" onClick={(e) => handleDropdownClick('workshops', w.id, e)}>
                  <div className="mega-card-img-wrapper">
                    <img loading="lazy" src={w.image} alt={w.title} className="mega-card-img" />
                  </div>
                  <div className="mega-card-body">
                    <span className="mega-card-title">{w.title}</span>
                    <span className="mega-card-desc">{w.duration} • {w.date} • ${w.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </li>
          <li>
            <a href="/internship" className={(activeLink === 'internship' || activeLink === 'careers') ? 'active' : ''} onClick={(e) => handleLinkClick('internship', e)}>
              Internship
            </a>
          </li>
          <li>
            <a href="/blog" className={activeLink === 'blog' ? 'active' : ''} onClick={(e) => handleLinkClick('blog', e)}>
              Blog
            </a>
          </li>
        </ul>

        {/* Right Side Actions */}
        <div className="nav-actions">
          {/* User Profile / Auth Trigger */}
          <div className="user-profile-container" style={{ position: 'relative' }}>
            {user ? (
              <div className="profile-wrapper">
                <button className="profile-btn" onClick={() => setIsProfileOpen(true)} aria-label="User Profile">
                  <span className="profile-name-bubble">{user.name.charAt(0).toUpperCase()}</span>
                </button>
              </div>
            ) : (
              <button className="auth-trigger-btn" onClick={() => setIsProfileOpen(true)} aria-label="Sign In">
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
              <Logo size={58} />
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
              <a href="/" className={activeLink === 'home' ? 'active-pill' : ''} onClick={(e) => handleLinkClick('home', e)}>
                Home
              </a>
            </li>
            <li>
              <a href="/about" className={activeLink === 'about' ? 'active-pill' : ''} onClick={(e) => handleLinkClick('about', e)}>
                About Us
              </a>
            </li>
            <li>
              <a href="/workshops" className={activeLink === 'workshops' ? 'active-pill' : ''} onClick={(e) => handleLinkClick('workshops', e)}>
                Workshops
              </a>
            </li>
            <li>
              <a href="/internship" className={(activeLink === 'internship' || activeLink === 'careers') ? 'active-pill' : ''} onClick={(e) => handleLinkClick('internship', e)}>
                Internship
              </a>
            </li>
            <li>
              <a href="/blog" className={activeLink === 'blog' ? 'active-pill' : ''} onClick={(e) => handleLinkClick('blog', e)}>
                Blog
              </a>
            </li>
            <li>
              <a href="/contact" className={activeLink === 'contact' ? 'active-pill' : ''} onClick={(e) => handleLinkClick('contact', e)}>
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
                <a href="#login" onClick={(e) => { e.preventDefault(); setIsProfileOpen(true); setMobileMenuOpen(false); }}>
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
