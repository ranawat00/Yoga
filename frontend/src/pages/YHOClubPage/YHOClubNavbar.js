import React, { useState } from 'react';
import './YHOClubNavbar.css';
import { useApp } from '../../hooks/useApp';

export default function YHOClubNavbar() {
  const { user, handleLogout, setView, setIsRegisterModalOpen } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const studentId = user
    ? (user.studentId || ('YHO-' + (user._id || '2026').slice(-6).toUpperCase()))
    : '';

  const onLogout = async () => {
    await handleLogout();
    setMobileMenuOpen(false);
    // After logout, stay on yho-club (will show auth screen since user = null)
    setView('yho-club');
  };

  return (
    <>
      <nav className="yhon-bar">
        <div className="yhon-inner">

          {/* LEFT: Brand */}
          <div className="yhon-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="yhon-logo-box">
              <span className="yhon-logo-yh">YH</span>
            </div>
            <div className="yhon-brand-text">
              <div className="yhon-brand-title">
                <span>YH🎯 CLUB</span>
              </div>
              <span className="yhon-brand-sub">STUDENT PORTAL</span>
            </div>
          </div>

          {/* CENTER: Nav links (desktop) */}
          <ul className="yhon-links">
            <li>
              <span className="yhon-link yhon-link--active" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                Home
              </span>
            </li>
            <li>
              <span className="yhon-link" onClick={() => setIsRegisterModalOpen && setIsRegisterModalOpen(true)}>
                Free Workshop
              </span>
            </li>
            <li>
              <span className="yhon-link" onClick={() => setView('home')}>
                Main Site
              </span>
            </li>
          </ul>

          {/* RIGHT: Student badge + logout */}
          <div className="yhon-actions">
            {user && (
              <div className="yhon-student-chip">
                <div className="yhon-avatar">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'S'}
                </div>
                <div className="yhon-student-info">
                  <span className="yhon-student-name">{user.name}</span>
                  <span className="yhon-student-id">🎓 {studentId}</span>
                </div>
              </div>
            )}

            <button type="button" className="yhon-logout-btn" onClick={onLogout}>
              <span>Log Out</span>
            </button>

            {/* Mobile hamburger */}
            <button
              type="button"
              className="yhon-hamburger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="yhon-mobile-menu">
          <span className="yhon-mob-link" onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setMobileMenuOpen(false); }}>
            🏠 Home
          </span>
          <span className="yhon-mob-link" onClick={() => { setIsRegisterModalOpen && setIsRegisterModalOpen(true); setMobileMenuOpen(false); }}>
            ✨ 5 Days Free Workshop
          </span>
          <span className="yhon-mob-link" onClick={() => { setView('home'); setMobileMenuOpen(false); }}>
            🌐 Back to Main Site
          </span>
          <button type="button" className="yhon-mob-logout" onClick={onLogout}>
            🚪 Log Out Student
          </button>
        </div>
      )}
    </>
  );
}
